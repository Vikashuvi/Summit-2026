import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import Countdown from './components/Countdown'
import WhoFor from './components/WhoFor'
import Header from './components/Header'
import Agenda from './components/Agenda'
import CurvedLoop from './components/ui/shadcn-io/curved-loop'
import Footer from './components/Footer'
import EventTheme from './components/EventTheme'
import Sponsors from './components/Sponsors'
import ClickSpark from './components/ClickSpark'
import ApplyFormModal from './components/ApplyFormModal'
import { FaTicketAlt } from 'react-icons/fa'

function App() {
  const [isGlobalApplyOpen, setIsGlobalApplyOpen] = useState(false)
  const [isBadgeExpanded, setIsBadgeExpanded] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: true,
    })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
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
      {/* Global floating Apply badge: red ticket container on right edge */}
      <div
        className={`fixed right-0 top-20 z-50 transform transition-transform duration-500 ${
          // When collapsed, slide part of the pill off-screen but keep the ticket icon fully visible
          isBadgeExpanded ? 'translate-x-0' : 'translate-x-[69%]'
        }`}
        onMouseEnter={() => setIsBadgeExpanded(true)}
        onMouseLeave={() => setIsBadgeExpanded(false)}
      >
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-l-full border-2 border-red-600 bg-red-500 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-white shadow-md hover:bg-red-600 transition-colors"
          aria-label="Apply Now"
          onClick={() => {
            setIsGlobalApplyOpen(true)
            setIsBadgeExpanded(true)
          }}
        >
          <span className="text-lg leading-none">
            <FaTicketAlt />
          </span>
          <span>Apply Now</span>
        </button>
      </div>

      <Header />
      <Hero />
      <EventTheme />
      <About />
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
      <Sponsors />
      <Footer />

      <ApplyFormModal open={isGlobalApplyOpen} onClose={() => setIsGlobalApplyOpen(false)} />
    </ClickSpark>
  )
}

export default App
