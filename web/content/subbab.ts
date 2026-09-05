/**
 * Pengelompokan materi menjadi Bab dan Sub-bab, mengikuti buku Kurikulum
 * Merdeka. Ini lapisan keempat struktur MANTRA: Kelas → Bab → Sub-bab → Materi.
 *
 * KENAPA BERKAS TERSENDIRI, BUKAN MEDAN DI `content/<topik>/tahap.ts`
 * Berkas `tahap.ts` tiap topik dimiliki sesi topiknya masing-masing, dan
 * kelimanya sedang mengerjakan video saat perombakan ini ditulis. Menambah
 * medan di sana berarti lima sesi harus menyelesaikan konflik yang sama
 * berulang kali. Pemetaan ini murni pengelompokan nomor tahap, tidak
 * mengandung satu kalimat pun naskah materi, jadi ia berdiri sendiri dengan
 * baik dan bisa dipindahkan nanti tanpa kehilangan apa pun.
 *
 * `nomor` memakai nomor tahap 1-based, sama dengan yang dilihat siswa
 * ("Materi 04"). Urutan sub-bab menentukan urutan tampil di sidebar dan di
 * peta materi.
 *
 * Dua keputusan pengelompokan yang sengaja, dari perancang:
 * 1. Grafik Fungsi melintasi empat bab buku sekaligus (K10 Bab 1 dan 6,
 *    K11 Bab 1 dan 4). Dibiarkan sebagai satu bab MANTRA karena alur
 *    mengajarnya satu tarikan napas.
 * 2. Materi "dunia nyata" tiap topik dipindah ke sub-bab penutup
 *    "Penerapan", walaupun nomornya di tengah. Yang menentukan urutan
 *    belajar adalah sub-babnya, bukan nomor materinya.
 */

export type SubBab = {
  /** huruf sub-bab yang tampil: A, B, C, ... */
  huruf: string
  nama: string
  /** nomor materi (1-based) yang masuk sub-bab ini, urut tampil */
  nomor: number[]
}

export type Bab = {
  slug: string
  /** nomor bab di buku sumbernya */
  no: number
  /** label kelas untuk pengelompokan di peta materi */
  kelas: string
  /** kelas terkecil, dipakai mengurutkan dan mengelompokkan */
  urutanKelas: 10 | 12
  /** buku sumber, ditulis apa adanya supaya bisa diperiksa siswa dan guru */
  sumber: string
  sub: SubBab[]
}

export const BAB: Bab[] = [
  {
    slug: 'trigonometri',
    no: 4,
    kelas: 'Kelas 10',
    urutanKelas: 10,
    sumber: 'Buku K10 Bab 4',
    sub: [
      { huruf: 'A', nama: 'Perbandingan Trigonometri', nomor: [1, 2, 3, 4] },
      { huruf: 'B', nama: 'Lingkaran Satuan dan Sudut Istimewa', nomor: [5, 6, 7] },
      { huruf: 'C', nama: 'Grafik Fungsi Trigonometri', nomor: [8, 9] },
      { huruf: 'D', nama: 'Penerapan', nomor: [10] },
    ],
  },
  {
    slug: 'vektor',
    no: 3,
    kelas: 'Kelas 10',
    urutanKelas: 10,
    sumber: 'Buku K10 Bab 3',
    sub: [
      { huruf: 'A', nama: 'Pengertian, notasi, jenis vektor', nomor: [1, 2] },
      { huruf: 'B', nama: 'Vektor dan sistem koordinat', nomor: [3, 4, 5] },
      { huruf: 'C', nama: 'Operasi vektor', nomor: [6, 7, 8, 9] },
      { huruf: 'D', nama: 'Perkalian titik dan proyeksi', nomor: [11, 12] },
      { huruf: 'E', nama: 'Penerapan', nomor: [10] },
    ],
  },
  {
    slug: 'grafik-fungsi',
    no: 6,
    kelas: 'Kelas 10–11',
    urutanKelas: 10,
    sumber: 'K10 Bab 1 & 6, K11 Bab 1 & 4',
    sub: [
      { huruf: 'A', nama: 'Fungsi dan grafiknya', nomor: [1, 2] },
      { huruf: 'B', nama: 'Fungsi kuadrat', nomor: [3, 4, 5] },
      { huruf: 'C', nama: 'Transformasi fungsi', nomor: [6, 7] },
      { huruf: 'D', nama: 'Eksponen dan logaritma', nomor: [8, 9] },
      { huruf: 'E', nama: 'Rasional, komposisi, invers', nomor: [10, 11, 12] },
      { huruf: 'F', nama: 'Penerapan', nomor: [13] },
    ],
  },
  {
    slug: 'statistika',
    no: 7,
    kelas: 'Kelas 10–11',
    urutanKelas: 10,
    sumber: 'K10 Bab 7, K11 Bab 3',
    sub: [
      { huruf: 'A', nama: 'Penyajian data', nomor: [1, 2, 3, 4] },
      { huruf: 'B', nama: 'Ukuran pemusatan dan penyebaran', nomor: [5, 6, 7, 8, 9] },
      { huruf: 'C', nama: 'Hubungan dua variabel', nomor: [10, 11, 12, 13] },
      { huruf: 'D', nama: 'Penerapan', nomor: [14] },
    ],
  },
  {
    slug: 'ruang-3d',
    no: 1,
    kelas: 'Kelas 12',
    urutanKelas: 12,
    sumber: 'Buku K12 Bab 1',
    sub: [
      { huruf: 'A', nama: 'Kedudukan titik, garis, bidang', nomor: [1, 2] },
      { huruf: 'B', nama: 'Jarak dalam ruang', nomor: [3, 4, 5, 6, 7] },
      { huruf: 'C', nama: 'Sudut dalam ruang', nomor: [8, 9] },
      { huruf: 'D', nama: 'Penerapan', nomor: [10] },
    ],
  },
  {
    slug: 'limit',
    no: 4,
    kelas: 'Kelas 12',
    urutanKelas: 12,
    sumber: 'Buku K12, LIMIT.pdf',
    sub: [
      { huruf: 'A', nama: 'Konsep limit', nomor: [1, 2, 3, 4] },
      { huruf: 'B', nama: 'Sifat dan cara menghitung', nomor: [5, 6, 7] },
      { huruf: 'C', nama: 'Limit trigonometri dan kekontinuan', nomor: [8, 9] },
      { huruf: 'D', nama: 'Penerapan', nomor: [10] },
    ],
  },
  {
    // Topik ketujuh, ditambahkan ARYA 3 Sep 2026. Pemetaan dari sesi
    // Transformasi Geometri (4 Sep): bagian A buku (transformasi pada bidang
    // Kartesius) jadi sub-bab A, B, C; bagian B (kaitan matriks) jadi D; bagian
    // C (komposisi dengan matriks) jadi E. Urutannya sengaja mulai dari
    // TRANSLASI, bukan pencerminan seperti buku, supaya menyambung ke Vektor
    // yang sudah dimiliki siswa. Sumbernya Buku Siswa Kelas XI Kurikulum
    // Sekolah Penggerak (2021) Bab 4; berkasnya di komputer ARYA bernama
    // "3 Dimensi.pdf", nama yang menyesatkan.
    slug: 'transformasi-geometri',
    no: 4,
    kelas: 'Kelas 11',
    urutanKelas: 10,
    sumber: 'Buku K11 Bab 4',
    sub: [
      { huruf: 'A', nama: 'Prapeta, Peta, dan Translasi', nomor: [1, 2] },
      { huruf: 'B', nama: 'Pencerminan', nomor: [3, 4, 5] },
      { huruf: 'C', nama: 'Rotasi, Dilatasi, dan Sifatnya', nomor: [6, 7, 8] },
      { huruf: 'D', nama: 'Matriks Transformasi', nomor: [9, 10] },
      { huruf: 'E', nama: 'Komposisi Transformasi', nomor: [11, 12] },
      { huruf: 'F', nama: 'Penerapan', nomor: [13] },
    ],
  },
]

export const cariBab = (slug: string) => BAB.find((b) => b.slug === slug)

/** Sub-bab yang memuat nomor materi tertentu. */
export const subDari = (slug: string, nomor: number) =>
  cariBab(slug)?.sub.find((s) => s.nomor.includes(nomor))

/**
 * Urutan belajar sebenarnya: nomor materi diurutkan menurut sub-babnya, bukan
 * menurut angkanya. Untuk Vektor, materi 10 ("dunia nyata") ada di sub-bab
 * penutup, jadi ia datang PALING AKHIR walau nomornya 10 dari 12.
 */
export const urutanBelajar = (slug: string): number[] =>
  cariBab(slug)?.sub.flatMap((s) => s.nomor) ?? []

/** Bab yang belum dibangun, tampil sebagai kartu penanda di Peta Materi. */
export const BAB_SEGERA = [
  'barisan dan deret',
  'eksponen dan logaritma',
  'peluang',
  'turunan',
  'integral',
]
