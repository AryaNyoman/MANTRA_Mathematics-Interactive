import type { Metadata } from 'next'
import { Suspense } from 'react'
import Nav from '@/components/Nav'
import Kaki from '@/components/mantra/Kaki'
import ArenaLatihan from '@/components/latihan/ArenaLatihan'
import { KUIS } from '@/content/grafik-fungsi'

export const metadata: Metadata = {
  title: 'Latihan Grafik Fungsi | MANTRA',
  description: 'Soal grafik fungsi berjenjang dari mudah sampai sangat sulit, dengan pembahasan.',
}

export default function LatihanGrafikFungsi() {
  return (
    <>
      <Nav label="Latihan Grafik Fungsi" />
      {/* Suspense WAJIB: ArenaLatihan membaca ?tingkat= lewat useSearchParams (17 Sep 2026). */}
      <Suspense fallback={null}>
        <ArenaLatihan topik="grafik-fungsi" nama="Grafik Fungsi" bank={KUIS} />
      </Suspense>
      <Kaki />
    </>
  )
}
