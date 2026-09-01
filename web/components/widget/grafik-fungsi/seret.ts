import type { PointerEvent as ReactPointerEvent } from 'react'
import { keMatematika, type Jendela } from '@/components/widget/grafik-fungsi/koordinat'

/**
 * Alat untuk widget yang titiknya bisa DISERET langsung, bukan digeser lewat
 * penggeser.
 *
 * KENAPA ADA
 * Aturan proyek: widget sebisanya bisa ditarik atau diklik langsung, bukan cuma
 * lewat slider. Dua topik sebelumnya belum pernah melakukannya, jadi alatnya
 * belum ada. Tahap 5 (menyusun rumus dari gambar) tidak masuk akal tanpa ini:
 * seluruh gagasannya adalah siswa memindahkan titik dan melihat rumusnya ikut
 * berubah.
 *
 * KENAPA `getScreenCTM`, BUKAN HITUNGAN SENDIRI
 * Bidang gambarnya SVG dengan `viewBox` dan `preserveAspectRatio="xMidYMid
 * meet"`, jadi ada tiga hal yang bisa berbeda antara piksel layar dan koordinat
 * gambar sekaligus: skala, pergeseran karena bingkai tidak sebangun, dan zoom
 * peramban. Menghitungnya sendiri dari `getBoundingClientRect` benar hanya
 * kalau ketiganya kebetulan sederhana, dan diam-diam meleset kalau tidak.
 * `getScreenCTM` adalah matriks yang dipakai peramban itu sendiri, jadi
 * kebalikannya pasti cocok pada semua tingkat zoom. Bug zoom yang dua kali
 * menipu di proyek ini (sesi 3 dan sesi 4) lahir dari menghitung sendiri hal
 * semacam ini.
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
 * `jangkauan` dalam satuan gambar SVG, bukan piksel layar. Nilai bawaan 16
 * kira-kira sebesar ujung jari pada lebar bidang 460, jadi titiknya masih bisa
 * ditangkap di layar sentuh tanpa harus tepat sasaran.
 *
 * Mengembalikan indeks titik terdekat yang masih di dalam jangkauan, atau -1
 * kalau tidak ada. Yang TERDEKAT yang dipilih, bukan yang pertama ketemu,
 * supaya dua titik yang berdekatan tidak saling merebut.
 */
export function titikTersentuh(
  sentuh: TitikXY,
  titikLayar: TitikXY[],
  jangkauan = 16,
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
 * yang enak dibaca.
 *
 * Tanpa ini, rumus yang muncul di sebelahnya akan berbunyi
 * `y = 0,7318(x - 2,0413)^2 + 3,9927`, dan siswa tidak belajar apa pun dari
 * deretan angka itu. Dengan langkah 0,5 rumusnya terbaca dan tetap terasa
 * bebas digeser.
 */
export function bulatkanKe(n: number, langkah: number): number {
  return Math.round(n / langkah) * langkah
}
