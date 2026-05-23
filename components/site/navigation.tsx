'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import EnclaveLogo from '@/components/site/enclave-logo'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/manifesto', label: 'Manifesto' },
  { href: '/manifesto#III', label: 'Architecture' },
  { href: 'mailto:contact@getenclave.ai', label: 'Contact' },
]

interface NavigationProps {
  theme?: 'light' | 'dark'
}

export default function Navigation({ theme = 'light' }: NavigationProps) {
  const pathname = usePathname()
  const isDark = theme === 'dark'
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const updateScrolled = () => setHasScrolled(window.scrollY > 12)

    updateScrolled()
    window.addEventListener('scroll', updateScrolled, { passive: true })

    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])

  return (
    <nav
      className={cn(
        'top-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]',
        isDark
          ? 'sticky border-b border-[#1E2025] bg-[#111215]/95 backdrop-blur-md'
          : hasScrolled
            ? 'fixed inset-x-0 border-b border-[oklch(0.86_0.008_145/0.72)] bg-[oklch(0.985_0.004_145/0.62)] shadow-[0_18px_60px_oklch(0.22_0.015_145/0.08)] backdrop-blur-xl'
            : 'fixed inset-x-0 border-b border-transparent bg-transparent'
      )}
    >
      <div className="mx-auto flex h-[84px] max-w-[1440px] items-center gap-5 px-6 sm:px-10 lg:px-16 xl:px-20">
        <Link
          href="/"
          className="flex-shrink-0 active:opacity-80 transition-opacity duration-150"
        >
          <EnclaveLogo theme={theme} />
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-[4.4rem] md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative text-[14px] font-bold tracking-[-0.02em] transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
                isDark
                  ? 'text-[#AEB3BC] hover:text-[#F0F2F5]'
                  : 'text-[#45484E] hover:text-[#07080A]',
                link.href === '/manifesto' && (pathname === '/' || pathname.startsWith('/manifesto')) && (isDark ? 'text-[#F0F2F5]' : 'text-[#07080A]')
              )}
            >
              {link.label}
              {link.href === '/manifesto' && (
                <span className="absolute left-1/2 top-[calc(100%+9px)] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-current" />
              )}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Link
            href="/manifesto"
            className={cn(
              'hidden h-[44px] items-center rounded-[10px] px-5 text-[13px] font-bold active:scale-[0.98] transition-[background-color,color,transform,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] sm:inline-flex',
              isDark
                ? 'border border-[#2A2D34] text-[#E8E9EC] hover:bg-[#17191E]'
                : 'border border-[oklch(0.87_0.008_145/0.8)] bg-[oklch(0.995_0.003_145/0.52)] text-[#111214] shadow-[inset_0_1px_0_oklch(1_0_0/0.62),0_10px_28px_oklch(0.34_0.01_145/0.06)] backdrop-blur-xl hover:bg-[oklch(0.995_0.003_145/0.76)]'
            )}
          >
            Read manifesto
          </Link>
          <a
            href="https://cal.com/shashank-bhardwaj-fwmii1/30min"
            className={cn(
              'inline-flex h-[44px] items-center gap-2 rounded-[10px] px-5 text-[13px] font-bold active:scale-[0.98] transition-[background-color,color,transform,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]',
              isDark
                ? 'bg-[#E8E9EC] text-[#0A0B0D] hover:bg-[#F4F5F7]'
                : 'bg-[#07080A] text-[oklch(0.985_0.003_145)] shadow-[0_14px_34px_oklch(0.18_0.008_145/0.2)] hover:bg-[#1B1D21] hover:shadow-[0_18px_42px_oklch(0.18_0.008_145/0.24)]'
            )}
          >
            Book a call
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
        </div>
      </div>
    </nav>
  )
}
