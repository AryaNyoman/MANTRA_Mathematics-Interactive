'use client'

import Link from 'next/link'
import { useSyncExternalStore, ViewTransition, type CSSProperties } from 'react'
import { ISI_TOPIK } from '@/content/daftar-isi'
import { TOPIK, type Topik } from '@/content/topik'
import { cariBab } from '@/content/subbab'
import type { SoalKuis } from '@/content/tipe'
import { langgan } from '@/lib/simpanan'
import { bacaLatihan, KOSONG_JSON, LENCANA, persenTopik, ringkasPerTingkat, SYARAT_NAIK } from '@/lib/latihan-kemajuan'
import { useModeGuru } from '@/lib/mode-guru'
import LatarBab from '@/components/latihan/LatarBab'

/**
 * Halaman /latihan versi MANTRA v2 (4 Sep 2026).
 * Patokan: `docs/desain-mantra/MANTRA-v2.dc.html` baris 500 sampai 512.
 *
 * Satu kartu ringkas per BAB, disusun dalam kisi. Isinya: kelas dan jumlah
 * soal, nama bab, persentase besar, lalu EMPAT GARIS TINGKAT (mudah,
 * sedang, sulit, sangat sulit) beserta penanda ujungnya.
 *
 * Keempat garis itu kebetulan cocok persis dengan empat tingkat kesulitan
 * yang sudah ada di bank soal tiap topik, jadi rancangan ini tidak menuntut
 * satu soal baru pun. Rancangan aslinya memakai kartu per MATERI dengan bank
 * sembilan soal masing-masing; ARYA memilih per bab (4 Sep 2026), dan
 * pilihan itu yang membuat bentuk kartunya bisa dipakai apa adanya.
 *
 * Versi sebelumnya memakai satu kartu LEBAR per bab berisi empat ubin
 * tingkat bertuliskan angka. Kartu selebar halaman untuk tujuh bab berarti
 * halaman ini harus digulir jauh hanya untuk melihat pilihan yang ada,
 * padahal tugasnya cuma satu: memilih bab.
 *
 * LENCANA DIBUANG atas permintaan ARYA. Aturan kemajuan dan pembukaan
 * tingkat TIDAK ditulis ulang di sini, tetap dibaca dari
 * `lib/latihan-kemajuan.ts`.
 *
 * Topik yang belum punya bank soal tetap ditampilkan dan ditandai terus
 * terang. Halaman yang berpura-pura penuh lebih merugikan daripada halaman
 * yang jujur mengatakan apa yang belum ada.
 */

/** Warna tiap tingkat, makin dalam makin sulit. Dari rancangan. */
const WARNA_TINGKAT = ['#B08A3E', '#B08A3E', '#8A6A28', '#6E9C7A']

export default function DaftarLatihan() {
  const siap = TOPIK.filter((t) => ISI_TOPIK[t.slug])
  const belum = TOPIK.filter((t) => !ISI_TOPIK[t.slug])
  const guru = useModeGuru()

  return (
    <main className="mantra-lebar" style={{ paddingTop: 38 }}>
      <div className="kicker">Latihan</div>
      <h1 className="judul-halaman">Pilih bab yang mau kamu latih</h1>
      <p className="sub-italic">
        Tiap bab punya empat tingkat, 15 soal tiap tingkat. Tingkat berikutnya
        terbuka setelah {SYARAT_NAIK} soal tingkat sebelumnya kamu jawab benar, jadi
        urutannya menuntun, bukan menghukum.
      </p>
      {guru && (
        <div className="lencana-guru" role="status">
          Mode guru aktif: semua tingkat dan kuis terbuka di peramban ini.
        </div>
      )}

      {/* `data-bertahap`: lima kartu pertama muncul bertahap saat dokumen
          pertama dimuat (globals.css bagian G), `--n` urutannya. */}
      <div className="kisi-bank" data-bertahap>
        {siap.map((t, i) => (
          <KartuBab key={t.slug} topik={t} bank={ISI_TOPIK[t.slug]!.kuis} urutan={i} />
        ))}
      </div>

      {belum.length > 0 && (
        <div className="kartu-segera">
          <div>
            <div className="kicker" style={{ color: 'var(--tinta-50)' }}>
              Segera
            </div>
            <h3>Bank soal yang belum dibuka</h3>
            <p>{belum.map((t) => t.nama).join(', ')} menyusul setelah materinya selesai.</p>
          </div>
          <span className="titik" aria-hidden="true">
            ···
          </span>
        </div>
      )}

      <div className="kotak-emas" style={{ margin: '28px 0 48px' }}>
        <b>Nilai di sini bukan penilaian resmi.</b>
        <p>
          Kemajuan tersimpan di peramban kamu sendiri, tidak dikirim ke mana pun.
          Karena itu ia hilang kalau kamu berganti perangkat atau membersihkan
          riwayat.
        </p>
      </div>
    </main>
  )
}

/**
 * Satu kartu bab. Dipisah jadi komponen sendiri BUKAN demi kerapian, tetapi
 * karena hook tidak boleh dipanggil di dalam perulangan. Dengan begini tiap
 * bab punya satu komponen dengan satu hook, dan urutannya tetap.
 */
function KartuBab({ topik, bank, urutan }: { topik: Topik; bank: SoalKuis[]; urutan: number }) {
  // Dibaca sebagai external store: kemajuan berubah dari halaman lain, dan
  // React 19 melarang menyalinnya ke state lewat useEffect.
  const kemajuan = useSyncExternalStore(
    langgan,
    () => JSON.stringify(bacaLatihan(topik.slug)),
    () => KOSONG_JSON,
  )
  const k = JSON.parse(kemajuan) as ReturnType<typeof bacaLatihan>
  const bab = cariBab(topik.slug)
  const guru = useModeGuru()

  const persen = persenTopik(bank, k)
  const ringkas = ringkasPerTingkat(bank, k, guru)

  return (
    <Link
      href={`/latihan/${topik.slug}`}
      className="kartu-bank"
      style={{ '--n': urutan } as CSSProperties}
      aria-label={`Latihan ${topik.nama}, ${persen} persen selesai dari ${bank.length} soal`}
    >
      <LatarBab slug={topik.slug} />
      <div className="bank-atas">
        <div className="bank-judul">
          <div className="bab-kicker">
            {bab ? `${bab.kelas} · ` : ''}
            {bank.length} soal
            {k.lencana.length > 0 ? ` · 🏅 ${k.lencana.length}/${LENCANA.length} lencana` : ''}
          </div>
          {/* Elemen bersama dengan judul halaman bank soal (ArenaLatihan). */}
          <ViewTransition name={`kartu-latihan-${topik.slug}`} share="judul-pindah" default="none">
            <h3>{topik.nama}</h3>
          </ViewTransition>
        </div>
        <span className="bank-persen angka-rata">{persen}%</span>
      </div>

      <div className="bank-tingkat">
        {ringkas.map((r, i) => (
          <span
            key={r.tingkat}
            className="bank-bar"
            title={
              r.terbuka
                ? `${r.tingkat}: ${r.selesai} dari ${r.total} benar`
                : `${r.tingkat}: terkunci`
            }
          >
            <span
              style={{ width: `${r.persen}%`, background: WARNA_TINGKAT[i] }}
            />
          </span>
        ))}
      </div>
      <div className="bank-ujung">
        <span>Mudah</span>
        <span>Sangat sulit</span>
      </div>
    </Link>
  )
}
