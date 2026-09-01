'use client'

import { MONO, VH, VW, WARNA, angka } from '@/components/widget/limit/koordinat'

/**
 * Widget "Busur Lawan Tali", Limit tahap 8.
 *
 * Lingkaran satuan yang SAMA warnanya dengan widget Trigonometri, karena
 * kaitannya itulah yang mau ditunjukkan. Sudutnya dikecilkan, dan panjang
 * busur (yaitu θ dalam radian) dibandingkan dengan panjang ruas sin θ.
 *
 * Di bawah lingkaran ada dua batang lurus yang panjangnya sebanding dengan
 * kedua besaran itu. Perbandingan panjang jauh lebih mudah dinilai mata pada
 * dua batang lurus sejajar daripada pada satu busur melengkung dan satu ruas
 * tegak, dan justru perbandingan itulah isi materinya.
 */

export const BATAS_DERAJAT = { min: 1, maks: 80, langkah: 1 }

const CX = 118
const CY = 128
const R = 92

/** Panjang batang untuk besaran terbesar. Yang lain sebanding dengannya. */
const BATANG_MAKS = 268
const BATANG_X = 150
const BATANG_BUSUR = 224
const BATANG_SIN = 254

export default function BusurLawanTali({ derajat }: { derajat: number }) {
  const d = Math.min(Math.max(derajat, BATAS_DERAJAT.min), BATAS_DERAJAT.maks)
  const rad = (d * Math.PI) / 180
  const s = Math.sin(rad)
  const c = Math.cos(rad)
  const nisbah = s / rad

  const px = CX + c * R
  const py = CY - s * R

  // busurnya digambar dari sumbu x mendatar sampai ke jari-jari yang miring
  const busur = `M ${CX + R} ${CY} A ${R} ${R} 0 0 0 ${px} ${py}`

  // batang: yang terpanjang selalu busur, karena busur > sin untuk sudut lancip
  const panjangBusur = BATANG_MAKS
  const panjangSin = BATANG_MAKS * nisbah

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Sudut ${d} derajat, perbandingan sin theta dibagi theta bernilai ${angka(nisbah, 5)}`}>
      {/* ---------------- lingkaran satuan ---------------- */}
      <line x1={CX - R - 14} y1={CY} x2={CX + R + 14} y2={CY} stroke="#D6CDBC" strokeWidth={1.2} />
      <line x1={CX} y1={CY - R - 14} x2={CX} y2={CY + 22} stroke="#D6CDBC" strokeWidth={1.2} />
      <circle cx={CX} cy={CY} r={R} fill="none" stroke={WARNA.redup} strokeWidth={1.6} opacity={0.45} />

      {/* jari-jari, dan busur yang panjangnya sama dengan theta */}
      <line x1={CX} y1={CY} x2={px} y2={py} stroke={WARNA.miring} strokeWidth={2} />
      <path d={busur} fill="none" stroke={WARNA.sudut} strokeWidth={4} strokeLinecap="round" />

      {/* ruas sin theta, tegak dari titik ke sumbu mendatar */}
      <line x1={px} y1={CY} x2={px} y2={py} stroke={WARNA.depan} strokeWidth={4} strokeLinecap="round" />
      <circle cx={px} cy={py} r={4.5} fill={WARNA.miring} stroke="var(--kartu)" strokeWidth={1.8} />

      <text x={CX} y={VH - 8} textAnchor="middle" fontSize={10.5} fill={WARNA.redup} fontFamily={MONO}>
        jari-jari 1, jadi panjang busur = θ
      </text>

      {/* ---------------- dua batang pembanding ---------------- */}
      <text x={BATANG_X} y={44} fontSize={13} fill={WARNA.miring} fontFamily={MONO}>
        θ = {angka(d, 0)}° = {angka(rad, 4)} rad
      </text>

      <text x={BATANG_X} y={BATANG_BUSUR - 10} fontSize={11} fill={WARNA.sudut} fontFamily={MONO}>
        panjang busur θ
      </text>
      <rect x={BATANG_X} y={BATANG_BUSUR} width={panjangBusur} height={9} rx={4.5} fill={WARNA.sudut} />

      <text x={BATANG_X} y={BATANG_SIN - 10} fontSize={11} fill={WARNA.depan} fontFamily={MONO}>
        panjang sin θ
      </text>
      <rect x={BATANG_X} y={BATANG_SIN} width={panjangSin} height={9} rx={4.5} fill={WARNA.depan} />
      {/* sisa yang belum tertutup, supaya selisihnya terlihat walau tipis */}
      <rect x={BATANG_X + panjangSin} y={BATANG_SIN} width={Math.max(panjangBusur - panjangSin, 0)}
            height={9} rx={4.5} fill={WARNA.depan} opacity={0.18} />

      <text x={BATANG_X} y={80} fontSize={16} fill={WARNA.miring} fontFamily={MONO}>
        sin θ : θ = {angka(nisbah, 6)}
      </text>
      <text x={BATANG_X} y={102} fontSize={11} fill={WARNA.redup} fontFamily={MONO}>
        {d <= 5
          ? 'kedua batang nyaris sama panjang'
          : 'busur masih terlihat lebih panjang dari sin'}
      </text>
      <text x={BATANG_X} y={122} fontSize={11} fill={WARNA.redup} fontFamily={MONO}>
        busur SELALU sedikit lebih panjang,
      </text>
      <text x={BATANG_X} y={138} fontSize={11} fill={WARNA.redup} fontFamily={MONO}>
        jadi perbandingannya selalu di bawah 1
      </text>
    </svg>
  )
}
