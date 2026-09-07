'use client'

import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import Bidang from '@/components/widget/turunan/Bidang'
import {
  MONO, WARNA, angka, jalurFungsi, jalurGaris, jendelaTetap, keLayar, type Jendela,
} from '@/components/widget/turunan/koordinat'
import { batasi, bulatkanKe, posisiDiGambar, posisiMatematika } from '@/components/widget/turunan/seret'
import { useSedangDiubah } from '@/components/kendali/sedang-diubah'

/**
 * Widget "Garis singgung geser", Materi 09.
 *
 * Titik singgungnya diseret, garisnya ikut berputar, dan persamaannya disusun
 * ULANG DI PANEL KANAN langkah demi langkah: titiknya dulu, gradiennya kemudian,
 * baru persamaannya. Urutan itu sengaja sama persis dengan urutan tiga langkah
 * di bacaannya, supaya alat dan teks tidak mengajarkan dua cara berbeda.
 *
 * KENAPA DAFTAR KURVANYA DITULIS DI SINI, BUKAN DI `fungsi.ts`
 * Kedua kurva ini hanya dipakai materi ini, dan salah satunya (x² + 2x + 1)
 * dipilih karena titik terendahnya jatuh tepat di x = -1 sehingga contoh
 * gradien nol di bacaan bisa ditemukan sendiri oleh siswa. Menaruhnya di
 * daftar bersama akan membuat widget lain menawarkan kurva yang tidak ada
 * hubungannya dengan materinya.
 */

export type KurvaSinggung = {
  nilai: string
  label: string
  rumus: string
  f: (x: number) => number
  turunan: (x: number) => number
  jendela: [number, number, number, number]
  sapuan: [number, number]
}

export const KURVA: KurvaSinggung[] = [
  {
    nilai: 'buku',
    label: 'x² + 2x + 1',
    rumus: 'f(x) = x² + 2x + 1',
    f: (x) => x * x + 2 * x + 1,
    turunan: (x) => 2 * x + 2,
    jendela: [-4.2, 2.2, -1.6, 9],
    sapuan: [-3.5, 1.5],
  },
  {
    nilai: 'kubik',
    label: 'x³ - 3x',
    rumus: 'f(x) = x³ - 3x',
    f: (x) => x * x * x - 3 * x,
    turunan: (x) => 3 * x * x - 3,
    jendela: [-2.8, 2.8, -6, 6],
    sapuan: [-2.3, 2.3],
  },
]

export const PILIHAN_KURVA = KURVA.map((k) => ({ nilai: k.nilai, label: k.label }))
export const AWAL = { x1: 0, kurva: 'buku' }

export function kurva(nilai: string): KurvaSinggung {
  return KURVA.find((k) => k.nilai === nilai) ?? KURVA[0]
}

export function batasX1(nilai: string): { min: number; maks: number; langkah: number } {
  const k = kurva(nilai)
  return { min: k.sapuan[0], maks: k.sapuan[1], langkah: 0.25 }
}

/** Persamaan garis singgungnya, sudah dirapikan menjadi y = mx + c. */
export function tulisPersamaan(nilai: string, x1: number): string {
  const k = kurva(nilai)
  const m = k.turunan(x1)
  const c = k.f(x1) - m * x1
  if (m === 0) return `y = ${angka(c, 2)}`
  const bagianM = m === 1 ? 'x' : m === -1 ? '-x' : `${angka(m, 2)}x`
  if (c === 0) return `y = ${bagianM}`
  return `y = ${bagianM} ${c < 0 ? '-' : '+'} ${angka(Math.abs(c), 2)}`
}

export default function GarisSinggungGeser({
  x1, nama, onGeser,
}: {
  x1: number
  nama: string
  onGeser: (x1: number) => void
}) {
  const dipegang = useSedangDiubah()
  const [menyeret, setMenyeret] = useState(false)
  const k = kurva(nama)
  const JENDELA: Jendela = jendelaTetap(...k.jendela)
  const p = keLayar(JENDELA)

  const y1 = k.f(x1)
  const m = k.turunan(x1)
  const nyala = dipegang === 'x1' || menyeret

  function seret(e: ReactPointerEvent<SVGSVGElement>) {
    const mm = posisiMatematika(e, JENDELA)
    if (!mm) return
    const b = batasX1(nama)
    onGeser(batasi(bulatkanKe(mm.x, b.langkah), b.min, b.maks))
  }

  function mulai(e: ReactPointerEvent<SVGSVGElement>) {
    if (!posisiDiGambar(e)) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setMenyeret(true)
    seret(e)
  }

  return (
    <Bidang
      jendela={JENDELA}
      keterangan={k.rumus}
      catatan={[
        { teks: tulisPersamaan(nama, x1), warna: WARNA.sudut },
        {
          teks: m === 0 ? 'gradiennya nol: garisnya mendatar' : `gradien m = ${angka(m, 2)}`,
          warna: m === 0 ? WARNA.depan : WARNA.redup,
        },
      ]}
      catatanBawah={{ teks: 'seret titik singgungnya' }}
      aria={`Kurva ${k.rumus} dengan garis singgung di x sama dengan ${angka(x1, 2)}. Gradiennya ${angka(m, 2)}, dan persamaannya ${tulisPersamaan(nama, x1)}.`}
      gaya={{ cursor: menyeret ? 'grabbing' : 'grab', touchAction: 'none' }}
      onPointerDown={mulai}
      onPointerMove={(e) => { if (menyeret) seret(e) }}
      onPointerUp={() => setMenyeret(false)}
    >
      <path d={jalurFungsi(k.f, JENDELA, 400)} fill="none" stroke={WARNA.miring}
            strokeWidth={2.6} strokeLinecap="round" />

      {/* Garis mendatar bantu, hanya saat gradiennya nol. Itu keadaan yang
          sedang diajarkan, jadi ia pantas ditandai, bukan dibiarkan lewat. */}
      {m === 0 && (
        <line x1={p.x(JENDELA.xMin)} y1={p.y(y1)} x2={p.x(JENDELA.xMax)} y2={p.y(y1)}
              stroke={WARNA.depan} strokeWidth={1.2} strokeDasharray="4 5" opacity={0.7} />
      )}

      <path d={jalurGaris(x1, y1, m, JENDELA)} fill="none" stroke={WARNA.sudut}
            strokeWidth={nyala ? 3 : 2.4} opacity={0.9} strokeLinecap="round" />

      {/* garis putus ke sumbu, supaya x₁ terbaca di sumbu mendatarnya */}
      <line x1={p.x(x1)} y1={p.y(y1)} x2={p.x(x1)} y2={p.y(0)}
            stroke={WARNA.redup} strokeWidth={1} strokeDasharray="3 4" />

      <g className={nyala ? 'nyala' : undefined}>
        <circle cx={p.x(x1)} cy={p.y(y1)} r={18} fill="transparent" />
        <circle cx={p.x(x1)} cy={p.y(y1)} r={nyala ? 8.5 : 7}
                fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={2.2} />
        <text x={p.x(x1) + 12} y={p.y(y1) - 10} fontSize={10.5}
              fill={WARNA.sudut} fontFamily={MONO}>
          ({angka(x1, 2)}, {angka(y1, 2)})
        </text>
      </g>
    </Bidang>
  )
}

/**
 * Tiga langkah penyusunan persamaannya, urutannya sama dengan bacaan.
 *
 * Ditulis sebagai langkah, bukan sebagai satu baris jawaban, sebab yang sedang
 * dilatih memang urutannya: cari titiknya, cari gradiennya, baru susun.
 */
export function langkahSinggung(nama: string, x1: number): Array<{ nama: string; nilai: string }> {
  const k = kurva(nama)
  const y1 = k.f(x1)
  const m = k.turunan(x1)
  return [
    { nama: '1. titik singgungnya', nilai: `(${angka(x1, 2)}, ${angka(y1, 2)})` },
    { nama: '2. gradien f′(x₁)', nilai: angka(m, 2) },
    { nama: '3. y - y₁ = m(x - x₁)', nilai: `y - ${angka(y1, 2)} = ${angka(m, 2)}(x - ${angka(x1, 2)})` },
    { nama: 'dirapikan', nilai: tulisPersamaan(nama, x1) },
  ]
}
