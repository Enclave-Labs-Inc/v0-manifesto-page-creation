'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import EnclaveLogo from '@/components/site/enclave-logo'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/manifesto', label: 'Manifesto' },
  { href: '/releases', label: 'Releases' },
  { href: '/demo', label: 'Demo' },
  { href: 'mailto:contact@getenclave.ai', label: 'Contact' },
]

interface NavigationProps {
  theme?: 'light' | 'dark'
}

export default function Navigation({ theme = 'light' }: NavigationProps) {
  const pathname = usePathname()
  const isDark = theme === 'dark'
  const [hasScrolled, setHasScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const updateScrolled = () => setHasScrolled(window.scrollY > 12)
    updateScrolled()
    window.addEventListener('scroll', updateScrolled, { passive: true })
    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll when the mobile drawer is open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [menuOpen])

  return (
    <nav
      className={cn(
        'top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]',
        isDark
          ? 'sticky border-b border-[#1E2025] bg-[#111215]/95 backdrop-blur-md'
          : hasScrolled || menuOpen
            ? 'fixed inset-x-0 border-b border-[oklch(0.9_0_0/0.6)] bg-[oklch(0.985_0_0/0.92)] backdrop-blur-xl'
            : 'fixed inset-x-0 border-b border-transparent bg-transparent'
      )}
    >
      <div className="mx-auto flex h-[64px] max-w-[1440px] items-center px-5 sm:h-[68px] sm:px-10 lg:px-14">
        <Link
          href="/"
          className="flex-shrink-0 active:opacity-80 transition-opacity duration-150"
        >
          <EnclaveLogo theme={theme} />
        </Link>

        <div className="ml-auto hidden items-center gap-9 md:flex">
          {navLinks.map((link) => {
            const isActive =
              (link.href === '/manifesto' && pathname.startsWith('/manifesto')) ||
              (link.href === '/releases' && pathname.startsWith('/releases')) ||
              (link.href === '/demo' && pathname.startsWith('/demo'))

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
                  isDark
                    ? 'text-[#9499A6] hover:text-[#F0F2F5]'
                    : 'text-[#50545B] hover:text-[#050608]',
                  isActive && (isDark ? 'text-[#F0F2F5]' : 'text-[#050608]'),
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <a
          href="https://cal.com/shashank-bhardwaj-fwmii1/30min"
          className={cn(
            'ml-auto hidden h-[36px] items-center gap-2 rounded-[4px] border px-4 text-[11px] font-medium uppercase tracking-[0.18em] transition-[background-color,color,border-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.985] sm:inline-flex md:ml-6',
            isDark
              ? 'border-[#2A2D34] text-[#E8E9EC] hover:bg-[#17191E]'
              : 'border-[#1B1D21] text-[#050608] hover:bg-[#050608] hover:text-[oklch(0.985_0_0)]'
          )}
        >
          Request access
          <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
        </a>

        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className={cn(
            'ml-auto inline-flex h-10 w-10 items-center justify-center rounded-[4px] border md:hidden',
            isDark
              ? 'border-[#2A2D34] text-[#E8E9EC]'
              : 'border-[#1B1D21] text-[#050608]'
          )}
        >
          {menuOpen ? <X className="h-4 w-4" strokeWidth={2} /> : <Menu className="h-4 w-4" strokeWidth={2} />}
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-x-0 top-[64px] z-40 flex flex-col gap-6 border-t border-[oklch(0.9_0_0/0.6)] bg-[oklch(0.985_0_0/0.98)] px-5 pt-8 pb-10 backdrop-blur-xl md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium uppercase tracking-[0.18em] text-[#050608]"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://cal.com/shashank-bhardwaj-fwmii1/30min"
            className="mt-2 inline-flex h-[44px] w-full items-center justify-center gap-2 rounded-[4px] bg-[#050608] px-4 text-[11px] font-medium uppercase tracking-[0.18em] text-[oklch(0.985_0_0)]"
          >
            Request access
            <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
          </a>
        </div>
      )}
    </nav>
  )
}
