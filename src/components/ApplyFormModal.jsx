import { useState } from 'react'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz4eKdTrTSWQJNlHh3kIocSERdnRtLzmQj_19PEKeyGxKU66D6FZhxiVdGliHfd9O7uVg/exec'
const TICKET_LABELS = {
  'early-bird': 'Early Bird Pass',
  'standard-pass': 'Standard Pass',
  'vip-pass': 'VIP Pass',
}

const TICKET_PRICES = {
  'early-bird': '3,500 INR',
  'standard-pass': '5,000 INR',
  'vip-pass': '10,000 INR',
}
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID

const EARLY_BIRD_DEADLINE = new Date('2025-11-30T23:59:59+05:30')

export default function ApplyFormModal({ open, onClose, ticketType, isPage = false }) {
  const now = new Date()
  const defaultTicket = now <= EARLY_BIRD_DEADLINE ? 'early-bird' : 'standard-pass'
  const selectedTicketType = ticketType || defaultTicket
  const selectedTicketLabel = TICKET_LABELS[selectedTicketType] || 'Summit Ticket'
  const selectedTicketPrice = TICKET_PRICES[selectedTicketType] || ''
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    designation: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [agreedToPay, setAgreedToPay] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  if (!open && !isPage) return null

  const handleClose = () => {
    if (isPage) {
      if (typeof window !== 'undefined') {
        window.location.hash = '#/'
      }
    } else if (onClose) {
      onClose()
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log('=== FORM SUBMISSION STARTED ===')
    console.log('Form data:', formData)

    setIsSubmitting(true)
    setMessage('')
    setMessageType('')

    let paidAmount = null
    let paidCurrency = 'INR'

    try {
      if (!window.Razorpay) {
        throw new Error('Razorpay script not loaded')
      }

      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      const orderUrl = isLocal ? 'http://localhost:5000/create-order' : '/api/create-order'

      const orderResponse = await fetch(orderUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticketType: selectedTicketType })
      })

      if (!orderResponse.ok) {
        throw new Error('Failed to create payment order')
      }

      const orderData = await orderResponse.json()

      if (typeof orderData.amount === 'number') {
        paidAmount = orderData.amount / 100 // convert paise -> rupees
      }
      if (orderData.currency) {
        paidCurrency = orderData.currency
      }

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Millionaire Summit',
        description: selectedTicketLabel,
        order_id: orderData.orderId,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        handler: async function (paymentResponse) {
          try {
            const verifyUrl = isLocal ? 'http://localhost:5000/verify-payment' : '/api/verify-payment'

            const verifyResponse = await fetch(verifyUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                company: formData.company,
                designation: formData.designation,
                ticketType: selectedTicketType,
                ticketLabel: selectedTicketLabel,
                amount: paidAmount,
                currency: paidCurrency,
              })
            })

            const verifyData = await verifyResponse.json()

            if (!verifyResponse.ok || !verifyData.valid) {
              throw new Error('Payment verification failed')
            }

            const params = new URLSearchParams()
            params.append('name', formData.name)
            params.append('email', formData.email)
            params.append('phone', formData.phone)
            params.append('company', formData.company)
            params.append('designation', formData.designation)
            if (paidAmount != null) {
              params.append('amount', String(paidAmount))
              params.append('currency', paidCurrency)
            }
            params.append('ticketType', selectedTicketType)
            params.append('ticketLabel', selectedTicketLabel)

            console.log('Sending to:', SCRIPT_URL)
            console.log('Params:', params.toString())

            const sheetResponse = await fetch(SCRIPT_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: params.toString()
            })

            console.log('Response received:', sheetResponse.status, sheetResponse.statusText)

            if (!sheetResponse.ok) {
              throw new Error(`Server error: ${sheetResponse.status}`)
            }

            const result = await sheetResponse.text()
            console.log('Response text:', result)
            
            setMessage('Application submitted successfully!')
            setMessageType('success')
            
            // Clear form
            setFormData({
              name: '',
              email: '',
              phone: '',
              company: '',
              designation: ''
            })
            setAgreedToPay(false)
          } catch (error) {
            console.error('Post-payment error:', error)
            setMessage(`Error: ${error.message}`)
            setMessageType('error')
          } finally {
            setIsSubmitting(false)
          }
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false)
            setMessage('Payment cancelled')
            setMessageType('info')
          },
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error('Submission error:', error)
      setMessage(`Error: ${error.message}`)
      setMessageType('error')
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className={
        isPage
          ? 'w-full flex items-center justify-center bg-neutral-50 px-4 py-10'
          : 'fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4'
      }
    >
      <div className="relative w-full max-w-md rounded-sm border-2 border-black bg-white px-6 py-5 text-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
        
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div>
            {!isPage && (
              <span className="inline-block rounded-sm border-2 border-black px-2 py-0.5 text-[10px] uppercase tracking-widest">
                Apply Now
              </span>
            )}
            <h2 className="mt-2 text-sm font-semibold">Share your details</h2>
          </div>
          {isPage ? (
            <button
              type="button"
              className="inline-flex items-center rounded-sm border-2 border-black px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
              onClick={handleClose}
            >
              Back
            </button>
          ) : (
            <button
              type="button"
              className="inline-flex h-7 w-7 items-center justify-center rounded-sm border-2 border-black text-xs hover:bg-black hover:text-white transition-colors"
              onClick={handleClose}
            >
              
              ✕
            </button>
          )}
        </div>

        {/* Selected ticket summary */}
        <div className="mb-4 rounded-sm border-2 border-dashed border-black px-3 py-2 text-[11px] uppercase tracking-widest flex items-center justify-between">
          <span className="mr-3">{selectedTicketLabel}</span>
          {selectedTicketPrice && <span className="font-semibold">{selectedTicketPrice}</span>}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-[12px]">
          
          <div>
            <label className="mb-1 block text-[11px] uppercase tracking-widest">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border-2 border-black px-3 py-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] uppercase tracking-widest">Mail id</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border-2 border-black px-3 py-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] uppercase tracking-widest">Phone number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full border-2 border-black px-3 py-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] uppercase tracking-widest">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full border-2 border-black px-3 py-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your company name"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] uppercase tracking-widest">Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              className="w-full border-2 border-black px-3 py-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your designation"
              required
            />
          </div>

          <div className="mt-3 flex items-start gap-2 text-[11px] leading-snug">
            <input
              id="agree-to-pay"
              type="checkbox"
              checked={agreedToPay}
              onChange={(e) => setAgreedToPay(e.target.checked)}
              className="mt-0.5 h-3.5 w-3.5 rounded-sm border-2 border-black text-black focus:ring-0"
            />
            <label htmlFor="agree-to-pay" className="cursor-pointer select-none">
              I am willing to pay the applicable ticket fee for this event.
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !agreedToPay}
            className="mt-4 inline-flex w-full items-center justify-center rounded-sm border-2 border-black bg-black px-3 py-2 text-[12px] font-semibold text-white hover:bg-white hover:text-black transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Processing...' : 'Pay Now'}
          </button>

          {message && (
            <div
              className={`mt-3 text-center text-[11px] font-medium px-3 py-2 rounded-sm border-2 ${
                messageType === 'success'
                  ? 'border-green-600 text-green-700 bg-green-50'
                  : messageType === 'error'
                  ? 'border-red-600 text-red-700 bg-red-50'
                  : 'border-yellow-500 text-yellow-700 bg-yellow-50'
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
