import type { Metadata } from 'next'
import Navigation from '@/components/site/navigation'
import ManifestoContent from '@/components/manifesto/manifesto-content'

export const metadata: Metadata = {
  title: 'Manifesto · Enclave',
  description:
    'The Company Brain for organizations that cannot send their data to SaaS AI vendors.',
}

export default function ManifestoPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.98_0.001_145)] text-[#0a0b0d]">
      <Navigation theme="light" />
      <main>
        <ManifestoContent />
      </main>
    </div>
  )
}
