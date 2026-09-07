import { petakSumbu } from '@/lib/petak-sumbu'
import { WARNA } from '@/lib/warna'

/**
 * Alat bersama untuk kesembilan widget Limit.
 *
 * KENAPA ADA
 * Hampir semua widget Limit menggambar grafik fungsi di bidang koordinat, dan
 * beberapa di antaranya berganti-ganti tingkat perbesaran. Kalau penskalaannya
 * ditulis ulang di sembilan tempat, cepat atau lambat salah satunya akan
 * memotong gambarnya sendiri. Itu bug yang ditemukan ARYA pada 31 Agustus dan
 * sudah jadi aturan proyek: bingkai wajib menyesuaikan otomatis DAN memberi
 * tahu penggunanya lewat penunjuk skala.
 */

/** Ukuran bidang gambar SVG. Sama untuk semua widget Limit supaya seragam. */
export const VW = 460
export const VH = 300

/** Ruang tepi untuk label sumbu, supaya angkanya tidak terpotong. */
export const TEPI = { kiri: 44, kanan: 18, atas: 20, bawah: 32 }

export const KOTAK = {
  x0: TEPI.kiri,
  y0: TEPI.atas,
  x1: VW - TEPI.kanan,
  y1: VH - TEPI.bawah,
}

export type Jendela = { xMin: number; xMax: number; yMin: number; yMax: number }

/** Ubah koordinat matematika menjadi koordinat layar SVG. */
export function keLayar(j: Jendela) {
  const lebar = KOTAK.x1 - KOTAK.x0
  const tinggi = KOTAK.y1 - KOTAK.y0
  return {
    x: (x: number) => KOTAK.x0 + ((x - j.xMin) / (j.xMax - j.xMin)) * lebar,
    /** sumbu y layar terbalik: nilai besar ada di ATAS */
    y: (y: number) => KOTAK.y1 - ((y - j.yMin) / (j.yMax - j.yMin)) * tinggi,
  }
}

/**
 * Jendela yang PASTI memuat semua titik, ditambah ruang tepi.
 *
 * Dipakai widget yang jangkauan nilainya tidak diketahui sebelum dihitung.
 * Kalau senarai titiknya kosong atau semuanya sama, jendela tetap dibuat punya
 * lebar, karena jendela berlebar nol membuat pembagian jadi tak hingga dan
 * gambarnya hilang sama sekali.
 */
export function jendelaMuat(titik: Array<[number, number]>, tepi = 0.12): Jendela {
  const layak = titik.filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y))
  if (layak.length === 0) return { xMin: -1, xMax: 1, yMin: -1, yMax: 1 }

  let xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity
  for (const [x, y] of layak) {
    if (x < xMin) xMin = x
    if (x > xMax) xMax = x
    if (y < yMin) yMin = y
    if (y > yMax) yMax = y
  }

  const lebarX = xMax - xMin || 1
  const lebarY = yMax - yMin || 1
  return {
    xMin: xMin - lebarX * tepi,
    xMax: xMax + lebarX * tepi,
    yMin: yMin - lebarY * tepi,
    yMax: yMax + lebarY * tepi,
  }
}

/** Angka Indonesia: koma sebagai pemisah desimal, nol di belakang dibuang. */
export function angka(n: number, desimal = 2): string {
  if (!Number.isFinite(n)) return n > 0 ? 'tak hingga' : 'minus tak hingga'
  const s = n.toFixed(desimal)
  const rapi = s.includes('.') ? s.replace(/0+$/, '').replace(/\.$/, '') : s
  return rapi.replace('.', ',')
}

/**
 * Penunjuk skala, wajib ditampilkan tiap widget yang bisa diperbesar.
 * Isinya seberapa lebar bidang yang sedang terlihat, supaya siswa tahu ia
 * sedang mengintip sedekat apa.
 */
export function labelSkala(j: Jendela): string {
  const lebar = j.xMax - j.xMin
  const desimal = lebar < 0.01 ? 5 : lebar < 0.1 ? 4 : lebar < 1 ? 3 : 2
  return `lebar tampilan ${angka(lebar, desimal)} satuan`
}

/** Satu garis petak, sudah lengkap dengan angka yang mau ditulis. */
export type Petak = { nilai: number; label: string }

/**
 * Pilih garis petak yang jumlahnya wajar (4 sampai 8 buah) dengan angka bulat
 * yang enak dibaca: kelipatan 1, 2, atau 5 dikali pangkat sepuluh.
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
 * Jalur SVG untuk sebuah fungsi.
 *
 * Jalurnya DIPUTUS di tempat fungsinya meledak atau tidak terdefinisi, supaya
 * asimtot tegak tidak digambar sebagai garis miring raksasa yang menyeberangi
 * layar. Itu kesalahan gambar yang paling sering terjadi pada grafik pecahan,
 * dan justru menyesatkan di topik yang sedang membahas kekontinuan.
 */
export function jalurFungsi(
  f: (x: number) => number,
  j: Jendela,
  langkah = 400,
): string {
  const p = keLayar(j)
  const potongan: string[] = []
  let menyambung = false

  for (let i = 0; i <= langkah; i++) {
    const x = j.xMin + ((j.xMax - j.xMin) * i) / langkah
    const y = f(x)
    // di luar jendela pun tetap diputus: menariknya ke tepi membuat kurva
    // terlihat menempel di batas layar, seolah itu bagian dari grafiknya
    if (!Number.isFinite(y) || y < j.yMin - (j.yMax - j.yMin) || y > j.yMax + (j.yMax - j.yMin)) {
      menyambung = false
      continue
    }
    potongan.push(`${menyambung ? 'L' : 'M'} ${p.x(x).toFixed(2)} ${p.y(y).toFixed(2)}`)
    menyambung = true
  }
  return potongan.join(' ')
}

/** Warna yang dipakai bersama, supaya kaitannya dengan video dan Trigonometri utuh. */
export const GARIS_PETAK = '#D6CDBC'
export const GARIS_SUMBU = '#C9BFAE'
export const MONO = 'var(--font-mono), sans-serif'
export { WARNA }
