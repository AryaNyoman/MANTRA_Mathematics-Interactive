"""Beranda: tiga grafik sin, cos, tan lahir dari satu putaran. Bisu, mengulang.

Dipakai di slide pertama korsel halaman depan (`web/components/Demo.tsx`).
Permintaan ARYA 5 Sep 2026: "mirip video Materi 09 Trigonometri, tanpa suara
dan subtitle; rumus sin, cos, tan theta dan sudut-sudutnya tetap ditulis;
garis putus-putus bergerak mengelilingi lingkaran sambil menggambar grafiknya."
Disetujui: 30 detik, 1,5 putaran (0 sampai 540 derajat), 1080p, mengulang.

Adegan ini adalah PORT ManimGL dari `TigaGrafikBeranda` di arsip Manim
Community (`manim/arsip-manim-ce/scenes/tahap9_tiga_grafik.py`). Ukurannya
diambil dari sana supaya tampilannya tetap saudara kandung Materi 09: tiga
panel bertumpuk, tiap panel lingkaran kecil di kiri dan papan grafik di
kanan, satu sudut menggerakkan ketiganya.

TANPA JALUR SUBTITLE. Video ini tidak bernarasi, jadi jalur bawah layar
tidak dipesan siapa pun dan ketiga panel boleh memakai tinggi layar penuh.
`qc.periksa_adegan` dipanggil dengan `jaga_jalur_bawah=False` karena alasan
itu, bukan untuk menghindari pemeriksaan: tabrakan dan batas bingkai tetap
diperiksa.

SAMBUNGAN ULANG. Kurva yang tumbuh dari kosong tidak bisa menyambung mulus
dengan dirinya sendiri, jadi di akhir sapuan semua yang bergerak (kurva, garis
putus-putus, titik, jari-jari) DIPUDARKAN, sudutnya dikembalikan ke nol, lalu
dimunculkan lagi. Frame terakhir sama persis dengan frame pertama: rangka dan
label tetap, jari-jari di nol derajat, kurva kosong. Itulah yang membuat
`loop` di peramban tidak berkedip.

WARNA: merah bata = sin (tinggi), biru = cos (mendatar), tinta = tan.
"""

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import qc  # noqa: E402

# --- ZONA TETAP (bingkai 14,22 x 8; batas aman x +-6,91  y +-3,80) ---
Y_PANEL = [2.25, 0.10, -2.05]      # titik tengah tiga panel, atas ke bawah
R_LING = 0.78                       # jari-jari lingkaran kecil tiap panel
# Lingkaran digeser 0,20 ke kiri dan papan 0,25 ke kanan dibanding Materi 09:
# label "sin theta" (lebar 0,75) tidak muat di celah 0,57 yang lama, dan qc
# menolaknya. Celah sekarang 1,02, labelnya lepas dari lingkaran.
X_LING = -5.75                      # pusat lingkaran kecil
X_GRAFIK = -3.95                    # sudut 0 pada papan grafik
# Tidak ada kolom keterangan di kanan (tidak ada narasi yang butuh tempat),
# jadi papannya boleh lebih panjang daripada Materi 09 (8,20). Label "540°"
# yang berpusat di ujung papan masih berhenti di x 6,5, di dalam batas aman.
L_GRAFIK = 10.40                    # panjang papan, mewakili 0 sampai 540 derajat
AKHIR = 540
TINGGI_SATU = 0.78                  # 1 satuan tegak = R_LING, supaya sebanding
TAN_MAKS = 1.30                     # tan dipotong di sini agar tidak keluar panel

LAMA_SAPU = 27.0                    # detik, 0 sampai 540 derajat, laju tetap
LAMA_TAHAN = 1.0                    # kurva penuh ditahan sebelum dipudarkan
LAMA_PUDAR = 1.0
LAMA_MUNCUL = 0.6
LAMA_JEDA = 0.4                     # total 30,0 detik


def x_dari(derajat: float) -> float:
    return X_GRAFIK + L_GRAFIK * derajat / AKHIR


class BerandaTigaGrafik(AdeganMatra):
    def construct(self):
        self.theta = ValueTracker(0.0)      # SATU sudut untuk ketiga panel
        self.tampak = ValueTracker(1.0)     # 1 tampil, 0 pudar (sambungan ulang)

        panel = [
            self.buat_panel(0, r"\sin\theta", np.sin, AKSEN),
            self.buat_panel(1, r"\cos\theta", np.cos, AKSEN2),
            self.buat_panel(2, r"\tan\theta", np.tan, TINTA, potong=TAN_MAKS),
        ]

        rangka = VGroup(*[p["rangka"] for p in panel])
        skala = VGroup(*[p["skala"] for p in panel])
        for p in panel:
            self.add(p["rangka"], p["skala"], p["label"],
                     p["kurva"], p["sambung"], p["jari"], p["titik"], p["titik_grafik"])
        # Label diperiksa terhadap lingkaran dan papan SECARA TERPISAH, bukan
        # terhadap seluruh rangka: kotak pembatas rangka menutup celah di
        # antara keduanya, tempat labelnya memang berdiri.
        zona = {"rangka": rangka, "skala": skala}
        pasangan = [("panel_sin", "panel_cos"), ("panel_cos", "panel_tan")]
        for nama, p in zip(("sin", "cos", "tan"), panel):
            zona[f"panel_{nama}"] = p["rangka"]
            zona[f"label_{nama}"] = p["label"]
            zona[f"ling_{nama}"] = p["lingkaran"]
            zona[f"papan_{nama}"] = p["papan"]
            pasangan += [(f"label_{nama}", f"ling_{nama}"), (f"label_{nama}", f"papan_{nama}")]
        qc.periksa_adegan(self, zona, pasangan, jaga_jalur_bawah=False)

        # Satu sapuan penuh, laju TETAP. rate_func bawaan melambat di ujung dan
        # perlambatan itu terlihat sebagai ragu-ragu di akhir setiap putaran.
        self.play(self.theta.animate.set_value(AKHIR), run_time=LAMA_SAPU, rate_func=linear)
        self.wait(LAMA_TAHAN)
        self.play(self.tampak.animate.set_value(0.0), run_time=LAMA_PUDAR)
        self.theta.set_value(0.0)
        self.play(self.tampak.animate.set_value(1.0), run_time=LAMA_MUNCUL)
        self.wait(LAMA_JEDA)

    # ------------------------------------------------------------------
    def buat_panel(self, i, nama, fungsi, warna, potong=None):
        """Satu panel: lingkaran kecil di kiri, papan grafik di kanan."""
        y0 = Y_PANEL[i]
        pusat = np.array([X_LING, y0, 0.0])
        theta, tampak = self.theta, self.tampak

        # stroke_color, BUKAN color: Circle ManimGL menyetel stroke_color=RED
        # secara tegas, jadi `color=` kalah dan lingkarannya jadi merah
        # (terlihat di lembar kontak render pertama).
        lingkaran = Circle(radius=R_LING, stroke_color=TINTA, stroke_width=2.5, fill_opacity=0)
        lingkaran.move_to(pusat)
        sb = VGroup(
            Line(pusat + LEFT * R_LING * 1.25, pusat + RIGHT * R_LING * 1.25,
                 color=REDUP, stroke_width=1.5),
            Line(pusat + DOWN * R_LING * 1.25, pusat + UP * R_LING * 1.25,
                 color=REDUP, stroke_width=1.5),
        )
        sumbu_x = Line([X_GRAFIK, y0, 0], [X_GRAFIK + L_GRAFIK, y0, 0],
                       color=REDUP, stroke_width=1.8)
        sumbu_y = Line([X_GRAFIK, y0 - TINGGI_SATU * 1.35, 0],
                       [X_GRAFIK, y0 + TINGGI_SATU * 1.35, 0],
                       color=REDUP, stroke_width=1.8)

        def arah():
            r = np.radians(theta.get_value())
            return np.array([np.cos(r), np.sin(r), 0.0])

        def nilai_kini():
            return fungsi(np.radians(theta.get_value()))

        def muat(n):
            return potong is None or abs(n) <= potong

        jari = always_redraw(lambda: Line(pusat, pusat + R_LING * arah(),
                                          color=TINTA, stroke_width=3)
                             .set_stroke(opacity=tampak.get_value()))
        # fill_color, BUKAN color: Dot ManimGL menyetel fill_color=WHITE secara
        # tegas, jadi `color=` kalah dan titiknya putih.
        titik = always_redraw(lambda: Dot(pusat + R_LING * arah(), radius=0.06, fill_color=warna)
                              .set_opacity(tampak.get_value()))

        # Garis putus-putus dari titik di lingkaran ke titik yang sedang
        # digambar di papan. Untuk sinus ia mendatar persis (tinggi titik di
        # lingkaran = tinggi grafiknya), dan itulah konstruksi klasiknya.
        def buat_sambung():
            n = nilai_kini()
            if not muat(n):
                return VGroup()
            ujung = np.array([x_dari(theta.get_value()), y0 + n * TINGGI_SATU, 0.0])
            return DashedLine(pusat + R_LING * arah(), ujung, dash_length=0.09,
                              color=warna, stroke_width=1.8).set_stroke(opacity=0.6 * tampak.get_value())

        def buat_titik_grafik():
            n = nilai_kini()
            if not muat(n):
                return VGroup()
            return Dot([x_dari(theta.get_value()), y0 + n * TINGGI_SATU, 0.0],
                       radius=0.07, fill_color=warna).set_opacity(tampak.get_value())

        sambung = always_redraw(buat_sambung)
        titik_grafik = always_redraw(buat_titik_grafik)

        # Kurva digambar per CABANG: sin dan cos satu cabang, tangen putus di
        # tiap asimtot dan tiap cabangnya berhenti di tepi panel, lalu muncul
        # lagi di seberang asimtot, seperti kurva tangen yang sebenarnya.
        if potong:
            tepi = float(np.degrees(np.arctan(potong)))
            cabang = [(0.0, tepi)]
            for k in (180, 360):
                cabang.append((k - tepi, k + tepi))
            cabang.append((AKHIR - tepi, float(AKHIR)))
        else:
            cabang = [(0.0, float(AKHIR))]

        kurva = VGroup()
        for a, bb in cabang:
            penuh = VMobject(stroke_color=warna, stroke_width=4, fill_opacity=0)
            penuh.set_points_smoothly([
                np.array([x_dari(d), y0 + fungsi(np.radians(d)) * TINGGI_SATU, 0.0])
                for d in np.linspace(a, bb, 90)
            ])
            potongan = penuh.copy()

            def pasang(m, penuh=penuh, a=a, bb=bb):
                alpha = (theta.get_value() - a) / (bb - a)
                m.pointwise_become_partial(penuh, 0, float(np.clip(alpha, 1e-4, 1.0)))
                # set_stroke, BUKAN set_opacity: set_opacity juga menyalakan
                # isian, dan kurvanya berubah dari garis menjadi bidang.
                terlihat = 0.0 if theta.get_value() <= a else 1.0
                m.set_stroke(opacity=terlihat * tampak.get_value())

            potongan.add_updater(pasang)
            kurva.add(potongan)

        # Label di TEPI ATAS papan, sejajar puncak sumbu tegak, bukan di
        # tengah celah: garis putus-putus dari lingkaran ke titik grafik lewat
        # di celah itu dan mencoret labelnya (lembar kontak render pertama).
        # Di ketinggian ini ia di atas puncak kurva (y0 + 0,78) dan di atas
        # tepi lingkaran, jadi tidak ada garis yang melintasinya.
        label = rumus(nama, 28, warna)
        label.next_to(sumbu_y, LEFT, buff=0.15).shift(UP * 0.95)

        # Skala derajat di SETIAP panel (permintaan ARYA 1 Sep 2026), radian
        # hanya di panel terbawah. Angkanya diberi halo sewarna kertas supaya
        # kurva yang lewat di kelipatan 180 derajat tidak mencoretnya.
        skala = VGroup()
        for d, rad in ((0, "0"), (180, r"\pi"), (360, r"2\pi"), (540, r"3\pi")):
            x = x_dari(d)
            tik = Line([x, y0 - 0.11, 0], [x, y0 + 0.11, 0], color=REDUP, stroke_width=1.6)
            drj = rumus(rf"{d}^\circ", 18, REDUP)
            drj.next_to(tik, DOWN, buff=0.05)
            drj.add_background_rectangle(color=LATAR, opacity=1.0, buff=0.045)
            bagian = VGroup(tik, drj)
            if i == len(Y_PANEL) - 1:
                rd_ = rumus(rad, 18, AKSEN2)
                rd_.next_to(drj, DOWN, buff=0.05)
                rd_.add_background_rectangle(color=LATAR, opacity=1.0, buff=0.045)
                bagian.add(rd_)
            skala.add(bagian)

        return dict(rangka=VGroup(lingkaran, sb, sumbu_x, sumbu_y),
                    lingkaran=lingkaran, papan=VGroup(sumbu_x, sumbu_y), jari=jari, titik=titik,
                    kurva=kurva, sambung=sambung, titik_grafik=titik_grafik,
                    label=label, skala=skala)
