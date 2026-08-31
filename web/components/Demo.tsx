'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Pratinjau isi situs di halaman depan, bergaya manim.community: satu panel
 * besar berisi klip animasi yang benar-benar dipakai di materi, dengan tombol
 * geser kiri-kanan.
 *
 * Yang ditampilkan adalah VIDEO ASLI, bukan gambar promosi. Halaman depan yang
 * menjanjikan sesuatu yang tidak ada di dalam adalah cara tercepat kehilangan
 * kepercayaan.
 *
 * `preload="none"` pada klip yang tidak sedang tampil: halaman depan tidak
 * boleh menyeret tujuh video sekaligus di kuota siswa. Hanya klip aktif yang
 * dimuat, dan hanya sampai metadatanya sampai siswa menekan putar.
 */

type Klip = {
  berkas: string
  poster: string
  judul: string
  isi: string
}

const KLIP: Klip[] = [
  {
    berkas: 'tahap8-grafik-sin.webm',
    poster: 'tahap8-grafik-sin.jpg',
    judul: 'Animasi yang menjelaskan sebabnya',
    isi: 'Titik berputar di lingkaran, tingginya dicatat, dan kurva sinus lahir di depan mata. Bukan rumus yang disodorkan, melainkan asal-usulnya.',
  },
  {
    berkas: 'tahap6-enam-rasio.webm',
    poster: 'tahap6-enam-rasio.jpg',
    judul: 'Rumus yang bisa ditunjuk',
    isi: 'Sekan dan kosekan bukan hafalan. Keenam perbandingan trigonometri ditunjukkan sebagai ruas garis yang benar-benar ada di gambar.',
  },
  {
    berkas: 'tahap7-sudut-istimewa.webm',
    poster: 'tahap7-sudut-istimewa.jpg',
    judul: 'Nilai yang bisa dihitung sendiri',
    isi: 'Persegi dipotong diagonalnya, segitiga sama sisi dibelah dua. Dari situ nilai sudut istimewa muncul tanpa kalkulator.',
  },
  {
    berkas: 'tahap9-tiga-grafik.webm',
    poster: 'tahap9-tiga-grafik.jpg',
    judul: 'Satu putaran, tiga kurva',
    isi: 'Sinus, cosinus, dan tangen digerakkan oleh satu sudut yang sama, lengkap dengan derajat dan radian pada sumbunya.',
  },
]

export default function Demo() {
  const [ke, setKe] = useState(0)
  const video = useRef<HTMLVideoElement>(null)
  const klip = KLIP[ke]

  // Klip diganti berarti sumbernya berganti; video harus dimuat ulang, kalau
  // tidak peramban tetap memutar berkas sebelumnya.
  useEffect(() => {
    video.current?.load()
  }, [ke])

  return (
    <section className="demo" aria-label="Contoh isi situs">
      <div className="demo-panggung">
        <video
          ref={video}
          controls
          preload="none"
          poster={`/anim/${klip.poster}`}
          aria-label={klip.judul}
        >
          <source src={`/anim/${klip.berkas}`} type="video/webm" />
          <track
            kind="subtitles"
            src={`/anim/${klip.berkas.replace(/\.webm$/, '.vtt')}`}
            srcLang="id"
            label="Bahasa Indonesia"
            default
          />
        </video>
      </div>

      <div className="demo-teks">
        <h3>{klip.judul}</h3>
        <p>{klip.isi}</p>
      </div>

      <div className="demo-kendali">
        <button
          type="button"
          aria-label="Sebelumnya"
          onClick={() => setKe((n) => (n - 1 + KLIP.length) % KLIP.length)}
        >
          &#8592;
        </button>
        <div className="demo-titik" role="tablist" aria-label="Pilih contoh">
          {KLIP.map((k, i) => (
            <button
              key={k.berkas}
              role="tab"
              aria-selected={i === ke}
              aria-label={k.judul}
              onClick={() => setKe(i)}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Berikutnya"
          onClick={() => setKe((n) => (n + 1) % KLIP.length)}
        >
          &#8594;
        </button>
      </div>
    </section>
  )
}
