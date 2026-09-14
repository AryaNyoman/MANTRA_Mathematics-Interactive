/**
 * Tabel data untuk soal dan pembahasan statistika (14 Sep 2026). Dibuat
 * sebagai tabel HTML, bukan SVG: isinya teks, jadi biarkan peramban yang
 * mengatur lebar kolom dan pemenggalan. Baris yang dibahas (kelas median,
 * kelas modus) disorot; kolom hasil hitungan (frekuensi kumulatif, f·x)
 * diberi warna lain supaya terlihat mana yang datang dari soal dan mana
 * yang ditambahkan pembahasan.
 */
export default function Tabel({
  kepala, baris, sorot = [], kolomBaru = [], jumlah,
}: {
  kepala: string[]
  baris: string[][]
  sorot?: number[]
  kolomBaru?: number[]
  jumlah?: string[]
}) {
  return (
    <div className="tabel-soal-bungkus">
      <table className="tabel-soal">
        <thead>
          <tr>
            {kepala.map((k, j) => (
              <th key={j} className={kolomBaru.includes(j) ? 'baru' : undefined}>{k}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {baris.map((b, i) => (
            <tr key={i} className={sorot.includes(i) ? 'sorot' : undefined}>
              {b.map((sel, j) => (
                <td key={j} className={kolomBaru.includes(j) ? 'baru' : undefined}>{sel}</td>
              ))}
            </tr>
          ))}
          {jumlah && (
            <tr className="jumlah">
              {jumlah.map((sel, j) => (
                <td key={j} className={kolomBaru.includes(j) ? 'baru' : undefined}>{sel}</td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
