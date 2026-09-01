import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import ArenaLatihan from '@/components/latihan/ArenaLatihan'
import { KUIS } from '@/content/ruang-3d'

/**
 * Halaman /latihan/ruang-3d.
 *
 * Begitu ruang-3d didaftarkan di `content/daftar-isi.ts`, halaman /latihan
 * otomatis menampilkan kartu Ruang Tiga Dimensi beserta tautannya, sebab
 * `DaftarLatihan` membaca daftar itu. Tanpa berkas ini tautannya menjawab 404.
 * Pola yang sama dipakai keempat topik lain. Dibuat MASTER saat penggabungan
 * 2 Sep 2026 karena sesi RUANG-3D belum membuatnya.
 */
export const metadata: Metadata = {
  title: 'Latihan Ruang Tiga Dimensi | MATRA',
  description: 'Soal geometri ruang berjenjang dari mudah sampai sangat sulit, dengan pembahasan.',
}

export default function LatihanRuang3D() {
  return (
    <>
      <Nav label="Latihan Ruang 3D" />
      <ArenaLatihan topik="ruang-3d" nama="Ruang Tiga Dimensi" bank={KUIS} />
    </>
  )
}
