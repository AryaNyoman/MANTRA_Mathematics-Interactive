// Menulis lib/versi-anim.json: sidik jari isi tiap berkas di public/anim
// (video, subtitle, poster). Dipakai PemutarVideo untuk menempelkan ?v=<sidik>
// pada alamatnya.
//
// KENAPA PERLU (temuan ARYA 12 Sep 2026): /anim/* dilayani dengan
// Cache-Control immutable setahun (next.config.ts) supaya siswa berkuota
// terbatas tidak mengunduh video dua kali. Akibatnya, begitu isi video atau
// subtitle diganti TANPA ganti nama, peramban yang pernah membukanya tetap
// memakai salinan lama: video baru diputar dengan subtitle lama, dan
// subtitle-nya terlihat "telat". Sidik jari di alamat membuat alamatnya
// berubah tiap isinya berubah, jadi salinan lama tidak pernah dipakai lagi.
//
// Dijalankan otomatis sebelum build (prebuild di package.json). Jalankan
// manual sesudah mengganti video: node scripts/versi-anim.mjs
//
// Sejak 15 Sep 2026 video (mp4/webm) dilayani dari Cloudflare R2 dan TIDAK
// ikut terunggah ke Vercel (.vercelignore), jadi saat prebuild di Vercel
// berkasnya tidak ada di public/anim. Sidik video yang sudah tercatat di
// versi-anim.json dipertahankan; yang dihitung ulang hanya berkas yang ada.
// Di komputer sendiri (video ada) daftarnya dibuat segar seperti semula.
import { createHash } from 'node:crypto'
import { createReadStream, existsSync, readFileSync } from 'node:fs'
import { readdir, writeFile, stat } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const AKAR = dirname(dirname(fileURLToPath(import.meta.url)))
const FOLDER = join(AKAR, 'public', 'anim')
const KELUAR = join(AKAR, 'lib', 'versi-anim.json')

async function sidik(jalur) {
  return new Promise((selesai, gagal) => {
    const h = createHash('md5')
    createReadStream(jalur)
      .on('data', (potongan) => h.update(potongan))
      .on('end', () => selesai(h.digest('hex').slice(0, 10)))
      .on('error', gagal)
  })
}

const nama = (await readdir(FOLDER)).filter((n) => /\.(mp4|webm|vtt|jpg|png)$/i.test(n)).sort()
const hasil = {}
for (const n of nama) {
  const info = await stat(join(FOLDER, n))
  if (!info.isFile()) continue
  hasil[n] = await sidik(join(FOLDER, n))
}
let dipertahankan = 0
if (existsSync(KELUAR)) {
  const lama = JSON.parse(readFileSync(KELUAR, 'utf8'))
  for (const [n, v] of Object.entries(lama)) {
    if (!(n in hasil) && /\.(mp4|webm)$/i.test(n)) {
      hasil[n] = v
      dipertahankan++
    }
  }
}
const urut = Object.fromEntries(Object.keys(hasil).sort().map((n) => [n, hasil[n]]))
await writeFile(KELUAR, JSON.stringify(urut, null, 2) + '\n', 'utf8')
console.log(`versi-anim.json: ${Object.keys(urut).length} berkas` +
  (dipertahankan ? ` (${dipertahankan} video tidak ada di public/anim, sidik lamanya dipertahankan)` : ''))
