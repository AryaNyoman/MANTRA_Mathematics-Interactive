'use client'

import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import Bidang from '@/components/widget/turunan/Bidang'
import {
  WARNA, angka, jalurFungsi, jalurGaris, jendelaTetap, keLayar, type Jendela,
} from '@/components/widget/turunan/koordinat'
import { batasi, bulatkanKe, posisiDiGambar, posisiMatematika } from '@/components/widget/turunan/seret'
import { useSedangDiubah } from '@/components/kendali/sedang-diubah'

/**
 * Widget "Susun polinom", Materi 05.
 *
 * Empat koefisien disetel siswa, dan kedua papan berubah serentak: f di atas,
 * f′ di bawah.
 *
 * KENAPA ADA KURVA BAYANGAN
 * Rancangan meminta "suku yang koefisiennya sedang dipegang menyala di rumus
 * DAN di kurva". Menyalakan sepotong kurva tidak mungkin: sebuah suku tidak
 * menempati bagian tertentu dari kurva, ia mengubah seluruhnya. Jadi yang
 * digambar adalah kurva yang sama DENGAN SUKU ITU DIBUANG, samar di belakang.
 * Jarak antara kurva asli dan bayangannya persis sumbangan suku tersebut, dan
 * itu yang sebenarnya ingin diperlihatkan.
 *
 * Pada d, bayangan di papan BAWAH berimpit sempurna dengan kurvanya. Itu bukan
 * kebetulan dan bukan kerusakan: konstanta memang hilang saat diturunkan, dan
 * inilah pelajaran utama materi ini.
 */

export const BATAS_KOEF = { min: -3, maks: 3, langkah: 0.5 }
export const BATAS_X = { min: -1.8, maks: 1.8, langkah: 0.1 }
export const AWAL = { a: 1, b: 0, c: -1.5, d: 1, x: 1 }

/**
 * Tinggi papan dipilih dari beberapa tingkat TETAP, bukan dipatok satu angka
 * dan bukan pula mengikuti kurvanya terus menerus.
 *
 * Kalau dipatok pada kasus terburuk (koefisien 3 semua memberi nilai 35,6),
 * polinom biasa seperti x³ - 1,5x + 1 tergencet menjadi garis hampir rata dan
 * tidak ada yang bisa dibaca darinya. Itu terjadi sungguhan pada potret
 * pertama widget ini.
 *
 * Kalau mengikuti kurvanya terus menerus, papan bernapas tiap kali koefisien
 * digeser sedikit, dan seretan terasa licin. Aturan proyek melarangnya.
 *
 * Jalan tengahnya: tinggi papan hanya boleh salah satu dari tingkat di bawah.
 * Ia berganti beberapa kali saja sepanjang perjalanan penggeser, dan TIDAK
 * PERNAH berganti saat titik x diseret, sebab x tidak ikut menentukannya.
 */
const TINGKAT = [3, 6, 12, 24, 48]

function tinggiPapan(nilai: (x: number) => number): number {
  let besar = 0
  for (let i = 0; i <= 60; i++) {
    const x = BATAS_X.min + ((BATAS_X.maks - BATAS_X.min) * i) / 60
    besar = Math.max(besar, Math.abs(nilai(x)))
  }
  const perlu = besar * 1.15
  return TINGKAT.find((t) => t >= perlu) ?? TINGKAT[TINGKAT.length - 1]
}

export type Koef = { a: number; b: number; c: number; d: number }

export function nilaiF(k: Koef, x: number): number {
  return k.a * x * x * x + k.b * x * x + k.c * x + k.d
}

export function nilaiTurunan(k: Koef, x: number): number {
  return 3 * k.a * x * x + 2 * k.b * x + k.c
}

/** Tulis polinom tanpa suku bernilai nol, dengan tanda yang benar. */
function tulis(suku: Array<{ koef: number; lambang: string }>, nama: string): string {
  const bagian: string[] = []
  for (const s of suku) {
    if (s.koef === 0) continue
    const tanda = bagian.length === 0 ? (s.koef < 0 ? '-' : '') : (s.koef < 0 ? ' - ' : ' + ')
    const besar = Math.abs(s.koef)
    const angkanya = besar === 1 && s.lambang !== '' ? '' : angka(besar, 1)
    bagian.push(`${tanda}${angkanya}${s.lambang}`)
  }
  return `${nama} = ${bagian.length ? bagian.join('') : '0'}`
}

export function tulisF(k: Koef): string {
  return tulis([
    { koef: k.a, lambang: 'x³' }, { koef: k.b, lambang: 'x²' },
    { koef: k.c, lambang: 'x' }, { koef: k.d, lambang: '' },
  ], 'f(x)')
}

export function tulisTurunan(k: Koef): string {
  return tulis([
    { koef: 3 * k.a, lambang: 'x²' }, { koef: 2 * k.b, lambang: 'x' },
    { koef: k.c, lambang: '' },
  ], 'f′(x)')
}

/** Koefisien yang sama, tetapi satu suku dibuang. */
function tanpaSuku(k: Koef, kunci: string | null): Koef | null {
  if (kunci === 'a') return { ...k, a: 0 }
  if (kunci === 'b') return { ...k, b: 0 }
  if (kunci === 'c') return { ...k, c: 0 }
  if (kunci === 'd') return { ...k, d: 0 }
  return null
}

export default function SusunPolinom({
  koef, x, onGeser,
}: {
  koef: Koef
  x: number
  onGeser: (x: number) => void
}) {
  const dipegang = useSedangDiubah()
  const [menyeret, setMenyeret] = useState(false)
  const f = (t: number) => nilaiF(koef, t)
  const fAksen = (t: number) => nilaiTurunan(koef, t)
  const tinggiAtas = tinggiPapan(f)
  const tinggiBawah = tinggiPapan(fAksen)
  const ATAS: Jendela = jendelaTetap(-2.2, 2.2, -tinggiAtas, tinggiAtas)
  const BAWAH: Jendela = jendelaTetap(-2.2, 2.2, -tinggiBawah, tinggiBawah)
  const pa = keLayar(ATAS)
  const pb = keLayar(BAWAH)
  const bayangan = tanpaSuku(koef, dipegang)
  const nyala = dipegang === 'x' || menyeret

  const y = f(x)
  const m = fAksen(x)

  function seret(e: ReactPointerEvent<SVGSVGElement>) {
    const mm = posisiMatematika(e, ATAS)
    if (!mm) return
    onGeser(batasi(bulatkanKe(mm.x, BATAS_X.langkah), BATAS_X.min, BATAS_X.maks))
  }

  function mulai(e: ReactPointerEvent<SVGSVGElement>) {
    if (!posisiDiGambar(e)) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setMenyeret(true)
    seret(e)
  }

  return (
    // Dua papan ditumpuk dengan gaya sebaris; globals.css wilayah sesi lain.
    <div style={{ display: 'grid', gap: 6 }}>
      <Bidang
        jendela={ATAS}
        keterangan={tulisF(koef)}
        catatan={bayangan ? [{ teks: `bayangan: suku ${dipegang} dibuang`, warna: WARNA.redup }] : undefined}
        catatanBawah={{ teks: 'seret di gambar untuk memindahkan x' }}
        aria={`Papan atas, kurva ${tulisF(koef)}. Tingginya di x sama dengan ${angka(x, 1)} adalah ${angka(y, 2)}.`}
        gaya={{ cursor: menyeret ? 'grabbing' : 'grab', touchAction: 'none' }}
        onPointerDown={mulai}
        onPointerMove={(e) => { if (menyeret) seret(e) }}
        onPointerUp={() => setMenyeret(false)}
      >
        {bayangan && (
          <path d={jalurFungsi((t) => nilaiF(bayangan, t), ATAS, 300)} fill="none"
                stroke={WARNA.redup} strokeWidth={2.4} strokeDasharray="6 5" opacity={0.75} />
        )}
        <path d={jalurFungsi(f, ATAS, 400)} fill="none" stroke={WARNA.miring}
              strokeWidth={2.6} strokeLinecap="round" />
        <path d={jalurGaris(x, y, m, ATAS)} fill="none" stroke={WARNA.sudut}
              strokeWidth={nyala ? 2.6 : 2} opacity={0.85} />
        <g className={nyala ? 'nyala' : undefined}>
          <circle cx={pa.x(x)} cy={pa.y(y)} r={18} fill="transparent" />
          <circle cx={pa.x(x)} cy={pa.y(y)} r={nyala ? 8.5 : 7}
                  fill={WARNA.miring} stroke="var(--kartu)" strokeWidth={2.2} />
        </g>
      </Bidang>

      <Bidang
        jendela={BAWAH}
        keterangan={tulisTurunan(koef)}
        catatan={dipegang === 'd'
          ? [{ teks: 'bayangannya berimpit: konstanta hilang saat diturunkan', warna: WARNA.sudut }]
          : undefined}
        catatanBawah={{ teks: `kemiringan di x = ${angka(x, 1)} adalah ${angka(m, 2)}` }}
        aria={`Papan bawah, kurva ${tulisTurunan(koef)}. Nilainya di x sama dengan ${angka(x, 1)} adalah ${angka(m, 2)}.`}
        tandaSkala={false}
      >
        {bayangan && (
          <path d={jalurFungsi((t) => nilaiTurunan(bayangan, t), BAWAH, 300)} fill="none"
                stroke={WARNA.redup} strokeWidth={2.4} strokeDasharray="6 5" opacity={0.75} />
        )}
        <path d={jalurFungsi(fAksen, BAWAH, 400)} fill="none" stroke={WARNA.sudut}
              strokeWidth={2.6} strokeLinecap="round" />
        <line x1={pb.x(x)} y1={pb.y(BAWAH.yMin)} x2={pb.x(x)} y2={pb.y(BAWAH.yMax)}
              stroke={WARNA.redup} strokeWidth={1} strokeDasharray="3 4" />
        <g className={nyala ? 'nyala' : undefined}>
          <circle cx={pb.x(x)} cy={pb.y(m)} r={nyala ? 7.5 : 6}
                  fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={2.2} />
        </g>
      </Bidang>
    </div>
  )
}

/** Baris tabel untuk kolom kanan panggung. */
export function tabelPolinom(koef: Koef, x: number): Array<{ nama: string; nilai: string }> {
  return [
    { nama: 'fungsinya', nilai: tulisF(koef) },
    { nama: 'turunannya', nilai: tulisTurunan(koef) },
    { nama: 'x', nilai: angka(x, 1) },
    { nama: 'tinggi f(x)', nilai: angka(nilaiF(koef, x), 2) },
    { nama: 'kemiringan f′(x)', nilai: angka(nilaiTurunan(koef, x), 2) },
  ]
}
