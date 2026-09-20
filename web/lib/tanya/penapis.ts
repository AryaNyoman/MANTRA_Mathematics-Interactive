/**
 * Penapis deterministik Asisten Tanya (tanpa model, nol token), diadaptasi dari
 * LENTERA HARUM src/lib/chat/penapis.ts: pembersih teks, deteksi injeksi prompt,
 * penolakan blok kode di jawaban, dan validasi badan permintaan.
 */
import type { GambarTanya, PermintaanTanya, PesanRiwayat } from './jenis'

export const KUTIPAN_MAKS = 1200
export const PERTANYAAN_MAKS = 500
export const RIWAYAT_MAKS = 12 // 6 giliran tanya jawab
export const GAMBAR_MAKS_BYTE = 1_000_000
const JENIS_GAMBAR: GambarTanya['jenis'][] = ['image/jpeg', 'image/png', 'image/webp']

export function bersihkan(teks: string, maks: number): string {
  return (teks ?? '').replace(/\s+/g, ' ').trim().slice(0, maks)
}

/** Pola upaya membajak aturan atau membocorkan bekal; daftar kata sederhana, murah, dan bisa diuji. */
const POLA_INJEKSI: RegExp[] = [
  /\b(abaikan|lupakan|hiraukan|kesampingkan)\b[^.]{0,40}\b(instruksi|aturan|perintah|prompt|sistem|sebelumnya|di atas)\b/i,
  /\bignore\b[^.]{0,40}\b(previous|prior|above|instructions?|rules?)\b/i,
  /\b(system|sistem)\s*(prompt|pesan|instruksi)\b/i,
  /\b(tampilkan|tunjukkan|cetak|bocorkan|sebutkan|beri ?tahu)\b[^.]{0,40}\b(prompt|instruksi(mu| kamu| anda)?|aturan rahasia|api ?key|kunci api|token)\b/i,
  /\b(reveal|show|print|repeat|disclose)\b[^.]{0,40}\b(prompt|instructions?|system message)\b/i,
  /\b(kamu|anda|you)\b[^.]{0,20}\b(sekarang|now)\b[^.]{0,20}\b(adalah|jadi|are|act as)\b/i,
  /\b(act|pretend|roleplay|berperan|berpura-pura)\s+as\b/i,
  /\bmode\s+(dev|developer|admin|root|jailbreak|dan)\b/i,
  /\b(jailbreak|do anything now|tanpa batasan apa ?pun|tanpa filter)\b/i,
  /<\/?(system|assistant|user|kutipan)>/i,
  /^\s*(system|assistant)\s*:/im,
]
export function adaInjeksi(teks: string): boolean {
  return POLA_INJEKSI.some((p) => p.test(teks ?? ''))
}

const POLA_BLOK_KODE: RegExp[] = [
  /```/,
  /<script\b/i,
  /\b(?:const|let|var)\s+\w+\s*=\s*(?:require|await|function|\()/,
  /\bimport\s+.+\s+from\s+["']/,
]
export function adaBlokKode(teks: string): boolean {
  return POLA_BLOK_KODE.some((p) => p.test(teks ?? ''))
}

type Validasi = { ok: true; permintaan: PermintaanTanya } | { ok: false; pesan: string }

function riwayatSah(r: unknown): r is PesanRiwayat {
  if (!r || typeof r !== 'object') return false
  const x = r as Record<string, unknown>
  return (x.peran === 'siswa' || x.peran === 'asisten') && typeof x.teks === 'string'
}

export function validasi(body: unknown): Validasi {
  if (!body || typeof body !== 'object') return { ok: false, pesan: 'Badan permintaan bukan objek.' }
  const b = body as Record<string, unknown>
  const bab = typeof b.bab === 'string' ? b.bab.replace(/[^a-z0-9-]/g, '').slice(0, 40) : ''
  const materi = typeof b.materi === 'string' ? b.materi.replace(/[^a-z0-9-]/g, '').slice(0, 60) : ''
  if (!bab || !materi) return { ok: false, pesan: 'Bab dan materi wajib ada.' }
  const kutipan = bersihkan(typeof b.kutipan === 'string' ? b.kutipan : '', KUTIPAN_MAKS)
  const pertanyaan = bersihkan(typeof b.pertanyaan === 'string' ? b.pertanyaan : '', PERTANYAAN_MAKS)
  let gambar: GambarTanya | null = null
  if (b.gambar && typeof b.gambar === 'object') {
    const g = b.gambar as Record<string, unknown>
    const jenis = JENIS_GAMBAR.find((j) => j === g.jenis)
    const data = typeof g.data === 'string' ? g.data : ''
    if (!jenis || !data) return { ok: false, pesan: 'Gambar harus JPEG, PNG, atau WebP.' }
    if (data.length * 0.75 > GAMBAR_MAKS_BYTE) return { ok: false, pesan: 'Gambar lebih dari 1 MB.' }
    gambar = { jenis, data }
  }
  if (!kutipan && !pertanyaan && !gambar) return { ok: false, pesan: 'Tidak ada kutipan, pertanyaan, atau gambar.' }
  const riwayat: PesanRiwayat[] = Array.isArray(b.riwayat)
    ? (b.riwayat as unknown[])
        .filter(riwayatSah)
        .slice(-RIWAYAT_MAKS)
        .map((r) => ({ peran: r.peran, teks: bersihkan(r.teks, 1500) }))
    : []
  return { ok: true, permintaan: { bab, materi, kutipan, pertanyaan, riwayat, gambar } }
}
