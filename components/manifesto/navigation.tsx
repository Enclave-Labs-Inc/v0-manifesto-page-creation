'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-[#111215] border-b border-[#1E2025]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-12">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/enclave_logo_transparent.png"
            alt="Enclave"
            width={242}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <a
          href="#manifesto"
          className="text-sm font-mono text-[#9499A6] hover:text-[#B4B8C2] transition-colors ml-auto"
        >
          manifesto
        </a>
      </div>
    </nav>
  )
}
