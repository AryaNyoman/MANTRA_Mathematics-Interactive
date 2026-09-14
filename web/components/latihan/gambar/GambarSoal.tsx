import type { GambarSoal as Data } from '@/content/tipe'
import Segitiga from './Segitiga'
import SegitigaUmum from './SegitigaUmum'
import Lingkaran from './Lingkaran'
import Kuadran from './Kuadran'
import Grafik from './Grafik'
import Vektor from './Vektor'
import DiagramData from './DiagramData'
import Tabel from './Tabel'
import GarisBilangan from './GarisBilangan'
import Balok from './Balok'
import Bidang from './Bidang'
import Luas from './Luas'

/**
 * Pemilih perender gambar soal. Gambar soal adalah DATA (`GambarSoal` di
 * `content/tipe.ts`); komponen ini memetakan `jenis` ke perender SVG-nya.
 * Dibungkus `<figure class="gambar-soal">` yang lebarnya mengikuti wadah
 * dan tingginya dibatasi CSS, jadi gambar tidak pernah memotong dirinya.
 * Sejak 14 Sep 2026 dipakai juga untuk gambar BANTU tiap langkah
 * pembahasan (kuadran, segitiga-umum, tabel, garis-bilangan).
 */
export default function GambarSoal({ gambar, keterangan }: { gambar: Data; keterangan?: string }) {
  return (
    <figure className="gambar-soal" data-jenis={gambar.jenis}>
      {isi(gambar)}
      {keterangan && <figcaption>{keterangan}</figcaption>}
    </figure>
  )
}

function isi(g: Data) {
  switch (g.jenis) {
    case 'segitiga':
      return <Segitiga sudut={g.sudut} label={g.label} namaSudut={g.namaSudut} sorot={g.sorot} />
    case 'segitiga-umum':
      return <SegitigaUmum titik={g.titik} panjang={g.panjang} sisi={g.sisi} siku={g.siku} tinggi={g.tinggi} sorot={g.sorot} sudut={g.sudut} />
    case 'lingkaran':
      return <Lingkaran sudut={g.sudut} label={g.label} kaki={g.kaki} />
    case 'kuadran':
      return <Kuadran sorot={g.sorot} sudut={g.sudut} label={g.label} />
    case 'grafik':
      return <Grafik fungsi={g.fungsi} jangkauan={g.jangkauan} titik={g.titik} tegak={g.tegak} nama={g.nama} lubang={g.lubang} arsir={g.arsir} datar={g.datar} />
    case 'vektor':
      return <Vektor panah={g.panah} jangkauan={g.jangkauan} komponen={g.komponen} proyeksi={g.proyeksi} />
    case 'batang':
    case 'garis-data':
      return <DiagramData jenis={g.jenis} kategori={g.kategori} nilai={g.nilai} satuan={g.satuan} mulai={g.mulai} sorot={g.sorot} />
    case 'tabel':
      return <Tabel kepala={g.kepala} baris={g.baris} sorot={g.sorot} kolomBaru={g.kolomBaru} jumlah={g.jumlah} />
    case 'garis-bilangan':
      return <GarisBilangan jangkauan={g.jangkauan} titik={g.titik} selang={g.selang} />
    case 'balok':
      return <Balok ukuran={g.ukuran} titik={g.titik} ruas={g.ruas} bantu={g.bantu} tambahan={g.tambahan} bidang={g.bidang} />
    case 'bidang':
      return (
        <Bidang bangun={g.bangun} bayangan={g.bayangan} cermin={g.cermin} pusat={g.pusat} jangkauan={g.jangkauan}
                labelBangun={g.labelBangun} labelBayangan={g.labelBayangan} panah={g.panah} garis={g.garis} />
      )
    case 'luas':
      return (
        <Luas fungsi={g.fungsi} dari={g.dari} sampai={g.sampai} persegi={g.persegi} fungsi2={g.fungsi2} jangkauan={g.jangkauan}
              titik={g.titik} pecah={g.pecah} labelBagian={g.labelBagian} strip={g.strip} nama={g.nama} />
      )
    case 'svg':
      // Jalan keluar untuk gambar khusus. Isinya ditulis di berkas konten
      // proyek sendiri, bukan masukan pengguna, jadi aman disisipkan.
      return (
        <svg viewBox={g.viewBox} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Gambar soal"
             dangerouslySetInnerHTML={{ __html: g.isi }} />
      )
  }
}
