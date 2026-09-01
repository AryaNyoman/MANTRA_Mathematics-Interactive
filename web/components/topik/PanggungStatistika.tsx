'use client'

import type { ComponentType } from 'react'
import type { PropPanggung } from '@/components/topik/jenis'
import type { PropWidget } from '@/components/widget/statistika/jenis'
import type { WidgetStatistika } from '@/content/statistika/widget'

import DuaKelompok from '@/components/widget/statistika/DuaKelompok'
import BentukData from '@/components/widget/statistika/BentukData'
import LebarKelas from '@/components/widget/statistika/LebarKelas'
import FrekuensiRelatif from '@/components/widget/statistika/FrekuensiRelatif'
import TigaUkuran from '@/components/widget/statistika/TigaUkuran'
import TarikPencilan from '@/components/widget/statistika/TarikPencilan'
import KotakGaris from '@/components/widget/statistika/KotakGaris'
import JarakKeRata from '@/components/widget/statistika/JarakKeRata'
import DataKelompok from '@/components/widget/statistika/DataKelompok'
import DiagramPencar from '@/components/widget/statistika/DiagramPencar'
import GarisRegresi from '@/components/widget/statistika/GarisRegresi'
import KekuatanHubungan from '@/components/widget/statistika/KekuatanHubungan'
import SumbuJujur from '@/components/widget/statistika/SumbuJujur'

/**
 * Panggung Statistika: memilih widget mana yang dipasang, dan tidak lebih.
 *
 * Berbeda dengan panggung Trigonometri dan Limit yang memegang keadaan seluruh
 * widgetnya sendiri, di sini tiap widget memegang keadaannya masing-masing lalu
 * menyerahkan dua potongan jadi lewat `children`. Alasannya ditulis lengkap di
 * `components/widget/statistika/jenis.ts`. Singkatnya: topik ini punya tiga
 * belas widget dan sebagian memegang seluruh kumpulan data yang bisa diseret,
 * jadi menumpuknya di satu berkas akan melahirkan berkas terbesar di situs ini.
 */

/*
 * Ketiga belas widget sudah ada, jadi Record dipakai penuh tanpa Partial.
 * Akibatnya TypeScript akan MENOLAK kalau ada nama widget yang dipakai di isi
 * tahap tetapi lupa didaftarkan di sini, dan itu memang yang diinginkan:
 * panggung yang diam tanpa pesan adalah cacat yang paling sulit dilacak.
 */
const DAFTAR: Record<WidgetStatistika, ComponentType<PropWidget>> = {
  'dua-kelompok': DuaKelompok,
  'bentuk-data': BentukData,
  'lebar-kelas': LebarKelas,
  'frekuensi-relatif': FrekuensiRelatif,
  'tiga-ukuran': TigaUkuran,
  'tarik-pencilan': TarikPencilan,
  'kotak-garis': KotakGaris,
  'jarak-ke-rata': JarakKeRata,
  'data-kelompok': DataKelompok,
  'diagram-pencar': DiagramPencar,
  'garis-regresi': GarisRegresi,
  'kekuatan-hubungan': KekuatanHubungan,
  'sumbu-jujur': SumbuJujur,
}

export default function PanggungStatistika({ tahap, tampilWidget, children }: PropPanggung) {
  const nama = tahap?.widget as WidgetStatistika | undefined
  const Widget = nama ? DAFTAR[nama] : undefined
  const tanda = nama ? 'INTERAKTIF' : 'BACAAN'

  if (!tampilWidget || !Widget) {
    return <>{children({ kiri: null, kanan: null, tanda })}</>
  }
  return <Widget>{(isi) => children({ ...isi, tanda })}</Widget>
}
