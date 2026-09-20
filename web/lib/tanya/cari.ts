/**
 * Pencarian kata kunci (BM25 sederhana) atas potongan bekal, untuk pertanyaan
 * bebas dan screenshot. Tanpa dependency dan tanpa layanan luar; indeks
 * dibangun sekali per bab di memori fungsi (lihat bekal.ts).
 */
import type { Potongan } from './jenis'

const HENTI = new Set([
  'yang', 'dan', 'di', 'ke', 'dari', 'itu', 'ini', 'apa', 'adalah', 'untuk', 'dengan', 'pada',
  'kenapa', 'mengapa', 'bagaimana', 'saya', 'kamu', 'the', 'is', 'of', 'a', 'an', 'atau', 'juga',
])

export function tokenisasi(teks: string): string[] {
  return teks
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((t) => t.length >= 2 && !HENTI.has(t))
}

export type Indeks = {
  potongan: Potongan[]
  dokTf: Map<string, number>[]
  panjang: number[]
  df: Map<string, number>
  rataPanjang: number
}

export function buatIndeks(potongan: Potongan[]): Indeks {
  const dokTf: Map<string, number>[] = []
  const panjang: number[] = []
  const df = new Map<string, number>()
  for (const p of potongan) {
    // judul diulang supaya bobotnya lebih besar daripada isi
    const tok = tokenisasi(`${p.judul} ${p.judul} ${p.teks}`)
    const tf = new Map<string, number>()
    for (const t of tok) tf.set(t, (tf.get(t) ?? 0) + 1)
    for (const t of tf.keys()) df.set(t, (df.get(t) ?? 0) + 1)
    dokTf.push(tf)
    panjang.push(tok.length)
  }
  const rataPanjang = panjang.reduce((s, x) => s + x, 0) / Math.max(1, panjang.length)
  return { potongan, dokTf, panjang, df, rataPanjang }
}

export function cari(indeks: Indeks, kueri: string, k = 5): Potongan[] {
  const k1 = 1.2
  const b = 0.75
  const N = indeks.potongan.length
  const tokKueri = Array.from(new Set(tokenisasi(kueri)))
  const skor = indeks.potongan.map((_, i) => {
    let s = 0
    for (const t of tokKueri) {
      const n = indeks.df.get(t)
      if (!n) continue
      const f = indeks.dokTf[i].get(t) ?? 0
      if (!f) continue
      const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5))
      s += (idf * (f * (k1 + 1))) / (f + k1 * (1 - b + (b * indeks.panjang[i]) / indeks.rataPanjang))
    }
    return s
  })
  return skor
    .map((s, i) => ({ s, i }))
    .filter((x) => x.s > 0)
    .sort((a, b2) => b2.s - a.s)
    .slice(0, k)
    .map((x) => indeks.potongan[x.i])
}
