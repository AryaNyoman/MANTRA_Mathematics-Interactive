# Pindah ke ManimGL dan standar ilustrasi video

Tanggal: 2 September 2026. Pemilik keputusan: ARYA. Penulis: MASTER.
Status: DISETUJUI ARYA (brainstorming 2 Sep pagi), siap direncanakan.

## 1. Kenapa

Video MATRA gelombang 1 (contoh: `vektor1-perahu`) menggambar perahu sebagai
titik dan sungai sebagai kotak biru diam. Siswa harus membayangkan sendiri apa
yang terjadi, padahal esensi MATRA adalah memperlihatkan apa yang sebenarnya
terjadi di dunia. ARYA mempelajari video 3b1b dan menuntut level itu: benda
terlihat seperti bendanya, ada ruang dan cahaya, kamera bergerak, dan 3D dipakai
kapan pun membantu pemahaman, walau hanya beberapa detik.

Bukti yang mendasari keputusan (semua dari sesi 2 Sep):
- Repo 3b1b/videos memakai `manimlib` (ManimGL), bukan Manim Community. Cahaya
  di videonya adalah `Surface.set_shading(reflectiveness, gloss, shadow)` plus
  posisi lampu kamera, bayangan tipuan dari salinan permukaan, `SurfaceMesh`,
  `set_clip_plane`, dan `frame.reorient` (lihat `_2023/convolutions2/diagonal_slices.py`).
- ManimGL 1.7.2 jalan di laptop ARYA tanpa jendela, di kartu grafis: adegan 10 detik
  dirender 15 detik; 5 render serentak 27 detik; 8 serentak 43 detik; semua sukses.
- Dua uji lolos gerbang video: `manim/uji/uji_cahaya_gl.py` dan
  `manim/uji/uji_perahu_gl.py` (perahu 3D di air bergelombang, kamera terbang ke
  pandangan peta, panah muncul di atas gambar). ARYA: "ini sudah naik level".

## 2. Keputusan terkunci

| Hal | Keputusan | Alasan |
|---|---|---|
| Pustaka animasi | **ManimGL 1.7.2, 100%.** Manim Community dicabut | satu perkakas, 3D kapan pun perlu |
| 14 video Trigonometri dan Limit | dibiarkan apa adanya (kode CE diarsipkan, tidak dijalankan lagi) | keputusan ARYA, 2 topik lebih kecil dari 4 topik + topik baru |
| Latar video | krem Studio Teknis `#F7F3EE`, satu versi | situs tidak punya mode gelap |
| Huruf | **Constantia** untuk kata; **LaTeX (`Tex`)** untuk angka berdiri sendiri, nilai hidup, dan rumus; angka di dalam kalimat ikut Constantia | pilihan ARYA; label pendek tidak dijahit dari dua mesin huruf |
| Render | paralel boleh, antrean `alat/antre_render.py` tidak wajib | terbukti 8 serentak aman |
| Suara latar | boleh, tipis, otomatis merendah saat narator bicara | "pemanis, jangan menindih suara orang" |
| Palet | tetap `matra_theme` (tinta, redup, aksen, aksen2, sorot) | gaya terkunci |

## 3. Lingkup

Dikerjakan:
1. Perkakas bersama baru `manim/gl/` (bagian 4).
2. Perahu rujukan dibangun ulang memakai perkakas itu.
3. Dokumen: `ILMU-3B1B.md`, `STANDAR-ILUSTRASI-VIDEO.md`, pembaruan
   `ATURAN-SEMUA-SESI.md`, 4 berkas tugas, `PROMPT-SIAP-TEMPEL.md`, `PROGRESS.md`,
   `CLAUDE.md`.
4. Memori untuk 4 worktree sesi (vektor, grafik-fungsi, statistika, ruang-3d).
5. MASTER mengirim pesan pembangunan ke semua sesi.

Sengaja tidak: mode gelap; memindahkan 14 video lama ke ManimGL; impor SVG dari
luar; pi creature dan `checkpoint_paste`; perubahan situs.

## 4. Perkakas bersama `manim/gl/`

Prinsip: nama dan kebiasaan perkakas lama dipertahankan (`babak`, `keterangan`,
`periksa_adegan`, `AngkaKoma`) supaya sesi tidak belajar dari nol, tetapi isinya
dibangun ulang dengan 3D dan kamera bergerak sebagai keadaan normal.

### 4.1 `manim/gl/tema.py`
- Konstanta warna disalin dari `manim/matra_theme.py` (hanya palet terang).
- `FONT = "Constantia"`. `teks(str, ukuran=..)` membuat `Text` Constantia yang
  sudah diwarnai tinta lewat `.set_color()` (karena `Text(color=)` diabaikan ManimGL).
- `rumus(str, ukuran=..)` membuat `Tex` yang sudah diwarnai.
- `AdeganMatra(Scene)`: `default_camera_config` latar krem; mengimpor
  `tambal_manimgl`; menyediakan `self.t` (tema) dan `self.hud` (kelompok objek
  yang `fix_in_frame`).

### 4.2 `manim/gl/sinema.py`
- `babak(scene, nama, durasi)` kontrak sama dengan lama: durasi dari
  `audio/<topik>/durasi.json`, `b.main(...)`, `b.jeda(...)`, gagal
  (`WaktuTidakMuat`) kalau animasi melewati narasi; menutup sisa waktu dengan
  `wait` supaya updater (air, perahu) tetap hidup.
- `keterangan(scene, teks, y=..)`: kalimat sorot yang mengganti dirinya sendiri,
  `fix_in_frame` (menempel di layar walau kamera terbang), lebar dibatasi.
- `judul_pembuka(scene, teks, lama)`: muncul lalu memudar, `fix_in_frame`.
- `AngkaKoma`: `DecimalNumber` ManimGL dengan koma desimal, tepi kiri tetap.
- `nilai_hidup(label, angka, di)`: label + angka yang mengikuti `ValueTracker`.
- `batasi_lebar(mob, maks)`.

### 4.3 `manim/gl/kamera.py`
Semua menerima `run_time` dan dipanggil di dalam `b.main(...)`:
- `dunia_ke_peta(frame, pusat, tinggi)`: dari pandangan samping miring ke tegak lurus atas.
- `dekati(frame, target, tinggi)`: mendekat ke objek tanpa mengubah sudut.
- `putar_pelan(frame, derajat)`: putaran halus.
- `sudut(frame, theta, phi, pusat, tinggi)`: pembungkus `reorient` dengan nama Indonesia.
- Setiap fungsi mengembalikan animasi (`frame.animate...`), bukan memutar sendiri.

### 4.4 `manim/gl/ilustrasi.py`
Benda nyata bercahaya, dibuat sekali, dipakai semua sesi. Setiap fungsi
mengembalikan `Group` dengan titik asal yang jelas (garis air, alas, pusat).
- `air(panjang, lebar, waktu)`: permukaan riak tiga gelombang (dari uji perahu),
  dipakai lewat `always_redraw`.
- `tanah(panjang, lebar, y)`: bidang pasir/tanah.
- `lantai_kisi(ukuran)`: bidang koordinat tipis + sumbu 3D.
- `perahu(panjang)`: lambung parametrik dengan badan di atas air, geladak,
  tiang, layar miring; `ayunkan(perahu, tinggi_air, x, y, t)` mengangguk.
- `bola(r)`, `balok(p, l, t)`, `silinder(r, t)`: primitif bercahaya berpalet.
- `mobil(panjang)`: badan balok + roda silinder (untuk Grafik Fungsi, Statistika).
- `orang(tinggi)`: orang batang sederhana (skala manusia).
- Semua memakai `set_shading` dan warna palet; tidak ada warna di luar palet
  kecuali turunan terang/gelapnya.

### 4.5 `manim/gl/qc.py`
- `muat_di_bingkai`, `tidak_bertindih`, `periksa_adegan` nama sama dengan lama.
- Cara kerja 3D: titik setiap objek diproyeksikan ke bidang kamera saat itu
  (`frame` ManimGL: pusat, matriks rotasi, tinggi), lalu diperiksa terhadap
  batas layar dan satu sama lain dalam satuan layar. Objek `fix_in_frame`
  diperiksa langsung di koordinat layar.
- Perspektif ManimGL membuat proyeksi ini perkiraan; margin dinaikkan ke 0,3.
  Lembar kontak `cek_video.py` tetap gerbang akhir.
- `periksa_adegan` wajib dipanggil di akhir tiap babak, dan untuk babak dengan
  kamera bergerak: pada sudut awal DAN akhir.

### 4.6 Perkakas lain
- `manim/cek_kode.py`: pembuat tex jadi `{"Tex", "TexText"}`; larangan
  `Text(color=...)` dan `MathTex`; aturan lain tetap.
- `manim/gabung_audio.py`: pilihan `--latar <nama>` membaca
  `manim/suara/<nama>.ogg`, volume dasar sekitar -18 dB relatif narasi, ducking
  lewat filter FFmpeg `sidechaincompress` (narasi sebagai pengendali), lalu
  digabung ke video. Nama latar juga bisa ditulis di naskah narasi
  (`"latar": "air"`), `gabung_audio` membacanya kalau `--latar` tidak diberi.
- `custom_config.yml` di akar proyek: keluaran `media/gl/`, latar krem, font
  Constantia, fps 30 (480p uji) / 60 saat `--hd`.
- `manim/scenes/*.py` (14 adegan CE + 2 beranda) dipindah ke
  `manim/arsip-manim-ce/` dengan `README.md`: "kode Manim Community, tidak bisa
  dijalankan sejak 2 Sep 2026, jangan dicontoh".
- `manim/matra_theme.py`, `manim/sinema.py`, `manim/qc.py` lama ikut ke arsip.
- `alat/antre_render.py` dipertahankan (tidak wajib, masih berguna untuk 1080p).

## 5. Alur kerja sesi (gelombang 2 versi ManimGL)

1. Storyboard (brainstorming) dengan `STANDAR-ILUSTRASI-VIDEO.md` di tangan.
2. Naskah `manim/narasi/<topik>.json`, lalu `buat_narasi.py` (edge-tts, durasi per segmen).
3. Adegan di `manim/scenes/<topik>N_<nama>.py`, `class X(AdeganMatra)`, memakai
   `gl.sinema.babak`, `gl.kamera`, `gl.ilustrasi`, `gl.qc`.
4. `python manim/cek_kode.py <berkas>`.
5. `manimgl <berkas> <Adegan> -w -l --video_dir media/gl` (paralel boleh).
6. `python manim/cek_video.py media/gl/<Adegan>.mp4` dan BUKA lembar kontaknya.
7. `python manim/gabung_audio.py <topik> <Adegan> --uji [--latar air]`.
8. Laporan + commit di cabang sesi. 1080p milik gelombang 3.

## 6. Dokumen

- `docs/tugas/ILMU-3B1B.md`: enam prinsip dengan rujukan berkas repo 3b1b dan
  padanan ManimGL di `manim/gl/`; daftar "jangan ditiru".
- `docs/tugas/STANDAR-ILUSTRASI-VIDEO.md`: aturan yang bisa dinilai ya/tidak per
  adegan, daftar periksa, rujukan `uji_perahu_gl.py`.
- Pembaruan: `ATURAN-SEMUA-SESI.md` (perkakas, paralel, alur), bagian "Video" di
  `MATRA-VEKTOR/GRAFIK-FUNGSI/STATISTIKA/RUANG-TIGA-DIMENSI.md`,
  `PROMPT-SIAP-TEMPEL.md` (prompt E: gelombang 2 ManimGL), `PROGRESS.md` (Resep
  lengkap, MULAI DARI SINI), `CLAUDE.md` (cara menjalankan).
- Memori: satu berkas di tiap `~/.claude/projects/D--MANIM-MATRA--claude-worktrees-matra-<sesi>/memory/`.

## 7. Cara membuktikan selesai

- `python -c "import manim.gl"` tanpa error; `cek_kode.py` lolos pada perahu rujukan.
- Perahu rujukan dirender lewat perkakas baru, `cek_video.py` dibuka, tanpa cacat.
- `qc.py`: uji kecil (skrip `manim/gl/uji_qc.py`) yang sengaja menaruh objek
  keluar bingkai dan bertindih di 3D, harus GAGAL; yang benar harus lolos.
- `gabung_audio.py --latar air --uji` menghasilkan berkas yang narasinya tetap
  jelas (didengar ARYA).
- 4 sesi bisa menjalankan alur bagian 5 dari worktree-nya setelah menarik `master`.

## 8. Urutan kerja dan ukuran

1. Perkakas `manim/gl/` + config + arsip + perahu rujukan: **besar** (sekitar satu
   hari kerja Claude). Risiko: proyeksi qc 3D perkiraan; `become` per frame
   membuat adegan berat (7 fps saat render), diterima.
2. Dokumen + memori: sedang.
3. Kirim pesan ke sesi, terima setoran: rutin MASTER.

## 9. Rujukan 3b1b (untuk ILMU-3B1B.md)
- `custom/drawings.py`: benda nyata sebagai SVGMobject (kita: primitif 3D bercahaya).
- `_2023/convolutions2/diagonal_slices.py`: Surface + SurfaceMesh + bayangan tipuan +
  clip plane + reorient kamera.
- `_2023/clt/galton_board.py`: simulasi fisika dengan updater.
- `manimlib/mobject/types/surface.py`, `manimlib/camera/camera.py`: shading dan lampu.
