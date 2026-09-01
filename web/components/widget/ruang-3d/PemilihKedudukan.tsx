'use client'

import Bingkai3D, { Ruas } from '@/components/widget/ruang-3d/Bingkai3D'
import {
  KOTAK, MONO, VH, WARNA, bulat, jarakDuaGaris, kedudukanDuaGaris, kubus,
  type Kedudukan, type Sudut,
} from '@/components/widget/ruang-3d/ruang'

/**
 * Widget "Pemilih Kedudukan", Ruang 3D tahap 2.
 *
 * Siswa memilih dua ruas pada kubus, lalu kedudukannya muncul BESERTA
 * alasannya. Daftar kedudukan yang biasanya dihafal (berpotongan, sejajar,
 * bersilangan) di sini dibangun sendiri oleh siswa lewat percobaan.
 *
 * Alasannya ikut ditulis karena kata saja tidak mengajarkan apa apa. Yang
 * membedakan sejajar dari bersilangan bukan "tidak bertemu", sebab keduanya
 * memang tidak bertemu, melainkan ada tidaknya satu bidang yang memuat
 * keduanya. Itulah yang harus terbaca.
 */

export const RUSUK = 6
const BANGUN = kubus(RUSUK)

export type Ruas2 = { nama: string; a: string; b: string; jenis: string }

/**
 * Pilihan ruasnya sengaja dibatasi sembilan, dan sengaja dicampur: rusuk,
 * diagonal sisi, dan diagonal ruang. Kalau semuanya rusuk, siswa tidak pernah
 * bertemu kasus bersilangan yang menarik.
 */
export const RUAS: Ruas2[] = [
  { nama: 'AB', a: 'A', b: 'B', jenis: 'rusuk alas' },
  { nama: 'CG', a: 'C', b: 'G', jenis: 'rusuk tegak' },
  { nama: 'HG', a: 'H', b: 'G', jenis: 'rusuk tutup' },
  { nama: 'AD', a: 'A', b: 'D', jenis: 'rusuk alas' },
  { nama: 'AC', a: 'A', b: 'C', jenis: 'diagonal sisi alas' },
  { nama: 'BD', a: 'B', b: 'D', jenis: 'diagonal sisi alas' },
  { nama: 'EG', a: 'E', b: 'G', jenis: 'diagonal sisi tutup' },
  { nama: 'AF', a: 'A', b: 'F', jenis: 'diagonal sisi depan' },
  { nama: 'AG', a: 'A', b: 'G', jenis: 'diagonal ruang' },
]

/** Titik sudut yang dimiliki kedua ruas, kalau ada. */
export function titikBersama(r1: Ruas2, r2: Ruas2): string | null {
  const satu = [r1.a, r1.b]
  const dua = [r2.a, r2.b]
  return satu.find((t) => dua.includes(t)) ?? null
}

export function periksaRuas(r1: Ruas2, r2: Ruas2) {
  const p = BANGUN.titik
  const letak: Kedudukan = kedudukanDuaGaris(p[r1.a], p[r1.b], p[r2.a], p[r2.b])
  const jarak = jarakDuaGaris(p[r1.a], p[r1.b], p[r2.a], p[r2.b])
  const sama = titikBersama(r1, r2)

  const alasan =
    letak === 'berimpit'
      ? 'ini ruas yang sama, cuma ditulis dengan dua nama'
      : letak === 'berpotongan'
        ? `keduanya bertemu di titik ${sama ?? 'yang sama'}, dan ada satu bidang yang memuat keduanya`
        : letak === 'sejajar'
          ? `arahnya sama persis, jaraknya tetap ${bulat(jarak)} satuan di sepanjang garis`
          : `arahnya beda, tetapi tidak ada satu bidang pun yang memuat keduanya, jaraknya ${bulat(jarak)} satuan`

  return { letak, jarak, alasan, sama }
}

export default function PemilihKedudukan({
  pilih1,
  pilih2,
  sudut,
  onUbah,
}: {
  pilih1: number
  pilih2: number
  sudut: Sudut
  onUbah: (s: Sudut) => void
}) {
  const r1 = RUAS[pilih1]
  const r2 = RUAS[pilih2]
  const { letak } = periksaRuas(r1, r2)

  const warnaLetak =
    letak === 'bersilangan' ? WARNA.depan : letak === 'sejajar' ? WARNA.samping : WARNA.sudut

  return (
    <Bingkai3D
      bangun={BANGUN}
      sudut={sudut}
      onUbah={onUbah}
      keterangan={`kubus rusuk ${RUSUK} satuan`}
      /* nama kedua ruasnya sudah disebut di baris atasnya, jadi di sini cukup
         kata kedudukannya saja supaya tidak mengulang */
      bawah={`kedudukannya: ${letak}`}
      warnaBawah={warnaLetak}
      aria={`Kubus ABCD.EFGH. Ruas ${r1.nama} dan ruas ${r2.nama} kedudukannya ${letak}.`}
    >
      {(_kam, layar) => (
        <>
          <Ruas a={layar[r1.a]} b={layar[r1.b]} warna={WARNA.samping} tebal={4} />
          <Ruas a={layar[r2.a]} b={layar[r2.b]} warna={WARNA.depan} tebal={4} />
          {/* Sengaja pendek. Baris ini sebaris dengan penunjuk skala yang rata
              kanan, dan keterangan jenis ruasnya ditaruh di tabel kolom kanan
              supaya keduanya tidak pernah bertabrakan di sini. */}
          <text x={KOTAK.x0} y={VH - 21} fontSize={11.5} fontFamily={MONO} fill={WARNA.redup}>
            <tspan fill={WARNA.samping}>{r1.nama}</tspan>
            {' dan '}
            <tspan fill={WARNA.depan}>{r2.nama}</tspan>
          </text>
        </>
      )}
    </Bingkai3D>
  )
}
