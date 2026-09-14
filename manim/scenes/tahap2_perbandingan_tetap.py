"""Perbandingan Trigonometri, Bagian 2 (Materi 02): perbandingan yang tidak
berubah. STANDAR VIDEO v3.1, ditulis ulang 11 Sep 2026 dari adegan Manim CE
yang sudah disetujui ARYA (31 Agu). ISINYA SAMA: segitiga 1,8 dan 2,4 lalu 3
dan 4, hasil bagi 0,75 dua kali, pengali k saling menghapus, sudut digeser
barulah angkanya berubah.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 2, bukan judul materi.
- Segar-ingat 25 detik: gambar kunci Bagian 1 (orang dan pohon dengan
  bayangannya, keduanya 1,25) supaya "dugaan" yang mau dibuktikan terlihat,
  bukan cuma disebut.
- Tiap kejadian dipicu pada kata yang mengucapkannya (`tunggu_kata`).
- Hasil bagi lahir besar di dekat segitiga lalu disimpan di panel kanan atas.
- Satu babak tambahan "berapa pun pengalinya": 2, 10, 100 kali, tetap 0,75.

PUNCAKNYA tetap pencoretan k: yang membuat hasil bagi tetap bukan keajaiban,
melainkan pembilang dan penyebut dikali angka yang sama.

WARNA (sama dengan widget materi 02): merah = sisi depan, biru = sisi
samping, tinta = sisi miring, ungu = sudut dan hasil.

ANGKANYA: 1,8 : 2,4 = 0,75; 3 : 4 = 0,75; 3,6 : 4,8 = 18 : 24 = 180 : 240 =
0,75; tinggi orang 1,25 kali bayangannya, pohon juga (Bagian 1).
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "tahap2-perbandingan-tetap"
DURASI = json.loads((sinema.folder_audio(TOPIK) / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

# --- segitiga di kiri; kaki layar (y < -2,55) milik subtitle -------------
SIKU = np.array([-5.75, -1.75, 0.0])
SATUAN = 1.05                 # panjang layar untuk 1 sentimeter
RASIO = 0.75                  # depan : samping
AWAL, BESAR = 2.4, 4.0        # sisi samping, sentimeter

# --- tempat hitungan di kanan ---------------------------------------------
PUSAT_KERJA = np.array([2.6, -0.45, 0.0])


def hud(ident, papan):
    isi = {"identitas": ident} if ident is not None else {}
    p = papan.semua()
    if p is not None:
        isi["papan"] = p
    return isi


def siku_tanda(sudut_di, arah_a, arah_b, ukuran=0.30, warna=REDUP):
    """Tanda siku-siku yang berdiri di dalam segitiga."""
    p = np.array(sudut_di)
    u = np.array(arah_a) / max(np.linalg.norm(arah_a), 1e-9) * ukuran
    v = np.array(arah_b) / max(np.linalg.norm(arah_b), 1e-9) * ukuran
    return VGroup(Line(p + u, p + u + v), Line(p + v, p + u + v)).set_stroke(warna, 2.4)


def pecahan(atas, bawah, ukuran=52, warna_atas=AKSEN, warna_bawah=AKSEN2, di=None):
    """Pecahan yang dirakit dari potongan terpisah, supaya tiap potongan
    (misalnya huruf k) bisa dicoret dan dibuang satu per satu."""
    a = VGroup(*[rumus(s, ukuran, warna_atas) for s in atas]).arrange(RIGHT, buff=0.16)
    b = VGroup(*[rumus(s, ukuran, warna_bawah) for s in bawah]).arrange(RIGHT, buff=0.16)
    lebar = max(a.get_width(), b.get_width()) + 0.3
    garis = Line(LEFT * lebar / 2, RIGHT * lebar / 2).set_stroke(TINTA, 3)
    a.next_to(garis, UP, buff=0.16)
    b.next_to(garis, DOWN, buff=0.16)
    g = VGroup(a, b, garis)
    if di is not None:
        g.move_to(di)
    return g


def sama_dengan(pecahan_mob, hasil, ukuran=52, warna=SOROT):
    """`= hasil` di kanan sebuah pecahan, rata dengan garis bagi."""
    m = rumus(f"= {hasil}", ukuran, warna)
    m.next_to(pecahan_mob, RIGHT, buff=0.3)
    m.match_y(pecahan_mob[2])
    return m


class PerbandinganTetap(AdeganMatra):
    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
        ident = None

        # ============ buka ============================================== #
        tanya = teks("Kenapa sudut yang sama selalu memberi angka yang sama?", 34, TINTA)
        tanya.move_to([0, -0.6, 0])
        sinema.batasi_lebar(tanya, 10.5)
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Perbandingan")
            sinema.judul_pembuka(self, "Perbandingan Trigonometri, Bagian 2", lama=3.2)
            b.catat(3.2)
            b.tunggu_kata("Kenapa")
            b.main(Write(tanya), run_time=2.0)
            b.main(FadeOut(tanya), run_time=0.7)

        # ============ segar-ingat: orang dan pohon dari Bagian 1 ======== #
        y_tanah = -1.9
        # orang: bayangan 1 satuan, tinggi 1,25; pohon: bayangan 2, tinggi 2,5
        def sosok(x0, bayang, tinggi):
            kaki = np.array([x0, y_tanah, 0])
            ujung = kaki + RIGHT * bayang
            puncak = ujung + UP * tinggi
            return VGroup(
                Line(kaki, ujung).set_stroke(AKSEN2, 5),          # bayangan
                Line(ujung, puncak).set_stroke(AKSEN, 5),          # tinggi
                DashedLine(kaki, puncak).set_stroke(REDUP, 2.4),   # sinar matahari
                Arc(radius=0.42, start_angle=0, angle=np.arctan(tinggi / bayang),
                    arc_center=kaki).set_stroke(SOROT, 3),
            )
        orang = sosok(-0.6, 1.0, 1.25)
        pohon = sosok(2.6, 2.0, 2.5)
        l_orang = sinema.label("orang", warna=TINTA).next_to(orang[1], UP, buff=0.18)
        l_pohon = sinema.label("pohon", warna=TINTA).next_to(pohon[1], UP, buff=0.18)
        # Hasil bagi di KANAN sisi tegaknya, bukan di bawah tanah: pada render
        # 480p pertama (11 Sep) yang di bawah tanah menindih garis tanahnya.
        r_orang = rumus(r"\frac{\text{tinggi}}{\text{bayangan}} = 1{,}25", 26, SOROT)
        r_orang.next_to(orang[1], RIGHT, buff=0.28)
        r_pohon = rumus(r"\frac{\text{tinggi}}{\text{bayangan}} = 1{,}25", 26, SOROT)
        r_pohon.next_to(pohon[1], RIGHT, buff=0.28)
        tanah = Line([-1.2, y_tanah, 0], [6.4, y_tanah, 0]).set_stroke(REDUP, 2)
        tanah.latar = True

        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("materi sebelumnya")
            ident = sinema.identitas(self, "ingat Bagian 1")
            ident.set_opacity(0.0)
            b.main(ident.animate.set_opacity(1.0), FadeIn(tanah), run_time=0.6)
            b.tunggu_kata("Tinggi")
            b.main(ShowCreation(orang[1]), ShowCreation(orang[0]), FadeIn(l_orang),
                   run_time=0.8)
            b.main(ShowCreation(orang[2]), ShowCreation(orang[3]), run_time=0.5)
            b.tunggu_kata("hasilnya")
            b.main(Write(r_orang), run_time=1.4)
            b.tunggu_kata("pohon")
            b.main(ShowCreation(pohon[1]), ShowCreation(pohon[0]), FadeIn(l_pohon),
                   run_time=0.6)
            b.main(ShowCreation(pohon[2]), ShowCreation(pohon[3]), run_time=0.4)
            b.tunggu_kata("hasilnya", ke=2)
            b.main(Write(r_pohon), run_time=1.4)
        qc.periksa_adegan(self, {"orang": orang, "pohon": pohon},
                          hud=hud(ident, papan), dunia={"tanah": tanah},
                          tulisan={"label orang": l_orang, "label pohon": l_pohon,
                                   "rasio orang": r_orang, "rasio pohon": r_pohon})

        ingatan = VGroup(tanah, orang, pohon, l_orang, l_pohon, r_orang, r_pohon)

        # ============ dugaan yang mau dibuktikan ========================= #
        with sinema.babak(self, "dugaan", DURASI, kata=KATA) as b:
            b.tunggu_kata("sudut")
            b.main(Indicate(orang[3], color=SOROT), Indicate(pohon[3], color=SOROT),
                   run_time=1.2)
            b.tunggu_kata("perbandingan")
            b.main(Indicate(r_orang, color=SOROT), Indicate(r_pohon, color=SOROT),
                   run_time=1.2)
            b.tunggu_kata("buktikan")
            # Gambar Bagian 1 TIDAK dibuang di sini: dibuang bersamaan dengan
            # segitiga digambar di babak berikutnya, supaya layar tidak kosong
            # tiga detik di antara dua kalimat (temuan cek_layar_kosong 11 Sep).
            ident2 = sinema.identitas(self, "dulu buktinya")
            ident2.set_opacity(0.0)
            b.main(FadeOut(ident), run_time=0.3)
            b.main(ident2.animate.set_opacity(1.0), run_time=0.3)
            ident = ident2

        # ============ segitiga hidup: sisi ikut pelacak ================== #
        samping_cm = ValueTracker(AWAL)
        rasio = ValueTracker(RASIO)

        def B():
            return SIKU + RIGHT * samping_cm.get_value() * SATUAN

        def C():
            return B() + UP * samping_cm.get_value() * rasio.get_value() * SATUAN

        samping = always_redraw(lambda: Line(SIKU, B()).set_stroke(AKSEN2, 6))
        depan = always_redraw(lambda: Line(B(), C()).set_stroke(AKSEN, 6))
        miring = always_redraw(lambda: Line(SIKU, C()).set_stroke(TINTA, 6))
        tanda = always_redraw(lambda: siku_tanda(B(), SIKU - B(), C() - B()))
        busur = always_redraw(lambda: Arc(
            radius=0.55, start_angle=0, angle=np.arctan(rasio.get_value()),
            arc_center=SIKU).set_stroke(SOROT, 4))
        theta = rumus(r"\theta", 32, SOROT)
        theta.add_updater(lambda m: m.move_to(
            SIKU + rotate_vector(RIGHT * 0.95, np.arctan(rasio.get_value()) / 2)))
        segitiga = VGroup(samping, depan, miring, tanda, busur, theta)

        # Angka sisi yang ikut berubah saat segitiga dibesarkan. Dirender
        # LaTeX lewat `rumus` (aturan: semua huruf LaTeX), bukan DecimalNumber
        # yang memakai huruf Pango dan terlihat beda jenis dari angka lainnya.
        def cm(nilai):
            return f"{nilai:.1f}".replace(".", "{,}") + r"\ \mathrm{cm}"
        lab_samping = always_redraw(lambda: rumus(cm(samping_cm.get_value()), 28, AKSEN2)
                                    .next_to(Line(SIKU, B()), DOWN, buff=0.22))
        lab_depan = always_redraw(lambda: rumus(cm(samping_cm.get_value() * rasio.get_value()),
                                                28, AKSEN)
                                  .next_to(Line(B(), C()), RIGHT, buff=0.22))

        with sinema.babak(self, "segitiga", DURASI, kata=KATA) as b:
            b.tunggu_kata("segitiga")
            b.main(FadeOut(ingatan), ShowCreation(samping), ShowCreation(depan),
                   ShowCreation(miring), run_time=0.9)
            b.main(ShowCreation(tanda), run_time=0.3)
            b.tunggu_kata("sudut")
            b.main(ShowCreation(busur), FadeIn(theta), run_time=0.9)
            b.tunggu_kata("depannya")
            b.main(Indicate(depan, color=AKSEN, scale_factor=1.0), run_time=0.5)
            b.tunggu_kata("koma")
            b.main(FadeIn(lab_depan, shift=LEFT * 0.15), run_time=0.8)
            b.tunggu_kata("sampingnya")
            b.main(Indicate(samping, color=AKSEN2, scale_factor=1.0), run_time=0.5)
            b.tunggu_kata("koma", ke=2)
            b.main(FadeIn(lab_samping, shift=UP * 0.15), run_time=0.8)
        qc.periksa_adegan(self, {"segitiga": segitiga}, hud=hud(ident, papan),
                          tulisan={"angka depan": lab_depan, "angka samping": lab_samping})

        # ============ bagi pertama: 1,8 : 2,4 = 0,75 ===================== #
        p1 = pecahan(["1{,}8"], ["2{,}4"], di=PUSAT_KERJA)
        with sinema.babak(self, "bagi1", DURASI, kata=KATA) as b:
            b.tunggu_kata("depan")
            b.main(Indicate(depan, color=AKSEN, scale_factor=1.0), run_time=0.5)
            b.tunggu_kata("samping")
            b.main(Indicate(samping, color=AKSEN2, scale_factor=1.0), run_time=0.5)
            b.tunggu_kata("Satu")
            b.main(FadeIn(p1[0], shift=DOWN * 0.2), ShowCreation(p1[2]), run_time=0.9)
            b.tunggu_kata("dua")
            b.main(FadeIn(p1[1], shift=UP * 0.2), run_time=0.9)
            b.tunggu_kata("Hasilnya")
            h1 = sama_dengan(p1, "0{,}75")
            b.main(Write(h1), run_time=1.0)
            papan.baris(r"1{,}8 : 2{,}4 = 0{,}75", warna=TINTA, b=b)
        qc.periksa_adegan(self, {"segitiga": segitiga, "pecahan": p1, "hasil": h1},
                          hud=hud(ident, papan),
                          tulisan={"angka depan": lab_depan, "angka samping": lab_samping})

        # ============ segitiga dibesarkan, sudut tidak disentuh ========== #
        # Tepat di atas titik sudut, di LUAR segitiga: di atas busurnya label ini
        # menindih sisi miring (lembar kontak 1080p pertama, detik 66).
        jaga = sinema.label("sudut tetap", warna=SOROT)
        jaga.move_to(SIKU + UP * 1.3 + LEFT * 0.15)
        with sinema.babak(self, "besarkan", DURASI, kata=KATA) as b:
            b.tunggu_kata("besarkan")
            b.main(FadeOut(p1), FadeOut(h1), run_time=0.4)
            b.main(samping_cm.animate.set_value(BESAR), run_time=2.2)
            b.tunggu_kata("sentuh")
            b.main(Indicate(busur, color=SOROT, scale_factor=1.0), FadeIn(jaga), run_time=1.0)
            b.tunggu_kata("berubah")
            b.main(Indicate(lab_depan, color=AKSEN), Indicate(lab_samping, color=AKSEN2),
                   run_time=1.0)
        qc.periksa_adegan(self, {"segitiga": segitiga}, hud=hud(ident, papan),
                          tulisan={"angka depan": lab_depan, "angka samping": lab_samping,
                                   "jaga": jaga})

        # ============ ukuran baru: 3 cm dan 4 cm ========================= #
        # Angka hidup diganti angka bulat SESUDAH berhenti bergerak, supaya
        # yang tertulis sama dengan yang diucapkan (3 cm, bukan 3,0 cm).
        s_depan = rumus(r"3\ \mathrm{cm}", 28, AKSEN)
        s_samping = rumus(r"4\ \mathrm{cm}", 28, AKSEN2)
        with sinema.babak(self, "ukur2", DURASI, kata=KATA) as b:
            b.tunggu_kata("tiga")
            lab_depan.clear_updaters()
            s_depan.next_to(Line(B(), C()), RIGHT, buff=0.22)
            b.main(FadeOut(lab_depan), FadeIn(s_depan), run_time=0.7)
            b.main(Indicate(s_depan, color=AKSEN), run_time=0.7)
            b.tunggu_kata("empat")
            lab_samping.clear_updaters()
            s_samping.next_to(Line(SIKU, B()), DOWN, buff=0.22)
            b.main(FadeOut(lab_samping), FadeIn(s_samping), run_time=0.7)
            b.main(Indicate(s_samping, color=AKSEN2), run_time=0.7)
            b.tunggu_kata("berbeda")
            b.main(Indicate(s_depan, color=AKSEN), Indicate(s_samping, color=AKSEN2),
                   run_time=1.0)
        qc.periksa_adegan(self, {"segitiga": segitiga}, hud=hud(ident, papan),
                          tulisan={"angka depan": s_depan, "angka samping": s_samping,
                                   "jaga": jaga})

        # ============ bagi kedua: 3 : 4 = 0,75, sama persis ============== #
        p2 = pecahan(["3"], ["4"], di=PUSAT_KERJA)
        with sinema.babak(self, "bagi2", DURASI, kata=KATA) as b:
            b.tunggu_kata("bagi")
            b.main(FadeOut(jaga), run_time=0.3)
            b.tunggu_kata("Tiga")
            b.main(FadeIn(p2[0], shift=DOWN * 0.2), ShowCreation(p2[2]), run_time=0.6)
            b.tunggu_kata("empat")
            b.main(FadeIn(p2[1], shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("Hasilnya")
            h2 = sama_dengan(p2, "0{,}75")
            b.main(Write(h2), run_time=1.0)
            baris2 = papan.baris(r"3 : 4 = 0{,}75", warna=TINTA, b=b)
            b.tunggu_kata("Sama")
            # Kotak mengelilingi kedua hasil di panel: dua angka 0,75 yang sama.
            baris1 = papan.baris_lain[0]
            kotak = SurroundingRectangle(VGroup(baris1, baris2), buff=0.12)
            kotak.set_stroke(SOROT, 2.5)
            kotak.fix_in_frame()
            b.main(ShowCreation(kotak), run_time=0.9)
        qc.periksa_adegan(self, {"segitiga": segitiga, "pecahan": p2, "hasil": h2},
                          hud=hud(ident, papan),
                          tulisan={"angka depan": s_depan, "angka samping": s_samping})

        # ============ sebabnya: kedua sisi dikali angka yang sama ======== #
        p3 = pecahan(["1{,}8", r"\times", "k"], ["2{,}4", r"\times", "k"], di=PUSAT_KERJA)
        for bagian in (p3[0], p3[1]):
            bagian[1].set_color(TINTA)
            bagian[2].set_color(SOROT)
        with sinema.babak(self, "kenapa", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sebabnya")
            b.main(FadeOut(kotak), FadeOut(p2), FadeOut(h2), run_time=0.6)
            ident3 = sinema.identitas(self, "lalu sebabnya")
            ident3.set_opacity(0.0)
            b.main(FadeOut(ident), run_time=0.3)
            b.main(ident3.animate.set_opacity(1.0), run_time=0.3)
            ident = ident3
            b.tunggu_kata("diperbesar")
            b.main(FadeIn(p3[0][0]), FadeIn(p3[1][0]), ShowCreation(p3[2]), run_time=0.8)
            b.tunggu_kata("dikalikan")
            b.main(FadeIn(p3[0][1], shift=LEFT * 0.15), FadeIn(p3[1][1], shift=LEFT * 0.15),
                   run_time=0.6)
            b.tunggu_kata("k")
            b.main(FadeIn(p3[0][2], scale=0.6), FadeIn(p3[1][2], scale=0.6), run_time=0.7)
        qc.periksa_adegan(self, {"segitiga": segitiga, "pecahan": p3},
                          hud=hud(ident, papan),
                          tulisan={"angka depan": s_depan, "angka samping": s_samping})

        # ============ puncak: k di atas dan di bawah saling menghapus ==== #
        def coret(m):
            return Line(m.get_corner(DL) + DL * 0.06, m.get_corner(UR) + UR * 0.06
                        ).set_stroke(AKSEN, 4)
        coretan = VGroup(coret(p3[0][2]), coret(p3[1][2]))
        with sinema.babak(self, "hapus", DURASI, kata=KATA) as b:
            b.tunggu_kata("atas")
            b.main(Indicate(p3[0][2], color=SOROT), run_time=0.5)
            b.tunggu_kata("bawah")
            b.main(Indicate(p3[1][2], color=SOROT), run_time=0.5)
            b.tunggu_kata("menghapus")
            b.main(ShowCreation(coretan), run_time=0.9)
            b.tunggu_kata("tersisa")
            # Yang dicoret pergi bersama coretannya; sisanya bergeser rapat.
            sisa = pecahan(["1{,}8"], ["2{,}4"], di=PUSAT_KERJA)
            b.main(FadeOut(coretan), FadeOut(p3[0][1]), FadeOut(p3[0][2]),
                   FadeOut(p3[1][1]), FadeOut(p3[1][2]),
                   ReplacementTransform(p3[0][0], sisa[0]),
                   ReplacementTransform(p3[1][0], sisa[1]),
                   ReplacementTransform(p3[2], sisa[2]), run_time=1.2)
            b.tunggu_kata("nol")
            h3 = sama_dengan(sisa, "0{,}75")
            b.main(Write(h3), run_time=1.0)
        qc.periksa_adegan(self, {"segitiga": segitiga, "sisa": sisa, "hasil": h3},
                          hud=hud(ident, papan),
                          tulisan={"angka depan": s_depan, "angka samping": s_samping})

        # ============ berapa pun pengalinya ============================== #
        p4 = pecahan(["3{,}6"], ["4{,}8"], di=PUSAT_KERJA)
        p5 = pecahan(["18"], ["24"], di=PUSAT_KERJA)
        p6 = pecahan(["180"], ["240"], di=PUSAT_KERJA)
        k_lab = rumus(r"k = 2", 30, SOROT).next_to(p4, UP, buff=0.45)
        with sinema.babak(self, "berapapun", DURASI, kata=KATA) as b:
            # Pudar dulu, baru muncul: pudar-silang menumpuk dua angka di
            # tengah peralihan (terlihat "1188" pada render 480p pertama).
            b.tunggu_kata("dua")
            b.main(FadeOut(h3), FadeOut(sisa), run_time=0.25)
            b.main(FadeIn(k_lab), FadeIn(p4), run_time=0.4)
            b.tunggu_kata("sepuluh")
            k10 = rumus(r"k = 10", 30, SOROT).move_to(k_lab)
            b.main(FadeOut(k_lab), FadeOut(p4), run_time=0.25)
            b.main(FadeIn(k10), FadeIn(p5), run_time=0.4)
            k_lab = k10
            b.tunggu_kata("seratus")
            k100 = rumus(r"k = 100", 30, SOROT).move_to(k_lab)
            b.main(FadeOut(k_lab), FadeOut(p5), run_time=0.25)
            b.main(FadeIn(k100), FadeIn(p6), run_time=0.4)
            k_lab = k100
            b.tunggu_kata("tetap")
            h4 = sama_dengan(p6, "0{,}75")
            b.main(Write(h4), run_time=0.9)
            b.main(Indicate(h4, color=SOROT), run_time=0.8)
        qc.periksa_adegan(self, {"segitiga": segitiga, "pecahan": p6, "hasil": h4,
                                 "k": k_lab}, hud=hud(ident, papan),
                          tulisan={"angka depan": s_depan, "angka samping": s_samping})

        # ============ sudutnya yang diubah: barulah angkanya berubah ===== #
        # Angka hidup LaTeX (bukan DecimalNumber berhuruf Pango), dibangun ulang
        # tiap nilainya berganti; LaTeX-nya tersimpan di cache sesudah sekali.
        label_rasio = rumus(r"\frac{\text{depan}}{\text{samping}} =", 40, TINTA)
        label_rasio.move_to(PUSAT_KERJA + UP * 0.2 + LEFT * 0.6)
        hidup = always_redraw(lambda: rumus(f"{rasio.get_value():.2f}".replace(".", "{,}"), 44, SOROT)
                              .next_to(label_rasio, RIGHT, buff=0.3).match_y(label_rasio))
        panel = VGroup(label_rasio, hidup)
        with sinema.babak(self, "geser", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekarang")
            b.main(FadeOut(p6), FadeOut(h4), FadeOut(k_lab), FadeOut(s_depan),
                   FadeOut(s_samping), run_time=0.6)
            b.main(FadeIn(panel), run_time=0.6)
            b.tunggu_kata("bergerak")
            b.main(rasio.animate.set_value(1.15), run_time=1.2, rate_func=smooth)
            b.tunggu_kata("angkanya")
            b.main(rasio.animate.set_value(0.42), run_time=1.8, rate_func=smooth)
        qc.periksa_adegan(self, {"segitiga": segitiga, "panel": panel},
                          hud=hud(ident, papan))

        # ============ simpulan: hanya sudut yang menentukan ============== #
        with sinema.babak(self, "simpul", DURASI, kata=KATA) as b:
            b.tunggu_kata("hanya")
            b.main(rasio.animate.set_value(RASIO), run_time=0.8, rate_func=smooth)
            b.tunggu_kata("sudut")
            b.main(Indicate(busur, color=SOROT, scale_factor=1.0), run_time=0.7)
            b.tunggu_kata("ukuran")
            b.main(samping_cm.animate.set_value(AWAL), run_time=0.9, rate_func=smooth)
            b.main(samping_cm.animate.set_value(BESAR), run_time=0.9, rate_func=smooth)

        # ============ penutup: dihitung sekali lalu dibukukan ============ #
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("dihitung")
            b.main(Indicate(panel, color=SOROT), run_time=0.8)
            b.tunggu_kata("dibukukan")
            b.main(papan.sorot(), run_time=1.0)
            b.tunggu_kata("segitiga")
            b.main(samping_cm.animate.set_value(3.2), run_time=0.7, rate_func=smooth)
            b.main(samping_cm.animate.set_value(BESAR), run_time=0.7, rate_func=smooth)

        lanjut = teks("Bagian 3: menamai ketiga sisi", 32, SOROT)
        lanjut.move_to(PUSAT_KERJA + DOWN * 1.1)
        sinema.batasi_lebar(lanjut, 7.0)
        tanya3 = VGroup(*[rumus("?", 30, REDUP) for _ in range(3)])
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Perbandingan")
            b.main(FadeIn(lanjut, shift=UP * 0.2), run_time=1.0)
            b.tunggu_kata("ketiga")
            tanya3[0].next_to(Line(B(), C()), RIGHT, buff=0.22)
            tanya3[1].next_to(Line(SIKU, B()), DOWN, buff=0.22)
            tanya3[2].move_to((SIKU + C()) / 2 + UP * 0.35 + LEFT * 0.25)
            b.main(LaggedStartMap(FadeIn, tanya3, lag_ratio=0.35), run_time=1.2)
            b.tunggu_kata("jelas")
            b.main(Indicate(lanjut, color=SOROT), run_time=1.0)
        qc.periksa_adegan(self, {"segitiga": segitiga, "panel": panel},
                          hud=hud(ident, papan),
                          tulisan={"lanjut": lanjut, "tanya": tanya3})

        sinema.laporkan_pemicu(self)
