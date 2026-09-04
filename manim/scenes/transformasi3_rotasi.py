"""Video 03 Transformasi Geometri, Materi 06 "Memutar terhadap sebuah pusat".

TUGAS VIDEO INI
Menagih janji yang dibuat Materi 05: rotasi setengah putaran sama persis dengan
pencerminan pada sebuah titik. Karena itu babak "janji" dan "sama" adalah
puncaknya, bukan babak rumus. Rumusnya cuma cara menuliskan yang sudah dilihat.

TANPA 3D. Sudut dan jarak harus akurat, dan kamera miring merusak keduanya.

Letak kamera dari `transformasi_umum.letak_peta`, tidak dihitung ulang di sini.
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
TOPIK = "transformasi3-rotasi"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

# DUA KOTAK DUNIA, BUKAN SATU, DAN ITU BUKAN KERUMITAN YANG DICARI-CARI.
#
# Peta rotasi 90 derajat naik sampai y = 6, sedangkan peta rotasi 180 derajat
# turun sampai y = -3. Satu kotak yang menampung keduanya setinggi 11 satuan,
# dan pada tinggi itu bentuk L-nya menciut jadi 13 persen lebar layar: sumbu
# masih terbaca, tetapi koordinat sudutnya tidak. Karena kedua peta itu muncul
# BERGANTIAN, bukan bersamaan, kameranya boleh ikut berpindah dan tiap babak
# dapat 20 persen.
KOTAK_A = (-4.0, 7.0, -1.0, 7.0)   # jarum, prapeta, peta rotasi 90 derajat
KOTAK_B = (-7.0, 7.0, -4.0, 4.0)   # prapeta dan peta rotasi 180 derajat


def putar(p, derajat):
    """Rotasi terhadap titik asal, TEPAT di kelipatan 90 derajat.

    Nilai cos dan sin dijawab dari daftar, bukan dihitung. `Math.cos` pada 90
    derajat memberi 6,1e-17 dan bukan nol, dan debu sebesar itu muncul di
    koordinat sebagai 0,0000000000000001. Alasan yang sama dipakai modul
    widgetnya, `web/components/widget/transformasi-geometri/matriks.ts`.
    """
    sisa = int(derajat) % 360
    tabel = {0: (1, 0), 90: (0, 1), 180: (-1, 0), 270: (0, -1)}
    if sisa not in tabel:
        raise ValueError(f"video ini hanya memakai sudut kelipatan 90, bukan {derajat}")
    c, s = tabel[sisa]
    return (p[0] * c - p[1] * s, p[0] * s + p[1] * c)


class TransformasiRotasi(AdeganMatra):
    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)

        peta90 = [putar(p, 90) for p in L]
        peta180 = [putar(p, 180) for p in L]

        pusat_a, tinggi_a = letak_peta(*KOTAK_A)
        bidang = bidang_untuk(*KOTAK_A)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat_a, tinggi=tinggi_a)

        asal = np.array([0.0, 0.0, 0.03])

        # --- buka -------------------------------------------------------- #
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(3.0, DURASI["buka"] - 0.6)
            sinema.judul_pembuka(self, "Materi 06: Memutar terhadap sebuah pusat", lama=lama)
            b.catat(lama)

        # --- jarum: satu jarum jam di (4, 0) ----------------------------- #
        jarum = Arrow(asal, np.array([4.0, 0.0, 0.03]), buff=0, thickness=5).set_color(AKSEN)
        l_jarum = sinema.label("(4, 0)", warna=AKSEN)
        l_jarum.next_to(np.array([4.0, 0.0, 0.03]), DOWN, buff=0.24)

        with sinema.babak(self, "jarum", DURASI) as b:
            b.main(FadeIn(bidang), run_time=0.8)
            b.main(GrowArrow(jarum), FadeIn(l_jarum), run_time=1.2)
            ident = sinema.identitas(self, "1 petak = 1 satuan")
        qc.periksa_adegan(self, {"jarum": jarum, "label jarum": l_jarum, "identitas": ident},
                          dunia={"bidang": bidang})

        # --- jawab: jarumnya berputar seperempat putaran ------------------ #
        l_jawab = sinema.label("(0, 4)", warna=AKSEN)
        l_jawab.next_to(np.array([0.0, 4.0, 0.03]), RIGHT, buff=0.24)

        with sinema.babak(self, "jawab", DURASI) as b:
            b.main(
                Rotate(jarum, PI / 2, about_point=asal),
                FadeOut(l_jarum), FadeIn(l_jawab),
                run_time=1.8,
            )
        qc.periksa_adegan(self, {"jarum": jarum, "label jawab": l_jawab},
                          hud={"identitas": ident}, dunia={"bidang": bidang})

        # --- bentuk: bentuk L diputar 90 derajat -------------------------- #
        prapeta = poligon(L, TINTA, tebal=3.2, isian=0.08)
        nama_pra = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(huruf, warna=TINTA)
            t.next_to(titik3(L[i]), DOWN if i < 2 else UP, buff=0.22)
            nama_pra[huruf] = t

        peta_a = poligon(peta90, AKSEN2, tebal=3.2, isian=0.12)
        nama_a = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(f"{huruf}'", warna=AKSEN2)
            t.next_to(titik3(peta90[i]), LEFT if i < 2 else UP, buff=0.22)
            nama_a[huruf] = t

        with sinema.babak(self, "bentuk", DURASI) as b:
            b.main(
                FadeOut(jarum), FadeOut(l_jawab),
                ShowCreation(prapeta), *[FadeIn(nama_pra[h]) for h in nama_pra],
                run_time=1.6,
            )
            b.main(
                ShowCreation(peta_a), *[FadeIn(nama_a[h]) for h in nama_a],
                run_time=1.6,
            )
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_a},
                          hud={"identitas": ident}, dunia={"bidang": bidang})

        # --- jari: dua jarak ke pusat, dan keduanya SAMA ------------------ #
        # Dipakai titik B, sudut yang paling jauh dari pusat, sebab ruas
        # jari-jarinya paling panjang dan angkanya paling terbaca. Kesamaan
        # kedua angka inilah yang membedakan rotasi dari dilatasi di Materi 07.
        B = L[1]
        B_peta = peta90[1]
        jari_1 = Line(asal, titik3(B)).set_stroke(AKSEN, 3.0)
        jari_2 = Line(asal, titik3(B_peta)).set_stroke(AKSEN, 3.0)
        panjang_b = (B[0] ** 2 + B[1] ** 2) ** 0.5
        angka_1 = sinema.label(f"{panjang_b:.2f}".replace(".", ","), warna=AKSEN)
        angka_1.next_to(jari_1.get_center(), DOWN, buff=0.18)
        angka_2 = sinema.label(f"{panjang_b:.2f}".replace(".", ","), warna=AKSEN)
        angka_2.next_to(jari_2.get_center(), LEFT, buff=0.18)

        with sinema.babak(self, "jari", DURASI) as b:
            b.main(
                ShowCreation(jari_1), ShowCreation(jari_2),
                FadeIn(angka_1), FadeIn(angka_2),
                run_time=1.8,
            )
        qc.periksa_adegan(
            self,
            {"prapeta": prapeta, "peta": peta_a, "angka 1": angka_1, "angka 2": angka_2},
            [("angka 1", "angka 2")],
            hud={"identitas": ident}, dunia={"bidang": bidang},
        )

        # --- rumus -------------------------------------------------------- #
        with sinema.babak(self, "rumus", DURASI) as b:
            rum = sinema.lahir_rumus(
                self, r"(x,\ y) \to (-y,\ x)",
                dekat=peta_a, papan=papan, b=b, warna=AKSEN2,
            )
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_a},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang})

        # --- janji: setengah putaran ------------------------------------- #
        peta_b = poligon(peta180, SOROT, tebal=3.2, isian=0.12)
        nama_b = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(f"{huruf}''", warna=SOROT)
            t.next_to(titik3(peta180[i]), UP if i < 2 else DOWN, buff=0.22)
            nama_b[huruf] = t

        # Kamera pindah ke kotak kedua: peta setengah putaran turun ke bawah
        # sumbu X, daerah yang tidak dipakai sama sekali di babak sebelumnya.
        pusat_b, tinggi_b = letak_peta(*KOTAK_B)
        bidang_b = bidang_untuk(*KOTAK_B)

        with sinema.babak(self, "janji", DURASI) as b:
            b.main(
                FadeOut(jari_1), FadeOut(jari_2), FadeOut(angka_1), FadeOut(angka_2),
                FadeOut(peta_a), *[FadeOut(nama_a[h]) for h in nama_a],
                run_time=0.8,
            )
            b.main(
                kamera.dunia_ke_peta(frame, pusat=pusat_b, tinggi=tinggi_b),
                FadeOut(bidang), FadeIn(bidang_b),
                run_time=max(1.4, DURASI["janji"] - 4.2),
            )
            b.main(
                ShowCreation(peta_b), *[FadeIn(nama_b[h]) for h in nama_b],
                run_time=1.8,
            )
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_b},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_b})

        # --- sama: janji Materi 05 terbukti ------------------------------- #
        with sinema.babak(self, "sama", DURASI) as b:
            rum = sinema.ganti_rumus(
                self, rum, r"(x,\ y) \to (-x,\ -y)", b=b, warna=SOROT, papan=papan,
            )
            papan.baris(r"180^\circ = \text{cermin titik asal}", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_b},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_b})

        # --- sembarang dan tutup ------------------------------------------ #
        # Rumus sudut sembarang DITAMBAHKAN sebagai baris baru, TIDAK di-morph
        # dari rumus setengah putaran.
        #
        # Sebabnya dua, dan keduanya terlihat pada render 4 September 2026:
        #
        # 1. Morph itu memindahkan lambang yang sama dari tempat lama ke tempat
        #    baru. Antara "(x, y) -> (-x, -y)" dan rumus cos-sin nyaris tidak
        #    ada lambang yang sama, jadi yang terjadi bukan morph melainkan
        #    tumpukan: selama satu setengah detik panelnya berisi coretan
        #    bertindih yang tidak terbaca sebagai apa pun.
        # 2. Maknanya juga bukan penggantian. Rumus sudut sembarang MENCAKUP
        #    yang setengah putaran, bukan membatalkannya, dan panel yang
        #    menumpuk keduanya menyampaikan hubungan itu apa adanya.
        # BENTUKNYA BENAR-BENAR DIPUTAR 37 DERAJAT DI SINI.
        #
        # Versi pertama cuma menambahkan satu baris rumus ke panel lalu diam
        # 9,2 detik sampai video habis, terukur `alat/ukur_detik_pertama.py`.
        # Narasinya berbicara tentang "sudut yang bukan kelipatan sembilan
        # puluh", dan satu-satunya cara menunjukkan sudut semacam itu adalah
        # memutarnya. Rumus di panel menerangkan gerakan; ia tidak bisa
        # menggantikannya.
        #
        # Dipakai 37 derajat, bukan 45. Sudut 45 derajat terlihat seperti
        # setengah dari sudut siku-siku dan bisa dikira istimewa juga; 37
        # derajat jelas-jelas sembarang.
        sudut_bebas = 37.0
        peta_bebas = poligon(
            [(p[0] * np.cos(sudut_bebas * DEGREES) - p[1] * np.sin(sudut_bebas * DEGREES),
              p[0] * np.sin(sudut_bebas * DEGREES) + p[1] * np.cos(sudut_bebas * DEGREES))
             for p in L],
            AKSEN2, tebal=3.0, isian=0.12,
        )

        with sinema.babak(self, "sembarang", DURASI) as b:
            papan.baris(r"(x\cos a - y\sin a,\ x\sin a + y\cos a)", warna=AKSEN2, b=b)
            b.main(
                FadeOut(peta_b), *[FadeOut(nama_b[h]) for h in nama_b],
                run_time=0.7,
            )
            b.main(ShowCreation(peta_bebas), run_time=1.8)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_bebas},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_b})

        with sinema.babak(self, "tutup", DURASI) as b:
            papan.baris(r"a = 90^\circ:\ \cos a = 0,\ \sin a = 1", warna=AKSEN2, b=b)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_bebas},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_b})
