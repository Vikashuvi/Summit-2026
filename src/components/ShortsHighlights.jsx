import React, { useEffect, useRef, useState } from 'react'

const SHORTS = [
  {
    id: 'So2_UgKK7Ik',
    title: 'Millionaire Summit Highlight 1',
    description: 'A quick glimpse into the energy and experience at Millionaire Summit.',
    url: 'https://youtube.com/shorts/So2_UgKK7Ik',
  },
  {
    id: '9Vqq8m_cFx0',
    title: 'Millionaire Summit Highlight 2',
    description: 'Another moment from the Summit stage and audience.',
    url: 'https://youtube.com/shorts/9Vqq8m_cFx0',
  },
  {
    id: 'lM885rZ-ta8',
    title: 'Millionaire Summit Highlight 3',
    description: 'Energy, insights, and crowd reactions in 30 seconds.',
    url: 'https://youtube.com/shorts/lM885rZ-ta8',
  },
  {
    id: 'DfujDW5xhxg',
    title: 'Millionaire Summit Highlight 4',
    description: 'A quick look at the atmosphere and networking.',
    url: 'https://youtube.com/shorts/DfujDW5xhxg',
  },
  {
    id: 'mM2am4JCpOA',
    title: 'Millionaire Summit Highlight 5',
    description: 'Stage moments and crowd engagement.',
    url: 'https://youtube.com/shorts/mM2am4JCpOA',
  },
  {
    id: '7EC1pGWLm64',
    title: 'Millionaire Summit Highlight 6',
    description: 'Snapshots of learning and celebration.',
    url: 'https://youtube.com/shorts/7EC1pGWLm64',
  },
  {
    id: 'kAi9Mf4HHfQ',
    title: 'Millionaire Summit Highlight 7',
    description: 'Powerful clips from the Summit experience.',
    url: 'https://youtube.com/shorts/kAi9Mf4HHfQ',
  },
  {
    id: 'zluEFLUGoNY',
    title: 'Millionaire Summit Highlight 8',
    description: 'Another short glimpse into the event vibe.',
    url: 'https://youtube.com/shorts/zluEFLUGoNY',
  },
]

export default function ShortsHighlights() {
  const scrollRef = useRef(null)
  const [scrollValue, setScrollValue] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const updateMaxScroll = () => {
      const max = Math.max(el.scrollWidth - el.clientWidth, 0)
      setMaxScroll(max)
      setScrollValue(el.scrollLeft)
    }

    updateMaxScroll()

    window.addEventListener('resize', updateMaxScroll)
    return () => {
      window.removeEventListener('resize', updateMaxScroll)
    }
  }, [])

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setScrollValue(el.scrollLeft)
  }

  const handleSliderChange = (e) => {
    const el = scrollRef.current
    if (!el) return
    const next = Number(e.target.value)
    setScrollValue(next)
    el.scrollTo({ left: next, behavior: 'smooth' })
  }

  return (
    <section
      id="highlights"
      className="mx-auto my-24 max-w-6xl px-6 md:px-10"
    >
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-neutral-600">
            Event Highlights
          </p>
          <h2 className="mt-2 text-[clamp(2rem,4vw,2.6rem)] font-semibold tracking-tight text-black">
            Watch the energy in 30 seconds
          </h2>
          <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-neutral-700">
            Scroll through the shorts to feel the pace, crowd energy, and what it&apos;s like inside the Millionaire Summit room.
          </p>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SHORTS.map((short) => {
            const embedSrc = `https://www.youtube.com/embed/${short.id}?autoplay=1&mute=1&playsinline=1&controls=0&loop=1&playlist=${short.id}`

            return (
              <article
                key={short.id}
                className="group relative flex min-w-[220px] max-w-[260px] flex-shrink-0 flex-col rounded-md border-2 border-black bg-white shadow-[0_4px_0px_0px_#000] transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_0px_0px_#000]"
              >
                <div className="relative aspect-[9/16] overflow-hidden border-b-2 border-black bg-black">
                  <iframe
                    src={embedSrc}
                    title={short.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full scale-[1.02] transform transition-transform duration-500 group-hover:scale-[1.06]"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 opacity-70 transition-opacity duration-300 group-hover:opacity-40" />

                  <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center rounded-full border-[1.5px] border-white/80 bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
                    Short
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4">
                  <div className="flex-1">
                    <h3 className="text-[0.95rem] font-semibold tracking-tight text-black line-clamp-2">
                      {short.title}
                    </h3>
                    {short.description && (
                      <p className="mt-2 text-[0.82rem] leading-relaxed text-neutral-700 line-clamp-3">
                        {short.description}
                      </p>
                    )}
                  </div>

                  <a
                    href={short.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center justify-center rounded-sm border-2 border-black bg-black px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white no-underline transition-colors duration-300 group-hover:bg-white group-hover:text-black"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </article>
            )
          })}
        </div>
        {maxScroll > 0 && (
          <div className="mt-3 hidden md:block">
            <div className="flex items-center gap-3 rounded-md border-2 border-black bg-white px-3 py-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-700">
                Scroll
              </span>
              <input
                type="range"
                min={0}
                max={maxScroll}
                value={scrollValue}
                onChange={handleSliderChange}
                className="h-1 flex-1 cursor-pointer appearance-none bg-neutral-200 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
