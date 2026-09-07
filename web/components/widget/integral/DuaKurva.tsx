'use client'

import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import { useSedangDiubah } from '@/components/kendali/sedang-diubah'
import Bidang from '@/components/widget/integral/Bidang'
import {
  DAERAH_ATAS, DAERAH_BAWAH, WARNA, angka, jalurAntara, jalurFungsi, jendelaTetap,
  keLayar, potongTanda, type Jendela,
} from '@/components/widget/integral/koordinat'
import {
  batasi, bulatkanKe, posisiMatematika, titikTersentuh,
} from '@/components/widget/integral/seret'

/**
 * Widget Materi 10: luas antara dua kurva.
 *
 * APA YANG DIAJARKAN
 * Bahwa urutan pengurangan TIDAK BEBAS. Persegi panjangnya tidak lagi berdiri
 * di atas sumbu melainkan di antara dua kurva, dan di titik potong keduanya
 * bertukar posisi. Warna persegi panjang ikut bertukar di situ, jadi siswa
 * melihat pergantiannya terjadi, bukan diberitahu bahwa ia terjadi.
 *
 * KENAPA WARNANYA DUA, BUKAN SATU
 * Kalau semua persegi panjang berwarna sama, menyeret batas melewati titik
 * potong tidak mengubah apa pun di layar, dan pelajaran utamanya hilang.
 * Biru berarti kurva pertama sedang di atas, merah berarti kurva kedua yang
 * di atas. Panel menyebutkan mana yang di atas dengan kata, supaya warnanya
 * tidak perlu ditebak artinya.
 *
 * SATU PEMECAH UNTUK SEMUA: potongan dicari dengan `potongTanda` pada selisih
 * kedua kurva, alat yang sama yang dipakai Materi 06 dan 09 untuk memecah di
 * titik ganti tanda. Warna, angka, dan daftar titik potong karena itu tidak
 * mungkin bercerita berbeda.
 */

const JARAK_MIN = 0.25
export const BATAS_N = { min: 1, maks: 40, langkah: 1 }

export type Pasangan = {
  nilai: string
  label: string
  /** nama kurva pertama, yang diwarnai biru saat ia di atas */
  namaF: string
  namaG: string
  f: (x: number) => number
  g: (x: number) => number
  /** antiturunan dari f dikurangi g */
  H: (x: number) => number
  ranah: { min: number; maks: number }
  jendela: Jendela
  aAwal: number
  bAwal: number
  /** titik potong terluar, dipakai tombol "pakai titik potong" */
  potongKiri: number
  potongKanan: number
  langkahSeret: number
}

export const PASANGAN: Pasangan[] = [
  {
    nilai: 'garis-parabola', label: 'x + 2 dan x²',
    namaF: 'x + 2', namaG: 'x²',
    f: (x) => x + 2,
    g: (x) => x * x,
    H: (x) => (x * x) / 2 + 2 * x - (x ** 3) / 3,
    ranah: { min: -2.5, maks: 3 },
    jendela: jendelaTetap(-2.7, 3.2, -1.5, 7),
    aAwal: -1, bAwal: 2,
    potongKiri: -1, potongKanan: 2,
    langkahSeret: 0.25,
  },
  {
    nilai: 'kubik-garis', label: 'x³ dan x',
    namaF: 'x³', namaG: 'x',
    f: (x) => x ** 3,
    g: (x) => x,
    H: (x) => (x ** 4) / 4 - (x * x) / 2,
    ranah: { min: -1.6, maks: 1.6 },
    jendela: jendelaTetap(-1.8, 1.8, -3, 3),
    aAwal: -1, bAwal: 1,
    potongKiri: -1, potongKanan: 1,
    langkahSeret: 0.25,
  },
  {
    nilai: 'parabola-garis', label: 'x² dan x',
    namaF: 'x²', namaG: 'x',
    f: (x) => x * x,
    g: (x) => x,
    H: (x) => (x ** 3) / 3 - (x * x) / 2,
    ranah: { min: -0.5, maks: 1.75 },
    jendela: jendelaTetap(-0.7, 1.9, -0.7, 2.4),
    aAwal: 0, bAwal: 1,
    potongKiri: 0, potongKanan: 1,
    langkahSeret: 0.25,
  },
]

export const AWAL = { pasangan: 'garis-parabola', a: -1, b: 2, n: 12 }

export function pasanganDari(nilai: string): Pasangan {
  return PASANGAN.find((p) => p.nilai === nilai) ?? PASANGAN[0]
}

export default function DuaKurva({
  pasangan, a, b, n, onGeser,
}: {
  pasangan: string
  a: number
  b: number
  n: number
  onGeser: (yang: 'a' | 'b', nilai: number) => void
}) {
  const dipegang = useSedangDiubah()
  const [seret, setSeret] = useState<'a' | 'b' | null>(null)
  const ps = pasanganDari(pasangan)
  const j = ps.jendela
  const p = keLayar(j)

  const nyalaA = dipegang === 'a' || seret === 'a'
  const nyalaB = dipegang === 'b' || seret === 'b'
  const nyalaN = dipegang === 'n'

  const beda = (x: number) => ps.f(x) - ps.g(x)
  const potongan = potongTanda(beda, a, b)
  const bertanda = potongan.map((s) => ps.H(s.sampai) - ps.H(s.dari))
  const hasil = bertanda.reduce((t, v) => t + v, 0)
  const luas = bertanda.reduce((t, v) => t + Math.abs(v), 0)
  const titikPotong = potongan.slice(1).map((s) => s.dari)

  /* Kalimat "yang di atas" hanya sah kalau urutannya SATU MACAM di seluruh
     selang. Kalau kedua kurva bertukar di dalamnya, menyebut satu nama saja
     justru mengajarkan hal yang dilawan materi ini. Lagipula pada selang
     simetris seperti -1 sampai 1, titik tengahnya persis titik potong dan
     nilai selisihnya nol, sehingga namanya akan ditentukan pembulatan. */
  const bertukar = potongan.length > 1
  const pertamaPositif = potongan.length > 0 ? potongan[0].positif : true
  const yangDiAtas = pertamaPositif ? ps.namaF : ps.namaG

  const lebar = (b - a) / n
  const kotak = Array.from({ length: n }, (_, i) => {
    const tengah = a + (i + 0.5) * lebar
    return { kiri: a + i * lebar, tengah, atas: ps.f(tengah), bawah: ps.g(tengah) }
  })

  const layarA = { x: p.x(a), y: p.y(ps.g(a)) }
  const layarB = { x: p.x(b), y: p.y(ps.g(b)) }

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
    const kasar = bulatkanKe(m.x, ps.langkahSeret)
    if (seret === 'a') onGeser('a', batasi(kasar, ps.ranah.min, b - JARAK_MIN))
    else onGeser('b', batasi(kasar, a + JARAK_MIN, ps.ranah.maks))
  }

  return (
    <Bidang
      jendela={j}
      keterangan={`${ps.namaF} dan ${ps.namaG}, dari ${angka(a, 2)} sampai ${angka(b, 2)}`}
      catatan={[
        bertukar
          ? { teks: `keduanya BERTUKAR di dalam selang ini`, warna: DAERAH_BAWAH }
          : { teks: `yang di atas sepanjang selang: ${yangDiAtas}`, warna: pertamaPositif ? DAERAH_ATAS : DAERAH_BAWAH },
        {
          teks: titikPotong.length
            ? `luas ${angka(luas, 3)}, dipecah di ${titikPotong.map((t) => angka(t, 2)).join(' dan ')}`
            : `luas ${angka(luas, 3)}, tidak perlu dipecah`,
          warna: nyalaN ? WARNA.miring : WARNA.redup,
        },
      ]}
      catatanKanan={[
        { teks: `a = ${angka(a, 2)}`, warna: nyalaA ? WARNA.miring : WARNA.redup },
        { teks: `b = ${angka(b, 2)}`, warna: nyalaB ? WARNA.miring : WARNA.redup },
      ]}
      catatanBawah={{
        teks: titikPotong.length
          ? `${ps.namaF} dikurangi ${ps.namaG}: ${angka(hasil, 3)}, tidak sama dengan luasnya`
          : `${ps.namaF} dikurangi ${ps.namaG}: ${angka(hasil, 3)}`,
        warna: titikPotong.length ? DAERAH_BAWAH : WARNA.redup,
      }}
      aria={`Daerah antara ${ps.namaF} dan ${ps.namaG} dari ${angka(a, 2)} sampai ${angka(b, 2)}. ${bertukar ? 'Keduanya bertukar posisi di dalam selang ini.' : `Yang di atas sepanjang selang ${yangDiAtas}.`} Luasnya ${angka(luas, 3)}, sementara ${ps.namaF} dikurangi ${ps.namaG} memberi ${angka(hasil, 3)}. ${titikPotong.length ? `Kedua kurva bertukar di ${titikPotong.map((t) => angka(t, 2)).join(' dan ')}.` : ''}`}
      gaya={{ cursor: seret ? 'grabbing' : 'grab' }}
      onPointerDown={mulai}
      onPointerMove={gerak}
      onPointerUp={() => setSeret(null)}
    >
      {/* ---------- daerahnya, diwarnai menurut siapa yang di atas ---------- */}
      {potongan.map((s, i) => (
        <path
          key={i}
          d={jalurAntara(
            s.positif ? ps.f : ps.g,
            s.positif ? ps.g : ps.f,
            s.dari, s.sampai, j,
          )}
          fill={s.positif ? DAERAH_ATAS : DAERAH_BAWAH}
          fillOpacity={0.24}
          stroke="none"
        />
      ))}

      {/* ---------- persegi panjang setinggi selisih dua kurva ----------
          Tingginya bukan lagi nilai fungsi, melainkan jarak antara kedua
          kurva. Alasnya menempel di kurva bawah, bukan di sumbu, dan itulah
          satu-satunya hal yang berubah dari Materi 05. */}
      <g className={nyalaN ? 'nyala' : undefined}>
        {kotak.map((k, i) => {
          const atas = Math.max(k.atas, k.bawah)
          const bawah = Math.min(k.atas, k.bawah)
          const fAtas = k.atas >= k.bawah
          return (
            <rect
              key={i}
              x={p.x(k.kiri)}
              y={p.y(atas)}
              width={Math.max(0, p.x(k.kiri + lebar) - p.x(k.kiri))}
              height={Math.max(0, p.y(bawah) - p.y(atas))}
              fill="none"
              stroke={fAtas ? DAERAH_ATAS : DAERAH_BAWAH}
              strokeWidth={n > 20 ? 0.6 : 1.1}
              strokeOpacity={nyalaN ? 0.95 : 0.65}
            />
          )
        })}
      </g>

      {/* ---------- kedua kurvanya ---------- */}
      <path d={jalurFungsi(ps.f, j)} fill="none" stroke={DAERAH_ATAS} strokeWidth={2.8}
            strokeLinecap="round" />
      <path d={jalurFungsi(ps.g, j)} fill="none" stroke={WARNA.sudut} strokeWidth={2.8}
            strokeLinecap="round" />

      {/* ---------- titik potong kedua kurva ---------- */}
      {titikPotong.map((t) => (
        <circle key={t} cx={p.x(t)} cy={p.y(ps.f(t))} r={5.5}
                fill="var(--kartu)" stroke={WARNA.miring} strokeWidth={2.2} />
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
