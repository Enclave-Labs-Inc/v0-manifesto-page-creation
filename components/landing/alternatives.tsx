'use client'

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
    tag: 'Path 01',
    category: 'SaaS AI',
    context: 'Glean · Copilot · ChatGPT Enterprise',
    headline: 'Great products. Not for your data.',
    body: 'Excellent tools   for companies that can send their data into a vendor’s cloud. Your security team already said no, and they were right to.',
    verdict: 'Closed by compliance',
  },
  {
    tag: 'Path 02',
    category: 'Build it yourself',
    context: 'Internal RAG · custom LLM ops',
    headline: '8–12 months. ~$1.5M. Forever yours.',
    body: '3–4 engineers, indefinite roadmap, and the compounding cost of keeping pace with model + pipeline tooling. Most builds never quite ship.',
    verdict: 'Slow, expensive, never done',
  },
  {
    tag: 'Path 03',
    category: 'Enclave',
    context: 'Sovereign infrastructure',
    headline: 'Sovereign by architecture. Live in weeks.',
    body: 'Deploys inside your AWS account. You own the data; we maintain the engine. Same isolation as a build   without the 12-month detour.',
    verdict: 'Open to regulated companies',
    primary: true,
  },
]

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

// ============================================================================
// Path card with per-card scroll cascade + hover state
// ============================================================================

function PathCard({ path }: { path: Path }) {
  const { ref, inView } = useReveal<HTMLElement>()

  const isPrimary = path.primary

  const wrapperClass = isPrimary
    ? 'group relative flex flex-col overflow-hidden rounded-[18px] border border-[#0E1014] bg-[#0a0b0d] p-7 text-[#E8E9EC] shadow-[0_24px_60px_oklch(0.18_0.008_145/0.12),inset_0_1px_0_oklch(1_0_0/0.06)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_32px_72px_oklch(0.18_0.008_145/0.18),inset_0_1px_0_oklch(1_0_0/0.08)] sm:p-8'
    : 'group relative flex flex-col rounded-[18px] border border-[#E0E3E8] bg-[oklch(0.995_0.001_145)] p-7 text-[#0a0b0d] shadow-[0_12px_36px_oklch(0.2_0.008_145/0.05),inset_0_1px_0_oklch(1_0_0/0.7)] transition-[border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:border-[#C7CCD4] hover:shadow-[0_20px_48px_oklch(0.2_0.008_145/0.08),inset_0_1px_0_oklch(1_0_0/0.8)] sm:p-8'

  return (
    <article ref={ref} data-in-view={inView} className={wrapperClass}>
      {/* Primary card gets a subtle ambient glow that breathes (sits behind
          all content via a low z-index, doesn't catch clicks). */}
      {isPrimary && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[18px] bg-[radial-gradient(circle_at_50%_0%,oklch(0.32_0.06_162/0.18),transparent_55%)]"
        />
      )}

      <div className="relative flex flex-col">
        <div
          className="stagger-pop mb-6 flex items-center justify-between gap-3"
          style={{ ['--stagger-delay' as string]: '80ms' } as CSSProperties}
        >
          <span
            className={
              isPrimary
                ? 'text-[10px] font-bold uppercase tracking-[0.34em] text-[#787D8A]'
                : 'text-[10px] font-bold uppercase tracking-[0.34em] text-[#9499A6]'
            }
          >
            {path.tag}
          </span>
          {isPrimary && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2A2D34] bg-[oklch(0.13_0.005_145)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.24em] text-[#C5C9D2]">
              <span
                aria-hidden
                className="status-pulse h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.13_162)]"
              />
              Your lane
            </span>
          )}
        </div>

        <p
          className={
            isPrimary
              ? 'stagger-pop text-[20px] font-bold tracking-[-0.02em] text-[#F4F5F7]'
              : 'stagger-pop text-[20px] font-bold tracking-[-0.02em] text-[#050608]'
          }
          style={{ ['--stagger-delay' as string]: '180ms' } as CSSProperties}
        >
          {path.category}
        </p>
        <p
          className={
            isPrimary
              ? 'stagger-pop mt-1 text-[12px] font-bold uppercase tracking-[0.18em] text-[#7F848F]'
              : 'stagger-pop mt-1 text-[12px] font-bold uppercase tracking-[0.18em] text-[#9499A6]'
          }
          style={{ ['--stagger-delay' as string]: '240ms' } as CSSProperties}
        >
          {path.context}
        </p>

        <h3
          className={
            isPrimary
              ? 'stagger-pop mt-7 text-[22px] font-bold leading-[1.25] tracking-[-0.02em] text-[#F4F5F7]'
              : 'stagger-pop mt-7 text-[22px] font-bold leading-[1.25] tracking-[-0.02em] text-[#1B1D21]'
          }
          style={{ ['--stagger-delay' as string]: '340ms' } as CSSProperties}
        >
          {path.headline}
        </h3>

        <p
          className={
            isPrimary
              ? 'stagger-pop mt-4 text-[14px] leading-[1.62] tracking-[-0.005em] text-[#C5C9D2]'
              : 'stagger-pop mt-4 text-[14px] leading-[1.62] tracking-[-0.005em] text-[#50545B]'
          }
          style={{ ['--stagger-delay' as string]: '440ms' } as CSSProperties}
        >
          {path.body}
        </p>

        <div
          className="stagger-pop mt-auto pt-7"
          style={{ ['--stagger-delay' as string]: '560ms' } as CSSProperties}
        >
          {isPrimary ? (
            <p className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[#9EE8C3]">
              <span
                aria-hidden
                className="status-pulse h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.13_162)]"
              />
              {path.verdict}
            </p>
          ) : (
            <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#7F848F]">
              {path.verdict}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

// ============================================================================
// Section
// ============================================================================

export default function AlternativesSection() {
  const eyebrow = useReveal<HTMLParagraphElement>()
  const headline = useReveal<HTMLHeadingElement>()
  const sub = useReveal<HTMLParagraphElement>()

  const firstClause = 'Three paths to enterprise AI.'
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
          The honest comparison
        </p>

        <h2
          ref={headline.ref}
          data-in-view={headline.inView}
          className="mt-8 max-w-[26ch] text-[clamp(2rem,4.8vw,4rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#050608]"
        >
          <WordsReveal text={firstClause} />
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">
            <WordsReveal
              text="Two of them aren’t open to you."
              startIndex={firstWordCount}
            />
          </span>
        </h2>

        <p
          ref={sub.ref}
          data-in-view={sub.inView}
          className="scroll-reveal mt-6 max-w-[62ch] text-[15px] leading-[1.65] tracking-[-0.005em] text-[#50545B]"
        >
          You’re comparing us to something whether we name it or not. Here’s
          the honest version   no feature tables, no swipes. Just the trade-off
          each path actually carries.
        </p>

        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-3 md:gap-6 lg:gap-8">
          {paths.map((path) => (
            <PathCard key={path.tag} path={path} />
          ))}
        </div>
      </div>
    </section>
  )
}
