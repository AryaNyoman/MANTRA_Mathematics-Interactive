'use client'

import Bingkai3D, { Ruas, TandaSiku, TitikBantu } from '@/components/widget/ruang-3d/Bingkai3D'
import {
  KOTAK, MONO, VH, WARNA, bulat, jarakTitik, kakiPadaGaris, kubus,
  type Sudut,
} from '@/components/widget/ruang-3d/ruang'

/**
 * Widget "Jarak ke Garis", Ruang 3D tahap 5.
 *
 * Garisnya diagonal ruang AG. Titiknya bisa dipilih: B, D, atau E, yaitu tiga
 * tetangga titik A.
 *
 * KENAPA KETIGANYA, BUKAN SATU
 * Karena ketiganya memberi jawaban yang SAMA PERSIS, 2 akar 6. Itu bukan
 * kebetulan: diagonal ruang adalah sumbu simetri kubus, jadi ketiga tetangga A
 * duduk seperti tiga kaki payung mengelilinginya. Siswa yang mencoba ketiganya
 * menemukan sendiri bahwa jaraknya tidak berubah, dan itu jauh lebih berkesan
 * daripada dihitung tiga kali.
 *
 * Angka 2 akar 6 sudah dicocokkan dengan `alat/cek_ruang.py`.
 */

export const RUSUK = 6
const BANGUN = kubus(RUSUK)

export const PILIHAN = ['B', 'D', 'E'] as const
export type Pilihan = (typeof PILIHAN)[number]

export function hitung(nama: string) {
  const P = BANGUN.titik[nama]
  const kaki = kakiPadaGaris(P, BANGUN.titik.A, BANGUN.titik.G)
  return { P, kaki, jarak: jarakTitik(P, kaki) }
}

export const JARAK = hitung('B').jarak

export default function JarakKeGaris({
  pilih,
  sudut,
  onUbah,
}: {
  pilih: number
  sudut: Sudut
  onUbah: (s: Sudut) => void
}) {
  const nama = PILIHAN[Math.min(Math.max(pilih, 0), PILIHAN.length - 1)]
  const { kaki, jarak } = hitung(nama)

  return (
    <Bingkai3D
      bangun={BANGUN}
      sudut={sudut}
      onUbah={onUbah}
      titikBantu={{ K: kaki }}
      keterangan={`jarak titik ${nama} ke garis AG`}
      bawah={`${nama}K = ${bulat(jarak, 3)} satuan, yaitu 2 akar 6`}
      aria={
        `Kubus ABCD.EFGH rusuk ${RUSUK}. Dari titik ${nama} ditarik ruas tegak lurus ke diagonal ruang AG, ` +
        `kakinya di titik K, panjangnya ${bulat(jarak, 3)} satuan.`
      }
    >
      {(_kam, layar) => (
        <>
          <Ruas a={layar.A} b={layar.G} warna={WARNA.samping} tebal={3.4} />
          <Ruas a={layar[nama]} b={layar.K} warna={WARNA.sudut} tebal={4} />
          <TandaSiku sudut={layar.K} ke1={layar.A} ke2={layar[nama]} warna={WARNA.sudut} />
          <TitikBantu p={layar.K} nama="K" warna={WARNA.sudut} />
          <text x={KOTAK.x0} y={VH - 21} fontSize={11.5} fontFamily={MONO} fill={WARNA.redup}>
            kaki K melayang di dalam kubus
          </text>
        </>
      )}
    </Bingkai3D>
  )
}
