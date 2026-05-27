'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Cable,
  Cpu,
  MessageSquareQuote,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'

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
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

// ============================================================================
// Card backgrounds — visual mocks behind each bento card
// ============================================================================

const QUESTION_TEXT = 'Where’s the rollback runbook for billing?'
const ANSWER_PREFIX = 'Run '
const ANSWER_MID =
  ' with the migration ID. Pause writes via '
const ANSWER_SUFFIX = ' first.'
const CITATIONS = [
  'confluence/billing-rollback',
  'slack/#incidents',
  'github/billing PR-4421',
]

function SourcedAnswersBackground() {
  const [question, setQuestion] = useState('')
  const [answerLen, setAnswerLen] = useState(0)
  const [citationsShown, setCitationsShown] = useState(0)
  const [answerStarted, setAnswerStarted] = useState(false)

  const ANSWER_FULL =
    ANSWER_PREFIX +
    'scripts/rollback-billing.sh' +
    ANSWER_MID +
    'FEATURE_BILLING_FREEZE' +
    ANSWER_SUFFIX

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setQuestion(QUESTION_TEXT)
      setAnswerStarted(true)
      setAnswerLen(ANSWER_FULL.length)
      setCitationsShown(CITATIONS.length)
      return
    }

    let cancelled = false
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const run = async () => {
      while (!cancelled) {
        // Reset
        setQuestion('')
        setAnswerStarted(false)
        setAnswerLen(0)
        setCitationsShown(0)
        await wait(900)
        if (cancelled) return

        // Type the question
        for (let i = 1; i <= QUESTION_TEXT.length; i += 1) {
          if (cancelled) return
          setQuestion(QUESTION_TEXT.slice(0, i))
          await wait(35)
        }

        await wait(550)
        if (cancelled) return
        setAnswerStarted(true)
        await wait(180)

        // Stream the answer
        for (let i = 1; i <= ANSWER_FULL.length; i += 1) {
          if (cancelled) return
          setAnswerLen(i)
          await wait(18)
        }

        await wait(350)
        if (cancelled) return

        // Reveal citations one by one
        for (let i = 1; i <= CITATIONS.length; i += 1) {
          if (cancelled) return
          setCitationsShown(i)
          await wait(260)
        }

        // Hold the final state, then loop
        await wait(3600)
      }
    }

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timeoutId = setTimeout(resolve, ms)
      })

    run()

    return () => {
      cancelled = true
      if (timeoutId) clearTimeout(timeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-6 [mask-image:linear-gradient(to_top,transparent_18%,black_72%)]">
      <div className="self-end max-w-[80%] rounded-2xl rounded-tr-md bg-[oklch(0.18_0.005_145)] px-3.5 py-2 text-[12px] text-[#C5C9D2] shadow-[inset_0_1px_0_oklch(1_0_0/0.06)] min-h-[2.2em]">
        {question}
        {question.length > 0 && question.length < QUESTION_TEXT.length && (
          <span className="ml-0.5 inline-block h-3 w-[2px] -mb-[2px] animate-pulse bg-[#C5C9D2] align-middle" />
        )}
      </div>

      {answerStarted && (
        <div className="max-w-[88%] rounded-2xl rounded-tl-md bg-[oklch(0.14_0.005_145)] p-3.5 text-[12px] leading-[1.55] text-[#9499A6] shadow-[inset_0_1px_0_oklch(1_0_0/0.05)]">
          <AnswerStream
            full={ANSWER_FULL}
            length={answerLen}
          />
          <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em]">
            {CITATIONS.map((c, i) => (
              <span
                key={c}
                className={`rounded-md border border-[#2A2D34] bg-[oklch(0.1_0.005_145)] px-2 py-1 text-[#9499A6] transition-all duration-300 ease-out ${
                  i < citationsShown
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-1 opacity-0'
                }`}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Renders the partial answer with the two highlighted code spans (the script
// name and the feature flag) rendered as `<span>` only once they are fully
// typed past, so the streaming reads naturally.
function AnswerStream({ full, length }: { full: string; length: number }) {
  const visible = full.slice(0, length)
  const showCursor = length > 0 && length < full.length
  // Highlight the two known monospace fragments if they fit in the visible
  // substring; otherwise render plain.
  const codeA = 'scripts/rollback-billing.sh'
  const codeB = 'FEATURE_BILLING_FREEZE'
  const idxA = visible.indexOf(codeA)
  const idxB = visible.indexOf(codeB)

  const parts: React.ReactNode[] = []
  let cursor = 0

  const pushPlain = (end: number) => {
    if (end > cursor) parts.push(visible.slice(cursor, end))
    cursor = end
  }

  if (idxA !== -1 && idxA + codeA.length <= visible.length) {
    pushPlain(idxA)
    parts.push(
      <span key="codeA" className="font-mono text-[#E4E7EC]">
        {codeA}
      </span>,
    )
    cursor = idxA + codeA.length
  }
  if (idxB !== -1 && idxB + codeB.length <= visible.length) {
    pushPlain(idxB)
    parts.push(
      <span key="codeB" className="font-mono text-[#E4E7EC]">
        {codeB}
      </span>,
    )
    cursor = idxB + codeB.length
  }
  pushPlain(visible.length)

  return (
    <>
      {parts}
      {showCursor && (
        <span className="ml-0.5 inline-block h-3 w-[2px] -mb-[2px] animate-pulse bg-[#E4E7EC] align-middle" />
      )}
    </>
  )
}

function AuditLogBackground() {
  const rows = [
    { time: '14:02:11', actor: 'avery.k', action: 'query.submit', target: 'company-brain' },
    { time: '14:02:11', actor: 'avery.k', action: 'vector.search', target: 'shard-04' },
    { time: '14:02:12', actor: 'avery.k', action: 'doc.fetch', target: 'confluence:817' },
    { time: '14:02:12', actor: 'avery.k', action: 'permission.check', target: 'team:platform' },
    { time: '14:02:13', actor: 'avery.k', action: 'answer.return', target: 'cited:3' },
  ]
  return (
    <div className="absolute inset-0 flex flex-col gap-1 p-5 font-mono text-[10px] leading-[1.6] [mask-image:linear-gradient(to_top,transparent_22%,black_70%)]">
      {rows.map((r) => (
        <div key={`${r.time}-${r.action}`} className="flex items-center gap-2">
          <span className="text-[#5E636F]">{r.time}</span>
          <span className="text-[#9499A6]">{r.actor}</span>
          <span className="text-[#E4E7EC]">{r.action}</span>
          <span className="ml-auto text-[#5E636F]">{r.target}</span>
        </div>
      ))}
    </div>
  )
}

function PermissionBackground() {
  return (
    <div className="absolute inset-0 flex items-center justify-center [mask-image:linear-gradient(to_top,transparent_22%,black_75%)]">
      <div className="relative h-32 w-32">
        <div className="absolute inset-0 rounded-full border border-[#2A2D34] bg-[oklch(0.12_0.005_145)]" />
        <div className="absolute inset-3 rounded-full border border-[#2A2D34] bg-[oklch(0.13_0.005_145)]" />
        <div className="absolute inset-6 rounded-full border border-[#3A3D43] bg-[oklch(0.15_0.005_145)] shadow-[inset_0_1px_0_oklch(1_0_0/0.05)]" />
      </div>
    </div>
  )
}

function ModelAgnosticBackground() {
  const models = ['Bedrock', 'Azure OpenAI', 'Mistral', 'Llama 3']
  return (
    <div className="absolute inset-0 flex flex-col items-stretch justify-center gap-2 p-6 [mask-image:linear-gradient(to_top,transparent_22%,black_72%)]">
      {models.map((m) => (
        <div
          key={m}
          className="flex items-center justify-between rounded-lg border border-[#2A2D34] bg-[oklch(0.12_0.005_145)] px-3 py-2"
        >
          <span className="text-[12px] font-bold text-[#E4E7EC]">{m}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.63_0.16_162)]" />
        </div>
      ))}
    </div>
  )
}

function IntegrationsBackground() {
  // Brand logos live in /public/brand/ as monochrome placeholders.
  // Drop in the official SVG at the same path/filename to swap (same
  // pattern as the Postgres elephant on the infra rail).
  const integrations = [
    { label: 'Slack', src: '/brand/slack.svg', top: '10%', left: '14%', delay: '0s' },
    { label: 'Drive', src: '/brand/drive.svg', top: '12%', left: '72%', delay: '-0.7s' },
    { label: 'GitHub', src: '/brand/github.svg', top: '48%', left: '6%', delay: '-1.4s' },
    { label: 'Confluence', src: '/brand/confluence.svg', top: '50%', left: '76%', delay: '-2.1s' },
    { label: 'Jira', src: '/brand/jira.svg', top: '78%', left: '22%', delay: '-2.8s' },
    { label: 'Notion', src: '/brand/notion.svg', top: '78%', left: '62%', delay: '-3.5s' },
  ]
  return (
    <div className="absolute inset-0 [mask-image:linear-gradient(to_top,transparent_22%,black_72%)]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <g stroke="oklch(0.3 0.005 145)" strokeWidth="0.2" fill="none">
          <line x1="50" y1="50" x2="17" y2="16" />
          <line x1="50" y1="50" x2="78" y2="18" />
          <line x1="50" y1="50" x2="11" y2="54" />
          <line x1="50" y1="50" x2="82" y2="56" />
          <line x1="50" y1="50" x2="26" y2="82" />
          <line x1="50" y1="50" x2="66" y2="82" />
        </g>
      </svg>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#3A3D43] bg-[oklch(0.15_0.005_145)] px-3.5 py-2 text-[11px] font-bold text-[#F4F5F7] shadow-[inset_0_1px_0_oklch(1_0_0/0.06)]">
        Enclave
      </div>

      {integrations.map((i) => (
        <span
          key={i.label}
          style={{ top: i.top, left: i.left, animationDelay: i.delay }}
          className="brand-float absolute inline-flex items-center gap-1.5 rounded-md border border-[#2A2D34] bg-[oklch(0.11_0.005_145)] px-2 py-1 text-[10px] font-bold text-[#C5C9D2]"
        >
          <img src={i.src} alt="" aria-hidden className="h-3.5 w-3.5" />
          {i.label}
        </span>
      ))}
    </div>
  )
}

// ============================================================================
// Section
// ============================================================================

const cards = [
  {
    Icon: MessageSquareQuote,
    name: 'Sourced answers',
    description:
      'Every response carries the documents it came from. No hallucinated facts — if the evidence is thin, Enclave says so.',
    href: '/manifesto#IV',
    cta: 'Read the doctrine',
    background: <SourcedAnswersBackground />,
    className: 'lg:col-span-2 lg:row-span-2',
  },
  {
    Icon: Cable,
    name: 'Integrations',
    description:
      'Slack, Drive, GitHub, Confluence, Jira, Notion. The content never leaves your perimeter.',
    href: '/manifesto#II',
    cta: 'See architecture',
    background: <IntegrationsBackground />,
    className: 'lg:col-span-1 lg:row-span-1',
  },
  {
    Icon: ShieldCheck,
    name: 'Permission-aware',
    description:
      'People only see what they’re allowed to. Authorization is enforced at retrieval, not at the UI.',
    href: '/manifesto#III',
    cta: 'How it works',
    background: <PermissionBackground />,
    className: 'lg:col-span-1 lg:row-span-1',
  },
  {
    Icon: Zap,
    name: 'Audit-ready logs',
    description:
      'Every query, fetch, and permission check lands in your CloudTrail. Your compliance team reads it without calling us.',
    href: '/manifesto#III',
    cta: 'See the proof',
    background: <AuditLogBackground />,
    className: 'lg:col-span-2 lg:row-span-1',
  },
  {
    Icon: Cpu,
    name: 'Model-agnostic',
    description:
      'Bedrock, Azure OpenAI, your own Vertex, or a local Mistral. We’re the substrate, not the answer engine.',
    href: '/manifesto#VI',
    cta: 'Read more',
    background: <ModelAgnosticBackground />,
    className: 'lg:col-span-1 lg:row-span-1',
  },
]

export default function CapabilitiesSection() {
  const eyebrow = useReveal<HTMLParagraphElement>()
  const headline = useReveal<HTMLHeadingElement>()
  const subhead = useReveal<HTMLParagraphElement>()
  const grid = useReveal<HTMLDivElement>()

  return (
    <section className="relative overflow-hidden bg-[oklch(0.095_0.006_145)] text-[#E8E9EC]">
      <div className="relative mx-auto max-w-[1320px] px-6 py-[clamp(5.5rem,10vw,8.5rem)] sm:px-10 lg:px-14">
        <p
          ref={eyebrow.ref}
          data-in-view={eyebrow.inView}
          className="scroll-reveal text-[11px] font-bold uppercase tracking-[0.34em] text-[#787D8A]"
        >
          What’s inside
        </p>

        <h2
          ref={headline.ref}
          data-in-view={headline.inView}
          className="scroll-reveal mt-8 max-w-[24ch] text-[clamp(2rem,4.8vw,4rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#F4F5F7]"
        >
          The surface area
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">
            your buyer can actually evaluate.
          </span>
        </h2>

        <p
          ref={subhead.ref}
          data-in-view={subhead.inView}
          className="scroll-reveal mt-6 max-w-[62ch] text-[15px] leading-[1.65] tracking-[-0.005em] text-[#9499A6]"
        >
          A look at the product surface — sourced answers, integrations,
          permissions, audit, and the model layer — so security review starts
          from concrete behavior, not promises.
        </p>

        <div
          ref={grid.ref}
          data-in-view={grid.inView}
          className="scroll-reveal dark mt-14 md:mt-20"
        >
          <BentoGrid className="auto-rows-[18rem] gap-4 md:auto-rows-[20rem]">
            {cards.map((card) => (
              <BentoCard key={card.name} {...card} />
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  )
}
