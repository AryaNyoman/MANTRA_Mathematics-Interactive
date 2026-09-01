/**
 * Pintu masuk kumpulan data Statistika.
 *
 * SATU SUMBER KEBENARAN
 * Angkanya tinggal di `data.json`, dan berkas JSON itu juga yang dibaca oleh
 * `alat/cek_statistik.py` (pemeriksa Python) dan `alat/cek_statistik_web.mjs`
 * (pemeriksa silang hitungan situs). Jadi tidak ada salinan kedua yang bisa
 * berbeda diam-diam. Kalau angkanya diubah, ubah di JSON, lalu jalankan kedua
 * pemeriksa itu.
 *
 * ATURAN KEJUJURAN DATA
 * Tiap kumpulan data WAJIB salah satu dari dua ini:
 * - `buatan: true`, dan halaman WAJIB menuliskannya sebagai data buatan, atau
 * - `sumber`, berisi penerbit dan halamannya, yang juga ditulis di halaman.
 * Data karangan yang disajikan seolah data sungguhan dilarang di topik ini.
 * `keterangan()` di bawah yang menyediakan kalimatnya, supaya tidak ada halaman
 * yang lupa mencantumkannya.
 */

import mentah from '@/content/statistika/data.json'
import type { Kelas } from '@/components/widget/statistika/statistik'

type Dasar = {
  id: string
  judul: string
  buatan?: boolean
  sumber?: string
  satuan?: string
}

export type ButirTunggal = Dasar & { jenis: 'tunggal'; data: number[] }
export type ButirKategori = Dasar & {
  jenis: 'kategori'
  kategori: Array<{ nama: string; f: number }>
}
export type ButirKelompok = Dasar & { jenis: 'kelompok'; kelas: Kelas[] }
export type ButirBivariat = Dasar & {
  jenis: 'bivariat'
  satuanX?: string
  satuanY?: string
  pasangan: Array<[number, number]>
}

export type Butir = ButirTunggal | ButirKategori | ButirKelompok | ButirBivariat

/*
 * Sekali ini saja bentuknya dipaksa. TypeScript membaca JSON sebagai bentuk
 * yang sangat longgar (semua `number[]`, semua bidang pilihan digabung), dan
 * memaksanya di SATU tempat lebih aman daripada menaburkan pemaksaan di tiap
 * widget. Yang menjaga isinya tetap benar bukan tipe, melainkan kedua pemeriksa
 * angka yang membaca berkas yang sama.
 */
const SEMUA = mentah as unknown as Butir[]

function ambil(id: string): Butir {
  const b = SEMUA.find((x) => x.id === id)
  if (!b) {
    throw new Error(
      `Kumpulan data "${id}" tidak ada di content/statistika/data.json. ` +
      'Periksa ejaannya, jangan menambal dengan angka yang diketik langsung.',
    )
  }
  return b
}

function pastikan<T extends Butir>(id: string, jenis: T['jenis']): T {
  const b = ambil(id)
  if (b.jenis !== jenis) {
    throw new Error(`Kumpulan data "${id}" berjenis ${b.jenis}, diminta sebagai ${jenis}.`)
  }
  return b as T
}

export const tunggal = (id: string) => pastikan<ButirTunggal>(id, 'tunggal')
export const kategori = (id: string) => pastikan<ButirKategori>(id, 'kategori')
export const kelompok = (id: string) => pastikan<ButirKelompok>(id, 'kelompok')
export const bivariat = (id: string) => pastikan<ButirBivariat>(id, 'bivariat')

/**
 * Kalimat asal-usul data, untuk ditulis di bawah gambarnya.
 *
 * Ini bukan hiasan. Aturan topik: data buatan harus mengaku buatan, dan data
 * nyata harus menyebut sumbernya. Satu fungsi supaya tidak ada halaman yang
 * kelupaan.
 */
export function keterangan(b: Butir): string {
  if (b.sumber) return `Sumber data: ${b.sumber}`
  if (b.buatan) return 'Angka ini dibuat untuk latihan, bukan data sungguhan.'
  return 'Asal data belum dicantumkan. Ini kesalahan, jangan ditampilkan begini.'
}
