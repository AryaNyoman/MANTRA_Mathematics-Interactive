'use client'

import { baca, tulis } from '@/lib/simpanan'

/**
 * Pemilih soal kuis: mengambil sebagian soal dari bank, dan MENGHINDARI soal
 * yang sudah pernah keluar di sesi sebelumnya.
 *
 * Kenapa bukan sekadar acak biasa (permintaan ARYA, 1 Sep 2026):
 * Acak murni dari 32 soal tetap memberi peluang seperempat bagi tiap soal
 * untuk muncul lagi di sesi berikutnya, dan siswa yang mengulang dua kali
 * hampir pasti bertemu soal yang sudah dihafal kuncinya. Dengan mencatat id
 * soal yang sudah terpakai, empat sesi pertama dijamin tidak mengulang satu
 * soal pun. Setelah bank habis, catatannya dikosongkan dan putaran dimulai
 * lagi dari awal.
 *
 * Juga sengaja BUKAN empat paket berisi 8 soal tetap: paket membuat urutan
 * soalnya ikut hafal.
 *
 * CATATAN PENTING soal pengacakan dan render server:
 * fungsi ini memakai Math.random(), jadi TIDAK boleh dipanggil saat komponen
 * dirender di server, karena hasil server dan hasil peramban akan berbeda dan
 * React menolaknya sebagai ketidakcocokan hidrasi. Aman dipakai di sini karena
 * komponen Kuis baru dipasang setelah siswa menekan tabnya, yaitu murni di
 * peramban.
 */

const KUNCI_TERPAKAI = 'matra:kuis:terpakai:'

function bacaTerpakai(topik: string): string[] {
  try {
    const mentah = baca(KUNCI_TERPAKAI + topik)
    if (!mentah) return []
    const d: unknown = JSON.parse(mentah)
    return Array.isArray(d) ? d.filter((x): x is string => typeof x === 'string') : []
  } catch {
    // Catatan rusak diperlakukan seperti belum ada: lebih baik mengulang soal
    // daripada menggagalkan kuisnya.
    return []
  }
}

function simpanTerpakai(topik: string, id: string[]): void {
  tulis(KUNCI_TERPAKAI + topik, JSON.stringify(id))
}

/** Kocok salinan daftar, tidak mengubah aslinya. Fisher-Yates. */
function kocok<T>(daftar: readonly T[]): T[] {
  const a = [...daftar]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Ambil `jumlah` soal untuk satu sesi kuis.
 *
 * Soal yang belum pernah keluar didahulukan. Kalau sisanya tidak cukup, sisa
 * itu dipakai semua lalu kekurangannya diambil dari soal lama yang dikocok
 * ulang, dan catatan terpakai dimulai lagi dari sesi ini.
 */
export function ambilSoal<T extends { id: string }>(
  bank: readonly T[],
  jumlah: number,
  topik: string,
): T[] {
  const terpakai = new Set(bacaTerpakai(topik))
  const segar = bank.filter((s) => !terpakai.has(s.id))

  let terpilih: T[]
  let catatanBaru: string[]

  if (segar.length >= jumlah) {
    terpilih = kocok(segar).slice(0, jumlah)
    catatanBaru = [...terpakai, ...terpilih.map((s) => s.id)]
  } else {
    // Bank hampir habis: pakai semua yang tersisa, sisanya dari soal lama.
    const lama = bank.filter((s) => terpakai.has(s.id))
    const tambahan = kocok(lama).slice(0, jumlah - segar.length)
    terpilih = kocok([...segar, ...tambahan])
    // Putaran baru dimulai: yang dicatat hanya soal sesi ini.
    catatanBaru = terpilih.map((s) => s.id)
  }

  simpanTerpakai(topik, catatanBaru)
  return terpilih
}

/** Berapa soal yang belum pernah keluar. Dipakai untuk keterangan di layar. */
export function sisaBelumKeluar(bank: readonly { id: string }[], topik: string): number {
  const terpakai = new Set(bacaTerpakai(topik))
  return bank.filter((s) => !terpakai.has(s.id)).length
}
