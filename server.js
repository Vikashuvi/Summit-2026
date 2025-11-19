import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Razorpay from 'razorpay'
import crypto from 'crypto'

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
        return res.status(400).json({ error: 'Standard Pass available from 1 December' })
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

app.post('/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

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

    return res.json({ valid: true })
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error)
    return res.status(500).json({ valid: false, error: 'Verification failed' })
  }
})

app.listen(PORT, () => {
  console.log(`Razorpay server running on http://localhost:${PORT}`)
})
