'use client'

import type { PointerEvent, ReactNode, RefObject } from 'react'
import { keLayar, labelSkala, petak, type Jendela } from './geometri'
import { GARIS_PETAK, GARIS_SUMBU, KERTAS, KOTAK, MONO, VH, VW, WARNA } from './gaya'

/**
 * Bingkai koordinat bersama untuk widget Vektor.
 *
 * Menggambar petak, kedua sumbu, angka pada sumbu, dan penunjuk skala di pojok.
 * Isi gambarnya masuk lewat `children`, digambar di atas petak.
 *
 * BEDA DARI `Bidang` MILIK LIMIT
 * 1. Jendelanya selalu datang dari `jendelaSeimbang`, jadi satu satuan mendatar
 *    berukuran sama dengan satu satuan tegak. Tanpa itu segitiga 3-4-5 terlihat
 *    penyok dan sudut 45 derajat terlihat bukan 45.
 * 2. Isinya bisa diseret, jadi `<svg>` menerima ref dan penangan pointer.
 * 3. `touchAction: none` dipasang. Tanpa itu, menyeret panah di HP akan
 *    menggulir halaman, bukan menggerakkan panahnya.
 */
export default function BidangVektor({
  jendela,
  keterangan,
  aria,
  tandaSkala = true,
  svgRef,
  pointer,
  children,
}: {
  jendela: Jendela
  /** tulisan kecil di kiri atas, misalnya vektor yang sedang digambar */
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
  const sumbuY = jendela.xMin <= 0 && 0 <= jendela.xMax ? p.x(0) : KOTAK.x0
  const sumbuX = jendela.yMin <= 0 && 0 <= jendela.yMax ? p.y(0) : KOTAK.y1

  // Angka sumbu ditaruh di bawah sumbu mendatar dan di kiri sumbu tegak. Kalau
  // di situ tidak ada ruang lagi (sumbunya sudah mepet tepi bingkai), angkanya
  // dipindah ke sisi seberangnya supaya tidak tergunting keluar gambar.
  const labelX_Y = sumbuX + 14 > KOTAK.y1 ? sumbuX - 7 : sumbuX + 14
  const keKiriMuat = sumbuY - 6 > KOTAK.x0
  const labelY_X = keKiriMuat ? sumbuY - 6 : sumbuY + 6
  const labelY_Anchor = keKiriMuat ? 'end' : 'start'

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={aria}
      style={pointer ? { touchAction: 'none', cursor: 'grab' } : undefined}
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
      <line x1={KOTAK.x0} y1={sumbuX} x2={KOTAK.x1} y2={sumbuX} stroke={GARIS_SUMBU} strokeWidth={1.6} />
      <line x1={sumbuY} y1={KOTAK.y0} x2={sumbuY} y2={KOTAK.y1} stroke={GARIS_SUMBU} strokeWidth={1.6} />

      {/* ---------- angka pada sumbu ----------
          Angkanya ditempel DI SEBELAH sumbunya, bukan di tepi bingkai.
          Pada grafik fungsi kedua tempat itu kebetulan sama, sebab sumbunya
          memang di tepi. Pada vektor titik asal ada di tengah, jadi angka yang
          ditaruh di tepi bawah terlihat lepas dari sumbunya dan malah membuat
          bingung. Halo berwarna kertas dipasang supaya angkanya tidak terpotong
          garis petak atau tertimpa panah. */}
      {petakX.map((t) => (
        t.nilai === 0 ? null : (
          <text key={`tx${t.nilai}`} x={p.x(t.nilai)} y={labelX_Y} textAnchor="middle"
                fontSize={9.5} fill={WARNA.redup} fontFamily={MONO}
                stroke={KERTAS} strokeWidth={2.6} paintOrder="stroke">{t.label}</text>
        )
      ))}
      {petakY.map((t) => (
        t.nilai === 0 ? null : (
          <text key={`ty${t.nilai}`} x={labelY_X} y={p.y(t.nilai) + 3.4} textAnchor={labelY_Anchor}
                fontSize={9.5} fill={WARNA.redup} fontFamily={MONO}
                stroke={KERTAS} strokeWidth={2.6} paintOrder="stroke">{t.label}</text>
        )
      ))}

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
