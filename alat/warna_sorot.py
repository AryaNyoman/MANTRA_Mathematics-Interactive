"""Memeriksa `Indicate` tidak memakai warna yang sama dengan warna bendanya.

    python alat/warna_sorot.py manim/scenes/transformasi2_cermin_garis.py

KENAPA ALAT INI ADA
`Indicate` menyorot benda dengan dua cara sekaligus: membesarkannya sedikit dan
mengganti warnanya sebentar. Kalau warna sorotnya SAMA dengan warna bendanya,
separuh sorotan itu hilang, dan yang tersisa cuma pembesaran kecil.

Untuk benda tipis seperti garis, pembesaran saja hampir tidak mengubah piksel.
Akibatnya `alat/ukur_detik_pertama.py` tetap menilai babaknya DIAM walaupun
kode adegannya jelas berisi sorotan. Itu terjadi pada video 02: dua sorotan
`Indicate(garis_cermin, color=SOROT)` ditambahkan untuk memecah rentang diam
10,8 detik, dan angkanya cuma turun 0,2 detik, sebab `garis_cermin` memang
sudah berwarna SOROT sejak dibuat.

Cacat ini tidak terlihat di kode, tidak ditangkap `cek_kode`, dan tidak
ditangkap qc. Yang menangkapnya cuma membandingkan warna benda dengan warna
sorotnya, dan itulah yang dikerjakan berkas ini.
"""

from __future__ import annotations

import pathlib
import re
import sys


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print(__doc__)
        return 1

    gagal = 0
    for jalur in argv[1:]:
        isi = pathlib.Path(jalur).read_text(encoding="utf-8")

        # Warna tiap benda, dibaca dari baris yang membuatnya.
        warna: dict[str, str] = {}
        for nama, w in re.findall(r"(\w+)\s*=\s*poligon\([^)]*?warna=(\w+)", isi, re.S):
            warna[nama] = w
        for nama, w in re.findall(r"(\w+)\s*=\s*sinema\.label\([^)]*?warna=(\w+)", isi):
            warna[nama] = w
        for nama, w in re.findall(r"(\w+)\s*=\s*\w+\([^)]*\)\.set_stroke\((\w+),", isi):
            warna[nama] = w
        for nama, w in re.findall(r"(\w+)\s*=\s*Dot\([^)]*\)\.set_color\((\w+)\)", isi):
            warna[nama] = w
        for blok in re.finditer(
            r"(\w+)\s*=\s*DashedLine\((?:[^()]|\([^()]*\))*\)\.set_stroke\((\w+),", isi
        ):
            warna[blok.group(1)] = blok.group(2)

        for baris_no, baris in enumerate(isi.split("\n"), start=1):
            for benda, sorot in re.findall(r"Indicate\((\w+),\s*color=(\w+)\)", baris):
                punya = warna.get(benda)
                if punya is not None and punya == sorot:
                    gagal += 1
                    print(f"{jalur}:{baris_no}  Indicate({benda}) memakai {sorot}, "
                          f"warna bendanya sendiri: sorotannya tidak akan terlihat")

    print("SEMUA LOLOS" if gagal == 0 else f"{gagal} sorotan tak terlihat")
    return 0 if gagal == 0 else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv))
