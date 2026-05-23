import Link from 'next/link'
import { ArrowRight, Cloud, Database, ShieldCheck, Server } from 'lucide-react'
import RippleBackground from '@/components/landing/ripple-background'

const trustPills = [
  'Runs in your AWS account',
  'Vendor principals excluded from key policies',
  'Sourced answers only',
]

const infrastructure = [
  { name: 'aws', label: 'AWS', icon: Server },
  { name: 's3', label: 'S3', icon: Database },
  { name: 'kms', label: 'KMS', icon: ShieldCheck },
  { name: 'postgresql', label: 'PostgreSQL', icon: Database },
  { name: 'cloudtrail', label: 'CloudTrail', icon: Cloud },
]

export default function LandingHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[oklch(0.965_0.003_145)] text-[#07080A]">
      <RippleBackground />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col px-6 pb-0 pt-[108px] sm:px-10 lg:px-16">
        <div className="mx-auto flex w-full flex-1 flex-col items-center text-center">
          <p className="landing-reveal mb-5 text-[11px] font-bold uppercase tracking-[0.36em] text-[#50545B] sm:text-[12px]">
            Sovereign infrastructure for enterprise AI
          </p>

          <h1 className="landing-reveal max-w-none text-[clamp(3.8rem,8vw,7.4rem)] font-bold leading-[0.92] tracking-[-0.06em] text-[#050608]">
            <span className="block">Deploy AI.</span>
            <span className="block whitespace-nowrap">Keep your data.</span>
          </h1>

          <p className="landing-reveal mt-6 max-w-[68ch] text-[clamp(1rem,1.3vw,1.12rem)] leading-[1.68] tracking-[-0.02em] text-[#50545B]">
            Enclave connects Slack, Drive, GitHub, Confluence, Jira, and the rest,
            <br className="hidden md:block" />
            then deploys inside your AWS account with your S3, your KMS keys,
            <br className="hidden md:block" />
            your Postgres, and your audit logs.
          </p>

          <div className="landing-reveal landing-reveal-delay-1 mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://cal.com/shashank-bhardwaj-fwmii1/30min"
              className="group inline-flex h-[54px] items-center gap-3 rounded-[11px] bg-[#050608] px-8 text-[15px] font-bold tracking-[-0.02em] text-[oklch(0.985_0.002_145)] shadow-[0_18px_44px_oklch(0.12_0.006_145/0.28),inset_0_1px_0_oklch(1_0_0/0.12)] transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#17191D] hover:shadow-[0_22px_54px_oklch(0.12_0.006_145/0.33),inset_0_1px_0_oklch(1_0_0/0.14)] active:scale-[0.985]"
            >
              Book a design-partner call
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
            </a>
            <Link
              href="/manifesto"
              className="group inline-flex h-[54px] items-center gap-3 rounded-[11px] border border-[oklch(0.86_0.006_145/0.82)] bg-[oklch(0.99_0.002_145/0.76)] px-8 text-[15px] font-bold tracking-[-0.02em] text-[#111214] shadow-[0_12px_30px_oklch(0.2_0.006_145/0.08),inset_0_1px_0_oklch(1_0_0/0.85)] backdrop-blur-xl transition-[background-color,border-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[oklch(0.78_0.008_145)] hover:bg-[oklch(1_0_0/0.92)] active:scale-[0.985]"
            >
              Read the manifesto
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
            </Link>
          </div>

          <div className="landing-reveal landing-reveal-delay-1 mt-9 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[12px] font-bold tracking-[-0.01em] text-[#555B64]">
            {trustPills.map((pill, index) => (
              <span key={pill} className="inline-flex items-center gap-3">
                {index === 0 ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.63_0.16_162)]" />
                ) : (
                  <span className="h-1 w-1 rounded-full bg-[#8D939D]" />
                )}
                {pill}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-col items-center pb-3 pt-6 text-[9px] font-bold uppercase tracking-[0.28em] text-[#8A9099]">
            <span>Scroll</span>
            <span className="mt-2.5 h-8 w-px bg-gradient-to-b from-[#A8AEB7] to-transparent" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[1180px] overflow-hidden rounded-t-[22px] border border-[oklch(1_0_0/0.08)] bg-[oklch(0.095_0.006_145/0.96)] px-8 py-7 text-[oklch(0.94_0.004_145)] shadow-[0_34px_110px_oklch(0.06_0.004_145/0.48),inset_0_1px_0_oklch(1_0_0/0.08)] backdrop-blur-2xl sm:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(1_0_0/0.13),transparent_44%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_2fr] lg:items-center">
            <div>
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.32em] text-[#A7ADB6]">
                Built around the systems
              </p>
              <p className="text-[clamp(1.25rem,2vw,1.6rem)] font-normal tracking-[-0.035em] text-[oklch(0.96_0.004_145)]">
                your security team already trusts
              </p>
            </div>

            <div className="grid grid-cols-2 overflow-hidden rounded-[14px] border border-[oklch(1_0_0/0.06)] sm:grid-cols-5">
              {infrastructure.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.name}
                    className="flex h-[72px] items-center justify-center gap-3 border-[oklch(1_0_0/0.08)] px-4 text-[14px] font-bold text-[#D5D9DF] sm:border-l first:border-l-0"
                  >
                    <Icon className="h-5 w-5 text-[#BFC5CE]" strokeWidth={1.45} />
                    <span>{item.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
