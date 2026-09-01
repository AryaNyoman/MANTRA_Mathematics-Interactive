'use client'

import Bidang from '@/components/widget/grafik-fungsi/Bidang'
import {
  KOTAK, MONO, WARNA, angka, jalurFungsi, keLayar,
} from '@/components/widget/grafik-fungsi/koordinat'
import { jendelaTerbatas } from '@/components/widget/grafik-fungsi/transformasi'

/**
 * Widget "Lipat Mutlak", tahap 7.
 *
 * Satu grafik, dua cara memasang lambang mutlak, dan hasilnya berbeda. Bentuk
 * aslinya tetap membayang supaya yang terlihat adalah lipatannya, bukan sekadar
 * gambar akhir.
 *
 * Ini penerapan langsung aturan tahap 6, dan sengaja dibuat seperti itu:
 *   |f(x)|  mutlaknya di LUAR   -> mengerjakan hasilnya, bagian bawah dilipat ke atas
 *   f(|x|)  mutlaknya di DALAM  -> mengerjakan masukannya, bagian kiri diganti
 */

export type Lipatan = 'asli' | 'luar' | 'dalam'

export const URUT_LIPATAN: Lipatan[] = ['asli', 'luar', 'dalam']

export const NAMA_LIPATAN: Record<Lipatan, string> = {
  'asli': 'Tanpa mutlak',
  'luar': 'Mutlak di LUAR',
  'dalam': 'Mutlak di DALAM',
}

export const AKIBAT_LIPATAN: Record<Lipatan, string> = {
  'asli': 'bentuk aslinya, belum diapa-apakan',
  'luar': 'bagian di BAWAH sumbu x dilipat ke atas',
  'dalam': 'bagian KIRI dibuang, diganti salinan cermin bagian kanan',
}

export type DasarMutlak = 'garis' | 'parabola'

export const NAMA_DASAR_MUTLAK: Record<DasarMutlak, string> = {
  'garis': 'f(x) = x - 2',
  'parabola': 'f(x) = 0,5x² - 3',
}

export const FUNGSI_MUTLAK: Record<DasarMutlak, (x: number) => number> = {
  'garis': (x) => x - 2,
  'parabola': (x) => 0.5 * x * x - 3,
}

/** Rumus lengkapnya setelah lambang mutlak dipasang. */
export function rumusLipatan(dasar: DasarMutlak, lipat: Lipatan): string {
  const inti = dasar === 'garis' ? 'x - 2' : '0,5x² - 3'
  if (lipat === 'asli') return `y = ${inti}`
  if (lipat === 'luar') return `y = |${inti}|`
  return dasar === 'garis' ? 'y = |x| - 2' : 'y = 0,5|x|² - 3'
}

export function bangunLipatan(
  dasar: DasarMutlak,
  lipat: Lipatan,
): (x: number) => number {
  const f = FUNGSI_MUTLAK[dasar]
  if (lipat === 'luar') return (x) => Math.abs(f(x))
  if (lipat === 'dalam') return (x) => f(Math.abs(x))
  return f
}

const X_MIN = -6
const X_MAX = 6

/** Titik pembanding yang dipakai di badan materi: x = -1. */
export const X_BANDING = -1

export default function LipatMutlak({
  dasar,
  lipat,
}: {
  dasar: DasarMutlak
  lipat: Lipatan
}) {
  const asli = FUNGSI_MUTLAK[dasar]
  const hasil = bangunLipatan(dasar, lipat)
  const jendela = jendelaTerbatas([asli, hasil], X_MIN, X_MAX)
  const p = keLayar(jendela)

  const yAsli = asli(X_BANDING)
  const yHasil = hasil(X_BANDING)
  const berbeda = Math.abs(yAsli - yHasil) > 1e-9

  // Pada parabola, f(|x|) sama persis dengan f(x), karena |x| dikuadratkan
  // memberi hasil yang sama dengan x dikuadratkan. Grafiknya memang tidak
  // berubah, dan itu kenyataan yang layak ditunjukkan, bukan tombol rusak.
  // Tanpa keterangan ini siswa akan mengira widgetnya mati, dan kekeliruan
  // seperti itu sudah pernah terjadi di proyek ini.
  const menimpa = lipat !== 'asli' && berimpit(asli, hasil, jendela.xMin, jendela.xMax)

  return (
    <Bidang
      jendela={jendela}
      keterangan={rumusLipatan(dasar, lipat)}
      catatan={[
        {
          teks: AKIBAT_LIPATAN[lipat],
          warna: lipat === 'luar' ? WARNA.depan : lipat === 'dalam' ? WARNA.samping : WARNA.redup,
        },
        menimpa
          ? { teks: 'menimpa aslinya: |x| dikuadratkan sama dengan x dikuadratkan', warna: WARNA.sudut }
          : lipat !== 'asli'
            ? { teks: `garis putus-putus = asli ${NAMA_DASAR_MUTLAK[dasar]}` }
            : { teks: 'pilih di mana lambang mutlaknya dipasang' },
      ]}
      aria={`Grafik ${rumusLipatan(dasar, lipat)}. ${AKIBAT_LIPATAN[lipat]}.`}
    >
      {/* ---------- bentuk aslinya, tetap membayang ---------- */}
      {lipat !== 'asli' && (
        <path d={jalurFungsi(asli, jendela)} fill="none" stroke={WARNA.redup}
              strokeWidth={2} opacity={0.45} strokeDasharray="7 5" />
      )}

      {/* ---------- garis lipatannya ---------- */}
      {lipat === 'luar' && (
        <line x1={KOTAK.x0} y1={p.y(0)} x2={KOTAK.x1} y2={p.y(0)}
              stroke={WARNA.depan} strokeWidth={1.6} strokeDasharray="4 3" opacity={0.8} />
      )}
      {lipat === 'dalam' && (
        <line x1={p.x(0)} y1={KOTAK.y0} x2={p.x(0)} y2={KOTAK.y1}
              stroke={WARNA.samping} strokeWidth={1.6} strokeDasharray="4 3" opacity={0.8} />
      )}

      {/* ---------- hasilnya ---------- */}
      <path d={jalurFungsi(hasil, jendela)} fill="none" stroke={WARNA.miring}
            strokeWidth={2.8} strokeLinecap="round" />

      {/* ---------- titik pembanding di x = -1 ---------- */}
      <circle cx={p.x(X_BANDING)} cy={p.y(yHasil)} r={5.5} fill={WARNA.sudut}
              stroke="var(--kartu)" strokeWidth={2} />
      {lipat !== 'asli' && berbeda && (
        <circle cx={p.x(X_BANDING)} cy={p.y(yAsli)} r={4} fill="none"
                stroke={WARNA.redup} strokeWidth={1.6} />
      )}
      <text x={p.x(X_BANDING) + 11} y={p.y(yHasil) - 10} fontSize={11}
            fill={WARNA.sudut} fontFamily={MONO}>
        di x = -1 hasilnya {angka(yHasil, 2)}
      </text>

    </Bidang>
  )
}

/** Betul kalau kedua kurva praktis sama di seluruh bidang yang terlihat. */
function berimpit(
  a: (x: number) => number,
  b: (x: number) => number,
  xMin: number,
  xMax: number,
): boolean {
  for (let i = 0; i <= 60; i++) {
    const x = xMin + ((xMax - xMin) * i) / 60
    const ya = a(x)
    const yb = b(x)
    if (!Number.isFinite(ya) || !Number.isFinite(yb)) continue
    if (Math.abs(ya - yb) > 1e-9) return false
  }
  return true
}
