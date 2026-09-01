'use client'

import { Fragment, type ReactNode } from 'react'
import { GARIS_SUMBU, MONO, PERAN } from '@/components/widget/statistika/warna-data'
import { angka, type Petak } from '@/components/widget/statistika/skala'

/**
 * Garis bilangan mendatar, dan tumpukan titik di atasnya.
 *
 * Dipakai bersama oleh widget Tahap 1, 5, 6, dan 7. Semuanya menampilkan data
 * sebagai titik di atas garis bilangan, sebab bentuk itu tidak menyembunyikan
 * apa pun: satu data satu titik, dan nilai yang muncul dua kali terlihat
 * sebagai tumpukan.
 */

export function GarisBilangan({
  ke, y, tik, dariX, sampaiX,
}: {
  /** ubah nilai data menjadi koordinat mendatar layar */
  ke: (v: number) => number
  /** ketinggian garisnya di layar */
  y: number
  tik: Petak[]
  dariX: number
  sampaiX: number
}) {
  return (
    <>
      <line x1={ke(dariX)} y1={y} x2={ke(sampaiX)} y2={y} stroke={GARIS_SUMBU} strokeWidth={1.6} />
      {tik.map((t) => (
        <Fragment key={t.nilai}>
          <line x1={ke(t.nilai)} y1={y} x2={ke(t.nilai)} y2={y + 4} stroke={GARIS_SUMBU} strokeWidth={1} />
          <text x={ke(t.nilai)} y={y + 15} textAnchor="middle" fontSize={9.5}
                fill={PERAN.redup} fontFamily={MONO}>{t.label}</text>
        </Fragment>
      ))}
    </>
  )
}

/**
 * Hitung tinggi tumpukan tiap data.
 *
 * Nilai yang sama muncul beberapa kali digambar bertumpuk ke atas, bukan
 * ditimpa. Kalau ditimpa, dua siswa bernilai sama akan terlihat sebagai satu
 * siswa, dan modus jadi mustahil dibaca dari gambarnya.
 *
 * Dihitung sekali menjadi senarai, BUKAN dengan penghitung yang dinaikkan di
 * dalam `map` saat menggambar. React 19 melarang mengubah variabel biasa
 * setelah render selesai, dan larangan itu pernah kena di proyek ini.
 */
export function tinggiTumpukan(data: number[]): number[] {
  const sudah = new Map<number, number>()
  return data.map((v) => {
    const n = sudah.get(v) ?? 0
    sudah.set(v, n + 1)
    return n
  })
}

export function TumpukanTitik({
  data, ke, dasar, jejari = 5.5, warna = PERAN.data, warnaKhusus, propTitik, sela = 2,
}: {
  data: number[]
  ke: (v: number) => number
  /** garis tempat titik paling bawah duduk */
  dasar: number
  jejari?: number
  warna?: string
  /** warna khusus per titik, misalnya untuk menandai pencilan */
  warnaKhusus?: (nilai: number, indeks: number) => string | undefined
  /** prop tambahan per titik, misalnya penanganan seret */
  propTitik?: (indeks: number, nilai: number) => Record<string, unknown>
  sela?: number
}): ReactNode {
  const tumpuk = tinggiTumpukan(data)
  return (
    <>
      {data.map((v, i) => (
        <circle
          key={i}
          cx={ke(v)}
          cy={dasar - jejari - tumpuk[i] * (jejari * 2 + sela)}
          r={jejari}
          fill={warnaKhusus?.(v, i) ?? warna}
          stroke="#FFFDFA"
          strokeWidth={1.5}
          {...(propTitik?.(i, v) ?? {})}
        />
      ))}
    </>
  )
}

/** Penanda tegak berlabel, untuk mean, median, dan kuartil. */
export function Penanda({
  x, dariY, sampaiY, warna, label, nilai, sisi = 'atas', putus = false,
}: {
  x: number
  dariY: number
  sampaiY: number
  warna: string
  label: string
  nilai?: number
  /** tulisan di atas garis atau di bawahnya */
  sisi?: 'atas' | 'bawah'
  putus?: boolean
}) {
  const y = sisi === 'atas' ? Math.min(dariY, sampaiY) - 5 : Math.max(dariY, sampaiY) + 12
  return (
    <>
      <line x1={x} y1={dariY} x2={x} y2={sampaiY} stroke={warna} strokeWidth={2}
            strokeDasharray={putus ? '4 3' : undefined} />
      <text x={x} y={y} textAnchor="middle" fontSize={10} fontFamily={MONO} fill={warna}>
        {nilai === undefined ? label : `${label} ${angka(nilai, 2)}`}
      </text>
    </>
  )
}
