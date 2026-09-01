'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Play } from 'lucide-react'
import type { CSSProperties } from 'react'

const CAL_URL = 'https://cal.com/shashank-bhardwaj-fwmii1/30min'

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

export default function DemoContent() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const chip = useReveal<HTMLDivElement>()
  const headline = useReveal<HTMLHeadingElement>()
  const body = useReveal<HTMLParagraphElement>()
  const video = useReveal<HTMLDivElement>()
  const cta = useReveal<HTMLDivElement>()

  function handleOverlayClick() {
    const v = videoRef.current
    if (!v) return
    v.play()
    setPlaying(true)
  }

  function handleVideoClick() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <section className="relative overflow-hidden bg-[oklch(0.965_0_0)] text-[#050608]">
      {/* Ghosted mountain — color thread with the rest of the site */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <Image
          src="/landing-hero-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,oklch(0.86_0.02_240/0.3)_0%,transparent_55%),radial-gradient(ellipse_at_0%_100%,oklch(0.99_0_0/0.85)_0%,transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,oklch(0.965_0_0/0.72)_0%,oklch(0.965_0_0/0.86)_100%)]"
      />

      <div className="relative z-[1] mx-auto max-w-[1440px] px-5 pt-[clamp(6rem,11vw,9rem)] pb-[clamp(5rem,9vw,8rem)] sm:px-10 lg:px-14">
        {/* Header block — LEFT-aligned, echoes the landing rhythm */}
        <div className="flex flex-col items-start text-left">
          <div
            ref={chip.ref}
            data-in-view={chip.inView}
            className="scroll-reveal inline-flex items-center gap-2.5 rounded-full border border-[oklch(0.86_0_0/0.9)] bg-[oklch(1_0_0/0.65)] px-3.5 py-1.5 backdrop-blur-md"
          >
            <span className="font-mono text-[11px] tracking-[0.14em] text-[#5E636F]">01</span>
            <span className="h-[10px] w-px bg-[#C7CCD4]" aria-hidden />
            <span className="font-mono text-[11px] tracking-[0.14em] text-[#2E3238]">PRODUCT DEMO</span>
          </div>

          <h1
            ref={headline.ref}
            data-in-view={headline.inView}
            className="font-display mt-6 max-w-[22ch] text-[clamp(2.2rem,5vw,4.2rem)] font-normal leading-[1.02] tracking-[-0.025em] text-[#050608]"
          >
            <span className="md:whitespace-nowrap">Enclave in action.</span>
            <br />
            <span className="text-[#7F848F]">Inside your AWS account.</span>
          </h1>

          <p
            ref={body.ref}
            data-in-view={body.inView}
            className="scroll-reveal mt-6 max-w-[58ch] text-[15px] leading-[1.6] tracking-[-0.005em] text-[#50545B]"
          >
            Watch sovereign AI search running end-to-end. Employees ask natural-language questions
            against internal knowledge and every byte stays inside the customer&rsquo;s VPC. No data leaves
            the perimeter.
          </p>
        </div>

        {/* Video — full-bleed rounded, hairline border, no big drop-shadow */}
        <div
          ref={video.ref}
          data-in-view={video.inView}
          className="scroll-reveal relative mt-14 overflow-hidden rounded-[14px] border border-[#E0E3E8] bg-[#050608]"
        >
          <video
            ref={videoRef}
            src="/demo-1.mp4"
            className="w-full"
            playsInline
            controls={playing}
            onClick={handleVideoClick}
            onEnded={() => setPlaying(false)}
          />

          {!playing && (
            <button
              onClick={handleOverlayClick}
              aria-label="Play demo"
              className="absolute inset-0 flex items-center justify-center bg-[#050608]/35 transition-[background-color] duration-200 hover:bg-[#050608]/25"
            >
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white/95 transition-transform duration-200 hover:scale-105 active:scale-95">
                <Play className="ml-1 h-7 w-7 text-[#050608]" fill="currentColor" strokeWidth={0} />
              </span>
            </button>
          )}
        </div>

        {/* CTA row — dark pill matches the landing */}
        <div
          ref={cta.ref}
          data-in-view={cta.inView}
          className="scroll-reveal mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href={CAL_URL}
            className="group inline-flex h-[46px] items-center gap-2.5 rounded-[6px] bg-[#050608] px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[oklch(0.985_0_0)] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#17191D] active:scale-[0.985]"
          >
            Request access
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </a>
          <a
            href="/manifesto"
            className="group inline-flex h-[46px] items-center gap-2 rounded-[6px] border border-[#050608] px-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#050608] transition-[background-color,color] duration-200 hover:bg-[#050608] hover:text-[oklch(0.985_0_0)]"
          >
            Read the manifesto
          </a>
        </div>
      </div>
    </section>
  )
}
