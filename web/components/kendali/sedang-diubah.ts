/**
 * Besaran mana yang SEDANG DIPEGANG siswa.
 *
 * Saat jari berada di penggeser "Sudut θ", widget segitiga menebalkan busur
 * θ-nya dan menampilkan angkanya tepat di sebelah busur itu. Lepas jari,
 * padam. Jadi mata siswa langsung tahu penggeser ini mengubah bagian yang
 * mana, tanpa membaca apa pun. Keputusan ARYA 5 Sep 2026: "perlihatkan
 * perubahan langsung dari segitiganya".
 *
 * Disimpan di luar React seperti `lib/sesi-belajar.ts`: kendali dan widget
 * adalah komponen yang berbeda di dalam panggung, dan menyalurkan satu string
 * lewat prop ke 92 widget adalah pekerjaan yang jauh lebih besar daripada
 * manfaatnya. Widget yang mau menyala cukup memanggil `useSedangDiubah()`;
 * widget yang belum peduli tidak perlu berubah.
 *
 * Nilainya adalah `kunci` milik kendali, misalnya "sudut" atau "dayung".
 * Kesepakatannya: kunci yang sama dipakai oleh kendali dan oleh widget untuk
 * bagian gambar yang diubah kendali itu.
 */

import { useSyncExternalStore } from 'react'

let dipegang: string | null = null
const pendengar = new Set<() => void>()

export function pegang(kunci: string) {
  if (dipegang === kunci) return
  dipegang = kunci
  for (const p of pendengar) p()
}

export function lepas(kunci: string) {
  // Hanya yang memegang yang boleh melepas. Tanpa syarat ini, blur dari
  // kendali lama bisa memadamkan kendali baru yang barusan dipegang.
  if (dipegang !== kunci) return
  dipegang = null
  for (const p of pendengar) p()
}

function langgan(ubah: () => void) {
  pendengar.add(ubah)
  return () => {
    pendengar.delete(ubah)
  }
}

const baca = () => dipegang
const bacaServer = () => null

/** Kunci besaran yang sedang dipegang, atau null. */
export function useSedangDiubah(): string | null {
  return useSyncExternalStore(langgan, baca, bacaServer)
}
