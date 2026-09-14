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
      /** sisi yang sedang dicari atau dibicarakan, digambar lebih tebal (segitiga acuan pembahasan) */
      sorot?: 'depan' | 'samping' | 'miring'
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
      /**
       * Bagan empat kuadran untuk pembahasan tanda: nama kuadran, sudut batas
       * 0°, 90°, 180°, 270°, dan fungsi yang bernilai positif di tiap kuadran
       * (semua, sin, tan, cos). Satu kuadran boleh disorot, dan sebuah sudut
       * boleh digambar sebagai sinar dari sumbu-x positif.
       */
      jenis: 'kuadran'
      /** kuadran yang disorot, 1 sampai 4 */
      sorot?: 1 | 2 | 3 | 4
      /** sudut yang digambar sebagai sinar, derajat */
      sudut?: number
      /** nama sudut di ujung sinar, misalnya "α" */
      label?: string
    }
  | {
      /**
       * Segitiga sembarang yang "dicabut" dari bangun ruang atau soal cerita,
       * digambar datar dengan nama titik dan panjang sisinya. Bentuknya
       * dihitung dari ketiga panjang (aturan kosinus), jadi gambar tidak
       * berbohong tentang sudutnya.
       */
      jenis: 'segitiga-umum'
      /** nama ketiga titik; titik pertama kiri bawah, kedua kanan bawah, ketiga di atas */
      titik: [string, string, string]
      /** panjang sisi untuk bentuknya: titik1-titik2, titik2-titik3, titik3-titik1 */
      panjang: [number, number, number]
      /** tulisan di tiap sisi, urutan sama dengan `panjang`; kosong = angkanya; "?" untuk yang dicari */
      sisi?: [string, string, string]
      /** indeks titik yang siku-siku (0, 1, atau 2), diberi tanda kotak */
      siku?: 0 | 1 | 2
      /** garis tinggi putus-putus dari titik ke sisi di hadapannya, dengan tanda siku dan nama kaki */
      tinggi?: { dari: 0 | 1 | 2; label?: string; kaki?: string }
      /** indeks sisi yang disorot (0, 1, 2) atau 'tinggi' */
      sorot?: 0 | 1 | 2 | 'tinggi'
      /** busur sudut bernama di titik tertentu */
      sudut?: { di: 0 | 1 | 2; label: string }[]
    }
  | {
      /**
       * Tabel data (statistika): baris disorot untuk kelas yang dibahas,
       * kolom tambahan (frekuensi kumulatif, f·x) diberi warna berbeda supaya
       * terlihat mana yang datang dari soal dan mana yang dihitung.
       */
      jenis: 'tabel'
      kepala: string[]
      baris: string[][]
      /** indeks baris yang disorot */
      sorot?: number[]
      /** indeks kolom yang merupakan hasil hitungan, bukan dari soal */
      kolomBaru?: number[]
      /** baris jumlah di bawah tabel, misalnya ["Jumlah", "40", "", "2.680"] */
      jumlah?: string[]
    }
  | {
      /**
       * Garis bilangan untuk uji tanda (naik/turun, cekung), irisan syarat,
       * dan selang penyelesaian. Titik bisa penuh (termasuk) atau kosong.
       */
      jenis: 'garis-bilangan'
      /** [kiri, kanan]; bawaan mengikuti titik yang ada */
      jangkauan?: [number, number]
      titik: { x: number; label?: string; kosong?: boolean }[]
      /** selang bertanda: tanda "+" atau "−" atau tulisan lain, disorot bila diminta */
      selang?: { dari: number; sampai: number; tanda?: string; sorot?: boolean }[]
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
      /** selang x yang diarsir (fungsi naik, turun, daerah syarat), berlabel */
      arsir?: { dari: number; sampai: number; label?: string }[]
      /** garis mendatar putus-putus, misalnya asimtot datar y = 2 */
      datar?: number[]
    }
  | {
      jenis: 'vektor'
      panah: { dari?: [number, number]; ke: [number, number]; label?: string; warna?: 'samping' | 'depan' | 'sudut' | 'miring' }[]
      jangkauan?: [number, number, number, number]
      /** gambar komponen mendatar dan tegak putus-putus untuk panah ke-n */
      komponen?: number[]
      /**
       * Proyeksi panah `dari` pada garis panah `ke` (indeks di `panah`,
       * keduanya harus berpangkal sama): garis putus-putus tegak lurus dari
       * ujung `dari`, ruas proyeksinya ditebalkan dan diberi label.
       */
      proyeksi?: { dari: number; ke: number; label?: string }
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
      /** ruas yang digambar tebal (merah), pasangan nama titik, boleh berlabel panjang */
      ruas?: [string, string, string?][]
      /** garis bantu putus-putus (ungu), pasangan nama titik, boleh berlabel */
      bantu?: [string, string, string?][]
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
      /** panah tipis dari tiap titik bangun ke titik bayangannya (translasi, dilatasi) */
      panah?: boolean
      /** garis lurus tambahan y = mx + c yang digambar tipis, misalnya garis yang ditransformasi */
      garis?: { m: number; c: number; label?: string; warna?: 'samping' | 'sudut' | 'depan' }[]
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
      /** titik berlabel, misalnya titik potong kedua kurva */
      titik?: { x: number; y: number; label?: string }[]
      /**
       * Daerah dipecah di absis ini (garis tegak putus-putus); tiap bagian
       * diberi label dari `labelBagian` ("L₁", "L₂" atau "+", "−") dan
       * bagian di bawah sumbu (fungsi negatif) diwarnai merah.
       */
      pecah?: number[]
      labelBagian?: string[]
      /** satu batang tegak selebar Δx di absis ini, untuk menjelaskan jumlah Riemann */
      strip?: { x: number; label?: string }
      /** keterangan kurva, urutannya fungsi lalu fungsi2 */
      nama?: string[]
    }
  | {
      jenis: 'svg'
      viewBox: string
      /** isi SVG mentah (tanpa tag svg luar) */
      isi: string
    }

/**
 * Satu langkah pembahasan: kalimat utuh, boleh membawa GAMBAR BANTU-nya
 * sendiri (14 Sep 2026, meniru mathcyber1997). Gambar bantu itu gambar baru
 * yang memuat hasil langkahnya (bagan kuadran yang disorot, segitiga acuan
 * berlabel angka, segitiga yang dicabut dari kubus), bukan gambar soal yang
 * diulang. Panel Pembahasan menaruh gambarnya tepat di bawah kalimatnya.
 */
export type Langkah = string | { teks: string; gambar: GambarSoal }

export type SoalKuis = {
  /** dipakai untuk mengingat soal mana yang sudah pernah keluar */
  id: string
  pertanyaan: string
  pilihan: string[]
  /** indeks jawaban benar */
  benar: number
  /** ringkasan satu kalimat; dipakai kuis bab dan sebagai cadangan bila `langkah` kosong */
  alasan: string
  /**
   * Gambar situasi soal. Tampil di bawah soal SEBELUM dijawab (situasinya,
   * tanpa membocorkan jawaban). Wajib untuk soal cerita, bangun, grafik,
   * dan data; soal definisi boleh tanpa gambar. Panel Pembahasan TIDAK
   * mengulangnya (ARYA 14 Sep 2026): yang tampil di sana gambar bantu
   * tiap langkah.
   */
  gambar?: GambarSoal
  /**
   * Kenapa pengecoh terasa masuk akal, satu kalimat per pengecoh yang layak
   * dibahas: "Pilihan D, 3/5, lupa memberi tanda kuadran III."
   */
  jebakan?: string
  /**
   * Langkah penyelesaian bergaya mathcyber1997 (catatan belajar 14 Sep 2026,
   * `PELAJARI BENTUK SOAL MATEMATIKA/CATATAN-BELAJAR-PEMBAHASAN.md` bagian 5):
   * pembuka fakta kunci, pemisalan, alat disebut lalu hitungan penuh, tanda
   * atau syarat dalam kurung, dan penutup "Jadi, ... adalah .... (Jawaban C)".
   * Formal, tanpa "kamu" atau "Anda". `alat/cek_kuis.mjs --ketat` menolak
   * butir tanpa kata kerja penuntun dan penutup tanpa huruf jawaban.
   */
  langkah?: Langkah[]
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
