'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { aturArah, tandaiArah } from '@/lib/arah-rute'

/**
 * Penentu arah pindah halaman (sistem gerak Panggung, 17 Sep 2026).
 *
 * Dipasang sekali di layout. Ia tidak menggambar apa pun; ia hanya
 * mendengarkan dua hal dan menulis atribut pada `html`:
 * - klik pada tautan internal (fase tangkap, jadi mendahului Link Next):
 *   `data-arah` dihitung dari alamat sekarang dan alamat tujuan;
 * - `popstate` (tombol Kembali atau Maju peramban, gestur geser): selalu
 *   "kembali", sebab peramban tidak memberi tahu mana yang ditekan. Untuk
 *   jalur ini Next memulihkan halaman dari simpanannya TANPA View Transition
 *   (terukur 17 Sep 2026: `document.startViewTransition` tidak dipanggil),
 *   jadi `data-pop` dinyalakan 700 ms supaya CSS memberi `main` yang datang
 *   gerak "kembali" biasa.
 *
 * Kenapa SEBELUM pindah, bukan lewat effect sesudah alamat berganti:
 * pseudo-elemen View Transition dibuat begitu React mulai transisinya, dan
 * animasinya dipilih dari CSS saat itu juga. Kalau `data-arah` baru ditulis
 * sesudahnya, potret halaman baru sempat mulai dengan animasi yang salah
 * lalu berkedip berganti.
 *
 * Tautan yang hanya mengubah bagian tanda pagar atau parameter pada alamat
 * yang sama (misalnya `?tingkat=`) bukan pindah halaman: tidak ada potret
 * yang bertukar, jadi arahnya tidak perlu ditulis.
 */
export default function ArahRute() {
  const jalur = usePathname()
  const jalurKini = useRef(jalur)
  useEffect(() => {
    jalurKini.current = jalur
  }, [jalur])

  useEffect(() => {
    let pengatur = 0
    const saatKlik = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      let tujuan: URL
      try {
        tujuan = new URL(a.href, window.location.href)
      } catch {
        return
      }
      if (tujuan.origin !== window.location.origin) return
      if (tujuan.pathname === window.location.pathname) return
      aturArah(tujuan.pathname)
    }
    const saatPop = () => {
      // Saat popstate, alamat peramban sudah alamat tujuan; alamat asalnya
      // masih tersimpan di `jalurKini`. Kalau sama, hanya tanda pagar atau
      // parameter yang berubah: bukan pindah halaman.
      if (window.location.pathname === jalurKini.current) return
      tandaiArah('kembali')
      const html = document.documentElement
      html.dataset.pop = 'true'
      window.clearTimeout(pengatur)
      pengatur = window.setTimeout(() => {
        delete html.dataset.pop
      }, 700)
    }
    document.addEventListener('click', saatKlik, true)
    window.addEventListener('popstate', saatPop)
    return () => {
      document.removeEventListener('click', saatKlik, true)
      window.removeEventListener('popstate', saatPop)
      window.clearTimeout(pengatur)
    }
  }, [])
  return null
}
