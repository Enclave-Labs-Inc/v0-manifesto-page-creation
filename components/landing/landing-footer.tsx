'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import EnclaveLogo from '@/components/site/enclave-logo'

const navLinks = [
  { href: '/manifesto', label: 'Manifesto' },
  { href: '/manifesto#III', label: 'Architecture' },
  { href: 'mailto:contact@getenclave.ai', label: 'Contact' },
]

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

export default function LandingFooter() {
  const top = useReveal<HTMLDivElement>()
  const bottom = useReveal<HTMLDivElement>()

  return (
    <footer className="relative overflow-hidden bg-[#050608] text-[#9499A6]">
      <div className="relative mx-auto max-w-[1320px] px-6 pb-14 pt-4 sm:px-10 lg:px-14">
        {/* Top row: logo + links + reinforcing one-liner */}
        <div
          ref={top.ref}
          data-in-view={top.inView}
          className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-12"
        >
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="stagger-pop inline-flex transition-opacity duration-150 hover:opacity-80"
              aria-label="Enclave home"
              style={{ ['--stagger-delay' as string]: '60ms' } as React.CSSProperties}
            >
              <EnclaveLogo theme="dark" />
            </Link>
            <p
              className="stagger-pop max-w-[36ch] text-[13px] leading-[1.55] text-[#A0A5B0]"
              style={{ ['--stagger-delay' as string]: '160ms' } as React.CSSProperties}
            >
              All data stays in your VPC.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="stagger-pop nav-underline text-[13px] font-bold tracking-[-0.01em] text-[#C5C9D2] transition-colors duration-150 hover:text-white"
                style={{ ['--stagger-delay' as string]: `${260 + i * 60}ms` } as React.CSSProperties}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Hairline */}
        <div className="mt-12 h-px bg-[#1F2227]" />

        {/* Bottom row: founder email + copyright */}
        <div
          ref={bottom.ref}
          data-in-view={bottom.inView}
          className="mt-6 flex flex-col gap-3 text-[12px] font-bold tracking-[-0.005em] text-[#787D8A] sm:flex-row sm:items-center sm:justify-between"
        >
          <a
            href="mailto:contact@getenclave.ai"
            className="stagger-pop nav-underline inline-flex self-start transition-colors duration-150 hover:text-[#C5C9D2]"
            style={{ ['--stagger-delay' as string]: '60ms' } as React.CSSProperties}
          >
            contact@getenclave.ai
          </a>
          <p
            className="stagger-pop"
            style={{ ['--stagger-delay' as string]: '160ms' } as React.CSSProperties}
          >
            © 2026 Enclave
          </p>
        </div>
      </div>
    </footer>
  )
}
