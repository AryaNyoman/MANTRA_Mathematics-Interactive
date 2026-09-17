import type { Metadata, Viewport } from 'next'
import { Newsreader, Space_Grotesk } from 'next/font/google'
import 'katex/dist/katex.min.css'
import './globals.css'
import PetugasVideo from '@/components/PetugasVideo'
import Nav from '@/components/Nav'
import ArahRute from '@/components/mantra/ArahRute'

/**
 * Dua huruf saja, keputusan rancangan MANTRA (3 Sep 2026).
 *
 * Newsreader untuk judul: serif yang tidak pernah ditebalkan, penekanannya
 * lewat ukuran dan miring. Space Grotesk untuk seluruh antarmuka. Fraunces,
 * Inter, dan IBM Plex Mono dipensiunkan; label kecil yang dulu monospace kini
 * memakai Space Grotesk dengan jarak huruf lebar, sehingga tetap terbaca
 * sebagai label tanpa menambah satu keluarga huruf lagi.
 */
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
})
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MANTRA | Matematika Interaktif',
  description:
    'Belajar matematika SMA lewat animasi yang menjelaskan dan alat yang bisa dicoba sendiri.',
}

/**
 * `themeColor` mewarnai bilah atas peramban HP sesuai warna kertas situs,
 * jadi batas antara situs dan peramban tidak terlihat menyambung kasar.
 * Nilainya `#FAF9F5`, sama dengan `--kertas` di `globals.css`.
 *
 * `width` dan `initialScale` ditulis ulang persis seperti bawaan Next supaya
 * tidak hilang saat blok ini menggantikan yang bawaan. Perbesaran cubit
 * TIDAK dimatikan: mematikannya menghalangi orang yang penglihatannya kurang.
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  /* Bilah atas peramban HP kini navy, sama dengan nav yang menempel di
     bawahnya. Dengan kertas, batas antara peramban dan nav gelap terlihat
     sebagai garis terang yang tidak dimaksudkan siapa pun. */
  themeColor: '#101A2B',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /* `data-muat-awal`: dokumen baru dimuat. Daftar (kisi bab, kisi bank
       soal) muncul bertahap hanya selama atribut ini ada; ArahRute
       melepasnya pada pindah halaman pertama, sebab sesudah itu seluruh
       halaman masuk sebagai satu potret View Transition dan kartu tidak
       boleh bergerak sendiri-sendiri (satu sumber gerak per momen). */
    <html
      lang="id"
      className={`${newsreader.variable} ${spaceGrotesk.variable}`}
      data-muat-awal="true"
    >
      <body>
        {/* Nav dirakit SEKALI di sini, bukan di tiap halaman (sistem gerak
            Panggung, 17 Sep 2026): ia jangkar yang diam saat isi di bawahnya
            berpindah. Label per halaman diturunkan Nav sendiri dari alamat. */}
        <ArahRute />
        <Nav />
        {children}
        <PetugasVideo />
      </body>
    </html>
  )
}
