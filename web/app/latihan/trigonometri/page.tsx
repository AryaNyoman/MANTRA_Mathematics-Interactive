import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import ArenaLatihan from '@/components/latihan/ArenaLatihan'
import { KUIS } from '@/content/trigonometri'

export const metadata: Metadata = {
  title: 'Latihan Trigonometri | MATRA',
  description: 'Soal trigonometri berjenjang dari mudah sampai sangat sulit, dengan pembahasan.',
}

export default function LatihanTrigonometri() {
  return (
    <>
      <Nav label="Latihan Trigonometri" />
      <ArenaLatihan topik="trigonometri" nama="Trigonometri" bank={KUIS} />
    </>
  )
}
