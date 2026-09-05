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
import SudutBidang, { MODE, sudutTerbaca, tumpuanBenar } from '@/components/widget/ruang-3d/SudutBidang'
import DuniaNyataRuang from '@/components/widget/ruang-3d/DuniaNyataRuang'
import { SUDUT_AWAL, bulat, type Sudut } from '@/components/widget/ruang-3d/ruang'
import type { PropPanggung } from '@/components/topik/jenis'
import { Angka, Petunjuk, Pilihan } from '@/components/kendali'

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
  /* Letak titik tumpu P di sepanjang garis potong BD, tahap 9 mode kedua.
     Mulai dari 0,5 yaitu tepat di tengah, satu satunya letak yang benar. */
  const [tTumpu, setTTumpu] = useState(0.5)

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
      <Petunjuk>tarik langsung gambarnya untuk memutar kubus.</Petunjuk>
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
              <Pilihan nama="Ruas biru" arti="ruas pertama yang dibandingkan"
                pilihan={RUAS.map((r, i) => ({ nilai: String(i), label: r.nama }))}
                nilai={String(ruas1)} onPilih={(n) => setRuas1(Number(n))} />
              <Pilihan nama="Ruas merah" arti="ruas kedua"
                pilihan={RUAS.map((r, i) => ({ nilai: String(i), label: r.nama }))}
                nilai={String(ruas2)} onPilih={(n) => setRuas2(Number(n))} />
              <Petunjuk>
                pilih dua ruas, lalu baca kedudukannya di tabel: sejajar, berpotongan, atau bersilangan.
              </Petunjuk>
              {tombolKembali}
            </div>
          </>
        )}

        {w === 'kaki-tegak-lurus' && (
          <>
            <div className="layar"><KakiTegakLurus t={tKaki} sudut={sudut} onUbah={aturSudut} /></div>
            <div className="kendali">
              <Angka nama="Letak Q di AC" arti="0% tepat di A, 100% tepat di C" kunci="q" satuan="%"
                nilai={Math.round(tKaki * 100)} onUbah={(n) => setTKaki(n / 100)} min={0} max={100} langkah={1} />
              <Petunjuk>
                cari letak Q yang membuat BQ sependek mungkin, lalu lihat tanda siku-sikunya.
              </Petunjuk>
              {tombolKembali}
            </div>
          </>
        )}

        {w === 'diagonal-kubus' && (
          <>
            <div className="layar"><DiagonalKubus langkah={langkah} sudut={sudut} onUbah={aturSudut} /></div>
            <div className="kendali">
              <Pilihan nama="Langkah" arti="buka satu demi satu"
                pilihan={LANGKAH.map((l, i) => ({ nilai: String(i), label: l.judul }))}
                nilai={String(langkah)} onPilih={(n) => setLangkah(Number(n))} />
              <Petunjuk>
                di tiap langkah, cari segitiga siku-siku mana yang sedang dipakai Pythagoras.
              </Petunjuk>
              {tombolKembali}
            </div>
          </>
        )}

        {w === 'jarak-ke-garis' && (
          <>
            <div className="layar"><JarakKeGaris pilih={titikGaris} sudut={sudut} onUbah={aturSudut} /></div>
            <div className="kendali">
              <Pilihan nama="Titik yang diukur ke garis AG" arti="jaraknya selalu tegak lurus ke garis"
                pilihan={PILIHAN.map((n, i) => ({ nilai: String(i), label: `titik ${n}` }))}
                nilai={String(titikGaris)} onPilih={(n) => setTitikGaris(Number(n))} />
              <Petunjuk>
                coba ketiganya, dan perhatikan angkanya sama sekali tidak berubah.
              </Petunjuk>
              {tombolKembali}
            </div>
          </>
        )}

        {w === 'jarak-ke-bidang' && (
          <>
            <div className="layar"><JarakKeBidang pilih={soalBidang} sudut={sudut} onUbah={aturSudut} /></div>
            <div className="kendali">
              <Pilihan nama="Soal" arti="titik dan bidang yang diukur jaraknya"
                pilihan={[{ nilai: '0', label: 'A ke bidang BDE' }, { nilai: '1', label: 'C ke bidang BDG' }]}
                nilai={String(soalBidang)} onPilih={(n) => setSoalBidang(Number(n))} />
              <Petunjuk>
                jaraknya diukur sepanjang garis yang tegak lurus bidang. Putar kubusnya sampai tanda siku-sikunya terlihat.
              </Petunjuk>
              {tombolKembali}
            </div>
          </>
        )}

        {w === 'jarak-sejajar' && (
          <>
            <div className="layar"><JarakSejajar t={tSejajar} sudut={sudut} onUbah={aturSudut} /></div>
            <div className="kendali">
              <Angka nama="Letak P di AE" arti="0% tepat di A, 100% tepat di E" kunci="p" satuan="%"
                nilai={Math.round(tSejajar * 100)} onUbah={(n) => setTSejajar(n / 100)} min={0} max={100} langkah={1} />
              <Petunjuk>
                geser sejauh apa pun, angka jaraknya tidak bergerak.
              </Petunjuk>
              {tombolKembali}
            </div>
          </>
        )}

        {w === 'sudut-bersilangan' && (
          <>
            <div className="layar"><SudutBersilangan geser={geser} sudut={sudut} onUbah={aturSudut} /></div>
            <div className="kendali">
              <Angka nama="Geseran BG" arti="0% di tempat asal, 100% sudah sejajar menempel AH" kunci="geser" satuan="%"
                nilai={Math.round(geser * 100)} onUbah={(n) => setGeser(n / 100)} min={0} max={100} langkah={1} />
              <Petunjuk>
                geser sampai penuh, dan lihat BG mendarat tepat menjadi AH.
              </Petunjuk>
              {tombolKembali}
            </div>
          </>
        )}

        {w === 'sudut-bidang' && (
          <>
            <div className="layar">
              <SudutBidang mode={modeSudut} t={tTumpu} sudut={sudut} onUbah={aturSudut} />
            </div>
            <div className="kendali">
              <Pilihan nama="Sudut yang diukur" arti="pilih pasangan yang mau dilihat sudutnya"
                pilihan={MODE.map((x, i) => ({ nilai: String(i), label: x.nama }))}
                nilai={String(modeSudut)} onPilih={(n) => setModeSudut(Number(n))} />
              {modeSudut === 1 && (
                <>
                  <Angka nama="Letak titik tumpu P di BD" kunci="tumpu" satuan="%"
                    arti={tumpuanBenar(tTumpu)
                      ? 'tepat di tengah, kedua kakinya tegak lurus garis potong'
                      : 'meleset, kakinya tidak tegak lurus garis potong, sudutnya belum sah'}
                    nilai={Math.round(tTumpu * 100)} onUbah={(n) => setTTumpu(n / 100)} min={8} max={92} langkah={1} />
                  <button type="button" className="tombol garis" style={{ gridColumn: '1 / -1' }}
                          onClick={() => setTTumpu(0.5)}>
                    KEMBALIKAN P KE TENGAH
                  </button>
                </>
              )}
              <Petunjuk>
                {modeSudut === 1
                  ? 'geser P menjauh dari tengah, dan sudut yang terbaca ikut berubah. Hanya di tengah sudutnya sah.'
                  : 'putar kubusnya sampai kedua kaki sudutnya terlihat jelas, lalu baca sudutnya di tabel.'}
              </Petunjuk>
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
            <div className="cap">Angka dari alat</div>
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
            <div className="cap">Angka dari alat</div>
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
            <div className="cap">Angka dari alat</div>
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
            <div className="cap">Angka dari alat</div>
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
            <div className="cap">Angka dari alat</div>
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
            <div className="cap">Angka dari alat</div>
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
            <div className="cap">Angka dari alat</div>
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
            <div className="cap">Angka dari alat</div>
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
            <div className="cap">Angka dari alat</div>
            <table className="tabel-angka">
              <tbody>
                {MODE.map((x, i) => (
                  <tr key={x.nama} className={i === modeSudut ? 'tegas' : undefined}>
                    <td>{x.ringkas}</td><td>{bulat(x.jawab, 2)}°</td>
                  </tr>
                ))}
                {modeSudut === 1 && !tumpuanBenar(tTumpu) && (
                  <tr>
                    <td>yang terbaca saat P meleset</td>
                    <td>{bulat(sudutTerbaca(tTumpu), 2)}°</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="catatan">
              {modeSudut === 1 && !tumpuanBenar(tTumpu)
                ? 'PC tidak lagi tegak lurus BD, jadi angka yang terbaca turun. Yang benar adalah yang terbesar, dan itu hanya di tengah BD.'
                : `${m.catatan}.`}
            </div>
          </div>
        )}
      </>
    )
  }

  return <>{children({ kiri, kanan, tanda })}</>
}
