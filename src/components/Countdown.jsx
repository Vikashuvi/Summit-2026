import { useEffect, useMemo, useState } from 'react'

function pad2(n) {
  return n < 10 ? '0' + n : '' + n
}

export default function Countdown({ target = new Date(2026, 0, 3, 0, 0, 0) }) {
  const targetMs = useMemo(() => target.getTime(), [target])
  const [time, setTime] = useState({ d: '00', h: '00', m: '00', s: '00' })

  useEffect(() => {
    function tick() {
      const now = Date.now()
      const diff = targetMs - now
      if (diff <= 0) {
        setTime({ d: '00', h: '00', m: '00', s: '00' })
        return
      }
      const oneSec = 1000
      const oneMin = 60 * oneSec
      const oneHour = 60 * oneMin
      const oneDay = 24 * oneHour
      const days = Math.floor(diff / oneDay)
      const hours = Math.floor((diff % oneDay) / oneHour)
      const mins = Math.floor((diff % oneHour) / oneMin)
      const secs = Math.floor((diff % oneMin) / oneSec)
      setTime({ d: pad2(days), h: pad2(hours), m: pad2(mins), s: pad2(secs) })
    }
    const id = setInterval(tick, 1000)
    tick()
    return () => clearInterval(id)
  }, [targetMs])

  return (
    <section className="timer mx-auto my-16 max-w-5xl">
      <div className="eventinh1">
        <h2>Event starts in</h2>
      </div>

      <div className="timer-boxes-container">
        <Box label="Days" value={time.d} />
        <Box label="Hours" value={time.h} />
        <Box label="Minutes" value={time.m} />
        <Box label="Seconds" value={time.s} />
      </div>
    </section>
  )
}

function Box({ label, value }) {
  return (
    <div className="box">
      <span className="num">{value}</span>
      <span className="text">{label}</span>
    </div>
  )
}
