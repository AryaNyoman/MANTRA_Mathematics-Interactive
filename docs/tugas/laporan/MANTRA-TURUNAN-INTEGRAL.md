# Laporan sesi MANTRA-TURUNAN

| Hal | Isi |
|---|---|
| Nama sesi | `MANTRA-TURUNAN` (pemanggilan `materi-turunan-b8c515-84`, ref `3e6b17`) |
| Folder kerja | `D:\MANIM-MATRA\.claude\worktrees\materi-turunan-b8c515` |
| Cabang | `sesi/turunan-materi` |
| Ruang lingkup | TURUNAN saja. Integral menunggu keputusan ARYA (perintah MASTER 7 Sep) |
| Port dev | 3015 · Playwright `-s=mantra-turunan` |

## Selesai

### Tahap 1: dua belas materi Turunan terisi (7 Sep)
Ditulis dari Bab 2 buku Matematika Tingkat Lanjut Kelas XII, dibaca langsung
dengan PyMuPDF (PDF 113 sampai 142), bukan dari ingatan. Contoh dan angkanya
ditulis sendiri; soal kotak karton 18 cm di Materi 11 memakai angka buku apa
adanya dan hal itu dinyatakan di badan teksnya.

Kedua belas materi `siap: true`. `topik.ts` sendiri masih `siap: false`,
sesuai perintah, sampai widget, latihan, dan kuis selesai.

**Bukti:**
- `alat/cek_turunan.py alat/materi-turunan.json` -> 93 klaim, 0 salah, keluar 0
- `alat/cek_turunan.py alat/uji-cek-turunan-salah.json` -> 11 klaim sengaja
  salah, 11 ditolak, keluar 1. Pemeriksanya terbukti dua arah, dan sepuluh
  jenis klaim yang didukung semuanya ikut diuji.
- `alat/cek_urutan_turunan.py` -> SEMUA LOLOS, keluar 0
- `alat/periksa_tahap.py turunan` -> semua tahap lolos, keluar 0
- `node web/node_modules/typescript/bin/tsc --noEmit` -> keluar 0
- `node node_modules/eslint/bin/eslint.js content/turunan` -> keluar 0, tanpa keluaran

### Alat baru (dua, keduanya sudah diuji bisa gagal)
- `alat/cek_turunan.py`: pemeriksa sympy, sepuluh jenis klaim
  (`laju_rata_rata`, `nilai_fungsi`, `turunan`, `turunan_di`, `turunan_kedua`,
  `limit_definisi`, `stasioner`, `garis_singgung`, `pembulatan`, `ekspresi`).
  `limit_definisi` sengaja dipisah dari `turunan_di` supaya klaim Materi 02
  sampai 04, bahwa jalan definisi dan `diff` memberi hasil sama, ikut diperiksa.
- `alat/cek_urutan_turunan.py`: penjaga urutan istilah, 19 pola istilah.
  Dibuktikan menangkap pelanggaran yang ditanam sengaja di Materi 01 (istilah
  "aturan rantai" dan rujukan maju ke Materi 07), lalu berkasnya dikembalikan.

**Dua cacat alat urutan diperbaiki lebih dulu, sebelum materinya disalahkan:**
1. Pola `fungsi turun` ikut menangkap `fungsi turunan`, sehingga Materi 03 yang
   justru bertugas memperkenalkan fungsi turunan dilaporkan melanggar. Diperbaiki
   dengan batas kata.
2. Rujukan `topik Limit, Materi 04` dikira rujukan maju ke Materi 04 topik ini.
   Diperbaiki dengan menyaring rujukan bernama topik lain lebih dulu.
   Sambungan antartopik justru diminta rancangan, jadi melaporkannya sebagai
   pelanggaran akan mengarahkan perbaikan ke tempat yang salah.

### Pembenahan worktree (perintah ARYA, 7 Sep)
- `elastic-dhawan-d14db2` beserta cabang `claude/materi-turunan-e92686`: dihapus.
- Pendaftaran worktree mati `mantra-integral-materi-505cfc`: dibersihkan.
- Folder yatim `mantra-integral` (bukan worktree terdaftar, `.git`-nya berupa
  berkas penunjuk yang sudah tidak menunjuk ke mana pun): dihapus. Sebelum
  dihapus diperiksa dulu, 138 berkas kerja di dalamnya dan tidak satu pun
  diubah setelah 6 Sep, jadi tidak ada pekerjaan yang hilang.
- `mantra-turunan` (detached) dihapus MASTER.
- Cabang `sesi/integral` masih ada tetapi tidak punya komit di luar master.
  Dibiarkan; menghapus cabang bukan permintaan ARYA.

### Komunikasi antarsesi
Diuji dua arah dan BERHASIL: pesan dikirim ke sesi `MATRA-MASTER`, dibalas,
dan balasannya berisi perintah kerja yang sedang dikerjakan ini.

## Sedang dikerjakan
Tahap 2: sebelas widget Turunan dan `PanggungTurunan.tsx`. Belum dimulai.

## Butuh MASTER
1. **Cabangnya `sesi/turunan-materi`**, bukan `sesi/turunan`. Saat menggabung,
   ambil cabang ini. `sesi/turunan` dibiarkan utuh sebagai cadangan kerangka.
2. **Nama berkas laporan.** Berkas ini memakai nama yang MASTER minta
   (`MANTRA-TURUNAN-INTEGRAL.md`) walaupun sesinya hanya menggarap Turunan.
   Kalau Integral nanti diberikan ke sesi lain, laporannya akan berebut nama
   berkas yang sama.

## Butuh keputusan ARYA
1. **Materi galeri tidak punya blok `coba`, dan itu bentrok dengan CLAUDE.md.**
   CLAUDE.md mewajibkan blok `coba` di TIAP materi berwidget. Materi 12
   (`dunia-nyata-turunan`) tidak diberi blok itu, mengikuti apa yang sudah
   dilakukan topik Limit dan Transformasi Geometri pada materi galerinya.
   Alasannya: galerinya tidak bisa dicoba, hanya dibaca. Akibatnya di layar
   sempit galeri itu jatuh ke akhir bacaan. Kalau ARYA ingin aturannya berlaku
   mutlak, tiga topik perlu diseragamkan sekaligus, bukan Turunan saja.
2. **Ruang lingkup Integral.** Berkas tugas MASTER memerintahkan Turunan lalu
   Integral oleh satu sesi. MASTER 7 Sep menahan Integral sampai ARYA memutuskan
   sesi mana yang mengerjakannya. Kerangka Integral sudah ada di cabang ini dan
   tidak disentuh.
