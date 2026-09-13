import type { Metadata } from 'next'
import type { GambarSoal as Data } from '@/content/tipe'
import { ISI_TOPIK } from '@/content/daftar-isi'
import GambarSoal from '@/components/latihan/gambar/GambarSoal'
import Nav from '@/components/Nav'
import Kaki from '@/components/mantra/Kaki'

export const metadata: Metadata = {
  title: 'Contoh gambar soal',
  robots: { index: false, follow: false },
}

/**
 * Halaman pemeriksaan gambar soal. Tidak ditautkan dari mana pun dan tidak
 * diindeks; gunanya supaya perender bisa dipotret Playwright dan dinilai
 * (13 Sep 2026).
 *
 *   /latihan/contoh-gambar                 satu contoh tiap jenis
 *   /latihan/contoh-gambar?bab=trigonometri semua gambar soal bab itu,
 *                                           berlabel id dan tingkatnya
 */
const CONTOH: { nama: string; gambar: Data }[] = [
  { nama: 'segitiga', gambar: { jenis: 'segitiga', sudut: 30, label: ['x', '12', '?'], namaSudut: '30°' } },
  { nama: 'lingkaran', gambar: { jenis: 'lingkaran', sudut: 150, label: '(cos 150°, sin 150°)' } },
  { nama: 'grafik', gambar: { jenis: 'grafik', fungsi: ['x*x - 4', '2*x - 1'], jangkauan: [-4, 5, -6, 8], titik: [{ x: 2, y: 0, label: '(2, 0)' }], nama: ['y = x² - 4', 'y = 2x - 1'] } },
  { nama: 'grafik limit', gambar: { jenis: 'grafik', fungsi: ['(x*x - 1)/(x - 1)'], jangkauan: [-3, 4, -2, 5], lubang: [{ x: 1, y: 2 }], tegak: [1] } },
  { nama: 'vektor', gambar: { jenis: 'vektor', panah: [{ ke: [3, 1], label: 'a' }, { dari: [3, 1], ke: [1, 2], label: 'b' }, { ke: [4, 3], label: 'a + b' }], komponen: [2] } },
  { nama: 'batang', gambar: { jenis: 'batang', kategori: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei'], nilai: [412, 418, 425, 421, 430], satuan: 'orang', mulai: 410, sorot: [4] } },
  { nama: 'garis data', gambar: { jenis: 'garis-data', kategori: ['1', '2', '3', '4', '5', '6'], nilai: [20, 44, 64, 78, 86, 90], satuan: 'barang' } },
  { nama: 'balok', gambar: { jenis: 'balok', ukuran: [6, 4, 3], ruas: [['A', 'G']], tambahan: [{ nama: 'P', di: [0.5, 0, 1] }], bidang: ['A', 'C', 'G', 'E'] } },
  { nama: 'bidang', gambar: { jenis: 'bidang', bangun: [[1, 1], [4, 1], [4, 3]], bayangan: [[-1, 1], [-4, 1], [-4, 3]], cermin: 'y', labelBangun: ['A', 'B', 'C'], labelBayangan: ["A'", "B'", "C'"] } },
  { nama: 'luas', gambar: { jenis: 'luas', fungsi: 'x*x', dari: 0, sampai: 3, persegi: 6 } },
  { nama: 'luas dua kurva', gambar: { jenis: 'luas', fungsi: '4 - x*x', dari: -2, sampai: 2, fungsi2: 'x*x - 4' } },
  { nama: 'svg bebas', gambar: { jenis: 'svg', viewBox: '0 0 460 200', isi: '<rect x="40" y="40" width="380" height="120" rx="12" fill="none" stroke="#3A6EA5" stroke-width="2"/><text x="230" y="108" text-anchor="middle" font-size="16" fill="#1F2430">svg bebas</text>' } },
]

export default async function Halaman({ searchParams }: { searchParams: Promise<{ bab?: string }> }) {
  const { bab } = await searchParams
  const isi = bab ? ISI_TOPIK[bab] : undefined
  const daftar = isi
    ? isi.kuis.filter((s) => s.gambar).map((s) => ({ nama: `${s.id} · ${s.tingkat}`, gambar: s.gambar! }))
    : CONTOH
  return (
    <>
      <Nav label="Contoh gambar soal" />
      <main className="mantra-lebar" style={{ paddingTop: 38 }}>
        <div className="kicker">Pemeriksaan</div>
        <h1 className="judul-halaman">
          {isi ? `Gambar soal ${bab}: ${daftar.length} dari ${isi.kuis.length} soal` : 'Contoh gambar soal, satu tiap jenis'}
        </h1>
        <div className="kisi-contoh-gambar">
          {daftar.map((c) => (
            <div key={c.nama} className="kartu-contoh-gambar">
              <div className="kicker">{c.nama}</div>
              <GambarSoal gambar={c.gambar} />
            </div>
          ))}
        </div>
      </main>
      <Kaki />
    </>
  )
}
