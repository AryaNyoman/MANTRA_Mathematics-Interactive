'use client'

import { useMemo } from 'react'
import { WARNA } from '@/lib/warna'

/**
 * Widget "Segitiga Sebangun" — Trigonometri Kelas 10 Bab 4.
 *
 * Melawan miskonsepsi resmi kurikulum: nilai tan/sin/cos dikira angka mati,
 * padahal ia perbandingan yang tetap sama pada segitiga sebangun.
 *
 * ATURAN WAJIB (bug temuan ARYA 31 Agu 2026): widget TIDAK BOLEH memotong
 * gambarnya sendiri. Saat sudut membesar, sisi depan tumbuh sangat cepat
 * (di 80°, sisi depan jadi 5,7x sisi samping). Bingkai karena itu dihitung
 * dari segitiga TERBESAR pada sudut tersebut, lalu digambar sesuai skala —
 * jadi tidak pernah terpotong, tapi slider ukuran tetap terasa efeknya.
 * Perubahan bingkai itu juga DIBERITAHUKAN ke pengguna lewat `skalaTampilan`.
 */

const VW = 460
const VH = 300
const PAD = 40
const LEBAR = VW - PAD * 2
const TINGGI = VH - PAD * 2
const SAMPING_MAKS = 5 // cm saat slider 100%

export type Geometri = {
  sampingCm: number
  depanCm: number
  miringCm: number
  tan: number
  sin: number
  cos: number
  /** piksel per cm — berubah saat bingkai menyesuaikan */
  ppc: number
}

export function hitungGeometri(skalaPersen: number, derajat: number): Geometri {
  const s = skalaPersen / 100
  const rad = (derajat * Math.PI) / 180
  const ppc = Math.min(LEBAR / SAMPING_MAKS, TINGGI / (SAMPING_MAKS * Math.tan(rad)))
  const sampingCm = SAMPING_MAKS * s
  const depanCm = sampingCm * Math.tan(rad)
  return {
    sampingCm,
    depanCm,
    miringCm: Math.hypot(sampingCm, depanCm),
    tan: Math.tan(rad),
    sin: Math.sin(rad),
    cos: Math.cos(rad),
    ppc,
  }
}

/** Angka gaya Indonesia: pemisah desimal koma. */
export const angka = (n: number, desimal = 2) =>
  n.toFixed(desimal).replace('.', ',')

export default function SegitigaSebangun({
  skala,
  derajat,
}: {
  skala: number
  derajat: number
}) {
  const { sampingCm, depanCm, ppc } = hitungGeometri(skala, derajat)
  const rad = (derajat * Math.PI) / 180

  // Titik asal ditempatkan agar segitiga TERBESAR pada sudut ini berada di
  // tengah bidang. Dihitung dari ukuran maksimum (bukan ukuran sekarang),
  // supaya titik sudut theta tidak melompat-lompat saat slider ukuran digeser.
  const sampingMaksPx = SAMPING_MAKS * ppc
  const depanMaksPx = SAMPING_MAKS * Math.tan(rad) * ppc
  const ox = (VW - sampingMaksPx) / 2
  const oy = (VH + depanMaksPx) / 2

  const bx = ox + sampingCm * ppc
  const cy = oy - depanCm * ppc

  // petak latar ikut merapat saat bingkai menjauh — tanda visual bahwa
  // tampilan sedang "mundur", bukan segitiganya yang mengecil
  const petak = useMemo(() => {
    const garis: { key: string; x1: number; y1: number; x2: number; y2: number }[] = []
    for (let x = ox, i = 0; x <= VW - 5; x += ppc, i++)
      garis.push({ key: `v+${i}`, x1: x, y1: 5, x2: x, y2: VH - 5 })
    for (let x = ox - ppc, i = 0; x >= 5; x -= ppc, i++)
      garis.push({ key: `v-${i}`, x1: x, y1: 5, x2: x, y2: VH - 5 })
    for (let y = oy, i = 0; y >= 5; y -= ppc, i++)
      garis.push({ key: `h-${i}`, x1: 5, y1: y, x2: VW - 5, y2: y })
    for (let y = oy + ppc, i = 0; y <= VH - 5; y += ppc, i++)
      garis.push({ key: `h+${i}`, x1: 5, y1: y, x2: VW - 5, y2: y })
    return garis
  }, [ppc, ox, oy])

  // tanda siku-siku DI DALAM segitiga (kiri-atas dari titik siku).
  // Versi Manim pertama menaruhnya di luar — salah secara geometri.
  const t = Math.max(5, Math.min(13, (bx - ox) * 0.3, (oy - cy) * 0.3))
  const r = Math.max(16, Math.min(46, (bx - ox) * 0.42))

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
      role="img"
      aria-label={`Segitiga siku-siku dengan sudut ${derajat} derajat, sisi samping ${angka(
        sampingCm,
      )} sentimeter dan sisi depan ${angka(depanCm)} sentimeter`}
    >
      <g>
        {petak.map(({ key, ...garis }) => (
          <line key={key} {...garis} stroke="#EDE6DA" strokeWidth={1} />
        ))}
      </g>
      <line x1={ox} y1={oy} x2={bx} y2={oy} stroke={WARNA.samping} strokeWidth={3.5} strokeLinecap="round" />
      <line x1={bx} y1={oy} x2={bx} y2={cy} stroke={WARNA.depan} strokeWidth={3.5} strokeLinecap="round" />
      <line x1={bx} y1={cy} x2={ox} y2={oy} stroke={WARNA.miring} strokeWidth={3.5} strokeLinecap="round" />
      <path d={`M ${bx - t} ${oy} L ${bx - t} ${oy - t} L ${bx} ${oy - t}`} fill="none" stroke={WARNA.redup} strokeWidth={2} />
      <path
        d={`M ${ox + r} ${oy} A ${r} ${r} 0 0 0 ${ox + r * Math.cos(rad)} ${oy - r * Math.sin(rad)}`}
        fill="none"
        stroke={WARNA.sudut}
        strokeWidth={3}
      />
      <text
        x={ox + (r + 13) * Math.cos(rad / 2)}
        y={oy - (r + 13) * Math.sin(rad / 2) + 5}
        fontSize={17}
        fill={WARNA.sudut}
        fontStyle="italic"
        fontFamily="var(--font-fraunces), Georgia, serif"
      >
        θ
      </text>
    </svg>
  )
}
