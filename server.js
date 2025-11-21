import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST'],
}))

app.use(express.json())

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

const TICKET_PRICING = {
  'early-bird': 3500,
  'standard-pass': 5000,
  'vip-pass': 10000,
}

const EARLY_BIRD_DEADLINE = new Date('2025-11-30T23:59:59+05:30').getTime()

app.get('/', (req, res) => {
  res.send('Razorpay backend is running')
})

app.post('/create-order', async (req, res) => {
  try {
    const { amount, ticketType } = req.body

    let finalAmount = amount
    let receiptLabel = 'generic'

    if (ticketType) {
      const now = Date.now()
      if (ticketType === 'early-bird' && now > EARLY_BIRD_DEADLINE) {
        return res.status(400).json({ error: 'Early Bird offer has ended' })
      }
      if (ticketType === 'standard-pass' && now <= EARLY_BIRD_DEADLINE) {
        return res.status(400).json({ error: 'Standard Pass available from 1st December' })
      }
      const ticketAmount = TICKET_PRICING[ticketType]
      if (!ticketAmount) {
        return res.status(400).json({ error: 'Invalid ticket type' })
      }
      finalAmount = ticketAmount
      receiptLabel = ticketType
    }

    if (!finalAmount) {
      return res.status(400).json({ error: 'Amount is required' })
    }

    const options = {
      amount: Math.round(Number(finalAmount) * 100),
      currency: 'INR',
      receipt: `receipt_${receiptLabel}_${Date.now()}`,
      ...(ticketType && { notes: { ticketType } }),
    }

    const order = await razorpay.orders.create(options)

    return res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    return res.status(500).json({ error: 'Failed to create order' })
  }
})

app.post('/verify-payment', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      name,
      email,
      phone,
      company,
      designation,
      ticketType,
      ticketLabel,
      amount,
      currency,
    } = req.body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ valid: false, error: 'Missing payment details' })
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex')

    const isValid = expectedSignature === razorpay_signature

    if (!isValid) {
      return res.status(400).json({ valid: false, error: 'Invalid signature' })
    }

    if (email) {
      try {
        const safeName = name || 'Guest'
        const safeTicketLabel = ticketLabel || ticketType || 'Summit Ticket'
        const safeAmount = amount != null ? amount : ''
        const safeCurrency = currency || 'INR'

        const textBody = `Hi ${safeName},\n\nThank you for purchasing a pass for Millionaire Summit 2026.\nYour payment has been received successfully and your seat is confirmed.\n\nTicket type: ${safeTicketLabel}\nAmount paid: ${safeAmount} ${safeCurrency}\n\nWe2re excited to see you at Millionaire Summit 2026!\n\nBest regards,\nMillionaire Summit Team`

        const htmlBody = `<p>Hi ${safeName},</p>
<p>Thank you for purchasing a pass for <strong>Millionaire Summit 2026</strong>.<br />Your payment has been received successfully and your seat is confirmed.</p>
<p><strong>Ticket type:</strong> ${safeTicketLabel}<br /><strong>Amount paid:</strong> ${safeAmount} ${safeCurrency}</p>
<p>We2re excited to see you at Millionaire Summit 2026!</p>
<p>Best regards,<br /><strong>Millionaire Summit Team</strong></p>`

        await transporter.sendMail({
          from: process.env.TICKET_FROM_EMAIL || process.env.GMAIL_USER,
          to: email,
          subject: 'Your Millionaire Summit 2026 Pass is Confirmed',
          text: textBody,
          html: htmlBody,
        })
      } catch (mailError) {
        console.error('Error sending confirmation email (Express):', mailError)
      }
    }

    return res.json({ valid: true })
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error)
    return res.status(500).json({ valid: false, error: 'Verification failed' })
  }
})

app.listen(PORT, () => {
  console.log(`Razorpay server running on http://localhost:${PORT}`)
})
