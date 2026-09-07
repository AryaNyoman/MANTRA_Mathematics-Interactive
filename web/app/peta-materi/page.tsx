import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Kaki from '@/components/mantra/Kaki'
import PetaMateri, { type BabTampil } from '@/components/mantra/PetaMateri'
import { BAB, BAB_SEGERA } from '@/content/subbab'
import { ISI_TOPIK } from '@/content/daftar-isi'
import { cariTopik } from '@/content/topik'

export const metadata: Metadata = {
  title: 'Peta Materi | MANTRA',
  description:
    'Enam bab matematika SMA, tersusun mengikuti buku Kurikulum Merdeka: pilih bab, lalu sub-bab, lalu materinya.',
}

/**
 * Peta Materi: rute baru hasil perombakan 3 Sep 2026.
 *
 * Sebelumnya daftar bab menempel di beranda dan membuat halaman depan terbaca
 * seperti daftar isi. Sekarang beranda memperkenalkan, dan halaman ini yang
 * memetakan.
 *
 * Perakitan datanya dikerjakan di server: judul tiap materi diambil dari
 * `ISI_TOPIK`, pengelompokannya dari `content/subbab.ts`, lalu keduanya
 * disatukan jadi bentuk siap tampil. Yang dikirim ke peramban tinggal teks;
 * seluruh isi materi tidak ikut terbawa.
 */
export default function HalamanPetaMateri() {
  const bab: BabTampil[] = BAB.map((b) => {
    const isi = ISI_TOPIK[b.slug]
    const topik = cariTopik(b.slug)
    const tahap = isi?.tahap ?? []
    const judulDari = (n: number) => tahap[n - 1]?.judul ?? ''
    const nomorUrut = b.sub.flatMap((s) => s.nomor)

    return {
      slug: b.slug,
      no: b.no,
      kelas: b.kelas,
      urutanKelas: b.urutanKelas,
      sumber: b.sumber,
      nama: topik?.nama ?? b.slug,
      pertanyaan: topik?.pertanyaan ?? '',
      jumlahMateri: nomorUrut.length,
      slugTahap: nomorUrut.map((n) => tahap[n - 1]?.slug ?? String(n)),
      sub: b.sub.map((s) => ({
        huruf: s.huruf,
        nama: s.nama,
        jumlah: s.nomor.length,
        // Tiap materi dikirim sebagai butir tersendiri, BUKAN satu kalimat
        // gabungan. Itu yang membuat masing-masing bisa jadi tautan dan bisa
        // ditandai sudah dibuka atau belum.
        materi: s.nomor.map((n) => ({
          no: n,
          judul: judulDari(n),
          slug: tahap[n - 1]?.slug ?? String(n),
          siap: Boolean(tahap[n - 1]?.siap),
        })),
      })),
    }
  })

  return (
    <>
      <Nav />
      <main className="mantra-lebar" style={{ paddingTop: 38 }}>
        <div className="kicker">Peta Materi</div>
        <h1 className="judul-halaman">Pilih bab, lalu materinya. Kemajuanmu tercatat di sini.</h1>
        <p className="sub-italic">
          Susunan sub-bab mengikuti bab buku Kurikulum Merdeka. Kemajuan tersimpan
          di HP atau laptopmu sendiri, tanpa akun.
        </p>

        <PetaMateri bab={bab} />

        <div className="kartu-segera">
          <div>
            <div className="kicker" style={{ color: 'var(--tinta-50)' }}>
              Segera
            </div>
            <h3>Bab lain sedang disiapkan</h3>
            {/* Kalimat dimulai dengan huruf besar walau daftarnya ditulis
                huruf kecil di `subbab.ts`. Daftar itu dipakai juga di tengah
                kalimat lain, jadi yang menyesuaikan adalah tempat pemakaian,
                bukan datanya. */}
            <p>
              {BAB_SEGERA.slice(0, -1).join(', ').replace(/^./, (c) => c.toUpperCase())}, dan{' '}
              {BAB_SEGERA.at(-1)} menyusul dengan cara yang sama: animasi dulu, lalu
              alat yang bisa dicoba, lalu latihan.
            </p>
          </div>
          <span className="titik" aria-hidden="true">
            ···
          </span>
        </div>

        <div style={{ height: 40 }} />
      </main>
      <Kaki />
    </>
  )
}
