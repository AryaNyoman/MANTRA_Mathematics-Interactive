"""Uji cepat sudut kamera untuk segitiga ACG (ruang_3d_04). Bukan video."""
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from ruang_3d_umum import *  # noqa: E402,F403
from gl import kamera  # noqa: E402

THETA = float(os.environ.get("THETA", "-80"))
PHI = float(os.environ.get("PHI", "70"))


class UjiSudutACG(AdeganMatra):
    def construct(self):
        frame = self.frame
        kubus = kubus_pejal()
        kubus.set_opacity(0.14)
        rangka = rangka_kubus()
        ac = Line(T["A"], T["C"]).set_stroke(AKSEN2, 6)
        cg = Line(T["C"], T["G"]).set_stroke(SOROT, 6)
        ag = Line(T["A"], T["G"]).set_stroke(AKSEN, 6)
        muka_tegak = Polygon(T["A"], T["C"], T["G"]).set_fill(AKSEN, 0.20).set_stroke(width=0)
        lab = huruf_sudut(frame, {"A": TINTA, "B": TINTA, "C": AKSEN2, "G": AKSEN})
        kamera.pasang_awal(frame, theta=THETA, phi=PHI, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        pasang_cahaya(self)
        papan_koor = papan_koordinat(frame)
        self.add(lantai(), *papan_koor["datar"], kubus, rangka, muka_tegak, ac, cg, ag, *lab.values())
        self.wait(0.1)
