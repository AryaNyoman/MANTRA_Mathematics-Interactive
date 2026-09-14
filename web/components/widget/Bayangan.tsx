'use client'

import { WARNA } from '@/lib/warna'

/**
 * Widget "Bayangan", Trigonometri tahap 1.
 *
 * Bukti pertama bahwa sudut yang sama memberi perbandingan yang sama, memakai
 * benda yang bisa dilihat siswa sendiri di halaman rumah: pohon dan dirinya,
 * disinari matahari yang sama.
 *
 * Geser sudut matahari. Kedua bayangan berubah panjang, tapi kedua hasil bagi
 * tinggi-per-bayangan tetap identik. Itu menyiapkan tahap 2 tanpa menyebut
 * satu pun kata "sinus".
 *
 * REVISI ARYA 14 Sep 2026:
 * - Mataharinya IKUT BERGERAK saat sudutnya digeser. Ia duduk pada garis sinar
 *   yang melewati puncak pohon, sejauh jarak tetap dari puncak itu, sehingga
 *   sudut sinar terbaca dari letaknya: rendah di dekat ufuk saat sudutnya
 *   kecil, tinggi di langit saat sudutnya besar. Bingkai dilebarkan ke kanan
 *   (VW 460 menjadi 530) supaya matahari punya tempat pada sudut kecil.
 * - Bayangan digambar sebagai bayangan sungguhan (bentuk gelap tembus pandang
 *   yang rebah di tanah, mengikuti bentuk bendanya), bukan garis biru.
 *   Panjangnya tetap dari kaki benda sampai ujung bayangan, dan angkanya
 *   tetap ditulis di bawah tanah.
 * - Sudut sinar ditandai busur kecil di ujung bayangan pohon, lengkap dengan
 *   angkanya, sebab itulah besaran yang digeser siswa.
 */

const VW = 530
const VH = 300
const TANAH_Y = 250
const M_KE_PX = 11.4              // 1 meter = 11,4 piksel
const X_ORANG = 96                // titik pijak orang
const X_POHON = 424               // titik pijak pohon
const TINGGI_ORANG = 1.6          // meter
const TINGGI_POHON = 10           // meter
const JARAK_MATAHARI = 78         // piksel dari puncak pohon ke pusat matahari

export const BATAS_SUDUT = { min: 25, maks: 70 }

export function hitungBayangan(derajat: number) {
  const tan = Math.tan((derajat * Math.PI) / 180)
  return {
    tan,
    bayanganOrang: TINGGI_ORANG / tan,
    bayanganPohon: TINGGI_POHON / tan,
    tinggiOrang: TINGGI_ORANG,
    tinggiPohon: TINGGI_POHON,
  }
}

const koma = (n: number, d = 2) => n.toFixed(d).replace('.', ',')

/** Titik tempat sinar dari (x, y) dengan arah ke kanan atas menabrak tepi
 *  bingkai, supaya sinar bisa digambar sampai keluar gambar. */
function ujungSinar(x: number, y: number, cos: number, sin: number) {
  const keKanan = (VW - 6 - x) / cos
  const keAtas = (y - 8) / sin
  const d = Math.max(0, Math.min(keKanan, keAtas))
  return { x: x + d * cos, y: y - d * sin }
}

export default function Bayangan({ derajat }: { derajat: number }) {
  const b = hitungBayangan(derajat)
  const rad = (derajat * Math.PI) / 180
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)
  const yOrang = TANAH_Y - TINGGI_ORANG * M_KE_PX
  const yPohon = TANAH_Y - TINGGI_POHON * M_KE_PX
  const bxOrang = X_ORANG - b.bayanganOrang * M_KE_PX
  const bxPohon = X_POHON - b.bayanganPohon * M_KE_PX

  // matahari pada garis sinar pohon, sejauh JARAK_MATAHARI dari puncaknya
  const mx = X_POHON + JARAK_MATAHARI * cos
  const my = yPohon - JARAK_MATAHARI * sin
  // sinar orang diteruskan sejajar sampai tepi bingkai (matahari sangat jauh,
  // sinarnya sejajar; yang lewat pohon kebetulan menyentuh gambar matahari)
  const sinarOrang = ujungSinar(X_ORANG, yOrang, cos, sin)

  // busur sudut sinar di ujung bayangan pohon
  const rBusur = 26
  const busurX = bxPohon + rBusur * cos
  const busurY = TANAH_Y - rBusur * sin

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`Pohon dan orang disinari matahari dengan sudut ${derajat} derajat`}>
      {/* tanah */}
      <line x1={0} y1={TANAH_Y} x2={VW} y2={TANAH_Y} stroke="#C9BFAE" strokeWidth={2} />

      {/* bayangan: bentuk gelap tembus pandang yang rebah di tanah, dari kaki
          benda sampai ujung bayangan; ujungnya mengikuti bentuk benda (rimbun
          pohon, kepala orang) */}
      <g fill="rgba(16, 26, 43, 0.30)">
        <polygon points={`${X_POHON},${TANAH_Y - 2} ${X_POHON},${TANAH_Y + 3} ${bxPohon + 22},${TANAH_Y + 3} ${bxPohon + 22},${TANAH_Y - 2}`} />
        <ellipse cx={bxPohon + 20} cy={TANAH_Y} rx={22} ry={6} />
        <polygon points={`${X_ORANG},${TANAH_Y - 1.5} ${X_ORANG},${TANAH_Y + 2} ${bxOrang + 5},${TANAH_Y + 2} ${bxOrang + 5},${TANAH_Y - 1.5}`} />
        <ellipse cx={bxOrang + 5} cy={TANAH_Y} rx={5.5} ry={2.6} />
      </g>

      {/* sinar matahari: melewati puncak benda, berhenti di ujung bayangan */}
      <line x1={mx} y1={my} x2={bxPohon} y2={TANAH_Y}
            stroke={WARNA.sudut} strokeWidth={1.6} strokeDasharray="5 4" opacity={0.85} />
      <line x1={sinarOrang.x} y1={sinarOrang.y} x2={bxOrang} y2={TANAH_Y}
            stroke={WARNA.sudut} strokeWidth={1.6} strokeDasharray="5 4" opacity={0.85} />

      {/* busur sudut sinar di ujung bayangan pohon */}
      <path d={`M ${bxPohon + rBusur} ${TANAH_Y} A ${rBusur} ${rBusur} 0 0 0 ${busurX} ${busurY}`}
            fill="none" stroke={WARNA.sudut} strokeWidth={2} />
      <text x={bxPohon - 6} y={TANAH_Y - 14} textAnchor="end" fontSize={13} fill={WARNA.sudut}
            fontFamily="var(--font-sans), sans-serif">{derajat}°</text>

      {/* matahari, ikut bergerak mengikuti sudut sinar */}
      <circle cx={mx} cy={my} r={13} fill={WARNA.sudut} opacity={0.9} />
      {[...Array(8)].map((_, i) => {
        const a = (i * Math.PI) / 4
        return (
          <line key={i}
            x1={mx + Math.cos(a) * 18} y1={my + Math.sin(a) * 18}
            x2={mx + Math.cos(a) * 24} y2={my + Math.sin(a) * 24}
            stroke={WARNA.sudut} strokeWidth={2} opacity={0.7} />
        )
      })}

      {/* pohon: batang + rimbun */}
      <line x1={X_POHON} y1={TANAH_Y} x2={X_POHON} y2={yPohon}
            stroke={WARNA.depan} strokeWidth={5} strokeLinecap="round" />
      <circle cx={X_POHON} cy={yPohon - 4} r={20} fill="#7FA07A" opacity={0.85} />
      <circle cx={X_POHON - 13} cy={yPohon + 9} r={13} fill="#7FA07A" opacity={0.7} />
      <circle cx={X_POHON + 13} cy={yPohon + 9} r={13} fill="#7FA07A" opacity={0.7} />

      {/* orang */}
      <line x1={X_ORANG} y1={TANAH_Y} x2={X_ORANG} y2={yOrang}
            stroke={WARNA.depan} strokeWidth={5} strokeLinecap="round" />
      <circle cx={X_ORANG} cy={yOrang - 4} r={5} fill={WARNA.depan} />

      {/* keterangan */}
      <text x={X_POHON - 8} y={(yPohon + TANAH_Y) / 2 + 5} textAnchor="end" fontSize={14} fill={WARNA.depan}
            fontFamily="var(--font-sans), sans-serif">{TINGGI_POHON} m</text>
      <text x={(bxPohon + X_POHON) / 2} y={TANAH_Y + 20} textAnchor="middle" fontSize={14}
            fill={WARNA.samping} fontFamily="var(--font-sans), sans-serif">
        bayangan {koma(b.bayanganPohon, 1)} m
      </text>
      <text x={X_ORANG + 10} y={yOrang + 4} fontSize={14} fill={WARNA.depan}
            fontFamily="var(--font-sans), sans-serif">{koma(TINGGI_ORANG, 1)} m</text>
      <text x={(bxOrang + X_ORANG) / 2} y={TANAH_Y + 20} textAnchor="middle" fontSize={14}
            fill={WARNA.samping} fontFamily="var(--font-sans), sans-serif">
        {koma(b.bayanganOrang, 2)} m
      </text>

      {/* dua hasil bagi, ditempel di masing-masing benda */}
      <text x={X_POHON} y={TANAH_Y + 42} textAnchor="end" fontSize={15} fill={WARNA.sudut}
            fontFamily="var(--font-mono), sans-serif">
        {TINGGI_POHON} ÷ {koma(b.bayanganPohon, 1)} = {koma(b.tan)}
      </text>
      <text x={X_ORANG - 40} y={TANAH_Y + 42} fontSize={15} fill={WARNA.sudut}
            fontFamily="var(--font-mono), sans-serif">
        {koma(TINGGI_ORANG, 1)} ÷ {koma(b.bayanganOrang, 2)} = {koma(b.tan)}
      </text>
    </svg>
  )
}
