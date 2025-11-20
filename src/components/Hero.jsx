import { useMemo, useState } from 'react'
import ThreeDHeading from './ui/ThreeDHeading'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[oklch(0.10_0.02_260)]">
      {/* Rich Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_oklch(0.20_0.05_260)_0%,_transparent_70%),_radial-gradient(circle_at_80%_20%,_oklch(0.85_0.15_85_/_0.1)_0%,_transparent_30%)]" />

      {/* Animated Particles/Grid (Optional subtle texture) */}
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle, #fbbf24 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      {/* Viewport frame strokes - Gold */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
        <div className="absolute inset-x-0 bottom-0 h-[4px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
        <div className="absolute inset-y-0 left-0 w-[4px] bg-gradient-to-b from-transparent via-amber-500 to-transparent opacity-50" />
        <div className="absolute inset-y-0 right-0 w-[4px] bg-gradient-to-b from-transparent via-amber-500 to-transparent opacity-50" />
      </div>

      {/* Content layer */}
      <div className="relative z-10">
        <div className="mx-auto flex h-screen max-w-7xl items-center justify-center px-6 md:px-10">
          <div className="w-full">
            <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
              {/* Masthead */}
              <div className="md:col-span-8 flex flex-col justify-center">
                <ThreeDHeading
                  text="Millionaire Summit & Awards 2026"
                  color="gold"
                  size="text-5xl md:text-7xl lg:text-8xl"
                  className="justify-start text-left mb-6"
                />

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mt-4 max-w-2xl text-lg md:text-xl text-gray-300 leading-relaxed font-light"
                >
                  Let’s Begin This Year with Some <span className="text-amber-400 font-medium">Powerful Knowledge</span>, <span className="text-amber-400 font-medium">Valuable Connection</span>, and <span className="text-amber-400 font-medium">Power Packed Energy…</span>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="mt-8 flex gap-6"
                >
                  <a
                    href="#tickets"
                    className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-8 py-3 text-base font-bold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(251,191,36,0.5)]"
                  >
                    <span className="relative z-10">Apply Now</span>
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-500 to-amber-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </a>
                </motion.div>
              </div>

              {/* Details card - Glassmorphism Gold */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="md:col-span-4"
              >
                <div className="relative overflow-hidden rounded-xl border border-amber-500/30 bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(251,191,36,0.1)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent pointer-events-none" />

                  <div className="grid grid-cols-1 divide-y divide-amber-500/20 relative z-10">
                    <div className="p-6 transition-colors hover:bg-amber-500/5">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-amber-400/80 font-bold">Date</div>
                      <div className="mt-2 text-lg font-medium text-white">Jan 3, 2026 · Saturday</div>
                    </div>
                    <div className="p-6 transition-colors hover:bg-amber-500/5">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-amber-400/80 font-bold">Time</div>
                      <div className="mt-2 text-lg font-medium text-white">08:00 – 17:00 IST</div>
                    </div>
                    <div className="p-6 transition-colors hover:bg-amber-500/5">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-amber-400/80 font-bold">Venue</div>
                      <div className="mt-2 text-lg font-medium text-white">Hotel Green Park, Chennai</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
