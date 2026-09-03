import { WARNA } from '@/lib/warna'
import type { Kotak } from './papan'

/**
 * Ukuran bidang dan warna bersama untuk kedua belas widget Transformasi
 * Geometri.
 *
 * Dipisah dari `papan.ts` dan `matriks.ts` dengan sengaja: kedua berkas itu
 * harus bebas impor supaya bisa dijalankan Node sebagai uji. Berkas inilah
 * satu-satunya di folder ini yang mengimpor `@/lib/warna`.
 *
 * Ukuran viewBox-nya sama dengan widget Vektor dan Limit, supaya ketiga topik
 * terlihat berasal dari satu situs, bukan tiga.
 */

/** Ukuran viewBox SVG. Bukan ukuran layar: SVG-nya melar mengikuti kolom. */
export const VW = 460
export const VH = 300

/** Ruang tepi untuk label sumbu, supaya angkanya tidak terpotong. */
export const TEPI = { kiri: 40, kanan: 20, atas: 24, bawah: 30 }

export const KOTAK: Kotak = {
  x0: TEPI.kiri,
  y0: TEPI.atas,
  x1: VW - TEPI.kanan,
  y1: VH - TEPI.bawah,
}

/**
 * Nisbah lebar terhadap tinggi bidang gambar. Dipakai `jendelaSeimbang` supaya
 * satu satuan mendatar berukuran sama persis dengan satu satuan tegak. Tanpa
 * itu rotasi 90 derajat tidak terlihat tegak lurus, dan pencerminan tidak
 * terlihat berjarak sama.
 */
export const NISBAH = (KOTAK.x1 - KOTAK.x0) / (KOTAK.y1 - KOTAK.y0)

export const GARIS_PETAK = '#D6CDBC'
export const GARIS_SUMBU = '#C9BFAE'
export const MONO = 'var(--font-plex-mono), monospace'

/**
 * Warna latar kartu, dipakai sebagai halo di belakang tulisan supaya label
 * tidak terpotong garis petak. Diambil dari peubah CSS, bukan ditulis ulang,
 * supaya ikut berubah kalau gaya situs disetel MASTER.
 */
export const KERTAS = 'var(--kartu)'

/* ------------------------------------------------------------------ */
/* Peran warna di topik ini                                            */
/* ------------------------------------------------------------------ */

/**
 * Kelima peran di bawah dinamai menurut TUGASNYA, bukan menurut warnanya.
 * Kalau kelak seluruh palet situs berganti, yang diubah hanya `lib/warna.ts`,
 * dan tak satu pun widget perlu disentuh.
 *
 * Warna aksen situs (hijau, oker, bata) sengaja tidak dipakai di sini. Aturan
 * `lib/warna.ts`: aksen situs untuk tombol dan tautan, warna matematika untuk
 * bendanya.
 */

/** Bentuk asal. Paling gelap, sebab inilah yang dibandingkan siswa. */
export const PRAPETA = WARNA.miring

/** Hasil transformasinya. */
export const PETA = WARNA.samping

/** Alat transformasinya: garis cermin, pusat putar, pusat dilatasi. */
export const ALAT = WARNA.sudut

/** Garis bantu: tegak lurus ke cermin, penghubung titik ke pasangannya. */
export const BANTU = WARNA.redup

/** Vektor geseran pada translasi. */
export const GESER = WARNA.depan

export { WARNA }
