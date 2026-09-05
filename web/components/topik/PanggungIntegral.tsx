'use client'

import { useState, type ReactNode } from 'react'
import Rintisan from '@/components/widget/integral/Rintisan'
import type { PropPanggung } from '@/components/topik/jenis'
import { Angka, Kembalikan, Petunjuk, Pilihan } from '@/components/kendali'

/**
 * Panggung Integral: penyetelan kesepuluh widgetnya, dan tidak lebih.
 *
 * KERANGKA dari MATRA-MASTER (6 Sep 2026), pola sama dengan PanggungTurunan
 * (baca komentar kepala berkas itu). Widget 05 (`persegi-panjang-menumpuk`)
 * dipasangi kendalinya sebagai contoh, sebab ia memakai `Angka` DAN `Pilihan`.
 *
 * Rancangan tiap widget: docs/superpowers/specs/2026-09-06-integral-alur-belajar.md
 */

/** Batas kendali widget 05; pindahkan ke komponen widgetnya saat dibuat. */
const BATAS_N = { min: 1, maks: 60, langkah: 1 }
const TITIK_SAMPEL = [
  { nilai: 'kiri', label: 'kiri' },
  { nilai: 'kanan', label: 'kanan' },
  { nilai: 'tengah', label: 'tengah' },
]
const AWAL = { n: 4, sampel: 'kiri' }

export default function PanggungIntegral({ tahap, tampilWidget, children }: PropPanggung) {
  // Materi 05: jumlahan Riemann
  const [n, setN] = useState(AWAL.n)
  const [sampel, setSampel] = useState(AWAL.sampel)

  let kiri: ReactNode = null
  let kanan: ReactNode = null
  let tanda = 'BACAAN'

  if (tahap) {
    if (tahap.widget === 'dunia-nyata-integral') tanda = 'CONTOH NYATA'
    else if (tahap.widget) tanda = 'INTERAKTIF'

    kiri = (
      <>
        {tampilWidget && tahap.widget === 'persegi-panjang-menumpuk' && (
          <>
            <div className="layar">
              <Rintisan nama="persegi-panjang-menumpuk" keterangan={`n = ${n}, titik sampel ${sampel}: persegi panjang di bawah kurva`} />
            </div>
            <div className="kendali">
              <Angka nama="Banyak bagian n" arti="selang [a, b] dibagi jadi n persegi panjang" kunci="n"
                nilai={n} onUbah={setN} min={BATAS_N.min} max={BATAS_N.maks} langkah={BATAS_N.langkah} />
              <Pilihan nama="Titik sampel" arti="tinggi persegi panjang diambil dari ujung mana"
                pilihan={TITIK_SAMPEL} nilai={sampel} onPilih={setSampel} />
              <Kembalikan onClick={() => { setN(AWAL.n); setSampel(AWAL.sampel) }} />
              <Petunjuk>
                naikkan n dari 4 ke 60, dan lihat selisih ke luas sebenarnya menyusut.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget && tahap.widget !== 'persegi-panjang-menumpuk' && tahap.widget !== 'dunia-nyata-integral' && (
          <>
            <div className="layar">
              <Rintisan nama={tahap.widget} keterangan="lihat rancangan Materi ini di spesifikasi Integral" />
            </div>
            <div className="kendali">
              <Petunjuk>widget ini belum dibuat; kendalinya menyusul bersama widgetnya.</Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'dunia-nyata-integral' && (
          <div className="isi-gulir">
            <Rintisan nama="dunia-nyata-integral" keterangan="galeri empat kartu: penjualan, jarak, pegas, penghematan" />
          </div>
        )}
      </>
    )

    kanan = null
  }

  return <>{children({ kiri, kanan, tanda })}</>
}
