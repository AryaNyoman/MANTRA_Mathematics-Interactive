/**
 * Daftar 9 topik MANTRA (7 tayang, Turunan dan Integral sedang dibangun).
 *
 * Topik ketujuh, Transformasi Geometri, ditambahkan ARYA 3 September 2026.
 *
 * Label kelas dicantumkan JUJUR dan SEDERHANA. Permintaan ARYA 1 Sep 2026:
 * cukup kelasnya saja, tanpa nomor bab dan tanpa menyebut kurikulum, karena
 * siswa mencari "kelas berapa", bukan "bab berapa". Urutannya juga dimulai
 * dari kelas 10 supaya alurnya terasa naik.
 *
 * Label "unggulan" dibuang: itu prioritas kerja internal, bukan informasi
 * yang berguna bagi siswa.
 */

export type Topik = {
  slug: string
  nama: string
  /** hanya kelas, contoh "Kelas 10". Tanpa bab, tanpa nama kurikulum. */
  kelas: string
  /** dipakai untuk mengurutkan kartu: 10, 11, 12 */
  urutanKelas: number
  /** pertanyaan yang dijawab topik ini, dipakai sebagai subjudul */
  pertanyaan: string
  /** salah paham yang dilawan, satu kalimat pendek untuk kartu beranda */
  miskonsepsiSingkat: string
  /** true kalau halaman isinya sudah dibangun */
  siap: boolean
}

const DAFTAR: Topik[] = [
  {
    slug: 'trigonometri',
    nama: 'Perbandingan Trigonometri',
    kelas: 'Kelas 10',
    urutanKelas: 10,
    pertanyaan: 'Kenapa sudut yang sama selalu memberi angka yang sama?',
    miskonsepsiSingkat: '“tan 37° itu angka mati dari kalkulator.”',
    siap: true,
  },
  {
    slug: 'vektor',
    nama: 'Vektor dan Operasinya',
    kelas: 'Kelas 10',
    urutanKelas: 10,
    pertanyaan: 'Kenapa dua panah bisa dijumlahkan?',
    miskonsepsiSingkat: '“vektor itu cuma panah biasa.”',
    siap: true,
  },
  {
    slug: 'grafik-fungsi',
    nama: 'Grafik Fungsi',
    kelas: 'Kelas 10 dan 11',
    urutanKelas: 10,
    pertanyaan: 'Kenapa bentuk grafik berubah saat satu angka digeser?',
    miskonsepsiSingkat: '“setiap grafik pasti sebuah fungsi.”',
    siap: true,
  },
  {
    slug: 'statistika',
    nama: 'Statistika',
    kelas: 'Kelas 10 dan 11',
    urutanKelas: 10,
    pertanyaan: 'Kenapa satu data bisa mengubah kesimpulan?',
    miskonsepsiSingkat: '“rata-rata dan median sama saja.”',
    siap: true,
  },
  {
    slug: 'limit',
    nama: 'Limit',
    kelas: 'Kelas 12',
    urutanKelas: 12,
    pertanyaan: 'Apa artinya “mendekati” kalau tidak pernah sampai?',
    miskonsepsiSingkat: '“limit itu ya nilai fungsi di titik itu.”',
    siap: true,
  },
  {
    slug: 'ruang-3d',
    nama: 'Ruang Tiga Dimensi',
    kelas: 'Kelas 12',
    urutanKelas: 12,
    pertanyaan: 'Kenapa yang terlihat berpotongan belum tentu berpotongan?',
    miskonsepsiSingkat: 'intuisi datar dipakai di ruang.',
    siap: true,
  },
  {
    // Topik ketujuh, ditambahkan ARYA 3 September 2026.
    //
    // KENAPA LABELNYA CUKUP "KELAS 11"
    // Materi ini ada di Matematika Tingkat Lanjut Kelas XI, bukan Matematika
    // wajib. Buku wajib Kelas XI hanya memuat Komposisi Fungsi, Lingkaran, dan
    // Statistika. Keterangan itu TIDAK ditulis di sini, mengikuti permintaan
    // ARYA di kepala berkas ini: label kelas berisi kelasnya saja, tanpa nomor
    // bab dan tanpa nama kurikulum, sebab siswa mencari "kelas berapa".
    // Keterangan kurikulumnya ada di badan teks Materi 01, sebagaimana
    // diwajibkan STANDAR-MENGAJAR.md pada kompetensi "Jujur".
    slug: 'transformasi-geometri',
    nama: 'Transformasi Geometri',
    kelas: 'Kelas 11',
    urutanKelas: 11,
    pertanyaan: 'Kenapa bayangan di kaca dan stiker yang digeser itu matematika yang sama?',
    miskonsepsiSingkat: '“yang dipindah kan gambarnya, bukan titiknya.”',
    // Dinyalakan 4 September 2026, setelah ketiga belas materinya lengkap dan
    // seluruh gerbangnya lolos: uji matematika (alat/uji-matriks-transformasi.mts),
    // pemeriksa angka (alat/cek_transformasi.py, 99 klaim), daftar periksa
    // mengajar (alat/periksa_tahap.py transformasi-geometri), tsc, build, dan
    // pemeriksaan visual tiap materi satu per satu lewat Playwright.
    //
    // Selama pengerjaan berkas ini sengaja dibiarkan false, supaya penggabungan
    // cabang ini ke master di tengah kerja tidak menayangkan topik setengah jadi.
    siap: true,
  },
  {
    // Topik kedelapan, disetujui ARYA 5 Sep 2026; kerangka dari MATRA-MASTER,
    // isi oleh sesi MANTRA-TURUNAN-INTEGRAL. Sumbernya Matematika Tingkat
    // Lanjut Kelas XII Bab 2. Label kelasnya cukup "Kelas 12" (aturan di
    // kepala berkas ini).
    //
    // Dibiarkan `siap: false` SELAMA pengerjaan, supaya penggabungan cabang
    // ke master di tengah kerja tidak menayangkan topik setengah jadi.
    // Dinyalakan sesi saat seluruh gerbangnya lolos (lihat file tugasnya).
    slug: 'turunan',
    nama: 'Turunan',
    kelas: 'Kelas 12',
    urutanKelas: 12,
    pertanyaan: 'Kenapa kemiringan sebuah kurva bisa dihitung, padahal kurva tidak lurus?',
    miskonsepsiSingkat: '“turunan itu rumus pangkat: turunkan pangkatnya, kalikan ke depan.”',
    siap: true,
  },
  {
    // Topik kesembilan, pasangan Turunan; sumbernya Bab 3 buku yang sama.
    // Dikerjakan SETELAH Turunan oleh sesi yang sama. `siap: false` sampai
    // lolos gerbang.
    slug: 'integral',
    nama: 'Integral',
    kelas: 'Kelas 12',
    urutanKelas: 12,
    pertanyaan: 'Kenapa luas di bawah kurva dan kebalikan turunan ternyata satu hal?',
    miskonsepsiSingkat: '“integral itu cuma menaikkan pangkat, kebalikan turunan.”',
    siap: true,
  },
]

/** Kelas kecil lebih dulu; yang sudah siap naik ke atas dalam kelas yang sama. */
export const TOPIK: Topik[] = [...DAFTAR].sort(
  (a, b) => a.urutanKelas - b.urutanKelas || Number(b.siap) - Number(a.siap),
)

export const cariTopik = (slug: string) => TOPIK.find((t) => t.slug === slug)
