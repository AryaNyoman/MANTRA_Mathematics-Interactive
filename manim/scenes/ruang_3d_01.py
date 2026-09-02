"""Ruang Tiga Dimensi, materi 01: "Gambar ruang boleh berbohong" (ManimGL).

Naskah   : manim/narasi/ruang-3d-01.json
Render   : manimgl manim/scenes/ruang_3d_01.py GambarBolehBerbohong -w -l
Periksa  : python manim/cek_video.py media/gl/GambarBolehBerbohong.mp4
Gabung   : python manim/gabung_audio.py ruang-3d-01 GambarBolehBerbohong --uji

KENAPA VIDEO INI MEMBUTUHKAN 3D, BUKAN SEKADAR MEMPERINDAH
Seluruh isi materi 01 adalah tentang KAMERA yang berbohong. Di halaman, siswa
membongkarnya sendiri dengan menarik kubusnya. Di video, kamera itulah tokoh
utamanya: dari pandangan miring kita naik ke pandangan atas dan tipuan lahir di
depan mata, lalu turun lagi dan tipuan itu runtuh.

TATA LETAK LAYAR (revisi ARYA 2 Sep malam, berlaku di keenam video)
  kiri atas       identitas benda, menetap: p = l = t = 6 satuan
  kanan atas      hitungan, muncul saat dipakai
  kaki layar      MILIK SUBTITLE, tidak ditempati apa pun
  dalam gambar    label yang menempel pada benda yang sedang dibahas

SATU WARNA SATU MAKNA:
  AKSEN2 biru  = ruas BD, yang tergeletak di LANTAI kubus
  AKSEN merah  = ruas EG, yang ada di ATAP kubus
  SOROT ungu   = kesimpulan: jarak 6 satuan, dan kata "bersilangan"
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ruang_3d_umum import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

TOPIK = "ruang-3d-01"
DURASI = durasi(TOPIK)

# BD dan EG sama-sama melewati sumbu tegak di tengah kubus, dan itulah yang
# membuat keduanya tampak menyilang kalau dilihat dari atas.
SILANG_BAWAH = np.array([RUSUK / 2, RUSUK / 2, 0.0])
SILANG_ATAS = np.array([RUSUK / 2, RUSUK / 2, RUSUK])


class GambarBolehBerbohong(AdeganMatra):
    def construct(self):
        frame = self.frame

        kubus = kubus_pejal()
        rangka = rangka_kubus()
        bd = Line(T["B"], T["D"]).set_stroke(AKSEN2, 6)
        eg = Line(T["E"], T["G"]).set_stroke(AKSEN, 6)

        # Angka 6 pada sumbu z ditekan: itu tinggi kubus, dan nanti angka itulah
        # yang menjawab "dari mana enam satuan" di babak penutup.
        papan = papan_koordinat(frame, tekan={"z": (6,)})

        # --- Babak 1: pengumuman materi. Kubus SUDAH ada di frame pertama, dan
        #     sumbu z ikut tampil untuk memperkenalkan arah tinggi.
        kamera.pasang_awal(frame, theta=-40, phi=74, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        self.add(lantai(), *papan["datar"], *papan["tinggi"], kubus)
        jati = identitas_kubus()
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 01: Gambar ruang boleh berbohong",
                                 lama=3.4, y=3.0)
            b.catat(3.4)
            self.hud_tambah(jati)
            jati.set_opacity(0)
            b.main(jati.animate.set_opacity(1), run_time=0.8)
            isi_sisa(b, kamera.sudut(frame, -30, 70, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"kubus": kubus, "identitas": jati})

        # --- Babak 2: sumbu z sudah selesai tugasnya memperkenalkan arah tinggi,
        #     jadi dihilangkan. Ia kembali di babak "turun", saat tinggi
        #     benar-benar dipakai menghitung (permintaan ARYA 2 Sep malam).
        with sinema.babak(self, "kotak", DURASI) as b:
            sumbu_z_pamit(b, papan, 1.0)
            isi_sisa(b, kamera.sudut(frame, -18, 64, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
            b.jeda(0.8)
        qc.periksa_adegan(self, {"kubus": kubus, "identitas": jati})

        # --- Babak 3: dinding dibuat tembus pandang, KEDELAPAN titik sudut diberi
        #     nama. Yang dibahas video ini cuma B, D, E, G, dan keempatnya diberi
        #     warna; sisanya tetap ditulis dengan warna redup.
        lab = huruf_sudut(frame, {"B": AKSEN2, "D": AKSEN2, "E": AKSEN, "G": AKSEN})
        with sinema.babak(self, "rangka", DURASI) as b:
            b.main(kubus.animate.set_opacity(0.14), ShowCreation(rangka), run_time=2.2)
            b.main(*[FadeIn(x) for x in lab.values()], run_time=1.0)
            isi_sisa(b, kamera.putar_pelan(frame, 14))
        qc.periksa_adegan(self, {"kubus": kubus, "huruf B": lab["B"], "huruf G": lab["G"],
                                 "identitas": jati})

        # --- Babak 4: dua ruas, masing-masing dengan warnanya sendiri, dan
        #     namanya MENEMPEL pada ruasnya. Sebelumnya nama itu ditulis di kaki
        #     layar, tempat yang kini milik subtitle.
        n_bd = label_hadap(frame, "BD", sepanjang3(T["B"], T["D"], 0.28)
                           + np.array([0.0, -0.60, 0.32]), AKSEN2, 28)
        n_eg = label_hadap(frame, "EG", sepanjang3(T["E"], T["G"], 0.74)
                           + np.array([0.0, 0.60, 0.38]), AKSEN, 28)
        with sinema.babak(self, "dua-ruas", DURASI) as b:
            b.main(ShowCreation(bd), run_time=1.4)
            b.main(FadeIn(n_bd), run_time=0.6)
            b.main(ShowCreation(eg), run_time=1.4)
            b.main(FadeIn(n_eg), run_time=0.6)
            isi_sisa(b, kamera.sudut(frame, -52, 74, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"BD": bd, "EG": eg, "nama BD": n_bd, "nama EG": n_eg,
                                 "identitas": jati},
                          [("nama BD", "nama EG")])

        # --- Babak 5: SATU gerakan panjang naik ke pandangan atas. Di situlah
        #     tipuannya lahir: dua ruas yang terpisah enam satuan bertumpuk.
        tanda_atas = penanda(self, frame, SILANG_ATAS)
        tanya = teks("benar-benar bertemu?", 30, SOROT).to_corner(UR, buff=0.5)
        with sinema.babak(self, "naik", DURASI) as b:
            isi_sisa(b, kamera.dunia_ke_peta(frame, pusat=PUSAT, tinggi=TINGGI_BINGKAI),
                     sisakan=4.2)
            b.main(FadeIn(tanda_atas), run_time=1.2)
            self.hud_tambah(tanya)
            tanya.set_opacity(0)
            b.main(tanya.animate.set_opacity(1), run_time=1.0)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"BD": bd, "EG": eg, "penunjuk": tanda_atas,
                                 "tanya": tanya, "identitas": jati},
                          [("tanya", "identitas")])

        # --- Babak 6: turun lagi, dan satu titik silang ternyata DUA titik.
        #     DARI MANA ANGKA ENAM ITU (pertanyaan ARYA): sumbu z dimunculkan
        #     kembali di sini, angka 6 di sana disorot ungu sejajar tutup kubus,
        #     dan tinggi tiangnya sendiri diberi label. Dua penanda yang saling
        #     menguatkan, jadi enam satuan bisa DIBACA, bukan diumumkan.
        tanda_bawah = penanda(self, frame, SILANG_BAWAH)
        tiang = Line(SILANG_BAWAH, SILANG_ATAS).set_stroke(SOROT, 5)
        lab_enam = label_hadap(frame, "6", SILANG_BAWAH + np.array([0.85, 0.0, RUSUK / 2]),
                               SOROT, 36)
        panel = rumus(r"\mathrm{jarak} = 6\ \mathrm{satuan}", 32, SOROT).to_corner(UR, buff=0.5)
        with sinema.babak(self, "turun", DURASI) as b:
            isi_sisa(b, kamera.sudut(frame, -30, 72, pusat=PUSAT, tinggi=TINGGI_BINGKAI),
                     sisakan=6.4)
            sumbu_z_muncul(b, papan, 0.9)
            b.main(FadeIn(tanda_bawah), ShowCreation(tiang), run_time=1.4)
            b.main(FadeIn(lab_enam), run_time=0.8)
            self.hud.remove(tanya)
            b.main(FadeOut(tanya), run_time=0.5)
            self.hud_tambah(panel)
            panel.set_opacity(0)
            b.main(panel.animate.set_opacity(1), run_time=0.8)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"tiang": tiang, "panel": panel, "angka tinggi": lab_enam,
                                 "identitas": jati},
                          [("panel", "identitas"), ("angka tinggi", "panel")])

        # --- Babak 7: kata "bersilangan" muncul MENEMPEL pada tempat kejadian,
        #     bukan di kaki layar, lalu kubus diputar pelan supaya bentuknya
        #     terbaca dari sudut lain.
        # Ditaruh di ATAS kubus, sejajar ruas EG: di dalam kubus ia berdesakan
        # dengan deret angka sumbu, dan di kaki layar ia akan mengambil tempat
        # yang kini milik subtitle.
        vonis = label_hadap(frame, "bersilangan",
                            SILANG_ATAS + np.array([0.0, 0.0, 1.05]), SOROT, 30)
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeIn(vonis), run_time=0.9)
            isi_sisa(b, kamera.putar_pelan(frame, 26), sisakan=1.6)
            b.jeda(1.2)
        qc.periksa_adegan(self, {"BD": bd, "EG": eg, "tiang": tiang, "panel": panel,
                                 "vonis": vonis, "identitas": jati},
                          [("vonis", "identitas"), ("vonis", "panel")])
