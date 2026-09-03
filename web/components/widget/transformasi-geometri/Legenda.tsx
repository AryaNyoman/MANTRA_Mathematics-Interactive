'use client'

import { KERTAS, KOTAK, MONO, WARNA } from './gaya'

/**
 * Kotak keterangan warna, letaknya TETAP di salah satu pojok bidang.
 *
 * Disalin dari `widget/vektor/Legenda.tsx`, alasan penyalinan ada di kepala
 * `papan.ts`.
 *
 * KENAPA LEBIH BAIK DARIPADA LABEL DI BADAN GAMBAR
 * Widget di topik ini menampilkan dua bentuk sekaligus, prapeta dan peta, dan
 * siswa bebas memindahkan garis cermin atau pusat putarnya. Label yang
 * menempel di badan gambar ikut berpindah, jadi susunan yang hari ini rapi
 * akan bertindih begitu pusatnya digeser. Kotak keterangan memutus masalah itu
 * di akarnya: letaknya tidak bergantung pada isi gambar sama sekali.
 */
export default function Legenda({
  entri,
  sudut = 'kiri-bawah',
}: {
  entri: Array<{ warna: string; teks: string; putus?: boolean }>
  sudut?: 'kiri-bawah' | 'kanan-bawah' | 'kiri-atas' | 'kanan-atas'
}) {
  const tinggiBaris = 15
  const tinggi = entri.length * tinggiBaris + 8
  const lebar = 8 + 22 + Math.max(...entri.map((e) => e.teks.length)) * 6.1

  const diKiri = sudut === 'kiri-bawah' || sudut === 'kiri-atas'
  const diAtas = sudut === 'kiri-atas' || sudut === 'kanan-atas'
  const x = diKiri ? KOTAK.x0 + 5 : KOTAK.x1 - lebar - 5
  const y = diAtas ? KOTAK.y0 + 5 : KOTAK.y1 - tinggi - 5

  return (
    <g>
      <rect
        x={x} y={y} width={lebar} height={tinggi} rx={5}
        fill={KERTAS} opacity={0.88} stroke={WARNA.redup} strokeOpacity={0.35}
      />
      {entri.map((e, i) => {
        const garisY = y + 4 + tinggiBaris * i + tinggiBaris / 2
        return (
          <g key={e.teks}>
            <line
              x1={x + 6} y1={garisY} x2={x + 22} y2={garisY}
              stroke={e.warna} strokeWidth={2.6} strokeLinecap="round"
              strokeDasharray={e.putus ? '4 3' : undefined}
            />
            <text
              x={x + 27} y={garisY + 3.4} fontSize={10} fontFamily={MONO} fill={WARNA.miring}
            >
              {e.teks}
            </text>
          </g>
        )
      })}
    </g>
  )
}
