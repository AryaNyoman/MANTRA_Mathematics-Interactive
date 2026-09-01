/**
 * Vektor, 12 materi belajar. Topik ketiga MATRA.
 *
 * Rancangannya: docs/superpowers/specs/2026-09-01-vektor-alur-belajar.md
 * Rencana kerjanya: docs/superpowers/plans/2026-09-01-topik-vektor.md
 *
 * SUMBER MATERI
 * Buku Panduan Guru Matematika untuk SMA/SMK Kelas X, Kemendikbudristek 2021,
 * penulis Dicky Susanto dkk, ISBN 978-602-244-537-1. Bab 3 "Vektor dan
 * Operasinya", halaman buku 92 sampai 126. Urutan konsep, kosakata, dan
 * kekeliruan yang disorot mengikuti buku itu. Contoh, angka, dan kalimatnya
 * ditulis sendiri.
 *
 * PENEMPATAN KELAS SUDAH DIPERIKSA, BUKAN DIINGAT
 * Vektor ada di Kelas 10 (Fase E) saja. Buku Guru Kelas 11 menyebut kata
 * "vektor" hanya di daftar Capaian Pembelajaran, dan Buku Siswa Kelas XII tidak
 * menyebutnya sama sekali.
 *
 * KENAPA TRIGONOMETRI TIDAK DIPAKAI SEBAGAI DASAR
 * Di buku, Vektor adalah Bab 3 dan Trigonometri Bab 4. Siswa yang membaca
 * berurutan BELUM tahu sin dan cos di sini. Karena itu panjang vektor
 * diturunkan dari Pythagoras, dan arah dinyatakan dalam derajat yang diukur
 * busur, bukan lewat rumus tangen. Kaitan ke trigonometri ditulis sebagai
 * selipan opsional, bukan prasyarat.
 *
 * MATERI 11 DAN 12 DI LUAR KURIKULUM MERDEKA. Perkalian titik dan proyeksi
 * tidak ada di Bab 3, tetapi masih keluar di UTBK. Keputusan ARYA 1 September
 * 2026: keduanya dimasukkan DAN ditandai terus terang di dalam materinya.
 */

import type { Tahap } from '@/content/tipe'

export type WidgetVektor =
  | 'perahu-sungai'
  | 'panah-berpindah'
  | 'pecah-komponen'
  | 'panjang-dan-arah'
  | 'vektor-satuan'
  | 'sambung-panah'
  | 'jajar-genjang'
  | 'selisih-panah'
  | 'kali-skalar'
  | 'dunia-nyata-vektor'
  | 'perkalian-titik'
  | 'proyeksi'

/**
 * Bentuk Tahap dengan nama widget yang DIKETATKAN ke senarai di atas.
 * Tanpa ini, salah ketik nama widget baru ketahuan saat halamannya dibuka dan
 * panggungnya diam saja. Dengan ini, TypeScript menolaknya sebelum dijalankan.
 */
type TahapVektor = Omit<Tahap, 'widget'> & { widget?: WidgetVektor }

/** Penanda sementara untuk materi yang naskahnya belum ditulis. */
const BELUM = [
  { jenis: 'paragraf' as const, teks: 'Naskah materi ini sedang ditulis.' },
]

export const TAHAP: TahapVektor[] = [
  /* ================================================================= */
  {
    no: 1,
    slug: 'angka-saja-tidak-cukup',
    judul: 'Angka saja tidak cukup',
    labelPendek: 'Kenapa',
    pertanyaan: 'Kenapa 3 tambah 4 tidak selalu 7?',
    penjelasan: BELUM,
    widget: 'perahu-sungai',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 2,
    slug: 'panah-yang-boleh-dipindah',
    judul: 'Panah yang boleh dipindah',
    labelPendek: 'Notasi',
    pertanyaan: 'Dua panah di tempat berbeda, apakah vektor yang sama?',
    penjelasan: BELUM,
    widget: 'panah-berpindah',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 3,
    slug: 'memecah-panah',
    judul: 'Memecah panah jadi dua langkah',
    labelPendek: 'Komponen',
    pertanyaan: 'Bagaimana caranya panah bisa dihitung, bukan cuma digambar?',
    penjelasan: [
      {
        jenis: 'paragraf',
        teks: 'Menggambar panah di kertas berpetak memang jelas. Tetapi begitu panahnya ada sepuluh, menggambar satu per satu jadi melelahkan dan gampang meleset satu dua kotak. Ada cara yang jauh lebih ringkas: catat saja perjalanannya sebagai dua langkah.',
      },
      { jenis: 'sesi', judul: 'Satu panah, dua langkah' },
      {
        jenis: 'paragraf',
        teks: 'Ambil satu panah dari titik asal O ke sebuah titik. Semiring apa pun panah itu, perjalanannya selalu bisa diganti dua langkah yang lebih mudah dibaca: berjalan mendatar dulu, lalu tegak. Titik yang dituju tetap sama persis.',
      },
      {
        jenis: 'poin',
        judul: 'Dua angka itu namanya komponen',
        butir: [
          'Komponen mendatar - berapa jauh bergeser ke kanan. Bertanda negatif berarti bergeser ke kiri.',
          'Komponen tegak - berapa jauh bergeser ke atas. Bertanda negatif berarti bergeser ke bawah.',
          'Urutannya tidak boleh ditukar. (3 4) dan (4 3) menunjuk ke arah yang berbeda.',
        ],
      },
      {
        jenis: 'sorot',
        teks: 'Dua angka sudah cukup mewakili satu panah. Itulah sebabnya vektor bisa dihitung, bukan cuma digambar.',
      },
      {
        jenis: 'coba',
        teks: 'Tarik ujung panah di sebelah kiri, lalu perhatikan kedua angkanya.',
        langkah: [
          'Tarik ujungnya ke kanan atas. Kedua komponen bertanda positif.',
          'Bawa ke kiri atas. Komponen mendatarnya berubah tanda, komponen tegaknya tidak.',
          'Turunkan sampai tepat di sumbu mendatar. Komponen tegaknya jadi nol, dan panahnya berbaring rata.',
        ],
      },
      { jenis: 'sesi', judul: 'Menuliskannya: baris atau kolom' },
      {
        jenis: 'paragraf',
        teks: 'Ada dua cara menulis yang artinya sama persis. Vektor baris ditulis mendatar, misalnya (3 4). Vektor kolom ditulis bertumpuk, angka mendatar di atas dan angka tegak di bawah. Keduanya dipakai di sekolah, jadi keduanya perlu dikenali.',
      },
      {
        jenis: 'poin',
        judul: 'Kenapa vektor baris ditulis tanpa koma',
        butir: [
          'Titik koordinat memakai koma, misalnya A(3, 4).',
          'Vektor baris tidak memakai koma, ditulis (3 4).',
          'Bedanya sengaja, supaya pembaca langsung tahu yang satu menyatakan letak dan yang lain menyatakan perpindahan.',
        ],
      },
      { jenis: 'sesi', judul: 'Vektor yang tidak berangkat dari titik asal' },
      {
        jenis: 'paragraf',
        teks: 'Tidak semua panah berangkat dari O. Panah dari titik A ke titik B pun punya komponen, dan cara mencarinya sama saja: hitung berapa jauh berpindahnya ke kanan, lalu berapa jauh naiknya.',
      },
      {
        jenis: 'contoh',
        judul: 'Dari A(1, 2) ke B(5, 5)',
        baris: [
          'Komponen mendatar: 5 dikurangi 1, hasilnya 4',
          'Komponen tegak: 5 dikurangi 2, hasilnya 3',
          'Jadi vektor AB ditulis (4 3)',
        ],
        simpul: 'Ujung dikurangi pangkal. Bukan pangkal dikurangi ujung.',
      },
      {
        jenis: 'paragraf',
        teks: 'Coba periksa sendiri dengan menggambar: dari A(1, 2), melangkah 4 ke kanan sampai di x sama dengan 5, lalu 3 ke atas sampai di y sama dengan 5. Betul mendarat di B.',
      },
    ],
    seringKeliru: {
      judul: 'Vektor bukan titik koordinat',
      isi: 'Titik butuh sepasang angka untuk menyatakan LETAK. Vektor butuh dua titik untuk menyatakan PERPINDAHAN, dan hasilnya sepasang angka juga. Karena tulisannya mirip, keduanya sering dikira benda yang sama. Ujinya gampang: titik (4, 3) selamanya berada di tempat yang sama, sedangkan vektor (4 3) boleh digambar di mana saja asalkan panjang dan arahnya tidak berubah.',
      sumber: 'Buku Panduan Guru Matematika SMA/SMK Kelas X, Kemendikbudristek 2021, Bab 3, bagian Ayo Berpikir Kritis halaman 106.',
    },
    intisari: [
      'Satu panah bisa diganti dua langkah: mendatar lalu tegak. Kedua angkanya disebut komponen.',
      'Urutan komponen tidak boleh ditukar, sebab (3 4) dan (4 3) berbeda arah.',
      'Vektor baris ditulis tanpa koma, supaya tidak tertukar dengan titik koordinat.',
      'Vektor dari A ke B dicari dengan ujung dikurangi pangkal.',
    ],
    widget: 'pecah-komponen',
    siap: true,
  },
  /* ================================================================= */
  {
    no: 4,
    slug: 'panjang-dan-arah',
    judul: 'Panjang panah itu Pythagoras',
    labelPendek: 'Panjang',
    pertanyaan: 'Sudah punya dua angka, lalu berapa panjang panahnya?',
    penjelasan: BELUM,
    widget: 'panjang-dan-arah',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 5,
    slug: 'arah-tanpa-panjang',
    judul: 'Arah tanpa panjang',
    labelPendek: 'Satuan',
    pertanyaan: 'Bagaimana menyebut arah saja, tanpa ikut menyebut jauhnya?',
    penjelasan: BELUM,
    widget: 'vektor-satuan',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 6,
    slug: 'menjumlah-vektor',
    judul: 'Menjumlah itu menyambung perjalanan',
    labelPendek: 'Jumlah',
    pertanyaan: 'Dua perjalanan berturut-turut, hasilnya perjalanan apa?',
    penjelasan: BELUM,
    widget: 'sambung-panah',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 7,
    slug: 'jajar-genjang',
    judul: 'Dua yang bekerja bersamaan',
    labelPendek: 'Jajar genjang',
    pertanyaan: 'Kalau keduanya bekerja serentak, bukan bergantian?',
    penjelasan: BELUM,
    widget: 'jajar-genjang',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 8,
    slug: 'mengurangi-vektor',
    judul: 'Mengurangi itu menambah lawannya',
    labelPendek: 'Selisih',
    pertanyaan: 'Apa arti mengurangi sebuah panah dengan panah lain?',
    penjelasan: BELUM,
    widget: 'selisih-panah',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 9,
    slug: 'kali-skalar',
    judul: 'Dikali angka: panjang berubah, arah tetap',
    labelPendek: 'Kali angka',
    pertanyaan: 'Apa yang terjadi kalau sebuah panah dikali bilangan?',
    penjelasan: BELUM,
    widget: 'kali-skalar',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 10,
    slug: 'dunia-nyata',
    judul: 'Vektor di dunia nyata',
    labelPendek: 'Dunia nyata',
    pertanyaan: 'Di mana saja panah ini benar-benar dipakai?',
    penjelasan: BELUM,
    widget: 'dunia-nyata-vektor',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 11,
    slug: 'perkalian-titik',
    judul: 'Seberapa searah?',
    labelPendek: 'Kali titik',
    pertanyaan: 'Bagaimana mengukur seberapa searah dua panah?',
    penjelasan: BELUM,
    widget: 'perkalian-titik',
    siap: false,
  },
  /* ================================================================= */
  {
    no: 12,
    slug: 'proyeksi',
    judul: 'Bayangan satu panah pada panah lain',
    labelPendek: 'Proyeksi',
    pertanyaan: 'Berapa bagian dari panah ini yang benar-benar searah?',
    penjelasan: BELUM,
    widget: 'proyeksi',
    siap: false,
  },
]
