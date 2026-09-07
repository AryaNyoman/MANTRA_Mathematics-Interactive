'use client'

import { useSedangDiubah } from '@/components/kendali/sedang-diubah'
import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import Bidang from '@/components/widget/grafik-fungsi/Bidang'
import {
  KOTAK, MONO, WARNA, jalurFungsi, jendelaMuat, keLayar, type Jendela,
} from '@/components/widget/grafik-fungsi/koordinat'
import {
  keUmum, lewatPuncakDanTitik, nilaiPuncak, tulisFaktor, tulisPuncak, tulisTitik, tulisUmum,
} from '@/components/widget/grafik-fungsi/fungsi'
import {
  batasi, bulatkanKe, posisiDiGambar, posisiMatematika, titikTersentuh, type TitikXY,
} from '@/components/widget/grafik-fungsi/seret'

/**
 * Widget "Susun Parabola", tahap 5.
 *
 * Membalik arah seluruh topik: siswa menentukan GAMBARNYA dengan menyeret dua
 * titik, dan rumusnya yang mengikuti. Ketiga bentuk ditulis serentak, sehingga
 * terlihat bahwa satu parabola memang punya tiga cara penulisan yang semuanya
 * benar.
 *
 * KENAPA DISERET
 * Aturan proyek: widget sebisanya bisa ditarik langsung, bukan cuma lewat
 * penggeser. Di sini menyeret bukan sekadar lebih enak, melainkan inti
 * pelajarannya: tangan yang memindahkan titik dan mata yang membaca rumus
 * berubah harus bekerja bersamaan.
 *
 * KENAPA DIBULATKAN KE 0,5
 * Tanpa pembulatan, rumusnya berbunyi seperti y = 0,7318(x - 2,0413)² + 3,9927,
 * dan tidak ada yang bisa dipelajari dari deretan angka itu. Dengan langkah
 * 0,5, rumusnya tetap terbaca sementara titiknya tetap terasa bebas digeser.
 */

export const LANGKAH_SERET = 0.5
export const BATAS_X = { min: -6, maks: 6 }
export const BATAS_Y = { min: -8, maks: 8 }


export type PosisiSusun = { puncak: TitikXY; titik: TitikXY }

export const AWAL: PosisiSusun = {
  puncak: { x: 2, y: 8 },
  titik: { x: 0, y: 4 },
}

/**
 * Parabola yang terbentuk, atau null kalau kedua titiknya segaris tegak.
 *
 * Kalau absis keduanya sama, tidak ada satu pun parabola yang lewat keduanya
 * dengan puncak di situ, jadi menolak adalah jawaban yang benar. Menampilkan
 * rumus apa pun di keadaan itu justru membohongi siswa.
 */
export function parabolaDari(pos: PosisiSusun) {
  return lewatPuncakDanTitik(pos.puncak.x, pos.puncak.y, pos.titik.x, pos.titik.y)
}

/* Jendela TETAP sebesar kotak batas seret (keputusan ARYA 5 Sep 2026).
   Sebelumnya jendela mengikuti parabolanya, jadi tiap kali puncak ditarik
   seluruh gambar ikut melar dan seretannya terasa licin. Parabola yang
   lengannya keluar kotak cukup terpotong; kedua titik yang diseret selalu
   di dalam. */
const JENDELA_TETAP: Jendela = jendelaMuat(
  [[BATAS_X.min, BATAS_Y.min], [BATAS_X.maks, BATAS_Y.maks]], 0.06,
)

export default function SusunParabola({
  pos,
  onGeser,
}: {
  pos: PosisiSusun
  onGeser: (pos: PosisiSusun) => void
}) {
  const dipegang = useSedangDiubah()
  const [pegang, setPegang] = useState<number>(-1)
  const jendela = JENDELA_TETAP
  const p = keLayar(jendela)
  const par = parabolaDari(pos)
  const umum = par ? keUmum(par) : null

  const layarPuncak = { x: p.x(pos.puncak.x), y: p.y(pos.puncak.y) }
  const layarTitik = { x: p.x(pos.titik.x), y: p.y(pos.titik.y) }

  function mulai(e: ReactPointerEvent<SVGSVGElement>) {
    const g = posisiDiGambar(e)
    if (!g) return
    const mana = titikTersentuh(g, [layarPuncak, layarTitik], 18)
    if (mana < 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setPegang(mana)
  }

  function gerak(e: ReactPointerEvent<SVGSVGElement>) {
    if (pegang < 0) return
    const m = posisiMatematika(e, jendela)
    if (!m) return
    const baru: TitikXY = {
      x: batasi(bulatkanKe(m.x, LANGKAH_SERET), BATAS_X.min, BATAS_X.maks),
      y: batasi(bulatkanKe(m.y, LANGKAH_SERET), BATAS_Y.min, BATAS_Y.maks),
    }
    onGeser(pegang === 0 ? { ...pos, puncak: baru } : { ...pos, titik: baru })
  }

  return (
    <Bidang
      jendela={jendela}
      keterangan={par ? tulisPuncak(par) : 'kedua titik segaris tegak: tidak ada parabolanya'}
      catatan={
        par
          ? umum && tulisFaktor(umum) === null
            ? [{ teks: 'tidak memotong sumbu x, jadi bentuk faktornya tidak ada' }]
            : [{ teks: 'seret kedua titik berwarna, angkanya berhenti tiap 0,5' }]
          : [{
              teks: 'titik kedua tepat di atas puncak: tidak ada yang memenuhi',
              warna: WARNA.depan,
            }]
      }
      aria={`Menyusun parabola. Puncak di ${tulisTitik(pos.puncak.x, pos.puncak.y, 1)}, titik kedua di ${tulisTitik(pos.titik.x, pos.titik.y, 1)}.`}
      gaya={{ cursor: pegang >= 0 ? 'grabbing' : 'grab', touchAction: 'none' }}
      onPointerDown={mulai}
      onPointerMove={gerak}
      onPointerUp={() => setPegang(-1)}
    >
      {par && (
        <>
          {/* sumbu simetri */}
          <line x1={p.x(par.h)} y1={KOTAK.y0} x2={p.x(par.h)} y2={KOTAK.y1}
                stroke={WARNA.sudut} strokeWidth={1.2} strokeDasharray="5 4" opacity={0.6} />
          {/* parabolanya */}
          <path d={jalurFungsi((x) => nilaiPuncak(par, x), jendela)}
                fill="none" stroke={WARNA.miring} strokeWidth={2.8} strokeLinecap="round" />
        </>
      )}

      {/* ---------- titik puncak, bisa diseret ---------- */}
      <circle cx={layarPuncak.x} cy={layarPuncak.y} r={18} fill="transparent" />
      <circle className={dipegang === 'puncak' ? 'nyala' : undefined} cx={layarPuncak.x} cy={layarPuncak.y} r={pegang === 0 || dipegang === 'puncak' ? 9 : 7.5}
              fill={WARNA.sudut} stroke="var(--kartu)" strokeWidth={2.4} />
      <text x={layarPuncak.x + 13} y={layarPuncak.y - 11} fontSize={11} fill={WARNA.sudut} fontFamily={MONO}>
        puncak {tulisTitik(pos.puncak.x, pos.puncak.y, 1)}
      </text>

      {/* ---------- titik kedua, bisa diseret ---------- */}
      <circle cx={layarTitik.x} cy={layarTitik.y} r={18} fill="transparent" />
      <circle className={dipegang === 'titik' ? 'nyala' : undefined} cx={layarTitik.x} cy={layarTitik.y} r={pegang === 1 || dipegang === 'titik' ? 9 : 7.5}
              fill={WARNA.depan} stroke="var(--kartu)" strokeWidth={2.4} />
      <text x={layarTitik.x + 13} y={layarTitik.y + 18} fontSize={11} fill={WARNA.depan} fontFamily={MONO}>
        lewat {tulisTitik(pos.titik.x, pos.titik.y, 1)}
      </text>

    </Bidang>
  )
}

/** Ketiga bentuk rumusnya, disiapkan untuk tabel di kolom kanan. */
export function tigaBentuk(pos: PosisiSusun): Array<{ nama: string; rumus: string }> {
  const par = parabolaDari(pos)
  if (!par) {
    return [{ nama: 'tidak ada', rumus: 'kedua titik segaris tegak' }]
  }
  const umum = keUmum(par)
  return [
    { nama: 'bentuk puncak', rumus: tulisPuncak(par) },
    { nama: 'bentuk umum', rumus: tulisUmum(umum) },
    { nama: 'bentuk faktor', rumus: tulisFaktor(umum) ?? 'tidak ada, grafiknya tidak memotong sumbu x' },
  ]
}
