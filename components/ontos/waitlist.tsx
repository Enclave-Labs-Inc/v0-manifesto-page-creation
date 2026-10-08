'use client'

import { ArrowRight } from 'lucide-react'
import { AURORA } from './entity'
import { SIGN_IN_URL, WAITLIST_URL } from './links'
import { useReveal } from './use-reveal'

const GITHUB_URL = 'https://github.com/Enclave-Labs-Inc/Ontos'

export default function Waitlist() {
  const head = useReveal<HTMLDivElement>()

  return (
    <section id="waitlist" className="relative scroll-mt-16 overflow-hidden bg-[oklch(0.975_0.004_265)] text-[#050608]">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-80" style={{ backgroundImage: AURORA }} />

      <div
        ref={head.ref}
        data-in-view={head.inView}
        className="scroll-reveal relative mx-auto flex max-w-[1440px] flex-col items-start px-5 py-[clamp(7rem,14vw,12rem)] sm:px-10 lg:px-14"
      >
        <h2 className="max-w-[18ch] font-display text-[clamp(2.4rem,5vw,4.6rem)] font-normal leading-[1.02] tracking-[-0.03em]">
          You bring the data.
          <span className="block text-[#6A6D72]">We run everything else.</span>
        </h2>
        <p className="mt-7 max-w-[48ch] text-[17px] leading-[1.65] text-[#3A3D45]">
          The platform is almost ready. We’re onboarding teams in small groups.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a
            href={WAITLIST_URL}
            className="group inline-flex h-[50px] items-center gap-2.5 rounded-[6px] bg-[#050608] px-7 text-[11px] font-bold uppercase tracking-[0.18em] text-[oklch(0.985_0_0)] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#17191D] active:scale-[0.985]"
          >
            Join the waitlist
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
          </a>
          <a href={SIGN_IN_URL} className="text-[14px] text-[#3A3D45] underline decoration-[#C9CCD3] underline-offset-4 hover:text-[#050608] hover:decoration-[#050608]">
            Already invited? Sign in
          </a>
        </div>

        <p className="mt-16 text-[13px] text-[#6A6D72]">
          The engine underneath is open, so anyone can check the guarantees.{' '}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#050608] underline decoration-[#C9CCD3] underline-offset-[3px] hover:decoration-[#050608]"
          >
            Read the code
          </a>
        </p>
      </div>
    </section>
  )
}
