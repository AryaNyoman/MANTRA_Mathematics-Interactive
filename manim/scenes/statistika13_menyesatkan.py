"""Materi 13 Statistika: grafik yang menyesatkan (ManimGL). Video penutup topik.

Naskah: manim/narasi/statistika13-menyesatkan.json (10 segmen, 118,0 detik)

GAGASAN POKOK. Sebelas tahap sebelumnya melatih siswa MEMBUAT ringkasan data.
Tahap ini membalik posisinya: sekarang dia pembacanya. Yang harus terlihat, dan
yang tidak bisa ditunjukkan halaman diam, adalah satu grafik BERUBAH KESAN
tanpa satu pun angkanya berubah. Karena itu titik datanya TIDAK PERNAH dibuat
ulang di video ini: titik yang sama dipindahkan oleh sumbunya sendiri, dan
angka di sampingnya tetap tertulis sepanjang perubahan.

Data pengunjung perpustakaan lima bulan, persis angka halaman Tahap 13:
    412, 418, 425, 421, 430   (naik 18 orang, sekitar 4 persen dari 420)

TATA LETAK (standar video versi 2):
    kiri atas  identitas benda, menetap
    kanan atas papan rumus, berubah lewat morph
    kaki layar milik subtitle, dijaga qc
    dalam gambar label maksimal dua kata

SATU WARNA SATU MAKNA DI DALAM VIDEO INI:
    AKSEN2 biru = grafik jujur (sumbu dari nol)
    AKSEN bata  = grafik yang menyesatkan, dan peringatan
    SOROT ungu  = angka yang tidak berubah, yaitu datanya sendiri
    TINTA       = tulisan       REDUP = sumbu dan angkanya

Kamera phi 90, tegak lurus, tidak pernah dimiringkan: seluruh isi video ini
adalah perbandingan KEMIRINGAN garis, dan perspektif sekecil apa pun akan
membantah hitungannya. Pelajaran itu datang dari Materi 09.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "statistika13-menyesatkan"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

# --- Data. Persis angka halaman Tahap 13.
BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei"]
KUNJUNG = [412, 418, 425, 421, 430]
DASAR_JUJUR = 0        # sumbu tegak mulai dari nol
DASAR_POTONG = 410     # sumbu tegak dipotong, mulai dari 410
ATAS_JUJUR = 450
ATAS_POTONG = 434

# --- Panggung. Sumbu mendatar tetap; hanya sumbu tegaknya yang berubah.
X_KIRI, X_KANAN = -3.20, 2.60
Z_DASAR, Z_ATAS = -1.10, 1.42
Z_ANGKA = Z_DASAR - 0.34
Z_KAMERA = 0.50
TINGGI_BINGKAI = 6.4


def tegak(mob):
    """Berdirikan benda datar di bidang xz supaya menghadap kamera."""
    return mob.rotate(90 * DEGREES, RIGHT)


def xb(i):
    """Letak mendatar bulan ke-i (0 sampai 4)."""
    return X_KIRI + (X_KANAN - X_KIRI) * i / (len(BULAN) - 1)


class Menyesatkan13(AdeganMatra):
    samples = 4                        # penghalus tepi; bawaan ManimGL 0

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        DUNIA, HUD, TULISAN = {}, {}, {}
        HUD["identitas"] = sinema.identitas(self, "pengunjung perpustakaan",
                                            "5 bulan, orang per bulan")

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

        # Keadaan sumbu tegak yang sedang dipakai. Titik datanya dihitung dari
        # sini, jadi tidak ada satu pun angka yang ditulis dua kali.
        sumbu = {"bawah": DASAR_JUJUR, "atas": ATAS_JUJUR}

        def zp(orang, bawah=None, atas=None):
            bawah = sumbu["bawah"] if bawah is None else bawah
            atas = sumbu["atas"] if atas is None else atas
            return Z_DASAR + (orang - bawah) / (atas - bawah) * (Z_ATAS - Z_DASAR)

        def tangga_angka(bawah, atas, langkah):
            n = int(round((atas - bawah) / langkah))
            return [bawah + i * langkah for i in range(n + 1)]

        def buat_sumbu_tegak(bawah, atas, langkah):
            g = VGroup()
            g.add(Line([X_KIRI - 0.55, 0, Z_DASAR], [X_KIRI - 0.55, 0, Z_ATAS + 0.24])
                  .set_stroke(REDUP, 2.4))
            for v in tangga_angka(bawah, atas, langkah):
                z = zp(v, bawah, atas)
                g.add(Line([X_KIRI - 0.55, 0, z], [X_KIRI - 0.65, 0, z]).set_stroke(REDUP, 1.6))
                g.add(tegak(rumus(str(int(v)), 19, REDUP)).move_to([X_KIRI - 1.02, 0, z]))
            return g

        def buat_titik_garis(bawah, atas):
            t = VGroup()
            for i, v in enumerate(KUNJUNG):
                d = Dot(radius=0.062).set_fill(TINTA, 1).set_stroke(LATAR, 1.0)
                t.add(tegak(d).move_to([xb(i), 0, zp(v, bawah, atas)]))
            g = VGroup(*[Line([xb(i), 0, zp(KUNJUNG[i], bawah, atas)],
                              [xb(i + 1), 0, zp(KUNJUNG[i + 1], bawah, atas)])
                         .set_stroke(AKSEN2, 3.2) for i in range(len(KUNJUNG) - 1)])
            return t, g

        sumbu_datar = Line([X_KIRI - 0.55, 0, Z_DASAR], [X_KANAN + 0.45, 0, Z_DASAR])
        sumbu_datar.set_stroke(REDUP, 2.4)
        nama_bulan = VGroup(*[tegak(teks(b, 19, REDUP)).move_to([xb(i), 0, Z_ANGKA])
                              for i, b in enumerate(BULAN)])

        sumbu_jujur = buat_sumbu_tegak(DASAR_JUJUR, ATAS_JUJUR, 150)
        sumbu_potong = buat_sumbu_tegak(DASAR_POTONG, ATAS_POTONG, 6)
        titik, garis = buat_titik_garis(DASAR_JUJUR, ATAS_JUJUR)
        titik_potong, garis_potong = buat_titik_garis(DASAR_POTONG, ATAS_POTONG)

        # Angka datanya ditulis di sebelah tiap titik dan TIDAK PERNAH berubah
        # sepanjang video. Itu bukti bahwa yang berubah cuma sumbunya.
        def buat_angka_data(bawah, atas):
            g = VGroup()
            for i, v in enumerate(KUNJUNG):
                a = tegak(rumus(str(v), 18, SOROT))
                a.move_to([xb(i), 0, zp(v, bawah, atas) + 0.30])
                g.add(a)
            return g

        angka_data = buat_angka_data(DASAR_JUJUR, ATAS_JUJUR)
        angka_data_potong = buat_angka_data(DASAR_POTONG, ATAS_POTONG)

        # ==================================================================
        # Babak 1 `buka`: sumbu, lalu lima titik dengan angkanya.
        # ==================================================================
        kamera.pasang_awal(frame, theta=0, phi=90, pusat=(0, 0, Z_KAMERA), tinggi=TINGGI_BINGKAI)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 13: Grafik menyesatkan", lama=3.2, y=2.6)
            b.catat(3.2)
            taruh("sumbu datar", VGroup(sumbu_datar, nama_bulan))
            taruh("sumbu tegak", sumbu_jujur)
            b.main(ShowCreation(sumbu_datar), FadeIn(nama_bulan), run_time=1.4)
            b.main(FadeIn(sumbu_jujur), run_time=1.2)
            taruh("titik", titik)
            b.main(LaggedStartMap(FadeIn, titik, lag_ratio=0.2), run_time=3.0)
            taruh("angka data", angka_data)
            b.main(LaggedStartMap(FadeIn, angka_data, lag_ratio=0.2), run_time=4.0)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 2 `jujur`: garisnya nyaris rata, dan memang begitu keadaannya.
        # ==================================================================
        l_rata = tegak(sinema.label("nyaris rata", 20, AKSEN2))
        l_rata.move_to([xb(2), 0, zp(421) - 0.42])

        with sinema.babak(self, "jujur", DURASI) as b:
            taruh("garis", garis)
            b.main(LaggedStartMap(ShowCreation, garis, lag_ratio=0.2), run_time=3.4)
            taruh("label rata", l_rata, tulisan=True)
            b.main(FadeIn(l_rata), run_time=1.0)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.8, color=AKSEN2, **kw),
                titik, lag_ratio=0.16), run_time=1.6)
            b.main(Indicate(garis, scale_factor=1.03, color=AKSEN2), run_time=1.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 3 `potong`: sumbu tegaknya diganti. Angka datanya IKUT PINDAH
        # bersama titiknya, jadi terlihat jelas tidak ada yang diubah.
        # ==================================================================
        for g in garis_potong:
            g.set_stroke(AKSEN, 3.2)
        l_dari = tegak(rumus("410", 20, AKSEN))
        l_dari.move_to([X_KIRI - 1.02, 0, Z_DASAR - 0.02])

        with sinema.babak(self, "potong", DURASI) as b:
            b.main(FadeOut(l_rata), run_time=0.6)
            buang("label rata")
            sumbu["bawah"], sumbu["atas"] = DASAR_POTONG, ATAS_POTONG
            taruh("sumbu tegak", sumbu_potong)
            taruh("titik", titik_potong)
            taruh("garis", garis_potong)
            taruh("angka data", angka_data_potong)
            b.main(FadeOut(sumbu_jujur), FadeIn(sumbu_potong), run_time=1.6)
            b.main(*[Transform(a, c) for a, c in zip(titik, titik_potong)],
                   *[Transform(a, c) for a, c in zip(garis, garis_potong)],
                   *[Transform(a, c) for a, c in zip(angka_data, angka_data_potong)],
                   run_time=3.4)
            b.main(Indicate(sumbu_potong, scale_factor=1.04, color=AKSEN), run_time=1.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 4 `lonjak`: kesannya berubah total, angkanya satu pun tidak.
        # ==================================================================
        l_lonjak = tegak(sinema.label("lonjakan tajam", 20, AKSEN))
        l_lonjak.move_to([xb(1.1), 0, zp(429)])

        with sinema.babak(self, "lonjak", DURASI) as b:
            taruh("label lonjak", l_lonjak, tulisan=True)
            b.main(FadeIn(l_lonjak), run_time=1.0)
            b.main(Indicate(garis, scale_factor=1.03, color=AKSEN), run_time=1.4)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.3, color=SOROT, **kw),
                angka_data, lag_ratio=0.18), run_time=3.6)
            b.main(Indicate(sumbu_potong, scale_factor=1.05, color=AKSEN), run_time=1.6)
            b.main(FadeOut(l_lonjak), run_time=0.8)
            buang("label lonjak")
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 5 `berapa`: seberapa besar kenaikannya sebenarnya.
        # ==================================================================
        with sinema.babak(self, "berapa", DURASI) as b:
            b.main(Indicate(titik[0], scale_factor=2.4, color=SOROT),
                   Indicate(titik[4], scale_factor=2.4, color=SOROT), run_time=1.6)
            sinema.lahir_rumus(self, r"430 - 412 = 18", titik[4], papan, b=b, warna=TINTA)
            sinema.ganti_rumus(self, papan.utama, r"18 : 420 = 4\%", b=b,
                               run_time=1.6, papan=papan)
            b.main(Indicate(papan.utama, scale_factor=1.2, color=SOROT), run_time=1.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 6 `kapan`: memotong sumbu tidak selalu curang. Suhu tubuh.
        # ==================================================================
        SUHU = [36.5, 37.2, 38.4, 39.1, 38.6]
        suhu_titik = VGroup()
        for i, v in enumerate(SUHU):
            d = Dot(radius=0.062).set_fill(TINTA, 1).set_stroke(LATAR, 1.0)
            z = Z_DASAR + (v - 36.0) / 4.0 * (Z_ATAS - Z_DASAR)
            suhu_titik.add(tegak(d).move_to([xb(i), 0, z]))
        suhu_garis = VGroup()
        for i in range(len(SUHU) - 1):
            z1 = Z_DASAR + (SUHU[i] - 36.0) / 4.0 * (Z_ATAS - Z_DASAR)
            z2 = Z_DASAR + (SUHU[i + 1] - 36.0) / 4.0 * (Z_ATAS - Z_DASAR)
            suhu_garis.add(Line([xb(i), 0, z1], [xb(i + 1), 0, z2]).set_stroke(AKSEN2, 3.2))
        sumbu_suhu = VGroup()
        sumbu_suhu.add(Line([X_KIRI - 0.55, 0, Z_DASAR], [X_KIRI - 0.55, 0, Z_ATAS + 0.24])
                       .set_stroke(REDUP, 2.4))
        for v in (36, 38, 40):
            z = Z_DASAR + (v - 36.0) / 4.0 * (Z_ATAS - Z_DASAR)
            sumbu_suhu.add(Line([X_KIRI - 0.55, 0, z], [X_KIRI - 0.65, 0, z])
                           .set_stroke(REDUP, 1.6))
            sumbu_suhu.add(tegak(rumus(str(v), 19, REDUP)).move_to([X_KIRI - 1.02, 0, z]))
        l_suhu = tegak(sinema.label("suhu tubuh", 20, AKSEN2))
        l_suhu.move_to([xb(1.0), 0, Z_ATAS + 0.10])

        with sinema.babak(self, "kapan", DURASI) as b:
            b.main(FadeOut(titik), FadeOut(garis), FadeOut(angka_data),
                   FadeOut(sumbu_potong), run_time=1.2)
            buang("titik", "garis", "angka data", "sumbu tegak")
            taruh("suhu", VGroup(suhu_titik, suhu_garis))
            taruh("sumbu suhu", sumbu_suhu)
            taruh("label suhu", l_suhu, tulisan=True)
            b.main(FadeIn(sumbu_suhu), run_time=1.0)
            b.main(LaggedStartMap(FadeIn, suhu_titik, lag_ratio=0.16), run_time=1.4)
            b.main(LaggedStartMap(ShowCreation, suhu_garis, lag_ratio=0.16), run_time=1.6)
            b.main(FadeIn(l_suhu), run_time=1.0)
            b.main(Indicate(suhu_garis, scale_factor=1.03, color=AKSEN2), run_time=1.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 7 `beda`: yang membedakan curang dan tidak adalah pemberitahuan.
        # ==================================================================
        l_sebut = tegak(sinema.label("harus disebut", 20, AKSEN))
        l_sebut.move_to([xb(3.0), 0, 1.22])

        with sinema.babak(self, "beda", DURASI) as b:
            sinema.ganti_rumus(self, papan.utama, r"36 \text{ sampai } 40", b=b,
                               run_time=1.4, papan=papan)
            b.main(Indicate(papan.utama, scale_factor=1.2, color=AKSEN2), run_time=1.4)
            taruh("label sebut", l_sebut, tulisan=True)
            b.main(FadeIn(l_sebut), run_time=1.0)
            b.main(Indicate(l_sebut, scale_factor=1.3, color=AKSEN), run_time=1.4)
            b.main(Indicate(suhu_garis, scale_factor=1.03, color=AKSEN2), run_time=1.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 8 `luas`: dilipatduakan dua arah, luasnya empat kali.
        # ==================================================================
        kotak_kecil = Rectangle(width=0.84, height=0.84).set_fill(AKSEN2, 0.6).set_stroke(AKSEN2, 2.0)
        kotak_kecil = tegak(kotak_kecil).move_to([-2.30, 0, -0.10])
        kotak_besar = Rectangle(width=1.68, height=1.68).set_fill(AKSEN, 0.6).set_stroke(AKSEN, 2.0)
        kotak_besar = tegak(kotak_besar).move_to([1.10, 0, 0.32])
        # Yang ditulis LUASNYA. Menulis "2 kali" di bawah persegi kecil terbaca
        # seolah persegi kecil itu yang dua kali lipat.
        l_dua = tegak(rumus(r"1\times", 20, AKSEN2)).move_to([-2.30, 0, -0.76])
        l_empat = tegak(rumus(r"4\times", 20, AKSEN)).move_to([1.10, 0, -0.76])

        with sinema.babak(self, "luas", DURASI) as b:
            b.main(FadeOut(VGroup(suhu_titik, suhu_garis)), FadeOut(l_suhu),
                   FadeOut(l_sebut), FadeOut(sumbu_suhu),
                   FadeOut(VGroup(sumbu_datar, nama_bulan)), run_time=1.2)
            buang("suhu", "sumbu suhu", "label suhu", "label sebut", "sumbu datar")
            sinema.ganti_rumus(self, papan.utama, r"2 \times 2 = 4", b=b,
                               run_time=1.4, papan=papan)
            taruh("kotak kecil", kotak_kecil)
            b.main(FadeIn(kotak_kecil), run_time=1.0)
            taruh("kotak besar", kotak_besar)
            b.main(TransformFromCopy(kotak_kecil, kotak_besar), run_time=2.0)
            taruh("label dua", l_dua, tulisan=True)
            taruh("label empat", l_empat, tulisan=True)
            b.main(FadeIn(l_dua), FadeIn(l_empat), run_time=1.0)
            b.main(Indicate(kotak_besar, scale_factor=1.08, color=AKSEN), run_time=1.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 9 `ratarata`: dua angka, dua kesan, keduanya benar.
        # ==================================================================
        l_mean = tegak(rumus(r"\bar{x} = 12{,}22", 22, AKSEN)).move_to([-2.30, 0, 0.62])
        l_med = tegak(rumus(r"Me = 5{,}1", 22, AKSEN2)).move_to([0.90, 0, 0.62])
        l_sama = tegak(sinema.label("keduanya benar", 20, TINTA))
        l_sama.move_to([-0.70, 0, -0.62])

        with sinema.babak(self, "ratarata", DURASI) as b:
            b.main(FadeOut(VGroup(kotak_kecil, kotak_besar)), FadeOut(l_dua),
                   FadeOut(l_empat), run_time=1.0)
            buang("kotak kecil", "kotak besar", "label dua", "label empat")
            sinema.ganti_rumus(self, papan.utama, r"\bar{x} \neq Me", b=b,
                               run_time=1.2, papan=papan)
            taruh("mean kantor", l_mean, tulisan=True)
            b.main(FadeIn(l_mean, shift=UP * 0.2), run_time=1.2)
            taruh("median kantor", l_med, tulisan=True)
            b.main(FadeIn(l_med, shift=UP * 0.2), run_time=1.2)
            taruh("label sama", l_sama, tulisan=True)
            b.main(FadeIn(l_sama), run_time=1.0)
            b.main(Indicate(l_mean, scale_factor=1.2, color=AKSEN),
                   Indicate(l_med, scale_factor=1.2, color=AKSEN2), run_time=1.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 10 `tanya`: tiga pertanyaan, penutup seluruh topik.
        # ==================================================================
        # Kalimat penuh di layar adalah pengulangan mentah narasi dan subtitle,
        # persis yang dilarang ARYA 2 Sep. Yang tampil kata kunci dua kata
        # bernomor: menguatkan tanpa mengulang.
        # Dibangun di bidang xy, DIDIRIKAN, baru ditaruh. Urutan sebaliknya
        # membuat `tegak()` memutar tiap baris di sekitar pusatnya sendiri
        # sehingga ketiganya mendarat di ketinggian yang sama dan bertumpuk
        # (ditangkap pemeriksa tulisan buatan adegan ini, render kedua).
        baris_tanya = []
        for nomor, kata, warna in (("1", "sumbunya", TINTA),
                                   ("2", "datanya", TINTA),
                                   ("3", "yang hilang", AKSEN)):
            g = VGroup(rumus(nomor, 26, REDUP), sinema.label(kata, 26, warna))
            g.arrange(RIGHT, buff=0.34)
            baris_tanya.append(tegak(g))
        lebar_maks = max(g.get_width() for g in baris_tanya)
        for i, g in enumerate(baris_tanya):
            g.move_to([0.0, 0, 0.66 - i * 0.62])
            g.shift([(-lebar_maks / 2) - g.get_left()[0], 0, 0])   # rata kiri
        tanya = VGroup(*baris_tanya)

        with sinema.babak(self, "tanya", DURASI) as b:
            b.main(FadeOut(l_mean), FadeOut(l_med), FadeOut(l_sama),
                   FadeOut(papan.utama), run_time=1.2)
            buang("mean kantor", "median kantor", "label sama")
            papan.utama = None
            for i, t in enumerate(tanya):
                taruh(f"tanya {i}", t, tulisan=True)
                b.main(FadeIn(t, shift=RIGHT * 0.3), run_time=1.6)
            b.main(Indicate(tanya[2], scale_factor=1.08, color=AKSEN), run_time=1.6)
            b.jeda(1.4)
        periksa()
