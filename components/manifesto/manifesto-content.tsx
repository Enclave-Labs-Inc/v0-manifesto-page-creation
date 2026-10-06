'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const CAL_URL = 'https://cal.com/shashank-bhardwaj-fwmii1/30min'

export default function ManifestoContent() {
  return (
    <>
      <section className="bg-[oklch(0.965_0_0)] text-[#0A0B0D]">
        <div className="mx-auto max-w-[1440px] px-5 pb-28 pt-32 sm:px-10 lg:px-14 lg:pb-36 lg:pt-40">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6A6D72]">
            Manifesto
          </p>

          <h1 className="mt-6 max-w-[18ch] font-display text-[clamp(3rem,7vw,6.8rem)] font-normal leading-[0.96] tracking-[-0.04em]">
            The Company Brain
            <span className="block text-[#737780]">
              that stays inside your environment.
            </span>
          </h1>

          <p className="mt-8 max-w-[60ch] text-[17px] leading-[1.7] text-[#4F535A] sm:text-[18px]">
            AI should work with your company&apos;s knowledge without moving that knowledge outside your environment.
          </p>
        </div>
      </section>

      <section className="bg-[#0D0E10] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-28 sm:px-10 lg:px-14 lg:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#7D828C]">
            The problem
          </p>

          <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(2.6rem,5vw,5rem)] font-normal leading-[1.0] tracking-[-0.035em]">
            Your security team said no.
            <span className="block text-[#7D828C]">
              Your teams still need AI.
            </span>
          </h2>

          <div className="mt-10 max-w-[760px] space-y-5 text-[16px] leading-[1.75] text-[#B7BBC3]">
            <p>
              The problem is not demand for AI. People already want one place to ask what the company knows.
            </p>
            <p>
              The problem is where the data has to go. For many organizations, regulated, proprietary, or customer-sensitive data simply cannot be sent to another company&apos;s cloud.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[oklch(0.965_0_0)] text-[#111214]">
        <div className="mx-auto max-w-[1440px] px-5 py-28 sm:px-10 lg:px-14 lg:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6A6D72]">
            What we believe
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-3 lg:gap-12">
            <div>
              <h3 className="font-display text-[30px] leading-[1.05] tracking-[-0.03em]">
                Your data should stay where it is.
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-[#5B5E64]">
                Storage, encryption keys, databases and audit trails remain under your control.
              </p>
            </div>

            <div>
              <h3 className="font-display text-[30px] leading-[1.05] tracking-[-0.03em]">
                AI should respect existing permissions.
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-[#5B5E64]">
                People should only get answers from information they already have permission to access.
              </p>
            </div>

            <div>
              <h3 className="font-display text-[30px] leading-[1.05] tracking-[-0.03em]">
                Answers should show where they came from.
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-[#5B5E64]">
                Every answer should point back to its sources and make uncertainty visible.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0D0E10] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-28 sm:px-10 lg:px-14 lg:py-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#7D828C]">
            What we are building
          </p>

          <h2 className="mt-6 max-w-[22ch] font-display text-[clamp(2.6rem,5vw,5rem)] font-normal leading-[1.0] tracking-[-0.035em]">
            Not another AI SaaS.
            <span className="block text-[#7D828C]">
              AI infrastructure that fits your existing security rules.
            </span>
          </h2>

          <p className="mt-8 max-w-[64ch] text-[16px] leading-[1.75] text-[#B7BBC3]">
            Enclave runs where your data already lives and works underneath the models your organization already uses.
          </p>

          <div className="mt-10">
            <a
              href={CAL_URL}
              className="group inline-flex h-[46px] items-center gap-2.5 rounded-[6px] bg-white px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0D0E10] transition hover:bg-[#E7E8EA]"
            >
              Talk to us
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </a>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="text-[12px] font-medium text-[#8E939C] transition hover:text-white"
            >
              Back to overview
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
