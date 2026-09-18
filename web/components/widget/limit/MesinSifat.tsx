'use client'

import Lembar, { LembarLangkah, LembarSelesai, LembarSoal, LembarTolak } from '@/components/widget/Lembar'

/**
 * Widget "Mesin Sifat Limit", Limit tahap 5.
 *
 * Siswa memilih sifat mana yang dipakai di tiap langkah. Kalau tepat, langkahnya
 * terbuka dan soalnya menyusut. Kalau keliru, mesin menolak DAN menyebutkan
 * alasannya, karena penolakan tanpa alasan tidak mengajari apa-apa.
 *
 * Soal ketiga sengaja tidak bisa diselesaikan dengan sifat mana pun. Itu bukan
 * jebakan iseng: batas kemampuan sebuah cara justru lebih mudah diingat kalau
 * pernah ditabrak sendiri, dan itulah pintu masuk ke Materi 06.
 *
 * Bukan SVG melainkan HTML biasa, karena isinya susunan langkah dan tombol,
 * bukan gambar. Ditaruh di dalam `.isi-gulir`, seperti widget Dunia Nyata.
 */

export type Sifat = 'dasar' | 'kelipatan' | 'jumlah' | 'kali' | 'bagi' | 'pangkat' | 'akar'

export const NAMA_SIFAT: Record<Sifat, string> = {
  dasar: 'Sifat dasar',
  kelipatan: 'Kelipatan',
  jumlah: 'Jumlah dan selisih',
  kali: 'Hasil kali',
  bagi: 'Hasil bagi',
  pangkat: 'Pangkat',
  akar: 'Akar',
}

export const URUT_SIFAT: Sifat[] = ['dasar', 'kelipatan', 'jumlah', 'kali', 'bagi', 'pangkat', 'akar']

/**
 * Keterangan saat pilihannya keliru.
 *
 * Sengaja TIDAK menyebutkan sifat mana yang benar. Kalau jawabannya langsung
 * dibocorkan, siswa tinggal menekan tombol sampai kena, dan yang dilatih jadi
 * kesabaran menekan tombol, bukan cara membaca bentuk. Yang diberikan di sini
 * adalah ciri kapan sebuah sifat memang waktunya dipakai.
 */
export const PETUNJUK_SALAH: Record<Sifat, string> = {
  dasar: 'Sifat dasar dipakai paling akhir, saat yang tersisa tinggal limit dari x dan limit dari angka tetap. Selama masih ada bentuk yang bisa dipecah, belum waktunya.',
  kelipatan: 'Sifat kelipatan dipakai saat sudah terlihat sebuah angka pengali di depan bentuk yang mengandung x. Kalau bentuknya masih tergabung, angkanya belum kelihatan.',
  jumlah: 'Sifat jumlah dan selisih dipakai saat bentuknya berupa suku-suku yang dipisahkan tanda tambah atau kurang, bukan saat masih berupa pecahan atau akar.',
  kali: 'Sifat hasil kali dipakai saat bentuknya dua hal yang dikalikan, dan keduanya sama-sama mengandung x. Angka pengali biasa itu urusan sifat kelipatan.',
  bagi: 'Sifat hasil bagi dipakai saat bentuknya masih satu pecahan utuh yang belum dipisah, DAN limit penyebutnya bukan nol. Periksa penyebutnya lebih dulu.',
  pangkat: 'Sifat pangkat dipakai saat ada bentuk berpangkat yang isinya mengandung x, misalnya x², bukan saat pangkatnya sudah lepas.',
  akar: 'Sifat akar dipakai saat ada tanda akar yang isinya mengandung x, dan isinya tidak negatif di titik itu.',
}

type Langkah = { sifat: Sifat; tampil: string; catatan: string }

export type SoalSifat = {
  judul: string
  langkah: Langkah[]
  /** kalau ada, soalnya memang tidak bisa diselesaikan dengan sifat limit */
  buntu?: string
  jawaban?: string
}

export const SOAL_SIFAT: SoalSifat[] = [
  {
    judul: 'lim x→2 (3x² - x + 4)/(x + 2)',
    langkah: [
      {
        sifat: 'bagi',
        tampil: '(lim x→2 (3x² - x + 4))/(lim x→2 (x + 2))',
        catatan: 'Boleh, karena limit penyebutnya 2 + 2 = 4, bukan nol. Periksa syarat ini SEBELUM memisahkan.',
      },
      {
        sifat: 'jumlah',
        tampil: '(lim x→2 3x² - lim x→2 x + lim x→2 4)/(lim x→2 x + lim x→2 2)',
        catatan: 'Limit dari penjumlahan sama dengan penjumlahan limitnya. Berlaku juga untuk pengurangan.',
      },
      {
        sifat: 'kelipatan',
        tampil: '(3 · lim x→2 x² - lim x→2 x + lim x→2 4)/(lim x→2 x + lim x→2 2)',
        catatan: 'Angka pengali boleh dikeluarkan dari limit. Angka 3 tidak dipengaruhi oleh x.',
      },
      {
        sifat: 'pangkat',
        tampil: '(3 · (lim x→2 x)² - lim x→2 x + lim x→2 4)/(lim x→2 x + lim x→2 2)',
        catatan: 'Limit boleh masuk ke dalam pangkat. Sekarang semuanya tinggal limit dari x dan limit dari angka.',
      },
      {
        sifat: 'dasar',
        tampil: '(3 · 2² - 2 + 4)/(2 + 2) = 14/4',
        catatan: 'Limit dari x adalah 2, limit dari angka tetap adalah angka itu sendiri. Selesai.',
      },
    ],
    jawaban: '14/4 = 7/2 = 3,5',
  },
  {
    judul: 'lim x→4 √x/(x² + 3x)',
    langkah: [
      {
        sifat: 'bagi',
        tampil: '(lim x→4 √x)/(lim x→4 (x² + 3x))',
        catatan: 'Boleh, karena limit penyebutnya 16 + 12 = 28, bukan nol.',
      },
      {
        sifat: 'akar',
        tampil: '√(lim x→4 x)/(lim x→4 (x² + 3x))',
        catatan: 'Limit boleh masuk ke dalam akar, asalkan isinya tidak negatif. Di sini isinya 4, aman.',
      },
      {
        sifat: 'jumlah',
        tampil: '√(lim x→4 x)/(lim x→4 x² + lim x→4 3x)',
        catatan: 'Penyebutnya dipecah jadi dua suku.',
      },
      {
        sifat: 'dasar',
        tampil: '√4/(16 + 12) = 2/28',
        catatan: 'Masukkan limit x sama dengan 4 ke mana-mana. Selesai.',
      },
    ],
    jawaban: '2/28 = 1/14',
  },
  {
    judul: 'lim x→2 (x² - 4)/(x - 2)',
    langkah: [],
    buntu:
      'Sifat hasil bagi TIDAK berlaku di sini, karena limit penyebutnya 2 - 2 = 0. Sifat yang lain pun tidak menolong, sebab masalahnya bukan pada susunan melainkan pada bentuknya: kalau angkanya dipaksa masuk, hasilnya 0/0. Soal seperti ini dikerjakan dengan cara lain, dan caranya ada di Materi 06.',
  },
]

export default function MesinSifat({
  soal, langkah, pesan, onPilih,
}: {
  soal: number
  /** berapa langkah yang sudah terbuka */
  langkah: number
  /** keterangan penolakan, kalau pilihan terakhir keliru */
  pesan: string | null
  onPilih: (s: Sifat) => void
}) {
  const s = SOAL_SIFAT[Math.min(Math.max(soal, 0), SOAL_SIFAT.length - 1)]
  const terbuka = Math.min(Math.max(langkah, 0), s.langkah.length)
  const selesai = !s.buntu && langkah >= s.langkah.length
  // Langkah yang sudah dibuka bernama sifatnya; yang belum, namanya kosong
  // (siswa yang menentukan), tetapi barisnya tetap tergambar redup.
  const daftar = s.langkah.map((l, i) => (i < terbuka
    ? { nama: NAMA_SIFAT[l.sifat], teks: l.tampil, syarat: l.catatan }
    : { nama: '', teks: '' }))

  return (
    <Lembar>
      <LembarSoal soal={s.judul} cara={s.buntu ? undefined : 'pilih sifat yang dipakai di tiap langkah'} />
      {daftar.length > 0 && <LembarLangkah langkah={daftar} terbuka={terbuka} />}

      {s.buntu && <LembarTolak judul="Mesin berhenti." teks={s.buntu} />}

      {selesai && <LembarSelesai teks={`Limitnya ${s.jawaban}`} />}

      {pesan && !selesai && <LembarTolak judul="Belum tepat." teks={pesan} />}

      {!selesai && (
        <div className="lembar-pilihan">
          <div className="lembar-tanya">
            {s.buntu
              ? 'Silakan coba sifat mana pun. Tidak ada yang berhasil, dan itu memang yang mau ditunjukkan.'
              : `Sifat mana yang dipakai untuk langkah ke-${langkah + 1}?`}
          </div>
          <div className="pilih-sisi" style={{ flexWrap: 'wrap' }}>
            {URUT_SIFAT.map((k) => (
              <button key={k} onClick={() => onPilih(k)} style={{ flex: '1 1 30%' }}>
                {NAMA_SIFAT[k]}
              </button>
            ))}
          </div>
        </div>
      )}
    </Lembar>
  )
}
