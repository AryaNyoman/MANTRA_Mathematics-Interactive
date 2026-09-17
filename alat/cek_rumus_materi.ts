/**
 * Memeriksa pengubah rumus (web/lib/mat-latex.ts) terhadap SELURUH BACAAN
 * MATERI (web/content/<bab>/tahap*.ts): paragraf, poin, sorot, kotak contoh
 * (per sel), kotak coba, Sering keliru, ringkasan, dan pertanyaan materi.
 * Pasangan alat/cek_rumus.ts yang memeriksa bank soal.
 *
 *   node alat/cek_rumus_materi.ts            ringkasan + galat + contoh mencurigakan
 *   node alat/cek_rumus_materi.ts --html     galeri qc/rumus-materi.html (semua materi, KaTeX),
 *                                            lihat lewat node ~/.claude/bin/static-server.mjs . 4321
 *   node alat/cek_rumus_materi.ts --kata     daftar teks yang masih menulis rumus dengan KATA
 *                                            (sama dengan, dikurangi, pangkat, kuadrat, per, ...)
 *   node alat/cek_rumus_materi.ts integral   satu bab saja
 *
 * Jalan dengan Node 24 (pengupasan tipe bawaan). Statistika diimpor dari empat
 * berkas bagiannya, sebab tahap.ts-nya memakai alias `@/` yang tidak dikenal Node.
 * Yang dilaporkan:
 *   GALAT   : KaTeX menolak LaTeX-nya (harus nol sebelum tayang)
 *   PROSA?  : potongan matematika memuat \text{kata} panjang (prosa nyasar)
 *   MAT?    : potongan prosa memuat lambang matematika (rumus tertinggal)
 *   KATA?   : rumus ditulis dengan kata (ARYA 17 Sep 2026: "kesalahan fatal")
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import katex from '../web/node_modules/katex/dist/katex.mjs'
import { pisahkan } from '../web/lib/mat-latex.ts'

const AKAR = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const argv = process.argv.slice(2)
const html = argv.includes('--html')
const kata = argv.includes('--kata')
const babPilih = argv.filter((a) => !a.startsWith('--'))
const BAB = babPilih.length
  ? babPilih
  : ['trigonometri', 'limit', 'grafik-fungsi', 'vektor', 'ruang-3d', 'statistika', 'transformasi-geometri', 'turunan', 'integral']

type Blok =
  | { jenis: 'paragraf'; teks: string }
  | { jenis: 'poin'; judul?: string; butir: string[] }
  | { jenis: 'sorot'; teks: string }
  | { jenis: 'contoh'; judul: string; baris: string[]; simpul?: string }
  | { jenis: 'sesi'; judul: string }
  | { jenis: 'coba'; teks: string; langkah?: string[] }
type Tahap = {
  no: number
  slug: string
  judul: string
  pertanyaan: string
  penjelasan: Blok[]
  seringKeliru?: { judul: string; isi: string; sumber?: string }
  intisari?: string[]
}

async function muatTahap(bab: string): Promise<Tahap[]> {
  if (bab === 'statistika') {
    const bagian = ['tahap-penyajian', 'tahap-pemusatan', 'tahap-hubungan', 'tahap-nyata']
    const semua: Tahap[] = []
    for (const b of bagian) {
      const mod = (await import(`../web/content/statistika/${b}.ts`)) as Record<string, Tahap[]>
      for (const v of Object.values(mod)) if (Array.isArray(v)) semua.push(...v)
    }
    return semua
  }
  const mod = (await import(`../web/content/${bab}/tahap.ts`)) as { TAHAP: Tahap[] }
  return mod.TAHAP
}

/** salinan pecahKolom dari components/topik/Penjelasan.tsx (berkas .tsx tidak bisa diimpor Node) */
function pecahKolom(baris: string): string[] {
  const kosongDepan = /^\s{2,}/.test(baris)
  const sel = baris.trim().split(/\s{2,}/).filter((s) => s.length > 0)
  return kosongDepan ? ['', ...sel] : sel
}

const POLA_KATA = /\b(sama dengan|tidak sama dengan|dikurangi|ditambah|dikali(?:kan)?|dibagi|pangkat|kuadrat|akar dari|per [0-9]|kali [0-9a-z]|tambah [0-9a-z]|kurang [0-9a-z])\b/

let total = 0
let potonganMat = 0
const galat: string[] = []
const prosaNyasar: string[] = []
const matNyasar: string[] = []
const rumusKata: string[] = []
const galeri: string[] = []
const lolos = (x: string) => x.replace(/&/g, '&amp;').replace(/</g, '&lt;')

function renderTeks(teks: string, blok: boolean): string {
  return pisahkan(teks).map((p) => {
    if (p.jenis === 'prosa') return lolos(p.teks)
    const tinggi = /\\dfrac|\\int|\\sum|\\sqrt|\\lim/.test(p.latex)
    const tampilBlok = blok && ((tinggi && p.latex.length > 26) || p.latex.length > 80)
    try {
      return `<span class="${tampilBlok ? 'mat-blok' : 'mat-baris'}">${katex.renderToString(tampilBlok ? p.latex : `\\displaystyle ${p.latex}`, { throwOnError: true, displayMode: tampilBlok, strict: false })}</span>`
    } catch {
      return `<span class="gagal">${lolos(p.teks)}</span>`
    }
  }).join('')
}

function periksa(bab: string, tahap: Tahap, nama: string, teks: string) {
  total++
  const tempat = `${bab} ${String(tahap.no).padStart(2, '0')} ${nama}`
  if (POLA_KATA.test(teks)) rumusKata.push(`${tempat}: "${teks.slice(0, 110)}"`)
  for (const p of pisahkan(teks)) {
    if (p.jenis === 'prosa') {
      if (/[=√∫Σ²³⁴⁵⁶⁷⁸⁹₀₁₂₃×·]/.test(p.teks)) matNyasar.push(`${tempat}: "${p.teks.slice(0, 80)}"`)
      continue
    }
    potonganMat++
    try {
      katex.renderToString(p.latex, { throwOnError: true, displayMode: false, strict: false })
    } catch (e) {
      galat.push(`${tempat}: "${p.teks}" -> ${p.latex}\n      ${String((e as Error).message).slice(0, 120)}`)
    }
    const k = p.latex.match(/\\text\{([^}]{4,})\}/g)?.filter((x) => !/^\\text\{(detik|menit|liter|meter)\}$/.test(x))
    if (k && k.length) prosaNyasar.push(`${tempat}: "${p.teks.slice(0, 70)}" -> ${k.join(' ')}`)
  }
}

function renderKontoh(b: Extract<Blok, { jenis: 'contoh' }>): string {
  const sel = b.baris.map(pecahKolom)
  const baris = sel.map((s) => `<div class="baris">${s.map((isi) => `<span>${renderTeks(isi, false)}</span>`).join('')}</div>`).join('')
  return `<div class="contoh"><div class="cap">${lolos(b.judul)}</div>${baris}${b.simpul ? `<div class="simpul">${renderTeks(b.simpul, true)}</div>` : ''}</div>`
}

for (const bab of BAB) {
  const daftar = await muatTahap(bab)
  for (const t of daftar) {
    const bagian: string[] = []
    periksa(bab, t, 'pertanyaan', t.pertanyaan)
    if (html) bagian.push(`<p class="tanya">${renderTeks(t.pertanyaan, true)}</p>`)
    t.penjelasan.forEach((b, i) => {
      const nama = `${b.jenis}#${i}`
      if (b.jenis === 'paragraf') {
        periksa(bab, t, nama, b.teks)
        if (html) bagian.push(`<p>${renderTeks(b.teks, true)}</p>`)
      } else if (b.jenis === 'sorot') {
        periksa(bab, t, nama, b.teks)
        if (html) bagian.push(`<p class="sorot">${renderTeks(b.teks, true)}</p>`)
      } else if (b.jenis === 'sesi') {
        periksa(bab, t, nama, b.judul)
        if (html) bagian.push(`<h4>${renderTeks(b.judul, false)}</h4>`)
      } else if (b.jenis === 'poin') {
        if (b.judul) periksa(bab, t, `${nama} judul`, b.judul)
        b.butir.forEach((x, n) => periksa(bab, t, `${nama} butir${n}`, x))
        if (html) bagian.push(`${b.judul ? `<h5>${renderTeks(b.judul, false)}</h5>` : ''}<ul>${b.butir.map((x) => `<li>${renderTeks(x, true)}</li>`).join('')}</ul>`)
      } else if (b.jenis === 'contoh') {
        periksa(bab, t, `${nama} judul`, b.judul)
        b.baris.forEach((x, n) => pecahKolom(x).forEach((sel, k) => periksa(bab, t, `${nama} baris${n} sel${k}`, sel)))
        if (b.simpul) periksa(bab, t, `${nama} simpul`, b.simpul)
        if (html) bagian.push(renderKontoh(b))
      } else if (b.jenis === 'coba') {
        periksa(bab, t, nama, b.teks)
        ;(b.langkah ?? []).forEach((x, n) => periksa(bab, t, `${nama} langkah${n}`, x))
        if (html) bagian.push(`<div class="coba"><b>Yuk bereksperimen</b><p>${renderTeks(b.teks, true)}</p><ol>${(b.langkah ?? []).map((x) => `<li>${renderTeks(x, true)}</li>`).join('')}</ol></div>`)
      }
    })
    if (t.seringKeliru) {
      periksa(bab, t, 'seringKeliru judul', t.seringKeliru.judul)
      periksa(bab, t, 'seringKeliru isi', t.seringKeliru.isi)
      if (html) bagian.push(`<div class="keliru"><b>Sering keliru: ${renderTeks(t.seringKeliru.judul, false)}</b><p>${renderTeks(t.seringKeliru.isi, true)}</p></div>`)
    }
    ;(t.intisari ?? []).forEach((x, n) => periksa(bab, t, `intisari${n}`, x))
    if (html && t.intisari) bagian.push(`<div class="intisari"><b>Ringkasan</b><ol>${t.intisari.map((x) => `<li>${renderTeks(x, true)}</li>`).join('')}</ol></div>`)
    if (html) galeri.push(`<section id="${bab}-${t.no}"><h3>${bab} · ${String(t.no).padStart(2, '0')} · ${lolos(t.judul)}</h3>${bagian.join('\n')}</section>`)
  }
}

console.log(`${total} teks, ${potonganMat} potongan matematika, ${galat.length} GALAT KaTeX, ${prosaNyasar.length} PROSA?, ${matNyasar.length} MAT?, ${rumusKata.length} KATA?`)
const cetak = (judul: string, daftar: string[], n: number) => {
  if (!daftar.length) return
  console.log(`\n== ${judul} (${daftar.length}), ${Math.min(n, daftar.length)} pertama:`)
  for (const d of daftar.slice(0, n)) console.log('  ' + d)
}
cetak('GALAT', galat, 40)
cetak('PROSA?', prosaNyasar, 40)
cetak('MAT?', matNyasar, 40)
if (kata) cetak('KATA?', rumusKata, 5000)
if (html) {
  mkdirSync(path.join(AKAR, 'qc'), { recursive: true })
  const kepala = `<!doctype html><meta charset="utf-8"><title>Pratinjau rumus bacaan materi</title>
<link rel="stylesheet" href="/web/node_modules/katex/dist/katex.min.css">
<style>body{font-family:system-ui,sans-serif;max-width:760px;margin:20px auto;padding:0 16px;line-height:1.6;color:#222}
section{border-top:2px solid #999;padding:14px 0}h3{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#888;margin:0 0 6px}
h4{font-size:17px;margin:18px 0 4px}h5{font-size:14px;margin:12px 0 2px}.tanya{font-style:italic;color:#666}
.sorot{border-left:3px solid #B08A3E;padding-left:10px}.contoh{background:#f6f0e0;padding:8px 12px;margin:8px 0;font-size:14px}
.contoh .cap{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#888}.contoh .baris{display:flex;gap:18px}.contoh .baris span:first-child{min-width:170px;color:#555}
.simpul{color:#a33;font-style:italic;margin-top:6px}.coba{background:#eef3ee;padding:8px 12px;margin:8px 0;font-size:14px}
.keliru{background:#fbecec;padding:8px 12px;margin:8px 0;font-size:14px}.intisari{background:#eee;padding:8px 12px;margin:8px 0;font-size:14px}
.mat-baris .katex{font-size:1.08em}.mat-blok{display:block;margin:10px 0;overflow-x:auto}.mat-blok .katex-display{margin:0}.gagal{background:#fcc}</style>`
  writeFileSync(path.join(AKAR, 'qc', 'rumus-materi.html'), kepala + galeri.join('\n'), 'utf8')
  console.log(`\nditulis qc/rumus-materi.html (${galeri.length} materi)`)
}
process.exitCode = galat.length ? 1 : 0
