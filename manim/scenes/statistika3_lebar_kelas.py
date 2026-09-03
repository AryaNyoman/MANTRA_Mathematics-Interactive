"""Materi 03 Statistika: lebar kelas mengubah cerita (ManimGL).

Naskah: manim/narasi/statistika3-lebar-kelas.json (10 segmen, 113,9 detik)

GAGASAN POKOK. Halaman punya penggeser lebar kelas, jadi siswa bisa mencobanya
sendiri. Yang tidak bisa dilakukan halaman: memperlihatkan PERISTIWA
pengelompokan ulang, yaitu empat puluh titik yang sama persis jatuh ke kotak
yang berbeda-beda dan melahirkan tiga histogram yang bentuknya berlainan.
Titiknya tidak pernah dibuat ulang di video ini: titik yang sama dipindahkan,
supaya jelas datanya memang tidak berubah sedikit pun.

Data `t03-tinggi` (dinyatakan buatan), 40 tinggi badan 152 sampai 180 cm.
Kelasnya dijangkarkan di 150 supaya cocok dengan halaman:
    lebar  5 -> 7 batang: 1, 5, 11, 11, 7, 4, 1
    lebar  2 -> 15 batang bergerigi
    lebar 10 -> 4 batang: 6, 22, 11, 1

Bagian kedua, aturan luas, memakai angka buku panduan guru:
    kelas 8-10 tinggi 12 dan kelas 10-12 tinggi 4, digabung jadi 8-12.
    luasnya 24 + 8 = 32, lebarnya 4, jadi tingginya 8, BUKAN 16.

TATA LETAK (standar video versi 2):
    kiri atas  identitas benda, menetap
    kanan atas papan rumus, berubah lewat morph
    kaki layar milik subtitle, dijaga qc
    dalam gambar label maksimal dua kata

SATU WARNA SATU MAKNA DI DALAM VIDEO INI:
    AKSEN2 biru = batang histogram dan titik data
    AKSEN bata  = jawaban yang salah, dan batang gabungan yang benar
    SOROT ungu  = luas, yaitu besaran yang sesungguhnya dipertahankan
    REDUP       = sumbu dan angkanya

Kamera phi 90, tegak lurus: yang dibandingkan TINGGI dan LUAS batang.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "statistika3-lebar-kelas"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

TINGGI_BADAN = [152, 155, 156, 158, 158, 159, 160, 160, 161, 161, 162, 162, 163, 163, 163,
                164, 164, 165, 165, 165, 166, 166, 167, 167, 168, 168, 169, 169, 170, 170,
                171, 172, 172, 173, 174, 175, 176, 177, 178, 180]
JANGKAR = 150            # kelas dijangkarkan di sini, seperti halaman

# --- Penggaris cm. Kelas terakhir pada lebar 10 adalah 180 sampai 189, jadi
#     penggarisnya harus memuat sampai 190. Render pertama gagal persis di
#     situ: histogramnya keluar bingkai kanan, ditangkap gerbang qc.
SKALA_X, PUSAT_CM = 0.225, 169.0
ANGKA_X = [150, 155, 160, 165, 170, 175, 180]
Z_DASAR = -1.06
Z_ANGKA = Z_DASAR - 0.32
X_SUMBU_F = -4.88
Z_KAMERA = 0.50
TINGGI_BINGKAI = 6.4
# Batang tertinggi di seluruh video 22 siswa (lebar 10). Puncaknya harus
# berhenti di bawah layar y = 1,10, jadi z <= 1,38.
SKALA_F = 0.100
JARI_TITIK = 0.052


def tegak(mob):
    """Berdirikan benda datar di bidang xz supaya menghadap kamera."""
    return mob.rotate(90 * DEGREES, RIGHT)


def xc(cm):
    return (cm - PUSAT_CM) * SKALA_X


def zf(frekuensi):
    return Z_DASAR + frekuensi * SKALA_F


def tumbuh_batang(m, **kw):
    """Batang tumbuh dari ALASNYA. Animasi bawaan `GrowFromEdge` butuh argumen
    tepi dan tepinya di bidang xy, sedangkan batang di sini berdiri di sumbu z."""
    dasar = m.get_center() + np.array([0.0, 0.0, -m.get_depth() / 2])
    return GrowFromPoint(m, dasar, **kw)


def kelompokkan(lebar):
    """Kembalikan daftar (batas bawah, frekuensi) untuk lebar kelas tertentu."""
    hitung = {}
    for v in TINGGI_BADAN:
        k = JANGKAR + ((v - JANGKAR) // lebar) * lebar
        hitung[k] = hitung.get(k, 0) + 1
    return sorted(hitung.items())


class LebarKelas3(AdeganMatra):
    samples = 4                        # penghalus tepi; bawaan ManimGL 0

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        DUNIA, HUD, TULISAN = {}, {}, {}
        HUD["identitas"] = sinema.identitas(self, "40 siswa, tinggi badan",
                                            "152 sampai 180 cm")

        def taruh(nama, mob, tulisan=False):
            DUNIA[nama] = mob
            if tulisan:
                TULISAN[nama] = mob
            return mob

        def buang(*nama):
            for n in nama:
                DUNIA[n] = None
                TULISAN.pop(n, None)

        def periksa(pasangan=None):
            hidup_d = {k: v for k, v in DUNIA.items() if v is not None}
            hidup_h = {k: v for k, v in HUD.items() if v is not None}
            if papan.semua() is not None:
                hidup_h["papan rumus"] = papan.semua()
            qc.periksa_adegan(self, {}, pasangan=pasangan, hud=hidup_h,
                              dunia=hidup_d, jaga_jalur_bawah=True)
            hidup_t = [k for k, v in TULISAN.items() if v is not None]
            for i, a in enumerate(hidup_t):
                for c in hidup_t[i + 1:]:
                    qc.tidak_bertindih(frame, TULISAN[a], TULISAN[c], a, c)

        # ------------------------------------------------------------------
        # Panggung: dua sumbu berangka.
        # ------------------------------------------------------------------
        sumbu_x = Line([xc(148.4), 0, Z_DASAR], [xc(191.0), 0, Z_DASAR]).set_stroke(REDUP, 2.4)
        sumbu_f = Line([X_SUMBU_F, 0, Z_DASAR], [X_SUMBU_F, 0, zf(24)]).set_stroke(REDUP, 2.4)
        angka_x = VGroup()
        for v in ANGKA_X:
            angka_x.add(Line([xc(v), 0, Z_DASAR], [xc(v), 0, Z_DASAR - 0.10])
                        .set_stroke(REDUP, 1.6))
            angka_x.add(tegak(rumus(str(v), 20, REDUP)).move_to([xc(v), 0, Z_ANGKA]))
        angka_f = VGroup()
        for f in (0, 10, 20):
            angka_f.add(Line([X_SUMBU_F, 0, zf(f)], [X_SUMBU_F - 0.10, 0, zf(f)])
                        .set_stroke(REDUP, 1.6))
            angka_f.add(tegak(rumus(str(f), 20, REDUP)).move_to([X_SUMBU_F - 0.34, 0, zf(f)]))

        # Empat puluh titik data, satu per siswa, ditumpuk di atas nilainya.
        def tumpuk(nilai_list):
            hitung, hasil = {}, []
            for v in nilai_list:
                hasil.append(hitung.get(v, 0))
                hitung[v] = hitung.get(v, 0) + 1
            return hasil

        titik = VGroup()
        for v, tingkat in zip(TINGGI_BADAN, tumpuk(TINGGI_BADAN)):
            d = Dot(radius=JARI_TITIK).set_fill(AKSEN2, 1).set_stroke(LATAR, 1.0)
            titik.add(tegak(d).move_to([xc(v), 0, Z_DASAR + 0.09 + tingkat * 0.13]))

        def histogram(lebar, warna=AKSEN2):
            g = VGroup()
            for bawah, f in kelompokkan(lebar):
                r = Rectangle(width=xc(bawah + lebar) - xc(bawah), height=f * SKALA_F)
                r.set_fill(warna, 0.55).set_stroke(warna, 2.0)
                g.add(tegak(r).move_to([(xc(bawah) + xc(bawah + lebar)) / 2, 0,
                                        Z_DASAR + f * SKALA_F / 2]))
            return g

        hist5 = histogram(5)
        hist2 = histogram(2)
        hist10 = histogram(10)

        # ==================================================================
        # Babak 1 `buka`: sumbu, lalu empat puluh titik.
        # ==================================================================
        kamera.pasang_awal(frame, theta=0, phi=90, pusat=(0, 0, Z_KAMERA), tinggi=TINGGI_BINGKAI)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 03: Lebar kelas", lama=3.2, y=2.6)
            b.catat(3.2)
            taruh("sumbu", VGroup(sumbu_x, sumbu_f))
            taruh("angka x", angka_x)
            taruh("angka f", angka_f)
            b.main(ShowCreation(sumbu_x), ShowCreation(sumbu_f), run_time=1.2)
            b.main(FadeIn(angka_x), FadeIn(angka_f), run_time=1.2)
            taruh("titik", titik)
            b.main(LaggedStart(*[FadeIn(m, shift=DOWN * 0.3) for m in titik],
                               lag_ratio=0.06), run_time=3.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 2 `kelompok`: titiknya jatuh ke kotak selebar 5 cm.
        # ==================================================================
        with sinema.babak(self, "kelompok", DURASI) as b:
            taruh("histogram", hist5)
            b.main(FadeOut(titik), LaggedStartMap(tumbuh_batang, hist5,
                                                  lag_ratio=0.12), run_time=3.4,
                   )
            buang("titik")
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.04, color=AKSEN2, **kw),
                hist5, lag_ratio=0.12), run_time=2.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 3 `pola`: tumpukan di sekitar 160 sampai 170.
        # ==================================================================
        pita = Rectangle(width=xc(170) - xc(160), height=0.30)
        pita.set_fill(SOROT, 0.26).set_stroke(SOROT, 1.6)
        pita = tegak(pita).move_to([(xc(160) + xc(170)) / 2, 0, zf(11) + 0.34])
        l_tumpuk = tegak(sinema.label("tumpukan", 20, SOROT))
        l_tumpuk.move_to([(xc(160) + xc(170)) / 2, 0, zf(11) + 0.76])

        with sinema.babak(self, "pola", DURASI) as b:
            taruh("pita", pita)
            b.main(GrowFromCenter(pita), run_time=1.4)
            taruh("label tumpukan", l_tumpuk, tulisan=True)
            b.main(FadeIn(l_tumpuk), run_time=1.0)
            b.main(Indicate(hist5[2], scale_factor=1.05, color=SOROT),
                   Indicate(hist5[3], scale_factor=1.05, color=SOROT), run_time=1.6)
            b.main(FadeOut(pita), FadeOut(l_tumpuk), run_time=0.8)
            buang("pita", "label tumpukan")
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 4 `sempit`: lebar 2, gambarnya bergerigi.
        # ==================================================================
        l_gerigi = tegak(sinema.label("bergerigi", 20, AKSEN))
        l_gerigi.move_to([xc(176.5), 0, zf(7.4)])

        with sinema.babak(self, "sempit", DURASI) as b:
            sinema.lahir_rumus(self, r"\text{lebar } 2", hist5[3], papan, b=b, warna=TINTA)
            taruh("histogram", hist2)
            b.main(FadeOut(hist5), LaggedStartMap(tumbuh_batang, hist2, lag_ratio=0.06),
                   run_time=3.4)
            taruh("label gerigi", l_gerigi, tulisan=True)
            b.main(FadeIn(l_gerigi), run_time=1.0)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.12, color=AKSEN, **kw),
                hist2, lag_ratio=0.05), run_time=2.6)
            b.main(FadeOut(l_gerigi), run_time=0.8)
            buang("label gerigi")
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 5 `lebar`: lebar 10, cuma empat batang, polanya hilang.
        # ==================================================================
        l_satu = tegak(sinema.label("1 siswa", 20, AKSEN))
        l_satu.move_to([xc(186.0), 0, zf(3.4)])

        with sinema.babak(self, "lebar", DURASI) as b:
            sinema.ganti_rumus(self, papan.utama, r"\text{lebar } 10", b=b,
                               run_time=1.4, papan=papan)
            taruh("histogram", hist10)
            b.main(FadeOut(hist2), LaggedStartMap(tumbuh_batang, hist10, lag_ratio=0.16),
                   run_time=3.2)
            taruh("label satu", l_satu, tulisan=True)
            b.main(FadeIn(l_satu), Indicate(hist10[3], scale_factor=1.2, color=AKSEN),
                   run_time=1.8)
            b.main(Indicate(hist10[1], scale_factor=1.04, color=AKSEN2), run_time=1.6)
            b.main(FadeOut(l_satu), run_time=0.8)
            buang("label satu")
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 6 `pilihan`: tiga gambar, satu kumpulan data.
        # ==================================================================
        with sinema.babak(self, "pilihan", DURASI) as b:
            sinema.ganti_rumus(self, papan.utama, r"\text{lebar } 5", b=b,
                               run_time=1.4, papan=papan)
            taruh("histogram", hist5)
            b.main(FadeOut(hist10), LaggedStartMap(tumbuh_batang, hist5, lag_ratio=0.1),
                   run_time=2.8)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.05, color=AKSEN2, **kw),
                hist5, lag_ratio=0.1), run_time=2.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 7 `luas`: pindah ke contoh kecil dua kelas bersebelahan.
        # Skalanya sendiri, ditulis di panel, supaya tidak tercampur dengan
        # histogram tinggi badan tadi.
        # ==================================================================
        LEBAR_KOTAK = 1.15               # satu satuan lebar kelas contoh
        TINGGI_KOTAK = 0.13              # satu satuan tinggi kelas contoh
        X_KIRI = -2.30

        # Contoh gabung kelas punya sumbunya SENDIRI. Tanpa itu penonton tidak
        # bisa melihat lebarnya 4 dan tingginya 8, dan aturan 9 standar
        # mewajibkan tiap bidang koordinat berangka.
        X_SUMBU_C = X_KIRI - 0.80
        sumbu_contoh = VGroup()
        sumbu_contoh.add(Line([X_SUMBU_C, 0, Z_DASAR], [X_SUMBU_C, 0, Z_DASAR + 18 * TINGGI_KOTAK])
                         .set_stroke(REDUP, 2.2))
        angka_contoh = {}          # tiap angka didaftarkan SENDIRI ke gerbang
        for f in (0, 4, 8, 12, 16):
            z = Z_DASAR + f * TINGGI_KOTAK
            sumbu_contoh.add(Line([X_SUMBU_C, 0, z], [X_SUMBU_C - 0.10, 0, z])
                             .set_stroke(REDUP, 1.5))
            t = tegak(rumus(str(f), 19, REDUP)).move_to([X_SUMBU_C - 0.36, 0, z])
            sumbu_contoh.add(t)
            angka_contoh[f"contoh f{f}"] = t
        for satuan in (0, 2, 4):
            x = X_KIRI + satuan * LEBAR_KOTAK
            sumbu_contoh.add(Line([x, 0, Z_DASAR], [x, 0, Z_DASAR - 0.10])
                             .set_stroke(REDUP, 1.5))
            t = tegak(rumus(str(8 + satuan), 19, REDUP)).move_to([x, 0, Z_DASAR - 0.32])
            sumbu_contoh.add(t)
            angka_contoh[f"contoh x{8 + satuan}"] = t

        def kotak_contoh(mulai, lebar, tinggi, warna, isi=0.55):
            r = Rectangle(width=lebar * LEBAR_KOTAK, height=tinggi * TINGGI_KOTAK)
            r.set_fill(warna, isi).set_stroke(warna, 2.2)
            return tegak(r).move_to([X_KIRI + (mulai + lebar / 2) * LEBAR_KOTAK, 0,
                                     Z_DASAR + tinggi * TINGGI_KOTAK / 2])

        kiri = kotak_contoh(0, 2, 12, AKSEN2)
        kanan = kotak_contoh(2, 2, 4, AKSEN2)
        l_kiri = tegak(rumus("12", 20, AKSEN2)).move_to([X_KIRI + 1.0 * LEBAR_KOTAK, 0,
                                                         Z_DASAR + 12 * TINGGI_KOTAK + 0.24])
        l_kanan = tegak(rumus("4", 20, AKSEN2)).move_to([X_KIRI + 3.0 * LEBAR_KOTAK, 0,
                                                         Z_DASAR + 4 * TINGGI_KOTAK + 0.24])

        with sinema.babak(self, "luas", DURASI) as b:
            b.main(FadeOut(hist5), FadeOut(angka_f), FadeOut(sumbu_f), FadeOut(angka_x),
                   run_time=1.2)
            buang("histogram", "angka f", "angka x")
            taruh("sumbu", sumbu_x)
            taruh("sumbu contoh", sumbu_contoh)
            TULISAN.update(angka_contoh)
            b.main(FadeIn(sumbu_contoh), run_time=1.0)
            sinema.ganti_rumus(self, papan.utama, r"\text{gabung 2 kelas}", b=b,
                               run_time=1.4, papan=papan)
            taruh("kotak kiri", kiri)
            taruh("kotak kanan", kanan)
            taruh("tinggi kiri", l_kiri, tulisan=True)
            taruh("tinggi kanan", l_kanan, tulisan=True)
            b.main(FadeIn(kiri), FadeIn(kanan), run_time=1.2)
            b.main(FadeIn(l_kiri), FadeIn(l_kanan), run_time=1.0)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 8 `salah`: tingginya dijumlah, dan batangnya tidak muat.
        # ==================================================================
        salah = kotak_contoh(0, 4, 16, AKSEN, isi=0.30)
        l_salah = tegak(rumus("4 \\times 16 = 64", 20, AKSEN))
        l_salah.move_to([X_KIRI + 2.0 * LEBAR_KOTAK, 0, Z_DASAR + 16 * TINGGI_KOTAK + 0.28])
        # Silang dipasang di tengah BATANG yang salah, berlubang di tengah
        # supaya batangnya tetap terlihat (gerbang video CLAUDE.md).
        silang = VGroup()
        pusat_s = np.array([X_KIRI + 2.0 * LEBAR_KOTAK, 0.0, Z_DASAR + 8 * TINGGI_KOTAK])
        for tanda in (1, -1):
            for arah in (1, -1):
                silang.add(Line(pusat_s + np.array([arah * 0.22, 0, arah * tanda * 0.22]),
                                pusat_s + np.array([arah * 0.62, 0, arah * tanda * 0.62])))
        silang.set_stroke(AKSEN, 3.4)

        with sinema.babak(self, "salah", DURASI) as b:
            taruh("kotak salah", salah)
            taruh("tinggi salah", l_salah, tulisan=True)
            b.main(FadeIn(salah), FadeIn(l_salah), run_time=1.6)
            b.main(Indicate(salah, scale_factor=1.04, color=AKSEN), run_time=1.4)
            taruh("silang", silang)
            b.main(ShowCreation(silang), run_time=1.4)
            b.main(FadeOut(salah), FadeOut(l_salah), FadeOut(silang), run_time=1.4)
            buang("kotak salah", "tinggi salah", "silang")
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 9 `benar`: yang dijumlah LUASNYA.
        # ==================================================================
        gabung = kotak_contoh(0, 4, 8, SOROT)
        l_gabung = tegak(rumus("8", 20, SOROT)).move_to([X_KIRI + 2.0 * LEBAR_KOTAK, 0,
                                                         Z_DASAR + 8 * TINGGI_KOTAK + 0.24])

        with sinema.babak(self, "benar", DURASI) as b:
            sinema.ganti_rumus(self, papan.utama, r"24 + 8 = 32", b=b,
                               run_time=1.6, papan=papan)
            b.main(Indicate(kiri, scale_factor=1.04, color=SOROT), run_time=1.2)
            b.main(Indicate(kanan, scale_factor=1.04, color=SOROT), run_time=1.2)
            taruh("kotak gabung", gabung)
            taruh("tinggi gabung", l_gabung, tulisan=True)
            b.main(FadeOut(l_kiri), FadeOut(l_kanan),
                   ReplacementTransform(VGroup(kiri, kanan), gabung), run_time=2.4)
            buang("kotak kiri", "kotak kanan", "tinggi kiri", "tinggi kanan")
            b.main(FadeIn(l_gabung), run_time=1.0)
            sinema.ganti_rumus(self, papan.utama, r"32 : 4 = 8", b=b,
                               run_time=1.4, papan=papan)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 10 `tutup`: luas yang mewakili banyaknya data.
        # ==================================================================
        l_luas = tegak(sinema.label("luasnya", 20, SOROT))
        l_luas.move_to([X_KIRI + 2.0 * LEBAR_KOTAK, 0, Z_DASAR + 4 * TINGGI_KOTAK])

        with sinema.babak(self, "tutup", DURASI) as b:
            taruh("label luas", l_luas, tulisan=True)
            b.main(FadeIn(l_luas), run_time=1.0)
            b.main(Indicate(gabung, scale_factor=1.06, color=SOROT), run_time=1.6)
            b.main(Indicate(l_gabung, scale_factor=1.4, color=SOROT), run_time=1.4)
            sinema.ganti_rumus(self, papan.utama, r"\text{luas, bukan tinggi}", b=b,
                               run_time=1.6, papan=papan)
            b.main(Indicate(papan.utama, scale_factor=1.15, color=SOROT), run_time=1.6)
            b.jeda(1.4)
        periksa()
