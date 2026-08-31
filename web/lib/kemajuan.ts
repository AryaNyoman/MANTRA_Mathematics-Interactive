'use client'

import { baca, tulis } from '@/lib/simpanan'

/**
 * Pencatat kemajuan membaca, dipakai untuk membuka kunci kuis.
 *
 * SYARATNYA (permintaan ARYA, 1 Sep 2026):
 *   1. kesepuluh materi pernah dibuka, DAN
 *   2. total waktu membaca mencapai 10 menit.
 *
 * Syarat itu SENGAJA tidak diumumkan ke siswa. Yang tampil hanya ajakan halus
 * untuk menyelesaikan materinya dulu. Alasannya: kalau angkanya disebut,
 * siswa akan mengejar angka itu, bukan membaca.
 *
 * INI BUKAN PENGAMANAN, dan tidak boleh diperlakukan begitu. Catatannya ada di
 * peramban siswa sendiri dan bisa dihapus siapa pun yang mau. Tujuannya
 * mendorong kebiasaan membaca sebelum menguji diri, bukan mencegah kecurangan.
 * Skor kuis di sini tidak sah sebagai penilaian.
 *
 * Waktu hanya bertambah selama tab benar-benar terlihat dan materi sedang
 * dibuka, sehingga meninggalkan halaman semalaman tidak dihitung sebagai
 * membaca.
 */

const KUNCI = 'matra:kemajuan:'
export const MENIT_MINIMUM = 10
const DETIK_MINIMUM = MENIT_MINIMUM * 60

export type Kemajuan = {
  /** slug materi yang pernah dibuka */
  dibuka: string[]
  /** total detik membaca, hanya dihitung saat tab terlihat */
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

export function catatDibuka(topik: string, slug: string): void {
  const k = bacaKemajuan(topik)
  if (k.dibuka.includes(slug)) return
  tulis(KUNCI + topik, JSON.stringify({ ...k, dibuka: [...k.dibuka, slug] }))
}

export function tambahDetik(topik: string, detik: number): void {
  const k = bacaKemajuan(topik)
  tulis(KUNCI + topik, JSON.stringify({ ...k, detik: k.detik + detik }))
}

/** Kuis terbuka kalau kedua syarat terpenuhi. */
export function kuisTerbuka(k: Kemajuan, jumlahMateri: number): boolean {
  return k.dibuka.length >= jumlahMateri && k.detik >= DETIK_MINIMUM
}

/**
 * Ajakan yang ditampilkan saat kuis masih terkunci.
 *
 * Sengaja tidak menyebut berapa materi lagi atau berapa menit lagi: yang perlu
 * diketahui siswa hanyalah bahwa membaca dulu itu bagian dari alurnya. Tetapi
 * juga tidak boleh diam sama sekali, karena tombol mati tanpa keterangan akan
 * dikira situsnya rusak.
 */
export function ajakan(): string {
  return 'Selesaikan dulu materinya, kuis terbuka setelah itu'
}
