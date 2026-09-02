"""Ruang Tiga Dimensi, materi 08: "Sudut dua garis yang tidak pernah bertemu" (ManimGL).

Naskah   : manim/narasi/ruang-3d-08.json
Render   : manimgl manim/scenes/ruang_3d_08.py SudutGarisBersilangan -w -l
Periksa  : python manim/cek_video.py media/gl/SudutGarisBersilangan.mp4
Gabung   : python manim/gabung_audio.py ruang-3d-08 SudutGarisBersilangan --uji

KENAPA VIDEO INI PERLU 3D, DAN KENAPA GESERANNYA HARUS PELAN
Kekeliruan yang paling sering di materi ini bukan salah hitung, melainkan
garisnya ikut DIPUTAR sedikit supaya "pas" ke titik yang diinginkan. Begitu
arahnya berubah, sudutnya berubah. Maka geserannya dianimasikan pelan dan
posisi asalnya ditinggal sebagai bayangan samar, supaya mata sendiri yang
memastikan garisnya tetap sejajar dengan dirinya yang dulu.

SATU WARNA SATU MAKNA:
  AKSEN2 biru = AC, garis yang diam
  AKSEN merah = BG, garis yang digeser, dan AH tempat ia mendarat
  SOROT ungu  = sudut 60 derajat, yaitu jawabannya
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ruang_3d_umum import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

TOPIK = "ruang-3d-08"
DURASI = durasi(TOPIK)

# Geseran sejajar dari BG ke AH: setiap titik bergerak dengan vektor yang SAMA,
# yaitu A dikurangi B. Ditulis begini, bukan dengan menyebut A dan H langsung,
# supaya kesejajarannya terjamin oleh caranya dibuat, bukan oleh ketelitian
# saya mengetik dua nama titik.
GESER = T["A"] - T["B"]


class SudutGarisBersilangan(AdeganMatra):
    def construct(self):
        frame = self.frame

        kubus = kubus_pejal()
        rangka = rangka_kubus()

        ac = Line(T["A"], T["C"]).set_stroke(AKSEN2, 6)
        bg_asal = Line(T["B"], T["G"]).set_stroke(AKSEN, 2.5).set_stroke(opacity=0.45)

        s = ValueTracker(0.0)   # 0 = di BG, 1 = sudah mendarat jadi AH
        bg = always_redraw(lambda: Line(
            T["B"] + GESER * s.get_value(), T["G"] + GESER * s.get_value()
        ).set_stroke(AKSEN, 6))

        lab = huruf_sudut(frame, {"A": AKSEN2, "B": AKSEN, "C": AKSEN2, "G": AKSEN})

        # --- Babak 1: pengumuman materi.
        kamera.pasang_awal(frame, theta=-46, phi=72, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        self.add(lantai(), kubus)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 08: Sudut dua garis bersilangan",
                                 lama=3.4, y=3.0)
            b.catat(3.4)
            b.main(kubus.animate.set_opacity(0.14), ShowCreation(rangka), run_time=2.0)
            isi_sisa(b, kamera.sudut(frame, -34, 68, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"kubus": kubus})

        # --- Babak 2: kedua garis, dan masalahnya: tidak punya titik bersama.
        with sinema.babak(self, "masalah", DURASI) as b:
            b.main(*[FadeIn(x) for x in lab.values()], run_time=0.8)
            b.main(ShowCreation(ac), run_time=1.2)
            b.main(ShowCreation(bg), run_time=1.2)
            sinema.keterangan(self, "AC dan BG *bersilangan*: tidak ada titik bersama")
            b.catat(0.6)
            isi_sisa(b, kamera.sudut(frame, -68, 70, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"AC": ac, "huruf C": lab["C"], "huruf G": lab["G"],
                                 "keterangan": self._matra_keterangan},
                          [("huruf C", "keterangan")])

        # --- Babak 3: geseran sejajar, PELAN, dengan bayangan posisi asalnya.
        with sinema.babak(self, "geser", DURASI) as b:
            b.main(FadeIn(bg_asal), run_time=0.6)
            sinema.keterangan(self, "digeser *sejajar dirinya sendiri*, tanpa diputar",
                              warna=AKSEN)
            b.catat(0.6)
            b.main(s.animate.set_value(1.0), run_time=max(3.5, b.sisa - 1.0),
                   rate_func=smooth)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"BG": bg, "AC": ac,
                                 "keterangan": self._matra_keterangan},
                          [("AC", "keterangan")])

        # --- Babak 4: mendarat tepat di AH, diagonal sisi yang memang sudah ada.
        lab_h = huruf_sudut(frame, {"H": AKSEN})
        with sinema.babak(self, "mendarat", DURASI) as b:
            b.main(FadeIn(lab_h["H"]), run_time=0.7)
            sinema.keterangan(self, "mendarat tepat menjadi *AH*, diagonal sisi kiri",
                              warna=AKSEN)
            b.catat(0.6)
            isi_sisa(b, kamera.sudut(frame, -24, 66, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"BG": bg, "huruf H": lab_h["H"], "huruf A": lab["A"],
                                 "keterangan": self._matra_keterangan},
                          [("huruf H", "keterangan")])

        # --- Babak 5: segitiga ACH, ketiga sisinya diagonal sisi yang sama panjang.
        ch = Line(T["C"], T["H"]).set_stroke(REDUP, 5)
        muka = Polygon(T["A"], T["C"], T["H"]).set_fill(SOROT, 0.16).set_stroke(width=0)
        # Jari-jarinya sengaja besar. Pada percobaan pertama busurnya jari 1,1 dan
        # titik A yang jauh dari kamera membuatnya menyusut jadi coretan kecil di
        # pojok, padahal sudut 60 derajat itulah yang sedang diajarkan.
        busur_a = busur(T["C"], T["A"], T["H"], warna=SOROT, jari=2.0, tebal=4.5)
        p1 = rumus(r"AC = AH = CH = 6\sqrt{2}", 32, TINTA).to_corner(UR, buff=0.5)
        with sinema.babak(self, "segitiga", DURASI) as b:
            b.main(ShowCreation(ch), FadeIn(muka), run_time=1.4)
            b.main(ShowCreation(busur_a), run_time=0.8)
            self.hud_tambah(p1)
            p1.set_opacity(0)
            b.main(p1.animate.set_opacity(1), run_time=0.7)
            sinema.keterangan(self, "ketiganya sama panjang, jadi segitiga *sama sisi*")
            b.catat(0.6)
            isi_sisa(b, kamera.sudut(frame, -58, 62, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"CH": ch, "panel": p1,
                                 "keterangan": self._matra_keterangan},
                          [("panel", "keterangan")])

        # --- Babak 6: jawabannya, tanpa satu pun perhitungan trigonometri.
        p2 = rumus(r"\angle(AC, BG) = 60^\circ", 36, SOROT)
        p2.next_to(p1, DOWN, buff=0.35).align_to(p1, RIGHT)
        with sinema.babak(self, "tutup", DURASI) as b:
            self.hud_tambah(p2)
            p2.set_opacity(0)
            b.main(p2.animate.set_opacity(1), run_time=0.8)
            sinema.keterangan(self, "menggeser tidak mengubah arah, jadi tidak mengubah *sudut*",
                              warna=SOROT)
            b.catat(0.6)
            isi_sisa(b, kamera.putar_pelan(frame, 26), sisakan=1.6)
            b.jeda(1.2)
        qc.periksa_adegan(self, {"panel 1": p1, "panel 2": p2, "busur": busur_a,
                                 "huruf A": lab["A"], "keterangan": self._matra_keterangan},
                          [("panel 1", "panel 2"), ("panel 2", "keterangan"),
                           ("huruf A", "keterangan"), ("busur", "keterangan")])
