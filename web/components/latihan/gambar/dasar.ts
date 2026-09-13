/**
 * Perkakas bersama perender gambar soal (13 Sep 2026).
 *
 * Semua gambar soal memakai viewBox selebar 460 satuan seperti widget, jadi
 * aturan jarak label `petakSumbu` berlaku sama, dan di HP seluruh gambar
 * (termasuk hurufnya) mengecil serempak tanpa ada yang bertabrakan.
 */
import type { Petak } from '@/lib/petak-sumbu'

export const LEBAR = 460
export const MONO = 'var(--font-mono), sans-serif'
export const KERTAS = 'var(--kartu, #FFFFFF)'
export const GARIS_PETAK = '#E4DDCB'
export const GARIS_SUMBU = '#8B8378'

/** Angka Indonesia: koma desimal, nol di belakang dibuang. */
export function angka(n: number, desimal = 2): string {
  const s = n.toFixed(desimal)
  const rapi = s.includes('.') ? s.replace(/0+$/, '').replace(/\.$/, '') : s
  return (rapi === '-0' ? '0' : rapi).replace('.', ',')
}

export type Jangkauan = [number, number, number, number]

/**
 * Angka sumbu untuk gambar soal. Sama aturannya dengan `lib/petak-sumbu.ts`
 * (langkah terkecil yang masih menyisakan jarak minimum antar label), tetapi
 * calon langkahnya diperluas sampai 5.000: gambar soal eksponen dan
 * statistika bisa berjangkauan ratusan sampai ribuan (galeri 14 Sep: sumbu
 * 0 sampai 7.000 dengan langkah 100 menghasilkan 70 label yang menumpuk).
 */
const CALON = [0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000]

export function petakAngka(min: number, maks: number, panjangGambar: number, jarakMin = 26): Petak[] {
  const rentang = maks - min
  if (!Number.isFinite(rentang) || rentang <= 0 || panjangGambar <= 0) return []
  const perSatuan = panjangGambar / rentang
  const langkah = CALON.find((l) => l * perSatuan >= jarakMin) ?? CALON[CALON.length - 1]!
  const desimal = langkah < 1 ? 1 : 0
  const hasil: Petak[] = []
  for (let n = Math.ceil(min / langkah) * langkah; n <= maks + langkah * 1e-9; n += langkah) {
    const nilai = Math.abs(n) < langkah * 1e-9 ? 0 : n
    hasil.push({ nilai, label: angka(nilai, desimal) })
  }
  return hasil
}

export type Bidang = {
  X: (x: number) => number
  Y: (y: number) => number
  petakX: Petak[]
  petakY: Petak[]
  xMin: number
  xMaks: number
  yMin: number
  yMaks: number
  kiri: number
  kanan: number
  atas: number
  bawah: number
}

/**
 * Peta koordinat matematika ke satuan gambar. Skala x dan y SAMA (1 satuan
 * matematika = jumlah satuan gambar yang sama di kedua arah) supaya sudut
 * dan panjang tidak berbohong; sisa ruang dibagi rata sebagai tepi.
 */
export function buatBidang(
  jangkauan: Jangkauan,
  tinggi: number,
  tepi = { kiri: 34, kanan: 16, atas: 14, bawah: 26 },
  skalaSama = true,
): Bidang {
  const [xMin, xMaks, yMin, yMaks] = jangkauan
  const lebarDalam = LEBAR - tepi.kiri - tepi.kanan
  const tinggiDalam = tinggi - tepi.atas - tepi.bawah
  let sx = lebarDalam / (xMaks - xMin)
  let sy = tinggiDalam / (yMaks - yMin)
  if (skalaSama) {
    const s = Math.min(sx, sy)
    sx = s
    sy = s
  }
  const lebarPakai = sx * (xMaks - xMin)
  const tinggiPakai = sy * (yMaks - yMin)
  const kiri = tepi.kiri + (lebarDalam - lebarPakai) / 2
  const atas = tepi.atas + (tinggiDalam - tinggiPakai) / 2
  const X = (x: number) => kiri + (x - xMin) * sx
  const Y = (y: number) => atas + (yMaks - y) * sy
  return {
    X, Y,
    petakX: petakAngka(xMin, xMaks, lebarPakai),
    petakY: petakAngka(yMin, yMaks, tinggiPakai),
    xMin, xMaks, yMin, yMaks,
    kiri, kanan: kiri + lebarPakai, atas, bawah: atas + tinggiPakai,
  }
}

/** Nilai fungsi dari teks "x*x - 4" atau "Math.sin(x)". Dihitung sekali per gambar. */
export function buatFungsi(rumus: string): (x: number) => number {
  try {
    const f = Function('x', 'Math', `"use strict"; return (${rumus});`) as (x: number, m: Math) => number
    return (x) => f(x, Math)
  } catch {
    return () => Number.NaN
  }
}

/**
 * Jalur kurva: dicicil 240 titik, putus di tempat nilainya lompat (asimtot)
 * atau keluar jauh dari bidang, supaya kurva tangen tidak digambar sebagai
 * garis tegak palsu.
 */
export function jalurKurva(b: Bidang, f: (x: number) => number, n = 240): string {
  const bagian: string[] = []
  let terbuka = false
  let yLama = Number.NaN
  const batas = (b.yMaks - b.yMin) * 1.5
  for (let i = 0; i <= n; i++) {
    const x = b.xMin + ((b.xMaks - b.xMin) * i) / n
    const y = f(x)
    const sah = Number.isFinite(y) && y > b.yMin - batas && y < b.yMaks + batas
    const lompat = Number.isFinite(yLama) && Number.isFinite(y) && Math.abs(y - yLama) > batas
    if (!sah || lompat) {
      terbuka = false
      yLama = y
      continue
    }
    const px = b.X(x).toFixed(1)
    const py = b.Y(Math.max(b.yMin - batas, Math.min(b.yMaks + batas, y))).toFixed(1)
    bagian.push(`${terbuka ? 'L' : 'M'} ${px} ${py}`)
    terbuka = true
    yLama = y
  }
  return bagian.join(' ')
}

/** Warna kurva ke-n, bergilir. */
export const URUT_WARNA = ['#1F2430', '#3A6EA5', '#C25E4D', '#6A4C93'] as const
