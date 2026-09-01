# Cara membuka dan mengurus lima sesi paralel

## Yang sudah otomatis
Tiap worktree berisi `.claude/settings.local.json` yang menyetel:
- model `claude-opus-5`
- mode izin `bypassPermissions` (setara AUTO)
Jadi sesi yang dibuka DI FOLDER worktree itu, lewat jendela mana pun,
langsung memakai setelan tersebut.

MASTER juga bisa menyalakan kelima sesi sendiri lewat PowerShell
(jendela terminal terpisah per sesi). Kalau jendelanya tertutup atau
laptop di-restart, nyalakan ulang dengan baris di bawah.

## Menyalakan ulang satu sesi secara manual
Buka PowerShell, lalu (contoh VEKTOR, ganti nama folder + file tugas):

```bash
cd D:\MANIM-MATRA\.claude\worktrees\matra-vektor
claude "Kamu sesi MATRA-VEKTOR. Baca dan ikuti docs/tugas/MATRA-VEKTOR.md."
```

Pasangan folder dan kalimat pembuka:
| Sesi | Folder worktree | File tugas |
|---|---|---|
| MATRA-VEKTOR | `matra-vektor` | `docs/tugas/MATRA-VEKTOR.md` |
| MATRA-GRAFIK-FUNGSI | `matra-grafik-fungsi` | `docs/tugas/MATRA-GRAFIK-FUNGSI.md` |
| MATRA-STATISTIKA | `matra-statistika` | `docs/tugas/MATRA-STATISTIKA.md` |
| MATRA-RUANG-TIGA-DIMENSI | `matra-ruang-3d` | `docs/tugas/MATRA-RUANG-TIGA-DIMENSI.md` |
| MATRA-DESAIN-UI-UX | `matra-ui-ux` | `docs/tugas/MATRA-DESAIN-UI-UX.md` |

## Yang tetap harus diklik ARYA per sesi (tidak bisa otomatis)
1. **Effort MAX**: di sesi itu ketik `/model`, pilih Opus 5, pilih effort
   tertinggi kalau pilihannya muncul.
2. **Remote control** (pantau dari HP): fitur ini menempel di jendela sesi.
   Kalau sesi dibuka dari aplikasi desktop Claude, nyalakan dari menu
   sesinya. Untuk jendela terminal, cek `/remote-control` tersedia atau
   tidak; kalau tidak, cara paling pasti: buka sesi dari aplikasi desktop
   (New Session, pilih folder worktree-nya, tempel kalimat pembuka).
   Alternatif pantau tanpa remote control: tanya MATRA-MASTER, dia bisa
   melihat dan mengirim pesan ke sesi lokal lain.

## Catatan biaya
Lima sesi Opus berjalan serentak itu jalur token paling boros. Kalau kuota
menipis: tutup 2-3 jendela, sisanya bergiliran, urutan bebas.

## Siklus hidup satu sesi topik
1. Sesi merancang tahap, minta persetujuan ARYA (di sesi itu).
2. Sesi membangun halaman, lapor selesai di laporannya.
3. ARYA meninjau halaman (dev server port sesi itu).
4. ARYA menyuruh MASTER menggabungkan; MASTER gabung, deploy, dan
   menghapus worktree + cabang yang sudah tergabung.
