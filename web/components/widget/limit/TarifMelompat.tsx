'use client'

import { useSedangDiubah } from '@/components/kendali/sedang-diubah'
import Bidang from '@/components/widget/limit/Bidang'
import { KOTAK, MONO, WARNA, angka, keLayar, type Jendela } from '@/components/widget/limit/koordinat'

/**
 * Widget "Tarif Melompat", Limit tahap 3.
 *
 * Grafik tarif parkir yang melompat tepat pada jam kedua. Dua penunjuk merayap
 * ke titik tujuan, satu dari kiri dan satu dari kanan, dan angkanya ditampilkan
 * berdampingan.
 *
 * Titik tujuannya bisa digeser. Itu penting: kalau tujuannya dipindah ke tempat
 * yang tidak ada lompatannya, kedua angka langsung sama. Jadi siswa melihat
 * sendiri bahwa "limit tidak ada" itu sifat TITIKNYA, bukan sifat fungsinya.
 */

/** Tarif parkir, dalam ribuan rupiah. Lompat tepat setelah jam kedua. */
export const LOMPATAN = 2
export const tarif = (jam: number) => (jam <= LOMPATAN ? 3 : 8)

export const BATAS_C = { min: 0.6, maks: 3.4, langkah: 0.1 }
export const BATAS_JARAK = { min: 0.02, maks: 0.8, langkah: 0.02 }

const JENDELA: Jendela = { xMin: 0, xMax: 4, yMin: 0, yMax: 10 }

export default function TarifMelompat({ c, jarak }: { c: number; jarak: number }) {
  const dipegang = useSedangDiubah()
  const p = keLayar(JENDELA)

  const xKiri = c - jarak
  const xKanan = c + jarak
  const yKiri = tarif(xKiri)
  const yKanan = tarif(xKanan)
  const sepakat = yKiri === yKanan

  return (
    <Bidang
      jendela={JENDELA}
      keterangan={`tarif parkir, dalam ribuan rupiah   ·   tujuan c = ${angka(c, 1)} jam`}
      tandaSkala={false}
      aria={`Grafik tarif parkir. Dari kiri menuju ${yKiri} ribu, dari kanan menuju ${yKanan} ribu`}
    >
      {/* dua potongan tarif, digambar terpisah karena memang terputus */}
      <line x1={p.x(0)} y1={p.y(3)} x2={p.x(LOMPATAN)} y2={p.y(3)}
            stroke={WARNA.miring} strokeWidth={3} strokeLinecap="round" />
      <line x1={p.x(LOMPATAN)} y1={p.y(8)} x2={p.x(4)} y2={p.y(8)}
            stroke={WARNA.miring} strokeWidth={3} strokeLinecap="round" />

      {/* di jam kedua tarifnya BERNILAI 3, jadi titik penuh di bawah dan bolong di atas */}
      <circle cx={p.x(LOMPATAN)} cy={p.y(3)} r={5} fill={WARNA.miring} />
      <circle cx={p.x(LOMPATAN)} cy={p.y(8)} r={5} fill="var(--kartu)" stroke={WARNA.miring} strokeWidth={2.2} />

      {/* garis putus-putus penanda letak lompatannya */}
      <line x1={p.x(LOMPATAN)} y1={p.y(3)} x2={p.x(LOMPATAN)} y2={p.y(8)}
            stroke={WARNA.redup} strokeWidth={1.4} strokeDasharray="4 4" opacity={0.7} />

      {/* titik tujuan */}
      <line className={dipegang === 'c' ? 'nyala' : undefined} x1={p.x(c)} y1={KOTAK.y0} x2={p.x(c)} y2={KOTAK.y1}
            stroke={WARNA.sudut} strokeWidth={1.4} strokeDasharray="6 5" opacity={0.8} />
      <text x={p.x(c)} y={KOTAK.y0 + 11} textAnchor="middle" fontSize={10.5}
            fill={WARNA.sudut} fontFamily={MONO}>c</text>

      {/* penunjuk kiri */}
      <line x1={p.x(xKiri)} y1={p.y(yKiri)} x2={p.x(xKiri)} y2={KOTAK.y1}
            stroke={WARNA.samping} strokeWidth={1.4} opacity={0.6} />
      <circle className={dipegang === 'c' || dipegang === 'jarak' ? 'nyala' : undefined} cx={p.x(xKiri)} cy={p.y(yKiri)} r={dipegang === 'c' || dipegang === 'jarak' ? 7 : 5.5} fill={WARNA.samping}
              stroke="var(--kartu)" strokeWidth={2} />

      {/* penunjuk kanan */}
      <line x1={p.x(xKanan)} y1={p.y(yKanan)} x2={p.x(xKanan)} y2={KOTAK.y1}
            stroke={WARNA.depan} strokeWidth={1.4} opacity={0.6} />
      <circle className={dipegang === 'c' || dipegang === 'jarak' ? 'nyala' : undefined} cx={p.x(xKanan)} cy={p.y(yKanan)} r={dipegang === 'c' || dipegang === 'jarak' ? 7 : 5.5} fill={WARNA.depan}
              stroke="var(--kartu)" strokeWidth={2} />

      {/* angka kedua sisi */}
      <text x={KOTAK.x0 + 4} y={KOTAK.y0 + 30} fontSize={12} fill={WARNA.samping} fontFamily={MONO}>
        dari kiri  {angka(yKiri, 0)} ribu
      </text>
      <text x={KOTAK.x0 + 4} y={KOTAK.y0 + 48} fontSize={12} fill={WARNA.depan} fontFamily={MONO}>
        dari kanan {angka(yKanan, 0)} ribu
      </text>

      <text x={KOTAK.x1} y={KOTAK.y1 + 26} textAnchor="end" fontSize={11}
            fill={sepakat ? WARNA.sudut : WARNA.depan} fontFamily={MONO}>
        {sepakat
          ? `kedua sisi sepakat, limitnya ${angka(yKiri, 0)} ribu`
          : 'kedua sisi berbeda, limitnya TIDAK ADA'}
      </text>
    </Bidang>
  )
}
