# Revisi visual dari ARYA untuk video ManimGL (catatan berjalan)

Dicatat MASTER. Setiap butir: apa yang ARYA lihat, sebab teknisnya, dan cara
memperbaikinya di perkakas bersama (`manim/gl/`), supaya perbaikannya dinikmati
semua sesi, bukan ditambal per adegan. Tambahkan butir baru di bawah, jangan
menghapus yang lama.

## 2 Sep 2026, contoh perahu (`manim/contoh/contoh_perahu.py`)

### 1. Air "kurang rapi, terlihat longgar" saat kamera sudah di atas perahu
Yang terlihat di frame pandangan atas (detik 10 sampai 44):
- Batas air dan tepi sungai bergelombang dan **ada celah krem tipis** di
  beberapa titik: permukaan air ujungnya naik-turun mengikuti riak, sedangkan
  bidang tepi (`tanah`) datar dengan sisi lurus di z = 0,18; dari atas, ujung
  air yang sedang "turun" tidak tertutup tepi, dan latar krem mengintip.
- Pola riak terlalu **besar dan kabur** untuk pandangan peta: tiga gelombang
  panjang (1,4 sampai 2,7 satuan) tampak seperti kain bergaris miring, bukan air.
  Dari dekat (pandangan samping) pola itu bagus, dari jauh terasa longgar.
- Kilap (`BAYANG_AIR` = 0,5, 0,5, 0,3) menghasilkan pita terang lebar, bukan
  kerlip kecil.

Cara memperbaiki di `gl.ilustrasi` (belum dikerjakan, menunggu giliran):
1. `tanah()` diperlebar ke arah air sekitar 0,35 satuan dan dinaikkan ke
   z = 0,22, supaya ujung air yang bergelombang selalu tertutup tepi dari sudut
   pandang mana pun. Atau: `air()` dibuat sedikit lebih lebar dari sungai
   (`lebar + 0,6`) sehingga ujungnya bersembunyi di bawah tepi.
2. `tinggi_air()` diberi **peredam di dekat tepi**: amplitudo dikalikan
   `1 - (2|y|/lebar)^4`, air tenang di pinggir, beriak di tengah (begitu sungai
   sungguhan).
3. Tambah dua komponen riak **pendek** (panjang gelombang 0,4 sampai 0,7
   satuan, amplitudo 0,01 sampai 0,015) supaya dari atas terlihat tekstur air,
   bukan pita. Resolusi permukaan naik ke (161, 81) hanya kalau riak pendek
   terlihat patah-patah.
4. Kilap dipersempit: `BAYANG_AIR` ke (0,45, 0,7, 0,25) lalu dinilai lewat
   lembar kontak pada dua sudut: samping dekat dan atas.
5. Uji dengan `manim/uji/uji_ilustrasi_gl.py` (kolam) DAN contoh perahu,
   keduanya dilihat frame per frame sebelum dinyatakan beres.

### 2. Suara latar air "tidak terdengar sama sekali"
Berkas `media/uji-480p/contoh-perahu.mp4` PUNYA jalur suara (AAC mono, narasi
-17 LUFS, latar di jeda -38 dB). Dugaan MASTER: pemutar di panel obrolan
tidak memutar suara, atau latar terlalu pelan di pengeras suara laptop.
Perlu diputar di pemutar biasa (klik dua kali di Explorer) sebelum disimpulkan.
Kalau di pemutar biasa narasi terdengar tapi air tidak: naikkan `volume=0.12`
di `gabung_audio.py` ke 0,2 dan `threshold` ducking ke 0,03, lalu dengarkan lagi.

### 3. Font: SELESAI, keputusan ARYA berubah jadi "semua LaTeX"
ARYA memutuskan (2 Sep siang) kata, angka, dan rumus semuanya LaTeX. `gl.teks`
kini `TexText`. Temuan sampingan yang penting: "`\text{}` dibuang ManimGL" pagi
tadi ternyata SALAH DIAGNOSIS; sebabnya cache LaTeX ManimGL menyimpan hasil
kosong saat MiKTeX sedang memasang font cm-super. Tambalan 3 di
`tambal_manimgl.py` menolak SVG kosong supaya tidak terulang.

### 4. Suara: ditunda ke tahap akhir (finishing), keputusan ARYA
Berkas punya jalur suara (terukur), tetapi di pemutar ARYA tidak terdengar.
Tidak dikejar sekarang; dicatat untuk gelombang 3.
