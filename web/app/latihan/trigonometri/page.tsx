import type { Metadata } from 'next'
import { Suspense } from 'react'
import Nav from '@/components/Nav'
import Kaki from '@/components/mantra/Kaki'
import ArenaLatihan from '@/components/latihan/ArenaLatihan'
import { KUIS } from '@/content/trigonometri'

export const metadata: Metadata = {
  title: 'Latihan Trigonometri | MANTRA',
  description: 'Soal trigonometri berjenjang dari mudah sampai sangat sulit, dengan pembahasan.',
}

export default function LatihanTrigonometri() {
  return (
    <>
      <Nav label="Latihan Trigonometri" />
      {/* Suspense WAJIB: ArenaLatihan membaca ?tingkat= lewat useSearchParams (17 Sep 2026). */}
      <Suspense fallback={null}>
        <ArenaLatihan topik="trigonometri" nama="Trigonometri" bank={KUIS} />
      </Suspense>
      <Kaki />
    </>
  )
}
