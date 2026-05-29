'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
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
}: {
  release: (typeof releases)[number]
  isLatest: boolean
}) {
  const { ref, inView } = useReveal<HTMLAnchorElement>()

  return (
    <Link
      ref={ref as never}
      data-in-view={inView}
      href={`/releases/${release.slug}`}
      className="scroll-reveal group block rounded-2xl outline-none ring-[oklch(0.63_0.16_162)] focus-visible:ring-2"
    >
      <article className="grid gap-y-5 lg:grid-cols-[200px_1fr] lg:gap-x-14">
        <div className="lg:pt-1">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[oklch(0.63_0.16_162)]" />
            <span className="text-[22px] font-bold tracking-[-0.03em] text-[#050608]">
              {release.version}
            </span>
            {isLatest && (
              <span className="rounded-full border border-[oklch(0.82_0.07_162)] bg-[oklch(0.95_0.04_162)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[oklch(0.45_0.11_162)]">
                Latest
              </span>
            )}
          </div>
          <p className="mt-2 pl-5 text-[11px] font-bold uppercase tracking-[0.28em] text-[#787D8A]">
            {release.date}
          </p>
        </div>

        <div className="relative pb-14 lg:border-l lg:border-[#E0E3E8] lg:pl-14">
          <span className="absolute -left-[4.5px] top-1.5 hidden h-2 w-2 rounded-full border-2 border-[oklch(0.98_0.001_145)] bg-[#C7CCD4] transition-colors duration-200 group-hover:bg-[oklch(0.63_0.16_162)] lg:block" />

          <h2 className="text-[clamp(1.5rem,2.8vw,2.1rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[#050608]">
            {release.title}
          </h2>
          <p className="mt-1.5 text-[15px] font-bold tracking-[-0.02em] text-[#7F848F]">
            {release.subtitle}
          </p>

          <p className="mt-5 max-w-[64ch] text-[15px] leading-[1.7] tracking-[-0.005em] text-[#50545B]">
            {release.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {release.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-[#D6DAE1] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#5E636F]"
              >
                {tag}
              </span>
            ))}
          </div>

          <span className="mt-7 inline-flex items-center gap-2 text-[13px] font-bold tracking-[-0.01em] text-[#111214]">
            Read the full report
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </span>
        </div>
      </article>
    </Link>
  )
}

function IndexHero() {
  const eyebrow = useReveal<HTMLParagraphElement>()
  const headline = useReveal<HTMLHeadingElement>()
  const sub = useReveal<HTMLParagraphElement>()

  return (
    <section className="relative overflow-hidden bg-[oklch(0.98_0.001_145)] text-[#0a0b0d]">
      <div className="relative mx-auto max-w-[1320px] px-6 pb-[clamp(3rem,5vw,4.5rem)] pt-[clamp(6rem,11vw,9rem)] sm:px-10 lg:px-14">
        <p
          ref={eyebrow.ref}
          data-in-view={eyebrow.inView}
          className="scroll-reveal text-[11px] font-bold uppercase tracking-[0.34em] text-[#5E636F]"
        >
          Changelog · Enclave
        </p>

        <h1
          ref={headline.ref}
          data-in-view={headline.inView}
          className="scroll-reveal mt-8 max-w-[20ch] text-[clamp(2.4rem,6vw,5.4rem)] font-bold leading-[1.02] tracking-[-0.05em] text-[#050608]"
        >
          Releases,
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">shipped in the open.</span>
        </h1>

        <p
          ref={sub.ref}
          data-in-view={sub.inView}
          className="scroll-reveal mt-8 max-w-[56ch] text-[clamp(1rem,1.3vw,1.18rem)] leading-[1.55] tracking-[-0.015em] text-[#50545B]"
        >
          Every milestone for Enclave, with the numbers and the methodology
          behind it. Open one to read the full report.
        </p>
      </div>
    </section>
  )
}

export default function ReleasesIndex() {
  return (
    <>
      <IndexHero />

      <section className="relative overflow-hidden bg-[oklch(0.98_0.001_145)] text-[#0a0b0d]">
        <div className="relative mx-auto max-w-[1320px] px-6 pb-[clamp(5rem,9vw,8rem)] sm:px-10 lg:px-14">
          <div className="space-y-2">
            {releases.map((release, i) => (
              <TimelineEntry
                key={release.slug}
                release={release}
                isLatest={i === 0}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
