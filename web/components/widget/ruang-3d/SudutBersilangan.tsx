'use client'

import Bingkai3D, { Bidang, BusurSudut, Ruas, TitikBantu } from '@/components/widget/ruang-3d/Bingkai3D'
import {
  KOTAK, MONO, VH, WARNA, bulat, kubus, kurang, sudutDuaArah, tambah, kali,
  type Sudut, type Titik3,
} from '@/components/widget/ruang-3d/ruang'

/**
 * Widget "Sudut Bersilangan", Ruang 3D tahap 8.
 *
 * Garis AC dan garis BG bersilangan, jadi tidak punya titik potong. Padahal
 * mengukur sudut butuh dua garis yang bertemu. Jalan keluarnya: geser salah
 * satu garis SEJAJAR DIRINYA SENDIRI sampai keduanya bertemu.
 *
 * Widget ini menggeser BG sedikit demi sedikit. Yang membuatnya berkesan:
 * begitu geserannya penuh, BG mendarat tepat menjadi AH, salah satu diagonal
 * sisi kubus yang memang sudah ada. Jadi sudut yang dicari ternyata sudut
 * segitiga ACH, dan ketiga sisinya diagonal sisi yang sama panjang. Segitiga
 * sama sisi, sudutnya 60 derajat, dan siswa bisa memeriksanya tanpa kalkulator.
 *
 * Menggeser garis sejajar dirinya sendiri TIDAK mengubah sudut. Itu sebabnya
 * cara ini sah, dan kalimat itu ditulis di materinya.
 */

export const RUSUK = 6
const BANGUN = kubus(RUSUK)

const GARIS1 = ['A', 'C'] as const
const GARIS2 = ['B', 'G'] as const
/** BG digeser sejauh vektor B ke A, dan mendarat tepat menjadi AH. */
const TUJUAN = ['A', 'H'] as const

export const SUDUT_JAWAB = sudutDuaArah(
  kurang(BANGUN.titik.C, BANGUN.titik.A),
  kurang(BANGUN.titik.G, BANGUN.titik.B),
)

export function geserGaris(s: number): [Titik3, Titik3] {
  const v = kali(kurang(BANGUN.titik.A, BANGUN.titik.B), s)
  return [tambah(BANGUN.titik.B, v), tambah(BANGUN.titik.G, v)]
}

export default function SudutBersilangan({
  geser,
  sudut,
  onUbah,
}: {
  /** 0 berarti BG di tempat asalnya, 1 berarti sudah mendarat jadi AH */
  geser: number
  sudut: Sudut
  onUbah: (s: Sudut) => void
}) {
  const [g1, g2] = geserGaris(geser)
  const mendarat = geser > 0.985

  return (
    <Bingkai3D
      bangun={BANGUN}
      sudut={sudut}
      onUbah={onUbah}
      titikBantu={{ M: g1, N: g2 }}
      keterangan={`sudut antara AC dan BG`}
      bawah={
        mendarat
          ? `BG mendarat jadi AH. Sudutnya ${bulat(SUDUT_JAWAB, 0)}°`
          : `geser BG sejajar dirinya sendiri sampai menyentuh A`
      }
      warnaBawah={mendarat ? WARNA.sudut : WARNA.redup}
      aria={
        `Kubus ABCD.EFGH rusuk ${RUSUK}. Garis BG digeser sejajar dirinya sendiri sebesar ` +
        `${bulat(geser * 100, 0)} persen. ${mendarat ? `Sudut antara AC dan BG adalah ${bulat(SUDUT_JAWAB, 0)} derajat.` : 'Belum bertemu garis AC.'}`
      }
    >
      {(_kam, layar) => (
        <>
          {mendarat && (
            <Bidang titik={[layar.A, layar.C, layar.H]} warna={WARNA.sudut} opacity={0.14} />
          )}
          <Ruas a={layar[GARIS1[0]]} b={layar[GARIS1[1]]} warna={WARNA.samping} tebal={3.6} />
          {/* posisi asal BG, tetap terlihat samar sebagai pembanding */}
          {geser > 0.02 && (
            <Ruas a={layar[GARIS2[0]]} b={layar[GARIS2[1]]} warna={WARNA.depan}
                  tebal={1.6} putus opacity={0.5} />
          )}
          <Ruas a={layar.M} b={layar.N} warna={WARNA.depan} tebal={3.6} />
          {!mendarat && (
            <>
              <TitikBantu p={layar.M} warna={WARNA.depan} />
              <TitikBantu p={layar.N} warna={WARNA.depan} />
            </>
          )}
          {mendarat && (
            <BusurSudut
              sudut={layar.A} ke1={layar[GARIS1[1]]} ke2={layar[TUJUAN[1]]}
              warna={WARNA.sudut} teks={`${bulat(SUDUT_JAWAB, 0)}°`}
            />
          )}
          <text x={KOTAK.x0} y={VH - 21} fontSize={11.5} fontFamily={MONO} fill={WARNA.redup}>
            {mendarat
              ? 'segitiga ACH: ketiga sisinya sama'
              : `geseran ${bulat(geser * 100, 0)}%`}
          </text>
        </>
      )}
    </Bingkai3D>
  )
}
