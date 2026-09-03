'use client'

import Image from 'next/image'
import { Fragment, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

type Path = {
  tag: string
  category: string
  context: string
  headline: string
  body: string
  verdict: string
  primary?: boolean
}

const paths: Path[] = [
  {
    tag: 'PATH 01',
    category: 'SaaS AI',
    context: 'Glean · Copilot · ChatGPT Enterprise',
    headline: 'Great products. Not for your data.',
    body: 'Excellent tools, but only for companies that can send their data into a vendor’s cloud. Your security team already said no.',
    verdict: 'Closed by compliance',
  },
  {
    tag: 'PATH 02',
    category: 'Build it yourself',
    context: 'Internal RAG · custom LLM ops',
    headline: '8–12 months. ~$1.5M. Forever yours.',
    body: '3–4 engineers, indefinite roadmap, and the compounding cost of keeping pace with model + pipeline tooling. Most builds never quite ship.',
    verdict: 'Slow, expensive, never done',
  },
  {
    tag: 'PATH 03',
    category: 'Enclave',
    context: 'Sovereign infrastructure',
    headline: 'Sovereign by architecture. Live in weeks.',
    body: 'Deploys inside your AWS account. You own the data; we maintain the engine. Same isolation as a build, without the 12-month detour.',
    verdict: 'Open to regulated companies',
    primary: true,
  },
]

// ============================================================================
// Reveal + word cascade
// ============================================================================

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

function WordsReveal({
  text,
  startIndex = 0,
}: {
  text: string
  startIndex?: number
}) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${i}-${word}`}>
          <span
            className="word-reveal"
            style={{ ['--word-i' as string]: startIndex + i } as CSSProperties}
          >
            {word}
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </>
  )
}

// ============================================================================
// Path column — all three columns share one structure. The primary path is
// marked with a filled dark chip badge, not by inverting the whole card.
// ============================================================================

function PathColumn({ path }: { path: Path }) {
  const { ref, inView } = useReveal<HTMLElement>()

  return (
    <article
      ref={ref}
      data-in-view={inView}
      className="flex flex-col items-start px-6 py-12 text-left md:px-8 md:py-14"
    >
      <div
        className="stagger-pop flex w-full items-center justify-between gap-3"
        style={{ ['--stagger-delay' as string]: '80ms' } as CSSProperties}
      >
        <span className="font-mono text-[11px] tracking-[0.14em] text-[#5E636F]">
          {path.tag}
        </span>
        {path.primary && (
          <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-[#050608] px-2 py-1 font-mono text-[9.5px] tracking-[0.14em] text-[#F4F5F7]">
            <span
              aria-hidden
              className="status-pulse h-1.5 w-1.5 rounded-full bg-[#F4F5F7]"
            />
            YOUR LANE
          </span>
        )}
      </div>

      <p
        className="stagger-pop font-display mt-10 text-[22px] font-medium tracking-[-0.02em] text-[#050608]"
        style={{ ['--stagger-delay' as string]: '180ms' } as CSSProperties}
      >
        {path.category}
      </p>
      <p
        className="stagger-pop mt-1 font-mono text-[10px] tracking-[0.14em] text-[#5E636F]"
        style={{ ['--stagger-delay' as string]: '240ms' } as CSSProperties}
      >
        {path.context}
      </p>

      <h3
        className="stagger-pop font-display mt-8 text-[19px] font-medium leading-[1.3] tracking-[-0.015em] text-[#050608]"
        style={{ ['--stagger-delay' as string]: '340ms' } as CSSProperties}
      >
        {path.headline}
      </h3>

      <p
        className="stagger-pop mt-3 max-w-[32ch] text-[13.5px] leading-[1.55] text-[#50545B]"
        style={{ ['--stagger-delay' as string]: '440ms' } as CSSProperties}
      >
        {path.body}
      </p>

      <div
        className="stagger-pop mt-auto pt-8"
        style={{ ['--stagger-delay' as string]: '560ms' } as CSSProperties}
      >
        <p className="font-mono text-[10px] tracking-[0.14em] text-[#5E636F]">
          {path.verdict.toUpperCase()}
        </p>
      </div>
    </article>
  )
}

// ============================================================================
// Section
// ============================================================================

export default function AlternativesSection() {
  const chip = useReveal<HTMLDivElement>()
  const headline = useReveal<HTMLHeadingElement>()

  const firstClause = 'Three paths to enterprise AI.'
  const firstWordCount = firstClause.split(' ').length

  return (
    <section className="relative overflow-hidden bg-[oklch(0.965_0_0)] text-[#050608]">
      {/* Ghosted mountain — color thread */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.09]">
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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_100%,oklch(0.86_0.02_240/0.32)_0%,transparent_55%),radial-gradient(ellipse_at_100%_0%,oklch(0.99_0_0/0.9)_0%,transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.965_0_0/0.72)_0%,oklch(0.965_0_0/0.86)_100%)]"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[oklch(0.88_0_0)]" />

      <div className="relative z-[1] mx-auto max-w-[1440px] px-5 py-[clamp(5.5rem,10vw,8.5rem)] sm:px-10 lg:px-14">
        <div className="flex flex-col items-start text-left">
          <div
            ref={chip.ref}
            data-in-view={chip.inView}
            className="scroll-reveal inline-flex items-center gap-2.5 rounded-full border border-[oklch(0.86_0_0/0.9)] bg-[oklch(1_0_0/0.65)] px-3.5 py-1.5 backdrop-blur-md"
          >
            <span className="font-mono text-[11px] tracking-[0.14em] text-[#5E636F]">04</span>
            <span className="h-[10px] w-px bg-[#C7CCD4]" aria-hidden />
            <span className="font-mono text-[11px] tracking-[0.14em] text-[#2E3238]">THE HONEST COMPARISON</span>
          </div>

          <h2
            ref={headline.ref}
            data-in-view={headline.inView}
            className="font-display mt-6 max-w-[26ch] text-[clamp(1.9rem,4.4vw,3.4rem)] font-normal leading-[1.05] tracking-[-0.025em] text-[#050608]"
          >
            <span className="md:whitespace-nowrap">
              <WordsReveal text={firstClause} />
            </span>
            <br className="hidden md:block" />
            <span className="text-[#7F848F]">
              <WordsReveal text="Two of them aren’t open to you." startIndex={firstWordCount} />
            </span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 divide-y divide-[#E0E3E8] border-y border-[#E0E3E8] md:mt-20 md:grid-cols-3 md:divide-x md:divide-y-0">
          {paths.map((path) => (
            <PathColumn key={path.tag} path={path} />
          ))}
        </div>
      </div>
    </section>
  )
}
