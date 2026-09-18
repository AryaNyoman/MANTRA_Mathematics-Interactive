import Link from 'next/link'
import Image from 'next/image'
import Panggung from '@/components/mantra/Panggung'
import Demo from '@/components/Demo'
import TombolPasang from '@/components/TombolPasang'
import PitaKurva from '@/components/mantra/PitaKurva'
import KartuBayang from '@/components/mantra/KartuBayang'
import MunculSaatGulir from '@/components/mantra/MunculSaatGulir'
import Kaki from '@/components/mantra/Kaki'

/**
 * Beranda MANTRA v2, arah "Panggung Sinema" (4 Sep 2026).
 * Patokan: `docs/desain-mantra/MANTRA-v2.dc.html` baris 84 sampai 178.
 *
 * Tugas halaman ini BUKAN mendaftar materi, melainkan menjelaskan tempat ini
 * apa, bisa apa, dibangun dengan apa, lalu mengantar siswa ke Peta Materi.
 * Daftar bab punya rutenya sendiri, `/peta-materi`.
 *
 * Susunannya sekarang panggung, bukan dokumen: hero navy yang berakhir pada
 * kurva, lalu kotak korsel yang MENGGANTUNG menembus batas navy ke kertas.
 * Tumpang tindih itu yang membuat halaman terasa punya kedalaman tanpa satu
 * pun bayangan berwarna atau gradasi.
 *
 * Sapaan di halaman ini "kamu". "Anda" hanya dipakai di halaman Tentang,
 * yang pembacanya bukan siswa melainkan orang yang menilai proyek ini.
 *
 * Kaki halaman sengaja berbahasa Inggris, permintaan ARYA.
 */

const FITUR = [
  {
    no: '01',
    kelas: 'sorot-animasi',
    judul: 'Animasi yang menjelaskan sebabnya',
    isi: 'Rumus tidak disodorkan. Kamu menonton asal-usulnya sampai masuk akal.',
    tunda: 0,
  },
  {
    no: '02',
    kelas: 'sorot-visual',
    judul: 'Alat yang bisa dicoba',
    isi: 'Geser sudutnya, angkanya berubah saat itu juga. Uji sendiri sampai yakin.',
    tunda: 90,
  },
  {
    no: '03',
    kelas: 'sorot-interaksi',
    judul: 'Latihan dan kuis berjenjang',
    isi: 'Empat tingkat, pembahasan bertahap, kemajuan tersimpan di HP-mu.',
    tunda: 180,
  },
] as const

export default function Beranda() {
  return (
    <Panggung>
      <main>
        <header className="hero">
          <div className="hero-isi">
            <span className="hero-lencana naik">Matematika SMA · Kelas 10 sampai 12</span>
            <Image
              src="/mantra/mantra-penuh-gelap.png"
              alt="MANTRA, Matematika Interaktif"
              width={1592}
              height={485}
              priority
              className="hero-logo naik naik-1"
            />
            <h1 className="naik naik-2">
              Matematika tidak hanya dipelajari.
              <br />
              <i>Matematika bisa dijelajahi.</i>
            </h1>
            <p className="hero-sub naik naik-3">
              Setiap rumus dijelaskan lewat <b className="sorot-animasi">animasi</b>,
              dibuktikan lewat <b className="sorot-visual">visualisasi</b>, dan diuji
              sendiri lewat <b className="sorot-interaksi">interaksi</b>. Kamu melihat
              cara kerjanya, bukan hanya menghafalnya.
            </p>
            <div className="hero-aksi naik naik-4">
              <Link href="/peta-materi" className="pil-emas">
                Mulai dari Kelas 10
              </Link>
              <TombolPasang />
            </div>
          </div>
          <PitaKurva />
        </header>

        {/* Korsel digantung menembus batas hero. Angka negatifnya ikut lebar
            layar supaya tumpang tindihnya tetap seimbang di HP maupun di
            layar lebar. */}
        <section className="mantra demo-wadah" aria-label="Cuplikan isi situs">
          <Demo />
        </section>

        <section className="mantra bagian-beranda" aria-labelledby="fitur-unggulan">
          {/* Judul ini TIDAK ada di prototipe rancangan, yang hanya memberi
              seksi ini `aria-label`. Sengaja dipertahankan: pada 3 Sep 2026
              ARYA menemukan tiga kartu ini muncul tanpa keterangan apa pun
              dan memintanya diberi judul. Menghapusnya lagi berarti
              mengulang kembali keluhan yang sudah pernah diperbaiki. */}
          <div className="tajuk-baris">
            <h2 id="fitur-unggulan">Tiga hal yang kamu dapat di sini</h2>
            <span className="rel" />
            <span className="kanan">Fitur unggulan</span>
          </div>
          <div className="kisi-tiga">
            {FITUR.map((f) => (
              <MunculSaatGulir key={f.no} tunda={f.tunda}>
                <KartuBayang className="kartu-fitur">
                  <div className={`no ${f.kelas}`}>{f.no}</div>
                  <h3>{f.judul}</h3>
                  <p>{f.isi}</p>
                </KartuBayang>
              </MunculSaatGulir>
            ))}
          </div>
        </section>

        {/* Jumlah bab sengaja tidak disebut angkanya (ARYA 18 Sep 2026:
            "tujuh bab" sudah basi, sekarang sembilan dan masih bisa bertambah). */}
        <section className="mantra bagian-beranda akhir" aria-label="Ajakan ke Peta Materi">
          <MunculSaatGulir>
            <div className="ajakan">
              <div>
                <h2>Bab demi bab, tersusun seperti buku</h2>
                <p>
                  Tiap bab dipecah jadi sub-bab, tiap sub-bab berisi beberapa materi.
                  Peta lengkapnya beserta kemajuanmu ada di Peta Materi.
                </p>
              </div>
              <Link href="/peta-materi" className="pil-gelap">
                Buka Peta Materi →
              </Link>
            </div>
          </MunculSaatGulir>
        </section>
      </main>
      <Kaki />
    </Panggung>
  )
}
