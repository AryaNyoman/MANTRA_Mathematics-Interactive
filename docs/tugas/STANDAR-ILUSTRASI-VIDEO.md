# Standar ilustrasi video MATRA, VERSI 2 (2 September 2026 malam)

Versi 1 (siang) menuntut "benda nyata 3D bercahaya" dan "keterangan di kaki
layar". Empat sesi mematuhinya, dan ARYA harus mengulang koreksi yang sama
empat kali: kamera miring merusak panjang dan sudut, bola yang terus bergerak
mencuri perhatian, keterangan bertabrakan dengan subtitle. Versi 2 ini lahir
dari sepuluh keputusan ARYA setelah menonton semua video. **Versi 2 membatalkan
versi 1 di setiap hal yang bertentangan.**

Perkakasnya `manim/gl/` (sinema v2, qc, ilustrasi, kamera). Rujukan resmi:
- **bidang datar**: Vektor Materi 01 (`manim/scenes/vektor1_perahu.py`, bidang bernomor);
- **3D**: Ruang 3D Materi 01 (`manim/scenes/ruang_3d_01.py` + `ruang_3d_umum.py`).

## Sepuluh keputusan ARYA (nilai ya/tidak di laporan)

1. **Tata letak layar dikunci, semua topik sama.** Kiri atas = identitas benda
   (`sinema.identitas`: "rusuk 6 satuan", "1 petak = 1 km"; JANGAN memakai huruf l sendirian sebagai lambang, di LaTeX ia terbaca angka 1, tulis "lebar" atau pakai ell). Kanan atas =
   rumus dan hitungan (`sinema.PapanRumus`, `lahir_rumus`, `ganti_rumus`). Kaki
   layar = milik SUBTITLE, kosong (qc menggagalkan render kalau ada yang masuk).
   Dalam gambar = label pendek yang menempel di bendanya. Kalau kurva naik ke
   kanan dan menabrak panel, dunianya yang digeser atau dikecilkan, bukan panelnya.
   ZONA HUD HANYA DUA POJOK ATAS: identitas di kiri (x < -2,1), rumus di kanan
   (x > 2,1). TENGAH ATAS BEBAS untuk dunia, dan `qc` memeriksa tabrakan yang
   NYATA, bukan kotak yang dipesan. Membaca 'jalur panel' sebagai seluruh
   lebar layar lalu memampatkan dunia ke separuh tinggi (Statistika 06,
   Vektor 03 sampai 09, 3 Sep) adalah salah baca: garis bilangan, bidang, dan
   batang boleh naik sampai atas di tengah layar.

2. **3D hanya di video PERTAMA tiap topik** sebagai pembuka 8 sampai 10 detik
   (perahu di air, orang di lapangan), lalu satu gerakan kamera turun ke bidang
   datar dan TIDAK PERNAH miring lagi. Video lain LANGSUNG ke matematika. Kalau tetap ingin pembuka 3D, maksimal
   5 detik dan HARUS ada yang terjadi (benda bergerak, kamera terbang), bukan
   lapangan kosong dengan satu benda kecil. Temuan 4 Sep: Vektor 03, 04, 06,
   08, 09 dan Ruang 3D 01 sampai 09 membuka dengan 15 sampai 20 detik hampir
   tanpa isi, dan itu 20 persen dari tiap video. Pengecualian Ruang 3D
   berlaku untuk kamera 3D-nya, BUKAN untuk pembuka yang lama dan kosong.
   "Video pertama topik" = video dengan NOMOR TAHAP TERKECIL dalam urutan
   belajar (yang pertama DITONTON siswa), bukan yang pertama dibuat. Kartu
   judul `sinema.judul_pembuka` DIKECUALIKAN dari batas 5 detik: panjangnya
   mengikuti kalimat pembuka narasi (butir 3), dan tidak boleh lebih lama
   daripada kalimat itu. Peralihan 3D yang BEKERJA (lembah memudar, sumbu
   ditarik saat disebut) boleh, tetapi bagian 3D-nya tetap sekitar 5 detik.
   UKURAN YANG DIPERIKSA: "detik pertama bergerak", yaitu jarak dari akhir kartu
   judul sampai benda pertama bergerak atau berubah, maksimal 5 detik, di 2D
   maupun 3D. Temuan Vektor 06 (4 Sep): pembuka 3D dipotong, lalu 25 detik
   pertama menjadi bidang kosong dengan satu orang diam, sementara narator
   bercerita tentang orang yang berjalan. Kekosongan cuma pindah dimensi.
   Tiap kalimat pembuka harus punya kejadian di layar yang sesuai kalimatnya
   (orang melangkah petak demi petak, lapangan digelar saat disebut). Tulis
   angka "detik pertama bergerak" tiap video di laporan.
   UKURAN KEDUA, "diam terpanjang" (temuan Ruang 3D 4 Sep): jeda terpanjang
   ketika perubahan piksel di bawah 0,5 persen DAN di bawah 300 piksel (skala
   480p). Alatnya `alat/ukur_detik_pertama.py` (kedua ukuran, `--uji-alatnya`
   membuktikan alatnya bisa gagal). Diam lebih dari 3 detik adalah CALON, bukan
   vonis: layar boleh diam selama narasi membahas yang tampil, tetapi tiap
   calon ditulis di laporan berikut kalimat narasinya. POLA YANG HARUS
   DIHINDARI: `isi_sisa` yang menyerahkan seluruh sisa babak (5 sampai 10
   detik) kepada SATU geseran kamera pelan tanpa kejadian; Ruang 3D
   menemukan 25 dari 40 babaknya begitu. Kamera boleh bergeser sebagai latar,
   tetapi tiap kalimat harus punya kejadian pada benda yang DISEBUTNYA, diikat
   ke jam kalimat; denyut berkala tanpa kaitan kalimat adalah "napas" yang
   dilarang butir 3.
   Sejak 4 Sep `sinema.Babak.tutup()` BERBUNYI (peringatan, bukan gagal) kalau
   animasi kurang dari 60 persen narasi dan sisanya lebih dari 3 detik: angka
   diamnya terlihat saat render, bukan ditemukan alat ukur dua hari kemudian.
   Statistika menemukan gerbang lama hanya menjaga satu arah (menolak
   animasi kelebihan, diam saja kalau animasi kependekan): 49 rentang beku
   lolos ke 13 video, terpanjang 18,5 detik.
   BENTUK KETIGA (temuan Vektor 4 Sep): animasi yang dimainkan BERUNTUN di awal
   babak membuat gambar MENDAHULUI narasinya lalu menganggur; Vektor 04 beku
   31 detik saat narator menyebut 4^2 = 16, 2^2 = 4, jumlah 20, akar 4,47,
   padahal semua animasinya ada di kode. Tiap kejadian dipatok ke kalimatnya
   dengan `b.tunggu_sampai`, bukan dimainkan lalu ditunggu. Dan JANGAN
   memadatkan langkah hitungan demi muat empat baris panel: langkah yang
   disebut narator harus punya kejadiannya; kalau panel penuh, baris
   DIMORF (`ganti_rumus` untuk rumus yang mirip), bukan langkah dibuang.
   Pengecualian: topik yang matematikanya memang ruang (Ruang 3D, dan nanti
   Transformasi Geometri) boleh bolak-balik 3D dan 2D. Prinsipnya: matematika
   yang butuh PANJANG atau SUDUT yang akurat wajib kamera tegak lurus, sebab
   perspektif memendekkan satu arah lebih banyak daripada arah lain, dan gambar
   yang membantah hitungannya lebih merusak daripada gambar sederhana.

3. **Layar boleh diam selama narasi masih membahas yang tampil.** Tidak ada
   batas detik. Yang dilarang: layar kosong, gambar yang membantah narasinya,
   dan gerakan tanpa makna yang mencuri perhatian (bola mengayun terus, "napas").

   JEBAKAN LaTeX (temuan Grafik Fungsi 4 Sep): JANGAN menulis `$...$` di dalam
   `teks()` atau `sinema.label()`, sebab `teks()` meloloskan `$` sebagai huruf
   dan tanda dolarnya ikut tercetak di layar; angka dan rumus lewat `rumus()`.
   JANGAN `
` di dalam `teks()`: LaTeX membacanya sebagai spasi, hasilnya satu
   baris panjang yang lalu dikecilkan `batasi_lebar`; satu objek teks per baris.
   `cek_kode.py` menolak keduanya.

   JEBAKAN ManimGL (temuan Statistika 4 Sep): `GrowFromEdge` butuh tepi di
   bidang xy, sedangkan batang adegan MATRA berdiri di sumbu z, jadi ia gagal
   di dalam `LaggedStartMap`. Pakai `GrowFromPoint` dari alas batang
   (`tumbuh_batang` di `statistika3_lebar_kelas.py`).

   BANGUN RUANG PEJAL (temuan Ruang 3D 4 Sep, terukur): `set_shading` ManimGL
   LEMAH ARAH, memindah sumber cahaya saja tidak membuat kubus terlihat
   bervolume (atap 200, muka kanan 190, beda 10 tidak terbaca). Yang bekerja:
   terang TIAP MUKA ditentukan sendiri (`Prism` = 6 `Square3D`, warna dasar
   dicampur LATAR untuk atap dan TINTA untuk muka samping; hasil 200/173/122,
   tiga tingkat jelas), cahaya rendah di sisi kamera (mis. (-2, -12, 12))
   supaya bayangan lantai wajar, dan bayangan DIHITUNG: titik sudut
   diproyeksikan dari titik cahaya ke z = 0 lalu diambil lambung cembungnya,
   jadi ikut bergeser kalau cahayanya digeser. Kode: `kubus_pejal` dan
   `bayangan_kubus` di `manim/scenes/ruang_3d_umum.py`, akan dinaikkan ke
   `gl.ilustrasi.balok`. Transformasi Geometri: pakai ini, jangan uji ulang.

   JEBAKAN GERBANG (temuan Statistika 4 Sep): `qc` memakai KOTAK BATAS, dan
   kotak batas sebuah kelompok adalah gabungan seluruh anggotanya. Dua sumbu
   yang didaftarkan sebagai SATU benda punya kotak sebesar seluruh bidang
   grafik, jadi panel di pojok dianggap menindihnya walau tidak ada garis yang
   bersentuhan. Daftarkan sumbu sebagai DUA benda pipih (pita mendatar di
   bawah, pita tegak di kiri). `alas_hud` + tanda `latar` hanya untuk tulisan
   yang memang harus menumpang di atas kisi.

   MORPH RUMUS (temuan Transformasi Geometri 4 Sep): `ganti_rumus` memakai
   TransformMatchingStrings, jadi dua rumus yang nyaris tidak punya lambang
   sama tidak dimorph, melainkan jadi tumpukan coretan tak terbaca selama
   satu setengah detik. Untuk rumus yang isinya beda jauh, pakai
   `papan.baris(..., b=b)` (menumpuk), bukan `ganti_rumus` (mengganti).
   `papan.baris` dan `papan.tumbuh` mencatat waktunya sendiri lewat `b=`;
   tanpa itu video memanjang 0,8 detik per baris dan `gabung_audio` menolak.

4. **Label di dalam gambar maksimal dua kata**, dijaga mesin (`sinema.label`
   menggagalkan render). Rumus seperti `x = 1` dihitung satu lambang. Contoh
   yang lolos: "naik 1", "ke KANAN", "dayung 3 km". Kalimat panjang milik
   narasi dan subtitle.

5. **Rumus baru lahir di tempat mata menatap, lalu terbang ke panel.**
   `sinema.lahir_rumus(self, r"f(x)=x^2", dekat=kurva, papan=papan, b=b)`:
   rumus muncul besar dekat bendanya, dunia diredupkan sebentar, lalu terbang
   mengecil ke kanan atas. **Rumus berubah dengan morph lambang per lambang**
   (`sinema.ganti_rumus` / `papan.tumbuh`, TransformMatchingStrings): `sin x`
   melebur jadi `cos x`, huruf lain diam. DILARANG: fade out lalu fade in untuk
   rumus, dan `ReplacementTransform` mentah (coretan kembar). Sebelum sebuah
   pernyataan matematika muncul, tunjukkan dari mana ia datang.

6. **Subtitle selalu satu baris, hurufnya dikecilkan.** `buat_subtitle.py`
   memecah kalimat sampai 56 huruf per baris; naskah ditulis dengan kalimat
   pendek supaya pecahannya wajar. Gambar wajib menyisakan kaki layar kosong
   (zona y < -2,55 satuan, sekitar 90 piksel di 480p). Subtitle tidak dibakar
   ke video yang tayang (berkas .vtt terpisah), tetapi `gabung_audio.py --uji`
   membuat salinan `-bersubtitle.mp4` untuk ditonton ARYA, sebab mp4 polos
   tidak memperlihatkan subtitle.

7. **Subtitle memakai LAMBANG, bukan ejaan ucapan.** Tiap segmen naskah punya
   `teks` (terucap, untuk mesin suara: "tujuh puluh dua") dan `tulis` (tertulis,
   untuk subtitle: "72"). Semua lambang ditulis sebagai lambang: √2, 72°,
   (2, 4), f(x-1), AB bergaris atas, 3/4, x². `buat_subtitle.py` memperingatkan
   segmen berbilangan yang tidak punya `tulis`. Aturan lengkap di
   STANDAR-MENGAJAR bagian 5 aturan 10.

8. **Render paralel: maksimal DUA per sesi**, dan render di atas 5 menit
   dilepas dari tugas latar Claude Code (`Start-Process`, lihat ATURAN-SEMUA-SESI)
   supaya tidak dipotong tanpa pesan.

9. **Sumbu wajib berangka.** Setiap bidang koordinat memakai `ilustrasi.bidang_bernomor`
   (skala x dan y terkunci sama, angka di kedua sumbu, huruf sumbu). Grafik
   fungsi wajib dua sumbu. Sumbu z hanya ditampilkan saat tinggi benar-benar
   dipakai. Titik yang dibahas diberi koordinatnya; kurva dibangun dari titik
   yang dihitung, tidak muncul jadi. Angka di video WAJIB sama dengan angka di
   halaman dan lolos pemeriksa topiknya (`alat/cek_<topik>.py`).

10. **Satu warna satu makna sepanjang video**, dari palet: AKSEN2 biru =
    besaran pertama, AKSEN merah = kedua, SOROT ungu = kesimpulan, REDUP =
    bantu, TINTA = tulisan. `Indicate`/`Flash` wajib diberi `color=` (bawaannya
    kuning, di luar palet; `cek_kode` menolak). Tidak ada kode heksa di adegan.

## Waktu dan sinkron
- Semua animasi di dalam `sinema.babak`; render gagal kalau melewati narasi.
- Segmen yang menyebut beberapa hal berurutan (lima titik, tiga langkah) WAJIB
  mengikat animasinya ke jam kalimat subtitle: `jam = sinema.jam_subtitle(TOPIK)`,
  `b.tunggu_sampai(sinema.mulai(jam, "x = -2"))`. Urutan kerja wajib:
  `buat_narasi.py`, lalu `buat_subtitle.py`, BARU render. `alat/cek_sinkron_video.py`
  membuktikan benda muncul saat disebut, bukan sebelumnya.
- `b.jeda` hanya untuk jeda pendek (0,6 sampai 1,6 detik) dan kini berbunyi
  kalau dipotong; tunggu panjang lewat `b.tunggu_sampai` atau `scene.wait` + `b.catat`.
- Pembuka: babak pertama HANYA judul materi (`judul_pembuka`, "Materi 03: ...")
  yang sama dengan yang diucapkan narator (STANDAR-MENGAJAR bagian 5 aturan 8).

## Jebakan ManimGL yang sudah dibayar mahal (jangan diulang)
- `FadeOut` MENGEMBALIKAN objek ke keadaan semula saat dibersihkan; objek yang
  sudah di-FadeOut lalu disentuh animasi lain muncul lagi terang (Grafik).
- Objek ber-updater (`always_redraw`, `become`) TIDAK BISA dipudarkan dengan
  `FadeOut`; kendalikan kepekatannya dari dalam updater lewat `ValueTracker` (Ruang 3D).
- Surface (bola, balok) DI DALAM benda tembus pandang hilang; VMobject tidak.
  Penanda titik di dalam kubus: lingkaran menghadap kamera (Ruang 3D).
- `NumberPlane` menempatkan diri di tengah layar, bukan di titik asalnya;
  `bidang_bernomor` sudah menambalnya (Vektor).
- `lantai_kisi(tinggi_z=0)` dulu membagi nol dan render mati dengan kode keluar
  0; sudah diperbaiki, tetapi ingat: **kode keluar 0 bukan bukti**.
- Panah ManimGL meruncing ke pangkal; pangkal panah panjang samar di 480p.
- Lembar kontak buta terhadap cacat GERAK (teleport, rumus terbang ke tempat
  salah): ambil frame rapat (0,4 detik) di tengah tiap perpindahan.
- `qc` memproyeksikan tanpa perspektif: benda yang diangkat mendekat ke kamera
  dinilai lebih aman daripada kenyataan; beri margin lebih untuk kamera miring.

## Daftar periksa per video (salin ke laporan, isi ya/tidak)
- [ ] Tata letak: identitas kiri atas, rumus kanan atas, kaki layar kosong, label ≤2 kata (qc dan sinema menggagalkan render kalau tidak)
- [ ] 3D hanya di pembuka video pertama topik (kecuali Ruang 3D / Transformasi Geometri); matematika di kamera tegak lurus
- [ ] Rumus lahir dekat benda lalu terbang ke panel; perubahan rumus lewat morph, bukan fade
- [ ] Sumbu berangka dua-duanya, skala sama, titik berkoordinat, kurva dari titik yang dihitung
- [ ] Angka video = angka halaman, lolos `alat/cek_<topik>.py`
- [ ] Naskah punya `tulis` untuk tiap segmen berbilangan; `buat_subtitle.py` tanpa peringatan; subtitle satu baris
- [ ] Segmen berurutan diikat jam kalimat; `alat/cek_sinkron_video.py` lolos kalau ada benda yang bisa dihitung
- [ ] Satu warna satu makna; `Indicate` berwarna palet; tidak ada kode heksa
- [ ] `cek_kode` bersih; `periksa_adegan` tiap babak (awal DAN akhir bila kamera bergerak); lembar kontak DIBUKA; frame rapat di tiap perpindahan; `gabung_audio --uji` + salinan `-bersubtitle` ditonton
- [ ] Cacat yang tersisa disebut di laporan, bukan didiamkan

## Yang tetap dari versi 1
Benda nyata dari `gl.ilustrasi` (bukan titik) untuk pembuka; kamera satu
gerakan panjang tanpa sentakan; semua huruf LaTeX (`teks`, `rumus`); palet
terkunci; gerbang mutu CLAUDE.md berlaku penuh.
