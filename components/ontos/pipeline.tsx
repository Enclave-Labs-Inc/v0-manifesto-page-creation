'use client'

import { Eyebrow } from '@/components/landing/eyebrow'
import { ENTITY } from './entity'
import { useReveal } from './use-reveal'

const steps = [
  {
    n: '01',
    title: 'Extract',
    body: 'A model reads each document against your ontology and pulls out typed entities and relationships. Nothing outside the schema gets in.',
    artifact: ['Person   "Priya Krishnan"', 'Company  "Meridian Bank Group"', 'CFO_OF   interim'],
  },
  {
    n: '02',
    title: 'Connect',
    body: 'Mentions resolve to the same entity across sources, so relationships link up. Facts are immutable: a contradiction closes the old one instead of overwriting it.',
    artifact: ['source_id   mbg-8k-2025q1', 'confidence  0.94', 't_valid     2025-02-16'],
  },
  {
    n: '03',
    title: 'Serve',
    body: 'A planner turns questions into typed plans; a deterministic executor runs the multi-hop retrieval and prunes what the caller can’t see.',
    artifact: ['plan  traverse(mbg, CFO_OF)', 'hops  1 · authz checked per hop', 'as_of 2025-03-01'],
  },
  {
    n: '04',
    title: 'Audit',
    body: 'Every query writes an Article 12 record into a hash chain: who asked, what ran, which facts came back.',
    artifact: ['query_id    q_7f3a…', 'caller      agent:analyst', 'audit_hash  9c1e…b04'],
  },
]

const stepColors = [ENTITY.Filing, ENTITY.Company, ENTITY.Model, ENTITY.Person]

export default function Pipeline() {
  const head = useReveal<HTMLDivElement>()
  const grid = useReveal<HTMLDivElement>(0.15)

  return (
    <section className="bg-[oklch(0.965_0_0)] text-[#050608]">
      <div className="mx-auto max-w-[1440px] px-5 py-[clamp(4.5rem,9vw,8rem)] sm:px-10 lg:px-14">
        <div ref={head.ref} data-in-view={head.inView} className="scroll-reveal max-w-[900px]">
          <Eyebrow bulletColor={ENTITY.Model}>How it works</Eyebrow>
          <h2 className="font-display mt-6 text-[clamp(1.8rem,3.4vw,3.2rem)] font-normal leading-[1.06] tracking-[-0.025em]">
            From documents to answers
            <span className="block text-[#6A6D72]">you can trace back to the page.</span>
          </h2>
        </div>

        <div
          ref={grid.ref}
          data-in-view={grid.inView}
          className="mt-14 grid border-t border-[#CFCFCA] sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((s, i) => (
            <article
              key={s.n}
              className={`stagger-pop flex flex-col border-b border-[#CFCFCA] py-8 sm:px-6 lg:border-b-0 ${
                i % 2 === 0 ? 'sm:pl-0' : 'sm:border-l'
              } ${i > 0 ? 'lg:border-l' : ''} ${i === 2 ? 'lg:pl-6' : ''}`}
              style={{ ['--stagger-delay' as string]: `${i * 90}ms` }}
            >
              <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-[#50545B]">
                <span className="h-[3px] w-6 rounded-full" style={{ background: stepColors[i] }} />
                {s.n}
              </p>
              <h3 className="mt-6 text-[22px] font-semibold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-[#55585D]">{s.body}</p>
              <pre className="mt-8 overflow-x-auto rounded-[6px] border border-[#E0E0DB] bg-white/70 px-4 py-3 font-mono text-[11.5px] leading-[1.8] text-[#2A2D33]">
                {s.artifact.join('\n')}
              </pre>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
