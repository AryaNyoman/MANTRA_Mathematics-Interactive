import type { Metadata } from 'next'
import Image from 'next/image'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Tentang | MANTRA',
  description:
    'MANTRA, Matematika Interaktif: situs belajar matematika SMA yang menggabungkan animasi penjelas dengan alat yang bisa dicoba sendiri.',
}

/** Nomor WhatsApp ARYA. Dipakai untuk tautan, TIDAK pernah ditampilkan. */
const WA = '6282247933752'

export default function Tentang() {
  return (
    <>
      <Nav />
      <main className="mantra-lebar" style={{ paddingTop: 38 }}>
        <div className="tentang-atas">
          <div>
            <div className="kicker">Tentang</div>
            <h1 className="judul-halaman">Matematika yang bisa dilihat sebabnya</h1>
            <p>
              MANTRA, Matematika Interaktif, adalah situs belajar matematika SMA
              yang menggabungkan animasi penjelas dengan alat yang bisa dicoba
              sendiri. Dibuat untuk siswa yang sudah bisa memakai rumus tetapi
              belum pernah diperlihatkan dari mana rumus itu datang.
            </p>
            <p>
              Isinya disusun mengikuti bab buku Kurikulum Merdeka: enam bab,
              masing-masing dipecah jadi sub-bab dan materi. Bahasanya bahasa
              SMA, bukan bahasa diktat.
            </p>
          </div>
          <div className="plat">
            <Image
              src="/mantra/tahap8-grafik-sin.jpg"
              alt="Cuplikan animasi grafik sinus"
              width={960}
              height={540}
            />
          </div>
        </div>

        <div className="tajuk-baris">
          <h2>Dibuat dengan</h2>
          <span className="rel" />
        </div>
        <div className="kisi-dua" style={{ marginBottom: 20 }}>
          <article className="kartu-alat">
            <span className="plat-logo">
              <Image src="/mantra/logo-manim.png" alt="Manim Community" width={132} height={74} />
            </span>
            <div>
              <h3>Manim Community</h3>
              <p>
                Mesin animasi matematika yang dipakai kanal 3Blue1Brown. Setiap
                video dirender 1080p 60 fps, bersuara, dan bersubtitle Bahasa
                Indonesia.
              </p>
              <a href="https://www.manim.community/" target="_blank" rel="noreferrer">
                manim.community →
              </a>
            </div>
          </article>
          <article className="kartu-alat">
            <span className="plat-logo">
              <Image src="/mantra/logo-claude.png" alt="Claude by Anthropic" width={132} height={74} />
            </span>
            <div>
              <h3>Claude</h3>
              <p>
                Dipakai menyusun kode animasi, alat interaktif, dan naskah materi,
                dengan rujukan Buku Panduan Guru Kurikulum Merdeka dan diktat
                kalkulus.
              </p>
              <a href="https://claude.com/product/overview/" target="_blank" rel="noreferrer">
                claude.com →
              </a>
            </div>
          </article>
        </div>

        <div className="kotak-emas" style={{ maxWidth: '56rem', marginBottom: 24 }}>
          <b>Nilai di situs ini bukan penilaian resmi.</b>
          <p>
            Situs ini tidak memakai akun dan tidak memakai basis data. Semua
            kemajuan dan skor kuis tersimpan di peramban Anda sendiri dan tidak
            pernah dikirim ke mana pun. Gunakan sebagai alat belajar, bukan
            sebagai bukti nilai.
          </p>
        </div>

        <div className="kartu-penulis">
          <Image
            src="/mantra/undiksha.png"
            alt="Universitas Pendidikan Ganesha"
            width={72}
            height={72}
            style={{ height: 72, width: 'auto' }}
          />
          <div>
            <p className="nama">Nyoman Arya Sejati</p>
            <p className="lembaga">Universitas Pendidikan Ganesha</p>
            <a
              className="tombol-wa-mantra"
              href={`https://wa.me/${WA}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image src="/mantra/logo-whatsapp.png" alt="" width={20} height={20} />
              Hubungi WhatsApp
            </a>
          </div>
        </div>

        <div style={{ height: 48 }} />
      </main>
    </>
  )
}
