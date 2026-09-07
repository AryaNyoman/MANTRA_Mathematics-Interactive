import type { PointerEvent as ReactPointerEvent } from 'react'
import { keMatematika, type Jendela } from '@/components/widget/integral/koordinat'

/**
 * Alat untuk widget Integral yang titiknya bisa DISERET langsung, bukan hanya
 * digeser lewat penggeser.
 *
 * ASAL BERKAS INI: disalin dari `components/widget/grafik-fungsi/seret.ts`,
 * karena berkas itu ada di wilayah sesi lain dan aturan proyek melarang
 * menyunting wilayah sesi lain. Alasan lengkapnya di kepala `koordinat.ts`.
 *
 * KENAPA `getScreenCTM`, BUKAN HITUNGAN SENDIRI
 * Bidang gambarnya SVG dengan `viewBox` dan `preserveAspectRatio="xMidYMid
 * meet"`, jadi ada tiga hal yang bisa berbeda antara piksel layar dan koordinat
 * gambar sekaligus: skala, pergeseran karena bingkai tidak sebangun, dan zoom
 * peramban. Menghitungnya sendiri dari `getBoundingClientRect` benar hanya
 * kalau ketiganya kebetulan sederhana, dan diam-diam meleset kalau tidak.
 * `getScreenCTM` adalah matriks yang dipakai peramban itu sendiri, jadi
 * kebalikannya pasti cocok pada semua tingkat zoom.
 */

export type TitikXY = { x: number; y: number }

/**
 * Posisi tetikus atau jari dalam koordinat gambar SVG (bukan piksel layar).
 * Mengembalikan null kalau matriksnya belum siap, misalnya pada render pertama.
 */
export function posisiDiGambar(e: ReactPointerEvent<SVGSVGElement>): TitikXY | null {
  const svg = e.currentTarget
  const ctm = svg.getScreenCTM()
  if (!ctm) return null

  const titik = svg.createSVGPoint()
  titik.x = e.clientX
  titik.y = e.clientY
  const hasil = titik.matrixTransform(ctm.inverse())
  return { x: hasil.x, y: hasil.y }
}

/** Posisi tetikus atau jari langsung dalam koordinat matematika. */
export function posisiMatematika(
  e: ReactPointerEvent<SVGSVGElement>,
  j: Jendela,
): TitikXY | null {
  const g = posisiDiGambar(e)
  if (!g) return null
  const m = keMatematika(j)
  return { x: m.x(g.x), y: m.y(g.y) }
}

/**
 * Cari titik mana yang sedang disentuh.
 *
 * `jangkauan` dalam satuan gambar SVG, bukan piksel layar. Nilai bawaan 18
 * kira-kira sebesar ujung jari pada lebar bidang 460, jadi titiknya masih bisa
 * ditangkap di layar sentuh tanpa harus tepat sasaran. Keluhan ARYA 5 Sep 2026
 * ("bola sulit diambil") lahir dari sasaran sentuh yang cuma sebesar bolanya.
 *
 * Mengembalikan indeks titik TERDEKAT yang masih di dalam jangkauan, atau -1
 * kalau tidak ada. Yang terdekat, bukan yang pertama ketemu, supaya dua titik
 * yang berdekatan tidak saling merebut.
 */
export function titikTersentuh(
  sentuh: TitikXY,
  titikLayar: TitikXY[],
  jangkauan = 18,
): number {
  let terbaik = -1
  let jarakTerbaik = jangkauan

  titikLayar.forEach((t, i) => {
    const d = Math.hypot(t.x - sentuh.x, t.y - sentuh.y)
    if (d <= jarakTerbaik) {
      jarakTerbaik = d
      terbaik = i
    }
  })
  return terbaik
}

/** Kurung sebuah angka supaya tidak keluar dari batas yang diizinkan. */
export function batasi(n: number, min: number, maks: number): number {
  return n < min ? min : n > maks ? maks : n
}

/**
 * Bulatkan ke kelipatan terdekat, supaya titik yang diseret berhenti di angka
 * yang enak dibaca. Tanpa ini panel akan menuliskan "x = 1,3742" dan tidak ada
 * yang bisa dipelajari dari deretan angka itu.
 */
export function bulatkanKe(n: number, langkah: number): number {
  return Math.round(n / langkah) * langkah
}
