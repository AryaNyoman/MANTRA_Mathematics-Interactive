"""Dua tambalan ManimGL 1.7.2 (Windows + MiKTeX; argv saat impor). Impor SEKALI dari modul bersama.

Masalah: ManimGL memanggil `latex -no-pdf ...`. Flag `-no-pdf` hanya dikenal
TeX Live (Mac/Linux). MiKTeX menolaknya dengan "Sorry, but latex did not succeed"
tanpa membuat berkas log, sehingga ManimGL cuma bilang "LaTeX compilation failed".
Dibuktikan 2 Sep 2026: perintah yang sama TANPA flag itu sukses, semua paket ada.

Cara kerja: modul tex_file_writing milik ManimGL memanggil `subprocess.run`.
Di sini `subprocess` di modul itu diganti pembungkus yang membuang `-no-pdf`
hanya ketika program yang dipanggil adalah `latex`. xelatex tidak disentuh.
Tidak ada berkas ManimGL yang diubah, jadi tambalan ini tahan pembaruan pip.
"""

import subprocess as _subprocess
import sys as _sys

# Tambalan 2: ManimGL MEMBACA sys.argv saat diimpor dan menolak argumen yang
# tidak dikenalnya. Skrip kita sendiri (cek_kode.py --dalam, dsb.) jadi gagal
# hanya karena mengimpor manimlib. Argumen disembunyikan selama impor.
_argv_asli = _sys.argv
_sys.argv = _argv_asli[:1]
try:
    from manimlib.utils import tex_file_writing as _tfw
finally:
    _sys.argv = _argv_asli


class _SubprocessTanpaNoPdf:
    def __getattr__(self, nama):
        return getattr(_subprocess, nama)

    def run(self, args, *a, **kw):
        if args and str(args[0]) == "latex":
            args = [x for x in args if x != "-no-pdf"]
        hasil = _subprocess.run(args, *a, **kw)
        # Tambalan 3: ManimGL menyimpan hasil LaTeX ke cache disk, TERMASUK hasil
        # kosong. Terbukti 2 Sep 2026: saat MiKTeX sedang memasang font cm-super
        # pada kompilasi pertama, dvisvgm jatuh ke Metafont dan mengeluarkan SVG
        # tanpa satu pun glyph; SVG kosong itu masuk cache dan dipakai ulang, jadi
        # `\\text{}` dan `TexText` tampak "dibuang diam-diam" sampai cache dihapus.
        # Di sini SVG kosong ditolak sebelum sempat masuk cache.
        if args and str(args[0]) == "dvisvgm" and hasil.returncode == 0:
            keluaran = hasil.stdout if isinstance(hasil.stdout, bytes) else (hasil.stdout or "").encode()
            if b"<path" not in keluaran and b"<use" not in keluaran:
                raise RuntimeError(
                    "dvisvgm menghasilkan SVG tanpa glyph (font belum terpasang atau Metafont "
                    "gagal). Hasil TIDAK disimpan ke cache. Jalankan lagi; kalau berulang, "
                    "periksa mfput.log dan `kpsewhich sfrm1000.pfb`.")
        return hasil


_tfw.subprocess = _SubprocessTanpaNoPdf()
