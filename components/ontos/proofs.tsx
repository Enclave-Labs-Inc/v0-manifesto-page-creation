'use client'

import { useState } from 'react'
import { Lock } from 'lucide-react'
import { Eyebrow } from '@/components/landing/eyebrow'
import { ENTITY } from './entity'
import { useReveal } from './use-reveal'

// ---- Time: facts with validity windows, read as of a chosen date ----

const START = Date.UTC(2021, 0, 1)
const END = Date.UTC(2025, 11, 31)
const pct = (t: number) => ((t - START) / (END - START)) * 100

type TFact = { s: string; p: string; o: string; from: number; to?: number; src: string }

const tFacts: TFact[] = [
  { s: 'Diane Xu', p: 'CFO_OF', o: 'Meridian', from: Date.UTC(2021, 0, 1), to: Date.UTC(2025, 1, 15), src: 'mbg-10k-fy2024' },
  { s: 'Priya Krishnan', p: 'MEMBER_OF', o: 'Audit Committee', from: Date.UTC(2021, 0, 1), to: Date.UTC(2025, 1, 16), src: 'mbg-10k-fy2024' },
  { s: 'Priya Krishnan', p: 'CFO_OF', o: 'Meridian', from: Date.UTC(2025, 1, 16), src: 'mbg-8k-2025q1' },
  { s: 'Diane Xu', p: 'ADVISOR_TO', o: 'Meridian', from: Date.UTC(2025, 1, 16), to: Date.UTC(2025, 4, 31), src: 'mbg-8k-2025q1' },
]

const stops = [
  { label: '2023-06-30', t: Date.UTC(2023, 5, 30) },
  { label: '2025-02-01', t: Date.UTC(2025, 1, 1) },
  { label: '2025-03-01', t: Date.UTC(2025, 2, 1) },
  { label: '2025-09-30', t: Date.UTC(2025, 8, 30) },
]

const live = (f: TFact, t: number) => f.from <= t && (f.to === undefined || t <= f.to)

function TimePanel() {
  const [i, setI] = useState(2)
  const t = stops[i].t

  return (
    <div className="flex flex-col">
      <p className="font-mono text-[12px] text-[#9499A6]">
        traverse(<span className="text-[#E8E9EC]">meridian</span>, depth=1, as_of=
        <span className="text-[#E8E9EC]">{stops[i].label}</span>)
      </p>

      <div className="relative mt-6 space-y-4">
        {tFacts.map((f) => {
          const on = live(f, t)
          return (
            <div key={`${f.s}${f.p}`} className="transition-opacity duration-300" style={{ opacity: on ? 1 : 0.35 }}>
              <div className="flex items-baseline justify-between gap-4 text-[13px]">
                <span className={on ? 'text-[#F4F5F7]' : 'text-[#787D8A] line-through decoration-[#5E636F]'}>
                  {f.s} <span className="font-mono text-[11px] text-[#9499A6]">{f.p}</span> {f.o}
                </span>
                <span className="shrink-0 font-mono text-[10px] text-[#5E636F]">{f.src}</span>
              </div>
              <div className="relative mt-2 h-[3px] rounded-full bg-[#1A1C20]">
                <span
                  className="absolute inset-y-0 rounded-full"
                  style={{
                    left: `${pct(f.from)}%`,
                    width: `${pct(f.to ?? END) - pct(f.from)}%`,
                    background: on ? '#7FA8F0' : '#5E636F',
                  }}
                />
              </div>
            </div>
          )
        })}
        {/* as_of cursor */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-y-2 w-px bg-[#E8E9EC]/40 transition-[left] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ left: `${pct(t)}%` }}
        />
      </div>

      <div className="mt-3 flex justify-between font-mono text-[10px] text-[#5E636F]">
        <span>2021</span>
        <span>2025</span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2" role="radiogroup" aria-label="as_of date">
        {stops.map((s, j) => (
          <button
            key={s.label}
            type="button"
            role="radio"
            aria-checked={i === j}
            onClick={() => setI(j)}
            className={`rounded-full border px-3 py-1.5 font-mono text-[11px] transition-colors duration-200 ${
              i === j ? 'border-[#E8E9EC] bg-[#E8E9EC] text-[#050608]' : 'border-[#2A2D34] text-[#9499A6] hover:border-[#5E636F]'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ---- Permissions: the same traversal for two callers ----

const callers = [
  { id: 'agent:analyst', label: 'Analyst agent' },
  { id: 'user:board-secretary', label: 'Board secretary' },
] as const

const pFacts = [
  { s: 'Meridian', p: 'HAS_COMMITTEE', o: 'Nominating & Governance', restricted: false },
  { s: 'Nominating & Governance', p: 'LEADS', o: 'Permanent CFO search', restricted: false },
  { s: 'Permanent CFO search', p: 'SHORTLISTS', o: 'Candidate A', restricted: true },
  { s: 'Permanent CFO search', p: 'ENGAGES', o: 'Executive-search firm', restricted: false },
  { s: 'Candidate A', p: 'MENTIONED_IN', o: 'Board minutes · Mar 2025', restricted: true },
]

function PermissionPanel() {
  const [who, setWho] = useState<(typeof callers)[number]['id']>('agent:analyst')
  const privileged = who === 'user:board-secretary'
  const rows = pFacts.filter((f) => privileged || !f.restricted)

  return (
    <div className="flex flex-col">
      <p className="font-mono text-[12px] text-[#9499A6]">
        traverse(<span className="text-[#E8E9EC]">meridian</span>, depth=3, on_behalf_of=
        <span className="text-[#E8E9EC]">{who}</span>)
      </p>

      <ul key={who} className="ontos-swap mt-6 divide-y divide-[#1A1C20] border-y border-[#1A1C20]">
        {rows.map((f) => (
          <li key={f.o} className="flex items-center justify-between gap-4 py-3 text-[13px]">
            <span className="text-[#F4F5F7]">
              {f.s} <span className="font-mono text-[11px] text-[#9499A6]">{f.p}</span> {f.o}
            </span>
            {f.restricted && <Lock className="h-3.5 w-3.5 shrink-0" style={{ color: ENTITY.Committee }} aria-label="restricted" />}
          </li>
        ))}
      </ul>
      <p className="mt-4 font-mono text-[11px] text-[#5E636F]">
        {rows.length} facts returned{privileged ? ' · 2 restricted, visible to this caller' : ''}
      </p>

      <div className="mt-8 flex flex-wrap gap-2" role="radiogroup" aria-label="Caller">
        {callers.map((c) => (
          <button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={who === c.id}
            onClick={() => setWho(c.id)}
            className={`rounded-full border px-3 py-1.5 text-[12px] transition-colors duration-200 ${
              who === c.id ? 'border-[#E8E9EC] bg-[#E8E9EC] text-[#050608]' : 'border-[#2A2D34] text-[#9499A6] hover:border-[#5E636F]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Proofs() {
  const head = useReveal<HTMLDivElement>()
  const grid = useReveal<HTMLDivElement>(0.1)

  return (
    <section className="relative overflow-hidden bg-[#0A0B0D] text-[#F4F5F7]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 50% 45% at 85% 10%, oklch(0.45 0.15 265 / 0.35) 0%, transparent 70%), radial-gradient(ellipse 45% 40% at 5% 95%, oklch(0.5 0.12 340 / 0.18) 0%, transparent 70%)',
        }}
      />
      <div className="relative mx-auto max-w-[1440px] px-5 py-[clamp(4.5rem,9vw,8rem)] sm:px-10 lg:px-14">
        <div ref={head.ref} data-in-view={head.inView} className="scroll-reveal max-w-[900px]">
          <Eyebrow tone="dark" bulletColor={ENTITY.Regulator}>Guarantees</Eyebrow>
          <h2 className="font-display mt-6 text-[clamp(1.8rem,3.4vw,3.2rem)] font-normal leading-[1.06] tracking-[-0.025em]">
            The graph remembers what was true,
            <span className="block text-[#787D8A]">and who is allowed to know it.</span>
          </h2>
        </div>

        <div ref={grid.ref} data-in-view={grid.inView} className="scroll-reveal mt-14 grid border-t border-[#1A1C20] lg:grid-cols-2">
          <article className="py-10 lg:border-r lg:border-[#1A1C20] lg:pr-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#787D8A]">Bitemporal · as_of</p>
            <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.02em]">Ask the graph about any date.</h3>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.65] text-[#B4B8C2]">
              When the 8-K names a new CFO, the old fact isn’t overwritten. Its validity window closes,
              so a regulator’s question about last quarter gets last quarter’s answer.
            </p>
            <div className="mt-10">
              <TimePanel />
            </div>
          </article>

          <article className="border-t border-[#1A1C20] py-10 lg:border-t-0 lg:pl-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#787D8A]">Permission-aware traversal</p>
            <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.02em]">Hidden nodes stay hidden.</h3>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.65] text-[#B4B8C2]">
              Access is checked at each hop while the executor walks the graph. Paths through a node the
              caller can’t see are pruned before results exist, so nothing hints that the node is there.
            </p>
            <div className="mt-10">
              <PermissionPanel />
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
