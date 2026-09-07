'use client'

import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import { useSedangDiubah } from '@/components/kendali/sedang-diubah'
import Bidang from '@/components/widget/integral/Bidang'
import DaerahBertanda from '@/components/widget/integral/DaerahBertanda'
import {
  DAERAH_ATAS, DAERAH_BAWAH, WARNA, angka, jalurFungsi, jendelaTetap, keLayar,
  potongTanda, type Jendela,
} from '@/components/widget/integral/koordinat'
import {
  batasi, bulatkanKe, posisiMatematika, titikTersentuh,
} from '@/components/widget/integral/seret'

/**
 * Widget Materi 09: hasil integral dan luas daerah, ditampilkan berdampingan.
 *
 * APA YANG DIAJARKAN
 * Satu hal, dan ia baru meyakinkan kalau dua angkanya terlihat bersamaan pada
 * gambar yang sama: hasil integral dan luas daerah BUKAN benda yang sama.
 * Keduanya cuma kebetulan sama selama kurvanya tidak pernah turun di bawah
 * sumbu. Begitu ada bagian merah, keduanya berpisah, dan pada kurva
 * x kuadrat dikurangi 4x di selang 0 sampai 6 hasil integralnya nol sementara
 * luasnya 64 per 3.
 *
 * KENAPA KEDUA ANGKANYA SELALU DITAMPILKAN
 * Rancangan meminta kendali "Yang dihitung: integral atau luas". Kalau yang
 * tidak dipilih disembunyikan, siswa tidak pernah melihat keduanya berbeda;
 * ia hanya melihat satu angka berganti saat tombol ditekan, dan itu tidak
 * mengajarkan apa pun. Jadi keduanya selalu tertulis, dan yang dipilih
 * ditegaskan warnanya.
 *
 * TITIK POTONG DICARI SENDIRI, bukan didaftar per kurva. Pemecahan di titik
 * potong adalah inti materinya, jadi alat yang melakukannya harus satu dan
 * dipakai ulang: `potongTanda` di koordinat.ts, yang sama dengan yang dipakai
 * DaerahBertanda untuk mewarnai. Dengan begitu warna dan angka tidak mungkin
 * bercerita berbeda.
 */

const JARAK_MIN = 0.5

export type KurvaLuas = {
  nilai: string
  label: string
  tulis: string
  f: (x: number) => number
  /** antiturunan, untuk menghitung hasil integral tiap potongan */
  F: (x: number) => number
  ranah: { min: number; maks: number }
  jendela: Jendela
  aAwal: number
  bAwal: number
}

export const KURVA: KurvaLuas[] = [
  {
    nilai: 'x2-4x', label: 'x² - 4x', tulis: 'f(x) = x² - 4x',
    f: (x) => x * x - 4 * x,
    F: (x) => (x ** 3) / 3 - 2 * x * x,
    ranah: { min: -1, maks: 6 },
    jendela: jendelaTetap(-1.4, 6.4, -6, 13),
    aAwal: 0, bAwal: 6,
  },
  {
    nilai: 'x3-4x', label: 'x³ - 4x', tulis: 'f(x) = x³ - 4x',
    f: (x) => x ** 3 - 4 * x,
    F: (x) => (x ** 4) / 4 - 2 * x * x,
    ranah: { min: -2.5, maks: 2.5 },
    jendela: jendelaTetap(-2.9, 2.9, -7, 7),
    aAwal: -2, bAwal: 2,
  },
  {
    nilai: 'sin', label: 'sin x', tulis: 'f(x) = sin x',
    f: (x) => Math.sin(x),
    F: (x) => -Math.cos(x),
    ranah: { min: -3.5, maks: 3.5 },
    jendela: jendelaTetap(-3.9, 3.9, -1.7, 1.7),
    aAwal: -3, bAwal: 3,
  },
]

export const YANG_DIHITUNG = [
  { nilai: 'integral', label: 'hasil integral' },
  { nilai: 'luas', label: 'luas daerah' },
]

export const AWAL = { kurva: 'x2-4x', a: 0, b: 6, mode: 'integral' }

export function kurvaDari(nilai: string): KurvaLuas {
  return KURVA.find((k) => k.nilai === nilai) ?? KURVA[0]
}

export default function LuasDuaDaerah({
  kurva, a, b, mode, onGeser,
}: {
  kurva: string
  a: number
  b: number
  mode: string
  onGeser: (yang: 'a' | 'b', nilai: number) => void
}) {
  const dipegang = useSedangDiubah()
  const [seret, setSeret] = useState<'a' | 'b' | null>(null)
  const k = kurvaDari(kurva)
  const j = k.jendela
  const p = keLayar(j)

  const nyalaA = dipegang === 'a' || seret === 'a'
  const nyalaB = dipegang === 'b' || seret === 'b'
  const adaYangDipegang = nyalaA || nyalaB

  /* Potongan yang sama dipakai untuk MEWARNAI dan untuk MENGHITUNG, supaya
     gambar dan angka tidak mungkin bercerita berbeda. */
  const potongan = potongTanda(k.f, a, b)
  const bertanda = potongan.map((s) => k.F(s.sampai) - k.F(s.dari))
  const hasilIntegral = bertanda.reduce((t, v) => t + v, 0)
  const luas = bertanda.reduce((t, v) => t + Math.abs(v), 0)
  /* Titik potong di DALAM selang, yaitu batas antar potongan. Ujung a dan b
     tidak dihitung sebagai titik potong walaupun kebetulan nilainya nol. */
  const titikPotong = potongan.slice(1).map((s) => s.dari)

  const layarA = { x: p.x(a), y: p.y(0) }
  const layarB = { x: p.x(b), y: p.y(0) }
  const modeLuas = mode === 'luas'

  function mulai(e: ReactPointerEvent<SVGSVGElement>) {
    const m = posisiMatematika(e, j)
    if (!m) return
    const mana = titikTersentuh({ x: p.x(m.x), y: p.y(m.y) }, [layarA, layarB])
    if (mana < 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setSeret(mana === 0 ? 'a' : 'b')
  }

  function gerak(e: ReactPointerEvent<SVGSVGElement>) {
    if (!seret) return
    const m = posisiMatematika(e, j)
    if (!m) return
    const kasar = bulatkanKe(m.x, 0.25)
    if (seret === 'a') onGeser('a', batasi(kasar, k.ranah.min, b - JARAK_MIN))
    else onGeser('b', batasi(kasar, a + JARAK_MIN, k.ranah.maks))
  }

  return (
    <Bidang
      jendela={j}
      keterangan={`${k.tulis}, dari ${angka(a, 2)} sampai ${angka(b, 2)}`}
      catatan={[
        {
          teks: `hasil integral: ${angka(hasilIntegral, 3)}`,
          warna: modeLuas ? WARNA.redup : DAERAH_ATAS,
        },
        {
          teks: `luas daerah: ${angka(luas, 3)}${titikPotong.length ? `, dipecah di ${titikPotong.map((t) => angka(t, 2)).join(' dan ')}` : ''}`,
          warna: modeLuas ? DAERAH_BAWAH : WARNA.redup,
        },
      ]}
      catatanKanan={[
        { teks: `a = ${angka(a, 2)}`, warna: nyalaA ? WARNA.miring : WARNA.redup },
        { teks: `b = ${angka(b, 2)}`, warna: nyalaB ? WARNA.miring : WARNA.redup },
      ]}
      catatanBawah={{
        teks: titikPotong.length
          ? 'yang merah masuk dengan tanda minus'
          : 'tidak memotong sumbu, keduanya sama',
        warna: titikPotong.length ? DAERAH_BAWAH : WARNA.redup,
      }}
      aria={`Kurva ${k.tulis} dari ${angka(a, 2)} sampai ${angka(b, 2)}. Hasil integralnya ${angka(hasilIntegral, 3)}, luas daerahnya ${angka(luas, 3)}. ${titikPotong.length ? `Memotong sumbu di ${titikPotong.map((t) => angka(t, 2)).join(' dan ')}.` : 'Tidak memotong sumbu pada selang ini, jadi keduanya sama.'}`}
      gaya={{ cursor: seret ? 'grabbing' : 'grab' }}
      onPointerDown={mulai}
      onPointerMove={gerak}
      onPointerUp={() => setSeret(null)}
    >
      <DaerahBertanda f={k.f} a={a} b={b} jendela={j} pekat={0.32} nyala={adaYangDipegang} />

      <path d={jalurFungsi(k.f, j)} fill="none" stroke={WARNA.miring} strokeWidth={2.8}
            strokeLinecap="round" />

      {/* ---------- titik potong dengan sumbu ----------
          Ditandai lingkaran kosong supaya beda tegas dari pegangan a dan b
          yang terisi. Menyala saat salah satu batas dipegang, sebab di situlah
          siswa sedang mencari tahu di mana daerahnya berganti sisi. */}
      {titikPotong.map((t) => (
        <circle
          key={t}
          className={adaYangDipegang ? 'nyala' : undefined}
          cx={p.x(t)} cy={p.y(0)} r={adaYangDipegang ? 6.5 : 5}
          fill="var(--kartu)" stroke={DAERAH_BAWAH} strokeWidth={2.2}
        />
      ))}

      {/* ---------- batas a dan b ---------- */}
      {([['a', layarA, nyalaA], ['b', layarB, nyalaB]] as const).map(([nama, t, ny]) => (
        <g key={nama} className={ny ? 'nyala' : undefined}>
          <line x1={t.x} y1={p.y(j.yMin)} x2={t.x} y2={p.y(j.yMax)}
                stroke={WARNA.sudut} strokeWidth={ny ? 2.4 : 1.4} strokeDasharray="5 4" opacity={0.8} />
          <circle cx={t.x} cy={t.y} r={18} fill="transparent" />
          <circle cx={t.x} cy={t.y} r={ny ? 9.5 : 7}
                  fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={2.4} />
        </g>
      ))}
    </Bidang>
  )
}
