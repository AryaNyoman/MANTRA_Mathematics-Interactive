'use client'

import Bingkai3D, { Bidang, Ruas, TandaSiku } from '@/components/widget/ruang-3d/Bingkai3D'
import {
  KOTAK, MONO, VH, WARNA, bulat, jarakTitik, kubus, type Sudut,
} from '@/components/widget/ruang-3d/ruang'

/**
 * Widget "Diagonal Kubus", Ruang 3D tahap 4: dua kali Pythagoras.
 *
 * Dua langkah, dan urutannya penting.
 *
 * Langkah 1 menyorot segitiga ABC yang datar di alas. Di situ Pythagoras
 * terasa biasa saja, sebab semuanya masih dua dimensi.
 *
 * Langkah 2 menyorot segitiga ACG yang BERDIRI di dalam kubus. Sisi tegaknya
 * CG, sisi datarnya AC yang baru saja dihitung, dan siku-sikunya di C. Inilah
 * yang biasanya tidak terlihat siswa: diagonal ruang bukan rumus baru, ia cuma
 * Pythagoras yang dipakai untuk kedua kalinya, dengan hasil yang pertama
 * sebagai salah satu sisinya.
 *
 * Karena itu jawabannya akar 3, bukan akar 2 ditambah 1.
 */

export const RUSUK = 6
const BANGUN = kubus(RUSUK)

export const DIAGONAL_SISI = jarakTitik(BANGUN.titik.A, BANGUN.titik.C)
export const DIAGONAL_RUANG = jarakTitik(BANGUN.titik.A, BANGUN.titik.G)

export const LANGKAH = [
  {
    judul: 'Langkah 1: diagonal sisi',
    segitiga: ['A', 'B', 'C'],
    siku: 'B',
    hasil: `AC = ${bulat(DIAGONAL_SISI, 3)} satuan, yaitu 6 akar 2`,
  },
  {
    judul: 'Langkah 2: diagonal ruang',
    segitiga: ['A', 'C', 'G'],
    siku: 'C',
    hasil: `AG = ${bulat(DIAGONAL_RUANG, 3)} satuan, yaitu 6 akar 3`,
  },
] as const

export default function DiagonalKubus({
  langkah,
  sudut,
  onUbah,
}: {
  langkah: number
  sudut: Sudut
  onUbah: (s: Sudut) => void
}) {
  const L = LANGKAH[Math.min(Math.max(langkah, 0), LANGKAH.length - 1)]
  const [n1, n2, n3] = L.segitiga

  return (
    <Bingkai3D
      bangun={BANGUN}
      sudut={sudut}
      onUbah={onUbah}
      keterangan={`segitiga ${n1}${n2}${n3}, siku-siku di ${L.siku}`}
      bawah={L.hasil}
      aria={`Kubus ABCD.EFGH rusuk ${RUSUK}. Segitiga ${n1}${n2}${n3} disorot, siku-siku di ${L.siku}. ${L.hasil}.`}
    >
      {(_kam, layar) => {
        const p1 = layar[n1], p2 = layar[n2], p3 = layar[n3]
        const pusat = {
          x: (p1.x + p2.x + p3.x) / 3,
          y: (p1.y + p2.y + p3.y) / 3,
        }

        /** Label panjang sisi, didorong keluar dari pusat segitiga. */
        const labelSisi = (a: typeof p1, b: typeof p1, teks: string, warna: string) => {
          const tx = (a.x + b.x) / 2
          const ty = (a.y + b.y) / 2
          const dx = tx - pusat.x
          const dy = ty - pusat.y
          const j = Math.hypot(dx, dy) || 1
          return (
            <text x={tx + (dx / j) * 16} y={ty + (dy / j) * 16 + 3.5} textAnchor="middle"
                  fontSize={11.5} fontFamily={MONO} fill={warna}>
              {teks}
            </text>
          )
        }

        const miring = langkah === 0
          ? { a: p1, b: p3, teks: bulat(DIAGONAL_SISI, 2) }
          : { a: p1, b: p3, teks: bulat(DIAGONAL_RUANG, 2) }

        return (
          <>
            <Bidang titik={[p1, p2, p3]} warna={WARNA.sudut} opacity={0.16} />
            <Ruas a={p1} b={p2} warna={WARNA.samping} tebal={3} />
            <Ruas a={p2} b={p3} warna={WARNA.samping} tebal={3} />
            <Ruas a={miring.a} b={miring.b} warna={WARNA.depan} tebal={4} />
            <TandaSiku sudut={layar[L.siku]} ke1={p1} ke2={p3} warna={WARNA.sudut} />

            {labelSisi(p1, p2, langkah === 0 ? '6' : bulat(DIAGONAL_SISI, 2), WARNA.samping)}
            {labelSisi(p2, p3, '6', WARNA.samping)}
            {labelSisi(miring.a, miring.b, miring.teks, WARNA.depan)}

            <text x={KOTAK.x0} y={VH - 21} fontSize={11.5} fontFamily={MONO} fill={WARNA.redup}>
              {langkah === 0 ? '6² + 6² = 72' : '72 + 6² = 108'}
            </text>
          </>
        )
      }}
    </Bingkai3D>
  )
}
