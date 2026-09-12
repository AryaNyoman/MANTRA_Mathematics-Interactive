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

export type SatuanSudut = 'derajat' | 'radian'

/** Tulisan sudut menurut satuan yang dipilih siswa. */
export const tulisSudut = (t: SudutIstimewa, satuan: SatuanSudut) =>
  satuan === 'radian' ? t.radian : `${t.derajat}°`

const HURUF = 'var(--font-mono), sans-serif'

/**
 * REVISI ARYA 13 Sep 2026: nilai sin, cos, tan tidak lagi "berserakan" di
 * bawah gambar (tabel di panel sebelah sudah memuatnya rapi). Yang ditulis
 * di gambar hanya yang memang milik gambar: sudut θ di dekat busurnya,
 * nama ruas cos (mendatar) dan sin (tegak), dan koordinat titiknya
 * (cos θ, sin θ), supaya siswa melihat dari mana (√3/2, 1/2) di 30° lahir.
 * Satuan sudut mengikuti pilihan siswa (bawaan derajat, sama dengan video).
 */
export default function PerjalananSudut({ indeks, satuan = 'derajat' }: { indeks: number; satuan?: SatuanSudut }) {
  const s = ISTIMEWA[Math.min(indeks, ISTIMEWA.length - 1)]
  const rad = (s.derajat * Math.PI) / 180
  const px = CX + Math.cos(rad) * R
  const py = CY - Math.sin(rad) * R
  const besar = s.derajat > 180 ? 1 : 0
  // label sudut: tepat di luar busur juring (jari-jari 46), di tengah sudutnya,
  // menjauh dari busur searah sudut tengahnya supaya tidak menindih busur
  // maupun jari-jarinya; untuk 0° ditaruh di kanan atas sumbu
  const tengah = s.derajat === 0 ? 0 : rad / 2
  const ct = Math.cos(tengah)
  const st = Math.sin(tengah)
  const lAnchor = ct > 0.3 ? 'start' : ct < -0.3 ? 'end' : 'middle'
  // di 45° dan 60° ruas sin (x = px) memotong tempat labelnya: labelnya
  // digeser ke kanan ruas itu
  const lxAwal = CX + ct * 52 + (ct > 0.3 ? 5 : ct < -0.3 ? -5 : 0)
  const lx = ct > 0.3 && px > lxAwal - 4 && px < lxAwal + 60 ? px + 12 : lxAwal
  const ly = CY - st * 52 + (st > 0.3 ? -4 : st < -0.3 ? 13 : 5) + (s.derajat === 0 ? -8 : 0)
  // label ruas: cos di bawah ruas mendatar, sin di sisi ruas tegak yang
  // menjauhi juring. Ruas yang panjangnya nol (sin 0°, cos 90°) tidak diberi
  // label: nilainya ada di tabel sebelah.
  const cosX = CX + (px - CX) / 2
  const cosY = py <= CY ? CY + 16 : CY - 8
  const sinKanan = s.derajat === 90 ? false : px >= CX
  const sinX = sinKanan ? px + 10 : px - 10
  const sinY = CY + (py - CY) * 0.62 + 4
  const sinAnchor = sinKanan ? 'start' : 'end'
  // koordinat titik: menjauh dari pusat searah jari-jari
  const kx = px + Math.cos(rad) * 14
  const ky = py - Math.sin(rad) * 14
  const kAnchor = Math.abs(Math.cos(rad)) < 0.3 ? 'middle' : (px >= CX ? 'start' : 'end')
  const kDy = Math.sin(rad) > 0.3 ? -4 : Math.sin(rad) < -0.3 ? 14 : 5

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

      {/* label sudut di dekat busurnya */}
      <text x={lx} y={ly} textAnchor={lAnchor} fontSize={15} fill={WARNA.sudut}
            fontFamily={HURUF} fontWeight={600}>
        θ = {tulisSudut(s, satuan)}
      </text>
      {/* nama ruas: cos mendatar, sin tegak (nilainya ada di tabel sebelah) */}
      {s.cos !== '0' && (
        <text x={cosX} y={cosY} textAnchor="middle" fontSize={12} fill={WARNA.samping}
              fontFamily={HURUF}>cos θ</text>
      )}
      {s.sin !== '0' && (
        <text x={sinX} y={sinY} textAnchor={sinAnchor} fontSize={12} fill={WARNA.depan}
              fontFamily={HURUF}>sin θ</text>
      )}
      {/* koordinat titiknya: (cos θ, sin θ) */}
      <text x={kx} y={ky + kDy} textAnchor={kAnchor} fontSize={13} fill="#211E1A"
            fontFamily={HURUF}>({s.cos}, {s.sin})</text>
      <text x={10} y={16} textAnchor="start" fontSize={11.5} fill={WARNA.redup}
            fontFamily={HURUF}>titik pada lingkaran = (cos θ, sin θ)</text>
    </svg>
  )
}
