# Prompt untuk Claude Design: mempercantik MANTRA ujung ke ujung

Disusun 4 Sep 2026 oleh sesi MASTER atas permintaan ARYA, memakai alur
`/desain` (satu arah gaya, satu referensi, anti-generik, wajib dilihat
sebelum lapor selesai) sebagai kerangka. Salin seluruh isi di bawah garis
ke Claude Design, bersama folder codebase `D:\MANIM-MATRA`.

Referensi visual opsional yang bisa ikut dilampirkan (hasil bedah situs
nyata, ada di `C:\Users\ASUS\.claude\design-md\`): `claude/DESIGN.md`
(kertas hangat + serif, paling dekat dengan MANTRA), `linear.app/DESIGN.md`
(gerak dan kedalaman yang presisi), `apple/DESIGN.md` (kemewahan lewat
menahan diri). Lampirkan maksimal SATU, atau biarkan Claude Design memilih.

---

Kamu adalah perancang produk senior kelas dunia. Saya menyewamu untuk satu
pekerjaan: membuat situs belajar matematika saya, **MANTRA**, terlihat dan
terasa seperti produk yang membuat siswa SMA berhenti sejenak dan berkata
"ini keren banget", di desktop maupun HP, dari halaman pertama sampai
halaman 404. Keluarkan seluruh kemampuanmu.

Arah rasa yang saya inginkan dalam satu kalimat: **memukau tetapi
minimalis.** Efek yang bikin takjub, bukan efek yang ramai. Kemewahan
lahir dari ketepatan: huruf yang ditata sempurna, jarak yang bernapas,
gerak yang halus dan bertujuan, satu momen kejutan cerdas di tiap halaman.
Bayangkan buku matematika cetakan terbaik yang tiba-tiba bisa bergerak.

Folder codebase saya lampirkan. Baca dulu kondisi nyata sebelum bicara.

## Cara kita bekerja (baca dulu, ini bukan basa-basi)

1. **Jangan langsung menggambar.** Mulai dengan bertanya. Maksimal 3
   pertanyaan per giliran, dan hanya yang benar-benar mengubah arah.
   Hal yang bisa kamu putuskan sebagai profesional, putuskan sendiri.
2. **Jangan menuruti saya begitu saja.** Saya bukan perancang. Kalau saran
   saya buruk, katakan buruk, tunjukkan alternatif yang lebih baik, beri
   alasan. Kalau setelah itu saya tetap memilih ide saya, jalankan.
   Keputusan akhir di saya, tetapi saya ingin ditantang dulu.
3. **Tawarkan 2 sampai 3 arah gaya** sebelum membangun apa pun.
   Tiap arah: satu gambar beranda desktop, satu gambar beranda HP, satu
   paragraf "kenapa cocok untuk MANTRA", satu paragraf "risikonya".
   Saya pilih SATU. Setelah itu jangan ganti arah di tengah jalan dan
   jangan mencampur arah.
4. **Kerjakan per halaman.** Tunjukkan, tunggu tanggapan saya, baru
   lanjut. Jangan menyerahkan semua sekaligus di akhir.
5. **Bahasa awam.** Saya paham "ini bikin mata cepat lelah", saya tidak
   paham "hierarki tipografi kurang tegas". Dampak dulu, istilah belakang.
6. Kalau dua pilihan punya konsekuensi berbeda (cantik tapi bikin HP lama
   memuat), sebutkan konsekuensinya sebelum saya memilih.
7. **Jangan pernah bilang "selesai" tanpa melihat hasilnya sendiri.**
   Tiap halaman dilihat di lebar desktop dan lebar HP (390 px) sebelum
   kamu tunjukkan ke saya. Biasanya butuh 2 sampai 3 putaran, bukan sekali
   jadi. Perbaiki yang jelek sebelum saya melihatnya.

## Tentang MANTRA

- Situs belajar matematika SMA berbahasa Indonesia. Tiap materi punya
  **video animasi** (menjelaskan *kenapa*) dan **widget interaktif**
  (siswa mencoba sendiri), lalu latihan dan kuis.
- Tujuh topik: Trigonometri, Limit, Grafik Fungsi, Vektor, Ruang 3D,
  Statistika, Transformasi Geometri. Dua pertama unggulan.
- Pengguna: siswa SMA (HP, layar kecil, jaringan pas-pasan) dan dosen
  penguji saya (laptop, menilai kesan profesional). Dua-duanya harus
  terkesan.
- Versi hidup: https://mantra-uji.vercel.app (terbaru) dan
  https://matra-eight.vercel.app (produksi).
- Tanpa login, tanpa database. Kemajuan belajar tersimpan di peramban.

Tempat membaca kondisi sekarang di codebase:

- `web/app/globals.css`: seluruh gaya, token warna, tata letak.
- `web/components/mantra/` dan `web/components/topik/HalamanTopik.tsx`:
  komponen halaman.
- `web/components/Demo.tsx`: korsel demo beranda.
- `web/components/PemutarVideo.tsx`: pemutar video.
- `docs/desain-mantra/MANTRA.dc.html` dan `HANDOFF.md`: rancangan MANTRA
  yang sekarang dipakai. Ini titik awalmu, bukan batas.
- `web/content/`: isi materi (jangan diubah, cukup dipahami).

Halaman yang ada, semuanya harus kamu sentuh:

1. **Beranda**: nav, hero, korsel demo 5 slide (video dan widget), tiga
   kartu "Fitur unggulan", kaki halaman.
2. **Peta Materi**: bab per topik, tiap materi bisa diklik, tombol utama
   berubah ("Mulai", "Lanjutkan Materi 03", "Ulangi belajar"), kemajuan
   siswa terlihat, materi terpilih menyala.
3. **Halaman belajar** (paling penting, paling lama dipakai): satu layar
   penuh tanpa gulir halaman. Kiri pohon materi, tengah bacaan dan video,
   kanan widget interaktif. Yang bergulir hanya isi kolom. Di HP, pohon
   materi jadi laci geser dari samping.
4. **Latihan dan kuis**: pilihan ganda dan isian, umpan balik benar atau
   salah, skor tersimpan, kuis terkunci sampai semua materi dibuka.
5. **Tentang**: judul "MANTRA", logo di tengah di samping keterangan,
   logo Manim berlatar putih.
6. **Bank soal** (sedang dibangun ulang, rancang wadahnya).
7. Halaman 404, keadaan kosong, keadaan memuat, galat video.

## Identitas: boleh digeser, jangan diganti

- Warna sekarang: emas `#B08A3E`, navy `#101A2B`, kertas `#FAF9F5`.
  Kamu **boleh menggesernya** kalau menurutmu ada yang lebih indah
  (emas lebih dalam, navy lebih hangat, kertas lebih bersih, aksen kedua
  untuk benar atau salah). Syaratnya: orang yang sudah kenal MANTRA masih
  mengenalinya, dan kamu jelaskan alasannya. Jangan ganti ke skema yang
  sama sekali lain (ungu-biru gradien, neon, hitam total).
- Huruf: **Newsreader** (serif) dan **Space Grotesk** (sans). Keluarga
  huruf tetap; ukuran, berat, jarak, dan pembagian peran boleh kamu tata
  ulang seluruhnya.
- Nada: tenang, bermartabat, cerdas. Bukan aplikasi gim, bukan startup
  generik.

## Daftar larangan anti-generik (ini yang membedakan "wow" dari "template")

- Tidak ada hero "judul besar + dua tombol + tiga kartu ikon" yang bisa
  ditemukan di seribu situs lain. Kalau strukturnya begitu, isinya harus
  membuatnya terasa milik MANTRA seorang.
- Tidak ada ikon emoji, tidak ada ilustrasi stok, tidak ada gambar
  dekoratif tanpa makna matematika.
- Tidak ada gradien ungu-biru, tidak ada glassmorphism yang ditempel ke
  mana-mana, tidak ada bayangan tebal berwarna.
- Tidak ada animasi pantul, goyang, atau elemen yang bergerak terus
  tanpa alasan. Setiap gerak menjawab "kenapa ini bergerak".
- Satu momen tanda tangan per halaman (misalnya rumus yang terangkai saat
  hero dimuat, garis kisi halus yang mengikuti kursor, kemajuan siswa yang
  mengalir seperti tinta). Bukan lima momen yang saling berebut.
- Sudut, radius, bayangan, durasi: satu sistem, dipakai konsisten.
  Jangan ada dua radius berbeda untuk benda yang sama.

## Batasan teknis yang wajib (pelanggaran = rancangan ditolak)

- **Lebar halaman tidak boleh dipatok piksel.** Dilarang `max-width`
  piksel pada wadah halaman. Isi harus memenuhi layar saat peramban
  di-zoom keluar. Pakai `padding: 0 var(--tepi)` dengan
  `--tepi: clamp(16px, 4vw, 108px)`. Ini bug nyata yang pernah terjadi.
- **Halaman belajar tetap satu layar**, tanpa kaki halaman, gulir hanya
  di dalam kolom.
- **Warna di dalam widget interaktif jangan diubah** (sumbu, titik,
  kurva). Yang boleh berubah hanya bingkai dan kontrol di sekelilingnya.
- **Jangan pakai tanda em-dash** di teks mana pun. Pakai titik, koma,
  titik dua, atau tanda hubung biasa.
- Kata **"miskonsepsi" dilarang** tampil ke siswa; pakai "Sering keliru".
- Bahasa untuk siswa adalah bahasa SMA yang hangat.
- Nomor WhatsApp tidak pernah ditampilkan.
- Stack: Next.js 16, React 19, Tailwind v4, CSS global dengan token.
  Rancanganmu akan dipindahkan ke kode itu, jadi keluaranmu harus **bisa
  dipindahkan**: perubahan pada berkas yang ada, bukan situs baru dengan
  kerangka lain.
- Tanpa pustaka animasi berat. Gerak lewat CSS dan sedikit JavaScript.
  Semua gerak hormat pada `prefers-reduced-motion`.
- Video mp4 dengan poster jpg dan subtitle. Pemutar tetap elemen
  `<video>` biasa.
- Kunci localStorage berawalan `matra:` jangan diganti (menghapus
  kemajuan siswa).

## Yang saya harapkan kamu kejar

- **Kesan pertama sinematik** di beranda: hero yang hidup, korsel demo
  yang terasa mahal (geser mulus, ukuran kotak identik untuk semua slide,
  indikator memuat yang elegan), kartu fitur yang bernapas.
- **Peta Materi seperti peta perjalanan**: kemajuan terlihat sekilas,
  materi terpilih menyala, tombol utama terasa mengundang.
- **Halaman belajar tenang tetapi presisi**: hierarki bacaan jelas,
  rumus terbaca, widget terasa seperti alat laboratorium yang indah.
- **Gerak mikro bermakna**: tombol, pindah halaman, buka laci, umpan
  balik jawaban. Halus, cepat (150 sampai 400 ms), satu bahasa gerak.
- **HP setara desktop**, bukan versi cadangan: sentuh minimal 44 px,
  laci nyaman, video dan widget tidak terpotong, teks tidak menyusut.
- **Aksesibilitas**: kontras WCAG AA, fokus keyboard terlihat, urutan
  tab masuk akal, label form ada.
- **Ringan**: tanpa gambar besar, tanpa font tambahan, tidak ada
  pergeseran tata letak saat memuat.
- Detail yang membuat orang tersenyum: favicon, judul tab, keadaan
  kosong yang ramah, 404 yang khas MANTRA.

## Keluaran per tahap

1. **Tanya-jawab** (sekarang): pertanyaanmu, maksimal 3, setelah membaca
   codebase dan membuka situs hidupnya di desktop dan HP.
2. **Arah**: 2 sampai 3 arah gaya seperti dijelaskan di atas. Saya pilih
   satu.
3. **Sistem**: token rancangan (warna dan turunannya, skala huruf, skala
   jarak, radius, bayangan, durasi dan kurva gerak) sebagai CSS custom
   properties siap tempel ke `globals.css`, plus alasan tiap keputusan.
4. **Per halaman**: gambar desktop dan HP, daftar perubahan per komponen,
   potongan CSS atau JSX secukupnya, alasan dalam bahasa awam. Sudah kamu
   lihat sendiri di dua lebar layar sebelum ditunjukkan.
5. **Akhir**: daftar periksa untuk sesi kode yang memindahkan
   rancanganmu, urut dari dampak terbesar, ditambah daftar periksa audit
   (fokus, label, kontras, reduced-motion, pergeseran tata letak).

Mulai dari tahap 1.
