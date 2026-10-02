import { ArrowUpRight } from 'lucide-react'

export default function BuiltAtEnclave() {
  return (
    <section className="relative bg-white/72 text-[#111214] backdrop-blur-[1px]">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-6 sm:px-10 lg:px-14 lg:py-8">
        <div className="max-w-[900px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5F636A]">
            Built at Enclave
          </p>

          <h2 className="mt-3 font-display text-[clamp(1.8rem,3vw,3rem)] font-normal leading-[1.02] tracking-[-0.035em]">
            More than one way
            <span className="block text-[#666B73]">
              to work with company knowledge.
            </span>
          </h2>
        </div>

        <div className="mt-6">
          <div className="grid gap-0 md:grid-cols-2">
            <article className="relative flex flex-col px-1 py-3 md:pr-8 lg:pr-10">
              <span aria-hidden className="absolute right-0 top-5 hidden h-[70%] w-px bg-black/15 md:block" />
              <div className="flex items-center justify-between gap-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6A6D72]">
                  Open source
                </p>
              </div>

              <div className="mt-3 flex items-start gap-6">
                <div>
                  <h3 className="font-display text-[24px] tracking-[-0.03em]">
                    Ontos
                  </h3>
                  <p className="mt-2 max-w-[46ch] text-[13px] leading-[1.5] text-[#55585D]">
                    The knowledge-graph layer behind Enclave, released as open source.
                  </p>
                </div>

                <a
                  href="https://github.com/Enclave-Labs-Inc/Ontos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-1 inline-flex items-center gap-1.5 text-[12px] font-semibold"
                >
                  GitHub
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </article>

            <article className="flex flex-col border-t border-black/15 px-1 py-3 md:border-t-0 md:pl-8 lg:pl-10">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6A6D72]">
                  Research &amp; product R&amp;D
                </p>
              </div>

              <div className="mt-3 flex items-start gap-6">
                <div>
                  <h3 className="font-display text-[24px] tracking-[-0.03em]">
                    Enclave Scribe
                  </h3>
                  <p className="mt-2 max-w-[46ch] text-[13px] leading-[1.5] text-[#55585D]">
                    Self-hosted OCR and document understanding for teams that need document processing to stay inside their environment.
                  </p>
                </div>

                <p className="mt-1 text-[12px] font-semibold text-[#6A6D72]">
                  In development
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
