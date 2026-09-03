'use client'

import { useCallback, useRef } from 'react'
import { WARNA } from '@/lib/warna'

/**
 * Widget "Lingkaran Satuan", Trigonometri tahap 5.
 *
 * Mengikuti pola video referensi ARYA (`6 Rasion Trigonometri.mp4`): jari-jari
 * dibuat tepat 1, sehingga pembagian dengan sisi miring hilang begitu saja.
 * Yang tersisa: cos θ adalah koordinat mendatar titiknya, sin θ adalah
 * koordinat tegaknya. Rumus berubah jadi posisi.
 *
 * Titik di lingkaran bisa diseret langsung.
 */

const VW = 460
const VH = 300
const CX = 230
const CY = 156
const R = 112 // jari-jari 1 satuan = 112 piksel

/** Tiga angka desimal, koma sebagai pemisah.
 *
 *  Nilai yang sangat dekat nol dibulatkan ke nol dulu. Tanpa ini, cos 270°
 *  menghasilkan -0,00000000006 dan tampil sebagai "-0,000", tidak salah
 *  secara mesin, tapi membingungkan siswa yang membacanya. */
export const angka3 = (n: number) =>
  (Math.abs(n) < 5e-4 ? 0 : n).toFixed(3).replace('.', ',')

export function hitungLingkaran(derajat: number) {
  const rad = (derajat * Math.PI) / 180
  return { rad, cos: Math.cos(rad), sin: Math.sin(rad) }
}

export default function LingkaranSatuan({
  derajat,
  onUbah,
}: {
  derajat: number
  onUbah?: (d: number) => void
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const menarik = useRef(false)
  const { rad, cos, sin } = hitungLingkaran(derajat)

  const px = CX + cos * R
  const py = CY - sin * R

  const tarik = useCallback(
    (e: React.PointerEvent) => {
      if (!menarik.current || !onUbah) return
      const svg = svgRef.current
      const ctm = svg?.getScreenCTM()
      if (!svg || !ctm) return
      const p = svg.createSVGPoint()
      p.x = e.clientX
      p.y = e.clientY
      const t = p.matrixTransform(ctm.inverse())
      let d = (Math.atan2(CY - t.y, t.x - CX) * 180) / Math.PI
      if (d < 0) d += 360
      onUbah(Math.round(d))
    },
    [onUbah],
  )

  const mulai = (e: React.PointerEvent) => {
    if (!onUbah) return
    menarik.current = true
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
    tarik(e)
  }
  const selesai = (e: React.PointerEvent) => {
    menarik.current = false
    ;(e.target as Element).releasePointerCapture?.(e.pointerId)
  }

  const sumbu = '#D6CDBC'

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid meet"
      onPointerMove={tarik}
      onPointerUp={selesai}
      onPointerCancel={selesai}
      style={{ touchAction: 'none' }}
      role="img"
      aria-label={`Lingkaran satuan pada sudut ${derajat} derajat, cos ${angka3(cos)}, sin ${angka3(sin)}`}
    >
      {/* sumbu */}
      <line x1={CX - R - 34} y1={CY} x2={CX + R + 34} y2={CY} stroke={sumbu} strokeWidth={1.5} />
      <line x1={CX} y1={CY - R - 26} x2={CX} y2={CY + R + 26} stroke={sumbu} strokeWidth={1.5} />
      <text x={CX + R + 8} y={CY - 7} fontSize={11} fill={WARNA.redup}
            fontFamily="var(--font-mono), sans-serif">1</text>
      <text x={CX + 7} y={CY - R - 8} fontSize={11} fill={WARNA.redup}
            fontFamily="var(--font-mono), sans-serif">1</text>

      {/* lingkaran berjari-jari 1 */}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke={WARNA.redup} strokeWidth={2} opacity={0.55} />

      {/* juring sudut */}
      <path
        d={`M ${CX} ${CY} L ${CX + 34} ${CY} A 34 34 0 ${derajat > 180 ? 1 : 0} 0 ${CX + 34 * Math.cos(rad)} ${CY - 34 * Math.sin(rad)} Z`}
        fill={WARNA.sudut} opacity={0.16}
      />
      <path
        d={`M ${CX + 34} ${CY} A 34 34 0 ${derajat > 180 ? 1 : 0} 0 ${CX + 34 * Math.cos(rad)} ${CY - 34 * Math.sin(rad)}`}
        fill="none" stroke={WARNA.sudut} strokeWidth={2.5}
      />

      {/* komponen mendatar = cos, tegak = sin */}
      <line x1={CX} y1={CY} x2={px} y2={CY} stroke={WARNA.samping} strokeWidth={5} strokeLinecap="round" />
      <line x1={px} y1={CY} x2={px} y2={py} stroke={WARNA.depan} strokeWidth={5} strokeLinecap="round" />

      {/* jari-jari = 1 (sisi miring) */}
      <line x1={CX} y1={CY} x2={px} y2={py} stroke={WARNA.miring} strokeWidth={3} strokeLinecap="round" />
      <text
        x={CX + (px - CX) / 2 - 12} y={CY + (py - CY) / 2 - 8}
        fontSize={13} fill={WARNA.miring}
        fontFamily="var(--font-mono), sans-serif"
      >1</text>

      {/* Label komponen.
          `halo` memberi garis tepi setebal 3,5 px berwarna kertas di BELAKANG
          huruf (`paintOrder: stroke`), sehingga angkanya tetap terbaca saat
          kebetulan dilintasi busur lingkaran atau sumbu. Tanpa ini, pada
          sudut tertentu lingkaran memotong huruf, terlihat di halaman depan
          1 Sep 2026. Menggeser labelnya tidak menyelesaikan: pada sudut lain
          ia akan menabrak garis yang berbeda. */}
      <text x={(CX + px) / 2} y={CY + (sin >= 0 ? 20 : -10)} textAnchor="middle" fontSize={13}
            fill={WARNA.samping} fontFamily="var(--font-mono), sans-serif"
            stroke="var(--kartu)" strokeWidth={3.5} paintOrder="stroke"
            strokeLinejoin="round">
        cos θ = {angka3(cos)}
      </text>
      <text x={px + (cos >= 0 ? 10 : -10)} y={(CY + py) / 2} fontSize={13} fill={WARNA.depan}
            textAnchor={cos >= 0 ? 'start' : 'end'}
            fontFamily="var(--font-mono), sans-serif"
            stroke="var(--kartu)" strokeWidth={3.5} paintOrder="stroke"
            strokeLinejoin="round">
        sin θ = {angka3(sin)}
      </text>

      {/* titik yang diseret */}
      <g onPointerDown={mulai} style={{ cursor: 'grab' }}>
        <circle cx={px} cy={py} r={16} fill="transparent" />
        <circle cx={px} cy={py} r={7} fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={2.5} />
      </g>

      <text x={VW / 2} y={VH - 6} textAnchor="middle" fontSize={11} fill={WARNA.redup}
            fontFamily="var(--font-mono), sans-serif">
        seret titik ungunya
      </text>
    </svg>
  )
}
