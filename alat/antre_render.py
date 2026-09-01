"""Antrean render: lima sesi berbagi satu prosesor, render Manim harus bergiliran.

Pemakaian (dari folder worktree mana pun):

    python alat/antre_render.py <nama-sesi> -- manim -ql --disable_caching manim/scenes/x.py Adegan
    python alat/antre_render.py --siapa

Cara kerjanya: satu berkas kunci di folder Temp Windows (di LUAR semua worktree,
jadi terlihat oleh semua sesi). Kalau kunci dipegang sesi lain, alat ini
menunggu dan melapor tiap 20 detik. Kunci yang umurnya lebih dari 45 menit
dianggap basi (sesi pemegangnya mungkin sudah mati) dan diambil alih. Selesai
atau gagal, kunci selalu dilepas.

Render Manim 480p sekitar 3 menit, 1080p60 sekitar 15 menit. Dua render
berbarengan bukan dua kali lebih cepat, malah keduanya melambat dan mengganggu
sesi yang cuma mau menjalankan tsc.
"""

from __future__ import annotations

import os
import subprocess
import sys
import tempfile
import time
from datetime import datetime
from pathlib import Path

KUNCI = Path(tempfile.gettempdir()) / "matra-render.lock"
BASI_DETIK = 45 * 60
JEDA_TUNGGU = 20


def baca_kunci() -> tuple[str, float, str] | None:
    try:
        isi = KUNCI.read_text(encoding="utf-8").strip().split("|", 2)
        return isi[0], float(isi[1]), isi[2] if len(isi) > 2 else ""
    except (FileNotFoundError, ValueError, IndexError):
        return None


def siapa() -> int:
    k = baca_kunci()
    if not k:
        print("antrean kosong, tidak ada yang sedang merender")
        return 0
    nama, sejak, perintah = k
    menit = (time.time() - sejak) / 60
    print("dipegang %s sejak %.0f menit lalu: %s" % (nama, menit, perintah[:80]))
    if menit * 60 > BASI_DETIK:
        print("(sudah basi, akan diambil alih oleh pemanggil berikutnya)")
    return 0


def main(argv: list[str]) -> int:
    if not argv or argv[0] in ("-h", "--help"):
        print(__doc__)
        return 0
    if argv[0] == "--siapa":
        return siapa()
    if "--" not in argv:
        print("format: antre_render.py <nama-sesi> -- <perintah...>")
        return 2
    i = argv.index("--")
    nama = argv[0]
    perintah = argv[i + 1:]
    if not perintah:
        print("perintahnya kosong")
        return 2

    # tunggu giliran
    while True:
        k = baca_kunci()
        if not k:
            break
        pemilik, sejak, _ = k
        umur = time.time() - sejak
        if pemilik == nama:
            print("kunci lama milikmu sendiri, dipakai lagi")
            break
        if umur > BASI_DETIK:
            print("kunci basi dari %s (%.0f menit), diambil alih" % (pemilik, umur / 60))
            KUNCI.unlink(missing_ok=True)
            break
        print("[%s] menunggu %s selesai merender (%.0f menit berjalan)..."
              % (datetime.now().strftime("%H:%M"), pemilik, umur / 60), flush=True)
        time.sleep(JEDA_TUNGGU)

    KUNCI.write_text("%s|%f|%s" % (nama, time.time(), " ".join(perintah)),
                     encoding="utf-8")
    print("[%s] giliran %s, mulai: %s" % (datetime.now().strftime("%H:%M"),
                                          nama, " ".join(perintah)), flush=True)
    mulai = time.time()
    try:
        kode = subprocess.call(perintah, shell=(os.name == "nt"))
    finally:
        k = baca_kunci()
        if k and k[0] == nama:
            KUNCI.unlink(missing_ok=True)
    print("[%s] selesai dalam %.1f menit, kode keluar %d, kunci dilepas"
          % (datetime.now().strftime("%H:%M"), (time.time() - mulai) / 60, kode))
    return kode


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
