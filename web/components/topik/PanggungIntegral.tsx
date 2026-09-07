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
import PersegiPanjangMenumpuk, {
  AWAL as AWAL_RIEMANN, BATAS_N, FUNGSI, SAMPEL, fungsiDari,
} from '@/components/widget/integral/PersegiPanjangMenumpuk'
import PecahSelang, {
  AWAL as AWAL_PECAH, KURVA as KURVA_PECAH, kurvaDari,
} from '@/components/widget/integral/PecahSelang'
import LuasDuaDaerah, {
  AWAL as AWAL_LUAS, KURVA as KURVA_LUAS, YANG_DIHITUNG, kurvaDari as kurvaLuasDari,
} from '@/components/widget/integral/LuasDuaDaerah'
import DuaKurva, {
  AWAL as AWAL_DUA, BATAS_N as BATAS_N_DUA, PASANGAN, pasanganDari,
} from '@/components/widget/integral/DuaKurva'
import LuasYangTumbuh, {
  AWAL as AWAL_TUMBUH, BATAS_X as BATAS_X_TUMBUH, KURVA as KURVA_TUMBUH,
} from '@/components/widget/integral/LuasYangTumbuh'
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
  const [fungsiR, setFungsiR] = useState(AWAL_RIEMANN.fungsi)
  const [n, setN] = useState(AWAL_RIEMANN.n)
  const [sampel, setSampel] = useState(AWAL_RIEMANN.sampel)
  const [batasA, setBatasA] = useState(AWAL_RIEMANN.a)
  const [batasB, setBatasB] = useState(AWAL_RIEMANN.b)

  // Materi 06: memecah selang dan luas bertanda
  const [kurvaPecah, setKurvaPecah] = useState(AWAL_PECAH.kurva)
  const [pecahA, setPecahA] = useState(AWAL_PECAH.a)
  const [pecahB, setPecahB] = useState(AWAL_PECAH.b)
  const [pecahC, setPecahC] = useState(AWAL_PECAH.c)

  // Materi 09: hasil integral lawan luas daerah
  const [kurvaLuas, setKurvaLuas] = useState(AWAL_LUAS.kurva)
  const [luasA, setLuasA] = useState(AWAL_LUAS.a)
  const [luasB, setLuasB] = useState(AWAL_LUAS.b)
  const [modeLuas, setModeLuas] = useState(AWAL_LUAS.mode)

  // Materi 10: luas antara dua kurva
  const [pasangan, setPasangan] = useState(AWAL_DUA.pasangan)
  const [duaA, setDuaA] = useState(AWAL_DUA.a)
  const [duaB, setDuaB] = useState(AWAL_DUA.b)
  const [duaN, setDuaN] = useState(AWAL_DUA.n)

  // Materi 07: fungsi luas yang tumbuh
  const [kurvaTumbuh, setKurvaTumbuh] = useState(AWAL_TUMBUH.kurva)
  const [tumbuhX, setTumbuhX] = useState(AWAL_TUMBUH.x)

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
              <PersegiPanjangMenumpuk
                fungsi={fungsiR}
                n={n}
                sampel={sampel}
                a={batasA}
                b={batasB}
                onGeserBatas={(yang, nilai) => (yang === 'a' ? setBatasA(nilai) : setBatasB(nilai))}
              />
            </div>
            <div className="kendali">
              <Angka nama="Banyak bagian n" arti="selang dibagi jadi n persegi panjang" kunci="n"
                nilai={n} onUbah={setN} min={BATAS_N.min} max={BATAS_N.maks} langkah={BATAS_N.langkah} />
              <Pilihan nama="Titik sampel" arti="tinggi persegi panjang diambil dari ujung mana"
                pilihan={SAMPEL} nilai={sampel} onPilih={setSampel} />
              <Pilihan
                nama="Kurvanya"
                arti="ganti kurva, lalu bandingkan kiri dan kanan lagi"
                pilihan={FUNGSI.map((f) => ({ nilai: f.nilai, label: f.label }))}
                nilai={fungsiR}
                onPilih={(v) => {
                  setFungsiR(v)
                  // Batas dikembalikan ke ranah kurva yang baru. Selang [0, 7]
                  // milik f(x) = x tidak punya arti untuk setengah lingkaran,
                  // yang hanya hidup di [-1, 1].
                  const fb = fungsiDari(v)
                  setBatasA(fb.aAwal)
                  setBatasB(fb.bAwal)
                }}
              />
              <Kembalikan
                onClick={() => {
                  setFungsiR(AWAL_RIEMANN.fungsi)
                  setN(AWAL_RIEMANN.n)
                  setSampel(AWAL_RIEMANN.sampel)
                  setBatasA(AWAL_RIEMANN.a)
                  setBatasB(AWAL_RIEMANN.b)
                }}
              />
              <Petunjuk>
                naikkan n dari 4 ke 60, dan lihat selisih ke luas sebenarnya menyusut.
                Lalu ganti kurvanya menjadi 4 - x², dan bandingkan kiri dengan kanan lagi.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'pecah-selang' && (
          <>
            <div className="layar">
              <PecahSelang
                kurva={kurvaPecah}
                a={pecahA}
                b={pecahB}
                c={pecahC}
                onGeser={(yang, nilai) => {
                  if (yang === 'a') setPecahA(nilai)
                  else if (yang === 'b') setPecahB(nilai)
                  else setPecahC(nilai)
                }}
              />
            </div>
            <div className="kendali">
              <Pilihan
                nama="Kurvanya"
                arti="pilih kurva yang sebagian ada di bawah sumbu"
                pilihan={KURVA_PECAH.map((k) => ({ nilai: k.nilai, label: k.label }))}
                nilai={kurvaPecah}
                onPilih={(v) => {
                  const kb = kurvaDari(v)
                  setKurvaPecah(v)
                  setPecahA(kb.aAwal)
                  setPecahB(kb.bAwal)
                  setPecahC(kb.cAwal)
                }}
              />
              <Angka
                nama="c" arti="tempat selang dipecah, bisa juga diseret di gambar" kunci="c"
                nilai={pecahC}
                onUbah={(v) => setPecahC(Math.min(Math.max(v, pecahA + 0.25), pecahB - 0.25))}
                min={kurvaDari(kurvaPecah).ranah.min} max={kurvaDari(kurvaPecah).ranah.maks} langkah={0.25}
              />
              <Angka
                nama="a" arti="batas kiri" kunci="a"
                nilai={pecahA}
                onUbah={(v) => setPecahA(Math.min(v, pecahC - 0.25))}
                min={kurvaDari(kurvaPecah).ranah.min} max={kurvaDari(kurvaPecah).ranah.maks} langkah={0.25}
              />
              <Angka
                nama="b" arti="batas kanan" kunci="b"
                nilai={pecahB}
                onUbah={(v) => setPecahB(Math.max(v, pecahC + 0.25))}
                min={kurvaDari(kurvaPecah).ranah.min} max={kurvaDari(kurvaPecah).ranah.maks} langkah={0.25}
              />
              <Kembalikan
                onClick={() => {
                  setKurvaPecah(AWAL_PECAH.kurva)
                  setPecahA(AWAL_PECAH.a)
                  setPecahB(AWAL_PECAH.b)
                  setPecahC(AWAL_PECAH.c)
                }}
              />
              <Petunjuk>
                geser c ke mana pun, dan jumlah dua bagiannya tidak pernah berubah.
                Lalu pilih kurva x³ - 4x pada selang -2 sampai 2, dan lihat hasilnya nol.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'luas-dua-daerah' && (
          <>
            <div className="layar">
              <LuasDuaDaerah
                kurva={kurvaLuas}
                a={luasA}
                b={luasB}
                mode={modeLuas}
                onGeser={(yang, nilai) => (yang === 'a' ? setLuasA(nilai) : setLuasB(nilai))}
              />
            </div>
            <div className="kendali">
              <Pilihan
                nama="Kurvanya" arti="pilih kurva yang memotong sumbu di dalam selang"
                pilihan={KURVA_LUAS.map((k) => ({ nilai: k.nilai, label: k.label }))}
                nilai={kurvaLuas}
                onPilih={(v) => {
                  const kb = kurvaLuasDari(v)
                  setKurvaLuas(v); setLuasA(kb.aAwal); setLuasB(kb.bAwal)
                }}
              />
              <Pilihan
                nama="Yang dihitung" arti="keduanya tetap tertulis, yang dipilih ditegaskan"
                pilihan={YANG_DIHITUNG} nilai={modeLuas} onPilih={setModeLuas}
              />
              <Angka
                nama="a" arti="batas kiri, bisa juga diseret di gambar" kunci="a"
                nilai={luasA} onUbah={(v) => setLuasA(Math.min(v, luasB - 0.5))}
                min={kurvaLuasDari(kurvaLuas).ranah.min} max={kurvaLuasDari(kurvaLuas).ranah.maks} langkah={0.25}
              />
              <Angka
                nama="b" arti="batas kanan, bisa juga diseret di gambar" kunci="b"
                nilai={luasB} onUbah={(v) => setLuasB(Math.max(v, luasA + 0.5))}
                min={kurvaLuasDari(kurvaLuas).ranah.min} max={kurvaLuasDari(kurvaLuas).ranah.maks} langkah={0.25}
              />
              <Kembalikan
                onClick={() => {
                  setKurvaLuas(AWAL_LUAS.kurva); setLuasA(AWAL_LUAS.a)
                  setLuasB(AWAL_LUAS.b); setModeLuas(AWAL_LUAS.mode)
                }}
              />
              <Petunjuk>
                letakkan batas sehingga daerah biru dan merah sama besar. Hasil integralnya
                jadi nol sementara luasnya tidak.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'dua-kurva' && (
          <>
            <div className="layar">
              <DuaKurva
                pasangan={pasangan}
                a={duaA}
                b={duaB}
                n={duaN}
                onGeser={(yang, nilai) => (yang === 'a' ? setDuaA(nilai) : setDuaB(nilai))}
              />
            </div>
            <div className="kendali">
              <Pilihan
                nama="Dua kurvanya" arti="yang pertama biru, yang kedua emas"
                pilihan={PASANGAN.map((p) => ({ nilai: p.nilai, label: p.label }))}
                nilai={pasangan}
                onPilih={(v) => {
                  const pb = pasanganDari(v)
                  setPasangan(v); setDuaA(pb.aAwal); setDuaB(pb.bAwal)
                }}
              />
              <Angka
                nama="Banyak bagian n" arti="persegi panjangnya sekarang setinggi selisih dua kurva" kunci="n"
                nilai={duaN} onUbah={setDuaN}
                min={BATAS_N_DUA.min} max={BATAS_N_DUA.maks} langkah={BATAS_N_DUA.langkah}
              />
              <Angka
                nama="a" arti="batas kiri, bisa juga diseret di gambar" kunci="a"
                nilai={duaA} onUbah={(v) => setDuaA(Math.min(v, duaB - 0.25))}
                min={pasanganDari(pasangan).ranah.min} max={pasanganDari(pasangan).ranah.maks} langkah={0.25}
              />
              <Angka
                nama="b" arti="batas kanan, bisa juga diseret di gambar" kunci="b"
                nilai={duaB} onUbah={(v) => setDuaB(Math.max(v, duaA + 0.25))}
                min={pasanganDari(pasangan).ranah.min} max={pasanganDari(pasangan).ranah.maks} langkah={0.25}
              />
              <Kembalikan
                onClick={() => {
                  const pb = pasanganDari(pasangan)
                  setDuaA(pb.potongKiri); setDuaB(pb.potongKanan); setDuaN(AWAL_DUA.n)
                }}
              />
              <Petunjuk>
                geser batas melewati titik potong, dan persegi panjangnya berbalik warna:
                di sana kurva yang di atas sudah bertukar.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'luas-yang-tumbuh' && (
          <>
            <div className="layar">
              <LuasYangTumbuh kurva={kurvaTumbuh} x={tumbuhX} onGeserX={setTumbuhX} />
            </div>
            <div className="kendali">
              <Pilihan
                nama="Kurvanya" arti="papan bawah ikut berganti mengikuti pilihan ini"
                pilihan={KURVA_TUMBUH.map((k) => ({ nilai: k.nilai, label: k.label }))}
                nilai={kurvaTumbuh} onPilih={setKurvaTumbuh}
              />
              <Angka
                nama="x" arti="batas kanan daerah, bisa juga diseret di gambar" kunci="x"
                nilai={tumbuhX} onUbah={setTumbuhX}
                min={BATAS_X_TUMBUH.min} max={BATAS_X_TUMBUH.maks} langkah={BATAS_X_TUMBUH.langkah}
              />
              <Kembalikan
                onClick={() => { setKurvaTumbuh(AWAL_TUMBUH.kurva); setTumbuhX(AWAL_TUMBUH.x) }}
              />
              <Petunjuk>
                perhatikan pita di ujung kanan: tingginya persis f(x), dan itulah kemiringan
                kurva di papan bawah.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget
          && tahap.widget !== 'mesin-balik'
          && tahap.widget !== 'naik-pangkat'
          && tahap.widget !== 'persegi-panjang-menumpuk'
          && tahap.widget !== 'pecah-selang'
          && tahap.widget !== 'luas-dua-daerah'
          && tahap.widget !== 'dua-kurva'
          && tahap.widget !== 'luas-yang-tumbuh'
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
