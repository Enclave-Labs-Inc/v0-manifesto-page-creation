'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import type { CSSProperties } from 'react'

const claims = [
  {
    title: 'Runs in your cloud account',
    detail:
      'Not a "dedicated instance" we operate. Our control plane never touches your data.',
  },
  {
    title: 'You hold the encryption keys',
    detail:
      'Our principals are excluded from your KMS key policy. Verify it in your console.',
  },
  {
    title: 'No standing access inside your perimeter',
    detail:
      'We cannot reach your data, even if compelled. Subpoena us   you keep your keys.',
  },
  {
    title: 'Full audit log in your CloudTrail',
    detail:
      'Your compliance team reads it without calling us. Every action attributable, end-to-end.',
  },
  {
    title: 'We never train on your data',
    detail:
      'Because we never see it. The model runs inside your VPC. Weights stay. Data stays.',
  },
]

const insideStack = ['S3', 'KMS', 'Postgres', 'CloudTrail']

// ============================================================================
// Hooks + primitives
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

// SVG checkmark that draws its stroke on parent data-in-view.
function DrawnCheck({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`check-draw ${className ?? ''}`}
      aria-hidden
    >
      <path d="M5 12 L10 17 L19 7" pathLength={1} />
    </svg>
  )
}

// ============================================================================
// Perimeter diagram with subtle continuous motion
// ============================================================================

function PerimeterDiagram() {
  const { ref, inView } = useReveal<HTMLDivElement>()

  return (
    <div ref={ref} data-in-view={inView} className="relative">
      {/* Outer dashed box = customer AWS account */}
      <div className="perimeter-pulse relative overflow-hidden rounded-2xl border border-dashed border-[#2A2D34] bg-[oklch(0.1_0.005_145/0.55)] p-6 sm:p-8">
        <div
          className="stagger-pop mb-6 flex items-center justify-between gap-3"
          style={{ ['--stagger-delay' as string]: '60ms' } as CSSProperties}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#787D8A]">
            Your AWS account
          </span>
          <span className="rounded-full border border-[#2A2D34] bg-[oklch(0.13_0.005_145)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.24em] text-[#9499A6]">
            us-east-1
          </span>
        </div>

        {/* Inner solid box = Enclave */}
        <div
          className="stagger-pop relative overflow-hidden rounded-xl border border-[#3A3D43] bg-[oklch(0.13_0.005_145)] p-5 sm:p-6"
          style={{ ['--stagger-delay' as string]: '180ms' } as CSSProperties}
        >
          {/* Faint scan-line sweeping horizontally   reads as "this is live". */}
          <div
            aria-hidden
            className="scan-sweep pointer-events-none absolute inset-y-0 w-[28%] bg-[linear-gradient(to_right,transparent,oklch(1_0_0/0.06),transparent)]"
          />

          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#787D8A]">
            Inside your VPC
          </p>
          <p className="mt-2 text-[22px] font-bold tracking-[-0.02em] text-[#F4F5F7]">
            Enclave
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-bold text-[#C5C9D2]">
            {insideStack.map((s, i, arr) => (
              <span key={s} className="inline-flex items-center gap-1.5">
                <span
                  className="status-pulse inline-block h-1.5 w-1.5 rounded-full bg-[oklch(0.63_0.16_162)]"
                  style={{ animationDelay: `${i * -0.5}s` }}
                  aria-hidden
                />
                {s}
                {i < arr.length - 1 && (
                  <span className="text-[#3A3D43]">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Vendor sits outside the perimeter   explicitly blocked */}
      <div
        className="stagger-pop mt-5 flex flex-wrap items-center gap-3"
        style={{ ['--stagger-delay' as string]: '320ms' } as CSSProperties}
      >
        <div className="flex-shrink-0 rounded-lg border border-[#2A2D34] bg-[oklch(0.09_0.004_145)] px-4 py-2.5">
          <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#5E636F]">
            Outside
          </p>
          <p className="text-[12px] font-bold text-[#9499A6]">Vendor (us)</p>
        </div>
        <div className="hidden h-px flex-1 border-t border-dashed border-[#3A3D43] sm:block" />
        <div className="inline-flex items-center gap-2 rounded-md border border-[#3A2A2A] bg-[oklch(0.13_0.01_25/0.45)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#D89A9A]">
          <X
            className="blocked-pulse h-3 w-3 text-[#D87070]"
            strokeWidth={2.5}
          />
          <span>No standing access</span>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Claim cards (with checkmark stroke-draw + per-card scroll cascade + hover)
// ============================================================================

function ClaimCard({
  index,
  claim,
}: {
  index: number
  claim: { title: string; detail: string }
}) {
  const { ref, inView } = useReveal<HTMLElement>()

  return (
    <article
      ref={ref}
      data-in-view={inView}
      className="group relative flex gap-5 rounded-xl border border-[#1F2227] bg-[oklch(0.1_0.005_145/0.55)] p-5 transition-[border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:border-[#363A42] hover:shadow-[0_18px_44px_-12px_oklch(0_0_0/0.5)]"
    >
      <div
        className="stagger-pop flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#2A2D34] bg-[#0F1115] text-[oklch(0.78_0.13_162)] transition-[border-color,color] duration-300 group-hover:border-[#454952] group-hover:text-[oklch(0.85_0.14_162)]"
        style={{ ['--stagger-delay' as string]: '80ms' } as CSSProperties}
        aria-hidden
      >
        <DrawnCheck className="h-4 w-4" />
      </div>

      <div className="flex-1">
        <div
          className="stagger-pop flex items-center gap-2"
          style={{ ['--stagger-delay' as string]: '180ms' } as CSSProperties}
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.36em] text-[#5E636F]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="text-[16px] font-bold tracking-[-0.015em] text-[#F4F5F7]">
            {claim.title}
          </h3>
        </div>
        <p
          className="stagger-pop mt-1.5 text-[14px] leading-[1.6] tracking-[-0.005em] text-[#9499A6]"
          style={{ ['--stagger-delay' as string]: '280ms' } as CSSProperties}
        >
          {claim.detail}
        </p>
      </div>
    </article>
  )
}

// ============================================================================
// Section
// ============================================================================

export default function SovereigntyProof() {
  const eyebrow = useReveal<HTMLParagraphElement>()
  const headline = useReveal<HTMLHeadingElement>()
  const sub = useReveal<HTMLParagraphElement>()

  const firstClause = 'Privacy you can audit'
  const firstWordCount = firstClause.split(' ').length

  return (
    <section className="relative overflow-hidden bg-[#07080A] text-[#E8E9EC]">
      {/* Hairline from the light section above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[oklch(0.16_0.004_145)]" />
      {/* Subtle top vignette for depth */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,oklch(0.16_0.005_145/0.55)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-[1320px] px-6 py-[clamp(5.5rem,10vw,8.5rem)] sm:px-10 lg:px-14">
        <p
          ref={eyebrow.ref}
          data-in-view={eyebrow.inView}
          className="scroll-reveal text-[11px] font-bold uppercase tracking-[0.34em] text-[#787D8A]"
        >
          Sovereignty proof
        </p>

        <h2
          ref={headline.ref}
          data-in-view={headline.inView}
          className="mt-8 max-w-[24ch] text-[clamp(2rem,4.8vw,4rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#F4F5F7]"
        >
          <WordsReveal text={firstClause} />
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">
            <WordsReveal text="yourself." startIndex={firstWordCount} />
          </span>
        </h2>

        <p
          ref={sub.ref}
          data-in-view={sub.inView}
          className="scroll-reveal mt-6 max-w-[62ch] text-[15px] leading-[1.65] tracking-[-0.005em] text-[#9499A6]"
        >
          Every vendor says &ldquo;private.&rdquo; These are the five claims that survive
          a security review   each one verifiable inside your own AWS console.
        </p>

        <div className="mt-14 grid gap-12 md:mt-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <PerimeterDiagram />

          <div className="space-y-4">
            {claims.map((claim, i) => (
              <ClaimCard key={claim.title} index={i} claim={claim} />
            ))}
          </div>
        </div>

        <p className="mt-12 max-w-[72ch] text-[12px] leading-[1.7] tracking-[-0.005em] text-[#5E636F]">
          Architectural and policy claims describe the system as designed. Infrastructure claims (deployment location, key ownership, audit logs) are verifiable directly in your AWS console today. Conduct and data-handling claims (no standing access, no training on customer data) are currently self-attested; independent verification (SOC&nbsp;2 Type&nbsp;II) is in progress and audit findings will be shared with design partners under NDA as they become available.
        </p>
      </div>
    </section>
  )
}
