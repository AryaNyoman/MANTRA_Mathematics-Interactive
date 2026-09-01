'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Pratinjau isi situs di halaman depan, bergaya manim.community: satu panel
 * besar dengan tombol geser kiri-kanan.
 *
 * Yang ditampilkan adalah ISI ASLI, bukan gambar promosi. Video diambil dari
 * berkas yang benar-benar dipakai di materi, dan kedua cuplikan layar dipotret
 * langsung dari halaman situs ini. Halaman depan yang menjanjikan sesuatu yang
 * tidak ada di dalam adalah cara tercepat kehilangan kepercayaan.
 *
 * REVISI 1 Sep 2026 (ARYA), susunan lima slide:
 *   1. Animasi tiga grafik yang BERJALAN SENDIRI, bisu, mengulang tanpa henti.
 *      Tugasnya membuat pengunjung berhenti sebentar, bukan mengajar.
 *   2. Rekaman alat interaktif yang dibuat ARYA sendiri.
 *   3. Animasi lahirnya kurva sinus, lengkap dengan suara dan teks terjemahan.
 *   4. Latihan, dipotret dengan jawaban SUDAH terbuka.
 *   5. Bank soal, dipotret dengan kemajuan dan lencana SUDAH menyala.
 *
 * Syarat potret di slide 4 dan 5 itu permintaan ARYA dan bukan hiasan: kartu
 * kosong tidak membuktikan apa pun, sedangkan kartu berisi menunjukkan bahwa
 * kemajuannya memang dicatat dan lencananya memang bisa didapat.
 */

type Klip =
  | {
      jenis: 'video'
      berkas: string
      poster: string
      judul: string
      isi: string
      /** true untuk slide pertama: jalan sendiri, bisu, mengulang, tanpa tombol */
      loop?: boolean
      /** berkas subtitle hanya ada untuk video materi */
      teks?: boolean
    }
  | { jenis: 'gambar'; berkas: string; judul: string; isi: string }

const KLIP: Klip[] = [
  {
    jenis: 'video',
    berkas: 'beranda-tiga-grafik.mp4',
    poster: 'beranda-tiga-grafik.jpg',
    loop: true,
    judul: 'Tiga kurva yang lahir dari satu lingkaran',
    isi: 'Sinus, kosinus, dan tangen bukan tiga rumus terpisah. Ketiganya catatan dari satu titik yang berputar, dan di sini Anda melihatnya terjadi.',
  },
  {
    jenis: 'video',
    berkas: 'beranda-interaktif.mp4',
    poster: 'beranda-interaktif.jpg',
    judul: 'Alat yang bisa Anda geser sendiri',
    isi: 'Sudutnya Anda yang tentukan, dan angkanya berubah saat itu juga. Bukan membaca hasil orang lain, melainkan menguji sendiri sampai yakin.',
  },
  {
    jenis: 'video',
    berkas: 'tahap8-grafik-sin.webm',
    poster: 'tahap8-grafik-sin.jpg',
    teks: true,
    judul: 'Animasi yang menjelaskan sebabnya',
    isi: 'Titik berputar di lingkaran, tingginya dicatat, dan kurva sinus lahir di depan mata. Bukan rumus yang disodorkan, melainkan asal-usulnya.',
  },
  {
    jenis: 'gambar',
    berkas: 'demo-latihan.jpg',
    judul: 'Latihan dengan pembahasan bertahap',
    isi: 'Soal pilihan ganda A sampai E. Setelah menjawab, Anda melihat langkah penyelesaiannya, bukan sekadar benar atau salah.',
  },
  {
    jenis: 'gambar',
    berkas: 'demo-banksoal.jpg',
    judul: 'Bank soal berjenjang, dengan lencana',
    isi: 'Empat tingkat kesulitan yang terbuka bertahap. Kemajuan dan lencananya tersimpan di peramban Anda sendiri, tanpa perlu akun.',
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
            /* Slide pertama sengaja TANPA tombol dan berjalan sendiri, supaya
               terasa seperti gambar hidup, bukan video yang harus ditekan dulu.
               `muted` WAJIB ada bersama `autoPlay`: tanpa itu peramban menolak
               memutar sendiri, dan slide pertama akan diam membeku.
               Slide lain tetap pakai tombol, karena ada suaranya. */
            controls={!klip.loop}
            autoPlay={klip.loop}
            loop={klip.loop}
            muted={klip.loop}
            playsInline
            /* Slide pertama dimuat lebih dulu karena memang langsung diputar.
               Sisanya `none`: halaman depan tidak boleh menyeret video di kuota
               siswa sebelum ia memilih menontonnya. */
            preload={klip.loop ? 'auto' : 'none'}
            poster={`/anim/${klip.poster}`}
            aria-label={klip.judul}
          >
            <source
              src={`/anim/${klip.berkas}`}
              type={klip.berkas.endsWith('.webm') ? 'video/webm' : 'video/mp4'}
            />
            {klip.teks && (
              <track
                kind="subtitles"
                src={`/anim/${klip.berkas.replace(/\.webm$/, '.vtt')}`}
                srcLang="id"
                label="Bahasa Indonesia"
                default
              />
            )}
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
