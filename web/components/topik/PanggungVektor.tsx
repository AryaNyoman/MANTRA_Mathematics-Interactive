'use client'

import { useState, type ReactNode } from 'react'
import PecahKomponen from '@/components/widget/vektor/PecahKomponen'
import PerahuSungai, { LEBAR_SUNGAI, hasilSeberang } from '@/components/widget/vektor/PerahuSungai'
import PanahBerpindah, { ACUAN, nilaiHubungan } from '@/components/widget/vektor/PanahBerpindah'
import PanjangDanArah from '@/components/widget/vektor/PanjangDanArah'
import VektorSatuan from '@/components/widget/vektor/VektorSatuan'
import SambungPanah from '@/components/widget/vektor/SambungPanah'
import JajarGenjang from '@/components/widget/vektor/JajarGenjang'
import SelisihPanah from '@/components/widget/vektor/SelisihPanah'
import KaliSkalar, { BATAS_K } from '@/components/widget/vektor/KaliSkalar'
import PerkalianTitik from '@/components/widget/vektor/PerkalianTitik'
import Proyeksi from '@/components/widget/vektor/Proyeksi'
import DuniaNyataVektor from '@/components/widget/vektor/DuniaNyataVektor'
import {
  angka, kali, kurang, mataAngin, panjang, panjangProyeksi, satuan, sudutAntara,
  sudutDerajat, tambah, titik, vektorProyeksi, type Vek,
} from '@/components/widget/vektor/geometri'
import type { PropPanggung } from '@/components/topik/jenis'

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
export default function PanggungVektor({ tahap, tampilWidget, children }: PropPanggung) {
  const [dayung, setDayung] = useState<Vek>({ x: 0, y: 3 })
  // Arus 4, bukan 2: sama dengan angka di video Materi 01, sehingga kasus
  // sungainya sendiri sudah kasus tegak lurus yang hasilnya tepat 5.
  const [arus, setArus] = useState<Vek>({ x: 4, y: 0 })
  const [pangkalCoba, setPangkalCoba] = useState<Vek>({ x: 1, y: -1 })
  const [ujungCoba, setUjungCoba] = useState<Vek>({ x: 4, y: 1 })
  const [vKomponen, setVKomponen] = useState<Vek>({ x: 4, y: 3 })
  const [vArah, setVArah] = useState<Vek>({ x: 4, y: 3 })
  const [vSatuan, setVSatuan] = useState<Vek>({ x: 4, y: 3 })
  const [aSambung, setASambung] = useState<Vek>({ x: 3, y: 1 })
  const [bSambung, setBSambung] = useState<Vek>({ x: 1, y: 2 })
  const [aJajar, setAJajar] = useState<Vek>({ x: 3, y: 0.5 })
  const [bJajar, setBJajar] = useState<Vek>({ x: 1, y: 2 })
  // Nilai awalnya sengaja sama dengan contoh berhitung di naskah Materi 08,
  // supaya gambar dan hitungan yang dibaca siswa bercerita hal yang sama.
  const [aSelisih, setASelisih] = useState<Vek>({ x: 3, y: 1 })
  const [bSelisih, setBSelisih] = useState<Vek>({ x: 1, y: 2 })
  const [aKali, setAKali] = useState<Vek>({ x: 2, y: 1 })
  const [k, setK] = useState(2)
  const [aTitik, setATitik] = useState<Vek>({ x: 4, y: 1 })
  const [bTitik, setBTitik] = useState<Vek>({ x: 1, y: 3 })
  const [aProyeksi, setAProyeksi] = useState<Vek>({ x: 2, y: 3 })
  const [bProyeksi, setBProyeksi] = useState<Vek>({ x: 4, y: 1 })

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
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  tarik ujung panah biru (dayung) atau merah (arus). Coba juga arahkan dayung
                  melawan arus, lalu perhatikan titik mendaratnya bergeser
                </span>
              </div>
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
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  pangkal DAN ujungnya sama-sama bisa ditarik. Pindahkan seluruh panahnya tanpa
                  mengubah bentuk, lalu lihat penilaiannya tidak berubah
                </span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'pecah-komponen' && (
          <>
            <div className="layar">
              <PecahKomponen v={vKomponen} onUbah={setVKomponen} />
            </div>
            <div className="kendali">
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  tarik ujung panah hitamnya, lalu perhatikan kedua angka komponennya berubah
                </span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'panjang-dan-arah' && (
          <>
            <div className="layar">
              <PanjangDanArah v={vArah} onUbah={setVArah} />
            </div>
            <div className="kendali">
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  putar panahnya sambil menjaga panjangnya. Panjangnya tidak pernah negatif,
                  seberapa pun arahnya diubah
                </span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'vektor-satuan' && (
          <>
            <div className="layar">
              <VektorSatuan v={vSatuan} onUbah={setVSatuan} />
            </div>
            <div className="kendali">
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  panjangkan dan pendekkan panah hitamnya. Panah ungunya tetap sepanjang 1,
                  yang berubah hanya arahnya
                </span>
              </div>
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
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  tarik ujung panah biru atau ujung panah merah. Panah merah selalu berangkat
                  dari tempat panah biru berhenti
                </span>
              </div>
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
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  keduanya berangkat dari satu titik. Coba dekatkan sampai hampir sejajar, lalu
                  jauhkan sampai hampir berlawanan
                </span>
              </div>
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
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  perhatikan panah ungu muncul dua kali: dari titik asal, dan dari ujung b menuju
                  ujung a. Keduanya panah yang sama
                </span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'kali-skalar' && (
          <>
            <div className="layar">
              <KaliSkalar a={aKali} k={k} onUbah={setAKali} />
            </div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="pengali">
                  <span>Pengali</span>
                  <span className="mono">{angka(k, 2)}</span>
                </label>
                <input
                  id="pengali" type="range"
                  min={BATAS_K.min} max={BATAS_K.maks} step={BATAS_K.langkah} value={k}
                  onChange={(e) => setK(+e.target.value)}
                />
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>
                  lewati angka nol perlahan. Panahnya lenyap sesaat, lalu muncul lagi menghadap
                  arah yang berlawanan
                </span>
              </div>
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
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  putar salah satu panah melewati sudut siku-siku. Angkanya berganti tanda tepat
                  saat kedua panah tegak lurus
                </span>
              </div>
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
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  putar panah biru sampai melewati garis panah merah. Bayangannya menyusut, lenyap,
                  lalu muncul di sisi yang berlawanan dengan panjang bertanda negatif
                </span>
              </div>
            </div>
          </>
        )}
      </>
    )

    kanan = (
      <>
        {tampilWidget && tahap.widget === 'perahu-sungai' && (
          <div className="blok">
            <div className="cap">Angka dari alat</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>dayung dalam 1 jam</td><td>({angka(dayung.x, 1)}  {angka(dayung.y, 1)}) km</td></tr>
                <tr><td>arus dalam 1 jam</td><td>({angka(arus.x, 1)}  {angka(arus.y, 1)}) km</td></tr>
                <tr><td>gerak sebenarnya</td><td>({angka(gerak.x, 1)}  {angka(gerak.y, 1)}) km</td></tr>
                <tr className="tegas">
                  <td>hanyut ke hilir</td>
                  <td>{seberang ? `${angka(seberang.hanyut, 2)} km` : 'tidak sampai'}</td>
                </tr>
              </tbody>
            </table>
            <div className="catatan">
              {seberang
                ? `Sungainya selebar ${LEBAR_SUNGAI} km, dan gerak tegaknya ${angka(gerak.y, 1)} km per jam, jadi menyeberang butuh ${angka(seberang.waktu, 2)} jam. Selama itu arus sempat membawanya ${angka(seberang.hanyut, 2)} km ke hilir.`
                : 'Gerak tegaknya nol atau justru menjauh dari seberang, jadi perahunya hanya terbawa arus. Ini bukan kerusakan alat: menghadapkan dayung ke arah yang salah memang berakibat begitu.'}
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'panah-berpindah' && (
          <div className="blok">
            <div className="cap">Membandingkan kedua panah</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>acuan</td><td>({angka(acuan.x, 1)}  {angka(acuan.y, 1)})</td></tr>
                <tr><td>panah coba</td><td>({angka(coba.x, 1)}  {angka(coba.y, 1)})</td></tr>
                <tr><td>panjang acuan</td><td>{angka(panjang(acuan), 3)}</td></tr>
                <tr className="tegas"><td>panjang panah coba</td><td>{angka(panjang(coba), 3)}</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              {hubungan.kalimat}. Perhatikan tabel ini hanya berisi KOMPONEN dan PANJANG, tidak
              satu pun menyebut letak. Letak memang tidak ikut menentukan.
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'pecah-komponen' && (
          <div className="blok">
            <div className="cap">Angka dari alat</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>komponen mendatar</td><td>{angka(vKomponen.x, 1)}</td></tr>
                <tr><td>komponen tegak</td><td>{angka(vKomponen.y, 1)}</td></tr>
                <tr><td>ditulis vektor baris</td><td>({angka(vKomponen.x, 1)}  {angka(vKomponen.y, 1)})</td></tr>
                <tr className="tegas"><td>panjang panah</td><td>{angka(panjang(vKomponen), 3)}</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Panjangnya berasal dari Pythagoras: akar dari {angka(vKomponen.x, 1)} kuadrat
              ditambah {angka(vKomponen.y, 1)} kuadrat. Perhitungan itu dibahas tuntas di
              Materi 04.
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'panjang-dan-arah' && (
          <div className="blok">
            <div className="cap">Angka dari alat</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>komponen</td><td>({angka(vArah.x, 1)}  {angka(vArah.y, 1)})</td></tr>
                <tr><td>kuadratnya dijumlahkan</td><td>{angka(vArah.x * vArah.x + vArah.y * vArah.y, 2)}</td></tr>
                <tr><td>arah dari sumbu mendatar</td><td>{angka(sudutDerajat(vArah), 1)}°</td></tr>
                <tr className="tegas"><td>panjang, yaitu akarnya</td><td>{angka(panjang(vArah), 3)}</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Arah itu setara dengan {mataAngin(vArah)}. Perhatikan komponennya boleh negatif,
              tetapi panjangnya tidak pernah: dikuadratkan dulu, tanda minusnya hilang di situ.
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'vektor-satuan' && (
          <div className="blok">
            <div className="cap">Angka dari alat</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>v</td><td>({angka(vSatuan.x, 1)}  {angka(vSatuan.y, 1)})</td></tr>
                <tr><td>panjang v</td><td>{angka(panjang(vSatuan), 3)}</td></tr>
                <tr><td>tiap komponen dibagi panjangnya</td><td>({angka(eSatuan.x, 3)}  {angka(eSatuan.y, 3)})</td></tr>
                <tr className="tegas"><td>panjang vektor satuan</td><td>{angka(panjang(eSatuan), 3)}</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Panjangnya selalu 1, berapa pun v-nya. Itu bukan kebetulan: membagi sebuah vektor
              dengan panjangnya sendiri memang menyisakan arahnya saja.
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'sambung-panah' && (
          <div className="blok">
            <div className="cap">Menjumlahkan lewat komponen</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>a</td><td>({angka(aSambung.x, 1)}  {angka(aSambung.y, 1)})</td></tr>
                <tr><td>b</td><td>({angka(bSambung.x, 1)}  {angka(bSambung.y, 1)})</td></tr>
                <tr><td>komponen mendatarnya dijumlah</td><td>{angka(aSambung.x, 1)} + {angka(bSambung.x, 1)} = {angka(hasilSambung.x, 1)}</td></tr>
                <tr className="tegas"><td>a + b</td><td>({angka(hasilSambung.x, 1)}  {angka(hasilSambung.y, 1)})</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Panjang a adalah {angka(panjang(aSambung), 2)} dan panjang b adalah{' '}
              {angka(panjang(bSambung), 2)}, tetapi panjang jumlahnya{' '}
              {angka(panjang(hasilSambung), 2)}. Panjangnya tidak ikut dijumlahkan.
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'jajar-genjang' && (
          <div className="blok">
            <div className="cap">Resultan dua vektor</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>a</td><td>({angka(aJajar.x, 1)}  {angka(aJajar.y, 1)})</td></tr>
                <tr><td>b</td><td>({angka(bJajar.x, 1)}  {angka(bJajar.y, 1)})</td></tr>
                <tr><td>panjang a dan panjang b</td><td>{angka(panjang(aJajar), 2)} dan {angka(panjang(bJajar), 2)}</td></tr>
                <tr className="tegas"><td>panjang resultan</td><td>{angka(panjang(hasilJajar), 3)}</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Angka resultannya sama persis dengan cara segitiga di Materi 06. Yang berbeda cuma
              gambarnya, dan gambar dipilih mengikuti ceritanya: berurutan atau serentak.
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'selisih-panah' && (
          <div className="blok">
            <div className="cap">Mengurangi lewat komponen</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>a</td><td>({angka(aSelisih.x, 1)}  {angka(aSelisih.y, 1)})</td></tr>
                <tr><td>b</td><td>({angka(bSelisih.x, 1)}  {angka(bSelisih.y, 1)})</td></tr>
                <tr><td>a - b</td><td>({angka(hasilSelisih.x, 1)}  {angka(hasilSelisih.y, 1)})</td></tr>
                <tr className="tegas"><td>b - a, kebalikannya</td><td>({angka(-hasilSelisih.x, 1)}  {angka(-hasilSelisih.y, 1)})</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Kedua baris terakhir berlawanan tanda. Itu sebabnya urutan tidak boleh dibalik:
              a dikurangi b dan b dikurangi a adalah dua panah yang berlawanan arah.
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'kali-skalar' && (
          <div className="blok">
            <div className="cap">Angka dari alat</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>a</td><td>({angka(aKali.x, 1)}  {angka(aKali.y, 1)})</td></tr>
                <tr><td>pengali</td><td>{angka(k, 2)}</td></tr>
                <tr><td>hasilnya</td><td>({angka(hasilKali.x, 2)}  {angka(hasilKali.y, 2)})</td></tr>
                <tr className="tegas">
                  <td>panjangnya berubah</td>
                  <td>{angka(panjang(aKali), 2)} menjadi {angka(panjang(hasilKali), 2)}</td>
                </tr>
              </tbody>
            </table>
            <div className="catatan">
              {k > 0
                ? 'Pengali positif tidak mengubah arah sama sekali, hanya panjangnya.'
                : k < 0
                  ? 'Pengali negatif membalik arahnya, dan panjangnya mengikuti nilai pengali tanpa tandanya. Panjang tetap tidak negatif.'
                  : 'Pengali nol memberi vektor nol: panjangnya nol dan arahnya tidak ada.'}
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'perkalian-titik' && (
          <div className="blok">
            <div className="cap">Angka dari alat</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>a</td><td>({angka(aTitik.x, 1)}  {angka(aTitik.y, 1)})</td></tr>
                <tr><td>b</td><td>({angka(bTitik.x, 1)}  {angka(bTitik.y, 1)})</td></tr>
                <tr><td>lewat komponen</td><td>{angka(aTitik.x, 1)}({angka(bTitik.x, 1)}) + {angka(aTitik.y, 1)}({angka(bTitik.y, 1)})</td></tr>
                <tr><td>sudut antara keduanya</td><td>{angka(sudutTitik, 1)}°</td></tr>
                <tr className="tegas"><td>a . b</td><td>{Math.abs(hasilTitik) < 0.005 ? '0' : angka(hasilTitik, 2)}</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Lewat panjang dan sudut hasilnya sama: {angka(panjang(aTitik), 2)} dikali{' '}
              {angka(panjang(bTitik), 2)} dikali kosinus {angka(sudutTitik, 1)} derajat. Perhatikan
              hasilnya sebuah angka, bukan panah.
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'proyeksi' && (
          <div className="blok">
            <div className="cap">Angka dari alat</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>a</td><td>({angka(aProyeksi.x, 1)}  {angka(aProyeksi.y, 1)})</td></tr>
                <tr><td>b</td><td>({angka(bProyeksi.x, 1)}  {angka(bProyeksi.y, 1)})</td></tr>
                <tr><td>a . b dibagi panjang b</td><td>{angka(titik(aProyeksi, bProyeksi), 2)} dibagi {angka(panjang(bProyeksi), 2)}</td></tr>
                <tr><td>panjang proyeksinya</td><td>{angka(panjangBayangan, 3)}</td></tr>
                <tr className="tegas"><td>vektor proyeksinya</td><td>({angka(bayangan.x, 2)}  {angka(bayangan.y, 2)})</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              {panjangBayangan < 0
                ? 'Panjang proyeksinya negatif, dan itu benar: bayangannya jatuh ke arah yang berlawanan dengan b, sebab sudut keduanya tumpul.'
                : 'Baris keempat sebuah angka, baris kelima sebuah panah. Keduanya disebut proyeksi, jadi bacalah soalnya baik-baik: yang diminta panjangnya atau vektornya.'}
            </div>
          </div>
        )}
      </>
    )
  }

  return <>{children({ kiri, kanan, tanda })}</>
}
