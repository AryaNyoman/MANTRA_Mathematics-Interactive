# Storyboard video Materi 08: Simpangan baku (persegi yang tumbuh kuadrat)

Sesi MATRA-STATISTIKA, 2 September 2026 malam. ManimGL, pandangan datar.
Adegan: `Simpangan8`, berkas `manim/scenes/statistika8_simpangan.py`.
Naskah: `manim/narasi/statistika8-simpangan.json`.

## Urutan kerja dibalik, dan kenapa

Pada video Materi 05 saya menulis narasi dulu, baru merancang gerak. Akibatnya
narasi lebih panjang daripada gerak, dan tiap babak menyisakan 2 sampai 4 detik
yang layarnya tidak berkembang. Kali ini gerak dirancang lebih dulu, di dokumen
ini, dan narasinya ditulis SEPANJANG gerak itu.

## Data (sudah lolos dua pemeriksa sebagai `t08-mesin-a` dan `t08-mesin-b`)

| | isi lima botol (ml) | simpangan | kuadrat | jumlah | varian | simpangan baku |
|---|---|---|---|---|---|---|
| Mesin A | 498 499 500 501 502 | -2 -1 0 1 2 | 4 1 0 1 4 | 10 | 2 | 1,41 ml |
| Mesin B | 490 495 500 505 510 | -10 -5 0 5 10 | 100 25 0 25 100 | 250 | 50 | 7,07 ml |

Mean kedua mesin 500 ml, sama persis. Itulah jebakannya.

## Gagasan pokok yang harus tertanam

Simpangan baku bukan rumus berlapis yang harus dihafal. Ia jawaban atas satu
masalah yang muncul sendiri: **jarak ke mean tidak bisa dijumlah, sebab
jumlahnya selalu nol.** Kuadrat dipakai untuk membuang tanda minus, dan akar
dipakai untuk mengembalikan satuannya. Tiap langkah punya sebab, dan sebabnya
kelihatan di layar sebelum rumusnya ditulis.

Momen puncaknya: **persegi tumbuh kuadrat.** Sisi dua kali lipat membuat luas
empat kali lipat. Itu sebabnya simpangan baku sangat peka terhadap pencilan,
dan itu tidak bisa dilihat dari rumus, hanya dari gambar.

## Satu warna satu makna

| Warna | Makna |
|---|---|
| `AKSEN2` biru | Mesin A, dan semua yang miliknya |
| `AKSEN` bata | Mesin B, dan semua yang miliknya |
| `SOROT` ungu | mean 500, satu-satunya yang dimiliki bersama |
| `TINTA` / `REDUP` | garis bilangan, angka, keterangan |

Perhatikan: di video Materi 05 bata berarti "mean". Di sini mean jadi ungu dan
bata jadi Mesin B. Itu tidak melanggar aturan satu warna satu makna, sebab
aturannya berlaku DI DALAM satu video. Yang dilarang adalah bertukar makna di
tengah video.

## Skala

1 ml = 0,30 satuan dunia. Garis bilangan 488 sampai 512 (7,2 satuan).
Persegi terbesar Mesin B bersisi 10 ml = 3,0 satuan; barisnya 9,0 satuan.
Bingkai tinggi 6,2 (lebar 11,0), jadi baris persegi terlebar masih muat.

## Sebelas babak, GERAK dulu

| # | id | Gerak yang terjadi | Yang jadi terlihat |
|---|---|---|---|
| 1 | `buka` | garis bilangan tumbuh, 5 botol A muncul di atas garis, 5 botol B di bawah garis; kamera terbang dari miring ke datar | dua mesin, sebarannya sudah beda tanpa dijelaskan |
| 2 | `sama` | garis ungu turun di 500, dua label "mean 500" muncul | yang membuat soal ini menjebak: pusatnya sama |
| 3 | `simpangan` | dari tiap botol tumbuh ruas mendatar ke garis 500 | jarak ke pusat, punya B jelas lebih panjang |
| 4 | `nol` | ruas kiri dan kanan meluncur ke satu baris tally lalu saling menghapus, sisa nol untuk kedua mesin | kenapa menjumlah simpangan gagal |
| 5 | `kuadrat` | tiap ruas tumbuh jadi PERSEGI bersisi ruas itu | tanda minus hilang, dan ukurannya jadi luas |
| 6 | `luas` | kesepuluh persegi terangkat, berjajar jadi dua baris | 10 lawan 250, terlihat sebagai luas bukan angka |
| 7 | `varian` | baris dibagi 5, tersisa satu persegi rata-rata tiap mesin | varian 2 lawan 50 |
| 8 | `empatkali` | dua persegi Mesin B (sisi 5 dan sisi 10) disandingkan, yang kecil disalin 4 kali dan ternyata pas mengisi yang besar | sisi 2 kali lipat, luas 4 kali lipat |
| 9 | `akar` | persegi varian menyusut jadi persegi bersisi 1,41 dan 7,07 | akar mengembalikan satuan ke ml |
| 10 | `baca` | pita ±1,41 dan ±7,07 digambar di sekitar 500, botol yang di luar pita menyala | angkanya jadi kalimat |
| 11 | `tutup` | pita B melewati garis 500 ml label botol; jawaban pertanyaan pembuka | kenapa Mesin B ditolak |

Babak 8 adalah bagian yang paling tidak bisa digantikan tulisan: empat salinan
persegi kecil yang PAS mengisi persegi besar. Itu bukti "kuadrat" yang bisa
dilihat, bukan dihafal.

## Yang membuat dunia tetap hidup

Botol bergoyang tipis lewat updater yang menggeser SELISIH, pola yang sama
dengan napas siswa di video Materi 05, supaya tetap benar kalau botolnya
dipindah animasi lain.

## Gerbang mutu

`cek_kode.py --dalam` bersih, `qc.periksa_adegan` di tiap babak dan di kedua
ujung tiap gerakan kamera, `samples = 4` (penghalus tepi), render `manimgl -w -l`,
lembar kontak DIBUKA dan dinilai, `gabung_audio.py --uji`, subtitle dengan medan
`tulis` memakai lambang (misalnya "√50 = 7,07", bukan "akar lima puluh").

Titik rawan yang sudah saya duga: persegi Mesin B bersisi 3 satuan mudah
menabrak panel HUD di kanan atas dan keterangan di bawah; baris persegi 9
satuan mudah keluar bingkai; dan pada babak 4 ruas yang saling menghapus mudah
terbaca sebagai "hilang" bukan "saling meniadakan".
