"""Uji: rumus BERUBAH BENTUK di ManimGL (bukan fade out lalu fade in).
sin x -> cos x -> cos(x - 1): lambang yang sama berpindah, yang baru saja tumbuh."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import qc  # noqa: E402


class UjiTransform(AdeganMatra):
    def construct(self):
        a = rumus(r"f(x) = \sin x", 64)
        b = rumus(r"f(x) = \cos x", 64)
        c = rumus(r"f(x) = \cos(x - 1)", 64)
        self.add(a)
        self.wait(0.6)
        self.play(TransformMatchingStrings(a, b, key_map={r"\sin": r"\cos"}), run_time=1.6)
        self.wait(0.6)
        self.play(TransformMatchingStrings(b, c), run_time=1.6)
        self.wait(0.6)
        # Lahir besar di tengah, lalu terbang mengecil ke panel kanan atas.
        kecil = c.copy().scale(0.5).to_corner(UR, buff=0.5)
        self.play(Transform(c, kecil), run_time=1.2)
        self.wait(0.4)
        qc.periksa_adegan(self, {"rumus": c})
