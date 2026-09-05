'use client'

import { useRef } from 'react'
import BidangTransformasi from './BidangTransformasi'
import Legenda from './Legenda'
import { Bentuk, Pegangan } from './Bentuk'
import { RuasBerangka } from './Garis'
import { BENTUK_L, dilatasi, type Titik } from './matriks'
import { angka, jendelaSeimbang, keLayar, tahan } from './papan'
import { ALAT, BANTU, KOTAK, NISBAH, PETA, PRAPETA } from './gaya'
import { useSeret } from './useSeret'

export const BATAS_K = { min: -3, maks: 3, langkah: 0.25 }
export const BATAS_PUSAT_DILATASI = { x: 5, y: 3 }

const JANGKAR: Titik[] = [
  { x: -3, y: -2.2 },
  { x: 8, y: 2.2 },
]

/**
 * Widget Materi 07: dilatasi.
 *
 * GARIS BANTUNYA DITARIK DARI PUSAT MELEWATI TITIKNYA, BUKAN CUMA SAMPAI
 * Setiap titik peta berada pada GARIS yang melalui pusat dan titik prapetanya.
 * Kalau garisnya berhenti di titik prapeta, siswa hanya melihat enam ruas
 * lepas. Kalau diteruskan sampai petanya, ia melihat keenam titik memang
 * meluncur pada garis yang sama, dan itu gagasan pokok dilatasi.
 *
 * DUA KASUS YANG WAJIB DICOBA SISWA, DAN KEDUANYA DIJAGA TETAP MUNGKIN
 * Faktor antara 0 dan 1 mengecilkan, dan faktor negatif melempar bentuknya ke
 * sisi seberang pusat. Batas penggesernya sengaja dari -3 sampai 3 dengan
 * langkah 0,25, jadi keduanya bisa dicapai dan angka nol bisa dilewati
 * perlahan.
 *
 * BINGKAINYA WAJIB IKUT MEMBESAR
 * Faktor 3 melempar ujung bentuknya sampai x sama dengan 18. Kalau jendelanya
 * dipatok, bentuknya terpotong, dan aturan proyek melarang widget memotong
 * gambarnya sendiri. Karena itu petanya ikut dikirim ke `jendelaSeimbang`,
 * dan penunjuk skala di pojok kanan bawah memberi tahu siswa bahwa yang
 * berubah bukan cuma bendanya, tetapi juga seberapa jauh kameranya.
 */
export default function PerbesarBentuk({
  k,
  pusat,
  onUbahPusat,
}: {
  k: number
  pusat: Titik
  onUbahPusat: (t: Titik) => void
}) {
  const svgRef = useRef<SVGSVGElement | null>(null)

  const prapeta = BENTUK_L
  const peta = prapeta.map((t) => dilatasi(t, k, pusat))

  const jendelaHitung = jendelaSeimbang([...JANGKAR, ...prapeta, ...peta, pusat], NISBAH, 0.08)
  const pointer = useSeret(jendelaHitung, svgRef, (t) =>
    onUbahPusat(tahan(t, BATAS_PUSAT_DILATASI.x, BATAS_PUSAT_DILATASI.y)),
  )
  const jendela = pointer.jendela

  const p = keLayar(jendela, KOTAK)

  // Yang diukur adalah sudut yang PALING JAUH dari pusatnya, bukan selalu A.
  //
  // Pusatnya bisa diseret siswa ke mana saja, termasuk tepat ke atas sebuah
  // sudut. Kalau yang diukur selalu A dan pusatnya diletakkan di A, jaraknya
  // nol, kedua ruas ukurnya lenyap, dan nisbahnya menjadi nol dibagi nol.
  // Itu benar-benar terjadi pada pemeriksaan visual 3 Sep 2026: pusat bawaan
  // kebetulan sama dengan titik A, dan keterangan di layar menulis "nisbah 0"
  // padahal faktornya 2.
  //
  // Sudut terjauh selalu punya jarak positif selama pusatnya tidak menelan
  // seluruh bentuk sekaligus, yang mustahil sebab bentuknya punya luas.
  let iUkur = 0
  let jarakTerjauh = -1
  prapeta.forEach((t, i) => {
    const j = Math.hypot(t.x - pusat.x, t.y - pusat.y)
    if (j > jarakTerjauh) {
      jarakTerjauh = j
      iUkur = i
    }
  })

  const titikUkur = prapeta[iUkur]
  const petaUkur = peta[iUkur]
  const jarakAsal = Math.hypot(titikUkur.x - pusat.x, titikUkur.y - pusat.y)
  const jarakPeta = Math.hypot(petaUkur.x - pusat.x, petaUkur.y - pusat.y)
  const nisbah = jarakAsal < 1e-9 ? Math.abs(k) : jarakPeta / jarakAsal

  const diTitikAsal = pusat.x === 0 && pusat.y === 0

  return (
    <BidangTransformasi
      jendela={jendela}
      aria={`Bentuk huruf L didilatasi dengan faktor ${angka(k, 2)} berpusat di ${angka(pusat.x, 1)}, ${angka(pusat.y, 1)}. Pusatnya bisa ditarik.`}
      keterangan={`dilatasi faktor ${angka(k, 2)} terhadap ${diTitikAsal ? 'titik asal' : `(${angka(pusat.x, 1)}, ${angka(pusat.y, 1)})`}`}
      svgRef={svgRef}
      pointer={pointer}
    >
      {/* Garis dari pusat melewati tiap titik prapeta sampai ke petanya. */}
      {prapeta.map((t, i) => (
        <g key={`sinar${i}`}>
          <RuasBerangka dari={pusat} ke={t} p={p} warna={BANTU} tampilkanAngka={false} />
          <RuasBerangka dari={pusat} ke={peta[i]} p={p} warna={BANTU} tampilkanAngka={false} />
        </g>
      ))}

      <Bentuk titik={prapeta} p={p} warna={PRAPETA} isian={0.08} putus />
      <Bentuk titik={peta} p={p} warna={PETA} isian={0.14} petik="'" />

      {/* Jarak pusat ke sudut terjauh dan ke petanya, supaya nisbahnya bisa
          diperiksa siswa: yang kedua selalu k kali yang pertama. */}
      <RuasBerangka dari={pusat} ke={titikUkur} p={p} warna={ALAT} desimal={2} sisi={1} />
      {jarakPeta > 1e-9 && (
        <RuasBerangka dari={pusat} ke={petaUkur} p={p} warna={ALAT} desimal={2} sisi={-1} />
      )}

      <Pegangan titik={pusat} p={p} warna={ALAT} label={diTitikAsal ? 'O' : 'P'} kunci="pusat" />

      <Legenda
        entri={[
          { warna: PRAPETA, teks: 'prapeta', putus: true },
          { warna: PETA, teks: 'peta' },
          { warna: ALAT, teks: `jarak, nisbah ${angka(nisbah, 2)}` },
        ]}
      />
    </BidangTransformasi>
  )
}
