import type { Metadata } from 'next'
import { Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Enclave - Sovereign Company Brain',
  description: 'The Company Brain for organizations that cannot send their data to SaaS AI vendors.',
  generator: 'v0.app',
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
    <html lang="en" className="bg-[#0A0B0D]">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#0A0B0D] text-[#E8E9EC] antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
