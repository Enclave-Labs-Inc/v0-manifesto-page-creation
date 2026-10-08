'use client'

import { useState } from 'react'
import { FileText } from 'lucide-react'
import { ENTITY } from './entity'
import { useReveal } from './use-reveal'

type Cite = { doc: string; section: string; quote: string; extractor: string; confidence: number }
type Example = {
  q: string
  answer: (string | number)[] // numbers are citation markers
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
    <section className="bg-white text-[#050608]">
      <div className="mx-auto max-w-[1440px] px-5 py-[clamp(6rem,12vw,10rem)] sm:px-10 lg:px-14">
        <div ref={head.ref} data-in-view={head.inView} className="scroll-reveal max-w-[760px]">
          <h2 className="font-display text-[clamp(2rem,3.6vw,3.4rem)] font-normal leading-[1.05] tracking-[-0.025em]">
            Every answer shows its receipts.
          </h2>
          <p className="mt-6 max-w-[56ch] text-[17px] leading-[1.65] text-[#55585D]">
            Select a citation to see the exact line it came from. Every query is logged.
          </p>
        </div>

        <div
          ref={panel.ref}
          data-in-view={panel.inView}
          className="scroll-reveal mt-16 grid overflow-hidden rounded-[14px] border border-[#E6E6E1] bg-[oklch(0.985_0.002_265)] lg:grid-cols-[1.4fr_1fr]"
        >
          <div className="p-6 sm:p-10">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Sample questions">
              {examples.map((e, i) => (
                <button
                  key={e.q}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => {
                    setActive(i)
                    setCite(0)
                  }}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-200 ${
                    i === active ? 'bg-[#050608] text-white' : 'text-[#50545B] hover:bg-[#EDEDEA]'
                  }`}
                >
                  {e.q}
                </button>
              ))}
            </div>

            <p key={active} className="ontos-swap mt-10 text-[20px] leading-[1.6] tracking-[-0.01em] sm:text-[22px]">
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
          </div>

          <aside key={`${active}-${cite}`} className="ontos-swap border-t border-[#E6E6E1] bg-white p-6 sm:p-10 lg:border-t-0 lg:border-l">
            <p className="flex items-center gap-2 text-[14px] font-semibold">
              <FileText className="h-4 w-4" style={{ color: ENTITY.Filing }} />
              {c.doc}
              <span className="font-normal text-[#6A6D72]">· {c.section}</span>
            </p>
            <blockquote className="mt-5 text-[16px] leading-[1.6] text-[#2A2D33]">“{c.quote}”</blockquote>
            <dl className="mt-8 space-y-2 text-[13px] text-[#6A6D72]">
              <div className="flex justify-between gap-4">
                <dt>Confidence</dt>
                <dd className="font-mono text-[#050608]">{c.confidence.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Audit record</dt>
                <dd className="font-mono text-[#050608]">{ex.audit.hash}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  )
}
