'use client'

import { useEffect } from 'react'
import { daftarkanPetugas } from '@/lib/simpanan-video'

/**
 * Mendaftarkan petugas simpanan video (public/sw.js) sekali per kunjungan.
 * Dipasang di layout akar supaya video di halaman mana pun (materi, beranda)
 * ikut tersimpan. Tidak menggambar apa-apa.
 */
export default function PetugasVideo() {
  useEffect(() => {
    void daftarkanPetugas()
  }, [])
  return null
}
