import { jendelaMuat, type Jendela } from '@/components/widget/grafik-fungsi/koordinat'

/**
 * Mesin transformasi grafik, dipakai tahap 6 dan tahap 7.
 *
 * Seluruh isi tahap 6 berdiri di atas satu kalimat: angka di LUAR kurung
 * mengerjakan apa yang tertulis, angka di DALAM kurung mengerjakan
 * kebalikannya. Supaya kalimat itu benar-benar terbukti di layar dan bukan
 * cuma diklaim, fungsi dan tulisan rumusnya dibangun oleh MEKANISME YANG SAMA
 * di berkas ini.
 *
 * Kalau keduanya dibangun terpisah, cepat atau lambat gambarnya akan bergeser
 * ke satu arah sementara rumus di sampingnya menyebut arah yang lain, dan
 * widget itu akan mengajarkan hal yang salah dengan sangat meyakinkan.
 */

export type Langkah =
  | 'atas' | 'bawah'
  | 'kanan' | 'kiri'
  | 'cermin-x' | 'cermin-y'
  | 'regang-y' | 'mampat-x'

export const NAMA_LANGKAH: Record<Langkah, string> = {
  'atas': 'Geser atas',
  'bawah': 'Geser bawah',
  'kanan': 'Geser kanan',
  'kiri': 'Geser kiri',
  'cermin-x': 'Cermin sumbu x',
  'cermin-y': 'Cermin sumbu y',
  'regang-y': 'Regang tegak',
  'mampat-x': 'Mampat mendatar',
}

/** Ditulis di luar kurung atau di dalam kurung. Inilah pelajaran tahap 6. */
export const DI_DALAM_KURUNG: Record<Langkah, boolean> = {
  'atas': false,
  'bawah': false,
  'kanan': true,
  'kiri': true,
  'cermin-x': false,
  'cermin-y': true,
  'regang-y': false,
  'mampat-x': true,
}

export const AKIBAT_LANGKAH: Record<Langkah, string> = {
  'atas': 'seluruh grafik naik 1',
  'bawah': 'seluruh grafik turun 1',
  'kanan': 'seluruh grafik geser kanan 1, walaupun tandanya minus',
  'kiri': 'seluruh grafik geser kiri 1, walaupun tandanya plus',
  'cermin-x': 'terbalik atas bawah',
  'cermin-y': 'terbalik kiri kanan',
  'regang-y': 'dua kali lebih tinggi',
  'mampat-x': 'lebarnya jadi SETENGAH, bukan dua kali',
}

export type Dasar = 'parabola' | 'akar' | 'sinus'

export const NAMA_DASAR: Record<Dasar, string> = {
  'parabola': 'Parabola',
  'akar': 'Akar',
  'sinus': 'Sinus',
}

export const RUMUS_DASAR: Record<Dasar, string> = {
  'parabola': 'f(x) = x²',
  'akar': 'f(x) = akar x',
  'sinus': 'f(x) = sin x',
}

export const FUNGSI_DASAR: Record<Dasar, (x: number) => number> = {
  'parabola': (x) => x * x,
  'akar': (x) => (x < 0 ? NaN : Math.sqrt(x)),
  'sinus': (x) => Math.sin(x),
}

/**
 * Fungsi hasil setelah semua langkah dijalankan berurutan.
 *
 * Tiap langkah membungkus hasil langkah sebelumnya, persis seperti urutan
 * tombol yang ditekan siswa. Menukar urutan tombol memang memberi grafik yang
 * berbeda, dan itu bukan cacat melainkan kenyataan yang layak dilihat.
 */
export function bangunFungsi(dasar: Dasar, langkah: Langkah[]): (x: number) => number {
  let f = FUNGSI_DASAR[dasar]
  for (const l of langkah) {
    const sebelum = f
    switch (l) {
      case 'atas': f = (x) => sebelum(x) + 1; break
      case 'bawah': f = (x) => sebelum(x) - 1; break
      case 'kanan': f = (x) => sebelum(x - 1); break
      case 'kiri': f = (x) => sebelum(x + 1); break
      case 'cermin-x': f = (x) => -sebelum(x); break
      case 'cermin-y': f = (x) => sebelum(-x); break
      case 'regang-y': f = (x) => 2 * sebelum(x); break
      case 'mampat-x': f = (x) => sebelum(2 * x); break
    }
  }
  return f
}

/**
 * Tulisan rumusnya, dibangun dengan urutan pembungkusan YANG SAMA.
 *
 * Cara kerjanya: tiap tahap menyimpan bukan sebuah teks, melainkan cara
 * menuliskan rumus untuk sebuah tulisan x. Langkah yang bekerja di dalam kurung
 * mengganti tulisan x itu, langkah yang bekerja di luar kurung membungkus
 * hasilnya. Dengan begitu tulisan dan gambarnya tidak mungkin berbeda arah.
 */
export function tulisFungsi(langkah: Langkah[]): string {
  let tulis = (xs: string) => `f(${xs})`
  for (const l of langkah) {
    const sebelum = tulis
    switch (l) {
      case 'atas': tulis = (xs) => `${sebelum(xs)} + 1`; break
      case 'bawah': tulis = (xs) => `${sebelum(xs)} - 1`; break
      case 'kanan': tulis = (xs) => sebelum(`${xs} - 1`); break
      case 'kiri': tulis = (xs) => sebelum(`${xs} + 1`); break
      case 'cermin-x': tulis = (xs) => `-[${sebelum(xs)}]`; break
      case 'cermin-y': tulis = (xs) => sebelum(`-${xs}`); break
      case 'regang-y': tulis = (xs) => `2[${sebelum(xs)}]`; break
      case 'mampat-x': tulis = (xs) => sebelum(`2${xs}`); break
    }
  }
  return `y = ${tulis('x')}`
}

/**
 * Jendela yang memuat kedua kurva, dengan tinggi DIBATASI.
 *
 * Tanpa pembatas, parabola yang diregangkan dua kali membuat jendela setinggi
 * ratusan satuan, dan semua kurva lain gepeng menempel di sumbu. Pembatas ini
 * membuat tampilan tetap terbaca, dan penunjuk skala di pojok yang memberi tahu
 * siswa berapa lebar bidang yang sedang terlihat.
 */
export function jendelaTerbatas(
  fungsi: Array<(x: number) => number>,
  xMin: number,
  xMax: number,
  maksTinggi = 9,
): Jendela {
  const titik: Array<[number, number]> = [[xMin, 0], [xMax, 0]]
  for (const f of fungsi) {
    for (let i = 0; i <= 90; i++) {
      const x = xMin + ((xMax - xMin) * i) / 90
      const y = f(x)
      if (Number.isFinite(y) && Math.abs(y) <= maksTinggi) titik.push([x, y])
    }
  }
  const j = jendelaMuat(titik, 0.1)
  // lebar sumbu x dikunci supaya kurva tidak melompat-lompat setiap satu tombol
  // ditekan; yang menyesuaikan hanya tingginya
  return { ...j, xMin, xMax }
}
