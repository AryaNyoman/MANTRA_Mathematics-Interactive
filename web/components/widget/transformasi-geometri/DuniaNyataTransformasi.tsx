'use client'

import { cerminGarisTegak, rotasi, translasi, type Titik } from './matriks'
import { ALAT, GESER, PETA, PRAPETA, WARNA } from './gaya'

/**
 * Galeri Materi 13: tiga tempat transformasi geometri benar-benar dipakai.
 *
 * KENAPA GAMBARNYA DIBUAT SENDIRI, BUKAN FOTO
 * Topik lain di MANTRA memakai foto berlisensi terbuka, dan itu tepat di sana:
 * yang perlu ditunjukkan adalah bahwa keadaannya sungguh terjadi. Di sini
 * berbeda. Yang perlu ditunjukkan justru MEKANISMENYA, yaitu bahwa gambar itu
 * benar-benar tersusun dari transformasi yang baru saja dipelajari.
 *
 * Karena itu ketiga gambar di bawah bukan ilustrasi tentang transformasi. Tiap
 * bentuknya dihitung dengan `translasi`, `cerminGarisTegak`, dan `rotasi` yang
 * sama persis dengan yang dipakai kedua belas widget lain. Kalau rumusnya
 * salah, gambar di halaman ini ikut salah, dan itu memang yang diinginkan:
 * ilustrasinya membuktikan materinya, bukan sekadar menemani.
 *
 * Kelas CSS-nya meminjam galeri Materi 10 Trigonometri (`galeri-nyata`,
 * `kartu-nyata`, `foto-nyata`), sebab bentuk yang dibutuhkan sama persis dan
 * `app/globals.css` bukan wilayah sesi ini untuk diubah.
 */

/** Motif dasar untuk ornamen: bentuk daun yang sengaja tidak simetris. */
const MOTIF: Titik[] = [
  { x: 0, y: 0 },
  { x: 1, y: 0.25 },
  { x: 1.45, y: 1 },
  { x: 0.6, y: 1.25 },
  { x: 0, y: 0.7 },
]

/** Badan pesawat kecil, menghadap ke kanan, berpusat di titik asal. */
const SPRITE: Titik[] = [
  { x: 0.9, y: 0 },
  { x: -0.5, y: 0.55 },
  { x: -0.2, y: 0 },
  { x: -0.5, y: -0.55 },
]

/** Mengubah senarai titik matematika jadi atribut `points` SVG. */
function jalur(titik: Titik[], skala: number, geserX: number, geserY: number, tinggi: number) {
  return titik
    .map((t) => `${geserX + t.x * skala},${tinggi - (geserY + t.y * skala)}`)
    .join(' ')
}

function Ornamen() {
  const skala = 22
  const tinggi = 150
  const bentuk: { titik: Titik[]; warna: string }[] = []

  // Empat kolom, tiap kolom dicerminkan bergantian, lalu seluruhnya
  // ditranslasikan menurun untuk baris kedua. Persis cara motif berulang
  // disusun pada kain dan ubin.
  for (let baris = 0; baris < 2; baris++) {
    for (let kolom = 0; kolom < 4; kolom++) {
      const geser: Titik = { x: kolom * 1.7, y: baris * 1.6 }
      const dasar = MOTIF.map((t) => translasi(t, geser))
      const jadi = kolom % 2 === 1
        ? dasar.map((t) => cerminGarisTegak(t, kolom * 1.7 + 0.72))
        : dasar
      bentuk.push({ titik: jadi, warna: baris === 0 ? PETA : ALAT })
    }
  }

  return (
    <svg viewBox="0 0 300 150" style={{ width: '100%', height: '100%' }} role="img"
         aria-label="Motif daun yang diulang dengan translasi dan dicerminkan bergantian.">
      {bentuk.map((b, i) => (
        <polygon
          key={i}
          points={jalur(b.titik, skala, 22, 18, tinggi)}
          fill={b.warna} fillOpacity={0.18} stroke={b.warna} strokeWidth={1.6}
          strokeLinejoin="round"
        />
      ))}
    </svg>
  )
}

function Putaran() {
  const skala = 30
  const tinggi = 150
  const pusat: Titik = { x: 0, y: 0 }
  const jari = 1.9

  return (
    <svg viewBox="0 0 300 150" style={{ width: '100%', height: '100%' }} role="img"
         aria-label="Satu bentuk pesawat yang sama digambar delapan kali, tiap kali diputar 45 derajat.">
      <circle cx={150} cy={tinggi - 75} r={jari * skala} fill="none"
              stroke={WARNA.redup} strokeWidth={1} strokeDasharray="4 4" opacity={0.6} />
      {Array.from({ length: 8 }, (_, i) => i * 45).map((d, i) => {
        // Sprite digeser sejauh jari-jari, LALU seluruhnya diputar. Itu urutan
        // yang sama dengan komposisi di Materi 11: geser dulu, putar kemudian.
        const digeser = SPRITE.map((t) => translasi(t, { x: jari, y: 0 }))
        const diputar = digeser.map((t) => rotasi(t, d, pusat))
        return (
          <polygon
            key={d}
            points={jalur(diputar, skala, 150, 75, tinggi)}
            fill={i === 0 ? PETA : PRAPETA}
            fillOpacity={i === 0 ? 0.3 : 0.12}
            stroke={i === 0 ? PETA : PRAPETA}
            strokeWidth={1.6}
            strokeLinejoin="round"
          />
        )
      })}
    </svg>
  )
}

function LenganRobot() {
  const skala = 26
  const tinggi = 150
  const pangkal: Titik = { x: 0, y: 0 }
  const panjang1 = 2.1
  const panjang2 = 1.5

  /** Tiga pose, tiap pose sepasang sudut sendi. */
  const POSE: { s1: number; s2: number; warna: string }[] = [
    { s1: 20, s2: -35, warna: PRAPETA },
    { s1: 55, s2: -70, warna: PETA },
    { s1: 95, s2: -100, warna: GESER },
  ]

  return (
    <svg viewBox="0 0 300 150" style={{ width: '100%', height: '100%' }} role="img"
         aria-label="Lengan robot dua ruas dalam tiga pose. Tiap sendi adalah rotasi terhadap pusat yang berbeda.">
      {POSE.map((pose) => {
        // Sendi pertama: ujung ruas satu adalah titik (panjang1, 0) yang
        // diputar terhadap pangkal.
        const sendi = rotasi({ x: panjang1, y: 0 }, pose.s1, pangkal)
        // Sendi kedua: ujung ruas dua diputar terhadap SENDI, bukan terhadap
        // pangkal. Sudut totalnya menumpuk, dan penumpukan itulah komposisi.
        const ujungLurus = translasi(sendi, { x: panjang2, y: 0 })
        const ujung = rotasi(ujungLurus, pose.s1 + pose.s2, sendi)

        const px = (t: Titik) => 40 + t.x * skala
        const py = (t: Titik) => tinggi - (30 + t.y * skala)

        return (
          <g key={pose.s1}>
            <line x1={px(pangkal)} y1={py(pangkal)} x2={px(sendi)} y2={py(sendi)}
                  stroke={pose.warna} strokeWidth={4} strokeLinecap="round" opacity={0.85} />
            <line x1={px(sendi)} y1={py(sendi)} x2={px(ujung)} y2={py(ujung)}
                  stroke={pose.warna} strokeWidth={3} strokeLinecap="round" opacity={0.85} />
            <circle cx={px(sendi)} cy={py(sendi)} r={3.2} fill={pose.warna} />
            <circle cx={px(ujung)} cy={py(ujung)} r={2.6} fill={pose.warna} />
          </g>
        )
      })}
      <circle cx={40} cy={tinggi - 30} r={5} fill={WARNA.miring} />
    </svg>
  )
}

type Kartu = {
  nomor: string
  judul: string
  gambar: React.ReactNode
  transformasi: string
  inti: string
}

const CONTOH: Kartu[] = [
  {
    nomor: '01',
    judul: 'Motif berulang pada kain dan ubin',
    gambar: <Ornamen />,
    transformasi: 'translasi dan pencerminan',
    inti: 'Perajin tidak menggambar dua belas daun satu per satu. Ia menggambar SATU, lalu mengulanginya dengan geseran tetap, dan mencerminkan kolom yang berselang supaya polanya tidak terasa monoton. Motif batik parang memakai translasi miring, dan motif kawung memakai pencerminan pada dua garis sekaligus.',
  },
  {
    nomor: '02',
    judul: 'Benda berputar di animasi dan permainan',
    gambar: <Putaran />,
    transformasi: 'translasi lalu rotasi',
    inti: 'Kedelapan pesawat di gambar ini adalah bentuk yang SAMA, digambar ulang setiap kali dengan sudut yang bertambah 45 derajat. Program permainan bekerja begitu: bentuk aslinya disimpan sekali, dan yang dihitung ulang enam puluh kali per detik hanya transformasinya. Menyimpan setiap posisi sebagai gambar terpisah akan jauh lebih boros.',
  },
  {
    nomor: '03',
    judul: 'Lengan robot dan mesin bersendi',
    gambar: <LenganRobot />,
    transformasi: 'komposisi dua rotasi berbeda pusat',
    inti: 'Sendi pertama memutar seluruh lengan terhadap pangkalnya. Sendi kedua memutar ruas ujungnya terhadap sendi pertama, yang letaknya sudah ikut berpindah. Inilah komposisi transformasi berpusat berbeda dari Materi 11, dan urutannya tidak boleh dibalik: memutar sendi kedua dulu memberi posisi ujung yang berbeda.',
  },
]

export default function DuniaNyataTransformasi() {
  return (
    <div className="galeri-nyata">
      {CONTOH.map((k) => (
        <figure className="kartu-nyata" key={k.nomor}>
          <div className="foto-nyata">{k.gambar}</div>
          <figcaption>
            <div className="nyata-no">{k.nomor}</div>
            <h4>{k.judul}</h4>
            <p><b>Yang dipakai:</b> {k.transformasi}</p>
            <p>{k.inti}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
