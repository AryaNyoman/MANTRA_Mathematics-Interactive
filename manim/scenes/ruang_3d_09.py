"""Ruang Tiga Dimensi, materi 09: Sudut dalam Ruang Bagian 2, sudut dengan bidang.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (92 detik,
7 babak) yang sudah disetujui ARYA. ISINYA SAMA: sudut garis dengan bidang =
sudut garis dengan bayangannya (AG dan AC; tangen = 6 : 6 akar 2; 35,26
derajat); sudut dua bidang lewat garis potong BD, titik P di tengahnya, PC di
lantai dan PG di bidang miring (54,74 derajat); syarat tegak lurus garis potong
dan bertumpu di satu titik yang sama.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 2 lalu pertanyaannya; segar-ingat
  Bagian 1 (geser sampai bertemu); tangen menyebut Perbandingan Trigonometri
  Bagian 4.
- Sudut kedua DIHITUNG dengan angka (PC = 3 akar 2, CG = 6, tangen = akar 2);
  dua bentuk umum lahir di panel; penutup menunjuk Penerapan Ruang Tiga Dimensi.
- Tiap kejadian dipicu pada KATA yang mengucapkannya (`sinema.JamKata`).
- Sorot panel memakai `papan.sorot()`.

Naskah   : manim/narasi/ruang-3d-09.json (11 segmen, 2:29)
Render   : manimgl manim/scenes/ruang_3d_09.py SudutDenganBidang -w --hd --config_file manim/hd60.yml
Gabung   : python manim/gabung_audio.py ruang-3d-09 SudutDenganBidang --keluar ruang-3d-09.mp4
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ruang_3d_umum import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

TOPIK = "ruang-3d-09"
DURASI = durasi(TOPIK)
KATA = sinema.JamKata(TOPIK)

P = (T["B"] + T["D"]) / 2.0   # titik tumpu di TENGAH garis potong BD


class SudutDenganBidang(AdeganMatra):
    def construct(self):
        frame = self.frame

        kubus = kubus_pejal()
        rangka = rangka_kubus()

        ag = Line(T["A"], T["G"]).set_stroke(AKSEN, 6)
        ac = Line(T["A"], T["C"]).set_stroke(AKSEN2, 6)
        cg = Line(T["C"], T["G"]).set_stroke(REDUP, 3)
        siku_c = siku(T["A"], T["C"], T["G"], ukuran=0.5)
        busur_a = busur(T["C"], T["A"], T["G"], warna=SOROT, jari=1.9, tebal=4)

        bd = Line(T["B"], T["D"]).set_stroke(SOROT, 6)
        pc = Line(P, T["C"]).set_stroke(AKSEN2, 5)
        pg = Line(P, T["G"]).set_stroke(AKSEN, 5)
        cg2 = Line(T["C"], T["G"]).set_stroke(REDUP, 3)
        bidang_bdg = Polygon(T["B"], T["D"], T["G"]).set_fill(AKSEN, 0.24).set_stroke(AKSEN, 3)
        siku_p1 = siku(T["B"], P, T["C"], ukuran=0.45)
        siku_p2 = siku(T["D"], P, T["G"], ukuran=0.45)
        busur_p = busur(T["C"], P, T["G"], warna=SOROT, jari=1.2, tebal=4)

        papan_koor = papan_koordinat(frame)
        papan = sinema.PapanRumus(self, tanpa_utama=True)
        lab = huruf_sudut(frame, {"A": TINTA, "C": AKSEN2, "G": AKSEN})
        lab2 = huruf_sudut(frame, {"B": SOROT, "D": SOROT, "G": AKSEN, "C": AKSEN2})

        kamera.pasang_awal(frame, theta=-60, phi=72, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        pasang_cahaya(self)
        bayangan = bayangan_kubus()
        self.add(lantai(), bayangan, *papan_koor["datar"], *papan_koor["tinggi"], kubus)

        # ---- buka: judul sub-bab; garis miring dan bidang sebagai pertanyaan.
        tanya = rumus("?", 64, SOROT).move_to([0.0, 0.8, 0.0]).fix_in_frame()
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sudut")
            sinema.judul_pembuka(self, "Sudut dalam Ruang, Bagian 2", lama=3.0, y=3.0)
            b.catat(3.0)
            b.tunggu_kata("garis dan bidang")
            b.main(kubus.animate.set_opacity(0.14), ShowCreation(rangka, lag_ratio=0.12),
                   FadeOut(bayangan), ShowCreation(ag), run_time=1.5)
            b.tunggu_kata("dua bidang")
            b.main(FadeIn(tanya, shift=0.2 * UP), run_time=0.6)
        qc.periksa_adegan(self, {"kubus": kubus, "AG": ag, "tanya": tanya})

        # ---- ingat: Bagian 1, dua garis bersilangan digeser sampai bertemu.
        ac_ingat = Line(T["A"], T["C"]).set_stroke(AKSEN2, 4)
        s = ValueTracker(0.0)
        geser = T["A"] - T["B"]
        bg_ingat = always_redraw(lambda: Line(T["B"] + geser * s.get_value(),
                                              T["G"] + geser * s.get_value()).set_stroke(AKSEN, 4))
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Sudut")
            b.main(FadeOut(tanya), ag.animate.set_stroke(opacity=0.25), run_time=0.6)
            b.tunggu_kata("dua garis")
            self.add(ac_ingat, bg_ingat)
            b.main(ShowCreation(ac_ingat), ShowCreation(bg_ingat), run_time=0.9)
            b.tunggu_kata("digeser")
            b.main(s.animate.set_value(1.0), run_time=1.6, rate_func=smooth)
            tunggu_kata_bergeser(b, frame, "Hari ini")
            self.remove(bg_ingat)
            b.main(FadeOut(ac_ingat), ag.animate.set_stroke(opacity=1.0), run_time=0.7)
            tunggu_kata_bergeser(b, frame, "bayangan")
            b.main(kamera.sudut(frame, -30, 68, pusat=PUSAT, tinggi=TINGGI_BINGKAI), run_time=1.2)
        qc.periksa_adegan(self, {"kubus": kubus, "AG": ag})

        # ---- bayangan: AG menembus lantai di A.
        jati = sinema.identitas(self, "panjang = lebar = tinggi = 6 satuan")
        self.remove(jati)
        with sinema.babak(self, "bayangan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bagian pertama")
            sumbu_z_pamit(b, papan_koor, 0.6)
            self.add(jati)
            b.main(*[FadeIn(x) for x in lab.values()], FadeIn(jati), run_time=0.7)
            tunggu_kata_bergeser(b, frame, "diagonal ruang")
            b.main(Indicate(ag, color=AKSEN), run_time=1.1)
            tunggu_kata_bergeser(b, frame, "menembus lantai")
            b.main(Indicate(lab["A"], scale_factor=1.6, color=SOROT), run_time=0.9)
            tunggu_kata_bergeser(b, frame, "bayangannya")
            b.main(kamera.sudut(frame, -20, 74, pusat=PUSAT, tinggi=TINGGI_BINGKAI), run_time=1.6)
        qc.periksa_adegan(self, {"AG": ag, "huruf G": lab["G"], "identitas": jati})

        # ---- proyeksi: bayangan A tetap A, bayangan G jatuh di C.
        n_cg = label_hadap(frame, "6", sepanjang3(T["C"], T["G"], 0.5)
                           + np.array([0.65, 0.30, 0.0]), REDUP, 28)
        n_ac = label_hadap(frame, "6\\sqrt{2}", sepanjang3(T["A"], T["C"], 0.34)
                           + np.array([0.35, -0.55, 0.32]), AKSEN2, 28, rumus_latex=True)
        with sinema.babak(self, "proyeksi", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "tetap A")
            b.main(Indicate(lab["A"], scale_factor=1.5, color=TINTA), run_time=0.8)
            tunggu_kata_bergeser(b, frame, "Bayangan G")
            sumbu_z_muncul(b, papan_koor, 0.6)
            tunggu_kata_bergeser(b, frame, "jatuh di")
            b.main(ShowCreation(cg), run_time=0.8)
            b.main(ShowCreation(siku_c), run_time=0.5)
            tunggu_kata_bergeser(b, frame, "Jadi bayangan")
            b.main(ShowCreation(ac), run_time=1.0)
            b.main(FadeIn(n_cg), FadeIn(n_ac), run_time=0.7)
        qc.periksa_adegan(self, {"AC": ac, "AG": ag, "nilai CG": n_cg, "nilai AC": n_ac,
                                 "identitas": jati},
                          [("nilai CG", "nilai AC")])

        # ---- sudut1: tangen dari Perbandingan Trigonometri Bagian 4.
        with sinema.babak(self, "sudut1", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "tangen sudut")
            papan.baris(r"\tan\theta = \text{depan} : \text{samping}", REDUP, b=b)
            tunggu_kata_bergeser(b, frame, "Pada segitiga")
            b.main(ShowCreation(busur_a), run_time=0.8)
            tunggu_kata_bergeser(b, frame, "tangen sudutnya")
            sinema.lahir_rumus(self, r"\tan\theta = \frac{6}{6\sqrt{2}} = \frac{1}{\sqrt{2}}", dekat=cg,
                               papan=papan, b=b, warna=SOROT, tahan=0.5, run_time=1.1,
                               sebagai_utama=False)
            tunggu_kata_bergeser(b, frame, "kira-kira")
            papan.baris(r"\theta \approx 35{,}26^\circ", SOROT, b=b)
        qc.periksa_adegan(self, {"panel": papan.semua(), "busur": busur_a,
                                 "identitas": jati},
                          [("panel", "identitas")])

        # ---- potong: bagian kedua, bidang BDG dan garis potong BD.
        lab_p = label_hadap(frame, "P", P + np.array([-0.85, -0.55, 0.15]), SOROT)
        tanda_p = penanda(self, frame, P)
        with sinema.babak(self, "potong", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bagian kedua")
            b.main(FadeOut(ag), FadeOut(ac), FadeOut(cg), FadeOut(siku_c),
                   FadeOut(busur_a), FadeOut(n_cg), FadeOut(n_ac),
                   FadeOut(papan.semua()), *[FadeOut(x) for x in lab.values()], run_time=0.9)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self)
            for x in lab2.values():
                x.set_opacity(0)
            self.add(*lab2.values())
            b.main(*[x.animate.set_opacity(1) for x in lab2.values()], run_time=0.5)
            tunggu_kata_bergeser(b, frame, "Bidang B")
            b.main(FadeIn(bidang_bdg), run_time=1.2)
            tunggu_kata_bergeser(b, frame, "yaitu")
            b.main(ShowCreation(bd), run_time=0.9)
            tunggu_kata_bergeser(b, frame, "garis potong")
            b.main(Indicate(bd, color=SOROT), run_time=1.0)
            b.main(kamera.sudut(frame, -14, 66, pusat=PUSAT, tinggi=TINGGI_BINGKAI), run_time=1.2)
        qc.periksa_adegan(self, {"bidang": bidang_bdg, "BD": bd, "huruf A": lab2["A"],
                                 "identitas": jati})

        # ---- sudut2: P, dua garis tegak lurus BD, busurnya.
        with sinema.babak(self, "sudut2", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "titik P")
            b.main(FadeIn(tanda_p), FadeIn(lab_p), run_time=0.7)
            tunggu_kata_bergeser(b, frame, "C di lantai")
            b.main(ShowCreation(pc), ShowCreation(siku_p1), run_time=0.9)
            tunggu_kata_bergeser(b, frame, "G di bidang")
            b.main(ShowCreation(pg), ShowCreation(siku_p2), run_time=0.9)
            tunggu_kata_bergeser(b, frame, "Sudut di antara")
            b.main(ShowCreation(busur_p), run_time=0.7)
            tunggu_kata_bergeser(b, frame, "itulah")
            b.main(Indicate(busur_p, color=SOROT), run_time=0.9)
        qc.periksa_adegan(self, {"PC": pc, "PG": pg, "busur": busur_p,
                                 "huruf P": lab_p, "identitas": jati})

        # ---- hitung2: PC = 3 akar 2, CG = 6, tangen = akar 2.
        n_pc = label_hadap(frame, "3\\sqrt{2}", sepanjang3(P, T["C"], 0.5)
                           + np.array([0.20, -0.65, 0.30]), AKSEN2, 28, rumus_latex=True)
        n_cg2 = label_hadap(frame, "6", sepanjang3(T["C"], T["G"], 0.5)
                            + np.array([0.65, 0.30, 0.0]), REDUP, 28)
        with sinema.babak(self, "hitung2", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "P C setengah")
            b.main(Indicate(pc, color=AKSEN2), run_time=0.9)
            tunggu_kata_bergeser(b, frame, "tiga akar")
            b.main(FadeIn(n_pc), run_time=0.6)
            tunggu_kata_bergeser(b, frame, "C G rusuk")
            b.main(ShowCreation(cg2), run_time=0.7)
            b.main(FadeIn(n_cg2), run_time=0.5)
            tunggu_kata_bergeser(b, frame, "Tangen")
            sinema.lahir_rumus(self, r"\tan\varphi = \frac{6}{3\sqrt{2}} = \sqrt{2}", dekat=pc,
                               papan=papan, b=b, warna=SOROT, tahan=0.5, run_time=1.1)
            tunggu_kata_bergeser(b, frame, "kira-kira")
            papan.baris(r"\varphi \approx 54{,}74^\circ", SOROT, b=b)
        qc.periksa_adegan(self, {"PC": pc, "PG": pg, "panel": papan.semua(),
                                 "huruf P": lab_p, "nilai PC": n_pc, "nilai CG": n_cg2,
                                 "identitas": jati},
                          [("panel", "identitas"), ("huruf P", "nilai PC")])

        # ---- umum: dua bentuk umum di panel.
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "Bentuk umumnya")
            b.main(FadeOut(papan.semua()), FadeOut(n_pc), FadeOut(n_cg2), FadeOut(cg2), run_time=0.6)
            self.remove(*papan.semua(), n_pc, n_cg2, cg2)
            papan = sinema.PapanRumus(self)
            tunggu_kata_bergeser(b, frame, "Sudut garis")
            papan.baris(r"\angle(g, \alpha) = \angle(g, g')\ ,\ g' = \text{bayangan } g", AKSEN, b=b)
            tunggu_kata_bergeser(b, frame, "Sudut dua")
            papan.baris(r"\angle(\alpha, \beta) = \angle(PC, PG)", SOROT, b=b)
            tunggu_kata_bergeser(b, frame, "tegak lurus")
            b.main(Indicate(siku_p1, scale_factor=1.6, color=SOROT),
                   Indicate(siku_p2, scale_factor=1.6, color=SOROT), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "satu titik")
            b.main(Indicate(lab_p, scale_factor=1.6, color=SOROT), run_time=0.9)
        qc.periksa_adegan(self, {"PC": pc, "PG": pg, "panel": papan.semua(),
                                 "huruf P": lab_p, "identitas": jati},
                          [("panel", "identitas")])

        # ---- tutup: dua syarat; P digeser, PC tidak lagi tegak lurus.
        P2 = P + (T["B"] - T["D"]) * 0.22
        pc_salah = Line(P2, T["C"]).set_stroke(AKSEN2, 4).set_stroke(opacity=0.6)
        pg_salah = Line(P2, T["G"]).set_stroke(AKSEN, 4).set_stroke(opacity=0.6)
        coret = label_hadap(frame, rumus(r"\times", 40, AKSEN), P2 + np.array([1.2, -1.2, 0.3]), AKSEN, 40)
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "tegak lurus")
            b.main(Indicate(siku_p1, scale_factor=1.6, color=SOROT),
                   Indicate(siku_p2, scale_factor=1.6, color=SOROT), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "bertumpu")
            b.main(Indicate(lab_p, scale_factor=1.6, color=SOROT), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "digeser")
            b.main(ShowCreation(pc_salah), ShowCreation(pg_salah), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "tidak lagi")
            b.main(FadeIn(coret), run_time=0.6)
            tunggu_kata_bergeser(b, frame, "salah")
            b.main(FadeOut(pc_salah), FadeOut(pg_salah), FadeOut(coret), run_time=0.7)
        qc.periksa_adegan(self, {"PC": pc, "PG": pg, "panel": papan.semua(),
                                 "identitas": jati},
                          [("panel", "identitas")])

        # ---- lanjut: Penerapan Ruang Tiga Dimensi.
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "berikutnya")
            b.main(FadeOut(papan.semua()), run_time=0.6)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self)
            tunggu_kata_bergeser(b, frame, "jarak")
            b.main(Indicate(pc, color=AKSEN2), run_time=0.5)
            tunggu_kata_bergeser(b, frame, "sudut")
            b.main(Indicate(busur_p, color=SOROT), run_time=0.8)
            tunggu_kata_bergeser(b, frame, "dipakai")
            b.main(kamera.putar_pelan(frame, 6), run_time=1.2)
        qc.periksa_adegan(self, {"PC": pc, "PG": pg, "identitas": jati})

        sinema.laporkan_pemicu(self)
