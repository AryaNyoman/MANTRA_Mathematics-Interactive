'use client'

import { baca, tulis } from '@/lib/simpanan'

/**
 * Pencatat kemajuan membaca, dipakai untuk membuka kunci kuis dan mengisi
 * centang hijau di daftar materi.
 *
 * SYARATNYA (ARYA 21 Sep 2026, menggantikan aturan 1 Sep "semua materi
 * pernah dibuka dan total 10 menit"):
 *   setiap materi harus DIBACA 2 MENIT TANPA PUTUS. Pencatat waktunya ada di
 *   halaman belajar (HalamanTopik): mulai dari 0 saat materi dibuka, hanya
 *   berjalan selama tab terlihat (berpindah tab = jeda, bukan hangus), dan
 *   hangus kembali ke 0 kalau siswa meninggalkan materinya (pindah materi,
 *   ke Latihan atau Kuis, menutup atau memuat ulang halaman) sebelum 2
 *   menit. Tepat di 2 menit slug materinya dicatat ke `dibuka`.
 *   Kuis terbuka saat SEMUA materi bab tercatat; tidak ada lagi syarat
 *   menit total. Mode guru (lib/mode-guru.ts) membuka kuis tanpa syarat.
 *
 * Nama medan `dibuka` dipertahankan walau artinya kini "selesai dibaca 2
 * menit": kunci dan bentuk simpanannya tidak berubah, jadi centang yang
 * sudah tersimpan siswa dari aturan lama tetap berlaku (keputusan ARYA 21
 * Sep: data lama dibiarkan). `detik` = total detik membaca bab, tetap
 * dihitung sebagai catatan, tidak lagi menjadi syarat.
 *
 * INI BUKAN PENGAMANAN, dan tidak boleh diperlakukan begitu. Catatannya ada di
 * peramban siswa sendiri dan bisa dihapus siapa pun yang mau. Tujuannya
 * mendorong kebiasaan membaca sebelum menguji diri, bukan mencegah kecurangan.
 * Skor kuis di sini tidak sah sebagai penilaian.
 */

const KUNCI = 'matra:kemajuan:'
/** lama membaca tanpa putus yang dituntut dari tiap materi */
export const MENIT_BACA = 2
export const DETIK_BACA = MENIT_BACA * 60

export type Kemajuan = {
  /** slug materi yang sudah selesai dibaca (2 menit tanpa putus) */
  dibuka: string[]
  /** total detik membaca, hanya dihitung saat tab terlihat; catatan saja */
  detik: number
}

const KOSONG: Kemajuan = { dibuka: [], detik: 0 }

export function bacaKemajuan(topik: string): Kemajuan {
  try {
    const mentah = baca(KUNCI + topik)
    if (!mentah) return KOSONG
    const d = JSON.parse(mentah) as Partial<Kemajuan>
    return {
      dibuka: Array.isArray(d.dibuka) ? d.dibuka.filter((x) => typeof x === 'string') : [],
      detik: typeof d.detik === 'number' && Number.isFinite(d.detik) ? d.detik : 0,
    }
  } catch {
    // Catatan rusak diperlakukan seperti belum ada. Menggagalkan halaman
    // karena satu baris JSON cacat jelas lebih buruk daripada memulai ulang.
    return KOSONG
  }
}

/** Mencatat materi selesai dibaca. Dipanggil HalamanTopik tepat di 2 menit. */
export function catatDibuka(topik: string, slug: string): void {
  const k = bacaKemajuan(topik)
  if (k.dibuka.includes(slug)) return
  tulis(KUNCI + topik, JSON.stringify({ ...k, dibuka: [...k.dibuka, slug] }))
}

export function tambahDetik(topik: string, detik: number): void {
  const k = bacaKemajuan(topik)
  tulis(KUNCI + topik, JSON.stringify({ ...k, detik: k.detik + detik }))
}

/** Kuis terbuka kalau setiap materi bab (yang sudah dibangun) selesai dibaca. */
export function kuisTerbuka(k: Kemajuan, slugMateri: string[]): boolean {
  if (slugMateri.length === 0) return false
  const sudah = new Set(k.dibuka)
  return slugMateri.every((s) => sudah.has(s))
}

/**
 * Ajakan yang ditampilkan saat kuis masih terkunci.
 *
 * Sengaja tidak menyebut berapa materi lagi: yang perlu diketahui siswa
 * hanyalah bahwa membaca dulu itu bagian dari alurnya. Tetapi juga tidak
 * boleh diam sama sekali, karena tombol mati tanpa keterangan akan dikira
 * situsnya rusak.
 */
export function ajakan(): string {
  return 'Selesaikan dulu materinya, kuis terbuka setelah itu'
}
