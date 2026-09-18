'use client'

import type { ReactNode } from 'react'
import TeksMat from '@/components/latihan/TeksMat'
import sumber from '@/public/gambar/sumber.json'

/**
 * Galeri "dunia nyata" bersama untuk materi penutup tiap bab.
 *
 * ARYA 18 Sep 2026: "namanya juga penerapan di dunia nyata, ya pakai foto
 * yang nyata". Sebelumnya enam bab hanya menggambar grafik kecil; sekarang
 * tiap kartu berfoto asli dari Wikimedia Commons (lisensi bebas: CC0,
 * domain publik, CC BY, CC BY-SA), dicatat di `public/gambar/sumber.json`
 * dan ditampilkan sebagai baris kredit di kartu (syarat lisensi CC BY).
 * Pilihan ARYA: Limit, Turunan, dan Integral tetap membawa grafik kecilnya
 * di bawah foto (bentuk kurvanya adalah inti contohnya); bab lain foto saja.
 *
 * Foto tampil UTUH (`object-fit: contain`), tidak dipotong, sesuai aturan
 * proyek dan keputusan ARYA 1 Sep 2026 di galeri Trigonometri. Teks kartu
 * lewat TeksMat supaya rumusnya tertata KaTeX seperti di bank soal.
 */

export type KartuNyata = {
  id: string
  /** jalur di bawah /gambar/, misalnya "limit/rel-wahana.jpg" */
  gambar: string
  nomor: string
  judul: string
  /** kalimat inti; boleh memuat rumus */
  inti: string
  /** baris rumus atau angka penutup di bawah kalimat */
  rumus?: string
  /** grafik kecil di bawah foto (Limit, Turunan, Integral) */
  grafik?: ReactNode
}

type Sumber = { judul: string; penulis?: string; lisensi: string; halaman: string }
const SUMBER = sumber as Record<string, Sumber>

/** Kunci sumber.json dari jalur gambar: "limit/rel-wahana.jpg" -> "limit-rel-wahana". */
export function kunciSumber(gambar: string): string {
  return gambar.replace(/\.[a-z0-9]+$/i, '').replace(/\//g, '-')
}

export function Kredit({ gambar }: { gambar: string }) {
  const s = SUMBER[kunciSumber(gambar)]
  if (!s) return null
  return (
    <small className="nyata-kredit">
      Foto: {s.penulis ? `${s.penulis}, ` : ''}{s.lisensi},{' '}
      <a href={s.halaman} target="_blank" rel="noreferrer">Wikimedia Commons</a>
    </small>
  )
}

export default function GaleriNyata({ kartu }: { kartu: KartuNyata[] }) {
  return (
    <div className="galeri-nyata">
      {kartu.map((c) => (
        <figure key={c.id} className="kartu-nyata">
          <div className="foto-nyata">
            {/* `next/image` sengaja tidak dipakai: fotonya harus tampil UTUH,
                dan `contain` pada bingkai bertinggi tetap lebih mudah dijamin
                dengan img biasa. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/gambar/${c.gambar}`} alt={c.judul} loading="lazy" />
          </div>
          {c.grafik && <div className="grafik-nyata">{c.grafik}</div>}
          <figcaption>
            <span className="nyata-no mono">{c.nomor}</span>
            <h3>{c.judul}</h3>
            <p><TeksMat teks={c.inti} blok={false} /></p>
            {c.rumus && <code className="nyata-rumus"><TeksMat teks={c.rumus} blok={false} /></code>}
            <Kredit gambar={c.gambar} />
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
