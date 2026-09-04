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
  AWAL, parabolaDari, tigaBentuk, type PosisiSusun,
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
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="waktu">
                  <span>Menit ke</span>
                  <span className="mono">{angka(waktu, 1)}</span>
                </label>
                <input id="waktu" type="range"
                       min={BATAS_WAKTU.min} max={BATAS_WAKTU.maks} step={BATAS_WAKTU.langkah}
                       value={waktu} onChange={(e) => setWaktu(+e.target.value)} />
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>titiknya bisa diseret langsung di gambar, penggeser ini jalan kedua</span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'uji-garis-tegak' && (
          <>
            <div className="layar">
              <UjiGarisTegak bentuk={bentukUji} x={xUji} onGeser={setXUji} />
            </div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label><span>Gambar yang diuji</span></label>
                <div className="pilih-sisi" style={{ flexWrap: 'wrap' }}>
                  {URUT_BENTUK.map((b) => (
                    <button key={b} aria-pressed={bentukUji === b}
                            onClick={() => setBentukUji(b)} style={{ flex: '1 1 30%' }}>
                      {NAMA_BENTUK[b]}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="xuji">
                  <span>Letak garis tegak</span>
                  <span className="mono">x = {angka(xUji, 1)}</span>
                </label>
                <input id="xuji" type="range"
                       min={BATAS_GARIS.min} max={BATAS_GARIS.maks} step={BATAS_GARIS.langkah}
                       value={xUji} onChange={(e) => setXUji(+e.target.value)} />
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>
                  {ADALAH_FUNGSI[bentukUji]
                    ? 'geser ke mana pun, potongnya tetap satu. Ini grafik fungsi'
                    : 'cari posisi yang memotong dua kali, dan buktinya selesai'}
                </span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'bentuk-puncak' && (
          <>
            <div className="layar">
              <BentukPuncak nilai={puncakSekarang} bayang={bayang} />
            </div>
            <div className="kendali">
              <div>
                <label htmlFor="pa"><span>a</span><span className="mono">{angka(a, 1)}</span></label>
                <input id="pa" type="range" min={BATAS_A.min} max={BATAS_A.maks} step={BATAS_A.langkah}
                       value={a} onPointerDown={rekamBayang} onKeyDown={rekamBayang}
                       onChange={(e) => setA(+e.target.value)} />
              </div>
              <div>
                <label htmlFor="ph"><span>h</span><span className="mono">{angka(h, 1)}</span></label>
                <input id="ph" type="range" min={BATAS_H.min} max={BATAS_H.maks} step={BATAS_H.langkah}
                       value={h} onPointerDown={rekamBayang} onKeyDown={rekamBayang}
                       onChange={(e) => setH(+e.target.value)} />
              </div>
              <div>
                <label htmlFor="pk"><span>k</span><span className="mono">{angka(k, 1)}</span></label>
                <input id="pk" type="range" min={BATAS_K.min} max={BATAS_K.maks} step={BATAS_K.langkah}
                       value={k} onPointerDown={rekamBayang} onKeyDown={rekamBayang}
                       onChange={(e) => setK(+e.target.value)} />
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>besarkan h, dan perhatikan parabolanya pergi ke KANAN walaupun tandanya minus</span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'wajah-parabola' && (
          <>
            <div className="layar">
              <WajahParabola c={cWajah} langkah={langkahWajah} />
            </div>
            <div className="kendali">
              <div>
                <label><span>Langkah</span><span className="mono">{langkahWajah + 1} / {JUMLAH_LANGKAH}</span></label>
                <div className="pilih-sisi">
                  <button disabled={langkahWajah <= 0} onClick={() => setLangkahWajah((n) => n - 1)}>
                    ← mundur
                  </button>
                  <button disabled={langkahWajah >= JUMLAH_LANGKAH - 1}
                          onClick={() => setLangkahWajah((n) => n + 1)}>
                    maju →
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="cwajah"><span>Nilai c</span><span className="mono">{angka(cWajah, 1)}</span></label>
                <input id="cwajah" type="range"
                       min={BATAS_C.min} max={BATAS_C.maks} step={BATAS_C.langkah}
                       value={cWajah} onChange={(e) => setCWajah(+e.target.value)} />
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>naikkan c melewati 2, dan kedua titik potong sumbu x menghilang</span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'susun-parabola' && (
          <>
            <div className="layar">
              <SusunParabola pos={posSusun} onGeser={setPosSusun} />
            </div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label><span>Contoh siap pakai</span></label>
                <div className="pilih-sisi" style={{ flexWrap: 'wrap' }}>
                  <button onClick={() => setPosSusun(AWAL)} style={{ flex: '1 1 45%' }}>
                    puncak (2, 8) lewat (0, 4)
                  </button>
                  <button
                    onClick={() => setPosSusun({ puncak: { x: 1, y: -8 }, titik: { x: 4, y: 1 } })}
                    style={{ flex: '1 1 45%' }}
                  >
                    puncak (1, -8) lewat (4, 1)
                  </button>
                </div>
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>seret kedua titik berwarna di gambar. Angkanya berhenti di kelipatan 0,5</span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'papan-transformasi' && (
          <>
            <div className="layar">
              <PapanTransformasi dasar={dasarTrans} langkah={langkahTrans} />
            </div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label><span>Fungsi dasar</span></label>
                <div className="pilih-sisi">
                  {URUT_DASAR.map((d) => (
                    <button key={d} aria-pressed={dasarTrans === d}
                            onClick={() => { setDasarTrans(d); setLangkahTrans([]) }}>
                      {NAMA_DASAR[d]}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>
                  <span>Transformasi</span>
                  <span className="mono">{langkahTrans.length} / {BATAS_LANGKAH}</span>
                </label>
                <div className="pilih-sisi" style={{ flexWrap: 'wrap' }}>
                  {URUT_TRANSFORMASI.map((l) => (
                    <button key={l} onClick={() => tambahLangkah(l)}
                            disabled={langkahTrans.length >= BATAS_LANGKAH}
                            style={{ flex: '1 1 22%' }}>
                      {NAMA_LANGKAH[l]}
                    </button>
                  ))}
                  {/* Tombol batalkan dan bersihkan ditaruh di baris yang SAMA
                      dengan tombol transformasi, bukan di baris sendiri. Tiap
                      baris kendali yang ditambahkan memakan tinggi panggung,
                      dan grafiknyalah yang mengecil. */}
                  <button disabled={langkahTrans.length === 0}
                          onClick={() => setLangkahTrans((l) => l.slice(0, -1))}
                          style={{ flex: '1 1 22%' }}>
                    ← batalkan
                  </button>
                  <button disabled={langkahTrans.length === 0}
                          onClick={() => setLangkahTrans([])}
                          style={{ flex: '1 1 22%' }}>
                    bersihkan
                  </button>
                </div>
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>tekan Mampat mendatar, lalu periksa: lebarnya jadi setengah</span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'lipat-mutlak' && (
          <>
            <div className="layar">
              <LipatMutlak dasar={dasarMutlak} lipat={lipat} />
            </div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label><span>Fungsi dasar</span></label>
                <div className="pilih-sisi">
                  {URUT_DASAR_MUTLAK.map((d) => (
                    <button key={d} aria-pressed={dasarMutlak === d} onClick={() => setDasarMutlak(d)}>
                      {NAMA_DASAR_MUTLAK[d]}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label><span>Lambang mutlak dipasang di</span></label>
                <div className="pilih-sisi">
                  {URUT_LIPATAN.map((l) => (
                    <button key={l} aria-pressed={lipat === l} onClick={() => setLipat(l)}>
                      {NAMA_LIPATAN[l]}
                    </button>
                  ))}
                </div>
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>{AKIBAT_LIPATAN[lipat]}</span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'balapan-tumbuh' && (
          <>
            <div className="layar">
              <BalapanTumbuh pokok={pokokBalap} akhir={akhirBalap} />
            </div>
            <div className="kendali">
              <div>
                <label htmlFor="akhir">
                  <span>Garis akhir</span>
                  <span className="mono">langkah {akhirBalap}</span>
                </label>
                <input id="akhir" type="range"
                       min={BATAS_AKHIR.min} max={BATAS_AKHIR.maks} step={BATAS_AKHIR.langkah}
                       value={akhirBalap} onChange={(e) => setAkhirBalap(+e.target.value)} />
              </div>
              <div>
                <label htmlFor="pokok">
                  <span>Pengali tiap langkah</span>
                  <span className="mono">{angka(pokokBalap, 1)}</span>
                </label>
                <input id="pokok" type="range"
                       min={BATAS_POKOK_BALAP.min} max={BATAS_POKOK_BALAP.maks}
                       step={BATAS_POKOK_BALAP.langkah}
                       value={pokokBalap} onChange={(e) => setPokokBalap(+e.target.value)} />
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>geser garis akhir ke kanan, dan lihat penunjuk skala di pojok melonjak</span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'cermin-yx' && (
          <>
            <div className="layar">
              <CerminYX pokok={pokokCermin} lipat={lipatCermin} />
            </div>
            <div className="kendali">
              <div>
                <label htmlFor="lipatc">
                  <span>Lipatan</span>
                  <span className="mono">{angka(lipatCermin * 100, 0)} persen</span>
                </label>
                <input id="lipatc" type="range"
                       min={BATAS_LIPAT.min} max={BATAS_LIPAT.maks} step={BATAS_LIPAT.langkah}
                       value={lipatCermin} onChange={(e) => setLipatCermin(+e.target.value)} />
              </div>
              <div>
                <label htmlFor="pokokc">
                  <span>Bilangan pokok</span>
                  <span className="mono">{angka(pokokCermin, 1)}</span>
                </label>
                <input id="pokokc" type="range"
                       min={BATAS_POKOK_CERMIN.min} max={BATAS_POKOK_CERMIN.maks}
                       step={BATAS_POKOK_CERMIN.langkah}
                       value={pokokCermin} onChange={(e) => setPokokCermin(+e.target.value)} />
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>berhentilah di 50 persen: seluruh kurva mendarat tepat di garis y = x</span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'asimtot-rasional' && (
          <>
            <div className="layar">
              <AsimtotRasional h={hRas} k={kRas} />
            </div>
            <div className="kendali">
              <div>
                <label htmlFor="hras">
                  <span>Geser mendatar</span>
                  <span className="mono">{angka(hRas, 1)}</span>
                </label>
                <input id="hras" type="range"
                       min={BATAS_GESER_X.min} max={BATAS_GESER_X.maks} step={BATAS_GESER_X.langkah}
                       value={hRas} onChange={(e) => setHRas(+e.target.value)} />
              </div>
              <div>
                <label htmlFor="kras">
                  <span>Geser tegak</span>
                  <span className="mono">{angka(kRas, 1)}</span>
                </label>
                <input id="kras" type="range"
                       min={BATAS_GESER_Y.min} max={BATAS_GESER_Y.maks} step={BATAS_GESER_Y.langkah}
                       value={kRas} onChange={(e) => setKRas(+e.target.value)} />
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>kedua asimtot ikut pindah. Ini aturan tahap 6, bukan bentuk baru</span>
              </div>
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
              <div style={{ gridColumn: '1 / -1' }}>
                <label><span>Mesin f</span></label>
                <div className="pilih-sisi">
                  <button aria-pressed={mesin === 'linear'} onClick={() => setMesin('linear')}>
                    {NAMA_F.linear}
                  </button>
                  <button aria-pressed={mesin === 'kuadrat'} onClick={() => setMesin('kuadrat')}>
                    {NAMA_F.kuadrat}
                  </button>
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="masuk">
                  <span>Angka yang dijalankan</span>
                  <span className="mono">x = {angka(masukMesin, 1)}</span>
                </label>
                <input id="masuk" type="range"
                       min={BATAS_MASUK.min} max={BATAS_MASUK.maks} step={BATAS_MASUK.langkah}
                       value={masukMesin} onChange={(e) => setMasukMesin(+e.target.value)} />
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>
                  {tahap.widget === 'dua-mesin'
                    ? 'dua kurva berbeda berarti urutan mesin memang berpengaruh'
                    : INVERS[mesin]
                      ? 'satu-satu, jadi inversnya ada dan grafiknya cerminan terhadap y = x'
                      : 'kuadrat tidak satu-satu, jadi inversnya tidak ada. Itu isi pelajarannya'}
                </span>
              </div>
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
