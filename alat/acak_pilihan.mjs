#!/usr/bin/env node
/**
 * Menyebar huruf jawaban benar sebuah bank soal (14 Sep 2026).
 *
 *   node alat/acak_pilihan.mjs turunan            satu bab
 *   node alat/acak_pilihan.mjs --semua            semua bab
 *
 * Temuan 14 Sep: di bank Turunan dan Grafik Fungsi SEMUA jawaban benar ada di
 * pilihan A, dan di bank lain A jauh lebih sering; siswa bisa menebak tanpa
 * mengerjakan. Alat ini mengocok urutan pilihan tiap soal supaya tiap huruf
 * A sampai E menjadi jawaban benar kira-kira sama seringnya (12 dari 60),
 * dengan urutan acak yang TETAP (benih dari nama bab) supaya hasilnya sama
 * bila dijalankan ulang, lalu memperbaiki huruf yang disebut pembahasan:
 * "(Jawaban C)" di langkah terakhir dan "Pilihan D, 3/5, ..." di jebakan.
 *
 * Bekerja pada teks `kuis.ts` baris demi baris: tiap soal adalah blok dari
 * baris "  {" sampai "  },", dengan `pilihan: [...]` dan `benar: n` masing
 * masing satu baris. Jalankan `alat/cek_kuis.mjs <bab> --ketat` sesudahnya;
 * pemeriksa itu menolak bila "(Jawaban X)" tidak cocok dengan `benar`.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import path from 'node:path'

const AKAR = path.resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const KONTEN = path.join(AKAR, 'web', 'content')
const argv = process.argv.slice(2)
const bab = argv.includes('--semua')
  ? readdirSync(KONTEN).filter((d) => existsSync(path.join(KONTEN, d, 'kuis.ts')))
  : argv.filter((a) => !a.startsWith('--'))
if (bab.length === 0) { console.error('sebut nama bab atau --semua'); process.exit(2) }

/** pembangkit acak berbenih (mulberry32) supaya hasil kocokan tetap */
function acakBerbenih(teks) {
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

const HURUF = 'ABCDE'

for (const b of bab) {
  const berkas = path.join(KONTEN, b, 'kuis.ts')
  const baris = readFileSync(berkas, 'utf8').split('\n')
  const acak = acakBerbenih(b)

  // blok soal: indeks baris awal dan akhir
  const blok = []
  for (let i = 0; i < baris.length; i++) {
    if (/^  \{\s*$/.test(baris[i])) {
      let j = i + 1
      while (j < baris.length && !/^  \},?\s*$/.test(baris[j])) j++
      blok.push([i, j])
      i = j
    }
  }
  // sasaran huruf benar: 0..4 bergiliran lalu dikocok
  const sasaran = blok.map((_, i) => i % 5)
  for (let i = sasaran.length - 1; i > 0; i--) {
    const j = Math.floor(acak() * (i + 1))
    ;[sasaran[i], sasaran[j]] = [sasaran[j], sasaran[i]]
  }

  let diubah = 0
  blok.forEach(([awal, akhir], k) => {
    let iPilihan = -1, iBenar = -1
    for (let i = awal; i <= akhir; i++) {
      if (/^    pilihan: \[/.test(baris[i])) iPilihan = i
      if (/^    benar: \d,?\s*$/.test(baris[i])) iBenar = i
    }
    if (iPilihan < 0 || iBenar < 0) { console.error(`${b}: blok baris ${awal + 1} tanpa pilihan/benar satu baris`); process.exit(1) }
    const teksPilihan = baris[iPilihan].replace(/^    pilihan: /, '').replace(/,\s*$/, '')
    const pilihan = Function(`"use strict"; return (${teksPilihan});`)()
    const benar = Number(baris[iBenar].match(/\d/)[0])
    if (!Array.isArray(pilihan) || pilihan.length !== 5) { console.error(`${b}: pilihan bukan 5 di baris ${iPilihan + 1}`); process.exit(1) }
    const target = sasaran[k]
    if (target === benar) return
    // urutan baru: jawaban benar pindah ke `target`, sisanya mengisi urut
    const sisa = pilihan.filter((_, i) => i !== benar)
    const baru = []
    let s = 0
    for (let i = 0; i < 5; i++) baru.push(i === target ? pilihan[benar] : sisa[s++])
    // peta huruf lama -> baru
    const peta = {}
    pilihan.forEach((p, lama) => { peta[HURUF[lama]] = HURUF[baru.indexOf(p)] })
    const kutip = (t) => `'${t.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
    baris[iPilihan] = `    pilihan: [${baru.map(kutip).join(', ')}],`
    baris[iBenar] = baris[iBenar].replace(/\d/, String(target))
    for (let i = awal; i <= akhir; i++) {
      if (i === iPilihan || i === iBenar) continue
      baris[i] = baris[i]
        .replace(/\(Jawaban ([A-E])\)/g, (_, h) => `(Jawaban ${peta[h]})`)
        .replace(/\b([Pp]ilihan) ([A-E])((?:(?:,\s|\s(?:dan|atau|serta)\s|,\s(?:dan|atau)\s)[A-E](?![\w√]))*)/g,
          (m, kata, h1, ekor) => `${kata} ${peta[h1]}${ekor.replace(/[A-E]/g, (h) => peta[h])}`)
        .replace(/\bjawaban ([A-E])\b/g, (_, h) => `jawaban ${peta[h]}`)
    }
    diubah++
  })
  writeFileSync(berkas, baris.join('\n'), 'utf8')
  const sebaran = [0, 0, 0, 0, 0]
  sasaran.forEach((t) => sebaran[t]++)
  console.log(`${b.padEnd(22)} ${blok.length} soal, ${diubah} dikocok, sebaran A..E: ${sebaran.join(' ')}`)
}
