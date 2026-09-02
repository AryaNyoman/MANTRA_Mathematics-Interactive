"""Ruang Tiga Dimensi, materi 01: "Gambar ruang boleh berbohong" (ManimGL).

Naskah   : manim/narasi/ruang-3d-01.json
Render   : manimgl manim/scenes/ruang_3d_01.py GambarBolehBerbohong -w -l
Periksa  : python manim/cek_video.py media/gl/GambarBolehBerbohong.mp4
Gabung   : python manim/gabung_audio.py ruang-3d-01 GambarBolehBerbohong --uji

KENAPA VIDEO INI MEMBUTUHKAN 3D, BUKAN SEKADAR MEMPERINDAH
Seluruh isi materi 01 adalah tentang KAMERA yang berbohong. Di halaman, siswa
membongkarnya sendiri dengan menarik kubusnya. Di video, kamera itulah tokoh
utamanya: dari pandangan miring kita naik ke pandangan atas dan tipuan lahir di
depan mata, lalu turun lagi dan tipuan itu runtuh. Gambar diam tidak bisa
melakukan ini, dan itulah alasan 3D-nya, bukan hiasan.

SATU WARNA SATU MAKNA, dipatuhi sampai frame terakhir:
  AKSEN2 biru  = ruas BD, yang tergeletak di LANTAI kubus
  AKSEN merah  = ruas EG, yang ada di ATAP kubus
  SOROT ungu   = kesimpulan: jarak 6 satuan, dan kata "bersilangan"
  REDUP        = kubus dan lantai kisi, latar yang tidak boleh menarik mata
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ruang_3d_umum import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

TOPIK = "ruang-3d-01"
DURASI = durasi(TOPIK)

SILANG_BAWAH = np.array([0.0, 0.0, 0.0])   # BD melewati titik ini
SILANG_ATAS = np.array([0.0, 0.0, RUSUK])  # EG melewati titik ini


class GambarBolehBerbohong(AdeganMatra):
    def construct(self):
        frame = self.frame

        kubus = kubus_pejal()
        rangka = rangka_kubus()
        bd = Line(T["B"], T["D"]).set_stroke(AKSEN2, 6)
        eg = Line(T["E"], T["G"]).set_stroke(AKSEN, 6)

        # --- Babak 1: pengumuman materi. Kubus SUDAH ada di frame pertama.
        #     Percobaan pertama memunculkannya sesudah judul, dan akibatnya empat
        #     detik pembuka berisi lantai kosong sementara narator berkata "ada
        #     sebuah kotak". Gambar yang membantah narasi lebih merusak daripada
        #     layar kosong (gerbang video di CLAUDE.md).
        kamera.pasang_awal(frame, theta=-40, phi=74, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        self.add(lantai(), kubus)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 01: Gambar ruang boleh berbohong",
                                 lama=3.4, y=3.0)
            b.catat(3.4)
            isi_sisa(b, kamera.sudut(frame, -30, 70, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"kubus": kubus})

        # --- Babak 2: benda dulu, nama belakangan.
        with sinema.babak(self, "kotak", DURASI) as b:
            sinema.keterangan(self, "panjang, lebar, dan tingginya *sama*")
            b.catat(0.6)
            isi_sisa(b, kamera.sudut(frame, -18, 64, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
            b.jeda(0.8)
        qc.periksa_adegan(self, {"kubus": kubus, "keterangan": self._matra_keterangan},
                          [("kubus", "keterangan")])

        # --- Babak 3: dinding dibuat tembus pandang, empat titik sudut diberi nama.
        #     Hanya empat, bukan delapan: yang dipakai video ini cuma B, D, E, G,
        #     dan delapan huruf akan berdesakan di pandangan atas nanti.
        lab = huruf_sudut(frame, {"B": AKSEN2, "D": AKSEN2, "E": AKSEN, "G": AKSEN})
        with sinema.babak(self, "rangka", DURASI) as b:
            b.main(kubus.animate.set_opacity(0.14), ShowCreation(rangka), run_time=2.2)
            b.main(*[FadeIn(x) for x in lab.values()], run_time=1.0)
            sinema.keterangan(self, "dindingnya dibuat *tembus pandang*")
            b.catat(0.6)
            isi_sisa(b, kamera.putar_pelan(frame, 14))
        qc.periksa_adegan(self, {"kubus": kubus, "huruf B": lab["B"], "huruf G": lab["G"],
                                 "keterangan": self._matra_keterangan},
                          [("huruf B", "keterangan")])

        # --- Babak 4: dua ruas, masing-masing dengan warnanya sendiri.
        with sinema.babak(self, "dua-ruas", DURASI) as b:
            b.main(ShowCreation(bd), run_time=1.4)
            sinema.keterangan(self, "BD tergeletak di *lantai* kubus", warna=AKSEN2)
            b.catat(0.6)
            b.main(ShowCreation(eg), run_time=1.4)
            sinema.keterangan(self, "EG ada di *atapnya*, enam satuan lebih tinggi", warna=AKSEN)
            b.catat(0.6)
            isi_sisa(b, kamera.sudut(frame, -52, 74, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"BD": bd, "EG": eg, "huruf B": lab["B"], "huruf E": lab["E"],
                                 "keterangan": self._matra_keterangan},
                          [("BD", "keterangan"), ("huruf B", "huruf E")])

        # --- Babak 5: SATU gerakan panjang naik ke pandangan atas. Di situlah
        #     tipuannya lahir: dua ruas yang terpisah enam satuan bertumpuk.
        tanda_atas = penanda(self, frame, SILANG_ATAS)
        tanya = teks("benar-benar bertemu?", 30, SOROT).to_corner(UR, buff=0.5)
        with sinema.babak(self, "naik", DURASI) as b:
            isi_sisa(b, kamera.dunia_ke_peta(frame, pusat=PUSAT, tinggi=TINGGI_BINGKAI),
                     sisakan=5.0)
            sinema.keterangan(self, "dari atas, keduanya *menyilang tepat di tengah*")
            b.catat(0.6)
            b.main(FadeIn(tanda_atas), run_time=1.2)
            self.hud_tambah(tanya)
            tanya.set_opacity(0)
            b.main(tanya.animate.set_opacity(1), run_time=1.0)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"BD": bd, "EG": eg, "penunjuk": tanda_atas, "tanya": tanya,
                                 "keterangan": self._matra_keterangan},
                          [("tanya", "keterangan")])

        # --- Babak 6: turun lagi, dan satu titik silang ternyata DUA titik.
        tanda_bawah = penanda(self, frame, SILANG_BAWAH)
        tiang = Line(SILANG_BAWAH, SILANG_ATAS).set_stroke(SOROT, 5)
        panel = rumus(r"\mathrm{jarak} = 6\ \mathrm{satuan}", 34, SOROT).to_corner(UR, buff=0.5)
        with sinema.babak(self, "turun", DURASI) as b:
            isi_sisa(b, kamera.sudut(frame, -30, 72, pusat=PUSAT, tinggi=TINGGI_BINGKAI),
                     sisakan=5.5)
            b.main(FadeIn(tanda_bawah), ShowCreation(tiang), run_time=1.8)
            self.hud.remove(tanya)
            b.main(FadeOut(tanya), run_time=0.5)
            self.hud_tambah(panel)
            panel.set_opacity(0)
            b.main(panel.animate.set_opacity(1), run_time=0.8)
            sinema.keterangan(self, "satu titik silang ternyata *dua titik*")
            b.catat(0.6)
            b.jeda(1.2)
        qc.periksa_adegan(self, {"tiang": tiang, "panel": panel,
                                 "keterangan": self._matra_keterangan},
                          [("tiang", "keterangan"), ("panel", "keterangan")])

        # --- Babak 7: kubus diputar pelan supaya bentuknya terbaca, lalu kalimat
        #     sorot tahap ini diucapkan kata per kata (STANDAR-MENGAJAR bagian 5).
        with sinema.babak(self, "tutup", DURASI) as b:
            isi_sisa(b, kamera.putar_pelan(frame, 26), sisakan=2.2)
            sinema.keterangan(self, "BD dan EG *bersilangan*", warna=SOROT)
            b.catat(0.6)
            b.jeda(1.4)
        qc.periksa_adegan(self, {"BD": bd, "EG": eg, "tiang": tiang, "panel": panel,
                                 "keterangan": self._matra_keterangan},
                          [("panel", "keterangan")])
