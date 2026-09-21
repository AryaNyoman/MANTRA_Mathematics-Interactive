import type { Metadata } from 'next'
import { Suspense } from 'react'
import Panggung from '@/components/mantra/Panggung'
import Kaki from '@/components/mantra/Kaki'
import ArenaLatihan from '@/components/latihan/ArenaLatihan'
import { KUIS } from '@/content/limit'

export const metadata: Metadata = {
  title: 'Bank Soal Limit | MANTRA',
  description: 'Soal limit berjenjang dari mudah sampai sangat sulit, dengan pembahasan.',
}

export default function LatihanLimit() {
  return (
    <Panggung>
      {/* Suspense WAJIB: ArenaLatihan membaca ?tingkat= lewat useSearchParams (17 Sep 2026). */}
      <Suspense fallback={null}>
        <ArenaLatihan topik="limit" nama="Limit" bank={KUIS} />
      </Suspense>
      <Kaki />
    </Panggung>
  )
}
