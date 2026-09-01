/**
 * Uji geometri vektor. Dijalankan langsung oleh Node 24 tanpa bundler:
 *   node alat/uji-geometri-vektor.mts
 *
 * KENAPA BERKAS INI DI LUAR web/
 * Node baru mau mengimpor berkas TypeScript kalau tulisan `.ts` disebutkan di
 * jalur impornya. Sebaliknya `tsc` dengan setelan proyek ini MENOLAK impor
 * berakhiran `.ts` (galat TS5097), sedangkan `web/tsconfig.json` mencakup
 * `**` `/*.ts` dan `*.mts` sekaligus. Jadi di mana pun berkas uji ini ditaruh
 * di dalam `web/`, ia ikut terperiksa dan `npm run build` gagal. Ditaruh di
 * `alat/`, keduanya beres tanpa menyentuh `tsconfig.json` yang bukan milik
 * sesi ini.
 *
 * Berkas yang diuji sengaja tidak mengimpor apa pun, supaya bisa dijalankan
 * begini tanpa alias `@/` dan tanpa DOM.
 */
import {
  angka, jendelaSeimbang, kali, keLayar, keMatematika, kurang, labelSkala,
  panjang, panjangProyeksi, petak, satuan, sudutAntara, sudutDerajat, tambah,
  titik, vektorProyeksi, type Vek,
} from '../web/components/widget/vektor/geometri.ts'

let gagal = 0

function cek(nama: string, dapat: unknown, harap: unknown) {
  if (JSON.stringify(dapat) !== JSON.stringify(harap)) {
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

/* ---------------- operasi dasar ---------------- */

cek('tambah', tambah(a, b), { x: 2, y: 6 })
cek('kurang', kurang(a, b), { x: 4, y: 2 })
cek('kali', kali(-2, a), { x: -6, y: -8 })
cekDekat('panjang 3-4-5', panjang(a), 5)
cekDekat('panjang vektor nol', panjang({ x: 0, y: 0 }), 0)
cekDekat('panjang tidak pernah negatif', panjang({ x: -3, y: -4 }), 5)

cekDekat('satuan x', satuan(a).x, 0.6)
cekDekat('satuan y', satuan(a).y, 0.8)
cekDekat('satuan panjangnya 1', panjang(satuan({ x: -7, y: 2 })), 1)

// Vektor nol tidak punya arah. Membaginya menghasilkan NaN, dan NaN di dalam
// atribut SVG membuat gambarnya lenyap tanpa satu pun pesan galat.
cek('satuan vektor nol tidak NaN', satuan({ x: 0, y: 0 }), { x: 0, y: 0 })

/* ---------------- perkalian titik dan sudut ---------------- */

cekDekat('titik', titik(a, b), 5)
cekDekat('titik tegak lurus nol', titik({ x: 3, y: 0 }, { x: 0, y: 7 }), 0)

cekDekat('sudut sumbu x positif', sudutDerajat({ x: 5, y: 0 }), 0)
cekDekat('sudut 90', sudutDerajat({ x: 0, y: 2 }), 90)
cekDekat('sudut 225', sudutDerajat({ x: -1, y: -1 }), 225)
cekDekat('sudut 315', sudutDerajat({ x: 1, y: -1 }), 315)
cekDekat('sudut vektor nol dijawab 0', sudutDerajat({ x: 0, y: 0 }), 0)

cekDekat('sudut antara tegak lurus', sudutAntara({ x: 1, y: 0 }, { x: 0, y: 1 }), 90)
cekDekat('sudut antara berlawanan', sudutAntara({ x: 1, y: 0 }, { x: -3, y: 0 }), 180)
cekDekat('sudut antara searah', sudutAntara({ x: 2, y: 2 }, { x: 5, y: 5 }), 0)

/* ---------------- proyeksi ---------------- */

cekDekat('panjang proyeksi', panjangProyeksi({ x: 3, y: 4 }, { x: 5, y: 0 }), 3)
cekDekat('panjang proyeksi tumpul negatif', panjangProyeksi({ x: -3, y: 4 }, { x: 5, y: 0 }), -3)
cekDekat('vektor proyeksi x', vektorProyeksi({ x: 3, y: 4 }, { x: 5, y: 0 }).x, 3)
cekDekat('vektor proyeksi y', vektorProyeksi({ x: 3, y: 4 }, { x: 5, y: 0 }).y, 0)

/* ---------------- jendela berskala sama ---------------- */

const kotak = { x0: 0, y0: 0, x1: 460, y1: 300 }
const nisbah = (kotak.x1 - kotak.x0) / (kotak.y1 - kotak.y0)
const isi: Vek[] = [{ x: 0, y: 0 }, { x: 3, y: 4 }]
const j = jendelaSeimbang(isi, nisbah, 0.15)

// Inti seluruh topik ini. Kalau skala kedua sumbu berbeda, segitiga 3-4-5
// terlihat penyok dan sudut 45 derajat terlihat bukan 45.
cekDekat('skala x dan y sama', (j.xMax - j.xMin) / (j.yMax - j.yMin), nisbah)

// Semua titik masukan harus tetap di dalam bingkai. Kalau ada yang keluar,
// widgetnya memotong gambarnya sendiri, dan itu sudah dilarang aturan proyek.
const p = keLayar(j, kotak)
for (const t of isi) {
  const sx = p.x(t.x)
  const sy = p.y(t.y)
  if (sx < kotak.x0 || sx > kotak.x1 || sy < kotak.y0 || sy > kotak.y1) {
    gagal++
    console.error(`GAGAL titik (${t.x}, ${t.y}) keluar bingkai: layar (${sx}, ${sy})`)
  }
}

// keMatematika wajib benar-benar kebalikan keLayar, sebab itulah yang dipakai
// saat siswa menyeret ujung panah.
const balik = keMatematika(j, kotak)
cekDekat('bolak-balik x', balik.x(p.x(2.5)), 2.5)
cekDekat('bolak-balik y', balik.y(p.y(-1.25)), -1.25)

// Jendela berlebar nol membuat pembagian jadi tak hingga dan gambarnya hilang.
const jSatu = jendelaSeimbang([{ x: 2, y: 2 }], nisbah)
if (!(jSatu.xMax > jSatu.xMin && jSatu.yMax > jSatu.yMin)) {
  gagal++
  console.error('GAGAL jendela satu titik berlebar nol')
}
cekDekat('jendela satu titik tetap seimbang', (jSatu.xMax - jSatu.xMin) / (jSatu.yMax - jSatu.yMin), nisbah)

// Senarai kosong pun tidak boleh meruntuhkan widget.
const jKosong = jendelaSeimbang([], nisbah)
if (!(jKosong.xMax > jKosong.xMin && jKosong.yMax > jKosong.yMin)) {
  gagal++
  console.error('GAGAL jendela kosong berlebar nol')
}

// Vektor yang jauh lebih tinggi daripada lebar tetap harus muat utuh.
const jTinggi = jendelaSeimbang([{ x: 0, y: 0 }, { x: 0.2, y: 9 }], nisbah, 0.15)
const pTinggi = keLayar(jTinggi, kotak)
for (const t of [{ x: 0, y: 0 }, { x: 0.2, y: 9 }]) {
  const sy = pTinggi.y(t.y)
  if (sy < kotak.y0 || sy > kotak.y1) {
    gagal++
    console.error(`GAGAL vektor jangkung terpotong di y: ${sy}`)
  }
}

/* ---------------- angka dan petak ---------------- */

cek('angka koma Indonesia', angka(3.5, 2), '3,5')
cek('angka nol di belakang dibuang', angka(2, 2), '2')
cek('angka negatif', angka(-0.25, 2), '-0,25')
cek('petak bulat', petak(0, 5).map((t) => t.nilai), [0, 1, 2, 3, 4, 5])

if (!labelSkala(j).includes('satuan')) {
  gagal++
  console.error('GAGAL penunjuk skala tidak menyebut satuan')
}

console.log(gagal === 0 ? 'SEMUA LOLOS' : `${gagal} GAGAL`)
process.exit(gagal === 0 ? 0 : 1)
