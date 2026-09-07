'use client'

import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import Bidang from '@/components/widget/turunan/Bidang'
import {
  MONO, WARNA, angka, jalurFungsi, jalurGaris, jendelaTetap, keLayar, type Jendela,
} from '@/components/widget/turunan/koordinat'
import { batasi, bulatkanKe, posisiDiGambar, posisiMatematika, titikTersentuh } from '@/components/widget/turunan/seret'
import { useSedangDiubah } from '@/components/kendali/sedang-diubah'

/**
 * Widget "Garis potong", Materi 01.
 *
 * Siswa memilih dua titik pada kurva produksi, lalu membaca kemiringan garis
 * yang menghubungkannya. Itu satu-satunya gagasan materi ini, jadi widgetnya
 * sengaja tidak menampilkan apa pun tentang garis singgung: kata itu belum
 * diajarkan, dan memperlihatkannya di sini akan mendahului materinya sendiri.
 *
 * KENAPA KURVANYA DITARIK MELALUI TITIK CATATAN, BUKAN DARI RUMUS
 * Bacaan Materi 01 memakai catatan produksi jam demi jam (0, 20, 44, 64, 78,
 * 86, 90) dan menghitung tiga laju rata-rata darinya. Kalau widget memakai
 * rumus tersendiri yang cuma "mirip", angka di layar akan berbeda tipis dari
 * angka di teks, dan siswa yang teliti akan menyangka salah satunya salah.
 * Karena itu kurvanya adalah interpolasi Hermite monoton (Fritsch-Carlson)
 * yang melewati ketujuh titik catatan TEPAT, dan titik-titik itu ikut
 * digambar supaya terlihat dari mana kurvanya berasal.
 *
 * Monoton dipilih, bukan spline biasa, karena spline biasa bisa membuat kurva
 * turun sedikit di antara dua titik yang naik. Pada kurva produksi itu berarti
 * pabrik seolah pernah menghasilkan barang negatif.
 */

export const BATAS_X1 = { min: 0, maks: 5, langkah: 0.5 }
export const BATAS_H = { min: 0.5, maks: 4, langkah: 0.5 }
export const AWAL = { x1: 1, h: 2 }

/** Akhir pencatatan. Titik kedua tidak boleh melewatinya. */
export const JAM_AKHIR = 6

/** Catatan produksi pabrik, sama persis dengan tabel di bacaan Materi 01. */
export const CATATAN: Array<[number, number]> = [
  [0, 0], [1, 20], [2, 44], [3, 64], [4, 78], [5, 86], [6, 90],
]

/* Kemiringan simpul untuk interpolasi Hermite monoton, dihitung sekali. */
const KEMIRINGAN_SIMPUL = hitungKemiringanSimpul()

function hitungKemiringanSimpul(): number[] {
  const n = CATATAN.length
  const lebar: number[] = []
  const beda: number[] = []
  for (let i = 0; i < n - 1; i++) {
    lebar.push(CATATAN[i + 1][0] - CATATAN[i][0])
    beda.push((CATATAN[i + 1][1] - CATATAN[i][1]) / lebar[i])
  }
  const m = new Array<number>(n).fill(0)
  m[0] = beda[0]
  m[n - 1] = beda[n - 2]
  for (let i = 1; i < n - 1; i++) {
    if (beda[i - 1] * beda[i] <= 0) {
      m[i] = 0
      continue
    }
    const w1 = 2 * lebar[i] + lebar[i - 1]
    const w2 = lebar[i] + 2 * lebar[i - 1]
    m[i] = (w1 + w2) / (w1 / beda[i - 1] + w2 / beda[i])
  }
  return m
}

/** Jumlah barang yang sudah selesai pada jam ke-t. */
export function produksi(t: number): number {
  const x = batasi(t, 0, JAM_AKHIR)
  let i = 0
  while (i < CATATAN.length - 2 && x > CATATAN[i + 1][0]) i++
  const [t0, y0] = CATATAN[i]
  const [t1, y1] = CATATAN[i + 1]
  const lebar = t1 - t0
  const s = (x - t0) / lebar
  const s2 = s * s
  const s3 = s2 * s
  return (
    y0 * (2 * s3 - 3 * s2 + 1) +
    lebar * KEMIRINGAN_SIMPUL[i] * (s3 - 2 * s2 + s) +
    y1 * (-2 * s3 + 3 * s2) +
    lebar * KEMIRINGAN_SIMPUL[i + 1] * (s3 - s2)
  )
}

/** Batas atas h yang masih masuk akal untuk x₁ tertentu. */
export function maksH(x1: number): number {
  return Math.max(BATAS_H.min, Math.min(BATAS_H.maks, JAM_AKHIR - x1))
}

/** Laju rata-rata antara jam x₁ dan jam x₁ + h. */
export function lajuRata(x1: number, h: number): number {
  return (produksi(x1 + h) - produksi(x1)) / h
}

/* Jendela TETAP: tidak melar saat titiknya diseret. Tanpa ini, tiap tarikan
   mengubah seluruh gambar dan seretannya terasa licin. */
const JENDELA: Jendela = jendelaTetap(-0.45, 6.5, -9, 104)

export default function GarisPotong({
  x1, h, onGeser,
}: {
  x1: number
  h: number
  onGeser: (x1: number, h: number) => void
}) {
  const dipegang = useSedangDiubah()
  const [pegang, setPegang] = useState(-1)
  const p = keLayar(JENDELA)

  const yP = produksi(x1)
  const yQ = produksi(x1 + h)
  const m = lajuRata(x1, h)

  const layarP = { x: p.x(x1), y: p.y(yP) }
  const layarQ = { x: p.x(x1 + h), y: p.y(yQ) }
  const sudutSiku = { x: p.x(x1 + h), y: p.y(yP) }

  const segitigaNyala = dipegang === 'h' || pegang === 1

  function mulai(e: ReactPointerEvent<SVGSVGElement>) {
    const g = posisiDiGambar(e)
    if (!g) return
    const mana = titikTersentuh(g, [layarP, layarQ], 20)
    if (mana < 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setPegang(mana)
  }

  function gerak(e: ReactPointerEvent<SVGSVGElement>) {
    if (pegang < 0) return
    const mm = posisiMatematika(e, JENDELA)
    if (!mm) return
    if (pegang === 0) {
      const barux1 = batasi(bulatkanKe(mm.x, BATAS_X1.langkah), BATAS_X1.min, BATAS_X1.maks)
      onGeser(barux1, Math.min(h, maksH(barux1)))
    } else {
      const baruh = batasi(bulatkanKe(mm.x - x1, BATAS_H.langkah), BATAS_H.min, maksH(x1))
      onGeser(x1, baruh)
    }
  }

  return (
    <Bidang
      jendela={JENDELA}
      keterangan={`kemiringan garis potong = ${angka(m, 1)} barang per jam`}
      catatan={[{ teks: `dari jam ${angka(x1, 1)} ke jam ${angka(x1 + h, 1)}, selang ${angka(h, 1)} jam` }]}
      catatanBawah={{ teks: 'seret titik P atau Q' }}
      aria={`Kurva produksi pabrik. Titik P pada jam ${angka(x1, 1)} dan titik Q pada jam ${angka(x1 + h, 1)}. Kemiringan garis potongnya ${angka(m, 1)} barang per jam.`}
      gaya={{ cursor: pegang >= 0 ? 'grabbing' : 'grab', touchAction: 'none' }}
      onPointerDown={mulai}
      onPointerMove={gerak}
      onPointerUp={() => setPegang(-1)}
    >
      {/* ---------- segitiga Δx dan Δy ---------- */}
      <g className={segitigaNyala ? 'nyala' : undefined}>
        <path
          d={`M ${layarP.x} ${layarP.y} L ${sudutSiku.x} ${sudutSiku.y} L ${layarQ.x} ${layarQ.y} Z`}
          fill={WARNA.sudut}
          opacity={segitigaNyala ? 0.2 : 0.1}
        />
        <line x1={layarP.x} y1={layarP.y} x2={sudutSiku.x} y2={sudutSiku.y}
              stroke={WARNA.samping} strokeWidth={segitigaNyala ? 2.4 : 1.6} />
        <line x1={sudutSiku.x} y1={sudutSiku.y} x2={layarQ.x} y2={layarQ.y}
              stroke={WARNA.depan} strokeWidth={segitigaNyala ? 2.4 : 1.6} />
        <text x={(layarP.x + sudutSiku.x) / 2} y={sudutSiku.y + 15} textAnchor="middle"
              fontSize={10.5} fill={WARNA.samping} fontFamily={MONO}>
          {angka(h, 1)} jam
        </text>
        <text x={sudutSiku.x + 7} y={(sudutSiku.y + layarQ.y) / 2 + 3.5}
              fontSize={10.5} fill={WARNA.depan} fontFamily={MONO}>
          {angka(yQ - yP, 0)} barang
        </text>
      </g>

      {/* ---------- garis potongnya ---------- */}
      <path d={jalurGaris(x1, yP, m, JENDELA)} fill="none" stroke={WARNA.sudut}
            strokeWidth={2.2} strokeDasharray="7 5" opacity={0.85} />

      {/* ---------- kurva produksi ---------- */}
      <path d={jalurFungsi(produksi, JENDELA, 300, 0, JAM_AKHIR)} fill="none"
            stroke={WARNA.miring} strokeWidth={2.8} strokeLinecap="round" />

      {/* ---------- titik catatan tiap jam ---------- */}
      {CATATAN.map(([t, n]) => (
        <circle key={t} cx={p.x(t)} cy={p.y(n)} r={2.6} fill={WARNA.redup} />
      ))}

      {/* ---------- titik P, bisa diseret ---------- */}
      <g className={dipegang === 'x1' ? 'nyala' : undefined}>
        <circle cx={layarP.x} cy={layarP.y} r={18} fill="transparent" />
        <circle cx={layarP.x} cy={layarP.y} r={pegang === 0 || dipegang === 'x1' ? 8.5 : 7}
                fill={WARNA.samping} stroke="var(--kartu)" strokeWidth={2.2} />
        <text x={layarP.x - 11} y={layarP.y + 20} textAnchor="middle" fontSize={11}
              fill={WARNA.samping} fontFamily={MONO}>P</text>
      </g>

      {/* ---------- titik Q, bisa diseret ---------- */}
      <g className={dipegang === 'h' ? 'nyala' : undefined}>
        <circle cx={layarQ.x} cy={layarQ.y} r={18} fill="transparent" />
        <circle cx={layarQ.x} cy={layarQ.y} r={pegang === 1 || dipegang === 'h' ? 8.5 : 7}
                fill={WARNA.depan} stroke="var(--kartu)" strokeWidth={2.2} />
        <text x={layarQ.x + 12} y={layarQ.y - 9} fontSize={11}
              fill={WARNA.depan} fontFamily={MONO}>Q</text>
      </g>
    </Bidang>
  )
}

/** Baris tabel untuk kolom kanan panggung. */
export function tabelGarisPotong(x1: number, h: number): Array<{ nama: string; nilai: string }> {
  const yP = produksi(x1)
  const yQ = produksi(x1 + h)
  return [
    { nama: 'jam awal x₁', nilai: `${angka(x1, 1)} jam` },
    { nama: 'jam akhir x₁ + h', nilai: `${angka(x1 + h, 1)} jam` },
    { nama: 'sudah jadi di P', nilai: `${angka(yP, 0)} barang` },
    { nama: 'sudah jadi di Q', nilai: `${angka(yQ, 0)} barang` },
    { nama: 'tambahannya Δy', nilai: `${angka(yQ - yP, 0)} barang` },
    { nama: 'lamanya Δx', nilai: `${angka(h, 1)} jam` },
    { nama: 'Δy dibagi Δx', nilai: `${angka(lajuRata(x1, h), 1)} barang per jam` },
  ]
}
