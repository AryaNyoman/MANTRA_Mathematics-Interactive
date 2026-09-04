'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'

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
 * TAMBAHAN v2 (4 Sep 2026): garis emas tipis di dasar kotak yang menghitung
 * waktu ke slide berikutnya. Garis itu SEKALIGUS jamnya: pergantian slide
 * dipicu oleh `animationend` garis tersebut, bukan oleh penghitung waktu
 * terpisah. Jadi tidak mungkin ada keadaan garisnya sudah penuh tetapi
 * slidenya belum berganti, atau sebaliknya. Menahan kursor di atas korsel
 * menjeda garis dan pergantiannya sekaligus, cukup dengan
 * `animation-play-state`.
 *
 * Kalau pengguna minta gerak dikurangi, pergantian otomatis DIMATIKAN sama
 * sekali dan garisnya tidak digambar. Ini bukan sekadar sopan santun: aturan
 * `prefers-reduced-motion` di `globals.css` memangkas semua durasi animasi
 * jadi hampir nol, dan korsel yang jamnya animasi akan berpacu tanpa henti
 * kalau tidak dijaga di sini.
 *
 * Semua klip dibiarkan terpasang di rel, tidak dibongkar pasang. Itu yang
 * membuat klip yang pernah dibuka tidak perlu dimuat ulang. Yang dijaga hanya
 * satu: video yang tidak sedang tampil DIHENTIKAN, supaya tidak ada dua suara
 * berbunyi bersamaan.
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
    berkas: 'beranda-tiga-grafik-v2.mp4',
    poster: 'beranda-tiga-grafik-v2.jpg',
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
    berkas: 'tahap8-grafik-sin.webm',
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
  const [jeda, setJeda] = useState(false)
  const rel = useRef<HTMLDivElement>(null)
  // Nilai ketiga (`() => false`) adalah jawaban saat halaman masih dirakit di
  // server, di mana tidak ada peramban untuk ditanyai.
  const kurangiGerak = useSyncExternalStore(langganGerak, bacaGerak, () => false)
  const klip = KLIP[ke]
  const otomatis = !kurangiGerak

  const tandai = useCallback((i: number) => {
    setSiap((s) => (s.includes(i) ? s : [...s, i]))
  }, [])

  // Hanya video yang sedang tampil yang boleh berbunyi. Yang lain dihentikan
  // dan dikembalikan ke awal, jadi klip berikutnya selalu mulai dari detik nol.
  useEffect(() => {
    const semua = rel.current?.querySelectorAll('video')
    semua?.forEach((v, i) => {
      if (i === ke) return
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
      onMouseEnter={() => setJeda(true)}
      onMouseLeave={() => setJeda(false)}
      /* Jeda juga saat fokus papan ketik masuk ke dalam korsel. Tanpa ini,
         orang yang menelusuri dengan Tab akan kehilangan tombol yang sedang
         ia sorot begitu slidenya berganti sendiri. */
      onFocusCapture={() => setJeda(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setJeda(false)
      }}
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
                  poster={`/anim/${k.poster}`}
                  aria-label={k.judul}
                  onLoadedData={() => tandai(i)}
                  onCanPlay={() => tandai(i)}
                  onError={() => tandai(i)}
                >
                  <source
                    src={`/anim/${k.berkas}`}
                    type={k.berkas.endsWith('.webm') ? 'video/webm' : 'video/mp4'}
                  />
                  {k.teks && (
                    <track
                      kind="subtitles"
                      src={`/anim/${k.berkas.replace(/\.webm$/, '.vtt')}`}
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

        {otomatis && (
          <div className="demo-progres" aria-hidden="true">
            <i
              key={ke}
              style={{ animationPlayState: jeda ? 'paused' : 'running' }}
              onAnimationEnd={() => geser(1)}
            />
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
