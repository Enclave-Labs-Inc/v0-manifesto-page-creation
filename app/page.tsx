import type { Metadata } from 'next'
import Navigation from '@/components/site/navigation'
import LandingHero from '@/components/landing/hero'
import ProblemSection from '@/components/landing/problem'
import HowItWorks from '@/components/landing/how-it-works'
import SovereigntyProof from '@/components/landing/sovereignty-proof'
import AlternativesSection from '@/components/landing/alternatives'
import FinalCTA from '@/components/landing/final-cta'
import LandingFooter from '@/components/landing/landing-footer'

export const metadata: Metadata = {
  title: 'Enclave · Sovereign Company Brain',
  description: 'Enterprise AI for internal knowledge that deploys inside your AWS account. Nothing leaves your perimeter.',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[oklch(0.965_0.003_145)] text-[#111214]">
      <Navigation theme="light" />
      <main>
        <LandingHero />
        <ProblemSection />
        <HowItWorks />
        <SovereigntyProof />
        <AlternativesSection />
        <FinalCTA />
      </main>
      <LandingFooter />
    </div>
  )
}
