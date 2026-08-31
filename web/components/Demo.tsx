'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Pratinjau isi situs di halaman depan, bergaya manim.community: satu panel
 * besar dengan tombol geser kiri-kanan.
 *
 * Yang ditampilkan adalah ISI ASLI, bukan gambar promosi. Video diambil dari
 * berkas yang benar-benar dipakai di materi, dan ketiga cuplikan layar dipotret
 * langsung dari halaman situs ini. Halaman depan yang menjanjikan sesuatu yang
 * tidak ada di dalam adalah cara tercepat kehilangan kepercayaan.
 *
 * REVISI 1 Sep 2026 (ARYA): dulu keempat klipnya video semua, sehingga
 * pengunjung hanya melihat sisi animasi dan sama sekali tidak tahu bahwa ada
 * alat yang bisa dicoba, latihan, dan kuis. Sekarang isinya berselang-seling:
 * animasi, lalu bukti bahwa situs ini juga bisa dikerjakan, bukan cuma ditonton.
 *
 * `preload="none"`: halaman depan tidak boleh menyeret video di kuota siswa.
 * Hanya klip yang sedang tampil yang dimuat, dan baru sampai metadatanya.
 */

type Klip =
  | { jenis: 'video'; berkas: string; poster: string; judul: string; isi: string }
  | { jenis: 'gambar'; berkas: string; judul: string; isi: string }

const KLIP: Klip[] = [
  {
    jenis: 'video',
    berkas: 'tahap8-grafik-sin.webm',
    poster: 'tahap8-grafik-sin.jpg',
    judul: 'Animasi yang menjelaskan sebabnya',
    isi: 'Titik berputar di lingkaran, tingginya dicatat, dan kurva sinus lahir di depan mata. Bukan rumus yang disodorkan, melainkan asal-usulnya.',
  },
  {
    jenis: 'gambar',
    berkas: 'demo-interaktif.jpg',
    judul: 'Alat yang bisa Anda geser sendiri',
    isi: 'Sudutnya Anda yang tentukan, dan angkanya berubah saat itu juga. Bukan membaca hasil orang lain, melainkan menguji sendiri sampai yakin.',
  },
  {
    jenis: 'video',
    berkas: 'tahap6-enam-rasio.webm',
    poster: 'tahap6-enam-rasio.jpg',
    judul: 'Rumus yang bisa ditunjuk',
    isi: 'Sekan dan kosekan bukan hafalan. Keenam perbandingan trigonometri ditunjukkan sebagai ruas garis yang benar-benar ada di gambar.',
  },
  {
    jenis: 'gambar',
    berkas: 'demo-latihan.jpg',
    judul: 'Latihan dengan pembahasan bertahap',
    isi: 'Soal pilihan ganda A sampai E. Setelah menjawab, Anda melihat langkah penyelesaiannya, bukan sekadar benar atau salah.',
  },
  {
    jenis: 'video',
    berkas: 'tahap7-sudut-istimewa.webm',
    poster: 'tahap7-sudut-istimewa.jpg',
    judul: 'Nilai yang bisa dihitung sendiri',
    isi: 'Persegi dipotong diagonalnya, segitiga sama sisi dibelah dua. Dari situ nilai sudut istimewa muncul tanpa kalkulator.',
  },
  {
    jenis: 'gambar',
    berkas: 'demo-kuis.jpg',
    judul: 'Kuis berskor, tanpa akun',
    isi: 'Menguji diri setelah materinya selesai dibaca. Nilainya tersimpan di peramban Anda sendiri, tidak dikirim ke mana pun.',
  },
]

export default function Demo() {
  const [ke, setKe] = useState(0)
  const video = useRef<HTMLVideoElement>(null)
  const klip = KLIP[ke]

  // Klip diganti berarti sumbernya berganti; video harus dimuat ulang, kalau
  // tidak peramban tetap memutar berkas sebelumnya.
  useEffect(() => {
    if (klip.jenis === 'video') video.current?.load()
  }, [ke, klip.jenis])

  return (
    <section className="demo" aria-label="Contoh isi situs">
      <div className="demo-panggung">
        {klip.jenis === 'video' ? (
          <video
            key={klip.berkas}
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
        ) : (
          /* Cuplikan layar dipotret dari halaman situs ini sendiri.
             `next/image` tidak dipakai supaya perbandingan sisinya bebas
             mengikuti panel, sama seperti video di sebelahnya. */
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={klip.berkas}
            src={`/gambar/${klip.berkas}`}
            alt={klip.judul}
            loading="lazy"
          />
        )}
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
