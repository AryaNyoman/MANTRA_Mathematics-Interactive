'use client'

import { useEffect } from 'react'

/**
 * Mengisi peubah `--isi` pada setiap penggeser, supaya jalur di sebelah kiri
 * jempol berwarna emas dan di sebelah kanannya abu.
 *
 * Kenapa perlu JavaScript sedikit: Chrome tidak punya bagian "sudah terisi"
 * pada penggeser (Firefox punya, namanya `::-moz-range-progress`). Satu
 * satunya cara menggambarnya di Chrome adalah gradasi yang titik potongnya
 * mengikuti nilai, dan CSS tidak bisa membaca nilai sebuah `input`.
 *
 * Kenapa SATU pendengar di tingkat dokumen, bukan satu per penggeser: di
 * halaman belajar ada puluhan widget, dan tiap widget punya penggesernya
 * sendiri. Memasang pendengar di masing-masing berarti puluhan pendengar
 * yang harus dipasang dan dilepas tiap kali materi berganti. Satu pendengar
 * `input` di dokumen menangkap semuanya, termasuk penggeser yang baru lahir
 * setelah komponen ini terpasang.
 *
 * Yang belum tersentuh pendengar (baru dirender, belum digeser) disapu oleh
 * `MutationObserver`, jadi jalurnya sudah benar sebelum disentuh sekali pun.
 */
function isi(el: HTMLInputElement) {
  const min = Number(el.min || 0)
  const max = Number(el.max || 100)
  const nilai = Number(el.value)
  if (!Number.isFinite(min) || !Number.isFinite(max) || max === min) return
  const persen = ((nilai - min) / (max - min)) * 100
  el.style.setProperty('--isi', `${Math.max(0, Math.min(100, persen))}%`)
}

function sapu(akar: ParentNode = document) {
  akar.querySelectorAll<HTMLInputElement>('input[type="range"]').forEach(isi)
}

export default function PenggeserEmas() {
  useEffect(() => {
    sapu()

    const saatGeser = (e: Event) => {
      const t = e.target
      if (t instanceof HTMLInputElement && t.type === 'range') isi(t)
    }
    document.addEventListener('input', saatGeser, true)

    const pengamat = new MutationObserver((daftar) => {
      for (const m of daftar) {
        for (const n of m.addedNodes) {
          if (n instanceof HTMLElement) {
            if (n instanceof HTMLInputElement && n.type === 'range') isi(n)
            else sapu(n)
          }
        }
      }
    })
    pengamat.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('input', saatGeser, true)
      pengamat.disconnect()
    }
  }, [])

  return null
}
