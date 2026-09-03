'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import PemutarVideo from '@/components/PemutarVideo'
import Penjelasan from '@/components/topik/Penjelasan'
import Latihan from '@/components/topik/Latihan'
import Kuis from '@/components/topik/Kuis'
import type { IsiTopik } from '@/components/topik/jenis'
import { ISI_TOPIK } from '@/content/daftar-isi'
import type { Topik } from '@/content/topik'
import { cariBab, type SubBab } from '@/content/subbab'
import { langgan } from '@/lib/simpanan'
import {
  bacaKemajuan, catatDibuka, tambahDetik, kuisTerbuka, MENIT_MINIMUM,
} from '@/lib/kemajuan'

type Layar = { jenis: 'tahap'; slug: string } | { jenis: 'latihan' } | { jenis: 'kuis' }

/** Berapa soal yang dikerjakan dalam satu sesi kuis, diambil dari bank soal. */
const SOAL_PER_SESI = 8

const dua = (n: number) => String(n).padStart(2, '0')

/**
 * Rangka halaman materi, dipakai SEMUA topik.
 *
 * PEROMBAKAN 3 Sep 2026 (rancangan MANTRA): deretan tab "MATERI 01 sampai 10"
 * diganti SIDEBAR POHON. Alasannya bukan selera. Sepuluh tab bernomor tidak
 * memberi tahu apa pun tentang isinya, dan tidak memperlihatkan bahwa materi
 * berkelompok mengikuti bab buku. Pohon memberi tiga hal sekaligus: nama tiap
 * materi, sub-bab tempatnya bernaung, dan tanda mana yang sudah dibuka.
 *
 * Urutan materi mengikuti SUB-BAB (`content/subbab.ts`), bukan nomornya. Untuk
 * Vektor, materi 10 ada di sub-bab penutup "Penerapan", jadi ia datang paling
 * akhir walau nomornya di tengah.
 *
 * Sidebar bisa dikuncupkan jadi rel selebar 62 piksel. Rel itu tetap menyimpan
 * huruf sub-bab dan nomor materi, jadi siswa tidak pernah kehilangan tempatnya
 * saat ingin ruang baca lebih lebar.
 *
 * Syarat kunci kuis DITULIS apa adanya di kaki sidebar. Sebelumnya syaratnya
 * sengaja disembunyikan dan hanya ada ajakan halus; rancangan baru membalik
 * itu, sebab tombol mati tanpa keterangan membuat siswa mengira situsnya rusak.
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
  const bab = cariBab(topik.slug)

  // Sub-bab yang benar-benar punya materinya. Kalau `subbab.ts` menyebut nomor
  // yang belum ada isinya, nomor itu dibuang di sini supaya sidebar tidak
  // memperlihatkan baris kosong.
  const subbab: SubBab[] = (bab?.sub ?? [{ huruf: 'A', nama: topik.nama, nomor: TAHAP.map((t) => t.no) }])
    .map((s) => ({ ...s, nomor: s.nomor.filter((n) => TAHAP.some((t) => t.no === n)) }))
    .filter((s) => s.nomor.length > 0)
  const urut = subbab.flatMap((s) => s.nomor)
  const tahapDari = (n: number) => TAHAP.find((t) => t.no === n)
  const subDariNomor = (n: number) => subbab.find((s) => s.nomor.includes(n))

  /* --- materi mana yang dibuka lebih dulu -------------------------------
     Peta Materi menautkan langsung ke satu materi lewat `?materi=`, jadi
     siswa yang mengklik "Materi 07" di sana harus mendarat di materi 07,
     bukan selalu di materi pertama. Nilai yang diterima:
       ?materi=<slug tahap>   membuka materi itu
       ?materi=<nomor>        sama, tetapi memakai nomor yang dilihat siswa
       ?materi=latihan        membuka layar latihan
       ?materi=kuis           membuka layar kuis kalau syaratnya sudah lewat
     Alamat yang tidak dikenali diabaikan diam-diam dan jatuh ke materi
     pertama: tautan salah ketik tidak boleh membuat halaman kosong. */
  const awalDari = (minta: string | null): Layar => {
    const utama: Layar = { jenis: 'tahap', slug: tahapDari(urut[0])?.slug ?? TAHAP[0].slug }
    if (!minta) return utama
    if (minta === 'latihan') return { jenis: 'latihan' }
    if (minta === 'kuis') return { jenis: 'kuis' }
    const lewatSlug = TAHAP.find((t) => t.slug === minta && t.siap)
    if (lewatSlug) return { jenis: 'tahap', slug: lewatSlug.slug }
    const n = Number(minta)
    const lewatNomor = Number.isFinite(n) ? TAHAP.find((t) => t.no === n && t.siap) : undefined
    return lewatNomor ? { jenis: 'tahap', slug: lewatNomor.slug } : utama
  }

  const minta = useSearchParams()?.get('materi') ?? null
  const [layarPilih, setLayar] = useState<Layar>(() => awalDari(minta))
  // Tahap yang punya video menampilkan salah satu saja pada satu waktu,
  // supaya panggung tetap satu layar tanpa gulir atas-bawah.
  const [mode, setMode] = useState<'coba' | 'tonton'>('tonton')
  const [rel, setRel] = useState(false)
  // Materi yang centangnya sedang meletup. Sekali saja, saat pertama dibuka.
  const [letup, setLetup] = useState<string | null>(null)

  /* --- kemajuan, dibaca sebagai "external store" ------------------------
     BUKAN useState yang diperbarui di dalam useEffect. Dua alasan:
     1. React 19 melarang setState langsung di badan effect
        (react-hooks/set-state-in-effect), karena memicu render berantai.
     2. `catatDibuka` dan `tambahDetik` menulis lewat `tulis()` di simpanan.ts,
        yang sudah memberi tahu semua pendengar, jadi nilai di bawah ikut
        segar sendiri tanpa perlu disalin ke state.

     Nilai server sengaja kosong: localStorage baru terbaca di peramban.

     Dibaca SEBELUM `layar` dipakai, sebab `terbuka` ikut menentukan layar
     mana yang boleh ditampilkan. */
  const kemajuanJson = useSyncExternalStore(
    langgan,
    () => JSON.stringify(bacaKemajuan(topik.slug)),
    () => JSON.stringify({ dibuka: [], detik: 0 }),
  )
  const kemajuan = JSON.parse(kemajuanJson) as ReturnType<typeof bacaKemajuan>
  const dibuka = new Set(kemajuan.dibuka)
  const terbuka = kuisTerbuka(kemajuan, TAHAP.length)
  const jumlahDibuka = urut.filter((n) => dibuka.has(tahapDari(n)?.slug ?? '')).length
  const persen = Math.round((jumlahDibuka / urut.length) * 100)
  const menitKurang = Math.max(0, MENIT_MINIMUM - Math.floor(kemajuan.detik / 60))

  /* Kunci kuis dijaga di SINI, bukan hanya di tombolnya. Alamat `?materi=kuis`
     bisa diketik sendiri, dan kalau syaratnya belum lewat siswa dilempar ke
     latihan, bukan diberi kuis lewat pintu belakang. */
  /* `useMemo` bukan hiasan: `layar` dipakai sebagai kebergantungan effect di
     bawah. Tanpa memo, cabang kuis-terkunci membuat OBJEK BARU tiap render,
     jadi effect-nya berjalan terus-menerus. */
  const layar: Layar = useMemo(
    () => (layarPilih.jenis === 'kuis' && !terbuka ? { jenis: 'latihan' } : layarPilih),
    [layarPilih, terbuka],
  )

  const tahap = layar.jenis === 'tahap' ? TAHAP.find((t) => t.slug === layar.slug) : undefined
  const adaVideo = Boolean(tahap?.video)
  const tampilWidget = !adaVideo || mode === 'coba'

  /* Pindah dari Peta Materi ke materi LAIN pada topik yang sama tidak memasang
     ulang komponen ini, jadi nilai awal di atas tidak dihitung lagi. Tanpa
     penyelaras ini, mengklik "Materi 07" saat halaman sudah terbuka di materi
     01 tidak akan mengubah apa pun. `terakhir` menahan supaya penyelaras ini
     hanya bekerja saat alamatnya benar-benar berganti, bukan tiap kali siswa
     memilih materi lewat sidebar. */
  const terakhirMinta = useRef(minta)
  useEffect(() => {
    if (terakhirMinta.current === minta) return
    terakhirMinta.current = minta
    if (!minta) return
    // requestAnimationFrame, bukan setLayar langsung: React 19 melarang
    // setState serentak di badan effect (react-hooks/set-state-in-effect).
    const id = requestAnimationFrame(() => setLayar(awalDari(minta)))
    return () => cancelAnimationFrame(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minta])

  useEffect(() => {
    if (layar.jenis !== 'tahap') return
    const baru = !bacaKemajuan(topik.slug).dibuka.includes(layar.slug)
    catatDibuka(topik.slug, layar.slug)
    if (baru) {
      // Centang meletup sekali, saat materi PERTAMA kali dibuka. Dijadwalkan
      // lewat requestAnimationFrame, bukan setState serentak: React 19
      // melarangnya di dalam effect (react-hooks/set-state-in-effect).
      const slug = layar.slug
      const bingkai = requestAnimationFrame(() => setLetup(slug))
      const id = window.setTimeout(() => setLetup(null), 600)
      return () => {
        cancelAnimationFrame(bingkai)
        window.clearTimeout(id)
      }
    }
  }, [layar, topik.slug])

  // Waktu hanya bertambah selama tab benar-benar terlihat: meninggalkan
  // halaman semalaman tidak boleh dihitung sebagai membaca.
  useEffect(() => {
    const id = window.setInterval(() => {
      if (document.visibilityState === 'visible') tambahDetik(topik.slug, 15)
    }, 15000)
    return () => window.clearInterval(id)
  }, [topik.slug])

  // Tetangga dalam urutan belajar, untuk pasangan Kembali dan Lanjut.
  const posisi = tahap ? urut.indexOf(tahap.no) : -1
  const sebelum = posisi > 0 ? tahapDari(urut[posisi - 1]) : undefined
  const sesudah = posisi >= 0 && posisi < urut.length - 1 ? tahapDari(urut[posisi + 1]) : undefined
  const subKini = tahap ? subDariNomor(tahap.no) : undefined
  const subLanjut = sesudah ? subDariNomor(sesudah.no) : undefined
  const saranLanjut =
    subLanjut && subKini
      ? subLanjut.huruf === subKini.huruf
        ? `Masih di sub-bab ${subKini.huruf}`
        : `Masuk sub-bab ${subLanjut.huruf}`
      : ''

  const kuisSyarat = terbuka
    ? 'Terbuka'
    : `Buka ${TAHAP.length} materi (${jumlahDibuka}/${TAHAP.length})` +
      (menitKurang > 0 ? ` dan baca ${MENIT_MINIMUM} menit` : '')

  return (
    <main className="mantra-lebar" style={{ paddingTop: 24 }}>
      <div className="materi-panel">
        {/* Remah roti: kelas, bab, sub-bab, materi, lalu kemajuan di kanan. */}
        <div className="remah">
          {/* Dua remah pertama disembunyikan di layar HP. Remah tidak boleh
              membungkus, dan rantai lengkapnya butuh 676 piksel: di layar 375
              ia mendorong seluruh halaman keluar 333 piksel (terukur 3 Sep).
              Yang dipertahankan adalah dua remah terakhir, sebab itulah yang
              memberi tahu siswa di mana ia sekarang. */}
          <span className="remah-awal">{topik.kelas}</span>
          <span className="remah-pisah remah-awal">/</span>
          <span className="remah-awal">
            {bab ? `Bab ${bab.no} · ` : ''}
            {topik.nama}
          </span>
          {subKini && (
            <>
              <span className="remah-pisah remah-awal">/</span>
              <span className="nama-sub">{subKini.nama}</span>
            </>
          )}
          <span className="remah-pisah">/</span>
          <span className="kini">
            {tahap ? `Materi ${dua(tahap.no)}` : layar.jenis === 'latihan' ? 'Latihan' : 'Kuis'}
          </span>
          <span className="kanan">
            <span className="bar" role="img" aria-label={`Kemajuan ${persen} persen`}>
              <span style={{ width: `${persen}%` }} />
            </span>
            <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{persen}%</span>
          </span>
        </div>

        <div className="materi-badan" data-rel={rel}>
          {/* ======================= SIDEBAR POHON ======================= */}
          <aside className="pohon">
            <div className="pohon-kepala">
              {!rel && (
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="bab">
                    {bab ? `Bab ${bab.no} · ${bab.kelas}` : topik.kelas}
                  </div>
                  <div className="nama">{topik.nama}</div>
                </div>
              )}
              <button
                type="button"
                className="pohon-togel"
                title={rel ? 'Lebarkan daftar materi' : 'Kuncupkan daftar materi'}
                aria-expanded={!rel}
                onClick={() => setRel((r) => !r)}
              >
                {rel ? '»' : '«'}
              </button>
            </div>

            <div className="pohon-gulir">
              {subbab.map((s) => (
                <div key={s.huruf}>
                  {rel ? (
                    <div className="pohon-sub-rel" title={s.nama}>
                      {s.huruf}
                    </div>
                  ) : (
                    <div className="pohon-sub">
                      <span className="huruf">{s.huruf}</span>
                      <span className="nama">{s.nama}</span>
                      <span className="hitung">
                        {s.nomor.filter((n) => dibuka.has(tahapDari(n)?.slug ?? '')).length}/
                        {s.nomor.length}
                      </span>
                    </div>
                  )}
                  {s.nomor.map((n) => {
                    const t = tahapDari(n)
                    if (!t) return null
                    const aktif = layar.jenis === 'tahap' && layar.slug === t.slug
                    const selesai = dibuka.has(t.slug)
                    return (
                      <button
                        key={t.slug}
                        type="button"
                        className="pohon-baris"
                        data-aktif={aktif}
                        data-selesai={selesai}
                        data-letup={letup === t.slug}
                        disabled={!t.siap}
                        title={t.siap ? t.judul : `${t.judul} (belum dibangun)`}
                        aria-current={aktif ? 'true' : undefined}
                        onClick={() => setLayar({ jenis: 'tahap', slug: t.slug })}
                      >
                        <span className="no">{dua(t.no)}</span>
                        {!rel && <span className="judul">{t.judul}</span>}
                        {!rel && (
                          <span className="status" aria-hidden="true">
                            {selesai ? '✓' : ''}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            {!rel && (
              <div className="pohon-kaki">
                <button type="button" onClick={() => setLayar({ jenis: 'latihan' })}>
                  <span className="ikon" aria-hidden="true">✎</span>
                  <span className="nama">Latihan</span>
                  <span className="hitung" style={{ fontSize: 11, color: 'var(--tinta-50)' }}>
                    {LATIHAN.length} soal
                  </span>
                </button>
                <button
                  type="button"
                  disabled={!terbuka}
                  onClick={() => terbuka && setLayar({ jenis: 'kuis' })}
                >
                  <span className="ikon" aria-hidden="true">★</span>
                  <span>
                    <span className="nama" style={{ display: 'block' }}>Kuis</span>
                    <span className="syarat">{kuisSyarat}</span>
                  </span>
                  <span className="lencana-kunci">{terbuka ? 'Siap' : 'Terkunci'}</span>
                </button>
              </div>
            )}
          </aside>

          {/* ======================= ISI MATERI ======================= */}
          <Panggung tahap={tahap} tampilWidget={tampilWidget}>
            {({ kiri, kanan, tanda }) => (
              <div className="panggung">
                <div className="kolom">
                  {layar.jenis === 'latihan' && (
                    <>
                      <div className="tanda">LATIHAN · {LATIHAN.length} SOAL</div>
                      <div className="isi-gulir"><Latihan soal={LATIHAN} /></div>
                    </>
                  )}

                  {layar.jenis === 'kuis' && (
                    <>
                      {/* 8 soal per sesi, diambil dari bank 32 soal, dan yang sudah
                          pernah keluar dihindari. Jadi mengulang kuis berarti
                          bertemu soal baru. (Permintaan ARYA, 1 Sep 2026.) */}
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
                      <div className="tanda">
                        {adaVideo && mode === 'tonton' ? 'ANIMASI' : tanda}
                      </div>

                      {/* Tahap yang punya animasi DAN widget: siswa memilih salah
                          satu. Menampilkan keduanya sekaligus memaksa panggung
                          digulir, dan tata letak satu layar sudah dikunci. */}
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

                <div className="kolom kanan">
                  {tahap ? (
                    <>
                      <div className="jalur">
                        {subKini ? `${subKini.huruf} · ` : ''}Materi {dua(tahap.no)}
                      </div>
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
                      Permintaan ARYA, dan ia menyatakan sudah berkali-kali
                      memintanya. Alasannya pedagogis: rangkuman berguna sebagai
                      penutup SETELAH siswa membaca materinya, bukan sebagai
                      pembuka yang membocorkan isinya sebelum dibaca. */}
                  {tahap && tahap.intisari && (
                    <div className="baca-cepat">
                      <div className="cap">Ringkasan</div>
                      <ol>
                        {tahap.intisari.map((b, i) => <li key={i}>{b}</li>)}
                      </ol>
                    </div>
                  )}

                  {/* Pasangan Kembali dan Lanjut. Lanjut menyebut NAMA materi
                      berikutnya, bukan cuma nomornya, plus satu petunjuk apakah
                      siswa masih di sub-bab yang sama atau berpindah. */}
                  {tahap && (
                    <div className="pindah-materi">
                      <button
                        type="button"
                        className="pindah-kembali"
                        disabled={!sebelum}
                        onClick={() => sebelum && setLayar({ jenis: 'tahap', slug: sebelum.slug })}
                      >
                        <div className="cap-kecil">
                          <span>← Kembali</span>
                        </div>
                        <div className="judul-kecil">{sebelum?.judul ?? 'Materi pertama'}</div>
                      </button>
                      <button
                        type="button"
                        className="pindah-lanjut"
                        onClick={() =>
                          sesudah
                            ? setLayar({ jenis: 'tahap', slug: sesudah.slug })
                            : setLayar({ jenis: 'latihan' })
                        }
                      >
                        <div className="cap-kecil">
                          <span>Lanjut →</span>
                          <span className="angka-rata">
                            {sesudah ? `Materi ${dua(sesudah.no)}` : 'Latihan'}
                          </span>
                        </div>
                        <div className="judul-kecil">
                          {sesudah?.judul ?? 'Uji dengan soal berjenjang'}
                        </div>
                        {saranLanjut && <div className="saran">{saranLanjut}</div>}
                      </button>
                    </div>
                  )}

                  {/* Tautan kanal YouTube. Menuju HASIL PENCARIAN di kanal itu,
                      bukan halaman depan kanal: siswa cukup satu klik. */}
                  <div className="sesi-youtube">
                    <h2 className="youtube-judul">
                      <svg width="26" height="19" viewBox="0 0 28 20" aria-hidden="true">
                        <rect width="28" height="20" rx="5" fill="#C4302B" />
                        <path d="M11 5.6 19 10l-8 4.4V5.6Z" fill="#fff" />
                      </svg>
                      Pelajari lebih dalam lewat YouTube!
                    </h2>
                    <p className="youtube-antar">
                      Klik nama kanalnya, Anda langsung dibawa ke hasil pencarian topik
                      ini di kanal tersebut.
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
                      Tautan menuju kanal aslinya. Kami tidak mengunggah ulang video
                      siapa pun.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Panggung>
        </div>
      </div>
      <div style={{ height: 30 }} />
    </main>
  )
}
