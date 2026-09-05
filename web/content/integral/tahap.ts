/**
 * Integral, 11 tahap belajar. Topik kesembilan MANTRA.
 *
 * Rancangannya: docs/superpowers/specs/2026-09-06-integral-alur-belajar.md
 * Kerangka ini dibuat MATRA-MASTER 6 Sep 2026; isinya diisi sesi
 * MANTRA-TURUNAN-INTEGRAL SETELAH Turunan selesai. Tiap materi yang selesai
 * dan lolos gerbang dinyalakan dengan `siap: true`, satu per satu.
 *
 * SUMBER MATERI
 * Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi), 2025.
 * Kementerian Pendidikan Dasar dan Menengah. Bab 3 "Integral", halaman cetak
 * 159 sampai 219 (berkas LIMIT.pdf, halaman PDF = cetak + 16). Contoh dan
 * angkanya ditulis sendiri, urutan konsep dan definisinya mengikuti buku.
 * Materi 10 (luas antara dua kurva) di luar bab buku, ditambahkan karena lazim
 * di ujian SMA; dinyatakan begitu di bacaannya. Volume benda putar TIDAK
 * masuk (keputusan ARYA 5 Sep 2026).
 *
 * KENAPA LUAS DULU, RUMUS BELAKANGAN
 * Salah paham yang dilawan: "integral itu cuma menaikkan pangkat". Buku sendiri
 * membuka dengan luas di bawah kurva pengeluaran sebelum menyebut antiturunan,
 * dan urutan itu dijaga: dari laju ke jumlah, membalik turunan, luas dari
 * persegi panjang, lalu Teorema Dasar Kalkulus yang menyatukan keduanya.
 *
 * SELURUH ANGKA DI BERKAS INI WAJIB DIPERIKSA MESIN dengan sympy lewat
 * `python alat/cek_soal.py alat/materi-integral.json` sebelum materi
 * dinyatakan siap.
 */

export type WidgetIntegral =
  | 'mesin-balik'
  | 'naik-pangkat'
  | 'cocokkan-lapisan'
  | 'pasangkan-turunan-integral'
  | 'persegi-panjang-menumpuk'
  | 'pecah-selang'
  | 'luas-yang-tumbuh'
  | 'hitung-bertahap'
  | 'luas-dua-daerah'
  | 'dua-kurva'
  | 'dunia-nyata-integral'

import type { Tahap } from '@/content/tipe'

/** Nama widget diketatkan ke senarai di atas: salah ketik ditolak TypeScript. */
type TahapIntegral = Omit<Tahap, 'widget'> & { widget?: WidgetIntegral }

/*
 * Blok penjelasan tiap materi masih RINTISAN. Sesi mengisinya sesuai rancangan
 * dan WAJIB mempertahankan blok `coba` di tiap materi berwidget.
 */
export const TAHAP: TahapIntegral[] = [
  /* ================================================================= */
  {
    no: 1,
    slug: 'membalik-turunan',
    judul: 'Dari laju ke jumlah, membalik turunan',
    labelPendek: 'Kenapa',
    pertanyaan: 'Pengeluaran naik dengan laju 2x + 1 juta per bulan pada bulan ke-x. Berapa totalnya setahun, kalau yang diketahui cuma lajunya?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 01: dua jalan (luas di bawah kurva laju, dan fungsi yang turunannya 2x + 1), Definisi 3.1 antiturunan, arti C.' },
      { jenis: 'coba', teks: 'Geser C, dan lihat semua kurva punya kemiringan yang sama di tiap x. Itulah sebabnya turunannya tidak berubah.' },
    ],
    widget: 'mesin-balik',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 2,
    slug: 'tanda-integral',
    judul: 'Tanda integral dan aturan pangkatnya',
    labelPendek: 'Notasi',
    pertanyaan: 'Bagaimana menuliskan "semua antiturunan f" dengan satu lambang, dan apa aturan cepatnya?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 02: ∫ f(x) dx = F(x) + C, Sifat 3.1 sampai 3.5, tiap sifat diperiksa dengan menurunkan hasilnya.' },
      { jenis: 'coba', teks: 'Pilih n = −1, dan mesinnya menolak: pangkat naik jadi 0, pembaginya nol.' },
    ],
    widget: 'naik-pangkat',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 3,
    slug: 'substitusi',
    judul: 'Substitusi, melihat lapisan',
    labelPendek: 'Substitusi',
    pertanyaan: 'Bagaimana mengintegralkan (2x + 1)⁵ tanpa menguraikannya?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 03: Sifat 3.6, aturan rantai dibaca terbalik, u dan du, tiga contoh.' },
      { jenis: 'coba', teks: 'Coba u yang salah dulu, dan lihat sisanya tidak pernah bisa jadi du.' },
    ],
    widget: 'cocokkan-lapisan',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 4,
    slug: 'parsial-trigonometri-eksponen',
    judul: 'Parsial, trigonometri, dan eksponen',
    labelPendek: 'Parsial',
    pertanyaan: 'Kalau integrannya hasil kali dua fungsi berbeda jenis, seperti x·sin x, bagaimana?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 04: Sifat 3.7 parsial satu tingkat, Sifat 3.8 dan 3.9; jujur bahwa parsial jarang keluar di ujian SMA.' },
      { jenis: 'coba', teks: 'Tiap tebakan diperiksa dengan satu cara saja: turunkan lagi.' },
    ],
    widget: 'pasangkan-turunan-integral',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 5,
    slug: 'jumlahan-riemann',
    judul: 'Luas dari persegi panjang, jumlahan Riemann',
    labelPendek: 'Riemann',
    pertanyaan: 'Bagaimana mengukur luas daerah yang salah satu tepinya melengkung?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 05: partisi, titik sampel, contoh f(x) = x pada [0, 7] dan setengah lingkaran.' },
      { jenis: 'coba', teks: 'Naikkan n dari 4 ke 60, dan lihat selisih ke luas sebenarnya menyusut; kiri dan kanan mengapit dari dua sisi.' },
    ],
    widget: 'persegi-panjang-menumpuk',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 6,
    slug: 'integral-tentu',
    judul: 'Integral tentu dan sifat-sifatnya',
    labelPendek: 'Integral tentu',
    pertanyaan: 'Kalau bagiannya dibuat tak hingga banyak, apa nama hasilnya, dan bagaimana menuliskannya?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 06: ∫ₐᵇ sebagai limit jumlahan, ∫₀⁷ x dx = 49/2, Sifat 3.10 sampai 3.15, luas bertanda.' },
      { jenis: 'coba', teks: 'Geser c ke mana pun, jumlah dua bagiannya tidak pernah berubah.' },
    ],
    widget: 'pecah-selang',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 7,
    slug: 'teorema-dasar-kalkulus',
    judul: 'Dua dunia yang ternyata satu, Teorema Dasar Kalkulus',
    labelPendek: 'TDK',
    pertanyaan: 'Luas dari persegi panjang dan antiturunan tidak kelihatan berhubungan. Kenapa ternyata sama?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 07: fungsi luas A(x), TDK I lewat pita setinggi f(x), TDK II, contoh ∫₁³ x² dx = 26/3.' },
      { jenis: 'coba', teks: 'Perhatikan pita di ujung: tingginya persis f(x), dan itulah kemiringan kurva bawah.' },
    ],
    widget: 'luas-yang-tumbuh',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 8,
    slug: 'menghitung-integral-tentu',
    judul: 'Menghitung integral tentu',
    labelPendek: 'Menghitung',
    pertanyaan: 'Sekarang alatnya lengkap; bagaimana urutan kerja yang tidak tersesat?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 08: notasi [F(x)]ₐᵇ, tiga langkah, substitusi dengan batas yang ikut berubah.' },
      { jenis: 'coba', teks: 'Pada soal substitusi, perhatikan batasnya ikut berubah dari x ke u.' },
    ],
    widget: 'hitung-bertahap',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 9,
    slug: 'luas-daerah',
    judul: 'Luas daerah, termasuk yang di bawah sumbu',
    labelPendek: 'Luas',
    pertanyaan: 'Kalau kurvanya memotong sumbu x, kenapa integralnya bisa lebih kecil daripada luas yang terlihat?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 09: luas = integral kalau di atas sumbu, dinegatifkan kalau di bawah, dipecah di titik potong.' },
      { jenis: 'coba', teks: 'Letakkan batas sehingga daerah biru dan merah sama besar, dan integralnya nol sementara luasnya tidak.' },
    ],
    widget: 'luas-dua-daerah',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 10,
    slug: 'luas-antara-dua-kurva',
    judul: 'Luas antara dua kurva',
    labelPendek: 'Dua kurva',
    pertanyaan: 'Kalau daerahnya dibatasi dua kurva, bukan kurva dan sumbu, apa yang diintegralkan?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 10: ∫ (atas − bawah), batas dari titik potong, contoh y = x² dan y = x + 2 (luas 9/2). Di luar bab buku, dinyatakan begitu.' },
      { jenis: 'coba', teks: 'Geser batas melewati titik potong, dan persegi panjangnya berbalik: atas dan bawah bertukar.' },
    ],
    widget: 'dua-kurva',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 11,
    slug: 'integral-di-sekitar-kita',
    judul: 'Integral di sekitar kita',
    labelPendek: 'Dunia nyata',
    pertanyaan: 'Di mana luas di bawah sebuah kurva benar-benar dipakai?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 11: penjualan total, jarak dari kecepatan, usaha pegas, pengeluaran yang dihemat. Galeri tidak interaktif.' },
    ],
    widget: 'dunia-nyata-integral',
    siap: false,
  },
]
