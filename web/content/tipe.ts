/**
 * Tipe isi yang dipakai SEMUA topik.
 *
 * Sebelum 1 September 2026 tipe-tipe ini tinggal di dalam
 * `content/trigonometri/`, sehingga topik kedua tidak bisa memakainya tanpa
 * mengimpor dari folder milik topik lain. Dipindah ke sini saat topik Limit
 * dibangun.
 *
 * Satu-satunya perubahan bentuk: `Tahap.widget` sekarang `string` biasa, bukan
 * senarai nama widget trigonometri. Tiap topik mengetatkan nama widgetnya
 * sendiri di berkas isinya masing-masing, karena widget Limit tidak ada
 * hubungannya dengan widget Trigonometri.
 */

/* ------------------------------------------------------------------ */
/* Penjelasan materi                                                   */
/* ------------------------------------------------------------------ */

/**
 * Satu potongan penjelasan. Bentuknya sengaja beragam supaya tidak monoton.
 *
 * Aturan ARYA: penjelasan JANGAN berupa tembok paragraf seperti cerpen, tapi
 * isinya juga jangan dipangkas. Ada siswa yang belajar dengan membaca.
 */
export type Blok =
  | { jenis: 'paragraf'; teks: string }
  /** daftar poin; tiap butir boleh diawali "Label - isi" untuk ditebalkan */
  | { jenis: 'poin'; judul?: string; butir: string[] }
  /** satu kalimat kunci yang ditonjolkan */
  | { jenis: 'sorot'; teks: string }
  /** kotak contoh berhitung, tiap baris satu langkah */
  | { jenis: 'contoh'; judul: string; baris: string[]; simpul?: string }
  /** penanda pergantian bagian, dengan garis pemisah dan nomor urut */
  | { jenis: 'sesi'; judul: string }
  /** ajakan mencoba alat di sebelah kiri, ditaruh di TENGAH materi */
  | { jenis: 'coba'; teks: string; langkah?: string[] }

export type Tahap = {
  no: number
  slug: string
  judul: string
  pertanyaan: string
  labelPendek: string
  penjelasan: Blok[]
  /**
   * Kotak koreksi. Namanya sengaja BUKAN "miskonsepsi": itu istilah guru, dan
   * terasa menghakimi sebelum mengajar. Selalu ditaruh di BAWAH, setelah siswa
   * paham.
   */
  seringKeliru?: { judul: string; isi: string; sumber?: string }
  intisari?: string[]
  /** nama widget, yang mengerti artinya adalah panggung topik bersangkutan */
  widget?: string
  video?: { berkas: string; poster: string }
  siap: boolean
}

/* ------------------------------------------------------------------ */
/* Soal                                                                */
/* ------------------------------------------------------------------ */

/** Soal latihan di dalam halaman topik, dengan pembahasan bertahap. */
export type Soal = {
  no: number
  label: string
  pertanyaan: string
  pembahasan: string[]
  jawaban: string
  /**
   * Lima pilihan, A sampai E (permintaan ARYA 1 Sep 2026).
   * Pengecohnya bukan asal salah: tiap butir adalah kekeliruan yang benar-benar
   * sering terjadi, sehingga siswa yang memilihnya belajar sesuatu.
   */
  pilihan: string[]
  /** indeks jawaban benar pada `pilihan` */
  benar: number
}

export type TingkatKuis = 'mudah' | 'sedang' | 'sulit' | 'sangat sulit'

export type SoalKuis = {
  /** dipakai untuk mengingat soal mana yang sudah pernah keluar */
  id: string
  pertanyaan: string
  pilihan: string[]
  /** indeks jawaban benar */
  benar: number
  /** dijelaskan setelah dijawab, termasuk kenapa yang salah itu menggoda */
  alasan: string
  /**
   * Langkah penyelesaian, satu butir satu langkah. OPSIONAL.
   *
   * Panel Pembahasan di halaman bank soal menampilkan langkah bernomor kalau
   * medan ini ada, dan jatuh ke `alasan` kalau tidak. Sengaja tidak diwajibkan:
   * memaksakannya berarti 32 soal kali tujuh topik harus ditulis ulang
   * sekaligus. Isi `alasan` TIDAK boleh dipecah otomatis jadi langkah;
   * kalimat penjelasan bukan langkah penyelesaian.
   */
  langkah?: string[]
  tingkat: TingkatKuis
}

/* ------------------------------------------------------------------ */
/* Rujukan luar                                                        */
/* ------------------------------------------------------------------ */

export type Kanal = {
  nama: string
  handle: string
  url: string
  /** kata kunci yang disarankan untuk dicari di kanal itu */
  cari: string
}
