'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

const CAL_URL = 'https://cal.com/shashank-bhardwaj-fwmii1/30min'

export default function DemoContent() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

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
    <section className="relative mx-auto max-w-[1320px] px-6 pb-[clamp(5rem,9vw,8rem)] pt-[clamp(6rem,11vw,9rem)] sm:px-10 lg:px-14">
      {/* Eyebrow */}
      <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#5E636F]">
        Product demo
      </p>

      {/* Headline */}
      <h1 className="mt-6 max-w-[22ch] text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[1.03] tracking-[-0.05em] text-[#050608]">
        Enclave in action.
        <br />
        <span className="text-[#7F848F]">Inside your AWS account.</span>
      </h1>

      {/* Description */}
      <p className="mt-6 max-w-[56ch] text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.6] tracking-[-0.015em] text-[#50545B]">
        Watch sovereign AI search running end-to-end — employees asking
        natural-language questions against internal knowledge, with every byte
        staying inside the customer&rsquo;s VPC. No data leaves the perimeter.
      </p>

      {/* Video */}
      <div className="relative mt-12 overflow-hidden rounded-2xl border border-[#E0E3E8] bg-[#07080A] shadow-[0_32px_80px_oklch(0.18_0.008_145/0.14)]">
        <video
          ref={videoRef}
          src="/demo.mp4"
          className="w-full"
          playsInline
          controls={playing}
          onClick={handleVideoClick}
          onEnded={() => setPlaying(false)}
        />

        {/* Play overlay — hidden once playing */}
        {!playing && (
          <button
            onClick={handleOverlayClick}
            aria-label="Play demo"
            className="absolute inset-0 flex items-center justify-center bg-[#07080A]/40 transition-opacity duration-200 hover:bg-[#07080A]/30"
          >
            <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white/95 shadow-[0_8px_32px_oklch(0_0_0/0.28)] transition-transform duration-200 hover:scale-105 active:scale-95">
              <Play className="ml-1 h-7 w-7 text-[#050608]" fill="currentColor" strokeWidth={0} />
            </span>
          </button>
        )}
      </div>

      {/* CTA row */}
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <a
          href={CAL_URL}
          className="group inline-flex h-[48px] items-center gap-2.5 rounded-[10px] bg-[#050608] px-7 text-[13.5px] font-bold tracking-[-0.02em] text-[oklch(0.985_0.002_145)] shadow-[0_16px_40px_oklch(0.12_0.006_145/0.28)] transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#17191D] active:scale-[0.985]"
        >
          Book a design-partner call
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </a>
        <Link
          href="/manifesto"
          className="inline-flex h-[48px] items-center rounded-[10px] border border-[oklch(0.86_0.006_145/0.82)] bg-[oklch(0.99_0.002_145/0.76)] px-7 text-[13.5px] font-bold tracking-[-0.02em] text-[#111214] transition-[background-color,border-color] duration-200 hover:bg-white"
        >
          Read the manifesto
        </Link>
      </div>
    </section>
  )
}
