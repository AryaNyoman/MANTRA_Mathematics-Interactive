import { useSyncExternalStore } from 'react'
import { baca, bacaDiServer, langgan, tulis } from './simpanan'

/**
 * Mode guru (permintaan ARYA 13 Sep 2026): satu kata kunci membuka semua
 * tingkat latihan dan kuis materi, supaya guru bisa membaca soal dan
 * pembahasan tingkat sangat sulit saat siswa bertanya.
 *
 * Situs tanpa login, jadi ini PENCEGAH SISWA ISENG, bukan pengaman: yang
 * disimpan di kode hanya sidik SHA-256 kata kuncinya, dibandingkan di
 * peramban lewat Web Crypto. Kata kuncinya sendiri tidak ditulis di repo,
 * PROGRESS, maupun pesan commit. Keadaan "guru" disimpan di localStorage
 * peramban itu saja (`matra:guru`), sama seperti kemajuan siswa.
 */

const KUNCI = 'matra:guru'
export const SIDIK_GURU = '590cf7c55181e0ffd24c336d036f0d1b46c63785855837250a1b6638a404e35d'

export function guruAktif(): boolean {
  return baca(KUNCI) === '1'
}

/** Dibaca sebagai external store; di server selalu false. */
export function useModeGuru(): boolean {
  return useSyncExternalStore(langgan, guruAktif, () => bacaDiServer() === '1')
}

async function sidik(teks: string): Promise<string> {
  const data = new TextEncoder().encode(teks)
  const hasil = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hasil)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

/** Benar kalau kata kuncinya cocok; kalau cocok, mode guru langsung aktif. */
export async function masukGuru(kata: string): Promise<boolean> {
  try {
    const cocok = (await sidik(kata.trim())) === SIDIK_GURU
    if (cocok) tulis(KUNCI, '1')
    return cocok
  } catch {
    return false
  }
}

export function keluarGuru(): void {
  try {
    localStorage.removeItem(KUNCI)
  } catch {
    /* diabaikan */
  }
  // tulis() memberi tahu pendengar; nilai kosong berarti bukan guru
  tulis(KUNCI, '')
}
