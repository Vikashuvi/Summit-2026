import { useState } from 'react'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw7Jr_sSHzn13TTmKqbNlA_a01eWaGNiWvyKaksTmDttw_56CiM8NZlYtXb5E7_W70-5Q/exec'

export default function ApplyFormModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    designation: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  if (!open) return null

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

    try {
      // Create URLSearchParams for form data
      const params = new URLSearchParams()
      params.append('name', formData.name)
      params.append('email', formData.email)
      params.append('phone', formData.phone)
      params.append('company', formData.company)
      params.append('designation', formData.designation)

      console.log('Sending to:', SCRIPT_URL)
      console.log('Params:', params.toString())

      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString()
      })

      console.log('Response received:', response.status, response.statusText)

      if (response.ok) {
        const result = await response.text()
        console.log('Response text:', result)
        
        setMessage('✅ Application submitted successfully!')
        
        // Clear form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          designation: ''
        })
        
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose()
          setMessage('')
        }, 2000)
      } else {
        throw new Error(`Server error: ${response.status}`)
      }
    } catch (error) {
      console.error('Submission error:', error)
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-md rounded-sm border-2 border-black bg-white px-6 py-5 text-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
        
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <span className="inline-block rounded-sm border-2 border-black px-2 py-0.5 text-[10px] uppercase tracking-widest">
              Apply Now
            </span>
            <h2 className="mt-2 text-sm font-semibold">Share your details</h2>
          </div>
          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded-sm border-2 border-black text-xs hover:bg-black hover:text-white transition-colors"
            onClick={onClose}
          >
            ✕
          </button>
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 inline-flex w-full items-center justify-center rounded-sm border-2 border-black bg-black px-3 py-2 text-[12px] font-semibold text-white hover:bg-white hover:text-black transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>

          {message && (
            <div className="mt-3 text-center text-[11px] font-medium">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
