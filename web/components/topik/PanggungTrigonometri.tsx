'use client'

import { useState, type ReactNode } from 'react'
import SegitigaSebangun, { hitungGeometri, angka } from '@/components/widget/SegitigaSebangun'
import PenamaanSisi, { type SudutAktif } from '@/components/widget/PenamaanSisi'
import Bayangan, { BATAS_SUDUT, hitungBayangan } from '@/components/widget/Bayangan'
import PabrikRasio, { hitungRasio, SISI, type NamaSisi } from '@/components/widget/PabrikRasio'
import LingkaranSatuan, { hitungLingkaran, angka3 } from '@/components/widget/LingkaranSatuan'
import EnamRasio, { BATAS_ENAM, RASIO, URUT_RASIO, hitungEnam, type Rasio } from '@/components/widget/EnamRasio'
import PerjalananSudut, { ISTIMEWA } from '@/components/widget/PerjalananSudut'
import LingkaranKeGrafik, { BATAS_SAPU } from '@/components/widget/LingkaranKeGrafik'
import TigaGrafik from '@/components/widget/TigaGrafik'
import DuniaNyata from '@/components/widget/DuniaNyata'
import type { PropPanggung } from '@/components/topik/jenis'

/**
 * Panggung Trigonometri: penyetelan kesepuluh widgetnya, dan tidak lebih.
 *
 * Dipisah dari rangka halaman pada 1 September 2026, saat topik kedua dibangun.
 * Sebelumnya rangka dan penyetelan widget bercampur dalam satu berkas 638 baris,
 * sehingga topik kedua tidak punya jalan lain selain menyalin seluruhnya. Kalau
 * itu terjadi, tiap revisi tampilan harus dikerjakan dua kali, dan enam kali
 * kalau keenam topik jadi.
 *
 * Komponen ini TIDAK tahu apa-apa soal tab, kunci kuis, atau penghitung waktu
 * membaca. Tugasnya hanya menyiapkan dua potongan tampilan, lalu menyerahkannya
 * ke rangka lewat `children`.
 */
export default function PanggungTrigonometri({ tahap, tampilWidget, children }: PropPanggung) {
  // keadaan tiap widget dipegang di sini supaya tidak hilang saat pindah tahap
  const [skala, setSkala] = useState(100)
  const [derajat, setDerajat] = useState(37)
  const [sudutSinar, setSudutSinar] = useState(51)
  const [sudutDilihat, setSudutDilihat] = useState<SudutAktif>('A')
  const [pembilang, setPembilang] = useState<NamaSisi>('depan')
  const [penyebut, setPenyebut] = useState<NamaSisi>('miring')
  const [sudutLingkaran, setSudutLingkaran] = useState(52)
  const [sudutEnam, setSudutEnam] = useState(45)
  const [sorotRasio, setSorotRasio] = useState<Rasio>('tan')
  const [langkahIstimewa, setLangkahIstimewa] = useState(2)
  const [sudutSapu, setSudutSapu] = useState(200)

  let kiri: ReactNode = null
  let kanan: ReactNode = null
  let tanda = 'BACAAN'

  if (tahap) {
    if (tahap.widget === 'dunia-nyata') tanda = 'CONTOH NYATA'
    else if (tahap.widget) tanda = 'INTERAKTIF'

    kiri = (
      <>
        {tampilWidget && tahap.widget === 'bayangan' && (
          <>
            <div className="layar"><Bayangan derajat={sudutSinar} /></div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="sinar">
                  <span>Sudut sinar matahari</span>
                  <span className="mono">{sudutSinar}°</span>
                </label>
                <input id="sinar" type="range"
                       min={BATAS_SUDUT.min} max={BATAS_SUDUT.maks} value={sudutSinar}
                       onChange={(e) => setSudutSinar(+e.target.value)} />
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>
                  kedua bayangan berubah panjang, tapi kedua hasil baginya tetap{' '}
                  {angka(hitungBayangan(sudutSinar).tan)}
                </span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'segitiga-sebangun' && (
          <>
            <div className="layar">
              <SegitigaSebangun
                skala={skala}
                derajat={derajat}
                onUbah={(sk, dj) => { setSkala(sk); setDerajat(dj) }}
              />
            </div>
            <div className="kendali">
              <div>
                <label htmlFor="skala">
                  <span>Besar segitiga</span>
                  <span className="mono">{skala}%</span>
                </label>
                <input id="skala" type="range" min={35} max={100} value={skala}
                       onChange={(e) => setSkala(+e.target.value)} />
              </div>
              <div>
                {/* θ dikecualikan dari huruf besar, kalau ikut, ia jadi Θ */}
                <label htmlFor="sudut">
                  <span>Sudut <span style={{ textTransform: 'none' }}>θ</span></span>
                  <span className="mono">{derajat}°</span>
                </label>
                <input id="sudut" type="range" min={10} max={80} value={derajat}
                       onChange={(e) => setDerajat(+e.target.value)} />
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>tarik titik puncaknya, atau geser kendali di atas ·
                  skala tampilan 1 cm = {angka(hitungGeometri(skala, derajat).ppc, 1)} px</span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'penamaan-sisi' && (
          <div className="layar">
            <PenamaanSisi aktif={sudutDilihat} onPilih={setSudutDilihat} />
          </div>
        )}

        {tampilWidget && tahap.widget === 'pabrik-rasio' && (
          <>
            <div className="layar">
              <PabrikRasio pembilang={pembilang} penyebut={penyebut} />
            </div>
            <div className="kendali">
              <PilihSisi label="Pembilang (atas)" nilai={pembilang} atur={setPembilang} />
              <PilihSisi label="Penyebut (bawah)" nilai={penyebut} atur={setPenyebut} />
              <div className="skala-info">
                <span className="titik" />
                <span>coba keenam pasangan, tiap satu punya nama resminya sendiri</span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'lingkaran-satuan' && (
          <>
            <div className="layar">
              <LingkaranSatuan derajat={sudutLingkaran} onUbah={setSudutLingkaran} />
            </div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="sudutLingkaran">
                  <span>Sudut <span style={{ textTransform: 'none' }}>θ</span></span>
                  <span className="mono">{sudutLingkaran}°</span>
                </label>
                <input id="sudutLingkaran" type="range" min={0} max={359}
                       value={sudutLingkaran}
                       onChange={(e) => setSudutLingkaran(+e.target.value)} />
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>lewati 90° dan perhatikan cos mulai bernilai negatif</span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'enam-rasio' && (
          <>
            <div className="layar"><EnamRasio derajat={sudutEnam} sorot={sorotRasio} /></div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="sudutEnam">
                  <span>Sudut <span style={{ textTransform: 'none' }}>θ</span></span>
                  <span className="mono">{sudutEnam}°</span>
                </label>
                <input id="sudutEnam" type="range"
                       min={BATAS_ENAM.min} max={BATAS_ENAM.maks} value={sudutEnam}
                       onChange={(e) => setSudutEnam(+e.target.value)} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label><span>Sorot rasio</span></label>
                <div className="pilih-sisi">
                  {URUT_RASIO.map((r) => (
                    <button key={r} aria-pressed={sorotRasio === r} onClick={() => setSorotRasio(r)}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'perjalanan-sudut' && (
          <>
            <div className="layar"><PerjalananSudut indeks={langkahIstimewa} /></div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 8 }}>
                <button className="tombol garis" style={{ flex: 'none' }}
                        disabled={langkahIstimewa === 0}
                        onClick={() => setLangkahIstimewa((n) => n - 1)}>← SEBELUM</button>
                <div className="pilih-sisi" style={{ flex: 1, flexWrap: 'wrap' }}>
                  {ISTIMEWA.map((t, n) => (
                    <button key={t.derajat} aria-pressed={langkahIstimewa === n}
                            onClick={() => setLangkahIstimewa(n)}>{t.derajat}°</button>
                  ))}
                </div>
                <button className="tombol garis" style={{ flex: 'none' }}
                        disabled={langkahIstimewa === ISTIMEWA.length - 1}
                        onClick={() => setLangkahIstimewa((n) => n + 1)}>BERIKUT →</button>
              </div>
            </div>
          </>
        )}

        {tampilWidget && (tahap.widget === 'lingkaran-ke-grafik' || tahap.widget === 'tiga-grafik') && (
          <>
            <div className="layar">
              {tahap.widget === 'lingkaran-ke-grafik'
                ? <LingkaranKeGrafik derajat={sudutSapu} />
                : <TigaGrafik derajat={sudutSapu} />}
            </div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="sudutSapu">
                  <span>Sudut yang sudah disapu</span>
                  <span className="mono">{sudutSapu}°</span>
                </label>
                <input id="sudutSapu" type="range"
                       min={BATAS_SAPU.min} max={BATAS_SAPU.maks} step={2} value={sudutSapu}
                       onChange={(e) => setSudutSapu(+e.target.value)} />
              </div>
              <div className="skala-info">
                <span className="titik" />
                <span>naikkan sampai lewat 360°, kurvanya mengulang persis</span>
              </div>
            </div>
          </>
        )}

        {/* Materi 10 bukan alat, melainkan galeri. Tugasnya menunjukkan
            DI MANA trigonometri berada, dan untuk itu foto utuh sudah
            cukup. Penggeser yang dulu ada di sini tidak menjelaskan
            apa pun dan memaksa fotonya dipotong.
            (Keputusan ARYA, 1 Sep 2026.) */}
        {tahap.widget === 'dunia-nyata' && (
          <div className="isi-gulir">
            <DuniaNyata />
          </div>
        )}
      </>
    )

    kanan = (
      <>
        {/* angka hidup hanya untuk tahap yang punya widget berangka */}
        {tampilWidget && tahap.widget === 'segitiga-sebangun' && (
          <div className="blok">
            <div className="cap">Angka dari segitiga</div>
            <AngkaSegitiga skala={skala} derajat={derajat} />
          </div>
        )}
        {tampilWidget && tahap.widget === 'pabrik-rasio' && (
          <div className="blok">
            <div className="cap">Hasil pilihan Anda</div>
            <HasilRasio pembilang={pembilang} penyebut={penyebut} />
          </div>
        )}
        {tampilWidget && tahap.widget === 'enam-rasio' && (
          <div className="blok">
            <div className="cap">Keenamnya pada sudut {sudutEnam}°</div>
            <table className="tabel-angka">
              <tbody>
                {URUT_RASIO.map((r) => (
                  <tr key={r} className={sorotRasio === r ? 'tegas' : undefined}>
                    <td>{RASIO[r].lambang}, {RASIO[r].nama}</td>
                    <td>{angka(hitungEnam(sudutEnam)[r], 3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="catatan">{RASIO[sorotRasio].letak}</div>
          </div>
        )}
        {tampilWidget && tahap.widget === 'perjalanan-sudut' && (
          <div className="blok">
            <div className="cap">
              {ISTIMEWA[langkahIstimewa].derajat}° = {ISTIMEWA[langkahIstimewa].radian}
            </div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>sin θ</td><td>{ISTIMEWA[langkahIstimewa].sin}</td></tr>
                <tr><td>cos θ</td><td>{ISTIMEWA[langkahIstimewa].cos}</td></tr>
                <tr className="tegas"><td>tan θ</td><td>{ISTIMEWA[langkahIstimewa].tan}</td></tr>
              </tbody>
            </table>
            <div className="catatan">{ISTIMEWA[langkahIstimewa].asal}</div>
          </div>
        )}
        {tampilWidget && tahap.widget === 'lingkaran-satuan' && (
          <div className="blok">
            <div className="cap">Titik pada sudut {sudutLingkaran}°</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>cos θ, koordinat x</td><td>{angka3(hitungLingkaran(sudutLingkaran).cos)}</td></tr>
                <tr><td>sin θ, koordinat y</td><td>{angka3(hitungLingkaran(sudutLingkaran).sin)}</td></tr>
                <tr className="tegas"><td>jari-jari (sisi miring)</td><td>1</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Titiknya selalu berada di (cos θ, sin θ). Tidak ada pembagian sama sekali.
            </div>
          </div>
        )}
        {tampilWidget && tahap.widget === 'penamaan-sisi' && (
          <div className="blok">
            <div className="cap">Dilihat dari sudut {sudutDilihat}</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>sisi depan</td><td>{sudutDilihat === 'A' ? 'BC' : 'AB'}</td></tr>
                <tr><td>sisi samping</td><td>{sudutDilihat === 'A' ? 'AB' : 'BC'}</td></tr>
                <tr className="tegas"><td>sisi miring</td><td>AC</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Klik sudut yang lain di gambar. Sisi depan dan samping bertukar; sisi miring tidak.
            </div>
          </div>
        )}
      </>
    )
  }

  return <>{children({ kiri, kanan, tanda })}</>
}

/** Pemilih sisi untuk widget Pabrik Rasio. Di luar render induk, bukan di dalamnya. */
function PilihSisi({
  label, nilai, atur,
}: {
  label: string; nilai: NamaSisi; atur: (s: NamaSisi) => void
}) {
  return (
    <div>
      <label><span>{label}</span></label>
      <div className="pilih-sisi">
        {(Object.keys(SISI) as NamaSisi[]).map((s) => (
          <button
            key={s}
            aria-pressed={nilai === s}
            onClick={() => atur(s)}
            style={{ ['--w' as string]: SISI[s].warna }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

function HasilRasio({ pembilang, penyebut }: { pembilang: NamaSisi; penyebut: NamaSisi }) {
  const r = hitungRasio(pembilang, penyebut)
  return (
    <>
      <table className="tabel-angka">
        <tbody>
          <tr><td>pembilang</td><td>{pembilang} = {SISI[pembilang].panjang}</td></tr>
          <tr><td>penyebut</td><td>{penyebut} = {SISI[penyebut].panjang}</td></tr>
          <tr className="tegas">
            <td>{r.pecahan}</td>
            <td>{angka(r.nilai, 3)}</td>
          </tr>
        </tbody>
      </table>
      {r.sama ? (
        <div className="catatan">
          Sisi yang sama dibagi dirinya sendiri selalu 1. Tidak ada nama khusus untuk ini -
          pilih dua sisi yang berbeda.
        </div>
      ) : r.resmi ? (
        <div className="nama-resmi">
          <span className="lambang mono">{r.resmi.lambang}</span>
          <span className="nama">{r.resmi.nama}</span>
          <span className="catatan-resmi">{r.resmi.catatan}</span>
        </div>
      ) : null}
    </>
  )
}

function AngkaSegitiga({ skala, derajat }: { skala: number; derajat: number }) {
  const g = hitungGeometri(skala, derajat)
  return (
    <table className="tabel-angka">
      <tbody>
        <tr><td>sisi samping</td><td>{angka(g.sampingCm)} cm</td></tr>
        <tr><td>sisi depan</td><td>{angka(g.depanCm)} cm</td></tr>
        <tr><td>sisi miring</td><td>{angka(g.miringCm)} cm</td></tr>
        <tr className="tegas"><td>depan ÷ samping</td><td>{angka(g.tan, 3)}</td></tr>
      </tbody>
    </table>
  )
}
