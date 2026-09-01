# Enam sesi paralel MATRA

Tanggal: 1 September 2026, malam (sesi 6). Disetujui ARYA di sesi MASTER.

## Tujuan
Mengerjakan empat topik tersisa (vektor, grafik fungsi, statistika, ruang
tiga dimensi) plus kualitas tampilan secara paralel, tanpa saling menimpa,
sambil MASTER meneruskan Limit dan memegang integrasi.

## Keputusan ARYA (1 Sep 2026)
1. **Halaman dulu, video belakangan.** Sesi topik berhenti setelah halaman
   utuh; video menunggu halaman disetujui, tetap 480p dulu.
2. **Hanya MASTER yang menggabung ke master dan deploy.**
3. **Versi utuh langsung** per topik (selengkap Limit), bukan versi ramping.
4. Semua sesi mode AUTO, model Opus 5, effort MAX, remote control bila bisa.
5. tmux TIDAK dipakai: Windows; padanannya jendela PowerShell per sesi,
   dinyalakan MASTER lewat Start-Process.

## Bentuk
- 5 worktree di `.claude/worktrees/`: matra-vektor (cabang sesi/vektor),
  matra-grafik-fungsi (sesi/grafik-fungsi), matra-statistika
  (sesi/statistika), matra-ruang-3d (sesi/ruang-3d), matra-ui-ux (sesi/ui-ux).
- Tiap worktree punya `.claude/settings.local.json` (tidak ikut git):
  model claude-opus-5, defaultMode bypassPermissions.
- Aturan bersama: `docs/tugas/ATURAN-SEMUA-SESI.md`. Tugas per sesi:
  `docs/tugas/MATRA-*.md`. Panduan ARYA: `docs/tugas/CARA-BUKA-SESI.md`.
- Laporan per sesi: `docs/tugas/laporan/<NAMA>.md` di cabang masing-masing.
  `PROGRESS.md` hanya ditulis MASTER.

## Pembagian kepemilikan (inti anti-tabrakan)
Sesi topik: folder kontennya sendiri + satu baris di daftar-isi.ts.
UI/UX: kerangka bersama (app/, komponen non-widget-topik), gaya terkunci.
MASTER: file bersama lain, PROGRESS.md, merge, deploy, Limit.

## Gerbang
1. Gerbang rancangan: tiap sesi topik mengajukan rancangan tahapnya ke ARYA
   sebelum membangun. Ruang-3D wajib menanyakan cara gambar 3D
   (rekomendasi: proyeksi SVG sendiri, bukan pustaka 3D baru).
2. Gerbang selesai: tsc + build lolos lewat rtk proxy, angka lolos sympy,
   screenshot 375/1366 dinilai mata, laporan terisi.
3. Gerbang gabung: MASTER memeriksa cabang, menggabungkan, deploy, hapus
   worktree. Konflik daftar-isi.ts diselesaikan MASTER.

## Risiko yang diterima
- 5 sesi Opus serentak boros token (ARYA setuju sadar biaya).
- Review ARYA jadi leher botol; gelombang halaman-dulu meredakannya.
- npm install per worktree (±5 folder x ratusan MB) di drive D.
- Ingatan lintas-sesi tidak ikut worktree; ditambal lewat file tugas.

## Rollback
Worktree dan cabangnya dibuang tanpa bekas ke master selama belum digabung:
`git worktree remove <folder>` lalu `git branch -d sesi/<nama>`.
