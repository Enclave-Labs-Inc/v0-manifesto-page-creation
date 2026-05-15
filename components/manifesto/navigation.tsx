'use client'

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-[#111215] border-b border-[#1E2025]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-12">
        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#1E2025]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#1E2025]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#1E2025]" />
          </div>
          <span className="text-[11px] font-mono text-[#E8E9EC] tracking-[0.06em] uppercase">
            enclave
          </span>
        </div>

        <a
          href="#manifesto"
          className="text-[10px] font-mono text-[#9499A6] hover:text-[#B4B8C2] transition-colors ml-auto"
        >
          manifesto
        </a>
      </div>
    </nav>
  )
}
