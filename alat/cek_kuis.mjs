#!/usr/bin/env node
/**
 * Pemeriksa bank soal latihan (`web/content/<bab>/kuis.ts`).
 *
 *   node alat/cek_kuis.mjs trigonometri          satu bab
 *   node alat/cek_kuis.mjs --semua               semua bab
 *   node alat/cek_kuis.mjs --semua --ketat       wajib 15 soal per tingkat dan langkah terisi
 *
 * Memuat kuis.ts langsung lewat Node (tipe dibuang otomatis), lalu memeriksa:
 * id unik, `benar` sah, lima pilihan tanpa kembar, tanpa em-dash, tanpa kata
 * "miskonsepsi", gambar berbentuk sah (fungsi bisa dihitung, panjang data
 * cocok), dan ekspresi `// cek: <js>` yang ditulis tepat di atas `id:` di
 * dalam objek soal: dievaluasi, harus benar. Jawaban angka jadi diperiksa
 * mesin, bukan dipercaya begitu saja (pelajaran 12 Sep: soal buatan sendiri
 * pernah keliru dan lolos karena tidak ada yang menghitung ulang).
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const AKAR = path.resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))
const KONTEN = path.join(AKAR, 'web', 'content')
const TINGKAT = ['mudah', 'sedang', 'sulit', 'sangat sulit']
const JENIS_GAMBAR = new Set(['segitiga', 'lingkaran', 'grafik', 'vektor', 'batang', 'garis-data', 'balok', 'bidang', 'luas', 'svg'])

const argv = process.argv.slice(2)
const ketat = argv.includes('--ketat')
const semua = argv.includes('--semua')
const bab = semua
  ? readdirSync(KONTEN).filter((d) => existsSync(path.join(KONTEN, d, 'kuis.ts')))
  : argv.filter((a) => !a.startsWith('--'))
if (bab.length === 0) {
  console.error('sebut nama bab atau --semua')
  process.exit(2)
}

function evalFungsi(rumus, x) {
  return Function('x', 'Math', `"use strict"; return (${rumus});`)(x, Math)
}

function periksaGambar(g, cacat, id) {
  if (!JENIS_GAMBAR.has(g.jenis)) return cacat.push(`${id}: jenis gambar '${g.jenis}' tidak dikenal`)
  const tolak = (pesan) => cacat.push(`${id}: gambar ${g.jenis}: ${pesan}`)
  if (g.jenis === 'segitiga' && (!Array.isArray(g.label) || g.label.length !== 3)) tolak('label harus 3 (depan, samping, miring)')
  if (g.jenis === 'lingkaran' && typeof g.sudut !== 'number') tolak('sudut harus angka')
  if (g.jenis === 'grafik' || g.jenis === 'luas') {
    const daftar = g.jenis === 'grafik' ? g.fungsi : [g.fungsi, g.fungsi2].filter(Boolean)
    for (const f of daftar) {
      try {
        const y = evalFungsi(f, 1.37)
        if (typeof y !== 'number') tolak(`fungsi '${f}' tidak menghasilkan angka`)
      } catch (e) {
        tolak(`fungsi '${f}' tidak bisa dihitung: ${e.message}`)
      }
    }
    if (g.jenis === 'luas' && !(g.dari < g.sampai)) tolak('dari harus < sampai')
  }
  if ((g.jenis === 'batang' || g.jenis === 'garis-data') && g.kategori.length !== g.nilai.length) tolak('kategori dan nilai beda panjang')
  if (g.jenis === 'vektor' && (!Array.isArray(g.panah) || g.panah.length === 0)) tolak('panah kosong')
  if (g.jenis === 'balok' && g.ukuran.some((u) => !(u > 0))) tolak('ukuran harus positif')
  if (g.jenis === 'bidang' && (!Array.isArray(g.bangun) || g.bangun.length < 2)) tolak('bangun kurang dari 2 titik')
  if (g.jenis === 'svg' && (!g.viewBox || !g.isi)) tolak('viewBox dan isi wajib')
}

let totalCacat = 0
for (const b of bab) {
  const berkas = path.join(KONTEN, b, 'kuis.ts')
  const sumber = readFileSync(berkas, 'utf8')
  const mod = await import(pathToFileURL(berkas).href)
  const KUIS = mod.KUIS
  const cacat = []
  const peringatan = []

  // ekspresi cek: komentar tepat di atas `id:` dalam objek soal
  const cek = new Map()
  for (const m of sumber.matchAll(/\/\/\s*cek:\s*(.+?)\r?\n\s*id:\s*'([^']+)'/g)) cek.set(m[2], m[1].trim())

  const ids = new Set()
  const perTingkat = Object.fromEntries(TINGKAT.map((t) => [t, 0]))
  for (const s of KUIS) {
    if (ids.has(s.id)) cacat.push(`${s.id}: id kembar`)
    ids.add(s.id)
    if (!TINGKAT.includes(s.tingkat)) cacat.push(`${s.id}: tingkat '${s.tingkat}' tidak dikenal`)
    else perTingkat[s.tingkat]++
    if (!Array.isArray(s.pilihan) || s.pilihan.length !== 5) cacat.push(`${s.id}: pilihan harus 5, ada ${s.pilihan?.length}`)
    if (new Set(s.pilihan).size !== s.pilihan.length) cacat.push(`${s.id}: pilihan kembar`)
    if (!(Number.isInteger(s.benar) && s.benar >= 0 && s.benar < s.pilihan.length)) cacat.push(`${s.id}: indeks benar ${s.benar} di luar pilihan`)
    const teks = [s.pertanyaan, s.alasan, s.jebakan ?? '', ...(s.pilihan ?? []), ...(s.langkah ?? [])].join('\n')
    if (teks.includes('—')) cacat.push(`${s.id}: ada em-dash`)
    if (/miskonsepsi/i.test(teks)) cacat.push(`${s.id}: kata "miskonsepsi" dilarang di halaman siswa`)
    if (ketat && !(Array.isArray(s.langkah) && s.langkah.length >= 2)) cacat.push(`${s.id}: langkah pembahasan kosong atau kurang dari 2`)
    if (ketat && s.langkah && s.langkah.length > 7) peringatan.push(`${s.id}: langkah ${s.langkah.length} butir, terlalu panjang?`)
    if (s.gambar) periksaGambar(s.gambar, cacat, s.id)
    const e = cek.get(s.id)
    if (e) {
      try {
        // D = derajat ke radian, supaya ekspresi cek boleh menulis Math.sin(30*D)
        const hasil = Function('Math', 's', 'D', `"use strict"; return (${e});`)(Math, s, Math.PI / 180)
        if (!hasil) cacat.push(`${s.id}: cek gagal: ${e}`)
      } catch (err) {
        cacat.push(`${s.id}: cek tidak bisa dihitung: ${e} (${err.message})`)
      }
    } else if (ketat) {
      // soal tanpa pemeriksa mesin: hanya peringatan, sebab soal definisi memang tidak punya angka
      if (/\d/.test(s.pilihan[s.benar] ?? '')) peringatan.push(`${s.id}: jawaban berangka tanpa // cek:`)
    }
  }
  const ringkas = TINGKAT.map((t) => `${t} ${perTingkat[t]}`).join(', ')
  if (ketat) for (const t of TINGKAT) if (perTingkat[t] !== 15) cacat.push(`tingkat ${t}: ${perTingkat[t]} soal, harus 15`)

  console.log(`${cacat.length ? 'CACAT ' : 'ok    '} ${b.padEnd(22)} ${KUIS.length} soal (${ringkas}), gambar ${KUIS.filter((s) => s.gambar).length}, cek mesin ${cek.size}`)
  for (const c of cacat) console.log(`         ${c}`)
  for (const p of peringatan) console.log(`         peringatan: ${p}`)
  totalCacat += cacat.length
}
console.log(totalCacat ? `\n${totalCacat} cacat` : '\nSEMUA LOLOS')
process.exit(totalCacat ? 1 : 0)
