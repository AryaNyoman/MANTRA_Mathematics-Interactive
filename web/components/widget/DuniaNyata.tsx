'use client'

/**
 * Materi 10, galeri "di mana trigonometri dipakai".
 *
 * Empat contoh yang semuanya ada di dalam satu ponsel. Fotonya nyata (diambil
 * dari Wikimedia Commons, semua berlisensi terbuka, lihat
 * `public/gambar/sumber.json`), dan di atas foto digambar bangun matematikanya
 * supaya siswa melihat KENAPA contoh itu masuk ke bab ini.
 *
 * PERBAIKAN 1 Sep 2026. ARYA melaporkan "interaktifnya tidak bekerja".
 * Sebabnya nyata: hanya contoh KAMERA yang punya penggeser dan lapisan gambar.
 * Contoh 02, 03, dan 04 memang tidak melakukan apa pun saat diklik, jadi wajar
 * kalau terasa rusak. Sekarang keempatnya punya satu penggeser dan satu angka
 * hidup masing-masing, sehingga tiap kartu benar-benar bisa dicoba.
 */

import { WARNA } from '@/lib/warna'

export type Contoh = {
  id: string
  gambar: string
  nomor: string
  judul: string
  inti: string
  rumus: string
  /** label penggeser dan rentangnya, satu untuk tiap contoh */
  geser: { label: string; satuan: string; min: number; maks: number; langkah: number }
}

export const CONTOH: Contoh[] = [
  {
    id: 'kamera', gambar: 'kamera.jpg', nomor: '01',
    judul: 'Kamera, seberapa lebar yang muat',
    inti: 'Sudut pandang lensa tetap. Yang menentukan lebar hasil foto adalah sudut itu dan jarak Anda.',
    rumus: 'lebar = 2 x jarak x tan(setengah sudut pandang)',
    geser: { label: 'Jarak Anda ke objek', satuan: 'm', min: 0.5, maks: 5, langkah: 0.1 },
  },
  {
    id: 'layar', gambar: 'miring.jpg', nomor: '02',
    judul: 'Layar yang berputar sendiri',
    inti: 'Sensor merasakan tarikan gravitasi pada dua arah. Perbandingan keduanya memberi sudut kemiringan.',
    rumus: 'kemiringan = sudut yang tangennya = mendatar : tegak',
    geser: { label: 'Miringkan ponselnya', satuan: '°', min: 0, maks: 90, langkah: 1 },
  },
  {
    id: 'game', gambar: 'game.jpg', nomor: '03',
    judul: 'Game, memutar apa pun',
    inti: 'Setiap benda dan kamera yang berputar dihitung ulang puluhan ribu kali tiap detik.',
    rumus: 'titik (1, 0) diputar sejauh sudut menjadi (cos, sin)',
    geser: { label: 'Putar karakternya', satuan: '°', min: 0, maks: 360, langkah: 1 },
  },
  {
    id: 'suara', gambar: 'suara.jpg', nomor: '04',
    judul: 'Suara, bentuknya kurva sinus',
    inti: 'Nada A bergetar 440 kali per detik. Osiloskop seperti ini yang memperlihatkan bentuk getarannya, dan bentuk itu kurva dari materi 8.',
    rumus: 'simpangan = tinggi x sin(2 pi x frekuensi x waktu)',
    geser: { label: 'Tinggi nadanya', satuan: 'Hz', min: 220, maks: 880, langkah: 10 },
  },
]

/** Sudut pandang lensa ponsel kebanyakan, dalam derajat. */
export const SUDUT_PANDANG = 78
/** Ambang kemiringan sebelum layar dibalik, seperti pada ponsel sungguhan. */
export const AMBANG_PUTAR = 45

/** Lebar pemandangan yang muat dalam bingkai, pada jarak tertentu (meter). */
export function lebarMuat(jarak: number, sudutPandang = SUDUT_PANDANG): number {
  return 2 * jarak * Math.tan((sudutPandang / 2) * (Math.PI / 180))
}

export const koma = (n: number, digit = 2) => n.toFixed(digit).replace('.', ',')

type Props = { pilih: number; nilai: number }

export default function DuniaNyata({ pilih, nilai }: Props) {
  const c = CONTOH[pilih] ?? CONTOH[0]
  const rad = (nilai * Math.PI) / 180

  return (
    <figure className="galeri">
      <div className="galeri-bingkai">
        <img src={`/gambar/${c.gambar}`} alt="" />

        {/* Bangun matematikanya digambar DI ATAS foto, bukan di sebelahnya,
            supaya siswa melihat sudut itu ada di benda nyata. Tiap contoh
            punya lapisannya sendiri, dan semuanya ikut bergerak. */}
        {c.id === 'kamera' && (
          <svg className="galeri-lapis" viewBox="0 0 100 66" preserveAspectRatio="none"
               aria-hidden="true">
            {/* kerucut pandang melebar mengikuti jarak */}
            <polygon
              points={`14,33 92,${33 - Math.min(30, nilai * 6)} 92,${33 + Math.min(30, nilai * 6)}`}
              fill={WARNA.sudut} fillOpacity="0.16"
              stroke={WARNA.sudut} strokeWidth="0.5" />
            <line x1="14" y1="33" x2="92" y2="33"
                  stroke={WARNA.samping} strokeWidth="0.5" strokeDasharray="2 1.6" />
            <line x1="92" y1={33 - Math.min(30, nilai * 6)}
                  x2="92" y2={33 + Math.min(30, nilai * 6)}
                  stroke={WARNA.depan} strokeWidth="1.2" />
          </svg>
        )}

        {c.id === 'layar' && (
          <svg className="galeri-lapis" viewBox="0 0 100 66" preserveAspectRatio="none"
               aria-hidden="true">
            {/* garis tegak lurus gravitasi, dan garis arah ponsel yang dimiringkan */}
            <line x1="50" y1="10" x2="50" y2="56"
                  stroke={WARNA.samping} strokeWidth="0.6" strokeDasharray="2 1.6" />
            <line
              x1="50" y1="33"
              x2={50 + 34 * Math.sin(rad)} y2={33 - 34 * Math.cos(rad)}
              stroke={WARNA.depan} strokeWidth="1.4" />
            <path
              d={`M 50 ${33 - 14} A 14 14 0 0 1 ${50 + 14 * Math.sin(rad)} ${33 - 14 * Math.cos(rad)}`}
              fill="none" stroke={WARNA.sudut} strokeWidth="1.2" />
          </svg>
        )}

        {c.id === 'game' && (
          <svg className="galeri-lapis" viewBox="0 0 100 66" preserveAspectRatio="none"
               aria-hidden="true">
            <circle cx="50" cy="33" r="22" fill="none"
                    stroke={WARNA.sudut} strokeWidth="0.6" strokeDasharray="2 2" />
            <line x1="50" y1="33" x2="72" y2="33"
                  stroke={WARNA.samping} strokeWidth="0.6" strokeDasharray="2 1.6" />
            <line
              x1="50" y1="33"
              x2={50 + 22 * Math.cos(rad)} y2={33 - 22 * Math.sin(rad)}
              stroke={WARNA.depan} strokeWidth="1.4" />
            <circle cx={50 + 22 * Math.cos(rad)} cy={33 - 22 * Math.sin(rad)}
                    r="2" fill={WARNA.depan} />
          </svg>
        )}

        {c.id === 'suara' && (
          <svg className="galeri-lapis" viewBox="0 0 100 66" preserveAspectRatio="none"
               aria-hidden="true">
            {/* satu gelombang yang benar-benar merapat saat nadanya dinaikkan */}
            <path
              d={Array.from({ length: 121 }, (_, i) => {
                const x = 6 + (i / 120) * 88
                const y = 33 - 15 * Math.sin((i / 120) * (nilai / 110) * Math.PI * 2)
                return `${i ? 'L' : 'M'}${x.toFixed(2)},${y.toFixed(2)}`
              }).join(' ')}
              fill="none" stroke={WARNA.depan} strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        )}
      </div>

      <figcaption className="galeri-teks">
        <div className="galeri-judul">
          <span className="mono">{c.nomor}</span> {c.judul}
        </div>
        <p>{c.inti}</p>
        <div className="galeri-rumus mono">{c.rumus}</div>

        <div className="galeri-hitung mono">
          {c.id === 'kamera' && (
            <>
              sudut pandang {SUDUT_PANDANG}° pada jarak {koma(nilai, 1)} m
              <b> jadi muat {koma(lebarMuat(nilai))} m</b>
            </>
          )}
          {c.id === 'layar' && (
            <>
              miring {nilai}° {'·'} tan {nilai}° = {koma(Math.tan(rad))}
              <b> {nilai >= AMBANG_PUTAR ? ' layar dibalik' : ' layar tetap tegak'}</b>
            </>
          )}
          {c.id === 'game' && (
            <>
              diputar {nilai}°
              <b> titiknya pindah ke ({koma(Math.cos(rad))}, {koma(Math.sin(rad))})</b>
            </>
          )}
          {c.id === 'suara' && (
            <>
              {nilai} Hz {'·'} {nilai < 300 ? 'nada rendah' : nilai < 600 ? 'nada sedang' : 'nada tinggi'}
              <b> gelombangnya {nilai < 440 ? 'merenggang' : 'merapat'}</b>
            </>
          )}
        </div>
      </figcaption>
    </figure>
  )
}
