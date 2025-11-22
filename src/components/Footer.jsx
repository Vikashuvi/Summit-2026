import logo from '../assets/logo-white.png'

export default function Footer() {

  return (
    <>
      <footer className="mt-20 border-t-2 border-white bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Millionaire Summit" className="h-8 w-auto" />
            </div>
            <p className="mt-4 max-w-md text-[14px] text-neutral-300">
              A day of knowledge, high-value connections, and recognition. Join leaders shaping the next decade.
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div>
                <div className="text-[13px] font-semibold uppercase tracking-widest">Navigate</div>
                <ul className="mt-3 space-y-2 text-[14px]">
                  <li><a href="#about" className="group relative inline-flex items-center text-white no-underline"><span className="relative z-10">About</span><span className="absolute -bottom-1 left-0 h-[2px] w-full bg-white origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500" /></a></li>
                  <li><a href="#who-for" className="group relative inline-flex items-center text-white no-underline"><span className="relative z-10">Who For</span><span className="absolute -bottom-1 left-0 h-[2px] w-full bg-white origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500" /></a></li>
                  <li><a href="#agenda" className="group relative inline-flex items-center text-white no-underline"><span className="relative z-10">Agenda</span><span className="absolute -bottom-1 left-0 h-[2px] w-full bg-white origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500" /></a></li>
                  {/* <li><a href="#sponsors" className="group relative inline-flex items-center text-white no-underline"><span className="relative z-10">Sponsors</span><span className="absolute -bottom-1 left-0 h-[2px] w-full bg-white origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500" /></a></li> */}
                  <li>
                    <a
                      href="#tickets"
                      className="group relative inline-flex items-center text-white no-underline"
                    >
                      <span className="relative z-10">Apply Now</span>
                      <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-white origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="text-[13px] font-semibold uppercase tracking-widest">Info</div>
                <ul className="mt-3 space-y-2 text-[14px]">
                  <li className="text-neutral-300">Jan 3, 2026</li>
                  <li className="text-neutral-300">Chennai, India</li>
                  <li className="text-neutral-300">08:00 – 17:00 IST</li>
                </ul>
              </div>
              <div>
                <div className="text-[13px] font-semibold uppercase tracking-widest">Connect</div>
                <ul className="mt-3 space-y-2 text-[14px]">
                  <li>
                    <a
                      href="#tickets"
                      className="group relative inline-flex items-center text-white no-underline"
                    >
                      <span className="relative z-10">Apply Now</span>
                      <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-white origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t-2 border-white/40 pt-6 text-[13px] md:flex-row">
          <div className="text-neutral-300"> 2026 Millionaire Summit</div>
          <div className="flex items-center gap-6">
            <a
              href="#/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center text-white no-underline"
            >
              <span className="relative z-10">Terms & Conditions</span>
              <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-white origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </a>
            <a
              href="#/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center text-white no-underline"
            >
              <span className="relative z-10">Privacy Policy</span>
              <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-white origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </a>
          </div>
        </div>
      </div>
      </footer>
    </>
  )
}
