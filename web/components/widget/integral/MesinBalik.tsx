'use client'

import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import { useSedangDiubah } from '@/components/kendali/sedang-diubah'
import Bidang from '@/components/widget/integral/Bidang'
import {
  DAERAH_ATAS, WARNA, angka, jalurFungsi, jendelaTetap, keLayar, type Jendela,
} from '@/components/widget/integral/koordinat'
import {
  batasi, bulatkanKe, posisiMatematika, titikTersentuh,
} from '@/components/widget/integral/seret'

/**
 * Widget Materi 01: mesin turunan yang dijalankan MUNDUR.
 *
 * APA YANG DIAJARKAN
 * Dua hal sekaligus, dan keduanya sengaja ada di satu layar:
 *   1. Antiturunan ditemukan dengan MENEBAK lalu MEMERIKSA. Pemeriksaannya
 *      cuma satu cara, yaitu menurunkan tebakan itu lagi. Mesin di sini
 *      melakukan persis itu dan menuliskan hasilnya, jadi siswa melihat
 *      tebakan yang salah gagal karena alasan yang jelas, bukan karena ditolak.
 *   2. Menggeser C menggeser seluruh kurva tanpa mengubah kemiringannya di
 *      titik mana pun. Itulah sebabnya turunannya tidak berubah, dan itu satu
 *      hal yang jauh lebih mudah DILIHAT daripada dibaca.
 *
 * KENAPA TITIK SINGGUNGNYA BISA DISERET
 * Aturan proyek: widget sebisanya ditarik langsung, bukan cuma lewat penggeser.
 * Di sini menyeret juga yang membuat butir 2 meyakinkan: siswa memindahkan
 * titik ke mana pun, lalu menggeser C, dan angka kemiringannya tetap sama di
 * setiap tempat yang ia coba sendiri.
 *
 * KENAPA JENDELANYA TETAP PER SOAL
 * Jendela TIDAK boleh ikut melar saat titik diseret atau C digeser, kalau tidak
 * seluruh gambar bergoyang dan seretannya terasa licin (aturan proyek, temuan
 * ARYA). Tetapi tiap laju punya jangkauan nilai yang berbeda jauh: x pangkat
 * tiga sampai belasan, sinus cuma sampai satu. Satu jendela untuk semuanya
 * membuat sinus tampil sebagai garis lurus. Jadi jendelanya ditulis per soal,
 * dan tetap selama soal itu dipilih.
 */

export const BATAS_C = { min: -3, maks: 3, langkah: 0.5 }
export const BATAS_X = { min: -2, maks: 2, langkah: 0.25 }

/** Satu calon jawaban, lengkap dengan turunannya supaya mesin bisa memeriksa. */
export type Calon = {
  label: string
  /** nilai F(x), untuk digambar */
  F: (x: number) => number
  /** turunan F, ditulis apa adanya supaya mesin bisa menampilkannya */
  turunan: string
  benar: boolean
}

export type Soal = {
  nilai: string
  /** label pendek untuk tombol Pilihan */
  label: string
  /** laju yang dicari antiturunannya, ditulis untuk layar */
  lajuTulis: string
  /** nilai laju di x, dipakai sebagai kemiringan garis singgung */
  f: (x: number) => number
  jendela: Jendela
  calon: Calon[]
}

export const SOAL: Soal[] = [
  {
    nilai: '2x+1',
    label: '2x + 1',
    lajuTulis: '2x + 1',
    f: (x) => 2 * x + 1,
    jendela: jendelaTetap(-2.2, 2.2, -4, 11),
    calon: [
      { label: 'x² + x', F: (x) => x * x + x, turunan: '2x + 1', benar: true },
      { label: 'x² + 1', F: (x) => x * x + 1, turunan: '2x', benar: false },
      { label: '2x² + x', F: (x) => 2 * x * x + x, turunan: '4x + 1', benar: false },
    ],
  },
  {
    nilai: '3x2',
    label: '3x²',
    lajuTulis: '3x²',
    f: (x) => 3 * x * x,
    jendela: jendelaTetap(-2.2, 2.2, -14, 14),
    calon: [
      { label: 'x³', F: (x) => x ** 3, turunan: '3x²', benar: true },
      { label: '6x', F: (x) => 6 * x, turunan: '6', benar: false },
      { label: '3x³', F: (x) => 3 * x ** 3, turunan: '9x²', benar: false },
    ],
  },
  {
    nilai: 'cos',
    label: 'cos x',
    lajuTulis: 'cos x',
    f: (x) => Math.cos(x),
    jendela: jendelaTetap(-2.2, 2.2, -4.5, 4.5),
    calon: [
      { label: 'sin x', F: (x) => Math.sin(x), turunan: 'cos x', benar: true },
      { label: '-sin x', F: (x) => -Math.sin(x), turunan: '-cos x', benar: false },
      { label: '-cos x', F: (x) => -Math.cos(x), turunan: 'sin x', benar: false },
    ],
  },
  {
    nilai: '2',
    label: '2',
    lajuTulis: '2',
    f: () => 2,
    jendela: jendelaTetap(-2.2, 2.2, -8, 8),
    calon: [
      { label: '2x', F: (x) => 2 * x, turunan: '2', benar: true },
      { label: 'x²', F: (x) => x * x, turunan: '2x', benar: false },
      { label: '2x²', F: (x) => 2 * x * x, turunan: '4x', benar: false },
    ],
  },
]

export const AWAL = { soal: SOAL[0].nilai, calon: 0, C: 0, x: 1 }

export function soalDari(nilai: string): Soal {
  return SOAL.find((s) => s.nilai === nilai) ?? SOAL[0]
}

export default function MesinBalik({
  soal,
  calon,
  C,
  x,
  onGeserX,
}: {
  soal: string
  /** indeks calon yang sedang dipilih siswa */
  calon: number
  C: number
  x: number
  onGeserX: (x: number) => void
}) {
  const dipegang = useSedangDiubah()
  const [menyeret, setMenyeret] = useState(false)

  const s = soalDari(soal)
  const c = s.calon[Math.min(calon, s.calon.length - 1)]
  const j = s.jendela
  const p = keLayar(j)

  // Kurva yang digambar: calon yang sedang dipilih, digeser C.
  const kurva = (t: number) => c.F(t) + C
  const yTitik = kurva(x)
  const layarTitik = { x: p.x(x), y: p.y(yTitik) }

  /* Kemiringan garis singgung.
     Kalau calonnya BENAR, kemiringannya adalah laju yang dicari, dan itulah
     yang mau diperlihatkan. Kalau calonnya salah, kemiringannya dihitung dari
     kurva calon itu sendiri, sebab garis singgung yang tidak menempel pada
     kurvanya justru menyesatkan. Dihitung dengan beda maju-mundur, bukan rumus
     turunan per calon: satu tempat lebih sedikit untuk salah ketik. */
  const h = 1e-5
  const kemiringan = c.benar ? s.f(x) : (kurva(x + h) - kurva(x - h)) / (2 * h)

  // Panjang setengah garis singgung dalam satuan x, dipendekkan kalau curam
  // supaya ujungnya tidak melesat jauh keluar kotak.
  const panjang = Math.min(0.9, 6 / (1 + Math.abs(kemiringan)))
  const singgung = {
    x1: x - panjang, y1: yTitik - kemiringan * panjang,
    x2: x + panjang, y2: yTitik + kemiringan * panjang,
  }

  /* Kurva bayangan: anggota lain keluarga yang sama, supaya "satu keluarga"
     terlihat sebagai benda, bukan sebagai kalimat. Menyala saat C dipegang.

     Nilai C-nya TETAP, bukan jarak tetap dari C yang sedang dipilih. Versi
     pertama memakai C-2 dan C+2, dan pada C = 3 bayangan atasnya keluar
     bingkai: gagasan keluarga justru hilang di ujung yang paling menarik.
     Dengan nilai tetap, ketiganya selalu terlihat, dan kurva yang digeser
     siswa berjalan melewatinya seperti melewati sisir. */
  const bayangan = [-2, 0, 2]
  const nyalaC = dipegang === 'C'
  const nyalaX = dipegang === 'x' || menyeret

  function mulai(e: ReactPointerEvent<SVGSVGElement>) {
    const m = posisiMatematika(e, j)
    if (!m) return
    const layar = { x: p.x(m.x), y: p.y(m.y) }
    if (titikTersentuh(layar, [layarTitik]) < 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setMenyeret(true)
  }

  function gerak(e: ReactPointerEvent<SVGSVGElement>) {
    if (!menyeret) return
    const m = posisiMatematika(e, j)
    if (!m) return
    onGeserX(batasi(bulatkanKe(m.x, BATAS_X.langkah), BATAS_X.min, BATAS_X.maks))
  }

  return (
    <Bidang
      jendela={j}
      keterangan={`F(x) = ${c.label}${C === 0 ? '' : C > 0 ? ` + ${angka(C, 1)}` : ` - ${angka(-C, 1)}`}`}
      catatan={[
        { teks: `mesin memeriksa: turunan ${c.label} adalah ${c.turunan}`, warna: WARNA.redup },
        c.benar
          ? { teks: `cocok dengan laju ${s.lajuTulis}`, warna: DAERAH_ATAS }
          : { teks: `belum cocok, laju yang dicari ${s.lajuTulis}`, warna: '#B3503C' },
      ]}
      catatanKanan={[
        { teks: `x = ${angka(x, 2)}`, warna: nyalaX ? WARNA.miring : WARNA.redup },
        { teks: `kemiringan ${angka(kemiringan, 2)}`, warna: nyalaC ? WARNA.miring : WARNA.redup },
      ]}
      catatanBawah={{
        teks: nyalaC ? 'C bergeser, kemiringan tetap' : 'seret titiknya',
        warna: nyalaC ? WARNA.miring : WARNA.redup,
      }}
      aria={`Mesin turunan mundur. Laju yang dicari ${s.lajuTulis}. Tebakan sekarang ${c.label}, turunannya ${c.turunan}, ${c.benar ? 'cocok' : 'belum cocok'}. Titik singgung di x sama dengan ${angka(x, 2)}, kemiringannya ${angka(kemiringan, 2)}.`}
      gaya={{ cursor: menyeret ? 'grabbing' : 'grab' }}
      onPointerDown={mulai}
      onPointerMove={gerak}
      onPointerUp={() => setMenyeret(false)}
    >
      {/* ---------- kurva bayangan: anggota lain keluarga yang sama ---------- */}
      <g className={nyalaC ? 'nyala' : undefined}>
        {bayangan.map((cc) => (
          <path
            key={cc}
            d={jalurFungsi((t) => c.F(t) + cc, j)}
            fill="none"
            stroke={WARNA.redup}
            strokeWidth={1.4}
            strokeDasharray="5 5"
            opacity={nyalaC ? 0.85 : 0.35}
          />
        ))}
      </g>

      {/* ---------- kurva yang sedang dipilih ---------- */}
      <path d={jalurFungsi(kurva, j)} fill="none" stroke={DAERAH_ATAS} strokeWidth={2.8}
            strokeLinecap="round" />

      {/* ---------- garis singgung di x ---------- */}
      <line
        className={nyalaC || nyalaX ? 'nyala' : undefined}
        x1={p.x(singgung.x1)} y1={p.y(singgung.y1)}
        x2={p.x(singgung.x2)} y2={p.y(singgung.y2)}
        stroke={WARNA.sudut} strokeWidth={nyalaC || nyalaX ? 3.2 : 2.4} strokeLinecap="round"
      />

      {/* ---------- titik singgung, bisa diseret ----------
          Lingkaran transparan berjari-jari 18 adalah sasaran sentuhnya. Bolanya
          sendiri cuma 7 satuan, dan di HP itu tinggal sekitar 5 piksel: terlalu
          kecil untuk jari. Pola ini sama dengan TitikPegang milik Statistika. */}
      <g className={nyalaX ? 'nyala' : undefined}>
        <circle cx={layarTitik.x} cy={layarTitik.y} r={18} fill="transparent" />
        <circle
          cx={layarTitik.x} cy={layarTitik.y}
          r={nyalaX ? 9.5 : 7}
          fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={2.4}
        />
      </g>

      {/* Angka kemiringan SENGAJA tidak ditulis lagi di dekat titiknya.
          Versi pertama menaruhnya 14 satuan di atas bola, dan pada x = 0 angka
          itu jatuh persis di atas garis sumbu y sehingga tidak terbaca. Ia juga
          mengulang bacaan "kemiringan" yang sudah ada di pita kanan atas, dan
          pita itu tidak pernah bisa tertimpa apa pun. Satu tempat saja. */}
    </Bidang>
  )
}
