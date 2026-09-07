'use client'

/**
 * Widget Materi 04: mencocokkan fungsi dengan antiturunannya.
 *
 * APA YANG DIAJARKAN
 * Bahwa tiap tebakan diperiksa dengan satu cara saja: turunkan lagi. Kartu yang
 * salah tidak sekadar ditolak; panel menuliskan TURUNAN dari kartu yang
 * dipilih, sehingga siswa melihat sendiri selisihnya. Kekeliruan yang paling
 * sering, yaitu memasang tanda minus pada kosinus, karena itu terkoreksi oleh
 * hitungannya sendiri, bukan oleh tanda silang.
 *
 * KENAPA TANPA SERET
 * Rancangan meminta permainan mencocokkan tanpa seret. Alasannya praktis:
 * enam kartu yang diseret di layar selebar 375 piksel akan saling menimpa, dan
 * yang sedang diuji pengetahuannya, bukan ketangkasan jarinya. Pemilihannya
 * memakai kendali bersama `Pilihan`, sama seperti widget lain di topik ini.
 *
 * SELURUH PASANGANNYA DIPERIKSA sympy lewat `alat/materi-integral.json`:
 * m04-sin, m04-cos, m04-sec-kuadrat, m04-eksponen, m04-pasangan-x-kuadrat,
 * dan m04-pasangan-x-pangkat-min2.
 */

export type Kartu = {
  nilai: string
  /** fungsi yang dicari antiturunannya */
  fungsi: string
  /** nilai kartu antiturunan yang benar */
  benar: string
}

export type KartuAnti = {
  nilai: string
  label: string
  /** turunan kartu ini, dipakai mesin untuk memeriksa tebakan */
  turunan: string
}

export const KIRI: Kartu[] = [
  { nilai: 'sin', fungsi: 'sin x', benar: 'min-cos' },
  { nilai: 'cos', fungsi: 'cos x', benar: 'sin' },
  { nilai: 'exp', fungsi: 'eˣ', benar: 'exp' },
  { nilai: 'x2', fungsi: 'x²', benar: 'x3-per-3' },
  { nilai: 'sec2', fungsi: 'sec² x', benar: 'tan' },
  { nilai: 'x-min2', fungsi: '1/x²', benar: 'min-1-per-x' },
]

export const KANAN: KartuAnti[] = [
  { nilai: 'min-cos', label: '-cos x', turunan: 'sin x' },
  { nilai: 'sin', label: 'sin x', turunan: 'cos x' },
  { nilai: 'exp', label: 'eˣ', turunan: 'eˣ' },
  { nilai: 'x3-per-3', label: 'x³ / 3', turunan: 'x²' },
  { nilai: 'tan', label: 'tan x', turunan: 'sec² x' },
  { nilai: 'min-1-per-x', label: '-1/x', turunan: '1/x²' },
]

export const AWAL = { kartu: 'sin', pilih: '' }

export type Jawaban = Record<string, string>

export function antiDari(nilai: string): KartuAnti | undefined {
  return KANAN.find((k) => k.nilai === nilai)
}

export default function PasangkanTurunanIntegral({
  kartu, jawaban,
}: {
  /** kartu kiri yang sedang disorot */
  kartu: string
  /** pasangan yang sudah dipilih siswa, kartu kiri ke kartu kanan */
  jawaban: Jawaban
}) {
  const benarSemua = KIRI.every((k) => jawaban[k.nilai] === k.benar)
  const sudahDijawab = KIRI.filter((k) => jawaban[k.nilai]).length

  return (
    <div className="bongkar">
      <div className="bongkar-atas">
        <div className="bongkar-soal">pasangkan tiap fungsi dengan antiturunannya</div>
        <div className="bongkar-cara">
          tiap tebakan diperiksa dengan satu cara saja: turunkan lagi
        </div>
      </div>

      <ol className="bongkar-baris">
        {KIRI.map((k) => {
          const dipilih = jawaban[k.nilai]
          const anti = dipilih ? antiDari(dipilih) : undefined
          const cocok = dipilih === k.benar
          const disorot = k.nilai === kartu
          return (
            <li key={k.nilai} className={disorot ? 'nyala' : undefined}>
              <span className="bongkar-nama">{k.fungsi}</span>
              <span className="bongkar-teks">
                {anti ? anti.label : 'belum dipasangkan'}
              </span>
              {anti && (
                <span className="bongkar-syarat">
                  {cocok
                    ? `cocok: turunan ${anti.label} adalah ${anti.turunan}`
                    : `belum cocok: turunan ${anti.label} adalah ${anti.turunan}, bukan ${k.fungsi}`}
                </span>
              )}
            </li>
          )
        })}
      </ol>

      {benarSemua ? (
        <div className="mesin-selesai" role="status">
          <b>Keenamnya cocok.</b> Semuanya diperiksa dengan cara yang sama:
          turunkan hasilnya, lalu lihat apakah kembali ke fungsi semula.
        </div>
      ) : (
        <div className="bongkar-sisa">
          sudah dipasangkan {sudahDijawab} dari {KIRI.length}. Yang belum cocok masih
          menunjukkan turunannya, jadi selisihnya bisa dibaca sendiri.
        </div>
      )}
    </div>
  )
}
