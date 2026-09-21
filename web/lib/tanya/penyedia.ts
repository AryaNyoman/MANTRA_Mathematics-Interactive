/**
 * Pemanggil Anthropic Messages API untuk Asisten Tanya, diadaptasi dari LENTERA
 * HARUM src/lib/chat/penyedia.ts: fetch langsung (tanpa SDK), aliran SSE,
 * pemakaian token (Math.max, bukan +=, karena usage dilaporkan dua kali:
 * di message_start dan message_delta), TTL cache 5 menit (bawaan) atau 1 jam
 * dengan mundur otomatis ke 5 menit bila API menolak header betanya. Tanpa
 * alat, tanpa PII.
 *
 * Variabel lingkungan dibaca saat runtime supaya build dan uji tetap hijau
 * tanpa ANTHROPIC_API_KEY.
 */
import type { BlokSistem, PesanModel } from './susun.ts'

export const MODEL_BAWAAN = 'claude-haiku-4-5'
export const TOKEN_KELUARAN_MAKS = 700
const URL_PESAN = 'https://api.anthropic.com/v1/messages'
const VERSI_API = '2023-06-01'
const BETA_TTL_1H = 'extended-cache-ttl-2025-04-11'

export const modelTanya = (): string => (process.env.ANTHROPIC_MODEL ?? '').trim() || MODEL_BAWAAN
/**
 * Bawaan 5 menit sejak 21 Sep 2026: tulis cache 1 jam bertarif 2 kali harga
 * masuk, 5 menit 1,25 kali. Pertanyaan siswa jarang beruntun di materi yang
 * sama dalam satu jam, jadi cache panjang lebih sering dibayar daripada
 * dipakai (terukur: $1,17 untuk 80 jawaban uji, hampir separuhnya tulis cache).
 * TANYA_CACHE_TTL=1h mengembalikan yang lama.
 */
export const umurCache = (): '5m' | '1h' => (process.env.TANYA_CACHE_TTL === '1h' ? '1h' : '5m')
export const asistenSiap = (): boolean => Boolean(process.env.ANTHROPIC_API_KEY)

export type Pemakaian = { masuk: number; keluar: number; cacheTulis: number; cacheBaca: number }
export type HasilModel = { teks: string; alasanBerhenti: string; pemakaian: Pemakaian }
type Permintaan = { sistem: BlokSistem[]; pesan: PesanModel[]; maksToken?: number }

const tanpaTtl = (sistem: BlokSistem[]): BlokSistem[] =>
  sistem.map((b) => (b.cache_control ? { ...b, cache_control: { type: 'ephemeral' } } : b))

function badan(p: Permintaan, sistem: BlokSistem[]): string {
  return JSON.stringify({
    model: modelTanya(),
    max_tokens: p.maksToken ?? TOKEN_KELUARAN_MAKS,
    temperature: 0.3,
    system: sistem,
    messages: p.pesan,
    stream: true,
  })
}

function kirim(fetchImpl: typeof fetch, isi: string, betaTtl: boolean): Promise<Response> {
  return fetchImpl(URL_PESAN, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY ?? '',
      'anthropic-version': VERSI_API,
      ...(betaTtl ? { 'anthropic-beta': BETA_TTL_1H } : {}),
    },
    body: isi,
  })
}

type Usage = {
  input_tokens?: number
  output_tokens?: number
  cache_creation_input_tokens?: number
  cache_read_input_tokens?: number
}
type Peristiwa = {
  type?: string
  message?: { usage?: Usage }
  usage?: Usage
  delta?: { type?: string; text?: string; stop_reason?: string | null }
  content_block?: { type?: string; text?: string }
  error?: { message?: string }
}

function serap(u: Usage | undefined, p: Pemakaian): void {
  if (!u) return
  if (typeof u.input_tokens === 'number') p.masuk = Math.max(p.masuk, u.input_tokens)
  if (typeof u.output_tokens === 'number') p.keluar = Math.max(p.keluar, u.output_tokens)
  if (typeof u.cache_creation_input_tokens === 'number') p.cacheTulis = Math.max(p.cacheTulis, u.cache_creation_input_tokens)
  if (typeof u.cache_read_input_tokens === 'number') p.cacheBaca = Math.max(p.cacheBaca, u.cache_read_input_tokens)
}

export async function panggilModel(
  p: Permintaan,
  onTeks?: (potongan: string) => void,
  fetchImpl: typeof fetch = fetch,
): Promise<HasilModel> {
  const minta1h = p.sistem.some((b) => b.cache_control?.ttl === '1h')
  let res = await kirim(fetchImpl, badan(p, p.sistem), minta1h)
  if (!res.ok && minta1h && res.status >= 400 && res.status < 500) {
    res = await kirim(fetchImpl, badan(p, tanpaTtl(p.sistem)), false)
  }
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${(await res.text().catch(() => '')).slice(0, 200)}`)
  if (!res.body) throw new Error('Anthropic tidak mengirim aliran jawaban.')

  const hasil: HasilModel = { teks: '', alasanBerhenti: '', pemakaian: { masuk: 0, keluar: 0, cacheTulis: 0, cacheBaca: 0 } }
  const reader = res.body.getReader()
  const dec = new TextDecoder()
  let sisa = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    sisa += dec.decode(value, { stream: true })
    const baris = sisa.split('\n')
    sisa = baris.pop() ?? ''
    for (const b of baris) {
      const t = b.trim()
      if (!t.startsWith('data:')) continue
      const isi = t.slice(5).trim()
      if (!isi || isi === '[DONE]') continue
      let ev: Peristiwa
      try {
        ev = JSON.parse(isi) as Peristiwa
      } catch {
        continue // potongan rusak: lewati, jangan gagalkan seluruh jawaban
      }
      switch (ev.type) {
        case 'message_start':
          serap(ev.message?.usage, hasil.pemakaian)
          break
        case 'content_block_start':
          if (ev.content_block?.type === 'text' && ev.content_block.text) {
            hasil.teks += ev.content_block.text
            onTeks?.(ev.content_block.text)
          }
          break
        case 'content_block_delta':
          if (ev.delta?.type === 'text_delta' && typeof ev.delta.text === 'string') {
            hasil.teks += ev.delta.text
            onTeks?.(ev.delta.text)
          }
          break
        case 'message_delta':
          if (ev.delta?.stop_reason) hasil.alasanBerhenti = ev.delta.stop_reason
          serap(ev.usage, hasil.pemakaian)
          break
        case 'error':
          throw new Error(`Anthropic: ${ev.error?.message ?? 'galat aliran'}`)
        default:
          break
      }
    }
  }
  return hasil
}
