# Rancangan alur belajar: VEKTOR

Sesi MATRA-VEKTOR, cabang `sesi/vektor`. Ditulis 1 September 2026.
Gelombang 1: halaman saja (materi + widget + latihan + kuis), tanpa video.

## 1. Penempatan kurikulum (diverifikasi, bukan ingatan)

Diperiksa langsung dengan PyMuPDF pada berkas rujukan:

| Berkas | Hasil |
|---|---|
| `Buku Matematika Kelas 10 - Guru.pdf` | **Bab 3 "Vektor dan Operasinya"**, halaman buku 94-126. Fase E. |
| `Buku Matematika Kelas 11 - Guru.pdf` | kata "vektor" muncul di 1 halaman saja, itu pun daftar Capaian Pembelajaran. Tidak ada bab vektor. |
| `Matematika_BS_KLS_XII_Rev.pdf` | kata "vektor" nol kali. Tidak ada bab vektor. |

Jadi label "Kelas 10" pada `content/topik.ts` sudah benar dan tidak perlu diubah.

### Isi resmi Bab 3 menurut Skema Pembelajaran Buku Guru

| Subbab | JP | Pokok materi | Kosakata |
|---|---|---|---|
| A. Notasi dan Jenis Vektor | 4 | notasi, jenis vektor | vektor lawan, vektor ekuivalen, vektor berkebalikan |
| B. Vektor dan Sistem Koordinat | 4 | komponen-komponen vektor | vektor satuan, vektor posisi |
| C. Operasi Vektor | 8 | penjumlahan, pengurangan, perkalian skalar dengan vektor | resultan |

Tujuan pembelajaran resminya lima butir: menyatakan vektor dalam berbagai
representasi; menunjukkan jenis vektor; menyatakan vektor dalam komponen sistem
koordinat; melakukan operasi vektor serta menafsirkan hasilnya secara geometris
dan fisik; memakai operasi vektor untuk masalah sehari-hari.

**Yang TIDAK ada di sana:** perkalian titik (dot product), sudut antara dua
vektor, dan proyeksi. Ketiganya materi Kurikulum 2013 Matematika Peminatan
Kelas 10, dan masih keluar di UTBK/SNBT. Keputusan memasukkannya atau tidak
diserahkan ke ARYA (lihat bagian 6).

### Catatan urutan bab yang mengubah cara menulis

Vektor adalah **Bab 3**, Trigonometri **Bab 4**. Artinya siswa yang membaca
sesuai urutan buku BELUM tahu sin dan cos saat membuka topik ini. Maka:

- Panjang vektor diturunkan dari **Pythagoras**, bukan dari trigonometri.
- Arah dinyatakan dalam **derajat yang diukur busur** dan arah mata angin,
  seperti di Buku Guru, bukan lewat rumus `tan`.
- Kaitan ke trigonometri ditulis sebagai selipan opsional ("kalau kamu sudah
  membaca topik Trigonometri..."), bukan sebagai prasyarat.

Buku Guru sendiri menyebut kaitan ini: komponen vektor berhubungan dengan sinus
dan cosinus, dan vektor terutama dipakai di mekanika (fisika).

## 2. Sudut pandang topik

Satu kalimat yang dipegang seluruh topik:

> Vektor lahir karena ada besaran yang **tidak selesai dijelaskan oleh satu
> angka**. Begitu arah ikut dicatat, penjumlahan pun berubah aturannya:
> 3 tambah 4 bisa jadi 7, bisa jadi 5, bisa jadi 1.

Itu juga jawaban atas pertanyaan kartu beranda: "Kenapa dua panah bisa
dijumlahkan?", dan lawan dari salah paham "vektor itu cuma panah biasa".

## 3. Dua belas materi

Materi 11 dan 12 adalah **lanjutan** dan bisa dibuang utuh tanpa merusak
sepuluh materi sebelumnya (lihat bagian 6).

| # | Judul | Isi inti | Widget |
|---|---|---|---|
| 1 | Angka saja tidak cukup | Perahu menyeberang sungai berarus: didayung lurus, mendaratnya jauh di hilir. Besaran berarah (perpindahan, kecepatan, gaya) lawan besaran biasa (massa, suhu, waktu). 3 tambah 4 tidak selalu 7. | `PerahuSungai` |
| 2 | Panah yang boleh dipindah | Ruas garis berarah, titik pangkal dan ujung, notasi (huruf tebal, huruf berpanah, AB). Vektor ekuivalen, vektor lawan, vektor berkebalikan, vektor nol. Bentuk yang BUKAN vektor: garis lengkung, garis berkepala dua, garis patah. | `PanahBerpindah` |
| 3 | Memecah panah jadi dua langkah | Komponen x dan y, penulisan baris dan kolom, vektor dari dua titik (ujung dikurangi pangkal). Inilah yang membuat vektor bisa dihitung, bukan digambar terus. | `PecahKomponen` |
| 4 | Panjang panah itu Pythagoras | Besar vektor akar(x kuadrat tambah y kuadrat), arah diukur dari sumbu x positif dan dari mata angin. Panjang selalu tidak negatif. | `PanjangDanArah` |
| 5 | Arah tanpa panjang | Vektor satuan, i dan j, vektor posisi. Membagi vektor dengan panjangnya sendiri. Komponen 3D (i, j, k) muncul sebagai angka, bukan gambar ruang. | `VektorSatuan` |
| 6 | Menjumlah itu menyambung perjalanan | Metode segitiga dan poligon, resultan. Ujung ke pangkal. Dengan komponen: tinggal jumlahkan angkanya. | `SambungPanah` |
| 7 | Dua yang bekerja bersamaan | Metode jajar genjang, dan kapan memakai yang mana: berurutan pakai segitiga, serentak pakai jajar genjang. Dua orang menarik satu peti. | `JajarGenjang` |
| 8 | Mengurangi itu menambah lawannya | a kurang b sama dengan a tambah (negatif b). "Dari A ke B" adalah posisi B dikurangi posisi A. Kecepatan relatif secara ringan. | `SelisihPanah` |
| 9 | Dikali angka: panjang berubah, arah tetap | Perkalian skalar. Pengali negatif membalik arah, pengali nol memberi vektor nol, dua vektor yang berkelipatan pasti sejajar. | `KaliSkalar` |
| 10 | Vektor di dunia nyata | Perahu di Materi 01 dituntaskan berhitung. Pesawat melawan angin, dua tali menahan lampu, gerak lempeng bumi (contoh asli Buku Guru, 5 cm per tahun). | galeri |
| 11 | *(lanjutan)* Seberapa searah? | Perkalian titik: x1x2 tambah y1y2, sama dengan hasil kali panjang dikali kosinus sudutnya. Tegak lurus memberi nol. Hasilnya angka, bukan panah. | `PerkalianTitik` |
| 12 | *(lanjutan)* Bayangan satu panah pada panah lain | Panjang proyeksi dan vektor proyeksi. | `Proyeksi` |

### "Sering keliru" yang sudah punya bukti

Diambil dari kotak Ayo Berpikir Kritis dan catatan guru di Buku Guru, bukan
karangan sendiri:

| Materi | Yang sering keliru |
|---|---|
| 2 | Menganggap dua panah berbeda karena letaknya berbeda. Padahal yang menentukan hanya besar dan arah. |
| 2 | Menyangka panah berlawanan arah pasti vektor lawan. Harus sama panjang juga. |
| 3 | Menyamakan vektor dengan titik koordinat. Vektor butuh dua titik, titik cuma satu. |
| 4 | Menjumlahkan panjang dua vektor untuk mendapat panjang resultan. |
| 6 | Menyambung panah pangkal ke pangkal, bukan ujung ke pangkal. |
| 8 | Membalik urutan: menulis A dikurangi B untuk perjalanan dari A ke B. |
| 9 | Mengira dikali bilangan negatif membuat panjangnya negatif. |

Kata "miskonsepsi" tidak dipakai. Judul kotaknya "Sering keliru", dan letaknya
di bawah setelah siswa paham.

## 4. Yang dibangun

```
web/content/vektor/{tahap,latihan,kuis,index}.ts
web/components/widget/vektor/*.tsx        (11 widget + bingkai bersama)
web/components/topik/PanggungVektor.tsx   (penyetelan widget)
web/content/daftar-isi.ts                 (satu baris entri)
web/content/topik.ts                      (siap: true)  -> lihat catatan
alat/cek_vektor.py                        (berkas BARU, pemeriksa sympy)
docs/tugas/laporan/MATRA-VEKTOR.md
```

**Bingkai widget.** `components/widget/limit/koordinat.ts` dan `Bidang.tsx`
sudah memecahkan masalah bingkai menyesuaikan otomatis dan penunjuk skala.
Berkas itu milik topik lain, jadi tidak diimpor lintas folder. Salinannya
disesuaikan ke `components/widget/vektor/bingkai.ts`. Kalau MASTER kelak mau
menaikkannya jadi milik bersama, silakan; dicatat di laporan.

**`content/topik.ts` bukan milik saya** (satu berkas, dipakai semua topik).
Baris `siap: true` untuk vektor dicatat sebagai permintaan ke MASTER. Entri
`daftar-isi.ts` satu baris memang jatah sesi topik menurut tabel kepemilikan.

## 5. Soal: latihan dan kuis

- **Latihan dalam halaman**: 4 soal pilihan ganda A sampai E, dengan pembahasan
  bertahap. Kelima pilihan bukan asal salah: tiap pengecoh adalah satu
  kekeliruan pada tabel "sering keliru" di atas.
- **Kuis**: bank 32 soal, empat tingkat (mudah, sedang, sulit, sangat sulit),
  8 soal per sesi.
- **Kalibrasi dulu, baru menulis.** Aturan proyek: soal buatan Claude cenderung
  terlalu mudah. Sebelum satu soal pun ditulis, tingkat kesulitan disandingkan
  dengan Latihan 3.1 sampai 3.6 di Buku Guru Kelas 10 dan soal Big Book SMA.
  mathcyber1997.com diblokir pemeriksa bot, jadi tidak dipakai kecuali ARYA
  menempelkan sendiri soalnya.
- **Semua angka diperiksa mesin.** `alat/cek_vektor.py` dibuat SEBELUM soal
  ditulis, meniru pola `alat/cek_soal.py`: sympy memeriksa komponen, panjang,
  resultan, hasil kali skalar, dan (kalau materi 11-12 jadi) hasil kali titik
  serta proyeksi. Kode keluar bukan nol kalau ada yang salah.

## 6. Keputusan ARYA (1 September 2026, gerbang rancangan lolos)

1. **Cakupan: 12 materi.** Sepuluh materi inti Kelas 10, ditambah dua materi
   lanjutan (perkalian titik dan proyeksi) yang **ditandai jelas** sebagai di
   luar Kurikulum Merdeka dan ditujukan untuk persiapan UTBK. Penandanya ditulis
   di dalam materi itu sendiri, bukan cuma di judul, supaya siswa yang
   mencocokkan dengan buku sekolahnya tidak bingung.
2. **Pembuka Materi 01: perahu menyeberang sungai.** Didayung lurus ke seberang,
   mendarat jauh di hilir.
3. **Materi penutup: foto nyata**, seperti Materi 10 Trigonometri. Konsekuensi
   yang diterima sejak awal, bukan ditunda:
   - Foto diambil dari Wikimedia Commons dengan lisensi terbuka, sumber dan
     lisensinya dicatat di `web/public/gambar/sumber.json` (pola yang sudah ada).
   - **Dikompres sejak awal**, sasaran di bawah 150 KB per foto. PROGRESS
     mencatat foto Materi 10 Trigonometri menumpuk sampai sekitar 1,5 MB dan
     belum dikompres. Utang itu tidak ditambah dari sini.

## 7. Batas dengan MATRA-RUANG-TIGA-DIMENSI

Milik sesi ini: konsep dan operasi vektor, panggung utama 2D. Komponen tiga
dimensi hanya muncul sebagai angka di Materi 05, tanpa gambar ruang, tanpa
kubus, tanpa jarak titik ke bidang. Semua yang berupa kedudukan, jarak, dan
sudut pada bangun ruang milik sesi ruang 3D. Tidak ada yang perlu direbutkan
karena Buku Guru pun memisahkannya di bab yang berbeda.

## 8. Selesai gelombang 1 artinya

- Halaman `/topik/vektor` tampil utuh lewat entri `daftar-isi.ts`.
- Semua angka lolos `alat/cek_vektor.py`, semua soal salinan bersumber.
- Potret layar 375 piksel dan 1366 piksel sudah DIBUKA dan dinilai mata.
- `rtk proxy "npx tsc --noEmit"` dan `rtk proxy "npm run build"` lolos di `web/`.
- Laporan terisi, commit rapi.
