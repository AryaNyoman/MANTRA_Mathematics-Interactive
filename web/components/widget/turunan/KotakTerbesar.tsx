'use client'

import { useState, type PointerEvent as ReactPointerEvent } from 'react'
import Bidang from '@/components/widget/turunan/Bidang'
import {
  MONO, WARNA, angka, jalurFungsi, jalurGaris, jendelaTetap, keLayar, type Jendela,
} from '@/components/widget/turunan/koordinat'
import { batasi, bulatkanKe, posisiDiGambar, posisiMatematika } from '@/components/widget/turunan/seret'
import { useSedangDiubah } from '@/components/kendali/sedang-diubah'

/**
 * Widget "Kotak terbesar", Materi 11.
 *
 * Papan atas: selembar karton 18 cm dilihat dari atas, dengan empat pojok
 * terpotong sebesar x. Papan bawah: grafik isinya, V(x) = x(18 - 2x)², dengan
 * garis singgung yang ikut bergerak.
 *
 * KENAPA KARTONNYA DIGAMBAR DATAR, BUKAN SEBAGAI KOTAK MIRING
 * Yang harus terbaca adalah panjang alasnya, yaitu 18 - 2x, dan itu hanya
 * terlihat apa adanya kalau kartonnya dilihat lurus dari atas. Gambar kotak
 * miring membuat sisi yang sama panjang tampak berbeda panjang, dan siswa yang
 * mengukur dengan mata akan mendapat angka yang salah. Aturan proyek untuk
 * video menyebut hal yang sama: kamera miring membuat segitiga 3-4-5 tidak
 * lagi terlihat 3-4-5.
 *
 * ISI KOTAKNYA DITULIS, TINGGINYA TIDAK DIGAMBAR
 * Tinggi kotak adalah x itu sendiri, dan ia sudah terlihat sebagai sisi pojok
 * yang dipotong. Menggambar kotak tegak di sebelahnya hanya menambah gambar
 * tanpa menambah pengertian.
 */

export const SISI = 18
export const BATAS_X = { min: 0.1, maks: 8.9, langkah: 0.1 }
export const AWAL = { x: 1.5 }

export const isi = (x: number) => x * (SISI - 2 * x) ** 2
export const isiTurunan = (x: number) => 12 * x * x - 144 * x + 324

/* Jendela TETAP untuk grafik isinya. Puncaknya 432 di x = 3, jadi 470 memberi
   ruang kepala tanpa membuat kurvanya gepeng. */
const GRAFIK: Jendela = jendelaTetap(-0.4, 9.4, -30, 470)

/* Bingkai gambar kartonnya. Persegi 18 cm dipetakan ke kotak 150 satuan supaya
   sisi mendatar dan sisi tegak berskala SAMA: kartonnya memang persegi, dan
   menggambarnya sebagai persegi panjang akan berbohong tentang bendanya. */
const KARTON = { vw: 460, vh: 196, sisi: 150, kiri: 155, atas: 26 }
const kePx = (cm: number) => (cm / SISI) * KARTON.sisi

export default function KotakTerbesar({
  x, onGeser,
}: {
  x: number
  onGeser: (x: number) => void
}) {
  const dipegang = useSedangDiubah()
  const [menyeret, setMenyeret] = useState(false)
  const p = keLayar(GRAFIK)

  const alas = SISI - 2 * x
  const v = isi(x)
  const vAksen = isiTurunan(x)
  const nyala = dipegang === 'x' || menyeret

  const s = kePx(x)
  const L = KARTON.sisi
  const x0 = KARTON.kiri
  const y0 = KARTON.atas

  function seret(e: ReactPointerEvent<SVGSVGElement>) {
    const mm = posisiMatematika(e, GRAFIK)
    if (!mm) return
    onGeser(batasi(bulatkanKe(mm.x, BATAS_X.langkah), BATAS_X.min, BATAS_X.maks))
  }

  function mulai(e: ReactPointerEvent<SVGSVGElement>) {
    if (!posisiDiGambar(e)) return
    e.currentTarget.setPointerCapture(e.pointerId)
    setMenyeret(true)
    seret(e)
  }

  return (
    // Dua papan ditumpuk dengan gaya sebaris; globals.css wilayah sesi lain.
    <div style={{ display: 'grid', gap: 6 }}>
      {/* ================= papan atas: kartonnya ================= */}
      <svg
        viewBox={`0 0 ${KARTON.vw} ${KARTON.vh}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`Karton 18 sentimeter dengan pojok terpotong ${angka(x, 1)} sentimeter. Alasnya menjadi ${angka(alas, 1)} kali ${angka(alas, 1)} sentimeter dan tingginya ${angka(x, 1)} sentimeter.`}
      >
        <text x={16} y={16} fontSize={11.5} fill={WARNA.miring} fontFamily={MONO}>
          karton {SISI} cm dilihat dari atas
        </text>

        {/* alas kotak yang tersisa */}
        <rect x={x0 + s} y={y0 + s} width={Math.max(L - 2 * s, 0)} height={Math.max(L - 2 * s, 0)}
              fill={WARNA.samping} opacity={0.18} />

        {/* keempat sisi yang akan dilipat naik */}
        {[
          { x: x0 + s, y: y0, w: L - 2 * s, h: s },
          { x: x0 + s, y: y0 + L - s, w: L - 2 * s, h: s },
          { x: x0, y: y0 + s, w: s, h: L - 2 * s },
          { x: x0 + L - s, y: y0 + s, w: s, h: L - 2 * s },
        ].map((r, i) => (
          <rect key={i} x={r.x} y={r.y} width={Math.max(r.w, 0)} height={Math.max(r.h, 0)}
                fill={WARNA.depan} opacity={0.22} />
        ))}

        {/* keempat pojok yang dipotong */}
        <g className={nyala ? 'nyala' : undefined}>
          {[
            { x: x0, y: y0 }, { x: x0 + L - s, y: y0 },
            { x: x0, y: y0 + L - s }, { x: x0 + L - s, y: y0 + L - s },
          ].map((c, i) => (
            <rect key={i} x={c.x} y={c.y} width={s} height={s}
                  fill={WARNA.sudut} opacity={nyala ? 0.75 : 0.55} />
          ))}
        </g>

        {/* garis lipat dan bingkai luar */}
        <rect x={x0} y={y0} width={L} height={L} fill="none" stroke={WARNA.miring} strokeWidth={1.6} />
        <rect x={x0 + s} y={y0 + s} width={Math.max(L - 2 * s, 0)} height={Math.max(L - 2 * s, 0)}
              fill="none" stroke={WARNA.miring} strokeWidth={1.2} strokeDasharray="5 4" />

        {/* ukuran */}
        <text x={x0 + L / 2} y={y0 + L + 16} textAnchor="middle" fontSize={10.5}
              fill={WARNA.miring} fontFamily={MONO}>{SISI} cm</text>
        <text x={x0 - 8} y={y0 + s / 2 + 4} textAnchor="end" fontSize={10}
              fill={WARNA.sudut} fontFamily={MONO}>x = {angka(x, 1)}</text>
        <text x={x0 + L / 2} y={y0 + L / 2 + 4} textAnchor="middle" fontSize={10.5}
              fill={WARNA.samping} fontFamily={MONO}>{angka(alas, 1)} cm</text>

        {/* keterangan ukuran kotak jadinya, di luar gambar */}
        <text x={16} y={y0 + 46} fontSize={10.5} fill={WARNA.samping} fontFamily={MONO}>
          alas {angka(alas, 1)} × {angka(alas, 1)}
        </text>
        <text x={16} y={y0 + 62} fontSize={10.5} fill={WARNA.sudut} fontFamily={MONO}>
          tinggi {angka(x, 1)}
        </text>
        <text x={16} y={y0 + 78} fontSize={11.5} fill={WARNA.miring} fontFamily={MONO}>
          isi {angka(v, 1)} cm³
        </text>
        <text x={16} y={y0 + 100} fontSize={10} fill={WARNA.redup} fontFamily={MONO}>
          V′(x) = {angka(vAksen, 1)}
        </text>
        <text x={16} y={y0 + 116} fontSize={10} fill={WARNA.redup} fontFamily={MONO}>
          {Math.abs(vAksen) < 0.5 ? 'hampir mendatar' : vAksen > 0 ? 'isinya masih bertambah' : 'isinya mulai berkurang'}
        </text>
      </svg>

      {/* ================= papan bawah: grafik isinya ================= */}
      <Bidang
        jendela={GRAFIK}
        keterangan="V(x) = x(18 - 2x)²"
        catatan={[{
          teks: `potongan ${angka(x, 1)} cm memberi isi ${angka(v, 1)} cm³`,
          warna: WARNA.sudut,
        }]}
        catatanBawah={{ teks: 'seret untuk mengubah potongan' }}
        aria={`Grafik isi kotak. Pada potongan ${angka(x, 1)} sentimeter isinya ${angka(v, 1)} sentimeter kubik, dan V aksen bernilai ${angka(vAksen, 1)}.`}
        gaya={{ cursor: menyeret ? 'grabbing' : 'grab', touchAction: 'none' }}
        onPointerDown={mulai}
        onPointerMove={(e) => { if (menyeret) seret(e) }}
        onPointerUp={() => setMenyeret(false)}
      >
        <path d={jalurFungsi(isi, GRAFIK, 400, 0, 9)} fill="none" stroke={WARNA.miring}
              strokeWidth={2.6} strokeLinecap="round" />
        <path d={jalurGaris(x, v, vAksen, GRAFIK)} fill="none" stroke={WARNA.sudut}
              strokeWidth={nyala ? 2.6 : 2} opacity={0.85} />
        <g className={nyala ? 'nyala' : undefined}>
          <circle cx={p.x(x)} cy={p.y(v)} r={18} fill="transparent" />
          <circle cx={p.x(x)} cy={p.y(v)} r={nyala ? 8.5 : 7}
                  fill={WARNA.miring} stroke="var(--kartu)" strokeWidth={2.2} />
        </g>
      </Bidang>
    </div>
  )
}

/** Baris tabel untuk kolom kanan panggung. */
export function tabelKotak(x: number): Array<{ nama: string; nilai: string }> {
  const alas = SISI - 2 * x
  return [
    { nama: 'potongan pojok x', nilai: `${angka(x, 1)} cm` },
    { nama: 'panjang alas', nilai: `${angka(alas, 1)} cm` },
    { nama: 'lebar alas', nilai: `${angka(alas, 1)} cm` },
    { nama: 'tinggi kotak', nilai: `${angka(x, 1)} cm` },
    { nama: 'V′(x)', nilai: angka(isiTurunan(x), 1) },
    { nama: 'isi kotak', nilai: `${angka(isi(x), 1)} cm³` },
  ]
}
