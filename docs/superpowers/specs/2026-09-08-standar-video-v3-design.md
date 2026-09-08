# Standar Video versi 3: menulis ulang 58 video MANTRA

**Tanggal:** 8 September 2026 · **Diputuskan:** ARYA, setelah menonton revisi Turunan 01 sampai 03 · **Ditulis:** MATRA-MASTER

## Keputusan ARYA (8 Sep 2026)

| Pertanyaan | Jawaban |
|---|---|
| Cakupan | SEMUA 58 video di sembilan topik ditulis ulang dalam gaya baru; tenggat 12 Sep diterima lewat |
| Urutan | catatan dan perkakas disatukan DULU oleh MASTER, baru sesi-sesi mulai |
| Sesi | delapan sesi paralel: tujuh cabang yang ada plus dua baru untuk Trigonometri dan Limit |
| Tinjauan | video PERTAMA tiap sesi ditonton dan disetujui ARYA (delapan sekaligus), sesudahnya dinilai per kelompok dua sampai tiga video |
| Segar-ingat | tiap video mengingat materi sebelumnya bila perlu, "seolah-olah setiap video mengingat materi sebelumnya agar siswa makin paham" |
| Durasi | 3 sampai 6 menit, mengikuti kebutuhan belajar, bukan diisi pengulangan |

Contoh yang disetujui: `turunan2-garis-singgung` (5:56), lalu `turunan1` (5:52) dan `turunan3` (5:55), semuanya di worktree `materi-turunan-b8c515`.

## Apa yang sebenarnya disukai ARYA (dua lapis)

1. **Pengajaran:** asal tiap rumus dibuktikan di layar, contoh angka dulu baru huruf, penghubung ke materi sebelumnya disebut lengkap dengan nama konsepnya, tempo tenang, pengetahuan lama yang mengecoh diantisipasi (Pythagoras lawan kemiringan).
2. **Teknis:** animasi dipicu pada detik KATA diucapkan (WordBoundary mesin suara), bukan per babak. Inilah yang membuat gambar dan suara akur sampai 0,03 detik.

Lapis kedua baru ada sebagai tiga pasang alat khusus per video. Tanpa disatukan, delapan sesi akan melahirkan delapan salinan yang menyimpang.

## Rancangan

### 1. Dokumen standar: `docs/tugas/STANDAR-VIDEO-V3.md`
Menggantikan aturan durasi dan struktur lama; tata letak layar versi 2 (`STANDAR-ILUSTRASI-VIDEO.md`) tetap berlaku untuk yang tidak bertentangan. Isinya: kerangka wajib enam bagian (pembuka pertanyaan, segar-ingat, contoh angka, asal rumus, bentuk umum, penutup yang menunjuk video berikutnya), aturan segar-ingat, narasi dan subtitle, timing per kata, gerbang wajib, daftar periksa sebelum lapor.

### 2. Perkakas bersama (dikerjakan MASTER, dibuktikan pada turunan2)
| Alat | Perubahan |
|---|---|
| `manim/buat_narasi.py` | tempo bawaan -5%, jeda antargagasan, menyimpan `audio/<video>/kata.json` (waktu tiap kata dari WordBoundary) di samping `durasi.json`; cache per segmen |
| `manim/gl/sinema.py` | `Kata(topik)`: `kata.jam("id", "kata")` memberi detik absolut kata itu; `babak` menutup pada waktu audio absolut (pembulatan frame tidak menumpuk); `tunggu_kata(...)` |
| `manim/buat_subtitle.py` | mode waktu kata: cue kalimat utuh dari `tulis`, jamnya dari `kata.json`; tebal sebelum pecah; bintang menolak |
| `alat/cek_subtitle.py` | membandingkan VTT dengan medan `tulis` TANPA membuang operator matematika (2x + h bukan 2xh) |
| `alat/cek_pemicu.py` | selisih tiap pemicu animasi terhadap waktu kata; gagal bila lebih dari 0,15 detik |
| gerbang lama | cek_kode, qc (termasuk BendaTertinggal, tulisan lawan angka sumbu), cek_video lembar kontak, cek_layar_kosong, cek_aset_video, cek_waktu_adegan, cek_urutan_<topik>, klaim sympy: semua tetap |

Resep render: `manimgl ... -w --hd --config_file manim/hd60.yml` langsung 1080p60, `gabung_audio ... --keluar <video>.mp4`, lalu salinan 480p bersubtitel untuk ditonton ARYA. Wadah final mp4 (keputusan 8 Sep pagi).

### 3. Delapan sesi
| Sesi | Cabang | Worktree | Port | Video |
|---|---|---|---|---|
| MANTRA-TRIGONOMETRI | `sesi/trigonometri-video` (baru) | `mantra-trigonometri` | 3017 | 7 |
| MANTRA-LIMIT | `sesi/limit-video` (baru) | `mantra-limit` | 3018 | 7 |
| MANTRA-VEKTOR | `sesi/vektor` | `matra-vektor` | 3010 | 6 |
| MANTRA-GRAFIK-FUNGSI | `sesi/grafik-fungsi` | `matra-grafik-fungsi` | 3011 | 2 (+ kandidat baru) |
| MANTRA-STATISTIKA | `sesi/statistika` | `matra-statistika` | 3012 | 13 |
| MANTRA-3D | `sesi/ruang-3d` | `matra-ruang-3d` | 3013 | 6 |
| MANTRA-TRANSFORMASI-GEO | `sesi/transformasi-geometri` | `mantra-transformasi-geometri` | 3014 | 6 |
| MANTRA-TURUNAN | `sesi/turunan-materi` | `materi-turunan-b8c515` | 3015 | 6 (01 sampai 03 sudah), mulai 04 |
| MANTRA-INTEGRAL | `sesi/integral-materi` | `integral-folder-branch-setup-05863c` | 3016 | 5 |

Urutan tiap sesi mengikuti urutan belajar (sub-bab), supaya segar-ingat bersambung. Satu render pada satu waktu per sesi. Video pertama tiap sesi berhenti untuk ditonton ARYA.

### 4. Urutan kerja MASTER
1. Commit dan gabung pekerjaan Turunan yang tercecer (tiga video, alat, catatan), pasang tiga mp4 1080p ke master.
2. Tulis `STANDAR-VIDEO-V3.md`; angkat alat khusus jadi perkakas bersama; buktikan: turunan2 dibangun ulang dengan perkakas bersama memberi durasi dan pemicu yang sama.
3. Ringkas catatan sesi Turunan di `CLAUDE.md` jadi aturan pendek yang menunjuk standar v3; `PROGRESS.md`; `ATURAN-SEMUA-SESI.md` (delapan sesi, port); berkas tugas tiap sesi (bagian "Gelombang 4: tulis ulang"); `PROMPT-SIAP-TEMPEL.md`.
4. Dua worktree dan cabang baru; master digabung ke ketujuh cabang lama (kalau bentrok, sesi yang menyelesaikannya di langkah pertamanya).
5. Delapan prompt siap tempel diserahkan ke ARYA.

## Risiko yang disebut terbuka
- Pekerjaan sesi Turunan belum di-commit; sampai langkah 1 selesai, tiga video gaya baru hanya ada di satu folder.
- Delapan sesi merender di satu laptop: satu render per sesi, dan `next build` tidak berbarengan dengan render.
- Standar v3 mengubah video yang sudah disetujui ARYA (Trigonometri, Limit, Statistika 1080p): itu keputusan ARYA yang sadar; versi lama tetap ada di riwayat git dan arsip.
- Perkiraan waktu: persiapan MASTER sekitar sehari, delapan video pertama sehari plus tinjauan, sisa 47 video sekitar seminggu.
