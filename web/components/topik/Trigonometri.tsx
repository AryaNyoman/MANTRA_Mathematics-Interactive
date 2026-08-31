'use client'

import { useState } from 'react'
import SegitigaSebangun, { hitungGeometri, angka } from '@/components/widget/SegitigaSebangun'
import PenamaanSisi, { type SudutAktif } from '@/components/widget/PenamaanSisi'
import Bayangan, { BATAS_SUDUT, hitungBayangan } from '@/components/widget/Bayangan'
import PabrikRasio, { hitungRasio, SISI, type NamaSisi } from '@/components/widget/PabrikRasio'
import LingkaranSatuan, { hitungLingkaran, angka3 } from '@/components/widget/LingkaranSatuan'
import EnamRasio, { BATAS_ENAM, RASIO, URUT_RASIO, hitungEnam, type Rasio } from '@/components/widget/EnamRasio'
import PerjalananSudut, { ISTIMEWA } from '@/components/widget/PerjalananSudut'
import LingkaranKeGrafik, { BATAS_SAPU } from '@/components/widget/LingkaranKeGrafik'
import TigaGrafik from '@/components/widget/TigaGrafik'
import PemutarVideo from '@/components/PemutarVideo'
import DuniaNyata, { CONTOH, BATAS_JARAK } from '@/components/widget/DuniaNyata'
import Penjelasan from '@/components/topik/Penjelasan'
import Latihan from '@/components/topik/Latihan'
import Kuis from '@/components/topik/Kuis'
import { TAHAP, LATIHAN, KUIS, KANAL, type Tahap } from '@/content/trigonometri'
import type { Topik } from '@/content/topik'

type Layar = { jenis: 'tahap'; slug: string } | { jenis: 'latihan' } | { jenis: 'kuis' }

/**
 * Halaman topik Trigonometri.
 *
 * Tata letak SATU LAYAR: kiri berganti isi mengikuti tahap yang dipilih,
 * kanan berisi penjelasan lengkap. Siswa tidak perlu menggulir atas-bawah
 * untuk menghubungkan gambar dengan penjelasannya.
 *
 * Urutannya dari KONSEP menuju rumus — bukan sebaliknya. Kotak "Sering keliru"
 * ada di bawah, setelah siswa paham, bukan menyambut di halaman depan.
 */
export default function Trigonometri({ topik }: { topik: Topik }) {
  const [layar, setLayar] = useState<Layar>({ jenis: 'tahap', slug: TAHAP[0].slug })

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
  // Tahap yang punya video menampilkan salah satu saja pada satu waktu,
  // supaya panggung tetap satu layar tanpa gulir atas-bawah.
  const [mode, setMode] = useState<'coba' | 'tonton'>('tonton')
  const [contoh, setContoh] = useState(0)
  const [jarakFoto, setJarakFoto] = useState(1)

  const tahap: Tahap | undefined =
    layar.jenis === 'tahap' ? TAHAP.find((t) => t.slug === layar.slug) : undefined
  const adaVideo = Boolean(tahap?.video)
  const tampilWidget = !adaVideo || mode === 'coba'

  return (
    <div className="panggung">
      {/* ======================= KIRI ======================= */}
      <div className="kolom">
        <div className="langkah" role="tablist" aria-label="Tahap belajar">
          {TAHAP.map((t) => (
            <button
              key={t.slug}
              role="tab"
              aria-selected={layar.jenis === 'tahap' && layar.slug === t.slug}
              disabled={!t.siap}
              title={t.siap ? t.judul : `${t.judul} — belum dibangun`}
              onClick={() => setLayar({ jenis: 'tahap', slug: t.slug })}
            >
              <b>{String(t.no).padStart(2, '0')}</b> {t.labelPendek}
            </button>
          ))}
          <span className="pisah" aria-hidden />
          <button role="tab" aria-selected={layar.jenis === 'latihan'}
                  onClick={() => setLayar({ jenis: 'latihan' })}>Latihan</button>
          <button role="tab" aria-selected={layar.jenis === 'kuis'}
                  onClick={() => setLayar({ jenis: 'kuis' })}>Kuis</button>
        </div>

        <div className="wadah">
          {layar.jenis === 'latihan' && (
            <>
              <div className="tanda">LATIHAN · {LATIHAN.length} SOAL</div>
              <div className="isi-gulir"><Latihan soal={LATIHAN} /></div>
            </>
          )}

          {layar.jenis === 'kuis' && (
            <>
              <div className="tanda">KUIS · {KUIS.length} SOAL</div>
              <div className="isi-gulir">
                <Kuis soal={KUIS} kunciSimpan="matra:kuis:trigonometri" />
              </div>
            </>
          )}

          {tahap && (
            <>
              <div className="tanda">
                TAHAP {String(tahap.no).padStart(2, '0')} ·{' '}
                {adaVideo && mode === 'tonton'
                  ? 'ANIMASI'
                  : tahap.widget ? 'INTERAKTIF' : 'BACAAN'}
              </div>

              {/* Tahap yang punya animasi DAN widget: siswa memilih salah satu.
                  Menampilkan keduanya sekaligus memaksa panggung digulir, dan
                  tata letak satu layar adalah keputusan yang sudah dikunci. */}
              {adaVideo && tahap.widget && (
                <div className="pilih-mode" role="group" aria-label="Cara belajar tahap ini">
                  <button aria-pressed={mode === 'tonton'} onClick={() => setMode('tonton')}>
                    Tonton
                  </button>
                  <button aria-pressed={mode === 'coba'} onClick={() => setMode('coba')}>
                    Coba sendiri
                  </button>
                </div>
              )}

              {adaVideo && mode === 'tonton' && tahap.video && (
                <div className="layar">
                  <PemutarVideo
                    berkas={tahap.video.berkas}
                    poster={tahap.video.poster}
                    judul={`Animasi: ${tahap.judul}`}
                  />
                </div>
              )}

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
                      {/* θ dikecualikan dari huruf besar — kalau ikut, ia jadi Θ */}
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
                      <span>coba keenam pasangan — tiap satu punya nama resminya sendiri</span>
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
                      <span>naikkan sampai lewat 360° — kurvanya mengulang persis</span>
                    </div>
                  </div>
                </>
              )}

              {tampilWidget && tahap.widget === 'dunia-nyata' && (
                <>
                  <div className="layar">
                    <DuniaNyata pilih={contoh} jarak={jarakFoto} />
                  </div>
                  <div className="kendali">
                    <div className="pilih-contoh" style={{ gridColumn: '1 / -1' }}>
                      {CONTOH.map((c, i) => (
                        <button key={c.id} aria-pressed={contoh === i}
                                onClick={() => setContoh(i)}>
                          <b>{c.nomor}</b> {c.judul.split(' — ')[0]}
                        </button>
                      ))}
                    </div>
                    {CONTOH[contoh].id === 'kamera' && (
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label htmlFor="jarakFoto">
                          <span>Jarak Anda ke objek</span>
                          <span className="mono">{jarakFoto.toFixed(1).replace('.', ',')} m</span>
                        </label>
                        <input id="jarakFoto" type="range"
                               min={BATAS_JARAK.min} max={BATAS_JARAK.maks}
                               step={BATAS_JARAK.langkah} value={jarakFoto}
                               onChange={(e) => setJarakFoto(+e.target.value)} />
                      </div>
                    )}
                    <div className="skala-info">
                      <span className="titik" />
                      <span>keempatnya ada di dalam satu ponsel</span>
                    </div>
                  </div>
                </>
              )}

              {tampilWidget && !tahap.widget && (
                <div className="isi-gulir">
                  <div className="cap">Intisari tahap ini</div>
                  <ul className="intisari">
                    {(tahap.intisari ?? []).map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ======================= KANAN ======================= */}
      <div className="kolom kanan">
        <div className="jalur">{topik.kelas} / Kurikulum Merdeka</div>

        {tahap ? (
          <>
            <h1>{tahap.judul}</h1>
            <div className="sub">{tahap.pertanyaan}</div>

            {tahap.intisari && tahap.widget && (
              /* Sengaja dibedakan tampilannya dari daftar poin di dalam
                 penjelasan — kalau markanya sama, keduanya terasa mengulang. */
              <div className="baca-cepat">
                <div className="cap">Baca cepat · {tahap.intisari.length} poin</div>
                <ol>
                  {tahap.intisari.map((b, i) => <li key={i}>{b}</li>)}
                </ol>
              </div>
            )}

            <div className="blok">
              <Penjelasan blok={tahap.penjelasan} />
            </div>

            {/* angka hidup hanya untuk tahap yang punya widget berangka */}
            {tampilWidget && tahap.widget === 'segitiga-sebangun' && (
              <div className="blok">
                <div className="cap">Angka dari segitiga di sebelah kiri</div>
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
                        <td>{RASIO[r].lambang} — {RASIO[r].nama}</td>
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
                    <tr><td>cos θ — koordinat x</td><td>{angka3(hitungLingkaran(sudutLingkaran).cos)}</td></tr>
                    <tr><td>sin θ — koordinat y</td><td>{angka3(hitungLingkaran(sudutLingkaran).sin)}</td></tr>
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

            {tahap.seringKeliru && (
              <div className="blok">
                <div className="cap merah">Sering keliru</div>
                <div className="miskon">
                  <b>{tahap.seringKeliru.judul}</b>
                  <p style={{ margin: '6px 0 0' }}>{tahap.seringKeliru.isi}</p>
                  {tahap.seringKeliru.sumber && (
                    <div className="sumber">{tahap.seringKeliru.sumber}</div>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <h1>{layar.jenis === 'latihan' ? 'Latihan' : 'Uji paham'}</h1>
            <div className="sub">
              {layar.jenis === 'latihan'
                ? 'Kerjakan dulu sendiri. Pembahasan sengaja disembunyikan.'
                : 'Salah itu wajar — yang penting tahu di mana letak kelirunya.'}
            </div>
            <div className="blok bacaan">
              <div className="cap">Cara memakainya</div>
              <p>
                {layar.jenis === 'latihan'
                  ? 'Empat soal dengan tingkat kesulitan menaik: dari menerapkan perbandingan, memeriksa syarat, menemukan kesalahan orang lain, sampai penerapan dua langkah. Buka pembahasan hanya setelah benar-benar mentok.'
                  : 'Delapan soal pilihan ganda. Setelah menjawab, Anda langsung melihat alasannya — termasuk kenapa pilihan yang keliru itu terasa masuk akal. Nilai terbaik disimpan di peramban ini saja.'}
              </p>
            </div>
          </>
        )}

        <div className="blok" style={{ borderBottom: 0 }}>
          <div className="cap">Kalau lebih suka belajar dengan menonton</div>
          <ul className="tautan">
            {KANAL.map((k) => (
              <li key={k.handle}>
                <a href={k.url} target="_blank" rel="noopener noreferrer">
                  ▶ {k.nama} <span className="mono">{k.handle}</span>
                </a>
                <span className="cari">cari: “{k.cari}”</span>
              </li>
            ))}
          </ul>
          <div className="sumber">
            Tautan menuju kanal aslinya. Kami tidak mengunggah ulang video siapa pun.
          </div>
        </div>
      </div>
    </div>
  )
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
          Sisi yang sama dibagi dirinya sendiri selalu 1. Tidak ada nama khusus untuk ini —
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
