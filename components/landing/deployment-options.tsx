'use client'

import { useEffect, useRef, useState } from 'react'

const deployments = [
  {
    eyebrow: '01 Managed',
    title: 'Enclave Cloud',
    body: 'Managed by us. Fastest to start, zero infrastructure on your side. Hosted in an ISO-certified region.',
    audience: 'Teams evaluating',
  },
  {
    eyebrow: '02 BYOC',
    title: 'Your AWS account',
    body: 'Enclave deploys to your AWS account via Terraform. You own the storage, encryption keys, database and audit logs.',
    audience: 'Most common for regulated enterprise',
  },
  {
    eyebrow: '03 BYOC',
    title: 'Your GCP or Azure',
    body: 'The same architecture on GKE or AKS. Pick the hyperscaler your platform team already runs.',
    audience: 'Multi-cloud and EU residency',
  },
  {
    eyebrow: '04 Sovereign',
    title: 'On-prem or air-gapped',
    body: 'Runs on your own hardware with no outbound network required. Pairs with on-prem LLMs.',
    audience: 'Defense, finance, healthcare',
  },
]

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

export default function DeploymentOptions() {
  const header = useReveal<HTMLDivElement>()
  const grid = useReveal<HTMLDivElement>()
  const footer = useReveal<HTMLParagraphElement>()

  return (
    <section className="relative overflow-hidden bg-[#F7F7F2] text-[#111214]">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-20 pb-20 sm:px-10 lg:px-14 lg:pt-24 lg:pb-24">
        <div
          ref={header.ref}
          data-in-view={header.inView}
          className="scroll-reveal"
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#6A6D72]">
            Deploy where your data already lives
          </p>

          <h2 className="mt-5 font-display text-[clamp(1.75rem,3.4vw,3.2rem)] font-normal leading-[1.1] tracking-[-0.025em]">
            <span className="block md:whitespace-nowrap">Four ways to run Enclave.</span>
            <span className="block text-[#6A6D72] md:whitespace-nowrap">
              All of them inside your perimeter.
            </span>
          </h2>
        </div>

        <div
          ref={grid.ref}
          className="mt-12 grid gap-px overflow-hidden rounded-[2px] bg-[#CFCFCA] md:grid-cols-2 lg:grid-cols-4"
        >
          {deployments.map((d, idx) => (
            <article
              key={d.title}
              data-in-view={grid.inView}
              className="scroll-reveal flex flex-col bg-[#F7F7F2] p-6 lg:p-7"
              style={{ transitionDelay: `${idx * 90}ms` }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6A6D72]">
                {d.eyebrow}
              </p>
              <h3 className="mt-4 font-display text-[22px] leading-[1.15] tracking-[-0.02em]">
                {d.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-[#55585D]">
                {d.body}
              </p>
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8E95]">
                {d.audience}
              </p>
            </article>
          ))}
        </div>

        <p
          ref={footer.ref}
          data-in-view={footer.inView}
          className="scroll-reveal mt-10 max-w-[72ch] text-[14px] leading-[1.7] text-[#55585D]"
          style={{ transitionDelay: '420ms' }}
        >
          Every deployment uses your identity provider, your permissions, and the
          LLM your company has already approved. Nothing leaves your perimeter
          unless you say it does.
        </p>
      </div>
    </section>
  )
}
