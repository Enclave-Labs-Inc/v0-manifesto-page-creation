import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
// import RippleBackground from '@/components/landing/ripple-background'

const trustPills = [
  'Runs in your AWS account',
  'Vendor principals excluded from key policies',
  'Sourced answers only',
]

// Logo files live in /public/brand/. Drop in the official SVGs there to
// swap any of these without touching code.
const infrastructure = [
  { name: 'aws', label: 'AWS', src: '/brand/aws.svg', wide: true },
  { name: 's3', label: 'S3', src: '/brand/s3.svg', wide: false },
  { name: 'kms', label: 'KMS', src: '/brand/kms.svg', wide: false },
  { name: 'postgresql', label: 'PostgreSQL', src: '/brand/postgresql.svg', wide: false },
  { name: 'cloudtrail', label: 'CloudTrail', src: '/brand/cloudtrail.svg', wide: false },
]

export default function LandingHero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[oklch(0.965_0.003_145)] text-[#07080A]">
      {/* <RippleBackground /> */}
      <Image
        src="/landing-hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover object-center"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-[1] h-[34vh] w-[min(34vw,420px)] bg-[radial-gradient(ellipse_at_0%_100%,oklch(0.095_0.006_145)_0%,oklch(0.095_0.006_145/0.62)_42%,transparent_72%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 z-[1] h-[34vh] w-[min(34vw,420px)] bg-[radial-gradient(ellipse_at_100%_100%,oklch(0.095_0.006_145)_0%,oklch(0.095_0.006_145/0.62)_42%,transparent_72%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-1 flex-col px-6 pb-0 pt-[130px] sm:px-10 lg:px-14">
        <div className="mx-auto flex w-full flex-col items-center text-center">
          <p className="landing-reveal landing-reveal-eyebrow mb-4 text-[10px] font-bold uppercase tracking-[0.36em] text-[#50545B] sm:text-[11px]">
            Sovereign AI for regulated industries
          </p>

          <h1 className="landing-reveal landing-reveal-title max-w-none text-[clamp(2rem,5.8vw,5.4rem)] font-bold leading-[0.92] tracking-[-0.06em] text-[#050608]">
            <span className="block">Deploy AI.</span>
            <span className="block md:whitespace-nowrap">Keep your data.</span>
          </h1>

          <p className="landing-reveal landing-reveal-body mt-5 max-w-[92ch] text-[clamp(0.92rem,1.18vw,1.02rem)] leading-[1.65] tracking-[-0.02em] text-[#50545B]">
            A company brain for your internal knowledge. Enclave connects Slack, Drive, GitHub,
            Confluence, Jira, and the rest then deploys inside your AWS account with your S3,
            KMS keys, Postgres, and audit logs.
          </p>

          <div className="landing-reveal landing-reveal-actions mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="https://cal.com/shashank-bhardwaj-fwmii1/30min"
              className="group inline-flex h-[48px] items-center gap-2.5 rounded-[10px] bg-[#050608] px-7 text-[13.5px] font-bold tracking-[-0.02em] text-[oklch(0.985_0.002_145)] shadow-[0_16px_40px_oklch(0.12_0.006_145/0.28),inset_0_1px_0_oklch(1_0_0/0.12)] transition-[background-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#17191D] hover:shadow-[0_20px_48px_oklch(0.12_0.006_145/0.33),inset_0_1px_0_oklch(1_0_0/0.14)] active:scale-[0.985]"
            >
              Book a design-partner call
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
            </a>
            <Link
              href="/manifesto"
              className="group inline-flex h-[48px] items-center gap-2.5 rounded-[10px] border border-[oklch(0.86_0.006_145/0.82)] bg-[oklch(0.99_0.002_145/0.76)] px-7 text-[13.5px] font-bold tracking-[-0.02em] text-[#111214] shadow-[0_10px_26px_oklch(0.2_0.006_145/0.08),inset_0_1px_0_oklch(1_0_0/0.85)] backdrop-blur-xl transition-[background-color,border-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-[oklch(0.78_0.008_145)] hover:bg-[oklch(1_0_0/0.92)] active:scale-[0.985]"
            >
              Read the manifesto
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
            </Link>
          </div>

          <div className="landing-reveal landing-reveal-pills mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-[11px] font-bold tracking-[-0.01em] text-[#555B64]">
            {trustPills.map((pill, index) => (
              <span key={pill} className="inline-flex items-center gap-2.5">
                {index === 0 ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.63_0.16_162)]" />
                ) : (
                  <span className="h-1 w-1 rounded-full bg-[#8D939D]" />
                )}
                {pill}
              </span>
            ))}
          </div>

        </div>

        <div className="landing-reveal landing-reveal-scroll mt-auto flex flex-col items-center pb-5 text-[11px] font-bold uppercase tracking-[0.32em] text-[#050608]">
          <span>Scroll</span>
          <span className="mt-3 h-10 w-px bg-gradient-to-b from-[#050608] to-transparent" />
        </div>
      </div>

      {/* Infrastructure rail   original max-w card width with rounded top
          corners. Flat dark, same base color as Section 2 below. */}
      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-14">
        <div className="landing-reveal landing-reveal-rail relative overflow-hidden rounded-t-[24px] bg-[oklch(0.095_0.006_145)] px-7 py-5 text-[oklch(0.94_0.004_145)] sm:px-9">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_2fr] lg:items-center">
            <div>
              <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.32em] text-[#A7ADB6]">
                Built around the systems
              </p>
              <p className="text-[clamp(1.1rem,1.8vw,1.4rem)] font-normal tracking-[-0.035em] text-[oklch(0.96_0.004_145)]">
                your security team already trusts
              </p>
            </div>

            <div className="grid grid-cols-2 overflow-hidden rounded-[12px] border border-[oklch(1_0_0/0.06)] sm:grid-cols-5">
              {infrastructure.map((item) => (
                <div
                  key={item.name}
                  className="flex h-[68px] items-center justify-center gap-2.5 border-[oklch(1_0_0/0.08)] px-3 text-[13px] font-bold text-[#D5D9DF] sm:border-l first:border-l-0"
                >
                  <img
                    src={item.src}
                    alt=""
                    aria-hidden="true"
                    className={item.wide ? 'h-6 w-auto' : 'h-5 w-5'}
                  />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
