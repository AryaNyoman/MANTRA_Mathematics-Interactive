/**
 * Daftar potongan matematika PENDEK (satu huruf, atau dua tiga huruf kapital)
 * di bacaan materi beserta kata di kiri dan kanannya, untuk memeriksa apakah
 * ada kata prosa yang keliru dianggap rumus (misalnya "sub-bab A", "Kelas X").
 *
 *   node alat/cek_huruf_tunggal.ts            ringkasan per bentuk
 *   node alat/cek_huruf_tunggal.ts --semua    semua kemunculan
 */
import { pisahkan } from '../web/lib/mat-latex.ts'

const semua = process.argv.includes('--semua')
const BAB = ['trigonometri', 'limit', 'grafik-fungsi', 'vektor', 'ruang-3d', 'statistika', 'transformasi-geometri', 'turunan', 'integral']
type Blok = { jenis: string; teks?: string; judul?: string; butir?: string[]; baris?: string[]; simpul?: string; langkah?: string[] }
type Tahap = { no: number; pertanyaan: string; penjelasan: Blok[]; seringKeliru?: { judul: string; isi: string }; intisari?: string[] }

const hitung = new Map<string, number>()
const contoh = new Map<string, string[]>()
function periksa(bab: string, teks: string) {
  const p = pisahkan(teks)
  for (let i = 0; i < p.length; i++) {
    const x = p[i]
    if (x.jenis !== 'mat') continue
    if (!/^[A-Za-z]$|^[A-Z]{2,3}$/.test(x.teks)) continue
    const kiri = (p[i - 1]?.teks ?? '').split(/\s+/).filter(Boolean).slice(-1)[0] ?? ''
    const kanan = (p[i + 1]?.teks ?? '').split(/\s+/).filter(Boolean)[0] ?? ''
    const kunci = `${kiri} [${x.teks}] ${kanan}`
    hitung.set(kunci, (hitung.get(kunci) ?? 0) + 1)
    if (!contoh.has(kunci)) contoh.set(kunci, [])
    if (contoh.get(kunci)!.length < 2) contoh.get(kunci)!.push(`${bab}: ${teks.slice(0, 90)}`)
  }
}
for (const bab of BAB) {
  const daftar: Tahap[] = []
  if (bab === 'statistika') {
    for (const b of ['tahap-penyajian', 'tahap-pemusatan', 'tahap-hubungan', 'tahap-nyata']) {
      const mod = (await import(`../web/content/statistika/${b}.ts`)) as Record<string, Tahap[]>
      for (const v of Object.values(mod)) if (Array.isArray(v)) daftar.push(...v)
    }
  } else {
    daftar.push(...((await import(`../web/content/${bab}/tahap.ts`)) as { TAHAP: Tahap[] }).TAHAP)
  }
  for (const t of daftar) {
    periksa(bab, t.pertanyaan)
    for (const b of t.penjelasan) {
      for (const s of [b.teks, b.judul, b.simpul, ...(b.butir ?? []), ...(b.baris ?? []), ...(b.langkah ?? [])]) if (s) periksa(bab, s)
    }
    if (t.seringKeliru) { periksa(bab, t.seringKeliru.judul); periksa(bab, t.seringKeliru.isi) }
    for (const s of t.intisari ?? []) periksa(bab, s)
  }
}
const urut = [...hitung.entries()].sort((a, b) => b[1] - a[1])
console.log(`${urut.length} bentuk konteks berbeda`)
for (const [k, n] of urut) {
  if (!semua && n > 3) continue // yang sering hampir pasti memang rumus (x, y, f)
  console.log(`${String(n).padStart(3)}  ${k}    <- ${contoh.get(k)![0]}`)
}
