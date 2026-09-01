'use client'

import Bidang from '@/components/widget/grafik-fungsi/Bidang'
import { WARNA, jalurFungsi } from '@/components/widget/grafik-fungsi/koordinat'
import {
  AKIBAT_LANGKAH, DI_DALAM_KURUNG, FUNGSI_DASAR, RUMUS_DASAR,
  bangunFungsi, jendelaTerbatas, tulisFungsi,
  type Dasar, type Langkah,
} from '@/components/widget/grafik-fungsi/transformasi'

/**
 * Widget "Papan Transformasi", tahap 6. Poros seluruh topik.
 *
 * Siswa memilih satu fungsi dasar, lalu menekan tombol transformasi satu per
 * satu. Bentuk aslinya tertinggal sebagai bayangan, dan rumusnya ikut tersusun
 * mengikuti urutan tombol yang ditekan.
 *
 * Gambar dan tulisan rumusnya dibangun oleh mekanisme yang sama di
 * `transformasi.ts`, jadi keduanya tidak mungkin menyebut arah yang berbeda.
 * Itu bukan kerapian belaka: widget yang grafiknya bergeser ke kanan sementara
 * rumusnya berbunyi geser kiri akan mengajarkan hal yang salah dengan sangat
 * meyakinkan.
 */

export const BATAS_LANGKAH = 5

const X_MIN = -6.5
const X_MAX = 6.5

export default function PapanTransformasi({
  dasar,
  langkah,
}: {
  dasar: Dasar
  langkah: Langkah[]
}) {
  const asli = FUNGSI_DASAR[dasar]
  const hasil = bangunFungsi(dasar, langkah)
  const jendela = jendelaTerbatas([asli, hasil], X_MIN, X_MAX)

  const terakhir = langkah[langkah.length - 1]
  const sama = langkah.length > 0 && sepertiSemula(asli, hasil, jendela.xMin, jendela.xMax)

  return (
    <Bidang
      jendela={jendela}
      keterangan={tulisFungsi(langkah)}
      catatan={[
        {
          teks: terakhir
            ? `${DI_DALAM_KURUNG[terakhir] ? 'DI DALAM kurung' : 'DI LUAR kurung'}: ${AKIBAT_LANGKAH[terakhir]}`
            : 'belum ada transformasi. Tekan salah satu tombol di bawah',
          warna: terakhir ? (DI_DALAM_KURUNG[terakhir] ? WARNA.samping : WARNA.depan) : WARNA.redup,
        },
        sama
          ? { teks: 'hasilnya menimpa aslinya: grafiknya memang simetris', warna: WARNA.sudut }
          : { teks: `garis putus-putus = bentuk asli ${RUMUS_DASAR[dasar]}` },
      ]}
      catatanKanan={[{ teks: `${langkah.length} / ${BATAS_LANGKAH} langkah` }]}
      aria={`Papan transformasi. Fungsi dasarnya ${RUMUS_DASAR[dasar]}, sudah dikenai ${langkah.length} transformasi. Rumusnya sekarang ${tulisFungsi(langkah)}.`}
    >
      {/* ---------- bentuk asli sebagai bayangan ---------- */}
      <path d={jalurFungsi(asli, jendela)} fill="none" stroke={WARNA.redup}
            strokeWidth={2} opacity={0.45} strokeDasharray="7 5" />

      {/* ---------- hasil transformasinya ---------- */}
      <path d={jalurFungsi(hasil, jendela)} fill="none" stroke={WARNA.miring}
            strokeWidth={2.8} strokeLinecap="round" />

    </Bidang>
  )
}

/** Betul kalau kedua kurva praktis berimpit di seluruh bidang yang terlihat. */
function sepertiSemula(
  a: (x: number) => number,
  b: (x: number) => number,
  xMin: number,
  xMax: number,
): boolean {
  for (let i = 0; i <= 60; i++) {
    const x = xMin + ((xMax - xMin) * i) / 60
    const ya = a(x)
    const yb = b(x)
    const kosongA = !Number.isFinite(ya)
    const kosongB = !Number.isFinite(yb)
    if (kosongA !== kosongB) return false
    if (kosongA) continue
    if (Math.abs(ya - yb) > 1e-9) return false
  }
  return true
}
