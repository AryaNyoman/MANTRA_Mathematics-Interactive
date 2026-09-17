import type { Metadata } from 'next'
import { Suspense } from 'react'
import Nav from '@/components/Nav'
import Kaki from '@/components/mantra/Kaki'
import ArenaLatihan from '@/components/latihan/ArenaLatihan'
import { KUIS } from '@/content/limit'

export const metadata: Metadata = {
  title: 'Latihan Limit | MANTRA',
  description: 'Soal limit berjenjang dari mudah sampai sangat sulit, dengan pembahasan.',
}

export default function LatihanLimit() {
  return (
    <>
      <Nav label="Latihan Limit" />
      {/* Suspense WAJIB: ArenaLatihan membaca ?tingkat= lewat useSearchParams (17 Sep 2026). */}
      <Suspense fallback={null}>
        <ArenaLatihan topik="limit" nama="Limit" bank={KUIS} />
      </Suspense>
      <Kaki />
    </>
  )
}
