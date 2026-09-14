/**
 * Statistika, tahap 14: statistika di sekitar kita.
 *
 * Ditambahkan 5 Sep 2026 atas permintaan ARYA: topik lain punya materi
 * "dipakai di dunia nyata", Statistika belum. Tidak ada alat baru di sini.
 * Enam contoh memperlihatkan alat dari Materi 01 sampai 13 bekerja di luar
 * kelas, dan pertanyaan apa yang harus dibawa ke sana.
 *
 * SELURUH ANGKA DI MATERI INI ADALAH ANGKA CONTOH, dibuat mirip kenyataan
 * supaya cara membacanya terasa nyata, bukan data resmi lembaga mana pun.
 * Bacaannya menyatakan itu terang-terangan. Angka yang dihitung di dalam teks
 * (rata-rata 7,35 dan median 6 dari sebelas siswa di 6, tiga di 7, enam di
 * 10; rata-rata 15 untuk 13, 15, 17, 14, 16 dan untuk 4, 28, 15, 6, 22; 60%
 * dari 5 adalah 3 dan dari 200 adalah 120; 486 ke 512 naik 5,3%) sudah
 * diperiksa dengan tangan.
 *
 * Galerinya: `components/widget/statistika/DuniaNyataStatistika.tsx`.
 */

import type { Tahap } from '@/content/tipe'
import type { WidgetStatistika } from '@/content/statistika/widget'

type TahapStatistika = Omit<Tahap, 'widget'> & { widget?: WidgetStatistika }

export const TAHAP_NYATA: TahapStatistika[] = [
  {
    no: 14,
    slug: 'statistika-di-sekitar-kita',
    judul: 'Statistika di sekitar kita',
    labelPendek: 'Dunia nyata',
    pertanyaan: 'Di mana alat-alat ini benar-benar dipakai, dan apa yang harus ditanyakan sebelum percaya?',
    intisari: [
      'Tidak ada alat baru: enam contoh ini memakai histogram, median, simpangan baku, frekuensi relatif, sumbu yang jujur, dan diagram pencar dari materi sebelumnya.',
      'Angkanya angka contoh yang dibuat mirip kenyataan, bukan data resmi. Yang dipelajari adalah cara membacanya.',
      'Pertanyaan yang sama berlaku di mana pun: siapa yang diukur, dari mana sumbunya mulai, dan apakah hubungan berarti sebab.',
    ],
    penjelasan: [
      { jenis: 'paragraf', teks: 'Tiga belas materi sebelumnya membangun alat: cara menyajikan data, cara meringkasnya jadi satu dua angka, dan cara membaca hubungan dua data. Materi ini tidak menambah alat. Ia memperlihatkan enam tempat di luar kelas tempat alat-alat itu bekerja, dan pertanyaan apa yang harus dibawa ke sana.' },
      { jenis: 'sorot', teks: 'Semua angka di materi ini angka contoh, dibuat mirip kenyataan supaya cara membacanya terasa nyata. Yang perlu dibawa pulang bukan angkanya, melainkan pertanyaannya.' },

      { jenis: 'sesi', judul: 'Nilai rapor satu kelas' },
      { jenis: 'paragraf', teks: 'Wali kelas melaporkan rata-rata ulangan kelasnya 7,35. Terdengar bagus. Histogramnya bercerita lain: dari dua puluh siswa, sebelas mendapat 6, tiga mendapat 7, dan enam mendapat 10. Enam siswa di angka 10 itulah yang mengangkat rata-ratanya. Median kelas ini 6, sebab siswa ke-10 dan ke-11 dari bawah sama-sama di angka 6.' },
      { jenis: 'paragraf', teks: 'Kalau pertanyaannya "apakah kelas ini perlu jam tambahan", median dan bentuk histogram menjawab lebih jujur daripada rata-rata. Ini persis pelajaran Materi 05 dan 06: satu angka bisa menyembunyikan bentuk data, dan bentuk itulah yang menentukan keputusan.' },

      { jenis: 'sesi', judul: 'Curah hujan sepanjang tahun' },
      { jenis: 'paragraf', teks: 'Stasiun cuaca mencatat curah hujan tiap bulan. Digambar sebagai diagram garis, polanya langsung terbaca: tinggi di Desember sampai Februari, rendah di Juli sampai September. Petani membacanya untuk menentukan kapan menanam, pengelola waduk untuk menentukan kapan menahan air.' },
      { jenis: 'paragraf', teks: 'Yang bekerja di sini adalah penyajian data dari Materi 02 dan modus dari Materi 05: bulan terbasah adalah bulan yang paling sering hujan lebat. Rata-rata setahun justru kurang berguna, karena yang penting bukan berapa hujan setahun, melainkan kapan hujan itu datang.' },

      { jenis: 'sesi', judul: 'Memilih pemain untuk laga penentuan' },
      { jenis: 'paragraf', teks: 'Dua pemain sama-sama mencetak rata-rata 15 poin dalam lima pertandingan terakhir. Pemain A: 13, 15, 17, 14, 16. Pemain B: 4, 28, 15, 6, 22. Rata-ratanya sama persis, simpangan bakunya jauh berbeda.' },
      { jenis: 'paragraf', teks: 'Pelatih yang butuh kepastian memilih pemain A, yang simpangan bakunya kecil. Pelatih yang sedang tertinggal jauh dan butuh keajaiban mungkin memilih pemain B. Simpangan baku dari Materi 08 bukan sekadar rumus: ia mengukur "bisa diandalkan atau tidak", dan itu pertanyaan yang dijawab pelatih, dokter, dan pabrik setiap hari.' },

      { jenis: 'sesi', judul: 'Survei jajanan kantin' },
      { jenis: 'paragraf', teks: 'OSIS menanyai siswa tentang jajanan favorit lalu melaporkan "60% memilih bakso". Sebelum kantin mengubah menunya, tanyakan: 60% dari berapa orang? Kalau yang ditanya 5 orang, itu cuma 3 orang. Kalau 200 orang, itu 120 orang, dan barulah layak dijadikan dasar keputusan.' },
      { jenis: 'paragraf', teks: 'Frekuensi relatif dari Materi 04 selalu harus dibaca bersama jumlahnya. Tanyakan juga siapa yang ditanya dan di mana. Kalau surveinya dilakukan di depan gerobak bakso, hasilnya sudah miring sebelum dihitung.' },

      { jenis: 'sesi', judul: 'Grafik di iklan dan berita' },
      { jenis: 'paragraf', teks: 'Iklan memperlihatkan batang penjualan yang melonjak tinggi. Lihat sumbu-y: mulai dari 480, bukan dari 0. Kenaikan dari 486 ke 512 memang ada, sekitar 5 persen, tetapi gambarnya berteriak "berlipat ganda". Angka yang sama, digambar dari nol, nyaris rata.' },
      { jenis: 'paragraf', teks: 'Ini Materi 13 yang muncul setiap hari di layar HP: grafik dengan data benar tetap bisa menyesatkan. Pertanyaan pertamanya selalu sama. Sumbunya mulai dari berapa, dan apakah itu diberitahukan?' },

      { jenis: 'sesi', judul: 'Jam belajar dan nilai ujian' },
      { jenis: 'paragraf', teks: 'Diagram pencar jam belajar seminggu lawan nilai ujian biasanya naik ke kanan: makin lama belajar, makin tinggi nilai. Hubungannya nyata dan koefisien korelasinya tinggi. Tetapi hubungan bukan berarti sebab. Siswa yang belajar lama mungkin juga tidur cukup, punya buku, atau lebih dulu paham materinya.' },
      { jenis: 'paragraf', teks: 'Diagram pencar dari Materi 10 dan koefisien korelasi dari Materi 12 memberi tahu seberapa rapat dua data bergerak bersama. Untuk mengklaim sebab, perlu percobaan yang mengendalikan hal lain, dan itu urusan penelitian, bukan sekadar gambar.' },

      { jenis: 'sesi', judul: 'Satu benang merah dari semua contoh' },
      { jenis: 'sorot', teks: 'Angka tidak pernah berbicara sendiri. Yang berbicara adalah pilihan: apa yang diukur, siapa yang diukur, dan cara menampilkannya.' },
      {
        jenis: 'poin',
        judul: 'Tiga pertanyaan yang dibawa ke mana pun',
        butir: [
          'Siapa yang diukur, berapa banyak, dan di mana? Persentase tanpa jumlah dan survei tanpa tempat tidak bisa dinilai.',
          'Satu angka ringkasan menyembunyikan bentuk apa? Rata-rata yang sama bisa berasal dari data yang rapat maupun yang liar.',
          'Sumbunya mulai dari berapa, dan apa yang tidak ikut ditampilkan? Grafik yang benar angkanya tetap bisa dibuat menyesatkan.',
        ],
      },
      { jenis: 'paragraf', teks: 'Keenam contoh di atas dijawab dengan alat yang sudah ada di tangan. Yang membedakan pembaca yang baik bukan rumus tambahan, melainkan kebiasaan berhenti sebentar dan bertanya sebelum percaya.' },
    ],
    seringKeliru: {
      judul: 'Kalau angkanya dari sumber resmi, kesimpulannya pasti benar',
      isi: 'Sumber resmi menjamin angkanya dicatat dengan benar, bukan menjamin kesimpulan yang ditarik darinya benar. Rata-rata resmi tetap bisa menyembunyikan bentuk data, grafik resmi tetap bisa memotong sumbu, dan hubungan yang tercatat resmi tetap bukan sebab. Yang perlu diperiksa selalu sama: siapa yang diukur, bagaimana ditampilkan, dan apa yang tidak ikut ditampilkan.',
    },
    widget: 'dunia-nyata-statistika',
    siap: true,
  },
]
