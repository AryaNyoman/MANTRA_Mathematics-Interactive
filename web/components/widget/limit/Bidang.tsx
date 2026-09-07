'use client'

import { petakSumbu } from '@/lib/petak-sumbu'
import type { ReactNode } from 'react'
import {
  GARIS_PETAK, GARIS_SUMBU, KOTAK, MONO, VH, VW, WARNA,
  keLayar, labelSkala, type Jendela,
} from '@/components/widget/limit/koordinat'

/**
 * Bingkai koordinat yang dipakai bersama widget-widget Limit.
 *
 * Menggambar petak, kedua sumbu, angka pada sumbu, dan PENUNJUK SKALA di pojok.
 * Penunjuk skala itu wajib menurut aturan proyek: widget yang bisa diperbesar
 * harus memberi tahu penggunanya sedang mengintip sedekat apa, kalau tidak
 * siswa kehilangan rasa ukuran dan mengira grafiknya berubah bentuk.
 *
 * Isi grafiknya masuk lewat `children`, digambar di atas petak.
 */
export default function Bidang({
  jendela,
  keterangan,
  aria,
  tandaSkala = true,
  children,
}: {
  jendela: Jendela
  /** tulisan kecil di kiri atas, misalnya rumus yang sedang digambar */
  keterangan?: string
  aria: string
  /** boleh dimatikan untuk widget yang tampilannya tidak pernah berubah skala */
  tandaSkala?: boolean
  children?: ReactNode
}) {
  const p = keLayar(jendela)
  const petakX = petakSumbu(jendela.xMin, jendela.xMax, KOTAK.x1 - KOTAK.x0)
  const petakY = petakSumbu(jendela.yMin, jendela.yMax, KOTAK.y1 - KOTAK.y0)

  // Sumbu digambar di dalam bingkai kalau nol memang terlihat. Kalau nol ada di
  // luar jendela, sumbunya ditempel ke tepi supaya angkanya tetap terbaca dan
  // tidak melayang di luar gambar.
  const sumbuY = jendela.xMin <= 0 && 0 <= jendela.xMax ? p.x(0) : KOTAK.x0
  const sumbuX = jendela.yMin <= 0 && 0 <= jendela.yMax ? p.y(0) : KOTAK.y1

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label={aria}>
      {/* ---------- petak ---------- */}
      {petakX.map((t) => (
        <line key={`px${t.nilai}`} x1={p.x(t.nilai)} y1={KOTAK.y0} x2={p.x(t.nilai)} y2={KOTAK.y1}
              stroke={GARIS_PETAK} strokeWidth={1} opacity={0.55} />
      ))}
      {petakY.map((t) => (
        <line key={`py${t.nilai}`} x1={KOTAK.x0} y1={p.y(t.nilai)} x2={KOTAK.x1} y2={p.y(t.nilai)}
              stroke={GARIS_PETAK} strokeWidth={1} opacity={0.55} />
      ))}

      {/* ---------- sumbu ---------- */}
      <line x1={KOTAK.x0} y1={sumbuX} x2={KOTAK.x1} y2={sumbuX} stroke={GARIS_SUMBU} strokeWidth={1.6} />
      <line x1={sumbuY} y1={KOTAK.y0} x2={sumbuY} y2={KOTAK.y1} stroke={GARIS_SUMBU} strokeWidth={1.6} />

      {/* ---------- angka pada sumbu ---------- */}
      {petakX.map((t) => (
        <text key={`tx${t.nilai}`} x={p.x(t.nilai)} y={KOTAK.y1 + 14} textAnchor="middle"
              fontSize={9.5} fill={WARNA.redup} fontFamily={MONO}>{t.label}</text>
      ))}
      {petakY.map((t) => (
        <text key={`ty${t.nilai}`} x={KOTAK.x0 - 6} y={p.y(t.nilai) + 3.4} textAnchor="end"
              fontSize={9.5} fill={WARNA.redup} fontFamily={MONO}>{t.label}</text>
      ))}

      {/* ---------- isi grafiknya ---------- */}
      {children}

      {/* ---------- keterangan dan penunjuk skala ---------- */}
      {keterangan && (
        <text x={KOTAK.x0} y={KOTAK.y0 - 7} fontSize={12} fill={WARNA.miring} fontFamily={MONO}>
          {keterangan}
        </text>
      )}
      {tandaSkala && (
        <text x={KOTAK.x1} y={VH - 7} textAnchor="end" fontSize={9.5} fill={WARNA.redup} fontFamily={MONO}>
          {labelSkala(jendela)}
        </text>
      )}
    </svg>
  )
}
