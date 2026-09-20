/**
 * Mengemas bekal Asisten Tanya: satu JSON per materi di web/bekal/<bab>/<slug>.json,
 * web/bekal/indeks.json, dan potongan pencarian web/bekal/potongan/<bab>.json.
 *
 *   node alat/bekal_asisten.mjs              semua bab
 *   node alat/bekal_asisten.mjs turunan      satu bab
 *   node alat/bekal_asisten.mjs --periksa    hanya memastikan bekal ada dan tidak
 *                                            lebih tua daripada tahap.ts (dipakai prebuild)
 *
 * Sumber: web/content/<bab>/tahap.ts (bacaan), istilah.ts, alat/bekal/peta-sumber.json
 * plus alat/bekal/teks/<sumber>.jsonl (hasil alat/bekal/ekstrak_pdf.py). Batas token
 * per materi dari spesifikasi: kutipan Kemdikbud 4000, ITB 3000, Purcell 2000,
 * total 12000. Taksiran token: 3,4 huruf per token.
 *
 * web/bekal/ TIDAK masuk git (teks buku berhak cipta), tetapi ikut unggahan
 * Vercel karena .vercelignore yang berlaku di sana, bukan .gitignore.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { teksBacaan } from '../web/lib/tanya/teks-blok.ts'

const AKAR = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const BAB = ['trigonometri', 'limit', 'grafik-fungsi', 'vektor', 'ruang-3d', 'statistika', 'transformasi-geometri', 'turunan', 'integral']
const BATAS = { kemdikbud: 4000, itb: 3000, purcell: 2000, total: 12000 }

export const taksirToken = (teks) => Math.ceil(teks.length / 3.4)

const modul = (relatif) => import(pathToFileURL(path.join(AKAR, 'web', 'content', relatif)).href)

async function muatTahap(bab) {
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

function bacaTeksSumber(sumber) {
  const jalur = path.join(AKAR, 'alat', 'bekal', 'teks', `${sumber}.jsonl`)
  const peta = new Map()
  for (const baris of readFileSync(jalur, 'utf8').split('\n')) {
    if (!baris.trim()) continue
    const h = JSON.parse(baris)
    peta.set(h.hal, h.teks)
  }
  return peta
}

/** Potongan 300 sampai 500 token, dipotong di batas kalimat. */
export function potong(asal, teks) {
  const kalimat = teks.split(/(?<=[.!?])\s+/)
  const hasil = []
  let buf = ''
  const dorong = () => {
    if (buf.trim()) hasil.push({ ...asal, id: `${asal.bab}:${asal.materi ?? '-'}:${asal.sumber}:${hasil.length}`, teks: buf.trim() })
    buf = ''
  }
  for (const k of kalimat) {
    if (taksirToken(buf + ' ' + k) > 500 && taksirToken(buf) >= 300) dorong()
    buf += (buf ? ' ' : '') + k
  }
  dorong()
  return hasil
}

export async function kemas(daftarBab = BAB, { keluar = path.join(AKAR, 'web', 'bekal') } = {}) {
  const sumberInfo = JSON.parse(readFileSync(path.join(AKAR, 'alat', 'bekal', 'sumber.json'), 'utf8'))
  const peta = JSON.parse(readFileSync(path.join(AKAR, 'alat', 'bekal', 'peta-sumber.json'), 'utf8'))
  const { BAB: SUBBAB } = await modul('subbab.ts')
  const { TOPIK } = await modul('topik.ts')
  const teksSumber = new Map()
  const jalurIndeks = path.join(keluar, 'indeks.json')
  const indeks = existsSync(jalurIndeks) ? JSON.parse(readFileSync(jalurIndeks, 'utf8')) : {}
  let jumlah = 0
  for (const bab of daftarBab) {
    const tahap = await muatTahap(bab)
    const { ISTILAH } = await modul(`${bab}/istilah.ts`)
    const infoBab = SUBBAB.find((b) => b.slug === bab)
    const namaBab = TOPIK.find((t) => t.slug === bab)?.nama ?? bab
    const potongan = []
    indeks[bab] = { nama: namaBab, materi: {} }
    mkdirSync(path.join(keluar, bab), { recursive: true })
    tahap.forEach((t, i) => {
      const sub = infoBab?.sub.find((s) => s.nomor.includes(t.no)) ?? null
      const bacaan = teksBacaan(t)
      const kutipan = []
      for (const k of peta[bab]?.[t.slug] ?? []) {
        if (!teksSumber.has(k.sumber)) teksSumber.set(k.sumber, bacaTeksSumber(k.sumber))
        const halaman = teksSumber.get(k.sumber)
        const teks = []
        for (let h = k.dari; h <= k.sampai; h++) if (halaman.has(h)) teks.push(halaman.get(h))
        const gabung = teks.join(' ')
        const jenis = sumberInfo[k.sumber].jenis
        if (taksirToken(gabung) > BATAS[jenis]) {
          throw new Error(`${bab}/${t.slug}: kutipan ${k.sumber} ${taksirToken(gabung)} token, batas ${BATAS[jenis]}; persempit halamannya`)
        }
        kutipan.push({ sumber: k.sumber, label: `${sumberInfo[k.sumber].label}: ${k.catatan}`, teks: gabung, token: taksirToken(gabung) })
        potongan.push(...potong({ bab, materi: t.slug, sumber: k.sumber, judul: `${t.judul} (${sumberInfo[k.sumber].label})` }, gabung))
      }
      potongan.push(...potong({ bab, materi: t.slug, sumber: 'mantra', judul: t.judul }, bacaan))
      const token = {
        bacaan: taksirToken(bacaan),
        istilah: taksirToken(JSON.stringify(ISTILAH)),
        kutipan: kutipan.reduce((s, k) => s + k.token, 0),
      }
      token.total = token.bacaan + token.istilah + token.kutipan
      if (token.total > BATAS.total) throw new Error(`${bab}/${t.slug}: bekal ${token.total} token, batas ${BATAS.total}`)
      const tetangga = (j) => (tahap[j] ? { no: tahap[j].no, slug: tahap[j].slug, judul: tahap[j].judul } : null)
      const bekal = {
        bab,
        namaBab,
        sub: sub ? { huruf: sub.huruf, nama: sub.nama } : null,
        no: t.no,
        slug: t.slug,
        judul: t.judul,
        pertanyaan: t.pertanyaan,
        sebelum: tetangga(i - 1),
        sesudah: tetangga(i + 1),
        bacaan,
        istilah: ISTILAH,
        kutipan,
        token,
      }
      writeFileSync(path.join(keluar, bab, `${t.slug}.json`), JSON.stringify(bekal, null, 1))
      indeks[bab].materi[t.slug] = { no: t.no, judul: t.judul, sub: sub ? `${sub.huruf} · ${sub.nama}` : null }
      jumlah++
    })
    potongan.push(...ISTILAH.map((x, n) => ({ id: `${bab}:-:istilah:${n}`, bab, materi: null, sumber: 'istilah', judul: x.istilah, teks: `${x.istilah}: ${x.arti}` })))
    mkdirSync(path.join(keluar, 'potongan'), { recursive: true })
    writeFileSync(path.join(keluar, 'potongan', `${bab}.json`), JSON.stringify(potongan))
  }
  writeFileSync(jalurIndeks, JSON.stringify(indeks, null, 1))
  return { materi: jumlah }
}

function periksa() {
  const keluar = path.join(AKAR, 'web', 'bekal')
  let masalah = 0
  for (const bab of BAB) {
    const berkasIsi = readdirSync(path.join(AKAR, 'web', 'content', bab)).filter((f) => /^(tahap.*|istilah)\.ts$/.test(f))
    const isiMtime = Math.max(...berkasIsi.map((f) => statSync(path.join(AKAR, 'web', 'content', bab, f)).mtimeMs))
    const dir = path.join(keluar, bab)
    if (!existsSync(dir)) {
      console.log(`bekal ${bab} belum dibuat: jalankan node alat/bekal_asisten.mjs ${bab}`)
      masalah++
      continue
    }
    const tua = Math.min(...readdirSync(dir).map((f) => statSync(path.join(dir, f)).mtimeMs))
    if (tua < isiMtime) {
      console.log(`bekal ${bab} lebih tua daripada isinya: jalankan node alat/bekal_asisten.mjs ${bab}`)
      masalah++
    }
  }
  if (masalah) process.exit(1)
  console.log('bekal lengkap dan mutakhir')
}

const argv = process.argv.slice(2)
const dijalankanLangsung = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (dijalankanLangsung) {
  if (argv.includes('--periksa')) periksa()
  else kemas(argv.length ? argv : BAB).then((h) => console.log(`${h.materi} materi dikemas ke web/bekal`))
}
