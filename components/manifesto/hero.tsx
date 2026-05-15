'use client'

export default function Hero() {
  return (
    <div className="pb-16 border-b border-[#1A1C20] mb-16">
      {/* Eyebrow */}
      <p className="text-[9px] font-mono tracking-[0.18em] uppercase text-[#4A4D55] mb-6">
        getenclave.ai · knowledge sovereignty manifesto · v1.0
      </p>

      {/* Headline */}
      <h1 className="text-[64px] font-serif italic text-[#E8E9EC] leading-[1.1] mb-6 max-w-3xl">
        Your company's brain. Complete. Private. Always on.
      </h1>

      {/* Subline */}
      <p className="text-[11px] font-mono text-[#6B6E78] leading-[1.85] max-w-2xl mb-8">
        A doctrine for how enterprise knowledge should work — and why we built Enclave to make it real.
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-3 mb-8">
        <button className="text-[10px] font-mono px-4 py-2 bg-[#E8E9EC] text-[#0A0B0D] rounded-[4px] hover:bg-white transition-colors">
          read the manifesto
        </button>
        <button className="text-[10px] font-mono px-4 py-2 border border-[#2A2C32] text-[#8A8D96] rounded-[4px] hover:border-[#3A3D45] hover:text-[#C4C6CC] transition-colors">
          request early access ↗
        </button>
      </div>

      {/* Privacy Indicator */}
      <div className="flex items-center gap-2">
        <div className="w-1 h-1 rounded-full bg-[#1D9E75]" />
        <span className="text-[9px] font-mono text-[#4A4D55]">
          data never leaves your infrastructure
        </span>
      </div>
    </div>
  )
}
