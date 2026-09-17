'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Satu jendela untuk semua: skor, lencana, konfirmasi keluar, dan mode guru
 * (sistem gerak Panggung tahap 2, 17 Sep 2026). Berbasis `<dialog>` bawaan
 * dengan `showModal()`, jadi kunci fokus (Tab tidak keluar), Esc, dan
 * fokus-kembali ke tombol pembuka diberikan peramban, bukan ditulis ulang.
 *
 * Geraknya di globals.css (`.dialog-mantra`): di layar lebar jendela
 * membesar sedikit dari tengah sambil memudar masuk dan tirainya memudar
 * lebih dulu; di HP jendela naik dari bawah seperti lembar. Keluar lebih
 * cepat. Keluarnya beranimasi karena `transition-behavior: allow-discrete`
 * pada `display` dan `overlay`; peramban lama cukup menutup seketika.
 *
 * `buka` yang berubah mengendalikan `showModal()` dan `close()`. Menutup
 * lewat Esc (peristiwa `cancel`) dan lewat ketukan pada tirai (target klik
 * adalah elemen dialog itu sendiri, bukan isinya) memanggil `onTutup`, dan
 * pemilik jendela yang mengubah keadaannya. Selama terbuka `body[data-jendela]`
 * dinyalakan supaya panggung di belakangnya boleh mundur sedikit.
 */
export default function Jendela({
  buka,
  onTutup,
  label,
  labelId,
  kelas = '',
  children,
}: {
  buka: boolean
  onTutup: () => void
  /** teks aria-label, atau pakai `labelId` yang menunjuk judul di dalam jendela */
  label?: string
  labelId?: string
  kelas?: string
  children: ReactNode
}) {
  const acuan = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = acuan.current
    if (!el) return
    if (buka && !el.open) {
      el.showModal()
      document.body.dataset.jendela = 'true'
    } else if (!buka && el.open) {
      el.close()
    }
  }, [buka])

  // Kalau komponennya dilepas selagi terbuka (pindah halaman), tanda pada
  // body harus ikut dicabut.
  useEffect(() => {
    const el = acuan.current
    return () => {
      const lain = [...document.querySelectorAll('dialog')].some((d) => d !== el && d.open)
      if (!lain) delete document.body.dataset.jendela
    }
  }, [])

  return (
    <dialog
      ref={acuan}
      className={`dialog-mantra ${kelas}`.trim()}
      aria-label={label}
      aria-labelledby={labelId}
      onClose={() => {
        // Dua jendela bisa terbuka bersamaan (skor dan lencana sesudah soal
        // ke-15): tanda pada body baru dicabut kalau tidak ada lagi yang terbuka.
        const lain = [...document.querySelectorAll('dialog')].some((d) => d !== acuan.current && d.open)
        if (!lain) delete document.body.dataset.jendela
        onTutup()
      }}
      onCancel={(e) => {
        // Esc: biarkan pemilik yang menutup lewat `buka`, supaya keadaannya
        // tetap satu sumber.
        e.preventDefault()
        onTutup()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onTutup()
      }}
    >
      <div className="jendela-isi">{children}</div>
    </dialog>
  )
}
