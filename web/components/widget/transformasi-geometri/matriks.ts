/**
 * Matematika transformasi geometri, untuk kedua belas widget topik ini.
 *
 * BERKAS INI SENGAJA TIDAK MENGIMPOR APA PUN.
 * Tanpa impor, Node bisa menjalankannya langsung, sehingga
 * `alat/uji-matriks-transformasi.mts` bisa menguji isinya sungguhan. Proyek ini
 * tidak memasang Jest maupun Vitest, jadi inilah satu-satunya jaring pengaman
 * selain mata manusia. Warna dan huruf tinggal di `Papan.tsx`, penskalaan
 * bidang di `papan.ts`, jangan dibawa ke sini.
 *
 * Karena itu pula `papan.ts` tidak diimpor dari sini walaupun keduanya
 * memerlukan tipe `Titik` yang sama: impor berakhiran `.ts` diperlukan Node
 * tetapi ditolak `tsc` (galat TS5097). Tipe `Titik` sengaja dideklarasikan di
 * kedua berkas. TypeScript menyamakan keduanya karena bentuknya sama, jadi
 * pengulangan dua baris ini tidak menimbulkan gesekan apa pun.
 *
 * KESEPAKATAN MATRIKS
 * `{ a, b, c, d }` berarti baris pertama `a b` dan baris kedua `c d`. Kolom
 * pertama adalah tempat mendaratnya titik (1, 0) dan kolom kedua tempat
 * mendaratnya (0, 1). Cara membaca itulah yang diajarkan Materi 09, jadi
 * susunannya tidak boleh diubah tanpa mengubah materinya.
 */

export type Titik = { x: number; y: number }
export type Matriks = { a: number; b: number; c: number; d: number }

/**
 * Membuang tanda minus pada nol.
 *
 * JavaScript membedakan 0 dan -0, dan perkalian seperti `-1 * 0` memberi -0.
 * Angka itu benar secara matematika tetapi tampil sebagai "-0" di tabel angka,
 * dan "-0" terlihat seperti kerusakan program bagi siswa. Karena `-0 === 0`
 * bernilai benar, perbandingan biasa sudah cukup untuk menangkapnya.
 */
const nol = (n: number): number => (n === 0 ? 0 : n)

const titik = (x: number, y: number): Titik => ({ x: nol(x), y: nol(y) })

/** Menulis angka dengan koma Indonesia, hanya untuk `namaTransformasi`. */
function tulisAngka(n: number): string {
  const s = n.toFixed(2)
  const rapi = s.includes('.') ? s.replace(/0+$/, '').replace(/\.$/, '') : s
  return (rapi === '-0' ? '0' : rapi).replace('.', ',')
}

/* ------------------------------------------------------------------ */
/* Operasi matriks (Materi 09)                                         */
/* ------------------------------------------------------------------ */

export const IDENTITAS: Matriks = { a: 1, b: 0, c: 0, d: 1 }

/** Mengenakan matriks pada sebuah titik: baris matriks dikali koordinat. */
export function kenakan(m: Matriks, p: Titik): Titik {
  return titik(m.a * p.x + m.b * p.y, m.c * p.x + m.d * p.y)
}

/**
 * Perkalian dua matriks, dipakai Materi 12.
 *
 * Namanya `m2` dan `m1`, bukan `a` dan `b`, supaya urutannya tidak bisa
 * tertukar tanpa disadari. Kalau `m1` dikerjakan lebih dahulu lalu `m2`, hasil
 * gabungannya `kaliMatriks(m2, m1)`: yang dikerjakan pertama ditulis paling
 * kanan, sebab koordinat titiknya berada di kanan dan dikenai matriks terdekat
 * lebih dulu. Itu jebakan utama topik ini.
 */
export function kaliMatriks(m2: Matriks, m1: Matriks): Matriks {
  return {
    a: nol(m2.a * m1.a + m2.b * m1.c),
    b: nol(m2.a * m1.b + m2.b * m1.d),
    c: nol(m2.c * m1.a + m2.d * m1.c),
    d: nol(m2.c * m1.b + m2.d * m1.d),
  }
}

/**
 * Determinan. Besarnya adalah pengali luas, dan tandanya menyatakan arah putar
 * berbalik atau tidak. Di topik ini determinan hanya DISEBUT, tidak dilatih
 * sebagai prosedur, jadi fungsi ini dipakai untuk keterangan di layar dan untuk
 * uji, bukan untuk soal.
 */
export const determinan = (m: Matriks): number => nol(m.a * m.d - m.b * m.c)

/* ------------------------------------------------------------------ */
/* Sudut yang tepat di kelipatan 90 derajat                            */
/* ------------------------------------------------------------------ */

/**
 * Kosinus dan sinus dalam derajat, yang TEPAT di kelipatan 90.
 *
 * `Math.cos(Math.PI / 2)` bernilai 6,1e-17 dan bukan nol. Debu sebesar itu tak
 * terlihat di gambar, tetapi muncul di tabel angka sebagai koordinat
 * 0,0000000000000001, dan siswa yang membacanya akan menyangka rumusnya salah.
 * Rotasi 90, 180, dan 270 derajat adalah tiga kasus yang paling sering dipakai
 * di materi ini, jadi ketiganya dijawab dari daftar, bukan dihitung.
 */
function cosSin(derajat: number): { cos: number; sin: number } {
  const sisa = ((derajat % 360) + 360) % 360
  if (sisa === 0) return { cos: 1, sin: 0 }
  if (sisa === 90) return { cos: 0, sin: 1 }
  if (sisa === 180) return { cos: -1, sin: 0 }
  if (sisa === 270) return { cos: 0, sin: -1 }
  const radian = (sisa * Math.PI) / 180
  return { cos: Math.cos(radian), sin: Math.sin(radian) }
}

/* ------------------------------------------------------------------ */
/* Matriks tiap transformasi (Materi 10)                               */
/* ------------------------------------------------------------------ */

export const CERMIN_SUMBU_X: Matriks = { a: 1, b: 0, c: 0, d: -1 }
export const CERMIN_SUMBU_Y: Matriks = { a: -1, b: 0, c: 0, d: 1 }
export const CERMIN_Y_SAMA_X: Matriks = { a: 0, b: 1, c: 1, d: 0 }
export const CERMIN_Y_SAMA_MIN_X: Matriks = { a: 0, b: -1, c: -1, d: 0 }

/** Sama dengan matriks rotasi 180 derajat, dan itu bukan kebetulan. */
export const CERMIN_TITIK_ASAL: Matriks = { a: -1, b: 0, c: 0, d: -1 }

export function matriksRotasi(derajat: number): Matriks {
  const { cos, sin } = cosSin(derajat)
  return { a: nol(cos), b: nol(-sin), c: nol(sin), d: nol(cos) }
}

export const matriksDilatasi = (k: number): Matriks => ({ a: nol(k), b: 0, c: 0, d: nol(k) })

/* ------------------------------------------------------------------ */
/* Kelima transformasi, langsung pada titik                            */
/* ------------------------------------------------------------------ */

/** Materi 02. Satu-satunya yang bukan perkalian matriks, melainkan penjumlahan. */
export const translasi = (p: Titik, geser: Titik): Titik => titik(p.x + geser.x, p.y + geser.y)

/** Materi 03. Sumbu X adalah kasus h = 0 dari `cerminGarisDatar`. */
export const cerminSumbuX = (p: Titik): Titik => titik(p.x, -p.y)
export const cerminSumbuY = (p: Titik): Titik => titik(-p.x, p.y)

/** Materi 03. Garis cerminnya tegak, jadi nilai y tidak disentuh. */
export const cerminGarisTegak = (p: Titik, k: number): Titik => titik(2 * k - p.x, p.y)
export const cerminGarisDatar = (p: Titik, h: number): Titik => titik(p.x, 2 * h - p.y)

/** Materi 04. Koordinatnya bertukar tempat. */
export const cerminYSamaX = (p: Titik): Titik => titik(p.y, p.x)
/** Materi 04. Bertukar tempat DAN kedua tandanya berbalik. */
export const cerminYSamaMinX = (p: Titik): Titik => titik(-p.y, -p.x)

/** Materi 05. Pusatnya selalu tepat di tengah antara prapeta dan petanya. */
export const cerminTitik = (p: Titik, pusat: Titik): Titik =>
  titik(2 * pusat.x - p.x, 2 * pusat.y - p.y)

/**
 * Materi 06. Resep tiga langkah untuk pusat mana pun: geser supaya pusatnya
 * pindah ke titik asal, putar, lalu geser kembali. Resep yang sama dipakai
 * `dilatasi`, dan itu resep yang benar-benar diajarkan di halaman, bukan
 * jalan pintas yang hanya ada di dalam program.
 */
export function rotasi(p: Titik, derajat: number, pusat: Titik): Titik {
  const geser = { x: p.x - pusat.x, y: p.y - pusat.y }
  const putar = kenakan(matriksRotasi(derajat), geser)
  return titik(putar.x + pusat.x, putar.y + pusat.y)
}

/** Materi 07. Satu-satunya transformasi di topik ini yang mengubah ukuran. */
export function dilatasi(p: Titik, k: number, pusat: Titik): Titik {
  return titik(pusat.x + k * (p.x - pusat.x), pusat.y + k * (p.y - pusat.y))
}

/* ------------------------------------------------------------------ */
/* Pengukuran, untuk tabel Materi 08                                   */
/* ------------------------------------------------------------------ */

export const jarak = (p: Titik, q: Titik): number => Math.hypot(q.x - p.x, q.y - p.y)

/** Hasil kali silang dua ruas yang berpangkal di `a`. Tandanya arah putarnya. */
const silang = (a: Titik, b: Titik, c: Titik): number =>
  (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)

/** Luas segitiga, tidak pernah negatif. */
export const luasSegitiga = (a: Titik, b: Titik, c: Titik): number => Math.abs(silang(a, b, c)) / 2

/**
 * Arah putar a ke b ke c: 1 berlawanan arah jarum jam, -1 searah jarum jam,
 * 0 kalau ketiganya segaris.
 *
 * Inilah satu-satunya ukuran yang membedakan pencerminan dari keempat
 * transformasi lain, dan pembeda itu yang diajarkan Materi 08. Bayangan tangan
 * kanan adalah tangan kiri; jarak dan sudutnya sama, urutannya yang berbalik.
 */
export function arahPutar(a: Titik, b: Titik, c: Titik): number {
  const s = silang(a, b, c)
  if (Math.abs(s) < 1e-9) return 0
  return s > 0 ? 1 : -1
}

/**
 * Besar sudut di `puncak`, antara ruas ke `a` dan ruas ke `c`, dalam derajat
 * 0 sampai 180.
 *
 * Memakai atan2, bukan acos, dengan alasan yang sama seperti di topik Vektor:
 * acos dari hasil bagi tidak teliti persis di dua tempat yang paling sering
 * muncul, yaitu saat kedua ruas hampir searah dan hampir berlawanan. Di topik
 * ini ketelitian itu bukan kemewahan: Materi 08 mengklaim sudut TIDAK berubah
 * oleh kelima transformasi, dan klaim itu diuji dengan pembandingan angka.
 */
export function sudutDi(a: Titik, puncak: Titik, c: Titik): number {
  const u = { x: a.x - puncak.x, y: a.y - puncak.y }
  const v = { x: c.x - puncak.x, y: c.y - puncak.y }
  if (Math.hypot(u.x, u.y) === 0 || Math.hypot(v.x, v.y) === 0) return 0
  const lintang = Math.abs(u.x * v.y - u.y * v.x)
  const bujur = u.x * v.x + u.y * v.y
  return (Math.atan2(lintang, bujur) * 180) / Math.PI
}

/* ------------------------------------------------------------------ */
/* Transformasi sebagai data, untuk widget yang punya pilihan          */
/* ------------------------------------------------------------------ */

/**
 * Sepuluh transformasi yang bisa dipilih siswa di widget Materi 01, 11, dan 12.
 *
 * Dibuat sebagai data, bukan sepuluh cabang `if` di dalam widget, supaya
 * daftar pilihan, penerapannya, matriksnya, dan namanya di layar tidak bisa
 * berbeda satu sama lain.
 */
export type Transformasi =
  | { jenis: 'translasi'; geser: Titik }
  | { jenis: 'cermin-sumbu-x' }
  | { jenis: 'cermin-sumbu-y' }
  | { jenis: 'cermin-y-sama-x' }
  | { jenis: 'cermin-y-sama-min-x' }
  | { jenis: 'cermin-garis-tegak'; k: number }
  | { jenis: 'cermin-garis-datar'; h: number }
  | { jenis: 'cermin-titik'; pusat: Titik }
  | { jenis: 'rotasi'; derajat: number; pusat: Titik }
  | { jenis: 'dilatasi'; k: number; pusat: Titik }

export function kenakanTransformasi(t: Transformasi, p: Titik): Titik {
  switch (t.jenis) {
    case 'translasi': return translasi(p, t.geser)
    case 'cermin-sumbu-x': return cerminSumbuX(p)
    case 'cermin-sumbu-y': return cerminSumbuY(p)
    case 'cermin-y-sama-x': return cerminYSamaX(p)
    case 'cermin-y-sama-min-x': return cerminYSamaMinX(p)
    case 'cermin-garis-tegak': return cerminGarisTegak(p, t.k)
    case 'cermin-garis-datar': return cerminGarisDatar(p, t.h)
    case 'cermin-titik': return cerminTitik(p, t.pusat)
    case 'rotasi': return rotasi(p, t.derajat, t.pusat)
    case 'dilatasi': return dilatasi(p, t.k, t.pusat)
  }
}

const diTitikAsal = (p: Titik): boolean => p.x === 0 && p.y === 0

/**
 * Matriks 2x2 sebuah transformasi, atau `null` kalau ia tidak punya.
 *
 * `null` DI SINI ADALAH PELAJARANNYA, BUKAN KEKURANGAN PROGRAM.
 * Dua sebab sebuah transformasi tidak punya matriks 2x2 pengali:
 *
 * 1. Translasi memang bukan perkalian, melainkan penjumlahan matriks kolom.
 *    Buku Siswa Kelas XI menaruhnya di bawah judul "Matriks Berkaitan dengan
 *    Translasi", dan yang dimaksud di situ penjumlahan.
 * 2. Pusat atau garis cerminnya tidak melewati titik asal. Perkalian matriks
 *    apa pun memetakan titik asal ke titik asal, jadi transformasi yang
 *    memindahkan titik asal mustahil ditulis begitu.
 *
 * Untuk kasus kedua, resep tiga langkah di `rotasi` dan `dilatasi` tetap
 * berlaku, dan itulah yang diajarkan di halaman.
 */
export function matriksDari(t: Transformasi): Matriks | null {
  switch (t.jenis) {
    case 'translasi': return null
    case 'cermin-sumbu-x': return CERMIN_SUMBU_X
    case 'cermin-sumbu-y': return CERMIN_SUMBU_Y
    case 'cermin-y-sama-x': return CERMIN_Y_SAMA_X
    case 'cermin-y-sama-min-x': return CERMIN_Y_SAMA_MIN_X
    case 'cermin-garis-tegak': return t.k === 0 ? CERMIN_SUMBU_Y : null
    case 'cermin-garis-datar': return t.h === 0 ? CERMIN_SUMBU_X : null
    case 'cermin-titik': return diTitikAsal(t.pusat) ? CERMIN_TITIK_ASAL : null
    case 'rotasi': return diTitikAsal(t.pusat) ? matriksRotasi(t.derajat) : null
    case 'dilatasi': return diTitikAsal(t.pusat) ? matriksDilatasi(t.k) : null
  }
}

/** Nama yang dibaca siswa di daftar pilihan dan di tabel angka. */
export function namaTransformasi(t: Transformasi): string {
  const tulisTitik = (p: Titik) => `(${tulisAngka(p.x)}, ${tulisAngka(p.y)})`
  const diPusat = (p: Titik) => (diTitikAsal(p) ? 'titik asal' : `titik ${tulisTitik(p)}`)
  switch (t.jenis) {
    case 'translasi': return `translasi ${tulisTitik(t.geser)}`
    case 'cermin-sumbu-x': return 'cermin pada sumbu X'
    case 'cermin-sumbu-y': return 'cermin pada sumbu Y'
    case 'cermin-y-sama-x': return 'cermin pada garis y = x'
    case 'cermin-y-sama-min-x': return 'cermin pada garis y = -x'
    case 'cermin-garis-tegak':
      return t.k === 0 ? 'cermin pada sumbu Y' : `cermin pada garis x = ${tulisAngka(t.k)}`
    case 'cermin-garis-datar':
      return t.h === 0 ? 'cermin pada sumbu X' : `cermin pada garis y = ${tulisAngka(t.h)}`
    case 'cermin-titik': return `cermin pada ${diPusat(t.pusat)}`
    case 'rotasi': return `rotasi ${tulisAngka(t.derajat)} derajat terhadap ${diPusat(t.pusat)}`
    case 'dilatasi': return `dilatasi faktor ${tulisAngka(t.k)} terhadap ${diPusat(t.pusat)}`
  }
}
