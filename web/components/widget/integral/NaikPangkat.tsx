'use client'

import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import { useSedangDiubah } from '@/components/kendali/sedang-diubah'
import Bidang from '@/components/widget/integral/Bidang'
import {
  DAERAH_ATAS, DAERAH_BAWAH, PAPAN_DUA, WARNA, angka, jalurFungsi, jendelaTetap, keLayar, kotakUntuk, type Jendela,
} from '@/components/widget/integral/koordinat'
import {
  batasi, bulatkanKe, posisiMatematika, titikTersentuh,
} from '@/components/widget/integral/seret'

/**
 * Widget Materi 02: aturan pangkat, dilihat pada dua papan sekaligus.
 *
 * APA YANG DIAJARKAN
 * Papan atas kurva f, papan bawah antiturunannya F. Titik yang sama diseret di
 * keduanya. Yang harus terlihat: TINGGI kurva di papan atas sama dengan
 * KEMIRINGAN kurva di papan bawah, pada setiap x yang siswa coba sendiri.
 * Itu kalimat yang sama dengan aturan pangkat, hanya dalam bentuk gambar.
 *
 * KENAPA n = -1 ADA DI DAFTAR PILIHAN
 * Rancangan menyebut pilihan (0, 1, 2, 3, setengah, -2), tetapi kalimat
 * petunjuknya menyuruh siswa memilih n = -1 dan melihat mesinnya menolak.
 * Tanpa -1 di daftar, petunjuk itu tidak mungkin diikuti. Jadi -1 dimasukkan,
 * dan penolakannya justru bagian yang mengajar: pangkat naik jadi nol,
 * pembaginya nol, dan di situlah satu-satunya pangkat yang gagal.
 *
 * KENAPA JENDELANYA BEDA ANTARA DUA PAPAN
 * f dan F punya jangkauan nilai yang berbeda jauh (pada n = 3 dan a = 2, f
 * sampai 21 sementara F sampai 12). Satu jendela untuk keduanya membuat salah
 * satunya tampil sebagai garis datar. Jendela per papan ditulis per pangkat,
 * dan TETAP selama pangkat itu dipilih: menggeser a, C, atau titik tidak
 * pernah menggoyang gambarnya.
 */

export const BATAS_A = { min: -2, maks: 2, langkah: 0.5 }
export const BATAS_C = { min: -3, maks: 3, langkah: 0.5 }
export const BATAS_X = { min: -2, maks: 2, langkah: 0.25 }

export type Pangkat = {
  nilai: string
  label: string
  /** nilai n sebagai bilangan; dipakai menghitung f dan F */
  n: number
  /** ditulis di layar sebagai pangkat, misalnya x² */
  tulis: string
  /** F ditulis apa adanya untuk panel, tanpa koefisien dan tanpa C */
  tulisF: string
  jendelaF: Jendela
  jendelaAntiturunan: Jendela
  /** batas kiri seret; akar dan pangkat negatif tidak punya nilai di kiri nol */
  xMinSeret: number
  /** tempat titik diletakkan saat pangkat ini baru dipilih */
  xAwal: number
  /** benar kalau aturan pangkat GAGAL di sini */
  ditolak?: boolean
}

/* UKURAN JENDELA, DAN KENAPA SEGINI
   Versi pertama mengukur jendela untuk keadaan paling ekstrem, yaitu a = 3.
   Akibatnya pada keadaan awal (a = 1) kurvanya nyaris datar dan batang tinggi
   yang menjadi inti pelajaran cuma setinggi beberapa piksel. Potretnya dibuka
   dan cacat itu langsung terlihat.

   Sekarang a dibatasi sampai 2, dan tiap jendela diukur pas untuk a = 2. Pada
   a = 1 kurvanya mengisi separuh jendela, dan itu masih terbaca. Jendelanya
   tetap TIDAK berubah saat a, C, atau titiknya digeser: kalau jendela ikut
   menyesuaikan a, mengubah a justru tidak akan mengubah apa pun di layar,
   dan pelajaran bahwa a meregangkan kurva ikut hilang.

   Pangkat pecahan dan pangkat negatif memakai jendela yang hanya memuat x
   positif. Sebelah kiri nol memang tidak punya nilai untuk mereka, jadi
   memasangnya cuma membuang separuh lebar layar. */
const XW = 2.2

export const PANGKAT: Pangkat[] = [
  {
    nilai: '0', label: '0', n: 0, tulis: '1', tulisF: 'x',
    jendelaF: jendelaTetap(-XW, XW, -2.6, 2.6, PAPAN_DUA.atas),
    jendelaAntiturunan: jendelaTetap(-XW, XW, -7.6, 7.6, PAPAN_DUA.bawah),
    xMinSeret: -2, xAwal: 1.5,
  },
  {
    nilai: '1', label: '1', n: 1, tulis: 'x', tulisF: 'x² / 2',
    jendelaF: jendelaTetap(-XW, XW, -5, 5, PAPAN_DUA.atas),
    jendelaAntiturunan: jendelaTetap(-XW, XW, -8, 8, PAPAN_DUA.bawah),
    xMinSeret: -2, xAwal: 1.5,
  },
  {
    nilai: '2', label: '2', n: 2, tulis: 'x²', tulisF: 'x³ / 3',
    jendelaF: jendelaTetap(-XW, XW, -10, 10, PAPAN_DUA.atas),
    jendelaAntiturunan: jendelaTetap(-XW, XW, -10.5, 10.5, PAPAN_DUA.bawah),
    xMinSeret: -2, xAwal: 1.75,
  },
  {
    nilai: '3', label: '3', n: 3, tulis: 'x³', tulisF: 'x⁴ / 4',
    jendelaF: jendelaTetap(-XW, XW, -22, 22, PAPAN_DUA.atas),
    jendelaAntiturunan: jendelaTetap(-XW, XW, -15, 15, PAPAN_DUA.bawah),
    xMinSeret: -2, xAwal: 1.75,
  },
  {
    nilai: '0.5', label: '½', n: 0.5, tulis: '√x', tulisF: '(2/3) x√x',
    jendelaF: jendelaTetap(0, XW, -3.5, 3.5, PAPAN_DUA.atas),
    jendelaAntiturunan: jendelaTetap(0, XW, -7.5, 7.5, PAPAN_DUA.bawah),
    xMinSeret: 0.25, xAwal: 1.5,
  },
  {
    nilai: '-1', label: '-1', n: -1, tulis: '1/x', tulisF: 'tidak ada di SMA',
    jendelaF: jendelaTetap(0, XW, -6, 6, PAPAN_DUA.atas),
    jendelaAntiturunan: jendelaTetap(0, XW, -6, 6, PAPAN_DUA.bawah),
    xMinSeret: 0.4, xAwal: 0.75,
    ditolak: true,
  },
  {
    nilai: '-2', label: '-2', n: -2, tulis: '1/x²', tulisF: '-1/x',
    jendelaF: jendelaTetap(0, XW, -13, 13, PAPAN_DUA.atas),
    jendelaAntiturunan: jendelaTetap(0, XW, -8.5, 8.5, PAPAN_DUA.bawah),
    xMinSeret: 0.4, xAwal: 0.75,
  },
]

export const AWAL = { pangkat: '2', a: 1, C: 0, x: 1.75 }

export function pangkatDari(nilai: string): Pangkat {
  return PANGKAT.find((p) => p.nilai === nilai) ?? PANGKAT[2]
}

/** Tulis koefisien di depan rumus: 1 dan -1 tidak ditulis angkanya. */
function depan(a: number): string {
  if (a === 1) return ''
  if (a === -1) return '-'
  return angka(a, 1)
}

export default function NaikPangkat({
  pangkat,
  a,
  C,
  x,
  onGeserX,
}: {
  pangkat: string
  a: number
  C: number
  x: number
  onGeserX: (x: number) => void
}) {
  const dipegang = useSedangDiubah()
  const [menyeret, setMenyeret] = useState(false)
  const pg = pangkatDari(pangkat)

  const f = (t: number) => a * Math.pow(t, pg.n)
  const F = (t: number) => (a * Math.pow(t, pg.n + 1)) / (pg.n + 1) + C

  const xAman = batasi(x, pg.xMinSeret, BATAS_X.maks)
  const nyalaX = dipegang === 'x' || menyeret
  const nyalaA = dipegang === 'a'
  const nyalaC = dipegang === 'C'

  const pAtas = keLayar(pg.jendelaF)
  const pBawah = keLayar(pg.jendelaAntiturunan)
  const tinggi = f(xAman)
  const titikAtas = { x: pAtas.x(xAman), y: pAtas.y(tinggi) }

  const yBawah = F(xAman)
  const titikBawah = { x: pBawah.x(xAman), y: pBawah.y(yBawah) }
  // Garis singgung di papan bawah: kemiringannya persis tinggi di papan atas.
  const panjang = Math.min(0.8, 8 / (1 + Math.abs(tinggi)))
  const singgung = {
    x1: xAman - panjang, y1: yBawah - tinggi * panjang,
    x2: xAman + panjang, y2: yBawah + tinggi * panjang,
  }

  /** Seret dipakai dua papan sekaligus, jadi penangannya dibuat sekali. */
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
        onGeserX(batasi(bulatkanKe(m.x, BATAS_X.langkah), pg.xMinSeret, BATAS_X.maks))
      },
      onPointerUp: () => setMenyeret(false),
      gaya: { cursor: menyeret ? 'grabbing' : 'grab' } as React.CSSProperties,
    }
  }

  const rumusF = pg.ditolak
    ? 'F(x) tidak ada bentuknya di SMA'
    : `F(x) = ${depan(a)}${pg.tulisF}${C === 0 ? '' : C > 0 ? ` + ${angka(C, 1)}` : ` - ${angka(-C, 1)}`}`

  return (
    <>
      {/* ---------------- PAPAN ATAS: kurva f ---------------- */}
      <Bidang
        jendela={pg.jendelaF}
        keterangan={`atas: f(x) = ${depan(a)}${pg.tulis}`}
        catatan={[{ teks: `tinggi f di x ini: ${angka(tinggi, 2)}`, warna: nyalaX ? WARNA.miring : WARNA.redup }]}
        catatanKanan={[{ teks: `x = ${angka(xAman, 2)}`, warna: nyalaX ? WARNA.miring : WARNA.redup }]}
        catatanBawah={{ teks: 'seret titiknya di papan mana pun' }}
        aria={`Papan atas, kurva f sama dengan ${depan(a)}${pg.tulis}. Di x sama dengan ${angka(xAman, 2)} tingginya ${angka(tinggi, 2)}.`}
        {...penangan(pg.jendelaF, titikAtas)}
      >
        <path d={jalurFungsi(f, pg.jendelaF)} fill="none" stroke={DAERAH_ATAS} strokeWidth={2.8}
              strokeLinecap="round" />

        {/* Batang tegak dari sumbu ke titik: itulah "tinggi" yang dimaksud. */}
        <g className={nyalaX ? 'nyala' : undefined}>
          <line
            x1={titikAtas.x} y1={pAtas.y(0)} x2={titikAtas.x} y2={titikAtas.y}
            stroke={WARNA.sudut} strokeWidth={nyalaX ? 3.6 : 2.6} strokeLinecap="round"
          />
          {/* Ujung mendatar kecil. Untuk tinggi yang cuma beberapa piksel,
              batang tegak saja hampir tidak terlihat; siku ini menandai
              ujungnya sehingga tetap terbaca sebagai ukuran. */}
          <line
            x1={titikAtas.x - 6} y1={titikAtas.y} x2={titikAtas.x + 6} y2={titikAtas.y}
            stroke={WARNA.sudut} strokeWidth={nyalaX ? 3.6 : 2.6} strokeLinecap="round"
          />
        </g>
        <g className={nyalaX ? 'nyala' : undefined}>
          <circle cx={titikAtas.x} cy={titikAtas.y} r={18} fill="transparent" />
          <circle cx={titikAtas.x} cy={titikAtas.y} r={nyalaX ? 9.5 : 7}
                  fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={2.4} />
        </g>
      </Bidang>

      {/* ---------------- PAPAN BAWAH: antiturunannya ---------------- */}
      <Bidang
        jendela={pg.jendelaAntiturunan}
        keterangan={`bawah: ${rumusF}`}
        catatan={[
          pg.ditolak
            ? { teks: 'pangkat naik jadi 0, jadi pembaginya nol', warna: DAERAH_BAWAH }
            : { teks: `periksa: F' = ${depan(a)}${pg.tulis}, sama dengan f di atas`, warna: DAERAH_ATAS },
          pg.ditolak
            ? { teks: 'satu-satunya pangkat yang gagal', warna: WARNA.redup }
            : {
                teks: nyalaC ? 'C bergeser, kemiringan tetap' : `kemiringan F di x ini: ${angka(tinggi, 2)}`,
                warna: nyalaC || nyalaX ? WARNA.miring : WARNA.redup,
              },
        ]}
        catatanKanan={[{ teks: nyalaA ? `a = ${angka(a, 1)}` : '', warna: WARNA.miring }]}
        aria={pg.ditolak
          ? 'Papan bawah kosong. Aturan pangkat tidak berlaku untuk pangkat -1, sebab pangkat naik menjadi nol sehingga pembaginya nol.'
          : `Papan bawah, antiturunan ${rumusF}. Kemiringannya di x sama dengan ${angka(xAman, 2)} adalah ${angka(tinggi, 2)}, sama dengan tinggi di papan atas.`}
        {...(pg.ditolak ? {} : penangan(pg.jendelaAntiturunan, titikBawah))}
      >
        {pg.ditolak ? (
          /* Papan sengaja dibiarkan kosong, bukan diisi kurva yang salah.
             Menggambar sesuatu di sini akan memberi kesan aturannya tetap
             jalan, padahal justru inilah satu-satunya pangkat yang gagal. */
          /* Ditengahkan pada KOTAK, bukan pada koordinat matematika.
             Versi pertama memakai titik tengah antara x = -2,2 dan x = 2,2,
             padahal jendela pangkat negatif mulai dari 0, sehingga titik itu
             jatuh di luar kotak dan tulisannya terpotong menjadi
             "ak pangkat -1". Ketahuan dari potret, bukan dari tsc. */
          <text
            x={(kotakUntuk(pg.jendelaAntiturunan.tinggi).x0 + kotakUntuk(pg.jendelaAntiturunan.tinggi).x1) / 2}
            y={(kotakUntuk(pg.jendelaAntiturunan.tinggi).y0 + kotakUntuk(pg.jendelaAntiturunan.tinggi).y1) / 2 - 10}
            textAnchor="middle"
            fontSize={13}
            fill={DAERAH_BAWAH}
          >
            mesin menolak pangkat -1
          </text>
        ) : (
          <>
            <path d={jalurFungsi(F, pg.jendelaAntiturunan)} fill="none" stroke={DAERAH_ATAS}
                  strokeWidth={2.8} strokeLinecap="round" />
            <line
              className={nyalaX || nyalaC ? 'nyala' : undefined}
              x1={pBawah.x(singgung.x1)} y1={pBawah.y(singgung.y1)}
              x2={pBawah.x(singgung.x2)} y2={pBawah.y(singgung.y2)}
              stroke={WARNA.sudut} strokeWidth={nyalaX || nyalaC ? 3.2 : 2.4} strokeLinecap="round"
            />
            <g className={nyalaX ? 'nyala' : undefined}>
              <circle cx={titikBawah.x} cy={titikBawah.y} r={18} fill="transparent" />
              <circle cx={titikBawah.x} cy={titikBawah.y} r={nyalaX ? 9.5 : 7}
                      fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={2.4} />
            </g>
          </>
        )}
      </Bidang>
    </>
  )
}
