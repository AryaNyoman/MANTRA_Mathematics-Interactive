"""Uji sinema: babak menutup sisa waktu, keterangan mengganti dirinya, AngkaKoma berkoma,
teks menempel di layar saat kamera miring. `SinemaLebih` HARUS gagal (WaktuTidakMuat)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import sinema, qc  # noqa: E402

DURASI = {"a": 2.0, "b": 3.0, "c": 2.0}


class SinemaPas(AdeganMatra):
    def construct(self):
        with sinema.babak(self, "a", DURASI) as b:
            sinema.judul_pembuka(self, "Angka saja tidak cukup", lama=2.0)
            b.catat(2.0)
        with sinema.babak(self, "b", DURASI) as b:
            kotak = Square(side_length=2).set_fill(AKSEN2, 0.6)
            b.main(FadeIn(kotak), run_time=0.6)
            sinema.keterangan(self, "satu: harus hilang")
            b.catat(0.6)
            sinema.keterangan(self, "dua: harus tampil sendiri")
            b.catat(0.6)
            angka = sinema.AngkaKoma(2.5, num_decimal_places=1, font_size=40).set_color(TINTA)
            panel = sinema.nilai_hidup(teks("nilai"), angka, di=[4.5, 2.5, 0])
            self.hud_tambah(panel)
            b.jeda(0.8)
        with sinema.babak(self, "c", DURASI) as b:
            b.main(self.frame.animate.reorient(30, 60, 0), run_time=1.5)
        qc.periksa_adegan(self, {"panel": panel, "keterangan": self._matra_keterangan},
                          [("panel", "keterangan")])


class SinemaLebih(AdeganMatra):
    def construct(self):
        with sinema.babak(self, "a", DURASI) as b:
            b.main(FadeIn(Square()), run_time=3.0)   # 3.0 > 2.0: harus gagal
