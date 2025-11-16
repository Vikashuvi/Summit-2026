import { useEffect } from 'react'
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

function App() {
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

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
       document.removeEventListener('click', handleAnchorClick)
    }
  }, [])
  return (
    <ClickSpark sparkColor="#000000" sparkSize={10} sparkRadius={18} sparkCount={10} duration={500} extraScale={1.1}>
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
    </ClickSpark>
  )
}

export default App
