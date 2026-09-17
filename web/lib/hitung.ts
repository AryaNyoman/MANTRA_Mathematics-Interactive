'use client'

import { useEffect, useState } from 'react'

/**
 * Angka yang menghitung dari 0 ke nilainya (sistem gerak Panggung, 17 Sep
 * 2026): skor di jendela, persen kemajuan, batang. 900 ms, melambat di akhir
 * (1 - (1 - t)^3), mulai sesudah jeda 120 ms. Saat `aktif` salah, atau
 * pengguna meminta gerak dikurangi, nilainya langsung nilai akhir.
 *
 * Halaman ringkasan memakainya sekali per sesi tab (`kunciSesi`,
 * sessionStorage `matra:hitung-<halaman>`): angka yang sudah pernah dilihat
 * langsung tampil, tidak menghitung ulang tiap kali halaman dibuka lagi.
 *
 * Semua setState dijadwalkan lewat requestAnimationFrame, bukan langsung di
 * badan effect (aturan react-hooks/set-state-in-effect).
 */
export function useHitung(target: number, aktif: boolean, ms = 900, tunda = 120): number {
  const [n, setN] = useState(target)
  useEffect(() => {
    let id = 0
    const kurangiGerak = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!aktif || kurangiGerak || ms <= 0) {
      id = requestAnimationFrame(() => setN(target))
      return () => cancelAnimationFrame(id)
    }
    const t0 = performance.now()
    const langkah = (t: number) => {
      const k = Math.min(1, Math.max(0, (t - t0 - tunda) / ms))
      setN(Math.round(target * (1 - Math.pow(1 - k, 3))))
      if (k < 1) id = requestAnimationFrame(langkah)
    }
    id = requestAnimationFrame(langkah)
    return () => cancelAnimationFrame(id)
  }, [target, aktif, ms, tunda])
  return n
}

/** Sekali per sesi tab: benar hanya pada panggilan pertama untuk `kunci`. */
export function sekaliPerSesi(kunci: string): boolean {
  try {
    const k = `matra:hitung-${kunci}`
    if (sessionStorage.getItem(k)) return false
    sessionStorage.setItem(k, '1')
    return true
  } catch {
    return false
  }
}
