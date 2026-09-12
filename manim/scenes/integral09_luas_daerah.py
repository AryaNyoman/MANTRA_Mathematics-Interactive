"""Video Integral Materi 09 "Luas daerah, termasuk yang di bawah sumbu":
Penerapan Integral, Bagian 1.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (1:55)
yang sudah disetujui ARYA. DUNIANYA SAMA: satu sumbu, kurva x^2 - 4x pada
[0, 6], dua daerah berwarna (merah di bawah sumbu, biru di atas), titik
potong 0 dan 4, daerah merah dicerminkan ke atas saat dipositifkan; warnanya
sama dengan widget `luas-dua-daerah`.

YANG BERBEDA: pembuka sub-bab plus Bagian 1 dengan pertanyaan halaman;
segar-ingat Luas dan Integral Tentu Bagian 3 dan 2; ASAL ANGKA: antiturunan
x^3/3 - 2x^2 dihitung di panel untuk kedua bagian; bentuk umum luas = jumlah
harga mutlak integral tiap bagian; babak "keliru" dari halaman; rangkuman
dengan pertanyaan; penutup menunjuk Bagian 2 (kurva kedua); tiap kejadian
dipicu pada KATA (`sinema.JamKata`).

DAERAH TIDAK PERNAH DISOROT DENGAN `Indicate` (ia membesarkan 1,2 kali dan
mengubah letak daerah), melainkan dengan menaikkan kelegapannya 0,32 ke 0,62
lalu mengembalikannya; alasannya tercatat di adegan lama (frame detik 65
render keempat).

ANGKA diperiksa sympy lewat `alat/klaim-video-integral09.json`.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "integral09-luas-daerah"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

A, B = 0.0, 6.0        # selang yang dibahas
POTONG = 4.0           # titik potong di dalam selang


def f(x):
    return x * x - 4.0 * x


def bidang():
    """Sumbu tunggal video ini. Batas bawah kedua sumbu kelipatan langkahnya."""
    s = Axes(x_range=(0, 6.4, 1), y_range=(-6, 12.5, 3), width=9.2, height=4.4,
             axis_config=dict(stroke_color=REDUP, stroke_width=2.4))
    s.move_to([0.2, 0.1, 0])
    angka = s.add_coordinate_labels(font_size=22, num_decimal_places=0)
    angka.set_color(TINTA).set_opacity(0.75)
    s.angka = angka
    s.latar = True
    return s


def kurva(sumbu, fungsi, a, b, warna=TINTA, tebal=3.8):
    return ParametricCurve(lambda t: sumbu.c2p(t, fungsi(t)), t_range=(a, b, (b - a) / 240.0)).set_stroke(warna, tebal)


def daerah(sumbu, fungsi, a, b, warna, opacity=0.32, langkah=90):
    """Daerah antara kurva dan sumbu x, dibangun dari nilai fungsinya sendiri:
    bagian yang negatif otomatis tergambar di bawah sumbu."""
    titik = [sumbu.c2p(a + (b - a) * i / langkah, fungsi(a + (b - a) * i / langkah)) for i in range(langkah + 1)]
    titik += [sumbu.c2p(b, 0), sumbu.c2p(a, 0)]
    return Polygon(*titik).set_fill(warna, opacity).set_stroke(warna, 1.6)


def bersihkan_panel(scene, panel, buang, b=None, run_time=0.5):
    """Buang beberapa baris panel sekaligus, lalu rapatkan sisanya."""
    buang = [m for m in buang if m is not None and m in panel.baris_lain]
    if not buang:
        return
    anim = [FadeOut(m) for m in buang]
    for m in buang:
        panel.baris_lain.remove(m)
    if b is not None:
        b.main(*anim, run_time=run_time)
    else:
        scene.play(*anim, run_time=run_time)
    for m in buang:
        scene.remove(m)
    for i, m in enumerate(panel.baris_lain):
        panel.tempat_baris(m, i)
    panel.perbarui_alas()


class IntegralLuasDaerah(AdeganMatra):
    def construct(self):
        frame = self.frame
        panel = sinema.PapanRumus(self, ukuran=30, alas=True)
        ident = None

        def hud():
            isi = {}
            if ident is not None:
                isi["identitas"] = ident
            panel_isi = panel.semua()
            if panel_isi is not None:
                isi["papan"] = panel_isi
            return isi

        def nyala(*mobs, warna=SOROT, skala=1.0):
            return [Indicate(m, color=warna, scale_factor=skala) for m in mobs]

        def denyut(b, *daerah_, lama=1.0):
            """Sorot daerah dengan menaikkan kelegapannya, bukan Indicate."""
            b.main(*[d.animate.set_fill(opacity=0.62) for d in daerah_], run_time=lama * 0.5)
            b.main(*[d.animate.set_fill(opacity=0.32) for d in daerah_], run_time=lama * 0.5)

        sumbu = bidang()
        pusat, tinggi_kam = kamera.muat_datar(sumbu, sisa_atas=0.30, sisa_kanan=3.6)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat, tinggi=tinggi_kam)
        k = kurva(sumbu, f, A, B)
        merah = daerah(sumbu, f, A, POTONG, AKSEN)
        biru = daerah(sumbu, f, POTONG, B, AKSEN2)

        # ---- buka: sub-bab, lalu kurva dan dua daerahnya ------------------ #
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Penerapan")
            sinema.judul_pembuka(self, "Penerapan Integral, Bagian 1", lama=3.0, y=2.6)
            b.catat(3.0)
            b.tunggu_kata("Kalau kurvanya")
            b.main(FadeIn(sumbu), run_time=0.6)
            b.main(ShowCreation(k), run_time=1.2)
            b.tunggu_kata("lebih kecil")
            b.main(FadeIn(merah), FadeIn(biru), run_time=0.8)
        qc.periksa_adegan(self, {"kurva": k}, hud=hud(), dunia={"sumbu": sumbu, "merah": merah, "biru": biru})

        # ---- ingat: F(b) - F(a), dan tanda integral ------------------------ #
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Luas")
            ident = sinema.identitas(self, "mendatar x, tegak f(x)")
            ident.set_opacity(0)
            b.main(ident.animate.set_opacity(1), run_time=0.5)
            b.tunggu_kata("F b")
            b_tdk = panel.baris(r"\int_a^b f = F(b) - F(a)", warna=SOROT, b=b)
            b.tunggu_kata("punya tanda")
            b_tanda = panel.baris(r"\text{di bawah sumbu: negatif}", warna=AKSEN, b=b)
            b.tunggu_kata("negatif")
            denyut(b, merah, lama=1.0)
        qc.periksa_adegan(self, {"kurva": k}, hud=hud(), dunia={"sumbu": sumbu, "merah": merah, "biru": biru})

        # ---- masalah: kurva x^2 - 4x pada 0 sampai 6 ----------------------- #
        with sinema.babak(self, "masalah", DURASI, kata=KATA) as b:
            b.tunggu_kata("kekeliruan")
            bersihkan_panel(self, panel, [b_tdk, b_tanda], b=b, run_time=0.4)
            b.main(merah.animate.set_fill(opacity=0.10), biru.animate.set_fill(opacity=0.10), run_time=0.6)
            b.tunggu_kata("Ambil kurva")
            rum = sinema.lahir_rumus(self, r"f(x) = x^2 - 4x", dekat=sumbu.c2p(5.4, f(5.4)), papan=panel, b=b,
                                     warna=TINTA, tahan=0.4, run_time=0.9)
            b.tunggu_kata("nol sampai")
            b.main(*nyala(sumbu.angka, warna=SOROT), run_time=0.9)
        qc.periksa_adegan(self, {"kurva": k}, hud=hud(), dunia={"sumbu": sumbu, "merah": merah, "biru": biru})

        # ---- potong: f = 0, x = 0 atau x = 4 -------------------------------- #
        akar0 = Dot(sumbu.c2p(0, 0), radius=0.085).set_color(SOROT)
        akar4 = Dot(sumbu.c2p(POTONG, 0), radius=0.085).set_color(SOROT)
        l_akar0 = rumus("0", 28, SOROT).next_to(akar0, UL, buff=0.10)
        l_akar4 = rumus("4", 28, SOROT).next_to(akar4, UR, buff=0.10)
        with sinema.babak(self, "potong", DURASI, kata=KATA) as b:
            b.tunggu_kata("Samakan")
            b_akar = panel.baris(r"f = 0:\ x(x - 4) = 0", warna=SOROT, b=b)
            b.tunggu_kata("x sama dengan nol")
            b.main(FadeIn(akar0, scale=0.4), FadeIn(l_akar0), run_time=0.7)
            b.tunggu_kata("x sama dengan empat")
            b.main(FadeIn(akar4, scale=0.4), FadeIn(l_akar4), run_time=0.7)
            b.tunggu_kata("berpindah")
            b.main(Indicate(akar4, color=AKSEN, scale_factor=2.0), run_time=0.9)
        qc.periksa_adegan(self, {"label akar 0": l_akar0, "label akar 4": l_akar4}, [("label akar 0", "label akar 4")],
                          hud=hud(), dunia={"sumbu": sumbu, "merah": merah, "biru": biru})

        # ---- warna: bawah sumbu merah, atas sumbu biru --------------------- #
        with sinema.babak(self, "warna", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dari nol")
            b.main(merah.animate.set_fill(opacity=0.32), run_time=0.8)
            b.tunggu_kata("bawah sumbu")
            denyut(b, merah, lama=1.0)
            b.tunggu_kata("Dari empat")
            b.main(biru.animate.set_fill(opacity=0.32), run_time=0.8)
            b.tunggu_kata("atas sumbu")
            denyut(b, biru, lama=1.0)
            b.tunggu_kata("Dua daerah")
            denyut(b, merah, biru, lama=1.2)
        qc.periksa_adegan(self, {"kurva": k}, hud=hud(), dunia={"sumbu": sumbu, "merah": merah, "biru": biru})

        # ---- hitung1: bagian kiri lewat antiturunan ------------------------ #
        with sinema.babak(self, "hitung1", DURASI, kata=KATA) as b:
            b.tunggu_kata("antiturunan")
            b_F = panel.baris(r"F(x) = \tfrac{x^3}{3} - 2x^2", warna=TINTA, b=b)
            b.tunggu_kata("Hasilnya")
            b_kiri = panel.baris(r"F(4) - F(0) = -\tfrac{32}{3}", warna=AKSEN, b=b)
            b.tunggu_kata("Tandanya")
            denyut(b, merah, lama=1.0)
            b.tunggu_kata("bukan karena")
            b.main(*nyala(b_kiri), run_time=0.9)
        qc.periksa_adegan(self, {"kurva": k}, hud=hud(), dunia={"sumbu": sumbu, "merah": merah, "biru": biru})

        # ---- hitung2: bagian kanan --------------------------------------- #
        with sinema.babak(self, "hitung2", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bagian kanannya")
            denyut(b, biru, lama=1.0)
            b.tunggu_kata("F enam")
            b_kanan = panel.baris(r"F(6) - F(4) = 0 - (-\tfrac{32}{3})", warna=AKSEN2, b=b)
            b.tunggu_kata("positif")
            b_kanan = sinema.ganti_rumus(self, b_kanan, r"F(6) - F(4) = +\tfrac{32}{3}", b=b, run_time=0.9,
                                         warna=AKSEN2, papan=panel)
            b.tunggu_kata("Kebetulan")
            b.main(*nyala(b_kiri), *nyala(b_kanan), run_time=0.9)
        qc.periksa_adegan(self, {"kurva": k}, hud=hud(), dunia={"sumbu": sumbu, "merah": merah, "biru": biru})

        # ---- nol: dijumlahkan langsung, nol ------------------------------- #
        with sinema.babak(self, "nol", DURASI, kata=KATA) as b:
            b.tunggu_kata("jumlahkan")
            bersihkan_panel(self, panel, [b_akar, b_F], b=b, run_time=0.4)
            b.tunggu_kata("Negatif")
            b_nol = panel.baris(r"-\tfrac{32}{3} + \tfrac{32}{3} = 0", warna=SOROT, b=b)
            b.tunggu_kata("jebakannya")
            b.main(*nyala(b_nol, warna=AKSEN), run_time=0.9)
            b.tunggu_kata("jelas-jelas")
            denyut(b, merah, biru, lama=1.2)
        qc.periksa_adegan(self, {"kurva": k}, hud=hud(), dunia={"sumbu": sumbu, "merah": merah, "biru": biru})

        # ---- bukan: dua pertanyaan yang berbeda ---------------------------- #
        with sinema.babak(self, "bukan", DURASI, kata=KATA) as b:
            b.tunggu_kata("bukan salah")
            b_beda = panel.baris(r"\text{integral} \ne \text{luas}", warna=AKSEN, b=b)
            b.tunggu_kata("hasil integralnya")
            b.main(*nyala(b_nol), run_time=0.9)
            b.tunggu_kata("berapa luasnya")
            denyut(b, merah, biru, lama=1.0)
        qc.periksa_adegan(self, {"kurva": k}, hud=hud(), dunia={"sumbu": sumbu, "merah": merah, "biru": biru})

        # ---- positif: merah dicerminkan ke atas, lalu dijumlahkan ---------- #
        cermin = merah.copy()
        cermin.stretch(-1, 1, about_point=sumbu.c2p(0, 0))
        cermin.set_fill(AKSEN, 0.32).set_stroke(AKSEN, 1.6)
        salinan = merah.copy()
        with sinema.babak(self, "positif", DURASI, kata=KATA) as b:
            b.tunggu_kata("Caranya")
            bersihkan_panel(self, panel, [b_kiri, b_kanan], b=b, run_time=0.4)
            b.tunggu_kata("Positifkan")
            self.add(salinan)
            b.main(Transform(salinan, cermin), run_time=1.4)
            b.tunggu_kata("dijumlahkan")
            denyut(b, salinan, biru, lama=1.0)
            b.tunggu_kata("hasilnya")
            b_luas = panel.baris(r"\tfrac{32}{3} + \tfrac{32}{3} = \tfrac{64}{3}", warna=SOROT, b=b)
            b.tunggu_kata("kira-kira")
            b_kira = panel.baris(r"\approx 21{,}3", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"kurva": k}, hud=hud(), dunia={"sumbu": sumbu, "biru": biru, "salinan": salinan})

        # ---- umum: luas = jumlah harga mutlak integral tiap bagian --------- #
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bentuk")
            bersihkan_panel(self, panel, [b_nol, b_beda, b_kira], b=b, run_time=0.4)
            b.main(Transform(salinan, merah.copy()), run_time=0.9)
            b.tunggu_kata("jumlah harga")
            rum_umum = sinema.lahir_rumus(self, r"\text{luas} = \sum \Big|\int f\Big|", dekat=sumbu.c2p(2.0, 6.0),
                                          papan=panel, b=b, warna=SOROT, tahan=0.5, run_time=0.9, sebagai_utama=False)
            b.tunggu_kata("dipecah")
            b.main(Indicate(akar4, color=AKSEN, scale_factor=2.0), run_time=0.9)
            b.tunggu_kata("saling memakan")
            denyut(b, salinan, biru, lama=1.0)
        qc.periksa_adegan(self, {"kurva": k}, hud=hud(), dunia={"sumbu": sumbu, "biru": biru, "salinan": salinan})

        # ---- aman: kurva yang tidak memotong sumbu -------------------------- #
        with sinema.babak(self, "aman", DURASI, kata=KATA) as b:
            b.tunggu_kata("Tidak semua")
            b.main(FadeOut(salinan), merah.animate.set_fill(opacity=0.06).set_stroke(opacity=0.15), run_time=0.9)
            b.tunggu_kata("tidak pernah")
            denyut(b, biru, lama=1.0)
            b.tunggu_kata("sama dengan")
            b_aman = panel.baris(r"\text{selalu di atas: luas} = \int", warna=AKSEN2, b=b)
        qc.periksa_adegan(self, {"kurva": k}, hud=hud(), dunia={"sumbu": sumbu, "biru": biru})

        # ---- keliru: luas dijawab dengan hasil integralnya ------------------ #
        with sinema.babak(self, "keliru", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kekeliruan")
            b.main(merah.animate.set_fill(opacity=0.32).set_stroke(opacity=1.0), run_time=0.8)
            b.tunggu_kata("dijawab langsung")
            b_salah = panel.baris(r"\text{salah: luas} = 0", warna=AKSEN, b=b)
            b.tunggu_kata("di atas sumbu")
            denyut(b, biru, lama=1.0)
            b.tunggu_kata("bersyarat")
            b.main(*nyala(b_aman), run_time=0.9)
        qc.periksa_adegan(self, {"kurva": k}, hud=hud(), dunia={"sumbu": sumbu, "merah": merah, "biru": biru})

        # ---- rangkum: langkahnya, lalu satu pertanyaan ---------------------- #
        with sinema.babak(self, "rangkum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Rangkumannya")
            bersihkan_panel(self, panel, [b_aman, b_salah], b=b, run_time=0.4)
            b.tunggu_kata("gambar dulu")
            b.main(*nyala(k, warna=SOROT), run_time=0.9)
            b.tunggu_kata("titik potongnya")
            b.main(Indicate(VGroup(akar0, akar4), color=SOROT, scale_factor=2.0), run_time=0.9)
            b.tunggu_kata("pecah")
            denyut(b, merah, lama=0.8)
            b.tunggu_kata("positifkan")
            denyut(b, biru, lama=0.8)
            b.tunggu_kata("jumlahkan")
            b.main(*nyala(b_luas), run_time=0.9)
            b.tunggu_kata("seluruhnya")
            denyut(b, merah, lama=1.0)
            b.tunggu_kata("berapa luasnya")
            b_tanya = panel.baris(r"\text{luas} = \ ?", warna=AKSEN, b=b)
        qc.periksa_adegan(self, {"kurva": k}, hud=hud(), dunia={"sumbu": sumbu, "merah": merah, "biru": biru})

        # ---- lanjut: Bagian 2, kurva kedua ---------------------------------- #
        judul_lanjut = teks("Penerapan Integral, Bagian 2", 30, SOROT).move_to([0, 3.2, 0]).fix_in_frame()
        k2 = kurva(sumbu, lambda x: 6.0 - x, A, B, warna=SOROT, tebal=3.2)
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di materi")
            b.main(FadeOut(panel.semua()), FadeOut(l_akar0), FadeOut(l_akar4), run_time=0.5)
            self.remove(*panel.semua())
            panel = sinema.PapanRumus(self, ukuran=30, alas=True)
            self.hud_tambah(judul_lanjut)
            self.remove(judul_lanjut)
            b.tunggu_kata("Penerapan")
            b.main(FadeIn(judul_lanjut, shift=0.2 * UP), run_time=0.7)
            b.tunggu_kata("kurva kedua")
            b.main(ShowCreation(k2), run_time=1.0)
            b.tunggu_kata("hampir tidak")
            b.main(*nyala(k2), run_time=0.9)
        qc.periksa_adegan(self, {"kurva": k, "kurva kedua": k2}, hud={"identitas": ident, "judul": judul_lanjut},
                          dunia={"sumbu": sumbu, "merah": merah, "biru": biru})

        sinema.laporkan_pemicu(self)
