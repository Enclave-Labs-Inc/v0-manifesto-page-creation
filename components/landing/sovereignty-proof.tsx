'use client'

import Image from 'next/image'
import { Fragment, useEffect, useRef, useState } from 'react'
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
      'We cannot reach your data, even if compelled. Subpoena us; you keep your keys.',
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
// Reveal + word cascade primitives
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

// SVG checkmark that draws its stroke when the parent enters view.
function DrawnCheck({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
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
// Perimeter diagram — same illustration language as how-it-works + problem.
// Outer dashed AWS perimeter, inner filled dark Enclave chip, vendor blocked
// outside.
// ============================================================================

function PerimeterDiagram() {
  const { ref, inView } = useReveal<HTMLDivElement>()

  return (
    <div ref={ref} data-in-view={inView} className="relative">
      <div className="perimeter-pulse relative overflow-hidden rounded-2xl border border-dashed border-[#C7CCD4] bg-[oklch(1_0_0/0.5)] p-6 backdrop-blur-sm sm:p-8">
        <div
          className="stagger-pop mb-6 flex items-center justify-between gap-3"
          style={{ ['--stagger-delay' as string]: '60ms' } as CSSProperties}
        >
          <span className="font-mono text-[11px] tracking-[0.14em] text-[#5E636F]">
            YOUR AWS ACCOUNT
          </span>
          <span className="rounded-full border border-[#C7CCD4] bg-[oklch(1_0_0/0.7)] px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-[#5E636F]">
            us-east-1
          </span>
        </div>

        {/* Inner filled dark chip = Enclave */}
        <div
          className="stagger-pop relative overflow-hidden rounded-xl bg-[#050608] p-5 sm:p-6"
          style={{ ['--stagger-delay' as string]: '180ms' } as CSSProperties}
        >
          <div
            aria-hidden
            className="scan-sweep pointer-events-none absolute inset-y-0 w-[28%] bg-[linear-gradient(to_right,transparent,oklch(1_0_0/0.06),transparent)]"
          />

          <p className="font-mono text-[10px] tracking-[0.14em] text-[#787D8A]">
            INSIDE YOUR VPC
          </p>
          <p className="font-display mt-2 text-[22px] font-medium tracking-[-0.02em] text-[#F4F5F7]">
            Enclave
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] text-[#C5C9D2]">
            {insideStack.map((s, i, arr) => (
              <span key={s} className="inline-flex items-center gap-1.5">
                <span
                  className="status-pulse inline-block h-1.5 w-1.5 rounded-full bg-[#8A8F98]"
                  style={{ animationDelay: `${i * -0.5}s` }}
                  aria-hidden
                />
                {s}
                {i < arr.length - 1 && <span className="text-[#3A3D43]">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Vendor outside — explicitly blocked */}
      <div
        className="stagger-pop mt-5 flex flex-wrap items-center gap-3"
        style={{ ['--stagger-delay' as string]: '320ms' } as CSSProperties}
      >
        <div className="flex-shrink-0 rounded-lg border border-[#C7CCD4] bg-[oklch(1_0_0/0.5)] px-4 py-2.5">
          <p className="font-mono text-[10px] tracking-[0.14em] text-[#5E636F]">OUTSIDE</p>
          <p className="text-[12px] font-medium text-[#050608]">Vendor (us)</p>
        </div>
        <div className="hidden h-px flex-1 border-t border-dashed border-[#C7CCD4] sm:block" />
        <div className="inline-flex items-center gap-2 rounded-md border border-[#050608] bg-transparent px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-[#050608]">
          <span aria-hidden className="text-[10px] font-bold">✕</span>
          <span>NO STANDING ACCESS</span>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Claim row — outlined checkmark chip on the left, title + body on the right,
// hairline divider between rows. No card.
// ============================================================================

function ClaimRow({ index, claim, isLast }: { index: number; claim: { title: string; detail: string }; isLast: boolean }) {
  const { ref, inView } = useReveal<HTMLElement>()

  return (
    <article
      ref={ref}
      data-in-view={inView}
      className={`flex gap-5 py-6 ${isLast ? '' : 'border-b border-[#E0E3E8]'}`}
    >
      <div
        className="stagger-pop flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[#050608] text-[#F4F5F7]"
        style={{ ['--stagger-delay' as string]: '80ms' } as CSSProperties}
        aria-hidden
      >
        <DrawnCheck className="h-4 w-4" />
      </div>

      <div className="flex-1">
        <div
          className="stagger-pop flex items-center gap-2.5"
          style={{ ['--stagger-delay' as string]: '180ms' } as CSSProperties}
        >
          <span className="font-mono text-[10px] tracking-[0.14em] text-[#5E636F]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="font-display text-[16px] font-medium tracking-[-0.015em] text-[#050608]">
            {claim.title}
          </h3>
        </div>
        <p
          className="stagger-pop mt-1.5 text-[13.5px] leading-[1.6] tracking-[-0.005em] text-[#50545B]"
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
  const chip = useReveal<HTMLDivElement>()
  const headline = useReveal<HTMLHeadingElement>()
  const sub = useReveal<HTMLParagraphElement>()

  const firstClause = 'Privacy you can audit'
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
          className="object-cover object-[65%_center]"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_100%,oklch(0.86_0.02_240/0.32)_0%,transparent_55%),radial-gradient(ellipse_at_0%_0%,oklch(0.99_0_0/0.9)_0%,transparent_60%)]"
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
            <span className="font-mono text-[11px] tracking-[0.14em] text-[#5E636F]">03</span>
            <span className="h-[10px] w-px bg-[#C7CCD4]" aria-hidden />
            <span className="font-mono text-[11px] tracking-[0.14em] text-[#2E3238]">SOVEREIGNTY PROOF</span>
          </div>

          <h2
            ref={headline.ref}
            data-in-view={headline.inView}
            className="font-display mt-6 text-[clamp(1.9rem,4.4vw,3.4rem)] font-normal leading-[1.05] tracking-[-0.025em] text-[#050608]"
          >
            <span className="md:whitespace-nowrap">
              <WordsReveal text={firstClause} />
            </span>{' '}
            <span className="text-[#7F848F]">
              <WordsReveal text="yourself." startIndex={firstWordCount} />
            </span>
          </h2>

          <p
            ref={sub.ref}
            data-in-view={sub.inView}
            className="scroll-reveal mt-6 max-w-[62ch] text-[14px] leading-[1.6] tracking-[-0.005em] text-[#50545B]"
          >
            Every vendor says &ldquo;private.&rdquo; These five claims survive a security review, each one
            verifiable inside your own AWS console.
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:mt-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <PerimeterDiagram />

          <div className="border-t border-[#E0E3E8]">
            {claims.map((claim, i) => (
              <ClaimRow key={claim.title} index={i} claim={claim} isLast={i === claims.length - 1} />
            ))}
          </div>
        </div>

        <p className="mt-12 max-w-[72ch] text-[12px] leading-[1.7] tracking-[-0.005em] text-[#787D8A]">
          Architectural and policy claims describe the system as designed. Infrastructure claims (deployment location, key ownership, audit logs) are verifiable directly in your AWS console today. Conduct and data-handling claims (no standing access, no training on customer data) are currently self-attested; independent verification (SOC&nbsp;2 Type&nbsp;II) is in progress and audit findings will be shared with design partners under NDA as they become available.
        </p>
      </div>
    </section>
  )
}
