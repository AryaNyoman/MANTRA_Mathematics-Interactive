'use client'

import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import Bidang from '@/components/widget/turunan/Bidang'
import {
  MONO, WARNA, angka, beda, jalurFungsi, jalurGaris, jendelaTetap, keLayar, type Jendela,
} from '@/components/widget/turunan/koordinat'
import { batasi, bulatkanKe, posisiDiGambar, posisiMatematika, titikTersentuh } from '@/components/widget/turunan/seret'
import { fungsi } from '@/components/widget/turunan/fungsi'
import { useSedangDiubah } from '@/components/kendali/sedang-diubah'

/**
 * Widget "Sekan ke tangen", Materi 02.
 *
 * Garis potong biru mengejar garis singgung ungu yang sudah digambar samar
 * sebagai pembanding. Yang harus terlihat bukan bahwa keduanya berimpit,
 * melainkan bahwa keduanya TIDAK PERNAH berimpit selama h masih ada, dan
 * tetap bisa dibuat sedekat apa pun.
 *
 * KENAPA GARIS SINGGUNGNYA DIGAMBAR DULUAN, SAMAR
 * Tanpa pembanding yang diam, mata tidak punya patokan: garis potong yang
 * berputar pelan terlihat seperti berhenti di sembarang tempat. Dengan garis
 * ungu yang diam di belakangnya, siswa melihat ke MANA garis birunya menuju,
 * dan itulah gagasan limit yang sedang diajarkan.
 *
 * KENAPA h TIDAK BOLEH SAMPAI NOL
 * Batas bawahnya 0,01, bukan 0. Pada h = 0 kemiringannya 0 dibagi 0, dan
 * widget yang menampilkan angka apa pun di situ akan membantah kalimat paling
 * penting materi ini. Jadi h memang tidak bisa dibuat nol, persis seperti di
 * matematikanya.
 */

export const BATAS_X1 = { min: -2, maks: 2, langkah: 0.25 }
export const BATAS_H = { min: 0.01, maks: 2, langkah: 0.01 }
export const AWAL = { x1: 1, h: 2, nama: 'kuadrat' }

/** Nilai h yang disediakan tombol "Contoh cepat". */
export const CEPAT = [
  { nilai: '1', label: '1' },
  { nilai: '0.5', label: '0,5' },
  { nilai: '0.1', label: '0,1' },
  { nilai: '0.01', label: '0,01' },
]

export const FUNGSI_TERSEDIA = ['kuadrat', 'kubik', 'sinus']

/**
 * Batas x₁ untuk fungsi yang sedang dipilih.
 *
 * Diiris dengan rentang sapuan aman fungsinya, supaya titik P tidak pernah
 * berada di luar bingkai. Pada x³ - 3x, x₁ = 2,5 sudah membuat f(x₁) = 8,1
 * sementara papannya hanya sampai 6.
 */
export function batasX1(nama: string): { min: number; maks: number; langkah: number } {
  const [lo, hi] = fungsi(nama).sapuan
  return {
    min: Math.max(BATAS_X1.min, lo),
    maks: Math.min(BATAS_X1.maks, hi - BATAS_H.min),
    langkah: BATAS_X1.langkah,
  }
}

/**
 * Batas atas h: titik Q tidak boleh melewati ujung rentang sapuan.
 *
 * Tanpa ini, x₁ = 2 dengan h = 2 menaruh Q di x = 4, jauh di luar papan, dan
 * siswa menggeser penggeser yang tidak menggerakkan apa pun yang terlihat.
 */
export function maksH(x1: number, nama: string): number {
  const [, hi] = fungsi(nama).sapuan
  return Math.max(BATAS_H.min, Math.min(BATAS_H.maks, hi - x1))
}

export default function SekanKeTangen({
  x1, h, nama, onGeser,
}: {
  x1: number
  h: number
  nama: string
  onGeser: (x1: number, h: number) => void
}) {
  const dipegang = useSedangDiubah()
  const [pegang, setPegang] = useState(-1)
  const fn = fungsi(nama)
  const JENDELA: Jendela = jendelaTetap(...fn.jendela)
  const p = keLayar(JENDELA)

  const yP = fn.f(x1)
  const yQ = fn.f(x1 + h)
  const mSekan = beda(fn.f, x1, h)
  const mTangen = fn.turunan(x1)

  const layarP = { x: p.x(x1), y: p.y(yP) }
  const layarQ = { x: p.x(x1 + h), y: p.y(yQ) }
  const sekanNyala = dipegang === 'h' || dipegang === 'cepat' || pegang === 1

  function mulai(e: ReactPointerEvent<SVGSVGElement>) {
    const g = posisiDiGambar(e)
    if (!g) return
    const mana = titikTersentuh(g, [layarP, layarQ], 20)
    if (mana < 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setPegang(mana)
  }

  function gerak(e: ReactPointerEvent<SVGSVGElement>) {
    if (pegang < 0) return
    const mm = posisiMatematika(e, JENDELA)
    if (!mm) return
    if (pegang === 0) {
      const b = batasX1(nama)
      const barux1 = batasi(bulatkanKe(mm.x, b.langkah), b.min, b.maks)
      onGeser(barux1, Math.min(h, maksH(barux1, nama)))
    } else {
      onGeser(x1, batasi(bulatkanKe(mm.x - x1, BATAS_H.langkah), BATAS_H.min, maksH(x1, nama)))
    }
  }

  return (
    <Bidang
      jendela={JENDELA}
      keterangan={`${fn.rumus}, titik P di x₁ = ${angka(x1, 2)}`}
      catatan={[
        { teks: `garis potong ${angka(mSekan, 3)}`, warna: WARNA.samping },
        { teks: `garis singgung ${angka(mTangen, 3)}`, warna: WARNA.sudut },
      ]}
      catatanBawah={{ teks: `selisihnya ${angka(Math.abs(mSekan - mTangen), 3)}` }}
      aria={`Kurva ${fn.rumus}. Garis potong dari x sama dengan ${angka(x1, 2)} dengan h sama dengan ${angka(h, 2)} punya kemiringan ${angka(mSekan, 3)}, sedangkan garis singgungnya ${angka(mTangen, 3)}.`}
      gaya={{ cursor: pegang >= 0 ? 'grabbing' : 'grab', touchAction: 'none' }}
      onPointerDown={mulai}
      onPointerMove={gerak}
      onPointerUp={() => setPegang(-1)}
    >
      {/* ---------- garis singgung, samar, sebagai pembanding yang diam ---------- */}
      <path d={jalurGaris(x1, yP, mTangen, JENDELA)} fill="none" stroke={WARNA.sudut}
            strokeWidth={3.4} opacity={0.32} strokeLinecap="round" />

      {/* ---------- kurvanya ---------- */}
      <path d={jalurFungsi(fn.f, JENDELA, 400)} fill="none" stroke={WARNA.miring}
            strokeWidth={2.6} strokeLinecap="round" />

      {/* ---------- garis potong yang mengejar ---------- */}
      <g className={sekanNyala ? 'nyala' : undefined}>
        <path d={jalurGaris(x1, yP, mSekan, JENDELA)} fill="none" stroke={WARNA.samping}
              strokeWidth={sekanNyala ? 2.6 : 2} strokeDasharray="7 5" />
      </g>

      {/* ---------- titik P ---------- */}
      <g className={dipegang === 'x1' ? 'nyala' : undefined}>
        <circle cx={layarP.x} cy={layarP.y} r={18} fill="transparent" />
        <circle cx={layarP.x} cy={layarP.y} r={pegang === 0 || dipegang === 'x1' ? 8.5 : 7}
                fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={2.2} />
        <text x={layarP.x - 12} y={layarP.y + 19} textAnchor="middle" fontSize={11}
              fill={WARNA.sudut} fontFamily={MONO}>P</text>
      </g>

      {/* ---------- titik Q ---------- */}
      <g className={sekanNyala ? 'nyala' : undefined}>
        <circle cx={layarQ.x} cy={layarQ.y} r={18} fill="transparent" />
        <circle cx={layarQ.x} cy={layarQ.y} r={pegang === 1 || sekanNyala ? 8.5 : 7}
                fill={WARNA.samping} stroke="var(--kartu)" strokeWidth={2.2} />
        <text x={layarQ.x + 12} y={layarQ.y - 9} fontSize={11}
              fill={WARNA.samping} fontFamily={MONO}>Q</text>
      </g>
    </Bidang>
  )
}

/** Baris tabel untuk kolom kanan panggung. */
export function tabelSekan(x1: number, h: number, nama: string): Array<{ nama: string; nilai: string }> {
  const fn = fungsi(nama)
  const mSekan = beda(fn.f, x1, h)
  const mTangen = fn.turunan(x1)
  return [
    { nama: 'jarak h', nilai: angka(h, 2) },
    { nama: 'kemiringan garis potong', nilai: angka(mSekan, 4) },
    { nama: 'kemiringan garis singgung', nilai: angka(mTangen, 4) },
    { nama: 'selisih keduanya', nilai: angka(Math.abs(mSekan - mTangen), 4) },
  ]
}
