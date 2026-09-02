"""CONTOH RUJUKAN resmi alur video ManimGL MATRA (2 Sep 2026). Tiru polanya.

Alur: naskah `manim/narasi/contoh-perahu.json` -> `buat_narasi.py` -> adegan ini
-> `cek_kode.py` -> `manimgl ... -w -l` -> `cek_video.py` (BUKA lembar kontak)
-> `gabung_audio.py contoh-perahu ContohPerahu --uji` (latar "air" dari naskah).

Yang dicontohkan:
- benda nyata dari `gl.ilustrasi` (air hidup, tepi, perahu yang mengangguk),
- kamera mulai dari dunia nyata lalu terbang ke pandangan peta (`gl.kamera`),
- matematika (panah, rumus) muncul DI ATAS gambar, bukan di layar kosong,
- kata dalam Constantia (`teks`), angka dan rumus dalam LaTeX (`rumus`),
- tiap babak terikat durasi narasi (`sinema.babak`) dan diperiksa `qc`.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "contoh-perahu"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

# Sungai: x searah aliran, y melintang dari tepi ke tepi, z ke atas.
LEBAR, PANJANG = 6.0, 16.0
X0, Y0 = -2.6, -LEBAR / 2 + 0.8      # perahu dekat tepi berangkat
Z_PANAH = 1.6                        # di atas puncak tiang, tak tertutup apa pun dari atas


class ContohPerahu(AdeganMatra):
    def construct(self):
        frame = self.frame

        # --- Dunia: air hidup, dua tepi, perahu yang mengangguk mengikuti riak.
        air = ilustrasi.air_hidup(self, PANJANG, LEBAR)
        tepi_jauh = ilustrasi.tanah(PANJANG, 2.4, LEBAR / 2 + 1.2)
        tepi_dekat = ilustrasi.tanah(PANJANG, 2.4, -LEBAR / 2 - 1.2)
        asli = ilustrasi.perahu(2.0)
        perahu = asli.copy()
        ilustrasi.ayunkan(asli, perahu, X0, Y0, 0.0)
        perahu.add_updater(lambda m: ilustrasi.ayunkan(asli, m, X0, Y0, self.time))

        # --- Babak 1: pandangan samping dekat, judul pembuka memudar, keterangan.
        kamera.pasang_awal(frame, theta=-32, phi=72, pusat=(X0 + 0.4, Y0 + 0.5, 0.35), tinggi=5.0)
        self.add(tepi_jauh, tepi_dekat, air, perahu)
        with sinema.babak(self, "sapa", DURASI) as b:
            # y=2,4: judul di atas, supaya tidak menusuk tiang perahu yang ada di tengah layar.
            sinema.judul_pembuka(self, "Angka saja tidak cukup", lama=3.0, y=2.4)
            b.catat(3.0)
            sinema.keterangan(self, "sungai selebar 3 km, kita mau menyeberang")
            b.catat(0.6)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"perahu": perahu, "keterangan": self._matra_keterangan},
                          [("perahu", "keterangan")])

        # --- Babak 2: kamera terbang dari dunia ke peta; nama tepi muncul.
        n_jauh = teks("tepi seberang", 30).move_to([-5.5, LEBAR / 2 + 1.2, Z_PANAH])
        n_dekat = teks("tepi berangkat", 30).move_to([-5.4, -LEBAR / 2 - 1.2, Z_PANAH])
        with sinema.babak(self, "terbang", DURASI) as b:
            lama_terbang = max(2.0, DURASI["terbang"] - 2.0)
            b.main(kamera.dunia_ke_peta(frame, pusat=(0, 0, 0), tinggi=10.0), run_time=lama_terbang)
            b.main(FadeIn(n_jauh), FadeIn(n_dekat), run_time=0.6)
            sinema.keterangan(self, "dilihat dari atas, seperti peta")
            b.catat(0.6)
        qc.periksa_adegan(self, {"perahu": perahu, "tepi seberang": n_jauh, "tepi berangkat": n_dekat,
                                 "keterangan": self._matra_keterangan},
                          [("tepi berangkat", "keterangan"), ("perahu", "tepi berangkat")])

        # --- Babak 3: panah dayung (biru) di atas gambar; rumus di panel HUD.
        asal = np.array([X0, Y0, Z_PANAH])
        p_dayung = Arrow(asal, asal + 3.0 * UP, buff=0, thickness=5).set_color(AKSEN2)
        l_dayung = teks("dayung 3 km", 30, AKSEN2).next_to(p_dayung, LEFT, buff=0.2)
        panel_d = rumus(r"\vec{d} = (0,\ 3)", 36, AKSEN2).to_corner(UR, buff=0.5)
        with sinema.babak(self, "dayung", DURASI) as b:
            b.main(GrowArrow(p_dayung), FadeIn(l_dayung), run_time=1.2)
            self.hud_tambah(panel_d)
            panel_d.set_opacity(0)
            b.main(panel_d.animate.set_opacity(1), run_time=0.6)
            sinema.keterangan(self, "melintang sungai, sejauh 3 km")
            b.catat(0.6)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"perahu": perahu, "dayung": p_dayung, "label dayung": l_dayung,
                                 "panel": panel_d, "keterangan": self._matra_keterangan},
                          [("label dayung", "perahu"), ("panel", "keterangan")])

        # --- Babak 4: panah arus (merah) searah sungai; rumus kedua di bawah yang pertama.
        p_arus = Arrow(asal, asal + 2.0 * RIGHT, buff=0, thickness=5).set_color(AKSEN)
        l_arus = teks("arus 2 km", 30, AKSEN).next_to(p_arus, RIGHT, buff=0.15)
        panel_a = rumus(r"\vec{a} = (2,\ 0)", 36, AKSEN).next_to(panel_d, DOWN, buff=0.3).align_to(panel_d, RIGHT)
        with sinema.babak(self, "arus", DURASI) as b:
            b.main(GrowArrow(p_arus), FadeIn(l_arus), run_time=1.2)
            self.hud_tambah(panel_a)
            panel_a.set_opacity(0)
            b.main(panel_a.animate.set_opacity(1), run_time=0.6)
            sinema.keterangan(self, "searah sungai, sejauh 2 km")
            b.catat(0.6)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"perahu": perahu, "label dayung": l_dayung, "label arus": l_arus,
                                 "panel d": panel_d, "panel a": panel_a, "keterangan": self._matra_keterangan},
                          [("label dayung", "label arus"), ("panel d", "panel a"), ("label arus", "keterangan")])

        # --- Babak 5: pertanyaan penutup, gambar dibiarkan hidup (air terus beriak).
        with sinema.babak(self, "tutup", DURASI) as b:
            sinema.keterangan(self, "dua dorongan, dua arah: ke mana perahu mendarat?", warna=SOROT)
            b.catat(0.6)
            b.jeda(1.2)
        qc.periksa_adegan(self, {"keterangan": self._matra_keterangan, "panel a": panel_a},
                          [("keterangan", "panel a")])
