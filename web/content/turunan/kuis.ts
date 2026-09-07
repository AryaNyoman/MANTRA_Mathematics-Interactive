/**
 * Bank soal kuis Turunan: 32 soal, delapan untuk tiap tingkat. RINTISAN.
 *
 * Bentuknya mengikuti bank soal Limit: tiap sesi mengambil 8 soal dan
 * menghindari soal yang sudah pernah keluar. Tingkat kesulitan dikalibrasi ke
 * buku Tingkat Lanjut Kelas XII Bab 2. Soal salinan wajib bersumber; soal
 * tanpa keterangan berarti tulisan sendiri.
 *
 * Seluruh jawaban numerik WAJIB diperiksa mesin:
 * `python alat/cek_soal.py alat/soal-kuis-turunan.json` (sympy).
 */

import type { SoalKuis } from '@/content/tipe'

export const KUIS: SoalKuis[] = []
