"""Statistika Materi 11, Hubungan Dua Variabel Bagian 2: garis regresi dan
residu (ManimGL).
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (1:50)
yang sudah disetujui ARYA. DUNIANYA SAMA: sepuluh titik, tiga garis tebakan,
residu sebagai BILAH tegak (bukan garis tipis) dengan kamera didekatkan,
warna menyebut tandanya, jumlah residu nol, kuadrat lalu dijumlah jadi satu
angka, garis diputar mengelilingi pusat data (146, 56,9, 27,2, naik lagi),
garis terbaik, tangga 1 jam naik 3,2, ekstrapolasi 40 jam pada penggaris
jauh dengan langit-langit 100.

YANG BERBEDA: pembuka sub-bab plus Bagian 2 dengan pertanyaan halaman;
segar-ingat Ukuran Pemusatan dan Penyebaran Bagian 4 (jarak ke pusat,
jumlah nol, kuadrat) diperagakan dengan bilah ke garis y = 70; rumus b dan a
dihitung dengan angkanya di panel (lima jumlah ditulis di dunia); penutup
menunjuk Bagian 3 (r = 0,98); tiap kejadian dipicu pada KATA; sorotan
memakai pita tembus pandang.

Angka: n = 10, Sx = 65, Sy = 700, Sxy = 4814, Sxx = 505, b = 3,2, a = 49,2;
jumlah kuadrat residu: b=2,0 -> 146; 2,6 -> 56,9; 3,2 -> 27,2; 3,8 -> 56,9.

SATU WARNA SATU MAKNA: AKSEN2 biru = residu POSITIF, AKSEN bata = residu
NEGATIF dan peringatan, SOROT ungu = garis terbaik dan sorotan, TINTA = titik
dan tulisan, REDUP = sumbu, angka, garis tebakan. Kamera phi 90; bingkai
didekatkan ke 4,8 selama babak residu, tanda, nol, kuadrat.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "statistika11-regresi"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

DATA = [(2, 55), (3, 58), (4, 64), (5, 63), (6, 70), (7, 72), (8, 75), (9, 80), (10, 78), (11, 85)]
MEAN_X, MEAN_Y = 6.5, 70.0
B, A = 3.2, 49.2
JKR = {2.0: 146.0, 2.6: 56.9, 3.2: 27.2, 3.8: 56.9}
BATAS_NILAI = 100
JAM_JAUH = 40
RAMAL_JAUH = 177.2

SKALA = {
    "dekat": (0.7167, 6.0, 0.0880, 51.0),
    "jauh": (0.1955, 22.0, 0.0223, 40.0),
}
ANGKA_X = {"dekat": [0, 2, 4, 6, 8, 10, 12], "jauh": [0, 10, 20, 30, 40]}
ANGKA_Y = {"dekat": [55, 65, 75, 85], "jauh": [40, 80, 120, 160]}

Z_DASAR = -1.08
Z_ANGKA = Z_DASAR - 0.32
X_SUMBU_Y = -4.72
Z_KAMERA = 0.50
TINGGI_BINGKAI = 6.4
LEBAR_BILAH = 0.15


def tegak(mob):
    """Berdirikan benda datar di bidang xz supaya menghadap kamera."""
    return mob.rotate(90 * DEGREES, RIGHT)


def koma(nilai, desimal=1):
    if desimal == 0:
        return str(int(round(nilai)))
    return f"{nilai:.{desimal}f}".rstrip("0").rstrip(".").replace(".", "{,}")


class Regresi11(AdeganMatra):
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
        papan = sinema.PapanRumus(self)
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

        keadaan = {"nama": "dekat"}

        def xj(jam, nama=None):
            sx, pj, _, _ = SKALA[nama or keadaan["nama"]]
            return (jam - pj) * sx

        def zn(nilai, nama=None):
            _, _, sy, dn = SKALA[nama or keadaan["nama"]]
            return Z_DASAR + (nilai - dn) * sy

        def buat_sumbu(nama):
            datar, tegak_g = VGroup(), VGroup()
            datar.add(Line([xj(-0.8, nama), 0, Z_DASAR], [xj(ANGKA_X[nama][-1] + 0.8, nama), 0, Z_DASAR])
                      .set_stroke(REDUP, 2.4))
            tegak_g.add(Line([X_SUMBU_Y, 0, Z_DASAR], [X_SUMBU_Y, 0, zn(ANGKA_Y[nama][-1] + 3, nama)])
                        .set_stroke(REDUP, 2.4))
            for j in ANGKA_X[nama]:
                x = xj(j, nama)
                datar.add(Line([x, 0, Z_DASAR], [x, 0, Z_DASAR - 0.10]).set_stroke(REDUP, 1.6))
                datar.add(tegak(rumus(str(j), 20, REDUP)).move_to([x, 0, Z_ANGKA]))
            for v in ANGKA_Y[nama]:
                z = zn(v, nama)
                tegak_g.add(Line([X_SUMBU_Y, 0, z], [X_SUMBU_Y - 0.10, 0, z]).set_stroke(REDUP, 1.6))
                tegak_g.add(tegak(rumus(str(v), 20, REDUP)).move_to([X_SUMBU_Y - 0.38, 0, z]))
            return VGroup(datar, tegak_g), datar, tegak_g

        sumbu_dekat, sumbu_dekat_x, sumbu_dekat_y = buat_sumbu("dekat")
        sumbu_jauh, sumbu_jauh_x, sumbu_jauh_y = buat_sumbu("jauh")

        def buat_titik(nama):
            g = VGroup()
            for j, v in DATA:
                d = Dot(radius=0.062).set_fill(TINTA, 1).set_stroke(LATAR, 1.0)
                g.add(tegak(d).move_to([xj(j, nama), 0, zn(v, nama)]))
            return g

        titik = buat_titik("dekat")
        titik_jauh = buat_titik("jauh")

        def garis_dari(b, a=None, dari=2.0, sampai=11.0, warna=REDUP, tebal=2.6, nama=None):
            if a is None:
                a = MEAN_Y - b * MEAN_X
            g = Line([xj(dari, nama), 0, zn(a + b * dari, nama)], [xj(sampai, nama), 0, zn(a + b * sampai, nama)])
            return g.set_stroke(warna, tebal)

        def bilah_residu(b_miring, nama=None):
            g = VGroup()
            a_potong = MEAN_Y - b_miring * MEAN_X
            for j, v in DATA:
                ramal = a_potong + b_miring * j
                warna = AKSEN2 if v >= ramal else AKSEN
                tinggi = abs(zn(v, nama) - zn(ramal, nama))
                r = Rectangle(width=LEBAR_BILAH, height=max(tinggi, 0.02))
                r.set_fill(warna, 0.95).set_stroke(warna, 1.0)
                g.add(tegak(r).move_to([xj(j, nama), 0, (zn(v, nama) + zn(ramal, nama)) / 2]))
            return g

        # ==================================================================
        # buka: judul sub-bab; sepuluh titik dan tiga garis, tanda tanya.
        # ==================================================================
        kamera.pasang_awal(frame, theta=0, phi=90, pusat=(0, 0, Z_KAMERA), tinggi=TINGGI_BINGKAI)
        tebakan = VGroup(garis_dari(2.5), garis_dari(3.2), garis_dari(3.9))
        tanya = tegak(rumus("?", 44, SOROT)).move_to([xj(3.4), 0, zn(82)])
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Hubungan")
            sinema.judul_pembuka(self, "Hubungan Dua Variabel, Bagian 2", lama=3.2, y=2.6)
            b.catat(3.2)
            b.tunggu_kata("Kalau")
            taruh("sumbu datar", sumbu_dekat_x)
            taruh("sumbu tegak", sumbu_dekat_y)
            taruh("titik", titik)
            b.main(FadeIn(sumbu_dekat), LaggedStartMap(FadeIn, titik, lag_ratio=0.08), run_time=0.7)
            b.tunggu_kata("menarik")
            taruh("tebakan", tebakan)
            b.main(LaggedStartMap(ShowCreation, tebakan, lag_ratio=0.3), run_time=1.5)
            b.tunggu_kata("siapa")
            taruh("tanya", tanya, tulisan=True)
            b.main(FadeIn(tanya, shift=0.2 * OUT), run_time=0.5)
        periksa()

        # ==================================================================
        # ingat: jarak ke pusat (garis y = 70), jumlahnya nol, dikuadratkan.
        # ==================================================================
        garis_rata = DashedLine([xj(1.2), 0, zn(MEAN_Y)], [xj(11.8), 0, zn(MEAN_Y)]).set_stroke(SOROT, 2.2)
        l_rata = tegak(rumus(r"\bar{y} = 70", 20, SOROT)).move_to([xj(12.3), 0, zn(MEAN_Y) + 0.05])
        bilah0 = bilah_residu(0.0)
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Ukuran")
            b.main(FadeOut(tanya), FadeOut(tebakan), run_time=0.5)
            buang("tanya", "tebakan")
            b.tunggu_kata("jarak ke")
            taruh("garis rata", garis_rata)
            taruh("label rata", l_rata, tulisan=True)
            b.main(ShowCreation(garis_rata), FadeIn(l_rata), run_time=0.7)
            taruh("bilah nol", bilah0)
            b.main(LaggedStartMap(GrowFromCenter, bilah0, lag_ratio=0.1), run_time=1.2)
            b.tunggu_kata("jumlahnya nol")
            b.main(*[Indicate(m, scale_factor=1.3, color=m.get_color()) for m in bilah0], run_time=0.9)
            b.tunggu_kata("dikuadratkan")
            self.sorot_pita(b, *bilah0, lama=1.2, lebih=0.14)
            b.tunggu_kata("Cara yang")
            b.main(FadeOut(bilah0), FadeOut(garis_rata), FadeOut(l_rata), run_time=0.6)
            buang("bilah nol", "garis rata", "label rata")
        periksa()

        # ==================================================================
        # banyak: tiga garis berbeda, ketiganya masuk akal; butuh ukuran.
        # ==================================================================
        tebakan = VGroup(garis_dari(2.5), garis_dari(3.2), garis_dari(3.9))
        with sinema.babak(self, "banyak", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sepuluh")
            HUD["identitas"] = sinema.identitas(self, "10 siswa", "jam belajar, nilai ujian")
            HUD["identitas"].set_opacity(0)
            b.main(HUD["identitas"].animate.set_opacity(1), run_time=0.6)
            b.tunggu_kata("Tiga orang")
            taruh("tebakan", tebakan)
            b.main(LaggedStartMap(ShowCreation, tebakan, lag_ratio=0.3), run_time=1.8)
            b.tunggu_kata("masuk akal")
            b.main(LaggedStartMap(lambda m, **kw: Indicate(m, scale_factor=1.02, color=SOROT, **kw),
                                  tebakan, lag_ratio=0.2), run_time=1.2)
            b.tunggu_kata("mengukur")
            b.main(FadeOut(tebakan[0]), FadeOut(tebakan[2]), run_time=0.8)
        periksa()

        # ==================================================================
        # residu: jarak TEGAK, bukan tegak lurus.
        # ==================================================================
        garis_uji = tebakan[1]
        j0, v0 = DATA[8]
        bilah_contoh = bilah_residu(3.2)[8].copy()
        l_tegak = tegak(sinema.label("tegak", 20, AKSEN)).move_to([xj(j0), 0, zn(v0) - 0.36])
        _p = np.array([xj(j0), zn(v0)])
        _q = np.array([xj(0.0), zn(A)])
        _d = np.array([xj(1.0) - xj(0.0), zn(A + B) - zn(A)])
        _kaki = _q + _d * float(np.dot(_p - _q, _d) / np.dot(_d, _d))
        ruas_serong = Line([_p[0], 0, _p[1]], [_kaki[0], 0, _kaki[1]]).set_stroke(REDUP, 2.6)

        with sinema.babak(self, "residu", DURASI, kata=KATA) as b:
            b.tunggu_kata("Untuk")
            buang("sumbu datar", "sumbu tegak", "tebakan")
            taruh("garis", garis_uji)
            b.main(kamera.dekati(frame, [0.35, 0, 0.59], 4.8), run_time=1.4)
            b.main(Indicate(titik[8], scale_factor=2.2, color=SOROT), run_time=0.6)
            b.tunggu_kata("jarak tegak")
            taruh("bilah contoh", bilah_contoh)
            taruh("label tegak", l_tegak, tulisan=True)
            b.main(GrowFromCenter(bilah_contoh), FadeIn(l_tegak), run_time=1.0)
            b.tunggu_kata("Bukan")
            taruh("ruas serong", ruas_serong)
            b.main(ShowCreation(ruas_serong), run_time=0.8)
            b.tunggu_kata("sebab")
            b.main(FadeOut(ruas_serong), run_time=0.6)
            buang("ruas serong")
            b.tunggu_kata("nilai y")
            b.main(Indicate(bilah_contoh, scale_factor=1.3, color=SOROT), FadeOut(l_tegak), run_time=0.9)
            buang("label tegak")
        periksa()

        # ==================================================================
        # tanda: kesepuluh residu, warnanya menyebut tandanya.
        # ==================================================================
        bilah = bilah_residu(3.2)
        biru = [bilah[i] for i, (j, v) in enumerate(DATA) if v >= MEAN_Y + 3.2 * (j - MEAN_X)]
        bata = [bilah[i] for i, (j, v) in enumerate(DATA) if v < MEAN_Y + 3.2 * (j - MEAN_X)]
        with sinema.babak(self, "tanda", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jarak")
            b.main(FadeOut(bilah_contoh), run_time=0.3)
            buang("bilah contoh")
            taruh("bilah", bilah)
            b.main(LaggedStartMap(GrowFromCenter, bilah, lag_ratio=0.12), run_time=1.8)
            b.tunggu_kata("Titik di")
            b.main(*[Indicate(m, scale_factor=1.35, color=SOROT) for m in biru], run_time=1.0)
            b.tunggu_kata("titik di", ke=2)
            b.main(*[Indicate(m, scale_factor=1.35, color=SOROT) for m in bata], run_time=1.0)
        periksa()

        # ==================================================================
        # nol: menjumlah gagal.
        # ==================================================================
        with sinema.babak(self, "nol", DURASI, kata=KATA) as b:
            b.tunggu_kata("Menjumlah")
            sinema.lahir_rumus(self, r"\sum r = 0", bilah[4], papan, b=b, warna=REDUP, ukuran_lahir=48,
                               tahan=0.5, run_time=1.0)
            b.tunggu_kata("saling")
            b.main(*[Indicate(m, scale_factor=1.35, color=SOROT) for m in biru], run_time=0.6)
            b.main(*[Indicate(m, scale_factor=1.35, color=SOROT) for m in bata], run_time=0.6)
        periksa()

        # ==================================================================
        # kuadrat: dikuadratkan lalu dijumlahkan. Satu angka.
        # ==================================================================
        with sinema.babak(self, "kuadrat", DURASI, kata=KATA) as b:
            b.tunggu_kata("dikuadratkan")
            sinema.ganti_rumus(self, papan.utama, r"\sum r^2", b=b, run_time=1.0, papan=papan)
            b.tunggu_kata("dijumlahkan")
            b.main(LaggedStartMap(lambda m, **kw: Indicate(m, scale_factor=1.3, color=SOROT, **kw),
                                  bilah, lag_ratio=0.09), run_time=1.5)
            b.tunggu_kata("satu angka")
            sinema.ganti_rumus(self, papan.utama, r"\sum r^2 = 27{,}2", b=b, run_time=1.0, papan=papan)
            b.tunggu_kata("dua puluh")
            b.main(Indicate(papan.utama, scale_factor=1.0, color=SOROT), run_time=0.9)
        periksa()

        # ==================================================================
        # kecilkan: garisnya diputar mengelilingi pusat data; angkanya turun lalu naik.
        # ==================================================================
        with sinema.babak(self, "kecilkan", DURASI, kata=KATA) as b:
            b.tunggu_kata("putar")
            taruh("sumbu datar", sumbu_dekat_x)
            taruh("sumbu tegak", sumbu_dekat_y)
            b.main(kamera.dekati(frame, [0, 0, Z_KAMERA], TINGGI_BINGKAI), run_time=1.2)
            for frasa, miring in (("seratus", 2.0), ("lima puluh", 2.6), ("dua puluh", 3.2), ("Diputar", 3.8)):
                b.tunggu_kata(frasa)
                b.main(Transform(garis_uji, garis_dari(miring)), Transform(bilah, bilah_residu(miring)), run_time=0.9)
                sinema.ganti_rumus(self, papan.utama, rf"\sum r^2 = {koma(JKR[miring], 1)}", b=b, run_time=0.6, papan=papan)
        periksa()

        # ==================================================================
        # rumus: kembali ke 3,2, kuadrat terkecil, persamaannya.
        # ==================================================================
        garis_terbaik = garis_dari(B, A, warna=SOROT, tebal=3.4)
        with sinema.babak(self, "rumus", DURASI, kata=KATA) as b:
            b.tunggu_kata("satu garis")
            b.main(Transform(garis_uji, garis_terbaik), Transform(bilah, bilah_residu(3.2)), run_time=1.2)
            sinema.ganti_rumus(self, papan.utama, r"\sum r^2 = 27{,}2", b=b, run_time=0.6, papan=papan)
            b.tunggu_kata("cuma satu")
            b.main(Indicate(garis_uji, scale_factor=1.02, color=SOROT), run_time=0.9)
            b.tunggu_kata("metode")
            b.main(papan.sorot(), run_time=1.0)
            b.tunggu_kata("Garis terbaiknya")
            baris_y = papan.baris(r"\hat{y} = 49{,}2 + 3{,}2x", SOROT, b=b)
            b.main(FadeOut(bilah), run_time=0.6)
            buang("bilah")
        periksa()

        # ==================================================================
        # hitung: dari mana 3,2; lima jumlah di dunia, b dan a di panel baru.
        # ==================================================================
        jumlah1 = tegak(rumus(r"n = 10,\quad \sum x = 65,\quad \sum y = 700", 21, TINTA)).move_to([-2.85, 0, 1.75])
        jumlah2 = tegak(rumus(r"\sum xy = 4814,\quad \sum x^2 = 505", 21, TINTA)).move_to([-2.85, 0, 1.30])
        with sinema.babak(self, "hitung", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dari lima")
            b.main(FadeOut(papan.semua()), run_time=0.5)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, tanpa_utama=True)
            b.tunggu_kata("n sepuluh")
            taruh("jumlah 1", jumlah1, tulisan=True)
            b.main(FadeIn(jumlah1), run_time=0.6)
            b.tunggu_kata("jumlah x y")
            taruh("jumlah 2", jumlah2, tulisan=True)
            b.main(FadeIn(jumlah2), run_time=0.6)
            b.tunggu_kata("Kemiringan")
            baris_b = papan.baris(r"b = \frac{n\sum xy - \sum x \sum y}{n\sum x^2 - (\sum x)^2}", SOROT, b=b)
            b.tunggu_kata("dua ribu")
            baris_b = sinema.ganti_rumus(self, baris_b, r"b = \frac{2640}{825} = 3{,}2", b=b, run_time=0.9, papan=papan)
            b.tunggu_kata("Lalu")
            baris_a = papan.baris(r"a = \bar{y} - b\,\bar{x}", SOROT, b=b)
            b.tunggu_kata("tujuh puluh")
            baris_a = sinema.ganti_rumus(self, baris_a, r"a = 70 - 20{,}8 = 49{,}2", b=b, run_time=0.9, papan=papan)
        periksa()

        # ==================================================================
        # arti: satu jam ke kanan, tiga koma dua ke atas.
        # ==================================================================
        j_a = 7
        tangga_datar = Line([xj(j_a), 0, zn(A + B * j_a)], [xj(j_a + 1), 0, zn(A + B * j_a)]).set_stroke(TINTA, 2.6)
        tangga_naik = Line([xj(j_a + 1), 0, zn(A + B * j_a)], [xj(j_a + 1), 0, zn(A + B * (j_a + 1))]).set_stroke(TINTA, 2.6)
        l_satu = tegak(sinema.label("1 jam", 19, TINTA)).move_to([xj(j_a + 0.5), 0, zn(A + B * j_a) - 0.30])
        l_naik = tegak(rumus("3{,}2", 19, TINTA)).move_to([xj(j_a + 1) + 0.44, 0, zn(A + B * (j_a + 0.5))])
        with sinema.babak(self, "arti", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kemiringan")
            b.main(FadeOut(jumlah1), FadeOut(jumlah2), run_time=0.5)
            buang("jumlah 1", "jumlah 2")
            b.tunggu_kata("tiap tambahan")
            taruh("tangga", VGroup(tangga_datar, tangga_naik))
            taruh("label satu jam", l_satu, tulisan=True)
            b.main(ShowCreation(tangga_datar), FadeIn(l_satu), run_time=0.8)
            b.tunggu_kata("naik")
            taruh("label naik", l_naik, tulisan=True)
            b.main(ShowCreation(tangga_naik), FadeIn(l_naik), run_time=0.8)
            b.tunggu_kata("poin")
            b.main(Indicate(VGroup(tangga_datar, tangga_naik), scale_factor=1.2, color=SOROT), run_time=0.9)
        periksa()

        # ==================================================================
        # jauh: penggaris ditarik sampai 190; datanya menciut jadi gerombolan.
        # ==================================================================
        garis_jauh = garis_dari(B, A, dari=0.0, sampai=JAM_JAUH, warna=SOROT, tebal=3.4, nama="jauh")
        langit = DashedLine([xj(-1.0, "jauh"), 0, zn(BATAS_NILAI, "jauh")], [xj(43.0, "jauh"), 0, zn(BATAS_NILAI, "jauh")])
        langit.set_stroke(AKSEN, 2.4)
        l_langit = tegak(sinema.label("batas 100", 19, AKSEN)).move_to([xj(30.0, "jauh"), 0, zn(BATAS_NILAI, "jauh") + 0.30])
        l_ramal = tegak(rumus("177{,}2", 20, AKSEN)).move_to([xj(38.0, "jauh"), 0, zn(A + B * 38.0, "jauh") - 0.34])
        with sinema.babak(self, "jauh", DURASI, kata=KATA) as b:
            b.tunggu_kata("Diteruskan")
            b.main(FadeOut(VGroup(tangga_datar, tangga_naik)), FadeOut(l_satu), FadeOut(l_naik), run_time=0.4)
            buang("tangga", "label satu jam", "label naik")
            keadaan["nama"] = "jauh"
            taruh("sumbu datar", sumbu_jauh_x)
            taruh("sumbu tegak", sumbu_jauh_y)
            taruh("titik", titik_jauh)
            b.main(FadeOut(sumbu_dekat), FadeIn(sumbu_jauh),
                   *[Transform(a, c) for a, c in zip(titik, titik_jauh)],
                   Transform(garis_uji, garis_dari(B, A, 0.0, 12.0, SOROT, 3.4, "jauh")), run_time=2.0)
            b.tunggu_kata("meramalkan")
            taruh("garis jauh", garis_jauh)
            b.main(Transform(garis_uji, garis_jauh), run_time=1.4)
            b.tunggu_kata("koma dua")
            taruh("angka ramalan", l_ramal, tulisan=True)
            b.main(FadeIn(l_ramal), run_time=0.5)
            b.tunggu_kata("Nilai ujian")
            taruh("langit", VGroup(langit, l_langit))
            TULISAN["label langit"] = l_langit
            b.main(ShowCreation(langit), FadeIn(l_langit), run_time=1.0)
            b.tunggu_kata("garisnya tidak")
            b.main(Indicate(l_ramal, scale_factor=1.4, color=AKSEN), run_time=0.9)
        periksa()

        # ==================================================================
        # tutup: jumlah kuadrat residu terkecil; ramalan hanya di sekitar data.
        # ==================================================================
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("jumlah kuadrat")
            papan.baris(r"\sum r^2 = 27{,}2\ \text{terkecil}", SOROT, b=b)
            b.tunggu_kata("di sekitar")
            self.sorot_pita(b, titik_jauh, lama=1.4, lebih=0.4)
        periksa()

        # ==================================================================
        # lanjut: r = 0,98, apakah sebab-akibat?
        # ==================================================================
        judul_lanjut = teks("Hubungan Dua Variabel, Bagian 3", 30, SOROT).move_to([0, 2.6, 0]).fix_in_frame()
        l_r = tegak(rumus("r = 0{,}98", 44, SOROT)).move_to([0, 0, 0.9])
        l_sebab = tegak(sinema.label("sebab-akibat?", 30, AKSEN)).move_to([0, 0, 0.0])
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Hubungan")
            b.main(FadeOut(VGroup(sumbu_jauh, titik, garis_uji, langit, l_langit, l_ramal)),
                   FadeOut(papan.semua()), FadeOut(HUD["identitas"]), FadeIn(judul_lanjut, shift=0.2 * UP), run_time=0.7)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, tanpa_utama=True)
            HUD["identitas"] = None
            for n in list(DUNIA):
                buang(n)
            self.hud_tambah(judul_lanjut)
            HUD["judul lanjut"] = judul_lanjut
            b.tunggu_kata("namanya")
            taruh("r", l_r, tulisan=True)
            b.main(FadeIn(l_r, scale=1.3), run_time=0.7)
            b.tunggu_kata("menyebabkan")
            taruh("sebab", l_sebab, tulisan=True)
            b.main(FadeIn(l_sebab, shift=0.2 * OUT), run_time=0.6)
        periksa()

        sinema.laporkan_pemicu(self)
