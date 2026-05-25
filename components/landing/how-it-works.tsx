'use client'

import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import type { CSSProperties } from 'react'
import { AnimatedBeam } from '@/components/ui/animated-beam'

// ============================================================================
// Per-card scroll reveal hook (re-fires on enter/exit so scroll up + down both
// replay the cascade).
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

// Word-by-word headline cascade (same primitive as Section 2).
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
// Per-step visual mocks. Each one demonstrates what happens at that step.
// ============================================================================

function DeployViz() {
  return (
    <div className="relative h-28 w-full overflow-hidden rounded-lg border border-dashed border-[#C7CCD4] bg-[oklch(0.965_0.002_145)] p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[8px] font-bold uppercase tracking-[0.32em] text-[#9499A6]">
          Your AWS
        </span>
        <span className="text-[8px] font-bold uppercase tracking-[0.24em] text-[#9499A6]">
          us-east-1
        </span>
      </div>
      <div className="rounded-md border border-[#1B1D21] bg-[#0a0b0d] p-2 shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
        <p className="text-[8px] font-bold uppercase tracking-[0.32em] text-[#787D8A]">
          Inside VPC
        </p>
        <p className="mt-0.5 text-[12px] font-bold tracking-[-0.01em] text-[#F4F5F7]">
          Enclave
        </p>
        <div className="mt-1.5 flex items-center gap-1.5 text-[8px] font-bold text-[#9499A6]">
          <span>S3</span>
          <span className="text-[#3A3D43]">·</span>
          <span>KMS</span>
          <span className="text-[#3A3D43]">·</span>
          <span>VPC</span>
        </div>
      </div>
    </div>
  )
}

// Abstract placeholder marks — drop the official brand SVGs into
// /public/brand/{slack,drive,github,confluence}.svg to swap with real
// favicons. These use currentColor so they adapt to whatever text-color
// the parent sets.
function SlackMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <rect x="3" y="3" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="15" y="3" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="3" y="15" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="15" y="15" width="6" height="6" rx="1.5" fill="currentColor" />
    </svg>
  )
}

function DriveMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="none" aria-hidden>
      <path d="M3 18 L12 4 L21 18 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M3 18 L8 18 L12 11" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 11 L16 18 L21 18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="none" aria-hidden>
      <circle cx="6" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="18" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7 8 L11 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M17 8 L13 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function ConfluenceMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="none" aria-hidden>
      <path d="M3 8 Q10 4 21 10 Q14 6 3 13 Z" fill="currentColor" />
      <path d="M3 16 Q10 12 21 18 Q14 14 3 21 Z" fill="currentColor" opacity="0.55" />
    </svg>
  )
}

function JiraMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="none" aria-hidden>
      <path d="M4 10 L12 18 L20 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 4 L12 12 L20 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  )
}

function NotionMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className} fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <line x1="8" y1="3" x2="8" y2="21" stroke="currentColor" strokeWidth="1.7" />
      <line x1="8" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.7" />
      <line x1="8" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function ConnectViz() {
  const containerRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)

  // 3 satellites on the left, 3 on the right.
  const leftTopRef = useRef<HTMLDivElement>(null)
  const leftMidRef = useRef<HTMLDivElement>(null)
  const leftBotRef = useRef<HTMLDivElement>(null)
  const rightTopRef = useRef<HTMLDivElement>(null)
  const rightMidRef = useRef<HTMLDivElement>(null)
  const rightBotRef = useRef<HTMLDivElement>(null)

  const chipBase =
    'absolute z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-[#2A2D34] bg-[#0F1115] text-[#C5C9D2] shadow-[0_2px_6px_rgba(0,0,0,0.45)]'

  const beamPathColor = '#3A3D43'
  const beamStart = '#FFFFFF'
  const beamStop = '#9499A6'

  return (
    <div
      ref={containerRef}
      className="relative h-28 w-full overflow-hidden rounded-lg bg-[#0a0b0d]"
    >
      {/* Center: Enclave */}
      <div
        ref={centerRef}
        className="absolute left-1/2 top-1/2 z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0a0b0d] shadow-[0_4px_18px_rgba(0,0,0,0.6)]"
      >
        <img
          src="/enclave_mark_transparent.svg"
          alt="Enclave"
          className="h-8 w-8 object-contain"
        />
      </div>

      {/* Left column */}
      <div ref={leftTopRef} aria-label="Slack" className={chipBase} style={{ top: '20%', left: '8%' }}>
        <SlackMark className="h-3.5 w-3.5" />
      </div>
      <div ref={leftMidRef} aria-label="Notion" className={chipBase} style={{ top: '50%', left: '8%' }}>
        <NotionMark className="h-3.5 w-3.5" />
      </div>
      <div ref={leftBotRef} aria-label="GitHub" className={chipBase} style={{ top: '80%', left: '8%' }}>
        <GitHubMark className="h-3.5 w-3.5" />
      </div>

      {/* Right column */}
      <div ref={rightTopRef} aria-label="Drive" className={chipBase} style={{ top: '20%', right: '8%' }}>
        <DriveMark className="h-3.5 w-3.5" />
      </div>
      <div ref={rightMidRef} aria-label="Confluence" className={chipBase} style={{ top: '50%', right: '8%' }}>
        <ConfluenceMark className="h-3.5 w-3.5" />
      </div>
      <div ref={rightBotRef} aria-label="Jira" className={chipBase} style={{ top: '80%', right: '8%' }}>
        <JiraMark className="h-3.5 w-3.5" />
      </div>

      {/* Animated beams: 6 streams converging on Enclave with staggered
          delays. Top satellites curve downward, mid go straight, bottom
          curve upward — same pattern as the MagicUI demo. */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={leftTopRef}
        toRef={centerRef}
        curvature={-12}
        duration={3.6}
        delay={0}
        pathColor={beamPathColor}
        pathWidth={1}
        pathOpacity={0.35}
        gradientStartColor={beamStart}
        gradientStopColor={beamStop}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={leftMidRef}
        toRef={centerRef}
        curvature={0}
        duration={3.6}
        delay={0.6}
        pathColor={beamPathColor}
        pathWidth={1}
        pathOpacity={0.35}
        gradientStartColor={beamStart}
        gradientStopColor={beamStop}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={leftBotRef}
        toRef={centerRef}
        curvature={12}
        duration={3.6}
        delay={1.2}
        pathColor={beamPathColor}
        pathWidth={1}
        pathOpacity={0.35}
        gradientStartColor={beamStart}
        gradientStopColor={beamStop}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={rightTopRef}
        toRef={centerRef}
        curvature={-12}
        duration={3.6}
        delay={1.8}
        reverse
        pathColor={beamPathColor}
        pathWidth={1}
        pathOpacity={0.35}
        gradientStartColor={beamStart}
        gradientStopColor={beamStop}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={rightMidRef}
        toRef={centerRef}
        curvature={0}
        duration={3.6}
        delay={2.4}
        reverse
        pathColor={beamPathColor}
        pathWidth={1}
        pathOpacity={0.35}
        gradientStartColor={beamStart}
        gradientStopColor={beamStop}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={rightBotRef}
        toRef={centerRef}
        curvature={12}
        duration={3.6}
        delay={3.0}
        reverse
        pathColor={beamPathColor}
        pathWidth={1}
        pathOpacity={0.35}
        gradientStartColor={beamStart}
        gradientStopColor={beamStop}
      />
    </div>
  )
}

function AskViz() {
  return (
    <div className="relative h-28 w-full overflow-hidden rounded-lg border border-[#E0E3E8] bg-white p-3">
      <div className="max-w-[88%] self-end rounded-2xl rounded-tr-md bg-[#0a0b0d] px-2.5 py-1.5 text-[10px] text-[#E4E7EC]">
        Where&rsquo;s the rollback runbook?
      </div>
      <div className="mt-2 inline-flex max-w-[88%] items-center gap-1.5 rounded-2xl rounded-tl-md border border-[#E0E3E8] bg-[oklch(0.97_0.002_145)] px-2.5 py-1.5">
        <span
          className="h-1.5 w-1.5 rounded-full bg-[#9499A6]"
          style={{ animation: 'typing-dot 1.2s ease-in-out 0s infinite' }}
        />
        <span
          className="h-1.5 w-1.5 rounded-full bg-[#9499A6]"
          style={{ animation: 'typing-dot 1.2s ease-in-out 0.2s infinite' }}
        />
        <span
          className="h-1.5 w-1.5 rounded-full bg-[#9499A6]"
          style={{ animation: 'typing-dot 1.2s ease-in-out 0.4s infinite' }}
        />
      </div>
    </div>
  )
}

function TrustViz() {
  // Chronological order (oldest → newest). Rows animate in sequence:
  // 1. vector.search lands
  // 2. permission.check appears below it
  // 3. answer.return appears + ✓ ok badge fades in
  // Then holds, resets, and loops.
  const rows = [
    { time: '14:02:08', action: 'vector.search', state: '' },
    { time: '14:02:09', action: 'permission.check', state: '' },
    { time: '14:02:11', action: 'answer.return', state: 'ok' },
  ]
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisibleCount(rows.length)
      return
    }

    let cancelled = false
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timeoutId = setTimeout(resolve, ms)
      })

    const run = async () => {
      while (!cancelled) {
        setVisibleCount(0)
        await wait(900)
        for (let i = 1; i <= rows.length; i += 1) {
          if (cancelled) return
          setVisibleCount(i)
          await wait(820)
        }
        // Hold the final state with all rows + ok badge, then loop.
        await wait(3200)
      }
    }
    run()

    return () => {
      cancelled = true
      if (timeoutId) clearTimeout(timeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative h-28 w-full overflow-hidden rounded-lg border border-[#E0E3E8] bg-white p-2.5 font-mono text-[9px] leading-[1.7]">
      {rows.map((r, i) => {
        const visible = i < visibleCount
        const isNewest = i === rows.length - 1
        return (
          <div
            key={r.action}
            className="flex items-center gap-2 transition-all duration-[500ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{
              opacity: visible ? (isNewest ? 1 : 0.55 + i * 0.15) : 0,
              transform: visible ? 'translateY(0)' : 'translateY(-4px)',
            }}
          >
            <span className="text-[#9499A6]">{r.time}</span>
            <span className="text-[#0a0b0d]">{r.action}</span>
            {r.state && (
              <span
                className="ml-auto inline-flex items-center gap-1 rounded-sm bg-[oklch(0.94_0.06_162)] px-1.5 text-[8px] font-bold text-[oklch(0.38_0.08_162)] transition-opacity duration-300"
                style={{ opacity: visible ? 1 : 0 }}
              >
                ✓ {r.state}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ============================================================================
// Steps data + card
// ============================================================================

type Step = {
  number: string
  label: string
  description: string
  Viz: () => React.ReactElement
}

const steps: Step[] = [
  {
    number: '01',
    label: 'Deploy',
    description: 'Enclave installs inside your AWS account. Your VPC, your keys.',
    Viz: DeployViz,
  },
  {
    number: '02',
    label: 'Connect',
    description:
      'Point it at Slack, Drive, GitHub, Confluence, Jira. Content stays in your perimeter.',
    Viz: ConnectViz,
  },
  {
    number: '03',
    label: 'Ask',
    description:
      'Employees query in natural language. Permission-aware — people only see what they’re allowed to.',
    Viz: AskViz,
  },
  {
    number: '04',
    label: 'Trust',
    description:
      'Every answer is sourced and logged. Your compliance team reads the audit trail, unaided.',
    Viz: TrustViz,
  },
]

function StepCard({ step }: { step: Step }) {
  const { ref, inView } = useReveal<HTMLElement>()
  const Viz = step.Viz

  return (
    <article
      ref={ref}
      data-in-view={inView}
      className="group relative flex flex-col rounded-2xl border border-[#E0E3E8] bg-white p-5 transition-[border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:border-[#C7CCD4] hover:shadow-[0_24px_60px_-12px_oklch(0.2_0.008_145/0.16)] sm:p-6"
    >
      <div
        className="stagger-pop"
        style={{ ['--stagger-delay' as string]: '80ms' } as CSSProperties}
      >
        <Viz />
      </div>

      <div
        className="stagger-pop mt-5 flex items-center gap-3"
        style={{ ['--stagger-delay' as string]: '220ms' } as CSSProperties}
      >
        <span className="flex h-7 min-w-7 items-center justify-center rounded-md border border-[#E0E3E8] bg-[oklch(0.985_0.001_145)] px-2 text-[10px] font-bold tracking-[0.18em] text-[#5E636F]">
          {step.number}
        </span>
        <h3 className="text-[18px] font-bold tracking-[-0.02em] text-[#050608]">
          {step.label}
        </h3>
      </div>

      <p
        className="stagger-pop mt-3 text-[14px] leading-[1.6] tracking-[-0.005em] text-[#50545B]"
        style={{ ['--stagger-delay' as string]: '320ms' } as CSSProperties}
      >
        {step.description}
      </p>
    </article>
  )
}

// ============================================================================
// Section
// ============================================================================

export default function HowItWorks() {
  const eyebrow = useReveal<HTMLParagraphElement>()
  const headline = useReveal<HTMLHeadingElement>()
  const cta = useReveal<HTMLDivElement>()

  const firstClause = 'The model comes to your data.'
  const firstWordCount = firstClause.split(' ').length

  return (
    <section className="relative overflow-hidden bg-[oklch(0.98_0.001_145)] text-[#0a0b0d]">
      {/* Hairline divider from the dark section above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[oklch(0.88_0.004_145)]" />

      <div className="relative mx-auto max-w-[1320px] px-6 py-[clamp(5.5rem,10vw,8.5rem)] sm:px-10 lg:px-14">
        <p
          ref={eyebrow.ref}
          data-in-view={eyebrow.inView}
          className="scroll-reveal text-[11px] font-bold uppercase tracking-[0.34em] text-[#5E636F]"
        >
          How it works
        </p>

        <h2
          ref={headline.ref}
          data-in-view={headline.inView}
          className="mt-8 max-w-[34ch] text-[clamp(2rem,4.8vw,4rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#050608]"
        >
          <WordsReveal text={firstClause} />
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">
            <WordsReveal text="Not the other way around." startIndex={firstWordCount} />
          </span>
        </h2>

        {/* Cards grid + flow line */}
        <div className="relative mt-14 md:mt-20">
          {/* Animated horizontal "flow" through the row of cards — runs
              through the visual area at the top of each card. Desktop only. */}
          <div
            aria-hidden
            className="absolute left-[10%] right-[10%] top-[3.5rem] hidden md:block"
          >
            <div className="flow-line h-px" />
          </div>

          <div className="relative grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {steps.map((step) => (
              <StepCard key={step.number} step={step} />
            ))}
          </div>
        </div>

        <div
          ref={cta.ref}
          data-in-view={cta.inView}
          className="scroll-reveal mt-12 md:mt-16"
        >
          <Link
            href="/manifesto#III"
            className="group inline-flex items-center gap-2 text-[14px] font-bold tracking-[-0.02em] text-[#050608] transition-colors duration-200 hover:text-[#3A3D43]"
          >
            Read the full architecture
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
