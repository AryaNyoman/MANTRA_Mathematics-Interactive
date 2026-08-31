/**
 * SATU SUMBER KEBENARAN untuk warna bagian-bagian matematika.
 *
 * Nilai di sini WAJIB sama persis dengan `manim/matra_theme.py`.
 * Kalau tidak, siswa melihat sisi samping berwarna biru di video lalu hijau di
 * widget, dan kaitan yang sedang kita bangun justru rusak. Itu pernah terjadi
 * pada 31 Agu 2026 dan harus dicegah, bukan diperbaiki belakangan.
 *
 * Warna AKSEN SITUS (hijau, oker, bata) tidak boleh dipakai untuk bagian
 * matematika. Aksen situs untuk tombol, tautan, dan penanda; warna di sini
 * untuk sisi, sumbu, vektor, dan besaran.
 */

export const WARNA = {
  /** sisi samping / sumbu-x / komponen mendatar */
  samping: '#3A6EA5',
  /** sisi depan / sumbu-y / komponen tegak */
  depan: '#C25E4D',
  /** sisi miring / garis utama / kurva */
  miring: '#1F2430',
  /**
   * sudut, dan nilai yang sedang disorot.
   * Kuning #D9A441 dibuang 31 Agu 2026: kontrasnya di atas krem hanya 2,04:1,
   * jauh di bawah batas layak 4,5:1, dan pada video nyaris tak terbaca.
   * Pengganti ini 6,20:1. WAJIB sama dengan TERANG_SOROT di matra_theme.py.
   */
  sudut: '#6A4C93',
  /** garis bantu, petak, keterangan sekunder */
  redup: '#8B8378',
} as const

/** Versi tema gelap, dipakai kalau nanti ada mode gelap. Sama dgn matra_theme.py. */
export const WARNA_GELAP = {
  samping: '#58C4DD',
  depan: '#FF6B5B',
  miring: '#ECEAE4',
  sudut: '#B9A0E8',
  redup: '#5C6270',
} as const

export type NamaWarna = keyof typeof WARNA
