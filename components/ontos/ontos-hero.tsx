'use client'

import { ArrowDown, ArrowRight } from 'lucide-react'
import GraphCanvas, { GraphLegend } from './graph-canvas'
import { AURORA, ENTITY } from './entity'
import { WAITLIST_URL } from './links'

const highlights = [
  { k: 'Connections', v: 'Links people, companies and systems across every source', c: ENTITY.Company },
  { k: 'Provenance', v: 'The document and line behind every relationship', c: ENTITY.Filing },
  { k: 'Time', v: 'Ask what was true on any date; nothing is overwritten', c: ENTITY.Person },
  { k: 'Audit', v: 'An EU AI Act Article 12 record for every query', c: ENTITY.Model },
]

export default function OntosHero() {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.975_0.004_265)] text-[#050608]">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: AURORA }} />
      {/* Fine grid, fading toward the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(oklch(0.2_0_0/0.05)_1px,transparent_1px),linear-gradient(90deg,oklch(0.2_0_0/0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]"
      />

      <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 pt-[120px] pb-14 sm:px-10 sm:pt-[150px] lg:grid-cols-[1fr_1.1fr] lg:gap-10 lg:px-14 lg:pb-20">
        <div className="flex flex-col justify-center">
          <p className="landing-reveal landing-reveal-eyebrow inline-flex w-fit items-center gap-2.5 rounded-full border border-[oklch(0.86_0_0/0.9)] bg-[oklch(1_0_0/0.65)] px-3.5 py-1.5 text-[11px] font-medium text-[#2A2D33] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="ontos-ping absolute inline-flex h-full w-full rounded-full" style={{ background: ENTITY.Filing }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: ENTITY.Filing }} />
            </span>
            Knowledge graph platform · Private alpha
          </p>

          <h1 className="landing-reveal landing-reveal-title font-display mt-7 text-[clamp(2.2rem,3.5vw,3.6rem)] font-normal leading-[1.02] tracking-[-0.025em]">
            <span className="block">Give it your data.</span>
            <span className="block text-[#6A6D72]">It finds the connections.</span>
          </h1>

          <p className="landing-reveal landing-reveal-body mt-7 max-w-[54ch] text-[16px] leading-[1.6] text-[#3A3D45] sm:text-[17px]">
            Upload filings, contracts, policies or records. The platform finds the people, companies and
            systems in them, links them across every source, and serves the graph to your apps and agents
            with the source behind every link.
          </p>

          <div className="landing-reveal landing-reveal-actions mt-9 flex flex-wrap items-center gap-5">
            <a
              href={WAITLIST_URL}
              className="group inline-flex h-[48px] items-center gap-2.5 rounded-[6px] bg-[#050608] px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[oklch(0.985_0_0)] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#17191D] active:scale-[0.985]"
            >
              Join the waitlist
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
            </a>
            <a
              href="#connections"
              className="group inline-flex items-center gap-2 text-[13px] font-medium text-[#2A2D33] hover:text-[#050608]"
            >
              See how it connects
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5" strokeWidth={2} />
            </a>
          </div>
        </div>

        {/* Product card: the live graph */}
        <div className="landing-reveal landing-reveal-body relative">
          <div className="overflow-hidden rounded-[14px] border border-[oklch(0.88_0_0/0.9)] bg-[#FAFAF8]/85 shadow-[0_40px_100px_-40px_oklch(0.35_0.08_265/0.45)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-[#E6E6E1] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E0E0DB]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E0E0DB]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E0E0DB]" />
                <span className="ml-3 font-mono text-[11px] text-[#9499A6]">graph · fintech · 5 sources</span>
              </div>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-[#9499A6] sm:inline">live</span>
            </div>
            <div className="aspect-[7/5] w-full px-2">
              <GraphCanvas />
            </div>
            <div className="border-t border-[#E6E6E1] px-4 py-3">
              <GraphLegend />
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-[oklch(0.2_0_0/0.08)] bg-[oklch(1_0_0/0.45)] backdrop-blur-sm">
        <dl className="mx-auto grid max-w-[1440px] grid-cols-1 px-5 sm:grid-cols-2 sm:px-10 lg:grid-cols-4 lg:px-14">
          {highlights.map((s, i) => (
            <div
              key={s.k}
              className={`border-[oklch(0.2_0_0/0.08)] py-6 sm:pr-6 ${i > 0 ? 'border-t sm:border-t-0' : ''} ${
                i % 2 === 1 ? 'sm:border-l sm:pl-6' : ''
              } ${i >= 2 ? 'sm:border-t lg:border-t-0' : ''} ${i === 2 ? 'lg:border-l lg:pl-6' : ''}`}
            >
              <dt className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#50545B]">
                <span className="h-1.5 w-4 rounded-full" style={{ background: s.c }} />
                {s.k}
              </dt>
              <dd className="mt-3 text-[14px] leading-[1.5] text-[#2A2D33]">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
