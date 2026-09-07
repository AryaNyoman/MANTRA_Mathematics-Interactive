'use client'

import { useState, type ReactNode } from 'react'
import PembacaGrafik, {
  BABAK, BATAS_WAKTU, babakDi, jarak,
} from '@/components/widget/grafik-fungsi/PembacaGrafik'
import UjiGarisTegak, {
  ADALAH_FUNGSI, BATAS_GARIS, NAMA_BENTUK, RUMUS_BENTUK, URUT_BENTUK,
  potongDi, type Bentuk,
} from '@/components/widget/grafik-fungsi/UjiGarisTegak'
import BentukPuncak, {
  BATAS_A, BATAS_H, BATAS_K,
} from '@/components/widget/grafik-fungsi/BentukPuncak'
import WajahParabola, {
  BATAS_C, JUMLAH_LANGKAH, langkahLengkap, umumDari,
} from '@/components/widget/grafik-fungsi/WajahParabola'
import SusunParabola, {
  AWAL, BATAS_X, BATAS_Y, LANGKAH_SERET, parabolaDari, tigaBentuk, type PosisiSusun,
} from '@/components/widget/grafik-fungsi/SusunParabola'
import PapanTransformasi, {
  BATAS_LANGKAH,
} from '@/components/widget/grafik-fungsi/PapanTransformasi'
import LipatMutlak, {
  AKIBAT_LIPATAN, FUNGSI_MUTLAK, NAMA_DASAR_MUTLAK, NAMA_LIPATAN, URUT_LIPATAN,
  X_BANDING, bangunLipatan, rumusLipatan, type DasarMutlak, type Lipatan,
} from '@/components/widget/grafik-fungsi/LipatMutlak'
import BalapanTumbuh, {
  BATAS_AKHIR, BATAS_POKOK as BATAS_POKOK_BALAP, langkahMenyalip, tabelBalapan,
} from '@/components/widget/grafik-fungsi/BalapanTumbuh'
import CerminYX, {
  BATAS_LIPAT, BATAS_POKOK as BATAS_POKOK_CERMIN, PASANGAN,
} from '@/components/widget/grafik-fungsi/CerminYX'
import AsimtotRasional, {
  BATAS_GESER_X, BATAS_GESER_Y, rumusRasional, tabelDekatAsimtot, tabelJauh,
} from '@/components/widget/grafik-fungsi/AsimtotRasional'
import DuaMesin, {
  BATAS_MASUK, G_RUMUS, INVERS, NAMA_F, RUMUS_FG, RUMUS_GF, jejakAngka,
  type MesinF,
} from '@/components/widget/grafik-fungsi/DuaMesin'
import DuniaNyataGrafik from '@/components/widget/grafik-fungsi/DuniaNyataGrafik'
import { angka } from '@/components/widget/grafik-fungsi/koordinat'
import {
  akar, diskriminan, kePuncak, tulisTitik,
} from '@/components/widget/grafik-fungsi/fungsi'
import {
  NAMA_DASAR, NAMA_LANGKAH, RUMUS_DASAR, tulisFungsi,
  type Dasar, type Langkah,
} from '@/components/widget/grafik-fungsi/transformasi'
import type { PropPanggung } from '@/components/topik/jenis'
import { Angka, Koordinat, Petunjuk, Pilihan } from '@/components/kendali'

/**
 * Panggung Grafik Fungsi: penyetelan kesebelas widgetnya, dan tidak lebih.
 *
 * Bentuknya meniru PanggungLimit dan PanggungTrigonometri. Rangka halaman tidak
 * tahu apa-apa soal isi topik ini, dan sebaliknya berkas ini tidak tahu apa-apa
 * soal tab, kunci kuis, atau penghitung waktu membaca.
 *
 * ATURAN YANG DIJAGA DI SELURUH BERKAS INI
 * Tidak boleh ada tombol atau penggeser yang tidak melakukan apa-apa. Kalau
 * sebuah pilihan memang tidak mengubah gambarnya, misalnya mencerminkan
 * parabola terhadap sumbu y, maka widgetnya WAJIB mengatakan kenapa. Aturan itu
 * lahir dari galeri tahap 10 Trigonometri, yang tiga dari empat kartunya diam
 * saat disentuh sehingga seluruhnya terasa rusak.
 */

const URUT_TRANSFORMASI: Langkah[] = [
  'atas', 'bawah', 'kanan', 'kiri', 'cermin-x', 'cermin-y', 'regang-y', 'mampat-x',
]

const URUT_DASAR: Dasar[] = ['parabola', 'akar', 'sinus']
const URUT_DASAR_MUTLAK: DasarMutlak[] = ['garis', 'parabola']

export default function PanggungGrafikFungsi({ tahap, tampilWidget, children }: PropPanggung) {
  // Keadaan tiap widget dipegang di sini supaya tidak hilang saat pindah tahap.
  const [waktu, setWaktu] = useState(4.5)

  const [bentukUji, setBentukUji] = useState<Bentuk>('garis')
  const [xUji, setXUji] = useState(1)

  const [a, setA] = useState(1)
  const [h, setH] = useState(0)
  const [k, setK] = useState(0)
  const [bayang, setBayang] = useState<{ a: number; h: number; k: number } | undefined>(undefined)

  const [cWajah, setCWajah] = useState(-16)
  const [langkahWajah, setLangkahWajah] = useState(0)

  const [posSusun, setPosSusun] = useState<PosisiSusun>(AWAL)

  const [dasarTrans, setDasarTrans] = useState<Dasar>('parabola')
  const [langkahTrans, setLangkahTrans] = useState<Langkah[]>([])

  const [dasarMutlak, setDasarMutlak] = useState<DasarMutlak>('garis')
  const [lipat, setLipat] = useState<Lipatan>('asli')

  const [pokokBalap, setPokokBalap] = useState(2)
  const [akhirBalap, setAkhirBalap] = useState(6)

  const [pokokCermin, setPokokCermin] = useState(2)
  const [lipatCermin, setLipatCermin] = useState(0)

  const [hRas, setHRas] = useState(0)
  const [kRas, setKRas] = useState(0)

  // Sejak tahap 11 dipecah, mode widget mesin TIDAK lagi dipilih siswa lewat
  // tombol: tahap 11 selalu komposisi dan tahap 12 selalu invers. Tombol
  // pemilih mode dulu membuat siswa bisa membuka pelajaran tahap berikutnya
  // sebelum waktunya, dan menambah satu kendali yang tidak menjelaskan apa pun
  // di halaman yang sedang dibacanya.
  const [mesin, setMesin] = useState<MesinF>('kuadrat')
  const [masukMesin, setMasukMesin] = useState(4)

  /** Simpan bentuk sekarang sebagai bayangan, tepat sebelum penggeser digerakkan. */
  const rekamBayang = () => setBayang({ a, h, k })

  function tambahLangkah(l: Langkah) {
    setLangkahTrans((lama) => (lama.length >= BATAS_LANGKAH ? lama : [...lama, l]))
  }

  let kiri: ReactNode = null
  let kanan: ReactNode = null
  let tanda = 'BACAAN'

  if (tahap) {
    if (tahap.widget === 'dunia-nyata-grafik') tanda = 'CONTOH NYATA'
    else if (tahap.widget) tanda = 'INTERAKTIF'

    const puncakSekarang = { a, h, k }
    const umumWajah = umumDari(cWajah)
    const pucukWajah = kePuncak(umumWajah)
    const Dwajah = diskriminan(umumWajah)
    const akarWajah = akar(umumWajah)
    const parSusun = parabolaDari(posSusun)
    const contohSusun =
      posSusun.puncak.x === AWAL.puncak.x && posSusun.puncak.y === AWAL.puncak.y
        && posSusun.titik.x === AWAL.titik.x && posSusun.titik.y === AWAL.titik.y ? 'a'
      : posSusun.puncak.x === 1 && posSusun.puncak.y === -8 && posSusun.titik.x === 4 && posSusun.titik.y === 1 ? 'b'
      : 'lain'
    const potongUji = potongDi(bentukUji, xUji)
    const jejak = jejakAngka(mesin, masukMesin)

    kiri = (
      <>
        {tampilWidget && tahap.widget === 'pembaca-grafik' && (
          <>
            <div className="layar">
              <PembacaGrafik waktu={waktu} onGeser={setWaktu} />
            </div>
            <div className="kendali">
              <Angka nama="Menit ke" arti="titik di grafik yang sedang dibaca" kunci="waktu"
                nilai={waktu} onUbah={setWaktu} min={BATAS_WAKTU.min} max={BATAS_WAKTU.maks} langkah={BATAS_WAKTU.langkah} />
              <Petunjuk>
                ketik menitnya atau seret titiknya di gambar, lalu baca jaraknya di tabel.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'uji-garis-tegak' && (
          <>
            <div className="layar">
              <UjiGarisTegak bentuk={bentukUji} x={xUji} onGeser={setXUji} />
            </div>
            <div className="kendali">
              <Pilihan nama="Gambar yang diuji" arti="mana yang fungsi, mana yang bukan"
                pilihan={URUT_BENTUK.map((b) => ({ nilai: b, label: NAMA_BENTUK[b] }))}
                nilai={bentukUji} onPilih={setBentukUji} />
              <Angka nama="Letak garis tegak" arti="x tempat garis tegaknya berdiri" kunci="x"
                nilai={xUji} onUbah={setXUji} min={BATAS_GARIS.min} max={BATAS_GARIS.maks} langkah={BATAS_GARIS.langkah} />
              <Petunjuk>
                {ADALAH_FUNGSI[bentukUji]
                  ? 'geser ke mana pun, potongnya tetap satu. Ini grafik fungsi.'
                  : 'cari posisi yang memotong dua kali, dan buktinya selesai.'}
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'bentuk-puncak' && (
          <>
            <div className="layar">
              <BentukPuncak nilai={puncakSekarang} bayang={bayang} />
            </div>
            <div className="kendali">
              <Angka nama="a" arti="positif terbuka ke atas, negatif ke bawah; makin jauh dari nol makin ramping" kunci="a"
                nilai={a} onUbah={setA} onPegang={rekamBayang} min={BATAS_A.min} max={BATAS_A.maks} langkah={BATAS_A.langkah} />
              <Angka nama="h" arti="geser puncak ke kiri-kanan; di rumus (x - h)² tandanya terbalik" kunci="h"
                nilai={h} onUbah={setH} onPegang={rekamBayang} min={BATAS_H.min} max={BATAS_H.maks} langkah={BATAS_H.langkah} />
              <Angka nama="k" arti="geser puncak ke atas-bawah" kunci="k"
                nilai={k} onUbah={setK} onPegang={rekamBayang} min={BATAS_K.min} max={BATAS_K.maks} langkah={BATAS_K.langkah} />
              <Petunjuk>
                besarkan h, dan perhatikan parabolanya pergi ke KANAN walaupun di rumus tertulis minus.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'wajah-parabola' && (
          <>
            <div className="layar">
              <WajahParabola c={cWajah} langkah={langkahWajah} />
            </div>
            <div className="kendali">
              <Angka nama="Langkah" arti="melengkapkan kuadrat, satu baris demi satu baris" kunci="langkah"
                nilai={langkahWajah + 1} onUbah={(n) => setLangkahWajah(n - 1)} min={1} max={JUMLAH_LANGKAH} langkah={1} />
              <Angka nama="Nilai c" arti="suku tetap di rumus 2x² - 4x + c" kunci="c"
                nilai={cWajah} onUbah={setCWajah} min={BATAS_C.min} max={BATAS_C.maks} langkah={BATAS_C.langkah} />
              <Petunjuk>
                naikkan c melewati 2, dan kedua titik potong sumbu x menghilang.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'susun-parabola' && (
          <>
            <div className="layar">
              <SusunParabola pos={posSusun} onGeser={setPosSusun} />
            </div>
            <div className="kendali">
              <Koordinat nama="Puncak" arti="titik tertinggi atau terendah" kunci="puncak" vektor={false}
                nilai={posSusun.puncak} onUbah={(t) => setPosSusun({ ...posSusun, puncak: t })}
                batas={{ x: BATAS_X.maks, y: BATAS_Y.maks }} langkah={LANGKAH_SERET} />
              <Koordinat nama="Titik yang dilewati" arti="satu titik lain pada parabola" kunci="titik" vektor={false}
                nilai={posSusun.titik} onUbah={(t) => setPosSusun({ ...posSusun, titik: t })}
                batas={{ x: BATAS_X.maks, y: BATAS_Y.maks }} langkah={LANGKAH_SERET} />
              <Pilihan nama="Contoh siap pakai" arti="mengisi kedua titik sekaligus"
                pilihan={[{ nilai: 'a', label: 'puncak (2, 8) lewat (0, 4)' }, { nilai: 'b', label: 'puncak (1, -8) lewat (4, 1)' }]}
                nilai={contohSusun} onPilih={(n) => setPosSusun(n === 'a' ? AWAL : { puncak: { x: 1, y: -8 }, titik: { x: 4, y: 1 } })} />
              <Petunjuk>
                ketik kedua titik atau seret keduanya di gambar. Angkanya berhenti di kelipatan 0,5.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'papan-transformasi' && (
          <>
            <div className="layar">
              <PapanTransformasi dasar={dasarTrans} langkah={langkahTrans} />
            </div>
            <div className="kendali">
              <Pilihan nama="Fungsi dasar" arti="bentuk yang akan diubah"
                pilihan={URUT_DASAR.map((d) => ({ nilai: d, label: NAMA_DASAR[d] }))}
                nilai={dasarTrans} onPilih={(d) => { setDasarTrans(d); setLangkahTrans([]) }} />
              <div className="kendali-pilihan">
                <div className="kendali-nama">
                  <span><b>Transformasi</b><span className="kendali-arti"> · tekan untuk menumpuk, paling banyak {BATAS_LANGKAH}</span></span>
                  <span className="kendali-nilai angka-rata">{langkahTrans.length} / {BATAS_LANGKAH}</span>
                </div>
                <div className="pilihan-segmen pilihan-bungkus">
                  {URUT_TRANSFORMASI.map((l) => (
                    <button key={l} type="button" onClick={() => tambahLangkah(l)}
                            disabled={langkahTrans.length >= BATAS_LANGKAH}>
                      {NAMA_LANGKAH[l]}
                    </button>
                  ))}
                  <button type="button" disabled={langkahTrans.length === 0}
                          onClick={() => setLangkahTrans((l) => l.slice(0, -1))}>
                    ← batalkan
                  </button>
                  <button type="button" disabled={langkahTrans.length === 0}
                          onClick={() => setLangkahTrans([])}>
                    bersihkan
                  </button>
                </div>
              </div>
              <Petunjuk>
                tekan Mampat mendatar, lalu periksa: lebarnya jadi setengah.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'lipat-mutlak' && (
          <>
            <div className="layar">
              <LipatMutlak dasar={dasarMutlak} lipat={lipat} />
            </div>
            <div className="kendali">
              <Pilihan nama="Fungsi dasar" arti="yang akan diberi lambang mutlak"
                pilihan={URUT_DASAR_MUTLAK.map((d) => ({ nilai: d, label: NAMA_DASAR_MUTLAK[d] }))}
                nilai={dasarMutlak} onPilih={setDasarMutlak} />
              <Pilihan nama="Lambang mutlak dipasang di" arti="luar atau dalam kurung"
                pilihan={URUT_LIPATAN.map((l) => ({ nilai: l, label: NAMA_LIPATAN[l] }))}
                nilai={lipat} onPilih={setLipat} />
              <Petunjuk>{AKIBAT_LIPATAN[lipat]}</Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'balapan-tumbuh' && (
          <>
            <div className="layar">
              <BalapanTumbuh pokok={pokokBalap} akhir={akhirBalap} />
            </div>
            <div className="kendali">
              <Angka nama="Garis akhir" arti="langkah ke berapa balapannya dihentikan" kunci="akhir" satuan=" langkah"
                nilai={akhirBalap} onUbah={setAkhirBalap} min={BATAS_AKHIR.min} max={BATAS_AKHIR.maks} langkah={BATAS_AKHIR.langkah} />
              <Angka nama="Pengali tiap langkah" arti="bilangan pokok pertumbuhan eksponen" kunci="pokok"
                nilai={pokokBalap} onUbah={setPokokBalap} min={BATAS_POKOK_BALAP.min} max={BATAS_POKOK_BALAP.maks} langkah={BATAS_POKOK_BALAP.langkah} />
              <Petunjuk>
                geser garis akhir ke kanan, dan lihat penunjuk skala di pojok melonjak.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'cermin-yx' && (
          <>
            <div className="layar">
              <CerminYX pokok={pokokCermin} lipat={lipatCermin} />
            </div>
            <div className="kendali">
              <Angka nama="Lipatan" arti="0 belum dilipat, 1 tercermin penuh pada y = x" kunci="lipat"
                nilai={lipatCermin} onUbah={setLipatCermin} min={BATAS_LIPAT.min} max={BATAS_LIPAT.maks} langkah={BATAS_LIPAT.langkah} desimal={2} />
              <Angka nama="Bilangan pokok" arti="pokok eksponen dan logaritmanya" kunci="pokok"
                nilai={pokokCermin} onUbah={setPokokCermin} min={BATAS_POKOK_CERMIN.min} max={BATAS_POKOK_CERMIN.maks} langkah={BATAS_POKOK_CERMIN.langkah} />
              <Petunjuk>
                berhentilah di 0,5: seluruh kurva mendarat tepat di garis y = x.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'asimtot-rasional' && (
          <>
            <div className="layar">
              <AsimtotRasional h={hRas} k={kRas} />
            </div>
            <div className="kendali">
              <Angka nama="Geser mendatar" arti="h, asimtot tegaknya ikut pindah" kunci="h"
                nilai={hRas} onUbah={setHRas} min={BATAS_GESER_X.min} max={BATAS_GESER_X.maks} langkah={BATAS_GESER_X.langkah} />
              <Angka nama="Geser tegak" arti="k, asimtot mendatarnya ikut pindah" kunci="k"
                nilai={kRas} onUbah={setKRas} min={BATAS_GESER_Y.min} max={BATAS_GESER_Y.maks} langkah={BATAS_GESER_Y.langkah} />
              <Petunjuk>
                kedua asimtot ikut pindah. Ini aturan Materi 06, bukan bentuk baru.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && (tahap.widget === 'dua-mesin' || tahap.widget === 'mesin-balik') && (
          <>
            <div className="layar">
              <DuaMesin
                mesin={mesin}
                mode={tahap.widget === 'dua-mesin' ? 'komposisi' : 'invers'}
                masuk={masukMesin}
              />
            </div>
            <div className="kendali">
              <Pilihan nama="Mesin f" arti="fungsi yang dipasangkan dengan g"
                pilihan={[{ nilai: 'linear', label: NAMA_F.linear }, { nilai: 'kuadrat', label: NAMA_F.kuadrat }]}
                nilai={mesin} onPilih={setMesin} />
              <Angka nama="Angka yang dijalankan" arti="x yang dimasukkan ke mesin" kunci="masuk"
                nilai={masukMesin} onUbah={setMasukMesin} min={BATAS_MASUK.min} max={BATAS_MASUK.maks} langkah={BATAS_MASUK.langkah} />
              <Petunjuk>
                {tahap.widget === 'dua-mesin'
                  ? 'dua kurva berbeda berarti urutan mesin memang berpengaruh.'
                  : INVERS[mesin]
                    ? 'satu-satu, jadi inversnya ada dan grafiknya cerminan terhadap y = x.'
                    : 'kuadrat tidak satu-satu, jadi inversnya tidak ada. Itu isi pelajarannya.'}
              </Petunjuk>
            </div>
          </>
        )}

        {tahap.widget === 'dunia-nyata-grafik' && (
          <div className="isi-gulir">
            <DuniaNyataGrafik />
          </div>
        )}
      </>
    )

    kanan = (
      <>
        {tampilWidget && tahap.widget === 'pembaca-grafik' && (
          <div className="blok">
            <div className="cap">Angka dari alat</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>waktu</td><td>{angka(waktu, 1)} menit</td></tr>
                <tr className="tegas"><td>jarak dari rumah</td><td>{angka(jarak(waktu), 2)} km</td></tr>
                <tr><td>bagian cerita</td><td>{babakDi(waktu).judul}</td></tr>
              </tbody>
            </table>
            <div className="catatan">{babakDi(waktu).isi}</div>
            <div className="cap" style={{ marginTop: '0.9rem' }}>Seluruh perjalanannya</div>
            <table className="tabel-angka">
              <tbody>
                {BABAK.map((b) => (
                  <tr key={b.dari} className={b === babakDi(waktu) ? 'tegas' : undefined}>
                    <td>menit {b.dari} sampai {b.sampai}</td>
                    <td>{b.judul}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tampilWidget && tahap.widget === 'uji-garis-tegak' && (
          <div className="blok">
            <div className="cap">Hasil uji garis tegak</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>gambar</td><td>{NAMA_BENTUK[bentukUji]}</td></tr>
                <tr><td>rumusnya</td><td>{RUMUS_BENTUK[bentukUji]}</td></tr>
                <tr><td>garis tegak di</td><td>x = {angka(xUji, 1)}</td></tr>
                <tr className="tegas">
                  <td>banyak titik potong</td>
                  <td>{potongUji.length}</td>
                </tr>
                {potongUji.map((y, i) => (
                  <tr key={i}><td>nilai y ke-{i + 1}</td><td>{angka(y, 2)}</td></tr>
                ))}
              </tbody>
            </table>
            <div className="catatan">
              {ADALAH_FUNGSI[bentukUji]
                ? 'Gambar ini grafik fungsi: tidak ada satu pun garis tegak yang memotongnya lebih dari sekali.'
                : 'Gambar ini BUKAN grafik fungsi. Ada garis tegak yang memotongnya dua kali, artinya satu masukan punya dua keluaran.'}
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'bentuk-puncak' && (
          <div className="blok">
            <div className="cap">Yang terbaca langsung dari rumusnya</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>a</td><td>{angka(a, 1)}</td></tr>
                <tr><td>h</td><td>{angka(h, 1)}</td></tr>
                <tr><td>k</td><td>{angka(k, 1)}</td></tr>
                <tr className="tegas"><td>puncak</td><td>{tulisTitik(h, k, 1)}</td></tr>
                <tr><td>sumbu simetri</td><td>x = {angka(h, 1)}</td></tr>
                <tr><td>arah bukaan</td><td>{a > 0 ? 'ke atas' : a < 0 ? 'ke bawah' : 'bukan parabola'}</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Tidak satu pun angka di tabel ini perlu dihitung. Semuanya sudah tertulis di dalam
              rumusnya, dan itulah sebabnya bentuk ini disebut bentuk puncak.
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'wajah-parabola' && (
          <div className="blok">
            <div className="cap">Langkah demi langkah</div>
            <table className="tabel-angka">
              <tbody>
                {langkahLengkap(cWajah).map((l, n) => (
                  <tr key={n} className={n === langkahWajah ? 'tegas' : undefined}>
                    <td>{n + 1}</td>
                    <td>{l.baris}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cap" style={{ marginTop: '0.9rem' }}>Hasilnya</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>puncak</td><td>{tulisTitik(pucukWajah.h, pucukWajah.k, 1)}</td></tr>
                <tr><td>potong sumbu y</td><td>{tulisTitik(0, cWajah, 1)}</td></tr>
                <tr className="tegas"><td>diskriminan</td><td>{angka(Dwajah, 1)}</td></tr>
                <tr>
                  <td>potong sumbu x</td>
                  <td>{akarWajah.length === 0
                    ? 'tidak ada'
                    : akarWajah.map((r) => angka(r, 2)).join(' dan ')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {tampilWidget && tahap.widget === 'susun-parabola' && (
          <div className="blok">
            <div className="cap">Satu parabola, tiga cara menulisnya</div>
            <table className="tabel-angka">
              <tbody>
                {tigaBentuk(posSusun).map((b) => (
                  <tr key={b.nama}><td>{b.nama}</td><td>{b.rumus}</td></tr>
                ))}
              </tbody>
            </table>
            {parSusun && (
              <table className="tabel-angka" style={{ marginTop: '0.6rem' }}>
                <tbody>
                  <tr className="tegas"><td>nilai a</td><td>{angka(parSusun.a, 3)}</td></tr>
                  <tr><td>arah bukaan</td><td>{parSusun.a > 0 ? 'ke atas' : 'ke bawah'}</td></tr>
                </tbody>
              </table>
            )}
            <div className="catatan">
              Ketiganya menggambarkan parabola yang sama persis. Yang dipilih di soal adalah yang
              paling cocok dengan apa yang sudah diketahui.
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'papan-transformasi' && (
          <div className="blok">
            <div className="cap">Rumus yang sedang tersusun</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>fungsi dasar</td><td>{RUMUS_DASAR[dasarTrans]}</td></tr>
                <tr className="tegas"><td>sekarang</td><td>{tulisFungsi(langkahTrans)}</td></tr>
              </tbody>
            </table>
            <div className="cap" style={{ marginTop: '0.9rem' }}>Urutan yang sudah ditekan</div>
            <table className="tabel-angka">
              <tbody>
                {langkahTrans.length === 0 ? (
                  <tr><td>belum ada</td><td>tekan salah satu tombol</td></tr>
                ) : (
                  langkahTrans.map((l, n) => (
                    <tr key={n}>
                      <td>{n + 1}. {NAMA_LANGKAH[l]}</td>
                      <td>{['kanan', 'kiri', 'cermin-y', 'mampat-x'].includes(l)
                        ? 'di dalam kurung'
                        : 'di luar kurung'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className="catatan">
              Yang di luar kurung mengerjakan hasilnya, jadi akibatnya persis seperti yang tertulis.
              Yang di dalam kurung mengerjakan masukannya, jadi akibatnya kebalikannya.
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'lipat-mutlak' && (
          <div className="blok">
            <div className="cap">Bandingkan di x = -1</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>fungsi dasar</td><td>{NAMA_DASAR_MUTLAK[dasarMutlak]}</td></tr>
                <tr><td>tanpa mutlak</td><td>{angka(FUNGSI_MUTLAK[dasarMutlak](X_BANDING), 2)}</td></tr>
                <tr><td>mutlak di luar</td><td>{angka(bangunLipatan(dasarMutlak, 'luar')(X_BANDING), 2)}</td></tr>
                <tr><td>mutlak di dalam</td><td>{angka(bangunLipatan(dasarMutlak, 'dalam')(X_BANDING), 2)}</td></tr>
                <tr className="tegas"><td>yang tampil sekarang</td><td>{rumusLipatan(dasarMutlak, lipat)}</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              {dasarMutlak === 'garis'
                ? 'Pada f(x) = x - 2, di titik x = -1 bentuk pertama memberi 3 dan bentuk kedua memberi -1. Dua jawaban berbeda, jadi keduanya jelas bukan hal yang sama.'
                : 'Pada parabola ini, mutlak di dalam tidak mengubah apa pun, karena |x| yang dikuadratkan sama saja dengan x yang dikuadratkan. Coba fungsi garis untuk melihat bedanya.'}
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'balapan-tumbuh' && (
          <div className="blok">
            <div className="cap">Papan skor balapan</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>langkah</td><td>linear · kuadrat · eksponen</td></tr>
                {tabelBalapan(pokokBalap, akhirBalap).slice(-7).map((r) => (
                  <tr key={r.x} className={r.x === akhirBalap ? 'tegas' : undefined}>
                    <td>{r.x}</td>
                    <td>
                      {angka(r.linear, 0)} · {angka(r.kuadrat, 0)} ·{' '}
                      {r.eksponen >= 1000 ? angka(r.eksponen, 0) : angka(r.eksponen, 2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="catatan">
              {pokokBalap < 1
                ? 'Pengalinya di bawah 1, jadi yang terjadi peluruhan: angkanya mengecil terus mendekati nol tanpa pernah sampai.'
                : langkahMenyalip(pokokBalap, akhirBalap) !== null
                  ? `Kurva eksponen menyalip kurva kuadrat di langkah ${langkahMenyalip(pokokBalap, akhirBalap)}. Sebelum itu ia justru kalah, dan itulah sebabnya pertumbuhan eksponen sering terlambat disadari.`
                  : 'Sampai garis akhir ini eksponen belum menyalip kuadrat. Geser garis akhirnya lebih jauh ke kanan.'}
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'cermin-yx' && (
          <div className="blok">
            <div className="cap">Titik yang bertukar koordinat</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>pada eksponen</td><td>pada logaritma</td></tr>
                {PASANGAN.map((x) => {
                  const y = Math.pow(pokokCermin, x)
                  return (
                    <tr key={x}>
                      <td>{tulisTitik(x, y, 2)}</td>
                      <td>{tulisTitik(y, x, 2)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="catatan">
              Menukar x dengan y pada tiap titik sama artinya dengan mencerminkan seluruh gambar
              terhadap garis y = x. Karena itu grafik logaritma tidak perlu dihafal terpisah.
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'asimtot-rasional' && (
          <div className="blok">
            <div className="cap">Mendekati asimtot tegak</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>jarak x ke asimtot</td><td>nilai y</td></tr>
                {tabelDekatAsimtot(hRas, kRas).map((r) => (
                  <tr key={r.jarak}>
                    <td>{angka(r.jarak, 3)}</td>
                    <td>{angka(r.y, 2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cap" style={{ marginTop: '0.9rem' }}>Menjauh ke kanan</div>
            <table className="tabel-angka">
              <tbody>
                {tabelJauh(hRas, kRas).map((r) => (
                  <tr key={r.x}>
                    <td>x = {r.x.toLocaleString('id-ID')}</td>
                    <td>{angka(r.y, 6)}</td>
                  </tr>
                ))}
                <tr className="tegas"><td>asimtot datar</td><td>y = {angka(kRas, 1)}</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Rumusnya sekarang {rumusRasional(hRas, kRas)}. Nilainya makin merapat ke{' '}
              {angka(kRas, 1)}, tetapi tidak pernah sama dengannya. Alasan lengkapnya dijawab di
              topik Limit materi 07.
            </div>
          </div>
        )}

        {tampilWidget && (tahap.widget === 'dua-mesin' || tahap.widget === 'mesin-balik') && (
          <div className="blok">
            <div className="cap">Perjalanan angka {angka(masukMesin, 1)}</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>mesin f</td><td>{NAMA_F[mesin]}</td></tr>
                <tr><td>mesin g</td><td>{G_RUMUS}</td></tr>
                <tr><td>g dulu, lalu f</td><td>
                  {angka(masukMesin, 1)} ke {angka(jejak.gDulu.antara, 2)} ke {angka(jejak.gDulu.akhir, 2)}
                </td></tr>
                <tr><td>f dulu, lalu g</td><td>
                  {angka(masukMesin, 1)} ke {angka(jejak.fDulu.antara, 2)} ke {angka(jejak.fDulu.akhir, 2)}
                </td></tr>
                <tr className="tegas"><td>{RUMUS_FG[mesin]}</td><td>{angka(jejak.gDulu.akhir, 2)}</td></tr>
                <tr className="tegas"><td>{RUMUS_GF[mesin]}</td><td>{angka(jejak.fDulu.akhir, 2)}</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              {tahap.widget === 'mesin-balik'
                ? INVERS[mesin]
                  ? 'Fungsi ini satu-satu, jadi inversnya ada. Grafik inversnya adalah cerminan grafik aslinya terhadap garis y = x.'
                  : 'Fungsi kuadrat tidak satu-satu: dua masukan berbeda memberi keluaran yang sama, misalnya 3 dan -3 sama-sama memberi 10. Karena itu inversnya tidak ada, kecuali domainnya dibatasi.'
                : 'Urutan mesin berpengaruh. Yang dikerjakan lebih dulu adalah yang paling dekat dengan x, dan menukarnya biasanya memberi hasil yang berbeda.'}
            </div>
          </div>
        )}
      </>
    )
  }

  return <>{children({ kiri, kanan, tanda })}</>
}
