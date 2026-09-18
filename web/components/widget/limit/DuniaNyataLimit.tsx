'use client'

import GaleriNyata, { type KartuNyata } from '@/components/widget/GaleriNyata'
import { WARNA } from '@/components/widget/limit/koordinat'

/**
 * Galeri "Dipakai di Dunia Nyata", Limit tahap 10. Tidak interaktif.
 *
 * Sejak 18 Sep 2026 tiap kartu berfoto asli (Wikimedia Commons, lisensi
 * bebas, catatan di public/gambar/sumber.json), dan grafik kecil yang dulu
 * jadi satu-satunya gambar tetap dibawa di bawah foto: yang mau ditunjukkan
 * di bab ini adalah BENTUK KURVANYA, bagaimana sesuatu merapat ke satu
 * nilai, dan foto saja tidak memperlihatkan itu (pilihan ARYA).
 */

type Kartu = {
  id: string
  gambar: string
  judul: string
  isi: string
  batas: string
  /** jalur SVG kurvanya, dalam kotak 200 x 90 */
  jalur: string
  /** tinggi garis batas pada kotak yang sama */
  garisY: number | null
}

const KARTU: Kartu[] = [
  {
    id: 'rel', gambar: 'limit/rel-wahana.jpg',
    judul: 'Rel wahana',
    isi: 'Lintasan disusun dari beberapa potongan rumus. Di tiap sambungan, tinggi rel kiri dan kanan harus sama persis, kalau tidak keretanya melompat.',
    batas: 'syaratnya: kontinu di tiap sambungan',
    jalur: 'M 6 70 C 40 70, 46 14, 78 14 C 110 14, 104 78, 140 78 C 168 78, 176 52, 194 52',
    garisY: null,
  },
  {
    id: 'obat', gambar: 'limit/kadar-obat.jpg',
    judul: 'Kadar obat dalam darah',
    isi: 'Obat menumpuk tiap kali diminum, tapi tubuh juga membuangnya. Lama-lama kadarnya berhenti naik dan berayun di sekitar satu nilai.',
    batas: 'limitnya: kadar mantap',
    jalur: 'M 6 84 L 20 40 L 34 56 L 48 26 L 62 40 L 76 20 L 90 31 L 104 17 L 118 26 L 132 15 L 146 22 L 160 14 L 174 20 L 194 14',
    garisY: 14,
  },
  {
    id: 'biaya', gambar: 'limit/biaya-produksi.jpg',
    judul: 'Biaya rata-rata produksi',
    isi: 'Biaya tetap pabrik dibagi ke makin banyak barang, jadi biaya per barang turun. Tapi biaya bahan tiap barang tidak bisa hilang.',
    batas: 'limitnya: biaya bahan per barang',
    jalur: 'M 6 8 C 24 52, 40 64, 70 70 C 104 76, 140 78, 194 79',
    garisY: 80,
  },
  {
    id: 'danau', gambar: 'limit/populasi-danau.jpg',
    judul: 'Populasi ikan di danau',
    isi: 'Awalnya tumbuh cepat, lalu melambat, lalu hampir berhenti di satu jumlah: sebanyak yang bisa dihidupi makanan dan ruang di danau itu.',
    batas: 'limitnya: daya dukung danau',
    jalur: 'M 6 80 C 40 79, 56 74, 74 52 C 92 30, 108 17, 140 14 C 164 12, 178 12, 194 12',
    garisY: 12,
  },
]

function Grafik({ k }: { k: Kartu }) {
  return (
    <svg viewBox="0 0 200 96" role="img" aria-label={`Bentuk kurva untuk ${k.judul}`}>
      <line x1={6} y1={88} x2={194} y2={88} stroke="#D6CDBC" strokeWidth={1.2} />
      <line x1={6} y1={6} x2={6} y2={88} stroke="#D6CDBC" strokeWidth={1.2} />
      {k.garisY !== null && (
        <line x1={6} y1={k.garisY} x2={194} y2={k.garisY}
              stroke={WARNA.sudut} strokeWidth={1.5} strokeDasharray="6 4" />
      )}
      <path d={k.jalur} fill="none" stroke={WARNA.miring} strokeWidth={2.2}
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const KARTU_NYATA: KartuNyata[] = KARTU.map((k, i) => ({
  id: k.id,
  gambar: k.gambar,
  nomor: String(i + 1).padStart(2, '0'),
  judul: k.judul,
  inti: k.isi,
  rumus: k.batas,
  grafik: <Grafik k={k} />,
}))

export default function DuniaNyataLimit() {
  return <GaleriNyata kartu={KARTU_NYATA} />
}
