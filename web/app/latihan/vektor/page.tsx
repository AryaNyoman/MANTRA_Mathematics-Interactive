import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Kaki from '@/components/mantra/Kaki'
import ArenaLatihan from '@/components/latihan/ArenaLatihan'
import { KUIS } from '@/content/vektor'

/**
 * Halaman /latihan/vektor.
 *
 * KENAPA BERKAS INI ADA DI SINI, PADAHAL `web/app/` WILAYAH MANTRA-DESAIN-UI-UX
 * Begitu vektor didaftarkan di `content/daftar-isi.ts`, halaman /latihan
 * OTOMATIS menampilkan kartu Vektor beserta tautannya, sebab `DaftarLatihan`
 * membaca daftar itu. Tautannya menuju /latihan/vektor, dan tanpa berkas ini
 * alamat tersebut menjawab 404. Sudah diperiksa: /latihan/limit menjawab 200,
 * /latihan/vektor menjawab 404.
 *
 * Jadi berkas ini menambal kerusakan yang ditimbulkan pendaftaran itu sendiri,
 * bukan menambah fitur baru. Isinya salinan persis pola /latihan/limit, berkas
 * BARU di folder BARU sehingga tidak menimpa apa pun milik sesi lain. Dicatat
 * di laporan bagian "Butuh MASTER" supaya bisa dipindahkan kalau memang
 * dianggap salah tempat.
 */
export const metadata: Metadata = {
  title: 'Latihan Vektor | MANTRA',
  description: 'Soal vektor berjenjang dari mudah sampai sangat sulit, dengan pembahasan.',
}

export default function LatihanVektor() {
  return (
    <>
      <Nav label="Latihan Vektor" />
      <ArenaLatihan topik="vektor" nama="Vektor" bank={KUIS} />
      <Kaki />
    </>
  )
}
