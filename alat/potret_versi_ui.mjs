// Potret halaman kunci tiap generasi tampilan MANTRA untuk dokumentasi tesis.
// node potret_versi.mjs <nama-versi> <port> <folder-keluar>
// Permintaan video /anim/*.mp4|webm yang tidak ada di versi itu dipenuhi
// dari berkas video sekarang (nama dasar sama), supaya pemutar menampilkan
// posternya dan bukan kotak "belum bisa diputar".
import { createRequire } from 'node:module'
import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
const require = createRequire(import.meta.url)
const { chromium } = require('C:/Users/ASUS/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright-core')

const [versi, port, keluar] = process.argv.slice(2)
const ASAL = `http://localhost:${port}`
const ANIM_SEKARANG = 'D:/MANIM-MATRA/web/public/anim'
const CADANGAN = ['D:/MANTRA-BACKUP/2026-09-11/media', 'D:/MANTRA-BACKUP/2026-09-11/UNTUK ARYA PERIKSA']
mkdirSync(keluar, { recursive: true })

const browser = await chromium.launch({ executablePath: 'C:/Users/ASUS/AppData/Local/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe' })

function cariVideo(nama) {
  const dasar = nama.replace(/\.(mp4|webm)$/, '')
  for (const ext of ['.mp4', '.webm']) {
    const p = join(ANIM_SEKARANG, dasar + ext)
    if (existsSync(p)) return p
  }
  return null
}

async function siapkan(viewport) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'no-preference' })
  await ctx.route(/\/anim\/[^?]+\.(mp4|webm)(\?.*)?$/, async (route) => {
    const url = new URL(route.request().url())
    const nama = url.pathname.split('/').pop()
    // biarkan kalau servernya sendiri punya berkasnya
    const jawab = await route.fetch().catch(() => null)
    if (jawab && jawab.status() === 200) { await route.fulfill({ response: jawab }); return }
    const ganti = cariVideo(nama)
    if (!ganti) { await route.continue(); return }
    const isi = readFileSync(ganti)
    const rentang = route.request().headers()['range']
    if (rentang) {
      const m = /bytes=(\d+)-(\d*)/.exec(rentang)
      const a = Number(m[1]); const b = m[2] ? Number(m[2]) : Math.min(a + 1024 * 1024, isi.length - 1)
      await route.fulfill({ status: 206, headers: { 'Content-Type': ganti.endsWith('.webm') ? 'video/webm' : 'video/mp4', 'Content-Range': `bytes ${a}-${b}/${isi.length}`, 'Accept-Ranges': 'bytes', 'Content-Length': String(b - a + 1) }, body: isi.subarray(a, b + 1) })
    } else {
      await route.fulfill({ status: 200, headers: { 'Content-Type': ganti.endsWith('.webm') ? 'video/webm' : 'video/mp4', 'Accept-Ranges': 'bytes' }, body: isi })
    }
  })
  return ctx
}

async function potret(ctx, jalur, nama, { fullPage = false, sebelum = null } = {}) {
  const page = await ctx.newPage()
  try {
    await page.goto(ASAL + jalur, { waitUntil: 'networkidle', timeout: 180000 })
    await page.waitForTimeout(1500)
    if (sebelum) { try { await sebelum(page) } catch (e) { console.log(`   (${nama}: langkah tambahan gagal: ${e.message.split('\n')[0]})`) } }
    await page.waitForTimeout(800)
    const judul = await page.evaluate(() => (document.querySelector('h1') || {}).textContent || document.title)
    await page.screenshot({ path: join(keluar, nama + '.png'), fullPage })
    console.log(`   ${nama}.png  <- ${jalur}  (${String(judul).trim().slice(0, 50)})`)
  } catch (e) {
    console.log(`   GAGAL ${nama} ${jalur}: ${e.message.split('\n')[0]}`)
  } finally {
    await page.close()
  }
}

const klikCoba = async (page) => {
  // versi lama (v1) memilih tahap lewat tab di halaman, bukan ?materi=
  const judul = await page.evaluate(() => (document.querySelector('h1') || {}).textContent || '')
  if (!/sudut istimewa/i.test(judul)) {
    let tahap = page.getByRole('tab', { name: /sudut istimewa/i }).first()
    if (!(await tahap.count())) tahap = page.getByRole('tab', { name: /^materi 07$/i }).first()
    if (await tahap.count()) { await tahap.click(); await page.waitForTimeout(1200) }
  }
  const tab = page.getByRole('tab', { name: 'Coba sendiri' }).first()
  if (await tab.count()) { await tab.click(); await page.waitForTimeout(800); return }
  const tombol = page.getByRole('button', { name: /coba sendiri/i }).first()
  if (await tombol.count()) { await tombol.click(); await page.waitForTimeout(800) }
}

console.log(`== ${versi} (${ASAL}) -> ${keluar}`)
const laptop = await siapkan({ width: 1366, height: 768 })
await potret(laptop, '/', 'beranda-laptop', { fullPage: true })
await potret(laptop, '/topik/trigonometri', 'materi-laptop')
await potret(laptop, '/topik/trigonometri?materi=7', 'materi-widget-laptop', { sebelum: klikCoba })
await potret(laptop, '/peta-materi', 'peta-materi-laptop', { fullPage: true })
await potret(laptop, '/latihan/trigonometri', 'latihan-laptop')
await laptop.close()

const hp = await siapkan({ width: 375, height: 812 })
await potret(hp, '/', 'beranda-hp', { fullPage: true })
await potret(hp, '/topik/trigonometri', 'materi-hp')
await potret(hp, '/topik/trigonometri?materi=7', 'materi-widget-hp', { sebelum: klikCoba })
await hp.close()
await browser.close()
console.log('selesai', versi)
