import type { IsiTopik } from '@/components/topik/jenis'
import PanggungGrafikFungsi from '@/components/topik/PanggungGrafikFungsi'
import PanggungLimit from '@/components/topik/PanggungLimit'
import PanggungStatistika from '@/components/topik/PanggungStatistika'
import PanggungRuang3D from '@/components/topik/PanggungRuang3D'
import PanggungTransformasiGeometri from '@/components/topik/PanggungTransformasiGeometri'
import PanggungTrigonometri from '@/components/topik/PanggungTrigonometri'
import PanggungTurunan from '@/components/topik/PanggungTurunan'
import PanggungIntegral from '@/components/topik/PanggungIntegral'
import PanggungVektor from '@/components/topik/PanggungVektor'
import { TAHAP as TAHAP_GRAFIK, LATIHAN as LATIHAN_GRAFIK, KUIS as KUIS_GRAFIK, KUIS_BAB as KUIS_BAB_GRAFIK, KANAL as KANAL_GRAFIK } from '@/content/grafik-fungsi'
import { TAHAP as TAHAP_LIMIT, LATIHAN as LATIHAN_LIMIT, KUIS as KUIS_LIMIT, KUIS_BAB as KUIS_BAB_LIMIT, KANAL as KANAL_LIMIT } from '@/content/limit'
import { TAHAP as TAHAP_VEKTOR, LATIHAN as LATIHAN_VEKTOR, KUIS as KUIS_VEKTOR, KUIS_BAB as KUIS_BAB_VEKTOR, KANAL as KANAL_VEKTOR } from '@/content/vektor'
import { TAHAP as TAHAP_STATISTIKA, LATIHAN as LATIHAN_STATISTIKA, KUIS as KUIS_STATISTIKA, KUIS_BAB as KUIS_BAB_STATISTIKA, KANAL as KANAL_STATISTIKA } from '@/content/statistika'
import { TAHAP as TAHAP_RUANG, LATIHAN as LATIHAN_RUANG, KUIS as KUIS_RUANG, KUIS_BAB as KUIS_BAB_RUANG, KANAL as KANAL_RUANG } from '@/content/ruang-3d'
import { TAHAP as TAHAP_TRANSFORMASI, LATIHAN as LATIHAN_TRANSFORMASI, KUIS as KUIS_TRANSFORMASI, KUIS_BAB as KUIS_BAB_TRANSFORMASI, KANAL as KANAL_TRANSFORMASI } from '@/content/transformasi-geometri'
import { TAHAP, LATIHAN, KUIS, KUIS_BAB, KANAL } from '@/content/trigonometri'
import { TAHAP as TAHAP_TURUNAN, LATIHAN as LATIHAN_TURUNAN, KUIS as KUIS_TURUNAN, KUIS_BAB as KUIS_BAB_TURUNAN, KANAL as KANAL_TURUNAN } from '@/content/turunan'
import { TAHAP as TAHAP_INTEGRAL, LATIHAN as LATIHAN_INTEGRAL, KUIS as KUIS_INTEGRAL, KUIS_BAB as KUIS_BAB_INTEGRAL, KANAL as KANAL_INTEGRAL } from '@/content/integral'

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
    kuisBab: KUIS_BAB,
    kanal: KANAL,
    Panggung: PanggungTrigonometri,
  },
  'grafik-fungsi': {
    tahap: TAHAP_GRAFIK,
    latihan: LATIHAN_GRAFIK,
    kuis: KUIS_GRAFIK,
    kuisBab: KUIS_BAB_GRAFIK,
    kanal: KANAL_GRAFIK,
    Panggung: PanggungGrafikFungsi,
  },
  limit: {
    tahap: TAHAP_LIMIT,
    latihan: LATIHAN_LIMIT,
    kuis: KUIS_LIMIT,
    kuisBab: KUIS_BAB_LIMIT,
    kanal: KANAL_LIMIT,
    Panggung: PanggungLimit,
  },
  vektor: {
    tahap: TAHAP_VEKTOR,
    latihan: LATIHAN_VEKTOR,
    kuis: KUIS_VEKTOR,
    kuisBab: KUIS_BAB_VEKTOR,
    kanal: KANAL_VEKTOR,
    Panggung: PanggungVektor,
  },
  statistika: {
    tahap: TAHAP_STATISTIKA,
    latihan: LATIHAN_STATISTIKA,
    kuis: KUIS_STATISTIKA,
    kuisBab: KUIS_BAB_STATISTIKA,
    kanal: KANAL_STATISTIKA,
    Panggung: PanggungStatistika,
  },
  'ruang-3d': {
    tahap: TAHAP_RUANG,
    latihan: LATIHAN_RUANG,
    kuis: KUIS_RUANG,
    kuisBab: KUIS_BAB_RUANG,
    kanal: KANAL_RUANG,
    Panggung: PanggungRuang3D,
  },
  'transformasi-geometri': {
    tahap: TAHAP_TRANSFORMASI,
    latihan: LATIHAN_TRANSFORMASI,
    kuis: KUIS_TRANSFORMASI,
    kuisBab: KUIS_BAB_TRANSFORMASI,
    kanal: KANAL_TRANSFORMASI,
    Panggung: PanggungTransformasiGeometri,
  },
  // Topik kedelapan dan kesembilan, kerangka MATRA-MASTER 6 Sep 2026.
  // Halamannya baru tampil setelah `siap: true` di topik.ts.
  turunan: {
    tahap: TAHAP_TURUNAN,
    latihan: LATIHAN_TURUNAN,
    kuis: KUIS_TURUNAN,
    kuisBab: KUIS_BAB_TURUNAN,
    kanal: KANAL_TURUNAN,
    Panggung: PanggungTurunan,
  },
  integral: {
    tahap: TAHAP_INTEGRAL,
    latihan: LATIHAN_INTEGRAL,
    kuis: KUIS_INTEGRAL,
    kuisBab: KUIS_BAB_INTEGRAL,
    kanal: KANAL_INTEGRAL,
    Panggung: PanggungIntegral,
  },
}
