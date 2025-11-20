import { WavyBackground } from "./ui/wavy-background";
import RevealOnScroll from './ui/RevealOnScroll'

const ITEMS = [
  { theme: 'Opening', topic: 'Exclusive Private Breakfast with Platinum Delegates', speaker: '', time: '08:00 AM' },
  { theme: 'Registration', topic: 'Registration', speaker: '', time: '09:00 AM' },
  { theme: 'Networking', topic: 'Networking with Tea and Cookies', speaker: '', time: '09:30 AM' },
  { theme: 'Ceremony', topic: 'Kick Starting the Event with Lamp Lighting', speaker: '', time: '10:00 AM' },
  { theme: 'Panel', topic: 'The Millionaire Panel Session', speaker: '', time: '11:00 AM' },
  { theme: 'Lunch', topic: 'Lunch with Networking', speaker: '', time: '01:00 PM' },
  { theme: 'Fun', topic: 'Little Happy Hours', speaker: '', time: '02:30 PM' },
  { theme: 'Keynote', topic: 'Keynote', speaker: '', time: '03:00 PM' },
  { theme: 'Panel', topic: "India's Future GCC Panel Session", speaker: '', time: '04:00 PM' },
  { theme: 'Networking', topic: 'Networking with Hi-Tea', speaker: '', time: '05:00 PM' },
]

export default function Agenda() {
  return (
    <section id="agenda" className="mx-auto my-20 max-w-7xl px-6 md:px-10">
      {/* Wavy background behind the large heading - full screen width */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen mb-6 overflow-hidden">
        <WavyBackground
          containerClassName="h-[180px] md:h-[240px]"
          className="flex h-full items-center justify-start px-4 md:px-6"
          backgroundFill="#ffffff"
          waveOpacity={0.2}
          blur={8}
          speed="slow"
          waveWidth={56}
          colors={['#f59e0b', '#d97706', '#b45309']}
        >
          <h2
            className="text-[min(16vw,8rem)] font-bold leading-[0.9] tracking-tight text-black select-none"
            style={{
              textShadow: '2px 2px 0px rgba(0,0,0,0.1), 4px 4px 0px rgba(0,0,0,0.08), 6px 6px 0px rgba(0,0,0,0.06), 8px 8px 0px rgba(0,0,0,0.04)'
            }}
          >
            AGENDA
          </h2>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-amber-500 border border-amber-600 px-4 py-1.5 text-[12px] font-bold tracking-[0.2em] text-black uppercase">
            Agenda
          </div>
        </WavyBackground>
      </div>

      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-x-hidden">
        <div className="hidden md:grid md:grid-cols-12 border-y border-gray-300 bg-amber-50 text-[14px] lg:text-[15px] uppercase tracking-widest text-amber-700 font-bold">
          <div className="col-span-3 px-8 lg:px-12 py-6">Theme</div>
          <div className="col-span-6 px-8 lg:px-12 py-6">Topic</div>
          <div className="col-span-2 px-8 lg:px-12 py-6">Speaker</div>
          <div className="col-span-1 px-8 lg:px-12 py-6 text-right">Time</div>
        </div>

        <div className="md:hidden divide-y divide-gray-200 border-y border-gray-300 bg-white/80 backdrop-blur-sm">
          {ITEMS.map((it, idx) => (
            <RevealOnScroll key={idx} direction="up" delay={0.1 * idx}>
              <div className="px-4 py-6 transition-colors duration-200 ease-out hover:bg-amber-50">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full border border-amber-500 bg-amber-500 px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-widest text-black">{it.theme}</span>
                  <div className="text-[16px] font-bold text-black">{it.time}</div>
                </div>
                <div className="mt-4 text-[1.125rem] font-semibold leading-snug tracking-tight text-black">{it.topic}</div>
                <div className="mt-2 text-[14px] text-gray-700">{it.speaker || '—'}</div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="hidden md:block">
          {ITEMS.map((it, idx) => (
            <RevealOnScroll key={idx} direction="up" delay={0.05 * idx}>
              <div className="grid grid-cols-12 border-b border-gray-200 bg-white/60 backdrop-blur-sm transition-colors duration-200 ease-out hover:bg-amber-50">
                <div className="col-span-3 flex items-center px-8 lg:px-12 py-8">
                  <span className="inline-flex items-center rounded-full border border-amber-500 bg-amber-500 px-4 py-2 text-[13px] font-bold uppercase tracking-widest text-black">{it.theme}</span>
                </div>
                <div className="col-span-6 px-8 lg:px-12 py-8 flex items-center">
                  <div className="text-[clamp(1.25rem,3vw,1.75rem)] font-semibold tracking-tight text-black">{it.topic}</div>
                </div>
                <div className="col-span-2 px-8 lg:px-12 py-8 flex items-center">
                  {it.speaker ? (
                    <div className="text-[15px] font-medium text-gray-700">{it.speaker}</div>
                  ) : (
                    <div className="text-[13px] text-gray-500">—</div>
                  )}
                </div>
                <div className="col-span-1 px-8 lg:px-12 py-8 flex items-center justify-end text-[15px] font-bold text-black">{it.time}</div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
