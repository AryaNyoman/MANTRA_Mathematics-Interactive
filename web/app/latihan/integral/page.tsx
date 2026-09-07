import type { Metadata } from 'next'
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
      <ArenaLatihan topik="integral" nama="Integral" bank={KUIS} />
      <Kaki />
    </>
  )
}
