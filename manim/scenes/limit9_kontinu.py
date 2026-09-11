"""Limit Trigonometri dan Kekontinuan, Bagian 2 (Materi 09): fungsi yang tidak putus.
STANDAR VIDEO v3.1, ditulis ulang 12 Sep 2026 dari adegan Manim CE yang sudah
disetujui ARYA. ISINYA SAMA: rel roller coaster boleh apa saja kecuali ada
potongan yang hilang; kontinu di c kalau nilai ada, limit ada, dan sama;
f(x) = x + 1 mulus di x = 2; empat cara merusak: berlubang, digeser, melompat,
meledak, masing-masing dengan lampu syarat yang menyala atau padam; ketiga
kerusakan pertama sudah ditemui; janji substitusi langsung dilunasi: suku
banyak kontinu, dan kontinu berarti limit = nilai; substitusi bukan definisi
limit melainkan akibat kekontinuan.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 2; segar-ingat Bagian 1 (sin x : x
  dijepit menuju 1).
- Contoh angka pada fungsi mulus: 1,9 memberi 2,9 dan 2,1 memberi 3,1.
- Keterangan kerusakan TIDAK ditulis sebagai kalimat; yang bercerita adalah
  gambar dan tiga lampu syarat (biru lolos, merah gagal).
- Rujukan kerusakan memakai nama sub-bab dan bagian.
- Rumus lahir besar di fokus lalu terbang ke panel: f(x) = x + 1 dan
  lim f(x) = f(c).
- Tiap kejadian dipicu pada kata yang mengucapkannya.

WARNA: tinta = kurva, ungu = titik dan sorot, biru = syarat lolos dan arah
kiri, merah = syarat gagal, titik yang digeser, dan arah kanan.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "limit9-kontinu"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

PUSAT_GRAFIK = np.array([-3.55, -0.1, 0.0])
X_LAMPU = 1.9
X_SYARAT = 2.35
Y_SYARAT = [2.3, 1.7, 1.1]
X_KANAN = 4.0
C = 2.0


def dasar(x):
    return x + 1.0


def hud(ident, papan):
    isi = {"identitas": ident} if ident is not None else {}
    p = papan.semua()
    if p is not None:
        isi["papan"] = p
    return isi


def pita_atas(m, warna=SOROT):
    return SurroundingRectangle(m, buff=0.08).set_fill(warna, 0.18).set_stroke(width=0)


class FungsiTidakPutus(AdeganMatra):
    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
        ident = None

        # ============ buka: kurva yang digambar tanpa mengangkat pensil == #
        pensil = ParametricCurve(lambda t: np.array([t, 0.35 + 0.9 * np.sin(1.1 * t) + 0.25 * t, 0.0]),
                                 t_range=(-4.5, 4.5, 0.05)).set_stroke(TINTA, 5)
        tanya = teks("Apa bedanya grafik yang bisa digambar tanpa mengangkat pensil?", 34, TINTA)
        tanya.move_to([0, -1.9, 0])
        sinema.batasi_lebar(tanya, 11.0)
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Limit")
            sinema.judul_pembuka(self, "Limit Trigonometri dan Kekontinuan, Bagian 2", lama=3.8)
            b.catat(3.8)
            b.tunggu_kata("Apa")
            b.main(Write(tanya), run_time=1.3)
            b.tunggu_kata("digambar")
            b.main(ShowCreation(pensil), run_time=1.8, rate_func=linear)
        qc.periksa_adegan(self, {"pensil": pensil}, hud=hud(ident, papan), tulisan={"tanya": tanya})

        # ============ segar-ingat: sin x : x dijepit ===================== #
        ingat_lim = rumus(r"\lim_{x \to 0} \frac{\sin x}{x} = 1", 44, TINTA).move_to([0, 0.8, 0])
        ingat_jepit = rumus(r"\cos x < \frac{x}{\sin x} < \frac{1}{\cos x}", 36, SOROT).move_to([0, -0.7, 0])
        putus = VGroup(Line([-4.0, -0.9, 0], [-0.8, 0.3, 0]), Line([0.2, -0.1, 0], [4.0, 1.0, 0])).set_stroke(AKSEN, 5)
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("materi sebelumnya")
            ident = sinema.identitas(self, "ingat Bagian 1")
            ident.set_opacity(0.0)
            b.main(FadeOut(tanya), ident.animate.set_opacity(1.0), run_time=0.5)
            # Kurva pensil dibuang bersamaan rumus ditulis (pada "Limit"), bukan di
            # awal babak: kalau di awal, layar kosong empat detik.
            b.tunggu_kata("Limit")
            b.main(FadeOut(pensil), Write(ingat_lim), run_time=1.0)
            b.tunggu_kata("dijepit")
            b.main(Write(ingat_jepit), run_time=1.3)
            b.tunggu_kata("Kali")
            b.main(FadeOut(ingat_lim), FadeOut(ingat_jepit), FadeOut(ident), run_time=0.5)
            ident = None
            b.tunggu_kata("kumpulkan")
            b.main(ShowCreation(putus), run_time=0.8)
            b.tunggu_kata("putus")
            b.main(Flash(putus.get_center(), color=AKSEN, flash_radius=0.4, line_length=0.2), run_time=0.6)
        qc.periksa_adegan(self, {"putus": putus}, hud=hud(ident, papan))

        # ============ rel roller coaster ================================= #
        rel = ParametricCurve(lambda t: np.array([t, 0.2 + 1.0 * np.sin(0.9 * t) - 0.12 * t, 0.0]),
                              t_range=(-5.2, 5.2, 0.05)).set_stroke(TINTA, 5)
        # lingkaran "berputar" menempel pada rel di t = 1,9
        t_loop = -0.5   # di kiri tengah, jauh dari kolom syarat di kanan
        p_loop = np.array([t_loop, 0.2 + np.sin(0.9 * t_loop) - 0.12 * t_loop, 0.0])
        loop = Circle(radius=0.55).move_to(p_loop + UP * 0.55).set_stroke(TINTA, 4)
        # Potongan rel yang hilang: rel dipecah tiga, potongan tengahnya
        # dipudarkan. Menutupnya dengan kotak sewarna kertas meninggalkan
        # kotak samar di video (warna isian dan latar beda dua tingkat).
        def rel_potong(t0, t1):
            return ParametricCurve(lambda t: np.array([t, 0.2 + 1.0 * np.sin(0.9 * t) - 0.12 * t, 0.0]),
                                   t_range=(t0, t1, 0.05)).set_stroke(TINTA, 5)

        rel_kiri, hilang, rel_kanan = rel_potong(-5.2, -2.75), rel_potong(-2.75, -1.85), rel_potong(-1.85, 5.2)
        tanda_hilang = rumus("?", 40, AKSEN).move_to([-2.3, 0.2 + np.sin(0.9 * -2.3) + 0.12 * 2.3 + 0.75, 0])
        with sinema.babak(self, "rel", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bayangkan")
            b.main(FadeOut(putus), run_time=0.3)
            ident = sinema.identitas(self, "rel roller coaster")
            ident.set_opacity(0.0)
            b.main(ident.animate.set_opacity(1.0), run_time=0.3)
            b.tunggu_kata("rel")
            b.main(ShowCreation(rel), run_time=1.8, rate_func=linear)
            b.tunggu_kata("berputar")
            b.main(ShowCreation(loop), run_time=0.8)
            b.tunggu_kata("potongan")
            self.remove(rel)
            self.add(rel_kiri, hilang, rel_kanan)
            b.main(FadeOut(hilang), run_time=0.4)
            b.tunggu_kata("hilang")
            b.main(FadeIn(tanda_hilang, scale=1.4), run_time=0.5)
        rel = VGroup(rel_kiri, rel_kanan)
        qc.periksa_adegan(self, {"rel": rel, "loop": loop}, hud=hud(ident, papan), tulisan={"tanda": tanda_hilang})

        # ============ tiga syarat kontinu di c =========================== #
        def baris_syarat(i, isi):
            lampu = Dot([X_LAMPU, Y_SYARAT[i], 0], radius=0.11).set_color(REDUP)
            m = isi.move_to([X_SYARAT + isi.get_width() / 2, Y_SYARAT[i], 0])
            return VGroup(lampu, m)

        s1 = baris_syarat(0, VGroup(rumus("f(c)", 28, TINTA), sinema.label("ada", ukuran=26, warna=TINTA)).arrange(RIGHT, buff=0.25))
        s2 = baris_syarat(1, VGroup(rumus(r"\lim_{x \to c} f(x)", 28, TINTA), sinema.label("ada", ukuran=26, warna=TINTA)).arrange(RIGHT, buff=0.25))
        s3 = baris_syarat(2, rumus(r"\lim_{x \to c} f(x) = f(c)", 28, TINTA))
        syarat = VGroup(s1, s2, s3)

        def lampu(nyala):
            """Warna lampu: True biru (lolos), False merah (gagal), None redup."""
            aksi = []
            for s, ok in zip(syarat, nyala):
                warna = REDUP if ok is None else (AKSEN2 if ok else AKSEN)
                aksi.append(s[0].animate.set_color(warna))
            return aksi

        with sinema.babak(self, "syarat", DURASI, kata=KATA) as b:
            b.tunggu_kata("fungsi")
            # Rel dibiarkan sampai babak "mulus": tiga baris syarat saja terlalu
            # tipis, cek_layar_kosong menganggap layar kosong enam detik.
            b.main(FadeOut(ident), run_time=0.3)
            ident = sinema.identitas(self, "tiga syarat")
            ident.set_opacity(0.0)
            b.main(ident.animate.set_opacity(1.0), run_time=0.3)
            b.tunggu_kata("Nilainya")
            b.main(FadeIn(s1, shift=LEFT * 0.15), run_time=0.6)
            b.tunggu_kata("limitnya")
            b.main(FadeIn(s2, shift=LEFT * 0.15), run_time=0.6)
            b.tunggu_kata("keduanya")
            b.main(FadeIn(s3, shift=LEFT * 0.15), run_time=0.6)
        qc.periksa_adegan(self, {"rel": rel, "loop": loop}, hud=hud(ident, papan),
                          tulisan={"syarat": syarat, "tanda": tanda_hilang})

        # ============ fungsi mulus: f(x) = x + 1 di x = 2 ================ #
        sumbu = Axes(x_range=(-0.4, 4.4, 1), y_range=(-0.4, 8.4, 2), width=5.2, height=4.0,
                     axis_config=dict(stroke_color=REDUP, stroke_width=2.2))
        sumbu.move_to(PUSAT_GRAFIK)
        cp = sumbu.c2p
        angka = VGroup(*[rumus(str(i), 20, REDUP).next_to(cp(i, 0), DOWN, buff=0.12) for i in (1, 2, 3, 4)],
                       *[rumus(str(j), 20, REDUP).next_to(cp(0, j), LEFT, buff=0.12) for j in (2, 4, 6, 8)])
        sumbu.angka = angka
        sumbu.latar = True
        dunia = {"sumbu": sumbu}

        def kurva_mulus(x0=-0.35, x1=4.35):
            return ParametricCurve(lambda x: cp(x, dasar(x)), t_range=(x0, x1, 0.05)).set_stroke(TINTA, 4.5)

        def titik_isi(x, y, warna=SOROT):
            return Dot(cp(x, y), radius=0.09).set_color(warna)

        def titik_bolong(x, y, warna=SOROT):
            return Circle(radius=0.12).move_to(cp(x, y)).set_stroke(warna, 3.5).set_fill(LATAR, 1.0)

        bantu = DashedLine(cp(C, -0.35), cp(C, 8.3), dash_length=0.12).set_stroke(SOROT, 1.6, opacity=0.7)
        kurva = kurva_mulus()
        titik = titik_isi(C, dasar(C))
        lab3 = rumus("3", 22, SOROT).next_to(cp(0, 3), LEFT, buff=0.12)
        pandu3 = DashedLine(cp(0, 3), cp(C, 3), dash_length=0.1).set_stroke(SOROT, 1.4)
        c19 = rumus(r"x = 1{,}9:\ 2{,}9", 26, AKSEN2).move_to([X_KANAN, 0.3, 0])
        c21 = rumus(r"x = 2{,}1:\ 3{,}1", 26, AKSEN).move_to([X_KANAN, -0.25, 0])
        with sinema.babak(self, "mulus", DURASI, kata=KATA) as b:
            b.tunggu_kata("Pada")
            b.main(FadeOut(rel), FadeOut(loop), FadeOut(tanda_hilang), run_time=0.4)
            b.tunggu_kata("mulus")
            b.main(ShowCreation(sumbu), FadeIn(angka), run_time=0.9)
            b.main(ShowCreation(kurva), FadeIn(bantu), run_time=1.0)
            b.tunggu_kata("f")
            sinema.lahir_rumus(self, r"f(x) = x + 1", kurva, papan, b=b, warna=TINTA, sebagai_utama=False,
                               geser=np.array([1.2, 1.4, 0.0]), tahan=0.5)
            b.tunggu_kata("Titik")
            b.main(FadeIn(titik, scale=1.5), ShowCreation(pandu3), FadeIn(lab3), run_time=0.8)
            b.tunggu_kata("nilai")
            b.main(*lampu([True, None, None]), run_time=0.5)
            b.tunggu_kata("Di satu koma")
            b.main(FadeIn(c19, shift=LEFT * 0.1), run_time=0.6)
            b.tunggu_kata("di dua koma")
            b.main(FadeIn(c21, shift=LEFT * 0.1), run_time=0.6)
            b.tunggu_kata("limitnya")
            b.main(*lampu([True, True, None]), run_time=0.5)
            b.tunggu_kata("berimpit")
            b.main(*lampu([True, True, True]), run_time=0.5)
        gambar = VGroup(kurva, titik)
        contoh = VGroup(c19, c21)
        qc.periksa_adegan(self, {"gambar": gambar, "bantu": bantu, "pandu": pandu3}, hud=hud(ident, papan),
                          dunia=dunia, tulisan={"syarat": syarat, "3": lab3, "contoh": contoh})

        # ============ cara pertama: berlubang ============================ #
        bolong = titik_bolong(C, dasar(C))
        with sinema.babak(self, "lubang", DURASI, kata=KATA) as b:
            b.tunggu_kata("rusak")
            b.main(FadeOut(contoh), FadeOut(ident), run_time=0.3)
            ident = sinema.identitas(self, "dibuat rusak")
            ident.set_opacity(0.0)
            b.main(ident.animate.set_opacity(1.0), run_time=0.3)
            b.tunggu_kata("berlubang")
            b.main(FadeOut(titik, scale=0.3), run_time=0.3)
            b.main(FadeIn(bolong, scale=1.5), run_time=0.4)
            b.tunggu_kata("gagal")
            b.main(*lampu([False, True, False]), run_time=0.5)
            b.tunggu_kata("tetap")
            b.main(Flash(s2[0].get_center(), color=AKSEN2, flash_radius=0.3, line_length=0.15), run_time=0.6)
        gambar = VGroup(kurva, bolong)
        qc.periksa_adegan(self, {"gambar": gambar, "bantu": bantu, "pandu": pandu3}, hud=hud(ident, papan),
                          dunia=dunia, tulisan={"syarat": syarat, "3": lab3})

        # ============ cara kedua: titiknya digeser ======================= #
        titik_geser = titik_isi(C, dasar(C), AKSEN)
        # angka 6 sudah ada di sumbu (tik 2, 4, 6, 8), tidak ditulis lagi
        pandu6 = DashedLine(cp(0, 6), cp(C, 6), dash_length=0.1).set_stroke(AKSEN, 1.4)
        with sinema.babak(self, "geser", DURASI, kata=KATA) as b:
            b.tunggu_kata("digeser")
            self.add(titik_geser)
            b.main(titik_geser.animate.move_to(cp(C, 6)), run_time=0.9, rate_func=smooth)
            b.main(ShowCreation(pandu6), run_time=0.4)
            b.tunggu_kata("Nilainya")
            b.main(*lampu([True, True, False]), run_time=0.5)
            b.tunggu_kata("Hanya")
            ps = pita_atas(s3[1], AKSEN)
            b.main(FadeIn(ps), run_time=0.4)
            b.main(FadeOut(ps), run_time=0.4)
        gambar = VGroup(kurva, bolong, titik_geser)
        qc.periksa_adegan(self, {"gambar": gambar, "bantu": bantu, "pandu": VGroup(pandu3, pandu6)},
                          hud=hud(ident, papan), dunia=dunia, tulisan={"syarat": syarat, "3": lab3})

        # ============ cara ketiga: melompat ============================== #
        kiri = ParametricCurve(lambda x: cp(x, dasar(x)), t_range=(-0.35, C, 0.05)).set_stroke(TINTA, 4.5)
        kanan = ParametricCurve(lambda x: cp(x, dasar(x) + 2.0), t_range=(C, 4.35, 0.05)).set_stroke(TINTA, 4.5)
        titik_kiri = titik_isi(C, dasar(C), TINTA)
        bolong_kanan = titik_bolong(C, dasar(C) + 2.0, TINTA)
        lab5 = rumus("5", 22, AKSEN).next_to(cp(0, 5), LEFT, buff=0.12)
        pandu5 = DashedLine(cp(0, 5), cp(C, 5), dash_length=0.1).set_stroke(AKSEN, 1.4)
        panah_kiri = Arrow(cp(0.9, dasar(0.9) + 1.0), cp(1.75, dasar(1.75) + 1.0), buff=0, thickness=2.5).set_color(AKSEN2)
        panah_kanan = Arrow(cp(3.3, dasar(3.3) + 3.0), cp(2.35, dasar(2.35) + 3.0), buff=0, thickness=2.5).set_color(AKSEN)
        with sinema.babak(self, "lompat", DURASI, kata=KATA) as b:
            b.tunggu_kata("melompat")
            b.main(FadeOut(titik_geser), FadeOut(pandu6), FadeOut(bolong), FadeOut(kurva), run_time=0.3)
            b.main(ShowCreation(kiri), ShowCreation(kanan), FadeIn(titik_kiri), FadeIn(bolong_kanan),
                   ShowCreation(pandu5), FadeIn(lab5), run_time=1.0)
            b.tunggu_kata("kiri")
            b.main(ShowCreation(panah_kiri), run_time=0.6)
            b.tunggu_kata("kanan")
            b.main(ShowCreation(panah_kanan), run_time=0.6)
            b.tunggu_kata("sepakat")
            b.main(*lampu([True, False, False]), run_time=0.5)
            b.tunggu_kata("limitnya")
            ps = pita_atas(s2[1], AKSEN)
            b.main(FadeIn(ps), run_time=0.4)
            b.main(FadeOut(ps), run_time=0.4)
        gambar = VGroup(kiri, kanan, titik_kiri, bolong_kanan)
        qc.periksa_adegan(self, {"gambar": gambar, "bantu": bantu, "pandu": VGroup(pandu3, pandu5),
                                 "panah kiri": panah_kiri, "panah kanan": panah_kanan},
                          hud=hud(ident, papan), dunia=dunia, tulisan={"syarat": syarat, "3": lab3, "5": lab5})

        # ============ cara keempat: meledak ============================== #
        def ledak(x):
            return 1.2 / ((x - C) ** 2)

        led_kiri = ParametricCurve(lambda x: cp(x, ledak(x)), t_range=(-0.35, C - 0.4, 0.02)).set_stroke(TINTA, 4.5)
        led_kanan = ParametricCurve(lambda x: cp(x, ledak(x)), t_range=(C + 0.4, 4.35, 0.02)).set_stroke(TINTA, 4.5)
        with sinema.babak(self, "asimtot", DURASI, kata=KATA) as b:
            b.tunggu_kata("meledak")
            b.main(FadeOut(gambar), FadeOut(panah_kiri), FadeOut(panah_kanan), FadeOut(pandu3), FadeOut(pandu5),
                   FadeOut(lab3), FadeOut(lab5), run_time=0.3)
            b.main(ShowCreation(led_kiri), ShowCreation(led_kanan), run_time=1.1)
            b.tunggu_kata("Penyebutnya")
            b.main(*lampu([False, True, False]), run_time=0.5)
            b.tunggu_kata("membesar")
            sorot_bantu = Line(cp(C, -0.35), cp(C, 8.3)).set_stroke(SOROT, 14, opacity=0.4)
            b.main(ShowCreationThenFadeOut(sorot_bantu), run_time=1.0)
            self.remove(sorot_bantu)
            b.tunggu_kata("Tidak")
            b.main(*lampu([False, False, False]), run_time=0.5)
        gambar = VGroup(led_kiri, led_kanan)
        qc.periksa_adegan(self, {"gambar": gambar, "bantu": bantu}, hud=hud(ident, papan), dunia=dunia,
                          tulisan={"syarat": syarat})

        # ============ sudah pernah ditemui =============================== #
        kenal1 = teks("berlubang: Konsep Limit, Bagian 4", 24, SOROT)
        kenal2 = teks("melompat: Konsep Limit, Bagian 3", 24, SOROT)
        kenal3 = teks("meledak: Sifat Limit, Bagian 3", 24, SOROT)
        kenal = VGroup(kenal1, kenal2, kenal3).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        kenal.move_to([X_KANAN, -1.0, 0])
        with sinema.babak(self, "kenal", DURASI, kata=KATA) as b:
            b.tunggu_kata("Berlubang")
            b.main(FadeIn(kenal1, shift=LEFT * 0.1), run_time=0.6)
            b.tunggu_kata("melompat")
            b.main(FadeIn(kenal2, shift=LEFT * 0.1), run_time=0.6)
            b.tunggu_kata("meledak")
            b.main(FadeIn(kenal3, shift=LEFT * 0.1), run_time=0.6)
        qc.periksa_adegan(self, {"gambar": gambar, "bantu": bantu}, hud=hud(ident, papan), dunia=dunia,
                          tulisan={"syarat": syarat, "kenal": kenal})

        # ============ janji dari Sifat Limit Bagian 1 ==================== #
        cepat = rumus(r"\lim_{x \to c} f(x) = f(c)", 36, SOROT).move_to([X_KANAN, -1.0, 0])
        tanya2 = rumus("?", 48, AKSEN).next_to(cepat, RIGHT, buff=0.35)
        with sinema.babak(self, "janji", DURASI, kata=KATA) as b:
            b.tunggu_kata("janji")
            b.main(FadeOut(kenal), FadeOut(ident), run_time=0.4)
            ident = sinema.identitas(self, "janji dilunasi")
            ident.set_opacity(0.0)
            b.main(ident.animate.set_opacity(1.0), run_time=0.3)
            b.tunggu_kata("substitusi")
            b.main(Write(cepat), run_time=1.2)
            b.tunggu_kata("ditunda")
            b.main(FadeIn(tanya2, scale=1.4), run_time=0.5)
        qc.periksa_adegan(self, {"gambar": gambar, "bantu": bantu}, hud=hud(ident, papan), dunia=dunia,
                          tulisan={"syarat": syarat, "cepat": cepat, "tanya": tanya2})

        # ============ sebabnya: suku banyak kontinu ====================== #
        kurva2 = kurva_mulus()
        titik2 = titik_isi(C, dasar(C))
        with sinema.babak(self, "sebab", DURASI, kata=KATA) as b:
            b.tunggu_kata("suku")
            b.main(FadeOut(gambar), run_time=0.3)
            b.main(ShowCreation(kurva2), FadeIn(titik2), run_time=1.0)
            b.tunggu_kata("kontinu", ke=2)
            b.main(*lampu([True, True, True]), run_time=0.5)
            b.tunggu_kata("limit")
            b.main(FadeOut(tanya2), run_time=0.3)
            pc = pita_atas(cepat)
            b.main(FadeIn(pc), run_time=0.4)
            b.main(FadeOut(pc), run_time=0.4)
            b.tunggu_kata("boleh")
            sinema.lahir_rumus(self, r"\lim_{x \to c} f(x) = f(c)", cepat, papan, b=b, warna=SOROT,
                               sebagai_utama=False, geser=np.array([0.0, 1.0, 0.0]), tahan=0.2, run_time=0.8)
        gambar = VGroup(kurva2, titik2)
        qc.periksa_adegan(self, {"gambar": gambar, "bantu": bantu}, hud=hud(ident, papan), dunia=dunia,
                          tulisan={"syarat": syarat, "cepat": cepat})

        # ============ penutup: substitusi akibat kekontinuan ============= #
        bolong2 = titik_bolong(C, dasar(C))
        coret = Line(cepat.get_left() + LEFT * 0.1, cepat.get_right() + RIGHT * 0.1).set_stroke(AKSEN, 4)
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("akibat")
            ps = pita_atas(syarat)
            b.main(FadeIn(ps), run_time=0.4)
            b.main(FadeOut(ps), run_time=0.4)
            b.tunggu_kata("tidak")
            b.main(FadeOut(titik2, scale=0.3), run_time=0.3)
            b.main(FadeIn(bolong2, scale=1.5), *lampu([False, True, False]), run_time=0.5)
            b.tunggu_kata("gugur")
            b.main(ShowCreation(coret), run_time=0.5)
        gambar = VGroup(kurva2, bolong2)
        qc.periksa_adegan(self, {"gambar": gambar, "bantu": bantu, "coret": coret}, hud=hud(ident, papan),
                          dunia=dunia, tulisan={"syarat": syarat, "cepat": cepat})

        # ============ menunjuk Penerapan Limit =========================== #
        lanjut = teks("Penerapan Limit", 30, SOROT).move_to([X_KANAN, -2.0, 0])
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Penerapan")
            b.main(FadeIn(lanjut, shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("dunia")
            b.main(FadeOut(bolong2), run_time=0.3)
            b.main(FadeIn(titik2, scale=1.5), *lampu([True, True, True]), run_time=0.5)
        qc.periksa_adegan(self, {"gambar": VGroup(kurva2, titik2), "bantu": bantu, "coret": coret},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"syarat": syarat, "cepat": cepat, "lanjut": lanjut})

        sinema.laporkan_pemicu(self)
