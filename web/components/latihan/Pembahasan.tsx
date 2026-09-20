import type { SoalKuis } from '@/content/tipe'
import { hurufTampil, petakanHuruf } from '@/lib/acak-pilihan'
import GambarSoal from '@/components/latihan/gambar/GambarSoal'
import TeksMat from '@/components/latihan/TeksMat'

/**
 * Isi pembahasan satu soal, dipakai menu Latihan (panel samping) DAN halaman
 * hasil kuis bab (20 Sep 2026). Satu perender supaya gaya mathcyber1997
 * (langkah bernomor, gambar bantu di bawah kalimatnya, jebakan pengecoh)
 * tidak berbeda antara keduanya.
 *
 * `urut` adalah urutan tampilan pilihan (`urut[posisi] = indeks asli`), dari
 * lib/acak-pilihan.ts: huruf jawaban di teks pembahasan diterjemahkan
 * mengikutinya, jadi "(Jawaban C)" selalu menunjuk pilihan yang benar.
 *
 * Gambar soal TIDAK diulang di sini (ARYA 14 Sep 2026): yang tampil adalah
 * gambar BANTU milik langkah, misalnya bagan kuadran yang disorot atau
 * segitiga yang dicabut dari kubus.
 */
export default function Pembahasan({
  soal,
  urut,
  baru = false,
}: {
  soal: SoalKuis
  urut: number[]
  /** benar bila pembahasan ini baru saja dibuka: naik masuk sebagai hadiah */
  baru?: boolean
}) {
  return (
    <div className="bahas-isi" data-baru={baru}>
      <div className="bahas-jawab">
        Jawaban benar: <b>{hurufTampil(urut, soal.benar)}</b>
      </div>
      {soal.langkah && soal.langkah.length > 0 ? (
        soal.langkah.map((lg, i) => {
          const teks = typeof lg === 'string' ? lg : lg.teks
          const gambar = typeof lg === 'string' ? undefined : lg.gambar
          return (
            <div key={i} className="bahas-langkah">
              <span className="no angka-rata">{i + 1}</span>
              <div className="isi">
                <span><TeksMat teks={petakanHuruf(teks, urut)} /></span>
                {gambar && <GambarSoal gambar={gambar} />}
              </div>
            </div>
          )
        })
      ) : (
        <p className="bahas-alasan"><TeksMat teks={petakanHuruf(soal.alasan, urut)} /></p>
      )}
      {soal.jebakan && (
        <div className="bahas-jebakan">
          <div className="kicker">Kenapa pilihan lain menggoda</div>
          <p><TeksMat teks={petakanHuruf(soal.jebakan, urut)} /></p>
        </div>
      )}
    </div>
  )
}
