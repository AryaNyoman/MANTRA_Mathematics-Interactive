'use client'

import { useState, type ReactNode } from 'react'
import CerminLurus, { BATAS_CERMIN } from '@/components/widget/transformasi-geometri/CerminLurus'
import CerminMiring from '@/components/widget/transformasi-geometri/CerminMiring'
import CerminTitik from '@/components/widget/transformasi-geometri/CerminTitik'
import CocokkanMatriks from '@/components/widget/transformasi-geometri/CocokkanMatriks'
import DuaLangkah from '@/components/widget/transformasi-geometri/DuaLangkah'
import DuniaNyataTransformasi from '@/components/widget/transformasi-geometri/DuniaNyataTransformasi'
import GeserBentuk from '@/components/widget/transformasi-geometri/GeserBentuk'
import MejaUkur from '@/components/widget/transformasi-geometri/MejaUkur'
import MesinMatriks from '@/components/widget/transformasi-geometri/MesinMatriks'
import PapanBebas from '@/components/widget/transformasi-geometri/PapanBebas'
import PerbesarBentuk, { BATAS_K } from '@/components/widget/transformasi-geometri/PerbesarBentuk'
import PutarBentuk from '@/components/widget/transformasi-geometri/PutarBentuk'
import {
  BENTUK_L, SUDUT_BERNAMA, arahPutarPoligon, cerminGarisDatar, cerminGarisTegak,
  cerminTitik, cerminYSamaMinX, cerminYSamaX, determinan, dilatasi, jarak,
  kaliMatriks, kenakan, kenakanTransformasi, luasPoligon, matriksDari,
  namaTransformasi, rotasi, sudutDi, translasi,
  type Matriks, type Titik, type Transformasi,
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
 * Enam pilihan untuk widget Materi 08.
 *
 * "dilatasi -2" WAJIB ada di daftar ini. Itu satu-satunya pilihan yang
 * membantah dugaan yang paling sering, yaitu bahwa faktor negatif membalik
 * arah putar. Determinannya k kuadrat, selalu positif, jadi arah putarnya
 * tetap. Tanpa pilihan itu, baris terakhir tabel Materi 08 cuma klaim yang
 * harus dipercaya siswa.
 *
 * "cermin sumbu X" juga wajib, sebab itulah satu-satunya di daftar ini yang
 * MEMANG membalik arah putar. Tanpa pembanding, kata "berbalik" tidak punya
 * arti apa-apa di layar.
 */
const PILIHAN_MATERI_8: { nama: string; t: Transformasi }[] = [
  { nama: 'translasi', t: { jenis: 'translasi', geser: { x: -3, y: -4 } } },
  { nama: 'cermin sumbu X', t: { jenis: 'cermin-sumbu-x' } },
  { nama: 'cermin titik asal', t: { jenis: 'cermin-titik', pusat: { x: 0, y: 0 } } },
  { nama: 'rotasi 60°', t: { jenis: 'rotasi', derajat: 60, pusat: { x: 0, y: 0 } } },
  { nama: 'dilatasi 2', t: { jenis: 'dilatasi', k: 2, pusat: { x: 0, y: 0 } } },
  { nama: 'dilatasi -2', t: { jenis: 'dilatasi', k: -2, pusat: { x: 0, y: 0 } } },
]

/**
 * Enam pilihan untuk widget Materi 10.
 *
 * Translasi sengaja MASUK daftar, walaupun ia satu-satunya yang tidak punya
 * matriks 2x2. Kalau dikeluarkan, kalimat "translasi tidak punya matriks"
 * tidak pernah bisa diuji siswa dan tinggal jadi hafalan.
 *
 * Dua pilihan terakhir pusatnya BUKAN titik asal, juga dengan sengaja: batas
 * kejujuran di Materi 10 mengatakan ketujuh matriks itu hanya berlaku untuk
 * pusat di titik asal, dan batas itu perlu terlihat, bukan cuma tertulis.
 */
const PILIHAN_MATERI_10: { nama: string; t: Transformasi }[] = [
  { nama: 'cermin sumbu X', t: { jenis: 'cermin-sumbu-x' } },
  { nama: 'cermin sumbu Y', t: { jenis: 'cermin-sumbu-y' } },
  { nama: 'cermin y = x', t: { jenis: 'cermin-y-sama-x' } },
  { nama: 'rotasi 53°', t: { jenis: 'rotasi', derajat: 53, pusat: { x: 0, y: 0 } } },
  { nama: 'dilatasi 1,5', t: { jenis: 'dilatasi', k: 1.5, pusat: { x: 0, y: 0 } } },
  { nama: 'translasi', t: { jenis: 'translasi', geser: { x: 3, y: -2 } } },
  { nama: 'rotasi 90° pusat (2,1)', t: { jenis: 'rotasi', derajat: 90, pusat: { x: 2, y: 1 } } },
]

/**
 * Pasangan transformasi untuk Materi 11 dan 12.
 *
 * Pasangan terakhir WAJIB ada: dua translasi adalah satu-satunya di daftar ini
 * yang urutannya boleh dibalik. Tanpa pembanding itu, siswa bisa menyimpulkan
 * urutan SELALU menentukan hasil, dan itu terlalu jauh.
 */
const PASANGAN: { nama: string; t1: Transformasi; t2: Transformasi }[] = [
  {
    nama: 'cermin sumbu X, lalu rotasi 90°',
    t1: { jenis: 'cermin-sumbu-x' },
    t2: { jenis: 'rotasi', derajat: 90, pusat: { x: 0, y: 0 } },
  },
  {
    nama: 'cermin sumbu Y, lalu translasi',
    t1: { jenis: 'cermin-sumbu-y' },
    t2: { jenis: 'translasi', geser: { x: 2, y: -3 } },
  },
  {
    nama: 'dilatasi 1,5, lalu rotasi 90°',
    t1: { jenis: 'dilatasi', k: 1.5, pusat: { x: 0, y: 0 } },
    t2: { jenis: 'rotasi', derajat: 90, pusat: { x: 0, y: 0 } },
  },
  {
    nama: 'dua translasi',
    t1: { jenis: 'translasi', geser: { x: 3, y: 1 } },
    t2: { jenis: 'translasi', geser: { x: -1, y: -3 } },
  },
]

/** Matriks 2x2 ditampilkan sebagai tabel kecil dua baris. */
function TabelMatriks({ m, judul }: { m: Matriks | null; judul: string }) {
  return (
    <div className="blok">
      <div className="cap">{judul}</div>
      {m === null ? (
        <div className="catatan">
          Tidak ada. Transformasi ini memindahkan titik asal, sedangkan perkalian matriks
          apa pun selalu memetakan titik asal ke titik asal. Jadi matriks 2x2 pengalinya
          memang tidak mungkin ada, bukan cuma belum ditemukan.
        </div>
      ) : (
        <table className="tabel-angka">
          <tbody>
            <tr><td>baris pertama</td><td>{angka(m.a, 3)} &nbsp; {angka(m.b, 3)}</td></tr>
            <tr><td>baris kedua</td><td>{angka(m.c, 3)} &nbsp; {angka(m.d, 3)}</td></tr>
            <tr className="tegas"><td>determinan</td><td>{angka(determinan(m), 3)}</td></tr>
          </tbody>
        </table>
      )}
    </div>
  )
}

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
  const [derajat, setDerajat] = useState(90)
  const [pusatPutar, setPusatPutar] = useState<Titik>({ x: 0, y: 0 })
  const [k, setK] = useState(2)
  const [pusatDilatasi, setPusatDilatasi] = useState<Titik>({ x: 3, y: -1 })
  const [pilihan8, setPilihan8] = useState(0)
  // Nilai awal matriksnya adalah rotasi 90 derajat, bukan identitas. Identitas
  // tidak mengubah apa pun, jadi gambar pertama yang dilihat siswa adalah dua
  // persegi yang menempel dan tidak menceritakan apa-apa.
  const [mA, setMA] = useState(0)
  const [mB, setMB] = useState(-1)
  const [mC, setMC] = useState(1)
  const [mD, setMD] = useState(0)
  const [pilihan10, setPilihan10] = useState(0)
  const [pasangan, setPasangan] = useState(0)
  const [dibalik, setDibalik] = useState(false)

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
    const petaPutar = BENTUK_L.map((t) => rotasi(t, derajat, pusatPutar))
    const petaBesar = BENTUK_L.map((t) => dilatasi(t, k, pusatDilatasi))
    const tUkur = PILIHAN_MATERI_8[pilihan8].t
    const petaUkur = BENTUK_L.map((t) => kenakanTransformasi(tUkur, t))

    const A = BENTUK_L[0]
    const B = BENTUK_L[1]
    const C = BENTUK_L[2]

    const mesin: Matriks = { a: mA, b: mB, c: mC, d: mD }
    const tCocok = PILIHAN_MATERI_10[pilihan10].t

    // Urutan pengerjaannya bisa ditukar siswa, jadi t1 dan t2 di bawah adalah
    // urutan yang SEDANG dipakai, bukan urutan yang tertulis di daftar.
    const pas = PASANGAN[pasangan]
    const t1 = dibalik ? pas.t2 : pas.t1
    const t2 = dibalik ? pas.t1 : pas.t2
    const m1 = matriksDari(t1)
    const m2 = matriksDari(t2)
    const mGabung = m1 && m2 ? kaliMatriks(m2, m1) : null
    const mSalahUrutan = m1 && m2 ? kaliMatriks(m1, m2) : null

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

        {tampilWidget && tahap.widget === 'putar-bentuk' && (
          <>
            <div className="layar">
              <PutarBentuk derajat={derajat} pusat={pusatPutar} onUbahPusat={setPusatPutar} />
            </div>
            <div className="kendali">
              <div className="pilih-contoh" style={{ gridColumn: '1 / -1' }}>
                {[90, 180, 270].map((d) => (
                  <button key={d} aria-pressed={derajat === d} onClick={() => setDerajat(d)}>
                    {d}°
                  </button>
                ))}
                <button
                  aria-pressed={pusatPutar.x === 0 && pusatPutar.y === 0}
                  onClick={() => setPusatPutar({ x: 0, y: 0 })}
                >
                  pusat ke titik asal
                </button>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="sudut-putar">
                  <span>Sudut putarnya</span>
                  <span className="mono">{angka(derajat, 0)}°</span>
                </label>
                <input
                  id="sudut-putar" type="range"
                  min={-360} max={360} step={1} value={derajat}
                  onChange={(e) => setDerajat(+e.target.value)}
                />
              </div>
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  kedua angka jarak di layar SELALU sama, berapa pun sudutnya. Itu yang
                  membedakan rotasi dari dilatasi
                </span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'perbesar-bentuk' && (
          <>
            <div className="layar">
              <PerbesarBentuk k={k} pusat={pusatDilatasi} onUbahPusat={setPusatDilatasi} />
            </div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="faktor-k">
                  <span>Faktor skala k</span>
                  <span className="mono">{angka(k, 2)}</span>
                </label>
                <input
                  id="faktor-k" type="range"
                  min={BATAS_K.min} max={BATAS_K.maks} step={BATAS_K.langkah} value={k}
                  onChange={(e) => setK(+e.target.value)}
                />
              </div>
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  lewati angka nol perlahan. Bentuknya menciut ke satu titik, lalu muncul lagi
                  di sisi seberang pusatnya
                </span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'meja-ukur' && (
          <>
            <div className="layar">
              <MejaUkur transformasi={tUkur} />
            </div>
            <div className="kendali">
              <div className="pilih-contoh" style={{ gridColumn: '1 / -1' }}>
                {PILIHAN_MATERI_8.map((p, i) => (
                  <button key={p.nama} aria-pressed={pilihan8 === i} onClick={() => setPilihan8(i)}>
                    {p.nama}
                  </button>
                ))}
              </div>
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  bandingkan dua pilihan terakhir. Keduanya membuat bentuknya dua kali lebih
                  besar, tetapi cuma satu yang terlihat terjungkir
                </span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'mesin-matriks' && (
          <>
            <div className="layar">
              <MesinMatriks m={mesin} />
            </div>
            <div className="kendali">
              {([
                ['a', mA, setMA, 'kiri atas'],
                ['b', mB, setMB, 'kanan atas'],
                ['c', mC, setMC, 'kiri bawah'],
                ['d', mD, setMD, 'kanan bawah'],
              ] as const).map(([nama, nilai, setel, letak]) => (
                <div key={nama}>
                  <label htmlFor={`matriks-${nama}`}>
                    <span>{nama}, {letak}</span>
                    <span className="mono">{angka(nilai, 2)}</span>
                  </label>
                  <input
                    id={`matriks-${nama}`} type="range"
                    min={-3} max={3} step={0.5} value={nilai}
                    onChange={(e) => setel(+e.target.value)}
                  />
                </div>
              ))}
              <div className="pilih-contoh" style={{ gridColumn: '1 / -1' }}>
                <button
                  aria-pressed={mA === 1 && mB === 0 && mC === 0 && mD === 1}
                  onClick={() => { setMA(1); setMB(0); setMC(0); setMD(1) }}
                >
                  identitas
                </button>
                <button
                  aria-pressed={mA === 0 && mB === 1 && mC === 1 && mD === 0}
                  onClick={() => { setMA(0); setMB(1); setMC(1); setMD(0) }}
                >
                  cermin y = x
                </button>
                <button
                  aria-pressed={mA === 1 && mB === 2 && mC === 2 && mD === 3}
                  onClick={() => { setMA(1); setMB(2); setMC(2); setMD(3) }}
                >
                  bukan salah satu yang kita pelajari
                </button>
              </div>
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  ubah a saja, lalu perhatikan hanya panah biru yang bergerak. Dua angka di
                  satu kolom menggerakkan panah yang sama
                </span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'cocokkan-matriks' && (
          <>
            <div className="layar">
              <CocokkanMatriks transformasi={tCocok} />
            </div>
            <div className="kendali">
              <div className="pilih-contoh" style={{ gridColumn: '1 / -1' }}>
                {PILIHAN_MATERI_10.map((p, i) => (
                  <button key={p.nama} aria-pressed={pilihan10 === i} onClick={() => setPilihan10(i)}>
                    {p.nama}
                  </button>
                ))}
              </div>
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  baca ujung kedua panahnya, lalu tulis keduanya sebagai kolom. Itu matriksnya,
                  dan bisa Anda baca sebelum melihat tabel di kanan
                </span>
              </div>
            </div>
          </>
        )}

        {tampilWidget && (tahap.widget === 'dua-langkah' || tahap.widget === 'urutan-matriks') && (
          <>
            <div className="layar">
              <DuaLangkah
                t1={t1} t2={t2}
                tampilkanTerbalik={tahap.widget === 'urutan-matriks'}
              />
            </div>
            <div className="kendali">
              <div className="pilih-contoh" style={{ gridColumn: '1 / -1' }}>
                {PASANGAN.map((p, i) => (
                  <button key={p.nama} aria-pressed={pasangan === i} onClick={() => setPasangan(i)}>
                    {p.nama}
                  </button>
                ))}
              </div>
              <div className="pilih-contoh" style={{ gridColumn: '1 / -1' }}>
                <button aria-pressed={dibalik} onClick={() => setDibalik(!dibalik)}>
                  tukar urutannya
                </button>
              </div>
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>
                  {tahap.widget === 'urutan-matriks'
                    ? 'bentuk biru dan merah datang dari dua transformasi yang sama persis, cuma berbeda urutan'
                    : 'bentuk yang paling samar adalah hasil langkah pertama. Itu persinggahan, bukan jawaban'}
                </span>
              </div>
            </div>
          </>
        )}

        {tahap.widget === 'dunia-nyata-transformasi' && (
          <div className="isi-gulir">
            <DuniaNyataTransformasi />
          </div>
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
                  : 'Kedua koordinatnya bertukar tempat, LALU kedua tandanya berbalik. Dua pekerjaan, bukan satu. Bandingkan sendiri dengan pilihan y = x di alatnya: angkanya sama, tandanya yang berbeda.'}
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

        {tampilWidget && tahap.widget === 'putar-bentuk' && (
          <>
            <TabelSudut peta={petaPutar} judul={`Rotasi ${angka(derajat, 0)} derajat`} />
            <div className="blok">
              <div className="cap">Jarak ke pusat putarnya tidak berubah</div>
              <table className="tabel-angka">
                <tbody>
                  <tr>
                    <td>jarak B ke pusat</td>
                    <td>{angka(jarak(B, pusatPutar), 3)}</td>
                  </tr>
                  <tr>
                    <td>jarak B aksen ke pusat</td>
                    <td>{angka(jarak(petaPutar[1], pusatPutar), 3)}</td>
                  </tr>
                  <tr className="tegas">
                    <td>panjang sisi AB</td>
                    <td>
                      {angka(jarak(A, B), 3)} menjadi {angka(jarak(petaPutar[0], petaPutar[1]), 3)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="catatan">
                {derajat % 360 === 180 || derajat % 360 === -180
                  ? 'Setengah putaran. Perhatikan koordinat di tabel atas: keduanya berbalik tanda, persis rumus pencerminan pada titik di Materi 05. Janji yang dibuat di sana terbukti di sini.'
                  : derajat % 90 === 0
                    ? 'Sudut kelipatan 90 derajat memberi koordinat bulat, jadi jawabannya bisa dibaca langsung dari gambar tanpa kalkulator.'
                    : `Sudut ini bukan kelipatan 90 derajat, jadi koordinatnya tidak lagi bulat. Di sinilah rumus dengan cos dan sin dipakai: cos ${angka(derajat, 0)}° bernilai ${angka(Math.cos((derajat * Math.PI) / 180), 3)} dan sin ${angka(derajat, 0)}° bernilai ${angka(Math.sin((derajat * Math.PI) / 180), 3)}.`}
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'perbesar-bentuk' && (
          <>
            <TabelSudut peta={petaBesar} judul={`Dilatasi faktor ${angka(k, 2)}`} />
            <div className="blok">
              <div className="cap">Yang dikalikan k, dan yang dikalikan k kuadrat</div>
              <table className="tabel-angka">
                <tbody>
                  <tr>
                    <td>jarak A ke pusat</td>
                    <td>
                      {angka(jarak(A, pusatDilatasi), 2)} menjadi{' '}
                      {angka(jarak(petaBesar[0], pusatDilatasi), 2)}
                    </td>
                  </tr>
                  <tr>
                    <td>panjang sisi AB</td>
                    <td>
                      {angka(jarak(A, B), 2)} menjadi {angka(jarak(petaBesar[0], petaBesar[1]), 2)}
                    </td>
                  </tr>
                  <tr className="tegas">
                    <td>luas bentuknya</td>
                    <td>
                      {angka(luasPoligon(BENTUK_L), 2)} menjadi {angka(luasPoligon(petaBesar), 2)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="catatan">
                {k === 0
                  ? 'Faktor nol meruntuhkan seluruh bentuk ke satu titik, yaitu pusatnya sendiri. Luasnya nol, dan itu benar.'
                  : `Panjangnya menjadi ${angka(Math.abs(k), 2)} kali, sedangkan luasnya menjadi ${angka(k * k, 2)} kali. Angka kedua adalah kuadrat angka pertama, sebab luas ditentukan dua ukuran sekaligus dan keduanya sama-sama dikalikan k.`}
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'meja-ukur' && (
          <div className="blok">
            <div className="cap">Empat ukuran, prapeta dibandingkan petanya</div>
            <table className="tabel-angka">
              <tbody>
                <tr>
                  <td>panjang sisi AB</td>
                  <td>
                    {angka(jarak(A, B), 2)} menjadi {angka(jarak(petaUkur[0], petaUkur[1]), 2)}
                  </td>
                </tr>
                <tr>
                  <td>besar sudut di B</td>
                  <td>
                    {angka(sudutDi(A, B, C), 1)}° menjadi{' '}
                    {angka(sudutDi(petaUkur[0], petaUkur[1], petaUkur[2]), 1)}°
                  </td>
                </tr>
                <tr>
                  <td>luas bentuknya</td>
                  <td>
                    {angka(luasPoligon(BENTUK_L), 2)} menjadi {angka(luasPoligon(petaUkur), 2)}
                  </td>
                </tr>
                <tr className="tegas">
                  <td>arah putar A ke B ke C</td>
                  <td>
                    {arahPutarPoligon(petaUkur) === arahPutarPoligon(BENTUK_L)
                      ? 'tetap'
                      : 'BERBALIK'}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="catatan">
              {arahPutarPoligon(petaUkur) !== arahPutarPoligon(BENTUK_L)
                ? 'Hanya baris terakhir yang berubah. Panjang, sudut, dan luasnya utuh, tetapi urutan A ke B ke C berbalik arah. Itu tanda pengenal pencerminan pada garis, dan itu pula sebabnya bayangan tangan kanan adalah tangan kiri.'
                : tUkur.jenis === 'dilatasi'
                  ? `Panjang dan luasnya berubah, tetapi sudutnya tidak, dan arah putarnya juga tidak. Bentuknya memang terlihat terjungkir kalau k negatif, tetapi urutan A ke B ke C tetap searah. Dilatasi berfaktor negatif sama dengan dilatasi positif lalu diputar setengah lingkaran, dan setengah putaran tidak membalik urutan.`
                  : 'Keempat ukurannya tidak berubah sama sekali. Transformasi ini hanya memindahkan bentuknya, tanpa menyentuh bentuk maupun ukurannya.'}
            </div>
          </div>
        )}

        {tampilWidget && tahap.widget === 'mesin-matriks' && (
          <>
            <TabelMatriks m={mesin} judul="Matriks yang sedang Anda setel" />
            <div className="blok">
              <div className="cap">Dibaca lewat kolomnya</div>
              <table className="tabel-angka">
                <tbody>
                  <tr>
                    <td>kolom 1, peta dari (1, 0)</td>
                    <td>({angka(mesin.a, 2)}, {angka(mesin.c, 2)})</td>
                  </tr>
                  <tr>
                    <td>kolom 2, peta dari (0, 1)</td>
                    <td>({angka(mesin.b, 2)}, {angka(mesin.d, 2)})</td>
                  </tr>
                  <tr className="tegas">
                    <td>coba pada titik (3, 2)</td>
                    <td>
                      ({angka(kenakan(mesin, { x: 3, y: 2 }).x, 2)},{' '}
                      {angka(kenakan(mesin, { x: 3, y: 2 }).y, 2)})
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="catatan">
                {Math.abs(determinan(mesin)) < 1e-9
                  ? 'Determinannya nol, dan itu berarti kedua panahnya segaris. Perseginya runtuh jadi ruas, luasnya nol, dan transformasi seperti ini tidak bisa dibatalkan: banyak titik berbeda mendarat di tempat yang sama.'
                  : `Baris ketiga dihitung begini: baris pertama matriks bertemu (3, 2) memberi ${angka(mesin.a, 2)} dikali 3 ditambah ${angka(mesin.b, 2)} dikali 2. Yang bertemu koordinat titiknya adalah BARIS, bukan kolom.`}
              </div>
            </div>
          </>
        )}

        {tampilWidget && tahap.widget === 'cocokkan-matriks' && (
          <>
            <TabelMatriks m={matriksDari(tCocok)} judul={`Matriks ${namaTransformasi(tCocok)}`} />
            <div className="blok">
              <div className="cap">Dibaca dari gambar, bukan dihafal</div>
              <table className="tabel-angka">
                <tbody>
                  <tr>
                    <td>peta dari (1, 0)</td>
                    <td>
                      ({angka(kenakanTransformasi(tCocok, { x: 1, y: 0 }).x, 2)},{' '}
                      {angka(kenakanTransformasi(tCocok, { x: 1, y: 0 }).y, 2)})
                    </td>
                  </tr>
                  <tr>
                    <td>peta dari (0, 1)</td>
                    <td>
                      ({angka(kenakanTransformasi(tCocok, { x: 0, y: 1 }).x, 2)},{' '}
                      {angka(kenakanTransformasi(tCocok, { x: 0, y: 1 }).y, 2)})
                    </td>
                  </tr>
                  <tr className="tegas">
                    <td>peta dari titik asal (0, 0)</td>
                    <td>
                      ({angka(kenakanTransformasi(tCocok, { x: 0, y: 0 }).x, 2)},{' '}
                      {angka(kenakanTransformasi(tCocok, { x: 0, y: 0 }).y, 2)})
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="catatan">
                {matriksDari(tCocok) === null
                  ? 'Perhatikan baris terakhir: titik asal TIDAK bertahan di tempatnya. Itulah bukti bahwa transformasi ini mustahil ditulis sebagai perkalian matriks, sebab perkalian matriks apa pun memetakan (0, 0) ke (0, 0).'
                  : 'Perhatikan baris terakhir tetap (0, 0). Itu syarat yang harus dipenuhi supaya sebuah transformasi punya matriks 2x2, dan kedua baris di atasnya langsung menjadi kolom matriksnya.'}
              </div>
            </div>
          </>
        )}

        {tampilWidget && (tahap.widget === 'dua-langkah' || tahap.widget === 'urutan-matriks') && (
          <>
            <div className="blok">
              <div className="cap">Titik A dikerjakan langkah demi langkah</div>
              <table className="tabel-angka">
                <tbody>
                  <tr><td>A, prapeta</td><td>({angka(A.x, 1)}, {angka(A.y, 1)})</td></tr>
                  <tr>
                    <td>setelah {namaTransformasi(t1)}</td>
                    <td>
                      ({angka(kenakanTransformasi(t1, A).x, 1)},{' '}
                      {angka(kenakanTransformasi(t1, A).y, 1)})
                    </td>
                  </tr>
                  <tr className="tegas">
                    <td>setelah {namaTransformasi(t2)}</td>
                    <td>
                      ({angka(kenakanTransformasi(t2, kenakanTransformasi(t1, A)).x, 1)},{' '}
                      {angka(kenakanTransformasi(t2, kenakanTransformasi(t1, A)).y, 1)})
                    </td>
                  </tr>
                  <tr>
                    <td>kalau urutannya dibalik</td>
                    <td>
                      ({angka(kenakanTransformasi(t1, kenakanTransformasi(t2, A)).x, 1)},{' '}
                      {angka(kenakanTransformasi(t1, kenakanTransformasi(t2, A)).y, 1)})
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="catatan">
                {PASANGAN[pasangan].nama === 'dua translasi'
                  ? 'Kedua baris terakhir bernilai sama. Dua translasi memang boleh dibalik urutannya, sebab hasilnya sama dengan menjumlahkan kedua vektornya, dan penjumlahan tidak peduli urutan.'
                  : 'Kedua baris terakhir berbeda, dan itu keadaan yang biasa. Baris ketiga jawaban untuk urutan yang diminta soal, baris keempat jawaban untuk urutan yang sebaliknya. Yang keempat biasanya tersedia sebagai pengecoh.'}
              </div>
            </div>

            {tahap.widget === 'urutan-matriks' && (
              <>
                <TabelMatriks
                  m={mGabung}
                  judul="M2 dikali M1, urutan yang benar"
                />
                <TabelMatriks
                  m={mSalahUrutan}
                  judul="M1 dikali M2, urutan yang tertukar"
                />
                <div className="blok">
                  <div className="catatan">
                    {mGabung === null
                      ? 'Salah satu langkahnya translasi, dan translasi bukan perkalian matriks. Jadi kedua langkah ini tidak bisa digabungkan jadi satu matriks. Kerjakan langkah demi langkah seperti tabel di atas.'
                      : 'Bandingkan keempat angka pada kedua tabel di atas. Keduanya matriks yang berbeda, dan itu sebabnya jawabannya berbeda. Matriks yang tertukar urutannya bukan memberi jawaban yang kacau, melainkan jawaban untuk urutan yang sebaliknya.'}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </>
    )
  }

  return <>{children({ kiri, kanan, tanda })}</>
}
