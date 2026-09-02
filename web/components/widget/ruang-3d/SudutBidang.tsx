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
 * terang, dan kedua tanda siku-sikunya digambar bertumpu di sana.
 *
 * REVISI 2 Sep: pada mode kedua, titik P sekarang bisa digeser di sepanjang
 * garis potong BD. Begitu P meninggalkan titik tengah, PC tidak lagi tegak
 * lurus BD, kedua tanda siku-siku PADAM, dan angka yang terbaca turun. Nilai
 * yang benar adalah yang terbesar, dan itu cuma muncul tepat di tengah. Siswa
 * jadi melihat sendiri kenapa syarat tegak lurus itu tidak boleh dilanggar,
 * bukan cuma diberi tahu.
 *
 * Semua angka sudah dicocokkan dengan `alat/cek_ruang.py`, termasuk 51,67
 * derajat yang terbaca di seperempat jalan dari B.
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

/** Sudut yang terbaca kalau tumpuannya digeser ke titik t di sepanjang BD. */
export function sudutTerbaca(t: number) {
  const P = sepanjang(T.B, T.D, t)
  return sudutDuaArah(kurang(T.C, P), kurang(T.G, P))
}

/** Tegak lurus hanya terjadi tepat di tengah BD. */
export function tumpuanBenar(t: number) {
  return Math.abs(t - 0.5) < 0.01
}

export default function SudutBidang({
  mode,
  t = 0.5,
  sudut,
  onUbah,
}: {
  mode: number
  t?: number
  sudut: Sudut
  onUbah: (s: Sudut) => void
}) {
  const m = MODE[Math.min(Math.max(mode, 0), MODE.length - 1)]
  const P = sepanjang(T.B, T.D, mode === 1 ? t : 0.5)
  const benar = mode !== 1 || tumpuanBenar(t)
  const terbaca = mode === 1 ? sudutTerbaca(t) : m.jawab

  return (
    <Bingkai3D
      bangun={BANGUN}
      sudut={sudut}
      onUbah={onUbah}
      titikBantu={mode === 1 ? { P } : undefined}
      keterangan={m.ringkas}
      bawah={
        benar
          ? `sudutnya ${bulat(m.jawab, 2)}°`
          : `terbaca ${bulat(terbaca, 1)}°, dan itu bukan sudut antarbidang`
      }
      warnaBawah={benar ? undefined : WARNA.depan}
      aria={
        benar
          ? `Kubus ABCD.EFGH rusuk ${RUSUK}. ${m.nama}: ${m.ringkas}, besarnya ${bulat(m.jawab, 2)} derajat. ${m.catatan}.`
          : `Kubus ABCD.EFGH rusuk ${RUSUK}. Titik tumpu P digeser dari tengah BD, jadi PC tidak lagi tegak lurus BD. Yang terbaca ${bulat(terbaca, 1)} derajat, dan itu bukan sudut antara kedua bidang.`
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
              {/* tanda siku-siku hanya digambar kalau memang siku-siku. Menggambar
                  tanda yang tidak benar akan mengajarkan yang salah. */}
              {benar && (
                <>
                  <TandaSiku sudut={layar.P} ke1={layar.B} ke2={layar.C} warna={WARNA.redup} ukuran={9} />
                  <TandaSiku sudut={layar.P} ke1={layar.D} ke2={layar.G} warna={WARNA.redup} ukuran={9} />
                </>
              )}
              <TitikBantu p={layar.P} nama="P" warna={benar ? WARNA.miring : WARNA.depan} />
              {/* Tanpa angka, alasannya sama seperti mode pertama: titik C duduk
                  persis di ujung salah satu kaki sudut ini, jadi angka yang
                  ditaruh di garis bagi akan menempel pada huruf C. Terbukti
                  bertindih saat P digeser, 2 Sep. Angkanya ada di dua baris
                  bawah gambar dan di tabel kolom kanan. */}
              <BusurSudut sudut={layar.P} ke1={layar.C} ke2={layar.G}
                          warna={benar ? WARNA.sudut : WARNA.depan} jari={26} />
            </>
          )}

          {/* Sebaris dengan penunjuk skala yang rata kanan, jadi wajib pendek. */}
          <text x={KOTAK.x0} y={VH - 21} fontSize={11.5} fontFamily={MONO}
                fill={benar ? WARNA.redup : WARNA.depan}>
            {benar ? m.catatan : 'P digeser, siku-sikunya padam'}
          </text>
        </>
      )}
    </Bingkai3D>
  )
}
