'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

const CAL_URL = 'https://cal.com/shashank-bhardwaj-fwmii1/30min'
const ONTOS_GITHUB = 'https://github.com/Enclave-Labs-Inc/Ontos'

const eyebrowLight = 'font-mono text-[11px] uppercase tracking-[0.18em] text-[#6A6D72]'
const eyebrowDark = 'font-mono text-[11px] uppercase tracking-[0.18em] text-[#7D828C]'
const container = 'mx-auto max-w-[1440px] px-5 sm:px-10 lg:px-14'

const beliefs = [
  {
    title: 'An answer without a source is a guess.',
    body: 'Every answer should point back to the document, message or record it came from, and say how sure it is.',
  },
  {
    title: 'Permissions travel with the data.',
    body: 'Search should never show anyone something they couldn’t already open. Access rules come from the source systems, not from a second copy.',
  },
  {
    title: 'Connections matter as much as documents.',
    body: 'Knowing what a document says is half the job. The other half is knowing who owns what, what depends on what, and what was true on a given date.',
  },
  {
    title: 'Your knowledge stays in your environment.',
    body: 'Storage, keys, indexes and audit logs stay in your cloud account. That shouldn’t be a premium tier; it should be how enterprise AI is built.',
  },
  {
    title: 'Use the model you already trust.',
    body: 'Models change every quarter. The knowledge layer underneath them shouldn’t have to.',
  },
  {
    title: 'Measure in public.',
    body: 'We publish benchmarks, including the bugs we found and the claims we had to retire. Trust is earned with numbers, not adjectives.',
  },
]

const layers = [
  {
    name: 'Enclave',
    role: 'The answer engine',
    body: 'One place to ask what the company knows. Cited, confidence-scored answers across Google Drive, Slack and GitHub, filtered by each person’s existing access.',
    status: 'Building v1.0',
  },
  {
    name: 'Retrieval engine',
    role: 'What documents say',
    body: 'A Rust shard store that keeps the index in your own object storage. Memory is only a cache, so the index never leaves your account.',
    status: 'Benchmarked',
  },
  {
    name: 'Ontos',
    role: 'How things connect',
    body: 'A knowledge graph of typed entities and relationships. Every fact keeps its source and its history, and every query leaves an audit record.',
    status: 'Open source · Platform in alpha',
  },
  {
    name: 'Enclave Scribe',
    role: 'Reading every document',
    body: 'A self-hosted document-understanding model that turns scans, PDFs, decks, handwriting and multilingual text into structured text, without sending pages to a third-party API.',
    status: 'In training',
  },
]

type Ship = {
  state: 'Shipped' | 'Private alpha' | 'Building' | 'In training' | 'Next'
  when: string
  title: string
  body: string
  link?: { label: string; href: string; external?: boolean }
}

const shipping: Ship[] = [
  {
    state: 'Shipped',
    when: 'May 2026',
    title: 'Retrieval engine benchmark, v0.0.1',
    body: 'Tested on a one-million-chunk corpus and real S3, with the cache bug we caught and the permission claim we retired.',
    link: { label: 'Read the report', href: '/releases/sovereign-search-at-scale' },
  },
  {
    state: 'Shipped',
    when: 'Open source',
    title: 'Ontos, the knowledge-graph layer',
    body: 'Released under Apache-2.0 and installable with pip install enclave-ontos.',
    link: { label: 'View on GitHub', href: ONTOS_GITHUB, external: true },
  },
  {
    state: 'Private alpha',
    when: 'Now',
    title: 'The hosted knowledge-graph platform',
    body: 'Ontos as a managed service: create a project, upload documents, and query the graph over REST or MCP.',
    link: { label: 'Join the waitlist', href: '/ontos' },
  },
  {
    state: 'Building',
    when: 'Now',
    title: 'Enclave v1.0',
    body: 'Drive, Slack and GitHub connectors, deployment into your AWS account, an employee app for asking, and an admin console for connectors, audit and tuning.',
  },
  {
    state: 'In training',
    when: 'Now',
    title: 'Enclave Scribe',
    body: 'Following the path Ontos took: built for Enclave first, then released as its own product once it clears the benchmark targets we’ve set for it. We’ll publish the numbers either way.',
  },
  {
    state: 'Next',
    when: 'After v1.0',
    title: 'More sources, more clouds',
    body: 'Confluence, Jira, Notion, Salesforce, SharePoint and Teams; GCP and Azure; and fully local models.',
  },
]

const lookingFor = [
  {
    title: 'Design partners',
    body: 'Teams whose knowledge is spread across many tools and who want answers they can check. You get early access and a direct line to the people building it.',
    cta: { label: 'Talk to us', href: CAL_URL, external: false },
  },
  {
    title: 'Early platform users',
    body: 'Developers who want a knowledge graph for their apps or agents without running the infrastructure.',
    cta: { label: 'Join the waitlist', href: '/ontos', external: false },
  },
  {
    title: 'Contributors',
    body: 'People who care about provenance, permissions and auditability in AI, and want to help shape the open-source layers.',
    cta: { label: 'Contribute to Ontos', href: ONTOS_GITHUB, external: true },
  },
]

const stateStyle: Record<Ship['state'], string> = {
  Shipped: 'bg-[#050608] text-white',
  'Private alpha': 'bg-[#E6EEF9] text-[#1F5FAE]',
  Building: 'bg-[#E4E4DF] text-[#2A2D33]',
  'In training': 'bg-[#E4E4DF] text-[#2A2D33]',
  Next: 'border border-[#CFCFCA] text-[#6A6D72]',
}

const external = { target: '_blank', rel: 'noopener noreferrer' }

export default function ManifestoContent() {
  return (
    <>
      {/* Vision */}
      <section className="bg-[oklch(0.965_0_0)] text-[#0A0B0D]">
        <div className={`${container} pb-28 pt-32 lg:pb-36 lg:pt-40`}>
          <p className={eyebrowLight}>Manifesto</p>

          <h1 className="mt-6 max-w-[17ch] font-display text-[clamp(3rem,7vw,6.8rem)] font-normal leading-[0.96] tracking-[-0.04em]">
            Your company already knows the answer.
            <span className="block text-[#737780]">It just can’t find it.</span>
          </h1>

          <p className="mt-10 max-w-[62ch] text-[17px] leading-[1.7] text-[#4F535A] sm:text-[19px]">
            Enclave is building the knowledge layer for the enterprise: one place to search and ask across
            everything a company knows, with every answer grounded in its sources, bound by existing
            permissions, and running where the data already lives.
          </p>
        </div>
      </section>

      {/* The problem */}
      <section className="bg-[#0D0E10] text-white">
        <div className={`${container} py-28 lg:py-36`}>
          <p className={eyebrowDark}>The problem</p>

          <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(2.6rem,5vw,5rem)] font-normal leading-[1.0] tracking-[-0.035em]">
            Knowledge is everywhere.
            <span className="block text-[#7D828C]">Answers are nowhere.</span>
          </h2>

          <div className="mt-10 grid max-w-[1100px] gap-8 text-[16px] leading-[1.75] text-[#B7BBC3] md:grid-cols-2 md:gap-12">
            <p>
              Every company runs on documents, threads, tickets, code and records spread across dozens of
              tools. The answer to most questions already exists somewhere. Finding it means knowing where to
              look, who to ask, and which version is current.
            </p>
            <p>
              Search tools match keywords but miss how things connect. AI assistants answer fluently but
              rarely show their sources, and often need a copy of your data in someone else’s cloud. Neither
              is something a company can rely on.
            </p>
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="bg-[oklch(0.965_0_0)] text-[#111214]">
        <div className={`${container} py-28 lg:py-36`}>
          <p className={eyebrowLight}>What we believe</p>
          <h2 className="mt-6 max-w-[22ch] font-display text-[clamp(2.2rem,4vw,3.8rem)] font-normal leading-[1.02] tracking-[-0.03em]">
            Enterprise search should be something you can trust.
          </h2>

          <div className="mt-14 grid gap-x-12 md:grid-cols-2 lg:grid-cols-3">
            {beliefs.map((b, i) => (
              <div key={b.title} className="border-t border-[#CFCFCA] py-10">
                <p className="font-mono text-[11px] tracking-[0.2em] text-[#9499A6]">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-5 font-display text-[26px] leading-[1.1] tracking-[-0.025em]">{b.title}</h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-[#5B5E64]">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we are building */}
      <section className="bg-[#0D0E10] text-white">
        <div className={`${container} py-28 lg:py-36`}>
          <p className={eyebrowDark}>What we are building</p>

          <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-end">
            <h2 className="max-w-[18ch] font-display text-[clamp(2.4rem,4.2vw,4.2rem)] font-normal leading-[1.0] tracking-[-0.035em]">
              Four layers.
              <span className="block text-[#7D828C]">One knowledge layer.</span>
            </h2>
            <p className="max-w-[54ch] text-[16px] leading-[1.75] text-[#B7BBC3]">
              Scribe reads every document. The retrieval engine knows what each one says. Ontos knows how
              everything connects. Enclave turns all of it into answers people can check. Each layer stands on
              its own; together they make search a company can rely on.
            </p>
          </div>

          <ol className="mt-16 border-t border-[#25272C]">
            {layers.map((l, i) => (
              <li
                key={l.name}
                className="grid gap-4 border-b border-[#25272C] py-8 md:grid-cols-[48px_minmax(0,1fr)_minmax(0,1.6fr)] md:items-baseline md:gap-8 lg:grid-cols-[48px_minmax(0,1fr)_minmax(0,1.6fr)_220px]"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-[#5E636F]">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-display text-[28px] leading-[1.05] tracking-[-0.03em]">{l.name}</h3>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[#7D828C]">{l.role}</p>
                </div>
                <p className="max-w-[62ch] text-[15px] leading-[1.7] text-[#B7BBC3]">{l.body}</p>
                <span className="w-fit rounded-full border border-[#2E3138] px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[#C9CCD3] md:col-start-3 lg:col-start-auto lg:justify-self-end">
                  {l.status}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What we are shipping */}
      <section className="bg-[oklch(0.965_0_0)] text-[#111214]">
        <div className={`${container} py-28 lg:py-36`}>
          <p className={eyebrowLight}>What we are shipping</p>
          <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(2.2rem,4vw,3.8rem)] font-normal leading-[1.02] tracking-[-0.03em]">
            One honest release
            <span className="block text-[#737780]">at a time.</span>
          </h2>

          <ol className="mt-14 border-t border-[#CFCFCA]">
            {shipping.map((s) => (
              <li
                key={s.title}
                className="grid gap-4 border-b border-[#CFCFCA] py-7 md:grid-cols-[160px_minmax(0,1fr)_170px] md:items-baseline md:gap-10"
              >
                <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2">
                  <span className={`w-fit rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${stateStyle[s.state]}`}>
                    {s.state}
                  </span>
                  <span className="font-mono text-[11px] text-[#9499A6]">{s.when}</span>
                </div>
                <div>
                  <h3 className="text-[19px] font-semibold tracking-[-0.015em]">{s.title}</h3>
                  <p className="mt-2 max-w-[70ch] text-[15px] leading-[1.7] text-[#5B5E64]">{s.body}</p>
                </div>
                {s.link ? (
                  <a
                    href={s.link.href}
                    {...(s.link.external ? external : {})}
                    className="group inline-flex w-fit items-center gap-1.5 text-[13px] font-medium text-[#050608] hover:underline md:justify-self-end"
                  >
                    {s.link.label}
                    {s.link.external ? (
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                    )}
                  </a>
                ) : (
                  <span className="hidden md:block" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What we are looking for */}
      <section className="bg-[#0D0E10] text-white">
        <div className={`${container} py-28 lg:py-36`}>
          <p className={eyebrowDark}>What we are looking for</p>
          <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(2.6rem,5vw,5rem)] font-normal leading-[1.0] tracking-[-0.035em]">
            Build it with us.
          </h2>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[12px] border border-[#25272C] bg-[#25272C] md:grid-cols-3">
            {lookingFor.map((x) => (
              <div key={x.title} className="flex flex-col bg-[#0D0E10] p-8">
                <h3 className="font-display text-[26px] leading-[1.1] tracking-[-0.025em]">{x.title}</h3>
                <p className="mt-4 flex-1 text-[15px] leading-[1.7] text-[#B7BBC3]">{x.body}</p>
                <a
                  href={x.cta.href}
                  {...(x.cta.external ? external : {})}
                  className="group mt-8 inline-flex w-fit items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] text-white"
                >
                  {x.cta.label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                </a>
              </div>
            ))}
          </div>

          <div className="mt-20 flex flex-col items-start gap-8 border-t border-[#25272C] pt-14 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[24ch] font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.08] tracking-[-0.03em]">
              Every company deserves answers it can trust.
            </p>
            <div className="flex flex-col items-start gap-4">
              <a
                href={CAL_URL}
                className="group inline-flex h-[46px] items-center gap-2.5 rounded-[6px] bg-white px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0D0E10] transition hover:bg-[#E7E8EA]"
              >
                Talk to us
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </a>
              <Link href="/" className="text-[12px] font-medium text-[#8E939C] transition hover:text-white">
                Back to overview
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
