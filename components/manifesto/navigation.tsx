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

        {/* Links */}
        <div className="flex items-center gap-8 ml-auto">
          <a 
            href="#manifesto"
            className="text-[10px] font-mono text-[#4A4D55] hover:text-[#6B6E78] transition-colors"
          >
            manifesto
          </a>
          <a 
            href="#product"
            className="text-[10px] font-mono text-[#4A4D55] hover:text-[#6B6E78] transition-colors"
          >
            product
          </a>
          <a 
            href="#docs"
            className="text-[10px] font-mono text-[#4A4D55] hover:text-[#6B6E78] transition-colors"
          >
            docs
          </a>
          <button className="text-[10px] font-mono px-4 py-2 bg-[#E8E9EC] text-[#0A0B0D] rounded-[4px] hover:bg-white transition-colors">
            request access
          </button>
        </div>
      </div>
    </nav>
  )
}
