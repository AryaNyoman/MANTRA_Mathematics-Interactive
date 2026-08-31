'use client'

import { WARNA } from '@/lib/warna'

/**
 * Widget "Perjalanan Sudut Istimewa", Trigonometri tahap 7.
 *
 * Meniru pola video referensi ARYA `Unit Circle Journey (sudut istimewa).mp4`:
 * jari-jari berhenti di tiap sudut istimewa, juring terisi, dan nilai EKSAK-nya
 * muncul, bukan desimal.
 *
 * Yang membuat sudut-sudut ini "istimewa" bukan angkanya, tapi asalnya:
 * 45° lahir dari persegi yang dibelah diagonal, 30° dan 60° dari segitiga sama
 * sisi yang dibelah dua. Karena itu nilainya bisa ditulis persis dengan akar,
 * tanpa desimal yang tak pernah habis.
 */

const VW = 460
const VH = 300
const CX = 230
const CY = 152
const R = 108

export type SudutIstimewa = {
  derajat: number
  radian: string
  sin: string
  cos: string
  tan: string
  /** dari bangun apa nilai ini lahir */
  asal: string
}

export const ISTIMEWA: SudutIstimewa[] = [
  { derajat: 0, radian: '0', sin: '0', cos: '1', tan: '0', asal: 'Titik awal, belum berputar sama sekali.' },
  { derajat: 30, radian: 'π/6', sin: '1/2', cos: '√3/2', tan: '1/√3', asal: 'Segitiga sama sisi dibelah dua. Sisi terpendeknya persis setengah sisi miring, itulah kenapa sin 30° tepat 1/2.' },
  { derajat: 45, radian: 'π/4', sin: '√2/2', cos: '√2/2', tan: '1', asal: 'Persegi dibelah diagonal. Kedua sisinya sama panjang, jadi sin dan cos-nya kembar dan tan-nya tepat 1.' },
  { derajat: 60, radian: 'π/3', sin: '√3/2', cos: '1/2', tan: '√3', asal: 'Segitiga sama sisi dibelah dua, dilihat dari sudut yang lain. Nilainya tertukar dengan 30°.' },
  { derajat: 90, radian: 'π/2', sin: '1', cos: '0', tan: 'tak ada', asal: 'Tegak lurus. Sisi sampingnya menyusut jadi nol, jadi tan tidak terdefinisi.' },
  { derajat: 120, radian: '2π/3', sin: '√3/2', cos: '−1/2', tan: '−√3', asal: 'Cerminan 60° ke kuadran kiri. cos berubah tanda, sin tidak.' },
  { derajat: 135, radian: '3π/4', sin: '√2/2', cos: '−√2/2', tan: '−1', asal: 'Cerminan 45°. Besar nilainya sama, tanda cos-nya terbalik.' },
  { derajat: 150, radian: '5π/6', sin: '1/2', cos: '−√3/2', tan: '−1/√3', asal: 'Cerminan 30°.' },
  { derajat: 180, radian: 'π', sin: '0', cos: '−1', tan: '0', asal: 'Setengah putaran penuh. Titiknya persis di seberang titik awal.' },
  { derajat: 270, radian: '3π/2', sin: '−1', cos: '0', tan: 'tak ada', asal: 'Tiga perempat putaran. Menunjuk lurus ke bawah.' },
  { derajat: 360, radian: '2π', sin: '0', cos: '1', tan: '0', asal: 'Satu putaran penuh, kembali ke titik awal. Semua nilainya mengulang.' },
]

export default function PerjalananSudut({ indeks }: { indeks: number }) {
  const s = ISTIMEWA[Math.min(indeks, ISTIMEWA.length - 1)]
  const rad = (s.derajat * Math.PI) / 180
  const px = CX + Math.cos(rad) * R
  const py = CY - Math.sin(rad) * R
  const besar = s.derajat > 180 ? 1 : 0

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Lingkaran satuan pada sudut istimewa ${s.derajat} derajat`}>
      <line x1={CX - R - 30} y1={CY} x2={CX + R + 30} y2={CY} stroke="#D6CDBC" strokeWidth={1.5} />
      <line x1={CX} y1={CY - R - 26} x2={CX} y2={CY + R + 26} stroke="#D6CDBC" strokeWidth={1.5} />
      <circle cx={CX} cy={CY} r={R} fill="none" stroke={WARNA.redup} strokeWidth={1.8} opacity={0.5} />

      {/* penanda semua sudut istimewa di tepi lingkaran */}
      {ISTIMEWA.map((t) => {
        const a = (t.derajat * Math.PI) / 180
        const aktif = t.derajat === s.derajat
        return (
          <circle
            key={t.derajat}
            cx={CX + Math.cos(a) * R}
            cy={CY - Math.sin(a) * R}
            r={aktif ? 6 : 3}
            fill={aktif ? WARNA.sudut : WARNA.redup}
            opacity={aktif ? 1 : 0.45}
          />
        )
      })}

      {/* juring yang sudah disapu */}
      {s.derajat > 0 && (
        <>
          <path
            d={`M ${CX} ${CY} L ${CX + 46} ${CY} A 46 46 0 ${besar} 0 ${CX + 46 * Math.cos(rad)} ${CY - 46 * Math.sin(rad)} Z`}
            fill={WARNA.sudut} opacity={0.18}
          />
          <path
            d={`M ${CX + 46} ${CY} A 46 46 0 ${besar} 0 ${CX + 46 * Math.cos(rad)} ${CY - 46 * Math.sin(rad)}`}
            fill="none" stroke={WARNA.sudut} strokeWidth={2.5}
          />
        </>
      )}

      {/* komponen cos (mendatar) dan sin (tegak) */}
      <line x1={CX} y1={CY} x2={px} y2={CY} stroke={WARNA.samping} strokeWidth={4} strokeLinecap="round" />
      <line x1={px} y1={CY} x2={px} y2={py} stroke={WARNA.depan} strokeWidth={4}
            strokeDasharray="6 4" strokeLinecap="round" />
      <line x1={CX} y1={CY} x2={px} y2={py} stroke={WARNA.miring} strokeWidth={3} strokeLinecap="round" />
      <circle cx={px} cy={py} r={6} fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={2} />

      {/* nilai eksak di bawah */}
      <text x={VW / 2} y={VH - 46} textAnchor="middle" fontSize={17} fill="#211E1A"
            fontFamily="var(--font-plex-mono), monospace">
        θ = {s.derajat}° = {s.radian}
      </text>
      <text x={VW / 2 - 96} y={VH - 22} textAnchor="middle" fontSize={14} fill={WARNA.depan}
            fontFamily="var(--font-plex-mono), monospace">sin θ = {s.sin}</text>
      <text x={VW / 2 + 96} y={VH - 22} textAnchor="middle" fontSize={14} fill={WARNA.samping}
            fontFamily="var(--font-plex-mono), monospace">cos θ = {s.cos}</text>
      <text x={VW / 2} y={VH - 4} textAnchor="middle" fontSize={13} fill={WARNA.sudut}
            fontFamily="var(--font-plex-mono), monospace">tan θ = {s.tan}</text>
    </svg>
  )
}
