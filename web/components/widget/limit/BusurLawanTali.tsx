'use client'

import { MONO, VH, VW, WARNA, angka } from '@/components/widget/limit/koordinat'

/**
 * Widget "Busur Lawan Tali", Limit tahap 8.
 *
 * Lingkaran satuan yang SAMA warnanya dengan widget Trigonometri, karena
 * kaitannya itulah yang mau ditunjukkan. Sudutnya dikecilkan, dan panjang
 * busur (yaitu θ dalam radian) dibandingkan dengan panjang ruas sin θ.
 *
 * Di sebelah kanan ada dua batang lurus yang panjangnya sebanding dengan kedua
 * besaran itu. Perbandingan panjang jauh lebih mudah dinilai mata pada dua
 * batang lurus sejajar daripada pada satu busur melengkung dan satu ruas tegak,
 * dan justru perbandingan itulah isi materinya.
 *
 * TATA LETAKNYA DIPISAH TEGAS jadi dua kolom. Versi pertama menaruh kolom
 * tulisan mulai x = 150 sedangkan lingkarannya membentang sampai x = 210,
 * sehingga tulisannya menabrak lingkaran. Cacat itu tertangkap saat memeriksa
 * potret layar, 1 September 2026. Sekarang kolom kanan dimulai setelah
 * lingkarannya benar-benar habis.
 */

export const BATAS_DERAJAT = { min: 1, maks: 80, langkah: 1 }

/* --- kolom kiri: lingkaran --- */
const CX = 100
const CY = 130
const R = 72

/* --- kolom kanan: angka dan batang. Dimulai jauh setelah tepi lingkaran. --- */
const KANAN = 200
const BATANG_MAKS = VW - KANAN - 20

export default function BusurLawanTali({ derajat }: { derajat: number }) {
  const d = Math.min(Math.max(derajat, BATAS_DERAJAT.min), BATAS_DERAJAT.maks)
  const rad = (d * Math.PI) / 180
  const s = Math.sin(rad)
  const c = Math.cos(rad)
  const nisbah = s / rad

  const px = CX + c * R
  const py = CY - s * R

  const busur = `M ${CX + R} ${CY} A ${R} ${R} 0 0 0 ${px} ${py}`

  // busur selalu lebih panjang dari sin untuk sudut lancip, jadi batang busur
  // yang dipakai sebagai patokan panjang penuh
  const panjangSin = BATANG_MAKS * nisbah

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Sudut ${d} derajat, perbandingan sin theta dibagi theta bernilai ${angka(nisbah, 5)}`}>
      {/* ================= kolom kiri: lingkaran satuan ================= */}
      <line x1={CX - R - 12} y1={CY} x2={CX + R + 12} y2={CY} stroke="#D6CDBC" strokeWidth={1.2} />
      <line x1={CX} y1={CY - R - 12} x2={CX} y2={CY + 20} stroke="#D6CDBC" strokeWidth={1.2} />
      <circle cx={CX} cy={CY} r={R} fill="none" stroke={WARNA.redup} strokeWidth={1.5} opacity={0.45} />

      {/* jari-jari, dan busur yang panjangnya sama dengan θ */}
      <line x1={CX} y1={CY} x2={px} y2={py} stroke={WARNA.miring} strokeWidth={1.8} />
      <path d={busur} fill="none" stroke={WARNA.sudut} strokeWidth={4} strokeLinecap="round" />

      {/* ruas sin θ, tegak dari titik ke sumbu mendatar */}
      <line x1={px} y1={CY} x2={px} y2={py} stroke={WARNA.depan} strokeWidth={4} strokeLinecap="round" />
      <circle cx={px} cy={py} r={4} fill={WARNA.miring} stroke="var(--kartu)" strokeWidth={1.6} />

      <text x={CX} y={CY + R + 40} textAnchor="middle" fontSize={10} fill={WARNA.redup} fontFamily={MONO}>
        jari-jari 1, jadi busur = θ
      </text>

      {/* ================= kolom kanan: angka dan batang ================= */}
      <text x={KANAN} y={40} fontSize={12} fill={WARNA.miring} fontFamily={MONO}>
        θ = {angka(d, 0)}° = {angka(rad, 4)} rad
      </text>
      <text x={KANAN} y={68} fontSize={15} fill={WARNA.miring} fontFamily={MONO}>
        sin θ : θ = {angka(nisbah, 6)}
      </text>
      <text x={KANAN} y={90} fontSize={10.5} fill={WARNA.redup} fontFamily={MONO}>
        {d <= 5 ? 'kedua batang nyaris sama panjang' : 'busur masih terlihat lebih panjang'}
      </text>

      <text x={KANAN} y={128} fontSize={11} fill={WARNA.sudut} fontFamily={MONO}>
        panjang busur θ
      </text>
      <rect x={KANAN} y={136} width={BATANG_MAKS} height={9} rx={4.5} fill={WARNA.sudut} />

      <text x={KANAN} y={172} fontSize={11} fill={WARNA.depan} fontFamily={MONO}>
        panjang sin θ
      </text>
      {/* sisa yang belum tertutup digambar samar, supaya selisihnya tetap
          terlihat walaupun sudah sangat tipis */}
      <rect x={KANAN} y={180} width={BATANG_MAKS} height={9} rx={4.5}
            fill={WARNA.depan} opacity={0.16} />
      <rect x={KANAN} y={180} width={Math.max(panjangSin, 0)} height={9} rx={4.5} fill={WARNA.depan} />

      <text x={KANAN} y={224} fontSize={10.5} fill={WARNA.redup} fontFamily={MONO}>
        busur SELALU sedikit lebih
      </text>
      <text x={KANAN} y={240} fontSize={10.5} fill={WARNA.redup} fontFamily={MONO}>
        panjang daripada sin, jadi
      </text>
      <text x={KANAN} y={256} fontSize={10.5} fill={WARNA.redup} fontFamily={MONO}>
        perbandingannya selalu
      </text>
      <text x={KANAN} y={272} fontSize={10.5} fill={WARNA.redup} fontFamily={MONO}>
        sedikit di bawah 1
      </text>
    </svg>
  )
}
