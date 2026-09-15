'use client'

import { useState, type ReactNode } from 'react'
import SegitigaSebangun, { hitungGeometri, angka } from '@/components/widget/SegitigaSebangun'
import PenamaanSisi, { type SudutAktif } from '@/components/widget/PenamaanSisi'
import Bayangan, { BATAS_SUDUT, hitungBayangan } from '@/components/widget/Bayangan'
import PabrikRasio, { hitungRasio, SISI, type NamaSisi } from '@/components/widget/PabrikRasio'
import LingkaranSatuan, { hitungLingkaran, angka3 } from '@/components/widget/LingkaranSatuan'
import EnamRasio, { BATAS_ENAM, RASIO, URUT_RASIO, hitungEnam, type Rasio } from '@/components/widget/EnamRasio'
import PerjalananSudut, { ISTIMEWA, tulisSudut, type SatuanSudut } from '@/components/widget/PerjalananSudut'
import LingkaranKeGrafik, { BATAS_SAPU } from '@/components/widget/LingkaranKeGrafik'
import TigaGrafik from '@/components/widget/TigaGrafik'
import DuniaNyata from '@/components/widget/DuniaNyata'
import type { PropPanggung } from '@/components/topik/jenis'
import { Angka, Petunjuk, Pilihan } from '@/components/kendali'

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
  // Satuan sudut widget sudut istimewa: bawaan derajat, sama dengan videonya
  // (permintaan ARYA 13 Sep 2026); siswa bisa berganti ke radian.
  const [satuanSudut, setSatuanSudut] = useState<SatuanSudut>('derajat')
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
              <Angka nama="Sudut sinar matahari" arti="makin tinggi matahari, makin pendek bayangan" kunci="sinar" satuan="°"
                nilai={sudutSinar} onUbah={setSudutSinar} min={BATAS_SUDUT.min} max={BATAS_SUDUT.maks} langkah={1} />
              <Petunjuk>
                  sinar matahari sejajar karena mataharinya sangat jauh, jadi sudutnya sama di pohon dan di orang;
                  kedua bayangan berubah panjang, tetapi kedua hasil baginya tetap{' '}
                  {angka(hitungBayangan(sudutSinar).tan)}
                </Petunjuk>
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
              <Angka nama="Besar segitiga" arti="hanya memperbesar gambarnya, sudutnya tidak ikut berubah" kunci="skala" satuan="%"
                nilai={skala} onUbah={setSkala} min={35} max={100} langkah={1} />
              <Angka nama="Sudut θ" arti="sudut di titik A, inilah yang menentukan rasionya" kunci="sudut" satuan="°"
                nilai={derajat} onUbah={setDerajat} min={10} max={80} langkah={1} />
              <Petunjuk>tarik titik puncaknya ke samping untuk ukuran, ke atas atau ke bawah untuk sudut
                  (satu tarikan hanya mengubah satu hal), atau geser kendali di atas ·
                  skala tampilan 1 cm = {angka(hitungGeometri(skala, derajat).ppc, 1)} px</Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'penamaan-sisi' && (
          <>
            <div className="layar">
              <PenamaanSisi aktif={sudutDilihat} onPilih={setSudutDilihat} />
            </div>
            <div className="kendali">
              <Pilihan nama="Sudut yang dilihat" arti="nama sisi ikut berpindah bersama sudutnya"
                pilihan={[{ nilai: 'A', label: 'Sudut A' }, { nilai: 'C', label: 'Sudut C' }]}
                nilai={sudutDilihat} onPilih={setSudutDilihat} />
              <Petunjuk>
                sisi miring tidak pernah berubah, tetapi depan dan samping bertukar tempat.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'pabrik-rasio' && (
          <>
            <div className="layar">
              <PabrikRasio pembilang={pembilang} penyebut={penyebut} />
            </div>
            <div className="kendali">
              <PilihSisi label="Pembilang (atas)" arti="sisi yang dibagi" nilai={pembilang} atur={setPembilang} />
              <PilihSisi label="Penyebut (bawah)" arti="sisi pembaginya" nilai={penyebut} atur={setPenyebut} />
              <Petunjuk>coba keenam pasangan, tiap satu punya nama resminya sendiri</Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'lingkaran-satuan' && (
          <>
            <div className="layar">
              <LingkaranSatuan derajat={sudutLingkaran} onUbah={setSudutLingkaran} />
            </div>
            <div className="kendali">
              <Angka nama="Sudut θ" arti="diukur dari sumbu x positif, berlawanan arah jarum jam" kunci="sudut" satuan="°"
                nilai={sudutLingkaran} onUbah={setSudutLingkaran} min={0} max={359} langkah={1} />
              <Petunjuk>lewati 90° dan perhatikan cos mulai bernilai negatif</Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'enam-rasio' && (
          <>
            <div className="layar"><EnamRasio derajat={sudutEnam} sorot={sorotRasio} /></div>
            <div className="kendali">
              <Angka nama="Sudut θ" arti="keenam rasio dihitung dari sudut ini" kunci="sudut" satuan="°"
                nilai={sudutEnam} onUbah={setSudutEnam} min={BATAS_ENAM.min} max={BATAS_ENAM.maks} langkah={1} />
              <Pilihan nama="Sorot rasio" arti="yang dipilih ditebalkan di gambar"
                pilihan={URUT_RASIO.map((r) => ({ nilai: r, label: r }))}
                nilai={sorotRasio} onPilih={setSorotRasio} />
              <Petunjuk>
                tiap rasio punya kebalikannya: sin dengan csc, cos dengan sec, tan dengan cot.
              </Petunjuk>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'perjalanan-sudut' && (
          <>
            <div className="layar"><PerjalananSudut indeks={langkahIstimewa} satuan={satuanSudut} /></div>
            <div className="kendali">
              <Pilihan nama="Satuan sudut" arti="derajat seperti di video, atau radian"
                pilihan={[{ nilai: 'derajat', label: 'derajat (°)' }, { nilai: 'radian', label: 'radian (π)' }]}
                nilai={satuanSudut} onPilih={setSatuanSudut} />
              <Pilihan nama="Sudut istimewa" arti="urutannya dari kecil ke besar"
                pilihan={ISTIMEWA.map((t, n) => ({ nilai: String(n), label: tulisSudut(t, satuanSudut) }))}
                nilai={String(langkahIstimewa)} onPilih={(n) => setLangkahIstimewa(Number(n))} />
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="tombol garis" style={{ flex: 1 }}
                        disabled={langkahIstimewa === 0}
                        onClick={() => setLangkahIstimewa((n) => n - 1)}>← SEBELUM</button>
                <button className="tombol garis" style={{ flex: 1 }}
                        disabled={langkahIstimewa === ISTIMEWA.length - 1}
                        onClick={() => setLangkahIstimewa((n) => n + 1)}>BERIKUT →</button>
              </div>
              <Petunjuk>
                jalani satu per satu, dan perhatikan nilai sin dan cos yang selalu berupa akar sederhana.
              </Petunjuk>
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
              <Angka nama="Sudut yang sudah disapu" arti="jarumnya berjalan dari 0°, grafiknya tergambar sejauh itu" kunci="sapu" satuan="°"
                nilai={sudutSapu} onUbah={setSudutSapu} min={BATAS_SAPU.min} max={BATAS_SAPU.maks} langkah={2} />
              <Petunjuk>naikkan sampai lewat 360°, kurvanya mengulang persis</Petunjuk>
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
              θ = {tulisSudut(ISTIMEWA[langkahIstimewa], satuanSudut)}
              {' '}({tulisSudut(ISTIMEWA[langkahIstimewa], satuanSudut === 'radian' ? 'derajat' : 'radian')})
            </div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>sin θ</td><td>{ISTIMEWA[langkahIstimewa].sin}</td></tr>
                <tr><td>cos θ</td><td>{ISTIMEWA[langkahIstimewa].cos}</td></tr>
                <tr className="tegas"><td>tan θ = sin θ : cos θ</td><td>{ISTIMEWA[langkahIstimewa].tan}</td></tr>
                <tr><td>titik (cos θ, sin θ)</td><td>({ISTIMEWA[langkahIstimewa].cos}, {ISTIMEWA[langkahIstimewa].sin})</td></tr>
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
  label, arti, nilai, atur,
}: {
  label: string; arti: string; nilai: NamaSisi; atur: (s: NamaSisi) => void
}) {
  return (
    <div className="kendali-pilihan">
      <div className="kendali-nama">
        <span><b>{label}</b><span className="kendali-arti"> · {arti}</span></span>
        <span className="kendali-nilai">{nilai}</span>
      </div>
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
