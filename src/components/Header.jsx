export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="border-y-2 border-black">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-10">
          <div className="flex items-center gap-3">
            <span className="inline-block rounded-sm border-2 border-black px-2 py-0.5 text-[11px] uppercase tracking-widest">2026</span>
            <span className="text-[12px]">Millionaire Summit</span>
          </div>
          <div className="text-[12px]">Chennai, India</div>
        </div>
      </div>
    </header>
  )
}
