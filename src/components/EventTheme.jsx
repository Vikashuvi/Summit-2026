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
    <section id="event-theme" className="mx-auto my-24 max-w-6xl px-6 md:px-10">
      <div className="mb-10">
        <div className="relative">
          <h2 className="text-[min(14vw,5.5rem)] font-semibold leading-[0.95] tracking-tight text-black select-none">
            Event Theme
          </h2>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border-2 border-black px-3 py-1 text-[12px] font-semibold tracking-widest text-black">
            Overview
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="md:col-span-12">
          <div className="rounded-md border-2 border-black bg-white overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-black via-neutral-700 to-black" />
            <ul className="divide-y-2 divide-black/10">
              {items.map((it, idx) => (
                <li key={it.title} className="p-6 md:p-8">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center">
                    <div className="md:col-span-6">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-8 w-8 aspect-square items-center justify-center rounded-full border-2 border-black bg-black text-white text-xs font-bold leading-none shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-black">
                          {it.title}
                        </h3>
                      </div>
                    </div>
                    <div className="md:col-span-6 md:ml-auto md:text-right md:justify-self-end md:max-w-3xl text-[clamp(1.02rem,1.4vw,1.12rem)] leading-relaxed text-neutral-800">
                      {it.desc}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
