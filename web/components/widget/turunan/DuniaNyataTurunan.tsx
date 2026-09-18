'use client'

import GaleriNyata, { type KartuNyata } from '@/components/widget/GaleriNyata'
import { WARNA } from '@/components/widget/turunan/koordinat'

/**
 * Galeri "Turunan di sekitar kita", Materi 12. TIDAK interaktif.
 *
 * Sejak 18 Sep 2026 tiap kartu berfoto asli (Wikimedia Commons, lisensi
 * bebas, catatan di public/gambar/sumber.json), dan grafik kecilnya tetap
 * dibawa di bawah foto (pilihan ARYA: di bab Turunan bentuk kurvanya ikut
 * menjelaskan).
 *
 * KENAPA KURVANYA DIHITUNG, BUKAN DIGAMBAR TANGAN
 * Tiap kartu memuat angka yang juga tertulis di bacaan, misalnya puncak 125
 * meter pada detik ke-5. Kalau kurvanya digambar tangan, gambar dan angka
 * bisa berselisih tanpa ada yang menyadarinya. Jadi jalurnya dihitung dari
 * rumus yang sama dengan yang dipakai bacaan (aturan proyek: kurva harus
 * lahir dari nilai yang dihitung).
 */

const KOTAK = { lebar: 200, tinggi: 96, kiri: 8, kanan: 194, atas: 10, bawah: 84 }

/** Jalur SVG sebuah fungsi di dalam kotak kartu, dihitung dari rumusnya. */
function jalurKartu(
  f: (t: number) => number,
  tMin: number, tMax: number, yMin: number, yMax: number,
): string {
  const titik: string[] = []
  for (let i = 0; i <= 60; i++) {
    const t = tMin + ((tMax - tMin) * i) / 60
    const y = f(t)
    if (!Number.isFinite(y)) continue
    const px = KOTAK.kiri + ((t - tMin) / (tMax - tMin)) * (KOTAK.kanan - KOTAK.kiri)
    const py = KOTAK.bawah - ((y - yMin) / (yMax - yMin)) * (KOTAK.bawah - KOTAK.atas)
    titik.push(`${titik.length === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`)
  }
  return titik.join(' ')
}

type Kartu = {
  id: string
  gambar: string
  judul: string
  isi: string
  tanda: string
  jalur: string
  /** letak titik yang ditandai, dalam koordinat kotak kartu */
  titik?: { x: number; y: number }
}

const tinggiBola = (t: number) => 50 * t - 5 * t * t
const bakteri = (t: number) => 200 * Math.exp(t / 2)
const luasKaleng = (r: number) => 2 * Math.PI * r * r + 2000 / r
const biayaMarginal = (x: number) => 15000 + 40 * x

const KARTU: Kartu[] = [
  {
    id: 'bola', gambar: 'turunan/bola-dilempar.jpg',
    judul: 'Bola yang dilempar ke atas',
    isi: 'Tingginya h(t) = 50t - 5t². Turunan pertamanya kecepatan, turunan keduanya percepatan yang tetap -10.',
    tanda: 'kecepatan nol tepat di puncak, pada detik kelima',
    jalur: jalurKartu(tinggiBola, 0, 10, 0, 140),
    titik: {
      x: KOTAK.kiri + (5 / 10) * (KOTAK.kanan - KOTAK.kiri),
      y: KOTAK.bawah - (125 / 140) * (KOTAK.bawah - KOTAK.atas),
    },
  },
  {
    id: 'bakteri', gambar: 'turunan/bakteri-cawan.jpg',
    judul: 'Bakteri di cawan',
    isi: 'Jumlahnya N(t) = 200 · e^(t/2). Lajunya selalu setengah dari jumlahnya sendiri, jadi makin banyak makin cepat.',
    tanda: 'laju sebanding dengan jumlahnya',
    jalur: jalurKartu(bakteri, 0, 4, 0, 1600),
  },
  {
    id: 'kaleng', gambar: 'turunan/kaleng.jpg',
    judul: 'Kaleng paling hemat pelat',
    isi: 'Isinya dipatok 1 liter. Luas pelatnya L(r) = 2πr² + 2000/r, dan turunannya nol saat tinggi kaleng sama dengan diameternya.',
    tanda: 'paling hemat di r ≈ 5,42 cm',
    jalur: jalurKartu(luasKaleng, 3, 9, 500, 900),
    titik: {
      x: KOTAK.kiri + ((5.42 - 3) / 6) * (KOTAK.kanan - KOTAK.kiri),
      y: KOTAK.bawah - ((luasKaleng(5.42) - 500) / 400) * (KOTAK.bawah - KOTAK.atas),
    },
  },
  {
    id: 'biaya', gambar: 'turunan/biaya-barang.jpg',
    judul: 'Biaya membuat satu barang lagi',
    isi: 'Biaya totalnya B(x) = 2.000.000 + 15.000x + 20x². Turunannya disebut biaya marginal, dan angkanya naik seiring produksi.',
    tanda: 'di barang ke-100, tambahannya 19.000 rupiah',
    jalur: jalurKartu(biayaMarginal, 0, 200, 14000, 24000),
    titik: {
      x: KOTAK.kiri + (100 / 200) * (KOTAK.kanan - KOTAK.kiri),
      y: KOTAK.bawah - ((19000 - 14000) / 10000) * (KOTAK.bawah - KOTAK.atas),
    },
  },
]

function Grafik({ k }: { k: Kartu }) {
  return (
    <svg viewBox={`0 0 ${KOTAK.lebar} ${KOTAK.tinggi}`} role="img"
         aria-label={`Bentuk kurva untuk ${k.judul}. ${k.tanda}.`}>
      <line x1={KOTAK.kiri} y1={KOTAK.bawah} x2={KOTAK.kanan} y2={KOTAK.bawah}
            stroke="#D6CDBC" strokeWidth={1.2} />
      <line x1={KOTAK.kiri} y1={KOTAK.atas - 4} x2={KOTAK.kiri} y2={KOTAK.bawah}
            stroke="#D6CDBC" strokeWidth={1.2} />
      <path d={k.jalur} fill="none" stroke={WARNA.miring} strokeWidth={2}
            strokeLinecap="round" />
      {k.titik && (
        <>
          <line x1={k.titik.x} y1={k.titik.y} x2={k.titik.x} y2={KOTAK.bawah}
                stroke={WARNA.sudut} strokeWidth={1} strokeDasharray="3 3" opacity={0.7} />
          <circle cx={k.titik.x} cy={k.titik.y} r={3.4} fill={WARNA.sudut} />
        </>
      )}
    </svg>
  )
}

const KARTU_NYATA: KartuNyata[] = KARTU.map((k, i) => ({
  id: k.id,
  gambar: k.gambar,
  nomor: String(i + 1).padStart(2, '0'),
  judul: k.judul,
  inti: k.isi,
  rumus: k.tanda,
  grafik: <Grafik k={k} />,
}))

export default function DuniaNyataTurunan() {
  return <GaleriNyata kartu={KARTU_NYATA} />
}
