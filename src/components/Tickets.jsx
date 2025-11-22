export default function Tickets({ onApplyClick }) {
  const EARLY_BIRD_DEADLINE = new Date('2025-11-30T23:59:59+05:30')
  const now = new Date()
  const isEarlyBirdActive = now <= EARLY_BIRD_DEADLINE

  const allPasses = [
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
      label: 'EXCLUSIVES VIP PASSES',
      name: 'VIP Pass',
      price: '10,000 INR',
      features: [
        'Priority seating',
        'VIP lounge access',
        'Meet & greet',
        'All Standard benefits',
        'Gift hamper',
        'Only 10 spots available',
        'VIP Seating with Millionaires at The Roundtable',
      ],
      featured: true,
    },
  ]

  const passes = allPasses

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
          <p className="mt-2 text-[0.85rem] uppercase tracking-[0.2em] text-neutral-600">
            {isEarlyBirdActive
              ? 'Early Bird pricing available until 30 November'
              : 'Early Bird is sold out · Current pricing starts at 5,000 INR'}
          </p>
          <div className="mt-2 inline-flex rounded-full border-2 border-red-600 bg-red-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-white">
            No spot registrations
          </div>
        </div>
        <p className="max-w-md text-[1.05rem] leading-relaxed text-neutral-700">
          Join us for an unforgettable summit designed for ambitious founders and leaders. Pick the pass that best
          matches how you want to experience the day.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {passes.map((pass) => {
          const isEarlyBird = pass.id === 'early-bird'
          const isStandard = pass.id === 'standard-pass'
          const isEnded = isEarlyBird && !isEarlyBirdActive
          const isLockedStandard = isStandard && isEarlyBirdActive

          return (
            <article
              key={pass.id}
              className={`group relative flex h-full flex-col justify-between rounded-md border-2 border-black bg-white p-6 md:p-7 transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_0px_0px_#000] ${
                pass.featured ? 'bg-neutral-50' : ''
              } ${isEnded ? 'opacity-80' : ''}`}
            >
              <div>
                {pass.label && (
                  <div
                    className={`mb-1 inline-flex rounded-full border-2 border-black px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] ${
                      isEnded ? 'bg-neutral-200 text-neutral-700 border-neutral-500' : 'bg-black text-white'
                    }`}
                  >
                    {isEnded ? 'SOLD OUT' : pass.label}
                  </div>
                )}

                {pass.id === 'vip-pass' && !isEnded && (
                  <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-red-500">
                    Only few spots available
                  </div>
                )}

              <h3 className="text-[1.2rem] font-semibold tracking-tight text-black">{pass.name}</h3>

              <div className="mt-4 flex items-baseline gap-2">
                <div className="text-[1.9rem] font-semibold tracking-tight text-black">{pass.price}</div>
                {pass.note && (
                  <span
                    className={`text-[11px] uppercase tracking-widest ${
                      isEarlyBird && isEarlyBirdActive
                        ? 'font-semibold text-neutral-900'
                        : 'text-neutral-600'
                    }`}
                  >
                    {isEarlyBird && isEarlyBirdActive ? 'TILL 30TH NOVEMBER' : pass.note}
                  </span>
                )}
              </div>

              {isLockedStandard && (
                <div className="mt-1 text-[11px] uppercase tracking-widest text-neutral-500">
                  Available from 1st December
                </div>
              )}

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
                  disabled={isEnded || isLockedStandard}
                  onClick={() => {
                    if (!isEnded && !isLockedStandard) {
                      if (typeof window !== 'undefined') {
                        window.location.hash = `#/apply?ticket=${encodeURIComponent(pass.id)}`
                      }
                    }
                  }}
                  className={`inline-flex w-full items-center justify-center rounded-sm border-2 px-4 py-2 text-[12px] font-semibold uppercase tracking-widest transition-colors duration-300 ${
                    isEnded || isLockedStandard
                      ? 'border-neutral-400 bg-neutral-200 text-neutral-500 cursor-not-allowed'
                      : 'border-black bg-black text-white hover:bg-white hover:text-black'
                  }`}
                >
                  {isEnded ? 'Offer Ended' : isLockedStandard ? 'Available from 1st December' : 'Book Now'}
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
