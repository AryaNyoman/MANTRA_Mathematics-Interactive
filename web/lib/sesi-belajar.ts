/**
 * Penghubung kecil antara nav dan halaman belajar.
 *
 * Di rancangan MANTRA v2 nav ikut mengurus halaman belajar: ada tombol
 * "Mode fokus" yang menyembunyikan nav itu sendiri beserta daftar materi,
 * dan di HP ada pil "Materi 03" yang membuka laci daftar materi. Nomor
 * materinya sendiri hanya diketahui oleh `HalamanTopik`.
 *
 * Di prototipe rancangan semuanya satu komponen, jadi bisa berbagi state
 * begitu saja. Di kode nyata `Nav` dan `HalamanTopik` adalah dua komponen
 * bersaudara yang dipasang oleh halaman, tanpa induk bersama yang berupa
 * komponen klien. Menaikkan state ke `layout.tsx` berarti mengubah seluruh
 * kerangka jadi komponen klien, dan itu harga yang terlalu mahal untuk dua
 * tombol.
 *
 * Jadi: satu simpanan mungil di luar React, dibaca lewat
 * `useSyncExternalStore`. Tanpa pustaka tambahan, tanpa penyedia konteks,
 * dan komponen yang tidak memakainya tidak ikut dirender ulang.
 *
 * Tidak disimpan ke localStorage: mode fokus dan laci adalah keadaan
 * sesaat, bukan kemajuan belajar.
 */

import { useSyncExternalStore } from 'react'

export type SesiBelajar = {
  /** Sedang berada di halaman belajar. Nav memakai ini untuk mengganti isinya. */
  aktif: boolean
  /** Mode fokus menyala: nav dan daftar materi disembunyikan. */
  fokus: boolean
  /** Laci daftar materi (HP) terbuka. */
  laci: boolean
  /** Nomor materi yang sedang dibuka, dua digit, untuk pil di nav HP. */
  no: string
  /** Label pendek untuk nav, misalnya "Trigonometri, Materi 03". */
  judul: string
  /** Label panjang untuk atribut `title`. */
  judulPanjang: string
  /** Alamat tombol Lanjutkan di nav. */
  lanjut: string
}

const AWAL: SesiBelajar = {
  aktif: false,
  fokus: false,
  laci: false,
  no: '01',
  judul: '',
  judulPanjang: '',
  lanjut: '/peta-materi',
}

let keadaan: SesiBelajar = AWAL
const pendengar = new Set<() => void>()

function siarkan() {
  for (const p of pendengar) p()
}

export function aturSesi(sebagian: Partial<SesiBelajar>) {
  // Bandingkan dulu: `HalamanTopik` memanggil ini dari effect tiap render,
  // dan menyiarkan perubahan yang tidak mengubah apa pun akan membuat nav
  // dirender ulang tanpa henti.
  let berubah = false
  for (const k of Object.keys(sebagian) as (keyof SesiBelajar)[]) {
    if (sebagian[k] !== undefined && keadaan[k] !== sebagian[k]) berubah = true
  }
  if (!berubah) return
  keadaan = { ...keadaan, ...sebagian }
  siarkan()
}

/** Dipanggil saat halaman belajar dilepas, supaya nav kembali normal. */
export function lepasSesi() {
  aturSesi(AWAL)
}

function langgan(ubah: () => void) {
  pendengar.add(ubah)
  return () => {
    pendengar.delete(ubah)
  }
}

const baca = () => keadaan
// Di server keadaannya selalu awal. Objeknya HARUS objek yang sama tiap
// panggilan, bukan salinan baru, kalau tidak React menganggapnya berubah
// terus saat merakit halaman.
const bacaServer = () => AWAL

export function useSesiBelajar(): SesiBelajar {
  return useSyncExternalStore(langgan, baca, bacaServer)
}
