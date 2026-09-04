"""Ruang Tiga Dimensi, materi 03: "Jarak selalu yang terpendek" (ManimGL).

Naskah   : manim/narasi/ruang-3d-03.json
Render   : manimgl manim/scenes/ruang_3d_03.py JarakSelaluTerpendek -w -l
Gabung   : python manim/gabung_audio.py ruang-3d-03 JarakSelaluTerpendek --uji

DI SINILAH GAGASAN PAYUNG SELURUH TOPIK LAHIR
"Setiap soal jarak adalah soal mencari kaki tegak lurus." Video ini tidak
MEMBERI TAHU kalimat itu, ia membuat siswa melihatnya: titik Q digeser, angkanya
turun lalu naik lagi, dan tepat di dasar lembah tanda siku-siku menyala sendiri.

ASAL ANGKA DITUNJUKKAN DULU, BARU RUMUSNYA (cara 3b1b, permintaan ARYA)
Sebelum panel "BQ = 3 akar 2" muncul di kanan atas, panjang AC diberi label di
ruasnya sendiri dan titik Q terlihat berhenti tepat di tengahnya. Jadi angka
3 akar 2 itu setengah dari 6 akar 2 yang sudah terbaca di layar, bukan angka
yang jatuh dari langit.

SUMBU Z hanya muncul di babak pembuka sebagai perkenalan arah tinggi, lalu
dihilangkan dan tidak kembali: seluruh materi ini terjadi di lantai kubus.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ruang_3d_umum import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

TOPIK = "ruang-3d-03"
DURASI = durasi(TOPIK)

KAKI = kaki_pada_garis(T["B"], T["A"], T["C"])   # tepat di tengah alas
T_KAKI = 0.5


def di_ac(t):
    return T["A"] + (T["C"] - T["A"]) * t


class JarakSelaluTerpendek(AdeganMatra):
    def construct(self):
        frame = self.frame

        kubus = kubus_pejal()
        rangka = rangka_kubus()
        ac = Line(T["A"], T["C"]).set_stroke(AKSEN2, 6)

        papan_koor = papan_koordinat(frame)
        papan = sinema.PapanRumus(self)

        # Titik Q dikendalikan satu angka saja. Semua yang bergantung padanya
        # digambar ulang tiap frame, jadi ruas, penanda, dan angka di panel tidak
        # mungkin berbeda pendapat (prinsip 5 ILMU-3B1B).
        t = ValueTracker(0.14)

        def panjang():
            return float(np.linalg.norm(T["B"] - di_ac(t.get_value())))

        bq = always_redraw(lambda: Line(T["B"], di_ac(t.get_value())).set_stroke(AKSEN, 5))
        titik_q = always_redraw(
            lambda: lingkaran_hadap(
                frame, di_ac(t.get_value()),
                SOROT if abs(t.get_value() - T_KAKI) < 0.012 else AKSEN,
                0.20 + 0.04 * np.sin(3.0 * self.time))
        )

        angka = sinema.AngkaKoma(0, num_decimal_places=3, font_size=32).set_color(AKSEN)
        angka.add_updater(lambda m: m.set_value(panjang()))
        panel_hidup = sinema.nilai_hidup(teks("BQ", 28, AKSEN), angka, di=[4.6, 3.15, 0])

        lab = huruf_sudut(frame, {"A": TINTA, "B": AKSEN, "C": AKSEN2})

        # --- Babak 1: pengumuman materi, sumbu z ikut memperkenalkan arah tinggi.
        kamera.pasang_awal(frame, theta=-38, phi=72, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        # Cahaya dipindah ke sisi kamera dan kubus diberi bayangan lantai. Tanpa
        # keduanya kubusnya terbaca sebagai balok gelap datar yang melayang.
        pasang_cahaya(self)
        bayangan = bayangan_kubus()
        self.add(lantai(), bayangan, *papan_koor["datar"], *papan_koor["tinggi"], kubus)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 03: Jarak selalu yang terpendek",
                                 lama=3.4, y=3.0)
            b.catat(3.4)
            # Pembuka MAKSIMAL 5 detik (STANDAR butir 2, dipertegas 4 Sep):
            # kubus pejal langsung melebur jadi rangka, bukan diam berputar
            # belasan detik. Sebelum ini babak pembuka dan babak berikutnya
            # sama-sama menampilkan kubus abu-abu pejal, dan itu 20 persen
            # video habis tanpa satu pun hal baru masuk layar.
            b.main(kubus.animate.set_opacity(0.14), ShowCreation(rangka),
                   FadeOut(bayangan), run_time=1.6)
            isi_sisa(b, kamera.sudut(frame, -26, 66, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"kubus": kubus})

        # --- Babak 2: masalahnya dulu. Sumbu z pamit di sini, sebab seluruh sisa
        #     video terjadi di lantai kubus.
        coba_coba = VGroup(*[
            Line(T["B"], di_ac(x)).set_stroke(REDUP, 2.4)
            for x in (0.16, 0.30, 0.44, 0.62, 0.80)
        ])
        jati = sinema.identitas(self, "panjang = lebar = tinggi = 6 satuan")
        with sinema.babak(self, "masalah", DURASI) as b:
            sumbu_z_pamit(b, papan_koor, 0.8)
            b.main(ShowCreation(ac), *[FadeIn(x) for x in lab.values()], run_time=1.4)
            b.main(ShowCreation(coba_coba, lag_ratio=0.25), run_time=2.0)
            isi_sisa(b, kamera.sudut(frame, -14, 62, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"AC": ac, "huruf A": lab["A"], "huruf C": lab["C"],
                                 "identitas": jati})

        # --- Babak 3: satu ruas saja yang tinggal, lalu digeser. Angkanya hidup.
        with sinema.babak(self, "geser", DURASI) as b:
            b.main(FadeOut(coba_coba), FadeIn(bq), FadeIn(titik_q), run_time=1.0)
            self.hud_tambah(panel_hidup)
            panel_hidup.set_opacity(0)
            b.main(panel_hidup.animate.set_opacity(1), run_time=0.6)
            b.main(t.animate.set_value(0.86), run_time=max(3.0, b.sisa - 1.0),
                   rate_func=there_and_back_with_pause)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"BQ": bq, "panel hidup": panel_hidup, "identitas": jati},
                          [("panel hidup", "identitas")])

        # --- Babak 4: berhenti tepat di dasar lembah. ASAL ANGKANYA DITUNJUKKAN
        #     DULU: panjang AC diberi label di ruasnya, dan Q terlihat berhenti
        #     tepat di tengah. Baru sesudah itu panel jawabannya muncul.
        tanda_siku = siku(T["B"], KAKI, T["C"], warna=SOROT, ukuran=0.5, tebal=2.6)
        n_ac = label_hadap(frame, "6\\sqrt{2}", sepanjang3(T["A"], T["C"], 0.26)
                           + np.array([-0.55, 0.30, 0.35]), AKSEN2, 28, rumus_latex=True)
        n_bq = label_hadap(frame, "3\\sqrt{2}", sepanjang3(T["B"], KAKI, 0.5)
                           + np.array([0.35, -0.35, 0.40]), SOROT, 30, rumus_latex=True)
        with sinema.babak(self, "temu", DURASI) as b:
            b.main(t.animate.set_value(T_KAKI), run_time=1.6)
            b.main(ShowCreation(tanda_siku), run_time=0.8)
            b.main(FadeIn(n_ac), run_time=0.7)
            b.main(FadeIn(n_bq), run_time=0.7)
            self.hud.remove(panel_hidup)
            b.main(FadeOut(panel_hidup), run_time=0.4)
            sinema.lahir_rumus(self, r"BQ = 3\sqrt{2} \approx 4{,}243", dekat=bq,
                               papan=papan, b=b, warna=SOROT)
            isi_sisa(b, kamera.putar_pelan(frame, 16), sisakan=0.6)
        qc.periksa_adegan(self, {"siku": tanda_siku, "jawab": papan.semua(), "nilai AC": n_ac,
                                 "nilai BQ": n_bq, "identitas": jati},
                          [("jawab", "identitas"), ("nilai AC", "nilai BQ")])

        # --- Babak 5: kenapa yang siku-siku pasti yang terpendek.
        r_letak = di_ac(0.80)
        br = Line(T["B"], r_letak).set_stroke(REDUP, 4)
        qr = Line(KAKI, r_letak).set_stroke(REDUP, 4)
        lab_r = label_hadap(frame, "R", r_letak + np.array([0.35, 0.35, 0.40]), REDUP)
        with sinema.babak(self, "kenapa", DURASI) as b:
            b.main(ShowCreation(br), ShowCreation(qr), FadeIn(lab_r), run_time=1.6)
            papan.baris(r"BR^2 = BQ^2 + QR^2")
            b.catat(0.8)
            isi_sisa(b, kamera.sudut(frame, -46, 70, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"BR": br, "panel": papan.semua(), "identitas": jati},
                          [("panel", "identitas")])

        # --- Babak 6: kalimat payung topik, ditempelkan pada kaki tegak lurusnya
        #     sendiri, bukan ditulis di kaki layar tempat subtitle berada.
        # Dua kata, batas standar v2 butir 4. "Kaki tegak lurus" tiga kata dan
        # ditolak mesin; intinya tetap terbawa, kalimat penuhnya milik narasi.
        payung = label_hadap(frame, "tegak lurus",
                             KAKI + np.array([-2.3, 0.0, 0.55]), SOROT, 30)
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(br), FadeOut(qr), FadeOut(lab_r), run_time=0.8)
            b.main(FadeIn(payung), run_time=0.9)
            isi_sisa(b, kamera.putar_pelan(frame, 24), sisakan=1.4)
            b.jeda(1.2)
        qc.periksa_adegan(self, {"BQ": bq, "siku": tanda_siku, "panel": papan.semua(),
                                 "payung": payung, "identitas": jati},
                          [("payung", "identitas"), ("payung", "panel")])
