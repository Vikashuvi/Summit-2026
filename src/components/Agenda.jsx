import { WavyBackground } from "./ui/wavy-background";

const ITEMS = [
  { theme: 'Opening', topic: 'Exclusive Private Breakfast with Platinum Delegates', speaker: '', time: '08:00 AM' },
  { theme: 'Registration', topic: 'Registration', speaker: '', time: '09:00 AM' },
  { theme: 'Networking', topic: 'Networking with Tea and Cookies', speaker: '', time: '09:30 AM' },
  { theme: 'Ceremony', topic: 'Kick Starting the Event with Lamp Lighting', speaker: '', time: '10:00 AM' },
  { theme: 'Panel', topic: 'The Millionaire Panel Session', speaker: '', time: '11:00 AM' },
  { theme: 'Lunch', topic: 'Lunch with Networking', speaker: '', time: '01:00 PM' },
  { theme: 'Fun', topic: 'Little Happy Hours', speaker: '', time: '02:30 PM' },
  { theme: 'Keynote', topic: 'Keynote', speaker: '', time: '03:00 PM' },
  { theme: 'Panel', topic: 'India’s Future GCC Panel Session', speaker: '', time: '04:00 PM' },
  { theme: 'Networking', topic: 'Networking with Hi-Tea', speaker: '', time: '05:00 PM' },
]

export default function Agenda() {
  return (
    <section id="agenda" className="mx-auto my-20 max-w-6xl px-6 md:px-10">
      {/* Wavy background behind the large heading - full screen width */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen mb-6 overflow-hidden">
        <WavyBackground
          containerClassName="h-[180px] md:h-[240px]"
          className="flex h-full items-center justify-start px-4 md:px-6"
          backgroundFill="white"
          waveOpacity={0.35}
          blur={8}
          speed="slow"
          waveWidth={56}
        >
          <h2 className="text-[min(16vw,8rem)] font-semibold leading-[0.9] tracking-tight text-black select-none">
            AGENDA
          </h2>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border-2 border-black px-3 py-1 text-[12px] font-semibold tracking-widest text-black">
            Agenda
          </div>
        </WavyBackground>
      </div>

      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-x-hidden">
        <div className="hidden md:grid md:grid-cols-12 border-y-2 border-black bg-black/5 text-[14px] lg:text-[15px] uppercase tracking-widest text-neutral-700">
          <div className="col-span-3 px-8 lg:px-12 py-5">Theme</div>
          <div className="col-span-6 px-8 lg:px-12 py-5">Topic</div>
          <div className="col-span-2 px-8 lg:px-12 py-5">Speaker</div>
          <div className="col-span-1 px-8 lg:px-12 py-5 text-right">Time</div>
        </div>

        <div className="md:hidden divide-y-2 divide-black/50 border-y-2 border-black/50 bg-white">
          {ITEMS.map((it, idx) => (
            <div key={idx} className="px-4 py-5 transition-colors duration-200 ease-out hover:bg-black/5">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center rounded-sm border-2 border-black px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-widest">{it.theme}</span>
                <div className="text-[16px] font-semibold">{it.time}</div>
              </div>
              <div className="mt-3 text-[1.125rem] font-semibold leading-snug tracking-tight">{it.topic}</div>
              <div className="mt-2 text-[14px] text-neutral-600">{it.speaker || '—'}</div>
            </div>
          ))}
        </div>

        <div className="hidden md:block">
          {ITEMS.map((it, idx) => (
            <div key={idx} className="grid grid-cols-12 border-b-2 border-black/50 bg-white transition-colors duration-200 ease-out hover:bg-black/5">
              <div className="col-span-3 flex items-center px-8 lg:px-12 py-8">
                <span className="inline-flex items-center rounded-sm border-2 border-black px-4 py-2 text-[13px] font-medium uppercase tracking-widest">{it.theme}</span>
              </div>
              <div className="col-span-6 px-8 lg:px-12 py-8">
                <div className="text-[clamp(1.25rem,3vw,1.75rem)] font-semibold tracking-tight">{it.topic}</div>
              </div>
              <div className="col-span-2 px-8 lg:px-12 py-8">
                {it.speaker ? (
                  <div className="text-[15px] font-medium">{it.speaker}</div>
                ) : (
                  <div className="text-[13px] text-neutral-500">—</div>
                )}
              </div>
              <div className="col-span-1 px-8 lg:px-12 py-8 text-right text-[15px] font-semibold">{it.time}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
