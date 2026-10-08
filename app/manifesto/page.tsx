import type { Metadata } from 'next'
import Navigation from '@/components/site/navigation'
import LandingFooter from '@/components/landing/landing-footer'
import ManifestoContent from '@/components/manifesto/manifesto-content'

export const metadata: Metadata = {
  title: 'Manifesto · Enclave',
  description:
    'Enclave is building the knowledge layer for the enterprise: search and answers across everything a company knows, grounded in sources, bound by permissions, and running where the data lives.',
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
