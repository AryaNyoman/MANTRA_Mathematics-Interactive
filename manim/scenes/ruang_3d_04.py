"""Ruang Tiga Dimensi, materi 04: Jarak dalam Ruang Bagian 2, dua kali Pythagoras.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (85 detik,
6 babak) yang sudah disetujui ARYA. ISINYA SAMA: diagonal sisi AC lewat segitiga
ABC siku-siku di B, AC kuadrat = 72 dibiarkan kuadrat; diagonal ruang AG lewat
segitiga penolong ACG yang BERDIRI di dalam kubus, AG kuadrat = 72 + 36 = 108,
AG = 6 akar 3; angka 3 di dalam akar menghitung tiga arah.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 2 lalu pertanyaannya; segar-ingat
  Jarak dalam Ruang Bagian 1 (kaki tegak lurus, Pythagoras).
- Contoh angka akar 72 = 8,49; peringatan yang dijumlahkan kuadratnya (6 akar 2
  + 6 dicoret); bentuk umum diagonal balok akar(p^2 + l^2 + t^2) lahir di
  dekat diagonalnya; penutup menunjuk Bagian 3.
- Tiap kejadian dipicu pada KATA yang mengucapkannya (`sinema.JamKata`,
  `tunggu_kata_bergeser` menggeser kamera pelan sambil menunggu).
- Sorot ruas memakai Indicate berwarna (ruas tipis, tidak berisi), sorot panel
  memakai `papan.sorot()` supaya alasnya tidak ikut diwarnai.

Naskah   : manim/narasi/ruang-3d-04.json (12 segmen, 2:39)
Render   : manimgl manim/scenes/ruang_3d_04.py DuaKaliPythagoras -w --hd --config_file manim/hd60.yml
Gabung   : python manim/gabung_audio.py ruang-3d-04 DuaKaliPythagoras --keluar ruang-3d-04.mp4

SUMBU Z muncul di pembuka sebagai perkenalan, hilang saat semuanya masih datar
di lantai, lalu KEMBALI tepat ketika rusuk tegak CG masuk hitungan.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ruang_3d_umum import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

TOPIK = "ruang-3d-04"
DURASI = durasi(TOPIK)
KATA = sinema.JamKata(TOPIK)


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
        muka_alas = Polygon(T["A"], T["B"], T["C"]).set_fill(AKSEN2, 0.18).set_stroke(width=0)
        muka_tegak = Polygon(T["A"], T["C"], T["G"]).set_fill(AKSEN, 0.20).set_stroke(width=0)
        siku_b = siku(T["A"], T["B"], T["C"], ukuran=0.5)
        siku_c = siku(T["A"], T["C"], T["G"], ukuran=0.5)

        papan_koor = papan_koordinat(frame)
        papan = sinema.PapanRumus(self)
        lab = huruf_sudut(frame, {"A": TINTA, "B": TINTA, "C": AKSEN2, "G": AKSEN})

        kamera.pasang_awal(frame, theta=-58, phi=74, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        pasang_cahaya(self)
        bayangan = bayangan_kubus()
        self.add(lantai(), bayangan, *papan_koor["datar"], *papan_koor["tinggi"], kubus)

        # ---- buka: judul sub-bab, lalu pertanyaannya menempel di layar.
        tanya = rumus("?", 64, SOROT).move_to([0.0, 0.8, 0.0]).fix_in_frame()
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jarak")
            sinema.judul_pembuka(self, "Jarak dalam Ruang, Bagian 2", lama=3.0, y=3.0)
            b.catat(3.0)
            b.tunggu_kata("Berapa")
            # Kubus dibuat tembus pandang SEBELUM diagonalnya digambar: di kubus
            # pejal ruas dalamnya terbaca menempel di muka depan.
            b.main(kubus.animate.set_opacity(0.14), ShowCreation(rangka, lag_ratio=0.12),
                   FadeOut(bayangan), run_time=0.8)
            b.tunggu_kata("diagonal")
            b.main(ShowCreation(ag), run_time=0.9)
            b.tunggu_kata("kubus")
            b.main(FadeIn(tanya, shift=0.2 * UP), run_time=0.7)
        qc.periksa_adegan(self, {"kubus": kubus, "AG": ag, "tanya": tanya})

        # ---- ingat: kaki tegak lurus dari Bagian 1, digambar ulang sebentar.
        q = np.array([RUSUK / 2, RUSUK / 2, 0.0])
        bq = Line(T["B"], q).set_stroke(SOROT, 5)
        acl = Line(T["A"], T["C"]).set_stroke(TINTA, 5)
        siku_q = siku(T["B"], q, T["A"], ukuran=0.45)
        ingat_kel = VGroup(acl, bq, siku_q)
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("materi sebelumnya")
            b.main(FadeOut(tanya), FadeOut(ag), run_time=0.8)
            b.tunggu_kata("kaki tegak")
            b.main(ShowCreation(acl), ShowCreation(bq), run_time=0.9)
            b.main(ShowCreation(siku_q), run_time=0.4)
            b.tunggu_kata("Pythagoras")
            b.main(Indicate(bq, color=SOROT), run_time=0.9)
            b.tunggu_kata("Hari ini")
            b.main(FadeOut(ingat_kel), run_time=0.6)
            tunggu_kata_bergeser(b, frame, "dua kali")
            b.main(kamera.sudut(frame, -28, 68, pusat=PUSAT, tinggi=TINGGI_BINGKAI), run_time=1.4)
        qc.periksa_adegan(self, {"kubus": kubus})

        # ---- kubus: rusuk 6, kedelapan huruf.
        jati = sinema.identitas(self, "panjang = lebar = tinggi = 6 satuan")
        self.remove(jati)
        with sinema.babak(self, "kubus", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "rusuknya")
            self.add(jati)
            b.main(FadeIn(jati), run_time=0.6)
            tunggu_kata_bergeser(b, frame, "Titik A")
            b.main(FadeIn(lab["A"]), run_time=0.5)
            for nama, frasa in (("B", "B"), ("C", "C"), ("D", "D")):
                tunggu_kata_bergeser(b, frame, frasa)
                b.main(FadeIn(lab[nama]), run_time=0.4)
            for nama, frasa in (("E", "E"), ("F", "F"), ("G", "G"), ("H", "H")):
                tunggu_kata_bergeser(b, frame, frasa)
                b.main(FadeIn(lab[nama]), run_time=0.4)
        qc.periksa_adegan(self, {"kubus": kubus, "identitas": jati})

        # ---- sisi: diagonal sisi AC, segitiga ABC di lantai, sumbu z pamit.
        n_ab = label_hadap(frame, "6", sepanjang3(T["A"], T["B"], 0.5)
                           + np.array([0.0, -0.62, 0.30]), REDUP, 28)
        n_bc = label_hadap(frame, "6", sepanjang3(T["B"], T["C"], 0.5)
                           + np.array([0.62, 0.0, 0.30]), REDUP, 28)
        with sinema.babak(self, "sisi", DURASI, kata=KATA) as b:
            sumbu_z_pamit(b, papan_koor, 0.8)
            tunggu_kata_bergeser(b, frame, "A C menghubungkan")
            b.main(ShowCreation(ac), run_time=1.2)
            tunggu_kata_bergeser(b, frame, "diagonal sisi")
            b.main(kamera.sudut(frame, -12, 52, pusat=PUSAT, tinggi=TINGGI_BINGKAI),
                   run_time=1.6)
            tunggu_kata_bergeser(b, frame, "Segitiga")
            b.main(ShowCreation(ab), ShowCreation(bc), FadeIn(muka_alas),
                   ShowCreation(siku_b), run_time=1.4)
            tunggu_kata_bergeser(b, frame, "kedua sisi")
            b.main(FadeIn(n_ab), FadeIn(n_bc), run_time=0.8)
        qc.periksa_adegan(self, {"AC": ac, "nilai AB": n_ab, "nilai BC": n_bc,
                                 "identitas": jati},
                          [("nilai AB", "nilai BC")])

        # ---- hitung1: 72, dibiarkan kuadrat.
        with sinema.babak(self, "hitung1", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "kuadrat")
            sinema.lahir_rumus(self, r"AC^2 = 6^2 + 6^2 = 72", dekat=ac,
                               papan=papan, b=b, warna=AKSEN2, tahan=0.5, run_time=1.1)
            tunggu_kata_bergeser(b, frame, "Jangan")
            b.main(papan.sorot(), run_time=1.1)
        qc.periksa_adegan(self, {"panel": papan.semua(), "identitas": jati},
                          [("panel", "identitas")])

        # ---- cek1: contoh angkanya, 6 akar 2 = 8,49, ditempel pada AC.
        n_ac = label_hadap(frame, "6\\sqrt{2}", sepanjang3(T["A"], T["C"], 0.42)
                           + np.array([0.30, -0.78, 0.40]), AKSEN2, 28, rumus_latex=True)
        with sinema.babak(self, "cek1", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "akar tujuh")
            papan.baris(r"AC = \sqrt{72} = 6\sqrt{2} \approx 8{,}49", AKSEN2, b=b)
            tunggu_kata_bergeser(b, frame, "kira-kira")
            b.main(FadeIn(n_ac), run_time=0.7)
            tunggu_kata_bergeser(b, frame, "diagonal sisi")
            b.main(Indicate(ac, color=SOROT), run_time=1.0)
        qc.periksa_adegan(self, {"panel": papan.semua(), "nilai AC": n_ac, "identitas": jati},
                          [("panel", "identitas")])

        # ---- ruang: AG, segitiga penolong berdiri, sumbu z kembali.
        n_cg = label_hadap(frame, "6", sepanjang3(T["C"], T["G"], 0.5)
                           + np.array([0.62, 0.28, 0.0]), SOROT, 28)
        with sinema.babak(self, "ruang", DURASI, kata=KATA) as b:
            b.main(FadeOut(ab), FadeOut(bc), FadeOut(muka_alas),
                   FadeOut(n_ab), FadeOut(n_bc), run_time=0.8)
            sumbu_z_muncul(b, papan_koor, 0.7)
            tunggu_kata_bergeser(b, frame, "A G menembus")
            b.main(ShowCreation(ag), run_time=1.2)
            tunggu_kata_bergeser(b, frame, "diagonal ruang")
            b.main(Indicate(ag, color=AKSEN), run_time=1.1)
            tunggu_kata_bergeser(b, frame, "Segitiga penolongnya")
            b.main(ShowCreation(cg), FadeIn(muka_tegak), ShowCreation(siku_c), run_time=1.3)
            b.main(FadeIn(n_cg), run_time=0.5)
            tunggu_kata_bergeser(b, frame, "tidak menempel")
            # Bidang ACG (x = y) terlihat TEPAT DARI SAMPING pada theta -45, dan
            # -52 masih cuma 7 derajat darinya: AG, CG, dan AC berimpit jadi satu
            # garis tegak (lembar kontak 480p 12 Sep). Uji bingkai tunggal
            # (uji/uji_sudut_acg.py): -15 dan -80 sama-sama jelas; dipilih -24
            # supaya gerakannya pendek dan geseran latar (theta bertambah)
            # menjauhi -45, bukan mendekatinya.
            b.main(kamera.sudut(frame, -24, 66, pusat=PUSAT, tinggi=TINGGI_BINGKAI), run_time=2.6)
        qc.periksa_adegan(self, {"AG": ag, "CG": cg, "nilai CG": n_cg, "panel": papan.semua(),
                                 "identitas": jati},
                          [("panel", "identitas")])

        # ---- hitung2: Pythagoras kedua memakai 72.
        n_ag = label_hadap(frame, "6\\sqrt{3}", sepanjang3(T["A"], T["G"], 0.62)
                           + np.array([-1.5, 0.0, 0.0]), AKSEN, 28, rumus_latex=True)
        with sinema.babak(self, "hitung2", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "Alasnya")
            b.main(Indicate(ac, color=AKSEN2), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "sisi tegaknya")
            b.main(Indicate(cg, color=SOROT), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "siku-sikunya")
            b.main(Indicate(siku_c, scale_factor=1.6, color=SOROT), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "Jadi")
            papan.tumbuh(r"AG^2 = 72 + 36 = 108", "ditambah", b=b)
            tunggu_kata_bergeser(b, frame, "A G sama")
            papan.baris(r"AG = 6\sqrt{3} \approx 10{,}39", AKSEN, b=b)
            tunggu_kata_bergeser(b, frame, "kira-kira")
            b.main(FadeIn(n_ag), run_time=0.7)
        qc.periksa_adegan(self, {"panel": papan.semua(), "nilai AG": n_ag, "identitas": jati},
                          [("panel", "identitas")])

        # ---- keliru: 6 akar 2 + 6 dicoret; kuadratnya yang dijumlahkan.
        salah = rumus(r"6\sqrt{2} + 6", 36, REDUP).move_to([0.0, -1.3, 0.0]).fix_in_frame()
        coret = Line(salah.get_left() + np.array([-0.1, -0.12, 0]),
                     salah.get_right() + np.array([0.1, 0.12, 0])).set_stroke(AKSEN, 4).fix_in_frame()
        with sinema.babak(self, "keliru", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "kuadratnya")
            b.main(papan.sorot(), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "Enam akar")
            b.main(FadeIn(salah, shift=0.2 * UP), run_time=0.6)
            tunggu_kata_bergeser(b, frame, "bukan diagonal")
            b.main(ShowCreation(coret), run_time=0.5)
            tunggu_kata_bergeser(b, frame, "hanya tujuh")
            b.main(FadeOut(salah), FadeOut(coret), run_time=0.5)
            b.main(papan.sorot(), run_time=1.0)
        qc.periksa_adegan(self, {"panel": papan.semua(), "identitas": jati},
                          [("panel", "identitas")])

        # ---- umum: diagonal balok, lahir di dekat AG.
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "Bentuk umumnya")
            b.main(FadeOut(papan.semua()), FadeOut(n_ac), FadeOut(n_cg), FadeOut(n_ag), run_time=0.6)
            self.remove(*papan.semua(), n_ac, n_cg, n_ag)
            papan = sinema.PapanRumus(self)
            tunggu_kata_bergeser(b, frame, "diagonal ruang")
            sinema.lahir_rumus(self, r"d = \sqrt{p^2 + l^2 + t^2}", dekat=ag,
                               papan=papan, b=b, warna=SOROT, tahan=0.6, run_time=1.1)
            tunggu_kata_bergeser(b, frame, "Pada kubus")
            papan.baris(r"d = \sqrt{3 r^2} = r\sqrt{3}", AKSEN, b=b)
        qc.periksa_adegan(self, {"panel": papan.semua(), "AG": ag, "identitas": jati},
                          [("panel", "identitas")])

        # ---- tutup: tiga arah, ditempel pada diagonalnya.
        alasan = label_hadap(frame, "3 arah", sepanjang3(T["A"], T["G"], 0.62)
                             + np.array([-1.5, 0.0, 0.0]), SOROT, 30)
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "Angka tiga")
            b.main(papan.sorot(), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "berapa arah")
            b.main(FadeIn(alasan), run_time=0.8)
            tunggu_kata_bergeser(b, frame, "panjang")
            b.main(Indicate(ab, color=SOROT), run_time=0.7)
            tunggu_kata_bergeser(b, frame, "lebar")
            b.main(Indicate(bc, color=SOROT), run_time=0.7)
            tunggu_kata_bergeser(b, frame, "tinggi")
            b.main(Indicate(cg, color=SOROT), run_time=0.7)
            tunggu_kata_bergeser(b, frame, "kedua kalinya")
            b.main(Indicate(ag, color=AKSEN), run_time=1.2)
        qc.periksa_adegan(self, {"AG": ag, "panel": papan.semua(), "alasan": alasan,
                                 "identitas": jati},
                          [("panel", "identitas"), ("alasan", "identitas")])

        # ---- lanjut: Bagian 3, titik B ke garis AG.
        kaki = kaki_pada_garis(T["B"], T["A"], T["G"])
        bk = Line(T["B"], kaki).set_stroke(SOROT, 5)
        tanya2 = rumus("?", 44, SOROT)
        lab_tanya = label_hadap(frame, tanya2, kaki + np.array([-0.9, 0.6, 0.5]), SOROT, 44)
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "berikutnya")
            b.main(FadeOut(alasan), FadeOut(papan.semua()), FadeOut(muka_tegak),
                   FadeOut(cg), FadeOut(siku_c), run_time=0.7)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self)
            tunggu_kata_bergeser(b, frame, "titiknya")
            b.main(Indicate(lab["B"], scale_factor=1.5, color=SOROT), run_time=0.8)
            tunggu_kata_bergeser(b, frame, "diagonal ruang")
            b.main(Indicate(ag, color=AKSEN), run_time=0.8)
            tunggu_kata_bergeser(b, frame, "kaki")
            b.main(ShowCreation(bk), run_time=0.8)
            b.main(FadeIn(lab_tanya), run_time=0.5)
        qc.periksa_adegan(self, {"AG": ag, "BK": bk, "tanya": lab_tanya, "identitas": jati})

        sinema.laporkan_pemicu(self)
