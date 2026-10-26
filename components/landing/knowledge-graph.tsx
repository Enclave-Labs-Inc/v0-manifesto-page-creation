'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

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

const graphNodes = [
  { name: 'Dana Okafor', detail: 'Compliance · owns Q2 Risk Review', filled: true },
  { name: 'Sam Reyes', detail: 'Support · handles refund tickets', filled: true },
  {
    name: 'Refund Policy v7.pdf',
    detail: 'Google Drive · updated 2 Mar 2026',
    filled: false,
  },
]

export default function KnowledgeGraph() {
  const left = useReveal<HTMLDivElement>()
  const card = useReveal<HTMLDivElement>()

  return (
    <section className="relative overflow-hidden bg-white text-[#111214]">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-20 pb-20 sm:px-10 lg:px-14 lg:pt-24 lg:pb-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-20">
          <div
            ref={left.ref}
            data-in-view={left.inView}
            className="scroll-reveal"
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6A6D72]">
              Why Enclave
            </p>

            <h2 className="mt-5 font-display text-[clamp(1.75rem,3.4vw,3.2rem)] font-normal leading-[1.1] tracking-[-0.025em]">
              <span className="block">Not another search box.</span>
              <span className="block text-[#6A6D72]">
                A knowledge graph your team can inspect.
              </span>
            </h2>

            <p className="mt-8 max-w-[58ch] text-[16px] leading-[1.65] text-[#2A2D33]">
              Keyword search returns documents and hopes you connect the dots. A
              knowledge graph connects them for you, and shows its work.
            </p>

            <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.7] text-[#55585D]">
              Enclave is built on{' '}
              <span className="font-semibold text-[#111214]">Ontos</span>, our
              open-source knowledge graph layer. Every answer traces back to the
              entities, relationships and source documents it came from. When a
              policy changes in Confluence, a deal moves stage in Salesforce, or
              an engineer merges a PR, the graph updates. Answers stay current
              without a reindex job.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/ontos"
                className="group inline-flex h-[44px] items-center gap-2 rounded-[6px] border border-[#050608] px-5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#050608] transition-colors duration-200 hover:bg-[#050608] hover:text-[oklch(0.985_0_0)]"
              >
                Explore Ontos
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </Link>
              <a
                href="https://github.com/Enclave-Labs-Inc/Ontos"
                className="group inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#55585D] transition-colors hover:text-[#111214]"
              >
                GitHub
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </a>
            </div>
          </div>

          <aside
            ref={card.ref}
            data-in-view={card.inView}
            aria-hidden
            className="scroll-reveal relative overflow-hidden rounded-[10px] border border-[#E6E6E1] bg-[#FAFAF5] p-7 lg:p-8"
            style={{ transitionDelay: '180ms' }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6A6D72]">
              Example answer
            </p>
            <p className="mt-4 text-[16px] leading-[1.5] text-[#111214]">
              &ldquo;Who&rsquo;s working on the EU refund window change?&rdquo;
            </p>

            <div className="mt-7 space-y-5 text-[13px] leading-[1.55] text-[#2A2D33]">
              {graphNodes.map((node, idx) => (
                <div
                  key={node.name}
                  data-in-view={card.inView}
                  className="scroll-reveal flex items-start gap-3"
                  style={{ transitionDelay: `${320 + idx * 120}ms` }}
                >
                  <span
                    className={`mt-[6px] h-[8px] w-[8px] shrink-0 rounded-full ${
                      node.filled
                        ? 'bg-[#111214]'
                        : 'border border-[#111214] bg-transparent'
                    }`}
                  />
                  <div>
                    <p className="font-semibold">{node.name}</p>
                    <p className="text-[#55585D]">{node.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-[#E6E6E1] pt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8E95]">
              3 sources · permissions enforced at retrieval
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
