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
 * Widget Materi 05: jumlahan Riemann, persegi panjang yang ditumpuk sendiri.
 *
 * APA YANG DIAJARKAN
 * Satu hal saja, dan hanya bisa dirasakan dengan tangan: makin banyak
 * persegi panjangnya, makin kecil selisihnya terhadap luas sebenarnya. Panel
 * menuliskan ketiga angkanya sekaligus (jumlahan, luas sebenarnya, selisih)
 * supaya siswa melihat selisih itu menyusut sambil menaikkan n, bukan
 * diberitahu bahwa ia menyusut.
 *
 * KENAPA LUAS SEBENARNYA DIHITUNG DENGAN RUMUS, BUKAN DENGAN n BESAR
 * Kalau "luas sebenarnya" diam-diam dihitung sebagai jumlahan dengan n = 5000,
 * angkanya akan selalu sedikit meleset dan selisih yang ditampilkan tidak
 * pernah benar-benar nol. Siswa yang menaikkan n sampai 60 lalu melihat
 * selisih berhenti mengecil akan menyimpulkan hal yang salah. Jadi tiap fungsi
 * membawa rumus luas eksaknya sendiri.
 *
 * KENAPA a DAN b BISA DISERET DI SUMBU
 * Aturan proyek: widget sebisanya ditarik langsung. Di sini menyeret batas
 * juga yang membuat "luas di bawah kurva" terasa sebagai daerah yang punya
 * tepi, bukan sebagai lambang.
 */

export const BATAS_N = { min: 1, maks: 60, langkah: 1 }
/** Lebar terkecil selang, supaya a dan b tidak pernah bertukar atau berimpit. */
const LEBAR_MIN = 0.5

export type FungsiRiemann = {
  nilai: string
  label: string
  /** ditulis di layar */
  tulis: string
  f: (x: number) => number
  /** luas eksak dari a sampai b, dihitung dengan antiturunannya */
  luasTepat: (a: number, b: number) => number
  /** ranah yang boleh dipilih siswa; batas seret ditahan di sini */
  ranah: { min: number; maks: number }
  jendela: Jendela
  aAwal: number
  bAwal: number
  langkahSeret: number
}

export const FUNGSI: FungsiRiemann[] = [
  {
    nilai: 'x', label: 'x', tulis: 'f(x) = x',
    f: (x) => x,
    luasTepat: (a, b) => (b * b - a * a) / 2,
    ranah: { min: 0, maks: 7 },
    jendela: jendelaTetap(-0.5, 7.5, -0.9, 8),
    aAwal: 0, bAwal: 7, langkahSeret: 0.5,
  },
  {
    nilai: 'x2', label: 'x²', tulis: 'f(x) = x²',
    f: (x) => x * x,
    luasTepat: (a, b) => (b ** 3 - a ** 3) / 3,
    ranah: { min: 0, maks: 3 },
    jendela: jendelaTetap(-0.35, 3.35, -1.1, 10),
    aAwal: 0, bAwal: 2, langkahSeret: 0.25,
  },
  {
    nilai: '4-x2', label: '4 - x²', tulis: 'f(x) = 4 - x²',
    f: (x) => 4 - x * x,
    luasTepat: (a, b) => 4 * (b - a) - (b ** 3 - a ** 3) / 3,
    ranah: { min: -2, maks: 2 },
    jendela: jendelaTetap(-2.4, 2.4, -0.7, 5),
    aAwal: 0, bAwal: 2, langkahSeret: 0.25,
  },
  {
    nilai: 'lingkaran', label: 'setengah lingkaran', tulis: 'f(x) = akar (1 - x²)',
    f: (x) => Math.sqrt(Math.max(0, 1 - x * x)),
    /* Antiturunan akar (1 - x²) adalah (x akar(1 - x²) + arcsin x) / 2.
       Dipakai apa adanya, bukan didekati, supaya selisih yang ditampilkan
       benar-benar menuju nol saat n dinaikkan. */
    luasTepat: (a, b) => {
      const G = (t: number) => (t * Math.sqrt(Math.max(0, 1 - t * t)) + Math.asin(batasi(t, -1, 1))) / 2
      return G(b) - G(a)
    },
    ranah: { min: -1, maks: 1 },
    jendela: jendelaTetap(-1.35, 1.35, -0.35, 1.45),
    aAwal: -1, bAwal: 1, langkahSeret: 0.25,
  },
]

export const SAMPEL = [
  { nilai: 'kiri', label: 'kiri' },
  { nilai: 'kanan', label: 'kanan' },
  { nilai: 'tengah', label: 'tengah' },
]

export const AWAL = { fungsi: 'x', n: 7, sampel: 'kanan', a: 0, b: 7 }

export function fungsiDari(nilai: string): FungsiRiemann {
  return FUNGSI.find((f) => f.nilai === nilai) ?? FUNGSI[0]
}

/** Geseran titik sampel di dalam satu bagian: 0 kiri, 1 kanan, setengah tengah. */
const GESER: Record<string, number> = { kiri: 0, kanan: 1, tengah: 0.5 }

/** Jumlahan Riemann, dihitung sebagai JUMLAH persegi panjang, bukan integral. */
export function jumlahan(
  f: (x: number) => number, a: number, b: number, n: number, sampel: string,
): number {
  const h = (b - a) / n
  const g = GESER[sampel] ?? 0
  let total = 0
  for (let i = 0; i < n; i++) total += f(a + (i + g) * h) * h
  return total
}

export default function PersegiPanjangMenumpuk({
  fungsi, n, sampel, a, b, onGeserBatas,
}: {
  fungsi: string
  n: number
  sampel: string
  a: number
  b: number
  onGeserBatas: (yang: 'a' | 'b', nilai: number) => void
}) {
  const dipegang = useSedangDiubah()
  const [seret, setSeret] = useState<'a' | 'b' | null>(null)
  const fg = fungsiDari(fungsi)
  const j = fg.jendela
  const p = keLayar(j)

  const nyalaN = dipegang === 'n' || dipegang === 'Banyak bagian n'
  const nyalaA = dipegang === 'a' || seret === 'a'
  const nyalaB = dipegang === 'b' || seret === 'b'

  const lebar = (b - a) / n
  const total = jumlahan(fg.f, a, b, n, sampel)
  const tepat = fg.luasTepat(a, b)
  const selisih = total - tepat

  // Persegi panjangnya dibangun sekali, lalu dipakai untuk menggambar.
  const kotak = Array.from({ length: n }, (_, i) => {
    const kiri = a + i * lebar
    const titikSampel = kiri + (GESER[sampel] ?? 0) * lebar
    return { kiri, lebar, tinggi: fg.f(titikSampel), titikSampel }
  })

  const layarA = { x: p.x(a), y: p.y(0) }
  const layarB = { x: p.x(b), y: p.y(0) }

  function mulai(e: ReactPointerEvent<SVGSVGElement>) {
    const m = posisiMatematika(e, j)
    if (!m) return
    const layar = { x: p.x(m.x), y: p.y(m.y) }
    const mana = titikTersentuh(layar, [layarA, layarB])
    if (mana < 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setSeret(mana === 0 ? 'a' : 'b')
  }

  function gerak(e: ReactPointerEvent<SVGSVGElement>) {
    if (!seret) return
    const m = posisiMatematika(e, j)
    if (!m) return
    const kasar = bulatkanKe(m.x, fg.langkahSeret)
    /* Batas ditahan supaya selalu a < b dan keduanya di dalam ranah fungsinya.
       Tanpa penahan ini, menyeret a melewati b membuat lebar bagian negatif,
       dan persegi panjangnya digambar terbalik menutupi kurvanya. */
    if (seret === 'a') onGeserBatas('a', batasi(kasar, fg.ranah.min, b - LEBAR_MIN))
    else onGeserBatas('b', batasi(kasar, a + LEBAR_MIN, fg.ranah.maks))
  }

  return (
    <Bidang
      jendela={j}
      keterangan={`${fg.tulis}, dari ${angka(a, 2)} sampai ${angka(b, 2)}`}
      catatan={[
        { teks: `jumlahan ${sampel}, n = ${n}: ${angka(total, 3)}`, warna: nyalaN ? WARNA.miring : DAERAH_ATAS },
        { teks: `luas sebenarnya ${angka(tepat, 3)}, selisih ${angka(Math.abs(selisih), 3)}`, warna: WARNA.redup },
      ]}
      catatanKanan={[
        { teks: `a = ${angka(a, 2)}`, warna: nyalaA ? WARNA.miring : WARNA.redup },
        { teks: `b = ${angka(b, 2)}`, warna: nyalaB ? WARNA.miring : WARNA.redup },
      ]}
      catatanBawah={{ teks: 'seret a dan b di sumbu' }}
      aria={`Jumlahan Riemann untuk ${fg.tulis} dari ${angka(a, 2)} sampai ${angka(b, 2)}, ${n} bagian, titik sampel ${sampel}. Jumlahannya ${angka(total, 3)}, luas sebenarnya ${angka(tepat, 3)}, selisihnya ${angka(Math.abs(selisih), 3)}.`}
      gaya={{ cursor: seret ? 'grabbing' : 'grab' }}
      onPointerDown={mulai}
      onPointerMove={gerak}
      onPointerUp={() => setSeret(null)}
    >
      {/* ---------- persegi panjangnya ----------
          Digambar SEBELUM kurvanya, supaya kurva tetap terlihat utuh di atas
          tumpukan. Kalau urutannya dibalik, tepi atas persegi panjang menutupi
          kurvanya persis di tempat keduanya harus dibandingkan. */}
      <g className={nyalaN ? 'nyala' : undefined}>
        {kotak.map((k, i) => {
          const yAtas = p.y(Math.max(0, k.tinggi))
          const yBawah = p.y(Math.min(0, k.tinggi))
          return (
            <rect
              key={i}
              x={p.x(k.kiri)}
              y={yAtas}
              width={Math.max(0, p.x(k.kiri + k.lebar) - p.x(k.kiri))}
              height={Math.max(0, yBawah - yAtas)}
              fill={DAERAH_ATAS}
              fillOpacity={nyalaN ? 0.34 : 0.22}
              stroke={DAERAH_ATAS}
              strokeWidth={n > 30 ? 0.4 : 0.9}
              strokeOpacity={0.65}
            />
          )
        })}
      </g>

      {/* ---------- kurvanya ---------- */}
      <path d={jalurFungsi(fg.f, j)} fill="none" stroke={WARNA.miring} strokeWidth={2.8}
            strokeLinecap="round" />

      {/* ---------- batas a dan b, bisa diseret di sumbu ---------- */}
      {([['a', layarA, nyalaA, a], ['b', layarB, nyalaB, b]] as const).map(([nama, titik, nyala]) => (
        <g key={nama} className={nyala ? 'nyala' : undefined}>
          <line x1={titik.x} y1={p.y(j.yMin)} x2={titik.x} y2={p.y(j.yMax)}
                stroke={WARNA.sudut} strokeWidth={nyala ? 2.4 : 1.4} strokeDasharray="5 4" opacity={0.8} />
          <circle cx={titik.x} cy={titik.y} r={18} fill="transparent" />
          <circle cx={titik.x} cy={titik.y} r={nyala ? 9.5 : 7}
                  fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={2.4} />
        </g>
      ))}
    </Bidang>
  )
}
