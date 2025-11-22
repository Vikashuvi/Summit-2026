import { useEffect, useState, useRef } from 'react'
import Lenis from 'lenis'
import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import ShortsHighlights from './components/ShortsHighlights'
import Countdown from './components/Countdown'
import WhoFor from './components/WhoFor'
import Header from './components/Header'
import Agenda from './components/Agenda'
import CurvedLoop from './components/ui/shadcn-io/curved-loop'
import Footer from './components/Footer'
import EventTheme from './components/EventTheme'
import Sponsors from './components/Sponsors'
import Speakers from './components/Speakers'
import ClickSpark from './components/ClickSpark'
import ApplyFormModal from './components/ApplyFormModal'
import Tickets from './components/Tickets'
import { WavyBackground } from './components/ui/wavy-background'
import { FaTicketAlt } from 'react-icons/fa'

function PlainTextPage({ title, src }) {
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load content')
        return res.text()
      })
      .then((txt) => {
        if (isMounted) setContent(txt)
      })
      .catch(() => {
        if (isMounted) setError('Unable to load this document right now.')
      })

    return () => {
      isMounted = false
    }
  }, [src])

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-2xl font-semibold tracking-tight">{title}</h1>
          <pre className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-900">
            {error ? error : content || 'Loading...'}
          </pre>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  const [isGlobalApplyOpen, setIsGlobalApplyOpen] = useState(false)
  const [isBadgeExpanded, setIsBadgeExpanded] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [isScrollLocked, setIsScrollLocked] = useState(false)
  const scrollLockedRef = useRef(false)
  const [hash, setHash] = useState(() =>
    typeof window === 'undefined' ? '#/' : window.location.hash || '#/'
  )

  const isApplyPage = hash.startsWith('#/apply')
  const isTermsPage = hash.startsWith('#/terms')
  const isPrivacyPage = hash.startsWith('#/privacy')

  const getTicketFromHash = () => {
    if (!hash) return null
    const [, query = ''] = hash.split('?')
    const params = new URLSearchParams(query)
    return params.get('ticket')
  }

  const initialTicketFromUrl = getTicketFromHash()
  const pageHeading = 'Privacy Policy'

  useEffect(() => {
    scrollLockedRef.current = isScrollLocked
  }, [isScrollLocked])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleHashChange = () => {
      const newHash = window.location.hash || '#/'
      setHash(newHash)
      if (newHash.startsWith('#/apply')) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: true,
    })

    let rafId
    const raf = (time) => {
      if (!scrollLockedRef.current) {
        lenis.raf(time)
      }
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href') || ''
      if (href === '#' || href.length <= 1) return
      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        lenis.scrollTo(target, { offset: -80 })
      }
    }
    document.addEventListener('click', handleAnchorClick)

    let peekTimeout
    const SHOW_DURATION = 5000
    const HIDE_DURATION = 5000

    const peek = () => {
      setIsBadgeExpanded(true)
      peekTimeout = setTimeout(() => {
        setIsBadgeExpanded(false)
      }, SHOW_DURATION)
    }

    // initial peek
    peek()
    const intervalId = setInterval(peek, SHOW_DURATION + HIDE_DURATION)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      document.removeEventListener('click', handleAnchorClick)
      clearInterval(intervalId)
      if (peekTimeout) clearTimeout(peekTimeout)
    }
  }, [])
  return (
    <ClickSpark sparkColor="#000000" sparkSize={10} sparkRadius={18} sparkCount={10} duration={500} extraScale={1.1}>
      {isApplyPage ? (
        <>
          <div className="min-h-screen bg-neutral-50 flex flex-col">
            <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden border-b-2 border-black bg-white">
              <WavyBackground
                containerClassName="h-[120px] md:h-[180px]"
                className="flex h-full items-center justify-center px-4 md:px-6"
                backgroundFill="white"
                waveOpacity={0.35}
                blur={8}
                speed="slow"
                waveWidth={56}
              >
                <div className="text-center">
                  <div className="text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-neutral-700 mb-2">
                    Millionaire Summit & Awards 2026
                  </div>
                  <h1 className="text-[min(12vw,5.5rem)] font-semibold leading-[0.9] tracking-tight text-black select-none uppercase">
                    {pageHeading}
                  </h1>
                </div>
              </WavyBackground>
            </div>
            <div className="flex-1 flex items-center justify-center px-4 py-10">
              <ApplyFormModal
                open={true}
                onClose={() => {
                  if (typeof window !== 'undefined') {
                    window.location.hash = '#/'
                  }
                }}
                ticketType={initialTicketFromUrl || selectedTicket}
                isPage={true}
              />
            </div>
          </div>
          <Footer />
        </>
      ) : isTermsPage ? (
        <PlainTextPage title="Terms and Conditions" src="/terms.txt" />
      ) : isPrivacyPage ? (
        <PlainTextPage title="Privacy Policy" src="/privacy.txt" />
      ) : (
        <>
          {/* Global floating Apply badge: red ticket container on right edge */}
          <div
            className={`fixed right-0 top-20 z-50 transform transition-transform duration-500 ${
              // When collapsed, slide part of the pill off-screen but keep the ticket icon fully visible
              isBadgeExpanded ? 'translate-x-0' : 'translate-x-[69%]'
            }`}
            onMouseEnter={() => setIsBadgeExpanded(true)}
            onMouseLeave={() => setIsBadgeExpanded(false)}
          >
            <a
              href="#tickets"
              className="inline-flex items-center gap-2 rounded-l-full border-2 border-red-600 bg-red-500 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-white shadow-md hover:bg-red-600 transition-colors no-underline"
              aria-label="Apply Now"
              onClick={() => {
                setIsBadgeExpanded(true)
              }}
            >
              <span className="text-lg leading-none">
                <FaTicketAlt />
              </span>
              <span>Apply Now</span>
            </a>
          </div>

          <Header />
          <Hero />
          <EventTheme />
          <About />
          <Speakers onToggleScrollLock={setIsScrollLocked} />
          <ShortsHighlights />
          <Countdown />
          <CurvedLoop
            marqueeText="Summit 2026 ✦"
            speed={2}
            curveAmount={180}
            direction="left"
            interactive={true}
            className="!fill-black text-[72px] md:text-[96px]"
            containerClassName="min-h-[180px] md:min-h-[220px]"
            sShape
          />
          <WhoFor />
          <Agenda />
          <Tickets
            onApplyClick={(ticketId) => {
              setSelectedTicket(ticketId)
              setIsGlobalApplyOpen(true)
            }}
          />
          {/* <Sponsors /> */}
          <Footer />

          <ApplyFormModal
            open={isGlobalApplyOpen}
            onClose={() => setIsGlobalApplyOpen(false)}
            ticketType={selectedTicket}
          />
        </>
      )}
    </ClickSpark>
  )
}

export default App
