import Link from 'next/link'
import Nav from '@/components/Nav'
import Kaki from '@/components/mantra/Kaki'

/**
 * Halaman 404 MANTRA v2.
 * Patokan: `docs/desain-mantra/MANTRA-v2.dc.html` baris 548 sampai 561.
 *
 * Gambarnya grafik tangen yang putus di 90 derajat, dan kalimatnya memakai
 * kejadian itu: "Seperti tan 90°, halaman ini tidak terdefinisi." Halaman
 * salah alamat adalah tempat paling murah untuk memakai matematika sebagai
 * lelucon, dan orang yang tersesat lebih mudah dibujuk kembali oleh sesuatu
 * yang membuatnya tersenyum daripada oleh permintaan maaf.
 *
 * Sampai 4 Sep 2026 berkas ini tidak ada, jadi alamat yang salah dijawab
 * halaman bawaan Next yang tidak bernav, tidak berkaki, dan berbahasa
 * Inggris.
 */
export default function TidakDitemukan() {
  return (
    <>
      <Nav />
      <main className="mantra galat-404">
        <div className="galat-isi">
          <svg viewBox="0 0 320 120" aria-hidden="true" className="galat-grafik">
            <line x1="0" y1="100" x2="320" y2="100" stroke="rgba(16,26,43,.3)" />
            <line x1="160" y1="0" x2="160" y2="120" stroke="#E8582C" strokeDasharray="4 5" strokeOpacity={0.7} />
            <path
              pathLength={400}
              strokeDasharray={400}
              strokeDashoffset={400}
              style={{ animation: 'gambar 1600ms var(--kurva) 200ms both' }}
              d="M20 96 C 80 92 120 80 150 8"
              fill="none"
              stroke="#B08A3E"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            <path
              pathLength={400}
              strokeDasharray={400}
              strokeDashoffset={400}
              style={{ animation: 'gambar 1600ms var(--kurva) 700ms both' }}
              d="M170 112 C 200 40 240 30 300 22"
              fill="none"
              stroke="#B08A3E"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
            <text
              x="168"
              y="14"
              fontSize="11"
              fill="#E8582C"
              style={{ animation: 'muncul 400ms 1.8s both' }}
            >
              x = 90°
            </text>
          </svg>
          <div className="galat-angka">404</div>
          <h1>Seperti tan 90°, halaman ini tidak terdefinisi.</h1>
          <p>
            Alamatnya mungkin salah ketik, atau materinya sudah pindah. Yang pasti
            ada: peta lengkapnya.
          </p>
          <div className="galat-aksi">
            <Link href="/peta-materi" className="pil-emas">
              Buka Peta Materi
            </Link>
            <Link href="/" className="pil-garis">
              Ke beranda
            </Link>
          </div>
        </div>
      </main>
      <Kaki />
    </>
  )
}
