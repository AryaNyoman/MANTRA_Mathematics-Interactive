'use client'

import { petakSumbu } from '@/lib/petak-sumbu'
import { useId, type PointerEvent as ReactPointerEvent, type ReactNode, type Ref } from 'react'
import {
  GARIS_PETAK, GARIS_SUMBU, KOTAK, MAKS_HURUF_CATATAN, MONO, VH, VW, WARNA,
  keLayar, labelSkala, type Jendela,
} from '@/components/widget/integral/koordinat'

/** Satu baris keterangan di pita atas atau bawah. */
export type Catatan = { teks: string; warna?: string }

/**
 * Bingkai koordinat yang dipakai bersama kesepuluh widget Integral.
 *
 * ASAL BERKAS INI sama dengan `koordinat.ts`: disalin dari wilayah sesi Grafik
 * Fungsi karena aturan melarang menyunting wilayah sesi lain.
 *
 * Menggambar petak, kedua sumbu, angka pada sumbu, dan PENUNJUK SKALA di pojok.
 * Penunjuk skala itu wajib menurut aturan proyek: widget yang bisa berubah
 * tampilan harus memberi tahu penggunanya sedang mengintip sedekat apa.
 *
 * Keterangan TIDAK PERNAH digambar di dalam kotak grafik. Ia punya pita sendiri
 * di atas dan di bawah, jadi tabrakan tulisan dengan kurva tidak mungkin
 * terjadi, bukan sekadar diperbaiki satu per satu.
 *
 * `preserveAspectRatio` sengaja `xMidYMid meet`, TIDAK PERNAH `none`. Nilai
 * `none` meregangkan gambarnya mengikuti kotak, sehingga bentuk daerah yang
 * diwarnai tampil salah.
 *
 * `touchAction: 'none'` dipasang di SVG AKAR, bukan di anaknya. WebKit
 * mengabaikannya kalau dipasang di anak, dan akibatnya seretan di HP menggulung
 * halaman alih-alih memindahkan titik.
 *
 * `userSelect: 'none'` menutup lubang yang TIDAK ditutup `touchAction`.
 * Menyeret pegangan dengan tetikus ikut menyeleksi tulisan di dalam SVG, dan
 * angka sumbu berubah menjadi blok biru sepanjang seretan. Ketahuan dari
 * potret widget Materi 06 pada 7 Sep 2026, setelah empat widget terlanjur
 * dibuat dengan cacat yang sama. Karena diperbaiki di sini, keempatnya ikut
 * sembuh sekaligus.
 */
export default function Bidang({
  jendela,
  keterangan,
  catatan,
  catatanKanan,
  catatanBawah,
  aria,
  tandaSkala = true,
  svgRef,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  gaya,
  children,
}: {
  jendela: Jendela
  /** tulisan kecil di kiri atas, misalnya rumus yang sedang digambar */
  keterangan?: string
  /** baris keterangan di pita ATAS, maksimal dua baris */
  catatan?: Catatan[]
  /** keterangan pendek rata kanan di pita atas */
  catatanKanan?: Catatan[]
  /** satu baris keterangan di pita BAWAH, di bawah angka sumbu x */
  catatanBawah?: Catatan
  aria: string
  tandaSkala?: boolean
  svgRef?: Ref<SVGSVGElement>
  onPointerDown?: (e: ReactPointerEvent<SVGSVGElement>) => void
  onPointerMove?: (e: ReactPointerEvent<SVGSVGElement>) => void
  onPointerUp?: (e: ReactPointerEvent<SVGSVGElement>) => void
  /** dipakai widget yang sedang menyeret, supaya kursornya ikut berubah */
  gaya?: React.CSSProperties
  children?: ReactNode
}) {
  // Nama pemotong harus unik per widget yang tampil, kalau tidak dua widget di
  // satu halaman akan memakai pemotong yang sama.
  const idKotak = `kotak-${useId().replace(/:/g, '')}`
  const p = keLayar(jendela)
  const petakX = petakSumbu(jendela.xMin, jendela.xMax, KOTAK.x1 - KOTAK.x0)
  const petakY = petakSumbu(jendela.yMin, jendela.yMax, KOTAK.y1 - KOTAK.y0)

  // Sumbu digambar di dalam bingkai kalau nol memang terlihat. Kalau nol ada di
  // luar jendela, sumbunya ditempel ke tepi supaya angkanya tetap terbaca.
  const sumbuY = jendela.xMin <= 0 && 0 <= jendela.xMax ? p.x(0) : KOTAK.x0
  const sumbuX = jendela.yMin <= 0 && 0 <= jendela.yMax ? p.y(0) : KOTAK.y1

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={aria}
      style={{ touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none', ...gaya }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* ---------- petak ---------- */}
      {petakX.map((t) => (
        <line key={`px${t.nilai}`} x1={p.x(t.nilai)} y1={KOTAK.y0} x2={p.x(t.nilai)} y2={KOTAK.y1}
              stroke={GARIS_PETAK} strokeWidth={1} opacity={0.55} />
      ))}
      {petakY.map((t) => (
        <line key={`py${t.nilai}`} x1={KOTAK.x0} y1={p.y(t.nilai)} x2={KOTAK.x1} y2={p.y(t.nilai)}
              stroke={GARIS_PETAK} strokeWidth={1} opacity={0.55} />
      ))}

      {/* ---------- sumbu ---------- */}
      <line x1={KOTAK.x0} y1={sumbuX} x2={KOTAK.x1} y2={sumbuX} stroke={GARIS_SUMBU} strokeWidth={1.6} />
      <line x1={sumbuY} y1={KOTAK.y0} x2={sumbuY} y2={KOTAK.y1} stroke={GARIS_SUMBU} strokeWidth={1.6} />

      {/* ---------- angka pada sumbu ---------- */}
      {petakX.map((t) => (
        <text key={`tx${t.nilai}`} x={p.x(t.nilai)} y={KOTAK.y1 + 14} textAnchor="middle"
              fontSize={9.5} fill={WARNA.redup} fontFamily={MONO}>{t.label}</text>
      ))}
      {petakY.map((t) => (
        <text key={`ty${t.nilai}`} x={KOTAK.x0 - 6} y={p.y(t.nilai) + 3.4} textAnchor="end"
              fontSize={9.5} fill={WARNA.redup} fontFamily={MONO}>{t.label}</text>
      ))}

      {/* ---------- isi grafiknya ----------
          DIPOTONG TEGAS pada batas kotak, supaya kurva yang menjulang tinggi
          tidak menimpa pita keterangan di atasnya. Aturan proyek melarang widget
          memotong GAMBARNYA sendiri tanpa siswa tahu; kurva yang menjulur ke
          luar layar berbeda, sebab ia memang tidak berujung dan penunjuk skala
          di pojok sudah memberi tahu seberapa lebar bidang yang terlihat. */}
      <defs>
        <clipPath id={idKotak}>
          <rect x={KOTAK.x0} y={KOTAK.y0}
                width={KOTAK.x1 - KOTAK.x0} height={KOTAK.y1 - KOTAK.y0} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${idKotak})`}>{children}</g>

      {/* ---------- PITA ATAS ---------- */}
      {keterangan && (
        <text x={KOTAK.x0} y={15} fontSize={12} fill={WARNA.miring} fontFamily={MONO}>
          {potong(keterangan, MAKS_HURUF_CATATAN)}
        </text>
      )}
      {catatan?.slice(0, 2).map((c, i) => (
        <text key={i} x={KOTAK.x0} y={30 + i * 15} fontSize={10.5}
              fill={c.warna ?? WARNA.redup} fontFamily={MONO}>
          {potong(c.teks, MAKS_HURUF_CATATAN)}
        </text>
      ))}
      {catatanKanan?.slice(0, 2).map((c, i) => (
        <text key={i} x={KOTAK.x1} y={15 + i * 15} textAnchor="end" fontSize={10.5}
              fill={c.warna ?? WARNA.redup} fontFamily={MONO}>
          {potong(c.teks, 30)}
        </text>
      ))}

      {/* ---------- PITA BAWAH: catatan dan penunjuk skala ---------- */}
      {catatanBawah && (
        <text x={KOTAK.x0} y={VH - 8} fontSize={10} fill={catatanBawah.warna ?? WARNA.redup}
              fontFamily={MONO}>
          {potong(catatanBawah.teks, tandaSkala ? 36 : MAKS_HURUF_CATATAN)}
        </text>
      )}
      {tandaSkala && (
        <text x={KOTAK.x1} y={VH - 8} textAnchor="end" fontSize={9.5} fill={WARNA.redup} fontFamily={MONO}>
          {labelSkala(jendela)}
        </text>
      )}
    </svg>
  )
}

/**
 * Pendekkan teks yang melebihi batas, dengan tanda titik tiga. Ini jaring
 * pengaman, bukan izin menulis kalimat panjang: yang dicegah adalah teks yang
 * terpotong di tepi tanpa tanda apa pun, sehingga pembacanya tidak tahu ada
 * bagian yang hilang.
 */
function potong(teks: string, maks: number): string {
  return teks.length <= maks ? teks : `${teks.slice(0, maks - 1).trimEnd()}...`
}
