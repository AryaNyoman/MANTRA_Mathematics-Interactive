'use client'

import type { ReactNode } from 'react'

/**
 * Bola data yang bisa dipegang: sasaran sentuhnya jauh lebih besar daripada
 * bolanya, dan bolanya membesar serta menyala saat dipegang.
 *
 * Lahir 5 Sep 2026 dari keluhan ARYA: "bola di Materi 01, 07, 08, 10, 11,
 * dan 12 sulit diambil". Sebabnya, sasaran sentuh selama ini adalah bola itu
 * sendiri, berjari-jari 5 sampai 7 satuan gambar, dan di HP gambar 460
 * satuan dipadatkan ke layar 360 piksel: bolanya tinggal 4 piksel. Jari
 * manusia butuh sekitar 20 piksel. Pola yang sama sudah dipakai pegangan
 * Vektor (lingkaran transparan berjari-jari 16 di belakang bola kecil).
 *
 * `prop` adalah hasil `propTitikSeret` (peran slider, tab, tombol panah,
 * onPointerDown). Dipasang pada <g>, jadi seretan yang dimulai dari mana pun
 * di dalam sasaran besar tetap ditangkap oleh unsur yang sama.
 *
 * `nyala` benar saat kotak tabelnya sedang disunting (`sedang-diubah`), dan
 * `aktif` benar saat bolanya sedang diseret. Keduanya membesarkan bola;
 * `nyala` juga memberi kilau emas lewat kelas `.nyala` di globals.css.
 */
export default function TitikPegang({
  cx, cy, r, fill, aktif = false, nyala = false, prop, tepi = '#FFFDFA', anak,
}: {
  cx: number
  cy: number
  r: number
  fill: string
  aktif?: boolean
  nyala?: boolean
  prop: Record<string, unknown>
  tepi?: string
  /** unsur tambahan yang ikut bergerak bersama bola, misalnya label */
  anak?: ReactNode
}) {
  const besar = aktif || nyala
  return (
    <g className={nyala ? 'nyala' : undefined} {...prop}>
      <circle cx={cx} cy={cy} r={Math.max(r + 10, 16)} fill="transparent" />
      <circle
        cx={cx}
        cy={cy}
        r={besar ? r * 1.35 : r}
        fill={fill}
        stroke={tepi}
        strokeWidth={aktif ? 3 : 1.5}
      />
      {anak}
    </g>
  )
}
