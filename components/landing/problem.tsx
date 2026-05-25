'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { AlertTriangle, Cloud, ShieldX } from 'lucide-react'
import type { CSSProperties, ElementType } from 'react'

type IconMotion = 'icon-drift' | 'icon-pulse' | 'icon-tilt'

type Beat = {
  label: string
  icon: ElementType
  motion: IconMotion
  title: string
  body: string
  tagPrefix: string
  tags: string[]
}

const beats: Beat[] = [
  {
    label: '01',
    icon: Cloud,
    motion: 'icon-drift',
    title: 'The good tools are SaaS',
    body: 'The good AI tools are SaaS — your data has to leave to use them. Compliance says no.',
    tagPrefix: 'Vendor lane',
    tags: ['Glean', 'Microsoft Copilot', 'ChatGPT Enterprise'],
  },
  {
    label: '02',
    icon: ShieldX,
    motion: 'icon-pulse',
    title: 'Security review kills it',
    body: 'So the project dies in security review. Again.',
    tagPrefix: 'What it fails',
    tags: ['Data residency', 'Vendor risk', 'Standing access'],
  },
  {
    label: '03',
    icon: AlertTriangle,
    motion: 'icon-tilt',
    title: 'Shadow AI fills the void',
    body: 'Meanwhile your team is pasting documents into ChatGPT. The risk you blocked just got worse, invisibly.',
    tagPrefix: 'Quietly used',
    tags: ['ChatGPT', 'Claude', 'Gemini'],
  },
]

// Each element reveals as IT individually enters the viewport, and hides
// again when it leaves — so scrolling back up + down re-plays the effect.
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
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

// Wraps each word in a span with a staggered animation delay so the
// headline cascades in word-by-word once the parent is in view.
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

function ProblemCard({ beat }: { beat: Beat }) {
  const { ref, inView } = useReveal<HTMLElement>()
  const Icon = beat.icon

  // Stagger delays for each cascading element in the card (ms).
  const D_NUM = 80
  const D_ICON = 130
  const D_TITLE = 220
  const D_BODY = 310
  const D_TAG_PREFIX = 420
  const D_TAG_BASE = 500
  const D_TAG_STEP = 70

  return (
    <article
      ref={ref}
      data-in-view={inView}
      className="group relative flex flex-col rounded-2xl border border-[#1E2127] bg-[oklch(0.115_0.005_145)] p-6 transition-[border-color,background-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:border-[#363A42] hover:bg-[oklch(0.135_0.005_145)] hover:shadow-[0_24px_60px_-12px_oklch(0_0_0/0.55),inset_0_1px_0_oklch(1_0_0/0.04)] sm:p-7"
    >
      <div className="mb-6 flex items-center justify-between">
        <span
          className="stagger-pop text-[10px] font-bold uppercase tracking-[0.36em] text-[#5E636F]"
          style={{ ['--stagger-delay' as string]: `${D_NUM}ms` } as CSSProperties}
        >
          {beat.label}
        </span>
        <span
          className="stagger-pop flex h-9 w-9 items-center justify-center rounded-full border border-[#2A2D34] bg-[oklch(0.09_0.004_145)] text-[#C5C9D2] transition-[transform,border-color,color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:border-[#454952] group-hover:text-[#F4F5F7]"
          style={{ ['--stagger-delay' as string]: `${D_ICON}ms` } as CSSProperties}
        >
          <Icon className={`h-4 w-4 ${beat.motion}`} strokeWidth={1.6} />
        </span>
      </div>

      <h3
        className="stagger-pop text-[17px] font-bold tracking-[-0.015em] text-[#F4F5F7]"
        style={{ ['--stagger-delay' as string]: `${D_TITLE}ms` } as CSSProperties}
      >
        {beat.title}
      </h3>

      <p
        className="stagger-pop mt-3 text-[14px] leading-[1.62] tracking-[-0.005em] text-[#9499A6]"
        style={{ ['--stagger-delay' as string]: `${D_BODY}ms` } as CSSProperties}
      >
        {beat.body}
      </p>

      <div className="mt-auto pt-6">
        <p
          className="stagger-pop mb-3 text-[9px] font-bold uppercase tracking-[0.34em] text-[#5E636F]"
          style={{ ['--stagger-delay' as string]: `${D_TAG_PREFIX}ms` } as CSSProperties}
        >
          {beat.tagPrefix}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {beat.tags.map((tag, i) => (
            <span
              key={tag}
              className="stagger-pop inline-flex items-center rounded-md border border-[#2A2D34] bg-[oklch(0.09_0.004_145)] px-2.5 py-1 text-[11px] font-bold text-[#C5C9D2] transition-[border-color,background-color] duration-200 group-hover:border-[#363A42] group-hover:bg-[oklch(0.105_0.004_145)]"
              style={
                {
                  ['--stagger-delay' as string]: `${D_TAG_BASE + i * D_TAG_STEP}ms`,
                } as CSSProperties
              }
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function ProblemSection() {
  const eyebrow = useReveal<HTMLParagraphElement>()
  const headline = useReveal<HTMLHeadingElement>()
  const subhead = useReveal<HTMLParagraphElement>()

  // Word counts to keep --word-i continuous across the two clauses.
  const firstClause = 'Your security team isn’t the blocker.'
  const firstWordCount = firstClause.split(' ').length

  return (
    <section className="relative overflow-hidden bg-[oklch(0.095_0.006_145)] text-[#E8E9EC]">
      <div className="relative mx-auto max-w-[1320px] px-6 py-[clamp(5.5rem,10vw,8.5rem)] sm:px-10 lg:px-14">
        <p
          ref={eyebrow.ref}
          data-in-view={eyebrow.inView}
          className="scroll-reveal text-[11px] font-bold uppercase tracking-[0.34em] text-[#787D8A]"
        >
          The problem
        </p>

        <h2
          ref={headline.ref}
          data-in-view={headline.inView}
          className="mt-8 max-w-[22ch] text-[clamp(2rem,4.8vw,4rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#F4F5F7]"
        >
          <WordsReveal text={firstClause} />
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">
            <WordsReveal text="The deployment model is." startIndex={firstWordCount} />
          </span>
        </h2>

        <p
          ref={subhead.ref}
          data-in-view={subhead.inView}
          className="scroll-reveal mt-6 max-w-[62ch] text-[15px] leading-[1.65] tracking-[-0.005em] text-[#9499A6]"
        >
          Three reasons regulated AI projects stall — and the workaround that
          quietly makes the risk worse.
        </p>

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3 md:gap-6">
          {beats.map((beat) => (
            <ProblemCard key={beat.label} beat={beat} />
          ))}
        </div>
      </div>
    </section>
  )
}
