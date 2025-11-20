import RevealOnScroll from './ui/RevealOnScroll'

export default function About() {
  return (
    <section id="about" className="mx-auto my-24 max-w-7xl px-6 md:px-10">
      <RevealOnScroll direction="up" delay={0.1}>
        <div className="mb-12">
          <div className="relative">
            <h2
              className="text-[min(16vw,7rem)] font-bold leading-[0.9] tracking-tight text-black select-none"
              style={{
                textShadow: '2px 2px 0px rgba(0,0,0,0.1), 4px 4px 0px rgba(0,0,0,0.08), 6px 6px 0px rgba(0,0,0,0.06), 8px 8px 0px rgba(0,0,0,0.04)'
              }}
            >
              ABOUT
            </h2>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-amber-500 border border-amber-600 px-4 py-1.5 text-[12px] font-bold tracking-[0.2em] text-black uppercase">
              About The Event
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <RevealOnScroll direction="left" delay={0.2} className="md:col-span-5">
          <h3 className="text-[clamp(1.45rem,3.6vw,2.1rem)] font-semibold tracking-tight text-black">
            About The event
          </h3>
          <p className="mt-6 text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-gray-700 font-light">
            We are bringing together <span className="text-amber-500 font-medium">200+ established business owners</span> for a mega event designed to break through plateaus and ignite scaling. With powerful tools, expert panelists, and transformative insights, our mission is to shift mindsets from stagnation to <span className="text-amber-500 font-medium">exponential growth</span>.
          </p>
        </RevealOnScroll>

        <RevealOnScroll direction="right" delay={0.3} className="md:col-span-7">
          <div className="rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 divide-y divide-gray-200 md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="p-8 hover:bg-amber-50 transition-colors">
                <div className="mb-4 inline-flex rounded-full border border-amber-500 bg-amber-500 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-black">Highlights</div>
                <ul className="mt-4 space-y-4 text-[1.05rem] leading-relaxed text-gray-700">
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-amber-500" />Panelist Sharing Knowledge and Giving Awards</li>
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-amber-500" />Hybrid power networking between 200+ delegates for powerful connection</li>
                </ul>
              </div>
              <div className="p-8 hover:bg-amber-50 transition-colors">
                <div className="mb-4 inline-flex rounded-full border border-amber-500 bg-amber-500 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-black">Outcomes</div>
                <ul className="mt-4 space-y-4 text-[0.98rem] leading-relaxed text-gray-700">
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-amber-500" />From plateau to action steps on scaling the business (walk out with inspiration)</li>
                  <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-amber-500" />Leave the room with powerful energy</li>
                </ul>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
