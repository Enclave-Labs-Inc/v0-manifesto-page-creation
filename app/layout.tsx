import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { liberationSans } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Enclave - Sovereign Company Brain',
  description: 'The Company Brain for organizations that cannot send their data to SaaS AI vendors.',
  icons: {
    icon: [
      { url: '/enclave_icon_dark_preview.png', type: 'image/png' },
    ],
    apple: '/enclave_icon_dark_preview.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={liberationSans.variable}>
      <body className="bg-white text-[#111214] antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
