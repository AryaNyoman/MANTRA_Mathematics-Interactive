'use client'

import { useState, type ReactNode } from 'react'
import CerminLurus, { BATAS_CERMIN } from '@/components/widget/transformasi-geometri/CerminLurus'
import CerminMiring from '@/components/widget/transformasi-geometri/CerminMiring'
import CerminTitik from '@/components/widget/transformasi-geometri/CerminTitik'
import GeserBentuk from '@/components/widget/transformasi-geometri/GeserBentuk'
import PapanBebas from '@/components/widget/transformasi-geometri/PapanBebas'
import {
  BENTUK_L, SUDUT_BERNAMA, arahPutarPoligon, cerminGarisDatar, cerminGarisTegak,
  cerminTitik, cerminYSamaMinX, cerminYSamaX, jarak, kenakanTransformasi,
  luasPoligon, translasi,
  type Titik, type Transformasi,
} from '@/components/widget/transformasi-geometri/matriks'
import { angka } from '@/components/widget/transformasi-geometri/papan'
import type { PropPanggung } from '@/components/topik/jenis'

/**
 * Panggung Transformasi Geometri: penyetelan widgetnya, dan tidak lebih.
 *
 * Bentuknya meniru `PanggungVektor` dan `PanggungLimit`. Rangka halaman tidak
 * tahu apa-apa soal isi topik ini, dan sebaliknya berkas ini tidak tahu
 * apa-apa soal tab, kunci kuis, atau penghitung waktu membaca.
 *
 * Keadaan tiap widget dipegang DI SINI, bukan di dalam widgetnya, supaya tidak
 * hilang saat siswa berpindah materi lalu kembali. Alasan lengkapnya ada di
 * `components/topik/jenis.ts`.
 */

/**
 * Lima pilihan untuk widget Materi 01.
 *
 * Dilatasinya berfaktor 1,5 dan bukan 2 dengan sengaja. Faktor 2 melempar
 * ujung bentuknya sampai x sama dengan 12, jendelanya ikut melebar, dan
 * bentuknya tinggal seperempat lebar layar. Faktor 1,5 berhenti di x sama
 * dengan 9, dan angka koma limanya masih enak dibaca di tabel.
 */
const PILIHAN_MATERI_1: { nama: string; t: Transformasi }[] = [
  { nama: 'translasi', t: { jenis: 'translasi', geser: { x: 4, y: -3 } } },
  { nama: 'cermin sumbu X', t: { jenis: 'cermin-sumbu-x' } },
  { nama: 'cermin sumbu Y', t: { jenis: 'cermin-sumbu-y' } },
  { nama: 'rotasi 90°', t: { jenis: 'rotasi', derajat: 90, pusat: { x: 0, y: 0 } } },
  { nama: 'dilatasi 1,5', t: { jenis: 'dilatasi', k: 1.5, pusat: { x: 0, y: 0 } } },
]

/**
 * Tabel koordinat ketiga sudut bernama, prapeta berdampingan dengan petanya.
 *
 * Dipakai lima materi pertama. Yang ditampilkan hanya A, B, dan C: keenam
 * barisnya membuat tabel setinggi panel dan tidak ada yang bisa dibandingkan
 * sekali lihat.
 */
function TabelSudut({ peta, judul }: { peta: Titik[]; judul: string }) {
  return (
    <div className="blok">
      <div className="cap">{judul}</div>
      <table className="tabel-angka">
        <tbody>
          {SUDUT_BERNAMA.map((s) => {
            const t = BENTUK_L[s.indeks]
            const q = peta[s.indeks]
            if (!t || !q) return null
            return (
              <tr key={s.nama} className={s.nama === 'A' ? 'tegas' : undefined}>
                <td>{s.nama} ({angka(t.x, 1)}, {angka(t.y, 1)})</td>
                <td>{s.nama}&#39; ({angka(q.x, 1)}, {angka(q.y, 1)})</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default function PanggungTransformasiGeometri({ tahap, tampilWidget, children }: PropPanggung) {
  const [pilihan1, setPilihan1] = useState(0)
  const [geser, setGeser] = useState<Titik>({ x: 3, y: -2 })
  const [arahCermin, setArahCermin] = useState<'tegak' | 'datar'>('tegak')
  const [nilaiCermin, setNilaiCermin] = useState(0)
  const [naik, setNaik] = useState(true)
  // Pusat cermin bawaan di (3, 3), BUKAN di titik asal.
  //
  // Dua sebabnya. Pertama, angka itu sama dengan pusat pada contoh berhitung
  // Materi 05, sehingga gambar yang pertama dilihat siswa bercerita hal yang
  // sama dengan tulisan yang sedang ia baca. Kedua, titik asal adalah tempat
  // paling padat di bidang ini: di situ sudah ada angka nol dan kedua sumbu,
  // dan pada pemeriksaan visual 3 Sep 2026 pusat yang ditaruh di sana membuat
  // kedua angka jaraknya bertumpuk dengan angka sumbu. Tombol "kembalikan
  // pusatnya ke titik asal" tetap ada, sebab perbandingannya dengan rotasi
  // 180 derajat memang perlu dilihat siswa.
  const [pusatCermin, setPusatCermin] = useState<Titik>({ x: 3, y: 3 })

  let kiri: ReactNode = null
  let kanan: ReactNode = null
  let tanda = 'BACAAN'

  if (tahap) {
    if (tahap.widget === 'dunia-nyata-transformasi') tanda = 'CONTOH NYATA'
    else if (tahap.widget) tanda = 'INTERAKTIF'

    const tTerpilih = PILIHAN_MATERI_1[pilihan1].t
    const petaBebas = BENTUK_L.map((t) => kenakanTransformasi(tTerpilih, t))
    const petaGeser = BENTUK_L.map((t) => translasi(t, geser))
    const petaLurus = BENTUK_L.map((t) =>
      arahCermin === 'tegak' ? cerminGarisTegak(t, nilaiCermin) : cerminGarisDatar(t, nilaiCermin),
    )
    const petaMiring = BENTUK_L.map((t) => (naik ? cerminYSamaX(t) : cerminYSamaMinX(t)))
    const petaTitik = BENTUK_L.map((t) => cerminTitik(t, pusatCermin))

    const A = BENTUK_L[0]

    kiri = (
      <>
        {tampilWidget && tahap.widget === 'papan-bebas' && (
          <>
            <div className="layar">
              <PapanBebas transformasi={tTerpilih} />
            </div>
            <div className="kendali">
              <div className="pilih-contoh" style={{ gridColumn: '1 / -1' }}>
                {PILIHAN_MATERI_1.map((p, i) => (
                  <button
                    key={p.nama}
                    aria-pressed={pilihan1 === i}
                    onClick={() => setPilihan1(i)}
                  >
                    {p.nama}
                  </button>
                ))}
              </div>
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  ganti pilihannya, lalu perhatikan keenam garis putus-putus tipisnya. Setiap
                  titik punya tujuannya sendiri
                </span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'geser-bentuk' && (
          <>
            <div className="layar">
              <GeserBentuk geser={geser} onUbah={setGeser} />
            </div>
            <div className="kendali">
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  tarik bulatan di ujung panah merahnya. Keenam garis penghubungnya selalu
                  sejajar dan selalu sama panjang
                </span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'cermin-lurus' && (
          <>
            <div className="layar">
              <CerminLurus arah={arahCermin} nilai={nilaiCermin} onUbah={setNilaiCermin} />
            </div>
            <div className="kendali">
              <div className="pilih-contoh" style={{ gridColumn: '1 / -1' }}>
                <button aria-pressed={arahCermin === 'tegak'} onClick={() => setArahCermin('tegak')}>
                  garis tegak x = k
                </button>
                <button aria-pressed={arahCermin === 'datar'} onClick={() => setArahCermin('datar')}>
                  garis mendatar y = h
                </button>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="letak-cermin">
                  <span>Letak garis cerminnya</span>
                  <span className="mono">{arahCermin === 'tegak' ? 'x' : 'y'} = {angka(nilaiCermin, 1)}</span>
                </label>
                <input
                  id="letak-cermin" type="range"
                  min={-BATAS_CERMIN} max={BATAS_CERMIN} step={0.5} value={nilaiCermin}
                  onChange={(e) => setNilaiCermin(+e.target.value)}
                />
              </div>
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  setel ke nol, lalu perhatikan garisnya jatuh tepat di sumbu. Sumbu memang
                  garis cermin dengan k bernilai nol
                </span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'cermin-miring' && (
          <>
            <div className="layar">
              <CerminMiring naik={naik} />
            </div>
            <div className="kendali">
              <div className="pilih-contoh" style={{ gridColumn: '1 / -1' }}>
                <button aria-pressed={naik} onClick={() => setNaik(true)}>garis y = x</button>
                <button aria-pressed={!naik} onClick={() => setNaik(false)}>garis y = -x</button>
              </div>
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  bandingkan tulisan B dan B aksen pada kedua pilihan. Pada y = x angkanya
                  bertukar, pada y = -x angkanya bertukar DAN tandanya berbalik
                </span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'cermin-titik' && (
          <>
            <div className="layar">
              <CerminTitik pusat={pusatCermin} onUbah={setPusatCermin} />
            </div>
            <div className="kendali">
              <div className="pilih-contoh" style={{ gridColumn: '1 / -1' }}>
                <button
                  aria-pressed={pusatCermin.x === 0 && pusatCermin.y === 0}
                  onClick={() => setPusatCermin({ x: 0, y: 0 })}
                >
                  kembalikan pusatnya ke titik asal
                </button>
              </div>
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  tarik bulatan ungunya ke mana saja. Kedua angka ungu di titik A selalu sama,
                  sebab pusatnya selalu tepat di tengah
                </span>
              </div>
            </div>
          </>
        )}
      </>
    )

    kanan = (
      <>
        {tampilWidget && tahap.widget === 'papan-bebas' && (
          <>
            <TabelSudut peta={petaBebas} judul="Prapeta dan petanya" />
            <div className="blok">
              <div className="cap">Yang berubah dan yang tidak</div>
              <table className="tabel-angka">
                <tbody>
                  <tr>
                    <td>panjang AB</td>
                    <td>
                      {angka(jarak(BENTUK_L[0], BENTUK_L[1]), 2)} menjadi{' '}
                      {angka(jarak(petaBebas[0], petaBebas[1]), 2)}
                    </td>
                  </tr>
                  <tr>
                    <td>luas bentuknya</td>
                    <td>
                      {angka(luasPoligon(BENTUK_L), 2)} menjadi {angka(luasPoligon(petaBebas), 2)}
                    </td>
                  </tr>
                  <tr className="tegas">
                    <td>arah putar A ke B ke C</td>
                    <td>
                      {arahPutarPoligon(petaBebas) === arahPutarPoligon(BENTUK_L)
                        ? 'tetap'
                        : 'berbalik'}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="catatan">
                {PILIHAN_MATERI_1[pilihan1].t.jenis === 'dilatasi'
                  ? 'Hanya dilatasi yang mengubah panjang dan luas. Empat pilihan lain menjaga keduanya, dan itu yang membuat keempatnya satu keluarga.'
                  : arahPutarPoligon(petaBebas) === arahPutarPoligon(BENTUK_L)
                    ? 'Panjang, luas, dan arah putarnya sama-sama tidak berubah. Yang berpindah hanya letaknya.'
                    : 'Panjang dan luasnya tidak berubah, tetapi arah putarnya berbalik. Hanya pencerminan pada GARIS yang melakukan itu, dan sebabnya dibahas di Materi 08.'}
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'geser-bentuk' && (
          <>
            <TabelSudut peta={petaGeser} judul="Setiap koordinat ditambah geserannya" />
            <div className="blok">
              <div className="cap">Geseran yang sedang dipakai</div>
              <table className="tabel-angka">
                <tbody>
                  <tr><td>komponen mendatar</td><td>{angka(geser.x, 1)}</td></tr>
                  <tr><td>komponen tegak</td><td>{angka(geser.y, 1)}</td></tr>
                  <tr className="tegas">
                    <td>A ({angka(A.x, 1)}, {angka(A.y, 1)}) menjadi</td>
                    <td>
                      ({angka(A.x, 1)} + {angka(geser.x, 1)}, {angka(A.y, 1)} + {angka(geser.y, 1)})
                      {' = '}({angka(petaGeser[0].x, 1)}, {angka(petaGeser[0].y, 1)})
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="catatan">
                {geser.x === 0 && geser.y === 0
                  ? 'Geserannya nol, jadi petanya menempel tepat di prapetanya. Itu sah: translasi nol memang tidak memindahkan apa pun.'
                  : geser.y < 0
                    ? 'Komponen tegaknya negatif, dan itu berarti nilai y berkurang. Nilai y yang berkurang berarti bentuknya TURUN, bukan naik.'
                    : 'Perhatikan ketiga baris tabel memakai geseran yang sama persis. Tidak ada titik yang mendapat perlakuan berbeda, dan itu sebabnya garis penghubungnya sejajar.'}
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'cermin-lurus' && (
          <>
            <TabelSudut
              peta={petaLurus}
              judul={`Cermin pada ${arahCermin === 'tegak' ? 'x' : 'y'} = ${angka(nilaiCermin, 1)}`}
            />
            <div className="blok">
              <div className="cap">Memeriksa kesamaan jaraknya pada titik A</div>
              <table className="tabel-angka">
                <tbody>
                  <tr>
                    <td>jarak A ke garis cerminnya</td>
                    <td>{angka(Math.abs((arahCermin === 'tegak' ? A.x : A.y) - nilaiCermin), 2)}</td>
                  </tr>
                  <tr>
                    <td>jarak garis cermin ke A aksen</td>
                    <td>
                      {angka(Math.abs((arahCermin === 'tegak' ? petaLurus[0].x : petaLurus[0].y) - nilaiCermin), 2)}
                    </td>
                  </tr>
                  <tr className="tegas">
                    <td>lewat rumus 2k dikurangi koordinatnya</td>
                    <td>
                      2({angka(nilaiCermin, 1)}) - {angka(arahCermin === 'tegak' ? A.x : A.y, 1)}
                      {' = '}
                      {angka(arahCermin === 'tegak' ? petaLurus[0].x : petaLurus[0].y, 1)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="catatan">
                Kedua baris pertama selalu bernilai sama, di mana pun garis cerminnya diletakkan.
                Baris ketiga menunjukkan rumusnya cuma jalan pintas untuk kedua baris itu, bukan
                aturan baru yang perlu dihafal terpisah.
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'cermin-miring' && (
          <>
            <TabelSudut peta={petaMiring} judul={`Cermin pada garis ${naik ? 'y = x' : 'y = -x'}`} />
            <div className="blok">
              <div className="cap">Apa yang terjadi pada koordinatnya</div>
              <div className="catatan">
                {naik
                  ? 'Kedua koordinatnya bertukar tempat, dan tandanya ikut pindah bersama angkanya. Titik yang kebetulan berada DI garis cerminnya tidak berpindah sama sekali, sama seperti kaca tidak memindahkan dirinya sendiri.'
                  : 'Kedua koordinatnya bertukar tempat, LALU kedua tandanya berbalik. Dua pekerjaan, bukan satu. Bandingkan sendiri dengan pilihan y = x di sebelah kiri: angkanya sama, tandanya yang berbeda.'}
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'cermin-titik' && (
          <>
            <TabelSudut
              peta={petaTitik}
              judul={`Cermin pada titik (${angka(pusatCermin.x, 1)}, ${angka(pusatCermin.y, 1)})`}
            />
            <div className="blok">
              <div className="cap">Pusatnya selalu titik tengah</div>
              <table className="tabel-angka">
                <tbody>
                  <tr>
                    <td>rata-rata mendatar A dan A aksen</td>
                    <td>
                      ({angka(A.x, 1)} + {angka(petaTitik[0].x, 1)}) : 2 ={' '}
                      {angka((A.x + petaTitik[0].x) / 2, 2)}
                    </td>
                  </tr>
                  <tr>
                    <td>rata-rata tegak A dan A aksen</td>
                    <td>
                      ({angka(A.y, 1)} + {angka(petaTitik[0].y, 1)}) : 2 ={' '}
                      {angka((A.y + petaTitik[0].y) / 2, 2)}
                    </td>
                  </tr>
                  <tr className="tegas">
                    <td>pusat yang sedang dipakai</td>
                    <td>({angka(pusatCermin.x, 1)}, {angka(pusatCermin.y, 1)})</td>
                  </tr>
                </tbody>
              </table>
              <div className="catatan">
                {pusatCermin.x === 0 && pusatCermin.y === 0
                  ? 'Pusatnya di titik asal, jadi kedua tanda koordinatnya berbalik. Ingat gambar ini: di Materi 06 kita akan menemukan rotasi 180 derajat memberi gambar yang sama persis.'
                  : 'Ketiga baris ini bukan tiga hitungan terpisah. Dua baris pertama menghitung titik tengahnya, dan baris ketiga menunjukkan hasilnya memang pusat yang sedang Anda pegang.'}
              </div>
            </div>
          </>
        )}
      </>
    )
  }

  return <>{children({ kiri, kanan, tanda })}</>
}
