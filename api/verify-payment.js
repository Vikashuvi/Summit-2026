import crypto from 'crypto'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false, error: 'Method not allowed' })
  }

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
    } = req.body || {}

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
        console.error('Error sending confirmation email (Vercel fn):', mailError)
      }
    }

    return res.status(200).json({ valid: true })
  } catch (error) {
    console.error('Error verifying Razorpay payment (Vercel fn):', error)
    return res.status(500).json({ valid: false, error: 'Verification failed' })
  }
}
