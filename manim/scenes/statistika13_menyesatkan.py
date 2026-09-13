"""Statistika Materi 13, Hubungan Dua Variabel Bagian 4: grafik yang
menyesatkan (ManimGL). Video penutup topik Statistika.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (1:58)
yang sudah disetujui ARYA. DUNIANYA SAMA: titik data yang TIDAK PERNAH dibuat
ulang dipindahkan oleh sumbunya sendiri (dari nol lalu dipotong dari 410),
angka di sampingnya tetap tertulis; 18 dari 420 = 4 persen; suhu tubuh;
persegi yang dilipatduakan dua arah; mean lawan median kantor; tiga
pertanyaan.

YANG BERBEDA: pembuka sub-bab plus Bagian 4 dengan pertanyaan halaman
(grafik lonjakan tajam dengan tanda centang angka dan tanda tanya kesimpulan);
segar-ingat Penyajian Data Bagian 1 (satu angka bisa menipu); tiga
pertanyaan sebagai aturan tetap; penutup menjawab pertanyaan pembuka lalu
menunjuk Penerapan Statistika; tiap kejadian dipicu pada KATA; sorotan
memakai pita tembus pandang.

Data pengunjung perpustakaan lima bulan: 412, 418, 425, 421, 430.

SATU WARNA SATU MAKNA: AKSEN2 biru = grafik jujur (sumbu dari nol), AKSEN
bata = grafik yang menyesatkan dan peringatan, SOROT ungu = angka yang tidak
berubah dan sorotan, TINTA = tulisan, REDUP = sumbu dan angkanya. Kamera
phi 90, tidak pernah dimiringkan (isi videonya perbandingan kemiringan).
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
KATA = sinema.JamKata(TOPIK)

BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei"]
KUNJUNG = [412, 418, 425, 421, 430]
DASAR_JUJUR = 0
DASAR_POTONG = 410
ATAS_JUJUR = 450
ATAS_POTONG = 434

X_KIRI, X_KANAN = -3.20, 2.60
Z_DASAR, Z_ATAS = -1.10, 2.10
Z_ANGKA = Z_DASAR - 0.34
Z_KAMERA = 0.50
TINGGI_BINGKAI = 6.4


def tegak(mob):
    """Berdirikan benda datar di bidang xz supaya menghadap kamera."""
    return mob.rotate(90 * DEGREES, RIGHT)


def xb(i):
    return X_KIRI + (X_KANAN - X_KIRI) * i / (len(BULAN) - 1)


class Menyesatkan13(AdeganMatra):
    samples = 4                        # penghalus tepi; bawaan ManimGL 0

    def sorot_pita(self, b, *mobs, lama=1.0, lebih=0.2):
        pita = VGroup()
        for m in mobs:
            p = Rectangle(width=m.get_width() + lebih, height=m.get_depth() + lebih)
            p.set_stroke(width=0).set_fill(SOROT, 0.35)
            pita.add(tegak(p).move_to(m.get_center() + IN * 0.02))
        self.add(pita)
        b.main(FadeIn(pita), run_time=lama * 0.35)
        b.main(FadeOut(pita), run_time=lama * 0.65)
        self.remove(pita)

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        DUNIA, HUD, TULISAN = {}, {}, {}

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
            hidup_t = {k: v for k, v in TULISAN.items() if v is not None}
            qc.periksa_adegan(self, {}, pasangan=pasangan, hud=hidup_h,
                              dunia=hidup_d, tulisan=hidup_t, jaga_jalur_bawah=True)

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
            g.add(Line([X_KIRI - 0.55, 0, Z_DASAR], [X_KIRI - 0.55, 0, Z_ATAS + 0.24]).set_stroke(REDUP, 2.4))
            for v in tangga_angka(bawah, atas, langkah):
                z = zp(v, bawah, atas)
                g.add(Line([X_KIRI - 0.55, 0, z], [X_KIRI - 0.65, 0, z]).set_stroke(REDUP, 1.6))
                g.add(tegak(rumus(str(int(v)), 19, REDUP)).move_to([X_KIRI - 1.02, 0, z]))
            return g

        def buat_titik_garis(bawah, atas, warna=AKSEN2):
            t = VGroup()
            for i, v in enumerate(KUNJUNG):
                d = Dot(radius=0.062).set_fill(TINTA, 1).set_stroke(LATAR, 1.0)
                t.add(tegak(d).move_to([xb(i), 0, zp(v, bawah, atas)]))
            g = VGroup(*[Line([xb(i), 0, zp(KUNJUNG[i], bawah, atas)], [xb(i + 1), 0, zp(KUNJUNG[i + 1], bawah, atas)])
                         .set_stroke(warna, 3.2) for i in range(len(KUNJUNG) - 1)])
            return t, g

        sumbu_datar = Line([X_KIRI - 0.55, 0, Z_DASAR], [X_KANAN + 0.45, 0, Z_DASAR]).set_stroke(REDUP, 2.4)
        nama_bulan = VGroup(*[tegak(teks(b, 19, REDUP)).move_to([xb(i), 0, Z_ANGKA]) for i, b in enumerate(BULAN)])

        sumbu_jujur = buat_sumbu_tegak(DASAR_JUJUR, ATAS_JUJUR, 150)
        sumbu_potong = buat_sumbu_tegak(DASAR_POTONG, ATAS_POTONG, 6)
        titik, garis = buat_titik_garis(DASAR_JUJUR, ATAS_JUJUR)
        titik_potong, garis_potong = buat_titik_garis(DASAR_POTONG, ATAS_POTONG, AKSEN)

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
        # buka: judul sub-bab; grafik lonjakan tajam (sumbu dipotong) sebagai
        # pertanyaan: angkanya dicentang, kesimpulannya ditanya.
        # ==================================================================
        kamera.pasang_awal(frame, theta=0, phi=90, pusat=(0, 0, Z_KAMERA), tinggi=TINGGI_BINGKAI)
        titik_buka, garis_buka = buat_titik_garis(DASAR_POTONG, ATAS_POTONG, AKSEN)
        angka_buka = buat_angka_data(DASAR_POTONG, ATAS_POTONG)
        centang = tegak(rumus(r"\checkmark", 30, AKSEN2)).move_to([X_KANAN + 1.0, 0, zp(430, DASAR_POTONG, ATAS_POTONG) + 0.3])
        tanya = tegak(rumus("?", 44, SOROT)).move_to([X_KANAN + 1.0, 0, zp(418, DASAR_POTONG, ATAS_POTONG)])
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Hubungan")
            sinema.judul_pembuka(self, "Hubungan Dua Variabel, Bagian 4", lama=3.2, y=2.6)
            b.catat(3.2)
            b.tunggu_kata("Semua")
            taruh("sumbu datar", VGroup(sumbu_datar, nama_bulan))
            taruh("sumbu tegak", sumbu_potong)
            taruh("titik", titik_buka)
            taruh("garis", garis_buka)
            taruh("angka data", angka_buka)
            b.main(ShowCreation(sumbu_datar), FadeIn(nama_bulan), FadeIn(sumbu_potong), FadeIn(titik_buka),
                   FadeIn(garis_buka), FadeIn(angka_buka), run_time=0.8)
            b.tunggu_kata("benar")
            taruh("centang", centang, tulisan=True)
            b.main(FadeIn(centang, scale=1.5), run_time=0.5)
            b.tunggu_kata("salah")
            taruh("tanya", tanya, tulisan=True)
            b.main(FadeIn(tanya, shift=0.2 * OUT), run_time=0.5)
        periksa()

        # ==================================================================
        # ingat: satu angka bisa menipu (Bagian 1); hari ini gambarnya.
        # ==================================================================
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Penyajian")
            b.main(FadeOut(centang), FadeOut(tanya), FadeOut(titik_buka), FadeOut(garis_buka), FadeOut(angka_buka),
                   FadeOut(sumbu_potong), run_time=0.6)
            buang("centang", "tanya", "titik", "garis", "angka data", "sumbu tegak")
            b.tunggu_kata("satu angka")
            dua_rata = VGroup(tegak(rumus(r"\bar{x}_A = 7", 30, REDUP)).move_to([-1.4, 0, 0.9]),
                              tegak(rumus(r"\bar{x}_B = 7", 30, REDUP)).move_to([1.4, 0, 0.9]))
            taruh("dua rata", dua_rata, tulisan=True)
            b.main(FadeIn(dua_rata), run_time=0.7)
            b.tunggu_kata("gambar")
            b.main(FadeOut(dua_rata), run_time=0.4)
            buang("dua rata")
            HUD["identitas"] = sinema.identitas(self, "pengunjung perpustakaan", "5 bulan, orang per bulan")
            HUD["identitas"].set_opacity(0)
            b.main(HUD["identitas"].animate.set_opacity(1), run_time=0.5)
            b.tunggu_kata("menyesatkan")
            self.sorot_pita(b, VGroup(sumbu_datar, nama_bulan), lama=1.0, lebih=0.3)
        periksa()

        # ==================================================================
        # data: sumbu dari nol, lima titik dengan angkanya, satu per satu.
        # ==================================================================
        with sinema.babak(self, "data", DURASI, kata=KATA) as b:
            b.tunggu_kata("Perpustakaan")
            taruh("sumbu tegak", sumbu_jujur)
            b.main(FadeIn(sumbu_jujur), run_time=0.8)
            taruh("titik", titik)
            taruh("angka data", angka_data)
            for frasa, i in (("empat ratus dua belas", 0), ("empat ratus delapan", 1), ("empat ratus dua puluh lima", 2),
                             ("empat ratus dua puluh satu", 3), ("empat ratus tiga", 4)):
                b.tunggu_kata(frasa)
                b.main(FadeIn(titik[i], scale=0.4), FadeIn(angka_data[i]), run_time=0.5)
        periksa()

        # ==================================================================
        # jujur: garisnya nyaris rata.
        # ==================================================================
        l_rata = tegak(sinema.label("nyaris rata", 20, AKSEN2)).move_to([xb(2), 0, zp(421) - 0.42])
        with sinema.babak(self, "jujur", DURASI, kata=KATA) as b:
            b.tunggu_kata("mulai dari nol")
            b.main(Indicate(sumbu_jujur[2], scale_factor=1.5, color=SOROT), run_time=0.8)
            b.tunggu_kata("garisnya")
            taruh("garis", garis)
            b.main(LaggedStartMap(ShowCreation, garis, lag_ratio=0.2), run_time=0.5)
            b.tunggu_kata("nyaris rata")
            taruh("label rata", l_rata, tulisan=True)
            b.main(FadeIn(l_rata), run_time=0.6)
            b.tunggu_kata("belasan")
            b.main(LaggedStartMap(lambda m, **kw: Indicate(m, scale_factor=1.3, color=SOROT, **kw),
                                  angka_data, lag_ratio=0.15), run_time=1.4)
        periksa()

        # ==================================================================
        # potong: sumbu tegaknya diganti; angka datanya IKUT PINDAH bersama titiknya.
        # ==================================================================
        with sinema.babak(self, "potong", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekarang")
            b.main(FadeOut(l_rata), run_time=0.5)
            buang("label rata")
            b.tunggu_kata("Sumbu y")
            sumbu["bawah"], sumbu["atas"] = DASAR_POTONG, ATAS_POTONG
            taruh("sumbu tegak", sumbu_potong)
            taruh("titik", titik_potong)
            taruh("garis", garis_potong)
            taruh("angka data", angka_data_potong)
            b.main(FadeOut(sumbu_jujur), FadeIn(sumbu_potong), run_time=1.0)
            b.tunggu_kata("empat ratus")
            b.main(*[Transform(a, c) for a, c in zip(titik, titik_potong)],
                   *[Transform(a, c) for a, c in zip(garis, garis_potong)],
                   *[Transform(a, c) for a, c in zip(angka_data, angka_data_potong)], run_time=1.6)
            b.tunggu_kata("Satu pun")
            b.main(LaggedStartMap(lambda m, **kw: Indicate(m, scale_factor=1.3, color=SOROT, **kw),
                                  angka_data, lag_ratio=0.15), run_time=1.4)
        periksa()

        # ==================================================================
        # lonjak: kesannya berubah total, angkanya satu pun tidak.
        # ==================================================================
        l_lonjak = tegak(sinema.label("lonjakan tajam", 20, AKSEN)).move_to([xb(1.1), 0, zp(429)])
        with sinema.babak(self, "lonjak", DURASI, kata=KATA) as b:
            b.tunggu_kata("lonjakan")
            taruh("label lonjak", l_lonjak, tulisan=True)
            b.main(FadeIn(l_lonjak), run_time=0.6)
            b.main(Indicate(garis, scale_factor=1.03, color=SOROT), run_time=0.9)
            b.tunggu_kata("titiknya")
            b.main(LaggedStartMap(lambda m, **kw: Indicate(m, scale_factor=1.8, color=SOROT, **kw),
                                  titik, lag_ratio=0.15), run_time=1.2)
            b.tunggu_kata("angkanya")
            b.main(LaggedStartMap(lambda m, **kw: Indicate(m, scale_factor=1.3, color=SOROT, **kw),
                                  angka_data, lag_ratio=0.15), run_time=1.0)
            b.tunggu_kata("datanya satu")
            b.main(FadeOut(l_lonjak), run_time=0.5)
            buang("label lonjak")
        periksa()

        # ==================================================================
        # berapa: seberapa besar kenaikannya sebenarnya.
        # ==================================================================
        with sinema.babak(self, "berapa", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dari")
            b.main(Indicate(titik[0], scale_factor=2.4, color=SOROT), Indicate(titik[4], scale_factor=2.4, color=SOROT),
                   run_time=1.0)
            b.tunggu_kata("jadi")
            sinema.lahir_rumus(self, r"430 - 412 = 18", titik[4], papan, b=b, warna=TINTA, ukuran_lahir=44,
                               tahan=0.3, run_time=0.7, geser=UP * 0.9 + LEFT * 1.2)
            b.tunggu_kata("Dibandingkan")
            papan.baris(r"18 : 420 = 4\%", AKSEN, b=b)
            b.tunggu_kata("empat persen")
            b.main(Indicate(papan.baris_lain[-1], scale_factor=1.0, color=SOROT), run_time=0.9)
        periksa()

        # ==================================================================
        # kapan: memotong sumbu tidak selalu curang. Suhu tubuh.
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
        sumbu_suhu.add(Line([X_KIRI - 0.55, 0, Z_DASAR], [X_KIRI - 0.55, 0, Z_ATAS + 0.24]).set_stroke(REDUP, 2.4))
        for v in (36, 38, 40):
            z = Z_DASAR + (v - 36.0) / 4.0 * (Z_ATAS - Z_DASAR)
            sumbu_suhu.add(Line([X_KIRI - 0.55, 0, z], [X_KIRI - 0.65, 0, z]).set_stroke(REDUP, 1.6))
            sumbu_suhu.add(tegak(rumus(str(v), 19, REDUP)).move_to([X_KIRI - 1.02, 0, z]))
        l_suhu = tegak(sinema.label("suhu tubuh", 20, AKSEN2)).move_to([xb(1.0), 0, Z_ATAS + 0.10])

        with sinema.babak(self, "kapan", DURASI, kata=KATA) as b:
            b.tunggu_kata("tidak selalu")
            b.main(FadeOut(titik), FadeOut(garis), FadeOut(angka_data), FadeOut(sumbu_potong), FadeOut(papan.semua()),
                   run_time=0.8)
            buang("titik", "garis", "angka data", "sumbu tegak")
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self)
            b.tunggu_kata("suhu tubuh")
            taruh("suhu", VGroup(suhu_titik, suhu_garis))
            taruh("sumbu suhu", sumbu_suhu)
            taruh("label suhu", l_suhu, tulisan=True)
            b.main(FadeIn(sumbu_suhu), FadeIn(l_suhu), run_time=0.7)
            b.main(LaggedStartMap(FadeIn, suhu_titik, lag_ratio=0.16), LaggedStartMap(ShowCreation, suhu_garis, lag_ratio=0.16),
                   run_time=1.2)
            b.tunggu_kata("selisih")
            self.sorot_pita(b, suhu_garis, lama=1.2, lebih=0.3)
        periksa()

        # ==================================================================
        # beda: yang membedakan curang dan tidak adalah pemberitahuan.
        # ==================================================================
        l_sebut = tegak(sinema.label("harus disebut", 20, AKSEN)).move_to([xb(3.0), 0, 1.22])
        with sinema.babak(self, "beda", DURASI, kata=KATA) as b:
            b.tunggu_kata("bukan pemotongannya")
            papan.tumbuh(r"36 \text{ sampai } 40", None, run_time=0.9, b=b)
            b.tunggu_kata("diberitahukan")
            taruh("label sebut", l_sebut, tulisan=True)
            b.main(FadeIn(l_sebut), Indicate(sumbu_suhu[2], scale_factor=1.4, color=SOROT), run_time=0.8)
            b.tunggu_kata("disembunyikan")
            b.main(Indicate(l_sebut, scale_factor=1.3, color=AKSEN), run_time=0.9)
        periksa()

        # ==================================================================
        # luas: dilipatduakan dua arah, luasnya empat kali.
        # ==================================================================
        kotak_kecil = tegak(Rectangle(width=0.84, height=0.84).set_fill(AKSEN2, 0.6).set_stroke(AKSEN2, 2.0)).move_to([-2.30, 0, -0.10])
        kotak_besar = tegak(Rectangle(width=1.68, height=1.68).set_fill(AKSEN, 0.6).set_stroke(AKSEN, 2.0)).move_to([1.10, 0, 0.32])
        l_dua = tegak(rumus(r"1\times", 20, AKSEN2)).move_to([-2.30, 0, -0.76])
        l_empat = tegak(rumus(r"4\times", 20, AKSEN)).move_to([1.10, 0, -0.76])
        with sinema.babak(self, "luas", DURASI, kata=KATA) as b:
            b.tunggu_kata("Cara lain")
            b.main(FadeOut(VGroup(suhu_titik, suhu_garis)), FadeOut(l_suhu), FadeOut(l_sebut), FadeOut(sumbu_suhu),
                   FadeOut(VGroup(sumbu_datar, nama_bulan)), FadeOut(papan.semua()), run_time=0.8)
            buang("suhu", "sumbu suhu", "label suhu", "label sebut", "sumbu datar")
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self)
            b.tunggu_kata("harga")
            taruh("kotak kecil", kotak_kecil)
            b.main(FadeIn(kotak_kecil), run_time=0.7)
            b.tunggu_kata("tinggi dan")
            taruh("kotak besar", kotak_besar)
            b.main(TransformFromCopy(kotak_kecil, kotak_besar), run_time=1.4)
            b.tunggu_kata("Luasnya")
            papan.tumbuh(r"2 \times 2 = 4", None, run_time=0.9, b=b)
            taruh("label dua", l_dua, tulisan=True)
            taruh("label empat", l_empat, tulisan=True)
            b.main(FadeIn(l_dua), FadeIn(l_empat), run_time=0.6)
            b.tunggu_kata("membaca luas")
            self.sorot_pita(b, kotak_besar, lama=1.0, lebih=0.2)
        periksa()

        # ==================================================================
        # ratarata: dua angka, dua kesan, keduanya benar.
        # ==================================================================
        l_mean = tegak(rumus(r"\bar{x} = 12{,}22", 22, AKSEN)).move_to([-2.30, 0, 0.62])
        l_med = tegak(rumus(r"Me = 5{,}1", 22, AKSEN2)).move_to([0.90, 0, 0.62])
        l_sama = tegak(sinema.label("keduanya benar", 20, TINTA)).move_to([-0.70, 0, -0.62])
        sym_mean = tegak(rumus(r"\bar{x}", 30, AKSEN)).move_to([-2.30, 0, 0.62])
        sym_med = tegak(rumus(r"Me", 30, AKSEN2)).move_to([0.90, 0, 0.62])
        with sinema.babak(self, "ratarata", DURASI, kata=KATA) as b:
            b.tunggu_kata("Cara ketiga")
            b.main(FadeOut(VGroup(kotak_kecil, kotak_besar)), FadeOut(l_dua), FadeOut(l_empat), FadeOut(papan.semua()),
                   run_time=0.7)
            buang("kotak kecil", "kotak besar", "label dua", "label empat")
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self)
            # Lambangnya dulu, angkanya menyusul pada katanya: tanpa ini layar
            # kosong 8 detik (cek_layar_kosong 12 Sep).
            b.tunggu_kata("rata-rata")
            taruh("mean kantor", sym_mean, tulisan=True)
            taruh("median kantor", sym_med, tulisan=True)
            b.main(FadeIn(sym_mean, shift=UP * 0.2), FadeIn(sym_med, shift=UP * 0.2), run_time=0.7)
            b.tunggu_kata("dua belas")
            taruh("mean kantor", l_mean, tulisan=True)
            b.main(FadeOut(sym_mean), FadeIn(l_mean, shift=UP * 0.2), run_time=0.7)
            b.tunggu_kata("lima koma")
            taruh("median kantor", l_med, tulisan=True)
            b.main(FadeOut(sym_med), FadeIn(l_med, shift=UP * 0.2), run_time=0.7)
            b.tunggu_kata("Keduanya")
            taruh("label sama", l_sama, tulisan=True)
            b.main(FadeIn(l_sama), run_time=0.6)
        periksa()

        # ==================================================================
        # tanya: tiga pertanyaan sebagai aturan tetap.
        # ==================================================================
        baris_tanya = []
        for nomor, kata, warna in (("1", "sumbunya", TINTA), ("2", "datanya", TINTA), ("3", "yang hilang", AKSEN)):
            g = VGroup(rumus(nomor, 26, REDUP), sinema.label(kata, 26, warna))
            g.arrange(RIGHT, buff=0.34)
            baris_tanya.append(tegak(g))
        lebar_maks = max(g.get_width() for g in baris_tanya)
        for i, g in enumerate(baris_tanya):
            g.move_to([0.0, 0, 0.66 - i * 0.62])
            g.shift([(-lebar_maks / 2) - g.get_left()[0], 0, 0])
        tiga_tanya = VGroup(*baris_tanya)

        with sinema.babak(self, "tanya", DURASI, kata=KATA) as b:
            b.tunggu_kata("tanyakan")
            b.main(FadeOut(l_mean), FadeOut(l_med), FadeOut(l_sama), run_time=0.4)
            buang("mean kantor", "median kantor", "label sama")
            b.tunggu_kata("tiga hal")
            for i in range(3):
                taruh(f"tanya {i}", tiga_tanya[i], tulisan=True)
                tiga_tanya[i][1].set_opacity(0.22)
            b.main(LaggedStartMap(FadeIn, tiga_tanya, lag_ratio=0.3), run_time=0.9)
            for frasa, i in (("Sumbunya", 0), ("Datanya", 1), ("paling sering", 2)):
                b.tunggu_kata(frasa)
                b.main(tiga_tanya[i][1].animate.set_opacity(1), run_time=0.7)
            b.tunggu_kata("tidak ditampilkan")
            b.main(Indicate(tiga_tanya[2], scale_factor=1.08, color=AKSEN), run_time=1.0)
        periksa()

        # ==================================================================
        # tutup: jawaban pertanyaan pembuka.
        # ==================================================================
        l_cara = tegak(sinema.label("cara membacanya", 26, SOROT)).move_to([0.0, 0, -1.4])
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("lewat sumbu")
            b.main(Indicate(tiga_tanya[0], scale_factor=1.08, color=SOROT), run_time=0.8)
            b.tunggu_kata("lewat luas")
            b.main(Indicate(tiga_tanya[1], scale_factor=1.08, color=SOROT), run_time=0.8)
            b.tunggu_kata("pilihan")
            b.main(Indicate(tiga_tanya[2], scale_factor=1.08, color=SOROT), run_time=0.8)
            b.tunggu_kata("cara membacanya")
            taruh("label cara", l_cara, tulisan=True)
            b.main(FadeIn(l_cara, shift=0.2 * OUT), run_time=0.7)
        periksa()

        # ==================================================================
        # lanjut: Penerapan Statistika.
        # ==================================================================
        judul_lanjut = teks("Penerapan Statistika", 30, SOROT).move_to([0, 2.6, 0]).fix_in_frame()
        ikon = VGroup(
            tegak(sinema.label("survei", 24, TINTA)).move_to([-2.6, 0, 0.6]),
            tegak(sinema.label("cuaca", 24, TINTA)).move_to([0.0, 0, 0.6]),
            tegak(sinema.label("kesehatan", 24, TINTA)).move_to([2.6, 0, 0.6]),
        )
        l_percaya = tegak(sinema.label("sebelum percaya", 26, AKSEN)).move_to([0.0, 0, -0.5])
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Penerapan")
            b.main(FadeOut(tiga_tanya), FadeOut(l_cara), FadeOut(HUD["identitas"]), FadeIn(judul_lanjut, shift=0.2 * UP),
                   run_time=0.7)
            HUD["identitas"] = None
            buang("tanya 0", "tanya 1", "tanya 2", "label cara")
            self.hud_tambah(judul_lanjut)
            HUD["judul lanjut"] = judul_lanjut
            b.tunggu_kata("alat-alat")
            taruh("ikon", ikon, tulisan=True)
            b.main(LaggedStartMap(FadeIn, ikon, lag_ratio=0.25), run_time=1.2)
            b.tunggu_kata("sebelum")
            taruh("label percaya", l_percaya, tulisan=True)
            b.main(FadeIn(l_percaya, shift=0.2 * OUT), run_time=0.7)
        periksa()

        sinema.laporkan_pemicu(self)
