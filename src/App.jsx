import { useEffect } from 'react'
import Lenis from 'lenis'
import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import Countdown from './components/Countdown'
import WhoFor from './components/WhoFor'
import Header from './components/Header'
import Agenda from './components/Agenda'

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
      <WhoFor />
      <Countdown />
      <Agenda />
    </>
  )
}

export default App
