'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import EnclaveLogo from '@/components/site/enclave-logo'

const footerLinks = [
  { href: '/ontos', label: 'Ontos' },
  { href: '/manifesto', label: 'Manifesto' },
  { href: '/releases', label: 'Releases' },
  { href: '/demo', label: 'Demo' },
  { href: 'mailto:contact@getenclave.ai', label: 'Contact' },
]

export default function LandingFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#050608] text-[#9499A6]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#1F2227]" />

      <div className="relative mx-auto max-w-[1440px] px-5 pt-16 pb-8 sm:px-10 sm:pt-20 lg:px-14">
        {/* Top: brand statement + CTA on the left, nav columns on the right */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_1.8fr] md:gap-16">
          <div className="flex flex-col">
            <Link href="/" className="inline-flex" aria-label="Enclave home">
              <EnclaveLogo theme="dark" />
            </Link>
            <p className="font-display mt-6 max-w-[26ch] text-[clamp(1.4rem,2vw,1.8rem)] font-normal leading-[1.2] tracking-[-0.02em] text-[#F4F5F7]">
              Interested in partnering with Enclave?
            </p>
            <a
              href="https://cal.com/shashank-bhardwaj-fwmii1/30min"
              className="group mt-6 inline-flex h-[40px] w-fit items-center gap-2 rounded-[4px] bg-[#F4F5F7] px-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[#050608] transition-[background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white active:scale-[0.985]"
            >
              Contact us
              <ArrowUpRight
                className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </a>
          </div>

          <nav className="flex flex-wrap items-start justify-between gap-x-10 gap-y-5 pt-1">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[13px] tracking-[-0.005em] text-[#C5C9D2] transition-colors duration-150 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom row: hairline + mono copyright */}
        <div className="mt-20 flex flex-col gap-3 border-t border-[#1F2227] pt-6 font-mono text-[10px] tracking-[0.14em] text-[#5E636F] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#5E636F]" />
            <p>© 2026 ENCLAVE · ALL RIGHTS RESERVED</p>
          </div>
          <a
            href="mailto:contact@getenclave.ai"
            className="hover:text-white"
          >
            CONTACT@GETENCLAVE.AI
          </a>
        </div>
      </div>
    </footer>
  )
}
