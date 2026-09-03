import type { Metadata } from 'next'
import Nav from '@/components/Nav'
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
      <ArenaLatihan topik="limit" nama="Limit" bank={KUIS} />
    </>
  )
}
