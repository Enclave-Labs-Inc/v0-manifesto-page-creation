'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { releases } from '@/components/releases/releases-data'

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

function TimelineEntry({
  release,
  isLatest,
  isLast,
}: {
  release: (typeof releases)[number]
  isLatest: boolean
  isLast: boolean
}) {
  const { ref, inView } = useReveal<HTMLAnchorElement>()

  return (
    <Link
      ref={ref as never}
      data-in-view={inView}
      href={`/releases/${release.slug}`}
      className={`scroll-reveal group block outline-none ring-[#5E636F] focus-visible:ring-2 ${
        isLast ? '' : 'border-b border-[#E0E3E8]'
      }`}
    >
      <article className="grid gap-y-5 py-10 md:grid-cols-[200px_1fr] md:gap-x-12">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-[0.14em] text-[#5E636F]">
              {release.version}
            </span>
            {isLatest && (
              <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-[#050608] px-2 py-1 font-mono text-[9.5px] tracking-[0.14em] text-[#F4F5F7]">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#F4F5F7]" />
                LATEST
              </span>
            )}
          </div>
          <p className="mt-3 font-mono text-[10px] tracking-[0.14em] text-[#787D8A]">
            {release.date.toUpperCase()}
          </p>
        </div>

        <div>
          <h2 className="font-display text-[clamp(1.4rem,2.4vw,1.9rem)] font-medium leading-[1.15] tracking-[-0.02em] text-[#050608]">
            {release.title}
          </h2>
          <p className="mt-1.5 text-[14px] font-medium tracking-[-0.01em] text-[#7F848F]">
            {release.subtitle}
          </p>

          <p className="mt-4 max-w-[64ch] text-[13.5px] leading-[1.6] tracking-[-0.005em] text-[#50545B]">
            {release.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {release.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-[4px] border border-[#050608] bg-transparent px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-[#050608]"
              >
                {tag.toUpperCase()}
              </span>
            ))}
          </div>

          <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#050608] transition-colors duration-150 group-hover:text-[#3A3D43]">
            Read the full report
            <ArrowUpRight
              className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </span>
        </div>
      </article>
    </Link>
  )
}

function IndexHero() {
  const chip = useReveal<HTMLDivElement>()
  const headline = useReveal<HTMLHeadingElement>()
  const sub = useReveal<HTMLParagraphElement>()

  return (
    <div className="flex flex-col items-start text-left">
      <div
        ref={chip.ref}
        data-in-view={chip.inView}
        className="scroll-reveal inline-flex items-center gap-2.5 rounded-full border border-[oklch(0.86_0_0/0.9)] bg-[oklch(1_0_0/0.65)] px-3.5 py-1.5 backdrop-blur-md"
      >
        <span className="font-mono text-[11px] tracking-[0.14em] text-[#5E636F]">01</span>
        <span className="h-[10px] w-px bg-[#C7CCD4]" aria-hidden />
        <span className="font-mono text-[11px] tracking-[0.14em] text-[#2E3238]">CHANGELOG</span>
      </div>

      <h1
        ref={headline.ref}
        data-in-view={headline.inView}
        className="font-display mt-6 max-w-[20ch] text-[clamp(2.4rem,5.5vw,4.8rem)] font-normal leading-[1.02] tracking-[-0.025em] text-[#050608]"
      >
        <span className="block">Releases,</span>
        <span className="block text-[#7F848F]">shipped in the open.</span>
      </h1>

      <p
        ref={sub.ref}
        data-in-view={sub.inView}
        className="scroll-reveal mt-6 max-w-[58ch] text-[15px] leading-[1.6] tracking-[-0.005em] text-[#50545B]"
      >
        Every milestone for Enclave, with the numbers and methodology behind it. Open one to read
        the full report.
      </p>
    </div>
  )
}

export default function ReleasesIndex() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.965_0_0)] text-[#050608]">
      {/* Ghosted mountain — color thread */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <Image
          src="/landing-hero-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[35%_center]"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,oklch(0.86_0.02_240/0.3)_0%,transparent_55%),radial-gradient(ellipse_at_0%_100%,oklch(0.99_0_0/0.85)_0%,transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.965_0_0/0.72)_0%,oklch(0.965_0_0/0.86)_100%)]"
      />

      <div className="relative z-[1] mx-auto max-w-[1440px] px-5 pt-[clamp(6rem,11vw,9rem)] pb-[clamp(5rem,9vw,8rem)] sm:px-10 lg:px-14">
        <IndexHero />

        <div className="mt-16 border-t border-[#E0E3E8] md:mt-20">
          {releases.map((release, i) => (
            <TimelineEntry
              key={release.slug}
              release={release}
              isLatest={i === 0}
              isLast={i === releases.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
