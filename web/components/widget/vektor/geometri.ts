import { petakSumbu } from '@/lib/petak-sumbu'
/**
 * Matematika vektor dan penskalaan bidang, untuk kesebelas widget Vektor.
 *
 * BERKAS INI SENGAJA TIDAK MENGIMPOR APA PUN.
 * Tanpa impor, Node bisa menjalankannya langsung, sehingga `alat/uji-geometri-vektor.mts`
 * bisa menguji isinya sungguhan. Proyek ini tidak memasang Jest maupun Vitest,
 * jadi inilah satu-satunya cara angka di widget punya jaring pengaman selain
 * mata manusia. Warna dan huruf tinggal di `gaya.ts`, jangan dibawa ke sini.
 */

export type Vek = { x: number; y: number }
export type Jendela = { xMin: number; xMax: number; yMin: number; yMax: number }
export type Kotak = { x0: number; y0: number; x1: number; y1: number }

/* ------------------------------------------------------------------ */
/* Operasi dasar                                                       */
/* ------------------------------------------------------------------ */

export const tambah = (a: Vek, b: Vek): Vek => ({ x: a.x + b.x, y: a.y + b.y })
export const kurang = (a: Vek, b: Vek): Vek => ({ x: a.x - b.x, y: a.y - b.y })
export const kali = (k: number, a: Vek): Vek => ({ x: k * a.x, y: k * a.y })

/** Panjang vektor, lewat Pythagoras. Tidak pernah negatif. */
export const panjang = (a: Vek): number => Math.hypot(a.x, a.y)

/** Hasil kali titik. Hasilnya sebuah angka, bukan vektor. */
export const titik = (a: Vek, b: Vek): number => a.x * b.x + a.y * b.y

/**
 * Vektor satuan: arah yang sama, panjangnya tepat 1.
 *
 * Vektor nol TIDAK punya arah, jadi pembagiannya menghasilkan NaN. NaN di dalam
 * atribut SVG membuat gambarnya lenyap tanpa satu pun pesan galat, dan itu jenis
 * kerusakan yang paling lama dicari sebabnya. Karena itu vektor nol dikembalikan
 * apa adanya.
 */
export function satuan(a: Vek): Vek {
  const p = panjang(a)
  return p === 0 ? { x: 0, y: 0 } : { x: a.x / p, y: a.y / p }
}

/* ------------------------------------------------------------------ */
/* Sudut                                                               */
/* ------------------------------------------------------------------ */

/**
 * Arah vektor dalam derajat, diukur dari sumbu x positif, berlawanan arah jarum
 * jam, hasilnya 0 sampai kurang dari 360. Itu konvensi yang dipakai Buku Guru
 * saat siswa mengukur arah dengan busur.
 */
export function sudutDerajat(a: Vek): number {
  if (a.x === 0 && a.y === 0) return 0
  const derajat = (Math.atan2(a.y, a.x) * 180) / Math.PI
  return derajat < 0 ? derajat + 360 : derajat
}

/**
 * Sudut antara dua vektor, 0 sampai 180 derajat.
 *
 * KENAPA atan2 DAN BUKAN acos
 * Cara yang biasa diajarkan, `acos` dari hasil bagi titik dan panjang, tidak
 * teliti persis di dua tempat yang paling sering muncul di materi ini: saat
 * kedua vektor searah dan saat berlawanan. Di situ hasil baginya mendekati 1
 * atau -1, dan galat pembulatan sekecil apa pun diperbesar oleh `acos` menjadi
 * ribuan kali lipat. Diuji di proyek ini: dua vektor yang jelas-jelas searah
 * menghasilkan 0,0000012 derajat, bukan 0.
 *
 * `atan2` dari besar hasil kali silang terhadap hasil kali titik memberi jawaban
 * yang sama untuk semua sudut, tetapi tepat 0 dan tepat 180 di kedua ujung itu.
 */
export function sudutAntara(a: Vek, b: Vek): number {
  if (panjang(a) === 0 || panjang(b) === 0) return 0
  const silang = Math.abs(a.x * b.y - a.y * b.x)
  return (Math.atan2(silang, titik(a, b)) * 180) / Math.PI
}

/* ------------------------------------------------------------------ */
/* Proyeksi                                                            */
/* ------------------------------------------------------------------ */

/**
 * Panjang proyeksi a pada b. Boleh negatif, dan negatifnya berarti bayangannya
 * jatuh ke arah yang berlawanan dengan b. Itu bukan kesalahan hitung.
 */
export function panjangProyeksi(a: Vek, b: Vek): number {
  const pb = panjang(b)
  return pb === 0 ? 0 : titik(a, b) / pb
}

/** Vektor proyeksi a pada b: bayangannya, lengkap dengan arahnya. */
export function vektorProyeksi(a: Vek, b: Vek): Vek {
  const bb = titik(b, b)
  return bb === 0 ? { x: 0, y: 0 } : kali(titik(a, b) / bb, b)
}

/* ------------------------------------------------------------------ */
/* Jendela tampilan                                                    */
/* ------------------------------------------------------------------ */

/**
 * Jendela yang memuat semua titik DAN berskala sama di kedua sumbu.
 *
 * KENAPA HARUS SEIMBANG, DAN KENAPA INI BEDA DARI JENDELA GRAFIK FUNGSI
 * Untuk grafik fungsi, melebarkan sumbu x dan y sendiri-sendiri itu benar dan
 * berguna. Untuk vektor itu merusak: vektor (3, 4) wajib terlihat sepanjang 5
 * satuan, dan sudut 45 derajat wajib terlihat 45 derajat. Kalau skala kedua
 * sumbu berbeda, segitiga siku-siku terlihat penyok dan gambarnya membantah
 * angka yang sedang diajarkan di sebelahnya.
 *
 * Penyeimbangan dilakukan dengan MELEBARKAN sumbu yang kurang, tidak pernah
 * dengan mempersempit yang lebih. Mempersempit akan memotong gambar, dan widget
 * yang memotong gambarnya sendiri sudah dilarang aturan proyek.
 */
export function jendelaSeimbang(titikTitik: Vek[], nisbahLayar: number, tepi = 0.12): Jendela {
  const layak = titikTitik.filter((t) => Number.isFinite(t.x) && Number.isFinite(t.y))

  let xMin = -1
  let xMax = 1
  let yMin = -1
  let yMax = 1

  if (layak.length > 0) {
    xMin = Infinity
    xMax = -Infinity
    yMin = Infinity
    yMax = -Infinity
    for (const t of layak) {
      if (t.x < xMin) xMin = t.x
      if (t.x > xMax) xMax = t.x
      if (t.y < yMin) yMin = t.y
      if (t.y > yMax) yMax = t.y
    }
  }

  // Lebar nol membuat pembagian jadi tak hingga dan gambarnya hilang sama
  // sekali. Terjadi saat semua titiknya sama, misalnya vektor nol.
  if (xMax - xMin <= 0) {
    const tengah = (xMin + xMax) / 2
    xMin = tengah - 0.5
    xMax = tengah + 0.5
  }
  if (yMax - yMin <= 0) {
    const tengah = (yMin + yMax) / 2
    yMin = tengah - 0.5
    yMax = tengah + 0.5
  }

  // ruang tepi supaya mata panah dan labelnya tidak menempel di batas bingkai
  const lebarAwalX = xMax - xMin
  const lebarAwalY = yMax - yMin
  xMin -= lebarAwalX * tepi
  xMax += lebarAwalX * tepi
  yMin -= lebarAwalY * tepi
  yMax += lebarAwalY * tepi

  const lebarX = xMax - xMin
  const lebarY = yMax - yMin
  const nisbahIsi = lebarX / lebarY

  if (nisbahIsi < nisbahLayar) {
    const tambahan = (lebarY * nisbahLayar - lebarX) / 2
    xMin -= tambahan
    xMax += tambahan
  } else if (nisbahIsi > nisbahLayar) {
    const tambahan = (lebarX / nisbahLayar - lebarY) / 2
    yMin -= tambahan
    yMax += tambahan
  }

  return { xMin, xMax, yMin, yMax }
}

/** Koordinat matematika menjadi koordinat layar SVG. */
export function keLayar(j: Jendela, kotak: Kotak) {
  const lebar = kotak.x1 - kotak.x0
  const tinggi = kotak.y1 - kotak.y0
  return {
    x: (x: number) => kotak.x0 + ((x - j.xMin) / (j.xMax - j.xMin)) * lebar,
    /** sumbu y layar terbalik: nilai besar ada di ATAS */
    y: (y: number) => kotak.y1 - ((y - j.yMin) / (j.yMax - j.yMin)) * tinggi,
  }
}

/**
 * Kebalikan `keLayar`. Dipakai saat siswa menyeret ujung panah: yang diketahui
 * letak jarinya di layar, yang dicari nilai vektornya.
 */
export function keMatematika(j: Jendela, kotak: Kotak) {
  const lebar = kotak.x1 - kotak.x0
  const tinggi = kotak.y1 - kotak.y0
  return {
    x: (sx: number) => j.xMin + ((sx - kotak.x0) / lebar) * (j.xMax - j.xMin),
    y: (sy: number) => j.yMin + ((kotak.y1 - sy) / tinggi) * (j.yMax - j.yMin),
  }
}

/**
 * Menahan titik supaya tidak keluar batas yang diizinkan, lalu membulatkannya
 * ke kelipatan tertentu.
 *
 * Pembulatan bukan sekadar kerapian. Vektor (2,4831; 3,5107) membuat siswa
 * sibuk membaca desimal, padahal yang sedang dipelajari caranya, bukan
 * angkanya. Penahan batasnya juga yang membuat gambar tidak pernah terpotong:
 * kalau titiknya tidak bisa keluar, bingkainya tidak perlu mengejar.
 */
export function tahan(t: Vek, batasX: number, batasY: number, kelipatan = 0.5): Vek {
  const jepit = (n: number, batas: number) => Math.min(batas, Math.max(-batas, n))
  const bulat = (n: number) => Math.round(n / kelipatan) * kelipatan
  return {
    x: bulat(jepit(t.x, batasX)),
    y: bulat(jepit(t.y, batasY)),
  }
}

/* ------------------------------------------------------------------ */
/* Angka dan petak                                                     */
/* ------------------------------------------------------------------ */

/** Angka Indonesia: koma sebagai pemisah desimal, nol di belakang dibuang. */
export function angka(n: number, desimal = 2): string {
  if (!Number.isFinite(n)) return n > 0 ? 'tak hingga' : 'minus tak hingga'
  const s = n.toFixed(desimal)
  const rapi = s.includes('.') ? s.replace(/0+$/, '').replace(/\.$/, '') : s
  // toFixed bisa menghasilkan "-0" pada angka sangat kecil yang negatif, dan
  // "-0" di layar terlihat seperti kesalahan.
  return (rapi === '-0' ? '0' : rapi).replace('.', ',')
}

export type Petak = { nilai: number; label: string }

/**
 * Garis petak yang jumlahnya wajar dengan angka yang enak dibaca: kelipatan
 * 1, 2, atau 5 dikali pangkat sepuluh.
 */
export function petak(min: number, maks: number, target = 6): Petak[] {
  // `target` tidak dipakai lagi. Sejak 5 Sep 2026 banyaknya label tidak
  // ditebak, melainkan dihitung dari ruang: lihat lib/petak-sumbu.ts. Angka
  // 400 adalah panjang kotak gambar yang lazim (viewBox 460 dikurangi tepi);
  // bidang yang tahu panjang sumbunya persis memanggil petakSumbu langsung.
  void target
  return petakSumbu(min, maks, 400)
}

/**
 * Penunjuk skala, wajib ditampilkan tiap widget yang bingkainya bisa berubah.
 * Isinya seberapa lebar bidang yang sedang terlihat, supaya siswa tahu ia
 * sedang mengintip sedekat apa dan tidak kehilangan rasa ukuran.
 */
export function labelSkala(j: Jendela): string {
  const lebar = j.xMax - j.xMin
  const desimal = lebar < 0.01 ? 5 : lebar < 0.1 ? 4 : lebar < 1 ? 3 : 2
  return `lebar tampilan ${angka(lebar, desimal)} satuan`
}

/**
 * Arah mata angin dari sebuah vektor, dibulatkan ke delapan penjuru.
 *
 * Buku Guru meminta siswa membaca arah vektor dengan busur DAN menyebutnya
 * dalam arah mata angin, karena itulah bentuk yang mereka temui di peta dan
 * di soal gerak. Sumbu x positif dianggap timur dan sumbu y positif utara,
 * mengikuti kebiasaan peta.
 */
export function mataAngin(a: Vek): string {
  if (a.x === 0 && a.y === 0) return 'tidak punya arah'
  const nama = [
    'timur', 'timur laut', 'utara', 'barat laut',
    'barat', 'barat daya', 'selatan', 'tenggara',
  ]
  const bagian = Math.round(sudutDerajat(a) / 45) % 8
  return nama[bagian]
}
