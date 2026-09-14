"""Statistika Materi 04, Penyajian Data Bagian 4: frekuensi relatif.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (xz
tegak, 1:48) yang sudah disetujui ARYA. ISINYA SAMA: Kelas A 25 siswa dan
Kelas B 40 siswa; 11 lawan 13 siswa bernilai 80 ke atas; batang mentah
menjawab Kelas B menang; dibagi jumlahnya sendiri 0,44 lawan 0,325 dan
kesimpulannya berbalik; batang yang sama DIPERAS jadi sama tinggi (datanya
tidak pernah dibuat ulang); dua pertanyaan berbeda; nama frekuensi relatif;
nilainya 0 sampai 1 dan jumlahnya 1.

YANG BERBEDA: dua dimensi biasa; pembuka sub-bab plus Bagian 4 dengan
pertanyaan; segar-ingat persen dari Bagian 2 (8 dari 40 = 20%); cek jumlah
0,44 + 0,56 = 1 di Kelas A; bentuk umum f_rel = f : n lahir di dekat batang;
penutup menunjuk Ukuran Pemusatan dan Penyebaran Bagian 1; tiap kejadian
dipicu pada KATA; sorotan memakai kotak tembus pandang, bukan Indicate pada
benda yang warnanya sama.

SATU WARNA SATU MAKNA: biru = Kelas A, merah bata = Kelas B, abu = sisa
siswa yang nilainya di bawah 80, ungu = yang disorot.
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
KATA = sinema.JamKata(TOPIK)

N_A, TINGGI_A = 25, 11        # Kelas A: 11 dari 25 bernilai 80 ke atas
N_B, TINGGI_B = 40, 13        # Kelas B: 13 dari 40
BAGIAN_A = TINGGI_A / N_A     # 0,44
BAGIAN_B = TINGGI_B / N_B     # 0,325

SKALA_SISWA = 0.075           # satu siswa = 0,075 satuan tinggi (40 siswa = 3,0)
TINGGI_RATA = 3.0             # tinggi seragam sesudah takarannya disamakan
LEBAR_BATANG = 1.30
X_A, X_B = -1.9, 1.5
Y0 = -1.95                    # dasar batang (pita subtitle mulai di -2,55)


def batang(x, tinggi, warna, isi):
    r = Rectangle(width=LEBAR_BATANG, height=max(tinggi, 0.01))
    r.set_fill(warna, isi).set_stroke(warna, 2.2)
    return r.move_to([x, Y0 + tinggi / 2, 0])


def di_atas(mob, isi, ukuran=21, warna=TINTA, jarak=0.22):
    return rumus(isi, ukuran, warna).move_to(mob.get_top() + UP * jarak)


def hud(ident, papan, **lain):
    isi = {"identitas": ident} if ident is not None else {}
    p = papan.semua()
    if p is not None:
        isi["papan"] = p
    for k, v in lain.items():
        if v is not None:
            isi[k] = v
    return isi


class Relatif4(AdeganMatra):
    def sorot_kotak(self, b, *mobs, lama=1.0, warna=SOROT):
        """Kotak tembus pandang di atas batang: menyorot tanpa mengganti warnanya."""
        kotak = VGroup(*[Rectangle(width=m.get_width(), height=m.get_height())
                         .set_stroke(width=0).set_fill(warna, 0.35).move_to(m) for m in mobs])
        self.add(kotak)
        b.main(FadeIn(kotak), run_time=lama * 0.35)
        b.main(FadeOut(kotak), run_time=lama * 0.65)
        self.remove(kotak)

    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
        ident = None

        alas = Line([X_A - 1.3, Y0, 0], [X_B + 1.3, Y0, 0]).set_stroke(REDUP, 2.2)
        alas.latar = True
        nama_a = sinema.label("Kelas A", 22, AKSEN2).move_to([X_A, Y0 - 0.32, 0])
        nama_b = sinema.label("Kelas B", 22, AKSEN).move_to([X_B, Y0 - 0.32, 0])

        seluruh_a = batang(X_A, N_A * SKALA_SISWA, REDUP, 0.28)
        seluruh_b = batang(X_B, N_B * SKALA_SISWA, REDUP, 0.28)
        bagian_a = batang(X_A, TINGGI_A * SKALA_SISWA, AKSEN2, 0.85)
        bagian_b = batang(X_B, TINGGI_B * SKALA_SISWA, AKSEN, 0.85)
        l_na = di_atas(seluruh_a, "25", 21, REDUP)
        l_nb = di_atas(seluruh_b, "40", 21, REDUP)
        l_ta = di_atas(bagian_a, "11", 21, AKSEN2, 0.18)
        l_tb = di_atas(bagian_b, "13", 21, AKSEN, 0.18)

        # ============ buka: dua kelas, tinggi batang = banyak siswanya ==== #
        tanya = rumus(r"\text{nilai} \geq 80\ ?", 34, SOROT).move_to([-0.2, 2.2, 0])
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Penyajian")
            sinema.judul_pembuka(self, "Penyajian Data, Bagian 4", lama=2.8, y=1.6)  # irama Bian (14 Sep 2026)
            b.catat(2.8)
            b.tunggu_kata("Kelas A")
            b.main(ShowCreation(alas), FadeIn(nama_a), GrowFromEdge(seluruh_a, DOWN), run_time=0.9)
            b.tunggu_kata("siswa")
            b.main(FadeIn(l_na), run_time=0.4)
            b.tunggu_kata("Kelas B")
            b.main(FadeIn(nama_b), GrowFromEdge(seluruh_b, DOWN), run_time=0.9)
            b.tunggu_kata("siswa", ke=2)
            b.main(FadeIn(l_nb), run_time=0.4)
            b.tunggu_kata("Kelas mana")
            b.main(FadeIn(tanya, shift=UP * 0.2), run_time=0.7)
            b.tunggu_kata("delapan puluh")
            b.main(Indicate(tanya, color=SOROT, scale_factor=1.15), run_time=0.8)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"alas": alas, "seluruh A": seluruh_a, "seluruh B": seluruh_b},
                          tulisan={"nama A": nama_a, "nama B": nama_b, "25": l_na, "40": l_nb, "tanya": tanya})

        # ============ ingat: persen dari Bagian 2 ========================= #
        ingat_label = teks("Penyajian Data, Bagian 2", 26, REDUP).move_to([-0.2, 2.9, 0])
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Penyajian")
            b.main(FadeOut(tanya), FadeIn(ingat_label, shift=UP * 0.2), run_time=0.6)
            b.tunggu_kata("delapan dari")
            papan.baris(r"8 : 40 = 0{,}2 = 20\%", AKSEN, b=b)
            b.tunggu_kata("Hari ini")
            ident = sinema.identitas(self, "Kelas A 25 siswa", "Kelas B 40 siswa", alas=True)
            ident.set_opacity(0)
            b.main(FadeOut(ingat_label), FadeOut(papan.semua()), ident.animate.set_opacity(1), run_time=0.6)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
            b.tunggu_kata("dua kelompok")
            b.main(Indicate(nama_a, color=SOROT), Indicate(nama_b, color=SOROT), run_time=0.8)
            b.tunggu_kata("berbeda")
            b.main(Indicate(l_na, color=SOROT, scale_factor=1.4), Indicate(l_nb, color=SOROT, scale_factor=1.4), run_time=0.8)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"alas": alas, "seluruh A": seluruh_a, "seluruh B": seluruh_b},
                          tulisan={"nama A": nama_a, "nama B": nama_b, "25": l_na, "40": l_nb})

        # ============ tanya: yang bernilai 80 ke atas diwarnai ============ #
        with sinema.babak(self, "tanya", DURASI, kata=KATA) as b:
            b.tunggu_kata("sebelas")
            b.main(GrowFromEdge(bagian_a, DOWN), run_time=0.8)
            b.tunggu_kata("delapan puluh")
            b.main(FadeIn(l_ta, scale=1.3), run_time=0.4)
            b.tunggu_kata("tiga belas")
            b.main(GrowFromEdge(bagian_b, DOWN), run_time=0.7)
            b.main(FadeIn(l_tb, scale=1.3), run_time=0.4)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan),
                          dunia={"alas": alas, "seluruh A": seluruh_a, "seluruh B": seluruh_b, "bagian A": bagian_a, "bagian B": bagian_b},
                          tulisan={"nama A": nama_a, "nama B": nama_b, "25": l_na, "40": l_nb, "11": l_ta, "13": l_tb})

        # ============ mentah: 13 lebih tinggi daripada 11 ================= #
        y_b = Y0 + TINGGI_B * SKALA_SISWA
        garis_banding = DashedLine([X_A - 0.9, y_b, 0], [X_B + 0.9, y_b, 0]).set_stroke(AKSEN, 2.2)
        l_menang = sinema.label("lebih banyak", 20, AKSEN).move_to([X_B + 1.35, y_b + 0.28, 0])
        with sinema.babak(self, "mentah", DURASI, kata=KATA) as b:
            b.tunggu_kata("batang")
            self.sorot_kotak(b, bagian_a, bagian_b, lama=1.0)
            b.tunggu_kata("Tiga belas")
            b.main(ShowCreation(garis_banding), run_time=0.8)
            b.tunggu_kata("jadi")
            b.main(FadeIn(l_menang), run_time=0.5)
            b.tunggu_kata("menang")
            baris_mentah = sinema.lahir_rumus(self, r"13 > 11", bagian_b, papan, b=b, warna=AKSEN,
                                              sebagai_utama=False, ukuran_lahir=46, tahan=0.4,
                                              run_time=1.0, geser=UP * 1.6)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan),
                          dunia={"alas": alas, "seluruh A": seluruh_a, "seluruh B": seluruh_b, "bagian A": bagian_a,
                                 "bagian B": bagian_b, "garis banding": garis_banding},
                          tulisan={"nama A": nama_a, "nama B": nama_b, "25": l_na, "40": l_nb, "11": l_ta, "13": l_tb,
                                   "lebih banyak": l_menang})

        # ============ curiga: Kelas B juga punya lebih banyak siswa ======== #
        with sinema.babak(self, "curiga", DURASI, kata=KATA) as b:
            b.tunggu_kata("belum masuk")
            b.main(FadeOut(garis_banding), FadeOut(l_menang), run_time=0.6)
            b.tunggu_kata("lebih banyak siswa yang")
            self.sorot_kotak(b, bagian_b, lama=1.0)
            b.tunggu_kata("juga punya")
            self.sorot_kotak(b, seluruh_b, lama=1.2)
            b.tunggu_kata("titik")
            b.main(Indicate(l_nb, color=SOROT, scale_factor=1.5), run_time=0.8)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan),
                          dunia={"alas": alas, "seluruh A": seluruh_a, "seluruh B": seluruh_b, "bagian A": bagian_a, "bagian B": bagian_b},
                          tulisan={"nama A": nama_a, "nama B": nama_b, "25": l_na, "40": l_nb, "11": l_ta, "13": l_tb})

        # ============ bagi: dibagi jumlah siswanya sendiri ================ #
        with sinema.babak(self, "bagi", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sebelas dibagi")
            baris_a = papan.baris(r"11 : 25 = 0{,}44", AKSEN2, b=b)
            b.tunggu_kata("nol koma")
            self.sorot_kotak(b, seluruh_a, lama=1.0)
            b.tunggu_kata("Tiga belas dibagi")
            baris_b = papan.baris(r"13 : 40 = 0{,}325", AKSEN, b=b)
            b.tunggu_kata("nol koma", ke=2)
            self.sorot_kotak(b, seluruh_b, lama=1.0)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan),
                          dunia={"alas": alas, "seluruh A": seluruh_a, "seluruh B": seluruh_b, "bagian A": bagian_a, "bagian B": bagian_b},
                          tulisan={"nama A": nama_a, "nama B": nama_b, "25": l_na, "40": l_nb, "11": l_ta, "13": l_tb})

        # ============ balik: batang yang sama DIPERAS jadi sama tinggi ==== #
        rata_a = batang(X_A, TINGGI_RATA, REDUP, 0.28)
        rata_b = batang(X_B, TINGGI_RATA, REDUP, 0.28)
        isi_a = batang(X_A, BAGIAN_A * TINGGI_RATA, AKSEN2, 0.85)
        isi_b = batang(X_B, BAGIAN_B * TINGGI_RATA, AKSEN, 0.85)
        l_pa = di_atas(isi_a, r"44\%", 22, AKSEN2, 0.18)
        l_pb = di_atas(isi_b, r"32{,}5\%", 22, AKSEN, 0.18)
        with sinema.babak(self, "balik", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dan")
            b.main(FadeOut(l_na), FadeOut(l_nb), FadeOut(l_ta), FadeOut(l_tb), run_time=0.4)
            b.tunggu_kata("berbalik")
            b.main(ReplacementTransform(seluruh_a, rata_a), ReplacementTransform(seluruh_b, rata_b),
                   ReplacementTransform(bagian_a, isi_a), ReplacementTransform(bagian_b, isi_b), run_time=1.4)
            b.tunggu_kata("Empat puluh empat")
            b.main(FadeIn(l_pa, scale=1.3), run_time=0.4)
            b.tunggu_kata("tiga puluh dua")
            b.main(FadeIn(l_pb, scale=1.3), run_time=0.4)
            b.tunggu_kata("hampir separuh")
            self.sorot_kotak(b, isi_a, lama=1.2)
            b.tunggu_kata("sepertiga")
            self.sorot_kotak(b, isi_b, lama=1.2)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan),
                          dunia={"alas": alas, "rata A": rata_a, "rata B": rata_b, "isi A": isi_a, "isi B": isi_b},
                          tulisan={"nama A": nama_a, "nama B": nama_b, "44": l_pa, "32,5": l_pb})

        # ============ dua: dua hitungan, dua pertanyaan =================== #
        l_berapa = sinema.label("berapa orang", 20, REDUP).next_to(baris_mentah, LEFT, buff=0.35).fix_in_frame()
        l_bagian = sinema.label("seberapa besar", 20, SOROT).next_to(VGroup(baris_a, baris_b), LEFT, buff=0.35).fix_in_frame()
        with sinema.babak(self, "dua", DURASI, kata=KATA) as b:
            b.tunggu_kata("sama-sama")
            b.main(papan.sorot(), run_time=1.0)
            b.tunggu_kata("Yang pertama")
            self.hud_tambah(l_berapa)
            b.main(FadeIn(l_berapa, shift=LEFT * 0.2), Indicate(baris_mentah, color=SOROT, scale_factor=1.0), run_time=0.8)
            b.tunggu_kata("yang kedua")
            self.hud_tambah(l_bagian)
            b.main(FadeIn(l_bagian, shift=LEFT * 0.2), Indicate(VGroup(baris_a, baris_b), color=SOROT, scale_factor=1.0), run_time=0.8)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan, berapa=l_berapa, bagian=l_bagian),
                          dunia={"alas": alas, "rata A": rata_a, "rata B": rata_b, "isi A": isi_a, "isi B": isi_b},
                          tulisan={"nama A": nama_a, "nama B": nama_b, "44": l_pa, "32,5": l_pb})

        # ============ nama: frekuensi relatif = f : n ====================== #
        garis_sama = DashedLine([X_A - 0.9, Y0 + TINGGI_RATA, 0], [X_B + 0.9, Y0 + TINGGI_RATA, 0]).set_stroke(SOROT, 2.2)
        with sinema.babak(self, "nama", DURASI, kata=KATA) as b:
            b.tunggu_kata("Angka")
            b.main(FadeOut(l_berapa), FadeOut(l_bagian), FadeOut(papan.semua()), run_time=0.5)
            self.remove(l_berapa, l_bagian, *papan.semua())
            papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
            b.tunggu_kata("namanya")
            sinema.lahir_rumus(self, r"f_{\text{rel}} = \frac{f}{n}", VGroup(rata_a, rata_b), papan, b=b,
                               warna=SOROT, sebagai_utama=False, ukuran_lahir=48, tahan=0.6,
                               run_time=1.0, geser=UP * 2.3)
            b.tunggu_kata("dibagi dengan")
            self.sorot_kotak(b, rata_a, rata_b, lama=1.2)
            b.tunggu_kata("takarannya")
            b.main(ShowCreation(garis_sama), run_time=0.8)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan),
                          dunia={"alas": alas, "rata A": rata_a, "rata B": rata_b, "isi A": isi_a, "isi B": isi_b, "garis sama": garis_sama},
                          tulisan={"nama A": nama_a, "nama B": nama_b, "44": l_pa, "32,5": l_pb})

        # ============ sifat: antara 0 dan 1, jumlahnya 1 ================== #
        x_sisi = X_A - 0.95
        sisi = Line([x_sisi, Y0, 0], [x_sisi, Y0 + TINGGI_RATA, 0]).set_stroke(REDUP, 2.0)
        l_nol = rumus("0", 20, REDUP).move_to([x_sisi - 0.28, Y0, 0])
        l_satu = rumus("1", 20, REDUP).move_to([x_sisi - 0.28, Y0 + TINGGI_RATA, 0])
        sisa_a = Rectangle(width=LEBAR_BATANG, height=(1 - BAGIAN_A) * TINGGI_RATA).set_stroke(width=0).set_fill(REDUP, 0)
        sisa_a.move_to([X_A, Y0 + BAGIAN_A * TINGGI_RATA + (1 - BAGIAN_A) * TINGGI_RATA / 2, 0])
        l_14 = rumus("14", 21, REDUP).move_to(sisa_a.get_center() + UP * 0.35)
        with sinema.babak(self, "sifat", DURASI, kata=KATA) as b:
            b.tunggu_kata("nol dan")
            b.main(ShowCreation(sisi), FadeIn(l_nol), FadeIn(l_satu), run_time=0.8)
            b.tunggu_kata("hasilnya selalu")
            b.main(Indicate(l_satu, color=SOROT, scale_factor=1.5), run_time=0.8)
            b.tunggu_kata("Cek di")
            b.main(FadeOut(garis_sama), run_time=0.4)
            b.tunggu_kata("sebelas")
            self.sorot_kotak(b, isi_a, lama=1.0)
            b.tunggu_kata("empat belas")
            self.add(sisa_a)
            b.main(FadeIn(l_14, scale=1.3), run_time=0.4)
            self.sorot_kotak(b, sisa_a, lama=1.0)
            b.tunggu_kata("Nol koma")
            papan.baris(r"0{,}44 + 0{,}56 = 1", SOROT, b=b)
            b.tunggu_kata("sama dengan")
            b.main(Indicate(l_satu, color=SOROT, scale_factor=1.5), run_time=0.8)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan),
                          dunia={"alas": alas, "rata A": rata_a, "rata B": rata_b, "isi A": isi_a, "isi B": isi_b, "sisi": sisi},
                          tulisan={"nama A": nama_a, "nama B": nama_b, "44": l_pa, "32,5": l_pb, "0": l_nol, "1": l_satu, "14": l_14})

        # ============ tutup: bukan berapa, melainkan dari berapa =========== #
        l_dari = sinema.label("dari berapa", 24, SOROT).move_to([(X_A + X_B) / 2, Y0 + TINGGI_RATA + 0.45, 0])
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("dua kelompok")
            b.main(Indicate(nama_a, color=SOROT), Indicate(nama_b, color=SOROT), run_time=0.8)
            b.tunggu_kata("bukan berapa")
            self.sorot_kotak(b, isi_a, isi_b, lama=1.0)
            b.tunggu_kata("dari berapa")
            b.main(FadeIn(l_dari, shift=UP * 0.2), run_time=0.4)  # irama Bian (14 Sep 2026)
            self.sorot_kotak(b, rata_a, rata_b, lama=1.0)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan),
                          dunia={"alas": alas, "rata A": rata_a, "rata B": rata_b, "isi A": isi_a, "isi B": isi_b, "sisi": sisi},
                          tulisan={"nama A": nama_a, "nama B": nama_b, "44": l_pa, "32,5": l_pb, "0": l_nol, "1": l_satu,
                                   "14": l_14, "dari berapa": l_dari})

        # ============ lanjut: rata-rata sebagai titik seimbang ============= #
        judul_lanjut = teks("Ukuran Pemusatan dan Penyebaran, Bagian 1", 30, SOROT).move_to([0, 1.9, 0])
        DATA = [2, 3, 3, 5, 7, 10]
        RATA = sum(DATA) / len(DATA)          # 5
        XL0, YL = -3.0, -0.6
        SK = 0.55
        garis_l = Line([XL0 - 0.3, YL, 0], [XL0 + 11 * SK + 0.3, YL, 0]).set_stroke(REDUP, 2.2)
        angka_l = VGroup(*[rumus(str(v), 20, REDUP).move_to([XL0 + v * SK, YL - 0.32, 0]) for v in range(0, 12, 2)])
        tumpuk = {}
        titik_l = VGroup()
        for v in DATA:
            k = tumpuk.get(v, 0)
            tumpuk[v] = k + 1
            titik_l.add(Dot([XL0 + v * SK, YL + 0.18 + k * 0.24, 0], radius=0.1).set_color(AKSEN))
        segitiga = Triangle().set_fill(SOROT, 1).set_stroke(width=0).scale(0.22)
        segitiga.move_to([XL0 + RATA * SK, YL - segitiga.get_height() / 2 - 0.02, 0])
        l_rata = sinema.label("rata-rata", 22, SOROT).move_to([XL0 + RATA * SK, YL - 0.62, 0])
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ukuran")
            b.main(FadeOut(VGroup(alas, rata_a, rata_b, isi_a, isi_b, sisi, sisa_a, nama_a, nama_b, l_pa, l_pb,
                                  l_nol, l_satu, l_14, l_dari)),
                   FadeOut(papan.semua()), FadeOut(ident), FadeIn(judul_lanjut, shift=UP * 0.2), run_time=0.8)
            self.remove(*papan.semua(), ident)
            ident = None
            papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
            b.tunggu_kata("rata-rata")
            b.main(ShowCreation(garis_l), FadeIn(angka_l), run_time=0.8)
            b.main(LaggedStartMap(lambda m: FadeIn(m, scale=1.5), titik_l, lag_ratio=0.15), run_time=0.9)
            b.tunggu_kata("titik tempat")
            b.main(FadeIn(segitiga, shift=UP * 0.2), run_time=0.6)
            b.tunggu_kata("seimbang")
            b.main(FadeIn(l_rata), run_time=0.5)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"garis": garis_l, "titik": titik_l, "segitiga": segitiga},
                          tulisan={"judul": judul_lanjut, "angka": angka_l, "rata-rata": l_rata})

        sinema.laporkan_pemicu(self)
