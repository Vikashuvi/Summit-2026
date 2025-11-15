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
    <section className="timer mx-auto my-14 max-w-6xl rounded-sm border-2 border-black bg-white px-5 py-6 md:px-8 md:py-8">
      {/* Title with strokes */}
      <div className="mb-6 flex items-center gap-3">
        <div className="hidden h-[2px] flex-1 bg-black md:block" />
        <h2 className="m-0 shrink-0 text-[clamp(1.25rem,2.3vw,1.6rem)] font-semibold leading-none tracking-tight">Event starts in</h2>
        <div className="hidden h-[2px] flex-1 bg-black md:block" />
      </div>

      <div className="grid grid-cols-4 gap-3 md:gap-4">
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
    <div className="box flex flex-col">
      <div className="flex items-center justify-center rounded-sm border-2 border-black bg-white px-3 py-6 md:px-4 md:py-8">
        <span className="num font-sans text-[clamp(2rem,6vw,3.5rem)] font-semibold leading-none tracking-tight">{value}</span>
      </div>
      <div className="flex items-center justify-between border-b-2 border-black/60 px-1 py-2 text-[12px] text-neutral-700 md:text-[13px]">
        <span className="uppercase tracking-[0.2em]">{label}</span>
        <span className="h-[2px] w-6 bg-black" />
      </div>
    </div>
  )
}
