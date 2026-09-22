# PROGRESS: MANTRA (dulu MATRA)

## 21 SEP SORE: VIDEO DEMO PPPMI DIREKAM ULANG 60 FPS (di D:\PPPMI-2026, bukan repo)

Permintaan ARYA: naskah demo 21 Sep disetujui, video demo dibuat ulang
dengan 60 fps (versi 18 Sep 30 fps). Hasil: `07-Video-Demo-MANTRA-tanpa-suara.mp4`
6:44, 1920x1080 H.264 60 fps, 28 MB, 17 adegan (Asisten Tanya dan kuis bab
satu paket ikut), diperiksa frame demi frame lewat lembar kontak.
- Perekam bawaan playwright-cli dikunci 25 fps dan VP8 1 Mbps (buram), tool
  globalnya tidak boleh diubah, jadi dipakai salinan playwright-core lokal
  (`kerja/demo/rekam60/`) yang ditambal: fps 60, H.264 crf 18 lewat FFmpeg
  sistem, log tiap frame, jam mulai rekaman dicatat supaya potongan tepat
  di t0 skrip (bukan tebakan). `pasca.py` memotong dari t0 sampai cap selesai.
- Jebakan screencast Chrome: perubahan tunggal (kartu muncul lalu diam)
  bisa tidak menghasilkan frame sama sekali; rekaman pertama kehilangan
  kartu penutup 14 detik. Lapisan sekarang muncul dengan pudar 0,4 s plus
  goyang opacity supaya pasti terekam.
- Jatah Asisten Tanya 5 per IP per hari: tiap rekaman penuh memakai satu.
  Rekaman ketiga (jawaban kuis benar lewat kunci `KUNCI_KUIS`) putus karena
  DNS, jadi adegan kuis sampai penutup direkam terpisah tanpa Asisten dan
  disambung ke rekaman kedua pada frame kerangka muat halaman kuis
  (`sambung.py`); sambungan tidak terlihat, skor kuis 3/10.
- Naskah DRAF 21 Sep diisi stempel waktu nyata. Berkas 07 dan dokumen lain
  di folder kirim BELUM disentuh (menunggu aba-aba ARYA).

## 22 SEP: TEKS TENTANG, VIDEO TANPA TOMBOL UNDUH (deploy matra-4zp583lss)

- Tentang (ARYA): "Bahasanya bahasa SMA, bukan bahasa diktat" diganti
  "...materi yang disajikan dengan bahasa sederhana dan mudah dipahami"
  (alasan ARYA: jangan terkesan menggurui yang sudah ada). Beranda: ujung
  kalimat hero "dan yang masih bingung bisa ditanyakan langsung" dihapus.
- Video (ARYA, dari HP): menahan video memunculkan menu Chrome "Download
  video". `PemutarVideo`: `onContextMenu` dicegah di pembungkus dan
  `controlsList="nodownload"` di elemen video. Diuji di produksi: menu
  konteks dibatalkan, atribut ada. BUKAN pengaman: alamat mp4 tetap bisa
  dibaca orang yang paham peramban; pemblokiran referer di Worker sengaja
  TIDAK dipasang karena akan mematikan video di peramban yang
  menyembunyikan referer (Brave, Firefox mode ketat), dan jalur
  /video-cadangan lewat proxy Vercel tidak membawa referer.
- Jebakan: `npm run build` lokal gagal "next/font/google queries have
  exactly one entry" (cache Turbopack di `.next` rusak, bukan kode);
  sembuh sesudah `.next/cache`, `server`, `static`, `types`, `diagnostics`
  dihapus (folder `dev` milik dev server dibiarkan). Skrip deploy kini
  hanya memindahkan alias kalau keluaran vercel memuat "ready".

## 21 SEP SIANG: REVISI ARYA, ASISTEN TANYA TANPA TOMBOL "?", RIWAYAT PER BAB PLUS PDF, SLIDER SUDUT MENTOK ANGKA BULAT (deploy matra-itfbsk4vt)

Permintaan ARYA (21 Sep pagi, tiga tangkapan layar) dan keputusannya lewat
empat pertanyaan pilihan: letak asisten di daftar materi (sidebar/laci),
ekspor berkas PDF langsung (bukan dialog cetak), riwayat per bab
dikelompokkan per materi, slider mentok ke angka bulat dengan ujung yang
mustahil ditulis kata.
- Biaya Asisten $1,17 padahal ARYA baru bertanya sekali: itu ~80 jawaban
  uji saya (dua putaran `alat/uji_tanya`, 50 pertanyaan tiap putaran) plus
  penulisan cache 1 jam yang harganya DUA KALI harga input (bukan 1,25 kali
  seperti saya tulis semula; 1,25 itu untuk cache 5 menit). Bawaan cache
  sekarang 5 menit (`lib/tanya/penyedia.ts` `umurCache`, `susun.ts` tanpa
  `ttl` untuk 5m); `TANYA_CACHE_TTL=1h` hanya bila lalu lintas rapat.
  Pertanyaan pertama (dingin) kira-kira Rp 300 sampai 400, berikutnya dalam
  5 menit kira-kira Rp 100.
- Tombol "?" per blok DIHAPUS di HP dan desktop (mengganggu fokus):
  `TombolJelaskan.tsx` dan `konteks.ts` dibuang, `Penjelasan.tsx` polos
  lagi. Bertanya hanya lewat blok teks (`TombolTanyaBlok`), sekarang juga di
  kotak Sering keliru (`.miskon`) dan Ringkasan (`.baca-cepat`). Kutipan
  rumus dibaca dari `data-teks` yang ditanam `TeksMat` (Unicode aslinya,
  "90°" dan "(−cos θ, sin θ)"), bukan serpihan KaTeX "90 ∘".
- Panel berkepala navy `.tanya-kepala` (kicker Asisten Tanya + nama bab +
  tutup) supaya batas jendelanya jelas; dua tab: "Materi ini" dan "Riwayat
  bab (n)". Tombol "Asisten Tanya" di kaki daftar materi (di bawah Kuis;
  di HP di dalam laci) dengan lencana "n percakapan tersimpan"; membuka tab
  Riwayat kalau sudah ada percakapan. Keadaan terbuka dan tab dipegang
  `HalamanTopik` supaya "Buka" di daftar riwayat yang berpindah materi
  tidak menutup panelnya. Di layar latihan dan kuis hanya riwayatnya.
- Riwayat `lib/tanya/riwayat.ts`: kunci `matra:tanya:<bab>:<slug>` berisi
  `{t, pesan}`, 12 pesan per materi, terhapus 7 hari sesudah pesan terakhir
  (dibersihkan saat dibaca), bentuk lama (array) tetap terbaca. Panel
  menulis "tersimpan 7 hari" dan tiap butir "terhapus dalam n hari". Uji
  `lib/tanya/uji/riwayat.test.mjs` (localStorage tiruan; 23 uji lolos).
- PDF `lib/tanya/pdf.ts`: lembar `.tanya-cetak` dirender di luar layar
  hanya selama ekspor, difoto html2canvas skala 2, dipotong per halaman A4
  jsPDF, kaki "MANTRA · Asisten Tanya · halaman n"; nama berkas
  `mantra-tanya-<bab>-<tanggal>.pdf`. Diuji: 172 KB, rumus KaTeX ikut
  tergambar, tautan materi jadi teks emas.
- Slider sudut (ARYA: "risih, menyangkut ketelitian"): Bayangan 15 sampai
  90 (bayangan 0 m, "tidak terdefinisi", gambar diperkecil supaya bayangan
  panjang muat, satu kalimat di 90° supaya dua keterangan tidak bertindih),
  SegitigaSebangun 0 sampai 90 (sisi depan dan miring "tak terhingga" tanpa
  cm, gambar memakai tan 85° sebagai batas), EnamRasio 0 sampai 90 (tan dan
  sec "tak terhingga", garisnya terpotong dengan label "...tak terhingga"),
  LingkaranSatuan 0 sampai 360, SudutBerelasi 0 sampai 90 (dulu 89),
  BusurLawanTali 0 sampai 90 ("0 : 0, tidak terdefinisi" plus catatan
  limitnya 1). Diperiksa Playwright di tiap ujung; survei kolom alat
  Trigonometri 0 cacat, Limit 1 cacat LAMA (Limit 05 mesin-sifat menggulir
  70 px di 1920, bukan dari perubahan ini).
- Gerbang: 23 uji node, tsc, eslint, build, Playwright di dev dan produksi
  (tidak ada tombol "?", blok Sering keliru memunculkan Tanya, kepala navy,
  riwayat, PDF terunduh, laci HP), sapu_bahasa: baris baru bebas kata
  terlarang.
- Dikesampingkan ARYA (tanpa kredit ElevenLabs): rekam ulang video 07
  (masih menunjuk Grafik Fungsi Trigonometri) dan Statistika 01/13 (masih
  mengucapkan menipu/menyesatkan).
- Asisten Tanya dirapikan (ARYA, sesudahnya; deploy matra-7razqp27z):
  * Kutipan blokan menjaga SUSUNAN BARISNYA (`TombolTanyaBlok` menyalin
    isi blokan blok demi blok: tiap elemen blok satu baris, butir daftar
    "•", sel kotak contoh dipisah " · "), bukan luruh jadi satu paragraf.
  * Kutipan dan pertanyaan DIBEDAKAN: giliran siswa disimpan `{teks,
    kutipan}` (`PesanRiwayat.kutipan`, ke server digabung), di panel
    kutipan kotak abu-abu bergaris navy bercap "Yang diblok" dan
    pertanyaan gelembung emas; di PDF sama.
  * Jawaban: ganti baris tunggal dipertahankan (`<br>`), nomor daftar
    hidup lagi (preflight Tailwind mematikan list-style: langkah "1., 2."
    sempat tanpa nomor), nomor yang ditulis model dipakai apa adanya
    (`<li value>`), di PDF nomor ditulis teks. Aturan 11 di
    `lib/tanya/aturan.ts`: tiap besaran di baris sendiri, tiap langkah satu
    butir bernomor, ÷ atau pecahan a/b mengikuti materi. Satu pertanyaan
    uji sungguhan: hasilnya sesuai contoh ARYA.
  * Riwayat DISATUKAN lintas bab: tab "Riwayat (n)" memuat semua bab,
    dinamai "Trigonometri: Materi 01" plus judul pendek (`namaPercakapan`
    di AsistenTanya, `daftarRiwayat()` tanpa bab), lencana daftar materi
    menghitung semua bab, "Buka" bab lain menuju
    `/topik/<bab>?materi=<slug>&tanya=1` (panel langsung terbuka), PDF
    memuat semua bab (`mantra-tanya-<tanggal>.pdf`). Uji riwayat 24 lolos.
  * Pindah tab Materi ini / Riwayat memudar masuk 180 ms (`.tanya-isi[data-tab]`).
- Peringatan AI (ARYA, sesudahnya; deploy matra-2wbi4aawo): kotak merah
  bata di puncak percakapan Asisten Tanya, "Perhatian: jawaban AI bisa
  salah. Asisten ini membantu kamu memahami materi dan maksud pertanyaanmu,
  bukan penentu benar atau salah. Untuk memastikan jawabannya, tanyakan
  langsung ke gurumu."; kalimat serupa di kepala PDF riwayat.
- Kuis lebih ketat (ARYA, sesudahnya; deploy matra-3x5l1hn43):
  * Tiap materi harus DIBACA 2 MENIT TANPA PUTUS sebelum dicentang hijau
    (`lib/kemajuan.ts` MENIT_BACA, pencatat di HalamanTopik): mulai 0 saat
    materi dibuka, hanya berjalan saat tab terlihat (berpindah tab = jeda,
    pilihan ARYA), hangus kalau pindah materi, ke Latihan/Kuis, tutup atau
    muat ulang halaman. Kuis terbuka saat semua materi bab selesai; syarat
    10 menit total dihapus; mode guru tetap bebas. Medan simpanan tetap
    `dibuka` supaya centang lama siswa tidak hilang (pilihan ARYA).
    Penanda: cincin hijau terisi di baris materi aktif, garis emas di dasar
    bilah Kembali/Lanjut (terlihat di HP juga), teks "dibaca 0:45 dari
    2:00", syarat kuis "Baca tiap materi 2 menit tanpa putus (n/11
    selesai)". Diuji Playwright waktu nyata: hitung, hangus saat pindah,
    jeda saat tab disembunyikan, genap di 2:00 membuka kuis; di produksi
    juga.
  * Jeda 30 menit sebelum kuis boleh diulang (`JEDA_ULANG_MENIT` di
    Kuis.tsx): waktu kumpul, urutan soal, dan jawaban disimpan di
    `matra:kuis:<bab>:terakhir`, jadi memuat ulang halaman selama jeda
    tetap memperlihatkan hasil yang sama; tombol "Ulangi dalam 29:59"
    menghitung mundur; mode guru bebas jeda. Bukan pengamanan (simpanan di
    peramban siswa), sudah ditulis di komentar.
  * Pembahasan hasil SATU SOAL SEKALIGUS: peta hasil berwarna (hijau
    benar, jingga salah), Sebelumnya/Berikutnya, kartu soal dengan pilihan,
    pembahasan, dan tombol Baca Materi; bukan sepuluh kartu bertumpuk.
  * Bug: sidebar yang dikuncupkan di desktop ikut kuncup saat jendela
    dikecilkan ke laci HP (nama materi hilang). `rel` kini diabaikan di
    bawah 860 px (`KUERI_LACI`), dan pulih saat dilebarkan lagi.
- Bank Soal dan Limit 05 (ARYA, sesudahnya; deploy matra-p4ke0ndd5): menu
  nav "Latihan" jadi "Bank Soal" (alamat `/latihan` tetap), judul halaman
  `/latihan` dan `/latihan/<bab>`, kicker, remah arena. Kartu Peta Materi:
  urutan "Ulangi belajar, Kuis, Bank Soal", Kuis dan Bank Soal hanya tampil
  saat 100 persen (bank soal tetap terbuka lewat menu). Baris "Latihan · 4
  soal" di halaman belajar TETAP "Latihan" (isinya beda: pemanasan bab).
  Limit 05 mesin sifat: tabel "Kemajuan pada soal" dibuang (mengulang
  daftar langkah di lembar kerja), catatannya ke Petunjuk; langkah yang
  belum dibuka di panel sempit jadi satu baris (`globals.css` .lembar,
  ikut merapikan Limit 06). Survei Limit: 0 cacat, Limit 05 gulir 0 di
  1920 dan 84 di 1366 dengan kendali terlihat (sebelumnya 512, kendali
  tersembunyi). Teks buntu Soal 3 dibersihkan dari sebab/melainkan, dan
  "ia" di catatan Bank Soal.
- Beranda (ARYA, sesudahnya; deploy matra-kt3z7yrbx): kartu fitur keempat
  "Tanya langsung saat bingung" (nomor emas, kelas `sorot-tanya`), judul
  seksi "Empat hal yang kamu dapat di sini", kalimat hero ditambah "dan yang
  masih bingung bisa ditanyakan langsung"; kartu Claude di Tentang menyebut
  Asisten Tanya. Kisi `auto-fit` menampung empat kolom di 1366 dan 1920,
  satu kolom di HP (dicek Playwright). Saran saya yang diterima: TIDAK ada
  kartu kelima; empat kartu = satu cerita (tonton, coba, uji, tanya), dan
  hal praktis (tanpa akun, bisa dipasang, video tersimpan di HP) sudah
  terwakili tombol Pasang dan kalimat "tersimpan di HP-mu".

## 21 SEP: BAHASA SISWA DISISIR DARI KATA "AI BANGET" (deploy matra-3nm88oros, push GitHub ea533d3)

Keputusan ARYA (21 Sep dini hari) atas daftar yang saya buat sendiri:
ganti/hapus kata ganti "ia" untuk benda; "sebab, melainkan, justru,
sekadar, lazim, nyaris, kelak"; pembuka dramatis KECUALI "perhatikan",
"bayangkan", "inilah/itulah sebabnya", "di sinilah" (yang dibuang: "bukan
kebetulan", "bukan hiasan"); benda yang dihidupkan KECUALI "rumus lahir"
(dibuang: grafik bercerita, menutup perkara, memancing keluar, kembaran,
bersaudara); cap penyemangat buatan; kata penguat kosong HANYA "Catatan
jujur"; dan "menggoda/menipu/menyesatkan" dengan "tampak benar karena"
sebagai pengganti di pengecoh.
- Alat baru `alat/sapu_bahasa.py`: `hitung` (per pola per berkas), `daftar
  <pola>` (kalimatnya), `ganti` (kata sambung otomatis di content/ saja:
  sebab jadi karena, melainkan jadi tetapi, justru jadi malah, sekadar jadi
  cuma, lazim jadi biasa, nyaris jadi hampir, "menggoda karena" jadi
  "tampak benar karena"): 259 baris. `alat/sapu_bahasa_tangan.py`: 268
  penggantian tangan yang butuh kalimat baru ("ia" jadi nama bendanya,
  misalnya "Ia cuma garis" jadi "Garis regresi cuma garis"; "Godaannya kuat
  karena" jadi "Terasa benar karena"; "Yang menggoda:" jadi "Yang terasa
  benar:"; "bukan kebetulan" jadi "memang selalu begitu"/"ada sebabnya";
  "bukan hiasan" jadi "penting"/"ada gunanya"; judul materi Statistika 13
  jadi "Grafik yang memberi kesan keliru", Statistika 01 "Kenapa satu angka
  bisa memberi kesan keliru", Grafik Fungsi 01 "Membaca grafik seperti
  membaca cerita", Ruang 3D label "Gambar yang mengecoh mata"; kalimat skor
  kuis jadi apa adanya: "Masih banyak yang salah", "Setengahnya benar",
  "Sudah bagus", "Bab ini sudah kamu kuasai"). Sepuluh teks antarmuka di
  components dan halaman Tentang ikut. Semua keputusan kata tersimpan di
  berkasnya, bukan hanya di chat.
- Yang SENGAJA tidak disentuh: komentar kode (tidak dibaca siswa), "ia"
  untuk orang ("Perajin ... Ia menggambar SATU"), kata "sebab-akibat" (nama
  konsep), "soal cerita" dan "cerita perahu" (bukan personifikasi), slug dan
  nama berkas video (`grafik-menyesatkan`, `satu-angka-menipu`,
  `statistika13-menyesatkan.mp4`: kunci kemajuan siswa dan R2), dan SEMUA
  naskah video (suara sudah direkam; subtitle wajib sama huruf demi huruf).
  Akibatnya narasi video Statistika 01 dan 13 masih mengucapkan "menipu" dan
  "menyesatkan" sementara judul materinya sudah diganti; menyamakan berarti
  merekam ulang dua naskah (ElevenLabs) dan merender ulang.
- Gerbang: tsc, cek_rumus_materi 0 galat, cek_rumus 0 galat, cek_kuis
  --semua --ketat lolos, cek_kuis_bab lolos, cek_urutan_belajar 6 temuan
  lama (sudah ada sebelum sapuan, diperiksa lewat stash), bekal 106 materi
  dibuat ulang, build, deploy; halaman Statistika 13 di produksi diperiksa
  Playwright: judul baru tampil, tak ada sisa kata terlarang.
- Kata yang tetap ada dan memang diizinkan: "persis", "memang", "sungguhan",
  "Perhatikan", "Bayangkan", "Itulah sebabnya", "Di sinilah", "rumus lahir".

## 21 SEP DINI HARI: VIDEO TRIGONOMETRI 11 SUDUT BERELASI TAYANG; JATAH ASISTEN 5 PER IP; JUDUL KOTAK PENGECOH (deploy matra-pd4z8zwyl, push GitHub 4f4a3eb)

- ARYA (20 Sep malam): "Hapus 'kenapa pilihan yang lain menggoda/menipu',
  bahasanya jelek banget" (judul kotak pengecoh di pembahasan). Diganti
  "Kenapa yang lain salah" (`components/latihan/Pembahasan.tsx`, dipakai
  Latihan dan Kuis). Kata "menggoda" masih dipakai 41 kalimat jebakan di
  bank soal ("Pilihan B menggoda karena ..."), belum diganti, menunggu kata
  pilihan ARYA. ARYA juga minta daftar bahasa "AI banget" yang sering saya
  pakai; jawabannya di chat, belum ada penyisiran teks.
- Jatah Asisten Tanya diturunkan ARYA dari 20 jadi 5 pertanyaan per IP per
  hari (`lib/tanya/pembatas.ts` bawaan 5, teks panel, CLAUDE.md). Diuji di
  produksi: sisa 4 sesudah satu kiriman; kunci IP uji dihapus lagi. Catatan:
  per IP berarti satu sekolah yang berbagi wifi hanya dapat 5 sehari.
- Video materi 11 `tahap11-sudut-berelasi` (Lingkaran Satuan dan Sudut
  Istimewa, Bagian 4): naskah 17 segmen, 3.460 huruf, Bian ElevenLabs satu
  permintaan, 4 menit 38 detik; adegan `manim/scenes/tahap11_sudut_berelasi.py`
  (P pada 40 derajat, segitiga kecilnya DIPUTAR 90 derajat sehingga sisi biru
  yang tadinya mendatar berdiri tegak: bukti visual sin dan cos bertukar
  peran; lalu cermin ke kiri, balik ke seberang, cermin ke bawah, tiap relasi
  lahir di dekat Q lalu terbang ke panel; angka romawi kuadran plus
  keterangan tanda di ruang kerja; panah 90 dan 180 derajat; sering keliru
  (-cos, sin) dicoret dan diperiksa dengan cos 130 = -0,64). Gerbang:
  cek_kode, cek_pemicu_urut (85 pemicu, terlambat terbesar 0,033 s),
  cek_pembuka_video, cek_subtitle, cek_layar_kosong, cek_aset_video,
  buat_poster (detik 100). Lembar kontak 480p dibuka dua kali dan 1080p dua
  kali; yang diperbaiki dari situ: label 40 derajat menindih sisi miring,
  0,64 dan -0,64 jatuh di garis lingkaran, 0,77 menindih busur, "130
  derajat" di dalam segitiga Q, teks "I: semua positif" menindih P, panah
  90 derajat melintasi label y (label disembunyikan sementara) dan
  menyentuh label P, cek angka keluar bingkai kanan (tangkapan qc), layar
  kosong 6 detik di awal segar-ingat (pertanyaan ditahan sampai nama sub-bab
  disebut). mp4 9,5 MB diunggah ke R2 (62 video cocok), `video` di
  tahap.ts, bekal trigonometri dibuat ulang, deploy; di produksi video
  termuat dari Worker (durasi 278,27 s, satu jalur subtitle).
- Belum: video 07 (Sudut istimewa) masih menutup dengan "materi berikutnya,
  Grafik Fungsi Trigonometri, Bagian 1", padahal urutan belajar sekarang 07
  lalu 11; memperbaikinya berarti merekam ulang seluruh naskah 07 (satu
  permintaan ElevenLabs, 2,9 ribu huruf) dan merender ulang 1080p. Kuota
  ElevenLabs sesudah video ini kira-kira 27 ribu huruf sampai 14 Okt.

## 20 SEP: KUIS BAB V2 (SATU PAKET 10 SOAL TERKURASI, PENILAIAN DULU, PEMBAHASAN BERGAMBAR DI AKHIR), MATERI TRIGONOMETRI 11 SUDUT BERELASI, ASISTEN TANYA TAYANG (deploy matra-gicw5xh4u, push GitHub aa895ac)

ARYA melihat tiga soal kuis Trigonometri (k48, k50, k59, "sangat sulit")
yang konsepnya tidak ada di materi, dan pembahasan satu kalimat yang tidak
menjelaskan. Keputusannya: 10 soal per paket; materi Sudut Berelasi lengkap
(bacaan, widget, video); kuis = penilaian, jawab semua dulu, pembahasan di
akhir; soal bergambar dibahas dengan gambar; soal salah diberi tombol ke
materinya; Asisten Tanya juga menautkan materi dengan namanya. Rancangan:
`docs/superpowers/specs/2026-09-20-kuis-bab-v2-sudut-berelasi-design.md`.
- KURASI `KUIS_BAB` sembilan bab (90 soal dari bank 540): tiap soal dibaca
  lalu dicocokkan dengan bacaan materinya (grep kata kunci di `tahap.ts`);
  yang konsepnya tidak tertulis dibuang dari kuis bab (radian, elevasi,
  determinan, desil, r², transformasi data, sin 2x, dot product 3D, dan
  sebagainya tetap ada di menu Latihan). Pemeriksa baru
  `alat/cek_kuis_bab.mjs`: 10 butir, id ada di KUIS, materi ada di TAHAP dan
  siap, tiap sub-bab (kecuali Penerapan) terwakili, soal bergambar punya
  langkah bergambar. Semua bab lolos.
- `components/topik/Kuis.tsx` ditulis ulang: urutan soal dikocok
  (`kocok` di lib/acak-pilihan.ts; lib/soal-acak.ts dihapus), pilihan dikocok
  per benih tab, peta soal 1 sampai 10 (terisi = terjawab, benar/salah belum
  ditunjukkan), Sebelumnya/Berikutnya, Kumpulkan (jendela konfirmasi bila
  ada yang kosong), halaman hasil: skor menghitung, tiap soal dengan pilihan
  siswa dan kunci, pembahasan lewat komponen bersama
  `components/latihan/Pembahasan.tsx` (dicabut dari ArenaLatihan, jadi
  Latihan dan Kuis satu perender), jebakan, tombol "Baca Materi NN · Nama"
  yang memanggil `pilihLayar`. Skor terbaik tetap `matra:kuis:<bab>` (kini
  dari 10; rekor lama dari 8 tampil apa adanya), hasil terakhir
  `matra:kuis:<bab>:terakhir`. `IsiTopik.kuisBab`, `ButirKuisBab` di tipe.ts.
- Materi Trigonometri 11 `sudut-berelasi` (sub-bab B jadi [5, 6, 7, 11]):
  bacaan θ + 90°, 180° − θ, 180° + θ, 360° − θ, 90° − θ dari lingkaran
  satuan dengan contoh 40°, tabel lima relasi, poin tanda per kuadran, catatan
  radian (untuk k50), sering keliru −cos θ vs −sin θ; widget
  `components/widget/SudutBerelasi.tsx` (P diseret di kuadran I, Q mengikuti
  relasi yang dipilih, tabel angka P dan Q di kolom kanan). cek_rumus_materi
  0 galat, survei alat 0 cacat, uji Playwright 1280 dan 390. VIDEO BELUM:
  `tahap11-sudut-berelasi` menyusul (naskah v3.1, Bian, kira-kira 4 ribu
  huruf ElevenLabs).
- Asisten Tanya (ARYA memasang ANTHROPIC_API_KEY dan Upstash siang ini):
  uji 50 pertanyaan `alat/uji_tanya/jalankan.mjs` lewat dev server: 231 detik,
  Rp 6.611 (Rp 132 per pertanyaan; cache prompt terbaca 216 ribu token),
  jawaban benar semua yang dibaca, penolakan luar topik dan injeksi bekerja.
  Tiga perbaikan dari hasilnya: model memakai **tebal** dan em-dash (aturan
  10 kini teks polos, renderer tetap menghormati tebal dan daftar), model
  mengarang slug `[[integral:aturan-pangkat]]` (bekal kini memuat DAFTAR
  MATERI BAB INI, aturan 4 hanya boleh slug dari daftar, renderer membuang
  slug tak dikenal), dan tautan kini tombol "Materi 05 · Lingkaran satuan"
  yang membuka materinya di halaman yang sama (`onBukaMateri` dari rangka).
  Hasil uji tersimpan `alat/uji_tanya/hasil-2026-09-20.md`. Env produksi
  Vercel: ANTHROPIC_API_KEY, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
  (sensitive, tanpa TANYA_TANPA_PEMBATAS). Produksi diuji: satu jawaban
  sungguhan (sisa 19), 20 kiriman berikutnya lolos, ke-21 ditolak 429
  dengan kalimat ramah, kunci jatah IP uji dihapus dari Upstash sesudahnya.
  Jebakan: mengedit berkas web/ saat uji berjalan membuat dev server
  mengembalikan 500 ke semua permintaan (impor yang hilang sesaat), jadi 24
  pertanyaan pertama harus diulang.
- Belum: batas belanja bulanan di Console Anthropic (hanya ARYA yang bisa),
  video materi 11, pemantauan jawaban bersama ARYA.

## 19 SEP: JENDELA SKOR TIDAK LAGI MUNCUL TIAP SOAL SALAH DIPERBAIKI (deploy matra-lb02q867e, push GitHub 242ea60)

ARYA: siswa yang kembali dengan 15 soal tersimpan lalu memperbaiki soal
salahnya satu per satu disodori jendela skor tiap kali Periksa ditekan
(syaratnya "semua 15 soal punya jawaban" terpenuhi lagi tiap kali). Usul
ARYA: hapus semua jawaban salah saat mulai menjawab ulang; dipilih cara 2
(tanpa menghapus): jendela skor hanya dibuka bila semua soal terjawab DAN
tidak ada lagi soal yang masih bertanda "salah dari kunjungan sebelumnya"
(`salahLalu`). Tanda merah di peta soal tetap ada sampai soalnya dikerjakan
ulang; "Kerjakan ulang yang salah" tidak berubah.
- `components/latihan/ArenaLatihan.tsx` `periksaJawaban`: satu syarat.
- Uji Playwright (konteks bersih, /latihan/turunan mudah): 15 soal dijawab,
  jendela skor muncul tepat sekali ("3 benar, 12 salah"); muat ulang
  (kunjungan baru), 12 soal salah dijawab ulang: 11 pertama tanpa jendela,
  yang ke-12 memunculkannya sekali. Jendela lencana yang ikut muncul saat
  lencana diraih ditutup lewat Lanjut di ujinya.

## 18 SEP (8): GRAPHIFY DIPERBARUI PENUH DENGAN GROK (dokumen, bukan hanya kode)

ARYA: "update ulang graphify, kali ini gunakan LLM Grok yang sudah saya pasang".
- Peta sebelumnya hanya kode (AST) plus sisa ekstraksi dokumen 3 Sep; 86
  dokumen yang berubah sejak itu (PROGRESS, docs/tugas, docs/superpowers,
  docs/desain-mantra, arsip sesi, riset deep-learning-manim) hanya punya
  25 simpul. Sekarang 776 simpul dari dokumen-dokumen itu: laporan Vektor 77,
  MANTRA-INTEGRAL 48, alur belajar Turunan 42, Transformasi 41.
- Hasil: 4989 simpul, 9495 sisi, 547 komunitas bernama (95 persen
  EXTRACTED); dibanding pagi (4480 simpul, sebelum Grok). Grok 4.6 lewat
  9router, `graphify extract . --backend grok --token-budget 6000
  --max-concurrency 4`: 85 dokumen jadi 76 kiriman, 2 jam (17:00 sampai
  19:00), 474 ribu token masuk, 906 ribu keluar, gratis. Lima dokumen
  terpotong di batas keluaran (hasil sebagian dipakai): INVENTORY,
  MANTRA-TURUNAN-INTEGRAL, MANTRA-TRANSFORMASI-GEOMETRI, dan dua lagi;
  PROGRESS.md (30 ribu kata) hanya menghasilkan 9 simpul, memang catatan
  harian, bukan dokumen konsep.
- `.graphifyignore` (baru): salinan kode 3b1b di `deep-learning-manim/
  sources/` (2819 simpul asing) dan semua media (1192 mp3 narasi, poster,
  foto, tangkapan layar, render) dikeluarkan dari peta.
- Nama komunitas sekarang bahasa Inggris (penamaan Grok lewat `graphify
  label`); yang lama Indonesia. Kalau mengganggu, bisa diterjemahkan.
- Jebakan: kiriman 30 ribu token (percobaan pertama, dibatalkan) menjejalkan
  lima dokumen per jawaban dan mengisi cache dengan hasil tipis; cache-nya
  dihapus sebelum diulang dengan 6000. `graphify cluster-only` TIDAK memanggil
  LLM kalau komunitas berubah; harus `graphify label` sesudahnya. Hook
  post-commit hanya AST (gratis), lapisan dokumen dipertahankan.

## 18 SEP (7): BERKAS LOMBA PPPMI DISESUAIKAN DENGAN PEMBARUAN SITUS 15-18 SEP (di D:\PPPMI-2026, bukan repo)

Permintaan ARYA: perbarui berkas Word di folder kirim tanpa mengembalikan
apa pun yang sudah ia hapus. Caranya: isi tiap berkas dibandingkan dengan
versi terakhir skrip (difflib) untuk mengetahui suntingan ARYA, lalu HANYA
disisipkan paragraf, butir, dan baris tabel baru lewat
`D:\PPPMI-2026\kerja\sisip_18_09.py` (python-docx, di tempat; cadangan di
`kerja\lama\*-sebelum-18-09.docx`). Yang masuk: video di Cloudflare R2 dan
simpanan di perangkat, bank soal (peta soal, kocok, jendela skor, lencana,
?tingkat=), rumus KaTeX, 39 foto galeri Wikimedia Commons (CC0 7, domain
publik 4, CC BY 10, CC BY-SA 18) dengan baris atribusi baru, tautan YouTube
per sub-bab (118 tautan, 40 sub-bab, 25 kanal), kolom alat, lembar kerja,
gerak yang menghormati "kurangi gerak"; angka video 216 menit, rata-rata 3,8
menit, 9 MB. Atas izin ARYA: sel 09 "tidak ada gambar pihak ketiga" (kini
salah) diubah, tanggal keadaan 18 Sep, baris ChatGPT (logo) ditambahkan ke
tabel AI berkas 08 karena 09 menyebut logo dibuat dengan ChatGPT. 03
Deskripsi tetap 5 halaman (Gambar 1 dikecilkan 16,6 ke 13 cm).
- Video demo DIREKAM ULANG (ARYA: "ya direkam aja ulang") memakai situs 18
  Sep: alat A2 lewat kendali Besar segitiga dan Sudut θ, bank soal lewat ubin
  Mudah, Periksa jawaban, jendela lencana "Langkah pertama" ditutup lewat
  tombolnya, Berikutnya; kartu cara kerja: Cloudflare R2, ElevenLabs (Bian),
  36 pemeriksa, "105 materi dan 540 soal, disusun mengikuti urutan materi SMA"
  (tanpa menyebut buku panduan). Hasil 5:49, `kerja/demo/06-Video-Demo-tanpa-suara.mp4`
  disalin ke folder kirim; 07-Naskah: kolom Waktu dan durasi diperbarui di
  tempat, "dua puluh tujuh" jadi "tiga puluh enam" pemeriksa. Jebakan baru:
  tombol pilihan jawaban tidak bisa dicari lewat nama aksesibilitas (huruf
  di lencana .huruf, isi KaTeX aria-hidden), pakai `main button:has(> .huruf)`;
  jawaban benar pertama memunculkan <dialog> lencana yang menelan klik
  berikutnya.

## 18 SEP (6): SISTEM GERAK PANGGUNG TAHAP 4 (TERAKHIR): KORSEL, PEMUTAR, GULIR, 404, AUDIT (deploy matra-m78yjl1sn, push GitHub 9430af0)

Rencana `docs/superpowers/plans/2026-09-17-sistem-gerak-panggung.md` selesai
semua (tahap 1 sampai 4). Penyimpangan dan hasil audit: `docs/desain-mantra/gerak/KEPUTUSAN.md`.
- Korsel beranda (`Demo.tsx`): rel 500 ms `--kurva-pindah`; titik aktif
  melebar lewat TRANSFORM saja (dua tutup bulat `::before`/`::after` bergeser
  11 px + ruas tengah direntangkan, tetangga bergeser lewat `:has`), tampak
  sama dengan versi `width`; penanda memuat jadi balok bernapas seukuran
  kotak (`putar` dicabut). TIDAK ada pergantian otomatis 7 s walau spek
  memintanya: ARYA mencabutnya 5 Sep.
- Pemutar video: lencana "+5 detik" selalu terpasang (`data-tampil`: muncul
  seketika, tahan 700 ms, pudar 200 ms, tulisan tetap); kotak galat memudar
  masuk 200 ms; saklar subtitle transisi warna 140 ms. `.tombol-putar`,
  gagang saklar, batang simpan tidak ada di MANTRA (kendali bawaan, tombol
  teks, kotak centang), dilewati.
- `MunculSaatGulir`: kelas `.muncul-gulir[data-tampil]` (naik 12 px + pudar
  400 ms), threshold 0,2, rootMargin -40 px, unobserve, atribut ditulis ke
  DOM. `LogoParalaks` mati di layar sentuh. 404: grafik tan jadi
  `GrafikTan.tsx` (klien) yang mengunci gambar sesudah 2,2 s; reduced motion
  langsung tergambar. `SedangMemuat` setinggi panggung (`.memuat-panggung`).
- Mikro: `:focus-visible` universal (dulu hanya a, button, .tombol); pil
  emas transisi background 160 ms lewat token; `.nyala` tetap seketika.
- Pergeseran tata letak halaman materi 0,0006 (baris "Simpan video" muncul
  sesudah hidrasi) DIHILANGKAN: tempatnya dipesan sejak render server,
  tersembunyi sampai pemeriksaan simpanan selesai. Layout Shift lima
  halaman = 0.
- Audit lewat playwright-cli run-code: reduced motion (emulasi), Layout
  Shift, jendela keluar (fokus awal, Tab terkurung, Esc, fokus kembali),
  Berikutnya 5 kali cepat (1 ke 6), Lanjut 3 kali cepat (01 ke 04), grep
  keyframes terlarang; BELUM: 60 fps CPU 4 kali (tidak ada alat profil).
- Cek: tsc, eslint (react-hooks/set-state-in-effect memaksa MunculSaatGulir
  menulis DOM langsung), build, playwright 1280 dan 390.

## 18 SEP (5): TAUTAN YOUTUBE LANGSUNG KE VIDEONYA (HP), PENCARIAN KANAL JADI CADANGAN (deploy matra-1ppgt2s5x, push GitHub 93df0ce)

ARYA: pencariannya cocok, tetapi di HP tautan pencarian di dalam kanal
dibuka aplikasi YouTube sebagai beranda kanal saja (di desktop atau bila
disalin, langsung ke videonya). Pilihan ARYA: tautan utama langsung ke
video yang sudah diperiksa, pencarian kanal tetap ada sebagai cadangan.
- `content/tipe.ts` `Kanal` bertambah `video?` (ID) dan `judul?`;
  `kanal(K.x, 'kata', 'ID', 'judul')` di `content/kanal-youtube.ts`. ID
  dan judul DITULIS ALAT (`periksa --tulis`), bukan tangan: 118 tautan di
  40 sub-bab semuanya ber-ID.
- `alat/cek_kanal_youtube.mjs periksa [--tulis]`: memakai video tersimpan
  kalau masih ada di 10 teratas pencarian kanal, kalau tidak "video hilang"
  (gagal); `--tulis` menanam atau mengganti ID lewat pola persis per entri
  (kata kunci yang sama dipakai dua sub-bab, Transformasi C dan F, jadi
  pola longgar menimpa entri yang salah) dan HANYA kalau video teratasnya
  layak: pencarian kanal BIG Course sesaat mengembalikan video Transformasi
  Geometri untuk "trigonometri dasar" dan sempat tertulis; sekarang ditolak
  ("tidak ditulis: judul tidak cocok").
- HalamanTopik: judul videonya jadi tautan (`watch?v=ID`, terbuka di
  aplikasi YouTube), di bawahnya nama kanal, handle, dan tautan kedua
  "lainnya di kanal ini" (`.tautan-kanal`) ke pencarian topik itu di kanal
  tersebut; pengantar kotak menjelaskan keduanya.
- Cek: `periksa` 118/118 lolos ("semua tautan lolos"); playwright-cli 390 px
  Integral 01 dan Trigonometri 01 (href `watch?v=`, judul, tautan kanal);
  tsc, eslint, build.
- Belum dilakukan (menunggu ARYA): m4th-lab masih terbanyak (25 dari 118),
  Matematika Hebat dan BIG Course 15; Grafik Fungsi F dan Statistika C
  hanya dua tautan. Berikutnya: sistem gerak tahap 4 kalau ARYA "lanjut".

## 18 SEP (4): TAUTAN YOUTUBE PER SUB-BAB, KREATOR DIGILIR; BERANDA DAN TENTANG (deploy matra-bjxj2274n, push GitHub 9ae49a1)

ARYA: tautan YouTube harus mengikuti nama sub-bab (Integral A "Membalik
Turunan" diberi "integral substitusi" yang belum diajarkan), jangan
m4th-lab dan Bimbel SMARRT terus, boleh kreator lain asal ramai; beranda
"Tujuh bab" sudah basi dan menempel ke kaki; Tentang jangan membingkai
peruntukannya ("siswa yang sudah bisa memakai rumus").
- `content/tipe.ts` `KanalPerSubbab`; `content/kanal-youtube.ts` daftar 30
  kanal Indonesia beserta subscriber (dibaca dari YouTube 18 Sep); tiap
  `content/<bab>/latihan.ts` `KANAL` per huruf sub-bab, 40 sub-bab, 113
  tautan hasil pencarian di dalam kanal dengan kata kunci sesuai sub-bab
  (pilihan ARYA: tetap pencarian kanal, bukan video tunggal). 22 kreator
  dipakai (Ruangguru tidak: videonya tidak muncul di pencarian topik).
- `alat/cek_kanal_youtube.mjs` (baru, tanpa API key): `cari` pencarian
  YouTube umum (judul, tonton, kanal), `kanal` subscriber, `uji` pencarian
  di dalam kanal, `periksa` memeriksa semua tautan: video teratas ada,
  judul cocok lebih dari separuh kata kunci, >= 25 rb tontonan, kanal >=
  100 rb subscriber atau video >= 75 rb; permintaan dijeda 2,5 detik dan
  429 ditunggu (YouTube membatasi sesudah kira-kira 60 permintaan cepat).
  Hasil: 113 tautan lolos. Sub-bab yang hanya punya dua tautan layak:
  Grafik Fungsi F, Statistika C.
- HalamanTopik: kotak YouTube menyebut sub-babnya ("Untuk sub-bab A ·
  Membalik Turunan"); Latihan dan Kuis memakai kanal pertama tiap sub-bab.
  `tsconfig` `allowImportingTsExtensions` supaya berkas isi bisa mengimpor
  `../kanal-youtube.ts` dan tetap terbaca Node oleh pemeriksa.
- Beranda: "Bab demi bab, tersusun seperti buku" (tanpa angka), bagian
  akhir diberi jarak 56 sampai 96 px ke kaki. Tentang: "Tujuannya memperkuat
  dan memperjelas pemahaman siswa tentang inti matematika itu sendiri: dari
  mana sebuah rumus datang, kenapa bentuknya begitu, dan kapan ia boleh
  dipakai."
- Cek: periksa 113/113, playwright-cli Integral 01 dan Latihan, beranda,
  Tentang; tsc, eslint, build.

## 18 SEP (3): SISTEM GERAK PANGGUNG TAHAP 3, LACI DAN PANEL HALAMAN BELAJAR (deploy matra-4wpzgflnm, push GitHub c4b39a8)

- `HalamanTopik.tsx`: `pilihLayar` satu handler (arah geser + tutup laci +
  ganti layar lewat `startTransition`, supaya materi lama tetap hidup selama
  materi baru dirakit, 300 sampai 400 ms di produksi); isi bacaan dibungkus
  `.panggung-isi key={layar} data-arah` (Lanjut atau materi lebih belakang
  dari kanan, Kembali dari kiri, 280 ms, fill backwards); kolom alat
  di-`key` per layar sehingga isinya memudar masuk; remah `.kini` memudar;
  tirai laci selalu dirakit (`data-buka`, memudar keluar, di desktop
  `display: none`), laci masuk 400 keluar 300 dengan visibility tertunda;
  kuncup pohon: label memudar 140 ms (state `memudar`) baru kolom menyempit
  400 ms, satu panah togel berputar; mode fokus: kolom pohon ke 0 px
  bertransisi (bukan display none) lalu visibility hidden; lencana kuis
  "Terkunci" ke "Siap" menyala sekali (`data-baru`); video dan alat-sisip
  memudar masuk saat bertukar di HP; `LaciLanjut`: panel naik masuk 400 ms,
  batang `scaleX` menyusul 80 ms.
- `TeksMat.tsx`: hasil per teks disimpan lintas komponen (3000 teks) supaya
  kunjungan ulang materi tidak mengurai dan merender KaTeX lagi.
- Diukur (dev server): sebelum, bingkai pertama sesudah klik Lanjut 750 sampai
  880 ms (halaman beku); sesudah startTransition 216 ms (produksi lama 300
  sampai 430 ms, togel 21 ms). Dicek playwright-cli 1280 (Lanjut, Kembali,
  kuncup, lebar, fokus, Lanjutkan) dan 390 (laci buka, pilih, Esc), gulir
  kolom 0 saat pindah materi, transform tidak tertinggal. Produksi sesudah
  deploy: bingkai pertama 22 ms, isi berganti 350 sampai 690 ms pada
  kunjungan pertama (widget besar), 179 ms pada kunjungan ulang.
- Penyimpangan dari rancangan dicatat di `docs/desain-mantra/gerak/KEPUTUSAN.md`
  (tanpa portal, tanpa lipatan sub-bab, tanpa min-height alat-sisip).

## 18 SEP (2): TEKS ALAT KATEX, GALERI DUNIA NYATA BERFOTO, PANEL TEKS JADI LEMBAR KERJA (deploy matra-23wwmzjhe, push GitHub 02e76fb)

ARYA (enam tangkapan layar): teks alat interaktif belum bergaya bank soal
(KaTeX); galeri dunia nyata banyak yang cuma grafik ("ya pakai foto yang
nyata dong"); alat Integral berbasis teks terlihat kosong dan hancur saat
kolom disempitkan. Pilihan ARYA: Limit, Turunan, Integral foto + grafik
kecil di bawahnya, bab lain foto saja; ketiganya dikerjakan sekaligus.
- KaTeX di teks alat: komponen kendali (`Angka`, `Koordinat`, `Pilihan`,
  `Petunjuk`) menata nama, arti, label pilihan, dan petunjuknya lewat
  `TeksMat`; tabel angka, cap, catatan, dan Petunjuk berekspresi di 9
  berkas Panggung dan 13 widget Statistika dibungkus lewat
  `alat/katex_widget_codemod.py` (sekitar 540 tempat). Rumus KaTeX di label
  tidak boleh patah; nilai tabel yang panjang boleh patah sesudah tanda =
  (baris tegas 20 px sempat meluber). Survei: 1.293 rumus tertata, 0 gagal.
- `components/widget/Lembar.tsx` (baru): lembar kerja bernomor untuk Limit
  05 dan 06, Integral 03, 04, 08: kotak soal, langkah dengan nomor, nama,
  isi, syarat; langkah yang belum dibuka tergambar redup (peta kerja tanpa
  bocor jawaban); kemajuan berbatang; kolom nama pindah ke atas saat PANEL
  sempit (container query, bukan lebar layar; kolom 300 px di laptop pun
  rapi). Integral 04 jadi kisi kartu pasangan (∫ f dx = F + C, cocok hijau,
  belum cocok bata). Semua rumusnya ditulis ulang berlambang (∫₀³ ..., lim
  x→2 ..., [x³/3]₁³, u^(3/2)/3 + C).
- `components/widget/GaleriNyata.tsx` (baru): kartu galeri bersama (foto
  utuh, grafik kecil opsional, nomor, judul, kalimat KaTeX, baris rumus,
  kredit). 25 foto Wikimedia Commons berlisensi bebas dicari dan diunduh
  lewat `alat/cari_foto_commons.mjs` (API Commons, saring lisensi dan
  bentuk mendatar, lembar kontak calon), dikecilkan `alat/kecilkan_foto.py`
  (1000 px, di bawah 150 KB; dua foto 820 px), dicatat di `sumber.json`
  (pemotret, lisensi, halaman); pemotret 4 foto lama Trigonometri dilengkapi.
  Enam galeri (Limit, Turunan, Integral, Ruang 3D, Statistika, Transformasi)
  berfoto; teks Ruang 3D dan Transformasi disesuaikan dengan fotonya (balon
  udara, simpang susun, bianglala). Trigonometri, Grafik Fungsi, Vektor
  ikut memakai komponen bersama sehingga kreditnya seragam (syarat CC BY).
- Cek: playwright-cli 1920, 1366, kolom 300 px, HP 390 (Integral 04, 08,
  Trigonometri 10, Turunan 12); survei 105 widget 0 cacat; tsc, eslint,
  next build.

## 18 SEP: KOLOM ALAT: GAMBAR, KENDALI, DAN TABEL ANGKA TERLIHAT BERSAMA (deploy matra-pcmvfqdyn, push GitHub a78bd2a)

ARYA (dua tangkapan layar Turunan 03): di jendela lebar penggeser dan tabel
angka terdorong keluar layar oleh dua papan yang membesar; di jendela sempit
alatnya terlihat tetapi gambarnya kelewat kecil; "gambar 3 dan 4 harus bisa
dilihat bersama-sama". Juga bertanya kenapa jejak di papan bawah garis lurus
(jawab: papan bawah menggambar KEMIRINGAN kurva atas; untuk x² kemiringannya
2x, memang garis lurus; itulah isi materinya).
- `components/topik/KolomAlat.tsx` (baru): kolom alat mengukur tinggi kepala,
  kendali, dan tabel, lalu mengecilkan gambar SECUKUPNYA supaya semuanya muat
  tanpa gulir, dengan tiga tingkat: (1) dikecilkan hanya kalau hasilnya masih
  380 px atau lebih (huruf di gambar berukuran tetap dalam satuan gambar,
  jadi yang menentukan terbaca adalah lebar piksel); (2) kalau tidak, gambar
  dibiarkan selebar kolom dan kendali menggulir di bawah gambar yang lengket
  (laptop 1366 x 768: kolomnya 381 px, gambar tidak pernah dikecilkan);
  (3) gambar yang kelewat tinggi sampai kendali pertamanya tersembunyi
  dikecilkan sampai menyisakan 150 px, paling jauh ke skala 0,6. Isi kotak
  gambar diukur SEMUA anaknya (Integral 02 dan 07 menaruh dua papan tanpa
  pembungkus) lewat scrollHeight, lebar lewat getBoundingClientRect (svg tidak
  punya offsetWidth). Lebar kolom bawaan ikut layar: 28 persen lebar jendela,
  380 sampai 560 px (1920: 537 px).
- `globals.css`: kolom alat jadi grid `max-content` (baris `auto` memeras
  kotak gambar ber-overflow-hidden sampai 107 px); kolom 500 px ke atas
  (`data-lebar="lebar"`) menaruh kendali dan tabel angka BERDAMPINGAN,
  kendali membentang dua baris supaya catatan mengisi bawah tabel, kendali
  tunggal (tanpa tabel) selebar kolom, `align-content: start` supaya tombol
  tidak diregangkan; galeri contoh nyata tetap selebar kolom.
- Widget berpapan dua (Turunan 03 dan 08 GrafikTurunan, 05 SusunPolinom;
  Integral 02 NaikPangkat, 07 LuasYangTumbuh) memakai papan pendek
  `PAPAN_DUA` (250 dan 230, bukan 320 dan 320): `Jendela.tinggi` opsional
  dibaca `kotakUntuk` di `keLayar`, `keMatematika`, `Bidang` (turunan dan
  integral). Dua papan pendek berdampingan dengan kendali TERLIHAT BERSAMA:
  Turunan 03 di 1920 x 937 gambar 411 px, penggeser, fungsi, dan tabel
  tanpa gulir; di 1366 x 768 kedua papan selebar kolom, penggeser terlihat,
  tabel menggulir.
- `alat/survei_alat.mjs` (baru): membuka semua 105 materi berwidget di
  1920 x 937 dan 1366 x 768 (playwright-core dari @playwright/cli global,
  Chromium yang sudah terpasang), mengukur gulir kolom, skala gambar, luber
  samping, kendali pertama terlihat; `--potret <folder>` menyimpan potret.
  Hasil akhir: 0 cacat; 75 materi muat seluruhnya di 1920 x 937; 30 masih
  menggulir di situ (9 galeri contoh nyata yang memang menggulir, 21 widget
  berkendali panjang: gambar sudah penuh dan kendali pertama terlihat, sisa
  kendali dan tabel menggulir); di 1366 x 768 kendali menggulir di bawah
  gambar lengket (rancangan 5 Sep), gambar tidak pernah dikecilkan.
- Nilai tabel angka di halaman belajar tidak patah baris lagi ("(1, -1)"
  sempat jadi dua baris saat tabel berdampingan dengan kendali).
- Cek: playwright-cli 1920, 1366, HP 390 (alat sisip), sapu penggeser
  Turunan 03 (jejak terbentuk, tabel berubah), tsc, eslint, next build.

## 17 SEP MALAM (5): KOTAK CONTOH DI HP TIDAK MEMOTONG RUMUS

ARYA (tangkapan layar Turunan 03 di HP): rumus di kolom sempit patah di
tengah ("= 4 + h" jatuh ke baris sendiri), "menuju 4" terpisah.
- Di layar sempit (media 640 px) tabel kotak contoh TIDAK lagi dipaksa jadi
  kolom: tiap baris jadi blok, sel pertama (label langkah) di baris sendiri,
  sel berikutnya mengalir selebar kotak sebagai inline-block (tinggi pecahan
  ikut dihitung, rumus utuh, patah hanya kalau lebih lebar dari layar).
  Tabel angka pendek (semua sel maksimal 12 huruf, kelas `ringkas` dari
  Penjelasan.tsx) tetap grid supaya kolomnya sejajar antarbaris.
- Pengubah: pasangan huruf peubah rapat (xh, hx, bx, cy, px) jadi rumus
  miring, bukan teks tegak (satuan cm, km, kg dan kata ya, ah, an tetap
  prosa); deretan persamaan berkoma ("-2 = 2(-1), 0 = 2(0), ...") tidak
  digabung jadi satu potongan supaya barisnya patah di koma, bukan di
  tengah persamaan; deretan angka "i = 1, 2, ..., n" tetap satu.
- Dicek 390 px dan 1280 px di Turunan 03 (kedua kotak), nol galat KaTeX di
  bank dan materi.

## 17 SEP MALAM (4): SISTEM GERAK TAHAP 2, JENDELA DAN UMPAN BALIK SOAL

- `components/mantra/Jendela.tsx`: SATU jendela `<dialog>` (showModal) untuk
  skor, lencana, keluar, dan mode guru (TombolGuru ikut). Kunci fokus, Esc,
  fokus kembali ke pembuka dari peramban. CSS `.dialog-mantra`: layar lebar
  membesar dari 0,96 + pudar (400 ms), tirai memudar lebih dulu, keluar 300
  ms lewat `transition-behavior: allow-discrete` dan `@starting-style`; HP
  lembar naik dari bawah. `body[data-jendela]` mengecilkan `[data-panggung]`
  (main bank soal) ke 0,985; dua jendela boleh terbuka bersamaan (skor dan
  lencana sesudah soal ke-15), tanda body dicabut saat yang terakhir tutup.
- `lib/hitung.ts`: `useHitung` (0 ke nilai, 900 ms, ease-out kubik, jeda 120)
  untuk angka skor (tiap jendela dibuka) dan persen plus batang ringkasan
  (sekali per sesi tab, `sekaliPerSesi`, sessionStorage matra:hitung-*);
  garis emas `.skor-angka .garis` tergambar; perayaan lencana: keping dan
  cincin tumbuh, baris naik bertahap 50 ms (`data-tahap`, `--n`).
- Umpan balik: tanda ✓ ✕ tumbuh dari 0,4 (opsi salah TIDAK digoyang), badan
  soal `.soal-badan` berganti bergeser 10 px dari arah tujuan (key per soal,
  `data-arah`; tombol Periksa/Sebelumnya/Berikutnya di luar pembungkus supaya
  fokus tidak hilang), kabar memudar, pembahasan `.bahas-isi[data-baru]` naik
  masuk hanya sesudah Periksa di kunjungan ini, peta soal dan keping 140 ms;
  Kuis dan Latihan materi memakai bahasa yang sama (`.opsi .tanda`,
  `.pembahasan` naik-umpan).
- Dua cacat lama ketemu: aturan generik `.tanda` (label sudut widget,
  position absolute) membuat ✓ ✕ opsi nyasar ke sudut kiri atas kartu soal,
  dan `.materi-satu-layar .tanda { display: none }` menyembunyikannya di
  kuis materi; keduanya dibatalkan untuk `.opsi`. `.pisah` generik memberi
  kotak abu pada garis miring skor, dibatalkan.
- Penyimpangan dari rancangan: TombolPasang tetap dilepas saat tidak ada
  tawaran (celah kosong permanen di iPhone lebih buruk daripada satu
  pergeseran kecil), hanya memudar masuk 200 ms.
- Diuji playwright-cli 1280 dan 390 px: jawab, Periksa, Berikutnya 5x (fokus
  tetap di tombol), Sebelumnya, jendela keluar (Esc, fokus kembali ke tautan,
  main mundur 0,985), lembar HP, 15 soal dijawab lewat skrip lalu jendela
  skor dan lencana, dialog guru, latihan materi; tsc, eslint, build lulus.

## 17 SEP MALAM (3): RUMUS BACAAN MATERI DITULIS DENGAN LAMBANG DAN DITATA KATEX; GERAK PINDAH HALAMAN DIKOREKSI

ARYA (sesudah tahap 1 gerak tayang): (1) animasi judul yang terbang antar
halaman tidak disukai, dihapus; (2) saat pindah halaman teks lama dan baru
tidak boleh bertindih, dipercepat: sekarang halaman lama pergi 140 ms lalu
halaman baru masuk 280 ms (berurutan, `--d-halaman-keluar/masuk`); (3)
materi Integral menulis rumus dengan kata ("x kuadrat sama dengan x tambah
2"), "kesalahan fatal", tulis seperti di soal dan periksa semua bab.
- Penjelasan.tsx dan HalamanTopik (pertanyaan, Sering keliru, ringkasan)
  kini merender teks lewat TeksMat (KaTeX), sama dengan bank soal. TeksMat
  di-memo per teks supaya tarikan lebar kolom alat tidak tersendat.
- Pengubah lib/mat-latex.ts diperluas: pecahan di pangkat jadi tfrac, `_c^b`
  berhenti di pangkat, indeks Unicode ᵢₙ, elipsis dalam deretan, hasil kali
  rapat (uv, xy, ax, by), `-sin` matematika, `sin x/x` = (sin x)/x dan
  `1/cos² x`, dua angka berdampingan diberi jarak `\;` (vektor baris (4 3)
  tidak jadi (43)), matriks `[[a, b], [c, d]]` jadi pmatrix, singkatan SMA,
  UN, JAK, "layar HP" tetap prosa, `∘`.
- Isi sembilan bab ditulis ulang di tempat rumus memakai kata: Integral (11
  materi, paling parah), Turunan dan Limit (pembagian " : " jadi "/",
  definisi turunan, aturan hasil kali dan bagi, garis singgung), Vektor
  (semua kotak contoh; vektor baris tetap `(a b)` tanpa koma sesuai
  penjelasan materinya sendiri, titik `A(1, 2)`), Transformasi (matriks,
  aksen ′, M₁ M₂, T₂ ∘ T₁, k²), Grafik Fungsi (2ˣ, ²log, 1/x, →),
  Ruang 3D (√n, pecahan, d = 2L/a, d = 3V/L), Statistika dan Trigonometri
  (sedikit). CSS: rumus di cap tidak dikapitalkan, sel kotak contoh
  berpecahan diberi ruang.
- Pemeriksa baru `alat/cek_rumus_materi.ts` (5.058 teks, nol galat KaTeX;
  `--kata` mendaftar rumus yang masih berkata, sisanya prosa wajar seperti
  "aturan pangkat"), `alat/lihat_latex.ts` (lihat LaTeX satu teks),
  `alat/cek_huruf_tunggal.ts` (konteks huruf tunggal yang dianggap rumus).
  Dicek di dev server: Integral 10 dan 03, Transformasi 09, Turunan 02,
  Vektor 12, Limit 08, nol `mat-gagal`. Aturan baru di CLAUDE.md.
- Belum disentuh: teks di dalam WIDGET (label alat, misalnya "x akar (x² + 5)"
  di alat substitusi Integral) masih teks biasa.

## 17 SEP MALAM (2): SISTEM GERAK PANGGUNG TAHAP 1, PINDAH HALAMAN DAN NAV

Rancangan gerak dari Claude Design (HANDOFF, tabel spek A sampai K, CSS)
disimpan di `docs/desain-mantra/gerak/`; keputusan ARYA dan penyimpangan
teknis di `KEPUTUSAN.md` di folder itu; rencana empat tahap di
`docs/superpowers/plans/2026-09-17-sistem-gerak-panggung.md`. Keputusan
ARYA: bola di kurva beranda DIPERTAHANKAN (rancangan mengusulkan dibuang),
tidak ada lipatan baru (sub-bab pohon, Sering keliru, Ringkasan, YouTube
tetap selalu terbuka), deploy tiap tahap.
- Token gerak baru di globals.css (tiga kurva, durasi ruang 520/300/400/280,
  umpan balik 140/180, jarak geser, skala) plus keyframes sistem; reduced
  motion menolkan semuanya.
- Pindah halaman lewat `<ViewTransition>` React (Next 16.3 menyediakannya
  tanpa bendera; `experimental.viewTransition` di HANDOFF sudah tidak ada):
  `components/mantra/Panggung.tsx` membungkus isi tiap page.tsx (16 halaman
  plus not-found), potret lama tenggelam 300 ms, potret baru naik 28 px 520
  ms, arah dari `html[data-arah]` yang ditulis `ArahRute` (klik tautan fase
  tangkap plus popstate) SEBELUM pindah. `main { animation: tab-masuk }`
  dihapus: main tidak pernah lagi di-transform. Tombol Kembali peramban:
  Next memulihkan halaman TANPA View Transition (diukur: startViewTransition
  tidak dipanggil), jadi `html[data-pop]` 700 ms memberi main gerak turun
  biasa (`backwards`, transform dilepas sesudahnya).
- Nav dirakit sekali di layout (label dari alamat), jangkar bernama `nav`
  (potret lamanya disembunyikan); mode fokus tidak lagi `return null`:
  `data-fokus` + `inert`, naik keluar layar dan ditarik dari aliran; satu
  garis tab `.nav-garis` berpindah antar tab (diukur, CSS variable,
  transisi baru nyala sesudah ukur pertama); menu HP grid-template-rows
  0fr ke 1fr dengan visibility tertunda; nav-meta `key={teks}`; pil Mode
  fokus dan Materi NN naik masuk.
- Daftar kartu (kisi bab, kisi bank soal) muncul bertahap HANYA saat dokumen
  pertama dimuat (`html[data-muat-awal]`, dilepas ArahRute saat pindah
  pertama); MunculSaatGulir dilepas dari dua daftar itu. Teks tombol "Mulai"
  / "Lanjutkan Materi 03" memudar berganti (`.label key`).
- Elemen bersama: judul kartu bab ke kepala pohon (layar lebar), judul kartu
  /latihan ke judul bank soal (`share="judul-pindah"`). Di dev pasangannya
  tidak terbentuk karena halaman belajar sempat menampilkan kerangka
  (chunk belum dimuat); di produksi harus dicek dengan jeda animasi.
- Jebakan yang ketemu: animasi opacity dengan fill `both` pada main membuat
  main jadi stacking context selamanya sehingga laci HP (z 60) tergambar di
  bawah nav (z 30); semua animasi pada main memakai `backwards`.
- Diuji playwright-cli 1280 dan 390 px: transisi berjalan (animasi
  panggung-mundur/naik pada potret main dan kaki, root dan nav diam),
  kembali lewat popstate memberi panggung-turun, menu HP buka/tutup/Esc,
  laci HP di atas nav dan setinggi layar, mode fokus masuk/keluar, tsc,
  eslint, next build lulus.

## 17 SEP MALAM: RUMUS SOAL DITATA KATEX SEPERTI MATHCYBER1997 (deploy matra-fcgmida4v, push GitHub)

ARYA: "integralnya dengan batasnya tidak jelas; tidak apa-apa dua baris;
lihat cara mathcyber1997 menulis rumus; terapkan di semua bab". mathcyber
memakai LaTeX (inline $...$ dan blok $$egin{aligned}...$$ dengan \dfrac).
- Bank soal TIDAK ditulis ulang (540 soal tetap teks Unicode). Pengubahnya
  `web/lib/mat-latex.ts`: (1) `pisahkan` memilah kata demi kata jadi prosa
  dan matematika (angka, lambang, huruf tunggal, nama ruas AB/ACG, fungsi
  sin/log/lim, dx; tanda baca kalimat tetap prosa; koma daftar "(3, 4)" ikut
  matematika bila kata berikutnya matematika; satuan sesudah angka jadi
  	ext); (2) `keLatex` menokenkan matematika (kelompok kurung bersarang,
  pangkat/indeks Unicode, ^(...), _min, √, ∛, ∫ berbatas, Σ, lim x→c, ²log,
  x̄, ŷ, °, ′) dan menyusun \dfrac dengan aturan bank: pembilang = rangkaian
  tanpa spasi (atau kelompok) di kiri garis miring; garis miring berspasi =
  pecahan besar sampai tanda sama dengan terdekat.
- `TeksMat` merender KaTeX: sebaris dengan \displaystyle (batas integral di
  atas bawah walau di tengah kalimat), BLOK rata tengah hanya untuk rumus
  tinggi di ujung kalimat (tanda baca pengekor ikut masuk blok). Dipakai di
  bank soal (soal, pilihan, langkah, jebakan, alasan), kuis bab, dan
  latihan materi. KaTeX gagal = teks asli ditampilkan. CSS KaTeX diimpor
  di layout akar.
- `alat/cek_rumus.ts` (Node 24, tanpa tsx): 7.231 teks dari kuis.ts dan
  latihan.ts sembilan bab, 15.912 potongan matematika, NOL galat KaTeX;
  `--html` membuat galeri qc/rumus.html (540 soal) yang dilihat lewat
  static-server; jebakan yang ketemu dari galeri: "di" dikira dx (regex
  diferensial dipersempit), "DAN" penekanan dikira ruas, "ke-2" dikira
  pengurangan, tanda kurang ASCII berdiri sendiri di latihan.ts, \int
  menempel huruf (\intx), ^ terputus dari pecahan (x^(1/2)/3), koma daftar
  memecah "(3, 4)", kurung tak tertutup diberi penutup palsu. Satu langkah
  st-47 ditulis ulang (pecahan berisi frasa berkurung).
- Belum: teks BACAAN materi (tahap.ts) masih rumus Unicode biasa; kalau
  ARYA mau, TeksMat bisa dipasang di Penjelasan.tsx dengan pemeriksaan
  galeri yang sama.

## 17 SEP SORE: PILIHAN DIKOCOK, PECAHAN BERSUSUN, JENDELA SKOR (deploy matra-ba1rmtjvx, push GitHub)

- Pilihan ganda dikocok saat ditampilkan (`lib/acak-pilihan.ts`): benih per
  tab di sessionStorage (tetap selama tab hidup, beda di tab lain), yang
  disimpan tetap indeks ASLI, huruf di pembahasan ("(Jawaban C)", "Pilihan
  D, ...") diterjemahkan dengan pola yang sama dengan alat/acak_pilihan.mjs.
  Diuji: huruf di tombol, kepala pembahasan, dan langkah terakhir selalu
  sama; jebakan menunjuk pilihan yang benar.
- Pecahan bersusun (`components/latihan/TeksMat.tsx`, tanpa LaTeX): pola
  pembilang/penyebut (rangkaian tanpa spasi atau kelompok berkurung) di
  soal, pilihan, dan pembahasan disusun atas bawah; 2.485 pecahan di bank
  tercakup; satuan seperti km/jam ikut bersusun (sengaja, tidak ada kasus
  "dan/atau" di bank).
- Jendela skor begitu jawaban ke-15 diperiksa: "n benar, m salah", tombol
  "Baca-baca dulu" dan "Kerjakan ulang yang salah" (menghapus tanda soal
  yang salah saja, `hapusJawaban`, lalu melompat ke soal salah pertama);
  kalau semua benar, tawarkan tingkat berikutnya bila terbuka. Peta soal
  kini mengikuti JAWABAN TERAKHIR (bukan riwayat pernah benar) supaya cocok
  dengan skor dan tanda yang dihapus; daftar `benar` untuk kemajuan dan
  lencana tidak berubah.
- Dibuka dari periksaJawaban, bukan useEffect (aturan
  react-hooks/set-state-in-effect).

## 17 SEP: BANK SOAL DIROMBAK, ENAM PERMINTAAN ARYA (deploy matra-e6u0m5ck3, push GitHub)

- Dua tampilan di /latihan/<topik>: tanpa `?tingkat=` = RINGKASAN (kemajuan
  topik, tujuh lencana, empat ubin tingkat sebagai tombol); dengan
  `?tingkat=mudah` = SOALNYA SAJA (ARYA: "setelah memilih tingkat, siswa
  fokus dengan soalnya"). Tingkat di alamat supaya refresh dan tombol
  kembali peramban bekerja; sembilan halaman latihan dibungkus Suspense.
- Peta soal: 15 kotak bernomor per tingkat, hijau = pernah benar, jingga =
  pernah salah, kosong = belum; ketuk untuk melompat. Tombol "Sebelumnya"
  dan "Berikutnya" (tidak melingkar).
- Soal yang pernah benar dibuka lagi: jawaban tertandai, pembahasan
  langsung terbuka, kabar "Sudah pernah benar. Baca lagi pembahasannya".
  Yang pernah salah: pilihan lama bergaris putus jingga, boleh dijawab ulang,
  pembahasan baru tampil sesudah diperiksa lagi.
- Simpanan (`lib/latihan-kemajuan.ts`) bertambah `jawaban` (pilihan terakhir
  tiap soal, termasuk salah; hanya tanda, bukan nilai) dan `posisi` (soal
  terakhir per tingkat). Posisi dibaca dari simpanan sebagai satu sumber
  kebenaran, bukan state lokal, jadi refresh dan pindah tingkat tidak
  mengulang dari nomor satu. Gambaran server `KOSONG_JSON`.
- Jendela keluar: menangkap klik tautan mana pun (nav, remah, kaki) sesudah
  minimal satu jawaban diperiksa di kunjungan ini; "Keluar dari latihan?
  Jawabanmu sudah tersimpan. Kamu bisa melanjutkan dari soal ini kapan
  saja." Tetap di sini / Keluar. Tutup tab dan refresh tidak diberi
  peringatan (peramban tidak mengizinkan kalimat sendiri, dan kemajuannya
  sudah tersimpan). Next Link menghormati preventDefault dari pendengar
  tangkap (capture) di document, terbukti.
- Lencana dihidupkan lagi (dulu disembunyikan atas permintaan ARYA 3 Sep):
  baris tujuh lencana di ringkasan (belum diraih tampil redup dengan
  syaratnya), jendela perayaan saat lencana baru diraih, "🏅 n/7 lencana" di
  kartu bab /latihan.
- Diuji playwright (dev dan produksi): jawab benar memunculkan "Langkah
  pertama"; jawab salah lalu kembali: pilihan lama bertanda; lompat lewat
  peta; reload mendarat di soal yang sama dengan tanda-tanda utuh; jendela
  keluar muncul saat menekan Beranda, "Tetap di sini" menahan, "Keluar"
  meneruskan; lebar 400 px tidak melebar.
- Belum diuji: pindah tingkat lewat keping (butuh 10 benar untuk membuka
  tingkat kedua); logikanya sama dengan lompat peta (posisi per tingkat
  dari simpanan).

## 16 SEP: RATA KANAN-KIRI, KEPEKAAN TARIKAN SEMUA WIDGET DIPERIKSA (deploy matra-f9x5ydaii, push GitHub)

- Baris simpanan video diringkas (ARYA: "bukan hal yang terlalu penting"):
  kotak centang "Simpan video" di samping saklar subtitle, tulisan jadi
  "Video tersimpan" bila ada, tautan "hapus" kecil.
- Bacaan materi rata kanan-kiri (`.bacaan p, li`, hyphens auto, text-wrap
  pretty); kalimat kunci dan judul tetap rata kiri. Chrome tidak memenggal
  kata Indonesia, jadi sesekali jarak antarkata melebar.
- ARYA: tarikan pegangan segitiga A2 "terlalu cepat berubah, licin", lalu
  "cek semuanya satu-satu". Dibuat `alat/uji-seret/` (playwright-cli):
  tiap halaman materi, tiap elemen ber-onPointerDown ditarik sintetis 60 px
  ke empat arah, diukur geseran pegangan dan elemen lain serta perubahan
  nilai kendali. 105 materi, 62 pegangan terukur (sisanya kendali slider
  atau tombol). Temuan: hanya dua yang bergerak lebih cepat dari jari:
  segitiga A2 (bingkai ikut membesar; kini diredam 0,4 kali jarak jari) dan
  kubus 3D (0,42 derajat per piksel, rusuk bergeser 1,4 sampai 1,6 kali
  jari; kini 0,3). Titik-titik lain mengikuti jari 1:1 atau melompat ke petak
  (transformasi); titik yang menempel di kurva (turunan, integral) terlihat
  cepat di bagian curam karena mengikuti kurvanya, dibiarkan.
- Jebakan alat: `playwright-cli eval "a = 1; 'b'"` gagal diam-diam (dibungkus
  jadi ekspresi), indeks dikirim lewat query `&p=`; bash yang dijalankan
  lewat Start-Process tidak punya PATH (grep, playwright-cli tidak ada);
  proses probe yang dihentikan TaskStop masih hidup dan merebut browser.

## 15 SEP SORE: FASTSTART 61 VIDEO, SIMPANAN VIDEO DI PERANGKAT (SERVICE WORKER), JALUR CADANGAN (deploy matra-8pvjatfdy, push GitHub)

Permintaan ARYA: video jangan diunduh lagi saat dibuka kembali. Disetujui
dua hal sekaligus (A dan B).
- A. faststart: ke-61 mp4 menaruh atom moov di ujung berkas, jadi browser
  harus melompat ke ujung dulu sebelum memutar. `alat/faststart_anim.py`
  memindahkannya ke depan tanpa mengubah gambar dan suara (md5 aliran video
  sama, ukuran +1 byte), `gabung_audio.py` memakai `-movflags +faststart`
  untuk render berikutnya. Sidik ?v= 60 video berubah, diunggah ulang ke R2
  (61 alamat Worker cocok).
- B. Simpanan di perangkat: `web/public/sw.js` (service worker) melayani
  video dari Cache Storage, termasuk Range (206 dari potongan Blob, 416 di
  luar rentang, ETag disalin). Yang MENGISI simpanan halaman
  (`lib/simpanan-video.ts`): saat video ditonton 90 persen atau habis,
  berkas diunduh utuh sekali lagi lalu cache.put. Baris di bawah pemutar:
  "Tersimpan di perangkat" / "Menyimpan..." / "Tersimpan otomatis setelah
  ditonton hampir habis", saklar "Simpan otomatis hidup/mati"
  (localStorage matra:video:simpan-otomatis), tombol "Hapus simpanan (n
  video, MB)". `PetugasVideo` di layout mendaftarkan petugas; sw.js
  dilayani no-cache.
- Rancangan pertama (menyalin arus sambil diputar lewat tee di service
  worker) DIBATALKAN: Chrome mematikan petugas yang menganggur 30 detik dan
  membatasi satu peristiwa 5 menit; arus buatan JavaScript ikut mati, dan
  yang mati itu pemutaran videonya. Unduhan kedua yang disengaja lebih aman;
  di laptop biasanya terlayani cache HTTP.
- Jebakan yang ketemu saat menguji (semua diperbaiki dan diuji ulang):
  1. Chrome menolak jawaban Range yang BERPINDAH SUMBER di tengah hidup satu
     elemen video ("FFmpegDemuxer: data source error"), dua arah: jaringan
     lalu simpanan, atau simpanan lalu jaringan. Maka sumber diputuskan
     SEBELUM elemen diberi <source> (`sumber` 'simpanan' | 'jaringan', ikut
     `key` elemen; alamat jaringan bertanda &j=1 yang tidak disentuh
     petugas; demo beranda selalu &j=1). Tombol hapus saat sedang diputar
     dari simpanan membuat elemen baru bersumber jaringan dan melanjutkan
     dari detik yang sama. Efek yang memegang elemen video (subtitle, papan
     tik, ketuk, layar penuh) ikut bergantung pada `sumber`.
  2. Chrome menjawab 206 untuk permintaan TANPA Range bila cache HTTP-nya
     sudah punya potongan berkas dari pemutar (entri sparse); cache.put
     menolak 206, jadi jawaban 206 yang utuh dibungkus ulang jadi 200.
  3. Resolver Telkomsel di jaringan ini memetakan host Cloudflare (Worker,
     pages.dev, cdnjs) dan GitHub ke IPv6 ULA fd00:aa:bb:2130::/96 (NAT64),
     lalu Chrome memblokir permintaan lintas asal halaman publik ke "alamat
     lokal" itu (Local Network Access, "Permission was denied for this
     request to access the local address space"); tidak konsisten (kadang
     lewat IPv4). Obat: jalur cadangan `/video-cadangan/:nama` (rewrite
     Vercel ke Worker, Range diteruskan, 206 terbukti) yang dicoba pemutar
     hanya bila alamat Worker gagal; `simpanVideo` juga memakainya dan
     menyimpan di bawah kunci alamat Worker. Diuji dengan Worker dipaksa 503:
     putar lewat cadangan, tersimpan, muat ulang diputar dari simpanan tanpa
     jaringan sama sekali. Jalur ini menghitung Fast Origin Transfer Vercel
     (Hobby 10 GB/bulan), jadi hanya untuk kegagalan.
  4. Tepi Cloudflare menolak User-Agent "Python-urllib" (403); alat cek
     memakai nama sendiri. Worker mengekspos ETag dan Content-Range lewat
     Access-Control-Expose-Headers supaya halaman bisa membacanya.
- Diuji (playwright, dev dan produksi): putar dari jaringan lalu tersimpan
  otomatis pada 95 persen tanpa mengganggu elemen yang sedang diputar; muat
  ulang: sumber simpanan, Range dijawab dari simpanan (x-mantra-simpanan:
  ada), geser waktu ke 120 dan 200 detik jalan; hapus saat diputar: elemen
  baru bersumber jaringan lanjut dari detik yang sama; saklar subtitle dan
  panah papan tik tetap bekerja pada elemen baru.
- Belum: HP sungguhan belum diuji (Cache Storage di Safari iPhone hangus
  setelah 7 hari tidak dibuka kecuali dipasang ke layar utama); belum ada
  pengukuran berapa siswa yang kena pemblokiran Local Network Access.

## 15 SEP SIANG: WIDGET A1 (MATAHARI DI ANTARA SINAR), VIDEO PINDAH KE CLOUDFLARE R2 LEWAT WORKER (deploy matra-jj0rw9osr, push GitHub)

ARYA melihat grafik Deployment Storage Vercel terus naik (17,33 GB) walau
deployment lama dihapus. Ternyata grafik "Last 30 Days" itu akumulasi
periode: tiap deploy yang membawa folder video 505 MB menambah 0,5 GB dan
angkanya tidak pernah turun. Keputusan ARYA: video dipindah ke Cloudflare R2.
- Widget Bayangan (A1): ARYA minta sinar matahari mengenai orang juga, bukan
  cuma pohon. Sinar sejajar tidak bisa bertemu di satu matahari (jaraknya 52
  px pada 25 derajat, 275 px pada 70 derajat), jadi matahari dipindah ke
  langit DI ANTARA kedua sinar (di tepi bingkai pada arah datangnya cahaya,
  ikut naik saat sudut membesar), kedua sinar diteruskan sejajar sampai tepi,
  ditambah berkas garis cahaya tipis sejajar di sekitar matahari. Label
  "10 m" pindah ke kanan batang (sinar pohon menimpanya pada sudut besar).
  Diuji playwright pada 25, 45, 70 derajat.
- R2: ARYA membuat akun Cloudflare, bucket `mantra-anim` (APAC), token
  Object Read & Write; 61 video (504,5 MB) diunggah `alat/unggah_anim_r2.py`
  (boto3, satu bagian di bawah 64 MB supaya ETag = MD5, hanya yang berubah).
  Alamat publik bawaan pub-....r2.dev TERNYATA DIBLOKIR TELKOMSEL lewat DNS
  (jawaban Internet Baik 202.3.218.137; Google DNS memberi IP Cloudflare):
  siswa Indonesia tidak akan bisa memutar dari sana. workers.dev dan
  pages.dev tidak diblokir, jadi dibuat Worker `mantra-video`
  (`alat/worker-video/index.js`: GET/HEAD, Range 206, ETag 304, 416 di luar
  rentang, Cache-Control immutable dari metadata unggahan) yang diterbitkan
  `alat/terbitkan_worker_video.py` lewat API Cloudflare (tanpa wrangler,
  token templat "Edit Cloudflare Workers"; subdomain akun
  `mantra-matematika` dibuat oleh alat). Jebakan R2 yang ketemu: `obj.range`
  terisi walau tidak ada Range dan kuncinya ada semua bernilai undefined,
  jadi 206 diputuskan dari header Range PERMINTAAN. Diuji langsung ke IP
  Cloudflare (SNI) sebab resolver Telkomsel menyimpan NXDOMAIN 30 menit
  (SOA minimum workers.dev 1800 s) dari kueri sebelum rekamannya ada.
- Situs: `alamatAnim` memakai `NEXT_PUBLIC_ASAL_VIDEO` (web/.env.production,
  dikomit) untuk mp4/webm; subtitle dan poster tetap di Vercel (kecil, dan
  <track> lintas asal butuh CORS); sidik ?v= tetap. `versi-anim.mjs`
  mempertahankan sidik video yang tidak ada di public/anim (prebuild di
  Vercel). `public/anim/*.mp4` dikecualikan di web/.vercelignore: unggahan
  deploy turun dari 498 MB menjadi 207 KB. Batas Worker gratis 100.000
  permintaan per hari (satu pemutaran memakai beberapa permintaan Range).
- Ketemu sambil lewat: demo "Animasi bersuara" di beranda merujuk
  tahap8-grafik-sin.webm yang tidak ada sejak semua video jadi mp4 (8 Sep),
  jadi sejak itu demo beranda 404 dan hanya memperlihatkan poster; diganti
  .mp4, diverifikasi diputar. Tepi Cloudflare menolak User-Agent
  "Python-urllib" (403), alat cek memakai nama sendiri.
- Diverifikasi playwright di produksi: Vektor 01, Statistika 01, dan beranda
  memutar video dari mantra-video.mantra-matematika.workers.dev (durasi
  benar, subtitle 93 dan 119 cue dari Vercel, poster dari Vercel), 61 alamat
  Worker cocok ukurannya dengan berkas lokal. Deployment lama dihapus,
  tinggal produksi. Belum: kalau kelak lalu lintas besar (batas Worker
  gratis 100.000 permintaan per hari), pasang domain sendiri di depan
  bucket; r2.dev tetap jangan.

## 15 SEP: SUARA BIAN (ELEVENLABS) DITERAPKAN KE SEMUA 57 VIDEO, RENDER ULANG 1080p60 (deploy matra-oawt9hkvs, push GitHub cd26f96)

Keputusan ARYA berurutan (14 Sep malam sampai 15 Sep): coba ElevenLabs lagi
dengan suara "Adam" (dites di Trigonometri 02), bandingkan dua suara Indonesia
dari pustaka ("Ganesh" dan "Bian"), "saya suka suara bian, tapi mengapa anda
tidak menjadikan satu narasi saja? kenapa anda potong2?", lalu "oke sudah
bagus, silahkan di terapkan ke seluruh video" dan "tunggu sampai semua selesai
lalu deploy". Hasil: 57 naskah bersuara `eleven:Bian - Neutral, Calm and
Clear`, 57 mp4 1080p60 dan 57 vtt di web/public/anim diganti, versi-anim.json
dibuat ulang (183 berkas), cek_aset_video hanya menandai 4 demo non-materi.
- Alur rekam baru (`manim/buat_narasi.py`): naskah bersuara `eleven:<nama>`
  direkam SELURUHNYA dalam satu permintaan `with-timestamps` (model
  eleven_multilingual_v2, kecepatan dari tempo), supaya warna suara tidak
  berubah antar potongan. Batas segmen dan jam kata diambil dari penjajaran
  huruf; jeda alami antarsegmen dibuang lalu diganti napas seragam (`"napas":
  0.6` di naskah, edge-tts dulu 0,35); ujung potongan dilandaikan 6 ms; naskah
  di atas 4.500 huruf dipecah seimbang dengan konteks previous_text/next_text
  (pemecahan rakus pernah menyisakan ekor 281 huruf di grafik3, direkam ulang).
  Permintaan diulang sampai empat kali bila jaringan putus (WinError 10060
  terjadi beberapa kali). Kunci tetap hanya di .env.local.
- Alat baru: `alat/terapkan_suara.py rekam|render|daftar` (rekam: tulis suara
  dan napas ke naskah, rekam, gerbang cek_pemicu_urut; render: 1080p60 ketat
  satu per satu lalu gabung_audio, buat_subtitle, cek_video, log di akar
  proyek) dan `alat/lihat_babak.py <adegan> <babak>` (kode babak plus jam kata).
  Rekam boleh 3 sekaligus (ARYA: akun boleh 10 bersamaan), render tetap satu.
- Irama: Bian membaca sebagian kalimat lebih cepat dari edge-tts, jadi 28
  adegan disetel (animasi dipendekkan, judul pembuka dipersingkat) sampai
  gerbang lolos, tanpa mengubah naskah. Turunan 1 sampai 3 memakai pembungkus
  sendiri (`self.tunggu(b, frasa)`) yang tidak menolak keterlambatan; angka
  isyarat-render.json-nya 0,033 / 0,027 / 0,069 s (aman); tanda HILANG dan
  MUNDUR gerbang pada ketiganya artefak loop, bukan cacat.
- Gerbang `alat/cek_pemicu_urut.py` diperbaiki enam hal yang masing-masing
  ketahuan dari render yang GAGAL sesudah lolos gerbang: sorot_cincin dihitung
  ganda; panggilan multibaris dihitung ganda (baris digabung dulu); bawaan
  run_time 1,2 pada lahir_rumus bertahan= tidak dihitung (limit4); self.muncul,
  self.hilang, self.papan tidak dihitung (grafik3); PapanRumus bernama selain
  papan (panel.baris di integral03) tidak dihitung; ekor minimal 0,05 s sebab
  pembulatan frame membuat 0,13 s jadi 0,15 s (ruang-3d-01 dan 03).
- vektor1-perahu: render 1080p60 mati diam-diam DUA KALI di frame 11.142 tanpa
  pesan galat (480p15 selesai). Sebabnya tiga panah `always_redraw` dibangun
  ulang tiap frame; diganti `bangun_bila_berubah` (dibangun ulang hanya saat
  sudut atau geseran berubah). Render lalu selesai 13,2 menit, pemicu terlambat
  terbesar 0,031 s. Pelajaran: always_redraw pada benda berat di video panjang
  bisa menghabiskan sumber daya OpenGL tanpa galat; pakai updater berkunci.
- Kuota ElevenLabs (Creator, 130.817 huruf per bulan, reset 14 Okt 2026):
  terpakai 99.939 termasuk uji Adam, Ganesh, Bian (dua kali) di Trigonometri
  02; sisa 30.878. Perkiraan awal saya (107 ribu untuk 29 video) meleset jauh
  ke atas, sebab yang dihitung ternyata huruf naskah, bukan token.
- Lembar kontak 57 video dibuat (qc/<video>/kontak.png); delapan yang paling
  banyak disetel (limit4, grafik3, vektor1, ruang-3d-01, transformasi3,
  integral03, statistika1, turunan3) dibuka dan dinilai: urutan gambar utuh,
  tidak ada layar kosong. Yang lain hanya lewat gerbang otomatis dan
  isyarat-render.json; belum ditonton satu per satu.
- Beban repo: audio/ (narasi produksi) ikut dikomit sejak 910fefc; pack git
  kini 1,08 GiB. Perlu keputusan ARYA: Git LFS untuk audio dan poster, atau
  keluarkan audio/ dari git dan simpan di D:\MANTRA-BACKUP. 363 berkas
  log_*.txt di akar proyek kini di-gitignore (jejak mesin).
- Deploy: `vercel deploy --prod --yes` GAGAL tiga kali berturut-turut dengan
  "Internal Server Error" dari api.vercel.com/v2/files di tengah unggahan
  (498 MB, 61 mp4), padahal status Vercel hijau; `--archive=tgz` (satu arsip,
  bukan ribuan berkas) langsung berhasil. Pakai `--archive=tgz` untuk deploy
  yang membawa banyak video. Tayang di mantra-matematika.vercel.app;
  diverifikasi playwright: vektor1-perahu.mp4?v=79ac0deadb diputar, durasi
  4:46, subtitle aktif di detik 42; deployment lama matra-i75nlm6fd dihapus.

## 14 SEP (malam, lanjutan): ENAM REVISI ARYA (A2 DIROMBAK, 98 KOTAK COBA DITULIS ULANG), UJI SUARA ELEVENLABS (deploy matra-i75nlm6fd, push GitHub)

ARYA menyetujui pembahasan gaya mathcyber1997 ("jadikan pembelajaranmu dalam
membuat soal kedepannya"; sekarang standar tetap) lalu mengirim enam tangkapan
layar. Materi Trigonometri A2 disebut "hampir semuanya salah"; ia minta cacat
serupa di materi lain ikut dirombak.
- Kartu /latihan: garis tingkat 4 px jadi 8 px bertepi, label "Mudah" dan
  "Sangat sulit" 12 px tebal, sebab motif latar kartu mengaburkannya.
- Widget Bayangan (A1): matahari ikut naik turun mengikuti sudut (duduk pada
  garis sinar pohon, bingkai dilebarkan 460 jadi 530), bayangan digambar
  sebagai bentuk gelap rebah di tanah (bukan garis biru), busur sudut sinar
  berangka di ujung bayangan pohon.
- Widget Segitiga Sebangun (A2): satu tarikan hanya mengubah SATU besaran.
  Arah tarikan di 6 px pertama mengunci: mendatar = ukuran (sudut dibekukan),
  tegak = sudut (sisi samping dibekukan). Panah petunjuk "ukuran" dan "sudut"
  di pegangan, garis bantu putus-putus selama ditarik, kendali yang
  bersangkutan ikut menyala. Diuji playwright: tarikan mendatar 100 ke 74
  dengan sudut tetap 37; tarikan tegak 37 ke 21 dengan ukuran tetap.
- Materi A2 ditulis ulang: sebangun, percobaan (butir menyebut tabel "Angka
  dari segitiga" dan barisnya, diakhiri pertanyaan), sesi "Kenapa hasil
  baginya tidak ikut berubah" (kotak pembesaran 4 kali dan k kali), sesi
  "Yang berubah dan yang tidak"; sesi "Akibatnya" dan "Coba sendiri di
  alatnya" dibuang; Sering keliru baru "Dikira sudutnya ikut membesar"
  (yang lama menyebut tan 37° padahal sin cos tan baru di A4).
- ATURAN BARU semua materi: kotak "Yuk bereksperimen" berisi tindakan dan
  pengamatan saja, butir terakhir pertanyaan, tanpa kesimpulan; penutup
  "Yang kamu temukan" (12 Sep) dicabut dari perender dan CSS; 11 kalimat
  sorot yang menempel di bawah kotak dipindah ke penjelasan sesudahnya
  (skrip pindah_sorot). 98 kotak coba di 9 topik ditulis ulang lewat
  `alat/ringkas_coba.mjs` (mencetak semua kotak) dan skrip ubah_coba;
  butir yang salah alat ikut terkoreksi (A3 menyebut "sudut B" padahal
  alatnya hanya punya sudut A dan C). 14 sub judul fragmen diberi lanjutan
  ("Soalnya: jarak B ke garis AG", "Aturannya: pusat dan faktor skala").
- Tayang: tsc bersih, A2 dan /latihan dipotret, commit 6e7747c, push ke
  GitHub AryaNyoman/MANTRA_Mathematics-Interactive (master ke main), deploy
  matra-i75nlm6fd, alias dipindah, matra-e3sm819a0 dihapus, A2 dicek di
  alamat produksi.

UJI SUARA ELEVENLABS (permintaan ARYA malam ini): akun kini paket Creator
(130.817 karakter/bulan). Suara yang diminta "Adam - American, Dark and Tough"
(pustaka akun, voice_id IRHApOXLvnW57QJPQH2P). Diuji pada video pertama
Trigonometri, yaitu Trigonometri 02 (Materi 01 tidak bervideo).
- `manim/buat_narasi.py` menerima `--suara "eleven:<nama>"` (endpoint
  with-timestamps, model eleven_multilingual_v2, waktu kata dari penjajaran
  huruf, tempo -5% jadi speed 0,95) dan `--varian=-eleven` (tulis ke
  `audio/<video>-eleven/`); `NARASI_VARIAN=-eleven` dibaca
  `sinema.folder_audio`, JamKata, gabung_audio, buat_subtitle, cek_pemicu_urut,
  sehingga narasi edge-tts produksi tidak tertimpa (commit 3054341).
- Hasil: 15 segmen, 1.869 karakter, 147 detik. Panjang segmen berbeda sampai
  3 detik dari edge-tts; render pertama gagal gerbang WaktuTidakMuat (babak
  'simpul' 5,40 s lawan 5,23 s), diatasi `--napas 0.6` untuk uji. Render 480p
  lolos (57 pemicu, terlambat terbesar 0,05 s), subtitle dibuat ulang dengan
  waktu suara baru (vtt produksi dipulihkan dari git), lembar kontak dilihat.
  Berkas: `media/uji-480p/tahap2-perbandingan-tetap-eleven-bersubtitle.mp4`
  (dikirim ke ARYA bersama mp3 narasinya). Situs masih memakai suara edge-tts.
- Catatan jujur: Adam suara Inggris Amerika; bahasa Indonesianya beraksen
  asing dan pelafalan beberapa kata mungkin meleset. Kalau disetujui untuk
  semua video, animasi tiap babak perlu ditinjau ulang karena panjang segmen
  berubah, dan 58 video sekitar 110.000 karakter (muat dalam kuota sebulan).
- Pembanding (permintaan ARYA berikutnya): dua suara Indonesia dari pustaka
  ElevenLabs ditambahkan ke akun lewat API, "Ganesh - Warm, Intimidating and
  Clear" (93hTIgYC2wj4AtGhp6WE) dan "Bian - Neutral, Calm and Clear"
  (1k39YpzqXZn52BgyLyGO). Pada kecepatan 0,95 Ganesh 107 detik (bicara cepat,
  jeda antarkalimat pendek) dan Bian 177 detik (edge-tts 143 detik). Bian muat
  ke animasi apa adanya (napas 0,6). Ganesh tidak: pada 0,9 masih 10 pemicu
  terlambat, pada 0,8 lima pemicu terlambat sampai 0,59 detik; video ujinya
  dirender dengan `PEMICU_TOLERANSI=0.6` (toleransi yang hanya hidup bila
  NARASI_VARIAN diisi, di `tunggu_kata` dan `laporkan_pemicu`), jadi lima
  animasi mulai sedikit terlambat. `--tempo` ditambahkan ke buat_narasi.
  Empat berkas dikirim ke ARYA: mp3 kedua suara pada pengaturan sama, dan
  video uji `tahap2-perbandingan-tetap-{ganesh,bian}-bersubtitle.mp4`
  (subtitle dibuat dengan NARASI_VARIAN lalu vtt produksi dipulihkan dari git).
  Kalau Ganesh dipilih, animasi tiap babak harus ditulis ulang mengikuti
  iramanya; kalau Bian, cukup napas 0,6 dan subtitle dibuat ulang.

## 14 SEP (malam): 540 PEMBAHASAN DITULIS ULANG GAYA mathcyber1997, TAYANG (deploy matra-e3sm819a0)

ARYA menyetujui rancangan sore ("Saya sudah menyetujui semuanya, silahkan dibangun
ulang"). Semua 9 bank (60 soal per bab) ditulis ulang mengikuti resep di
`PELAJARI BENTUK SOAL MATEMATIKA/CATATAN-BELAJAR-PEMBAHASAN.md`: kalimat utuh
formal tanpa kamu/Anda, alat disebut lalu hitungan ditulis penuh, pemisalan,
kata sambung baku (diperoleh, sehingga, dengan demikian), penutup "Jadi, ...
(Jawaban X)", jebakan per pilihan ("Pilihan D, 3/5, lupa ..."). Gambar di
pembahasan sekarang gambar BANTU yang lahir dari langkahnya, bukan ulangan
gambar soal (ArenaLatihan tidak lagi memuat gambar soal di panel pembahasan).
- Model dan perender (1b1b4da): `Langkah = string | { teks, gambar }`; jenis baru
  `kuadran` (peta kuadran dengan sudut), `segitiga-umum` (tiga titik, tinggi,
  siku, sudut; tata letak aturan kosinus), `tabel` (kolom baru dan baris sorot),
  `garis-bilangan` (titik penuh/kosong, selang bertanda); tambahan `arsir` dan
  `datar` di grafik, `proyeksi` di vektor, `bantu` di balok, `panah` dan `garis`
  di bidang, `pecah`/`strip`/`labelBagian` di luas, `sorot` di segitiga. Galeri
  `/latihan/contoh-gambar?bab=<slug>&mulai=<n>&jumlah=<n>` (potret penuh
  Playwright berulang di atas 16.384 px, karena itu dipotong per irisan).
- `alat/cek_kuis.mjs --ketat` memeriksa gaya: 3 sampai 9 langkah, tiap langkah
  berkata penuntun dan bertitik, "(Jawaban X)" harus cocok dengan `benar`,
  langkah terakhir "Jadi, ...", tanpa kamu/Anda/kalian, jebakan menyebut
  "Pilihan X"; gambar langkah ikut divalidasi. `alat/ringkas_kuis.mjs` mencetak
  bank untuk dibaca; `alat/acak_pilihan.mjs` (644e206) menyebar huruf jawaban
  benar 12 per huruf (semula Turunan dan Grafik Fungsi 60 soal semuanya A) dan
  memetakan ulang huruf di "(Jawaban X)" serta "Pilihan X".
- Bank per bab (tiap bab 8 soal tertipis diganti jenis yang belum ada, id lama
  dipertahankan, id baru ditambahkan): Trigonometri 45a3b36 (59 gambar bantu,
  kuadran dan segitiga acuan), Ruang 3D df6baa6 (105 gambar: segitiga dicabut
  dari kubus, garis bantu di balok), Limit 2cf9db7, Turunan 3425371, Integral
  3b2d590, Vektor e09bd06 (proyeksi), Statistika 5f01961 (tabel frekuensi
  kumulatif), Transformasi Geometri ef8d487 (panah bangun ke bayangan), Grafik
  Fungsi afb19b3 (parabola dengan titik balik hasil hitungan, tabel pemeriksaan
  titik, garis bilangan irisan syarat; 12 gambar soal yang langsung
  membocorkan jawabannya dicabut, misalnya batang yang memuat angka jawaban).
  Gerbang tiap bab: `cek_kuis --ketat` lolos, `tsc` bersih, galeri dipotret dan
  dibaca satu per satu, arena dicoba (gambar muncul di bawah langkahnya).
- Total: 540 soal, 540 pembahasan, 440 gambar langkah, 325 gambar soal, 476
  cek mesin; `node alat/cek_kuis.mjs --semua --ketat` SEMUA LOLOS.
- Tayang: `vercel deploy --prod` dari `web/` (matra-e3sm819a0), alias
  mantra-matematika.vercel.app dipindah, deployment lama matra-hbwlr3w1u
  dihapus; kesembilan halaman /latihan/<bab> dicek 200 dan arena Grafik Fungsi
  dicoba di alamat produksi (gambar bantu tampil di langkah 2).
- Pelajaran: heredoc Bash menelan backslash (penggantian tanda em-dash menjadi
  kode u2014 bergaris miring terbalik diam-diam jadi tanpa perubahan), jadi
  skrip perbaikan ditulis lewat berkas .py;
  `io.open(..., 'w')` pernah menolak menimpa kuis.ts (EINVAL) selagi dev server
  memantau berkas, obatnya tulis ke .tmp lalu `os.replace`.

## 14 SEP (siang-sore): PEMBAHASAN LATIHAN DITOLAK ARYA; BELAJAR GAYA mathcyber1997 DULU

ARYA (tangkapan arena Trigonometri): pembahasan yang tayang kemarin membingungkan
(potongan kalimat), dan gambar di panel pembahasan cuma mengulang gambar soal
("harusnya menunjukkan di mana kuadran III itu berasal"). Perintah: tiru cara kerja
pembahasan mathcyber1997; bahasa formal tanpa kamu/Anda (disetujui); penulisan
ulang 540 soal DITUNDA sampai ARYA menyuruh; sekarang belajar dulu dari
`D:\MANIM-MATRA\PELAJARI BENTUK SOAL MATEMATIKA` (132 PDF soal yang dibeli ARYA;
pembahasannya di situs yang tertaut tiap PDF). Zip dari Google Drive yang diunduh
ARYA ternyata terpotong (1,1 MB), tetapi folder lokal yang ia siapkan lengkap.
- 96 halaman pembahasan diunduh utuh (`pembahasan-web/*.md`, LaTeX mentah, penanda
  gambar; `alat/unduh_pembahasan.py`, parser lxml karena html.parser memotong
  halaman fungsi kuadrat di soal 1) plus 3 halaman tambahan (sudut dimensi tiga,
  fungsi naik turun, garis singgung). 2.752 pembahasan diinventaris frasanya.
- Dibaca penuh: perbandingan trigonometri dasar dan sudut istimewa, dimensi tiga
  jarak dan sudut, turunan aljabar, aplikasi turunan, integral tentu, luas daerah,
  limit aljabar dan tak hingga, vektor, statistika, transformasi, fungsi kuadrat;
  yang lain diringkas kalimat pembuka dan penutupnya.
- Hasil: `CATATAN-BELAJAR-PEMBAHASAN.md` (kerangka enam langkah, kata sambung,
  gambar bantu per jenis, pola per topik, resep menulis MANTRA dengan sembilan
  contoh, daftar perender yang harus dibangun, kesenjangan jenis soal tiap bank).
  Diagnosis kesalahan kemarin: catatan bertitik dua, hitungan dilompati, alat
  disebut belakangan, gambar soal diulang, penutup tanpa huruf jawaban.
- Bahan berlisensi (PDF, salinan halaman, gambar) dikecualikan dari git lewat
  .gitignore karena repo akan dipublikkan untuk PPPMI; catatan dan alat dilacak.
- Belum dikerjakan (menunggu ARYA): langkah bergambar per butir, perender kuadran,
  segitiga acuan, segitiga-umum, tabel, garis bilangan; lalu 540 soal ditulis ulang
  bab per bab.

## 14 SEP (siang): LATIHAN BERGAMBAR, 9 BANK 60 SOAL, MODE GURU TAYANG (deploy matra-hbwlr3w1u)

Permintaan ARYA 13 Sep (tangkapan /latihan): pembahasan bank soal diperpanjang
dan diperjelas, gambar untuk soal bersituasi, 15 soal per tingkat dengan syarat
naik 10 benar, logo nav kembali MANTRA penuh, menu Lanjutkan simetris, kartu
latihan berlatar motif matematis, mode GURU (semua tingkat terbuka) lewat
tombol pojok kanan atas beranda. Keputusan ARYA: gambar hanya soal cerita,
bangun, grafik, data; sulit dikalibrasi ke UTBK, sangat sulit 5 bergaya
olimpiade plus 10 sulit-biasa; guru pilihan b (kata kunci, hanya hash SHA-256
yang disimpan di kode; kata kuncinya TIDAK ditulis di mana pun). ARYA minta
semuanya dikerjakan sekaligus sampai deploy, dicek belakangan.
Rancangan: `docs/superpowers/specs/2026-09-13-latihan-bergambar-mode-guru-design.md`,
rencana: `docs/superpowers/plans/2026-09-13-latihan-bergambar-mode-guru.md`.
- Tahap 1 (a677b7e sampai tahap bank): tipe `GambarSoal` (segitiga, lingkaran,
  grafik, vektor, batang, garis-data, balok, bidang, luas, svg) dan perender
  `web/components/latihan/gambar/*` (viewBox 460, huruf mono, petakAngka sampai
  10.000, kurva diklip); `SoalKuis.langkah/jebakan/gambar`; ArenaLatihan
  menampilkan gambar di bawah soal dan di panel pembahasan, langkah bernomor,
  kotak "Kenapa pilihan lain menggoda"; `SYARAT_NAIK = 10`; mode guru
  (`lib/mode-guru.ts`, `TombolGuru.tsx`, jawaban guru tidak direkam, kuis
  materi terbuka untuk guru); `LatarBab.tsx` motif per bab; logo nav penuh;
  galeri QC `/latihan/contoh-gambar?bab=<slug>`; alat `alat/cek_kuis.mjs`
  (15 per tingkat, id unik, 5 pilihan, tanpa em-dash dan "miskonsepsi",
  gambar sah, komentar `// cek: <js>` di atas `id:` dievaluasi mesin).
- Sembilan bank ditulis ulang, id lama dipertahankan, tiap soal punya langkah,
  jebakan, gambar bila bersituasi, dan cek mesin: Trigonometri d8b82f5, Vektor
  e7dae5b, Grafik Fungsi 3f81a52, Statistika a54b96b, Limit 56c6521, Ruang 3D
  (koordinat kubus untuk cek) dan Balok tanpa label ukuran kubus, Transformasi
  Geometri 16 jadi 60 (0b8db03; soal urutan-boleh-dibalik dulu punya DUA
  jawaban benar karena cermin y=x dan translasi (1,1) komutatif, pilihan
  diganti), Turunan dan Integral f0110a2 (cek numerik selisih simetris dan
  jumlahan titik tengah; batas kelipatan pi ditulis dengan lambang).
  `cek_kuis.mjs --semua --ketat`: 9 bab x 60 soal, 346 gambar, 434 cek mesin,
  SEMUA LOLOS. Galeri tiap bab dipotret playwright-cli dan dibaca per potongan.
- Deploy matra-hbwlr3w1u dialiaskan ke mantra-matematika.vercel.app; deploy lama
  matra-65kyvpery dihapus. Diverifikasi tayang: /latihan 9 kartu "60 soal",
  arena Limit menampilkan gambar dan tombol Guru.
- Insiden 13 Sep: saat mencari dev server MANTRA, PID 25564 di port 3000
  yang dimatikan ternyata dev server proyek lain (`D:\PROJECT AUTOMATION  WEBSITE
acik`). Dev server MANTRA sejak itu di port 3210. Sudah
  dilaporkan ke ARYA.
- Jebakan baru: perender Bidang dan pemeriksa harus menerima bangun satu titik
  (soal transformasi memindahkan satu titik); balok kurus (4x3x12) mengecil
  sampai hurufnya bertumpuk, pilih ukuran soal yang proporsinya wajar;
  cek `Math.abs(-x**2)` ditolak JS (perlu kurung).

## 14 SEP (dini hari): BERKAS LOMBA PPPMI 2026 DIVISI A1 DISIAPKAN (di luar repo: D:\PPPMI-2026)

ARYA (13 Sep malam) minta berkas Lomba Inovasi Media dan Pembelajaran
Matematika PPPMI 2026 (Rakernas, Bali 1-3 Okt; tenggat kirim 25 Sep 23.59
WIB). Keputusan: Divisi A1 Media Digital Interaktif, individu (S2 Pendidikan
Matematika Undiksha), tanpa uji coba siswa, repo dijadikan publik oleh ARYA
sendiri, data pribadi ditulis [kurung]. Rancangan dan fakta yang dikutip:
`docs/superpowers/specs/2026-09-13-berkas-lomba-pppmi-2026-design.md`
(commit 400fd17). Pedoman lomba: `C:\Users\ASUS\Downloads\Pedoman Lomba
Inovasi Media dan Pembelajaran Matematika_PPPMI 2026.pdf`.
- Berkas kerja di `D:\PPPMI-2026\kerja\` (python-docx lewat `dokumen.py`,
  PDF diekspor Word lewat `ekspor_pdf.ps1`, pratinjau PyMuPDF): 01 Deskripsi
  Karya (5 hlm, batas 3-5), 02 Skenario Pembelajaran Trigonometri sub-bab A
  2x45 menit plus LKPD (7 hlm), 03 Petunjuk Penggunaan (4 hlm, ada tempat
  kata kunci mode guru untuk juri), 04 Pernyataan Orisinalitas dan AI format
  Lampiran 5 (2 hlm; Claude menulis kode dan draf atas keputusan ARYA,
  edge-tts diungkap apa adanya), 05 Atribusi dan Lisensi (3 hlm), 06 Naskah
  Video Demo (stempel waktu dibaca dari `demo/waktu.json`), 07 Jawaban
  Formulir dan Daftar Periksa (bukan untuk dikirim). Tangkapan layar situs
  tayang di `kerja/layar/` (playwright-cli, desktop 1920x1080 dan HP).
- Video demo (syarat A1: 5-7 menit): rekaman layar tanpa suara dibuat skrip
  `kerja/demo/rekam_demo.js` (run-code playwright-cli, screencast 1920x1080,
  kursor palsu, kartu dan label overlay, potret HP tersemat). Tujuh kali
  rekam: 7:19 (kursor lambat), 4:56 (kelewat cepat), 5:12 dan 5:04 (tombol
  Lanjut kuis di bawah lipatan layar, klik tidak kena), akhirnya 5:52
  (`kerja/demo/06-Video-Demo-tanpa-suara.mp4`, H.264 1080p30). ARYA mengisi
  suara sambil menonton (naskah 06 berstempel waktu), Claude menggabungkan
  dengan ffmpeg. Lembar kontak tiap 10 detik sudah dinilai.
- Repo: `LICENSE` (kode MIT, isi CC BY-NC-SA 4.0) dan README (angka 13 Sep:
  9 bab, 40 sub-bab, 105 materi, 104 alat, 57 video 1080p60, 272 kuis, 38
  latihan; kredit suara edge-tts; bagian lisensi), commit 77418d3. Pemindaian
  rahasia seluruh riwayat git bersih (tidak ada .env, kunci, token); nomor WA
  ARYA ada di halaman Tentang (memang publik). Zip kode tanpa audio/video
  18,6 MB: `kerja/09-Kode-Sumber-MANTRA.zip`.
- Folder pengiriman `D:\PPPMI-2026\A1_NyomanAryaSejati_UNDIKSHA_MANTRA\`
  dirakit `kerja/rakit_final.py` (nomor berkas mengikuti Lampiran 1).
- MENUNGGU ARYA: halaman Tentang masih mengkredit ElevenLabs padahal suaranya
  edge-tts (`web/app/tentang/page.tsx`); usul ganti kartu jadi jujur, belum
  disentuh karena mengubah situs tayang. Juga: surat mahasiswa aktif, tanda
  tangan koordinator prodi, rekaman suara, kata kunci guru, ubah repo ke
  publik, unggah Drive, isi formulir go.undiksha.ac.id/lomba_PPMI.
- 14 Sep siang, permintaan ARYA: folder kirim diisi WORD (mau disunting sendiri)
  dengan nomor mengikuti tabel 6.1 pedoman (01 isian Google Form + daftar
  periksa, 02 keterangan aktif, 03 deskripsi, 04 skenario, 05 petunjuk, 06
  tautan karya, 07 naskah + rekaman layar, 08 pernyataan, 09 atribusi, 10
  zip kode). Dua TEMPLATE RESMI panitia (D:/PPPMI-2026/Template *.docx)
  diisi lewat `kerja/isi_template_panitia.py` tanpa mengubah tata letak
  (identitas, tabel AI 4 baris, blok tanda tangan); pernyataan versi sendiri
  tidak dipakai lagi. Berkas lama di folder final dipindah ke `kerja/lama/`.
  Angka soal 272 -> 540 di semua dokumen (bank 60 per bab tayang 14 Sep);
  video demo direkam ulang (label tanpa angka) jadi 5:56. `git push` ke
  GitHub main disetujui dan selesai (760 MB, 305 commit). ARYA berniat
  mengganti suara ke ElevenLabs; peringatan: 57 video harus dirender ulang
  dan dokumen harus cocok dengan situs saat penilaian 28-30 Sep; keputusan
  (a) sesudah lomba atau (b) sebelum 25 Sep masih menunggu.
- 14 Sep sore: ARYA memilih (b), sudah berlangganan ElevenLabs, sesi lain
  membuat ulang semua suara. Dokumen lomba, LICENSE, README, dan rancangan
  diubah: ElevenLabs = suara final, edge-tts = tahap draf/revisi (tetap
  diungkap, permintaan ARYA). Template pernyataan resmi: tabel AI jadi 5
  baris (Claude Code, Claude Design, ElevenLabs, edge-tts draf, graphify).
  Halaman Tentang tidak disentuh: kartu ElevenLabs menjadi benar begitu
  semua video bersuara ElevenLabs. Syarat di daftar periksa: kalau pada 25
  Sep belum semua 57 video bersuara ElevenLabs, dokumen dikembalikan ke
  edge-tts sebelum diunggah.
- 15 Sep: ARYA melaporkan semua video sudah bersuara Bian (ElevenLabs).
  Diverifikasi: 57 naskah `manim/narasi/*.json` bersuara `eleven:Bian -
  Neutral, Calm and Clear` (model eleven_multilingual_v2, commit dadfa0f),
  dan ke-57 mp4 yang tayang berukuran sama persis dengan berkas lokal (HEAD
  Content-Length). Nama suara dan model ditulis ke deskripsi, atribusi,
  naskah demo, daftar periksa, template pernyataan, LICENSE, README.
- Pelajaran: soal kuis diacak dari bank, jadi skrip demo tidak boleh
  mengandalkan teks pilihan tertentu (percobaan 1 gagal di situ dan
  rekamannya hilang; sekarang try/finally menutup screencast). Kursor palsu
  yang digerakkan per langkah lewat page.evaluate memakan waktu nyata: 900 ms
  gerak jadi 4 detik; langkahnya dikurangi. `getByRole('button', {name:
  /lanjut/i})` mengenai menu nav "Lanjutkan"; klik pada elemen di luar
  viewport diam saja, jadi klikElemen memanggil scrollIntoViewIfNeeded dulu.
  Durasi antar-rekaman bergeser sampai 10 detik karena waktu muat halaman;
  jangan menargetkan tepat di batas 5 atau 7 menit.

## 13 SEP (siang): SUMBU-X/SUMBU-Y DI 10 VIDEO, B6 SEGITIGA BESAR/KECIL, C9 PENGINGAT GARIS SINGGUNG DAN ASAL ANGKA TAN

Video (commit c5c1efd, deploy matra-fdgzwosru, alias mantra-matematika.vercel.app;
deploy lama matra-83v7p73vn dihapus). Sepuluh video dirender ulang 1080p60 satu
per satu (antrean berbasis berkas daftar, 10:37 sampai 14:50):
- Kata "sumbu mendatar / sumbu tegak / sumbu datar" diganti "sumbu-x / sumbu-y"
  (permintaan ARYA: pakai yang lebih akrab) di 10 naskah: tahap6, tahap8,
  tahap9 (tidak ada, cuma "posisi mendatar" yang memang bukan nama sumbu),
  grafik6, statistika13, transformasi1, turunan1, turunan3, vektor4, vektor6.
  Kalimat yang janggal bila diganti mentah ditulis tangan ("sumbu-x mendatar
  dan sumbu-y tegak", "Sumbu-x untuk besar sudut, sumbu-y untuk tinggi tadi",
  "Sumbu-y kita naikkan"). Jangkar `tunggu_kata` yang memakai kata lama
  ikut diganti (gerbang cek_pemicu_urut yang menemukannya, 5 adegan plus
  pembungkus `self.tunggu` Turunan 1). Dua pemicu jadi terlambat 0,00 dan
  0,05 detik karena kata baru lebih pendek: animasi sebelumnya dipendekkan.
  Cache `revisi/` Turunan 1 dan 3 tidak ada (worktree sesi dihapus 11 Sep),
  seluruh segmennya direkam ulang; durasinya sama persis kecuali segmen yang
  berubah.
- B6 Enam rasio: ikon segitiga (salinan isi segitiga diciutkan ke tinggi 0,5,
  `set_height`, bukan `scale_to_fit_height` yang tidak ada di ManimGL) di kiri
  tiap rumus kerja: besar (ungu) untuk depan/samping = depan/1 dan
  miring/samping, kecil (biru) untuk y/x, 1/x, x/y, 1/y, segitiga atas untuk
  cot dan csc; segitiganya di gambar berkedip (Indicate) saat rumusnya lahir.
  Di contoh 3-4-5 naskah menyebut "sec θ dibaca dari segitiga besar di garis
  x = 1", "cot θ dan csc θ dibaca dari segitiga di garis y = 1", dan segitiga
  itu diarsir (poligon statis di sudut 3-4-5) bersama ikon di samping tiap
  angka. Poster baru detik 180. 4:22 -> 4:30.
- C9 Tiga grafik, dua revisi ARYA:
  1. Sebelum bonus, segmen pengingat 28 detik dari Materi 06: lingkaran satuan
     di kiri, dua garis singgung, ruas tan dan sec di x = 1, cot dan csc di
     y = 1, segitiga kecil, lalu csc = 1/y, sec = 1/x, cot = x/y di kanan; di
     bonus1 rumus csc berpindah jadi keterangan papan. Ruas sec dan csc yang
     berimpit digeser tipis ke dua sisi sinar supaya keduanya terlihat. Layar
     kosong 3,5 detik (panel dihapus sebelum lingkaran lahir) ditutup dengan
     tiga nama csc, sec, cot sampai kata "Ingat".
  2. Angka tan 80 = 5,67, tan 89 = 57,29, tan 89,9 = 572,96 "jatuh dari
     langit" (ARYA: papan cuma sampai 1,7, tidak terlihat kenapa): kaca
     pembesar lingkaran satuan di kolom kanan (r 0,7) dengan ruas tinggi merah
     (0,98 lalu 1,00) dan ruas mendatar biru yang menciut (0,17, 0,017,
     0,0017), muncul di "makin dekat ke 90°"; deret angka diganti tabel sudut,
     mendatar, tan θ yang selnya lahir saat disebut; narasi menegaskan pembagi
     sepuluh kali lebih kecil, hasil sepuluh kali lebih besar. Operan dua
     desimal sengaja (0,98 : 0,17 = 5,76, bukan 5,67; narasi menyebut tinggi,
     mendatar, dan tan sebagai tiga fakta, tidak mengucapkan "dibagi sama
     dengan"), disetujui ARYA. "1 : 0 tak terdefinisi" turun ke y -0,85.
     Poster baru detik 118. 3:37 -> 4:19.
- Semua lolos gerbang; lembar kontak 480p (B6, C9 tiga kali) dan 1080p (10
  video, segmen yang berubah plus sebaran) dinilai; cek_subtitle, cek_aset,
  buat_poster --periksa lolos; alamat bersidik baru terverifikasi di situs
  tayang lewat playwright-cli (materi 9: mp4 91a2628ca3, vtt 1419f287e3).
- Salinan 10 video produksi sebelum ditimpa: D:\MANTRA-BACKUP6-09-13-sebelum-sumbu\.
- Jebakan baru: frame basi di qc/<video>/ ikut terbaca lembar kontak (nama
  detik-190_5.png), lembar.py kini menghapus foldernya dulu.
Situs juga (keputusan ARYA sore, commit f2e8bc0, deploy matra-bmind1jr3):
48 tempat di 11 berkas materi dan kuis plus 3 label widget (arah dari
sumbu-x, "Sumbu-y menampilkan", kalimat SumbuJujur) memakai sumbu-x/sumbu-y;
bentuk "sumbu tegaknya dimulai" jadi "sumbu-y dimulai" (akhiran -nya tidak
ditempelkan ke lambang), "Sumbu mendatarnya garis bilangan" jadi "Sumbu-x
berupa garis bilangan". tsc bersih; diverifikasi di situs tayang lewat
playwright-cli (Statistika materi 13: 0 sisa kata lama). Komentar kode tidak
diubah.

## 13 SEP (pagi): REVISI ARYA KEDUA TAYANG: 44 KOTAK ANGKA, SAKLAR KATA, PEMUTAR, WIDGET SUDUT ISTIMEWA, TIGA VIDEO TRIGONOMETRI DIPERDALAM

Situs (commit df991af, deploy matra-ebnyhxfaz):
- 44 kotak angka yang masih berhuruf lebar-sama ditulis ulang barisnya (pemisah
  kolom dua spasi, jumlah sel tiap baris sama) jadi 201 dari 201 kotak tabel
  huruf situs; baris kosong jadi jeda tipis.
- Cap "Intinya" jadi "Kalimat kunci" (ARYA: "Intinya" terdengar memaksa).
- Pemutar: spasi tidak lagi putar-lalu-berhenti (kalau videonya fokus, kontrol
  bawaan Chrome menangani spasi sendiri di shadow DOM; kode diam), panah
  kiri/kanan 5 detik, ketuk ganda di HP 5 detik (ditambatkan ke waktu ketukan
  pertama karena Chrome Android punya gerakan 10 detik sendiri), lencana
  "+5 detik". Diuji Playwright (uji_pemutar.mjs).
- Widget Sudut istimewa: satuan derajat bawaan plus saklar radian, label
  cos/sin di ruasnya, koordinat (cos θ, sin θ) di ujung jari-jari, nilai di
  tabel sebelah; contoh dunia nyata ditulis ulang (tan(sudut kemiringan) =
  tarikan mendatar : tarikan tegak, dst.).
Video Trigonometri (commit 8e2fa09, deploy matra-83v7p73vn, 1080p60):
- B6 Enam rasio 2:21 -> 4:22: segar-ingat A4 (enam pembagian pada segitiga),
  titik x = 1 dan y = 1 ditandai, DUA SEGITIGA SEBANGUN (kecil miring 1, besar
  samping 1) melahirkan tan dan sec sebagai panjang sekaligus y/x dan 1/x;
  untuk y = 1, theta muncul lagi di titik tabrak (garis sejajar sumbu) sehingga
  depan = 1 dan ruasnya cot dan csc; contoh 3-4-5 diperluas ke sec 1,25, cot
  1,33, csc 1,67.
- B7 Sudut istimewa 2:31 -> 3:28: cos 45 (1/akar 2 = akar 2/2), cos 30, cos 60
  masuk panel; kedua segitiga diciutkan ke sisi miring 1 (= jari-jari
  lingkaran, skala 1,9/2,576, bukan 0,5 yang terlalu kecil); tiap titik di
  lingkaran ditegaskan (cos, sin) dengan kaki biru dan merah, di 30 derajat
  kakinya diberi angka sebelum koordinatnya ditulis.
- C9 Tiga grafik 2:06 -> 3:37: tan tak terdefinisi dijelaskan pelan (pembagi
  mengecil, deret tan 80 = 5,67, tan 89 = 57,29, tan 89,9 = 572,96 di kolom
  kanan, "1 : 0 tak terdefinisi", garis putus-putus yang tidak disentuh,
  negatif lewat 90, terulang di 270); bonus grafik csc, sec, cot di satu papan
  besar, ketiga panel dikembalikan untuk penutup; halaman materi 09 diberi
  blok "Bonus: kebalikannya juga punya grafik".
- Semua lolos gerbang (cek_kode, cek_pemicu_urut, cek_waktu_adegan, qc,
  cek_layar_kosong, cek_subtitle, cek_aset_video), lembar kontak 480p dan
  1080p dinilai; label sinema maksimal dua kata ("tak terdefinisi").
Berikutnya: umpan balik ARYA atas ketiga video dan tampilan baru; keputusan
video yang mau diperdalam di topik lain.

## 13 SEP (dini hari): REVISI GLOBAL KEDUA ARYA (kotak coba, kotak angka, gulir ke atas), POTRET EMPAT GENERASI UI UNTUK TESIS, RETENTION VERCEL

- Revisi ARYA 12 Sep malam, semuanya di perender (`Penjelasan.tsx`,
  `HalamanTopik.tsx`, `globals.css`), tanpa mengubah 201 kotak isi:
  1. Kotak "Yuk bereksperimen": langkah bernomor 1, 2, 3 (angka dalam kotak
     emas). Kalimat sorot yang berdiri tepat di bawah kotak (11 tempat, 9 di
     Trigonometri, 2 di Ruang 3D) ternyata jawaban percobaannya: kini masuk
     ke dalam kotak sebagai penutup bersub-judul "Yang kamu temukan".
     Kalimat sorot lainnya (123) bercap kecil "Intinya".
  2. Kotak angka (contoh): barisnya dulu dijajarkan dengan spasi untuk huruf
     lebar-sama, dan huruf MANTRA (3 Sep) merusak jajarannya. Sekarang baris
     dipecah di dua spasi atau lebih jadi sel; kotak yang susunannya
     konsisten (157) jadi grid (kolom selebar isinya, kolom terakhir mengisi
     sisa), yang tidak konsisten (44: "masuk  0" dijajarkan ke "masuk -2",
     deretan 15 angka) dirender dengan huruf lebar-sama sistem supaya
     jajaran penulisnya utuh. Di HP: grid berkolom empat ke atas mengalir
     seperti kalimat per baris; baris huruf lebar-sama yang kelewat panjang
     dibungkus. `contain: inline-size` mencegah kotak melebarkan kolomnya.
  3. Pindah materi (sidebar, Kembali/Lanjut) selalu mulai dari atas: kolom
     bacaan, kolom alat, <main>, dan jendela digulir ke 0 (`kunciLayar`).
  4. Sapuan Playwright 105 materi x 2 lebar (1366, 375): 0 masalah, tidak ada
     kotak yang menggulir menyamping di HP, langkah bernomor di 100 kotak
     coba, 11 "Yang kamu temukan".
- Potret empat generasi tampilan untuk tesis: `docs/tesis/versi-ui/` (31
  potret, README berisi tanggal, commit, ciri tiap generasi), kode
  generasi lama dihidupkan dari git (`git archive`, node_modules junction,
  `next dev --webpack`) dan dipotret `alat/potret_versi_ui.mjs`.
- Vercel (ARYA login di Browser pane): Deployment Storage 12,1 GB, hampir
  semuanya matra (11,82 GB) dari tumpukan deployment yang sudah dihapus;
  angkanya per hari, jadi baru turun sehari kemudian; deployment terhapus
  masuk "Recently Deleted" 30 hari. Retention policy proyek matra disetel 1
  hari untuk keempat jenis. `mantra-uji` dan `mantra-rancangan-v2` dihapus
  atas izin ARYA; LENTERA HARUM tidak disentuh (perintah tegas ARYA).
Berikutnya: umpan balik ARYA atas tampilan baru; keputusan video yang mau
diperdalam (durasi seragam per bab).

## 12 SEP (malam): PERBAIKAN GLOBAL ARYA, ENAM BUTIR

Umpan balik ARYA sesudah 58 video v3.1 tayang, semuanya dikerjakan MASTER:
1. DURASI SERAGAM PER BAB (pertanyaan, belum diubah). Diukur: Trigonometri
   2:06 sampai 2:40, Limit 2:29 sampai 3:01, Statistika 03 sampai 13 2:23
   sampai 3:04; yang bervariasi hanya Vektor (2:58 sampai 4:55), Ruang 3D (2:10
   sampai 4:38), Transformasi (3:24 sampai 4:44), Turunan (3:35 sampai 5:55),
   Integral (3:09 sampai 6:00). Sebabnya bukan aturan, melainkan cara
   menulisnya: satu kerangka v3.1 yang sama, satu penulis, satu gelombang per
   topik, dan isi disamakan dengan naskah lama yang disetujui (Trigonometri
   memang 2 menit sejak awal). Menunggu ARYA menunjuk video mana yang perlu
   lebih dalam.
2. SUBTITLE "TELAT" DI DUA VIDEO PEMBUKA BAB. Diukur dari suara di mp4 final
   (skrip scratchpad `ukur_sinkron_mp4.py`, energi per 10 ms dibanding cue vtt)
   pada kesembilan video pembuka bab: cue mulai 0,10 sampai 0,24 detik SEBELUM
   suara, rata-rata 0,13, tidak pernah sesudahnya. Berkasnya sinkron. Sebab
   yang paling masuk akal: `/anim/*` dilayani immutable setahun
   (next.config.ts) sedangkan mp4 dan vtt diganti isinya dengan nama yang
   sama, jadi peramban ARYA memutar subtitle lama di atas video baru.
   Perbaikan: `web/scripts/versi-anim.mjs` menulis `web/lib/versi-anim.json`
   (sidik md5 tiap berkas anim), dijalankan otomatis lewat `prebuild`;
   `alamatAnim()` di PemutarVideo menempelkan `?v=<sidik>` (Demo beranda
   ikut). `cek_aset_video.py` kini menolak sidik yang basi (dibuktikan
   dengan sidik yang ditanam salah).
3. SAKLAR SUBTITLE di tiap pemutar ("Subtitle hidup / mati", diingat di
   `matra:subtitle:tampil`, lewat `textTracks[].mode`, jalurnya tetap dimuat).
4. ATURAN SUBTITLE BARU: tidak ada potongan lebih pendek dari 10 huruf
   (`MIN_HURUF` di buat_subtitle.py; susunan potongan dicari yang paling
   sedikit barisnya lalu paling serakah dari kiri, sama dengan dulu, dan
   hanya berubah kalau ekornya sepatah kata; kalau tak terhindarkan, barisnya
   dibiarkan melewati 56 huruf). Sekalian: koma di dalam kurung bukan lagi
   titik potong ("(cos θ, sin θ)" pernah terbelah). 23 vtt berubah,
   `cek_subtitle --semua` lolos. Kalimat pendek utuh seperti "Cocok." atau
   "Bagi 2." tetap sendiri: itu irama naratornya, bukan potongan.
5. SPASI = putar/jeda: ditangkap di dokumen selama pemutar "dipegang" (pernah
   disentuh atau diputar, dan siswa belum mengeklik bagian lain halaman);
   video yang berjalan selalu bisa dijeda; spasi di kotak isian dan tombol
   dibiarkan. Diuji Playwright: putar, jeda, putar lagi; sesudah klik judul,
   spasi tidak lagi mengenai video.
6. TOMBOL PILIHAN KELUAR LAYAR (Trigonometri 07, 180° ke atas). `.pilihan-segmen`
   dari grid satu baris jadi flex-wrap. Sapuan Playwright 105 materi x 3 lebar
   (375, 1180, 1366): 68 kotak pilihan, tidak ada tombol keluar kotak; di
   kolom alat 1366 ada 23 kotak yang sekarang membungkus dua sampai empat
   baris (dulu terpotong). Sudut kotak 21px supaya dua baris tidak berbentuk
   telur.
- Commit 06f9d0e, deploy matra-h9g7dnush dialiaskan ke mantra-matematika
  (diperiksa di situs tayang: alamat video, subtitle, poster bersidik dan
  saklar subtitle ada). Vercel: proyek `matra` tinggal 3 deploy (produksi +
  `mantra-uji` 4 Sep + `mantra-rancangan-v2` 5 Sep, keduanya punya alias
  bernama, belum dihapus tanpa izin ARYA). Angka >10 GB di dasbor juga memuat dua proyek LENTERA
  HARUM (simpus-imun 9 deploy, simpus-posyandu 20 deploy).
Berikutnya: keputusan ARYA soal video yang mau diperdalam (butir 1) dan dua
alias lama (mantra-uji, mantra-rancangan-v2).

## 12 SEP (petang): STATISTIKA 13 VIDEO 1080p SELESAI, RUANG 3D 01 DIRENDER ULANG, TRANSFORMASI 5, TURUNAN 06 07, INTEGRAL 5 DITULIS v3.1

Ketiga belas Statistika (2:24 sampai 5:58) dirender 1080p60 satu per satu
lewat antrean latar, digabung, layar kosong diperiksa, subtitle dan poster
dibuat, `cek_aset_video statistika` lolos. Ruang 3D 01 dirender ulang dengan
label "(3, 3, 6)" di atas atap (dibuktikan pada frame 1080p), poster dibuat
ulang. Transformasi 01 dan 02 disesuaikan, 03, 04, 06 ditulis ulang v3.1
(03 rotasi: dua langkah B ikut diputar; 04 dilatasi: kotak 6 x 1 jadi 12 x 2;
06 komposisi matriks: M1 (3, 1) lalu M2 dibaca utuh M2 M1); Turunan 06 (hasil
kali: kedua pita dibaca sebagai u'v dan uv') dan 07 (aturan rantai, Leibniz)
ditulis ulang; Integral 01 dan 03 (sudah v3) disesuaikan pembuka, segar-ingat,
dan penutupnya; Integral 05 (Riemann: tujuh segitiga sisa setengah satuan),
07 (TDK: kotak pembesaran pita, C terhapus di depan mata), 09 (luas di bawah
sumbu: antiturunan dihitung di panel) ditulis ulang. Semua lolos gerbang;
lembar kontak 480p dinilai untuk Transformasi 1 sampai 6, Turunan 06 07,
Integral 01 03; antrean 1080p sembilan video itu berjalan, Integral 05 07 09
menunggu uji 480p.
- Sesi obrolan sempat mati satu kali (13:00): render di latar (nohup) tetap
  hidup dan selesai; tidak ada yang diulang. Cukup buka sesi baru dan lanjut.
- JEBAKAN BARU: ManimGL menambahkan kembali benda yang dianimasikan (Indicate
  pada baris papan yang sudah di-FadeOut oleh kosongkan_papan memunculkannya
  lagi TANPA terdaftar, lalu baris berikutnya jatuh menindihnya: Transformasi
  03 babak "sama"). Kalau benda dimunculkan lagi, daftarkan lagi ke
  `papan.baris_lain`. Label langkah yang berimpit sumbu jangan ditaruh di
  kiri sumbu (menindih angka sumbu; qc `tulisan` tidak menangkapnya).
  Baris HUD mendatar di y 1,85 menindih puncak bidang KOTAK_C (qc menolak):
  disusun ke bawah di zona panel yang kosong. Judul penutup di (0, 2,9)
  menindih puncak bidang kecil Integral 05: dipindah ke (4,4, 2,35).
  cek_layar_kosong menangkap jeda 2 sampai 8 detik setiap kali gambar dibuang
  di awal babak sebelum penggantinya muncul (Transformasi 01, 02, 04, Turunan
  06, 07): buang BERSAMAAN dengan FadeIn penggantinya.
- Poster Statistika dipilih dari frame yang isinya penuh (02 pada 180 s, 01
  pada 260 s), dilihat lewat lembar kontak poster.
- Malamnya: kedua belas video itu (Transformasi 01 02 03 04 06, Turunan 06
  07, Integral 01 03 05 07 09) selesai 1080p60 satu per satu, frame 1080p
  dibuka pada titik perbaikan (Transformasi 02 dirender ulang sekali karena
  "(1, 1)" menindih huruf A), subtitle dan poster dibuat, `cek_aset_video`
  transformasi, turunan, integral lolos. Deploy kedua hari ini. Yang belum
  v3.1 tinggal Turunan 01 sampai 04 (dibiarkan, sudah disetujui) dan
  Transformasi 05 (Materi 09, tidak dirujuk halaman mana pun).
Berikutnya: menunggu umpan balik ARYA atas 58 video v3.1; perapian proyek.

## 12 SEP (sore): RUANG 3D ENAM VIDEO 1080p SELESAI, STATISTIKA 13 ADEGAN v3.1 DITULIS DAN DIUJI 480p

Ruang 3D 01, 03, 04, 06, 08, 09 (2:11 sampai 4:39) dirender 1080p60 lewat
antrean satu per satu, digabung, subtitle dan poster dibuat, `cek_aset_video`
lolos; 01 dirender ulang sekali karena label "(3, 3, 6)" menempel pada "EG"
di 1080p. Statistika: ketiga belas adegan ditulis ulang v3.1 (01 diadaptasi,
02 sampai 13 ditulis baru: pembuka sub-bab plus Bagian n dengan pertanyaan
halaman, segar-ingat hanya pada prasyarat nyata, contoh angka, asal rumus,
bentuk umum di panel, penutup menunjuk materi berikutnya; jungkat-jungkit,
penggaris, botol, dan lembar jawaban dari adegan lama dipertahankan), lolos
semua gerbang, diuji 480p dua putaran dan lembar kontaknya dinilai.
- JEBAKAN BARU: theta -45 memandang tepat sepanjang bidang x = y, jadi
  diagonal ruang AG dan segitiga ACG terlihat sebagai satu garis tegak (04,
  09); uji bingkai tunggal `manim/scenes/uji/uji_sudut_acg.py`. Rumus utama
  berbentuk pecahan menindih baris yang sudah duduk di panel (09): papan
  `tanpa_utama` dan lahir `sebagai_utama=False`. Gerbang `cek_pemicu_urut`
  belum menghitung `sorot_*(lama=)`, `lahir_rumus(tahan=)`, `papan.baris`
  bawaan, dan tidak membaca perulangan: sekarang dihitung; frasa di dalam
  `for` tetap diperiksa tangan (ke= pada "empat" Statistika 03).
- Penyimpanan deploy Vercel melewati 10 GB (tiap deploy menyimpan seluruh
  folder video): 52 deployment lama dihapus atas permintaan ARYA, disisakan 3
  yang beralias. Deploy per kelompok video mulai sekarang.
Berikutnya: render 1080p Statistika 01 sampai 13 lalu tayangkan bersama Ruang
3D; Transformasi (5), Turunan 06 dan 07, Integral (5).

## 12 SEP (siang): KEENAM VIDEO VEKTOR v3.1 TAYANG, GRAFIK 03 SELESAI, RUANG 3D DISIAPKAN

Vektor 01 (4:38) dan 03 (4:55) disesuaikan dari naskah v3 sesi (pembuka
sub-bab, segar-ingat Pythagoras dipadatkan satu segmen, penutup menunjuk
materi berikutnya, kalimat narasi bukan teks layar, pita sorot tembus
pandang); 04 (3:23), 06 (2:58), 08 (3:12), 09 (3:13) ditulis ulang dari naskah
lama yang disetujui dengan segar-ingat, contoh angka, bentuk umum, penutup.
Semua 1080p60, lembar kontak 480p dan 1080p dibuka, deploy produksi diverifikasi
(commit 1837e01, 89ebb9d, 0cd137d).
- JEBAKAN BARU: `Indicate` pada panah `always_redraw` tidak berbekas sama
  sekali, dan Indicate sewarna bendanya (panah ungu disorot ungu) juga tidak
  terlihat: sorot panah memakai pita ungu tembus pandang (`sorot_pita`).
  `Arrow.set_stroke(opacity=)` TIDAK meredupkan panah (ujungnya isian):
  pakai `set_opacity`. Kamera miring 6 derajat pada segar-ingat membuat
  segitiga 4-3 di petak berbohong: kamera tegak lurus sejak awal, "kita lihat
  dari atas" tinggal zum ringan. Titik yang jatuh di bawah panel rumus
  ketahuan gerbang qc begitu bendanya didaftarkan (Vektor 09 bola di (6, 3)):
  `kamera.muat_datar(bidang, sisa_kanan=2.6)`. Dua render 1080p yang tidak
  sengaja berjalan bersamaan (perbaikan dikirim saat render lama masih hidup)
  dimatikan lewat PID, berkas _temp dihapus, render diulang dari nol.
- Grafik 03 (Fungsi Kuadrat Bagian 1, 6:02) disesuaikan dari v3 sesi dan
  dirender 1080p; Grafik 06 (Transformasi Fungsi Bagian 1, 3:29) ditulis ulang
  dua dimensi dan sedang dirender. Ruang 3D: 01 dan 03 disesuaikan, 04, 06,
  08, 09 ditulis ulang di atas `ruang_3d_umum` (JamKata,
  `tunggu_kata_bergeser`), menunggu render 480p.
Berikutnya: render dan tayangkan Grafik 06, Ruang 3D (6), lalu Statistika
(13), Transformasi (5), Turunan 06 dan 07, Integral (5).

## 12 SEP: KETUJUH VIDEO LIMIT DITULIS DARI NOL v3.1, ManimGL 1080p60, TAYANG

Topik Limit tidak punya adegan ManimGL sama sekali (hanya arsip Manim CE), jadi
ketujuhnya (01, 02, 04, 06, 07, 08, 09; 2:30 sampai 3:01) ditulis MASTER dari
nol mengikuti tata letak lama yang sudah disetujui, dengan pembuka sub-bab,
segar-ingat, contoh angka, dan penutup menunjuk materi berikutnya. Kalimat
narasi tidak lagi ditulis sebagai teks di layar; yang bercerita lambang, angka,
lampu syarat, pita sorot tembus pandang.
- Pola baru yang terbukti: pecahan dibangun dari bagian terpisah supaya
  coretan mendarat tepat pada faktornya (06, 04); lingkaran bolong diperbesar
  supaya titik 2,99 jatuh DI DALAM cincin (02); skala x diperbesar supaya
  titik tetangga lepas dari lubang (04); papan manual untuk rentang yang tidak
  memuat 0 (07, Axes ManimGL selalu menaruh 0 di titik potong); daerah luas
  hidup mengikuti pelacak sudut (08); tiga lampu syarat biru/merah (09); rel
  dipecah tiga potongan, bukan ditutup kotak sewarna kertas (kotaknya samar
  terlihat, warna isian dan latar beda dua tingkat).
- JEBAKAN BARU: `Indicate` pada lingkaran bolong berisi kertas mengisi
  lubangnya jadi cakram penuh (02 dan 04 dirender ulang); sorot lingkaran
  bolong memakai cincin tanpa isian. `cek_layar_kosong` menganggap satu huruf
  "x" saja sebagai layar kosong (di bawah 0,1 persen): beri benda pendamping.
- Semua gerbang lolos per video, lembar kontak 480p dan 1080p dibuka, celah
  layar kosong ditutup satu per satu. tahap.ts menunjuk mp4, webm lama
  dihapus, deploy produksi bertahap (01+02+04, lalu 06 sampai 09).
Berikutnya: 40 video lain masih pembuka lama (cek_pembuka_video): Vektor 6,
Grafik 2, Ruang 3D 6, Statistika 13, Transformasi 5, Turunan 06 dan 07,
Integral 5. Turunan 01 sampai 04 dibiarkan (keputusan ARYA 10 Sep).

## 12 SEP (dini hari): TRIGONOMETRI 05 SAMPAI 09 SELESAI v3.1, SEMUA VIDEO TRIGONOMETRI TAYANG (master 4c4ffdc plus 08 dan 09)

ARYA menonton 02 dan 04 (11 Sep malam): "sudah sangat bagus ... Aku suka
semua", dengan dua koreksi yang berlaku untuk SEMUA video: (1) sorot rumus
tidak boleh menutup rumusnya (Indicate pada panel membuatnya jadi kotak ungu,
"terlihat seperti glitch"): kini `papan.sorot()` menyorot barisnya saja dan
sorot garis atau kurva memakai pita ungu TEMBUS PANDANG yang lebih lebar
dari bendanya; (2) tidak boleh ada potongan gambar yang tidak dijelaskan
(busur seperempat lingkaran sebagai "pancingan" dianggap glitch): dihapus.
ARYA: "lanjut saja sampai tuntas ... langsung 1080p kan saja", jadi
sisanya dikerjakan MASTER tanpa tinjauan per video, langsung 1080p60.
- 05 Lingkaran Satuan Bagian 1 (2:26), 06 Bagian 2 (2:22), 07 Bagian 3
  (2:32), 08 Grafik Fungsi Trigonometri Bagian 1 (2:19), 09 Bagian 2 (2:07).
  Isi tetap sama dengan naskah lama; tambahannya pembuka sub-bab, segar-ingat
  dari bagian sebelumnya, contoh angka, penutup menunjuk bagian berikutnya.
- 08: lingkaran besar di tengah untuk segar-ingat lalu DIGESER mengecil ke
  kiri (empat pelacak: pusat, jari-jari, sudut), papan grafik di kanan
  dengan satu satuan tinggi = jari-jari sehingga penghubungnya mendatar;
  catatan contoh (sin 30, sin 60) di ruang kosong di atas papan; tiga grafik
  kecil sin, cos, tan sebagai penunjuk Bagian 2.
- 09: tiga panel (pola beranda) diperkecil supaya jalur subtitle dan pojok
  identitas terjaga; TIGA pelacak sudut (versi lama mengembalikan satu
  pelacak ke nol sehingga kurva yang sudah jadi lenyap), "satu sudut yang
  sama" diperlihatkan lewat gerak serentak 0 ke 45 dan satu putaran penuh di
  penutup; tan digambar per cabang dengan asimtot; panel rumus HUD tidak
  dipakai (papan atas memenuhi zonanya), rumus tan di kolom kanan.
- JEBAKAN BARU: dua render 1080p60 SEKALIGUS menghasilkan video 05 HITAM dari
  detik 54 tanpa galat apa pun (ketahuan `cek_layar_kosong`). Aturan: render
  1080p SATU PER SATU, dan `cek_layar_kosong` wajib pada berkas final.
  `FadeIn` pada kurva `always_redraw` yang jumlah titiknya berubah GAGAL
  ("could not broadcast"): munculkan salinan diam lalu tukar.
- Semua gerbang lolos, lembar kontak 480p dan 1080p dibuka per video.
  tahap.ts menunjuk mp4, webm lama dihapus, deploy produksi (05 sampai 07
  dulu, lalu 08 dan 09), ukuran mp4 di produksi diverifikasi sama.
Berikutnya: 47 video lain masih pembuka lama (cek_pembuka_video), urutan:
Limit (7, belum ada adegan ManimGL, tulis dari arsip CE), lalu Vektor,
Grafik, Ruang 3D, Statistika, Transformasi, Turunan 06 dan 07, Integral.
Turunan 01 sampai 04 dibiarkan (keputusan ARYA 10 Sep).

## 11 SEP (malam): DUA VIDEO PERTAMA v3.1, TRIGONOMETRI 02 DAN 04, MENUNGGU ARYA (master 14052da)

Permintaan ARYA: mulai dari Trigonometri, dua video sekaligus, durasi
dilonggarkan 2 sampai 6 menit (jangan dipaksakan 6), isi kurang lebih sama
dengan video lama yang sudah bagus, kualitas tidak boleh turun. Hasil:
- `tahap2-perbandingan-tetap` (Materi 02, "Perbandingan Trigonometri,
  Bagian 2") 2:23, 57 pemicu kata, dan `tahap4-lahirnya-rasio` (Materi 04,
  "Bagian 4") 2:40, 51 pemicu; keduanya ManimGL 1080p60 mp4 (video lama
  Manim CE webm 1:32 dan 1:22). Isinya sama; tambahannya pembuka v3.1,
  segar-ingat singkat (Bagian 1: orang dan pohon 1,25; Bagian 3: nama sisi),
  "berapa pun pengalinya" (02), "kenapa 2 bukan 3" dan contoh 3-4-5 (04),
  penutup yang menunjuk bagian berikutnya. Tanpa Pythagoras.
- Semua gerbang lolos: cek_kode, cek_pemicu_urut, cek_waktu_adegan (kini
  mengenal `ke=`), cek_pembuka_video, qc, cek_layar_kosong, cek_subtitle,
  cek_aset_video; lembar kontak 480p dan 1080p DIBUKA: lima cacat ditemukan
  dan ditutup sebelum final (rasio menindih garis tanah, "1188" saat
  pudar-silang, TAB dari heredoc jadi "sin heta", "miring = 5" menindih
  garis miring, "sudut tetap" menindih sisi miring, lingkaran penuh keluar
  bingkai, layar kosong 3 dan 7 detik).
- Angka hidup dirender LaTeX (`always_redraw(rumus(...))`), bukan
  DecimalNumber Pango; jebakan 42 sampai 46 dicatat di memori MASTER.
- Berkas untuk ARYA: `D:\MANTRA-BACKUP\2026-09-11\UNTUK ARYA PERIKSA\`
  (final 1080p60 dan salinan 480p bersubtitel, plus BACA DULU.txt).
- `tahap.ts` sudah menunjuk mp4, tsc bersih, BELUM deploy; webm lama masih
  di `web/public/anim` sampai ARYA menyetujui.
Berikutnya: menunggu tinjauan ARYA; kalau disetujui, deploy dan lanjut
Trigonometri 05, 06, 07 (kelompok dua sampai tiga).

## 11 SEP: PAKET SITUS TAYANG, PERAPIAN SELESAI, ASET VIDEO DISAMAKAN (master 1b8c30e)

Deploy produksi tiga kali (matra-eight dan mantra-matematika): paket situs,
lalu perbaikan aset, lalu perapian. Yang ketahuan saat verifikasi produksi:
mp4 TIDAK dilacak git, jadi penggabungan cabang 10 Sep membawa vtt dan poster
versi v3 sesi ke master sementara videonya masih lama (subtitle 5 menit di
atas video 2 menit pada 8 video). Dipulihkan ke versi sebelum penggabungan
(f13f9fb) supaya sepasang lagi; `cek_subtitle` kini menandai 11 video yang
naskahnya v3 tetapi videonya belum ada, dan itu memang daftar tunggu v3.1.
Enam mp4 Vektor 03/04/06/08/09 dan Grafik 06 diganti salinan 1080p isi sama
dari worktree. Video v3 buatan sesi (Vektor 01 4:56, Grafik 03 5:58, Integral
01 dan 03 480p, Statistika 01 480p, Ruang 3D 01 dan 03 480p bersubtitel) TIDAK
ditayangkan (pembukanya gaya lama dan Pythagoras dipaksakan); salinannya di
`D:\MANTRA-BACKUP\2026-09-11\worktree-*` dan `UNTUK ARYA\CEK 480P`.

Perapian (`docs/tugas/PERAPIAN-2026-09-11.md`, disetujui ARYA): backup
dibuktikan sama jumlah dan byte, lalu dihapus: tangkapan layar root, qc/,
salinan PDF, cache suara, media lama, Manim CE, enam worktree, `UNTUK ARYA/`;
catatan era sesi ke `docs/arsip-sesi/`. Belum: hapus 18 cabang tergabung
(penjaga alat memblokir; ARYA sendiri), dan penyatuan kode dobel widget.
Berikutnya: video pertama gaya v3.1 untuk ditonton ARYA.

## 11 SEP (dini hari): PAKET SITUS REVISI ARYA SELESAI DI MASTER (b949aef), BELUM DEPLOY

Semua butir tampilan dari `docs/tugas/REVISI-ARYA-2026-09-10.md` dikerjakan
MASTER dan dipotret dengan playwright (desktop 1366 dan HP 375):
- logo nav tinggal lambang "M" (`mantra-simbol-gelap.png`);
- "Lanjutkan" jadi laci di samping "Peta Materi" (`components/LaciLanjut.tsx`):
  daftar 9 bab dengan persen yang berjalan 0 ke nilainya, 4 baris terlihat
  lalu gulir; tiap baris ke `/topik/<slug>?materi=lanjut`, dan `HalamanTopik`
  yang memutuskan materi pertama yang belum dibuka (penahan `lanjutBeres`
  supaya materi 01 tidak keburu tercatat dibuka; diuji dua kunjungan: 01 lalu 02);
- kartu Peta Materi: pertanyaan umum per bab (`Bab.tanya` di `subbab.ts`),
  kicker hanya kelas; nomor bab buku dan sebutan kurikulum dibuang di semua
  halaman (peta, tentang, sidebar, remah, catatan pengayaan Vektor dan
  Grafik Fungsi);
- "Tahap N" jadi "Materi 0N" di 139 baris teks siswa (hanya di dalam string
  konten, jalur modul dan nama tipe tidak disentuh);
- judul materi di atas video, desktop dan HP.
tsc dan eslint bersih. Pemeriksa urutan lolos kecuali 3 temuan lama Grafik
Fungsi (istilah parabola dan asimtot, bukan akibat perubahan ini).
Deploy MENUNGGU izin ARYA. Berikutnya: daftar perapian proyek (butir 13).

## 10 SEP: DELAPAN SESI DIBUBARKAN, MASTER MENGERJAKAN SEMUA; 13 REVISI ARYA DICATAT

Keputusan ARYA setelah menonton video pertama gelombang 4: hasilnya
mengecewakan (contoh Pythagoras di catatan dipaksakan ke hampir semua video,
pembuka menyebut judul materi yang tidak memberi tahu siswa materi mana).
Sejak hari ini MASTER sendiri yang menulis ulang semua 58 video, merevisi
situs, dan merapikan proyek; MASTER DILARANG mengirim tugas atau pesan ke sesi
lain. Semua di `docs/tugas/REVISI-ARYA-2026-09-10.md` (13 butir; keputusan;
nama sub-bab dan sembilan pertanyaan bab yang DISETUJUI).

Yang sudah dikerjakan hari ini:
- Enam cabang sesi digabung ke master (statistika, transformasi, integral,
  ruang-3d, grafik-fungsi, vektor; pekerjaan yang belum di-commit di empat
  worktree di-commit MASTER dulu). Isinya: video v3 Vektor 01, Grafik 03,
  Ruang 3D 01 dan 03, Integral 01 dan 03 (semua masih pembuka gaya lama),
  naskah v3 Statistika 01 dan 02, Transformasi 01 dan 02 setengah jadi.
- `alat/cek_pemicu_urut.py` disatukan dari TIGA versi (master: ramalan jam;
  Ruang 3D: penolong pemakan waktu, pembungkus tunggu_kata, EKOR; Grafik:
  `self.bagian`, kutip tunggal, nol babak). Sepuluh uji dua arah lolos.
  Turunan 1 sampai 3 memakai pembungkus pribadi `self.tunggu` yang SENGAJA
  tidak dibaca (tujuh alarm palsu kalau dibaca); alat melaporkannya "NOL
  pemicu", jujur bahwa ia tidak bisa memeriksanya.
- STANDAR-VIDEO-V3 mendapat bagian v3.1; CLAUDE.md dan subbab.ts disesuaikan.
- tsc bersih; cek_subtitle dan cek_aset_video menandai video yang naskahnya
  sudah v3 tetapi videonya belum (Transformasi 02 dan kawan-kawan), itu
  pekerjaan yang memang menunggu.
Berikutnya: paket situs (logo M, hapus sebutan kurikulum, Tahap ke Materi,
judul di atas video, Lanjutkan berdropdown, pertanyaan bab), lalu daftar
perapian proyek untuk disetujui ARYA, lalu video satu per satu.

## 9 SEP: VIDEO 04 TURUNAN v3, DUA ALAT DIPERKUAT LAGI

Sesi Turunan menyetor video 04 standar v3 (4:08, 1080p60, 67 pemicu selisih
maks 0,031 s, daftar periksa sepuluh butir terisi); digabung dan dipasang di
master. Penghubungnya dibetulkan: naskah lama membuka "itu pola, bukan bukti"
padahal video 03 v3 sudah membuktikan rumusnya.

Dua temuan mereka dikerjakan di perkakas bersama:
- `cek_pemicu_urut.py` kini MERAMALKAN jam adegan dari `run_time` di kode,
  jadi pemicu yang akan kedahuluan animasi ketahuan SEBELUM render (ambang
  nol, bukan 0,15: pembulatan frame membesarkan selisih). Uji dua arah di
  `manim/uji/uji_pemicu_urut.py`.
- `cek_subtitle.py` menolak vtt basi lewat SIDIK JARI naskah yang ditulis
  `buat_subtitle` ke dalam vtt. Versi pertama penjaga ini memakai cap waktu
  berkas dan melaporkan enam video tayang sebagai basi padahal isinya
  identik (git menggeser cap waktu); ketahuan karena isinya dibandingkan
  sebelum percaya. Enam puluh video kini lolos.
Lubang qc yang mereka sebut (tulisan tidak diadu lawan `zona`) belum ditutup
di perkakas; obat di adegan: daftarkan rumus yang bisa tertindih sebagai
`tulisan`, bukan `zona`.

## 9 SEP (dini hari): DUA TAMBALAN PERKAKAS v3 DARI TEMUAN TRANSFORMASI

Sesi Transformasi (gelombang 4 berjalan, video 01 dan 02 sekitar 4,5 menit)
menemukan dua celah perkakas bersama yang mengenai semua sesi:
- `tunggu_kata` selalu mengambil kemunculan PERTAMA frasa; frasa yang
  diucapkan dua kali memicu detik yang sudah lewat dan baru ketahuan di
  `laporkan_pemicu` setelah sembilan menit render. Sekarang `tunggu_kata(frasa,
  ke=2)` memilih kemunculannya, dan pemicu yang sudah lewat lebih dari 0,15 s
  MENGGAGALKAN RENDER SAAT ITU JUGA. `alat/cek_pemicu_urut.py <adegan.py>`
  (dari Transformasi) jadi gerbang pra-render: jam tiap tunggu_kata harus maju.
- Pemeriksa urutan istilah menghukum segar-ingat lintas topik ("Di Vektor,
  Materi 03") yang justru diwajibkan v3. `cek_urutan_turunan.py` dan
  `cek_urutan_integral.py` ditambal (nomor yang didahului nama topik lain
  dalam 30 huruf bukan rujukan maju), dibuktikan dua arah; sesi lain menambal
  salinannya sendiri dengan pola yang sama. Satu jebakan alat Bash terulang
  saat menambal (backslash jadi backspace), ketahuan karena polanya diuji.
`uji_jam_kata.py` ditambah uji ke=2 dan gagal-cepat. Master 9 Sep: sesi
gelombang 4 wajib `git merge master` sebelum render berikutnya.

## 8 SEP (malam): STANDAR VIDEO v3, SEMUA 58 VIDEO DITULIS ULANG, DELAPAN SESI

Keputusan ARYA setelah menonton Turunan 01 sampai 03 versi rinci (5:52, 5:56,
5:55, 1080p60, di master efe6f5d): semua video ditulis ulang dengan gaya itu,
tenggat 12 Sep diterima lewat. Yang disiapkan MASTER:
- `docs/tugas/STANDAR-VIDEO-V3.md` (kerangka enam bagian, segar-ingat, narasi,
  timing per kata, gerbang, sepuluh butir daftar periksa) dan rancangannya
  `docs/superpowers/specs/2026-09-08-standar-video-v3-design.md`.
- Perkakas bersama (07d4893): `buat_narasi.py` mencatat waktu tiap kata
  (kata.json) dengan cache per segmen, tempo -5%, napas 0,35 s; `sinema.JamKata`,
  `babak(..., kata=)`, `tunggu_kata`, `laporkan_pemicu`; `buat_subtitle.py`
  mode kata (cue kalimat utuh dari `tulis`); `alat/cek_subtitle.py` menjaga
  operator; uji dua arah `manim/uji/uji_jam_kata.py`, `alat/uji_cek_subtitle.py`.
  Dibuktikan: durasi.json dan kata.json Turunan 1 sampai 3 dibangun ulang
  dari cache SAMA PERSIS (selisih 0,000000 s); subtitle ketiganya lolos
  cek_subtitle. Tiga pasang alat khusus Turunan dihapus.
- Aturan `tulis` = kalimat utuh yang diucapkan dengan lambang (naskah
  Turunan 2 disesuaikan dari subtitle yang disetujui).
- Catatan: CLAUDE.md diringkas menunjuk standar v3; ATURAN-SEMUA-SESI bagian
  GELOMBANG 4 (delapan sesi, port 3017 Trigonometri, 3018 Limit); bagian
  GELOMBANG 4 di tiap berkas tugas (dua baru: MANTRA-TRIGONOMETRI,
  MANTRA-LIMIT; satu baru untuk Transformasi); PROMPT-SIAP-TEMPEL delapan
  prompt.
- Tinjauan: video pertama tiap sesi ditonton ARYA (delapan sekaligus),
  sesudahnya per kelompok dua sampai tiga video. Segar-ingat wajib.

## 8 SEP (malam): LIMA VIDEO INTEGRAL 480p LENGKAP, SUBTITLE BINTANG DIBERESKAN

Sesi Integral menyelesaikan gelombang 2: 01 (146 s, 11 render), 03 substitusi
(135 s, 4), 05 Riemann (118 s, 8), 07 TDK (142 s, 4), 09 luas di bawah sumbu
(129 s, 5). Semua di master (af52d6e), medan video terpasang, cek_aset_video,
cek_layar_kosong, cek_urutan, tsc lolos, tayang di produksi. Keputusan yang
DISENGAJA untuk dinilai ARYA: skala x dan y tidak sama di 07 (angka di panel
yang dibandingkan), bagian merah dibalik ke atas sementara aslinya tetap di 09,
03 tanpa bidang koordinat dan paling lengang (1,17 persen; pilihan: gambar
pendamping daftar langkah, satu render). Cacat lintas topik yang ketahuan dari
sesi ini: penanda tebal `*` terpotong dua baris subtitle tercetak di layar
pada empat video tayang (grafik6, ruang-3d-03, statistika10, tahap5);
buat_subtitle dibetulkan (tebalkan sebelum pecah, tag diseimbangkan, bintang
menggagalkan), keempat vtt dibuat ulang dan naik produksi. Jebakan baru
26 sampai 40 di catatan MASTER. Kedua sesi (Turunan 6 video, Integral 5)
berhenti menunggu tinjauan ARYA; tiga cadangan Turunan (08, 10, 11) menunggu.

## 8 SEP (sore): DUA VIDEO INTEGRAL 480p DI PRODUKSI, ALAT BERSAMA BERTAMBAH

Sesi Integral: video 05 jumlahan Riemann (118 s, delapan render) dan 01 dari
laju ke jumlah (146 s, sepuluh render), keduanya di master (3a44108) dengan
medan video dan poster, cek_aset_video lolos, naik produksi bersama enam
video Turunan yang sudah satu wadah mp4. Alat bersama baru dari sesi ini:
`qc.pastikan_hilang` / `BendaTertinggal` (benda babak lama yang ikut
terbang saat kamera pindah), `alat/cek_waktu_adegan.py` (waktu babak dari
teks kode, dicocokkan dengan durasi.json, jangkar subtitle hilang). Klaim
"Indicate berwarna sama tidak terlihat" DIBANTAH pengukuran sesi Turunan
(Indicate bawaan membesarkan 1,2 kali); catatan diluruskan. Jebakan baru:
Cylinder tanpa tutup, set_opacity(0)+FadeIn, identitas ikut berganti bidang,
%ERRORLEVEL% di cmd selalu 0. Membandingkan dua render: psnr piksel, bukan
hash. Semua sesi berhenti menunggu ARYA: revisi video Turunan (6) dan
Integral (2), Transformasi (perbaiki 05/06 atau render 1080p apa adanya),
Grafik Fungsi (kata "render"), Statistika (49 rentang diam).
## 8 SEP (audit catatan): PELAJARAN RENDER TURUNAN 1–3

Atas permintaan ARYA, catatan produksi diperiksa ulang dan dirangkum dalam
[Pelajaran render Turunan 1–3](docs/tugas/laporan/PELAJARAN-RENDER-TURUNAN-2026-09-08.md); salinan tersedia di MASTER
dan worktree materi-turunan-b8c515. Tidak ada kode/media yang diubah atau render baru.

- Diperjelas: timing tepat ≠ kalimat lengkap; contoh penghubung video 2 masih
  perlu revisi berikutnya. Koreksi tersebut sudah diterapkan pada video 1/3.
- Dicatat: akumulasi pembulatan frame, pemicu terlambat karena animasi sebelumnya,
  transisi kosong, rumus membesar saat morph, dan garis menimpa angka.
  Perbaikan masing-masing serta bukti QC tercantum dalam laporan.
- Subtitle 3 pernah menggabungkan dua kalimat menjadi rumus keliru; pembuatnya
  sudah diperbaiki. **Temuan baru pada pemeriksa:** normalisasi menghapus operator,
  sehingga 2x + h/2xh, −1/1, f′(x)/f(x), dan dy/dx/dydx lolos sebagai pasangan sama.
  Keempat kasus dikonfirmasi langsung. Ini celah QC, bukan vonis MP4 final salah.
- Ditambahkan pelajaran MP4 lama setelah render/mux gagal, alarm diam yang
  keliru, mesin TTS bersama 1/2/3, dan keterbatasan transkripsi tujuh bagian.
- Untuk MASTER: perkuat pembanding subtitle; revisi penghubung video 2 serta
  video 4 pada pekerjaan berikutnya. Catatan tidak mengklaim tindak lanjut selesai.
  Belum ada commit, merge, deploy, atau pesan langsung ke task MASTER.

## 8 SEP (revisi lanjutan): TURUNAN 3 SELESAI 1080p60

ARYA meminta "lakukan hal yg sama pd video3". Produksi diizinkan sesudah
tahap pencatatan sebelumnya. Worktree: `.claude/worktrees/materi-turunan-b8c515`.
Naskah dan TTS baru: **355,333333 detik (5:55), 649 kata, 31 bagian**,
Ardi tempo -5%, 109 cue subtitle utuh dengan waktu kata dan lambang matematika.
Hasil akhir **1920×1080, 60 fps, H.264 + AAC, 9.816.530 byte**.
**Selesai secara produksi; menunggu tinjauan ARYA atas versi terbaru.**

Isi revisi:
- Panggil ulang video 2 secara lengkap: pada x=1 kemiringan garis singgung
  kurva x² adalah 2. Panggil ulang video 1: kemiringan = kenaikan / langkah
  mendatar, baru tulisan diringkas menjadi miring = naik/datar.
- Ingatkan bahwa kemiringan berbeda dari panjang sisi miring/Pythagoras.
  Bedakan tinggi titik merah dan kemiringan garis ungu; contoh akhir
  x=3 menghasilkan tinggi 9, kemiringan 6.
- Rumus 2x dibuktikan dari (x+h)², dua suku campuran xh+hx, pengurangan x²,
  pembagian h yang belum nol, dan limit dari kedua sisi. Bukti mendahului
  sapuan jejak, sehingga siswa tidak harus menerima pola tanpa alasan.
- Titik biru mencatat pasangan (x, kemiringan) lalu membentuk grafik turunan.
  |x| menunjukkan kemiringan kiri -1 dan kanan +1; f'(0) tidak ada,
  dengan dua bulatan kosong dan tanpa garis vertikal penghubung.
- Notasi f'(x) dan dy/dx dijelaskan sebagai turunan, bukan y/x. Huruf y
  dieja "ye" pada TTS. Salah atribusi notasi aksen sebagai "cara Newton"
  pada halaman 03 dihapus tanpa menambah pembahasan sejarah.

Perubahan dari rancangan MASTER yang disengaja: bukti x² yang semula
ditunda ke Materi 04 kini diberikan di Materi 03, sesuai arahan ARYA tentang
asal rumus. Satu kalimat penghubung halaman 04 ikut diselaraskan.
**Tindak lanjut MASTER:** pembuka VIDEO 04 segmen `pola` masih menyebut
Materi 03 hanya mengambil pola dari empat titik. Selaraskan saat merevisi
video 04 berikutnya. Video/audio 01, 02, dan 04 tidak diubah dalam tugas ini.

Uji 480p lengkap sudah dirender dan frame dengan subtitle diperiksa.
Tabrakan panel notasi diperbaiki. Dua keterlambatan pemicu 0,27/0,33 detik
ditemukan dalam uji, lalu diperbaiki sebelum render akhir. Pemeriksa kode,
subtitle utuh, TypeScript, serta Materi 03 lulus. Seluruh 31 babak lolos QC;
88 pemicu kata berselisih maksimum 0,111834 detik; 16 klaim matematika lulus.
Lembar kontak akhir dan frame penting, termasuk versi bersubtitle, dibuka.
Tidak ada layar kosong berkepanjangan; decode penuh MP4 lulus. Gerak pertama
0,125 detik sesudah judul. Sebanyak 38 calon diam ditinjau dalam konteks
narasi; calon 15,75 detik pada tabel adalah perubahan angka kecil yang tidak
ditangkap ambang piksel alat, bukan layar kosong.

Sepuluh berkas MP4 lain di media/public memiliki hash yang tetap. Video
utama dan salinan situs identik; poster/VTT diperbarui. Salinan 480p60
bersubtitle ada di `media/uji-480p/turunan3-fungsi-turunan-bersubtitle.mp4`.
Laporan lengkap: `qc/turunan3-fungsi-turunan/hasil-revisi.md`.
Catatan ini dan laporan sesi diperbarui di folder utama serta worktree
untuk MASTER; tidak ada klaim pesan langsung sudah diterima MASTER.
Implementasi belum di-commit, digabung, atau deploy.


## 8 SEP (revisi lanjutan): TURUNAN 1 SELESAI 1080p60

ARYA melanjutkan arahan pencatatan dengan meminta revisi Turunan 1.
Hasil baru: **351,766667 detik (5:52), 1920×1080, 60 fps, H.264 + AAC**,
10.391.420 byte. Naskah dan suara baru, 31 bagian, Ardi tempo -5%, serta
113 potongan subtitle utuh dengan angka sebagai lambang.

Perbaikan utama:
- Masalah lama detik 10–17 ditangani dengan memisahkan perpindahan kamera,
  orientasi tabel, dan pembacaan angka. Tabel sekarang diperkenalkan pada
  12,77–21,50 detik; pembacaan data dimulai setelah itu. Angka muncul pada
  ucapan yang terkait, bukan saat kamera masih menghalangi tabel.
- Arti total, tambahan, lama waktu, dan pembagian per jam dijelaskan.
  Hasil hitungan muncul ketika narator menjelaskannya.
- Kemiringan disebut lengkap dahulu, kemudian disingkat "miring = naik/datar".
  Kata miring dijelaskan sebagai kemiringan, bukan panjang sisi miring.
- Contoh 3–4–5 cm menunjukkan panjang sisi miring 5 cm dan kemiringan
  3/4 = 0,75. Pada grafik pabrik, barang dan jam berbeda satuan, sehingga
  tidak dijumlahkan kuadratnya seperti dua panjang.
- Materi nomor 1 pada halaman ikut mendapat penjelasan Pythagoras dan satuan.
  Video lain tidak berubah; revisi Turunan 3 belum dikerjakan.

Bukti: 31 babak lolos QC; 70 pemicu animasi berselisih maksimum 0,032001
detik dari penanda kata; durasi audio/video cocok. Lembar kontak akhir dan
frame penting dibuka, subtitle diperiksa. Pemindaian layar kosong dan
decode penuh FFmpeg lulus. Pemeriksa kode, TypeScript, dan Materi 01 lulus.
Pemeriksa urutan meloloskan Materi 01; temuan lintas topik pada "bagian dalam
domain" Materi 02 adalah pencocokan kata konteks komposisi yang terlalu luas,
dicatat tanpa mengubah video 2. Hash 12 video lain sama dengan sebelum revisi.

Lokasi seluruh implementasi dan bukti:
`D:/MANIM-MATRA/.claude/worktrees/materi-turunan-b8c515`.
Video: `media/turunan1-laju-rata-rata.mp4`; salinan lokal situs, JPG dan VTT:
`web/public/anim/turunan1-laju-rata-rata.*`. Salinan bersubtitle:
`media/uji-480p/turunan1-laju-rata-rata-bersubtitle.mp4` (480p60).
Laporan: `qc/turunan1-laju-rata-rata/hasil-revisi-lanjutan.md`.
Cara membangun ulang ada di laporan; pembuat suara Turunan 1 mengimpor
mesin WordBoundary dari `alat/buat_suara_turunan2.py`, tanpa mengubah aset 2.

**Selesai secara produksi; menunggu tinjauan ARYA atas versi terbaru.**
Belum di-commit, digabung, atau deploy. Catatan utama dan worktree diperbarui
untuk MASTER; tidak ada klaim pesan langsung sudah diterima MASTER.

## 8 SEP (arahan lanjutan): CATATAN TURUNAN 3, BELUM PRODUKSI

ARYA meminta rombakan Turunan 3 dengan resep penjelasan rinci dan suara
tenang Turunan 2, tetapi **langkah saat ini hanya memperbarui catatan untuk
MASTER**, sebelum coding, menulis naskah narasi, membuat suara, atau render.

Keputusan baru: **durasi 3–6 menit**, bahasa akrab siswa, dan setiap konsep
dihubungkan secara eksplisit ke pelajaran sebelumnya. Contoh koreksi ARYA
untuk video 2: "Sama seperti video 1 yaitu, kemiringan adalah kenaikan dibagi
langkah mendatar." Bentuk lengkap diperkenalkan melalui ucapan dan tulisan,
lalu tulisan adegan diringkas menjadi **"miring = naik/datar"**. Subtitle
tetap menyampaikan kalimat lengkap, bukan hanya menyalin singkatan adegan.

Dua foto ARYA menunjukkan masalah jembatan penjelasan dan kemungkinan siswa
menyamakan segitiga kemiringan dengan soal Pythagoras. Yang perlu dijelaskan:
Pythagoras mencari panjang sisi; kemiringan membandingkan perubahan tegak
dengan mendatar. Khusus grafik pabrik, 44 barang / 2 jam = 22 barang/jam;
barang dan jam bukan dua panjang sejenis. Label "miring" perlu diperjelas
sebagai singkatan kemiringan, bukan panjang sisi miring.

ARYA mengonfirmasi timing Turunan 1 detik **10–17** adalah **masalah yang
perlu diperbaiki**, bukan contoh yang ingin ditiru. Catat perbaikan video 1
sebagai tindak lanjut dan cegah cacatnya terulang di Turunan 3. Ketepatan
waktu tiap kata harus disertai ketepatan makna: kata "kemiringan" dan
hubungannya wajib benar-benar diucapkan, bukan hanya ada pada gambar.

Catatan `CLAUDE.md`, `PROGRESS.md`, standar mengajar, serta laporan sesi
Turunan diperbarui di folder utama dan worktree. Dua gambar bukti disalin
ke `docs/tugas/laporan/bukti-turunan-2026-09-08/` agar tidak bergantung pada
folder sementara. Rincian rancangan dan daftar pemeriksaan ada di
`docs/tugas/laporan/MANTRA-TURUNAN-INTEGRAL.md`, bagian paling baru.

Persetujuan Turunan 2 sebelumnya adalah riwayat penilaian umum; masukan
baru ini tetap harus ditindaklanjuti pada tahap revisi. **Belum ada perubahan
kode, naskah, suara, subtitle, atau video pada tahap pencatatan ini.**
Belum ada pesan langsung ke MASTER melalui alat komunikasi; laporan tersedia
di berkas utama. Integrasi dan deploy tidak dilakukan.

## 8 SEP: TURUNAN 2 DIROMBAK 1080p60, HASIL DISETUJUI ARYA

**Keputusan pemilik:** setelah menonton hasil, ARYA menyatakan "video ini
sudah bagus, lebih detail dan intonasinya tenang" dan meminta pembaruan
`CLAUDE.md` serta `PROGRESS.md` untuk MASTER, karena sedikit melenceng dari
aturan lama tetapi ia menyukainya. Status tinjauan Turunan 2 kini
**DISETUJUI ARYA**. Catatan versi 02 berdurasi 1:50 di bawah adalah riwayat
rilis lama, bukan status revisi ini.

### Hasil dan alasan pembelajaran

- Narasi baru: 33 bagian, suara tetap `id-ID-ArdiNeural`, tempo `-5%`,
  jeda antargagasan. Yang dirombak adalah naskah, rekaman, tempo, dan
  penempatan animasi; bukan mengganti identitas suara.
- Alur: kemiringan sebagai kenaikan dibagi langkah mendatar; contoh baru
  y = x² dengan P(1,1) dan Q(2,4); asal h dan 1+h; pecahan selisih tinggi;
  nilai h mendekati nol; luas empat petak menjelaskan 1 + 2h + h²;
  faktorisasi dengan h bukan nol; 0/0 tidak terdefinisi; pendekatan dari
  kanan dan kiri; garis singgung dengan kemiringan 2; rumus turunan umum.
- Diagram luas memakai h positif. Identitas aljabar tetap berlaku untuk
  h negatif; pendekatan dari kiri dijelaskan terpisah. Garis singgung
  dijelaskan sebagai batas garis potong, bukan "hanya menyentuh satu titik".
- Materi nomor 2 di `web/content/turunan/tahap.ts` ikut diselaraskan.
  Revisi video 2 tidak mengubah video lain; perubahan video 1 dari
  pekerjaan sebelumnya tetap terpisah.

### Perbedaan terhadap aturan MASTER, dicatat terbuka

| Hal | Hasil yang disetujui dan batas pengecualiannya |
|---|---|
| Durasi dan kedalaman | 355,966667 detik (5:56), sebelumnya 110,4 detik (1:50). Lebih panjang untuk menjelaskan asal rumus. Ini perubahan rancangan; batas durasi total maksimum tidak tercantum pada standar yang diperiksa. |
| Transisi rumus | Metode `papan()` memakai FadeOut/FadeIn; tidak selalu mengikuti `lahir_rumus` dan morph lambang pada standar ilustrasi butir 5. Pertahankan versi yang sudah ditonton dan disetujui; jangan otomatis menggantinya hanya demi keseragaman. |
| Pembuat bidang | Memakai `Axes` dengan label angka dan skala satuan x/y sama, bukan pembungkus `ilustrasi.bidang_bernomor` pada butir 9. Geometri dan angka diperiksa. |
| Waktu suara dan subtitle | Pembuat khusus `alat/buat_suara_turunan2.py` dan `alat/buat_subtitle_turunan2.py` memakai WordBoundary TTS. VTT mengambil kata rekaman dan beberapa penggantian lambang; tidak memakai semua medan `tulis` dan masih memuat ejaan sebagian angka, berbeda dari butir 7. |
| Gambar 2D dan jeda | Sudah sesuai standar versi 2 butir 2 dan 3 untuk video kedua. Keduanya tidak perlu dianggap penyimpangan. |
| Catatan utama proyek | Tugas sesi lama melarang menyunting CLAUDE/PROGRESS dan folder master. Permintaan langsung ARYA kali ini mengizinkan pembaruan catatan di folder utama dan worktree, tanpa menggabung implementasi atau deploy. |

Persetujuan tersebut adalah penilaian ARYA terhadap hasil video secara
keseluruhan. Rincian teknis di tabel adalah pencatatan sesi ini, bukan klaim
bahwa ARYA menilai setiap fungsi kode satu per satu. Pengecualian hanya
untuk Turunan 2; aturan umum dan gerbang mutu topik lain tetap berlaku.

### Bukti pemeriksaan revisi

- MP4 H.264 + AAC, 1920×1080, 60 fps, 355,966667 detik,
  9.444.693 byte (9,01 MiB). Durasi suara dan gambar cocok.
- Semua 33 babak lolos QC tata letak; lembar kontak dan delapan frame
  penting hasil final dibuka. Pemindaian layar kosong dan decode penuh
  FFmpeg lulus. Pemeriksa kode Manim, TypeScript, dan whitespace lulus.
- SymPy memeriksa ekspansi, faktorisasi, tabel h, serta limit kiri/kanan = 2.
  Maksimum selisih 31 pemicu animasi terhadap waktu kata TTS 0,03113 detik;
  ini ukuran waktu pemicu, bukan klaim ketepatan persepsi pendengaran.
- Suara diperiksa melalui naskah, waktu kata, level sinyal, dan transkripsi
  otomatis lima bagian rawan; puncak -2,6 dB, tanpa clipping. Beberapa
  kalimat dibuat ulang agar huruf matematika tidak berdesakan. ARYA telah
  menilai intonasinya tenang; belum ada uji pemahaman langsung kepada siswa.

### Serah terima untuk MASTER

Implementasi masih berupa perubahan lokal di
`D:\MANIM-MATRA\.claude\worktrees\materi-turunan-b8c515`,
cabang `sesi/turunan-materi`. **Belum di-commit, belum digabung ke master,
dan belum di-deploy.** Hanya catatan keputusan ini yang juga ditulis ke
folder utama; jangan menganggap video produksi sudah berubah.

Berkas inti yang harus ikut bila MASTER mengintegrasikan revisi:

- `manim/scenes/turunan2_garis_singgung.py`,
  `manim/narasi/turunan2-garis-singgung.json`, kedua alat khusus di atas,
  dan perubahan materi nomor 2 dalam `web/content/turunan/tahap.ts`.
- `audio/turunan2-garis-singgung/{durasi.json,kata.json,narasi-penuh.mp3}`.
  Adegan memerlukan `kata.json`; pembuat suara umum tidak menghasilkan
  penanda tersebut. Rekaman WAV dan cache `revisi/` tersedia lokal.
- Video final: `media/turunan2-garis-singgung.mp4`; salinan lokal situs,
  poster JPG, dan subtitle VTT di `web/public/anim/turunan2-garis-singgung.*`.
  Media dapat diabaikan Git, sehingga cek dan salin aset secara eksplisit.
- Salinan untuk meninjau:
  `media/uji-480p/turunan2-garis-singgung-bersubtitle.mp4` (480p60).
  Video utama memakai VTT terpisah, bukan subtitle tertanam.
- Bukti rinci lokal:
  `qc/turunan2-garis-singgung/hasil-pemeriksaan.md`,
  `jadwal-render.json`, `isyarat-render.json`, serta lembar kontak.
  Versi lama dicadangkan di `qc/turunan2-garis-singgung/sebelum/`.

Untuk membangun ulang, dari worktree tersebut:

```powershell
python alat/buat_suara_turunan2.py
python alat/buat_subtitle_turunan2.py
manimgl manim/scenes/turunan2_garis_singgung.py TurunanGarisSinggung -w --hd --config_file manim/hd60.yml
python manim/gabung_audio.py turunan2-garis-singgung TurunanGarisSinggung --keluar turunan2-garis-singgung.mp4
```

MASTER dapat membaca laporan ini langsung di catatan utama proyek. Sesi
MATRA-MASTER tidak ditemukan dalam daftar task yang tersedia pada alat
komunikasi Codex; belum ada pesan langsung yang dikirim atau bukti MASTER
sudah membaca. Integrasi dan pemeriksaan hasil di produksi masih terbuka.

## 8 SEP (siang): ENAM VIDEO TURUNAN 480p LENGKAP, NAIK PRODUKSI

Sesi Turunan menyelesaikan gelombang 2: 01 laju rata-rata (2:03, pembuka 3D
mobil 4 detik), 02 garis singgung (1:50), 03 fungsi turunan (1:55), 04 aturan
pangkat (1:57), 06 hasil kali (2:31), 07 aturan rantai (2:27). Semua di master
(0eebe85), medan `video` terpasang, 71 klaim angka naskah lolos sympy,
cek_aset_video, cek_layar_kosong, cek_urutan, periksa_tahap, tsc lolos.
Empat keputusan yang DISENGAJA, untuk dinilai ARYA: satu papan di 03 (dua
papan tidak muat), sumbu berskala sendiri di 01 (jam lawan barang), 06 hanya
hasil kali (hasil bagi tidak divideokan), 04 tidak mengulang jabaran halaman
dan paling sepi isinya (0,73 persen area kerja). Tiga cadangan (08, 10, 11)
menunggu ARYA. Wadah uji campur (2 mp4, 4 webm); diminta disamakan ke mp4.

## 8 SEP (pagi, lanjutan): STATISTIKA MP4 1080p DI PRODUKSI

Sesi Statistika menggabung ulang 13 master H.264 1080p60 ke mp4 tanpa render
ulang (7e97363, 40,9 MB, turun 17 persen dari webm), poster dari detik yang
sama; digabung 44fae12, mp4 disalin ke master dan tiap berkas diperiksa
(h264, 1080, 60 fps), webm dibuang. Deploy produksi berhasil sekali jalan:
matra-eight dan mantra-matematika menyajikan mp4, webm-nya 404. Di master
kini yang bukan mp4 hanya Trigonometri 7 dan Limit 7 (webm warisan Manim CE).
Sisa 480p: vektor 6, grafik 2, transformasi 6, turunan 4 (uji gelombang 2).
Menggantung di Statistika untuk ARYA: 49 rentang diam (terpanjang 18,5 s,
Materi 12), perbaikannya butuh render ulang.

## 8 SEP (pagi): KEPUTUSAN ARYA, WADAH VIDEO FINAL = MP4

ARYA menyetujui saran MASTER: mp4 (H.264 ManimGL disalin + AAC) untuk semua
video, membatalkan "webm" 7 Sep. Master 92cc576: gabung_audio bawaan mp4,
cek_resolusi_anim tidak menolak mp4 (webm cuma dicatat), buat_poster dan
cek_aset_video mendahulukan mp4, aturan di CLAUDE.md, `trigonometri.webm`
720p yatim dihapus dari git. Semua alat DIJALANKAN sesudah diubah. Keenam
sesi diberi tahu. Tugas Statistika: gabung ulang 13 master H.264 ke mp4
(tanpa render ulang), buang webm-nya. Sisa webm yang SAH: Trigonometri 7 dan
Limit 7 (VP9 1080p dari zaman Manim CE, tidak ada master H.264-nya); dibiarkan
sampai ARYA memutuskan apakah layak dikode ulang.

## 8 SEP (dini hari): TIGA VIDEO TURUNAN, TIGA ALAT BARU, WADAH DITINJAU ULANG

- Turunan video 02, 03 (dirender ulang setelah angka sumbu ketahuan meleset:
  batas bawah bidang bukan kelipatan langkah), dan 07 (aturan rantai, 147 s)
  selesai 480p, lolos gerbang, di master dengan poster dan medan `video`.
- Alat baru di master, semuanya dari cacat yang lolos gerbang lama:
  `bidang_bernomor` menolak batas bawah bukan kelipatan langkah (e412aca);
  qc mengadu tulisan dengan angka sumbu kecuali beralas (a136220);
  `alat/cek_layar_kosong.py` memindai layar hampa >1,5 s (c9d5730; diuji pada
  transformasi, statistika, ruang-3d: lolos). Cacat lama vektor4 dan vektor9
  gagal qc dengan sebab lama, diteruskan ke sesi Vektor.
- WADAH: keputusan "seragamkan ke webm" ditinjau ulang. Angka awal
  membandingkan isi berbeda; pada isi yang sama mp4 utuh 17 persen lebih
  ringan dan tanpa kode ulang (Statistika, Transformasi). Kode ulang Ruang
  3D DIHENTIKAN, mp4-nya tetap tayang. Menunggu kata ARYA: "mp4" atau
  "tetap webm". Bawaan gabung_audio masih webm sampai itu.

## 7 SEP (larut): STATISTIKA 1080p DI PRODUKSI, ALAT BERSAMA DISATUKAN

Sesi Statistika selesai gelombang 3 (ad470d3): 13 video 1920x1080 60 fps
sebagai WebM VP9 (mengikuti resep MASTER yang menyebut webm; Ruang 3D
memilih tetap mp4 H.264, jadi dua wadah kini hidup berdampingan: webm ~3 MB
per 115 detik, mp4 ~13 MB per 85 detik; keputusan wadah ada di ARYA).
Gabung ke master a42b795 BENTROK di tiga alat bersama yang ditambal kedua
sesi (gabung_audio, buat_poster, cek_aset_video); disatukan MASTER:
gabung_audio memilih dari akhiran keluaran (.mp4 salin H.264 + AAC, .webm
kode ulang VP9 + Opus), buat_poster dan cek_aset_video mencari video final
webm/mp4 dulu baru versi uji. cek_aset_video: 13 statistika dan 6 ruang-3d
lolos. Mp4 480p statistika lama dipindah ke media/arsip-480p (di luar git).
Deploy produksi berhasil pada percobaan kedua (Vercel dua kali menjawab
Internal Server Error saat unggah malam ini): matra-eight dan
mantra-matematika (alias diarahkan ulang) menyajikan webm 1080p, ukuran
berkas diverifikasi. Sisa 480p: vektor 6, grafik 2, transformasi 6;
trigonometri.webm 720p yatim.

## 7 SEP (malam): SEMBILAN TOPIK DI PRODUKSI, RUANG 3D 1080p, PERINTAH ARYA

ARYA: "cek semua sesi, yang belum selesai diselesaikan sampai tuntas rendernya;
Integral dan Turunan langsung naikkan ke produksi dan buat videonya."
- Ruang 3D SELESAI gelombang 3: enam video 1920x1080 60 fps (bfe5a4f), digabung
  12f00aa dan mp4-nya dipasang di master. Sesi itu menambal alat bersama:
  `--fps 60` memecahkan render (pakai `manim/hd60.yml`), `gabung_audio`
  tetap mp4 (instruksi MASTER "ubah ke webm" KELIRU: semua video tayang mp4),
  `buat_poster` dan `cek_aset_video` tidak lagi mematok folder 480p.
- `vercel deploy --prod` dari master 12f00aa (percobaan pertama gagal di sisi
  Vercel, "Internal Server Error" saat unggah; kedua berhasil):
  matra-eight.vercel.app dan mantra-matematika.vercel.app (alias diarahkan
  ulang) kini memuat Turunan, Integral, enam video Transformasi 2 menit, dan
  Ruang 3D 1080p. Diverifikasi lewat kode HTTP dan ukuran berkas video.
- Keadaan sesi: Vektor dan Statistika sedang merender 1080p; Grafik Fungsi
  siap tetapi MENUNGGU kata "render" dari ARYA di jendelanya (menolak
  perintah lewat MASTER, dan itu sesuai aturannya); Turunan mulai video 02;
  Integral merender video 05; Transformasi menunggu ARYA menonton.
- `web/public/anim/trigonometri.webm` (720p, terlacak git, tidak dirujuk
  halaman mana pun) masih membuat `cek_resolusi_anim.py` menolak; belum
  dihapus, menunggu ARYA.

## 7 SEP (malam, lanjutan): INTEGRAL DIGABUNG KE MASTER, SEMBILAN TOPIK

Sesi MANTRA-INTEGRAL lapor SIAP GABUNG (bbe9ba4): 11 materi, 10 widget +
galeri, 4 latihan, 32 kuis, `siap: true`. MASTER memeriksa silang: gerbang
dijalankan ulang (65 + 43 klaim sympy, urutan istilah, periksa_tahap, tsc),
11 materi dibuka di 1366 dengan angka panel dihitung ulang, Materi 05 di 375.
Digabung ke master c838056 (31 berkas), tsc 0. Revisi kecil diminta: empat
soal kuis "sangat sulit" memakai fungsi dan angka persis buku (Ayo Mencoba
3.11 dan 3.12, Contoh 3.14 dan 3.15) tanpa sumber. Lalu gelombang 2 video
Integral 480p dibuka (urutan 05, 01, 07, 09, 03). Temuan sesi Integral yang
berlaku untuk semua widget: seret dengan tetikus ikut menyeleksi teks SVG
(dibereskan dengan userSelect none di Bidang miliknya; salinan Limit,
Grafik, Turunan belum), dan `potongTanda` gagal bila akar jatuh tepat di
titik cuplikan (perbaikan hanya di salinan Integral). Master kini memuat
SEMBILAN topik siap; BELUM naik Vercel. eslint master masih gagal satu
berkas bawaan lama: `widget/transformasi-geometri/Legenda.tsx` baris 58.

## 7 SEP (malam): TURUNAN DIGABUNG KE MASTER, VIDEO TURUNAN DIPERINTAHKAN

Sesi MANTRA-TURUNAN lapor SIAP GABUNG (0207378): 12 materi, 11 widget + galeri,
4 latihan, 32 kuis, `siap: true`. MASTER memeriksa silang: gerbang dijalankan
ulang di foldernya (96 + 63 + 19 klaim sympy lolos, urutan istilah bersih,
tsc 0), 12 materi dibuka di 1366 dan angka panel dihitung ulang, Materi 06 di
375. Digabung ke master c849cf2 (42 berkas), tsc master 0. Kerangka Integral
ikut (identik dengan kerangka, tidak mengganggu sesi Integral). Satu revisi
diminta: kalibrasi kuis, tingkat "sangat sulit" sebagian besar satu langkah.
Setelah itu gelombang 2 video Turunan 480p dibuka (prioritas rancangan: 02,
03, 07, 06, 01, 04), satu render pada satu waktu karena empat sesi lain
merender 1080p. BELUM naik Vercel. Integral masih di tahap widget.

## 7 SEP (sore): GELOMBANG 3 DIBUKA ARYA UNTUK EMPAT TOPIK

ARYA: "suruh sesi 3D, Vektor, Statistika, dan Grafik Fungsi selesaikan render
1080p kalau tidak ada catatan menggantung; saya cek hasilnya setelah 1080p
semuanya." Keadaan saat perintah dikirim (`alat/cek_resolusi_anim.py`): 34
video masih 480p (statistika 13, transformasi 6, ruang-3d 6, vektor 6, grafik
2, trigonometri.webm 720p). Keempat worktree `matra-*` dibuat lagi (foldernya
hilang untuk kedua kalinya; cabangnya utuh: `sesi/vektor` 4 commit belum
masuk master, `sesi/statistika` 1). Catatan menggantung yang ADA dan sengaja
TIDAK menahan (ARYA menilai langsung di 1080p): Vektor menunggu vonis bentuk
01 dan 06, kode 03/04/08/09 belum dirender; Grafik menunggu jawaban 3D tahap 6
dan letak panel; Ruang 3D narasi 01 dibuat ulang belum dirender; Statistika
diam terpanjang 18,5 detik. Perintah ke tiap sesi: pindah ke worktree, merge
master (gl berubah), cek_kode, render 1080p60 SATU per satu (empat sesi
berbagi laptop), gabung_audio ke webm, poster lewat buat_poster, cek_video
final, cek_aset_video, ubah `video.berkas` di tahap.ts, lapor ke MASTER.
Transformasi TIDAK termasuk perintah ini (menunggu ARYA menonton 480p).

## 7 SEP: SESI TURUNAN HIDUP DI CABANG `sesi/turunan-materi`

ARYA membuka sesi MANTRA-TURUNAN di worktree `materi-turunan-b8c515`,
cabang `sesi/turunan-materi` (master 87f9e5b + kerangka dari `sesi/turunan`).
Worktree `mantra-integral-materi-505cfc` sudah hilang, `mantra-turunan`
(detached) dihapus MASTER, `elastic-dhawan-d14db2` dihapus sesi Turunan.
Folder `.claude/worktrees/mantra-integral` masih ada TANPA terdaftar sebagai
worktree: jangan menjalankan git dari sana. Perintah kerja Turunan dikirim
MASTER 7 Sep. Integral: ARYA membuka sesi TERPISAH MANTRA-INTEGRAL (worktree
`integral-folder-branch-setup-05863c`, cabang `sesi/integral-materi` dari
master + kerangka 5774493, port 3016, laporan `laporan/MANTRA-INTEGRAL.md`);
keduanya berjalan bersamaan, pembagian berkas ada di kepala berkas tugas.

Kemajuan sesi Turunan 7 Sep: 12 materi terisi (96 klaim sympy lolos,
pemeriksa dibuktikan dua arah, urutan istilah bersih), pemeriksaan silang
MASTER (10 temuan, 4 kalimat matematis keliru) sudah direvisi di 7595747;
widget 01 sampai 03 jadi dan diuji seret sungguhan (2e66524). Sisa: widget
04 sampai 11, galeri 12, latihan dan kuis. Utang teknis untuk MASTER setelah
semua cabang tergabung: `koordinat.ts`, `Bidang.tsx`, `seret.ts` kini ada
TIGA salinan (limit, grafik-fungsi, turunan); satukan ke folder bersama.

## 6 SEP (pagi): VIDEO TRANSFORMASI 02 SAMPAI 06 DIPERPANJANG, TERPASANG DI MASTER

Sesi Transformasi menyetor 469c850 dan b60e8f5, digabung ke master (37fdc9e,
237d149). Video 02 sampai 06 dari `media/uji-480p` worktree disalin ke
`web/public/anim` master: 125, 130, 63, 144, 143 detik (01 sudah 130 detik).
Subtitle 05 dan 06 sempat basi (berhenti di detik 77 dan 81), dibuat ulang;
poster 03, 04, 05 dibuat dari frame bermakna. Alat baru dari sesi itu:
`alat/cek_aset_video.py` (subtitle sepanjang video dan poster tidak kosong)
dan `alat/buat_poster.py`. Temuan alat itu di luar topiknya:
`web/public/anim/vektor6-sambung.jpg` poster kosong, milik sesi Vektor.
7 Sep: video 04 diperpanjang 63 -> 137 detik (10 -> 17 babak, angka dari
halaman Materi 07), digabung 55db094 dan dipasang; keenam video kini 125
sampai 144 detik, subtitle dan poster cocok semua. Tiga belas potongan suara
basi di `audio/` dibuang, `cek_aset_video.py` kini memeriksa suara juga.
Video 02 dirender ulang (gabung 55dfe2b): babak cermin mendatar tadinya masih
memperlihatkan cermin tegak, gambar membantah narasi; kini digambar di h = 2,
diam terpanjang 6,5 detik. Klaim video 01 dan 02 dikodekan; 164 klaim lolos.
Sisa di sesi Transformasi: render 1080p, menunggu ARYA menonton 480p.
BELUM naik Vercel (pratinjau maupun produksi).

## 6 SEP (dini hari): TURUNAN DAN INTEGRAL DIRANCANG, KERANGKA DI `sesi/turunan`

ARYA (5 Sep malam) menyetujui dua topik baru Kelas 12, Turunan dan Integral,
dikerjakan SATU sesi (MANTRA-TURUNAN-INTEGRAL) di worktree `mantra-turunan`,
dan mempercayakan rancangannya ke MASTER tanpa konfirmasi. Yang sudah ada:
- Rancangan: `docs/superpowers/specs/2026-09-06-turunan-alur-belajar.md`
  (12 materi, 11 widget) dan `...-integral-alur-belajar.md` (11 materi,
  10 widget), dari Bab 2 dan 3 buku Tingkat Lanjut XII (`LIMIT.pdf` adalah
  buku utuhnya, PDF = cetak + 16). Tiap materi: pertanyaan, isi pokok dengan
  halaman buku, rancangan widget (seret, batas, kendali, nyala, petunjuk),
  sering keliru, prioritas video. Volume benda putar tidak masuk.
- Kerangka kode di cabang `sesi/turunan` (commit 5774493, BUKAN master):
  `content/turunan/`, `content/integral/` (materi rintisan, `siap: false`),
  `PanggungTurunan.tsx`, `PanggungIntegral.tsx` (satu widget contoh sudah
  berkendali), `widget/{turunan,integral}/Rintisan.tsx`, dua halaman
  latihan, pendaftaran di `daftar-isi.ts`, `topik.ts` (`siap: false`),
  `subbab.ts` (Bab 2 dan 3 Kelas 12, dicabut dari `BAB_SEGERA`). tsc dan
  eslint lolos; halaman dilihat lewat Playwright di port 3015.
- Berkas tugas `docs/tugas/MANTRA-TURUNAN-INTEGRAL.md`, port 3015 di
  ATURAN-SEMUA-SESI, `alat/nyalakan-sesi.ps1` dapat saklar `-Hanya <nama>`
  dan entri sesi baru.
- Sesi TIDAK dinyalakan MASTER: pengaman mode otomatis menolak MASTER
  menulis setelan izin `bypassPermissions`, dan itu memang keputusan ARYA.
  Pesan tugas dikirim ke sesi desktop MANTRA-TURUNAN (menunggu dibuka).
  Catatan: `.claude/settings.local.json` di SEMUA worktree hilang saat
  foldernya terhapus 5 Sep; mode AUTO harus dipilih ARYA saat membuka sesi.
- 6 Sep pagi, permintaan ARYA: worktree kerjanya dipindah ke folder
  `.claude/worktrees/mantra-integral-materi-505cfc` (folder sesi desktop
  MANTRA-INTEGRAL yang hidup; tadinya KOSONG dan tidak terdaftar, sehingga
  perintah git dari sana mengenai master). Sekarang folder itu worktree
  sungguhan di cabang `sesi/turunan`, node_modules ikut dipindah. Folder
  `mantra-turunan` dilepas (detached HEAD), dihapus bila tidak dipegang sesi.
- Setelah sesi lapor SIAP GABUNG: MASTER memeriksa silang materi dan widget
  (permintaan ARYA), baru video diperintahkan. Video Transformasi 02 sampai
  06 (2 menit) masih di sesi Transformasi; urutan baru Transformasi (af8c93b)
  baru di pratinjau, belum produksi.

## 5 SEP (malam): SEMUA DI ATAS SUDAH DI PRODUKSI

ARYA mencoba pratinjau (seret di HP lancar, batas terpasang) lalu meminta
naik produksi. `vercel deploy --prod` dari `master` e27cbf6: matra-eight dan
mantra-matematika kini berisi kendali bersama, tata letak HP, beranda v3,
Materi 14 Statistika, batas jendela, dan video perahu 480p.

## 5 SEP (malam, lanjutan 4): VIDEO PERAHU VEKTOR 01 DIBUAT ULANG (480p)

Keluhan ARYA: perahunya jelek (cakram abu bertiang) dan kurang rapi saat
beralih ke 2D. Yang diubah, semuanya di `manim/gl/ilustrasi.py` dan
`manim/scenes/vektor1_perahu.py`:
- `perahu()` v2: perahu dayung (lambung dua terang, bibir cincin gelap, dua
  bangku, sepasang dayung, tanpa layar), shading dimatikan sebab permukaan
  cekung menghitam. `perahu_atas()`: ikon 2D tampak atas, dipasang lewat
  FadeOut/FadeIn saat kamera sudah tegak lurus, mengikuti tracker bx/by.
- `tanah()`: lempengan bertebal warna pasir (bukan lembaran melayang 35%
  tembus pandang): celah putih di tepi air hilang. Air dilebihkan 0,5 ke tiap
  sisi, tepi dekat mundur 0,35 supaya perahu mengapung di samping tepian.
- Pembuka 3D diberi kejadian per kalimat (jam subtitle): kamera mendekat,
  garis ukur "3 km" saat disebut, panah niat ke seberang; gerak pertama 0,12 s.
- Render 480p, narasi digabung: `media/uji-480p/vektor1-perahu.mp4`,
  disalin ke `web/public/anim/vektor1-perahu.mp4` (mp4 tidak dilacak git;
  ikut terunggah ke Vercel). Poster dari detik 4.
- MASIH: diam terpanjang 12,6 s di babak pythagoras (77 sampai 90 s), 11,4 s
  di dayung/arus, 10,6 s di tanya; bawaan versi lama, di luar permintaan.
  1080p belum dirender (aturan: 480p dulu untuk ditinjau ARYA).

## 5 SEP (malam, lanjutan 3): JENDELA WIDGET DIKUNCI, SERET DI HP, TABEL DICABUT

Keluhan ARYA: menyeret bola terasa licin sampai keluar daerah (jendela
melar mengikuti bola), di HP justru bergerak sedikit lalu berhenti, dan tabel
data ternyata memperumit.
- Vektor: `jendelaTetap` (geometri.ts) dari kotak BATAS, tidak ikut titik;
  resultan dijaga di kotak lewat `tahanBersama`; KaliSkalar kotaknya 3 kali;
  Perahu: titik mendarat di luar kotak digambar di tepi + "di luar gambar".
- Transformasi: jendela DIBEKUKAN selama diseret (`useSeret` mengembalikan
  `jendela`), menyesuaikan setelah dilepas; kotak tetap akan membuat bentuk
  terlalu kecil untuk rotasi dan dilatasi.
- Statistika 10 dan 12: jendela dari data awal contoh, tidak di bawah nol,
  seretan dijepit ke jendela. Grafik Fungsi Susun Parabola: jendela tetap
  dari BATAS_X dan BATAS_Y. Widget penggeser saja (parabola, balapan, dua
  mesin) sengaja tetap menyesuaikan (persetujuan ARYA).
- Tombol `Kembalikan` (kendali) di 11 widget Vektor dan 5 Transformasi.
- Seret di HP: `touch-action: none` dipasang di SVG statistika (sebelumnya
  hanya di bolanya; WebKit tidak selalu menghormatinya di anak SVG, jadi
  peramban mengira mau menggulir dan mengirim pointercancel). BELUM
  terverifikasi di HP sungguhan; hipotesis dari perbedaan dengan Vektor.
- `TabelData` dihapus lagi (baru dibuat pagi harinya). `TitikPegang` tetap.

## 5 SEP (malam, lanjutan 2): STATISTIKA MUDAH DIPEGANG, TABEL DATA, MATERI 14

Keluhan ARYA: bola data Statistika di Materi 01, 07, 08, 10, 11, 12 sulit
diambil, dan Statistika belum punya materi contoh nyata.
- `components/widget/statistika/TitikPegang.tsx`: sasaran sentuh berjari-jari
  16 di belakang bola 5 sampai 8, bola membesar dan menyala saat dipegang.
  `TumpukanTitik` memakainya otomatis kalau bolanya bisa diseret.
- `components/kendali/TabelData.tsx`: satu kotak ketik per angka (dua kolom
  untuk pasangan x, y), lapor `${kunci}-${indeks}` ke `sedang-diubah` supaya
  bolanya menyala. Materi 11 memakai dua `Angka` (cuma dua ujung garis).
- Materi 14 "Statistika di sekitar kita": `content/statistika/tahap-nyata.ts`
  + `DuniaNyataStatistika.tsx` (enam grafik kecil digambar sendiri, bukan
  foto). Sub-bab D "Penerapan" di `subbab.ts`. SEMUA ANGKANYA ANGKA CONTOH,
  dinyatakan di bacaannya. Pemeriksa angka (`alat/cek_statistik_web.mjs`)
  tetap lolos 152 angka.
- Tugas video Transformasi 2 menit sudah dikirim ke sesi
  MANTRA-TRANSFORMASI-GEO (sesi sedang mati; pesannya menunggu dibuka).

## 5 SEP (malam, lanjutan): BERANDA DIRAPIKAN, VIDEO BERANDA BARU

Permintaan ARYA 5 Sep sore: korsel jangan berganti sendiri; video slide 1
harus terus mengulang dan hidup lagi saat kembali ke slide itu; kotak slide
krem; bola hijau di kurva biru hero dengan irama acak; dan video slide 1
dirender ulang meniru Materi 09 Trigonometri tanpa suara dan subtitle.

- Video: `manim/scenes/beranda_tiga_grafik.py` (ManimGL, port dari arsip CE).
  30 detik, 0 sampai 540 derajat, laju tetap, lalu dipudarkan dan diulang
  dari nol supaya `loop` di peramban tidak berkedip. Render:
  `manimgl manim/scenes/beranda_tiga_grafik.py BerandaTigaGrafik -w --hd`,
  lalu ffmpeg ke `web/public/anim/beranda-tiga-grafik-v3.mp4` (30 fps, h264)
  dan poster `.jpg` dari detik 13,5. Berkas v2 masih ada, tidak dipakai.
  Video ini TIDAK punya jalur subtitle (`jaga_jalur_bawah=False`), sebab
  memang tidak bernarasi; pemeriksaan tabrakan dan bingkai tetap jalan.
- Dua jebakan ManimGL yang ketahuan lewat lembar kontak: `Circle` butuh
  `stroke_color=` (`color=` kalah oleh bawaan merah), `Dot` butuh
  `fill_color=` (`color=` kalah oleh bawaan putih).

## 5 SEP (malam): SEMUA WIDGET MEMAKAI SISTEM KENDALI BERSAMA

Permintaan ARYA (5 Sep): widget jangan cuma bisa diseret di gambar; siswa
harus bisa MENGETIK angkanya, tiap kendali harus menjelaskan gunanya, label
sumbu harus rinci, dan perubahan harus terlihat langsung di gambar.
Rancangannya: `docs/superpowers/specs/2026-09-05-sistem-kendali-widget-design.md`.

Yang jadi, di ketujuh topik (56 materi berwidget, semuanya dicek di browser
desktop dan HP 390 px, tidak ada yang melebar):
- `web/components/kendali/`: `Angka` (nama + arti, angka tampil, kolom ketik
  yang DIPOTONG ke batas bukan ditolak, penggeser), `Koordinat` (x, y, plus
  pratinjau vektor kolom dan i-j), `Pilihan` (tombol bersegmen), `Petunjuk`
  (kalimat "geser X, perhatikan Y"), dan `sedang-diubah.ts` (kendali yang
  dipegang melaporkan `kunci`-nya, gambar menyalakan bagiannya: kelas `.nyala`).
- `web/lib/petak-sumbu.ts`: satu pembuat label sumbu untuk semua papan;
  jaraknya dipilih supaya labelnya rapat tapi tidak bertumpuk.
- Gambar lengket (`position: sticky`) di atas kendalinya, jadi saat menggeser
  perubahan terlihat tanpa menggulir.
- Kata "tahap" di teks siswa Trigonometri diganti "Materi 0N".

Cara memakai di widget baru: taruh `<Angka nama arti nilai onUbah min max
langkah kunci>` di dalam `.kendali`; kalau widget punya pegangan yang bisa
diseret, panggil `useSedangDiubah()` dan beri kelas `nyala` saat kuncinya
sama. Contoh: `Panah.tsx` (vektor), `Bentuk.tsx` (transformasi),
`SegitigaSebangun.tsx`.

**Letak alat di layar sempit (keputusan ARYA 5 Sep, sesudahnya):** materi
TANPA video tidak lagi menyodorkan widget di atas judul. Widgetnya disisipkan
di bawah kotak "Yuk bereksperimen" pertama (prop `sisipan` di
`Penjelasan.tsx`), atau di akhir bacaan kalau kotaknya tidak ada (empat galeri
dunia nyata). Materi dengan video tetap: video dulu, alat lewat "Coba
sendiri". Desktop tiga kolom tidak berubah.

Yang sengaja BELUM: sorot `.nyala` baru ada di Vektor, Transformasi, dan
Segitiga sebangun; tombol aksi lama ("Kembalikan semula", "Samakan
rata-ratanya") di Statistika masih bergaya lama karena memang bukan besaran.

## 5 SEP: MANTRA v2 "Panggung Sinema" SUDAH DI PRODUKSI

Cabang `sesi/mantra-v2` sudah digabung ke `master` dan dinaikkan ke
produksi. **https://matra-eight.vercel.app** kini memakai rancangan v2.
Pratinjaunya (`mantra-rancangan-v2.vercel.app`) masih hidup sebagai
pembanding dan boleh dibuang kapan saja.

Isi perubahan ada di pesan commit, jangan disalin ulang ke sini. Ringkasnya:
nav, hero, dan kaki halaman jadi permukaan navy; halaman belajar jadi tiga
kolom penuh layar (daftar materi, bacaan, ALAT) dengan pembatas yang bisa
ditarik dan mode fokus layar penuh; Peta Materi jadi baris sub-bab; menu
Latihan jadi kartu per bab tanpa kuis; ada halaman 404, keadaan memuat, dan
kotak galat video.

### YANG PERLU DIKETAHUI SESI BERIKUTNYA

1. **Gerbang resolusi video MENOLAK saat promote ini, dan tetap dinaikkan
   atas keputusan ARYA.** `python alat/cek_resolusi_anim.py` melaporkan 33
   video masih 480p. Sebelum promote ini produksi TIDAK punya video topik
   sama sekali (404), jadi menaikkannya membuat video muncul untuk pertama
   kali, di mutu draf. Begitu render 1080p selesai, jalankan gerbangnya lagi
   sampai lolos lalu deploy ulang.

2. **Kredit ElevenLabs di halaman Tentang belum sesuai kenyataan.** Seluruh
   `manim/narasi/*.json` masih mencatat `id-ID-ArdiNeural` (edge-tts).
   ARYA akan mengganti suaranya; penandanya ada di `app/tentang/page.tsx`.

3. **Bank soal menu Latihan dan kuis bab masih satu kumpulan** (32 soal
   `kuis.ts`). Yang sudah dikerjakan: kuis kini MENDAHULUKAN soal yang belum
   pernah dijawab benar di bank soal. Kalau suatu saat mau benar-benar
   terpisah, perlu bank soal baru.

4. **Kartu ManimGL menaut ke manim.community**, padahal yang dipakai ManimGL
   milik 3Blue1Brown. ARYA tahu bedanya dan tetap memilih itu.

> **SESI BARU: baca berkas ini dari atas sampai bawah SEBELUM mengerjakan apa pun.**
> Terakhir diperbarui: **3 September 2026 sore**.
>
> **SITUS SUDAH TAYANG: https://matra-eight.vercel.app** (bisa dibuka siapa pun,
> tanpa login). Baca bagian "Deploy Vercel" di bawah sebelum menyentuh deploy.
>
> **Rezim SESI PARALEL aktif sejak 1 Sep malam.** MASTER kerja di
> `D:\MANIM-MATRA` (master); lima sesi lain di worktree masing-masing.
> Baca bagian "Folder kembar" di bawah dan `docs/tugas/ATURAN-SEMUA-SESI.md`.

## Ringkas
| | |
|---|---|
| Tahap sekarang | **ENAM topik tayang dengan tampilan MANTRA** (Trigonometri dan Limit lengkap dengan video). Topik ketujuh, Transformasi Geometri, baru dimulai |
| Yang tersisa | **Gelombang 2 berjalan di 6 sesi**: revisi isi dari MASTER lalu video 480p. ARYA meninjau sambil jalan |
| Alamat tayang | https://matra-eight.vercel.app (produksi) dan https://mantra-uji.vercel.app (uji, alamat tetap) |
| Rancangannya | `docs/superpowers/specs/2026-08-31-trigonometri-alur-belajar.md`<br>`docs/superpowers/specs/2026-09-01-revisi-besar-situs.md`<br>`docs/superpowers/specs/2026-09-01-limit-alur-belajar.md`<br>`docs/superpowers/plans/2026-09-01-topik-limit.md` |
| Tenggat | 12 September 2026 |
| Menjalankan situs | `cd web && npm run dev` → `http://localhost:3000` |
| Penghalang | *(tidak ada)* |

## 🧭 MULAI DARI SINI (sesi berikutnya, ditulis 2 Sep 2026)

### 🎬 4 SEP PAGI: MASTER menonton, menggabung, menambal gerbang, memberi tugas

- **Peran MASTER berubah atas perintah ARYA 4 Sep**: MASTER MENONTON lembar
  kontak video sesi, memberi masukan, dan mengirim revisinya (aturan 2 Sep
  "sesi merevisi sendiri, MASTER tidak menerima setoran" DICABUT).
- Digabung ke master: `sesi/ruang-3d`, `sesi/statistika`, `sesi/vektor`,
  `sesi/transformasi-geometri` (konflik satu baris komentar di `topik.ts`).
  tsc 0, build 22 halaman. Grafik Fungsi dan UI/UX tidak punya commit baru.
- 16 lembar kontak dinilai (3D enam, Vektor enam, Statistika empat). Dua
  cacat LINTAS SESI, keduanya pelanggaran STANDAR yang sudah ada: pembuka 3D
  15 sampai 20 detik hampir kosong di semua video (aturan: 8 sampai 10 detik,
  hanya video pertama), dan dunia dimampatkan ke separuh tinggi karena zona
  HUD dibaca sebagai seluruh lebar atas (aturan: hanya dua pojok). STANDAR
  dipertegas di butir 1 dan 2.
- Gerbang mutu ditambal (`29b54bc`): `periksa_adegan(..., tulisan={...})`
  dan pemeriksaan isi `papan.semua()`; `nilai_hidup` memberi "=".
  `uji_qc.py` 13 ok.
- Pesan tinjauan + tugas dikirim ke lima sesi hidup (3D, Vektor, Statistika,
  Grafik Fungsi, Transformasi Geometri). UI/UX TIDAK menyala.
- **Bentrok yang diketahui**: Vektor punya 70 baris `sinema.py` belum
  disimpan yang menyentuh `PapanRumus`, sama dengan perubahan 3D yang sudah di
  master. Vektor diminta commit, merge, dan mempertahankan perubahan 3D.
- **Antrean render bersama: `alat/antre_render.py <nama-worktree>`** (BUKAN di
  `manim/`; MASTER pernah salah tulis jalurnya 4 Sep). Semua render lewat sini
  supaya lima sesi tidak berebut kartu grafis.
- **TUGAS PER SESI (4 Sep pagi), juga dikirim lewat pesan; sesi yang
  dinyalakan ulang membacanya dari sini:**
  - **Ruang 3D**: merge master; pembuka 01 maksimal 10 detik dan ada kejadian,
    03 sampai 09 maksimal 5 detik atau langsung rangka; kubus diberi cahaya dan
    bayangan (`gl.ilustrasi.balok`); angka sumbu cukup 0, 3, 6; `nilai_hidup`
    kini otomatis "="; render 01 dan 04 dulu untuk dinilai; 03 tunggu ARYA.
  - **Vektor**: commit `sinema.py` lalu merge master, pertahankan perubahan 3D
    di `PapanRumus`; potong pembuka 03/04/06/08/09 ke maksimal 5 detik; bidang
    boleh naik (tengah atas bebas); label "dayung" 180 derajat dan resultan
    hitam di 06; render ulang hanya 01 dan 06.
  - **Statistika**: merge master; 06 kamera didekatkan (garis bilangan penuh,
    orang terlihat), 11 kamera diperbesar di babak residu saja; pindahkan
    kamus TULISAN ke `tulisan=`; tujuh video baru ikut aturan zona.
  - **Grafik Fungsi**: lapor status dua revisi (grafik3, grafik6), commit,
    merge master; buat `alat/cek_sinkron_video.py` umum untuk topik lain.
  - **Transformasi Geometri** (sesi TIDAK menyala saat pesan dikirim): merge
    master, daftarkan bab di `web/content/subbab.ts`, buktikan lewat
    `/peta-materi`; baca STANDAR versi master sebelum video pertama.
  - **UI/UX** (tidak menyala; usulan MASTER kalau dinyalakan): audit MANTRA
    di HP lewat https://mantra-uji.vercel.app, potret ulang `demo-latihan.jpg`
    dan `demo-banksoal.jpg` untuk korsel (masih tampilan lama), ruang kosong di
    bawah widget lebar pendek pada layar lebar, langkah bernomor pembahasan.
- Menunggu keputusan ARYA: (1) Ruang 3D materi 03, kamera sejajar AC
  (usul: tetap, dengan aba-aba di narasi); (2) Statistika mengerjakan tujuh
  video di luar rencana enam (usul: boleh, 480p semua); (3) sesi UI/UX
  dinyalakan lagi atau tidak; (4) foto pesawat ber-livery DHL di Vektor.

### 🔁 4 SEP PAGI: sesi dimuat ulang, nama berganti lagi, master di `3dd4bae`

- Semua sesi mati dan menyala lagi dengan nama otomatis (`manim-matra-6f`,
  `-c6`, `-6b`, `-b4`); MASTER kini `manim-matra-65`. Sesi yang mau lapor ke
  MASTER: `ListAgents`, pilih baris yang **bukan** dirinya dan bukan sesi
  topik, atau tunggu pesan MASTER yang menyebut namanya.
- Digabung ke master 4 Sep pagi: Statistika (10 video dirapikan,
  `gl.ilustrasi.tumbuh_batang`), Ruang 3D (`gl.ilustrasi.balok` bercahaya
  tiga muka + bayangan lantai, uji `manim/uji/uji_balok_tiga_terang.py`,
  keenam pembuka punya kejadian), Vektor (laporan), Grafik Fungsi (alat
  sinkron versi rona, tahap 3 dan 6), Transformasi Geometri (**video 01
  lolos semua gerbang**, worktree-nya masih punya 18 berkas belum disimpan).
  `uji_qc.py` 16 uji, tsc 0.
- Aturan yang lahir hari ini (semua di STANDAR): pembuka 3D hanya video
  pertama (nomor tahap terkecil), video lain "detik pertama bergerak"
  maksimal 5 detik di 2D maupun 3D, kartu judul dikecualikan; zona HUD hanya
  dua pojok; `alas_hud` + tanda `latar`; sumbu didaftarkan sebagai dua pita
  pipih; `cek_kode` menolak `$` dan baris baru di dalam `teks()`.
- Masih menunggu ARYA: izin Grafik Fungsi untuk merge master dan render
  ulang tahap 6 (memadatkan 3D ke 5 detik).

### 🗺️ 4 SEP DINI HARI: peta struktur graphify sudah ada

- `graphify-out/graph.json`: **2.471 simpul, 5.881 hubungan, 167 komunitas
  bernama**. Isinya seluruh kode (`manim/`, `web/`, `alat/`, termasuk arsip
  Manim CE), 52 dokumen (spec, standar, PROGRESS, CLAUDE, rancangan MANTRA),
  dan 43 foto materi. Buka `graphify-out/graph.html` di peramban untuk
  menjelajah; `GRAPH_REPORT.md` untuk simpul pusat, hubungan tak terduga,
  dan pertanyaan yang layak ditelusuri.
- **Cara pakai tiap sesi:** baca `GRAPH_REPORT.md` dulu, lalu
  `graphify query "<pertanyaan>"`, `graphify path "A" "B"`, atau
  `graphify explain "X"`. Kode berubah? `graphify update .` (AST, gratis).
- **Yang dipelajari dengan mahal, jangan diulang** (rincian di CLAUDE.md
  bagian Peta struktur): Gemini gratis kena kuota harian 20 permintaan;
  OpenCode Zen saldo kosong; di OpenCode Go `glm-5.3` menghabiskan seluruh
  keluaran untuk berpikir (JSON kosong) dan `deepseek-v4-flash` butuh opt-in
  wilayah; yang bekerja: `glm-5.3-flash` lewat `/zen/go/v1`, 42 dokumen
  dalam 10 menit, 187 ribu token masuk / 38 ribu keluar (sekitar 2 sen
  dolar). Skrip pemanggil AST di Windows WAJIB punya pagar
  `if __name__ == "__main__":`, dan jangan pernah menamai skrip `ast.py`
  (menutupi modul bawaan Python, semua impor pecah).
- Rantai panjang (lebih dari 10 menit) TIDAK boleh dijalankan sebagai
  perintah latar belakang alat (batas 10 menit); jalankan lewat
  `Start-Process bash.exe <skrip>` dan pantau berkas lognya. Log jangan
  lewat pipa `grep`/`cut` (tertahan sampai selesai), tulis langsung ke berkas.

### ✅ 3 SEP MALAM: rancangan MANTRA TAYANG di produksi

- `sesi/mantra` digabung ke `master` (fast-forward ke `faac773`) setelah ARYA
  memeriksa di laptop dan HP, lalu build yang PERSIS ia periksa dinaikkan ke
  produksi lewat `vercel promote` (bukan build ulang). Produksi
  https://matra-eight.vercel.app sekarang MANTRA. Worktree `mantra` dihapus
  karena sudah tergabung.
- **Alamat uji TETAP: https://mantra-uji.vercel.app.** Tiap deploy preview
  diarahkan ulang ke sini dengan `vercel alias set <deploy> mantra-uji.vercel.app`,
  supaya ARYA cukup menyimpan satu alamat di HP. Jangan lagi memberi ARYA
  alamat acak `matra-xxxx-...vercel.app`: ia pernah membuka yang lama dan
  mengira perbaikannya belum ada (3 Sep).
- **Cara deploy yang benar mulai sekarang:** dari `D:\MANIM-MATRA\web` di
  `master`. Preview: `vercel deploy --yes` lalu `vercel alias set ...`.
  Produksi: hanya atas kata ARYA, WAJIB lolos `python alat/cek_resolusi_anim.py`
  dulu (video 480p tinjauan memakai nama yang sama dengan 1080p; temuan 3D
  4 Sep), lalu pakai `vercel promote <deploy>` untuk
  menaikkan build yang sudah ia periksa, bukan `--prod` yang membangun ulang.
- Yang berubah di situs (rincian per commit `01b0f5e`, `86b0a22`, `d810649`,
  `faac773`): huruf Newsreader + Space Grotesk, palet emas-navy, nav lengket,
  beranda baru dengan korsel 16:9 bergeser, rute baru `/peta-materi` (tiap
  materi bisa diklik, `?materi=` membuka materi itu), halaman materi dengan
  sidebar pohon (di HP jadi laci geser), bank soal dengan panel pembahasan di
  samping, kaki halaman putih di semua halaman, lebar halaman ikut layar.
- **Sesi topik:** sekarang boleh `git merge master` untuk mendapat tampilan
  baru. Daftar berkas milik MASTER di bawah TETAP berlaku (jangan diedit di
  cabang sesi), hanya syarat "sampai `sesi/mantra` digabung"-nya yang sudah
  lewat.
- Utang MANTRA yang tersisa: panel pembahasan bank soal memakai satu paragraf
  `alasan`, belum langkah bernomor (medan `langkah?: string[]` sudah ada di
  `SoalKuis`, tinggal diisi per soal); cuplikan layar korsel `demo-latihan.jpg`
  dan `demo-banksoal.jpg` masih memotret tampilan lama; ruang kosong di bawah
  widget lebar pendek pada layar lebar (milik sesi topik).

### ⚠️ 3 SEP SORE: nama situs jadi MANTRA, dan ada topik ketujuh

**Baca tiga butir ini sebelum menyentuh apa pun.**

**1. Situsnya sekarang bernama MANTRA, bukan MATRA.** Yang berganti hanya nama
yang DILIHAT pengguna: judul halaman, logo, nav, metadata. Yang SENGAJA tidak
diganti: nama folder `D:\MANIM-MATRA`, nama cabang `sesi/*`, alamat Vercel
`matra-eight.vercel.app`, dan kunci localStorage `matra:*`. Mengganti kunci
localStorage menghapus kemajuan siswa yang sudah tersimpan, dan mengganti
alamat Vercel memutus tautan yang sudah disebar. Jangan "merapikan" ini.

**2. Topik KETUJUH: Transformasi Geometri.** ARYA membuat worktree
`.claude/worktrees/mantra-transformasi-geometri` pada cabang
`sesi/transformasi-geometri`. Topik baru wajib didaftarkan di TIGA berkas:
`web/content/topik.ts`, `web/content/daftar-isi.ts`, dan `web/content/subbab.ts`
(pemetaan Bab dan Sub-bab). Kalau `subbab.ts` terlewat, topiknya tidak akan
muncul di Peta Materi walaupun halamannya jadi.

**3. JANGAN SENTUH berkas tampilan berikut sampai `sesi/mantra` digabung.**
Perombakan rancangan MANTRA sedang berjalan di worktree `mantra`, dan berkas
di bawah ditulis ulang seluruhnya. Mengubahnya sekarang berarti konflik besar
yang harus diselesaikan tangan:

| Berkas | Milik |
|---|---|
| `web/app/globals.css` | MASTER (sesi/mantra) |
| `web/app/page.tsx`, `web/app/tentang/page.tsx`, `web/app/peta-materi/page.tsx` | MASTER |
| `web/app/layout.tsx`, `web/components/Nav.tsx`, `web/components/Demo.tsx` | MASTER |
| `web/components/mantra/*` (termasuk `Kaki.tsx`) | MASTER |
| `web/components/topik/HalamanTopik.tsx` | MASTER |
| `web/components/latihan/*` | MASTER |
| `web/content/subbab.ts` | MASTER, KECUALI menambah satu entri Bab untuk topik baru |

Yang tetap milik tiap sesi: `manim/scenes/<topik>*.py`, `web/content/<topik>/`,
widget topiknya sendiri, dan `web/public/anim/` untuk berkas videonya.

**Aturan tata letak baru yang berlaku untuk SEMUA halaman:** lebar wadah
halaman DILARANG dipatok piksel (`max-width: 1120px` dan sejenisnya). Pakai
`padding: 0 var(--tepi)`. Patokan piksel tidak ikut berubah saat peramban
di-zoom keluar, sehingga isi halaman menciut ke tengah dan kiri kanan layar
kosong. ARYA menemukannya 3 Sep 2026 di halaman materi.

**Kebersihan worktree:** worktree liar `lokasi-kerja-eca82e` dihapus 3 Sep
(bersih, cabangnya nol commit unik terhadap `sesi/ruang-3d`). Foldernya masih
tertinggal kosong karena ada proses yang memegangnya; hapus manual kalau
mengganggu. Empat cabang `claude/*` sisa sesi lama masih ada dan tidak dipakai.

### Keadaan dalam satu tarikan napas
Enam topik TAYANG di https://matra-eight.vercel.app. Trigonometri dan Limit
lengkap dengan video (7 video masing-masing). Empat topik baru (Vektor, Grafik
Fungsi, Statistika, Ruang 3D) halamannya utuh tanpa video, dan kelimanya
ditambah UI/UX sedang mengerjakan gelombang 2 di sesi paralel.

### 3 SEP SIANG: laptop mati, sesi dinyalakan ulang, empat cabang digabung
- Laptop ARYA mati. Kelima sesi dinyalakan ulang dengan `NYALAKAN-5-SESI.bat`
  (skripnya MELANJUTKAN, bukan mengulang: tiap worktree tetap satu berkas
  transkrip, 1.600 sampai 5.600 baris, hanya ditambahi). Nama MATRA di daftar
  aplikasi TIDAK ikut kembali, sebab sesi terminal didaftarkan sebagai baris
  baru bernama acak; ini hiasan, lapisan antar-sesi tetap mengenali MATRA-*.
  ARYA memutuskan lain kali membuka sesi manual dari aplikasi per worktree.
- Keempat cabang digabung ke `master` tanpa konflik: Vektor (empat video
  terakhir 08, 03, 09, 04, plus Materi 01 dan 06 dinaikkan ke standar v2),
  Grafik Fungsi (Tahap 3 versi v2, `manim/gl/grafik.py` dipindah keluar ke
  wilayah topiknya), Ruang 3D (keenam video disesuaikan ke v2), UI/UX (bukti
  kedua subtitle di produksi). Statistika sudah tergabung sebelumnya.
- Verifikasi setelah gabung: `gl` utuh, uji qc lolos, `cek_kode` bersih untuk
  19 adegan, tsc 0, eslint 0, build sukses. BELUM dideploy: perubahan web-nya
  hanya berkas `.vtt` Vektor, dan ARYA belum menonton videonya.
- Perbaikan perkakas dari temuan sesi (commit e437654): pemotong subtitle
  menegakkan 56 huruf (985 baris, nol yang lewat), slot teratas `PapanRumus`
  dipesan untuk rumus utama, `kamera.muat_datar` untuk bidang yang tidak muat,
  `ganti_rumus(..., papan=papan)`.
- Menunggu keputusan ARYA: ukuran bawaan subtitle 85% (pilihan ARYA) atau 100%
  (usul UI/UX, dengan bukti 64 huruf masih muat satu baris).

### YANG BERUBAH 2 SEP MALAM sampai 3 SEP DINI HARI: standar video VERSI 2
Empat sesi membuat video dengan standar v1 dan ARYA harus mengulang koreksi yang
sama empat kali (kamera miring merusak panjang, keterangan bertabrakan subtitle,
subtitle mengeja angka). MASTER menanyakan sepuluh pilihan, ARYA menjawab,
hasilnya `docs/tugas/STANDAR-ILUSTRASI-VIDEO.md` VERSI 2 (membatalkan v1 di
setiap hal yang bertentangan) dan STANDAR-MENGAJAR bagian 5 aturan 9 dan 10.
- Keempat cabang sesi DIGABUNG ke master (tsc 0, eslint 0, build 43 detik).
- Perkakas `manim/gl/` v2: zona layar dikunci (identitas kiri atas, rumus kanan
  atas, kaki layar milik subtitle dan qc menjaganya), `sinema.label` maks 2
  kata (menggagalkan render), `sinema.keterangan` DIHAPUS, `lahir_rumus` dan
  `ganti_rumus` (morph lambang), `jam_subtitle` + `b.tunggu_sampai`, medan
  `tulis` di naskah (lambang, bukan ejaan), subtitle satu baris 56 huruf,
  `gabung_audio --uji` membuat salinan `-bersubtitle.mp4`, `cek_kode` menolak
  nama Manim CE dan `Indicate` tanpa warna. Render maks 2 per sesi.
- Rujukan resmi: `manim/scenes/vektor1_perahu.py` (bidang datar) dan
  `manim/scenes/ruang_3d_01.py` (3D); `manim/contoh/contoh_perahu.py` kini
  kerangka 30 detik saja.
- Subtitle 14 video Trigonometri dan Limit dibetulkan (bentuk tertulis, warna
  tinta, ukuran bawaan 85%) TANPA render ulang, dan **dideploy ke produksi 3 Sep
  dini hari** (`vercel deploy --prod`), sekaligus membawa revisi isi keempat
  topik dari gelombang 2. Videonya sendiri (Manim CE) tidak berubah.
- Jebakan ManimGL baru: `Tex.font_size` adalah FAKTOR SKALA, bukan poin
  (`rumus()`/`teks()` menyimpan `ukuran_matra`); cache LaTeX menyimpan hasil kosong
  saat MiKTeX memasang font (tambalan 3 menolaknya).
- Peran MASTER (ARYA): hanya menggabung ke master dan menyampaikan aturan;
  tinjauan dan revisi dari ARYA langsung ke tiap sesi. Sesi lapor "siap gabung".
- Utang: air masih "longgar" dari pandangan atas (`REVISI-ARYA-VIDEO.md` butir 1,
  resep sudah ditulis, belum dikerjakan); suara latar ditunda ke tahap akhir;
  UI/UX memverifikasi 56 huruf subtitle muat satu baris di Chrome.

### YANG BERUBAH 2 SEP SIANG: pindah ke ManimGL
ARYA menolak video perahu gelombang 1 (perahu = titik, sungai = kotak diam) dan
menuntut level 3b1b. Keputusannya, dijalankan penuh hari itu juga:
- **Manim Community DICABUT, ManimGL 1.7.2 100%.** 14 video Trigonometri dan
  Limit dibiarkan apa adanya; kodenya diarsipkan di `manim/arsip-manim-ce/`.
- Perkakas baru `manim/gl/` (tema, sinema, kamera, ilustrasi, qc), semua
  diuji: `manim/uji/uji_*_gl.py`, `manim/gl/uji_qc.py`. Contoh rujukan lengkap
  yang lolos gerbang: `manim/contoh/contoh_perahu.py` (narasi, air hidup,
  perahu 3D, kamera dunia ke peta, panah, suara latar air dengan ducking).
- Dokumen sesi: `docs/tugas/STANDAR-ILUSTRASI-VIDEO.md`, `docs/tugas/ILMU-3B1B.md`.
  Spec: `docs/superpowers/specs/2026-09-02-pindah-manimgl-dan-standar-ilustrasi-design.md`.
- Huruf: SEMUA LaTeX (`teks()` = TexText untuk kata, `rumus()` = Tex untuk
  angka dan rumus; Constantia dicoba lalu dibatalkan ARYA). Latar krem, satu versi.
- Render paralel BOLEH (8 serentak terbukti aman); antrean tidak wajib.
- Jebakan ManimGL yang sudah ditambal/dilarang: `latex -no-pdf` (MiKTeX),
  argv saat impor, `Text(color=)` diabaikan, dan **cache LaTeX yang menyimpan
  hasil kosong** saat MiKTeX sedang memasang font (tampak seperti teks "dibuang
  diam-diam"; tambalan menolak SVG kosong; kalau terjadi lagi hapus
  `%LOCALAPPDATA%\manim\manim\Cache`).
- Suara latar `manim/suara/air.ogg` masih SINTETIS; ganti rekaman CC0 setelah
  ARYA menyetujui unduhan.
- Utang MASTER baru: pesan pembangunan ke 5 sesi (lihat `PROMPT-SIAP-TEMPEL.md`
  bagian E), lalu terima setoran video ManimGL pertama tiap sesi.

### Yang berjalan tanpa perlu Anda sentuh
Lima sesi hidup di worktree masing-masing, sudah dikirimi tugas gelombang 2:
revisi isi dari MASTER dulu, baru enam video 480p per topik. Kalau jendelanya
tertutup, hidupkan dengan `NYALAKAN-5-SESI.bat`, lalu kirim prompt bagian D di
`docs/tugas/PROMPT-SIAP-TEMPEL.md`.

### Tugas MASTER berikutnya, urut
**Peran MASTER dipersempit ARYA (2 Sep sore, berlaku tetap): MASTER TIDAK
menerima atau meninjau setoran video. Sesi merevisi sendiri dari tinjauan ARYA.
MASTER hanya (1) menyatukan cabang ke `master` dan (2) menyampaikan aturan dan
larangan global ke semua sesi (lewat SendMessage, lihat memori
`kirim-pesan-antar-sesi`).**
1. **Satukan cabang sesi ke `master`** saat sesi lapor siap gabung. Jalankan
   tsc dan build lewat biner Node langsung (pemeriksaan teknis penggabungan,
   bukan penilaian isi), deploy. Konflik yang muncul selalu di `daftar-isi.ts` dan `topik.ts`, dan
   selalu berjenis "dua sesi menambah baris di tempat yang sama": ambil kedua
   sisi, LALU periksa kurung penutupnya (pernah hilang, lihat commit 32d520f).
2. **Lunasi utang MASTER** (daftarnya di bagian Tinjauan isi di atas):
   jenis blok `rujuk`, alat bingkai bersama, teks widget Limit di HP, hapus
   `trigonometri.webm` yang yatim.
3. **Video Limit kedelapan** kalau ARYA mau: Materi 03. Lihat alasannya di
   bagian Keadaan tujuh video Limit.

### Tiga keputusan visual yang masih milik ARYA
Foto pesawat berlogo DHL di Vektor Materi 10; galeri Ruang 3D tahap 10 gambar
sendiri atau foto; bentuk tanda "baris tab bisa digulir" (UI/UX akan mengajukan
dua pilihan berpotret).

### Jangan diulang, ini sudah pernah memakan waktu
- **`rtk` mengarang keluaran** tsc dan build. Verifikasi WAJIB lewat
  `node node_modules/<alat>/bin/...` langsung.
- **Jangan percaya "Automatic merge went well".** Selalu tsc dan build sebelum
  deploy; penggabungan pernah menjatuhkan dua kurung penutup dan lolos.
- **Cacat yang tidur menunggu data bertambah** tidak terlihat di build maupun
  tsc. Contohnya `<source>` video yang tidak ikut berganti saat pindah tahap,
  yang baru muncul setelah tujuh tahap punya video. Yang menemukannya: membuka
  situs yang SUDAH TAYANG dengan Playwright lalu membandingkan alamat yang
  DITULISKAN dengan alamat yang benar-benar DIMUAT.
- **Render ManimGL boleh paralel** (sejak 2 Sep siang; kartu grafis yang
  menggambar). Antrean `alat/antre_render.py` tinggal pilihan untuk 1080p.

### Yang berubah di sesi 3: 22 revisi ARYA

**Aturan tetap yang lahir di sesi ini (berlaku SELAMANYA, semua proyek):**
- **Tanda pisah panjang DILARANG** di teks mana pun yang dibaca orang. Ganti
  dengan koma, titik, atau tanda hubung biasa. Sudah dicatat di `~/.claude/CLAUDE.md`
  dan `CLAUDE.md` proyek ini.

**Halaman depan** dirombak jadi perkenalan, bukan daftar: logo Matra, kalimat
pembuka, korsel 4 cuplikan video (`components/Demo.tsx`), tiga kolom "apa saja
isinya", kartu materi urut dari Kelas 10, kaki halaman berisi nama pembuat
(Nyoman Arya Sejati), logo UNDIKSHA, WhatsApp, dan tombol pasang aplikasi.

**Isi materi** dirapikan: kode `TRIG-10-B4` dibuang, label tab jadi `MATERI 01`,
pembuka Materi 01 ditulis ulang jadi masalah dulu baru jawaban, tiap materi
dipecah jadi sesi bernomor, ditambah kotak **YUK BEREKSPERIMEN 🔬**, `BACA CEPAT`
jadi `RINGKASAN`, dan bagian YouTube dipisah dengan tautan pencarian langsung.

**Latihan** kini pilihan ganda **A sampai E**. **Kuis** terkunci diam-diam sampai
kesepuluh materi dibuka DAN 10 menit membaca terkumpul (`lib/kemajuan.ts`).

**Perbaikan teknis:** bug zoom (panggung dulu ikut melar mengikuti layar, kini
dibatasi rem), subtitle tanpa bayangan dan bisa diperbesar siswa, video di-cache
permanen, PWA siap pasang, dan Materi 10 yang tadinya mati kini keempat contohnya
punya penggeser hidup.


### Yang berubah di sesi 4 (pagi 1 Sep) - revisi lanjutan ARYA

**Bug zoom DIPERBAIKI ULANG, yang pertama belum tuntas.** ARYA menemukan pada
zoom 100% tombol "Tonton"/"Coba sendiri" dan pengatur ukuran teks hilang.
Sebabnya `calc(100vh - var(--nav))` menuntut angka `--nav` selalu tepat.
Sekarang tingginya tidak dihitung sama sekali: `body` jadi kolom flex dan
panggung memakai `flex: 1 1 0`. Diuji di 5 ukuran layar, 3 ukuran font
peramban, dan kedua mode.

**Pelajaran yang ARYA minta dicatat:** revisi tampilan WAJIB dicoba sendiri
lewat Playwright di beberapa tingkat zoom sebelum dilaporkan. Sudah disimpan
sebagai memory `verifikasi-visual-multi-zoom`.

**Halaman baru:** `/latihan` (bank soal berjenjang, bar kemajuan, 7 lencana)
dan `/tentang`. Keduanya sudah ditautkan di navigasi sejak lama tetapi
halamannya tidak pernah dibuat, jadi kedua menu itu selama ini **404**.

**Kuis: bank 32 soal.** Tiap sesi mengambil 8 soal dan menghindari yang sudah
pernah keluar, jadi empat sesi pertama tidak mengulang satu soal pun (sudah
dibuktikan lewat pengujian). Semua jawaban numerik diperiksa ulang dengan
hitungan mesin.

**Materi 10 tidak lagi interaktif.** Penggeser dibuang, fotonya kini tampil
utuh dua per baris dengan `contain`, tidak dipotong lagi.

**Lain-lain:** tab cukup "MATERI 01", logo nav jadi lambang M saja dan
diperbesar, menu "Beranda" ditambahkan, bagian "Apa saja isinya" dijadikan
sorotan (judul serif besar, teks tinta, tiga kartu bernomor), korsel halaman
depan kini berselang-seling video dan cuplikan layar asli, dan label sin/cos
di widget lingkaran satuan diberi halo supaya tidak dipotong garis lingkaran.

**Masih menunggu ARYA:** pilihan slogan halaman depan (5 usulan sudah
diberikan).

### Yang berubah di sesi 5 (malam 1 Sep) - topik kedua: LIMIT

**ARYA memilih Limit sebagai topik kedua, lengkap, dengan 6 sampai 7 video.**
Claude sudah menyampaikan bahwa pilihan itu kemungkinan besar menghabiskan
seluruh sisa waktu sampai 12 September sehingga empat topik lain tidak
tergarap. ARYA tetap memilih itu, dan keputusannya dijalankan penuh.

**Rangka halaman topik DIPISAH lebih dulu.** `Trigonometri.tsx` 638 baris
mencampur rangka halaman dengan penyetelan sepuluh widget, jadi topik kedua
tidak punya jalan lain selain menyalinnya. Sekarang:

| Berkas | Isi |
|---|---|
| `components/topik/HalamanTopik.tsx` | rangka, dipakai semua topik |
| `components/topik/PanggungTrigonometri.tsx` | penyetelan widget trigonometri |
| `components/topik/PanggungLimit.tsx` | penyetelan widget limit |
| `components/topik/jenis.ts` | perjanjian antara rangka dan panggung |
| `content/tipe.ts` | tipe isi yang dipakai bersama |
| `content/daftar-isi.ts` | **daftar pusat, menambah topik cukup satu baris di sini** |

**Buktinya Trigonometri tidak rusak:** 36 sidik jari DOM (18 kombinasi tab dan
mode, dikali kolom kiri dan kanan) diambil dari versi lama dan versi baru
dengan localStorage dikosongkan sama persis. Hasilnya identik huruf demi huruf.

**Limit selesai: 10 materi, 9 widget, 4 latihan, bank 32 soal kuis,
halaman `/latihan/limit`.** Yang belum: tujuh videonya.

**Alat baru `alat/cek_soal.py`.** Memeriksa jawaban limit dengan sympy, dan
menolak jawaban salah dengan menyebutkan yang benar. Dibuat SEBELUM satu soal
pun ditulis. Hasil pemeriksaan: 17 angka di materi lolos semua, 5 jawaban
latihan lolos semua, 28 jawaban kuis lolos semua.

**Tiga cacat tampilan ditemukan dengan MELIHAT potret layar**, bukan dari log:
tulisan bertindih di Materi 01, kalimat yang bertentangan dengan gambarnya
sendiri di Materi 04, dan tulisan menabrak kurva di Materi 07 dan 08.
Ketiganya sudah diperbaiki dan diperiksa ulang.

**Keputusan: galeri Materi 10 Limit digambar sendiri, bukan foto.** Alasannya
beda dengan Tahap 10 Trigonometri: di sana yang ditunjukkan DI MANA segitiga
berada, dan foto menjawabnya. Di sini yang ditunjukkan BENTUK KURVANYA, dan
foto roller coaster tidak memperlihatkan itu. Kalau ARYA lebih suka foto,
tinggal diganti.


---

## 📁 Folder kembar = sesi paralel yang DISENGAJA (rezim 1 Sep malam)

Di `.claude\worktrees\` ada worktree: satu gudang git dibuka di beberapa meja
kerja, tiap meja memegang cabang berbeda, masing-masing punya `PROGRESS.md`
sendiri yang bisa beda isi. Dulu ini pernah menyesatkan (Claude sempat bilang
"sudah digabung ke master" padahal belum, ARYA yang menemukannya). Sekarang
worktree justru dipakai resmi, dengan aturan tertulis.

| Sesi | Folder | Cabang | Tugas |
|---|---|---|---|
| MATRA-MASTER | `D:\MANIM-MATRA` | `master` | Limit, integrasi, deploy, PROGRESS.md |
| MATRA-VEKTOR | `.claude\worktrees\matra-vektor` | `sesi/vektor` | topik vektor |
| MATRA-GRAFIK-FUNGSI | `.claude\worktrees\matra-grafik-fungsi` | `sesi/grafik-fungsi` | topik grafik fungsi |
| MATRA-STATISTIKA | `.claude\worktrees\matra-statistika` | `sesi/statistika` | topik statistika |
| MATRA-RUANG-TIGA-DIMENSI | `.claude\worktrees\matra-ruang-3d` | `sesi/ruang-3d` | topik ruang 3D |
| MATRA-DESAIN-UI-UX | `.claude\worktrees\matra-ui-ux` | `sesi/ui-ux` | tampilan laptop + HP |

Aturan main lengkap: `docs/tugas/ATURAN-SEMUA-SESI.md`. Intinya:
- Tiap sesi HANYA di foldernya, HANYA di cabangnya, dilarang menyentuh master.
- Hanya MASTER yang menggabungkan, deploy, dan menulis `PROGRESS.md`;
  sesi lain menulis `docs/tugas/laporan/<NAMA>.md` di cabangnya.
- Selesai digabung, MASTER menghapus worktree + cabangnya supaya tidak ada
  catatan basi tersisa.
- Jangan percaya ingatan soal keadaan git. Periksa: `git worktree list` dan
  `git log --oneline -1 master`.
## 🏁 Keadaan lima sesi paralel (2 Sep 2026, dibaca dari laporan masing-masing)

| Sesi | Hasil gelombang 1 | Angka diperiksa | Menunggu |
|---|---|---|---|
| VEKTOR | 12 materi, 11 widget, 4 latihan, 32 kuis | 116, dua arah | tinjauan ARYA |
| GRAFIK-FUNGSI | 12 tahap, 11 widget, 4 latihan, 32 kuis, 6 foto beratribusi | 194, dua arah | tinjauan ARYA |
| STATISTIKA | 13 materi, 13 widget, 4 latihan, 32 kuis, semua data dinyatakan buatan | 146, dua pemeriksa | tinjauan ARYA |
| RUANG-3D | 10 materi, 9 widget 3D SVG, 4 latihan, 32 kuis, kalibrasi 5 soal UN asli | 70 | tinjauan ARYA |
| UI-UX | tampilan HP diperbaiki: tumpukan kolom, nav tiga garis, tab, target sentuh 44px | 7 layar x 5 zoom | penggabungan MASTER |

Semua laporan lengkap ada di `docs/tugas/laporan/` pada cabang masing-masing.

**Empat temuan sesi yang mengubah aturan bersama** (sudah masuk
`docs/tugas/ATURAN-SEMUA-SESI.md`):
1. **`rtk` mengarang keluaran.** `rtk proxy "npx tsc --version"` menjawab
   "TypeScript: No errors found"; `next build` lewat rtk mengaku 2 rute dalam
   1,2 detik padahal situsnya 15 halaman (STATISTIKA). Verifikasi sekarang
   memanggil `node node_modules/<alat>/bin/...` langsung. Catatan sesi 5 yang
   menyuruh memakai `rtk proxy` DICABUT.
2. **Playwright dipakai bersama antar sesi** tanpa nama sesi: potret nyasar ke
   folder sesi lain. Wajib `playwright-cli -s=<nama>`.
3. **Port 3000-3009 dikosongkan.** `npm run dev` tanpa `-p` naik diam-diam ke
   port sesi lain. Sesi sekarang di 3010 sampai 3014.
4. **`3 Dimensi.pdf` bukan geometri ruang**, isinya Buku Siswa Kelas XI
   (RUANG-3D memeriksa isinya, bukan judulnya).

**Temuan yang paling mendesak, dilaporkan EMPAT sesi secara terpisah:** halaman
topik rusak di lebar 375 piksel di SELURUH situs, termasuk Limit dan
Trigonometri yang sudah tayang. Di HP siswa tidak bisa membuka Latihan maupun
Kuis sama sekali. UI-UX sudah memperbaikinya di cabangnya; prioritas
penggabungan pertama.

**Utang MASTER dari laporan sesi:**
- Naikkan alat bingkai ke `components/widget/bersama/` (versi GRAFIK-FUNGSI
  paling lengkap) setelah semua topik tergabung; tiga topik menyalinnya.
- Jenis blok `rujuk` di `tipe.ts` untuk tautan antartopik yang bisa diklik.
- Teks widget Limit mengecil di HP (ARYA menyerahkannya ke MASTER, 2 Sep).
- Hapus `web/public/anim/trigonometri.webm` (yatim, 0,54 MB).
- Kompres foto galeri GRAFIK-FUNGSI (1 MB, di bawah 150 KB per foto).
- `Penjelasan.tsx` masih mengimpor tipe `Blok` dari tempat lama.

## 🎓 Tinjauan isi empat topik baru (MASTER, 2 Sep 2026)

ARYA (2 Sep): "semua kerjaan hingga saat ini saya anggap selesai, setuju,
lanjut", dan menyerahkan tinjauan ISI ke MASTER; tinjauan VISUAL tetap ARYA.
Keenam topik SUDAH TAYANG di situs asli.

MASTER membaca utuh keempat `tahap.ts` (sekitar 4.000 baris) dan keempat
rancangan, lalu menilainya dengan `docs/tugas/STANDAR-MENGAJAR.md`.

| Topik | Vonis | Kekuatan | Revisi utama |
|---|---|---|---|
| Vektor | LAYAK | urutan beralasan (Pythagoras, bukan trig), contoh + coba lengkap | "kamu" jadi "Anda"; prasyarat kosinus di Materi 11 |
| Grafik Fungsi | LAYAK, suara guru terkuat | alasan selalu sebelum aturan, tahap 6 sebagai poros | huruf x sebagai tanda kali (9 baris); pecah tahap 11 jadi komposisi dan invers |
| Statistika | LAYAK, "kenapa dulu" terbaik | mean titik seimbang DIBUKTIKAN, simpangan baku 4 langkah beralasan | huruf x sebagai tanda kali (13 baris); tahap 9 tambah coba modus |
| Ruang 3D | LAYAK | satu gagasan payung, tahap 1 coba dulu | tiga soal UN cuma jawaban tanpa jalan; tan dan aturan kosinus tanpa pemanggil ulang |

Aturan lintas topik yang lahir dari tinjauan ini (masuk file tugas tiap sesi):
1. Kata ganti siswa **"Anda"** (lima topik memakainya; Vektor menyesuaikan).
2. Tanda kali di baris `contoh`: **×** atau "kali", JANGAN huruf x.
3. Kata "mudah", "jelas", "gampang", "tentu saja" diperiksa satu per satu:
   boleh menggambarkan benda, dilarang menilai tugas siswa.
4. Tiap tahap prosedural wajib `contoh` beralasan + `coba` berpenuntun; tahap
   dua ide besar wajib `coba` untuk keduanya.
5. Daftar periksa 10 butir STANDAR-MENGAJAR diisi per tahap di laporan.

Keputusan MASTER atas pertanyaan sesi: data BPS tidak diambil (tetap data
buatan yang jujur); galeri Ruang 3D dan foto DHL adalah keputusan visual ARYA.

Gelombang 2 per sesi: revisi isi dulu, lalu enam video 480p, satu per satu
lewat `alat/antre_render.py`, narasi mengikuti bagian 5 STANDAR-MENGAJAR.
Daftar videonya ada di tiap `docs/tugas/MATRA-*.md` bagian "Gelombang 2".

### Utang MASTER (jangan hilang)
- Jenis blok `rujuk` di `content/tipe.ts` (tautan antartopik yang bisa
  diklik); perendernya nanti UI/UX. Diminta tiga sesi.
- Naikkan alat bingkai ke `components/widget/bersama/` (versi GRAFIK-FUNGSI
  paling lengkap); tiga topik menyalinnya.
- Teks widget Limit mengecil di HP (ARYA menyerahkannya ke MASTER).
- Hapus `web/public/anim/trigonometri.webm` (yatim, 0,54 MB).
- Kalau GRAFIK memecah tahap 11, `daftar-isi.ts` tidak berubah; cukup
  gabung ulang.

## 🎥 Keputusan ARYA 2 Sep sore: video vektor pindah ke bidang bernomor

Ditulis sesi MATRA-VEKTOR atas perintah ARYA, untuk dilaporkan ke MASTER.
Rinciannya di `docs/superpowers/specs/2026-09-02-video-vektor-bidang-bernomor.md`.

ARYA menonton `vektor1-perahu.mp4` dan `vektor6-sambung.mp4` (ManimGL penuh 3D)
lalu MENOLAK keduanya: gambar 3D-nya pecah, panahnya "sembarang tidak akurat",
tidak ada koordinat tertulis, perahunya tidak stabil.

**Akar masalahnya bukan 3D, melainkan kamera yang dimiringkan.** Supaya panah
yang segaris tidak saling menutupi, pandangan peta dimiringkan 14 sampai 26
derajat. Perspektif lalu memendekkan satu arah lebih banyak daripada arah lain,
sehingga segitiga 3-4-5 TIDAK lagi terlihat seperti 3-4-5. Untuk pelajaran
vektor itu fatal: gambarnya membantah hitungannya. Widget web topik yang sama
punya `jendelaSeimbang` yang dibuat khusus untuk mencegah itu, dan aturannya
dibuang begitu pindah ke video.

Arah barunya, disetujui ARYA:
> Matematika digambar di bidang datar bernomor, kamera tegak lurus dari atas,
> tidak pernah dimiringkan lagi. 3D hanya di babak pembuka, sekadar menjawab
> "kenapa ini penting", lalu ditinggalkan.

Panah yang segaris dipisahkan dengan geseran tegak lurus 0,15 satuan (di bawah
5 persen panjang panahnya, tidak mengubah satu pun angka), BUKAN dengan
mengangkatnya di sumbu z lalu memiringkan kamera.

### Untuk MASTER: usul mengubah aturan 1 STANDAR-ILUSTRASI-VIDEO
Keputusan ARYA: diubah untuk SEMUA topik, bukan pengecualian vektor saja.
Aturan 1 sekarang mewajibkan semua benda nyata dibuat 3D. Usulnya diganti jadi:

> 3D dipakai HANYA kalau memperlihatkan sesuatu yang tidak terlihat di 2D.
> Matematika yang butuh panjang atau sudut yang akurat WAJIB digambar dengan
> kamera tegak lurus, tanpa kemiringan.

Alasannya bukan selera: kesalahan ini sudah menghasilkan dua video ditolak, dan
Grafik Fungsi serta Statistika berisiko mengulanginya.

### Untuk MASTER: fungsi baru menunggu digabung
`bidang_bernomor()` akan ditambahkan sesi vektor di akhir `manim/gl/ilustrasi.py`
(bidang koordinat berangka, skala terkunci sama), sesuai aturan 1 standar yang
menyuruh benda baru ditaruh di situ dengan nama unik.

### Untuk MASTER: subtitle harus memakai angka dan lambang, bukan ejaan
Permintaan ARYA 2 Sep sore. Dua bagian, dan hanya SATU yang benar-benar bug:

**a. "Tampilkan 100%, jangan setengah-setengah" TIDAK perlu diperbaiki.**
Diperiksa di `manim/buat_subtitle.py`: `pecah()` memecah segmen panjang jadi
beberapa baris bertimestamp di batas kalimat lalu koma, dan tidak ada yang
dibuang (`hasil or [teks]` menjaga sisa). Yang ARYA lihat kosong kemungkinan
besar karena dua video vektor BELUM punya berkas `.vtt` sama sekali; sesi
vektor belum pernah menjalankan alatnya. Itu kelalaian sesi, bukan cacat alat.

**b. Angka dan lambang masih dieja: INI yang perlu diperbaiki.**
Bukti dari subtitle yang sudah tayang, `web/public/anim/limit1-kecepatan.vtt`
baris 1: "Speedometer menunjuk enam puluh kilometer per jam." Seharusnya
"60 km/jam". Sebabnya subtitle memakai teks yang sama dengan yang dikirim ke
mesin suara, dan mesin suara memang butuh ejaan.

Usul perubahan, kecil dan tidak merusak naskah lama: tambahkan medan opsional
`"layar"` per segmen di `manim/narasi/<topik>.json`.
- `buat_narasi.py` tetap memakai `teks` (ejaan, untuk mesin suara).
- `buat_subtitle.py` memakai `layar` kalau ada, kalau tidak ada jatuh kembali
  ke `teks`. Naskah lama tetap jalan tanpa diubah.

Contoh: `"teks": "panjangnya akar tiga belas, sekitar tiga koma enam satu"`,
`"layar": "panjangnya √13, sekitar 3,61"`.

**SUDAH DIKERJAKAN sesi vektor, tinggal ditinjau MASTER.** Perubahannya satu
baris di `manim/buat_subtitle.py`:

```
potongan = [tebalkan(x) for x in pecah(seg.get("layar") or seg["teks"])]
```

Naskah tanpa `layar` berjalan persis seperti dulu, jadi sembilan naskah topik
lain tidak tersentuh. Sesi vektor menyentuh berkas bersama ini karena tanpa itu
permintaan ARYA tidak bisa dipenuhi sama sekali; kalau MASTER mau menolaknya,
cukup kembalikan satu baris itu.

Hasilnya sudah diperiksa, bukan diperkirakan. `vektor1-perahu.vtt`: 30 baris,
118,37 detik, nol baris tumpang-tindih, dan setiap kata naskah muncul di
subtitle (jawaban untuk keluhan ARYA "tidak setengah-setengah"). Baris pertama
berbunyi `Materi 01, <b>Angka saja tidak cukup</b>.` dan baris ketiga
`Sungainya selebar 3 km, ...`, bukan "tiga kilometer".

Catatan terpisah: keluhan "subtitle tidak tampil 100%" TERNYATA bukan cacat
`pecah()`. Fungsi itu tidak membuang apa pun, sudah diuji per kata. Sebab
sebenarnya kedua video vektor belum pernah punya berkas `.vtt` sama sekali,
karena `buat_subtitle.py` memang belum pernah dijalankan untuk topik ini.

## 🔗 Pratinjau untuk tinjauan ARYA (2 Sep 2026)

**https://matra-8c3pwiiis-aryasejati002-4616s-projects.vercel.app**

Berisi master seutuhnya: empat topik baru, tujuh video Limit, perbaikan HP.
Kesembilan halaman baru (4 topik + 4 latihan + limit) dicek menjawab HTTP 200.
Situs asli (matra-eight.vercel.app) HANYA memuat perbaikan HP dan video Limit;
empat topik baru SENGAJA belum dipromosikan sampai ARYA meninjau.

Aturan mulai sekarang: **master = tergabung, situs asli = disetujui ARYA.**
Deploy ke situs asli (dengan --prod) hanya setelah ARYA bilang setuju. Sebelum
itu pakai: vercel deploy --yes --cwd D:/MANIM-MATRA/web (TANPA --prod) untuk
tautan pratinjau baru.

Keadaan cabang: kelima cabang sesi selaras dengan master di commit yang sama.
Kelima sesi sudah dikirimi prompt A (potret ulang HP, jangan bangun yang baru).
Penggabungan menyisakan satu pelajaran: penyelesai konflik ambil-keduanya
menjatuhkan penutup entri di daftar-isi.ts dan sumber.json; tsc dan pemeriksa
JSON yang menangkapnya. Selalu tsc + build SEBELUM deploy, jangan percaya
"Automatic merge went well".

## 🚀 Deploy Vercel (dikerjakan 1 Sep 2026, sesi 5)

**Alamat tayang: https://matra-eight.vercel.app**

| Hal | Keadaan |
|---|---|
| Proyek Vercel | `matra` di tim `aryasejati002-4616s-projects` |
| Vercel CLI | **sudah login** sebagai `aryasejati002-4616`, tidak perlu peramban |
| Perintah deploy | `vercel deploy --prod --yes --cwd D:/MANIM-MATRA/web` |
| Vercel Authentication | **DIMATIKAN**, jadi situs bisa dibuka siapa pun yang punya tautannya |
| Git remote | **TIDAK ADA**. Repo ini lokal saja, deploy lewat unggahan CLI, bukan GitHub |
| Cabang utama | **`master`**, bukan `main`. Jangan tertukar |

### Dua jebakan yang sudah kena dan sudah diselesaikan

**1. Semua halaman 404 padahal build sukses.** Proyeknya dibuat lewat
`vercel project add matra`, sehingga preset framework-nya kosong dan Vercel
memperlakukan folder `web/` sebagai unggahan berkas statis biasa. Gejalanya
khas: berkas di `public/` tetap bisa diambil (video 200), tetapi semua halaman
404, dan `vercel inspect` menunjukkan baris `Builds` cuma berisi titik dengan
durasi 0 milidetik. Sudah ditambal oleh `web/vercel.json` yang menyebut
`"framework": "nextjs"` secara tegas. Berkas itu **jangan dihapus**.

**2. Alamatnya bukan yang ditebak.** URL produksi yang sebenarnya adalah
`matra-eight.vercel.app`, muncul di baris `Aliased` pada log deploy.
Alamat `matra-aryasejati002-4616s-projects.vercel.app` menjawab 404, dan
`matra.vercel.app` milik ORANG LAIN yang kebetulan namanya sama. Selalu baca
baris `Aliased` di log, jangan menebak polanya.

### Sebelum deploy berikutnya
1. `npx next build` harus lolos lokal dulu.
2. Kalau isi video diganti, **ganti juga nama berkasnya** (aturan `immutable`
   di `next.config.ts` berlaku setahun).
3. Perkiraan kuota ada di `docs/2026-09-01-kuota-vercel-matra.md`. Ringkas:
   100 siswa memakai 4,2 persen transfer dan 2,7 persen request. Aman sampai
   sekitar 2.400 siswa rajin per bulan, dan turun ke sekitar 465 kalau keenam
   topik lengkap dengan video.

---

## 🎬 Keadaan tujuh video Limit

| Prioritas | Materi | Naskah | Adegan | 480p | 1080p | Keadaan |
|---|---|---|---|---|---|---|
| 1 | 04 Lubang di grafik | ✅ | ✅ | ✅ | ✅ | **TAYANG** |
| 2 | 01 Kecepatan sesaat | ✅ | ✅ | ✅ | ✅ | **TAYANG** |
| 3 | 08 Limit sinus | ✅ | ✅ | ✅ | ✅ | **TAYANG** |
| 4 | 02 Mendekati | ✅ | ✅ | ✅ | ✅ | **TAYANG** |
| 5 | 09 Kontinuitas | ✅ | ✅ | ✅ | ✅ | **TAYANG** |
| 6 | 06 Nol per nol | ✅ | ✅ | ✅ | ✅ | **TAYANG** |
| 7 | 07 Tak hingga | ✅ | ✅ | ✅ | ✅ | **TAYANG** |

**LIMIT TUNTAS (2 Sep 2026).** Tujuh video dari sepuluh materi, dan itu
memang sasarannya. Trigonometri pun tujuh dari sepuluh, jadi polanya sama:

| | Limit | Trigonometri |
|---|---|---|
| Materi/tahap | 10 | 10 |
| Video | 7 | 7 |
| Tanpa video | 03, 05, 10 | 01, 03, 10 |

Alasan ketiganya sengaja tanpa video, bukan tertinggal:
- **Materi 10 Dunia nyata** galeri, tidak butuh animasi. Tahap 10 Trigonometri
  sama, dan Vektor serta Ruang 3D juga merencanakan begitu.
- **Materi 05 Cara cepat** janjinya sengaja ditunda dan dilunasi di Materi 09,
  dan Materi 09 SUDAH punya video. Jadi bagian yang perlu dianimasikan sudah
  ada, tinggal ditonton di tempat pelunasannya.
- **Materi 03 Dua arah harus sepakat** satu-satunya calon yang masih masuk
  akal. Kalau ARYA mau menambah video Limit kedelapan, inilah yang dipilih:
  kiri dan kanan tidak sepakat, jadi limitnya tidak ada. Sebagian sudah
  tergambar di video Materi 02 (dua garis bilangan, mendekat dari dua arah),
  jadi ini penyempurnaan, bukan lubang.

Berkas naskah dan adegan hanya ada untuk ketujuh video itu
(`manim/narasi/limit*.json`, `manim/scenes/limit*.py`). Tidak ada adegan yang
sudah ditulis tetapi belum dirender.

Ketujuhnya 1920x1080 60fps, bersuara,
bersubtitle, berposter, terdaftar di `web/content/limit/tahap.ts`, dan sudah
di-deploy. ARYA memilih "render dulu, risiko diterima" tanpa menunggu ia
menonton, jadi kalau ia menemukan cacat, video itu dirender ulang.

Bitrate videonya 340 sampai 490 kbps. Itu SANGAT hemat untuk 1080p60 (YouTube
menyarankan sekitar 12.000 kbps) sebab isinya warna rata dan teks, bukan
rekaman kamera. Jadi jangan buru-buru menurunkan mutu kalau ukurannya terasa
besar; yang besar adalah jumlahnya, bukan tiap berkasnya.

### 🐛 Bug pemutar yang ikut terbongkar saat tujuh video tayang

Elemen `<video>` dipakai ulang saat siswa pindah tahap. Peramban HANYA membaca
`<source>` ketika elemen videonya pertama dibuat, jadi React mengganti
alamatnya tetapi videonya TIDAK ikut berganti. Yang tampil poster tahap baru,
yang terputar video tahap lama. Bukti dari situs yang sudah tayang:

```
declared=limit9-kontinu.webm | loaded=limit1-kecepatan.webm | durasi=102.1
```

Cacat ini TIDUR selama cuma Materi 04 yang punya video, dan langsung bangun
begitu tujuh tahap punya video. Perbaikannya satu baris: `key={berkas}` pada
elemen `<video>` di `web/components/PemutarVideo.tsx`, supaya elemennya dibuat
ulang dan pemilihan sumbernya diulang dari nol. Sudah diperbaiki, di-deploy
ulang, dan diperiksa satu per satu di situs yang tayang: tujuh tahap memuat
videonya sendiri, termasuk saat kembali ke tahap sebelumnya.

**Pelajarannya:** cacat yang tidur menunggu data bertambah tidak akan terlihat
di `npm run build` maupun di `tsc`. Yang menemukannya adalah membuka situs yang
SUDAH TAYANG dengan Playwright lalu membandingkan alamat yang dituliskan dengan
alamat yang benar-benar dimuat. Lakukan itu setiap kali menambah banyak konten
sejenis sekaligus.

**Catatan untuk MATRA-DESAIN-UI-UX:** `PemutarVideo.tsx` wilayahmu, tapi MASTER
menyentuhnya untuk perbaikan darurat ini. Fast-forward cabangmu ke `master`
sebelum mengedit berkas itu.

**Ukuran jadi masalah baru.** Keenam video baru menambah 35,2 MB, sehingga
`web/public/` naik dari 43,3 MB ke 78,4 MB, dan 96 persen isinya video.
Kuota Vercel gratis masih aman: 100 siswa menonton semua video sekali kira-kira
7,7 GB, yaitu 7,7 persen dari jatah 100 GB per bulan. Tapi kalau keenam topik
nanti punya video, transfer inilah yang akan mentok lebih dulu, bukan request.
Kalau perlu dipangkas: turunkan bitrate VP9, bukan resolusinya.

Ketujuh adegan sudah ditulis dan dirender. Enam salinan tinjauan bersuara ada
di `media/uji-480p/` (Materi 04 tidak perlu, sudah tayang 1080p). Folder itu
tidak masuk git sebab `media/` diabaikan; buat ulang dengan
`python manim/gabung_audio.py <topik> <NamaAdegan> --uji`.

**ATURAN BARU DARI ARYA (1 Sep 2026):** render SEMUA video di 480p dulu untuk
direvisi, baru render 1080p60 sekaligus di akhir. Jangan render final satu per
satu sebelum ARYA melihatnya.

### Cacat yang ditemukan dengan MELIHAT lembar kontak, sesi 6

Semuanya lolos dari log render tanpa satu pun galat. Tidak ada yang bisa
ditemukan tanpa membuka gambarnya.

| Video | Cacat | Sebabnya |
|---|---|---|
| 09 Kontinuitas | semua keterangan menyusut sampai tak terbaca | kalimat panjang satu baris dipaksa muat lebar 5,6 satuan oleh `batasi_lebar`, hurufnya tinggal 40 persen. **Pecah kalimat jadi baris pendek secara manual, jangan andalkan `batasi_lebar`.** |
| 09 Kontinuitas | 50 detik terakhir menayangkan grafik meledak sementara narasinya bilang "suku banyak kontinu di SEMUA titik" | gambar tidak ikut diganti saat babak berpindah, jadi layar membantah ucapannya |
| 09 Kontinuitas | keterangan lama dan baru tumpang tindih 1,4 detik | `FadeOut` dan `FadeIn` dijalankan bersamaan di posisi yang sama. Pakai berurutan. |
| 06 Nol per nol | tiga peralihan rumus jadi coretan tak terbaca 2 detik | `ReplacementTransform` antara dua rumus yang jumlah lambangnya jauh berbeda. **DIKOREKSI 2 Sep malam: rumus TETAP di-morph, tetapi lambang per lambang lewat `sinema.ganti_rumus` (TransformMatchingStrings), bukan ReplacementTransform mentah dan bukan tukar berurutan.** Catatan lama ini sempat membuat sesi Grafik memakai fade out/in, yang ditolak ARYA. |
| 06 Nol per nol | huruf `x` tertutup habis oleh coretannya sendiri, terlihat dihapus bukan dicoret | tebal garis yang pas untuk faktor `(x-2)` kelewat tebal untuk satu huruf. Sekarang tebalnya menyesuaikan lebar sasaran. |
| 07 Tak hingga | dua baris contoh pecahan menyusut sampai sulit dibaca | satu `MathTex` panjang berisi `\tfrac` dan `\qquad` jadi objek kelewat lebar, lalu dikecilkan seluruhnya. **Pisah jadi beberapa objek lalu `arrange`.** |
| 07 Tak hingga | keterangan penutup grafik cuma sempat tampil penuh 1,5 detik | langkah menggambar sebelumnya terlalu panjang |

| 06 Nol per nol | rumus lama dan rumus baru bertumpuk hampir 2 detik pada babak hasil1 | `FadeOut` dan `FadeIn` dijalankan BERSAMAAN di tempat yang sama. **Cacat ini lolos dari lembar kontak 480p** sebab sampelnya kebetulan meleset dari detik itu, dan baru ketahuan pada gerbang mutu berkas FINAL. Bukti bahwa langkah 10 di resep bukan formalitas. |

Satu hal yang **sengaja dibiarkan**: ada jeda sekitar 1 detik layar kosong
antara judul pembuka memudar dan isi pertama muncul, di ketujuh video. Itu
bawaan `sinema.judul_pembuka` yang memakai 80 persen jatah babak `sapa`. Kalau
ARYA merasa itu mengganggu, ubah pengali 0,80 di semua adegan sekaligus.

---

## 🛠️ Alat yang diperbaiki di sesi 5

**`manim/cek_kode.py` punya DUA lapor palsu dan keduanya sempat menghentikan
render.** Sekarang sudah benar, dan perbaikannya sudah diuji lewat berkas uji
yang memuat cacat sungguhan:

1. `Text` dimasukkan ke daftar pembuat LaTeX, padahal `Text` memakai Pango.
   Kalimat Indonesia yang sah dilaporkan gagal dibangun. Sekarang hanya
   `MathTex` dan `Tex` yang dibangun lewat MiKTeX.
2. Newline di dalam `Text` dianggap gejala string lupa awalan `r`, padahal ia
   pemisah baris yang disengaja. Sekarang dikecualikan khusus untuk pembuat
   teks biasa; di dalam `MathTex` newline tetap dianggap salah.

**`alat/cek_soal.py`** (dibuat di paruh pertama sesi ini) memeriksa jawaban
limit dengan sympy dan menolak yang salah.

---

## ⚠️ Cacat kecil yang belum diperbaiki
- Lencana "Matematika SMA" di pojok kanan atas **terpotong** pada layar sempit
  (terlihat di lebar 420 piksel). Tidak menghalangi pemakaian.
- `web/public/anim/trigonometri.webm` (0,54 MB) berkas yatim, tidak dipakai
  kode mana pun. Aman dihapus.

---

## 📊 Keadaan 10 tahap Trigonometri

| # | Tahap | Widget | Teks | Video |
|---|---|---|---|---|
| 1 | Kenapa kita butuh ini | ✅ `Bayangan` | ✅ | ⬜ |
| 2 | Perbandingan yang tidak berubah | ✅ `SegitigaSebangun` | ✅ | ✅ **JADI** 1080p60 |
| 3 | Menamai sisi | ✅ `PenamaanSisi` | ✅ | - tidak perlu |
| 4 | Lahirnya sin, cos, tan | ✅ `PabrikRasio` | ✅ | ✅ **JADI** 1080p60 |
| 5 | Lingkaran satuan | ✅ `LingkaranSatuan` | ✅ | ✅ **JADI** 1080p60 |
| 6 | Enam rasio sebagai panjang nyata | ✅ `EnamRasio` | ✅ | ✅ **JADI** 1080p60 |
| 7 | Sudut istimewa | ✅ `PerjalananSudut` | ✅ | ✅ **JADI** 1080p60 |
| 8 | Terbentuknya grafik sinus | ✅ `LingkaranKeGrafik` | ✅ | ✅ **JADI** 1080p60, 96 dtk |
| 9 | Sin, cos, tan berdampingan | ✅ `TigaGrafik` | ✅ | ✅ **JADI** 1080p60 |
| 10 | Dipakai di dunia nyata | galeri foto (tidak interaktif, keputusan ARYA 1 Sep) | ✅ | - tidak perlu |

Plus:
- **Latihan dalam halaman topik**: 4 soal pilihan ganda A-E dengan pembahasan bertahap
- **Kuis**: 8 soal per sesi, diambil dari **bank 32 soal** (`content/trigonometri/kuis.ts`),
  menghindari soal yang sudah pernah keluar
- **Halaman `/latihan`**: bank soal 4 tingkat, bar kemajuan, 7 lencana
- **Halaman `/tentang`**

---

## 📊 Keadaan 10 materi Limit (BARU, sesi 5)

Urutannya sengaja dibalik dari buku: bentuk yang TIDAK bisa disubstitusi
diperkenalkan lebih dulu (Materi 01 dan 04), baru cara cepatnya (Materi 05).

| # | Materi | Widget | Teks | Video |
|---|---|---|---|---|
| 1 | Kecepatan pada satu detik | ✅ `SelangMenyusut` | ✅ | ⬜ prioritas 2 |
| 2 | Mendekati, bukan menyentuh | ✅ `GarisMendekati` | ✅ | ⬜ prioritas 4 |
| 3 | Dua arah harus sepakat | ✅ `TarifMelompat` | ✅ | ⬜ cadangan |
| 4 | Lubang yang tidak mengubah tujuan | ✅ `LubangGrafik` | ✅ | ⬜ **prioritas 1** |
| 5 | Cara cepat, masukkan saja angkanya | ✅ `MesinSifat` | ✅ | - tidak perlu |
| 6 | Kalau hasilnya 0 dibagi 0 | ✅ `BongkarBertahap` | ✅ | ⬜ prioritas 6 |
| 7 | Kalau x lari ke tak hingga | ✅ `PerkecilTampilan` | ✅ | ⬜ prioritas 7 |
| 8 | Limit sinus jadi angka 1 | ✅ `BusurLawanTali` | ✅ | ⬜ prioritas 3 |
| 9 | Fungsi yang tidak putus | ✅ `PerusakFungsi` | ✅ | ⬜ prioritas 5 |
| 10 | Dipakai di dunia nyata | galeri gambar sendiri (bukan foto) | ✅ | - tidak perlu |

Plus: 4 latihan pilihan ganda A-E, bank **32 soal kuis**, halaman `/latihan/limit`.

**Kalau waktunya habis, potong video DARI BAWAH urutan prioritas, jangan acak.**
Situsnya sudah utuh dan layak ditunjukkan walaupun tanpa satu pun video Limit.

---

## 🔜 Yang harus dikerjakan berikutnya

### LANGKAH 1: tunggu ARYA menonton enam video 480p

Enam berkas sudah dikirim ke ARYA pada akhir sesi 6, ada juga di
`media/uji-480p/` (folder itu tidak masuk git). Jangan render 1080p sebelum ARYA
menyebut mana yang perlu diperbaiki atau bilang sudah oke. Itu aturan ARYA,
bukan tebakan.

Kalau `media/uji-480p/` sudah terhapus, buat lagi tanpa render ulang:

```bash
python manim/gabung_audio.py limit1-kecepatan  KecepatanSesaat        --uji
python manim/gabung_audio.py limit2-mendekati  MendekatiBukanMenyentuh --uji
python manim/gabung_audio.py limit6-nolpernol  NolPerNol              --uji
python manim/gabung_audio.py limit7-takhingga  TakHingga              --uji
python manim/gabung_audio.py limit8-sinus      LimitSinus             --uji
python manim/gabung_audio.py limit9-kontinu    FungsiTidakPutus       --uji
```

### LANGKAH 2: kalau ARYA sudah setuju, render enam-enamnya 1080p60 sekaligus

Pakai langkah 7 sampai 10 dari resep di bawah, enam kali. Materi 04 dilewati,
sudah tayang. Perkiraan waktu: sekitar 1,5 jam render, bisa ditinggal.

### Resep lengkap. Sudah terbukti tiga belas kali, tinggal diulang.

Ketujuh video Trigonometri sudah jadi dari nol sampai tayang, jadi resep di
bawah ini bukan teori. Urutan persisnya, ulangi apa adanya. Sudut pandang
visual tiap video ada di `docs/superpowers/specs/2026-09-01-limit-alur-belajar.md`.

**DIPERBARUI 2 Sep siang: resep ini kini memakai ManimGL** (Manim Community
dicabut, keputusan ARYA). Langkah dan gerbangnya sama, perkakasnya `manim/gl/`.
Baca dulu `docs/tugas/STANDAR-ILUSTRASI-VIDEO.md` dan `docs/tugas/ILMU-3B1B.md`.

```bash
# 0. Storyboard: benda nyata apa, kamera mulai dari mana, terbang ke mana,
#    warna apa untuk besaran apa (STANDAR-ILUSTRASI-VIDEO.md, 8 aturan)
# 1. Tulis naskah  ->  manim/narasi/<topik>.json  (6-10 segmen, ±90 detik; "latar": "air" kalau di air)
# 2. Buat suara + ukur durasinya
python manim/buat_narasi.py <topik>
# 3. Tulis adegan  ->  manim/scenes/<berkas>.py
#    Tiru manim/contoh/contoh_perahu.py: class X(AdeganMatra), from gl import *,
#    gl.ilustrasi untuk benda, gl.kamera untuk gerakan, sinema.babak untuk waktu,
#    teks() untuk kata, rumus() untuk angka/rumus, qc.periksa_adegan tiap babak.
# 4. Periksa SEBELUM render  (detik, bukan menit)
python manim/cek_kode.py manim/scenes/<berkas>.py --dalam
# 5. Render UJI 480p  (paralel antar sesi BOLEH; adegan berat ±5 fps)
manimgl manim/scenes/<berkas>.py <NamaAdegan> -w -l
# 6. Gerbang mutu: LIHAT lembar kontaknya, nilai tiap frame
python manim/cek_video.py media/gl/<NamaAdegan>.mp4 --per-detik 0.25
# 6b. Gabung narasi versi uji (+ suara latar dari naskah) -> media/uji-480p/<topik>.mp4, kirim ke ARYA
python manim/gabung_audio.py <topik> <NamaAdegan> --uji
# 7. Baru render final 1080p60 setelah ARYA setuju (gelombang 3)
manimgl manim/scenes/<berkas>.py <NamaAdegan> -w --hd --fps 60
# 8. Gabung narasi -> WebM, otomatis tersalin ke web/public/anim/
python manim/gabung_audio.py <topik> <NamaAdegan> --keluar <topik>.webm
# 9. Poster + daftarkan ke tahap.ts
ffmpeg -y -ss 62 -i web/public/anim/<topik>.webm -frames:v 1 -q:v 3 web/public/anim/<topik>.jpg
#    lalu di tahap.ts:  video: { berkas: '<topik>.webm', poster: '<topik>.jpg' },
# 10. Gerbang mutu SEKALI LAGI pada berkas final
python manim/cek_video.py media/<topik>.webm --per-detik 0.25
```

**Jangan lewati langkah 5-6.** Render uji 480p15 memakan 3 menit dan menangkap
cacat yang kalau lolos akan memaksa mengulang render final 15 menit. Pada video
tahap 8, langkah itu menangkap 4 cacat: angka bertumpuk, tanda derajat jatuh di
tengah baris, kurva memotong label sumbu, dan 40% layar bawah kosong.

### Referensi pola visual untuk enam video sisanya
Pola yang ditiru sudah dibedah jadi lembar kontak di `qc/referensi/`:

| Untuk tahap | Referensi (di folder Downloads ARYA) | Pola yang ditiru |
|---|---|---|
| 5, 6 | `6 Rasion Trigonometri.mp4` | Lingkaran satuan, `cos θ = x`, `sin θ = y`, lalu keenam rasio muncul sebagai ruas berwarna sambil daftar rumus tumbuh di kanan |
| 7 | `Unit Circle Journey (sudut istimewa).mp4` | Lingkaran berlabel derajat + radian, jari-jari menyapu berhenti di tiap sudut istimewa, juring terisi |
| 8 | `Visualizing Trigonometry_ Fungsi SIN.mp4` | Lingkaran **mengecil ke kiri**, sumbu grafik muncul di kanan, garis mendatar menghubungkan tinggi ke grafik |
| 9 | `Grafik SIN COS TAN.mp4` | Tiga panel bertumpuk digerakkan satu sudut |

Rujukan tambahan: github.com/adenosie/math-vids (Manim versi lama - **tiru pola visualnya,
jangan salin kodenya**).

### Setelah video Limit selesai
Empat topik lain (Grafik Fungsi, Vektor, Ruang 3D, Statistika) masih kosong.
Halaman topiknya sudah ada dan menampilkan "belum dibangun" secara jujur.

**Menambah topik ketiga sekarang jauh lebih murah.** Yang perlu dibuat cuma:
isi di `content/<topik>/`, satu komponen panggung untuk widgetnya, satu baris
di `content/daftar-isi.ts`, dan `siap: true` di `content/topik.ts`. Rangka
halaman, halaman latihan, dan daftar latihan sudah bebas topik.

---

## 🚨 ATURAN WAJIB (jangan dilanggar)

### Gerbang video
**Urutan gerbangnya ADA TIGA, dan ketiganya wajib:**
`cek_kode.py` (sebelum render) → render uji `-ql` + lembar kontak → render final `-qh` + lembar kontak lagi.

**"Rendered" di log BUKAN bukti video itu benar.** Pada 31 Agu sebuah video dirilis
dengan **7 cacat** karena hanya dicek lognya - ARYA yang menemukannya. Sejak itu:
1. Adegan wajib memanggil `qc.periksa_adegan()` di tiap tahap → render **GAGAL** kalau
   ada yang bertindih atau keluar bingkai
2. Jalankan `python manim/cek_video.py <video> --detik <momen>` lalu **BUKA lembar
   kontaknya dan nilai tiap frame satu per satu**
3. Baru boleh bilang selesai. Ada cacat tersisa → **sebutkan**, jangan diamkan

### Bentuk penjelasan
- **Jangan tembok paragraf.** Pecah jadi blok berselang-seling: paragraf pendek,
  daftar poin berlabel tebal, kalimat sorot, kotak contoh berhitung.
- **Tapi jangan dipangkas isinya.** Ada siswa yang belajar dengan membaca.
- Kata **"Miskonsepsi" JANGAN muncul** - itu istilah guru. Pakai **"Sering keliru"**,
  dan taruh **di bawah** setelah siswa paham, bukan menyambut di halaman depan.

### Widget
- Tidak boleh memotong gambarnya sendiri. Bingkai wajib menyesuaikan otomatis dan
  memberi tahu penggunanya lewat penunjuk skala.
- Sebisanya bisa **ditarik/diklik langsung**, bukan cuma lewat slider.

### Soal
Kalibrasi dulu ke sumber nyata **sebelum** menulis. Soal buatan Claude cenderung
terlalu mudah - itu temuan ARYA, bukan dugaan.

### Warna matematika - satu sumber kebenaran
`manim/matra_theme.py` = `web/lib/warna.ts`:
samping `#3A6EA5` · depan `#C25E4D` · miring `#1F2430` · sudut `#6A4C93`
**Jangan** pakai aksen situs (hijau `#2F5D50`, oker `#B8863B`, bata `#A6503F`) untuk
bagian matematika - pernah terjadi dan merusak kaitan video↔widget.

---

## 🧰 Peta berkas

### Alat mutu (Python)
| Berkas | Fungsi |
|---|---|
| `manim/qc.py` | Gerbang tata letak di dalam adegan. Sudah menangkap 3 cacat nyata |
| `manim/cek_video.py` | Lembar kontak ffmpeg - wajib dijalankan **dan dilihat** |
| `manim/buat_narasi.py` | Bikin suara per kalimat **dan ukur durasinya** → `durasi.json` |
| `manim/gabung_audio.py` | Gabung narasi ke video; **berhenti** kalau selisih > 1,5 detik |
| `manim/matra_theme.py` | Warna & tema animasi |
| `manim/sinema.py` | ⭐ **BARU** Gerakan & tata teks bersama. `babak()` menghitung waktu tiap segmen otomatis dan MENGGAGALKAN render kalau animasi melewati narasinya. `AngkaKoma`, `judul_pembuka`, `keterangan`, `sorot_bagian` |
| `manim/cek_kode.py` | ⭐ **BARU** Periksa adegan SEBELUM render. Menangkap LaTeX rusak, `MathTex` lupa awalan `r`, kelas adegan tanpa `qc.periksa_adegan`, warna hex ditulis langsung. `--dalam` membangun tiap potongan LaTeX sungguhan |
| `manim/lingkungan.py` | ⭐ **BARU** Menambal PATH MiKTeX. **WAJIB di-import paling atas di tiap adegan** |
| `manim/narasi/trigonometri.json` | Naskah narasi, satu sumber kebenaran |
| `alat/cek_soal.py` | ⭐ **BARU sesi 5** Periksa jawaban limit dengan sympy. Bandingkan selisih yang disederhanakan, bukan teks, jadi `0.25` diakui sama dengan `1/4`. Dukung `oo`, limit sepihak, dan jawaban "tidak ada". Kode keluar bukan nol kalau ada yang salah |

### Situs (Next.js 16, di `web/`)
| Berkas | Isi |
|---|---|
| `content/tipe.ts` | ⭐ **BARU** Tipe isi yang dipakai SEMUA topik |
| `content/daftar-isi.ts` | ⭐ **BARU** Daftar pusat topik. Menambah topik = satu baris di sini |
| `content/trigonometri/tahap.ts` | ⭐ **10 tahap: teks, poin, contoh, sering-keliru** |
| `content/limit/{tahap,latihan,kuis}.ts` | ⭐ **BARU** Isi topik Limit |
| `content/trigonometri/latihan.ts` | Naskah narasi, 4 latihan, 8 kuis, 4 kanal YouTube |
| `content/topik.ts` | Daftar 6 topik + label kelas jujur |
| `components/topik/HalamanTopik.tsx` | ⭐ Rangka halaman topik, BEBAS TOPIK |
| `components/topik/PanggungTrigonometri.tsx` | Penyetelan 10 widget trigonometri |
| `components/topik/PanggungLimit.tsx` | Penyetelan 9 widget limit |
| `components/topik/jenis.ts` | Perjanjian antara rangka dan panggung |
| `components/topik/Penjelasan.tsx` | Perender blok penjelasan |
| `components/topik/Latihan.tsx`, `Kuis.tsx` | Latihan & kuis |
| `components/widget/*.tsx` | 10 widget Trigonometri |
| `components/widget/limit/*.tsx` | ⭐ **BARU** 9 widget Limit + galeri + bingkai bersama |
| `components/widget/limit/koordinat.ts` | ⭐ Penskalaan, garis petak, penunjuk skala, jalur SVG yang DIPUTUS di asimtot |
| `lib/warna.ts` | ⭐ Warna matematika |
| `lib/simpanan.ts` | localStorage lewat `useSyncExternalStore` |
| `app/globals.css` | Sistem desain "Studio Teknis" + semua tata letak |

---

## 📌 Keputusan (jangan diulang perdebatannya)

| Keputusan | Alasan |
|---|---|
| **Hybrid**: Manim video + widget JS | Manim tidak interaktif di browser |
| **LaTeX**, bukan Typst | Uji banding 31 Agu: spasi & konvensi lebih sesuai buku |
| **Tanpa database** | Skor kuis di localStorage. Hemat 3-4 hari |
| **Widget 2D buatan sendiri** | Mafs tak dirawat 17 bulan |
| **Suara: `edge-tts` `id-ID-ArdiNeural`** | Indonesia asli, gratis, tanpa batas. **ElevenLabs gratis mengunci SEMUA suara Indonesia di balik langganan berbayar** - terverifikasi dari pesan API-nya. Menambah akun gratis TIDAK menolong: yang membatasi tingkat langganan, bukan sisa kredit |
| **Durasi animasi mengikuti durasi suara** | Bukan ditebak. Lihat `durasi.json` |
| **Ekspor 1080p60** (`manim -qh`) | Permintaan ARYA 31 Agu. Biayanya ±15 menit render per video dan berkas ±6 MB (720p30 = ±3 MB). Perkiraan awal Claude "60-80 menit" ternyata SALAH - jauh lebih cepat |
| **Foto Tahap 10 dari Wikimedia Commons** | ARYA minta foto internet HD. Yang terpilih kebetulan semuanya berlisensi terbuka (CC0/CC BY/Public domain) - jadi aman sekaligus. Catatan sumber di `web/public/gambar/sumber.json` |
| **Tahap bervideo: tombol Tonton / Coba sendiri** | Menampilkan video DAN widget sekaligus memaksa panggung digulir. Tata letak satu layar sudah dikunci, jadi siswa memilih salah satu |
| Semua berkas di **drive D** | C: tinggal ~16 GB dari 376 GB |
| Tata letak **satu layar** | Kiri visual, kanan penjelasan. Tanpa gulir atas-bawah |

### Gaya terkunci - "Studio Teknis"
Krem `#F6F2EC` · kartu `#FFFDFA` · tinta `#211E1A` · garis `#E1D9CC`
Judul **Fraunces** · teks **Inter** · angka & label teknis **IBM Plex Mono**
Patokan visual: `mockup/e-satu-layar.html`

### Pelajaran Next 16 (beda dari ingatan Claude - sudah diverifikasi)
- `params` pada route dinamis adalah **`Promise`** → wajib `await params`
- **Tailwind 4**: `@import "tailwindcss"` + `@theme inline`, **tanpa** `tailwind.config.js`
- **`next lint` sudah dihapus** → pakai `npx eslint .`
- React 19 melarang `setState` di dalam `useEffect` dan komponen yang dibuat di dalam render.
  **Penggantinya sudah terbukti di proyek ini:** kalau nilainya berasal dari
  `localStorage`, baca lewat `useSyncExternalStore(langgan, ...)` dari
  `lib/simpanan.ts`. Karena `tulis()` sudah memberi tahu pendengarnya, nilai itu
  segar sendiri tanpa disalin ke state - sekaligus lolos dari ketidakcocokan
  hidrasi. Contoh: `components/PemutarVideo.tsx` dan kunci kuis di
  `components/topik/Trigonometri.tsx`.
- React 19 juga melarang **mengubah variabel biasa setelah render selesai**.
  Penghitung yang dinaikkan di dalam `.map()` melanggar ini; hitung dulu ke
  `Map`, baru dipakai (lihat `components/topik/Penjelasan.tsx`).
- Dokumen resmi ada **offline** di `web/node_modules/next/dist/docs/` - baca dari situ

---

## 📚 Bahan referensi (di luar folder proyek)
| Berkas | Untuk | Bisa dibaca |
|---|---|---|
| `D:\BAHAN MATEMATIKA\Buku Matematika Kelas 10 & 11 - Guru.pdf` | ⭐ Kurikulum Merdeka, kotak "Miskonsepsi !?" | teks digital |
| `D:\BAHAN MATEMATIKA\LIMIT.pdf` (320 hal) | topik Limit | teks digital |
| `D:\BAHAN MATEMATIKA\3 Dimensi.pdf` (352 hal) | topik Ruang 3D | teks digital |
| `D:\BAHAN MATEMATIKA\Matematika_BS_KLS_XII_Rev.pdf` | Buku Siswa Kelas XII | teks digital |
| `D:\SEKOLAH S1 & S2\S1\matematika\kalkulus 1.pdf`, `kalkulus 2.pdf` | Diktat ITB - istilah Indonesia yang benar | teks digital |
| `…\Calculus (9rd Edition) - Solution.pdf` | Pola & tingkat kesulitan soal | teks digital |
| `…\sb-big-book-matematika-sma-…pdf` | Level & bahasa SMA | **scan** |
| https://mathcyber1997.com | Soal | **diblokir pemeriksa bot** - jangan diterobos; minta ARYA menempelkan sendiri |

---

## ⚠️ Risiko & catatan terbuka
1. **Kunci kuis BUKAN pengamanan.** Catatannya ada di peramban siswa sendiri dan
   bisa dihapus siapa pun yang mau. Gunanya mendorong kebiasaan membaca sebelum
   menguji diri, bukan mencegah kecurangan. **Skor kuis di situs ini tidak sah
   sebagai nilai.** Kalau dosen menanyakannya, jawab apa adanya.
2. **Tombol pasang aplikasi belum bisa diuji.** `beforeinstallprompt` hanya
   menyala di situs yang sudah tayang lewat HTTPS. Di `localhost` tombolnya
   memang tidak muncul, dan itu perilaku yang benar, bukan kerusakan.
   Baru bisa dibuktikan setelah situs di-deploy.
3. `web/public/gambar/game.jpg` **939 KB**, keempat foto Materi 10 totalnya
   ±1,5 MB. Berat untuk siswa berkuota terbatas. Belum dikompres karena ARYA
   belum memintanya - tawarkan sebelum deploy.
4. Render Manim 113 detik makan ±8 menit → selalu jalankan di latar belakang,
   dan **jangan pernah dua render sekaligus** (lihat Jebakan lingkungan).
5. Cache npm lama **11 GB** masih di C: (ARYA memilih tidak dihapus).
6. Waktu review ARYA jadi leher botol, materi matematika wajib diperiksa dia.
7. **Tujuh video Limit belum ada.** Kalau semuanya dibuat, ukuran
   `web/public/anim/` bertambah kira-kira 30 MB lagi, jadi total sekitar 60 MB.
   Bicarakan pengompresan sebelum deploy.
8. **Materi Limit belum diperiksa ARYA.** Angkanya sudah diperiksa mesin, tapi
   ketepatan bahasa dan tingkat kesulitannya untuk siswa SMA tetap perlu mata
   ARYA. Yang paling perlu dicek: Materi 08 (bukti sin x dibagi x) dan
   delapan soal tingkat "sangat sulit" di bank kuis, apakah terlalu berat.

## ⏳ Masih menunggu keputusan ARYA
1. **Slogan halaman depan** (5 usulan diberikan pada sesi 4, belum dipilih).
2. **Galeri Materi 10 Limit**: sekarang gambar buatan sendiri. Kalau ARYA lebih
   suka foto seperti Materi 10 Trigonometri, tinggal bilang.
3. **Kompresi gambar dan video sebelum deploy** (`game.jpg` 939 KB, foto Materi
   10 Trigonometri ±1,5 MB, video ±30 MB).

## 🎓 Pelajaran dari dua repo rujukan (dibedah 31 Agu, sesi 2)

ARYA menemukan dua repo. **Kodenya tidak bisa disalin** - AnimationsWithManim
berbasis Manim Februari 2019 (`manimlib.imports`, `CONFIG = {}`, `TexMobject`,
`ShowCreation` semuanya sudah dihapus dari Manim CE 0.21). Yang diambil polanya.

| Sumber | Yang diambil dan sudah diterapkan |
|---|---|
| Elteoremadebeethoven/AnimationsWithManim | Storyboard sebagai komentar bernomor di kepala berkas, ditulis SEBELUM kode · `construct()` cuma memanggil sub-adegan bernama · "urutan updater itu penting" · `clear_updaters()` sebelum frame terakhir · `align_to(label, DOWN)` untuk angka berubah |
| HarleyCoops/Math-To-Manim (bagian `mythos/`) | Tata bahasa kamera: judul → tampilkan → zoom → **tarik mundur** · **maksimal dua blok teks yang harus dibaca** · keterangan yang menghapus dirinya sendiri · `MathTex` multi-bagian + `get_part_by_tex` alih-alih mengiris karakter · batasi lebar teks (mencegah, bukan mendeteksi) · pemeriksa statis sebelum render |

### 3Blue1Brown, Essence of Calculus bab 7 (dibedah 1 Sep 2026, sesi 5)

ARYA menunjuk `3b1b/videos/_2017/eoc/chapter7.py`. Hasil pembedahannya:

**LISENSINYA MENULAR, DAN INI YANG PALING PENTING.** Repo itu berlisensi
CC BY-NC-SA 4.0. Menyalin kode atau naskahnya memaksa MATRA ikut berlisensi
sama: non-komersial selamanya, dan turunannya wajib dibuka dengan lisensi yang
sama. Karena itu yang boleh diambil hanya GAGASANNYA, sebab ide tidak berhak
cipta, lalu ditulis ulang dengan contoh, angka, dan kalimat sendiri.
JANGAN menyalin kodenya, dan JANGAN menerjemahkan naskahnya.

**Kodenya juga tidak bisa dipakai**: Manim 2017 dengan `manim_imports_ext`,
`CONFIG`, `OldTex`, dan `ShowCreation`. Persis jebakan yang sama dengan
AnimationsWithManim yang sudah dicatat di sesi 2.

**Sebagian besar isinya tidak cocok untuk SMA.** Bab itu bab KETUJUH dari
Essence of Calculus, jadi ia menganggap penontonnya sudah paham turunan. Dari
22 adegannya: 8 soal notasi dx, 5 soal epsilon-delta formal, 4 soal aturan
L Hopital, 3 soal tokoh pi-creature dan kredit. Memaksakan semuanya masuk akan
merusak materi, bukan memperbaikinya.

**Tiga gagasan yang diambil, dan sudah masuk ke materi:**

| Ke materi | Gagasan | Kenapa berharga |
|---|---|---|
| Materi 02 | Permainan tantangan, yaitu epsilon-delta tanpa lambangnya | Kalimat "f x mendekati L" tadinya berhenti sebagai kalimat longgar tanpa cara mengujinya |
| Materi 01 | h itu angka biasa yang dikecilkan, bukan bilangan gaib | Membayangkannya mistis membuat limit terasa lebih sulit daripada sebenarnya |
| Materi 08 | Peringatan lingkaran setan aturan L Hopital | Paling berharga. Banyak siswa bimbel memakai L Hopital untuk membuktikan sin x dibagi x menuju 1, padahal rumus turunan sin x justru DIPEROLEH dari limit itu |

**Kalau mau menggali 3b1b lagi**, yang paling mungkin berguna untuk MATRA
adalah bab turunan dan integral untuk topik lain nanti, BUKAN bab limit ini.
Bab limitnya sudah habis diperas.

**Jangan menghabiskan waktu di Math-To-Manim lagi**: 788 berkas tapi hanya ~4 yang
berguna; 577 di antaranya ada di `legacy/` dan `archive/`, sisanya kerangka agen AI
yang menyuruh model lain menulis Manim - bukan yang proyek ini butuhkan.

---

## 🔧 Jebakan lingkungan yang sudah diselesaikan

**JANGAN menjalankan dua render Manim bersamaan.** Pada 31 Agu render final
tahap 8 dijalankan berbarengan dengan render uji tahap 5; yang final terputus
diam-diam di animasi 34 dari 46, meninggalkan berkas video LAMA di tempatnya.
Log tidak menunjukkan galat apa pun. Yang menangkapnya adalah `gabung_audio.py`,
lewat selisih durasi 5,1 detik. Render satu per satu.

**PowerShell `Set-Content -Encoding utf8` menyisipkan BOM** di awal berkas, dan
Python menolaknya dengan `invalid non-printable character U+FEFF`. Untuk menyunting
berkas Python, pakai Python atau alat sunting biasa - bukan PowerShell.

**Heredoc bash + string Python biasa bisa memproses escape dua kali.** Menulis
`"\theta"` di dalam heredoc pernah sampai ke Python sebagai TAB + "heta",
sehingga pencarian teks gagal tanpa penjelasan. Untuk menyunting kode yang
mengandung LaTeX, gunakan alat sunting berkas, bukan skrip pengganti teks.

JEBAKAN INI KENA LAGI pada 1 Sep 2026 sesi 5, dua kali dalam satu jam.
Yang pertama: teks tidak ada di tabel video Limit sampai ke Python sebagai
TAB + ext, dan di video terbaca exttidakada. Yang kedua: pemisah baris di
dalam Text() berubah jadi baris baru sungguhan sehingga berkasnya rusak
sintaks. Keduanya lolos dari mata dan baru ketahuan saat MELIHAT frame
videonya. Aturannya bukan saran: untuk kode ber-escape, pakai alat sunting
berkas. Kalau terpaksa lewat skrip, susun karakternya dengan chr(92).



**Pembungkus `rtk` BISA MELAPORKAN LULUS PADAHAL PERINTAHNYA TIDAK JALAN.**
Pada sesi 5 `npx tsc --noEmit` dilaporkan "TypeScript: No errors found", padahal
keluaran aslinya "This is not the tsc command you are looking for" karena
`node_modules` belum ada. Hal yang sama terjadi pada `npm run build`: pesannya
`'next' is not recognized`, tetapi kode keluarnya 0 karena disalurkan ke `tail`.
**Untuk perintah PEMERIKSAAN, selalu pakai `rtk proxy "<perintah>"`** supaya
keluarannya mentah, dan baca isinya, jangan percaya kode keluarnya saja.

**Worktree git TIDAK punya `node_modules`.** Berkas itu di-gitignore, jadi
worktree baru harus dijalankan `npm install` sendiri di dalam `web/` (±2 menit,
361 paket). Gejalanya menyesatkan karena `npx` diam-diam mengunduh paket lain
yang namanya mirip.

**Jangan pakai `cp` untuk menimpa berkas di skrip.** Ia bertanya "overwrite?",
tidak mendapat jawaban karena tidak ada masukan, lalu keluar dengan kode 0
TANPA menyalin apa pun. Pakai Python `shutil.copyfile` atau alat sunting berkas.

**Nama berkas di Windows tidak membedakan huruf besar-kecil.** `bidang.ts` dan
`Bidang.tsx` dianggap berkas yang sama dan TypeScript menolak keduanya. Yang
bawah sudah diganti nama jadi `koordinat.ts`.

**MiKTeX terpasang tapi TIDAK terdaftar di PATH Windows.** Gejalanya menyesatkan:

    FileNotFoundError: [WinError 2] The system cannot find the file specified

Pesan itu tidak menyebut LaTeX sama sekali, jadi mudah disangka salah kode. Yang
"tidak ditemukan" sebenarnya `latex.exe`. Sudah ditambal oleh `manim/lingkungan.py`
- **tiap adegan wajib meng-import `lingkungan` sebelum `from manim import *`.**
Tambalannya hanya untuk proses yang berjalan; setelan Windows ARYA tidak disentuh.

---

## 🗒️ Catatan untuk Claude sesi berikutnya
- ARYA **bukan programmer**. Jelaskan dampak dulu, mekanisme belakangan.
- ARYA **minta dikritik**, bukan diiyakan. Kalau ada pendekatan lebih baik, katakan.
- **Jangan mengaku selesai tanpa menjalankan dan MELIHAT hasilnya.**
- **Perkiraan waktu Claude bisa meleset jauh.** Sesi 2: render 1080p60 diperkirakan
  "60-80 menit", nyatanya ±15 menit. Ukur sekali, jangan menakut-nakuti dengan tebakan.
- **Telusuri dulu sebelum menyimpulkan sesuatu tidak ada / tidak bisa.**
  Sudah dua kali Claude salah menyimpulkan dan ARYA yang mengoreksi
  (skill `/teach` yang ternyata ada, dan suara Indonesia di ElevenLabs yang ternyata ada
  tapi terkunci berbayar).
- **Periksa keadaan git, jangan mengandalkan ingatan.** Di akhir sesi 6 Claude
  menyatakan kerjaannya sudah masuk `master`, padahal belum. Perintahnya cuma
  `git worktree list` dan `git log --oneline -1 master`, dua detik. Lihat bagian
  "Folder kembar" di atas.
- **Kalau kalimat di layar terasa panjang, hitung hurufnya.** `batasi_lebar`
  tidak memotong baris, ia mengecilkan seluruh objek. Satu baris 78 huruf
  menyusut jadi sekitar 40 persen dan hilang terbaca, tapi render tetap lolos
  tanpa peringatan apa pun. Pecah sendiri dengan `\n`, sekitar 26 huruf per baris.
