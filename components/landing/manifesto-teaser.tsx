import Link from 'next/link'

export default function ManifestoTeaser() {
  return (
    <section className="border-b border-[#1A1C20]">
      <div className="max-w-7xl mx-auto px-6 py-[clamp(4rem,8vw,6rem)]">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
          <div>
            <p className="text-manifesto-label mb-8">the full argument</p>
            <p className="text-[clamp(1.75rem,4vw,2.75rem)] font-serif italic text-[#E8E9EC] leading-[1.15] max-w-[22ch] mb-6">
              Seven sections on sovereignty, retrieval, and why the moat is below the UI.
            </p>
            <p className="text-manifesto-body max-w-[46ch]">
              The manifesto covers the category, the architectural claim, the evidence, and who Enclave is for. Read it before a design-partner conversation.
            </p>
          </div>

          <Link
            href="/manifesto"
            className="inline-flex self-start lg:self-end text-xs font-mono px-5 py-2.5 border border-[#2A2D34] text-[#B4B8C2] rounded-[4px] hover:border-[#3A3E48] hover:text-[#E8E9EC] active:scale-[0.97] transition-[border-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]"
          >
            read manifesto →
          </Link>
        </div>
      </div>
    </section>
  )
}
