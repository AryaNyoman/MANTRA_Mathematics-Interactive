import { WARNA } from '@/lib/warna'
import type { Kotak } from './geometri'

/**
 * Ukuran bidang dan warna bersama untuk kesebelas widget Vektor.
 *
 * Dipisah dari `geometri.ts` dengan sengaja: `geometri.ts` harus bebas impor
 * supaya bisa dijalankan Node sebagai uji. Berkas inilah satu-satunya yang
 * mengimpor `@/lib/warna`.
 *
 * Angka petak dan sumbunya sama dengan yang dipakai widget Limit, supaya kedua
 * topik terlihat berasal dari satu situs, bukan dua.
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
 * satu satuan mendatar berukuran sama persis dengan satu satuan tegak.
 */
export const NISBAH = (KOTAK.x1 - KOTAK.x0) / (KOTAK.y1 - KOTAK.y0)

export const GARIS_PETAK = '#D6CDBC'
export const GARIS_SUMBU = '#C9BFAE'
export const MONO = 'var(--font-mono), sans-serif'

/**
 * Warna latar kartu, dipakai sebagai halo di belakang tulisan supaya label
 * tidak terpotong garis petak. Diambil dari peubah CSS, bukan ditulis ulang,
 * supaya ikut berubah kalau gaya situs disetel MANTRA-DESAIN-UI-UX.
 */
export const KERTAS = 'var(--kartu)'

export { WARNA }
