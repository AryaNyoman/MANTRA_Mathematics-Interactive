"""Video 04 Transformasi Geometri, Materi 07 "Memperbesar dan memperkecil".

TUGAS VIDEO INI
Menyampaikan satu angka yang paling sering ditulis salah: luas berubah k
KUADRAT kali, bukan k kali. Karena itu babak "luas" dan "pizza" adalah
puncaknya. Sisi AB dan luasnya ditampilkan berdampingan supaya bedanya
terlihat, bukan dihafal.

TANPA 3D. Panjang dan luas harus akurat.

DUA FASE KAMERA
Dilatasi faktor 2 melempar bentuknya sampai x = 12, sedangkan faktor setengah
dan faktor negatif memakai daerah yang sama sekali berbeda. Keduanya muncul
bergantian, jadi kameranya ikut berpindah.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
from transformasi_umum import (  # noqa: E402
    L, NAMA_SUDUT, bidang_untuk, letak_peta, poligon, titik3,
)

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "transformasi4-dilatasi"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

KOTAK_A = (0.0, 13.0, 0.0, 7.0)     # prapeta dan peta faktor 2
KOTAK_B = (-7.0, 7.0, -4.0, 4.0)    # peta faktor setengah dan faktor negatif


def dilat(p, k):
    return (k * p[0], k * p[1])


def luas(titik):
    """Luas poligon dengan rumus tali sepatu, tidak pernah negatif.

    Dihitung, tidak ditulis tangan. Angka luas di video ini diklaim di panel
    rumus dan diucapkan narator, dan angka yang ditulis tangan bisa berbeda
    dari bentuk yang benar-benar tergambar. Klaimnya juga diperiksa mesin
    lewat `alat/cek_transformasi.py` dengan awalan V04.
    """
    n = len(titik)
    jumlah = 0.0
    for i in range(n):
        x1, y1 = titik[i]
        x2, y2 = titik[(i + 1) % n]
        jumlah += x1 * y2 - x2 * y1
    return abs(jumlah) / 2


class TransformasiDilatasi(AdeganMatra):
    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)

        peta2 = [dilat(p, 2.0) for p in L]
        peta_kecil = [dilat(p, 0.5) for p in L]
        peta_negatif = [dilat(p, -1.0) for p in L]

        pusat_a, tinggi_a = letak_peta(*KOTAK_A)
        bidang = bidang_untuk(*KOTAK_A)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat_a, tinggi=tinggi_a)

        asal = np.array([0.0, 0.0, 0.03])

        # --- buka -------------------------------------------------------- #
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(3.0, DURASI["buka"] - 0.6)
            sinema.judul_pembuka(self, "Materi 07: Memperbesar dan memperkecil", lama=lama)
            b.catat(lama)

        # --- foto: bentuknya muncul, pusatnya ditandai -------------------- #
        prapeta = poligon(L, TINTA, tebal=3.2, isian=0.08)
        nama_pra = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(huruf, warna=TINTA)
            t.next_to(titik3(L[i]), DOWN if i < 2 else UP, buff=0.22)
            nama_pra[huruf] = t

        with sinema.babak(self, "foto", DURASI) as b:
            b.main(FadeIn(bidang), run_time=0.8)
            b.main(
                ShowCreation(prapeta), *[FadeIn(nama_pra[h]) for h in nama_pra],
                run_time=1.4,
            )
            ident = sinema.identitas(self, "1 petak = 1 satuan")
        qc.periksa_adegan(self, {"prapeta": prapeta, "identitas": ident},
                          dunia={"bidang": bidang})

        # --- pusat: titik yang tidak bergerak ---------------------------- #
        tanda_pusat = Dot(asal, radius=0.10).set_color(SOROT)
        l_pusat = sinema.label("pusat", warna=SOROT)
        l_pusat.next_to(asal, UP, buff=0.26)

        with sinema.babak(self, "pusat", DURASI) as b:
            b.main(FadeIn(tanda_pusat, scale=0.4), FadeIn(l_pusat), run_time=1.0)
            b.main(Indicate(tanda_pusat, color=SOROT), run_time=0.8)
        qc.periksa_adegan(self, {"prapeta": prapeta, "label pusat": l_pusat},
                          hud={"identitas": ident}, dunia={"bidang": bidang})

        # --- sinar: garis dari pusat melewati tiap sudut ------------------ #
        # Ditarik SAMPAI titik peta, bukan berhenti di prapeta. Kalau berhenti,
        # siswa cuma melihat enam ruas lepas; kalau diteruskan, ia melihat
        # keenam titik memang meluncur di garis yang sama. Itu gagasan pokok
        # dilatasi, dan gambarnya yang harus menyampaikannya.
        sinar = VGroup(*[
            Line(asal, titik3(peta2[i])).set_stroke(REDUP, 1.6)
            for i in range(len(L))
        ])

        with sinema.babak(self, "sinar", DURASI) as b:
            b.main(*[ShowCreation(s) for s in sinar], run_time=1.8)
        qc.periksa_adegan(self, {"prapeta": prapeta},
                          hud={"identitas": ident},
                          dunia={"bidang": bidang, "sinar": sinar})

        # --- meluncur: tiap titik berjalan di garisnya sendiri ------------ #
        titik_jalan = [Dot(titik3(p), radius=0.07).set_color(AKSEN2) for p in L]
        for d in titik_jalan:
            self.add(d)

        with sinema.babak(self, "meluncur", DURASI) as b:
            b.main(
                *[d.animate.move_to(titik3(peta2[i])) for i, d in enumerate(titik_jalan)],
                run_time=max(2.0, DURASI["meluncur"] - 2.6),
            )
        qc.periksa_adegan(self, {"prapeta": prapeta},
                          hud={"identitas": ident},
                          dunia={"bidang": bidang, "sinar": sinar})

        # --- dua: petanya utuh, sisi AB diukur ---------------------------- #
        peta_besar = poligon(peta2, AKSEN2, tebal=3.2, isian=0.12)
        nama_besar = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(f"{huruf}'", warna=AKSEN2)
            t.next_to(titik3(peta2[i]), DOWN if i < 2 else UP, buff=0.22)
            nama_besar[huruf] = t

        with sinema.babak(self, "dua", DURASI) as b:
            b.main(
                ShowCreation(peta_besar), *[FadeIn(nama_besar[h]) for h in nama_besar],
                run_time=1.6,
            )
            rum = sinema.lahir_rumus(
                self, r"(x,\ y) \to (kx,\ ky)",
                dekat=peta_besar, papan=papan, b=b, warna=AKSEN2,
            )
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_besar},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang, "sinar": sinar})

        # --- luas: angka yang paling sering ditulis salah ----------------- #
        luas_pra = luas(L)
        luas_peta = luas(peta2)

        with sinema.babak(self, "luas", DURASI) as b:
            papan.baris(
                rf"AB:\ 5 \to 10\ \ (2\times)", warna=AKSEN2, b=b,
            )
            papan.baris(
                rf"\text{{luas}}:\ {luas_pra:.0f} \to {luas_peta:.0f}\ \ (4\times)",
                warna=SOROT, b=b,
            )
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_besar},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang, "sinar": sinar})

        with sinema.babak(self, "pizza", DURASI) as b:
            papan.baris(r"4 = 2^2,\ \text{bukan } 2", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_besar},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang, "sinar": sinar})

        # --- kecil: faktor setengah, kamera berpindah --------------------- #
        pusat_b, tinggi_b = letak_peta(*KOTAK_B)
        bidang_b = bidang_untuk(*KOTAK_B)
        peta_setengah = poligon(peta_kecil, AKSEN2, tebal=3.0, isian=0.12)
        sinar_b = VGroup(*[
            Line(asal, titik3(peta_negatif[i])).set_stroke(REDUP, 1.6)
            for i in range(len(L))
        ])

        with sinema.babak(self, "kecil", DURASI) as b:
            b.main(
                FadeOut(peta_besar), *[FadeOut(nama_besar[h]) for h in nama_besar],
                *[FadeOut(d) for d in titik_jalan],
                FadeOut(sinar),
                run_time=0.8,
            )
            b.main(
                kamera.dunia_ke_peta(frame, pusat=pusat_b, tinggi=tinggi_b),
                FadeOut(bidang), FadeIn(bidang_b),
                run_time=max(1.4, DURASI["kecil"] - 3.6),
            )
            b.main(ShowCreation(peta_setengah), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta kecil": peta_setengah},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_b})

        # --- tutup: faktor negatif menyeberangi pusatnya ------------------ #
        peta_seberang = poligon(peta_negatif, SOROT, tebal=3.0, isian=0.12)

        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(peta_setengah), run_time=0.6)
            b.main(
                ShowCreation(sinar_b), ShowCreation(peta_seberang),
                run_time=1.8,
            )
            papan.baris(r"k < 0:\ \text{menyeberangi pusat}", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta seberang": peta_seberang},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_b, "sinar": sinar_b})
