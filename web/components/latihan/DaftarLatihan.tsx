'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'
import { ISI_TOPIK } from '@/content/daftar-isi'
import { TOPIK, type Topik } from '@/content/topik'
import type { SoalKuis } from '@/content/tipe'
import { langgan } from '@/lib/simpanan'
import {
  bacaLatihan, persenTopik, ringkasPerTingkat, LENCANA, hitungLencana,
} from '@/lib/latihan-kemajuan'

/**
 * Daftar topik di halaman /latihan, lengkap dengan bar kemajuan dan lencana.
 *
 * Topik yang punya bank soal mendapat kartunya sendiri. Topik yang belum
 * dibangun tetap ditampilkan supaya siswa tahu rencananya, tapi ditandai jelas
 * belum ada soalnya. Menyembunyikannya akan membuat halaman ini terasa lebih
 * lengkap daripada kenyataannya.
 *
 * Sampai 1 September 2026 berkas ini hanya mengenal Trigonometri dan menulis
 * slugnya di dalam kode. Sekarang daftarnya dibaca dari `content/daftar-isi.ts`,
 * jadi topik berikutnya ikut muncul sendiri tanpa berkas ini disentuh.
 */
export default function DaftarLatihan() {
  const siap = TOPIK.filter((t) => ISI_TOPIK[t.slug])
  const belum = TOPIK.filter((t) => !ISI_TOPIK[t.slug])

  return (
    <main className="beranda">
      <div className="jalur">Latihan</div>
      <h1>Bank soal berjenjang</h1>
      <p className="sub" style={{ maxWidth: '46rem' }}>
        Mulai dari yang mudah. Tingkat berikutnya terbuka setelah Anda menguasai
        tingkat sebelumnya, jadi urutannya menuntun, bukan menghukum.
      </p>

      {siap.map((t) => (
        <KartuTopik key={t.slug} topik={t} bank={ISI_TOPIK[t.slug]!.kuis} />
      ))}

      <p className="catatan" style={{ marginTop: 4, maxWidth: '46rem' }}>
        Kemajuan dan lencana ini tersimpan di peramban Anda sendiri, tidak dikirim
        ke mana pun. Karena itu ia akan hilang kalau Anda berganti perangkat atau
        membersihkan riwayat, dan tidak bisa dipakai sebagai nilai resmi.
      </p>

      {belum.length > 0 && (
        <section className="isi-situs" aria-label="Topik lain">
          <h2 className="isi-tajuk">Menyusul</h2>
          <div className="kisi-isi">
            {belum.map((t) => (
              <article key={t.slug} className="kartu-isi">
                <span className="kartu-no mono">{t.kelas}</span>
                <h3>{t.nama}</h3>
                <p>{t.pertanyaan}</p>
                <div className="tanda-kosong mono">BELUM ADA SOAL</div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

/**
 * Satu kartu topik. Dipisah jadi komponen sendiri BUKAN demi kerapian, tetapi
 * karena hook tidak boleh dipanggil di dalam perulangan. Dengan begini tiap
 * topik punya satu komponen dengan satu hook, dan urutannya tetap.
 */
function KartuTopik({ topik, bank }: { topik: Topik; bank: SoalKuis[] }) {
  // Dibaca sebagai external store: kemajuan berubah dari halaman lain, dan
  // React 19 melarang menyalinnya ke state lewat useEffect.
  const kemajuan = useSyncExternalStore(
    langgan,
    () => JSON.stringify(bacaLatihan(topik.slug)),
    () => JSON.stringify({ benar: [], dicoba: 0, lencana: [] }),
  )
  const k = JSON.parse(kemajuan) as ReturnType<typeof bacaLatihan>

  const persen = persenTopik(bank, k)
  const ringkas = ringkasPerTingkat(bank, k)
  const diraih = new Set(hitungLencana(bank, k))

  return (
    <section className="latihan-utama">
      <div className="latihan-kepala">
        <div>
          <div className="cap">Sedang tersedia · {topik.kelas}</div>
          <h2>{topik.nama}</h2>
        </div>
        <div className="latihan-persen mono">{persen}%</div>
      </div>

      <div className="bar-besar" role="img" aria-label={`Kemajuan ${topik.nama} ${persen} persen`}>
        <span style={{ width: `${persen}%` }} />
      </div>

      <div className="tingkat-kisi">
        {ringkas.map((r) => (
          <div key={r.tingkat} className={`tingkat-kartu${r.terbuka ? '' : ' terkunci'}`}>
            <div className="tingkat-nama">{r.tingkat}</div>
            <div className="bar-kecil">
              <span style={{ width: `${r.persen}%` }} />
            </div>
            <div className="tingkat-angka mono">
              {r.terbuka ? `${r.selesai} / ${r.total}` : 'terkunci'}
            </div>
          </div>
        ))}
      </div>

      <div className="lencana-kisi" style={{ marginTop: 18 }}>
        {LENCANA.map((l) => {
          const punya = diraih.has(l.id)
          return (
            <div key={l.id} className={`lencana${punya ? ' punya' : ''}`}>
              <span className="lencana-ikon" aria-hidden>{l.ikon}</span>
              <div>
                <div className="lencana-nama">{l.nama}</div>
                <div className="lencana-syarat">{l.syarat}</div>
              </div>
            </div>
          )
        })}
      </div>

      <Link href={`/latihan/${topik.slug}`} className="tombol" style={{ maxWidth: '18rem', marginTop: 18 }}>
        {k.benar.length === 0 ? 'MULAI LATIHAN' : 'LANJUTKAN LATIHAN'}
      </Link>
    </section>
  )
}
