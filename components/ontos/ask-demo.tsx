'use client'

import { useState } from 'react'
import { FileText, Search, ShieldCheck } from 'lucide-react'
import { Eyebrow } from '@/components/landing/eyebrow'
import { AURORA, ENTITY } from './entity'
import { useReveal } from './use-reveal'

type Cite = { doc: string; section: string; quote: string; extractor: string; confidence: number }
type Example = {
  q: string
  answer: (string | number)[] // numbers are citation markers
  plan: string[]
  cites: Cite[]
  audit: { query_id: string; hash: string; facts: number }
}

// Answers drawn from the synthetic SEC filings that ship with Ontos.
const examples: Example[] = [
  {
    q: 'Who is Meridian’s CFO?',
    answer: [
      'Priya Krishnan, as interim CFO since 16 February 2025.',
      1,
      ' She replaced Diane Xu, who held the role from 2021 and left on 15 February 2025.',
      2,
    ],
    plan: ['resolve  "Meridian" → Company:mbg', 'traverse CFO_OF ← mbg  as_of=today', 'explain  person:krishnan'],
    cites: [
      {
        doc: 'mbg-8k-2025q1',
        section: 'Item 5.02',
        quote: 'the Board of Directors has appointed Priya Krishnan as Interim Chief Financial Officer',
        extractor: 'llm-extractor v0.5',
        confidence: 0.96,
      },
      {
        doc: 'mbg-10k-fy2024',
        section: 'Executive Officers',
        quote: 'Diane Xu — Chief Financial Officer (since 2021)',
        extractor: 'llm-extractor v0.5',
        confidence: 0.98,
      },
    ],
    audit: { query_id: 'q_7f3a21c0', hash: '9c1e…4b04', facts: 3 },
  },
  {
    q: 'Which issuers share an auditor?',
    answer: ['Meridian Bank Group and Halcyon Insurance Holdings are both audited by Blackpine LLP.', 1, 2],
    plan: ['scan     AUDITS edges', 'group    by auditor, count > 1', 'explain  org:blackpine'],
    cites: [
      {
        doc: 'mbg-10k-fy2024',
        section: 'Cover page',
        quote: 'Independent Registered Public Accounting Firm: Blackpine LLP (engaged since 2019)',
        extractor: 'llm-extractor v0.5',
        confidence: 0.97,
      },
      {
        doc: 'hih-10k-fy2024',
        section: 'Cover page',
        quote: 'Independent Registered Public Accounting Firm: Blackpine LLP (engaged since 2016)',
        extractor: 'llm-extractor v0.5',
        confidence: 0.97,
      },
    ],
    audit: { query_id: 'q_1d84e9a2', hash: '3a70…c912', facts: 2 },
  },
  {
    q: 'Which Meridian models fall under SR 11-7?',
    answer: [
      'Two: Wholesale-Credit-PD-v3, a tier-1 probability-of-default model in production since 15 April 2023, and Consumer-Cross-Sell-Recommender-v1, a tier-2 model.',
      1,
      ' Model risk management reports to the CRO, Terrence Blake.',
      2,
    ],
    plan: ['resolve  "Meridian" → Company:mbg', 'traverse OPERATES → Model', 'filter   GOVERNED_BY = SR 11-7'],
    cites: [
      {
        doc: 'mbg-10k-fy2024',
        section: 'Item 1A · Model risk',
        quote: 'Our tier-1 model, Wholesale-Credit-PD-v3, was deployed in production on April 15, 2023',
        extractor: 'llm-extractor v0.5',
        confidence: 0.95,
      },
      {
        doc: 'mbg-10k-fy2024',
        section: 'Model Risk Management',
        quote: 'The Model Risk Management function reports to the Chief Risk Officer',
        extractor: 'llm-extractor v0.5',
        confidence: 0.93,
      },
    ],
    audit: { query_id: 'q_b2c6f015', hash: 'e45d…07af', facts: 4 },
  },
]

export default function AskDemo() {
  const [active, setActive] = useState(0)
  const [cite, setCite] = useState(0)
  const head = useReveal<HTMLDivElement>()
  const panel = useReveal<HTMLDivElement>(0.1)
  const ex = examples[active]
  const c = ex.cites[cite]

  return (
    <section className="relative overflow-hidden bg-white text-[#050608]">
      <div className="mx-auto max-w-[1440px] px-5 py-[clamp(4.5rem,9vw,8rem)] sm:px-10 lg:px-14">
        <div ref={head.ref} data-in-view={head.inView} className="scroll-reveal grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-[900px]">
            <Eyebrow bulletColor={ENTITY.Person}>Ask</Eyebrow>
            <h2 className="font-display mt-6 text-[clamp(1.8rem,3.4vw,3.2rem)] font-normal leading-[1.06] tracking-[-0.025em]">
              Every answer comes with its receipts.
              <span className="block text-[#6A6D72]">Sources, confidence and an audit hash.</span>
            </h2>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9499A6]">Sample data · synthetic SEC filings</p>
        </div>

        {/* Pastel frame around the product, Glean-style */}
        <div
          ref={panel.ref}
          data-in-view={panel.inView}
          className="scroll-reveal mt-12 rounded-[20px] p-3 sm:p-6 lg:p-10"
          style={{ backgroundImage: AURORA, backgroundColor: 'oklch(0.96 0.01 265)' }}
        >
        <div className="overflow-hidden rounded-[12px] border border-[oklch(0.88_0_0/0.9)] bg-[oklch(0.985_0_0)] shadow-[0_30px_80px_-40px_oklch(0.3_0.08_265/0.5)]">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-[#E0E0DB] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#D8D8D3]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#D8D8D3]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#D8D8D3]" />
            <span className="ml-3 font-mono text-[11px] text-[#9499A6]">graph · fintech</span>
          </div>

          <div className="grid lg:grid-cols-[1.35fr_1fr]">
            <div className="p-5 sm:p-8">
              <div className="flex items-center gap-3 rounded-[8px] border border-[#D8D8D3] bg-white px-4 py-3">
                <Search className="h-4 w-4 text-[#9499A6]" />
                <span className="text-[15px]">{ex.q}</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {examples.map((e, i) => (
                  <button
                    key={e.q}
                    type="button"
                    onClick={() => {
                      setActive(i)
                      setCite(0)
                    }}
                    className={`rounded-full border px-3 py-1.5 text-[12px] transition-colors duration-200 ${
                      i === active
                        ? 'border-[#2a78d6] bg-[#2a78d6] text-white'
                        : 'border-[#D8D8D3] text-[#50545B] hover:border-[#9499A6]'
                    }`}
                  >
                    {e.q}
                  </button>
                ))}
              </div>

              <div key={active} className="ontos-swap mt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#9499A6]">Answer</p>
                <p className="mt-3 text-[18px] leading-[1.6] tracking-[-0.01em] sm:text-[20px]">
                  {ex.answer.map((part, i) =>
                    typeof part === 'number' ? (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCite(part - 1)}
                        aria-label={`Show source ${part}`}
                        className={`mx-0.5 inline-flex h-5 min-w-5 -translate-y-1 items-center justify-center rounded-[4px] px-1 font-mono text-[10px] transition-colors ${
                          cite === part - 1 ? 'bg-[#2a78d6] text-white' : 'bg-[#E6EEF9] text-[#1F5FAE] hover:bg-[#D3E2F6]'
                        }`}
                      >
                        {part}
                      </button>
                    ) : (
                      <span key={i}>{part}</span>
                    ),
                  )}
                </p>

                <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.24em] text-[#9499A6]">Plan</p>
                <ol className="mt-3 space-y-1.5 font-mono text-[12px] text-[#2A2D33]">
                  {ex.plan.map((p, i) => (
                    <li key={p}>
                      <span className="text-[#9499A6]">{i + 1}.</span> {p}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <aside className="border-t border-[#E0E0DB] bg-white p-5 sm:p-8 lg:border-t-0 lg:border-l">
              <div key={`${active}-${cite}`} className="ontos-swap">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#9499A6]">Provenance · source {cite + 1}</p>
                <div className="mt-4 flex items-center gap-2 text-[14px] font-semibold">
                  <FileText className="h-4 w-4" style={{ color: ENTITY.Filing }} />
                  {c.doc}
                  <span className="font-normal text-[#9499A6]">· {c.section}</span>
                </div>
                <blockquote className="mt-4 border-l-2 border-[#1baf7a] pl-4 text-[14px] leading-[1.6] text-[#2A2D33]">
                  “{c.quote}”
                </blockquote>
                <dl className="mt-6 grid grid-cols-2 gap-y-3 font-mono text-[11.5px]">
                  <dt className="text-[#9499A6]">extractor</dt>
                  <dd>{c.extractor}</dd>
                  <dt className="text-[#9499A6]">confidence</dt>
                  <dd className="flex items-center gap-2">
                    <span className="h-1 w-16 overflow-hidden rounded-full bg-[#E8E8E3]">
                      <span className="block h-full bg-[#2a78d6]" style={{ width: `${c.confidence * 100}%` }} />
                    </span>
                    {c.confidence.toFixed(2)}
                  </dd>
                </dl>
              </div>

              <div className="mt-8 rounded-[8px] border border-[#E0E0DB] bg-[oklch(0.985_0_0)] p-4">
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-[#50545B]">
                  <ShieldCheck className="h-3.5 w-3.5" /> Audit record · Art. 12
                </p>
                <dl className="mt-3 grid grid-cols-2 gap-y-2 font-mono text-[11.5px]">
                  <dt className="text-[#9499A6]">query_id</dt>
                  <dd>{ex.audit.query_id}</dd>
                  <dt className="text-[#9499A6]">caller</dt>
                  <dd>agent:analyst</dd>
                  <dt className="text-[#9499A6]">facts returned</dt>
                  <dd>{ex.audit.facts}</dd>
                  <dt className="text-[#9499A6]">audit_hash</dt>
                  <dd>{ex.audit.hash}</dd>
                  <dt className="text-[#9499A6]">chain</dt>
                  <dd>verified</dd>
                </dl>
              </div>
            </aside>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
