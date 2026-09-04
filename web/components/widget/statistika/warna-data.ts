/**
 * Warna untuk widget Statistika.
 *
 * DUA LAPIS, DAN JANGAN DITUKAR
 *
 * 1. PERAN TETAP. Diambil dari `lib/warna.ts`, satu sumber kebenaran warna
 *    matematika yang juga dipakai video Manim. Dipakai untuk hal yang punya
 *    arti sama di seluruh situs: data utama, pembanding, dan nilai yang sedang
 *    disorot. Jangan diganti demi selera per halaman.
 *
 * 2. PALET KATEGORI. Hanya untuk data kategori yang butuh dibedakan satu sama
 *    lain, misalnya potongan diagram lingkaran. Empat warna matematika tidak
 *    cukup untuk itu, dan memaksakannya membuat kategori berbeda memakai warna
 *    yang sudah punya arti lain.
 *
 * KENAPA PALET KATEGORINYA SEPERTI INI
 * Warnanya bukan pilihan selera. Kelimanya lolos pemeriksaan
 * `dataviz/scripts/validate_palette.js` pada latar kartu `#FFFDFA`: pita
 * terang, ambang chroma, keterpisahan untuk mata buta warna, keterpisahan untuk
 * mata normal, dan kontras. Percobaan pertama justru GAGAL: hijau situs
 * `#2F5D50` terbaca abu-abu, dan pasangan hijau dengan oker `#B8863B` cuma
 * berjarak 5,0 bagi penderita protanopia, artinya keduanya nyaris tak
 * terbedakan. Susunan di bawah lahir dari kumpulan Okabe-Ito yang memang
 * dirancang aman buta warna, dengan biru diganti biru proyek supaya tetap
 * serasi dengan sisa situs.
 *
 * DUA PERINGATAN YANG HARUS DIBAYAR
 * Validator menyisakan dua peringatan, dan keduanya WAJIB ditebus dengan cara
 * lain, bukan diabaikan:
 * 1. Pasangan merah muda dan hijau berjarak 7,6 bagi mata deutan, di bawah 8.
 * 2. Kuning `#E69F00` kontrasnya 2,22 banding 1 terhadap kartu, di bawah 3.
 * Tebusannya: setiap potongan dan setiap batang WAJIB diberi label langsung,
 * dan angkanya WAJIB juga tersedia sebagai tabel. Jangan pernah memakai palet
 * ini tanpa label, sebab tanpa label sebagian pembaca benar-benar tidak bisa
 * membedakannya.
 *
 * Urutannya tetap. Kategori pertama selalu warna pertama. Jangan diputar, dan
 * jangan menambah warna keenam yang dikarang sendiri: kalau kategorinya lebih
 * dari lima, gabungkan sisanya menjadi satu kategori "Lainnya".
 */

import { WARNA } from '@/lib/warna'

export const PERAN = {
  /** kumpulan data utama, titik dan batang */
  data: WARNA.samping,
  /** kelompok pembanding, dan penanda pencilan */
  banding: WARNA.depan,
  /** nilai yang sedang disorot: mean, garis regresi, kotak yang sedang dibahas */
  sorot: WARNA.sudut,
  /** garis utama, tepi kotak, teks tegas di dalam gambar */
  tinta: WARNA.miring,
  /** garis bantu, petak, keterangan sekunder */
  redup: WARNA.redup,
} as const

/** Palet kategori. Urutannya tetap. Wajib dipakai bersama label langsung. */
export const KATEGORI = [
  '#3A6EA5',
  '#D55E00',
  '#009E73',
  '#CC79A7',
  '#E69F00',
] as const

/**
 * Warna kategori ke-i.
 *
 * Sengaja TIDAK memutar kembali ke warna pertama saat kategorinya lebih dari
 * lima. Memutar membuat dua kategori berbeda memakai warna yang sama persis,
 * dan itu kesalahan yang tidak terlihat oleh penulisnya tetapi menyesatkan
 * pembacanya. Kategori keenam dan seterusnya dapat warna redup, sebagai tanda
 * bahwa datanya seharusnya digabung jadi "Lainnya".
 */
export function warnaKategori(i: number): string {
  return KATEGORI[i] ?? PERAN.redup
}

export const GARIS_PETAK = '#D6CDBC'
export const GARIS_SUMBU = '#C9BFAE'
export const KERTAS = '#FFFDFA'
export const MONO = 'var(--font-mono), sans-serif'
