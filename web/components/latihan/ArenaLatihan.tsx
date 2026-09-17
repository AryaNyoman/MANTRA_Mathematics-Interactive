'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { aturArah } from '@/lib/arah-rute'
import { useEffect, useState, useSyncExternalStore, ViewTransition } from 'react'
import type { SoalKuis, TingkatKuis } from '@/content/tipe'
import { cariBab } from '@/content/subbab'
import { langgan } from '@/lib/simpanan'
import {
  bacaLatihan, catatJawaban, hapusJawaban, KOSONG_JSON, LENCANA, persenTopik,
  ringkasPerTingkat, segarkanLencana, simpanPosisi, SYARAT_NAIK, URUT_TINGKAT,
} from '@/lib/latihan-kemajuan'
import { bacaBenih, HURUF, hurufTampil, petakanHuruf, urutanPilihan } from '@/lib/acak-pilihan'
import KartuBayang from '@/components/mantra/KartuBayang'
import GambarSoal from '@/components/latihan/gambar/GambarSoal'
import TeksMat from '@/components/latihan/TeksMat'
import { useModeGuru } from '@/lib/mode-guru'

/**
 * Halaman bank soal satu topik, rancangan MANTRA (3 Sep 2026), dirombak
 * 17 Sep 2026 atas enam permintaan ARYA:
 *
 * 1. DUA TAMPILAN. Tanpa `?tingkat=` halaman memperlihatkan RINGKASAN:
 *    kemajuan topik, lencana, dan empat ubin tingkat untuk dipilih. Dengan
 *    `?tingkat=mudah` halaman berisi SOALNYA SAJA ("setelah memilih tingkat,
 *    siswa fokus dengan soalnya"). Tingkat ada di alamat supaya refresh dan
 *    tombol kembali peramban tetap bekerja.
 * 2. PETA SOAL: satu kotak bernomor per soal, berwarna menurut keadaannya
 *    (belum, benar, salah, sedang dibuka), bisa diketuk untuk melompat.
 * 3. TOMBOL "Soal sebelumnya", bukan cuma berikutnya.
 * 4. SOAL YANG PERNAH BENAR dibuka lagi langsung memperlihatkan jawabannya
 *    dan pembahasannya, supaya siswa belajar lagi. Yang pernah salah dibuka
 *    dengan pilihan lamanya ditandai, boleh dijawab ulang, pembahasan baru
 *    tampil setelah diperiksa lagi (supaya tidak sekadar menyalin jawaban).
 * 5. POSISI TERSIMPAN per tingkat (lib/latihan-kemajuan.ts): pindah tingkat,
 *    refresh, atau kembali besok tidak melempar siswa ke nomor satu.
 * 6. JENDELA KELUAR saat menekan tautan lain di tengah mengerjakan (hanya
 *    bila di kunjungan ini sudah ada yang dijawab), dan LENCANA dihidupkan
 *    lagi: baris lencana di ringkasan, perayaan kecil saat lencana baru.
 *
 * Tambahan 17 Sep 2026 sore (ARYA):
 * 7. PILIHAN GANDA DIKOCOK per tab (lib/acak-pilihan.ts) supaya siswa tidak
 *    menghafal huruf jawaban; yang disimpan tetap indeks asli, dan huruf
 *    di pembahasan diterjemahkan mengikuti urutan tampilan.
 * 8. PECAHAN BERSUSUN di soal, pilihan, dan pembahasan (TeksMat).
 * 9. JENDELA SKOR begitu ke-15 soal satu tingkat sudah dijawab: benar dan
 *    salah, lalu pilihan "Baca-baca dulu" atau "Kerjakan ulang yang salah"
 *    (hanya tanda salahnya yang dihapus, lalu melompat ke soal salah
 *    pertama). Peta soal mengikuti JAWABAN TERAKHIR, bukan riwayat pernah
 *    benar, supaya cocok dengan skor dan dengan tanda yang dihapus.
 *
 * Aturan kemajuan tetap di `lib/latihan-kemajuan.ts`; yang dihitung hanya
 * soal yang pernah BENAR. Menjawab tetap dua langkah: pilih, lalu Periksa.
 * Pembahasan tetap di panel samping.
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
  const router = useRouter()
  const cari = useSearchParams()
  const mintaTingkat = cari?.get('tingkat') ?? null
  const tingkat = (URUT_TINGKAT as string[]).includes(mintaTingkat ?? '')
    ? (mintaTingkat as TingkatKuis)
    : null

  const kemajuanJson = useSyncExternalStore(
    langgan,
    () => JSON.stringify(bacaLatihan(topik)),
    () => KOSONG_JSON,
  )
  const k = JSON.parse(kemajuanJson) as ReturnType<typeof bacaLatihan>
  // Mode guru: semua tingkat terbuka, dan jawaban guru TIDAK dicatat supaya
  // kemajuan siswa di peramban itu tidak ikut berubah.
  const guru = useModeGuru()
  const ringkas = ringkasPerTingkat(bank, k, guru)
  const persen = persenTopik(bank, k)
  const bab = cariBab(topik)
  // benih kocokan pilihan: tetap selama tab hidup, '0' (urutan asli) di server
  const benih = useSyncExternalStore(() => () => {}, bacaBenih, () => '0')
  const alamatTingkat = (t: TingkatKuis) => `/latihan/${topik}?tingkat=${encodeURIComponent(t)}`

  return (
    <main className="mantra-lebar" style={{ paddingTop: 38 }}>
      <div className="remah-latihan">
        <Link href="/latihan" data-tanpa-tanya="">Latihan</Link>
        <span className="remah-pisah">/</span>
        {tingkat ? (
          <>
            <Link href={`/latihan/${topik}`} data-tanpa-tanya="">{nama}</Link>
            <span className="remah-pisah">/</span>
            <span className="kini">{tingkat}</span>
          </>
        ) : (
          <span className="kini">{nama}</span>
        )}
      </div>

      {guru && (
        <div className="lencana-guru" role="status">
          Mode guru aktif: semua tingkat terbuka, jawaban di sini tidak mengubah kemajuan siswa.
        </div>
      )}

      {tingkat === null ? (
        <Ringkasan
          slug={topik} nama={nama} bank={bank} k={k} ringkas={ringkas} persen={persen}
          bab={bab ? `Bab ${bab.no} · ${bab.kelas} · ` : ''}
          buka={(t) => router.push(alamatTingkat(t))}
        />
      ) : (
        <Soal
          topik={topik} nama={nama} bank={bank} tingkat={tingkat} k={k} ringkas={ringkas}
          guru={guru} benih={benih}
          gantiTingkat={(t) => router.push(alamatTingkat(t))}
          pergi={(alamat) => {
            // arah pindah halaman ditulis dulu (lib/arah-rute), baru pindah
            aturArah(alamat.split(/[?#]/)[0])
            router.push(alamat)
          }}
        />
      )}

      <div className="kotak-emas" style={{ maxWidth: '54rem', margin: '24px 0 44px' }}>
        <b>Nilai di sini bukan penilaian resmi.</b>
        <p>
          Kemajuan tersimpan di peramban Anda sendiri, tidak dikirim ke mana pun.
          Karena itu ia hilang kalau Anda berganti perangkat atau membersihkan
          riwayat.
        </p>
      </div>
    </main>
  )
}

type Ringkas = ReturnType<typeof ringkasPerTingkat>
type Kemajuan = ReturnType<typeof bacaLatihan>

/* ------------------------------------------------------------------ */
/* Tampilan 1: ringkasan kemajuan, lencana, pilih tingkat              */
/* ------------------------------------------------------------------ */
function Ringkasan({
  slug, nama, bank, k, ringkas, persen, bab, buka,
}: {
  slug: string
  nama: string
  bank: SoalKuis[]
  k: Kemajuan
  ringkas: Ringkas
  persen: number
  bab: string
  buka: (t: TingkatKuis) => void
}) {
  const diraih = new Set(k.lencana)
  return (
    <>
      <div className="kicker">Bank soal</div>
      {/* Elemen bersama dengan judul kartu di daftar /latihan. */}
      <ViewTransition name={`kartu-latihan-${slug}`} share="judul-pindah" default="none">
        <h1 className="judul-halaman">{nama}</h1>
      </ViewTransition>
      <p className="sub-italic">
        Mulai dari yang mudah. Tingkat berikutnya terbuka setelah {SYARAT_NAIK} soal
        tingkat sebelumnya benar, jadi urutannya menuntun, bukan menghukum.
      </p>

      <KartuBayang className="kartu-latihan">
        <div className="latihan-atas">
          <div>
            <div className="bab-kicker">
              {bab}
              {bank.length} soal
            </div>
            <h2>Kemajuanmu di topik ini</h2>
          </div>
          <div className="latihan-persen">{persen}%</div>
        </div>
        <div className="bar-besar" role="img" aria-label={`Kemajuan ${persen} persen`}>
          <span style={{ width: `${persen}%` }} />
        </div>

        {/* Lencana: dihidupkan lagi 17 Sep 2026 (ARYA: "agar siswa lebih
            semangat"). Yang belum diraih tetap tampil redup beserta syaratnya,
            supaya jelas apa yang harus dikejar; semuanya menandai pemahaman,
            bukan lama membuka halaman. */}
        <div className="baris-lencana" role="list" aria-label="Lencana">
          {LENCANA.map((l) => {
            const ada = diraih.has(l.id)
            return (
              <div key={l.id} role="listitem" className="lencana" data-diraih={ada}
                   title={ada ? `${l.nama}: diraih` : `${l.nama}: ${l.syarat}`}>
                <span className="ikon" aria-hidden="true">{l.ikon}</span>
                <span className="nama">{l.nama}</span>
                <span className="syarat">{ada ? 'Diraih' : l.syarat}</span>
              </div>
            )
          })}
        </div>
      </KartuBayang>

      <div className="tajuk-baris">
        <h2>Pilih tingkat</h2>
        <span className="rel" />
        <span className="kanan">{SYARAT_NAIK} benar membuka tingkat berikutnya</span>
      </div>

      <div className="kisi-tingkat kisi-tingkat-pilih">
        {ringkas.map((r) => (
          <button
            key={r.tingkat}
            type="button"
            className={`ubin-tingkat ubin-tombol${r.terbuka ? '' : ' ubin-terkunci'}`}
            disabled={!r.terbuka || r.total === 0}
            onClick={() => buka(r.tingkat)}
            title={r.terbuka ? `Kerjakan soal tingkat ${r.tingkat}` : `Selesaikan ${SYARAT_NAIK} soal tingkat sebelumnya dulu`}
          >
            <div className="nama">{r.tingkat}</div>
            <div className="bar">
              <span style={{ width: `${r.persen}%` }} />
            </div>
            <div className="angka">
              {r.total === 0 ? 'belum ada soal' : r.terbuka ? `${r.selesai} / ${r.total} benar` : 'terkunci'}
            </div>
            <div className="ajak">{r.terbuka && r.total > 0 ? 'Kerjakan →' : ''}</div>
          </button>
        ))}
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Tampilan 2: soalnya saja                                            */
/* ------------------------------------------------------------------ */
type JawabSesi = { pilih: number | null; periksa: boolean }

function Soal({
  topik, nama, bank, tingkat, k, ringkas, guru, benih, gantiTingkat, pergi,
}: {
  topik: string
  nama: string
  bank: SoalKuis[]
  tingkat: TingkatKuis
  k: Kemajuan
  ringkas: Ringkas
  guru: boolean
  benih: string
  gantiTingkat: (t: TingkatKuis) => void
  pergi: (alamat: string) => void
}) {
  const soal = bank.filter((s) => s.tingkat === tingkat)
  const barisTingkat = ringkas.find((r) => r.tingkat === tingkat)
  const terkunci = barisTingkat ? !barisTingkat.terbuka : false

  /* Posisi soal dibaca dari simpanan (satu sumber kebenaran), bukan state
     lokal: dengan begitu ia otomatis bertahan saat refresh dan pindah
     tingkat, dan gambaran pertama di peramban sama dengan di server. */
  const ke = Math.min(k.posisi[tingkat] ?? 0, Math.max(soal.length - 1, 0))
  const s: SoalKuis | undefined = soal[ke]
  const keSoal = (n: number) => simpanPosisi(topik, tingkat, Math.max(0, Math.min(n, soal.length - 1)))

  /* Jawaban di KUNJUNGAN ini, per soal. Kalau belum ada, keadaan soal diambil
     dari simpanan: pernah benar = jawabannya tertandai dan pembahasan
     terbuka; pernah salah = pilihan lamanya tertandai, boleh dijawab ulang.
     Mode guru tidak menulis simpanan, jadi peta soalnya mengikuti sesi. */
  const [jawabSesi, setJawabSesi] = useState<Record<string, JawabSesi>>({})
  const keadaanSoal = (q: SoalKuis): JawabSesi & { salahLalu: boolean } => {
    const j = jawabSesi[q.id]
    if (j) return { ...j, salahLalu: false }
    const tersimpan = k.jawaban[q.id]
    if (tersimpan === undefined) return { pilih: null, periksa: false, salahLalu: false }
    if (tersimpan === q.benar) return { pilih: tersimpan, periksa: true, salahLalu: false }
    return { pilih: tersimpan, periksa: false, salahLalu: true }
  }
  const kini = s ? keadaanSoal(s) : { pilih: null, periksa: false, salahLalu: false }
  const { pilih, periksa, salahLalu } = kini

  // berapa kali Periksa ditekan di kunjungan ini: penentu jendela keluar
  const [dijawabSesi, setDijawabSesi] = useState(0)
  const [lencanaBaru, setLencanaBaru] = useState<string[]>([])
  const [tujuanKeluar, setTujuanKeluar] = useState<string | null>(null)


  /* Jendela skor: dibuka dari periksaJawaban begitu jawaban itu melengkapi
     ke-15 soal (bukan saat halaman dibuka dengan semuanya sudah terjawab dari
     kemarin). Angkanya dihitung saat digambar, jadi selalu mengikuti keadaan
     terbaru. */
  const [skorTampil, setSkorTampil] = useState(false)

  function ulangYangSalah() {
    const ids = soal.filter((q) => nilaiSoal(q) === 'salah').map((q) => q.id)
    setJawabSesi((j) => {
      const baru = { ...j }
      for (const id of ids) delete baru[id]
      return baru
    })
    if (!guru) hapusJawaban(topik, ids)
    const pertama = soal.findIndex((q) => ids.includes(q.id))
    if (pertama >= 0) keSoal(pertama)
    setSkorTampil(false)
  }
  const tingkatBerikut = URUT_TINGKAT[URUT_TINGKAT.indexOf(tingkat) + 1]
  const berikutTerbuka = tingkatBerikut
    ? ringkas.find((r) => r.tingkat === tingkatBerikut)?.terbuka ?? false
    : false

  /* Keadaan tiap soal menurut jawaban TERAKHIR (bukan riwayat pernah benar):
     dipakai peta, skor, dan "kerjakan ulang yang salah". */
  const nilaiSoal = (q: SoalKuis): 'benar' | 'salah' | 'belum' => {
    const kq = keadaanSoal(q)
    if (kq.pilih === null) return 'belum'
    if (!kq.periksa && !kq.salahLalu) return 'belum'
    return kq.pilih === q.benar ? 'benar' : 'salah'
  }
  const jumlahBenar = soal.filter((q) => nilaiSoal(q) === 'benar').length
  const jumlahSalah = soal.filter((q) => nilaiSoal(q) === 'salah').length

  function pilihOpsi(n: number) {
    if (!s || periksa || terkunci) return
    setJawabSesi((j) => ({ ...j, [s.id]: { pilih: n, periksa: false } }))
  }

  function periksaJawaban() {
    if (pilih === null || !s || periksa) return
    setJawabSesi((j) => ({ ...j, [s.id]: { pilih, periksa: true } }))
    setDijawabSesi((n) => n + 1)
    // jawaban ini melengkapi seluruh soal tingkat ini: tampilkan skor
    if (soal.every((q) => q.id === s.id || nilaiSoal(q) !== 'belum')) setSkorTampil(true)
    if (guru) return
    catatJawaban(topik, s.id, pilih === s.benar, pilih)
    const baru = segarkanLencana(topik, bank)
    if (baru.length > 0) setLencanaBaru(baru)
  }

  /* Jendela keluar: menangkap klik tautan di mana pun di halaman (nav, remah,
     kaki) selama sudah ada yang dijawab di kunjungan ini. Tautan yang memang
     bagian latihan (remah ke ringkasan) diberi data-tanpa-tanya. Kemajuan
     sudah tersimpan tiap kali Periksa ditekan, jadi jendela ini pengingat,
     bukan penyelamat. */
  useEffect(() => {
    if (dijawabSesi === 0) return
    const tangkap = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a || a.dataset.tanpaTanya !== undefined || a.target === '_blank') return
      const url = new URL(a.href, window.location.href)
      if (url.origin !== window.location.origin) return
      if (url.pathname === window.location.pathname && url.search === window.location.search) return
      e.preventDefault()
      e.stopPropagation()
      setTujuanKeluar(url.pathname + url.search + url.hash)
    }
    document.addEventListener('click', tangkap, true)
    return () => document.removeEventListener('click', tangkap, true)
  }, [dijawabSesi])

  // Kabar di sebelah tombol: satu kalimat yang selalu memberi tahu keadaan
  // sekarang, jadi siswa tidak perlu menebak kenapa tombolnya mati.
  const kabar = terkunci
    ? `Tingkat ini terbuka setelah ${SYARAT_NAIK} soal tingkat sebelumnya benar.`
    : !periksa
      ? salahLalu && jawabSesi[s?.id ?? ''] === undefined
        ? 'Terakhir kali belum tepat. Pilih jawaban lagi.'
        : pilih === null
          ? 'Pilih satu jawaban dulu.'
          : 'Tekan Periksa jawaban.'
      : pilih === s?.benar
        ? jawabSesi[s?.id ?? '']
          ? 'Benar. Langkahnya ada di panel Pembahasan.'
          : 'Sudah pernah benar. Baca lagi pembahasannya.'
        : 'Belum tepat. Baca panel Pembahasan, lalu coba lagi.'
  const warnaKabar = periksa
    ? pilih === s?.benar
      ? 'var(--hijau)'
      : 'var(--jingga)'
    : 'var(--tinta-50)'

  const lencanaDiraih = LENCANA.filter((l) => lencanaBaru.includes(l.id))
  // urutan tampilan pilihan soal ini: urut[posisi] = indeks asli di bank
  const urut = s ? urutanPilihan(s.id, benih, s.pilihan.length) : []

  return (
    <>
      <div className="tajuk-baris tajuk-soal">
        <h2>Kerjakan soalnya</h2>
        <span className="rel" />
        <Link href={`/latihan/${topik}`} className="kanan tautan-ringkasan" data-tanpa-tanya="">
          ← Ringkasan {nama}
        </Link>
      </div>

      <div className="kisi-soal">
        <div className="kartu-soal">
          {/* Keempat tingkat selalu terlihat, pindah tingkat satu ketukan;
              posisi tiap tingkat diingat, jadi berpindah tidak mengulang
              dari nomor satu. */}
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
                onClick={() => { if (r.tingkat !== tingkat) gantiTingkat(r.tingkat) }}
              >
                {r.tingkat}
                <span className="jml angka-rata">
                  {r.terbuka ? `${r.selesai}/${r.total}` : '🔒'}
                </span>
              </button>
            ))}
          </div>

          {/* Peta soal: satu kotak per soal. Warna = keadaan; ketuk = lompat. */}
          {soal.length > 0 && (
            <div className="peta-soal" role="group" aria-label="Peta soal tingkat ini">
              {soal.map((q, i) => {
                const keadaan = nilaiSoal(q)
                return (
                  <button
                    key={q.id}
                    type="button"
                    className="peta-kotak"
                    data-keadaan={keadaan}
                    data-kini={i === ke}
                    aria-current={i === ke ? 'true' : undefined}
                    aria-label={`Soal ${i + 1}, ${keadaan === 'benar' ? 'sudah benar' : keadaan === 'salah' ? 'pernah salah' : 'belum dijawab'}`}
                    title={`Soal ${i + 1}: ${keadaan === 'benar' ? 'sudah benar' : keadaan === 'salah' ? 'pernah salah' : 'belum dijawab'}`}
                    onClick={() => keSoal(i)}
                  >
                    {i + 1}
                  </button>
                )
              })}
              <span className="peta-keterangan">
                <i data-keadaan="benar" /> benar
                <i data-keadaan="salah" /> salah
                <i data-keadaan="belum" /> belum
              </span>
            </div>
          )}

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
              <p className="soal-teks"><TeksMat teks={s.pertanyaan} /></p>
              {/* Gambar situasi soal tampil SEBELUM dijawab: siswa cerita
                  butuh melihat keadaannya, bukan menebak dari kalimat. */}
              {s.gambar && <GambarSoal gambar={s.gambar} />}

              <div className="opsi-daftar">
                {/* Urutan tampilan dikocok (urut); `n` = indeks ASLI yang
                    disimpan dan dibandingkan dengan s.benar. */}
                {urut.map((n, posisi) => {
                  const p = s.pilihan[n]
                  const iniBenar = n === s.benar
                  const keadaan = !periksa
                    ? pilih === n
                      ? salahLalu ? 'salah-lalu' : 'pilih'
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
                      onClick={() => pilihOpsi(n)}
                    >
                      <span className="huruf">{HURUF[posisi]}</span>
                      <span className="isi"><TeksMat teks={p} /></span>
                      <span className="tanda" aria-hidden="true">
                        {periksa ? (iniBenar ? '✓' : pilih === n ? '✕' : '') : salahLalu && pilih === n ? '✕' : ''}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="soal-aksi">
                <button
                  type="button"
                  className="pil-gelap"
                  disabled={pilih === null || periksa || salahLalu && jawabSesi[s.id] === undefined}
                  onClick={periksaJawaban}
                >
                  Periksa jawaban
                </button>
                <span className="soal-arah">
                  <button type="button" className="pil-garis" disabled={ke === 0}
                          onClick={() => keSoal(ke - 1)} aria-label="Soal sebelumnya">
                    ← Sebelumnya
                  </button>
                  <button type="button" className="pil-garis" disabled={ke >= soal.length - 1}
                          onClick={() => keSoal(ke + 1)} aria-label="Soal berikutnya">
                    Berikutnya →
                  </button>
                </span>
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
                Jawaban benar: <b>{hurufTampil(urut, s.benar)}</b>
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
                        <span><TeksMat teks={petakanHuruf(teks, urut)} /></span>
                        {gambar && <GambarSoal gambar={gambar} />}
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="bahas-alasan"><TeksMat teks={petakanHuruf(s.alasan, urut)} /></p>
              )}
              {s.jebakan && (
                <div className="bahas-jebakan">
                  <div className="kicker">Kenapa pilihan lain menggoda</div>
                  <p><TeksMat teks={petakanHuruf(s.jebakan, urut)} /></p>
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

      {/* Jendela skor sesudah semua soal tingkat ini terjawab */}
      {skorTampil && (
        <div className="tirai-jendela" role="dialog" aria-modal="true" aria-labelledby="judul-skor">
          <div className="jendela-kecil jendela-skor">
            <div className="kicker">Tingkat {tingkat} selesai</div>
            <h3 id="judul-skor">
              {jumlahSalah === 0 ? 'Semua benar!' : `${jumlahBenar} benar, ${jumlahSalah} salah`}
            </h3>
            <div className="skor-angka">
              <span className="benar">{jumlahBenar}</span>
              <span className="pisah">/</span>
              <span>{soal.length}</span>
            </div>
            <p>
              {jumlahSalah === 0
                ? berikutTerbuka
                  ? `Tingkat ${tingkatBerikut} sudah terbuka.`
                  : 'Baca lagi pembahasannya kapan saja lewat peta soal.'
                : 'Mau membaca pembahasannya dulu, atau langsung mengulang yang salah? Tanda soal yang benar tetap disimpan.'}
            </p>
            <div className="jendela-aksi">
              <button type="button" className="pil-garis" onClick={() => setSkorTampil(false)} autoFocus>
                Baca-baca dulu
              </button>
              {jumlahSalah > 0 ? (
                <button type="button" className="pil-gelap" onClick={ulangYangSalah}>
                  Kerjakan ulang yang salah
                </button>
              ) : berikutTerbuka && tingkatBerikut ? (
                <button type="button" className="pil-gelap" onClick={() => gantiTingkat(tingkatBerikut)}>
                  Lanjut ke tingkat {tingkatBerikut}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Perayaan lencana baru: satu jendela kecil, ditutup sendiri oleh siswa. */}
      {lencanaDiraih.length > 0 && (
        <div className="tirai-jendela" role="dialog" aria-modal="true" aria-labelledby="judul-lencana">
          <div className="jendela-kecil jendela-lencana">
            <div className="kicker">Lencana baru</div>
            {lencanaDiraih.map((l) => (
              <div key={l.id} className="lencana-raih">
                <span className="ikon" aria-hidden="true">{l.ikon}</span>
                <div>
                  <div id="judul-lencana" className="nama">{l.nama}</div>
                  <div className="syarat">{l.syarat}</div>
                </div>
              </div>
            ))}
            <button type="button" className="pil-gelap" onClick={() => setLencanaBaru([])} autoFocus>
              Lanjut
            </button>
          </div>
        </div>
      )}

      {/* Jendela keluar */}
      {tujuanKeluar !== null && (
        <div className="tirai-jendela" role="dialog" aria-modal="true" aria-labelledby="judul-keluar">
          <div className="jendela-kecil">
            <h3 id="judul-keluar">Keluar dari latihan?</h3>
            <p>Jawabanmu sudah tersimpan. Kamu bisa melanjutkan dari soal ini kapan saja.</p>
            <div className="jendela-aksi">
              <button type="button" className="pil-garis" onClick={() => setTujuanKeluar(null)} autoFocus>
                Tetap di sini
              </button>
              <button type="button" className="pil-gelap" onClick={() => pergi(tujuanKeluar)}>
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
