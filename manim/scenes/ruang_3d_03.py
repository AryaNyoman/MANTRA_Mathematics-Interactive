"""Ruang Tiga Dimensi, materi 03: "Jarak selalu yang terpendek" (ManimGL).

Naskah   : manim/narasi/ruang-3d-03.json
Render   : manimgl manim/scenes/ruang_3d_03.py JarakSelaluTerpendek -w -l
Periksa  : python manim/cek_video.py media/gl/JarakSelaluTerpendek.mp4
Gabung   : python manim/gabung_audio.py ruang-3d-03 JarakSelaluTerpendek --uji

DI SINILAH GAGASAN PAYUNG SELURUH TOPIK LAHIR
"Setiap soal jarak adalah soal mencari kaki tegak lurus." Buku biasanya
memberikan empat rumus jarak yang terpisah, dan itulah sebabnya siswa menghafal
empat hal padahal cuma ada satu. Video ini tidak MEMBERI TAHU kalimat itu, ia
membuat siswa melihatnya: titik Q digeser, angkanya turun lalu naik lagi, dan
tepat di dasar lembah tanda siku-siku menyala sendiri.

SATU WARNA SATU MAKNA:
  AKSEN2 biru = garis AC, yaitu sasaran yang jaraknya diukur
  AKSEN merah = ruas BQ yang panjangnya berubah-ubah
  SOROT ungu  = jawaban, yaitu kaki tegak lurus dan panjang terpendeknya
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ruang_3d_umum import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

TOPIK = "ruang-3d-03"
DURASI = durasi(TOPIK)

KAKI = kaki_pada_garis(T["B"], T["A"], T["C"])   # tepat di tengah alas
T_KAKI = 0.5                                      # letak kaki di sepanjang AC


def di_ac(t):
    return T["A"] + (T["C"] - T["A"]) * t


class JarakSelaluTerpendek(AdeganMatra):
    def construct(self):
        frame = self.frame

        kubus = kubus_pejal()
        rangka = rangka_kubus()
        ac = Line(T["A"], T["C"]).set_stroke(AKSEN2, 6)

        # Titik Q dikendalikan satu angka saja. Semua yang bergantung padanya
        # digambar ulang tiap frame, jadi ruas, tanda siku-siku, dan angka di
        # panel tidak mungkin berbeda pendapat (prinsip 5 ILMU-3B1B).
        t = ValueTracker(0.14)

        def panjang():
            return float(np.linalg.norm(T["B"] - di_ac(t.get_value())))

        bq = always_redraw(lambda: Line(T["B"], di_ac(t.get_value())).set_stroke(AKSEN, 5))
        # Titik Q berubah warna sendiri begitu ia TEPAT di kaki tegak lurus.
        # Siswa jadi punya dua petunjuk yang saling menguatkan: angkanya paling
        # kecil, dan warnanya berganti jadi warna jawaban.
        titik_q = always_redraw(
            lambda: lingkaran_hadap(
                frame, di_ac(t.get_value()),
                SOROT if abs(t.get_value() - T_KAKI) < 0.012 else AKSEN,
                0.20 + 0.04 * np.sin(3.0 * self.time))
        )

        angka = sinema.AngkaKoma(0, num_decimal_places=3, font_size=34).set_color(AKSEN)
        angka.add_updater(lambda m: m.set_value(panjang()))
        label_bq = teks("panjang BQ", 28, AKSEN)
        panel = sinema.nilai_hidup(label_bq, angka, di=[4.4, 3.1, 0])

        lab = huruf_sudut(frame, {"A": TINTA, "B": AKSEN, "C": TINTA})

        # --- Babak 1: pengumuman materi, kubus pejal dulu.
        kamera.pasang_awal(frame, theta=-38, phi=72, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        # Papan koordinat berangka: tanpa ini kalimat "enam satuan" di narasi
        # tidak punya sandaran apa pun di layar (revisi ARYA 2 Sep malam).
        # Tanpa sumbu z: materi ini tidak membicarakan tinggi sama sekali,
        # dan tiga deret angka sekaligus membuat tepi kiri layar penuh.
        sumbu, angka_sumbu = papan_koordinat(frame, sumbu_z=False)
        self.add(lantai(), sumbu, *angka_sumbu, kubus)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 03: Jarak selalu yang terpendek",
                                 lama=3.4, y=3.0)
            b.catat(3.4)
            b.main(kubus.animate.set_opacity(0.14), ShowCreation(rangka), run_time=2.0)
            isi_sisa(b, kamera.sudut(frame, -26, 66, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"kubus": kubus})

        # --- Babak 2: masalahnya dulu. Banyak ruas yang sama sahnya.
        coba_coba = VGroup(*[
            Line(T["B"], di_ac(x)).set_stroke(REDUP, 2.4)
            for x in (0.16, 0.30, 0.44, 0.62, 0.80)
        ])
        with sinema.babak(self, "masalah", DURASI) as b:
            b.main(ShowCreation(ac), *[FadeIn(x) for x in lab.values()], run_time=1.4)
            b.main(ShowCreation(coba_coba, lag_ratio=0.25), run_time=2.0)
            sinema.keterangan(self, "semuanya sah, tetapi panjangnya *berbeda-beda*")
            b.catat(0.6)
            isi_sisa(b, kamera.sudut(frame, -14, 62, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"AC": ac, "huruf A": lab["A"], "huruf C": lab["C"],
                                 "keterangan": self._matra_keterangan},
                          [("huruf A", "keterangan")])

        # --- Babak 3: satu ruas saja yang tinggal, lalu digeser. Angkanya hidup.
        with sinema.babak(self, "geser", DURASI) as b:
            b.main(FadeOut(coba_coba), FadeIn(bq), FadeIn(titik_q), run_time=1.0)
            self.hud_tambah(panel)
            panel.set_opacity(0)
            b.main(panel.animate.set_opacity(1), run_time=0.6)
            sinema.keterangan(self, "geser Q, dan awasi angkanya")
            b.catat(0.6)
            b.main(t.animate.set_value(0.86), run_time=max(3.0, b.sisa - 1.0),
                   rate_func=there_and_back_with_pause)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"BQ": bq, "panel": panel,
                                 "keterangan": self._matra_keterangan},
                          [("panel", "keterangan")])

        # --- Babak 4: berhenti tepat di dasar lembah. Tanda siku-siku menyala.
        #     Kesikuan ini bukan hiasan: BQ memang tegak lurus AC di sana, sebab
        #     Q adalah kaki tegak lurusnya (dihitung `kaki_pada_garis`).
        tanda_siku = siku(T["B"], KAKI, T["C"], warna=SOROT, ukuran=0.5, tebal=2.6)
        jawab = rumus(r"BQ = 3\sqrt{2} \approx 4{,}243", 34, SOROT).to_corner(UR, buff=0.5)
        with sinema.babak(self, "temu", DURASI) as b:
            b.main(t.animate.set_value(T_KAKI), run_time=1.6)
            b.main(ShowCreation(tanda_siku), run_time=0.9)
            self.hud.remove(panel)
            b.main(FadeOut(panel), run_time=0.4)
            self.hud_tambah(jawab)
            jawab.set_opacity(0)
            b.main(jawab.animate.set_opacity(1), run_time=0.7)
            sinema.keterangan(self, "hanya di sini muncul tanda *siku-siku*", warna=SOROT)
            b.catat(0.6)
            isi_sisa(b, kamera.putar_pelan(frame, 16), sisakan=0.6)
        qc.periksa_adegan(self, {"siku": tanda_siku, "jawab": jawab,
                                 "keterangan": self._matra_keterangan},
                          [("jawab", "keterangan")])

        # --- Babak 5: kenapa yang siku-siku pasti yang terpendek.
        r_letak = di_ac(0.80)
        br = Line(T["B"], r_letak).set_stroke(REDUP, 4)
        qr = Line(KAKI, r_letak).set_stroke(REDUP, 4)
        lab_r = label_hadap(frame, "R", r_letak + np.array([0.3, 0.3, 0.35]), REDUP)
        pyth = rumus(r"BR^2 = BQ^2 + QR^2", 32, TINTA)
        pyth.next_to(jawab, DOWN, buff=0.35).align_to(jawab, RIGHT)
        with sinema.babak(self, "kenapa", DURASI) as b:
            b.main(ShowCreation(br), ShowCreation(qr), FadeIn(lab_r), run_time=1.6)
            self.hud_tambah(pyth)
            pyth.set_opacity(0)
            b.main(pyth.animate.set_opacity(1), run_time=0.7)
            sinema.keterangan(self, "sisi miring *selalu* lebih panjang daripada sisi tegaknya")
            b.catat(0.6)
            isi_sisa(b, kamera.sudut(frame, -46, 70, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"BR": br, "pythagoras": pyth, "jawab": jawab,
                                 "keterangan": self._matra_keterangan},
                          [("pythagoras", "jawab"), ("BR", "keterangan")])

        # --- Babak 6: kalimat payung topik, diucapkan kata per kata.
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(br), FadeOut(qr), FadeOut(lab_r), run_time=0.8)
            sinema.keterangan(self,
                              "setiap soal jarak adalah soal mencari *kaki tegak lurus*",
                              warna=SOROT)
            b.catat(0.6)
            isi_sisa(b, kamera.putar_pelan(frame, 24), sisakan=1.6)
            b.jeda(1.2)
        qc.periksa_adegan(self, {"BQ": bq, "siku": tanda_siku, "jawab": jawab,
                                 "huruf A": lab["A"], "keterangan": self._matra_keterangan},
                          [("jawab", "keterangan"), ("huruf A", "keterangan")])
