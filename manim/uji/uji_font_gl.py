"""Contoh font untuk dipilih ARYA. Render gambar diam: manimgl ... -s"""
from manimlib import *

KANDIDAT = ["Consolas", "Georgia", "Cambria", "Times New Roman", "Palatino Linotype",
            "Constantia", "Segoe UI", "Calibri", "Inter", "Fraunces", "IBM Plex Mono"]


class ContohFont(Scene):
    default_camera_config = dict(background_color="#F7F3EE")

    def construct(self):
        baris = VGroup()
        for nama in KANDIDAT:
            t = Text(f"{nama}: Angka saja tidak cukup, 3 + 4 = 7 km", font=nama, font_size=28)
            t.set_color("#1F2430")
            baris.add(t)
        baris.arrange(DOWN, aligned_edge=LEFT, buff=0.22).move_to(ORIGIN)
        self.add(baris)
