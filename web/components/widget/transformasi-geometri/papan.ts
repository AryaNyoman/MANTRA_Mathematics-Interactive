/**
 * Penskalaan bidang koordinat dan pemformatan angka, untuk kedua belas widget
 * Transformasi Geometri.
 *
 * BERKAS INI SENGAJA TIDAK MENGIMPOR APA PUN, dengan alasan yang sama seperti
 * `matriks.ts`: supaya `alat/uji-matriks-transformasi.mts` bisa dijalankan Node
 * langsung tanpa bundler. Karena itu tipe `Titik` dideklarasikan ulang di sini
 * dan tidak diambil dari `matriks.ts`. TypeScript menyamakan keduanya karena
 * bentuknya sama.
 *
 * KENAPA ISINYA MIRIP `widget/vektor/geometri.ts`
 * Isinya memang disalin dari sana dan disesuaikan. Tiga pilihan
 * dipertimbangkan, dan alasan lengkapnya tercatat di bagian 4 spesifikasi
 * `docs/superpowers/specs/2026-09-03-transformasi-geometri-alur-belajar.md`.
 * Ringkasnya: mengimpor lintas folder topik adalah masalah yang pernah
 * memaksa pemindahan tipe isi ke `content/tipe.ts`, sedangkan memindahkan
 * berkas ini ke folder bersama berarti mengubah impor di enam topik lain yang
 * sedang dipegang lima sesi paralel dan sedang ditulis ulang MASTER. Ada
 * pengulangan kode, dan itu harga yang diambil sadar.
 */

export type Titik = { x: number; y: number }
export type Jendela = { xMin: number; xMax: number; yMin: number; yMax: number }
export type Kotak = { x0: number; y0: number; x1: number; y1: number }

const nol = (n: number): number => (n === 0 ? 0 : n)

/* ------------------------------------------------------------------ */
/* Jendela tampilan                                                    */
/* ------------------------------------------------------------------ */

/**
 * Jendela yang memuat semua titik DAN berskala sama di kedua sumbu.
 *
 * KENAPA SKALANYA WAJIB SAMA DI KEDUA SUMBU
 * Untuk grafik fungsi, melebarkan sumbu x dan y sendiri-sendiri itu berguna.
 * Di topik ini itu merusak seluruh pelajaran. Pencerminan harus TERLIHAT
 * seperti pencerminan: jarak titik ke garis cermin dan jarak bayangannya wajib
 * tampak sama panjang. Rotasi 90 derajat harus tampak tegak lurus. Kalau skala
 * kedua sumbu berbeda, sebuah rotasi akan tampak seperti pemenyokan, dan
 * gambarnya membantah rumus yang sedang dibaca siswa di sebelahnya.
 *
 * KENAPA MELEBARKAN, TIDAK PERNAH MEMPERSEMPIT
 * Mempersempit sumbu yang berlebih akan memotong gambar. Widget yang memotong
 * gambarnya sendiri dilarang aturan proyek, dan di topik ini pelanggarannya
 * paling mudah terjadi: dilatasi faktor 3 melempar bentuknya jauh keluar
 * layar, begitu pula translasi besar.
 *
 * CARA PAKAINYA DI TOPIK INI
 * Yang dikirim ke fungsi ini adalah gabungan prapeta DAN petanya, bukan salah
 * satu. Kalau hanya petanya yang dihitung, prapetanya akan tergeser keluar
 * bingkai persis pada saat siswa perlu membandingkan keduanya.
 */
export function jendelaSeimbang(titikTitik: Titik[], nisbahLayar: number, tepi = 0.14): Jendela {
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

  // Lebar nol membuat pembagian jadi tak hingga dan gambarnya lenyap tanpa satu
  // pun pesan galat. Di topik ini kejadiannya nyata: dilatasi faktor nol
  // meruntuhkan seluruh bentuk ke satu titik.
  if (xMax - xMin <= 0) {
    const tengah = (xMin + xMax) / 2
    xMin = tengah - 1
    xMax = tengah + 1
  }
  if (yMax - yMin <= 0) {
    const tengah = (yMin + yMax) / 2
    yMin = tengah - 1
    yMax = tengah + 1
  }

  // Ruang tepi supaya label titik A' dan angka jarak tidak menempel di bingkai.
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

/**
 * Pengubah satu sumbu, hasil `keLayar` maupun `keMatematika`.
 *
 * Diberi nama supaya komponen seperti `Bentuk.tsx` bisa menerimanya sebagai
 * satu prop bertipe jelas, bukan sebagai dua fungsi lepas.
 */
export type Pemeta = { x: (n: number) => number; y: (n: number) => number }

/** Koordinat matematika menjadi koordinat layar SVG. */
export function keLayar(j: Jendela, kotak: Kotak): Pemeta {
  const lebar = kotak.x1 - kotak.x0
  const tinggi = kotak.y1 - kotak.y0
  return {
    x: (x: number) => kotak.x0 + ((x - j.xMin) / (j.xMax - j.xMin)) * lebar,
    /** sumbu y layar terbalik: nilai besar ada di ATAS */
    y: (y: number) => kotak.y1 - ((y - j.yMin) / (j.yMax - j.yMin)) * tinggi,
  }
}

/**
 * Kebalikan `keLayar`. Dipakai saat siswa menyeret pusat rotasi, garis cermin,
 * atau ujung vektor translasi: yang diketahui letak jarinya di layar, yang
 * dicari nilai matematikanya.
 */
export function keMatematika(j: Jendela, kotak: Kotak): Pemeta {
  const lebar = kotak.x1 - kotak.x0
  const tinggi = kotak.y1 - kotak.y0
  return {
    x: (sx: number) => j.xMin + ((sx - kotak.x0) / lebar) * (j.xMax - j.xMin),
    y: (sy: number) => j.yMin + ((kotak.y1 - sy) / tinggi) * (j.yMax - j.yMin),
  }
}

/**
 * Menahan titik di dalam batas yang diizinkan, lalu membulatkannya ke
 * kelipatan tertentu.
 *
 * Pembulatan bukan kerapian belaka. Pusat rotasi di (1,4831; -0,5107) membuat
 * siswa sibuk membaca desimal, padahal yang sedang dipelajari akibat memindah
 * pusatnya, bukan angkanya. Penahan batas juga menjaga jendela tidak melebar
 * tak terkendali saat siswa menarik sesuatu jauh ke luar.
 */
export function tahan(t: Titik, batasX: number, batasY: number, kelipatan = 0.5): Titik {
  const jepit = (n: number, batas: number) => Math.min(batas, Math.max(-batas, n))
  const bulat = (n: number) => Math.round(n / kelipatan) * kelipatan
  return {
    x: nol(bulat(jepit(t.x, batasX))),
    y: nol(bulat(jepit(t.y, batasY))),
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
  // "-0" di layar terlihat seperti kesalahan program.
  return (rapi === '-0' ? '0' : rapi).replace('.', ',')
}

export type Petak = { nilai: number; label: string }

/**
 * Garis petak dengan angka yang enak dibaca: kelipatan 1, 2, atau 5 dikali
 * pangkat sepuluh.
 *
 * Sumbu di topik ini WAJIB berangka. Aturan tetap MANTRA, dan di sini
 * alasannya lebih tajam daripada di topik lain: seluruh pelajaran adalah
 * tentang koordinat sebuah titik berubah menjadi apa, dan itu tidak bisa
 * dibaca dari sumbu yang tidak bernomor.
 */
export function petak(min: number, maks: number, target = 6): Petak[] {
  const rentang = maks - min
  if (!Number.isFinite(rentang) || rentang <= 0) return []

  const kasar = rentang / target
  const pangkat = Math.pow(10, Math.floor(Math.log10(kasar)))
  const sisa = kasar / pangkat
  const langkah = (sisa >= 5 ? 10 : sisa >= 2 ? 5 : sisa >= 1 ? 2 : 1) * pangkat

  const desimal = Math.max(0, -Math.floor(Math.log10(langkah)))
  const hasil: Petak[] = []
  for (let n = Math.ceil(min / langkah) * langkah; n <= maks + langkah * 1e-9; n += langkah) {
    const nilai = Math.abs(n) < langkah * 1e-9 ? 0 : n
    hasil.push({ nilai, label: angka(nilai, desimal) })
  }
  return hasil
}

/**
 * Penunjuk skala, wajib ditampilkan tiap widget yang bingkainya bisa berubah.
 *
 * Di topik ini bingkainya berubah terus, sebab dilatasi dan translasi memang
 * mengubah ukuran daerah yang perlu terlihat. Tanpa penunjuk ini siswa tidak
 * punya cara membedakan "bentuknya membesar" dari "kameranya menjauh", dan
 * kedua hal itu berbeda arti sepenuhnya di Materi 07.
 */
export function labelSkala(j: Jendela): string {
  const lebar = j.xMax - j.xMin
  const desimal = lebar < 0.01 ? 5 : lebar < 0.1 ? 4 : lebar < 1 ? 3 : 2
  return `lebar tampilan ${angka(lebar, desimal)} satuan`
}
