'use client'

import Link from 'next/link'
import { useState, useSyncExternalStore } from 'react'
import type { SoalKuis, TingkatKuis } from '@/content/tipe'
import { langgan } from '@/lib/simpanan'
import {
  bacaLatihan, catatJawaban, ringkasPerTingkat, segarkanLencana,
  LENCANA, SYARAT_NAIK, URUT_TINGKAT,
} from '@/lib/latihan-kemajuan'


/**
 * Arena latihan: siswa memilih tingkat, lalu mengerjakan soal satu per satu.
 *
 * Berbeda dari Kuis, di sini TIDAK ada skor akhir dan tidak ada batas jumlah
 * soal. Salah boleh diulang sampai benar. Yang dicatat hanya soal yang pernah
 * benar, dan itulah yang menggerakkan bar kemajuan.
 *
 * Tingkat dibuka bertahap: harus benar `SYARAT_NAIK` soal di satu tingkat
 * sebelum tingkat berikutnya bisa dimasuki. Syarat ini sengaja DIUMUMKAN,
 * berbeda dengan kunci kuis yang sengaja disembunyikan. Alasannya berbeda:
 * kunci kuis mencegah siswa mengejar angka, sedangkan tangga latihan justru
 * berguna kalau siswa tahu tinggal berapa lagi.
 *
 * Bank soalnya masuk lewat properti, bukan diimpor langsung. Sampai
 * 1 September 2026 berkas ini mengimpor bank soal Trigonometri dan menulis
 * slug topiknya di dalam kode, sehingga topik kedua harus menyalin seluruh
 * berkas hanya untuk mengganti dua baris.
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
  const [tingkat, setTingkat] = useState<TingkatKuis | null>(null)
  const [ke, setKe] = useState(0)
  const [dipilih, setDipilih] = useState<number | null>(null)
  const [lencanaBaru, setLencanaBaru] = useState<string[]>([])

  const kemajuan = useSyncExternalStore(
    langgan,
    () => JSON.stringify(bacaLatihan(topik)),
    () => JSON.stringify({ benar: [], dicoba: 0, lencana: [] }),
  )
  const k = JSON.parse(kemajuan) as ReturnType<typeof bacaLatihan>
  const ringkas = ringkasPerTingkat(bank, k)
  const sudahBenar = new Set(k.benar)

  // ---------------------------------------------------- pilih tingkat dulu
  if (tingkat === null) {
    return (
      <main className="beranda">
        <div className="jalur">Latihan {nama}</div>
        <h1>Pilih tingkatnya</h1>
        <p className="sub" style={{ maxWidth: '44rem' }}>
          Kerjakan {SYARAT_NAIK} soal dengan benar untuk membuka tingkat berikutnya.
          Salah tidak dihitung, jadi tidak ada ruginya mencoba.
        </p>

        <div className="tingkat-pilih">
          {ringkas.map((r) => (
            <button
              key={r.tingkat}
              className={`tingkat-tombol${r.terbuka ? '' : ' terkunci'}`}
              disabled={!r.terbuka || r.total === 0}
              title={r.terbuka ? `Latihan tingkat ${r.tingkat}` : `Selesaikan ${SYARAT_NAIK} soal tingkat sebelumnya dulu`}
              onClick={() => { setTingkat(r.tingkat); setKe(0); setDipilih(null) }}
            >
              <span className="tingkat-nama">{r.tingkat}</span>
              <span className="bar-kecil"><span style={{ width: `${r.persen}%` }} /></span>
              <span className="tingkat-angka mono">
                {r.terbuka ? `${r.selesai} / ${r.total} benar` : 'terkunci'}
              </span>
            </button>
          ))}
        </div>

        <Link href="/latihan" className="tombol garis" style={{ maxWidth: '16rem', marginTop: 26 }}>
          &#8592; KEMBALI
        </Link>
      </main>
    )
  }

  // ---------------------------------------------------------- kerjakan soal
  const soal: SoalKuis[] = bank.filter((s) => s.tingkat === tingkat)
  const s = soal[ke]

  function jawab(n: number) {
    if (dipilih !== null) return
    setDipilih(n)
    catatJawaban(topik, s.id, n === s.benar)
    setLencanaBaru(segarkanLencana(topik, bank))
  }

  function lanjut() {
    setDipilih(null)
    setLencanaBaru([])
    setKe((n) => (n + 1) % soal.length)
  }

  const nomorTingkat = URUT_TINGKAT.indexOf(tingkat) + 1

  return (
    <main className="beranda">
      <div className="latihan-atas" style={{ marginBottom: 14 }}>
        <div>
          <div className="jalur">Tingkat {nomorTingkat} dari 4 &middot; {tingkat}</div>
          <h1 style={{ margin: '4px 0 0' }}>Soal {ke + 1} dari {soal.length}</h1>
        </div>
        <button className="tombol garis" style={{ width: 'auto' }}
                onClick={() => { setTingkat(null); setDipilih(null) }}>
          GANTI TINGKAT
        </button>
      </div>

      <div className="arena">
        {/* Hanya ditampilkan SEBELUM dijawab. Tanpa syarat `dipilih === null`,
            tanda ini ikut muncul begitu siswa baru saja menjawab benar, dan
            terbaca seolah ia mengulang soal lama padahal baru mengerjakannya. */}
        {dipilih === null && sudahBenar.has(s.id) && (
          <div className="sudah-benar mono">✓ soal ini sudah pernah Anda jawab benar</div>
        )}

        <p className="soal-teks">{s.pertanyaan}</p>

        <div className="pilihan">
          {s.pilihan.map((p, n) => {
            const terpilih = dipilih === n
            const iniBenar = n === s.benar
            const kelas = dipilih === null ? '' : iniBenar ? 'benar' : terpilih ? 'salah' : 'redam'
            return (
              <button key={n} className={`opsi ${kelas}`} onClick={() => jawab(n)}
                      disabled={dipilih !== null}>
                <span className="huruf">{String.fromCharCode(65 + n)}</span>
                {p}
              </button>
            )
          })}
        </div>

        {dipilih !== null && (
          <div className="pembahasan">
            <div className="cap">{dipilih === s.benar ? 'Benar' : 'Belum tepat, coba pahami ini'}</div>
            <p style={{ margin: 0 }}>{s.alasan}</p>
          </div>
        )}

        {lencanaBaru.length > 0 && (
          <div className="lencana-baru">
            {lencanaBaru.map((id) => {
              const l = LENCANA.find((x) => x.id === id)
              if (!l) return null
              return (
                <div key={id} className="lencana punya">
                  <span className="lencana-ikon" aria-hidden>{l.ikon}</span>
                  <div>
                    <div className="lencana-nama">Lencana baru: {l.nama}</div>
                    <div className="lencana-syarat">{l.syarat}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="latihan-bawah" style={{ justifyContent: 'flex-end' }}>
          <button className="tombol" disabled={dipilih === null} onClick={lanjut}>
            SOAL BERIKUTNYA &#8594;
          </button>
        </div>
      </div>
    </main>
  )
}
