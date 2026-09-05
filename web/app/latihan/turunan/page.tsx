import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Kaki from '@/components/mantra/Kaki'
import ArenaLatihan from '@/components/latihan/ArenaLatihan'
import { KUIS } from '@/content/turunan'

export const metadata: Metadata = {
  title: 'Latihan Turunan | MANTRA',
  description: 'Soal turunan berjenjang dari mudah sampai sangat sulit, dengan pembahasan.',
}

export default function LatihanTurunan() {
  return (
    <>
      <Nav label="Latihan Turunan" />
      <ArenaLatihan topik="turunan" nama="Turunan" bank={KUIS} />
      <Kaki />
    </>
  )
}
