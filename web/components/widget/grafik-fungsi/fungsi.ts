import { angka } from '@/components/widget/grafik-fungsi/koordinat'

/**
 * Matematika fungsi kuadrat, dan cara menuliskannya sebagai rumus yang terbaca.
 *
 * KENAPA DIPISAH DARI WIDGETNYA
 * Tiga widget memakai isi berkas ini (bentuk puncak, dua wajah parabola, dan
 * menyusun parabola). Kalau rumus perpindahan antar bentuk ditulis ulang di
 * tiga tempat, cepat atau lambat salah satunya akan berbeda sendiri, dan
 * siswa melihat dua jawaban berbeda untuk parabola yang sama.
 *
 * BUKU YANG DIIKUTI
 * Buku Panduan Guru Matematika Kelas X, Bab 6, halaman cetak 185, menyebut
 * tiga bentuk fungsi kuadrat berikut koordinat puncaknya. Ketiganya ada di
 * sini, dengan nama yang sama seperti di buku:
 *
 *   bentuk umum    y = ax^2 + bx + c     puncak (-b/2a, -D/4a)
 *   bentuk puncak  y = a(x - h)^2 + k    puncak (h, k)
 *   bentuk faktor  y = a(x - p)(x - q)   absis puncak (p + q)/2
 */

/* ------------------------------------------------------------------ */
/* Bentuk-bentuk fungsi kuadrat                                        */
/* ------------------------------------------------------------------ */

export type BentukPuncak = { a: number; h: number; k: number }
export type BentukUmum = { a: number; b: number; c: number }

/** Bentuk puncak menjadi bentuk umum, dengan menjabarkan kurungnya. */
export function keUmum({ a, h, k }: BentukPuncak): BentukUmum {
  return { a, b: -2 * a * h, c: a * h * h + k }
}

/**
 * Bentuk umum menjadi bentuk puncak.
 *
 * `a` nol berarti fungsinya bukan kuadrat melainkan linear, dan parabolanya
 * tidak punya puncak. Dikembalikan apa adanya supaya pemanggilnya yang
 * memutuskan, bukan diam-diam dibagi nol di sini.
 */
export function kePuncak({ a, b, c }: BentukUmum): BentukPuncak {
  if (a === 0) return { a: 0, h: 0, k: c }
  const h = -b / (2 * a)
  return { a, h, k: c - (b * b) / (4 * a) }
}

export function diskriminan({ a, b, c }: BentukUmum): number {
  return b * b - 4 * a * c
}

/**
 * Titik potong dengan sumbu x, urut dari kiri.
 *
 * Kosong kalau diskriminannya negatif. Itu bukan kesalahan: grafiknya tetap
 * ada dan tetap parabola utuh, hanya saja seluruhnya melayang di satu sisi
 * sumbu x. Kekeliruan "D negatif berarti tidak ada grafiknya" dibahas khusus
 * di tahap 4.
 */
export function akar(u: BentukUmum): number[] {
  const { a, b } = u
  if (a === 0) return b === 0 ? [] : [-u.c / b]
  const D = diskriminan(u)
  if (D < 0) return []
  if (D === 0) return [-b / (2 * a)]
  const akarD = Math.sqrt(D)
  const p = (-b - akarD) / (2 * a)
  const q = (-b + akarD) / (2 * a)
  return p <= q ? [p, q] : [q, p]
}

/** Nilai fungsi kuadrat pada sebuah x, dihitung dari bentuk puncak. */
export function nilaiPuncak({ a, h, k }: BentukPuncak, x: number): number {
  return a * (x - h) * (x - h) + k
}

/**
 * Parabola yang melewati puncak `(h, k)` DAN satu titik lain.
 *
 * Ini cara ketiga di daftar buku halaman cetak 187, dan yang dipakai widget
 * "susun parabola". Mengembalikan null kalau titik keduanya tepat di atas
 * puncak, karena kalau absisnya sama maka `a` tidak bisa ditentukan.
 */
export function lewatPuncakDanTitik(
  h: number, k: number, x: number, y: number,
): BentukPuncak | null {
  const beda = x - h
  if (Math.abs(beda) < 1e-9) return null
  return { a: (y - k) / (beda * beda), h, k }
}

/* ------------------------------------------------------------------ */
/* Menuliskan rumusnya supaya terbaca siswa                            */
/* ------------------------------------------------------------------ */

const n = (x: number, d = 2) => angka(x, d)

/**
 * Rangkai suku-suku menjadi satu baris rumus.
 *
 * Yang dijaga di sini justru hal-hal kecil yang membuat rumus terasa ditulis
 * mesin: koefisien 1 tidak ditulis (`x^2`, bukan `1x^2`), suku bernilai nol
 * dibuang, dan tanda minus menyatu dengan tanda operasinya (`- 3`, bukan
 * `+ -3`).
 */
function gabungSuku(bagian: Array<{ koef: number; lambang: string }>): string {
  let hasil = ''
  for (const { koef, lambang } of bagian) {
    if (koef === 0) continue
    const besar = Math.abs(koef)
    const teksAngka = besar === 1 && lambang !== '' ? '' : n(besar)
    if (hasil === '') {
      hasil = `${koef < 0 ? '-' : ''}${teksAngka}${lambang}`
    } else {
      hasil += ` ${koef < 0 ? '-' : '+'} ${teksAngka}${lambang}`
    }
  }
  return hasil === '' ? '0' : hasil
}

/** Koefisien di depan kurung: 1 dan -1 tidak ditulis angkanya. */
function depanKurung(a: number): string {
  return a === 1 ? '' : a === -1 ? '-' : n(a)
}

/** Isi kurung `x - h`, dengan tanda yang sudah dirapikan. */
function isiKurung(h: number): string {
  if (h === 0) return 'x'
  return `x ${h > 0 ? '-' : '+'} ${n(Math.abs(h))}`
}

export function tulisUmum({ a, b, c }: BentukUmum): string {
  return `y = ${gabungSuku([
    { koef: a, lambang: 'x²' },
    { koef: b, lambang: 'x' },
    { koef: c, lambang: '' },
  ])}`
}

export function tulisPuncak({ a, h, k }: BentukPuncak): string {
  const kurung = h === 0 ? 'x²' : `(${isiKurung(h)})²`
  const ekor = k === 0 ? '' : ` ${k > 0 ? '+' : '-'} ${n(Math.abs(k))}`
  return `y = ${depanKurung(a)}${kurung}${ekor}`
}

/**
 * Bentuk faktor. Hanya ada kalau grafiknya benar-benar memotong sumbu x, jadi
 * pemanggilnya harus siap menerima null dan menampilkan keterangan, bukan
 * menampilkan rumus kosong.
 */
export function tulisFaktor(u: BentukUmum): string | null {
  const a = akar(u)
  if (a.length === 0) return null
  const [p, q] = a.length === 1 ? [a[0], a[0]] : a
  return `y = ${depanKurung(u.a)}(${isiKurung(p)})(${isiKurung(q)})`
}

/** Koordinat titik, ditulis seperti di buku: `(2, 8)`. */
export function tulisTitik(x: number, y: number, d = 2): string {
  return `(${n(x, d)}, ${n(y, d)})`
}
