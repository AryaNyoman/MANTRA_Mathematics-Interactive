import type { Metadata } from 'next'
import Panggung from '@/components/mantra/Panggung'
import Kaki from '@/components/mantra/Kaki'
import DaftarLatihan from '@/components/latihan/DaftarLatihan'

export const metadata: Metadata = {
  title: 'Latihan | MANTRA',
  description:
    'Bank soal berjenjang dari mudah sampai sangat sulit, dengan kemajuan dan lencana yang tersimpan di peramban Anda sendiri.',
}

/**
 * Halaman /latihan.
 *
 * Sebelum 1 Sep 2026 tautan "Latihan" di navigasi mengarah ke halaman yang
 * tidak pernah dibuat, jadi siapa pun yang menekannya bertemu 404.
 *
 * Isinya keenam topik dengan bar kemajuan masing-masing. Lima topik yang
 * materinya belum dibangun ditandai terus terang, bukan disembunyikan:
 * halaman yang berpura-pura penuh lebih merugikan daripada halaman yang jujur
 * mengatakan apa yang belum ada.
 */
export default function HalamanLatihan() {
  return (
    <Panggung>
      <DaftarLatihan />
      <Kaki />
    </Panggung>
  )
}
