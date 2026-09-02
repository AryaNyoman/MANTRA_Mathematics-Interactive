"""Ruang Tiga Dimensi, materi 04: "Dua kali Pythagoras" (ManimGL).

Naskah   : manim/narasi/ruang-3d-04.json
Render   : manimgl manim/scenes/ruang_3d_04.py DuaKaliPythagoras -w -l
Periksa  : python manim/cek_video.py media/gl/DuaKaliPythagoras.mp4
Gabung   : python manim/gabung_audio.py ruang-3d-04 DuaKaliPythagoras --uji

KENAPA VIDEO INI PERLU 3D
Di kertas, segitiga ACG selalu digambar pipih dan siswa harus percaya begitu
saja bahwa ia berdiri di dalam kubus. Di sini segitiga itu benar-benar berdiri,
dan kamera memutarinya sehingga terlihat bahwa ia tidak menempel pada sisi mana
pun. Itu satu-satunya alasan 3D-nya, dan menurut saya alasan yang cukup: di
situlah letak kesalahan yang paling sering, yaitu menjumlahkan panjang, bukan
kuadratnya.

SATU WARNA SATU MAKNA:
  AKSEN2 biru = diagonal SISI (AC), hasil langkah pertama
  AKSEN merah = diagonal RUANG (AG), yang dicari
  SOROT ungu  = rusuk tegak CG, sisi ketiga segitiga penolong
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ruang_3d_umum import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

TOPIK = "ruang-3d-04"
DURASI = durasi(TOPIK)


class DuaKaliPythagoras(AdeganMatra):
    def construct(self):
        frame = self.frame

        kubus = kubus_pejal()
        rangka = rangka_kubus()

        ab = Line(T["A"], T["B"]).set_stroke(REDUP, 5)
        bc = Line(T["B"], T["C"]).set_stroke(REDUP, 5)
        ac = Line(T["A"], T["C"]).set_stroke(AKSEN2, 6)
        cg = Line(T["C"], T["G"]).set_stroke(SOROT, 6)
        ag = Line(T["A"], T["G"]).set_stroke(AKSEN, 6)

        # Segitiga penolong digambar sebagai BIDANG, bukan cuma tiga garis.
        # Bidang itulah yang memperlihatkan bahwa ia berdiri di dalam kubus dan
        # tidak menempel pada sisi mana pun; tiga garis saja masih bisa dikira
        # tergambar di permukaan.
        muka_alas = Polygon(T["A"], T["B"], T["C"]).set_fill(AKSEN2, 0.18).set_stroke(width=0)
        muka_tegak = Polygon(T["A"], T["C"], T["G"]).set_fill(AKSEN, 0.20).set_stroke(width=0)

        siku_b = siku(T["A"], T["B"], T["C"], ukuran=0.5)
        siku_c = siku(T["A"], T["C"], T["G"], ukuran=0.5)

        lab = huruf_sudut(frame, {"A": TINTA, "B": TINTA, "C": AKSEN2, "G": AKSEN})

        # --- Babak 1: pengumuman materi.
        kamera.pasang_awal(frame, theta=-42, phi=74, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        # Papan koordinat berangka: tanpa ini kalimat "enam satuan" di narasi
        # tidak punya sandaran apa pun di layar (revisi ARYA 2 Sep malam).
        sumbu, angka_sumbu = papan_koordinat(frame)
        self.add(lantai(), sumbu, *angka_sumbu, kubus)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 04: Dua kali Pythagoras", lama=3.4, y=3.0)
            b.catat(3.4)
            b.main(kubus.animate.set_opacity(0.14), ShowCreation(rangka), run_time=2.0)
            isi_sisa(b, kamera.sudut(frame, -28, 68, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"kubus": kubus})

        # --- Babak 2: diagonal sisi, semuanya masih datar di lantai.
        with sinema.babak(self, "sisi", DURASI) as b:
            b.main(*[FadeIn(x) for x in lab.values()], run_time=0.8)
            b.main(ShowCreation(ab), ShowCreation(bc), run_time=1.2)
            b.main(ShowCreation(ac), FadeIn(muka_alas), ShowCreation(siku_b), run_time=1.6)
            sinema.keterangan(self, "AC diagonal *sisi*, segitiga ABC siku-siku di B",
                              warna=AKSEN2)
            b.catat(0.6)
            isi_sisa(b, kamera.sudut(frame, -12, 52, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"AC": ac, "huruf C": lab["C"],
                                 "keterangan": self._matra_keterangan},
                          [("AC", "keterangan")])

        # --- Babak 3: angka langkah pertama, sengaja DIBIARKAN sebagai kuadrat.
        p1 = rumus(r"AC^2 = 6^2 + 6^2 = 72", 34, AKSEN2).to_corner(UR, buff=0.5)
        with sinema.babak(self, "hitung1", DURASI) as b:
            self.hud_tambah(p1)
            p1.set_opacity(0)
            b.main(p1.animate.set_opacity(1), run_time=0.8)
            sinema.keterangan(self, "jangan diakarkan dulu, angka *tujuh puluh dua* masih dipakai",
                              warna=AKSEN2)
            b.catat(0.6)
            isi_sisa(b, kamera.putar_pelan(frame, 18))
            b.jeda(0.8)
        qc.periksa_adegan(self, {"panel 1": p1, "keterangan": self._matra_keterangan},
                          [("panel 1", "keterangan")])

        # --- Babak 4: segitiga penolong BERDIRI. Kamera memutarinya supaya
        #     terlihat bahwa ia menembus bagian dalam, bukan menempel di sisi.
        with sinema.babak(self, "ruang", DURASI) as b:
            b.main(FadeOut(ab), FadeOut(bc), FadeOut(muka_alas), run_time=0.8)
            b.main(ShowCreation(ag), run_time=1.4)
            b.main(ShowCreation(cg), FadeIn(muka_tegak), ShowCreation(siku_c), run_time=1.6)
            sinema.keterangan(self, "segitiga ACG *berdiri* di dalam kubus", warna=AKSEN)
            b.catat(0.6)
            isi_sisa(b, kamera.sudut(frame, -74, 76, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"AG": ag, "CG": cg, "panel 1": p1,
                                 "keterangan": self._matra_keterangan},
                          [("AG", "keterangan")])

        # --- Babak 5: Pythagoras kedua, memakai hasil pertama sebagai sisi.
        p2 = rumus(r"AG^2 = 72 + 36 = 108", 34, AKSEN)
        p2.next_to(p1, DOWN, buff=0.3).align_to(p1, RIGHT)
        p3 = rumus(r"AG = 6\sqrt{3} \approx 10{,}392", 34, AKSEN)
        p3.next_to(p2, DOWN, buff=0.3).align_to(p1, RIGHT)
        with sinema.babak(self, "hitung2", DURASI) as b:
            self.hud_tambah(p2)
            p2.set_opacity(0)
            b.main(p2.animate.set_opacity(1), run_time=0.8)
            self.hud_tambah(p3)
            p3.set_opacity(0)
            b.main(p3.animate.set_opacity(1), run_time=0.8)
            sinema.keterangan(self, "yang dijumlahkan *kuadratnya*, bukan panjangnya", warna=AKSEN)
            b.catat(0.6)
            isi_sisa(b, kamera.sudut(frame, -34, 66, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"panel 1": p1, "panel 2": p2, "panel 3": p3,
                                 "keterangan": self._matra_keterangan},
                          [("panel 2", "panel 3"), ("panel 3", "keterangan")])

        # --- Babak 6: kenapa akar tiga, yaitu tiga arah yang dilewati.
        with sinema.babak(self, "tutup", DURASI) as b:
            sinema.keterangan(self, "akar *tiga* karena tiga arah: panjang, lebar, tinggi",
                              warna=SOROT)
            b.catat(0.6)
            isi_sisa(b, kamera.putar_pelan(frame, 30), sisakan=1.6)
            b.jeda(1.2)
        qc.periksa_adegan(self, {"AG": ag, "panel 3": p3, "huruf A": lab["A"],
                                 "keterangan": self._matra_keterangan},
                          [("panel 3", "keterangan"), ("huruf A", "keterangan")])
