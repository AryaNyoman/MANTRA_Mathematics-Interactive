'use client'

import { useState, type ReactNode } from 'react'
import KubusPutar, { SUDUT_MULAI } from '@/components/widget/ruang-3d/KubusPutar'
import {
  BATAS_MENUNDUK, bulat, jepitMenunduk, type Sudut,
} from '@/components/widget/ruang-3d/ruang'
import type { PropPanggung } from '@/components/topik/jenis'

/**
 * Panggung Ruang Tiga Dimensi: penyetelan widgetnya, dan tidak lebih.
 *
 * Bentuknya meniru PanggungLimit. Sudut pandang kubus dipegang di sini, bukan di
 * dalam widget, sebab dua tempat memakainya sekaligus: gambar di kolom kiri dan
 * angka hidup di kolom kanan. Itu memang alasan panggung dibuat membungkus tata
 * letak, lihat penjelasan di `components/topik/jenis.ts`.
 *
 * Penggeser di bawah gambar BUKAN hiasan. Menarik gambar langsung memang cara
 * utamanya, tetapi tarikan tidak bisa dipakai lewat papan ketik. Penggeser
 * membuat widget ini tetap terpakai tanpa tetikus.
 */
export default function PanggungRuang3D({ tahap, tampilWidget, children }: PropPanggung) {
  const [sudut, setSudut] = useState<Sudut>(SUDUT_MULAI)

  let kiri: ReactNode = null
  let kanan: ReactNode = null
  let tanda = 'BACAAN'

  if (tahap) {
    if (tahap.widget) tanda = 'INTERAKTIF'

    kiri = (
      <>
        {tampilWidget && tahap.widget === 'kubus-putar' && (
          <>
            <div className="layar">
              <KubusPutar sudut={sudut} onUbah={setSudut} />
            </div>
            <div className="kendali">
              <div>
                <label htmlFor="mendatar">
                  <span>Putar mengelilingi</span>
                  <span className="mono">{bulat(sudut.mendatar, 0)}°</span>
                </label>
                <input
                  id="mendatar" type="range" min={-180} max={180} step={1}
                  value={Math.round(sudut.mendatar)}
                  onChange={(e) => setSudut((s) => ({ ...s, mendatar: +e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="menunduk">
                  <span>Tinggi mata</span>
                  <span className="mono">{bulat(sudut.menunduk, 0)}°</span>
                </label>
                <input
                  id="menunduk" type="range"
                  min={BATAS_MENUNDUK.min} max={BATAS_MENUNDUK.maks} step={1}
                  value={Math.round(sudut.menunduk)}
                  onChange={(e) =>
                    setSudut((s) => ({ ...s, menunduk: jepitMenunduk(+e.target.value) }))
                  }
                />
              </div>
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>tarik langsung gambarnya, atau pakai kedua penggeser di atas</span>
              </div>
              <button
                type="button"
                className="tombol garis"
                style={{ gridColumn: '1 / -1' }}
                onClick={() => setSudut(SUDUT_MULAI)}
              >
                KEMBALIKAN TAMPILAN AWAL
              </button>
            </div>
          </>
        )}
      </>
    )

    if (tampilWidget && tahap.widget === 'kubus-putar') {
      kanan = (
        <div className="blok">
          <div className="cap">Angka dari alat di sebelah kiri</div>
          <table className="tabel-angka">
            <tbody>
              <tr><td>sudut putar</td><td>{bulat(sudut.mendatar, 0)}°</td></tr>
              <tr><td>tinggi mata</td><td>{bulat(sudut.menunduk, 0)}°</td></tr>
              <tr><td>rusuk kubus</td><td>6 satuan</td></tr>
              <tr className="tegas"><td>kedudukan BD dan EG</td><td>bersilangan</td></tr>
              <tr className="tegas"><td>jarak BD ke EG</td><td>6 satuan</td></tr>
            </tbody>
          </table>
          <div className="catatan">
            Kedua angka terakhir tidak pernah berubah berapa pun kubusnya diputar.
            Yang berubah cuma tampilannya di layar.
          </div>
        </div>
      )
    }
  }

  return <>{children({ kiri, kanan, tanda })}</>
}
