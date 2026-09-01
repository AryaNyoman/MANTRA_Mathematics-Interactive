'use client'

import Bidang from '@/components/widget/limit/Bidang'
import { KOTAK, MONO, WARNA, angka, keLayar, type Jendela } from '@/components/widget/limit/koordinat'

/**
 * Widget "Lubang di Grafik", Limit tahap 4.
 *
 * Menggambar f(x) = (x² - 1) : (x - 1), yang untuk setiap x bukan 1 sama dengan
 * garis y = x + 1, tetapi di x = 1 tidak terdefinisi sama sekali.
 *
 * Siswa memperbesar tampilan ke sekitar titik (1, 2) sampai lubangnya terlihat
 * sebagai lingkaran kosong. Penunjuk skala di pojok kanan bawah wajib ada:
 * tanpa itu, tampilan pada perbesaran 0,02 satuan terlihat sama saja dengan
 * tampilan pada 4 satuan, dan siswa kehilangan rasa seberapa dekat ia mengintip.
 */

/** Lebar tampilan pada tiap tingkat perbesaran, dalam satuan sumbu x. */
export const LEBAR_TAMPILAN = [6, 3, 1.2, 0.5, 0.16, 0.04] as const

export const PUSAT = { x: 1, y: 2 }

/** Bentuk aslinya. Di x = 1 hasilnya 0 dibagi 0, jadi tidak terdefinisi. */
export const f = (x: number) => (x * x - 1) / (x - 1)

export default function LubangGrafik({ tingkat }: { tingkat: number }) {
  const i = Math.min(Math.max(tingkat, 0), LEBAR_TAMPILAN.length - 1)
  const lebar = LEBAR_TAMPILAN[i]
  // tinggi jendela dibuat sebanding dengan lebarnya, supaya garis y = x + 1
  // tetap terlihat miring 45 derajat pada tiap tingkat perbesaran
  const tinggi = lebar * 0.62

  const jendela: Jendela = {
    xMin: PUSAT.x - lebar / 2,
    xMax: PUSAT.x + lebar / 2,
    yMin: PUSAT.y - tinggi / 2,
    yMax: PUSAT.y + tinggi / 2,
  }
  const p = keLayar(jendela)

  // Garisnya digambar sebagai satu ruas dari tepi ke tepi. Tidak dipakai
  // jalurFungsi, karena di sini justru lubangnya yang mau ditonjolkan, dan
  // lubang selebar satu titik tidak akan pernah tertangkap oleh pencuplikan.
  const kiriY = jendela.xMin + 1
  const kananY = jendela.xMax + 1

  const dekat = lebar <= 0.5

  return (
    <Bidang
      jendela={jendela}
      keterangan={'f(x) = (x² - 1) : (x - 1)'}
      aria={`Grafik fungsi berlubang di titik satu koma dua, lebar tampilan ${angka(lebar, 3)} satuan`}
    >
      <line x1={p.x(jendela.xMin)} y1={p.y(kiriY)} x2={p.x(jendela.xMax)} y2={p.y(kananY)}
            stroke={WARNA.miring} strokeWidth={2.6} />

      {/* garis bantu ke titik lubangnya */}
      <line x1={p.x(PUSAT.x)} y1={KOTAK.y1} x2={p.x(PUSAT.x)} y2={p.y(PUSAT.y)}
            stroke={WARNA.samping} strokeWidth={1.3} strokeDasharray="5 4" opacity={0.75} />
      <line x1={KOTAK.x0} y1={p.y(PUSAT.y)} x2={p.x(PUSAT.x)} y2={p.y(PUSAT.y)}
            stroke={WARNA.depan} strokeWidth={1.3} strokeDasharray="5 4" opacity={0.75} />

      {/* LUBANGNYA. Lingkaran kosong berlatar warna kartu, jadi garis di
          belakangnya benar-benar terputus, bukan sekadar tertutup. */}
      <circle cx={p.x(PUSAT.x)} cy={p.y(PUSAT.y)} r={6} fill="var(--kartu)"
              stroke={WARNA.sudut} strokeWidth={2.4} />

      <text x={p.x(PUSAT.x) + 12} y={p.y(PUSAT.y) - 10} fontSize={11.5} fill={WARNA.sudut} fontFamily={MONO}>
        (1, 2) kosong
      </text>

      <text x={KOTAK.x0 + 4} y={KOTAK.y0 + 32} fontSize={11} fill={WARNA.redup} fontFamily={MONO}>
        {dekat
          ? 'terlihat: garisnya benar-benar terputus di satu titik'
          : 'pada tampilan selebar ini, lubangnya belum terlihat'}
      </text>
      <text x={KOTAK.x0 + 4} y={KOTAK.y0 + 50} fontSize={11} fill={WARNA.miring} fontFamily={MONO}>
        kiri menuju 2 · kanan menuju 2 · f(1) tidak ada
      </text>
    </Bidang>
  )
}
