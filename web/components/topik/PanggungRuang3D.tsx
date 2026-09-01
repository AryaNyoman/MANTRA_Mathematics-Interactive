'use client'

import { useState, type ReactNode } from 'react'
import KubusPutar, {
  JARAK_ASLI, LETAK, SUDUT_MULAI, tampakBerpotongan,
} from '@/components/widget/ruang-3d/KubusPutar'
import PemilihKedudukan, { RUAS, periksaRuas } from '@/components/widget/ruang-3d/PemilihKedudukan'
import KakiTegakLurus, {
  GrafikPanjang, JARAK_TERPENDEK, T_TERBAIK, panjangDi,
} from '@/components/widget/ruang-3d/KakiTegakLurus'
import DiagonalKubus, {
  DIAGONAL_RUANG, DIAGONAL_SISI, LANGKAH,
} from '@/components/widget/ruang-3d/DiagonalKubus'
import JarakKeGaris, { PILIHAN, hitung as hitungGaris } from '@/components/widget/ruang-3d/JarakKeGaris'
import JarakKeBidang, { hitung as hitungBidang } from '@/components/widget/ruang-3d/JarakKeBidang'
import JarakSejajar, { NAMA_BIDANG, hitung as hitungSejajar } from '@/components/widget/ruang-3d/JarakSejajar'
import SudutBersilangan, { SUDUT_JAWAB } from '@/components/widget/ruang-3d/SudutBersilangan'
import SudutBidang, { MODE } from '@/components/widget/ruang-3d/SudutBidang'
import DuniaNyataRuang from '@/components/widget/ruang-3d/DuniaNyataRuang'
import TombolPilih from '@/components/widget/ruang-3d/TombolPilih'
import { SUDUT_AWAL, bulat, type Sudut } from '@/components/widget/ruang-3d/ruang'
import type { PropPanggung } from '@/components/topik/jenis'

/**
 * Panggung Ruang Tiga Dimensi: penyetelan widgetnya, dan tidak lebih.
 *
 * Bentuknya meniru PanggungLimit. Sudut pandang kubus dipegang di sini, bukan di
 * dalam widget, sebab dua tempat memakainya sekaligus: gambar di kolom kiri dan
 * angka hidup di kolom kanan. Itu memang alasan panggung dibuat membungkus tata
 * letak, lihat penjelasan di `components/topik/jenis.ts`.
 *
 * SUDUT PANDANG DISIMPAN PER WIDGET, bukan satu untuk semua. Tahap 1 hanya
 * bekerja kalau matanya tinggi (64 derajat), sedangkan tahap jarak justru
 * paling jelas dari sudut rendah. Kalau sudutnya dipakai bersama, pindah tahap
 * akan membawa sudut yang salah, dan tanda siku-siku jadi sulit dilihat.
 *
 * Penggeser di bawah gambar BUKAN hiasan. Menarik gambar langsung memang cara
 * utamanya, tetapi tarikan tidak bisa dipakai lewat papan ketik. Penggeser
 * membuat widget ini tetap terpakai tanpa tetikus.
 */

/** Sudut pandang awal tiap widget. Yang tidak disebut memakai sudut bersama. */
const SUDUT_TAHAP: Record<string, Sudut> = {
  'kubus-putar': SUDUT_MULAI,
  'sudut-bidang': { mendatar: -34, menunduk: 16 },
}

export default function PanggungRuang3D({ tahap, tampilWidget, children }: PropPanggung) {
  const [sudutPer, setSudutPer] = useState<Record<string, Sudut>>({})
  const [ruas1, setRuas1] = useState(0)
  const [ruas2, setRuas2] = useState(1)
  const [tKaki, setTKaki] = useState(0.26)
  const [langkah, setLangkah] = useState(0)
  const [titikGaris, setTitikGaris] = useState(0)
  const [soalBidang, setSoalBidang] = useState(0)
  const [tSejajar, setTSejajar] = useState(0.35)
  const [geser, setGeser] = useState(0)
  const [modeSudut, setModeSudut] = useState(0)

  const namaWidget = tahap?.widget ?? ''
  const sudut = sudutPer[namaWidget] ?? SUDUT_TAHAP[namaWidget] ?? SUDUT_AWAL
  const aturSudut = (s: Sudut) => setSudutPer((p) => ({ ...p, [namaWidget]: s }))
  const kembalikan = () =>
    setSudutPer((p) => ({ ...p, [namaWidget]: SUDUT_TAHAP[namaWidget] ?? SUDUT_AWAL }))

  let kiri: ReactNode = null
  let kanan: ReactNode = null
  let tanda = 'BACAAN'

  if (tahap) {
    if (tahap.widget === 'dunia-nyata-ruang') tanda = 'CONTOH NYATA'
    else if (tahap.widget) tanda = 'INTERAKTIF'

    const w = tampilWidget ? tahap.widget : undefined

    const r1 = RUAS[ruas1]
    const r2 = RUAS[ruas2]
    const hasilRuas = periksaRuas(r1, r2)
    const garis = hitungGaris(PILIHAN[titikGaris])
    const bidang = hitungBidang(soalBidang)
    const sejajar = hitungSejajar(tSejajar)
    const potongTahap1 = tampakBerpotongan(sudut)
    const m = MODE[modeSudut]

    /** Tombol kembalikan tampilan, dipakai semua widget yang bisa diputar. */
    const tombolKembali = (
      <button type="button" className="tombol garis" style={{ gridColumn: '1 / -1' }}
              onClick={kembalikan}>
        KEMBALIKAN TAMPILAN AWAL
      </button>
    )

    const petunjukTarik = (
      <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
        <span className="titik" />
        <span>tarik langsung gambarnya untuk memutar kubus</span>
      </div>
    )

    kiri = (
      <>
        {w === 'kubus-putar' && (
          <>
            <div className="layar"><KubusPutar sudut={sudut} onUbah={aturSudut} /></div>
            <div className="kendali">
              {petunjukTarik}
              {tombolKembali}
            </div>
          </>
        )}

        {w === 'pemilih-kedudukan' && (
          <>
            <div className="layar">
              <PemilihKedudukan pilih1={ruas1} pilih2={ruas2} sudut={sudut} onUbah={aturSudut} />
            </div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label><span>Ruas biru</span><span className="mono">{r1.nama}</span></label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {RUAS.map((r, i) => (
                    <TombolPilih key={`a${r.nama}`} aktif={i === ruas1} onClick={() => setRuas1(i)}>
                      {r.nama}
                    </TombolPilih>
                  ))}
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label><span>Ruas merah</span><span className="mono">{r2.nama}</span></label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {RUAS.map((r, i) => (
                    <TombolPilih key={`b${r.nama}`} aktif={i === ruas2} onClick={() => setRuas2(i)}>
                      {r.nama}
                    </TombolPilih>
                  ))}
                </div>
              </div>
              {tombolKembali}
            </div>
          </>
        )}

        {w === 'kaki-tegak-lurus' && (
          <>
            <div className="layar"><KakiTegakLurus t={tKaki} sudut={sudut} onUbah={aturSudut} /></div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="tkaki">
                  <span>Geser titik Q sepanjang AC</span>
                  <span className="mono">{bulat(tKaki * 100, 0)}%</span>
                </label>
                <input id="tkaki" type="range" min={0} max={1} step={0.01} value={tKaki}
                       onChange={(e) => setTKaki(+e.target.value)} />
              </div>
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>cari letak Q yang membuat BQ sependek mungkin, lalu lihat tanda siku-sikunya</span>
              </div>
              {tombolKembali}
            </div>
          </>
        )}

        {w === 'diagonal-kubus' && (
          <>
            <div className="layar"><DiagonalKubus langkah={langkah} sudut={sudut} onUbah={aturSudut} /></div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {LANGKAH.map((l, i) => (
                  <TombolPilih key={l.judul} aktif={i === langkah} onClick={() => setLangkah(i)}>
                    {l.judul}
                  </TombolPilih>
                ))}
              </div>
              {tombolKembali}
            </div>
          </>
        )}

        {w === 'jarak-ke-garis' && (
          <>
            <div className="layar"><JarakKeGaris pilih={titikGaris} sudut={sudut} onUbah={aturSudut} /></div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label><span>Titik yang diukur ke garis AG</span>
                  <span className="mono">{PILIHAN[titikGaris]}</span></label>
                <div style={{ display: 'flex', gap: 6 }}>
                  {PILIHAN.map((n, i) => (
                    <TombolPilih key={n} aktif={i === titikGaris} onClick={() => setTitikGaris(i)}>
                      titik {n}
                    </TombolPilih>
                  ))}
                </div>
              </div>
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>coba ketiganya, dan perhatikan angkanya sama sekali tidak berubah</span>
              </div>
              {tombolKembali}
            </div>
          </>
        )}

        {w === 'jarak-ke-bidang' && (
          <>
            <div className="layar"><JarakKeBidang pilih={soalBidang} sudut={sudut} onUbah={aturSudut} /></div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <TombolPilih aktif={soalBidang === 0} onClick={() => setSoalBidang(0)}>
                  A ke bidang BDE
                </TombolPilih>
                <TombolPilih aktif={soalBidang === 1} onClick={() => setSoalBidang(1)}>
                  C ke bidang BDG
                </TombolPilih>
              </div>
              {tombolKembali}
            </div>
          </>
        )}

        {w === 'jarak-sejajar' && (
          <>
            <div className="layar"><JarakSejajar t={tSejajar} sudut={sudut} onUbah={aturSudut} /></div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="tsejajar">
                  <span>Geser titik P sepanjang AE</span>
                  <span className="mono">{bulat(tSejajar * 100, 0)}%</span>
                </label>
                <input id="tsejajar" type="range" min={0} max={1} step={0.01} value={tSejajar}
                       onChange={(e) => setTSejajar(+e.target.value)} />
              </div>
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>geser sejauh apa pun, angka jaraknya tidak bergerak</span>
              </div>
              {tombolKembali}
            </div>
          </>
        )}

        {w === 'sudut-bersilangan' && (
          <>
            <div className="layar"><SudutBersilangan geser={geser} sudut={sudut} onUbah={aturSudut} /></div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="geser">
                  <span>Geser BG sejajar dirinya sendiri</span>
                  <span className="mono">{bulat(geser * 100, 0)}%</span>
                </label>
                <input id="geser" type="range" min={0} max={1} step={0.01} value={geser}
                       onChange={(e) => setGeser(+e.target.value)} />
              </div>
              <div className="skala-info" style={{ gridColumn: '1 / -1' }}>
                <span className="titik" />
                <span>geser sampai penuh, dan lihat BG mendarat tepat menjadi AH</span>
              </div>
              {tombolKembali}
            </div>
          </>
        )}

        {w === 'sudut-bidang' && (
          <>
            <div className="layar"><SudutBidang mode={modeSudut} sudut={sudut} onUbah={aturSudut} /></div>
            <div className="kendali">
              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {MODE.map((x, i) => (
                  <TombolPilih key={x.nama} aktif={i === modeSudut} onClick={() => setModeSudut(i)}>
                    {x.nama}
                  </TombolPilih>
                ))}
              </div>
              {tombolKembali}
            </div>
          </>
        )}

        {w === 'dunia-nyata-ruang' && <DuniaNyataRuang />}
      </>
    )

    kanan = (
      <>
        {w === 'kubus-putar' && (
          <div className="blok">
            <div className="cap">Angka dari alat di sebelah kiri</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>sudut putar</td><td>{bulat(sudut.mendatar, 0)}°</td></tr>
                <tr><td>tinggi mata</td><td>{bulat(sudut.menunduk, 0)}°</td></tr>
                <tr><td>di gambar terlihat</td>
                    <td>{potongTahap1 ? 'berpotongan' : 'terpisah'}</td></tr>
                <tr className="tegas"><td>kedudukan BD dan EG</td><td>{LETAK}</td></tr>
                <tr className="tegas"><td>jarak BD ke EG</td><td>{bulat(JARAK_ASLI)} satuan</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Dua baris terakhir tidak pernah berubah berapa pun kubusnya diputar.
              Yang berubah cuma baris ketiga, yaitu apa yang kebetulan terlihat.
            </div>
          </div>
        )}

        {w === 'pemilih-kedudukan' && (
          <div className="blok">
            <div className="cap">Angka dari alat di sebelah kiri</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>ruas biru</td><td>{r1.nama} ({r1.jenis})</td></tr>
                <tr><td>ruas merah</td><td>{r2.nama} ({r2.jenis})</td></tr>
                <tr className="tegas"><td>kedudukannya</td><td>{hasilRuas.letak}</td></tr>
              </tbody>
            </table>
            <div className="catatan">{hasilRuas.alasan}.</div>
          </div>
        )}

        {w === 'kaki-tegak-lurus' && (
          <div className="blok">
            <div className="cap">Angka dari alat di sebelah kiri</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>letak Q pada AC</td><td>{bulat(tKaki * 100, 0)}%</td></tr>
                <tr><td>panjang BQ sekarang</td><td>{bulat(panjangDi(tKaki), 3)}</td></tr>
                <tr className="tegas"><td>paling pendek</td><td>{bulat(JARAK_TERPENDEK, 3)}</td></tr>
                <tr><td>tercapai saat Q di</td><td>{bulat(T_TERBAIK * 100, 0)}%</td></tr>
              </tbody>
            </table>
            <GrafikPanjang t={tKaki} />
            <div className="catatan">
              Lembah grafik itu jatuh tepat di posisi siku-siku. Itu bukan kebetulan,
              dan itulah sebabnya jarak selalu diukur tegak lurus.
            </div>
          </div>
        )}

        {w === 'diagonal-kubus' && (
          <div className="blok">
            <div className="cap">Angka dari alat di sebelah kiri</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>rusuk kubus</td><td>6</td></tr>
                <tr className={langkah === 0 ? 'tegas' : undefined}>
                  <td>diagonal sisi AC</td><td>{bulat(DIAGONAL_SISI, 3)}</td></tr>
                <tr className={langkah === 1 ? 'tegas' : undefined}>
                  <td>diagonal ruang AG</td><td>{bulat(DIAGONAL_RUANG, 3)}</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Diagonal ruang bukan rumus baru. Ia Pythagoras yang dipakai untuk
              kedua kalinya, dengan hasil yang pertama sebagai salah satu sisinya.
            </div>
          </div>
        )}

        {w === 'jarak-ke-garis' && (
          <div className="blok">
            <div className="cap">Angka dari alat di sebelah kiri</div>
            <table className="tabel-angka">
              <tbody>
                {PILIHAN.map((n) => (
                  <tr key={n} className={n === PILIHAN[titikGaris] ? 'tegas' : undefined}>
                    <td>jarak {n} ke garis AG</td>
                    <td>{bulat(hitungGaris(n).jarak, 3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="catatan">
              Ketiganya sama, yaitu {bulat(garis.jarak, 3)}, atau 2 akar 6. Diagonal ruang
              adalah sumbu simetri kubus, jadi ketiga tetangga titik A duduk mengelilinginya
              seperti tiga kaki payung.
            </div>
          </div>
        )}

        {w === 'jarak-ke-bidang' && (
          <div className="blok">
            <div className="cap">Angka dari alat di sebelah kiri</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>titik yang diukur</td><td>{bidang.titik}</td></tr>
                <tr><td>bidangnya</td><td>{bidang.bidang.join('')}</td></tr>
                <tr className="tegas"><td>jaraknya</td><td>{bulat(bidang.jarak, 3)}</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Kedua soal memberi angka yang sama, 2 akar 3. Itu simetri kubus, bukan kebetulan.
              Soal kedua persis soal EBTANAS 1992.
            </div>
          </div>
        )}

        {w === 'jarak-sejajar' && (
          <div className="blok">
            <div className="cap">Angka dari alat di sebelah kiri</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>letak P pada AE</td><td>{bulat(tSejajar * 100, 0)}%</td></tr>
                <tr className="tegas"><td>jarak P ke bidang {NAMA_BIDANG}</td>
                    <td>{bulat(sejajar.jarak, 3)}</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Angkanya tetap 6 di mana pun P diletakkan. Itu sebabnya jarak garis ke bidang
              sejajar boleh dihitung dari satu titik sembarang saja.
            </div>
          </div>
        )}

        {w === 'sudut-bersilangan' && (
          <div className="blok">
            <div className="cap">Angka dari alat di sebelah kiri</div>
            <table className="tabel-angka">
              <tbody>
                <tr><td>geseran BG</td><td>{bulat(geser * 100, 0)}%</td></tr>
                <tr><td>BG mendarat jadi</td><td>{geser > 0.985 ? 'AH' : 'belum'}</td></tr>
                <tr className="tegas"><td>sudut AC dengan BG</td><td>{bulat(SUDUT_JAWAB, 0)}°</td></tr>
              </tbody>
            </table>
            <div className="catatan">
              Menggeser garis sejajar dirinya sendiri tidak mengubah sudut. Itu sebabnya
              cara ini sah, dan sudut yang dicari ternyata sudut segitiga sama sisi ACH.
            </div>
          </div>
        )}

        {w === 'sudut-bidang' && (
          <div className="blok">
            <div className="cap">Angka dari alat di sebelah kiri</div>
            <table className="tabel-angka">
              <tbody>
                {MODE.map((x, i) => (
                  <tr key={x.nama} className={i === modeSudut ? 'tegas' : undefined}>
                    <td>{x.ringkas}</td><td>{bulat(x.jawab, 2)}°</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="catatan">{m.catatan}.</div>
          </div>
        )}
      </>
    )
  }

  return <>{children({ kiri, kanan, tanda })}</>
}
