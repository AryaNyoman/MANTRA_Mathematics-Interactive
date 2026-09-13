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
  /** ajakan mencoba alat interaktifnya, ditaruh di TENGAH materi */
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

/**
 * Gambar situasi soal, sebagai DATA, bukan kode (rancangan 13 Sep 2026,
 * `docs/superpowers/specs/2026-09-13-latihan-bergambar-mode-guru-design.md`).
 * Satu perender SVG per jenis di `components/latihan/gambar/`. Dengan
 * begini ratusan gambar soal cukup ditulis sebagai angka dan label, dan
 * gayanya seragam dengan widget. `svg` adalah jalan keluar untuk gambar
 * yang tidak masuk jenis mana pun.
 */
export type GambarSoal =
  | {
      jenis: 'segitiga'
      /** sudut lancip di titik kiri bawah, derajat; siku selalu di kanan bawah */
      sudut?: number
      /** label sisi: depan (tegak), samping (mendatar), miring */
      label: [string, string, string]
      /** nama sudutnya, misalnya "θ" atau "30°"; kosong = tanpa tanda sudut */
      namaSudut?: string
    }
  | {
      jenis: 'lingkaran'
      /** sudut posisi titik pada lingkaran satuan, derajat */
      sudut: number
      /** label di titiknya, misalnya "(cos θ, sin θ)" */
      label?: string
      /** tampilkan kaki x (biru) dan y (merah) */
      kaki?: boolean
    }
  | {
      jenis: 'grafik'
      /** rumus dalam x untuk dievaluasi mesin: "x*x - 4", "Math.sin(x)", "2*x+1" */
      fungsi: string[]
      /** [xMin, xMaks, yMin, yMaks]; bawaan [-5, 5, -5, 5] */
      jangkauan?: [number, number, number, number]
      /** titik bertanda, opsional berlabel */
      titik?: { x: number; y: number; label?: string }[]
      /** garis tegak putus-putus, misalnya asimtot atau batas */
      tegak?: number[]
      /** keterangan tiap kurva, urutannya sama dengan `fungsi` */
      nama?: string[]
      /** titik berlubang (limit): titik digambar kosong */
      lubang?: { x: number; y: number }[]
    }
  | {
      jenis: 'vektor'
      panah: { dari?: [number, number]; ke: [number, number]; label?: string; warna?: 'samping' | 'depan' | 'sudut' | 'miring' }[]
      jangkauan?: [number, number, number, number]
      /** gambar komponen mendatar dan tegak putus-putus untuk panah ke-n */
      komponen?: number[]
    }
  | {
      jenis: 'batang' | 'garis-data'
      kategori: string[]
      nilai: number[]
      /** satuan pada sumbu tegak, misalnya "orang" */
      satuan?: string
      /** sumbu tegak mulai dari angka ini (bawaan 0) */
      mulai?: number
      /** batang yang disorot (indeks) */
      sorot?: number[]
    }
  | {
      jenis: 'balok'
      /** panjang, lebar, tinggi (satuan bebas, hanya perbandingan) */
      ukuran: [number, number, number]
      /** nama delapan titik sudut, urutan A B C D (alas, berlawanan jarum jam dari kiri depan) E F G H (atas) */
      titik?: string[]
      /** ruas yang digambar tebal, pasangan nama titik */
      ruas?: [string, string][]
      /** titik tambahan di tengah rusuk/bidang: nama dan koordinat pecahan [px, py, pz] dalam 0..1 */
      tambahan?: { nama: string; di: [number, number, number] }[]
      /** bidang yang diarsir, daftar nama titik */
      bidang?: string[]
    }
  | {
      jenis: 'bidang'
      /** bangun asal, koordinat */
      bangun: [number, number][]
      /** bayangan hasil transformasi */
      bayangan?: [number, number][]
      /** garis cermin: "x", "y", "y=x", "y=-x", "x=2", "y=-1" */
      cermin?: string
      /** pusat rotasi atau dilatasi */
      pusat?: [number, number]
      jangkauan?: [number, number, number, number]
      labelBangun?: string[]
      labelBayangan?: string[]
    }
  | {
      jenis: 'luas'
      fungsi: string
      dari: number
      sampai: number
      /** banyak persegi panjang Riemann; kosong = daerah diarsir saja */
      persegi?: number
      /** fungsi kedua, untuk luas di antara dua kurva */
      fungsi2?: string
      jangkauan?: [number, number, number, number]
    }
  | {
      jenis: 'svg'
      viewBox: string
      /** isi SVG mentah (tanpa tag svg luar) */
      isi: string
    }

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
   * Gambar situasi soal. Tampil di bawah soal SEBELUM dijawab (situasinya,
   * tanpa membocorkan jawaban) dan di panel Pembahasan. Wajib untuk soal
   * cerita, bangun, grafik, dan data; soal definisi boleh tanpa gambar.
   */
  gambar?: GambarSoal
  /**
   * Kenapa pengecoh terasa masuk akal: satu atau dua kalimat yang menyebut
   * pilihan mana yang menggoda dan kekeliruan apa di baliknya.
   */
  jebakan?: string
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
