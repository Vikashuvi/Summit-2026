import { useState, useEffect } from 'react'
import { MdOutlineArrowOutward } from 'react-icons/md'
import sp1 from '../assets/speakers/sp1.png'
import sp2 from '../assets/speakers/sp2.png'
import sp3 from '../assets/speakers/sp3.png'
import sp4 from '../assets/speakers/sp4.png'
import sp5 from '../assets/speakers/sp5.png'
import sp6 from '../assets/speakers/sp6.png'

const SPEAKERS = [
  {
    src: sp1,
    name: 'Dr. Chackochan Mathai',
    role: 'Founder & CEO – Franchising Rightway',
    stat: 'Estimated Annual Business Impact: ₹30–40 Crores',
    bio:
      'Dr. Mathai is a respected authority in India\'s franchising ecosystem. His organization has helped scale hundreds of brands across multiple industries.\n\nThrough Franchising Rightway\'s structured expansion models, he has enabled several companies to break their revenue ceilings and enter multi-crore growth cycles.',
  },
  {
    src: sp2,
    name: 'Mr. Balaji Venkatrathinam',
    role: 'Founder & Executive Director – Solidpro Group',
    stat: 'Estimated Group Turnover: ₹50+ Crores',
    bio:
      'Balaji has built Solidpro Group through discipline, systems, and bold decision-making. From engineering solutions to turnkey projects, Solidpro has scaled to multiple locations with consistent year-on-year growth.\n\nHis leadership stands as proof that structured execution always wins.',
  },
  {
    src: sp3,
    name: 'Mr. Sriram Manoharan',
    role: 'Founder & CEO – Contus Tech',
    stat: 'Estimated Global Revenue: ₹150–200 Crores',
    bio:
      'Sriram is one of India\'s most influential tech founders, building world-class digital products used across 40+ countries. Contus Tech continues to be a pioneer in digital engineering, AI-powered platforms, and cloud transformation.\n\nHis journey is a benchmark for Indian founders aiming for global scale.',
  },
  {
    src: sp4,
    name: 'Mr. Rathinaswamy A.',
    role: 'Founder & Chief Mentor – Midna Global · Co-Creator – Thyrocare',
    stat: 'Co-Creator – Thyrocare (Revenue ₹1,200+ Crores)',
    bio:
      'Rathinaswamy\'s influence spans across psychology, wellness, diagnostics, and human potential sciences. As a strategic mind behind systems at Thyrocare and the mentor driving Midna Global\'s growth, his work has impacted lakhs of families and entrepreneurs across India.',
  },
  {
    src: sp5,
    name: 'Mr. Kavin Kumar Kandasamy',
    role: 'CEO – ProClime',
    stat: 'Company Revenue: ₹200+ Crores invested in group of companies',
    bio:
      'Kavin represents the rising wave of young, fast-execution founders. ProClime has quickly become a trusted name in sustainable cooling, clean-air technology, and green building solutions.\n\nHis clarity, modern thinking, and grounded leadership make him a standout in Tamil Nadu\'s new-age founder circle.',
  },
  {
    src: sp6,
    name: 'Mr. G. Muralidharan',
    role: 'Managing Director – KAG India Pvt Ltd (KAG Tiles)',
    stat: 'Company Revenue: ₹650+ Crores',
    bio:
      'KAG Tiles is one of India\'s most trusted brands in the ceramics industry. Under Mr. Muralidharan\'s strong and steady leadership, KAG has expanded across multiple states with a wide distributor network and a consistent record of quality and on-time delivery.\n\nHis journey reflects decades of focus, resilience, and customer trust.',
  },
]

export default function Speakers({ onToggleScrollLock = () => {} }) {
  const [activeSpeaker, setActiveSpeaker] = useState(null)
  const [isClosing, setIsClosing] = useState(false)

  const openSpeaker = (speaker) => {
    setActiveSpeaker(speaker)
    setIsClosing(false)
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setActiveSpeaker(null)
      setIsClosing(false)
    }, 260)
  }

  useEffect(() => {
    if (typeof document === 'undefined') return

    if (activeSpeaker) {
      const body = document.body
      const html = document.documentElement
      const previousBodyOverflow = body.style.overflow
      const previousHtmlOverflow = html.style.overflow

      body.style.overflow = 'hidden'
      html.style.overflow = 'hidden'
      onToggleScrollLock(true)

      const preventScroll = (e) => {
        e.preventDefault()
      }

      const preventScrollKeys = (e) => {
        const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']
        if (keys.includes(e.key)) {
          e.preventDefault()
        }
      }

      window.addEventListener('wheel', preventScroll, { passive: false })
      window.addEventListener('touchmove', preventScroll, { passive: false })
      window.addEventListener('keydown', preventScrollKeys, { passive: false })

      return () => {
        body.style.overflow = previousBodyOverflow
        html.style.overflow = previousHtmlOverflow
        onToggleScrollLock(false)
        window.removeEventListener('wheel', preventScroll)
        window.removeEventListener('touchmove', preventScroll)
        window.removeEventListener('keydown', preventScrollKeys)
      }
    }
  }, [activeSpeaker])

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
            <button
              key={idx}
              type="button"
              onClick={() => openSpeaker(speaker)}
              className="group flex flex-col border-2 border-black bg-white text-left focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <div className="relative w-full aspect-square overflow-hidden bg-neutral-100">
                <img
                  src={speaker.src}
                  alt={speaker.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 pl-3 pr-12 pb-3 pt-8 md:pl-4 md:pr-14 md:pb-4 md:pt-10 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
                  <div className="text-[0.95rem] md:text-[1.05rem] font-semibold tracking-tight text-white">
                    {speaker.name}
                  </div>
                  <div className="mt-1 text-[0.8rem] md:text-[0.9rem] text-neutral-200">
                    {speaker.role}
                  </div>
                  <div className="pointer-events-none absolute bottom-2 right-3 text-white md:bottom-3 md:right-4">
                    <MdOutlineArrowOutward className="h-5 w-5 md:h-6 md:w-6 transform transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {activeSpeaker && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 speaker-modal-overlay ${
            isClosing ? 'speaker-modal-overlay-closing' : ''
          }`}
        >
          <div
            className="absolute inset-0"
            onClick={handleClose}
          />

          <div
            className={`relative z-10 w-full max-w-2xl rounded-md border-2 border-black bg-white shadow-[0_20px_0_0_#000] max-h-[90vh] overflow-y-auto speaker-modal-card ${
              isClosing ? 'speaker-modal-card-closing' : ''
            }`}
          >
            <div className="flex items-start justify-between border-b-2 border-black px-5 py-4 md:px-6">
              <div>
                <div className="text-[0.75rem] font-semibold uppercase tracking-[0.25em] text-neutral-600">
                  Summit 2026 Speaker
                </div>
                <h3 className="mt-1 text-[1.5rem] font-semibold tracking-tight text-black">
                  {activeSpeaker.name}
                </h3>
                <p className="mt-1 text-[0.95rem] text-neutral-700">
                  {activeSpeaker.role}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-black text-white text-sm font-semibold leading-none"
              >
                ×
              </button>
            </div>

            <div className="px-5 pb-5 pt-4 md:px-6 md:pb-6 md:pt-5">
              {activeSpeaker.stat && (
                <div className="inline-flex rounded-full border-2 border-black bg-black px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-white">
                  {activeSpeaker.stat}
                </div>
              )}

              <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] md:items-start">
                <div className="overflow-hidden rounded-md border-2 border-black bg-neutral-100">
                  <img
                    src={activeSpeaker.src}
                    alt={activeSpeaker.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="text-[0.98rem] leading-relaxed text-neutral-800">
                  {activeSpeaker.bio
                    ? activeSpeaker.bio.split('\n\n').map((paragraph, idx) => (
                        <p key={idx} className={idx === 0 ? '' : 'mt-3'}>
                          {paragraph}
                        </p>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
