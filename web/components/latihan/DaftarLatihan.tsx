'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'
import { TOPIK } from '@/content/topik'
import { KUIS } from '@/content/trigonometri'
import { langgan } from '@/lib/simpanan'
import {
  bacaLatihan, persenTopik, ringkasPerTingkat, LENCANA, hitungLencana,
} from '@/lib/latihan-kemajuan'

/**
 * Daftar topik di halaman /latihan, lengkap dengan bar kemajuan dan lencana.
 *
 * Bank soalnya untuk sementara hanya ada pada Trigonometri. Topik lain tetap
 * ditampilkan supaya siswa tahu rencananya, tapi ditandai jelas belum ada
 * soalnya. Menyembunyikannya akan membuat halaman ini terasa lebih lengkap
 * daripada kenyataannya.
 */
export default function DaftarLatihan() {
  // Dibaca sebagai external store: kemajuan berubah dari halaman lain, dan
  // React 19 melarang menyalinnya ke state lewat useEffect.
  const kemajuan = useSyncExternalStore(
    langgan,
    () => JSON.stringify(bacaLatihan('trigonometri')),
    () => JSON.stringify({ benar: [], dicoba: 0, lencana: [] }),
  )
  const k = JSON.parse(kemajuan) as ReturnType<typeof bacaLatihan>

  const persen = persenTopik(KUIS, k)
  const ringkas = ringkasPerTingkat(KUIS, k)
  const diraih = new Set(hitungLencana(KUIS, k))

  return (
    <main className="beranda">
      <div className="jalur">Latihan</div>
      <h1>Bank soal berjenjang</h1>
      <p className="sub" style={{ maxWidth: '46rem' }}>
        Mulai dari yang mudah. Tingkat berikutnya terbuka setelah Anda menguasai
        tingkat sebelumnya, jadi urutannya menuntun, bukan menghukum.
      </p>

      {/* ---------------- kemajuan Trigonometri ---------------- */}
      <section className="latihan-utama">
        <div className="latihan-kepala">
          <div>
            <div className="cap">Sedang tersedia</div>
            <h2>Perbandingan Trigonometri</h2>
          </div>
          <div className="latihan-persen mono">{persen}%</div>
        </div>

        <div className="bar-besar" role="img" aria-label={`Kemajuan ${persen} persen`}>
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

        <Link href="/latihan/trigonometri" className="tombol" style={{ maxWidth: '18rem' }}>
          {k.benar.length === 0 ? 'MULAI LATIHAN' : 'LANJUTKAN LATIHAN'}
        </Link>
      </section>

      {/* ---------------- lencana ---------------- */}
      <section className="isi-situs" aria-label="Lencana">
        <h2 className="isi-tajuk">Lencana</h2>
        <div className="lencana-kisi">
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
        <p className="catatan" style={{ marginTop: 18 }}>
          Kemajuan dan lencana ini tersimpan di peramban Anda sendiri, tidak
          dikirim ke mana pun. Karena itu ia akan hilang kalau Anda berganti
          perangkat atau membersihkan riwayat, dan tidak bisa dipakai sebagai
          nilai resmi.
        </p>
      </section>

      {/* ---------------- topik lain ---------------- */}
      <section className="isi-situs" aria-label="Topik lain">
        <h2 className="isi-tajuk">Menyusul</h2>
        <div className="kisi-isi">
          {TOPIK.filter((t) => t.slug !== 'trigonometri').map((t) => (
            <article key={t.slug} className="kartu-isi">
              <span className="kartu-no mono">{t.kelas}</span>
              <h3>{t.nama}</h3>
              <p>{t.pertanyaan}</p>
              <div className="tanda-kosong mono">BELUM ADA SOAL</div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
