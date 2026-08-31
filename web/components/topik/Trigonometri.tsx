'use client'

import { useState } from 'react'
import SegitigaSebangun, { hitungGeometri, angka } from '@/components/widget/SegitigaSebangun'
import PenamaanSisi, { type SudutAktif } from '@/components/widget/PenamaanSisi'
import Bayangan, { BATAS_SUDUT, hitungBayangan } from '@/components/widget/Bayangan'
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

  const tahap: Tahap | undefined =
    layar.jenis === 'tahap' ? TAHAP.find((t) => t.slug === layar.slug) : undefined

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
                TAHAP {String(tahap.no).padStart(2, '0')} · {tahap.widget ? 'INTERAKTIF' : 'BACAAN'}
              </div>

              {tahap.widget === 'bayangan' && (
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

              {tahap.widget === 'segitiga-sebangun' && (
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

              {tahap.widget === 'penamaan-sisi' && (
                <div className="layar">
                  <PenamaanSisi aktif={sudutDilihat} onPilih={setSudutDilihat} />
                </div>
              )}

              {!tahap.widget && (
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
              <div className="blok">
                <div className="cap">Intisari</div>
                <ul className="intisari">
                  {tahap.intisari.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            )}

            <div className="blok bacaan">
              <div className="cap">Penjelasan</div>
              {tahap.penjelasan.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            {/* angka hidup hanya untuk tahap yang punya widget berangka */}
            {tahap.widget === 'segitiga-sebangun' && (
              <div className="blok">
                <div className="cap">Angka dari segitiga di sebelah kiri</div>
                <AngkaSegitiga skala={skala} derajat={derajat} />
              </div>
            )}
            {tahap.widget === 'penamaan-sisi' && (
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
