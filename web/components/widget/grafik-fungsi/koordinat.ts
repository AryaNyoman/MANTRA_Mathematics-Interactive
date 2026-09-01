import { WARNA } from '@/lib/warna'

/**
 * Alat gambar bersama untuk kesebelas widget Grafik Fungsi.
 *
 * ASAL BERKAS INI
 * Isinya berasal dari `components/widget/limit/koordinat.ts`, yang sudah
 * terbukti dipakai sembilan widget Limit. Disalin, bukan diimpor, karena berkas
 * itu berada di wilayah sesi lain dan aturan proyek melarang menyunting wilayah
 * sesi lain. Duplikasi ini disengaja dan sudah dicatat di laporan sesi supaya
 * MASTER bisa menyatukannya sekali untuk semua topik setelah penggabungan.
 *
 * TAMBAHAN yang tidak ada di versi Limit:
 *   `jalurParametrik`  menggambar bentuk yang BUKAN fungsi (lingkaran, parabola
 *                      tidur). Dibutuhkan tahap 2, yang justru harus
 *                      menunjukkan gambar yang gagal uji garis tegak.
 *   `jendelaTetap`     jendela yang ditulis langsung, untuk widget yang
 *                      tampilannya memang tidak boleh ikut berubah.
 *
 * ATURAN PROYEK yang dijaga berkas ini: bingkai wajib menyesuaikan otomatis dan
 * memberi tahu penggunanya lewat penunjuk skala. Widget tidak boleh memotong
 * gambarnya sendiri.
 */

/** Ukuran bidang gambar SVG. Sama untuk semua widget topik ini supaya seragam. */
export const VW = 460
export const VH = 320

/**
 * Ruang tepi bidang gambar.
 *
 * `atas` dan `bawah` sengaja LEBAR, dan itu bukan pemborosan. Potret pertama
 * tanggal 2 September 2026 memperlihatkan keterangan widget menabrak kurvanya
 * sendiri di tahap 1 dan tahap 2: tulisan "memotong 1 kali" tertimpa garis, dan
 * label "x = 1" jatuh persis di atas kurva. Itu cacat yang sama bentuknya
 * dengan "teks menabrak kurva" pada video Limit materi 07 dan 08.
 *
 * Sekarang keterangan TIDAK PERNAH digambar di dalam kotak grafik. Ia punya
 * pita sendiri di atas dan di bawah kotak, disediakan oleh `Bidang`. Dengan
 * begitu tabrakan itu tidak mungkin terjadi lagi, bukan sekadar diperbaiki
 * satu per satu.
 */
export const TEPI = { kiri: 44, kanan: 18, atas: 52, bawah: 42 }

/**
 * Batas panjang satu baris keterangan, dalam huruf.
 *
 * Lebar pitanya 398 satuan dan hurufnya sekitar 6,2 satuan pada ukuran 10,5,
 * jadi kira-kira 64 huruf. Diberi jarak aman menjadi 60. Kalimat yang lebih
 * panjang akan keluar bingkai persis seperti yang terjadi pada potret pertama
 * tahap 1: "Naik lagi dan lebih curam: 3 km dalam 3 menit, dua kali kecepatan"
 * terpotong di tepi kanan.
 */
export const MAKS_HURUF_CATATAN = 60

export const KOTAK = {
  x0: TEPI.kiri,
  y0: TEPI.atas,
  x1: VW - TEPI.kanan,
  y1: VH - TEPI.bawah,
}

export type Jendela = { xMin: number; xMax: number; yMin: number; yMax: number }

/** Jendela yang ditulis langsung. Sekadar supaya niatnya terbaca di widget. */
export function jendelaTetap(xMin: number, xMax: number, yMin: number, yMax: number): Jendela {
  return { xMin, xMax, yMin, yMax }
}

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
 * Kebalikan `keLayar`: dari koordinat layar kembali ke koordinat matematika.
 *
 * Dibutuhkan widget yang titiknya bisa DISERET, karena tetikus dan jari
 * memberi tahu posisinya dalam piksel, sementara yang harus dihitung adalah
 * nilai matematikanya.
 */
export function keMatematika(j: Jendela) {
  const lebar = KOTAK.x1 - KOTAK.x0
  const tinggi = KOTAK.y1 - KOTAK.y0
  return {
    x: (px: number) => j.xMin + ((px - KOTAK.x0) / lebar) * (j.xMax - j.xMin),
    y: (py: number) => j.yMin + ((KOTAK.y1 - py) / tinggi) * (j.yMax - j.yMin),
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
 * Penunjuk skala, wajib ditampilkan tiap widget yang bisa berubah tampilan.
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
 * Jalur SVG untuk sebuah fungsi.
 *
 * Jalurnya DIPUTUS di tempat fungsinya meledak atau tidak terdefinisi, supaya
 * asimtot tegak tidak digambar sebagai garis miring raksasa yang menyeberangi
 * layar. Itu kesalahan gambar yang paling sering terjadi pada grafik pecahan,
 * dan justru menyesatkan di tahap 10 yang sedang membahas asimtot.
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

/**
 * Jalur SVG untuk bentuk yang BUKAN grafik fungsi.
 *
 * Tahap 2 justru harus menggambar lingkaran dan parabola tidur, karena itulah
 * contoh yang gagal uji garis tegak. Keduanya tidak bisa ditulis sebagai
 * `y = f(x)`, jadi jalurnya dibuat dari sepasang rumus yang keduanya bergantung
 * pada satu peubah bantu.
 */
export function jalurParametrik(
  g: (t: number) => [number, number],
  tMin: number,
  tMax: number,
  j: Jendela,
  langkah = 240,
): string {
  const p = keLayar(j)
  const potongan: string[] = []
  let menyambung = false

  for (let i = 0; i <= langkah; i++) {
    const t = tMin + ((tMax - tMin) * i) / langkah
    const [x, y] = g(t)
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      menyambung = false
      continue
    }
    potongan.push(`${menyambung ? 'L' : 'M'} ${p.x(x).toFixed(2)} ${p.y(y).toFixed(2)}`)
    menyambung = true
  }
  return potongan.join(' ')
}

/** Warna yang dipakai bersama, supaya kaitannya dengan video dan topik lain utuh. */
export const GARIS_PETAK = '#D6CDBC'
export const GARIS_SUMBU = '#C9BFAE'
export const MONO = 'var(--font-plex-mono), monospace'
export { WARNA }
