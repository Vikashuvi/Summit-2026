import sp1 from '../assets/speakers/sp1.png'
import sp2 from '../assets/speakers/sp2.png'
import sp3 from '../assets/speakers/sp3.png'
import sp4 from '../assets/speakers/sp4.png'
import sp5 from '../assets/speakers/sp5.png'
import sp6 from '../assets/speakers/sp6.png'

const SPEAKERS = [
  {
    src: sp1,
    name: 'Dr. Chackochen Mathai',
    role: 'Founder & CEO of Franchising Rightway',
  },
  {
    src: sp2,
    name: 'Mr. Balaji Venkatrathinam',
    role: 'Founder & Executive Director of Solidpro Group',
  },
  {
    src: sp3,
    name: 'Mr. Sriram Manoharan',
    role: 'Founder & CEO of Contus Tech',
  },
  {
    src: sp4,
    name: 'Mr. Rathinnaswamy A',
    role: 'Founder & Chief Mentor of Midna Global & Co-Creator Thyrocare',
  },
  {
    src: sp5,
    name: 'Mr. Kavin Kumar Kandasamy',
    role: 'CEO of ProClime',
  },
  {
    src: sp6,
    name: 'Mr. G. Muralidharan',
    role: 'M.D of KAG India Pvt Ltd of KAG Tiles',
  },
]

export default function Speakers() {
  return (
    <section id="speakers" className="mx-auto my-24 max-w-6xl px-6 md:px-10">
      <div className="mb-10">
        <div className="relative">
          <h2 className="text-[min(16vw,7rem)] font-semibold leading-[0.9] tracking-tight text-black select-none">
            SPEAKERS
          </h2>
          <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 bg-white border-2 border-black px-3 py-1 text-[12px] font-semibold tracking-widest text-black">
            Speakers
          </div>
        </div>
      </div>

      <div className="rounded-md border-2 border-black bg-white p-4 md:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
          {SPEAKERS.map((speaker, idx) => (
            <div key={idx} className="flex flex-col border-2 border-black bg-white">
              <div className="relative w-full aspect-square overflow-hidden bg-neutral-100">
                <img
                  src={speaker.src}
                  alt={speaker.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-8 md:px-4 md:pb-4 md:pt-10 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
                  <div className="text-[0.95rem] md:text-[1.05rem] font-semibold tracking-tight text-white">
                    {speaker.name}
                  </div>
                  <div className="mt-1 text-[0.8rem] md:text-[0.9rem] text-neutral-200">
                    {speaker.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
