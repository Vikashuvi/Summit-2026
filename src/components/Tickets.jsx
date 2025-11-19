export default function Tickets({ onApplyClick }) {
  const passes = [
    {
      id: 'early-bird',
      label: 'LIMITED TIME',
      name: 'Early Bird',
      price: '3,500 INR',
      note: 'till 30th November',
      features: [
        'Full event access',
        'Networking sessions',
        'Event materials',
        'Refreshments',
      ],
      featured: true,
    },
    {
      id: 'standard-pass',
      name: 'Standard Pass',
      price: '5,000 INR',
      features: [
        'Full event access',
        'Networking sessions',
        'Event materials',
        'Refreshments',
        'Certificate',
      ],
    },
    {
      id: 'vip-pass',
      label: 'EXCLUSIVE',
      name: 'VIP Pass',
      price: '10,000 INR',
      features: [
        'Priority seating',
        'VIP lounge access',
        'Meet & greet',
        'All Standard benefits',
        'Gift hamper',
      ],
      featured: true,
    },
  ]

  return (
    <section
      id="tickets"
      className="mx-auto my-24 max-w-6xl px-6 md:px-10"
    >
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-neutral-600">
            Premium Event Experience
          </p>
          <h2 className="mt-2 text-[clamp(2rem,4vw,2.6rem)] font-semibold tracking-tight text-black">
            Choose your pass
          </h2>
        </div>
        <p className="max-w-md text-[1.05rem] leading-relaxed text-neutral-700">
          Join us for an unforgettable summit designed for ambitious founders and leaders. Pick the pass that best
          matches how you want to experience the day.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {passes.map((pass) => (
          <article
            key={pass.id}
            className={`group relative flex h-full flex-col justify-between rounded-md border-2 border-black bg-white p-6 md:p-7 transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_0px_0px_#000] ${
              pass.featured ? 'bg-neutral-50' : ''
            }`}
          >
            <div>
              {pass.label && (
                <div className="mb-4 inline-flex rounded-full border-2 border-black bg-black px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white">
                  {pass.label}
                </div>
              )}

              <h3 className="text-[1.2rem] font-semibold tracking-tight text-black">{pass.name}</h3>

              <div className="mt-4 flex items-baseline gap-2">
                <div className="text-[1.9rem] font-semibold tracking-tight text-black">{pass.price}</div>
                {pass.note && (
                  <span className="text-[11px] uppercase tracking-widest text-neutral-600">{pass.note}</span>
                )}
              </div>

              <ul className="mt-5 space-y-2 text-[1.02rem] leading-relaxed text-neutral-800">
                {pass.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-black" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => onApplyClick && onApplyClick()}
                className="inline-flex w-full items-center justify-center rounded-sm border-2 border-black bg-black px-4 py-2 text-[12px] font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-white hover:text-black"
              >
                Book Now
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
