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

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* Lead blurb */}
        <div className="md:col-span-5">
          <div className="rounded-md border-2 border-black bg-white p-6 md:p-8">
            <div className="inline-flex rounded-sm border-2 border-black px-3 py-1 text-[12px] font-semibold uppercase tracking-widest">Who is this for?</div>
            <p className="mt-4 text-[clamp(0.95rem,1.4vw,1.05rem)] leading-relaxed text-neutral-700">
              Entrepreneurs & business owners who want to learn, connect, collaborate and scale their business—this event is for you. Participate in meeting new people, learning industry updates and practices, inspiring keynotes, recognising bootstrappers, and enjoying a little bit of happy hours.
            </p>
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
              <div key={it.id} className="relative overflow-hidden rounded-md border-2 border-black bg-white p-6 md:p-7">
                <div className="pointer-events-none absolute -right-2 -top-2 text-[64px] font-bold leading-none text-black/5 select-none">{it.id}</div>
                <div className="inline-flex rounded-sm border-2 border-black px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest">Highlight</div>
                <p className="mt-3 text-[0.98rem] leading-relaxed">{it.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
