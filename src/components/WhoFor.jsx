import RevealOnScroll from './ui/RevealOnScroll'

export default function WhoFor() {
  return (
    <section id="who-for" className="mx-auto my-24 max-w-7xl px-6 md:px-10">
      <RevealOnScroll direction="up" delay={0.1}>
        <div className="mb-12">
          <div className="relative">
            <h2
              className="text-[min(16vw,6.5rem)] font-bold leading-[0.9] tracking-tight text-black select-none"
              style={{
                textShadow: '2px 2px 0px rgba(0,0,0,0.1), 4px 4px 0px rgba(0,0,0,0.08), 6px 6px 0px rgba(0,0,0,0.06), 8px 8px 0px rgba(0,0,0,0.04)'
              }}
            >
              WHO IS THIS FOR?
            </h2>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-amber-500 border border-amber-600 px-4 py-1.5 text-[12px] font-bold tracking-[0.2em] text-black uppercase">
              Audience
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-stretch">
        {/* Lead blurb */}
        <RevealOnScroll direction="left" delay={0.2} className="md:col-span-5 h-full">
          <div className="rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm p-8 h-full flex flex-col shadow-lg">
            <div className="inline-flex rounded-full border border-amber-500 bg-amber-500 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-black">Who is this for?</div>
            <ul className="mt-6 space-y-4 text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-gray-700 font-light">
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-amber-500" /><span>Founders and owners seeking fresh strategies and high‑value connections</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-amber-500" /><span>Leaders ready to break plateaus with clear, scalable action plans</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-amber-500" /><span>Operators who value practical insights, recognition and energetic momentum</span></li>
            </ul>
          </div>
        </RevealOnScroll>

        {/* Numbered tiles */}
        <div className="md:col-span-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { id: '01', text: 'Panelist sharing knowledge and giving awards' },
              { id: '02', text: 'Hybrid power networking between 200+ delegates' },
              { id: '03', text: 'From plateau to clear action steps to scale' },
              { id: '04', text: 'Leave the room with powerful energy' },
            ].map((it, idx) => (
              <RevealOnScroll key={it.id} direction="up" delay={0.3 + idx * 0.1}>
                <div className="group relative overflow-hidden rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm p-8 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-lg">
                  <div className="pointer-events-none absolute -right-2 -top-2 text-[64px] font-bold leading-none text-black/5 select-none">{it.id}</div>
                  <div className="inline-flex rounded-full border border-amber-500 bg-amber-500 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-black">Highlight</div>
                  <p className="mt-4 text-[1.05rem] leading-relaxed text-gray-700">{it.text}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
