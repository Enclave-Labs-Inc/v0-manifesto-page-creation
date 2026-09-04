'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

export default function LandingHero() {
  const imgRef = useRef<HTMLDivElement>(null)

  // Parallax: as the user scrolls the hero out of view, translate the image
  // upward at a slower rate than the section itself. Runs inside rAF so it
  // stays smooth. Disabled when prefers-reduced-motion is on.
  useEffect(() => {
    const node = imgRef.current
    if (!node) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ticking = false
    const update = () => {
      const y = window.scrollY
      // Image lags behind foreground scroll at 25% speed — reads as depth.
      // Translation is capped to the container's top buffer so we never
      // reveal the section's cream ground at the top of the image.
      const offset = Math.min(y * 0.25, window.innerHeight * 0.25)
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
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[oklch(0.965_0_0)] text-[#050608]">
      {/* Parallax layer — the image extends above the section so a
          downward translate3d never exposes cream at the top edge. */}
      <div
        ref={imgRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-[25vh] bottom-0 will-change-transform"
      >
        <Image
          src="/landing-hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] md:object-[65%_center]"
        />
      </div>

      {/* Gentle cream wash — enough to soften the image behind the eyebrow
          and CTA without hiding the mountain. Text legibility across the
          full headline width is carried by the cream halo on the h1. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.965_0_0/0.82)_0%,oklch(0.965_0_0/0.45)_50%,oklch(0.965_0_0/0.1)_80%,transparent_100%)] md:bg-[linear-gradient(95deg,oklch(0.965_0_0/0.75)_0%,oklch(0.965_0_0/0.45)_25%,oklch(0.965_0_0/0.15)_50%,transparent_75%)]"
      />

      {/* Bottom vignette that fades into the dark infrastructure rail below. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[32vh] bg-[linear-gradient(180deg,transparent_0%,oklch(0.14_0.006_240/0.35)_50%,oklch(0.095_0_0)_100%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 pt-[110px] pb-16 sm:px-10 sm:pt-[140px] sm:pb-24 lg:px-14">
        <div>
          <div className="landing-reveal landing-reveal-eyebrow inline-flex items-center gap-2.5 rounded-full border border-[oklch(0.86_0_0/0.9)] bg-[oklch(1_0_0/0.65)] py-1.5 pl-1.5 pr-3.5 backdrop-blur-md sm:gap-3 sm:pr-4">
            <div className="flex -space-x-1.5">
              {['#1F2937', '#4B5563', '#6B7280'].map((bg, i) => (
                <span
                  key={i}
                  aria-hidden
                  className="h-4 w-4 rounded-full ring-2 ring-[oklch(0.98_0_0)] sm:h-5 sm:w-5"
                  style={{ backgroundColor: bg }}
                />
              ))}
            </div>
            <p className="text-[11px] font-medium tracking-[-0.01em] text-[#17191D] sm:text-[12px]">
              3 organisations on the waitlist
            </p>
          </div>

          <h1
            className="landing-reveal landing-reveal-title font-display mt-6 text-[clamp(2.2rem,6vw,5.4rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[#050608]"
            style={{
              textShadow:
                '0 2px 32px oklch(0.965 0 0 / 0.9), 0 0 16px oklch(0.965 0 0 / 0.8), 0 0 4px oklch(0.965 0 0 / 0.6)',
            }}
          >
            <span className="block">Sovereign AI</span>
            <span className="block text-[#1F2226] md:whitespace-nowrap">for regulated companies</span>
          </h1>

          <p
            className="landing-reveal landing-reveal-body mt-6 text-[14px] leading-[1.6] tracking-[-0.005em] text-[#0F1114] sm:mt-7 sm:text-[15px] md:whitespace-nowrap"
            style={{
              textShadow:
                '0 1px 20px oklch(0.965 0 0 / 0.95), 0 0 8px oklch(0.965 0 0 / 0.8)',
            }}
          >
            Give your organisation AI superpowers without compromising your privacy.
          </p>

          <div className="landing-reveal landing-reveal-actions mt-8 sm:mt-10">
            <a
              href="https://cal.com/shashank-bhardwaj-fwmii1/30min"
              className="group inline-flex h-[48px] items-center gap-2.5 rounded-[6px] bg-[#050608] px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[oklch(0.985_0_0)] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#17191D] active:scale-[0.985] sm:h-[46px]"
            >
              Request access
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
