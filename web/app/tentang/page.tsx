import type { Metadata } from 'next'
import Image from 'next/image'
import Nav from '@/components/Nav'
import { TOPIK } from '@/content/topik'

export const metadata: Metadata = {
  title: 'Tentang | MATRA',
  description: 'Apa itu MATRA, siapa yang membuatnya, dan dengan alat apa dibuatnya.',
}

const WA = '6282247933752'

/**
 * Halaman /tentang.
 *
 * Sama seperti /latihan, tautannya sudah ada di navigasi sejak awal tetapi
 * halamannya tidak pernah dibuat, jadi menekannya berujung 404.
 *
 * Isinya sengaja memuat juga hal-hal yang TIDAK bisa dilakukan situs ini.
 * Halaman "tentang" yang hanya memuji diri sendiri tidak menolong siapa pun,
 * apalagi kalau nanti dibaca dosen.
 */
export default function Tentang() {
  const siap = TOPIK.filter((t) => t.siap).length

  return (
    <>
      <Nav label="Tentang" />
      <main className="beranda">
        <div className="jalur">Tentang</div>
        <h1>Matematika yang bisa dilihat sebabnya</h1>
        <p className="sub" style={{ maxWidth: '46rem' }}>
          MATRA adalah situs belajar matematika SMA yang menggabungkan animasi
          penjelas dengan alat yang bisa dicoba sendiri. Dibuat untuk siswa yang
          sudah bisa memakai rumus tetapi belum pernah diperlihatkan dari mana
          rumus itu datang.
        </p>

        <section className="isi-situs">
          <h2 className="isi-tajuk">Bagaimana dibuatnya</h2>
          <div className="kisi-isi">
            <article className="kartu-isi">
              <span className="kartu-no mono">01</span>
              <h3>Animasi</h3>
              <p>
                Dibuat memakai Manim, alat animasi matematika yang sama dengan
                yang dipakai kanal 3Blue1Brown. Setiap video dirender pada
                1080p 60 fps, bersuara, dan bersubtitle Bahasa Indonesia.
              </p>
            </article>
            <article className="kartu-isi">
              <span className="kartu-no mono">02</span>
              <h3>Alat interaktif</h3>
              <p>
                Ditulis sendiri sebagai gambar vektor, bukan memakai pustaka
                pihak ketiga, supaya warnanya bisa dijaga sama persis dengan
                warna yang dipakai di dalam animasinya.
              </p>
            </article>
            <article className="kartu-isi">
              <span className="kartu-no mono">03</span>
              <h3>Bahan rujukan</h3>
              <p>
                Buku Panduan Guru Kurikulum Merdeka dan diktat kalkulus dipakai
                untuk menjaga ketepatan istilah. Soalnya ditulis sendiri, dan
                soal salinan selalu disertai sumbernya.
              </p>
            </article>
          </div>
        </section>

        <section className="isi-situs">
          <h2 className="isi-tajuk">Yang perlu Anda tahu</h2>
          <div className="miskon" style={{ maxWidth: '52rem' }}>
            <b>Nilai di situs ini bukan penilaian resmi.</b>
            <p style={{ margin: '8px 0 0' }}>
              Situs ini tidak memakai akun dan tidak memakai basis data. Semua
              kemajuan, skor kuis, dan lencana tersimpan di peramban Anda
              sendiri dan tidak pernah dikirim ke mana pun. Karena itu ia akan
              hilang kalau Anda berganti perangkat atau membersihkan riwayat,
              dan siapa pun yang memakai perangkat itu bisa menghapusnya.
              Gunakan sebagai alat belajar, bukan sebagai bukti nilai.
            </p>
          </div>
          <p className="catatan" style={{ marginTop: 16 }}>
            Dari enam topik yang direncanakan, {siap} sudah bisa dipakai penuh.
            Sisanya sedang dikerjakan dan ditandai terus terang di halaman depan.
          </p>
        </section>

        <section className="isi-situs">
          <h2 className="isi-tajuk">Pembuat</h2>
          <div className="tentang-pembuat">
            <Image src="/merek/undiksha.png" alt="Universitas Pendidikan Ganesha"
                   width={72} height={71} />
            <div>
              <p style={{ margin: 0, fontSize: 17 }}>
                <b>Nyoman Arya Sejati</b>
              </p>
              <p style={{ margin: '4px 0 12px', color: 'var(--redup)' }}>
                Universitas Pendidikan Ganesha
              </p>
              <a
                className="tombol garis"
                style={{ width: 'auto', display: 'inline-block' }}
                href={`https://wa.me/${WA}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                HUBUNGI LEWAT WHATSAPP
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
