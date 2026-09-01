import type { ReactNode } from 'react'

/**
 * Perjanjian antara panggung Statistika dan tiap widgetnya.
 *
 * KENAPA TIAP WIDGET MEMEGANG KEADAANNYA SENDIRI
 * Panggung Limit memegang keadaan kesembilan widgetnya sekaligus, dan berkasnya
 * jadi lima ratus baris. Topik ini punya tiga belas widget, dan beberapa di
 * antaranya memegang seluruh kumpulan data yang bisa diseret, bukan sekadar
 * satu angka penggeser. Ditumpuk di satu berkas, panggungnya akan jadi berkas
 * terbesar di seluruh situs dan paling sulit disunting.
 *
 * Jadi tiap widget di topik ini memegang keadaannya sendiri, lalu menyerahkan
 * dua potongan yang sudah jadi lewat `children`: alatnya untuk kolom kiri, dan
 * tabel angka hidupnya untuk kolom kanan. Panggung tinggal memilih widget mana
 * yang dipasang.
 *
 * KONSEKUENSINYA, DAN KENAPA ITU DITERIMA
 * Keadaan widget hilang saat siswa berpindah tahap lalu kembali, sebab
 * komponennya dilepas dari halaman. Untuk topik ini itu justru lebih baik:
 * tiap widget berangkat dari kumpulan data tertentu yang disebut namanya di
 * penjelasan sebelah kanan. Kembali ke contoh yang bersih lebih berguna
 * daripada kembali ke data yang sudah diacak sendiri sepuluh menit sebelumnya
 * dan tidak lagi cocok dengan teksnya.
 */
export type IsiWidget = {
  /** alat interaktif dan panel kendalinya, untuk kolom kiri */
  kiri: ReactNode
  /** tabel angka hidup, untuk kolom kanan di bawah penjelasan */
  kanan: ReactNode
}

export type PropWidget = {
  children: (isi: IsiWidget) => ReactNode
}
