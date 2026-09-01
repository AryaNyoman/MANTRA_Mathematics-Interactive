import type { Kanal, Soal } from '@/content/tipe'

/**
 * Latihan terbimbing topik Vektor.
 *
 * MASIH KOSONG DENGAN SENGAJA. Soal baru boleh ditulis setelah dua hal beres:
 * pemeriksa `alat/cek_vektor.py` sudah ada dan terbukti menolak jawaban salah,
 * dan tingkat kesulitannya sudah disandingkan dengan Latihan 3.1 sampai 3.6 di
 * Buku Guru Kelas 10. Urutan itu ditempuh karena soal buatan sendiri cenderung
 * terlalu mudah, dan itu temuan ARYA, bukan dugaan.
 *
 * Diisi pada Tugas 7 di docs/superpowers/plans/2026-09-01-topik-vektor.md.
 */
export const LATIHAN: Soal[] = []

/* ------------------------------------------------------------------ */
/* Kanal YouTube berbahasa Indonesia untuk belajar lebih dalam.        */
/* Kami menautkan KANAL-nya, bukan video tertentu, supaya tautannya    */
/* tidak mati saat video dihapus atau diganti pemiliknya.              */
/* ------------------------------------------------------------------ */

export const KANAL: Kanal[] = [
  {
    nama: 'm4th-lab',
    handle: '@m4thlab',
    url: 'https://www.youtube.com/@m4thlab',
    cari: 'vektor dan operasinya kelas 10',
  },
  {
    nama: 'Belajar Matematika SMA',
    handle: '@TrieRush',
    url: 'https://www.youtube.com/@TrieRush',
    cari: 'penjumlahan vektor metode jajar genjang',
  },
  {
    nama: 'Bimbel SMARRT',
    handle: '@BimbelSMARRT',
    url: 'https://www.youtube.com/@BimbelSMARRT',
    cari: 'komponen vektor dan vektor satuan',
  },
  {
    nama: 'Ajar Pipolondo',
    handle: '@AjarPipolondo',
    url: 'https://www.youtube.com/@AjarPipolondo',
    cari: 'soal vektor perkalian skalar',
  },
]
