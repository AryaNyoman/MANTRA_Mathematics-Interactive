"""Diagnosa langkah demi langkah: langkah mana di ganti_rumus yang menyusutkan rumus."""
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa


class Langkah(AdeganMatra):
    def construct(self):
        a = rumus(r"f(x) = \sin x", 34).to_corner(UR, buff=0.5)
        self.add(a)
        print("font_size a:", getattr(a, "font_size", None))
        baru = rumus(r"f(x) = \cos x", 34, a.get_color())
        print("1 dibuat       :", round(baru.get_width(), 2))
        baru.move_to(a)
        print("2 move_to      :", round(baru.get_width(), 2))
        self.play(TransformMatchingStrings(a, baru, key_map={r"\sin": r"\cos"}), run_time=0.8)
        print("3 sesudah play :", round(baru.get_width(), 2), "| di adegan:", baru in self.mobjects)
        self.remove(a)
        print("4 remove a     :", round(baru.get_width(), 2), "| di adegan:", baru in self.mobjects)
        self.hud.add(baru)
        print("5 hud.add      :", round(baru.get_width(), 2), "| di adegan:", baru in self.mobjects)
        self.wait(0.3)
        print("6 sesudah wait :", round(baru.get_width(), 2))
        # pembanding: tanpa key_map dan tanpa move_to
        c = rumus(r"f(x) = \cos(x-1)", 34)
        c.move_to(baru)
        self.play(TransformMatchingStrings(baru, c), run_time=0.8)
        print("7 morph kedua  :", round(c.get_width(), 2), "| di adegan:", c in self.mobjects)
        self.wait(0.3)
