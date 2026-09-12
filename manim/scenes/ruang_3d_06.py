"""Ruang Tiga Dimensi, materi 06: Jarak dalam Ruang Bagian 4, jarak titik ke bidang.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (92 detik,
6 babak) yang sudah disetujui ARYA. ISINYA SAMA: bidang BDE memotong pojok
kubus; ruas tegak lurus AK menembus bidang, kaki K tanpa nama; K di sepertiga
diagonal ruang AG, AK = 2 akar 3; cara yang selalu jalan: volume limas A.BDE
dengan dua alas, 36 = sepertiga kali 18 akar 3 kali AK; jarak = 3V dibagi luas
alas, rumus volume yang dibalik.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 4 lalu pertanyaan halaman; segar-ingat
  Jarak dalam Ruang Bagian 1 (ruas tegak lurus ke garis).
- Cek koordinat: K = (2, 2, 2) sehingga AK = akar 12 = 2 akar 3 (memakai rumus
  Bagian 2); hitungan volume dengan angka lengkap; bentuk umum lahir di dekat
  ruas jaraknya; penutup menunjuk Bagian 5.
- Tiap kejadian dipicu pada KATA yang mengucapkannya (`sinema.JamKata`).
- Sorot panel memakai `papan.sorot()`, bukan Indicate pada seluruh papan.

Naskah   : manim/narasi/ruang-3d-06.json (11 segmen, 2:38)
Render   : manimgl manim/scenes/ruang_3d_06.py JarakTitikKeBidang -w --hd --config_file manim/hd60.yml
Gabung   : python manim/gabung_audio.py ruang-3d-06 JarakTitikKeBidang --keluar ruang-3d-06.mp4
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ruang_3d_umum import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

TOPIK = "ruang-3d-06"
DURASI = durasi(TOPIK)
KATA = sinema.JamKata(TOPIK)

# Kaki tegak lurus dari A ke bidang BDE = titik berat segitiga itu = sepertiga AG.
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

        kamera.pasang_awal(frame, theta=-44, phi=72, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        pasang_cahaya(self)
        bayangan = bayangan_kubus()
        self.add(lantai(), bayangan, *papan_koor["datar"], *papan_koor["tinggi"], kubus)

        # ---- buka: judul sub-bab; bidang miringnya muncul sebagai pertanyaan.
        tanya = rumus("?", 64, SOROT).move_to([0.0, 0.8, 0.0]).fix_in_frame()
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jarak")
            sinema.judul_pembuka(self, "Jarak dalam Ruang, Bagian 4", lama=3.0, y=3.0)
            b.catat(3.0)
            b.tunggu_kata("Bidangnya")
            b.main(kubus.animate.set_opacity(0.14), ShowCreation(rangka, lag_ratio=0.12),
                   FadeOut(bayangan), FadeIn(bidang), run_time=1.6)
            b.tunggu_kata("Berapa")
            b.main(FadeIn(tanya, shift=0.2 * UP), run_time=0.7)
        qc.periksa_adegan(self, {"kubus": kubus, "bidang": bidang, "tanya": tanya})

        # ---- ingat: Bagian 1, ruas tegak lurus dari B ke garis AC.
        q = np.array([RUSUK / 2, RUSUK / 2, 0.0])
        acl = Line(T["A"], T["C"]).set_stroke(TINTA, 5)
        bq = Line(T["B"], q).set_stroke(SOROT, 5)
        siku_q = siku(T["B"], q, T["A"], ukuran=0.45)
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Jarak")
            b.main(FadeOut(tanya), bidang.animate.set_fill(AKSEN, 0.08).set_stroke(AKSEN, 2, opacity=0.4),
                   run_time=0.8)
            b.tunggu_kata("tegak lurus")
            b.main(ShowCreation(acl), ShowCreation(bq), run_time=0.9)
            b.main(ShowCreation(siku_q), run_time=0.4)
            tunggu_kata_bergeser(b, frame, "sebuah garis")
            b.main(Indicate(acl, color=SOROT), run_time=0.9)
            tunggu_kata_bergeser(b, frame, "Hari ini")
            b.main(FadeOut(acl), FadeOut(bq), FadeOut(siku_q), run_time=0.6)
            tunggu_kata_bergeser(b, frame, "sebuah bidang")
            b.main(bidang.animate.set_fill(AKSEN, 0.30).set_stroke(AKSEN, 4, opacity=1.0), run_time=0.9)
        qc.periksa_adegan(self, {"kubus": kubus, "bidang": bidang})

        # ---- bidang: BDE, diputari supaya potongannya terlihat.
        jati = sinema.identitas(self, "panjang = lebar = tinggi = 6 satuan")
        self.remove(jati)
        with sinema.babak(self, "bidang", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ini bidang")
            sumbu_z_pamit(b, papan_koor, 0.8)
            self.add(jati)
            b.main(*[FadeIn(x) for x in lab.values()], FadeIn(jati), run_time=0.8)
            tunggu_kata_bergeser(b, frame, "Ketiga sisinya")
            b.main(Indicate(bidang, color=AKSEN, scale_factor=1.0), run_time=1.2)
            tunggu_kata_bergeser(b, frame, "memotong pojok")
            b.main(kamera.sudut(frame, -78, 64, pusat=PUSAT, tinggi=TINGGI_BINGKAI), run_time=2.6)
        qc.periksa_adegan(self, {"bidang": bidang, "huruf B": lab["B"], "huruf E": lab["E"],
                                 "identitas": jati})

        # ---- tegak: ruas tegak lurus yang menembus bidangnya.
        tanda_k = penanda(self, frame, K)
        with sinema.babak(self, "tegak", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "kaki tegak")
            b.main(Indicate(lab["A"], scale_factor=1.5, color=SOROT), run_time=0.9)
            tunggu_kata_bergeser(b, frame, "Tarik ruas")
            b.main(ShowCreation(ak), run_time=1.4)
            tunggu_kata_bergeser(b, frame, "Kakinya")
            b.main(FadeIn(tanda_k), FadeIn(lab_k), run_time=0.8)
            tunggu_kata_bergeser(b, frame, "tidak punya")
            b.main(Indicate(lab_k, scale_factor=1.5, color=SOROT), run_time=0.8)
            tunggu_kata_bergeser(b, frame, "kubus ini")
            b.main(kamera.sudut(frame, -40, 74, pusat=PUSAT, tinggi=TINGGI_BINGKAI), run_time=1.4)
        qc.periksa_adegan(self, {"AK": ak, "huruf K": lab_k, "identitas": jati},
                          [("huruf K", "identitas")])

        # ---- sepertiga: sumbu z kembali, AG digambar, AK = sepertiga AG.
        n_ag = label_hadap(frame, "6\\sqrt{3}", sepanjang3(T["A"], T["G"], 0.72)
                           + np.array([0.75, -0.35, 0.0]), AKSEN2, 28, rumus_latex=True)
        with sinema.babak(self, "sepertiga", DURASI, kata=KATA) as b:
            sumbu_z_muncul(b, papan_koor, 0.7)
            tunggu_kata_bergeser(b, frame, "A B")
            b.main(Indicate(lab["B"], color=AKSEN), Indicate(lab["D"], color=AKSEN),
                   Indicate(lab["E"], color=AKSEN), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "sepertiga")
            b.main(ShowCreation(ag), run_time=1.1)
            b.main(FadeIn(n_ag), run_time=0.5)
            tunggu_kata_bergeser(b, frame, "jaraknya")
            sinema.lahir_rumus(self, r"AK = \tfrac{1}{3} AG = 2\sqrt{3}", dekat=ak,
                               papan=papan, b=b, warna=SOROT, tahan=0.2, run_time=0.8)
            tunggu_kata_bergeser(b, frame, "kira-kira")
            papan.baris(r"2\sqrt{3} \approx 3{,}46", SOROT, b=b)
        qc.periksa_adegan(self, {"AG": ag, "AK": ak, "panel": papan.semua(), "nilai AG": n_ag,
                                 "identitas": jati},
                          [("panel", "identitas")])

        # ---- cek: koordinat K = (2, 2, 2), AK = akar 12.
        lab_koor = label_hadap(frame, "(2,\\ 2,\\ 2)", K + np.array([0.9, -0.2, -0.75]), SOROT, 26,
                               rumus_latex=True)
        with sinema.babak(self, "cek", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "K ada di")
            b.main(FadeIn(lab_koor), run_time=0.7)
            tunggu_kata_bergeser(b, frame, "akar dari")
            papan.baris(r"AK = \sqrt{2^2 + 2^2 + 2^2} = \sqrt{12}", AKSEN2, b=b)
            tunggu_kata_bergeser(b, frame, "memang dua")
            papan.baris(r"\sqrt{12} = 2\sqrt{3}", AKSEN2, b=b)
            tunggu_kata_bergeser(b, frame, "Cocok")
            b.main(papan.sorot(), run_time=1.0)
        qc.periksa_adegan(self, {"panel": papan.semua(), "koordinat K": lab_koor, "identitas": jati},
                          [("panel", "identitas")])

        # ---- volume: cara yang selalu jalan; limas disorot dua kali.
        alas_datar = Polygon(T["A"], T["B"], T["D"]).set_fill(AKSEN2, 0.30).set_stroke(AKSEN2, 3)
        n_ae = label_hadap(frame, "6", sepanjang3(T["A"], T["E"], 0.55)
                           + np.array([-0.70, -0.35, 0.0]), AKSEN2, 28)
        with sinema.babak(self, "volume", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "Cara yang")
            b.main(FadeOut(papan.semua()), FadeOut(lab_koor), FadeOut(n_ag), run_time=0.6)
            self.remove(*papan.semua(), lab_koor, n_ag)
            papan = sinema.PapanRumus(self)
            tunggu_kata_bergeser(b, frame, "volume limas")
            b.main(FadeIn(alas_datar), ShowCreation(ae), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "dua alas")
            b.main(alas_datar.animate.set_fill(AKSEN2, 0.42), run_time=0.5)
            b.main(alas_datar.animate.set_fill(AKSEN2, 0.15),
                   bidang.animate.set_fill(AKSEN, 0.45), run_time=0.7)
            tunggu_kata_bergeser(b, frame, "samakan")
            b.main(bidang.animate.set_fill(AKSEN, 0.30), alas_datar.animate.set_fill(AKSEN2, 0.30),
                   run_time=0.6)
        qc.periksa_adegan(self, {"alas": alas_datar, "AE": ae, "identitas": jati})

        # ---- hitung: dua volume dengan angka lengkap.
        with sinema.babak(self, "hitung", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "Dengan alas")
            b.main(alas_datar.animate.set_fill(AKSEN2, 0.45), run_time=0.6)
            b.main(FadeIn(n_ae), run_time=0.5)
            tunggu_kata_bergeser(b, frame, "sepertiga kali delapan")
            papan.baris(r"V = \tfrac{1}{3}\cdot 18 \cdot 6 = 36", AKSEN2, b=b)
            tunggu_kata_bergeser(b, frame, "Dengan alas", ke=2)
            b.main(alas_datar.animate.set_fill(AKSEN2, 0.12),
                   bidang.animate.set_fill(AKSEN, 0.45), run_time=0.8)
            tunggu_kata_bergeser(b, frame, "luasnya")
            papan.baris(r"L_{BDE} = 18\sqrt{3}", AKSEN, b=b)
            tunggu_kata_bergeser(b, frame, "Jadi tiga")
            papan.baris(r"36 = \tfrac{1}{3}\cdot 18\sqrt{3}\cdot AK", AKSEN, b=b)
            tunggu_kata_bergeser(b, frame, "dan jaraknya")
            papan.baris(r"AK = 2\sqrt{3}", SOROT, b=b)
        qc.periksa_adegan(self, {"panel": papan.semua(), "nilai AE": n_ae, "identitas": jati},
                          [("panel", "identitas")])

        # ---- umum: jarak = 3V dibagi luas alas, lahir di dekat AK.
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "Bentuk umumnya")
            b.main(FadeOut(papan.semua()), FadeOut(n_ae), FadeOut(alas_datar), FadeOut(ae),
                   bidang.animate.set_fill(AKSEN, 0.30), run_time=0.7)
            self.remove(*papan.semua(), n_ae, alas_datar, ae)
            papan = sinema.PapanRumus(self)
            tunggu_kata_bergeser(b, frame, "tiga kali")
            sinema.lahir_rumus(self, r"d = \frac{3V}{L_{\text{alas}}}", dekat=ak,
                               papan=papan, b=b, warna=SOROT, tahan=0.6, run_time=1.1)
            tunggu_kata_bergeser(b, frame, "dibalik")
            papan.baris(r"V = \tfrac{1}{3} L_{\text{alas}}\, d", REDUP, b=b)
        qc.periksa_adegan(self, {"panel": papan.semua(), "AK": ak, "identitas": jati},
                          [("panel", "identitas")])

        # ---- tutup: dua jalan, satu asal: tegak lurus.
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "kaki tegak")
            b.main(Indicate(ak, color=SOROT), Indicate(lab_k, scale_factor=1.4, color=SOROT),
                   run_time=1.1)
            tunggu_kata_bergeser(b, frame, "volume")
            b.main(papan.sorot(), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "tegak lurus", ke=2)
            b.main(Indicate(ak, color=SOROT), run_time=1.0)
        qc.periksa_adegan(self, {"AK": ak, "bidang": bidang, "panel": papan.semua(),
                                 "identitas": jati},
                          [("panel", "identitas")])

        # ---- lanjut: Bagian 5, dua bidang sejajar.
        bidang_atas = Polygon(T["F"], T["H"], T["C"]).set_fill(AKSEN2, 0.25).set_stroke(AKSEN2, 3)
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "berikutnya")
            b.main(FadeOut(papan.semua()), FadeOut(ak), FadeOut(tanda_k), FadeOut(lab_k),
                   FadeOut(ag), run_time=0.7)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self)
            tunggu_kata_bergeser(b, frame, "bidang yang")
            b.main(FadeIn(bidang_atas), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "satu titik")
            b.main(Indicate(lab["E"], scale_factor=1.5, color=SOROT), run_time=1.0)
        qc.periksa_adegan(self, {"bidang": bidang, "bidang atas": bidang_atas, "identitas": jati})

        sinema.laporkan_pemicu(self)
