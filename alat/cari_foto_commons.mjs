/**
 * Mencari foto berlisensi bebas di Wikimedia Commons untuk galeri "dunia
 * nyata" (ARYA 18 Sep 2026: galeri harus berfoto asli, bukan grafik saja).
 *
 *   node alat/cari_foto_commons.mjs cari  <daftar.json> <folder-keluar>
 *       daftar.json: [{ "kunci": "limit-rel-wahana", "cari": "roller coaster track" }, ...]
 *       Untuk tiap kunci: cari di Commons, saring lisensi bebas dan foto
 *       mendatar, unduh sampai 4 calon (lebar 320 px) ke <folder-keluar>/<kunci>-<n>.jpg
 *       dan tulis <folder-keluar>/calon.json (judul, pemotret, lisensi, halaman, url).
 *
 *   node alat/cari_foto_commons.mjs ambil <pilihan.json> <folder-keluar>
 *       pilihan.json: [{ "kunci": "limit-rel-wahana", "judul": "File:....jpg", "berkas": "limit/rel-wahana.jpg" }, ...]
 *       Mengunduh versi lebar 1000 px, menyimpan ke web/public/gambar/<berkas>
 *       (dikompres di bawah 150 KB oleh alat/kecilkan_foto.py sesudahnya),
 *       dan menambahkan catatan sumbernya ke web/public/gambar/sumber.json.
 *
 * Lisensi yang diterima: CC0, domain publik, CC BY, CC BY-SA (semua versi).
 * Nama pemotret dan lisensinya dicatat, dan galeri menampilkan baris kredit.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const AKAR = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const API = 'https://commons.wikimedia.org/w/api.php'
const UA = 'MANTRA-galeri/1.0 (situs belajar matematika; https://mantra-matematika.vercel.app)'
const LISENSI_OK = /^(cc0|public domain|pd|cc by(-sa)?( \d\.\d)?)/i

async function api(params) {
  const u = new URL(API)
  for (const [k, v] of Object.entries({ format: 'json', origin: '*', ...params })) u.searchParams.set(k, v)
  const r = await fetch(u, { headers: { 'User-Agent': UA } })
  if (!r.ok) throw new Error(`${r.status} ${u}`)
  return r.json()
}

function bersih(html) {
  return (html || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
}

async function infoBerkas(judul, lebar) {
  const j = await api({
    action: 'query', titles: judul, prop: 'imageinfo',
    iiprop: 'url|size|extmetadata|mime', iiurlwidth: String(lebar),
    iiextmetadatafilter: 'LicenseShortName|Artist|Credit|ObjectName|ImageDescription',
  })
  const halaman = Object.values(j.query.pages)[0]
  const ii = halaman.imageinfo && halaman.imageinfo[0]
  if (!ii) return null
  const m = ii.extmetadata || {}
  return {
    judul: halaman.title,
    lebar: ii.width, tinggi: ii.height, mime: ii.mime,
    url: ii.thumburl || ii.url,
    halaman: ii.descriptionurl,
    lisensi: bersih(m.LicenseShortName && m.LicenseShortName.value),
    penulis: bersih(m.Artist && m.Artist.value),
    keterangan: bersih(m.ImageDescription && m.ImageDescription.value).slice(0, 160),
  }
}

async function unduh(url, ke) {
  const r = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!r.ok) throw new Error(`${r.status} ${url}`)
  const b = Buffer.from(await r.arrayBuffer())
  writeFileSync(ke, b)
  return b.length
}

async function cari(daftar, keluar) {
  mkdirSync(keluar, { recursive: true })
  const semua = {}
  for (const { kunci, cari: kata } of daftar) {
    const j = await api({
      action: 'query', list: 'search', srnamespace: '6', srlimit: '30',
      srsearch: `${kata} filetype:bitmap`,
    })
    const calon = []
    for (const s of j.query.search) {
      if (calon.length >= 4) break
      if (!/\.(jpe?g|png)$/i.test(s.title)) continue
      let info
      try { info = await infoBerkas(s.title, 320) } catch { continue }
      if (!info || !LISENSI_OK.test(info.lisensi)) continue
      if (info.lebar < 1000 || info.tinggi > info.lebar) continue
      const berkas = path.join(keluar, `${kunci}-${calon.length + 1}.jpg`)
      try { await unduh(info.url, berkas) } catch { continue }
      calon.push({ ...info, contoh: berkas })
    }
    semua[kunci] = calon
    console.log(`${kunci}: ${calon.length} calon`)
  }
  writeFileSync(path.join(keluar, 'calon.json'), JSON.stringify(semua, null, 2))
}

async function ambil(pilihan, keluar) {
  const sumberPath = path.join(AKAR, 'web', 'public', 'gambar', 'sumber.json')
  const sumber = JSON.parse(readFileSync(sumberPath, 'utf8'))
  for (const p of pilihan) {
    const info = await infoBerkas(p.judul, 1000)
    if (!info) { console.log(`${p.kunci}: tidak ditemukan`); continue }
    const tujuan = path.join(AKAR, 'web', 'public', 'gambar', p.berkas)
    mkdirSync(path.dirname(tujuan), { recursive: true })
    const n = await unduh(info.url, tujuan)
    sumber[p.kunci] = {
      judul: info.judul.replace(/^File:/, ''),
      penulis: info.penulis,
      lisensi: info.lisensi,
      halaman: info.halaman,
      asli: `${info.lebar}x${info.tinggi}`,
      catatan: 'diperkecil ke lebar 1000 piksel dan dikompres di bawah 150 KB',
    }
    console.log(`${p.kunci}: ${Math.round(n / 1024)} KB  ${info.lisensi}  ${info.penulis}`)
  }
  writeFileSync(sumberPath, JSON.stringify(sumber, null, 2) + '\n')
  console.log(`sumber.json: ${Object.keys(sumber).length} catatan`)
}

const [perintah, berkasDaftar, keluar] = process.argv.slice(2)
if (!perintah || !berkasDaftar || !keluar || !existsSync(berkasDaftar)) {
  console.error('pakai: node alat/cari_foto_commons.mjs cari|ambil <daftar.json> <folder>')
  process.exit(1)
}
const daftar = JSON.parse(readFileSync(berkasDaftar, 'utf8'))
if (perintah === 'cari') await cari(daftar, keluar)
else if (perintah === 'ambil') await ambil(daftar, keluar)
else { console.error('perintah harus cari atau ambil'); process.exit(1) }
