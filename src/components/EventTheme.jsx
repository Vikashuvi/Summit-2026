import RevealOnScroll from './ui/RevealOnScroll'

export default function EventTheme() {
  const items = [
    {
      title: 'Institutions',
      desc: 'Help commoners get knowledge and exposure.'
    },
    {
      title: 'Entrepreneurs & Business Owners',
      desc: 'Take bold risks in creating something, build what lasts, and contribute to the economy by creating more job opportunities.'
    },
    {
      title: 'Community Builders',
      desc: 'Support the ecosystem with opportunities, knowledge, tools, events, friendship, and inspiration.'
    }
  ]

  return (
    <section id="event-theme" className="mx-auto my-24 max-w-7xl px-6 md:px-10">
      <RevealOnScroll direction="up" delay={0.1}>
        <div className="mb-12">
          <div className="relative">
            <h2
              className="text-[min(14vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-black select-none"
              style={{
                textShadow: '2px 2px 0px rgba(0,0,0,0.1), 4px 4px 0px rgba(0,0,0,0.08), 6px 6px 0px rgba(0,0,0,0.06), 8px 8px 0px rgba(0,0,0,0.04)'
              }}
            >
              Event Theme
            </h2>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-amber-500 border border-amber-600 px-4 py-1.5 text-[12px] font-bold tracking-[0.2em] text-black uppercase">
              Overview
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <RevealOnScroll direction="up" delay={0.2} className="md:col-span-12">
          <div className="rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm overflow-hidden shadow-lg">
            <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600" />
            <ul className="divide-y divide-gray-200">
              {items.map((it, idx) => (
                <li key={it.title} className="p-8 hover:bg-amber-50 transition-colors">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-center">
                    <div className="md:col-span-6">
                      <div className="flex items-center gap-4">
                        <span className="inline-flex h-10 w-10 aspect-square items-center justify-center rounded-full border border-amber-500 bg-amber-500 text-black text-sm font-bold leading-none shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-black">
                          {it.title}
                        </h3>
                      </div>
                    </div>
                    <div className="md:col-span-6 md:ml-auto md:text-right md:justify-self-end md:max-w-3xl text-[clamp(1.02rem,1.4vw,1.12rem)] leading-relaxed text-gray-700 font-light">
                      {it.desc}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
