'use client'

import type { ReactNode, RefObject, SVGProps } from 'react'
import {
  GARIS_PETAK, GARIS_SUMBU, MONO, PERAN,
} from '@/components/widget/statistika/warna-data'
import {
  TEPI, VH, VW, keLayar, kotak, petak, pita,
  type Jendela, type Tepi,
} from '@/components/widget/statistika/skala'

/**
 * Bingkai gambar yang dipakai bersama widget Statistika.
 *
 * Menggambar petak, sumbu, angka atau nama kategori pada sumbu, judul sumbu,
 * dan penunjuk skala. Isinya masuk lewat `children`, digambar di atas petak.
 *
 * Petak sengaja dibuat REDUP dan tipis. Aturan `dataviz`: petak dan sumbu itu
 * latar, bukan isi. Petak yang setebal datanya membuat mata bingung mana yang
 * harus dibaca.
 */

/** Pecah nama kategori yang panjang jadi dua baris, supaya tidak saling tabrak. */
function duaBaris(teks: string): [string, string?] {
  if (teks.length <= 9 || !teks.includes(' ')) return [teks]
  const kata = teks.split(' ')
  let kiri = kata[0]
  let i = 1
  while (i < kata.length && (kiri + ' ' + kata[i]).length <= Math.ceil(teks.length / 2)) {
    kiri += ' ' + kata[i]
    i++
  }
  return [kiri, kata.slice(i).join(' ')]
}

export default function Papan({
  jendela,
  tepi = TEPI,
  kategori,
  petakX = false,
  petakY = true,
  labelX,
  labelY,
  keterangan,
  tandaSkala,
  aria,
  svgRef,
  propSvg,
  children,
}: {
  jendela: Jendela
  tepi?: Tepi
  /** kalau diisi, sumbu mendatar memakai nama kategori, bukan angka */
  kategori?: string[]
  petakX?: boolean
  petakY?: boolean
  /** judul sumbu mendatar, contoh "tinggi badan (cm)" */
  labelX?: string
  /** judul sumbu tegak, contoh "banyak siswa" */
  labelY?: string
  /** tulisan kecil di kiri atas, contoh nama kumpulan datanya */
  keterangan?: string
  /** penunjuk skala di kanan bawah. Wajib untuk widget yang bisa berubah lebar */
  tandaSkala?: string
  aria: string
  /**
   * Rujukan ke unsur svg dan penanganan peristiwa penunjuk.
   *
   * Dibutuhkan widget yang isinya bisa DISERET: seretan menuntut pendengar
   * pointermove pada svg-nya, sedangkan svg itu dibuat di sini, bukan di
   * widgetnya. Tanpa jalan tembus ini, widget yang butuh seret terpaksa
   * menggambar bingkainya sendiri dan bingkainya jadi bercabang dua.
   */
  svgRef?: RefObject<SVGSVGElement | null>
  propSvg?: Pick<SVGProps<SVGSVGElement>,
    'onPointerMove' | 'onPointerUp' | 'onPointerCancel' | 'onPointerLeave'>
  children?: ReactNode
}) {
  const p = keLayar(jendela, tepi)
  const k = kotak(tepi)
  const tikX = kategori ? [] : petak(jendela.xMin, jendela.xMax, 6)
  const tikY = petak(jendela.yMin, jendela.yMax, 5)
  const band = kategori ? pita(kategori.length, tepi) : null

  // Sumbu ditempel ke tepi kalau nol tidak terlihat, supaya angkanya tetap
  // terbaca dan garisnya tidak melayang di luar gambar.
  const sumbuX = jendela.yMin <= 0 && 0 <= jendela.yMax ? p.y(0) : k.y1
  const sumbuY = jendela.xMin <= 0 && 0 <= jendela.xMax ? p.x(0) : k.x0

  return (
    <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet"
         role="img" aria-label={aria} {...propSvg}>
      {/* ---------- petak ---------- */}
      {petakX && tikX.map((t) => (
        <line key={`px${t.nilai}`} x1={p.x(t.nilai)} y1={k.y0} x2={p.x(t.nilai)} y2={k.y1}
              stroke={GARIS_PETAK} strokeWidth={1} opacity={0.5} />
      ))}
      {petakY && tikY.map((t) => (
        <line key={`py${t.nilai}`} x1={k.x0} y1={p.y(t.nilai)} x2={k.x1} y2={p.y(t.nilai)}
              stroke={GARIS_PETAK} strokeWidth={1} opacity={0.5} />
      ))}

      {/* ---------- sumbu ---------- */}
      <line x1={k.x0} y1={sumbuX} x2={k.x1} y2={sumbuX} stroke={GARIS_SUMBU} strokeWidth={1.6} />
      <line x1={sumbuY} y1={k.y0} x2={sumbuY} y2={k.y1} stroke={GARIS_SUMBU} strokeWidth={1.6} />

      {/* ---------- angka pada sumbu tegak ---------- */}
      {tikY.map((t) => (
        <text key={`ty${t.nilai}`} x={k.x0 - 6} y={p.y(t.nilai) + 3.4} textAnchor="end"
              fontSize={9.5} fill={PERAN.redup} fontFamily={MONO}>{t.label}</text>
      ))}

      {/* ---------- sumbu mendatar: angka atau nama kategori ---------- */}
      {!kategori && tikX.map((t) => (
        <text key={`tx${t.nilai}`} x={p.x(t.nilai)} y={k.y1 + 14} textAnchor="middle"
              fontSize={9.5} fill={PERAN.redup} fontFamily={MONO}>{t.label}</text>
      ))}
      {kategori && band && kategori.map((nama, i) => {
        const [atas, bawah] = duaBaris(nama)
        return (
          <text key={`kat${i}`} x={band.tengah(i)} y={k.y1 + 13} textAnchor="middle"
                fontSize={9} fill={PERAN.redup} fontFamily={MONO}>
            <tspan x={band.tengah(i)}>{atas}</tspan>
            {bawah && <tspan x={band.tengah(i)} dy={10}>{bawah}</tspan>}
          </text>
        )
      })}

      {/* ---------- isi gambarnya ---------- */}
      {children}

      {/* ---------- judul sumbu, keterangan, penunjuk skala ---------- */}
      {labelY && (
        <text x={12} y={(k.y0 + k.y1) / 2} textAnchor="middle" fontSize={9.5}
              fill={PERAN.redup} fontFamily={MONO}
              transform={`rotate(-90 12 ${(k.y0 + k.y1) / 2})`}>
          {labelY}
        </text>
      )}
      {labelX && (
        <text x={(k.x0 + k.x1) / 2} y={VH - 6} textAnchor="middle" fontSize={9.5}
              fill={PERAN.redup} fontFamily={MONO}>
          {labelX}
        </text>
      )}
      {keterangan && (
        <text x={k.x0} y={k.y0 - 8} fontSize={11} fill={PERAN.tinta} fontFamily={MONO}>
          {keterangan}
        </text>
      )}
      {tandaSkala && (
        <text x={k.x1} y={k.y0 - 8} textAnchor="end" fontSize={9} fill={PERAN.redup} fontFamily={MONO}>
          {tandaSkala}
        </text>
      )}
    </svg>
  )
}
