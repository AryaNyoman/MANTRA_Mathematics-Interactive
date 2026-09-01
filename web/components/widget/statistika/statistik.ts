/**
 * Hitungan statistika untuk widget Statistika.
 *
 * KENAPA ADA
 * Widget di topik ini menghitung ulang setiap kali siswa menyeret satu titik,
 * jadi angkanya tidak bisa ditulis di depan seperti angka di dalam teks. Yang
 * bisa dijamin adalah CARANYA, dan cara itu harus sama persis dengan
 * `alat/cek_statistik.py`. Kalau keduanya berbeda, siswa melihat satu angka di
 * layar sementara angka yang saya periksa lain, dan tidak ada yang menyadarinya.
 *
 * Karena itu berkas ini punya pasangan pemeriksa silang di
 * `alat/cek_statistik_web.mjs`, yang menjalankan berkas ini dengan data dan
 * klaim yang sama seperti versi Python.
 *
 * CARA KUARTIL
 * Mengikuti kurikulum: median membelah data, lalu Q1 dan Q3 adalah median
 * belahan kiri dan kanan, TANPA menyertakan median itu sendiri kalau banyak
 * datanya ganjil. Sumbernya Buku Panduan Guru Matematika SMA/SMK Kelas X,
 * Dicky Susanto dkk, Kemendikbudristek 2021, halaman 227 sampai 228.
 */

export type Kelas = {
  label: string
  /** tepi bawah kelas, bukan batas yang tertulis di tabel */
  bawah: number
  atas: number
  f: number
}

export type RingkasTunggal = {
  n: number
  jumlah: number
  mean: number
  median: number
  /** boleh berisi lebih dari satu, dan boleh kosong kalau semua sama seringnya */
  modus: number[]
  min: number
  maks: number
  jangkauan: number
  varian: number
  simpanganBaku: number
  q1: number
  q2: number
  q3: number
  jak: number
  pagarBawah: number
  pagarAtas: number
  pencilan: number[]
}

/** Salinan terurut, supaya data aslinya tidak ikut berubah urutannya. */
export const terurut = (data: number[]): number[] => [...data].sort((a, b) => a - b)

export function median(urut: number[]): number {
  const n = urut.length
  if (n === 0) return NaN
  const tengah = Math.floor(n / 2)
  return n % 2 === 1 ? urut[tengah] : (urut[tengah - 1] + urut[tengah]) / 2
}

/** Q1, Q2, Q3 dengan cara kurikulum. Butuh sedikitnya 4 data. */
export function kuartil(urut: number[]): [number, number, number] {
  const n = urut.length
  if (n < 4) {
    const m = median(urut)
    return [m, m, m]
  }
  const tengah = Math.floor(n / 2)
  const kiri = urut.slice(0, tengah)
  const kanan = n % 2 === 1 ? urut.slice(tengah + 1) : urut.slice(tengah)
  return [median(kiri), median(urut), median(kanan)]
}

export function modus(urut: number[]): number[] {
  if (urut.length === 0) return []
  const sering = new Map<number, number>()
  for (const x of urut) sering.set(x, (sering.get(x) ?? 0) + 1)
  const puncak = Math.max(...sering.values())
  // kalau semua nilai muncul sama seringnya, datanya tidak punya modus
  if (puncak <= 1) return []
  return [...sering.entries()].filter(([, v]) => v === puncak).map(([k]) => k).sort((a, b) => a - b)
}

export function ringkasTunggal(data: number[]): RingkasTunggal {
  const urut = terurut(data)
  const n = urut.length
  const jumlah = urut.reduce((a, b) => a + b, 0)
  const mean = n === 0 ? NaN : jumlah / n
  // varian populasi, pembagi n, sesuai buku SMA
  const varian = n === 0 ? NaN : urut.reduce((a, x) => a + (x - mean) ** 2, 0) / n
  const [q1, q2, q3] = kuartil(urut)
  const jak = q3 - q1
  const pagarBawah = q1 - 1.5 * jak
  const pagarAtas = q3 + 1.5 * jak

  return {
    n,
    jumlah,
    mean,
    median: q2,
    modus: modus(urut),
    min: urut[0],
    maks: urut[n - 1],
    jangkauan: urut[n - 1] - urut[0],
    varian,
    simpanganBaku: Math.sqrt(varian),
    q1, q2, q3, jak, pagarBawah, pagarAtas,
    pencilan: urut.filter((x) => x < pagarBawah || x > pagarAtas),
  }
}

export type RingkasKelompok = {
  n: number
  mean: number
  modus: number
  median: number
  q1: number
  q2: number
  q3: number
  jak: number
  varian: number
  simpanganBaku: number
  /** titik tengah tiap kelas, dipakai widget untuk menandai wakil kelasnya */
  tengah: number[]
  /** frekuensi kumulatif sampai dan termasuk kelas ke-i */
  kumulatif: number[]
}

export function ringkasKelompok(kelas: Kelas[]): RingkasKelompok {
  const freq = kelas.map((k) => k.f)
  const n = freq.reduce((a, b) => a + b, 0)
  const tengah = kelas.map((k) => (k.bawah + k.atas) / 2)
  const panjang = kelas.map((k) => k.atas - k.bawah)
  const mean = tengah.reduce((a, t, i) => a + t * freq[i], 0) / n

  const kumulatif: number[] = []
  let jalan = 0
  for (const f of freq) {
    jalan += f
    kumulatif.push(jalan)
  }

  // modus lewat kesebangunan di dalam batang tertinggi
  const i = freq.indexOf(Math.max(...freq))
  const d1 = freq[i] - (i > 0 ? freq[i - 1] : 0)
  const d2 = freq[i] - (i + 1 < freq.length ? freq[i + 1] : 0)
  const nilaiModus = d1 + d2 === 0 ? tengah[i] : kelas[i].bawah + (d1 / (d1 + d2)) * panjang[i]

  /** Interpolasi: masuk ke dalam kelas sejauh bagian yang masih kurang. */
  const letak = (bagian: number): number => {
    const sasaran = bagian * n
    let lewat = 0
    for (let j = 0; j < freq.length; j++) {
      if (freq[j] > 0 && lewat + freq[j] >= sasaran) {
        return kelas[j].bawah + ((sasaran - lewat) / freq[j]) * panjang[j]
      }
      lewat += freq[j]
    }
    return kelas[kelas.length - 1].atas
  }

  const varian = tengah.reduce((a, t, i2) => a + (t - mean) ** 2 * freq[i2], 0) / n
  const q1 = letak(0.25)
  const q3 = letak(0.75)

  return {
    n, mean, modus: nilaiModus,
    median: letak(0.5), q1, q2: letak(0.5), q3, jak: q3 - q1,
    varian, simpanganBaku: Math.sqrt(varian),
    tengah, kumulatif,
  }
}

export type Regresi = {
  n: number
  meanX: number
  meanY: number
  /** kemiringan garis, huruf b pada tulisan y-topi = a + bx */
  gradien: number
  /** perpotongan dengan sumbu tegak, huruf a pada tulisan yang sama */
  konstanta: number
  /** korelasi product moment, antara -1 dan 1 */
  r: number
  /** koefisien determinasi */
  r2: number
  /** jarak tegak tiap titik ke garis, urut sesuai pasangannya */
  residu: number[]
  /** jumlah kuadrat residu, angka yang dikecilkan metode kuadrat terkecil */
  jumlahKuadratResidu: number
}

/**
 * Garis regresi kuadrat terkecil dan korelasinya.
 *
 * Namanya `gradien` dan `konstanta`, bukan a dan b. Buku sendiri mencatat
 * tertukarnya a dan b sebagai kesalahan yang sering terjadi (Buku Guru Kelas XI
 * halaman 168), jadi kode ini tidak ikut memakai huruf yang membingungkan itu.
 */
export function regresi(pasangan: Array<[number, number]>): Regresi {
  const n = pasangan.length
  const xs = pasangan.map((p) => p[0])
  const ys = pasangan.map((p) => p[1])
  const meanX = xs.reduce((a, b) => a + b, 0) / n
  const meanY = ys.reduce((a, b) => a + b, 0) / n

  let sxy = 0, sxx = 0, syy = 0
  for (let i = 0; i < n; i++) {
    sxy += (xs[i] - meanX) * (ys[i] - meanY)
    sxx += (xs[i] - meanX) ** 2
    syy += (ys[i] - meanY) ** 2
  }

  const gradien = sxx === 0 ? NaN : sxy / sxx
  const konstanta = meanY - gradien * meanX
  const r = sxx === 0 || syy === 0 ? 0 : sxy / Math.sqrt(sxx * syy)
  const residu = pasangan.map(([x, y]) => y - (konstanta + gradien * x))

  return {
    n, meanX, meanY, gradien, konstanta, r, r2: r * r,
    residu,
    jumlahKuadratResidu: residu.reduce((a, e) => a + e * e, 0),
  }
}

/** Jumlah kuadrat residu untuk garis yang DITARIK SENDIRI oleh siswa. */
export function kuadratResiduGaris(
  pasangan: Array<[number, number]>,
  gradien: number,
  konstanta: number,
): number {
  return pasangan.reduce((a, [x, y]) => a + (y - (konstanta + gradien * x)) ** 2, 0)
}

/**
 * Kelompokkan data menjadi kelas selebar `lebar`, mulai dari kelipatan lebar
 * yang tepat di bawah nilai terkecil.
 *
 * Dipakai widget lebar kelas. Awal kelas sengaja dijadikan kelipatan lebarnya
 * supaya batas kelas tetap berupa angka bulat yang enak dibaca saat penggesernya
 * digerakkan, bukan angka acak yang ikut bergeser.
 */
export function kelompokkan(data: number[], lebar: number): Kelas[] {
  if (data.length === 0 || lebar <= 0) return []
  const urut = terurut(data)
  const mulai = Math.floor(urut[0] / lebar) * lebar
  const selesai = Math.floor(urut[urut.length - 1] / lebar) * lebar + lebar

  const hasil: Kelas[] = []
  for (let b = mulai; b < selesai - 1e-9; b += lebar) {
    const atas = b + lebar
    // batas atas dihitung terbuka, kecuali pada kelas terakhir, supaya nilai
    // terbesar tidak jatuh ke luar semua kelas
    const terakhir = atas >= selesai - 1e-9
    const f = urut.filter((x) => x >= b && (terakhir ? x <= atas : x < atas)).length
    hasil.push({ label: `${b} - ${atas}`, bawah: b, atas, f })
  }
  return hasil
}
