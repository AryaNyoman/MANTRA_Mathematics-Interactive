'use client'

import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import Bidang from '@/components/widget/turunan/Bidang'
import {
  MONO, WARNA, angka, beda, jalurFungsi, jalurGaris, jendelaTetap, keLayar, type Jendela,
} from '@/components/widget/turunan/koordinat'
import { batasi, bulatkanKe, posisiDiGambar, posisiMatematika, titikTersentuh } from '@/components/widget/turunan/seret'
import { useSedangDiubah } from '@/components/kendali/sedang-diubah'

/**
 * Widget "Mesin pangkat", Materi 04.
 *
 * Aturan pangkat DITURUNKAN di depan mata: kotak hitung menulis uraian
 * (x + h)ⁿ - xⁿ dibagi h baris demi baris, dan siswa mengecilkan h sampai
 * semua sisa yang mengandung h lenyap.
 *
 * KENAPA x DITAHAN POSITIF
 * Pangkat ½ tidak punya nilai untuk x negatif, dan 1/x meledak di nol. Kalau
 * ranahnya dibiarkan bebas, siswa yang menggeser ke kiri melihat kurva hilang
 * tanpa penjelasan, dan itu mengajarkan hal yang salah tentang aturan pangkat
 * yang justru sedang dibangun. Jadi seluruh widget ini bekerja di x positif.
 *
 * KENAPA JENDELANYA BEDA TIAP PANGKAT
 * x⁴ di x = 3 bernilai 81, sedangkan x di x = 3 bernilai 3. Satu jendela untuk
 * keduanya membuat salah satunya rata seperti garis mendatar. Tiap pangkat
 * karena itu punya jendela dan batas x sendiri, yang dipilih supaya titik P
 * dan Q selalu berada di dalam papan.
 */

export type Pangkat = {
  nilai: string
  label: string
  /** pangkatnya sebagai angka */
  n: number
  /** rumus sebagaimana ditulis di layar, dengan pangkat tertulis */
  rumus: string
  /** batas kendali x untuk pangkat ini */
  xMaks: number
  /** [xMin, xMax, yMin, yMax] */
  jendela: [number, number, number, number]
  /** uraian binomialnya, kosong untuk pangkat yang bukan bilangan asli */
  uraian: string[]
}

export const X_MIN = 0.5
export const BATAS_H = { min: 0.01, maks: 1, langkah: 0.01 }
export const AWAL = { pangkat: '2', x: 1.5, h: 1 }

export const PANGKAT: Pangkat[] = [
  {
    nilai: '1', label: 'n = 1', n: 1, rumus: 'f(x) = x', xMaks: 3, jendela: [0, 3.7, 0, 4.2],
    uraian: [
      '(x + h)¹ - x¹ = h',
      'dibagi h        1',
      'h menuju nol    1',
    ],
  },
  {
    nilai: '2', label: 'n = 2', n: 2, rumus: 'f(x) = x²', xMaks: 3, jendela: [0, 3.7, 0, 14],
    uraian: [
      '(x + h)² - x² = 2xh + h²',
      'dibagi h        2x + h',
      'h menuju nol    2x',
    ],
  },
  {
    nilai: '3', label: 'n = 3', n: 3, rumus: 'f(x) = x³', xMaks: 2.2, jendela: [0, 2.8, 0, 22],
    uraian: [
      '(x + h)³ - x³ = 3x²h + 3xh² + h³',
      'dibagi h        3x² + 3xh + h²',
      'h menuju nol    3x²',
    ],
  },
  {
    nilai: '4', label: 'n = 4', n: 4, rumus: 'f(x) = x⁴', xMaks: 1.8, jendela: [0, 2.4, 0, 34],
    uraian: [
      '(x + h)⁴ - x⁴ = 4x³h + 6x²h² + 4xh³ + h⁴',
      'dibagi h        4x³ + 6x²h + 4xh² + h³',
      'h menuju nol    4x³',
    ],
  },
  {
    nilai: '0.5', label: 'n = ½', n: 0.5, rumus: 'f(x) = √x, yaitu x^½', xMaks: 3, jendela: [0, 3.7, 0, 2.1],
    uraian: [],
  },
  {
    nilai: '-1', label: 'n = -1', n: -1, rumus: 'f(x) = 1/x, yaitu x^-1', xMaks: 3, jendela: [0, 3.7, 0, 2.2],
    uraian: [],
  },
]

const peta = new Map(PANGKAT.map((p) => [p.nilai, p]))

export function pangkat(nilai: string): Pangkat {
  return peta.get(nilai) ?? PANGKAT[1]
}

export const PILIHAN_PANGKAT = PANGKAT.map((p) => ({ nilai: p.nilai, label: p.label }))

/** Batas kendali x untuk pangkat yang dipilih. */
export function batasXP(nilai: string): { min: number; maks: number; langkah: number } {
  return { min: X_MIN, maks: pangkat(nilai).xMaks, langkah: 0.1 }
}

/** Batas atas h: titik Q tidak boleh keluar papan. */
export function maksHP(x: number, nilai: string): number {
  const p = pangkat(nilai)
  return Math.max(BATAS_H.min, Math.min(BATAS_H.maks, p.jendela[1] - 0.2 - x))
}

export default function MesinPangkat({
  nilaiPangkat, x, h, onGeser,
}: {
  nilaiPangkat: string
  x: number
  h: number
  onGeser: (x: number, h: number) => void
}) {
  const dipegang = useSedangDiubah()
  const [pegang, setPegang] = useState(-1)
  const p = pangkat(nilaiPangkat)
  const f = (t: number) => Math.pow(t, p.n)
  const JENDELA: Jendela = jendelaTetap(...p.jendela)
  const layar = keLayar(JENDELA)

  const yP = f(x)
  const yQ = f(x + h)
  const mSekan = beda(f, x, h)
  const mRumus = p.n * Math.pow(x, p.n - 1)

  const titikP = { x: layar.x(x), y: layar.y(yP) }
  const titikQ = { x: layar.x(x + h), y: layar.y(yQ) }
  const nyalaH = dipegang === 'h' || pegang === 1

  function mulai(e: ReactPointerEvent<SVGSVGElement>) {
    const g = posisiDiGambar(e)
    if (!g) return
    const mana = titikTersentuh(g, [titikP, titikQ], 20)
    if (mana < 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setPegang(mana)
  }

  function gerak(e: ReactPointerEvent<SVGSVGElement>) {
    if (pegang < 0) return
    const mm = posisiMatematika(e, JENDELA)
    if (!mm) return
    const b = batasXP(nilaiPangkat)
    if (pegang === 0) {
      const nx = batasi(bulatkanKe(mm.x, b.langkah), b.min, b.maks)
      onGeser(nx, Math.min(h, maksHP(nx, nilaiPangkat)))
    } else {
      onGeser(x, batasi(bulatkanKe(mm.x - x, BATAS_H.langkah), BATAS_H.min, maksHP(x, nilaiPangkat)))
    }
  }

  return (
    <Bidang
      jendela={JENDELA}
      keterangan={p.rumus}
      catatan={[
        { teks: `garis potong ${angka(mSekan, 3)}`, warna: WARNA.samping },
        { teks: `rumus n·xⁿ⁻¹ memberi ${angka(mRumus, 3)}`, warna: WARNA.sudut },
      ]}
      catatanBawah={{ teks: `selisihnya ${angka(Math.abs(mSekan - mRumus), 3)}` }}
      aria={`Kurva x pangkat ${p.n}. Kemiringan garis potong ${angka(mSekan, 3)}, sedangkan rumus aturan pangkat memberi ${angka(mRumus, 3)}.`}
      gaya={{ cursor: pegang >= 0 ? 'grabbing' : 'grab', touchAction: 'none' }}
      onPointerDown={mulai}
      onPointerMove={gerak}
      onPointerUp={() => setPegang(-1)}
    >
      {/* garis singgung menurut rumus, sebagai pembanding yang diam */}
      <path d={jalurGaris(x, yP, mRumus, JENDELA)} fill="none" stroke={WARNA.sudut}
            strokeWidth={3.4} opacity={0.3} strokeLinecap="round" />

      <path d={jalurFungsi(f, JENDELA, 400, 0.02, JENDELA.xMax)} fill="none"
            stroke={WARNA.miring} strokeWidth={2.6} strokeLinecap="round" />

      <g className={nyalaH ? 'nyala' : undefined}>
        <path d={jalurGaris(x, yP, mSekan, JENDELA)} fill="none" stroke={WARNA.samping}
              strokeWidth={nyalaH ? 2.6 : 2} strokeDasharray="7 5" />
      </g>

      <g className={dipegang === 'x' ? 'nyala' : undefined}>
        <circle cx={titikP.x} cy={titikP.y} r={18} fill="transparent" />
        <circle cx={titikP.x} cy={titikP.y} r={pegang === 0 || dipegang === 'x' ? 8.5 : 7}
                fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={2.2} />
        <text x={titikP.x - 12} y={titikP.y + 19} textAnchor="middle" fontSize={11}
              fill={WARNA.sudut} fontFamily={MONO}>P</text>
      </g>

      <g className={nyalaH ? 'nyala' : undefined}>
        <circle cx={titikQ.x} cy={titikQ.y} r={18} fill="transparent" />
        <circle cx={titikQ.x} cy={titikQ.y} r={pegang === 1 || nyalaH ? 8.5 : 7}
                fill={WARNA.samping} stroke="var(--kartu)" strokeWidth={2.2} />
        <text x={titikQ.x + 12} y={titikQ.y - 9} fontSize={11}
              fill={WARNA.samping} fontFamily={MONO}>Q</text>
      </g>
    </Bidang>
  )
}

/**
 * Kotak hitung: uraian binomialnya baris demi baris.
 *
 * Ditaruh di kolom kanan, BUKAN di dalam gambar. Aturan bidang gambar melarang
 * tulisan di dalam kotak grafik, dan uraian sepanjang ini pasti menabrak kurva.
 */
export function uraianPangkat(nilaiPangkat: string): string[] {
  const p = pangkat(nilaiPangkat)
  if (p.uraian.length > 0) return p.uraian
  return [
    'Pangkat ini bukan bilangan asli, jadi (x + h)ⁿ tidak bisa',
    'diuraikan sebagai penjumlahan suku. Aturannya tetap berlaku,',
    'dan Anda bisa memeriksanya lewat angka di sebelah kiri.',
  ]
}

/** Baris tabel untuk kolom kanan panggung. */
export function tabelPangkat(nilaiPangkat: string, x: number, h: number): Array<{ nama: string; nilai: string }> {
  const p = pangkat(nilaiPangkat)
  const f = (t: number) => Math.pow(t, p.n)
  return [
    { nama: 'pangkat n', nilai: p.label.replace('n = ', '') },
    { nama: 'x', nilai: angka(x, 2) },
    { nama: 'jarak h', nilai: angka(h, 2) },
    { nama: 'kemiringan garis potong', nilai: angka(beda(f, x, h), 4) },
    { nama: 'rumus n·xⁿ⁻¹', nilai: angka(p.n * Math.pow(x, p.n - 1), 4) },
  ]
}
