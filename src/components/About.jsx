export default function About() {
  return (
    <section id="about" className="mx-auto my-24 max-w-6xl px-6 md:px-10">
      <div className="mb-10">
        <div className="relative">
          <h2 className="text-[min(16vw,7rem)] font-semibold leading-[0.9] tracking-tight text-black select-none">
            ABOUT
          </h2>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border-2 border-black px-3 py-1 text-[12px] font-semibold tracking-widest text-black">
            About The Event
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <h3 className="text-[clamp(1.45rem,3.6vw,2.1rem)] font-semibold tracking-tight">
            About The event
          </h3>
          <p className="mt-4 text-[clamp(1rem,1.5vw,1.15rem)] leading-relaxed text-neutral-700">
            We are bringing together 200+ established business owners for a mega event designed to break through plateaus and ignite scaling. With powerful tools, expert panelists, and transformative insights, our mission is to shift mindsets from stagnation to exponential growth.
          </p>
        </div>
        <div className="md:col-span-7">
          <div className="rounded-md border-2 border-black bg-white">
            <div className="grid grid-cols-1 divide-y-2 divide-black/50 md:grid-cols-2 md:divide-x-2 md:divide-y-0">
              <div className="p-6 md:p-8">
                <div className="mb-2 inline-flex rounded-sm border-2 border-black px-3 py-1 text-[12px] font-semibold uppercase tracking-widest">Highlights</div>
                <ul className="mt-3 space-y-3 text-[1.05rem] leading-relaxed">
                  <li className="flex gap-3"><span className="mt-1 h-2 w-2 flex-none rounded-full bg-black" />Panelist Sharing Knowledge and Giving Awards</li>
                  <li className="flex gap-3"><span className="mt-1 h-2 w-2 flex-none rounded-full bg-black" />Hybrid power networking between 200+ delegates for powerful connection</li>
                </ul>
              </div>
              <div className="p-6 md:p-8">
                <div className="mb-2 inline-flex rounded-sm border-2 border-black px-3 py-1 text-[12px] font-semibold uppercase tracking-widest">Outcomes</div>
                <ul className="mt-3 space-y-3 text-[0.98rem] leading-relaxed">
                  <li className="flex gap-3"><span className="mt-1 h-2 w-2 flex-none rounded-full bg-black" />From plateau to action steps on scaling the business (walk out with inspiration)</li>
                  <li className="flex gap-3"><span className="mt-1 h-2 w-2 flex-none rounded-full bg-black" />Leave the room with powerful energy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
