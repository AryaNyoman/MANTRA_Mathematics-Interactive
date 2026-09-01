'use client'

import { useState, type ReactNode } from 'react'
import PecahKomponen from '@/components/widget/vektor/PecahKomponen'
import PerahuSungai, { LEBAR_SUNGAI, hasilSeberang } from '@/components/widget/vektor/PerahuSungai'
import PanahBerpindah, { ACUAN, nilaiHubungan } from '@/components/widget/vektor/PanahBerpindah'
import PanjangDanArah from '@/components/widget/vektor/PanjangDanArah'
import {
  angka, kurang, mataAngin, panjang, sudutDerajat, tambah, type Vek,
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
  const [arus, setArus] = useState<Vek>({ x: 2, y: 0 })
  const [pangkalCoba, setPangkalCoba] = useState<Vek>({ x: 1, y: -1 })
  const [ujungCoba, setUjungCoba] = useState<Vek>({ x: 4, y: 1 })
  const [vKomponen, setVKomponen] = useState<Vek>({ x: 4, y: 3 })
  const [vArah, setVArah] = useState<Vek>({ x: 4, y: 3 })

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
      </>
    )

    kanan = (
      <>
        {tampilWidget && tahap.widget === 'perahu-sungai' && (
          <div className="blok">
            <div className="cap">Angka dari alat di sebelah kiri</div>
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
            <div className="cap">Angka dari alat di sebelah kiri</div>
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
            <div className="cap">Angka dari alat di sebelah kiri</div>
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
      </>
    )
  }

  return <>{children({ kiri, kanan, tanda })}</>
}
