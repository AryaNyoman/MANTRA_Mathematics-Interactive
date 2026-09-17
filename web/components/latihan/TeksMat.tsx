'use client'

import { useMemo, type ReactNode } from 'react'
import katex from 'katex'
import { latexTinggi, pisahkan, type Potongan } from '@/lib/mat-latex'

/**
 * Teks soal, pembahasan, dan BACAAN MATERI dengan rumus tertata KaTeX (ARYA
 * 17 Sep 2026: "integralnya dengan batasnya tidak jelas; lihat cara
 * mathcyber1997 menulis rumus; terapkan di semua bab"; malamnya: "rumus di
 * materi ditulis dengan kata-kata itu kesalahan fatal, tulis seperti di
 * soal", jadi Penjelasan.tsx dan HalamanTopik memakai komponen ini juga).
 *
 * Bank soal dan materi tetap teks biasa (x², ∫₁³, √(9 − x²), 5x/6).
 * `lib/mat-latex.ts` memilah prosa dan matematika lalu menjadikan
 * matematikanya LaTeX; di sini LaTeX itu dirender KaTeX:
 * - potongan pendek dirender sebaris dengan \displaystyle, jadi pecahan
 *   utuh dan batas integral di atas bawah walau di tengah kalimat;
 * - potongan tinggi yang panjang (integral berbatas, pecahan bertingkat)
 *   dirender sebagai BLOK di baris sendiri, rata tengah, seperti pembahasan
 *   mathcyber1997 ("tidak apa-apa menghabiskan dua baris, yang penting
 *   terbaca"); `blok={false}` mematikannya untuk tombol pilihan dan sel
 *   kotak contoh;
 * - KaTeX menolak = teks aslinya ditampilkan apa adanya, tidak ada yang
 *   hilang. alat/cek_rumus.ts (bank soal) dan alat/cek_rumus_materi.ts
 *   (bacaan) memastikan seluruh isi nol penolakan.
 *
 * Hasilnya di-memo per teks: halaman belajar menggambar ulang seluruh
 * bacaannya tiap kali keadaan halaman berubah (laci, lebar kolom alat yang
 * ditarik), dan mengurai ratusan rumus ulang pada tiap gerakan tetikus
 * akan terasa tersendat.
 */

const PANJANG_BLOK = 26

function pantasBlok(p: Extract<Potongan, { jenis: 'mat' }>): boolean {
  return (latexTinggi(p.latex) && p.latex.length > PANJANG_BLOK) || p.latex.length > 80
}

function renderMat(p: Extract<Potongan, { jenis: 'mat' }>, kunci: number, tampilBlok: boolean, ekor: string): ReactNode {
  // tanda baca kalimat yang mengekor blok ikut masuk ke blok, supaya tidak
  // menjadi baris berisi satu titik
  const latex = p.latex + (ekor ? `\\,${ekor}` : '')
  let html: string
  try {
    html = katex.renderToString(tampilBlok ? latex : `\\displaystyle ${latex}`, {
      throwOnError: true,
      displayMode: tampilBlok,
      strict: false,
      output: 'html',
    })
  } catch {
    return <span key={kunci} className="mat-gagal">{p.teks}</span>
  }
  return (
    <span
      key={kunci}
      className={tampilBlok ? 'mat-blok' : 'mat-baris'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function susun(teks: string, blok: boolean): ReactNode[] {
  const potongan = pisahkan(teks)
  const keluar: ReactNode[] = []
  for (let i = 0; i < potongan.length; i++) {
    const p = potongan[i]
    if (p.jenis === 'prosa') {
      keluar.push(<span key={i}>{p.teks}</span>)
      continue
    }
    // Blok hanya untuk rumus di UJUNG kalimat (atau hanya diikuti tanda
    // baca): "Absis titik balik dinyatakan oleh [rumus]." Rumus tinggi di
    // tengah kalimat tetap sebaris (displaystyle), supaya satu kalimat tidak
    // terpecah jadi baris-baris pendek berselang blok.
    let ekor = ''
    const berikut = potongan[i + 1]
    const diUjung = !berikut || (berikut.jenis === 'prosa' && /^[.,;:]\s*$/.test(berikut.teks) && i + 2 >= potongan.length)
    const tampilBlok = blok && diUjung && pantasBlok(p)
    if (tampilBlok && berikut) {
      ekor = berikut.teks.trim()
      i++
    }
    keluar.push(renderMat(p, i, tampilBlok, ekor))
  }
  return keluar
}

export default function TeksMat({ teks, blok = true }: { teks: string; blok?: boolean }) {
  const isi = useMemo(() => susun(teks, blok), [teks, blok])
  return <>{isi}</>
}
