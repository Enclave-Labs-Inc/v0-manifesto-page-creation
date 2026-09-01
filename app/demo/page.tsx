import type { Metadata } from 'next'
import Navigation from '@/components/site/navigation'
import LandingFooter from '@/components/landing/landing-footer'
import DemoContent from '@/components/demo/demo-content'

export const metadata: Metadata = {
  title: 'Demo · Enclave',
  description:
    'See Enclave in action: sovereign AI search running entirely inside your AWS account.',
}

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.965_0_0)] text-[#050608]">
      <Navigation theme="light" />
      <main>
        <DemoContent />
      </main>
      <LandingFooter />
    </div>
  )
}
