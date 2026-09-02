"""Vektor Materi 03, Memecah panah jadi dua langkah. ManimGL.

Arah visualnya sama dengan Materi 01, 06, dan 08:
`docs/superpowers/specs/2026-09-02-video-vektor-bidang-bernomor.md`.
Matematika di bidang datar bernomor, kamera TEGAK LURUS setelah babak pembuka.
Keterangan pita bawah TIDAK dipakai: pita itu milik subtitle.

KENAPA MOBIL
Komponen bukan sekadar cara menulis, melainkan jawaban atas sebuah kendala
nyata: kendaraan tidak bisa menembus gedung, jadi jalur miring TERPAKSA jadi
dua langkah, mendatar lalu tegak. Dengan pengait itu siswa melihat komponen
sebagai sesuatu yang memang terjadi, bukan aturan yang tiba-tiba ada.

STORYBOARD
   1. sapa      3D miring DEKAT: mobil di persimpangan jalan berpetak.
   2. terbang   Turun ke tegak lurus; bidang koordinat bernomor muncul.
   3. miring    Panah miring dari titik asal ke (3, 4): jalur kalau bisa terbang.
   4. jalan     Mobilnya benar-benar berjalan 3 ke kanan lalu 4 ke atas.
   5. sama      Kedua jalur berakhir di titik yang sama persis.
   6. komponen  Dua angka itu namanya komponen: (3 4).
   7. tanya     Pertanyaan, lalu diam.
   8. tukar     (4 3) digambar: tempatnya berbeda, jadi urutan tidak boleh ditukar.
   9. tanda     (-3 4): komponen negatif berarti ke kiri.
  10. tulis     Vektor baris dan vektor kolom, artinya sama.
  11. koma      Titik pakai koma, vektor baris tanpa koma.
  12. tutup     Layar bersih, kalimat sorot Materi 03.

YANG SENGAJA TIDAK DIULANG
Aturan "ujung dikurangi pangkal" untuk vektor dari A ke B ada di halaman Materi
03, tetapi sudah dibahas tuntas di video Materi 08. Mengulangnya di sini hanya
memperpanjang video tanpa menambah apa pun.

JANGKAUAN BIDANG
Titik terjauh: (3, 4), (4, 3), dan (-3, 4). Jadi x cukup -4 sampai 6 dan y -1
sampai 5. Tinggi bingkai 8,0 dengan pusat y 1,8 menaruh baris paling bawah
bidang di sekitar -2,8 pada bingkai, masih di atas jalur subtitle.

WARNA: ungu panah miring (perpindahan sebenarnya), biru langkah mendatar,
merah langkah tegak, hitam susunan yang ditukar.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "vektor3-komponen"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

Z = 0.02
ASAL = np.array([0.0, 0.0, Z])
MX, MY = 3.0, 4.0                       # komponen mendatar dan tegak
TUJUAN = np.array([MX, MY, Z])
SUDUT = np.array([MX, 0.0, Z])          # tempat mobil berbelok

BIDANG_X, BIDANG_Y = (-4.0, 6.0, 1.0), (-1.0, 5.0, 1.0)
PETA = dict(theta=0, phi=0, pusat=(1.0, 1.8, 0.0), tinggi=8.0)


def panah(a, b, warna, tebal=5):
    a = np.array(a, dtype=float)
    b = np.array(b, dtype=float)
    if np.linalg.norm(b - a) < 0.05:
        b = a + 0.05 * RIGHT
    return Arrow(a, b, buff=0, thickness=tebal).set_color(warna)


class PecahJadiKomponen(AdeganMatra):
    def construct(self):
        frame = self.frame

        # ==============================================================
        # Babak 1: dunia nyata, 3D, dari dekat
        # ==============================================================
        alas = ilustrasi.tanah(14.0, 14.0, 2.0, z=-0.02)
        jalan = VGroup(ilustrasi.lantai_kisi(12.0, 1.0)[0])
        # Mobilnya REDUP, bukan merah bawaannya. Merah sudah dipakai untuk
        # komponen tegak, dan satu warna tidak boleh punya dua makna.
        # Benda cerita netral, matematika yang berwarna.
        asli = ilustrasi.mobil(0.8, warna=REDUP, warna_roda=TINTA)
        mobil = asli.copy()
        self.mx = ValueTracker(0.0)
        self.my = ValueTracker(0.0)
        # Mobilnya menghadap +x selama melaju mendatar, lalu menghadap +y saat
        # menanjak. Arahnya dibaca dari tracker, jadi tidak ada lompatan.
        self.hadap = ValueTracker(0.0)
        pusat0 = mobil.get_center().copy()

        def taruh(m):
            m.become(asli.copy())
            m.rotate(self.hadap.get_value() * DEGREES, axis=OUT, about_point=pusat0)
            m.move_to(pusat0 + np.array([self.mx.get_value(), self.my.get_value(), 0.0]))
        mobil.add_updater(taruh)

        kamera.pasang_awal(frame, theta=-28, phi=66, pusat=(1.2, 1.2, 0.5), tinggi=5.2)
        self.add(alas, jalan, mobil)
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Memecah panah jadi dua langkah", lama=3.2, y=2.4)
            b.catat(3.2)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"mobil": mobil})

        # ==============================================================
        # Babak 2: turun ke tegak lurus
        # ==============================================================
        bidang = ilustrasi.bidang_bernomor(BIDANG_X, BIDANG_Y)
        bidang.set_opacity(0)
        self.add(bidang)
        self.bring_to_front(mobil)
        identitas = teks("1 petak = 1 blok", 23, REDUP).to_corner(UL, buff=0.42)

        with sinema.babak(self, "terbang", DURASI) as b:
            lama = max(2.0, DURASI["terbang"] - 3.0)
            b.main(kamera.sudut(frame, **PETA), run_time=lama)
            b.main(FadeOut(jalan), FadeOut(alas),
                   bidang.animate.set_opacity(1), run_time=1.4)
            self.hud_tambah(identitas)
            identitas.set_opacity(0)
            b.main(identitas.animate.set_opacity(1), run_time=0.8)
        qc.periksa_adegan(self, {"bidang": bidang, "identitas": identitas})

        # ==============================================================
        # Babak 3: jalur kalau bisa terbang
        # ==============================================================
        p_miring = panah(ASAL, TUJUAN, SOROT, tebal=7)
        titik_tujuan = Dot(radius=0.09).set_color(SOROT).move_to(TUJUAN)
        l_tujuan = rumus(r"(3,\ 4)", 28, SOROT).move_to(TUJUAN + np.array([0.9, 0.35, 0.0]))
        panel_v = rumus(r"\vec{v} = (3\ \ 4)", 32, SOROT).to_corner(UR, buff=0.45)

        with sinema.babak(self, "miring", DURASI) as b:
            b.main(GrowArrow(p_miring), run_time=1.6)
            self.bring_to_front(mobil)
            b.main(FadeIn(titik_tujuan, scale=2.0), FadeIn(l_tujuan), run_time=0.6)
            self.hud_tambah(panel_v)
            panel_v.set_opacity(0)
            b.main(panel_v.animate.set_opacity(1), run_time=0.6)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"miring": p_miring, "titik": l_tujuan, "panel v": panel_v},
                          [("titik", "panel v")])

        # ==============================================================
        # Babak 4: mobilnya benar-benar berjalan, dua langkah
        # ==============================================================
        p_datar = always_redraw(
            lambda: panah(ASAL, ASAL + np.array([self.mx.get_value(), 0.0, 0.0]), AKSEN2))
        p_tegak = always_redraw(
            lambda: panah(SUDUT, SUDUT + np.array([0.0, self.my.get_value(), 0.0]), AKSEN))
        l_datar = rumus("3", 30, AKSEN2).move_to([MX / 2, -0.55, 0])
        l_tegak = rumus("4", 30, AKSEN).move_to([MX + 0.55, MY / 2, 0])

        with sinema.babak(self, "jalan", DURASI) as b:
            self.add(p_datar, p_tegak)
            self.bring_to_front(mobil)
            b.main(self.mx.animate.set_value(MX), run_time=1.8)
            b.main(FadeIn(l_datar), run_time=0.4)
            b.main(self.hadap.animate.set_value(90.0), run_time=0.5)
            b.main(self.my.animate.set_value(MY), run_time=2.0)
            b.main(FadeIn(l_tegak), run_time=0.4)
            b.jeda(0.6)
        qc.periksa_adegan(self, {"datar": p_datar, "tegak": p_tegak,
                                 "label datar": l_datar, "label tegak": l_tegak,
                                 "identitas": identitas},
                          [("label datar", "label tegak")])

        # ==============================================================
        # Babak 5: kedua jalur berakhir di titik yang sama
        # ==============================================================
        with sinema.babak(self, "sama", DURASI) as b:
            b.main(Indicate(titik_tujuan, scale_factor=1.0, color=TINTA), run_time=0.9)
            b.main(Indicate(p_miring, scale_factor=1.0, color=TINTA), run_time=0.9)
            b.main(Indicate(p_datar, scale_factor=1.0, color=SOROT),
                   Indicate(p_tegak, scale_factor=1.0, color=SOROT), run_time=1.2)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"miring": p_miring, "titik": l_tujuan})

        # ==============================================================
        # Babak 6: dua angka itu namanya komponen
        # ==============================================================
        k1 = rumus(r"\mathrm{mendatar} = 3", 28, AKSEN2)
        k2 = rumus(r"\mathrm{tegak} = 4", 28, AKSEN)
        blok = VGroup(k1, k2).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        blok.next_to(identitas, DOWN, buff=0.34).align_to(identitas, LEFT)

        with sinema.babak(self, "komponen", DURASI) as b:
            self.hud_tambah(blok)
            blok.set_opacity(0)
            for baris in blok:
                b.main(baris.animate.set_opacity(1), run_time=0.7)
            b.main(Indicate(panel_v, scale_factor=1.0, color=TINTA), run_time=1.0)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"blok": blok, "identitas": identitas, "panel v": panel_v},
                          [("blok", "identitas"), ("blok", "panel v")])

        # ==============================================================
        # Babak 7: pertanyaan
        # ==============================================================
        with sinema.babak(self, "tanya", DURASI) as b:
            b.main(Indicate(l_datar, scale_factor=1.0, color=SOROT),
                   Indicate(l_tegak, scale_factor=1.0, color=SOROT), run_time=1.2)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"identitas": identitas, "titik": l_tujuan})

        # ==============================================================
        # Babak 8: kalau urutannya ditukar
        # ==============================================================
        TUKAR = np.array([MY, MX, Z])
        p_tukar = panah(ASAL, TUKAR, TINTA, tebal=6)
        titik_tukar = Dot(radius=0.09).set_color(TINTA).move_to(TUKAR)
        l_tukar = rumus(r"(4\ \ 3)", 28, TINTA).move_to(TUKAR + np.array([0.95, 0.35, 0.0]))

        with sinema.babak(self, "tukar", DURASI) as b:
            b.main(GrowArrow(p_tukar), run_time=1.4)
            b.main(FadeIn(titik_tukar, scale=2.0), FadeIn(l_tukar), run_time=0.6)
            b.main(Indicate(titik_tujuan, scale_factor=1.0, color=SOROT),
                   Indicate(titik_tukar, scale_factor=1.0, color=SOROT), run_time=1.2)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"tukar": p_tukar, "label tukar": l_tukar,
                                 "titik": l_tujuan, "panel v": panel_v},
                          [("label tukar", "titik"), ("label tukar", "panel v")])

        # ==============================================================
        # Babak 9: komponen yang bertanda negatif
        # ==============================================================
        KIRI = np.array([-MX, MY, Z])
        # Hitam, bukan biru: biru sudah berarti "komponen mendatar". Hitam di
        # video ini berarti "sebuah pembanding", sama seperti panah (4 3) tadi,
        # dan keduanya memang tidak pernah tampil bersamaan.
        p_kiri = panah(ASAL, KIRI, TINTA, tebal=6)
        l_kiri = rumus(r"(-3\ \ 4)", 28, TINTA).move_to(KIRI + np.array([-0.15, 0.55, 0.0]))

        with sinema.babak(self, "tanda", DURASI) as b:
            b.main(FadeOut(p_tukar), FadeOut(titik_tukar), FadeOut(l_tukar), run_time=0.6)
            b.main(GrowArrow(p_kiri), run_time=1.4)
            b.main(FadeIn(l_kiri), run_time=0.5)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"kiri": p_kiri, "label kiri": l_kiri,
                                 "identitas": identitas, "blok": blok},
                          [("label kiri", "blok")])

        # ==============================================================
        # Babak 10: baris atau kolom
        # ==============================================================
        baris_v = rumus(r"(3\ \ 4)", 30, SOROT)
        atau = teks("atau", 22, REDUP)
        kolom_v = rumus(r"\begin{pmatrix} 3 \\ 4 \end{pmatrix}", 30, SOROT)
        tulis = VGroup(baris_v, atau, kolom_v).arrange(RIGHT, buff=0.32)
        tulis.next_to(blok, DOWN, buff=0.40).align_to(blok, LEFT)

        with sinema.babak(self, "tulis", DURASI) as b:
            b.main(FadeOut(p_kiri), FadeOut(l_kiri), run_time=0.6)
            self.hud_tambah(tulis)
            tulis.set_opacity(0)
            b.main(tulis.animate.set_opacity(1), run_time=1.0)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"tulis": tulis, "blok": blok, "identitas": identitas},
                          [("tulis", "blok")])

        # ==============================================================
        # Babak 11: koma atau tanpa koma
        # ==============================================================
        # Ukurannya dinaikkan: pada 480p, huruf 20 tinggal sekitar sepuluh
        # piksel dan praktis tidak terbaca. Terlihat di lembar kontak pertama.
        beda1 = rumus(r"A(3,\ 4)", 30, TINTA)
        beda2 = teks("letak", 23, REDUP)
        beda3 = rumus(r"(3\ \ 4)", 30, SOROT)
        beda4 = teks("perpindahan", 23, REDUP)
        kiri_kol = VGroup(beda1, beda2).arrange(DOWN, buff=0.12)
        kanan_kol = VGroup(beda3, beda4).arrange(DOWN, buff=0.12)
        beda = VGroup(kiri_kol, kanan_kol).arrange(RIGHT, buff=0.75)
        beda.next_to(tulis, DOWN, buff=0.40).align_to(tulis, LEFT)

        with sinema.babak(self, "koma", DURASI) as b:
            self.hud_tambah(beda)
            beda.set_opacity(0)
            b.main(kiri_kol.animate.set_opacity(1), run_time=0.8)
            b.main(kanan_kol.animate.set_opacity(1), run_time=0.8)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"beda": beda, "tulis": tulis, "blok": blok},
                          [("beda", "tulis")])

        # ==============================================================
        # Babak 12: layar bersih, kalimat sorot
        # ==============================================================
        tutup1 = teks("Dua angka sudah cukup mewakili satu panah.", 32, TINTA)
        sinema.batasi_lebar(tutup1, 11.4)
        tutup2 = teks("Itulah sebabnya vektor bisa dihitung, bukan cuma digambar.", 32, SOROT)
        sinema.batasi_lebar(tutup2, 11.4)
        tutup = VGroup(tutup1, tutup2).arrange(DOWN, buff=0.34).move_to([0, 0.3, 0])

        semua = Group(bidang, mobil, p_miring, p_datar, p_tegak, titik_tujuan,
                      l_tujuan, l_datar, l_tegak)
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(semua), FadeOut(blok), FadeOut(tulis), FadeOut(beda),
                   FadeOut(identitas), FadeOut(panel_v), run_time=1.4)
            self.hud_tambah(tutup)
            tutup.set_opacity(0)
            b.main(tutup.animate.set_opacity(1), run_time=1.8)
            b.jeda(1.4)
        qc.periksa_adegan(self, {"tutup": tutup})
