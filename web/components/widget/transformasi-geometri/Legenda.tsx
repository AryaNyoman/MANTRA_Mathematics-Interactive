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
 * BARISNYA SENDIRI, TIDAK DIBAGI DENGAN PENUNJUK SKALA
 * Versi pertama menaruh keterangan dan penunjuk skala pada satu baris yang
 * sama, keterangan di kiri dan penunjuk skala rata kanan. Itu memindahkan
 * masalahnya, bukan menyelesaikannya: pada Materi 09 tulisan
 * "kolom 2, peta (0,1)" memanjang sampai menabrak "lebar tampilan 7,22 satuan",
 * dan keduanya jadi tak terbaca. Tertangkap pada pemeriksaan visual 3 Sep 2026.
 *
 * Sekarang keterangan memakai baris sendiri di atas penunjuk skala, sehingga
 * seluruh lebar bidang tersedia untuknya. Panjang tulisan tidak lagi bisa
 * merusak tulisan lain, dan pemakai widget tidak perlu menghitung piksel.
 *
 * MAKSIMAL TIGA ENTRI
 * Batas ini tetap, dan alasannya sekarang soal membaca, bukan soal ruang.
 * Keterangan berisi empat warna berarti gambarnya memuat empat hal sekaligus,
 * dan gambar seperti itu jarang mengajar dengan baik. Kalau sebuah widget
 * terasa butuh entri keempat, yang dibutuhkan biasanya gambar yang lebih
 * sederhana, bukan keterangan yang lebih panjang.
 */
export default function Legenda({
  entri,
}: {
  entri: Array<{ warna: string; teks: string; putus?: boolean }>
}) {
  const y = VH - 19
  // Letak tiap entri dihitung DULU, bukan diubah di dalam map: pemeriksa
  // react-hooks/immutability menolak peubah yang ditulis ulang di dalam
  // fungsi yang dipanggil saat merender (temuan sesi Integral, 7 Sep 2026;
  // errornya bawaan lama dan menahan eslint seluruh proyek).
  const tampil = entri.slice(0, 3)
  const letak: number[] = []
  let x = KOTAK.x0
  for (const e of tampil) {
    letak.push(x)
    // 5,6 piksel per huruf pada ukuran 9,5 piksel huruf mono, ditambah
    // jarak antar entri.
    x = x + 18 + e.teks.length * 5.6 + 12
  }

  return (
    <g>
      {tampil.map((e, i) => {
        const dashX = letak[i]
        const teksX = letak[i] + 18
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
