"""Menyiapkan PATH supaya Manim menemukan MiKTeX. Di-import, bukan dijalankan.

MASALAH YANG DISELESAIKAN (ditemukan 31 Agu 2026):
MiKTeX terpasang lengkap di komputer ARYA, tetapi foldernya TIDAK terdaftar di
PATH Windows. Akibatnya setiap adegan yang memakai `MathTex` gagal dengan pesan
yang menyesatkan:

    [WinError 2] The system cannot find the file specified

Pesan itu tidak menyebut LaTeX sama sekali, jadi mudah disalahartikan sebagai
kesalahan kode. Padahal berkas yang "tidak ditemukan" adalah `latex.exe`.

KENAPA CARANYA BEGINI:
Menambah PATH permanen berarti mengubah setelan Windows milik ARYA, itu di luar
wewenang berkas proyek. Sebagai gantinya PATH ditambal hanya untuk proses yang
sedang berjalan. Adegan meng-import berkas ini di baris paling atas, jadi
tambalannya sudah terpasang sebelum Manim memanggil LaTeX.

Kalau suatu hari MiKTeX dipasang di tempat lain, tambahkan foldernya ke CALON.
"""

from __future__ import annotations

import os
import shutil
from pathlib import Path

CALON = [
    Path.home() / "AppData" / "Local" / "Programs" / "MiKTeX" / "miktex" / "bin" / "x64",
    Path("C:/Program Files/MiKTeX/miktex/bin/x64"),
    Path("C:/Program Files (x86)/MiKTeX/miktex/bin/x64"),
    Path.home() / "AppData" / "Local" / "Programs" / "MiKTeX" / "miktex" / "bin",
]

PERLU = ("latex", "dvisvgm")


def pastikan_latex(diam: bool = True) -> Path | None:
    """Pastikan `latex` dan `dvisvgm` bisa dipanggil. Kembalikan folder yang ditambahkan.

    Mengembalikan None kalau PATH sistem memang sudah benar, itu keadaan sehat.
    """
    if all(shutil.which(p) for p in PERLU):
        return None

    for folder in CALON:
        if not all((folder / f"{p}.exe").exists() for p in PERLU):
            continue
        os.environ["PATH"] = str(folder) + os.pathsep + os.environ.get("PATH", "")
        if not diam:
            print(f"[lingkungan] MiKTeX ditambahkan ke PATH: {folder}")
        return folder

    hilang = [p for p in PERLU if not shutil.which(p)]
    raise RuntimeError(
        f"LaTeX tidak ditemukan ({', '.join(hilang)} tidak bisa dipanggil), dan "
        f"tidak ada di daftar CALON pada manim/lingkungan.py.\n"
        f"Sudah dicari di:\n" + "\n".join(f"  - {c}" for c in CALON) +
        "\n\nTanpa ini setiap adegan yang memakai MathTex akan gagal. "
        "Cari letak latex.exe lalu tambahkan foldernya ke CALON."
    )


# Dipasang saat berkas ini di-import, itu memang tujuannya.
FOLDER_MIKTEX = pastikan_latex()


if __name__ == "__main__":
    # Jangan panggil pastikan_latex() lagi di sini: import di atas sudah
    # menambal PATH, sehingga pemanggilan kedua selalu menjawab "sudah benar"
    # dan menyembunyikan kenyataan bahwa tambalan itu diperlukan.
    print("PATH sistem sudah benar, tidak perlu ditambal."
          if FOLDER_MIKTEX is None else f"PATH ditambal dengan: {FOLDER_MIKTEX}")
    for p in PERLU:
        print(f"  {p:10s} -> {shutil.which(p)}")
