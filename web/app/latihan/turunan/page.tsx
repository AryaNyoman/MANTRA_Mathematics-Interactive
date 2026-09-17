import type { Metadata } from 'next'
import { Suspense } from 'react'
import Panggung from '@/components/mantra/Panggung'
import Kaki from '@/components/mantra/Kaki'
import ArenaLatihan from '@/components/latihan/ArenaLatihan'
import { KUIS } from '@/content/turunan'

export const metadata: Metadata = {
  title: 'Latihan Turunan | MANTRA',
  description: 'Soal turunan berjenjang dari mudah sampai sangat sulit, dengan pembahasan.',
}

export default function LatihanTurunan() {
  return (
    <Panggung>
      {/* Suspense WAJIB: ArenaLatihan membaca ?tingkat= lewat useSearchParams (17 Sep 2026). */}
      <Suspense fallback={null}>
        <ArenaLatihan topik="turunan" nama="Turunan" bank={KUIS} />
      </Suspense>
      <Kaki />
    </Panggung>
  )
}
