import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

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

export default function ApplyPage() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const now = new Date()
    const defaultTicket = now <= EARLY_BIRD_DEADLINE ? 'early-bird' : 'standard-pass'
    const ticketType = searchParams.get('ticketType') || defaultTicket

    const selectedTicketLabel = TICKET_LABELS[ticketType] || 'Summit Ticket'
    const selectedTicketPrice = TICKET_PRICES[ticketType] || ''

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
                body: JSON.stringify({ ticketType: ticketType })
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
                        params.append('ticketType', ticketType)
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
        <div className="min-h-screen w-full bg-background flex items-center justify-center px-4 py-12">
            <div className="relative w-full max-w-md rounded-xl border border-amber-500/30 bg-black/40 backdrop-blur-md p-8 shadow-[0_0_40px_-10px_rgba(251,191,36,0.15)]">

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <span className="inline-block rounded-full border border-amber-500/50 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-400">
                            Apply Now
                        </span>
                        <h2 className="mt-3 text-xl font-bold text-white">Share your details</h2>
                    </div>
                    <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-500/30 text-gray-400 hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
                        onClick={() => navigate('/')}
                    >
                        ✕
                    </button>
                </div>

                {/* Selected ticket summary */}
                <div className="mb-8 rounded-lg border border-dashed border-amber-500/30 bg-amber-500/5 px-4 py-3 text-[11px] uppercase tracking-widest flex items-center justify-between text-amber-200">
                    <span className="mr-3">{selectedTicketLabel}</span>
                    {selectedTicketPrice && <span className="font-bold text-amber-400">{selectedTicketPrice}</span>}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5 text-[13px]">

                    <div>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gray-400">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full rounded-lg border border-amber-500/20 bg-black/40 px-4 py-3 text-white placeholder-gray-600 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gray-400">Mail id</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full rounded-lg border border-amber-500/20 bg-black/40 px-4 py-3 text-white placeholder-gray-600 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gray-400">Phone number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full rounded-lg border border-amber-500/20 bg-black/40 px-4 py-3 text-white placeholder-gray-600 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gray-400">Company</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full rounded-lg border border-amber-500/20 bg-black/40 px-4 py-3 text-white placeholder-gray-600 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
                            placeholder="Enter your company name"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-[11px] font-bold uppercase tracking-widest text-gray-400">Designation</label>
                        <input
                            type="text"
                            name="designation"
                            value={formData.designation}
                            onChange={handleInputChange}
                            className="w-full rounded-lg border border-amber-500/20 bg-black/40 px-4 py-3 text-white placeholder-gray-600 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
                            placeholder="Enter your designation"
                            required
                        />
                    </div>

                    <div className="mt-4 flex items-start gap-3 text-[12px] leading-snug text-gray-300">
                        <input
                            id="agree-to-pay"
                            type="checkbox"
                            checked={agreedToPay}
                            onChange={(e) => setAgreedToPay(e.target.checked)}
                            className="mt-0.5 h-4 w-4 rounded border-amber-500/30 bg-black/40 text-amber-500 focus:ring-amber-500/50"
                        />
                        <label htmlFor="agree-to-pay" className="cursor-pointer select-none">
                            I am willing to pay the applicable ticket fee for this event.
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !agreedToPay}
                        className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-amber-500 bg-amber-500 px-6 py-3 text-[12px] font-bold uppercase tracking-widest text-black hover:bg-amber-400 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:shadow-none"
                    >
                        {isSubmitting ? 'Processing...' : 'Pay Now'}
                    </button>

                    {message && (
                        <div
                            className={`mt-4 text-center text-[11px] font-bold px-4 py-3 rounded-lg border ${messageType === 'success'
                                    ? 'border-green-500/30 text-green-400 bg-green-500/10'
                                    : messageType === 'error'
                                        ? 'border-red-500/30 text-red-400 bg-red-500/10'
                                        : 'border-amber-500/30 text-amber-400 bg-amber-500/10'
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
