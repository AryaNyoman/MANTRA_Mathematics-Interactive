"""Grafik Fungsi Tahap 03, Parabola dan bentuk puncak. ManimGL, 3 Sep 2026.

Disesuaikan ke STANDAR-ILUSTRASI-VIDEO versi 2: panel rumus di KANAN atas,
rumus lahir dekat bendanya lalu terbang ke panel, rumus berubah dengan MORPH
lambang per lambang, kaki layar dikunci kosong untuk subtitle, dan waktu
animasi diikat ke jam kalimat subtitle.

BIDANG DATAR PENUH, TANPA 3D
Aturan 2 versi 2 memberi jatah pembuka 3D untuk video PERTAMA tiap topik. Di
topik ini jatah itu dipakai tahap 6 (pembuka lembah, sudah disetujui ARYA dan
dicatat sebagai pengecualian, 3 Sep). Jadi di sini kameranya tegak lurus sejak
detik pertama dan tidak pernah miring.

BENDA NYATANYA MENGGAMBAR KURVANYA SENDIRI
Bola basket dilempar SEKALI dan lintasannya yang tertinggal itulah kurvanya.
Jadi kurvanya tidak pernah muncul begitu saja, dan tidak perlu tabel angka
seperti tahap 6: yang menggambarnya benda nyata, dan itu bukti yang lebih kuat.

SATU CONTOH SEPANJANG PARUH PERTAMA
`y = -(x - 1)^2 + 4`, dipilih karena semua nilainya bulat: puncak (1, 4),
pasangan setangkup (0, 3) dan (2, 3), lalu (-1, 0) dan (3, 0). Diperiksa sympy
sebelum naskahnya ditulis.

YANG SENGAJA TIDAK DIBAHAS
Soal "tanda minus di dalam kurung menggeser ke KANAN". Tahap 6 sudah
membahasnya panjang lengkap dengan tebakan dan alasannya; mengulangnya memakan
tiga puluh detik untuk pelajaran yang sama.

JANGKAUAN GAMBAR (dari dua pertidaksamaan di grafik_umum.py, bukan kira-kira)
  tidak boleh x > 3,22 DAN z > 3,67   (zona panel kanan atas)
  tidak boleh z < -0,71               (kaki layar milik subtitle)
  lempar   x -1..3        z 0..4
  a = 1    x -1..3        z 1..5
  a = 3    x -0,15..2,15  z 1..5
  a = 0,3  x -1,4..3,4    z 1..2,73   (dipendekkan dua kali: pada 4,6 ujungnya
                                       masuk zona panel di z = 4,89, pada 3,6
                                       masih 3,03 sedangkan batasnya 3,17)
  a = -1   x -0,25..2,25  z 1..-0,56
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
import grafik_umum as gu  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "grafik3-puncak"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
JAM = sinema.jam_subtitle(TOPIK)

SUDUT = gu.sudut_datar()
Y = gu.Y

H, K = 1.0, 4.0
LEMPAR_DARI, LEMPAR_SAMPAI = -1.0, 3.0


def f_lempar(x):
    return -(x - H) ** 2 + K


PASANGAN = [(0, 3), (2, 3), (-1, 0), (3, 0)]

PUNCAK2 = (1.0, 1.0)
PERAN = {
    "peran": dict(a=1.0, dari=-1.0, sampai=3.0, isi=r"y = (x - 1)^{2} + 1"),
    "sempit": dict(a=3.0, dari=-0.15, sampai=2.15, isi=r"y = 3(x - 1)^{2} + 1"),
    "lebar": dict(a=0.3, dari=-1.4, sampai=3.4, isi=r"y = 0{,}3(x - 1)^{2} + 1"),
    "minus": dict(a=-1.0, dari=-0.25, sampai=2.25, isi=r"y = -(x - 1)^{2} + 1"),
}


def f_peran(a):
    def f(x):
        return a * (x - PUNCAK2[0]) ** 2 + PUNCAK2[1]
    return f


class BentukPuncak(AdeganMatra):

    # ==================================================================
    def construct(self):
        self.frame_ = self.frame
        self.papan = sinema.PapanRumus(self)
        self.bayang = None

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
    def periksa(self, tambahan=None, pasangan=None):
        zona = {"sumbu": getattr(self, "sumbu", None),
                "kurva": getattr(self, "kurva", None),
                "panel": self.papan.semua()}
        zona.update(tambahan or {})
        zona = {k: v for k, v in zona.items() if v is not None}
        qc.periksa_adegan(self, zona, pasangan or [])

    def ganti(self, b, nama, ikut=None, bayang=False):
        """Ganti bentuk kurvanya dan rumusnya BERSAMAAN."""
        d = PERAN[nama]
        lepas = list(ikut or [])
        if bayang:
            if self.bayang is not None:
                lepas.append(FadeOut(self.bayang))
            self.bayang = gu.bayangan(*self.kini)
            self.add(self.bayang)
        f = f_peran(d["a"])
        baru = gu.kurva(f, d["dari"], d["sampai"])
        self.kini = (f, d["dari"], d["sampai"])
        gu.ganti_bersama(self, b, self.papan, d["isi"],
                         ikut=[Transform(self.kurva, baru)] + lepas,
                         run_time=1.8)

    # ==================================================================
    def b01_sapa(self):
        """Judul saja di layar bersih, mengisi seluruh segmen."""
        kamera.pasang_awal(self.frame_, **SUDUT)
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Parabola dan bentuk puncak",
                                 lama=DURASI["sapa"])
            b.catat(DURASI["sapa"])

    # ==================================================================
    def b02_lempar(self):
        """Bola dilempar SEKALI, lintasannya yang tertinggal jadi kurvanya.

        Bolanya tidak mengayun bolak-balik. Gerakan tanpa makna yang mencuri
        perhatian dilarang aturan 3; di sini gerakannya punya satu tugas, yaitu
        menggambar lintasannya.
        """
        self.kurva = gu.kurva(f_lempar, LEMPAR_DARI, LEMPAR_SAMPAI)
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
        """Sumbunya datang mengelilingi lintasan yang sudah ada, bolanya pamit.

        Rumus umumnya LAHIR di dekat kurvanya, tempat mata sedang menatap, lalu
        terbang ke panel kanan atas. Rumus yang langsung terbit di pojok tidak
        pernah terlihat karena mata sedang di tengah layar.
        """
        self.sumbu = gu.sumbu_dua()
        self.bola.clear_updaters()

        with sinema.babak(self, "datar", DURASI) as b:
            b.main(FadeIn(self.sumbu), FadeOut(self.bola), run_time=1.4)
            b.tunggu_sampai(sinema.mulai(JAM, "Dan rumusnya kita tulis"), 1.0)
            sinema.lahir_rumus(self, r"y = a(x - h)^{2} + k",
                               dekat=self.kurva, papan=self.papan, b=b)
        self.periksa()

    # ==================================================================
    def b04_kenapa(self):
        """Gagasan pokok video: kuadrat tidak pernah negatif.

        Ditulis sebagai TEMUAN yang ditumpuk di bawah rumus utama, bukan
        mengganti rumus utamanya: ia alasan, bukan rumus baru.
        """
        with sinema.babak(self, "kenapa", DURASI) as b:
            b.tunggu_sampai(sinema.mulai(JAM, "Perhatikan bagian"), 1.2)
            self.papan.baris(r"(x - h)^{2} \geq 0", SOROT)
            b.catat(0.8)
            b.tunggu_sampai(sinema.mulai(JAM, "Jadi nilai terkecilnya"), 1.0)
            self.papan.baris(r"= 0 \iff x = h", SOROT)
            b.catat(0.8)
        self.periksa()

    # ==================================================================
    def b05_puncak(self):
        """h dan k diisi angka lemparannya, lalu puncaknya ditandai."""
        self.titik = Group(gu.titik([H, Y, K], SOROT, 0.13))
        lbl = gu.tegak(sinema.label("$(1, 4)$", 26, SOROT))
        lbl.move_to([H + 0.75, Y, K + 0.40])

        with sinema.babak(self, "puncak", DURASI) as b:
            b.tunggu_sampai(sinema.mulai(JAM, "Lemparan tadi rumusnya"), 0.6)
            gu.bersihkan_baris(self, b, self.papan)
            gu.ganti_bersama(self, b, self.papan, r"y = -(x - 1)^{2} + 4",
                             run_time=1.4)
            b.tunggu_sampai(sinema.mulai(JAM, "Puncaknya"), 0.8)
            b.main(FadeIn(self.titik[0]), FadeIn(lbl), run_time=0.9)
            b.jeda(1.0)
            b.main(FadeOut(lbl), run_time=0.5)
        self.periksa({"titik": self.titik})

    # ==================================================================
    def b06_simetri(self):
        """Empat nilai, diplot TEPAT saat angkanya disebut.

        Waktunya diikat ke jam subtitle. Waktu yang disusun sendiri dari
        run_time membuat titik mendarat dua detik sebelum narator menyebut
        angkanya, dan ARYA yang menemukannya di tahap 6.
        """
        baru = Group(*[gu.titik([x, Y, y], SOROT, 0.13) for x, y in PASANGAN])

        with sinema.babak(self, "simetri", DURASI) as b:
            for (x, y), tt in zip(PASANGAN, baru):
                b.tunggu_sampai(sinema.mulai(JAM, "x = %d memberi" % x), 1.6)
                b.main(FadeIn(tt), run_time=0.6)
                self.papan.baris(r"f(%d) = %d" % (x, y))
                b.catat(0.8)
            b.tunggu_sampai(sinema.mulai(JAM, "Yang sama jauhnya"), 1.0)
        for tt in baru:
            self.titik.add(tt)
        self.periksa({"titik": self.titik})

    # ==================================================================
    def b07_sumbusimetri(self):
        """Garis tegak lewat puncak, label dua kata.

        TIDAK dipadamkan di babaknya sendiri: babak ini 14 detik sedangkan
        animasinya cuma 2 detik, dan narator masih membicarakan bendanya sampai
        akhir. Ia dibawa ke babak berikutnya, tempat fungsinya memang berganti.
        """
        garis = DashedLine([H, Y, -0.2], [H, Y, K + 0.5])
        garis.set_stroke(AKSEN2, width=3)
        lbl = gu.tegak(sinema.label("sumbu simetri", 26, AKSEN2))
        lbl.move_to([H + 1.55, Y, K + 0.5])

        with sinema.babak(self, "sumbusimetri", DURASI) as b:
            b.tunggu_sampai(sinema.mulai(JAM, "Garis tegak"), 1.0)
            b.main(ShowCreation(garis), run_time=1.2)
            b.main(FadeIn(lbl), run_time=0.6)
        self.simetri = Group(garis, lbl)
        self.periksa({"simetri": self.simetri})

    # ==================================================================
    def b08_peran(self):
        """Puncak dikunci di (1, 1). Titik lama dilepas, nilainya tidak berlaku."""
        with sinema.babak(self, "peran", DURASI) as b:
            b.tunggu_sampai(sinema.mulai(JAM, "Supaya jelas"), 1.0)
            gu.bersihkan_baris(self, b, self.papan)
            self.ganti(b, "peran",
                       ikut=[FadeOut(self.titik), FadeOut(self.simetri)])
        self.titik = Group(gu.titik([PUNCAK2[0], Y, PUNCAK2[1]], SOROT, 0.13))
        self.add(self.titik)
        self.periksa({"titik": self.titik})

    # ==================================================================
    def satu_peran(self, nama, awalan):
        with sinema.babak(self, nama, DURASI) as b:
            b.tunggu_sampai(sinema.mulai(JAM, awalan), 1.0)
            self.ganti(b, nama, bayang=True)
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
        """Satu-satunya babak berlayar teks."""
        baris = VGroup(
            teks("h dan k memberi letak puncaknya.", 30, SOROT),
            teks("Tanda a memberi arah bukaannya.", 30, AKSEN),
            teks("Besar a memberi lebar sempitnya.", 30, AKSEN2),
        ).arrange(DOWN, buff=0.55)
        sinema.batasi_lebar(baris, 11.0)
        baris.move_to([0, 0.3, 0])
        baris.fix_in_frame()

        with sinema.babak(self, "tutup", DURASI) as b:
            pergi = [FadeOut(self.kurva), FadeOut(self.sumbu),
                     FadeOut(self.titik)]
            isi_panel = self.papan.semua()
            if isi_panel is not None:
                pergi.append(FadeOut(isi_panel))
            if self.bayang is not None:
                pergi.append(FadeOut(self.bayang))
            b.main(*pergi, run_time=1.2)
            self.papan.utama, self.papan.baris_lain = None, []
            b.main(FadeIn(baris, shift=UP * 0.2), run_time=1.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"tiga baris": baris})
