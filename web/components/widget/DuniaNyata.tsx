'use client'

/**
 * Tahap 10 — galeri "di mana trigonometri dipakai".
 *
 * Empat contoh yang semuanya ada di dalam satu ponsel. Fotonya nyata (diambil
 * dari Wikimedia Commons, semua berlisensi terbuka — lihat
 * `public/gambar/sumber.json`), dan di atas foto digambar bangun matematikanya
 * supaya siswa melihat KENAPA contoh itu masuk ke bab ini.
 *
 * Contoh kamera bisa diutak-atik: geser jaraknya, lebar yang muat ikut
 * berubah — dihitung, bukan angka hafalan.
 */

import { WARNA } from '@/lib/warna'

export type Contoh = {
  id: string
  gambar: string
  nomor: string
  judul: string
  inti: string
  rumus: string
}

export const CONTOH: Contoh[] = [
  {
    id: 'kamera', gambar: 'kamera.jpg', nomor: '01',
    judul: 'Kamera — seberapa lebar yang muat',
    inti: 'Sudut pandang lensa tetap. Yang menentukan lebar hasil foto adalah sudut itu dan jarak Anda.',
    rumus: 'lebar = 2 × jarak × tan(½ sudut pandang)',
  },
  {
    id: 'layar', gambar: 'miring.jpg', nomor: '02',
    judul: 'Layar yang berputar sendiri',
    inti: 'Sensor merasakan tarikan gravitasi pada dua arah. Perbandingan keduanya memberi sudut kemiringan.',
    rumus: 'kemiringan = sudut yang tangennya = mendatar ÷ tegak',
  },
  {
    id: 'game', gambar: 'game.jpg', nomor: '03',
    judul: 'Game — memutar apa pun',
    inti: 'Setiap benda dan kamera yang berputar dihitung ulang puluhan ribu kali tiap detik.',
    rumus: "(x, y) → (x cos θ − y sin θ,  x sin θ + y cos θ)",
  },
  {
    id: 'suara', gambar: 'suara.jpg', nomor: '04',
    judul: 'Suara — bentuknya kurva sinus',
    inti: 'Nada A bergetar 440 kali per detik. Bentuk getarannya persis kurva dari tahap 8.',
    rumus: 'simpangan = tinggi × sin(2π × 440 × waktu)',
  },
]

/** Sudut pandang lensa ponsel kebanyakan, dalam derajat. */
export const SUDUT_PANDANG = 78
export const BATAS_JARAK = { min: 0.5, maks: 5, langkah: 0.1 }

/** Lebar pemandangan yang muat dalam bingkai, pada jarak tertentu (meter). */
export function lebarMuat(jarak: number, sudutPandang = SUDUT_PANDANG): number {
  return 2 * jarak * Math.tan((sudutPandang / 2) * (Math.PI / 180))
}

export const koma = (n: number, digit = 2) =>
  n.toFixed(digit).replace('.', ',')

type Props = { pilih: number; jarak: number }

export default function DuniaNyata({ pilih, jarak }: Props) {
  const c = CONTOH[pilih] ?? CONTOH[0]
  const lebar = lebarMuat(jarak)

  return (
    <figure className="galeri">
      <div className="galeri-bingkai">
        <img src={`/gambar/${c.gambar}`} alt="" />

        {/* Bangun matematikanya digambar DI ATAS foto, bukan di sebelahnya,
            supaya siswa melihat sudut itu ada di benda nyata. */}
        {c.id === 'kamera' && (
          <svg className="galeri-lapis" viewBox="0 0 100 66" preserveAspectRatio="none"
               aria-hidden="true">
            <polygon points="14,33 92,6 92,60" fill={WARNA.sudut} fillOpacity="0.16"
                     stroke={WARNA.sudut} strokeWidth="0.5" />
            <line x1="14" y1="33" x2="92" y2="33"
                  stroke={WARNA.samping} strokeWidth="0.5" strokeDasharray="2 1.6" />
            <line x1="92" y1="6" x2="92" y2="60"
                  stroke={WARNA.depan} strokeWidth="1.1" />
          </svg>
        )}

        {/* Kartu suara sengaja TANPA lapisan kurva. Kurva sinus yang digambar
            menembus panel tombol osiloskop, dan lebih penting: kita tidak bisa
            memastikan gelombang di layar foto itu benar-benar sinus (bisa jadi
            segitiga). Menggambar kurva "sinus" di atasnya sama saja mengklaim
            sesuatu yang belum diperiksa. Teks yang menjelaskan, bukan gambar. */}
      </div>

      <figcaption className="galeri-teks">
        <div className="galeri-judul">
          <span className="mono">{c.nomor}</span> {c.judul}
        </div>
        <p>{c.inti}</p>
        <div className="galeri-rumus mono">{c.rumus}</div>

        {c.id === 'kamera' && (
          <div className="galeri-hitung mono">
            sudut pandang {SUDUT_PANDANG}° · jarak {koma(jarak, 1)} m
            <b>
              {' → '}muat {koma(lebar)} m
            </b>
          </div>
        )}
      </figcaption>
    </figure>
  )
}
