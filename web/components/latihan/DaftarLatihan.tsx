'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'
import { ISI_TOPIK } from '@/content/daftar-isi'
import { TOPIK, type Topik } from '@/content/topik'
import { cariBab } from '@/content/subbab'
import type { SoalKuis } from '@/content/tipe'
import { langgan } from '@/lib/simpanan'
import { bacaLatihan, persenTopik, ringkasPerTingkat } from '@/lib/latihan-kemajuan'
import KartuBayang from '@/components/mantra/KartuBayang'

/**
 * Halaman /latihan versi MANTRA (3 Sep 2026).
 *
 * Satu kartu ringkasan per bab: persentase besar, satu bar emas-ke-hijau, dan
 * empat ubin tingkat (mudah, sedang, sulit, sangat sulit) yang masing-masing
 * punya bar kecil dan hitungan `N / 8`. Tingkat yang belum terbuka ditulis
 * "terkunci" pada 55% kepekatan, bukan disembunyikan: siswa perlu melihat
 * jalan yang belum ditempuh.
 *
 * LENCANA DIBUANG atas permintaan ARYA. Aturan kemajuan dan pembukaan tingkat
 * TIDAK ditulis ulang di sini, tetap dibaca dari `lib/latihan-kemajuan.ts`.
 *
 * Topik yang belum punya bank soal tetap ditampilkan dan ditandai terus
 * terang. Halaman yang berpura-pura penuh lebih merugikan daripada halaman
 * yang jujur mengatakan apa yang belum ada.
 */
export default function DaftarLatihan() {
  const siap = TOPIK.filter((t) => ISI_TOPIK[t.slug])
  const belum = TOPIK.filter((t) => !ISI_TOPIK[t.slug])

  return (
    <main className="mantra-lebar" style={{ paddingTop: 38 }}>
      <div className="kicker">Latihan</div>
      <h1 className="judul-halaman">Bank soal berjenjang</h1>
      <p className="sub-italic">
        Mulai dari yang mudah. Tingkat berikutnya terbuka setelah Anda menguasai
        tingkat sebelumnya, jadi urutannya menuntun, bukan menghukum.
      </p>

      {siap.map((t) => (
        <KartuBab key={t.slug} topik={t} bank={ISI_TOPIK[t.slug]!.kuis} />
      ))}

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

      <div className="kotak-emas" style={{ maxWidth: '54rem', margin: '28px 0 48px' }}>
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

/**
 * Satu kartu bab. Dipisah jadi komponen sendiri BUKAN demi kerapian, tetapi
 * karena hook tidak boleh dipanggil di dalam perulangan. Dengan begini tiap
 * bab punya satu komponen dengan satu hook, dan urutannya tetap.
 */
function KartuBab({ topik, bank }: { topik: Topik; bank: SoalKuis[] }) {
  // Dibaca sebagai external store: kemajuan berubah dari halaman lain, dan
  // React 19 melarang menyalinnya ke state lewat useEffect.
  const kemajuan = useSyncExternalStore(
    langgan,
    () => JSON.stringify(bacaLatihan(topik.slug)),
    () => JSON.stringify({ benar: [], dicoba: 0, lencana: [] }),
  )
  const k = JSON.parse(kemajuan) as ReturnType<typeof bacaLatihan>
  const bab = cariBab(topik.slug)

  const persen = persenTopik(bank, k)
  const ringkas = ringkasPerTingkat(bank, k)

  return (
    <KartuBayang className="kartu-latihan">
      <div className="latihan-atas">
        <div>
          <div className="bab-kicker">
            {bab ? `Bab ${bab.no} · ${bab.kelas} · ` : ''}
            {bank.length} soal
          </div>
          <h2>{topik.nama}</h2>
        </div>
        <div className="latihan-persen">{persen}%</div>
      </div>

      <div className="bar-besar" role="img" aria-label={`Kemajuan ${topik.nama} ${persen} persen`}>
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

      <Link href={`/latihan/${topik.slug}`} className="pil-gelap" style={{ marginTop: 18 }}>
        {k.benar.length === 0 ? 'Mulai latihan' : 'Lanjutkan latihan'}
      </Link>
    </KartuBayang>
  )
}
