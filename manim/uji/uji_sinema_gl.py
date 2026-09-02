"""Uji sinema v2: zona layar (identitas kiri atas, panel rumus kanan atas), label
maksimal dua kata dijaga mesin, rumus lahir dekat benda lalu terbang ke panel,
rumus berubah lewat morph lambang, jam babak. `SinemaLebih` HARUS gagal
(WaktuTidakMuat); `LabelPanjang` HARUS gagal (AturanDilanggar)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, sinema, qc  # noqa: E402

DURASI = {"a": 3.0, "b": 4.0, "c": 3.0, "d": 3.0}


class SinemaPas(AdeganMatra):
    def construct(self):
        bidang = ilustrasi.bidang_bernomor((-3, 5, 1), (-2, 3, 1))
        self.add(bidang)
        titik = Dot([2, 1, 0], radius=0.12).set_color(SOROT)
        self.add(titik)
        papan = sinema.PapanRumus(self)
        with sinema.babak(self, "a", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 03: Uji sinema", lama=2.4)
            b.catat(2.4)
        with sinema.babak(self, "b", DURASI) as b:
            ident = sinema.identitas(self, "1 petak = 1 km", "skala x = skala y")
            lab = sinema.label("naik 1").next_to(titik, UP, buff=0.15)
            b.main(FadeIn(lab), run_time=0.5)
            rum = sinema.lahir_rumus(self, r"f(x) = \sin x", dekat=titik, papan=papan, b=b)
        with sinema.babak(self, "c", DURASI) as b:
            rum = sinema.ganti_rumus(self, rum, r"f(x) = \cos x", b=b, key_map={r"\sin": r"\cos"})
            papan.terima(rum)
            papan.baris(r"f(0) = 1")
            b.catat(0.8)
        with sinema.babak(self, "d", DURASI) as b:
            b.main(self.frame.animate.set_height(9), run_time=1.5)
        qc.periksa_adegan(self, {"identitas": ident, "label": lab, "titik": titik},
                          [("identitas", "label")], hud={"papan": papan.semua()}, dunia={"bidang": bidang})


class SinemaLebih(AdeganMatra):
    def construct(self):
        with sinema.babak(self, "a", DURASI) as b:
            b.main(FadeIn(Square()), run_time=5.0)   # 5.0 > 3.0: harus gagal


class LabelPanjang(AdeganMatra):
    def construct(self):
        sinema.label("ini terlalu panjang untuk label")   # harus gagal
