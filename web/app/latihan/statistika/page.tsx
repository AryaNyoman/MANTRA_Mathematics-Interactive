import type { Metadata } from 'next'
import { Suspense } from 'react'
import Nav from '@/components/Nav'
import Kaki from '@/components/mantra/Kaki'
import ArenaLatihan from '@/components/latihan/ArenaLatihan'
import { KUIS } from '@/content/statistika'

export const metadata: Metadata = {
  title: 'Latihan Statistika | MANTRA',
  description: 'Soal statistika berjenjang dari mudah sampai sangat sulit, dengan pembahasan.',
}

export default function LatihanStatistika() {
  return (
    <>
      <Nav label="Latihan Statistika" />
      {/* Suspense WAJIB: ArenaLatihan membaca ?tingkat= lewat useSearchParams (17 Sep 2026). */}
      <Suspense fallback={null}>
        <ArenaLatihan topik="statistika" nama="Statistika" bank={KUIS} />
      </Suspense>
      <Kaki />
    </>
  )
}
