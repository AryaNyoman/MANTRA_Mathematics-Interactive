import type { Metadata } from 'next'
import Image from 'next/image'
import Panggung from '@/components/mantra/Panggung'
import Kaki from '@/components/mantra/Kaki'

export const metadata: Metadata = {
  title: 'Tentang | MANTRA',
  description:
    'MANTRA, Matematika Interaktif: situs belajar matematika SMA yang menggabungkan animasi penjelas dengan alat yang bisa dicoba sendiri.',
}

/** Nomor WhatsApp ARYA. Dipakai untuk tautan, TIDAK pernah ditampilkan. */
const WA = '6282247933752'

export default function Tentang() {
  return (
    <Panggung>
      <main className="mantra-lebar" style={{ paddingTop: 38 }}>
        {/* Judulnya MANTRA, bukan kalimat penjelas. Halaman ini berjudul
            "Tentang", jadi yang harus berdiri paling besar adalah nama yang
            sedang dijelaskan. Kalimat penjelasnya turun ke bawah nama sebagai
            anak judul. (Permintaan ARYA, 3 Sep 2026.) */}
        <div className="tentang-atas">
          <div>
            <div className="kicker">Tentang</div>
            <h1 className="judul-halaman judul-merk">MANTRA</h1>
            <p className="sub-italic" style={{ marginBottom: 18 }}>
              Matematika Interaktif, matematika yang bisa dilihat sebabnya.
            </p>
            <p>
              MANTRA adalah situs belajar matematika SMA yang menggabungkan
              animasi penjelas dengan alat yang bisa dicoba sendiri. Tujuannya
              memperkuat dan memperjelas pemahaman siswa tentang inti
              matematika itu sendiri: dari mana sebuah rumus datang, kenapa
              bentuknya begitu, dan kapan rumus itu boleh dipakai.
            </p>
            {/* Jumlah bab sengaja TIDAK disebut angkanya. Jumlahnya masih
                bertambah, dan kalimat yang menyebut angka akan basi diam-diam
                tanpa ada yang ingat memperbaikinya. */}
            <p>
              Isinya disusun per bab: tiap bab
              dipecah jadi sub-bab, tiap sub-bab berisi beberapa materi yang
              disajikan dengan bahasa sederhana dan mudah dipahami.
            </p>
          </div>
          {/* Lambang MANTRA, BUKAN cuplikan grafik sinus. Cuplikan animasi
              sudah tampil di beranda dan di tiap materi; di halaman yang
              menjelaskan nama situsnya, yang pantas berdiri di sini adalah
              lambangnya. Ditengahkan setinggi kolom penjelasan di sebelahnya
              lewat `align-self: center` di `.tentang-atas > .plat-merk`. */}
          <div className="plat-merk">
            <Image
              src="/mantra/mantra-penuh.png"
              alt="Lambang MANTRA, Matematika Interaktif"
              width={1592}
              height={485}
              priority
            />
          </div>
        </div>

        <div className="tajuk-baris">
          <h2>Dibuat dengan</h2>
          <span className="rel" />
        </div>
        <div className="kisi-alat">
          <article className="kartu-alat">
            <span className="plat-logo">
              <Image src="/mantra/logo-manim.png" alt="Manim" width={132} height={74} />
            </span>
            {/* Namanya ManimGL, BUKAN Manim Community. Sejak 2 Sep 2026
                proyek ini memakai ManimGL 1.7.2, pustaka yang ditulis dan
                dipakai sendiri oleh 3Blue1Brown. Menyebut nama yang keliru di
                halaman yang justru menjelaskan cara kerjanya adalah kesalahan
                yang paling mudah ditangkap pembaca yang paham. */}
            <div>
              <h3>ManimGL</h3>
              <p>
                Mesin animasi matematika yang ditulis dan dipakai sendiri oleh
                kanal 3Blue1Brown. Videonya bersuara dan bersubtitle Bahasa
                Indonesia, dan tiap rumus digambar dari langkah awalnya, bukan
                ditampilkan jadi.
              </p>
              {/* Tautan ke manim.community, permintaan ARYA 5 Sep 2026.
                  CATATAN: yang dipakai proyek ini ManimGL milik 3Blue1Brown
                  (github.com/3b1b/manim), bukan Manim Community. Keduanya
                  proyek berbeda dengan sejarah yang sama. ARYA mengetahui
                  bedanya dan tetap memilih tautan ini. */}
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
                dengan rujukan buku panduan guru matematika SMA dan diktat
                kalkulus. Juga menjawab pertanyaan siswa di Asisten Tanya,
                berpijak pada materi yang sedang dibaca.
              </p>
              <a href="https://claude.com/product/overview/" target="_blank" rel="noreferrer">
                claude.com →
              </a>
            </div>
          </article>
          {/* PENANDA UNTUK SESI BERIKUTNYA: sampai 5 Sep 2026 seluruh berkas
              narasi di `manim/narasi/*.json` masih mencatat `id-ID-ArdiNeural`,
              yaitu edge-tts milik Microsoft, BUKAN ElevenLabs. Kartu ini
              ditulis lebih dulu atas keputusan ARYA: ia akan mengganti suara
              videonya ke ElevenLabs, dan halaman Tentang dirapikan sekarang.
              Begitu video dirender ulang, kartu ini jadi benar apa adanya dan
              catatan ini boleh dihapus. */}
          <article className="kartu-alat">
            <span className="plat-logo">
              {/* Tulisan merek digambar sendiri dari huruf situs ini, bukan
                  berkas logo mereka: hasilnya tajam di layar mana pun dan
                  tidak ada berkas pihak lain yang perlu ikut disimpan. */}
              <span className="merk-elevenlabs" aria-hidden="true">
                <i />
                <i />
                ElevenLabs
              </span>
            </span>
            <div>
              <h3>ElevenLabs</h3>
              <p>
                Suara narasi Bahasa Indonesia di tiap video, supaya penjelasannya
                bisa diikuti sambil memperhatikan gambarnya, bukan sambil membaca
                teks di layar.
              </p>
              <a href="https://elevenlabs.io" target="_blank" rel="noreferrer">
                elevenlabs.io →
              </a>
            </div>
          </article>
        </div>

        {/* Lebarnya TIDAK dipatok. Kartu di atas dan di bawahnya melebar penuh;
            satu kotak yang berhenti di tengah terbaca sebagai kesalahan tata
            letak, bukan sebagai penekanan. */}
        <div className="kotak-emas" style={{ marginBottom: 24 }}>
          <b>Nilai di situs ini bukan penilaian resmi.</b>
          <p>
            Situs ini tidak memakai akun dan tidak memakai basis data. Semua
            kemajuan dan skor kuis tersimpan di peramban Anda sendiri dan tidak
            pernah dikirim ke mana pun. Gunakan sebagai alat belajar, bukan
            sebagai bukti nilai.
          </p>
        </div>

        <div className="kartu-penulis">
          <div>
            <Image
              src="/mantra/undiksha.png"
              alt="Universitas Pendidikan Ganesha"
              width={72}
              height={72}
              style={{ height: 56, width: 'auto' }}
            />
            <div>
              <div className="kicker" style={{ color: 'var(--tinta-50)' }}>Dibuat oleh</div>
              <p className="nama">Nyoman Arya Sejati</p>
              <p className="lembaga">Universitas Pendidikan Ganesha</p>
            </div>
          </div>
          <a
            className="tombol-wa-mantra"
            href={`https://wa.me/${WA}`}
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/mantra/logo-whatsapp.png" alt="" width={20} height={20} />
            Hubungi lewat WhatsApp
          </a>
        </div>

        <div style={{ height: 48 }} />
      </main>
      <Kaki />
    </Panggung>
  )
}
