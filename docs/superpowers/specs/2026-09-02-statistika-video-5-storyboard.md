# Storyboard video Tahap 5: Mean, median, modus (jungkat-jungkit)

Sesi MATRA-STATISTIKA, 2 September 2026. ManimGL.
Aturan yang dipatuhi: `docs/tugas/STANDAR-ILUSTRASI-VIDEO.md` (8 aturan),
`docs/tugas/ILMU-3B1B.md` (6 prinsip). Contoh rujukan: `manim/contoh/contoh_perahu.py`.

Adegan: `Pemusatan5`, berkas `manim/scenes/statistika5_pemusatan.py`.
Naskah: `manim/narasi/statistika5-pemusatan.json`, 11 segmen, sekitar 105 detik.

## Kenapa video ini ada

Halaman Tahap 5 sudah membuktikan mean adalah titik seimbang lewat widget yang
bisa digeser. Yang TIDAK bisa dilakukan halaman: memperlihatkan papan itu benar
benar miring karena beban, dengan berat yang terasa. Itu pekerjaan video.

Kalimat yang harus tertanam: **rata-rata bukan "jumlah dibagi banyaknya", itu
cuma cara menghitungnya. Rata-rata adalah titik tempat data seimbang.**

## Data

Nilai ulangan delapan siswa: 4, 5, 6, 7, 7, 8, 8, 11.
Jumlah 56, mean 7, median 7, modus 7 dan 8 (dua-duanya, dan itu disebut jujur).
Sudah lolos dua pemeriksa sebagai `t05-ulangan`.

Simpangan terhadap 7: -3, -2, -1, 0, 0, +1, +1, +4. Jumlahnya nol.
Terhadap 8: -4, -3, -2, -1, -1, 0, 0, +3, jumlahnya -8, jadi papan jatuh ke kiri.
Terhadap 6: -2, -1, 0, +1, +1, +2, +2, +5, jumlahnya +8, jatuh ke kanan.

## Satu warna satu makna (aturan 5)

| Warna | Makna, dipegang sepanjang video |
|---|---|
| `AKSEN2` biru `#3A6EA5` | data: delapan siswa dan letaknya |
| `AKSEN` merah bata | mean: penopang, papan, panah simpangan |
| `SOROT` ungu | median: sekat pembelah |
| `TINTA` / `REDUP` | lantai, garis bilangan, angka bantu |

**Modus sengaja tidak diberi warna.** Ia ditandai BENTUK: siswa yang nilainya
sama berdiri bertumpuk ke belakang, jadi posisi 7 dan 8 terlihat sebagai barisan
paling tebal. Ini mengikuti prinsip 3b1b nomor 6, perlihatkan jangan diberi tahu,
sekaligus menjaga aturan satu warna satu makna: tiga warna untuk tiga peran, dan
peran keempat diselesaikan tanpa warna.

## Benda yang dipakai

Dari `gl.ilustrasi`: `orang` (delapan, biru), `lantai_kisi` (latar hidup),
`balok` (papan jungkat-jungkit), `silinder` (angka penanda di lantai).

**Satu benda baru perlu ditambahkan:** `penopang(lebar, tinggi, warna)`, prisma
segitiga alas di z = 0, puncaknya sepanjang sumbu y, untuk tumpuan papan.
Ditulis DI AKHIR `manim/gl/ilustrasi.py` sesuai aturan 1, MASTER yang
menggabungkan. Tanpa itu tumpuan harus dipalsukan dengan balok, dan papan yang
bertumpu pada balok kotak tidak terbaca sebagai jungkat-jungkit.

## Sebelas babak

| # | id | Isi gambar | Kamera | Matematika di atas gambar |
|---|---|---|---|---|
| 1 | `sapa` | Delapan siswa berdiri di lantai kisi, garis bilangan 3 sampai 12 tergambar di lantai | miring dekat, `pasang_awal(theta=-30, phi=70)` | judul pembuka, lalu keterangan |
| 2 | `berbaris` | Siswa bergeser ke posisi nilainya masing masing, yang sama bertumpuk ke belakang | SATU gerakan 3 detik `dunia_ke_peta` | angka nilai muncul di lantai |
| 3 | `modus` | Barisan 7 dan 8 terlihat paling tebal | diam | keterangan: dua modus, dan itu boleh |
| 4 | `median` | Sekat ungu meluncur masuk di antara siswa ke-4 dan ke-5 | diam | rumus HUD: 4 orang di kiri, 4 di kanan |
| 5 | `tanya` | Gambar dibiarkan hidup, tidak ada yang ditambah | `dekati` pelan 2 detik | pertanyaan, lalu JEDA 1,4 detik |
| 6 | `papan` | Papan merah meluncur ke bawah kaki siswa, penopang muncul di 8 | diam | keterangan: tumpuan ditaruh di 8 |
| 7 | `miring` | Papan berputar, jatuh ke kiri | diam | panah simpangan muncul, kiri jelas lebih panjang |
| 8 | `geser` | Penopang meluncur dari 8 ke 7, papan mendatar | diam | angka hidup: letak tumpuan 8 turun ke 7 |
| 9 | `bukti` | Papan mendatar, panah kiri dan kanan berdampingan | `sudut` sedikit lebih rendah, 2,5 detik | rumus HUD: 3+2+1 = 6 dan 1+1+4 = 6 |
| 10 | `rumus` | Gambar tetap ada, panel HUD tumbuh | diam | rumus mean = 56 : 8 = 7, BARU muncul di sini |
| 11 | `tutup` | Papan tetap seimbang, updater menjaga papan bergoyang tipis | diam | tiga jawaban satu pertanyaan, warna SOROT |

Perhatikan babak 10: rumus mean baru muncul di menit terakhir, setelah gambarnya
membuktikan artinya. Itu urutan "kenapa dulu, bagaimana kemudian" yang dipuji
MASTER pada halaman saya, dipindahkan ke video.

## Yang membuat dunia tetap hidup (aturan 2)

Tidak ada air di adegan ini, jadi nyawanya dari dua updater:
1. Siswa bernapas: seluruh kelompok naik turun 0,03 satuan, beda fase per orang.
2. Setelah babak 8, papan bergoyang tipis di sekitar seimbang, seperti timbangan
   yang baru berhenti. Ini juga yang menjaga babak 11 tidak jadi waktu mati.

## Gerbang mutu yang akan dijalankan (aturan 8)

`cek_kode.py --dalam` bersih, `qc.periksa_adegan` di akhir tiap babak dan di
kedua ujung tiap gerakan kamera, render `manimgl -w -l`, `cek_video.py` lalu
lembar kontak DIBUKA dan dinilai frame per frame, `gabung_audio.py statistika5
Pemusatan5 --uji`. Cacat sisa disebut di laporan.

Titik rawan yang sudah saya duga dan akan saya periksa khusus di lembar kontak:
- angka di lantai terbaca terbalik atau gepeng saat kamera miring;
- panah simpangan menembus badan siswa, bukan lewat di atasnya;
- papan yang miring menutupi angka garis bilangan di bawahnya;
- siswa yang bertumpuk ke belakang saling tertutup habis dari pandangan peta.
