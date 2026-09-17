# Prompt untuk Claude Design: sistem gerak MANTRA, dari menu sampai jendela

Disusun 17 Sep 2026 oleh sesi MASTER atas permintaan ARYA. Pendamping
`PROMPT-CLAUDE-DESIGN.md` (4 Sep 2026): prompt itu soal RUPA seluruh
situs, prompt ini KHUSUS soal GERAK (animasi buka menu, pindah menu,
pindah halaman, buka laci, jendela muncul, umpan balik jawaban, keadaan
memuat, dan semua yang sejenis). Salin seluruh isi di bawah garis ke
Claude Design, bersama folder codebase `D:\MANIM-MATRA`. Kalau folder
utuh terlalu besar, lampirkan minimal `web/app/globals.css`,
`docs/desain-mantra/HANDOFF.md`, dan folder `web/components/`.

Referensi visual opsional (hasil bedah situs nyata, di
`C:\Users\ASUS\.claude\design-md\`): `linear.app/DESIGN.md` (gerak yang
presisi dan cepat) atau `apple/DESIGN.md` (gerak yang menahan diri).
Lampirkan maksimal SATU, atau biarkan Claude Design memilih.

Keputusan ARYA yang sudah dikunci saat prompt ini disusun (17 Sep 2026):

- keluaran = prototipe yang bisa diklik + tabel spesifikasi + CSS siap
  tempel;
- karakter = terlihat dan sinematik untuk perpindahan ruang (pindah
  halaman, laci, jendela), tetapi umpan balik (tekan, pilih, cek jawaban)
  tetap cepat. Alasannya ada di bagian "Aturan sistem gerak".

---

Kamu adalah perancang gerak (motion designer) senior kelas dunia yang
juga menguasai CSS modern sampai ke detail. Saya menyewamu untuk satu
pekerjaan: merancang **sistem gerak** situs belajar matematika saya,
**MANTRA**, sehingga setiap kali siswa membuka menu, berpindah menu,
berpindah halaman, membuka laci, memunculkan jendela, memilih jawaban,
atau menunggu sesuatu dimuat, situs ini terasa hidup, mahal, dan
disengaja. Bukan satu dua efek, melainkan SATU bahasa gerak yang dipakai
konsisten di seluruh situs, dari beranda sampai halaman 404.

Arah rasa dalam satu kalimat: **sinematik, tetapi tidak pernah membuat
siswa menunggu.** Perpindahan ruang (pindah halaman, buka laci, jendela
muncul) boleh terlihat dan terasa seperti film: elemen masuk dengan arah
yang bermakna, bertahap, mulus. Umpan balik (menekan tombol, memilih
jawaban, mengecek benar atau salah) harus cepat, karena siswa mengerjakan
15 soal berturut-turut dan tidak boleh merasa situsnya lambat. Kalau ragu
di antara "indah" dan "cepat", pilih cepat, lalu buat yang cepat itu
indah.

Folder codebase saya lampirkan. Baca dulu kondisi nyata sebelum bicara.

## Cara kita bekerja (baca dulu, ini bukan basa-basi)

1. **Jangan langsung menggambar.** Mulai dengan bertanya. Maksimal 3
   pertanyaan per giliran, dan hanya yang benar-benar mengubah arah. Hal
   yang bisa kamu putuskan sebagai profesional, putuskan sendiri.
2. **Jangan menuruti saya begitu saja.** Saya bukan perancang. Kalau
   keputusan saya buruk (termasuk keputusan "sinematik" di atas untuk
   titik tertentu), katakan buruk, tunjukkan alternatifnya, beri alasan.
   Kalau setelah itu saya tetap memilih ide saya, jalankan. Keputusan
   akhir di saya, tetapi saya ingin ditantang dulu.
3. **Tawarkan 2 sampai 3 bahasa gerak** sebelum membangun apa pun. Tiap
   bahasa: satu prototipe pendek yang bisa diklik dan berisi empat momen
   yang sama (pindah halaman, buka laci daftar materi di HP, jendela skor
   muncul, pilih jawaban lalu Periksa), satu paragraf "kenapa cocok untuk
   MANTRA", satu paragraf "risikonya". Saya pilih SATU. Setelah itu jangan
   ganti bahasa di tengah jalan dan jangan mencampur.
4. **Kerjakan per kelompok** (daftar kelompoknya di bagian Inventaris).
   Tunjukkan, tunggu tanggapan saya, baru lanjut. Jangan menyerahkan
   semua sekaligus di akhir.
5. **Bahasa awam.** Saya paham "ini bikin siswa menunggu", saya tidak
   paham "kurva easing-nya terlalu agresif". Dampak dulu, istilah
   belakangan.
6. Kalau dua pilihan punya konsekuensi berbeda (indah tapi HP murah
   patah-patah; halus tapi butuh JavaScript tambahan), sebutkan
   konsekuensinya sebelum saya memilih.
7. **Jangan pernah bilang "selesai" tanpa melihat hasilnya sendiri.**
   Tiap prototipe dilihat di lebar desktop dan lebar HP (390 px), dengan
   `prefers-reduced-motion` mati DAN hidup, dan dengan CPU dilambatkan
   4 kali (pengaturan throttle di alat pengembang peramban) untuk meniru
   HP Android kelas menengah. Biasanya butuh 2 sampai 3 putaran, bukan
   sekali jadi. Perbaiki yang jelek sebelum saya melihatnya.

## Tentang MANTRA

- Situs belajar matematika SMA berbahasa Indonesia. Tiap materi punya
  **video animasi** (menjelaskan *kenapa*) dan **widget interaktif**
  (siswa mencoba sendiri), lalu latihan dan kuis, plus bank soal per
  topik dengan tingkat kesulitan.
- Sembilan topik: Trigonometri, Limit, Grafik Fungsi, Vektor, Ruang 3D,
  Statistika, Transformasi Geometri, Turunan, Integral.
- Pengguna: siswa SMA (HP, layar kecil, jaringan pas-pasan, sering HP
  Android kelas menengah) dan dosen penguji saya (laptop, menilai kesan
  profesional). Dua-duanya harus terkesan, dan siswa tidak boleh
  dikorbankan demi dosen.
- Versi hidup: https://matra-eight.vercel.app. Buka di desktop dan HP
  sebelum bertanya.
- Tanpa login, tanpa database. Kemajuan belajar tersimpan di peramban.
- Warna: emas `#B08A3E`, navy `#101A2B`, kertas `#FAF9F5`; benar hijau
  `#6E9C7A`, salah jingga `#E8582C`. Huruf Newsreader (serif) dan Space
  Grotesk (sans). Rupa situs sudah diputuskan dan TIDAK dibahas di
  pekerjaan ini; kamu hanya merancang geraknya.

Halaman yang ada, semuanya kena:

1. **Beranda** (`web/app/page.tsx`): nav, hero dengan kurva yang
   tergambar, korsel demo 5 slide (`web/components/Demo.tsx`), tiga kartu
   fitur, kaki halaman.
2. **Peta Materi** (`web/components/mantra/PetaMateri.tsx`): kartu bab
   per topik (`kisi-bab`, `bab-nyala`), cincin kemajuan (`cincin .maju`),
   tombol utama yang berganti teks ("Mulai", "Lanjutkan Materi 03",
   "Ulangi belajar").
3. **Halaman belajar** (`web/components/topik/HalamanTopik.tsx`, alamat
   `/topik/<slug>`): satu layar penuh tanpa gulir halaman. Kiri pohon
   materi (`pohon`), tengah bacaan dan video (`panggung`), kanan widget.
   Di HP pohon jadi laci geser (`tirai-laci`) dan widget muncul setelah
   tombol "Coba sendiri". Ada mode fokus (nav dan pohon disembunyikan,
   Esc keluar), bilah Kembali/Lanjut (`pindah-materi`), dan kuis di akhir
   bab yang terkunci sampai semua materi dibuka.
4. **Latihan** (`/latihan`, `web/components/latihan/DaftarLatihan.tsx`):
   daftar topik dengan jumlah lencana.
5. **Bank soal per topik** (`/latihan/<topik>`,
   `web/components/latihan/ArenaLatihan.tsx`): ringkasan (kemajuan,
   lencana, pilih tingkat), lalu halaman soal (`?tingkat=`) dengan peta
   soal bernomor (`peta-soal`), pilihan ganda (`opsi-mantra`), Periksa,
   pembahasan (`kartu-bahas`), Sebelumnya/Berikutnya, dan TIGA jendela
   (`tirai-jendela`): skor sesudah 15 soal, perayaan lencana, konfirmasi
   keluar.
6. **Tentang** (`/tentang`).
7. Halaman 404 (`web/app/not-found.tsx`), kerangka memuat
   (`web/components/mantra/SedangMemuat.tsx`), galat video, tombol pasang
   PWA (`web/components/TombolPasang.tsx`), dialog mode guru
   (`web/components/TombolGuru.tsx`, elemen `<dialog>` bawaan).

## Yang sudah ada dan WAJIB kamu pakai sebagai titik awal

Situs ini sudah punya bahasa gerak dasar. Tugasmu menyempurnakan dan
melengkapinya, bukan menggantinya dengan sistem lain.

- `web/app/globals.css` baris 96 sampai 101: token gerak
  `--kurva: cubic-bezier(0.2, 0.7, 0.2, 1)`, `--d-cepat: 160ms`,
  `--d-sedang: 320ms`, `--d-lambat: 600ms`, `--d-sinema: 3400ms`, dan
  blok `prefers-reduced-motion` yang menolkan semuanya (ada blok kedua di
  baris 1795 yang memaksa semua animasi dan transisi ke 0,01 ms). Jangan
  ganti nama token ini. Kalau butuh token baru, ikuti polanya: `--d-…`
  untuk durasi, `--kurva-…` untuk kurva, nama dalam bahasa Indonesia.
- Animasi masuk halaman sudah ada: `main { animation: tab-masuk 0.32s }`
  (naik 16 px sambil memudar masuk). Belum ada animasi keluar dan belum
  ada arah.
- Keyframes yang sudah ada: `putar`, `demo-masuk`, `lencana-pudar`,
  `naik`, `gambar` (kurva hero), `denyut`, `muncul`, `napas` (kerangka
  memuat), `letup` (centang materi saat pertama kali dibuka),
  `tab-masuk`.
- `docs/desain-mantra/HANDOFF.md` bagian "Interactions & Behavior":
  tabel gerak dari rancangan awal (pindah tab 420 ms, pindah materi
  380 ms, hero bertahap, kurva 3,4 detik, kartu naik 5 sampai 6 px,
  bayangan mengikuti kursor, penghitung angka 900 ms, lipat pohon 340 ms,
  korsel 500 ms). Sebagian sudah dipasang, sebagian dibuang: kilau yang
  menyapu berulang di tombol dibuang karena "gerak berulang tanpa alasan"
  melanggar aturan kami. Pengali kecepatan global (Diam / Lembut /
  Sedang / Kencang) tidak pernah dipasang; boleh kamu usulkan lagi kalau
  menurutmu berguna, tetapi itu bukan keharusan.
- Komponen gerak yang ada di `web/components/mantra/`: `MunculSaatGulir`
  (muncul saat digulir), `LogoParalaks`, `KartuBayang` (bayangan
  mengikuti kursor), `PitaKurva` (kurva hero tergambar), `SedangMemuat`
  (kerangka halaman materi).
- Kendali widget bersama di `web/components/kendali/` (`Angka`,
  `Koordinat`, `Pilihan`, `Petunjuk`): pegangan yang bisa diseret
  memberi kelas `nyala` saat sedang dipegang.
- Pemutar video (`web/components/PemutarVideo.tsx`) memakai kontrol
  bawaan peramban (atribut `controls` dicabut saat diputar, dipasang
  lagi saat jeda). Jangan merancang kontrol pemutar sendiri. Yang boleh
  dirancang: peralihan poster ke putar, lencana geser "+10 detik" /
  "-10 detik" (`lencana-geser`, tampil 700 ms), saklar subtitle,
  kemajuan simpan video di perangkat, dan keadaan galat (`video-galat`).

## Inventaris titik gerak (semua wajib dirancang, tidak ada yang dilewati)

Untuk tiap titik di bawah, saya ingin tahu: pemicunya apa, apa yang
bergerak, dari mana ke mana, berapa lama, kurva apa, ada jeda atau
tahapan atau tidak, bagaimana versinya saat reduced-motion, dan catatan
khusus HP. Kalau menurutmu suatu titik sebaiknya TIDAK bergerak, tulis
itu sebagai keputusan beserta alasannya: "tidak bergerak" adalah jawaban
yang sah, "terlewat" bukan.

### A. Pindah halaman (rute)

Hari ini: hanya animasi masuk `tab-masuk` (naik 16 px sambil memudar),
tidak ada keluar, tidak ada arah, dan nav ikut dibuat ulang. Yang saya
inginkan:

- Nav tetap diam sebagai jangkar; hanya isi di bawahnya yang berpindah.
- Arah punya arti: masuk lebih dalam (Peta Materi ke halaman belajar,
  Latihan ke bank soal ke halaman soal) datang dari kanan atau dari
  bawah; kembali datang dari arah sebaliknya; pindah antar tab sejajar
  (Beranda, Peta Materi, Latihan, Tentang) mengikuti urutan tab: menuju
  tab di sebelah kanan berarti isi datang dari kanan.
- Keluar lebih cepat daripada masuk, dan halaman baru sudah bisa dibaca
  sebelum geraknya selesai.
- Elemen bersama (judul bab di Peta Materi yang menjadi judul halaman
  belajar; kartu topik di Latihan yang menjadi kepala bank soal) boleh
  "berpindah tempat" lewat View Transitions API kalau peramban
  mendukung; di peramban lain cukup memudar. Rancang keduanya.
- Animasi TIDAK menunggu data dan data TIDAK menunggu animasi: kalau
  halaman belajar belum siap, kerangka `SedangMemuat` yang masuk dengan
  gerak yang sama, lalu isi asli menggantikannya tanpa lompatan.
- Seluruh perpindahan selesai dalam 700 ms atau kurang, termasuk keluar.
- Rute yang harus dicontohkan: Beranda ke Peta Materi ke halaman belajar
  ke topik lain lewat pohon; Latihan ke bank soal ke `?tingkat=` lalu
  kembali ke ringkasan; tombol Kembali peramban.

### B. Nav dan menu HP (`web/components/Nav.tsx`)

- Tombol dua garis berubah menjadi silang (`nav-tombol[data-buka]`) dan
  menu (`nav-menu[data-buka]`) turun dari bawah nav di layar di bawah
  860 px. Menu menutup sendiri saat alamat berubah dan saat Esc.
- Garis bawah tab aktif (`nav-tab-garis`): saya ingin garis itu
  BERPINDAH dari tab lama ke tab baru, bukan hilang lalu muncul.
- Label materi terakhir (`nav-meta`) berganti teks saat siswa membuka
  materi lain.
- Nav berganti wajah saat masuk halaman belajar (`data-belajar`): muncul
  pil "Mode fokus", pil "Materi 03" di HP, dan tombol mode guru
  disembunyikan. Pergantian wajah ini perlu dirancang; sekarang berganti
  mendadak.
- Saat mode fokus dinyalakan, nav menghilang seketika (komponennya
  mengembalikan `null`). Rancang keluarnya dan masuknya kembali, dan
  katakan kalau itu butuh perubahan cara komponennya ditulis.

### C. Laci dan panel

- `LaciLanjut` (`web/components/LaciLanjut.tsx`): laci di samping tab
  Peta Materi yang memperlihatkan kemajuan tiap bab. Buka, tutup, dan
  batang kemajuan yang terisi saat laci terbuka (jangan sudah penuh
  sebelum terlihat).
- Laci daftar materi HP (`tirai-laci` dan `pohon` di
  `HalamanTopik.tsx`): geser dari kiri, lebar 294 px, di atas tirai
  `rgba(16,26,43,.34)`. Dibuka lewat pil "Materi 03" atau `buka-laci`,
  ditutup lewat `laci-tutup`, tirai, Esc, atau dengan memilih materi.
  Saat memilih materi dari laci, laci menutup DAN isi berganti; rancang
  urutannya supaya tidak terasa seperti dua kejadian terpisah.
- Lipat pohon materi desktop (`pohon-togel`): kolom 278 px menjadi rel
  62 px dan sebaliknya (HANDOFF menyebut 340 ms). Isi tengah melebar
  mengikuti. Sub-bab (`pohon-sub`) juga bisa dilipat.
- Mode fokus masuk dan keluar (`keluar-fokus`, tombol dan Esc): nav dan
  pohon pergi, panggung melebar. Ini momen yang pantas sinematik.
- "Coba sendiri" di HP: widget disisipkan di bawah kotak "Yuk
  bereksperimen" (`alat-sisip`). Widget yang muncul harus memesan
  tempatnya dulu, jangan mendorong bacaan turun mendadak.
- Kaki pohon (`pohon-kaki`: latihan dan kuis bab) dan kuis yang terbuka
  dari keadaan terkunci (`lencana-kunci`).

### D. Jendela dan dialog

- Tiga jendela bank soal di `ArenaLatihan.tsx`, semuanya `tirai-jendela`
  dengan `role="dialog"`: jendela skor (`skor-angka` benar dan salah,
  tombol "Baca-baca dulu" dan "Kerjakan ulang yang salah"), perayaan
  lencana (`lencana-raih`), konfirmasi keluar (`jendela-kecil`, muncul
  saat siswa menekan tautan lain sesudah menjawab).
- Dialog mode guru (`dialog-guru`, elemen `<dialog>` bawaan dengan
  `showModal()`): rancang buka dan tutupnya dengan `@starting-style` dan
  `transition-behavior: allow-discrete`, karena `<dialog>` tidak bisa
  dianimasikan dengan cara biasa.
- Aturan bentuk: di desktop jendela membesar sedikit dari tengah
  (misalnya skala 0,96 ke 1) sambil memudar masuk; di HP jendela naik
  dari bawah seperti lembar. Tirai memudar terpisah, sedikit lebih dulu
  daripada jendelanya.
- Jendela skor boleh punya satu momen: angka benar yang naik dari 0 ke
  nilainya. Perayaan lencana adalah SATU-SATUNYA tempat yang boleh
  sedikit meriah, dan meriah di sini berarti tepat, bukan konfeti.
- Tutup lewat Esc dan ketuk tirai, fokus keyboard dikunci di dalam
  jendela, dan saat tertutup fokus kembali ke tombol yang membukanya.
  Gerak tidak boleh menunda semua itu.
- Tombol pasang PWA (`TombolPasang`): muncul hanya kalau peramban
  memberi izin, jadi kemunculannya tidak boleh menggeser tata letak.

### E. Tab, lipatan, dan isi yang terbuka

- Keping tingkat di bank soal (`keping-tingkat`, alamat `?tingkat=`):
  pindah tingkat berarti isi soal berganti dan posisi tersimpan
  dipulihkan.
- Pembahasan (`kartu-bahas` dan `bahas-isi`, sekarang `naik 0.34s`):
  terbuka sesudah Periksa, atau sudah terbuka saat soal yang pernah benar
  dibuka kembali. Dua kasus itu geraknya beda: yang pertama "hadiah",
  yang kedua "memang sudah ada".
- Lipatan sesi di pohon (chevron berputar 90 derajat), "Sering keliru"
  (`miskon`), kotak ringkasan di akhir bacaan, "baca cepat"
  (`baca-cepat`), dan blok YouTube (`sesi-youtube`) di akhir materi.
- Pergantian materi di halaman belajar (Kembali/Lanjut di
  `pindah-materi`, atau lewat pohon): panggung tengah berganti isi, pohon
  tidak bergerak, kolom widget berganti alatnya, remah (`remah`)
  berganti. HANDOFF menyebut 380 ms geser dari kanan 30 px; arahnya harus
  mengikuti Kembali (dari kiri) atau Lanjut (dari kanan).

### F. Umpan balik latihan dan kuis (tingkat CEPAT, tanpa kecuali)

- Memilih opsi (`opsi-mantra`, `huruf`, `tanda`): terpilih dalam
  sekejap, tanpa menunggu.
- Periksa: benar (hijau) atau salah (jingga). Tanda yang tumbuh, `kabar`
  yang muncul, opsi yang benar disorot. DILARANG menggoyang opsi yang
  salah; siswa yang salah tidak perlu dihukum dua kali.
- Sesudah Periksa, kartu pembahasan muncul (lihat E) dan tombol berganti
  menjadi Berikutnya.
- Berikutnya dan Sebelumnya (`soal-arah`): soal berganti dengan arah,
  tetapi cepat (200 ms atau kurang), karena ini terjadi 15 kali
  berturut-turut.
- Peta soal (`peta-kotak`): kotak berganti warna benar, salah, atau
  belum; kotak soal yang sedang dibuka ditandai; saat siswa melompat
  lewat peta, perilakunya sama dengan Berikutnya.
- Batang dan angka kemajuan (`bar-besar`, `latihan-persen`,
  `angka-rata`, cincin di Peta Materi): terisi dan menghitung saat
  halaman dibuka dan saat nilainya berubah (HANDOFF: 700 sampai 900 ms).
  Tentukan kapan angka menghitung dan kapan langsung tampil (contoh:
  membuka ringkasan yang sudah pernah dilihat).
- Lencana (`baris-lencana`, `lencana`): menyala saat diraih; jumlah
  lencana di daftar `/latihan` bertambah.
- Centang materi (`pohon-baris .status` dengan `letup`): sekali saja,
  saat materi pertama kali dibuka.
- Kuis di akhir bab (`web/components/topik/Kuis.tsx`) dan latihan per
  materi (`web/components/topik/Latihan.tsx`) memakai bahasa umpan balik
  yang sama dengan bank soal.

### G. Daftar dan kartu

- Peta Materi: kartu bab (`kisi-bab`), bab yang terpilih menyala
  (`bab-nyala`), kartu naik saat hover (5 sampai 6 px, sudah ada) dengan
  bayangan mengikuti kursor (`KartuBayang`, sudah ada), tombol utama yang
  berganti teks ("Mulai" menjadi "Lanjutkan Materi 03" menjadi "Ulangi
  belajar"): teksnya berganti dengan gerak, bukan berkedip.
- Daftar `/latihan` (`kartu-latihan`): kartu topik, batang kemajuan,
  jumlah lencana.
- Kisi soal dan kartu soal (`kisi-soal`, `kartu-soal`), remah di atas
  (`remah-latihan`).
- Kemunculan bertahap daftar saat halaman dibuka: paling banyak 5 elemen
  bertahap, jarak 40 sampai 60 ms, dan HANYA saat halaman pertama kali
  dibuka, bukan tiap kali digulir.

### H. Korsel dan pemutar video

- Korsel demo beranda (`Demo.tsx`): 5 slide, geser (HANDOFF: 500 ms),
  maju sendiri tiap 7 detik, berhenti saat kursor di atasnya, tombol
  sebelum dan sesudah, titik indikator. Semua slide berukuran kotak yang
  sama; indikator memuat yang elegan saat video slide belum siap.
- Pemutar video: poster ke putar (tombol putar besar pergi, video mulai),
  lencana geser "+10 detik" / "-10 detik" (`lencana-geser`, muncul lalu
  hilang dalam 700 ms), saklar subtitle (`atur-subtitle .saklar`),
  kemajuan simpan video di perangkat (`simpan-video`), keadaan galat
  (`video-galat`) dengan tombol coba lagi. Kontrol bawaan peramban tidak
  disentuh.
- Subtitle mengikuti waktu video, jadi TIDAK diberi animasi.

### I. Keadaan memuat, kosong, galat, dan 404

- Kerangka memuat (`SedangMemuat`, balok bernapas `napas`): rancang
  peralihan dari kerangka ke isi asli sehingga tidak ada lompatan, dan
  kerangkanya menempati tempat yang sama dengan isi.
- Keadaan kosong: belum ada kemajuan di Peta Materi, `soal-kosong` di
  bank soal, daftar latihan yang belum pernah dibuka.
- Galat video (jaringan gagal): kemunculan pesan dan tombol coba lagi.
- 404 (`not-found.tsx`): satu momen tanda tangan yang khas MANTRA,
  sekali, lalu diam.

### J. Gerak mikro tombol dan kontrol

- Tekan: semua tombol mengecil ke 0,96 saat `:active` (sudah ada). Hover
  pil emas ke `--emas-cerah`. Cincin fokus keyboard muncul, tidak
  melompat.
- Pil utama (`pil-gelap`, `pil-garis`, `pil-emas`, `pil-kecil-emas`,
  `pil-kecil-garis`) dan tautan bergaris bawah.
- Kendali widget (`web/components/kendali/`): pegangan `nyala` saat
  dipegang, angka yang berubah, tombol tambah dan kurang, penggeser emas.
  Perubahan NILAI widget (grafik menggambar ulang) tidak dianimasikan
  sama sekali: itu matematika, bukan antarmuka, dan harus mengikuti jari
  tanpa jeda.
- Saklar (subtitle, simpan video), keping, kotak centang.

### K. Gerak saat gulir dan gerak latar

- `MunculSaatGulir`: sekali saja, tidak diulang saat digulir balik.
  Tentukan ambang, jarak naik, dan durasinya.
- Paralaks logo hero (sudah ada, halus), kurva hero tergambar
  (`PitaKurva`, 3,4 detik, sekali), titik yang berjalan di kurva (11 dan
  16 detik, terus-menerus), glyph matematika mengapung (13, 17, 21 detik,
  terus-menerus). Ini gerak berulang tanpa pemicu; putuskan mana yang
  dipertahankan dan sebutkan alasannya. Aturan kami: gerak latar tidak
  boleh menarik mata dari bacaan, dan di halaman belajar TIDAK ADA gerak
  latar sama sekali.

## Aturan sistem gerak (pelanggaran = rancangan ditolak)

**Dua tingkat gerak, ditambah satu tingkat latar.**

- RUANG (sinematik): pindah halaman, pindah materi, laci, panel,
  jendela, mode fokus. 400 sampai 700 ms untuk masuk, dan tidak pernah
  lebih dari 700 ms untuk keseluruhan momen termasuk keluar.
- UMPAN BALIK (cepat): tekan, pilih, cek, pindah soal, keping, saklar,
  hover, fokus. 120 sampai 250 ms.
- LATAR (sekali, hanya beranda dan 404): kurva tergambar, hero bertahap,
  momen tanda tangan. Boleh berdetik, tetapi tidak mengulang dan tidak
  menahan apa pun.

Kalau ada titik yang menurutmu salah tingkat, katakan.

**Koreografi.**

- Keluar lebih cepat daripada masuk, kira-kira 60 persen durasinya.
- Masuk melambat di akhir (ease-out), keluar mencepat di awal (ease-in),
  berpindah tempat halus di kedua ujung (ease-in-out). Semua turunan dari
  `--kurva`; boleh menambah paling banyak dua kurva baru.
- Arah bermakna dan konsisten di seluruh situs: maju dari kanan atau dari
  bawah, kembali sebaliknya; laci dari sisi asalnya; jendela dari tengah
  di desktop dan dari bawah di HP; menu HP dari nav.
- Bertahap paling banyak 5 elemen, jarak 40 sampai 60 ms, dan totalnya
  tetap di dalam batas tingkat.
- Satu sumber gerak per momen. Saat halaman masuk, kartu di dalamnya
  tidak beranimasi sendiri-sendiri.
- Gerak yang bisa dipotong: siswa boleh mengetuk selagi animasi berjalan,
  dan ketukannya dilayani. Tidak ada tombol yang dinonaktifkan hanya
  karena animasi belum selesai. Ketukan cepat berulang tidak boleh
  menumpuk animasi.
- Tidak ada gerak berulang tanpa alasan, tidak ada pantul, goyang, getar,
  kilau menyapu, atau konfeti.

**Kapan TIDAK bergerak.**

- Mengetik angka atau menggeser kendali widget: widget menggambar ulang
  seketika.
- Subtitle dan segala yang mengikuti waktu video.
- Peralihan yang bisa terjadi lebih dari sekali per detik.
- Saat `prefers-reduced-motion: reduce`: gerak ruang diganti pudar
  singkat (150 ms atau kurang) atau tanpa gerak; keadaan akhir selalu
  terlihat; tidak ada fungsi yang bergantung pada `animationend` atau
  `transitionend` untuk bekerja (menu tetap terbuka, jendela tetap
  muncul, walau tanpa animasi).

**Teknis yang menentukan rasa.**

- Hanya `transform` dan `opacity` yang dianimasikan. Bukan `width`,
  `height`, `top`, `left`, `margin`, atau `box-shadow` besar.
  Pengecualian: lipat pohon dan laci boleh memakai
  `grid-template-columns` atau `clip-path` kalau tidak ada cara lain,
  dengan uji 60 fps.
- Tidak ada pergeseran tata letak: elemen yang sedang masuk sudah memesan
  tempatnya; kerangka memuat seukuran isi.
- 60 fps di HP Android kelas menengah (uji dengan CPU dilambatkan
  4 kali). Paling banyak 3 elemen besar beranimasi bersamaan.
  `will-change` hanya sesaat sebelum bergerak, dicabut sesudahnya. Tidak
  ada `backdrop-filter` yang beranimasi di HP.
- Benda yang sama bergerak sama di semua halaman: satu jenis jendela,
  satu jenis laci, satu jenis pindah halaman.

## Batasan teknis lain yang wajib

- Stack: Next.js 16 (App Router), React 19, Tailwind v4, CSS global
  dengan token di `globals.css`. Rancanganmu akan dipindahkan ke kode itu
  oleh sesi lain, jadi keluaranmu harus **bisa dipindahkan**: perubahan
  pada kelas dan berkas yang ada, bukan situs baru dengan kerangka lain.
- Pindah halaman lewat View Transitions API (dukungan Next.js untuk
  transisi rute, atau `document.startViewTransition`) dengan cadangan CSS
  biasa untuk peramban yang belum mendukung. Sebutkan dengan jelas mana
  yang butuh JavaScript dan seberapa banyak.
- TANPA pustaka animasi (framer-motion, GSAP, react-spring, Lenis,
  Lottie). Gerak lewat CSS dan sedikit JavaScript.
- Elemen `<dialog>` bawaan tetap dipakai untuk mode guru; jendela bank
  soal tetap `div` dengan `role="dialog"` (boleh kamu usulkan disatukan
  menjadi satu komponen jendela, dengan alasan).
- Pemutar tetap `<video>` biasa dengan kontrol bawaan.
- Lebar halaman tidak boleh dipatok piksel (`padding: 0 var(--tepi)`,
  bukan `max-width` piksel). Halaman belajar tetap satu layar, gulir
  hanya di dalam kolom.
- Warna di dalam widget matematika (sumbu, titik, kurva) jangan diubah,
  dan geraknya jangan disentuh.
- Jangan pakai tanda em-dash di teks apa pun; pakai titik, koma, titik
  dua, tanda kurung, atau tanda hubung biasa.
- Kata "miskonsepsi" dilarang tampil; pakai "Sering keliru". Bahasa
  untuk siswa adalah bahasa SMA yang hangat.
- Kunci localStorage berawalan `matra:` jangan diganti. Kalau kamu
  mengusulkan preferensi gerak yang disimpan, pakai kunci baru dengan
  awalan yang sama.
- Tanpa font tambahan, tanpa gambar tambahan.

## Keluaran per tahap

1. **Tanya-jawab** (sekarang): pertanyaanmu, maksimal 3, setelah membaca
   `globals.css`, `HANDOFF.md`, komponen yang disebut di atas, dan
   membuka situs hidup di desktop dan HP.
2. **Bahasa gerak**: 2 sampai 3 pilihan seperti dijelaskan di "Cara kita
   bekerja" butir 3. Saya pilih satu.
3. **Sistem**: token gerak sebagai CSS custom properties siap tempel ke
   `globals.css` (melanjutkan `--kurva` dan `--d-*`, ditambah token jarak
   geser, skala jendela, jeda bertahap), prinsip tertulis dalam bahasa
   awam, dan tabel "kapan tidak bergerak". Sertakan alasan tiap angka:
   kenapa 480 ms, bukan 400 atau 600.
4. **Prototipe momen kunci** yang bisa diklik, di desktop dan 390 px,
   masing-masing dengan tombol untuk melihat versi reduced-motion:
   (a) Beranda ke Peta Materi ke halaman belajar, lalu kembali;
   (b) menu HP buka dan tutup, garis tab aktif berpindah;
   (c) laci daftar materi HP buka, pilih materi, tutup; lipat pohon
   desktop;
   (d) pindah materi Kembali dan Lanjut; mode fokus masuk dan keluar;
   (e) jendela skor, jendela keluar, perayaan lencana;
   (f) pilih jawaban, Periksa benar, Periksa salah, pembahasan terbuka,
   Berikutnya, lompat lewat peta soal;
   (g) pemutar video: poster ke putar, lencana 10 detik, galat;
   (h) kerangka memuat ke isi asli.
5. **Tabel spesifikasi lengkap**: satu baris per titik dari inventaris A
   sampai K, dengan kolom: kelompok, titik, pemicu, apa yang bergerak,
   dari mana ke mana, durasi, kurva, jeda atau tahapan, tingkat (ruang,
   umpan balik, latar), versi reduced-motion, catatan HP, berkas dan
   kelas yang disentuh. Baris yang keputusannya "tidak bergerak" tetap
   ditulis, dengan alasannya.
6. **Potongan CSS dan JSX siap tempel** per kelompok, merujuk nama kelas
   yang sudah ada (`.nav-menu[data-buka]`, `.tirai-laci`,
   `.tirai-jendela`, `.opsi-mantra`, `.pindah-materi`, dan seterusnya),
   termasuk pola View Transitions untuk rute dan `@starting-style` untuk
   `<dialog>`.
7. **Akhir**: daftar periksa untuk sesi kode yang memindahkan
   rancanganmu, urut dari dampak terbesar, ditambah daftar periksa audit:
   reduced-motion, tanpa pergeseran tata letak, fokus dan Esc di jendela,
   60 fps dengan CPU dilambatkan, ketukan tidak diblokir, konsisten di
   semua halaman.

Kamu boleh bilang "selesai" hanya kalau: semua titik A sampai K ada di
tabel; setiap prototipe sudah kamu lihat sendiri di dua lebar layar, dua
mode gerak, dan CPU dilambatkan; tidak ada gerak yang melanggar aturan di
atas; dan sesi kode bisa memindahkan rancanganmu tanpa harus menebak satu
angka pun.

Mulai dari tahap 1.
