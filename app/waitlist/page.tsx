import type { Metadata } from 'next'
import Navigation from '@/components/site/navigation'
import LandingFooter from '@/components/landing/landing-footer'
import Waitlist from '@/components/landing/waitlist'

export const metadata: Metadata = {
  title: 'Join the waitlist · Enclave',
  description:
    'Enclave is onboarding a small group of design partners first. Request access and we’ll be in touch when a slot opens.',
}

export default function WaitlistPage() {
  return (
    <div className="min-h-screen bg-white text-[#111214]">
      <Navigation theme="light" />
      <main>
        <Waitlist />
      </main>
      <LandingFooter />
    </div>
  )
}
