/**
 * Penyimpanan skor di browser siswa (localStorage), tanpa database, tanpa login.
 *
 * Dibungkus sebagai "external store" supaya bisa dibaca dengan
 * `useSyncExternalStore`. Cara ini menghindari `setState` di dalam `useEffect`
 * (dilarang aturan react-hooks/set-state-in-effect di React 19) sekaligus
 * mencegah ketidakcocokan hidrasi: di server nilainya selalu null, di browser
 * dibaca dari localStorage.
 *
 * localStorage bisa diblokir peramban (mode penyamaran, setelan privasi).
 * Semua akses dibungkus try/catch, kalau gagal, kuis tetap jalan, cuma
 * skornya tidak tersimpan.
 */

const pendengar = new Set<() => void>()

export function langgan(cb: () => void): () => void {
  pendengar.add(cb)
  if (typeof window !== 'undefined') window.addEventListener('storage', cb)
  return () => {
    pendengar.delete(cb)
    if (typeof window !== 'undefined') window.removeEventListener('storage', cb)
  }
}

export function baca(kunci: string): string | null {
  try {
    return localStorage.getItem(kunci)
  } catch {
    return null
  }
}

/** Dipanggil di server; localStorage tidak ada di sana. */
export const bacaDiServer = (): string | null => null

export function tulis(kunci: string, nilai: string): void {
  try {
    localStorage.setItem(kunci, nilai)
  } catch {
    /* diabaikan, skor sekadar tidak tersimpan */
  }
  pendengar.forEach((cb) => cb())
}

/** Angka kecil (mis. tingkat ukuran subtitle). Nilai rusak diabaikan.
 *
 * Kunci yang BELUM PERNAH disimpan wajib mengembalikan `bawaan`, bukan nol.
 * Sampai 4 Sep 2026 fungsi ini menghitung `Number(null)`, dan nilainya nol,
 * bukan `NaN`. `Number.isFinite(0)` benar, jadi nol itu lolos sebagai nilai
 * yang sah dan nilai bawaan tidak pernah dipakai. Akibatnya ukuran subtitle
 * selalu mulai dari tingkat terkecil, bukan dari tingkat yang dimaksud, dan
 * lebar kolom alat mulai dari nol piksel. */
export function bacaAngka(kunci: string, bawaan: number): number {
  const mentah = baca(kunci)
  if (mentah === null || mentah.trim() === '') return bawaan
  const n = Number(mentah)
  return Number.isFinite(n) ? n : bawaan
}

export function simpanAngka(kunci: string, nilai: number): void {
  tulis(kunci, String(nilai))
}
