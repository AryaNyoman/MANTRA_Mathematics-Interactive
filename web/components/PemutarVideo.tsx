'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { bacaAngka, langgan, simpanAngka } from '@/lib/simpanan'
import versiAnim from '@/lib/versi-anim.json'

/**
 * Alamat berkas di /anim/ diberi sidik jari isinya (?v=...), dibuat oleh
 * scripts/versi-anim.mjs sebelum build. Tanpa ini, video atau subtitle yang
 * diganti isinya tanpa ganti nama tetap diambil peramban dari salinan lama
 * sampai setahun (Cache-Control immutable di next.config.ts): ARYA melihat
 * subtitle lama berjalan di atas video baru pada 12 Sep 2026.
 */
export const alamatAnim = (nama: string) => {
  const v = (versiAnim as Record<string, string>)[nama]
  return v ? `/anim/${nama}?v=${v}` : `/anim/${nama}`
}

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
// Video tinjauan 480p berformat .mp4 (4 Sep 2026); subtitle-nya tetap .vtt.
const berkasSubtitle = (berkas: string) => berkas.replace(/\.(webm|mp4)$/, '.vtt')

const KUNCI_UKURAN = 'matra:subtitle:ukuran'
// 1 = subtitle tampil (bawaan), 0 = disembunyikan. Diingat antar materi.
// Permintaan ARYA 12 Sep 2026: tombol hidup-matikan subtitle di tiap video,
// sebab tombol CC bawaan peramban tidak ada di semua peramban dan letaknya
// berbeda-beda.
const KUNCI_TAMPIL = 'matra:subtitle:tampil'
const UKURAN = [85, 100, 125, 155] as const
// Bawaan 85%: keputusan ARYA 2 Sep 2026 malam, subtitle selalu SATU BARIS dengan
// huruf dikecilkan (buat_subtitle.py memecah kalimat sampai 56 huruf). Siswa
// tetap bisa memperbesarnya lewat tombol di bawah pemutar.
const BAWAAN = 0 // 85%

export default function PemutarVideo({ berkas, poster, judul }: Props) {
  const bungkus = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  // Dideklarasikan di atas efek-efek yang memakainya (percobaan jadi kunci
  // elemen video, jadi tiap efek yang memegang elemen itu ikut dijalankan ulang).
  const [galat, setGalat] = useState(false)
  const [percobaan, setPercobaan] = useState(0)
  // Lencana "+5 detik" / "-5 detik" yang muncul sekejap di atas video tiap
  // kali digeser lewat panah atau ketukan ganda, supaya siswa tahu apa yang
  // barusan terjadi.
  const [lencana, setLencana] = useState<string | null>(null)
  const jamLencana = useRef<number | undefined>(undefined)
  const geser = useCallback((detik: number, dari?: number) => {
    const v = video.current
    if (!v) return
    const batas = Number.isFinite(v.duration) ? v.duration : Number.POSITIVE_INFINITY
    const tujuan = Math.min(Math.max((dari ?? v.currentTime) + detik, 0), batas)
    v.currentTime = tujuan
    if (dari !== undefined) {
      // Kontrol bawaan Chrome di HP punya gerakan ketuk-ganda sendiri (10
      // detik) yang berjalan di luar jangkauan kita; ditegaskan lagi sesaat
      // kemudian supaya hasil akhirnya tetap 5 detik dari titik semula.
      window.setTimeout(() => { v.currentTime = tujuan }, 80)
    }
    setLencana(detik > 0 ? `+${detik} detik` : `${detik} detik`)
    window.clearTimeout(jamLencana.current)
    jamLencana.current = window.setTimeout(() => setLencana(null), 700)
  }, [])

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

  const tampil = useSyncExternalStore(
    langgan,
    () => bacaAngka(KUNCI_TAMPIL, 1),
    () => 1,
  )

  /* Subtitle dihidup-matikan lewat `mode` jalur teksnya, bukan dengan
     mencabut <track>: jalurnya tetap dimuat, jadi menghidupkan lagi tidak
     mengunduh ulang. Diterapkan ulang setiap jalurnya siap (`loadedmetadata`)
     sebab peramban menyetel mode bawaan `showing` untuk track `default` saat
     elemen videonya dibuat ulang (key berganti tiap pindah materi). */
  useEffect(() => {
    const v = video.current
    if (!v) return
    const terapkan = () => {
      for (const t of Array.from(v.textTracks)) {
        t.mode = tampil ? 'showing' : 'hidden'
      }
    }
    terapkan()
    v.addEventListener('loadedmetadata', terapkan)
    v.textTracks.addEventListener?.('addtrack', terapkan)
    return () => {
      v.removeEventListener('loadedmetadata', terapkan)
      v.textTracks.removeEventListener?.('addtrack', terapkan)
    }
  }, [tampil, berkas, percobaan])

  /* Spasi = putar/jeda, panah kiri/kanan = mundur/maju 5 detik (permintaan
     ARYA 12 dan 13 Sep 2026). Kontrol bawaan hanya menanggapi papan tik
     kalau elemen videonya sedang fokus, dan fokus itu hilang begitu siswa
     mengeklik bacaan di sebelahnya. Di sini tombolnya ditangkap di dokumen
     selama pemutar ini "dipegang": pernah disentuh atau diputar, dan siswa
     belum mengeklik bagian halaman yang lain. Video yang sedang berjalan
     selalu bisa dijeda dengan spasi. Tombol pada kotak isian, penggeser,
     atau tombol lain (termasuk tombol subtitle di bawah pemutar) dibiarkan
     seperti biasa.

     KALAU VIDEONYA SENDIRI YANG FOKUS (siswa baru mengeklik tombol kontrol
     bawaannya), pendengar ini DIAM dan membiarkan peramban bekerja: kontrol
     bawaan Chrome menanggapi spasi di dalam shadow DOM-nya sebelum kejadian
     sampai ke dokumen, jadi versi 12 Sep yang tetap menanggapi membuat
     videonya berjalan lalu berhenti lagi (laporan ARYA 13 Sep). */
  useEffect(() => {
    const v = video.current
    const kotak = bungkus.current
    if (!v || !kotak) return
    let dipegang = false
    const pegang = () => { dipegang = true }
    const sentuh = (e: PointerEvent) => {
      dipegang = kotak.contains(e.target as Node)
    }
    const tekan = (e: KeyboardEvent) => {
      const kode = e.code
      if (kode !== 'Space' && kode !== 'ArrowLeft' && kode !== 'ArrowRight') return
      if (kode === 'Space' && e.repeat) return
      const sasaran = e.target as HTMLElement | null
      if (sasaran === v) return
      if (sasaran && sasaran !== document.body) {
        const nama = sasaran.tagName
        if (nama === 'INPUT' || nama === 'TEXTAREA' || nama === 'SELECT' || nama === 'BUTTON'
            || nama === 'A' || sasaran.isContentEditable) return
      }
      if (!dipegang && !kotak.contains(document.activeElement) && v.paused) return
      e.preventDefault()
      dipegang = true
      if (kode === 'Space') {
        if (v.paused) void v.play()
        else v.pause()
      } else {
        geser(kode === 'ArrowRight' ? 5 : -5)
      }
    }
    document.addEventListener('pointerdown', sentuh)
    document.addEventListener('keydown', tekan)
    v.addEventListener('play', pegang)
    return () => {
      document.removeEventListener('pointerdown', sentuh)
      document.removeEventListener('keydown', tekan)
      v.removeEventListener('play', pegang)
    }
  }, [berkas, percobaan, geser])

  /* Di layar sentuh: ketuk dua kali separuh kanan video = maju 5 detik,
     separuh kiri = mundur 5 detik (permintaan ARYA 13 Sep 2026, pola yang
     dikenal siswa dari YouTube). Hanya untuk jari (pointerType touch):
     klik ganda tetikus di Chrome sudah berarti layar penuh, jangan ditimpa.
     Ketukan di baris kontrol bawaan (56 piksel terbawah) dibiarkan, itu
     tombol-tombolnya sendiri. */
  useEffect(() => {
    const v = video.current
    if (!v) return
    let terakhir = { t: 0, x: 0, y: 0, waktu: 0 }
    const ketuk = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return
      const r = v.getBoundingClientRect()
      if (e.clientY > r.bottom - 56) return
      const kini = { t: e.timeStamp, x: e.clientX, y: e.clientY, waktu: v.currentTime }
      const ganda = kini.t - terakhir.t < 350
        && Math.abs(kini.x - terakhir.x) < 40 && Math.abs(kini.y - terakhir.y) < 40
      const awal = terakhir.waktu
      terakhir = ganda ? { t: 0, x: 0, y: 0, waktu: 0 } : kini
      if (!ganda) return
      e.preventDefault()
      geser(kini.x > r.left + r.width / 2 ? 5 : -5, awal)
    }
    v.addEventListener('pointerup', ketuk)
    return () => v.removeEventListener('pointerup', ketuk)
  }, [berkas, percobaan, geser])

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
    // `percobaan` ikut: "Coba lagi" membuat elemen video baru (key), dan
    // pendengar di sini harus pindah ke elemen yang baru itu.
  }, [berkas, percobaan])

  const ubah = (arah: -1 | 1) => {
    simpanAngka(
      KUNCI_UKURAN,
      Math.min(UKURAN.length - 1, Math.max(0, tingkat + arah)),
    )
  }

  /* Kalau videonya gagal dimuat, kotaknya TIDAK dibiarkan hitam tanpa
     keterangan. Sampai 4 Sep 2026 tidak ada penanganan galat sama sekali:
     video yang gagal meninggalkan kotak kosong, dan siswa tidak punya cara
     tahu apakah ia harus menunggu, memuat ulang, atau memang tidak ada
     videonya. `percobaan` dipakai sebagai `key` supaya "Coba lagi" benar
     benar membuat elemen video baru; menyetel ulang `src` pada elemen yang
     sama tidak selalu memicu pemuatan ulang. */
  if (galat) {
    return (
      <div className="video-galat" role="alert">
        <div>
          <div className="judul">Videonya belum bisa diputar</div>
          <p>Biasanya karena jaringan. Bacaannya tetap lengkap tanpa video.</p>
          <button
            type="button"
            className="pil-emas"
            onClick={() => {
              setGalat(false)
              setPercobaan((n) => n + 1)
            }}
          >
            Coba lagi
          </button>
        </div>
      </div>
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
      <div className="pemutar-layar">
      <video
        key={`${berkas}-${percobaan}`}
        ref={video}
        onError={() => setGalat(true)}
        controls
        /* Tanpa `playsInline`, Safari di iPhone merebut video ke layar penuh
           begitu ditekan. Siswa jadi kehilangan penjelasan di sebelahnya,
           dan harus keluar dulu untuk membacanya. (Temuan audit HP,
           2 Sep 2026.) */
        playsInline
        preload="metadata"
        poster={poster ? alamatAnim(poster) : undefined}
        aria-label={judul}
      >
        {/* Jenis MIME mengikuti ekstensinya. Kalau dipatok "video/webm" untuk
            berkas .mp4, peramban menolak sumbernya sebelum mencoba memutar. */}
        <source src={alamatAnim(berkas)} type={berkas.endsWith('.mp4') ? 'video/mp4' : 'video/webm'} />
        <track
          kind="subtitles"
          src={alamatAnim(berkasSubtitle(berkas))}
          srcLang="id"
          label="Bahasa Indonesia"
          default
        />
        Peramban Anda tidak bisa memutar video ini. Penjelasan lengkapnya tetap
        tersedia sebagai teks di bawahnya.
      </video>
      {lencana && <div className="lencana-geser" aria-live="polite">{lencana}</div>}
      </div>

      <div className="atur-subtitle">
        <button type="button" className="saklar"
                aria-pressed={tampil === 1}
                onClick={() => simpanAngka(KUNCI_TAMPIL, tampil ? 0 : 1)}>
          Subtitle {tampil ? 'hidup' : 'mati'}
        </button>
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
