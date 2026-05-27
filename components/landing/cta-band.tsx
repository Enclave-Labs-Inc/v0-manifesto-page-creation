import Link from 'next/link'

export default function CtaBand() {
  return (
    <section className="relative overflow-hidden border-t border-[oklch(0.9_0.006_145)] bg-[#111214]">
      <div className="absolute inset-0 opacity-30" aria-hidden>
        <div className="absolute left-1/2 top-0 h-[620px] w-[920px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#3C4148]" />
        <div className="absolute left-1/2 top-0 h-[760px] w-[1160px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#30343A]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
        <h2 className="mb-5 text-[clamp(2.2rem,5vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.055em] text-[oklch(0.96_0.004_145)]">
          The Company Brain your security team can actually approve.
        </h2>
        <p className="mx-auto mb-9 max-w-[56ch] text-[16px] leading-[1.75] text-[#B4BAC4]">
          Design partners welcome: regulated teams with private data, serious compliance pressure, and employees who still need AI to do their best work.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://cal.com/shashank-bhardwaj-fwmii1/30min"
            className="inline-flex h-[52px] items-center rounded-full bg-[oklch(0.96_0.004_145)] px-7 text-[14px] font-bold text-[#111214] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[oklch(0.995_0.002_145)] active:scale-[0.97]"
          >
            Book a call
          </a>
          <Link
            href="/manifesto"
            className="inline-flex h-[52px] items-center rounded-full border border-[#353942] px-7 text-[14px] font-bold text-[#D4D8DF] transition-[border-color,color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[#565C67] hover:text-[oklch(0.96_0.004_145)] active:scale-[0.97]"
          >
            Read the manifesto
          </Link>
        </div>
      </div>
    </section>
  )
}
