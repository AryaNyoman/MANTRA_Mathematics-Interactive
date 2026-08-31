'use client'

import { WARNA } from '@/lib/warna'

/**
 * Widget "Enam Rasio" — Trigonometri tahap 6.
 *
 * Meniru pola video referensi ARYA `6 Rasion Trigonometri.mp4`: keenam
 * perbandingan digambar sebagai RUAS GARIS SUNGGUHAN di lingkaran satuan,
 * bukan sekadar rumus di kertas. tan benar-benar garis singgung, sec benar-benar
 * garis potong, dan panjangnya bisa diukur.
 *
 * Sudut dibatasi 25°-65° supaya keenam ruas tetap muat di bingkai — di luar
 * rentang itu cot atau tan melesat sangat panjang.
 */

const VW = 460
const VH = 300
const CX = 162
const CY = 208
const R = 86 // jari-jari 1 satuan

export const BATAS_ENAM = { min: 25, maks: 65 }

export type Rasio = 'sin' | 'cos' | 'tan' | 'cot' | 'sec' | 'csc'

export const RASIO: Record<Rasio, { lambang: string; nama: string; rumus: string; letak: string }> = {
  sin: { lambang: 'sin θ', nama: 'sinus', rumus: 'depan ÷ miring', letak: 'ruas tegak dari sumbu-x ke titik di lingkaran' },
  cos: { lambang: 'cos θ', nama: 'kosinus', rumus: 'samping ÷ miring', letak: 'ruas mendatar dari pusat ke kaki titik' },
  tan: { lambang: 'tan θ', nama: 'tangen', rumus: 'depan ÷ samping', letak: 'ruas tegak pada garis singgung x = 1' },
  cot: { lambang: 'cot θ', nama: 'kotangen', rumus: 'samping ÷ depan', letak: 'ruas mendatar pada garis singgung y = 1' },
  sec: { lambang: 'sec θ', nama: 'sekan', rumus: '1 ÷ cos θ', letak: 'dari pusat sampai menembus garis singgung x = 1' },
  csc: { lambang: 'csc θ', nama: 'kosekan', rumus: '1 ÷ sin θ', letak: 'dari pusat sampai menembus garis singgung y = 1' },
}

export const URUT_RASIO: Rasio[] = ['sin', 'cos', 'tan', 'cot', 'sec', 'csc']

export function hitungEnam(derajat: number) {
  const rad = (derajat * Math.PI) / 180
  const sin = Math.sin(rad)
  const cos = Math.cos(rad)
  return { rad, sin, cos, tan: sin / cos, cot: cos / sin, sec: 1 / cos, csc: 1 / sin }
}

export default function EnamRasio({ derajat, sorot }: { derajat: number; sorot: Rasio }) {
  const e = hitungEnam(derajat)
  const px = CX + e.cos * R
  const py = CY - e.sin * R
  // T = titik potong jari-jari yang diperpanjang dengan garis singgung x = 1
  const Tx = CX + R
  const Ty = CY - e.tan * R
  // K = titik potong dengan garis singgung y = 1
  const Kx = CX + e.cot * R
  const Ky = CY - R

  const w = (r: Rasio) => (sorot === r ? 6 : 2.5)
  const o = (r: Rasio) => (sorot === r ? 1 : 0.22)

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Enam rasio pada lingkaran satuan, sedang menyorot ${sorot}`}>
      {/* sumbu & lingkaran */}
      <line x1={CX - 22} y1={CY} x2={VW - 8} y2={CY} stroke="#D6CDBC" strokeWidth={1.5} />
      <line x1={CX} y1={VH - 8} x2={CX} y2={10} stroke="#D6CDBC" strokeWidth={1.5} />
      <circle cx={CX} cy={CY} r={R} fill="none" stroke={WARNA.redup} strokeWidth={1.8} opacity={0.5} />

      {/* garis singgung x = 1 dan y = 1 */}
      <line x1={Tx} y1={CY + 16} x2={Tx} y2={12} stroke={WARNA.redup} strokeWidth={1} strokeDasharray="4 4" opacity={0.7} />
      <line x1={CX - 16} y1={Ky} x2={VW - 10} y2={Ky} stroke={WARNA.redup} strokeWidth={1} strokeDasharray="4 4" opacity={0.7} />
      <text x={Tx + 4} y={CY + 15} fontSize={10} fill={WARNA.redup}
            fontFamily="var(--font-plex-mono), monospace">x=1</text>
      <text x={CX - 34} y={Ky + 4} fontSize={10} fill={WARNA.redup}
            fontFamily="var(--font-plex-mono), monospace">y=1</text>

      {/* jari-jari = 1 */}
      <line x1={CX} y1={CY} x2={px} y2={py} stroke={WARNA.miring} strokeWidth={2} opacity={0.55} />

      {/* --- keenam ruas --- */}
      {/* csc: pusat -> K */}
      <line x1={CX} y1={CY} x2={Kx} y2={Ky} stroke="#8E6FB5" strokeWidth={w('csc')} opacity={o('csc')} strokeLinecap="round" />
      {/* sec: pusat -> T */}
      <line x1={CX} y1={CY} x2={Tx} y2={Ty} stroke="#3F8A78" strokeWidth={w('sec')} opacity={o('sec')} strokeLinecap="round" />
      {/* cot: (0,1) -> K */}
      <line x1={CX} y1={Ky} x2={Kx} y2={Ky} stroke="#B5793F" strokeWidth={w('cot')} opacity={o('cot')} strokeLinecap="round" />
      {/* tan: (1,0) -> T */}
      <line x1={Tx} y1={CY} x2={Tx} y2={Ty} stroke={WARNA.sudut} strokeWidth={w('tan')} opacity={o('tan')} strokeLinecap="round" />
      {/* cos: pusat -> kaki */}
      <line x1={CX} y1={CY} x2={px} y2={CY} stroke={WARNA.samping} strokeWidth={w('cos')} opacity={o('cos')} strokeLinecap="round" />
      {/* sin: kaki -> titik */}
      <line x1={px} y1={CY} x2={px} y2={py} stroke={WARNA.depan} strokeWidth={w('sin')} opacity={o('sin')} strokeLinecap="round" />

      {/* busur sudut */}
      <path d={`M ${CX + 26} ${CY} A 26 26 0 0 0 ${CX + 26 * Math.cos(e.rad)} ${CY - 26 * Math.sin(e.rad)}`}
            fill="none" stroke={WARNA.sudut} strokeWidth={2} />
      <text x={CX + 32} y={CY - 12} fontSize={14} fill={WARNA.sudut} fontStyle="italic"
            fontFamily="var(--font-fraunces), Georgia, serif">θ</text>

      <circle cx={px} cy={py} r={4.5} fill={WARNA.miring} />

      {/* keterangan ruas yang sedang disorot */}
      <text x={VW - 10} y={VH - 26} textAnchor="end" fontSize={15} fill="#211E1A"
            fontFamily="var(--font-plex-mono), monospace">
        {RASIO[sorot].lambang} = {e[sorot].toFixed(3).replace('.', ',')}
      </text>
      <text x={VW - 10} y={VH - 9} textAnchor="end" fontSize={11} fill={WARNA.redup}
            fontFamily="var(--font-plex-mono), monospace">
        {RASIO[sorot].rumus}
      </text>
    </svg>
  )
}
