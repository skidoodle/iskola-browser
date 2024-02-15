import type { Metadata } from 'next'
import { Providers } from './providers'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Iskolakereső: Gyors és Egyszerű',
  description:
    'Fedezze fel és válassza ki az iskolát könnyedén! Gyors keresés, részletes információk – az iskolakeresés most egyszerűbb, mint valaha.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='hu' className='bg-slate-950 dark'>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
      ></meta>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
