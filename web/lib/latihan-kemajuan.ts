'use client'

import { baca, tulis } from '@/lib/simpanan'
import type { TingkatKuis } from '@/content/trigonometri'

/**
 * Kemajuan latihan: soal mana yang sudah pernah dijawab BENAR, dan lencana
 * apa saja yang sudah didapat.
 *
 * Rancangan ini menuruti permintaan ARYA 1 Sep 2026 ("progress game, ada
 * achievement, bar persentase"), dengan satu rem yang sengaja dipasang:
 * lencananya sedikit dan semuanya menandai pemahaman, bukan sekadar rajin
 * membuka halaman. Lencana yang dibagikan terlalu murah justru membuat siswa
 * mengejar lencana dan berhenti membaca.
 *
 * YANG DICATAT hanya id soal yang pernah BENAR. Salah tidak dihukum dan tidak
 * disimpan: siswa boleh mengulang soal yang sama sampai paham tanpa merasa
 * nilainya tercoreng permanen.
 *
 * INI BUKAN PENILAIAN YANG SAH. Semuanya tersimpan di peramban siswa sendiri
 * dan bisa dihapus siapa pun. Hilang kalau ganti perangkat atau membersihkan
 * riwayat. Halaman latihannya menyebutkan ini terang-terangan supaya tidak ada
 * yang mengira angkanya bisa dipakai sebagai nilai rapor.
 */

const KUNCI = 'matra:latihan:'

export const URUT_TINGKAT: TingkatKuis[] = ['mudah', 'sedang', 'sulit', 'sangat sulit']

/** Berapa soal harus benar di satu tingkat sebelum tingkat berikutnya terbuka. */
export const SYARAT_NAIK = 4

export type KemajuanLatihan = {
  /** id soal yang pernah dijawab benar */
  benar: string[]
  /** total percobaan menjawab, dipakai lencana "tekun" */
  dicoba: number
  /** id lencana yang sudah diraih */
  lencana: string[]
}

const KOSONG: KemajuanLatihan = { benar: [], dicoba: 0, lencana: [] }

export function bacaLatihan(topik: string): KemajuanLatihan {
  try {
    const mentah = baca(KUNCI + topik)
    if (!mentah) return KOSONG
    const d = JSON.parse(mentah) as Partial<KemajuanLatihan>
    return {
      benar: Array.isArray(d.benar) ? d.benar.filter((x): x is string => typeof x === 'string') : [],
      dicoba: typeof d.dicoba === 'number' && Number.isFinite(d.dicoba) ? d.dicoba : 0,
      lencana: Array.isArray(d.lencana) ? d.lencana.filter((x): x is string => typeof x === 'string') : [],
    }
  } catch {
    return KOSONG
  }
}

function simpan(topik: string, k: KemajuanLatihan): void {
  tulis(KUNCI + topik, JSON.stringify(k))
}

/** Catat satu jawaban. `id` hanya masuk daftar benar kalau memang benar. */
export function catatJawaban(topik: string, id: string, tepat: boolean): void {
  const k = bacaLatihan(topik)
  const benar = tepat && !k.benar.includes(id) ? [...k.benar, id] : k.benar
  simpan(topik, { ...k, benar, dicoba: k.dicoba + 1 })
}

// ---------------------------------------------------------------- kemajuan

export type RingkasTingkat = {
  tingkat: TingkatKuis
  total: number
  selesai: number
  persen: number
  terbuka: boolean
}

/** Ringkasan per tingkat: berapa soal, berapa yang sudah benar, terbuka atau belum. */
export function ringkasPerTingkat(
  bank: readonly { id: string; tingkat: TingkatKuis }[],
  k: KemajuanLatihan,
): RingkasTingkat[] {
  const sudah = new Set(k.benar)
  let bolehBuka = true

  return URUT_TINGKAT.map((tingkat) => {
    const soal = bank.filter((s) => s.tingkat === tingkat)
    const selesai = soal.filter((s) => sudah.has(s.id)).length
    const baris: RingkasTingkat = {
      tingkat,
      total: soal.length,
      selesai,
      persen: soal.length === 0 ? 0 : Math.round((selesai / soal.length) * 100),
      terbuka: bolehBuka,
    }
    // Tingkat berikutnya terbuka kalau tingkat ini sudah cukup dikuasai.
    bolehBuka = bolehBuka && selesai >= Math.min(SYARAT_NAIK, soal.length)
    return baris
  })
}

/** Persentase seluruh topik. */
export function persenTopik(bank: readonly { id: string }[], k: KemajuanLatihan): number {
  if (bank.length === 0) return 0
  const sudah = new Set(k.benar)
  return Math.round((bank.filter((s) => sudah.has(s.id)).length / bank.length) * 100)
}

// ----------------------------------------------------------------- lencana

export type Lencana = {
  id: string
  nama: string
  syarat: string
  ikon: string
}

/**
 * Tujuh lencana. Semuanya menandai pemahaman yang bertambah, bukan waktu yang
 * dihabiskan. Tidak ada lencana untuk sekadar membuka halaman.
 */
export const LENCANA: Lencana[] = [
  { id: 'mulai', nama: 'Langkah pertama', syarat: 'Menjawab satu soal dengan benar', ikon: '🌱' },
  { id: 'sepuluh', nama: 'Sepuluh benar', syarat: 'Sepuluh soal berbeda dijawab benar', ikon: '📗' },
  { id: 'naik', nama: 'Naik tingkat', syarat: 'Membuka tingkat sulit', ikon: '🪜' },
  { id: 'tekun', nama: 'Tekun', syarat: 'Lima puluh kali mencoba menjawab', ikon: '🔁' },
  { id: 'mudah-tuntas', nama: 'Dasar kokoh', syarat: 'Seluruh soal tingkat mudah benar', ikon: '🧱' },
  { id: 'puncak', nama: 'Menaklukkan yang tersulit', syarat: 'Satu soal tingkat sangat sulit benar', ikon: '⛰️' },
  { id: 'tuntas', nama: 'Tuntas', syarat: 'Seluruh soal topik ini pernah benar', ikon: '🏆' },
]

/** Hitung lencana yang seharusnya dimiliki, berdasarkan keadaan sekarang. */
export function hitungLencana(
  bank: readonly { id: string; tingkat: TingkatKuis }[],
  k: KemajuanLatihan,
): string[] {
  const sudah = new Set(k.benar)
  const ringkas = ringkasPerTingkat(bank, k)
  const cari = (t: TingkatKuis) => ringkas.find((r) => r.tingkat === t)

  const raih: string[] = []
  if (k.benar.length >= 1) raih.push('mulai')
  if (k.benar.length >= 10) raih.push('sepuluh')
  if (cari('sulit')?.terbuka) raih.push('naik')
  if (k.dicoba >= 50) raih.push('tekun')

  const mudah = cari('mudah')
  if (mudah && mudah.total > 0 && mudah.selesai === mudah.total) raih.push('mudah-tuntas')

  if (bank.some((s) => s.tingkat === 'sangat sulit' && sudah.has(s.id))) raih.push('puncak')
  if (bank.length > 0 && k.benar.length >= bank.length) raih.push('tuntas')

  return raih
}

/**
 * Perbarui daftar lencana yang tersimpan, kembalikan lencana yang BARU diraih
 * supaya bisa diumumkan ke siswa.
 */
export function segarkanLencana(
  topik: string,
  bank: readonly { id: string; tingkat: TingkatKuis }[],
): string[] {
  const k = bacaLatihan(topik)
  const seharusnya = hitungLencana(bank, k)
  const baru = seharusnya.filter((id) => !k.lencana.includes(id))
  if (baru.length > 0) simpan(topik, { ...k, lencana: seharusnya })
  return baru
}
