'use client'

import Image from 'next/image'
import { Fragment, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

type Beat = {
  label: string
  title: string
  body: string
  tagPrefix: string
  tags: string[]
  Viz: () => React.ReactElement
}

// ============================================================================
// Reveal + word-cascade primitives (same pattern used across landing sections)
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
// Unified illustration language — outlined chips, dashed hairlines,
// one filled dark chip as the visual anchor. Same primitives as how-it-works.
// ============================================================================

const VIZ_FRAME = 'relative flex h-[140px] w-[224px] items-center justify-center'

// 01: Data has to LEAVE — outlined "YOU" chip on left, dashed line crosses
// a solid perimeter boundary to a filled dark "SAAS" chip on the right.
function LeakViz() {
  return (
    <div className={VIZ_FRAME}>
      <svg viewBox="0 0 224 140" fill="none" className="h-full w-full" aria-hidden>
        {/* YOU — outlined */}
        <rect x="18" y="52" width="46" height="36" rx="6" stroke="#050608" strokeWidth="1.2" />
        <text
          x="41"
          y="75"
          textAnchor="middle"
          fontSize="10"
          fontFamily="var(--font-jetbrains-mono, ui-monospace)"
          fill="#050608"
          letterSpacing="1"
        >
          YOU
        </text>

        {/* Dashed line leaving */}
        <line
          x1="64"
          y1="70"
          x2="158"
          y2="70"
          stroke="#C7CCD4"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Perimeter boundary (solid vertical) — being crossed */}
        <line x1="110" y1="26" x2="110" y2="114" stroke="#050608" strokeWidth="1" strokeDasharray="2 3" />
        <text
          x="114"
          y="24"
          fontSize="8"
          fontFamily="var(--font-jetbrains-mono, ui-monospace)"
          fill="#5E636F"
          letterSpacing="1"
        >
          PERIMETER
        </text>

        {/* SaaS — filled dark, outside perimeter */}
        <rect x="158" y="52" width="48" height="36" rx="6" fill="#050608" />
        <text
          x="182"
          y="75"
          textAnchor="middle"
          fontSize="10"
          fontFamily="var(--font-jetbrains-mono, ui-monospace)"
          fill="#F4F5F7"
          letterSpacing="1"
        >
          SAAS
        </text>
      </svg>
    </div>
  )
}

// 02: Security review kills it — outlined doc + dashed line hits a big X.
function BlockedViz() {
  return (
    <div className={VIZ_FRAME}>
      <svg viewBox="0 0 224 140" fill="none" className="h-full w-full" aria-hidden>
        {/* Proposal document — outlined */}
        <rect x="18" y="46" width="40" height="48" rx="4" stroke="#050608" strokeWidth="1.2" />
        <line x1="24" y1="60" x2="52" y2="60" stroke="#C7CCD4" strokeWidth="1" />
        <line x1="24" y1="70" x2="52" y2="70" stroke="#C7CCD4" strokeWidth="1" />
        <line x1="24" y1="80" x2="46" y2="80" stroke="#C7CCD4" strokeWidth="1" />

        {/* Dashed line into blocker */}
        <line
          x1="58"
          y1="70"
          x2="104"
          y2="70"
          stroke="#C7CCD4"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* X mark — filled dark chip with X */}
        <rect x="104" y="52" width="36" height="36" rx="6" fill="#050608" />
        <path
          d="M114 62 L130 78 M130 62 L114 78"
          stroke="#F4F5F7"
          strokeWidth="1.4"
          strokeLinecap="round"
          className="blocked-pulse"
        />

        {/* Prod (never reached) — outlined, ghosted */}
        <g opacity="0.4">
          <rect x="158" y="52" width="48" height="36" rx="6" stroke="#050608" strokeWidth="1.2" strokeDasharray="3 3" />
          <text
            x="182"
            y="75"
            textAnchor="middle"
            fontSize="10"
            fontFamily="var(--font-jetbrains-mono, ui-monospace)"
            fill="#050608"
            letterSpacing="1"
          >
            PROD
          </text>
        </g>
      </svg>
    </div>
  )
}

// 03: Shadow AI fills the void — outlined person + dashed line goes AROUND a
// locked shape (bypass) to reach an outlined AI chip.
function BypassViz() {
  return (
    <div className={VIZ_FRAME}>
      <svg viewBox="0 0 224 140" fill="none" className="h-full w-full" aria-hidden>
        {/* Person — outlined circle + shoulders */}
        <circle cx="34" cy="60" r="9" stroke="#050608" strokeWidth="1.2" />
        <path d="M20 84 Q34 72 48 84" stroke="#050608" strokeWidth="1.2" strokeLinecap="round" />

        {/* Curved dashed bypass around locked chip */}
        <path
          d="M52 76 Q112 24 168 60"
          stroke="#C7CCD4"
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
        />

        {/* Locked chip in the middle (blocked pathway) */}
        <rect x="94" y="62" width="36" height="34" rx="6" stroke="#050608" strokeWidth="1.2" />
        <rect x="106" y="72" width="12" height="10" rx="1.5" fill="#050608" />
        <path d="M108 72 L108 68 A4 4 0 0 1 116 68 L116 72" stroke="#050608" strokeWidth="1.2" fill="none" />

        {/* Shadow AI — filled dark chip */}
        <rect x="158" y="48" width="46" height="34" rx="6" fill="#050608" />
        <text
          x="181"
          y="70"
          textAnchor="middle"
          fontSize="10"
          fontFamily="var(--font-jetbrains-mono, ui-monospace)"
          fill="#F4F5F7"
          letterSpacing="1"
        >
          AI
        </text>
      </svg>
    </div>
  )
}

// ============================================================================
// Beats
// ============================================================================

const beats: Beat[] = [
  {
    label: '01',
    title: 'The good tools are SaaS',
    body: 'The best AI tools live in someone else’s cloud. Your data has to leave your perimeter to use them.',
    tagPrefix: 'Vendor lane',
    tags: ['Glean', 'Microsoft Copilot', 'ChatGPT Enterprise'],
    Viz: LeakViz,
  },
  {
    label: '02',
    title: 'Security review kills it',
    body: 'So the project dies in security review. Again. Data residency, vendor risk, standing access. Three no-gos.',
    tagPrefix: 'What it fails',
    tags: ['Data residency', 'Vendor risk', 'Standing access'],
    Viz: BlockedViz,
  },
  {
    label: '03',
    title: 'Shadow AI fills the void',
    body: 'Meanwhile your team pastes documents into ChatGPT. The risk you blocked just got worse, invisibly.',
    tagPrefix: 'Quietly used',
    tags: ['ChatGPT', 'Claude', 'Gemini'],
    Viz: BypassViz,
  },
]

function ProblemColumn({ beat }: { beat: Beat }) {
  const { ref, inView } = useReveal<HTMLElement>()
  const Viz = beat.Viz

  return (
    <article
      ref={ref}
      data-in-view={inView}
      className="flex flex-col items-start px-6 py-12 text-left md:px-8 md:py-14"
    >
      <p
        className="stagger-pop font-mono text-[11px] tracking-[0.14em] text-[#5E636F]"
        style={{ ['--stagger-delay' as string]: '60ms' } as CSSProperties}
      >
        {beat.label}
      </p>

      <div
        className="stagger-pop mt-10 self-center md:self-start"
        style={{ ['--stagger-delay' as string]: '160ms' } as CSSProperties}
      >
        <Viz />
      </div>

      <h3
        className="stagger-pop font-display mt-10 text-[19px] font-medium tracking-[-0.01em] text-[#050608]"
        style={{ ['--stagger-delay' as string]: '280ms' } as CSSProperties}
      >
        {beat.title}
      </h3>

      <p
        className="stagger-pop mt-2.5 max-w-[32ch] text-[13.5px] leading-[1.55] text-[#50545B]"
        style={{ ['--stagger-delay' as string]: '380ms' } as CSSProperties}
      >
        {beat.body}
      </p>

      <div
        className="stagger-pop mt-6"
        style={{ ['--stagger-delay' as string]: '480ms' } as CSSProperties}
      >
        <p className="mb-2.5 font-mono text-[10px] tracking-[0.14em] text-[#5E636F]">
          {beat.tagPrefix}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {beat.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-[4px] border border-[#050608] bg-transparent px-2 py-1 text-[10.5px] font-medium text-[#050608]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

// ============================================================================
// Section
// ============================================================================

export default function ProblemSection() {
  const chip = useReveal<HTMLDivElement>()
  const headline = useReveal<HTMLHeadingElement>()

  const firstClause = 'Your security team isn’t the blocker.'
  const firstWordCount = firstClause.split(' ').length

  return (
    <section className="relative overflow-hidden bg-[oklch(0.965_0_0)] text-[#0a0b0d]">
      {/* Ghosted mountain — color thread with the hero */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.09]">
        <Image
          src="/landing-hero-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[35%_center]"
        />
      </div>
      {/* Cool wash bleeding from bottom-left (mirrors the hero's mountain shadow) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_100%,oklch(0.86_0.02_240/0.35)_0%,transparent_55%),radial-gradient(ellipse_at_100%_0%,oklch(0.99_0_0/0.9)_0%,transparent_60%)]"
      />
      {/* Cream veil so the ghost reads as tone, not imagery */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.965_0_0/0.72)_0%,oklch(0.965_0_0/0.86)_100%)]"
      />
      {/* Hairline top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[oklch(0.88_0_0)]" />

      <div className="relative z-[1] mx-auto max-w-[1440px] px-5 py-[clamp(5.5rem,10vw,8.5rem)] sm:px-10 lg:px-14">
        {/* Header — LEFT-aligned, echoes hero + how-it-works */}
        <div className="flex flex-col items-start text-left">
          <div
            ref={chip.ref}
            data-in-view={chip.inView}
            className="scroll-reveal inline-flex items-center gap-2.5 rounded-full border border-[oklch(0.86_0_0/0.9)] bg-[oklch(1_0_0/0.65)] px-3.5 py-1.5 backdrop-blur-md"
          >
            <span className="font-mono text-[11px] tracking-[0.14em] text-[#5E636F]">02</span>
            <span className="h-[10px] w-px bg-[#C7CCD4]" aria-hidden />
            <span className="font-mono text-[11px] tracking-[0.14em] text-[#2E3238]">THE PROBLEM</span>
          </div>

          <h2
            ref={headline.ref}
            data-in-view={headline.inView}
            className="font-display mt-6 text-[clamp(1.9rem,4.4vw,3.4rem)] font-normal leading-[1.05] tracking-[-0.025em] text-[#050608]"
          >
            <span className="md:whitespace-nowrap">
              <WordsReveal text={firstClause} />
            </span>
            <br className="hidden md:block" />
            <span className="text-[#7F848F]">
              <WordsReveal text="The deployment model is." startIndex={firstWordCount} />
            </span>
          </h2>
        </div>

        {/* 3-column grid with hairline dividers */}
        <div className="mt-16 grid grid-cols-1 divide-y divide-[#E0E3E8] border-y border-[#E0E3E8] md:mt-20 md:grid-cols-3 md:divide-x md:divide-y-0">
          {beats.map((beat) => (
            <ProblemColumn key={beat.label} beat={beat} />
          ))}
        </div>
      </div>
    </section>
  )
}
