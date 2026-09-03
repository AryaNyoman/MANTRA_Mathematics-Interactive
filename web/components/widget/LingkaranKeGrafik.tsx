'use client'

import { useMemo } from 'react'
import { WARNA } from '@/lib/warna'

/**
 * Widget "Dari Lingkaran ke Grafik", Trigonometri tahap 8.
 *
 * Meniru pola video referensi ARYA `Visualizing Trigonometry_ Fungsi SIN.mp4`:
 * lingkaran di kiri, sumbu grafik di kanan, dan sebuah GARIS MENDATAR
 * menghubungkan tinggi titik di lingkaran ke titik yang sedang dilukis di
 * grafik. Itu penghubung yang membuat siswa paham bahwa gelombang sinus
 * bukan bentuk baru, ia catatan tinggi sebuah titik yang berputar.
 */

const VW = 460
const VH = 300
// lingkaran (kiri)
const LX = 74
const LY = 150
const LR = 60
// grafik (kanan)
const GX0 = 156
const GX1 = 448
const GY = 150
const AMP = 60
const SAPU = 720 // derajat penuh yang ditampilkan sumbu-x grafik

export const BATAS_SAPU = { min: 0, maks: SAPU }

const xGrafik = (derajat: number) => GX0 + (derajat / SAPU) * (GX1 - GX0)
const yNilai = (nilai: number) => GY - nilai * AMP

export default function LingkaranKeGrafik({
  derajat,
  fungsi = 'sin',
}: {
  derajat: number
  /** kurva mana yang dilukis */
  fungsi?: 'sin' | 'cos'
}) {
  const rad = (derajat * Math.PI) / 180
  const nilai = fungsi === 'sin' ? Math.sin(rad) : Math.cos(rad)
  const px = LX + Math.cos(rad) * LR
  const py = LY - Math.sin(rad) * LR

  // kurva dilukis hanya sampai sudut sekarang, jadi terasa "sedang tumbuh"
  const jalur = useMemo(() => {
    const titik: string[] = []
    for (let d = 0; d <= derajat; d += 3) {
      const v = fungsi === 'sin' ? Math.sin((d * Math.PI) / 180) : Math.cos((d * Math.PI) / 180)
      titik.push(`${titik.length ? 'L' : 'M'} ${xGrafik(d).toFixed(2)} ${yNilai(v).toFixed(2)}`)
    }
    return titik.join(' ')
  }, [derajat, fungsi])

  const warnaKurva = fungsi === 'sin' ? WARNA.depan : WARNA.samping
  const gx = xGrafik(derajat)
  const gy = yNilai(nilai)

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Titik berputar di lingkaran melukis grafik ${fungsi} pada sudut ${derajat} derajat`}>
      {/* ---------- lingkaran ---------- */}
      <line x1={LX - LR - 12} y1={LY} x2={LX + LR + 12} y2={LY} stroke="#D6CDBC" strokeWidth={1.2} />
      <line x1={LX} y1={LY - LR - 12} x2={LX} y2={LY + LR + 12} stroke="#D6CDBC" strokeWidth={1.2} />
      <circle cx={LX} cy={LY} r={LR} fill="none" stroke={WARNA.redup} strokeWidth={1.8} opacity={0.5} />
      <line x1={LX} y1={LY} x2={px} y2={py} stroke={WARNA.miring} strokeWidth={2.2} />
      {/* tinggi titik = nilai sin */}
      <line x1={px} y1={LY} x2={px} y2={py} stroke={warnaKurva} strokeWidth={4} strokeLinecap="round" />
      <circle cx={px} cy={py} r={5} fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={2} />

      {/* ---------- sumbu grafik ---------- */}
      <line x1={GX0} y1={GY} x2={GX1} y2={GY} stroke="#D6CDBC" strokeWidth={1.2} />
      <line x1={GX0} y1={GY - AMP - 16} x2={GX0} y2={GY + AMP + 16} stroke="#D6CDBC" strokeWidth={1.2} />
      {[180, 360, 540, 720].map((d) => (
        <g key={d}>
          <line x1={xGrafik(d)} y1={GY - 4} x2={xGrafik(d)} y2={GY + 4} stroke="#C9BFAE" strokeWidth={1.2} />
          <text x={xGrafik(d)} y={GY + 17} textAnchor="middle" fontSize={9.5} fill={WARNA.redup}
                fontFamily="var(--font-mono), sans-serif">{d}°</text>
        </g>
      ))}
      <text x={GX0 - 7} y={GY - AMP + 4} textAnchor="end" fontSize={9.5} fill={WARNA.redup}
            fontFamily="var(--font-mono), sans-serif">1</text>
      <text x={GX0 - 7} y={GY + AMP + 4} textAnchor="end" fontSize={9.5} fill={WARNA.redup}
            fontFamily="var(--font-mono), sans-serif">−1</text>

      {/* ---------- kurva yang sedang tumbuh ---------- */}
      <path d={jalur} fill="none" stroke={warnaKurva} strokeWidth={2.6} strokeLinejoin="round" />

      {/* ---------- penghubung: dari tinggi di lingkaran ke titik di grafik ---------- */}
      <line x1={px} y1={py} x2={gx} y2={gy} stroke={WARNA.sudut} strokeWidth={1.6}
            strokeDasharray="5 4" opacity={0.9} />
      <line x1={gx} y1={GY} x2={gx} y2={gy} stroke={warnaKurva} strokeWidth={3.5}
            strokeLinecap="round" opacity={0.9} />
      <circle cx={gx} cy={gy} r={4.5} fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={1.8} />

      {/* ---------- keterangan ---------- */}
      <text x={GX0 + 4} y={20} fontSize={13} fill={warnaKurva}
            fontFamily="var(--font-mono), sans-serif">
        y = {fungsi} θ
      </text>
      <text x={GX1} y={20} textAnchor="end" fontSize={13} fill="#211E1A"
            fontFamily="var(--font-mono), sans-serif">
        θ = {derajat}°   {fungsi} θ = {(Math.abs(nilai) < 5e-4 ? 0 : nilai).toFixed(3).replace('.', ',')}
      </text>
      <text x={LX} y={VH - 8} textAnchor="middle" fontSize={10.5} fill={WARNA.redup}
            fontFamily="var(--font-mono), sans-serif">
        tinggi titik
      </text>
    </svg>
  )
}
