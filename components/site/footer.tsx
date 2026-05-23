interface SiteFooterProps {
  theme?: 'light' | 'dark'
  wide?: boolean
}

export default function SiteFooter({ theme = 'light', wide = false }: SiteFooterProps) {
  const isDark = theme === 'dark'

  return (
    <footer
      className={
        isDark
          ? 'border-t border-[#1A1C20] bg-[#080909] py-6'
          : 'border-t border-[#ECEEF2] bg-white py-8'
      }
    >
      <div
        className={`${wide ? 'max-w-6xl' : 'max-w-3xl'} mx-auto flex flex-col gap-3 px-6 sm:flex-row sm:items-center sm:justify-between`}
      >
        <p
          className={
            isDark
              ? 'text-[11px] font-bold tracking-[0.06em] text-[#9499A6]'
              : 'text-[13px] font-bold text-[#8A9099]'
          }
        >
          enclave · getenclave.ai
        </p>
        <p
          className={
            isDark
              ? 'text-[9px] font-bold text-[#9499A6]'
              : 'text-[13px] font-bold text-[#8A9099]'
          }
        >
          © 2026 Enclave AI Inc.
        </p>
      </div>
    </footer>
  )
}
