import type { Metadata } from 'next'
import Navigation from '@/components/site/navigation'
import LandingFooter from '@/components/landing/landing-footer'
import OntosHero from '@/components/ontos/ontos-hero'
import Connections from '@/components/ontos/connections'
import AskDemo from '@/components/ontos/ask-demo'
import Guarantees from '@/components/ontos/guarantees'
import Developers from '@/components/ontos/developers'
import Waitlist from '@/components/ontos/waitlist'

export const metadata: Metadata = {
  title: 'Ontos · Enclave',
  description:
    'A managed knowledge-graph platform: give it your documents and it finds the connections, with provenance, history and an audit record behind every answer. Join the waitlist.',
}

export default function OntosPage() {
  return (
    <div className="min-h-screen bg-white text-[#050608]">
      <Navigation theme="light" />
      <main>
        <OntosHero />
        <Connections />
        <AskDemo />
        <Guarantees />
        <Developers />
        <Waitlist />
      </main>
      <LandingFooter />
    </div>
  )
}
