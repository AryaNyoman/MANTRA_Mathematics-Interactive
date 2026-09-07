'use client'

import { useState, type ReactNode } from 'react'
import Rintisan from '@/components/widget/turunan/Rintisan'
import type { PropPanggung } from '@/components/topik/jenis'
import { Angka, Kembalikan, Petunjuk } from '@/components/kendali'

/**
 * Panggung Turunan: penyetelan kesebelas widgetnya, dan tidak lebih.
 *
 * KERANGKA dari MATRA-MASTER (6 Sep 2026). Bentuknya meniru PanggungLimit:
 * keadaan tiap widget dipegang DI SINI supaya tidak hilang saat pindah
 * materi, komponen widget di `components/widget/turunan/` hanya menggambar.
 *
 * Widget pertama (`garis-potong`) sudah dipasangi kendalinya sebagai contoh
 * pola yang harus diikuti sepuluh widget lainnya:
 *   - `Angka` dengan `kunci` unik: nama + arti, bisa diketik dan digeser,
 *     batasnya dari konstanta BATAS_* yang diekspor komponen widgetnya;
 *   - `Kembalikan` mengembalikan SEMUA keadaan widget itu ke nilai awal;
 *   - `Petunjuk` satu kalimat, ajakan mencoba yang spesifik;
 *   - jendela gambar TETAP (tidak melar saat diseret), seretan ditahan di
 *     kotak batas, bagian gambar yang kuncinya dipegang diberi kelas `nyala`.
 * Contoh nyata yang harus ditiru: `widget/vektor/PanahBerpindah.tsx` dan
 * `PanggungVektor.tsx` (seret + ketik + kembalikan), `widget/limit/*` (papan
 * fungsi), `widget/statistika/TitikPegang.tsx` (sasaran sentuh besar).
 *
 * Rancangan tiap widget (apa yang diseret, batasnya, apa yang menyala):
 * docs/superpowers/specs/2026-09-06-turunan-alur-belajar.md
 */

/** Batas kendali widget 01; pindahkan ke komponen widgetnya saat dibuat. */
const BATAS_X1 = { min: 0, maks: 5, langkah: 0.5 }
const BATAS_H = { min: 0.5, maks: 4, langkah: 0.5 }
const AWAL = { x1: 1, h: 2 }

export default function PanggungTurunan({ tahap, tampilWidget, children }: PropPanggung) {
  // Materi 01: garis potong
  const [x1, setX1] = useState(AWAL.x1)
  const [h, setH] = useState(AWAL.h)

  let kiri: ReactNode = null
  let kanan: ReactNode = null
  let tanda = 'BACAAN'

  if (tahap) {
    if (tahap.widget === 'dunia-nyata-turunan') tanda = 'CONTOH NYATA'
    else if (tahap.widget) tanda = 'INTERAKTIF'

    kiri = (
      <>
        {tampilWidget && tahap.widget === 'garis-potong' && (
          <>
            <div className="layar">
              <Rintisan nama="garis-potong" keterangan={`x₁ = ${x1}, h = ${h}: kurva produksi, titik P dan Q, segitiga Δx dan Δy`} />
            </div>
            <div className="kendali">
              <Angka nama="Jam awal x₁" arti="titik P, jam mulai mengukur" kunci="x1" satuan=" jam"
                nilai={x1} onUbah={setX1} min={BATAS_X1.min} max={BATAS_X1.maks} langkah={BATAS_X1.langkah} />
              <Angka nama="Selang waktu h" arti="jarak Q dari P; makin kecil makin dekat" kunci="h" satuan=" jam"
                nilai={h} onUbah={setH} min={BATAS_H.min} max={BATAS_H.maks} langkah={BATAS_H.langkah} />
              <Kembalikan onClick={() => { setX1(AWAL.x1); setH(AWAL.h) }} />
              <Petunjuk>
                geser h makin kecil, dan perhatikan kemiringannya berhenti berubah banyak.
              </Petunjuk>
            </div>
          </>
        )}

        {/* Widget 02 sampai 11: ganti Rintisan dengan komponen sungguhan,
            satu blok per widget, pola persis seperti di atas. */}
        {tampilWidget && tahap.widget && tahap.widget !== 'garis-potong' && tahap.widget !== 'dunia-nyata-turunan' && (
          <>
            <div className="layar">
              <Rintisan nama={tahap.widget} keterangan="lihat rancangan Materi ini di spesifikasi Turunan" />
            </div>
            <div className="kendali">
              <Petunjuk>widget ini belum dibuat; kendalinya menyusul bersama widgetnya.</Petunjuk>
            </div>
          </>
        )}

        {/* Materi 12: galeri tidak interaktif, pola widget/limit/DuniaNyataLimit.tsx */}
        {tampilWidget && tahap.widget === 'dunia-nyata-turunan' && (
          <div className="isi-gulir">
            <Rintisan nama="dunia-nyata-turunan" keterangan="galeri empat kartu: kecepatan, pertumbuhan, kotak, biaya marginal" />
          </div>
        )}
      </>
    )

    // Tabel angka hidup untuk kolom kanan; diisi per widget saat dibuat.
    kanan = null
  }

  return <>{children({ kiri, kanan, tanda })}</>
}
