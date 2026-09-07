'use client'

import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import { useSedangDiubah } from '@/components/kendali/sedang-diubah'
import Bidang from '@/components/widget/integral/Bidang'
import DaerahBertanda from '@/components/widget/integral/DaerahBertanda'
import {
  MONO, WARNA, angka, jalurFungsi, jendelaTetap, keLayar, type Jendela,
} from '@/components/widget/integral/koordinat'
import {
  batasi, bulatkanKe, posisiMatematika, titikTersentuh,
} from '@/components/widget/integral/seret'

/**
 * Widget Materi 06: memecah selang di titik c, dan luas yang punya tanda.
 *
 * APA YANG DIAJARKAN
 * Dua hal, dan keduanya hanya meyakinkan kalau dicoba sendiri:
 *   1. Sifat pemecahan selang. Geser c ke mana pun di antara a dan b, dan
 *      jumlah dua bagiannya TIDAK PERNAH berubah. Panel menuliskan ketiga
 *      angkanya berdampingan supaya kesamaan itu terbaca, bukan dipercaya.
 *   2. Luas bertanda. Bagian yang jatuh di bawah sumbu diwarnai merah dan
 *      masuk hitungan dengan tanda negatif. Pada kurva x pangkat tiga
 *      dikurangi 4x di selang -2 sampai 2, hasilnya nol padahal di layar
 *      jelas ada dua daerah berwarna.
 *
 * KENAPA NILAINYA DIHITUNG DARI ANTITURUNAN
 * Materi 06 belum mengajarkan cara cepat itu, dan halaman bacaannya memang
 * tidak menuliskannya. Tetapi widget harus menampilkan angka yang BENAR,
 * bukan angka hampiran yang membuat "jumlah dua bagian sama dengan
 * seluruhnya" meleset di digit ketiga dan justru membantah pelajarannya.
 * Yang disembunyikan cara menghitungnya, bukan kebenarannya.
 */

/** Jarak terkecil antar batas, supaya ketiganya tidak pernah berimpit. */
const JARAK_MIN = 0.25

export type KurvaPecah = {
  nilai: string
  label: string
  tulis: string
  f: (x: number) => number
  /** antiturunan, dipakai menghitung nilai yang ditampilkan */
  F: (x: number) => number
  ranah: { min: number; maks: number }
  jendela: Jendela
  aAwal: number
  bAwal: number
  cAwal: number
}

export const KURVA: KurvaPecah[] = [
  {
    nilai: 'x', label: 'x', tulis: 'f(x) = x',
    f: (x) => x,
    F: (x) => (x * x) / 2,
    ranah: { min: -3, maks: 3 },
    jendela: jendelaTetap(-3.4, 3.4, -4, 4),
    aAwal: 0, bAwal: 3, cAwal: 1,
  },
  {
    nilai: '4-x2', label: '4 - x²', tulis: 'f(x) = 4 - x²',
    f: (x) => 4 - x * x,
    F: (x) => 4 * x - (x ** 3) / 3,
    ranah: { min: -3, maks: 3 },
    jendela: jendelaTetap(-3.4, 3.4, -6, 5),
    aAwal: 0, bAwal: 3, cAwal: 2,
  },
  {
    nilai: 'x3-4x', label: 'x³ - 4x', tulis: 'f(x) = x³ - 4x',
    f: (x) => x ** 3 - 4 * x,
    F: (x) => (x ** 4) / 4 - 2 * x * x,
    ranah: { min: -2.5, maks: 2.5 },
    jendela: jendelaTetap(-2.9, 2.9, -7, 7),
    aAwal: -2, bAwal: 2, cAwal: 0,
  },
]

export const AWAL = { kurva: 'x', a: 0, b: 3, c: 1 }

export function kurvaDari(nilai: string): KurvaPecah {
  return KURVA.find((k) => k.nilai === nilai) ?? KURVA[0]
}

export default function PecahSelang({
  kurva, a, b, c, onGeser,
}: {
  kurva: string
  a: number
  b: number
  c: number
  onGeser: (yang: 'a' | 'b' | 'c', nilai: number) => void
}) {
  const dipegang = useSedangDiubah()
  const [seret, setSeret] = useState<'a' | 'b' | 'c' | null>(null)
  const k = kurvaDari(kurva)
  const j = k.jendela
  const p = keLayar(j)

  const nyala = (nama: 'a' | 'b' | 'c') => dipegang === nama || seret === nama

  const kiri = k.F(c) - k.F(a)
  const kanan = k.F(b) - k.F(c)
  const seluruh = k.F(b) - k.F(a)

  const layar = {
    a: { x: p.x(a), y: p.y(0) },
    c: { x: p.x(c), y: p.y(0) },
    b: { x: p.x(b), y: p.y(0) },
  }

  function mulai(e: ReactPointerEvent<SVGSVGElement>) {
    const m = posisiMatematika(e, j)
    if (!m) return
    const titik = { x: p.x(m.x), y: p.y(m.y) }
    /* c diperiksa LEBIH DULU. Ia berada di antara a dan b, jadi saat ketiganya
       berdekatan c-lah yang paling mungkin dimaksud; kalau a yang menang,
       menyeret c menjadi mustahil di selang sempit. */
    const urutan: Array<'c' | 'a' | 'b'> = ['c', 'a', 'b']
    const mana = titikTersentuh(titik, urutan.map((u) => layar[u]))
    if (mana < 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setSeret(urutan[mana])
  }

  function gerak(e: ReactPointerEvent<SVGSVGElement>) {
    if (!seret) return
    const m = posisiMatematika(e, j)
    if (!m) return
    const kasar = bulatkanKe(m.x, 0.25)
    if (seret === 'a') onGeser('a', batasi(kasar, k.ranah.min, c - JARAK_MIN))
    else if (seret === 'b') onGeser('b', batasi(kasar, c + JARAK_MIN, k.ranah.maks))
    else onGeser('c', batasi(kasar, a + JARAK_MIN, b - JARAK_MIN))
  }

  const nyalaC = nyala('c')

  return (
    <Bidang
      jendela={j}
      keterangan={`${k.tulis}, dipecah di c`}
      catatan={[
        { teks: `kiri ${angka(a, 2)} sampai ${angka(c, 2)}: ${angka(kiri, 3)}`, warna: WARNA.redup },
        {
          teks: `kanan sampai ${angka(b, 2)}: ${angka(kanan, 3)}, jumlahnya ${angka(kiri + kanan, 3)}`,
          warna: nyalaC ? WARNA.miring : WARNA.redup,
        },
      ]}
      catatanKanan={[
        { teks: `c = ${angka(c, 2)}`, warna: nyalaC ? WARNA.miring : WARNA.redup },
        { teks: `seluruhnya ${angka(seluruh, 3)}`, warna: WARNA.miring },
      ]}
      catatanBawah={{
        teks: nyalaC ? 'jumlahnya tidak berubah' : 'seret a, c, dan b di sumbu',
        warna: nyalaC ? WARNA.miring : WARNA.redup,
      }}
      aria={`Kurva ${k.tulis} dari ${angka(a, 2)} sampai ${angka(b, 2)}, dipecah di c sama dengan ${angka(c, 2)}. Bagian kiri ${angka(kiri, 3)}, bagian kanan ${angka(kanan, 3)}, jumlahnya ${angka(kiri + kanan, 3)}, dan seluruhnya ${angka(seluruh, 3)}.`}
      gaya={{ cursor: seret ? 'grabbing' : 'grab' }}
      onPointerDown={mulai}
      onPointerMove={gerak}
      onPointerUp={() => setSeret(null)}
    >
      {/* Dua bagian digambar terpisah dengan kepekatan sedikit berbeda, supaya
          pemecahannya terlihat sebagai dua daerah. Warnanya tetap ditentukan
          TANDA, bukan bagian: itu yang harus dikenali siswa. */}
      <DaerahBertanda f={k.f} a={a} b={c} jendela={j} pekat={0.24} nyala={nyala('a')} />
      <DaerahBertanda f={k.f} a={c} b={b} jendela={j} pekat={0.36} nyala={nyala('b')} />

      <path d={jalurFungsi(k.f, j)} fill="none" stroke={WARNA.miring} strokeWidth={2.8}
            strokeLinecap="round" />

      {/* ---------- batas a, c, b ---------- */}
      {(['a', 'c', 'b'] as const).map((nama) => {
        const t = layar[nama]
        const ny = nyala(nama)
        const pemecah = nama === 'c'
        return (
          <g key={nama} className={ny ? 'nyala' : undefined}>
            <line
              x1={t.x} y1={p.y(j.yMin)} x2={t.x} y2={p.y(j.yMax)}
              stroke={pemecah ? WARNA.sudut : WARNA.redup}
              strokeWidth={ny ? 2.6 : pemecah ? 1.8 : 1.2}
              strokeDasharray={pemecah ? undefined : '5 4'}
              opacity={pemecah ? 0.9 : 0.7}
            />
            <circle cx={t.x} cy={t.y} r={18} fill="transparent" />
            <circle cx={t.x} cy={t.y} r={ny ? 9.5 : 7}
                    fill={pemecah ? WARNA.sudut : 'var(--kartu)'}
                    stroke={WARNA.sudut} strokeWidth={2.4} />
            {/* Nama batasnya ditulis di TEPI BAWAH kotak, bukan di bawahnya.
                Isi Bidang dipotong tegas pada kotak, jadi apa pun yang digambar
                di luar KOTAK.y1 hilang tanpa jejak; versi pertama menaruhnya 26
                satuan di bawah sumbu dan labelnya tidak pernah muncul. */}
            <text x={t.x} y={p.y(j.yMin) - 6} textAnchor="middle" fontSize={10.5}
                  fontFamily={MONO} fill={ny ? WARNA.miring : WARNA.redup}>
              {nama}
            </text>
          </g>
        )
      })}
    </Bidang>
  )
}
