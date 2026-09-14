#!/usr/bin/env node
/**
 * Meringkas satu bank soal ke teks padat: id, tingkat, pertanyaan, pilihan,
 * jawaban, gambar soal, dan ekspresi cek. Dipakai saat menulis ulang
 * pembahasan (14 Sep 2026) supaya soal lama bisa dibaca sekali lewat tanpa
 * membuka 1.000 baris berkasnya.
 *
 *   node alat/ringkas_kuis.mjs trigonometri
 */
import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const AKAR = path.resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const bab = process.argv[2]
const berkas = path.join(AKAR, 'web', 'content', bab, 'kuis.ts')
const sumber = readFileSync(berkas, 'utf8')
const cek = new Map()
for (const m of sumber.matchAll(/\/\/\s*cek:\s*(.+?)\r?\n\s*id:\s*'([^']+)'/g)) cek.set(m[2], m[1].trim())
const { KUIS } = await import(pathToFileURL(berkas).href)
for (const s of KUIS) {
  console.log(`\n[${s.tingkat}] ${s.id}: ${s.pertanyaan}`)
  console.log(`  pilihan: ${s.pilihan.map((p, i) => `${String.fromCharCode(65 + i)}) ${p}`).join(' | ')}  => ${String.fromCharCode(65 + s.benar)}`)
  if (s.gambar) console.log(`  gambar: ${JSON.stringify(s.gambar)}`)
  if (cek.has(s.id)) console.log(`  cek: ${cek.get(s.id)}`)
}
