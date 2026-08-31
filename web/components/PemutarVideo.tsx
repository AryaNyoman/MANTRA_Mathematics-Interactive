'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'
import { bacaAngka, langgan, simpanAngka } from '@/lib/simpanan'

/**
 * Pemutar video animasi Manim.
 *
 * Ditulis sekali untuk dipakai ketujuh video Trigonometri. Sebelum berkas ini
 * ada, tipe `Tahap` sudah menyediakan tempat untuk video (`video?: {...}`)
 * tetapi tidak ada satu pun bagian situs yang menampilkannya, jadi video yang
 * selesai dirender pun tidak akan pernah terlihat siswa.
 *
 * Sengaja TIDAK memakai kontrol buatan sendiri. Kontrol bawaan peramban sudah
 * bisa diakses lewat papan tik, sudah diterjemahkan, dan sudah dikenal siswa.
 * Menggantinya dengan tombol sendiri hampir selalu menurunkan mutu.
 *
 * `preload="metadata"` artinya hanya keterangan durasi yang diambil saat
 * halaman dibuka, bukan seluruh berkas. Situs ini dibuka siswa dengan kuota
 * terbatas.
 */

type Props = {
  /** nama berkas di `public/anim/`, contoh: `tahap8-grafik-sin.webm` */
  berkas: string
  /** gambar diam sebelum diputar, di `public/anim/` */
  poster?: string
  /** dibacakan pembaca layar dan tampil kalau videonya gagal dimuat */
  judul: string
}

/**
 * Subtitle memakai berkas .vtt terpisah, BUKAN teks yang dibakar ke video.
 * Alasannya (keputusan 31 Agu 2026, permintaan ARYA):
 *   - tidak mungkin menindih animasi: peramban menaruhnya di lapisannya sendiri
 *   - bisa dimatikan siswa lewat kontrol bawaan
 *   - naskah berubah cukup jalankan `python manim/buat_subtitle.py <topik>`,
 *     tanpa render ulang video belasan menit
 *   - bisa disalin, dicari, dan dibaca pembaca layar
 * Berkasnya dibuat otomatis dari durasi suara yang sudah terukur, jadi
 * waktunya sama persis dengan narasi dan animasinya.
 */
const berkasSubtitle = (berkas: string) => berkas.replace(/\.webm$/, '.vtt')

const KUNCI_UKURAN = 'matra:subtitle:ukuran'
const UKURAN = [85, 100, 125, 155] as const
const BAWAAN = 1 // 100%

export default function PemutarVideo({ berkas, poster, judul }: Props) {
  const bungkus = useRef<HTMLDivElement>(null)

  /* Pilihan ukuran diingat antar materi: siswa yang perlu teks besar tidak
     harus mengaturnya ulang setiap kali berpindah.

     Dibaca lewat `useSyncExternalStore`, BUKAN setState di dalam useEffect.
     React 19 melarang yang kedua (aturan react-hooks/set-state-in-effect),
     dan cara ini sekaligus menghindari ketidakcocokan hidrasi: di server
     nilainya selalu bawaan, di peramban dibaca dari localStorage. */
  const tingkat = useSyncExternalStore(
    langgan,
    () => bacaAngka(KUNCI_UKURAN, BAWAAN),
    () => BAWAAN,
  )

  useEffect(() => {
    bungkus.current?.style.setProperty('--ukuran-subtitle', `${UKURAN[tingkat]}%`)
  }, [tingkat])

  const ubah = (arah: -1 | 1) => {
    simpanAngka(
      KUNCI_UKURAN,
      Math.min(UKURAN.length - 1, Math.max(0, tingkat + arah)),
    )
  }

  return (
    <div ref={bungkus} className="pemutar-bungkus">
      {/* Tanpa pembungkus tambahan di dalam: `.layar video` di globals.css
          sudah mengatur batas ukuran dalam rem, dan aturan itu sengaja dibuat
          supaya kotaknya ikut mengecil saat pengguna memperkecil zoom. */}
      <video
        controls
        preload="metadata"
        poster={poster ? `/anim/${poster}` : undefined}
        aria-label={judul}
      >
        <source src={`/anim/${berkas}`} type="video/webm" />
        <track
          kind="subtitles"
          src={`/anim/${berkasSubtitle(berkas)}`}
          srcLang="id"
          label="Bahasa Indonesia"
          default
        />
        Peramban Anda tidak bisa memutar video ini. Penjelasan lengkapnya tetap
        tersedia sebagai teks di sebelah kanan.
      </video>

      <div className="atur-subtitle">
        <span>Ukuran teks</span>
        <button type="button" onClick={() => ubah(-1)}
                disabled={tingkat === 0} aria-label="Perkecil teks subtitle">
          &minus;
        </button>
        <span className="nilai mono">{UKURAN[tingkat]}%</span>
        <button type="button" onClick={() => ubah(1)}
                disabled={tingkat === UKURAN.length - 1}
                aria-label="Perbesar teks subtitle">
          +
        </button>
      </div>
    </div>
  )
}
