'use client'

import { DAERAH_ATAS, MONO, WARNA } from '@/components/widget/integral/koordinat'

/**
 * Galeri "Integral di sekitar kita", Materi 11. TIDAK interaktif.
 *
 * KENAPA GAMBAR SENDIRI, BUKAN FOTO
 * Sama alasannya dengan galeri Limit: yang mau ditunjukkan di sini bukan DI
 * MANA bendanya berada, melainkan BENTUK daerah yang luasnya dihitung. Foto
 * mobil tidak memperlihatkan luas di bawah grafik kecepatan; grafiknya yang
 * memperlihatkan. Sekalian menghindari urusan lisensi gambar.
 *
 * KENAPA JALURNYA DIHITUNG, BUKAN DITULIS TANGAN
 * Galeri Limit menuliskan jalur SVG-nya sebagai teks, dan itu cukup di sana
 * sebab yang digambar cuma bentuk umum. Di sini gambarnya harus COCOK dengan
 * angka yang tertulis di kartunya: daerah yang terarsir adalah daerah yang
 * luasnya disebutkan. Jalur yang ditulis tangan cepat atau lambat akan
 * berbeda dari rumusnya, dan gambar yang membantah keterangannya sendiri lebih
 * merusak daripada gambar yang tidak ada.
 *
 * Kelas CSS `galeri-limit` sengaja dipakai ulang, bukan dibuat yang baru:
 * bentuk kartunya memang harus sama supaya siswa mengenalinya sebagai jenis
 * halaman yang sama. Menyalin CSS-nya dengan nama lain cuma menambah dua
 * tempat yang harus dijaga tetap seragam.
 *
 * SELURUH ANGKA DI BERKAS INI DIPERIKSA sympy lewat `alat/materi-integral.json`:
 * 20.000 (m11-penjualan-ponsel), 35 (m11-jarak-dari-kecepatan), 50/3
 * (m11-usaha-pegas), dan 36.000 pada t = 4 (m11-penghematan-empat-tahun,
 * m11-penghematan-akar).
 */

const KOTAK = { x0: 6, x1: 194, yAtas: 8, yBawah: 88 }

type Kartu = {
  judul: string
  isi: string
  hasil: string
  f: (x: number) => number
  xMin: number
  xMax: number
  yMaks: number
  /** batas daerah yang diarsir */
  isiDari: number
  isiSampai: number
}

const KARTU: Kartu[] = [
  {
    judul: 'Penjualan dari laju penjualan',
    isi: 'Yang tercatat banyak unit terjual per tahun, bukan totalnya. Totalnya adalah luas di bawah grafik itu.',
    hasil: '4 tahun pertama: 20.000 unit',
    f: (x) => 3000 * Math.sqrt(x) + 1000,
    xMin: 0, xMax: 5, yMaks: 7800,
    isiDari: 0, isiSampai: 4,
  },
  {
    judul: 'Jarak dari kecepatan',
    isi: 'Mobil melambat teratur, 12 dikurangi 2t meter per detik. Jarak yang ditempuh adalah luas di bawah grafik kecepatan.',
    hasil: '5 detik pertama: 35 meter',
    f: (t) => 12 - 2 * t,
    xMin: 0, xMax: 6, yMaks: 13,
    isiDari: 0, isiSampai: 5,
  },
  {
    judul: 'Usaha yang dilakukan gaya',
    isi: 'Gaya berubah sepanjang jalan, jadi rumus gaya dikali jarak tidak berlaku. Jalannya dipotong-potong, lalu dijumlahkan.',
    hasil: 'dari 1 ke 3: 50/3 joule',
    f: (x) => x * x + 2 * x,
    xMin: 0, xMax: 3.5, yMaks: 20,
    isiDari: 1, isiSampai: 3,
  },
  {
    judul: 'Kapan modal kembali',
    isi: 'Peralatan seharga 36.000 menghemat biaya dengan laju 4.000x + 1.000 per tahun. Yang dicari bukan hasilnya, melainkan batas atasnya.',
    hasil: 'penghematan menutup modal pada tahun ke-4',
    f: (x) => 4000 * x + 1000,
    xMin: 0, xMax: 5, yMaks: 22000,
    isiDari: 0, isiSampai: 4,
  },
]

/** Petakan koordinat data ke kotak gambar kecil. */
function petak(k: Kartu) {
  const lebar = KOTAK.x1 - KOTAK.x0
  const tinggi = KOTAK.yBawah - KOTAK.yAtas
  return {
    x: (x: number) => KOTAK.x0 + ((x - k.xMin) / (k.xMax - k.xMin)) * lebar,
    y: (y: number) => KOTAK.yBawah - (y / k.yMaks) * tinggi,
  }
}

function jalurKurva(k: Kartu, langkah = 80): string {
  const p = petak(k)
  const titik: string[] = []
  for (let i = 0; i <= langkah; i++) {
    const x = k.xMin + ((k.xMax - k.xMin) * i) / langkah
    const y = k.f(x)
    if (!Number.isFinite(y) || y < 0) continue
    titik.push(`${titik.length === 0 ? 'M' : 'L'} ${p.x(x).toFixed(1)} ${p.y(y).toFixed(1)}`)
  }
  return titik.join(' ')
}

function jalurIsi(k: Kartu, langkah = 60): string {
  const p = petak(k)
  const titik: string[] = [`M ${p.x(k.isiDari).toFixed(1)} ${p.y(0).toFixed(1)}`]
  for (let i = 0; i <= langkah; i++) {
    const x = k.isiDari + ((k.isiSampai - k.isiDari) * i) / langkah
    titik.push(`L ${p.x(x).toFixed(1)} ${p.y(Math.max(0, k.f(x))).toFixed(1)}`)
  }
  titik.push(`L ${p.x(k.isiSampai).toFixed(1)} ${p.y(0).toFixed(1)}`, 'Z')
  return titik.join(' ')
}

export default function DuniaNyataIntegral() {
  return (
    <div className="galeri-limit">
      {KARTU.map((k) => (
        <figure key={k.judul}>
          <svg viewBox="0 0 200 96" role="img" aria-label={`Grafik untuk ${k.judul}. ${k.hasil}.`}>
            <line x1={KOTAK.x0} y1={KOTAK.yBawah} x2={KOTAK.x1} y2={KOTAK.yBawah}
                  stroke="#D6CDBC" strokeWidth={1.2} />
            <line x1={KOTAK.x0} y1={KOTAK.yAtas} x2={KOTAK.x0} y2={KOTAK.yBawah}
                  stroke="#D6CDBC" strokeWidth={1.2} />
            <path d={jalurIsi(k)} fill={DAERAH_ATAS} fillOpacity={0.3} stroke="none" />
            <path d={jalurKurva(k)} fill="none" stroke={WARNA.miring} strokeWidth={2.2}
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <figcaption>
            <b>{k.judul}</b>
            <p>{k.isi}</p>
            <span style={{ fontFamily: MONO }}>{k.hasil}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
