"""Ruang Tiga Dimensi, materi 09: "Sudut dengan bidang dan sudut antarbidang" (ManimGL).

Naskah   : manim/narasi/ruang-3d-09.json
Render   : manimgl manim/scenes/ruang_3d_09.py SudutDenganBidang -w -l
Gabung   : python manim/gabung_audio.py ruang-3d-09 SudutDenganBidang --uji

DUA IDE BESAR, MASING-MASING DAPAT BABAKNYA SENDIRI
Sudut GARIS dengan bidang, dan sudut BIDANG dengan bidang. Keduanya tidak
dicampur dalam satu babak, sebab satu sesi satu ide. Bagian pertama memakai
bayangan; bagian kedua memakai garis potong.

KEDELAPAN HURUF ADA DI KEDUA BAGIAN, yang berpindah cuma sorotnya: A, C, G di
bagian pertama, lalu B, D, G di bagian kedua. Warna label tidak bisa diubah di
tengah jalan sebab updater menggambarnya ulang dari bentuk aslinya tiap frame,
jadi dua set disiapkan dan ditukar.

ASAL ANGKA DITUNJUKKAN DULU, BARU RUMUSNYA (cara 3b1b, permintaan ARYA)
Sebelum panel "tan theta = 6 per 6 akar 2" muncul, angka 6 diberi label pada
rusuk tegak CG dan 6 akar 2 pada bayangan AC. Sebelum panel kedua muncul,
3 akar 2 diberi label pada PC. Tiap angka di kanan atas sudah pernah dilihat
menempel pada bendanya.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ruang_3d_umum import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

TOPIK = "ruang-3d-09"
DURASI = durasi(TOPIK)

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
        bidang_bdg = Polygon(T["B"], T["D"], T["G"]).set_fill(AKSEN, 0.24).set_stroke(AKSEN, 3)
        siku_p1 = siku(T["B"], P, T["C"], ukuran=0.45)
        siku_p2 = siku(T["D"], P, T["G"], ukuran=0.45)
        busur_p = busur(T["C"], P, T["G"], warna=SOROT, jari=1.2, tebal=4)

        papan = papan_koordinat(frame)
        lab = huruf_sudut(frame, {"A": TINTA, "C": AKSEN2, "G": AKSEN})
        lab2 = huruf_sudut(frame, {"B": SOROT, "D": SOROT, "G": AKSEN, "C": AKSEN2})
        jati = identitas_kubus()

        # --- Babak 1: pengumuman materi.
        kamera.pasang_awal(frame, theta=-42, phi=72, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        self.add(lantai(), *papan["datar"], *papan["tinggi"], kubus)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 09: Sudut dengan bidang", lama=3.4, y=3.0)
            b.catat(3.4)
            self.hud_tambah(jati)
            jati.set_opacity(0)
            b.main(jati.animate.set_opacity(1), run_time=0.7)
            b.main(kubus.animate.set_opacity(0.14), ShowCreation(rangka), run_time=1.8)
            isi_sisa(b, kamera.sudut(frame, -30, 68, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"kubus": kubus, "identitas": jati})

        # --- Babak 2: garis miringnya dulu, tanpa bayangannya. Sumbu z pamit
        #     sebentar, ia kembali saat rusuk tegak CG masuk hitungan.
        with sinema.babak(self, "bayangan", DURASI) as b:
            sumbu_z_pamit(b, papan, 1.0)
            b.main(*[FadeIn(x) for x in lab.values()], run_time=0.8)
            b.main(ShowCreation(ag), run_time=1.4)
            isi_sisa(b, kamera.sudut(frame, -20, 74, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"AG": ag, "huruf G": lab["G"], "identitas": jati})

        # --- Babak 3: bayangannya DICARI, bukan diberikan. Tiang CG yang tegak
        #     lurus lantai itulah yang menjatuhkan G ke C, jadi sumbu z kembali.
        #     Kedua panjang diberi label di ruasnya masing-masing.
        n_cg = label_hadap(frame, "6", sepanjang3(T["C"], T["G"], 0.5)
                           + np.array([0.65, 0.30, 0.0]), REDUP, 28)
        n_ac = label_hadap(frame, "6\\sqrt{2}", sepanjang3(T["A"], T["C"], 0.34)
                           + np.array([0.35, -0.55, 0.32]), AKSEN2, 28, rumus_latex=True)
        with sinema.babak(self, "proyeksi", DURASI) as b:
            sumbu_z_muncul(b, papan, 0.8)
            b.main(ShowCreation(cg), run_time=0.9)
            b.main(ShowCreation(ac), run_time=1.1)
            b.main(ShowCreation(siku_c), run_time=0.6)
            b.main(FadeIn(n_cg), FadeIn(n_ac), run_time=0.9)
            isi_sisa(b, kamera.sudut(frame, -52, 70, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"AC": ac, "AG": ag, "nilai CG": n_cg, "nilai AC": n_ac,
                                 "identitas": jati},
                          [("nilai CG", "nilai AC")])

        # --- Babak 4: baru sekarang angkanya naik ke panel.
        p1 = rumus(r"\tan\theta = \frac{6}{6\sqrt{2}}", 32, SOROT).to_corner(UR, buff=0.5)
        p2 = rumus(r"\theta \approx 35{,}26^\circ", 32, SOROT)
        p2.next_to(p1, DOWN, buff=0.3).align_to(p1, RIGHT)
        with sinema.babak(self, "sudut1", DURASI) as b:
            b.main(ShowCreation(busur_a), run_time=0.9)
            self.hud_tambah(p1)
            p1.set_opacity(0)
            b.main(p1.animate.set_opacity(1), run_time=0.7)
            self.hud_tambah(p2)
            p2.set_opacity(0)
            b.main(p2.animate.set_opacity(1), run_time=0.7)
            isi_sisa(b, kamera.putar_pelan(frame, 20))
        qc.periksa_adegan(self, {"panel 1": p1, "panel 2": p2, "busur": busur_a,
                                 "identitas": jati},
                          [("panel 1", "panel 2"), ("panel 2", "identitas")])

        # --- Babak 5: layar dibersihkan dari ide pertama, lalu ide kedua masuk.
        #     Set huruf DITUKAR, bukan dihapus: kedelapan huruf tetap terbaca,
        #     yang berpindah cuma sorotnya.
        lab_p = label_hadap(frame, "P", P + np.array([-0.85, -0.55, 0.15]), SOROT)
        tanda_p = penanda(self, frame, P)
        with sinema.babak(self, "potong", DURASI) as b:
            b.main(FadeOut(ag), FadeOut(ac), FadeOut(cg), FadeOut(siku_c),
                   FadeOut(busur_a), FadeOut(n_cg), FadeOut(n_ac),
                   *[FadeOut(x) for x in lab.values()], run_time=1.0)
            for x in lab2.values():
                x.set_opacity(0)
            self.add(*lab2.values())
            b.main(*[x.animate.set_opacity(1) for x in lab2.values()], run_time=0.6)
            self.hud.remove(p1, p2)
            b.main(FadeOut(p1), FadeOut(p2), run_time=0.5)
            b.main(FadeIn(bidang_bdg), run_time=1.3)
            b.main(ShowCreation(bd), run_time=0.9)
            isi_sisa(b, kamera.sudut(frame, -14, 66, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"bidang": bidang_bdg, "BD": bd, "huruf A": lab2["A"],
                                 "identitas": jati})

        # --- Babak 6: dua garis bantu, keduanya tegak lurus BD, DARI SATU TITIK.
        #     Panjang PC diberi label sebelum rumusnya muncul.
        n_pc = label_hadap(frame, "3\\sqrt{2}", sepanjang3(P, T["C"], 0.5)
                           + np.array([0.20, -0.65, 0.30]), AKSEN2, 28, rumus_latex=True)
        p3 = rumus(r"\tan\varphi = \frac{6}{3\sqrt{2}}", 32, SOROT).to_corner(UR, buff=0.5)
        p4 = rumus(r"\varphi \approx 54{,}74^\circ", 32, SOROT)
        p4.next_to(p3, DOWN, buff=0.3).align_to(p3, RIGHT)
        with sinema.babak(self, "sudut2", DURASI) as b:
            b.main(FadeIn(tanda_p), FadeIn(lab_p), run_time=0.8)
            b.main(ShowCreation(pc), ShowCreation(pg), run_time=1.3)
            b.main(ShowCreation(siku_p1), ShowCreation(siku_p2), run_time=0.8)
            b.main(FadeIn(n_pc), run_time=0.7)
            b.main(ShowCreation(busur_p), run_time=0.7)
            self.hud_tambah(p3)
            p3.set_opacity(0)
            b.main(p3.animate.set_opacity(1), run_time=0.6)
            self.hud_tambah(p4)
            p4.set_opacity(0)
            b.main(p4.animate.set_opacity(1), run_time=0.6)
            isi_sisa(b, kamera.sudut(frame, -40, 62, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"PC": pc, "PG": pg, "panel 3": p3, "panel 4": p4,
                                 "huruf P": lab_p, "nilai PC": n_pc, "identitas": jati},
                          [("panel 3", "panel 4"), ("panel 4", "identitas"),
                           ("huruf P", "nilai PC")])

        # --- Babak 7: dua syarat yang harus dipenuhi bersamaan, ditempelkan
        #     pada titik tumpunya sendiri.
        syarat = label_hadap(frame, "satu titik tumpu", P + np.array([0.0, -2.6, 1.0]),
                             SOROT, 30)
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeIn(syarat), run_time=0.9)
            isi_sisa(b, kamera.putar_pelan(frame, 26), sisakan=1.6)
            b.jeda(1.2)
        qc.periksa_adegan(self, {"PC": pc, "PG": pg, "panel 4": p4, "syarat": syarat,
                                 "identitas": jati},
                          [("panel 4", "identitas"), ("syarat", "identitas")])
