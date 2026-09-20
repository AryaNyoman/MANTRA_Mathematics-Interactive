/**
 * Dipanggil `prebuild`: memastikan bekal Asisten Tanya (web/bekal/) lengkap
 * sebelum situs dibangun. Bekalnya tidak ada di git (teks buku berhak cipta),
 * jadi tanpa pemeriksaan ini deploy bisa berjalan tanpa bekal dan asisten
 * menjawab "materi tidak dikenal" untuk semuanya.
 *
 * Yang diperiksa: indeks.json ada, sembilan bab ada, tiap materi punya berkas.
 * Di luar Vercel juga dibandingkan umurnya dengan tahap*.ts dan istilah.ts
 * (di Vercel umur berkas hasil unggahan tidak bisa dipercaya). Membuat ulang:
 *   python alat/bekal/ekstrak_pdf.py  lalu  node alat/bekal_asisten.mjs
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const WEB = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const BEKAL = path.join(WEB, 'bekal')
const BAB = ['trigonometri', 'limit', 'grafik-fungsi', 'vektor', 'ruang-3d', 'statistika', 'transformasi-geometri', 'turunan', 'integral']
const masalah = []

const jalurIndeks = path.join(BEKAL, 'indeks.json')
if (!existsSync(jalurIndeks)) {
  masalah.push('web/bekal/indeks.json tidak ada')
} else {
  const indeks = JSON.parse(readFileSync(jalurIndeks, 'utf8'))
  for (const bab of BAB) {
    if (!indeks[bab]) { masalah.push(`bab ${bab} tidak ada di indeks`); continue }
    for (const slug of Object.keys(indeks[bab].materi)) {
      if (!existsSync(path.join(BEKAL, bab, `${slug}.json`))) masalah.push(`bekal ${bab}/${slug} tidak ada`)
    }
    if (!existsSync(path.join(BEKAL, 'potongan', `${bab}.json`))) masalah.push(`potongan ${bab} tidak ada`)
    if (!process.env.VERCEL) {
      const dirIsi = path.join(WEB, 'content', bab)
      const isiMtime = Math.max(...readdirSync(dirIsi).filter((f) => /^(tahap.*|istilah)\.ts$/.test(f)).map((f) => statSync(path.join(dirIsi, f)).mtimeMs))
      const dirBekal = path.join(BEKAL, bab)
      const tua = existsSync(dirBekal) ? Math.min(...readdirSync(dirBekal).map((f) => statSync(path.join(dirBekal, f)).mtimeMs)) : 0
      if (tua < isiMtime) masalah.push(`bekal ${bab} lebih tua daripada isinya: node alat/bekal_asisten.mjs ${bab}`)
    }
  }
}

if (masalah.length) {
  console.error('[bekal] ' + masalah.join('\n[bekal] '))
  process.exit(1)
}
console.log('[bekal] lengkap: 9 bab, semua materi punya bekal')
