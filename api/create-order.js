import Razorpay from 'razorpay'

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { amount, ticketType } = req.body || {}

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

    return res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (error) {
    console.error('Error creating Razorpay order (Vercel fn):', error)
    return res.status(500).json({ error: 'Failed to create order' })
  }
}
