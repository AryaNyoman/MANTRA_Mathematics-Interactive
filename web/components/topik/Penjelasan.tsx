import type { Blok } from '@/content/trigonometri'

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
 *         di sebelah kiri sebelum lanjut membaca. Ditaruh di tengah materi,
 *         bukan di akhir, supaya siswa mencoba selagi penasaran.
 *
 * Butir daftar boleh ditulis "Label - isi"; bagian sebelum tanda pisah akan
 * ditebalkan otomatis.
 */
export default function Penjelasan({ blok }: { blok: Blok[] }) {
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
        if (b.jenis === 'paragraf') return <p key={i}>{b.teks}</p>

        if (b.jenis === 'sesi')
          return (
            <div key={i} className="sesi">
              <span className="sesi-no mono">
                {String(nomor.get(i) ?? 1).padStart(2, '0')}
              </span>
              <h2 className="sesi-judul">{b.judul}</h2>
            </div>
          )

        if (b.jenis === 'coba')
          return (
            <div key={i} className="kotak-coba">
              <div className="coba-cap">🔬 Yuk bereksperimen!</div>
              <p>{b.teks}</p>
              {b.langkah && (
                <ul className="coba-langkah">
                  {b.langkah.map((l, n) => <li key={n}>{l}</li>)}
                </ul>
              )}
            </div>
          )

        if (b.jenis === 'sorot')
          return (
            <p key={i} className="sorot">
              {b.teks}
            </p>
          )

        if (b.jenis === 'poin')
          return (
            <div key={i} className="kelompok-poin">
              {b.judul && <h3 className="judul-poin">{b.judul}</h3>}
              <ul className="poin">
                {b.butir.map((teks, n) => {
                  const pisah = teks.indexOf(' - ')
                  return pisah > 0 ? (
                    <li key={n}>
                      <b>{teks.slice(0, pisah)}</b>
                      {teks.slice(pisah)}
                    </li>
                  ) : (
                    <li key={n}>{teks}</li>
                  )
                })}
              </ul>
            </div>
          )

        return (
          <div key={i} className="contoh">
            <div className="cap">{b.judul}</div>
            {b.baris.map((baris, n) => (
              <div key={n} className="baris-contoh mono">{baris}</div>
            ))}
            {b.simpul && <div className="simpul">{b.simpul}</div>}
          </div>
        )
      })}
    </div>
  )
}
