'use client'

import { ArrowUpRight } from 'lucide-react'
import { Eyebrow } from '@/components/landing/eyebrow'
import { ENTITY } from './entity'
import { useReveal } from './use-reveal'

export const GITHUB_URL = 'https://github.com/Enclave-Labs-Inc/Ontos'

const rows = [
  { k: 'Setup', v: 'None. No graph database, models or parsers to run.' },
  { k: 'Data', v: 'Text, Markdown and PDF, scanned pages included' },
  { k: 'Ontologies', v: 'Starter, fintech and pharma templates to begin from' },
  { k: 'Interfaces', v: 'REST, MCP, and a dashboard with graph explorer, playground and audit log' },
  { k: 'Operations', v: 'Backups, monitoring and upgrades handled for you' },
]

export default function Deployment() {
  const head = useReveal<HTMLDivElement>()
  const table = useReveal<HTMLDListElement>(0.1)

  return (
    <section className="bg-white text-[#050608]">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-[clamp(4.5rem,9vw,8rem)] sm:px-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-14">
        <div ref={head.ref} data-in-view={head.inView} className="scroll-reveal">
          <Eyebrow bulletColor={ENTITY.Filing}>Fully managed</Eyebrow>
          <h2 className="font-display mt-6 text-[clamp(1.8rem,3.4vw,3.2rem)] font-normal leading-[1.06] tracking-[-0.025em]">
            You bring the data.
            <span className="block text-[#6A6D72]">We run everything else.</span>
          </h2>
          <p className="mt-6 max-w-[48ch] text-[15px] leading-[1.7] text-[#55585D]">
            Retrieval tells you what a document says. A knowledge graph tells you how things connect: who
            owns what, what depends on what, and what was true on a given date. We host it, so your team
            only works with the answers.
          </p>
        </div>

        <div>
          <dl ref={table.ref} data-in-view={table.inView} className="border-t border-[#CFCFCA]">
            {rows.map((r, i) => (
              <div
                key={r.k}
                className="stagger-pop grid grid-cols-[120px_1fr] gap-6 border-b border-[#CFCFCA] py-5 sm:grid-cols-[160px_1fr]"
                style={{ ['--stagger-delay' as string]: `${i * 60}ms` }}
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6A6D72]">{r.k}</dt>
                <dd className="text-[15px] leading-[1.5]">{r.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[13px] leading-[1.6] text-[#6A6D72]">
            The engine underneath is open, so anyone can read the code behind the provenance and audit
            guarantees.{' '}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-[#050608] underline decoration-[#CFCFCA] underline-offset-[3px] hover:decoration-[#050608]"
            >
              Read the code
              <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
