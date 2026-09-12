"""Statistika Materi 02, Penyajian Data Bagian 2: diagram batang, histogram, diagram titik.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (2:02,
xz miring) yang sudah disetujui ARYA, ditambah bahan naskah v3 sesi. ISINYA:
dua jenis data; frekuensi 8, 6, 12, 5, 9 dijumlahkan 40; persen 8 : 40 = 20%
dan bentuk umumnya; diagram batang bersela, ditukar artinya tetap; tinggi
badan dikelompokkan 10 cm (6, 22, 11, 1); histogram rapat, ditukar sumbunya
kacau; aturan satu uji; diagram titik; jenis data memilih gambarnya.

TATA LETAK: dua dimensi biasa (xy). Papan rumus kanan atas, identitas kiri
atas, gambar utama di kiri-tengah, contoh kecil (dua ikon uji tukar) di kanan
bawah. Tiap kejadian dipicu pada KATA yang mengucapkannya.

SATU WARNA SATU MAKNA: biru = data kategori, merah bata = data angka, ungu =
yang sedang dipindah atau disorot, abu = sumbu dan angkanya.
Data: web/content/statistika/data.json t02-cara-ke-sekolah dan t03-tinggi.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "statistika2-bentuk"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

KATEGORI = [("jalan kaki", 8), ("sepeda", 6), ("sepeda motor", 12), ("angkot", 5), ("diantar", 9)]
KELAS = [(150, 6), (160, 22), (170, 11), (180, 1)]       # tepi kiri, frekuensi; lebar 10 cm
TITIK_KECIL = [5, 7, 8, 10, 10, 12, 15, 15, 18, 20]
KELAS_A = [6, 6, 7, 7, 7, 7, 8, 8]
KELAS_B = [3, 4, 5, 7, 7, 9, 10, 11]

X0, Y0 = -5.6, -1.9            # pojok kiri bawah sumbu gambar utama
SKALA_F = 0.19                 # satu siswa = 0,19 satuan tinggi (12 siswa = 2,28)
LEBAR_KAT = 0.95               # lebar batang kategori
JARAK_KAT = 1.3                # jarak antar pusat batang kategori
LEBAR_HIST = 1.3               # lebar satu kelas 10 cm


def hud(ident, papan):
    isi = {"identitas": ident} if ident is not None else {}
    p = papan.semua()
    if p is not None:
        isi["papan"] = p
    return isi


def sumbu_datar(x0, x1, y):
    return Line([x0, y, 0], [x1, y, 0]).set_stroke(REDUP, 2)


class Bentuk2(AdeganMatra):
    def sorot_pita(self, b, *ruas, lama=1.0):
        pita = VGroup(*[Line(r.get_start(), r.get_end()).set_stroke(SOROT, 18, opacity=0.35)
                        for r in ruas])
        self.add(pita)
        b.main(FadeIn(pita), run_time=lama * 0.35)
        b.main(FadeOut(pita), run_time=lama * 0.65)
        self.remove(pita)

    def sorot_kotak(self, b, *mobs, lama=1.0):
        """Kotak tembus pandang di atas benda (teks, batang): menyorot tanpa menutupnya."""
        kotak = VGroup(*[Rectangle(width=m.get_width() + 0.2, height=m.get_height() + 0.2)
                         .set_stroke(width=0).set_fill(SOROT, 0.35).move_to(m) for m in mobs])
        self.add(kotak)
        b.main(FadeIn(kotak), run_time=lama * 0.35)
        b.main(FadeOut(kotak), run_time=lama * 0.65)
        self.remove(kotak)

    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
        ident = None

        # ============ buka ============================================== #
        tanya_buka = teks("Kapan diagram batang, dan kapan histogram?", 34, TINTA)
        sinema.batasi_lebar(tanya_buka, 11.4)
        tanya_buka.move_to([0, 0.3, 0])
        # Tabel angka yang "hampir tidak bisa dibaca": empat baris sepuluh angka.
        tabel = VGroup(*[rumus(" \\quad ".join(str(v) for v in baris), 24, REDUP)
                         for baris in ([158, 163, 171, 166, 175, 160, 169, 172, 164, 168],
                                       [155, 174, 167, 161, 170, 166, 178, 163, 169, 165],
                                       [173, 159, 166, 168, 162, 171, 167, 180, 164, 170],
                                       [152, 165, 169, 176, 163, 167, 172, 161, 166, 168])])
        tabel.arrange(DOWN, buff=0.22).move_to([0, -1.5, 0])
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Penyajian")
            sinema.judul_pembuka(self, "Penyajian Data, Bagian 2", lama=3.0, y=1.6)
            b.catat(3.0)
            b.tunggu_kata("Empat puluh")
            b.main(FadeIn(tabel, lag_ratio=0.1), run_time=1.4)
            b.tunggu_kata("Tetapi")
            b.main(Write(tanya_buka), run_time=1.5)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={},
                          tulisan={"tanya": tanya_buka, "tabel": tabel})

        # ============ ingat: titik ditumpahkan ke garis nilai (Bagian 1) == #
        def garis_nilai(y):
            g = VGroup(sumbu_datar(-4.2, 3.0, y))
            for v in range(2, 13):
                x = -4.2 + (v - 2) * 0.72
                g.add(Line([x, y - 0.08, 0], [x, y + 0.08, 0]).set_stroke(REDUP, 2))
                g.add(rumus(str(v), 20, REDUP).move_to([x, y - 0.32, 0]))
            g.latar = True
            return g

        def titik_kelas(data, y, warna):
            tumpuk = {}
            dots = VGroup()
            for v in data:
                k = tumpuk.get(v, 0)
                tumpuk[v] = k + 1
                x = -4.2 + (v - 2) * 0.72
                dots.add(Dot([x, y + 0.2 + k * 0.24, 0], radius=0.1).set_color(warna))
            return dots

        gn_a, gn_b = garis_nilai(1.5), garis_nilai(-1.0)
        dots_a, dots_b = titik_kelas(KELAS_A, 1.5, AKSEN2), titik_kelas(KELAS_B, -1.0, AKSEN)
        awal_a = VGroup(*[Dot([-4.2 + 5 * 0.72, 1.5 + 0.2 + i * 0.24, 0], radius=0.1).set_color(AKSEN2)
                          for i in range(8)])
        awal_b = VGroup(*[Dot([-4.2 + 5 * 0.72, -1.0 + 0.2 + i * 0.24, 0], radius=0.1).set_color(AKSEN)
                          for i in range(8)])
        lab_a = teks("Kelas A", 24, AKSEN2).move_to([-5.4, 1.85, 0])
        lab_b = teks("Kelas B", 24, AKSEN).move_to([-5.4, -0.65, 0])

        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("materi sebelumnya")
            ident = sinema.identitas(self, "ingat Bagian 1")
            ident.set_opacity(0)
            b.main(ident.animate.set_opacity(1), run_time=0.5)
            b.tunggu_kata("dua kelas")
            b.main(FadeOut(tanya_buka), FadeOut(tabel), FadeIn(gn_a), FadeIn(gn_b), FadeIn(lab_a), FadeIn(lab_b),
                   FadeIn(awal_a), FadeIn(awal_b), run_time=1.0)
            b.tunggu_kata("ditumpahkan")
            b.main(Transform(awal_a, dots_a), Transform(awal_b, dots_b), run_time=1.6)
            b.tunggu_kata("cara memeriksa")
            self.sorot_pita(b, gn_b[0], lama=1.0)
            b.tunggu_kata("gambar yang")
            b.main(Indicate(gn_a[0], color=SOROT, scale_factor=1.0), Indicate(gn_b[0], color=SOROT, scale_factor=1.0),
                   run_time=0.9)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"gn a": gn_a, "gn b": gn_b, "awal a": awal_a,
                                                                   "awal b": awal_b},
                          tulisan={"lab a": lab_a, "lab b": lab_b})

        # ============ duajenis: dua kolom contoh ========================= #
        kepala_k = teks("kategori", 32, AKSEN2).move_to([-3.2, 1.9, 0])
        kepala_n = teks("angka", 32, AKSEN).move_to([3.2, 1.9, 0])
        contoh_k = VGroup(*[teks(n, 28, TINTA) for n, _ in KATEGORI]).arrange(DOWN, buff=0.3)
        contoh_k.move_to([-3.2, -0.2, 0])
        contoh_n = VGroup(*[teks(n, 28, TINTA) for n in ("tinggi badan", "nilai ulangan", "waktu tempuh")])
        contoh_n.arrange(DOWN, buff=0.3).move_to([3.2, 0.2, 0])
        pemisah = Line([0, 2.2, 0], [0, -1.6, 0]).set_stroke(REDUP, 2)

        with sinema.babak(self, "duajenis", DURASI, kata=KATA) as b:
            b.tunggu_kata("jenisnya cuma")
            b.main(FadeOut(awal_a), FadeOut(awal_b), FadeOut(gn_a), FadeOut(gn_b), FadeOut(lab_a), FadeOut(lab_b),
                   FadeOut(ident), ShowCreation(pemisah), run_time=0.7)
            self.remove(ident)
            ident = None
            b.tunggu_kata("Data kategori")
            b.main(FadeIn(kepala_k, shift=UP * 0.2), run_time=0.6)
            for frasa, m in (("jalan", contoh_k[0]), ("sepeda", contoh_k[1]), ("sepeda motor", contoh_k[2]),
                             ("angkot", contoh_k[3]), ("diantar", contoh_k[4])):
                b.tunggu_kata(frasa)
                b.main(FadeIn(m, shift=RIGHT * 0.2), run_time=0.4)
            b.tunggu_kata("Data angka")
            b.main(FadeIn(kepala_n, shift=UP * 0.2), run_time=0.6)
            for frasa, m in (("tinggi", contoh_n[0]), ("nilai", contoh_n[1]), ("waktu", contoh_n[2])):
                b.tunggu_kata(frasa)
                b.main(FadeIn(m, shift=RIGHT * 0.2), run_time=0.4)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"pemisah": pemisah},
                          tulisan={"kepala k": kepala_k, "kepala n": kepala_n,
                                   "contoh k": contoh_k, "contoh n": contoh_n})

        # ============ hitungf: frekuensi tiap kategori ==================== #
        def x_kat(i):
            return X0 + 0.9 + i * JARAK_KAT

        nama_kat = VGroup(*[teks(n, 20, AKSEN2).move_to([x_kat(i), Y0 - 0.45, 0]) for i, (n, _) in enumerate(KATEGORI)])
        for i, (n, _) in enumerate(KATEGORI):
            sinema.batasi_lebar(nama_kat[i], JARAK_KAT - 0.1)
        angka_kat = VGroup(*[rumus(str(f), 30, AKSEN2).move_to([x_kat(i), Y0 + 0.35, 0]) for i, (_, f) in enumerate(KATEGORI)])
        dasar_kat = sumbu_datar(X0, X0 + 0.9 + 4 * JARAK_KAT + 0.6, Y0)

        with sinema.babak(self, "hitungf", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kita mulai")
            self.sorot_kotak(b, kepala_k, lama=0.8)
            ident = sinema.identitas(self, "40 siswa yang sama")
            ident.set_opacity(0)
            b.tunggu_kata("Empat puluh")
            b.main(FadeOut(pemisah), FadeOut(kepala_k), FadeOut(kepala_n), FadeOut(contoh_k), FadeOut(contoh_n),
                   ShowCreation(dasar_kat), FadeIn(nama_kat), ident.animate.set_opacity(1), run_time=0.9)
            for frasa, i in (("Jalan kaki", 0), ("sepeda enam", 1), ("sepeda motor", 2), ("angkot", 3), ("diantar", 4)):
                b.tunggu_kata(frasa)
                b.main(FadeIn(angka_kat[i], scale=1.4), run_time=0.4)
            b.tunggu_kata("Dijumlahkan")
            papan.baris(r"8 + 6 + 12 + 5 + 9 = 40", AKSEN2, b=b)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"dasar": dasar_kat},
                          tulisan={"nama kat": nama_kat, "angka kat": angka_kat})

        # ============ persen: 8 dari 40 = 20 persen, bentuk umum ========== #
        p_motor = rumus(r"30\%", 22, SOROT).move_to([x_kat(2), Y0 + 0.8, 0])
        p_angkot = rumus(r"12{,}5\%", 22, SOROT).move_to([x_kat(3), Y0 + 0.8, 0])
        p_jalan = rumus(r"20\%", 22, SOROT).move_to([x_kat(0), Y0 + 0.8, 0])
        with sinema.babak(self, "persen", DURASI, kata=KATA) as b:
            b.tunggu_kata("Delapan dari")
            b.main(Indicate(angka_kat[0], color=SOROT), run_time=0.7)
            b.tunggu_kata("sama dengan")
            hasil = papan.baris(r"8 : 40 = 0{,}2", SOROT, b=b)
            b.tunggu_kata("dua puluh persen")
            hasil = sinema.ganti_rumus(self, hasil, r"8 : 40 = 0{,}2 = 20\%", b=b, papan=papan,
                                       warna=SOROT, run_time=0.7)
            b.main(FadeIn(p_jalan, shift=UP * 0.2), run_time=0.4)
            b.tunggu_kata("frekuensi dibagi")
            sinema.lahir_rumus(self, r"\frac{f}{n} \times 100\%", angka_kat[0], papan, b=b,
                               warna=SOROT, sebagai_utama=False, ukuran_lahir=52, tahan=0.5,
                               run_time=1.0, geser=UP * 1.8)
            b.tunggu_kata("tiga puluh")
            b.main(FadeIn(p_motor, shift=UP * 0.2), run_time=0.5)
            b.tunggu_kata("dua belas")
            b.main(FadeIn(p_angkot, shift=UP * 0.2), run_time=0.5)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"dasar": dasar_kat},
                          tulisan={"nama kat": nama_kat, "angka kat": angka_kat,
                                   "p motor": p_motor, "p angkot": p_angkot, "p jalan": p_jalan})

        # ============ batang: diagram batang bersela ====================== #
        def batang_kat(i, f, warna=AKSEN2):
            r = Rectangle(width=LEBAR_KAT, height=f * SKALA_F)
            r.set_stroke(warna, 2).set_fill(warna, 0.35)
            r.move_to([x_kat(i), Y0 + f * SKALA_F / 2, 0])
            return r

        batang = VGroup(*[batang_kat(i, f) for i, (_, f) in enumerate(KATEGORI)])
        sela = VGroup(*[Rectangle(width=JARAK_KAT - LEBAR_KAT, height=1.2).set_fill(SOROT, 0.25).set_stroke(width=0)
                        .move_to([(x_kat(i) + x_kat(i + 1)) / 2, Y0 + 0.6, 0]) for i in range(4)])

        with sinema.babak(self, "batang", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekarang digambar")
            b.main(FadeOut(p_jalan), FadeOut(p_motor), FadeOut(p_angkot), FadeOut(papan.semua()), run_time=0.5)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
            b.tunggu_kata("Tiap kategori")
            for i in range(5):
                batang[i].save_state()
                batang[i].stretch(0.001, 1, about_edge=DOWN)
            self.add(batang)
            b.main(*[angka_kat[i].animate.move_to([x_kat(i), Y0 + KATEGORI[i][1] * SKALA_F + 0.3, 0]) for i in range(5)],
                   *[Restore(batang[i]) for i in range(5)], run_time=1.6)
            b.tunggu_kata("diagram batang")
            papan.baris(r"\text{diagram batang}", AKSEN2, b=b)
            b.tunggu_kata("ada sela")
            b.main(FadeIn(sela), run_time=0.6)
            b.tunggu_kata("bukan hiasan")
            b.main(Indicate(sela, color=SOROT, scale_factor=1.0), run_time=1.0)
            b.tunggu_kata("tidak menyambung")
            b.main(FadeOut(sela), run_time=0.6)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"dasar": dasar_kat, "batang": batang},
                          tulisan={"nama kat": nama_kat, "angka kat": angka_kat})

        # ============ tukar1: motor dan angkot ditukar ==================== #
        with sinema.babak(self, "tukar1", DURASI, kata=KATA) as b:
            b.tunggu_kata("kita tukar")
            g_motor = VGroup(batang[2], angka_kat[2], nama_kat[2])
            g_angkot = VGroup(batang[3], angka_kat[3], nama_kat[3])
            b.main(g_motor.animate.shift(RIGHT * JARAK_KAT), g_angkot.animate.shift(LEFT * JARAK_KAT),
                   run_time=1.6, rate_func=smooth)
            b.tunggu_kata("tidak ada")
            b.main(Indicate(angka_kat[2], color=SOROT), Indicate(angka_kat[3], color=SOROT), run_time=0.9)
            b.tunggu_kata("persis sama")
            papan.baris(r"\text{artinya tetap}", SOROT, b=b)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"dasar": dasar_kat, "batang": batang},
                          tulisan={"nama kat": nama_kat, "angka kat": angka_kat})

        # ============ pindah: data angka, kelompok 10 cm ================== #
        def x_tepi(cm):
            return X0 + 0.5 + (cm - 150) / 10 * LEBAR_HIST

        dasar_h = sumbu_datar(X0, x_tepi(190) + 0.5, Y0)
        tepi = VGroup(*[VGroup(Line([x_tepi(cm), Y0 - 0.08, 0], [x_tepi(cm), Y0 + 0.08, 0]).set_stroke(REDUP, 2),
                               rumus(str(cm), 20, REDUP).move_to([x_tepi(cm), Y0 - 0.32, 0]))
                        for cm in (150, 160, 170, 180, 190)])
        rentang = rumus(r"152 \ldots 180\ \mathrm{cm}", 28, AKSEN).move_to([x_tepi(170), Y0 + 1.6, 0])
        kelompok = VGroup(*[Rectangle(width=LEBAR_HIST, height=0.5).set_stroke(AKSEN, 2).set_fill(AKSEN, 0.12)
                            .move_to([x_tepi(cm) + LEBAR_HIST / 2, Y0 + 0.25, 0]) for cm, _ in KELAS])

        with sinema.babak(self, "pindah", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekarang data")
            b.main(FadeOut(papan.semua()), run_time=0.5)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
            b.tunggu_kata("Empat puluh")
            b.main(FadeOut(batang), FadeOut(angka_kat), FadeOut(nama_kat), FadeOut(dasar_kat),
                   ShowCreation(dasar_h), FadeIn(tepi), run_time=0.9)
            b.tunggu_kata("seratus lima")
            b.main(FadeIn(rentang, shift=UP * 0.2), run_time=0.6)
            b.tunggu_kata("dikelompokkan")
            b.main(LaggedStartMap(FadeIn, kelompok, lag_ratio=0.25), run_time=1.2)
            b.tunggu_kata("sepuluh")
            self.sorot_pita(b, Line([x_tepi(160), Y0 + 0.8, 0], [x_tepi(170), Y0 + 0.8, 0]), lama=0.9)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"dasar": dasar_h, "kelompok": kelompok},
                          tulisan={"tepi": tepi, "rentang": rentang})

        # ============ frek: 6, 22, 11, 1 ================================== #
        angka_h = VGroup(*[rumus(str(f), 30, AKSEN).move_to([x_tepi(cm) + LEBAR_HIST / 2, Y0 + 0.85, 0]) for cm, f in KELAS])
        with sinema.babak(self, "frek", DURASI, kata=KATA) as b:
            b.tunggu_kata("Seratus lima")
            b.main(FadeOut(rentang), run_time=0.4)
            for frasa, ke, i in (("enam siswa", 1, 0), ("dua puluh dua", 1, 1), ("sebelas", 1, 2), ("Sisanya", 1, 3)):
                b.tunggu_kata(frasa, ke=ke)
                b.main(FadeIn(angka_h[i], scale=1.4), run_time=0.4)
            b.tunggu_kata("Dijumlahkan")
            papan.baris(r"6 + 22 + 11 + 1 = 40", AKSEN, b=b)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"dasar": dasar_h, "kelompok": kelompok},
                          tulisan={"tepi": tepi, "angka h": angka_h})

        # ============ histogram: batang rapat ============================= #
        hist = VGroup(*[Rectangle(width=LEBAR_HIST, height=f * SKALA_F).set_stroke(AKSEN, 2).set_fill(AKSEN, 0.35)
                        .move_to([x_tepi(cm) + LEBAR_HIST / 2, Y0 + f * SKALA_F / 2, 0]) for cm, f in KELAS])
        with sinema.babak(self, "histogram", DURASI, kata=KATA) as b:
            b.tunggu_kata("Digambar")
            for i in range(4):
                hist[i].save_state()
                hist[i].stretch(0.001, 1, about_edge=DOWN)
            self.add(hist)
            self.remove(kelompok)
            b.main(*[Restore(hist[i]) for i in range(4)],
                   *[angka_h[i].animate.move_to([x_tepi(KELAS[i][0]) + LEBAR_HIST / 2, Y0 + KELAS[i][1] * SKALA_F + 0.3, 0]) for i in range(4)],
                   run_time=1.6)
            b.tunggu_kata("histogram")
            papan.baris(r"\text{histogram}", AKSEN, b=b)
            b.tunggu_kata("berhenti di")
            b.main(Flash([x_tepi(160), Y0, 0], color=SOROT, flash_radius=0.5, line_length=0.18), run_time=0.7)
            b.tunggu_kata("mulai dari")
            b.main(Flash([x_tepi(160), Y0, 0], color=SOROT, flash_radius=0.5, line_length=0.18), run_time=0.7)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"dasar": dasar_h, "hist": hist},
                          tulisan={"tepi": tepi, "angka h": angka_h})

        # ============ tukar2: dua batang histogram ditukar ================ #
        # Label rentang di bawah tiap batang menggantikan tepi bersama, supaya
        # sesudah ditukar sumbunya benar-benar terbaca kacau.
        label_rentang = VGroup(*[rumus(f"{cm}\\text{{-}}{cm + 10}", 18, REDUP)
                                 .move_to([x_tepi(cm) + LEBAR_HIST / 2, Y0 - 0.32, 0]) for cm, _ in KELAS])
        with sinema.babak(self, "tukar2", DURASI, kata=KATA) as b:
            b.tunggu_kata("Uji yang")
            b.main(FadeOut(tepi), FadeIn(label_rentang), run_time=0.6)
            b.tunggu_kata("kita tukar")
            g2 = VGroup(hist[1], angka_h[1], label_rentang[1])
            g3 = VGroup(hist[2], angka_h[2], label_rentang[2])
            b.main(g2.animate.shift(RIGHT * LEBAR_HIST), g3.animate.shift(LEFT * LEBAR_HIST),
                   run_time=1.6, rate_func=smooth)
            b.tunggu_kata("sumbunya")
            b.main(LaggedStartMap(lambda m: Indicate(m, color=AKSEN), label_rentang, lag_ratio=0.3), run_time=1.6)
            b.tunggu_kata("kacau")
            papan.baris(r"\text{sumbu kacau}", AKSEN, b=b)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"dasar": dasar_h, "hist": hist},
                          tulisan={"label rentang": label_rentang, "angka h": angka_h})

        # ============ aturan: dua ikon uji tukar ========================== #
        def ikon(jenis, pusat):
            g = VGroup()
            tinggi = [0.5, 0.9, 0.65]
            lebar, jarak = (0.32, 0.5) if jenis == "batang" else (0.42, 0.42)
            warna = AKSEN2 if jenis == "batang" else AKSEN
            for i, t in enumerate(tinggi):
                r = Rectangle(width=lebar, height=t).set_stroke(warna, 1.5).set_fill(warna, 0.35)
                r.move_to(pusat + np.array([(i - 1) * jarak, t / 2 - 0.5, 0]))
                g.add(r)
            g.add(Line(pusat + np.array([-0.85, -0.5, 0]), pusat + np.array([0.85, -0.5, 0])).set_stroke(REDUP, 1.5))
            tukar = Arrow(pusat + np.array([-0.25, 0.75, 0]), pusat + np.array([0.25, 0.75, 0]),
                          buff=0, thickness=3).set_color(SOROT)
            tukar2 = Arrow(pusat + np.array([0.25, 0.9, 0]), pusat + np.array([-0.25, 0.9, 0]),
                           buff=0, thickness=3).set_color(SOROT)
            g.add(tukar, tukar2)
            tanda = rumus(r"\checkmark" if jenis == "batang" else r"\times", 34,
                          AKSEN2 if jenis == "batang" else AKSEN).move_to(pusat + np.array([1.35, 0.1, 0]))
            return VGroup(g, tanda)

        ikon_b = ikon("batang", np.array([3.2, -0.6, 0]))
        ikon_h = ikon("hist", np.array([3.2, -0.6, 0]))
        with sinema.babak(self, "aturan", DURASI, kata=KATA) as b:
            b.tunggu_kata("ujinya cuma")
            b.main(FadeOut(papan.semua()), run_time=0.5)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
            ikon_b.move_to([-2.6, -0.3, 0])
            ikon_h.move_to([2.6, -0.3, 0])
            b.tunggu_kata("tukar dua")
            self.sorot_kotak(b, hist[1], hist[2], lama=1.0)
            b.tunggu_kata("Kalau")
            b.main(FadeOut(hist), FadeOut(angka_h), FadeOut(label_rentang), FadeOut(dasar_h), FadeIn(ikon_b[0]),
                   run_time=0.8)
            b.tunggu_kata("wajib bersela")
            b.main(FadeIn(ikon_b[1], scale=1.4), run_time=0.5)
            b.tunggu_kata("jadi kacau")
            b.main(FadeIn(ikon_h[0]), run_time=0.8)
            b.tunggu_kata("wajib rapat")
            b.main(FadeIn(ikon_h[1], scale=1.4), run_time=0.5)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"ikon b": ikon_b, "ikon h": ikon_h}, tulisan={})

        # ============ lineplot: diagram titik ============================= #
        gl_x0 = -3.6
        garis_lp = sumbu_datar(gl_x0 - 0.4, gl_x0 + 20 * 0.36 + 0.4, -0.8)
        tanda_lp = VGroup()
        for v in range(0, 21, 5):
            x = gl_x0 + v * 0.36
            tanda_lp.add(Line([x, -0.88, 0], [x, -0.72, 0]).set_stroke(REDUP, 2), rumus(str(v), 20, REDUP).move_to([x, -1.12, 0]))
        tumpuk = {}
        dots_lp = VGroup()
        for v in TITIK_KECIL:
            k = tumpuk.get(v, 0)
            tumpuk[v] = k + 1
            dots_lp.add(Dot([gl_x0 + v * 0.36, -0.55 + k * 0.28, 0], radius=0.11).set_color(TINTA))

        with sinema.babak(self, "lineplot", DURASI, kata=KATA) as b:
            b.tunggu_kata("gambar lagi")
            b.main(ikon_b.animate.scale(0.6).move_to([-5.2, 2.2, 0]),
                   ikon_h.animate.scale(0.6).move_to([-2.6, 2.2, 0]), run_time=0.9)
            b.tunggu_kata("diagram titik")
            b.main(ShowCreation(garis_lp), FadeIn(tanda_lp), run_time=0.8)
            b.tunggu_kata("Tiap data")
            b.main(LaggedStartMap(lambda m: FadeIn(m, scale=1.6), dots_lp, lag_ratio=0.15), run_time=1.8)
            b.tunggu_kata("bertumpuk")
            b.main(Indicate(VGroup(dots_lp[3], dots_lp[4]), color=SOROT, scale_factor=1.5),
                   Indicate(VGroup(dots_lp[6], dots_lp[7]), color=SOROT, scale_factor=1.5), run_time=1.0)
            b.tunggu_kata("terpencil")
            b.main(Indicate(dots_lp[9], color=AKSEN, scale_factor=1.8), run_time=1.0)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan),
                          dunia={"ikon b": ikon_b, "ikon h": ikon_h, "garis lp": garis_lp, "dots": dots_lp},
                          tulisan={"tanda lp": tanda_lp})

        # ============ tutup: jenis data memilih gambarnya ================= #
        kepala_k2 = teks("kategori", 30, AKSEN2).move_to([-2.6, 1.7, 0])
        kepala_n2 = teks("angka", 30, AKSEN).move_to([2.6, 1.7, 0])
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jadi sebelum")
            b.main(FadeOut(garis_lp), FadeOut(tanda_lp), FadeOut(dots_lp), FadeOut(ident), run_time=0.6)
            self.remove(ident)
            ident = None
            b.main(ikon_b.animate.scale(1 / 0.6).move_to([-2.6, -0.3, 0]),
                   ikon_h.animate.scale(1 / 0.6).move_to([2.6, -0.3, 0]), run_time=0.9)
            b.tunggu_kata("jenisnya apa")
            b.main(FadeIn(kepala_k2, shift=DOWN * 0.2), FadeIn(kepala_n2, shift=DOWN * 0.2), run_time=0.7)
            b.tunggu_kata("memilih")
            b.main(Indicate(kepala_k2, color=SOROT), Indicate(kepala_n2, color=SOROT), run_time=1.0)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"ikon b": ikon_b, "ikon h": ikon_h},
                          tulisan={"kepala k": kepala_k2, "kepala n": kepala_n2})

        # ============ lanjut: kelas dengan lebar berbeda ================== #
        judul_lanjut = teks("Penyajian Data, Bagian 3", 30, SOROT).move_to([0, 1.9, 0])
        lebar_beda = [(150, 10, 6), (160, 5, 12), (165, 5, 10), (170, 20, 12)]
        hist2 = VGroup()
        for cm, w, f in lebar_beda:
            lebar_px = w / 10 * 1.1
            r = Rectangle(width=lebar_px, height=f * 0.16).set_stroke(AKSEN, 2).set_fill(AKSEN, 0.35)
            r.move_to([-2.2 + (cm - 150) / 10 * 1.1 + lebar_px / 2, -1.4 + f * 0.16 / 2, 0])
            hist2.add(r)
        dasar2 = sumbu_datar(-2.6, 2.6, -1.4)
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Penyajian")
            b.main(FadeOut(ikon_b), FadeOut(ikon_h), FadeOut(kepala_k2), FadeOut(kepala_n2),
                   FadeIn(judul_lanjut, shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("tidak lagi")
            b.main(ShowCreation(dasar2), LaggedStartMap(FadeIn, hist2, lag_ratio=0.2), run_time=1.2)
            b.tunggu_kata("luas")
            b.main(Indicate(hist2[3], color=SOROT, scale_factor=1.0), run_time=1.0)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={"hist2": hist2, "dasar2": dasar2},
                          tulisan={"judul": judul_lanjut})

        sinema.laporkan_pemicu(self)
