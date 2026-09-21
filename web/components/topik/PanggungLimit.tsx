'use client'

import { useState, type ReactNode } from 'react'
import SelangMenyusut, { LANGKAH_H, kecepatanRata } from '@/components/widget/limit/SelangMenyusut'
import GarisMendekati, { BATAS_X, C as C_DEKAT, L as L_DEKAT, f as fDekat } from '@/components/widget/limit/GarisMendekati'
import TarifMelompat, { BATAS_C, BATAS_JARAK, tarif } from '@/components/widget/limit/TarifMelompat'
import LubangGrafik, { LEBAR_TAMPILAN } from '@/components/widget/limit/LubangGrafik'
import MesinSifat, {
  NAMA_SIFAT, PETUNJUK_SALAH, SOAL_SIFAT, type Sifat,
} from '@/components/widget/limit/MesinSifat'
import BongkarBertahap, { SOAL_BONGKAR } from '@/components/widget/limit/BongkarBertahap'
import PerkecilTampilan, { ASIMTOT, LEBAR_X, f as fJauh } from '@/components/widget/limit/PerkecilTampilan'
import BusurLawanTali, { BATAS_DERAJAT } from '@/components/widget/limit/BusurLawanTali'
import PerusakFungsi, {
  KETERANGAN, NAMA_RUSAK, URUT_RUSAK, periksa, type Kerusakan,
} from '@/components/widget/limit/PerusakFungsi'
import DuniaNyataLimit from '@/components/widget/limit/DuniaNyataLimit'
import { angka } from '@/components/widget/limit/koordinat'
import type { PropPanggung } from '@/components/topik/jenis'
import { Angka, Petunjuk, Pilihan } from '@/components/kendali'
import TeksMat from '@/components/latihan/TeksMat'

/**
 * Panggung Limit: penyetelan kesembilan widgetnya, dan tidak lebih.
 *
 * Bentuknya meniru PanggungTrigonometri. Rangka halaman tidak tahu apa-apa soal
 * isi topik ini, dan sebaliknya berkas ini tidak tahu apa-apa soal tab, kunci
 * kuis, atau penghitung waktu membaca.
 */
export default function PanggungLimit({ tahap, tampilWidget, children }: PropPanggung) {
  // keadaan tiap widget dipegang di sini supaya tidak hilang saat pindah tahap
  const [selang, setSelang] = useState(0)
  const [xDekat, setXDekat] = useState(2.7)
  const [cTarif, setCTarif] = useState(2)
  const [jarakTarif, setJarakTarif] = useState(0.5)
  const [tingkatLubang, setTingkatLubang] = useState(0)
  const [soalSifat, setSoalSifat] = useState(0)
  const [langkahSifat, setLangkahSifat] = useState(0)
  const [pesanSifat, setPesanSifat] = useState<string | null>(null)
  const [soalBongkar, setSoalBongkar] = useState(0)
  const [langkahBongkar, setLangkahBongkar] = useState(1)
  const [tingkatJauh, setTingkatJauh] = useState(0)
  const [derajatBusur, setDerajatBusur] = useState(45)
  const [rusak, setRusak] = useState<Kerusakan>('mulus')

  function pilihSifat(s: Sifat) {
    const soal = SOAL_SIFAT[soalSifat]
    if (soal.buntu) {
      setPesanSifat(soal.buntu)
      return
    }
    if (s === soal.langkah[langkahSifat]?.sifat) {
      setLangkahSifat((n) => n + 1)
      setPesanSifat(null)
      return
    }
    setPesanSifat(PETUNJUK_SALAH[s])
  }

  function gantiSoalSifat(n: number) {
    setSoalSifat(n)
    setLangkahSifat(0)
    setPesanSifat(null)
  }

  let kiri: ReactNode = null
  let kanan: ReactNode = null
  let tanda = 'BACAAN'

  if (tahap) {
    if (tahap.widget === 'dunia-nyata-limit') tanda = 'CONTOH NYATA'
    else if (tahap.widget) tanda = 'INTERAKTIF'

    const h = LANGKAH_H[selang]
    const bongkar = SOAL_BONGKAR[soalBongkar]
    const soalSif = SOAL_SIFAT[soalSifat]
    const radBusur = (derajatBusur * Math.PI) / 180
    const nisbahBusur = Math.sin(radBusur) / radBusur
    const lebarJauh = LEBAR_X[tingkatJauh]
    const xJauh = 3 + lebarJauh
    const syarat = periksa(rusak)

    kiri = (
      <>
        {tampilWidget && tahap.widget === 'selang-menyusut' && (
          <>
            <div className="layar"><SelangMenyusut indeks={selang} /></div>
            <div className="kendali">
              <Pilihan nama="Panjang selang h" arti="detik, makin ke kanan makin pendek"
                pilihan={LANGKAH_H.map((v, i) => ({ nilai: String(i), label: angka(v, 3) }))}
                nilai={String(selang)} onPilih={(n) => setSelang(Number(n))} />
              <Petunjuk>
                perpendek terus, dan perhatikan kecepatan rata-ratanya merapat ke 20 tanpa pernah sampai.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'garis-mendekati' && (
          <>
            <div className="layar"><GarisMendekati x={xDekat} /></div>
            <div className="kendali">
              <Angka nama="Letak x" arti="titik yang sedang diperiksa, tujuannya 3" kunci="x"
                nilai={xDekat} onUbah={setXDekat} min={BATAS_X.min} max={BATAS_X.maks} langkah={BATAS_X.langkah} desimal={3} />
              <Petunjuk>
                dekati 3 dari kiri, lalu dari kanan. Coba juga ketik tepat 3.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'tarif-melompat' && (
          <>
            <div className="layar"><TarifMelompat c={cTarif} jarak={jarakTarif} /></div>
            <div className="kendali">
              <Angka nama="Titik tujuan" arti="jam berapa yang didekati" kunci="c" satuan=" jam"
                nilai={cTarif} onUbah={setCTarif} min={BATAS_C.min} max={BATAS_C.maks} langkah={BATAS_C.langkah} />
              <Angka nama="Jarak penunjuk" arti="seberapa jauh kedua penunjuk dari tujuan" kunci="jarak"
                nilai={jarakTarif} onUbah={setJarakTarif} min={BATAS_JARAK.min} max={BATAS_JARAK.maks} langkah={BATAS_JARAK.langkah} />
              <Petunjuk>
                geser titik tujuannya jauh dari jam kedua, dan kedua angka langsung sepakat. Tepat di jam kedua, keduanya berselisih.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'lubang-grafik' && (
          <>
            <div className="layar"><LubangGrafik tingkat={tingkatLubang} /></div>
            <div className="kendali">
              <Pilihan nama="Lebar tampilan" arti="satuan, makin kecil makin diperbesar"
                pilihan={LEBAR_TAMPILAN.map((v, i) => ({ nilai: String(i), label: angka(v, 2) }))}
                nilai={String(tingkatLubang)} onPilih={(n) => setTingkatLubang(Number(n))} />
              <Petunjuk>
                perbesar sampai lubangnya terlihat sebagai lingkaran kosong, bukan titik penuh.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'mesin-sifat' && (
          <>
            <div className="isi-gulir">
              <MesinSifat soal={soalSifat} langkah={langkahSifat} pesan={pesanSifat} onPilih={pilihSifat} />
            </div>
            <div className="kendali">
              <Pilihan nama="Soal" arti="pilih yang mau dibongkar dengan sifat limit"
                pilihan={SOAL_SIFAT.map((sf, n) => ({ nilai: String(n), label: `Soal ${n + 1}${sf.buntu ? ' (jebakan)' : ''}` }))}
                nilai={String(soalSifat)} onPilih={(n) => gantiSoalSifat(Number(n))} />
              <Petunjuk><TeksMat teks={`${soalSif.buntu
                  ? 'soal ini memang tidak bisa diselesaikan dengan sifat limit, dan itu yang mau ditunjukkan.'
                  : `pilih sifat yang tepat di tiap langkah. Sekarang langkah ${Math.min(langkahSifat + 1, soalSif.langkah.length)} dari ${soalSif.langkah.length}.`}`} blok={false} /></Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'bongkar-bertahap' && (
          <>
            <div className="isi-gulir">
              <BongkarBertahap soal={soalBongkar} langkah={langkahBongkar} />
            </div>
            <div className="kendali">
              <Pilihan nama="Soal" arti="bentuk 0/0 yang akan dibongkar"
                pilihan={SOAL_BONGKAR.map((_, n) => ({ nilai: String(n), label: `Soal ${n + 1}` }))}
                nilai={String(soalBongkar)} onPilih={(n) => { setSoalBongkar(Number(n)); setLangkahBongkar(1) }} />
              <Angka nama="Langkah" arti="buka pembongkarannya satu baris demi satu baris" kunci="langkah"
                nilai={Math.min(langkahBongkar, bongkar.baris.length)} onUbah={setLangkahBongkar}
                min={1} max={bongkar.baris.length} langkah={1} />
              <Petunjuk>
                perhatikan syarat berwarna ungu di langkah pencoretan, itu yang membuatnya sah.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'perkecil-tampilan' && (
          <>
            <div className="layar"><PerkecilTampilan tingkat={tingkatJauh} /></div>
            <div className="kendali">
              <Pilihan nama="Sejauh mana x dilihat" arti="batas kanan tampilan"
                pilihan={LEBAR_X.map((v, i) => ({ nilai: String(i), label: `x = ${v}` }))}
                nilai={String(tingkatJauh)} onPilih={(n) => setTingkatJauh(Number(n))} />
              <Petunjuk>
                kurvanya makin menempel ke garis, tapi selisihnya tidak pernah nol.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'busur-lawan-tali' && (
          <>
            <div className="layar"><BusurLawanTali derajat={derajatBusur} /></div>
            <div className="kendali">
              <Angka nama="Sudut θ" arti="sudut pusat busurnya" kunci="sudut" satuan="°"
                nilai={derajatBusur} onUbah={setDerajatBusur} min={BATAS_DERAJAT.min} max={BATAS_DERAJAT.maks} langkah={BATAS_DERAJAT.langkah} />
              <Petunjuk>
                kecilkan sudutnya, kedua batang makin sama panjang tapi busur selalu menang tipis.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'perusak-fungsi' && (
          <>
            <div className="layar"><PerusakFungsi rusak={rusak} /></div>
            <div className="kendali">
              <Pilihan nama="Rusak bagaimana" arti="satu fungsi mulus, dirusak dengan empat cara"
                pilihan={URUT_RUSAK.map((r) => ({ nilai: r, label: NAMA_RUSAK[r] }))}
                nilai={rusak} onPilih={setRusak} />
              <Petunjuk>{KETERANGAN[rusak]}</Petunjuk>
            </div>
          </>
        )}

        {tahap.widget === 'dunia-nyata-limit' && (
          <div className="isi-gulir">
            <DuniaNyataLimit />
          </div>
        )}
      </>
    )

    kanan = (
      <>
        {tampilWidget && tahap.widget === 'selang-menyusut' && (
          <div className="blok">
            <div className="cap"><TeksMat teks="Angka dari alat" blok={false} /></div>
            <table className="tabel-angka">
              <tbody>
                <tr><td><TeksMat teks="panjang selang h" blok={false} /></td><td><TeksMat teks={`${angka(h, 3)} detik`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="jarak yang ditempuh" blok={false} /></td><td><TeksMat teks={`${angka(5 * (2 + h) ** 2 - 20, 4)} m`} blok={false} /></td></tr>
                <tr className="tegas"><td><TeksMat teks="kecepatan rata-rata" blok={false} /></td><td><TeksMat teks={`${angka(kecepatanRata(h), 3)} m/s`} blok={false} /></td></tr>
              </tbody>
            </table>
            <div className="catatan"><TeksMat teks={`Rumusnya 20 + 5h. Selisihnya ke 20 adalah ${angka(5 * h, 3)}, dan selisih itu mengecil mengikuti h tanpa pernah menjadi nol.`} /></div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'garis-mendekati' && (
          <div className="blok">
            <div className="cap"><TeksMat teks="Angka dari alat" blok={false} /></div>
            <table className="tabel-angka">
              <tbody>
                <tr><td><TeksMat teks="x" blok={false} /></td><td>{angka(xDekat, 3)}</td></tr>
                <tr><td><TeksMat teks="f(x) = x² + 1" blok={false} /></td><td>{angka(fDekat(xDekat), 5)}</td></tr>
                <tr><td><TeksMat teks="selisih x ke c" blok={false} /></td><td>{angka(Math.abs(xDekat - C_DEKAT), 3)}</td></tr>
                <tr className="tegas"><td><TeksMat teks="selisih f(x) ke L" blok={false} /></td><td>{angka(Math.abs(fDekat(xDekat) - L_DEKAT), 5)}</td></tr>
              </tbody>
            </table>
            <div className="catatan"><TeksMat teks={`Kedua selisih mengecil bersamaan. Itulah arti kalimat "f(x) mendekati L saat x mendekati c".`} /></div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'tarif-melompat' && (
          <div className="blok">
            <div className="cap"><TeksMat teks={`Kedua sisi pada c = ${angka(cTarif, 1)} jam`} blok={false} /></div>
            <table className="tabel-angka">
              <tbody>
                <tr><td><TeksMat teks="dari kiri" blok={false} /></td><td><TeksMat teks={`${angka(tarif(cTarif - jarakTarif), 0)} ribu`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="dari kanan" blok={false} /></td><td><TeksMat teks={`${angka(tarif(cTarif + jarakTarif), 0)} ribu`} blok={false} /></td></tr>
                <tr className="tegas">
                  <td><TeksMat teks="limitnya" blok={false} /></td>
                  <td><TeksMat teks={`${tarif(cTarif - jarakTarif) === tarif(cTarif + jarakTarif)
                      ? `${angka(tarif(cTarif), 0)} ribu`
                      : 'tidak ada'}`} blok={false} /></td>
                </tr>
              </tbody>
            </table>
            <div className="catatan"><TeksMat teks={`Nilai fungsinya di c tetap ada, yaitu ${angka(tarif(cTarif), 0)} ribu. Punya nilai bukan jaminan punya limit.`} /></div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'lubang-grafik' && (
          <div className="blok">
            <div className="cap"><TeksMat teks="Tetangga kiri dan kanan titik 1" blok={false} /></div>
            <table className="tabel-angka">
              <tbody>
                <tr><td><TeksMat teks="x = 0,99" blok={false} /></td><td><TeksMat teks="1,99" blok={false} /></td></tr>
                <tr><td><TeksMat teks="x = 0,999" blok={false} /></td><td><TeksMat teks="1,999" blok={false} /></td></tr>
                <tr className="tegas"><td><TeksMat teks="x = 1" blok={false} /></td><td><TeksMat teks="tidak ada" blok={false} /></td></tr>
                <tr><td><TeksMat teks="x = 1,001" blok={false} /></td><td><TeksMat teks="2,001" blok={false} /></td></tr>
                <tr><td><TeksMat teks="x = 1,01" blok={false} /></td><td><TeksMat teks="2,01" blok={false} /></td></tr>
              </tbody>
            </table>
            <div className="catatan"><TeksMat teks="Nilai fungsinya tidak ada, limitnya 2. Bandingkan dengan Materi 03, yang keadaannya justru terbalik." /></div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'perkecil-tampilan' && (
          <div className="blok">
            <div className="cap"><TeksMat teks="Seberapa dekat kurvanya ke garis y = 3" blok={false} /></div>
            <table className="tabel-angka">
              <tbody>
                <tr><td><TeksMat teks="di x" blok={false} /></td><td>{angka(xJauh, 0)}</td></tr>
                <tr><td><TeksMat teks="nilai f(x)" blok={false} /></td><td>{angka(fJauh(xJauh), 6)}</td></tr>
                <tr className="tegas"><td><TeksMat teks="selisih ke 3" blok={false} /></td><td>{angka(fJauh(xJauh) - ASIMTOT, 6)}</td></tr>
              </tbody>
            </table>
            <div className="catatan"><TeksMat teks="Selisihnya mengecil terus, tetapi tidak pernah nol. Itulah bedanya mendekati dan menyentuh." /></div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'busur-lawan-tali' && (
          <div className="blok">
            <div className="cap"><TeksMat teks={`Angka pada sudut ${derajatBusur}°`} blok={false} /></div>
            <table className="tabel-angka">
              <tbody>
                <tr><td><TeksMat teks="θ dalam radian" blok={false} /></td><td>{angka(radBusur, 5)}</td></tr>
                <tr><td><TeksMat teks="sin θ" blok={false} /></td><td>{angka(Math.sin(radBusur), 5)}</td></tr>
                <tr className="tegas"><td><TeksMat teks="sin θ dibagi θ" blok={false} /></td><td>{derajatBusur === 0 ? 'tidak terdefinisi (0 : 0)' : angka(nisbahBusur, 6)}</td></tr>
              </tbody>
            </table>
            <div className="catatan"><TeksMat teks={derajatBusur === 0
              ? 'Tepat di 0° tidak ada yang bisa dibagi: busur 0, tali 0. Yang punya nilai adalah LIMIT-nya saat θ mendekati 0, dan nilai itu 1. Geser sedikit ke kanan dan lihat angkanya.'
              : `Kalau sudutnya dibaca sebagai derajat, angka pembaginya menjadi ${angka(derajatBusur, 0)}, dan perbandingannya ${angka(Math.sin(radBusur) / derajatBusur, 5)}. Jauh dari 1. Itu sebabnya radian bukan pilihan, tetapi syarat.`} /></div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'perusak-fungsi' && (
          <div className="blok">
            <div className="cap"><TeksMat teks="Ketiga syarat di x = 2" blok={false} /></div>
            <table className="tabel-angka">
              <tbody>
                <tr><td><TeksMat teks="1. f(2) ada" blok={false} /></td><td><TeksMat teks={`${syarat.nilaiAda ? 'ya' : 'tidak'}`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="2. limitnya ada" blok={false} /></td><td><TeksMat teks={`${syarat.limitAda ? 'ya' : 'tidak'}`} blok={false} /></td></tr>
                <tr><td><TeksMat teks="3. keduanya sama" blok={false} /></td><td><TeksMat teks={`${syarat.samaNilainya ? 'ya' : 'tidak'}`} blok={false} /></td></tr>
                <tr className="tegas">
                  <td><TeksMat teks="kontinu di x = 2" blok={false} /></td>
                  <td><TeksMat teks={`${rusak === 'mulus' ? 'ya' : 'tidak'}`} blok={false} /></td>
                </tr>
              </tbody>
            </table>
            <div className="catatan"><TeksMat teks={`${KETERANGAN[rusak]}`} /></div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'mesin-sifat' && !soalSif.buntu && (
          <div className="blok">
            <div className="cap"><TeksMat teks={`Kemajuan pada soal ${soalSifat + 1}`} blok={false} /></div>
            <table className="tabel-angka">
              <tbody>
                {soalSif.langkah.map((l, n) => (
                  <tr key={n} className={n < langkahSifat ? 'tegas' : undefined}>
                    <td><TeksMat teks={`langkah ${n + 1}`} blok={false} /></td>
                    <td><TeksMat teks={`${n < langkahSifat ? NAMA_SIFAT[l.sifat] : 'belum'}`} blok={false} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="catatan"><TeksMat teks="Penolakan mesin sengaja tidak menyebutkan sifat mana yang benar, supaya yang dilatih adalah cara membaca bentuk, bukan kesabaran menekan tombol." /></div>
          </div>
        )}
      </>
    )
  }

  return <>{children({ kiri, kanan, tanda })}</>
}
