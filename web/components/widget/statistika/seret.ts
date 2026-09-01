'use client'

import {
  useCallback, useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from 'react'
import { VH, VW } from '@/components/widget/statistika/skala'

/**
 * Menyeret titik data di dalam gambar SVG.
 *
 * KENAPA PERLU DIURUS SENDIRI
 * Peristiwa penunjuk memberi koordinat layar, sedangkan gambar memakai
 * koordinat viewBox yang ikut mengecil dan membesar mengikuti lebar kartu.
 * Kalau keduanya tidak diubah, titik akan melompat jauh dari jari atau kursor
 * begitu kartunya tidak selebar 460 piksel, dan itu terjadi di hampir semua
 * layar HP.
 *
 * SETIAP WIDGET YANG BISA DISERET WAJIB JUGA BISA DENGAN PAPAN KETIK.
 * Menyeret adalah satu-satunya cara bagi tetikus dan jari, tetapi bukan
 * satu-satunya cara bagi manusia. Titik yang bisa diseret dibuat bisa
 * ditajamkan sasarannya lewat Tab, lalu digerakkan dengan tombol panah.
 * `propTitikSeret` di bawah memasang keduanya sekaligus supaya tidak ada widget
 * yang lupa memasang salah satunya.
 */

export function koordinatSvg(
  e: { clientX: number; clientY: number },
  svg: SVGSVGElement,
): { x: number; y: number } {
  const kotak = svg.getBoundingClientRect()
  // viewBox dipasang preserveAspectRatio="xMidYMid meet", jadi gambar diperkecil
  // dengan satu pengali yang sama untuk kedua arah, lalu disisakan ruang kosong
  // di sisi yang berlebih. Ruang kosong itu harus ikut dikurangi.
  const pengali = Math.min(kotak.width / VW, kotak.height / VH)
  const kosongX = (kotak.width - VW * pengali) / 2
  const kosongY = (kotak.height - VH * pengali) / 2
  return {
    x: (e.clientX - kotak.left - kosongX) / pengali,
    y: (e.clientY - kotak.top - kosongY) / pengali,
  }
}

export function useSeret(
  svgRef: RefObject<SVGSVGElement | null>,
  saatSeret: (indeks: number, x: number, y: number) => void,
) {
  const [aktif, setAktif] = useState<number | null>(null)

  const mulai = useCallback((indeks: number) => (e: ReactPointerEvent) => {
    e.preventDefault()
    setAktif(indeks)
    // penunjuk dikunci ke unsur ini supaya seretan tidak putus saat kursor
    // keluar dari lingkaran kecil, dan itu pasti terjadi kalau ditarik cepat
    ;(e.target as Element).setPointerCapture?.(e.pointerId)
  }, [])

  const bergerak = useCallback((e: ReactPointerEvent) => {
    if (aktif === null || !svgRef.current) return
    const t = koordinatSvg(e, svgRef.current)
    saatSeret(aktif, t.x, t.y)
  }, [aktif, saatSeret, svgRef])

  const selesai = useCallback(() => setAktif(null), [])

  return {
    /** indeks titik yang sedang diseret, untuk diberi tanda tebal */
    aktif,
    /** dipasang pada unsur svg */
    propSvg: {
      onPointerMove: bergerak,
      onPointerUp: selesai,
      onPointerCancel: selesai,
      onPointerLeave: selesai,
    },
    /** dipasang pada tiap titik yang bisa diseret */
    mulai,
  }
}

/**
 * Prop lengkap untuk satu titik yang bisa diseret sekaligus dijalankan papan
 * ketik. Dipakai supaya tidak ada widget yang memasang seretannya saja lalu
 * lupa memasang tombol panahnya.
 */
export function propTitikSeret({
  indeks,
  nama,
  nilai,
  mulai,
  geser,
  langkah = 1,
}: {
  indeks: number
  /** dibacakan pembaca layar, contoh "titik ke-3, nilai 7" */
  nama: string
  nilai: number
  mulai: (indeks: number) => (e: ReactPointerEvent) => void
  /** dipanggil dengan nilai barunya saat tombol panah ditekan */
  geser: (indeks: number, nilaiBaru: number) => void
  langkah?: number
}) {
  return {
    role: 'slider',
    tabIndex: 0,
    'aria-label': nama,
    'aria-valuenow': nilai,
    style: { cursor: 'grab', touchAction: 'none' as const },
    onPointerDown: mulai(indeks),
    onKeyDown: (e: ReactKeyboardEvent) => {
      const arah = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 1
        : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -1
        : 0
      if (arah === 0) return
      e.preventDefault()
      geser(indeks, nilai + arah * langkah)
    },
  }
}
