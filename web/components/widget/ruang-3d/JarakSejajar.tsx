'use client'

import Bingkai3D, { Bidang, Ruas, TandaSiku, TitikBantu } from '@/components/widget/ruang-3d/Bingkai3D'
import {
  KOTAK, MONO, VH, WARNA, bulat, jarakTitik, kakiPadaBidang, kubus, sepanjang,
  type Sudut,
} from '@/components/widget/ruang-3d/ruang'

/**
 * Widget "Jarak Sejajar", Ruang 3D tahap 7.
 *
 * Garis AE sejajar bidang BCGF. Siswa menggeser titik P sepanjang AE, dan
 * angka jaraknya TIDAK BERGERAK sama sekali.
 *
 * Itulah seluruh isi tahap ini. Jarak garis ke bidang sejajar bukan rumus
 * keempat yang harus dihafal setelah tiga rumus sebelumnya: ia jatuh kembali
 * menjadi jarak titik ke bidang, dan boleh memakai titik mana pun. Widget ini
 * membuktikan "boleh mana pun" itu dengan cara yang tidak bisa dibantah, yaitu
 * dengan mencobanya.
 *
 * Jaraknya 6, sama dengan satu rusuk, dan itu wajar sebab BCGF adalah sisi
 * kanan kubus sedangkan AE rusuk tegak di sisi kiri.
 */

export const RUSUK = 6
const BANGUN = kubus(RUSUK)

const BIDANG = ['B', 'C', 'G'] as const
export const NAMA_BIDANG = 'BCGF'

export function hitung(t: number) {
  const P = sepanjang(BANGUN.titik.A, BANGUN.titik.E, t)
  const [a, b, c] = BIDANG.map((k) => BANGUN.titik[k])
  const kaki = kakiPadaBidang(P, a, b, c)
  return { P, kaki, jarak: jarakTitik(P, kaki) }
}

export const JARAK = hitung(0).jarak

export default function JarakSejajar({
  t,
  sudut,
  onUbah,
}: {
  /** letak P sepanjang AE, 0 di A dan 1 di E */
  t: number
  sudut: Sudut
  onUbah: (s: Sudut) => void
}) {
  const { P, kaki, jarak } = hitung(t)

  return (
    <Bingkai3D
      bangun={BANGUN}
      sudut={sudut}
      onUbah={onUbah}
      titikBantu={{ P, K: kaki }}
      keterangan={`garis AE sejajar bidang ${NAMA_BIDANG}`}
      bawah={`PK = ${bulat(jarak, 3)} satuan, berapa pun letak P`}
      aria={
        `Kubus ABCD.EFGH rusuk ${RUSUK}. Titik P berada pada rusuk AE, dan jaraknya ke bidang ` +
        `${NAMA_BIDANG} tetap ${bulat(jarak, 3)} satuan berapa pun letak P.`
      }
    >
      {(_kam, layar) => (
        <>
          <Bidang titik={['B', 'C', 'G', 'F'].map((k) => layar[k])} warna={WARNA.samping} opacity={0.2} />
          <Ruas a={layar.A} b={layar.E} warna={WARNA.depan} tebal={3.4} />
          <Ruas a={layar.P} b={layar.K} warna={WARNA.sudut} tebal={4} />
          <TandaSiku sudut={layar.K} ke1={layar.C} ke2={layar.P} warna={WARNA.sudut} />
          <TitikBantu p={layar.P} nama="P" warna={WARNA.depan} />
          <TitikBantu p={layar.K} nama="K" warna={WARNA.sudut} />
          <text x={KOTAK.x0} y={VH - 21} fontSize={11.5} fontFamily={MONO} fill={WARNA.redup}>
            P di {bulat(t * 100, 0)}% panjang AE
          </text>
        </>
      )}
    </Bingkai3D>
  )
}
