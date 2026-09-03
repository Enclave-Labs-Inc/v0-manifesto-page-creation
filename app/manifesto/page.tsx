import type { Metadata } from 'next'
import Navigation from '@/components/site/navigation'
import LandingFooter from '@/components/landing/landing-footer'
import ManifestoContent from '@/components/manifesto/manifesto-content'

export const metadata: Metadata = {
  title: 'Manifesto · Enclave',
  description:
    'The Company Brain for organizations that cannot send their data to SaaS AI vendors.',
}

export default function ManifestoPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.965_0_0)] text-[#050608]">
      <Navigation theme="light" />
      <main>
        <ManifestoContent />
      </main>
      <LandingFooter />
    </div>
  )
}
