'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

export default function LandingHero() {
  const imgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = imgRef.current
    if (!node) return
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ticking = false
    const update = () => {
      const y = window.scrollY
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
      {/* Parallax photo — full-bleed background. */}
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
          className="object-cover object-[70%_center] md:object-[60%_center]"
        />
      </div>

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

      {/* Bottom vignette into the dark infrastructure rail below. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[32vh] bg-[linear-gradient(180deg,transparent_0%,oklch(0.14_0.006_240/0.35)_50%,oklch(0.095_0_0)_100%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 pt-[110px] pb-16 sm:px-10 sm:pt-[140px] sm:pb-24 lg:px-14">
        <div>
          {/* Text block — headline overflows the inner column intentionally
              on md+ so the tagline sits on one line. */}
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

          <h1 className="landing-reveal landing-reveal-title font-display mt-6 text-[clamp(2rem,4.8vw,4.2rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[#050608]">
            <span className="block">Sovereign AI</span>
            <span className="block text-[#2A2D33] md:whitespace-nowrap">for regulated companies</span>
          </h1>

          <p className="landing-reveal landing-reveal-body mt-6 max-w-[54ch] text-[14px] leading-[1.6] tracking-[-0.005em] text-[#17191D] sm:mt-7 sm:text-[15px]">
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
