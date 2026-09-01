'use client'

import Bidang from '@/components/widget/limit/Bidang'
import { KOTAK, MONO, WARNA, angka, jalurFungsi, keLayar, type Jendela } from '@/components/widget/limit/koordinat'

/**
 * Widget "Perkecil Tampilan", Limit tahap 7.
 *
 * Kebalikan dari widget Tahap 4. Di sana siswa memperbesar untuk menemukan
 * lubang sekecil titik; di sini ia memperkecil sampai kurvanya terlihat
 * menempel pada garis mendatar.
 *
 * Tampilan sengaja dimulai dari x = 3, sudah lewat asimtot tegaknya di akar 5.
 * Kalau asimtot itu ikut tergambar, perhatian siswa lari ke sana, padahal
 * asimtot tegak baru dibahas di Tahap 9 dan bukan isi materi ini.
 */

/** Lebar tampilan sumbu x pada tiap tingkat. Naik tajam supaya bedanya terasa. */
export const LEBAR_X = [12, 40, 160, 700, 3000] as const

const X_AWAL = 3
export const ASIMTOT = 3

export const f = (x: number) => (3 * x * x + 2 * x) / (x * x - 5)

export default function PerkecilTampilan({ tingkat }: { tingkat: number }) {
  const i = Math.min(Math.max(tingkat, 0), LEBAR_X.length - 1)
  const lebar = LEBAR_X[i]

  const jendela: Jendela = { xMin: X_AWAL, xMax: X_AWAL + lebar, yMin: 2.5, yMax: 9 }
  const p = keLayar(jendela)

  const xUjung = jendela.xMax
  const yUjung = f(xUjung)
  const selisih = yUjung - ASIMTOT

  return (
    <Bidang
      jendela={jendela}
      keterangan={'f(x) = (3x² + 2x) : (x² - 5)'}
      aria={`Grafik mendekati garis mendatar y sama dengan 3, lebar tampilan ${lebar} satuan`}
    >
      {/* garis asimtot datar */}
      <line x1={KOTAK.x0} y1={p.y(ASIMTOT)} x2={KOTAK.x1} y2={p.y(ASIMTOT)}
            stroke={WARNA.sudut} strokeWidth={1.8} strokeDasharray="7 5" />
      {/* Label ditaruh DI BAWAH garisnya. Di atas garis ia tertimpa kurva yang
          sedang menukik, dan itu terlihat pada potret layar 1 Sep 2026.
          Daerah di bawah asimtot selalu kosong, karena kurvanya tidak pernah
          turun melewati garis itu. */}
      <text x={KOTAK.x0 + 5} y={p.y(ASIMTOT) + 16} fontSize={11.5} fill={WARNA.sudut} fontFamily={MONO}>
        y = 3, asimtot datar
      </text>

      {/* kurvanya */}
      <path d={jalurFungsi(f, jendela, 600)} fill="none" stroke={WARNA.miring} strokeWidth={2.6}
            strokeLinejoin="round" />

      {/* penanda di tepi kanan: seberapa jauh kurvanya masih dari garis */}
      <line x1={p.x(xUjung) - 2} y1={p.y(yUjung)} x2={p.x(xUjung) - 2} y2={p.y(ASIMTOT)}
            stroke={WARNA.depan} strokeWidth={3} strokeLinecap="round" />
      <circle cx={p.x(xUjung) - 2} cy={p.y(yUjung)} r={4.5} fill={WARNA.depan}
              stroke="var(--kartu)" strokeWidth={1.8} />

      {/* Angka ditaruh di POJOK KANAN ATAS, bukan kiri atas dan bukan bawah.
          Di kiri atas kurvanya sedang tinggi sehingga tulisannya tertimpa, dan
          di bawah ia bertabrakan dengan penunjuk skala milik bingkai.
          (Dua cacat yang tertangkap saat memeriksa potret layar, 1 Sep 2026.) */}
      <text x={KOTAK.x1 - 6} y={KOTAK.y0 + 20} textAnchor="end" fontSize={12}
            fill={WARNA.miring} fontFamily={MONO}>
        di x = {angka(xUjung, 0)} nilainya {angka(yUjung, 5)}
      </text>
      <text x={KOTAK.x1 - 6} y={KOTAK.y0 + 38} textAnchor="end" fontSize={12}
            fill={WARNA.depan} fontFamily={MONO}>
        selisih ke garis {angka(selisih, 5)}
      </text>
      <text x={KOTAK.x1 - 6} y={KOTAK.y0 + 58} textAnchor="end" fontSize={10.5}
            fill={WARNA.redup} fontFamily={MONO}>
        {lebar >= 700
          ? 'nyaris berimpit, tapi selisihnya belum nol'
          : 'perkecil lagi tampilannya'}
      </text>
    </Bidang>
  )
}
