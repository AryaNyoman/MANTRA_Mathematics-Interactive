import Link from 'next/link'
import Panggung from '@/components/mantra/Panggung'
import Kaki from '@/components/mantra/Kaki'
import GrafikTan from '@/components/mantra/GrafikTan'

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
 * Inggris. Grafiknya di `components/mantra/GrafikTan.tsx` (komponen klien:
 * mengunci gambarnya sesudah 2,2 detik supaya tidak diulang).
 */
export default function TidakDitemukan() {
  return (
    <Panggung>
      <main className="mantra galat-404">
        <div className="galat-isi">
          <GrafikTan />
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
    </Panggung>
  )
}
