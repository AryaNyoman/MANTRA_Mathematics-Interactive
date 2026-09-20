/** Pembaca aliran SSE dari /api/tanya di peramban. */
import type { PermintaanTanya } from './jenis'

export class GalatTanya extends Error {
  status: number
  constructor(status: number, pesan: string) {
    super(pesan)
    this.name = 'GalatTanya'
    this.status = status
  }
}

type Peristiwa = { teks?: string; ganti?: string; galat?: string; selesai?: boolean; alasan?: string; sisa?: number }

/**
 * Mengirim pertanyaan dan meneruskan potongan jawaban lewat `onTeks`;
 * `onGanti` mengganti seluruh jawaban yang sudah tampil (jawaban ditolak
 * pemeriksa keluaran). Melempar GalatTanya untuk status bukan 2xx atau
 * peristiwa `galat` di tengah aliran.
 */
export async function kirimTanya(
  badan: PermintaanTanya,
  onTeks: (t: string) => void,
  onGanti: (t: string) => void,
  signal?: AbortSignal,
): Promise<{ alasan: string; sisa: number }> {
  const res = await fetch('/api/tanya', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(badan),
    signal,
  })
  if (!res.ok) {
    const j = (await res.json().catch(() => ({ pesan: 'Asisten tidak bisa dihubungi.' }))) as { pesan: string }
    throw new GalatTanya(res.status, j.pesan)
  }
  if (!res.body) throw new GalatTanya(502, 'Jawaban kosong.')
  const reader = res.body.getReader()
  const dec = new TextDecoder()
  let sisa = ''
  let akhir = { alasan: 'terputus', sisa: 0 }
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    sisa += dec.decode(value, { stream: true })
    const baris = sisa.split('\n')
    sisa = baris.pop() ?? ''
    for (const b of baris) {
      if (!b.startsWith('data:')) continue
      let ev: Peristiwa
      try {
        ev = JSON.parse(b.slice(5)) as Peristiwa
      } catch {
        continue
      }
      if (ev.teks) onTeks(ev.teks)
      if (ev.ganti) onGanti(ev.ganti)
      if (ev.galat) throw new GalatTanya(502, ev.galat)
      if (ev.selesai) akhir = { alasan: ev.alasan ?? 'end_turn', sisa: ev.sisa ?? 0 }
    }
  }
  return akhir
}
