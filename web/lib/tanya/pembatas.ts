/**
 * Jatah harian per IP lewat Upstash Redis REST (tanpa SDK). Kunci
 * tanya:<tanggal WIB>:<ip>, INCR lalu EXPIRE 26 jam. Batas dari env
 * TANYA_BATAS_HARIAN (bawaan 5, diturunkan ARYA dari 20 pada 20 Sep 2026 malam;
 * tanpa batas per menit, tanpa batas per peramban). Upstash tidak terjangkau = MENOLAK
 * (gagal-tertutup) supaya kuota API tidak terbuka tanpa pagar, kecuali
 * TANYA_TANPA_PEMBATAS=1 untuk pengembangan lokal.
 */
export const batasHarian = (): number => {
  const n = Number(process.env.TANYA_BATAS_HARIAN)
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 5
}

export function kunciHari(ip: string, kini = new Date()): string {
  const wib = new Date(kini.getTime() + 7 * 3600 * 1000).toISOString().slice(0, 10)
  return `tanya:${wib}:${ip}`
}

export type Jatah = { boleh: boolean; sisa: number; alasan?: 'habis' | 'pembatas-mati' }

const MATI: Jatah = { boleh: false, sisa: 0, alasan: 'pembatas-mati' }

export async function periksaJatah(ip: string, fetchImpl: typeof fetch = fetch): Promise<Jatah> {
  const batas = batasHarian()
  if (process.env.TANYA_TANPA_PEMBATAS === '1') return { boleh: true, sisa: batas }
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return MATI
  const kunci = kunciHari(ip)
  try {
    const res = await fetchImpl(`${url.replace(/\/+$/, '')}/pipeline`, {
      method: 'POST',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify([['INCR', kunci], ['EXPIRE', kunci, '93600']]),
    })
    if (!res.ok) return MATI
    const hasil = (await res.json()) as { result?: number }[]
    const n = Number(hasil[0]?.result)
    if (!Number.isFinite(n)) return MATI
    if (n > batas) return { boleh: false, sisa: 0, alasan: 'habis' }
    return { boleh: true, sisa: batas - n }
  } catch {
    return MATI
  }
}
