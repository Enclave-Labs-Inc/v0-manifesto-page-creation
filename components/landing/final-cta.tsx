'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import type { CSSProperties } from 'react'

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

export default function FinalCTA() {
  const eyebrow = useReveal<HTMLParagraphElement>()
  const headline = useReveal<HTMLHeadingElement>()
  const sub = useReveal<HTMLParagraphElement>()
  const ctaBlock = useReveal<HTMLDivElement>()
  const qualifier = useReveal<HTMLParagraphElement>()

  const firstClause = 'The Company Brain your security team'
  const firstWordCount = firstClause.split(' ').length

  return (
    <section className="relative overflow-hidden bg-[#050608] text-[#E8E9EC]">
      {/* Hairline from the light section above */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[oklch(0.18_0.004_145)]" />
      {/* Soft top glow — echoes the hero's mesh light, gives the close visual lift */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-[radial-gradient(ellipse_at_50%_0%,oklch(0.32_0.008_145/0.7)_0%,transparent_70%)]" />

      <div className="relative mx-auto flex max-w-[1320px] flex-col items-center px-6 py-[clamp(6rem,12vw,10rem)] text-center sm:px-10 lg:px-14">
        <p
          ref={eyebrow.ref}
          data-in-view={eyebrow.inView}
          className="scroll-reveal inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.34em] text-[#787D8A]"
        >
          <span
            aria-hidden
            className="status-pulse inline-block h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.13_162)]"
          />
          Ready
        </p>

        <h2
          ref={headline.ref}
          data-in-view={headline.inView}
          className="mt-8 max-w-[22ch] text-[clamp(2.2rem,5.2vw,4.4rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#F4F5F7]"
        >
          <WordsReveal text={firstClause} />{' '}
          <span className="text-[#7F848F]">
            <WordsReveal text="can actually approve." startIndex={firstWordCount} />
          </span>
        </h2>

        <p
          ref={sub.ref}
          data-in-view={sub.inView}
          className="scroll-reveal mt-6 max-w-[52ch] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.5] tracking-[-0.015em] text-[#9499A6]"
        >
          Because nothing leaves your perimeter.
        </p>

        <div
          ref={ctaBlock.ref}
          data-in-view={ctaBlock.inView}
          className="scroll-reveal relative mt-12"
        >
          {/* Ambient glow behind the CTA — pulses softly, draws the eye. */}
          <div
            aria-hidden
            className="cta-glow pointer-events-none absolute -inset-6 rounded-full bg-[radial-gradient(circle,oklch(0.78_0.13_162/0.22)_0%,transparent_60%)] blur-md"
          />
          <a
            href="https://cal.com/shashank-bhardwaj-fwmii1/30min"
            className="group relative inline-flex h-[56px] items-center gap-3 rounded-[12px] bg-[#F4F5F7] px-9 text-[15px] font-bold tracking-[-0.02em] text-[#050608] shadow-[0_20px_60px_oklch(0.6_0.012_145/0.18),inset_0_1px_0_oklch(1_0_0/0.8)] transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white hover:shadow-[0_26px_70px_oklch(0.78_0.13_162/0.28),inset_0_1px_0_oklch(1_0_0/0.95)] active:scale-[0.985]"
          >
            Book a design-partner call
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </a>
        </div>

        <p
          ref={qualifier.ref}
          data-in-view={qualifier.inView}
          className="scroll-reveal mt-7 text-[12px] font-bold uppercase tracking-[0.28em] text-[#5E636F]"
        >
          For regulated teams deploying in their own cloud
        </p>
      </div>
    </section>
  )
}
