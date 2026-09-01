import localFont from 'next/font/local'
import { Inter_Tight, JetBrains_Mono } from 'next/font/google'

export const liberationSans = localFont({
  src: [
    {
      path: './fonts/LiberationSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/LiberationSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-liberation-sans',
  display: 'swap',
})

export const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})
