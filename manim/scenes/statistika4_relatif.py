"""Materi 04 Statistika: frekuensi relatif, membandingkan kelompok beda ukuran (ManimGL).

Naskah: manim/narasi/statistika4-relatif.json (10 segmen, 107,8 detik)

GAGASAN POKOK. Halaman menyandingkan dua hitungan dan bilang kesimpulannya
berbalik. Yang tidak bisa dilakukan halaman: memperlihatkan PERISTIWA
berbaliknya. Di video ini dua batang berdiri setinggi jumlah siswanya, lalu
keduanya DIRATAKAN jadi sama tinggi, dan bagian berwarna yang tadi kalah
sekarang menang. Batangnya tidak pernah dibuat ulang: batang yang sama
diperas, jadi jelas datanya tidak berubah.

Angka halaman Tahap 4:
    Kelas A  11 dari 25 siswa bernilai 80 ke atas  ->  0,44   yaitu 44%
    Kelas B  13 dari 40 siswa bernilai 80 ke atas  ->  0,325  yaitu 32,5%
Mentahnya 13 lebih banyak daripada 11, tetapi bagiannya justru terbalik.

TATA LETAK (standar video versi 2):
    kiri atas  identitas benda, menetap
    kanan atas papan rumus, berubah lewat morph
    kaki layar milik subtitle, dijaga qc
    dalam gambar label maksimal dua kata

SATU WARNA SATU MAKNA DI DALAM VIDEO INI:
    AKSEN2 biru = Kelas A            AKSEN bata = Kelas B
    SOROT ungu  = bagian yang menang setelah takarannya disamakan
    REDUP       = sisa siswa yang nilainya di bawah 80

Kamera phi 90, tegak lurus: yang dibandingkan TINGGI batang.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "statistika4-relatif"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

N_A, TINGGI_A = 25, 11        # Kelas A: 11 dari 25 bernilai 80 ke atas
N_B, TINGGI_B = 40, 13        # Kelas B: 13 dari 40
BAGIAN_A = TINGGI_A / N_A     # 0,44
BAGIAN_B = TINGGI_B / N_B     # 0,325

SKALA_SISWA = 0.050           # satu siswa = 0,050 satuan tinggi (fase mentah)
TINGGI_RATA = 2.00            # tinggi seragam sesudah takarannya disamakan
LEBAR_BATANG = 1.30
X_A, X_B = -1.85, 1.85
Z_DASAR = -1.10
Z_KAMERA = 0.50
TINGGI_BINGKAI = 6.4


def tegak(mob):
    """Berdirikan benda datar di bidang xz supaya menghadap kamera."""
    return mob.rotate(90 * DEGREES, RIGHT)


def batang(x, tinggi, warna, isi):
    r = Rectangle(width=LEBAR_BATANG, height=max(tinggi, 0.01))
    r.set_fill(warna, isi).set_stroke(warna, 2.2)
    return tegak(r).move_to([x, 0, Z_DASAR + tinggi / 2])


class Relatif4(AdeganMatra):
    samples = 4                        # penghalus tepi; bawaan ManimGL 0

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        DUNIA, HUD, TULISAN = {}, {}, {}
        HUD["identitas"] = sinema.identitas(self, "Kelas A 25 siswa",
                                            "Kelas B 40 siswa")

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
            qc.periksa_adegan(self, {}, pasangan=pasangan, hud=hidup_h,
                              dunia=hidup_d, jaga_jalur_bawah=True)
            hidup_t = [k for k, v in TULISAN.items() if v is not None]
            for i, a in enumerate(hidup_t):
                for c in hidup_t[i + 1:]:
                    qc.tidak_bertindih(frame, TULISAN[a], TULISAN[c], a, c)

        alas = Line([-4.60, 0, Z_DASAR], [4.60, 0, Z_DASAR]).set_stroke(REDUP, 2.2)
        nama_a = tegak(sinema.label("Kelas A", 22, AKSEN2)).move_to([X_A, 0, Z_DASAR - 0.34])
        nama_b = tegak(sinema.label("Kelas B", 22, AKSEN)).move_to([X_B, 0, Z_DASAR - 0.34])

        # Fase mentah: tinggi batang = banyak siswanya.
        seluruh_a = batang(X_A, N_A * SKALA_SISWA, REDUP, 0.28)
        seluruh_b = batang(X_B, N_B * SKALA_SISWA, REDUP, 0.28)
        bagian_a = batang(X_A, TINGGI_A * SKALA_SISWA, AKSEN2, 0.85)
        bagian_b = batang(X_B, TINGGI_B * SKALA_SISWA, AKSEN, 0.85)

        def di_atas(mob, isi, ukuran=20, warna=TINTA, jarak=0.24):
            t = tegak(rumus(isi, ukuran, warna))
            t.move_to(mob.get_center() + np.array([0.0, 0.0, mob.get_depth() / 2 + jarak]))
            return t

        l_na = di_atas(seluruh_a, "25", 20, REDUP)
        l_nb = di_atas(seluruh_b, "40", 20, REDUP)
        l_ta = di_atas(bagian_a, "11", 21, AKSEN2, 0.18)
        l_tb = di_atas(bagian_b, "13", 21, AKSEN, 0.18)

        # ==================================================================
        # Babak 1 `buka`: dua kelas, tinggi batangnya = banyak siswanya.
        # ==================================================================
        kamera.pasang_awal(frame, theta=0, phi=90, pusat=(0, 0, Z_KAMERA), tinggi=TINGGI_BINGKAI)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 04: Frekuensi relatif", lama=3.2, y=2.6)
            b.catat(3.2)
            taruh("alas", alas)
            taruh("nama A", nama_a, tulisan=True)
            taruh("nama B", nama_b, tulisan=True)
            b.main(ShowCreation(alas), FadeIn(nama_a), FadeIn(nama_b), run_time=1.4)
            taruh("seluruh A", seluruh_a)
            taruh("seluruh B", seluruh_b)
            b.main(GrowFromCenter(seluruh_a), GrowFromCenter(seluruh_b), run_time=1.8)
            taruh("jumlah A", l_na, tulisan=True)
            taruh("jumlah B", l_nb, tulisan=True)
            b.main(FadeIn(l_na), FadeIn(l_nb), run_time=1.0)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 2 `tanya`: yang bernilai 80 ke atas diwarnai.
        # ==================================================================
        with sinema.babak(self, "tanya", DURASI) as b:
            taruh("bagian A", bagian_a)
            b.main(GrowFromCenter(bagian_a), run_time=1.6)
            taruh("bagian B", bagian_b)
            b.main(GrowFromCenter(bagian_b), run_time=1.6)
            taruh("tinggi A", l_ta, tulisan=True)
            taruh("tinggi B", l_tb, tulisan=True)
            b.main(FadeIn(l_ta), FadeIn(l_tb), run_time=1.2)
            b.main(Indicate(bagian_a, scale_factor=1.05, color=AKSEN2),
                   Indicate(bagian_b, scale_factor=1.05, color=AKSEN), run_time=1.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 3 `mentah`: yang mentah menjawab Kelas B menang.
        # ==================================================================
        garis_banding = DashedLine([X_A - 1.0, 0, Z_DASAR + TINGGI_B * SKALA_SISWA],
                                   [X_B + 1.0, 0, Z_DASAR + TINGGI_B * SKALA_SISWA])
        garis_banding.set_stroke(AKSEN, 2.2)
        l_menang = tegak(sinema.label("lebih banyak", 20, AKSEN))
        l_menang.move_to([X_B, 0, Z_DASAR + TINGGI_B * SKALA_SISWA + 0.62])

        with sinema.babak(self, "mentah", DURASI) as b:
            taruh("garis banding", garis_banding)
            b.main(ShowCreation(garis_banding), run_time=1.6)
            taruh("label menang", l_menang, tulisan=True)
            b.main(FadeIn(l_menang), run_time=1.0)
            sinema.lahir_rumus(self, r"13 > 11", bagian_b, papan, b=b, warna=AKSEN)
            b.main(Indicate(bagian_b, scale_factor=1.06, color=AKSEN), run_time=1.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 4 `curiga`: Kelas B juga punya lebih banyak siswa, titik.
        # ==================================================================
        with sinema.babak(self, "curiga", DURASI) as b:
            b.main(FadeOut(garis_banding), FadeOut(l_menang), run_time=0.8)
            buang("garis banding", "label menang")
            b.main(Indicate(seluruh_a, scale_factor=1.04, color=REDUP), run_time=1.4)
            b.main(Indicate(seluruh_b, scale_factor=1.04, color=REDUP), run_time=1.4)
            b.main(Indicate(l_na, scale_factor=1.4, color=REDUP),
                   Indicate(l_nb, scale_factor=1.4, color=REDUP), run_time=1.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 5 `bagi`: dibagi jumlah siswanya sendiri.
        # ==================================================================
        with sinema.babak(self, "bagi", DURASI) as b:
            sinema.ganti_rumus(self, papan.utama, r"11 : 25 = 0{,}44", b=b,
                               run_time=1.6, papan=papan)
            b.main(Indicate(VGroup(bagian_a, seluruh_a), scale_factor=1.04, color=AKSEN2),
                   run_time=1.6)
            papan.baris(r"13 : 40 = 0{,}325", AKSEN)
            b.catat(1.0)
            b.main(Indicate(VGroup(bagian_b, seluruh_b), scale_factor=1.04, color=AKSEN),
                   run_time=1.6)
            b.main(Indicate(papan.semua(), scale_factor=1.1, color=SOROT), run_time=1.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 6 `balik`: kedua batang DIRATAKAN, dan kesimpulannya berbalik.
        # ==================================================================
        rata_a = batang(X_A, TINGGI_RATA, REDUP, 0.28)
        rata_b = batang(X_B, TINGGI_RATA, REDUP, 0.28)
        isi_a = batang(X_A, BAGIAN_A * TINGGI_RATA, SOROT, 0.85)
        isi_b = batang(X_B, BAGIAN_B * TINGGI_RATA, AKSEN, 0.85)
        l_pa = di_atas(isi_a, r"44\%", 21, SOROT, 0.18)
        l_pb = di_atas(isi_b, r"32{,}5\%", 21, AKSEN, 0.18)

        with sinema.babak(self, "balik", DURASI) as b:
            b.main(FadeOut(l_na), FadeOut(l_nb), FadeOut(l_ta), FadeOut(l_tb), run_time=0.8)
            buang("jumlah A", "jumlah B", "tinggi A", "tinggi B")
            taruh("seluruh A", rata_a)
            taruh("seluruh B", rata_b)
            taruh("bagian A", isi_a)
            taruh("bagian B", isi_b)
            b.main(Transform(seluruh_a, rata_a), Transform(seluruh_b, rata_b),
                   Transform(bagian_a, isi_a), Transform(bagian_b, isi_b), run_time=3.4)
            taruh("persen A", l_pa, tulisan=True)
            taruh("persen B", l_pb, tulisan=True)
            b.main(FadeIn(l_pa), FadeIn(l_pb), run_time=1.2)
            b.main(Indicate(bagian_a, scale_factor=1.06, color=SOROT), run_time=1.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 7 `dua`: dua hitungan, dua pertanyaan yang berbeda.
        # ==================================================================
        l_berapa = tegak(sinema.label("berapa orang", 19, REDUP))
        l_berapa.move_to([X_A, 0, Z_DASAR + TINGGI_RATA + 0.46])
        l_bagian = tegak(sinema.label("seberapa besar", 19, SOROT))
        l_bagian.move_to([X_B, 0, Z_DASAR + TINGGI_RATA + 0.46])

        with sinema.babak(self, "dua", DURASI) as b:
            taruh("label berapa", l_berapa, tulisan=True)
            b.main(FadeIn(l_berapa), run_time=1.2)
            taruh("label bagian", l_bagian, tulisan=True)
            b.main(FadeIn(l_bagian), run_time=1.2)
            b.main(Indicate(l_berapa, scale_factor=1.3, color=REDUP), run_time=1.4)
            b.main(Indicate(l_bagian, scale_factor=1.3, color=SOROT), run_time=1.4)
            b.main(FadeOut(l_berapa), FadeOut(l_bagian), run_time=1.0)
            buang("label berapa", "label bagian")
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 8 `nama`: namanya frekuensi relatif.
        # ==================================================================
        with sinema.babak(self, "nama", DURASI) as b:
            sinema.ganti_rumus(self, papan.utama,
                               r"f_{rel} = \frac{f}{n}", b=b, run_time=1.8, papan=papan)
            b.main(Indicate(papan.utama, scale_factor=1.2, color=SOROT), run_time=1.6)
            b.main(Indicate(VGroup(bagian_a, bagian_b), scale_factor=1.05, color=SOROT),
                   run_time=1.6)
            b.main(Indicate(VGroup(seluruh_a, seluruh_b), scale_factor=1.03, color=REDUP),
                   run_time=1.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 9 `sifat`: nilainya selalu antara 0 dan 1.
        # ==================================================================
        l_nol = tegak(rumus("0", 19, REDUP)).move_to([X_A - 1.02, 0, Z_DASAR])
        l_satu = tegak(rumus("1", 19, REDUP)).move_to([X_A - 1.02, 0, Z_DASAR + TINGGI_RATA])
        sisi = Line([X_A - 0.86, 0, Z_DASAR], [X_A - 0.86, 0, Z_DASAR + TINGGI_RATA])
        sisi.set_stroke(REDUP, 2.0)

        with sinema.babak(self, "sifat", DURASI) as b:
            taruh("sisi ukur", sisi)
            taruh("nol", l_nol, tulisan=True)
            taruh("satu", l_satu, tulisan=True)
            b.main(ShowCreation(sisi), run_time=1.2)
            b.main(FadeIn(l_nol), FadeIn(l_satu), run_time=1.0)
            b.main(Indicate(VGroup(l_nol, l_satu), scale_factor=1.4, color=REDUP), run_time=1.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 10 `tutup`: pertanyaan pertama bukan berapa, melainkan dari berapa.
        # ==================================================================
        l_dari = tegak(sinema.label("dari berapa", 21, SOROT))
        l_dari.move_to([0.0, 0, Z_DASAR + TINGGI_RATA + 0.46])

        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(sisi), FadeOut(l_nol), FadeOut(l_satu), run_time=0.8)
            buang("sisi ukur", "nol", "satu")
            taruh("label dari", l_dari, tulisan=True)
            b.main(FadeIn(l_dari), run_time=1.2)
            b.main(Indicate(VGroup(seluruh_a, seluruh_b), scale_factor=1.04, color=SOROT),
                   run_time=1.6)
            b.main(Indicate(l_dari, scale_factor=1.3, color=SOROT), run_time=1.6)
            b.jeda(1.4)
        periksa()
