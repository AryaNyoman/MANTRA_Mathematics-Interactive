/**
 * Arah pindah halaman untuk sistem gerak "Panggung" (17 Sep 2026).
 *
 * Halaman baru masuk dengan arah yang bermakna: MAJU (naik dari bawah) saat
 * masuk lebih dalam atau menuju tab di sebelah kanan, KEMBALI (turun dari
 * atas) saat naik ke halaman induk, menuju tab di sebelah kiri, atau menekan
 * tombol Kembali peramban. Arahnya ditulis ke `html[data-arah]` SEBELUM
 * peramban mengambil potret transisi (lihat components/mantra/ArahRute.tsx),
 * dan CSS `::view-transition-new(.panggung-masuk)` memilih animasinya.
 *
 * Keluarga rute mengikuti urutan tab nav: Beranda (0), Peta Materi beserta
 * halaman belajar `/topik/...` (1), Latihan beserta bank soalnya (2), Tentang
 * (3). Di dalam satu keluarga, kedalaman alamat yang menentukan: lebih dalam
 * berarti maju.
 */

export type Arah = 'maju' | 'kembali'

const KELUARGA: [awalan: string, urutan: number][] = [
  ['/peta-materi', 1],
  ['/topik', 1],
  ['/latihan', 2],
  ['/tentang', 3],
]

function keluarga(jalur: string): number {
  if (jalur === '/') return 0
  const cocok = KELUARGA.find(([awalan]) => jalur === awalan || jalur.startsWith(`${awalan}/`))
  return cocok ? cocok[1] : -1
}

const kedalaman = (jalur: string) => jalur.split('/').filter(Boolean).length

export function hitungArah(dari: string, ke: string): Arah {
  const a = keluarga(dari)
  const b = keluarga(ke)
  if (a === b) return kedalaman(ke) >= kedalaman(dari) ? 'maju' : 'kembali'
  // Halaman yang tidak dikenal (misalnya 404) dianggap paling luar.
  return b > a ? 'maju' : 'kembali'
}

/**
 * Menulis arah ke `html` sebelum berpindah. Dipanggil ArahRute untuk klik
 * tautan dan tombol Kembali, dan langsung oleh kode yang memanggil
 * `router.push` (bank soal: keluar lewat jendela konfirmasi).
 */
export function tandaiArah(arah: Arah) {
  const html = document.documentElement
  html.dataset.arah = arah
  // Kemunculan bertahap daftar hanya berlaku pada pemuatan dokumen pertama;
  // sesudah pindah halaman pertama, seluruh halaman masuk sebagai satu potret.
  delete html.dataset.muatAwal
}

export function aturArah(ke: string) {
  tandaiArah(hitungArah(window.location.pathname, ke))
}
