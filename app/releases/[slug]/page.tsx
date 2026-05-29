import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navigation from '@/components/site/navigation'
import LandingFooter from '@/components/landing/landing-footer'
import ReleasesContent from '@/components/releases/releases-content'
import { getRelease, releases } from '@/components/releases/releases-data'

export function generateStaticParams() {
  return releases.map((release) => ({ slug: release.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const release = getRelease(slug)
  if (!release) return {}
  return {
    title: `${release.title} · Enclave`,
    description: release.description,
  }
}

export default async function ReleaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const release = getRelease(slug)
  if (!release) notFound()

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.001_145)] text-[#0a0b0d]">
      <Navigation theme="light" />
      <main>
        <ReleasesContent />
      </main>
      <LandingFooter />
    </div>
  )
}
