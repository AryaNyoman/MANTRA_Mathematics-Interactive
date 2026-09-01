'use client'

import type { ComponentType } from 'react'
import type { PropPanggung } from '@/components/topik/jenis'
import type { PropWidget } from '@/components/widget/statistika/jenis'
import type { WidgetStatistika } from '@/content/statistika/widget'

import DuaKelompok from '@/components/widget/statistika/DuaKelompok'
import BentukData from '@/components/widget/statistika/BentukData'
import LebarKelas from '@/components/widget/statistika/LebarKelas'
import FrekuensiRelatif from '@/components/widget/statistika/FrekuensiRelatif'

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

const DAFTAR: Partial<Record<WidgetStatistika, ComponentType<PropWidget>>> = {
  'dua-kelompok': DuaKelompok,
  'bentuk-data': BentukData,
  'lebar-kelas': LebarKelas,
  'frekuensi-relatif': FrekuensiRelatif,
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
