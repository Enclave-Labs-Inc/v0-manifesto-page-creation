'use client'

import { ArrowRight, Check } from 'lucide-react'
import { Eyebrow } from '@/components/landing/eyebrow'
import { AURORA, ENTITY } from './entity'
import { SIGN_IN_URL, WAITLIST_URL } from './links'
import { useReveal } from './use-reveal'

const perks = [
  'Your own project, endpoint and API keys',
  'Sample fintech and pharma data to explore',
  'A direct line to the team building it',
]

export default function Waitlist() {
  const head = useReveal<HTMLDivElement>()

  return (
    <section id="waitlist" className="relative scroll-mt-16 overflow-hidden bg-[oklch(0.975_0.004_265)] text-[#050608]">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: AURORA }} />

      <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 py-[clamp(5rem,10vw,9rem)] sm:px-10 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-14">
        <div ref={head.ref} data-in-view={head.inView} className="scroll-reveal flex flex-col justify-center">
          <Eyebrow bulletColor={ENTITY.Filing}>Early access</Eyebrow>
          <h2 className="font-display mt-6 text-[clamp(2rem,4vw,3.6rem)] font-normal leading-[1.04] tracking-[-0.025em]">
            The platform is almost ready.
            <span className="block text-[#6A6D72]">Get on the list.</span>
          </h2>
          <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.7] text-[#3A3D45]">
            We’re onboarding teams in small groups during the private alpha. Tell us what you’d connect
            first, and we’ll email your invite as soon as a place opens.
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-[14px] border border-[oklch(0.88_0_0/0.9)] bg-[#FAFAF8]/85 p-6 shadow-[0_40px_100px_-40px_oklch(0.35_0.08_265/0.45)] backdrop-blur-xl sm:p-10">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#6A6D72]">Private alpha</p>
          <ul className="mt-6 space-y-4 text-[15px] text-[#2A2D33]">
            {perks.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  style={{ background: `color-mix(in oklch, ${ENTITY.Filing} 18%, white)` }}
                >
                  <Check className="h-3.5 w-3.5" style={{ color: '#0f7a54' }} strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <a
            href={WAITLIST_URL}
            className="group mt-10 inline-flex h-[50px] w-full items-center justify-center gap-2.5 rounded-[6px] bg-[#050608] px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[oklch(0.985_0_0)] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#17191D] active:scale-[0.985]"
          >
            Join the waitlist
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
          </a>
          <p className="mt-4 text-center text-[13px] text-[#6A6D72]">
            Already invited?{' '}
            <a href={SIGN_IN_URL} className="text-[#050608] underline decoration-[#CFCFCA] underline-offset-[3px] hover:decoration-[#050608]">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
