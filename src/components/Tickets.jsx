import RevealOnScroll from './ui/RevealOnScroll'

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

  const passes = allPasses

  return (
    <section
      id="tickets"
      className="mx-auto my-24 max-w-7xl px-6 md:px-10"
    >
      <RevealOnScroll direction="up" delay={0.1}>
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.25em] text-amber-600">
              Premium Event Experience
            </p>
            <h2
              className="mt-2 text-[clamp(2rem,4vw,2.6rem)] font-bold tracking-tight text-black"
              style={{
                textShadow: '1px 1px 0px rgba(0,0,0,0.1), 2px 2px 0px rgba(0,0,0,0.08), 3px 3px 0px rgba(0,0,0,0.06), 4px 4px 0px rgba(0,0,0,0.04)'
              }}
            >
              Choose your pass
            </h2>
            <p className="mt-3 text-[0.85rem] uppercase tracking-[0.2em] text-gray-600">
              {isEarlyBirdActive
                ? 'Early Bird pricing available until 30 November'
                : 'Early Bird is sold out · Current pricing starts at 5,000 INR'}
            </p>
          </div>
          <p className="max-w-md text-[1.05rem] leading-relaxed text-gray-700 font-light">
            Join us for an unforgettable summit designed for ambitious founders and leaders. Pick the pass that best
            matches how you want to experience the day.
          </p>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {passes.map((pass, idx) => {
          const isEarlyBird = pass.id === 'early-bird'
          const isStandard = pass.id === 'standard-pass'
          const isEnded = isEarlyBird && !isEarlyBirdActive
          const isLockedStandard = isStandard && isEarlyBirdActive

          return (
            <RevealOnScroll key={pass.id} direction="up" delay={0.2 + idx * 0.1}>
              <article
                className={`group relative flex h-full flex-col justify-between rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm p-8 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl ${pass.featured ? 'border-amber-500 shadow-lg' : ''
                  } ${isEnded ? 'opacity-60 grayscale' : ''}`}
              >
                <div>
                  {pass.label && (
                    <div
                      className={`mb-6 inline-flex rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] ${isEnded ? 'bg-gray-200 text-gray-600 border-gray-400' : 'bg-amber-500 text-black border-amber-600'
                        }`}
                    >
                      {isEnded ? 'SOLD OUT' : pass.label}
                    </div>
                  )}

                  <h3 className="text-[1.5rem] font-bold tracking-tight text-black">{pass.name}</h3>

                  <div className="mt-4 flex items-baseline gap-3">
                    <div className="text-[2rem] font-bold tracking-tight text-amber-600">{pass.price}</div>
                    {pass.note && (
                      <span
                        className={`text-[11px] uppercase tracking-widest ${isEarlyBird && isEarlyBirdActive
                          ? 'font-bold text-amber-700'
                          : 'text-gray-500'
                          }`}
                      >
                        {isEarlyBird && isEarlyBirdActive ? 'TILL 30TH NOVEMBER' : pass.note}
                      </span>
                    )}
                  </div>

                  {isLockedStandard && (
                    <div className="mt-2 text-[11px] uppercase tracking-widest text-gray-500">
                      Available from 1st December
                    </div>
                  )}

                  <ul className="mt-8 space-y-3 text-[1.02rem] leading-relaxed text-gray-700">
                    {pass.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-amber-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    disabled={isEnded || isLockedStandard}
                    onClick={() => {
                      if (!isEnded && !isLockedStandard && onApplyClick) {
                        onApplyClick(pass.id)
                      }
                    }}
                    className={`inline-flex w-full items-center justify-center rounded-full border px-6 py-3 text-[12px] font-bold uppercase tracking-widest transition-all duration-300 ${isEnded || isLockedStandard
                      ? 'border-gray-400 bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'border-amber-500 bg-amber-500 text-black hover:bg-amber-600 hover:border-amber-600 hover:shadow-lg'
                      }`}
                  >
                    {isEnded ? 'Offer Ended' : isLockedStandard ? 'Available from 1st December' : 'Book Now'}
                  </button>
                </div>
              </article>
            </RevealOnScroll>
          )
        })}
      </div>
    </section>
  )
}
