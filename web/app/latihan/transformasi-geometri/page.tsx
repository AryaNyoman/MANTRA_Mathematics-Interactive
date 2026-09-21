import type { Metadata } from 'next'
import { Suspense } from 'react'
import Panggung from '@/components/mantra/Panggung'
import ArenaLatihan from '@/components/latihan/ArenaLatihan'
import { KUIS } from '@/content/transformasi-geometri'

/**
 * Halaman /latihan/transformasi-geometri.
 *
 * KENAPA BERKAS INI PERLU ADA
 * Rute /latihan BUKAN rute dinamis. Tiap topik punya foldernya sendiri di
 * `web/app/latihan/`. Begitu sebuah topik didaftarkan di
 * `content/daftar-isi.ts`, halaman /latihan OTOMATIS menampilkan kartunya
 * beserta tautan, dan tautan itu menuju alamat yang belum ada. Tanpa berkas
 * ini, tautannya menjawab 404.
 *
 * Diperiksa dari keluaran `npm run build`: sebelum berkas ini ditambahkan,
 * daftar rute memuat enam halaman /latihan untuk enam topik lama dan tidak
 * memuat yang ketujuh, walaupun topiknya sudah didaftarkan.
 *
 * Isinya salinan pola /latihan/vektor. Berkas BARU di folder BARU, jadi tidak
 * menimpa apa pun milik sesi lain. Berkas ini juga tidak termasuk daftar
 * berkas tampilan milik MASTER di PROGRESS.md, yang menyebut
 * `web/components/latihan/*`, bukan `web/app/latihan/`.
 */
export const metadata: Metadata = {
  title: 'Bank Soal Transformasi Geometri | MANTRA',
  description:
    'Soal transformasi geometri berjenjang dari mudah sampai sangat sulit, dengan pembahasan: translasi, pencerminan, rotasi, dilatasi, dan komposisi.',
}

export default function LatihanTransformasiGeometri() {
  return (
    <Panggung>
      {/* Suspense WAJIB: ArenaLatihan membaca ?tingkat= lewat useSearchParams (17 Sep 2026). */}
      <Suspense fallback={null}>
        <ArenaLatihan topik="transformasi-geometri" nama="Transformasi Geometri" bank={KUIS} />
      </Suspense>
    </Panggung>
  )
}
