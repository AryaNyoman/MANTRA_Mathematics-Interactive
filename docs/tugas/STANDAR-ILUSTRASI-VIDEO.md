# Standar ilustrasi video MATRA (ManimGL, sejak 2 Sep 2026)

Keputusan ARYA: "Kalau yang dibahas perahu, videonya perahu yang mengapung di
air, bukan dua garis tepi dan warna biru. Kalau perlu 3D, buat 3D-nya. 3D
dipakai kapan pun membantu siswa, walau hanya beberapa detik." Standar ini
mengubah keinginan itu menjadi aturan yang bisa dinilai ya/tidak per adegan.
Dasar ilmunya: `ILMU-3B1B.md`. Contoh yang sudah lolos: `manim/contoh/contoh_perahu.py`
(tonton `media/uji-480p/contoh-perahu.mp4` kalau ada).

## Delapan aturan (semua wajib, nilai ya/tidak di laporan)

1. **Benda nyata dibangun 3D bercahaya, bukan titik atau garis.** Perahu, mobil,
   orang, bola, gedung: dari `gl.ilustrasi` (perahu, mobil, orang, bola, balok,
   silinder, air, tanah, lantai_kisi). Benda yang belum ada dibuat sebagai fungsi
   baru di `manim/gl/ilustrasi.py` DI AKHIR berkas, dengan nama unik, mengikuti
   aturan di kepala berkas (alas di z = 0, warna palet, `set_shading`). MASTER
   menggabungnya. Titik `Dot` hanya untuk titik matematika, bukan untuk benda.
2. **Latar ikut hidup.** Ada air, ada riak (`air_hidup`); ada tanah atau lantai
   (`tanah`, `lantai_kisi`). Benda nyata tidak melayang di layar kosong.
   Dunia tetap bergerak saat narator diam (updater), bukan membeku.
3. **Kamera mulai dari dunia, lalu terbang ke tempat matematika terbaca.** Babak
   pertama: pandangan miring dan dekat (`kamera.pasang_awal`). Lalu SATU gerakan
   panjang (minimal 2 detik, `kamera.dunia_ke_peta`/`sudut`/`dekati`) di dalam
   `b.main(...)`. Tidak ada potongan mendadak; paling banyak satu gerakan kamera
   per babak. Setiap gerakan harus menjawab "apa yang jadi terlihat setelah ini".
4. **Matematika muncul DI ATAS gambar, tidak menggantikannya.** Panah dan label
   digambar di dunia (z di atas benda, mis. `Z_PANAH = 1.6`), rumus di panel HUD
   (`self.hud_tambah(rumus(...))`). Gambar dunia tetap ada saat rumus dibahas.
   Layar kosong berisi rumus saja hanya boleh untuk penutup, maksimal satu babak.
5. **Satu warna satu makna, sepanjang video.** Tetapkan di storyboard:
   `AKSEN2` biru = besaran pertama, `AKSEN` merah = besaran kedua, `SOROT` ungu =
   kesimpulan. Panah, label, dan rumus besaran yang sama memakai warna yang sama.
   Tidak ada kode heksa di adegan (`cek_kode` memperingatkan).
6. **Semua huruf LaTeX** (keputusan ARYA 2 Sep siang). `teks()` untuk kalimat
   dan label ("dayung 3 km"; karakter `%`, `&`, `#`, `_`, `$` diloloskan
   otomatis), `rumus()` untuk angka berdiri sendiri, nilai hidup, dan rumus.
   Jangan memakai `Text(...)` (Pango) sama sekali. Keterangan lewat
   `sinema.keterangan` (satu baris, mengganti dirinya, **tulisan saja tanpa
   alas atau kotak**, seperti Trigonometri; warna tinta gelap). Kata yang
   dipertegas ditandai `*kata*`, tampil tebal di keterangan DAN di subtitle
   situs (penanda yang sama di naskah narasi). Paling banyak dua blok teks yang
   harus dibaca sekaligus. Satuan di rumus: `\mathrm{km}`.
7. **Waktu terikat narasi.** Semua animasi di dalam `with sinema.babak(...)`,
   durasi dari `audio/<topik>/durasi.json`. Kalimat pertama narasi menyebut yang
   sedang tampil. Jeda sengaja 0,6 sampai 1,6 detik setelah pertanyaan. Tidak ada
   waktu mati (layar diam tanpa updater lebih dari 1,6 detik).
8. **Gerbang mutu tidak dilewati.** Urutannya: `cek_kode.py` bersih,
   `qc.periksa_adegan` di akhir tiap babak (dan di sudut awal DAN akhir kalau
   kamera bergerak), render `-l`, `cek_video.py` dan lembar kontak DIBUKA lalu
   dinilai per aturan CLAUDE.md, `gabung_audio.py --uji`, laporan menyebut cacat
   yang tersisa. "Rendered" bukan bukti.

## Kapan 3D, kapan 2D
Bukan "3D kalau matematikanya 3D". Pertanyaannya: "apa yang siswa jadi LIHAT
kalau kamera miring?" Perahu di sungai: 3D memperlihatkan perahu itu benda di
atas air, lalu pandangan peta memperlihatkan arah. Grafik fungsi: kurva 2D tetap
2D, tetapi mobil yang kecepatannya digambarkan boleh 3D di babak pembuka.
Statistika: batang bisa balok 3D yang tumbuh; pencilan bisa orang yang berdiri
menjauh dari kerumunan. Ruang 3D: seluruh video 3D dengan kamera berputar pelan
(`putar_pelan`) supaya bentuk terbaca. 3D yang tidak memperlihatkan apa pun
yang baru = hiasan, dan hiasan yang memperlambat render tidak dipakai.

## Suara latar (pemanis)
Tulis `"latar": "air"` di naskah narasi kalau adegannya di air; daftar suara di
`manim/suara/README.md`. `gabung_audio.py` mencampurnya tipis dan otomatis
merendah saat narator bicara. Jangan menambah suara yang tidak ada di daftar.

## Kinerja render (supaya tidak kaget)
Adegan dengan air hidup dan perahu yang mengangguk dirender sekitar 5 frame per
detik: video 2 menit 480p sekitar 8 menit. Render paralel antar sesi BOLEH
(terbukti 8 serentak aman). Air dengan resolusi (121, 61) sudah cukup halus;
jangan menaikkannya tanpa alasan.

## Daftar periksa per video (salin ke laporan, isi ya/tidak)
- [ ] Benda nyata dari `gl.ilustrasi`, tidak ada benda berupa titik/garis
- [ ] Latar hidup (air/tanah/lantai) dan updater menjaga dunia bergerak saat diam
- [ ] Kamera: mulai dari dunia, satu gerakan panjang ke sudut matematika, tidak ada sentakan
- [ ] Panah/label di dunia, rumus di HUD, gambar tidak pernah diganti layar kosong (kecuali penutup)
- [ ] Satu warna satu makna; tidak ada kode heksa di adegan
- [ ] `teks()` untuk kata, `rumus()` untuk angka/rumus; `\mathrm` untuk satuan
- [ ] Semua animasi di dalam `sinema.babak`; jeda setelah pertanyaan; tidak ada waktu mati
- [ ] `cek_kode` bersih; `periksa_adegan` tiap babak; lembar kontak dibuka dan dinilai; `gabung_audio --uji` jalan
- [ ] Cacat yang tersisa disebut di laporan, bukan didiamkan

## Rujukan kode
- `manim/contoh/contoh_perahu.py`: alur lengkap 5 babak (dunia, terbang, dua panah, penutup).
- `manim/uji/uji_cahaya_gl.py`: permukaan fungsi bercahaya + jala + kamera terbang.
- `manim/uji/uji_ilustrasi_gl.py`: etalase semua benda `ilustrasi`.
- `manim/uji/uji_sinema_gl.py`: babak, keterangan, AngkaKoma, HUD saat kamera miring.
- `manim/gl/uji_qc.py`: cara `qc` menilai bertindih dan keluar bingkai di 3D.
