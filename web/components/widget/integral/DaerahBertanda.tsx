'use client'

import {
  DAERAH_ATAS, DAERAH_BAWAH, jalurDaerah, potongTanda, type Jendela,
} from '@/components/widget/integral/koordinat'

/**
 * Daerah antara kurva dan sumbu x, DIWARNAI MENURUT TANDANYA.
 *
 * KENAPA JADI KOMPONEN SENDIRI
 * Tiga widget memerlukannya: Materi 06 (luas bertanda), Materi 07 (luas yang
 * tumbuh), dan Materi 09 (luas daerah). Kalau masing-masing menggambarnya
 * sendiri, "bagian yang di bawah sumbu" akan tampil dengan warna, kepekatan,
 * dan cara memecah yang berbeda-beda di tiga materi berturut-turut, padahal
 * justru itu satu-satunya hal yang harus dikenali siswa sebagai benda yang sama.
 *
 * Selang dipecah lebih dulu di tempat f berganti tanda, lalu tiap potongan
 * digambar terpisah. Memecahnya bukan hiasan: satu jalur tertutup yang
 * melintasi sumbu akan terisi sebagai satu bentuk berwarna tunggal, sehingga
 * bagian negatifnya tidak bisa dibedakan sama sekali.
 */
export default function DaerahBertanda({
  f,
  a,
  b,
  jendela,
  pekat = 0.3,
  /** benar saat daerah ini sedang disorot, misalnya batasnya sedang dipegang */
  nyala = false,
}: {
  f: (x: number) => number
  a: number
  b: number
  jendela: Jendela
  pekat?: number
  nyala?: boolean
}) {
  if (!(b > a)) return null
  return (
    <g className={nyala ? 'nyala' : undefined}>
      {potongTanda(f, a, b).map((bagian, i) => (
        <path
          key={i}
          d={jalurDaerah(f, bagian.dari, bagian.sampai, jendela)}
          fill={bagian.positif ? DAERAH_ATAS : DAERAH_BAWAH}
          fillOpacity={nyala ? pekat + 0.12 : pekat}
          stroke="none"
        />
      ))}
    </g>
  )
}
