'use client'

import { useEffect, useState } from 'react'
import { FileText, GitMerge, History, Plus } from 'lucide-react'
import { ENTITY, type EntityType } from './entity'
import { useReveal } from './use-reveal'

type Span = string | { t: string; type: EntityType }

type Source = { id: string; title: string; kind: string; excerpt: Span[] }

// Excerpts adapted from a synthetic set of SEC filings.
const sources: Source[] = [
  {
    id: 'mbg-10k-fy2024',
    title: 'Meridian Bank Group',
    kind: '10-K · FY2024',
    excerpt: [
      { t: 'Diane Xu', type: 'Person' },
      ' — Chief Financial Officer (since 2021). ',
      { t: 'Terrence Blake', type: 'Person' },
      ' — Chief Risk Officer. Directors include ',
      { t: 'Priya Krishnan', type: 'Person' },
      ' (',
      { t: 'Audit Committee', type: 'Committee' },
      '). Independent auditor: ',
      { t: 'Blackpine LLP', type: 'Company' },
      '. Our tier-1 model, ',
      { t: 'Wholesale-Credit-PD-v3', type: 'Model' },
      ', is subject to SR 11-7 oversight by the ',
      { t: 'Federal Reserve', type: 'Regulator' },
      '.',
    ],
  },
  {
    id: 'hih-10k-fy2024',
    title: 'Halcyon Insurance Holdings',
    kind: '10-K · FY2024',
    excerpt: [
      { t: 'Halcyon Insurance Holdings', type: 'Company' },
      ' is a Bermuda-domiciled insurance and reinsurance group. Independent Registered Public Accounting Firm: ',
      { t: 'Blackpine LLP', type: 'Company' },
      ' (engaged since 2016). Our banking subsidiary is supervised by the ',
      { t: 'Federal Reserve', type: 'Regulator' },
      '.',
    ],
  },
  {
    id: 'mbg-8k-2025q1',
    title: 'Meridian Bank Group',
    kind: '8-K · Q1 2025',
    excerpt: [
      { t: 'Diane Xu', type: 'Person' },
      ', Chief Financial Officer, will depart effective February 15, 2025. The Board has appointed ',
      { t: 'Priya Krishnan', type: 'Person' },
      ' as Interim Chief Financial Officer. Ms. Krishnan will step back from the ',
      { t: 'Audit Committee', type: 'Committee' },
      ' for the duration of her service.',
    ],
  },
]

type Rel = {
  s: string
  p: string
  o: string
  added: number // source index that created it
  linked?: number // source index that connected it to an existing entity
  closed?: number // source index that ended its validity
  note?: string
}

const rels: Rel[] = [
  { s: 'Diane Xu', p: 'CFO_OF', o: 'Meridian', added: 0, closed: 2, note: 'valid until 2025-02-15' },
  { s: 'Terrence Blake', p: 'CRO_OF', o: 'Meridian', added: 0 },
  { s: 'Priya Krishnan', p: 'MEMBER_OF', o: 'Audit Committee', added: 0, closed: 2, note: 'valid until 2025-02-16' },
  { s: 'Blackpine LLP', p: 'AUDITS', o: 'Meridian', added: 0 },
  { s: 'Meridian', p: 'OPERATES', o: 'Wholesale-Credit-PD-v3', added: 0 },
  { s: 'Federal Reserve', p: 'SUPERVISES', o: 'Meridian', added: 0 },
  { s: 'Blackpine LLP', p: 'AUDITS', o: 'Halcyon', added: 1, linked: 1, note: 'same Blackpine LLP as in the Meridian 10-K' },
  { s: 'Federal Reserve', p: 'SUPERVISES', o: 'Halcyon', added: 1, linked: 1 },
  { s: 'Priya Krishnan', p: 'CFO_OF', o: 'Meridian', added: 2, linked: 2, note: 'valid from 2025-02-16' },
]

const STEP_MS = 5200

export default function Connections() {
  const [step, setStep] = useState(0)
  const [auto, setAuto] = useState(true)
  const head = useReveal<HTMLDivElement>()
  const body = useReveal<HTMLDivElement>(0.15)

  useEffect(() => {
    if (!auto || !body.inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setTimeout(() => setStep((s) => (s + 1) % sources.length), STEP_MS)
    return () => window.clearTimeout(t)
  }, [step, auto, body.inView])

  const visible = rels.filter((r) => r.added <= step)

  return (
    <section id="connections" className="relative scroll-mt-16 overflow-hidden bg-white text-[#050608]">
      <div className="mx-auto max-w-[1440px] px-5 py-[clamp(6rem,12vw,10rem)] sm:px-10 lg:px-14">
        <div ref={head.ref} data-in-view={head.inView} className="scroll-reveal max-w-[760px]">
          <h2 className="font-display text-[clamp(2rem,3.6vw,3.4rem)] font-normal leading-[1.05] tracking-[-0.025em]">
            Every new document joins the same graph.
          </h2>
          <p className="mt-6 max-w-[56ch] text-[17px] leading-[1.65] text-[#55585D]">
            Names resolve across sources, so relationships form on their own. When a newer document changes a
            fact, the old one is closed, not lost.
          </p>
        </div>

        <div ref={body.ref} data-in-view={body.inView} className="scroll-reveal mt-16 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          {/* Sources */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 lg:hidden" role="group" aria-label="Choose a document">
              {sources.map((src, i) => (
                <button
                  key={src.id}
                  type="button"
                  aria-pressed={i === step}
                  onClick={() => {
                    setAuto(false)
                    setStep(i)
                  }}
                  className={`flex-1 rounded-full px-3 py-2 text-[12px] transition-colors ${
                    i === step ? 'bg-[#050608] text-white' : 'bg-[#F0F0EC] text-[#3A3D45]'
                  }`}
                >
                  {src.kind.split(' · ')[0]} · {src.title.split(' ')[0]}
                </button>
              ))}
            </div>
            {sources.map((src, i) => {
              const active = i === step
              const read = i <= step
              return (
                <button
                  key={src.id}
                  type="button"
                  onClick={() => {
                    setAuto(false)
                    setStep(i)
                  }}
                  aria-pressed={active}
                  className={`relative overflow-hidden rounded-[12px] border p-5 text-left transition-[border-color,background-color,box-shadow] duration-300 ${
                    active ? '' : 'hidden lg:block'
                  } ${
                    active
                      ? 'border-[#D8DAE0] bg-[#FAFAF8] shadow-[0_20px_50px_-30px_oklch(0.35_0.08_265/0.45)]'
                      : 'border-[#ECECE8] bg-white hover:border-[#D8DAE0]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-[8px]"
                        style={{ background: `color-mix(in oklch, ${ENTITY.Filing} ${read ? 16 : 6}%, white)` }}
                      >
                        <FileText className="h-4 w-4" style={{ color: read ? ENTITY.Filing : '#6A6D72' }} />
                      </span>
                      <div>
                        <p className="text-[14px] font-semibold tracking-[-0.01em]">{src.title}</p>
                        <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#6A6D72]">{src.kind}</p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#6A6D72]">
                      {active ? 'Reading' : read ? 'Read' : 'Queued'}
                    </span>
                  </div>

                  {active && (
                    <p key={step} className="ontos-swap mt-4 text-[14px] leading-[1.75] text-[#3A3D45]">
                      {src.excerpt.map((part, j) =>
                        typeof part === 'string' ? (
                          <span key={j}>{part}</span>
                        ) : (
                          <mark
                            key={j}
                            className="ontos-mark rounded-[4px] px-1 py-px text-[#050608]"
                            style={{
                              background: `color-mix(in oklch, ${ENTITY[part.type]} 16%, white)`,
                              boxShadow: `inset 0 -2px 0 ${ENTITY[part.type]}`,
                              animationDelay: `${200 + j * 70}ms`,
                            }}
                            title={part.type}
                          >
                            {part.t}
                          </mark>
                        ),
                      )}
                    </p>
                  )}

                  {active && auto && (
                    <span
                      key={`bar-${step}`}
                      aria-hidden
                      className="ontos-progress absolute inset-x-0 bottom-0 h-[2px] origin-left"
                      style={{ background: ENTITY.Company, animationDuration: `${STEP_MS}ms` }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* The graph so far */}
          <div className="relative overflow-hidden rounded-[14px] bg-[oklch(0.975_0.004_265)]">
            <div className="relative p-5 sm:p-7">
              <p className="text-[13px] text-[#50545B]">The graph so far</p>

              <ul className="mt-4 divide-y divide-[oklch(0.2_0_0/0.07)]">
                {visible.map((r) => {
                  const isNew = r.added === step
                  const closed = r.closed !== undefined && r.closed <= step
                  const justClosed = r.closed === step
                  return (
                    <li
                      key={`${r.s}-${r.p}-${r.o}`}
                      className={`${isNew ? 'ontos-swap' : ''} flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3 transition-opacity duration-500 ${
                        closed ? 'opacity-55' : ''
                      }`}
                    >
                      <span className={`text-[13.5px] ${closed ? 'text-[#6A6D72] line-through decoration-[#6A6D72]' : ''}`}>
                        {r.s} <span className="font-mono text-[11px] text-[#6A6D72]">{r.p}</span> {r.o}
                      </span>
                      <span className="flex items-center gap-2">
                        {r.note && (justClosed || (isNew && r.closed === undefined)) &&<span className="text-[12px] text-[#6A6D72]">{r.note}</span>}
                        {justClosed ? (
                          <Badge icon={<History className="h-3 w-3" />} color={ENTITY.Person} label="Superseded" />
                        ) : isNew && r.linked !== undefined ? (
                          <Badge icon={<GitMerge className="h-3 w-3" />} color={ENTITY.Model} label="Linked" />
                        ) : isNew && step > 0 ? (
                          <Badge icon={<Plus className="h-3 w-3" />} color={ENTITY.Filing} label="New" />
                        ) : null}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Badge({ icon, color, label }: { icon: React.ReactNode; color: string; label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#050608]"
      style={{ background: `color-mix(in oklch, ${color} 18%, white)` }}
    >
      <span style={{ color }}>{icon}</span>
      {label}
    </span>
  )
}
