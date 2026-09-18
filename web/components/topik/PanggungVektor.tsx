'use client'

import { useState, type ReactNode } from 'react'
import PecahKomponen, { BATAS as PecahBatas } from '@/components/widget/vektor/PecahKomponen'
import PerahuSungai, { BATAS as PerahuBatas, LEBAR_SUNGAI, hasilSeberang } from '@/components/widget/vektor/PerahuSungai'
import PanahBerpindah, { ACUAN, BATAS as PanahBerpindahBatas, nilaiHubungan } from '@/components/widget/vektor/PanahBerpindah'
import PanjangDanArah, { BATAS as ArahBatas } from '@/components/widget/vektor/PanjangDanArah'
import VektorSatuan, { BATAS as SatuanBatas } from '@/components/widget/vektor/VektorSatuan'
import SambungPanah, { BATAS as SambungBatas } from '@/components/widget/vektor/SambungPanah'
import JajarGenjang, { BATAS as JajarBatas } from '@/components/widget/vektor/JajarGenjang'
import SelisihPanah, { BATAS as SelisihBatas } from '@/components/widget/vektor/SelisihPanah'
import KaliSkalar, { BATAS as KaliBatas, BATAS_K } from '@/components/widget/vektor/KaliSkalar'
import PerkalianTitik, { BATAS as TitikBatas } from '@/components/widget/vektor/PerkalianTitik'
import Proyeksi, { BATAS as ProyeksiBatas } from '@/components/widget/vektor/Proyeksi'
import DuniaNyataVektor from '@/components/widget/vektor/DuniaNyataVektor'
import {
  angka, kali, kurang, mataAngin, panjang, panjangProyeksi, satuan, sudutAntara,
  sudutDerajat, tambah, titik, vektorProyeksi, type Vek,
} from '@/components/widget/vektor/geometri'
import type { PropPanggung } from '@/components/topik/jenis'
import { Angka, Kembalikan, Koordinat, Petunjuk } from '@/components/kendali'
import TeksMat from '@/components/latihan/TeksMat'

/**
 * Panggung Vektor: penyetelan widgetnya, dan tidak lebih.
 *
 * Bentuknya meniru PanggungLimit dan PanggungTrigonometri. Rangka halaman tidak
 * tahu apa-apa soal isi topik ini, dan sebaliknya berkas ini tidak tahu apa-apa
 * soal tab, kunci kuis, atau penghitung waktu membaca.
 *
 * Keadaan tiap widget dipegang di sini, bukan di dalam widgetnya, supaya tidak
 * hilang saat siswa berpindah materi lalu kembali lagi.
 */
/** Keadaan awal tiap widget; dipakai lagi oleh tombol Kembalikan semula. */
const AWAL = {
  dayung: { x: 0, y: 3 } as Vek,
  arus: { x: 4, y: 0 } as Vek,
  pangkalCoba: { x: 1, y: -1 } as Vek,
  ujungCoba: { x: 4, y: 1 } as Vek,
  vKomponen: { x: 4, y: 3 } as Vek,
  vArah: { x: 4, y: 3 } as Vek,
  vSatuan: { x: 4, y: 3 } as Vek,
  aSambung: { x: 3, y: 1 } as Vek,
  bSambung: { x: 1, y: 2 } as Vek,
  aJajar: { x: 3, y: 0.5 } as Vek,
  bJajar: { x: 1, y: 2 } as Vek,
  aSelisih: { x: 3, y: 1 } as Vek,
  bSelisih: { x: 1, y: 2 } as Vek,
  aKali: { x: 2, y: 1 } as Vek,
  aTitik: { x: 4, y: 1 } as Vek,
  bTitik: { x: 1, y: 3 } as Vek,
  aProyeksi: { x: 2, y: 3 } as Vek,
  bProyeksi: { x: 4, y: 1 } as Vek,
  k: 2,
}

export default function PanggungVektor({ tahap, tampilWidget, children }: PropPanggung) {
  const [dayung, setDayung] = useState<Vek>(AWAL.dayung)
  // Arus 4, bukan 2: sama dengan angka di video Materi 01, sehingga kasus
  // sungainya sendiri sudah kasus tegak lurus yang hasilnya tepat 5.
  const [arus, setArus] = useState<Vek>(AWAL.arus)
  const [pangkalCoba, setPangkalCoba] = useState<Vek>(AWAL.pangkalCoba)
  const [ujungCoba, setUjungCoba] = useState<Vek>(AWAL.ujungCoba)
  const [vKomponen, setVKomponen] = useState<Vek>(AWAL.vKomponen)
  const [vArah, setVArah] = useState<Vek>(AWAL.vArah)
  const [vSatuan, setVSatuan] = useState<Vek>(AWAL.vSatuan)
  const [aSambung, setASambung] = useState<Vek>(AWAL.aSambung)
  const [bSambung, setBSambung] = useState<Vek>(AWAL.bSambung)
  const [aJajar, setAJajar] = useState<Vek>(AWAL.aJajar)
  const [bJajar, setBJajar] = useState<Vek>(AWAL.bJajar)
  // Nilai awalnya sengaja sama dengan contoh berhitung di naskah Materi 08,
  // supaya gambar dan hitungan yang dibaca siswa bercerita hal yang sama.
  const [aSelisih, setASelisih] = useState<Vek>(AWAL.aSelisih)
  const [bSelisih, setBSelisih] = useState<Vek>(AWAL.bSelisih)
  const [aKali, setAKali] = useState<Vek>(AWAL.aKali)
  const [k, setK] = useState(AWAL.k)
  const [aTitik, setATitik] = useState<Vek>(AWAL.aTitik)
  const [bTitik, setBTitik] = useState<Vek>(AWAL.bTitik)
  const [aProyeksi, setAProyeksi] = useState<Vek>(AWAL.aProyeksi)
  const [bProyeksi, setBProyeksi] = useState<Vek>(AWAL.bProyeksi)

  let kiri: ReactNode = null
  let kanan: ReactNode = null
  let tanda = 'BACAAN'

  if (tahap) {
    if (tahap.widget === 'dunia-nyata-vektor') tanda = 'CONTOH NYATA'
    else if (tahap.widget) tanda = 'INTERAKTIF'

    const gerak = tambah(dayung, arus)
    const seberang = hasilSeberang(gerak)
    const coba = kurang(ujungCoba, pangkalCoba)
    const acuan = kurang(ACUAN.ujung, ACUAN.pangkal)
    const hubungan = nilaiHubungan(coba, acuan)
    const eSatuan = satuan(vSatuan)
    const hasilSambung = tambah(aSambung, bSambung)
    const hasilJajar = tambah(aJajar, bJajar)
    const hasilSelisih = kurang(aSelisih, bSelisih)
    const hasilKali = kali(k, aKali)
    const hasilTitik = titik(aTitik, bTitik)
    const sudutTitik = sudutAntara(aTitik, bTitik)
    const bayangan = vektorProyeksi(aProyeksi, bProyeksi)
    const panjangBayangan = panjangProyeksi(aProyeksi, bProyeksi)

    kiri = (
      <>
        {tampilWidget && tahap.widget === 'perahu-sungai' && (
          <>
            <div className="layar">
              <PerahuSungai
                dayung={dayung} arus={arus}
                onUbah={(d, a) => { setDayung(d); setArus(a) }}
              />
            </div>
            <div className="kendali">
              <Koordinat nama="Dayung" arti="perpindahan mendayung 1 jam, km" kunci="dayung"
                nilai={dayung} onUbah={setDayung} batas={PerahuBatas} />
              <Koordinat nama="Arus" arti="perpindahan terbawa arus 1 jam, km" kunci="arus"
                nilai={arus} onUbah={setArus} batas={PerahuBatas} />
              <Kembalikan onClick={() => { setDayung(AWAL.dayung); setArus(AWAL.arus) }} />
              <Petunjuk>
                ketik atau tarik dayung dan arus, lalu perhatikan titik mendaratnya. Coba arahkan dayung melawan arus.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'panah-berpindah' && (
          <>
            <div className="layar">
              <PanahBerpindah
                pangkal={pangkalCoba} ujung={ujungCoba}
                onUbah={(p, u) => { setPangkalCoba(p); setUjungCoba(u) }}
              />
            </div>
            <div className="kendali">
              <Koordinat nama="Pangkal" arti="titik awal panah coba" kunci="pangkal" vektor={false}
                nilai={pangkalCoba} onUbah={setPangkalCoba} batas={PanahBerpindahBatas} />
              <Koordinat nama="Ujung" arti="titik akhir panah coba" kunci="ujung" vektor={false}
                nilai={ujungCoba} onUbah={setUjungCoba} batas={PanahBerpindahBatas} />
              <Kembalikan onClick={() => { setPangkalCoba(AWAL.pangkalCoba); setUjungCoba(AWAL.ujungCoba) }} />
              <Petunjuk>
                pindahkan pangkal DAN ujung dengan selisih yang sama, lalu lihat penilaiannya tidak berubah: letak memang tidak ikut menentukan.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'pecah-komponen' && (
          <>
            <div className="layar">
              <PecahKomponen v={vKomponen} onUbah={setVKomponen} />
            </div>
            <div className="kendali">
              <Koordinat nama="v" arti="panah hitam, komponen mendatar dan tegak" kunci="v"
                nilai={vKomponen} onUbah={setVKomponen} batas={PecahBatas} />
              <Kembalikan onClick={() => { setVKomponen(AWAL.vKomponen) }} />
              <Petunjuk>
                ketik x dan y, atau tarik ujung panahnya, lalu perhatikan kedua angka komponennya berubah.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'panjang-dan-arah' && (
          <>
            <div className="layar">
              <PanjangDanArah v={vArah} onUbah={setVArah} />
            </div>
            <div className="kendali">
              <Koordinat nama="v" arti="panahnya" kunci="v"
                nilai={vArah} onUbah={setVArah} batas={ArahBatas} />
              <Kembalikan onClick={() => { setVArah(AWAL.vArah) }} />
              <Petunjuk>
                putar panahnya sambil menjaga panjangnya. Panjangnya tidak pernah negatif, seberapa pun arahnya diubah.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'vektor-satuan' && (
          <>
            <div className="layar">
              <VektorSatuan v={vSatuan} onUbah={setVSatuan} />
            </div>
            <div className="kendali">
              <Koordinat nama="v" arti="panah hitam" kunci="v"
                nilai={vSatuan} onUbah={setVSatuan} batas={SatuanBatas} />
              <Kembalikan onClick={() => { setVSatuan(AWAL.vSatuan) }} />
              <Petunjuk>
                panjangkan dan pendekkan panah hitamnya. Panah ungunya tetap sepanjang 1, yang berubah hanya arahnya.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'sambung-panah' && (
          <>
            <div className="layar">
              <SambungPanah
                a={aSambung} b={bSambung}
                onUbah={(a, b) => { setASambung(a); setBSambung(b) }}
              />
            </div>
            <div className="kendali">
              <Koordinat nama="a" arti="panah biru" kunci="a"
                nilai={aSambung} onUbah={setASambung} batas={SambungBatas} />
              <Koordinat nama="b" arti="panah merah, berangkat dari ujung a" kunci="b"
                nilai={bSambung} onUbah={setBSambung} batas={SambungBatas} />
              <Kembalikan onClick={() => { setASambung(AWAL.aSambung); setBSambung(AWAL.bSambung) }} />
              <Petunjuk>
                ubah a atau b, lalu perhatikan panah merah selalu berangkat dari tempat panah biru berhenti.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'jajar-genjang' && (
          <>
            <div className="layar">
              <JajarGenjang
                a={aJajar} b={bJajar}
                onUbah={(a, b) => { setAJajar(a); setBJajar(b) }}
              />
            </div>
            <div className="kendali">
              <Koordinat nama="a" arti="panah biru" kunci="a"
                nilai={aJajar} onUbah={setAJajar} batas={JajarBatas} />
              <Koordinat nama="b" arti="panah merah, berangkat dari titik yang sama" kunci="b"
                nilai={bJajar} onUbah={setBJajar} batas={JajarBatas} />
              <Kembalikan onClick={() => { setAJajar(AWAL.aJajar); setBJajar(AWAL.bJajar) }} />
              <Petunjuk>
                dekatkan keduanya sampai hampir sejajar, lalu jauhkan sampai hampir berlawanan, dan perhatikan panjang resultannya.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'selisih-panah' && (
          <>
            <div className="layar">
              <SelisihPanah
                a={aSelisih} b={bSelisih}
                onUbah={(a, b) => { setASelisih(a); setBSelisih(b) }}
              />
            </div>
            <div className="kendali">
              <Koordinat nama="a" arti="panah biru" kunci="a"
                nilai={aSelisih} onUbah={setASelisih} batas={SelisihBatas} />
              <Koordinat nama="b" arti="panah merah" kunci="b"
                nilai={bSelisih} onUbah={setBSelisih} batas={SelisihBatas} />
              <Kembalikan onClick={() => { setASelisih(AWAL.aSelisih); setBSelisih(AWAL.bSelisih) }} />
              <Petunjuk>
                perhatikan panah ungu muncul dua kali: dari titik asal, dan dari ujung b menuju ujung a. Keduanya panah yang sama.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'kali-skalar' && (
          <>
            <div className="layar">
              <KaliSkalar a={aKali} k={k} onUbah={setAKali} />
            </div>
            <div className="kendali">
              <Koordinat nama="a" arti="panah yang dikalikan" kunci="a"
                nilai={aKali} onUbah={setAKali} batas={KaliBatas} />
              <Angka nama="Pengali" arti="angka k yang mengalikan a" kunci="k"
                nilai={k} onUbah={setK}
                min={BATAS_K.min} max={BATAS_K.maks} langkah={BATAS_K.langkah} />
              <Kembalikan onClick={() => { setAKali(AWAL.aKali); setK(AWAL.k) }} />
              <Petunjuk>
                geser pengali melewati nol perlahan. Panahnya lenyap sesaat, lalu muncul lagi menghadap arah yang berlawanan.
              </Petunjuk>
            </div>
          </>
        )}

        {tahap.widget === 'dunia-nyata-vektor' && (
          <div className="isi-gulir">
            <DuniaNyataVektor />
          </div>
        )}

        {tampilWidget && tahap.widget === 'perkalian-titik' && (
          <>
            <div className="layar">
              <PerkalianTitik
                a={aTitik} b={bTitik}
                onUbah={(a, b) => { setATitik(a); setBTitik(b) }}
              />
            </div>
            <div className="kendali">
              <Koordinat nama="a" arti="panah biru" kunci="a"
                nilai={aTitik} onUbah={setATitik} batas={TitikBatas} />
              <Koordinat nama="b" arti="panah merah" kunci="b"
                nilai={bTitik} onUbah={setBTitik} batas={TitikBatas} />
              <Kembalikan onClick={() => { setATitik(AWAL.aTitik); setBTitik(AWAL.bTitik) }} />
              <Petunjuk>
                putar salah satu panah melewati sudut siku-siku. Hasil kalinya berganti tanda tepat saat kedua panah tegak lurus.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'proyeksi' && (
          <>
            <div className="layar">
              <Proyeksi
                a={aProyeksi} b={bProyeksi}
                onUbah={(a, b) => { setAProyeksi(a); setBProyeksi(b) }}
              />
            </div>
            <div className="kendali">
              <Koordinat nama="a" arti="panah biru, yang diproyeksikan" kunci="a"
                nilai={aProyeksi} onUbah={setAProyeksi} batas={ProyeksiBatas} />
              <Koordinat nama="b" arti="panah merah, arah proyeksinya" kunci="b"
                nilai={bProyeksi} onUbah={setBProyeksi} batas={ProyeksiBatas} />
              <Kembalikan onClick={() => { setAProyeksi(AWAL.aProyeksi); setBProyeksi(AWAL.bProyeksi) }} />
              <Petunjuk>
                putar panah biru sampai melewati garis panah merah. Bayangannya menyusut, lenyap, lalu muncul di sisi berlawanan dengan panjang bertanda negatif.
              </Petunjuk>
            </div>
          </>
        )}

      </>
    )

    kanan = (
      <>
        {tampilWidget && tahap.widget === 'perahu-sungai' && (
          <div className="blok">
            <div className="cap"><TeksMat teks="Angka dari alat" blok={false} /></div>
            <table className="tabel-angka">
              <tbody>
                <tr><td><TeksMat teks="dayung dalam 1 jam" blok={false} /></td><td><TeksMat teks={`(${angka(dayung.x, 1)}  ${angka(dayung.y, 1)}) km`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="arus dalam 1 jam" blok={false} /></td><td><TeksMat teks={`(${angka(arus.x, 1)}  ${angka(arus.y, 1)}) km`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="gerak sebenarnya" blok={false} /></td><td><TeksMat teks={`(${angka(gerak.x, 1)}  ${angka(gerak.y, 1)}) km`} blok={false} /></td></tr>
                <tr className="tegas">
                  <td><TeksMat teks="hanyut ke hilir" blok={false} /></td>
                  <td><TeksMat teks={`${seberang ? `${angka(seberang.hanyut, 2)} km` : 'tidak sampai'}`} blok={false} /></td>
                </tr>
              </tbody>
            </table>
            <div className="catatan"><TeksMat teks={`${seberang
                ? `Sungainya selebar ${LEBAR_SUNGAI} km, dan gerak tegaknya ${angka(gerak.y, 1)} km per jam, jadi menyeberang butuh ${angka(seberang.waktu, 2)} jam. Selama itu arus sempat membawanya ${angka(seberang.hanyut, 2)} km ke hilir.`
                : 'Gerak tegaknya nol atau justru menjauh dari seberang, jadi perahunya hanya terbawa arus. Ini bukan kerusakan alat: menghadapkan dayung ke arah yang salah memang berakibat begitu.'}`} /></div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'panah-berpindah' && (
          <div className="blok">
            <div className="cap"><TeksMat teks="Membandingkan kedua panah" blok={false} /></div>
            <table className="tabel-angka">
              <tbody>
                <tr><td><TeksMat teks="acuan" blok={false} /></td><td><TeksMat teks={`(${angka(acuan.x, 1)}  ${angka(acuan.y, 1)})`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="panah coba" blok={false} /></td><td><TeksMat teks={`(${angka(coba.x, 1)}  ${angka(coba.y, 1)})`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="panjang acuan" blok={false} /></td><td>{angka(panjang(acuan), 3)}</td></tr>
                <tr className="tegas"><td><TeksMat teks="panjang panah coba" blok={false} /></td><td>{angka(panjang(coba), 3)}</td></tr>
              </tbody>
            </table>
            <div className="catatan"><TeksMat teks={`${hubungan.kalimat}. Perhatikan tabel ini hanya berisi KOMPONEN dan PANJANG, tidak satu pun menyebut letak. Letak memang tidak ikut menentukan.`} /></div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'pecah-komponen' && (
          <div className="blok">
            <div className="cap"><TeksMat teks="Angka dari alat" blok={false} /></div>
            <table className="tabel-angka">
              <tbody>
                <tr><td><TeksMat teks="komponen mendatar" blok={false} /></td><td>{angka(vKomponen.x, 1)}</td></tr>
                <tr><td><TeksMat teks="komponen tegak" blok={false} /></td><td>{angka(vKomponen.y, 1)}</td></tr>
                <tr><td><TeksMat teks="ditulis vektor baris" blok={false} /></td><td><TeksMat teks={`(${angka(vKomponen.x, 1)}  ${angka(vKomponen.y, 1)})`} blok={false} /></td></tr>
                <tr className="tegas"><td><TeksMat teks="panjang panah" blok={false} /></td><td>{angka(panjang(vKomponen), 3)}</td></tr>
              </tbody>
            </table>
            <div className="catatan"><TeksMat teks={`Panjangnya berasal dari Pythagoras: akar dari ${angka(vKomponen.x, 1)} kuadrat ditambah ${angka(vKomponen.y, 1)} kuadrat. Perhitungan itu dibahas tuntas di Materi 04.`} /></div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'panjang-dan-arah' && (
          <div className="blok">
            <div className="cap"><TeksMat teks="Angka dari alat" blok={false} /></div>
            <table className="tabel-angka">
              <tbody>
                <tr><td><TeksMat teks="komponen" blok={false} /></td><td><TeksMat teks={`(${angka(vArah.x, 1)}  ${angka(vArah.y, 1)})`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="kuadratnya dijumlahkan" blok={false} /></td><td>{angka(vArah.x * vArah.x + vArah.y * vArah.y, 2)}</td></tr>
                <tr><td><TeksMat teks="arah dari sumbu-x" blok={false} /></td><td>{angka(sudutDerajat(vArah), 1)}°</td></tr>
                <tr className="tegas"><td><TeksMat teks="panjang, yaitu akarnya" blok={false} /></td><td>{angka(panjang(vArah), 3)}</td></tr>
              </tbody>
            </table>
            <div className="catatan"><TeksMat teks={`Arah itu setara dengan ${mataAngin(vArah)}. Perhatikan komponennya boleh negatif, tetapi panjangnya tidak pernah: dikuadratkan dulu, tanda minusnya hilang di situ.`} /></div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'vektor-satuan' && (
          <div className="blok">
            <div className="cap"><TeksMat teks="Angka dari alat" blok={false} /></div>
            <table className="tabel-angka">
              <tbody>
                <tr><td><TeksMat teks="v" blok={false} /></td><td><TeksMat teks={`(${angka(vSatuan.x, 1)}  ${angka(vSatuan.y, 1)})`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="panjang v" blok={false} /></td><td>{angka(panjang(vSatuan), 3)}</td></tr>
                <tr><td><TeksMat teks="tiap komponen dibagi panjangnya" blok={false} /></td><td><TeksMat teks={`(${angka(eSatuan.x, 3)}  ${angka(eSatuan.y, 3)})`} blok={false} /></td></tr>
                <tr className="tegas"><td><TeksMat teks="panjang vektor satuan" blok={false} /></td><td>{angka(panjang(eSatuan), 3)}</td></tr>
              </tbody>
            </table>
            <div className="catatan"><TeksMat teks="Panjangnya selalu 1, berapa pun v-nya. Itu bukan kebetulan: membagi sebuah vektor dengan panjangnya sendiri memang menyisakan arahnya saja." /></div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'sambung-panah' && (
          <div className="blok">
            <div className="cap"><TeksMat teks="Menjumlahkan lewat komponen" blok={false} /></div>
            <table className="tabel-angka">
              <tbody>
                <tr><td><TeksMat teks="a" blok={false} /></td><td><TeksMat teks={`(${angka(aSambung.x, 1)}  ${angka(aSambung.y, 1)})`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="b" blok={false} /></td><td><TeksMat teks={`(${angka(bSambung.x, 1)}  ${angka(bSambung.y, 1)})`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="komponen mendatarnya dijumlah" blok={false} /></td><td><TeksMat teks={`${angka(aSambung.x, 1)} + ${angka(bSambung.x, 1)} = ${angka(hasilSambung.x, 1)}`} blok={false} /></td></tr>
                <tr className="tegas"><td><TeksMat teks="a + b" blok={false} /></td><td><TeksMat teks={`(${angka(hasilSambung.x, 1)}  ${angka(hasilSambung.y, 1)})`} blok={false} /></td></tr>
              </tbody>
            </table>
            <div className="catatan"><TeksMat teks={`Panjang a adalah ${angka(panjang(aSambung), 2)} dan panjang b adalah ${angka(panjang(bSambung), 2)}, tetapi panjang jumlahnya ${angka(panjang(hasilSambung), 2)}. Panjangnya tidak ikut dijumlahkan.`} /></div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'jajar-genjang' && (
          <div className="blok">
            <div className="cap"><TeksMat teks="Resultan dua vektor" blok={false} /></div>
            <table className="tabel-angka">
              <tbody>
                <tr><td><TeksMat teks="a" blok={false} /></td><td><TeksMat teks={`(${angka(aJajar.x, 1)}  ${angka(aJajar.y, 1)})`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="b" blok={false} /></td><td><TeksMat teks={`(${angka(bJajar.x, 1)}  ${angka(bJajar.y, 1)})`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="panjang a dan panjang b" blok={false} /></td><td><TeksMat teks={`${angka(panjang(aJajar), 2)} dan ${angka(panjang(bJajar), 2)}`} blok={false} /></td></tr>
                <tr className="tegas"><td><TeksMat teks="panjang resultan" blok={false} /></td><td>{angka(panjang(hasilJajar), 3)}</td></tr>
              </tbody>
            </table>
            <div className="catatan"><TeksMat teks="Angka resultannya sama persis dengan cara segitiga di Materi 06. Yang berbeda cuma gambarnya, dan gambar dipilih mengikuti ceritanya: berurutan atau serentak." /></div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'selisih-panah' && (
          <div className="blok">
            <div className="cap"><TeksMat teks="Mengurangi lewat komponen" blok={false} /></div>
            <table className="tabel-angka">
              <tbody>
                <tr><td><TeksMat teks="a" blok={false} /></td><td><TeksMat teks={`(${angka(aSelisih.x, 1)}  ${angka(aSelisih.y, 1)})`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="b" blok={false} /></td><td><TeksMat teks={`(${angka(bSelisih.x, 1)}  ${angka(bSelisih.y, 1)})`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="a - b" blok={false} /></td><td><TeksMat teks={`(${angka(hasilSelisih.x, 1)}  ${angka(hasilSelisih.y, 1)})`} blok={false} /></td></tr>
                <tr className="tegas"><td><TeksMat teks="b - a, kebalikannya" blok={false} /></td><td><TeksMat teks={`(${angka(-hasilSelisih.x, 1)}  ${angka(-hasilSelisih.y, 1)})`} blok={false} /></td></tr>
              </tbody>
            </table>
            <div className="catatan"><TeksMat teks="Kedua baris terakhir berlawanan tanda. Itu sebabnya urutan tidak boleh dibalik: a dikurangi b dan b dikurangi a adalah dua panah yang berlawanan arah." /></div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'kali-skalar' && (
          <div className="blok">
            <div className="cap"><TeksMat teks="Angka dari alat" blok={false} /></div>
            <table className="tabel-angka">
              <tbody>
                <tr><td><TeksMat teks="a" blok={false} /></td><td><TeksMat teks={`(${angka(aKali.x, 1)}  ${angka(aKali.y, 1)})`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="pengali" blok={false} /></td><td>{angka(k, 2)}</td></tr>
                <tr><td><TeksMat teks="hasilnya" blok={false} /></td><td><TeksMat teks={`(${angka(hasilKali.x, 2)}  ${angka(hasilKali.y, 2)})`} blok={false} /></td></tr>
                <tr className="tegas">
                  <td><TeksMat teks="panjangnya berubah" blok={false} /></td>
                  <td><TeksMat teks={`${angka(panjang(aKali), 2)} menjadi ${angka(panjang(hasilKali), 2)}`} blok={false} /></td>
                </tr>
              </tbody>
            </table>
            <div className="catatan"><TeksMat teks={`${k > 0
                ? 'Pengali positif tidak mengubah arah sama sekali, hanya panjangnya.'
                : k < 0
                  ? 'Pengali negatif membalik arahnya, dan panjangnya mengikuti nilai pengali tanpa tandanya. Panjang tetap tidak negatif.'
                  : 'Pengali nol memberi vektor nol: panjangnya nol dan arahnya tidak ada.'}`} /></div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'perkalian-titik' && (
          <div className="blok">
            <div className="cap"><TeksMat teks="Angka dari alat" blok={false} /></div>
            <table className="tabel-angka">
              <tbody>
                <tr><td><TeksMat teks="a" blok={false} /></td><td><TeksMat teks={`(${angka(aTitik.x, 1)}  ${angka(aTitik.y, 1)})`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="b" blok={false} /></td><td><TeksMat teks={`(${angka(bTitik.x, 1)}  ${angka(bTitik.y, 1)})`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="lewat komponen" blok={false} /></td><td><TeksMat teks={`${angka(aTitik.x, 1)}(${angka(bTitik.x, 1)}) + ${angka(aTitik.y, 1)}(${angka(bTitik.y, 1)})`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="sudut antara keduanya" blok={false} /></td><td>{angka(sudutTitik, 1)}°</td></tr>
                <tr className="tegas"><td><TeksMat teks="a . b" blok={false} /></td><td><TeksMat teks={`${Math.abs(hasilTitik) < 0.005 ? '0' : angka(hasilTitik, 2)}`} blok={false} /></td></tr>
              </tbody>
            </table>
            <div className="catatan"><TeksMat teks={`Lewat panjang dan sudut hasilnya sama: ${angka(panjang(aTitik), 2)} dikali ${angka(panjang(bTitik), 2)} dikali kosinus ${angka(sudutTitik, 1)} derajat. Perhatikan hasilnya sebuah angka, bukan panah.`} /></div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'proyeksi' && (
          <div className="blok">
            <div className="cap"><TeksMat teks="Angka dari alat" blok={false} /></div>
            <table className="tabel-angka">
              <tbody>
                <tr><td><TeksMat teks="a" blok={false} /></td><td><TeksMat teks={`(${angka(aProyeksi.x, 1)}  ${angka(aProyeksi.y, 1)})`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="b" blok={false} /></td><td><TeksMat teks={`(${angka(bProyeksi.x, 1)}  ${angka(bProyeksi.y, 1)})`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="a . b dibagi panjang b" blok={false} /></td><td><TeksMat teks={`${angka(titik(aProyeksi, bProyeksi), 2)} dibagi ${angka(panjang(bProyeksi), 2)}`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="panjang proyeksinya" blok={false} /></td><td>{angka(panjangBayangan, 3)}</td></tr>
                <tr className="tegas"><td><TeksMat teks="vektor proyeksinya" blok={false} /></td><td><TeksMat teks={`(${angka(bayangan.x, 2)}  ${angka(bayangan.y, 2)})`} blok={false} /></td></tr>
              </tbody>
            </table>
            <div className="catatan"><TeksMat teks={`${panjangBayangan < 0
                ? 'Panjang proyeksinya negatif, dan itu benar: bayangannya jatuh ke arah yang berlawanan dengan b, sebab sudut keduanya tumpul.'
                : 'Baris keempat sebuah angka, baris kelima sebuah panah. Keduanya disebut proyeksi, jadi bacalah soalnya baik-baik: yang diminta panjangnya atau vektornya.'}`} /></div>
          </div>
        )}
      </>
    )
  }

  return <>{children({ kiri, kanan, tanda })}</>
}
