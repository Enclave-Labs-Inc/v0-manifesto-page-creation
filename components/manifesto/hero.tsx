'use client'

export default function Hero() {
  return (
    <div className="pb-16 border-b border-[#1A1C20] mb-16">
      {/* Eyebrow */}
      <p className="text-manifesto-eyebrow mb-6">
        getenclave.ai · company brain manifesto · v1.0
      </p>

      {/* Headline */}
      <h1 className="text-[64px] font-serif italic text-[#E8E9EC] leading-[1.1] mb-6 max-w-3xl">
        The Company Brain for sovereign deployment.
      </h1>

      {/* Subline */}
      <p className="text-manifesto-body max-w-2xl mb-8">
        Built for organizations that need AI across internal knowledge, but cannot send their data to SaaS AI vendors.
      </p>

      {/* CTA */}
      <div className="mb-8">
        <a
          href="mailto:contact@getenclave.ai?subject=Design%20partner%20call"
          className="inline-flex text-xs font-mono px-4 py-2 bg-[#E8E9EC] text-[#0A0B0D] rounded-[4px] hover:bg-white transition-colors"
        >
          get on a design-partner call
        </a>
      </div>

      {/* Privacy Indicator */}
      <div className="flex items-center gap-2">
        <div className="w-1 h-1 rounded-full bg-[#1D9E75]" />
        <span className="text-manifesto-eyebrow normal-case tracking-normal text-[#9499A6]">
          deploys inside your AWS account
        </span>
      </div>
    </div>
  )
}
