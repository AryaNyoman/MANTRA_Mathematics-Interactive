/**
 * Asisten Tanya: POST { bab, materi, kutipan?, pertanyaan?, riwayat?, gambar? }
 * Jawaban mengalir sebagai SSE: baris `data: {"teks": "..."}` berulang, lalu
 * `data: {"selesai": true, "alasan": ..., "sisa": ..., "pemakaian": ...}`.
 * Galat sebelum aliran dimulai dijawab JSON `{ pesan }` (400, 404, 429, 503).
 * Spesifikasi: docs/superpowers/specs/2026-09-20-asisten-tanya-design.md 3.2 dan 3.3.
 */
import { validasi, adaInjeksi, adaBlokKode } from '@/lib/tanya/penapis'
import { muatBekal, cariPotongan } from '@/lib/tanya/bekal'
import { susun } from '@/lib/tanya/susun'
import { panggilModel, asistenSiap, umurCache } from '@/lib/tanya/penyedia'
import { periksaJatah, batasHarian } from '@/lib/tanya/pembatas'

export const runtime = 'nodejs'
export const maxDuration = 60

const JAWAB_INJEKSI =
  'Aturan kerja saya tidak bisa diubah lewat percakapan. Saya hanya membantu memahami materi matematika di MANTRA.'
const JAWAB_KODE =
  'Maaf, jawaban tadi saya batalkan karena bentuknya di luar yang diizinkan. Coba tanyakan dengan kalimat lain.'
const JAWAB_TERPOTONG = '\n\nJawabannya saya potong di sini. Tanya lagi bagian yang belum jelas, ya.'
const JAWAB_GALAT = 'Asisten sedang tidak bisa dihubungi. Bacaannya tetap lengkap; coba lagi sebentar lagi.'

const jsonGalat = (status: number, pesan: string) => Response.json({ pesan }, { status })

export async function POST(req: Request): Promise<Response> {
  if (!asistenSiap()) return jsonGalat(503, 'Asisten sedang tidak aktif di server ini. Bacaannya tetap lengkap.')
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return jsonGalat(400, 'Badan permintaan bukan JSON.')
  }
  const v = validasi(body)
  if (!v.ok) return jsonGalat(400, v.pesan)
  const p = v.permintaan

  const bekal = muatBekal(p.bab, p.materi)
  if (!bekal) return jsonGalat(404, 'Materi tidak dikenal.')

  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'tanpa-ip'
  const jatah = await periksaJatah(ip)
  if (!jatah.boleh) {
    return jatah.alasan === 'habis'
      ? jsonGalat(429, `Jatah ${batasHarian()} pertanyaan hari ini untuk jaringan ini sudah habis. Kembali besok; bacaannya tetap lengkap.`)
      : jsonGalat(503, 'Pembatas pemakaian sedang tidak bisa dihubungi, jadi asisten istirahat dulu. Bacaannya tetap lengkap.')
  }

  const aliran = new ReadableStream<Uint8Array>({
    async start(controller) {
      const enc = new TextEncoder()
      const kirim = (obj: unknown) => controller.enqueue(enc.encode(`data: ${JSON.stringify(obj)}\n\n`))
      try {
        // Percobaan injeksi dihitung sebagai jatah (sudah diambil di atas) dan
        // dijawab tanpa model, nol token.
        if (adaInjeksi(p.pertanyaan) || adaInjeksi(p.kutipan)) {
          kirim({ teks: JAWAB_INJEKSI })
          kirim({ selesai: true, alasan: 'ditolak', sisa: jatah.sisa })
          return
        }
        const potongan = p.pertanyaan || p.gambar ? cariPotongan(p.bab, `${p.pertanyaan} ${p.kutipan}`.trim()) : []
        const { sistem, pesan } = susun(bekal, p, potongan, umurCache())
        const hasil = await panggilModel({ sistem, pesan }, (t) => kirim({ teks: t }))
        if (adaBlokKode(hasil.teks)) kirim({ ganti: JAWAB_KODE })
        else if (hasil.alasanBerhenti === 'max_tokens') kirim({ teks: JAWAB_TERPOTONG })
        kirim({ selesai: true, alasan: hasil.alasanBerhenti, sisa: jatah.sisa, pemakaian: hasil.pemakaian })
      } catch (e) {
        console.error('[tanya] model gagal:', e instanceof Error ? e.message : e)
        kirim({ galat: JAWAB_GALAT })
      } finally {
        controller.close()
      }
    },
  })
  return new Response(aliran, {
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-store',
      'x-accel-buffering': 'no',
    },
  })
}
