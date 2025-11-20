export default function Header() {

  return (
    <>
      <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-md border-b border-amber-500/20">
        <div className="border-y border-amber-500/10">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
            <div className="flex items-center gap-3">
              <span className="inline-block rounded-sm border border-amber-500/50 px-2 py-0.5 text-[11px] uppercase tracking-widest text-amber-400 font-bold">2026</span>
              <span className="text-[13px] font-medium text-white tracking-wide">Millionaire Summit</span>
            </div>
            <nav aria-label="Primary" className="hidden md:block">
              <ul className="flex items-center gap-8 m-0 p-0">
                <li>
                  <a href="#about" className="group relative inline-flex items-center text-[13px] no-underline text-gray-300 hover:text-amber-400 transition-colors">
                    <span className="relative z-10">About</span>
                    <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-amber-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </a>
                </li>
                <li>
                  <a href="#who-for" className="group relative inline-flex items-center text-[13px] no-underline text-gray-300 hover:text-amber-400 transition-colors">
                    <span className="relative z-10">Who For</span>
                    <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-amber-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </a>
                </li>
                <li>
                  <a href="#agenda" className="group relative inline-flex items-center text-[13px] no-underline text-gray-300 hover:text-amber-400 transition-colors">
                    <span className="relative z-10">Agenda</span>
                    <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-amber-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </a>
                </li>
                <li>
                  <a href="#sponsors" className="group relative inline-flex items-center text-[13px] no-underline text-gray-300 hover:text-amber-400 transition-colors">
                    <span className="relative z-10">Sponsors</span>
                    <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-amber-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </a>
                </li>
                <li>
                  <a
                    href="#tickets"
                    className="inline-flex items-center rounded-full border border-amber-500/50 px-4 py-1.5 text-[13px] no-underline text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-300"
                  >
                    Apply Now
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
