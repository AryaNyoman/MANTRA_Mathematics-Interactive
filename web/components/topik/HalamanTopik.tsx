'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import PemutarVideo from '@/components/PemutarVideo'
import Penjelasan from '@/components/topik/Penjelasan'
import Latihan from '@/components/topik/Latihan'
import Kuis from '@/components/topik/Kuis'
import type { IsiTopik } from '@/components/topik/jenis'
import { ISI_TOPIK } from '@/content/daftar-isi'
import type { Topik } from '@/content/topik'
import { cariBab, type SubBab } from '@/content/subbab'
import { bacaAngka, langgan, simpanAngka } from '@/lib/simpanan'
import {
  bacaKemajuan, catatDibuka, tambahDetik, kuisTerbuka, MENIT_MINIMUM,
} from '@/lib/kemajuan'
import { aturSesi, daftarkanAkar, keluarFokus, lepasSesi, useSesiBelajar } from '@/lib/sesi-belajar'
import PenggeserEmas from '@/components/mantra/PenggeserEmas'

type Layar = { jenis: 'tahap'; slug: string } | { jenis: 'latihan' } | { jenis: 'kuis' }

/**
 * Di bawah 1180 piksel kolom ALAT di kanan tidak muat lagi tanpa memeras
 * kolom bacaan sampai di bawah lebar baca yang nyaman. Di sana kolom itu
 * dilepas, dan siswa memilih sendiri mau menonton atau mencoba lewat
 * segmen "Tonton / Coba sendiri".
 *
 * Dibaca lewat `useSyncExternalStore`, bukan disalin ke state lewat effect:
 * nilainya selalu segar, dan hasil rakitan server (`false`) tidak pernah
 * bertabrakan dengan hasil di peramban.
 */
const KUERI_PADAT = '(max-width: 1180px)'
function langganPadat(ubah: () => void) {
  const m = window.matchMedia(KUERI_PADAT)
  m.addEventListener('change', ubah)
  return () => m.removeEventListener('change', ubah)
}
function bacaPadat() {
  return window.matchMedia(KUERI_PADAT).matches
}

/** Lebar awal kolom ALAT, dalam piksel. Sama dengan rancangan. */
const LEBAR_ALAT_BAWAAN = 380
const KUNCI_LEBAR = 'matra:lebar-alat'

/** Berapa soal yang dikerjakan dalam satu sesi kuis, diambil dari bank soal. */
const SOAL_PER_SESI = 8

const dua = (n: number) => String(n).padStart(2, '0')

/**
 * Rangka halaman materi, dipakai SEMUA topik.
 *
 * PEROMBAKAN 3 Sep 2026 (rancangan MANTRA): deretan tab "MATERI 01 sampai 10"
 * diganti SIDEBAR POHON. Alasannya bukan selera. Sepuluh tab bernomor tidak
 * memberi tahu apa pun tentang isinya, dan tidak memperlihatkan bahwa materi
 * berkelompok mengikuti bab buku. Pohon memberi tiga hal sekaligus: nama tiap
 * materi, sub-bab tempatnya bernaung, dan tanda mana yang sudah dibuka.
 *
 * Urutan materi mengikuti SUB-BAB (`content/subbab.ts`), bukan nomornya. Untuk
 * Vektor, materi 10 ada di sub-bab penutup "Penerapan", jadi ia datang paling
 * akhir walau nomornya di tengah.
 *
 * Sidebar bisa dikuncupkan jadi rel selebar 62 piksel. Rel itu tetap menyimpan
 * huruf sub-bab dan nomor materi, jadi siswa tidak pernah kehilangan tempatnya
 * saat ingin ruang baca lebih lebar.
 *
 * Syarat kunci kuis DITULIS apa adanya di kaki sidebar. Sebelumnya syaratnya
 * sengaja disembunyikan dan hanya ada ajakan halus; rancangan baru membalik
 * itu, sebab tombol mati tanpa keterangan membuat siswa mengira situsnya rusak.
 */
export default function HalamanTopik({ topik }: { topik: Topik }) {
  const isi = ISI_TOPIK[topik.slug]

  // Pencarian isi sengaja dilakukan di sini, DI LUAR komponen yang memakai
  // hook. Kalau digabung, keluar lebih awal saat isinya belum ada akan
  // melanggar aturan urutan hook React.
  if (!isi) return null

  return <Rangka topik={topik} isi={isi} />
}

function Rangka({ topik, isi }: { topik: Topik; isi: IsiTopik }) {
  const { tahap: TAHAP, latihan: LATIHAN, kuis: KUIS, kanal: KANAL, Panggung } = isi
  const bab = cariBab(topik.slug)

  // Sub-bab yang benar-benar punya materinya. Kalau `subbab.ts` menyebut nomor
  // yang belum ada isinya, nomor itu dibuang di sini supaya sidebar tidak
  // memperlihatkan baris kosong.
  const subbab: SubBab[] = (bab?.sub ?? [{ huruf: 'A', nama: topik.nama, nomor: TAHAP.map((t) => t.no) }])
    .map((s) => ({ ...s, nomor: s.nomor.filter((n) => TAHAP.some((t) => t.no === n)) }))
    .filter((s) => s.nomor.length > 0)
  const urut = subbab.flatMap((s) => s.nomor)
  const tahapDari = (n: number) => TAHAP.find((t) => t.no === n)
  const subDariNomor = (n: number) => subbab.find((s) => s.nomor.includes(n))

  /* --- materi mana yang dibuka lebih dulu -------------------------------
     Peta Materi menautkan langsung ke satu materi lewat `?materi=`, jadi
     siswa yang mengklik "Materi 07" di sana harus mendarat di materi 07,
     bukan selalu di materi pertama. Nilai yang diterima:
       ?materi=<slug tahap>   membuka materi itu
       ?materi=<nomor>        sama, tetapi memakai nomor yang dilihat siswa
       ?materi=latihan        membuka layar latihan
       ?materi=kuis           membuka layar kuis kalau syaratnya sudah lewat
     Alamat yang tidak dikenali diabaikan diam-diam dan jatuh ke materi
     pertama: tautan salah ketik tidak boleh membuat halaman kosong. */
  const awalDari = (minta: string | null): Layar => {
    const utama: Layar = { jenis: 'tahap', slug: tahapDari(urut[0])?.slug ?? TAHAP[0].slug }
    if (!minta) return utama
    if (minta === 'latihan') return { jenis: 'latihan' }
    if (minta === 'kuis') return { jenis: 'kuis' }
    const lewatSlug = TAHAP.find((t) => t.slug === minta && t.siap)
    if (lewatSlug) return { jenis: 'tahap', slug: lewatSlug.slug }
    const n = Number(minta)
    const lewatNomor = Number.isFinite(n) ? TAHAP.find((t) => t.no === n && t.siap) : undefined
    return lewatNomor ? { jenis: 'tahap', slug: lewatNomor.slug } : utama
  }

  const minta = useSearchParams()?.get('materi') ?? null
  const [layarPilih, setLayar] = useState<Layar>(() => awalDari(minta))
  // Tahap yang punya video menampilkan salah satu saja pada satu waktu,
  // supaya panggung tetap satu layar tanpa gulir atas-bawah.
  const [mode, setMode] = useState<'coba' | 'tonton'>('tonton')
  const [rel, setRel] = useState(false)
  /* Laci daftar materi, HANYA berlaku di layar HP.
     Sebelum ini sidebar ditumpuk di atas isi materi dan tingginya dipatok
     60% layar, sehingga daftarnya terpotong di tengah baris dan baris Latihan
     serta Kuis terlihat menindih materi yang terpotong itu (temuan ARYA di
     HP, 3 Sep 2026). Rancangannya memang bukan tumpukan: "sidebar pohon
     berubah jadi laci yang digeser dari kiri" (HANDOFF bagian tampilan HP). */
  /* Laci daftar materi dan mode fokus TIDAK disimpan di sini, melainkan di
     `lib/sesi-belajar`. Sebabnya: keduanya dikendalikan dari nav, dan nav
     adalah komponen SAUDARA, bukan anak. Lihat catatan di berkas itu. */
  const sesi = useSesiBelajar()
  const laci = sesi.laci
  const fokus = sesi.fokus
  const setLaci = (buka: boolean) => aturSesi({ laci: buka })
  // Materi yang centangnya sedang meletup. Sekali saja, saat pertama dibuka.
  const [letup, setLetup] = useState<string | null>(null)

  /* Memilih layar SEKALIGUS menutup laci. Di HP, laci yang tetap terbuka
     setelah materi dipilih menutupi materi yang baru saja dibuka. */
  const pilihLayar = (l: Layar) => {
    setLayar(l)
    setLaci(false)
  }

  /* --- kemajuan, dibaca sebagai "external store" ------------------------
     BUKAN useState yang diperbarui di dalam useEffect. Dua alasan:
     1. React 19 melarang setState langsung di badan effect
        (react-hooks/set-state-in-effect), karena memicu render berantai.
     2. `catatDibuka` dan `tambahDetik` menulis lewat `tulis()` di simpanan.ts,
        yang sudah memberi tahu semua pendengar, jadi nilai di bawah ikut
        segar sendiri tanpa perlu disalin ke state.

     Nilai server sengaja kosong: localStorage baru terbaca di peramban.

     Dibaca SEBELUM `layar` dipakai, sebab `terbuka` ikut menentukan layar
     mana yang boleh ditampilkan. */
  const kemajuanJson = useSyncExternalStore(
    langgan,
    () => JSON.stringify(bacaKemajuan(topik.slug)),
    () => JSON.stringify({ dibuka: [], detik: 0 }),
  )
  const kemajuan = JSON.parse(kemajuanJson) as ReturnType<typeof bacaKemajuan>
  const dibuka = new Set(kemajuan.dibuka)
  const terbuka = kuisTerbuka(kemajuan, TAHAP.length)
  const jumlahDibuka = urut.filter((n) => dibuka.has(tahapDari(n)?.slug ?? '')).length
  const persen = Math.round((jumlahDibuka / urut.length) * 100)
  const menitKurang = Math.max(0, MENIT_MINIMUM - Math.floor(kemajuan.detik / 60))

  /* Kunci kuis dijaga di SINI, bukan hanya di tombolnya. Alamat `?materi=kuis`
     bisa diketik sendiri, dan kalau syaratnya belum lewat siswa dilempar ke
     latihan, bukan diberi kuis lewat pintu belakang. */
  /* `useMemo` bukan hiasan: `layar` dipakai sebagai kebergantungan effect di
     bawah. Tanpa memo, cabang kuis-terkunci membuat OBJEK BARU tiap render,
     jadi effect-nya berjalan terus-menerus. */
  const layar: Layar = useMemo(
    () => (layarPilih.jenis === 'kuis' && !terbuka ? { jenis: 'latihan' } : layarPilih),
    [layarPilih, terbuka],
  )

  const tahap = layar.jenis === 'tahap' ? TAHAP.find((t) => t.slug === layar.slug) : undefined
  const adaVideo = Boolean(tahap?.video)

  /* Layar lebar memperlihatkan KEDUANYA sekaligus: animasi di atas bacaan,
     alat di kolom kanan. Itu perubahan v2 yang paling mengubah cara halaman
     ini dipakai. Sebelumnya keduanya bergantian lewat tombol Tonton / Coba
     sendiri, dan di layar 1440 piksel itu menyia-nyiakan sepertiga layar
     yang kosong di kanan.

     Tombol pilihannya tetap ada, TAPI hanya di bawah 1180 piksel, tempat
     kolom alat memang tidak muat. */
  const padat = useSyncExternalStore(langganPadat, bacaPadat, () => false)

  /* Lebar kolom ALAT bisa ditarik siswa, seperti di rancangan. Ada yang mau
     alatnya besar supaya gambarnya enak dilihat, ada yang mau bacaannya
     lebar. Nilainya disimpan supaya pilihan itu tidak hilang tiap kali
     halaman dimuat ulang; kuncinya tetap berawalan `matra:` seperti seluruh
     simpanan proyek ini. */
  const lebarAlat = useSyncExternalStore(
    langgan,
    () => bacaAngka(KUNCI_LEBAR, LEBAR_ALAT_BAWAAN),
    () => LEBAR_ALAT_BAWAAN,
  )
  const [tarik, setTarik] = useState(false)
  const acuanPanggung = useRef<HTMLDivElement>(null)
  const akarHalaman = useRef<HTMLElement>(null)

  /* Penarik dipasang di JENDELA, bukan di gagangnya: jari atau tetikus yang
     bergerak cepat sering meninggalkan gagang selebar 10 piksel sebelum
     peristiwa berikutnya sampai, dan kalau pendengarnya menempel di gagang,
     tarikan berhenti di tengah jalan. */
  useEffect(() => {
    if (!tarik) return
    const geser = (e: PointerEvent) => {
      const k = acuanPanggung.current?.getBoundingClientRect()
      if (!k) return
      // Kolom bacaan dijaga tetap punya 360 piksel: di bawah itu barisnya
      // terlalu pendek untuk dibaca dengan nyaman.
      const maks = Math.min(k.width * 0.62, k.width - 360)
      const lebar = Math.round(Math.max(280, Math.min(maks, k.right - e.clientX)))
      if (Number.isFinite(lebar)) simpanAngka(KUNCI_LEBAR, lebar)
    }
    const lepas = () => setTarik(false)
    window.addEventListener('pointermove', geser)
    window.addEventListener('pointerup', lepas)
    window.addEventListener('pointercancel', lepas)
    return () => {
      window.removeEventListener('pointermove', geser)
      window.removeEventListener('pointerup', lepas)
      window.removeEventListener('pointercancel', lepas)
    }
  }, [tarik])
  const tampilWidget = !padat || !adaVideo || mode === 'coba'
  const tampilVideo = adaVideo && (!padat || mode === 'tonton')
  const pakaiMode = padat && adaVideo && Boolean(tahap?.widget)

  /* Pindah dari Peta Materi ke materi LAIN pada topik yang sama tidak memasang
     ulang komponen ini, jadi nilai awal di atas tidak dihitung lagi. Tanpa
     penyelaras ini, mengklik "Materi 07" saat halaman sudah terbuka di materi
     01 tidak akan mengubah apa pun. `terakhir` menahan supaya penyelaras ini
     hanya bekerja saat alamatnya benar-benar berganti, bukan tiap kali siswa
     memilih materi lewat sidebar. */
  const terakhirMinta = useRef(minta)
  useEffect(() => {
    if (terakhirMinta.current === minta) return
    terakhirMinta.current = minta
    if (!minta) return
    // requestAnimationFrame, bukan setLayar langsung: React 19 melarang
    // setState serentak di badan effect (react-hooks/set-state-in-effect).
    const id = requestAnimationFrame(() => setLayar(awalDari(minta)))
    return () => cancelAnimationFrame(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minta])

  useEffect(() => {
    if (layar.jenis !== 'tahap') return
    const baru = !bacaKemajuan(topik.slug).dibuka.includes(layar.slug)
    catatDibuka(topik.slug, layar.slug)
    if (baru) {
      // Centang meletup sekali, saat materi PERTAMA kali dibuka. Dijadwalkan
      // lewat requestAnimationFrame, bukan setState serentak: React 19
      // melarangnya di dalam effect (react-hooks/set-state-in-effect).
      const slug = layar.slug
      const bingkai = requestAnimationFrame(() => setLetup(slug))
      const id = window.setTimeout(() => setLetup(null), 600)
      return () => {
        cancelAnimationFrame(bingkai)
        window.clearTimeout(id)
      }
    }
  }, [layar, topik.slug])

  /* Selama laci terbuka, halaman di belakangnya dikunci supaya tidak ikut
     bergulir saat jari menggeser di atas tirai. Esc menutupnya, sama seperti
     menu nav. Keduanya dibersihkan saat laci ditutup, jadi tidak ada kunci
     yang tertinggal kalau siswa berpindah halaman selagi laci terbuka. */
  useEffect(() => {
    if (!laci) return
    const semula = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const saatTekan = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLaci(false)
    }
    window.addEventListener('keydown', saatTekan)
    return () => {
      document.body.style.overflow = semula
      window.removeEventListener('keydown', saatTekan)
    }
  }, [laci])

  /* Nav perlu tahu tiga hal dari halaman ini: bahwa ia sedang di halaman
     belajar, nomor materi yang sedang dibuka (untuk pil "Materi 03" di HP),
     dan ke mana tombol Lanjutkan harus membawa. Diterbitkan dari sini karena
     hanya di sini semuanya diketahui. */
  useEffect(() => {
    const no = tahap ? dua(tahap.no) : layar.jenis === 'latihan' ? 'LT' : 'KS'
    const nama =
      tahap ? `Materi ${dua(tahap.no)}` : layar.jenis === 'latihan' ? 'Latihan' : 'Kuis'
    aturSesi({
      aktif: true,
      no,
      judul: `${topik.nama} · ${nama}`,
      judulPanjang: tahap
        ? `${topik.nama}, Materi ${dua(tahap.no)}: ${tahap.judul}`
        : `${topik.nama}, ${nama}`,
      lanjut: `/topik/${topik.slug}`,
    })
  }, [tahap, layar, topik.nama, topik.slug])

  // Saat halaman belajar ditinggalkan, nav harus kembali normal. Tanpa ini
  // pil "Mode fokus" ikut terbawa ke Peta Materi dan beranda.
  useEffect(() => lepasSesi, [])

  // Esc keluar dari mode fokus. Ini SATU-SATUNYA jalan keluar yang selalu
  // ada: dalam mode fokus nav tidak tergambar, jadi tombol di sana tidak
  // bisa dipakai untuk membatalkannya.
  useEffect(() => {
    if (!fokus) return
    const saatTekan = (e: KeyboardEvent) => {
      if (e.key === 'Escape') keluarFokus()
    }
    window.addEventListener('keydown', saatTekan)
    return () => window.removeEventListener('keydown', saatTekan)
  }, [fokus])

  /* Layar penuh bisa dibatalkan tanpa lewat tombol kita: Esc bawaan
     peramban, F11, atau berpindah tab. Kalau keadaan fokus tidak ikut
     dimatikan, nav tetap tersembunyi padahal layarnya sudah kembali normal,
     dan siswa terjebak di halaman tanpa navigasi. */
  useEffect(() => {
    const saatBerubah = () => {
      if (!document.fullscreenElement) aturSesi({ fokus: false })
    }
    document.addEventListener('fullscreenchange', saatBerubah)
    return () => document.removeEventListener('fullscreenchange', saatBerubah)
  }, [])

  // Elemen halaman didaftarkan supaya `Nav` bisa meminta layar penuh
  // langsung di dalam klik, bukan lewat effect yang berjalan belakangan.
  useEffect(() => {
    daftarkanAkar(akarHalaman.current)
    return () => daftarkanAkar(null)
  }, [])

  // Waktu hanya bertambah selama tab benar-benar terlihat: meninggalkan
  // halaman semalaman tidak boleh dihitung sebagai membaca.
  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') tambahDetik(topik.slug, 15)
    }, 15000)
    return () => window.clearInterval(id)
  }, [topik.slug])

  // Tetangga dalam urutan belajar, untuk pasangan Kembali dan Lanjut.
  const posisi = tahap ? urut.indexOf(tahap.no) : -1
  const sebelum = posisi > 0 ? tahapDari(urut[posisi - 1]) : undefined
  const sesudah = posisi >= 0 && posisi < urut.length - 1 ? tahapDari(urut[posisi + 1]) : undefined
  const subKini = tahap ? subDariNomor(tahap.no) : undefined
  const subLanjut = sesudah ? subDariNomor(sesudah.no) : undefined
  const saranLanjut =
    subLanjut && subKini
      ? subLanjut.huruf === subKini.huruf
        ? `Masih di sub-bab ${subKini.huruf}`
        : `Masuk sub-bab ${subLanjut.huruf}`
      : ''

  const kuisSyarat = terbuka
    ? 'Terbuka'
    : `Buka ${TAHAP.length} materi (${jumlahDibuka}/${TAHAP.length})` +
      (menitKurang > 0 ? ` dan baca ${MENIT_MINIMUM} menit` : '')

  // `materi-satu-layar`: halaman ini TIDAK menggulir. Kotak materi mengisi
  // sisa layar di bawah nav, dan yang menggulir hanya isi di dalamnya
  // (daftar materi di kiri, bacaan di kanan). Permintaan ARYA 4 Sep 2026:
  // halaman belajar cukup satu layar. Di HP aturan ini dilepas, sebab di
  // sana kolom bertumpuk dan halaman memang harus menggulir.
  return (
    <main ref={akarHalaman} className="mantra-lebar materi-satu-layar" data-fokus={fokus}>
      {/* Dipasang DI SINI, bukan di `layout.tsx`. Halaman ini dirakit di
          balik batas Suspense, jadi komponen yang berada di luarnya sempat
          menyentuh penggeser sebelum widgetnya selesai dihidupkan di
          peramban, dan React melaporkannya sebagai ketidakcocokan hidrasi.
          Dari dalam sini efeknya baru berjalan setelah widget hidup. */}
      <PenggeserEmas />
      <div className="materi-panel">
        {/* Remah roti PINDAH ke atas kolom bacaan (lihat di bawah). Di v1 ia
            sebuah bilah selebar panel; di v2 ia baris pertama bacaan, sebab
            yang ia terangkan adalah bacaan itu, bukan seluruh halaman. */}
        {fokus && (
          <button
            type="button"
            className="keluar-fokus"
            title="Keluar layar penuh (Esc)"
            onClick={keluarFokus}
          >
            <span aria-hidden="true">✕</span>Keluar fokus <span className="tuts">Esc</span>
          </button>
        )}
        <div className="materi-badan" data-rel={rel}>
          {/* Tirai gelap di belakang laci. Sebuah tombol, bukan div: menutup
              laci harus bisa dilakukan tanpa tetikus, dan tombol sudah bisa
              ditekan lewat papan ketik tanpa tambahan apa pun. */}
          {laci && (
            <button
              type="button"
              className="tirai-laci"
              aria-label="Tutup daftar materi"
              onClick={() => setLaci(false)}
            />
          )}

          {/* ======================= SIDEBAR POHON ======================= */}
          <aside className="pohon" id="pohon-materi" data-laci={laci}>
            <div className="pohon-kepala">
              {!rel && (
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="bab">
                    {bab ? `Bab ${bab.no} · ${bab.kelas}` : topik.kelas}
                  </div>
                  <div className="nama">{topik.nama}</div>
                </div>
              )}
              {/* Dua tombol berbeda tugas, dan CSS yang memilih mana yang
                  tampil. Di layar lebar sidebar dikuncupkan jadi rel sempit;
                  di HP sidebar adalah laci, dan yang dibutuhkan adalah
                  menutupnya. Satu tombol dengan dua arti hanya membingungkan. */}
              <button
                type="button"
                className="pohon-togel"
                title={rel ? 'Lebarkan daftar materi' : 'Kuncupkan daftar materi'}
                aria-expanded={!rel}
                onClick={() => setRel((r) => !r)}
              >
                {rel ? '»' : '«'}
              </button>
              <button
                type="button"
                className="laci-tutup"
                aria-label="Tutup daftar materi"
                onClick={() => setLaci(false)}
              >
                ✕
              </button>
            </div>

            {/* Kemajuan pindah dari bilah remah ke kepala daftar materi.
                Di situ ia berdiri tepat di atas daftar yang ia hitung, jadi
                angkanya punya rujukan; di bilah atas ia cuma angka melayang. */}
            <div className="pohon-maju">
              <div className="pohon-bar" role="img" aria-label={`Kemajuan ${persen} persen`}>
                <span style={{ width: `${persen}%` }} />
              </div>
              {!rel && (
                <div className="pohon-maju-teks angka-rata">
                  {jumlahDibuka} dari {urut.length} materi dibuka · {persen}%
                </div>
              )}
            </div>

            <div className="pohon-gulir">
              {subbab.map((s) => (
                <div key={s.huruf}>
                  {rel ? (
                    <div className="pohon-sub-rel" title={s.nama}>
                      {s.huruf}
                    </div>
                  ) : (
                    <div className="pohon-sub">
                      <span className="huruf">{s.huruf}</span>
                      <span className="nama">{s.nama}</span>
                      <span className="hitung">
                        {s.nomor.filter((n) => dibuka.has(tahapDari(n)?.slug ?? '')).length}/
                        {s.nomor.length}
                      </span>
                    </div>
                  )}
                  {s.nomor.map((n) => {
                    const t = tahapDari(n)
                    if (!t) return null
                    const aktif = layar.jenis === 'tahap' && layar.slug === t.slug
                    const selesai = dibuka.has(t.slug)
                    return (
                      <button
                        key={t.slug}
                        type="button"
                        className="pohon-baris"
                        data-aktif={aktif}
                        data-selesai={selesai}
                        data-letup={letup === t.slug}
                        disabled={!t.siap}
                        title={t.siap ? t.judul : `${t.judul} (belum dibangun)`}
                        aria-current={aktif ? 'true' : undefined}
                        onClick={() => pilihLayar({ jenis: 'tahap', slug: t.slug })}
                      >
                        <span className="no">{dua(t.no)}</span>
                        {!rel && <span className="judul">{t.judul}</span>}
                        {!rel && (
                          <span className="status" aria-hidden="true">
                            {selesai ? '✓' : ''}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            {!rel && (
              <div className="pohon-kaki">
                <button type="button" onClick={() => pilihLayar({ jenis: 'latihan' })}>
                  <span className="ikon" aria-hidden="true">✎</span>
                  <span className="nama">Latihan</span>
                  <span className="hitung" style={{ fontSize: 11, color: 'var(--tinta-50)' }}>
                    {LATIHAN.length} soal
                  </span>
                </button>
                <button
                  type="button"
                  disabled={!terbuka}
                  onClick={() => terbuka && pilihLayar({ jenis: 'kuis' })}
                >
                  <span className="ikon" aria-hidden="true">★</span>
                  <span>
                    <span className="nama" style={{ display: 'block' }}>Kuis</span>
                    <span className="syarat">{kuisSyarat}</span>
                  </span>
                  <span className="lencana-kunci">{terbuka ? 'Siap' : 'Terkunci'}</span>
                </button>
              </div>
            )}
          </aside>

          {/* ======================= ISI MATERI ======================= */}
          <Panggung tahap={tahap} tampilWidget={tampilWidget}>
            {({ kiri, kanan, tanda }) => (
              <div
                className="panggung"
                ref={acuanPanggung}
                data-alat={!padat && Boolean(tahap)}
                data-tarik={tarik}
                style={
                  !padat && tahap
                    ? { gridTemplateColumns: `minmax(0, 1fr) 10px ${lebarAlat}px` }
                    : undefined
                }
              >
                {/* KOLOM BACAAN, di tengah. Di v1 kolom ini di kanan dan alat
                    di kiri; v2 membaliknya, sebab yang paling lama ditatap
                    adalah bacaannya, dan yang paling lama ditatap pantas
                    berada di tengah pandangan, bukan di tepi. */}
                <div className="kolom baca">
                  {/* Remah roti: kelas, bab, sub-bab, materi. */}
                  <div className="remah">
                    <button
                      type="button"
                      className="buka-laci"
                      aria-expanded={laci}
                      aria-controls="pohon-materi"
                      onClick={() => setLaci(true)}
                    >
                      <span aria-hidden="true">☰</span> Materi
                    </button>
                    {/* Dua remah pertama disembunyikan di layar HP. Remah tidak
                        boleh membungkus, dan rantai lengkapnya butuh 676 piksel:
                        di layar 375 ia mendorong seluruh halaman keluar 333
                        piksel (terukur 3 Sep). Yang dipertahankan adalah dua
                        remah terakhir, sebab itulah yang memberi tahu siswa di
                        mana ia sekarang. */}
                    <span className="remah-awal">{topik.kelas}</span>
                    <span className="remah-pisah remah-awal">/</span>
                    <span className="remah-awal">
                      {bab ? `Bab ${bab.no} · ` : ''}
                      {topik.nama}
                    </span>
                    {subKini && (
                      <>
                        <span className="remah-pisah remah-awal">/</span>
                        <span className="nama-sub">{subKini.nama}</span>
                      </>
                    )}
                    <span className="remah-pisah">/</span>
                    <span className="kini">
                      {tahap ? `Materi ${dua(tahap.no)}` : layar.jenis === 'latihan' ? 'Latihan' : 'Kuis'}
                    </span>
                  </div>

                  {/* Segmen Tonton / Coba sendiri HANYA muncul di layar sempit.
                      Di layar lebar keduanya tampil sekaligus, jadi tombol
                      pilihan di sana hanya akan menyembunyikan sesuatu yang
                      sudah muat. */}
                  {pakaiMode && (
                    <div className="pilih-mode" role="tablist" aria-label="Cara belajar materi ini">
                      <button type="button" role="tab" aria-selected={mode === 'tonton'} onClick={() => setMode('tonton')}>
                        Tonton
                      </button>
                      <button type="button" role="tab" aria-selected={mode === 'coba'} onClick={() => setMode('coba')}>
                        Coba sendiri
                      </button>
                    </div>
                  )}

                  {tahap && tampilVideo && tahap.video && (
                    <div className="layar layar-atas">
                      <PemutarVideo
                        berkas={tahap.video.berkas}
                        poster={tahap.video.poster}
                        judul={`Animasi: ${tahap.judul}`}
                      />
                    </div>
                  )}

                  {/* Di layar sempit alat dan tabelnya ikut turun ke kolom ini,
                      sebab kolom kanan tidak ada di sana. Di ATAS hanya kalau
                      materinya punya video (siswa memilih "Coba sendiri").
                      Tanpa video, alatnya disisipkan ke bacaan lewat
                      `sisipan` Penjelasan, di bawah kotak "Yuk bereksperimen"
                      (keputusan ARYA 5 Sep 2026). */}
                  {padat && tahap && tampilWidget && adaVideo && (
                    <div className="alat-sisip">
                      {kiri}
                      {kanan}
                    </div>
                  )}

                  {tahap ? (
                    <>
                      <div className="jalur">
                        {subKini ? `${subKini.huruf} · ` : ''}Materi {dua(tahap.no)}
                      </div>
                      <h1>{tahap.judul}</h1>
                      <div className="sub">{tahap.pertanyaan}</div>

                      <div className="blok">
                        <Penjelasan
                          blok={tahap.penjelasan}
                          sisipan={padat && !adaVideo && tampilWidget ? (
                            <div className="alat-sisip">
                              {kiri}
                              {kanan}
                            </div>
                          ) : undefined}
                        />
                      </div>

                      {tahap.seringKeliru && (
                        <div className="blok">
                          {/* Label ada DI DALAM kotak, bukan di atasnya.
                              Di luar kotak ia terbaca sebagai judul bagian
                              baru; di dalam ia terbaca sebagai peringatan
                              milik kotak itu. */}
                          <div className="miskon">
                            <div className="cap merah">Sering keliru</div>
                            <b>{tahap.seringKeliru.judul}</b>
                            <p style={{ margin: '6px 0 0' }}>{tahap.seringKeliru.isi}</p>
                            {tahap.seringKeliru.sumber && (
                              <div className="sumber">{tahap.seringKeliru.sumber}</div>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <h1>{layar.jenis === 'latihan' ? 'Latihan' : 'Uji paham'}</h1>
                      <div className="sub">
                        {layar.jenis === 'latihan'
                          ? 'Kerjakan dulu sendiri. Pembahasan sengaja disembunyikan.'
                          : 'Salah itu wajar, yang penting tahu di mana letak kelirunya.'}
                      </div>
                      <div className="blok bacaan">
                        <div className="cap">Cara memakainya</div>
                        <p>
                          {layar.jenis === 'latihan'
                            ? 'Empat soal dengan tingkat kesulitan menaik: dari menerapkan perbandingan, memeriksa syarat, menemukan kesalahan orang lain, sampai penerapan dua langkah. Buka pembahasan hanya setelah benar-benar mentok.'
                            : 'Delapan soal pilihan ganda. Setelah menjawab, Anda langsung melihat alasannya, termasuk kenapa pilihan yang keliru itu terasa masuk akal. Nilai terbaik disimpan di peramban ini saja.'}
                        </p>
                      </div>
                    </>
                  )}

                  {/* Soalnya datang SESUDAH judul dan keterangan cara
                      memakainya. Sampai 4 Sep 2026 keduanya berada di kolom
                      berbeda, jadi urutannya tidak pernah jadi soal; begitu
                      keduanya turun ke satu kolom, soal yang mendahului
                      judulnya membuat halaman terbuka di tengah pekerjaan. */}
                  {layar.jenis === 'latihan' && <Latihan soal={LATIHAN} />}

                  {layar.jenis === 'kuis' && (
                    /* 8 soal per sesi, diambil dari bank 32 soal, dan yang sudah
                       pernah keluar dihindari. Jadi mengulang kuis berarti
                       bertemu soal baru. (Permintaan ARYA, 1 Sep 2026.) */
                    <Kuis
                      bank={KUIS}
                      jumlah={SOAL_PER_SESI}
                      kunciSimpan={`matra:kuis:${topik.slug}`}
                      topik={topik.slug}
                    />
                  )}

                  {/* RINGKASAN ditaruh di BAWAH, tepat sebelum kotak YouTube.
                      Permintaan ARYA, dan ia menyatakan sudah berkali-kali
                      memintanya. Alasannya pedagogis: rangkuman berguna sebagai
                      penutup SETELAH siswa membaca materinya, bukan sebagai
                      pembuka yang membocorkan isinya sebelum dibaca. */}
                  {tahap && tahap.intisari && (
                    <div className="baca-cepat">
                      <div className="cap">Ringkasan</div>
                      <ol>
                        {tahap.intisari.map((b, i) => <li key={i}>{b}</li>)}
                      </ol>
                    </div>
                  )}

                  {/* Pasangan Kembali dan Lanjut. Lanjut menyebut NAMA materi
                      berikutnya, bukan cuma nomornya, plus satu petunjuk apakah
                      siswa masih di sub-bab yang sama atau berpindah. */}
                  {tahap && (
                    /* Bilah pindah materi LENGKET di dasar kolom bacaan.
                       Sebelum v2 ia sepasang kartu besar berisi judul materi
                       tetangga, dan letaknya di ujung bacaan: siswa yang baru
                       membaca separuh harus menggulir sampai habis dulu untuk
                       menemukannya. Sekarang ia selalu ada di bawah mata,
                       cukup satu baris. */
                    <div className="pindah-materi">
                      <button
                        type="button"
                        className="pindah-kembali"
                        disabled={!sebelum}
                        title={sebelum ? sebelum.judul : 'Ini materi pertama'}
                        onClick={() => sebelum && pilihLayar({ jenis: 'tahap', slug: sebelum.slug })}
                      >
                        ← Kembali
                      </button>
                      {/* Petunjuk sub-bab disembunyikan di HP: di sana baris
                          ini hanya muat untuk dua tombolnya. */}
                      {saranLanjut && <span className="pindah-petunjuk">{saranLanjut}</span>}
                      <button
                        type="button"
                        className="pindah-lanjut"
                        title={sesudah ? sesudah.judul : 'Uji dengan soal berjenjang'}
                        onClick={() =>
                          sesudah
                            ? pilihLayar({ jenis: 'tahap', slug: sesudah.slug })
                            : pilihLayar({ jenis: 'latihan' })
                        }
                      >
                        {sesudah ? `Lanjut · Materi ${dua(sesudah.no)}` : 'Ke latihan'}
                      </button>
                    </div>
                  )}

                  {/* Tautan kanal YouTube. Menuju HASIL PENCARIAN di kanal itu,
                      bukan halaman depan kanal: siswa cukup satu klik. */}
                  <div className="sesi-youtube">
                    <h2 className="youtube-judul">
                      <svg width="26" height="19" viewBox="0 0 28 20" aria-hidden="true">
                        <rect width="28" height="20" rx="5" fill="#C4302B" />
                        <path d="M11 5.6 19 10l-8 4.4V5.6Z" fill="#fff" />
                      </svg>
                      Pelajari lebih dalam lewat YouTube!
                    </h2>
                    <p className="youtube-antar">
                      Klik nama kanalnya, Anda langsung dibawa ke hasil pencarian topik
                      ini di kanal tersebut.
                    </p>
                    <ul className="tautan">
                      {KANAL.map((k) => (
                        <li key={k.handle}>
                          <a
                            href={`${k.url}/search?query=${encodeURIComponent(k.cari)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            ▶ {k.nama} <span className="mono">{k.handle}</span>
                          </a>
                          <span className="cari">{k.cari}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="sumber">
                      Tautan menuju kanal aslinya. Kami tidak mengunggah ulang video
                      siapa pun.
                    </div>
                  </div>
                </div>

                {/* KOLOM ALAT, di kanan. Hanya ada di layar lebar; di layar
                    sempit isinya disisipkan ke dalam kolom bacaan. Ia punya
                    gulirnya sendiri, jadi menggeser sudut di sini tidak
                    menggeser bacaan di sebelahnya. */}
                {/* Gagang penarik antara bacaan dan alat. `role="separator"`
                    beserta `aria-orientation` membuat pembaca layar
                    menyebutnya pemisah, bukan tombol tak bernama.
                    `touch-action: none` di CSS wajib: tanpa itu jari yang
                    menarik gagang justru menggulir halaman. */}
                {!padat && tahap && (
                  <div
                    className="tarik-alat"
                    role="separator"
                    aria-orientation="vertical"
                    aria-label="Tarik untuk mengubah lebar alat"
                    title="Tarik untuk memperbesar atau mengecilkan alat"
                    onPointerDown={(e) => {
                      e.preventDefault()
                      setTarik(true)
                    }}
                    onDoubleClick={() => simpanAngka(KUNCI_LEBAR, LEBAR_ALAT_BAWAAN)}
                  >
                    <span aria-hidden />
                  </div>
                )}

                {!padat && tahap && (
                  <aside className="kolom alat" aria-label="Alat interaktif">
                    <div className="alat-kepala">
                      <span className="tanda-alat">
                        {tahap.widget ? `ALAT · ${tanda}` : 'RINGKASAN'}
                      </span>
                      {tahap.widget && <span className="alat-ajak">Coba sendiri</span>}
                    </div>
                    {tahap.widget ? (
                      <>
                        {kiri}
                        {kanan}
                      </>
                    ) : (
                      <div className="alat-kosong">
                        <div className="cap">Intisari materi ini</div>
                        <ul className="intisari">
                          {(tahap.intisari ?? []).map((b, i) => <li key={i}>{b}</li>)}
                        </ul>
                      </div>
                    )}
                  </aside>
                )}
              </div>
            )}
          </Panggung>
        </div>
      </div>
    </main>
  )
}
