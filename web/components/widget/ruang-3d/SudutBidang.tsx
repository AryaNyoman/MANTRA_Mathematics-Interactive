'use client'

import Bingkai3D, {
  Bidang, BusurSudut, Ruas, TandaSiku, TitikBantu,
} from '@/components/widget/ruang-3d/Bingkai3D'
import {
  KOTAK, MONO, VH, WARNA, bulat, kubus, kurang, sepanjang, sudutDuaArah,
  sudutGarisBidang, type Sudut,
} from '@/components/widget/ruang-3d/ruang'

/**
 * Widget "Sudut dengan Bidang", Ruang 3D tahap 9.
 *
 * Dua hal yang biasanya tertukar, jadi ditaruh berdampingan dan bisa
 * digantiganti:
 *
 * 1. Sudut GARIS dengan bidang. Yang dipakai adalah bayangan garisnya pada
 *    bidang itu. Contoh: diagonal ruang AG terhadap alas ABCD, bayangannya AC,
 *    sudutnya sekitar 35,26 derajat.
 *
 * 2. Sudut BIDANG dengan bidang. Yang dipakai adalah garis potong kedua bidang,
 *    lalu dua garis yang sama sama tegak lurus garis potong itu DARI SATU TITIK
 *    YANG SAMA. Contoh: bidang BDG terhadap alas ABCD, garis potongnya BD,
 *    titik tumpuannya P di tengah BD, sudutnya sekitar 54,74 derajat.
 *
 * Kekeliruan yang paling sering: mengambil dua garis yang tegak lurus garis
 * potong tetapi bertumpu di titik yang berbeda. Karena itu titik P ditandai
 * jelas, dan kedua tanda siku-sikunya digambar bertumpu di sana.
 *
 * Kedua angka sudah dicocokkan dengan `alat/cek_ruang.py`.
 */

export const RUSUK = 6
const BANGUN = kubus(RUSUK)
const T = BANGUN.titik

export const SUDUT_GARIS = sudutGarisBidang(T.A, T.G, T.A, T.B, T.C)
export const SUDUT_BIDANG = sudutDuaArah(
  kurang(T.C, sepanjang(T.B, T.D, 0.5)),
  kurang(T.G, sepanjang(T.B, T.D, 0.5)),
)

export const MODE = [
  {
    nama: 'Garis dengan bidang',
    ringkas: 'AG terhadap alas ABCD',
    jawab: SUDUT_GARIS,
    catatan: 'bayangan AG pada alas adalah AC',
  },
  {
    nama: 'Bidang dengan bidang',
    ringkas: 'BDG terhadap alas ABCD',
    jawab: SUDUT_BIDANG,
    catatan: 'garis potongnya BD, tumpuan di P',
  },
] as const

export default function SudutBidang({
  mode,
  sudut,
  onUbah,
}: {
  mode: number
  sudut: Sudut
  onUbah: (s: Sudut) => void
}) {
  const m = MODE[Math.min(Math.max(mode, 0), MODE.length - 1)]
  const P = sepanjang(T.B, T.D, 0.5)

  return (
    <Bingkai3D
      bangun={BANGUN}
      sudut={sudut}
      onUbah={onUbah}
      titikBantu={mode === 1 ? { P } : undefined}
      keterangan={m.ringkas}
      bawah={`sudutnya ${bulat(m.jawab, 2)}°`}
      aria={
        `Kubus ABCD.EFGH rusuk ${RUSUK}. ${m.nama}: ${m.ringkas}, besarnya ${bulat(m.jawab, 2)} derajat. ${m.catatan}.`
      }
    >
      {(_kam, layar) => (
        <>
          <Bidang titik={['A', 'B', 'C', 'D'].map((k) => layar[k])} warna={WARNA.samping} opacity={0.18} />

          {mode === 0 && (
            <>
              {/* garisnya, bayangannya, dan tiang tegak yang menghubungkan */}
              <Ruas a={layar.A} b={layar.G} warna={WARNA.depan} tebal={3.6} />
              <Ruas a={layar.A} b={layar.C} warna={WARNA.sudut} tebal={3.2} />
              <Ruas a={layar.C} b={layar.G} warna={WARNA.redup} tebal={1.6} putus />
              <TandaSiku sudut={layar.C} ke1={layar.A} ke2={layar.G} warna={WARNA.redup} />
              {/* tanpa angka: sudut ini tampak sempit di layar, jadi angkanya
                  pasti menimpa ruas AC dan AG. Angkanya ada di baris bawah. */}
              <BusurSudut sudut={layar.A} ke1={layar.C} ke2={layar.G}
                          warna={WARNA.sudut} jari={38} />
            </>
          )}

          {mode === 1 && (
            <>
              <Bidang titik={['B', 'D', 'G'].map((k) => layar[k])} warna={WARNA.depan} opacity={0.2} />
              {/* garis potong kedua bidang */}
              <Ruas a={layar.B} b={layar.D} warna={WARNA.miring} tebal={3.6} />
              {/* dua garis yang sama sama tegak lurus BD, bertumpu di titik P */}
              <Ruas a={layar.P} b={layar.C} warna={WARNA.sudut} tebal={3.2} />
              <Ruas a={layar.P} b={layar.G} warna={WARNA.depan} tebal={3.2} />
              <TandaSiku sudut={layar.P} ke1={layar.B} ke2={layar.C} warna={WARNA.redup} ukuran={9} />
              <TandaSiku sudut={layar.P} ke1={layar.D} ke2={layar.G} warna={WARNA.redup} ukuran={9} />
              <TitikBantu p={layar.P} nama="P" warna={WARNA.miring} />
              <BusurSudut sudut={layar.P} ke1={layar.C} ke2={layar.G}
                          warna={WARNA.sudut} teks={`${bulat(m.jawab, 1)}°`} jari={26} />
            </>
          )}

          <text x={KOTAK.x0} y={VH - 21} fontSize={11.5} fontFamily={MONO} fill={WARNA.redup}>
            {m.catatan}
          </text>
        </>
      )}
    </Bingkai3D>
  )
}
