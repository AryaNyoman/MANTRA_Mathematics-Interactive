import type { Metadata, Viewport } from 'next'
import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MATRA | Matematika Interaktif',
  description:
    'Belajar matematika SMA lewat animasi yang menjelaskan dan alat yang bisa dicoba sendiri.',
}

/**
 * `themeColor` mewarnai bilah atas peramban HP sesuai warna kertas situs,
 * jadi batas antara situs dan peramban tidak terlihat menyambung kasar.
 * Nilainya krem `#F6F2EC`, warna latar "Studio Teknis" yang sama dengan
 * `--kertas` di `globals.css`.
 *
 * `width` dan `initialScale` ditulis ulang persis seperti bawaan Next supaya
 * tidak hilang saat blok ini menggantikan yang bawaan. Perbesaran cubit
 * TIDAK dimatikan: mematikannya menghalangi orang yang penglihatannya kurang.
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F6F2EC',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
