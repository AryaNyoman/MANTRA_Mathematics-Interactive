import { WARNA } from '@/lib/warna'

/**
 * Mesin gambar ruang tiga dimensi untuk widget topik Ruang 3D.
 *
 * KENAPA ADA, DAN KENAPA BUKAN three.js
 * -------------------------------------
 * Keputusan ARYA 1 September 2026: widget 3D digambar sendiri dengan SVG,
 * bukan dengan pustaka 3D. Alasannya bukan gengsi. Yang digambar topik ini cuma
 * rusuk, bidang tembus pandang, dan label huruf. Untuk itu three.js berarti
 * mengunduh paket besar ke HP tiap siswa hanya untuk menggambar garis, dan gaya
 * "Studio Teknis" tetap harus dipaksakan ulang dari nol.
 *
 * Yang benar benar dibutuhkan cuma dua: memutar titik, dan memproyeksikannya ke
 * layar. Keduanya ada di berkas ini, dan hasilnya tetap bisa diputar dengan jari.
 * Yang tidak ada: bayangan dan perspektif. Buku matematika juga tidak memakainya.
 *
 * Berkas ini sejajar dengan `components/widget/limit/koordinat.ts`, dan sengaja
 * meniru pembagiannya supaya orang yang sudah membaca widget Limit tidak perlu
 * belajar susunan baru.
 */

/* ------------------------------------------------------------------ */
/* Ukuran bidang gambar                                                */
/* ------------------------------------------------------------------ */

/** Ukuran bidang gambar SVG. Sama untuk semua widget Ruang 3D supaya seragam. */
export const VW = 460
export const VH = 320

/**
 * Ruang tepi. Lebih longgar daripada widget datar sebab label huruf sudut
 * (A sampai H) ditulis DI LUAR titiknya, dan huruf yang terpotong tepi adalah
 * cacat yang persis dilarang aturan proyek.
 */
export const TEPI = { kiri: 26, kanan: 26, atas: 24, bawah: 34 }

export const KOTAK = {
  x0: TEPI.kiri,
  y0: TEPI.atas,
  x1: VW - TEPI.kanan,
  y1: VH - TEPI.bawah,
}

export const GARIS_PETAK = '#D6CDBC'
export const MONO = 'var(--font-plex-mono), monospace'
export { WARNA }

/* ------------------------------------------------------------------ */
/* Titik dan sudut pandang                                             */
/* ------------------------------------------------------------------ */

/** Satu titik di ruang: x ke kanan, y menjauh, z ke atas. */
export type Titik3 = readonly [number, number, number]

/**
 * Sudut pandang kamera, dalam derajat.
 *
 * `mendatar` memutari benda seperti orang berjalan mengelilinginya.
 * `menunduk` menaikkan mata: 0 berarti sejajar lantai, 90 berarti tepat dari atas.
 */
export type Sudut = { mendatar: number; menunduk: number }

/**
 * Sudut pandang awal, dipakai SEMUA widget dan juga tombol kembalikan tampilan.
 *
 * Nilainya sengaja bukan bulat: pada 45 derajat rusuk belakang bersembunyi tepat
 * di belakang rusuk depan, sehingga kubus terlihat seperti persegi biasa dan
 * kesan ruangnya hilang.
 */
export const SUDUT_AWAL: Sudut = { mendatar: -34, menunduk: 22 }

/** Batas menunduk. Di luar ini kubus terbalik dan siswa kehilangan arah. */
export const BATAS_MENUNDUK = { min: -8, maks: 78 }

const RAD = Math.PI / 180

export function jepitMenunduk(nilai: number): number {
  return Math.min(BATAS_MENUNDUK.maks, Math.max(BATAS_MENUNDUK.min, nilai))
}

/* ------------------------------------------------------------------ */
/* Bola pembungkus                                                     */
/* ------------------------------------------------------------------ */

/**
 * Bola terkecil yang membungkus semua titik, dipakai sebagai bingkai.
 *
 * KENAPA BOLA, BUKAN KOTAK
 * Aturan proyek: bingkai wajib menyesuaikan otomatis supaya widget tidak pernah
 * memotong gambarnya sendiri. Cara paling lurus adalah menghitung kotak batas
 * dari titik-titik yang SUDAH diputar. Tetapi kotak itu berubah ukuran tiap kali
 * benda diputar, sehingga kubusnya akan mengembang dan mengempis sendiri selama
 * ditarik. Itu membingungkan, dan membuat penunjuk skala berubah terus.
 *
 * Bola pembungkus tidak berubah saat benda diputar, sebab jarak ke pusat tidak
 * dipengaruhi putaran. Jadi gambarnya dijamin tidak pernah terpotong DAN
 * skalanya tetap, dua duanya sekaligus.
 */
export type Bola = { pusat: Titik3; jari: number }

export function bolaMuat(titik: readonly Titik3[], tepi = 1.06): Bola {
  const layak = titik.filter((p) => p.every(Number.isFinite))
  if (layak.length === 0) return { pusat: [0, 0, 0], jari: 1 }

  let xMin = Infinity, yMin = Infinity, zMin = Infinity
  let xMaks = -Infinity, yMaks = -Infinity, zMaks = -Infinity
  for (const [x, y, z] of layak) {
    if (x < xMin) xMin = x
    if (x > xMaks) xMaks = x
    if (y < yMin) yMin = y
    if (y > yMaks) yMaks = y
    if (z < zMin) zMin = z
    if (z > zMaks) zMaks = z
  }

  const pusat: Titik3 = [(xMin + xMaks) / 2, (yMin + yMaks) / 2, (zMin + zMaks) / 2]
  let jari = 0
  for (const p of layak) {
    const d = Math.hypot(p[0] - pusat[0], p[1] - pusat[1], p[2] - pusat[2])
    if (d > jari) jari = d
  }
  // Benda yang seluruh titiknya berimpit tetap diberi jari-jari, sebab jari-jari
  // nol membuat pembagian jadi tak hingga dan gambarnya hilang sama sekali.
  return { pusat, jari: (jari || 1) * tepi }
}

/* ------------------------------------------------------------------ */
/* Kamera                                                              */
/* ------------------------------------------------------------------ */

export type Kamera = {
  /** koordinat SVG untuk sebuah titik ruang */
  layar: (p: Titik3) => { x: number; y: number }
  /**
   * Seberapa DEKAT titik itu ke mata. Makin besar makin dekat.
   * Dipakai untuk mengurutkan gambar: yang jauh digambar lebih dulu.
   */
  dekat: (p: Titik3) => number
  /** piksel per satuan panjang */
  skala: number
  /** wajib ditampilkan, aturan proyek soal penunjuk skala */
  labelSkala: string
  sudut: Sudut
}

/**
 * Siapkan kamera untuk satu bingkai gambar.
 *
 * Proyeksinya ortografis, artinya benda yang jauh TIDAK mengecil. Itu memang
 * yang dipakai gambar geometri di buku, dan justru penting di sini: kalau jauh
 * mengecil, dua rusuk yang sama panjang akan tampil beda panjang dan siswa
 * mengira ukurannya memang beda.
 */
export function kamera(bola: Bola, sudut: Sudut): Kamera {
  const t = sudut.mendatar * RAD
  const f = jepitMenunduk(sudut.menunduk) * RAD
  const st = Math.sin(t), ct = Math.cos(t)
  const sf = Math.sin(f), cf = Math.cos(f)

  // Tiga arah kamera. `mata` menunjuk dari benda ke mata, `kanan` arah kanan
  // layar, `atas` arah atas layar. Ketiganya saling tegak lurus.
  const mata: Titik3 = [cf * st, -cf * ct, sf]
  const kanan: Titik3 = [ct, st, 0]
  const atas: Titik3 = [-sf * st, sf * ct, cf]

  const lebar = KOTAK.x1 - KOTAK.x0
  const tinggi = KOTAK.y1 - KOTAK.y0
  const skala = Math.min(lebar, tinggi) / (2 * bola.jari)

  const tengahX = (KOTAK.x0 + KOTAK.x1) / 2
  const tengahY = (KOTAK.y0 + KOTAK.y1) / 2

  const relatif = (p: Titik3): Titik3 => [
    p[0] - bola.pusat[0],
    p[1] - bola.pusat[1],
    p[2] - bola.pusat[2],
  ]

  return {
    layar(p) {
      const q = relatif(p)
      return {
        x: tengahX + skala * (q[0] * kanan[0] + q[1] * kanan[1] + q[2] * kanan[2]),
        // sumbu y layar terbalik: nilai besar ada di ATAS
        y: tengahY - skala * (q[0] * atas[0] + q[1] * atas[1] + q[2] * atas[2]),
      }
    },
    dekat(p) {
      const q = relatif(p)
      return q[0] * mata[0] + q[1] * mata[1] + q[2] * mata[2]
    },
    skala,
    labelSkala: `lebar tampilan ${bulat(lebar / skala, 2)} satuan`,
    sudut: { mendatar: sudut.mendatar, menunduk: jepitMenunduk(sudut.menunduk) },
  }
}

/** Angka Indonesia: koma sebagai pemisah desimal, nol di belakang dibuang. */
export function bulat(n: number, desimal = 2): string {
  if (!Number.isFinite(n)) return '-'
  const s = n.toFixed(desimal)
  const rapi = s.includes('.') ? s.replace(/0+$/, '').replace(/\.$/, '') : s
  return rapi.replace('.', ',')
}

/* ------------------------------------------------------------------ */
/* Sisi: menghadap kita atau membelakangi                              */
/* ------------------------------------------------------------------ */

function kurang(a: Titik3, b: Titik3): Titik3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
}

export function silang(a: Titik3, b: Titik3): Titik3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ]
}

export function panjang(a: Titik3): number {
  return Math.hypot(a[0], a[1], a[2])
}

/**
 * Benar kalau sisi itu menghadap ke mata.
 *
 * Titik sudut sisi WAJIB diurutkan berlawanan arah jarum jam dilihat dari LUAR
 * benda. `SISI_KUBUS` di bawah sudah diurutkan begitu. Kalau urutannya terbalik,
 * hasilnya juga terbalik, dan rusuk yang terhalang akan digambar utuh, persis
 * kesalahan gambar yang paling merusak di topik ini.
 */
export function sisiMenghadap(sisi: readonly Titik3[], kam: Kamera): boolean {
  if (sisi.length < 3) return true
  const n = silang(kurang(sisi[1], sisi[0]), kurang(sisi[2], sisi[1]))
  const p = sisi[0]
  // Nilai `dekat` sebuah arah dihitung dari titik pusat, jadi arah normalnya
  // dibandingkan sebagai selisih dua titik supaya pergeseran pusat tidak ikut.
  const ujung: Titik3 = [p[0] + n[0], p[1] + n[1], p[2] + n[2]]
  return kam.dekat(ujung) - kam.dekat(p) > 1e-9
}

/* ------------------------------------------------------------------ */
/* Kubus dan balok siap pakai                                          */
/* ------------------------------------------------------------------ */

export type Bangun = {
  titik: Record<string, Titik3>
  /** 12 rusuk, ditulis sebagai pasangan nama titik */
  rusuk: readonly (readonly [string, string])[]
  /** 6 sisi, tiap sisi berisi nama titiknya berlawanan arah jarum jam dari luar */
  sisi: readonly { nama: string; titik: readonly string[] }[]
}

/**
 * Balok ABCD.EFGH mengikuti penamaan buku Indonesia: alas ABCD, tutup EFGH,
 * A tepat di bawah E.
 *
 * Urutan ini WAJIB sama dengan `alat/cek_ruang.py`. Kalau berbeda, jawabannya
 * akan benar menurut mesin tetapi salah menurut gambar, dan itu jenis kesalahan
 * yang paling sulit ketahuan.
 */
export function balok(p: number, l: number, t: number): Bangun {
  return {
    titik: {
      A: [0, 0, 0], B: [p, 0, 0], C: [p, l, 0], D: [0, l, 0],
      E: [0, 0, t], F: [p, 0, t], G: [p, l, t], H: [0, l, t],
    },
    rusuk: RUSUK_BALOK,
    sisi: SISI_BALOK,
  }
}

export function kubus(rusuk: number): Bangun {
  return balok(rusuk, rusuk, rusuk)
}

export const RUSUK_BALOK = [
  ['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'],
  ['E', 'F'], ['F', 'G'], ['G', 'H'], ['H', 'E'],
  ['A', 'E'], ['B', 'F'], ['C', 'G'], ['D', 'H'],
] as const

export const SISI_BALOK = [
  { nama: 'alas', titik: ['A', 'D', 'C', 'B'] },
  { nama: 'tutup', titik: ['E', 'F', 'G', 'H'] },
  { nama: 'depan', titik: ['A', 'B', 'F', 'E'] },
  { nama: 'belakang', titik: ['D', 'H', 'G', 'C'] },
  { nama: 'kiri', titik: ['A', 'E', 'H', 'D'] },
  { nama: 'kanan', titik: ['B', 'C', 'G', 'F'] },
] as const

/**
 * Rusuk mana yang terhalang badan bendanya sendiri.
 *
 * Untuk benda cembung seperti kubus dan balok aturannya pasti: sebuah rusuk
 * terhalang kalau KEDUA sisi yang memilikinya membelakangi mata. Hasilnya
 * dipakai untuk menggambar rusuk itu putus putus, seperti gambar di buku.
 */
export function rusukTerhalang(b: Bangun, kam: Kamera): Set<string> {
  const menghadap = new Map<string, boolean>()
  for (const s of b.sisi) {
    menghadap.set(s.nama, sisiMenghadap(s.titik.map((n) => b.titik[n]), kam))
  }

  const terhalang = new Set<string>()
  for (const [a, z] of b.rusuk) {
    const pemilik = b.sisi.filter(
      (s) => s.titik.includes(a) && s.titik.includes(z),
    )
    if (pemilik.length > 0 && pemilik.every((s) => !menghadap.get(s.nama))) {
      terhalang.add(kunciRusuk(a, z))
    }
  }
  return terhalang
}

/** Nama rusuk yang tidak bergantung urutan, jadi AB dan BA dianggap sama. */
export function kunciRusuk(a: string, b: string): string {
  return a < b ? `${a}${b}` : `${b}${a}`
}

/* ------------------------------------------------------------------ */
/* Hitungan yang dipakai widget                                        */
/* ------------------------------------------------------------------ */

/**
 * Jarak dua garis bersilangan.
 *
 * Ditulis ulang di sini karena widget perlu menampilkan angkanya secara hidup,
 * dan `alat/cek_ruang.py` tidak bisa dipanggil dari peramban. Angka yang keluar
 * dari sini WAJIB dicocokkan dengan alat itu sebelum dipasang ke materi, bukan
 * dipercaya begitu saja.
 */
export function jarakDuaGaris(
  a1: Titik3, a2: Titik3, b1: Titik3, b2: Titik3,
): number {
  const u = kurang(a2, a1)
  const v = kurang(b2, b1)
  const n = silang(u, v)
  const w = kurang(b1, a1)
  const besar = panjang(n)
  if (besar < 1e-12) {
    // sejajar: jatuh kembali ke jarak titik ke garis
    const c = silang(w, u)
    return panjang(c) / (panjang(u) || 1)
  }
  return Math.abs(w[0] * n[0] + w[1] * n[1] + w[2] * n[2]) / besar
}

export type Kedudukan = 'berpotongan' | 'sejajar' | 'bersilangan' | 'berimpit'

/** Kedudukan dua garis. Kata-katanya sama persis dengan `alat/cek_ruang.py`. */
export function kedudukanDuaGaris(
  a1: Titik3, a2: Titik3, b1: Titik3, b2: Titik3,
): Kedudukan {
  const u = kurang(a2, a1)
  const v = kurang(b2, b1)
  const w = kurang(b1, a1)
  const n = silang(u, v)
  if (panjang(n) < 1e-12) {
    return panjang(silang(w, u)) < 1e-12 ? 'berimpit' : 'sejajar'
  }
  const campur = w[0] * n[0] + w[1] * n[1] + w[2] * n[2]
  return Math.abs(campur) < 1e-9 ? 'berpotongan' : 'bersilangan'
}
