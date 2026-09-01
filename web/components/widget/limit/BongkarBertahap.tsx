'use client'

/**
 * Widget "Bongkar Bertahap", Limit tahap 6.
 *
 * Pemecahan soal 0 dibagi 0, dibuka selangkah demi selangkah. Tiap baris diberi
 * NAMA caranya, dan langkah pencoretan selalu menyertakan syarat yang membuatnya
 * sah.
 *
 * Syarat itu ditampilkan mencolok dengan sengaja. Mencoret (x - 2) terasa
 * seperti aturan aljabar biasa sehingga syaratnya mudah dilupakan, padahal
 * syarat itulah satu-satunya alasan fungsi asli dan fungsi hasil coretan boleh
 * dianggap sama.
 */

export type Baris = {
  /** isi barisnya */
  teks: string
  /** nama langkahnya, ditulis di kolom kiri */
  nama: string
  /** syarat yang membuat langkah itu sah, ditulis mencolok */
  syarat?: string
}

export type SoalBongkar = {
  judul: string
  cara: string
  baris: Baris[]
  jawaban: string
}

export const SOAL_BONGKAR: SoalBongkar[] = [
  {
    judul: 'lim (x² - 4) : (x - 2)   saat x menuju 2',
    cara: 'memfaktorkan',
    baris: [
      { nama: 'coba masukkan', teks: '(4 - 4) : (2 - 2)  =  0 : 0' },
      { nama: 'artinya', teks: 'bentuk tak tentu, jadi bentuknya harus ditulis ulang' },
      { nama: 'faktorkan', teks: '(x - 2)(x + 2) : (x - 2)' },
      { nama: 'coret', teks: 'x + 2', syarat: 'sah karena x bukan 2, dan limit memang tidak pernah meletakkan x tepat di 2' },
      { nama: 'masukkan lagi', teks: '2 + 2  =  4' },
    ],
    jawaban: '4',
  },
  {
    judul: 'lim (√(x + 4) - 2) : x   saat x menuju 0',
    cara: 'mengalikan dengan sekawan',
    baris: [
      { nama: 'coba masukkan', teks: '(2 - 2) : 0  =  0 : 0' },
      { nama: 'sekawannya', teks: '√(x + 4) + 2' },
      { nama: 'kalikan', teks: '[(√(x + 4) - 2)(√(x + 4) + 2)] : [x · (√(x + 4) + 2)]' },
      { nama: 'atas jadi', teks: '(x + 4) - 4  =  x', syarat: 'inilah gunanya sekawan: akarnya hilang karena dikuadratkan' },
      { nama: 'coret', teks: '1 : (√(x + 4) + 2)', syarat: 'sah karena x bukan 0' },
      { nama: 'masukkan lagi', teks: '1 : (2 + 2)  =  1/4' },
    ],
    jawaban: '1/4 atau 0,25',
  },
  {
    judul: 'lim (x² - 1) : (x - 1)   saat x menuju 1',
    cara: 'memfaktorkan',
    baris: [
      { nama: 'coba masukkan', teks: '(1 - 1) : (1 - 1)  =  0 : 0' },
      { nama: 'faktorkan', teks: '(x - 1)(x + 1) : (x - 1)' },
      { nama: 'coret', teks: 'x + 1', syarat: 'sah karena x bukan 1. Inilah sebabnya grafiknya berlubang tepat di x = 1' },
      { nama: 'masukkan lagi', teks: '1 + 1  =  2' },
    ],
    jawaban: '2',
  },
]

export default function BongkarBertahap({ soal, langkah }: { soal: number; langkah: number }) {
  const s = SOAL_BONGKAR[Math.min(Math.max(soal, 0), SOAL_BONGKAR.length - 1)]
  const tampil = s.baris.slice(0, Math.min(langkah, s.baris.length))
  const selesai = langkah >= s.baris.length

  return (
    <div className="bongkar">
      <div className="bongkar-atas">
        <div className="bongkar-soal">{s.judul}</div>
        <div className="bongkar-cara">cara: {s.cara}</div>
      </div>

      <ol className="bongkar-baris">
        {tampil.map((b, i) => (
          <li key={i}>
            <span className="bongkar-nama">{b.nama}</span>
            <span className="bongkar-teks">{b.teks}</span>
            {b.syarat && <span className="bongkar-syarat">{b.syarat}</span>}
          </li>
        ))}
      </ol>

      {selesai ? (
        <div className="mesin-selesai" role="status">
          <b>Selesai.</b> Limitnya {s.jawaban}
        </div>
      ) : (
        <div className="bongkar-sisa">
          masih ada {s.baris.length - tampil.length} langkah lagi
        </div>
      )}
    </div>
  )
}
