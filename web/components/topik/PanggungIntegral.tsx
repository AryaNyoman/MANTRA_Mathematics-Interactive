'use client'

import { useState, type ReactNode } from 'react'
import Rintisan from '@/components/widget/integral/Rintisan'
import MesinBalik, {
  AWAL as AWAL_BALIK, BATAS_C, BATAS_X, SOAL, soalDari,
} from '@/components/widget/integral/MesinBalik'
import NaikPangkat, {
  AWAL as AWAL_PANGKAT, BATAS_A, BATAS_C as BATAS_C_PANGKAT,
  BATAS_X as BATAS_X_PANGKAT, PANGKAT, pangkatDari,
} from '@/components/widget/integral/NaikPangkat'
import type { PropPanggung } from '@/components/topik/jenis'
import { Angka, Kembalikan, Petunjuk, Pilihan } from '@/components/kendali'

/**
 * Panggung Integral: penyetelan kesepuluh widgetnya, dan tidak lebih.
 *
 * KERANGKA dari MATRA-MASTER (6 Sep 2026), pola sama dengan PanggungTurunan.
 * Keadaan widget dipegang di sini, komponen widgetnya hanya menggambar (pola
 * PanggungLimit). Alasannya: kendali dan gambar adalah dua komponen berbeda
 * yang harus membaca angka yang sama, dan satu-satunya tempat yang bisa dilihat
 * keduanya adalah panggung ini.
 *
 * Rancangan tiap widget: docs/superpowers/specs/2026-09-06-integral-alur-belajar.md
 */

/** Batas kendali widget 05; pindahkan ke komponen widgetnya saat dibuat. */
const BATAS_N = { min: 1, maks: 60, langkah: 1 }
const TITIK_SAMPEL = [
  { nilai: 'kiri', label: 'kiri' },
  { nilai: 'kanan', label: 'kanan' },
  { nilai: 'tengah', label: 'tengah' },
]
const AWAL = { n: 4, sampel: 'kiri' }

export default function PanggungIntegral({ tahap, tampilWidget, children }: PropPanggung) {
  // Materi 01: mesin turunan mundur
  const [soal, setSoal] = useState(AWAL_BALIK.soal)
  const [calon, setCalon] = useState(String(AWAL_BALIK.calon))
  const [konstanta, setKonstanta] = useState(AWAL_BALIK.C)
  const [titikX, setTitikX] = useState(AWAL_BALIK.x)

  // Materi 02: aturan pangkat pada dua papan
  const [pangkat, setPangkat] = useState(AWAL_PANGKAT.pangkat)
  const [koefA, setKoefA] = useState(AWAL_PANGKAT.a)
  const [konstanta2, setKonstanta2] = useState(AWAL_PANGKAT.C)
  const [titikX2, setTitikX2] = useState(AWAL_PANGKAT.x)

  // Materi 05: jumlahan Riemann
  const [n, setN] = useState(AWAL.n)
  const [sampel, setSampel] = useState(AWAL.sampel)

  let kiri: ReactNode = null
  let kanan: ReactNode = null
  let tanda = 'BACAAN'

  if (tahap) {
    if (tahap.widget === 'dunia-nyata-integral') tanda = 'CONTOH NYATA'
    else if (tahap.widget) tanda = 'INTERAKTIF'

    /* Calon jawaban ikut soal yang sedang dipilih, jadi daftarnya dibangun
       ulang tiap render. Indeksnya disimpan sebagai teks karena `Pilihan`
       bekerja dengan nilai teks, bukan angka. */
    const soalIni = soalDari(soal)
    const calonPilihan = soalIni.calon.map((c, i) => ({ nilai: String(i), label: c.label }))

    kiri = (
      <>
        {tampilWidget && tahap.widget === 'mesin-balik' && (
          <>
            <div className="layar">
              <MesinBalik
                soal={soal}
                calon={Number(calon)}
                C={konstanta}
                x={titikX}
                onGeserX={setTitikX}
              />
            </div>
            <div className="kendali">
              <Pilihan
                nama="Laju yang diketahui"
                arti="cari fungsi yang turunannya ini"
                pilihan={SOAL.map((s) => ({ nilai: s.nilai, label: s.label }))}
                nilai={soal}
                onPilih={(v) => { setSoal(v); setCalon('0') }}
              />
              <Pilihan
                nama="Tebakan Anda"
                arti="mesin memeriksanya dengan menurunkan tebakan itu"
                pilihan={calonPilihan}
                nilai={calon}
                onPilih={setCalon}
              />
              <Angka
                nama="C" arti="menggeser seluruh kurva naik turun" kunci="C"
                nilai={konstanta} onUbah={setKonstanta}
                min={BATAS_C.min} max={BATAS_C.maks} langkah={BATAS_C.langkah}
              />
              <Angka
                nama="x" arti="letak titik singgung, bisa juga diseret di gambar" kunci="x"
                nilai={titikX} onUbah={setTitikX}
                min={BATAS_X.min} max={BATAS_X.maks} langkah={BATAS_X.langkah}
              />
              <Kembalikan
                onClick={() => {
                  setSoal(AWAL_BALIK.soal)
                  setCalon(String(AWAL_BALIK.calon))
                  setKonstanta(AWAL_BALIK.C)
                  setTitikX(AWAL_BALIK.x)
                }}
              />
              <Petunjuk>
                geser C, dan lihat semua kurva punya kemiringan yang sama di tiap x.
                Itulah sebabnya turunannya tidak berubah.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'naik-pangkat' && (
          <>
            <div className="layar">
              <NaikPangkat
                pangkat={pangkat}
                a={koefA}
                C={konstanta2}
                x={titikX2}
                onGeserX={setTitikX2}
              />
            </div>
            <div className="kendali">
              <Pilihan
                nama="Pangkat n"
                arti="pangkat pada f(x) = a dikali x pangkat n"
                pilihan={PANGKAT.map((p) => ({ nilai: p.nilai, label: p.label }))}
                nilai={pangkat}
                onPilih={(v) => {
                  setPangkat(v)
                  // Titik ditarik masuk ke ranah yang sah: akar dan pangkat
                  // negatif tidak punya nilai di sebelah kiri nol.
                  // Titik dipindah ke tempat yang memang ada isinya untuk
                  // pangkat itu. Pada pangkat negatif, x besar membuat kurvanya
                  // hampir menempel sumbu dan tidak ada yang bisa dilihat.
                  setTitikX2(pangkatDari(v).xAwal)
                }}
              />
              <Angka
                nama="Koefisien a" arti="pengali di depan x pangkat n" kunci="a"
                nilai={koefA} onUbah={setKoefA}
                min={BATAS_A.min} max={BATAS_A.maks} langkah={BATAS_A.langkah}
              />
              <Angka
                nama="C" arti="menggeser kurva papan bawah naik turun" kunci="C"
                nilai={konstanta2} onUbah={setKonstanta2}
                min={BATAS_C_PANGKAT.min} max={BATAS_C_PANGKAT.maks} langkah={BATAS_C_PANGKAT.langkah}
              />
              <Angka
                nama="x" arti="letak titik, bisa juga diseret di gambar" kunci="x"
                nilai={titikX2} onUbah={(v) => setTitikX2(Math.max(v, pangkatDari(pangkat).xMinSeret))}
                min={BATAS_X_PANGKAT.min} max={BATAS_X_PANGKAT.maks} langkah={BATAS_X_PANGKAT.langkah}
              />
              <Kembalikan
                onClick={() => {
                  setPangkat(AWAL_PANGKAT.pangkat)
                  setKoefA(AWAL_PANGKAT.a)
                  setKonstanta2(AWAL_PANGKAT.C)
                  setTitikX2(AWAL_PANGKAT.x)
                }}
              />
              <Petunjuk>
                pilih n = -1, dan mesinnya menolak: pangkat naik jadi 0, pembaginya nol.
                Itu kasus khusus yang tidak dibahas di SMA.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'persegi-panjang-menumpuk' && (
          <>
            <div className="layar">
              <Rintisan nama="persegi-panjang-menumpuk" keterangan={`n = ${n}, titik sampel ${sampel}: persegi panjang di bawah kurva`} />
            </div>
            <div className="kendali">
              <Angka nama="Banyak bagian n" arti="selang [a, b] dibagi jadi n persegi panjang" kunci="n"
                nilai={n} onUbah={setN} min={BATAS_N.min} max={BATAS_N.maks} langkah={BATAS_N.langkah} />
              <Pilihan nama="Titik sampel" arti="tinggi persegi panjang diambil dari ujung mana"
                pilihan={TITIK_SAMPEL} nilai={sampel} onPilih={setSampel} />
              <Kembalikan onClick={() => { setN(AWAL.n); setSampel(AWAL.sampel) }} />
              <Petunjuk>
                naikkan n dari 4 ke 60, dan lihat selisih ke luas sebenarnya menyusut.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget
          && tahap.widget !== 'mesin-balik'
          && tahap.widget !== 'naik-pangkat'
          && tahap.widget !== 'persegi-panjang-menumpuk'
          && tahap.widget !== 'dunia-nyata-integral' && (
          <>
            <div className="layar">
              <Rintisan nama={tahap.widget} keterangan="lihat rancangan Materi ini di spesifikasi Integral" />
            </div>
            <div className="kendali">
              <Petunjuk>widget ini belum dibuat; kendalinya menyusul bersama widgetnya.</Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'dunia-nyata-integral' && (
          <div className="isi-gulir">
            <Rintisan nama="dunia-nyata-integral" keterangan="galeri empat kartu: penjualan, jarak, pegas, penghematan" />
          </div>
        )}
      </>
    )

    kanan = null
  }

  return <>{children({ kiri, kanan, tanda })}</>
}
