import localFont from 'next/font/local'

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
