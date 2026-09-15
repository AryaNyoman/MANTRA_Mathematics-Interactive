'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { bacaAngka, langgan, simpanAngka } from '@/lib/simpanan'
import {
  apakahTersimpan, hapusSemuaSimpanan, ringkasanSimpanan, simpanVideo, simpananTersedia,
  teksMB, type RingkasanSimpanan,
} from '@/lib/simpanan-video'
import versiAnim from '@/lib/versi-anim.json'

/**
 * Alamat berkas di /anim/ diberi sidik jari isinya (?v=...), dibuat oleh
 * scripts/versi-anim.mjs sebelum build. Tanpa ini, video atau subtitle yang
 * diganti isinya tanpa ganti nama tetap diambil peramban dari salinan lama
 * sampai setahun (Cache-Control immutable di next.config.ts): ARYA melihat
 * subtitle lama berjalan di atas video baru pada 12 Sep 2026.
 *
 * VIDEO (mp4/webm) DILAYANI DARI CLOUDFLARE R2 sejak 15 Sep 2026 (keputusan
 * ARYA): tiap deploy Vercel yang membawa folder video 505 MB menambah
 * Deployment Storage sekitar 0,5 GB dan angkanya tidak turun walau deployment
 * dihapus (17,33 GB pada 15 Sep, batas Hobby 10 GB). Alamat dasarnya diisi
 * lewat NEXT_PUBLIC_ASAL_VIDEO di web/.env.production (dibaca saat build,
 * nilainya bukan rahasia). Kosong = ambil dari /anim/ sendiri (dev server).
 * Subtitle dan poster tetap dari /anim/: kecil, dan <track> lintas asal
 * butuh CORS. Sidik ?v= tetap dipakai supaya salinan lama tidak terpakai.
 */
const ASAL_VIDEO = (process.env.NEXT_PUBLIC_ASAL_VIDEO ?? '').replace(/\/+$/, '')

export const alamatAnim = (nama: string) => {
  const v = (versiAnim as Record<string, string>)[nama]
  const ekor = v ? `?v=${v}` : ''
  if (ASAL_VIDEO && /\.(mp4|webm)$/i.test(nama)) return `${ASAL_VIDEO}/${nama}${ekor}`
  return `/anim/${nama}${ekor}`
}

/**
 * Alamat video yang SELALU dari jaringan: tanda &j=1 membuat petugas simpanan
 * (public/sw.js) tidak menyentuhnya. Satu elemen video hanya boleh dilayani
 * satu sumber sepanjang hidupnya (Chrome menolak jawaban Range yang berpindah
 * sumber, "FFmpegDemuxer: data source error", 15 Sep 2026), jadi elemen yang
 * dibuat saat videonya belum tersimpan memakai alamat ini sampai dibuat ulang.
 */
export const alamatVideoJaringan = (nama: string) => {
  const a = alamatAnim(nama)
  return a + (a.includes('?') ? '&j=1' : '?j=1')
}

/**
 * Jalur cadangan lewat asal situs sendiri (rewrite /video-cadangan di
 * next.config.ts), dipakai pemutar hanya bila alamat Worker gagal dimuat,
 * misalnya Chrome memblokir permintaan lintas asal ke "alamat lokal" pada
 * jaringan yang resolvernya memetakan host Cloudflare ke IPv6 ULA (15 Sep
 * 2026). Kosong bila video memang dilayani dari /anim/ sendiri (dev).
 */
export const alamatVideoCadangan = (nama: string) => {
  if (!ASAL_VIDEO) return ''
  const v = (versiAnim as Record<string, string>)[nama]
  return `/video-cadangan/${nama}?${v ? `v=${v}&` : ''}j=1`
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
// 1 = video yang ditonton hampir habis disimpan otomatis di perangkat
// (bawaan), 0 = tidak. Untuk siswa yang memori atau kuotanya sempit.
const KUNCI_SIMPAN = 'matra:video:simpan-otomatis'
// Bagian video yang harus sudah ditonton sebelum disimpan: hampir habis,
// supaya yang cuma mengintip sebentar tidak dibebani unduhan kedua.
const AMBANG_SIMPAN = 0.9
type KeadaanSimpanan = 'belum' | 'menyimpan' | 'tersimpan'

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

  /* Sumber elemen video ini, diputuskan SEBELUM elemennya diberi <source>:
     'simpanan' (petugas melayani dari Cache Storage) atau 'jaringan'
     (alamat bertanda &j=1, petugas tidak ikut campur). `null` = belum
     diputuskan: elemen digambar tanpa <source> supaya tidak ada yang dimuat.
     Sumber tidak boleh berganti selama elemen hidup (Chrome menolak jawaban
     Range yang berpindah sumber), maka `key` elemen ikut memuatnya. */
  const [sumber, setSumber] = useState<'simpanan' | 'jaringan' | null>(null)
  /* Jalur cadangan (lihat alamatVideoCadangan): dicoba sekali per video
     bila sumber jaringan gagal; kalau ini pun gagal, baru kotak galat. */
  const [cadangan, setCadangan] = useState(false)
  useEffect(() => {
    let hidup = true
    const putuskan = simpananTersedia()
      ? apakahTersimpan(alamatAnim(berkas))
      : Promise.resolve(false)
    void putuskan.then((ada) => {
      if (!hidup) return
      setCadangan(false)
      setSumber(ada ? 'simpanan' : 'jaringan')
    })
    return () => {
      hidup = false
    }
  }, [berkas, percobaan])
  /* Waktu yang dipulihkan saat elemen dibuat ulang dengan sumber lain
     (tombol hapus simpanan ditekan saat videonya sedang diputar dari
     simpanan): elemen baru mulai dari detik yang sama. */
  const pulihkan = useRef<{ detik: number; putar: boolean } | null>(null)

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
  }, [tampil, berkas, percobaan, sumber])

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
  }, [berkas, percobaan, geser, sumber])

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
  }, [berkas, percobaan, geser, sumber])

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
    // `sumber` ikut (15 Sep 2026): elemen dibuat ulang saat sumbernya
    // diputuskan (simpanan atau jaringan), pendengar harus pindah ke sana.
  }, [berkas, percobaan, sumber])

  const ubah = (arah: -1 | 1) => {
    simpanAngka(
      KUNCI_UKURAN,
      Math.min(UKURAN.length - 1, Math.max(0, tingkat + arah)),
    )
  }

  /* Simpanan video di perangkat (Cache Storage). Petugas public/sw.js
     melayani dari simpanan; yang mengisinya halaman ini: begitu video
     ditonton hampir habis (AMBANG_SIMPAN) dan simpan otomatis hidup, berkas
     diunduh utuh lalu disimpan (lib/simpanan-video.ts menjelaskan kenapa
     unduhan kedua ini dipilih). `null` = tidak ada petugas (peramban lama,
     atau bukan https): barisnya tidak digambar. Kegagalan (kuota penuh,
     jaringan) hanya dicoba sekali per pemuatan halaman. */
  const [keadaan, setKeadaan] = useState<KeadaanSimpanan | null>(null)
  const [ringkasan, setRingkasan] = useState<RingkasanSimpanan | null>(null)
  const otomatis = useSyncExternalStore(
    langgan,
    () => bacaAngka(KUNCI_SIMPAN, 1),
    () => 1,
  )
  // Dibaca di dalam pendengar timeupdate tanpa memasang ulang pendengarnya
  // tiap saklar diubah; diperbarui lewat efek (aturan react-hooks/refs
  // melarang menulis ref saat render).
  const otomatisRef = useRef(otomatis)
  useEffect(() => {
    otomatisRef.current = otomatis
  }, [otomatis])
  useEffect(() => {
    if (!simpananTersedia()) return
    let hidup = true
    let sibuk = false
    let gagalSekali = false
    const alamat = alamatAnim(berkas)
    const periksa = async () => {
      const [ada, ringkas] = await Promise.all([apakahTersimpan(alamat), ringkasanSimpanan()])
      if (!hidup) return
      setKeadaan((k) => (ada ? 'tersimpan' : k === 'menyimpan' ? k : 'belum'))
      setRingkasan(ringkas)
    }
    void periksa()
    const v = video.current
    const cobaSimpan = () => {
      if (!v || sibuk || gagalSekali || otomatisRef.current !== 1) return
      if (!Number.isFinite(v.duration) || v.duration <= 0) return
      if (v.currentTime / v.duration < AMBANG_SIMPAN && !v.ended) return
      sibuk = true
      setKeadaan((k) => (k === 'tersimpan' ? k : 'menyimpan'))
      void simpanVideo(alamat, alamatVideoCadangan(berkas)).then((berhasil) => {
        if (!hidup) return
        if (!berhasil) {
          gagalSekali = true
          setKeadaan('belum')
        }
        sibuk = false
        void periksa()
      })
    }
    v?.addEventListener('timeupdate', cobaSimpan)
    v?.addEventListener('ended', cobaSimpan)
    const pulih = () => {
      const p = pulihkan.current
      if (!v || !p) return
      pulihkan.current = null
      v.currentTime = p.detik
      if (p.putar) void v.play().catch(() => {})
    }
    v?.addEventListener('loadedmetadata', pulih)
    return () => {
      hidup = false
      v?.removeEventListener('timeupdate', cobaSimpan)
      v?.removeEventListener('ended', cobaSimpan)
      v?.removeEventListener('loadedmetadata', pulih)
    }
  }, [berkas, percobaan, sumber, cadangan])
  const hapusSimpanan = () => {
    void hapusSemuaSimpanan().then(() => {
      setKeadaan('belum')
      setRingkasan({ jumlah: 0, byte: 0 })
      if (sumber === 'simpanan') {
        // elemen ini dilayani dari simpanan yang barusan dihapus: buat ulang
        // dengan sumber jaringan, lanjut dari detik yang sama
        const v = video.current
        pulihkan.current = { detik: v?.currentTime ?? 0, putar: !!v && !v.paused && !v.ended }
        setSumber('jaringan')
      }
    })
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
        key={`${berkas}-${percobaan}-${sumber ?? 'tunggu'}${cadangan ? '-cadangan' : ''}`}
        ref={video}
        onError={() => {
          // sumber jaringan gagal: coba jalur cadangan dulu, baru menyerah
          if (sumber === 'jaringan' && !cadangan && alamatVideoCadangan(berkas)) {
            setCadangan(true)
            return
          }
          setGalat(true)
        }}
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
        {sumber !== null && (
          <source src={sumber === 'simpanan' ? alamatAnim(berkas)
                       : cadangan ? alamatVideoCadangan(berkas) : alamatVideoJaringan(berkas)}
                  type={berkas.endsWith('.mp4') ? 'video/mp4' : 'video/webm'} />
        )}
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

      {/* Baris simpanan: memberi tahu siswa videonya sudah ada di perangkat
          (tidak diunduh lagi, bisa tanpa jaringan) dan menyediakan tombol
          hapus untuk yang memorinya sempit. */}
      {keadaan !== null && (
        <div className="simpanan-video">
          {keadaan === 'tersimpan' && (
            <span className="ada">Tersimpan di perangkat: diputar lagi tanpa mengunduh</span>
          )}
          {keadaan === 'menyimpan' && <span>Menyimpan video di perangkat...</span>}
          {keadaan === 'belum' && (
            <span>
              {otomatis
                ? 'Tersimpan otomatis di perangkat setelah ditonton hampir habis'
                : 'Tidak disimpan di perangkat'}
            </span>
          )}
          <button type="button" className="saklar"
                  aria-pressed={otomatis === 1}
                  onClick={() => simpanAngka(KUNCI_SIMPAN, otomatis ? 0 : 1)}>
            Simpan otomatis {otomatis ? 'hidup' : 'mati'}
          </button>
          {ringkasan !== null && ringkasan.jumlah > 0 && (
            <button type="button" onClick={hapusSimpanan}>
              Hapus simpanan ({ringkasan.jumlah} video, {teksMB(ringkasan.byte)})
            </button>
          )}
        </div>
      )}
    </div>
  )
}
