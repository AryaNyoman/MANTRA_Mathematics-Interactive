/**
 * Riwayat percakapan Asisten Tanya di peramban siswa (localStorage), tanpa
 * server. Satu kunci per materi: `matra:tanya:<bab>:<slug>` berisi
 * `{ t, pesan }` dengan `t` = waktu pesan terakhir (ms). Percakapan yang
 * tidak disentuh 7 hari dihapus sendiri saat dibaca (keputusan ARYA 21 Sep
 * 2026: supaya situsnya tidak menggemuk di peramban masing-masing), dan
 * siswa diberi tahu di panelnya.
 *
 * Bentuk lama (array pesan saja, 20 Sep) tetap terbaca: dianggap baru
 * disentuh sekarang, dan ditulis ulang dalam bentuk baru saat bertambah.
 */
import { baca, tulis } from '../simpanan.ts'
import type { PesanRiwayat } from './jenis'

export const AWALAN = 'matra:tanya:'
export const UMUR_HARI = 7
const UMUR_MS = UMUR_HARI * 24 * 3600 * 1000
/** pesan yang disimpan per materi (6 tanya jawab) */
export const RIWAYAT_MAKS = 12

export type Percakapan = { bab: string; slug: string; t: number; pesan: PesanRiwayat[] }

export const kunciRiwayat = (bab: string, slug: string) => `${AWALAN}${bab}:${slug}`

function urai(mentah: string | null, kini: number): { t: number; pesan: PesanRiwayat[] } | null {
  if (!mentah) return null
  try {
    const d = JSON.parse(mentah) as unknown
    if (Array.isArray(d)) return { t: kini, pesan: d as PesanRiwayat[] }
    if (d && typeof d === 'object' && Array.isArray((d as { pesan?: unknown }).pesan)) {
      const t = Number((d as { t?: unknown }).t)
      return { t: Number.isFinite(t) ? t : kini, pesan: (d as { pesan: PesanRiwayat[] }).pesan }
    }
  } catch {
    /* rusak: dianggap kosong */
  }
  return null
}

function hapusKunci(kunci: string): void {
  try {
    localStorage.removeItem(kunci)
  } catch {
    /* diabaikan */
  }
}

/** Pesan satu materi; yang kedaluwarsa dihapus dan dikembalikan kosong. */
export function bacaRiwayat(bab: string, slug: string, kini = Date.now()): PesanRiwayat[] {
  const kunci = kunciRiwayat(bab, slug)
  const d = urai(baca(kunci), kini)
  if (!d) return []
  if (kini - d.t > UMUR_MS) {
    hapusKunci(kunci)
    return []
  }
  return d.pesan
}

export function tulisRiwayat(bab: string, slug: string, pesan: PesanRiwayat[], kini = Date.now()): void {
  const kunci = kunciRiwayat(bab, slug)
  if (pesan.length === 0) {
    hapusKunci(kunci)
    tulis(kunci, '') // memberi tahu pendengar; nilai kosong dianggap tidak ada
    hapusKunci(kunci)
    return
  }
  tulis(kunci, JSON.stringify({ t: kini, pesan: pesan.slice(-RIWAYAT_MAKS) }))
}

export const hapusRiwayat = (bab: string, slug: string) => tulisRiwayat(bab, slug, [])

/**
 * Semua percakapan satu bab, terbaru dulu. Sekaligus membersihkan yang
 * kedaluwarsa. Di server (tanpa localStorage) hasilnya kosong.
 */
export function daftarRiwayat(bab: string, kini = Date.now()): Percakapan[] {
  const hasil: Percakapan[] = []
  let n = 0
  try {
    n = localStorage.length
  } catch {
    return hasil
  }
  const awalan = `${AWALAN}${bab}:`
  const kunci: string[] = []
  for (let i = 0; i < n; i++) {
    const k = localStorage.key(i)
    if (k && k.startsWith(awalan)) kunci.push(k)
  }
  for (const k of kunci) {
    const d = urai(baca(k), kini)
    if (!d || d.pesan.length === 0) continue
    if (kini - d.t > UMUR_MS) {
      hapusKunci(k)
      continue
    }
    hasil.push({ bab, slug: k.slice(awalan.length), t: d.t, pesan: d.pesan })
  }
  return hasil.sort((a, b) => b.t - a.t)
}

/** Sidik ringkas daftar riwayat untuk useSyncExternalStore (string stabil). */
export function sidikRiwayat(bab: string, kini = Date.now()): string {
  return daftarRiwayat(bab, kini)
    .map((p) => `${p.slug}:${p.t}:${p.pesan.length}`)
    .join('|')
}

/** "baru saja", "3 jam lalu", "2 hari lalu" */
export function umurTeks(t: number, kini = Date.now()): string {
  const detik = Math.max(0, (kini - t) / 1000)
  if (detik < 90) return 'baru saja'
  const menit = detik / 60
  if (menit < 60) return `${Math.round(menit)} menit lalu`
  const jam = menit / 60
  if (jam < 24) return `${Math.round(jam)} jam lalu`
  return `${Math.round(jam / 24)} hari lalu`
}

/** Sisa umur sebelum terhapus, dalam hari (dibulatkan ke atas, minimal 1). */
export function sisaHari(t: number, kini = Date.now()): number {
  return Math.max(1, Math.ceil((t + UMUR_MS - kini) / (24 * 3600 * 1000)))
}
