'use client'

import Bidang from '@/components/widget/limit/Bidang'
import { KOTAK, MONO, WARNA, angka, jalurFungsi, keLayar, type Jendela } from '@/components/widget/limit/koordinat'

/**
 * Widget "Selang Menyusut", Limit tahap 1.
 *
 * Grafik jarak kelapa jatuh, s(t) = 5t². Dua titik pada kurva: satu tetap di
 * detik ke-2, satu lagi di detik 2 + h. Garis yang menghubungkan keduanya
 * adalah kecepatan rata-rata. Saat h dikecilkan, garis potong itu berubah
 * menjadi garis singgung, dan angkanya merapat ke 20.
 *
 * Jendelanya sengaja TETAP, tidak ikut memperbesar saat h mengecil. Justru
 * karena tetap itulah siswa melihat titik keduanya merayap pulang ke titik
 * pertama, dan garisnya berhenti memotong.
 */

/** Panjang selang yang bisa dipilih. Turun tajam supaya bedanya terasa. */
export const LANGKAH_H = [1, 0.5, 0.25, 0.1, 0.05, 0.01, 0.001] as const

export const s = (t: number) => 5 * t * t

/** Kecepatan rata-rata dari detik 2 sampai detik 2 + h. Sama dengan 20 + 5h. */
export const kecepatanRata = (h: number) => (s(2 + h) - s(2)) / h

const JENDELA: Jendela = { xMin: 0, xMax: 3.6, yMin: -7, yMax: 70 }

export default function SelangMenyusut({ indeks }: { indeks: number }) {
  const h = LANGKAH_H[Math.min(Math.max(indeks, 0), LANGKAH_H.length - 1)]
  const p = keLayar(JENDELA)

  const t0 = 2
  const t1 = 2 + h
  const y0 = s(t0)
  const y1 = s(t1)
  const kemiringan = kecepatanRata(h)

  // Garis potongnya dipanjangkan sampai kedua tepi bingkai, supaya terbaca
  // sebagai sebuah GARIS, bukan sebagai ruas pendek antara dua titik.
  const garisY = (x: number) => y0 + kemiringan * (x - t0)

  return (
    <Bidang
      jendela={JENDELA}
      keterangan={`s(t) = 5t²   ·   selang h = ${angka(h, 3)} detik`}
      tandaSkala={false}
      aria={`Grafik jarak kelapa jatuh dengan selang waktu ${angka(h, 3)} detik, kecepatan rata-rata ${angka(kemiringan, 3)} meter per detik`}
    >
      {/* kurva jaraknya */}
      <path d={jalurFungsi(s, JENDELA)} fill="none" stroke={WARNA.miring} strokeWidth={2.4}
            strokeLinejoin="round" />

      {/* garis potong, dipanjangkan ke kedua tepi */}
      <line
        x1={p.x(JENDELA.xMin)} y1={p.y(garisY(JENDELA.xMin))}
        x2={p.x(JENDELA.xMax)} y2={p.y(garisY(JENDELA.xMax))}
        stroke={WARNA.sudut} strokeWidth={2.2} opacity={0.95}
      />

      {/* segitiga bantu: mendatar berapa, menaik berapa */}
      {h > 0.02 && (
        <>
          <line x1={p.x(t0)} y1={p.y(y0)} x2={p.x(t1)} y2={p.y(y0)}
                stroke={WARNA.samping} strokeWidth={2.6} strokeLinecap="round" />
          <line x1={p.x(t1)} y1={p.y(y0)} x2={p.x(t1)} y2={p.y(y1)}
                stroke={WARNA.depan} strokeWidth={2.6} strokeLinecap="round" />
        </>
      )}

      {/* kedua titik */}
      <circle cx={p.x(t0)} cy={p.y(y0)} r={5} fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={2} />
      <circle cx={p.x(t1)} cy={p.y(y1)} r={5} fill={WARNA.depan} stroke="var(--kartu)" strokeWidth={2} />

      {/* angka hasilnya, ditaruh di kanan atas supaya tidak menimpa kurva */}
      <text x={KOTAK.x1} y={KOTAK.y0 - 7} textAnchor="end" fontSize={12.5} fill={WARNA.sudut}
            fontFamily={MONO}>
        kecepatan rata-rata {angka(kemiringan, 3)} m/s
      </text>
      <text x={KOTAK.x1} y={KOTAK.y1 + 26} textAnchor="end" fontSize={9.5} fill={WARNA.redup}
            fontFamily={MONO}>
        {h <= 0.05 ? 'garisnya sudah nyaris menyinggung kurva' : 'garisnya masih memotong kurva di dua titik'}
      </text>
    </Bidang>
  )
}
