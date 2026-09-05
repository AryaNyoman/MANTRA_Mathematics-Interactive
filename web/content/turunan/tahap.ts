/**
 * Turunan, 12 tahap belajar. Topik kedelapan MANTRA.
 *
 * Rancangannya: docs/superpowers/specs/2026-09-06-turunan-alur-belajar.md
 * Kerangka ini dibuat MATRA-MASTER 6 Sep 2026; isinya diisi sesi
 * MANTRA-TURUNAN-INTEGRAL. Tiap materi yang selesai diisi dan lolos gerbang
 * dinyalakan dengan `siap: true`, satu per satu.
 *
 * SUMBER MATERI
 * Matematika Tingkat Lanjut untuk SMA/MA Kelas XII (Edisi Revisi), 2025.
 * Kementerian Pendidikan Dasar dan Menengah. Bab 2 "Turunan Fungsi",
 * halaman cetak 79 sampai 157 (berkas LIMIT.pdf, halaman PDF = cetak + 16).
 * Contoh dan angkanya ditulis sendiri, tetapi urutan konsep dan definisinya
 * mengikuti buku itu. Bagian A.1 (limit dan kontinuitas) TIDAK diulang: itu
 * topik Limit.
 *
 * KENAPA KEMIRINGAN DULU, RUMUS BELAKANGAN
 * Salah paham yang dilawan: "turunan itu rumus pangkat". Empat materi pertama
 * tidak memakai satu pun aturan; siswa melihat garis potong berubah jadi garis
 * singgung, lalu kemiringan itu berubah dari titik ke titik sampai membentuk
 * fungsi baru. Aturan pangkat DITURUNKAN dari definisi di Materi 04.
 *
 * SELURUH ANGKA DI BERKAS INI WAJIB DIPERIKSA MESIN dengan sympy lewat
 * `python alat/cek_soal.py alat/materi-turunan.json` (berkas klaimnya dibuat
 * sesi) sebelum materi dinyatakan siap.
 */

export type WidgetTurunan =
  | 'garis-potong'
  | 'sekan-ke-tangen'
  | 'grafik-turunan'
  | 'mesin-pangkat'
  | 'susun-polinom'
  | 'luas-berubah'
  | 'mesin-bertingkat'
  | 'kemiringan-sinus'
  | 'garis-singgung-geser'
  | 'peta-tanda'
  | 'kotak-terbesar'
  | 'dunia-nyata-turunan'

import type { Tahap } from '@/content/tipe'

/** Nama widget diketatkan ke senarai di atas: salah ketik ditolak TypeScript. */
type TahapTurunan = Omit<Tahap, 'widget'> & { widget?: WidgetTurunan }

/*
 * Blok penjelasan tiap materi masih RINTISAN: satu paragraf pengantar dan satu
 * kotak "coba". Sesi mengisinya sesuai rancangan (pertanyaan, isi pokok,
 * sering keliru, intisari), memecahnya jadi blok pendek, dan WAJIB
 * mempertahankan blok `coba` di tiap materi berwidget (aturan CLAUDE.md,
 * 5 Sep 2026: di HP widget disisipkan tepat di bawah kotak itu).
 */
export const TAHAP: TahapTurunan[] = [
  /* ================================================================= */
  {
    no: 1,
    slug: 'laju-rata-rata',
    judul: 'Seberapa cepat, rata-ratanya',
    labelPendek: 'Kenapa',
    pertanyaan: 'Pabrik membuat 20 barang sampai jam pertama dan 64 barang sampai jam ketiga. Kenapa laju produksinya terlihat sebagai kemiringan sebuah garis?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 01: laju perubahan rata-rata sebagai kemiringan garis potong, dan sambungan ke Limit Materi 01.' },
      { jenis: 'coba', teks: 'Geser selang waktu h makin kecil, dan perhatikan kemiringannya berhenti berubah banyak.' },
    ],
    widget: 'garis-potong',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 2,
    slug: 'garis-singgung-lahir',
    judul: 'Garis potong yang berubah jadi garis singgung',
    labelPendek: 'Definisi',
    pertanyaan: 'Kalau titik Q terus mendekati P, garis potongnya menjadi garis apa, dan angka apa yang tersisa?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 02: definisi turunan di satu titik sebagai limit kemiringan garis potong (Definisi 2.3 dan 2.4), dihitung sekali untuk x² di x = 1.' },
      { jenis: 'coba', teks: 'Kecilkan h sampai 0,01. Garis birunya menempel ke garis ungu; angkanya merapat ke 2.' },
    ],
    widget: 'sekan-ke-tangen',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 3,
    slug: 'turunan-sebagai-fungsi',
    judul: 'Turunan sebagai fungsi baru',
    labelPendek: 'Fungsi f\'',
    pertanyaan: 'Kalau tiap titik punya kemiringannya sendiri, apa yang terjadi kalau semua kemiringan itu digambar?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 03: dari turunan di satu titik ke fungsi turunan, notasi Newton dan Leibniz.' },
      { jenis: 'coba', teks: 'Sapu x dari kiri ke kanan, dan lihat kurva bawah lahir dari kemiringan kurva atas.' },
    ],
    widget: 'grafik-turunan',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 4,
    slug: 'aturan-pangkat',
    judul: 'Aturan pangkat lahir dari definisi',
    labelPendek: 'Pangkat',
    pertanyaan: 'Kenapa turunan x² adalah 2x, x³ adalah 3x², dan seterusnya?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 04: menghitung dari definisi untuk x² dan x³, pola n·xⁿ⁻¹, turunan konstanta nol.' },
      { jenis: 'coba', teks: 'Ganti n, dan perhatikan sisa yang mengandung h selalu hilang saat h menuju nol.' },
    ],
    widget: 'mesin-pangkat',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 5,
    slug: 'suku-demi-suku',
    judul: 'Menurunkan suku demi suku',
    labelPendek: 'Jumlah',
    pertanyaan: 'Kalau fungsinya jumlah beberapa suku, bolehkah tiap suku diturunkan sendiri-sendiri?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 05: Sifat Turunan 1 dan 2 (kelipatan, jumlah, selisih) dan contoh polinom.' },
      { jenis: 'coba', teks: 'Ubah d saja, dan lihat kurva bawah tidak bergerak sama sekali: konstanta hilang saat diturunkan.' },
    ],
    widget: 'susun-polinom',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 6,
    slug: 'hasil-kali-dan-bagi',
    judul: 'Hasil kali dan hasil bagi',
    labelPendek: 'Kali, bagi',
    pertanyaan: 'Kenapa turunan hasil kali bukan hasil kali turunan?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 06: Sifat Turunan 3 dan 4, alasan hasil kali lewat persegi panjang yang membesar.' },
      { jenis: 'coba', teks: 'Kecilkan h, dan lihat pojok ungu hilang lebih cepat daripada dua pitanya.' },
    ],
    widget: 'luas-berubah',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 7,
    slug: 'aturan-rantai',
    judul: 'Fungsi di dalam fungsi, aturan rantai',
    labelPendek: 'Rantai',
    pertanyaan: 'Kalau y bergantung pada u, dan u bergantung pada x, seberapa cepat y berubah terhadap x?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 07: (x² + 1)² diuraikan dulu, polanya terlihat, baru dinamai aturan rantai.' },
      { jenis: 'coba', teks: 'Pilih g = 3x, dan lihat pita u selalu tiga kali pita x apa pun f-nya.' },
    ],
    widget: 'mesin-bertingkat',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 8,
    slug: 'sinus-kosinus-eksponen',
    judul: 'Turunan sinus, kosinus, dan eˣ',
    labelPendek: 'Trigonometri, eˣ',
    pertanyaan: 'Kalau fungsinya bukan pangkat, dari mana turunannya?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 08: kemiringan sinus adalah kosinus (memakai kembali Trigonometri Materi 09), bilangan e.' },
      { jenis: 'coba', teks: 'Untuk eˣ, tinggi kurva dan kemiringannya selalu sama persis. Itulah yang membuat e istimewa.' },
    ],
    widget: 'kemiringan-sinus',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 9,
    slug: 'persamaan-garis-singgung',
    judul: 'Persamaan garis singgung',
    labelPendek: 'Garis singgung',
    pertanyaan: 'Sekarang kemiringannya diketahui; bagaimana menulis persamaan garisnya?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 09: y − y₁ = f\'(x₁)(x − x₁), tiga langkah buku.' },
      { jenis: 'coba', teks: 'Geser ke puncak atau lembah, dan garis singgungnya mendatar: m = 0.' },
    ],
    widget: 'garis-singgung-geser',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 10,
    slug: 'naik-turun-diam',
    judul: 'Naik, turun, dan diam',
    labelPendek: 'Naik, turun',
    pertanyaan: 'Bisakah tanda turunan memberi tahu bentuk grafik tanpa menggambarnya?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 10: Definisi 2.6, tabel tanda f\', contoh x³ − 3x.' },
      { jenis: 'coba', teks: 'Cari kedua tempat garis singgungnya mendatar, lalu baca pitanya berganti warna tepat di situ.' },
    ],
    widget: 'peta-tanda',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 11,
    slug: 'titik-balik',
    judul: 'Titik balik, terbesar dan terkecil',
    labelPendek: 'Ekstrem',
    pertanyaan: 'Kotak tanpa tutup dibuat dari karton persegi 18 cm dengan memotong pojoknya. Berapa potongan pojok yang membuat volumenya terbesar?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 11: titik stasioner, uji turunan pertama, soal kotak V(x) = (18 − 2x)²x dengan x = 3 dan V = 432.' },
      { jenis: 'coba', teks: 'Cari x yang membuat garis singgungnya mendatar, lalu bandingkan dengan x = 3 dari hitungan.' },
    ],
    widget: 'kotak-terbesar',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 12,
    slug: 'turunan-di-sekitar-kita',
    judul: 'Turunan di sekitar kita',
    labelPendek: 'Dunia nyata',
    pertanyaan: 'Di mana kemiringan sebuah kurva benar-benar dipakai?',
    intisari: [],
    penjelasan: [
      { jenis: 'paragraf', teks: 'RINTISAN. Isi sesuai rancangan Materi 12: kecepatan dan percepatan, pertumbuhan eksponensial, kotak termurah, biaya marginal. Galeri tidak interaktif.' },
    ],
    widget: 'dunia-nyata-turunan',
    siap: false,
  },
]
