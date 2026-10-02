import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Play } from 'lucide-react'

export default function DemoPreview() {
  return (
    <section className="bg-[#F5F5F2] text-[#111214]">
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-16 pt-0 sm:px-10 lg:px-14 lg:pb-20 lg:pt-0">
        <div className="max-w-[680px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6A6D72]">
            See Enclave in action
          </p>

          <h2 className="mt-5 font-display text-[clamp(2.2rem,4vw,4rem)] font-normal leading-[1.02] tracking-[-0.035em]">
            Ask across your company knowledge.
            <span className="block text-[#6A6D72]">
              Get answers with sources.
            </span>
          </h2>

          <p className="mt-6 max-w-[58ch] text-[16px] leading-[1.7] text-[#55585D]">
            See how Enclave answers questions across connected sources while keeping existing permissions in place.
          </p>
        </div>

        <Link href="/demo" className="group mt-10 block">
          <div className="relative aspect-[16/7] overflow-hidden rounded-[10px] border border-[#D8D8D3] bg-black">
            <Image
              src="/demo-preview.jpg"
              alt="Enclave Ask interface"
              width={1600}
              height={900}
              className="h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition group-hover:bg-black/20">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg">
                <Play className="ml-1 h-6 w-6 fill-black text-black" />
              </div>
            </div>
          </div>

          <div className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold">
            Watch the full demo
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.8}
            />
          </div>
        </Link>
      </div>
    </section>
  )
}
