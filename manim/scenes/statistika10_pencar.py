"""Statistika Materi 10, Hubungan Dua Variabel Bagian 1: diagram pencar dan
arah hubungan (ManimGL).
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (1:54)
yang sudah disetujui ARYA. DUNIANYA SAMA: dua sumbu berangka, pasangan
(2, 55) dituntun garis putus jadi satu titik, sepuluh titik jam belajar
(positif), sepuluh titik jam main gim (negatif), awan bulat contoh buatan,
titik yang disambung berurutan dicoret, satu garis wakil.

YANG BERBEDA: pembuka sub-bab plus Bagian 1 dengan pertanyaan halaman (dua
daftar angka berdampingan sebagai pertanyaan); kekuatan diperagakan: awan
rapat lawan awan berserakan yang arahnya sama; bentuk umum (x, y), arah dan
kekuatan, di panel; penutup menunjuk Bagian 2 (tiga garis); tiap kejadian
dipicu pada KATA; sorotan memakai pita tembus pandang.

Data (semuanya dinyatakan buatan di halaman):
    `t10-belajar`    jam belajar dan nilai, r = 0,98, awannya naik
    `t10-main-game`  jam main gim dan nilai, r = -0,98, awannya turun
    ACAK             contoh buatan untuk kasus tanpa kecenderungan, r = 0,03
    LEMAH            contoh buatan untuk hubungan positif yang berserakan

SATU WARNA SATU MAKNA: AKSEN2 biru = hubungan positif, AKSEN bata = hubungan
negatif, SOROT ungu = pasangan yang sedang dilahirkan dan sorotan, REDUP =
sumbu, angka, dan awan tanpa kecenderungan. Kamera phi 90, tegak lurus.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "statistika10-pencar"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

BELAJAR = [(2, 55), (3, 58), (4, 64), (5, 63), (6, 70), (7, 72), (8, 75), (9, 80), (10, 78), (11, 85)]
GIM = [(1, 88), (2, 85), (3, 80), (4, 82), (5, 75), (6, 72), (7, 70), (8, 65), (9, 66), (10, 60)]
ACAK = [(2, 72), (3, 58), (4, 80), (5, 63), (6, 55), (7, 84), (8, 60), (9, 71), (10, 66), (11, 70)]
LEMAH = [(2, 62), (3, 55), (4, 72), (5, 60), (6, 78), (7, 64), (8, 70), (9, 84), (10, 68), (11, 80)]

SKALA_X, PUSAT_JAM = 0.7167, 6.0
SKALA_Y, DASAR_NILAI = 0.0880, 51.0
ANGKA_X = [0, 2, 4, 6, 8, 10, 12]
ANGKA_Y = [55, 65, 75, 85]
Z_DASAR = -1.08
Z_ANGKA = Z_DASAR - 0.32
X_SUMBU_Y = -4.72
Z_KAMERA = 0.50
TINGGI_BINGKAI = 6.4


def tegak(mob):
    """Berdirikan benda datar di bidang xz supaya menghadap kamera."""
    return mob.rotate(90 * DEGREES, RIGHT)


def xj(jam):
    return (jam - PUSAT_JAM) * SKALA_X


def zn(nilai):
    return Z_DASAR + (nilai - DASAR_NILAI) * SKALA_Y


class Pencar10(AdeganMatra):
    samples = 4                        # penghalus tepi; bawaan ManimGL 0

    def sorot_pita(self, b, *mobs, lama=1.0, lebih=0.2):
        pita = VGroup()
        for m in mobs:
            p = Rectangle(width=m.get_width() + lebih, height=m.get_depth() + lebih)
            p.set_stroke(width=0).set_fill(SOROT, 0.35)
            pita.add(tegak(p).move_to(m.get_center() + IN * 0.02))
        self.add(pita)
        b.main(FadeIn(pita), run_time=lama * 0.35)
        b.main(FadeOut(pita), run_time=lama * 0.65)
        self.remove(pita)

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self, tanpa_utama=True)
        DUNIA, HUD, TULISAN = {}, {}, {}

        def taruh(nama, mob, tulisan=False):
            DUNIA[nama] = mob
            if tulisan:
                TULISAN[nama] = mob
            return mob

        def buang(*nama):
            for n in nama:
                DUNIA[n] = None
                TULISAN.pop(n, None)

        def periksa(pasangan=None):
            hidup_d = {k: v for k, v in DUNIA.items() if v is not None}
            hidup_h = {k: v for k, v in HUD.items() if v is not None}
            if papan.semua() is not None:
                hidup_h["papan rumus"] = papan.semua()
            hidup_t = {k: v for k, v in TULISAN.items() if v is not None}
            qc.periksa_adegan(self, {}, pasangan=pasangan, hud=hidup_h,
                              dunia=hidup_d, tulisan=hidup_t, jaga_jalur_bawah=True)

        # Panggung: dua sumbu berangka.
        sumbu_x = Line([xj(-0.8), 0, Z_DASAR], [xj(12.8), 0, Z_DASAR]).set_stroke(REDUP, 2.4)
        sumbu_y = Line([X_SUMBU_Y, 0, Z_DASAR], [X_SUMBU_Y, 0, zn(88)]).set_stroke(REDUP, 2.4)
        angka_satuan, angka = {}, VGroup()
        for j in ANGKA_X:
            angka.add(Line([xj(j), 0, Z_DASAR], [xj(j), 0, Z_DASAR - 0.10]).set_stroke(REDUP, 1.6))
            t = tegak(rumus(str(j), 20, REDUP)).move_to([xj(j), 0, Z_ANGKA])
            angka.add(t)
            angka_satuan[f"x{j}"] = t
        for v in ANGKA_Y:
            angka.add(Line([X_SUMBU_Y, 0, zn(v)], [X_SUMBU_Y - 0.10, 0, zn(v)]).set_stroke(REDUP, 1.6))
            t = tegak(rumus(str(v), 20, REDUP)).move_to([X_SUMBU_Y - 0.38, 0, zn(v)])
            angka.add(t)
            angka_satuan[f"y{v}"] = t
        l_sumbu_x = tegak(sinema.label("jam belajar", 20, REDUP)).move_to([xj(12.0), 0, Z_DASAR + 0.30])
        l_sumbu_y = tegak(sinema.label("nilai", 20, REDUP)).move_to([X_SUMBU_Y + 0.5, 0, zn(88) - 0.05])

        def awan(pasangan, warna, jari=0.078):
            g = VGroup()
            for j, v in pasangan:
                d = Dot(radius=jari).set_fill(warna, 1).set_stroke(LATAR, 1.0)
                g.add(tegak(d).move_to([xj(j), 0, zn(v)]))
            return g

        titik = awan(BELAJAR, AKSEN2)
        titik_gim = awan(GIM, AKSEN)
        titik_acak = awan(ACAK, REDUP)
        titik_lemah = awan(LEMAH, AKSEN2)

        # ==================================================================
        # buka: judul sub-bab; dua daftar angka berdampingan, tanda tanya di antaranya.
        # ==================================================================
        kamera.pasang_awal(frame, theta=0, phi=90, pusat=(0, 0, Z_KAMERA), tinggi=TINGGI_BINGKAI)
        daftar_jam = VGroup(*[tegak(rumus(str(j), 22, AKSEN2)).move_to([-3.6 + i * 0.62, 0, 1.55])
                              for i, (j, _) in enumerate(BELAJAR)])
        daftar_nilai = VGroup(*[tegak(rumus(str(v), 22, TINTA)).move_to([-3.6 + i * 0.62, 0, 0.55])
                                for i, (_, v) in enumerate(BELAJAR)])
        l_jam = tegak(sinema.label("jam belajar", 20, AKSEN2)).move_to([-4.85, 0, 1.55])
        l_nilai = tegak(sinema.label("nilai ujian", 20, TINTA)).move_to([-4.85, 0, 0.55])
        tanya = tegak(rumus("?", 44, SOROT)).move_to([-0.8, 0, 1.05])
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Hubungan")
            sinema.judul_pembuka(self, "Hubungan Dua Variabel, Bagian 1", lama=3.2, y=2.6)
            b.catat(3.2)
            b.tunggu_kata("lama belajar")
            taruh("daftar jam", daftar_jam, tulisan=True)
            taruh("label jam", l_jam, tulisan=True)
            b.main(FadeIn(l_jam), LaggedStartMap(FadeIn, daftar_jam, lag_ratio=0.08), run_time=0.9)
            b.tunggu_kata("nilai")
            taruh("daftar nilai", daftar_nilai, tulisan=True)
            taruh("label nilai", l_nilai, tulisan=True)
            b.main(FadeIn(l_nilai), LaggedStartMap(FadeIn, daftar_nilai, lag_ratio=0.08), run_time=0.9)
            taruh("tanya", tanya, tulisan=True)
            b.main(FadeIn(tanya, shift=0.2 * OUT), run_time=0.5)
        periksa()

        # ==================================================================
        # dua: satu jenis angka lawan dua sekaligus.
        # ==================================================================
        with sinema.babak(self, "dua", DURASI, kata=KATA) as b:
            b.tunggu_kata("satu jenis")
            b.main(FadeOut(tanya), run_time=0.4)
            buang("tanya")
            self.sorot_pita(b, daftar_nilai, lama=1.0, lebih=0.3)
            b.tunggu_kata("dua sekaligus")
            self.sorot_pita(b, daftar_jam, daftar_nilai, lama=1.2, lebih=0.3)
            b.tunggu_kata("sepuluh siswa")
            HUD["identitas"] = sinema.identitas(self, "10 siswa yang sama", "jam per minggu, nilai ujian")
            HUD["identitas"].set_opacity(0)
            b.main(HUD["identitas"].animate.set_opacity(1), run_time=0.6)
        periksa()

        # ==================================================================
        # pasang: sepuluh pasangan; pasangan pertama (2, 55) lahir sebagai rumus.
        # ==================================================================
        kurung = VGroup(*[Line([-3.6 + i * 0.62, 0, 1.30], [-3.6 + i * 0.62, 0, 0.80]).set_stroke(SOROT, 1.6)
                          for i in range(10)])
        with sinema.babak(self, "pasang", DURASI, kata=KATA) as b:
            b.tunggu_kata("orang yang")
            taruh("kurung", kurung)
            b.main(LaggedStartMap(ShowCreation, kurung, lag_ratio=0.08), run_time=1.0)
            b.tunggu_kata("sepuluh pasangan")
            self.sorot_pita(b, *[VGroup(daftar_jam[i], daftar_nilai[i]) for i in range(10)], lama=1.2, lebih=0.12)
            b.tunggu_kata("Siswa pertama")
            sinema.lahir_rumus(self, r"(2,\ 55)", VGroup(daftar_jam[0], daftar_nilai[0]), papan, b=b, warna=SOROT,
                               sebagai_utama=False, ukuran_lahir=46, tahan=0.5, run_time=1.0, geser=UP * 1.2 + RIGHT * 1.2)
        periksa()

        # ==================================================================
        # titik: daftar jadi sumbu; pasangan pertama turun jadi satu titik.
        # ==================================================================
        tuntun_x = DashedLine([xj(2), 0, Z_DASAR], [xj(2), 0, zn(55)]).set_stroke(SOROT, 2.0)
        tuntun_y = DashedLine([X_SUMBU_Y, 0, zn(55)], [xj(2), 0, zn(55)]).set_stroke(SOROT, 2.0)
        with sinema.babak(self, "titik", DURASI, kata=KATA) as b:
            b.tunggu_kata("Tiap")
            b.main(FadeOut(VGroup(daftar_jam, daftar_nilai, l_jam, l_nilai, kurung)), run_time=0.5)
            buang("daftar jam", "daftar nilai", "label jam", "label nilai", "kurung")
            taruh("sumbu datar", sumbu_x)
            taruh("sumbu tegak", sumbu_y)
            taruh("angka", angka)
            taruh("nama sumbu x", l_sumbu_x, tulisan=True)
            taruh("nama sumbu y", l_sumbu_y, tulisan=True)
            TULISAN.update(angka_satuan)
            b.main(ShowCreation(sumbu_x), ShowCreation(sumbu_y), FadeIn(angka), FadeIn(l_sumbu_x), FadeIn(l_sumbu_y),
                   run_time=1.2)
            b.tunggu_kata("Jam belajarnya")
            taruh("tuntun", VGroup(tuntun_x, tuntun_y))
            b.main(ShowCreation(tuntun_x), run_time=1.0)
            b.tunggu_kata("nilainya")
            b.main(ShowCreation(tuntun_y), run_time=1.0)
            b.tunggu_kata("duduk")
            taruh("titik", titik)
            b.main(FadeIn(titik[0], scale=0.4), run_time=0.6)
            b.main(Indicate(titik[0], scale_factor=2.4, color=SOROT), FadeOut(VGroup(tuntun_x, tuntun_y)), run_time=0.9)
            buang("tuntun")
        periksa()

        # ==================================================================
        # awan: sepuluh titik, polanya langsung kelihatan.
        # ==================================================================
        l_positif = tegak(sinema.label("positif", 21, AKSEN2)).move_to([xj(3.0), 0, zn(83)])
        with sinema.babak(self, "awan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sepuluh")
            b.main(LaggedStart(*[FadeIn(m, scale=0.4) for m in titik[1:]], lag_ratio=0.14), run_time=2.2)
            b.tunggu_kata("Makin ke")
            self.sorot_pita(b, titik, lama=1.4, lebih=0.4)
            b.tunggu_kata("positif")
            taruh("label positif", l_positif, tulisan=True)
            b.main(FadeIn(l_positif), run_time=0.6)
        periksa()

        # ==================================================================
        # negatif: data lain, awannya condong ke arah sebaliknya.
        # ==================================================================
        l_negatif = tegak(sinema.label("negatif", 21, AKSEN)).move_to([xj(9.0), 0, zn(83)])
        l_gim = tegak(sinema.label("main gim", 20, REDUP)).move_to([xj(11.9), 0, Z_DASAR + 0.30])
        with sinema.babak(self, "negatif", DURASI, kata=KATA) as b:
            b.tunggu_kata("data lain")
            b.main(FadeOut(titik), FadeOut(l_positif), FadeOut(papan.semua()), run_time=0.7)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, tanpa_utama=True)
            buang("titik", "label positif")
            b.tunggu_kata("jam main")
            taruh("nama sumbu x", l_gim, tulisan=True)
            b.main(FadeOut(l_sumbu_x), FadeIn(l_gim), run_time=0.6)
            b.tunggu_kata("Awannya")
            taruh("titik gim", titik_gim)
            b.main(LaggedStart(*[FadeIn(m, scale=0.4) for m in titik_gim], lag_ratio=0.12), run_time=1.8)
            b.tunggu_kata("makin ke")
            self.sorot_pita(b, titik_gim, lama=1.2, lebih=0.4)
            b.tunggu_kata("negatif")
            taruh("label negatif", l_negatif, tulisan=True)
            b.main(FadeIn(l_negatif), run_time=0.6)
        periksa()

        # ==================================================================
        # kuat: arah sama, kekuatan beda: awan rapat lawan awan berserakan.
        # ==================================================================
        garis_rapat = Line([xj(2), 0, zn(55.6)], [xj(11), 0, zn(84.4)]).set_stroke(SOROT, 2.2)
        l_kuat = tegak(sinema.label("kuat", 20, SOROT)).move_to([xj(3.2), 0, zn(83)])
        l_lemah = tegak(sinema.label("lemah", 20, SOROT)).move_to([xj(3.2), 0, zn(83)])
        with sinema.babak(self, "kuat", DURASI, kata=KATA) as b:
            b.tunggu_kata("kekuatannya")
            b.main(FadeOut(titik_gim), FadeOut(l_negatif), FadeOut(l_gim), FadeIn(l_sumbu_x), run_time=0.7)
            buang("titik gim", "label negatif")
            taruh("nama sumbu x", l_sumbu_x, tulisan=True)
            b.tunggu_kata("berdesakan")
            taruh("titik", titik)
            taruh("garis rapat", garis_rapat)
            b.main(LaggedStart(*[FadeIn(m, scale=0.4) for m in titik], lag_ratio=0.08), ShowCreation(garis_rapat), run_time=1.2)
            b.tunggu_kata("kuat")
            taruh("label kuat", l_kuat, tulisan=True)
            b.main(FadeIn(l_kuat), run_time=0.5)
            b.tunggu_kata("berserakan")
            taruh("titik", titik_lemah)
            taruh("label kuat", l_lemah, tulisan=True)
            b.main(*[Transform(a, c) for a, c in zip(titik, titik_lemah)], FadeOut(l_kuat), FadeIn(l_lemah), run_time=1.2)
            b.tunggu_kata("walau")
            b.main(Indicate(garis_rapat, scale_factor=1.03, color=SOROT), run_time=0.9)
        periksa()

        # ==================================================================
        # tanpa: tidak ada kecenderungan sama sekali (contoh buatan).
        # ==================================================================
        l_buatan = tegak(sinema.label("contoh buatan", 19, REDUP)).move_to([xj(9.4), 0, zn(84)])
        with sinema.babak(self, "tanpa", DURASI, kata=KATA) as b:
            b.tunggu_kata("tidak ada")
            b.main(FadeOut(titik), FadeOut(l_lemah), FadeOut(garis_rapat), run_time=0.6)
            buang("titik", "label kuat", "garis rapat")
            b.tunggu_kata("Awannya")
            taruh("titik acak", titik_acak)
            taruh("label buatan", l_buatan, tulisan=True)
            b.main(LaggedStart(*[FadeIn(m, scale=0.4) for m in titik_acak], lag_ratio=0.12), FadeIn(l_buatan), run_time=1.1)
            b.tunggu_kata("tidak condong")
            self.sorot_pita(b, titik_acak, lama=1.2, lebih=0.4)
            b.tunggu_kata("jawaban")
            b.main(LaggedStartMap(lambda m, **kw: Indicate(m, scale_factor=1.7, color=SOROT, **kw),
                                  titik_acak, lag_ratio=0.1), run_time=1.2)
        periksa()

        # ==================================================================
        # urutan: titik pencar TIDAK boleh disambung berurutan.
        # ==================================================================
        sambung = VGroup(*[Line([xj(ACAK[i][0]), 0, zn(ACAK[i][1])], [xj(ACAK[i + 1][0]), 0, zn(ACAK[i + 1][1])])
                           .set_stroke(AKSEN, 2.4) for i in range(len(ACAK) - 1)])
        silang = VGroup()
        pusat_s = np.array([xj(6.5), 0.0, zn(70)])
        for tanda in (1, -1):
            for arah in (1, -1):
                silang.add(Line(pusat_s + np.array([arah * 0.26, 0, arah * tanda * 0.26]),
                                pusat_s + np.array([arah * 0.72, 0, arah * tanda * 0.72])))
        silang.set_stroke(AKSEN, 3.4)
        with sinema.babak(self, "urutan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Titik pada")
            taruh("sambung", sambung)
            b.main(LaggedStartMap(ShowCreation, sambung, lag_ratio=0.14), run_time=1.1)
            b.tunggu_kata("tidak boleh")
            taruh("silang", silang)
            b.main(ShowCreation(silang), run_time=0.8)
            b.tunggu_kata("Tidak ada")
            b.main(FadeOut(silang), FadeOut(sambung), run_time=0.8)
            buang("silang", "sambung")
            b.tunggu_kata("sepuluh orang")
            b.main(LaggedStartMap(lambda m, **kw: Indicate(m, scale_factor=1.7, color=SOROT, **kw),
                                  titik_acak, lag_ratio=0.1), run_time=1.2)
        periksa()

        # ==================================================================
        # garis: yang boleh cuma SATU garis mewakili seluruh awan.
        # ==================================================================
        garis_wakil = Line([xj(2), 0, zn(55.6)], [xj(11), 0, zn(84.4)]).set_stroke(SOROT, 3.2)
        titik2 = awan(BELAJAR, AKSEN2)
        with sinema.babak(self, "garis", DURASI, kata=KATA) as b:
            b.tunggu_kata("Yang boleh")
            b.main(FadeOut(titik_acak), FadeOut(l_buatan), run_time=0.5)
            buang("titik acak", "label buatan")
            taruh("titik", titik2)
            b.main(LaggedStart(*[FadeIn(m, scale=0.4) for m in titik2], lag_ratio=0.08), run_time=0.45)
            b.tunggu_kata("satu garis")
            taruh("garis wakil", garis_wakil)
            b.main(ShowCreation(garis_wakil), run_time=1.2)
            b.tunggu_kata("paling pas")
            b.main(Indicate(garis_wakil, scale_factor=1.03, color=SOROT), run_time=0.9)
        periksa()

        # ==================================================================
        # umum: (x, y), arah, kekuatan; ditulis di panel.
        # ==================================================================
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("sepasang")
            papan.baris(r"\text{tiap orang}: (x,\ y)", TINTA, b=b)
            b.tunggu_kata("x ke")
            b.main(Indicate(l_sumbu_x, scale_factor=1.2, color=SOROT), run_time=0.7)
            b.tunggu_kata("y ke")
            b.main(Indicate(l_sumbu_y, scale_factor=1.2, color=SOROT), run_time=0.7)
            b.tunggu_kata("arahnya")
            papan.baris(r"\text{arah}: +\ \text{atau}\ -", AKSEN2, b=b)
            b.tunggu_kata("kekuatannya")
            papan.baris(r"\text{kekuatan}: \text{rapat atau berserakan}", AKSEN, b=b)
        periksa()

        # ==================================================================
        # tutup: gambar dulu awannya, baru hitung.
        # ==================================================================
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("gambar dulu")
            b.main(LaggedStartMap(lambda m, **kw: Indicate(m, scale_factor=1.8, color=SOROT, **kw),
                                  titik2, lag_ratio=0.1), run_time=1.4)
            b.tunggu_kata("Gambarnya")
            b.main(papan.sorot(), run_time=1.0)
        periksa()

        # ==================================================================
        # lanjut: tiga garis berbeda pada titik yang sama.
        # ==================================================================
        judul_lanjut = teks("Hubungan Dua Variabel, Bagian 2", 30, SOROT).move_to([0, 2.6, 0]).fix_in_frame()
        tiga = VGroup(
            Line([xj(1.5), 0, zn(52)], [xj(11.5), 0, zn(84)]).set_stroke(AKSEN, 2.4),
            Line([xj(1.5), 0, zn(58)], [xj(11.5), 0, zn(80)]).set_stroke(AKSEN2, 2.4),
            Line([xj(1.5), 0, zn(49)], [xj(11.5), 0, zn(88)]).set_stroke(TINTA, 2.4),
        )
        tanya2 = tegak(rumus("?", 44, SOROT)).move_to([xj(3.0), 0, zn(84)])
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Hubungan")
            b.main(FadeOut(papan.semua()), FadeOut(garis_wakil), FadeOut(HUD["identitas"]),
                   FadeIn(judul_lanjut, shift=0.2 * UP), run_time=0.7)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, tanpa_utama=True)
            HUD["identitas"] = None
            buang("garis wakil")
            self.hud_tambah(judul_lanjut)
            HUD["judul lanjut"] = judul_lanjut
            b.tunggu_kata("menarik garis")
            taruh("tiga garis", tiga)
            b.main(LaggedStartMap(ShowCreation, tiga, lag_ratio=0.3), run_time=1.5)
            b.tunggu_kata("siapa")
            taruh("tanya", tanya2, tulisan=True)
            b.main(FadeIn(tanya2, shift=0.2 * OUT), run_time=0.6)
        periksa()

        sinema.laporkan_pemicu(self)
