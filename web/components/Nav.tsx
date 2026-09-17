'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect, useRef, useState } from 'react'
import { aturSesi, masukFokus, useSesiBelajar } from '@/lib/sesi-belajar'
import { cariTopik } from '@/content/topik'
import LaciLanjut from './LaciLanjut'
import TombolGuru from './TombolGuru'

/**
 * Nav MANTRA v2, arah "Panggung Sinema" (4 Sep 2026).
 * Patokan: `docs/desain-mantra/MANTRA-v2.dc.html` baris 46 sampai 82.
 *
 * Yang berubah dari v1: nav bukan lagi kertas tembus pandang, melainkan
 * PERMUKAAN navy. Itu keputusan rancangan yang paling menentukan rasa
 * seluruh situs, karena nav ada di tiap halaman. Kilau yang menyapu
 * berulang di tombol Lanjutkan dibuang: gerak berulang tanpa alasan
 * melanggar aturan gerak v2.
 *
 * Satu baris yang TIDAK PERNAH membungkus: logo tetap, deretan tab boleh
 * menyusut, label materi terakhir boleh terpotong dengan elipsis (teks
 * lengkapnya ada di `title`).
 *
 * REVISI ARYA 10 Sep 2026: logo cukup lambang "M" tanpa tulisan MANTRA, dan
 * "Lanjutkan" bukan lagi pil di ujung kanan melainkan laci di samping
 * "Peta Materi" yang memperlihatkan kemajuan tiap bab (`LaciLanjut`).
 * Alasannya ada di berkas komponen itu.
 *
 * Di halaman belajar: pil "Mode fokus" di kanan, dan di HP muncul pil
 * "Materi 03" yang membuka laci daftar materi. Nomor materinya datang dari
 * `HalamanTopik` lewat `sesi-belajar`.
 *
 * Di bawah 860 piksel tab pindah ke balik tombol dua garis yang berubah
 * jadi tanda silang. Aturan itu warisan sesi UI/UX (2 Sep) yang menemukan
 * isi nav butuh 428 piksel padahal layar HP 375, sehingga seluruh situs
 * bisa digeser menyamping.
 *
 * SISTEM GERAK PANGGUNG (17 Sep 2026): nav dirakit SEKALI di `app/layout.tsx`
 * dan menjadi jangkar yang diam saat halaman di bawahnya berpindah (lihat
 * globals.css bagian "A. Pindah halaman"). Akibatnya:
 * - label per halaman tidak lagi datang dari prop; nav menurunkannya sendiri
 *   dari alamat (`labelDariAlamat`), dan halaman belajar menimpanya lewat
 *   `sesi-belajar` seperti sebelumnya;
 * - saat mode fokus nav TIDAK mengembalikan `null` lagi, melainkan tetap
 *   dirakit dengan `data-fokus` (CSS menaikkannya keluar layar) dan `inert`
 *   (tidak bisa dijangkau Tab), supaya keluarnya dan masuknya kembali punya
 *   gerak, bukan hilang mendadak;
 * - garis emas tab aktif adalah SATU elemen (`.nav-garis`) yang berpindah dari
 *   tab lama ke tab baru; posisinya diukur di sini dan ditulis ke CSS variable.
 */

const TAB = [
  { href: '/', nama: 'Beranda' },
  { href: '/peta-materi', nama: 'Peta Materi' },
  { href: '/latihan', nama: 'Latihan' },
  { href: '/tentang', nama: 'Tentang' },
] as const

/** Label "terakhir dibuka" untuk halaman yang bukan halaman belajar. */
function labelDariAlamat(jalur: string): string | undefined {
  if (jalur === '/latihan') return 'Latihan'
  if (jalur === '/latihan/contoh-gambar') return 'Contoh gambar soal'
  const [, awal, slug] = jalur.split('/')
  if (!slug) return undefined
  const topik = cariTopik(slug)
  if (!topik) return undefined
  if (awal === 'latihan') return `Latihan ${topik.nama}`
  if (awal === 'topik') return topik.nama
  return undefined
}

export default function Nav() {
  const [buka, setBuka] = useState(false)
  const jalur = usePathname() ?? '/'
  const sesi = useSesiBelajar()
  const akar = useRef<HTMLElement>(null)
  const label = labelDariAlamat(jalur)

  // Esc menutup menu. Tanpa ini, di layar sentuh yang memakai papan ketik
  // luar menu hanya bisa ditutup dengan menekan tombolnya lagi.
  useEffect(() => {
    if (!buka) return
    const saatTekan = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setBuka(false)
    }
    window.addEventListener('keydown', saatTekan)
    return () => window.removeEventListener('keydown', saatTekan)
  }, [buka])

  // Menu HP ditutup tiap kali alamat berubah. Tanpa ini menu tetap terbuka
  // menutupi halaman baru yang barusan dibuka dari dalam menu itu sendiri.
  //
  // Lewat requestAnimationFrame, BUKAN setBuka(false) langsung: React 19
  // melarang setState serentak di badan effect (react-hooks/set-state-in-effect)
  // karena memicu gambar ulang berantai. Pola yang sama dipakai di
  // `PetaMateri` dan `HalamanTopik`.
  useEffect(() => {
    const id = requestAnimationFrame(() => setBuka(false))
    return () => cancelAnimationFrame(id)
  }, [jalur])

  const tutup = () => setBuka(false)
  const aktif = (href: string) =>
    href === '/' ? jalur === '/' : jalur.startsWith(href)

  const diBelajar = sesi.aktif
  const labelTerakhir = sesi.judul || label || 'Matematika SMA'
  const judulTerakhir = sesi.judulPanjang || label || 'Matematika SMA, Kelas 10 sampai 12'
  // Mode fokus menyembunyikan nav itu sendiri (lewat CSS, bukan `return null`,
  // supaya ada geraknya). Tombol keluarnya ada di halaman belajar, plus Esc.
  const fokus = diBelajar && sesi.fokus

  /* Garis tab aktif: diukur dari tab yang `aria-current="page"` dan ditulis ke
     `--garis-x`, `--garis-y`, `--garis-w` pada nav; CSS menggesernya dengan
     transform. Diukur ulang saat alamat berganti, saat lebar jendela
     berubah, dan saat huruf selesai dimuat (lebar tab ikut hurufnya).
     Transisi baru dinyalakan SESUDAH pengukuran pertama (`data-siap`) supaya
     saat halaman dimuat garisnya langsung di tempat, bukan meluncur dari
     pojok kiri. */
  useEffect(() => {
    const nav = akar.current
    if (!nav) return
    const ukur = () => {
      const garis = nav.querySelector<HTMLElement>('.nav-garis')
      const aktif = nav.querySelector<HTMLElement>('.nav-tab[aria-current="page"]')
      if (!garis) return
      if (!aktif) {
        nav.style.setProperty('--garis-w', '0')
        return
      }
      // 12 px = padding kiri kanan tab; garis 2 px, 4 px di atas dasar tab.
      nav.style.setProperty('--garis-x', `${aktif.offsetLeft + 12}px`)
      nav.style.setProperty('--garis-y', `${aktif.offsetTop + aktif.offsetHeight - 6}px`)
      nav.style.setProperty('--garis-w', `${Math.max(0, aktif.offsetWidth - 24)}`)
      if (garis.dataset.siap !== 'true') {
        requestAnimationFrame(() => {
          garis.dataset.siap = 'true'
        })
      }
    }
    ukur()
    let hidup = true
    document.fonts?.ready.then(() => {
      if (hidup) ukur()
    })
    window.addEventListener('resize', ukur)
    return () => {
      hidup = false
      window.removeEventListener('resize', ukur)
    }
  }, [jalur, diBelajar])

  return (
    <nav
      ref={akar}
      className="nav"
      data-belajar={diBelajar}
      data-fokus={fokus}
      inert={fokus || undefined}
      aria-label="Navigasi utama"
    >
      <Link
        href="/"
        className="merk"
        aria-label="MANTRA, Matematika Interaktif, halaman depan"
        onClick={tutup}
      >
        {/* Logo penuh, lambang plus tulisan MANTRA (ARYA 13 Sep 2026
            mengembalikannya; 10 Sep sampai 13 Sep sempat lambang "M" saja). */}
        <Image
          src="/mantra/mantra-penuh-gelap.png"
          alt=""
          width={1592}
          height={485}
          className="merk-ikon"
          priority
        />
      </Link>

      {/* `.nav-menu-isi` satu anak supaya di HP tinggi menu bisa dianimasikan
          lewat grid-template-rows 0fr ke 1fr; di layar lebar keduanya
          `display: contents` dan tidak menggambar kotak apa pun. */}
      <div className="nav-menu" id="nav-menu" data-buka={buka}>
        <div className="nav-menu-isi">
          {TAB.map((t) => (
            <Fragment key={t.href}>
              <Link
                href={t.href}
                className="nav-tab"
                data-aktif={aktif(t.href)}
                aria-current={aktif(t.href) ? 'page' : undefined}
                onClick={tutup}
              >
                {t.nama}
              </Link>
              {t.href === '/peta-materi' && <LaciLanjut onPilih={tutup} />}
            </Fragment>
          ))}
        </div>
      </div>
      <span className="nav-garis" aria-hidden />

      {/* `key`: elemennya dibuat baru tiap teksnya berganti, jadi animasi
          memudar masuknya berjalan hanya saat label memang berubah. */}
      <span className="nav-meta" key={labelTerakhir} title={judulTerakhir}>
        {labelTerakhir}
      </span>

      {/* Mode guru di ujung kanan, tidak di halaman belajar (ARYA 13 Sep 2026:
          halaman materi tempat mode fokus). */}
      {!diBelajar && <TombolGuru />}

      {diBelajar && (
        <button
          type="button"
          className="nav-lanjut nav-fokus"
          title="Layar penuh, tanpa nav dan daftar materi (Esc untuk keluar)"
          onClick={masukFokus}
        >
          <span aria-hidden>&#9974;</span>Mode fokus
        </button>
      )}

      {diBelajar && (
        <>
          <button
            type="button"
            className="nav-materi"
            aria-label="Buka daftar materi"
            onClick={() => aturSesi({ laci: true })}
          >
            Materi <span className="nav-materi-no">{sesi.no}</span>
          </button>
          <button
            type="button"
            className="nav-fokus-kecil"
            aria-label="Mode fokus"
            onClick={masukFokus}
          >
            <span aria-hidden>&#9974;</span>
          </button>
        </>
      )}

      <button
        type="button"
        className="nav-tombol"
        data-buka={buka}
        aria-expanded={buka}
        aria-controls="nav-menu"
        aria-label={buka ? 'Tutup menu' : 'Buka menu'}
        onClick={() => setBuka((b) => !b)}
      >
        <span aria-hidden />
        <span aria-hidden />
      </button>
    </nav>
  )
}
