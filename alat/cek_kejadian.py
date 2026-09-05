"""Memeriksa tiap babak punya KEJADIAN BESAR, sebelum dirender.

    python alat/cek_kejadian.py manim/scenes/transformasi*.py

KENAPA ALAT INI ADA
`alat/ukur_detik_pertama.py` menghitung sebuah rentang sebagai DIAM kalau
perubahan pikselnya di bawah 300 dari 409.920. Ia bekerja pada video JADI, jadi
tiap temuannya berharga satu putaran render penuh.

Video 02 dirender empat kali untuk masalah diam yang sama, cuma berpindah babak:
diperbaiki di "tegaklurus", muncul di "kaca", diperbaiki di sana, muncul lagi
karena sorotannya ternyata mati warna. Setiap putaran menambal gejala yang
DITUNJUK alat, bukan memeriksa seluruh babak lebih dulu.

Berkas ini memeriksa hal yang sama dari kodenya, sebelum render, untuk semua
babak sekaligus.

APA YANG DIHITUNG BESAR
Terbaca sebagai gerakan oleh alat ukur:
  - `ShowCreation`, `FadeIn`, `FadeOut`, `Transform` pada POLIGON atau bidang
  - `Indicate` pada poligon, dengan warna yang BERBEDA dari warna bendanya
  - gerakan kamera (`kamera.dunia_ke_peta`, `Rotate` pada benda besar)
  - `lahir_rumus`, sebab ia meredupkan seluruh dunia sebentar

Tidak terbaca:
  - ruas, garis putus-putus, panah tipis (sekitar 100 piksel)
  - label, angka, titik (sekitar 150 piksel)
  - `Indicate` yang warnanya sama dengan warna bendanya: separuh sorotannya
    hilang, dan untuk benda tipis sisanya tidak cukup

BATASNYA JUJUR
Ini pemeriksa STATIS: ia membaca kode, bukan menonton videonya. Ia bisa salah
menilai benda yang dibuat dengan cara yang tidak dikenalinya. Karena itu ia
memberi PERINGATAN, bukan menggagalkan, dan `ukur_detik_pertama.py` pada video
jadi tetap yang berhak memutuskan. Gunanya memangkas putaran render, bukan
menggantikan pengukuran.
"""

from __future__ import annotations

import pathlib
import re
import sys

# Benda yang cukup besar untuk terbaca sebagai gerakan.
# Benda `ilustrasi.*` ikut dihitung besar: orang, tanah, air, dan balok semuanya
# menempati ratusan sampai ribuan piksel. Versi pertama alat ini melewatkannya
# dan menandai babak 3D video 01 sebagai berisiko, padahal di situ seorang
# manusia memudar masuk ke layar.
BESAR_DIBUAT = re.compile(r"(\w+)\s*=\s*(?:poligon|bidang_untuk|ilustrasi\.\w+|di_slot)\(")

# RUMUS DI DUNIA BESAR, RUMUS DI PANEL KECIL, dan bedanya harus dibaca.
#
# Versi pertama alat ini menghitung semua `rumus(` sebagai tipis, dan itu benar
# untuk panel: zona rumus cuma selebar 4,75 satuan layar di pojok kanan atas.
# Tetapi video 05 menaruh rumus kerjanya DI DUNIA, membentang 5 sampai 9
# satuan, dan pada skala kotaknya itu ribuan piksel. Alat ini menandai dua
# babak video 05 sebagai berisiko diam, padahal di keduanya sebuah rumus
# selebar dua pertiga layar muncul, berubah, atau memudar.
#
# Tandanya `move_to`: rumus panel diletakkan `PapanRumus` sendiri lewat
# `tempat_utama`/`tempat_baris`, sedangkan rumus dunia harus dipindahkan
# tangan. Yang punya `move_to` berarti berdiri di dunia.
DUNIA_MOVE = re.compile(r"(\w+)\.move_to\(")
# Benda tipis, yang tidak cukup sendirian.
TIPIS_DIBUAT = re.compile(
    r"(\w+)\s*=\s*(?:Line|DashedLine|Arrow|sinema\.label|Dot|rumus)\("
)
ANIM_BESAR = re.compile(
    r"(?:ShowCreation|FadeIn|FadeOut|Transform|Indicate|Rotate)\((\w+)"
)
KAMERA = re.compile(
    r"kamera\.(?:dunia_ke_peta|dekati)|lahir_rumus|ganti_rumus|judul_pembuka"
)

# Babak yang memang TIDAK diukur alat ukurnya, jadi tidak perlu diperiksa.
#
# `buka` isinya kartu judul, dan `alat/ukur_detik_pertama.py` melewati kartu
# judul dengan sengaja (`--judul`), sebab kartu judul bukan gerakan dan
# menghitungnya akan menyembunyikan kekosongan sesudahnya. Versi pertama alat
# ini menandai semua babak `buka` di keenam video, dan seluruhnya keliru.
DILEWATI = {"buka"}


def warna_benda(isi: str) -> dict[str, str]:
    warna: dict[str, str] = {}
    for nama, w in re.findall(r"(\w+)\s*=\s*poligon\([^)]*?warna=(\w+)", isi, re.S):
        warna[nama] = w
    for nama, w in re.findall(r"(\w+)\s*=\s*sinema\.label\([^)]*?warna=(\w+)", isi):
        warna[nama] = w
    for nama, w in re.findall(r"(\w+)\s*=\s*\w+\([^)]*\)\.set_stroke\((\w+),", isi):
        warna[nama] = w
    for nama, w in re.findall(r"(\w+)\s*=\s*Dot\([^)]*\)\.set_color\((\w+)\)", isi):
        warna[nama] = w
    for m in re.finditer(
        r"(\w+)\s*=\s*DashedLine\((?:[^()]|\([^()]*\))*\)\.set_stroke\((\w+),", isi
    ):
        warna[m.group(1)] = m.group(2)
    return warna


def periksa(jalur: str) -> int:
    isi = pathlib.Path(jalur).read_text(encoding="utf-8")
    besar = set(BESAR_DIBUAT.findall(isi))
    # bidang selalu besar, apa pun namanya
    besar |= {n for n in re.findall(r"(\w*bidang\w*)\s*=", isi)}
    # rumus yang dipindahkan tangan berarti berdiri di dunia, bukan di panel
    dari_rumus = set(re.findall(r"(\w+)\s*=\s*rumus\(", isi))
    besar |= dari_rumus & set(DUNIA_MOVE.findall(isi))
    warna = warna_benda(isi)

    baris = isi.split("\n")
    mulai = [(i, m.group(1)) for i, b in enumerate(baris)
             for m in [re.search(r'sinema\.babak\(self,\s*"(\w+)"', b)] if m]

    peringatan = 0
    for k, (i, nama) in enumerate(mulai):
        if nama in DILEWATI:
            continue
        akhir = mulai[k + 1][0] if k + 1 < len(mulai) else len(baris)
        blok = "\n".join(baris[i:akhir])

        punya_besar = bool(KAMERA.search(blok))
        for target in ANIM_BESAR.findall(blok):
            if target not in besar:
                continue
            # Indicate pada benda dengan warna yang sama tidak terbaca.
            sorot = re.search(rf"Indicate\({target},\s*color=(\w+)\)", blok)
            if sorot and warna.get(target) == sorot.group(1):
                continue
            punya_besar = True
            break

        if not punya_besar:
            peringatan += 1
            print(f"  babak '{nama}' (baris {i + 1}): tidak ada kejadian besar. "
                  f"Isinya cuma benda tipis, dan alat ukur akan menilainya DIAM.")
    return peringatan


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print(__doc__)
        return 1
    total = 0
    for jalur in argv[1:]:
        print(f"=== {jalur}")
        n = periksa(jalur)
        total += n
        if n == 0:
            print("  tiap babak punya kejadian besar.")
    print(f"\n{'SEMUA LOLOS' if total == 0 else f'{total} babak berisiko dinilai diam'}")
    return 0 if total == 0 else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv))
