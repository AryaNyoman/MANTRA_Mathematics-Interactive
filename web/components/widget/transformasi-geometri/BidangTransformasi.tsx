'use client'

import type { PointerEvent, ReactNode, RefObject } from 'react'
import { keLayar, labelSkala, petak, type Jendela } from './papan'
import { GARIS_PETAK, GARIS_SUMBU, KERTAS, KOTAK, MONO, VH, VW, WARNA } from './gaya'

/**
 * Bingkai koordinat bersama untuk kedua belas widget Transformasi Geometri.
 *
 * Menggambar petak, kedua sumbu, angka pada sumbu, dan penunjuk skala di
 * pojok. Isi gambarnya masuk lewat `children`, digambar di atas petak.
 *
 * Disalin dari `widget/vektor/BidangVektor.tsx` dan disesuaikan. Yang berbeda
 * hanya dua hal, dan keduanya penting justru di topik ini:
 *
 * 1. Sumbunya digambar lebih tegas daripada di topik Vektor. Di sini sumbu X
 *    dan sumbu Y BUKAN cuma penggaris: keduanya adalah garis cermin yang
 *    dipelajari Materi 03, jadi harus terlihat sebagai benda, bukan sebagai
 *    latar.
 * 2. Angka sumbu tidak pernah disembunyikan. Seluruh topik ini adalah tentang
 *    koordinat sebuah titik berubah menjadi apa, dan itu tidak bisa dibaca
 *    dari sumbu yang tidak bernomor.
 */
export default function BidangTransformasi({
  jendela,
  keterangan,
  aria,
  tandaSkala = true,
  svgRef,
  pointer,
  children,
}: {
  jendela: Jendela
  /** tulisan kecil di kiri atas, misalnya transformasi yang sedang dipakai */
  keterangan?: string
  aria: string
  tandaSkala?: boolean
  svgRef?: RefObject<SVGSVGElement | null>
  pointer?: {
    onPointerDown: (e: PointerEvent) => void
    onPointerMove: (e: PointerEvent) => void
    onPointerUp: (e: PointerEvent) => void
  }
  children?: ReactNode
}) {
  const p = keLayar(jendela, KOTAK)
  const petakX = petak(jendela.xMin, jendela.xMax, 7)
  const petakY = petak(jendela.yMin, jendela.yMax, 5)

  // Sumbu digambar di tempat nol berada. Kalau nol ada di luar jendela,
  // sumbunya ditempel ke tepi supaya angkanya tetap terbaca dan tidak melayang
  // di luar gambar.
  const adaNolX = jendela.xMin <= 0 && 0 <= jendela.xMax
  const adaNolY = jendela.yMin <= 0 && 0 <= jendela.yMax
  const sumbuY = adaNolX ? p.x(0) : KOTAK.x0
  const sumbuX = adaNolY ? p.y(0) : KOTAK.y1

  // Angka sumbu ditaruh di bawah sumbu mendatar dan di kiri sumbu tegak. Kalau
  // di situ tidak ada ruang lagi, angkanya dipindah ke sisi seberangnya supaya
  // tidak tergunting keluar gambar.
  const labelXPadaY = sumbuX + 14 > KOTAK.y1 ? sumbuX - 7 : sumbuX + 14
  const keKiriMuat = sumbuY - 6 > KOTAK.x0
  const labelYPadaX = keKiriMuat ? sumbuY - 6 : sumbuY + 6
  const labelYAnchor = keKiriMuat ? 'end' : 'start'

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={aria}
      // userSelect dimatikan supaya menyeret sesuatu tidak ikut menyorot
      // tulisan di dalam gambar. Tanpa ini, satu tarikan meninggalkan blok biru
      // di seluruh label dan widgetnya terlihat rusak.
      style={
        pointer
          ? { touchAction: 'none', cursor: 'grab', userSelect: 'none', WebkitUserSelect: 'none' }
          : undefined
      }
      onPointerDown={pointer?.onPointerDown}
      onPointerMove={pointer?.onPointerMove}
      onPointerUp={pointer?.onPointerUp}
      onPointerCancel={pointer?.onPointerUp}
    >
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
      <line x1={KOTAK.x0} y1={sumbuX} x2={KOTAK.x1} y2={sumbuX} stroke={GARIS_SUMBU} strokeWidth={1.8} />
      <line x1={sumbuY} y1={KOTAK.y0} x2={sumbuY} y2={KOTAK.y1} stroke={GARIS_SUMBU} strokeWidth={1.8} />

      {/* ---------- angka pada sumbu ----------
          Angkanya ditempel DI SEBELAH sumbunya, bukan di tepi bingkai. Titik
          asal di topik ini hampir selalu ada di tengah gambar, jadi angka yang
          ditaruh di tepi bawah akan terlihat lepas dari sumbunya. Halo berwarna
          kertas dipasang supaya angkanya tidak terpotong garis petak atau
          tertimpa bentuknya. */}
      {petakX.map((t) => (
        t.nilai === 0 ? null : (
          <text key={`tx${t.nilai}`} x={p.x(t.nilai)} y={labelXPadaY} textAnchor="middle"
                fontSize={9.5} fill={WARNA.redup} fontFamily={MONO}
                stroke={KERTAS} strokeWidth={2.6} paintOrder="stroke">{t.label}</text>
        )
      ))}
      {petakY.map((t) => (
        t.nilai === 0 ? null : (
          <text key={`ty${t.nilai}`} x={labelYPadaX} y={p.y(t.nilai) + 3.4} textAnchor={labelYAnchor}
                fontSize={9.5} fill={WARNA.redup} fontFamily={MONO}
                stroke={KERTAS} strokeWidth={2.6} paintOrder="stroke">{t.label}</text>
        )
      ))}

      {/* Titik asal diberi angka nol hanya kalau kedua sumbunya benar-benar
          terlihat. Nol adalah pusat bawaan rotasi dan dilatasi di Materi 06,
          07, dan 10, jadi siswa perlu tahu di mana ia berada. */}
      {adaNolX && adaNolY && (
        <text x={sumbuY - 6} y={sumbuX + 13} textAnchor="end"
              fontSize={9.5} fill={WARNA.redup} fontFamily={MONO}
              stroke={KERTAS} strokeWidth={2.6} paintOrder="stroke">0</text>
      )}

      {/* ---------- isi gambarnya ---------- */}
      {children}

      {/* ---------- keterangan dan penunjuk skala ---------- */}
      {keterangan && (
        <text x={KOTAK.x0} y={KOTAK.y0 - 8} fontSize={12} fill={WARNA.miring} fontFamily={MONO}>
          {keterangan}
        </text>
      )}
      {tandaSkala && (
        <text x={KOTAK.x1} y={VH - 6} textAnchor="end" fontSize={9.5} fill={WARNA.redup} fontFamily={MONO}>
          {labelSkala(jendela)}
        </text>
      )}
    </svg>
  )
}
