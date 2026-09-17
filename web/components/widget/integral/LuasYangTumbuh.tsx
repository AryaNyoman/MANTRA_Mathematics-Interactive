'use client'

import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import { useSedangDiubah } from '@/components/kendali/sedang-diubah'
import Bidang from '@/components/widget/integral/Bidang'
import DaerahBertanda from '@/components/widget/integral/DaerahBertanda'
import {
  DAERAH_ATAS, PAPAN_DUA, WARNA, angka, jalurFungsi, jendelaTetap, keLayar, type Jendela,
} from '@/components/widget/integral/koordinat'
import {
  batasi, bulatkanKe, posisiMatematika, titikTersentuh,
} from '@/components/widget/integral/seret'

/**
 * Widget Materi 07: fungsi luas yang tumbuh, dan Teorema Dasar Kalkulus.
 *
 * APA YANG DIAJARKAN
 * Puncak topik ini, dan satu-satunya cara membuatnya terasa bukan kebetulan:
 * dua papan yang bergerak bersamaan. Papan atas mengisi daerah dari a sampai x
 * saat x diseret. Papan bawah menjejak titik (x, A(x)) sehingga kurva A
 * terbentuk di depan mata. Yang harus dilihat siswa: KEMIRINGAN kurva bawah di
 * sebuah x sama dengan TINGGI kurva atas di x itu.
 *
 * PITA TIPIS DI UJUNG KANAN
 * Pembuktian TDK I bertumpu pada satu gagasan: menambah x sedikit menambah
 * luas sebesar pita setinggi f(x). Pita itu digambar sungguhan di ujung kanan
 * daerah dan menyala saat x dipegang, jadi kalimat pembuktiannya punya benda
 * yang bisa ditunjuk.
 *
 * KENAPA a DIPATOK NOL
 * Definisi fungsi luas memerlukan satu titik pangkal yang tetap. Kalau a ikut
 * bisa digeser, kurva A akan naik turun seluruhnya tiap kali a berubah, dan
 * siswa akan mengira A bergantung pada dua hal sekaligus. Yang sedang
 * diajarkan cuma satu: A berubah karena x, dan lajunya adalah f.
 */

export const BATAS_X = { min: 0, maks: 3, langkah: 0.25 }
/** Lebar pita tipis di ujung kanan, dalam satuan x. */
const LEBAR_PITA = 0.14

export type KurvaTumbuh = {
  nilai: string
  label: string
  tulis: string
  tulisA: string
  f: (x: number) => number
  /** A(x), luas bertanda dari 0 sampai x */
  A: (x: number) => number
  jendelaAtas: Jendela
  jendelaBawah: Jendela
}

export const KURVA: KurvaTumbuh[] = [
  {
    nilai: 'x', label: 'x', tulis: 'f(x) = x', tulisA: 'A(x) = x² / 2',
    f: (x) => x,
    A: (x) => (x * x) / 2,
    jendelaAtas: jendelaTetap(-0.35, 3.35, -0.6, 3.6, PAPAN_DUA.atas),
    jendelaBawah: jendelaTetap(-0.35, 3.35, -0.7, 5.4, PAPAN_DUA.bawah),
  },
  {
    nilai: 'x2', label: 'x²', tulis: 'f(x) = x²', tulisA: 'A(x) = x³ / 3',
    f: (x) => x * x,
    A: (x) => (x ** 3) / 3,
    jendelaAtas: jendelaTetap(-0.35, 3.35, -1.2, 9.6, PAPAN_DUA.atas),
    jendelaBawah: jendelaTetap(-0.35, 3.35, -1.2, 9.6, PAPAN_DUA.bawah),
  },
  {
    nilai: '4-x2', label: '4 - x²', tulis: 'f(x) = 4 - x²', tulisA: 'A(x) = 4x - x³ / 3',
    f: (x) => 4 - x * x,
    A: (x) => 4 * x - (x ** 3) / 3,
    jendelaAtas: jendelaTetap(-0.35, 3.35, -5.8, 4.8, PAPAN_DUA.atas),
    jendelaBawah: jendelaTetap(-0.35, 3.35, -0.8, 6.2, PAPAN_DUA.bawah),
  },
]

export const AWAL = { kurva: 'x', x: 1.5 }

export function kurvaDari(nilai: string): KurvaTumbuh {
  return KURVA.find((k) => k.nilai === nilai) ?? KURVA[0]
}

export default function LuasYangTumbuh({
  kurva, x, onGeserX,
}: {
  kurva: string
  x: number
  onGeserX: (x: number) => void
}) {
  const dipegang = useSedangDiubah()
  const [menyeret, setMenyeret] = useState(false)
  const k = kurvaDari(kurva)
  const nyalaX = dipegang === 'x' || menyeret

  const pAtas = keLayar(k.jendelaAtas)
  const pBawah = keLayar(k.jendelaBawah)

  const tinggi = k.f(x)
  const luas = k.A(x)
  const titikAtas = { x: pAtas.x(x), y: pAtas.y(tinggi) }
  const titikBawah = { x: pBawah.x(x), y: pBawah.y(luas) }

  // Garis singgung kurva A: kemiringannya persis f(x).
  const panjang = Math.min(0.7, 5 / (1 + Math.abs(tinggi)))
  const singgung = {
    x1: x - panjang, y1: luas - tinggi * panjang,
    x2: x + panjang, y2: luas + tinggi * panjang,
  }

  /* Jejak kurva A hanya digambar dari 0 SAMPAI x, bukan seluruh selang.
     Kurva yang sudah tergambar penuh sejak awal menghilangkan seluruh gagasan
     "menjejak": siswa harus melihat kurva bawah TUMBUH karena ia menyeret.
     Batas kirinya nol, bukan tepi jendela: A adalah luas yang dihitung DARI
     nol, jadi menggambarnya di sebelah kiri nol menyiratkan luas yang berjalan
     mundur, dan itu bukan yang sedang diajarkan. */
  const jejakA = jalurFungsi(
    (t) => (t >= 0 && t <= x ? k.A(t) : NaN),
    k.jendelaBawah,
  )

  function penangan(j: Jendela, titikLayar: { x: number; y: number }) {
    const p = keLayar(j)
    return {
      onPointerDown(e: ReactPointerEvent<SVGSVGElement>) {
        const m = posisiMatematika(e, j)
        if (!m) return
        if (titikTersentuh({ x: p.x(m.x), y: p.y(m.y) }, [titikLayar]) < 0) return
        e.currentTarget.setPointerCapture(e.pointerId)
        setMenyeret(true)
      },
      onPointerMove(e: ReactPointerEvent<SVGSVGElement>) {
        if (!menyeret) return
        const m = posisiMatematika(e, j)
        if (!m) return
        onGeserX(batasi(bulatkanKe(m.x, BATAS_X.langkah), BATAS_X.min, BATAS_X.maks))
      },
      onPointerUp: () => setMenyeret(false),
      gaya: { cursor: menyeret ? 'grabbing' : 'grab' } as React.CSSProperties,
    }
  }

  return (
    <>
      {/* ---------------- PAPAN ATAS: kurva f dan daerah yang mengisi ---------------- */}
      <Bidang
        jendela={k.jendelaAtas}
        keterangan={`atas: ${k.tulis}`}
        catatan={[
          { teks: `luas terisi dari 0 sampai x: ${angka(luas, 3)}`, warna: DAERAH_ATAS },
          { teks: `tinggi kurva di x: ${angka(tinggi, 3)}`, warna: nyalaX ? WARNA.miring : WARNA.redup },
        ]}
        catatanKanan={[{ teks: `x = ${angka(x, 2)}`, warna: nyalaX ? WARNA.miring : WARNA.redup }]}
        catatanBawah={{ teks: 'seret titiknya, daerah ikut terisi' }}
        aria={`Papan atas, ${k.tulis}. Daerah dari 0 sampai x sama dengan ${angka(x, 2)} luasnya ${angka(luas, 3)}, dan tinggi kurva di situ ${angka(tinggi, 3)}.`}
        {...penangan(k.jendelaAtas, titikAtas)}
      >
        <DaerahBertanda f={k.f} a={0} b={x} jendela={k.jendelaAtas} pekat={0.28} nyala={nyalaX} />

        {/* Pita tipis di ujung kanan: inilah pertambahan luas saat x digeser. */}
        <g className={nyalaX ? 'nyala' : undefined}>
          <rect
            x={pAtas.x(x)}
            y={pAtas.y(Math.max(0, tinggi))}
            width={Math.max(0, pAtas.x(x + LEBAR_PITA) - pAtas.x(x))}
            height={Math.abs(pAtas.y(tinggi) - pAtas.y(0))}
            fill={WARNA.sudut}
            fillOpacity={nyalaX ? 0.75 : 0.4}
            stroke={WARNA.sudut}
            strokeWidth={1.2}
          />
        </g>

        <path d={jalurFungsi(k.f, k.jendelaAtas)} fill="none" stroke={WARNA.miring}
              strokeWidth={2.8} strokeLinecap="round" />

        <g className={nyalaX ? 'nyala' : undefined}>
          <circle cx={titikAtas.x} cy={titikAtas.y} r={18} fill="transparent" />
          <circle cx={titikAtas.x} cy={titikAtas.y} r={nyalaX ? 9.5 : 7}
                  fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={2.4} />
        </g>
      </Bidang>

      {/* ---------------- PAPAN BAWAH: kurva A yang dijejak ---------------- */}
      <Bidang
        jendela={k.jendelaBawah}
        keterangan={`bawah: ${k.tulisA}`}
        catatan={[
          { teks: `kemiringan A di x: ${angka(tinggi, 3)}`, warna: nyalaX ? WARNA.miring : DAERAH_ATAS },
          { teks: 'sama dengan tinggi kurva di papan atas', warna: WARNA.redup },
        ]}
        catatanKanan={[{ teks: `A(x) = ${angka(luas, 3)}`, warna: WARNA.miring }]}
        aria={`Papan bawah, kurva luas ${k.tulisA}. Di x sama dengan ${angka(x, 2)} nilainya ${angka(luas, 3)} dan kemiringannya ${angka(tinggi, 3)}, sama dengan tinggi kurva di papan atas.`}
        {...penangan(k.jendelaBawah, titikBawah)}
      >
        <path d={jejakA} fill="none" stroke={DAERAH_ATAS} strokeWidth={2.8} strokeLinecap="round" />

        <line
          className={nyalaX ? 'nyala' : undefined}
          x1={pBawah.x(singgung.x1)} y1={pBawah.y(singgung.y1)}
          x2={pBawah.x(singgung.x2)} y2={pBawah.y(singgung.y2)}
          stroke={WARNA.sudut} strokeWidth={nyalaX ? 3.2 : 2.4} strokeLinecap="round"
        />

        <g className={nyalaX ? 'nyala' : undefined}>
          <circle cx={titikBawah.x} cy={titikBawah.y} r={18} fill="transparent" />
          <circle cx={titikBawah.x} cy={titikBawah.y} r={nyalaX ? 9.5 : 7}
                  fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={2.4} />
        </g>
      </Bidang>
    </>
  )
}
