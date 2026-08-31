# Trigonometri — Alur Belajar 10 Tahap

**Tanggal:** 31 Agustus 2026 · **Disetujui:** ARYA
**Menggantikan:** struktur lama yang langsung menyodorkan rumus `tan θ = depan/samping`

---

## Kenapa strukturnya diubah

Versi pertama halaman Trigonometri langsung menampilkan rumus tanpa pernah menjelaskan
**apa itu tangen dan dari mana asalnya**. Kritik ARYA:

> *"urutan belajarnya wajib dari konsep, pengenalan istilah sin cos tan yang memang
> asal usulnya darimana, sudut istimewa (mengapa disebut istimewa), dan seterusnya…
> Jangan langsung tiba-tiba rumus tanpa tau apa itu sin cos tan."*

Itu benar, dan itu persis penyakit yang katanya mau dilawan situs ini: siswa disodori
rumus lalu disuruh percaya.

Perubahan lain yang diminta:
- **Kata "Miskonsepsi" jangan muncul di halaman depan.** Itu istilah guru, bukan istilah
  siswa, dan terasa menghakimi sebelum mengajar. Turunkan jadi kotak **"Sering keliru"**
  di akhir tiap tahap, sebagai tips setelah siswa paham.
- **Jangan memampatkan informasi.** Ada siswa yang belajar dengan membaca, ada yang
  dengan menonton. Keduanya harus terlayani penuh — teks lengkap DAN video.
- **Banyak video pendek bertahap**, bukan satu video panjang.

---

## Sepuluh tahap

Tiap tahap = satu "halaman" di panggung kiri, dengan penjelasan lengkap di kanan.
Kolom **Video** menandai tahap yang punya animasi Manim.

| # | Tahap | Inti yang harus tertanam | Video | Widget |
|---|---|---|---|---|
| 1 | **Kenapa kita butuh ini** | Ada masalah nyata yang tidak bisa diukur langsung: tinggi pohon, lebar sungai, kemiringan tangga | ✅ | — |
| 2 | **Perbandingan yang tidak berubah** | Segitiga sebangun: ukuran boleh beda, hasil bagi sisinya sama. **Fondasi seluruh bab** | ✅ *(sudah ada)* | Segitiga Sebangun *(sudah ada)* |
| 3 | **Menamai sisi** | Depan/samping/miring bukan nama tetap — bergantung sudut mana yang dilihat | — | Penamaan Sisi: klik sudut, nama sisi ikut bertukar |
| 4 | **Lahirnya sin, cos, tan** | Dari 3 sisi ada 6 pasangan yang mungkin; tiga di antaranya diberi nama | ✅ | — |
| 5 | **Lingkaran satuan** | Kalau miring dibuat = 1, maka `cos θ = x` dan `sin θ = y`. Rumus jadi koordinat | ✅ *(tiru referensi 1)* | Lingkaran Satuan: seret titik |
| 6 | **Enam rasio sebagai panjang nyata** | tan, cot, sec, csc bukan rumus hafalan — semuanya ruas garis yang bisa ditunjuk | ✅ *(tiru referensi 1)* | — |
| 7 | **Sudut istimewa** | 30°/45°/60° "istimewa" karena lahir dari segitiga sama sisi dibelah dua dan persegi dibelah diagonal — nilainya eksak, bukan desimal | ✅ *(tiru referensi 2)* | Perjalanan Lingkaran |
| 8 | **Terbentuknya grafik sin** | Titik berputar di lingkaran → tingginya dicatat → lahir kurva sinus | ✅ *(tiru referensi 3)* | Pemutar Sudut |
| 9 | **Sin, cos, tan berdampingan** | Tiga kurva dari satu putaran yang sama; kenapa tan punya asimtot | ✅ *(tiru referensi 4)* | — |
| 10 | **Dipakai di dunia nyata** | Contoh konkret yang dekat dengan remaja: kamera ponsel, layar gawai, GPS, animasi game | — | Galeri foto + penjelasan |

**Total: 7 video Manim** (2 sudah ada, 5 baru).

---

## Referensi visual (berkas ARYA di `C:\Users\ASUS\Downloads`)

Struktur keempatnya sudah dibedah jadi lembar kontak di `qc/referensi/`.

| Berkas | Dipakai untuk tahap | Yang ditiru |
|---|---|---|
| `6 Rasion Trigonometri.mp4` (102 dtk) | 5, 6 | Lingkaran satuan; `cos θ = x`, `sin θ = y`; keenam rasio muncul sebagai **ruas garis berwarna** di lingkaran sambil daftar rumus tumbuh di kanan |
| `Unit Circle Journey (sudut istimewa).mp4` (28 dtk, potret) | 7 | Lingkaran berlabel derajat **dan** radian; jari-jari menyapu berhenti di tiap sudut istimewa; juring terisi; nilai eksak muncul di bawah |
| `Visualizing Trigonometry_ Fungsi SIN.mp4` (72 dtk) | 8 | Lingkaran **mengecil ke kiri**, sumbu grafik muncul di kanan; **garis mendatar** menghubungkan tinggi di lingkaran ke titik di grafik; kurva terlukis 0…4π |
| `Grafik SIN COS TAN.mp4` (12 dtk, potret) | 9 | Tiga panel bertumpuk (sin/cos/tan), masing-masing lingkaran + grafik, digerakkan satu sudut yang sama |

Repo rujukan tambahan: <https://github.com/adenosie/math-vids> — sintaks Manim-nya versi
lama (±2021), jadi **pola visualnya yang ditiru, bukan kodenya disalin mentah**.

---

## Aturan yang tetap berlaku

- **Gerbang video wajib** (`CLAUDE.md`): `qc.periksa_adegan` di tiap tahap adegan,
  lalu `manim/cek_video.py` dijalankan dan hasilnya DILIHAT sebelum video dinyatakan jadi.
- **Durasi animasi mengikuti durasi suara**, bukan ditebak — lihat `manim/buat_narasi.py`
  dan `audio/<topik>/durasi.json`.
- **Warna matematika satu sumber**: `manim/matra_theme.py` = `web/lib/warna.ts`.
- **Suara**: `edge-tts` `id-ID-ArdiNeural` (Indonesia asli, gratis). ElevenLabs gratis
  mengunci semua suara Indonesia di balik langganan berbayar — terverifikasi 31 Agu 2026.
- **Soal dikalibrasi dulu** ke sumber nyata sebelum ditulis.

## Susunan halaman yang baru

Panggung kiri berganti isi lewat daftar tahap (bukan 4 tab lagi):

```
[ 01 Kenapa ] [ 02 Perbandingan ] [ 03 Menamai ] … [ 10 Dunia nyata ] | [ Latihan ] [ Kuis ]
```

Kolom kanan untuk tiap tahap:
1. Judul tahap + pertanyaan pemantik
2. **Penjelasan lengkap** — prosa untuk siswa yang belajar dengan membaca. Tidak dipampatkan.
3. Angka hidup / rumus (kalau tahapnya punya widget)
4. **"Sering keliru"** — kotak tips di bagian bawah, bukan di atas
5. Tautan video kanal Indonesia yang relevan dengan tahap itu

## Risiko yang disadari

Trigonometri sedalam ini memakan **4-5 hari**. ARYA memutuskan: fokuskan Trigonometri
sampai mantap dulu, jadwal topik lain disesuaikan belakangan. Keputusan itu diambil
sadar, bukan karena tidak tahu biayanya.
