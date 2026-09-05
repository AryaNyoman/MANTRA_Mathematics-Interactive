/**
 * Statistika, 13 tahap belajar. Topik ketiga MANTRA.
 *
 * Rancangannya: docs/superpowers/specs/2026-09-01-statistika-alur-belajar.md
 *
 * KENAPA DIPECAH TIGA BERKAS
 * Isi tiga belas tahap dalam satu berkas akan melewati seribu baris, dan berkas
 * sebesar itu sulit disunting tanpa merusak tahap lain yang tidak sedang
 * dikerjakan. Pemecahannya mengikuti rombongan yang sama seperti urutan
 * pembangunannya, jadi satu rombongan bisa dikerjakan dan diperiksa utuh.
 *
 * KENAPA URUTANNYA SEPERTI INI
 * Buku memulai dari histogram sebagai teknik menyajikan data. Di sini teknik
 * selalu datang setelah ada pertanyaan yang tidak bisa dijawab tanpanya. Tahap
 * 1 memperlihatkan masalahnya lebih dulu, yaitu dua kelompok dengan mean,
 * median, dan modus yang sama persis tetapi isinya jauh berbeda. Pola yang sama
 * sudah dipakai dan berhasil di topik Limit.
 */

import type { WidgetStatistika } from '@/content/statistika/widget'
import { TAHAP_PENYAJIAN } from '@/content/statistika/tahap-penyajian'
import { TAHAP_PEMUSATAN } from '@/content/statistika/tahap-pemusatan'
import { TAHAP_HUBUNGAN } from '@/content/statistika/tahap-hubungan'
import { TAHAP_NYATA } from '@/content/statistika/tahap-nyata'

export type { WidgetStatistika }

export const TAHAP = [
  ...TAHAP_PENYAJIAN,   // 1 sampai 4   menyajikan dan membaca data
  ...TAHAP_PEMUSATAN,   // 5 sampai 9   ukuran pemusatan dan penyebaran
  ...TAHAP_HUBUNGAN,    // 10 sampai 13 hubungan dua data, dan membaca kritis
  ...TAHAP_NYATA,       // 14 statistika di sekitar kita (galeri, tanpa alat)
]
