'use client'

import { useSedangDiubah } from '@/components/kendali/sedang-diubah'
import { MONO, VH, VW, WARNA, angka } from '@/components/widget/limit/koordinat'

/**
 * Widget "Garis Mendekati", Limit tahap 2.
 *
 * Dua garis bilangan bertumpuk. Yang atas untuk x, yang bawah untuk f(x).
 * Siswa menggeser x mendekati 3, dan melihat f(x) di bawahnya ikut menyempit
 * ke 10.
 *
 * Sengaja BUKAN grafik biasa. Grafik memperlihatkan hubungan x dan f(x) sebagai
 * satu kurva, sedangkan yang mau ditekankan di tahap ini justru gerakannya:
 * yang satu didorong, yang lain mengikuti. Dua garis bilangan menunjukkan itu
 * lebih jujur daripada satu kurva.
 */

export const C = 3
export const L = 10
export const f = (x: number) => x * x + 1

export const BATAS_X = { min: 2.4, maks: 3.6, langkah: 0.001 }

const X0 = 52
const X1 = VW - 30
const BARIS_X = 96
const BARIS_F = 214

/** Garis atas menampilkan x di sekitar 3, garis bawah f(x) di sekitar 10. */
const petaX = (x: number) => X0 + ((x - 2.4) / (3.6 - 2.4)) * (X1 - X0)
const petaF = (v: number) => X0 + ((v - 6.76) / (13.96 - 6.76)) * (X1 - X0)

const TANDA_X = [2.4, 2.6, 2.8, 3.0, 3.2, 3.4, 3.6]
const TANDA_F = [7, 8, 9, 10, 11, 12, 13]

export default function GarisMendekati({ x }: { x: number }) {
  const dipegang = useSedangDiubah()
  const nilai = f(x)
  const tepatDiC = Math.abs(x - C) < 1e-9
  const dariKiri = x < C

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet" role="img"
         aria-label={`x bernilai ${angka(x, 3)} dan f(x) bernilai ${angka(nilai, 3)}, keduanya mendekati 3 dan 10`}>
      {/* ---------------- garis bilangan x ---------------- */}
      <text x={X0 - 8} y={BARIS_X + 4} textAnchor="end" fontSize={12} fill={WARNA.miring} fontFamily={MONO}>x</text>
      <line x1={X0} y1={BARIS_X} x2={X1} y2={BARIS_X} stroke={WARNA.redup} strokeWidth={1.6} />
      {TANDA_X.map((t) => (
        <g key={`x${t}`}>
          <line x1={petaX(t)} y1={BARIS_X - 5} x2={petaX(t)} y2={BARIS_X + 5}
                stroke={WARNA.redup} strokeWidth={1.2} />
          <text x={petaX(t)} y={BARIS_X + 19} textAnchor="middle" fontSize={9.5}
                fill={WARNA.redup} fontFamily={MONO}>{angka(t, 1)}</text>
        </g>
      ))}
      {/* titik tujuan c, digambar BOLONG karena x tidak pernah diletakkan di situ */}
      <circle cx={petaX(C)} cy={BARIS_X} r={6.5} fill="var(--kartu)" stroke={WARNA.sudut} strokeWidth={2.2} />
      <text x={petaX(C)} y={BARIS_X - 14} textAnchor="middle" fontSize={11} fill={WARNA.sudut} fontFamily={MONO}>c = 3</text>
      {/* posisi x sekarang */}
      <circle className={dipegang === 'x' ? 'nyala' : undefined} cx={petaX(x)} cy={BARIS_X} r={dipegang === 'x' ? 7 : 5.5} fill={tepatDiC ? 'var(--kartu)' : WARNA.depan}
              stroke={tepatDiC ? WARNA.depan : 'var(--kartu)'} strokeWidth={2} />

      {/* panah arah datangnya */}
      {!tepatDiC && (
        <path
          d={`M ${petaX(x) + (dariKiri ? -26 : 26)} ${BARIS_X - 26} L ${petaX(x) + (dariKiri ? -6 : 6)} ${BARIS_X - 26}`}
          stroke={WARNA.depan} strokeWidth={1.8} markerEnd="url(#ujung)" fill="none" opacity={0.85}
        />
      )}
      <defs>
        <marker id="ujung" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
          <path d="M0 0 L7 3.5 L0 7 z" fill={WARNA.depan} />
        </marker>
      </defs>

      {/* ---------------- penghubung ---------------- */}
      <line x1={petaX(x)} y1={BARIS_X + 8} x2={petaF(nilai)} y2={BARIS_F - 8}
            stroke={WARNA.sudut} strokeWidth={1.5} strokeDasharray="5 4" opacity={0.85} />
      <text x={(petaX(x) + petaF(nilai)) / 2 + 8} y={(BARIS_X + BARIS_F) / 2 + 4}
            fontSize={10.5} fill={WARNA.redup} fontFamily={MONO}>f(x) = x² + 1</text>

      {/* ---------------- garis bilangan f(x) ---------------- */}
      <text x={X0 - 8} y={BARIS_F + 4} textAnchor="end" fontSize={12} fill={WARNA.miring} fontFamily={MONO}>f(x)</text>
      <line x1={X0} y1={BARIS_F} x2={X1} y2={BARIS_F} stroke={WARNA.redup} strokeWidth={1.6} />
      {TANDA_F.map((t) => (
        <g key={`f${t}`}>
          <line x1={petaF(t)} y1={BARIS_F - 5} x2={petaF(t)} y2={BARIS_F + 5}
                stroke={WARNA.redup} strokeWidth={1.2} />
          <text x={petaF(t)} y={BARIS_F + 19} textAnchor="middle" fontSize={9.5}
                fill={WARNA.redup} fontFamily={MONO}>{t}</text>
        </g>
      ))}
      <circle cx={petaF(L)} cy={BARIS_F} r={6.5} fill="var(--kartu)" stroke={WARNA.sudut} strokeWidth={2.2} />
      <text x={petaF(L)} y={BARIS_F + 34} textAnchor="middle" fontSize={11} fill={WARNA.sudut} fontFamily={MONO}>L = 10</text>
      <circle className={dipegang === 'x' ? 'nyala' : undefined} cx={petaF(nilai)} cy={BARIS_F} r={dipegang === 'x' ? 7 : 5.5} fill={tepatDiC ? 'var(--kartu)' : WARNA.samping}
              stroke={tepatDiC ? WARNA.samping : 'var(--kartu)'} strokeWidth={2} />

      {/* ---------------- angka dan catatan ---------------- */}
      <text x={X0} y={34} fontSize={13} fill={WARNA.miring} fontFamily={MONO}>
        x = {angka(x, 3)}
      </text>
      <text x={X1} y={34} textAnchor="end" fontSize={13} fill={WARNA.miring} fontFamily={MONO}>
        f(x) = {angka(nilai, 4)}
      </text>
      <text x={X0} y={54} fontSize={10.5} fill={tepatDiC ? WARNA.depan : WARNA.redup} fontFamily={MONO}>
        {tepatDiC
          ? 'x diletakkan TEPAT di 3. Limit tidak pernah melakukan ini, ia hanya melihat tetangganya.'
          : `selisih ke c: ${angka(Math.abs(x - C), 3)}   ·   selisih ke L: ${angka(Math.abs(nilai - L), 4)}`}
      </text>
      <text x={X1} y={VH - 8} textAnchor="end" fontSize={9.5} fill={WARNA.redup} fontFamily={MONO}>
        makin dekat x ke 3, makin dekat f(x) ke 10
      </text>
    </svg>
  )
}
