"""Materi 10 Statistika: diagram pencar dan arah hubungan (ManimGL).

Naskah: manim/narasi/statistika10-pencar.json (10 segmen, 113,5 detik)

GAGASAN POKOK. Halaman menampilkan diagram pencar yang sudah jadi. Yang tidak
bisa dilakukan halaman: memperlihatkan titik itu LAHIR dari sepasang angka.
Di video ini dua baris angka berdiri terpisah, lalu tiap pasangan bertemu dan
turun jadi satu titik di bidangnya. Sesudah sepuluh titik duduk, polanya
kelihatan tanpa satu rumus pun dipakai.

Data (semuanya dinyatakan buatan di halaman):
    `t10-belajar`    jam belajar dan nilai, r = 0,98, awannya naik
    `t10-main-game`  jam main gim dan nilai, r = -0,98, awannya turun
    ACAK             contoh buatan untuk kasus tanpa kecenderungan, r = 0,03
ACAK dibuat khusus untuk video ini dan DIBERI LABEL "contoh buatan" di layar,
sesuai aturan kejujuran data topik ini.

TATA LETAK (standar video versi 2):
    kiri atas  identitas benda, menetap
    kanan atas papan rumus, berubah lewat morph
    kaki layar milik subtitle, dijaga qc
    dalam gambar label maksimal dua kata

SATU WARNA SATU MAKNA DI DALAM VIDEO INI:
    AKSEN2 biru = hubungan positif       AKSEN bata = hubungan negatif
    SOROT ungu  = pasangan yang sedang dilahirkan jadi titik
    REDUP       = sumbu, angka, dan awan tanpa kecenderungan

Kamera phi 90, tegak lurus.
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

BELAJAR = [(2, 55), (3, 58), (4, 64), (5, 63), (6, 70), (7, 72), (8, 75), (9, 80), (10, 78), (11, 85)]
GIM = [(1, 88), (2, 85), (3, 80), (4, 82), (5, 75), (6, 72), (7, 70), (8, 65), (9, 66), (10, 60)]
ACAK = [(2, 72), (3, 58), (4, 80), (5, 63), (6, 55), (7, 84), (8, 60), (9, 71), (10, 66), (11, 70)]

SKALA_X, PUSAT_JAM = 0.7167, 6.0
# Dinaikkan 4 Sep: tengah atas layar bebas.
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

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        DUNIA, HUD, TULISAN = {}, {}, {}
        HUD["identitas"] = sinema.identitas(self, "10 siswa yang sama",
                                            "jam per minggu, nilai ujian")

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

        # ------------------------------------------------------------------
        # Panggung: dua sumbu berangka.
        # ------------------------------------------------------------------
        sumbu_x = Line([xj(-0.8), 0, Z_DASAR], [xj(12.8), 0, Z_DASAR]).set_stroke(REDUP, 2.4)
        sumbu_y = Line([X_SUMBU_Y, 0, Z_DASAR], [X_SUMBU_Y, 0, zn(88)]).set_stroke(REDUP, 2.4)
        angka_satuan, angka = {}, VGroup()
        for j in ANGKA_X:
            angka.add(Line([xj(j), 0, Z_DASAR], [xj(j), 0, Z_DASAR - 0.10]).set_stroke(REDUP, 1.6))
            t = tegak(rumus(str(j), 20, REDUP)).move_to([xj(j), 0, Z_ANGKA])
            angka.add(t)
            angka_satuan[f"x{j}"] = t
        for v in ANGKA_Y:
            angka.add(Line([X_SUMBU_Y, 0, zn(v)], [X_SUMBU_Y - 0.10, 0, zn(v)])
                      .set_stroke(REDUP, 1.6))
            t = tegak(rumus(str(v), 20, REDUP)).move_to([X_SUMBU_Y - 0.38, 0, zn(v)])
            angka.add(t)
            angka_satuan[f"y{v}"] = t

        def awan(pasangan, warna, jari=0.078):
            g = VGroup()
            for j, v in pasangan:
                d = Dot(radius=jari).set_fill(warna, 1).set_stroke(LATAR, 1.0)
                g.add(tegak(d).move_to([xj(j), 0, zn(v)]))
            return g

        titik = awan(BELAJAR, AKSEN2)
        titik_gim = awan(GIM, AKSEN)
        titik_acak = awan(ACAK, REDUP)

        # ==================================================================
        # Babak 1 `buka`: dua sumbu, dua jenis angka sekaligus.
        # ==================================================================
        kamera.pasang_awal(frame, theta=0, phi=90, pusat=(0, 0, Z_KAMERA), tinggi=TINGGI_BINGKAI)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 10: Diagram pencar", lama=3.2, y=2.6)
            b.catat(3.2)
            # Dua benda pipih, bukan satu kotak sebesar grafik; lihat
            # catatan yang sama di statistika11_regresi.py.
            taruh("sumbu datar", sumbu_x)
            taruh("sumbu tegak", sumbu_y)
            taruh("angka", angka)
            TULISAN.update(angka_satuan)
            b.main(ShowCreation(sumbu_x), ShowCreation(sumbu_y), run_time=1.4)
            b.main(FadeIn(angka), run_time=1.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 2 `pasang`: kedua angka milik orang yang sama.
        # ==================================================================
        with sinema.babak(self, "pasang", DURASI) as b:
            sinema.lahir_rumus(self, r"(2, 55)", sumbu_x, papan, b=b, warna=SOROT)
            b.main(Indicate(papan.utama, scale_factor=1.2, color=SOROT), run_time=1.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 3 `titik`: pasangan pertama turun jadi satu titik.
        # ==================================================================
        tuntun_x = DashedLine([xj(2), 0, Z_DASAR], [xj(2), 0, zn(55)]).set_stroke(SOROT, 2.0)
        tuntun_y = DashedLine([X_SUMBU_Y, 0, zn(55)], [xj(2), 0, zn(55)]).set_stroke(SOROT, 2.0)

        with sinema.babak(self, "titik", DURASI) as b:
            taruh("tuntun", VGroup(tuntun_x, tuntun_y))
            b.main(ShowCreation(tuntun_x), run_time=1.4)
            b.main(ShowCreation(tuntun_y), run_time=1.4)
            taruh("titik", titik)
            b.main(FadeIn(titik[0], scale=0.4), run_time=1.2)
            b.main(Indicate(titik[0], scale_factor=2.4, color=SOROT), run_time=1.4)
            b.main(FadeOut(VGroup(tuntun_x, tuntun_y)), run_time=1.0)
            buang("tuntun")
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 4 `awan`: sepuluh titik, dan polanya langsung kelihatan.
        # ==================================================================
        l_positif = tegak(sinema.label("positif", 21, AKSEN2))
        l_positif.move_to([xj(3.0), 0, zn(83)])

        with sinema.babak(self, "awan", DURASI) as b:
            b.main(LaggedStart(*[FadeIn(m, scale=0.4) for m in titik[1:]],
                               lag_ratio=0.14), run_time=3.4)
            taruh("label positif", l_positif, tulisan=True)
            b.main(FadeIn(l_positif), run_time=1.0)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.8, color=AKSEN2, **kw),
                titik, lag_ratio=0.1), run_time=2.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 5 `negatif`: data lain, awannya condong ke arah sebaliknya.
        # ==================================================================
        l_negatif = tegak(sinema.label("negatif", 21, AKSEN))
        l_negatif.move_to([xj(9.0), 0, zn(83)])

        with sinema.babak(self, "negatif", DURASI) as b:
            b.main(FadeOut(titik), FadeOut(l_positif), run_time=1.0)
            buang("titik", "label positif")
            sinema.ganti_rumus(self, papan.utama, r"\text{jam main gim}", b=b,
                               run_time=1.6, papan=papan)
            taruh("titik gim", titik_gim)
            b.main(LaggedStart(*[FadeIn(m, scale=0.4) for m in titik_gim],
                               lag_ratio=0.12), run_time=3.0)
            taruh("label negatif", l_negatif, tulisan=True)
            b.main(FadeIn(l_negatif), run_time=1.0)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 6 `kuat`: selain arah, ada kekuatannya.
        # ==================================================================
        with sinema.babak(self, "kuat", DURASI) as b:
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.8, color=AKSEN, **kw),
                titik_gim, lag_ratio=0.1), run_time=2.4)
            sinema.ganti_rumus(self, papan.utama, r"\text{arah, kekuatan}", b=b,
                               run_time=1.6, papan=papan)
            b.main(Indicate(papan.utama, scale_factor=1.15, color=SOROT), run_time=1.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 7 `tanpa`: bisa juga tidak ada kecenderungan sama sekali.
        # Awan ini DIBUAT untuk video, dan itu ditulis di layar.
        # ==================================================================
        l_buatan = tegak(sinema.label("contoh buatan", 19, REDUP))
        l_buatan.move_to([xj(9.4), 0, zn(84)])

        with sinema.babak(self, "tanpa", DURASI) as b:
            b.main(FadeOut(titik_gim), FadeOut(l_negatif), run_time=1.0)
            buang("titik gim", "label negatif")
            taruh("titik acak", titik_acak)
            b.main(LaggedStart(*[FadeIn(m, scale=0.4) for m in titik_acak],
                               lag_ratio=0.12), run_time=2.8)
            taruh("label buatan", l_buatan, tulisan=True)
            b.main(FadeIn(l_buatan), run_time=1.0)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.7, color=REDUP, **kw),
                titik_acak, lag_ratio=0.1), run_time=2.2)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 8 `urutan`: titik pencar TIDAK boleh disambung berurutan.
        # ==================================================================
        sambung = VGroup(*[Line([xj(ACAK[i][0]), 0, zn(ACAK[i][1])],
                                [xj(ACAK[i + 1][0]), 0, zn(ACAK[i + 1][1])])
                           .set_stroke(AKSEN, 2.4) for i in range(len(ACAK) - 1)])
        silang = VGroup()
        pusat_s = np.array([xj(6.5), 0.0, zn(70)])
        for tanda in (1, -1):
            for arah in (1, -1):
                silang.add(Line(pusat_s + np.array([arah * 0.26, 0, arah * tanda * 0.26]),
                                pusat_s + np.array([arah * 0.72, 0, arah * tanda * 0.72])))
        silang.set_stroke(AKSEN, 3.4)

        with sinema.babak(self, "urutan", DURASI) as b:
            taruh("sambung", sambung)
            b.main(LaggedStartMap(ShowCreation, sambung, lag_ratio=0.14), run_time=2.6)
            taruh("silang", silang)
            b.main(ShowCreation(silang), run_time=1.6)
            b.main(FadeOut(silang), FadeOut(sambung), run_time=1.4)
            buang("silang", "sambung")
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 9 `garis`: yang boleh cuma SATU garis mewakili seluruh awan.
        # ==================================================================
        garis_wakil = Line([xj(2), 0, zn(55.6)], [xj(11), 0, zn(84.4)]).set_stroke(SOROT, 3.2)

        with sinema.babak(self, "garis", DURASI) as b:
            b.main(FadeOut(titik_acak), FadeOut(l_buatan), run_time=1.0)
            buang("titik acak", "label buatan")
            taruh("titik", titik)
            b.main(LaggedStart(*[FadeIn(m, scale=0.4) for m in titik],
                               lag_ratio=0.08), run_time=2.0)
            taruh("garis wakil", garis_wakil)
            b.main(ShowCreation(garis_wakil), run_time=2.0)
            b.main(Indicate(garis_wakil, scale_factor=1.03, color=SOROT), run_time=1.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 10 `tutup`: gambar dulu awannya, baru hitung.
        # ==================================================================
        with sinema.babak(self, "tutup", DURASI) as b:
            sinema.ganti_rumus(self, papan.utama, r"\text{gambar dulu}", b=b,
                               run_time=1.6, papan=papan)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.8, color=AKSEN2, **kw),
                titik, lag_ratio=0.1), run_time=2.4)
            b.main(Indicate(papan.utama, scale_factor=1.2, color=SOROT), run_time=1.6)
            b.jeda(1.4)
        periksa()
