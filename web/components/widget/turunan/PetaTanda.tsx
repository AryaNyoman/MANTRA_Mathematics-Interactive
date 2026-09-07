'use client'

import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import Bidang from '@/components/widget/turunan/Bidang'
import {
  KOTAK, MONO, VW, WARNA, angka, jalurFungsi, jalurGaris, jendelaTetap, keLayar, type Jendela,
} from '@/components/widget/turunan/koordinat'
import { batasi, bulatkanKe, posisiDiGambar, posisiMatematika } from '@/components/widget/turunan/seret'
import { useSedangDiubah } from '@/components/kendali/sedang-diubah'

/**
 * Widget "Peta tanda", Materi 10.
 *
 * Pita berwarna tepat di bawah sumbu x menandai daerah naik dan daerah turun,
 * dan warnanya berganti PERSIS di akar f′. Yang harus dilihat siswa bukan nilai
 * f′, melainkan tandanya saja: itulah seluruh gagasan tabel tanda.
 *
 * KENAPA PITANYA DI LUAR KOTAK GRAFIK
 * Percobaan pertama menaruh pita tepat di bawah sumbu mendatar, di dalam kotak.
 * Hasilnya: kurva memotong sumbu justru di dalam pita, dan kata "naik" serta
 * "turun" tertembus garis kurvanya. Aturan proyek melarang tulisan menabrak
 * gambar, jadi pitanya dipindah ke baris sendiri di bawah bidang, memakai
 * pemetaan x yang sama persis sehingga tetap sejajar dengan grafiknya. Bentuk
 * ini juga lebih dekat dengan tabel tanda yang ada di buku.
 *
 * KENAPA ADA PILIHAN x³
 * Dua kurva pertama berganti tanda dengan rapi, dan kalau hanya itu yang
 * tersedia siswa akan menyimpulkan f′ = 0 selalu berarti kurva berbalik. x³
 * membantahnya di depan mata: pitanya tidak berganti warna di x = 0 walaupun
 * ada titik stasioner di sana. Bantahan itu ditulis juga di kotak "sering
 * keliru" materi ini, dan alat serta teks harus mengatakan hal yang sama.
 */

export type KurvaTanda = {
  nilai: string
  label: string
  rumus: string
  rumusTurunan: string
  f: (x: number) => number
  turunan: (x: number) => number
  /** akar f′, ditulis tangan supaya pitanya tidak bergantung pencarian numerik */
  akar: number[]
  jendela: [number, number, number, number]
  sapuan: [number, number]
}

export const KURVA: KurvaTanda[] = [
  {
    nilai: 'kubik',
    label: 'x³ - 3x',
    rumus: 'f(x) = x³ - 3x',
    rumusTurunan: 'f′(x) = 3x² - 3',
    f: (x) => x * x * x - 3 * x,
    turunan: (x) => 3 * x * x - 3,
    akar: [-1, 1],
    jendela: [-2.8, 2.8, -6, 6],
    sapuan: [-2.3, 2.3],
  },
  {
    nilai: 'parabola',
    label: '-x² + 4x',
    rumus: 'f(x) = -x² + 4x',
    rumusTurunan: 'f′(x) = -2x + 4',
    f: (x) => -x * x + 4 * x,
    turunan: (x) => -2 * x + 4,
    akar: [2],
    jendela: [-1.2, 5.2, -3, 5.4],
    sapuan: [-0.8, 4.8],
  },
  {
    nilai: 'x3',
    label: 'x³',
    rumus: 'f(x) = x³',
    rumusTurunan: 'f′(x) = 3x²',
    f: (x) => x * x * x,
    turunan: (x) => 3 * x * x,
    akar: [0],
    jendela: [-2, 2, -6, 6],
    sapuan: [-1.7, 1.7],
  },
]

export const PILIHAN_KURVA = KURVA.map((k) => ({ nilai: k.nilai, label: k.label }))
export const AWAL = { x: -2, kurva: 'kubik' }

export function kurva(nilai: string): KurvaTanda {
  return KURVA.find((k) => k.nilai === nilai) ?? KURVA[0]
}

export function batasXT(nilai: string): { min: number; maks: number; langkah: number } {
  const k = kurva(nilai)
  return { min: k.sapuan[0], maks: k.sapuan[1], langkah: 0.1 }
}

/** Naik, turun, atau diam di titik x. */
export function keadaan(nilai: string, x: number): 'naik' | 'turun' | 'diam' {
  const m = kurva(nilai).turunan(x)
  if (Math.abs(m) < 1e-9) return 'diam'
  return m > 0 ? 'naik' : 'turun'
}

/** Selang antar akar, beserta tandanya. Dipakai untuk mewarnai pita. */
export function selang(nilai: string): Array<{ dari: number; sampai: number; naik: boolean }> {
  const k = kurva(nilai)
  const batas = [k.jendela[0], ...k.akar.filter((a) => a > k.jendela[0] && a < k.jendela[1]), k.jendela[1]]
  const hasil: Array<{ dari: number; sampai: number; naik: boolean }> = []
  for (let i = 0; i < batas.length - 1; i++) {
    const tengah = (batas[i] + batas[i + 1]) / 2
    hasil.push({ dari: batas[i], sampai: batas[i + 1], naik: k.turunan(tengah) > 0 })
  }
  return hasil
}

export default function PetaTanda({
  x, nama, onGeser,
}: {
  x: number
  nama: string
  onGeser: (x: number) => void
}) {
  const dipegang = useSedangDiubah()
  const [menyeret, setMenyeret] = useState(false)
  const k = kurva(nama)
  const JENDELA: Jendela = jendelaTetap(...k.jendela)
  const p = keLayar(JENDELA)

  const y = k.f(x)
  const m = k.turunan(x)
  const kini = keadaan(nama, x)
  const nyala = dipegang === 'x' || menyeret

  function seret(e: ReactPointerEvent<SVGSVGElement>) {
    const mm = posisiMatematika(e, JENDELA)
    if (!mm) return
    const b = batasXT(nama)
    onGeser(batasi(bulatkanKe(mm.x, b.langkah), b.min, b.maks))
  }

  function mulai(e: ReactPointerEvent<SVGSVGElement>) {
    if (!posisiDiGambar(e)) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setMenyeret(true)
    seret(e)
  }

  return (
    // Bidang dan pita tanda ditumpuk; globals.css wilayah sesi lain, jadi
    // tata letaknya gaya sebaris.
    <div style={{ display: 'grid', gap: 4 }}>
    <Bidang
      jendela={JENDELA}
      keterangan={`${k.rumus}, dan ${k.rumusTurunan}`}
      catatan={[{
        teks: kini === 'diam'
          ? `di x = ${angka(x, 1)} nilai f′ nol: kurvanya sedang diam`
          : `f′(${angka(x, 1)}) = ${angka(m, 2)}, bertanda ${m > 0 ? 'positif' : 'negatif'}, berarti ${kini}`,
        warna: kini === 'diam' ? WARNA.sudut : kini === 'naik' ? WARNA.samping : WARNA.depan,
      }]}
      catatanBawah={{ teks: `akar f′ di ${k.akar.map((a) => angka(a, 1)).join(' dan ')}` }}
      aria={`Kurva ${k.rumus}. Di x sama dengan ${angka(x, 1)} fungsinya sedang ${kini}.`}
      gaya={{ cursor: menyeret ? 'grabbing' : 'grab', touchAction: 'none' }}
      onPointerDown={mulai}
      onPointerMove={(e) => { if (menyeret) seret(e) }}
      onPointerUp={() => setMenyeret(false)}
    >
      {/* garis tegak di tiap akar f′, supaya batasnya tidak ditebak-tebak */}
      {k.akar.map((a) => (
        <line key={a} x1={p.x(a)} y1={p.y(JENDELA.yMin)} x2={p.x(a)} y2={p.y(JENDELA.yMax)}
              stroke={WARNA.sudut} strokeWidth={1.2} strokeDasharray="5 4" opacity={0.7} />
      ))}

      <path d={jalurFungsi(k.f, JENDELA, 400)} fill="none" stroke={WARNA.miring}
            strokeWidth={2.6} strokeLinecap="round" />
      <path d={jalurGaris(x, y, m, JENDELA)} fill="none"
            stroke={kini === 'diam' ? WARNA.sudut : kini === 'naik' ? WARNA.samping : WARNA.depan}
            strokeWidth={nyala ? 2.8 : 2.2} opacity={0.85} />

      <g className={nyala ? 'nyala' : undefined}>
        <circle cx={p.x(x)} cy={p.y(y)} r={18} fill="transparent" />
        <circle cx={p.x(x)} cy={p.y(y)} r={nyala ? 8.5 : 7}
                fill={WARNA.miring} stroke="var(--kartu)" strokeWidth={2.2} />
      </g>
    </Bidang>

    {/* ---------- pita tanda, sejajar di bawah grafiknya ---------- */}
    <svg viewBox={`0 0 ${VW} 44`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Tabel tanda f aksen untuk ${k.rumus}.`}>
      <text x={KOTAK.x0 - 8} y={19} textAnchor="end" fontSize={10}
            fill={WARNA.redup} fontFamily={MONO}>f′</text>
      {selang(nama).map((sg) => (
        <g key={`${sg.dari}-${sg.sampai}`}>
          <rect x={p.x(sg.dari)} y={6} width={Math.max(p.x(sg.sampai) - p.x(sg.dari), 1)}
                height={20} fill={sg.naik ? WARNA.samping : WARNA.depan} opacity={0.4} />
          <text x={(p.x(sg.dari) + p.x(sg.sampai)) / 2} y={20} textAnchor="middle"
                fontSize={10} fill={WARNA.miring} fontFamily={MONO}>
            {sg.naik ? '+  naik' : '-  turun'}
          </text>
        </g>
      ))}
      {k.akar.map((a) => (
        <g key={a}>
          <line x1={p.x(a)} y1={2} x2={p.x(a)} y2={30} stroke={WARNA.sudut} strokeWidth={1.4} />
          <text x={p.x(a)} y={40} textAnchor="middle" fontSize={9.5}
                fill={WARNA.sudut} fontFamily={MONO}>x = {angka(a, 1)}</text>
        </g>
      ))}
      {/* penanda letak x yang sedang dipilih */}
      <path d={`M ${p.x(x)} 30 L ${p.x(x) - 4} 38 L ${p.x(x) + 4} 38 Z`}
            fill={WARNA.miring} opacity={0.85} />
    </svg>
    </div>
  )
}

/** Baris tabel untuk kolom kanan panggung. */
export function tabelTanda(nama: string, x: number): Array<{ nama: string; nilai: string }> {
  const k = kurva(nama)
  const m = k.turunan(x)
  return [
    { nama: 'x', nilai: angka(x, 1) },
    { nama: 'f(x)', nilai: angka(k.f(x), 2) },
    { nama: 'f′(x)', nilai: angka(m, 2) },
    { nama: 'tandanya', nilai: Math.abs(m) < 1e-9 ? 'nol' : m > 0 ? 'positif' : 'negatif' },
    { nama: 'jadi fungsinya', nilai: keadaan(nama, x) },
  ]
}
