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
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="selang">
                  <span>Panjang selang waktu</span>
                  <span className="mono">h = {angka(h, 3)} detik</span>
                </label>
                <input id="selang" type="range" min={0} max={LANGKAH_H.length - 1} value={selang}
                       onChange={(e) => setSelang(+e.target.value)} />
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>perpendek terus, dan perhatikan angkanya merapat ke 20 tanpa pernah sampai</span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'garis-mendekati' && (
          <>
            <div className="layar"><GarisMendekati x={xDekat} /></div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="xdekat">
                  <span>Letak x</span>
                  <span className="mono">{angka(xDekat, 3)}</span>
                </label>
                <input id="xdekat" type="range"
                       min={BATAS_X.min} max={BATAS_X.maks} step={BATAS_X.langkah} value={xDekat}
                       onChange={(e) => setXDekat(+e.target.value)} />
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>dekati 3 dari kiri, lalu dari kanan. Coba juga letakkan tepat di 3</span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'tarif-melompat' && (
          <>
            <div className="layar"><TarifMelompat c={cTarif} jarak={jarakTarif} /></div>
            <div className="kendali">
              <div>
                <label htmlFor="ctarif">
                  <span>Titik tujuan</span>
                  <span className="mono">{angka(cTarif, 1)} jam</span>
                </label>
                <input id="ctarif" type="range"
                       min={BATAS_C.min} max={BATAS_C.maks} step={BATAS_C.langkah} value={cTarif}
                       onChange={(e) => setCTarif(+e.target.value)} />
              </div>
              <div>
                <label htmlFor="jaraktarif">
                  <span>Jarak penunjuk</span>
                  <span className="mono">{angka(jarakTarif, 2)}</span>
                </label>
                <input id="jaraktarif" type="range"
                       min={BATAS_JARAK.min} max={BATAS_JARAK.maks} step={BATAS_JARAK.langkah}
                       value={jarakTarif}
                       onChange={(e) => setJarakTarif(+e.target.value)} />
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>geser titik tujuannya jauh dari jam kedua, kedua angka langsung sepakat</span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'lubang-grafik' && (
          <>
            <div className="layar"><LubangGrafik tingkat={tingkatLubang} /></div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="lubang">
                  <span>Perbesaran</span>
                  <span className="mono">lebar {angka(LEBAR_TAMPILAN[tingkatLubang], 3)} satuan</span>
                </label>
                <input id="lubang" type="range" min={0} max={LEBAR_TAMPILAN.length - 1}
                       value={tingkatLubang}
                       onChange={(e) => setTingkatLubang(+e.target.value)} />
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>perbesar sampai lubangnya terlihat sebagai lingkaran kosong, bukan titik penuh</span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'mesin-sifat' && (
          <>
            <div className="isi-gulir">
              <MesinSifat soal={soalSifat} langkah={langkahSifat} pesan={pesanSifat} onPilih={pilihSifat} />
            </div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label><span>Pilih soal</span></label>
                <div className="pilih-sisi">
                  {SOAL_SIFAT.map((_, n) => (
                    <button key={n} aria-pressed={soalSifat === n} onClick={() => gantiSoalSifat(n)}>
                      Soal {n + 1}{SOAL_SIFAT[n].buntu ? ' (jebakan)' : ''}
                    </button>
                  ))}
                </div>
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>
                  {soalSif.buntu
                    ? 'soal ini memang tidak bisa diselesaikan dengan sifat limit, dan itu yang mau ditunjukkan'
                    : `langkah ${Math.min(langkahSifat + 1, soalSif.langkah.length)} dari ${soalSif.langkah.length}`}
                </span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'bongkar-bertahap' && (
          <>
            <div className="isi-gulir">
              <BongkarBertahap soal={soalBongkar} langkah={langkahBongkar} />
            </div>
            <div className="kendali">
              <div>
                <label><span>Pilih soal</span></label>
                <div className="pilih-sisi">
                  {SOAL_BONGKAR.map((_, n) => (
                    <button key={n} aria-pressed={soalBongkar === n}
                            onClick={() => { setSoalBongkar(n); setLangkahBongkar(1) }}>
                      {n + 1}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label><span>Langkah</span><span className="mono">{Math.min(langkahBongkar, bongkar.baris.length)} / {bongkar.baris.length}</span></label>
                <div className="pilih-sisi">
                  <button disabled={langkahBongkar <= 1} onClick={() => setLangkahBongkar((n) => n - 1)}>
                    ← mundur
                  </button>
                  <button disabled={langkahBongkar >= bongkar.baris.length}
                          onClick={() => setLangkahBongkar((n) => n + 1)}>
                    maju →
                  </button>
                </div>
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>perhatikan syarat berwarna ungu di langkah pencoretan, itu yang membuatnya sah</span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'perkecil-tampilan' && (
          <>
            <div className="layar"><PerkecilTampilan tingkat={tingkatJauh} /></div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="jauh">
                  <span>Sejauh mana x dilihat</span>
                  <span className="mono">sampai x = {angka(xJauh, 0)}</span>
                </label>
                <input id="jauh" type="range" min={0} max={LEBAR_X.length - 1} value={tingkatJauh}
                       onChange={(e) => setTingkatJauh(+e.target.value)} />
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>kurvanya makin menempel ke garis, tapi selisihnya tidak pernah nol</span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'busur-lawan-tali' && (
          <>
            <div className="layar"><BusurLawanTali derajat={derajatBusur} /></div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="busur">
                  <span>Sudut <span style={{ textTransform: 'none' }}>θ</span></span>
                  <span className="mono">{derajatBusur}°</span>
                </label>
                <input id="busur" type="range"
                       min={BATAS_DERAJAT.min} max={BATAS_DERAJAT.maks} step={BATAS_DERAJAT.langkah}
                       value={derajatBusur}
                       onChange={(e) => setDerajatBusur(+e.target.value)} />
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>kecilkan sudutnya, kedua batang makin sama panjang tapi busur selalu menang tipis</span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'perusak-fungsi' && (
          <>
            <div className="layar"><PerusakFungsi rusak={rusak} /></div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label><span>Rusak bagaimana</span></label>
                <div className="pilih-sisi" style={{ flexWrap: 'wrap' }}>
                  {URUT_RUSAK.map((r) => (
                    <button key={r} aria-pressed={rusak === r} onClick={() => setRusak(r)}
                            style={{ flex: '1 1 30%' }}>
                      {NAMA_RUSAK[r]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>{KETERANGAN[rusak]}</span>
              </div>
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
            <div className="cap">Angka dari alat di sebelah kiri</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>panjang selang h</td><td>{angka(h, 3)} detik</td></tr>
                <tr><td>jarak yang ditempuh</td><td>{angka(5 * (2 + h) ** 2 - 20, 4)} m</td></tr>
                <tr className="tegas"><td>kecepatan rata-rata</td><td>{angka(kecepatanRata(h), 3)} m/s</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Rumusnya 20 + 5h. Selisihnya ke 20 adalah {angka(5 * h, 3)}, dan selisih itu mengecil
              mengikuti h tanpa pernah menjadi nol.
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'garis-mendekati' && (
          <div className="blok">
            <div className="cap">Angka dari alat di sebelah kiri</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>x</td><td>{angka(xDekat, 3)}</td></tr>
                <tr><td>f(x) = x² + 1</td><td>{angka(fDekat(xDekat), 5)}</td></tr>
                <tr><td>selisih x ke c</td><td>{angka(Math.abs(xDekat - C_DEKAT), 3)}</td></tr>
                <tr className="tegas"><td>selisih f(x) ke L</td><td>{angka(Math.abs(fDekat(xDekat) - L_DEKAT), 5)}</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Kedua selisih mengecil bersamaan. Itulah arti kalimat &quot;f(x) mendekati L saat x mendekati c&quot;.
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'tarif-melompat' && (
          <div className="blok">
            <div className="cap">Kedua sisi pada c = {angka(cTarif, 1)} jam</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>dari kiri</td><td>{angka(tarif(cTarif - jarakTarif), 0)} ribu</td></tr>
                <tr><td>dari kanan</td><td>{angka(tarif(cTarif + jarakTarif), 0)} ribu</td></tr>
                <tr className="tegas">
                  <td>limitnya</td>
                  <td>
                    {tarif(cTarif - jarakTarif) === tarif(cTarif + jarakTarif)
                      ? `${angka(tarif(cTarif), 0)} ribu`
                      : 'tidak ada'}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="catatan">
              Nilai fungsinya di c tetap ada, yaitu {angka(tarif(cTarif), 0)} ribu. Punya nilai bukan
              jaminan punya limit.
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'lubang-grafik' && (
          <div className="blok">
            <div className="cap">Tetangga kiri dan kanan titik 1</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>x = 0,99</td><td>1,99</td></tr>
                <tr><td>x = 0,999</td><td>1,999</td></tr>
                <tr className="tegas"><td>x = 1</td><td>tidak ada</td></tr>
                <tr><td>x = 1,001</td><td>2,001</td></tr>
                <tr><td>x = 1,01</td><td>2,01</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Nilai fungsinya tidak ada, limitnya 2. Bandingkan dengan Materi 03, yang keadaannya
              justru terbalik.
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'perkecil-tampilan' && (
          <div className="blok">
            <div className="cap">Seberapa dekat kurvanya ke garis y = 3</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>di x</td><td>{angka(xJauh, 0)}</td></tr>
                <tr><td>nilai f(x)</td><td>{angka(fJauh(xJauh), 6)}</td></tr>
                <tr className="tegas"><td>selisih ke 3</td><td>{angka(fJauh(xJauh) - ASIMTOT, 6)}</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Selisihnya mengecil terus, tetapi tidak pernah nol. Itulah bedanya mendekati dan menyentuh.
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'busur-lawan-tali' && (
          <div className="blok">
            <div className="cap">Angka pada sudut {derajatBusur}°</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>θ dalam radian</td><td>{angka(radBusur, 5)}</td></tr>
                <tr><td>sin θ</td><td>{angka(Math.sin(radBusur), 5)}</td></tr>
                <tr className="tegas"><td>sin θ dibagi θ</td><td>{angka(nisbahBusur, 6)}</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Kalau sudutnya dibaca sebagai derajat, angka pembaginya menjadi {angka(derajatBusur, 0)},
              dan perbandingannya {angka(Math.sin(radBusur) / derajatBusur, 5)}. Jauh dari 1. Itu
              sebabnya radian bukan pilihan, melainkan syarat.
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'perusak-fungsi' && (
          <div className="blok">
            <div className="cap">Ketiga syarat di x = 2</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>1. f(2) ada</td><td>{syarat.nilaiAda ? 'ya' : 'tidak'}</td></tr>
                <tr><td>2. limitnya ada</td><td>{syarat.limitAda ? 'ya' : 'tidak'}</td></tr>
                <tr><td>3. keduanya sama</td><td>{syarat.samaNilainya ? 'ya' : 'tidak'}</td></tr>
                <tr className="tegas">
                  <td>kontinu di x = 2</td>
                  <td>{rusak === 'mulus' ? 'ya' : 'tidak'}</td>
                </tr>
              </tbody>
            </table>
            <div className="catatan">{KETERANGAN[rusak]}</div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'mesin-sifat' && !soalSif.buntu && (
          <div className="blok">
            <div className="cap">Kemajuan pada soal {soalSifat + 1}</div>
            <table className="tabel-angka">
              <tbody>
                {soalSif.langkah.map((l, n) => (
                  <tr key={n} className={n < langkahSifat ? 'tegas' : undefined}>
                    <td>langkah {n + 1}</td>
                    <td>{n < langkahSifat ? NAMA_SIFAT[l.sifat] : 'belum'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="catatan">
              Penolakan mesin sengaja tidak menyebutkan sifat mana yang benar, supaya yang dilatih
              adalah cara membaca bentuk, bukan kesabaran menekan tombol.
            </div>
          </div>
        )}
      </>
    )
  }

  return <>{children({ kiri, kanan, tanda })}</>
}
