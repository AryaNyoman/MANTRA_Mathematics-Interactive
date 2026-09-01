/**
 * Pemeriksa silang: hitungan situs dibandingkan dengan data dan klaim yang sama
 * seperti versi Python.
 *
 * KENAPA ADA
 * `alat/cek_statistik.py` memeriksa angka yang saya TULIS di halaman. Tetapi
 * widget statistika menghitung ulang sendiri setiap kali siswa menyeret satu
 * titik, dan hitungan itu ditulis dalam TypeScript, bukan Python. Kalau kedua
 * penulisan berbeda cara, misalnya soal kuartil, siswa melihat satu angka di
 * layar sementara angka yang saya periksa lain, dan tidak ada yang menyadarinya
 * sampai ada yang membandingkan sendiri.
 *
 * Berkas ini yang membandingkan. Sumber datanya sama persis, yaitu
 * `web/content/statistika/data.json`, jadi tidak ada celah salinan berbeda.
 *
 * CARA PAKAI
 *     node alat/cek_statistik_web.mjs
 *
 * Node menjalankan berkas TypeScript apa adanya sejak versi 22, jadi tidak ada
 * langkah pembangunan. Peringatan MODULE_TYPELESS_PACKAGE_JSON dari Node tidak
 * berbahaya dan sudah dimatikan lewat pilihan di bawah.
 *
 * BATAS PEMBANDINGAN
 * Angka dianggap cocok kalau selisihnya tidak lebih dari setengah satuan
 * terakhir yang ditulis. Jadi klaim "2,69" lolos untuk nilai mana pun antara
 * 2,685 dan 2,695. Itu memang yang dijanjikan angka berdesimal kepada pembaca,
 * dan sekaligus menghindari laporan palsu akibat perbedaan kecil cara membulat
 * antara Python dan JavaScript.
 *
 * KODE KELUAR
 * 0  semua cocok
 * 1  ada yang tidak cocok
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const DI_SINI = dirname(fileURLToPath(import.meta.url))
const BERKAS_DATA = resolve(DI_SINI, '../web/content/statistika/data.json')

// Di Windows, import dinamis menolak jalur seperti D:\... dan menuntut bentuk
// file:// yang sah, jadi jalurnya diubah dulu.
const { ringkasTunggal, ringkasKelompok, regresi } = await import(
  pathToFileURL(resolve(DI_SINI, '../web/components/widget/statistika/statistik.ts')).href
)

/** Ubah "12,22" atau 12.22 menjadi angka, dan hitung banyak desimalnya. */
function uraiKlaim(nilai) {
  const teks = String(nilai).trim().replace(',', '.')
  const angka = Number(teks)
  const desimal = teks.includes('.') ? teks.split('.')[1].length : 0
  return { angka, desimal, teks }
}

function cocok(benar, diklaim) {
  const { angka, desimal } = uraiKlaim(diklaim)
  if (!Number.isFinite(angka)) return { lolos: false, pesan: `klaim ${diklaim} tidak terbaca` }
  // setengah satuan terakhir, ditambah kelonggaran kecil untuk galat float
  const batas = 0.5 * 10 ** -desimal + 1e-9
  const selisih = Math.abs(benar - angka)
  return {
    lolos: selisih <= batas,
    pesan: `situs menghitung ${benar}, klaim ${diklaim}, selisih ${selisih.toExponential(2)}`,
  }
}

/** Nama klaim di berkas data, dipetakan ke nama bidang di kode situs. */
const PETA = {
  simpangan_baku: 'simpanganBaku',
  pagar_bawah: 'pagarBawah',
  pagar_atas: 'pagarAtas',
  mean_x: 'meanX',
  mean_y: 'meanY',
}

function hitung(butir) {
  if (butir.jenis === 'tunggal') return ringkasTunggal(butir.data)
  if (butir.jenis === 'kelompok') return ringkasKelompok(butir.kelas)
  if (butir.jenis === 'bivariat') return regresi(butir.pasangan)
  if (butir.jenis === 'kategori') {
    const n = butir.kategori.reduce((a, k) => a + k.f, 0)
    return { n, persen: butir.kategori.map((k) => (k.f * 100) / n) }
  }
  throw new Error(`jenis ${butir.jenis} tidak dikenal`)
}

const isi = JSON.parse(readFileSync(BERKAS_DATA, 'utf8'))
const keluhan = []
let cocokSemua = 0

for (const butir of isi) {
  const klaim = butir.klaim
  if (!klaim) continue

  let hasil
  try {
    hasil = hitung(butir)
  } catch (e) {
    keluhan.push(`${butir.id}: ${e.message}`)
    continue
  }

  let jumlahCocok = 0
  for (const [kunci, nilai] of Object.entries(klaim)) {
    const bidang = PETA[kunci] ?? kunci
    const benar = hasil[bidang]

    if (benar === undefined) {
      keluhan.push(`${butir.id}: situs tidak punya ${bidang}`)
      continue
    }

    if (Array.isArray(benar) || kunci === 'persen') {
      const daftar = Array.isArray(benar) ? benar : []
      if (!Array.isArray(nilai) || daftar.length !== nilai.length) {
        keluhan.push(
          `${butir.id}: ${kunci} situs berisi ${daftar.length} angka, klaim ${
            Array.isArray(nilai) ? nilai.length : 'bukan daftar'
          }`,
        )
        continue
      }
      let semua = true
      for (let i = 0; i < daftar.length; i++) {
        const { lolos, pesan } = cocok(daftar[i], nilai[i])
        if (!lolos) {
          keluhan.push(`${butir.id}: ${kunci} ke-${i + 1}, ${pesan}`)
          semua = false
        }
      }
      if (semua) jumlahCocok++
      continue
    }

    const { lolos, pesan } = cocok(benar, nilai)
    if (lolos) jumlahCocok++
    else keluhan.push(`${butir.id}: ${kunci}, ${pesan}`)
  }

  cocokSemua += jumlahCocok
  const total = Object.keys(klaim).length
  console.log(
    `  ${jumlahCocok === total ? 'ok   ' : 'SALAH'} ${butir.id}, ${jumlahCocok} dari ${total} angka`,
  )
}

console.log()
if (keluhan.length > 0) {
  for (const k of keluhan) console.log(`  ${k}`)
  console.log(`\nGAGAL: hitungan situs berbeda dari yang diperiksa, ${keluhan.length} angka.`)
  process.exit(1)
}
console.log(`Lolos: hitungan situs sama dengan yang diperiksa Python, ${cocokSemua} angka.`)
