import type { Metadata } from 'next'
import Navigation from '@/components/site/navigation'
import LandingHero from '@/components/landing/hero'
import SecurityPrinciples from '@/components/landing/security-principles'
import DemoPreview from '@/components/landing/demo-preview'
import LandingFooter from '@/components/landing/landing-footer'

export const metadata: Metadata = {
  title: 'Enclave · AI for your company knowledge',
  description:
    'Ask questions across your company knowledge while keeping your data, permissions and infrastructure under your control.',
}

export default function Home() {
  return (
    <div className="min-h-screen text-[#111214]">
      <Navigation theme="light" />

      <main
        className="bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/landing-hero-bg.jpg')",
        }}
      >
        <LandingHero />
        <SecurityPrinciples />
        <DemoPreview />
      </main>

      <LandingFooter />
    </div>
  )
}
