import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import ArenaLatihan from '@/components/latihan/ArenaLatihan'
import { KUIS } from '@/content/grafik-fungsi'

export const metadata: Metadata = {
  title: 'Latihan Grafik Fungsi | MATRA',
  description: 'Soal grafik fungsi berjenjang dari mudah sampai sangat sulit, dengan pembahasan.',
}

export default function LatihanGrafikFungsi() {
  return (
    <>
      <Nav label="Latihan Grafik Fungsi" />
      <ArenaLatihan topik="grafik-fungsi" nama="Grafik Fungsi" bank={KUIS} />
    </>
  )
}
