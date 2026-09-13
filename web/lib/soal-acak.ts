'use client'

import { baca, tulisDiam } from '@/lib/simpanan'
import { bacaLatihan } from '@/lib/latihan-kemajuan'

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
  tulisDiam(KUNCI_TERPAKAI + topik, JSON.stringify(id))
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
 * TIGA LAPIS PRIORITAS, dari yang paling diutamakan:
 *
 *   1. belum pernah keluar di kuis DAN belum pernah dijawab benar di bank soal
 *   2. belum pernah keluar di kuis, tetapi sudah pernah benar di bank soal
 *   3. sudah pernah keluar di kuis
 *
 * Lapis pertama ditambahkan 5 Sep 2026 atas keputusan ARYA. Sebabnya: menu
 * Latihan dan kuis bab mengambil dari kumpulan soal yang SAMA, sehingga siswa
 * yang rajin mengerjakan bank soal justru bertemu soal yang sudah dihafalnya
 * saat mengerjakan kuis. Sekarang kuis mendahulukan soal yang benar-benar
 * baru baginya.
 *
 * MENDAHULUKAN, bukan membuang. Kalau soal yang belum tersentuh tinggal tiga
 * sedangkan satu sesi butuh delapan, kuisnya tetap berisi delapan soal:
 * kekurangannya diambil dari lapis berikutnya. Membuang akan membuat kuis
 * mengecil diam-diam, dan kuis empat soal yang mengaku delapan lebih buruk
 * daripada satu dua soal yang berulang.
 */
export function ambilSoal<T extends { id: string }>(
  bank: readonly T[],
  jumlah: number,
  topik: string,
): T[] {
  const terpakai = new Set(bacaTerpakai(topik))
  // Soal yang pernah dijawab BENAR di bank soal menu Latihan.
  const sudahDikuasai = new Set(bacaLatihan(topik).benar)

  const segar = bank.filter((s) => !terpakai.has(s.id))
  // Lapis 1 lebih dulu, lapis 2 menyusul. Masing-masing dikocok sendiri
  // supaya urutannya tetap tidak bisa dihafal.
  const antre = [
    ...kocok(segar.filter((s) => !sudahDikuasai.has(s.id))),
    ...kocok(segar.filter((s) => sudahDikuasai.has(s.id))),
  ]

  let terpilih: T[]
  let catatanBaru: string[]

  if (antre.length >= jumlah) {
    // Dikocok sekali lagi supaya soal yang benar-benar baru tidak selalu
    // muncul di nomor-nomor awal.
    terpilih = kocok(antre.slice(0, jumlah))
    catatanBaru = [...terpakai, ...terpilih.map((s) => s.id)]
  } else {
    // Bank hampir habis: pakai semua yang tersisa, sisanya dari soal lama.
    const lama = bank.filter((s) => terpakai.has(s.id))
    const tambahan = kocok(lama).slice(0, jumlah - antre.length)
    terpilih = kocok([...antre, ...tambahan])
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
