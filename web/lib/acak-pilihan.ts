/**
 * Mengocok urutan pilihan ganda saat ditampilkan (permintaan ARYA 17 Sep
 * 2026: "biar siswa tidak menghafal jawabannya").
 *
 * Yang DISIMPAN (lib/latihan-kemajuan.ts) tetap indeks pilihan ASLI di bank
 * soal, jadi tanda benar/salah tidak tergantung urutan tampilan. Urutannya
 * ditentukan benih per tab (sessionStorage) dan id soal: tetap selama tab
 * itu hidup (muat ulang tidak mengubahnya), dan berbeda di tab atau hari
 * lain.
 *
 * Pembahasan menyebut huruf pilihan ("(Jawaban C)", "Pilihan D, 3/5, ...")
 * mengikuti urutan asli di bank. `petakanHuruf` menerjemahkannya ke huruf
 * tampilan memakai pola yang SAMA dengan alat/acak_pilihan.mjs (alat yang
 * dulu mengocok isi bank dan sudah lolos cek_kuis --ketat), supaya kalimat
 * pembahasan tetap menunjuk pilihan yang benar.
 */

export const HURUF = 'ABCDE'
const KUNCI_BENIH = 'matra:latihan:benih'

/** pembangkit acak berbenih (mulberry32), sama dengan alat/acak_pilihan.mjs */
function acakBerbenih(teks: string): () => number {
  let a = 0
  for (const ch of teks) a = (a * 31 + ch.charCodeAt(0)) >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Benih per tab. Di server (dan sebelum hidrasi) '0' = urutan asli. */
export function bacaBenih(): string {
  if (typeof window === 'undefined') return '0'
  try {
    let b = window.sessionStorage.getItem(KUNCI_BENIH)
    if (!b) {
      b = String(Math.floor(Math.random() * 1e9))
      window.sessionStorage.setItem(KUNCI_BENIH, b)
    }
    return b
  } catch {
    return '0'
  }
}

/**
 * Urutan tampilan: `urut[posisi] = indeks asli`. Benih '0' mengembalikan
 * urutan asli (dipakai saat gambaran server).
 */
export function urutanPilihan(idSoal: string, benih: string, jumlah: number): number[] {
  const urut = Array.from({ length: jumlah }, (_, i) => i)
  if (benih === '0') return urut
  const acak = acakBerbenih(benih + ':' + idSoal)
  for (let i = urut.length - 1; i > 0; i--) {
    const j = Math.floor(acak() * (i + 1))
    ;[urut[i], urut[j]] = [urut[j], urut[i]]
  }
  return urut
}

/** Huruf tampilan untuk indeks asli `asli`. */
export function hurufTampil(urut: number[], asli: number): string {
  return HURUF[urut.indexOf(asli)] ?? '?'
}

/**
 * Terjemahkan huruf pilihan di teks pembahasan dari urutan asli ke urutan
 * tampilan. Pola persis alat/acak_pilihan.mjs.
 */
export function petakanHuruf(teks: string, urut: number[]): string {
  if (urut.every((asli, posisi) => asli === posisi)) return teks
  const peta: Record<string, string> = {}
  urut.forEach((asli, posisi) => { peta[HURUF[asli]] = HURUF[posisi] })
  const ganti = (h: string) => peta[h] ?? h
  return teks
    .replace(/\(Jawaban ([A-E])\)/g, (_, h: string) => `(Jawaban ${ganti(h)})`)
    .replace(
      /\b([Pp]ilihan) ([A-E])((?:(?:,\s|\s(?:dan|atau|serta)\s|,\s(?:dan|atau)\s)[A-E](?![\w√]))*)/g,
      (_m, kata: string, h1: string, ekor: string) =>
        `${kata} ${ganti(h1)}${ekor.replace(/[A-E]/g, (h) => ganti(h))}`,
    )
    .replace(/\bjawaban ([A-E])\b/g, (_, h: string) => `jawaban ${ganti(h)}`)
}
