export default function WhoFor() {
  return (
    <section id="who-for" className="mx-auto my-24 max-w-6xl px-6 md:px-10">
      <div className="mb-10">
        <div className="relative">
          <h2 className="text-[min(16vw,6.5rem)] font-semibold leading-[0.9] tracking-tight text-black select-none">
            WHO IS THIS FOR?
          </h2>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border-2 border-black px-3 py-1 text-[12px] font-semibold tracking-widest text-black">
            Audience
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-stretch">
        {/* Lead blurb */}
        <div className="md:col-span-5 h-full">
          <div className="rounded-md border-2 border-black bg-white p-6 md:p-8 h-full flex flex-col">
            <div className="inline-flex rounded-sm border-2 border-black px-3 py-1 text-[12px] font-semibold uppercase tracking-widest">Who is this for?</div>
            <ul className="mt-4 space-y-3 text-[clamp(0.95rem,1.4vw,1.05rem)] leading-relaxed text-neutral-800">
              <li className="flex items-start gap-3"><span className="mt-2 h-2 w-2 flex-none rounded-full bg-black" /><span>Founders and owners seeking fresh strategies and high‑value connections</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-2 w-2 flex-none rounded-full bg-black" /><span>Leaders ready to break plateaus with clear, scalable action plans</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 h-2 w-2 flex-none rounded-full bg-black" /><span>Operators who value practical insights, recognition and energetic momentum</span></li>
            </ul>
          </div>
        </div>

        {/* Numbered tiles */}
        <div className="md:col-span-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { id: '01', text: 'Panelist sharing knowledge and giving awards' },
              { id: '02', text: 'Hybrid power networking between 200+ delegates' },
              { id: '03', text: 'From plateau to clear action steps to scale' },
              { id: '04', text: 'Leave the room with powerful energy' },
            ].map((it) => (
              <div
                key={it.id}
                className="group relative overflow-hidden rounded-md border-2 border-black bg-white p-6 md:p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_0px_0px_#000]"
              >
                <div className="pointer-events-none absolute -right-2 -top-2 text-[64px] font-bold leading-none text-black/5 select-none">{it.id}</div>
                <div className="inline-flex rounded-sm border-2 border-black px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest transition-colors duration-300 group-hover:border-white group-hover:bg-black group-hover:text-white">Highlight</div>
                <p className="mt-3 text-[0.98rem] leading-relaxed transition-colors duration-300 group-hover:text-white">{it.text}</p>
                <div className="absolute inset-0 -z-10 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
