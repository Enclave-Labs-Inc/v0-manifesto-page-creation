'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

const CAL_URL = 'https://cal.com/shashank-bhardwaj-fwmii1/30min'

// Per-element reveal on viewport entry. Re-fires on scroll up + down.
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
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

type Theme = 'light' | 'dark'

type RevealProps = {
  className?: string
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'ul' | 'figure'
}

function Reveal({ className = '', children, as = 'div' }: RevealProps) {
  const Tag = as
  const { ref, inView } = useReveal<HTMLElement>()
  return (
    <Tag
      ref={ref as never}
      data-in-view={inView}
      className={`scroll-reveal ${className}`}
    >
      {children}
    </Tag>
  )
}

function SectionShell({
  id,
  theme,
  marker,
  eyebrow,
  children,
}: {
  id?: string
  theme: Theme
  marker?: string
  eyebrow: string
  children: React.ReactNode
}) {
  const isDark = theme === 'dark'
  const head = useReveal<HTMLDivElement>()

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${
        isDark
          ? 'bg-[oklch(0.095_0.006_145)] text-[#E8E9EC]'
          : 'bg-[oklch(0.98_0.001_145)] text-[#0a0b0d]'
      }`}
    >
      <div className="relative mx-auto max-w-[1320px] px-6 py-[clamp(4.5rem,8vw,7rem)] sm:px-10 lg:px-14">
        <div
          ref={head.ref}
          data-in-view={head.inView}
          className="scroll-reveal flex items-center gap-3"
        >
          {marker && (
            <span
              className={`flex h-7 min-w-7 items-center justify-center rounded-md border px-2 text-[10px] font-bold tracking-[0.18em] ${
                isDark
                  ? 'border-[#2A2D34] bg-[oklch(0.13_0.005_145)] text-[#9499A6]'
                  : 'border-[#D6DAE1] bg-white text-[#5E636F]'
              }`}
            >
              {marker}
            </span>
          )}
          <span
            className={`text-[11px] font-bold uppercase tracking-[0.34em] ${
              isDark ? 'text-[#787D8A]' : 'text-[#5E636F]'
            }`}
          >
            {eyebrow}
          </span>
        </div>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}

function Headline({
  theme,
  children,
  className = '',
}: {
  theme: Theme
  children: React.ReactNode
  className?: string
}) {
  return (
    <Reveal
      as="h2"
      className={`max-w-[24ch] text-[clamp(1.9rem,4.4vw,3.5rem)] font-bold leading-[1.06] tracking-[-0.04em] ${
        theme === 'dark' ? 'text-[#F4F5F7]' : 'text-[#050608]'
      } ${className}`}
    >
      {children}
    </Reveal>
  )
}

function P({
  theme,
  children,
  className = '',
}: {
  theme: Theme
  children: React.ReactNode
  className?: string
}) {
  return (
    <Reveal
      as="p"
      className={`max-w-[64ch] text-[15px] leading-[1.72] tracking-[-0.005em] ${
        theme === 'dark' ? 'text-[#9499A6]' : 'text-[#50545B]'
      } ${className}`}
    >
      {children}
    </Reveal>
  )
}

function strongCls(theme: Theme) {
  return theme === 'dark'
    ? 'font-bold text-[#F4F5F7]'
    : 'font-bold text-[#050608]'
}

function accentCls(theme: Theme) {
  return theme === 'dark'
    ? 'font-bold text-[oklch(0.74_0.14_162)]'
    : 'font-bold text-[oklch(0.5_0.12_162)]'
}

function Figure({
  src,
  alt,
  caption,
  theme,
}: {
  src: string
  alt: string
  caption: string
  theme: Theme
}) {
  const { ref, inView } = useReveal<HTMLElement>()
  const isDark = theme === 'dark'
  return (
    <figure ref={ref as never} data-in-view={inView} className="scroll-reveal">
      <div
        className={`overflow-hidden rounded-2xl border bg-white p-4 sm:p-6 ${
          isDark ? 'border-[#23262C]' : 'border-[#E0E3E8]'
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="mx-auto h-auto w-full max-w-[780px]"
        />
      </div>
      <figcaption
        className={`mt-3 text-[12px] tracking-[-0.005em] ${
          isDark ? 'text-[#787D8A]' : 'text-[#787D8A]'
        }`}
      >
        {caption}
      </figcaption>
    </figure>
  )
}

type Cell = { text: string; strong?: boolean; accent?: boolean }

function StatTable({
  theme,
  head,
  rows,
  align,
}: {
  theme: Theme
  head: string[]
  rows: Cell[][]
  align?: ('left' | 'right')[]
}) {
  const isDark = theme === 'dark'
  const { ref, inView } = useReveal<HTMLDivElement>()
  const colAlign = (i: number) => align?.[i] ?? (i === 0 ? 'left' : 'right')

  return (
    <div
      ref={ref}
      data-in-view={inView}
      className={`scroll-reveal overflow-hidden rounded-xl border ${
        isDark ? 'border-[#23262C]' : 'border-[#E0E3E8]'
      }`}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[460px] border-collapse text-left">
          <thead>
            <tr className={isDark ? 'bg-[oklch(0.13_0.005_145)]' : 'bg-[oklch(0.965_0.002_145)]'}>
              {head.map((h, i) => (
                <th
                  key={i}
                  className={`px-5 py-3.5 text-[10.5px] font-bold uppercase tracking-[0.16em] ${
                    isDark ? 'text-[#787D8A]' : 'text-[#787D8A]'
                  } ${colAlign(i) === 'right' ? 'text-right' : 'text-left'}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={`border-t px-5 py-3.5 text-[14px] tracking-[-0.005em] ${
                      isDark ? 'border-[#1E2127]' : 'border-[#ECEEF1]'
                    } ${colAlign(c) === 'right' ? 'text-right tabular-nums' : 'text-left'} ${
                      cell.accent
                        ? accentCls(theme)
                        : cell.strong
                          ? strongCls(theme)
                          : isDark
                            ? 'text-[#B4B8C2]'
                            : 'text-[#3D414A]'
                    }`}
                  >
                    {cell.text}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Callout({
  theme,
  label,
  children,
  className = '',
}: {
  theme: Theme
  label?: string
  children: React.ReactNode
  className?: string
}) {
  const isDark = theme === 'dark'
  return (
    <Reveal
      as="div"
      className={`rounded-2xl border p-6 sm:p-7 ${
        isDark
          ? 'border-[#23262C] bg-[oklch(0.115_0.005_145)]'
          : 'border-[#E0E3E8] bg-[oklch(0.995_0.001_145)]'
      } ${className}`}
    >
      {label && (
        <p
          className={`mb-3 text-[10px] font-bold uppercase tracking-[0.28em] ${
            isDark ? 'text-[#787D8A]' : 'text-[#9499A6]'
          }`}
        >
          {label}
        </p>
      )}
      {children}
    </Reveal>
  )
}

function ProveItem({ theme, children }: { theme: Theme; children: React.ReactNode }) {
  const { ref, inView } = useReveal<HTMLLIElement>()
  const isDark = theme === 'dark'
  return (
    <li
      ref={ref}
      data-in-view={inView}
      className="scroll-reveal flex items-start gap-4"
    >
      <span
        className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
          isDark
            ? 'bg-[oklch(0.2_0.05_162)] text-[oklch(0.78_0.14_162)]'
            : 'bg-[oklch(0.93_0.05_162)] text-[oklch(0.5_0.12_162)]'
        }`}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
      </span>
      <span
        className={`max-w-[64ch] text-[15px] leading-[1.7] tracking-[-0.005em] ${
          isDark ? 'text-[#B4B8C2]' : 'text-[#3D414A]'
        }`}
      >
        {children}
      </span>
    </li>
  )
}

function NoteItem({ theme, children }: { theme: Theme; children: React.ReactNode }) {
  const { ref, inView } = useReveal<HTMLLIElement>()
  const isDark = theme === 'dark'
  return (
    <li
      ref={ref}
      data-in-view={inView}
      className="scroll-reveal flex items-start gap-4"
    >
      <span
        className={`mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full ${
          isDark ? 'bg-[#5E636F]' : 'bg-[#9CA2AD]'
        }`}
      />
      <span
        className={`max-w-[66ch] text-[15px] leading-[1.7] tracking-[-0.005em] ${
          isDark ? 'text-[#9499A6]' : 'text-[#50545B]'
        }`}
      >
        {children}
      </span>
    </li>
  )
}

// ============================================================================
// Hero
// ============================================================================
function ReleaseHero() {
  const eyebrow = useReveal<HTMLDivElement>()
  const tags = useReveal<HTMLDivElement>()
  const headline = useReveal<HTMLHeadingElement>()
  const lead = useReveal<HTMLParagraphElement>()
  const cta = useReveal<HTMLDivElement>()
  const meta = useReveal<HTMLDivElement>()

  return (
    <section className="relative overflow-hidden bg-[oklch(0.98_0.001_145)] text-[#0a0b0d]">
      <div className="relative mx-auto max-w-[1320px] px-6 pb-[clamp(3.5rem,6vw,5rem)] pt-[clamp(6rem,11vw,9rem)] sm:px-10 lg:px-14">
        <Link
          href="/releases"
          className="group mb-8 inline-flex items-center gap-2 text-[12px] font-bold tracking-[-0.01em] text-[#5E636F] transition-colors duration-200 hover:text-[#07080A]"
        >
          <ArrowLeft
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
            strokeWidth={2}
          />
          All releases
        </Link>

        <div
          ref={eyebrow.ref}
          data-in-view={eyebrow.inView}
          className="scroll-reveal flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.34em] text-[#5E636F]"
        >
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[oklch(0.63_0.16_162)]" />
          Release v0.0.1 · 27 May 2026
        </div>

        <div
          ref={tags.ref}
          data-in-view={tags.inView}
          className="scroll-reveal mt-6 flex flex-wrap gap-2"
        >
          {['Benchmark', 'Retrieval engine', 'Part 1'].map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-[#D6DAE1] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#5E636F]"
            >
              {t}
            </span>
          ))}
        </div>

        <h1
          ref={headline.ref}
          data-in-view={headline.inView}
          className="scroll-reveal mt-7 max-w-[18ch] text-[clamp(2.4rem,6vw,5.2rem)] font-bold leading-[1.02] tracking-[-0.05em] text-[#050608]"
        >
          Sovereign search at scale.
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">A detailed benchmark.</span>
        </h1>

        <p
          ref={lead.ref}
          data-in-view={lead.inView}
          className="scroll-reveal mt-8 max-w-[62ch] text-[clamp(1rem,1.3vw,1.18rem)] leading-[1.55] tracking-[-0.015em] text-[#50545B]"
        >
          A regulated organisation&rsquo;s AI tools die in security review
          because their data legally cannot leave the perimeter. Enclave is
          built so it doesn&rsquo;t have to. This report covers exactly what we
          tested to prove it, on what data, and the numbers, including the bug
          we found and the claim we retired.
        </p>

        <div
          ref={cta.ref}
          data-in-view={cta.inView}
          className="scroll-reveal mt-10 flex flex-wrap items-center gap-3.5"
        >
          <a
            href={CAL_URL}
            className="group inline-flex h-[48px] items-center gap-2.5 rounded-[10px] bg-[#050608] px-7 text-[13.5px] font-bold tracking-[-0.02em] text-[oklch(0.985_0.002_145)] shadow-[0_16px_40px_oklch(0.12_0.006_145/0.28),inset_0_1px_0_oklch(1_0_0/0.12)] transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#17191D] active:scale-[0.985]"
          >
            Scrutinise it with us
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </a>
          <Link
            href="/manifesto"
            className="group inline-flex h-[48px] items-center gap-2.5 rounded-[10px] border border-[oklch(0.86_0.006_145/0.82)] bg-[oklch(0.99_0.002_145/0.76)] px-7 text-[13.5px] font-bold tracking-[-0.02em] text-[#111214] backdrop-blur-xl transition-[background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[oklch(0.78_0.008_145)] hover:bg-[oklch(1_0_0/0.92)] active:scale-[0.985]"
          >
            Read the manifesto
          </Link>
        </div>

        <div
          ref={meta.ref}
          data-in-view={meta.inView}
          className="scroll-reveal mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] font-bold tracking-[-0.01em] text-[#555B64]"
        >
          {['FiQA-2018 (BEIR)', '1M-chunk synthetic corpus', 'Real AWS S3'].map(
            (m, i, arr) => (
              <span key={m} className="inline-flex items-center gap-3">
                {m}
                {i < arr.length - 1 && <span className="text-[#C2C7CF]">·</span>}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Content
// ============================================================================
export default function ReleasesContent() {
  return (
    <>
      <ReleaseHero />

      {/* Why this report exists */}
      <SectionShell theme="dark" eyebrow="Why this report exists">
        <Headline theme="dark">
          We benchmarked the one question
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">a CISO always asks.</span>
        </Headline>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-14">
          <P theme="dark">
            Enclave deploys AI retrieval{' '}
            <span className={strongCls('dark')}>
              inside the customer&rsquo;s own cloud account
            </span>
            . The search index lives on the customer&rsquo;s object storage; the
            customer holds the keys; Enclave principals are architecturally
            excluded from key policy. There is no Enclave-operated service
            holding the customer&rsquo;s data.
          </P>
          <P theme="dark">
            That design invites a fair, direct challenge from any CISO, platform
            engineer, or technical investor evaluating us. So we put it to the
            test on public datasets, on a synthetic corpus scaled to a million
            chunks, and on real AWS S3.
          </P>
        </div>

        <Reveal as="div" className="my-12 max-w-[62ch]">
          <span
            aria-hidden
            className="block select-none text-[64px] font-bold leading-[0.5] text-[oklch(0.32_0.03_162)]"
          >
            &ldquo;
          </span>
          <p className="mt-2 text-[clamp(1.25rem,2.6vw,1.85rem)] font-bold leading-[1.32] tracking-[-0.025em] text-[#E4E7EC]">
            If the index lives on the customer&rsquo;s object storage instead of
            in memory, doesn&rsquo;t search get slow and expensive as the corpus
            grows? Doesn&rsquo;t sovereignty cost you speed?
          </p>
        </Reveal>

        <P theme="dark" className="mb-10">
          We&rsquo;re publishing the methodology, the results, and the things
          that didn&rsquo;t work, because for a company whose entire promise is{' '}
          <span className={strongCls('dark')}>trust the architecture</span>,
          only a benchmark a CISO can scrutinise is worth anything.
        </P>

        <Callout theme="dark" label="A clarification on framing">
          <p className="max-w-[68ch] text-[15px] leading-[1.72] tracking-[-0.005em] text-[#B4B8C2]">
            Our moat is{' '}
            <span className={strongCls('dark')}>sovereignty</span>, not raw
            retrieval quality. We use a standard embedding model, the same
            retrieval-quality component every vendor uses. We are not claiming to
            win an embedding leaderboard. We are claiming something different
            and, for our buyer, more important:{' '}
            <span className={strongCls('dark')}>
              competitive retrieval that runs entirely inside the
              customer&rsquo;s perimeter, fast and cheap, at scale.
            </span>
          </p>
        </Callout>
      </SectionShell>

      {/* What we tested */}
      <SectionShell theme="light" eyebrow="What we tested">
        <Headline theme="light">
          Five tests. Public data,
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">synthetic scale, and real S3.</span>
        </Headline>

        <div className="mt-10">
          <StatTable
            theme="light"
            head={['Test', 'Data', 'Scale', 'What it measured']}
            align={['left', 'left', 'left', 'left']}
            rows={[
              [
                { text: 'Scale curve', strong: true },
                { text: 'Synthetic 768-d vectors' },
                { text: '100K → 1M chunks' },
                { text: 'Latency, bytes-per-query, memory as corpus grows' },
              ],
              [
                { text: 'Real-data quality', strong: true },
                { text: 'FiQA-2018 (BEIR)' },
                { text: '57,638 chunks' },
                { text: 'Recall@20, NDCG, vs. an in-memory baseline' },
              ],
              [
                { text: 'Permission-aware retrieval', strong: true },
                { text: 'FiQA + SciFact + NFCorpus' },
                { text: '4 configurations' },
                { text: 'Recall under heavy permission restriction' },
              ],
              [
                { text: 'Real-S3 latency', strong: true },
                { text: 'FiQA-2018 on AWS S3' },
                { text: '57,638 chunks' },
                { text: 'End-to-end latency on actual object storage' },
              ],
              [
                { text: 'Edge-cache validation', strong: true },
                { text: 'FiQA-2018 on AWS S3' },
                { text: '57,638 chunks' },
                { text: 'Cache impact on warm and cold latency' },
              ],
            ]}
          />
        </div>

        <Callout theme="light" label="Methodology · held constant" className="mt-8">
          <div className="mb-4 flex flex-wrap gap-2">
            {['ef = 200', 'M = 16', 'top_k = 20', 'dim = 768'].map((c) => (
              <span
                key={c}
                className="inline-flex items-center rounded-md border border-[#D6DAE1] bg-white px-2.5 py-1 font-mono text-[11px] font-bold tracking-[-0.01em] text-[#3D414A]"
              >
                {c}
              </span>
            ))}
          </div>
          <p className="max-w-[72ch] text-[14px] leading-[1.7] tracking-[-0.005em] text-[#50545B]">
            HNSW search throughout. Embeddings generated with a{' '}
            <span className={strongCls('light')}>fully local</span> model
            (nomic-embed-text-v2-moe via Ollama), no external API anywhere in the
            pipeline, consistent with the sovereign architecture. Public datasets
            from the BEIR benchmark suite. The harness lives in our repository
            under{' '}
            <span className="font-mono text-[13px] text-[#3D414A]">
              benchmarks/
            </span>
            , and every number here is generated directly from its JSON output.
            Test runs from a developer laptop unless stated otherwise;
            cross-region (laptop → us-east-1) where storage is real S3.
          </p>
        </Callout>
      </SectionShell>

      {/* Result 1 */}
      <SectionShell theme="dark" marker="01" eyebrow="Result · Storage I/O">
        <Headline theme="dark">
          Bytes read per query stays flat
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">as the corpus grows 10×.</span>
        </Headline>

        <Reveal as="div" className="mt-9 flex flex-wrap gap-x-14 gap-y-6">
          <div>
            <p className="text-[clamp(2rem,4vw,2.9rem)] font-bold tracking-[-0.03em] text-[#F4F5F7]">
              ~13 KB
            </p>
            <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.2em] text-[#787D8A]">
              read per query
            </p>
          </div>
          <div>
            <p className="text-[clamp(2rem,4vw,2.9rem)] font-bold tracking-[-0.03em] text-[oklch(0.74_0.14_162)]">
              1.04×
            </p>
            <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.2em] text-[#787D8A]">
              I/O for 10× the data
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Figure
            theme="dark"
            src="/releases/01_bytes_per_query.svg"
            alt="Bytes read per query stays near-flat from 100K to 1M chunks"
            caption="Synthetic corpus · 100,000 → 1,000,000 chunks."
          />
          <div className="space-y-5">
            <P theme="dark">
              At 100,000 chunks, a query reads{' '}
              <span className={strongCls('dark')}>13,089 bytes</span> from
              storage. At 1,000,000 chunks, ten times the corpus, a query reads{' '}
              <span className={strongCls('dark')}>13,609 bytes</span>. The number
              of distinct storage reads per query is near-constant: about 204
              reads at 100K, about 213 at 1M, each one small (~64 bytes).
            </P>
            <P theme="dark">
              For a sovereign deployment, this is the entire game. The index can
              sit on the customer&rsquo;s object storage at any scale, and each
              query still costs roughly 13 KB of byte-range reads. It is the
              property that makes sovereign-on-storage retrieval economically
              viable at sizes where holding everything in RAM is not.
            </P>
          </div>
        </div>
      </SectionShell>

      {/* Result 2 */}
      <SectionShell theme="light" marker="02" eyebrow="Result · Edge cache">
        <Headline theme="light">
          The layer-0 edge cache:
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">~53 seconds to under 1 ms.</span>
        </Headline>

        <P theme="light" className="mt-8">
          This is the result we are proudest of, because of how we arrived at it.
          When we first ran the benchmark on real AWS S3 (FiQA, 57,638 chunks,
          us-east-1), queries took approximately 53 seconds. Warm and cold
          latency were essentially identical, a clear signal that something was
          structurally wrong. Investigation surfaced a missing cache layer for a
          specific class of storage reads. We added the cache.
        </P>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Figure
            theme="light"
            src="/releases/06_cache_impact.png"
            alt="Warm query p50 dropped from 52.8 seconds to 0.96 ms after the cache"
            caption="Warm query p50, before vs after the layer-0 cache (log scale)."
          />
          <div className="space-y-6">
            <StatTable
              theme="light"
              head={['', 'Before', 'After (warm)']}
              rows={[
                [
                  { text: 'Warm query p50' },
                  { text: '52,835 ms' },
                  { text: '0.96 ms', accent: true },
                ],
                [
                  { text: 'Cache hit rate' },
                  { text: '0%' },
                  { text: '100%', accent: true },
                ],
                [
                  { text: 'Bytes-per-query' },
                  { text: '~13 KB' },
                  { text: '~13 KB', strong: true },
                ],
              ]}
            />
            <P theme="light">
              Roughly a{' '}
              <span className={accentCls('light')}>55,000× improvement</span>.
              Bytes-per-query stayed identical, because the cache changes where
              repeated reads are served from, not what the engine reads off
              storage.
            </P>
          </div>
        </div>

        <P theme="light" className="mt-10">
          The reason we publish this first is not the latency number; it is the
          path to it. The benchmark caught a real product gap. We fixed it
          transparently, re-measured, and report both the before and the after.
          For a sovereignty company, that loop is the most important thing we can
          show.
        </P>
      </SectionShell>

      {/* Result 3 */}
      <SectionShell theme="dark" marker="03" eyebrow="Result · Latency profile">
        <Headline theme="dark">
          The full latency profile,
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">and what we&rsquo;re honest about.</span>
        </Headline>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Figure
            theme="dark"
            src="/releases/07_latency_profile.png"
            alt="Warm latency is sub-millisecond; cold p99 is a first-touch partition fetch"
            caption="Warm vs cold latency across percentiles, real S3 (log scale)."
          />
          <div className="space-y-6">
            <StatTable
              theme="dark"
              head={['Pctile', 'Warm', 'Cold']}
              rows={[
                [
                  { text: 'p50' },
                  { text: '0.96 ms', accent: true },
                  { text: '2.31 ms' },
                ],
                [
                  { text: 'p90' },
                  { text: '1.30 ms', accent: true },
                  { text: '3.96 ms' },
                ],
                [
                  { text: 'p99' },
                  { text: '1.87 ms', accent: true },
                  { text: '26,653 ms', strong: true },
                ],
              ]}
            />
            <P theme="dark">
              Warm latency is excellent across all percentiles. Cold p50 and p90
              are low single-digit milliseconds; the cache absorbs most cold
              queries because they hit edge partitions a prior query already
              pulled.
            </P>
          </div>
        </div>

        <Callout theme="dark" label="Cold p99 · the honest part" className="mt-10">
          <p className="max-w-[72ch] text-[15px] leading-[1.72] tracking-[-0.005em] text-[#B4B8C2]">
            Cold p99 is 26 seconds, and we want to be direct about what that is.
            It captures first-touch reads: the first time a query needs a graph
            region that isn&rsquo;t cached yet, the engine fetches a 64 MB edge
            partition from S3. From a laptop reading cross-region to us-east-1
            over a residential network, that single fetch takes seconds. This
            number is{' '}
            <span className={strongCls('dark')}>pessimistic by test design</span>
            . A production deployment runs Enclave inside the customer&rsquo;s own
            region, co-located with their S3, where that fetch is intra-region.
            We report the laptop number because it is what we measured; the
            in-region number will be materially lower, and we will publish it
            when we run it.
          </p>
        </Callout>
      </SectionShell>

      {/* Result 4 */}
      <SectionShell theme="light" marker="04" eyebrow="Result · Retrieval quality">
        <Headline theme="light">
          Retrieval quality is competitive
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">on real benchmark data.</span>
        </Headline>

        <P theme="light" className="mt-8">
          Synthetic random vectors measure cost well, but they are meaningless
          for quality. So quality was measured separately on FiQA-2018
          (financial-domain question answering from the BEIR suite): 57,638
          corpus chunks, embedded with the fully local model described above.
        </P>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Figure
            theme="light"
            src="/releases/04_fiqa_quality_latency.svg"
            alt="FiQA recall, NDCG, and end-to-end latency vs an in-memory baseline"
            caption="FiQA-2018 · sovereign engine vs in-memory baseline."
          />
          <div className="space-y-6">
            <StatTable
              theme="light"
              head={['Metric', 'Enclave', 'In-memory']}
              rows={[
                [
                  { text: 'Recall@20' },
                  { text: '0.497', accent: true },
                  { text: '0.518' },
                ],
                [
                  { text: 'NDCG@10' },
                  { text: '0.330', strong: true },
                  { text: '(comparable)' },
                ],
                [
                  { text: 'Hybrid latency' },
                  { text: '59 ms', accent: true },
                  { text: '169 ms' },
                ],
              ]}
            />
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-12">
          <Callout theme="light" label="Reading 1 · Quality">
            <p className="text-[14.5px] leading-[1.7] tracking-[-0.005em] text-[#50545B]">
              Enclave&rsquo;s recall@20 is within roughly 2 points of the
              in-memory baseline. The sovereign architecture does not cost a
              meaningful amount of retrieval quality. We are slightly behind on
              recall, and we report that plainly rather than rounding it away.
            </p>
          </Callout>
          <Callout theme="light" label="Reading 2 · Latency">
            <p className="text-[14.5px] leading-[1.7] tracking-[-0.005em] text-[#50545B]">
              End-to-end latency is favourable here (59 ms vs 169 ms). We treat
              this directionally rather than as a universal &ldquo;3× faster&rdquo;
              claim. The headline we stand behind is parity-on-quality plus the
              sovereignty guarantee the baseline cannot offer.
            </p>
          </Callout>
        </div>
      </SectionShell>

      {/* Result 5 */}
      <SectionShell theme="dark" marker="05" eyebrow="Result · The retired claim">
        <Headline theme="dark">
          A claim we tested
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">and then retired.</span>
        </Headline>

        <P theme="dark" className="mt-8">
          This is the part most companies wouldn&rsquo;t publish. We&rsquo;re
          publishing it because it is exactly what makes the rest of this report
          trustworthy. We hypothesised that filtering permissions{' '}
          <span className={strongCls('dark')}>during</span> the search would
          preserve recall under heavy restriction better than a post-filter
          approach that retrieves a fixed pool and filters afterward.
        </P>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Figure
            theme="dark"
            src="/releases/05_retired_acl_claim.svg"
            alt="Recall delta between during-traversal filtering and post-filter is negligible"
            caption="Recall delta across four configurations, 1% permission restriction."
          />
          <div className="space-y-5">
            <P theme="dark">
              We tested four controlled configurations on FiQA: random versus
              semantically clustered permission sets, brute-force versus HNSW
              baselines, post-filter pools of 50 / 100 / 400.
            </P>
            <P theme="dark">
              Across{' '}
              <span className={strongCls('dark')}>every</span> configuration the
              recall difference was{' '}
              <span className={accentCls('dark')}>+0.001 or smaller</span>. No
              measurable advantage.
            </P>
          </div>
        </div>

        <P theme="dark" className="mt-10">
          So we retired the claim. Permission filtering in Enclave is correct, a
          restricted user only ever sees permitted results, it simply achieves
          the same recall as the simpler approach, not better. Finding this on
          public data, privately, was the benchmark doing its job: it caught an
          unsupported claim before it ever reached a customer&rsquo;s security
          review.
        </P>
      </SectionShell>

      {/* What this proves */}
      <SectionShell theme="light" eyebrow="What this proves">
        <Headline theme="light">
          What these numbers prove
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">about engine credibility.</span>
        </Headline>

        <ul className="mt-10 space-y-5">
          <ProveItem theme="light">
            <span className={strongCls('light')}>
              Sovereign-scale retrieval is real.
            </span>{' '}
            Approximately 13 KB read per query, near-flat across a 10× corpus
            increase, on object storage.
          </ProveItem>
          <ProveItem theme="light">
            <span className={strongCls('light')}>
              Warm retrieval is sub-millisecond on real AWS S3
            </span>{' '}
            once the partition cache is hot, verified end-to-end against an
            actual S3 bucket.
          </ProveItem>
          <ProveItem theme="light">
            <span className={strongCls('light')}>
              The system survived a real bug, found and fixed transparently.
            </span>{' '}
            The cache gap was surfaced by the benchmark, fixed, and re-measured.
            The 55,000× improvement is real, and so is the discovery process.
          </ProveItem>
          <ProveItem theme="light">
            <span className={strongCls('light')}>
              Retrieval quality is competitive
            </span>{' '}
            with an in-memory baseline (recall@20 0.497 vs 0.518 on FiQA), using
            a fully local embedding pipeline.
          </ProveItem>
          <ProveItem theme="light">
            <span className={strongCls('light')}>
              We retire claims that don&rsquo;t hold up.
            </span>{' '}
            Honesty is part of the architecture, not a footnote on it.
          </ProveItem>
        </ul>

        <P theme="light" className="mt-10">
          A hosted vector database can absolutely be fast, by holding the
          customer&rsquo;s index in its memory, in its cloud, under its keys. The
          thing it structurally cannot do is keep the index inside the
          customer&rsquo;s perimeter. These numbers are the evidence that doing
          it the sovereign way doesn&rsquo;t force a meaningful tradeoff on speed.
        </P>
      </SectionShell>

      {/* Honesty + roadmap */}
      <SectionShell theme="dark" eyebrow="Honesty & what's next">
        <Headline theme="dark">
          What we&rsquo;re honest about,
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">and what comes next.</span>
        </Headline>

        <ul className="mt-10 space-y-5">
          <NoteItem theme="dark">
            Cold p99 was measured cross-region from a laptop, a deliberately
            pessimistic network path. The co-located, in-region number will be
            materially lower, and we will publish it when we run it.
          </NoteItem>
          <NoteItem theme="dark">
            Scale was tested to 1,000,000 chunks, not 10 million. The
            architecture is designed to extend further; we claim what we
            measured.
          </NoteItem>
          <NoteItem theme="dark">
            There are engine optimisations on the roadmap that should further
            reduce cold-cache latency. Those land in the next product cycle.
          </NoteItem>
          <NoteItem theme="dark">
            Quality is proven on clean public data (FiQA). Real enterprise
            documents, messier and domain-specific, are the next and more
            important test.
          </NoteItem>
        </ul>

        <Callout theme="dark" label="Part 2 · the benchmark that matters most" className="mt-10">
          <p className="max-w-[72ch] text-[15px] leading-[1.72] tracking-[-0.005em] text-[#C5C9D2]">
            The full pipeline, ingestion, embedding, retrieval, answer, running
            on a real ~1,200-document enterprise corpus inside a real deployment.
            This report is Part 1: the retrieval engine on public data. Part 2
            will be the full system on real enterprise data. We&rsquo;ll publish
            it when it lands.
          </p>
        </Callout>
      </SectionShell>

      {/* Summary + CTA */}
      <SectionShell theme="light" eyebrow="The two-sentence summary">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Callout theme="light" label="For a regulated buyer">
            <p className="text-[15px] leading-[1.72] tracking-[-0.005em] text-[#3D414A]">
              Enclave delivers competitive retrieval quality, sub-millisecond
              warm latency, and ~13 KB of storage I/O per query, running entirely
              inside your own perimeter, against your own object storage, with
              your own keys. The benchmark above is the evidence that doing it
              the sovereign way does not cost you speed.
            </p>
          </Callout>
          <Callout theme="light" label="For an engineer reading this">
            <p className="text-[15px] leading-[1.72] tracking-[-0.005em] text-[#3D414A]">
              The methodology, the harness, and the raw JSON for every number
              above are in our repository. We retire claims that don&rsquo;t
              hold. We publish the loop, not just the headline.
            </p>
          </Callout>
        </div>

        <Reveal as="div" className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href={CAL_URL}
            className="group inline-flex h-[52px] items-center gap-3 rounded-[11px] bg-[#050608] px-8 text-[14px] font-bold tracking-[-0.02em] text-[oklch(0.985_0.002_145)] shadow-[0_18px_44px_oklch(0.12_0.006_145/0.22),inset_0_1px_0_oklch(1_0_0/0.12)] transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#17191D] active:scale-[0.985]"
          >
            Run the suite on your corpus
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </a>
          <a
            href="mailto:contact@getenclav.ai"
            className="text-[13px] font-bold tracking-[-0.01em] text-[#45484E] transition-colors duration-200 hover:text-[#07080A]"
          >
            contact@getenclav.ai
          </a>
        </Reveal>

        <Reveal
          as="p"
          className="mt-10 max-w-[64ch] text-[14px] leading-[1.7] tracking-[-0.005em] text-[#787D8A]"
        >
          If you are evaluating sovereign AI for a regulated environment and want
          to scrutinise this benchmark, or run the suite on your own corpus,
          we&rsquo;d welcome the conversation.
        </Reveal>
      </SectionShell>
    </>
  )
}
