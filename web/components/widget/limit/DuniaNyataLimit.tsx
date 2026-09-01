'use client'

import { MONO, WARNA } from '@/components/widget/limit/koordinat'

/**
 * Galeri "Dipakai di Dunia Nyata", Limit tahap 10. Tidak interaktif.
 *
 * KENAPA GAMBAR SENDIRI, BUKAN FOTO
 * Tahap 10 Trigonometri memakai foto, dan itu tepat di sana: yang mau
 * ditunjukkan adalah DI MANA segitiga berada, dan foto menjawabnya langsung.
 * Di sini yang mau ditunjukkan adalah BENTUK KURVANYA, yaitu bagaimana sesuatu
 * merapat ke satu nilai. Foto roller coaster tidak memperlihatkan itu,
 * grafiknya yang memperlihatkan.
 *
 * Sekalian menghindari urusan lisensi gambar, karena semuanya digambar sendiri.
 * Kalau ARYA lebih suka foto, tinggal diganti, keputusannya ada di dia.
 */

type Kartu = {
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
    judul: 'Rel wahana',
    isi: 'Lintasan disusun dari beberapa potongan rumus. Di tiap sambungan, tinggi rel kiri dan kanan harus sama persis.',
    batas: 'syaratnya: kontinu',
    jalur: 'M 6 70 C 40 70, 46 14, 78 14 C 110 14, 104 78, 140 78 C 168 78, 176 52, 194 52',
    garisY: null,
  },
  {
    judul: 'Kadar obat dalam darah',
    isi: 'Obat menumpuk tiap kali diminum, tapi tubuh juga membuangnya. Lama-lama kadarnya berhenti naik.',
    batas: 'limitnya: kadar mantap',
    jalur: 'M 6 84 L 20 40 L 34 56 L 48 26 L 62 40 L 76 20 L 90 31 L 104 17 L 118 26 L 132 15 L 146 22 L 160 14 L 174 20 L 194 14',
    garisY: 14,
  },
  {
    judul: 'Biaya rata-rata produksi',
    isi: 'Biaya tetap dibagi ke makin banyak barang, jadi biaya per barang turun. Tapi biaya bahannya tidak bisa hilang.',
    batas: 'limitnya: biaya terendah',
    jalur: 'M 6 8 C 24 52, 40 64, 70 70 C 104 76, 140 78, 194 79',
    garisY: 80,
  },
  {
    judul: 'Populasi di danau',
    isi: 'Awalnya tumbuh cepat, lalu melambat, lalu hampir berhenti di satu jumlah tertentu.',
    batas: 'limitnya: daya dukung',
    jalur: 'M 6 80 C 40 79, 56 74, 74 52 C 92 30, 108 17, 140 14 C 164 12, 178 12, 194 12',
    garisY: 12,
  },
]

export default function DuniaNyataLimit() {
  return (
    <div className="galeri-limit">
      {KARTU.map((k) => (
        <figure key={k.judul}>
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
          <figcaption>
            <b>{k.judul}</b>
            <p>{k.isi}</p>
            <span style={{ fontFamily: MONO }}>{k.batas}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
