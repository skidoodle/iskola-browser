import type { Metadata } from 'next'
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
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
