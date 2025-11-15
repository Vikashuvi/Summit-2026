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

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])
  return (
    <>
      <Header />
      <Hero />
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
      <Footer />
    </>
  )
}

export default App
