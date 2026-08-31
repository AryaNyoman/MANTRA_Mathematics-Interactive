/**
 * Daftar 6 topik MATRA.
 *
 * Label kelas dicantumkan JUJUR. Limit dan Ruang 3D memang materi Kelas 12,
 * bukan Kelas 10-11 — itu ditampilkan apa adanya, bukan disamarkan.
 * Rujukan: Buku Panduan Guru Matematika Kelas X & XI (Kurikulum Merdeka).
 */

export type Topik = {
  slug: string
  nama: string
  kelas: string
  kode: string
  /** pertanyaan yang dijawab topik ini — dipakai sebagai subjudul */
  pertanyaan: string
  /** salah paham yang dilawan, satu kalimat pendek untuk kartu beranda */
  miskonsepsiSingkat: string
  unggulan: boolean
  /** true kalau halaman isinya sudah dibangun */
  siap: boolean
}

export const TOPIK: Topik[] = [
  {
    slug: 'trigonometri',
    nama: 'Perbandingan Trigonometri',
    kelas: 'Kelas 10 · Bab 4',
    kode: 'TRIG-10-B4',
    pertanyaan: 'Kenapa sudut yang sama selalu memberi angka yang sama?',
    miskonsepsiSingkat: '“tan 37° itu angka mati dari kalkulator.”',
    unggulan: true,
    siap: true,
  },
  {
    slug: 'limit',
    nama: 'Limit',
    kelas: 'Kelas 12',
    kode: 'LIM-12',
    pertanyaan: 'Apa artinya “mendekati” kalau tidak pernah sampai?',
    miskonsepsiSingkat: '“limit itu ya nilai fungsi di titik itu.”',
    unggulan: true,
    siap: false,
  },
  {
    slug: 'grafik-fungsi',
    nama: 'Grafik Fungsi',
    kelas: 'Kelas 10 · Bab 6 · Kelas 11 · Bab 1',
    kode: 'FUNG-10-B6',
    pertanyaan: 'Kenapa bentuk grafik berubah saat satu angka digeser?',
    miskonsepsiSingkat: '“setiap grafik pasti sebuah fungsi.”',
    unggulan: false,
    siap: false,
  },
  {
    slug: 'vektor',
    nama: 'Vektor dan Operasinya',
    kelas: 'Kelas 10 · Bab 3',
    kode: 'VEK-10-B3',
    pertanyaan: 'Kenapa dua panah bisa dijumlahkan?',
    miskonsepsiSingkat: '“vektor itu cuma panah biasa.”',
    unggulan: false,
    siap: false,
  },
  {
    slug: 'ruang-3d',
    nama: 'Ruang Tiga Dimensi',
    kelas: 'Kelas 12',
    kode: 'DIM3-12',
    pertanyaan: 'Kenapa yang terlihat berpotongan belum tentu berpotongan?',
    miskonsepsiSingkat: 'intuisi datar dipakai di ruang.',
    unggulan: false,
    siap: false,
  },
  {
    slug: 'statistika',
    nama: 'Statistika',
    kelas: 'Kelas 10 · Bab 7 · Kelas 11 · Bab 3',
    kode: 'STAT-10-B7',
    pertanyaan: 'Kenapa satu data bisa mengubah kesimpulan?',
    miskonsepsiSingkat: '“rata-rata dan median sama saja.”',
    unggulan: false,
    siap: false,
  },
]

export const cariTopik = (slug: string) => TOPIK.find((t) => t.slug === slug)
