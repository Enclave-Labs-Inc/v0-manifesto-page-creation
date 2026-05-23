import type { Metadata } from 'next'
import Navigation from '@/components/site/navigation'
import LandingHero from '@/components/landing/hero'

export const metadata: Metadata = {
  title: 'Enclave · Sovereign Company Brain',
  description: 'Enterprise AI for internal knowledge that deploys inside your AWS account. Nothing leaves your perimeter.',
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[oklch(0.965_0.003_145)] text-[#111214]">
      <Navigation theme="light" />
      <main className="min-h-screen">
        <LandingHero />
      </main>
    </div>
  )
}
