# Standar mengajar MATRA: menjelaskan seperti guru yang baik

Ditulis MASTER, 2 Sep 2026, atas permintaan ARYA: "menerapkan cara menjelaskan
ke siswa sebagaimana seorang guru menjelaskan, dengan runtutan ilmu yang benar,
pedagogi yang baik, dan kompetensi guru lainnya." Dipakai untuk menilai halaman
yang sudah ada, dan WAJIB dibaca sebelum menulis naskah video, sebab narasi
video adalah bentuk paling murni dari guru yang sedang menjelaskan.

Yang di bawah ini bukan teori. Tiap butir diikat ke blok yang benar-benar ada di
`web/content/tipe.ts`: `paragraf`, `poin`, `sorot`, `contoh`, `sesi`, `coba`,
plus `pertanyaan`, `seringKeliru`, dan `intisari` pada tiap tahap.

## 1. Runtutan ilmu: urutan yang tidak boleh dilanggar

1. **Prasyarat sebelum konsep.** Sebelum memakai sebuah gagasan, pastikan
   siswa sudah memilikinya. Kalau gagasan itu dari bab atau kelas sebelumnya,
   panggil ulang dalam dua kalimat ("ingat di SMP, gradien itu..."), jangan
   dianggap sudah pasti ada. Kalau gagasan itu dari bab SESUDAHNYA (contoh:
   memakai sin dan cos di bab Vektor yang letaknya sebelum bab Trigonometri),
   itu pelanggaran urutan, dan jalan lain harus dicari.
2. **Konkret sebelum abstrak.** Benda, cerita, atau angka dulu; lambang dan
   rumus belakangan. Rumus yang muncul sebelum siswa merasakan masalahnya akan
   dihafal, bukan dimengerti.
3. **Satu gagasan baru per langkah.** Satu `sesi` = satu ide. Kalau sebuah
   tahap memuat dua ide besar (misalnya sudut garis-bidang DAN sudut
   bidang-bidang), keduanya harus punya `sesi`, `contoh`, dan `coba` sendiri.
4. **Nama diberikan SETELAH bendanya dilihat.** Tunjukkan dulu dua garis yang
   tidak sejajar dan tidak bertemu, baru bilang "itu namanya bersilangan".
5. **Prosedur setelah konsep, penerapan setelah prosedur.** Kenapa dulu,
   bagaimana kemudian, di mana dipakainya paling akhir.
6. **Spiral, bukan lompat.** Tahap baru mengaitkan diri ke tahap sebelumnya
   dengan kalimat eksplisit ("di tahap 3 kita sudah..."), dan tahap penutup
   menutup lingkaran ke pertanyaan pembuka topik.

## 2. Anatomi satu tahap yang benar-benar mengajar

Urutan blok yang meniru guru di depan kelas:

| Urutan | Blok | Isinya | Tanda gagal |
|---|---|---|---|
| 1 | `pertanyaan` | Pertanyaan dari dunia siswa, yang JAWABANNYA belum mereka punya | pertanyaan retoris yang jawabannya "ya" |
| 2 | `paragraf` pembuka | Kaitkan ke yang sudah diketahui, lalu tunjukkan masalahnya | langsung definisi |
| 3 | `sesi` + `paragraf` | Bangun gagasannya dari masalah tadi, satu ide | dua ide dalam satu sesi |
| 4 | `sorot` | SATU kalimat yang harus dibawa pulang, dalam bahasa siswa | kalimat sorot berisi rumus tanpa makna |
| 5 | `contoh` | Contoh yang dikerjakan LENGKAP, tiap baris menyebut APA yang dilakukan dan KENAPA | baris berisi angka saja tanpa alasan |
| 6 | `coba` | Siswa mengerjakan yang mirip, dengan `langkah` penuntun dan jawaban yang bisa dicek | "coba sendiri" tanpa penuntun dan tanpa jawaban |
| 7 | `seringKeliru` | Setelah paham: kekeliruan yang menggoda, KENAPA menggoda, dan cara membedakannya | ditaruh di awal, atau cuma "yang benar adalah..." |
| 8 | `intisari` | Rangkuman 2 sampai 4 poin, mengulang kata kunci sorot | menyebut hal yang tidak dibahas di atas |

Tidak semua tahap butuh semua blok, tapi tahap yang mengajarkan PROSEDUR
(menghitung sesuatu) wajib punya minimal satu `contoh` lengkap dan satu `coba`.
Tahap yang mengajarkan KONSEP boleh mengganti `contoh` dengan cerita yang
dijalankan sampai selesai.

## 3. Bahasa guru, bukan bahasa buku

- Kalimat pendek, sekitar 20 kata. Satu kalimat satu gagasan.
- Kata "kita": "kita coba", "kita lihat". Bukan "siswa diharapkan", bukan
  "dapat ditunjukkan bahwa".
- Istilah baru dicetak jelas saat pertama muncul dan langsung diberi arti dalam
  bahasa sehari-hari. Jangan dua istilah baru dalam satu kalimat.
- Ajukan pertanyaan sebelum menjawabnya: "Kalau h diganti 3, ke mana
  puncaknya pindah? Coba tebak dulu." Baru jawab.
- Angka yang dipakai kecil dan bulat saat mengenalkan ide; angka yang
  realistis baru di soal.
- Analogi disebutkan batasnya: "mean itu seperti titik seimbang jungkat-jungkit;
  yang tidak cocok dari analogi ini: ..." Analogi tanpa batas jadi salah paham
  baru.
- Jangan pernah bilang "mudah", "jelas", "tentu saja". Kalau mudah, siswa
  tidak butuh halaman ini.

## 4. Kompetensi guru, diterjemahkan ke halaman

| Kompetensi | Wujudnya di MATRA |
|---|---|
| Menguasai materi (profesional) | Tiap angka diperiksa mesin. Tiap klaim yang bisa salah punya sumber (halaman buku). Istilah mengikuti buku pemerintah, bukan karangan. |
| Tahu di mana siswa tersandung (pedagogik) | `seringKeliru` diambil dari kotak "Ayo Berpikir Kritis" atau catatan guru di buku, bukan ditebak. Pengecoh soal pilihan ganda = kekeliruan nyata itu, bukan asal salah. |
| Jujur (kepribadian) | Bahan di luar kurikulum diberi label di badan teks. Data buatan dinyatakan buatan. Yang tidak dibahas dikatakan tidak dibahas dan dirujuk ke tempatnya. |
| Menilai dengan adil (asesmen) | Kesulitan soal dikalibrasi ke soal nyata sebelum ditulis. Empat tingkat benar-benar berbeda cara berpikirnya, bukan cuma angkanya lebih besar. Pembahasan menunjukkan JALAN, bukan cuma jawaban. |
| Mengaitkan ke kehidupan (kontekstual) | Pertanyaan pembuka dan tahap penutup memakai situasi yang siswa kenal, dengan angka yang masuk akal di Indonesia (rupiah, meter, hari). |
| Membaca kelas (adaptif) | Widget memberi umpan balik seketika, bukan menunggu tombol "periksa". Siswa yang salah melihat kenapa, bukan cuma tanda silang. |

## 5. Narasi video: guru sedang bicara

Berlaku untuk semua naskah `manim/narasi/*.json`:

1. Satu segmen = satu gagasan, 6 sampai 15 detik. Segmen lebih dari 20 detik
   hampir pasti memuat dua gagasan; pecah.
2. Kalimat pertama tiap segmen menyebut yang SEDANG TAMPIL di layar. Kalau
   layar berganti, narasinya berganti pada detik yang sama, dan sebaliknya.
   Gambar yang membantah narasinya lebih merusak daripada layar kosong
   (aturan gerbang video di `CLAUDE.md`).
3. Ajukan pertanyaan, diam sebentar (beri `jeda`), baru jawab. Itu cara guru
   memberi siswa waktu menebak.
4. "Kita", "coba lihat", "perhatikan". Bukan "dapat dilihat bahwa".
5. Angka diucapkan seperti guru mengucapkannya: "dua koma sembilan", "akar dua",
   bukan "2,9" yang dibaca mesin sebagai "dua koma sembilan" secara kebetulan.
6. Segmen penutup mengulang kalimat `sorot` tahapnya, kata per kata.
7. Jangan menyebut sesuatu yang tidak digambar. Kalau narasi bilang "tiga
   daerah bersarang", ketiganya harus terlihat terpisah di layar.
8. **Pembuka WAJIB mengumumkan materinya** (permintaan ARYA, 2 Sep 2026).
   Segmen pertama tiap video terdengar seperti guru membuka sub-bab baru:
   menyebut nomor dan nama materi, lalu mengaitkan dengan materi sebelumnya
   atau langsung masuk ke masalahnya. Di layar, `sinema.judul_pembuka` memuat
   nomor dan nama materi yang sama ("Materi 03: Komponen vektor"), supaya yang
   didengar dan yang dibaca sama. Pilih pembuka menurut POSISI materi; jangan
   memakai kalimat yang sama untuk semua video satu topik.

   Materi pertama sebuah topik (belum ada yang bisa diingatkan):
   - "Sekarang kita masuk ke materi baru: [nama topik]. Materi pertama, [nama
     materi]. Bayangkan ..."
   - "Kita mulai [nama topik] dari materi pertama, [nama materi]. Perhatikan ..."
   - "Materi pertama [nama topik]. Sebelum ada rumus apa pun, coba lihat ini ..."

   Materi lanjutan (yang paling sering dipakai; ambil kalimat inti materi
   sebelumnya dari `intisari` tahapnya, kata per kata kalau bisa):
   - "Dari materi sebelumnya tentang [materi sebelumnya], kita sudah tahu bahwa
     [inti]. Sekarang, materi [nomor]: [nama materi]."
   - "Materi [nomor], [nama materi]. Di materi sebelumnya kita berhenti di
     [inti]. Pertanyaannya sekarang: ..."
   - "Saatnya masuk ke materi yang baru: [nama materi]. Sekarang perhatikan ..."
   - "Kita lanjut ke materi [nomor]. Kalau tadi [materi sebelumnya] menjawab
     [pertanyaan lama], materi ini menjawab [pertanyaan baru]."

   Materi yang membalik dugaan (untuk tahap yang punya `seringKeliru` kuat):
   - "Materi [nomor], [nama materi]. Banyak yang mengira [dugaan keliru].
     Coba kita uji dengan gambar ini ..."

   Materi setelah latihan atau di tengah topik:
   - "Setelah berlatih [hal yang dilatih], sekarang kita naik satu tingkat:
     materi [nomor], [nama materi]."

   Materi terakhir topik:
   - "Materi terakhir [nama topik]: [nama materi]. Semua yang sudah kita
     kumpulkan, dari [materi 1] sampai [materi sebelumnya], dipakai di sini."

   Aturan pembuka: tetap 6 sampai 15 detik (aturan 1), tetap menyebut yang
   sedang tampil (aturan 2), dan boleh langsung disambung pertanyaan pembuka
   yang dijawab sepanjang video. Kalimat pengumuman materi tidak dihitung
   sebagai "gagasan" segmen; gagasannya tetap masalah yang dibuka.
9. **Kata yang dipertegas ditandai `*kata*`** di naskah (aturan ARYA sejak
   Trigonometri). Penanda itu jadi tebal di subtitle situs (`buat_subtitle.py`)
   dan di keterangan layar (`gl.teks`), dan dibuang oleh mesin suara. Satu
   sampai dua penegasan per segmen; kalau semua ditebalkan, tidak ada yang tegas.
   Subtitle dan keterangan: tulisan saja, tanpa latar atau kotak.

## 6. Daftar periksa per tahap (isi sendiri sebelum lapor)

Sesi menjawab ya/tidak untuk TIAP tahap, ditulis di laporan:

1. Pertanyaan pembukanya belum bisa dijawab siswa sebelum membaca tahap ini?
2. Ada kalimat yang memanggil ulang pengetahuan sebelumnya?
3. Benda atau cerita muncul sebelum lambang?
4. Tiap `sesi` hanya memuat satu ide?
5. Istilah baru diberi arti saat pertama muncul?
6. Tahap prosedur: ada `contoh` yang tiap barisnya menyebut alasan?
7. Ada `coba` dengan penuntun dan jawaban?
8. `seringKeliru` menjelaskan KENAPA kekeliruan itu menggoda?
9. `intisari` hanya berisi yang dibahas?
10. Tidak ada "mudah", "jelas", "tentu saja", "miskonsepsi", dan em-dash?

Tahap yang mendapat "tidak" pada butir 1, 3, 4, atau 6 belum layak; itu
bukan soal selera, itu tahap yang belum mengajar.

## 7. Yang dilarang keras

- Tembok paragraf lebih dari 5 kalimat tanpa jeda blok.
- Rumus yang muncul tanpa kalimat "kenapa" sebelumnya.
- Mengandaikan bab yang belum dipelajari siswa.
- Contoh dengan angka yang belum diperiksa mesin.
- Kalimat yang memuji dirinya ("penjelasan ini lengkap") atau merendahkan
  siswa ("yang ini pasti kamu sudah tahu").
