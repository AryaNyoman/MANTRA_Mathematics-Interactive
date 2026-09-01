'use client'

import { keLayar, type Jendela, type Vek } from './geometri'
import { KERTAS, KOTAK, MONO } from './gaya'

/**
 * Satu anak panah bermata dan berlabel, digambar di dalam `BidangVektor`.
 *
 * KENAPA MATA PANAHNYA POLYGON, BUKAN marker-end
 * `marker-end` ikut menskala mengikuti `strokeWidth` dan ukurannya berbeda-beda
 * antar peramban, jadi panah yang sama bisa terlihat gemuk di satu tempat dan
 * kurus di tempat lain. Polygon yang dihitung sendiri selalu sama.
 *
 * KENAPA BATANGNYA DIPENDEKKAN
 * Kalau batang digambar sampai ujung, garisnya mencuat keluar dari ujung mata
 * panah dan terlihat seperti duri.
 */
export default function Panah({
  dari,
  ke,
  jendela,
  warna,
  label,
  putus = false,
  tebal = 2.4,
  pegangan = false,
  sisiLabel = 1,
  bagian = 0.5,
  opasitas = 1,
}: {
  dari: Vek
  ke: Vek
  jendela: Jendela
  warna: string
  label?: string
  /** garis putus-putus, untuk panah bantu seperti komponen atau vektor lawan */
  putus?: boolean
  tebal?: number
  /** lingkaran kecil di ujung, isyarat bahwa panah ini bisa ditarik */
  pegangan?: boolean
  /** 1 atau -1, memilih di sisi mana label ditaruh terhadap batangnya */
  sisiLabel?: 1 | -1
  /**
   * Letak label di sepanjang batang, 0 di pangkal dan 1 di ujung.
   * Dipakai untuk menggeser label yang bertumpuk dengan label panah lain,
   * misalnya label vektor utama dengan label komponennya.
   */
  bagian?: number
  opasitas?: number
}) {
  const p = keLayar(jendela, KOTAK)
  const x1 = p.x(dari.x)
  const y1 = p.y(dari.y)
  const x2 = p.x(ke.x)
  const y2 = p.y(ke.y)

  const dx = x2 - x1
  const dy = y2 - y1
  const jarak = Math.hypot(dx, dy)

  // Panah sepanjang nol tidak punya arah. Menghitung sudutnya menghasilkan arah
  // acak, dan mata panahnya berkedip liar saat nilainya melewati nol.
  if (!Number.isFinite(jarak) || jarak < 0.6) return null

  const ux = dx / jarak
  const uy = dy / jarak
  // tegak lurus batang, dipakai untuk mata panah dan letak label
  const nx = -uy
  const ny = ux

  const kepala = Math.min(12, jarak * 0.42)
  const lebarKepala = kepala * 0.62
  const kx = x2 - ux * kepala
  const ky = y2 - uy * kepala

  const mata = [
    `${x2},${y2}`,
    `${kx + (nx * lebarKepala) / 2},${ky + (ny * lebarKepala) / 2}`,
    `${kx - (nx * lebarKepala) / 2},${ky - (ny * lebarKepala) / 2}`,
  ].join(' ')

  const geser = 13 * sisiLabel
  const labelX = x1 + (kx - x1) * bagian + nx * geser
  const labelY = y1 + (ky - y1) * bagian + ny * geser + 3.6

  return (
    <g opacity={opasitas}>
      <line
        x1={x1} y1={y1} x2={kx} y2={ky}
        stroke={warna} strokeWidth={tebal} strokeLinecap="round"
        strokeDasharray={putus ? '5 4' : undefined}
      />
      <polygon points={mata} fill={warna} />
      {pegangan && (
        <circle cx={x2} cy={y2} r={7} fill={warna} opacity={0.16} />
      )}
      {label && (
        // Halo berwarna kertas supaya label tidak terpotong garis petak.
        // paint-order menaruh stroke di BELAKANG huruf, bukan menimpanya.
        <text
          x={labelX} y={labelY} textAnchor="middle"
          fontSize={13} fontFamily={MONO} fill={warna}
          stroke={KERTAS} strokeWidth={3.4} paintOrder="stroke"
        >
          {label}
        </text>
      )}
    </g>
  )
}
