'use client'

export default function Hero() {
  return (
    <div className="pb-16 border-b border-[#1A1C20] mb-16">
      {/* Eyebrow */}
      <p className="text-manifesto-eyebrow mb-6">
        getenclave.ai · knowledge sovereignty manifesto · v1.0
      </p>

      {/* Headline */}
      <h1 className="text-[64px] font-serif italic text-[#E8E9EC] leading-[1.1] mb-6 max-w-3xl">
        Your company's brain. Complete. Private. Always on.
      </h1>

      {/* Subline */}
      <p className="text-manifesto-body max-w-2xl mb-8">
        A doctrine for how enterprise knowledge should work — and why we built Enclave to make it real.
      </p>

      {/* CTA */}
      <div className="mb-8">
        <button className="text-xs font-mono px-4 py-2 bg-[#E8E9EC] text-[#0A0B0D] rounded-[4px] hover:bg-white transition-colors">
          read the manifesto
        </button>
      </div>

      {/* Privacy Indicator */}
      <div className="flex items-center gap-2">
        <div className="w-1 h-1 rounded-full bg-[#1D9E75]" />
        <span className="text-manifesto-eyebrow normal-case tracking-normal text-[#9499A6]">
          data never leaves your infrastructure
        </span>
      </div>
    </div>
  )
}
