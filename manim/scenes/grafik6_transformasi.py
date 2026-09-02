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
# Ujung bawah sumbu y dan garis putus-putus. Dangkal SEKALI, karena keduanya
# tegak dan pita keterangan mendatar: pada -0,8 garis sumbu y turun sampai 452
# piksel dan MEMOTONG tulisan keterangan di 429 sampai 446. Terlihat di lembar
# kontak detik 90 (kata "pindah") dan detik 100 (kata "lain").
Z_BAWAH = -0.20
Z_ATAS = 5.2           # ujung atas sumbu y, setinggi puncak tertinggi yang pernah digambar

# Sudut pandang: dunia dulu, lalu samping tempat grafiknya terbaca.
#
# Kedua sudut DIPERLEBAR dan pusatnya dinaikkan setelah lembar kontak render
# pertama. Dua sebabnya:
#   - pada `tinggi` 6,4 dinding lembah terpotong tepi atas layar di babak
#     pembuka, dan lembah yang terpotong terbaca seperti lembah yang habis;
#   - pada pusat z = 1,9 angka sumbu jatuh persis sebaris dengan pita
#     keterangan di bawah layar, sehingga keduanya saling menimpa.
SUDUT_DUNIA = dict(theta=-42, phi=66, pusat=(0.4, 0.0, 1.7), tinggi=9.2)
# Pusat z DITURUNKAN dari 2,7 ke 2,3 setelah ARYA melihat render pertama:
# kamera yang memusat lebih rendah menaikkan seluruh dunia di layar, jadi
# garis sumbu dan angkanya menjauh dari pita subtitle di bawah. Titik
# tertinggi yang pernah digambar topik ini adalah parabola setelah digeser
# sesatuan ke atas. Angkanya dipilih dari UKURAN, bukan kira-kira: pada 2,0
# sisa tepi atas cuma 19 piksel sedangkan celah ke pita keterangan 51 piksel,
# jadi dunianya diturunkan 0,3 satuan supaya kedua sisi sama lapangnya.
# Dunianya sengaja dikecilkan sampai grafiknya berhenti di sekitar 374 piksel
# dari 480, meninggalkan DUA pita kosong di bawahnya: satu untuk keterangan di
# dalam gambar, satu lagi untuk subtitle yang ditaruh peramban. Di 480p ini
# terasa sempit; di 1080p semuanya 2,25 kali lebih besar.
SUDUT_GRAFIK = dict(theta=0, phi=90, pusat=(0.7, 0.0, 2.28), tinggi=10.2)

# Tinggi pita keterangan di dalam gambar. TIDAK memakai bawaan -3,30 dari
# gl.sinema, dan itu disengaja: pada -3,30 keterangan duduk di 429 sampai 446
# piksel dari 480, persis tempat peramban menaruh subtitle <track> milik
# `web/public/anim/<topik>.vtt`. Di situs keduanya akan saling menimpa.
# Pita paling bawah layar dikosongkan untuk subtitle, keterangan naik ke sini.
Y_KET = -2.55

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


# Lima nilai yang dihitung di depan penonton sebelum kurvanya ditarik.
# Simetris di sekitar nol supaya bentuk parabolanya keluar dari angkanya
# sendiri, bukan dari kepercayaan penonton kepada narator.
NILAI_HITUNG = [(-2, 4), (-1, 1), (0, 0), (1, 1), (2, 4)]


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
        # Geseran yang SEDANG berjalan. Bola membacanya tiap frame, jadi ia
        # berangkat bersama lembahnya, bukan menunggu di tempat lalu meloncat.
        self.geser_x = ValueTracker(0.0)
        self.geser_z = ValueTracker(0.0)

        self.b01_sapa()
        self.b02_lembah()
        self.b03_parabola()
        self.b04_titik()
        self.b05_geseratas()
        self.b06_tanya()
        self.b07_jawab()
        self.b08_kenapa()
        self.b09_akar()
        self.b10_sinus()
        self.b11_mampat()
        self.b12_setengah()
        self.b13_kenapamampat()
        self.b14_tutup()

    # ------------------------------------------------------------------
    # Alat bantu
    # ------------------------------------------------------------------
    def buat_lembah(self, f, dari, sampai):
        """Lembah dari perkakas bersama.

        Bentuknya dipindah ke `gl.ilustrasi.lembah_fungsi` sesuai aturan 1
        STANDAR-ILUSTRASI-VIDEO: benda nyata yang belum ada ditambahkan ke
        perkakas bersama, bukan dibuat sendiri di dalam satu adegan. Topik lain
        yang butuh penampang (talang, punggung bukit, lintasan) memakai fungsi
        yang sama.
        """
        return ilustrasi.lembah_fungsi(f, dari, sampai, lebar=2 * Y_LEMBAH,
                                       resolusi=RESOLUSI)

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
            """Tinggi permukaan di titik x, TERMASUK geseran yang sedang jalan.

            Geserannya dihitung persis seperti `shift` menggerakkan
            permukaannya: pada pertengahan animasi permukaan sudah pindah
            setengah jalan, jadi bolanya pun membaca bentuk lama yang digeser
            setengah jalan. Kalau geseran ini diabaikan, bola bertahan di
            tempat lama selama dua detik lalu MELONCAT ke tempat barunya, dan
            itu yang dilihat ARYA di render pertama.
            """
            gx, gz = self.geser_x.get_value(), self.geser_z.get_value()
            c = self.campur.get_value()
            if c <= 0.0:
                return self.f_kini(x - gx) + gz
            return ((1.0 - c) * self.f_kini(x - gx)
                    + c * self.f_tuju(x - gx)) + gz

        def batas_kini():
            gx = self.geser_x.get_value()
            c = self.campur.get_value()
            a1, b1 = self.batas_kini
            if c <= 0.0:
                return a1 + gx, b1 + gx
            a2, b2 = self.batas_tuju
            return ((1 - c) * a1 + c * a2 + gx,
                    (1 - c) * b1 + c * b2 + gx)

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
                    panel_baru=None, ikut=None, lama=1.6):
        """Ubah bentuk lembah dan kurvanya, dengan bolanya ikut menempel.

        `self.campur` berjalan 0 ke 1 bersama `Transform`, dan updater bola
        membaca perbandingan yang sama, jadi bola tidak pernah lepas dari
        permukaannya selama peralihan.

        RUMUSNYA BERGANTI BERSAMAAN, BUKAN SESUDAHNYA.
        Pada render keempat rumusnya diganti setelah bentuknya selesai berubah,
        sehingga selama 1,6 detik panel menyebut bentuk lama padahal lembahnya
        sudah berubah. Tulisan yang membantah gambarnya lebih merusak daripada
        layar kosong, itu aturan gerbang video di CLAUDE.md.

        Rumus lamanya tetap DIKELUARKAN dulu, tidak pernah di-morph menjadi
        rumus baru: peralihan antar dua rumus yang jumlah lambangnya berbeda
        menghasilkan coretan kembar tak terbaca.
        """
        if panel_baru is not None:
            b.main(FadeOut(self.pnl, shift=UP * 0.12), run_time=0.42)
            self.hud_tambah(panel_baru)
            panel_baru.set_opacity(0)

        self.f_tuju, self.batas_tuju = f_baru, (dari, sampai)
        self.campur.set_value(0.0)
        bareng = [
            Transform(self.lembah, lembah_baru),
            Transform(self.kurva, kurva_baru),
            self.campur.animate.set_value(1.0),
        ]
        if panel_baru is not None:
            bareng.append(panel_baru.animate.set_opacity(1))
        b.main(*bareng, *(ikut or []), run_time=lama)

        if panel_baru is not None:
            self.pnl = panel_baru
        self.f_kini, self.batas_kini = f_baru, (dari, sampai)
        self.campur.set_value(0.0)

    def buat_sumbu(self):
        """DUA sumbu, x dan y, lengkap dengan angka dan hurufnya.

        Sumbu y sempat tidak ada sama sekali di video ini, dan ARYA yang
        menemukannya: "grafik fungsi wajib banget menampilkan 2 sumbu x dan y".
        Tanpa sumbu tegak, tinggi sebuah titik tidak bisa dibaca, jadi kalimat
        seperti "naik satu satuan" tidak punya alat ukur di layar.
        """
        gx = Line([X_MIN, Y_KURVA, 0], [X_MAX, Y_KURVA, 0])
        gy = Line([0, Y_KURVA, Z_BAWAH], [0, Y_KURVA, Z_ATAS])
        for g in (gx, gy):
            g.set_stroke(REDUP, width=2)

        angka = Group()
        for n in (-3, -2, -1, 1, 2, 3, 4):
            a = tegak(rumus(str(n), 22, REDUP))
            # DI ATAS garis sumbu, bukan di bawahnya. Di bawah, angkanya jatuh
            # ke pita yang sama dengan keterangan di dasar layar, dan justru
            # angka di sekitar x = 1 yang tertutup tulisan, padahal itu angka
            # terpenting di video ini. Terlihat di lembar kontak render kedua.
            a.move_to([n, Y_KURVA, 0.34])
            angka.add(a)
        for n in (1, 2, 3, 4, 5):
            # Di KIRI sumbu tegak. Di kanan, angkanya jatuh ke dalam cekungan
            # parabola justru di tempat kurvanya lewat setelah digeser.
            a = tegak(rumus(str(n), 22, REDUP))
            a.move_to([-0.34, Y_KURVA, n])
            angka.add(a)

        huruf = Group(
            tegak(rumus("x", 24, REDUP)).move_to([X_MAX - 0.25, Y_KURVA, 0.42]),
            tegak(rumus("y", 24, REDUP)).move_to([0.42, Y_KURVA, Z_ATAS - 0.1]),
        )
        return Group(gx, gy, angka, huruf)

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

    def ket(self, kalimat, **k):
        """Keterangan di dalam gambar, di atas pita yang dipakai subtitle.

        Satu pintu untuk seluruh adegan supaya tingginya tidak tercecer.
        """
        k.setdefault("y", Y_KET)
        return sinema.keterangan(self, kalimat, **k)

    def periksa(self, tambahan=None, pasangan=None, tanpa_kurva=False):
        # Lembah ikut diperiksa. Pada render pertama ia tidak diperiksa, dan
        # dinding lembahnya terpotong tepi atas layar tanpa satu pun gerbang
        # berbunyi.
        zona = {"lembah": self.lembah, "panel": self.pnl,
                "sumbu": getattr(self, "sumbu", None),
                "keterangan": getattr(self, "_matra_keterangan", None)}
        if not tanpa_kurva:
            zona["kurva"] = self.kurva
        zona.update(tambahan or {})
        zona = {k: v for k, v in zona.items() if v is not None}

        # Keterangan diadu dengan sumbu SELALU. Pita keterangan pernah
        # dinaikkan tanpa mengecilkan dunianya lebih dulu, mendarat tepat di
        # atas garis sumbu x, dan lolos render tanpa satu pun peringatan
        # karena pasangan ini tidak pernah diperiksa.
        adu = list(pasangan or [])
        if "sumbu" in zona and "keterangan" in zona:
            adu.append(("sumbu", "keterangan"))
        qc.periksa_adegan(self, zona, adu)

    # ==================================================================
    def b01_sapa(self):
        """Judul SAJA di layar bersih. Dunianya belum ada sama sekali.

        Sebelumnya lembah, kurva, dan bola sudah terpasang di belakang judul.
        ARYA menilainya "terlalu rame dan berantakan" dan menunjuk video
        Trigonometri sebagai patokan. Di sana babak pertama memang judul saja,
        mengisi seluruh segmen, tanpa apa pun di belakangnya; gambarnya baru
        dibangun di babak berikutnya. Pola itu yang dipakai di sini.
        """
        kamera.pasang_awal(self.frame_, **SUDUT_DUNIA)

        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Geser, cermin, regang",
                                 lama=DURASI["sapa"])
            b.catat(DURASI["sapa"])

    # ==================================================================
    def b02_lembah(self):
        """Dunianya dibangun setelah judul memudar: lembah dulu, lalu bolanya.

        Urutannya sengaja bertahap, bukan sekali muncul: penonton sempat
        membaca bentuk lembahnya sebelum ada benda yang bergerak di dalamnya.
        """
        d = DASAR["parabola"]
        self.lembah = self.buat_lembah(d["f"], d["dari"], d["sampai"])
        self.kurva = self.buat_kurva(d["f"], d["dari"], d["sampai"])
        self.bola = self.pasang_bola()
        self.pnl = self.panel([d["rumus"]])

        with sinema.babak(self, "lembah", DURASI) as b:
            b.main(FadeIn(self.lembah), run_time=1.5)
            b.main(FadeIn(self.bola), run_time=0.9)
            self.ket("bolanya mengayun di dasar lembah")
            b.catat(0.6)
            b.jeda(0.9)
        qc.periksa_adegan(self, {"lembah": self.lembah, "bola": self.bola,
                                 "keterangan": self._matra_keterangan})

    # ==================================================================
    def b03_parabola(self):
        """SATU gerakan kamera panjang: dari dunia ke sudut tempat grafiknya terbaca.

        Kurvanya BELUM ditarik di sini. Babak berikutnya menghitung dulu lima
        nilai f(x) dan memplotnya; kurvanya baru menyusul sebagai penghubung
        kelima titik itu.
        """
        self.sumbu = self.buat_sumbu()

        with sinema.babak(self, "parabola", DURASI) as b:
            lama_terbang = max(2.4, DURASI["parabola"] - 5.4)
            b.main(kamera.sudut(self.frame_, **SUDUT_GRAFIK), run_time=lama_terbang)
            b.main(FadeIn(self.sumbu), run_time=0.9)
            self.hud_tambah(self.pnl)
            self.pnl.set_opacity(0)
            b.main(self.pnl.animate.set_opacity(1), run_time=0.7)
            self.ket("dari samping, lembahnya terbaca sebagai grafik")
            b.catat(0.6)
            b.jeda(0.5)
        self.periksa({"bola": self.bola, "sumbu": self.sumbu},
                     [("panel", "keterangan")], tanpa_kurva=True)

    # ==================================================================
    def b04_titik(self):
        """Kurvanya TIDAK muncul begitu saja: dihitung, diplot, baru disambung.

        ARYA, 2 September: "siswa paham kenapa bisa bentuknya seperti itu,
        tidak secara ajaib langsung menjadi seperti itu". Jadi tiap nilai
        dihitung di layar, titiknya mendarat di bidang pada saat yang sama,
        dan kurvanya baru ditarik SESUDAH kelima titik berdiri sendiri.

        Lima titik, bukan tiga. Dengan tiga titik bentuk parabola masih terasa
        ditebak; dengan lima, kesetangkupannya kelihatan dan kurvanya benar
        benar terbaca sebagai hasil hitungan.
        """
        hitungan = VGroup(*[
            rumus(r"f(%d) = (%d)^{2} = %d" % (x, x, y) if x < 0
                  else r"f(%d) = %d^{2} = %d" % (x, x, y), 26)
            for x, y in NILAI_HITUNG
        ])
        hitungan.arrange(DOWN, buff=0.30, aligned_edge=LEFT)
        sinema.batasi_lebar(hitungan, 4.4)
        hitungan.to_corner(UR, buff=0.45)

        self.titik = Group(*[penanda([x, Y_KURVA, y], SOROT, 0.13)
                             for x, y in NILAI_HITUNG])

        with sinema.babak(self, "titik", DURASI) as b:
            self.hud_tambah(hitungan)
            for baris in hitungan:
                baris.set_opacity(0)
            # Narator bertanya dulu ("kenapa bentuknya begitu?") sebelum angka
            # pertama disebut. Tanpa jeda ini, titik pertama mendarat saat
            # narator masih bertanya, dan jawabannya mendahului pertanyaannya.
            b.jeda(3.4)
            for baris, tt in zip(hitungan, self.titik):
                b.main(baris.animate.set_opacity(1), FadeIn(tt), run_time=1.15)
                b.jeda(0.6)
            b.jeda(0.4)
            b.main(ShowCreation(self.kurva), run_time=2.0)
            self.ket("kurvanya cuma *menghubungkan* titik yang dihitung")
            b.catat(0.6)
            b.jeda(0.6)
            b.main(FadeOut(hitungan), run_time=0.7)
        # Titiknya ikut digeser bersama grafiknya di babak-babak berikutnya.
        # Kalau tidak, titik hasil hitungan akan tertinggal di tempat lama dan
        # MEMBANTAH kurvanya sendiri, cacat terburuk menurut gerbang video.
        self.ikutan = [self.titik]
        self.periksa({"bola": self.bola, "sumbu": self.sumbu,
                      "titik": self.titik})

    # ==================================================================
    def geser_dunia(self, b, dx, dz, lama=1.8):
        """Geser lembah, kurva, DAN bolanya bersama-sama. Bukan gambar ulang.

        Bolanya ikut lewat `self.geser_x` dan `self.geser_z`, yang berjalan
        0 ke dx dan 0 ke dz bersamaan dengan `shift` pada permukaannya. Dua
        gerakan itu memakai perlambatan bawaan yang sama, jadi bola menempel
        di permukaannya di SETIAP frame, bukan cuma di frame awal dan akhir.

        Sebelum ini geserannya baru dicatat SESUDAH animasi selesai, sehingga
        bola menggelinding di tempat lamanya selama animasi lalu pindah dalam
        satu frame. ARYA menyebutnya "bolanya terlihat seperti teleport".
        """
        self.geser_x.set_value(0.0)
        self.geser_z.set_value(0.0)
        pindah = np.array([dx, 0.0, dz])
        ikut = [m.animate.shift(pindah) for m in getattr(self, "ikutan", [])]
        b.main(
            self.lembah.animate.shift(pindah),
            self.kurva.animate.shift(pindah),
            self.geser_x.animate.set_value(dx),
            self.geser_z.animate.set_value(dz),
            *ikut,
            run_time=lama,
        )
        f_lama = self.f_kini
        dari, sampai = self.batas_kini
        self.f_kini = lambda x, f=f_lama: f(x - dx) + dz
        self.batas_kini = (dari + dx, sampai + dx)
        self.geser_x.set_value(0.0)
        self.geser_z.set_value(0.0)

    def b05_geseratas(self):
        d = DASAR["parabola"]
        self.bayang = self.buat_kurva(d["f"], d["dari"], d["sampai"], REDUP, 2.6)
        self.bayang.set_stroke(opacity=0.5)
        self.add(self.bayang)

        with sinema.babak(self, "geseratas", DURASI) as b:
            self.ket("di LUAR kurung: naik satu, bentuknya utuh", warna=AKSEN)
            b.catat(0.6)
            self.ganti_panel(b, self.panel([d["rumus"], r"y = f(x) + 1"], AKSEN))
            self.geser_dunia(b, 0.0, 1.0)
            b.jeda(1.0)
        self.periksa({"bola": self.bola, "bayang": self.bayang})

    # ==================================================================
    def b06_tanya(self):
        """Pertanyaan tebakan lewat pita keterangan, BUKAN teks di dunia.

        Pada render pertama ia teks di dunia dan menimpa bola yang sedang
        mengayun. Pita keterangan sudah beralas krem dan menempel di layar,
        jadi ia tidak mungkin bertabrakan dengan benda mana pun.
        """
        d = DASAR["parabola"]
        with sinema.babak(self, "tanya", DURASI) as b:
            self.ganti_panel(b, self.panel([d["rumus"], r"y = f(x - 1) + 1"], AKSEN2))
            self.ket("tebak dulu: ke kiri, atau ke kanan?", warna=AKSEN2)
            b.catat(0.6)
            b.jeda(1.6)
        self.periksa({"bola": self.bola, "lembah": self.lembah})

    # ==================================================================
    def b07_jawab(self):
        with sinema.babak(self, "jawab", DURASI) as b:
            self.ket("tandanya minus, pindahnya ke KANAN", warna=AKSEN2)
            b.catat(0.6)
            self.geser_dunia(b, 1.0, 0.0, lama=2.0)
            b.jeda(1.2)
        self.periksa({"bola": self.bola, "bayang": self.bayang})

    # ==================================================================
    def b08_kenapa(self):
        garis = DashedLine([1.0, Y_KURVA, Z_BAWAH], [1.0, Y_KURVA, 1.0])
        garis.set_stroke(AKSEN2, width=3)
        titik = penanda([1.0, Y_KURVA, 1.0], AKSEN2, 0.09)
        label = tegak(rumus(r"x = 1", 30, AKSEN2))
        label.move_to([1.75, Y_KURVA, -0.75])

        with sinema.babak(self, "kenapa", DURASI) as b:
            self.ket("titik terendah pindah ke tempat kurungnya nol")
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
        self.ket(kalimat, warna=SOROT)
        b.catat(0.6)

        # Titik hasil hitungan dilepas SEKALI, tepat saat bentuk fungsinya
        # berganti: nilai 2 kuadrat sama dengan 4 tidak berlaku lagi untuk akar
        # maupun sinus, jadi titiknya akan membantah kurvanya sendiri.
        # Daftar ikutan dikosongkan pada saat yang sama. Kalau tidak, geseran
        # sesudah ini menganimasikan titik yang sudah di-FadeOut, dan ManimGL
        # MENGEMBALIKAN objek yang di-FadeOut ke keadaan semula saat ia
        # dibersihkan, jadi kelima titik itu akan muncul lagi terang benderang.
        lepas = [FadeOut(self.bayang)]
        if getattr(self, "ikutan", None):
            lepas.append(FadeOut(self.titik))
            self.ikutan = []

        self.ubah_bentuk(
            b, d["f"], d["dari"], d["sampai"],
            self.buat_lembah(d["f"], d["dari"], d["sampai"]),
            self.buat_kurva(d["f"], d["dari"], d["sampai"]),
            panel_baru=self.panel([d["rumus"], r"y = f(x - 1) + 1"], SOROT),
            ikut=lepas, lama=1.5,
        )

        self.bayang = self.buat_kurva(d["f"], d["dari"], d["sampai"], REDUP, 2.6)
        self.bayang.set_stroke(opacity=0.5)
        self.add(self.bayang)

        self.geser_dunia(b, 1.0, 1.0, lama=1.6)

    def b09_akar(self):
        with sinema.babak(self, "akar", DURASI) as b:
            self.ganti_bentuk(b, "akar", "bentuk lain, perpindahan sama")
        self.periksa({"bola": self.bola, "bayang": self.bayang})

    def b10_sinus(self):
        with sinema.babak(self, "sinus", DURASI) as b:
            self.ganti_bentuk(b, "sinus", "aturannya tidak peduli bentuk grafiknya")
            b.jeda(1.0)
        self.periksa({"bola": self.bola, "bayang": self.bayang})

    # ==================================================================
    def b11_mampat(self):
        d = DASAR["parabola"]
        lembah_baru = self.buat_lembah(d["f"], d["dari"], d["sampai"])
        kurva_baru = self.buat_kurva(d["f"], d["dari"], d["sampai"])
        with sinema.babak(self, "mampat", DURASI) as b:
            self.ubah_bentuk(b, d["f"], d["dari"], d["sampai"], lembah_baru, kurva_baru,
                             panel_baru=self.panel([d["rumus"], r"y = f(2x)"], AKSEN2),
                             ikut=[FadeOut(self.bayang)], lama=1.6)
            self.ket("tebak dulu: dua kali lebar, atau setengah?",
                              warna=AKSEN2)
            b.catat(0.6)
            b.jeda(1.5)
        self.periksa({"bola": self.bola, "lembah": self.lembah})

    # ==================================================================
    def b12_setengah(self):
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
            self.ket("nilai 4 pindah dari x = 2 ke x = 1", warna=AKSEN2)
            b.catat(0.6)
            self.add(self.bayang)
            self.ubah_bentuk(b, f_mampat, -1.03, 1.03, lembah_baru, kurva_baru, lama=1.8)
            b.main(FadeIn(lama), GrowArrow(panah), FadeIn(baru), run_time=1.2)
            b.jeda(0.9)
        self.penanda = Group(lama, baru, panah)
        self.periksa({"bola": self.bola, "bayang": self.bayang, "panah": panah})

    # ==================================================================
    def b13_kenapamampat(self):
        alasan = tegak(rumus(r"f(2 \cdot 1) = f(2)", 30, AKSEN2))
        alasan.move_to([2.6, Y_KURVA, 2.1])

        with sinema.babak(self, "kenapamampat", DURASI) as b:
            self.ket("mesinnya sampai lebih awal, jadi grafiknya memampat")
            b.catat(0.6)
            b.main(Write(alasan), run_time=2.2)
            b.jeda(1.4)
            b.main(FadeOut(alasan), FadeOut(self.penanda), run_time=0.8)
        self.periksa({"bola": self.bola, "bayang": self.bayang})

    # ==================================================================
    def b14_tutup(self):
        """Satu-satunya babak yang boleh berupa layar teks, sesuai aturan 4."""
        luar = teks("Angka di LUAR kurung\nmengerjakan apa yang tertulis.", 30, AKSEN)
        dalam = teks("Angka yang masuk ke DALAM kurung\nmengerjakan kebalikannya.", 30, AKSEN2)
        dua = VGroup(luar, dalam).arrange(DOWN, buff=0.6)
        sinema.batasi_lebar(dua, 11.0)
        # Tanpa alas krem: keputusan ARYA 2 Sep sore, sama seperti keterangan
        # dan judul pembuka. Tulisan saja, seperti Trigonometri.
        dua.move_to([0, 0.1, 0])
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
