"""Etalase semua benda `gl.ilustrasi`, kamera berputar pelan. Untuk dinilai lewat lembar kontak:
tiap benda dikenali tanpa label? ada yang tembus lantai? warna di luar palet?"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, sinema, qc  # noqa: E402

DURASI = {"diam": 2.0, "putar": 6.0}


class Etalase(AdeganMatra):
    def construct(self):
        lantai = ilustrasi.lantai_kisi(ukuran=12, tinggi_z=2)
        self.add(lantai)

        kolam = ilustrasi.air_hidup(self, panjang=4.0, lebar=3.0, pusat=(-4.0, 0.0))
        asli = ilustrasi.perahu(1.6)
        kapal = asli.copy()
        kapal.add_updater(lambda m: ilustrasi.ayunkan(asli, m, -4.0, 0.0, self.time))
        benda = [
            ("mobil", ilustrasi.mobil(1.6).shift(LEFT * 1.2)),
            ("orang", ilustrasi.orang(1.5).shift(RIGHT * 0.6)),
            ("bola", ilustrasi.bola(0.45).shift(RIGHT * 2.0)),
            ("balok", ilustrasi.balok(0.9, 0.7, 0.8).shift(RIGHT * 3.4)),
            ("silinder", ilustrasi.silinder(0.4, 1.0).shift(RIGHT * 4.8)),
        ]
        self.add(kolam, kapal, *[b for _, b in benda])

        label = VGroup()
        for nama, b in [("perahu", kapal)] + benda:
            t = teks(nama, 22, REDUP)
            t.rotate(90 * DEGREES, axis=RIGHT)         # berdiri tegak supaya terbaca dari samping
            t.move_to(b.get_center() + OUT * (b.get_depth() / 2 + 0.45))
            label.add(t)
        self.add(label)

        kamera.pasang_awal(self.frame, theta=-35, phi=65, pusat=(0, 0, 0.6), tinggi=9)
        zona = {nama: b for nama, b in benda}
        zona["perahu"] = kapal
        qc.periksa_adegan(self, zona, [("mobil", "orang"), ("orang", "bola"), ("bola", "balok"),
                                       ("balok", "silinder")])
        with sinema.babak(self, "diam", DURASI) as b:
            b.jeda(1.0)
        with sinema.babak(self, "putar", DURASI) as b:
            b.main(kamera.putar_pelan(self.frame, 50), run_time=6.0)
        qc.periksa_adegan(self, zona, [("mobil", "orang"), ("orang", "bola"), ("bola", "balok"),
                                       ("balok", "silinder")])
