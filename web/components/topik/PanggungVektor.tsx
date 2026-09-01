'use client'

import { useState, type ReactNode } from 'react'
import PecahKomponen, { BATAS } from '@/components/widget/vektor/PecahKomponen'
import { angka, panjang, sudutDerajat, type Vek } from '@/components/widget/vektor/geometri'
import type { PropPanggung } from '@/components/topik/jenis'

/**
 * Panggung Vektor: penyetelan widgetnya, dan tidak lebih.
 *
 * Bentuknya meniru PanggungLimit dan PanggungTrigonometri. Rangka halaman tidak
 * tahu apa-apa soal isi topik ini, dan sebaliknya berkas ini tidak tahu apa-apa
 * soal tab, kunci kuis, atau penghitung waktu membaca.
 *
 * Keadaan tiap widget dipegang di sini, bukan di dalam widgetnya, supaya tidak
 * hilang saat siswa berpindah materi lalu kembali lagi.
 */
export default function PanggungVektor({ tahap, tampilWidget, children }: PropPanggung) {
  const [vKomponen, setVKomponen] = useState<Vek>({ x: 4, y: 3 })

  let kiri: ReactNode = null
  let kanan: ReactNode = null
  let tanda = 'BACAAN'

  if (tahap) {
    if (tahap.widget === 'dunia-nyata-vektor') tanda = 'CONTOH NYATA'
    else if (tahap.widget) tanda = 'INTERAKTIF'

    kiri = (
      <>
        {tampilWidget && tahap.widget === 'pecah-komponen' && (
          <>
            <div className="layar">
              <PecahKomponen v={vKomponen} onUbah={setVKomponen} />
            </div>
            <div className="kendali">
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  tarik ujung panah hitamnya. Batasnya {BATAS.x} ke samping dan {BATAS.y} ke atas,
                  supaya gambarnya tidak pernah terpotong
                </span>
              </div>
            </div>
          </>
        )}
      </>
    )

    kanan = (
      <>
        {tampilWidget && tahap.widget === 'pecah-komponen' && (
          <div className="blok">
            <div className="cap">Angka dari alat di sebelah kiri</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>komponen mendatar</td><td>{angka(vKomponen.x, 1)}</td></tr>
                <tr><td>komponen tegak</td><td>{angka(vKomponen.y, 1)}</td></tr>
                <tr><td>arah dari sumbu mendatar</td><td>{angka(sudutDerajat(vKomponen), 1)}°</td></tr>
                <tr className="tegas"><td>panjang panah</td><td>{angka(panjang(vKomponen), 3)}</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Panjangnya berasal dari Pythagoras: akar dari {angka(vKomponen.x, 1)} kuadrat ditambah{' '}
              {angka(vKomponen.y, 1)} kuadrat. Perhitungan itu dibahas tuntas di Materi 04.
            </div>
          </div>
        )}
      </>
    )
  }

  return <>{children({ kiri, kanan, tanda })}</>
}
