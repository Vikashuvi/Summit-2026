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

        const textBody = `Hi ${safeName},\n\nThank you for purchasing a pass for Millionaire Summit 2026. Your payment has been received successfully and your seat is confirmed.\n\nTicket type: ${safeTicketLabel}\nAmount paid: ${safeAmount} ${safeCurrency}\n\nEvent details:\nDate: Jan 3, 2026 · Saturday\nTime: 08:00 – 17:00 IST\nVenue: Hotel Green Park, Chennai\n\nWe are excited to see you at Millionaire Summit 2026!\n\nBest regards,\nMillionaire Summit Team`

        const htmlBody = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Your Millionaire Summit 2026 Pass is Confirmed</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f3f3f3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f3f3;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border:2px solid #000000;">
            <tr>
              <td style="padding:20px 24px 12px 24px;border-bottom:2px solid #000000;background-color:#ffffff;">
                <div style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#666666;font-weight:600;">
                  Millionaire Summit 2026
                </div>
                <h1 style="margin:8px 0 0 0;font-size:22px;line-height:1.3;font-weight:700;color:#000000;">
                  Your pass is confirmed
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:12px 24px 0 24px;">
                <span style="display:inline-block;border:2px solid #000000;background-color:#000000;color:#ffffff;padding:6px 14px;font-size:10px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;">
                  Pass Confirmed
                </span>
              </td>
            </tr>

            <tr>
              <td style="padding:16px 24px 20px 24px;font-size:14px;line-height:1.7;color:#111111;">
                <p style="margin:0 0 12px 0;">
                  Hi ${safeName},
                </p>
                <p style="margin:0 0 12px 0;">
                  Thank you for purchasing a pass for Millionaire Summit 2026. Your payment has been received successfully and your seat is confirmed.
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:16px 0 12px 0;font-size:14px;color:#111111;">
                  <tr>
                    <td style="padding:0 16px 4px 0;font-weight:600;">Ticket type:</td>
                    <td style="padding:0 0 4px 0;">${safeTicketLabel}</td>
                  </tr>
                  <tr>
                    <td style="padding:0 16px 0 0;font-weight:600;">Amount paid:</td>
                    <td style="padding:0;">${safeAmount} ${safeCurrency}</td>
                  </tr>
                </table>

                <div style="margin:20px 0 12px 0;border:2px solid #000000;border-radius:10px;overflow:hidden;">
                  <div style="padding:10px 14px;border-bottom:1px solid rgba(0,0,0,0.1);background-color:#fafafa;">
                    <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#777777;font-weight:600;margin-bottom:4px;">Date</div>
                    <div style="font-size:14px;font-weight:600;color:#111111;">Jan 3, 2026 · Saturday</div>
                  </div>
                  <div style="padding:10px 14px;border-bottom:1px solid rgba(0,0,0,0.1);background-color:#ffffff;">
                    <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#777777;font-weight:600;margin-bottom:4px;">Time</div>
                    <div style="font-size:14px;font-weight:600;color:#111111;">08:00 – 17:00 IST</div>
                  </div>
                  <div style="padding:10px 14px;background-color:#fafafa;">
                    <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#777777;font-weight:600;margin-bottom:4px;">Venue</div>
                    <div style="font-size:14px;font-weight:600;color:#111111;">Hotel Green Park, Chennai</div>
                  </div>
                </div>

                <p style="margin:16px 0 12px 0;">
                  We are excited to see you at Millionaire Summit 2026!
                </p>

                <p style="margin:16px 0 4px 0;">
                  Best regards,<br />
                  <span>Millionaire Summit Team</span>
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:10px 24px 16px 24px;border-top:2px solid #000000;font-size:11px;line-height:1.5;color:#555555;">
                <p style="margin:0;">This is an automated confirmation email for your Millionaire Summit 2026 pass.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

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
