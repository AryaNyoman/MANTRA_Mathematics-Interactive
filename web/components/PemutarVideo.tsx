'use client'

/**
 * Pemutar video animasi Manim.
 *
 * Ditulis sekali untuk dipakai ketujuh video Trigonometri. Sebelum berkas ini
 * ada, tipe `Tahap` sudah menyediakan tempat untuk video (`video?: {...}`)
 * tetapi tidak ada satu pun bagian situs yang menampilkannya — jadi video
 * yang selesai dirender pun tidak akan pernah terlihat siswa.
 *
 * Sengaja TIDAK memakai kontrol buatan sendiri. Kontrol bawaan peramban sudah
 * bisa diakses lewat papan tik, sudah diterjemahkan, dan sudah dikenal siswa.
 * Menggantinya dengan tombol sendiri hampir selalu menurunkan mutu.
 *
 * `preload="metadata"` — hanya keterangan durasi yang diambil saat halaman
 * dibuka, bukan seluruh berkas. Situs ini dibuka siswa dengan kuota terbatas.
 */

type Props = {
  /** nama berkas di `public/anim/`, contoh: `tahap8-grafik-sin.webm` */
  berkas: string
  /** gambar diam sebelum diputar, di `public/anim/` */
  poster?: string
  /** dibacakan pembaca layar dan tampil kalau videonya gagal dimuat */
  judul: string
}

export default function PemutarVideo({ berkas, poster, judul }: Props) {
  // Tanpa pembungkus tambahan: `.layar video` di globals.css sudah mengatur
  // batas ukuran dalam rem, dan aturan itu sengaja dibuat supaya kotaknya ikut
  // mengecil saat pengguna memperkecil zoom. Menambah pembungkus sendiri di
  // sini akan memutus aturan tersebut.
  return (
    <video
      controls
      preload="metadata"
      poster={poster ? `/anim/${poster}` : undefined}
      aria-label={judul}
    >
      <source src={`/anim/${berkas}`} type="video/webm" />
      Peramban Anda tidak bisa memutar video ini. Penjelasan lengkapnya tetap
      tersedia sebagai teks di sebelah kanan.
    </video>
  )
}
