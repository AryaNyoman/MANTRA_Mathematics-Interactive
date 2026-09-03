"""Uji kaki `ilustrasi.orang`: kenapa berumbai, dan berapa yang benar.

    manimgl manim/uji/uji_kaki_orang.py KakiOrang -w -l

HASIL (3 Sep 2026, sesi Statistika). Dua dugaan diuji terpisah:
  * Jari-jari kaki. 0,045 x tinggi pecah jadi belasan helai di jala silinder
    ManimGL, terlihat seperti rumbai pel di 480p. 0,060 bersih, 0,075 bersih
    tetapi mulai gemuk.
  * Arah geseran. Bawaan menggeser kedua kaki ke arah KEDALAMAN, jadi dari
    kamera depan keduanya bertumpuk. Digeser KE SAMPING keduanya terbaca
    sebagai dua kaki.
Rumbai TETAP muncul di 0,045 walau digeser ke samping, jadi penyebabnya
ketipisan, bukan tumpukan. Yang dipakai di `ilustrasi.orang`: 0,060 ke samping.

Ubah `KE_SAMPING` dan daftar jari-jari di `construct` untuk menguji ulang.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera  # noqa: E402

KE_SAMPING = 1.0   # 1 = kaki berjajar kiri kanan, 0 = bawaan (berjajar ke belakang)


def orang_kaki(tinggi, warna, jari_kaki, jari_badan=0.09):
    """Salinan ilustrasi.orang dengan jari-jari kaki yang bisa diatur."""
    t = tinggi
    kepala = Sphere(radius=0.11 * t).set_color(warna).move_to([0, 0, t - 0.11 * t])
    badan = Cylinder(height=0.40 * t, radius=jari_badan * t).set_color(warna)
    badan.move_to([0, 0, 0.65 * t])
    bagian = [kepala, badan]
    for sx in (-0.06, 0.06):
        kaki = Cylinder(height=0.45 * t, radius=jari_kaki * t).set_color(warna)
        kaki.move_to([sx * t * KE_SAMPING, sx * t * (1 - KE_SAMPING), 0.225 * t])
        bagian.append(kaki)
    for sy in (-1, 1):
        lengan = Cylinder(height=0.36 * t, radius=0.035 * t).set_color(warna)
        lengan.rotate(sy * 15 * DEGREES, axis=RIGHT)
        lengan.move_to([0, sy * 0.15 * t, 0.66 * t])
        bagian.append(lengan)
    g = Group(*bagian)
    g.set_shading(*ilustrasi.BAYANG)
    return g


class KakiOrang(AdeganMatra):
    samples = 4

    def construct(self):
        kamera.pasang_awal(self.frame, theta=0, phi=80, pusat=(0, 0, 0.5), tinggi=3.0)
        for x, jari, nama in ((-2.0, 0.045, "samping 0,045"),
                              (0.0, 0.060, "samping 0,060"),
                              (2.0, 0.075, "samping 0,075")):
            o = orang_kaki(1.0, AKSEN2, jari).shift([x, 0, 0])
            self.add(o)
            t = teks(nama, 20, TINTA).rotate(90 * DEGREES, RIGHT)
            t.move_to([x, 0, -0.35])
            self.add(t)
        self.wait(0.1)
