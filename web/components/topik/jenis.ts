import type { ComponentType, ReactNode } from 'react'
import type { Kanal, Soal, SoalKuis, Tahap } from '@/content/tipe'

/**
 * Perjanjian antara rangka halaman topik dan isi tiap topik.
 *
 * Dipisah ke berkas sendiri supaya `daftar-isi.ts` dan `HalamanTopik.tsx` bisa
 * saling menyebut tanpa membentuk lingkaran impor.
 *
 * KENAPA PANGGUNG MENGEMBALIKAN DUA BAGIAN
 * Bagian khusus topik muncul di DUA tempat pada tata letak satu layar: alat
 * interaktifnya di kolom kiri, dan tabel angka hidupnya di kolom kanan di bawah
 * penjelasan. Keduanya membaca keadaan yang sama (sudut yang sedang digeser,
 * misalnya), jadi keadaan itu harus dipegang satu komponen.
 *
 * Karena itu panggung dibuat MEMBUNGKUS tata letak, lalu menyerahkan kedua
 * bagian yang sudah jadi lewat `children`. Cara lain, dua komponen terpisah,
 * akan memaksa keadaan widget disalin atau dititipkan lewat context, dan
 * keduanya lebih rumit tanpa keuntungan.
 */

/** Potongan yang disiapkan panggung untuk ditaruh rangka pada tempatnya. */
export type BagianPanggung = {
  /** alat interaktif dan panel kendalinya, untuk kolom kiri */
  kiri: ReactNode
  /** tabel angka hidup, untuk kolom kanan di bawah penjelasan */
  kanan: ReactNode
  /** label kecil di atas panggung, misalnya INTERAKTIF atau CONTOH NYATA */
  tanda: string
}

export type PropPanggung = {
  tahap: Tahap | undefined
  /** false berarti siswa sedang menonton animasi, jadi widget disembunyikan */
  tampilWidget: boolean
  children: (bagian: BagianPanggung) => ReactNode
}

export type IsiTopik = {
  tahap: Tahap[]
  latihan: Soal[]
  kuis: SoalKuis[]
  kanal: Kanal[]
  Panggung: ComponentType<PropPanggung>
}
