"""Grafik Fungsi Materi 06, Transformasi Fungsi Bagian 1: geser, cermin, regang.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (2:20,
2 Sep) yang sudah disetujui ARYA. ISINYA SAMA: bola menggelinding sekali di
lembah x kuadrat; lima nilai f(x) dihitung lalu kurvanya ditarik; f(x) + 1
naik satu; f(x - 1) ke KANAN walau tandanya minus, karena isi kurung nol saat
x = 1; perlakuan yang sama pada 2 akar x dan sinus; f(2x) memampat jadi
setengah karena x dikalikan dua sebelum masuk mesin; aturan: luar kurung
mengerjakan yang tertulis, dalam kurung kebalikannya.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 1 lalu pertanyaan halaman; segar-ingat
  Fungsi Kuadrat Bagian 1: parabola (x - 3) kuadrat pindah ke kanan, digambar.
- Bentuk umum y = f(x - h) + k LAHIR besar di dekat kurvanya, dengan panah h
  dan k yang menempel di kurva.
- SELURUHNYA DUA DIMENSI, satu bidang koordinat (ARYA 2 Sep: jangan paksakan
  3D pada materi datar); bola dan lembahnya digambar di bidang yang sama,
  bolanya titik yang mengikuti kurva.
- Tiap kejadian dipicu pada kata yang mengucapkannya (`sinema.JamKata`).
- Kalimat narasi tidak ditulis sebagai teks di layar; penutup memperlihatkan
  tiga rumus dengan panah arah geser dan mampat; pancingan Bagian 2 berupa
  kurva yang bagian bawahnya dilipat ke atas.
- Sorot memakai pita ungu tembus pandang (`sorot_pita`), bukan Indicate pada
  benda yang berisi.

SATU WARNA SATU MAKNA: merah = yang ditulis DI LUAR kurung (geser tegak),
biru = yang ditulis DI DALAM kurung (geser mendatar, mampat), ungu =
kesimpulan dan penanda, abu = bekas bentuk sebelumnya, sumbu, bola.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "grafik6-transformasi"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

SATUAN = 0.62
X0, X1 = -3, 5
Y0, Y1 = -1, 6
ASAL = np.array([-1.45, -1.62, 0.0])       # titik (0, 0) bidang di layar
NILAI_HITUNG = [(-2, 4), (-1, 1), (0, 0), (1, 1), (2, 4)]


def f_parabola(x):
    return x * x


def f_akar(x):
    return 2.0 * np.sqrt(max(x, 0.0))


def f_sinus(x):
    return 1.6 * np.sin(x) + 1.6


def hud(ident, papan):
    isi = {"identitas": ident} if ident is not None else {}
    p = papan.semua()
    if p is not None:
        isi["papan"] = p
    return isi


class GeserCerminRegang(AdeganMatra):
    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
        ident = None

        sumbu = Axes(x_range=(X0, X1, 1), y_range=(Y0, Y1, 1),
                     width=(X1 - X0) * SATUAN, height=(Y1 - Y0) * SATUAN,
                     axis_config=dict(stroke_color=REDUP, stroke_width=2))
        sumbu.shift(ASAL - sumbu.c2p(0, 0))
        angka = sumbu.add_coordinate_labels(font_size=20, num_decimal_places=0)
        angka.set_color(TINTA)
        sumbu.angka = angka
        sumbu.latar = True
        cp = sumbu.c2p
        dx1 = cp(1, 0) - cp(0, 0)
        dy1 = cp(0, 1) - cp(0, 0)
        lx = rumus("x", 26, REDUP).next_to(sumbu.x_axis, RIGHT, buff=0.12)
        ly = rumus("y", 26, REDUP).next_to(sumbu.y_axis, UP, buff=0.10)
        dunia = {"sumbu": sumbu}

        def kurva(fn, xa, xb, warna=TINTA, lebar=4.5):
            k = ParametricCurve(lambda t: cp(t, fn(t)), t_range=(xa, xb, 0.02))
            return k.set_stroke(warna, lebar)

        def titik(x, y, warna=AKSEN, r=0.075):
            return Dot(cp(x, y), radius=r).set_color(warna)

        # ============ buka ============================================== #
        tanya_buka = teks("Apakah aturan geser tadi cuma berlaku untuk parabola?", 34, TINTA)
        sinema.batasi_lebar(tanya_buka, 11.4)
        tanya_buka.move_to([0, 0.3, 0])

        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Transformasi")
            sinema.judul_pembuka(self, "Transformasi Fungsi, Bagian 1", lama=3.0, y=1.6)
            b.catat(3.0)
            b.tunggu_kata("Apakah")
            b.main(Write(tanya_buka), run_time=1.5)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia={}, tulisan={"tanya": tanya_buka})

        # ============ ingat: (x - 3)^2 pindah ke kanan ==================== #
        k_ingat0 = kurva(f_parabola, -2.0, 2.0, REDUP, 3.5)
        k_ingat3 = kurva(lambda t: (t - 3) ** 2, 1.0, 5.0, SOROT)
        titik3 = titik(3, 0, SOROT, 0.085)

        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Fungsi")
            ident = sinema.identitas(self, "ingat Fungsi Kuadrat")
            ident.set_opacity(0)
            b.main(FadeOut(tanya_buka), FadeIn(sumbu), FadeIn(lx), FadeIn(ly),
                   ident.animate.set_opacity(1), run_time=0.8)
            b.tunggu_kata("parabola")
            b.main(ShowCreation(k_ingat0), run_time=0.35)
            b.tunggu_kata("pindah ke")
            b.main(TransformFromCopy(k_ingat0, k_ingat3), run_time=1.2)
            b.tunggu_kata("y sama")
            papan.baris(r"y = (x - 3)^2", SOROT, b=b)
            b.tunggu_kata("puncaknya")
            b.main(FadeIn(titik3, scale=2.0), Flash(cp(3, 0), color=SOROT, flash_radius=0.4,
                                                    line_length=0.15), run_time=0.7)
            b.tunggu_kata("Hari ini")
            b.main(FadeOut(k_ingat0), FadeOut(k_ingat3), FadeOut(titik3), FadeOut(ident),
                   FadeOut(papan.semua()), run_time=0.7)
            self.remove(k_ingat0, k_ingat3, titik3, ident, *papan.semua())
            ident = None
            papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia=dunia,
                          tulisan={"x": lx, "y": ly})

        # ============ lembah: bola menggelinding sekali =================== #
        lembah = kurva(f_parabola, -2.3, 2.3, REDUP, 9).set_stroke(opacity=0.55)
        tb = ValueTracker(-2.0)
        bola = Dot(radius=0.13).set_color(TINTA)
        bola.add_updater(lambda m: m.move_to(cp(tb.get_value(), f_parabola(tb.get_value())) + dy1 * 0.22))

        with sinema.babak(self, "lembah", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kita mulai")
            b.main(ShowCreation(lembah), run_time=1.2)
            dunia["lembah"] = lembah
            b.tunggu_kata("Bola ini")
            self.add(bola)
            b.main(FadeIn(bola, scale=1.6), run_time=0.4)
            b.tunggu_kata("menggelinding")
            b.main(tb.animate.set_value(1.7), run_time=1.3, rate_func=smooth)
            b.main(tb.animate.set_value(-0.6), run_time=1.0, rate_func=smooth)
            b.main(tb.animate.set_value(0.0), run_time=0.5, rate_func=smooth)
            b.tunggu_kata("persis grafik")
            papan.baris(r"y = x^2", TINTA, b=b)
        bola.clear_updaters()
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia=dict(dunia, bola=bola),
                          tulisan={"x": lx, "y": ly})

        # ============ datar: tinggal gambarnya ============================ #
        with sinema.babak(self, "datar", DURASI, kata=KATA) as b:
            b.tunggu_kata("lembahnya kita")
            b.main(FadeOut(bola), FadeOut(lembah), run_time=0.8)
            self.remove(bola, lembah)
            dunia.pop("lembah", None)
            b.tunggu_kata("sumbu x")
            b.main(Indicate(lx, color=SOROT), run_time=0.8)
            b.tunggu_kata("sumbu y")
            b.main(Indicate(ly, color=SOROT), run_time=0.8)
            b.tunggu_kata("f dari")
            b.main(FadeOut(papan.semua()), run_time=0.3)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
            papan.baris(r"f(x) = x^2", TINTA, b=b)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia=dunia,
                          tulisan={"x": lx, "y": ly})

        # ============ titik: lima nilai dihitung ========================== #
        titik5 = VGroup(*[titik(x, y, AKSEN) for x, y in NILAI_HITUNG])
        nilai5 = VGroup(*[rumus(str(y), 24, AKSEN).move_to(cp(x, y) + dy1 * 0.55 + dx1 * (0.35 if x >= 0 else -0.35))
                          for x, y in NILAI_HITUNG])
        kurva0 = kurva(f_parabola, -2.2, 2.2, TINTA)
        tulisan_nilai = {}

        with sinema.babak(self, "titik", DURASI, kata=KATA) as b:
            # "Satu memberi" dan "Dua memberi" juga terdengar di dalam "Minus satu
            # memberi" dan "minus dua memberi", jadi kemunculan KEDUA yang dipakai.
            for frasa, ke, i in (("minus dua", 1, 0), ("Minus satu", 1, 1), ("Nol memberi", 1, 2),
                                 ("Satu memberi", 2, 3), ("Dua memberi", 2, 4)):
                b.tunggu_kata(frasa, ke=ke)
                b.main(FadeIn(titik5[i], scale=1.8), FadeIn(nilai5[i]), run_time=0.5)
                tulisan_nilai[f"nilai {i}"] = nilai5[i]
            b.tunggu_kata("kurvanya")
            self.add(kurva0)
            self.bring_to_front(titik5)
            b.main(ShowCreation(kurva0), run_time=1.6)
            dunia["kurva"] = kurva0
            dunia["titik lima"] = titik5
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia=dunia,
                          tulisan=dict(tulisan_nilai, x=lx, y=ly))

        # ============ geseratas: f(x) + 1 ================================= #
        kurva_atas = kurva(lambda t: f_parabola(t) + 1, -2.2, 2.2, AKSEN)
        titik_atas = VGroup(*[titik(x, y + 1, AKSEN) for x, y in NILAI_HITUNG])
        l24 = rumus(r"(2,\ 4)", 24, REDUP).move_to(cp(2, 4) + dx1 * 0.95)
        l25 = rumus(r"(2,\ 5)", 24, AKSEN).move_to(cp(2, 5) + dx1 * 0.95)

        with sinema.babak(self, "geseratas", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kita tulis")
            b.main(FadeOut(nilai5), run_time=0.4)
            self.remove(nilai5)
            papan.baris(r"f(x) + 1", AKSEN, b=b)
            b.tunggu_kata("naik satu")
            self.add(kurva_atas, titik_atas)
            kurva_atas.shift(-dy1)
            titik_atas.shift(-dy1)
            b.main(kurva0.animate.set_stroke(REDUP, 3), titik5.animate.set_color(REDUP),
                   kurva_atas.animate.shift(dy1), titik_atas.animate.shift(dy1), run_time=1.2)
            dunia["kurva atas"] = kurva_atas
            dunia["titik atas"] = titik_atas
            b.tunggu_kata("Titik dua")
            b.main(FadeIn(l24), run_time=0.5)
            b.tunggu_kata("sekarang jadi")
            b.main(FadeIn(l25), run_time=0.5)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia=dunia,
                          tulisan={"x": lx, "y": ly, "(2,4)": l24, "(2,5)": l25})

        # ============ tanya: f(x - 1), ke kiri atau ke kanan? ============= #
        # Petunjuk tebakan DI DALAM parabola (y = 2,2), bukan di bawah sumbu:
        # di bawah sumbu panahnya menindih angka -1 dan 1 (lembar kontak 12 Sep).
        tanda = rumus("?", 40, SOROT).move_to(cp(0, 2.2))
        p_kiri = Arrow(cp(-0.35, 2.2), cp(-1.3, 2.2), buff=0, thickness=3).set_color(SOROT)
        p_kanan = Arrow(cp(0.35, 2.2), cp(1.3, 2.2), buff=0, thickness=3).set_color(SOROT)

        with sinema.babak(self, "tanya", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekarang giliran")
            b.main(FadeOut(kurva_atas), FadeOut(titik_atas), FadeOut(l24), FadeOut(l25),
                   FadeOut(papan.semua()), kurva0.animate.set_stroke(TINTA, 4.5),
                   titik5.animate.set_color(AKSEN), run_time=0.7)
            self.remove(kurva_atas, titik_atas, l24, l25, *papan.semua())
            dunia.pop("kurva atas", None)
            dunia.pop("titik atas", None)
            papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
            b.tunggu_kata("Kita tulis")
            papan.baris(r"f(x - 1)", AKSEN2, b=b)
            b.tunggu_kata("Coba tebak")
            b.main(FadeIn(tanda, scale=1.4), GrowArrow(p_kiri), GrowArrow(p_kanan), run_time=0.8)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan),
                          dunia=dict(dunia, kiri=p_kiri, kanan=p_kanan),
                          tulisan={"x": lx, "y": ly, "tanda": tanda})

        # ============ jawab: ke kanan ===================================== #
        kurva_kanan = kurva(lambda t: f_parabola(t - 1), -1.2, 3.2, AKSEN2)
        titik_kanan = VGroup(*[titik(x + 1, y, AKSEN2) for x, y in NILAI_HITUNG])

        with sinema.babak(self, "jawab", DURASI, kata=KATA) as b:
            b.tunggu_kata("ke kanan")
            self.add(kurva_kanan, titik_kanan)
            kurva_kanan.shift(-dx1)
            titik_kanan.shift(-dx1)
            b.main(FadeOut(tanda), FadeOut(p_kiri), FadeOut(p_kanan),
                   kurva0.animate.set_stroke(REDUP, 3), titik5.animate.set_color(REDUP),
                   kurva_kanan.animate.shift(dx1), titik_kanan.animate.shift(dx1), run_time=1.2)
            self.remove(tanda, p_kiri, p_kanan)
            dunia["kurva kanan"] = kurva_kanan
            dunia["titik kanan"] = titik_kanan
            b.tunggu_kata("tandanya minus")
            b.main(papan.sorot(), run_time=1.0)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia=dunia, tulisan={"x": lx, "y": ly})

        # ============ kenapa: isi kurung nol saat x = 1 =================== #
        with sinema.babak(self, "kenapa", DURASI, kata=KATA) as b:
            b.tunggu_kata("isi kurungnya")
            nol = papan.baris(r"x - 1 = 0", AKSEN2, b=b)
            b.tunggu_kata("x sama")
            nol = sinema.ganti_rumus(self, nol, r"x - 1 = 0 \Rightarrow x = 1", b=b,
                                     papan=papan, warna=AKSEN2, run_time=0.8)
            b.main(Flash(cp(1, 0), color=AKSEN2, flash_radius=0.45, line_length=0.15), run_time=0.7)
            b.tunggu_kata("Titik terendah")
            b.main(Flash(cp(0, 0), color=REDUP, flash_radius=0.4, line_length=0.14), run_time=0.5)
            b.main(Flash(cp(1, 0), color=AKSEN2, flash_radius=0.45, line_length=0.15), run_time=0.6)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia=dunia, tulisan={"x": lx, "y": ly})

        # ============ akar: bentuk lain, perlakuan yang sama ============== #
        akar0 = kurva(f_akar, 0.0, 4.3, TINTA)
        akar_geser = kurva(lambda t: f_akar(t - 1) + 1, 1.0, 4.8, AKSEN2)
        panah_h = Arrow(cp(0, 0), cp(1, 0), buff=0, thickness=4).set_color(AKSEN2)
        panah_k = Arrow(cp(1, 0), cp(1, 1), buff=0, thickness=4).set_color(AKSEN)

        with sinema.babak(self, "akar", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kita ganti")
            b.main(FadeOut(kurva_kanan), FadeOut(titik_kanan), FadeOut(titik5),
                   FadeOut(papan.semua()), run_time=0.5)
            self.remove(kurva_kanan, titik_kanan, titik5, *papan.semua())
            for nama in ("kurva kanan", "titik kanan", "titik lima"):
                dunia.pop(nama, None)
            papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
            b.main(ReplacementTransform(kurva0, akar0), run_time=0.5)
            dunia["kurva"] = akar0
            b.tunggu_kata("dua akar")
            papan.baris(r"f(x) = 2\sqrt{x}", TINTA, b=b)
            b.tunggu_kata("kurang satu")
            self.add(akar_geser)
            akar_geser.shift(-dx1 - dy1)
            b.main(akar0.animate.set_stroke(REDUP, 3), akar_geser.animate.shift(dx1),
                   GrowArrow(panah_h), run_time=1.0)
            dunia["kurva geser"] = akar_geser
            dunia["panah h"] = panah_h
            b.tunggu_kata("tambah satu")
            b.main(akar_geser.animate.shift(dy1), GrowArrow(panah_k), run_time=0.9)
            dunia["panah k"] = panah_k
            papan.baris(r"f(x - 1) + 1", SOROT, b=b)
            b.tunggu_kata("tidak berubah")
            self.sorot_pita(b, panah_h, panah_k, lama=1.0)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia=dunia, tulisan={"x": lx, "y": ly})

        # ============ sinus =============================================== #
        sin0 = kurva(f_sinus, -2.9, 4.0, TINTA)
        sin_geser = kurva(lambda t: f_sinus(t - 1) + 1, -1.9, 5.0, AKSEN2)

        with sinema.babak(self, "sinus", DURASI, kata=KATA) as b:
            b.tunggu_kata("gelombang")
            b.main(FadeOut(akar_geser), FadeOut(papan.semua()), run_time=0.3)
            self.remove(akar_geser, *papan.semua())
            dunia.pop("kurva geser", None)
            papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
            # 0,6 dan 0,4 detik (dulu 0,8 dan 0,6): kata "Aturannya" datang lebih
            # cepat pada narasi Bian (14 Sep 2026)
            b.main(ReplacementTransform(akar0, sin0), run_time=0.6)
            sin0.set_stroke(TINTA, 4.5)
            dunia["kurva"] = sin0
            papan.baris(r"f(x) = 1{,}6\sin x + 1{,}6", TINTA, b=b, run_time=0.4)
            b.tunggu_kata("Aturannya")
            self.add(sin_geser)
            sin_geser.shift(-dx1 - dy1)
            b.main(sin0.animate.set_stroke(REDUP, 3), sin_geser.animate.shift(dx1 + dy1),
                   run_time=1.2)
            dunia["kurva geser"] = sin_geser
            papan.baris(r"f(x - 1) + 1", SOROT, b=b)
            b.tunggu_kata("luar kurung")
            self.sorot_pita(b, panah_k, lama=1.0)
            b.tunggu_kata("dalam kurung")
            self.sorot_pita(b, panah_h, lama=1.0)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia=dunia, tulisan={"x": lx, "y": ly})

        # ============ umum: y = f(x - h) + k ============================== #
        l_h = rumus("h", 26, AKSEN2).move_to(cp(0.5, 0) - dy1 * 0.5)
        l_k = rumus("k", 26, AKSEN).move_to(cp(1, 0.5) + dx1 * 0.5)

        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bentuk umumnya")
            b.main(FadeOut(papan.semua()), run_time=0.4)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
            b.tunggu_kata("y sama")
            sinema.lahir_rumus(self, r"y = f(x - h) + k", cp(2.2, 4.4), papan, b=b, warna=SOROT,
                               sebagai_utama=False, ukuran_lahir=48, tahan=0.8, run_time=1.1,
                               geser=UP * 0.9)
            b.tunggu_kata("bergeser h")
            b.main(FadeIn(l_h), run_time=0.4)
            self.sorot_pita(b, panah_h, lama=0.7)
            b.tunggu_kata("k ke atas")
            b.main(FadeIn(l_k), run_time=0.4)
            self.sorot_pita(b, panah_k, lama=0.8)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia=dunia,
                          tulisan={"x": lx, "y": ly, "h": l_h, "k": l_k})

        # ============ mampat: f(2x) ======================================= #
        kurva_kembali = kurva(f_parabola, -2.2, 2.2, TINTA)
        tanda2 = rumus("?", 40, SOROT).move_to(cp(0, 2.2))
        p_lebar = VGroup(Arrow(cp(-0.4, 2.2), cp(-1.3, 2.2), buff=0, thickness=3),
                         Arrow(cp(0.4, 2.2), cp(1.3, 2.2), buff=0, thickness=3)).set_color(SOROT)

        with sinema.babak(self, "mampat", DURASI, kata=KATA) as b:
            b.tunggu_kata("kembali ke")
            b.main(FadeOut(sin_geser), FadeOut(panah_h), FadeOut(panah_k), FadeOut(l_h),
                   FadeOut(l_k), FadeOut(papan.semua()), run_time=0.5)
            self.remove(sin_geser, panah_h, panah_k, l_h, l_k, *papan.semua())
            for nama in ("kurva geser", "panah h", "panah k"):
                dunia.pop(nama, None)
            papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
            b.main(ReplacementTransform(sin0, kurva_kembali), run_time=1.0)
            dunia["kurva"] = kurva_kembali
            papan.baris(r"f(x) = x^2", REDUP, b=b)
            b.tunggu_kata("dikalikan dua")
            papan.baris(r"f(2x)", AKSEN2, b=b)
            b.tunggu_kata("Tebak dulu")
            b.main(FadeIn(tanda2, scale=1.4), GrowArrow(p_lebar[0]), GrowArrow(p_lebar[1]),
                   run_time=0.8)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia=dict(dunia, lebar=p_lebar),
                          tulisan={"x": lx, "y": ly, "tanda": tanda2})

        # ============ setengah ============================================ #
        kurva_mampat = kurva(lambda t: f_parabola(2 * t), -1.1, 1.1, AKSEN2)
        t24 = titik(2, 4, REDUP, 0.08)
        t14 = titik(1, 4, AKSEN2, 0.08)
        l24b = rumus(r"(2,\ 4)", 24, REDUP).move_to(cp(2, 4) + dx1 * 0.95)
        l14 = rumus(r"(1,\ 4)", 24, AKSEN2).move_to(cp(1, 4) - dx1 * 0.8 + dy1 * 0.6)

        with sinema.babak(self, "setengah", DURASI, kata=KATA) as b:
            b.tunggu_kata("setengah")
            self.add(kurva_mampat)
            kurva_mampat.set_stroke(opacity=0)
            b.main(FadeOut(tanda2), FadeOut(p_lebar), kurva_kembali.animate.set_stroke(REDUP, 3),
                   kurva_mampat.animate.set_stroke(opacity=1), run_time=1.0)
            self.remove(tanda2, p_lebar)
            dunia["kurva mampat"] = kurva_mampat
            b.tunggu_kata("Nilai empat")
            b.main(FadeIn(t24, scale=1.8), FadeIn(l24b), run_time=0.5)
            b.tunggu_kata("sekarang sudah")
            b.main(FadeIn(t14, scale=1.8), FadeIn(l14), run_time=0.5)
            dunia["titik 24"] = t24
            dunia["titik 14"] = t14
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia=dunia,
                          tulisan={"x": lx, "y": ly, "(2,4)": l24b, "(1,4)": l14})

        # ============ kenapamampat ======================================== #
        with sinema.babak(self, "kenapamampat", DURASI, kata=KATA) as b:
            b.tunggu_kata("dikalikan dua")
            papan.baris(r"x = 1 \Rightarrow 2x = 2", AKSEN2, b=b)
            b.tunggu_kata("mengerjakan dua")
            papan.baris(r"f(2) = 4", AKSEN2, b=b)
            b.tunggu_kata("memampat")
            self.sorot_pita(b, kurva_mampat, lama=1.0)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan), dunia=dunia,
                          tulisan={"x": lx, "y": ly, "(2,4)": l24b, "(1,4)": l14})

        # ============ tutup: dua aturan sebagai lambang dan panah ========= #
        r1 = rumus(r"f(x) + 1", 40, AKSEN).move_to([-2.4, 1.3, 0])
        r2 = rumus(r"f(x - 1)", 40, AKSEN2).move_to([-2.4, 0.0, 0])
        r3 = rumus(r"f(2x)", 40, AKSEN2).move_to([-2.4, -1.3, 0])
        a1 = Arrow([0.3, 0.95, 0], [0.3, 1.75, 0], buff=0, thickness=5).set_color(AKSEN)
        a2 = Arrow([-0.2, 0.0, 0], [0.9, 0.0, 0], buff=0, thickness=5).set_color(AKSEN2)
        a3 = VGroup(Arrow([-0.5, -1.3, 0], [0.05, -1.3, 0], buff=0, thickness=5),
                    Arrow([0.9, -1.3, 0], [0.35, -1.3, 0], buff=0, thickness=5)).set_color(AKSEN2)
        n1 = rumus("1", 32, AKSEN).next_to(a1, RIGHT, buff=0.3)
        n2 = rumus("1", 32, AKSEN2).next_to(a2, RIGHT, buff=0.3)
        n3 = rumus(r"\tfrac{1}{2}", 32, AKSEN2).next_to(a3, RIGHT, buff=0.3)
        semua = Group(sumbu, lx, ly, kurva_kembali, kurva_mampat, t24, t14, l24b, l14)

        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jadi aturannya")
            b.main(FadeOut(semua), FadeOut(papan.semua()), run_time=0.9)
            self.remove(*semua, *papan.semua())
            dunia.clear()
            papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
            b.tunggu_kata("Angka di luar")
            b.main(FadeIn(r1, shift=RIGHT * 0.2), run_time=0.6)
            b.tunggu_kata("naik satu")
            b.main(GrowArrow(a1), FadeIn(n1), run_time=0.6)
            b.tunggu_kata("Angka yang")
            b.main(FadeIn(r2, shift=RIGHT * 0.2), FadeIn(r3, shift=RIGHT * 0.2), run_time=0.6)
            b.tunggu_kata("kebalikannya")
            b.main(GrowArrow(a2), FadeIn(n2), run_time=0.5)
            b.main(GrowArrow(a3[0]), GrowArrow(a3[1]), FadeIn(n3), run_time=0.5)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan),
                          dunia={"a1": a1, "a2": a2, "a3": a3},
                          tulisan={"r1": r1, "r2": r2, "r3": r3, "n1": n1, "n2": n2, "n3": n3})

        # ============ lanjut: nilai mutlak, melipat grafik ================ #
        judul_lanjut = teks("Transformasi Fungsi, Bagian 2", 30, SOROT).move_to([0, 1.9, 0])
        sumbu_kecil = Line([-2.6, -0.6, 0], [2.6, -0.6, 0]).set_stroke(REDUP, 2)
        gel = ParametricCurve(lambda t: np.array([t, -0.6 + 0.9 * np.sin(1.4 * t), 0]),
                              t_range=(-2.4, 2.4, 0.02)).set_stroke(TINTA, 4)
        lipat = ParametricCurve(lambda t: np.array([t, -0.6 + 0.9 * abs(np.sin(1.4 * t)), 0]),
                                t_range=(-2.4, 2.4, 0.02)).set_stroke(SOROT, 4)
        l_mutlak = rumus(r"|f(x)|", 34, SOROT).move_to([3.4, 0.0, 0])

        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Transformasi")
            pergi = Group(r1, r2, r3, a1, a2, a3, n1, n2, n3)
            b.main(FadeOut(pergi), FadeIn(judul_lanjut, shift=UP * 0.2), run_time=0.8)
            self.remove(*pergi)
            b.tunggu_kata("bagian grafik")
            b.main(ShowCreation(sumbu_kecil), ShowCreation(gel), run_time=1.0)
            b.tunggu_kata("dipaksa naik")
            b.main(Transform(gel, lipat), run_time=1.0)
            b.tunggu_kata("nilai mutlak")
            b.main(FadeIn(l_mutlak, scale=1.3), run_time=0.6)
        qc.periksa_adegan(self, {}, hud=hud(ident, papan),
                          dunia={"sumbu kecil": sumbu_kecil, "gelombang": gel},
                          tulisan={"judul": judul_lanjut, "mutlak": l_mutlak})

        sinema.laporkan_pemicu(self)

    # ================================================================== #
    def sorot_pita(self, b, *ruas, lama: float = 1.0):
        """Pita ungu tembus pandang di sepanjang panah atau kurva (bukan Indicate)."""
        pita = VGroup()
        for r in ruas:
            if isinstance(r, ParametricCurve):
                pita.add(r.copy().set_stroke(SOROT, 16, opacity=0.35))
            else:
                pita.add(Line(r.get_start(), r.get_end()).set_stroke(SOROT, 18, opacity=0.35))
        self.add(pita)
        b.main(FadeIn(pita), run_time=lama * 0.35)
        b.main(FadeOut(pita), run_time=lama * 0.65)
        self.remove(pita)
