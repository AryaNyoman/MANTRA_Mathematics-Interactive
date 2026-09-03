'use client'

import { SUDUT_BERNAMA, type Titik } from './matriks'
import type { Pemeta } from './papan'
import { BANTU, KERTAS, MONO } from './gaya'

/**
 * Bentuk L di atas papan koordinat, lengkap dengan nama sudutnya.
 *
 * Dipakai DUA KALI di hampir setiap widget topik ini: sekali untuk prapeta dan
 * sekali untuk petanya. Karena itu warnanya, ketebalannya, dan tanda petiknya
 * datang dari luar, bukan ditentukan di dalam sini.
 */
export function Bentuk({
  titik,
  p,
  warna,
  isian = 0.1,
  tebal = 2,
  putus = false,
  petik = '',
  labelSudut = true,
}: {
  titik: Titik[]
  p: Pemeta
  warna: string
  /** kepekatan isian, 0 berarti hanya garis tepinya */
  isian?: number
  tebal?: number
  /** garis putus-putus, dipakai untuk prapeta saat petanya yang jadi pusat perhatian */
  putus?: boolean
  /** tanda petik pada nama sudut: '' untuk prapeta, "'" untuk peta */
  petik?: string
  labelSudut?: boolean
}) {
  if (titik.length === 0) return null

  const jalur = titik.map((t) => `${p.x(t.x)},${p.y(t.y)}`).join(' ')

  // Nama sudut ditaruh MENJAUH dari tengah bentuknya, supaya hurufnya tidak
  // jatuh di dalam isian dan tertelan warnanya. Tanpa ini, huruf A pada bentuk
  // yang terisi jadi hampir tak terbaca.
  const tengah = titik.reduce(
    (jumlah, t) => ({ x: jumlah.x + t.x / titik.length, y: jumlah.y + t.y / titik.length }),
    { x: 0, y: 0 },
  )

  return (
    <g>
      <polygon
        points={jalur}
        fill={warna}
        fillOpacity={isian}
        stroke={warna}
        strokeWidth={tebal}
        strokeDasharray={putus ? '5 4' : undefined}
        strokeLinejoin="round"
      />

      {titik.map((t, i) => (
        <circle key={`s${i}`} cx={p.x(t.x)} cy={p.y(t.y)} r={2.6} fill={warna} />
      ))}

      {labelSudut && SUDUT_BERNAMA.map((s) => {
        const t = titik[s.indeks]
        if (!t) return null
        const arahX = t.x - tengah.x
        const arahY = t.y - tengah.y
        const panjang = Math.hypot(arahX, arahY) || 1
        const sx = p.x(t.x) + (arahX / panjang) * 13
        // Sumbu y layar terbalik, jadi arah menjauh di layar berlawanan tanda.
        const sy = p.y(t.y) - (arahY / panjang) * 13 + 3.5

        return (
          <text
            key={`n${s.indeks}`}
            x={sx}
            y={sy}
            textAnchor="middle"
            fontSize={11.5}
            fontWeight={600}
            fill={warna}
            fontFamily={MONO}
            stroke={KERTAS}
            strokeWidth={2.8}
            paintOrder="stroke"
          >
            {s.nama}{petik}
          </text>
        )
      })}
    </g>
  )
}

/**
 * Garis putus-putus dari tiap titik prapeta ke pasangannya di peta.
 *
 * INI GAGASAN UTAMA MATERI 01, bukan hiasan. Tanpa garis-garis ini, siswa
 * melihat sebuah gambar berpindah dan menyimpulkan yang dipindahkan adalah
 * gambarnya. Dengan garis-garis ini, yang terlihat adalah setiap titik punya
 * tujuannya sendiri, dan gambar ikut pindah cuma karena semua titiknya pindah.
 */
export function Penghubung({
  prapeta,
  peta,
  p,
  warna = BANTU,
}: {
  prapeta: Titik[]
  peta: Titik[]
  p: Pemeta
  warna?: string
}) {
  return (
    <g>
      {prapeta.map((t, i) => {
        const q = peta[i]
        if (!q) return null
        // Titik yang tidak berpindah tidak perlu garis: garis sepanjang nol
        // tampil sebagai bintik yang terlihat seperti kotoran di layar.
        if (Math.hypot(q.x - t.x, q.y - t.y) < 1e-9) return null
        return (
          <line
            key={`h${i}`}
            x1={p.x(t.x)} y1={p.y(t.y)}
            x2={p.x(q.x)} y2={p.y(q.y)}
            stroke={warna}
            strokeWidth={1}
            strokeDasharray="3 3"
            opacity={0.75}
          />
        )
      })}
    </g>
  )
}

/**
 * Titik tunggal yang bisa ditarik siswa: pusat putar, pusat dilatasi, atau
 * ujung vektor geseran.
 *
 * Lingkaran luarnya sengaja jauh lebih besar daripada yang terlihat. Sasaran
 * sentuh di bawah kira-kira 24 piksel membuat widget ini nyaris tak bisa
 * dipakai di HP, dan sebagian besar siswa memang membuka situs ini dari HP.
 */
export function Pegangan({
  titik,
  p,
  warna,
  label,
}: {
  titik: Titik
  p: Pemeta
  warna: string
  label?: string
}) {
  const sx = p.x(titik.x)
  const sy = p.y(titik.y)
  return (
    <g>
      <circle cx={sx} cy={sy} r={13} fill={warna} opacity={0.12} />
      <circle cx={sx} cy={sy} r={5} fill={warna} stroke={KERTAS} strokeWidth={1.6} />
      {label && (
        <text
          x={sx + 10} y={sy - 9}
          fontSize={11} fontWeight={600} fill={warna} fontFamily={MONO}
          stroke={KERTAS} strokeWidth={2.8} paintOrder="stroke"
        >
          {label}
        </text>
      )}
    </g>
  )
}
