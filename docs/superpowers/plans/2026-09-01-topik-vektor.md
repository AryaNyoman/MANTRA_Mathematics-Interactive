# Topik Vektor (gelombang 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Topik Vektor tampil utuh di `/topik/vektor`: 12 materi, 11 widget interaktif, 4 latihan, bank 32 soal kuis, tanpa video.

**Architecture:** Meniru topik Limit yang sudah terbukti. Isi teks di `web/content/vektor/`, widget SVG buatan sendiri di `web/components/widget/vektor/`, satu komponen penyetelan `PanggungVektor.tsx`, satu baris entri di `daftar-isi.ts`. Rangka halaman (`HalamanTopik`), latihan, dan kuis sudah bebas topik dan TIDAK disentuh. Beda dari Limit: matematika murninya dipisah ke berkas tanpa impor supaya bisa dijalankan langsung oleh Node sebagai uji, dan panahnya bisa diseret, bukan digeser slider.

**Tech Stack:** Next.js 16.3.3, React 19.2.8, TypeScript 5, SVG buatan sendiri (tanpa pustaka grafik), Node 24.13 untuk menjalankan berkas uji `.ts` langsung, Python + sympy untuk memeriksa angka.

**Spec:** `docs/superpowers/specs/2026-09-01-vektor-alur-belajar.md`

## Catatan tentang bentuk rencana ini

Rencana ini memuat kode utuh untuk bagian yang **rawan salah dan dipakai
berulang**: matematika bingkai, penyeretan, dan bentuk panah. Untuk isi
teks 12 materi dan 36 soal, rencana ini memuat **patokan penerimaan dan jangkar
sumbernya**, bukan naskah lengkapnya. Alasannya lugas: naskah itu SENDIRI adalah
barang jadinya, jadi menuliskannya di sini berarti mengerjakannya dua kali dan
membakar token ARYA tanpa hasil tambahan. Yang tidak boleh kabur, yaitu angka
dan jawaban, justru dikunci lebih keras daripada teks: semuanya wajib lolos
`alat/cek_vektor.py` sebelum dianggap ada.

## Global Constraints

Berlaku untuk SEMUA tugas di bawah, disalin apa adanya dari aturan proyek:

- **Tanda em-dash DILARANG** di teks pengguna, kode, maupun komentar. Pakai titik, koma, titik dua, tanda kurung, atau tanda hubung biasa.
- **Kata "miskonsepsi" DILARANG muncul di halaman siswa.** Judul kotaknya "Sering keliru", dan letaknya di BAWAH setelah siswa paham.
- **Penjelasan dipecah jadi blok** (paragraf pendek, poin, sorot, contoh, sesi), bukan tembok paragraf. Tapi isinya JANGAN dipangkas.
- **Warna matematika satu sumber kebenaran**, dari `web/lib/warna.ts`. Dilarang menulis kode hex langsung, dan dilarang memakai aksen situs (hijau `#2F5D50`, oker `#B8863B`, bata `#A6503F`) untuk bagian matematika.
- **Gaya visual terkunci "Studio Teknis"**: krem `#F6F2EC`, kartu `#FFFDFA`, tinta `#211E1A`, garis `#E1D9CC`; judul Fraunces, teks Inter, angka IBM Plex Mono. Jangan mengarang gaya baru.
- **Widget tidak boleh memotong gambarnya sendiri.** Bingkai menyesuaikan otomatis DAN memberi tahu penggunanya lewat penunjuk skala.
- **Skala sumbu x dan y wajib SAMA** di semua widget vektor. Ini tambahan khusus topik ini, lihat Tugas 1.
- **Berkas milik sesi lain dilarang disentuh**: `PROGRESS.md`, `CLAUDE.md`, `content/tipe.ts`, `content/topik.ts`, `app/`, `components/topik/HalamanTopik.tsx`, `components/widget/limit/`, `components/widget/*.tsx` milik trigonometri. Butuh berubah? Tulis di bagian "Butuh MASTER" pada laporan.
- **Cabang `sesi/vektor` saja.** Dilarang checkout, merge, atau push ke `master`. Dilarang deploy.
- **Port dev server 3001**, tidak boleh yang lain: `cd web && npm run dev -- -p 3001`.
- **Verifikasi perintah lewat `rtk proxy "<perintah>"`**, jangan percaya exit code pipa biasa.
- Bahasa Indonesia untuk pesan commit, komentar kode, dan seluruh teks siswa.

## Peta berkas

| Berkas | Tanggung jawab | Tugas |
|---|---|---|
| `web/components/widget/vektor/geometri.ts` | matematika murni vektor dan penskalaan. **Nol impor**, supaya bisa dijalankan Node langsung | 1 |
| `alat/uji-geometri-vektor.mts` | uji yang benar-benar berjalan untuk berkas di atas. Sengaja di LUAR `web/`, alasannya di Tugas 1 | 1 |
| `web/components/widget/vektor/gaya.ts` | warna dan huruf khusus widget vektor, satu-satunya yang mengimpor `@/lib/warna` | 2 |
| `web/components/widget/vektor/BidangVektor.tsx` | bingkai: petak, sumbu, angka, penunjuk skala | 2 |
| `web/components/widget/vektor/Panah.tsx` | satu anak panah bermata dan berlabel | 2 |
| `web/components/widget/vektor/useSeret.ts` | mengubah sentuhan/tetikus pada SVG jadi koordinat matematika | 2 |
| `web/components/widget/vektor/<NamaWidget>.tsx` | 11 widget, satu berkas satu widget | 3,4,5,6 |
| `web/components/topik/PanggungVektor.tsx` | penyetelan widget dan tabel angka hidup | 2,3,4,5,6 |
| `web/content/vektor/tahap.ts` | 12 materi | 2,3,4,5,6 |
| `web/content/vektor/latihan.ts` | 4 soal latihan | 7 |
| `web/content/vektor/kuis.ts` | bank 32 soal | 8 |
| `web/content/vektor/index.ts` | ekspor ulang ketiganya | 2 |
| `web/content/daftar-isi.ts` | satu baris entri vektor | 2 |
| `alat/cek_vektor.py` | pemeriksa sympy, berkas BARU | 7 |
| `alat/{materi,soal-latihan,soal-kuis,uji-cek}-vektor.json` | angka yang diperiksa | 7,8 |
| `web/public/gambar/vektor/*.jpg` | foto Materi 10, sudah dikompres | 6 |
| `docs/tugas/laporan/MATRA-VEKTOR.md` | laporan sesi | tiap tugas |

---

### Task 1: Matematika vektor yang benar-benar diuji

Bagian ini dipisah dari React supaya bisa dijalankan Node tanpa bundler, tanpa
alias `@/`, tanpa DOM. Itu satu-satunya cara topik ini punya uji sungguhan,
sebab proyek ini tidak memasang Jest maupun Vitest.

**Files:**
- Create: `web/components/widget/vektor/geometri.ts`
- Test: `alat/uji-geometri-vektor.mts`

**KENAPA berkas ujinya di luar `web/`, dan jangan dipindahkan ke dalam.**
Node hanya mau mengimpor berkas TypeScript kalau tulisan `.ts` disebutkan di
jalur impornya. Sebaliknya `tsc` dengan setelan proyek ini MENOLAK impor
berakhiran `.ts` (galat TS5097), sedangkan `web/tsconfig.json` mencakup
`**/*.ts` DAN `**/*.mts`, jadi di mana pun berkas uji ditaruh di dalam `web/`,
ia ikut terperiksa dan `npm run build` gagal. Menaruhnya di `alat/` menyelesaikan
keduanya sekaligus tanpa menyentuh `tsconfig.json`, yang bukan milik sesi ini.
Node 24.13 sudah melucuti tipe tanpa tanda tambahan, tanda `--experimental-strip-types`
ditulis hanya supaya perintahnya tetap jelas maksudnya.

**Interfaces:**
- Consumes: tidak ada.
- Produces:
  - `type Vek = { x: number; y: number }`
  - `tambah(a: Vek, b: Vek): Vek`, `kurang(a: Vek, b: Vek): Vek`, `kali(k: number, a: Vek): Vek`
  - `panjang(a: Vek): number`, `satuan(a: Vek): Vek`
  - `titik(a: Vek, b: Vek): number`
  - `sudutDerajat(a: Vek): number` (0 sampai 360, diukur dari sumbu x positif berlawanan arah jarum jam)
  - `sudutAntara(a: Vek, b: Vek): number` (0 sampai 180)
  - `panjangProyeksi(a: Vek, b: Vek): number`, `vektorProyeksi(a: Vek, b: Vek): Vek` (a diproyeksikan ke b)
  - `type Jendela = { xMin: number; xMax: number; yMin: number; yMax: number }`
  - `jendelaSeimbang(titikTitik: Vek[], nisbahLayar: number, tepi?: number): Jendela`
  - `keLayar(j: Jendela, kotak: Kotak): { x: (n) => number; y: (n) => number }`
  - `type Kotak = { x0: number; y0: number; x1: number; y1: number }`
  - `keMatematika(j: Jendela, kotak: Kotak): { x: (n) => number; y: (n) => number }`
  - `petak(min: number, maks: number, target?: number): Array<{ nilai: number; label: string }>`
  - `angka(n: number, desimal?: number): string`
  - `labelSkala(j: Jendela): string`

**Kenapa `jendelaSeimbang` ada dan kenapa ia berbeda dari `jendelaMuat` milik Limit.**
`jendelaMuat` di `widget/limit/koordinat.ts` melebarkan sumbu x dan y secara
terpisah. Untuk grafik fungsi itu benar. Untuk vektor itu MERUSAK: vektor (3, 4)
harus terlihat sepanjang 5 satuan dan sudutnya harus terbaca benar dengan busur.
Kalau skala kedua sumbu berbeda, segitiga siku-siku terlihat penyok, sudut 45
derajat terlihat bukan 45, dan seluruh materi jadi membohongi mata siswa.
Karena itu jendela vektor selalu disamakan skalanya, lalu sumbu yang kurang
lebar DIPERLEBAR (bukan yang lebih lebar dipersempit, sebab mempersempit akan
memotong gambar, dan memotong gambar melanggar aturan proyek).

- [ ] **Step 1: Tulis uji yang gagal**

Buat `alat/uji-geometri-vektor.mts`:

```ts
/**
 * Uji geometri vektor. Dijalankan langsung oleh Node 24 tanpa bundler:
 *   node --experimental-strip-types alat/uji-geometri-vektor.mts
 * Berkas yang diuji sengaja tidak mengimpor apa pun supaya bisa begini, dan
 * berkas uji ini sengaja di luar web/ supaya tsc tidak ikut memeriksanya.
 */
import {
  angka, jendelaSeimbang, kali, keLayar, keMatematika, kurang, labelSkala,
  panjang, panjangProyeksi, petak, satuan, sudutAntara, sudutDerajat, tambah,
  titik, vektorProyeksi, type Vek,
} from '../web/components/widget/vektor/geometri.ts'

let gagal = 0
function cek(nama: string, dapat: unknown, harap: unknown) {
  const sama = JSON.stringify(dapat) === JSON.stringify(harap)
  if (!sama) {
    gagal++
    console.error(`GAGAL ${nama}\n  dapat  ${JSON.stringify(dapat)}\n  harap  ${JSON.stringify(harap)}`)
  }
}
function cekDekat(nama: string, dapat: number, harap: number, toleransi = 1e-9) {
  if (!(Math.abs(dapat - harap) <= toleransi)) {
    gagal++
    console.error(`GAGAL ${nama}\n  dapat  ${dapat}\n  harap  ${harap}`)
  }
}

const a: Vek = { x: 3, y: 4 }
const b: Vek = { x: -1, y: 2 }

cek('tambah', tambah(a, b), { x: 2, y: 6 })
cek('kurang', kurang(a, b), { x: 4, y: 2 })
cek('kali', kali(-2, a), { x: -6, y: -8 })
cekDekat('panjang 3-4-5', panjang(a), 5)
cekDekat('panjang vektor nol', panjang({ x: 0, y: 0 }), 0)
cek('satuan 3-4-5', satuan(a), { x: 0.6, y: 0.8 })
// vektor nol tidak punya arah. Membaginya menghasilkan NaN yang menghilangkan
// gambar tanpa pesan, jadi hasilnya dipaksa jadi vektor nol.
cek('satuan vektor nol tidak NaN', satuan({ x: 0, y: 0 }), { x: 0, y: 0 })
cekDekat('titik', titik(a, b), 5)
cekDekat('titik tegak lurus nol', titik({ x: 3, y: 0 }, { x: 0, y: 7 }), 0)

cekDekat('sudut sumbu x positif', sudutDerajat({ x: 5, y: 0 }), 0)
cekDekat('sudut 90', sudutDerajat({ x: 0, y: 2 }), 90)
cekDekat('sudut 225', sudutDerajat({ x: -1, y: -1 }), 225)
cekDekat('sudut antara tegak lurus', sudutAntara({ x: 1, y: 0 }, { x: 0, y: 1 }), 90)
cekDekat('sudut antara berlawanan', sudutAntara({ x: 1, y: 0 }, { x: -3, y: 0 }), 180)

cekDekat('panjang proyeksi', panjangProyeksi({ x: 3, y: 4 }, { x: 5, y: 0 }), 3)
cek('vektor proyeksi', vektorProyeksi({ x: 3, y: 4 }, { x: 5, y: 0 }), { x: 3, y: 0 })

// Skala kedua sumbu WAJIB sama. Bidang 460 x 300 punya nisbah 460/300.
const kotak = { x0: 0, y0: 0, x1: 460, y1: 300 }
const nisbah = 460 / 300
const j = jendelaSeimbang([{ x: 0, y: 0 }, { x: 3, y: 4 }], nisbah, 0.15)
cekDekat('skala x dan y sama', (j.xMax - j.xMin) / (j.yMax - j.yMin), nisbah, 1e-9)

// Semua titik masukan harus tetap di dalam jendela. Kalau ada yang di luar,
// widgetnya memotong gambarnya sendiri, dan itu bug yang sudah dilarang.
const p = keLayar(j, kotak)
for (const t of [{ x: 0, y: 0 }, { x: 3, y: 4 }]) {
  const sx = p.x(t.x), sy = p.y(t.y)
  if (sx < kotak.x0 || sx > kotak.x1 || sy < kotak.y0 || sy > kotak.y1) {
    gagal++
    console.error(`GAGAL titik (${t.x}, ${t.y}) keluar bingkai: layar (${sx}, ${sy})`)
  }
}

// keMatematika harus benar-benar kebalikan keLayar, sebab itu yang dipakai
// saat siswa menyeret ujung panah.
const balik = keMatematika(j, kotak)
cekDekat('bolak-balik x', balik.x(p.x(2.5)), 2.5, 1e-9)
cekDekat('bolak-balik y', balik.y(p.y(-1.25)), -1.25, 1e-9)

// Jendela tidak boleh berlebar nol walau semua titiknya sama. Lebar nol
// membuat pembagian jadi tak hingga dan gambarnya hilang sama sekali.
const jSatuTitik = jendelaSeimbang([{ x: 2, y: 2 }], nisbah)
if (!(jSatuTitik.xMax > jSatuTitik.xMin && jSatuTitik.yMax > jSatuTitik.yMin)) {
  gagal++
  console.error('GAGAL jendela satu titik berlebar nol')
}

cek('angka koma Indonesia', angka(3.5, 2), '3,5')
cek('angka nol di belakang dibuang', angka(2, 2), '2')
cek('angka negatif', angka(-0.25, 2), '-0,25')
cek('petak bulat', petak(0, 5, 5).map((t) => t.nilai), [0, 1, 2, 3, 4, 5])
if (!labelSkala(j).includes('satuan')) {
  gagal++
  console.error('GAGAL penunjuk skala tidak menyebut satuan')
}

console.log(gagal === 0 ? 'SEMUA LOLOS' : `${gagal} GAGAL`)
process.exit(gagal === 0 ? 0 : 1)
```

- [ ] **Step 2: Jalankan, pastikan GAGAL**

```bash
rtk proxy "node --experimental-strip-types alat/uji-geometri-vektor.mts"
```

Diharapkan: gagal dengan `Cannot find module` yang menyebut `geometri.ts`.

- [ ] **Step 3: Tulis `geometri.ts` secukupnya supaya uji lolos**

Isi yang wajib ada, dengan komentar bahasa Indonesia menjelaskan KENAPA, bukan APA:

```ts
export type Vek = { x: number; y: number }
export type Jendela = { xMin: number; xMax: number; yMin: number; yMax: number }
export type Kotak = { x0: number; y0: number; x1: number; y1: number }

export const tambah = (a: Vek, b: Vek): Vek => ({ x: a.x + b.x, y: a.y + b.y })
export const kurang = (a: Vek, b: Vek): Vek => ({ x: a.x - b.x, y: a.y - b.y })
export const kali = (k: number, a: Vek): Vek => ({ x: k * a.x, y: k * a.y })
export const panjang = (a: Vek): number => Math.hypot(a.x, a.y)
export const titik = (a: Vek, b: Vek): number => a.x * b.x + a.y * b.y

/**
 * Vektor satuan. Vektor nol TIDAK punya arah, jadi pembagiannya menghasilkan
 * NaN, dan NaN di dalam atribut SVG membuat gambarnya lenyap tanpa satu pun
 * pesan galat. Karena itu vektor nol dikembalikan apa adanya.
 */
export function satuan(a: Vek): Vek {
  const p = panjang(a)
  return p === 0 ? { x: 0, y: 0 } : { x: a.x / p, y: a.y / p }
}
```

Sisanya (`sudutDerajat` memakai `Math.atan2` lalu dinormalkan ke 0 sampai 360;
`sudutAntara` memakai `Math.acos` dengan hasil bagi dijepit ke rentang -1 sampai
1 supaya galat pembulatan tidak membuat `acos` menghasilkan NaN;
`panjangProyeksi` = `titik(a, b) / panjang(b)`; `vektorProyeksi` =
`kali(titik(a, b) / titik(b, b), b)`; `petak`, `angka`, `labelSkala` disalin
dari `widget/limit/koordinat.ts` lalu impor `WARNA`-nya dibuang) ditulis sampai
uji di Step 1 lolos.

`jendelaSeimbang` ditulis dengan urutan ini: cari kotak pembatas semua titik,
beri tepi, lalu **perlebar sumbu yang kurang** sampai `lebarX / lebarY` sama
dengan `nisbahLayar`, dengan pelebaran dibagi rata ke kiri dan kanan (atau atas
dan bawah) supaya gambarnya tetap di tengah. Kalau lebarnya nol, pakai lebar
minimum 1 satuan lebih dulu.

- [ ] **Step 4: Jalankan, pastikan LOLOS**

```bash
rtk proxy "node --experimental-strip-types alat/uji-geometri-vektor.mts"
```

Diharapkan: `SEMUA LOLOS`, kode keluar 0.

- [ ] **Step 5: Commit**

```bash
git add web/components/widget/vektor/geometri.ts alat/uji-geometri-vektor.mts
git commit -m "Matematika vektor dan penskalaan berskala sama, dengan ujinya"
```

---

### Task 2: Bingkai, panah, penyeretan, dan halaman yang bisa dibuka

Akhir tugas ini `/topik/vektor` sudah bisa dibuka di peramban dengan satu widget
percobaan hidup. Tanpa ini, sembilan widget berikutnya dibangun buta.

**Files:**
- Create: `web/components/widget/vektor/gaya.ts`
- Create: `web/components/widget/vektor/BidangVektor.tsx`
- Create: `web/components/widget/vektor/Panah.tsx`
- Create: `web/components/widget/vektor/useSeret.ts`
- Create: `web/components/widget/vektor/PecahKomponen.tsx`
- Create: `web/components/topik/PanggungVektor.tsx`
- Create: `web/content/vektor/tahap.ts`, `web/content/vektor/index.ts`
- Modify: `web/content/daftar-isi.ts` (tambah satu baris entri vektor)

**Interfaces:**
- Consumes: semua ekspor Tugas 1; `PropPanggung` dan `BagianPanggung` dari `@/components/topik/jenis`; `Tahap` dan `Blok` dari `@/content/tipe`.
- Produces:
  - `gaya.ts`: `VW = 460`, `VH = 300`, `KOTAK: Kotak`, `NISBAH = (KOTAK.x1 - KOTAK.x0) / (KOTAK.y1 - KOTAK.y0)`, `GARIS_PETAK`, `GARIS_SUMBU`, `MONO`, `WARNA` (diekspor ulang dari `@/lib/warna`)
  - `BidangVektor` prop: `{ jendela: Jendela; keterangan?: string; aria: string; onSeret?: (t: Vek) => void; children?: ReactNode }`
  - `Panah` prop: `{ dari: Vek; ke: Vek; jendela: Jendela; warna: string; label?: string; putus?: boolean; tebal?: number; pegangan?: boolean }`
  - `useSeret(jendela, svgRef, onGeser)` mengembalikan `{ onPointerDown, onPointerMove, onPointerUp }`
  - `PecahKomponen` prop: `{ v: Vek; onUbah: (v: Vek) => void }`
  - `PanggungVektor` default export bertipe `ComponentType<PropPanggung>`
  - `tahap.ts`: `export const TAHAP: Tahap[]`, `export const KANAL: Kanal[]`
- Nama widget yang dipakai `Tahap.widget` dikunci di sini dan dipakai tugas berikutnya, huruf kecil berpenghubung: `perahu-sungai`, `panah-berpindah`, `pecah-komponen`, `panjang-dan-arah`, `vektor-satuan`, `sambung-panah`, `jajar-genjang`, `selisih-panah`, `kali-skalar`, `dunia-nyata-vektor`, `perkalian-titik`, `proyeksi`.

- [ ] **Step 1: Tulis `gaya.ts` dan `BidangVektor.tsx`**

`BidangVektor` menyalin susunan `widget/limit/Bidang.tsx` (petak, dua sumbu,
angka sumbu, keterangan kiri atas, penunjuk skala kanan bawah) dengan tiga
perbedaan:

1. Jendelanya datang dari `jendelaSeimbang`, jadi satu satuan pada sumbu x
   berukuran sama persis dengan satu satuan pada sumbu y.
2. `<svg>` menerima `ref` dan penangan pointer, sebab isinya bisa diseret.
3. `touchAction: 'none'` dipasang pada `<svg>`. Tanpa itu, menyeret panah di HP
   akan menggulir halaman, bukan menggerakkan panahnya.

- [ ] **Step 2: Tulis `useSeret.ts`**

```ts
'use client'

import { useCallback, useRef } from 'react'
import { keMatematika, type Jendela, type Vek } from './geometri'
import { KOTAK, VH, VW } from './gaya'

/**
 * Mengubah sentuhan atau tetikus pada SVG menjadi koordinat matematika.
 *
 * KENAPA MEMAKAI getBoundingClientRect DAN BUKAN offsetX
 * SVG di sini diperbesar mengikuti lebar kolom lewat viewBox, jadi satu piksel
 * layar tidak sama dengan satu satuan viewBox. offsetX memberi piksel layar dan
 * akan meleset makin jauh makin lebar layarnya. Perbandingan lebar kotak nyata
 * terhadap lebar viewBox harus dihitung sendiri.
 *
 * KENAPA setPointerCapture
 * Tanpa itu, panah lepas begitu jari bergerak keluar gambar, dan siswa harus
 * mengejar panahnya. Dengan itu, seretan tetap terikat sampai jari diangkat.
 */
export function useSeret(
  jendela: Jendela,
  svgRef: React.RefObject<SVGSVGElement | null>,
  onGeser: (t: Vek) => void,
) {
  const menyeret = useRef(false)

  const bacaTitik = useCallback((e: React.PointerEvent): Vek | null => {
    const svg = svgRef.current
    if (!svg) return null
    const kotak = svg.getBoundingClientRect()
    if (kotak.width === 0 || kotak.height === 0) return null
    // VW dan VH adalah ukuran viewBox, BUKAN ukuran layar. Itulah inti
    // perbaikannya: kotak.width berubah mengikuti lebar kolom, viewBox tidak.
    const vx = ((e.clientX - kotak.left) / kotak.width) * VW
    const vy = ((e.clientY - kotak.top) / kotak.height) * VH
    const m = keMatematika(jendela, KOTAK)
    return { x: m.x(vx), y: m.y(vy) }
  }, [jendela, svgRef])

  return {
    onPointerDown: (e: React.PointerEvent) => {
      menyeret.current = true
      e.currentTarget.setPointerCapture(e.pointerId)
      const t = bacaTitik(e)
      if (t) onGeser(t)
    },
    onPointerMove: (e: React.PointerEvent) => {
      if (!menyeret.current) return
      const t = bacaTitik(e)
      if (t) onGeser(t)
    },
    onPointerUp: (e: React.PointerEvent) => {
      menyeret.current = false
      e.currentTarget.releasePointerCapture(e.pointerId)
    },
  }
}
```

- [ ] **Step 3: Tulis `Panah.tsx`**

Satu anak panah dari titik `dari` ke titik `ke`. Yang wajib diperhatikan:

- Mata panahnya digambar sebagai `<polygon>` yang dihitung dari sudut panahnya,
  BUKAN `marker-end`. Alasannya: `marker-end` ikut menskala mengikuti
  `strokeWidth` dan ukurannya berbeda-beda antar peramban.
- Panah yang panjangnya nol tidak digambar sama sekali. Menghitung sudut dari
  panjang nol menghasilkan arah acak, dan mata panahnya berkedip liar.
- Batang panah dipendekkan sepanjang mata panahnya supaya ujung batang tidak
  mencuat keluar dari ujung mata.
- Label ditaruh di tengah batang, digeser tegak lurus batang, dan diberi
  `paint-order="stroke"` dengan stroke berwarna kartu supaya tidak terpotong
  garis petak. Pola halo ini sudah terbukti di widget lingkaran satuan.
- `pegangan` menggambar lingkaran kecil di ujung panah sebagai isyarat "ini bisa
  ditarik". Tanpa isyarat, siswa tidak tahu widget itu bisa disentuh.

- [ ] **Step 4: Tulis `PecahKomponen.tsx`, `PanggungVektor.tsx`, `tahap.ts` kerangka, dan entri daftar isi**

- `PecahKomponen`: satu panah dari titik asal yang ujungnya bisa diseret, plus
  dua ruas putus-putus yang menunjukkan komponen x dan y beserta segitiga
  siku-sikunya.
- `PanggungVektor` meniru bentuk `PanggungLimit`: memegang keadaan tiap widget,
  mengembalikan `{ kiri, kanan, tanda }` lewat `children`. Untuk sekarang cukup
  cabang `pecah-komponen`.
- `tahap.ts` diisi **kedua belas materi** dengan `no`, `slug`, `judul`,
  `pertanyaan`, `labelPendek`, `widget`, dan `siap`. Isi `penjelasan` boleh baru
  materi 03 yang lengkap; sisanya diisi pada Tugas 3 sampai 6. Kunci judul dan
  nama widgetnya sekarang supaya tugas berikutnya tidak menebak.
- `daftar-isi.ts` ditambah entri `vektor` mengikuti persis bentuk entri `limit`.

- [ ] **Step 5: Jalankan dan LIHAT, jangan cuma percaya build**

```bash
rtk proxy "npx tsc --noEmit"
cd web && npm run dev -- -p 3001
```

Lalu dengan `playwright-cli`: `open http://localhost:3001/topik/vektor` →
`screenshot`. **Buka gambarnya dan nilai sendiri**: panahnya utuh, mata panahnya
menempel di ujung batang, angka sumbu tidak terpotong, penunjuk skala terbaca,
dan segitiga 3-4-5 benar-benar terlihat seperti segitiga siku-siku (bukan
penyok). Seret ujung panahnya, pastikan ia mengikuti kursor tanpa melompat.

- [ ] **Step 6: Commit**

```bash
git add web/components/widget/vektor web/components/topik/PanggungVektor.tsx web/content/vektor web/content/daftar-isi.ts
git commit -m "Bingkai vektor, panah, penyeretan, dan kerangka 12 materi"
```

---

### Task 3: Materi 01 sampai 04 dengan empat widgetnya

**Files:**
- Create: `web/components/widget/vektor/PerahuSungai.tsx`, `PanahBerpindah.tsx`, `PanjangDanArah.tsx`
- Modify: `web/components/widget/vektor/PecahKomponen.tsx` (rapikan sesuai naskah materi 03)
- Modify: `web/content/vektor/tahap.ts` (penjelasan materi 01 sampai 04)
- Modify: `web/components/topik/PanggungVektor.tsx` (empat cabang widget dan tabel angkanya)

**Interfaces:**
- Consumes: `geometri.ts`, `gaya.ts`, `BidangVektor`, `Panah`, `useSeret` dari Tugas 1 dan 2.
- Produces: nama widget `perahu-sungai`, `panah-berpindah`, `pecah-komponen`, `panjang-dan-arah` sudah hidup di panggung.

**Patokan penerimaan tiap materi** (semua wajib, tidak ada yang opsional):

| Materi | Wajib ada |
|---|---|
| 01 Angka saja tidak cukup | Perahu didayung tegak lurus 3 km/jam, arus 4 km/jam ke hilir. Widget `PerahuSungai`: dua panah bisa diseret, panah hasil dan lintasan nyata mengikuti, titik mendarat bergeser. Tabel kanan menampilkan kecepatan dayung, kecepatan arus, kecepatan sebenarnya, dan pergeseran ke hilir. Ditutup dengan daftar besaran berarah lawan besaran biasa. |
| 02 Panah yang boleh dipindah | Ruas garis berarah, titik pangkal dan ujung, tiga cara menulis notasi. Vektor ekuivalen, vektor lawan, vektor berkebalikan, vektor nol. Tiga bentuk yang BUKAN vektor (garis lengkung, garis berkepala dua, garis patah) dari Ayo Berpikir Kritis Buku Guru halaman 96. Widget `PanahBerpindah`: satu panah acuan diam, satu panah bisa diseret ke mana saja, panel menyatakan sama atau tidak DAN alasannya. |
| 03 Memecah panah jadi dua langkah | Komponen x dan y, penulisan baris dan kolom (Buku Guru menegaskan vektor baris ditulis TANPA koma), vektor dari dua titik sebagai ujung dikurangi pangkal. Widget `PecahKomponen`. |
| 04 Panjang panah itu Pythagoras | Besar vektor dari Pythagoras, arah dalam derajat dari sumbu x positif dan padanan mata anginnya. Panjang tidak pernah negatif. Widget `PanjangDanArah`: panah diputar dengan diseret, panjang tetap, sudut dan mata angin berubah. |

Kotak "Sering keliru" yang wajib muncul: materi 02 dua butir (letak berbeda
bukan berarti vektor berbeda; berlawanan arah saja belum cukup jadi vektor
lawan), materi 03 satu butir (vektor bukan titik koordinat), materi 04 satu
butir (panjang resultan bukan jumlah panjang). Sumbernya Buku Guru Kelas 10
halaman 96 sampai 106, ditulis ulang dengan kalimat sendiri.

- [ ] **Step 1: Tulis naskah keempat materi di `tahap.ts`**

Pakai keenam jenis `Blok` berselang-seling supaya tidak jadi tembok paragraf:
`sesi` sebagai penanda bagian, `paragraf` pendek, `poin` berlabel tebal, `sorot`
untuk kalimat kunci, `contoh` untuk kotak berhitung, dan `coba` untuk mengajak
memakai widget di sebelah kiri. Aturan letak `coba`: di TENGAH materi, bukan di
awal, bukan di akhir.

- [ ] **Step 2: Tulis keempat widget**

Tiap widget wajib: memakai `jendelaSeimbang`, menampilkan penunjuk skala, punya
`aria` yang menjelaskan isinya buat pembaca layar, dan tidak memotong gambarnya
sendiri saat nilainya digeser sampai batas ekstrem.

- [ ] **Step 3: Periksa tipe dan LIHAT keempat materi**

```bash
rtk proxy "npx tsc --noEmit"
```

Lalu `playwright-cli` pada `http://localhost:3001/topik/vektor`, buka materi 01
sampai 04 satu per satu, `screenshot` tiap materi, **buka gambarnya dan nilai**:
teks tidak bertindih gambar, panah tidak keluar bingkai, angka pada tabel kanan
cocok dengan gambar di kiri, dan tidak ada em-dash.

- [ ] **Step 4: Seret sampai batas, cari yang terpotong**

Untuk tiap widget: seret ujung panahnya ke pojok terjauh yang bisa dicapai, lalu
screenshot lagi. Kalau ada bagian gambar yang terpotong tepi, perbaiki
jendelanya, bukan batasi seretannya diam-diam.

- [ ] **Step 5: Commit**

```bash
git add web/components/widget/vektor web/components/topik/PanggungVektor.tsx web/content/vektor/tahap.ts
git commit -m "Materi 01 sampai 04 vektor beserta empat widgetnya"
```

---

### Task 4: Materi 05 sampai 09 dengan lima widgetnya

**Files:**
- Create: `web/components/widget/vektor/VektorSatuan.tsx`, `SambungPanah.tsx`, `JajarGenjang.tsx`, `SelisihPanah.tsx`, `KaliSkalar.tsx`
- Modify: `web/content/vektor/tahap.ts`, `web/components/topik/PanggungVektor.tsx`

**Interfaces:**
- Consumes: sama seperti Tugas 3.
- Produces: nama widget `vektor-satuan`, `sambung-panah`, `jajar-genjang`, `selisih-panah`, `kali-skalar` hidup di panggung.

| Materi | Wajib ada |
|---|---|
| 05 Arah tanpa panjang | Vektor satuan, i dan j, vektor posisi, membagi vektor dengan panjangnya sendiri. Komponen tiga dimensi (i, j, k) muncul sebagai ANGKA saja, tanpa gambar ruang. Widget `VektorSatuan`: panah panjang diseret, panah satuannya tetap sepanjang 1 dan searah. |
| 06 Menjumlah itu menyambung perjalanan | Metode segitiga dan poligon, kata "resultan", ujung ke pangkal. Lalu: dengan komponen, tinggal jumlahkan angkanya. Widget `SambungPanah`: dua sampai tiga panah bisa diseret, resultan mengikuti. |
| 07 Dua yang bekerja bersamaan | Metode jajar genjang dan kapan memakai yang mana: berurutan pakai segitiga, serentak pakai jajar genjang. Contoh dua orang menarik satu peti. Widget `JajarGenjang`: dua panah dari satu titik, jajar genjangnya terbentuk, diagonalnya resultan. |
| 08 Mengurangi itu menambah lawannya | a kurang b sama dengan a tambah lawan b. "Dari A ke B" adalah posisi B dikurangi posisi A. Kecepatan relatif secara ringan. Widget `SelisihPanah`. |
| 09 Dikali angka | Perkalian skalar, pengali negatif membalik arah, pengali nol memberi vektor nol, dua vektor berkelipatan pasti sejajar. Widget `KaliSkalar`: pengali digeser dari -3 sampai 3 termasuk melewati nol. |

Kotak "Sering keliru" yang wajib: materi 06 (menyambung pangkal ke pangkal),
materi 08 (membalik urutan jadi A dikurangi B untuk perjalanan A ke B),
materi 09 (mengira dikali bilangan negatif membuat panjang jadi negatif).

- [ ] **Step 1: Tulis naskah materi 05 sampai 09**

Aturan blok sama seperti Tugas 3.

- [ ] **Step 2: Tulis kelima widget**

Perhatian khusus `KaliSkalar`: saat pengalinya melewati nol, panahnya menjadi
panjang nol. `Panah` sudah menolak menggambar panjang nol (Tugas 2 Step 3), jadi
yang terlihat adalah panah menghilang lalu muncul terbalik. Beri teks kecil
"vektor nol" di titik asal supaya siswa tidak mengira widgetnya rusak.

- [ ] **Step 3: Periksa tipe dan LIHAT kelima materi**

```bash
rtk proxy "npx tsc --noEmit"
```

Screenshot materi 05 sampai 09 lewat `playwright-cli`, buka gambarnya, nilai
seperti pada Tugas 3 Step 3. Tambahan khusus materi 07: pastikan jajar genjangnya
benar-benar jajar genjang saat kedua panah hampir sejajar, bukan berubah jadi
garis pipih yang menutupi labelnya sendiri.

- [ ] **Step 4: Commit**

```bash
git add web/components/widget/vektor web/components/topik/PanggungVektor.tsx web/content/vektor/tahap.ts
git commit -m "Materi 05 sampai 09 vektor beserta lima widgetnya"
```

---

### Task 5: Materi 11 dan 12, dua materi lanjutan

Dipisah dari tugas lain supaya bisa DIBUANG UTUH kalau ARYA berubah pikiran,
tanpa menyentuh sepuluh materi inti.

**Files:**
- Create: `web/components/widget/vektor/PerkalianTitik.tsx`, `Proyeksi.tsx`
- Modify: `web/content/vektor/tahap.ts`, `web/components/topik/PanggungVektor.tsx`

**Interfaces:**
- Consumes: `titik`, `sudutAntara`, `panjangProyeksi`, `vektorProyeksi` dari `geometri.ts`.
- Produces: nama widget `perkalian-titik`, `proyeksi`.

| Materi | Wajib ada |
|---|---|
| 11 Seberapa searah? | Perkalian titik lewat komponen, lalu lewat panjang dikali kosinus sudut. Tegak lurus memberi nol. Hasilnya ANGKA, bukan panah: ini yang paling sering dilupakan. Widget `PerkalianTitik`: satu panah diputar dengan diseret, nilai hasil kali titik hidup, tandanya berubah saat melewati 90 derajat. |
| 12 Bayangan satu panah pada panah lain | Panjang proyeksi dan vektor proyeksi, beserta bedanya. Widget `Proyeksi`: bayangan jatuh tegak lurus, garis tegak lurusnya terlihat. |

**Penanda lanjutan yang wajib.** Kedua materi dibuka dengan blok `sorot` yang
menyatakan terus terang bahwa bagian ini di luar Kurikulum Merdeka Kelas 10 dan
ditujukan untuk persiapan UTBK, jadi siswa yang mencocokkan dengan buku
sekolahnya tidak bingung. Ini keputusan ARYA 1 September 2026, bukan tafsiran.

- [ ] **Step 1: Tulis naskah kedua materi berikut penanda lanjutannya**

- [ ] **Step 2: Tulis kedua widget**

Perhatian `PerkalianTitik`: kosinus 90 derajat tidak pernah persis nol karena
pembulatan. Nilai yang lebih kecil dari 0,005 ditampilkan sebagai "0", jangan
sebagai "0,00001", supaya kalimat "tegak lurus memberi nol" tidak dibantah
angkanya sendiri di layar.

- [ ] **Step 3: Periksa tipe dan LIHAT**

```bash
rtk proxy "npx tsc --noEmit"
```

Screenshot materi 11 dan 12, buka gambarnya, nilai. Khusus materi 12: pastikan
saat sudutnya tumpul, vektor proyeksinya menunjuk BERLAWANAN dengan panah
acuannya, dan itu memang benar, bukan bug.

- [ ] **Step 4: Commit**

```bash
git add web/components/widget/vektor web/components/topik/PanggungVektor.tsx web/content/vektor/tahap.ts
git commit -m "Materi lanjutan 11 dan 12: perkalian titik dan proyeksi"
```

---

### Task 6: Materi 10, foto dunia nyata

**Files:**
- Create: `web/components/widget/vektor/DuniaNyataVektor.tsx`
- Create: `web/public/gambar/vektor/*.jpg` (empat foto, sudah dikompres)
- Modify: `web/public/gambar/sumber.json` (tambah catatan sumber keempat foto)
- Modify: `web/content/vektor/tahap.ts`, `web/components/topik/PanggungVektor.tsx`

**Interfaces:**
- Consumes: pola `DuniaNyataLimit.tsx` untuk susunan galerinya.
- Produces: nama widget `dunia-nyata-vektor`.

Empat penerapan yang ditampilkan: perahu menyeberang sungai berarus (menutup
cerita Materi 01 dengan hitungannya), pesawat melawan angin samping, dua tali
menahan satu lampu gantung, dan gerak lempeng bumi (contoh asli Buku Guru, 5 cm
per tahun).

**Syarat foto, semuanya wajib:**
- Sumbernya Wikimedia Commons, lisensi terbuka (CC0, CC BY, atau domain publik).
- Sumber, penulis, dan lisensi dicatat di `web/public/gambar/sumber.json`
  mengikuti bentuk yang sudah ada di sana.
- **Dikompres sampai di bawah 150 KB per foto.** PROGRESS mencatat foto Materi 10
  Trigonometri menumpuk sampai sekitar 1,5 MB dan sampai sekarang belum
  dikompres. Utang itu tidak ditambah dari sini.
- Ditampilkan dengan `object-fit: contain`, tidak dipotong. Foto Materi 10
  Trigonometri sempat terpotong dan itu sudah diperbaiki sekali, jangan diulang.

- [ ] **Step 1: Cari, unduh, dan kompres keempat foto**

Setelah dikompres, periksa ukurannya sungguhan:

```bash
rtk proxy "ls -la web/public/gambar/vektor"
```

Diharapkan: setiap berkas di bawah 150 KB. Kalau ada yang lebih, kompres lagi
atau ganti fotonya.

- [ ] **Step 2: Catat sumber di `sumber.json`, tulis galeri dan naskah materi 10**

- [ ] **Step 3: LIHAT galerinya**

Screenshot materi 10, buka gambarnya: keempat foto tampil utuh (tidak terpotong,
tidak melar), keterangannya terbaca, dan keterangan sumbernya ada.

- [ ] **Step 4: Commit**

```bash
git add web/public/gambar web/components/widget/vektor/DuniaNyataVektor.tsx web/components/topik/PanggungVektor.tsx web/content/vektor/tahap.ts
git commit -m "Materi 10 vektor: galeri foto penerapan nyata beserta sumbernya"
```

---

### Task 7: Pemeriksa sympy, lalu empat soal latihan

Urutannya sengaja begini: **pemeriksanya dibuat SEBELUM satu soal pun ditulis**.
Itu yang dilakukan di topik Limit dan hasilnya nol jawaban salah.

**Files:**
- Create: `alat/cek_vektor.py`
- Create: `alat/uji-cek-vektor.json` (berisi jawaban yang SENGAJA salah, untuk membuktikan pemeriksanya benar-benar menolak)
- Create: `alat/materi-vektor.json`, `alat/soal-latihan-vektor.json`
- Create: `web/content/vektor/latihan.ts`
- Modify: `web/content/vektor/index.ts`, `web/content/daftar-isi.ts`

**Interfaces:**
- Consumes: pola `alat/cek_soal.py` dan bentuk JSON `alat/soal-latihan-limit.json`.
- Produces: `LATIHAN: Soal[]` panjangnya 4, diekspor dari `content/vektor/latihan.ts`.

- [ ] **Step 1: Tulis `alat/uji-cek-vektor.json` berisi jawaban yang sengaja salah**

Minimal enam kasus: panjang vektor salah, hasil penjumlahan salah, vektor satuan
tidak berpanjang 1, hasil kali titik salah, sudut salah, dan proyeksi salah.

- [ ] **Step 2: Jalankan pemeriksa yang belum ada, pastikan gagal**

```bash
rtk proxy "python alat/cek_vektor.py alat/uji-cek-vektor.json"
```

Diharapkan: gagal karena berkasnya belum ada.

- [ ] **Step 3: Tulis `alat/cek_vektor.py`**

Memakai sympy, meniru `alat/cek_soal.py`: membandingkan selisih yang sudah
disederhanakan (bukan teks), sehingga `0,5` diakui sama dengan `1/2` dan `5`
diakui sama dengan `sqrt(25)`. Memeriksa jenis: `panjang`, `jumlah`, `selisih`,
`kali_skalar`, `satuan`, `titik`, `sudut`, `proyeksi_panjang`, `proyeksi_vektor`.
Kode keluar bukan nol kalau ada satu saja yang salah, dan pesannya menyebutkan
jawaban yang benar.

- [ ] **Step 4: Buktikan pemeriksanya menolak yang salah, lalu meloloskan yang benar**

```bash
rtk proxy "python alat/cek_vektor.py alat/uji-cek-vektor.json"
```

Diharapkan: keenam kasus DITOLAK, kode keluar bukan nol. Kalau ada satu saja yang
lolos, pemeriksanya bocor dan wajib diperbaiki sebelum lanjut.

- [ ] **Step 5: Kalibrasi kesulitan SEBELUM menulis soal**

Baca Latihan 3.1 sampai 3.6 di Buku Guru Kelas 10 (halaman PDF 108 sampai 133)
dan catat bentuk soalnya di laporan. Aturan proyek: soal buatan Claude cenderung
terlalu mudah, dan itu temuan ARYA, bukan dugaan. mathcyber1997.com diblokir
pemeriksa bot, jangan diterobos.

- [ ] **Step 6: Tulis 4 soal latihan, lalu periksa angkanya**

Empat soal pilihan ganda A sampai E dengan pembahasan bertahap. Tiap pengecoh
adalah satu kekeliruan dari tabel "Sering keliru", bukan angka asal salah.
Angkanya dicatat di `alat/soal-latihan-vektor.json` lalu:

```bash
rtk proxy "python alat/cek_vektor.py alat/soal-latihan-vektor.json alat/materi-vektor.json"
```

Diharapkan: semua lolos, kode keluar 0.

- [ ] **Step 7: Commit**

```bash
git add alat web/content/vektor
git commit -m "Pemeriksa vektor bersympy dan empat soal latihan yang sudah lolos"
```

---

### Task 8: Bank 32 soal kuis

**Files:**
- Create: `web/content/vektor/kuis.ts`
- Create: `alat/soal-kuis-vektor.json`
- Modify: `web/content/vektor/index.ts`

**Interfaces:**
- Consumes: `SoalKuis` dan `TingkatKuis` dari `@/content/tipe`; `alat/cek_vektor.py` dari Tugas 7.
- Produces: `KUIS: SoalKuis[]` panjangnya 32.

Sebaran tingkat mengikuti bank Limit: 8 mudah, 10 sedang, 8 sulit, 6 sangat
sulit. Tiap `id` unik dan tetap, sebab id itulah yang dipakai mengingat soal mana
yang sudah pernah keluar. Tiap `alasan` menjelaskan juga KENAPA pilihan yang
salah itu menggoda, bukan cuma menyebut yang benar.

- [ ] **Step 1: Tulis 32 soal beserta angkanya di JSON**

- [ ] **Step 2: Periksa seluruh angkanya**

```bash
rtk proxy "python alat/cek_vektor.py alat/soal-kuis-vektor.json"
```

Diharapkan: 32 dari 32 lolos, kode keluar 0. Ada yang gagal berarti soalnya yang
salah, bukan pemeriksanya. Perbaiki soalnya.

- [ ] **Step 3: Buktikan empat sesi pertama tidak mengulang soal**

Bank 32 dengan 8 soal per sesi harus habis persis dalam empat sesi tanpa
pengulangan. Buka `/topik/vektor`, buka kuisnya empat kali berturut-turut,
catat id yang keluar, pastikan tidak ada yang muncul dua kali.

- [ ] **Step 4: Commit**

```bash
git add alat/soal-kuis-vektor.json web/content/vektor
git commit -m "Bank 32 soal kuis vektor, seluruh angkanya lolos sympy"
```

---

### Task 9: Gerbang akhir gelombang 1

Tidak boleh ada satu pun langkah di sini yang dilewati, dan tidak boleh ada
klaim "selesai" sebelum keluarannya DILIHAT.

**Files:**
- Modify: `docs/tugas/laporan/MATRA-VEKTOR.md`

- [ ] **Step 1: Jalankan ulang seluruh uji dan pemeriksa**

```bash
rtk proxy "node --experimental-strip-types alat/uji-geometri-vektor.mts"
rtk proxy "python alat/cek_vektor.py alat/materi-vektor.json alat/soal-latihan-vektor.json alat/soal-kuis-vektor.json"
```

Diharapkan: keduanya kode keluar 0. Tempel keluarannya di laporan.

- [ ] **Step 2: Periksa tipe dan build**

```bash
rtk proxy "npx tsc --noEmit"
rtk proxy "npm run build"
```

Keduanya dijalankan di dalam `web/`. Diharapkan: lolos tanpa galat.

- [ ] **Step 3: Cari em-dash dan kata terlarang**

```bash
rtk proxy "grep -rn $'—' web/content/vektor web/components/widget/vektor web/components/topik/PanggungVektor.tsx"
rtk proxy "grep -rni miskonsepsi web/content/vektor web/components/widget/vektor"
```

Diharapkan: keduanya tidak menemukan apa pun. Satu temuan saja berarti aturan
proyek dilanggar dan wajib diperbaiki.

- [ ] **Step 4: Gerbang visual pada dua lebar layar**

Dengan `playwright-cli`, pada lebar **375** dan **1366** piksel, buka kedua belas
materi, halaman latihan, dan kuis. Screenshot semuanya. Lalu **BUKA tiap gambar
dan nilai satu per satu**: teks tidak bertindih, tidak ada yang keluar tepi,
widget tidak terpotong, penunjuk skala terbaca, tabel angka cocok dengan
gambarnya, tombol bisa dijangkau ibu jari di 375 piksel.

Ini bukan formalitas. Pada 31 Agustus sebuah video dirilis dengan 7 cacat karena
hanya lognya yang dicek, dan ARYA yang menemukannya. Aturan yang sama berlaku
untuk halaman.

- [ ] **Step 5: Tulis laporan**

`docs/tugas/laporan/MATRA-VEKTOR.md` dengan bentuk yang diminta
`ATURAN-SEMUA-SESI.md`: Selesai, Sedang dikerjakan, Butuh MASTER, Butuh
keputusan ARYA. Bagian "Butuh MASTER" wajib memuat setidaknya:

1. `content/topik.ts` perlu `siap: true` untuk vektor.
2. Usul menaikkan bingkai widget jadi milik bersama, sebab sekarang ada dua
   salinan yang mirip (`widget/limit/koordinat.ts` dan `widget/vektor/geometri.ts`).
3. Kalau ada cacat tersisa: SEBUTKAN, jangan diamkan.

- [ ] **Step 6: Commit dan beri tahu ARYA**

```bash
git add docs/tugas/laporan/MATRA-VEKTOR.md
git commit -m "Laporan MATRA-VEKTOR gelombang 1 selesai"
```

Baru setelah semua langkah di atas dijalankan DAN keluarannya dilihat, sesi ini
boleh menyatakan gelombang 1 selesai.
