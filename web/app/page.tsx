import Link from 'next/link'
import Nav from '@/components/Nav'
import Demo from '@/components/Demo'
import TombolPasang from '@/components/TombolPasang'
import PitaKurva from '@/components/mantra/PitaKurva'
import KartuBayang from '@/components/mantra/KartuBayang'
import LogoParalaks from '@/components/mantra/LogoParalaks'
import Kaki from '@/components/mantra/Kaki'

/**
 * Beranda MANTRA (rancangan 3 Sep 2026).
 *
 * Tugas halaman ini BUKAN mendaftar materi, melainkan menjelaskan tempat ini
 * apa, bisa apa, dibangun dengan apa, lalu mengantar siswa ke Peta Materi.
 * Daftar bab pindah ke rutenya sendiri, `/peta-materi`. Sebelumnya daftar itu
 * ada di sini dan membuat halaman depan terbaca seperti daftar isi, bukan
 * perkenalan.
 *
 * Kaki halaman sengaja berbahasa Inggris, permintaan ARYA.
 */

const ISI_SITUS = [
  {
    no: '01',
    kelas: 'sorot-animasi',
    judul: 'Animasi',
    isi: 'Video pendek yang menurunkan rumus dari awal, bersuara dan bersubtitle Bahasa Indonesia. Dibuat memakai Manim, alat yang sama dengan yang dipakai 3Blue1Brown.',
  },
  {
    no: '02',
    kelas: 'sorot-visual',
    judul: 'Alat yang bisa dicoba',
    isi: 'Segitiga yang bisa ditarik, sudut yang bisa digeser, dan angka yang berubah seketika. Anda menguji sendiri, bukan percaya pada kalimat di buku.',
  },
  {
    no: '03',
    kelas: 'sorot-interaksi',
    judul: 'Latihan dan kuis',
    isi: 'Soal berjenjang dengan pembahasan langkah demi langkah, lalu kuis berskor yang tersimpan di peramban Anda sendiri. Tanpa akun, tanpa mendaftar.',
  },
] as const

export default function Beranda() {
  return (
    <>
      <Nav />
      <main>
        <header className="hero">
          <PitaKurva />
          <div className="hero-isi">
            <span className="hero-lencana naik">Matematika SMA · Kelas 10–12</span>
            <LogoParalaks />
            <h1 className="naik naik-2">
              <span>Matematika tidak hanya dipelajari</span>
              <i>Matematika bisa dijelajahi</i>
            </h1>
            <p className="hero-sub naik naik-3">
              Eksplorasi konsep matematika melalui{' '}
              <b className="sorot-animasi">animasi</b>,{' '}
              <b className="sorot-visual">visualisasi</b>, dan{' '}
              <b className="sorot-interaksi">interaksi</b>
              <br />
              yang membuat setiap rumus tidak hanya dipahami
              <br />
              tetapi dapat Anda lihat dan rasakan cara kerjanya
            </p>
            <div className="hero-aksi naik naik-4">
              <Link href="/peta-materi" className="pil-emas">
                Mulai dari Kelas 10
              </Link>
              <TombolPasang />
            </div>
          </div>
        </header>

        <section className="mantra" style={{ paddingTop: 44 }} aria-label="Cuplikan">
          <div className="garis-label">
            <span>Berganti sendiri</span>
          </div>
          <Demo />
        </section>

        <section className="mantra" style={{ paddingTop: 48 }} aria-labelledby="fitur-unggulan">
          {/* Judul ini sebelumnya tidak ada, jadi tiga kartu di bawah muncul
              tanpa keterangan apa pun (temuan ARYA, 3 Sep 2026). Label kanan
              memakai istilah yang ia usulkan, judulnya menyebutkan apa yang
              sebenarnya didapat siswa. */}
          <div className="tajuk-baris">
            <h2 id="fitur-unggulan">Tiga hal yang Anda dapat di sini</h2>
            <span className="rel" />
            <span className="kanan">Fitur unggulan</span>
          </div>
          <div className="kisi-tiga">
            {ISI_SITUS.map((i) => (
              <KartuBayang key={i.no} className="kartu-mantra kartu-fitur">
                <div className={`no ${i.kelas}`}>{i.no}</div>
                <h3>{i.judul}</h3>
                <p>{i.isi}</p>
              </KartuBayang>
            ))}
          </div>
        </section>

        <section className="mantra" style={{ paddingTop: 52 }}>
          <div className="ajakan">
            <div>
              <h2>Enam bab, tersusun seperti buku</h2>
              <p>
                Tiap bab dipecah jadi sub-bab, tiap sub-bab berisi beberapa materi.
                Peta lengkapnya beserta kemajuan Anda ada di tab Peta Materi.
              </p>
            </div>
            <Link href="/peta-materi" className="pil-gelap">
              Buka Peta Materi →
            </Link>
          </div>
        </section>
        <div style={{ height: 40 }} />
      </main>
      <Kaki />
    </>
  )
}
