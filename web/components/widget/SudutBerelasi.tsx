'use client'

import { useSedangDiubah } from '@/components/kendali/sedang-diubah'
import { useCallback, useRef } from 'react'
import { WARNA } from '@/lib/warna'
import { angka3 } from '@/components/widget/LingkaranSatuan'

/**
 * Widget "Sudut Berelasi", Trigonometri materi 11 (20 Sep 2026).
 *
 * Dua titik pada lingkaran satuan: P pada sudut acuan θ (kuadran I, bisa
 * diseret), dan Q pada sudut hasil relasi yang dipilih (90° − θ, θ + 90°,
 * 180° − θ, 180° + θ, 360° − θ). Kedua titik memperlihatkan jarak mendatar
 * (cos) dan tingginya (sin), sehingga siswa MELIHAT bahwa besarnya sama
 * dengan milik P dan hanya tandanya (atau perannya) yang berubah. Rumusnya
 * tidak dihafal, dibaca dari gambar.
 */

const VW = 460
const VH = 300
const CX = 230
const CY = 156
const R = 112

export type Relasi = '90-' | '90+' | '180-' | '180+' | '360-'

export const URUT_RELASI: Relasi[] = ['90-', '90+', '180-', '180+', '360-']

export const RELASI: Record<
  Relasi,
  { label: string; nama: string; sudut: (t: number) => number; koordinat: string; sin: string; cos: string; tan: string }
> = {
  '90-': {
    label: '90° − θ',
    nama: 'dicerminkan pada garis y = x',
    sudut: (t) => 90 - t,
    koordinat: 'Q = (sin θ, cos θ)',
    sin: 'sin(90° − θ) = cos θ',
    cos: 'cos(90° − θ) = sin θ',
    tan: 'tan(90° − θ) = cot θ',
  },
  '90+': {
    label: 'θ + 90°',
    nama: 'diputar seperempat putaran',
    sudut: (t) => t + 90,
    koordinat: 'Q = (−sin θ, cos θ)',
    sin: 'sin(θ + 90°) = cos θ',
    cos: 'cos(θ + 90°) = −sin θ',
    tan: 'tan(θ + 90°) = −cot θ',
  },
  '180-': {
    label: '180° − θ',
    nama: 'dicerminkan ke kiri (pada sumbu y)',
    sudut: (t) => 180 - t,
    koordinat: 'Q = (−cos θ, sin θ)',
    sin: 'sin(180° − θ) = sin θ',
    cos: 'cos(180° − θ) = −cos θ',
    tan: 'tan(180° − θ) = −tan θ',
  },
  '180+': {
    label: '180° + θ',
    nama: 'dibalik ke seberang pusat',
    sudut: (t) => 180 + t,
    koordinat: 'Q = (−cos θ, −sin θ)',
    sin: 'sin(180° + θ) = −sin θ',
    cos: 'cos(180° + θ) = −cos θ',
    tan: 'tan(180° + θ) = tan θ',
  },
  '360-': {
    label: '360° − θ',
    nama: 'dicerminkan ke bawah (pada sumbu x)',
    sudut: (t) => 360 - t,
    koordinat: 'Q = (cos θ, −sin θ)',
    sin: 'sin(360° − θ) = −sin θ',
    cos: 'cos(360° − θ) = cos θ',
    tan: 'tan(360° − θ) = −tan θ',
  },
}

// 0 sampai 90 penuh (ARYA 21 Sep 2026: slider sudut harus mentok di angka bulat)
export const BATAS_ACUAN = { min: 0, maks: 90 }

export function hitungBerelasi(derajat: number, relasi: Relasi) {
  const radP = (derajat * Math.PI) / 180
  const sudutQ = RELASI[relasi].sudut(derajat)
  const radQ = (sudutQ * Math.PI) / 180
  return {
    sudutQ,
    cosP: Math.cos(radP),
    sinP: Math.sin(radP),
    cosQ: Math.cos(radQ),
    sinQ: Math.sin(radQ),
    radP,
    radQ,
  }
}

const busur = (rad: number, r: number) => {
  const deg = (rad * 180) / Math.PI
  return `M ${CX + r} ${CY} A ${r} ${r} 0 ${deg > 180 ? 1 : 0} 0 ${CX + r * Math.cos(rad)} ${CY - r * Math.sin(rad)}`
}

export default function SudutBerelasi({
  derajat,
  relasi,
  onUbah,
}: {
  derajat: number
  relasi: Relasi
  onUbah?: (d: number) => void
}) {
  const dipegang = useSedangDiubah()
  const svgRef = useRef<SVGSVGElement>(null)
  const menarik = useRef(false)
  const h = hitungBerelasi(derajat, relasi)

  const pxP = CX + h.cosP * R
  const pyP = CY - h.sinP * R
  const pxQ = CX + h.cosQ * R
  const pyQ = CY - h.sinQ * R

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
      // P sudut acuan, tetap di kuadran I: seretan ke luar dipotong ke batas
      if (d < -90) d = 90
      d = Math.max(BATAS_ACUAN.min, Math.min(BATAS_ACUAN.maks, d))
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
  const warnaQ = WARNA.depan
  const teksHalo = { stroke: 'var(--kartu)', strokeWidth: 3.5, paintOrder: 'stroke' as const, strokeLinejoin: 'round' as const }
  const mono = 'var(--font-mono), sans-serif'

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
      aria-label={`P pada sudut ${derajat} derajat, Q pada sudut ${h.sudutQ} derajat: cos Q ${angka3(h.cosQ)}, sin Q ${angka3(h.sinQ)}`}
    >
      {/* sumbu dan lingkaran */}
      <line x1={CX - R - 34} y1={CY} x2={CX + R + 34} y2={CY} stroke={sumbu} strokeWidth={1.5} />
      <line x1={CX} y1={CY - R - 26} x2={CX} y2={CY + R + 26} stroke={sumbu} strokeWidth={1.5} />
      <circle cx={CX} cy={CY} r={R} fill="none" stroke={WARNA.redup} strokeWidth={2} opacity={0.55} />
      {relasi === '90-' && (
        <line x1={CX - R - 20} y1={CY + R + 20} x2={CX + R + 20} y2={CY - R - 20} stroke={sumbu} strokeWidth={1} strokeDasharray="4 4" />
      )}

      {/* busur sudut: θ tipis ungu, sudut Q tebal jingga */}
      <path d={busur(h.radQ, 44)} fill="none" stroke={warnaQ} strokeWidth={2.5} opacity={0.8} />
      <path d={busur(h.radP, 30)} fill="none" stroke={WARNA.sudut} strokeWidth={2.5} />

      {/* proyeksi P: mendatar (cos) dan tegak (sin) */}
      <line x1={CX} y1={CY} x2={pxP} y2={CY} stroke={WARNA.sudut} strokeWidth={4} strokeLinecap="round" opacity={0.55} />
      <line x1={pxP} y1={CY} x2={pxP} y2={pyP} stroke={WARNA.sudut} strokeWidth={4} strokeLinecap="round" opacity={0.55} />
      <line x1={CX} y1={CY} x2={pxP} y2={pyP} stroke={WARNA.sudut} strokeWidth={2} />

      {/* proyeksi Q */}
      <line x1={CX} y1={CY} x2={pxQ} y2={CY} stroke={warnaQ} strokeWidth={4} strokeLinecap="round" opacity={0.7} />
      <line x1={pxQ} y1={CY} x2={pxQ} y2={pyQ} stroke={warnaQ} strokeWidth={4} strokeLinecap="round" opacity={0.7} />
      <line x1={CX} y1={CY} x2={pxQ} y2={pyQ} stroke={warnaQ} strokeWidth={2} />

      {/* label Q: koordinat, di sisi luar lingkaran */}
      <text
        x={pxQ + (h.cosQ >= 0 ? 12 : -12)} y={pyQ + (h.sinQ >= 0 ? -10 : 18)}
        textAnchor={h.cosQ >= 0 ? 'start' : 'end'} fontSize={12.5} fill={warnaQ} fontFamily={mono} {...teksHalo}
      >
        Q ({angka3(h.cosQ)}; {angka3(h.sinQ)})
      </text>
      {/* label P */}
      <text
        x={pxP + 12} y={pyP - 10} textAnchor="start" fontSize={12.5} fill={WARNA.sudut} fontFamily={mono} {...teksHalo}
      >
        P ({angka3(h.cosP)}; {angka3(h.sinP)})
      </text>
      <text x={CX + 36} y={CY - 6} fontSize={11.5} fill={WARNA.sudut} fontFamily={mono} {...teksHalo}>θ = {derajat}°</text>
      {/* keterangan sudut Q di pojok kiri atas, jauh dari pesan seret di bawah */}
      <text x={10} y={18} textAnchor="start" fontSize={11.5} fill={warnaQ} fontFamily={mono} {...teksHalo}>
        sudut Q = {h.sudutQ}°
      </text>

      {/* titik Q (diam) dan titik P (diseret) */}
      <circle cx={pxQ} cy={pyQ} r={6.5} fill={warnaQ} stroke="var(--kartu)" strokeWidth={2.5} />
      <g className={dipegang === 'acuan' ? 'nyala' : undefined} onPointerDown={mulai} style={{ cursor: 'grab' }}>
        <circle cx={pxP} cy={pyP} r={16} fill="transparent" />
        <circle cx={pxP} cy={pyP} r={7} fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={2.5} />
      </g>

      <text x={VW / 2} y={VH - 6} textAnchor="middle" fontSize={11} fill={WARNA.redup} fontFamily={mono}>
        seret titik ungu P; Q mengikuti relasi yang dipilih
      </text>
    </svg>
  )
}
