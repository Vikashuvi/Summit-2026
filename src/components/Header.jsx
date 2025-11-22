import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo-blue.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white">
        <div className="border-y-2 border-black">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-10">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Millionaire Summit" className="h-8 w-auto" />
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-sm border border-black p-2 text-xs md:hidden"
              aria-label="Toggle navigation menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? (
                <FaTimes className="h-4 w-4" />
              ) : (
                <FaBars className="h-4 w-4" />
              )}
            </button>
            <nav aria-label="Primary" className="hidden md:block">
              <ul className="flex items-center gap-6 m-0 p-0">
                <li>
                  <a href="#about" className="group relative inline-flex items-center text-[13px] no-underline text-black">
                    <span className="relative z-10">About</span>
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </a>
                </li>
                <li>
                  <a href="#who-for" className="group relative inline-flex items-center text-[13px] no-underline text-black">
                    <span className="relative z-10">Who For</span>
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </a>
                </li>
                <li>
                  <a href="#agenda" className="group relative inline-flex items-center text-[13px] no-underline text-black">
                    <span className="relative z-10">Agenda</span>
                    <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-black origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </a>
                </li>
                <li>
                  <a
                    href="#tickets"
                    className="inline-flex items-center rounded-sm border-2 border-black px-3 py-1 text-[13px] no-underline text-black hover:bg-black hover:text-white transition-colors"
                  >
                    Apply Now
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <nav
            aria-label="Mobile primary"
            className={`md:hidden border-t border-black bg-white overflow-hidden transition-all duration-300 ease-out transform ${
              isMenuOpen
                ? 'max-h-96 opacity-100 translate-y-0'
                : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none'
            }`}
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 md:px-10 m-0">
                <li>
                  <a
                    href="#about"
                    className="inline-flex items-center text-[13px] no-underline text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#who-for"
                    className="inline-flex items-center text-[13px] no-underline text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Who For
                  </a>
                </li>
                <li>
                  <a
                    href="#agenda"
                    className="inline-flex items-center text-[13px] no-underline text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Agenda
                  </a>
                </li>
                <li>
                  <a
                    href="#tickets"
                    className="inline-flex items-center justify-center rounded-sm border-2 border-black px-3 py-2 text-[13px] no-underline text-black hover:bg-black hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Apply Now
                  </a>
                </li>
              </ul>
            </nav>
        </div>
      </header>
    </>
  )
}
