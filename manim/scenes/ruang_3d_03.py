"""Ruang Tiga Dimensi, materi 03: "Jarak selalu yang terpendek" (ManimGL).

STANDAR VIDEO v3 (9 September 2026). Ditulis ulang dari versi 92 detik.
Kejadian di layar dipicu oleh KATA yang sedang diucapkan.

Naskah   : manim/narasi/ruang-3d-03.json      (30 segmen, 259,8 detik)
Narasi   : python manim/buat_narasi.py ruang-3d-03
Render   : manimgl manim/scenes/ruang_3d_03.py JarakSelaluTerpendek -w --hd --config_file manim/hd60.yml
Gabung   : python manim/gabung_audio.py ruang-3d-03 JarakSelaluTerpendek --keluar ruang-3d-03.mp4

SEGAR-INGAT (standar v3 butir 2)
Materi 01 "Gambar ruang boleh berbohong", disebut nomor dan namanya, dengan
gambar kuncinya: dua ruas yang tampak berpotongan padahal terpisah 6 satuan.
Bukan hiasan: seluruh video ini memutuskan dengan ANGKA, bukan dengan gambar,
dan itu persis kesimpulan materi 01.

ASAL KESIMPULAN DIBUKTIKAN, bukan disodorkan: segitiga BQR siku-siku di Q,
lalu Pythagoras memberi BR kuadrat sama dengan BQ kuadrat ditambah QR kuadrat.
Karena QR kuadrat tidak pernah negatif, BR tidak pernah lebih pendek daripada
BQ. Angkanya ikut dihitung di layar: 18 + 6,48 = 24,48.

SATU WARNA SATU MAKNA
  AKSEN2 biru  = garis AC, sasaran yang dituju
  AKSEN merah  = ruas coba-coba dari B, termasuk BR
  SOROT ungu   = jawabannya: kaki tegak lurus dan ruas BQ
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ruang_3d_umum import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

TOPIK = "ruang-3d-03"
DURASI = durasi(TOPIK)
# Jam KATA, inti standar v3. URUTAN WAJIB: buat_narasi.py dulu, baru render.
KATA = sinema.JamKata(TOPIK)

KAKI = kaki_pada_garis(T["B"], T["A"], T["C"])   # tepat di tengah alas
T_KAKI = 0.5
T_R = 0.80          # letak titik R pada AC, sengaja bukan di kaki


def di_ac(t):
    return T["A"] + (T["C"] - T["A"]) * t


def panjang_dari_b(t):
    return float(np.linalg.norm(T["B"] - di_ac(t)))


class JarakSelaluTerpendek(AdeganMatra):
    def construct(self):
        frame = self.frame

        kubus = kubus_pejal().set_opacity(0.14)
        rangka = rangka_kubus()
        ac = Line(T["A"], T["C"]).set_stroke(AKSEN2, 6)
        papan_koor = papan_koordinat(frame)
        papan = sinema.PapanRumus(self)

        kamera.pasang_awal(frame, theta=-38, phi=72, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        pasang_cahaya(self)

        # ---- Babak 1: SATU pertanyaan yang dijawab video ini.
        tanya = rumus(r"?", 60, SOROT)
        tanya.move_to(np.array([0.0, 1.4, 0.0])).fix_in_frame()
        titik_b = Dot(ORIGIN, radius=0.10).set_color(AKSEN)
        garis_t = Line(np.array([-2.6, -1.2, 0.0]), np.array([2.6, -1.2, 0.0]))
        garis_t.set_stroke(AKSEN2, 5)
        titik_b.move_to(np.array([-0.4, 0.6, 0.0]))
        coba_t = VGroup(*[
            Line(titik_b.get_center(), np.array([x, -1.2, 0.0])).set_stroke(REDUP, 2.6)
            for x in (-2.0, -1.2, -0.4, 0.6, 1.6)
        ])
        skema = VGroup(garis_t, coba_t, titik_b, tanya).fix_in_frame()
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jarak")
            sinema.judul_pembuka(self, "Jarak dalam Ruang, Bagian 1", lama=3.0, y=1.8)
            b.catat(3.0)
            b.tunggu_kata("banyak")
            b.main(ShowCreation(garis_t), FadeIn(titik_b), run_time=0.6)
            b.tunggu_kata("menghubungkan")
            b.main(ShowCreation(coba_t, lag_ratio=0.3), run_time=1.3)
            b.tunggu_kata("disebut jarak")
            b.main(FadeIn(tanya, shift=0.2 * UP), run_time=0.7)
        qc.periksa_adegan(self, {"skema": skema})

        # ---- Babak 2 dan 3: SEGAR-INGAT materi 01, dengan gambar kuncinya.
        bd_ingat = Line(T["B"], T["D"]).set_stroke(AKSEN2, 5)
        eg_ingat = Line(T["E"], T["G"]).set_stroke(AKSEN, 5)
        with sinema.babak(self, "ingat-01", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kedudukan")
            b.main(FadeOut(skema), run_time=0.6)
            self.add(lantai(), *papan_koor["datar"], kubus)
            b.main(FadeIn(kubus), ShowCreation(rangka, lag_ratio=0.12), run_time=1.5)
            b.tunggu_kata("berpotongan")
            b.main(ShowCreation(bd_ingat), ShowCreation(eg_ingat), run_time=0.8)
            b.tunggu_kata("terpisah")
            b.main(Indicate(eg_ingat, color=AKSEN), run_time=1.0)
        qc.periksa_adegan(self, {"kubus": kubus})

        jati = sinema.identitas(self, "panjang = lebar = tinggi = 6 satuan")
        self.remove(jati)
        pesan_lama = sinema.label("angka memutuskan", warna=SOROT)
        pesan_lama.to_edge(UP, buff=1.15).fix_in_frame()
        with sinema.babak(self, "ingat-pesan", DURASI, kata=KATA) as b:
            b.tunggu_kata("angka")
            b.main(FadeIn(pesan_lama, shift=0.2 * DOWN), run_time=0.8)
            b.tunggu_kata("pakai")
            b.main(FadeOut(bd_ingat), FadeOut(eg_ingat), FadeOut(pesan_lama),
                   run_time=0.9)
            self.add(jati)
            b.main(FadeIn(jati), run_time=0.6)
        qc.periksa_adegan(self, {"kubus": kubus, "identitas": jati})

        # ---- Babak 4: panggungnya sendiri, titik B dan garis AC.
        lab = huruf_sudut(frame, {"A": AKSEN2, "B": AKSEN, "C": AKSEN2})
        with sinema.babak(self, "panggung", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "rusuknya")
            b.main(*[FadeIn(x) for x in lab.values()], run_time=0.8)
            tunggu_kata_bergeser(b, frame, "titik")
            b.main(Indicate(lab["B"], scale_factor=1.7, color=AKSEN), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "garis")
            b.main(ShowCreation(ac), run_time=1.2)
        qc.periksa_adegan(self, {"AC": ac, "huruf B": lab["B"], "identitas": jati})

        # ---- Babak 5 sampai 8: masalahnya, kata "jarak" belum punya arti.
        coba_coba = VGroup(*[
            Line(T["B"], di_ac(x)).set_stroke(REDUP, 2.6)
            for x in (0.16, 0.30, 0.44, 0.62, 0.80)
        ])
        with sinema.babak(self, "banyak", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "menarik")
            b.main(ShowCreation(coba_coba, lag_ratio=0.25), run_time=2.2)
        qc.periksa_adegan(self, {"AC": ac, "coba": coba_coba, "identitas": jati})

        with sinema.babak(self, "sah", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "penghubung")
            b.main(Indicate(coba_coba, color=SOROT), run_time=1.3)

        with sinema.babak(self, "beda", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "panjangnya")
            b.main(Indicate(coba_coba[0], color=REDUP),
                   Indicate(coba_coba[4], color=REDUP), run_time=1.3)

        with sinema.babak(self, "belum", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "memilih")
            b.main(FadeOut(coba_coba), run_time=0.9)

        # ---- Babak 9 sampai 12: CONTOH ANGKA. Q digeser, angkanya hidup.
        t_q = ValueTracker(0.14)
        bq = always_redraw(lambda: Line(T["B"], di_ac(t_q.get_value())
                                        ).set_stroke(AKSEN, 5))
        titik_q = always_redraw(lambda: Dot(di_ac(t_q.get_value()), radius=0.10
                                            ).set_color(SOROT))
        angka = DecimalNumber(panjang_dari_b(0.14), num_decimal_places=3,
                              font_size=30).set_color(AKSEN)
        angka.add_updater(lambda m: m.set_value(panjang_dari_b(t_q.get_value())))
        panel_hidup = sinema.nilai_hidup(teks("BQ", 28, AKSEN), angka, di=[4.6, 3.15, 0])
        with sinema.babak(self, "geser", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "Titik")
            self.add(bq, titik_q)
            b.main(FadeIn(panel_hidup), run_time=0.7)
            b.tunggu_kata("angkanya")
            b.main(t_q.animate.set_value(T_KAKI), run_time=2.4)
        qc.periksa_adegan(self, {"BQ": bq, "panel hidup": panel_hidup,
                                 "identitas": jati})

        with sinema.babak(self, "turun-naik", DURASI, kata=KATA) as b:
            b.tunggu_kata("berbalik")
            b.main(t_q.animate.set_value(0.86), run_time=2.0)
            b.tunggu_kata("paling")
            b.main(t_q.animate.set_value(T_KAKI), run_time=1.6)

        tanda_siku = siku(T["B"], KAKI, T["C"], ukuran=0.55).set_stroke(SOROT, 4)
        with sinema.babak(self, "siku", DURASI, kata=KATA) as b:
            b.tunggu_kata("siku-siku")
            b.main(ShowCreation(tanda_siku), run_time=1.0)
            b.tunggu_kata("tegak")
            b.main(Indicate(tanda_siku, scale_factor=1.5, color=SOROT), run_time=1.1)
        qc.periksa_adegan(self, {"BQ": bq, "siku": tanda_siku, "identitas": jati})

        payung = label_hadap(frame, "tegak lurus", KAKI + np.array([-2.3, 0.0, 0.55]),
                             SOROT, 30)
        with sinema.babak(self, "nama-kaki", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "kaki")
            b.main(FadeIn(payung), run_time=0.8)
            tunggu_kata_bergeser(b, frame, "jarak")
            b.main(Indicate(bq, color=SOROT), run_time=1.1)
        qc.periksa_adegan(self, {"payung": payung, "siku": tanda_siku,
                                 "identitas": jati})

        # ---- Babak 13 sampai 15: angkanya dihitung, bukan diberikan.
        n_kaki = label_hadap(frame, "(3, 3, 0)", KAKI + np.array([0.9, -0.9, 0.45]),
                             SOROT, 26, rumus_latex=True)
        with sinema.babak(self, "mana-q", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "tengah")
            b.main(FadeIn(n_kaki), run_time=0.8)
        qc.periksa_adegan(self, {"letak kaki": n_kaki, "payung": payung,
                                 "identitas": jati},
                          [("letak kaki", "payung")])

        with sinema.babak(self, "hitung-bq", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "langkahnya")
            b.main(Indicate(lab["B"], scale_factor=1.6, color=AKSEN), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "maju")
            b.main(Indicate(n_kaki, color=SOROT), run_time=1.0)

        with sinema.babak(self, "nilai-bq", DURASI, kata=KATA) as b:
            b.tunggu_kata("Pythagoras")
            sinema.lahir_rumus(self, r"BQ^2 = 3^2 + 3^2 = 18", dekat=bq,
                               papan=papan, b=b, warna=SOROT)
            b.tunggu_kata("Akarnya")
            papan.baris(r"BQ = 3\sqrt{2} \approx 4{,}243", SOROT, b=b)
        qc.periksa_adegan(self, {"panel": papan.semua(), "identitas": jati},
                          [("panel", "identitas")])

        # ---- Babak 16 sampai 26: ASAL KESIMPULAN, dibuktikan dengan Pythagoras.
        with sinema.babak(self, "kenapa-buka", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "pasti")
            b.main(Indicate(bq, color=SOROT), run_time=1.2)

        r_letak = di_ac(T_R)
        br = Line(T["B"], r_letak).set_stroke(AKSEN, 4)
        qr = Line(KAKI, r_letak).set_stroke(REDUP, 4)
        lab_r = label_hadap(frame, "R", r_letak + np.array([0.35, 0.35, 0.40]), AKSEN)
        with sinema.babak(self, "ambil-r", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "sebut")
            b.main(FadeIn(lab_r), ShowCreation(br), run_time=1.3)
        qc.periksa_adegan(self, {"BR": br, "huruf R": lab_r, "identitas": jati})

        with sinema.babak(self, "segitiga", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "segitiga")
            b.main(ShowCreation(qr), run_time=1.1)
            tunggu_kata_bergeser(b, frame, "siku-siku")
            b.main(Indicate(tanda_siku, scale_factor=1.5, color=SOROT), run_time=1.1)

        with sinema.babak(self, "sisi-miring", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "miringnya")
            b.main(Indicate(br, color=AKSEN), run_time=1.3)

        with sinema.babak(self, "rumus", DURASI, kata=KATA) as b:
            b.tunggu_kata("Pythagoras")
            papan.baris(r"BR^2 = BQ^2 + QR^2", TINTA, b=b)
        qc.periksa_adegan(self, {"panel": papan.semua(), "BR": br,
                                 "identitas": jati},
                          [("panel", "identitas")])

        with sinema.babak(self, "angka-r", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "ambil")
            b.main(Indicate(qr, color=REDUP), run_time=1.2)
            b.tunggu_kata("sehingga")
            papan.baris(r"QR^2 = 6{,}48", REDUP, b=b)

        with sinema.babak(self, "jumlah", DURASI, kata=KATA) as b:
            b.tunggu_kata("delapan")
            papan.baris(r"BR^2 = 18 + 6{,}48 = 24{,}48", TINTA, b=b)
        qc.periksa_adegan(self, {"panel": papan.semua(), "identitas": jati},
                          [("panel", "identitas")])

        with sinema.babak(self, "banding", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "Bandingkan")
            b.main(Indicate(bq, color=SOROT), run_time=1.1)
            tunggu_kata_bergeser(b, frame, "panjang")
            b.main(Indicate(br, color=AKSEN), run_time=1.1)

        with sinema.babak(self, "sebab", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "negatif")
            b.main(Indicate(papan.semua()[-2], scale_factor=1.12, color=SOROT),
                   run_time=1.3)

        with sinema.babak(self, "selalu", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "mungkin")
            b.main(Indicate(bq, color=SOROT), run_time=1.2)

        with sinema.babak(self, "sama-kapan", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "berimpit")
            b.main(FadeOut(br), FadeOut(qr), FadeOut(lab_r), run_time=1.1)
        qc.periksa_adegan(self, {"BQ": bq, "siku": tanda_siku, "payung": payung,
                                 "identitas": jati})

        # ---- Babak 27 sampai 30: BENTUK UMUM, lalu penutup yang menunjuk 04.
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "Jarak")
            b.main(Indicate(bq, color=SOROT), Indicate(tanda_siku, color=SOROT),
                   run_time=1.4)

        with sinema.babak(self, "payung", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "dihafal")
            b.main(Indicate(payung, scale_factor=1.18, color=SOROT), run_time=1.3)

        with sinema.babak(self, "berlaku", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "menyebut")
            b.main(Indicate(tanda_siku, scale_factor=1.5, color=SOROT), run_time=1.2)

        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "Ingat")
            b.main(Indicate(payung, color=SOROT), run_time=1.2)
            tunggu_kata_bergeser(b, frame, "berikutnya")
            b.main(papan.sorot(), run_time=1.3)
        qc.periksa_adegan(self, {"BQ": bq, "payung": payung, "siku": tanda_siku,
                                 "panel": papan.semua(), "identitas": jati},
                          [("payung", "panel")])

        # Gerbang v3: tiap pemicu harus jatuh di detik katanya, selisih < 0,15.
        sinema.laporkan_pemicu(self)
