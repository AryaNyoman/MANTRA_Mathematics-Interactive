import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Kaki from '@/components/mantra/Kaki'
import ArenaLatihan from '@/components/latihan/ArenaLatihan'
import { KUIS } from '@/content/statistika'

export const metadata: Metadata = {
  title: 'Latihan Statistika | MANTRA',
  description: 'Soal statistika berjenjang dari mudah sampai sangat sulit, dengan pembahasan.',
}

export default function LatihanStatistika() {
  return (
    <>
      <Nav label="Latihan Statistika" />
      <ArenaLatihan topik="statistika" nama="Statistika" bank={KUIS} />
      <Kaki />
    </>
  )
}
