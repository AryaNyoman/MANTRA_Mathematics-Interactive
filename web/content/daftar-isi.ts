import type { IsiTopik } from '@/components/topik/jenis'
import PanggungGrafikFungsi from '@/components/topik/PanggungGrafikFungsi'
import PanggungLimit from '@/components/topik/PanggungLimit'
import PanggungTrigonometri from '@/components/topik/PanggungTrigonometri'
import { TAHAP as TAHAP_GRAFIK, LATIHAN as LATIHAN_GRAFIK, KUIS as KUIS_GRAFIK, KANAL as KANAL_GRAFIK } from '@/content/grafik-fungsi'
import { TAHAP as TAHAP_LIMIT, LATIHAN as LATIHAN_LIMIT, KUIS as KUIS_LIMIT, KANAL as KANAL_LIMIT } from '@/content/limit'
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
  'grafik-fungsi': {
    tahap: TAHAP_GRAFIK,
    latihan: LATIHAN_GRAFIK,
    kuis: KUIS_GRAFIK,
    kanal: KANAL_GRAFIK,
    Panggung: PanggungGrafikFungsi,
  },
  limit: {
    tahap: TAHAP_LIMIT,
    latihan: LATIHAN_LIMIT,
    kuis: KUIS_LIMIT,
    kanal: KANAL_LIMIT,
    Panggung: PanggungLimit,
  },
}
