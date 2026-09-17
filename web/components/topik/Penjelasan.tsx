import { Fragment, type ReactNode } from 'react'
import type { Blok } from '@/content/trigonometri'
import TeksMat from '@/components/latihan/TeksMat'

/**
 * Perender penjelasan bertahap.
 *
 * Bentuknya sengaja beragam (paragraf pendek, daftar poin, kalimat sorot, kotak
 * contoh) supaya mata bisa memindai, bukan menghadapi tembok teks.
 * Permintaan ARYA 31 Agu: "jangan seperti cerpen, kasih bullet, poin penting".
 *
 * REVISI 1 Sep 2026, dua jenis blok baru:
 *
 * `sesi`  Penanda pergantian bagian. Sebelumnya sub judul oker terbaca seperti
 *         paragraf baru tanpa batas, sehingga siswa tidak sadar sudah pindah
 *         topik. Sekarang ia punya garis pemisah, nomor urut, dan jarak atas
 *         yang lega, jadi batasnya tidak mungkin terlewat.
 *
 * `coba`  Kotak "Yuk bereksperimen" yang disorot, mengajak siswa memakai alat
 *         di panel Alat sebelum lanjut membaca. Ditaruh di tengah materi,
 *         bukan di akhir, supaya siswa mencoba selagi penasaran.
 *
 * Butir daftar boleh ditulis "Label - isi"; bagian sebelum tanda pisah akan
 * ditebalkan otomatis.
 *
 * `sisipan` (5 Sep 2026, keputusan ARYA): di layar sempit, materi TANPA video
 * menaruh alatnya di sini, tepat di bawah kotak "Yuk bereksperimen" yang
 * pertama, bukan di atas judul. Siswa membaca dulu, baru diajak mencoba.
 * Kalau materinya tidak punya kotak itu (galeri dunia nyata), sisipan
 * ditaruh di akhir bacaan.
 *
 * REVISI ARYA 12 Sep 2026 (tiga hal, berlaku semua materi):
 * - langkah di kotak "Yuk bereksperimen" bernomor 1, 2, 3, bukan butir polos;
 * - kalimat sorot diberi cap "Kalimat kunci" (semula "Intinya", ARYA 13 Sep:
 *   terdengar memaksa) supaya perannya terbaca. Penutup kotak "Yang kamu
 *   temukan" (12 Sep) DICABUT 14 Sep atas kritik ARYA: kesimpulan tidak
 *   boleh disodorkan selagi siswa bereksperimen. Kotak coba kini berhenti
 *   pada pertanyaan, dan jawabannya menunggu di penjelasan sesudahnya;
 *   kalimat sorot yang dulu menempel di bawah kotak dipindah ke dalam
 *   penjelasan itu di berkas isinya;
 * - baris kotak contoh dulu dirapikan dengan spasi untuk huruf lebar-sama
 *   (MATRA lama). Rancangan MANTRA mengganti hurufnya (3 Sep), dan sejak itu
 *   spasinya tidak menjajarkan apa pun (foto ARYA: "Bayangan pohon 8 m"
 *   berantakan). Sekarang tiap baris dipecah di dua spasi atau lebih menjadi
 *   kolom sungguhan (`pecahKolom`) dan dijajarkan lewat grid, tanpa mengubah
 *   201 kotaknya satu per satu.
 */

/** Pecah satu baris contoh di dua spasi atau lebih; spasi di awal baris
 *  berarti sel pertamanya kosong (baris lanjutan yang dijajarkan ke kolom
 *  kedua). Baris tanpa pemisah menjadi satu sel yang melebar penuh. */
export function pecahKolom(baris: string): string[] {
  const kosongDepan = /^\s{2,}/.test(baris)
  const sel = baris.trim().split(/\s{2,}/).filter((s) => s.length > 0)
  return kosongDepan ? ['', ...sel] : sel
}

export default function Penjelasan({ blok, sisipan }: { blok: Blok[]; sisipan?: ReactNode }) {
  const letakSisipan = sisipan ? blok.findIndex((b) => b.jenis === 'coba') : -1
  // Nomor sesi dihitung DULU, bukan dengan penghitung yang dinaikkan di dalam
  // map. React 19 melarang mengubah variabel setelah render selesai, dan pada
  // render ulang penghitung semacam itu memberi nomor yang berbeda-beda.
  const nomor = new Map<number, number>()
  blok.forEach((b, i) => {
    if (b.jenis === 'sesi') nomor.set(i, nomor.size + 1)
  })

  return (
    <div className="bacaan">
      {blok.map((b, i) => {
        /* Semua teks lewat TeksMat (KaTeX), sama seperti bank soal: rumus
           yang ditulis x², ∫₀⁷ x dx, atau 9/2 tampil sebagai rumus
           sungguhan (ARYA 17 Sep 2026 malam). Sel kotak contoh dan judul
           memakai blok={false}: rumusnya tetap sebaris. */
        if (b.jenis === 'paragraf') return <p key={i}><TeksMat teks={b.teks} /></p>

        if (b.jenis === 'sesi')
          return (
            <div key={i} className="sesi">
              <span className="sesi-no mono">
                {String(nomor.get(i) ?? 1).padStart(2, '0')}
              </span>
              <h2 className="sesi-judul"><TeksMat teks={b.judul} blok={false} /></h2>
            </div>
          )

        if (b.jenis === 'coba')
          return (
            <Fragment key={i}>
              <div className="kotak-coba">
                <div className="coba-cap">🔬 Yuk bereksperimen!</div>
                <p><TeksMat teks={b.teks} /></p>
                {b.langkah && (
                  <ol className="coba-langkah">
                    {b.langkah.map((l, n) => <li key={n}><TeksMat teks={l} /></li>)}
                  </ol>
                )}
              </div>
              {i === letakSisipan && sisipan}
            </Fragment>
          )

        if (b.jenis === 'sorot')
          return (
            <div key={i} className="sorot">
              <span className="sorot-cap">Kalimat kunci</span>
              <p><TeksMat teks={b.teks} /></p>
            </div>
          )

        if (b.jenis === 'poin')
          return (
            <div key={i} className="kelompok-poin">
              {b.judul && <h3 className="judul-poin"><TeksMat teks={b.judul} blok={false} /></h3>}
              <ul className="poin">
                {b.butir.map((teks, n) => {
                  const pisah = teks.indexOf(' - ')
                  return pisah > 0 ? (
                    <li key={n}>
                      <b><TeksMat teks={teks.slice(0, pisah)} blok={false} /></b>
                      {' - '}
                      <TeksMat teks={teks.slice(pisah + 3)} />
                    </li>
                  ) : (
                    <li key={n}><TeksMat teks={teks} /></li>
                  )
                })}
              </ul>
            </div>
          )

        // Kotak contoh: baris dipecah jadi sel, lalu disusun sebagai grid
        // dengan kolom sebanyak sel terbanyak. Baris bersel satu melebar
        // penuh, dan sel terakhir tiap baris melebar sampai kolom terakhir,
        // jadi baris pendek tidak merusak lebar kolom baris lainnya.
        //
        // Grid hanya dipakai kalau susunannya KONSISTEN: semua baris yang
        // bersel dua atau lebih punya jumlah sel yang sama (159 dari 201
        // kotak). Tabel yang disusun tangan dengan lebar kolom bervariasi
        // ("masuk  0" dijajarkan dengan "masuk -2", deretan 15 angka) akan
        // salah kolom kalau dipaksa ke grid; yang 42 itu dirender apa adanya
        // dengan huruf lebar-sama, sehingga jajaran buatan penulisnya utuh.
        const sel = b.baris.map(pecahKolom)
        const jumlah = new Set(sel.filter((s) => s.length >= 2).map((s) => s.length))
        const kolom = Math.max(1, ...sel.map((s) => s.length))
        const konsisten = jumlah.size <= 1
        return (
          <div key={i} className="contoh">
            <div className="cap"><TeksMat teks={b.judul} blok={false} /></div>
            {konsisten ? (
              <div
                className={`contoh-tabel${kolom >= 4 ? ' lebar' : ''}`}
                /* Tiap kolom selebar isinya kalau muat (max-content), dan
                   menyusut sampai kata terpanjangnya (auto) kalau layarnya
                   sempit, jadi di HP selnya membungkus di spasi, bukan
                   memaksa gulir menyamping. Kolom terakhir (biasanya rumus
                   atau hasil) mengisi sisa lebar. Tabel angka yang selnya
                   satu kata tidak bisa menyusut: ia menggulir di dalam
                   kotaknya, tidak diperas sampai hurufnya bertumpuk. */
                style={{ gridTemplateColumns: kolom > 1 ? `repeat(${kolom - 1}, minmax(auto, max-content)) minmax(auto, 1fr)` : 'minmax(auto, 1fr)' }}
              >
                {sel.map((baris, n) => (
                  /* Pembungkus baris tembus pandang bagi grid (display:
                     contents); di HP tabel berkolom empat ke atas (`lebar`)
                     berubah jadi baris-baris yang selnya mengalir seperti
                     kalimat, sebab lima kolom tidak pernah muat di 375
                     piksel tanpa digulir atau diperas. */
                  <div key={n} className="baris-sel">
                    {baris.length === 0 && <span className="sel-contoh jeda" style={{ gridColumn: '1 / -1' }} />}
                    {baris.map((isi, k) => (
                      <span
                        key={k}
                        className={`sel-contoh${isi === '' ? ' kosong' : ''}${baris.length === 1 ? ' penuh' : ''}`}
                        style={k === baris.length - 1 && k < kolom - 1 ? { gridColumn: `${k + 1} / -1` } : undefined}
                      >
                        <TeksMat teks={isi} blok={false} />
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="contoh-mono">
                {b.baris.map((baris, n) => (
                  <div key={n} className="baris-contoh">{baris}</div>
                ))}
              </div>
            )}
            {b.simpul && <div className="simpul"><TeksMat teks={b.simpul} /></div>}
          </div>
        )
      })}
      {letakSisipan < 0 && sisipan}
    </div>
  )
}
