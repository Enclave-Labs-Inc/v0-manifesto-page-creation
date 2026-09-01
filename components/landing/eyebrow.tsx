import type { CSSProperties, HTMLAttributes } from 'react'

type EyebrowProps = HTMLAttributes<HTMLParagraphElement> & {
  tone?: 'light' | 'dark'
  bulletColor?: string
}

export function Eyebrow({
  children,
  className = '',
  tone = 'light',
  bulletColor,
  style,
  ...rest
}: EyebrowProps) {
  const text = tone === 'dark' ? 'text-[#9499A6]' : 'text-[#50545B]'
  const bullet = bulletColor ?? (tone === 'dark' ? '#9499A6' : '#050608')

  return (
    <p
      {...rest}
      className={`inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.32em] ${text} ${className}`}
      style={{ ...style } as CSSProperties}
    >
      <span
        aria-hidden
        className="inline-block h-[6px] w-[6px]"
        style={{ backgroundColor: bullet }}
      />
      {children}
    </p>
  )
}
