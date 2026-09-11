/**
 * Pengelompokan materi menjadi Bab dan Sub-bab, mengikuti urutan bab buku
 * sekolah. Ini lapisan keempat struktur MANTRA: Kelas → Bab → Sub-bab → Materi.
 *
 * NAMA SUB-BAB ADALAH JUDUL YANG DIUCAPKAN DI VIDEO (keputusan ARYA 10 Sep
 * 2026): pembuka video mengucapkan "<nama sub-bab>, Bagian n" dengan n =
 * urutan materi di dalam `nomor`. Jadi namanya harus enak diucapkan (bukan
 * daftar koma), ditulis Huruf Besar Tiap Kata, dan satu sumber ini dipakai
 * sidebar, Peta Materi, dan naskah video. Sub-bab berisi satu materi
 * diucapkan tanpa "Bagian"; sub-bab penerapan memuat nama topiknya
 * ("Penerapan Vektor") supaya tidak ambigu saat diucapkan. Pemeriksanya:
 * `alat/cek_pembuka_video.py`.
 * Nama kurikulum TIDAK disebut di mana pun yang dilihat siswa; `sumber`
 * tinggal catatan dalam kode.
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
      { huruf: 'D', nama: 'Penerapan Trigonometri', nomor: [10] },
    ],
  },
  {
    slug: 'vektor',
    no: 3,
    kelas: 'Kelas 10',
    urutanKelas: 10,
    sumber: 'Buku K10 Bab 3',
    sub: [
      { huruf: 'A', nama: 'Pengenalan Vektor', nomor: [1, 2] },
      { huruf: 'B', nama: 'Vektor dalam Sistem Koordinat', nomor: [3, 4, 5] },
      { huruf: 'C', nama: 'Operasi Vektor', nomor: [6, 7, 8, 9] },
      { huruf: 'D', nama: 'Perkalian Titik dan Proyeksi', nomor: [11, 12] },
      { huruf: 'E', nama: 'Penerapan Vektor', nomor: [10] },
    ],
  },
  {
    slug: 'grafik-fungsi',
    no: 6,
    kelas: 'Kelas 10–11',
    urutanKelas: 10,
    sumber: 'K10 Bab 1 & 6, K11 Bab 1 & 4',
    sub: [
      { huruf: 'A', nama: 'Pengenalan Fungsi dan Grafik', nomor: [1, 2] },
      { huruf: 'B', nama: 'Fungsi Kuadrat', nomor: [3, 4, 5] },
      { huruf: 'C', nama: 'Transformasi Fungsi', nomor: [6, 7] },
      { huruf: 'D', nama: 'Fungsi Eksponen dan Logaritma', nomor: [8, 9] },
      { huruf: 'E', nama: 'Fungsi Rasional, Komposisi, dan Invers', nomor: [10, 11, 12] },
      { huruf: 'F', nama: 'Penerapan Grafik Fungsi', nomor: [13] },
    ],
  },
  {
    slug: 'statistika',
    no: 7,
    kelas: 'Kelas 10–11',
    urutanKelas: 10,
    sumber: 'K10 Bab 7, K11 Bab 3',
    sub: [
      { huruf: 'A', nama: 'Penyajian Data', nomor: [1, 2, 3, 4] },
      { huruf: 'B', nama: 'Ukuran Pemusatan dan Penyebaran', nomor: [5, 6, 7, 8, 9] },
      { huruf: 'C', nama: 'Hubungan Dua Variabel', nomor: [10, 11, 12, 13] },
      { huruf: 'D', nama: 'Penerapan Statistika', nomor: [14] },
    ],
  },
  {
    slug: 'ruang-3d',
    no: 1,
    kelas: 'Kelas 12',
    urutanKelas: 12,
    sumber: 'Buku K12 Bab 1',
    sub: [
      { huruf: 'A', nama: 'Kedudukan Titik, Garis, dan Bidang', nomor: [1, 2] },
      { huruf: 'B', nama: 'Jarak dalam Ruang', nomor: [3, 4, 5, 6, 7] },
      { huruf: 'C', nama: 'Sudut dalam Ruang', nomor: [8, 9] },
      { huruf: 'D', nama: 'Penerapan Ruang Tiga Dimensi', nomor: [10] },
    ],
  },
  {
    slug: 'limit',
    no: 4,
    kelas: 'Kelas 12',
    urutanKelas: 12,
    sumber: 'Buku K12, LIMIT.pdf',
    sub: [
      { huruf: 'A', nama: 'Konsep Limit', nomor: [1, 2, 3, 4] },
      { huruf: 'B', nama: 'Sifat Limit dan Cara Menghitungnya', nomor: [5, 6, 7] },
      { huruf: 'C', nama: 'Limit Trigonometri dan Kekontinuan', nomor: [8, 9] },
      { huruf: 'D', nama: 'Penerapan Limit', nomor: [10] },
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
      { huruf: 'A', nama: 'Prapeta, Peta, dan Pencerminan', nomor: [1, 2, 3, 4] },
      { huruf: 'B', nama: 'Translasi, Rotasi, dan Dilatasi', nomor: [5, 6, 7] },
      { huruf: 'C', nama: 'Sifat Transformasi', nomor: [8] },
      { huruf: 'D', nama: 'Matriks Transformasi', nomor: [9, 10] },
      { huruf: 'E', nama: 'Komposisi Transformasi', nomor: [11, 12] },
      { huruf: 'F', nama: 'Penerapan Transformasi Geometri', nomor: [13] },
    ],
  },
  {
    // Topik kedelapan, kerangka MATRA-MASTER 6 Sep 2026. Pemetaan dari
    // rancangan docs/superpowers/specs/2026-09-06-turunan-alur-belajar.md:
    // bagian A.2 dan A.3 buku (sekan, tangen, notasi) plus aturan pangkat
    // jadi sub-bab A; bagian B (sifat, rantai, trigonometri, eksponen) jadi
    // B; bagian C (garis singgung, naik turun, ekstrem) jadi C; bagian D
    // jadi Penerapan. Bagian A.1 (limit) sudah topik Limit.
    slug: 'turunan',
    no: 2,
    kelas: 'Kelas 12',
    urutanKelas: 12,
    sumber: 'Tingkat Lanjut K12 Bab 2',
    sub: [
      { huruf: 'A', nama: 'Kemiringan yang Berubah', nomor: [1, 2, 3, 4] },
      { huruf: 'B', nama: 'Aturan Menurunkan', nomor: [5, 6, 7, 8] },
      { huruf: 'C', nama: 'Turunan untuk Membaca Grafik', nomor: [9, 10, 11] },
      { huruf: 'D', nama: 'Penerapan Turunan', nomor: [12] },
    ],
  },
  {
    // Topik kesembilan. Pemetaan dari
    // docs/superpowers/specs/2026-09-06-integral-alur-belajar.md: bagian A
    // buku (tak tentu) jadi sub-bab A; bagian B (tentu, Riemann, TDK) jadi
    // B; bagian C plus luas antara dua kurva jadi Penerapan.
    slug: 'integral',
    no: 3,
    kelas: 'Kelas 12',
    urutanKelas: 12,
    sumber: 'Tingkat Lanjut K12 Bab 3',
    sub: [
      { huruf: 'A', nama: 'Membalik Turunan', nomor: [1, 2, 3, 4] },
      { huruf: 'B', nama: 'Luas dan Integral Tentu', nomor: [5, 6, 7, 8] },
      { huruf: 'C', nama: 'Penerapan Integral', nomor: [9, 10, 11] },
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
]
