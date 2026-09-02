"""Grafik Fungsi Tahap 06, Geser, cermin, regang. Versi ManimGL (2 Sep 2026).

STORYBOARD (ditulis lebih dulu, kode menyusul):

  1. Dunia: lembah bercahaya berbentuk x kuadrat, bola menggelinding di dasarnya.
     Kamera miring dan dekat. Judul pembuka memudar.
  2. SATU gerakan kamera panjang: dari pandangan miring ke pandangan samping,
     tempat lembah itu terbaca sebagai grafik. Sumbu dan rumus muncul.
  3. f(x) + 1: lembah DAN kurvanya naik bersama satu satuan. Bekasnya membayang.
  4. f(x - 1) ditulis, lalu DIAM. Penonton menebak arahnya.
  5. Jawabannya ke kanan, walaupun tandanya minus. Lembah ikut bergeser.
  6. Alasannya: isi kurung nol saat x = 1, ditandai di lembahnya sendiri.
  7. Lembahnya BERUBAH BENTUK jadi akar x, perlakuan yang sama dikenakan lagi.
  8. Berubah sekali lagi jadi gelombang sinus, perpindahannya tetap sama.
  9. f(2x) ditulis, lalu DIAM lagi. Ini jebakan utamanya.
 10. Jawabannya setengah. Bola yang tadi di x = 2 kini sampai di x = 1.
 11. Alasannya: x sudah dikalikan dua SEBELUM masuk mesin.
 12. Penutup: dua kalimat aturannya, satu-satunya babak berlayar teks.

KENAPA BOLA DI LEMBAH, BUKAN BOLA DILEMPAR
Lintasan bola yang dilempar adalah parabola terbuka ke BAWAH, sedangkan tahap
ini memakai f(x) = x kuadrat yang terbuka ke ATAS. Memakai lemparan berarti
gambar membantah rumusnya sendiri, dan itu cacat terburuk menurut gerbang video
di CLAUDE.md. Lembah berbentuk x kuadrat benar secara bentuk, dan bolanya yang
mengayun di dasarnya membuat dunia tetap hidup saat narator diam (aturan 2
STANDAR-ILUSTRASI-VIDEO).

LEMBAHNYA IKUT BERGESER, BUKAN CUMA KURVANYA
Kalau hanya garis kurvanya yang dipindahkan sementara lembahnya diam, layar
mengatakan dua hal yang berlawanan. Setiap geseran dan setiap pergantian bentuk
dikenakan ke permukaan lembah DAN kurvanya bersama-sama, memakai Transform,
bukan hapus lalu gambar ulang (prinsip 1 ILMU-3B1B).

SATU WARNA SATU MAKNA (aturan 5)
  AKSEN  merah  = yang ditulis DI LUAR kurung
  AKSEN2 biru   = yang ditulis DI DALAM kurung
  SOROT  ungu   = kesimpulan dan penanda
  REDUP  abu    = bekas bentuk sebelumnya, sumbu, keterangan
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "grafik6-transformasi"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

# --- Tata ruang ---
# x = sumbu mendatar grafik, z = sumbu tegak, y = kedalaman lembah.
X_MIN, X_MAX = -3.4, 4.8
Y_LEMBAH = 1.5          # lembah membentang dari -Y_LEMBAH sampai +Y_LEMBAH
Y_KURVA = -1.72         # lapisan matematika, tepat DI DEPAN lembah dari sisi kamera
Z_BAWAH = -1.3

# Sudut pandang: dunia dulu, lalu samping tempat grafiknya terbaca.
#
# Kedua sudut DIPERLEBAR dan pusatnya dinaikkan setelah lembar kontak render
# pertama. Dua sebabnya:
#   - pada `tinggi` 6,4 dinding lembah terpotong tepi atas layar di babak
#     pembuka, dan lembah yang terpotong terbaca seperti lembah yang habis;
#   - pada pusat z = 1,9 angka sumbu jatuh persis sebaris dengan pita
#     keterangan di bawah layar, sehingga keduanya saling menimpa.
SUDUT_DUNIA = dict(theta=-42, phi=66, pusat=(0.4, 0.0, 1.7), tinggi=9.2)
SUDUT_GRAFIK = dict(theta=0, phi=90, pusat=(0.7, 0.0, 2.7), tinggi=8.4)

RESOLUSI = (48, 10)     # cukup halus untuk lembah, tetap ringan dirender


def f_parabola(x):
    return x * x


def f_akar(x):
    return 2.0 * np.sqrt(np.clip(x, 0.0, None))


def f_sinus(x):
    return 1.6 * np.sin(x) + 1.6


# Tiap bentuk dasar: fungsinya, rumusnya, dan jangkauan x yang digambar.
DASAR = {
    "parabola": dict(f=f_parabola, rumus=r"f(x) = x^{2}", dari=-2.05, sampai=2.05),
    "akar": dict(f=f_akar, rumus=r"f(x) = 2\sqrt{x}", dari=0.0, sampai=4.3),
    "sinus": dict(f=f_sinus, rumus=r"f(x) = 1{,}6\sin x + 1{,}6", dari=-3.2, sampai=4.4),
}


def tegak(mob):
    """Putar teks supaya terbaca dari pandangan samping (bidang xz)."""
    return mob.rotate(PI / 2, RIGHT)


def penanda(pos, warna, r=0.10):
    """Titik penanda di ruang 3D.

    Bola kecil, BUKAN `Dot`. `Dot` ManimGL adalah cakram datar di bidang xy,
    jadi dari pandangan samping ia menipis menjadi garis dan praktis hilang.

    `Dot3D` adalah nama Manim Community dan TIDAK ADA di ManimGL. Render
    pertama versi ini gagal karenanya, dan `cek_kode.py` tidak menangkapnya
    sebab ia memeriksa LaTeX dan pola tulisan, bukan nama fungsi yang ada.
    """
    b = Sphere(radius=r).set_color(warna)
    b.set_shading(0.4, 0.3, 0.5)
    return b.move_to(pos)


class GeserCerminRegang(AdeganMatra):

    # ==================================================================
    def construct(self):
        self.frame_ = self.frame
        self.f_kini = f_parabola
        self.batas_kini = (DASAR["parabola"]["dari"], DASAR["parabola"]["sampai"])
        self.f_tuju, self.batas_tuju = f_parabola, self.batas_kini
        self.campur = ValueTracker(0.0)

        self.b01_sapa()
        self.b02_parabola()
        self.b03_geseratas()
        self.b04_tanya()
        self.b05_jawab()
        self.b06_kenapa()
        self.b07_akar()
        self.b08_sinus()
        self.b09_mampat()
        self.b10_setengah()
        self.b11_kenapamampat()
        self.b12_tutup()

    # ------------------------------------------------------------------
    # Alat bantu
    # ------------------------------------------------------------------
    def buat_lembah(self, f, dari, sampai):
        """Permukaan lembah bercahaya plus jala tipis, mengikuti prinsip 4 ILMU-3B1B.

        Jala tipis itu yang memberi 'badan' pada permukaan; tanpa ia permukaan
        polos terlihat seperti tempelan warna, bukan benda.
        """
        s = ParametricSurface(
            lambda u, v: np.array([u, v, f(u)]),
            u_range=(dari, sampai), v_range=(-Y_LEMBAH, Y_LEMBAH),
            resolution=RESOLUSI,
        )
        s.set_color(REDUP, opacity=0.72)
        s.set_shading(0.4, 0.3, 0.5)
        jala = SurfaceMesh(s, resolution=(15, 5))
        jala.set_stroke(TINTA, width=1, opacity=0.16)
        return Group(s, jala)

    def buat_kurva(self, f, dari, sampai, warna=TINTA, tebal=5.0):
        """Garis kurva di lapisan matematika, tepat di depan lembahnya."""
        k = ParametricCurve(
            lambda t: np.array([t, Y_KURVA, f(t)]),
            t_range=(dari, sampai, 0.02),
        )
        k.set_stroke(warna, width=tebal)
        return k

    def pasang_bola(self):
        """Bola yang mengayun di dasar lembah. Inilah yang membuat dunia hidup.

        Posisinya dihitung ulang tiap frame dari bentuk yang SEDANG tampil.
        Saat lembahnya sedang berubah bentuk, bentuk lama dan bentuk baru
        DICAMPUR memakai `self.campur`, dengan perbandingan yang sama seperti
        yang dipakai `Transform` pada permukaannya. Tanpa itu bolanya tetap
        menempel pada bentuk LAMA selama satu setengah detik dan terlihat
        melayang jauh di udara, persis yang terjadi pada render pertama.
        """
        bola = ilustrasi.bola(0.26, AKSEN)

        def bentuk_kini(x):
            c = self.campur.get_value()
            if c <= 0.0:
                return self.f_kini(x)
            return (1.0 - c) * self.f_kini(x) + c * self.f_tuju(x)

        def batas_kini():
            c = self.campur.get_value()
            a1, b1 = self.batas_kini
            if c <= 0.0:
                return a1, b1
            a2, b2 = self.batas_tuju
            return (1 - c) * a1 + c * a2, (1 - c) * b1 + c * b2

        def geser(m):
            dari, sampai = batas_kini()
            tengah = 0.5 * (dari + sampai)
            lebar = 0.42 * (sampai - dari)
            x = tengah + lebar * np.sin(1.15 * self.time)
            m.move_to([x, Y_KURVA, bentuk_kini(x) + 0.26])

        geser(bola)
        bola.add_updater(geser)
        return bola

    def ubah_bentuk(self, b, f_baru, dari, sampai, lembah_baru, kurva_baru,
                    ikut=None, lama=1.6):
        """Ubah bentuk lembah dan kurvanya, dengan bolanya ikut menempel.

        `self.campur` berjalan 0 ke 1 bersama `Transform`, dan updater bola
        membaca perbandingan yang sama, jadi bola tidak pernah lepas dari
        permukaannya selama peralihan.
        """
        self.f_tuju, self.batas_tuju = f_baru, (dari, sampai)
        self.campur.set_value(0.0)
        b.main(
            Transform(self.lembah, lembah_baru),
            Transform(self.kurva, kurva_baru),
            self.campur.animate.set_value(1.0),
            *(ikut or []),
            run_time=lama,
        )
        self.f_kini, self.batas_kini = f_baru, (dari, sampai)
        self.campur.set_value(0.0)

    def buat_sumbu(self):
        """Sumbu x dan angkanya, di lapisan matematika, menghadap kamera samping."""
        garis = Line([X_MIN, Y_KURVA, 0], [X_MAX, Y_KURVA, 0])
        garis.set_stroke(REDUP, width=2)
        angka = Group()
        for n in (-3, -2, -1, 1, 2, 3, 4):
            a = tegak(rumus(str(n), 22, REDUP))
            # DI ATAS garis sumbu, bukan di bawahnya. Di bawah, angkanya jatuh
            # ke pita yang sama dengan keterangan di dasar layar, dan justru
            # angka di sekitar x = 1 yang tertutup tulisan, padahal itu angka
            # terpenting di video ini. Terlihat di lembar kontak render kedua.
            a.move_to([n, Y_KURVA, 0.34])
            angka.add(a)
        return Group(garis, angka)

    def panel(self, potongan, warna_akhir=None):
        """Tumpukan rumus di pojok kanan atas layar, menempel walau kamera terbang."""
        baris = VGroup(*[rumus(p, 34) for p in potongan])
        baris.arrange(DOWN, buff=0.34, aligned_edge=LEFT)
        if warna_akhir is not None:
            baris[-1].set_color(warna_akhir)
        sinema.batasi_lebar(baris, 5.2)
        # Kiri atas, BUKAN kanan atas: semua kurva di topik ini naik ke kanan,
        # dan pada render pertama rumus `f(x) = 2 akar x` tertimpa kurvanya
        # sendiri di pojok kanan atas.
        baris.to_corner(UL, buff=0.45)
        return baris

    def ganti_panel(self, b, panel_baru, lama=1.1):
        """Tukar panel rumus BERURUTAN, jangan pernah di-morph.

        Transform antara dua rumus yang jumlah lambangnya berbeda menghasilkan
        coretan kembar tak terbaca selama seluruh animasinya. Cacat itu sudah
        tercatat di PROGRESS.md untuk video Limit materi 06, dan terulang lagi
        di render uji versi Manim CE video ini pada detik 70. Prinsip 1
        ILMU-3B1B soal gerak menyambung berlaku untuk BENDA dan GRAFIK, bukan
        untuk deretan lambang yang isinya berganti.
        """
        b.main(FadeOut(self.pnl, shift=UP * 0.12), run_time=lama * 0.42)
        self.hud_tambah(panel_baru)
        panel_baru.set_opacity(0)
        b.main(panel_baru.animate.set_opacity(1), run_time=lama * 0.58)
        self.pnl = panel_baru

    def periksa(self, tambahan=None, pasangan=None):
        # Lembah ikut diperiksa. Pada render pertama ia tidak diperiksa, dan
        # dinding lembahnya terpotong tepi atas layar tanpa satu pun gerbang
        # berbunyi.
        zona = {"lembah": self.lembah, "kurva": self.kurva, "panel": self.pnl,
                "keterangan": getattr(self, "_matra_keterangan", None)}
        zona.update(tambahan or {})
        zona = {k: v for k, v in zona.items() if v is not None}
        qc.periksa_adegan(self, zona, pasangan or [])

    # ==================================================================
    def b01_sapa(self):
        d = DASAR["parabola"]
        self.lembah = self.buat_lembah(d["f"], d["dari"], d["sampai"])
        self.kurva = self.buat_kurva(d["f"], d["dari"], d["sampai"])
        self.bola = self.pasang_bola()
        self.pnl = self.panel([d["rumus"]])

        kamera.pasang_awal(self.frame_, **SUDUT_DUNIA)
        self.add(self.lembah, self.kurva, self.bola)

        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Bentuk lembah ini\ny = x kuadrat", lama=3.4, y=2.3)
            b.catat(3.4)
            sinema.keterangan(self, "bolanya mengayun di dasarnya")
            b.catat(0.6)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"lembah": self.lembah, "bola": self.bola,
                                 "keterangan": self._matra_keterangan})

    # ==================================================================
    def b02_parabola(self):
        """SATU gerakan kamera panjang: dari dunia ke sudut tempat grafiknya terbaca."""
        self.sumbu = self.buat_sumbu()

        with sinema.babak(self, "parabola", DURASI) as b:
            lama_terbang = max(2.4, DURASI["parabola"] - 5.2)
            b.main(kamera.sudut(self.frame_, **SUDUT_GRAFIK), run_time=lama_terbang)
            b.main(FadeIn(self.sumbu), run_time=0.8)
            self.hud_tambah(self.pnl)
            self.pnl.set_opacity(0)
            b.main(self.pnl.animate.set_opacity(1), run_time=0.7)
            sinema.keterangan(self, "dari samping, lembahnya terbaca sebagai grafik")
            b.catat(0.6)
            b.jeda(0.8)
        self.periksa({"bola": self.bola, "sumbu": self.sumbu},
                     [("panel", "keterangan")])

    # ==================================================================
    def geser_dunia(self, b, dx, dz, lama=1.8):
        """Geser lembah, kurva, dan bekasnya bersama-sama. Bukan gambar ulang."""
        b.main(
            self.lembah.animate.shift(np.array([dx, 0.0, dz])),
            self.kurva.animate.shift(np.array([dx, 0.0, dz])),
            run_time=lama,
        )
        f_lama = self.f_kini
        dari, sampai = self.batas_kini
        self.f_kini = lambda x: f_lama(x - dx) + dz
        self.batas_kini = (dari + dx, sampai + dx)

    def b03_geseratas(self):
        d = DASAR["parabola"]
        self.bayang = self.buat_kurva(d["f"], d["dari"], d["sampai"], REDUP, 2.6)
        self.bayang.set_stroke(opacity=0.5)
        self.add(self.bayang)

        with sinema.babak(self, "geseratas", DURASI) as b:
            sinema.keterangan(self, "di LUAR kurung: naik satu, bentuknya utuh", warna=AKSEN)
            b.catat(0.6)
            self.ganti_panel(b, self.panel([d["rumus"], r"y = f(x) + 1"], AKSEN))
            self.geser_dunia(b, 0.0, 1.0)
            b.jeda(1.0)
        self.periksa({"bola": self.bola, "bayang": self.bayang})

    # ==================================================================
    def b04_tanya(self):
        """Pertanyaan tebakan lewat pita keterangan, BUKAN teks di dunia.

        Pada render pertama ia teks di dunia dan menimpa bola yang sedang
        mengayun. Pita keterangan sudah beralas krem dan menempel di layar,
        jadi ia tidak mungkin bertabrakan dengan benda mana pun.
        """
        d = DASAR["parabola"]
        with sinema.babak(self, "tanya", DURASI) as b:
            self.ganti_panel(b, self.panel([d["rumus"], r"y = f(x - 1) + 1"], AKSEN2))
            sinema.keterangan(self, "tebak dulu: ke kiri, atau ke kanan?", warna=AKSEN2)
            b.catat(0.6)
            b.jeda(1.6)
        self.periksa({"bola": self.bola, "lembah": self.lembah})

    # ==================================================================
    def b05_jawab(self):
        with sinema.babak(self, "jawab", DURASI) as b:
            sinema.keterangan(self, "tandanya minus, pindahnya ke KANAN", warna=AKSEN2)
            b.catat(0.6)
            self.geser_dunia(b, 1.0, 0.0, lama=2.0)
            b.jeda(1.2)
        self.periksa({"bola": self.bola, "bayang": self.bayang})

    # ==================================================================
    def b06_kenapa(self):
        garis = DashedLine([1.0, Y_KURVA, Z_BAWAH], [1.0, Y_KURVA, 1.0])
        garis.set_stroke(AKSEN2, width=3)
        titik = penanda([1.0, Y_KURVA, 1.0], AKSEN2, 0.09)
        label = tegak(rumus(r"x = 1", 30, AKSEN2))
        label.move_to([1.75, Y_KURVA, -0.75])

        with sinema.babak(self, "kenapa", DURASI) as b:
            sinema.keterangan(self, "titik terendah pindah ke tempat kurungnya nol")
            b.catat(0.6)
            b.main(ShowCreation(garis), FadeIn(titik), run_time=1.4)
            b.main(FadeIn(label), run_time=0.7)
            b.jeda(1.2)
            b.main(FadeOut(garis), FadeOut(titik), FadeOut(label), run_time=0.8)
        self.periksa({"bola": self.bola})

    # ==================================================================
    def ganti_bentuk(self, b, nama, kalimat):
        """Ubah BENTUK lembahnya, lalu kenakan dua perlakuan yang sama.

        Lembah dan kurva di-Transform, tidak dihapus lalu digambar ulang, supaya
        penonton tidak kehilangan jejak benda yang mana yang tadi mana.
        """
        d = DASAR[nama]
        sinema.keterangan(self, kalimat, warna=SOROT)
        b.catat(0.6)

        self.ubah_bentuk(
            b, d["f"], d["dari"], d["sampai"],
            self.buat_lembah(d["f"], d["dari"], d["sampai"]),
            self.buat_kurva(d["f"], d["dari"], d["sampai"]),
            ikut=[FadeOut(self.bayang)], lama=1.5,
        )

        self.bayang = self.buat_kurva(d["f"], d["dari"], d["sampai"], REDUP, 2.6)
        self.bayang.set_stroke(opacity=0.5)
        self.add(self.bayang)

        self.ganti_panel(b, self.panel([d["rumus"], r"y = f(x - 1) + 1"], SOROT), lama=1.0)
        self.geser_dunia(b, 1.0, 1.0, lama=1.6)

    def b07_akar(self):
        with sinema.babak(self, "akar", DURASI) as b:
            self.ganti_bentuk(b, "akar", "bentuk lain, perpindahan sama")
        self.periksa({"bola": self.bola, "bayang": self.bayang})

    def b08_sinus(self):
        with sinema.babak(self, "sinus", DURASI) as b:
            self.ganti_bentuk(b, "sinus", "aturannya tidak peduli bentuk grafiknya")
            b.jeda(1.0)
        self.periksa({"bola": self.bola, "bayang": self.bayang})

    # ==================================================================
    def b09_mampat(self):
        d = DASAR["parabola"]
        lembah_baru = self.buat_lembah(d["f"], d["dari"], d["sampai"])
        kurva_baru = self.buat_kurva(d["f"], d["dari"], d["sampai"])
        with sinema.babak(self, "mampat", DURASI) as b:
            self.ubah_bentuk(b, d["f"], d["dari"], d["sampai"], lembah_baru, kurva_baru,
                             ikut=[FadeOut(self.bayang)], lama=1.6)
            self.ganti_panel(b, self.panel([d["rumus"], r"y = f(2x)"], AKSEN2), lama=1.0)
            sinema.keterangan(self, "tebak dulu: dua kali lebar, atau setengah?",
                              warna=AKSEN2)
            b.catat(0.6)
            b.jeda(1.5)
        self.periksa({"bola": self.bola, "lembah": self.lembah})

    # ==================================================================
    def b10_setengah(self):
        d = DASAR["parabola"]
        self.bayang = self.buat_kurva(d["f"], d["dari"], d["sampai"], REDUP, 2.6)
        self.bayang.set_stroke(opacity=0.5)

        def f_mampat(x):
            return d["f"](2.0 * x)

        lembah_baru = self.buat_lembah(f_mampat, -1.03, 1.03)
        kurva_baru = self.buat_kurva(f_mampat, -1.03, 1.03)

        lama = penanda([2.0, Y_KURVA, 4.0], REDUP, 0.08)
        baru = penanda([1.0, Y_KURVA, 4.0], AKSEN2, 0.10)
        panah = Arrow([2.0, Y_KURVA, 4.0], [1.0, Y_KURVA, 4.0], buff=0.1, thickness=4)
        panah.set_color(AKSEN2)

        with sinema.babak(self, "setengah", DURASI) as b:
            sinema.keterangan(self, "nilai 4 pindah dari x = 2 ke x = 1", warna=AKSEN2)
            b.catat(0.6)
            self.add(self.bayang)
            self.ubah_bentuk(b, f_mampat, -1.03, 1.03, lembah_baru, kurva_baru, lama=1.8)
            b.main(FadeIn(lama), GrowArrow(panah), FadeIn(baru), run_time=1.2)
            b.jeda(0.9)
        self.penanda = Group(lama, baru, panah)
        self.periksa({"bola": self.bola, "bayang": self.bayang, "panah": panah})

    # ==================================================================
    def b11_kenapamampat(self):
        alasan = tegak(rumus(r"f(2 \cdot 1) = f(2)", 30, AKSEN2))
        alasan.move_to([2.6, Y_KURVA, 2.1])

        with sinema.babak(self, "kenapamampat", DURASI) as b:
            sinema.keterangan(self, "mesinnya sampai lebih awal, jadi grafiknya memampat")
            b.catat(0.6)
            b.main(Write(alasan), run_time=2.2)
            b.jeda(1.4)
            b.main(FadeOut(alasan), FadeOut(self.penanda), run_time=0.8)
        self.periksa({"bola": self.bola, "bayang": self.bayang})

    # ==================================================================
    def b12_tutup(self):
        """Satu-satunya babak yang boleh berupa layar teks, sesuai aturan 4."""
        luar = teks("Angka di LUAR kurung\nmengerjakan apa yang tertulis.", 30, AKSEN)
        dalam = teks("Angka yang masuk ke DALAM kurung\nmengerjakan kebalikannya.", 30, AKSEN2)
        dua = VGroup(luar, dalam).arrange(DOWN, buff=0.6)
        sinema.batasi_lebar(dua, 11.0)
        dua = sinema.alas_teks(dua, buff=0.35).move_to([0, 0.1, 0])
        dua.fix_in_frame()

        with sinema.babak(self, "tutup", DURASI) as b:
            sinema.hapus_keterangan(self)
            b.catat(0.4)
            b.main(
                FadeOut(self.lembah), FadeOut(self.kurva),
                FadeOut(self.bayang), FadeOut(self.bola), FadeOut(self.sumbu),
                run_time=1.2,
            )
            b.main(FadeIn(dua, shift=UP * 0.2), run_time=1.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"dua kalimat": dua, "panel": self.pnl},
                          [("dua kalimat", "panel")])
