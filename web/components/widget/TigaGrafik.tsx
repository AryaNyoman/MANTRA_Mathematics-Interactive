'use client'

import { useMemo } from 'react'
import { WARNA } from '@/lib/warna'

/**
 * Widget "Tiga Grafik Berdampingan", Trigonometri tahap 9.
 *
 * Meniru pola video referensi ARYA `Grafik SIN COS TAN.mp4`: tiga panel
 * bertumpuk, masing-masing punya lingkaran kecil dan grafiknya sendiri, tapi
 * SEMUANYA digerakkan oleh satu sudut yang sama. Dari situ terlihat bahwa
 * ketiga kurva bukan tiga hal terpisah, ketiganya catatan dari satu putaran
 * yang sama, cuma yang dicatat berbeda.
 *
 * Grafik tan sengaja dipotong pada nilai besar dan digambar putus di setiap
 * asimtot, supaya siswa melihat jurangnya, bukan garis vertikal palsu yang
 * menyambung dua cabang.
 */

const VW = 460
const VH = 300
const TINGGI_PANEL = 100
const LR = 34          // jari-jari lingkaran kecil
const LX = 46
const GX0 = 108
const GX1 = 450
const AMP = 34
const SAPU = 720
const BATAS_TAN = 3.2  // di atas ini grafik tan dipotong

const xGrafik = (d: number) => GX0 + (d / SAPU) * (GX1 - GX0)

type Jenis = 'sin' | 'cos' | 'tan'

const NILAI: Record<Jenis, (rad: number) => number> = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
}

/** Ubah nilai fungsi jadi koordinat-y. Fungsi MURNI di luar komponen supaya
 *  tidak dibuat ulang tiap render, kalau di dalam, useMemo di bawah bisa
 *  memakai versi basi (tertangkap aturan react-hooks/exhaustive-deps). */
function keY(v: number, cy: number, jenis: Jenis): number {
  const jepit = Math.max(-BATAS_TAN, Math.min(BATAS_TAN, v))
  return cy - jepit * (AMP / (jenis === 'tan' ? BATAS_TAN : 1))
}

const WARNA_KURVA: Record<Jenis, string> = {
  sin: WARNA.depan,
  cos: WARNA.samping,
  tan: '#3F8A78',
}

function Panel({ jenis, derajat, atas }: { jenis: Jenis; derajat: number; atas: number }) {
  const cy = atas + TINGGI_PANEL / 2
  const rad = (derajat * Math.PI) / 180
  const lx = LX + Math.cos(rad) * LR
  const ly = cy - Math.sin(rad) * LR
  const warna = WARNA_KURVA[jenis]

  const nilai = NILAI[jenis](rad)
  const terpotong = jenis === 'tan' && Math.abs(nilai) > BATAS_TAN

  // kurva sampai sudut sekarang; untuk tan dipecah tiap kali melompati asimtot
  const jalur = useMemo(() => {
    const potongan: string[] = []
    let kini: string[] = []
    let sebelum: number | null = null
    for (let d = 0; d <= derajat; d += 2) {
      const v = NILAI[jenis]((d * Math.PI) / 180)
      const putus = jenis === 'tan' && sebelum !== null && Math.abs(v - sebelum) > 4
      if (putus || (jenis === 'tan' && Math.abs(v) > BATAS_TAN)) {
        if (kini.length > 1) potongan.push(kini.join(' '))
        kini = []
        sebelum = v
        continue
      }
      kini.push(`${kini.length ? 'L' : 'M'} ${xGrafik(d).toFixed(2)} ${keY(v, cy, jenis).toFixed(2)}`)
      sebelum = v
    }
    if (kini.length > 1) potongan.push(kini.join(' '))
    return potongan
  }, [derajat, jenis, cy])

  return (
    <g>
      {/* lingkaran kecil */}
      <circle cx={LX} cy={cy} r={LR} fill="none" stroke={WARNA.redup} strokeWidth={1.4} opacity={0.45} />
      <line x1={LX - LR - 6} y1={cy} x2={LX + LR + 6} y2={cy} stroke="#DDD4C4" strokeWidth={1} />
      <line x1={LX} y1={cy - LR - 6} x2={LX} y2={cy + LR + 6} stroke="#DDD4C4" strokeWidth={1} />
      <line x1={LX} y1={cy} x2={lx} y2={ly} stroke={WARNA.miring} strokeWidth={1.6} />
      {jenis === 'sin' && <line x1={lx} y1={cy} x2={lx} y2={ly} stroke={warna} strokeWidth={3} strokeLinecap="round" />}
      {jenis === 'cos' && <line x1={LX} y1={cy} x2={lx} y2={cy} stroke={warna} strokeWidth={3} strokeLinecap="round" />}
      {jenis === 'tan' && (
        <line x1={LX + LR} y1={cy} x2={LX + LR}
              y2={cy - Math.max(-LR * 1.6, Math.min(LR * 1.6, Math.tan(rad) * LR))}
              stroke={warna} strokeWidth={3} strokeLinecap="round" />
      )}
      <circle cx={lx} cy={ly} r={3.4} fill={WARNA.sudut} />

      {/* sumbu grafik */}
      <line x1={GX0} y1={cy} x2={GX1} y2={cy} stroke="#DDD4C4" strokeWidth={1} />
      <line x1={GX0} y1={cy - AMP - 8} x2={GX0} y2={cy + AMP + 8} stroke="#DDD4C4" strokeWidth={1} />

      {/* asimtot grafik tan */}
      {jenis === 'tan' &&
        [90, 270, 450, 630].map((d) => (
          <line key={d} x1={xGrafik(d)} y1={cy - AMP - 6} x2={xGrafik(d)} y2={cy + AMP + 6}
                stroke={WARNA.redup} strokeWidth={1} strokeDasharray="3 3" opacity={0.55} />
        ))}

      {jalur.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={warna} strokeWidth={2.2} strokeLinejoin="round" />
      ))}

      {/* penunjuk posisi sekarang */}
      {!terpotong && (
        <>
          <line x1={xGrafik(derajat)} y1={cy} x2={xGrafik(derajat)} y2={keY(nilai, cy, jenis)}
                stroke={warna} strokeWidth={2.4} opacity={0.85} strokeLinecap="round" />
          <circle cx={xGrafik(derajat)} cy={keY(nilai, cy, jenis)} r={3.6} fill={WARNA.sudut}
                  stroke="var(--kartu)" strokeWidth={1.5} />
        </>
      )}

      <text x={GX0 + 4} y={atas + 13} fontSize={11} fill={warna}
            fontFamily="var(--font-mono), sans-serif">y = {jenis} θ</text>
      <text x={GX1} y={atas + 13} textAnchor="end" fontSize={11} fill="#211E1A"
            fontFamily="var(--font-mono), sans-serif">
        {terpotong ? 'di luar bingkai' : (Math.abs(nilai) < 5e-4 ? 0 : nilai).toFixed(2).replace('.', ',')}
      </text>
    </g>
  )
}

export default function TigaGrafik({ derajat }: { derajat: number }) {
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Grafik sin, cos, dan tan pada sudut ${derajat} derajat`}>
      <Panel jenis="sin" derajat={derajat} atas={0} />
      <Panel jenis="cos" derajat={derajat} atas={TINGGI_PANEL} />
      <Panel jenis="tan" derajat={derajat} atas={TINGGI_PANEL * 2} />
    </svg>
  )
}
