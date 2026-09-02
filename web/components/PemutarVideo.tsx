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
// Bawaan 85%: keputusan ARYA 2 Sep 2026 malam, subtitle selalu SATU BARIS dengan
// huruf dikecilkan (buat_subtitle.py memecah kalimat sampai 56 huruf). Siswa
// tetap bisa memperbesarnya lewat tombol di bawah pemutar.
const BAWAAN = 0 // 85%

export default function PemutarVideo({ berkas, poster, judul }: Props) {
  const bungkus = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)

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

  /* Kontrol bawaan disembunyikan setelah DIAM_DETIK detik menonton tanpa
     disentuh, lalu muncul lagi begitu mouse digerakkan, layar disentuh, atau
     tombol papan tik ditekan.

     KENAPA PERLU. ARYA melaporkan (1 Sep 2026) bahwa dalam mode layar penuh
     baris tombol dan penunjuk waktu bertahan sangat lama dan menutupi
     animasinya, dan baru hilang setelah keluar dari layar penuh. Peramban
     memang sengaja menahan kontrol selama videonya berhenti, dan lamanya
     tidak bisa diatur lewat CSS karena kontrol itu ada di shadow DOM.

     Yang bisa dilakukan hanyalah MENCABUT atribut `controls`, lalu memasangnya
     kembali. Itu yang dikerjakan di sini.

     Saat video BERHENTI kontrolnya sengaja dibiarkan tampil: orang yang menekan
     jeda hampir pasti sedang mencari tombol, dan menyembunyikannya justru
     menyulitkan. Menekan Esc tetap bisa keluar dari layar penuh walaupun
     kontrolnya sedang tersembunyi. */
  useEffect(() => {
    const v = video.current
    const kotak = bungkus.current
    if (!v || !kotak) return

    const DIAM_DETIK = 2
    let jam: number | undefined

    const sembunyikan = () => {
      // hanya saat sedang berjalan; video yang berhenti tetap perlu tombolnya
      if (!v.paused && !v.ended) v.removeAttribute('controls')
    }

    const tampilkan = () => {
      v.setAttribute('controls', '')
      window.clearTimeout(jam)
      jam = window.setTimeout(sembunyikan, DIAM_DETIK * 1000)
    }

    const berhenti = () => {
      v.setAttribute('controls', '')
      window.clearTimeout(jam)
    }

    // Gerakan ditangkap di PEMBUNGKUS, bukan di elemen video, supaya gerakan
    // di atas baris kontrol pun ikut terhitung sebagai "masih dipakai".
    kotak.addEventListener('pointermove', tampilkan)
    kotak.addEventListener('pointerdown', tampilkan)
    kotak.addEventListener('keydown', tampilkan)
    v.addEventListener('play', tampilkan)
    v.addEventListener('pause', berhenti)
    v.addEventListener('ended', berhenti)

    return () => {
      window.clearTimeout(jam)
      kotak.removeEventListener('pointermove', tampilkan)
      kotak.removeEventListener('pointerdown', tampilkan)
      kotak.removeEventListener('keydown', tampilkan)
      v.removeEventListener('play', tampilkan)
      v.removeEventListener('pause', berhenti)
      v.removeEventListener('ended', berhenti)
      // atribut dikembalikan supaya video berikutnya tidak mewarisi keadaan
      // tersembunyi kalau komponennya dipakai ulang
      v.setAttribute('controls', '')
    }
  }, [berkas])

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
      {/* `key` WAJIB. Peramban hanya membaca <source> dan <track> saat elemen
          videonya pertama dibuat. Kalau elemennya dipakai ulang saat siswa
          pindah tahap, React memang mengganti alamatnya, tetapi videonya TIDAK
          ikut berganti: yang tampil poster tahap baru, yang terputar video
          tahap lama. Cacat ini tidak terlihat selama cuma satu tahap yang
          punya video, dan langsung muncul begitu Limit punya tujuh (1 Sep
          2026). `key` memaksa elemennya dibuat ulang, jadi pemilihan sumbernya
          diulang dari nol. */}
      <video
        key={berkas}
        ref={video}
        controls
        /* Tanpa `playsInline`, Safari di iPhone merebut video ke layar penuh
           begitu ditekan. Siswa jadi kehilangan penjelasan di sebelahnya,
           dan harus keluar dulu untuk membacanya. (Temuan audit HP,
           2 Sep 2026.) */
        playsInline
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
