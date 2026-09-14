"""Konsep Limit, Bagian 1 (Materi 01): kecepatan pada satu detik.
STANDAR VIDEO v3.1, ditulis ulang 12 Sep 2026 dari adegan Manim CE yang sudah
disetujui ARYA. ISINYA SAMA: speedometer 60 km/jam; kecepatan = jarak : waktu;
pada satu saat 0 : 0 tidak punya jawaban; jalan keluarnya memperpendek
selang; kelapa jatuh s = 5t kuadrat; selang 1, 0,5, 0,1 detik memberi 25,
22,5, 20,5 m/detik; menuju 20 tanpa pernah sampai; aljabar 20 + 5h; syarat
h bukan nol; limit menjawab pertanyaan yang angkanya tidak boleh dimasukkan.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 1; segar-ingat rumus kecepatan dari
  SMP dengan contoh 60 km dalam 1 jam (prasyarat nyata; ini video pertama
  topik Limit, jadi tidak ada "materi sebelumnya").
- Kelapa benar-benar jatuh di sebelah kiri grafik (pohon), tingginya
  mengikuti s = 5t kuadrat; di detik 2 sudah 20 m, di detik 3 sudah 45 m.
- Aljabarnya DIHITUNG di layar: 5(2 + h) kuadrat dijabarkan, dikurangi 20,
  dibagi h, lalu h dicoret dengan garis tipis yang tidak menutup hurufnya.
- Rumus lahir besar di fokus lalu terbang ke panel: kecepatan = jarak :
  waktu, s(t) = 5t kuadrat, h bukan nol.
- Sorot memakai pita tembus pandang, bukan garis tebal yang menutup.
- Tiap kejadian dipicu pada kata yang mengucapkannya.

TATA LETAK: speedometer di kiri (babak 1 sampai 5), lalu pohon kelapa di
tepi kiri, grafik s(t) di kiri tengah, tabel selang dan penjabaran aljabar
di kolom kanan (x 1,7 sampai 5,7), panel rumus di kanan atas.

WARNA: biru = selang waktu (mendatar), merah = jarak (tegak) dan jarum,
ungu = hasil dan garis potong, tinta = kurva.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "limit1-kecepatan"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

C_METER = np.array([-3.4, 0.3, 0.0])   # pusat speedometer
R_METER = 1.5
ASAL = np.array([-4.7, -2.3, 0.0])      # titik (0, 0) papan grafik
LEBAR_PAPAN, TINGGI_PAPAN = 5.0, 4.5    # 0 sampai 3,6 detik; 0 sampai 70 meter
X_POHON = -6.3                          # batang pohon kelapa
Y_PUNCAK = 2.45                         # kelapa mula-mula
SKALA_JATUH = 0.104                     # satuan layar per meter (45 m = 4,68)
X_KIRI_KANAN = 1.7                      # tepi kiri kolom kanan
X_KANAN = 3.6
Y_BARIS = [1.95, 1.25, 0.55, -0.15]
Y_ALJABAR = [2.0, 1.35, 0.7, -0.05]
T0 = 2.0


def s(t):
    """Jarak jatuh setelah t detik, dalam meter."""
    return 5.0 * t * t


def hud(ident, papan):
    isi = {"identitas": ident} if ident is not None else {}
    p = papan.semua()
    if p is not None:
        isi["papan"] = p
    return isi


def arah_meter(nilai):
    """Arah jarum untuk nilai 0 sampai 120: dari kiri (180 derajat) ke kanan (0)."""
    a = PI - nilai / 120.0 * PI
    return np.array([np.cos(a), np.sin(a), 0.0])


class KecepatanSesaat(AdeganMatra):
    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
        ident = None

        # ============ speedometer ======================================== #
        busur = Arc(radius=R_METER, start_angle=PI, angle=-PI, arc_center=C_METER).set_stroke(TINTA, 3)
        alas_meter = Line(C_METER + LEFT * R_METER, C_METER + RIGHT * R_METER).set_stroke(REDUP, 2)
        tik = VGroup()
        angka_meter = VGroup()
        for v in range(0, 121, 20):
            a = arah_meter(v)
            panjang = 0.22 if v % 60 == 0 else 0.13
            tik.add(Line(C_METER + a * (R_METER - panjang), C_METER + a * R_METER).set_stroke(TINTA, 2))
            if v % 60 == 0:
                # Angka di LUAR busur: di dalam, jarum 60 menutup angka 60.
                angka_meter.add(rumus(str(v), 20, REDUP).move_to(C_METER + a * (R_METER + 0.3)))
        poros = Dot(C_METER, radius=0.07).set_color(TINTA)
        nilai_jarum = ValueTracker(0.0)
        jarum = always_redraw(lambda: Line(
            C_METER, C_METER + arah_meter(nilai_jarum.get_value()) * (R_METER - 0.3)
        ).set_stroke(AKSEN, 5))
        meter = VGroup(busur, alas_meter, tik, angka_meter, poros)
        bacaan = rumus(r"60\ \mathrm{km/jam}", 34, AKSEN).move_to(C_METER + DOWN * 0.55)
        tanya = teks("Bagaimana kecepatan pada satu saat itu bisa dihitung?", 34, TINTA)
        tanya.move_to([0.6, -1.9, 0])
        sinema.batasi_lebar(tanya, 10.5)
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Konsep")
            sinema.judul_pembuka(self, "Konsep Limit, Bagian 1", lama=3.0)
            b.catat(3.0)
            b.tunggu_kata("Speedometer")
            b.main(ShowCreation(meter), run_time=0.6)
            self.add(jarum)
            b.tunggu_kata("menunjuk")
            b.main(nilai_jarum.animate.set_value(60), run_time=0.5, rate_func=smooth)
            b.tunggu_kata("kilometer")
            b.main(FadeIn(bacaan, shift=UP * 0.1), run_time=0.5)
            b.tunggu_kata("Bagaimana")
            b.main(Write(tanya), run_time=1.8)
        qc.periksa_adegan(self, {"meter": meter, "jarum": jarum}, hud=hud(ident, papan),
                          tulisan={"bacaan": bacaan, "tanya": tanya})

        # ============ segar-ingat: kecepatan = jarak : waktu (SMP) ======= #
        hitung = rumus(r"\frac{60\ \mathrm{km}}{1\ \mathrm{jam}} = 60\ \mathrm{km/jam}", 34, TINTA)
        hitung.move_to([2.8, 0.1, 0])
        rata = sinema.label("rata-rata", ukuran=26, warna=SOROT).next_to(hitung, DOWN, buff=0.35)
        with sinema.babak(self, "rumus", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sejak")
            ident = sinema.identitas(self, "ingat SMP")
            ident.set_opacity(0.0)
            b.main(FadeOut(tanya), ident.animate.set_opacity(1.0), run_time=0.5)
            b.tunggu_kata("kecepatan")
            rumus_v = sinema.lahir_rumus(
                self, r"\mathrm{kecepatan} = \mathrm{jarak} : \mathrm{waktu}", C_METER, papan, b=b,
                warna=TINTA, sebagai_utama=False, geser=np.array([5.6, 0.8, 0.0]), tahan=0.5)
            b.tunggu_kata("Enam")
            b.main(Write(hitung), run_time=1.4)
            b.tunggu_kata("rata-ratanya")
            b.main(FadeIn(rata, shift=UP * 0.1), run_time=0.6)
        qc.periksa_adegan(self, {"meter": meter, "jarum": jarum}, hud=hud(ident, papan),
                          tulisan={"bacaan": bacaan, "hitung": hitung, "rata": rata})

        # ============ tapi jarum menunjuk SATU saat ====================== #
        satu_saat = sinema.label("satu saat", ukuran=26, warna=AKSEN)
        satu_saat.move_to(C_METER + UP * (R_METER + 0.72))
        with sinema.babak(self, "saat", DURASI, kata=KATA) as b:
            b.tunggu_kata("jarum")
            sorot_jarum = Line(C_METER, C_METER + arah_meter(60) * (R_METER - 0.3)
                               ).set_stroke(SOROT, 16, opacity=0.4)
            b.main(ShowCreationThenFadeOut(sorot_jarum), run_time=1.0)
            self.remove(sorot_jarum)
            b.tunggu_kata("satu saat")
            b.main(FadeIn(satu_saat, shift=UP * 0.1), run_time=0.6)
            b.tunggu_kata("Coba")
            b.main(FadeOut(hitung), FadeOut(rata), run_time=0.5)
            b.tunggu_kata("rumus")
            b.main(papan.sorot(), run_time=1.0)
        qc.periksa_adegan(self, {"meter": meter, "jarum": jarum}, hud=hud(ident, papan),
                          tulisan={"bacaan": bacaan, "satu saat": satu_saat})

        # ============ buntu: 0 dibagi 0 ================================== #
        waktu0 = rumus(r"\mathrm{waktu} = 0", 36, AKSEN2).move_to([2.8, 0.7, 0])
        jarak0 = rumus(r"\mathrm{jarak} = 0", 36, AKSEN).move_to([2.8, 0.0, 0])
        nol_nol = rumus(r"\frac{0}{0}", 60, TINTA).move_to([2.8, -1.35, 0])
        # Satu garis miring tipis, bukan silang tebal: angkanya tetap terbaca.
        silang = Line(nol_nol.get_corner(DL) + np.array([-0.18, -0.08, 0]),
                      nol_nol.get_corner(UR) + np.array([0.18, 0.08, 0])).set_stroke(AKSEN, 4)
        with sinema.babak(self, "buntu", DURASI, kata=KATA) as b:
            b.tunggu_kata("waktunya")
            b.main(FadeIn(waktu0, shift=UP * 0.1), run_time=0.6)
            b.tunggu_kata("jaraknya")
            b.main(FadeIn(jarak0, shift=UP * 0.1), run_time=0.6)
            b.tunggu_kata("Nol dibagi")
            b.main(Write(nol_nol), run_time=1.0)
            b.tunggu_kata("tidak")
            b.main(ShowCreation(silang), run_time=0.8)
        qc.periksa_adegan(self, {"meter": meter, "jarum": jarum, "silang": silang},
                          hud=hud(ident, papan),
                          tulisan={"bacaan": bacaan, "satu saat": satu_saat, "waktu": waktu0,
                                   "jarak": jarak0, "nol": nol_nol})

        # ============ jalan keluar: perpendek selangnya ================== #
        lebar = ValueTracker(3.6)
        selang = always_redraw(lambda: Line(
            [2.8 - lebar.get_value() / 2, -0.4, 0], [2.8 + lebar.get_value() / 2, -0.4, 0]
        ).set_stroke(AKSEN2, 9))
        nama_selang = sinema.label("selang", ukuran=26, warna=AKSEN2).move_to([2.8, -0.95, 0])
        tanda_tanya = rumus("?", 48, SOROT).move_to([2.8, 0.45, 0])
        with sinema.babak(self, "jalan", DURASI, kata=KATA) as b:
            b.tunggu_kata("bukan")
            b.main(FadeOut(waktu0), FadeOut(jarak0), FadeOut(nol_nol), FadeOut(silang),
                   FadeOut(satu_saat), run_time=0.5)
            b.tunggu_kata("memperpendek")
            self.add(selang)
            b.main(FadeIn(nama_selang), run_time=0.4)
            b.tunggu_kata("terus")
            b.main(lebar.animate.set_value(1.8), run_time=0.45, rate_func=smooth)
            b.main(lebar.animate.set_value(0.9), run_time=0.4, rate_func=smooth)
            b.main(lebar.animate.set_value(0.4), run_time=0.4, rate_func=smooth)
            b.tunggu_kata("angkanya")
            b.main(FadeIn(tanda_tanya, shift=UP * 0.15), run_time=0.5)
        qc.periksa_adegan(self, {"meter": meter, "jarum": jarum, "selang": selang},
                          hud=hud(ident, papan),
                          tulisan={"bacaan": bacaan, "nama selang": nama_selang, "tanya": tanda_tanya})

        # ============ kelapa jatuh: s(t) = 5t kuadrat ==================== #
        batang = Line([X_POHON, Y_PUNCAK + 0.2, 0], [X_POHON, -2.35, 0]).set_stroke(REDUP, 6)
        tanah = Line([X_POHON - 0.45, -2.35, 0], [X_POHON + 0.45, -2.35, 0]).set_stroke(REDUP, 3)
        pohon = VGroup(batang, tanah)
        pohon.latar = True
        t_jatuh = ValueTracker(0.0)
        kelapa = always_redraw(lambda: Dot(
            [X_POHON, Y_PUNCAK - s(t_jatuh.get_value()) * SKALA_JATUH, 0], radius=0.17
        ).set_fill(REDUP, 1.0).set_stroke(TINTA, 2))

        sumbu = Axes(x_range=(0, 3.6, 1), y_range=(0, 70, 20), width=LEBAR_PAPAN, height=TINGGI_PAPAN,
                     axis_config=dict(stroke_color=REDUP, stroke_width=2.2))
        sumbu.shift(ASAL - sumbu.c2p(0, 0))
        cp = sumbu.c2p
        angka = VGroup(*[rumus(str(i), 22, REDUP).next_to(cp(i, 0), DOWN, buff=0.15) for i in (1, 2, 3)],
                       *[rumus(str(j), 22, REDUP).next_to(cp(0, j), LEFT, buff=0.15) for j in (20, 40, 60)])
        sumbu.angka = angka
        sumbu.latar = True
        nama_t = rumus(r"t\ (\mathrm{detik})", 22, REDUP).next_to(cp(3.6, 0), RIGHT, buff=0.15)
        nama_s = rumus(r"s\ (\mathrm{m})", 22, REDUP).next_to(cp(0, 70), UP, buff=0.15)
        kurva = ParametricCurve(lambda t: cp(t, s(t)), t_range=(0, 3.55, 0.02)).set_stroke(TINTA, 4.5)
        titik0 = Dot(cp(T0, s(T0)), radius=0.085).set_color(SOROT)
        pandu0 = VGroup(DashedLine(cp(T0, 0), cp(T0, s(T0)), dash_length=0.08),
                        DashedLine(cp(0, s(T0)), cp(T0, s(T0)), dash_length=0.08)).set_stroke(SOROT, 1.8)
        with sinema.babak(self, "kelapa", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kita")
            b.main(FadeOut(meter), FadeOut(bacaan), FadeOut(nama_selang), FadeOut(tanda_tanya),
                   FadeOut(ident), run_time=0.5)
            self.remove(jarum, selang)
            b.tunggu_kata("kelapa")
            ident = sinema.identitas(self, "kelapa jatuh")
            ident.set_opacity(0.0)
            b.main(ShowCreation(pohon), ident.animate.set_opacity(1.0), run_time=0.4)
            self.add(kelapa)
            b.tunggu_kata("jatuh")
            b.main(t_jatuh.animate.set_value(T0), run_time=1.3, rate_func=linear)
            b.tunggu_kata("Setelah")
            b.main(ShowCreation(sumbu), FadeIn(angka), FadeIn(nama_t), FadeIn(nama_s),
                   ShowCreation(kurva), run_time=1.4)
            b.tunggu_kata("lima")
            # tahan 0,2 dan run_time 0,8 (dulu 0,5 dan 1,1): kata "Di" datang 0,5
            # detik lebih cepat pada narasi Bian (14 Sep 2026)
            sinema.lahir_rumus(self, r"s(t) = 5t^2", sumbu, papan, b=b, warna=TINTA,
                               sebagai_utama=False, geser=np.array([0.4, 1.0, 0.0]), tahan=0.2,
                               run_time=0.8)
            b.tunggu_kata("Di")
            b.main(FadeIn(titik0), ShowCreation(pandu0), run_time=0.8)
        dunia = {"sumbu": sumbu, "pohon": pohon}
        qc.periksa_adegan(self, {"kurva": kurva, "titik": titik0, "kelapa": kelapa, "pandu": pandu0},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"nama t": nama_t, "nama s": nama_s})

        # ============ selang 1 detik: 25 m/detik ========================= #
        hh = ValueTracker(1.0)

        def garis_potong(h):
            m = (s(T0 + h) - s(T0)) / h
            y = lambda x: s(T0) + m * (x - T0)
            x_bawah = T0 - s(T0) / m
            x_atas = T0 + (68.0 - s(T0)) / m
            x1 = max(0.05, min(x_bawah, x_atas))
            x2 = min(3.5, max(x_bawah, x_atas))
            return Line(cp(x1, y(x1)), cp(x2, y(x2))).set_stroke(SOROT, 3.5)

        def baris_tabel(i, kiri, kanan, warna=AKSEN):
            a = rumus(kiri, 28, TINTA).move_to([X_KANAN - 1.45, Y_BARIS[i], 0])
            c = rumus(kanan, 28, warna).move_to([X_KANAN + 1.3, Y_BARIS[i], 0])
            return VGroup(a, c)

        titik1_diam = Dot(cp(3, s(3)), radius=0.075).set_color(AKSEN)
        potong_diam = garis_potong(1.0)
        pandu45 = DashedLine(cp(0, 45), cp(3, 45), dash_length=0.08).set_stroke(REDUP, 1.5)
        # Di atas garis pandunya, bukan di sumbu: di sumbu ia berdesakan dengan 40.
        lab45 = rumus("45", 22, REDUP).move_to(cp(2.45, 45) + UP * 0.22)
        tegak_diam = Line(cp(3, 20), cp(3, 45)).set_stroke(AKSEN, 5)
        lab_tegak = rumus(r"25\ \mathrm{m}", 26, AKSEN).next_to(tegak_diam, RIGHT, buff=0.12)
        datar_diam = Line(cp(2, 20), cp(3, 20)).set_stroke(AKSEN2, 5)
        lab_datar = rumus(r"1\ \mathrm{detik}", 26, AKSEN2).next_to(datar_diam, DOWN, buff=0.12)
        r1 = baris_tabel(0, r"h = 1\ \mathrm{detik}", r"25\ \mathrm{m/detik}")
        with sinema.babak(self, "satu", DURASI, kata=KATA) as b:
            b.tunggu_kata("tiga")
            b.main(FadeIn(titik1_diam), ShowCreation(potong_diam), run_time=1.0)
            b.tunggu_kata("turun")
            b.main(t_jatuh.animate.set_value(3.0), run_time=0.8, rate_func=linear)
            b.tunggu_kata("empat")
            b.main(ShowCreation(pandu45), FadeIn(lab45), run_time=0.5)
            b.tunggu_kata("Dua puluh lima meter dalam")
            b.main(ShowCreation(tegak_diam), FadeIn(lab_tegak), run_time=0.7)
            b.tunggu_kata("satu detik")
            b.main(ShowCreation(datar_diam), FadeIn(lab_datar), run_time=0.7)
            b.tunggu_kata("rata-ratanya")
            b.main(FadeIn(r1, shift=LEFT * 0.16), run_time=0.8)
        qc.periksa_adegan(self, {"kurva": kurva, "titik": titik0, "kelapa": kelapa,
                                 "potong": potong_diam, "tegak": tegak_diam, "datar": datar_diam},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"nama t": nama_t, "nama s": nama_s, "45": lab45,
                                   "25 m": lab_tegak, "1 detik": lab_datar, "baris 1": r1})

        # ============ selang 0,5 dan 0,1 detik =========================== #
        titik1 = always_redraw(lambda: Dot(cp(T0 + hh.get_value(), s(T0 + hh.get_value())),
                                           radius=0.075).set_color(AKSEN))
        potong = always_redraw(lambda: garis_potong(hh.get_value()))
        tegak = always_redraw(lambda: Line(cp(T0 + hh.get_value(), s(T0)),
                                           cp(T0 + hh.get_value(), s(T0 + hh.get_value()))
                                           ).set_stroke(AKSEN, 5))
        datar = always_redraw(lambda: Line(cp(T0, s(T0)), cp(T0 + hh.get_value(), s(T0))
                                           ).set_stroke(AKSEN2, 5))
        r2 = baris_tabel(1, r"h = 0{,}5", r"22{,}5")
        r3 = baris_tabel(2, r"h = 0{,}1", r"20{,}5")
        with sinema.babak(self, "setengah", DURASI, kata=KATA) as b:
            b.tunggu_kata("diperpendek")
            b.main(FadeOut(lab_tegak), FadeOut(lab_datar), FadeOut(pandu45), FadeOut(lab45),
                   run_time=0.3)
            self.remove(titik1_diam, potong_diam, tegak_diam, datar_diam)
            self.add(potong, tegak, datar, titik1)
            b.main(hh.animate.set_value(0.5), run_time=1.2, rate_func=smooth)
            b.tunggu_kata("dua")
            b.main(FadeIn(r2, shift=LEFT * 0.16), run_time=0.8)
        qc.periksa_adegan(self, {"kurva": kurva, "titik": titik0, "kelapa": kelapa,
                                 "potong": potong, "tegak": tegak, "datar": datar},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"nama t": nama_t, "nama s": nama_s, "baris 1": r1, "baris 2": r2})

        with sinema.babak(self, "sepersepuluh", DURASI, kata=KATA) as b:
            b.tunggu_kata("Diperpendek")
            b.main(hh.animate.set_value(0.1), run_time=1.2, rate_func=smooth)
            b.tunggu_kata("dua")
            b.main(FadeIn(r3, shift=LEFT * 0.16), run_time=0.8)
            b.tunggu_kata("garis")
            sorot_potong = garis_potong(0.1).set_stroke(SOROT, 16, opacity=0.4)
            b.main(ShowCreationThenFadeOut(sorot_potong), run_time=1.2)
            self.remove(sorot_potong)
        qc.periksa_adegan(self, {"kurva": kurva, "titik": titik0, "kelapa": kelapa,
                                 "potong": potong, "tegak": tegak, "datar": datar},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"nama t": nama_t, "nama s": nama_s, "baris 1": r1, "baris 2": r2,
                                   "baris 3": r3})

        # ============ menuju 20, tidak pernah sampai ===================== #
        r4 = baris_tabel(3, r"h \to 0", r"20\ \mathrm{m/detik}", warna=SOROT)
        kotak = SurroundingRectangle(r4, buff=0.14).set_stroke(SOROT, 2.5).set_fill(opacity=0)
        with sinema.babak(self, "menuju", DURASI, kata=KATA) as b:
            b.tunggu_kata("Semakin")
            b.main(hh.animate.set_value(0.02), run_time=1.6, rate_func=smooth)
            b.tunggu_kata("dua")
            b.main(FadeIn(r4, shift=LEFT * 0.16), run_time=0.8)
            b.tunggu_kata("tidak")
            b.main(ShowCreation(kotak), run_time=0.8)
        tabel = VGroup(r1, r2, r3, r4)
        qc.periksa_adegan(self, {"kurva": kurva, "titik": titik0, "kelapa": kelapa,
                                 "potong": potong, "kotak": kotak},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"nama t": nama_t, "nama s": nama_s, "baris 1": r1, "baris 2": r2,
                                   "baris 3": r3, "baris 4": r4})

        # ============ aljabar: kenapa 20 ================================= #
        def baris_aljabar(isi, i, warna=TINTA):
            m = rumus(isi, 32, warna)
            return m.move_to([X_KIRI_KANAN + m.get_width() / 2, Y_ALJABAR[i], 0])

        def buat_lab_h():
            m = rumus("h", 26, AKSEN2).next_to(
                Line(cp(T0, s(T0)), cp(T0 + hh.get_value(), s(T0))), DOWN, buff=0.1)
            # Saat h kecil, geser ke kanan supaya tidak menindih garis pandu t = 2.
            geser = cp(T0, 0)[0] + 0.22 - m.get_center()[0]
            if geser > 0:
                m.shift(RIGHT * geser)
            return m

        lab_h = always_redraw(buat_lab_h)
        a1 = baris_aljabar(r"s(2 + h) = 5(2 + h)^2", 0)
        a2 = baris_aljabar(r"s(2 + h) = 20 + 20h + 5h^2", 1)
        a3 = baris_aljabar(r"s(2 + h) - s(2) = 20h + 5h^2", 2)
        a4_kiri = rumus(r"\frac{20h + 5h^2}{h} =", 32, TINTA)
        a4_kanan = rumus(r"20 + 5h", 32, SOROT)
        a4 = VGroup(a4_kiri, a4_kanan).arrange(RIGHT, buff=0.18)
        a4.move_to([X_KIRI_KANAN + a4.get_width() / 2, Y_ALJABAR[3], 0])
        with sinema.babak(self, "aljabar", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kita")
            b.main(FadeOut(tabel), FadeOut(kotak), run_time=0.5)
            b.tunggu_kata("Kalau")
            b.main(hh.animate.set_value(0.7), run_time=1.0, rate_func=smooth)
            b.main(FadeIn(lab_h), run_time=0.3)
            b.tunggu_kata("jarak")
            b.main(Write(a1), run_time=1.4)
            b.tunggu_kata("yaitu")
            b.main(Write(a2), run_time=1.4)
        qc.periksa_adegan(self, {"kurva": kurva, "titik": titik0, "kelapa": kelapa,
                                 "potong": potong, "tegak": tegak, "datar": datar},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"nama t": nama_t, "nama s": nama_s, "h": lab_h, "a1": a1, "a2": a2})

        with sinema.babak(self, "coret", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dikurangi")
            b.main(Write(a3), run_time=1.4)
            b.tunggu_kata("Dibagi")
            b.main(Write(a4), run_time=1.6)
            b.tunggu_kata("dua", ke=3)
            pita = SurroundingRectangle(a4_kanan, buff=0.08).set_fill(SOROT, 0.18).set_stroke(width=0)
            b.main(FadeIn(pita), run_time=0.5)
            b.main(FadeOut(pita), run_time=0.5)
        qc.periksa_adegan(self, {"kurva": kurva, "titik": titik0, "kelapa": kelapa,
                                 "potong": potong, "tegak": tegak, "datar": datar},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"nama t": nama_t, "nama s": nama_s, "h": lab_h, "a1": a1, "a2": a2,
                                   "a3": a3, "a4": a4})

        # ============ syarat: h boleh dicoret hanya kalau h bukan nol ==== #
        # Huruf h yang dicoret: dua di pembilang (20h, 5h^2) dan satu di
        # penyebut. Garis tipis miring, bukan coretan tebal yang menutup.
        glyph = a4_kiri.family_members_with_points()
        # urutan glyph: 2 0 h + 5 h 2 (pembilang), garis pecahan, h (penyebut), =
        huruf_h = [glyph[2], glyph[5], glyph[8]]

        def coretan(g):
            return Line(g.get_corner(DL) + DOWN * 0.04 + LEFT * 0.04,
                        g.get_corner(UR) + UP * 0.04 + RIGHT * 0.04).set_stroke(AKSEN, 3)

        coret_h = VGroup(*[coretan(g) for g in huruf_h])
        with sinema.babak(self, "syarat", DURASI, kata=KATA) as b:
            b.tunggu_kata("dicoret")
            b.main(LaggedStart(*[ShowCreation(c) for c in coret_h], lag_ratio=0.35), run_time=0.9)
            b.tunggu_kata("bukan")
            sinema.lahir_rumus(self, r"h \neq 0", a4, papan, b=b, warna=AKSEN,
                               sebagai_utama=False, geser=np.array([0.0, -1.2, 0.0]), tahan=0.5)
            b.tunggu_kata("Semakin")
            b.main(hh.animate.set_value(0.03), run_time=1.6, rate_func=smooth)
            b.tunggu_kata("dua")
            pita2 = SurroundingRectangle(a4_kanan, buff=0.08).set_fill(SOROT, 0.18).set_stroke(width=0)
            b.main(FadeIn(pita2), run_time=0.4)
            b.main(FadeOut(pita2), run_time=0.4)
        qc.periksa_adegan(self, {"kurva": kurva, "titik": titik0, "kelapa": kelapa,
                                 "potong": potong, "coretan": coret_h},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"nama t": nama_t, "nama s": nama_s, "a1": a1, "a2": a2,
                                   "a3": a3, "a4": a4})

        # ============ penutup ============================================ #
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jadi")
            b.main(hh.animate.set_value(0.8), run_time=1.2, rate_func=smooth)
            b.tunggu_kata("Limit adalah")
            b.main(hh.animate.set_value(0.02), run_time=2.4, rate_func=smooth)
            b.tunggu_kata("tidak")
            b.main(papan.sorot(), run_time=1.0)

        lanjut = teks("Konsep Limit, Bagian 2", 30, SOROT)
        lanjut.move_to([X_KIRI_KANAN + lanjut.get_width() / 2, -1.5, 0])
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Konsep")
            b.main(FadeIn(lanjut, shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("mendekati")
            b.main(hh.animate.set_value(0.5), run_time=0.8, rate_func=smooth)
            b.main(hh.animate.set_value(0.02), run_time=1.8, rate_func=smooth)
        qc.periksa_adegan(self, {"kurva": kurva, "titik": titik0, "kelapa": kelapa,
                                 "potong": potong, "coretan": coret_h},
                          hud=hud(ident, papan), dunia=dunia,
                          tulisan={"nama t": nama_t, "nama s": nama_s, "a1": a1, "a2": a2,
                                   "a3": a3, "a4": a4, "lanjut": lanjut})

        sinema.laporkan_pemicu(self)
