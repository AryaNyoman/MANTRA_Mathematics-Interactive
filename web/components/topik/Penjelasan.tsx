import type { Blok } from '@/content/trigonometri'

/**
 * Perender penjelasan bertahap.
 *
 * Bentuknya sengaja beragam — paragraf pendek, daftar poin, kalimat sorot,
 * kotak contoh — supaya mata bisa memindai, bukan menghadapi tembok teks.
 * (Permintaan ARYA 31 Agu: "jangan seperti cerpen, kasih bullet, poin penting".)
 *
 * Butir daftar boleh ditulis "Label — isi"; bagian sebelum tanda pisah panjang
 * akan ditebalkan otomatis.
 */
export default function Penjelasan({ blok }: { blok: Blok[] }) {
  return (
    <div className="bacaan">
      {blok.map((b, i) => {
        if (b.jenis === 'paragraf') return <p key={i}>{b.teks}</p>

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
                  const pisah = teks.indexOf(' — ')
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
