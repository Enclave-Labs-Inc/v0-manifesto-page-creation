'use client'

import { ArrowRight } from 'lucide-react'
import GraphCanvas from './graph-canvas'
import { AURORA } from './entity'
import { WAITLIST_URL } from './links'

export default function OntosHero() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.975_0.004_265)] text-[#050608]">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-80" style={{ backgroundImage: AURORA }} />

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-16 px-5 pt-[140px] pb-[clamp(5rem,10vw,9rem)] sm:px-10 sm:pt-[170px] lg:grid-cols-[1fr_1fr] lg:gap-12 lg:px-14">
        <div>
          <p className="landing-reveal landing-reveal-eyebrow text-[13px] text-[#50545B]">Private alpha</p>

          <h1 className="landing-reveal landing-reveal-title font-display mt-5 text-[clamp(2.4rem,4.4vw,4rem)] font-normal leading-[1.02] tracking-[-0.03em]">
            Give it your data.
            <span className="block text-[#6A6D72]">It finds the connections.</span>
          </h1>

          <p className="landing-reveal landing-reveal-body mt-7 max-w-[44ch] text-[17px] leading-[1.6] text-[#3A3D45]">
            A hosted knowledge graph for your apps and agents, with the source behind every answer.
          </p>

          <div className="landing-reveal landing-reveal-actions mt-10 flex flex-wrap items-center gap-6">
            <a
              href={WAITLIST_URL}
              className="group inline-flex h-[48px] items-center gap-2.5 rounded-[6px] bg-[#050608] px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[oklch(0.985_0_0)] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#17191D] active:scale-[0.985]"
            >
              Join the waitlist
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
            </a>
            <a href="#connections" className="text-[14px] text-[#3A3D45] underline decoration-[#C9CCD3] underline-offset-4 hover:text-[#050608] hover:decoration-[#050608]">
              See how it works
            </a>
          </div>
        </div>

        {/* The graph sits directly on the wash: no window chrome, no legend. */}
        <div className="landing-reveal landing-reveal-body relative hidden aspect-[7/5] w-full sm:block">
          <GraphCanvas />
        </div>
      </div>
    </section>
  )
}
