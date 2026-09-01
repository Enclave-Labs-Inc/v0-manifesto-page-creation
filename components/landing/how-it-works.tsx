'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { CSSProperties } from 'react'
import { AnimatedBeam } from '@/components/ui/animated-beam'

// ============================================================================
// Per-item scroll reveal hook — reveals as each element enters its own viewport
// entry, hides again on exit so scrolling replays the cascade.
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
// One shared illustration language.
//   - 1px stroke #050608 on outlined shapes
//   - 1px dashed #C7CCD4 for flow / perimeter
//   - single filled dark chip #050608 as the visual anchor
// Every viz uses these three primitives and nothing else, on transparent.
// ============================================================================

const VIZ_FRAME = 'relative flex h-[160px] w-[224px] items-center justify-center'

// 01 — Deploy: outer dashed perimeter (AWS), filled dark chip (Enclave) inside.
function DeployViz() {
  return (
    <div className={VIZ_FRAME}>
      <svg
        viewBox="0 0 224 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden
      >
        {/* Perimeter label */}
        <text
          x="20"
          y="24"
          fontSize="9"
          letterSpacing="2.2"
          fontFamily="var(--font-jetbrains-mono, ui-monospace)"
          fill="#5E636F"
        >
          AWS
        </text>
        {/* Outer dashed perimeter */}
        <rect
          x="16"
          y="34"
          width="192"
          height="106"
          rx="10"
          stroke="#C7CCD4"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="perimeter-pulse"
        />
        {/* Inner filled dark chip */}
        <rect x="72" y="66" width="80" height="42" rx="6" fill="#050608" />
        <text
          x="112"
          y="92"
          textAnchor="middle"
          fontSize="11"
          fontWeight="600"
          fontFamily="var(--font-display, sans-serif)"
          fill="#F4F5F7"
          letterSpacing="-0.2"
        >
          Enclave
        </text>
      </svg>
    </div>
  )
}

// Small monochrome source glyphs — reused inside outlined chips.
function SlackMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="3" y="3" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="15" y="3" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="3" y="15" width="6" height="6" rx="1.5" fill="currentColor" />
      <rect x="15" y="15" width="6" height="6" rx="1.5" fill="currentColor" />
    </svg>
  )
}
function DriveMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M3 18 L12 4 L21 18 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M3 18 L8 18 L12 11" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 11 L16 18 L21 18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}
function GitHubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <circle cx="6" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="18" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7 8 L11 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M17 8 L13 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

// 02 — Connect: 3 outlined source chips on the left, dashed beams to filled dark chip on right.
function ConnectViz() {
  const containerRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const src1Ref = useRef<HTMLDivElement>(null)
  const src2Ref = useRef<HTMLDivElement>(null)
  const src3Ref = useRef<HTMLDivElement>(null)

  const chip =
    'absolute z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md border border-[#050608] bg-[oklch(0.965_0_0)] text-[#050608]'

  return (
    <div ref={containerRef} className={VIZ_FRAME}>
      {/* Destination — filled dark chip, right center */}
      <div
        ref={centerRef}
        className="absolute right-[10%] top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md bg-[#050608]"
      >
        <span className="text-[10px] font-medium tracking-tight text-[#F4F5F7]">EN</span>
      </div>

      {/* Sources */}
      <div ref={src1Ref} aria-label="Slack" className={chip} style={{ top: '22%', left: '10%' }}>
        <SlackMark className="h-3.5 w-3.5" />
      </div>
      <div ref={src2Ref} aria-label="Drive" className={chip} style={{ top: '50%', left: '10%' }}>
        <DriveMark className="h-3.5 w-3.5" />
      </div>
      <div ref={src3Ref} aria-label="GitHub" className={chip} style={{ top: '78%', left: '10%' }}>
        <GitHubMark className="h-3.5 w-3.5" />
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={src1Ref}
        toRef={centerRef}
        curvature={-14}
        duration={3.6}
        delay={0}
        pathColor="#C7CCD4"
        pathWidth={1}
        pathOpacity={0.9}
        gradientStartColor="#050608"
        gradientStopColor="#050608"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={src2Ref}
        toRef={centerRef}
        curvature={0}
        duration={3.6}
        delay={0.6}
        pathColor="#C7CCD4"
        pathWidth={1}
        pathOpacity={0.9}
        gradientStartColor="#050608"
        gradientStopColor="#050608"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={src3Ref}
        toRef={centerRef}
        curvature={14}
        duration={3.6}
        delay={1.2}
        pathColor="#C7CCD4"
        pathWidth={1}
        pathOpacity={0.9}
        gradientStartColor="#050608"
        gradientStopColor="#050608"
      />
    </div>
  )
}

// 03 — Ask: outlined person → dashed line → filled dark chip → outlined chat bubble.
function AskViz() {
  return (
    <div className={VIZ_FRAME}>
      <svg
        viewBox="0 0 224 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden
      >
        {/* Person — outlined circle + shoulders */}
        <circle cx="36" cy="70" r="10" stroke="#050608" strokeWidth="1.2" />
        <path
          d="M20 96 Q36 82 52 96"
          stroke="#050608"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Dashed connection */}
        <line
          x1="58"
          y1="82"
          x2="98"
          y2="82"
          stroke="#C7CCD4"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Filled dark chip (Enclave) with pulse dot */}
        <rect x="98" y="66" width="34" height="34" rx="6" fill="#050608" />
        <circle cx="115" cy="83" r="3" fill="#F4F5F7" className="status-pulse" />

        {/* Dashed connection */}
        <line
          x1="132"
          y1="82"
          x2="172"
          y2="82"
          stroke="#C7CCD4"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Chat bubble — outlined */}
        <path
          d="M172 66 h32 a4 4 0 0 1 4 4 v18 a4 4 0 0 1 -4 4 h-24 l-8 6 v-6 h-0 a4 4 0 0 1 -4 -4 v-18 a4 4 0 0 1 4 -4 z"
          stroke="#050608"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

// 04 — Trust: three hairline "log rows" with a filled dark checkmark chip revealing at the bottom.
function TrustViz() {
  const { ref, inView } = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} data-in-view={inView} className={VIZ_FRAME}>
      <svg
        viewBox="0 0 224 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden
      >
        {/* 3 stacked hairline rows */}
        {[36, 58, 80].map((y, i) => (
          <g key={y}>
            <circle cx="20" cy={y} r="2" fill="#050608" />
            <line
              x1="30"
              y1={y}
              x2={140 - i * 20}
              y2={y}
              stroke="#C7CCD4"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          </g>
        ))}

        {/* Filled dark chip with drawn checkmark */}
        <rect x="82" y="106" width="60" height="34" rx="6" fill="#050608" />
        <g stroke="#F4F5F7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" className="check-draw">
          <path d="M100 123 L110 132 L124 116" pathLength={1} />
        </g>
      </svg>
    </div>
  )
}

// ============================================================================
// Step data
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
      'Employees query in natural language. Permission-aware, so people only see what they’re allowed to.',
    Viz: AskViz,
  },
  {
    number: '04',
    label: 'Trust',
    description:
      'Every answer is sourced and logged. Compliance reads the audit trail, unaided.',
    Viz: TrustViz,
  },
]

function StepColumn({ step }: { step: Step }) {
  const { ref, inView } = useReveal<HTMLElement>()
  const Viz = step.Viz

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
        {step.number}
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
        {step.label}
      </h3>

      <p
        className="stagger-pop mt-2.5 max-w-[30ch] text-[13.5px] leading-[1.55] text-[#50545B]"
        style={{ ['--stagger-delay' as string]: '380ms' } as CSSProperties}
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
  const headline = useReveal<HTMLHeadingElement>()
  const chip = useReveal<HTMLDivElement>()
  const cta = useReveal<HTMLDivElement>()

  const firstClause = 'The model comes to your data.'
  const firstWordCount = firstClause.split(' ').length

  return (
    <section className="relative overflow-hidden bg-[oklch(0.965_0_0)] text-[#0a0b0d]">
      {/* Ghosted mountain photo — same asset as the hero, faded to near-invisible.
          This is the color thread: same cool blues/greens/grays echoing softly. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.09]">
        <Image
          src="/landing-hero-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[65%_center]"
        />
      </div>
      {/* Cool-warm wash — cream ground with a subtle cool tint bleeding from the
          bottom-right, echoing the mountain shadow direction in the hero. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_100%,oklch(0.86_0.02_240/0.35)_0%,transparent_55%),radial-gradient(ellipse_at_0%_0%,oklch(0.99_0_0/0.9)_0%,transparent_60%)]"
      />
      {/* Cream veil so the ghosted photo reads as tone, not imagery */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.965_0_0/0.72)_0%,oklch(0.965_0_0/0.86)_100%)]"
      />
      {/* Hairline divider from the dark rail above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[oklch(0.88_0_0)]" />

      <div className="relative z-[1] mx-auto max-w-[1440px] px-5 py-[clamp(5.5rem,10vw,8.5rem)] sm:px-10 lg:px-14">
        {/* Header block — LEFT-aligned, echoes hero rhythm */}
        <div className="flex flex-col items-start text-left">
          <div
            ref={chip.ref}
            data-in-view={chip.inView}
            className="scroll-reveal inline-flex items-center gap-2.5 rounded-full border border-[oklch(0.86_0_0/0.9)] bg-[oklch(1_0_0/0.65)] px-3.5 py-1.5 backdrop-blur-md"
          >
            <span className="font-mono text-[11px] tracking-[0.14em] text-[#5E636F]">01</span>
            <span className="h-[10px] w-px bg-[#C7CCD4]" aria-hidden />
            <span className="font-mono text-[11px] tracking-[0.14em] text-[#2E3238]">HOW IT WORKS</span>
          </div>

          <h2
            ref={headline.ref}
            data-in-view={headline.inView}
            className="font-display mt-6 max-w-[24ch] text-[clamp(1.9rem,4.4vw,3.4rem)] font-normal leading-[1.05] tracking-[-0.025em] text-[#050608]"
          >
            <WordsReveal text={firstClause} />
            <br className="hidden md:block" />
            <span className="text-[#7F848F]">
              <WordsReveal text="Not the other way around." startIndex={firstWordCount} />
            </span>
          </h2>
        </div>

        {/* Column grid — 4 up, hairline dividers */}
        <div className="mt-16 grid grid-cols-1 divide-y divide-[#E0E3E8] border-y border-[#E0E3E8] md:mt-20 md:grid-cols-4 md:divide-x md:divide-y-0">
          {steps.map((step) => (
            <StepColumn key={step.number} step={step} />
          ))}
        </div>

        {/* CTA — ghost pill echoing hero's dark pill */}
        <div
          ref={cta.ref}
          data-in-view={cta.inView}
          className="scroll-reveal mt-12 md:mt-14"
        >
          <Link
            href="/manifesto#III"
            className="group inline-flex h-[42px] items-center gap-2.5 rounded-[6px] border border-[#050608] px-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#050608] transition-[background-color,color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#050608] hover:text-[oklch(0.985_0_0)] active:scale-[0.985]"
          >
            Read the architecture
            <ArrowUpRight
              className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
