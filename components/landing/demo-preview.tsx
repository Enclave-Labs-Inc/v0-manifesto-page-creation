import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

const frames = [
  {
    src: '/demo-frames/frame-09.jpg',
    alt: 'Enclave knowledge graph connecting company information',
    className: 'md:w-[26%]',
  },
  {
    src: '/demo-frames/frame-11.jpg',
    alt: 'Enclave question interface',
    className: 'md:w-[31%]',
  },
  {
    src: '/demo-frames/frame-13.jpg',
    alt: 'Enclave answer with supporting sources',
    className: 'md:w-[43%]',
  },
]

export default function DemoPreview() {
  return (
    <section className="relative overflow-hidden bg-white text-[#111214]">
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-8 pt-0 sm:px-10 lg:px-14 lg:pb-10 lg:pt-0">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6A6D72]">
            See Enclave in action
          </p>

          <h2 className="mt-5 font-display text-[clamp(1.75rem,3.4vw,3.2rem)] font-normal leading-[1.1] tracking-[-0.025em]">
            <span className="block md:whitespace-nowrap">Ask across your company knowledge.</span>
            <span className="block text-[#6A6D72] md:whitespace-nowrap">
              Get answers with sources.
            </span>
          </h2>

          <p className="mt-6 max-w-[58ch] text-[16px] leading-[1.7] text-[#55585D]">
            See how Enclave answers questions across connected sources while keeping existing permissions in place.
          </p>
        </div>

        <Link href="/demo" className="group mt-11 block">
          <div className="flex h-[220px] overflow-hidden rounded-[4px] border border-[#D8D8D3] sm:h-[250px] md:h-[270px]">
            {frames.map((frame, index) => (
              <div
                key={frame.src}
                className={`group/frame relative shrink-0 overflow-hidden ${frame.className} ${
                  index !== frames.length - 1
                    ? 'border-r border-white/50'
                    : ''
                }`}
              >
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className={`transition-transform duration-500 ease-out group-hover/frame:scale-[1.12] ${
                    index === 2
                      ? 'object-cover object-[center_35%]'
                      : 'object-cover object-center'
                  }`}
                />
              </div>
            ))}
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
