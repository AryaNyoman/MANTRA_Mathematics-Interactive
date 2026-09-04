'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

/**
 * Nav MANTRA (rancangan 3 Sep 2026, `docs/desain-mantra/HANDOFF.md`).
 *
 * Satu baris yang TIDAK PERNAH membungkus: logo tetap, deretan tab boleh
 * menyusut, label materi terakhir boleh terpotong dengan elipsis (teks
 * lengkapnya ada di `title`), dan pil "Lanjutkan" selalu utuh. Urutan itu
 * sengaja: yang paling berguna bagi siswa yang sedang belajar adalah tombol
 * untuk kembali ke tempat terakhir, jadi ia tidak boleh pernah terpotong.
 *
 * Tab aktif ditentukan dari alamat halaman, bukan dari prop, supaya tidak ada
 * dua sumber kebenaran saat pengguna membuka tautan langsung.
 *
 * Di bawah 860 piksel tab pindah ke balik tombol tiga garis. Aturan itu
 * warisan dari sesi UI/UX (2 Sep) yang menemukan isi nav butuh 428 piksel
 * padahal layar HP 375, sehingga seluruh situs bisa digeser menyamping.
 */

const TAB = [
  { href: '/', nama: 'Beranda' },
  { href: '/peta-materi', nama: 'Peta Materi' },
  { href: '/latihan', nama: 'Latihan' },
  { href: '/tentang', nama: 'Tentang' },
] as const

export default function Nav({ label, lanjut }: { label?: string; lanjut?: string }) {
  const [buka, setBuka] = useState(false)
  const jalur = usePathname() ?? '/'

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

  const tutup = () => setBuka(false)
  const aktif = (href: string) =>
    href === '/' ? jalur === '/' : jalur.startsWith(href)

  return (
    <nav className="nav">
      <Link
        href="/"
        className="merk"
        aria-label="MANTRA, Matematika Interaktif, halaman depan"
        onClick={tutup}
      >
        <Image
          src="/mantra/mantra-penuh.png"
          alt=""
          width={160}
          height={49}
          className="merk-ikon"
          priority
        />
      </Link>

      <div className="nav-menu" id="nav-menu" data-buka={buka}>
        {TAB.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="nav-tab"
            data-aktif={aktif(t.href)}
            aria-current={aktif(t.href) ? 'page' : undefined}
            onClick={tutup}
          >
            {t.nama}
          </Link>
        ))}
        <span className="nav-meta" title={label ?? 'Matematika SMA · Kelas 10–12'}>
          {label ?? 'Matematika SMA'}
        </span>
      </div>

      <Link href={lanjut ?? '/peta-materi'} className="nav-lanjut" onClick={tutup}>
        Lanjutkan
      </Link>

      <button
        type="button"
        className="nav-tombol"
        aria-expanded={buka}
        aria-controls="nav-menu"
        aria-label={buka ? 'Tutup menu' : 'Buka menu'}
        onClick={() => setBuka((b) => !b)}
      >
        <span aria-hidden />
        <span aria-hidden />
        <span aria-hidden />
      </button>
    </nav>
  )
}
