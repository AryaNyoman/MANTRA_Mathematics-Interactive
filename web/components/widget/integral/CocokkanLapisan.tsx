'use client'

/**
 * Widget Materi 03: memilih u, lalu melihat akibat pilihannya.
 *
 * APA YANG DIAJARKAN
 * Substitusi gagal atau berhasil karena satu hal saja: setelah bagian u
 * diambil, apakah SISANYA berbentuk du atau kelipatan angkanya. Karena itu
 * widget ini tidak menilai "benar" atau "salah" begitu saja. Untuk tiap calon
 * u ia menuliskan du-nya, menuliskan apa yang tersisa di soal, dan menyebutkan
 * dengan kalimat kenapa sisa itu cocok atau tidak.
 *
 * Petunjuknya menyuruh siswa MEMILIH YANG SALAH LEBIH DULU. Itu disengaja:
 * calon yang salah tetap menghasilkan du yang masuk akal, dan hanya dengan
 * melihat sisanya siswa tahu bedanya. Kalau alat ini langsung menolak tanpa
 * menjelaskan, yang dipelajari cuma menebak.
 *
 * Langkah penyelesaian dibuka satu per satu memakai bentuk yang sama dengan
 * `widget/limit/BongkarBertahap`, termasuk nama kelas CSS-nya, dan baru
 * tersedia setelah u yang benar dipilih.
 *
 * SELURUH HASILNYA DIPERIKSA sympy lewat `alat/materi-integral.json`:
 * m03-jawaban-benar, m03-contoh-buku-3-3, dan m03-x-kali-akar-bisa.
 */

export type CalonU = {
  nilai: string
  label: string
  /** du yang lahir dari calon ini */
  du: string
  /** apa yang tersisa di soal setelah bagian u diambil */
  sisa: string
  benar: boolean
  /** kenapa cocok atau kenapa tidak */
  alasan: string
}

export type SoalLapisan = {
  nilai: string
  label: string
  judul: string
  calon: CalonU[]
  baris: { nama: string; teks: string; sifat?: string }[]
  jawaban: string
}

export const SOAL: SoalLapisan[] = [
  {
    nilai: 'pangkat-lima',
    label: '(2x + 1)⁵',
    judul: 'cari antiturunan dari (2x + 1)⁵',
    calon: [
      {
        nilai: 'isi', label: 'u = 2x + 1', du: 'du = 2 dx', sisa: 'dx saja', benar: true,
        alasan: 'sisa dx kurang faktor 2 dibanding du. Yang kurang cuma sebuah angka, jadi bisa ditambal dengan mengalikan setengah.',
      },
      {
        nilai: 'x', label: 'u = x', du: 'du = dx', sisa: '(2x + 1)⁵',
        benar: false,
        alasan: 'du memang cocok, tetapi u yang dipilih tidak menutupi apa pun. Bentuk soalnya sama sekali tidak berubah, jadi tidak ada yang terselesaikan.',
      },
      {
        nilai: 'seluruh', label: 'u = (2x + 1)⁵', du: 'du = 10(2x + 1)⁴ dx', sisa: 'tidak ada',
        benar: false,
        alasan: 'du menuntut (2x + 1)⁴ yang tidak ada di soal. Memilih seluruh bentuk sebagai u justru membuat soalnya lebih rumit, bukan lebih ringan.',
      },
    ],
    baris: [
      { nama: 'tulis ulang', teks: 'setengah kali u⁵ du', sifat: 'faktor setengah menambal kekurangan tadi' },
      { nama: 'aturan pangkat', teks: 'setengah kali u⁶ per 6' },
      { nama: 'rapikan', teks: 'u⁶ per 12' },
      { nama: 'kembalikan', teks: 'ganti u dengan 2x + 1' },
    ],
    jawaban: '(2x + 1)⁶ dibagi 12, ditambah C',
  },
  {
    nilai: 'buku',
    label: '2x(x² + 5)⁴',
    judul: 'cari antiturunan dari 2x(x² + 5)⁴',
    calon: [
      {
        nilai: 'isi', label: 'u = x² + 5', du: 'du = 2x dx', sisa: '2x dx', benar: true,
        alasan: 'sisa 2x dx sama persis dengan du. Tidak perlu ditambal apa pun, dan inilah bentuk substitusi yang paling rapi.',
      },
      {
        nilai: 'depan', label: 'u = 2x', du: 'du = 2 dx', sisa: '(x² + 5)⁴',
        benar: false,
        alasan: 'sisanya masih memuat x di dalam kurung, dan x tidak bisa dipindahkan keluar seperti angka. Substitusinya berhenti di sini.',
      },
      {
        nilai: 'kuadrat', label: 'u = x²', du: 'du = 2x dx', sisa: '(u + 5)⁴ dan 2x dx',
        benar: false,
        alasan: 'du-nya kebetulan cocok, tetapi kurungnya menjadi (u + 5)⁴ sehingga masih harus disubstitusi sekali lagi. Memilih seluruh isi kurung menyelesaikannya sekali jalan.',
      },
    ],
    baris: [
      { nama: 'tulis ulang', teks: 'u⁴ du', sifat: 'du sudah lengkap, tidak perlu disesuaikan' },
      { nama: 'aturan pangkat', teks: 'u⁵ per 5' },
      { nama: 'kembalikan', teks: 'ganti u dengan x² + 5' },
    ],
    jawaban: '(x² + 5)⁵ dibagi 5, ditambah C. Ini Contoh Soal 3.3 di buku.',
  },
  {
    nilai: 'akar',
    label: 'x akar (x² + 5)',
    judul: 'cari antiturunan dari x kali akar (x² + 5)',
    calon: [
      {
        nilai: 'isi', label: 'u = x² + 5', du: 'du = 2x dx', sisa: 'x dx', benar: true,
        alasan: 'sisa x dx adalah setengah dari du. Kekurangannya sebuah angka, jadi seluruhnya dikali setengah dan substitusinya jalan.',
      },
      {
        nilai: 'akar', label: 'u = akar (x² + 5)', du: 'du = x dibagi akar (x² + 5), dikali dx', sisa: 'x dx',
        benar: false,
        alasan: 'du-nya sendiri masih memuat akar, jadi menyamakannya dengan sisa soal butuh langkah tambahan. Ambil isi akarnya saja, bukan akarnya.',
      },
      {
        nilai: 'x', label: 'u = x', du: 'du = dx', sisa: 'x akar (x² + 5)',
        benar: false,
        alasan: 'u tidak menutupi apa pun, jadi bentuk soalnya tidak berubah sedikit pun.',
      },
    ],
    baris: [
      { nama: 'tulis ulang', teks: 'setengah kali akar u du', sifat: 'faktor setengah menambal kekurangan tadi' },
      { nama: 'ubah akarnya', teks: 'akar u sama dengan u pangkat setengah' },
      { nama: 'aturan pangkat', teks: 'setengah kali (u pangkat tiga per dua) dibagi tiga per dua' },
      { nama: 'rapikan', teks: 'u pangkat tiga per dua, dibagi 3' },
      { nama: 'kembalikan', teks: 'ganti u dengan x² + 5' },
    ],
    jawaban: '(x² + 5) pangkat tiga per dua, dibagi 3, ditambah C',
  },
]

export const AWAL = { soal: 'pangkat-lima', calon: 'x', langkah: 1 }

export function soalDari(nilai: string): SoalLapisan {
  return SOAL.find((s) => s.nilai === nilai) ?? SOAL[0]
}

export const LANGKAH_MAKS = Math.max(...SOAL.map((s) => s.baris.length))

export default function CocokkanLapisan({
  soal, calon, langkah,
}: {
  soal: string
  calon: string
  langkah: number
}) {
  const s = soalDari(soal)
  const c = s.calon.find((k) => k.nilai === calon) ?? s.calon[0]
  const tampil = c.benar ? s.baris.slice(0, Math.min(Math.max(langkah, 0), s.baris.length)) : []
  const selesai = c.benar && langkah >= s.baris.length

  return (
    <div className="bongkar">
      <div className="bongkar-atas">
        <div className="bongkar-soal">{s.judul}</div>
        <div className="bongkar-cara">calon yang dipilih: {c.label}</div>
      </div>

      {/* Akibat pilihannya, selalu ditulis lengkap: du-nya apa, sisanya apa,
          dan kenapa itu cocok atau tidak. */}
      <ol className="bongkar-baris">
        <li>
          <span className="bongkar-nama">du-nya</span>
          <span className="bongkar-teks">{c.du}</span>
        </li>
        <li>
          <span className="bongkar-nama">sisa di soal</span>
          <span className="bongkar-teks">{c.sisa}</span>
          <span className="bongkar-syarat">{c.alasan}</span>
        </li>
      </ol>

      {c.benar ? (
        <>
          <div className="bongkar-atas">
            <div className="bongkar-cara">penyelesaiannya</div>
          </div>
          <ol className="bongkar-baris">
            {tampil.map((b, i) => (
              <li key={i}>
                <span className="bongkar-nama">{b.nama}</span>
                <span className="bongkar-teks">{b.teks}</span>
                {b.sifat && <span className="bongkar-syarat">{b.sifat}</span>}
              </li>
            ))}
          </ol>
          {selesai ? (
            <div className="mesin-selesai" role="status">
              <b>Selesai.</b> {s.jawaban}
            </div>
          ) : (
            <div className="bongkar-sisa">
              masih ada {s.baris.length - tampil.length} langkah lagi
            </div>
          )}
        </>
      ) : (
        <div className="bongkar-sisa">
          Calon ini tidak bisa dilanjutkan. Coba calon yang lain, dan bandingkan sisanya.
        </div>
      )}
    </div>
  )
}
