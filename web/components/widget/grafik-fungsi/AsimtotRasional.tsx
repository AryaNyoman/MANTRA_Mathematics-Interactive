'use client'

import Bidang from '@/components/widget/grafik-fungsi/Bidang'
import {
  KOTAK, MONO, WARNA, angka, jalurFungsi, jendelaTetap, keLayar,
} from '@/components/widget/grafik-fungsi/koordinat'

/**
 * Widget "Asimtot Rasional", tahap 10.
 *
 * Menggeser grafik 1 dibagi x dengan dua penggeser, dan kedua garis asimtotnya
 * ikut berpindah. Ini penerapan langsung aturan tahap 6, jadi tidak ada bentuk
 * baru yang perlu dihafal.
 *
 * KURVANYA DIPUTUS DI ASIMTOT, BUKAN DISAMBUNG
 * Kalau titik-titiknya disambung menyeberangi asimtot, layar akan menampilkan
 * garis miring raksasa yang sebenarnya tidak ada, dan siswa akan menyimpulkan
 * bahwa grafiknya memang menyentuh asimtot di suatu tempat. Itu justru
 * kebalikan dari yang sedang diajarkan. Pemutusan jalurnya dikerjakan
 * `jalurFungsi` di koordinat.ts.
 *
 * Jendelanya sengaja DIPATOK, bukan mengikuti kurvanya. Kalau jendelanya ikut
 * bergeser, grafiknya akan terlihat diam di tempat sementara angkanya berubah,
 * dan seluruh gunanya widget ini hilang.
 */

export const BATAS_GESER_X = { min: -4, maks: 4, langkah: 0.5 }
export const BATAS_GESER_Y = { min: -4, maks: 4, langkah: 0.5 }

const JENDELA = jendelaTetap(-8, 8, -7, 7)

/** Rumus yang sedang digambar, ditulis rapi mengikuti tanda gesernya. */
export function rumusRasional(h: number, k: number): string {
  const dalam = h === 0 ? 'x' : `x ${h > 0 ? '-' : '+'} ${angka(Math.abs(h), 1)}`
  const ekor = k === 0 ? '' : ` ${k > 0 ? '+' : '-'} ${angka(Math.abs(k), 1)}`
  return `y = 1 : (${dalam})${ekor}`
}

/** Nilai di beberapa x yang makin dekat ke asimtot tegak, untuk tabel kanan. */
export function tabelDekatAsimtot(h: number, k: number) {
  const jarak = [1, 0.5, 0.1, 0.01, 0.001]
  return jarak.map((d) => ({
    jarak: d,
    x: h + d,
    y: 1 / d + k,
  }))
}

/** Nilai di beberapa x yang makin jauh, memperlihatkan asimtot datarnya. */
export function tabelJauh(h: number, k: number) {
  const jauh = [10, 100, 1000, 1000000]
  return jauh.map((x) => ({ x, y: 1 / (x - h) + k }))
}

export default function AsimtotRasional({
  h,
  k,
}: {
  h: number
  k: number
}) {
  const p = keLayar(JENDELA)
  const f = (x: number) => 1 / (x - h) + k

  return (
    <Bidang
      jendela={JENDELA}
      keterangan={rumusRasional(h, k)}
      catatan={[
        { teks: `penyebut nol di x = ${angka(h, 1)}, di situ tidak ada nilainya`, warna: WARNA.depan },
        { teks: `x makin besar, y merapat ke ${angka(k, 1)}`, warna: WARNA.samping },
      ]}
      catatanBawah={{ teks: 'kurvanya DIPUTUS di asimtot, bukan disambung' }}
      aria={`Grafik ${rumusRasional(h, k)}. Asimtot tegaknya x sama dengan ${angka(h, 1)}, asimtot datarnya y sama dengan ${angka(k, 1)}.`}
      tandaSkala={false}
    >
      {/* ---------- kedua asimtot ---------- */}
      <line x1={p.x(h)} y1={KOTAK.y0} x2={p.x(h)} y2={KOTAK.y1}
            stroke={WARNA.depan} strokeWidth={1.6} strokeDasharray="6 5" opacity={0.85} />
      <line x1={KOTAK.x0} y1={p.y(k)} x2={KOTAK.x1} y2={p.y(k)}
            stroke={WARNA.samping} strokeWidth={1.6} strokeDasharray="6 5" opacity={0.85} />

      <text x={p.x(h) + 7} y={KOTAK.y0 + 14} fontSize={11} fill={WARNA.depan} fontFamily={MONO}>
        x = {angka(h, 1)}
      </text>
      <text x={KOTAK.x1 - 4} y={p.y(k) - 7} textAnchor="end" fontSize={11}
            fill={WARNA.samping} fontFamily={MONO}>
        y = {angka(k, 1)}
      </text>

      {/* ---------- kurvanya, terputus di asimtot tegak ---------- */}
      <path d={jalurFungsi(f, JENDELA, 900)} fill="none" stroke={WARNA.miring}
            strokeWidth={2.8} strokeLinecap="round" />

    </Bidang>
  )
}
