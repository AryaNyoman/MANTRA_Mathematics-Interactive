/**
 * Survei kolom alat interaktif di halaman belajar, layar lebar.
 *
 * Membuka SETIAP materi berwidget (semua bab) pada beberapa ukuran jendela,
 * lalu mengukur kolom alatnya: apakah gambar, kendali, dan tabel angka muat
 * bersama (kolom tidak menggulir), seberapa jauh gambarnya dikecilkan oleh
 * KolomAlat, dan apakah ada yang meluber ke samping. Dibuat 18 Sep 2026
 * setelah ARYA menemukan kendali widget Turunan 03 terdorong keluar layar di
 * jendela lebar dan gambarnya kelewat kecil di jendela sempit.
 *
 *   node alat/survei_alat.mjs                 semua bab, 1920x937 dan 1366x768
 *   node alat/survei_alat.mjs turunan         satu bab
 *   node alat/survei_alat.mjs --ukuran 1536x864 --ukuran 1280x720
 *   node alat/survei_alat.mjs --alamat http://localhost:3000
 *   node alat/survei_alat.mjs --potret <folder>   simpan potret tiap materi dan ukuran
 *
 * Kolom keluaran per ukuran:
 *   gulir   piksel yang tersembunyi di bawah kolom (0 = semuanya terlihat)
 *   skala   lebar gambar dibanding lebar kotaknya (1,00 = penuh)
 *   svg     ukuran SVG pertama (lebar x tinggi piksel)
 *   kendali "ya" kalau kendali pertama terlihat tanpa menggulir
 *   samping piksel luber mendatar (harus 0)
 *   katex   banyak rumus yang tertata KaTeX; GAGAL n = rumus yang ditolak KaTeX (cacat)
 *
 * Butuh dev server yang sudah hidup (bawaan port 3210) dan playwright-core dari
 * @playwright/cli global (peramban Chromium-nya sudah terpasang oleh CLI itu).
 */
import { createRequire } from 'node:module'
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const AKAR = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const argv = process.argv.slice(2)
const ambil = (nama, bawaan) => {
  const hasil = []
  for (let i = 0; i < argv.length; i++) if (argv[i] === nama && argv[i + 1]) hasil.push(argv[++i])
  return hasil.length ? hasil : bawaan
}
const ALAMAT = ambil('--alamat', ['http://localhost:3210'])[0]
const POTRET = ambil('--potret', [undefined])[0]
const UKURAN = ambil('--ukuran', ['1920x937', '1366x768']).map((u) => u.split('x').map(Number))
const BERNILAI = ['--alamat', '--ukuran', '--potret', '--peramban']
const babPilih = argv.filter((a, i) => !a.startsWith('--') && !BERNILAI.includes(argv[i - 1]))
const BAB = babPilih.length
  ? babPilih
  : ['trigonometri', 'limit', 'grafik-fungsi', 'vektor', 'ruang-3d', 'statistika', 'transformasi-geometri', 'turunan', 'integral']

async function muatTahap(bab) {
  if (bab === 'statistika') {
    const semua = []
    for (const b of ['tahap-penyajian', 'tahap-pemusatan', 'tahap-hubungan', 'tahap-nyata']) {
      const mod = await import(`../web/content/statistika/${b}.ts`)
      for (const v of Object.values(mod)) if (Array.isArray(v)) semua.push(...v)
    }
    return semua
  }
  const mod = await import(`../web/content/${bab}/tahap.ts`)
  return mod.TAHAP
}

function muatPlaywright() {
  const akarGlobal = execSync('npm root -g').toString().trim()
  const req = createRequire(import.meta.url)
  return req(path.join(akarGlobal, '@playwright', 'cli', 'node_modules', 'playwright-core'))
}

/**
 * Chromium yang sudah terpasang oleh playwright-cli. Revisi yang diminta
 * playwright-core terbaru belum tentu terunduh (18 Sep: minta 1237, yang ada
 * 1234), jadi pakai revisi tertinggi yang ada, bukan membiarkannya mengunduh.
 */
function cariChromium() {
  const pilihan = ambil('--peramban', [])[0]
  if (pilihan) return pilihan
  const akar = path.join(process.env.LOCALAPPDATA || '', 'ms-playwright')
  if (!existsSync(akar)) return undefined
  const revisi = readdirSync(akar)
    .filter((n) => /^chromium-\d+$/.test(n))
    .map((n) => Number(n.slice('chromium-'.length)))
    .sort((a, b) => b - a)
  for (const r of revisi) {
    const exe = path.join(akar, `chromium-${r}`, 'chrome-win64', 'chrome.exe')
    if (existsSync(exe)) return exe
  }
  return undefined
}

/** Dijalankan di dalam halaman. Hanya angka dan teks pendek yang dikembalikan. */
function ukurDiHalaman() {
  const k = document.querySelector('.kolom.alat')
  if (!k) return { galat: 'tidak ada .kolom.alat' }
  const layar = k.querySelector(':scope > .layar')
  const isi = layar ? layar.firstElementChild : null
  const svg = k.querySelector('svg')
  const kendali = k.querySelector(':scope > .kendali') || k.querySelector('.kendali')
  const r = (el) => el.getBoundingClientRect()
  const kr = r(k)
  const gayaLayar = layar ? getComputedStyle(layar) : null
  const dalamLayar = layar
    ? layar.clientWidth - parseFloat(gayaLayar.paddingLeft) - parseFloat(gayaLayar.paddingRight)
    : 0
  return {
    kolom: `${k.clientWidth}x${k.clientHeight}`,
    lebar: k.dataset.lebar || '-',
    gulir: Math.max(0, k.scrollHeight - k.clientHeight),
    samping: Math.max(0, k.scrollWidth - k.clientWidth),
    skala: isi && dalamLayar ? Math.round((r(isi).width / dalamLayar) * 100) / 100 : null,
    svg: svg ? `${Math.round(r(svg).width)}x${Math.round(r(svg).height)}` : '-',
    jumlahSvg: k.querySelectorAll('svg').length,
    layarTinggi: layar ? Math.round(r(layar).height) : 0,
    kendaliTerlihat: kendali ? (r(kendali).top + Math.min(r(kendali).height, 80) <= kr.bottom ? 'ya' : 'tidak') : '-',
    tanpaLayar: !layar,
    // rumus KaTeX di teks alat (18 Sep 2026): jumlah yang tertata dan yang
    // DITOLAK KaTeX (teks aslinya ditampilkan apa adanya, kelas .mat-gagal)
    katex: k.querySelectorAll('.katex').length,
    gagal: k.querySelectorAll('.mat-gagal').length,
    gagalTeks: [...k.querySelectorAll('.mat-gagal')].slice(0, 3).map((e) => e.textContent),
  }
}

const { chromium } = muatPlaywright()
const peramban = await chromium.launch({ executablePath: cariChromium() })
const halaman = await peramban.newPage()
halaman.setDefaultTimeout(20000)

const baris = []
let masalah = 0
for (const bab of BAB) {
  const tahap = await muatTahap(bab)
  for (const t of tahap) {
    if (!t.widget) continue
    const alamat = `${ALAMAT}/topik/${bab}?materi=${t.slug}`
    const hasil = []
    for (const [w, h] of UKURAN) {
      await halaman.setViewportSize({ width: w, height: h })
      await halaman.goto(alamat, { waitUntil: 'networkidle' })
      try {
        await halaman.waitForSelector('.kolom.alat', { timeout: 8000 })
        // Widgetnya dimuat belakangan; tunggu gambarnya, lalu beri KolomAlat
        // (requestAnimationFrame) dan penyesuai lebar kolom waktu bekerja.
        await halaman.waitForSelector('.kolom.alat svg, .kolom.alat canvas, .kolom.alat .alat-kosong', { timeout: 8000 }).catch(() => {})
        await halaman.waitForTimeout(400)
        // Lebar kolomnya beranimasi saat pertama diatur; tunggu sampai diam.
        await halaman.evaluate(() => new Promise((selesai) => {
          const k = document.querySelector('.kolom.alat')
          let terakhir = -1
          let diam = 0
          const cek = () => {
            const w = k ? k.clientWidth : 0
            diam = w === terakhir ? diam + 1 : 0
            terakhir = w
            if (diam >= 6) selesai(undefined)
            else setTimeout(cek, 100)
          }
          cek()
        }))
        await halaman.evaluate(() => new Promise((s) => requestAnimationFrame(() => requestAnimationFrame(s))))
        await halaman.waitForTimeout(100)
      } catch {
        hasil.push({ galat: 'kolom alat tidak muncul' })
        continue
      }
      hasil.push(await halaman.evaluate(ukurDiHalaman))
      if (POTRET) {
        mkdirSync(POTRET, { recursive: true })
        await halaman.screenshot({ path: path.join(POTRET, `${bab}-${String(t.no).padStart(2, '0')}-${w}x${h}.png`) })
      }
    }
    // "!!" = cacat: kolom tidak muncul, luber ke samping, kendali pertama
    // tersembunyi, atau gambar dikecilkan di bawah skala 0,6.
    // "~"  = catatan: pada ukuran PERTAMA (yang terbesar) kolom masih
    // menggulir; wajar untuk kendali panjang, tetapi layak dilihat.
    const cacat = hasil.some((u) => u.galat || u.samping > 0 || (u.skala !== null && u.skala < 0.6) || u.kendaliTerlihat === 'tidak' || u.gagal > 0)
    const catatan = !cacat && hasil[0] && !hasil[0].galat && hasil[0].gulir > 0
    if (cacat) masalah++
    const tanda = cacat ? '!! ' : catatan ? '~  ' : '   '
    baris.push({ bab, no: t.no, widget: t.widget, hasil, cacat, catatan })
    const ringkas = hasil.map((u, i) => {
      const [w, h] = UKURAN[i]
      if (u.galat) return `${w}x${h}: ${u.galat}`
      return `${w}x${h}: kolom ${u.kolom} gulir ${u.gulir} skala ${u.skala ?? '-'} svg ${u.svg}${u.jumlahSvg > 1 ? ` (+${u.jumlahSvg - 1})` : ''} kendali ${u.kendaliTerlihat}${u.samping ? ` SAMPING ${u.samping}` : ''}${u.tanpaLayar ? ' TANPA .layar' : ''} katex ${u.katex}${u.gagal ? ` GAGAL ${u.gagal} ${JSON.stringify(u.gagalTeks)}` : ''}`
    })
    console.log(`${tanda}${bab} ${String(t.no).padStart(2, '0')} ${t.widget.padEnd(28)} ${ringkas.join(' | ')}`)
  }
}
await peramban.close()
console.log(`\n${baris.length} materi berwidget diperiksa, ${masalah} cacat (!!), ${baris.filter((b) => b.catatan).length} masih menggulir di ukuran terbesar (~).`)
