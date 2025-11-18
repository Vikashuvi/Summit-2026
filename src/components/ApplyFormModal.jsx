export default function ApplyFormModal({ open, onClose }) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    >
      <div
        className="relative w-full max-w-md rounded-sm border-2 border-black bg-white px-6 py-5 text-black shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
        onClick={(e) => e.stopPropagation()}
      >
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

        <form
          className="space-y-3 text-[12px]"
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <div>
            <label className="mb-1 block text-[11px] uppercase tracking-widest">Name</label>
            <input
              type="text"
              className="w-full border-2 border-black px-3 py-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] uppercase tracking-widest">Mail id</label>
            <input
              type="email"
              className="w-full border-2 border-black px-3 py-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] uppercase tracking-widest">Phone number</label>
            <input
              type="tel"
              className="w-full border-2 border-black px-3 py-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] uppercase tracking-widest">Company</label>
            <input
              type="text"
              className="w-full border-2 border-black px-3 py-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your company name"
            />
          </div>
          <div>
            <label className="mb-1 block text-[11px] uppercase tracking-widest">Designation</label>
            <input
              type="text"
              className="w-full border-2 border-black px-3 py-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your designation"
            />
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-sm border-2 border-black bg-black px-3 py-2 text-[12px] font-semibold text-white hover:bg-white hover:text-black transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
