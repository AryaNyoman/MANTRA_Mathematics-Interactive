'use client'

import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import { MONO, VH, VW, WARNA, angka } from '@/components/widget/turunan/koordinat'
import { batasi, bulatkanKe, posisiDiGambar, titikTersentuh } from '@/components/widget/turunan/seret'
import { useSedangDiubah } from '@/components/kendali/sedang-diubah'

/**
 * Widget "Luas berubah", Materi 06.
 *
 * Aturan hasil kali diperlihatkan sebagai LUAS, bukan sebagai rumus. Persegi
 * panjang berukuran u kali v tumbuh sedikit di kedua sisinya, dan tambahan
 * luasnya terpecah menjadi dua pita ditambah satu pojok kecil. Pojok itulah
 * yang lenyap saat h menuju nol, dan itulah sebabnya rumusnya hanya punya dua
 * suku.
 *
 * KENAPA BUKAN BIDANG BERSUMBU
 * Gambar ini bukan grafik fungsi. Sumbu dan petak justru menyesatkan di sini:
 * yang dibandingkan luas terhadap luas, bukan tinggi terhadap x. Jadi bingkai
 * digambar sendiri, lengkap dengan pita keterangan di atas seperti `Bidang`,
 * supaya tulisan tetap tidak pernah menabrak gambarnya.
 *
 * KENAPA SKALA MENDATAR DAN TEGAK BOLEH BERBEDA
 * u berkisar 2 sampai 3,4 sedangkan v berkisar 1 sampai 5,8. Satu skala untuk
 * keduanya membuat persegi panjangnya menjadi pita tipis yang tidak terbaca.
 * Skala terpisah aman DI SINI karena semua luas dikalikan faktor yang sama,
 * jadi perbandingan antar luas, satu-satunya hal yang sedang diajarkan, tetap
 * benar. Yang tidak boleh adalah membandingkan panjang mendatar dengan panjang
 * tegak, dan widget ini memang tidak pernah memintanya.
 */

export const BATAS_X = { min: 1, maks: 1.8, langkah: 0.1 }
export const BATAS_H = { min: 0.05, maks: 0.6, langkah: 0.05 }
export const AWAL = { x: 1.5, h: 0.5 }

/** u(x) = x + 1 dan v(x) = x², sesuai rancangan. */
export const u = (x: number) => x + 1
export const v = (x: number) => x * x

/* Bingkai TETAP, cukup untuk seluruh jangkauan kendali:
   u paling besar 1,8 + 0,6 + 1 = 3,4 dan v paling besar (1,8 + 0,6)² = 5,76. */
const U_MAKS = 3.6
const V_MAKS = 6.1
const KOTAK = { x0: 52, y0: 56, x1: VW - 24, y1: VH - 34 }
const keX = (nilai: number) => KOTAK.x0 + (nilai / U_MAKS) * (KOTAK.x1 - KOTAK.x0)
const keY = (nilai: number) => KOTAK.y1 - (nilai / V_MAKS) * (KOTAK.y1 - KOTAK.y0)

/** Luas tiap bagian tambahan, dan pembandingnya dari rumus. */
export function bagian(x: number, h: number) {
  const du = u(x + h) - u(x)
  const dv = v(x + h) - v(x)
  const pita1 = du * v(x)
  const pita2 = u(x) * dv
  const pojok = du * dv
  return {
    du, dv, pita1, pita2, pojok,
    jumlahDibagiH: (pita1 + pita2 + pojok) / h,
    rumus: 1 * v(x) + u(x) * (2 * x),
  }
}

export default function LuasBerubah({
  x, h, onGeser,
}: {
  x: number
  h: number
  onGeser: (x: number, h: number) => void
}) {
  const dipegang = useSedangDiubah()
  const [pegang, setPegang] = useState(-1)
  const b = bagian(x, h)
  const nyalaH = dipegang === 'h' || pegang === 1

  const uL = keX(u(x))
  const uB = keX(u(x + h))
  const vL = keY(v(x))
  const vB = keY(v(x + h))
  const kiri = keX(0)
  const dasar = keY(0)

  const pojokLama = { x: uL, y: vL }
  const pojokBaru = { x: uB, y: vB }

  function mulai(e: ReactPointerEvent<SVGSVGElement>) {
    const g = posisiDiGambar(e)
    if (!g) return
    const mana = titikTersentuh(g, [pojokLama, pojokBaru], 22)
    if (mana < 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setPegang(mana)
  }

  function gerak(e: ReactPointerEvent<SVGSVGElement>) {
    if (pegang < 0) return
    const g = posisiDiGambar(e)
    if (!g) return
    // Posisi mendatar dibaca sebagai u, lalu dikembalikan menjadi x atau h.
    const nilaiU = ((g.x - KOTAK.x0) / (KOTAK.x1 - KOTAK.x0)) * U_MAKS
    if (pegang === 0) {
      onGeser(batasi(bulatkanKe(nilaiU - 1, BATAS_X.langkah), BATAS_X.min, BATAS_X.maks), h)
    } else {
      onGeser(x, batasi(bulatkanKe(nilaiU - 1 - x, BATAS_H.langkah), BATAS_H.min, BATAS_H.maks))
    }
  }

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Persegi panjang u kali v yang membesar. Dua pita tambahan luasnya ${angka(b.pita1, 3)} dan ${angka(b.pita2, 3)}, sedangkan pojok kecilnya ${angka(b.pojok, 3)}.`}
      style={{ cursor: pegang >= 0 ? 'grabbing' : 'grab', touchAction: 'none' }}
      onPointerDown={mulai}
      onPointerMove={gerak}
      onPointerUp={() => setPegang(-1)}
      onPointerCancel={() => setPegang(-1)}
    >
      {/* ---------- pita keterangan, di luar gambar ---------- */}
      <text x={KOTAK.x0} y={16} fontSize={12} fill={WARNA.miring} fontFamily={MONO}>
        u = x + 1 = {angka(u(x), 2)}, v = x² = {angka(v(x), 2)}
      </text>
      <text x={KOTAK.x0} y={31} fontSize={10.5} fill={WARNA.samping} fontFamily={MONO}>
        dua pita dibagi h: {angka((b.pita1 + b.pita2) / h, 3)}
      </text>
      <text x={KOTAK.x0} y={45} fontSize={10.5} fill={WARNA.sudut} fontFamily={MONO}>
        pojok dibagi h: {angka(b.pojok / h, 3)}, dan rumus (uv)′ memberi {angka(b.rumus, 3)}
      </text>

      {/* ---------- persegi panjang lama ---------- */}
      <rect x={kiri} y={vL} width={uL - kiri} height={dasar - vL}
            fill={WARNA.miring} opacity={0.12} stroke={WARNA.miring} strokeWidth={1.6} />
      <text x={(kiri + uL) / 2} y={(vL + dasar) / 2 + 4} textAnchor="middle"
            fontSize={12} fill={WARNA.miring} fontFamily={MONO}>u · v</text>

      {/* ---------- pita KANAN, tegak: Δu kali v ---------- */}
      <rect x={uL} y={vL} width={uB - uL} height={dasar - vL}
            fill={WARNA.samping} opacity={0.35} stroke={WARNA.samping} strokeWidth={1.2} />

      {/* ---------- pita ATAS, mendatar: u kali Δv ---------- */}
      <rect x={kiri} y={vB} width={uL - kiri} height={vL - vB}
            fill={WARNA.depan} opacity={0.35} stroke={WARNA.depan} strokeWidth={1.2} />

      {/* ---------- pojok kecil: Δu kali Δv ---------- */}
      <g className={nyalaH ? 'nyala' : undefined}>
        <rect x={uL} y={vB} width={uB - uL} height={vL - vB}
              fill={WARNA.sudut} opacity={nyalaH ? 0.85 : 0.6}
              stroke={WARNA.sudut} strokeWidth={nyalaH ? 2 : 1.2} />
      </g>

      {/* ---------- ukuran di tepi ---------- */}
      <line x1={kiri} y1={dasar + 12} x2={uL} y2={dasar + 12} stroke={WARNA.miring} strokeWidth={1.2} />
      <text x={(kiri + uL) / 2} y={dasar + 24} textAnchor="middle" fontSize={10.5}
            fill={WARNA.miring} fontFamily={MONO}>u = {angka(u(x), 2)}</text>
      <line x1={uL} y1={dasar + 12} x2={uB} y2={dasar + 12} stroke={WARNA.samping} strokeWidth={1.6} />
      {/* Label Δu DIKUNCI rata kanan, tidak menempel pada uB. Kalau ia mengikuti
          uB, pada h besar ia keluar bingkai dan pada h kecil ia menindih label u. */}
      <text x={KOTAK.x1} y={dasar + 24} textAnchor="end" fontSize={10.5}
            fill={WARNA.samping} fontFamily={MONO}>
        Δu = {angka(b.du, 2)}
      </text>
      <line x1={kiri - 12} y1={dasar} x2={kiri - 12} y2={vL} stroke={WARNA.miring} strokeWidth={1.2} />
      <text x={kiri - 16} y={(dasar + vL) / 2} textAnchor="end" fontSize={10.5}
            fill={WARNA.miring} fontFamily={MONO}>v</text>
      <line x1={kiri - 12} y1={vL} x2={kiri - 12} y2={vB} stroke={WARNA.depan} strokeWidth={1.6} />
      <text x={kiri - 16} y={(vL + vB) / 2 + 4} textAnchor="end" fontSize={10.5}
            fill={WARNA.depan} fontFamily={MONO}>Δv</text>

      {/* ---------- pegangan ---------- */}
      <g className={dipegang === 'x' ? 'nyala' : undefined}>
        <circle cx={pojokLama.x} cy={pojokLama.y} r={18} fill="transparent" />
        <circle cx={pojokLama.x} cy={pojokLama.y} r={pegang === 0 || dipegang === 'x' ? 8 : 6.5}
                fill={WARNA.miring} stroke="var(--kartu)" strokeWidth={2.2} />
      </g>
      <g className={nyalaH ? 'nyala' : undefined}>
        <circle cx={pojokBaru.x} cy={pojokBaru.y} r={18} fill="transparent" />
        <circle cx={pojokBaru.x} cy={pojokBaru.y} r={pegang === 1 || nyalaH ? 8 : 6.5}
                fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={2.2} />
      </g>

      <text x={KOTAK.x0} y={VH - 6} fontSize={9.5} fill={WARNA.redup} fontFamily={MONO}>
        seret pojok mana pun
      </text>
    </svg>
  )
}

/** Baris tabel untuk kolom kanan panggung. */
export function tabelLuas(x: number, h: number): Array<{ nama: string; nilai: string }> {
  const b = bagian(x, h)
  return [
    { nama: 'pita 1 = Δu · v', nilai: `${angka(b.pita1, 3)}, dibagi h = ${angka(b.pita1 / h, 3)}` },
    { nama: 'pita 2 = u · Δv', nilai: `${angka(b.pita2, 3)}, dibagi h = ${angka(b.pita2 / h, 3)}` },
    { nama: 'pojok = Δu · Δv', nilai: `${angka(b.pojok, 3)}, dibagi h = ${angka(b.pojok / h, 3)}` },
    { nama: 'ketiganya dibagi h', nilai: angka(b.jumlahDibagiH, 3) },
    { nama: 'rumus u′v + uv′', nilai: angka(b.rumus, 3) },
  ]
}
