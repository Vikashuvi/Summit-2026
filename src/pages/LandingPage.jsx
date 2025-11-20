import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Countdown from '../components/Countdown'
import WhoFor from '../components/WhoFor'
import Header from '../components/Header'
import Agenda from '../components/Agenda'
import CurvedLoop from '../components/ui/shadcn-io/curved-loop'
import Footer from '../components/Footer'
import EventTheme from '../components/EventTheme'
import Sponsors from '../components/Sponsors'
import Tickets from '../components/Tickets'
import { FaTicketAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
    const [isBadgeExpanded, setIsBadgeExpanded] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
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
            clearInterval(intervalId)
            if (peekTimeout) clearTimeout(peekTimeout)
        }
    }, [])

    return (
        <>
            {/* Global floating Apply badge: Gold ticket container on right edge */}
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
                    className="inline-flex items-center gap-2 rounded-l-full border-2 border-amber-400 bg-amber-500 px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-black shadow-[0_0_15px_rgba(251,191,36,0.4)] hover:bg-amber-400 transition-colors no-underline"
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
            <Countdown />
            <CurvedLoop
                marqueeText="Summit 2026 ✦"
                speed={2}
                curveAmount={180}
                direction="left"
                interactive={true}
                className="!fill-amber-400 text-[72px] md:text-[96px]"
                containerClassName="min-h-[180px] md:min-h-[220px]"
                sShape
            />
            <WhoFor />
            <Agenda />
            <Tickets
                onApplyClick={(ticketId) => {
                    navigate(`/apply?ticketType=${ticketId}`)
                }}
            />
            <Sponsors />
            <Footer />
        </>
    )
}
