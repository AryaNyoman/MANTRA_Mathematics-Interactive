'use client'

import { WARNA } from '@/lib/warna'

/**
 * Widget "Bayangan", Trigonometri tahap 1.
 *
 * Bukti pertama bahwa sudut yang sama memberi perbandingan yang sama, memakai
 * benda yang bisa dilihat siswa sendiri di halaman rumah: pohon dan dirinya,
 * disinari matahari yang sama.
 *
 * Geser sudut matahari. Kedua bayangan berubah panjang, tapi kedua hasil bagi
 * tinggi-per-bayangan tetap identik. Itu menyiapkan tahap 2 tanpa menyebut
 * satu pun kata "sinus".
 */

const VW = 460
const VH = 300
const TANAH_Y = 250
const M_KE_PX = 11.4              // 1 meter = 11,4 piksel
const X_ORANG = 96                // titik pijak orang
const X_POHON = 424               // titik pijak pohon
const TINGGI_ORANG = 1.6          // meter
const TINGGI_POHON = 10           // meter

export const BATAS_SUDUT = { min: 25, maks: 70 }

export function hitungBayangan(derajat: number) {
  const tan = Math.tan((derajat * Math.PI) / 180)
  return {
    tan,
    bayanganOrang: TINGGI_ORANG / tan,
    bayanganPohon: TINGGI_POHON / tan,
    tinggiOrang: TINGGI_ORANG,
    tinggiPohon: TINGGI_POHON,
  }
}

const koma = (n: number, d = 2) => n.toFixed(d).replace('.', ',')

export default function Bayangan({ derajat }: { derajat: number }) {
  const b = hitungBayangan(derajat)
  const yOrang = TANAH_Y - TINGGI_ORANG * M_KE_PX
  const yPohon = TANAH_Y - TINGGI_POHON * M_KE_PX
  const bxOrang = X_ORANG - b.bayanganOrang * M_KE_PX
  const bxPohon = X_POHON - b.bayanganPohon * M_KE_PX

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Pohon dan orang disinari matahari dengan sudut ${derajat} derajat`}>
      {/* langit & tanah */}
      <line x1={0} y1={TANAH_Y} x2={VW} y2={TANAH_Y} stroke="#C9BFAE" strokeWidth={2} />

      {/* matahari */}
      <circle cx={VW - 34} cy={30} r={13} fill={WARNA.sudut} opacity={0.9} />
      {[...Array(8)].map((_, i) => {
        const a = (i * Math.PI) / 4
        return (
          <line key={i}
            x1={VW - 34 + Math.cos(a) * 18} y1={30 + Math.sin(a) * 18}
            x2={VW - 34 + Math.cos(a) * 24} y2={30 + Math.sin(a) * 24}
            stroke={WARNA.sudut} strokeWidth={2} opacity={0.7} />
        )
      })}

      {/* sinar matahari melewati puncak masing-masing benda */}
      {/* Sinar berhenti tepat di puncak benda. Versi sebelumnya diperpanjang
          40 px ke kanan sehingga titik awalnya keluar bingkai (424 + 40 > 460). */}
      <line x1={X_POHON} y1={yPohon} x2={bxPohon} y2={TANAH_Y}
            stroke={WARNA.sudut} strokeWidth={1.6} strokeDasharray="5 4" opacity={0.85} />
      <line x1={X_ORANG} y1={yOrang} x2={bxOrang} y2={TANAH_Y}
            stroke={WARNA.sudut} strokeWidth={1.6} strokeDasharray="5 4" opacity={0.85} />

      {/* bayangan */}
      <line x1={bxPohon} y1={TANAH_Y} x2={X_POHON} y2={TANAH_Y}
            stroke={WARNA.samping} strokeWidth={5} strokeLinecap="round" />
      <line x1={bxOrang} y1={TANAH_Y} x2={X_ORANG} y2={TANAH_Y}
            stroke={WARNA.samping} strokeWidth={5} strokeLinecap="round" />

      {/* pohon: batang + rimbun */}
      <line x1={X_POHON} y1={TANAH_Y} x2={X_POHON} y2={yPohon}
            stroke={WARNA.depan} strokeWidth={5} strokeLinecap="round" />
      <circle cx={X_POHON} cy={yPohon - 4} r={20} fill="#7FA07A" opacity={0.85} />
      <circle cx={X_POHON - 13} cy={yPohon + 9} r={13} fill="#7FA07A" opacity={0.7} />
      <circle cx={X_POHON + 13} cy={yPohon + 9} r={13} fill="#7FA07A" opacity={0.7} />

      {/* orang */}
      <line x1={X_ORANG} y1={TANAH_Y} x2={X_ORANG} y2={yOrang}
            stroke={WARNA.depan} strokeWidth={5} strokeLinecap="round" />
      <circle cx={X_ORANG} cy={yOrang - 4} r={5} fill={WARNA.depan} />

      {/* keterangan */}
      <text x={X_POHON - 6} y={yPohon - 30} textAnchor="end" fontSize={14} fill={WARNA.depan}
            fontFamily="var(--font-sans), sans-serif">{TINGGI_POHON} m</text>
      <text x={(bxPohon + X_POHON) / 2} y={TANAH_Y + 20} textAnchor="middle" fontSize={14}
            fill={WARNA.samping} fontFamily="var(--font-sans), sans-serif">
        {koma(b.bayanganPohon, 1)} m
      </text>
      <text x={X_ORANG + 10} y={yOrang + 4} fontSize={14} fill={WARNA.depan}
            fontFamily="var(--font-sans), sans-serif">{koma(TINGGI_ORANG, 1)} m</text>
      <text x={(bxOrang + X_ORANG) / 2} y={TANAH_Y + 20} textAnchor="middle" fontSize={14}
            fill={WARNA.samping} fontFamily="var(--font-sans), sans-serif">
        {koma(b.bayanganOrang, 2)} m
      </text>

      {/* dua hasil bagi, ditempel di masing-masing benda */}
      <text x={X_POHON} y={TANAH_Y + 42} textAnchor="end" fontSize={15} fill={WARNA.sudut}
            fontFamily="var(--font-mono), sans-serif">
        {TINGGI_POHON} ÷ {koma(b.bayanganPohon, 1)} = {koma(b.tan)}
      </text>
      <text x={X_ORANG - 40} y={TANAH_Y + 42} fontSize={15} fill={WARNA.sudut}
            fontFamily="var(--font-mono), sans-serif">
        {koma(TINGGI_ORANG, 1)} ÷ {koma(b.bayanganOrang, 2)} = {koma(b.tan)}
      </text>
    </svg>
  )
}
