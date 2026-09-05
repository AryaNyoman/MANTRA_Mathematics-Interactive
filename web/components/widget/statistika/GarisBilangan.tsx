'use client'

import { useSedangDiubah } from '@/components/kendali/sedang-diubah'
import TitikPegang from '@/components/widget/statistika/TitikPegang'
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
 * DITUMPUK MENURUT JARAK DI LAYAR, BUKAN MENURUT NILAI YANG SAMA PERSIS.
 * Versi pertama cuma menumpuk nilai yang identik, dan itu gagal pada data yang
 * berdekatan tetapi tidak sama: sembilan gaji antara 4,2 dan 7 juta pada sumbu
 * selebar 80 juta cuma memakai 14 piksel, sehingga kesembilan titiknya menyatu
 * jadi satu noda dan tidak ada yang bisa menghitungnya. Itu terlihat di potret
 * layar Tahap 6.
 *
 * Sekarang titik yang letaknya di layar lebih dekat daripada satu diameter
 * ditumpuk ke atas. Letak mendatarnya tetap sesuai nilainya, jadi tidak ada
 * yang digeser bohong; yang berubah cuma ketinggiannya.
 *
 * Dihitung sekali menjadi senarai, BUKAN dengan penghitung yang dinaikkan di
 * dalam `map` saat menggambar. React 19 melarang mengubah variabel biasa
 * setelah render selesai, dan larangan itu pernah kena di proyek ini.
 */
export function tinggiTumpukan(kunci: number[]): number[] {
  const sudah = new Map<number, number>()
  return kunci.map((k) => {
    const n = sudah.get(k) ?? 0
    sudah.set(k, n + 1)
    return n
  })
}

export function TumpukanTitik({
  data, ke, dasar, jejari = 5.5, warna = PERAN.data, warnaKhusus, propTitik, sela = 2,
  kunci, aktif = null,
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
  /** awalan kunci `sedang-diubah`: bola ke-i menyala saat `${kunci}-${i}` dipegang di tabel */
  kunci?: string
  /** indeks bola yang sedang diseret */
  aktif?: number | null
}): ReactNode {
  const dipegang = useSedangDiubah()
  const lebarSel = jejari * 2 + sela
  // urutan menentukan siapa yang di bawah, jadi diurutkan dulu supaya
  // tumpukannya tidak terlihat acak saat titiknya diseret
  const urutan = data.map((v, i) => i).sort((a, b) => data[a] - data[b])
  const kunciUrut = urutan.map((i) => Math.round(ke(data[i]) / lebarSel))
  const tinggiUrut = tinggiTumpukan(kunciUrut)
  const tumpuk: number[] = []
  urutan.forEach((i, n) => { tumpuk[i] = tinggiUrut[n] })
  return (
    <>
      {data.map((v, i) => propTitik ? (
        // Bola yang bisa diseret memakai sasaran sentuh besar (TitikPegang);
        // bola pajangan tetap lingkaran biasa.
        <TitikPegang
          key={i}
          cx={ke(v)}
          cy={dasar - jejari - tumpuk[i] * lebarSel}
          r={jejari}
          fill={warnaKhusus?.(v, i) ?? warna}
          aktif={aktif === i}
          nyala={kunci !== undefined && dipegang === `${kunci}-${i}`}
          prop={propTitik(i, v)}
        />
      ) : (
        <circle
          key={i}
          cx={ke(v)}
          cy={dasar - jejari - tumpuk[i] * lebarSel}
          r={jejari}
          fill={warnaKhusus?.(v, i) ?? warna}
          stroke="#FFFDFA"
          strokeWidth={1.5}
        />
      ))}
    </>
  )
}

/** Penanda tegak berlabel, untuk mean, median, dan kuartil. */
export function Penanda({
  x, dariY, sampaiY, warna, label, nilai, sisi = 'atas', putus = false, jarak = 0,
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
  /** dorongan tambahan menjauh dari garisnya, untuk menghindari tabrakan */
  jarak?: number
}) {
  const y = sisi === 'atas'
    ? Math.min(dariY, sampaiY) - 5 - jarak
    : Math.max(dariY, sampaiY) + 12 + jarak
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
