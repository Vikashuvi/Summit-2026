export default function Footer() {

  return (
    <>
      <footer className="mt-20 border-t border-amber-500/20 bg-black/80 backdrop-blur-sm text-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <span className="inline-block rounded-sm border border-amber-500/50 px-2 py-0.5 text-[11px] uppercase tracking-widest text-amber-400 font-bold">2026</span>
                <span className="text-[13px] font-medium tracking-wide">Millionaire Summit</span>
              </div>
              <p className="mt-6 max-w-md text-[15px] text-gray-400 leading-relaxed">
                A day of knowledge, high-value connections, and recognition. Join leaders shaping the next decade.
              </p>
            </div>

            <div className="md:col-span-7">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-amber-500/80">Navigate</div>
                  <ul className="mt-4 space-y-3 text-[14px]">
                    <li><a href="#about" className="group relative inline-flex items-center text-gray-300 hover:text-amber-400 transition-colors no-underline"><span className="relative z-10">About</span><span className="absolute -bottom-1 left-0 h-[1px] w-full bg-amber-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" /></a></li>
                    <li><a href="#who-for" className="group relative inline-flex items-center text-gray-300 hover:text-amber-400 transition-colors no-underline"><span className="relative z-10">Who For</span><span className="absolute -bottom-1 left-0 h-[1px] w-full bg-amber-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" /></a></li>
                    <li><a href="#agenda" className="group relative inline-flex items-center text-gray-300 hover:text-amber-400 transition-colors no-underline"><span className="relative z-10">Agenda</span><span className="absolute -bottom-1 left-0 h-[1px] w-full bg-amber-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" /></a></li>
                    <li><a href="#sponsors" className="group relative inline-flex items-center text-gray-300 hover:text-amber-400 transition-colors no-underline"><span className="relative z-10">Sponsors</span><span className="absolute -bottom-1 left-0 h-[1px] w-full bg-amber-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" /></a></li>
                    <li>
                      <a
                        href="#tickets"
                        className="group relative inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors no-underline font-medium"
                      >
                        <span className="relative z-10">Apply Now</span>
                        <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-amber-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-amber-500/80">Info</div>
                  <ul className="mt-4 space-y-3 text-[14px]">
                    <li className="text-gray-400">Jan 3, 2026</li>
                    <li className="text-gray-400">Chennai, India</li>
                    <li className="text-gray-400">08:00 – 17:00 IST</li>
                  </ul>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-amber-500/80">Connect</div>
                  <ul className="mt-4 space-y-3 text-[14px]">
                    <li>
                      <a
                        href="#tickets"
                        className="group relative inline-flex items-center text-gray-300 hover:text-amber-400 transition-colors no-underline"
                      >
                        <span className="relative z-10">Contact Support</span>
                        <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-amber-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      </a>
                    </li>
                    <li><a href="#details" className="text-gray-300 hover:text-amber-400 transition-colors">Details</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-amber-500/10 pt-8 text-[13px] md:flex-row">
            <div className="text-gray-500">© 2026 Millionaire Summit. All rights reserved.</div>
            <div className="flex items-center gap-8">
              <a href="#" className="group relative inline-flex items-center text-gray-400 hover:text-amber-400 transition-colors no-underline"><span className="relative z-10">Terms</span><span className="absolute -bottom-1 left-0 h-[1px] w-full bg-amber-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" /></a>
              <a href="#" className="group relative inline-flex items-center text-gray-400 hover:text-amber-400 transition-colors no-underline"><span className="relative z-10">Privacy</span><span className="absolute -bottom-1 left-0 h-[1px] w-full bg-amber-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" /></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
