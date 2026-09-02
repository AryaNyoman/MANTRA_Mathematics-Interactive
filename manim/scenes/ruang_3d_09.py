"""Ruang Tiga Dimensi, materi 09: "Sudut dengan bidang dan sudut antarbidang" (ManimGL).

Naskah   : manim/narasi/ruang-3d-09.json
Render   : manimgl manim/scenes/ruang_3d_09.py SudutDenganBidang -w -l
Periksa  : python manim/cek_video.py media/gl/SudutDenganBidang.mp4
Gabung   : python manim/gabung_audio.py ruang-3d-09 SudutDenganBidang --uji

DUA IDE BESAR, MASING-MASING DAPAT BABAKNYA SENDIRI
Materi ini memuat dua hal yang sering tertukar: sudut GARIS dengan bidang, dan
sudut BIDANG dengan bidang. Keduanya tidak dicampur dalam satu babak, sebab
satu sesi satu ide (STANDAR-MENGAJAR bagian 1 butir 3). Bagian pertama memakai
bayangan; bagian kedua memakai garis potong.

SATU WARNA SATU MAKNA:
  AKSEN merah = garis atau bidang yang MIRING (AG, lalu bidang BDG)
  AKSEN2 biru = bayangan dan garis bantu di LANTAI (AC, lalu PC)
  SOROT ungu  = sudut yang dicari, dan titik tumpu P
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ruang_3d_umum import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

TOPIK = "ruang-3d-09"
DURASI = durasi(TOPIK)

P = (T["B"] + T["D"]) / 2.0   # titik tumpu di TENGAH garis potong BD


class SudutDenganBidang(AdeganMatra):
    def construct(self):
        frame = self.frame

        kubus = kubus_pejal()
        rangka = rangka_kubus()

        ag = Line(T["A"], T["G"]).set_stroke(AKSEN, 6)
        ac = Line(T["A"], T["C"]).set_stroke(AKSEN2, 6)
        cg = Line(T["C"], T["G"]).set_stroke(REDUP, 3)
        siku_c = siku(T["A"], T["C"], T["G"], ukuran=0.5)
        busur_a = busur(T["C"], T["A"], T["G"], warna=SOROT, jari=1.6, tebal=4)

        bd = Line(T["B"], T["D"]).set_stroke(SOROT, 6)
        pc = Line(P, T["C"]).set_stroke(AKSEN2, 5)
        pg = Line(P, T["G"]).set_stroke(AKSEN, 5)
        bidang_bdg = Polygon(T["B"], T["D"], T["G"]).set_fill(AKSEN, 0.24).set_stroke(AKSEN, 3)
        siku_p1 = siku(T["B"], P, T["C"], ukuran=0.45)
        siku_p2 = siku(T["D"], P, T["G"], ukuran=0.45)
        busur_p = busur(T["C"], P, T["G"], warna=SOROT, jari=1.1, tebal=4)

        # DUA set huruf, bukan satu yang dihapus. Video ini punya dua ide besar
        # dengan titik sorot yang berbeda: bagian pertama menyorot A, C, G
        # (garis AG dan bayangannya AC), bagian kedua menyorot B, D, G (bidang
        # BDG dan garis potongnya BD). Warna label tidak bisa diubah di tengah
        # jalan sebab updater menggambarnya ulang dari bentuk aslinya tiap
        # frame, jadi setnya yang ditukar. Kedelapan huruf tetap ada di kedua
        # bagian, sesuai revisi ARYA: titik yang tidak dipakai pun tetap ditulis.
        lab = huruf_sudut(frame, {"A": TINTA, "C": AKSEN2, "G": AKSEN})
        lab2 = huruf_sudut(frame, {"B": SOROT, "D": SOROT, "G": AKSEN, "C": AKSEN2})

        # --- Babak 1: pengumuman materi.
        kamera.pasang_awal(frame, theta=-42, phi=72, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        # Papan koordinat berangka: tanpa ini kalimat "enam satuan" di narasi
        # tidak punya sandaran apa pun di layar (revisi ARYA 2 Sep malam).
        sumbu, angka_sumbu = papan_koordinat(frame)
        self.add(lantai(), sumbu, *angka_sumbu, kubus)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 09: Sudut dengan bidang", lama=3.4, y=3.0)
            b.catat(3.4)
            b.main(kubus.animate.set_opacity(0.14), ShowCreation(rangka), run_time=2.0)
            isi_sisa(b, kamera.sudut(frame, -30, 68, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"kubus": kubus})

        # --- Babak 2: garis miringnya dulu, tanpa bayangannya.
        with sinema.babak(self, "bayangan", DURASI) as b:
            b.main(*[FadeIn(x) for x in lab.values()], run_time=0.8)
            b.main(ShowCreation(ag), run_time=1.4)
            sinema.keterangan(self, "AG menembus lantai di titik A", warna=AKSEN)
            b.catat(0.6)
            isi_sisa(b, kamera.sudut(frame, -20, 74, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"AG": ag, "huruf G": lab["G"],
                                 "keterangan": self._matra_keterangan},
                          [("huruf G", "keterangan")])

        # --- Babak 3: bayangannya dicari, bukan diberikan. Tiang GC yang tegak
        #     lurus lantai itulah yang menjatuhkan G ke C.
        with sinema.babak(self, "proyeksi", DURASI) as b:
            b.main(ShowCreation(cg), run_time=1.0)
            b.main(ShowCreation(ac), run_time=1.2)
            b.main(ShowCreation(siku_c), run_time=0.7)
            sinema.keterangan(self, "bayangan AG di lantai adalah *AC*", warna=AKSEN2)
            b.catat(0.6)
            isi_sisa(b, kamera.sudut(frame, -52, 70, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"AC": ac, "AG": ag, "huruf C": lab["C"],
                                 "keterangan": self._matra_keterangan},
                          [("huruf C", "keterangan")])

        # --- Babak 4: sudutnya, dengan tangen yang sudah dipanggil ulang di narasi.
        p1 = rumus(r"\tan\theta = \frac{6}{6\sqrt{2}}", 34, SOROT).to_corner(UR, buff=0.5)
        p2 = rumus(r"\theta \approx 35{,}26^\circ", 34, SOROT)
        p2.next_to(p1, DOWN, buff=0.3).align_to(p1, RIGHT)
        with sinema.babak(self, "sudut1", DURASI) as b:
            b.main(ShowCreation(busur_a), run_time=0.9)
            self.hud_tambah(p1)
            p1.set_opacity(0)
            b.main(p1.animate.set_opacity(1), run_time=0.7)
            self.hud_tambah(p2)
            p2.set_opacity(0)
            b.main(p2.animate.set_opacity(1), run_time=0.7)
            sinema.keterangan(self, "sudut *garis dengan bidang*, kira-kira 35,26 derajat",
                              warna=SOROT)
            b.catat(0.6)
            isi_sisa(b, kamera.putar_pelan(frame, 20))
        qc.periksa_adegan(self, {"panel 1": p1, "panel 2": p2, "busur": busur_a,
                                 "keterangan": self._matra_keterangan},
                          [("panel 1", "panel 2"), ("panel 2", "keterangan")])

        # --- Babak 5: layar dibersihkan dari ide pertama, lalu ide kedua masuk.
        #     Bidang BDG dan garis potongnya BD.
        # Huruf P digeser MENYAMPING, bukan ke bawah: percobaan pertama menaruhnya
        # tepat di bawah titiknya dan penanda bulat menutupinya sendiri.
        lab_p = label_hadap(frame, "P", P + np.array([-0.85, -0.55, 0.15]), SOROT)
        tanda_p = penanda(self, frame, P)
        with sinema.babak(self, "potong", DURASI) as b:
            # Set huruf ditukar, bukan dihapus: sorotnya berpindah dari A, C, G
            # ke B, D, G mengikuti ide yang sedang dibahas, dan kedelapan huruf
            # tetap terbaca di layar sepanjang video.
            b.main(FadeOut(ag), FadeOut(ac), FadeOut(cg), FadeOut(siku_c),
                   FadeOut(busur_a), *[FadeOut(x) for x in lab.values()],
                   run_time=1.0)
            for x in lab2.values():
                x.set_opacity(0)
            self.add(*lab2.values())
            b.main(*[x.animate.set_opacity(1) for x in lab2.values()], run_time=0.6)
            self.hud.remove(p1, p2)
            b.main(FadeOut(p1), FadeOut(p2), run_time=0.5)
            b.main(FadeIn(bidang_bdg), run_time=1.4)
            b.main(ShowCreation(bd), run_time=1.0)
            sinema.keterangan(self, "persekutuannya satu *garis penuh*, yaitu BD", warna=SOROT)
            b.catat(0.6)
            isi_sisa(b, kamera.sudut(frame, -14, 66, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"bidang": bidang_bdg, "BD": bd, "huruf A": lab2["A"],
                                 "keterangan": self._matra_keterangan},
                          [("BD", "keterangan"), ("huruf A", "keterangan")])

        # --- Babak 6: dua garis bantu, keduanya tegak lurus BD, DARI SATU TITIK.
        #     Kedua tanda siku-siku sengaja digambar bertumpu di P, sebab justru
        #     di situlah kekeliruan yang paling sering terjadi.
        p3 = rumus(r"\tan\varphi = \frac{6}{3\sqrt{2}}", 34, SOROT).to_corner(UR, buff=0.5)
        p4 = rumus(r"\varphi \approx 54{,}74^\circ", 34, SOROT)
        p4.next_to(p3, DOWN, buff=0.3).align_to(p3, RIGHT)
        with sinema.babak(self, "sudut2", DURASI) as b:
            b.main(FadeIn(tanda_p), FadeIn(lab_p), run_time=0.8)
            b.main(ShowCreation(pc), ShowCreation(pg), run_time=1.4)
            b.main(ShowCreation(siku_p1), ShowCreation(siku_p2), run_time=0.9)
            b.main(ShowCreation(busur_p), run_time=0.7)
            self.hud_tambah(p3)
            p3.set_opacity(0)
            b.main(p3.animate.set_opacity(1), run_time=0.6)
            self.hud_tambah(p4)
            p4.set_opacity(0)
            b.main(p4.animate.set_opacity(1), run_time=0.6)
            sinema.keterangan(self, "sudut *antarbidang*, kira-kira 54,74 derajat", warna=SOROT)
            b.catat(0.6)
            isi_sisa(b, kamera.sudut(frame, -40, 62, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"PC": pc, "PG": pg, "panel 3": p3, "panel 4": p4,
                                 "huruf P": lab_p, "keterangan": self._matra_keterangan},
                          [("panel 3", "panel 4"), ("panel 4", "keterangan"),
                           ("huruf P", "keterangan")])

        # --- Babak 7: dua syarat yang harus dipenuhi bersamaan.
        with sinema.babak(self, "tutup", DURASI) as b:
            sinema.keterangan(self, "tegak lurus garis potong, DAN bertumpu di *satu titik*",
                              warna=SOROT)
            b.catat(0.6)
            isi_sisa(b, kamera.putar_pelan(frame, 26), sisakan=1.6)
            b.jeda(1.2)
        qc.periksa_adegan(self, {"PC": pc, "PG": pg, "panel 4": p4,
                                 "keterangan": self._matra_keterangan},
                          [("panel 4", "keterangan")])
