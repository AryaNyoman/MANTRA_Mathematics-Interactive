import type { Metadata } from 'next'
import { Suspense } from 'react'
import Nav from '@/components/Nav'
import Kaki from '@/components/mantra/Kaki'
import ArenaLatihan from '@/components/latihan/ArenaLatihan'
import { KUIS } from '@/content/integral'

export const metadata: Metadata = {
  title: 'Latihan Integral | MANTRA',
  description: 'Soal integral berjenjang dari mudah sampai sangat sulit, dengan pembahasan.',
}

export default function LatihanIntegral() {
  return (
    <>
      <Nav label="Latihan Integral" />
      {/* Suspense WAJIB: ArenaLatihan membaca ?tingkat= lewat useSearchParams (17 Sep 2026). */}
      <Suspense fallback={null}>
        <ArenaLatihan topik="integral" nama="Integral" bank={KUIS} />
      </Suspense>
      <Kaki />
    </>
  )
}
