# PELAJARI BENTUK SOAL MATEMATIKA

Folder belajar (14 Sep 2026). Perintah ARYA: sebelum menulis ulang pembahasan 540
soal latihan MANTRA, Claude harus mempelajari dulu cara mathcyber1997 menulis
pembahasan. Semua PDF di sini hanya berisi SOAL; pembahasannya ada di situs yang
tertaut di tiap PDF.

| Isi | Keterangan | Git |
|---|---|---|
| `MATERI MATEMATIKA FULL/` (100 PDF), `UTBK DAN UNBK/` (32 PDF) | PDF soal yang dibeli ARYA dari mathcyber1997 (lisensi pribadi) | tidak dilacak |
| `pembahasan-web/*.md` (96 halaman) | teks utuh halaman pembahasan dari situsnya: rumus LaTeX mentah, penanda `[GAMBAR: url]`; `html/` salinan mentahnya; `tambahan/` tiga halaman di luar folder (sudut dimensi tiga, fungsi naik turun, garis singgung); `_peta.json` peta PDF ke URL | tidak dilacak |
| `gambar-web/` | contoh gambar bantu pembahasan yang ditiru (bagan kuadran, segitiga acuan, segitiga yang dicabut dari kubus) | tidak dilacak |
| `teks-pdf/` | teks hasil ekstraksi tiap PDF (rumus banyak yang rusak karena font) | tidak dilacak |
| `CATATAN-BELAJAR-PEMBAHASAN.md` | HASIL BELAJAR: kerangka pembahasan, kata sambung, gambar bantu, pola per topik, resep menulis untuk MANTRA, kesenjangan bank | dilacak |
| `alat/unduh_pembahasan.py` | mengunduh ulang halaman pembahasan dari tautan di PDF (`--ulang` untuk menimpa); parser lxml, karena html.parser memotong halaman | dilacak |
| `alat/daftar_soal_mantra.py` | mendaftar 540 pertanyaan bank MANTRA ke `alat/_daftar_soal_mantra.md` untuk dibandingkan | dilacak |

Sesi berikutnya: baca `CATATAN-BELAJAR-PEMBAHASAN.md` bagian 1, 2, dan 5 dulu
(kerangka, gambar bantu, resep), lalu bagian 4 untuk topik yang sedang ditulis.
