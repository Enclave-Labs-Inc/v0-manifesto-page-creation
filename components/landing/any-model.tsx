'use client'

import { useEffect, useRef, useState } from 'react'
import { RefreshCw, GitBranch, Server } from 'lucide-react'

const providers = [
  { name: 'OpenAI', detail: 'GPT-5, GPT-4o' },
  { name: 'Anthropic', detail: 'Claude Opus 4.7, Sonnet 5' },
  { name: 'Google Gemini', detail: 'Gemini 2.5 Pro, Flash' },
  { name: 'Meta Llama', detail: 'Llama 3.3 on your GPUs' },
  { name: 'Mistral', detail: 'Mistral Large 2, Codestral' },
  { name: 'Cohere', detail: 'Command R+, Rerank' },
  { name: 'Your local model', detail: 'Fine-tuned, self-hosted' },
]

const capabilities = [
  {
    icon: RefreshCw,
    title: 'Swap',
    body: 'Point to any provider. One config change. Zero downtime for your team.',
  },
  {
    icon: GitBranch,
    title: 'Route per team',
    body: 'Compliance on Anthropic. Engineering on Llama. All from the same control plane.',
  },
  {
    icon: Server,
    title: 'Self-host',
    body: 'Run open weights on your own GPUs when outbound traffic is not an option.',
  },
]

const CYCLE_MS = 1800

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
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

export default function AnyModel() {
  const header = useReveal<HTMLDivElement>()
  const left = useReveal<HTMLDivElement>()
  const card = useReveal<HTMLDivElement>()

  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    if (!card.inView) return
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const id = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % providers.length)
    }, CYCLE_MS)
    return () => clearInterval(id)
  }, [card.inView])

  return (
    <section className="relative overflow-hidden bg-white text-[#111214]">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-20 pb-20 sm:px-10 lg:px-14 lg:pt-24 lg:pb-24">
        <div
          ref={header.ref}
          data-in-view={header.inView}
          className="scroll-reveal"
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6A6D72]">
            Any model
          </p>

          <h2 className="mt-5 font-display text-[clamp(1.75rem,3.4vw,3.2rem)] font-normal leading-[1.1] tracking-[-0.025em]">
            <span className="block md:whitespace-nowrap">
              Use the model your company trusts.
            </span>
            <span className="block text-[#6A6D72] md:whitespace-nowrap">
              Switch when the frontier moves.
            </span>
          </h2>
        </div>

        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-20">
          <div
            ref={left.ref}
            data-in-view={left.inView}
            className="scroll-reveal"
            style={{ transitionDelay: '120ms' }}
          >
            <ul className="divide-y divide-[#EDEDE8] border-y border-[#EDEDE8]">
              {capabilities.map((cap, idx) => {
                const Icon = cap.icon
                return (
                  <li
                    key={cap.title}
                    data-in-view={left.inView}
                    className="scroll-reveal flex items-start gap-5 py-6"
                    style={{ transitionDelay: `${200 + idx * 110}ms` }}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] border border-[#E6E6E1] bg-[#FAFAF5]">
                      <Icon
                        className="h-[18px] w-[18px] text-[#111214]"
                        strokeWidth={1.6}
                      />
                    </div>
                    <div className="pt-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6A6D72]">
                        0{idx + 1}
                      </p>
                      <h3 className="mt-1.5 text-[18px] font-semibold tracking-[-0.015em] text-[#111214]">
                        {cap.title}
                      </h3>
                      <p className="mt-2 max-w-[44ch] text-[14px] leading-[1.55] text-[#55585D]">
                        {cap.body}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>

            <p
              data-in-view={left.inView}
              className="scroll-reveal mt-6 max-w-[48ch] text-[13px] leading-[1.6] text-[#6A6D72]"
              style={{ transitionDelay: '600ms' }}
            >
              Model lock-in is a compliance risk you don&rsquo;t have to
              underwrite.
            </p>
          </div>

          <div
            ref={card.ref}
            data-in-view={card.inView}
            className="scroll-reveal"
            style={{ transitionDelay: '220ms' }}
          >
            <aside
              aria-live="polite"
              className="relative overflow-hidden rounded-[10px] border border-[#E6E6E1] bg-[#FAFAF5] p-7 lg:p-8"
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6A6D72]">
                  Live routing
                </p>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2A2D33]">
                  <span className="relative flex h-[8px] w-[8px]">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0A8457]/50" />
                    <span className="relative inline-flex h-[8px] w-[8px] rounded-full bg-[#0A8457]" />
                  </span>
                  Active
                </span>
              </div>

              <ul className="mt-5 space-y-[2px]">
                {providers.map((p, idx) => {
                  const isActive = idx === activeIdx
                  return (
                    <li
                      key={p.name}
                      className={`relative rounded-[6px] px-3 py-2 transition-colors duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                        isActive ? 'bg-white' : 'bg-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`relative h-[8px] w-[8px] shrink-0 rounded-full transition-colors duration-500 ${
                            isActive
                              ? 'bg-[#111214]'
                              : 'border border-[#B9BCC2] bg-transparent'
                          }`}
                        />
                        <span
                          className={`text-[14px] transition-all duration-500 ${
                            isActive
                              ? 'font-semibold text-[#111214]'
                              : 'text-[#55585D]'
                          }`}
                        >
                          {p.name}
                        </span>
                      </div>
                      <div
                        className={`grid overflow-hidden pl-[23px] transition-[grid-template-rows,opacity,margin] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                          isActive
                            ? 'mt-1 grid-rows-[1fr] opacity-100'
                            : 'mt-0 grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <span className="min-h-0 text-[12px] leading-[1.5] text-[#6A6D72]">
                          {p.detail}
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-7 border-t border-[#E6E6E1] pt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8E95]">
                Hosted · Private cloud · On-prem · Air-gapped
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}
