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
   (`sinema.identitas`: "p = l = t = 6 satuan", "1 petak = 1 km"). Kanan atas =
   rumus dan hitungan (`sinema.PapanRumus`, `lahir_rumus`, `ganti_rumus`). Kaki
   layar = milik SUBTITLE, kosong (qc menggagalkan render kalau ada yang masuk).
   Dalam gambar = label pendek yang menempel di bendanya. Kalau kurva naik ke
   kanan dan menabrak panel, dunianya yang digeser atau dikecilkan, bukan panelnya.

2. **3D hanya di video PERTAMA tiap topik** sebagai pembuka 8 sampai 10 detik
   (perahu di air, orang di lapangan), lalu satu gerakan kamera turun ke bidang
   datar dan TIDAK PERNAH miring lagi. Video lain boleh langsung bidang datar.
   Pengecualian: topik yang matematikanya memang ruang (Ruang 3D, dan nanti
   Transformasi Geometri) boleh bolak-balik 3D dan 2D. Prinsipnya: matematika
   yang butuh PANJANG atau SUDUT yang akurat wajib kamera tegak lurus, sebab
   perspektif memendekkan satu arah lebih banyak daripada arah lain, dan gambar
   yang membantah hitungannya lebih merusak daripada gambar sederhana.

3. **Layar boleh diam selama narasi masih membahas yang tampil.** Tidak ada
   batas detik. Yang dilarang: layar kosong, gambar yang membantah narasinya,
   dan gerakan tanpa makna yang mencuri perhatian (bola mengayun terus, "napas").

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
