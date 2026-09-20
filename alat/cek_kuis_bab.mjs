#!/usr/bin/env node
/**
 * Pemeriksa paket kuis bab (`KUIS_BAB` di `web/content/<bab>/kuis.ts`),
 * keputusan ARYA 20 Sep 2026: kuis bab hanya menguji yang diajarkan bab itu.
 *
 *   node alat/cek_kuis_bab.mjs                semua bab
 *   node alat/cek_kuis_bab.mjs trigonometri   satu bab
 *
 * Yang diperiksa tiap bab:
 *   - tepat 10 butir, tanpa id ganda;
 *   - tiap id ada di `KUIS` bab itu;
 *   - tiap `materi` ada di `TAHAP` bab itu dan materinya `siap`;
 *   - tiap sub-bab (`content/subbab.ts`) terwakili minimal satu soal, kecuali
 *     sub-bab Penerapan (galeri dunia nyata) yang boleh kosong;
 *   - soal bergambar punya `langkah` (pembahasan di halaman hasil harus
 *     bergambar juga, ARYA 20 Sep 2026): minimal satu butir langkah bergambar.
 * Kurasi isinya (apakah konsep soal benar-benar tertulis di bacaan) tetap
 * pekerjaan manusia; alat ini hanya menjaga bentuknya.
 */
import { existsSync, readdirSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const AKAR = path.resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const KONTEN = path.join(AKAR, 'web', 'content')
const JUMLAH = 10

const modul = (relatif) => import(pathToFileURL(path.join(KONTEN, relatif)).href)

async function muatTahap(bab) {
  // Statistika memakai alias @/ di tahap.ts, jadi keempat bagiannya dimuat langsung.
  if (bab === 'statistika') {
    const semua = []
    for (const b of ['tahap-penyajian', 'tahap-pemusatan', 'tahap-hubungan', 'tahap-nyata']) {
      const mod = await modul(`statistika/${b}.ts`)
      for (const v of Object.values(mod)) if (Array.isArray(v)) semua.push(...v)
    }
    return semua.sort((a, b) => a.no - b.no)
  }
  return (await modul(`${bab}/tahap.ts`)).TAHAP
}

const pilih = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const daftarBab = pilih.length
  ? pilih
  : readdirSync(KONTEN).filter((d) => existsSync(path.join(KONTEN, d, 'kuis.ts')))
const { BAB } = await modul('subbab.ts')

let gagal = 0
for (const bab of daftarBab) {
  const cacat = []
  const { KUIS, KUIS_BAB } = await modul(`${bab}/kuis.ts`)
  const tahap = await muatTahap(bab)
  if (!Array.isArray(KUIS_BAB)) {
    console.log(`${bab}: KUIS_BAB tidak ada`)
    gagal++
    continue
  }
  if (KUIS_BAB.length !== JUMLAH) cacat.push(`jumlah butir ${KUIS_BAB.length}, harus ${JUMLAH}`)
  const soalPerId = new Map(KUIS.map((s) => [s.id, s]))
  const tahapPerSlug = new Map(tahap.map((t) => [t.slug, t]))
  const terlihat = new Set()
  const nomorTerwakili = new Set()
  for (const b of KUIS_BAB) {
    if (terlihat.has(b.id)) cacat.push(`${b.id}: id ganda`)
    terlihat.add(b.id)
    const soal = soalPerId.get(b.id)
    if (!soal) cacat.push(`${b.id}: tidak ada di KUIS`)
    const t = tahapPerSlug.get(b.materi)
    if (!t) cacat.push(`${b.id}: materi '${b.materi}' tidak ada di TAHAP`)
    else {
      if (t.siap === false) cacat.push(`${b.id}: materi '${b.materi}' belum siap`)
      nomorTerwakili.add(t.no)
    }
    if (soal?.gambar) {
      const adaGambar = (soal.langkah ?? []).some((l) => typeof l !== 'string' && l.gambar)
      if (!adaGambar) cacat.push(`${b.id}: soal bergambar tetapi tidak ada langkah bergambar`)
    }
  }
  const peta = BAB.find((b) => b.slug === bab)
  if (!peta) cacat.push('bab tidak ada di content/subbab.ts')
  else {
    for (const sub of peta.sub) {
      if (sub.nama.startsWith('Penerapan')) continue
      if (!sub.nomor.some((n) => nomorTerwakili.has(n))) cacat.push(`sub-bab ${sub.huruf} (${sub.nama}) tidak terwakili`)
    }
  }
  if (cacat.length) {
    gagal++
    console.log(`${bab}: ${cacat.length} cacat`)
    for (const c of cacat) console.log(`  - ${c}`)
  } else {
    const materi = new Set(KUIS_BAB.map((b) => b.materi)).size
    console.log(`${bab}: ok (${JUMLAH} soal, ${materi} materi)`)
  }
}
if (gagal) {
  console.log(`\n${gagal} bab bermasalah`)
  process.exit(1)
}
console.log('\nsemua paket kuis bab lolos')
