"""Statistika Materi 03, Penyajian Data Bagian 3: lebar kelas mengubah cerita.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (xz
miring, 2:05) yang sudah disetujui ARYA. ISINYA SAMA: 40 tinggi badan yang
sama dikelompokkan tiga kali di depan mata (lebar 5: tujuh batang; lebar 2:
bergerigi; lebar 10: empat batang), tanpa satu angka pun berubah; lebar kelas
pilihan manusia; contoh gabung dua kelas selebar 2 (tinggi 12 dan 4):
menjumlah tinggi salah (luas 64), yang dijumlah luasnya (32, tinggi 8);
luas mewakili banyaknya data.

YANG BERBEDA: dua dimensi biasa; pembuka sub-bab plus Bagian 3 dengan
pertanyaan; segar-ingat histogram 10 cm dari Bagian 2; tujuh frekuensi
dibaca satu per satu; bentuk umum tinggi = f : lebar lahir di dekat batang
gabungan; penutup menunjuk Bagian 4; tiap kejadian dipicu pada KATA.

SATU WARNA SATU MAKNA: merah bata = data angka (histogram), ungu = yang
disorot, abu = sumbu; jawaban salah dicoret merah.
Data: web/content/statistika/data.json t03-tinggi (40 siswa).
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "statistika3-lebar-kelas"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

TINGGI_BADAN = [152, 155, 156, 158, 158, 159, 160, 160, 161, 161, 162, 162, 163, 163, 163,
                164, 164, 165, 165, 165, 166, 166, 167, 167, 168, 168, 169, 169, 170, 170,
                171, 172, 172, 173, 174, 175, 176, 177, 178, 180]
JANGKAR = 150
X0, Y0 = -5.4, -1.9          # titik (150 cm, 0 siswa) di layar
SKALA_X = 0.16               # satu cm = 0,16 satuan (150..190 = 6,4 satuan)
SKALA_F = 0.17               # satu siswa = 0,17 satuan tinggi (11 siswa = 1,87)
JARI_TITIK = 0.055


def kelompokkan(lebar):
    hitung = {}
    for v in TINGGI_BADAN:
        k = JANGKAR + ((v - JANGKAR) // lebar) * lebar
        hitung[k] = hitung.get(k, 0) + 1
    return sorted(hitung.items())


def xc(cm):
    return X0 + (cm - JANGKAR) * SKALA_X


def hud(ident, papan):
    isi = {"identitas": ident} if ident is not None else {}
    p = papan.semua()
    if p is not None:
        isi["papan"] = p
    return isi


class LebarKelas3(AdeganMatra):
    def histogram(self, lebar, warna=AKSEN, isi=0.35):
        g = VGroup()
        for k, f in kelompokkan(lebar):
            r = Rectangle(width=lebar * SKALA_X, height=f * SKALA_F).set_stroke(warna, 1.5).set_fill(warna, isi)
            r.move_to([xc(k) + lebar * SKALA_X / 2, Y0 + f * SKALA_F / 2, 0])
            g.add(r)
        return g

    def sorot_pita(self, b, *ruas, lama=1.0):
        pita = VGroup(*[Line(r.get_start(), r.get_end()).set_stroke(SOROT, 18, opacity=0.35)
                        for r in ruas])
        self.add(pita)
        b.main(FadeIn(pita), run_time=lama * 0.35)
        b.main(FadeOut(pita), run_time=lama * 0.65)
        self.remove(pita)

    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
        ident = None

        sumbu = VGroup(Line([X0 - 0.3, Y0, 0], [xc(190) + 0.3, Y0, 0]).set_stroke(REDUP, 2))
        for cm in range(150, 191, 10):
            sumbu.add(Line([xc(cm), Y0 - 0.08, 0], [xc(cm), Y0 + 0.08, 0]).set_stroke(REDUP, 2))
        angka = VGroup(*[rumus(str(cm), 20, REDUP).move_to([xc(cm), Y0 - 0.32, 0]) for cm in range(150, 191, 10)])
        sumbu.latar = True
        satuan = rumus(r"\mathrm{cm}", 20, REDUP).next_to(angka[-1], RIGHT, buff=0.25)

        # Titik data: 40 titik kecil di atas sumbu, ditumpuk per nilai.
        tumpuk = {}
        titik = VGroup()
        for v in TINGGI_BADAN:
            k = tumpuk.get(v, 0)
            tumpuk[v] = k + 1
            titik.add(Dot([xc(v), Y0 + 0.16 + k * 0.17, 0], radius=JARI_TITIK).set_color(TINTA))

        # ============ buka ============================================== #
        tanya_buka = teks("Lebar kelas mana yang benar?", 34, TINTA).move_to([0, 0.3, 0])
        # Dua histogram kecil dari data yang sama (lebar 5 dan 10) menemani
        # kalimat pembuka; tanpa ini layar kosong 4 detik sesudah judul.
        def mini_buka(lebar, pusat):
            g = self.histogram(lebar, isi=0.35)
            g.add(Line([X0, Y0, 0], [xc(190), Y0, 0]).set_stroke(REDUP, 1.5))
            g.scale(0.5).move_to(pusat)
            return g

        dua_mini = VGroup(mini_buka(5, np.array([-2.2, -1.0, 0])), mini_buka(10, np.array([2.2, -1.0, 0])))
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Penyajian")
            sinema.judul_pembuka(self, "Penyajian Data, Bagian 3", lama=3.0, y=1.6)
            b.catat(3.0)
            b.tunggu_kata("Data yang")
            b.main(FadeIn(dua_mini, lag_ratio=0.3), run_time=0.9)
            b.tunggu_kata("Lebar kelas")
            b.main(Write(tanya_buka), run_time=1.3)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"dua mini": dua_mini}, tulisan={"tanya": tanya_buka})

        # ============ ingat: histogram 10 cm dari Bagian 2 ================ #
        hist10 = self.histogram(10)
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("materi sebelumnya")
            ident = sinema.identitas(self, "40 siswa", "tinggi badan 152 sampai 180 cm")
            ident.set_opacity(0)
            b.main(ident.animate.set_opacity(1), run_time=0.5)
            b.tunggu_kata("empat puluh")
            b.main(FadeOut(tanya_buka), FadeOut(dua_mini), ShowCreation(sumbu), FadeIn(angka), FadeIn(satuan),
                   run_time=0.9)
            b.tunggu_kata("selebar sepuluh")
            b.main(LaggedStartMap(FadeIn, hist10, lag_ratio=0.2), run_time=1.2)
            b.tunggu_kata("empat batang")
            b.main(Indicate(hist10, color=SOROT, scale_factor=1.0), run_time=1.0)
            b.tunggu_kata("ubah-ubah")
            b.main(FadeOut(hist10), run_time=0.7)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"sumbu": sumbu},
                          tulisan={"angka": angka, "satuan": satuan})

        # ============ kelompok: lebar 5, tujuh batang ===================== #
        hist5 = self.histogram(5)
        f5 = [f for _, f in kelompokkan(5)]
        lab5 = VGroup(*[rumus(str(f), 20, AKSEN).move_to(hist5[i].get_top() + UP * 0.22) for i, f in enumerate(f5)])
        ident5 = None
        with sinema.babak(self, "kelompok", DURASI, kata=KATA) as b:
            b.tunggu_kata("lebar lima")
            papan.baris(r"\text{lebar kelas } 5", AKSEN, b=b)
            b.tunggu_kata("Empat puluh")
            b.main(LaggedStartMap(lambda m: FadeIn(m, scale=1.5), titik, lag_ratio=0.04), run_time=1.0)
            b.tunggu_kata("kotaknya")
            b.main(FadeIn(hist5), run_time=0.9)
            for frasa, ke, i in (("satu", 1, 0), ("lima", 2, 1), ("sebelas", 1, 2), ("sebelas", 2, 3),
                                 ("tujuh", 2, 4), ("empat", 2, 5), ("satu", 2, 6)):
                b.tunggu_kata(frasa, ke=ke)
                b.main(FadeIn(lab5[i], scale=1.3), run_time=0.3)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"sumbu": sumbu, "hist": hist5, "titik": titik},
                          tulisan={"angka": angka, "satuan": satuan, "lab5": lab5})

        # ============ pola: tumpukan 160 sampai 170 ======================= #
        with sinema.babak(self, "pola", DURASI, kata=KATA) as b:
            b.tunggu_kata("tumpukan")
            self.sorot_pita(b, Line([xc(160), Y0 + 1.0, 0], [xc(170), Y0 + 1.0, 0]), lama=1.4)
            b.tunggu_kata("mewajibkan")
            b.main(papan.sorot(), run_time=1.0)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"sumbu": sumbu, "hist": hist5, "titik": titik},
                          tulisan={"angka": angka, "satuan": satuan, "lab5": lab5})

        # ============ sempit: lebar 2, bergerigi ========================== #
        hist2 = self.histogram(2)
        with sinema.babak(self, "sempit", DURASI, kata=KATA) as b:
            b.tunggu_kata("selebar dua")
            b.main(FadeOut(lab5), FadeOut(papan.semua()), run_time=0.4)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
            b.main(ReplacementTransform(hist5, hist2), run_time=1.4)
            papan.baris(r"\text{lebar kelas } 2", AKSEN, b=b)
            b.tunggu_kata("bergerigi")
            b.main(Indicate(hist2, color=SOROT, scale_factor=1.0), run_time=1.0)
            b.tunggu_kata("satu dua")
            b.main(Indicate(VGroup(*hist2[:3]), color=SOROT, scale_factor=1.0), run_time=0.8)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"sumbu": sumbu, "hist": hist2, "titik": titik},
                          tulisan={"angka": angka, "satuan": satuan})

        # ============ lebar: lebar 10, empat batang ======================= #
        hist10b = self.histogram(10)
        with sinema.babak(self, "lebar", DURASI, kata=KATA) as b:
            b.tunggu_kata("selebar sepuluh")
            b.main(FadeOut(papan.semua()), run_time=0.3)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
            b.main(ReplacementTransform(hist2, hist10b), run_time=1.4)
            papan.baris(r"\text{lebar kelas } 10", AKSEN, b=b)
            b.tunggu_kata("paling kanan")
            b.main(Indicate(hist10b[3], color=SOROT, scale_factor=1.0), run_time=1.0)
            b.tunggu_kata("tidak terlihat")
            self.sorot_pita(b, Line([xc(160), Y0 + 1.0, 0], [xc(170), Y0 + 1.0, 0]), lama=1.2)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"sumbu": sumbu, "hist": hist10b, "titik": titik},
                          tulisan={"angka": angka, "satuan": satuan})

        # ============ pilihan: tiga gambar kecil berdampingan ============= #
        def mini(lebar, pusat, skala=0.42):
            g = self.histogram(lebar, isi=0.35)
            g.add(Line([X0, Y0, 0], [xc(190), Y0, 0]).set_stroke(REDUP, 1.5))
            g.scale(skala).move_to(pusat)
            return g

        tiga = VGroup(mini(5, np.array([-2.4, 1.6, 0])), mini(2, np.array([0.4, 1.6, 0])), mini(10, np.array([3.2, 1.6, 0])))
        with sinema.babak(self, "pilihan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Tiga gambar")
            b.main(FadeIn(tiga, lag_ratio=0.3), run_time=1.2)
            b.tunggu_kata("pilihan manusia")
            b.main(papan.sorot(), run_time=1.0)
            b.tunggu_kata("paling benar")
            b.main(Indicate(tiga, color=SOROT, scale_factor=1.0), run_time=1.0)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"sumbu": sumbu, "hist": hist10b, "titik": titik, "tiga": tiga},
                          tulisan={"angka": angka, "satuan": satuan})

        # ============ luas: contoh dua kelas selebar 2 (12 dan 4) ========= #
        XG, YG = -1.6, -1.9
        S = 0.5                       # satu satuan lebar contoh
        SF = 0.11                     # satu data = 0,11 satuan tinggi (12 data = 1,32)
        kotak12 = Rectangle(width=2 * S, height=12 * SF).set_stroke(AKSEN, 2).set_fill(AKSEN, 0.35)
        kotak12.move_to([XG + 2 * S + S, YG + 12 * SF / 2, 0])
        kotak4 = Rectangle(width=2 * S, height=4 * SF).set_stroke(AKSEN, 2).set_fill(AKSEN, 0.35)
        kotak4.move_to([XG + 4 * S + S, YG + 4 * SF / 2, 0])
        dasar_g = Line([XG + 1.5 * S, YG, 0], [XG + 7 * S, YG, 0]).set_stroke(REDUP, 2)
        tepi_g = VGroup(*[rumus(str(v), 20, REDUP).move_to([XG + v * S, YG - 0.32, 0]) for v in (2, 4, 6)])
        l12 = rumus("12", 22, AKSEN).next_to(kotak12, UP, buff=0.12)
        l4 = rumus("4", 22, AKSEN).next_to(kotak4, UP, buff=0.12)
        contoh = VGroup(dasar_g, tepi_g, kotak12, kotak4, l12, l4)

        with sinema.babak(self, "luas", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ambil dua")
            b.main(FadeOut(hist10b), FadeOut(titik), FadeOut(sumbu), FadeOut(angka), FadeOut(satuan),
                   FadeOut(papan.semua()), FadeOut(ident), run_time=0.6)
            self.remove(*papan.semua(), ident)
            ident = None
            papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
            b.main(ShowCreation(dasar_g), FadeIn(tepi_g), FadeIn(kotak12), FadeIn(kotak4), run_time=1.0)
            b.tunggu_kata("dua belas")
            b.main(FadeIn(l12), run_time=0.4)
            b.tunggu_kata("empat")
            b.main(FadeIn(l4), run_time=0.4)
            b.tunggu_kata("digabung")
            b.main(Indicate(VGroup(kotak12, kotak4), color=SOROT, scale_factor=1.0), run_time=1.0)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"tiga": tiga, "contoh": contoh},
                          tulisan={"l12": l12, "l4": l4, "tepi g": tepi_g})

        # ============ salah: tinggi dijumlah =============================== #
        salah = Rectangle(width=4 * S, height=16 * SF).set_stroke(AKSEN, 2, opacity=0.8).set_fill(AKSEN, 0.15)
        salah.move_to([XG + 4 * S, YG + 16 * SF / 2, 0])
        l16 = rumus("16", 22, AKSEN).next_to(salah, UP, buff=0.12)
        coret = Line(salah.get_corner(DL) + np.array([-0.1, -0.1, 0]), salah.get_corner(UR) + np.array([0.1, 0.1, 0])).set_stroke(AKSEN, 4)
        with sinema.babak(self, "salah", DURASI, kata=KATA) as b:
            b.tunggu_kata("tingginya dijumlah")
            b.main(FadeIn(salah), FadeIn(l16), run_time=0.9)
            b.tunggu_kata("dua belas")
            papan.baris(r"12 + 4 = 16", AKSEN, b=b)
            b.tunggu_kata("luasnya lalu")
            papan.baris(r"\text{luas} = 4 \times 16 = 64", AKSEN, b=b)
            b.tunggu_kata("Dua kali")
            b.main(ShowCreation(coret), run_time=0.6)
            b.main(Indicate(l16, color=AKSEN), run_time=0.8)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"tiga": tiga, "contoh": contoh, "salah": salah},
                          tulisan={"l12": l12, "l4": l4, "l16": l16, "tepi g": tepi_g})

        # ============ benar: luas dijumlah, tinggi 8 ======================= #
        gabung = Rectangle(width=4 * S, height=8 * SF).set_stroke(SOROT, 2).set_fill(SOROT, 0.35)
        gabung.move_to([XG + 4 * S, YG + 8 * SF / 2, 0])
        l8 = rumus("8", 22, SOROT).next_to(gabung, UP, buff=0.12)
        with sinema.babak(self, "benar", DURASI, kata=KATA) as b:
            b.tunggu_kata("dijumlah luasnya")
            b.main(FadeOut(salah), FadeOut(l16), FadeOut(coret), FadeOut(papan.semua()), run_time=0.5)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
            b.tunggu_kata("Dua kali dua")
            papan.baris(r"2 \times 12 = 24", TINTA, b=b)
            b.tunggu_kata("dua kali empat")
            papan.baris(r"2 \times 4 = 8", TINTA, b=b)
            b.tunggu_kata("tiga puluh dua")
            papan.baris(r"24 + 8 = 32", SOROT, b=b)
            b.tunggu_kata("Lebarnya sekarang")
            b.main(ReplacementTransform(VGroup(kotak12.copy(), kotak4.copy()), gabung),
                   kotak12.animate.set_fill(opacity=0.1).set_stroke(opacity=0.4),
                   kotak4.animate.set_fill(opacity=0.1).set_stroke(opacity=0.4),
                   FadeOut(l12), FadeOut(l4), run_time=1.2)
            b.tunggu_kata("yaitu delapan")
            papan.baris(r"\text{tinggi} = 32 : 4 = 8", SOROT, b=b)
            b.main(FadeIn(l8, scale=1.3), run_time=0.4)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"tiga": tiga, "contoh": contoh, "gabung": gabung},
                          tulisan={"l8": l8, "tepi g": tepi_g})

        # ============ umum: tinggi = f : lebar, lahir di dekat batang gabungan
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bentuk umumnya")
            b.main(FadeOut(papan.semua()), run_time=0.4)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
            b.tunggu_kata("tinggi batang")
            sinema.lahir_rumus(self, r"\text{tinggi} = \frac{f}{\text{lebar}}", gabung, papan, b=b,
                               warna=SOROT, sebagai_utama=False, ukuran_lahir=46, tahan=0.6,
                               run_time=1.0, geser=UP * 1.6 + RIGHT * 1.6)
            b.tunggu_kata("luasnya")
            papan.baris(r"\text{tinggi} \times \text{lebar} = f", TINTA, b=b)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"tiga": tiga, "contoh": contoh, "gabung": gabung},
                          tulisan={"l8": l8, "tepi g": tepi_g})

        # ============ tutup: luas, bukan tinggi ============================ #
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("luas batangnya")
            b.main(Indicate(gabung, color=SOROT, scale_factor=1.0), run_time=1.0)
            b.tunggu_kata("sama lebar")
            b.main(Indicate(tiga[2], color=SOROT, scale_factor=1.0), run_time=1.0)
            b.tunggu_kata("lebih lebar")
            b.main(Indicate(gabung, color=AKSEN, scale_factor=1.0), run_time=1.0)
            b.tunggu_kata("menyesatkan")
            b.main(papan.sorot(), run_time=1.0)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"tiga": tiga, "contoh": contoh, "gabung": gabung},
                          tulisan={"l8": l8, "tepi g": tepi_g})

        # ============ lanjut: dua batang mentah beda jumlah ================ #
        judul_lanjut = teks("Penyajian Data, Bagian 4", 30, SOROT).move_to([0, 1.9, 0])
        bar_a = Rectangle(width=0.9, height=11 * 0.13).set_stroke(AKSEN2, 2).set_fill(AKSEN2, 0.35)
        bar_b = Rectangle(width=0.9, height=13 * 0.13).set_stroke(AKSEN, 2).set_fill(AKSEN, 0.35)
        bar_a.move_to([-0.8, -1.4 + 11 * 0.13 / 2, 0])
        bar_b.move_to([0.8, -1.4 + 13 * 0.13 / 2, 0])
        dasar_l = Line([-2.0, -1.4, 0], [2.0, -1.4, 0]).set_stroke(REDUP, 2)
        la = rumus(r"\frac{11}{25}", 26, AKSEN2).next_to(bar_a, UP, buff=0.15)
        lb = rumus(r"\frac{13}{40}", 26, AKSEN).next_to(bar_b, UP, buff=0.15)
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Penyajian")
            b.main(FadeOut(tiga), FadeOut(contoh), FadeOut(gabung), FadeOut(l8), FadeOut(papan.semua()),
                   FadeIn(judul_lanjut, shift=UP * 0.2), run_time=0.8)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
            b.tunggu_kata("dua kelompok")
            b.main(ShowCreation(dasar_l), FadeIn(bar_a), FadeIn(bar_b), run_time=1.0)
            b.tunggu_kata("takarannya")
            b.main(FadeIn(la), FadeIn(lb), run_time=0.7)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"bar a": bar_a, "bar b": bar_b, "dasar": dasar_l},
                          tulisan={"judul": judul_lanjut, "la": la, "lb": lb})

        sinema.laporkan_pemicu(self)
