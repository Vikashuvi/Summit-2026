import { useEffect, useRef } from 'react'
import RevealOnScroll from './ui/RevealOnScroll'

export default function Sponsors() {
  const containerRef = useRef(null)
  const highlightRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const highlight = highlightRef.current
    if (!container || !highlight) return

    const firstItem = container.querySelector('.grid-item')

    const moveToElement = (el) => {
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cRect = container.getBoundingClientRect()
      // slight oversize and half-pixel offset to cover seams
      const dx = rect.left - cRect.left - 0.5
      const dy = rect.top - cRect.top - 0.5
      highlight.style.transform = `translate(${dx}px, ${dy}px)`
      highlight.style.width = `${rect.width + 1}px`
      highlight.style.height = `${rect.height + 1}px`
      highlight.style.opacity = '1'
    }

    const onMove = (e) => {
      const hovered = document.elementFromPoint(e.clientX, e.clientY)
      let el = null
      if (hovered && hovered.classList && hovered.classList.contains('grid-item')) {
        el = hovered
      } else if (hovered && hovered.parentElement && hovered.parentElement.classList.contains('grid-item')) {
        el = hovered.parentElement
      }
      if (el) moveToElement(el)
    }

    moveToElement(firstItem)
    container.addEventListener('mousemove', onMove)
    return () => container.removeEventListener('mousemove', onMove)
  }, [])

  // Using Simple Icons CDN for black logos; replace with local assets when available
  const topRow = [
    { alt: 'Adobe Premiere Pro', href: 'https://www.adobe.com/products/premiere.html', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobepremierepro.svg', width: 90, height: 90 },
    { alt: 'Adobe After Effects', href: 'https://www.adobe.com/products/aftereffects.html', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobeaftereffects.svg', width: 90, height: 90 },
    { alt: 'DaVinci Resolve', href: 'https://www.blackmagicdesign.com/products/davinciresolve/', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/davinciresolve.svg', width: 70, height: 70 },
  ]
  const bottomRow = [
    { alt: 'Adobe Illustrator', href: 'https://www.adobe.com/products/illustrator.html', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adobeillustrator.svg', width: 70, height: 70 },
    { alt: 'Perplexity', href: 'https://www.perplexity.ai/', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/perplexity.svg', width: 60, height: 60 },
    { alt: 'OpenAI', href: 'https://openai.com/', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg', width: 60, height: 60 },
    { alt: 'Framer', href: 'https://framer.com/', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/framer.svg', width: 60, height: 60 },
    { alt: 'Next.js', href: 'https://nextjs.org', src: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nextdotjs.svg', width: 100, height: 100 },
  ]

  return (
    <section id="sponsors" className="mt-24 w-full">
      <RevealOnScroll direction="up" delay={0.1}>
        <div className="mx-auto max-w-7xl px-6 md:px-10 mb-12">
          <div className="relative">
            <h2
              className="text-[min(14vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-black select-none"
              style={{
                textShadow: '2px 2px 0px rgba(0,0,0,0.1), 4px 4px 0px rgba(0,0,0,0.08), 6px 6px 0px rgba(0,0,0,0.06), 8px 8px 0px rgba(0,0,0,0.04)'
              }}
            >
              SPONSORS
            </h2>
            <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 bg-amber-500 border border-amber-600 px-4 py-1.5 text-[12px] font-bold tracking-[0.2em] text-black uppercase">
              Partners
            </div>
          </div>
        </div>
      </RevealOnScroll>

      <div ref={containerRef} className="relative w-full border-y border-gray-300 overflow-hidden bg-white/80 backdrop-blur-sm">
        <div className="hidden md:block">
          <div className="grid grid-cols-3 h-[clamp(160px,18vw,340px)]">
            {topRow.map((s, i) => (
              <div key={i} role="img" aria-label={s.alt} className={`grid-item relative flex items-center justify-center ${i !== topRow.length - 1 ? 'border-r border-gray-200' : ''}`}>
                <img src={s.src} alt="" loading="lazy" className="z-10 transition-all duration-300 h-14 md:h-16 w-auto" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                <span className="hidden absolute inset-0 z-10 flex items-center justify-center text-black font-semibold">{s.alt}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 h-[clamp(140px,14vw,280px)] border-t border-gray-200">
            {bottomRow.map((s, i) => (
              <div key={i} role="img" aria-label={s.alt} className={`grid-item relative flex items-center justify-center ${i !== bottomRow.length - 1 ? 'border-r border-gray-200' : ''}`}>
                <img src={s.src} alt="" loading="lazy" className="z-10 transition-all duration-300 h-10 md:h-12 w-auto" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
                <span className="hidden absolute inset-0 z-10 flex items-center justify-center text-black font-semibold text-sm md:text-base">{s.alt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile simplified grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-px md:hidden bg-gray-200">
          {[...topRow, ...bottomRow].map((s, i) => (
            <div key={i} role="img" aria-label={s.alt} className="grid-item relative flex items-center justify-center bg-white h-24">
              <img src={s.src} alt="" loading="lazy" className="z-10 transition-all duration-300 h-10 w-auto" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} />
              <span className="hidden absolute inset-0 z-10 flex items-center justify-center text-black font-semibold text-sm">{s.alt}</span>
            </div>
          ))}
        </div>

        <div ref={highlightRef} className="highlight hidden md:block absolute top-0 left-0 bg-amber-50 pointer-events-none transition-all duration-300 opacity-0 z-0" />
      </div>

      <style>{`.highlight{box-shadow: inset 0 0 0 1px rgba(245, 158, 11, 0.3);}`}</style>
    </section>
  )
}
