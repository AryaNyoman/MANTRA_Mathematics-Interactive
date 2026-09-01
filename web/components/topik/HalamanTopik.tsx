'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import PemutarVideo from '@/components/PemutarVideo'
import Penjelasan from '@/components/topik/Penjelasan'
import Latihan from '@/components/topik/Latihan'
import Kuis from '@/components/topik/Kuis'
import type { IsiTopik } from '@/components/topik/jenis'
import { ISI_TOPIK } from '@/content/daftar-isi'
import type { Topik } from '@/content/topik'
import { langgan } from '@/lib/simpanan'
import {
  bacaKemajuan, catatDibuka, tambahDetik, kuisTerbuka, ajakan,
} from '@/lib/kemajuan'

type Layar = { jenis: 'tahap'; slug: string } | { jenis: 'latihan' } | { jenis: 'kuis' }

/** Berapa soal yang dikerjakan dalam satu sesi kuis, diambil dari bank soal. */
const SOAL_PER_SESI = 8

/**
 * Rangka halaman topik, dipakai SEMUA topik.
 *
 * Tata letak SATU LAYAR: kiri berganti isi mengikuti tahap yang dipilih,
 * kanan berisi penjelasan lengkap. Siswa tidak perlu menggulir atas-bawah
 * untuk menghubungkan gambar dengan penjelasannya.
 *
 * Urutannya dari KONSEP menuju rumus, bukan sebaliknya. Kotak "Sering keliru"
 * ada di bawah, setelah siswa paham, bukan menyambut di halaman depan.
 *
 * Sampai 1 September 2026 berkas ini bernama `Trigonometri.tsx` dan mengimpor
 * kesepuluh widget trigonometri langsung. Sekarang isinya datang dari
 * `content/daftar-isi.ts`, jadi menambah topik ketiga nanti tidak menyentuh
 * berkas ini sama sekali.
 */
export default function HalamanTopik({ topik }: { topik: Topik }) {
  const isi = ISI_TOPIK[topik.slug]

  // Pencarian isi sengaja dilakukan di sini, DI LUAR komponen yang memakai
  // hook. Kalau digabung, keluar lebih awal saat isinya belum ada akan
  // melanggar aturan urutan hook React.
  if (!isi) return null

  return <Rangka topik={topik} isi={isi} />
}

function Rangka({ topik, isi }: { topik: Topik; isi: IsiTopik }) {
  const { tahap: TAHAP, latihan: LATIHAN, kuis: KUIS, kanal: KANAL, Panggung } = isi

  const [layar, setLayar] = useState<Layar>({ jenis: 'tahap', slug: TAHAP[0].slug })
  // Tahap yang punya video menampilkan salah satu saja pada satu waktu,
  // supaya panggung tetap satu layar tanpa gulir atas-bawah.
  const [mode, setMode] = useState<'coba' | 'tonton'>('tonton')

  const tahap = layar.jenis === 'tahap' ? TAHAP.find((t) => t.slug === layar.slug) : undefined
  const adaVideo = Boolean(tahap?.video)
  const tampilWidget = !adaVideo || mode === 'coba'

  /* --- kemajuan membaca, dipakai membuka kunci kuis ---------------------
     Syaratnya sengaja tidak diumumkan; lihat lib/kemajuan.ts. Yang tampil
     hanya ajakan halus, karena tombol mati tanpa keterangan akan dikira
     situsnya rusak.

     Dibaca sebagai "external store", BUKAN useState yang diperbarui di dalam
     useEffect. Dua alasan:

     1. React 19 melarang setState langsung di badan effect
        (react-hooks/set-state-in-effect), karena memicu render berantai.
     2. `catatDibuka` dan `tambahDetik` menulis lewat `tulis()` di simpanan.ts,
        yang sudah memberi tahu semua pendengar. Jadi begitu kemajuannya
        bertambah, nilai di bawah ini ikut segar sendiri tanpa perlu disalin
        ke state.

     Nilai server sengaja `true`: HTML yang dikirim server tidak boleh
     menampilkan tombol mati, karena localStorage baru terbaca di peramban. */
  const terbuka = useSyncExternalStore(
    langgan,
    () => kuisTerbuka(bacaKemajuan(topik.slug), TAHAP.length),
    () => true,
  )

  useEffect(() => {
    if (layar.jenis === 'tahap') catatDibuka(topik.slug, layar.slug)
  }, [layar, topik.slug])

  // Waktu hanya bertambah selama tab benar-benar terlihat: meninggalkan
  // halaman semalaman tidak boleh dihitung sebagai membaca.
  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') tambahDetik(topik.slug, 15)
    }, 15000)
    return () => window.clearInterval(id)
  }, [topik.slug])

  return (
    <Panggung tahap={tahap} tampilWidget={tampilWidget}>
      {({ kiri, kanan, tanda }) => (
        <div className="panggung">
          {/* ======================= KIRI ======================= */}
          <div className="kolom">
            {/* Deretan tab dibagi dua kelompok. Di layar lebar kedua pembungkus
                memakai `display: contents`, jadi semua tombol tetap jadi anak
                langsung `.langkah` dan tampilan laptop tidak berubah sedikit
                pun. Di layar sempit barulah kelompok kedua turun ke barisnya
                sendiri.

                Alasannya: di 375 piksel tombol "Latihan" duduk sekitar 550
                piksel di sebelah kanan, jadi siswa harus menggeser melewati
                sepuluh tombol MATERI sebelum tahu bahwa Latihan dan Kuis ada.
                (Keputusan ARYA, 2 Sep 2026.) */}
            <div className="langkah" role="tablist" aria-label="Tahap belajar">
              <div className="langkah-gulir" role="presentation">
                {TAHAP.map((t) => (
                  <button
                    key={t.slug}
                    role="tab"
                    aria-selected={layar.jenis === 'tahap' && layar.slug === t.slug}
                    disabled={!t.siap}
                    title={t.siap ? t.judul : `${t.judul} (belum dibangun)`}
                    onClick={() => setLayar({ jenis: 'tahap', slug: t.slug })}
                  >
                    {/* Nomornya saja. Nama materi ikut ditulis di sini membuat baris
                        tab jadi panjang dan harus digeser ke samping, padahal judul
                        lengkapnya sudah terbaca besar di kolom kanan begitu tab
                        dipilih. (Permintaan ARYA, 1 Sep 2026.) */}
                    MATERI {String(t.no).padStart(2, '0')}
                  </button>
                ))}
              </div>
              <div className="langkah-tetap" role="presentation">
                <span className="pisah" aria-hidden />
                <button role="tab" aria-selected={layar.jenis === 'latihan'}
                        onClick={() => setLayar({ jenis: 'latihan' })}>Latihan</button>
                <button role="tab" aria-selected={layar.jenis === 'kuis'}
                        disabled={!terbuka}
                        title={terbuka ? 'Kuis' : ajakan()}
                        onClick={() => terbuka && setLayar({ jenis: 'kuis' })}>Kuis</button>
              </div>
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
                  {/* 8 soal per sesi, diambil dari bank 32 soal, dan yang sudah
                      pernah keluar dihindari. Jadi mengulang kuis berarti bertemu
                      soal baru. (Permintaan ARYA, 1 Sep 2026.) */}
                  <div className="tanda">KUIS · {SOAL_PER_SESI} SOAL</div>
                  <div className="isi-gulir">
                    <Kuis
                      bank={KUIS}
                      jumlah={SOAL_PER_SESI}
                      kunciSimpan={`matra:kuis:${topik.slug}`}
                      topik={topik.slug}
                    />
                  </div>
                </>
              )}

              {tahap && (
                <>
                  {/* Nomornya sudah terbaca di tab yang sedang aktif; mengulangnya
                      di sini hanya menambah kata tanpa menambah keterangan. */}
                  <div className="tanda">
                    {adaVideo && mode === 'tonton' ? 'ANIMASI' : tanda}
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

                  {kiri}

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
            <div className="jalur">Materi {topik.kelas}</div>

            {tahap ? (
              <>
                <h1>{tahap.judul}</h1>
                <div className="sub">{tahap.pertanyaan}</div>

                <div className="blok">
                  <Penjelasan blok={tahap.penjelasan} />
                </div>

                {kanan}

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
                    : 'Salah itu wajar, yang penting tahu di mana letak kelirunya.'}
                </div>
                <div className="blok bacaan">
                  <div className="cap">Cara memakainya</div>
                  <p>
                    {layar.jenis === 'latihan'
                      ? 'Empat soal dengan tingkat kesulitan menaik: dari menerapkan perbandingan, memeriksa syarat, menemukan kesalahan orang lain, sampai penerapan dua langkah. Buka pembahasan hanya setelah benar-benar mentok.'
                      : 'Delapan soal pilihan ganda. Setelah menjawab, Anda langsung melihat alasannya, termasuk kenapa pilihan yang keliru itu terasa masuk akal. Nilai terbaik disimpan di peramban ini saja.'}
                  </p>
                </div>
              </>
            )}

            {/* RINGKASAN ditaruh di BAWAH, tepat sebelum kotak YouTube.

                Permintaan ARYA, dan ia menyatakan sudah berkali-kali memintanya.
                Alasannya pedagogis: rangkuman berguna sebagai penutup SETELAH
                siswa membaca materinya, bukan sebagai pembuka yang membocorkan
                isinya sebelum dibaca.

                Syaratnya cukup `intisari` ada. Dulu ikut menuntut `tahap.widget`,
                sehingga materi tanpa alat interaktif kehilangan Ringkasannya
                tanpa alasan. Materi 10 kena persis jebakan itu. */}
            {tahap && tahap.intisari && (
              /* Sengaja dibedakan tampilannya dari daftar poin di dalam
                 penjelasan, kalau markanya sama, keduanya terasa mengulang. */
              <div className="baca-cepat">
                <div className="cap">Ringkasan</div>
                <ol>
                  {tahap.intisari.map((b, i) => <li key={i}>{b}</li>)}
                </ol>
              </div>
            )}

            {/* Bagian ini SENGAJA dipisah tegas dari materi: sebelumnya ia menyatu
                dengan penjelasan di atasnya sehingga tidak terbaca sebagai bagian
                tersendiri. Sekarang punya garis pemisah tebal, latar sendiri, dan
                judul dengan logo YouTube.

                Tautannya langsung ke HASIL PENCARIAN di kanal itu, bukan ke
                halaman depan kanal: siswa cukup satu klik, tidak perlu mengetik
                ulang kata kunci yang tertulis di layar. */}
            <div className="sesi-youtube">
              <h2 className="youtube-judul">
                <svg width="26" height="19" viewBox="0 0 28 20" aria-hidden="true">
                  <rect width="28" height="20" rx="5" fill="#C4302B" />
                  <path d="M11 5.6 19 10l-8 4.4V5.6Z" fill="#fff" />
                </svg>
                Pelajari lebih dalam lewat YouTube!
              </h2>
              <p className="youtube-antar">
                Klik nama kanalnya, Anda langsung dibawa ke hasil pencarian topik ini
                di kanal tersebut.
              </p>
              <ul className="tautan">
                {KANAL.map((k) => (
                  <li key={k.handle}>
                    <a
                      href={`${k.url}/search?query=${encodeURIComponent(k.cari)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ▶ {k.nama} <span className="mono">{k.handle}</span>
                    </a>
                    <span className="cari">{k.cari}</span>
                  </li>
                ))}
              </ul>
              <div className="sumber">
                Tautan menuju kanal aslinya. Kami tidak mengunggah ulang video siapa pun.
              </div>
            </div>
          </div>
        </div>
      )}
    </Panggung>
  )
}
