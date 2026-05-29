import type { Metadata } from 'next'
import Navigation from '@/components/site/navigation'
import LandingFooter from '@/components/landing/landing-footer'
import ReleasesIndex from '@/components/releases/releases-index'

export const metadata: Metadata = {
  title: 'Releases · Enclave',
  description:
    'Milestones for Enclave, with the numbers and methodology behind each one.',
}

export default function ReleasesPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.98_0.001_145)] text-[#0a0b0d]">
      <Navigation theme="light" />
      <main>
        <ReleasesIndex />
      </main>
      <LandingFooter />
    </div>
  )
}
