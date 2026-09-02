"""Uji tema: Constantia untuk kata, LaTeX untuk rumus, latar krem, HUD menempel di layar."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403


class UjiTema(AdeganMatra):
    def construct(self):
        judul = teks("Angka saja tidak cukup", UKURAN_JUDUL).to_corner(UL, buff=0.5)
        r = rumus(r"3 + 4 = 7\ \mathrm{km}", UKURAN_RUMUS).to_corner(UR, buff=0.5)
        label = teks("dayung 3 km, arus 2 km", UKURAN_LABEL, AKSEN2).to_edge(DOWN, buff=0.6)
        self.hud_tambah(judul, r, label)
        self.frame.reorient(20, 60, 0)   # HUD harus tetap tegak walau kamera miring
        self.add(Square(side_length=2).set_fill(AKSEN, 0.5))
        self.wait(1)
