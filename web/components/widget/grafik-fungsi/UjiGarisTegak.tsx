'use client'

import { useSedangDiubah } from '@/components/kendali/sedang-diubah'
import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import Bidang from '@/components/widget/grafik-fungsi/Bidang'
import {
  KOTAK, WARNA, angka, jalurFungsi, jalurParametrik, jendelaTetap, keLayar,
} from '@/components/widget/grafik-fungsi/koordinat'
import { batasi, posisiMatematika } from '@/components/widget/grafik-fungsi/seret'

/**
 * Widget "Uji Garis Tegak", tahap 2.
 *
 * Lima gambar bergantian. Siswa menyeret garis tegak melintasinya, dan
 * penghitung titik potong berjalan hidup. Begitu ada satu posisi yang memotong
 * dua kali, gambarnya terbukti bukan grafik fungsi.
 *
 * KELIMANYA BEREAKSI, TANPA KECUALI. Ini bukan kebetulan melainkan aturan yang
 * lahir dari kegagalan galeri tahap 10 Trigonometri: di sana hanya satu dari
 * empat contoh yang punya bagian bergerak, dan seluruh widget jadi terasa
 * rusak. Lihat catatan di spec topik ini.
 *
 * Tiga dari lima gambar bukan grafik fungsi, dan dua sisanya fungsi. Grafik
 * tangga sengaja dimasukkan karena bentuknya paling "tidak seperti fungsi"
 * padahal ia lolos, sehingga siswa belajar bahwa yang diuji bukan kerapian
 * bentuknya.
 */

export type Bentuk = 'garis' | 'parabola' | 'lingkaran' | 'parabola-tidur' | 'tangga'

export const URUT_BENTUK: Bentuk[] = [
  'garis', 'parabola', 'lingkaran', 'parabola-tidur', 'tangga',
]

export const NAMA_BENTUK: Record<Bentuk, string> = {
  'garis': 'Garis lurus',
  'parabola': 'Parabola',
  'lingkaran': 'Lingkaran',
  'parabola-tidur': 'Parabola tidur',
  'tangga': 'Grafik tangga',
}

export const RUMUS_BENTUK: Record<Bentuk, string> = {
  'garis': 'y = 0,6x + 1',
  'parabola': 'y = 0,35x² - 2',
  'lingkaran': 'x² + y² = 16',
  'parabola-tidur': 'x = 0,35y² - 3',
  'tangga': 'tarif parkir per jam',
}

/** Betul kalau gambarnya memang grafik fungsi. Fakta tetap, bukan tebakan. */
export const ADALAH_FUNGSI: Record<Bentuk, boolean> = {
  'garis': true,
  'parabola': true,
  'lingkaran': false,
  'parabola-tidur': false,
  'tangga': true,
}

/** Petunjuk ke mana garisnya perlu digeser supaya buktinya terlihat. */
export const PETUNJUK: Record<Bentuk, string> = {
  'garis': 'geser ke mana pun, potongnya selalu satu',
  'parabola': 'walaupun melengkung, tiap x tetap punya satu y',
  'lingkaran': 'geser ke antara -4 dan 4, lalu hitung potongnya',
  'parabola-tidur': 'geser ke kanan dari -3, potongnya langsung dua',
  'tangga': 'garisnya putus-putus, tapi tiap x tetap punya satu y',
}

export const BATAS_GARIS = { min: -6, maks: 6, langkah: 0.1 }

const JENDELA = jendelaTetap(-6.4, 6.4, -5.2, 5.2)

const JARI_LINGKARAN = 4
const TANGGA = [
  { dari: -6.4, sampai: -2, y: -2 },
  { dari: -2, sampai: 0, y: 0 },
  { dari: 0, sampai: 2, y: 2 },
  { dari: 2, sampai: 6.4, y: 3 },
]

/**
 * Semua nilai y yang dipotong garis tegak di posisi x.
 *
 * Inilah inti seluruh widget. Panjang senarai yang dikembalikan adalah jumlah
 * titik potongnya, dan angka itu yang dipakai menjatuhkan vonis.
 */
export function potongDi(bentuk: Bentuk, x: number): number[] {
  if (bentuk === 'garis') return [0.6 * x + 1]
  if (bentuk === 'parabola') return [0.35 * x * x - 2]

  if (bentuk === 'lingkaran') {
    const sisa = JARI_LINGKARAN * JARI_LINGKARAN - x * x
    if (sisa < 0) return []
    if (sisa === 0) return [0]
    const akar = Math.sqrt(sisa)
    return [akar, -akar]
  }

  if (bentuk === 'parabola-tidur') {
    // x = 0,35y² - 3  ->  y² = (x + 3) : 0,35
    const sisa = (x + 3) / 0.35
    if (sisa < 0) return []
    if (sisa === 0) return [0]
    const akar = Math.sqrt(sisa)
    return [akar, -akar]
  }

  const anak = TANGGA.find((t) => x >= t.dari && x < t.sampai)
  return anak ? [anak.y] : []
}

function jalurBentuk(bentuk: Bentuk): string {
  if (bentuk === 'garis') return jalurFungsi((x) => 0.6 * x + 1, JENDELA)
  if (bentuk === 'parabola') return jalurFungsi((x) => 0.35 * x * x - 2, JENDELA)
  if (bentuk === 'lingkaran') {
    return jalurParametrik(
      (t) => [JARI_LINGKARAN * Math.cos(t), JARI_LINGKARAN * Math.sin(t)],
      0, Math.PI * 2, JENDELA,
    )
  }
  if (bentuk === 'parabola-tidur') {
    return jalurParametrik((t) => [0.35 * t * t - 3, t], -5.2, 5.2, JENDELA)
  }
  return ''
}

export default function UjiGarisTegak({
  bentuk,
  x,
  onGeser,
}: {
  bentuk: Bentuk
  x: number
  onGeser: (x: number) => void
}) {
  const dipegang = useSedangDiubah()
  const [menyeret, setMenyeret] = useState(false)
  const p = keLayar(JENDELA)
  const potong = potongDi(bentuk, x)
  const banyak = potong.length
  const gagal = banyak > 1

  function tangkap(e: ReactPointerEvent<SVGSVGElement>) {
    const m = posisiMatematika(e, JENDELA)
    if (!m) return
    onGeser(batasi(Math.round(m.x * 10) / 10, BATAS_GARIS.min, BATAS_GARIS.maks))
  }

  return (
    <Bidang
      jendela={JENDELA}
      keterangan={RUMUS_BENTUK[bentuk]}
      catatan={[
        { teks: `memotong ${banyak} kali`, warna: gagal ? WARNA.depan : WARNA.miring },
        {
          teks: gagal
            ? 'satu x punya dua y, jadi ini BUKAN grafik fungsi'
            : PETUNJUK[bentuk],
          warna: gagal ? WARNA.depan : WARNA.redup,
        },
      ]}
      catatanKanan={[{ teks: `x = ${angka(x, 1)}`, warna: WARNA.samping }]}
      aria={`${NAMA_BENTUK[bentuk]}. Garis tegak di x sama dengan ${angka(x, 1)} memotong gambarnya ${banyak} kali.`}
      tandaSkala={false}
      gaya={{ cursor: menyeret ? 'grabbing' : 'grab', touchAction: 'none' }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        setMenyeret(true)
        tangkap(e)
      }}
      onPointerMove={(e) => { if (menyeret) tangkap(e) }}
      onPointerUp={() => setMenyeret(false)}
    >
      {/* ---------- gambarnya ---------- */}
      {bentuk === 'tangga' ? (
        <>
          {TANGGA.map((t) => (
            <g key={t.dari}>
              <line x1={p.x(t.dari)} y1={p.y(t.y)} x2={p.x(t.sampai)} y2={p.y(t.y)}
                    stroke={WARNA.miring} strokeWidth={2.8} strokeLinecap="round" />
              {/* bulatan penuh di ujung kiri: nilai itu TERMASUK */}
              {t.dari > JENDELA.xMin && (
                <circle cx={p.x(t.dari)} cy={p.y(t.y)} r={4} fill={WARNA.miring} />
              )}
              {/* bulatan kosong di ujung kanan: nilai itu TIDAK termasuk */}
              {t.sampai < JENDELA.xMax && (
                <circle cx={p.x(t.sampai)} cy={p.y(t.y)} r={4} fill="var(--kartu)"
                        stroke={WARNA.miring} strokeWidth={2} />
              )}
            </g>
          ))}
        </>
      ) : (
        <path d={jalurBentuk(bentuk)} fill="none" stroke={WARNA.miring} strokeWidth={2.8}
              strokeLinecap="round" />
      )}

      {/* ---------- garis tegak yang diseret ---------- */}
      <line className={dipegang === 'x' ? 'nyala' : undefined} x1={p.x(x)} y1={KOTAK.y0} x2={p.x(x)} y2={KOTAK.y1}
            stroke={gagal ? WARNA.depan : WARNA.samping} strokeWidth={2.2} strokeDasharray="6 4" />

      {/* pegangan seret di ujung bawah garis, supaya terlihat memang bisa ditarik */}
      <circle cx={p.x(x)} cy={KOTAK.y1 - 6} r={16} fill="transparent" />
      <circle cx={p.x(x)} cy={KOTAK.y1 - 6} r={menyeret || dipegang === 'x' ? 7.5 : 6}
              fill={gagal ? WARNA.depan : WARNA.samping} stroke="var(--kartu)" strokeWidth={2} />

      {/* ---------- titik potongnya ---------- */}
      {potong.map((y, i) => (
        <circle key={i} cx={p.x(x)} cy={p.y(y)} r={5.5}
                fill={gagal ? WARNA.depan : WARNA.sudut}
                stroke="var(--kartu)" strokeWidth={2} />
      ))}

    </Bidang>
  )
}
