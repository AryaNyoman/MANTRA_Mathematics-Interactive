"""Ruang Tiga Dimensi, materi 01: "Gambar ruang boleh berbohong" (ManimGL).

Naskah   : manim/narasi/ruang-3d-01.json
Suara    : audio/ruang-3d-01/ (buat_narasi.py)
Render   : manimgl manim/scenes/ruang_3d_01.py GambarBolehBerbohong -w -l
Periksa  : python manim/cek_video.py media/gl/GambarBolehBerbohong.mp4
Gabung   : python manim/gabung_audio.py ruang-3d-01 GambarBolehBerbohong --uji

KENAPA VIDEO INI MEMBUTUHKAN 3D, BUKAN SEKADAR MEMPERINDAH
Seluruh isi materi 01 adalah tentang KAMERA yang berbohong. Di halaman, siswa
membongkarnya sendiri dengan menarik kubusnya. Di video, kamera itulah tokoh
utamanya: dari pandangan miring kita naik ke pandangan atas, dan tipuan lahir
di depan mata; lalu kita turun lagi, dan tipuan itu runtuh. Gambar diam tidak
bisa melakukan ini, dan itulah alasan 3D-nya, bukan hiasan.

SATU WARNA SATU MAKNA, dipatuhi sampai frame terakhir:
  AKSEN2 biru  = ruas BD, yang tergeletak di LANTAI kubus
  AKSEN merah  = ruas EG, yang ada di ATAP kubus
  SOROT ungu   = kesimpulan: jarak 6 satuan, dan kata "bersilangan"
  REDUP        = kubus dan lantai kisi, yaitu latar yang tidak boleh menarik mata

KOORDINATNYA SAMA PERSIS DENGAN WIDGET DI HALAMAN
A di pojok dekat, B ke arah x, D ke arah y, E tepat di atas A. Kubusnya
digeser supaya berpusat di sumbu tegak, sehingga BD dan EG sama-sama melewati
garis x = y = 0. Karena itulah keduanya menyilang tepat di tengah kalau
dilihat dari atas, dan titik silang palsu itu bisa ditunjuk dengan tepat.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "ruang-3d-01"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

RUSUK = 6.0
S = RUSUK / 2

# Delapan titik sudut. Alas di z = 0, kubus berpusat pada sumbu tegak.
T = {
    "A": np.array([-S, -S, 0.0]), "B": np.array([S, -S, 0.0]),
    "C": np.array([S, S, 0.0]), "D": np.array([-S, S, 0.0]),
    "E": np.array([-S, -S, RUSUK]), "F": np.array([S, -S, RUSUK]),
    "G": np.array([S, S, RUSUK]), "H": np.array([-S, S, RUSUK]),
}
RUSUK_KUBUS = [
    ("A", "B"), ("B", "C"), ("C", "D"), ("D", "A"),
    ("E", "F"), ("F", "G"), ("G", "H"), ("H", "E"),
    ("A", "E"), ("B", "F"), ("C", "G"), ("D", "H"),
]

SILANG_BAWAH = np.array([0.0, 0.0, 0.0])   # BD melewati titik ini
SILANG_ATAS = np.array([0.0, 0.0, RUSUK])  # EG melewati titik ini

PUSAT = np.array([0.0, 0.0, S])
TINGGI_BINGKAI = 12.0


def label_hadap(frame, huruf, titik, warna=TINTA, ukuran=30, acuan=14.0):
    """Huruf titik sudut yang SELALU menghadap kamera DAN selalu sebesar itu juga.

    Dua hal diurus sekaligus, dan keduanya cacat yang benar-benar terjadi pada
    render pertama, bukan kekhawatiran di atas kertas:

    1. ORIENTASI. Huruf yang dibiarkan terbaring di lantai memipih sampai tidak
       terbaca saat kamera miring. Percobaan pertama memakai
       `apply_matrix(frame.get_inverse_camera_rotation_matrix())` dan hasilnya
       ada huruf yang TERCERMIN, terbaca terbalik di layar. Diganti dengan dua
       putaran yang bisa dibaca maksudnya: miringkan sebesar phi, lalu putar
       sebesar theta. Pada pandangan atas (phi = 0) huruf kembali datar di
       bidang xy, yang memang benar.

    2. UKURAN. Ukuran huruf di dunia berarti huruf yang jauh dari kamera
       mengecil. Pada pandangan atas, B dan D di lantai berjarak enam satuan
       lebih jauh daripada E dan G di atap, dan keduanya menyusut sampai tidak
       terbaca. Karena itu huruf diperbesar sebanding jaraknya ke kamera, jadi
       ukurannya di LAYAR tetap sama di mana pun ia berada.
    """
    asli = teks(huruf, ukuran, warna)

    def perbarui(m):
        b = asli.copy()
        b.rotate(frame.get_phi(), RIGHT)
        b.rotate(frame.get_theta(), OUT)
        jarak = np.linalg.norm(frame.get_implied_camera_location() - np.array(titik))
        b.scale(max(jarak, 1e-3) / acuan)
        b.move_to(titik)
        m.become(b)

    lab = asli.copy()
    perbarui(lab)
    lab.add_updater(perbarui)
    return lab


def denyut(scene, frame, titik, warna=SOROT, jari=0.24, acuan=14.0):
    """Penanda titik yang berdenyut: lingkaran yang SELALU menghadap kamera.

    Dua tugas sekaligus: menunjuk titik silang, dan menjaga layar tetap hidup
    saat narator masih bicara sementara animasinya sudah selesai. Tanpa satu
    pun updater, sisa babak menjadi waktu mati (aturan 7 STANDAR-ILUSTRASI).

    BENTUKNYA DIPILIH SETELAH DIUJI, BUKAN DITEBAK
    Percobaan pertama memakai lingkaran datar di bidang xy: sempurna dari atas,
    tetapi memipih jadi coretan lonjong begitu kamera turun. Percobaan kedua
    memakai bola, dan penanda di titik silang BAWAH hilang sama sekali,
    sehingga keterangan "satu titik silang ternyata dua titik" muncul dengan
    cuma satu titik di layar.

    Sebabnya dibuktikan dengan adegan uji tersendiri yang mengadu tiga penanda
    di dalam satu kubus tembus pandang: bola HILANG, lingkaran datar terlihat,
    lingkaran menghadap kamera terlihat dan tetap bulat. ManimGL menggambar
    Surface (bola, prisma) dan VMobject (garis, lingkaran) lewat jalur berbeda,
    dan sisi kubus yang tembus pandang tetap menulis kedalaman, jadi Surface di
    belakangnya dibuang sementara VMobject tetap tergambar. Karena itu penanda
    ini VMobject, diputar menghadap kamera dan diskalakan menurut jaraknya,
    persis seperti huruf titik sudut.
    """

    def gambar():
        c = Circle(radius=jari + 0.05 * np.sin(3.0 * scene.time))
        c.set_stroke(warna, 4).set_fill(warna, 0.9)
        c.rotate(frame.get_phi(), RIGHT)
        c.rotate(frame.get_theta(), OUT)
        jarak = np.linalg.norm(frame.get_implied_camera_location() - np.array(titik))
        c.scale(max(jarak, 1e-3) / acuan)
        return c.move_to(titik)

    return always_redraw(gambar)


class GambarBolehBerbohong(AdeganMatra):
    def construct(self):
        frame = self.frame

        # --- Dunia: lantai kisi (tanpa sumbu, supaya tidak ada garis yang
        #     menembus kubus dan tertukar dengan rusuk) dan kubus pejal.
        lantai = ilustrasi.lantai_kisi(ukuran=16.0, langkah=1.0)[0]
        kubus = ilustrasi.balok(RUSUK, RUSUK, RUSUK, warna=REDUP).set_opacity(0.92)

        rangka = VGroup(*[Line(T[a], T[b]) for a, b in RUSUK_KUBUS])
        rangka.set_stroke(TINTA, 2.2)

        bd = Line(T["B"], T["D"]).set_stroke(AKSEN2, 6)
        eg = Line(T["E"], T["G"]).set_stroke(AKSEN, 6)

        # --- Babak 1: benda dulu, nama belakangan. Kubus pejal berdiri di lantai.
        # Kubus SUDAH ada di frame pertama. Percobaan pertama memunculkannya
        # sesudah judul, dan akibatnya empat detik pembuka berisi lantai kosong
        # sementara narator berkata "di depan kita ada sebuah kotak". Gambar yang
        # membantah narasi lebih merusak daripada layar kosong (gerbang video).
        kamera.pasang_awal(frame, theta=-40, phi=74, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        self.add(lantai, kubus)
        with sinema.babak(self, "kotak", DURASI) as b:
            sinema.judul_pembuka(self, "Gambar ruang boleh berbohong", lama=3.0, y=3.0)
            b.catat(3.0)
            sinema.keterangan(self, "panjang, lebar, dan tingginya sama")
            b.catat(0.6)
            b.main(kamera.sudut(frame, -18, 64, pusat=PUSAT, tinggi=TINGGI_BINGKAI), run_time=5.2)
            b.jeda(1.2)
        qc.periksa_adegan(self, {"kubus": kubus, "keterangan": self._matra_keterangan},
                          [("kubus", "keterangan")])

        # --- Babak 2: dinding dibuat tembus pandang, empat titik sudut diberi nama.
        #     Hanya empat, bukan delapan: yang dipakai video ini cuma B, D, E, G,
        #     dan delapan huruf sekaligus akan berdesakan di pandangan atas nanti.
        lab = {
            "B": label_hadap(frame, "B", T["B"] + np.array([0.58, -0.58, 0.12]), AKSEN2),
            "D": label_hadap(frame, "D", T["D"] + np.array([-0.58, 0.58, 0.12]), AKSEN2),
            "E": label_hadap(frame, "E", T["E"] + np.array([-0.42, -0.42, 0.34]), AKSEN),
            "G": label_hadap(frame, "G", T["G"] + np.array([0.42, 0.42, 0.34]), AKSEN),
        }
        with sinema.babak(self, "rangka", DURASI) as b:
            b.main(kubus.animate.set_opacity(0.14), ShowCreation(rangka), run_time=2.2)
            b.main(*[FadeIn(x) for x in lab.values()], run_time=1.0)
            sinema.keterangan(self, "dindingnya dibuat tembus pandang")
            b.catat(0.6)
            b.main(kamera.putar_pelan(frame, 14), run_time=4.0)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"kubus": kubus, "huruf B": lab["B"], "huruf G": lab["G"],
                                 "keterangan": self._matra_keterangan},
                          [("huruf B", "keterangan")])

        # --- Babak 3: dua ruas, masing-masing dengan warnanya sendiri.
        with sinema.babak(self, "dua-ruas", DURASI) as b:
            b.main(ShowCreation(bd), run_time=1.4)
            sinema.keterangan(self, "BD tergeletak di lantai kubus", warna=AKSEN2)
            b.catat(0.6)
            b.main(ShowCreation(eg), run_time=1.4)
            sinema.keterangan(self, "EG ada di atapnya, enam satuan lebih tinggi", warna=AKSEN)
            b.catat(0.6)
            b.main(kamera.sudut(frame, -52, 74, pusat=PUSAT, tinggi=TINGGI_BINGKAI), run_time=7.5)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"BD": bd, "EG": eg, "huruf B": lab["B"], "huruf E": lab["E"],
                                 "keterangan": self._matra_keterangan},
                          [("BD", "keterangan"), ("huruf B", "huruf E")])

        # --- Babak 4: SATU gerakan panjang naik ke pandangan atas. Di situlah
        #     tipuannya lahir: dua ruas yang terpisah enam satuan bertumpuk.
        lingkar = denyut(self, frame, SILANG_ATAS)
        tanya = teks("benar-benar bertemu?", 30, SOROT).to_corner(UR, buff=0.5)
        with sinema.babak(self, "naik", DURASI) as b:
            b.main(kamera.dunia_ke_peta(frame, pusat=PUSAT, tinggi=TINGGI_BINGKAI), run_time=8.0)
            sinema.keterangan(self, "dari atas, keduanya menyilang tepat di tengah")
            b.catat(0.6)
            b.main(FadeIn(lingkar), run_time=1.2)
            self.hud_tambah(tanya)
            tanya.set_opacity(0)
            b.main(tanya.animate.set_opacity(1), run_time=1.0)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"BD": bd, "EG": eg, "penunjuk": lingkar, "tanya": tanya,
                                 "keterangan": self._matra_keterangan},
                          [("tanya", "keterangan")])

        # --- Babak 5: turun lagi, dan satu titik silang ternyata DUA titik.
        #     Ruas ungu yang menghubungkannya adalah jaraknya, enam satuan.
        lingkar_bawah = denyut(self, frame, SILANG_BAWAH)
        tiang = Line(SILANG_BAWAH, SILANG_ATAS).set_stroke(SOROT, 5)
        # Kata di dalam rumus WAJIB \mathrm, bukan \text: ManimGL membuang \text{}
        # diam-diam. "jarak" dibiarkan di sini supaya angkanya punya nama.
        panel = rumus(r"\mathrm{jarak} = 6\ \mathrm{satuan}", 34, SOROT).to_corner(UR, buff=0.5)
        with sinema.babak(self, "turun", DURASI) as b:
            b.main(kamera.sudut(frame, -30, 72, pusat=PUSAT, tinggi=TINGGI_BINGKAI), run_time=8.5)
            b.main(FadeIn(lingkar_bawah), ShowCreation(tiang), run_time=1.8)
            self.hud.remove(tanya)
            b.main(FadeOut(tanya), run_time=0.5)
            self.hud_tambah(panel)
            panel.set_opacity(0)
            b.main(panel.animate.set_opacity(1), run_time=0.8)
            sinema.keterangan(self, "satu titik silang ternyata dua titik")
            b.catat(0.6)
            b.jeda(1.2)
        qc.periksa_adegan(self, {"tiang": tiang, "panel": panel,
                                 "keterangan": self._matra_keterangan},
                          [("tiang", "keterangan"), ("panel", "keterangan")])

        # --- Babak 6: kubus diputar pelan supaya bentuknya terbaca, lalu kalimat
        #     sorot tahap ini diucapkan kata per kata (STANDAR-MENGAJAR bagian 5).
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(kamera.putar_pelan(frame, 26), run_time=6.5)
            sinema.keterangan(self, "BD dan EG bersilangan", warna=SOROT)
            b.catat(0.6)
            b.jeda(1.4)
        qc.periksa_adegan(self, {"BD": bd, "EG": eg, "tiang": tiang, "panel": panel,
                                 "keterangan": self._matra_keterangan},
                          [("panel", "keterangan")])
