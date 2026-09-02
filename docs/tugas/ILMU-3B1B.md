# Ilmu 3b1b untuk MATRA (diterjemahkan ke ManimGL kita)

Ditulis MASTER 2 Sep 2026 setelah membedah repo https://github.com/3b1b/videos
dan https://github.com/3b1b/manim, atas permintaan ARYA. Berlaku untuk SEMUA
sesi yang membuat video. Baca ini sebelum menulis storyboard.

Kenapa ini penting: video gelombang 1 menggambar perahu sebagai titik dan
sungai sebagai kotak diam. ARYA menolaknya: "siswa harus membayangkan sendiri
apa yang terjadi". Esensi MATRA adalah MEMPERLIHATKAN apa yang sebenarnya
terjadi di dunia, dan itulah keahlian 3b1b.

Fakta dasar: 3b1b memakai `manimlib` (ManimGL), pustaka yang sama dengan kita
sejak 2 Sep 2026. Kodenya berlisensi CC BY-NC-SA (non-komersial, atribusi):
kita mengambil POLA-nya, tidak menyalin adegannya. Perkakas kita yang menerjemahkan
pola itu: `manim/gl/` (tema, sinema, kamera, ilustrasi, qc). Contoh rujukan
lengkap: `manim/contoh/contoh_perahu.py`.

## Enam prinsip, masing-masing dengan bukti dan padanannya di `gl`

### 1. Gerak menyambung: benda tidak "hilang lalu muncul", ia BERUBAH
3b1b hampir tidak pernah memotong. Rumus lama bertransformasi jadi rumus baru,
grafik meluncur ke posisi baru, kamera meluncur ke sudut baru. Penonton tidak
pernah kehilangan jejak "yang ini tadi yang mana".
- Bukti: `_2023/convolutions2/continuous.py` (grafik yang digeser, bukan diganti);
  seluruh repo memakai `Transform`, `ReplacementTransform`, `frame.animate`.
- Di MATRA: pakai `Transform`/`ReplacementTransform`, `.animate`, `always_redraw`.
  `FadeOut` lalu `FadeIn` benda yang sama di tempat lain = dilarang kalau bisa digeser.

### 2. Satu warna, satu makna, sepanjang video
Di video Gaussian, f selalu biru dan g selalu kuning, dari rumus pertama sampai
grafik 3D-nya. Warna adalah nama variabel yang bisa dilihat.
- Bukti: `_2023/convolutions2/*.py`, warna disetel di satu tempat lalu dipakai
  di rumus, grafik, dan permukaan.
- Di MATRA: `AKSEN2` (biru) = besaran pertama, `AKSEN` (merah) = besaran kedua,
  `SOROT` (ungu) = kesimpulan/sudut, `REDUP` = bantu. Tetapkan di awal storyboard,
  jangan bertukar di tengah video. Panah dayung biru maka rumus `\vec{d}` juga biru.

### 3. Kamera yang bercerita
Kamera 3b1b jarang diam dan tidak pernah tersentak: satu gerakan panjang 4 sampai
10 detik, dari sudut yang memperlihatkan bentuk ke sudut tempat matematikanya
terbaca. Teks yang harus dibaca menempel di layar.
- Bukti: `_2023/convolutions2/diagonal_slices.py` baris 217 sampai 237,
  `frame.animate.reorient(theta, phi, gamma).move_to(...).set_height(...)`
  dengan `run_time=4` sampai 10; `fix_in_frame()` untuk label.
- Di MATRA: `gl.kamera.pasang_awal`, `dunia_ke_peta`, `dekati`, `putar_pelan`,
  `sudut`; teks lewat `self.hud_tambah()` atau `sinema.keterangan()` (sudah
  `fix_in_frame`). Pola wajib: MULAI dari dunia nyata (miring, dekat), lalu
  TERBANG ke sudut tempat panah dan rumus terbaca. Paling banyak satu gerakan
  kamera per babak, minimal 2 detik.

### 4. Permukaan bercahaya, dengan tiga tipuan murah
Gundukan Gaussian 3b1b terlihat "hidup" bukan karena render mahal, tapi karena:
(a) `set_shading(pantulan, kilap, bayangan)` dengan lampu kamera di (-10, 10, 10),
(b) jala tipis `SurfaceMesh` opacity 0,1 yang memberi badan,
(c) bayangan tipuan: salinan permukaan opacity 0,25 digeser 0,01 ke bawah.
- Bukti: `diagonal_slices.py` baris 374 sampai 395; `manimlib/mobject/types/surface.py`
  (`shading` bawaan (0.3, 0.2, 0.4)); `manimlib/camera/camera.py` (`light_source_position`).
- Di MATRA: `gl.ilustrasi` sudah memasang `BAYANG` untuk benda padat dan
  `BAYANG_AIR` untuk air. Untuk permukaan fungsi (Grafik Fungsi, Ruang 3D):
  `ParametricSurface(...).set_shading(0.4, 0.3, 0.5)` + `SurfaceMesh(s, (21, 21))`
  `.set_stroke(TINTA, 1, opacity=0.18)`. Lihat `manim/uji/uji_cahaya_gl.py`.

### 5. Angka terikat pada gambar
Kalau satu nilai berubah, seluruh gambar ikut berubah pada frame yang sama:
titik bergeser, panjang berubah, angka di panel berganti. Tidak ada angka yang
"dibacakan" tanpa gambarnya bergerak.
- Bukti: `_2023/clt/galton_board.py` (simulasi dengan updater), penggunaan
  `ValueTracker`, `always_redraw`, `f_always` di seluruh repo.
- Di MATRA: `ValueTracker` + `always_redraw`; angka lewat `sinema.AngkaKoma`
  (LaTeX, koma desimal) dirakit dengan `sinema.nilai_hidup`. Air dan perahu
  di contoh rujukan adalah updater: dunia tetap hidup saat narator diam.

### 6. Bangun bertahap, iris untuk memperlihatkan
3b1b memperlihatkan bagian dalam sesuatu dengan mengirisnya (bidang pengiris
bergerak) dan membangun gambar SEBELUM rumusnya muncul. Pertanyaan diajukan,
diam sejenak, baru dijawab.
- Bukti: `diagonal_slices.py` baris 380 (`surface.add_updater(lambda m:
  m.set_clip_plane(vect, -get_s()))`); pola "tanya, jeda, jawab" di semua naskahnya.
- Di MATRA: `Surface.set_clip_plane(normal, jarak)` untuk irisan; gambar dulu,
  rumus belakangan (`STANDAR-MENGAJAR.md` bagian 5); `b.jeda()` setelah pertanyaan.

## Yang TIDAK ditiru
- Latar gelap: video MATRA berlatar krem Studio Teknis, menyatu dengan situs.
- Pi creature, bahasa Inggris, font Consolas.
- Alur kerja `checkpoint_paste` dan Sublime: tidak relevan untuk render tanpa jendela.
- Menyalin kode adegannya: lisensinya non-komersial dan strukturnya untuk videonya
  sendiri. Ambil polanya, tulis ulang dengan `gl`.

## Peta nama: Manim Community lama ke ManimGL kita
| Lama (CE, DILARANG) | Sekarang (ManimGL / gl) |
|---|---|
| `from manim import *` | `from gl import *` (meneruskan manimlib) |
| `MathTex(r"...", color=..)` | `rumus(r"...")` (Tex + set_color) |
| `Text("...", color=..)` | `teks("...")` (Constantia + set_color); `Text(color=)` DIABAIKAN |
| `\text{km}` di rumus | `\mathrm{km}` (`\text{}` DIBUANG diam-diam oleh ManimGL) |
| `Create` | `ShowCreation` |
| `config.frame_width` | `FRAME_WIDTH` |
| `ThreeDScene`, `self.camera.frame` | `AdeganMatra`, `self.frame` |
| `self.move_camera(phi=, theta=)` | `kamera.sudut(self.frame, theta, phi)` di `b.main(...)` |
| `add_fixed_in_frame_mobjects` | `self.hud_tambah(...)` / `mob.fix_in_frame()` |
| `manim -ql file.py Adegan` | `manimgl file.py Adegan -w -l` |
| `Tema("terang")`, `matra_theme` | `gl.tema` (TINTA, AKSEN, ...) |
| `qc.periksa_adegan(zona, pasangan)` | `qc.periksa_adegan(self, zona, pasangan)` (sadar kamera) |
