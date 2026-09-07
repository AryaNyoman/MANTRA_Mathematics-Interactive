import { WARNA } from '@/lib/warna'

/**
 * Alat gambar bersama untuk kesebelas widget Turunan.
 *
 * ASAL BERKAS INI
 * Isinya berasal dari `components/widget/grafik-fungsi/koordinat.ts`, yang
 * sendirinya disalin dari `widget/limit/`. Disalin lagi, bukan diimpor, karena
 * kedua berkas itu berada di wilayah sesi lain dan aturan proyek melarang
 * menyunting wilayah sesi lain. Duplikasi ini disengaja dan sudah dicatat di
 * laporan sesi supaya MASTER bisa menyatukannya sekali untuk semua topik
 * setelah penggabungan.
 *
 * YANG TIDAK IKUT DISALIN: `jalurParametrik` (Turunan tidak menggambar bentuk
 * yang bukan fungsi) dan `petak` lama yang sudah digantikan `petakSumbu`.
 *
 * TAMBAHAN yang khas topik ini:
 *   `jalurGaris`     ruas garis lurus dari sebuah titik dengan kemiringan
 *                    tertentu, dipotong pada tepi jendela. Hampir tiap widget
 *                    Turunan menggambar garis potong atau garis singgung, dan
 *                    menghitung ujungnya sendiri di sebelas tempat adalah cara
 *                    paling pasti untuk membuat sebelas kesalahan berbeda.
 *   `beda`           kemiringan garis potong antara dua titik pada kurva.
 *   `turunanNumerik` kemiringan hampiran, untuk kurva yang rumus turunannya
 *                    belum boleh disebut di materi bersangkutan.
 */

/** Ukuran bidang gambar SVG. Sama untuk semua widget topik ini supaya seragam. */
export const VW = 460
export const VH = 320

/**
 * Ruang tepi bidang gambar.
 *
 * `atas` dan `bawah` sengaja lebar. Keterangan TIDAK PERNAH digambar di dalam
 * kotak grafik; ia punya pita sendiri di atas dan di bawah kotak yang
 * disediakan `Bidang`. Dengan begitu tulisan tidak mungkin menabrak kurva,
 * bukan sekadar diperbaiki satu per satu setelah terlihat di potret.
 */
export const TEPI = { kiri: 44, kanan: 18, atas: 52, bawah: 42 }

/** Batas panjang satu baris keterangan, dalam huruf. Lihat Bidang. */
export const MAKS_HURUF_CATATAN = 60

export const KOTAK = {
  x0: TEPI.kiri,
  y0: TEPI.atas,
  x1: VW - TEPI.kanan,
  y1: VH - TEPI.bawah,
}

export type Jendela = { xMin: number; xMax: number; yMin: number; yMax: number }

/** Jendela yang ditulis langsung. Sekadar supaya niatnya terbaca di widget. */
export function jendelaTetap(xMin: number, xMax: number, yMin: number, yMax: number): Jendela {
  return { xMin, xMax, yMin, yMax }
}

/** Ubah koordinat matematika menjadi koordinat layar SVG. */
export function keLayar(j: Jendela) {
  const lebar = KOTAK.x1 - KOTAK.x0
  const tinggi = KOTAK.y1 - KOTAK.y0
  return {
    x: (x: number) => KOTAK.x0 + ((x - j.xMin) / (j.xMax - j.xMin)) * lebar,
    /** sumbu y layar terbalik: nilai besar ada di ATAS */
    y: (y: number) => KOTAK.y1 - ((y - j.yMin) / (j.yMax - j.yMin)) * tinggi,
  }
}

/** Kebalikan `keLayar`, dibutuhkan widget yang titiknya bisa diseret. */
export function keMatematika(j: Jendela) {
  const lebar = KOTAK.x1 - KOTAK.x0
  const tinggi = KOTAK.y1 - KOTAK.y0
  return {
    x: (px: number) => j.xMin + ((px - KOTAK.x0) / lebar) * (j.xMax - j.xMin),
    y: (py: number) => j.yMin + ((KOTAK.y1 - py) / tinggi) * (j.yMax - j.yMin),
  }
}

/** Angka Indonesia: koma sebagai pemisah desimal, nol di belakang dibuang. */
export function angka(n: number, desimal = 2): string {
  if (!Number.isFinite(n)) return n > 0 ? 'tak hingga' : 'minus tak hingga'
  const s = n.toFixed(desimal)
  const rapi = s.includes('.') ? s.replace(/0+$/, '').replace(/\.$/, '') : s
  return (rapi === '-0' ? '0' : rapi).replace('.', ',')
}

/**
 * Penunjuk skala, wajib pada widget yang bisa berubah tampilan, supaya siswa
 * tahu ia sedang mengintip sedekat apa.
 */
export function labelSkala(j: Jendela): string {
  const lebar = j.xMax - j.xMin
  const desimal = lebar < 0.01 ? 5 : lebar < 0.1 ? 4 : lebar < 1 ? 3 : 2
  return `lebar tampilan ${angka(lebar, desimal)} satuan`
}

/**
 * Jalur SVG untuk sebuah fungsi.
 *
 * Jalurnya DIPUTUS di tempat fungsinya meledak atau tidak terdefinisi, supaya
 * asimtot tegak tidak digambar sebagai garis miring raksasa yang menyeberangi
 * layar.
 */
export function jalurFungsi(
  f: (x: number) => number,
  j: Jendela,
  langkah = 400,
  dari?: number,
  sampai?: number,
): string {
  const p = keLayar(j)
  const x0 = dari ?? j.xMin
  const x1 = sampai ?? j.xMax
  const potongan: string[] = []
  let menyambung = false

  for (let i = 0; i <= langkah; i++) {
    const x = x0 + ((x1 - x0) * i) / langkah
    const y = f(x)
    if (!Number.isFinite(y) || y < j.yMin - (j.yMax - j.yMin) || y > j.yMax + (j.yMax - j.yMin)) {
      menyambung = false
      continue
    }
    potongan.push(`${menyambung ? 'L' : 'M'} ${p.x(x).toFixed(2)} ${p.y(y).toFixed(2)}`)
    menyambung = true
  }
  return potongan.join(' ')
}

/**
 * Ruas garis lurus melalui (x0, y0) dengan kemiringan m, dipotong pada tepi
 * KIRI dan KANAN jendela.
 *
 * Sengaja tidak dipotong di atas dan bawah: pemotong SVG di `Bidang` sudah
 * mengurusnya, dan memotong dua kali membuat garis yang sangat curam berhenti
 * di tempat yang tidak jelas alasannya.
 */
export function jalurGaris(x0: number, y0: number, m: number, j: Jendela): string {
  if (!Number.isFinite(m) || !Number.isFinite(y0)) return ''
  const p = keLayar(j)
  const kiriY = y0 + m * (j.xMin - x0)
  const kananY = y0 + m * (j.xMax - x0)
  return `M ${p.x(j.xMin).toFixed(2)} ${p.y(kiriY).toFixed(2)} L ${p.x(j.xMax).toFixed(2)} ${p.y(kananY).toFixed(2)}`
}

/** Kemiringan garis potong antara dua titik pada kurva f. */
export function beda(f: (x: number) => number, x: number, h: number): number {
  if (h === 0) return NaN
  return (f(x + h) - f(x)) / h
}

/**
 * Kemiringan hampiran di satu titik, dihitung dari dua sisi.
 *
 * Dipakai widget yang materinya BELUM boleh menyebut rumus turunannya, dan
 * widget yang fungsinya dipilih siswa saat itu juga. Beda tengah dipakai karena
 * galatnya jauh lebih kecil daripada beda satu sisi pada langkah yang sama,
 * sehingga kurva jejaknya tidak bergelombang.
 */
export function turunanNumerik(f: (x: number) => number, x: number, h = 1e-4): number {
  return (f(x + h) - f(x - h)) / (2 * h)
}

/** Warna yang dipakai bersama, supaya kaitannya dengan video dan topik lain utuh. */
export const GARIS_PETAK = '#D6CDBC'
export const GARIS_SUMBU = '#C9BFAE'
export const MONO = 'var(--font-mono), sans-serif'
export { WARNA }
