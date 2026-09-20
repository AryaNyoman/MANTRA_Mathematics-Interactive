/**
 * Menjalankan pertanyaan uji Asisten Tanya ke rute lokal /api/tanya (dev server
 * 3210 dengan TANYA_TANPA_PEMBATAS=1 dan ANTHROPIC_API_KEY terisi) dan menulis
 * alat/uji_tanya/hasil-<tanggal>.md: jawaban utuh, poin wajib yang hilang,
 * poin terlarang yang muncul, dan biaya token. Penilaian akhir dibaca manusia.
 *
 *   node alat/uji_tanya/jalankan.mjs            semua
 *   node alat/uji_tanya/jalankan.mjs turunan    satu bab (atau id: trig-01 luar-02)
 *   TANYA_ALAMAT=https://.../api/tanya node alat/uji_tanya/jalankan.mjs
 * Berkas hasil ditulis ulang tiap kali; jalankan subset hanya untuk melihat
 * jawabannya di layar (`--tanpa-berkas`) atau terima hasilnya menimpa.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const DIR = path.dirname(fileURLToPath(import.meta.url))
const ALAMAT = process.env.TANYA_ALAMAT ?? 'http://localhost:3210/api/tanya'
const argv = process.argv.slice(2)
const tanpaBerkas = argv.includes('--tanpa-berkas')
const pilih = argv.filter((a) => !a.startsWith('--'))
const semua = JSON.parse(readFileSync(path.join(DIR, 'pertanyaan.json'), 'utf8')).filter((q) => !pilih.length || pilih.includes(q.bab) || pilih.includes(q.id))

async function tanya(q) {
  const res = await fetch(ALAMAT, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ bab: q.bab, materi: q.materi, kutipan: q.kutipan, pertanyaan: q.pertanyaan, riwayat: [] }),
  })
  if (!res.ok) return { teks: `GALAT ${res.status}: ${await res.text()}`, pemakaian: null, alasan: 'galat' }
  let teks = ''
  let pemakaian = null
  let alasan = ''
  for (const baris of (await res.text()).split('\n')) {
    if (!baris.startsWith('data:')) continue
    const ev = JSON.parse(baris.slice(5))
    if (ev.teks) teks += ev.teks
    if (ev.ganti) teks = ev.ganti
    if (ev.galat) teks += `\nGALAT: ${ev.galat}`
    if (ev.pemakaian) pemakaian = ev.pemakaian
    if (ev.alasan) alasan = ev.alasan
  }
  return { teks, pemakaian, alasan }
}

const tanggal = new Date().toISOString().slice(0, 10)
const baris = [`# Hasil uji Asisten Tanya, ${tanggal}`, '', `Alamat: ${ALAMAT}`, '']
let bermasalah = 0
let masuk = 0
let keluar = 0
let cacheBaca = 0
let cacheTulis = 0
const mulai = Date.now()
for (const q of semua) {
  const t0 = Date.now()
  const { teks, pemakaian, alasan } = await tanya(q)
  const detik = ((Date.now() - t0) / 1000).toFixed(1)
  const rendah = teks.toLowerCase()
  const hilang = q.poinWajib.filter((k) => !rendah.includes(k.toLowerCase()))
  const muncul = q.poinTerlarang.filter((k) => rendah.includes(k.toLowerCase()))
  const tanda = hilang.length || muncul.length || alasan === 'galat' ? 'PERIKSA' : 'ok'
  if (tanda === 'PERIKSA') bermasalah++
  if (pemakaian) {
    masuk += pemakaian.masuk
    keluar += pemakaian.keluar
    cacheBaca += pemakaian.cacheBaca
    cacheTulis += pemakaian.cacheTulis
  }
  baris.push(
    `## ${q.id} (${q.jenis}) ${tanda}`,
    '',
    q.kutipan ? `Kutipan: ${q.kutipan}` : '',
    q.pertanyaan ? `Pertanyaan: ${q.pertanyaan}` : '',
    '',
    teks.trim(),
    '',
    hilang.length ? `Poin wajib hilang: ${hilang.join(', ')}` : '',
    muncul.length ? `Poin terlarang muncul: ${muncul.join(', ')}` : '',
    pemakaian
      ? `Token: masuk ${pemakaian.masuk}, cache baca ${pemakaian.cacheBaca}, cache tulis ${pemakaian.cacheTulis}, keluar ${pemakaian.keluar}; ${detik} detik; berhenti: ${alasan}`
      : `${detik} detik; berhenti: ${alasan}`,
    '',
  )
  process.stdout.write(`${q.id.padEnd(14)} ${tanda.padEnd(8)} ${detik}s\n`)
  if (tanpaBerkas) process.stdout.write(`${teks.trim()}\n\n`)
}
// Haiku 4.5: $1 masuk, $5 keluar, cache baca 10 persen, cache tulis 125 persen per juta token; Rp 16.000 per dolar
const rp = ((masuk * 1 + cacheBaca * 0.1 + cacheTulis * 1.25 + keluar * 5) / 1e6) * 16000
const ringkas = `Ringkasan: ${semua.length} pertanyaan, ${bermasalah} perlu diperiksa manusia, ${((Date.now() - mulai) / 1000).toFixed(0)} detik, token masuk ${masuk} + cache baca ${cacheBaca} + cache tulis ${cacheTulis}, keluar ${keluar}; biaya kira-kira Rp ${Math.round(rp)} (Rp ${Math.round(rp / Math.max(1, semua.length))} per pertanyaan)`
baris.push(ringkas)
if (!tanpaBerkas) writeFileSync(path.join(DIR, `hasil-${tanggal}.md`), baris.filter((b) => b !== undefined).join('\n'))
console.log(ringkas)
