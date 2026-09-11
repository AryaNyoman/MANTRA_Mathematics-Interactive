'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { aturSesi, masukFokus, useSesiBelajar } from '@/lib/sesi-belajar'
import LaciLanjut from './LaciLanjut'

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
 */

const TAB = [
  { href: '/', nama: 'Beranda' },
  { href: '/peta-materi', nama: 'Peta Materi' },
  { href: '/latihan', nama: 'Latihan' },
  { href: '/tentang', nama: 'Tentang' },
] as const

export default function Nav({ label }: { label?: string }) {
  const [buka, setBuka] = useState(false)
  const jalur = usePathname() ?? '/'
  const sesi = useSesiBelajar()

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

  // Mode fokus menyembunyikan nav itu sendiri. Tombol keluarnya ada di
  // halaman belajar, ditambah tombol Esc.
  if (diBelajar && sesi.fokus) return null

  return (
    <nav className="nav" data-belajar={diBelajar} aria-label="Navigasi utama">
      <Link
        href="/"
        className="merk"
        aria-label="MANTRA, Matematika Interaktif, halaman depan"
        onClick={tutup}
      >
        {/* Lambang "M" saja (ARYA 10 Sep 2026); tulisan MANTRA ada di
            aria-label supaya pembaca layar tetap tahu tautannya ke mana. */}
        <Image
          src="/mantra/mantra-simbol-gelap.png"
          alt=""
          width={490}
          height={485}
          className="merk-ikon"
          priority
        />
      </Link>

      <div className="nav-menu" id="nav-menu" data-buka={buka}>
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
              <span className="nav-tab-garis" aria-hidden />
            </Link>
            {t.href === '/peta-materi' && <LaciLanjut onPilih={tutup} />}
          </Fragment>
        ))}
      </div>

      <span className="nav-meta" title={judulTerakhir}>
        {labelTerakhir}
      </span>

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
