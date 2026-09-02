"""Tambalan ManimGL 1.7.2 untuk Windows + MiKTeX. Impor SEKALI dari modul bersama.

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

from manimlib.utils import tex_file_writing as _tfw


class _SubprocessTanpaNoPdf:
    def __getattr__(self, nama):
        return getattr(_subprocess, nama)

    def run(self, args, *a, **kw):
        if args and str(args[0]) == "latex":
            args = [x for x in args if x != "-no-pdf"]
        return _subprocess.run(args, *a, **kw)


_tfw.subprocess = _SubprocessTanpaNoPdf()
