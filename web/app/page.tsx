import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Demo from '@/components/Demo'
import TombolPasang from '@/components/TombolPasang'
import { TOPIK } from '@/content/topik'

/** Nomor WhatsApp ARYA, dipakai untuk tautan wa.me (tanpa 0 di depan, +62). */
const WA = '6282247933752'

export default function Beranda() {
  return (
    <>
      <Nav />
      <main className="beranda">
        <header className="sambutan">
          <Image
            src="/merek/matra-penuh.png"
            alt="MATRA, Matematika Interaktif"
            width={680}
            height={205}
            priority
            className="merek-besar"
          />
          <h1>
            Bukan menghafal rumus.
            <br />
            Melihat kenapa rumusnya begitu.
          </h1>
          <p className="sub">
            Tiap materi dimulai dari animasi yang menjelaskan sebabnya, lalu alat
            yang bisa Anda geser sendiri, supaya bedanya terasa bukan sekadar
            dibaca.
          </p>
          <div className="sambutan-aksi">
            <a href="#materi" className="tombol-utama">Mulai dari Kelas 10</a>
            <TombolPasang />
          </div>
        </header>

        <Demo />

        <section className="isi-situs" aria-label="Apa saja isi situs ini">
          <h2 className="tajuk-sesi">Apa saja isinya</h2>
          <div className="kisi-isi">
            <div>
              <div className="cap">Animasi</div>
              <p>
                Video pendek yang menurunkan rumus dari awal, dengan suara dan
                teks terjemahan. Dibuat memakai Manim, alat animasi matematika
                yang sama dengan yang dipakai 3Blue1Brown.
              </p>
            </div>
            <div>
              <div className="cap">Alat yang bisa dicoba</div>
              <p>
                Segitiga yang bisa ditarik, sudut yang bisa digeser, dan angka
                yang berubah seketika. Anda menguji sendiri, bukan percaya pada
                kalimat di buku.
              </p>
            </div>
            <div>
              <div className="cap">Latihan dan kuis</div>
              <p>
                Soal berjenjang dengan pembahasan langkah demi langkah, lalu kuis
                berskor yang tersimpan di peramban Anda sendiri. Tanpa akun,
                tanpa mendaftar.
              </p>
            </div>
          </div>
        </section>

        <section id="materi" aria-label="Daftar materi">
          <h2 className="tajuk-sesi">Materi</h2>
          <div className="kisi">
            {TOPIK.map((t) => (
              <Link
                key={t.slug}
                href={`/topik/${t.slug}`}
                className="kartu-topik"
                data-siap={t.siap}
              >
                <div className="jalur">{t.kelas}</div>
                <h2>{t.nama}</h2>
                <p>{t.pertanyaan}</p>
                <p style={{ marginTop: 10, fontStyle: 'italic' }}>
                  Melawan: {t.miskonsepsiSingkat}
                </p>
                {!t.siap && <span className="belum">belum dibangun</span>}
              </Link>
            ))}
          </div>
        </section>

        <footer className="kaki">
          <div className="kaki-kiri">
            <p className="kaki-nama">Dibuat oleh Nyoman Arya Sejati</p>
            <p className="kaki-kecil">
              Dibangun dengan <b>Manim</b> dan <b>Claude</b>, memakai Next.js.
            </p>
            <a
              className="tombol-wa"
              href={`https://wa.me/${WA}`}
              target="_blank"
              rel="noreferrer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.23 8.23 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
              </svg>
              082247933752
            </a>
          </div>

          <div className="kaki-kanan">
            <Image
              src="/merek/undiksha.png"
              alt="Universitas Pendidikan Ganesha"
              width={44}
              height={44}
            />
            <span className="kaki-kecil">
              Universitas Pendidikan Ganesha
            </span>
          </div>
        </footer>
      </main>
    </>
  )
}
