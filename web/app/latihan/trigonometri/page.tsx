import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import ArenaLatihan from '@/components/latihan/ArenaLatihan'

export const metadata: Metadata = {
  title: 'Latihan Trigonometri | MATRA',
  description: 'Soal trigonometri berjenjang dari mudah sampai sangat sulit, dengan pembahasan.',
}

export default function LatihanTrigonometri() {
  return (
    <>
      <Nav label="Latihan Trigonometri" />
      <ArenaLatihan />
    </>
  )
}
