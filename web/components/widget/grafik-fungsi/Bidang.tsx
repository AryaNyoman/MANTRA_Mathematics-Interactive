'use client'

import { useId, type PointerEvent as ReactPointerEvent, type ReactNode, type Ref } from 'react'
import {
  GARIS_PETAK, GARIS_SUMBU, KOTAK, MAKS_HURUF_CATATAN, MONO, VH, VW, WARNA,
  keLayar, labelSkala, petak, type Jendela,
} from '@/components/widget/grafik-fungsi/koordinat'

/** Satu baris keterangan di pita atas atau bawah. */
export type Catatan = { teks: string; warna?: string }

/**
 * Bingkai koordinat yang dipakai bersama widget-widget Grafik Fungsi.
 *
 * ASAL BERKAS INI sama dengan `koordinat.ts`: disalin dari wilayah sesi Limit
 * karena aturan melarang menyunting wilayah sesi lain. Alasannya ditulis
 * lengkap di kepala `koordinat.ts`.
 *
 * Menggambar petak, kedua sumbu, angka pada sumbu, dan PENUNJUK SKALA di pojok.
 * Penunjuk skala itu wajib menurut aturan proyek: widget yang bisa berubah
 * tampilan harus memberi tahu penggunanya sedang mengintip sedekat apa, kalau
 * tidak siswa kehilangan rasa ukuran dan mengira grafiknya berubah bentuk.
 *
 * TAMBAHAN untuk topik ini: `svgRef` dan penangan `pointer`, supaya widget yang
 * titiknya bisa DISERET bisa membaca posisi tetikus atau jari. Tanpa itu,
 * widget 5 (menyusun parabola) tidak mungkin dibuat.
 *
 * `preserveAspectRatio` sengaja `xMidYMid meet`, TIDAK PERNAH `none`. Nilai
 * `none` meregangkan gambarnya mengikuti kotak, sehingga sudut dan lingkaran
 * tampil dengan bentuk yang salah. Itu cacat nyata yang pernah terjadi di
 * galeri tahap 10 Trigonometri dan tidak boleh terulang.
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
  /**
   * Baris keterangan di pita ATAS, maksimal dua baris.
   * Ditaruh di luar kotak grafik, jadi tidak mungkin menabrak kurvanya.
   */
  catatan?: Catatan[]
  /** keterangan pendek rata kanan di pita atas, misalnya nilai D atau letak x */
  catatanKanan?: Catatan[]
  /** satu baris keterangan di pita BAWAH, di bawah angka sumbu x */
  catatanBawah?: Catatan
  aria: string
  /** boleh dimatikan untuk widget yang tampilannya tidak pernah berubah skala */
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
  // satu halaman akan memakai pemotong yang sama. `useId` menjamin keunikannya
  // dan memberi nama yang sama di sisi peladen dan peramban, jadi tidak memicu
  // ketidakcocokan hidrasi.
  const idKotak = `kotak-${useId().replace(/:/g, '')}`
  const p = keLayar(jendela)
  const petakX = petak(jendela.xMin, jendela.xMax, 6)
  const petakY = petak(jendela.yMin, jendela.yMax, 5)

  // Sumbu digambar di dalam bingkai kalau nol memang terlihat. Kalau nol ada di
  // luar jendela, sumbunya ditempel ke tepi supaya angkanya tetap terbaca dan
  // tidak melayang di luar gambar.
  const sumbuY = jendela.xMin <= 0 && 0 <= jendela.xMax ? p.x(0) : KOTAK.x0
  const sumbuX = jendela.yMin <= 0 && 0 <= jendela.yMax ? p.y(0) : KOTAK.y1

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={aria}
      style={gaya}
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
          DIPOTONG TEGAS pada batas kotak. Tanpa ini, kurva yang menjulang tinggi
          keluar dari bingkainya dan menimpa pita keterangan di atasnya. Itu
          terjadi sungguhan pada potret pertama tahap 4: kedua lengan parabola
          menyeberangi tulisan rumus dan nilai diskriminannya.
          Aturan proyek berbunyi widget tidak boleh memotong gambarnya sendiri;
          yang dilarang itu adalah gambar yang TERPANGKAS tanpa siswa tahu.
          Kurva yang menjulur ke luar layar berbeda: ia memang tidak berujung,
          dan penunjuk skala di pojok sudah memberi tahu seberapa lebar bidang
          yang sedang terlihat. */}
      <defs>
        <clipPath id={idKotak}>
          <rect x={KOTAK.x0} y={KOTAK.y0}
                width={KOTAK.x1 - KOTAK.x0} height={KOTAK.y1 - KOTAK.y0} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${idKotak})`}>{children}</g>

      {/* ---------- PITA ATAS: rumus dan keterangan ----------
          Semuanya digambar DI ATAS kotak grafik (y kurang dari KOTAK.y0), jadi
          tidak mungkin bertindih dengan kurva, titik, atau garis bantu apa pun.
          Baris yang kepanjangan dipotong dengan tanda titik tiga, karena teks
          yang keluar bingkai jauh lebih buruk daripada teks yang dipendekkan. */}
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
      {/* Kalau penunjuk skala ikut tampil, keduanya berbagi baris yang sama:
          yang satu rata kiri, yang lain rata kanan. Catatan bawah karena itu
          dipendekkan lebih tegas, kalau tidak keduanya bertabrakan di tengah.
          Itu terjadi sungguhan pada potret tahap 11. */}
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
 * Pendekkan teks yang melebihi batas, dengan tanda titik tiga.
 *
 * Ini jaring pengaman, bukan izin menulis kalimat panjang. Kalimatnya tetap
 * harus ditulis pendek sejak awal. Yang dicegah di sini adalah kasus yang sudah
 * benar-benar terjadi pada potret pertama: kalimat keterangan tahap 1 terpotong
 * begitu saja di tepi kanan tanpa tanda apa pun, sehingga pembacanya tidak tahu
 * ada bagian yang hilang.
 */
function potong(teks: string, maks: number): string {
  return teks.length <= maks ? teks : `${teks.slice(0, maks - 1).trimEnd()}...`
}
