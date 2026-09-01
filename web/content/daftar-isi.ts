import type { IsiTopik } from '@/components/topik/jenis'
import PanggungTrigonometri from '@/components/topik/PanggungTrigonometri'
import { TAHAP, LATIHAN, KUIS, KANAL } from '@/content/trigonometri'

/**
 * Daftar pusat isi topik.
 *
 * Menambah topik baru cukup dilakukan di sini: tulis isinya di
 * `content/<topik>/`, buat satu komponen panggung untuk widgetnya, lalu
 * daftarkan satu baris di bawah. Rangka halaman tidak perlu disentuh.
 *
 * Topik yang belum punya isi TIDAK didaftarkan. Halaman topiknya akan
 * menampilkan kartu "Belum dibangun" yang jujur, bukan halaman kosong yang
 * terlihat rusak.
 */
export const ISI_TOPIK: Record<string, IsiTopik | undefined> = {
  trigonometri: {
    tahap: TAHAP,
    latihan: LATIHAN,
    kuis: KUIS,
    kanal: KANAL,
    Panggung: PanggungTrigonometri,
  },
}
