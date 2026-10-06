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
          ? 'bg-[oklch(0.095_0_0)] text-[#E8E9EC]'
          : 'bg-[oklch(0.965_0_0)] text-[#0a0b0d]'
      }`}
    >
      <div className="relative mx-auto max-w-[1320px] px-6 py-[clamp(4.5rem,8vw,7rem)] sm:px-10 lg:px-14">
        <div
          ref={head.ref}
          data-in-view={head.inView}
          className={`scroll-reveal inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 backdrop-blur-md ${
            isDark
              ? 'border-[oklch(1_0_0/0.15)] bg-[oklch(1_0_0/0.06)]'
              : 'border-[oklch(0.86_0_0/0.9)] bg-[oklch(1_0_0/0.65)]'
          }`}
        >
          {marker && (
            <>
              <span
                className={`font-mono text-[11px] tracking-[0.14em] ${
                  isDark ? 'text-[#9499A6]' : 'text-[#5E636F]'
                }`}
              >
                {marker}
              </span>
              <span
                className={`h-[10px] w-px ${isDark ? 'bg-[oklch(1_0_0/0.2)]' : 'bg-[#C7CCD4]'}`}
                aria-hidden
              />
            </>
          )}
          <span
            className={`font-mono text-[11px] tracking-[0.14em] ${
              isDark ? 'text-[#E4E7EC]' : 'text-[#2E3238]'
            }`}
          >
            {eyebrow.toUpperCase()}
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
      className={`font-display max-w-[24ch] text-[clamp(1.8rem,3.8vw,3rem)] font-normal leading-[1.08] tracking-[-0.02em] ${
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
    ? 'font-medium text-[#F4F5F7]'
    : 'font-medium text-[#050608]'
}

function accentCls(theme: Theme) {
  return theme === 'dark'
    ? 'font-medium text-[oklch(0.74_0.14_162)]'
    : 'font-medium text-[oklch(0.5_0.12_162)]'
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
            <tr className={isDark ? 'bg-[oklch(0.13_0_0)]' : 'bg-[oklch(0.965_0_0)]'}>
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
          ? 'border-[#23262C] bg-[oklch(0.115_0_0)]'
          : 'border-[#E0E3E8] bg-[oklch(0.995_0_0)]'
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
  const headline = useReveal<HTMLHeadingElement>()
  const lead = useReveal<HTMLParagraphElement>()
  const tags = useReveal<HTMLDivElement>()
  const cta = useReveal<HTMLDivElement>()
  const meta = useReveal<HTMLDivElement>()

  return (
    <section className="relative overflow-hidden bg-[oklch(0.965_0_0)] text-[#050608]">
      {/* Radial mesh — same warm morning-mist palette used on the landing
          hero, so the document opens into the same visual world. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_140%_at_-5%_50%,oklch(0.965_0_0/0.5)_0%,oklch(0.965_0_0/0.2)_40%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_10%,oklch(0.92_0.02_75/0.18)_0%,transparent_55%)]"
      />

      <div className="relative z-[1] mx-auto max-w-[1440px] px-5 pb-[clamp(3.5rem,6vw,5rem)] pt-[clamp(6rem,11vw,9rem)] sm:px-10 lg:px-14">
        <div className="mb-10">
          <Link
            href="/releases"
            className="group inline-flex items-center gap-2 text-[12px] font-medium tracking-[-0.005em] text-[#5E636F] transition-colors duration-200 hover:text-[#050608]"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
              strokeWidth={2}
            />
            All releases
          </Link>
        </div>

        <div
          ref={eyebrow.ref}
          data-in-view={eyebrow.inView}
          className="scroll-reveal inline-flex items-center gap-2.5 rounded-full border border-[oklch(0.86_0_0/0.9)] bg-[oklch(1_0_0/0.65)] px-3.5 py-1.5 backdrop-blur-md"
        >
          <span className="font-mono text-[11px] tracking-[0.14em] text-[#5E636F]">v0.0.1</span>
          <span className="h-[10px] w-px bg-[#C7CCD4]" aria-hidden />
          <span className="font-mono text-[11px] tracking-[0.14em] text-[#2E3238]">27 MAY 2026</span>
        </div>

        <h1
          ref={headline.ref}
          data-in-view={headline.inView}
          className="scroll-reveal font-display mt-6 max-w-[20ch] text-[clamp(2.2rem,5vw,4.4rem)] font-normal leading-[1.04] tracking-[-0.02em] text-[#050608]"
        >
          <span className="block">Search that stays in your environment.</span>
          <span className="block text-[#3A3D43]">A detailed benchmark.</span>
        </h1>

        <p
          ref={lead.ref}
          data-in-view={lead.inView}
          className="scroll-reveal mt-7 max-w-[62ch] text-[15px] leading-[1.65] tracking-[-0.005em] text-[#3D414A] sm:text-[16px]"
        >
          We built this benchmark to see how Enclave performs with real data,
          real storage, and the same constraints our customers care about. This
          report shows what we tested, the numbers we got, what we fixed along
          the way, and one claim the results didn&rsquo;t support.
        </p>

        <div
          ref={tags.ref}
          data-in-view={tags.inView}
          className="scroll-reveal mt-7 flex flex-wrap gap-2"
        >
          {['Benchmark', 'Retrieval engine', 'Part 1'].map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-[#D6DAE1] bg-white/70 px-3 py-1 font-mono text-[10.5px] tracking-[0.14em] text-[#3D414A] backdrop-blur-sm"
            >
              {t.toUpperCase()}
            </span>
          ))}
        </div>

        <div
          ref={cta.ref}
          data-in-view={cta.inView}
          className="scroll-reveal mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/manifesto"
            className="text-[12px] font-medium tracking-[-0.005em] text-[#3D414A] transition-colors duration-200 hover:text-[#050608]"
          >
            Read the manifesto →
          </Link>
        </div>

        <div
          ref={meta.ref}
          data-in-view={meta.inView}
          className="scroll-reveal mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10.5px] tracking-[0.14em] text-[#5E636F]"
        >
          {['FiQA-2018 (BEIR)', '1M-CHUNK SYNTHETIC CORPUS', 'REAL AWS S3'].map(
            (m, i, arr) => (
              <span key={m} className="inline-flex items-center gap-5">
                {m.toUpperCase()}
                {i < arr.length - 1 && <span className="text-[#C7CCD4]">·</span>}
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
            pipeline, so the test uses no external model API. Public datasets
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

      {/* Key results */}
      <SectionShell theme="light" eyebrow="Key results">
        <Headline theme="light">
          The numbers that
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">came out of the tests.</span>
        </Headline>

        <div className="mt-10 grid gap-x-12 gap-y-0 border-t border-[#D6DAE1] lg:grid-cols-2">
          <div className="border-b border-[#D6DAE1] py-7 lg:pr-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7F848F]">
              Storage I/O
            </p>
            <p className="mt-3 text-[clamp(1.8rem,3vw,2.6rem)] font-bold tracking-[-0.03em] text-[#050608]">
              ~13 KB / query
            </p>
            <p className="mt-3 max-w-[54ch] text-[14px] leading-[1.7] text-[#50545B]">
              13,089 bytes at 100K chunks and 13,609 bytes at 1M chunks.
              Ten times more data increased storage I/O by only 1.04×.
            </p>
          </div>

          <div className="border-b border-[#D6DAE1] py-7 lg:pl-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7F848F]">
              Edge cache
            </p>
            <p className="mt-3 text-[clamp(1.8rem,3vw,2.6rem)] font-bold tracking-[-0.03em] text-[#050608]">
              52,835 ms → 0.96 ms
            </p>
            <p className="mt-3 max-w-[54ch] text-[14px] leading-[1.7] text-[#50545B]">
              Warm p50 dropped after adding the missing cache layer.
              Bytes read per query remained roughly 13 KB.
            </p>
          </div>

          <div className="border-b border-[#D6DAE1] py-7 lg:pr-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7F848F]">
              Warm latency
            </p>
            <p className="mt-3 text-[clamp(1.8rem,3vw,2.6rem)] font-bold tracking-[-0.03em] text-[#050608]">
              p99 1.87 ms
            </p>
            <p className="mt-3 max-w-[54ch] text-[14px] leading-[1.7] text-[#50545B]">
              Warm p50 / p90 / p99 measured 0.96 / 1.30 / 1.87 ms.
              Cold p99 was 26.7 s because the test fetched an uncached 64 MB
              partition cross-region from a laptop.
            </p>
          </div>

          <div className="border-b border-[#D6DAE1] py-7 lg:pl-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7F848F]">
              Retrieval quality
            </p>
            <p className="mt-3 text-[clamp(1.8rem,3vw,2.6rem)] font-bold tracking-[-0.03em] text-[#050608]">
              0.497 Recall@20
            </p>
            <p className="mt-3 max-w-[54ch] text-[14px] leading-[1.7] text-[#50545B]">
              The in-memory baseline measured 0.518. Enclave measured
              NDCG@10 of 0.330 and 59 ms hybrid latency versus 169 ms for
              the baseline in this test.
            </p>
          </div>

          <div className="border-b border-[#D6DAE1] py-7 lg:col-span-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7F848F]">
              Claim retired
            </p>
            <p className="mt-3 text-[clamp(1.5rem,2.5vw,2.2rem)] font-bold tracking-[-0.03em] text-[#050608]">
              No measurable recall advantage from during-search permission filtering.
            </p>
            <p className="mt-3 max-w-[72ch] text-[14px] leading-[1.7] text-[#50545B]">
              Across four controlled configurations, the recall difference was
              +0.001 or smaller. The permission filtering remains correct, but
              the benchmark did not support the recall-improvement claim, so we
              retired it.
            </p>
          </div>
        </div>
      </SectionShell>

    </>
  )
}
