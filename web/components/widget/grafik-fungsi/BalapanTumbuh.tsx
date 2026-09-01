'use client'

import Bidang from '@/components/widget/grafik-fungsi/Bidang'
import {
  KOTAK, WARNA, angka, jalurFungsi, jendelaMuat, keLayar, type Jendela,
} from '@/components/widget/grafik-fungsi/koordinat'

/**
 * Widget "Balapan Tumbuh", tahap 8.
 *
 * Tiga kurva pada satu sumbu: linear, kuadrat, dan eksponen, diadu sebagai
 * balapan. Garis akhirnya digeser ke kanan sedikit demi sedikit, dan
 * tampilannya TERPAKSA diperkecil terus supaya kurva eksponen tetap muat.
 *
 * Pengecilan itu bukan efek samping, melainkan pelajarannya. Siswa melihat
 * penunjuk skala di pojok melonjak dari puluhan ke ribuan, dan di situlah ia
 * merasakan apa arti pertumbuhan eksponen. Kalau bingkainya dipatok tetap,
 * kurva eksponen akan keluar layar tanpa bekas dan pelajarannya hilang.
 *
 * Perbandingan ketiga fungsi ini mengikuti buku Panduan Guru Kelas X halaman
 * cetak 27, yang memang menyandingkan f(x) = 2x, f(x) = x², dan f(x) = 2 pangkat x.
 */

export const BATAS_AKHIR = { min: 2, maks: 14, langkah: 1 }
export const BATAS_POKOK = { min: 0.4, maks: 3, langkah: 0.1 }

export const LINEAR = (x: number) => 2 * x
export const KUADRAT = (x: number) => x * x
export const eksponen = (pokok: number) => (x: number) => Math.pow(pokok, x)

/**
 * Langkah bulat pertama saat kurva eksponen melewati kurva kuadrat.
 *
 * Dikembalikan null kalau sampai garis akhir ia belum menyalip, misalnya saat
 * bilangan pokoknya kecil. Menampilkan angka yang dikarang di keadaan itu jauh
 * lebih buruk daripada mengaku belum ada.
 */
export function langkahMenyalip(pokok: number, akhir: number): number | null {
  for (let x = 1; x <= akhir; x++) {
    if (Math.pow(pokok, x) > x * x) return x
  }
  return null
}

/** Tabel angka untuk kolom kanan. Nilainya dibulatkan hanya saat ditampilkan. */
export function tabelBalapan(pokok: number, akhir: number) {
  const langkah: number[] = []
  for (let x = 1; x <= akhir; x++) langkah.push(x)
  return langkah.map((x) => ({
    x,
    linear: LINEAR(x),
    kuadrat: KUADRAT(x),
    eksponen: Math.pow(pokok, x),
  }))
}

function jendelaUntuk(pokok: number, akhir: number): Jendela {
  const titik: Array<[number, number]> = [[0, 0], [akhir, 0]]
  for (let i = 0; i <= 60; i++) {
    const x = (akhir * i) / 60
    titik.push([x, LINEAR(x)], [x, KUADRAT(x)], [x, Math.pow(pokok, x)])
  }
  const j = jendelaMuat(titik, 0.08)
  return { ...j, xMin: -akhir * 0.06, xMax: akhir * 1.06 }
}

export default function BalapanTumbuh({
  pokok,
  akhir,
}: {
  pokok: number
  akhir: number
}) {
  const jendela = jendelaUntuk(pokok, akhir)
  const p = keLayar(jendela)
  const fEks = eksponen(pokok)
  const menyalip = langkahMenyalip(pokok, akhir)
  const meluruh = pokok < 1

  const nilaiAkhir = {
    linear: LINEAR(akhir),
    kuadrat: KUADRAT(akhir),
    eksponen: fEks(akhir),
  }

  return (
    <Bidang
      jendela={jendela}
      keterangan={`y = 2x  ·  y = x²  ·  y = ${angka(pokok, 1)} pangkat x`}
      catatan={[
        {
          teks: `linear ${angka(nilaiAkhir.linear, 0)} · kuadrat ${angka(nilaiAkhir.kuadrat, 0)} · eksponen ${nilaiAkhir.eksponen >= 1000 ? angka(nilaiAkhir.eksponen, 0) : angka(nilaiAkhir.eksponen, 2)}`,
          warna: WARNA.miring,
        },
        {
          teks: meluruh
            ? 'pokok di bawah 1: ini peluruhan, bukan balapan'
            : menyalip !== null
              ? `eksponen menyalip kuadrat di langkah ${menyalip}`
              : 'sampai garis akhir, eksponen belum menyalip kuadrat',
          warna: meluruh ? WARNA.redup : WARNA.sudut,
        },
      ]}
      catatanKanan={[{ teks: `garis akhir ${akhir}` }]}
      catatanBawah={{ teks: 'biru linear, merah kuadrat, ungu eksp' }}
      aria={`Balapan tiga kurva sampai langkah ${akhir}. Linear ${angka(nilaiAkhir.linear, 0)}, kuadrat ${angka(nilaiAkhir.kuadrat, 0)}, eksponen ${angka(nilaiAkhir.eksponen, 1)}.`}
    >
      {/* ---------- garis akhir ---------- */}
      <line x1={p.x(akhir)} y1={KOTAK.y0} x2={p.x(akhir)} y2={KOTAK.y1}
            stroke={WARNA.redup} strokeWidth={1.3} strokeDasharray="4 4" opacity={0.7} />

      {/* ---------- ketiga kurva ---------- */}
      <path d={jalurFungsi(LINEAR, jendela)} fill="none" stroke={WARNA.samping} strokeWidth={2.4} />
      <path d={jalurFungsi(KUADRAT, jendela)} fill="none" stroke={WARNA.depan} strokeWidth={2.4} />
      <path d={jalurFungsi(fEks, jendela)} fill="none" stroke={WARNA.sudut} strokeWidth={3} />

      {/* ---------- titik akhir masing-masing, diberi label ---------- */}
      <circle cx={p.x(akhir)} cy={p.y(nilaiAkhir.linear)} r={4.5} fill={WARNA.samping}
              stroke="var(--kartu)" strokeWidth={1.8} />
      <circle cx={p.x(akhir)} cy={p.y(nilaiAkhir.kuadrat)} r={4.5} fill={WARNA.depan}
              stroke="var(--kartu)" strokeWidth={1.8} />
      <circle cx={p.x(akhir)} cy={p.y(nilaiAkhir.eksponen)} r={5.5} fill={WARNA.sudut}
              stroke="var(--kartu)" strokeWidth={2} />

    </Bidang>
  )
}
