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
  const auroraRef = useRef<HTMLDivElement>(null)

  // Parallax: slowly drift the aurora mesh in the opposite direction of
  // scroll so it feels alive as the section moves through the viewport.
  // Disabled when prefers-reduced-motion is on.
  useEffect(() => {
    const section = sectionRef.current
    const node = auroraRef.current
    if (!section || !node) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ticking = false
    const update = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = Math.max(
        0,
        Math.min(1, 1 - (rect.top + rect.height * 0.2) / (vh + rect.height * 0.2)),
      )
      const offset = progress * (vh * 0.18)
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
      className="relative w-full overflow-hidden bg-[oklch(0.09_0.008_60)] text-[#F4F5F7]"
    >
      {/* Ghosted mountain silhouette — same color-thread trick used on the
          releases and manifesto sections. Very low opacity so it reads as
          texture, not a photograph, keeping the section abstract while
          tying it to the hero's world. */}
      <div
        ref={auroraRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-[25vh] bottom-0 will-change-transform"
      >
        <Image
          src="/landing-hero-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          priority={false}
          className="object-cover object-[50%_35%] opacity-[0.12] [filter:grayscale(1)_brightness(0.8)_contrast(1.1)]"
        />
      </div>

      {/* Warm aurora mesh — three layered radial pools in amber and cream
          tones matching the hero's morning-mist palette. These are what
          give the section its atmosphere without a literal photo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_15%_20%,oklch(0.38_0.055_65/0.5)_0%,transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_75%_at_85%_30%,oklch(0.32_0.04_50/0.5)_0%,transparent_58%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_95%_55%_at_50%_100%,oklch(0.24_0.035_60/0.6)_0%,transparent_65%)]"
      />

      {/* Grain — texture over the smooth gradients so it doesn't feel flat. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Vignette — pulls the eye to center and darkens edges. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_50%,transparent_0%,transparent_45%,oklch(0.06_0.006_60/0.6)_100%)]"
      />

      {/* Warm halo under the headline — echoes the cream mist from the hero. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,oklch(0.98_0.02_75/0.13)_0%,transparent_45%)]"
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
