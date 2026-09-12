"""Video 03 Transformasi Geometri, Materi 06 "Memutar terhadap sebuah pusat":
Translasi, Rotasi, dan Dilatasi, Bagian 2.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (2:06)
yang sudah disetujui ARYA. DUNIANYA SAMA: jarum jam (4, 0) seperempat
putaran, bentuk L diputar 90 derajat dengan dua jari-jari B yang sama
panjang, 270 derajat, setengah putaran = cermin titik asal, jarum yang salah
arah, pusat bukan titik asal (geser, putar, geser kembali), putaran 37
derajat untuk rumus sin cos, busur tiap sudut sebagai rangkuman.

YANG BERBEDA: pembuka sub-bab plus Bagian 2 dengan pertanyaan halaman;
segar-ingat Prapeta, Peta, dan Pencerminan Bagian 4 (cermin titik asal)
yang ditagih di babak sama; ASAL RUMUS: dua langkah menuju B (6 ke kanan,
1 ke atas) ikut diputar seperempat putaran, jadi (-y, x) lahir dari
gambar; uji pada A; bentuk umum sin cos dicek pada 90 derajat; penutup
menunjuk Bagian 3; tiap kejadian dipicu pada KATA (`sinema.JamKata`).

TANPA 3D. Sudut dan jarak harus akurat. Letak kamera dari
`transformasi_umum.letak_peta`; kotak kamera berpindah per contoh (peta 90,
270, 180 derajat saling berjauhan).
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E403,F403
from gl import kamera, qc, sinema  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
from transformasi_umum import (  # noqa: E402
    L, NAMA_SUDUT, bidang_untuk, juring, kosongkan_papan, letak_peta, poligon,
    tempel_label, titik3,
)

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "transformasi3-rotasi"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

KOTAK_A = (-4.0, 7.0, -1.0, 7.0)   # jarum, bentuk, peta 90 derajat, asal rumus, uji A
KOTAK_C = (-1.0, 7.0, -7.0, 3.0)   # contoh kedua: peta 270 derajat
KOTAK_B = (-7.0, 7.0, -4.0, 4.0)   # setengah putaran
KOTAK_D = (-2.0, 5.0, -5.0, 5.0)   # kekeliruan arah, jarum jam
KOTAK_E = (-3.0, 7.0, -3.0, 6.0)   # pusat bukan titik asal
KOTAK_H = (-2.0, 7.0, 0.0, 6.0)    # bentuk umum, rangkuman, penutup

TEBAL_BENTUK = 3.2
JARI_B = (L[1][0] ** 2 + L[1][1] ** 2) ** 0.5


def putar(p, derajat):
    """Rotasi terhadap titik asal, TEPAT di kelipatan 90 derajat (tanpa debu cos 90)."""
    sisa = int(derajat) % 360
    tabel = {0: (1, 0), 90: (0, 1), 180: (-1, 0), 270: (0, -1)}
    c, s = tabel[sisa]
    return (p[0] * c - p[1] * s, p[0] * s + p[1] * c)


def putar_bebas(p, derajat):
    a = derajat * DEGREES
    return (p[0] * np.cos(a) - p[1] * np.sin(a), p[0] * np.sin(a) + p[1] * np.cos(a))


def geser(titik, dx, dy):
    return [(x + dx, y + dy) for x, y in titik]


def label_sudut(peta, arah, warna, aksen="'"):
    hasil = {}
    for i, huruf in NAMA_SUDUT.items():
        t = sinema.label(f"{huruf}{aksen}", warna=warna)
        t.next_to(titik3(peta[i]), arah[i], buff=0.22)
        hasil[huruf] = t
    return hasil


class TransformasiRotasi(AdeganMatra):
    def sorot_pita(self, b, *ruas, lama=1.0):
        pita = VGroup(*[Line(r.get_start(), r.get_end()).set_stroke(SOROT, 18, opacity=0.35) for r in ruas])
        self.add(pita)
        b.main(FadeIn(pita), run_time=lama * 0.35)
        b.main(FadeOut(pita), run_time=lama * 0.65)
        self.remove(pita)

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        asal = np.array([0.0, 0.0, 0.03])

        peta90 = [putar(p, 90) for p in L]
        peta270 = [putar(p, 270) for p in L]
        peta180 = [putar(p, 180) for p in L]

        pusat_a, tinggi_a = letak_peta(*KOTAK_A)
        bidang_a = bidang_untuk(*KOTAK_A)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat_a, tinggi=tinggi_a)

        # --- buka: judul sub-bab, jarum (4, 0) dan tanda tanya ------------ #
        jarum = Arrow(asal, np.array([4.0, 0.0, 0.03]), buff=0, thickness=5).set_color(AKSEN)
        ujung = Dot(np.array([4.0, 0.0, 0.03]), radius=0.10).set_color(AKSEN)
        l_jarum = tempel_label(sinema.label("(4, 0)", warna=AKSEN), ujung, DOWN, buff=0.20)
        tanya = sinema.label("?", 40, SOROT).move_to(np.array([1.2, 3.2, 0.03]))
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Translasi")
            sinema.judul_pembuka(self, "Translasi, Rotasi, dan Dilatasi, Bagian 2", lama=4.6, y=2.6)
            b.catat(4.6)
            b.tunggu_kata("Jarum")
            b.main(FadeIn(bidang_a), run_time=0.7)
            b.main(GrowArrow(jarum), FadeIn(ujung), FadeIn(l_jarum), run_time=0.9)
            b.tunggu_kata("di mana")
            b.main(FadeIn(tanya, scale=0.6), run_time=0.6)
        qc.periksa_adegan(self, {"jarum": jarum}, tulisan={"label jarum": l_jarum, "tanya": tanya},
                          dunia={"bidang": bidang_a})

        # --- ingat: cermin titik asal dari Bagian 4 ----------------------- #
        ident = sinema.identitas(self, "1 petak = 1 satuan")
        self.remove(ident)
        rum_ingat = None
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Prapeta")
            self.add(ident)
            b.main(FadeOut(tanya), FadeIn(ident), run_time=0.6)
            b.tunggu_kata("memberi aturan")
            rum_ingat = papan.baris(r"\text{cermin titik asal: } (x,\ y) \to (-x,\ -y)", warna=REDUP, b=b)
            b.tunggu_kata("Simpan")
            b.main(Indicate(rum_ingat, color=SOROT, scale_factor=1.0), run_time=0.9)
        qc.periksa_adegan(self, {"jarum": jarum}, hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"label jarum": l_jarum}, dunia={"bidang": bidang_a})

        # --- jarum: seperempat putaran ------------------------------------ #
        sapu_a = poligon(juring(4.0, 0.0, PI / 2), SOROT, tebal=2.0, isian=0.10)
        with sinema.babak(self, "jarum", DURASI, kata=KATA) as b:
            b.tunggu_kata("empat koma")
            b.main(Indicate(l_jarum, color=SOROT), run_time=0.8)
            b.tunggu_kata("berputar")
            b.main(ShowCreation(sapu_a), run_time=1.2)
            b.tunggu_kata("sembilan puluh")
            b.main(Indicate(sapu_a, color=AKSEN, scale_factor=1.0), run_time=0.9)
        qc.periksa_adegan(self, {"jarum": jarum, "sapuan": sapu_a},
                          hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"label jarum": l_jarum}, dunia={"bidang": bidang_a})

        # --- jawab: jarumnya berputar ------------------------------------- #
        l_jawab = sinema.label("(0, 4)", warna=AKSEN)
        l_jawab.next_to(np.array([0.0, 4.0, 0.03]), RIGHT, buff=0.24)
        with sinema.babak(self, "jawab", DURASI, kata=KATA) as b:
            b.tunggu_kata("mendarat")
            b.main(Rotate(jarum, PI / 2, about_point=asal), Rotate(ujung, PI / 2, about_point=asal),
                   FadeOut(l_jarum), FadeIn(l_jawab), run_time=1.6)
            b.tunggu_kata("tetap")
            b.main(Indicate(jarum, color=SOROT), run_time=0.9)
            b.tunggu_kata("arahnya")
            b.main(Indicate(sapu_a, color=AKSEN, scale_factor=1.0), FadeOut(sapu_a), run_time=0.9)
        qc.periksa_adegan(self, {"jarum": jarum}, hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"label jawab": l_jawab}, dunia={"bidang": bidang_a})

        # --- bentuk: bentuk L diputar 90 derajat, tiap sudut di busurnya -- #
        prapeta = poligon(L, TINTA, tebal=TEBAL_BENTUK, isian=0.08)
        nama_pra = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(huruf, warna=TINTA)
            t.next_to(titik3(L[i]), DOWN if i < 2 else UP, buff=0.22)
            nama_pra[huruf] = t
        peta_a = poligon(peta90, AKSEN2, tebal=TEBAL_BENTUK, isian=0.12)
        nama_a = label_sudut(peta90, {0: RIGHT, 1: RIGHT, 2: UP}, AKSEN2)
        busur90 = VGroup(*[Arc(start_angle=np.arctan2(L[i][1], L[i][0]), angle=PI / 2,
                               radius=(L[i][0] ** 2 + L[i][1] ** 2) ** 0.5, arc_center=asal).set_stroke(SOROT, 2.4)
                           for i in NAMA_SUDUT])
        with sinema.babak(self, "bentuk", DURASI, kata=KATA) as b:
            b.tunggu_kata("bentuk L")
            b.main(FadeOut(jarum), FadeOut(ujung), FadeOut(l_jawab), ShowCreation(prapeta),
                   *[FadeIn(nama_pra[h]) for h in nama_pra], run_time=1.2)
            b.tunggu_kata("sembilan puluh")
            b.main(ShowCreation(peta_a), *[FadeIn(nama_a[h]) for h in nama_a], run_time=1.4)
            b.tunggu_kata("busurnya")
            b.main(ShowCreation(busur90), run_time=1.2)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_a, "busur": busur90},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang_a})

        # --- jari: dua jarak ke pusat, sama ------------------------------- #
        jari_1 = Line(asal, titik3(L[1])).set_stroke(AKSEN, 3.0)
        jari_2 = Line(asal, titik3(peta90[1])).set_stroke(AKSEN, 3.0)
        angka_1 = sinema.label(f"{JARI_B:.2f}".replace(".", ","), warna=AKSEN)
        angka_1.next_to(jari_1.get_center(), DOWN, buff=0.18)
        angka_2 = sinema.label(f"{JARI_B:.2f}".replace(".", ","), warna=AKSEN)
        angka_2.next_to(jari_2.get_center(), LEFT, buff=0.18)
        with sinema.babak(self, "jari", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dua angka")
            b.main(FadeOut(busur90), ShowCreation(jari_1), ShowCreation(jari_2), FadeIn(angka_1), FadeIn(angka_2),
                   run_time=1.4)
            b.tunggu_kata("sama")
            b.main(Indicate(angka_1, color=SOROT), Indicate(angka_2, color=SOROT), run_time=1.0)
            b.tunggu_kata("ciri rotasi")
            self.sorot_pita(b, jari_1, jari_2, lama=1.0)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_a},
                          hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"angka 1": angka_1, "angka 2": angka_2}, dunia={"bidang": bidang_a})

        # --- asal: dua langkah menuju B ikut diputar ---------------------- #
        langkah_datar = Line(asal, titik3((6.0, 0.0))).set_stroke(SOROT, 5.0)
        langkah_tegak = Line(titik3((6.0, 0.0)), titik3(L[1])).set_stroke(AKSEN2, 5.0)
        l_enam = sinema.label("6 kanan", warna=SOROT).next_to(titik3((3.0, 0.0)), DOWN, buff=0.5)
        l_satu = sinema.label("1 atas", warna=AKSEN2).next_to(titik3((6.0, 0.5)), RIGHT, buff=0.2)
        langkah = VGroup(langkah_datar, langkah_tegak)
        # Kedua langkah yang sudah diputar berimpit dengan sumbu y dan tepi atas
        # peta, jadi labelnya tidak boleh di kiri sumbu (menindih angka sumbu 3,
        # terlihat di lembar kontak 12 Sep 2026): "6 atas" di KANAN sumbu, di
        # atas prapeta; "1 kiri" di sela angka 6 dan 7.
        l_enam2 = sinema.label("6 atas", warna=SOROT).move_to(titik3((0.8, 4.2)))
        l_satu2 = sinema.label("1 kiri", warna=AKSEN2).move_to(titik3((-0.55, 6.55)))
        with sinema.babak(self, "asal", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dari mana")
            b.main(FadeOut(jari_1), FadeOut(jari_2), FadeOut(angka_1), FadeOut(angka_2), run_time=0.5)
            b.tunggu_kata("enam langkah")
            b.main(ShowCreation(langkah_datar), FadeIn(l_enam), run_time=0.9)
            b.tunggu_kata("satu langkah")
            b.main(ShowCreation(langkah_tegak), FadeIn(l_satu), run_time=0.8)
            b.tunggu_kata("Putar kedua")
            b.main(Rotate(langkah, PI / 2, about_point=asal), FadeOut(l_enam), FadeOut(l_satu), run_time=1.6)
            b.tunggu_kata("enam ke atas")
            b.main(FadeIn(l_enam2), Indicate(langkah_datar, color=SOROT, scale_factor=1.0), run_time=0.9)
            b.tunggu_kata("satu ke kiri")
            b.main(FadeIn(l_satu2), Indicate(langkah_tegak, color=AKSEN2, scale_factor=1.0), run_time=0.9)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_a, "langkah": langkah},
                          hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"6 atas": l_enam2, "1 kiri": l_satu2}, dunia={"bidang": bidang_a})

        # --- rumus: B' = (-1, 6), lalu aturannya lahir -------------------- #
        dot_bpeta = Dot(titik3(peta90[1]), radius=0.13).set_color(SOROT)
        with sinema.babak(self, "rumus", DURASI, kata=KATA) as b:
            b.tunggu_kata("mendarat")
            b.main(FadeIn(dot_bpeta, scale=0.4), run_time=0.5)
            papan.baris(r"B(6,\ 1) \to B'(-1,\ 6)", warna=AKSEN2, b=b)
            b.tunggu_kata("Untuk titik")
            b.main(FadeOut(l_enam2), FadeOut(l_satu2), FadeOut(langkah), run_time=0.5)
            b.tunggu_kata("Aturannya")
            rum = sinema.lahir_rumus(self, r"(x,\ y) \to (-y,\ x)", dekat=peta_a, papan=papan, b=b, warna=AKSEN2,
                                     tahan=0.5, run_time=1.0)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_a, "titik B aksen": dot_bpeta},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang_a})

        # --- periksa: aturannya diuji pada titik A ------------------------ #
        dot_a = Dot(titik3(L[0]), radius=0.13).set_color(AKSEN)
        dot_apeta = Dot(titik3(peta90[0]), radius=0.13).set_color(SOROT)
        with sinema.babak(self, "periksa", DURASI, kata=KATA) as b:
            b.tunggu_kata("titik A")
            b.main(FadeIn(dot_a, scale=0.4), Indicate(nama_pra["A"], color=AKSEN), run_time=0.8)
            b.tunggu_kata("Tukar")
            papan.baris(r"A(1,\ 1) \to \text{tukar } (1,\ 1)", warna=REDUP, b=b)
            b.tunggu_kata("negatif satu")
            papan.baris(r"\to A'(-1,\ 1)", warna=AKSEN2, b=b)
            b.tunggu_kata("Cocok")
            b.main(FadeIn(dot_apeta, scale=0.4), Indicate(nama_a["A"], color=SOROT), run_time=0.9)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_a, "titik A": dot_a, "titik A aksen": dot_apeta},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang_a})

        # --- kedua: tiga perempat putaran, kamera turun ------------------- #
        pusat_c, tinggi_c = letak_peta(*KOTAK_C)
        bidang_c = bidang_untuk(*KOTAK_C)
        peta_c = poligon(peta270, AKSEN2, tebal=TEBAL_BENTUK, isian=0.12)
        nama_c = label_sudut(peta270, {0: UP, 1: LEFT, 2: DOWN}, AKSEN2, aksen="''")
        with sinema.babak(self, "kedua", DURASI, kata=KATA) as b:
            b.tunggu_kata("Contoh kedua")
            kosongkan_papan(self, papan, b=b, run_time=0.5)
            b.main(FadeOut(peta_a), *[FadeOut(nama_a[h]) for h in nama_a], FadeOut(dot_a), FadeOut(dot_apeta),
                   FadeOut(dot_bpeta), run_time=0.6)
            b.tunggu_kata("tiga perempat")
            b.main(kamera.dunia_ke_peta(frame, pusat=pusat_c, tinggi=tinggi_c), FadeOut(bidang_a), FadeIn(bidang_c),
                   run_time=1.2)
            b.tunggu_kata("dua ratus")
            b.main(ShowCreation(peta_c), *[FadeIn(nama_c[h]) for h in nama_c], run_time=1.2)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_c},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang_c})

        # --- cocok: aturannya berubah, diperiksa pada B ------------------- #
        jari_3 = Line(asal, titik3(L[1])).set_stroke(AKSEN, 3.0)
        jari_4 = Line(asal, titik3(peta270[1])).set_stroke(AKSEN, 3.0)
        angka_3 = sinema.label(f"{JARI_B:.2f}".replace(".", ","), warna=AKSEN)
        angka_3.next_to(jari_3.get_center(), UP, buff=0.18)
        angka_4 = sinema.label(f"{JARI_B:.2f}".replace(".", ","), warna=AKSEN)
        angka_4.next_to(jari_4.get_center(), RIGHT, buff=0.18)
        with sinema.babak(self, "cocok", DURASI, kata=KATA) as b:
            b.tunggu_kata("Aturannya")
            rum = sinema.ganti_rumus(self, rum, r"(x,\ y) \to (y,\ -x)", b=b, run_time=1.0, warna=AKSEN2, papan=papan)
            b.tunggu_kata("Titik B")
            papan.baris(r"B(6,\ 1) \to B''(1,\ -6)", warna=AKSEN, b=b)
            b.tunggu_kata("jaraknya")
            b.main(ShowCreation(jari_3), ShowCreation(jari_4), FadeIn(angka_3), FadeIn(angka_4), run_time=1.0)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_c},
                          hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"angka 3": angka_3, "angka 4": angka_4}, dunia={"bidang": bidang_c})

        # --- janji: setengah putaran, kamera melebar ---------------------- #
        pusat_b, tinggi_b = letak_peta(*KOTAK_B)
        bidang_b = bidang_untuk(*KOTAK_B)
        peta_b = poligon(peta180, SOROT, tebal=TEBAL_BENTUK, isian=0.12)
        nama_b = label_sudut(peta180, {0: UP, 1: UP, 2: DOWN}, SOROT, aksen="'''")
        with sinema.babak(self, "janji", DURASI, kata=KATA) as b:
            b.tunggu_kata("setengah")
            kosongkan_papan(self, papan, b=b, run_time=0.5)
            b.main(FadeOut(peta_c), *[FadeOut(nama_c[h]) for h in nama_c], FadeOut(jari_3), FadeOut(jari_4),
                   FadeOut(angka_3), FadeOut(angka_4), run_time=0.6)
            b.main(kamera.dunia_ke_peta(frame, pusat=pusat_b, tinggi=tinggi_b), FadeOut(bidang_c), FadeIn(bidang_b),
                   run_time=1.2)
            b.tunggu_kata("hasilnya")
            b.main(ShowCreation(peta_b), *[FadeIn(nama_b[h]) for h in nama_b], run_time=1.0)
            b.tunggu_kata("negatif x")
            rum = sinema.ganti_rumus(self, rum, r"(x,\ y) \to (-x,\ -y)", b=b, run_time=1.0, warna=SOROT, papan=papan)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_b},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang_b})

        # --- sama: janji Bagian 4 terbukti -------------------------------- #
        tanda_asal = Dot(asal, radius=0.14).set_color(SOROT)
        with sinema.babak(self, "sama", DURASI, kata=KATA) as b:
            b.tunggu_kata("persis")
            # rum_ingat sudah dibuang kosongkan_papan di babak "kedua". Ia
            # dimunculkan lagi di sini DAN didaftarkan ulang sebagai baris papan;
            # tanpa pendaftaran itu, baris "-90 = 270" di babak "betul" jatuh
            # tepat di atasnya (terlihat di lembar kontak 12 Sep 2026).
            papan.baris_lain.append(rum_ingat)
            b.main(FadeIn(rum_ingat), run_time=0.4)
            b.main(Indicate(rum_ingat, color=SOROT, scale_factor=1.0), run_time=0.8)
            b.tunggu_kata("satu hal")
            b.main(Indicate(rum, color=SOROT, scale_factor=1.0), run_time=1.0)
            b.tunggu_kata("cermin titik")
            b.main(FadeIn(tanda_asal, scale=0.4), Indicate(peta_b, color=AKSEN2, scale_factor=1.0), run_time=1.0)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_b, "titik asal": tanda_asal},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang_b})

        # --- keliru: arah putarnya dibalik, memakai jarum jam ------------- #
        pusat_d, tinggi_d = letak_peta(*KOTAK_D)
        bidang_d = bidang_untuk(*KOTAK_D)
        jarum_salah = Arrow(asal, np.array([4.0, 0.0, 0.03]), buff=0, thickness=5).set_color(AKSEN)
        sapu_salah = poligon(juring(4.0, -PI / 2, 0.0), AKSEN, tebal=2.0, isian=0.10)
        l_salah = sinema.label("(0, -4)", warna=AKSEN)
        l_salah.next_to(np.array([0.0, -4.0, 0.03]), RIGHT, buff=0.24)
        with sinema.babak(self, "keliru", DURASI, kata=KATA) as b:
            b.tunggu_kata("kekeliruan")
            kosongkan_papan(self, papan, b=b, run_time=0.5)
            b.main(FadeOut(prapeta), *[FadeOut(nama_pra[h]) for h in nama_pra], FadeOut(peta_b),
                   *[FadeOut(nama_b[h]) for h in nama_b], FadeOut(tanda_asal), run_time=0.6)
            b.main(kamera.dunia_ke_peta(frame, pusat=pusat_d, tinggi=tinggi_d), FadeOut(bidang_b), FadeIn(bidang_d),
                   run_time=1.0)
            # Rumus utama dikembalikan ke seperempat putaran: tiga babak berikutnya soal 90 derajat.
            rum = sinema.ganti_rumus(self, rum, r"(x,\ y) \to (-y,\ x)", b=b, run_time=0.7, warna=AKSEN2, papan=papan)
            b.tunggu_kata("Jarum merah")
            b.main(GrowArrow(jarum_salah), run_time=0.8)
            b.tunggu_kata("searah")
            b.main(Rotate(jarum_salah, -PI / 2, about_point=asal), ShowCreation(sapu_salah), FadeIn(l_salah),
                   run_time=1.4)
        qc.periksa_adegan(self, {"jarum salah": jarum_salah, "sapuan salah": sapu_salah},
                          hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"label salah": l_salah}, dunia={"bidang": bidang_d})

        # --- betul: sudut positif berlawanan arah jarum jam --------------- #
        jarum_benar = Arrow(asal, np.array([4.0, 0.0, 0.03]), buff=0, thickness=5).set_color(AKSEN2)
        sapu_benar = poligon(juring(4.0, 0.0, PI / 2), AKSEN2, tebal=2.0, isian=0.10)
        l_benar = sinema.label("(0, 4)", warna=AKSEN2)
        l_benar.next_to(np.array([0.0, 4.0, 0.03]), RIGHT, buff=0.24)
        with sinema.babak(self, "betul", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sudut positif")
            b.main(GrowArrow(jarum_benar), run_time=0.7)
            b.tunggu_kata("berlawanan")
            b.main(Rotate(jarum_benar, PI / 2, about_point=asal), ShowCreation(sapu_benar), FadeIn(l_benar), run_time=1.4)
            b.tunggu_kata("seberang")
            papan.baris(r"-90^\circ = 270^\circ", warna=REDUP, b=b)
            b.tunggu_kata("berlawanan", ke=2)
            b.main(Indicate(l_salah, color=SOROT), Indicate(l_benar, color=SOROT), run_time=1.0)
        qc.periksa_adegan(self, {"jarum salah": jarum_salah, "jarum benar": jarum_benar, "sapuan salah": sapu_salah,
                                 "sapuan benar": sapu_benar},
                          hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"label salah": l_salah, "label benar": l_benar}, dunia={"bidang": bidang_d})

        # --- pusat: pusatnya bukan titik asal ----------------------------- #
        P = (3.0, 2.0)
        pusat_e, tinggi_e = letak_peta(*KOTAK_E)
        bidang_e = bidang_untuk(*KOTAK_E)
        hantu = poligon(L, REDUP, tebal=2.0, isian=0.04)
        gerak = poligon(L, AKSEN2, tebal=TEBAL_BENTUK, isian=0.12)
        langkah1 = geser(L, -P[0], -P[1])
        langkah2 = [putar(p, 90) for p in langkah1]
        langkah3 = geser(langkah2, P[0], P[1])
        tanda_p = Dot(titik3(P), radius=0.14).set_color(SOROT)
        l_p = tempel_label(sinema.label("pusat", warna=SOROT), tanda_p, UP, buff=0.20)
        with sinema.babak(self, "pusat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kalau")
            kosongkan_papan(self, papan, b=b, run_time=0.5)
            b.main(FadeOut(jarum_salah), FadeOut(jarum_benar), FadeOut(sapu_salah), FadeOut(sapu_benar),
                   FadeOut(l_salah), FadeOut(l_benar), run_time=0.5)
            b.main(kamera.dunia_ke_peta(frame, pusat=pusat_e, tinggi=tinggi_e), FadeOut(bidang_d), FadeIn(bidang_e),
                   FadeIn(hantu), FadeIn(gerak), FadeIn(tanda_p), FadeIn(l_p), run_time=1.2)
            b.tunggu_kata("Geser")
            b.main(Transform(gerak, poligon(langkah1, AKSEN2, tebal=TEBAL_BENTUK, isian=0.12)), run_time=1.2)
            b.tunggu_kata("putar")
            b.main(Transform(gerak, poligon(langkah2, AKSEN2, tebal=TEBAL_BENTUK, isian=0.12)), run_time=1.0)
            b.tunggu_kata("geser kembali")
            b.main(Transform(gerak, poligon(langkah3, AKSEN2, tebal=TEBAL_BENTUK, isian=0.12)), run_time=1.2)
        qc.periksa_adegan(self, {"hantu": hantu, "gerak": gerak, "pusat": tanda_p},
                          hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"label pusat": l_p}, dunia={"bidang": bidang_e})

        # --- umum: rumus sin cos, diperagakan 37 derajat, dicek pada 90 --- #
        pusat_h, tinggi_h = letak_peta(*KOTAK_H)
        bidang_h = bidang_untuk(*KOTAK_H)
        peta_bebas = poligon([putar_bebas(p, 37.0) for p in L], AKSEN2, tebal=3.0, isian=0.12)
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bentuk")
            # rum_ingat sudah dibuang lagi oleh kosongkan_papan di babak "keliru";
            # jangan di-FadeOut di sini (ManimGL menambahkan kembali benda yang
            # dianimasikan, jadi ia akan berkedip 0,5 detik).
            b.main(FadeOut(gerak), FadeOut(hantu), FadeOut(tanda_p), FadeOut(l_p), FadeOut(rum), run_time=0.5)
            papan.utama = None
            b.main(kamera.dunia_ke_peta(frame, pusat=pusat_h, tinggi=tinggi_h), FadeOut(bidang_e), FadeIn(bidang_h),
                   FadeIn(prapeta), *[FadeIn(nama_pra[h]) for h in nama_pra], run_time=1.2)
            b.tunggu_kata("x cos")
            rum = papan.tumbuh(r"(x\cos a - y\sin a,\ x\sin a + y\cos a)", run_time=1.0, b=b)
            b.main(ShowCreation(peta_bebas), run_time=1.2)
            b.tunggu_kata("Coba")
            papan.baris(r"a = 90^\circ:\ \cos a = 0,\ \sin a = 1", warna=REDUP, b=b)
            b.tunggu_kata("lahirlah")
            papan.baris(r"(x,\ y) \to (-y,\ x)", warna=AKSEN2, b=b)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_bebas},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang_h})

        # --- rangkum: jarak ke pusat tetap, arahnya yang berubah ---------- #
        busur = VGroup(*[Arc(start_angle=np.arctan2(L[i][1], L[i][0]), angle=37.0 * DEGREES,
                             radius=(L[i][0] ** 2 + L[i][1] ** 2) ** 0.5, arc_center=asal).set_stroke(SOROT, 3.0)
                         for i in NAMA_SUDUT])
        with sinema.babak(self, "rangkum", DURASI, kata=KATA) as b:
            b.tunggu_kata("menjaga jarak")
            b.main(ShowCreation(busur), run_time=1.4)
            b.tunggu_kata("arahnya")
            b.main(Indicate(peta_bebas, color=SOROT, scale_factor=1.0), run_time=1.0)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_bebas, "busur": busur},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang_h})

        # --- lanjut: titik di pusat, lalu Bagian 3 (diperbesar) ----------- #
        tanya_titik = Dot(asal, radius=0.16).set_color(AKSEN)
        l_tanya = tempel_label(sinema.label("di sini?", warna=AKSEN), tanya_titik, UL, buff=0.24)
        besar = poligon([(2 * x, 2 * y) for x, y in L], AKSEN, tebal=3.0, isian=0.10)
        judul_lanjut = teks("Translasi, Rotasi, dan Dilatasi, Bagian 3", 30, SOROT).move_to([0, 2.9, 0]).fix_in_frame()
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("tepat berada")
            b.main(FadeIn(tanya_titik, scale=0.4), FadeIn(l_tanya), run_time=0.8)
            b.tunggu_kata("Di materi")
            b.main(FadeOut(tanya_titik), FadeOut(l_tanya), FadeOut(busur), FadeOut(peta_bebas), FadeOut(papan.semua()),
                   run_time=0.6)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self)
            self.hud_tambah(judul_lanjut)
            b.tunggu_kata("Bagian")
            b.main(FadeIn(judul_lanjut, shift=0.2 * UP), run_time=0.7)
            b.tunggu_kata("diperbesar")
            b.main(TransformFromCopy(prapeta, besar), run_time=1.2)
        qc.periksa_adegan(self, {"prapeta": prapeta, "besar": besar},
                          hud={"identitas": ident, "judul": judul_lanjut}, dunia={"bidang": bidang_h})

        sinema.laporkan_pemicu(self)
