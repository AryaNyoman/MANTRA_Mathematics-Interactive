'use client'

import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import { petakSumbu } from '@/lib/petak-sumbu'
import { GARIS_SUMBU, MONO, VH, VW, WARNA, angka } from '@/components/widget/turunan/koordinat'
import { batasi, bulatkanKe, posisiDiGambar } from '@/components/widget/turunan/seret'
import { useSedangDiubah } from '@/components/kendali/sedang-diubah'

/**
 * Widget "Mesin bertingkat", Materi 07.
 *
 * Tiga garis bilangan bertumpuk: x masuk ke mesin dalam dan keluar sebagai u,
 * lalu u masuk ke mesin luar dan keluar sebagai y. Pada tiap garis ada pita
 * kecil, dan panjang pita itulah yang memperlihatkan seberapa besar perubahan
 * diteruskan tiap tingkat.
 *
 * KENAPA GARIS x DAN GARIS u BERBAGI SATU SKALA, TETAPI GARIS y TIDAK
 * Inti materi ini adalah "pengalinya dikalikan". Supaya kalimat itu TERLIHAT,
 * pita u harus benar-benar tampak tiga kali lebih panjang daripada pita x saat
 * mesin dalamnya 3x. Itu hanya mungkin kalau kedua garis memakai satu skala,
 * dan untungnya x dan u memang sebesaran: keduanya paling banyak beberapa
 * satuan.
 *
 * y tidak bisa ikut. Dengan g = 3x dan f = u³, y sudah melewati 80 sementara x
 * masih di bawah 1,5. Dipaksa satu skala, pita x menjadi kurang dari satu
 * piksel dan tidak ada yang bisa dilihat. Jadi garis y punya skala sendiri, dan
 * hal itu DIKATAKAN di layar, bukan didiamkan. Pengali tingkat kedua dibaca
 * dari angkanya, bukan dari panjang pitanya.
 *
 * Ini bukan kompromi malas: menyembunyikan bahwa skalanya berbeda justru akan
 * mengajarkan perbandingan panjang yang salah.
 */

export const BATAS_X = { min: 0.2, maks: 1.2, langkah: 0.05 }
export const BATAS_H = { min: 0.05, maks: 0.25, langkah: 0.05 }
export const AWAL = { x: 0.6, h: 0.15, dalam: '3x', luar: 'u2' }

export type MesinDalam = {
  nilai: string
  label: string
  tulis: string
  g: (x: number) => number
  gAksen: (x: number) => number
  /** ujung skala bersama untuk garis x dan garis u */
  skala: number
}

export type MesinLuar = {
  nilai: string
  label: string
  tulis: string
  f: (u: number) => number
  fAksen: (u: number) => number
}

export const DALAM: MesinDalam[] = [
  { nilai: '3x', label: '3x', tulis: 'u = 3x', g: (x) => 3 * x, gAksen: () => 3, skala: 4.4 },
  { nilai: 'x+1', label: 'x + 1', tulis: 'u = x + 1', g: (x) => x + 1, gAksen: () => 1, skala: 2.6 },
  { nilai: 'x2', label: 'x²', tulis: 'u = x²', g: (x) => x * x, gAksen: (x) => 2 * x, skala: 2.2 },
]

export const LUAR: MesinLuar[] = [
  { nilai: 'u2', label: 'u²', tulis: 'y = u²', f: (u) => u * u, fAksen: (u) => 2 * u },
  { nilai: 'u3', label: 'u³', tulis: 'y = u³', f: (u) => u * u * u, fAksen: (u) => 3 * u * u },
  { nilai: 'akar', label: '√u', tulis: 'y = √u', f: Math.sqrt, fAksen: (u) => 1 / (2 * Math.sqrt(u)) },
]

export const PILIHAN_DALAM = DALAM.map((d) => ({ nilai: d.nilai, label: d.label }))
export const PILIHAN_LUAR = LUAR.map((l) => ({ nilai: l.nilai, label: l.label }))

export function mesinDalam(nilai: string): MesinDalam {
  return DALAM.find((d) => d.nilai === nilai) ?? DALAM[0]
}

export function mesinLuar(nilai: string): MesinLuar {
  return LUAR.find((l) => l.nilai === nilai) ?? LUAR[0]
}

/**
 * Ujung skala garis y, dihitung dari nilai TERBESAR yang mungkin dicapai
 * kendali, bukan dari nilai yang sedang tampil.
 *
 * Dengan begitu garis y tidak melar saat x atau h digeser. Ia hanya berubah
 * kalau mesinnya diganti, dan itu memang gambar yang berbeda.
 */
export function skalaY(namaDalam: string, namaLuar: string): number {
  const d = mesinDalam(namaDalam)
  const l = mesinLuar(namaLuar)
  const uTertinggi = d.g(BATAS_X.maks + BATAS_H.maks)
  return l.f(uTertinggi) * 1.12
}

const KIRI = 56
const KANAN = VW - 20
const BARIS = { x: 108, u: 190, y: 272 }

export default function MesinBertingkat({
  x, h, namaDalam, namaLuar, onGeser,
}: {
  x: number
  h: number
  namaDalam: string
  namaLuar: string
  onGeser: (x: number, h: number) => void
}) {
  const dipegang = useSedangDiubah()
  const [menyeret, setMenyeret] = useState(false)
  const d = mesinDalam(namaDalam)
  const l = mesinLuar(namaLuar)

  const skalaXU = d.skala
  const skalaYY = skalaY(namaDalam, namaLuar)
  const keXU = (n: number) => KIRI + (n / skalaXU) * (KANAN - KIRI)
  const keY = (n: number) => KIRI + (n / skalaYY) * (KANAN - KIRI)

  const u1 = d.g(x)
  const u2 = d.g(x + h)
  const y1 = l.f(u1)
  const y2 = l.f(u2)
  const du = u2 - u1
  const dy = y2 - y1

  const pengaliDalam = du / h
  const pengaliLuar = dy / du
  const gabungan = dy / h
  const rumus = l.fAksen(u1) * d.gAksen(x)

  const nyalaX = dipegang === 'x' || menyeret
  const nyalaH = dipegang === 'h'

  function seret(e: ReactPointerEvent<SVGSVGElement>) {
    const g = posisiDiGambar(e)
    if (!g) return
    const nilai = ((g.x - KIRI) / (KANAN - KIRI)) * skalaXU
    onGeser(batasi(bulatkanKe(nilai, BATAS_X.langkah), BATAS_X.min, BATAS_X.maks), h)
  }

  function mulai(e: ReactPointerEvent<SVGSVGElement>) {
    const g = posisiDiGambar(e)
    // Hanya seretan di sekitar garis x yang memindahkan x. Garis u dan y adalah
    // HASIL, dan membiarkannya diseret akan mengajarkan arah yang terbalik.
    if (!g || Math.abs(g.y - BARIS.x) > 26) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setMenyeret(true)
    seret(e)
  }

  const garis = (
    nama: string, baris: number, ke: (n: number) => number, ujung: number,
    dari: number, sampai: number, warna: string, tebal: boolean,
  ) => {
    const petak = petakSumbu(0, ujung, KANAN - KIRI)
    return (
      <g key={nama}>
        <line x1={KIRI} y1={baris} x2={KANAN} y2={baris} stroke={GARIS_SUMBU} strokeWidth={1.6} />
        {petak.map((t) => (
          <g key={t.nilai}>
            <line x1={ke(t.nilai)} y1={baris - 4} x2={ke(t.nilai)} y2={baris + 4}
                  stroke={GARIS_SUMBU} strokeWidth={1} />
            <text x={ke(t.nilai)} y={baris + 17} textAnchor="middle" fontSize={9}
                  fill={WARNA.redup} fontFamily={MONO}>{t.label}</text>
          </g>
        ))}
        <text x={KIRI - 10} y={baris + 4} textAnchor="end" fontSize={11}
              fill={WARNA.miring} fontFamily={MONO}>{nama}</text>
        {/* pita perubahannya */}
        <rect x={Math.min(ke(dari), ke(sampai))} y={baris - 11}
              width={Math.max(Math.abs(ke(sampai) - ke(dari)), 1.5)} height={22}
              fill={warna} opacity={tebal ? 0.55 : 0.35} />
        <circle cx={ke(dari)} cy={baris} r={tebal ? 5.5 : 4.5} fill={warna}
                stroke="var(--kartu)" strokeWidth={1.8} />
      </g>
    )
  }

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Dua mesin berderet. ${d.tulis} lalu ${l.tulis}. Pengali tingkat pertama ${angka(pengaliDalam, 2)}, tingkat kedua ${angka(pengaliLuar, 2)}, gabungannya ${angka(gabungan, 2)}.`}
      style={{ cursor: menyeret ? 'grabbing' : 'grab', touchAction: 'none' }}
      onPointerDown={mulai}
      onPointerMove={(e) => { if (menyeret) seret(e) }}
      onPointerUp={() => setMenyeret(false)}
      onPointerCancel={() => setMenyeret(false)}
    >
      <text x={KIRI} y={16} fontSize={12} fill={WARNA.miring} fontFamily={MONO}>
        {d.tulis}, lalu {l.tulis}
      </text>
      <text x={KIRI} y={31} fontSize={10.5} fill={WARNA.sudut} fontFamily={MONO}>
        dy/du · du/dx = {angka(pengaliLuar, 2)} · {angka(pengaliDalam, 2)} = {angka(gabungan, 2)}
      </text>
      <text x={KIRI} y={45} fontSize={10} fill={WARNA.redup} fontFamily={MONO}>
        garis x dan u satu skala; garis y skalanya sendiri
      </text>

      {garis('x', BARIS.x, keXU, skalaXU, x, x + h, WARNA.samping, nyalaX)}
      {garis('u', BARIS.u, keXU, skalaXU, u1, u2, WARNA.depan, nyalaH || nyalaX)}
      {garis('y', BARIS.y, keY, skalaYY, y1, y2, WARNA.sudut, nyalaH || nyalaX)}

      {/* anak panah pengali antar garis */}
      <g className={nyalaX || nyalaH ? 'nyala' : undefined}>
        <line x1={KIRI - 34} y1={BARIS.x + 8} x2={KIRI - 34} y2={BARIS.u - 8}
              stroke={WARNA.depan} strokeWidth={1.4} />
        <text x={KIRI - 30} y={(BARIS.x + BARIS.u) / 2 + 4} fontSize={10.5}
              fill={WARNA.depan} fontFamily={MONO}>×{angka(pengaliDalam, 2)}</text>
        <line x1={KIRI - 34} y1={BARIS.u + 8} x2={KIRI - 34} y2={BARIS.y - 8}
              stroke={WARNA.sudut} strokeWidth={1.4} />
        <text x={KIRI - 30} y={(BARIS.u + BARIS.y) / 2 + 4} fontSize={10.5}
              fill={WARNA.sudut} fontFamily={MONO}>×{angka(pengaliLuar, 2)}</text>
      </g>

      <text x={KANAN} y={VH - 6} textAnchor="end" fontSize={9.5} fill={WARNA.redup} fontFamily={MONO}>
        rumus aturan rantai memberi {angka(rumus, 2)}
      </text>
      <text x={KIRI} y={VH - 6} fontSize={9.5} fill={WARNA.redup} fontFamily={MONO}>
        seret di garis x
      </text>
    </svg>
  )
}

/** Baris tabel untuk kolom kanan panggung. */
export function tabelBertingkat(
  x: number, h: number, namaDalam: string, namaLuar: string,
): Array<{ nama: string; nilai: string }> {
  const d = mesinDalam(namaDalam)
  const l = mesinLuar(namaLuar)
  const u1 = d.g(x)
  const u2 = d.g(x + h)
  const dy = l.f(u2) - l.f(u1)
  const du = u2 - u1
  return [
    { nama: 'x, lalu x + h', nilai: `${angka(x, 2)} dan ${angka(x + h, 2)}` },
    { nama: 'u = g(x)', nilai: `${angka(u1, 3)} menjadi ${angka(u2, 3)}` },
    { nama: 'pengali tingkat 1', nilai: `${angka(du / h, 3)} (menuju ${angka(d.gAksen(x), 3)})` },
    { nama: 'pengali tingkat 2', nilai: `${angka(dy / du, 3)} (menuju ${angka(l.fAksen(u1), 3)})` },
    { nama: 'hasil kalinya', nilai: `${angka(dy / h, 3)} (menuju ${angka(l.fAksen(u1) * d.gAksen(x), 3)})` },
  ]
}
