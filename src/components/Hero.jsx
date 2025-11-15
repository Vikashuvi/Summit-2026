import { useMemo } from 'react'

// Replace with your final hero image(s)
const IMAGES = [
  'https://images.unsplash.com/photo-1515165562835-c4c3b96dd3c6?q=80&w=1600&auto=format&fit=crop',
]

export default function Hero() {
  const current = useMemo(() => IMAGES[0], [])

  return (
    <section className="relative h-screen w-full bg-white text-black overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="https://cdn.prod.website-files.com/669502db3ee6c10966674f85%2F6867a8767daac3673de426dd_TS%20Bangalore%2022_2-transcode.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster={current}
      />
      {/* light wash to keep text readable */}
      <div className="absolute inset-0 bg-white/70" />

      {/* Viewport frame strokes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[4px] bg-black" />
        <div className="absolute inset-x-0 bottom-0 h-[4px] bg-black" />
        <div className="absolute inset-y-0 left-0 w-[4px] bg-black" />
        <div className="absolute inset-y-0 right-0 w-[4px] bg-black" />
      </div>

      {/* Content layer */}
      <div className="relative z-10">
        <div className="mx-auto flex h-screen max-w-6xl items-center justify-center px-6 md:px-10">
          <div className="w-full">
            <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
              {/* Masthead */}
              <div className="md:col-span-8">
                <h1 className="text-[clamp(2.6rem,6vw,4.4rem)] font-semibold leading-[1.02] tracking-tight">
                  Millionaire Summit & Awards 2026
                </h1>
                <p className="mt-4 max-w-2xl text-[15px] text-neutral-800 leading-relaxed">
                  Let’s Begin This Year with Some Powerful Knowledge, Valuable Connection, and Power Packed Energy…
                </p>
                <div className="mt-5 flex gap-6">
                  <a href="#tickets" className="group relative inline-flex items-center text-sm font-semibold">
                    <span className="relative z-10">Get Tickets</span>
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </a>
                  <a href="#details" className="text-sm text-neutral-700 hover:text-black">Learn More</a>
                </div>
              </div>

              {/* Details card */}
              <div className="md:col-span-4">
                <div className="rounded-sm border-2 border-black">
                  <div className="grid grid-cols-1 divide-y-2 divide-black">
                    <div className="p-4">
                      <div className="text-[11px] uppercase tracking-widest text-neutral-600">Date</div>
                      <div className="mt-1 font-semibold">Jan 3, 2026 · Saturday</div>
                    </div>
                    <div className="p-4">
                      <div className="text-[11px] uppercase tracking-widest text-neutral-600">Time</div>
                      <div className="mt-1 font-semibold">08:00 – 17:00 IST</div>
                    </div>
                    <div className="p-4">
                      <div className="text-[11px] uppercase tracking-widest text-neutral-600">Venue</div>
                      <div className="mt-1 font-semibold">Hotel Green Park, Chennai</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
