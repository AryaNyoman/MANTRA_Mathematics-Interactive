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

        papan_koor = papan_koordinat(frame)
        papan = sinema.PapanRumus(self)
        lab = huruf_sudut(frame, {"A": SOROT, "B": AKSEN, "D": AKSEN, "E": AKSEN})
        lab_k = label_hadap(frame, "K", K + np.array([0.60, -0.20, 0.50]), SOROT)

        # --- Babak 1: pengumuman materi.
        kamera.pasang_awal(frame, theta=-44, phi=72, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        self.add(lantai(), *papan_koor["datar"], *papan_koor["tinggi"], kubus)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 06: Jarak titik ke bidang", lama=3.4, y=3.0)
            b.catat(3.4)
            # Babak pertama HANYA judul materi (standar v2, Waktu dan sinkron).
            # Kubus dibuat tembus pandang di babak berikutnya.
            isi_sisa(b, kamera.sudut(frame, -30, 68, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"kubus": kubus})

        # --- Babak 2: bidangnya muncul sebagai BIDANG, lalu diputari.
        jati = sinema.identitas(self, "p = l = t = 6 satuan")
        with sinema.babak(self, "bidang", DURASI) as b:
            b.main(kubus.animate.set_opacity(0.14), ShowCreation(rangka), run_time=1.6)
            sumbu_z_pamit(b, papan_koor, 1.0)
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
        with sinema.babak(self, "sepertiga", DURASI) as b:
            sumbu_z_muncul(b, papan_koor, 0.8)
            b.main(ShowCreation(ag), run_time=1.3)
            b.main(FadeIn(n_ag), run_time=0.7)
            sinema.lahir_rumus(self, r"AK = \tfrac{1}{3} AG = 2\sqrt{3}", dekat=ak,
                               papan=papan, b=b, warna=SOROT)
            isi_sisa(b, kamera.putar_pelan(frame, 22))
        qc.periksa_adegan(self, {"AG": ag, "AK": ak, "panel": papan.semua(), "nilai AG": n_ag,
                                 "identitas": jati},
                          [("panel", "identitas")])

        # --- Babak 5: cara yang SELALU jalan. Limas yang sama disorot dua kali,
        #     sekali beralas segitiga lantai, sekali beralas bidang miringnya.
        #     Tinggi limasnya, rusuk AE, diberi label sebelum volumenya dihitung.
        alas_datar = Polygon(T["A"], T["B"], T["D"]).set_fill(AKSEN2, 0.30).set_stroke(AKSEN2, 3)
        n_ae = label_hadap(frame, "6", sepanjang3(T["A"], T["E"], 0.55)
                           + np.array([-0.70, -0.35, 0.0]), AKSEN2, 28)
        with sinema.babak(self, "volume", DURASI) as b:
            b.main(FadeIn(alas_datar), ShowCreation(ae), run_time=1.2)
            b.main(FadeIn(n_ae), run_time=0.7)
            papan.baris(r"V = \tfrac{1}{3}\cdot 18 \cdot 6 = 36", AKSEN2)
            b.catat(0.8)
            b.main(alas_datar.animate.set_fill(AKSEN2, 0.10),
                   bidang.animate.set_fill(AKSEN, 0.42), run_time=1.0)
            papan.baris(r"36 = \tfrac{1}{3}\cdot 18\sqrt{3}\cdot AK", AKSEN)
            b.catat(0.8)
            isi_sisa(b, kamera.sudut(frame, -18, 70, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"panel": papan.semua(),
                                 "nilai AE": n_ae, "identitas": jati},
                          [("panel", "identitas")])

        # --- Babak 6: rumus volume yang dibalik, bukan hafalan baru. Katanya
        #     ditempelkan pada ruas jaraknya sendiri.
        simpul = label_hadap(frame, "volume dibalik", K + np.array([-2.4, 0.0, -0.9]),
                             SOROT, 30)
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(alas_datar), FadeOut(ae), FadeOut(n_ae), run_time=0.7)
            b.main(FadeIn(simpul), run_time=0.9)
            isi_sisa(b, kamera.putar_pelan(frame, 26), sisakan=1.6)
            b.jeda(1.2)
        qc.periksa_adegan(self, {"AK": ak, "bidang": bidang, "panel": papan.semua(),
                                 "simpul": simpul, "identitas": jati},
                          [("panel", "identitas"), ("simpul", "identitas")])
