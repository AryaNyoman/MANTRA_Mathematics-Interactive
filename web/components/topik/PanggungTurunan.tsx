'use client'

import { useState, type ReactNode } from 'react'
import type { PropPanggung } from '@/components/topik/jenis'
import { Angka, Kembalikan, Petunjuk, Pilihan } from '@/components/kendali'
import { angka } from '@/components/widget/turunan/koordinat'
import { pilihanFungsi } from '@/components/widget/turunan/fungsi'
import GarisPotong, {
  AWAL as AWAL_01, BATAS_H as BATAS_H_01, BATAS_X1 as BATAS_X1_01,
  maksH, tabelGarisPotong,
} from '@/components/widget/turunan/GarisPotong'
import SekanKeTangen, {
  AWAL as AWAL_02, BATAS_H as BATAS_H_02,
  CEPAT, FUNGSI_TERSEDIA as FUNGSI_02, batasX1, maksH as maksH_02, tabelSekan,
} from '@/components/widget/turunan/SekanKeTangen'
import MesinPangkat, {
  AWAL as AWAL_04, BATAS_H as BATAS_H_04, PILIHAN_PANGKAT,
  batasXP, maksHP, tabelPangkat, uraianPangkat,
} from '@/components/widget/turunan/MesinPangkat'
import SusunPolinom, {
  AWAL as AWAL_05, BATAS_KOEF, BATAS_X as BATAS_X_05, tabelPolinom,
} from '@/components/widget/turunan/SusunPolinom'
import LuasBerubah, {
  AWAL as AWAL_06, BATAS_H as BATAS_H_06, BATAS_X as BATAS_X_06, tabelLuas,
} from '@/components/widget/turunan/LuasBerubah'
import MesinBertingkat, {
  AWAL as AWAL_07, BATAS_H as BATAS_H_07, BATAS_X as BATAS_X_07,
  PILIHAN_DALAM, PILIHAN_LUAR, tabelBertingkat,
} from '@/components/widget/turunan/MesinBertingkat'
import GarisSinggungGeser, {
  AWAL as AWAL_09, PILIHAN_KURVA as KURVA_09, batasX1 as batasX1_09, langkahSinggung,
} from '@/components/widget/turunan/GarisSinggungGeser'
import PetaTanda, {
  AWAL as AWAL_10, PILIHAN_KURVA as KURVA_10, batasXT, tabelTanda,
} from '@/components/widget/turunan/PetaTanda'
import KotakTerbesar, {
  AWAL as AWAL_11, BATAS_X as BATAS_X_11, tabelKotak,
} from '@/components/widget/turunan/KotakTerbesar'
import DuniaNyataTurunan from '@/components/widget/turunan/DuniaNyataTurunan'
import GrafikTurunan, {
  AWAL as AWAL_03, FUNGSI_TERSEDIA as FUNGSI_03,
  FUNGSI_SINUS, MAKS_JEJAK, batasX, tabelGrafikTurunan,
} from '@/components/widget/turunan/GrafikTurunan'
import TeksMat from '@/components/latihan/TeksMat'

/**
 * Panggung Turunan: penyetelan kesebelas widgetnya, dan tidak lebih.
 *
 * Bentuknya meniru PanggungLimit: keadaan tiap widget dipegang DI SINI supaya
 * tidak hilang saat siswa pindah materi lalu kembali, dan komponen widget di
 * `components/widget/turunan/` hanya menggambar.
 *
 * Pola yang diikuti semua widget:
 *   - `Angka` dengan `kunci` unik: nama + arti, bisa diketik dan digeser,
 *     batasnya dari konstanta BATAS_* yang diekspor komponen widgetnya;
 *   - `Kembalikan` mengembalikan SEMUA keadaan widget itu ke nilai awal;
 *   - `Petunjuk` satu kalimat, ajakan mencoba yang spesifik;
 *   - jendela gambar TETAP, seretan ditahan di kotak batas, bagian gambar yang
 *     kuncinya dipegang diberi kelas `nyala`.
 *
 * Rancangan tiap widget: docs/superpowers/specs/2026-09-06-turunan-alur-belajar.md
 */

function Tabel({ judul, baris }: { judul: string; baris: Array<{ nama: string; nilai: string }> }) {
  return (
    <div className="blok">
      <div className="cap"><TeksMat teks={`${judul}`} blok={false} /></div>
      <table className="tabel-angka">
        <tbody>
          {baris.map((b, i) => (
            <tr key={b.nama} className={i === baris.length - 1 ? 'tegas' : undefined}>
              <td><TeksMat teks={`${b.nama}`} blok={false} /></td>
              <td><TeksMat teks={`${b.nilai}`} blok={false} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function PanggungTurunan({ tahap, tampilWidget, children }: PropPanggung) {
  // Materi 01: garis potong pada kurva produksi
  const [x1, setX1] = useState(AWAL_01.x1)
  const [h1, setH1] = useState(AWAL_01.h)

  // Materi 02: garis potong mengejar garis singgung
  const [x2, setX2] = useState(AWAL_02.x1)
  const [h2, setH2] = useState(AWAL_02.h)
  const [fungsi2, setFungsi2] = useState(AWAL_02.nama)

  // Materi 03: jejak kemiringan membentuk fungsi turunan
  const [x3, setX3] = useState(AWAL_03.x)
  const [fungsi3, setFungsi3] = useState(AWAL_03.nama)
  const [jejak, setJejak] = useState<number[]>([])

  // Materi 04: aturan pangkat diturunkan dari definisi
  const [pangkat4, setPangkat4] = useState(AWAL_04.pangkat)
  const [x4, setX4] = useState(AWAL_04.x)
  const [h4, setH4] = useState(AWAL_04.h)

  // Materi 05: menurunkan suku demi suku
  const [koef5, setKoef5] = useState({ a: AWAL_05.a, b: AWAL_05.b, c: AWAL_05.c, d: AWAL_05.d })
  const [x5, setX5] = useState(AWAL_05.x)

  // Materi 06: aturan hasil kali lewat luas
  const [x6, setX6] = useState(AWAL_06.x)
  const [h6, setH6] = useState(AWAL_06.h)

  // Materi 07: aturan rantai sebagai dua mesin berderet
  const [x7, setX7] = useState(AWAL_07.x)
  const [h7, setH7] = useState(AWAL_07.h)
  const [dalam7, setDalam7] = useState(AWAL_07.dalam)
  const [luar7, setLuar7] = useState(AWAL_07.luar)

  // Materi 08: kemiringan sinus, kosinus, dan eksponen
  const [x8, setX8] = useState(-6.3)
  const [fungsi8, setFungsi8] = useState('sinus')
  const [jejak8, setJejak8] = useState<number[]>([])
  const [tebakan8, setTebakan8] = useState('sembunyi')

  /** Sapuan Materi 08, pola sama dengan Materi 03. */
  function geserX8(nx: number) {
    setX8(nx)
    setJejak8((lama) => {
      if (lama.includes(nx)) return lama
      const baru = [...lama, nx]
      return baru.length > MAKS_JEJAK ? baru.slice(baru.length - MAKS_JEJAK) : baru
    })
  }

  /** Geser x pada Materi 03 sambil menambah jejaknya, tanpa kembar. */
  function geserX3(nx: number) {
    setX3(nx)
    setJejak((lama) => {
      if (lama.includes(nx)) return lama
      const baru = [...lama, nx]
      return baru.length > MAKS_JEJAK ? baru.slice(baru.length - MAKS_JEJAK) : baru
    })
  }

  // Materi 09: persamaan garis singgung
  const [x9, setX9] = useState(AWAL_09.x1)
  const [kurva9, setKurva9] = useState(AWAL_09.kurva)

  // Materi 10: naik, turun, dan diam
  const [x10, setX10] = useState(AWAL_10.x)
  const [kurva10, setKurva10] = useState(AWAL_10.kurva)

  // Materi 11: kotak dari karton
  const [x11, setX11] = useState(AWAL_11.x)

  let kiri: ReactNode = null
  let kanan: ReactNode = null
  let tanda = 'BACAAN'

  if (tahap) {
    if (tahap.widget === 'dunia-nyata-turunan') tanda = 'CONTOH NYATA'
    else if (tahap.widget) tanda = 'INTERAKTIF'

    kiri = (
      <>
        {/* ---------------- Materi 01 ---------------- */}
        {tampilWidget && tahap.widget === 'garis-potong' && (
          <>
            <div className="layar">
              <GarisPotong x1={x1} h={h1} onGeser={(nx, nh) => { setX1(nx); setH1(nh) }} />
            </div>
            <div className="kendali">
              <Angka nama="Jam awal x₁" arti="titik P, jam mulai mengukur" kunci="x1" satuan=" jam"
                nilai={x1} onUbah={(n) => { setX1(n); setH1((lama) => Math.min(lama, maksH(n))) }}
                min={BATAS_X1_01.min} max={BATAS_X1_01.maks} langkah={BATAS_X1_01.langkah} />
              <Angka nama="Selang waktu h" arti="jarak Q dari P; makin kecil makin dekat" kunci="h" satuan=" jam"
                nilai={h1} onUbah={setH1}
                min={BATAS_H_01.min} max={maksH(x1)} langkah={BATAS_H_01.langkah} />
              <Kembalikan onClick={() => { setX1(AWAL_01.x1); setH1(AWAL_01.h) }} />
              <Petunjuk>
                geser h makin kecil, dan perhatikan kemiringannya berhenti berubah banyak.
              </Petunjuk>
            </div>
          </>
        )}

        {/* ---------------- Materi 02 ---------------- */}
        {tampilWidget && tahap.widget === 'sekan-ke-tangen' && (
          <>
            <div className="layar">
              <SekanKeTangen x1={x2} h={h2} nama={fungsi2}
                onGeser={(nx, nh) => { setX2(nx); setH2(nh) }} />
            </div>
            <div className="kendali">
              <Angka nama="Jarak h" arti="jarak Q dari P; tidak bisa dibuat nol" kunci="h"
                nilai={h2} onUbah={setH2} desimal={2}
                min={BATAS_H_02.min} max={maksH_02(x2, fungsi2)} langkah={BATAS_H_02.langkah} />
              <Pilihan nama="Contoh cepat" arti="lompat ke h yang biasa dipakai"
                pilihan={CEPAT} nilai={String(h2)} onPilih={(n) => setH2(Number(n))} />
              <Angka nama="Titik P di x₁" arti="tempat garis singgungnya dicari" kunci="x1"
                nilai={x2} onUbah={(n) => { setX2(n); setH2((lama) => Math.min(lama, maksH_02(n, fungsi2))) }}
                desimal={2}
                min={batasX1(fungsi2).min} max={batasX1(fungsi2).maks} langkah={batasX1(fungsi2).langkah} />
              <Pilihan nama="Fungsi" arti="kurva yang sedang diperiksa"
                pilihan={pilihanFungsi(FUNGSI_02)} nilai={fungsi2}
                onPilih={(n) => {
                  // Fungsi baru punya rentang aman sendiri; x₁ dan h dijepit ke
                  // situ supaya kedua titiknya tetap terlihat.
                  const b = batasX1(n)
                  const nx = Math.min(b.maks, Math.max(b.min, x2))
                  setFungsi2(n)
                  setX2(nx)
                  setH2((lama) => Math.min(lama, maksH_02(nx, n)))
                }} />
              <Kembalikan onClick={() => { setX2(AWAL_02.x1); setH2(AWAL_02.h); setFungsi2(AWAL_02.nama) }} />
              <Petunjuk>
                kecilkan h sampai 0,01: garis birunya menempel ke garis ungu, tapi selisih angkanya tidak pernah nol.
              </Petunjuk>
            </div>
          </>
        )}

        {/* ---------------- Materi 03 ---------------- */}
        {tampilWidget && tahap.widget === 'grafik-turunan' && (
          <>
            <div className="layar">
              <GrafikTurunan x={x3} nama={fungsi3} jejak={jejak} onGeser={geserX3} />
            </div>
            <div className="kendali">
              <Angka nama="Sapuan x" arti="geser pelan dari kiri ke kanan" kunci="x"
                nilai={x3} onUbah={geserX3} desimal={1}
                min={batasX(fungsi3).min} max={batasX(fungsi3).maks} langkah={batasX(fungsi3).langkah} />
              <Pilihan nama="Fungsi" arti="kurva di papan atas"
                pilihan={pilihanFungsi(FUNGSI_03)} nilai={fungsi3}
                onPilih={(n) => {
                  // Jejak dibuang dan x dijepit ke jendela fungsi baru: fungsi
                  // yang berbeda punya rentang x yang berbeda, dan x lama bisa
                  // berada di luar papan yang baru.
                  const b = batasX(n)
                  setFungsi3(n)
                  setJejak([])
                  setX3((lama) => Math.min(b.maks, Math.max(b.min, lama)))
                }} />
              <Kembalikan onClick={() => { setX3(AWAL_03.x); setFungsi3(AWAL_03.nama); setJejak([]) }} />
              <Petunjuk>
                sapu x dari kiri ke kanan, dan lihat kurva bawah lahir dari kemiringan kurva atas.
              </Petunjuk>
            </div>
          </>
        )}

        {/* ---------------- Materi 04 ---------------- */}
        {tampilWidget && tahap.widget === 'mesin-pangkat' && (
          <>
            <div className="layar">
              <MesinPangkat nilaiPangkat={pangkat4} x={x4} h={h4}
                onGeser={(nx, nh) => { setX4(nx); setH4(nh) }} />
            </div>
            <div className="kendali">
              <Pilihan nama="Pangkat n" arti="pangkat yang sedang diperiksa"
                pilihan={PILIHAN_PANGKAT} nilai={pangkat4}
                onPilih={(n) => {
                  // Tiap pangkat punya papan dan batas sendiri; x dan h dijepit
                  // supaya kedua titiknya tetap terlihat.
                  const b = batasXP(n)
                  const nx = Math.min(b.maks, Math.max(b.min, x4))
                  setPangkat4(n)
                  setX4(nx)
                  setH4((lama) => Math.min(lama, maksHP(nx, n)))
                }} />
              <Angka nama="Titik x" arti="ditahan positif supaya pangkat pecahan sah" kunci="x"
                nilai={x4} desimal={1}
                onUbah={(n) => { setX4(n); setH4((lama) => Math.min(lama, maksHP(n, pangkat4))) }}
                min={batasXP(pangkat4).min} max={batasXP(pangkat4).maks} langkah={batasXP(pangkat4).langkah} />
              <Angka nama="Jarak h" arti="kecilkan sampai sisa yang memuat h lenyap" kunci="h"
                nilai={h4} onUbah={setH4} desimal={2}
                min={BATAS_H_04.min} max={maksHP(x4, pangkat4)} langkah={BATAS_H_04.langkah} />
              <Kembalikan onClick={() => { setPangkat4(AWAL_04.pangkat); setX4(AWAL_04.x); setH4(AWAL_04.h) }} />
              <Petunjuk>
                ganti n, dan perhatikan sisa yang mengandung h selalu hilang saat h menuju nol.
              </Petunjuk>
            </div>
          </>
        )}

        {/* ---------------- Materi 05 ---------------- */}
        {tampilWidget && tahap.widget === 'susun-polinom' && (
          <>
            <div className="layar">
              <SusunPolinom koef={koef5} x={x5} onGeser={setX5} />
            </div>
            <div className="kendali">
              {([['a', 'x³'], ['b', 'x²'], ['c', 'x'], ['d', 'tetap']] as const).map(([k, lambang]) => (
                <Angka key={k} nama={`Koefisien ${k}`} arti={`pengali suku ${lambang}`} kunci={k}
                  nilai={koef5[k]} onUbah={(n) => setKoef5((lama) => ({ ...lama, [k]: n }))}
                  desimal={1}
                  min={BATAS_KOEF.min} max={BATAS_KOEF.maks} langkah={BATAS_KOEF.langkah} />
              ))}
              <Angka nama="Titik x" arti="tempat kemiringannya dibaca" kunci="x"
                nilai={x5} onUbah={setX5} desimal={1}
                min={BATAS_X_05.min} max={BATAS_X_05.maks} langkah={BATAS_X_05.langkah} />
              <Kembalikan onClick={() => {
                setKoef5({ a: AWAL_05.a, b: AWAL_05.b, c: AWAL_05.c, d: AWAL_05.d })
                setX5(AWAL_05.x)
              }} />
              <Petunjuk>
                ubah d saja, dan lihat kurva bawah tidak bergerak sama sekali: konstanta hilang saat diturunkan.
              </Petunjuk>
            </div>
          </>
        )}

        {/* ---------------- Materi 06 ---------------- */}
        {tampilWidget && tahap.widget === 'luas-berubah' && (
          <>
            <div className="layar">
              <LuasBerubah x={x6} h={h6} onGeser={(nx, nh) => { setX6(nx); setH6(nh) }} />
            </div>
            <div className="kendali">
              <Angka nama="Titik x" arti="menentukan ukuran persegi panjangnya" kunci="x"
                nilai={x6} onUbah={setX6} desimal={1}
                min={BATAS_X_06.min} max={BATAS_X_06.maks} langkah={BATAS_X_06.langkah} />
              <Angka nama="Tambahan h" arti="seberapa banyak kedua sisinya bertambah" kunci="h"
                nilai={h6} onUbah={setH6} desimal={2}
                min={BATAS_H_06.min} max={BATAS_H_06.maks} langkah={BATAS_H_06.langkah} />
              <Kembalikan onClick={() => { setX6(AWAL_06.x); setH6(AWAL_06.h) }} />
              <Petunjuk>
                kecilkan h, dan lihat pojok ungu hilang lebih cepat daripada dua pitanya.
              </Petunjuk>
            </div>
          </>
        )}

        {/* ---------------- Materi 07 ---------------- */}
        {tampilWidget && tahap.widget === 'mesin-bertingkat' && (
          <>
            <div className="layar">
              <MesinBertingkat x={x7} h={h7} namaDalam={dalam7} namaLuar={luar7}
                onGeser={(nx, nh) => { setX7(nx); setH7(nh) }} />
            </div>
            <div className="kendali">
              <Pilihan nama="Mesin dalam" arti="yang dikerjakan lebih dulu"
                pilihan={PILIHAN_DALAM} nilai={dalam7} onPilih={setDalam7} />
              <Pilihan nama="Mesin luar" arti="yang mengolah hasilnya"
                pilihan={PILIHAN_LUAR} nilai={luar7} onPilih={setLuar7} />
              <Angka nama="Titik x" arti="masukan yang dikirim ke mesin pertama" kunci="x"
                nilai={x7} onUbah={setX7} desimal={2}
                min={BATAS_X_07.min} max={BATAS_X_07.maks} langkah={BATAS_X_07.langkah} />
              <Angka nama="Tambahan h" arti="lebar pita perubahannya" kunci="h"
                nilai={h7} onUbah={setH7} desimal={2}
                min={BATAS_H_07.min} max={BATAS_H_07.maks} langkah={BATAS_H_07.langkah} />
              <Kembalikan onClick={() => {
                setX7(AWAL_07.x); setH7(AWAL_07.h)
                setDalam7(AWAL_07.dalam); setLuar7(AWAL_07.luar)
              }} />
              <Petunjuk>
                pilih mesin dalam 3x, lalu bandingkan pita di garis u dengan pita di garis x: selalu tiga kali lebih panjang.
              </Petunjuk>
            </div>
          </>
        )}

        {/* ---------------- Materi 08 ---------------- */}
        {tampilWidget && tahap.widget === 'kemiringan-sinus' && (
          <>
            <div className="layar">
              <GrafikTurunan x={x8} nama={fungsi8} jejak={jejak8}
                tebakan={tebakan8 === 'tampil'} onGeser={geserX8} />
            </div>
            <div className="kendali">
              <Angka nama="Sapuan x" arti="sudut dalam radian, bukan derajat" kunci="x"
                nilai={x8} onUbah={geserX8} desimal={1}
                min={batasX(fungsi8).min} max={batasX(fungsi8).maks} langkah={batasX(fungsi8).langkah} />
              <Pilihan nama="Fungsi" arti="kurva di papan atas"
                pilihan={pilihanFungsi(FUNGSI_SINUS)} nilai={fungsi8}
                onPilih={(n) => {
                  const b = batasX(n)
                  setFungsi8(n)
                  setJejak8([])
                  setX8((lama) => Math.min(b.maks, Math.max(b.min, lama)))
                }} />
              <Pilihan nama="Tampilkan tebakan" arti="kurva f′ yang sebenarnya, sebagai pembanding"
                pilihan={[{ nilai: 'sembunyi', label: 'Sembunyikan' }, { nilai: 'tampil', label: 'Tampilkan' }]}
                nilai={tebakan8} onPilih={setTebakan8} />
              <Kembalikan onClick={() => {
                setX8(batasX('sinus').min); setFungsi8('sinus')
                setJejak8([]); setTebakan8('sembunyi')
              }} />
              <Petunjuk>
                sapu dulu sampai jejaknya terbentuk, baru tekan Tampilkan: jejaknya berimpit dengan grafik kosinus.
              </Petunjuk>
            </div>
          </>
        )}

        {/* ---------------- Materi 09 ---------------- */}
        {tampilWidget && tahap.widget === 'garis-singgung-geser' && (
          <>
            <div className="layar">
              <GarisSinggungGeser x1={x9} nama={kurva9} onGeser={setX9} />
            </div>
            <div className="kendali">
              <Angka nama="Titik singgung x₁" arti="tempat garisnya menyentuh kurva" kunci="x1"
                nilai={x9} onUbah={setX9} desimal={2}
                min={batasX1_09(kurva9).min} max={batasX1_09(kurva9).maks} langkah={batasX1_09(kurva9).langkah} />
              <Pilihan nama="Kurva" arti="yang sedang disinggung"
                pilihan={KURVA_09} nilai={kurva9}
                onPilih={(n) => {
                  const b = batasX1_09(n)
                  setKurva9(n)
                  setX9((lama) => Math.min(b.maks, Math.max(b.min, lama)))
                }} />
              <Kembalikan onClick={() => { setX9(AWAL_09.x1); setKurva9(AWAL_09.kurva) }} />
              <Petunjuk>
                geser sampai garisnya mendatar, lalu perhatikan gradiennya menjadi nol dan persamaannya kehilangan suku x.
              </Petunjuk>
            </div>
          </>
        )}

        {/* ---------------- Materi 10 ---------------- */}
        {tampilWidget && tahap.widget === 'peta-tanda' && (
          <>
            <div className="layar">
              <PetaTanda x={x10} nama={kurva10} onGeser={setX10} />
            </div>
            <div className="kendali">
              <Angka nama="Titik x" arti="geser pelan dari kiri ke kanan" kunci="x"
                nilai={x10} onUbah={setX10} desimal={1}
                min={batasXT(kurva10).min} max={batasXT(kurva10).maks} langkah={batasXT(kurva10).langkah} />
              <Pilihan nama="Kurva" arti="yang sedang diselidiki"
                pilihan={KURVA_10} nilai={kurva10}
                onPilih={(n) => {
                  const b = batasXT(n)
                  setKurva10(n)
                  setX10((lama) => Math.min(b.maks, Math.max(b.min, lama)))
                }} />
              <Kembalikan onClick={() => { setX10(AWAL_10.x); setKurva10(AWAL_10.kurva) }} />
              <Petunjuk>
                perhatikan pitanya berganti warna tepat di akar f aksen, bukan di tempat lain. Pada x pangkat tiga warnanya tidak berganti sama sekali.
              </Petunjuk>
            </div>
          </>
        )}

        {/* ---------------- Materi 11 ---------------- */}
        {tampilWidget && tahap.widget === 'kotak-terbesar' && (
          <>
            <div className="layar">
              <KotakTerbesar x={x11} onGeser={setX11} />
            </div>
            <div className="kendali">
              <Angka nama="Potongan pojok x" arti="sisi persegi yang digunting di tiap pojok" kunci="x"
                satuan=" cm" nilai={x11} onUbah={setX11} desimal={1}
                min={BATAS_X_11.min} max={BATAS_X_11.maks} langkah={BATAS_X_11.langkah} />
              <Kembalikan onClick={() => setX11(AWAL_11.x)} />
              <Petunjuk>
                cari sendiri potongan yang membuat garis singgung di grafik isinya mendatar, lalu bandingkan dengan 3 cm.
              </Petunjuk>
            </div>
          </>
        )}

        {/* Materi 12: galeri tidak interaktif */}
        {tampilWidget && tahap.widget === 'dunia-nyata-turunan' && (
          <div className="isi-gulir">
            <DuniaNyataTurunan />
          </div>
        )}
      </>
    )

    kanan = (
      <>
        {tampilWidget && tahap.widget === 'garis-potong' && (
          <Tabel judul="Angka dari alat" baris={tabelGarisPotong(x1, h1)} />
        )}
        {tampilWidget && tahap.widget === 'sekan-ke-tangen' && (
          <>
            <Tabel judul="Angka dari alat" baris={tabelSekan(x2, h2, fungsi2)} />
            <div className="catatan"><TeksMat teks="Selisihnya mengecil terus, tetapi tidak pernah nol selama h masih ada." /></div>
          </>
        )}
        {tampilWidget && tahap.widget === 'mesin-pangkat' && (
          <>
            <Tabel judul="Angka dari alat" baris={tabelPangkat(pangkat4, x4, h4)} />
            <div className="blok">
              <div className="cap"><TeksMat teks="Kotak hitung" blok={false} /></div>
              <div className="catatan"><TeksMat teks={`${uraianPangkat(pangkat4).map((baris) => (
                  <div key={baris} style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.82rem' }}>
                    {baris}
                  </div>
                ))}`} /></div>
            </div>
          </>
        )}
        {tampilWidget && tahap.widget === 'susun-polinom' && (
          <Tabel judul="Angka dari alat" baris={tabelPolinom(koef5, x5)} />
        )}
        {tampilWidget && tahap.widget === 'garis-singgung-geser' && (
          <Tabel judul="Menyusun persamaannya" baris={langkahSinggung(kurva9, x9)} />
        )}
        {tampilWidget && tahap.widget === 'peta-tanda' && (
          <>
            <Tabel judul="Angka dari alat" baris={tabelTanda(kurva10, x10)} />
            <div className="catatan"><TeksMat teks="Yang dibaca hanya TANDA f aksen, bukan nilainya. Angka penguji boleh dipilih bebas, asal berada di selang yang benar." /></div>
          </>
        )}
        {tampilWidget && tahap.widget === 'kotak-terbesar' && (
          <>
            <Tabel judul="Angka dari alat" baris={tabelKotak(x11)} />
            <div className="catatan"><TeksMat teks="Yang ditanyakan isi kotaknya, bukan besar potongannya. Perhatikan satuannya: potongan dalam cm, isi dalam cm kubik." /></div>
          </>
        )}
        {tampilWidget && tahap.widget === 'kemiringan-sinus' && (
          <>
            <Tabel judul="Angka dari alat" baris={tabelGrafikTurunan(x8, fungsi8)} />
            <div className="catatan"><TeksMat teks={`${jejak8.length === 0
                ? 'Papan bawah masih kosong. Sapu x dulu, tebak bentuknya, baru tekan Tampilkan.'
                : `Sudah ${angka(jejak8.length, 0)} titik tercatat. Semua sudut di sini radian.`}`} /></div>
          </>
        )}
        {tampilWidget && tahap.widget === 'mesin-bertingkat' && (
          <>
            <Tabel judul="Angka dari alat" baris={tabelBertingkat(x7, h7, dalam7, luar7)} />
            <div className="catatan"><TeksMat teks="Kedua pengali itu dikalikan, bukan dijumlahkan. Kalau u berubah tiga kali lebih cepat daripada x, dan y berubah lima kali lebih cepat daripada u, maka y berubah lima belas kali lebih cepat daripada x." /></div>
          </>
        )}
        {tampilWidget && tahap.widget === 'luas-berubah' && (
          <>
            <Tabel judul="Angka dari alat" baris={tabelLuas(x6, h6)} />
            <div className="catatan"><TeksMat teks="Dua pita menyisakan angka yang berarti. Pojoknya tidak: pojok itu hasil kali DUA tambahan yang sama-sama mengecil." /></div>
          </>
        )}
        {tampilWidget && tahap.widget === 'grafik-turunan' && (
          <>
            <Tabel judul="Angka dari alat" baris={tabelGrafikTurunan(x3, fungsi3)} />
            <div className="catatan"><TeksMat teks={`${jejak.length === 0
                ? 'Papan bawah masih kosong. Sapu x dulu.'
                : `Sudah ${angka(jejak.length, 0)} titik kemiringan tercatat di papan bawah.`}`} /></div>
          </>
        )}
      </>
    )
  }

  return <>{children({ kiri, kanan, tanda })}</>
}

