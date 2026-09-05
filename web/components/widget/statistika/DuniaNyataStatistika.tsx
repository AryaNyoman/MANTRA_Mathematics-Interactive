'use client'

import type { ReactNode } from 'react'
import { MONO, PERAN } from '@/components/widget/statistika/warna-data'
import type { PropWidget } from '@/components/widget/statistika/jenis'

/**
 * Galeri "Statistika di sekitar kita", Materi 14. Tidak interaktif.
 *
 * Permintaan ARYA 5 Sep 2026: Statistika belum punya materi contoh nyata
 * seperti topik lain. Polanya mengikuti galeri Limit (Materi 10): gambar
 * grafik DIGAMBAR SENDIRI, bukan foto. Statistika memang tentang grafik,
 * jadi grafik kecil yang tepat lebih berbicara daripada foto stadion atau
 * kantin, dan sekalian tidak ada urusan lisensi gambar.
 *
 * ANGKANYA ANGKA CONTOH. Semua angka di kartu dan di bacaan Materi 14 dibuat
 * mirip kenyataan supaya cara membacanya terasa nyata, tetapi bukan data
 * resmi mana pun, dan bacaannya menyatakan itu. Yang dipelajari adalah cara
 * bertanya, bukan angkanya.
 *
 * Tiap kartu menyebut alat mana dari Materi 01 sampai 13 yang sedang bekerja,
 * supaya siswa melihat benang merahnya: tidak ada alat baru di sini.
 */

const GARIS = '#D6CDBC'
const KERTAS = '#FFFDFA'

/** Kotak 200 x 96 dengan dua sumbu tipis; isinya diberikan pemanggil. */
function Bingkai({ anak, label }: { anak: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 200 96" role="img" aria-label={label}>
      <line x1={12} y1={86} x2={194} y2={86} stroke={GARIS} strokeWidth={1.2} />
      <line x1={12} y1={6} x2={12} y2={86} stroke={GARIS} strokeWidth={1.2} />
      {anak}
    </svg>
  )
}

/* 1. Histogram nilai rapor: sebelas siswa di 6, tiga di 7, enam di 10.
   Rata-rata 7,35, median 6. Batang tinggi di kiri, batang sedang di kanan. */
function NilaiRapor() {
  const nilai = [4, 5, 6, 7, 8, 9, 10]
  const f = [0, 0, 11, 3, 0, 0, 6]
  const x = (n: number) => 20 + (n - 4) * 25
  const tinggi = (k: number) => (k / 11) * 68
  const xMean = x(7.35) + 8
  const xMedian = x(6) + 8
  return (
    <Bingkai
      label="Histogram nilai rapor: tumpukan besar di nilai 6 dan tumpukan kecil di nilai 10"
      anak={
        <>
          {nilai.map((n, i) => (
            <rect key={n} x={x(n)} y={86 - tinggi(f[i])} width={16} height={tinggi(f[i])}
                  fill={PERAN.data} rx={1.5} />
          ))}
          <line x1={xMedian} y1={12} x2={xMedian} y2={86} stroke={PERAN.tinta} strokeWidth={1.4}
                strokeDasharray="4 3" />
          <line x1={xMean} y1={12} x2={xMean} y2={86} stroke={PERAN.sorot} strokeWidth={1.4}
                strokeDasharray="4 3" />
          <text x={xMedian - 3} y={10} textAnchor="end" fontSize={7.5} fontFamily={MONO} fill={PERAN.tinta}>median 6</text>
          <text x={xMean + 3} y={10} fontSize={7.5} fontFamily={MONO} fill={PERAN.sorot}>rata-rata 7,35</text>
          {nilai.map((n) => (
            <text key={n} x={x(n) + 8} y={94} textAnchor="middle" fontSize={7} fontFamily={MONO}
                  fill={PERAN.redup}>{n}</text>
          ))}
        </>
      }
    />
  )
}

/* 2. Curah hujan tiap bulan: tinggi di Desember sampai Februari, rendah di
   Juli sampai September. Diagram garis 12 titik. */
function CurahHujan() {
  const mm = [300, 280, 220, 150, 90, 60, 40, 40, 70, 130, 220, 290]
  const x = (i: number) => 18 + i * 16
  const y = (v: number) => 86 - (v / 300) * 70
  const jalur = mm.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v).toFixed(1)}`).join(' ')
  return (
    <Bingkai
      label="Diagram garis curah hujan dua belas bulan, tinggi di awal dan akhir tahun, rendah di tengah"
      anak={
        <>
          <path d={jalur} fill="none" stroke={PERAN.data} strokeWidth={2.2}
                strokeLinejoin="round" strokeLinecap="round" />
          {mm.map((v, i) => (
            <circle key={i} cx={x(i)} cy={y(v)} r={2.4} fill={PERAN.data} stroke={KERTAS} strokeWidth={1} />
          ))}
          {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((b, i) => (
            <text key={i} x={x(i)} y={94} textAnchor="middle" fontSize={7} fontFamily={MONO}
                  fill={PERAN.redup}>{b}</text>
          ))}
          <text x={x(0) + 4} y={y(300) - 4} fontSize={7.5} fontFamily={MONO} fill={PERAN.sorot}>bulan terbasah</text>
        </>
      }
    />
  )
}

/* 3. Poin dua pemain dalam lima pertandingan. Keduanya rata-rata 15:
   pemain A 13, 15, 17, 14, 16 (rapat); pemain B 4, 28, 15, 6, 22 (liar). */
function DuaPemain() {
  const a = [13, 15, 17, 14, 16]
  const b = [4, 28, 15, 6, 22]
  const x = (i: number) => 30 + i * 36
  const y = (v: number) => 86 - (v / 30) * 74
  const jalur = (d: number[]) => d.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v).toFixed(1)}`).join(' ')
  return (
    <Bingkai
      label="Poin dua pemain dalam lima pertandingan: satu garis rapat di sekitar 15, satu garis naik turun tajam"
      anak={
        <>
          <line x1={12} y1={y(15)} x2={194} y2={y(15)} stroke={PERAN.sorot} strokeWidth={1.2}
                strokeDasharray="4 3" />
          <text x={192} y={y(15) - 3} textAnchor="end" fontSize={7.5} fontFamily={MONO} fill={PERAN.sorot}>rata-rata 15, keduanya</text>
          <path d={jalur(b)} fill="none" stroke={PERAN.banding} strokeWidth={2}
                strokeLinejoin="round" strokeLinecap="round" opacity={0.85} />
          <path d={jalur(a)} fill="none" stroke={PERAN.data} strokeWidth={2.4}
                strokeLinejoin="round" strokeLinecap="round" />
          {a.map((v, i) => <circle key={`a${i}`} cx={x(i)} cy={y(v)} r={2.6} fill={PERAN.data} />)}
          {b.map((v, i) => <circle key={`b${i}`} cx={x(i)} cy={y(v)} r={2.6} fill={PERAN.banding} />)}
          <text x={x(4) + 4} y={y(16) + 3} fontSize={7.5} fontFamily={MONO} fill={PERAN.data}>A</text>
          <text x={x(4) + 4} y={y(22) + 3} fontSize={7.5} fontFamily={MONO} fill={PERAN.banding}>B</text>
        </>
      }
    />
  )
}

/* 4. Survei jajanan: bakso 60%, mi 20%, roti 12%, lainnya 8%. Batang tegak. */
function SurveiKantin() {
  const d = [['bakso', 60], ['mi', 20], ['roti', 12], ['lain', 8]] as const
  const x = (i: number) => 26 + i * 42
  const tinggi = (p: number) => (p / 60) * 66
  return (
    <Bingkai
      label="Diagram batang survei jajanan: bakso enam puluh persen, jauh di atas yang lain"
      anak={
        <>
          {d.map(([nama, p], i) => (
            <g key={nama}>
              <rect x={x(i)} y={86 - tinggi(p)} width={26} height={tinggi(p)}
                    fill={i === 0 ? PERAN.banding : PERAN.data} rx={2} />
              <text x={x(i) + 13} y={86 - tinggi(p) - 3} textAnchor="middle" fontSize={7.5}
                    fontFamily={MONO} fill={PERAN.tinta}>{p}%</text>
              <text x={x(i) + 13} y={94} textAnchor="middle" fontSize={7} fontFamily={MONO}
                    fill={PERAN.redup}>{nama}</text>
            </g>
          ))}
          <text x={190} y={14} textAnchor="end" fontSize={7.5} fontFamily={MONO} fill={PERAN.sorot}>dari berapa orang?</text>
        </>
      }
    />
  )
}

/* 5. Data yang sama dua kali: 486 lalu 512. Kiri sumbu dari 0 (nyaris sama
   tinggi), kanan sumbu dipotong di 480 (terlihat melonjak). */
function SumbuDipotong() {
  const kiri = (v: number) => (v / 520) * 66
  const kanan = (v: number) => ((v - 480) / 40) * 66
  return (
    <svg viewBox="0 0 200 96" role="img"
         aria-label="Dua grafik batang dari angka yang sama: sumbu dari nol tampak rata, sumbu dipotong tampak melonjak">
      <line x1={12} y1={86} x2={92} y2={86} stroke={GARIS} strokeWidth={1.2} />
      <line x1={12} y1={6} x2={12} y2={86} stroke={GARIS} strokeWidth={1.2} />
      <line x1={108} y1={86} x2={194} y2={86} stroke={GARIS} strokeWidth={1.2} />
      <line x1={108} y1={6} x2={108} y2={86} stroke={GARIS} strokeWidth={1.2} />
      <line x1={100} y1={8} x2={100} y2={90} stroke={GARIS} strokeWidth={1} strokeDasharray="3 3" />
      <rect x={28} y={86 - kiri(486)} width={22} height={kiri(486)} fill={PERAN.data} rx={2} />
      <rect x={58} y={86 - kiri(512)} width={22} height={kiri(512)} fill={PERAN.data} rx={2} />
      <rect x={124} y={86 - kanan(486)} width={22} height={kanan(486)} fill={PERAN.banding} rx={2} />
      <rect x={154} y={86 - kanan(512)} width={22} height={kanan(512)} fill={PERAN.banding} rx={2} />
      <text x={16} y={94} fontSize={7} fontFamily={MONO} fill={PERAN.redup}>mulai dari 0</text>
      <text x={112} y={94} fontSize={7} fontFamily={MONO} fill={PERAN.banding}>mulai dari 480</text>
      <text x={39} y={86 - kiri(486) - 3} textAnchor="middle" fontSize={7} fontFamily={MONO} fill={PERAN.tinta}>486</text>
      <text x={69} y={86 - kiri(512) - 3} textAnchor="middle" fontSize={7} fontFamily={MONO} fill={PERAN.tinta}>512</text>
      <text x={135} y={86 - kanan(486) - 3} textAnchor="middle" fontSize={7} fontFamily={MONO} fill={PERAN.tinta}>486</text>
      <text x={165} y={86 - kanan(512) - 3} textAnchor="middle" fontSize={7} fontFamily={MONO} fill={PERAN.tinta}>512</text>
    </svg>
  )
}

/* 6. Diagram pencar jam belajar lawan nilai: naik ke kanan, tetapi berpencar. */
function BelajarNilai() {
  const t: Array<[number, number]> = [
    [2, 55], [3, 58], [4, 64], [5, 63], [6, 70], [7, 72], [8, 75], [9, 80], [10, 78], [11, 85],
  ]
  const x = (h: number) => 18 + (h - 1) * 16
  const y = (n: number) => 86 - ((n - 40) / 50) * 74
  return (
    <Bingkai
      label="Diagram pencar jam belajar lawan nilai ujian, sepuluh titik naik ke kanan"
      anak={
        <>
          <line x1={x(1.5)} y1={y(52)} x2={x(11.5)} y2={y(86)} stroke={PERAN.sorot} strokeWidth={1.4}
                strokeDasharray="5 4" />
          {t.map(([h, n], i) => (
            <circle key={i} cx={x(h)} cy={y(n)} r={3.2} fill={PERAN.data} stroke={KERTAS} strokeWidth={1} />
          ))}
          <text x={190} y={y(50)} textAnchor="end" fontSize={7.5} fontFamily={MONO} fill={PERAN.sorot}>hubungan, bukan sebab</text>
          <text x={104} y={94} textAnchor="middle" fontSize={7} fontFamily={MONO} fill={PERAN.redup}>jam belajar seminggu</text>
        </>
      }
    />
  )
}

type Kartu = { judul: string; isi: string; alat: string; gambar: ReactNode }

const KARTU: Kartu[] = [
  {
    judul: 'Nilai rapor satu kelas',
    isi: 'Rata-rata 7,35 terdengar bagus, tetapi histogramnya memperlihatkan sebelas siswa di angka 6. Median kelas ini 6.',
    alat: 'histogram · median (Materi 02, 05)',
    gambar: <NilaiRapor />,
  },
  {
    judul: 'Curah hujan sepanjang tahun',
    isi: 'Petani dan pengelola waduk tidak butuh rata-rata setahun. Yang mereka baca adalah kapan hujan datang, dan diagram garis menjawabnya.',
    alat: 'diagram garis · modus (Materi 02, 05)',
    gambar: <CurahHujan />,
  },
  {
    judul: 'Memilih pemain untuk laga penentuan',
    isi: 'Dua pemain sama-sama rata-rata 15 poin. Yang satu selalu 13 sampai 17, yang lain kadang 4 kadang 28. Simpangan bakunya yang membedakan.',
    alat: 'simpangan baku (Materi 08)',
    gambar: <DuaPemain />,
  },
  {
    judul: 'Survei jajanan kantin',
    isi: '"60% memilih bakso." Sebelum menunya diubah: 60% dari berapa orang, dan ditanya di mana?',
    alat: 'frekuensi relatif (Materi 04)',
    gambar: <SurveiKantin />,
  },
  {
    judul: 'Grafik di iklan dan berita',
    isi: 'Angka yang sama, dua kesan berbeda. Dari 486 ke 512 hanya naik sekitar 5 persen, tetapi sumbu yang dipotong membuatnya tampak berlipat.',
    alat: 'sumbu yang jujur (Materi 13)',
    gambar: <SumbuDipotong />,
  },
  {
    judul: 'Jam belajar dan nilai ujian',
    isi: 'Titiknya naik ke kanan, hubungannya nyata. Tetapi belajar lama bukan satu-satunya sebab: tidur, buku, dan pemahaman awal ikut bermain.',
    alat: 'diagram pencar · korelasi (Materi 10, 12)',
    gambar: <BelajarNilai />,
  },
]

export default function DuniaNyataStatistika({ children }: PropWidget) {
  const kiri = (
    <div className="isi-gulir">
      <div className="galeri-statistika">
        {KARTU.map((k) => (
          <figure key={k.judul}>
            {k.gambar}
            <figcaption>
              <b>{k.judul}</b>
              <p>{k.isi}</p>
              <span style={{ fontFamily: MONO }}>{k.alat}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
  return <>{children({ kiri, kanan: null })}</>
}
