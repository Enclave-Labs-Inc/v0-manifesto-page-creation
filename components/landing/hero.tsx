'use client'

import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function LandingHero() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = parallaxRef.current
    if (!node) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReducedMotion) return

    let rafId = 0
    const update = () => {
      rafId = 0
      node.style.transform = `translate3d(0, ${window.scrollY * 0.4}px, 0)`
    }
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

return (
    <section className="relative flex min-h-screen flex-col overflow-hidden text-[#050608]">
      {/* Parallax mountain layer — moves at 0.4x the scroll speed so it reads
          as a background plane. Expanded vertically so no seam appears at the
          hero's top or bottom edges when the layer translates. */}
      <div
        ref={parallaxRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-[20%] h-[140%] bg-cover bg-center will-change-transform"
        style={{ backgroundImage: "url('/landing-hero-bg.jpg')" }}
      />
{/* Radial mesh — three layered ellipses that produce an organic
          morning-mist wash on the left where the text sits. Density is
          strongest around the headline and releases cleanly across the
          right so the mountain remains fully visible. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_110%_150%_at_-5%_50%,oklch(0.965_0_0/0.97)_0%,oklch(0.965_0_0/0.85)_28%,oklch(0.965_0_0/0.55)_50%,oklch(0.965_0_0/0.2)_72%,transparent_90%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_95%_at_25%_50%,oklch(1_0_0/0.32)_0%,transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_105%_at_110%_45%,oklch(0.92_0.02_75/0.14)_0%,transparent_58%)] mix-blend-multiply"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 pt-[110px] pb-16 sm:px-10 sm:pt-[140px] sm:pb-24 lg:px-14">
        <div>
          {/* Text block — headline overflows the inner column intentionally
              on md+ so the tagline sits on one line. */}
          <h1 className="landing-reveal landing-reveal-title font-display mt-6 max-w-[1100px] text-[clamp(2rem,4.8vw,4.2rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[#050608]">
            <span className="block">Private Knowledge Layer</span>
            <span className="block text-[#2A2D33] md:whitespace-nowrap">
              for the Enterprise.
            </span>
          </h1>

          <p className="landing-reveal landing-reveal-body mt-8 max-w-[760px] text-[18px] font-normal leading-[1.4] tracking-[-0.015em] text-[#0A0C10] sm:mt-10 sm:text-[22px]">
            The answer engine for your company.
          </p>

          <p className="landing-reveal landing-reveal-body mt-3 max-w-[760px] text-[14px] leading-[1.55] tracking-[-0.005em] text-[#4A4E57] sm:mt-4 sm:text-[16px]">
            <span className="sm:whitespace-nowrap">Grounded in every system your team already uses, and bound by every permission they already have.</span>
          </p>

          <div className="landing-reveal landing-reveal-actions mt-8 sm:mt-10">
            <a
              href="https://cal.com/shashank-bhardwaj-fwmii1/30min"
              className="group inline-flex h-[48px] items-center gap-2.5 rounded-[6px] bg-[#050608] px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[oklch(0.985_0_0)] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#17191D] active:scale-[0.985] sm:h-[46px]"
            >
              Talk to us
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
