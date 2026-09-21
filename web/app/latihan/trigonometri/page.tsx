import type { Metadata } from 'next'
import { Suspense } from 'react'
import Panggung from '@/components/mantra/Panggung'
import Kaki from '@/components/mantra/Kaki'
import ArenaLatihan from '@/components/latihan/ArenaLatihan'
import { KUIS } from '@/content/trigonometri'

export const metadata: Metadata = {
  title: 'Bank Soal Trigonometri | MANTRA',
  description: 'Soal trigonometri berjenjang dari mudah sampai sangat sulit, dengan pembahasan.',
}

export default function LatihanTrigonometri() {
  return (
    <Panggung>
      {/* Suspense WAJIB: ArenaLatihan membaca ?tingkat= lewat useSearchParams (17 Sep 2026). */}
      <Suspense fallback={null}>
        <ArenaLatihan topik="trigonometri" nama="Trigonometri" bank={KUIS} />
      </Suspense>
      <Kaki />
    </Panggung>
  )
}
