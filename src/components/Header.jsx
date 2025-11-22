import logo from '../assets/logo.png';

export default function Header() {

  return (
    <>
      <header className="sticky top-0 z-50 bg-white">
        <div className="border-y-2 border-black">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-10">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Millionaire Summit" className="h-8 w-auto" />
            </div>
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
        </div>
      </header>
    </>
  )
}
