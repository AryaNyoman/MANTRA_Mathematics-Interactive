# Berkas Lomba PPPMI 2026 untuk MANTRA (rancangan, 13 Sep 2026)

Disetujui ARYA lewat tanya-jawab 13 Sep 2026. Pedoman lombanya:
`C:\Users\ASUS\Downloads\Pedoman Lomba Inovasi Media dan Pembelajaran
Matematika_PPPMI 2026.pdf` (18 halaman, dibaca utuh).

## Keputusan yang sudah diambil

| Hal | Keputusan |
|---|---|
| Divisi | **A1 Media Digital Interaktif** (satu karya satu divisi; ketua hanya boleh satu karya) |
| Peserta | Individu: Nyoman Arya Sejati, mahasiswa aktif S2 Pendidikan Matematika, Universitas Pendidikan Ganesha (Undiksha) |
| Nama folder pengiriman | `A1_NyomanAryaSejati_UNDIKSHA_MANTRA` (aturan 6.2: KodeDivisi_NamaKetua_SingkatanPT_JudulSingkat), isinya hanya versi final |
| Data pribadi (NIM, koordinator prodi, tanggal) | ditulis `[kurung]`, ARYA mengisi sendiri di Word |
| Uji coba siswa | TIDAK (ARYA tidak punya waktu). Aspek "bukti implementasi" diisi argumentasi dampak; alternatif murah (2-3 teman/dosen mencoba 15 menit) ditawarkan, tidak wajib |
| Repo GitHub (`AryaNyoman/MANTRA_Mathematics-Interactive`, sekarang PRIVAT) | dijadikan PUBLIK oleh ARYA sendiri setelah LICENSE, README, dan pemindaian rahasia siap; Claude tidak mengubah visibilitas |
| Lisensi karya | kode MIT; isi materi, video, dan gambar CC BY-NC-SA 4.0 (usulan, menunggu ARYA saat LICENSE dibuat) |
| Suara narasi | DIUBAH 14 Sep: ARYA memilih (b), berlangganan ElevenLabs, suara semua video dibuat ulang di sesi lain. Dokumen menyebut ElevenLabs sebagai suara FINAL dan edge-tts (Microsoft `id-ID-ArdiNeural`) sebagai tahap draf/revisi, keduanya diungkap. Syarat: sebelum 25 Sep semua 57 video di situs sudah bersuara ElevenLabs; kalau tidak, dokumen dikembalikan ke edge-tts |
| Halaman Tentang situs | kartu ElevenLabs menjadi benar begitu semua video bersuara ElevenLabs; tidak diubah (keputusan (b) 14 Sep). Kalau penggantian gagal sebelum kirim, kartu harus diganti kredit edge-tts |
| Video demo 5-7 menit | dua jalur sekaligus: (A) naskah + daftar adegan berstempel waktu untuk direkam ARYA sendiri; (C) rekaman layar 1080p tanpa suara dibuat Claude lewat Playwright, ARYA mengisi suara, Claude menggabungkan |
| Format dokumen | Word (.docx, bisa diedit dan ditandatangani) + PDF (yang dikirim). PDF diekspor lewat Word yang terpasang |
| Lokasi kerja | `D:\PPPMI-2026\kerja\` (draf, skrip, tangkapan layar) dan `D:\PPPMI-2026\A1_NyomanAryaSejati_UNDIKSHA_MANTRA\` (final). Di repo hanya rancangan ini, LICENSE, README, dan catatan PROGRESS |

## Fakta karya yang dikutip (dihitung 13 Sep 2026, jangan ditebak)

- 9 bab: Perbandingan Trigonometri, Vektor dan Operasinya, Grafik Fungsi,
  Statistika, Limit, Ruang Tiga Dimensi, Transformasi Geometri, Turunan,
  Integral. Kelas 10 sampai 12.
- 105 materi (`web/content/*/tahap*.ts`), tiap materi punya widget
  interaktif (104 widget berbeda), kotak "Yuk bereksperimen" (86) dan kotak
  "Sering keliru" (85).
- 57 video pembelajaran dirujuk materi, semua 1080p60 mp4 H.264 + AAC,
  total 205 menit, rata-rata 3,6 menit, tiap video bersubtitle vtt dan
  berposter. (58 dirender; `transformasi5-matriks` tidak dirujuk.)
- 540 soal kuis berjenjang (60 per bab, 15 per tingkat, pembahasan bergambar; 14 Sep, semula 272) + 38 soal latihan
  berpembahasan; pilihan lima (A-E), pengecoh = kekeliruan yang nyata.
- Tanpa akun, tanpa basis data; kemajuan di localStorage.
- Teknologi: Next.js 16, React 19, TypeScript, Tailwind v4 (situs);
  ManimGL 1.7.2, LaTeX (MiKTeX), edge-tts, FFmpeg (video); Vercel (hosting).
- Alat mutu otomatis: 27 skrip `alat/cek_*.py|mjs` (kunci jawaban soal
  dihitung ulang mesin, urutan belajar, sinkron video, subtitle, aset) dan
  `manim/cek_kode.py`, `cek_video.py`, `qc.periksa_adegan` (render gagal bila
  ada teks bertindih atau keluar bingkai).
- Alamat tayang: https://mantra-matematika.vercel.app (alias
  https://matra-eight.vercel.app). Dibangun sejak akhir Agustus 2026.
- Penulis: Nyoman Arya Sejati, Undiksha (tercantum di README dan halaman
  Tentang).

## Berkas yang dibuat (Word + PDF kecuali disebut lain)

| No | Berkas | Isi | Sumber isi |
|---|---|---|---|
| 01 | Deskripsi Karya (3-5 hlm) | masalah, sasaran, tujuan, kebaruan, landasan (Triple E Kolb, representasi ganda, beban kognitif dan contoh terselesaikan, retrieval practice), cara kerja, potensi dampak, tangkapan layar | README, CLAUDE.md, STANDAR-MENGAJAR.md, STANDAR-VIDEO-V3.md |
| 02 | Skenario Pembelajaran | satu pertemuan 2 x 45 menit Trigonometri sub-bab A (Materi 01-04): tujuan, tahapan, peran media per tahap, pertanyaan/tugas, asesmen (kuis MANTRA), antisipasi respons keliru; tabel ringkas 9 bab | `web/content/trigonometri/tahap.ts`, `kuis.ts`, `subbab.ts` |
| 03 | Petunjuk Penggunaan | operasional: membuka, Peta Materi, halaman materi, video (subtitle, tombol, HP), widget dan kendali, kuis dan skor, kebutuhan perangkat, aksesibilitas | situs tayang (tangkapan layar) |
| 04 | Pernyataan Orisinalitas dan Penggunaan AI | format Lampiran 5 persis; tabel AI: nama alat, tujuan, bagian yang dibantu, cara verifikasi dan perbaikan oleh peserta; tanda tangan ketua dan koordinator prodi | PROGRESS.md, REVISI-ARYA-*.md, gerbang mutu |
| 05 | Atribusi dan Lisensi | pihak ketiga (ManimGL MIT, Next.js MIT, React MIT, Tailwind MIT, Newsreader dan Space Grotesk OFL, edge-tts GPL-3 + suara Microsoft, FFmpeg LGPL/GPL, MiKTeX, Vercel), sumber soal (Buku Panduan Guru Kemendikbudristek 2021, mathcyber1997 + nama penulis), buku rujukan (dibaca, tidak disalin), lisensi MANTRA sendiri | `web/package.json`, `web/content/**` medan `sumber` |
| 06 | Naskah Video Demo (PDF) + rekaman layar (mp4 tanpa suara) | naskah per adegan berstempel waktu 5-7 menit; rekaman 1920x1080 kursor terlihat | situs tayang |
| 07 | Jawaban Formulir dan Daftar Periksa (PDF) | teks siap salin untuk formulir daring; 12 butir Lampiran 1 dengan status dan siapa yang mengerjakan | pedoman |
| 08 | LICENSE + README (di repo) | lisensi ganda, bagian "cara menjalankan" sudah ada di README; pemindaian rahasia sebelum publik | repo |

Alur video demo: masalah (30 dtk) -> apa itu MANTRA dan Peta Materi -> satu
materi utuh (cuplikan video bersubtitle, bacaan berblok, "Yuk
bereksperimen" di widget, "Sering keliru", kuis dan skor tersimpan) -> dua
bab lain sekilas (Limit, Statistika) -> tampilan HP -> cara kerja singkat
dan peran AI (jujur) -> dampak dan penutup.

## Prinsip menulis

- Jujur tentang AI: Claude (Claude Code, Anthropic) menulis kode situs,
  adegan Manim, draf narasi dan materi; ARYA merancang, memutuskan,
  meninjau tiap video frame demi frame, mengoreksi (tercatat di PROGRESS.md
  dan docs/tugas/REVISI-ARYA-*.md). Tidak ada klaim uji coba yang tidak
  terjadi.
- Pembagian peran yang ditulis di semua dokumen (pertanyaan ARYA 13 Sep):
  ManimGL adalah MESIN yang menggambar frame; kode adegan yang
  mengendalikannya (`manim/scenes/*.py`) ditulis Claude; ARYA sutradara
  (alur, standar, penolakan, persetujuan). Jangan menulis "Claude hanya
  untuk ide": tidak cocok dengan README, halaman Tentang, dan pesan commit
  yang sudah menyebut Claude menyusun kode. Desain UI/UX dirancang bersama
  Claude (docs/desain-mantra), pilihan akhir ARYA. Hosting Vercel disebut
  di cara kerja dan atribusi.
- Kata "miskonsepsi" boleh di dokumen juri (rubrik memakainya), tetap
  dilarang di halaman siswa.
- Tanpa em-dash. Bahasa Indonesia baku untuk juri, ringkas.
- Nama kurikulum tidak disebut di situs; di dokumen juri boleh menyebut
  sumber buku panduan guru Kemendikbudristek 2021 sebagai rujukan.

## Urutan pengerjaan (sekaligus rencana kerja, tanpa berkas plan terpisah)

1. Tangkapan layar situs tayang (desktop dan HP) lewat playwright-cli ke
   `D:\PPPMI-2026\kerja\layar\`.
2. Tulis 01 sampai 05 dan 07 sebagai .docx (skill docx), ekspor PDF lewat
   Word. Periksa 01 tidak lebih dari 5 halaman.
3. Naskah video demo (06) + skrip Playwright perekam layar; render mp4
   tanpa suara; cek durasi 5-7 menit dan tonton lembar kontaknya.
4. LICENSE dan README di repo; pindai rahasia (`git log -p` untuk kata
   key/token/secret); laporkan, ARYA yang mengubah visibilitas.
5. Perbaikan halaman Tentang (kredit suara) HANYA setelah ARYA mengizinkan;
   deploy mengikuti alur biasa.
6. Setelah ARYA mengirim rekaman suara: gabung dengan ffmpeg, salin semua
   versi final ke folder pengiriman, cocokkan dengan daftar periksa.
7. Catat di PROGRESS.md.

## Jadwal

13-15 Sep draf dokumen dan naskah; 15-16 Sep ARYA mengoreksi, Claude
merekam layar; 14-20 Sep ARYA: surat aktif, tanda tangan koordinator,
rekam suara; 21-22 Sep gabung video dan PDF final; 23-24 Sep ARYA unggah
ke Drive ("siapa pun dengan tautan"), isi formulir di
https://go.undiksha.ac.id/lomba_PPMI. Tenggat 25 Sep 2026 pukul 23.59 WIB;
sisakan satu hari cadangan.

## Yang hanya bisa dikerjakan ARYA

Surat keterangan mahasiswa aktif atau pengantar koordinator prodi; tanda
tangan pernyataan (ketua dan koordinator prodi); rekaman suara video demo;
mengisi formulir daring; mengunggah folder ke Google Drive dan mengecek
tautan bisa dibuka tanpa login; mengubah repo jadi publik; menyiapkan diri
untuk wawancara juri (kepemilikan, keputusan desain, keaslian proses).
