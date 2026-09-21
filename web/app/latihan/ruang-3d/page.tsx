import type { Metadata } from 'next'
import { Suspense } from 'react'
import Panggung from '@/components/mantra/Panggung'
import Kaki from '@/components/mantra/Kaki'
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
  title: 'Bank Soal Ruang Tiga Dimensi | MANTRA',
  description: 'Soal geometri ruang berjenjang dari mudah sampai sangat sulit, dengan pembahasan.',
}

export default function LatihanRuang3D() {
  return (
    <Panggung>
      {/* Suspense WAJIB: ArenaLatihan membaca ?tingkat= lewat useSearchParams (17 Sep 2026). */}
      <Suspense fallback={null}>
        <ArenaLatihan topik="ruang-3d" nama="Ruang Tiga Dimensi" bank={KUIS} />
      </Suspense>
      <Kaki />
    </Panggung>
  )
}
