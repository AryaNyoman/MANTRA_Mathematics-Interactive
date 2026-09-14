/**
 * Cetak semua kotak "Yuk bereksperimen" (blok `coba`) beserta blok yang
 * langsung mengikutinya, untuk diperiksa satu per satu.
 *
 * Dibuat 14 Sep 2026 setelah ARYA menemukan kotak coba yang butir
 * terakhirnya berupa kesimpulan (kesimpulan tidak boleh diberikan selagi
 * siswa bereksperimen; butir terakhir harus pertanyaan) dan penutup
 * "Yang kamu temukan" yang membingungkan.
 *
 *   node alat/ringkas_coba.mjs            semua topik
 *   node alat/ringkas_coba.mjs trigonometri
 */
import { readdirSync, existsSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

const AKAR = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..', 'web', 'content')
const pilih = process.argv[2]
const topik = readdirSync(AKAR, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(path.join(AKAR, d.name, 'tahap.ts')))
  .map((d) => d.name)
  .filter((t) => !pilih || t === pilih)

const ringkas = (b) => {
  if (!b) return '(tidak ada)'
  if (b.jenis === 'sorot') return `SOROT: ${b.teks}`
  if (b.jenis === 'sesi') return `SESI: ${b.judul}`
  if (b.jenis === 'paragraf') return `PARAGRAF: ${b.teks.slice(0, 90)}...`
  if (b.jenis === 'poin') return `POIN: ${b.judul ?? ''} (${b.butir.length} butir)`
  if (b.jenis === 'contoh') return `CONTOH: ${b.judul}`
  return b.jenis.toUpperCase()
}

// statistika dipecah beberapa berkas yang digabung lewat alias '@/content',
// yang tidak dikenal node; berkas bagiannya dibaca langsung
const BERKAS = {
  statistika: ['tahap-penyajian.ts', 'tahap-pemusatan.ts', 'tahap-hubungan.ts', 'tahap-nyata.ts'],
}

for (const t of topik) {
  const daftar = []
  for (const b of BERKAS[t] ?? ['tahap.ts']) {
    const mod = await import(pathToFileURL(path.join(AKAR, t, b)).href)
    for (const nilai of Object.values(mod)) if (Array.isArray(nilai)) daftar.push(...nilai)
  }
  if (daftar.length === 0) { console.log(`?? ${t}: TAHAP tidak ditemukan`); continue }
  for (const th of daftar) {
    const blok = th.penjelasan ?? []
    blok.forEach((b, i) => {
      if (b.jenis !== 'coba') return
      console.log(`\n== ${t} / ${th.no ?? '?'} ${th.judul} (blok ${i})`)
      console.log(`   teks: ${b.teks}`)
      ;(b.langkah ?? []).forEach((l, n) => console.log(`   ${n + 1}. ${l}`))
      console.log(`   berikutnya: ${ringkas(blok[i + 1])}`)
    })
  }
}
