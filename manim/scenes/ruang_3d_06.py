"""Ruang Tiga Dimensi, materi 06: "Jarak titik ke bidang" (ManimGL).

Naskah   : manim/narasi/ruang-3d-06.json
Render   : manimgl manim/scenes/ruang_3d_06.py JarakTitikKeBidang -w -l
Gabung   : python manim/gabung_audio.py ruang-3d-06 JarakTitikKeBidang --uji

KENAPA VIDEO INI PERLU 3D
Bidang BDE memotong pojok kubus seperti pisau memotong ujung tahu. Di kertas
potongan itu digambar sebagai segitiga pipih dan siswa tidak pernah melihat
bahwa ia MIRING terhadap ketiga sisi kubus sekaligus. Di sini kamera memutari
potongan itu, dan ruas AK benar-benar terlihat menembus permukaannya.

ASAL ANGKA DITUNJUKKAN DULU, BARU RUMUSNYA (cara 3b1b, permintaan ARYA)
Sebelum panel "AK sama dengan sepertiga AG" muncul, panjang 6 akar 3 diberi
label pada diagonal ruang AG di gambarnya. Sebelum panel volume muncul, tinggi
6 diberi label pada rusuk AE yang menjadi tinggi limasnya.

SUMBU Z muncul di pembuka, hilang saat bidangnya diperkenalkan, lalu KEMBALI
saat diagonal ruang dan tinggi limas masuk hitungan.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ruang_3d_umum import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

TOPIK = "ruang-3d-06"
DURASI = durasi(TOPIK)

# Kaki tegak lurus dari A ke bidang BDE jatuh di TITIK BERAT segitiga itu, dan
# titik berat itu duduk di sepertiga diagonal ruang AG. Dihitung di sini, bukan
# diketik dari hasil, supaya tidak mungkin meleset dari gambarnya.
K = (T["B"] + T["D"] + T["E"]) / 3.0


class JarakTitikKeBidang(AdeganMatra):
    def construct(self):
        frame = self.frame

        kubus = kubus_pejal()
        rangka = rangka_kubus()

        bidang = Polygon(T["B"], T["D"], T["E"]).set_fill(AKSEN, 0.30).set_stroke(AKSEN, 4)
        ag = Line(T["A"], T["G"]).set_stroke(AKSEN2, 3).set_stroke(opacity=0.7)
        ak = Line(T["A"], K).set_stroke(SOROT, 6)
        ae = Line(T["A"], T["E"]).set_stroke(AKSEN2, 5)

        papan = papan_koordinat(frame)
        lab = huruf_sudut(frame, {"A": SOROT, "B": AKSEN, "D": AKSEN, "E": AKSEN})
        lab_k = label_hadap(frame, "K", K + np.array([0.60, -0.20, 0.50]), SOROT)
        jati = identitas_kubus()

        # --- Babak 1: pengumuman materi.
        kamera.pasang_awal(frame, theta=-44, phi=72, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        self.add(lantai(), *papan["datar"], *papan["tinggi"], kubus)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 06: Jarak titik ke bidang", lama=3.4, y=3.0)
            b.catat(3.4)
            self.hud_tambah(jati)
            jati.set_opacity(0)
            b.main(jati.animate.set_opacity(1), run_time=0.7)
            b.main(kubus.animate.set_opacity(0.14), ShowCreation(rangka), run_time=1.8)
            isi_sisa(b, kamera.sudut(frame, -30, 68, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"kubus": kubus, "identitas": jati})

        # --- Babak 2: bidangnya muncul sebagai BIDANG, lalu diputari.
        with sinema.babak(self, "bidang", DURASI) as b:
            sumbu_z_pamit(b, papan, 1.0)
            b.main(*[FadeIn(x) for x in lab.values()], run_time=0.8)
            b.main(FadeIn(bidang), run_time=1.6)
            isi_sisa(b, kamera.sudut(frame, -78, 64, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"bidang": bidang, "huruf B": lab["B"], "huruf E": lab["E"],
                                 "identitas": jati})

        # --- Babak 3: ruas tegak lurus yang benar-benar menembus bidangnya.
        tanda_k = penanda(self, frame, K)
        with sinema.babak(self, "tegak", DURASI) as b:
            b.main(ShowCreation(ak), run_time=1.5)
            b.main(FadeIn(tanda_k), FadeIn(lab_k), run_time=0.9)
            isi_sisa(b, kamera.sudut(frame, -40, 74, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"AK": ak, "huruf K": lab_k, "identitas": jati},
                          [("huruf K", "identitas")])

        # --- Babak 4: sumbu z KEMBALI, sebab diagonal ruang mulai dipakai.
        #     Panjangnya diberi label di ruasnya SEBELUM naik ke panel.
        n_ag = label_hadap(frame, "6\\sqrt{3}", sepanjang3(T["A"], T["G"], 0.72)
                           + np.array([0.75, -0.35, 0.0]), AKSEN2, 28, rumus_latex=True)
        p1 = rumus(r"AK = \tfrac{1}{3} AG = 2\sqrt{3} \approx 3{,}464", 30, SOROT)
        p1.to_corner(UR, buff=0.5)
        with sinema.babak(self, "sepertiga", DURASI) as b:
            sumbu_z_muncul(b, papan, 0.8)
            b.main(ShowCreation(ag), run_time=1.3)
            b.main(FadeIn(n_ag), run_time=0.7)
            self.hud_tambah(p1)
            p1.set_opacity(0)
            b.main(p1.animate.set_opacity(1), run_time=0.8)
            isi_sisa(b, kamera.putar_pelan(frame, 22))
        qc.periksa_adegan(self, {"AG": ag, "AK": ak, "panel": p1, "nilai AG": n_ag,
                                 "identitas": jati},
                          [("panel", "identitas")])

        # --- Babak 5: cara yang SELALU jalan. Limas yang sama disorot dua kali,
        #     sekali beralas segitiga lantai, sekali beralas bidang miringnya.
        #     Tinggi limasnya, rusuk AE, diberi label sebelum volumenya dihitung.
        alas_datar = Polygon(T["A"], T["B"], T["D"]).set_fill(AKSEN2, 0.30).set_stroke(AKSEN2, 3)
        n_ae = label_hadap(frame, "6", sepanjang3(T["A"], T["E"], 0.55)
                           + np.array([-0.70, -0.35, 0.0]), AKSEN2, 28)
        p2 = rumus(r"V = \tfrac{1}{3}\cdot 18 \cdot 6 = 36", 30, AKSEN2)
        p2.next_to(p1, DOWN, buff=0.3).align_to(p1, RIGHT)
        p3 = rumus(r"36 = \tfrac{1}{3}\cdot 18\sqrt{3}\cdot AK", 30, AKSEN)
        p3.next_to(p2, DOWN, buff=0.3).align_to(p1, RIGHT)
        with sinema.babak(self, "volume", DURASI) as b:
            b.main(FadeIn(alas_datar), ShowCreation(ae), run_time=1.2)
            b.main(FadeIn(n_ae), run_time=0.7)
            self.hud_tambah(p2)
            p2.set_opacity(0)
            b.main(p2.animate.set_opacity(1), run_time=0.7)
            b.main(alas_datar.animate.set_fill(AKSEN2, 0.10),
                   bidang.animate.set_fill(AKSEN, 0.42), run_time=1.0)
            self.hud_tambah(p3)
            p3.set_opacity(0)
            b.main(p3.animate.set_opacity(1), run_time=0.7)
            isi_sisa(b, kamera.sudut(frame, -18, 70, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"panel 1": p1, "panel 2": p2, "panel 3": p3,
                                 "nilai AE": n_ae, "identitas": jati},
                          [("panel 2", "panel 3"), ("panel 3", "identitas")])

        # --- Babak 6: rumus volume yang dibalik, bukan hafalan baru. Katanya
        #     ditempelkan pada ruas jaraknya sendiri.
        simpul = label_hadap(frame, "volume dibalik", K + np.array([-2.4, 0.0, -0.9]),
                             SOROT, 30)
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(alas_datar), FadeOut(ae), FadeOut(n_ae), run_time=0.7)
            b.main(FadeIn(simpul), run_time=0.9)
            isi_sisa(b, kamera.putar_pelan(frame, 26), sisakan=1.6)
            b.jeda(1.2)
        qc.periksa_adegan(self, {"AK": ak, "bidang": bidang, "panel 1": p1,
                                 "simpul": simpul, "identitas": jati},
                          [("panel 1", "identitas"), ("simpul", "identitas")])
