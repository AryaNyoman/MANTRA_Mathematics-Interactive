/**
 * Pemeriksa dan pencari tautan YouTube untuk kotak "Pelajari lebih dalam
 * lewat YouTube" (ARYA 18 Sep 2026: tautan harus mengikuti NAMA sub-bab, dan
 * kreatornya jangan itu-itu saja, asal subscriber dan tontonannya banyak).
 *
 * Membaca halaman YouTube biasa (HTML awal memuat ytInitialData), tanpa API
 * key. Hasilnya angka nyata, bukan tebakan.
 *
 *   node alat/cek_kanal_youtube.mjs cari "konsep dasar integral kelas 12"
 *       hasil pencarian YouTube umum: judul, tontonan, kanal, handle
 *   node alat/cek_kanal_youtube.mjs kanal @m4thlab @BimbelSMARRT ...
 *       nama kanal dan jumlah subscriber
 *   node alat/cek_kanal_youtube.mjs uji @m4thlab "integral tak tentu"
 *       tiga video teratas hasil pencarian DI DALAM kanal itu
 *   node alat/cek_kanal_youtube.mjs periksa [--tulis] [bab ...]
 *       memeriksa semua KANAL di web/content: video teratas pencarian
 *       kanalnya ada, judulnya cocok dengan kata kunci, >= 25 rb tontonan,
 *       dan kanalnya >= 100 rb subscriber (atau videonya >= 75 rb tontonan);
 *       ID video yang tersimpan di berkas isi harus masih ada di hasil
 *       pencarian (kalau tidak: "video hilang"). Dengan --tulis, ID dan judul
 *       video teratas DITULIS ke berkas isi (`kanal(K.x, 'kata', 'ID', 'judul')`);
 *       tautan utama di halaman memakai ID itu (ARYA 18 Sep 2026: aplikasi
 *       YouTube di HP mengabaikan pencarian di dalam kanal). Keluar 1 kalau
 *       ada yang gagal. Hasil kanal disimpan sementara supaya tidak diunduh
 *       berulang.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const AKAR = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Safari/537.36'
const SIMPANAN = path.join(AKAR, '.playwright-cli', 'kanal-youtube.json')
const BATAS_SUBSCRIBER = 100_000
const BATAS_TONTON = 25_000
/* Kanal kecil boleh, asal videonya sendiri ramai. */
const BATAS_TONTON_KANAL_KECIL = 75_000

/**
 * Judul video teratas harus mengandung LEBIH DARI SEPARUH kata bermakna
 * dari kata kuncinya (kata 4 huruf ke atas, dicocokkan 5 huruf pertama
 * supaya "menggambar" kena "gambar"). Menangkap pencarian yang "berhasil"
 * tetapi mengembalikan video lain: "sudut elevasi" yang menghasilkan
 * "Sudut Istimewa".
 */
export function cocokJudul(cari, judul) {
  const kata = cari.toLowerCase().split(/[^a-z0-9]+/).filter((k) => k.length >= 4)
  if (!kata.length) return true
  const j = judul.toLowerCase()
  const kena = kata.filter((k) => j.includes(k.slice(0, 5))).length
  return kena * 2 > kata.length
}

const jeda = (ms) => new Promise((s) => setTimeout(s, ms))
let terakhir = 0

/** Satu permintaan tiap 2,5 detik; 429 (dibatasi YouTube) ditunggu 30 detik, sampai 3 kali. */
async function ambil(url) {
  for (let coba = 0; coba < 4; coba++) {
    const tunggu = terakhir + 2500 - Date.now()
    if (tunggu > 0) await jeda(tunggu)
    terakhir = Date.now()
    let r
    try {
      r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'id-ID,id;q=0.9,en;q=0.5' } })
    } catch (e) {
      if (coba === 3) throw e
      await jeda(5000)
      continue
    }
    if (r.status === 429) { await jeda(30000); continue }
    if (!r.ok) throw new Error(`${r.status} ${url}`)
    return r.text()
  }
  throw new Error(`dibatasi YouTube (429) ${url}`)
}

function dataAwal(html) {
  const m = html.match(/var ytInitialData = (\{.*?\});<\/script>/s)
  if (!m) throw new Error('ytInitialData tidak ditemukan')
  return JSON.parse(m[1])
}

/** "1.050.851 x ditonton" -> 1050851; "949 rb subscriber" -> 949000; "1,2 jt" -> 1200000 */
export function angkaDari(teks) {
  if (!teks) return 0
  const t = teks.toLowerCase().replace(/\s+/g, ' ')
  const m = t.match(/([\d.,]+)\s*(rb|jt|k|m|ribu|juta)?/)
  if (!m) return 0
  let s = m[1]
  let n
  if (m[2]) {
    n = parseFloat(s.replace(/\./g, '').replace(',', '.'))
    if (/^\d{1,3}(\.\d{3})+$/.test(s)) n = parseFloat(s.replace(/\./g, ''))
    const kali = { rb: 1e3, ribu: 1e3, k: 1e3, jt: 1e6, juta: 1e6, m: 1e6 }[m[2]]
    return Math.round(n * kali)
  }
  return parseInt(s.replace(/[.,]/g, ''), 10) || 0
}

function kumpulVideo(o, hasil) {
  if (Array.isArray(o)) { for (const x of o) kumpulVideo(x, hasil); return }
  if (!o || typeof o !== 'object') return
  if (o.videoRenderer) {
    const v = o.videoRenderer
    const pemilik = v.ownerText?.runs?.[0]
    hasil.push({
      id: v.videoId,
      judul: (v.title?.runs || []).map((r) => r.text).join(''),
      tonton: angkaDari(v.viewCountText?.simpleText),
      tontonTeks: v.viewCountText?.simpleText || '',
      kanal: pemilik?.text || '',
      handle: pemilik?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl || '',
    })
  }
  for (const x of Object.values(o)) kumpulVideo(x, hasil)
}

export async function cariUmum(kata) {
  const html = await ambil(`https://www.youtube.com/results?search_query=${encodeURIComponent(kata)}`)
  const hasil = []
  kumpulVideo(dataAwal(html), hasil)
  return hasil
}

export async function cariDiKanal(handle, kata) {
  const html = await ambil(`https://www.youtube.com/${handle}/search?query=${encodeURIComponent(kata)}`)
  const hasil = []
  kumpulVideo(dataAwal(html), hasil)
  return hasil
}

export async function infoKanal(handle) {
  const html = await ambil(`https://www.youtube.com/${handle}`)
  const judul = (html.match(/<title>([^<]*) - YouTube<\/title>/) || [])[1] || ''
  const sub = (html.match(/"accessibilityLabel":"([^"]*subscriber[^"]*)"/) || [])[1]
    || (html.match(/"content":"([^"]*subscriber[^"]*)"/) || [])[1] || ''
  return { handle, nama: judul, subscriberTeks: sub, subscriber: angkaDari(sub) }
}

function bacaSimpanan() {
  if (!existsSync(SIMPANAN)) return {}
  try { return JSON.parse(readFileSync(SIMPANAN, 'utf8')) } catch { return {} }
}
function tulisSimpanan(s) {
  mkdirSync(path.dirname(SIMPANAN), { recursive: true })
  writeFileSync(SIMPANAN, JSON.stringify(s, null, 2))
}

async function muatKanal(bab) {
  const mod = await import(`../web/content/${bab}/latihan.ts`)
  return mod.KANAL
}

/** Nama di objek K (content/kanal-youtube.ts) -> handle, untuk menulis kembali ke berkas isi. */
const K_HANDLE = Object.fromEntries(
  [...readFileSync(path.join(AKAR, 'web', 'content', 'kanal-youtube.ts'), 'utf8').matchAll(/^\s+(\w+): k\('[^']*', '(@[^']+)'\)/gm)]
    .map((m) => [m[1], m[2]]),
)

export const ribu = (n) => (n >= 1e6 ? `${(n / 1e6).toFixed(1)} jt` : `${Math.round(n / 1e3)} rb`)

// Baris perintah hanya berjalan kalau berkas ini dijalankan langsung, bukan
// saat fungsinya diimpor skrip lain.
const dijalankanLangsung = process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url
const [perintah, ...arg] = dijalankanLangsung ? process.argv.slice(2) : []

if (!dijalankanLangsung) {
  // diimpor: tidak melakukan apa-apa
} else if (perintah === 'cari') {
  const hasil = await cariUmum(arg.join(' '))
  for (const v of hasil.slice(0, 20)) console.log(`${ribu(v.tonton).padStart(8)}  ${v.handle.padEnd(24)} ${v.kanal.slice(0, 26).padEnd(26)} ${v.judul.slice(0, 80)}`)
} else if (perintah === 'kanal') {
  for (const h of arg) {
    try {
      const k = await infoKanal(h)
      console.log(`${h.padEnd(26)} ${k.nama.slice(0, 30).padEnd(30)} ${k.subscriberTeks}`)
    } catch (e) {
      console.log(`${h.padEnd(26)} TIDAK ADA (${e.message.slice(0, 40)})`)
    }
  }
} else if (perintah === 'uji') {
  const [handle, ...kata] = arg
  let hasil = []
  try { hasil = await cariDiKanal(handle, kata.join(' ')) } catch (e) { console.log(`(gagal: ${e.message.slice(0, 60)})`) }
  for (const v of hasil.slice(0, 5)) console.log(`${ribu(v.tonton).padStart(8)}  ${v.judul.slice(0, 90)}`)
  if (!hasil.length) console.log('(tidak ada hasil)')
} else if (perintah === 'periksa') {
  const tulis = arg.includes('--tulis')
  const babArg = arg.filter((a) => !a.startsWith('--'))
  const BAB = babArg.length ? babArg : ['trigonometri', 'limit', 'grafik-fungsi', 'vektor', 'ruang-3d', 'statistika', 'transformasi-geometri', 'turunan', 'integral']
  const simpanan = bacaSimpanan()
  let gagal = 0
  for (const bab of BAB) {
    const kanal = await muatKanal(bab)
    const berkasIsi = path.join(AKAR, 'web', 'content', bab, 'latihan.ts')
    let isi = readFileSync(berkasIsi, 'utf8')
    let berubah = 0
    for (const [huruf, daftar] of Object.entries(kanal)) {
      for (const k of daftar) {
        const handle = k.handle
        if (!simpanan[handle] || Date.now() - simpanan[handle].waktu > 7 * 86400e3) {
          try {
            const info = await infoKanal(handle)
            simpanan[handle] = { ...info, waktu: Date.now() }
          } catch {
            simpanan[handle] = { handle, nama: '', subscriberTeks: '', subscriber: 0, waktu: 0 }
          }
        }
        const sub = simpanan[handle].subscriber
        // Pencarian kanal kadang mengembalikan halaman kosong sesaat; coba dua kali.
        let hasil = []
        for (let coba = 0; coba < 2 && !hasil.length; coba++) {
          try { hasil = await cariDiKanal(handle, k.cari) } catch { hasil = [] }
          if (!hasil.length) await jeda(4000)
        }
        // Video yang dipakai: yang tersimpan kalau masih ada di 10 teratas,
        // kalau tidak (atau belum ada) video teratas.
        const tersimpan = k.video ? hasil.slice(0, 10).find((v) => v.id === k.video) : null
        const teratas = tersimpan || hasil[0] || null
        // masalahMutu: video teratas tidak layak, JANGAN ditulis ke berkas isi
        // (18 Sep 2026 pencarian kanal BIG Course sesaat mengembalikan video
        // Transformasi Geometri untuk "trigonometri dasar" dan sempat tertulis).
        const masalahMutu = []
        if (!teratas) masalahMutu.push('pencarian kosong')
        else {
          if (sub < BATAS_SUBSCRIBER && teratas.tonton < BATAS_TONTON_KANAL_KECIL) masalahMutu.push(`subscriber ${ribu(sub)} dan tontonan ${ribu(teratas.tonton)}`)
          else if (teratas.tonton < BATAS_TONTON) masalahMutu.push(`tontonan ${ribu(teratas.tonton)}`)
          if (!cocokJudul(k.cari, teratas.judul)) masalahMutu.push('judul tidak cocok dengan kata kunci')
        }
        const masalah = [...masalahMutu]
        if (teratas && k.video && !tersimpan) masalah.push(`video ${k.video} hilang dari pencarian`)
        if (teratas && !k.video && !tulis) masalah.push('ID video belum ditulis (jalankan --tulis)')
        if (masalah.length) gagal++
        console.log(`${masalah.length ? '!! ' : '   '}${bab} ${huruf} ${handle.padEnd(22)} ${ribu(sub).padStart(7)}  "${k.cari}"  ->  ${teratas ? `${ribu(teratas.tonton)} | ${teratas.judul.slice(0, 70)}` : '-'}${masalah.length ? `  [${masalah.join(', ')}]` : ''}`)
        // --tulis: tanam atau perbarui ID dan judul di berkas isi, hanya kalau
        // video teratasnya layak (judul cocok, tontonan cukup).
        if (tulis && teratas && masalahMutu.length) console.log(`   (tidak ditulis: ${masalahMutu.join(', ')})`)
        if (tulis && teratas && !masalahMutu.length && (!tersimpan || k.judul !== teratas.judul)) {
          const kunciK = Object.entries(K_HANDLE).find(([, h]) => h === handle)?.[0]
          if (!kunciK) { console.log(`   (tidak tahu nama K untuk ${handle}, lewati)`); continue }
          // Pola persis untuk entri INI: tanpa ID (belum ditulis) atau dengan
          // ID lamanya. Kata kunci yang sama bisa dipakai dua sub-bab (Transformasi
          // C dan F), jadi pola longgar akan menimpa entri yang salah.
          const cariAman = k.cari.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          const pola = k.video
            ? new RegExp(`kanal\\(K\\.${kunciK}, '${cariAman}', '${k.video}', '(?:[^'\\\\]|\\\\.)*'\\)`)
            : new RegExp(`kanal\\(K\\.${kunciK}, '${cariAman}'\\)`)
          const judulAman = teratas.judul.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
          const baru = `kanal(K.${kunciK}, '${k.cari}', '${teratas.id}', '${judulAman}')`
          if (pola.test(isi)) { isi = isi.replace(pola, baru); berubah++ } else console.log(`   (pola tidak ketemu untuk ${kunciK} "${k.cari}")`)
        }
      }
    }
    if (tulis && berubah) {
      writeFileSync(berkasIsi, isi)
      console.log(`   ${bab}: ${berubah} ID video ditulis ke ${path.relative(AKAR, berkasIsi)}`)
    }
  }
  tulisSimpanan(simpanan)
  console.log(gagal ? `\n${gagal} tautan bermasalah` : '\nsemua tautan lolos')
  process.exit(gagal ? 1 : 0)
} else {
  console.error('pakai: cari <kata> | kanal <@handle...> | uji <@handle> <kata> | periksa [bab...]')
  process.exit(1)
}
