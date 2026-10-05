'use client'

import { ArrowUpRight } from 'lucide-react'

export default function LandingHero() {
return (
    <section className="relative flex min-h-[88svh] flex-col overflow-hidden text-[#050608]">
{/* Radial mesh — three layered ellipses that produce an organic
          morning-mist wash on the left where the text sits. Density is
          strongest around the headline and releases cleanly across the
          right so the mountain remains fully visible. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_110%_150%_at_-5%_50%,oklch(0.965_0_0/0.97)_0%,oklch(0.965_0_0/0.85)_28%,oklch(0.965_0_0/0.55)_50%,oklch(0.965_0_0/0.2)_72%,transparent_90%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_95%_at_25%_50%,oklch(1_0_0/0.32)_0%,transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_105%_at_110%_45%,oklch(0.92_0.02_75/0.14)_0%,transparent_58%)] mix-blend-multiply"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 pt-[110px] pb-16 sm:px-10 sm:pt-[140px] sm:pb-24 lg:px-14">
        <div>
          {/* Text block — headline overflows the inner column intentionally
              on md+ so the tagline sits on one line. */}
          <h1 className="landing-reveal landing-reveal-title font-display mt-6 max-w-[1050px] text-[clamp(2.8rem,5.6vw,5.8rem)] font-normal leading-[0.95] tracking-[-0.04em] text-[#050608]">
            <span className="block">Ask your company anything.</span>
            <span className="block text-[#2A2D33] md:whitespace-nowrap">
              Your data stays in your cloud.
            </span>
          </h1>

          <p className="landing-reveal landing-reveal-body mt-6 max-w-[54ch] text-[14px] leading-[1.6] tracking-[-0.005em] text-[#17191D] sm:mt-7 sm:text-[15px]">
            Enclave connects the knowledge scattered across Slack, Google Drive, GitHub, Jira and other tools your company already uses, so your team can ask questions and get answers with sources.
          </p>

          <p className="landing-reveal landing-reveal-body mt-4 text-[13px] font-semibold tracking-[-0.005em] text-[#111214] sm:text-[14px]">
            Runs inside your cloud environment. Not ours.
          </p>

          <div className="landing-reveal landing-reveal-actions mt-8 sm:mt-10">
            <a
              href="https://cal.com/shashank-bhardwaj-fwmii1/30min"
              className="group inline-flex h-[48px] items-center gap-2.5 rounded-[6px] bg-[#050608] px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[oklch(0.985_0_0)] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#17191D] active:scale-[0.985] sm:h-[46px]"
            >
              Talk to us
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
