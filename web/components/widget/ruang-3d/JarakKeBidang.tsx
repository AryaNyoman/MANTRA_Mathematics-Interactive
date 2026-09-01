'use client'

import Bingkai3D, { Bidang, Ruas, TandaSiku, TitikBantu } from '@/components/widget/ruang-3d/Bingkai3D'
import {
  KOTAK, MONO, VH, WARNA, bulat, jarakTitik, kakiPadaBidang, kubus,
  type Sudut,
} from '@/components/widget/ruang-3d/ruang'

/**
 * Widget "Jarak ke Bidang", Ruang 3D tahap 6.
 *
 * Dua soal klasik, dan keduanya sengaja dipasangkan:
 *   A ke bidang BDE, dan C ke bidang BDG.
 * Jawabannya sama persis, 2 akar 3, padahal titik dan bidangnya berbeda.
 * Kesamaan itu bukan kebetulan melainkan simetri kubus, dan itulah yang ingin
 * dilihat siswa.
 *
 * Yang digambar BUKAN angkanya, melainkan ruas tegak lurusnya, menembus dari
 * titik itu sampai menusuk bidangnya. Selama ruas itu tidak digambar, "jarak
 * ke bidang" cuma rumus. Begitu ia terlihat menembus, barulah ia benda.
 *
 * Kaki tegak lurusnya kebetulan jatuh pada diagonal ruang, dan itu ditandai
 * karena membantu siswa memeriksa jawabannya tanpa menghitung ulang.
 *
 * Kedua angka sudah dicocokkan dengan `alat/cek_ruang.py`. Soal C ke BDG
 * persis soal EBTANAS 1992.
 */

export const RUSUK = 6
const BANGUN = kubus(RUSUK)

export const SOAL = [
  { titik: 'A', bidang: ['B', 'D', 'E'] as const, diagonal: ['A', 'G'] as const },
  { titik: 'C', bidang: ['B', 'D', 'G'] as const, diagonal: ['C', 'E'] as const },
] as const

export function hitung(n: number) {
  const s = SOAL[Math.min(Math.max(n, 0), SOAL.length - 1)]
  const P = BANGUN.titik[s.titik]
  const [a, b, c] = s.bidang.map((k) => BANGUN.titik[k])
  const kaki = kakiPadaBidang(P, a, b, c)
  return { ...s, P, kaki, jarak: jarakTitik(P, kaki) }
}

export const JARAK = hitung(0).jarak

export default function JarakKeBidang({
  pilih,
  sudut,
  onUbah,
}: {
  pilih: number
  sudut: Sudut
  onUbah: (s: Sudut) => void
}) {
  const s = hitung(pilih)
  const namaBidang = s.bidang.join('')

  return (
    <Bingkai3D
      bangun={BANGUN}
      sudut={sudut}
      onUbah={onUbah}
      titikBantu={{ K: s.kaki }}
      keterangan={`jarak titik ${s.titik} ke bidang ${namaBidang}`}
      bawah={`${s.titik}K = ${bulat(s.jarak, 3)} satuan, yaitu 2 akar 3`}
      aria={
        `Kubus ABCD.EFGH rusuk ${RUSUK}. Bidang ${namaBidang} digambar tembus pandang, dan dari titik ` +
        `${s.titik} ditarik ruas tegak lurus menembus bidang itu di titik K, panjangnya ${bulat(s.jarak, 3)} satuan.`
      }
    >
      {(_kam, layar) => (
        <>
          <Bidang titik={s.bidang.map((k) => layar[k])} warna={WARNA.samping} opacity={0.24} />
          {/* diagonal ruang, garis bantu yang memuat kaki tegak lurusnya */}
          <Ruas a={layar[s.diagonal[0]]} b={layar[s.diagonal[1]]} warna={WARNA.redup}
                tebal={1.6} putus opacity={0.85} />
          <Ruas a={layar[s.titik]} b={layar.K} warna={WARNA.sudut} tebal={4.2} />
          <TandaSiku sudut={layar.K} ke1={layar[s.bidang[0]]} ke2={layar[s.titik]} warna={WARNA.sudut} />
          <TitikBantu p={layar.K} nama="K" warna={WARNA.sudut} />
          <text x={KOTAK.x0} y={VH - 21} fontSize={11.5} fontFamily={MONO} fill={WARNA.redup}>
            K tepat di diagonal {s.diagonal.join('')}
          </text>
        </>
      )}
    </Bingkai3D>
  )
}
