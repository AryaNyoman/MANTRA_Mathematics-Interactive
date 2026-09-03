'use client'

import { KOTAK, MONO, VH, WARNA } from './gaya'

/**
 * Keterangan warna, SATU BARIS di pita bawah gambar.
 *
 * KENAPA DI PITA BAWAH, BUKAN DI POJOK DALAM BIDANG
 * Versi pertama berupa kotak melayang di salah satu pojok bidang, disalin dari
 * topik Vektor. Itu berhasil di sana sebab widget vektor menggambar panah
 * tipis yang jarang mengisi pojok. Di topik ini gagal, dan gagalnya
 * tertangkap saat pemeriksaan visual 3 Sep 2026: pada Materi 03, prapeta
 * berada tepat di kanan atas bidang, dan kotak keterangannya MENUTUPI seluruh
 * sisi atas prapeta beserta label sudut C.
 *
 * Memindahkan kotaknya ke pojok lain hanya memindahkan masalahnya, sebab isi
 * gambar di topik ini memang berpindah-pindah pojok: prapeta di kanan atas,
 * petanya bisa di mana saja tergantung transformasinya. Menaruh keterangan
 * yang bisa menutupi gambar sama saja dengan widget yang memotong gambarnya
 * sendiri, dan itu dilarang aturan proyek.
 *
 * Pita bawah berada DI LUAR `KOTAK`, yaitu di luar daerah gambar, jadi
 * tabrakan itu mustahil terjadi lagi. Harganya: ruangnya sempit.
 *
 * MAKSIMAL TIGA ENTRI, DAN TIAP TULISANNYA PENDEK
 * Pita bawah dibagi dengan penunjuk skala di sisi kanan, yang memakai kira-kira
 * 145 piksel. Sisanya kira-kira 240 piksel, cukup untuk tiga entri bertulisan
 * pendek. Entri keempat akan menabrak penunjuk skala. Kalau sebuah widget
 * terasa butuh entri keempat, biasanya yang dibutuhkan bukan keterangan
 * tambahan melainkan gambar yang lebih sederhana.
 */
export default function Legenda({
  entri,
}: {
  entri: Array<{ warna: string; teks: string; putus?: boolean }>
}) {
  const y = VH - 9
  let x = KOTAK.x0

  return (
    <g>
      {entri.slice(0, 3).map((e) => {
        const dashX = x
        const teksX = x + 18
        // 5,6 piksel per huruf pada ukuran 9,5 piksel huruf mono, ditambah
        // jarak antar entri.
        x = teksX + e.teks.length * 5.6 + 12
        return (
          <g key={e.teks}>
            <line
              x1={dashX} y1={y - 3} x2={dashX + 13} y2={y - 3}
              stroke={e.warna} strokeWidth={2.4} strokeLinecap="round"
              strokeDasharray={e.putus ? '4 3' : undefined}
            />
            <text x={teksX} y={y} fontSize={9.5} fontFamily={MONO} fill={WARNA.redup}>
              {e.teks}
            </text>
          </g>
        )
      })}
    </g>
  )
}
