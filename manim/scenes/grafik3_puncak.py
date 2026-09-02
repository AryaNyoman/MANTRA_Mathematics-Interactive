"""Grafik Fungsi Tahap 03, Parabola dan bentuk puncak. ManimGL, 2 Sep 2026.

DUA DIMENSI PENUH. Tidak ada kamera terbang, tidak ada permukaan 3D, tidak ada
benda yang bergerak tanpa alasan. Keputusan ARYA: "gunakan 3 dimensi jika
memang dibutuhkan, bukan dipaksakan".

BENDA NYATANYA MENGGAMBAR KURVANYA SENDIRI
Bola basket dilempar SEKALI, dan lintasannya yang tertinggal itulah kurvanya.
Jadi kurva di video ini tidak pernah muncul begitu saja, dan tidak perlu
dihitung dulu seperti di tahap 6: di sini yang menggambarnya adalah benda
nyata, dan itu bukti yang lebih kuat daripada tabel angka.

SATU CONTOH SEPANJANG PARUH PERTAMA
`y = -(x - 1)^2 + 4`, dipilih karena semua nilainya bulat: puncak (1, 4),
pasangan setangkup (0, 3) dan (2, 3), lalu (-1, 0) dan (3, 0). Semua angka
diperiksa sympy sebelum naskahnya ditulis.

YANG SENGAJA TIDAK DIBAHAS DI SINI
Soal "tanda minus di dalam kurung menggeser ke KANAN". Video tahap 6 sudah
membahasnya panjang lengkap dengan tebakan dan alasannya. Mengulangnya di sini
memakan tiga puluh detik untuk pelajaran yang sama. Tahap 3 fokus ke yang khas
miliknya: kenapa puncaknya bisa dibaca langsung, kesetangkupannya, dan peran a.

JANGKAUAN GAMBAR DIPILIH SUPAYA SEMUA MUAT
Tiap bentuk punya jangkauan x sendiri, dihitung supaya kurvanya berhenti
sebelum tepi atas dan tidak turun ke pita subtitle:
  a = 1   di x -1..3        z 1..5
  a = 3   di x -0,15..2,15  z 1..5
  a = 0,3 di x -2,6..4,6    z 1..4,9
  a = -1  di x 0..2         z 1..0
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import grafik, kamera, qc, sinema  # noqa: E402
from gl import ilustrasi  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "grafik3-puncak"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
JAM = grafik.jam_subtitle(TOPIK)

Y = -1.72               # lapisan tempat semua benda tinggal
SUDUT = grafik.sudut_datar(pusat_z=2.35, tinggi=9.6)

# Paruh pertama: lemparan bolanya sendiri. Semua nilainya bulat.
H, K = 1.0, 4.0
LEMPAR_DARI, LEMPAR_SAMPAI = -1.0, 3.0


def f_lempar(x):
    return -(x - H) ** 2 + K


# Nilai yang dihitung di layar untuk memperlihatkan kesetangkupan.
# Berpasangan kiri-kanan, jaraknya dari x = 1 sama persis.
PASANGAN = [(0, 3), (2, 3), (-1, 0), (3, 0)]

# Paruh kedua: puncak DIKUNCI di (1, 1), hanya a yang berubah.
PUNCAK2 = (1.0, 1.0)
PERAN = {
    "peran": dict(a=1.0, dari=-1.0, sampai=3.0, rumus=r"y = (x - 1)^{2} + 1"),
    "sempit": dict(a=3.0, dari=-0.15, sampai=2.15, rumus=r"y = 3(x - 1)^{2} + 1"),
    "lebar": dict(a=0.3, dari=-2.6, sampai=4.6, rumus=r"y = 0{,}3(x - 1)^{2} + 1"),
    # Sengaja melewati sumbu x sedikit. Berhenti tepat di z = 0 membuat
    # busurnya kelewat kecil dan terbaca seperti parabola yang MENGECIL, bukan
    # yang BERBALIK. Pada -0,4 sampai 2,4 titik terendahnya z = -0,96, di layar
    # sekitar piksel 424. Angka -0,4 dicoba lebih dulu dan ternyata turun
    # sampai piksel 434, cuma 14 piksel dari pita subtitle; diukur, bukan
    # dikira.
    "minus": dict(a=-1.0, dari=-0.3, sampai=2.3, rumus=r"y = -(x - 1)^{2} + 1"),
}


def f_peran(a):
    def f(x):
        return a * (x - PUNCAK2[0]) ** 2 + PUNCAK2[1]
    return f


class BentukPuncak(AdeganMatra):

    # ==================================================================
    def construct(self):
        self.frame_ = self.frame
        self.pnl = None
        self.ikutan = []

        self.b01_sapa()
        self.b02_lempar()
        self.b03_datar()
        self.b04_kenapa()
        self.b05_puncak()
        self.b06_simetri()
        self.b07_sumbusimetri()
        self.b08_peran()
        self.b09_sempit()
        self.b10_lebar()
        self.b11_minus()
        self.b12_tutup()

    # ------------------------------------------------------------------
    def redup(self):
        """Benda yang boleh diredupkan saat rumus besar tampil di tengah."""
        return [getattr(self, n, None) for n in ("sumbu", "kurva", "titik")]

    def periksa(self, tambahan=None, pasangan=None):
        zona = {"panel": self.pnl,
                "sumbu": getattr(self, "sumbu", None),
                "kurva": getattr(self, "kurva", None)}
        zona.update(tambahan or {})
        zona = {k: v for k, v in zona.items() if v is not None}
        qc.periksa_adegan(self, zona, pasangan or [])

    def ganti_kurva(self, b, f, dari, sampai, rumus_baru, warna=None, ikut=None,
                    lama=1.6, bayang=False):
        """Ganti bentuk kurvanya, rumusnya berganti PADA SAAT YANG SAMA.

        Rumus yang berganti setelah gambarnya sempat membuat panel menyebut
        bentuk lama selama satu setengah detik. Tulisan yang membantah
        gambarnya lebih merusak daripada layar kosong.
        """
        lepas = list(ikut or [])
        if bayang:
            # Bentuk SEBELUMNYA ditinggal sebagai bayangan abu. Tanpa
            # pembanding, "lebih sempit" dan "lebih landai" cuma klaim narator;
            # dengan bayangan, penonton mengukurnya sendiri. Ini juga yang
            # menyelamatkan babak a negatif: kurvanya kecil karena harus
            # berhenti sebelum pita subtitle, dan tanpa bayangan ia terbaca
            # seperti parabola yang MENGECIL, bukan yang BERBALIK.
            lama_bayang = getattr(self, "bayang", None)
            if lama_bayang is not None:
                lepas.append(FadeOut(lama_bayang))
            self.bayang = grafik.bayangan(*self.kini, Y)
            self.add(self.bayang)

        baru = grafik.kurva(f, dari, sampai, Y)
        self.kini = (f, dari, sampai)
        grafik.rumus_terbang(
            self, b, [r"y = a(x - h)^{2} + k", rumus_baru], warna,
            bareng=[Transform(self.kurva, baru)] + lepas,
            redup=self.redup(), terbang=lama,
        )

    # ==================================================================
    def b01_sapa(self):
        """Judul saja di layar bersih, mengisi seluruh segmen. Pola Trigonometri."""
        kamera.pasang_awal(self.frame_, **SUDUT)
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Parabola dan bentuk puncak",
                                 lama=DURASI["sapa"])
            b.catat(DURASI["sapa"])

    # ==================================================================
    def b02_lempar(self):
        """Bola dilempar SEKALI, dan lintasannya yang tertinggal jadi kurvanya.

        Bolanya tidak mengayun bolak-balik. ARYA menilai gerakan terus-menerus
        mencuri perhatian dari yang sedang dijelaskan, dan di sini gerakannya
        memang cuma punya satu tugas: menggambar lintasannya.

        Kurvanya digambar BERSAMAAN dengan bolanya lewat `ShowCreation` yang
        run_time-nya sama, jadi garisnya tertinggal persis di belakang bola,
        bukan muncul sendiri.
        """
        self.kurva = grafik.kurva(f_lempar, LEMPAR_DARI, LEMPAR_SAMPAI, Y)
        self.kini = (f_lempar, LEMPAR_DARI, LEMPAR_SAMPAI)
        self.bola = ilustrasi.bola(0.22, AKSEN)
        self.jalan = ValueTracker(0.0)

        def terbang(m):
            t = self.jalan.get_value()
            x = LEMPAR_DARI + t * (LEMPAR_SAMPAI - LEMPAR_DARI)
            m.move_to([x, Y, f_lempar(x) + 0.22])

        terbang(self.bola)
        self.bola.add_updater(terbang)

        with sinema.babak(self, "lempar", DURASI) as b:
            b.main(FadeIn(self.bola), run_time=0.6)
            b.main(self.jalan.animate.set_value(1.0),
                   ShowCreation(self.kurva), run_time=5.0)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"kurva": self.kurva, "bola": self.bola})

    # ==================================================================
    def b03_datar(self):
        """Sumbunya datang mengelilingi lintasan yang sudah ada, bolanya pamit."""
        self.sumbu = grafik.sumbu_dua()
        self.bola.clear_updaters()

        with sinema.babak(self, "datar", DURASI) as b:
            b.main(FadeIn(self.sumbu), FadeOut(self.bola), run_time=1.4)
            grafik.tunggu_sampai(self, b, grafik.mulai(JAM, "Dan rumusnya kita tulis"), 1.0)
            grafik.rumus_terbang(self, b, [r"y = a(x - h)^{2} + k"],
                                 redup=self.redup())
        self.periksa()

    # ==================================================================
    def b04_kenapa(self):
        """Alasan namanya bentuk puncak, ditulis sebagai baris kedua panel.

        Ini gagasan pokok seluruh video: kuadrat tidak pernah negatif, jadi
        bagian berkurung itu paling kecil saat isinya nol, dan itu hanya
        terjadi di satu titik.
        """
        with sinema.babak(self, "kenapa", DURASI) as b:
            grafik.tunggu_sampai(self, b, grafik.mulai(JAM, "Perhatikan bagian"), 1.2)
            grafik.rumus_terbang(
                self, b, [r"y = a(x - h)^{2} + k", r"(x - h)^{2} \geq 0"],
                SOROT, redup=self.redup(),
            )
        self.periksa()

    # ==================================================================
    def b05_puncak(self):
        """h dan k diisi angka lemparannya, lalu puncaknya ditandai."""
        self.titik = Group(grafik.titik([H, Y, K], SOROT, 0.13))
        lbl = grafik.label("$(1, 4)$", (H + 0.62, K + 0.34), SOROT, 26, Y)

        with sinema.babak(self, "puncak", DURASI) as b:
            grafik.tunggu_sampai(self, b, grafik.mulai(JAM, "Lemparan tadi rumusnya"), 0.6)
            grafik.rumus_terbang(
                self, b, [r"y = a(x - h)^{2} + k", r"y = -(x - 1)^{2} + 4"],
                AKSEN, redup=self.redup(),
            )
            grafik.tunggu_sampai(self, b, grafik.mulai(JAM, "Puncaknya"), 0.8)
            b.main(FadeIn(self.titik[0]), FadeIn(lbl), run_time=0.9)
            b.jeda(1.0)
            b.main(FadeOut(lbl), run_time=0.5)
        self.periksa({"titik": self.titik})

    # ==================================================================
    def b06_simetri(self):
        """Empat nilai, diplot TEPAT saat angkanya disebut.

        Waktunya diikat ke jam subtitle, bukan disusun dari run_time. Di tahap
        6 susunan sendiri membuat titik mendarat dua detik sebelum narator
        menyebut angkanya, dan ARYA yang menemukannya.
        """
        baru = Group(*[grafik.titik([x, Y, y], SOROT, 0.13) for x, y in PASANGAN])
        hitung = VGroup(*[rumus(r"f(%d) = %d" % (x, y), 28) for x, y in PASANGAN])
        hitung.arrange(DOWN, buff=0.32, aligned_edge=LEFT)
        sinema.batasi_lebar(hitung, 3.4)
        hitung.to_corner(UR, buff=0.45)

        with sinema.babak(self, "simetri", DURASI) as b:
            self.hud_tambah(hitung)
            for baris in hitung:
                baris.set_opacity(0)
            for (x, _), baris, tt in zip(PASANGAN, hitung, baru):
                grafik.tunggu_sampai(self, b, grafik.mulai(JAM, "x = %d memberi" % x), 1.6)
                b.main(baris.animate.set_opacity(1), FadeIn(tt), run_time=0.9)
            grafik.tunggu_sampai(self, b, grafik.mulai(JAM, "Yang sama jauhnya"), 1.0)
            b.jeda(1.2)
            b.main(FadeOut(hitung), run_time=0.7)
        for tt in baru:
            self.titik.add(tt)
        self.periksa({"titik": self.titik})

    # ==================================================================
    def b07_sumbusimetri(self):
        """Garis tegak lewat puncak, dengan label dua kata."""
        garis = DashedLine([H, Y, -0.2], [H, Y, K + 0.5])
        garis.set_stroke(AKSEN2, width=3)
        lbl = grafik.label("sumbu simetri", (H + 1.55, K + 0.45), AKSEN2, 26, Y)

        with sinema.babak(self, "sumbusimetri", DURASI) as b:
            grafik.tunggu_sampai(self, b, grafik.mulai(JAM, "Garis tegak"), 1.0)
            b.main(ShowCreation(garis), run_time=1.2)
            b.main(FadeIn(lbl), run_time=0.6)
        # TIDAK dibuang di sini. Babak ini 14,4 detik sedangkan animasinya cuma
        # 1,8 detik; kalau garisnya dipadamkan lebih dulu, penonton melihat
        # sumbu simetri selama tiga detik lalu empat detik layar beku, padahal
        # narator masih menjelaskan benda itu. Ia dibawa sampai babak
        # berikutnya, tempat fungsinya memang berganti.
        self.simetri = Group(garis, lbl)
        self.periksa({"simetri": self.simetri})

    # ==================================================================
    def b08_peran(self):
        """Puncak dikunci di (1, 1). Titik lama dilepas karena nilainya tidak
        berlaku lagi untuk fungsi yang baru."""
        d = PERAN["peran"]
        with sinema.babak(self, "peran", DURASI) as b:
            grafik.tunggu_sampai(self, b, grafik.mulai(JAM, "Supaya jelas"), 1.0)
            self.ganti_kurva(b, f_peran(d["a"]), d["dari"], d["sampai"],
                             d["rumus"], AKSEN2,
                             ikut=[FadeOut(self.titik), FadeOut(self.simetri)],
                             lama=1.8)
        self.titik = Group(grafik.titik([PUNCAK2[0], Y, PUNCAK2[1]], SOROT, 0.13))
        self.add(self.titik)
        self.periksa({"titik": self.titik})

    # ==================================================================
    def satu_peran(self, nama, awalan):
        d = PERAN[nama]
        with sinema.babak(self, nama, DURASI) as b:
            grafik.tunggu_sampai(self, b, grafik.mulai(JAM, awalan), 1.0)
            self.ganti_kurva(b, f_peran(d["a"]), d["dari"], d["sampai"],
                             d["rumus"], AKSEN2, lama=1.8, bayang=True)
            b.jeda(1.2)
        self.periksa({"titik": self.titik})

    def b09_sempit(self):
        self.satu_peran("sempit", "Kita besarkan a")

    def b10_lebar(self):
        self.satu_peran("lebar", "Sekarang kita kecilkan a")

    def b11_minus(self):
        self.satu_peran("minus", "Terakhir, a dibuat negatif")

    # ==================================================================
    def b12_tutup(self):
        """Satu-satunya babak berlayar teks, sesuai aturan 4."""
        baris = VGroup(
            teks("h dan k memberi letak puncaknya.", 30, SOROT),
            teks("Tanda a memberi arah bukaannya.", 30, AKSEN),
            teks("Besar a memberi lebar sempitnya.", 30, AKSEN2),
        ).arrange(DOWN, buff=0.55)
        sinema.batasi_lebar(baris, 11.0)
        baris.move_to([0, 0.1, 0])
        baris.fix_in_frame()

        with sinema.babak(self, "tutup", DURASI) as b:
            pergi = [FadeOut(self.kurva), FadeOut(self.sumbu),
                     FadeOut(self.titik), FadeOut(self.pnl)]
            if getattr(self, "bayang", None) is not None:
                pergi.append(FadeOut(self.bayang))
            b.main(*pergi, run_time=1.2)
            self.pnl = None
            b.main(FadeIn(baris, shift=UP * 0.2), run_time=1.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"tiga baris": baris})
