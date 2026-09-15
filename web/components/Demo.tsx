'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { alamatAnim, alamatVideoJaringan } from '@/components/PemutarVideo'

/**
 * Apakah pengguna minta gerakan dikurangi (Pengaturan sistem, bukan situs).
 *
 * Dipakai untuk slide pertama yang berjalan sendiri berulang-ulang, dan
 * untuk mematikan pergantian slide otomatis. Bagi sebagian orang gerakan
 * berulang di tepi pandangan bikin pusing, dan mereka sudah menyalakan
 * setelan itu di HP atau laptopnya.
 *
 * Memakai `useSyncExternalStore`, pola yang sama dengan pembacaan
 * localStorage di proyek ini: nilainya segar sendiri tanpa disalin ke state,
 * sekaligus lolos dari ketidakcocokan hidrasi.
 */
const KUERI_GERAK = '(prefers-reduced-motion: reduce)'
function langganGerak(ubah: () => void) {
  const m = window.matchMedia(KUERI_GERAK)
  m.addEventListener('change', ubah)
  return () => m.removeEventListener('change', ubah)
}
function bacaGerak() {
  return window.matchMedia(KUERI_GERAK).matches
}

/**
 * Pratinjau isi situs di halaman depan: satu panel besar yang berganti
 * sendiri, dengan tombol geser kiri-kanan.
 *
 * Yang ditampilkan adalah ISI ASLI, bukan gambar promosi. Video diambil dari
 * berkas yang benar-benar dipakai di materi, dan kedua cuplikan layar dipotret
 * langsung dari halaman situs ini. Halaman depan yang menjanjikan sesuatu yang
 * tidak ada di dalam adalah cara tercepat kehilangan kepercayaan.
 *
 * Susunan lima slide (revisi ARYA 1 Sep 2026):
 *   1. Animasi tiga grafik yang BERJALAN SENDIRI, bisu, mengulang tanpa henti.
 *   2. Rekaman alat interaktif yang dibuat ARYA sendiri.
 *   3. Animasi lahirnya kurva sinus, bersuara dan berteks terjemahan.
 *   4. Latihan, dipotret dengan jawaban SUDAH terbuka.
 *   5. Bank soal, dipotret dengan kemajuan SUDAH menyala.
 *
 * UKURAN KOTAK SAMA PERSIS untuk kelima slide. Berkasnya bermacam
 * perbandingan sisi: 16:9, 2,38:1, bahkan potret 0,79:1. Kotaknya dikunci
 * 16:9 dan isinya `object-fit: contain`.
 *
 * PERGANTIAN OTOMATIS DICABUT (ARYA, 5 Sep 2026). Versi v2 sempat punya
 * garis emas penghitung waktu yang mengganti slide sendiri tiap 7 detik.
 * Akibatnya video slide pertama tidak pernah sempat selesai, dan slide yang
 * sedang dibaca berpindah di tengah kalimat. Sekarang slide hanya berganti
 * kalau pengguna menekan panah, titik, atau tombol panah papan ketik.
 *
 * Semua klip dibiarkan terpasang di rel, tidak dibongkar pasang. Itu yang
 * membuat klip yang pernah dibuka tidak perlu dimuat ulang. Yang dijaga:
 * video yang tidak sedang tampil DIHENTIKAN supaya tidak ada dua suara
 * berbunyi bersamaan, dan video yang mengulang sendiri (slide pertama)
 * DIPUTAR LAGI setiap kali slidenya kembali tampil. `autoPlay` hanya bekerja
 * sekali saat halaman dimuat; tanpa `play()` di sini video itu diam membeku
 * begitu pengguna kembali ke slide pertama.
 */

type Klip =
  | {
      jenis: 'video'
      label: string
      berkas: string
      poster: string
      judul: string
      isi: string
      /** true untuk slide pertama: jalan sendiri, bisu, mengulang, tanpa tombol */
      loop?: boolean
      /** berkas subtitle hanya ada untuk video materi */
      teks?: boolean
    }
  | { jenis: 'gambar'; label: string; berkas: string; judul: string; isi: string }

const KLIP: Klip[] = [
  {
    jenis: 'video',
    label: 'Animasi tanpa suara',
    /* v3 (5 Sep 2026): render ManimGL `manim/scenes/beranda_tiga_grafik.py`,
       30 detik, 0 sampai 540 derajat, bisu, sambungan ulangnya dipudarkan. */
    berkas: 'beranda-tiga-grafik-v3.mp4',
    poster: 'beranda-tiga-grafik-v3.jpg',
    loop: true,
    judul: 'Tiga kurva yang lahir dari satu lingkaran',
    isi: 'Sinus, kosinus, dan tangen bukan tiga rumus terpisah. Ketiganya catatan dari satu titik yang berputar, dan di sini kamu melihatnya terjadi.',
  },
  {
    jenis: 'video',
    label: 'Alat interaktif',
    berkas: 'beranda-interaktif.mp4',
    poster: 'beranda-interaktif.jpg',
    judul: 'Alat yang bisa kamu geser sendiri',
    isi: 'Sudutnya kamu yang tentukan, dan angkanya berubah saat itu juga. Bukan membaca hasil orang lain, melainkan menguji sendiri sampai yakin.',
  },
  {
    jenis: 'video',
    label: 'Animasi bersuara',
    // .mp4, bukan .webm: sejak 8 Sep 2026 semua video mp4, dan rujukan .webm ini
    // membuat demo beranda 404 (hanya poster) sampai ketahuan 15 Sep 2026
    berkas: 'tahap8-grafik-sin.mp4',
    poster: 'tahap8-grafik-sin.jpg',
    teks: true,
    judul: 'Animasi yang menjelaskan sebabnya',
    isi: 'Titik berputar di lingkaran, tingginya dicatat, dan kurva sinus lahir di depan mata. Bukan rumus yang disodorkan, melainkan asal-usulnya.',
  },
  {
    jenis: 'gambar',
    label: 'Latihan',
    berkas: 'demo-latihan.jpg',
    judul: 'Latihan dengan pembahasan bertahap',
    isi: 'Soal pilihan ganda A sampai E. Setelah menjawab, kamu melihat langkah penyelesaiannya, bukan sekadar benar atau salah.',
  },
  {
    jenis: 'gambar',
    label: 'Bank soal',
    berkas: 'demo-banksoal.jpg',
    judul: 'Bank soal berjenjang, empat tingkat',
    isi: 'Empat tingkat kesulitan yang terbuka bertahap. Kemajuannya tersimpan di peramban kamu sendiri, tanpa perlu akun.',
  },
]

/** Batas aman penanda memuat. Tanpa ini, klip yang gagal dimuat akan
 *  meninggalkan lingkaran berputar selamanya, dan itu lebih membingungkan
 *  daripada kotak kosong. */
const BATAS_MUAT = 2600

export default function Demo() {
  const [ke, setKe] = useState(0)
  const [siap, setSiap] = useState<number[]>([])
  const rel = useRef<HTMLDivElement>(null)
  // Nilai ketiga (`() => false`) adalah jawaban saat halaman masih dirakit di
  // server, di mana tidak ada peramban untuk ditanyai.
  const kurangiGerak = useSyncExternalStore(langganGerak, bacaGerak, () => false)
  const klip = KLIP[ke]

  const tandai = useCallback((i: number) => {
    setSiap((s) => (s.includes(i) ? s : [...s, i]))
  }, [])

  // Hanya video yang sedang tampil yang boleh berbunyi. Yang lain dihentikan
  // dan dikembalikan ke awal, jadi klip berikutnya selalu mulai dari detik nol.
  // Video yang mengulang sendiri diputar lagi begitu slidenya kembali tampil.
  useEffect(() => {
    const semua = rel.current?.querySelectorAll('video')
    semua?.forEach((v, i) => {
      if (i === ke) {
        if (v.loop) v.play().catch(() => { /* peramban boleh menolak; posternya tetap tampil */ })
        return
      }
      v.pause()
      try {
        v.currentTime = 0
      } catch {
        /* peramban boleh menolak sebelum berkasnya punya durasi */
      }
    })
  }, [ke])

  // Penanda memuat tidak boleh berputar selamanya. Kalau dalam 2,6 detik klip
  // belum melapor siap, ia dianggap siap saja: gambar poster biasanya sudah
  // tergambar jauh sebelum itu.
  useEffect(() => {
    if (siap.includes(ke)) return
    const id = window.setTimeout(() => tandai(ke), BATAS_MUAT)
    return () => window.clearTimeout(id)
  }, [ke, siap, tandai])

  const geser = (arah: -1 | 1) =>
    setKe((n) => (n + arah + KLIP.length) % KLIP.length)

  return (
    <section
      className="demo"
      aria-label="Cuplikan isi situs"
      aria-roledescription="korsel"
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); geser(-1) }
        if (e.key === 'ArrowRight') { e.preventDefault(); geser(1) }
      }}
    >
      <div className="demo-panggung">
        <div
          className="demo-rel"
          ref={rel}
          style={{
            transform: `translateX(-${ke * 100}%)`,
            // Gerakan dimatikan kalau pengguna memintanya di setelan sistem.
            transition: kurangiGerak ? 'none' : undefined,
          }}
        >
          {KLIP.map((k, i) => (
            <div
              className="demo-slide"
              key={k.berkas}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} dari ${KLIP.length}: ${k.judul}`}
              /* Klip yang tidak tampil disembunyikan dari pembaca layar dan
                 dari urutan Tab, supaya papan ketik tidak nyasar ke tombol
                 video yang sedang berada di luar kotak. */
              aria-hidden={i !== ke}
              inert={i !== ke}
            >
              {k.jenis === 'video' ? (
                <video
                  /* Slide pertama sengaja TANPA tombol dan berjalan sendiri,
                     supaya terasa seperti gambar hidup, bukan video yang harus
                     ditekan dulu. `muted` WAJIB ada bersama `autoPlay`: tanpa
                     itu peramban menolak memutar sendiri. */
                  controls={!k.loop || kurangiGerak}
                  autoPlay={k.loop && !kurangiGerak}
                  loop={k.loop && !kurangiGerak}
                  muted={k.loop}
                  playsInline
                  /* Slide pertama dimuat lebih dulu karena memang langsung
                     diputar. Sisanya `metadata`: cukup untuk memunculkan
                     gambar poster dan durasinya, tanpa menyeret berkas
                     berukuran megabita di kuota siswa yang belum tentu
                     menontonnya. */
                  preload={k.loop ? 'auto' : 'metadata'}
                  poster={alamatAnim(k.poster)}
                  aria-label={k.judul}
                  onLoadedData={() => tandai(i)}
                  onCanPlay={() => tandai(i)}
                  onError={() => tandai(i)}
                >
                  <source
                    src={alamatVideoJaringan(k.berkas)}
                    type={k.berkas.endsWith('.webm') ? 'video/webm' : 'video/mp4'}
                  />
                  {k.teks && (
                    <track
                      kind="subtitles"
                      src={alamatAnim(k.berkas.replace(/\.(webm|mp4)$/, '.vtt'))}
                      srcLang="id"
                      label="Bahasa Indonesia"
                      default
                    />
                  )}
                </video>
              ) : (
                /* Cuplikan layar dipotret dari halaman situs ini sendiri.
                   `next/image` tidak dipakai supaya perbandingan sisinya bebas
                   mengikuti kotak, sama seperti video di sebelahnya. */
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={`/gambar/${k.berkas}`}
                  alt={k.judul}
                  loading={i <= 1 ? 'eager' : 'lazy'}
                  onLoad={() => tandai(i)}
                  onError={() => tandai(i)}
                />
              )}
            </div>
          ))}
        </div>

        {!siap.includes(ke) && (
          <div className="demo-muat" role="status" aria-live="polite">
            <i aria-hidden="true" />
            <span className="hanya-pembaca">Memuat cuplikan</span>
          </div>
        )}

      </div>

      <div className="demo-bawah">
        <div className="demo-jenis">
          {klip.label}
          <br />
          {String(ke + 1).padStart(2, '0')} / {String(KLIP.length).padStart(2, '0')}
        </div>

        {/* `key` sengaja dipasang: mengganti kuncinya membuat React MELEPAS
            blok lama lalu memasang yang baru, jadi animasi masuk berjalan
            lagi tanpa keterangan lama ikut tertinggal di layar. */}
        <div className="demo-teks" key={klip.berkas}>
          <h3>{klip.judul}</h3>
          <p>{klip.isi}</p>
        </div>

        <div className="demo-kendali">
          <button type="button" className="demo-garis" aria-label="Cuplikan sebelumnya" onClick={() => geser(-1)}>
            &#8592;
          </button>
          <button type="button" className="demo-isi" aria-label="Cuplikan berikutnya" onClick={() => geser(1)}>
            &#8594;
          </button>
        </div>
      </div>

      <div className="demo-titik" role="tablist" aria-label="Pilih cuplikan">
        {KLIP.map((k, i) => (
          <button
            key={k.berkas}
            type="button"
            role="tab"
            aria-selected={i === ke}
            aria-label={`Cuplikan ${i + 1}, ${k.judul}`}
            data-aktif={i === ke}
            onClick={() => setKe(i)}
          >
            <span aria-hidden />
          </button>
        ))}
      </div>
    </section>
  )
}
