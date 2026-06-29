'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Linkedin } from 'lucide-react'

const LINKEDIN_URL = 'https://www.linkedin.com/in/shashank-bhardwaj-1a92b9213/'
const X_URL = 'https://x.com/theghost1623'
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
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

type SectionShellProps = {
  id: string
  theme: 'light' | 'dark'
  numeral: string
  eyebrow: string
  children: React.ReactNode
  className?: string
}

function SectionShell({ id, theme, numeral, eyebrow, children, className }: SectionShellProps) {
  const isDark = theme === 'dark'
  const eyebrowReveal = useReveal<HTMLDivElement>()

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${
        isDark
          ? 'bg-[oklch(0.095_0.006_145)] text-[#E8E9EC]'
          : 'bg-[oklch(0.98_0.001_145)] text-[#0a0b0d]'
      }`}
    >
      <div className={`relative mx-auto max-w-[1320px] px-6 py-[clamp(5.5rem,10vw,8.5rem)] sm:px-10 lg:px-14 ${className ?? ''}`}>
        <div
          ref={eyebrowReveal.ref}
          data-in-view={eyebrowReveal.inView}
          className="scroll-reveal flex items-center gap-3"
        >
          <span
            className={`flex h-7 min-w-7 items-center justify-center rounded-md border px-2 text-[10px] font-bold tracking-[0.18em] ${
              isDark
                ? 'border-[#2A2D34] bg-[oklch(0.13_0.005_145)] text-[#9499A6]'
                : 'border-[#D6DAE1] bg-white text-[#5E636F]'
            }`}
          >
            § {numeral}
          </span>
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

type RevealProps = {
  className?: string
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
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

// ============================================================================
// Hero
// ============================================================================
function ManifestoHero() {
  const eyebrow = useReveal<HTMLParagraphElement>()
  const headline = useReveal<HTMLHeadingElement>()
  const sub = useReveal<HTMLParagraphElement>()
  const cta = useReveal<HTMLDivElement>()
  const meta = useReveal<HTMLDivElement>()

  return (
    <section className="relative overflow-hidden bg-[oklch(0.98_0.001_145)] text-[#0a0b0d]">
      <div className="relative mx-auto max-w-[1320px] px-6 pb-[clamp(5rem,9vw,8rem)] pt-[clamp(6rem,11vw,9rem)] sm:px-10 lg:px-14">
        <p
          ref={eyebrow.ref}
          data-in-view={eyebrow.inView}
          className="scroll-reveal text-[11px] font-bold uppercase tracking-[0.34em] text-[#5E636F]"
        >
          Manifesto · v1.0
        </p>

        <h1
          ref={headline.ref}
          data-in-view={headline.inView}
          className="scroll-reveal mt-8 max-w-[22ch] text-[clamp(2.4rem,6vw,5.4rem)] font-bold leading-[1.02] tracking-[-0.05em] text-[#050608]"
        >
          The Company Brain
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">for sovereign deployment.</span>
        </h1>

        <p
          ref={sub.ref}
          data-in-view={sub.inView}
          className="scroll-reveal mt-8 max-w-[58ch] text-[clamp(1rem,1.3vw,1.18rem)] leading-[1.55] tracking-[-0.015em] text-[#50545B]"
        >
          Built for organizations that need AI across internal knowledge   but
          cannot send their data to SaaS AI vendors.
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
            Book a design-partner call
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </a>
          <Link
            href="/"
            className="group inline-flex h-[48px] items-center gap-2.5 rounded-[10px] border border-[oklch(0.86_0.006_145/0.82)] bg-[oklch(0.99_0.002_145/0.76)] px-7 text-[13.5px] font-bold tracking-[-0.02em] text-[#111214] backdrop-blur-xl transition-[background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[oklch(0.78_0.008_145)] hover:bg-[oklch(1_0_0/0.92)] active:scale-[0.985]"
          >
            Back to overview
          </Link>
        </div>

        <div
          ref={meta.ref}
          data-in-view={meta.inView}
          className="scroll-reveal mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-[12px] font-bold tracking-[-0.01em] text-[#555B64]"
        >
          <span className="inline-flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.63_0.16_162)]" />
            Deploys inside your AWS account
          </span>
          <span className="inline-flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-[#8D939D]" />
            getenclave.ai
          </span>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// Doctrine cards (Section IV evidence grid)
// ============================================================================
const doctrines = [
  {
    num: '01',
    title: 'Deployment',
    subtitle: 'Runs inside your AWS account',
    body: 'GCP, Azure, and on-prem on the roadmap, delivered when a design partner requires them. Enclave is deployed into infrastructure you control, not routed through infrastructure you have to trust.',
  },
  {
    num: '02',
    title: 'Exclusion',
    subtitle: 'Vendor access is designed out',
    body: 'Our principals are excluded from your key policies. We do not operate a service inside your perimeter. Sovereignty is not a promise; it is an architectural property.',
  },
  {
    num: '03',
    title: 'Approval',
    subtitle: 'A sanctioned alternative to shadow AI',
    body: 'Employees are already using AI. Regulated teams need an approved Company Brain that gives them useful answers without forcing security to accept SaaS data exposure.',
  },
  {
    num: '04',
    title: 'Traceability',
    subtitle: 'Every answer points back to evidence',
    body: 'Answers must be sourced, consistent, and auditable. When the evidence is thin, Enclave refuses to guess. Honest uncertainty is a feature, not a failure mode.',
  },
  {
    num: '05',
    title: 'Retrieval',
    subtitle: 'The moat is below the UI',
    body: 'Rust shard workers, byte-level vector formats, deterministic ranking, and source authority scoring exist for one reason: to make the sovereignty claim real at production scale.',
  },
  {
    num: '06',
    title: 'Outcome',
    subtitle: 'Useful AI your buyer can approve',
    body: 'The goal is not another search box. The goal is an internal AI system legal, security, and business teams can all say yes to.',
  },
]

function DoctrineCard({
  doctrine,
  theme,
}: {
  doctrine: (typeof doctrines)[number]
  theme: 'light' | 'dark'
}) {
  const { ref, inView } = useReveal<HTMLElement>()
  const isDark = theme === 'dark'

  return (
    <article
      ref={ref}
      data-in-view={inView}
      className={`scroll-reveal group flex flex-col rounded-2xl border p-6 transition-[border-color,background-color,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 sm:p-7 ${
        isDark
          ? 'border-[#1E2127] bg-[oklch(0.115_0.005_145)] hover:border-[#2C3038] hover:bg-[oklch(0.13_0.005_145)]'
          : 'border-[#E0E3E8] bg-[oklch(0.995_0.001_145)] hover:border-[#C7CCD4] hover:bg-white'
      }`}
    >
      <div className="mb-5 flex items-center justify-between">
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.36em] ${
            isDark ? 'text-[#5E636F]' : 'text-[#9499A6]'
          }`}
        >
          {doctrine.num}
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-[0.28em] ${
            isDark ? 'text-[#9499A6]' : 'text-[#787D8A]'
          }`}
        >
          {doctrine.title}
        </span>
      </div>

      <h3
        className={`text-[17px] font-bold tracking-[-0.015em] ${
          isDark ? 'text-[#F4F5F7]' : 'text-[#050608]'
        }`}
      >
        {doctrine.subtitle}
      </h3>

      <p
        className={`mt-3 text-[14px] leading-[1.62] tracking-[-0.005em] ${
          isDark ? 'text-[#9499A6]' : 'text-[#50545B]'
        }`}
      >
        {doctrine.body}
      </p>
    </article>
  )
}

// ============================================================================
// Perimeter diagram (Section III visual)
// ============================================================================
function PerimeterDiagram() {
  const { ref, inView } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      data-in-view={inView}
      className="scroll-reveal relative"
    >
      <div className="rounded-2xl border border-dashed border-[#2A2D34] bg-[oklch(0.1_0.005_145/0.55)] p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#787D8A]">
            Your AWS account
          </span>
          <span className="rounded-full border border-[#2A2D34] bg-[oklch(0.13_0.005_145)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.24em] text-[#9499A6]">
            us-east-1
          </span>
        </div>

        <div className="rounded-xl border border-[#3A3D43] bg-[oklch(0.13_0.005_145)] p-5 sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#787D8A]">
            Inside your VPC
          </p>
          <p className="mt-2 text-[22px] font-bold tracking-[-0.02em] text-[#F4F5F7]">
            Enclave
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-bold text-[#C5C9D2]">
            {['S3', 'KMS', 'Postgres', 'CloudTrail'].map((s, i, arr) => (
              <span key={s} className="inline-flex items-center gap-3">
                {s}
                {i < arr.length - 1 && (
                  <span className="text-[#3A3D43]">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="flex-shrink-0 rounded-lg border border-[#2A2D34] bg-[oklch(0.09_0.004_145)] px-4 py-2.5">
          <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-[#5E636F]">
            Outside
          </p>
          <p className="text-[12px] font-bold text-[#9499A6]">Vendor (us)</p>
        </div>
        <div className="hidden h-px flex-1 border-t border-dashed border-[#3A3D43] sm:block" />
        <div className="inline-flex items-center gap-2 rounded-md border border-[#2A2D34] bg-[oklch(0.13_0.005_145)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-[#9499A6]">
          <span>No standing access</span>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Founder Social (XIcon kept inline)
// ============================================================================
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FounderSocial() {
  const linkClass =
    'text-[#9499A6] hover:text-[#F4F5F7] transition-colors duration-150'
  return (
    <div className="flex items-center gap-4">
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={linkClass}
      >
        <Linkedin className="h-4 w-4" strokeWidth={1.6} />
      </a>
      <a
        href={X_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X"
        className={linkClass}
      >
        <XIcon className="h-4 w-4" />
      </a>
    </div>
  )
}

// ============================================================================
// Main content
// ============================================================================
export default function ManifestoContent() {
  return (
    <>
      <ManifestoHero />

      {/* I   The problem buyers already have (dark) */}
      <SectionShell id="I" theme="dark" numeral="I" eyebrow="The problem buyers already have">
        <Reveal
          as="h2"
          className="max-w-[22ch] text-[clamp(2rem,4.8vw,4rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#F4F5F7]"
        >
          Your security team killed Copilot.
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">Your people still use shadow AI.</span>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <Reveal
            as="p"
            className="max-w-[44ch] text-[15px] leading-[1.7] tracking-[-0.005em] text-[#9499A6]"
          >
            The need is obvious: people want one place to ask what the company
            knows. The blocker isn&rsquo;t demand. It&rsquo;s trust, control,
            and deployment.
          </Reveal>
          <Reveal
            as="p"
            className="max-w-[60ch] text-[15px] leading-[1.7] tracking-[-0.005em] text-[#9499A6]"
          >
            Enclave exists for the organizations that want enterprise AI   but
            cannot approve a product that asks them to send regulated,
            proprietary, or customer-sensitive data into someone else&rsquo;s
            cloud.
          </Reveal>
        </div>
      </SectionShell>

      {/* II   The category (light) */}
      <SectionShell id="II" theme="light" numeral="II" eyebrow="The category">
        <Reveal
          as="h2"
          className="max-w-[24ch] text-[clamp(2rem,4.8vw,4rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#050608]"
        >
          The Company Brain
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">for organizations that can&rsquo;t SaaS-out.</span>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-14">
          <Reveal
            as="p"
            className="max-w-[58ch] text-[15px] leading-[1.7] tracking-[-0.005em] text-[#50545B]"
          >
            Enclave connects what your company already knows   across Slack,
            Drive, GitHub, Confluence, Jira, and the rest   and lets employees
            ask natural-language questions that come back with sourced answers.
          </Reveal>
          <Reveal
            as="p"
            className="max-w-[58ch] text-[15px] leading-[1.7] tracking-[-0.005em] text-[#50545B]"
          >
            The buyer outcome is simple: approved AI for internal knowledge,
            without forcing legal, security, or compliance to accept a
            deployment model they already rejected.
          </Reveal>
        </div>
      </SectionShell>

      {/* III   The architectural claim (dark)   anchor target */}
      <SectionShell
        id="III"
        theme="dark"
        numeral="III"
        eyebrow="The architectural claim"
      >
        <Reveal
          as="h2"
          className="max-w-[24ch] text-[clamp(2rem,4.8vw,4rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#F4F5F7]"
        >
          Privacy isn&rsquo;t a promise.
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">It&rsquo;s the deployment boundary.</span>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <PerimeterDiagram />

          <div className="space-y-6">
            <Reveal
              as="p"
              className="text-[15px] leading-[1.7] tracking-[-0.005em] text-[#C5C9D2]"
            >
              Enclave deploys inside your AWS account. Your S3, your KMS keys,
              your Postgres, your audit logs. GCP and Azure support on the
              public roadmap   talk to the founder about your environment.
            </Reveal>
            <Reveal
              as="p"
              className="text-[15px] leading-[1.7] tracking-[-0.005em] text-[#9499A6]"
            >
              Our principals are excluded from your key policies. We do not
              operate a service inside your perimeter. Your private knowledge
              stays under your infrastructure, your governance, and your audit
              surface.
            </Reveal>
            <Reveal
              as="p"
              className="text-[15px] leading-[1.7] tracking-[-0.005em] text-[#9499A6]"
            >
              Every AI company says it values privacy. Enclave is built so
              privacy isn&rsquo;t a promise in a sales deck   it&rsquo;s the
              deployment boundary itself.
            </Reveal>
          </div>
        </div>
      </SectionShell>

      {/* IV   The evidence (light)   doctrine grid */}
      <SectionShell id="IV" theme="light" numeral="IV" eyebrow="The evidence">
        <Reveal
          as="h2"
          className="max-w-[26ch] text-[clamp(2rem,4.8vw,4rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#050608]"
        >
          Six doctrines.
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">All architectural, none rhetorical.</span>
        </Reveal>

        <Reveal
          as="p"
          className="mt-6 max-w-[62ch] text-[15px] leading-[1.7] tracking-[-0.005em] text-[#50545B]"
        >
          The lower layers matter because this claim cannot be added later. A
          sovereign Company Brain needs storage, retrieval, ranking, and
          observability designed around customer-owned infrastructure from the
          first commit.
        </Reveal>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {doctrines.map((doctrine) => (
            <DoctrineCard
              key={doctrine.num}
              doctrine={doctrine}
              theme="light"
            />
          ))}
        </div>
      </SectionShell>

      {/* V   Who Enclave is for (dark) */}
      <SectionShell id="V" theme="dark" numeral="V" eyebrow="Who Enclave is for">
        <Reveal
          as="h2"
          className="max-w-[24ch] text-[clamp(2rem,4.8vw,4rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#F4F5F7]"
        >
          For regulated teams
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">where SaaS AI is the reason it can&rsquo;t ship.</span>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-14">
          <Reveal
            as="p"
            className="text-[15px] leading-[1.7] tracking-[-0.005em] text-[#9499A6]"
          >
            Enclave is for regulated, security-conscious, and
            infrastructure-serious companies that need the productivity of AI
            without the control loss of SaaS AI.
          </Reveal>
          <Reveal
            as="p"
            className="text-[15px] leading-[1.7] tracking-[-0.005em] text-[#9499A6]"
          >
            It&rsquo;s for the security leader who needs an approved
            alternative to shadow AI. The legal team that needs answers with
            sources. The engineering team that can&rsquo;t afford to lose
            decisions across Slack, docs, tickets, and email.
          </Reveal>
        </div>

        <Reveal
          as="p"
          className="mt-8 max-w-[64ch] text-[15px] leading-[1.7] tracking-[-0.005em] text-[#787D8A]"
        >
          If your company can use a standard SaaS Company Brain, you probably
          should. Enclave is for the moment when that deployment model is the
          reason the project cannot ship.
        </Reveal>
      </SectionShell>

      {/* VI   What Enclave is not (light) */}
      <SectionShell
        id="VI"
        theme="light"
        numeral="VI"
        eyebrow="What Enclave is not"
      >
        <Reveal
          as="h2"
          className="max-w-[26ch] text-[clamp(2rem,4.8vw,4rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#050608]"
        >
          Not a chat product.
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">A substrate for AI you already trust.</span>
        </Reveal>

        <Reveal
          as="p"
          className="mt-8 max-w-[68ch] text-[15px] leading-[1.7] tracking-[-0.005em] text-[#50545B]"
        >
          Enclave is not a chat product. It&rsquo;s not a SaaS. It&rsquo;s not
          a model. It&rsquo;s the retrieval and knowledge infrastructure that
          sits underneath whatever LLM your organization already trusts  
          Bedrock, Azure OpenAI, your own Vertex, or a local Mistral. We are
          the substrate, not the answer engine. We do not train on your data,
          because we never see it.
        </Reveal>
      </SectionShell>

      {/* VII   The founder note (dark)   CTA + founder credit */}
      <SectionShell
        id="VII"
        theme="dark"
        numeral="VII"
        eyebrow="The founder note"
        className="!pb-[clamp(3rem,5vw,4.5rem)]"
      >
        <Reveal
          as="h2"
          className="max-w-[24ch] text-[clamp(2rem,4.8vw,4rem)] font-bold leading-[1.04] tracking-[-0.04em] text-[#F4F5F7]"
        >
          Tired of every AI company
          <br className="hidden md:block" />
          <span className="text-[#7F848F]">asking enterprises to trust their cloud.</span>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-14">
          <Reveal
            as="p"
            className="text-[15px] leading-[1.7] tracking-[-0.005em] text-[#9499A6]"
          >
            Enclave is being built by a solo engineer who got tired of every AI
            company asking enterprises to trust their cloud.
          </Reveal>
          <Reveal
            as="p"
            className="text-[15px] leading-[1.7] tracking-[-0.005em] text-[#9499A6]"
          >
            The first version is for design partners with real constraints:
            private data, serious compliance pressure, and employees who still
            need AI to do their best work.
          </Reveal>
        </div>

        <Reveal as="div" className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href={CAL_URL}
            className="group inline-flex h-[52px] items-center gap-3 rounded-[11px] bg-[#F4F5F7] px-8 text-[14px] font-bold tracking-[-0.02em] text-[#050608] shadow-[0_18px_44px_oklch(0.6_0.012_145/0.16),inset_0_1px_0_oklch(1_0_0/0.8)] transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white active:scale-[0.985]"
          >
            Book a design-partner call
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </a>
          <a
            href="mailto:contact@getenclave.ai"
            className="text-[13px] font-bold tracking-[-0.01em] text-[#C5C9D2] transition-colors duration-200 hover:text-white"
          >
            contact@getenclave.ai
          </a>
        </Reveal>

        <Reveal
          as="div"
          className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-[#1F2227] pt-8"
        >
          <div>
            <p className="text-[13px] font-bold tracking-[-0.01em] text-[#E4E7EC]">
              Shashank Bhardwaj
            </p>
            <p className="mt-1 text-[12px] tracking-[-0.005em] text-[#787D8A]">
              Founder · getenclave.ai
            </p>
          </div>
          <FounderSocial />
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#1A1D22] pt-6 text-[12px] font-bold tracking-[-0.005em] text-[#4A4F5A]">
          <span>© 2026 Enclave</span>
          <nav className="flex items-center gap-6">
            <Link href="/" className="transition-colors duration-150 hover:text-[#9499A6]">Home</Link>
            <Link href="/releases" className="transition-colors duration-150 hover:text-[#9499A6]">Releases</Link>
            <a href="mailto:contact@getenclave.ai" className="transition-colors duration-150 hover:text-[#9499A6]">Contact</a>
          </nav>
        </div>
      </SectionShell>
    </>
  )
}
