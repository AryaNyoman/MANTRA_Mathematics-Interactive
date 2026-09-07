'use client'

import { MONO, WARNA } from '@/components/widget/turunan/koordinat'

/**
 * Galeri "Turunan di sekitar kita", Materi 12. TIDAK interaktif.
 *
 * KENAPA KURVANYA DIHITUNG, BUKAN DIGAMBAR TANGAN
 * Galeri Limit menuliskan jalur bezier-nya langsung, dan itu cukup di sana
 * karena yang ditunjukkan cuma BENTUK umum. Di sini tiap kartu memuat angka
 * yang juga tertulis di bacaan, misalnya puncak 125 meter pada detik ke-5.
 * Kalau kurvanya digambar tangan, gambar dan angka bisa berselisih tanpa ada
 * yang menyadarinya. Jadi jalurnya dihitung dari rumus yang sama dengan yang
 * dipakai bacaan, dan aturan proyek "kurva harus lahir dari nilai yang
 * dihitung" ikut terpenuhi.
 *
 * KENAPA TATA LETAKNYA GAYA SEBARIS
 * Galeri Limit memakai kelas `.galeri-limit` di globals.css. Berkas itu wilayah
 * sesi MATRA-DESAIN-UI-UX, jadi sesi ini tidak boleh menambah kelas baru di
 * sana, dan memakai kelas milik topik lain akan membuat perubahan gaya Limit
 * diam-diam mengubah tampilan Turunan.
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
    judul: 'Bola yang dilempar ke atas',
    isi: 'Tingginya h(t) = 50t - 5t². Turunan pertamanya kecepatan, turunan keduanya percepatan yang tetap -10.',
    tanda: 'kecepatan nol tepat di puncak, detik ke-5',
    jalur: jalurKartu(tinggiBola, 0, 10, 0, 140),
    titik: {
      x: KOTAK.kiri + (5 / 10) * (KOTAK.kanan - KOTAK.kiri),
      y: KOTAK.bawah - (125 / 140) * (KOTAK.bawah - KOTAK.atas),
    },
  },
  {
    judul: 'Bakteri di cawan',
    isi: 'Jumlahnya N(t) = 200·e^(t/2). Lajunya selalu setengah dari jumlahnya sendiri, jadi makin banyak makin cepat.',
    tanda: 'laju sebanding dengan jumlahnya',
    jalur: jalurKartu(bakteri, 0, 4, 0, 1600),
  },
  {
    judul: 'Kaleng paling hemat pelat',
    isi: 'Isinya dipatok 1 liter. Luas pelatnya L(r) = 2πr² + 2000/r, dan turunannya nol saat tinggi kaleng sama dengan diameternya.',
    tanda: 'paling hemat di r kira-kira 5,42 cm',
    jalur: jalurKartu(luasKaleng, 3, 9, 500, 900),
    titik: {
      x: KOTAK.kiri + ((5.42 - 3) / 6) * (KOTAK.kanan - KOTAK.kiri),
      y: KOTAK.bawah - ((luasKaleng(5.42) - 500) / 400) * (KOTAK.bawah - KOTAK.atas),
    },
  },
  {
    judul: 'Biaya membuat satu barang lagi',
    isi: 'Biaya totalnya 2.000.000 + 15.000x + 20x². Turunannya disebut biaya marginal, dan angkanya naik seiring produksi.',
    tanda: 'di barang ke-100, tambahannya 19.000 rupiah',
    jalur: jalurKartu(biayaMarginal, 0, 200, 14000, 24000),
    titik: {
      x: KOTAK.kiri + (100 / 200) * (KOTAK.kanan - KOTAK.kiri),
      y: KOTAK.bawah - ((19000 - 14000) / 10000) * (KOTAK.bawah - KOTAK.atas),
    },
  },
]

export default function DuniaNyataTurunan() {
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      {KARTU.map((k) => (
        <figure key={k.judul} className="blok" style={{ margin: 0 }}>
          <div className="cap">{k.judul}</div>
          <svg viewBox={`0 0 ${KOTAK.lebar} ${KOTAK.tinggi}`} role="img"
               aria-label={`Bentuk kurva untuk ${k.judul}. ${k.tanda}.`}
               style={{ width: '100%', height: 'auto', maxWidth: 320 }}>
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
          <figcaption style={{ margin: 0 }}>
            <p style={{ margin: '0.4rem 0 0.3rem' }}>{k.isi}</p>
            <span style={{ fontFamily: MONO, fontSize: '0.78rem', color: WARNA.sudut }}>
              {k.tanda}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
