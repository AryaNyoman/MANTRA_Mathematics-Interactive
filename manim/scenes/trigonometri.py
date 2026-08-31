"""Trigonometri — Kelas 10, Bab 4 (Perbandingan Trigonometri).

Miskonsepsi yang dilawan (dikutip dari Buku Panduan Guru Kelas X, Bab 4):
siswa mengira nilai sin/cos/tan adalah *nilai tetap*, padahal ia adalah
*perbandingan* yang tetap sama pada semua segitiga siku-siku yang sebangun.

Adegan `SegitigaSebangun*` menunjukkan dua segitiga berbeda ukuran dengan sudut
yang sama — panjang sisinya beda, perbandingannya identik.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from manim import *  # noqa: E402
from matra_theme import Tema, UKURAN_LABEL, UKURAN_RUMUS  # noqa: E402


def bangun_segitiga(t: Tema, sudut_titik, lebar, tinggi, tebal=4):
    """Segitiga siku-siku dengan sudut theta di `sudut_titik`, siku-siku di kanan bawah."""
    a = np.array([*sudut_titik, 0.0])            # titik sudut theta
    b = a + np.array([lebar, 0.0, 0.0])          # siku-siku
    c = b + np.array([0.0, tinggi, 0.0])         # puncak

    samping = Line(a, b, color=t.aksen2, stroke_width=tebal)
    depan = Line(b, c, color=t.aksen, stroke_width=tebal)
    miring = Line(c, a, color=t.tinta, stroke_width=tebal)
    siku = RightAngle(samping, depan, length=0.28, color=t.redup, stroke_width=2)
    busur = Angle(Line(a, b), Line(a, c), radius=0.62, color=t.sorot, stroke_width=3)
    theta = MathTex(r"\theta", color=t.sorot, font_size=UKURAN_LABEL).move_to(
        Angle(Line(a, b), Line(a, c), radius=1.02).point_from_proportion(0.5)
    )
    return VGroup(samping, depan, miring, siku, busur, theta), (a, b, c)


def susun(t: Tema) -> VGroup:
    kecil, (a1, b1, c1) = bangun_segitiga(t, (-5.4, -1.9), 2.4, 1.8)
    besar, (a2, b2, c2) = bangun_segitiga(t, (0.2, -1.9), 4.0, 3.0)

    def label(teks, titik, arah, warna):
        return Text(teks, font_size=20, color=warna).next_to(titik, arah, buff=0.18)

    lab_kecil = VGroup(
        label("2,4 cm", (a1 + b1) / 2, DOWN, t.aksen2),
        label("1,8 cm", (b1 + c1) / 2, RIGHT, t.aksen),
    )
    lab_besar = VGroup(
        label("4 cm", (a2 + b2) / 2, DOWN, t.aksen2),
        label("3 cm", (b2 + c2) / 2, RIGHT, t.aksen),
    )

    rasio_kecil = MathTex(
        r"\tan\theta=\frac{1{,}8}{2{,}4}=0{,}75", color=t.tinta, font_size=32
    ).next_to(kecil, DOWN, buff=0.55)
    rasio_besar = MathTex(
        r"\tan\theta=\frac{3}{4}=0{,}75", color=t.tinta, font_size=32
    ).next_to(besar, DOWN, buff=0.55)
    for r in (rasio_kecil, rasio_besar):
        r.set_color_by_tex("0{,}75", t.sorot)

    judul = Text(
        "Ukurannya beda. Perbandingannya sama.",
        font_size=34,
        color=t.tinta,
    ).to_edge(UP, buff=0.55)

    garis = Line(UP * 2.1, DOWN * 2.6, color=t.redup, stroke_width=1.5).set_x(-1.1)

    return VGroup(judul, garis, kecil, besar, lab_kecil, lab_besar, rasio_kecil, rasio_besar)


class SegitigaSebangunTerang(Scene):
    """Versi tinta gelap — untuk situs berlatar terang. Render dengan -t."""

    def construct(self):
        t = Tema("terang")
        t.pasang(self)
        self.add(susun(t))


class SegitigaSebangunGelap(Scene):
    """Versi tinta terang — untuk situs berlatar gelap. Render dengan -t."""

    def construct(self):
        t = Tema("gelap")
        t.pasang(self)
        self.add(susun(t))
