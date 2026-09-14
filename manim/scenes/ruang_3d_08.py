"""Ruang Tiga Dimensi, materi 08: Sudut dalam Ruang Bagian 1, sudut dua garis bersilangan.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (85 detik,
6 babak) yang sudah disetujui ARYA. ISINYA SAMA: AC di lantai dan BG di sisi
kanan bersilangan; sudut butuh titik sudut; BG digeser sejajar dirinya sendiri
(pelan, tanpa berputar) sampai mendarat di AH; segitiga ACH sama sisi 6 akar 2;
sudutnya 60 derajat tanpa trigonometri; menggeser tidak mengubah arah.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 1 lalu pertanyaannya; segar-ingat
  Kedudukan Titik, Garis, dan Bidang Bagian 1 (nama bersilangan) dengan
  gambar dua garis menyilang di layar.
- Cek panjang CH dari koordinat C(6, 6, 0) dan H(0, 6, 6); bentuk umum sudut
  dua garis bersilangan lahir di dekat sudutnya; penutup menunjuk Bagian 2.
- Tiap kejadian dipicu pada KATA yang mengucapkannya (`sinema.JamKata`).
- Sorot panel memakai `papan.sorot()`.

Naskah   : manim/narasi/ruang-3d-08.json (11 segmen, 2:11)
Render   : manimgl manim/scenes/ruang_3d_08.py SudutGarisBersilangan -w --hd --config_file manim/hd60.yml
Gabung   : python manim/gabung_audio.py ruang-3d-08 SudutGarisBersilangan --keluar ruang-3d-08.mp4
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ruang_3d_umum import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

TOPIK = "ruang-3d-08"
DURASI = durasi(TOPIK)
KATA = sinema.JamKata(TOPIK)

# Geseran sejajar dari BG ke AH: setiap titik bergerak dengan vektor yang SAMA,
# yaitu A dikurangi B; kesejajarannya dijamin caranya dibuat.
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

        papan_koor = papan_koordinat(frame)
        papan = sinema.PapanRumus(self)
        lab = huruf_sudut(frame, {"A": AKSEN2, "B": AKSEN, "C": AKSEN2, "G": AKSEN, "H": AKSEN})

        kamera.pasang_awal(frame, theta=-46, phi=72, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        pasang_cahaya(self)
        bayangan = bayangan_kubus()
        self.add(lantai(), bayangan, *papan_koor["datar"], *papan_koor["tinggi"], kubus)

        # ---- buka: judul sub-bab, dua garis menyilang di layar dengan tanda tanya.
        g1 = Line(np.array([-2.0, -0.9, 0.0]), np.array([2.0, 0.9, 0.0])).set_stroke(AKSEN2, 5)
        g2 = Line(np.array([-1.6, 1.2, 0.0]), np.array([1.6, -1.2, 0.0])).set_stroke(AKSEN, 5)
        tanya = rumus("?", 60, SOROT).move_to([0.0, 1.9, 0.0])
        pembuka = VGroup(g1, g2, tanya).fix_in_frame()
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sudut")
            sinema.judul_pembuka(self, "Sudut dalam Ruang, Bagian 1", lama=3.0, y=3.0)
            b.catat(3.0)
            b.tunggu_kata("dua garis")
            b.main(ShowCreation(g1), ShowCreation(g2), run_time=0.8)
            b.tunggu_kata("bertemu")
            b.main(FadeIn(tanya, shift=0.2 * UP), run_time=0.6)
        qc.periksa_adegan(self, {"kubus": kubus, "pembuka": pembuka})

        # ---- ingat: nama bersilangan dari Bagian 1; kubus jadi rangka.
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Kedudukan")
            b.main(FadeOut(tanya), run_time=0.4)
            b.tunggu_kata("tidak sejajar")
            b.main(g2.animate.shift(np.array([0.0, 0.9, 0.0])), run_time=1.0)
            b.tunggu_kata("bersilangan")
            b.main(Indicate(g1, color=SOROT), Indicate(g2, color=SOROT), run_time=1.0)
            b.tunggu_kata("Hari ini")
            b.main(FadeOut(g1), FadeOut(g2), kubus.animate.set_opacity(0.14),
                   ShowCreation(rangka, lag_ratio=0.12), FadeOut(bayangan), run_time=1.6)
            tunggu_kata_bergeser(b, frame, "keduanya")
            b.main(kamera.sudut(frame, -34, 68, pusat=PUSAT, tinggi=TINGGI_BINGKAI), run_time=1.2)
        qc.periksa_adegan(self, {"kubus": kubus})

        # ---- masalah: AC dan BG, tidak punya titik bersama.
        jati = sinema.identitas(self, "panjang = lebar = tinggi = 6 satuan")
        self.remove(jati)
        with sinema.babak(self, "masalah", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ini A")
            self.add(jati)
            sumbu_z_pamit(b, papan_koor, 0.4)
            b.main(*[FadeIn(x) for x in lab.values()], FadeIn(jati), ShowCreation(ac), run_time=0.9)
            tunggu_kata_bergeser(b, frame, "ini B")
            b.main(ShowCreation(bg), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "Keduanya bersilangan")
            b.main(Indicate(ac, color=AKSEN2), Indicate(bg, color=AKSEN), run_time=1.2)
            tunggu_kata_bergeser(b, frame, "Padahal")
            b.main(kamera.sudut(frame, -68, 70, pusat=PUSAT, tinggi=TINGGI_BINGKAI), run_time=2.4)
        qc.periksa_adegan(self, {"AC": ac, "huruf C": lab["C"], "huruf G": lab["G"],
                                 "identitas": jati})

        # ---- geser: sejajar dirinya sendiri, pelan, bayangan asalnya tinggal.
        with sinema.babak(self, "geser", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "kita geser")
            b.main(FadeIn(bg_asal), run_time=0.5)
            b.main(s.animate.set_value(0.35), run_time=1.6, rate_func=smooth)
            tunggu_kata_bergeser(b, frame, "Perhatikan")
            b.main(s.animate.set_value(1.0), run_time=3.4, rate_func=smooth)
        qc.periksa_adegan(self, {"BG": bg, "AC": ac, "identitas": jati})

        # ---- mendarat: tepat di AH.
        with sinema.babak(self, "mendarat", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "mendarat")
            b.main(lab["H"].animate.scale(1.25), run_time=0.6)
            tunggu_kata_bergeser(b, frame, "bertemu")
            # 0,6 dan 1,2 detik (dulu 1,0 dan 1,6): narasi Bian menyisakan 2,0 detik
            # sesudah "bertemu" (14 Sep 2026)
            b.main(Indicate(lab["A"], scale_factor=1.6, color=SOROT), run_time=0.6)
            b.main(kamera.sudut(frame, -24, 66, pusat=PUSAT, tinggi=TINGGI_BINGKAI), run_time=1.2)
        qc.periksa_adegan(self, {"BG": bg, "huruf H": lab["H"], "huruf A": lab["A"],
                                 "identitas": jati})

        # ---- segitiga: ACH, ketiga sisinya 6 akar 2.
        ch = Line(T["C"], T["H"]).set_stroke(REDUP, 5)
        muka = Polygon(T["A"], T["C"], T["H"]).set_fill(SOROT, 0.16).set_stroke(width=0)
        busur_a = busur(T["C"], T["A"], T["H"], warna=SOROT, jari=2.0, tebal=4.5)
        n_ac = label_hadap(frame, "6\\sqrt{2}", sepanjang3(T["A"], T["C"], 0.62)
                           + np.array([0.55, -0.30, 0.35]), AKSEN2, 26, rumus_latex=True)
        n_ah = label_hadap(frame, "6\\sqrt{2}", sepanjang3(T["A"], T["H"], 0.62)
                           + np.array([-0.75, 0.15, 0.0]), AKSEN, 26, rumus_latex=True)
        n_ch = label_hadap(frame, "6\\sqrt{2}", sepanjang3(T["C"], T["H"], 0.5)
                           + np.array([0.0, 0.85, 0.30]), REDUP, 26, rumus_latex=True)
        with sinema.babak(self, "segitiga", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "segitiga")
            b.main(ShowCreation(ch), FadeIn(muka), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "diagonal sisi alas")
            b.main(FadeIn(n_ac), run_time=0.6)
            tunggu_kata_bergeser(b, frame, "sisi kiri")
            b.main(FadeIn(n_ah), run_time=0.6)
            tunggu_kata_bergeser(b, frame, "sisi belakang")
            b.main(FadeIn(n_ch), run_time=0.6)
            tunggu_kata_bergeser(b, frame, "Ketiganya")
            sinema.lahir_rumus(self, r"AC = AH = CH = 6\sqrt{2}", dekat=ch,
                               papan=papan, b=b, tahan=0.4, run_time=1.0)
        qc.periksa_adegan(self, {"CH": ch, "panel": papan.semua(), "nilai AC": n_ac, "nilai AH": n_ah,
                                 "nilai CH": n_ch, "identitas": jati},
                          [("panel", "identitas"), ("nilai AC", "nilai AH"),
                           ("nilai AH", "nilai CH")])

        # ---- cek: CH dari koordinat.
        lab_c = label_hadap(frame, "(6,\\ 6,\\ 0)", T["C"] + np.array([0.9, 0.6, -0.7]), AKSEN2, 24,
                            rumus_latex=True)
        lab_h = label_hadap(frame, "(0,\\ 6,\\ 6)", T["H"] + np.array([-1.9, 0.9, 0.9]), AKSEN, 24,
                            rumus_latex=True)
        with sinema.babak(self, "cek", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "C di")
            b.main(FadeIn(lab_c), run_time=0.6)
            tunggu_kata_bergeser(b, frame, "H di")
            b.main(FadeIn(lab_h), run_time=0.6)
            tunggu_kata_bergeser(b, frame, "Selisihnya")
            b.main(Indicate(ch, color=SOROT), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "panjangnya")
            papan.baris(r"CH = \sqrt{6^2 + 0^2 + 6^2} = \sqrt{72}", REDUP, b=b)
            tunggu_kata_bergeser(b, frame, "Cocok")
            b.main(papan.sorot(), run_time=1.0)
        qc.periksa_adegan(self, {"CH": ch, "panel": papan.semua(), "koordinat C": lab_c,
                                 "koordinat H": lab_h, "identitas": jati},
                          [("panel", "identitas"), ("koordinat C", "nilai CH")])

        # ---- sudut: 60 derajat, tanpa trigonometri.
        n_sudut = label_hadap(frame, "60^\\circ", T["A"] + np.array([1.3, 1.3, 0.55]),
                              SOROT, 32, rumus_latex=True)
        with sinema.babak(self, "sudut", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "Semua sudut")
            b.main(FadeOut(lab_c), FadeOut(lab_h), ShowCreation(busur_a), run_time=0.9)
            tunggu_kata_bergeser(b, frame, "enam puluh")
            b.main(FadeIn(n_sudut), run_time=0.7)
            papan.baris(r"\angle(AC, BG) = 60^\circ", SOROT, b=b)
            tunggu_kata_bergeser(b, frame, "tanpa")
            b.main(kamera.sudut(frame, -58, 62, pusat=PUSAT, tinggi=TINGGI_BINGKAI), run_time=1.8)
        qc.periksa_adegan(self, {"panel": papan.semua(), "busur": busur_a,
                                 "nilai sudut": n_sudut, "identitas": jati},
                          [("panel", "identitas"), ("nilai sudut", "identitas")])

        # ---- umum: sudut dua garis bersilangan, lahir di dekat busurnya.
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "Bentuk umumnya")
            b.main(FadeOut(papan.semua()), FadeOut(n_ac), FadeOut(n_ah), FadeOut(n_ch), run_time=0.6)
            self.remove(*papan.semua(), n_ac, n_ah, n_ch)
            papan = sinema.PapanRumus(self)
            tunggu_kata_bergeser(b, frame, "berpotongan")
            sinema.lahir_rumus(self, r"\angle(g, h) = \angle(g, h')\ ,\ h' \parallel h", dekat=busur_a,
                               papan=papan, b=b, warna=SOROT, tahan=0.5, run_time=1.1)
            tunggu_kata_bergeser(b, frame, "Menggeser")
            b.main(Indicate(bg, color=AKSEN), Indicate(bg_asal, color=AKSEN), run_time=1.2)
            tunggu_kata_bergeser(b, frame, "mengubah sudut")
            b.main(Indicate(busur_a, color=SOROT), run_time=0.9)
        qc.periksa_adegan(self, {"panel": papan.semua(), "busur": busur_a,
                                 "nilai sudut": n_sudut, "identitas": jati},
                          [("panel", "identitas"), ("nilai sudut", "identitas")])

        # ---- tutup: geser, temukan, ukur.
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "jangan diukur")
            b.main(Indicate(bg_asal, color=AKSEN), run_time=0.9)
            tunggu_kata_bergeser(b, frame, "Geser satu")
            b.main(s.animate.set_value(0.0), run_time=0.9, rate_func=smooth)
            b.main(s.animate.set_value(1.0), run_time=1.4, rate_func=smooth)
            tunggu_kata_bergeser(b, frame, "ukur sudut")
            b.main(Indicate(busur_a, color=SOROT), Indicate(n_sudut, color=SOROT), run_time=1.0)
        qc.periksa_adegan(self, {"panel": papan.semua(), "busur": busur_a,
                                 "nilai sudut": n_sudut, "identitas": jati},
                          [("panel", "identitas"), ("nilai sudut", "identitas")])

        # ---- lanjut: Bagian 2, garis dengan bidang.
        ag = Line(T["A"], T["G"]).set_stroke(SOROT, 5)
        lantai_sorot = Polygon(T["A"], T["B"], T["C"], T["D"]).set_fill(AKSEN2, 0.18).set_stroke(width=0)
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "berikutnya")
            b.main(FadeOut(papan.semua()), FadeOut(muka), FadeOut(busur_a), FadeOut(n_sudut),
                   FadeOut(ch), FadeOut(bg_asal), run_time=0.7)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self)
            tunggu_kata_bergeser(b, frame, "garis dan bidang")
            b.main(ShowCreation(ag), FadeIn(lantai_sorot), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "dua bidang")
            b.main(Indicate(lantai_sorot, color=AKSEN2, scale_factor=1.0), run_time=1.0)
        qc.periksa_adegan(self, {"AG": ag, "lantai": lantai_sorot, "identitas": jati})

        sinema.laporkan_pemicu(self)
