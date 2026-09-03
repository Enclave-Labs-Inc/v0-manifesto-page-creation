'use client'

import Image from 'next/image'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
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
  const chip = useReveal<HTMLDivElement>()
  const headline = useReveal<HTMLHeadingElement>()
  const ctaBlock = useReveal<HTMLDivElement>()
  const qualifier = useReveal<HTMLParagraphElement>()

  const sectionRef = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  // Parallax: as the section scrolls through the viewport, translate the
  // image downward inside its container so it appears to lag behind the
  // foreground (same technique as the hero). rAF-throttled, skipped for
  // prefers-reduced-motion.
  useEffect(() => {
    const section = sectionRef.current
    const node = imgRef.current
    if (!section || !node) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ticking = false
    const update = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      // Progress: 0 when section top hits bottom of viewport, 1 when section
      // bottom leaves top. Clamped to [0,1].
      const progress = Math.max(
        0,
        Math.min(1, 1 - (rect.top + rect.height * 0.2) / (vh + rect.height * 0.2)),
      )
      // Move image up to 24vh downward through its container (image extends
      // above the section so we never expose dark ground at the top edge).
      const offset = progress * (vh * 0.24)
      node.style.transform = `translate3d(0, ${offset}px, 0)`
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#050608] text-[#F4F5F7]"
    >
      {/* Parallax layer — image extends above the section so a downward
          translate3d never exposes the dark ground at the top edge. */}
      <div
        ref={imgRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-[25vh] bottom-0 will-change-transform"
      >
        <Image
          src="/landing-cta-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          priority={false}
          className="object-cover object-center [filter:grayscale(0.35)_brightness(0.75)_contrast(1.05)]"
        />
      </div>

      {/* Cool desaturated wash — kills any residual warmth, unifies with the mono palette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.08_0.008_240/0.55)_0%,oklch(0.10_0.008_240/0.25)_35%,oklch(0.08_0.006_240/0.4)_75%,oklch(0.05_0_0/0.75)_100%)]"
      />

      {/* Subtle radial light pool centered under the copy — matches CTGT's reflection glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,oklch(1_0_0/0.09)_0%,transparent_45%)]"
      />

      <div className="relative z-[1] mx-auto flex min-h-[85svh] max-w-[1440px] flex-col items-center justify-start px-5 pt-[clamp(5rem,10vw,7rem)] pb-[clamp(18rem,28vw,24rem)] text-center sm:px-10 lg:px-14">
        <div
          ref={chip.ref}
          data-in-view={chip.inView}
          className="scroll-reveal inline-flex items-center gap-2.5 rounded-full border border-[oklch(1_0_0/0.22)] bg-[oklch(1_0_0/0.08)] px-3.5 py-1.5 backdrop-blur-md"
        >
          <span className="font-mono text-[11px] tracking-[0.14em] text-[#C5C9D2]">05</span>
          <span className="h-[10px] w-px bg-[oklch(1_0_0/0.28)]" aria-hidden />
          <span className="font-mono text-[11px] tracking-[0.14em] text-[#F4F5F7]">READY</span>
        </div>

        <h2
          ref={headline.ref}
          data-in-view={headline.inView}
          className="font-display mt-8 max-w-[20ch] text-[clamp(2.2rem,5.6vw,4.6rem)] font-normal leading-[1.02] tracking-[-0.025em] text-[#F4F5F7]"
        >
          <span className="block">
            <WordsReveal text="Ready to give your team" />
          </span>
          <span className="block text-[oklch(1_0_0/0.65)]">
            <WordsReveal text="a company brain?" startIndex={5} />
          </span>
        </h2>

        <div
          ref={ctaBlock.ref}
          data-in-view={ctaBlock.inView}
          className="scroll-reveal mt-10"
        >
          <a
            href="https://cal.com/shashank-bhardwaj-fwmii1/30min"
            className="group inline-flex h-[52px] items-center gap-3 rounded-[6px] bg-[#F4F5F7] px-8 text-[11px] font-bold uppercase tracking-[0.18em] text-[#050608] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white active:scale-[0.985]"
          >
            Request access
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </a>
        </div>

        <p
          ref={qualifier.ref}
          data-in-view={qualifier.inView}
          className="scroll-reveal mt-6 font-mono text-[11px] tracking-[0.14em] text-[oklch(1_0_0/0.5)]"
        >
          FOR REGULATED TEAMS DEPLOYING IN THEIR OWN CLOUD
        </p>
      </div>
    </section>
  )
}
