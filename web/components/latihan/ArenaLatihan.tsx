'use client'

import Link from 'next/link'
import { useState, useSyncExternalStore } from 'react'
import type { SoalKuis, TingkatKuis } from '@/content/tipe'
import { cariBab } from '@/content/subbab'
import { langgan } from '@/lib/simpanan'
import {
  bacaLatihan, catatJawaban, persenTopik, ringkasPerTingkat,
  segarkanLencana, SYARAT_NAIK, URUT_TINGKAT,
} from '@/lib/latihan-kemajuan'
import KartuBayang from '@/components/mantra/KartuBayang'
import GambarSoal from '@/components/latihan/gambar/GambarSoal'
import { useModeGuru } from '@/lib/mode-guru'

/**
 * Halaman bank soal satu topik, rancangan MANTRA (3 Sep 2026).
 *
 * PEROMBAKAN dari versi sebelumnya, dan alasan tiap perubahan:
 *
 * 1. TINGKAT TIDAK LAGI JADI HALAMAN TERSENDIRI. Dulu siswa harus memilih
 *    tingkat di satu layar, lalu layar itu hilang diganti soal, dan untuk
 *    pindah tingkat ia harus menekan "Ganti tingkat" lebih dulu. Sekarang
 *    keempat tingkat selalu terlihat sebagai keping di atas soal, jadi pindah
 *    tingkat satu ketukan dan siswa selalu tahu ada berapa tingkat lagi.
 *
 * 2. MENJAWAB JADI DUA LANGKAH: pilih, lalu tekan Periksa. Dulu sekali
 *    menyentuh pilihan langsung terkunci dan tercatat, jadi salah pencet
 *    dihitung sebagai jawaban. Sekarang pilihan boleh diubah sampai diperiksa.
 *
 * 3. PEMBAHASAN PINDAH KE PANEL DI SAMPING, bukan menyembul di bawah soal.
 *    Dengan begitu soal, pilihan, dan penjelasannya terlihat bersamaan, dan
 *    halaman tidak melompat saat pembahasan muncul.
 *
 * 4. KUIS BAB IKUT DI HALAMAN INI, dengan syarat kuncinya DITULIS. Tombol mati
 *    tanpa keterangan membuat siswa mengira situsnya rusak.
 *
 * Aturan kemajuan TIDAK ditulis ulang di sini: `lib/latihan-kemajuan.ts` yang
 * memegangnya. Yang dicatat tetap hanya soal yang pernah BENAR, jadi salah
 * tidak pernah menghukum.
 *
 * Lencana sudah dibuang dari tampilan atas permintaan ARYA, tetapi tetap
 * dihitung di penyimpanan (`segarkanLencana`) supaya kemajuan lama tidak
 * rusak kalau lencana dihidupkan lagi nanti.
 */
export default function ArenaLatihan({
  topik, nama, bank,
}: {
  /** slug topik, dipakai sebagai kunci penyimpanan kemajuan */
  topik: string
  /** nama topik untuk judul halaman, misalnya "Trigonometri" */
  nama: string
  bank: SoalKuis[]
}) {
  const [tingkat, setTingkat] = useState<TingkatKuis>('mudah')
  const [ke, setKe] = useState(0)
  const [pilih, setPilih] = useState<number | null>(null)
  const [periksa, setPeriksa] = useState(false)

  const kemajuanJson = useSyncExternalStore(
    langgan,
    () => JSON.stringify(bacaLatihan(topik)),
    () => JSON.stringify({ benar: [], dicoba: 0, lencana: [] }),
  )
  const k = JSON.parse(kemajuanJson) as ReturnType<typeof bacaLatihan>
  const sudahBenar = new Set(k.benar)
  // Mode guru: semua tingkat terbuka, dan jawaban guru TIDAK dicatat supaya
  // kemajuan siswa di peramban itu tidak ikut berubah.
  const guru = useModeGuru()
  const ringkas = ringkasPerTingkat(bank, k, guru)
  const persen = persenTopik(bank, k)
  const bab = cariBab(topik)

  /* Kemajuan MATERI tidak lagi dibaca di sini. Ia hanya dipakai untuk
     mengetahui apakah kuis bab boleh dibuka, dan kuis bab sudah tidak ada
     di halaman ini. */

  const soal = bank.filter((s) => s.tingkat === tingkat)
  const s: SoalKuis | undefined = soal[ke]
  const barisTingkat = ringkas.find((r) => r.tingkat === tingkat)
  const terkunci = barisTingkat ? !barisTingkat.terbuka : false

  function gantiTingkat(t: TingkatKuis) {
    setTingkat(t)
    setKe(0)
    setPilih(null)
    setPeriksa(false)
  }

  function periksaJawaban() {
    if (pilih === null || !s || periksa) return
    setPeriksa(true)
    if (guru) return
    catatJawaban(topik, s.id, pilih === s.benar)
    segarkanLencana(topik, bank)
  }

  function berikutnya() {
    if (soal.length === 0) return
    setKe((n) => (n + 1) % soal.length)
    setPilih(null)
    setPeriksa(false)
  }

  // Kabar di sebelah tombol: satu kalimat yang selalu memberi tahu keadaan
  // sekarang, jadi siswa tidak perlu menebak kenapa tombolnya mati.
  const kabar = terkunci
    ? `Tingkat ini terbuka setelah ${SYARAT_NAIK} soal tingkat sebelumnya benar.`
    : !periksa
      ? pilih === null
        ? 'Pilih satu jawaban dulu.'
        : 'Tekan Periksa jawaban.'
      : pilih === s?.benar
        ? 'Benar. Langkahnya ada di panel Pembahasan.'
        : 'Belum tepat. Baca panel Pembahasan, lalu coba lagi.'
  const warnaKabar = periksa
    ? pilih === s?.benar
      ? 'var(--hijau)'
      : 'var(--jingga)'
    : 'var(--tinta-50)'

  return (
    <>
      <main className="mantra-lebar" style={{ paddingTop: 38 }}>
        <div className="remah-latihan">
          <Link href="/latihan">Latihan</Link>
          <span className="remah-pisah">/</span>
          <span className="kini">{nama}</span>
        </div>

        <div className="kicker">Bank soal</div>
        <h1 className="judul-halaman">{nama}</h1>
        <p className="sub-italic">
          Mulai dari yang mudah. Tingkat berikutnya terbuka setelah {SYARAT_NAIK} soal
          tingkat sebelumnya benar, jadi urutannya menuntun, bukan menghukum.
        </p>
        {guru && (
          <div className="lencana-guru" role="status">
            Mode guru aktif: semua tingkat terbuka, jawaban di sini tidak mengubah kemajuan siswa.
          </div>
        )}

        {/* Kemajuan seluruh topik, satu bar. Ditaruh sebelum soal supaya siswa
            tahu posisinya sebelum mulai, bukan setelah selesai. */}
        <KartuBayang className="kartu-latihan">
          <div className="latihan-atas">
            <div>
              <div className="bab-kicker">
                {bab ? `Bab ${bab.no} · ${bab.kelas} · ` : ''}
                {bank.length} soal
              </div>
              <h2>Kemajuanmu di topik ini</h2>
            </div>
            <div className="latihan-persen">{persen}%</div>
          </div>
          <div className="bar-besar" role="img" aria-label={`Kemajuan ${persen} persen`}>
            <span style={{ width: `${persen}%` }} />
          </div>
          <div className="kisi-tingkat">
            {ringkas.map((r) => (
              <div key={r.tingkat} className={`ubin-tingkat${r.terbuka ? '' : ' ubin-terkunci'}`}>
                <div className="nama">{r.tingkat}</div>
                <div className="bar">
                  <span style={{ width: `${r.persen}%` }} />
                </div>
                <div className="angka">
                  {r.terbuka ? `${r.selesai} / ${r.total}` : 'terkunci'}
                </div>
              </div>
            ))}
          </div>
        </KartuBayang>

        <div className="tajuk-baris">
          <h2>Kerjakan soalnya</h2>
          <span className="rel" />
          <span className="kanan">Pilih tingkat</span>
        </div>

        <div className="kisi-soal">
          <div className="kartu-soal">
            {/* Keempat tingkat selalu terlihat. Yang terkunci tetap ditampilkan,
                tidak disembunyikan: siswa perlu melihat jalan yang belum
                ditempuh, dan syaratnya tertulis di kabar bawah. */}
            <div className="keping-tingkat" role="group" aria-label="Tingkat kesulitan">
              {ringkas.map((r) => (
                <button
                  key={r.tingkat}
                  type="button"
                  className="keping"
                  data-pilih={r.tingkat === tingkat}
                  data-kunci={!r.terbuka}
                  disabled={!r.terbuka || r.total === 0}
                  aria-pressed={r.tingkat === tingkat}
                  title={
                    r.terbuka
                      ? `Soal tingkat ${r.tingkat}`
                      : `Selesaikan ${SYARAT_NAIK} soal tingkat sebelumnya dulu`
                  }
                  onClick={() => gantiTingkat(r.tingkat)}
                >
                  {r.tingkat}
                  <span className="jml angka-rata">
                    {r.terbuka ? `${r.selesai}/${r.total}` : '🔒'}
                  </span>
                </button>
              ))}
            </div>

            <div className="soal-kepala">
              <span className="tingkat-kini">
                Tingkat {URUT_TINGKAT.indexOf(tingkat) + 1} dari {URUT_TINGKAT.length}
              </span>
              <span className="rel" />
              <span className="angka-rata">
                {soal.length === 0 ? 'Belum ada soal' : `Soal ${ke + 1} dari ${soal.length}`}
              </span>
            </div>

            {!s ? (
              <p className="soal-kosong">
                Bank soal tingkat ini belum diisi. Pilih tingkat lain dulu.
              </p>
            ) : (
              <>
                {/* Hanya sebelum diperiksa. Kalau ditampilkan setelah menjawab,
                    tandanya terbaca seolah siswa sedang mengulang soal lama
                    padahal ia baru saja mengerjakannya. */}
                {!periksa && sudahBenar.has(s.id) && (
                  <div className="pernah-benar">✓ Soal ini pernah Anda jawab benar</div>
                )}

                <p className="soal-teks">{s.pertanyaan}</p>
                {/* Gambar situasi soal tampil SEBELUM dijawab: siswa cerita
                    butuh melihat keadaannya, bukan menebak dari kalimat. */}
                {s.gambar && <GambarSoal gambar={s.gambar} />}

                <div className="opsi-daftar">
                  {s.pilihan.map((p, n) => {
                    const iniBenar = n === s.benar
                    const keadaan = !periksa
                      ? pilih === n
                        ? 'pilih'
                        : ''
                      : iniBenar
                        ? 'benar'
                        : pilih === n
                          ? 'salah'
                          : 'redam'
                    return (
                      <button
                        key={n}
                        type="button"
                        className="opsi-mantra"
                        data-keadaan={keadaan}
                        disabled={periksa || terkunci}
                        aria-pressed={pilih === n}
                        onClick={() => setPilih(n)}
                      >
                        <span className="huruf">{String.fromCharCode(65 + n)}</span>
                        <span className="isi">{p}</span>
                        <span className="tanda" aria-hidden="true">
                          {periksa ? (iniBenar ? '✓' : pilih === n ? '✕' : '') : ''}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <div className="soal-aksi">
                  <button
                    type="button"
                    className="pil-gelap"
                    disabled={pilih === null || periksa}
                    onClick={periksaJawaban}
                  >
                    Periksa jawaban
                  </button>
                  <button type="button" className="pil-garis" onClick={berikutnya}>
                    Soal berikutnya →
                  </button>
                  <span className="kabar" style={{ color: warnaKabar }}>
                    {kabar}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* ---------------- panel pembahasan, di SAMPING soal ------------- */}
          <aside className="kartu-bahas" aria-live="polite">
            <div className="kicker">Pembahasan</div>
            {periksa && s ? (
              <div className="bahas-isi">
                <div className="bahas-jawab">
                  Jawaban benar: <b>{String.fromCharCode(65 + s.benar)}</b>
                </div>
                {/* Gambar soal TIDAK diulang di sini (ARYA, 14 Sep 2026: "bukan
                    menggambar ulang kembali gambarnya"). Yang tampil adalah
                    gambar BANTU milik langkah: bagan kuadran yang disorot,
                    segitiga acuan, segitiga yang dicabut dari kubus. */}
                {s.langkah && s.langkah.length > 0 ? (
                  s.langkah.map((lg, i) => {
                    const teks = typeof lg === 'string' ? lg : lg.teks
                    const gambar = typeof lg === 'string' ? undefined : lg.gambar
                    return (
                      <div key={i} className="bahas-langkah">
                        <span className="no angka-rata">{i + 1}</span>
                        <div className="isi">
                          <span>{teks}</span>
                          {gambar && <GambarSoal gambar={gambar} />}
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <p className="bahas-alasan">{s.alasan}</p>
                )}
                {s.jebakan && (
                  <div className="bahas-jebakan">
                    <div className="kicker">Kenapa pilihan lain menggoda</div>
                    <p>{s.jebakan}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="bahas-kosong">
                Langkah penyelesaiannya muncul di sini setelah Anda menekan Periksa
                jawaban. Bukan sekadar benar atau salah, tetapi urutan berpikirnya.
              </p>
            )}
          </aside>
        </div>

        {/* KUIS BAB DIBUANG dari sini, 5 Sep 2026 atas permintaan ARYA.

            Ia mengulang kuis yang sudah ada di dalam halaman bab (
            `/topik/<slug>?materi=kuis`), memakai bank dan kunci simpanan yang
            sama persis. Dua pintu ke ruangan yang sama membuat siswa mengira
            keduanya berbeda, dan skor yang muncul di satu tempat terlihat
            hilang di tempat lain padahal itu skor yang sama.

            Pembagiannya sekarang jelas: menu Latihan berisi BANK SOAL saja,
            sedangkan soal Latihan dan Kuis tinggal di dalam babnya
            masing-masing. */}

        <div className="kotak-emas" style={{ maxWidth: '54rem', margin: '24px 0 44px' }}>
          <b>Nilai di sini bukan penilaian resmi.</b>
          <p>
            Kemajuan tersimpan di peramban Anda sendiri, tidak dikirim ke mana pun.
            Karena itu ia hilang kalau Anda berganti perangkat atau membersihkan
            riwayat.
          </p>
        </div>
      </main>
    </>
  )
}
