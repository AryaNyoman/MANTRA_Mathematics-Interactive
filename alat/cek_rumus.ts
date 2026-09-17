/**
 * Memeriksa pengubah rumus (web/lib/mat-latex.ts) terhadap SELURUH bank soal:
 * tiap teks (pertanyaan, pilihan, alasan, jebakan, langkah) dipilah jadi prosa
 * dan matematika, matematikanya dijadikan LaTeX lalu dicoba dirender KaTeX.
 *
 *   node alat/cek_rumus.ts            ringkasan + galat + contoh mencurigakan
 *   node alat/cek_rumus.ts --semua    tulis semua hasil ke qc/rumus.jsonl
 *   node alat/cek_rumus.ts --html     tulis galeri qc/rumus.html (semua soal, KaTeX) untuk dilihat
 *                                     lewat node ~/.claude/bin/static-server.mjs . 4321
 *   node alat/cek_rumus.ts integral   satu bab saja
 *
 * Jalan dengan Node 24 (pengupasan tipe bawaan). Yang dilaporkan:
 *   GALAT   : KaTeX menolak LaTeX-nya (harus nol sebelum tayang)
 *   PROSA?  : potongan matematika memuat \text{kata} panjang (prosa nyasar)
 *   MAT?    : potongan prosa memuat lambang matematika (rumus tertinggal)
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import katex from '../web/node_modules/katex/dist/katex.mjs'
import { pisahkan } from '../web/lib/mat-latex.ts'

const AKAR = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const argv = process.argv.slice(2)
const semua = argv.includes('--semua')
const html = argv.includes('--html')
const babPilih = argv.filter((a) => !a.startsWith('--'))
const BAB = babPilih.length
  ? babPilih
  : ['trigonometri', 'limit', 'grafik-fungsi', 'vektor', 'ruang-3d', 'statistika', 'transformasi-geometri', 'turunan', 'integral']

type Soal = {
  id: string
  tingkat: string
  pertanyaan: string
  pilihan: string[]
  alasan: string
  jebakan?: string
  langkah?: (string | { teks: string })[]
}

let total = 0
let potonganMat = 0
const galat: string[] = []
const prosaNyasar: string[] = []
const matNyasar: string[] = []
const semuaHasil: object[] = []
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

for (const bab of BAB) {
  const mod = (await import(`../web/content/${bab}/kuis.ts`)) as { KUIS: Soal[] }
  // bank latihan di dalam halaman materi (latihan.ts): pertanyaan, pilihan, pembahasan bertahap
  let latihan: Soal[] = []
  try {
    const modL = (await import(`../web/content/${bab}/latihan.ts`)) as { LATIHAN: { pertanyaan: string; pilihan: string[]; pembahasan: string[]; jawaban: string }[] }
    latihan = modL.LATIHAN.map((l, i) => ({ id: `latihan-${i + 1}`, tingkat: 'materi', pertanyaan: l.pertanyaan, pilihan: l.pilihan, alasan: l.jawaban, langkah: l.pembahasan }))
  } catch {
    latihan = []
  }
  for (const s of [...mod.KUIS, ...latihan]) {
    if (html) {
      galeri.push(`<section><h3>${bab} · ${s.id} · ${s.tingkat}</h3><p class="soal">${renderTeks(s.pertanyaan, true)}</p><ol class="opsi">${s.pilihan.map((p) => `<li>${renderTeks(p, false)}</li>`).join('')}</ol><ol class="langkah">${(s.langkah ?? []).map((lg) => `<li>${renderTeks(typeof lg === 'string' ? lg : lg.teks, true)}</li>`).join('')}</ol>${s.jebakan ? `<p class="jebakan">${renderTeks(s.jebakan, true)}</p>` : ''}<p class="alasan">${renderTeks(s.alasan, true)}</p></section>`)
    }
    const bidang: [string, string][] = [
      ['pertanyaan', s.pertanyaan],
      ...s.pilihan.map((p, i): [string, string] => [`pilihan${i}`, p]),
      ['alasan', s.alasan],
    ]
    if (s.jebakan) bidang.push(['jebakan', s.jebakan])
    for (const [i, lg] of (s.langkah ?? []).entries()) bidang.push([`langkah${i}`, typeof lg === 'string' ? lg : lg.teks])
    for (const [nama, teks] of bidang) {
      total++
      const potongan = pisahkan(teks)
      const hasil: { jenis: string; teks: string; latex?: string; galat?: string }[] = []
      for (const p of potongan) {
        if (p.jenis === 'prosa') {
          hasil.push({ jenis: 'prosa', teks: p.teks })
          if (/[=√∫Σ²³⁴⁵⁶⁷⁸⁹₀₁₂₃×·]/.test(p.teks)) matNyasar.push(`${bab} ${s.id} ${nama}: "${p.teks.slice(0, 80)}"`)
          continue
        }
        potonganMat++
        let pesan: string | undefined
        try {
          katex.renderToString(p.latex, { throwOnError: true, displayMode: false, strict: false })
        } catch (e) {
          pesan = String((e as Error).message).slice(0, 120)
          galat.push(`${bab} ${s.id} ${nama}: "${p.teks}" -> ${p.latex}\n      ${pesan}`)
        }
        const kata = p.latex.match(/\\text\{([^}]{4,})\}/g)?.filter((k) => !/^\\text\{(detik|menit|liter)\}$/.test(k))
        if (kata && kata.length) prosaNyasar.push(`${bab} ${s.id} ${nama}: "${p.teks.slice(0, 70)}" -> ${kata.join(' ')}`)
        hasil.push({ jenis: 'mat', teks: p.teks, latex: p.latex, galat: pesan })
      }
      if (semua) semuaHasil.push({ bab, id: s.id, tingkat: s.tingkat, bidang: nama, teks, potongan: hasil })
    }
  }
}

console.log(`${total} teks, ${potonganMat} potongan matematika, ${galat.length} GALAT KaTeX, ${prosaNyasar.length} PROSA?, ${matNyasar.length} MAT?`)
const cetak = (judul: string, daftar: string[], n = 25) => {
  if (!daftar.length) return
  console.log(`\n== ${judul} (${daftar.length}), ${Math.min(n, daftar.length)} pertama:`)
  for (const d of daftar.slice(0, n)) console.log('  ' + d)
}
cetak('GALAT', galat)
cetak('PROSA?', prosaNyasar)
cetak('MAT?', matNyasar)
if (semua) {
  mkdirSync(path.join(AKAR, 'qc'), { recursive: true })
  writeFileSync(path.join(AKAR, 'qc', 'rumus.jsonl'), semuaHasil.map((h) => JSON.stringify(h)).join('\n') + '\n', 'utf8')
  console.log(`\nditulis qc/rumus.jsonl (${semuaHasil.length} baris)`)
}
if (html) {
  mkdirSync(path.join(AKAR, 'qc'), { recursive: true })
  const kepala = `<!doctype html><meta charset="utf-8"><title>Pratinjau rumus bank soal</title>
<link rel="stylesheet" href="/web/node_modules/katex/dist/katex.min.css">
<style>body{font-family:system-ui,sans-serif;max-width:760px;margin:20px auto;padding:0 16px;line-height:1.6;color:#222}
section{border-top:1px solid #ccc;padding:14px 0}h3{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#888;margin:0 0 6px}
.soal{font-size:16px}.opsi li{margin:3px 0}.langkah{margin:8px 0;padding-left:22px}.langkah li{margin:6px 0}
.jebakan{background:#f6f0e0;padding:8px 10px;font-size:14px}.alasan{color:#555;font-size:14px}
.mat-baris .katex{font-size:1.08em}.mat-blok{display:block;margin:10px 0;overflow-x:auto}.mat-blok .katex-display{margin:0}.gagal{background:#fcc}</style>`
  writeFileSync(path.join(AKAR, 'qc', 'rumus.html'), kepala + galeri.join('\n'), 'utf8')
  console.log(`\nditulis qc/rumus.html (${galeri.length} soal)`)
}
process.exitCode = galat.length ? 1 : 0
