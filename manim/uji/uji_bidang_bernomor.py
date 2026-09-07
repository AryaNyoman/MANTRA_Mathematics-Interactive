"""Uji penjaga batas sumbu `ilustrasi.bidang_bernomor`: yang meleset HARUS gagal.

    python manim/uji/uji_bidang_bernomor.py

KENAPA UJI INI ADA
Pada 7 Sep 2026 dua video Turunan tayang di lembar kontak dengan sumbu mendatar
yang terbaca "-2, -0, 0, 2, 2, 4". Angka 2 muncul dua kali dan angka 1 tidak ada
sama sekali, di video yang seluruh isinya mengukur kemiringan di x = 1.
Penyebabnya batas bawah papan yang bukan kelipatan langkah sumbunya. Semua
gerbang otomatis meloloskannya.

Uji ini menjaga DUA arah sekaligus, dan arah kedua sama pentingnya: penjaga yang
menolak segalanya sama merugikannya dengan penjaga yang tidak menolak apa pun.
Karena itu batas yang sah, termasuk langkah 0,5 dengan batas -1,5, wajib tetap
lolos, dan angka yang dihasilkan diperiksa benar-benar jatuh di garis petak.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from manimlib import *  # noqa: E402,F403
from gl import ilustrasi  # noqa: E402


def harus_gagal(nama, xr, yr):
    try:
        ilustrasi.bidang_bernomor(xr, yr)
    except ilustrasi.BatasSumbuSalah as e:
        pesan = str(e)
        # Pesannya wajib menyebut batas yang dipakai DAN kelipatan terdekat.
        # Penolakan yang tidak memberi tahu angka penggantinya memaksa
        # pembacanya menebak, dan menebak adalah cara cacat ini lahir.
        for wajib in ("batas bawah", "Kelipatan terdekat"):
            if wajib not in pesan:
                raise SystemExit(f"GAGAL: pesan {nama} tidak menyebut '{wajib}': {pesan}")
        print(f"ok: {nama} ditolak, pesannya menyebut penggantinya")
        return
    raise SystemExit(f"GAGAL: {nama} mestinya ditolak, tapi lolos")


def harus_lolos(nama, xr, yr):
    bidang = ilustrasi.bidang_bernomor(xr, yr)
    for sumbu, arah in zip(bidang.get_axes(), ("x", "y")):
        langkah = float((xr if arah == "x" else yr)[2])
        for t in sumbu.get_tick_range():
            rasio = float(t) / langkah
            if abs(rasio - round(rasio)) > 1e-9:
                raise SystemExit(
                    f"GAGAL: {nama} lolos penjaga tetapi angka sumbu {arah} "
                    f"jatuh di {float(t):g}, bukan di garis petak")
    print(f"ok: {nama} lolos dan angkanya jatuh di garis petak")


# --- yang meleset HARUS gagal ------------------------------------------------
# Persis batas yang dipakai video Turunan 02 dan 03 sebelum diperbaiki.
harus_gagal("v02 lama x=(-1,5 .. 3,5 langkah 1)", (-1.5, 3.5, 1.0), (-1.0, 5.0, 1.0))
harus_gagal("v03 lama x=(-4,2 .. 4,2 langkah 1)", (-4.2, 4.2, 1.0), (-3.0, 4.4, 1.0))
# Sumbu y juga dijaga, bukan cuma x.
harus_gagal("y meleset (-3,2 langkah 1)", (-4.0, 4.0, 1.0), (-3.2, 4.4, 1.0))
# Langkah 0,5 dengan batas yang bukan kelipatannya tetap salah.
harus_gagal("langkah 0,5 batas -1,2", (-1.2, 3.0, 0.5), (-1.0, 3.0, 1.0))

# --- yang sah HARUS lolos ----------------------------------------------------
# Kalau uji ini gugur, penjaganya terlalu galak dan justru merusak topik lain.
harus_lolos("batas bulat langkah 1", (-4.0, 4.2, 1.0), (-3.0, 4.4, 1.0))
# Inti syarat MASTER: kelipatan LANGKAH, bukan "bilangan bulat" harfiah.
harus_lolos("langkah 0,5 batas -1,5", (-1.5, 3.0, 0.5), (-1.0, 3.0, 0.5))
harus_lolos("langkah 2 batas -6", (-6.0, 6.0, 2.0), (-4.0, 4.0, 2.0))
# Batas yang lahir dari hitungan pecahan biner tetap dianggap sah.
harus_lolos("batas 0,1+0,2 langkah 0,1", (0.1 + 0.2, 1.0, 0.1), (0.0, 1.0, 0.1))

# --- langkah tidak masuk akal ditolak juga -----------------------------------
try:
    ilustrasi.bidang_bernomor((-4.0, 4.0, 0.0), (-3.0, 3.0, 1.0))
    raise SystemExit("GAGAL: langkah nol mestinya ditolak")
except ilustrasi.BatasSumbuSalah:
    print("ok: langkah nol ditolak")

print("SEMUA UJI BIDANG BERNOMOR LOLOS")
