"""Ruang Tiga Dimensi, materi 01: "Gambar ruang boleh berbohong" (ManimGL).

STANDAR VIDEO v3 (9 September 2026). Ditulis ulang dari versi 85 detik.
Kejadian di layar dipicu oleh KATA yang sedang diucapkan (`sinema.JamKata`
dan `b.tunggu_kata`), bukan oleh pembagian waktu per babak.

Naskah   : manim/narasi/ruang-3d-01.json      (30 segmen, 278,9 detik)
Narasi   : python manim/buat_narasi.py ruang-3d-01
Render   : manimgl manim/scenes/ruang_3d_01.py GambarBolehBerbohong -w --hd --config_file manim/hd60.yml
Gabung   : python manim/gabung_audio.py ruang-3d-01 GambarBolehBerbohong --keluar ruang-3d-01.mp4

KENAPA TOPIK INI BOLEH 3D SEPANJANG VIDEO
Standar v3 butir 5 mengunci 2D untuk materi 2D dan membatasi pembuka 3D lima
detik. Ruang 3D dikecualikan, dan materi 01 adalah alasannya: seluruh isinya
justru tentang KAMERA yang berbohong. Kamera naik ke pandangan atas dan
tipuannya lahir di depan mata, lalu turun lagi dan tipuan itu runtuh. Di sini
perspektif bukan gangguan, ia bahan ajarnya.

SEGAR-INGAT (standar v3 butir 2)
Vektor Materi 04 "Panjang panah itu Pythagoras", dan Pythagoras SMP. Bukan
hiasan: aturan itu DIPAKAI di babak `panjang-bd` untuk menghitung BD = 6 akar 2.

TATA LETAK LAYAR
  kiri atas       `sinema.identitas`, menetap
  kanan atas      `sinema.PapanRumus`, hitungan
  kaki layar      MILIK SUBTITLE, kosong (dijaga qc)
  dalam gambar    `sinema.label`, maksimal dua kata, menempel pada bendanya

SATU WARNA SATU MAKNA
  AKSEN2 biru  = ruas BD, di LANTAI kubus
  AKSEN merah  = ruas EG, di ATAP kubus
  SOROT ungu   = kesimpulan: jarak 6 satuan, dan kata "bersilangan"
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ruang_3d_umum import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

TOPIK = "ruang-3d-01"
DURASI = durasi(TOPIK)
# Jam KATA, inti standar v3: tiap kejadian dipicu detik kata itu diucapkan.
# URUTAN WAJIB: buat_narasi.py dulu (menghasilkan kata.json), baru render.
KATA = sinema.JamKata(TOPIK)

# BD dan EG sama-sama melewati sumbu tegak di tengah kubus, dan itulah yang
# membuat keduanya tampak menyilang kalau dilihat dari atas.
SILANG_BAWAH = np.array([RUSUK / 2, RUSUK / 2, 0.0])
SILANG_ATAS = np.array([RUSUK / 2, RUSUK / 2, RUSUK])


def kartu_ingat():
    """Kartu segar-ingat: segitiga siku-siku kecil yang menempel di layar.

    Ditempel di layar (fix_in_frame), bukan diletakkan di dunia, sebab ia
    bukan bagian dari kubusnya: ia kutipan dari topik Vektor. Ditaruh di
    TENGAH layar, zona yang memang bebas (kiri atas identitas, kanan atas
    panel rumus, kaki layar subtitle).
    """
    a, b = 2.4, 1.6
    kiri = np.array([-1.6, -0.5, 0.0])
    siku = VGroup(
        Line(kiri, kiri + RIGHT * a).set_stroke(REDUP, 3),
        Line(kiri + RIGHT * a, kiri + RIGHT * a + UP * b).set_stroke(REDUP, 3),
        Line(kiri, kiri + RIGHT * a + UP * b).set_stroke(AKSEN2, 4),
    )
    tanda = Square(0.22).set_stroke(REDUP, 2.4).move_to(
        kiri + RIGHT * (a - 0.11) + UP * 0.11)
    lab_a = sinema.label("a", warna=REDUP).next_to(siku[0], DOWN, buff=0.14)
    lab_b = sinema.label("b", warna=REDUP).next_to(siku[1], RIGHT, buff=0.14)
    lab_c = sinema.label("c", warna=AKSEN2).move_to(
        kiri + RIGHT * a * 0.45 + UP * (b * 0.62))
    rms = rumus("c^2 = a^2 + b^2", 34, TINTA).next_to(siku, UP, buff=0.5)
    kartu = VGroup(siku, tanda, lab_a, lab_b, lab_c, rms)
    kartu.fix_in_frame()
    return kartu, siku, rms


def dua_garis_pembuka():
    """Dua ruas yang menyilang di layar, gambar pembuka pertanyaannya."""
    p = VGroup(
        Line(np.array([-2.2, -1.1, 0.0]), np.array([2.2, 1.1, 0.0])).set_stroke(AKSEN2, 5),
        Line(np.array([-2.2, 1.1, 0.0]), np.array([2.2, -1.1, 0.0])).set_stroke(AKSEN, 5),
    )
    titik = Dot(ORIGIN, radius=0.11).set_color(SOROT)
    tanya = rumus("?", 60, SOROT).next_to(titik, UP, buff=0.35)
    g = VGroup(p, titik, tanya)
    g.fix_in_frame()
    return g, p, titik, tanya


class GambarBolehBerbohong(AdeganMatra):
    def construct(self):
        frame = self.frame

        kubus = kubus_pejal()
        rangka = rangka_kubus()
        bd = Line(T["B"], T["D"]).set_stroke(AKSEN2, 6)
        eg = Line(T["E"], T["G"]).set_stroke(AKSEN, 6)

        papan_koor = papan_koordinat(frame, tekan={"z": (6,)})
        papan = sinema.PapanRumus(self)

        kamera.pasang_awal(frame, theta=-40, phi=74, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        pasang_cahaya(self, CAHAYA + np.array([16.0, 4.0, -6.0]))
        bayangan = bayangan_kubus().set_opacity(0.0)

        # ---- Babak 1: pertanyaan yang dijawab video ini (standar v3 butir 1).
        pembuka, garis_pembuka, titik_pembuka, tanya = dua_garis_pembuka()
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("dua")
            b.main(ShowCreation(garis_pembuka, lag_ratio=0.4), run_time=0.65)
            b.tunggu_kata("menyilang")
            b.main(FadeIn(titik_pembuka, scale=0.4), run_time=0.7)
            b.tunggu_kata("bertemu")
            b.main(FadeIn(tanya, shift=0.2 * UP), run_time=0.8)
        qc.periksa_adegan(self, {"pertanyaan": pembuka})

        # ---- Babak 2 sampai 4: SEGAR-INGAT. Bukan pemutaran ulang: satu
        #      gambar kunci dari Vektor Materi 04, disebut nomor dan namanya.
        kartu, siku_ingat, rms_ingat = kartu_ingat()
        with sinema.babak(self, "ingat-vektor", DURASI, kata=KATA) as b:
            # Gambar pembukanya BERTAHAN sampai penggantinya datang, lalu
            # keduanya bersilang di kata "panjang". Versi pertama memudarkannya
            # di kata "Vektor" (detik 6,62) padahal segitiga segar-ingatnya baru
            # digambar di kata "panjang" (detik 9,80), dan cek_layar_kosong
            # menangkap 3,0 detik layar KOSONG di antaranya.
            b.tunggu_kata("Vektor")
            b.main(Indicate(titik_pembuka, scale_factor=1.8, color=SOROT),
                   run_time=1.0)
            b.tunggu_kata("panjang")
            b.main(FadeOut(pembuka), ShowCreation(siku_ingat, lag_ratio=0.3),
                   run_time=1.5)
            b.tunggu_kata("akar")
            b.main(FadeIn(kartu[1:5]), run_time=0.9)

        with sinema.babak(self, "ingat-smp", DURASI, kata=KATA) as b:
            b.tunggu_kata("segitiga")
            b.main(Indicate(siku_ingat, color=SOROT), run_time=1.2)
            b.tunggu_kata("kuadrat")
            b.main(FadeIn(rms_ingat, shift=0.2 * UP), run_time=1.0)

        bawa = VGroup(
            sinema.label("koordinat", warna=SOROT),
            sinema.label("Pythagoras", warna=SOROT),
        ).arrange(RIGHT, buff=1.1).next_to(kartu, DOWN, buff=0.6)
        bawa.fix_in_frame()
        with sinema.babak(self, "ingat-bawa", DURASI, kata=KATA) as b:
            b.tunggu_kata("koordinat")
            b.main(FadeIn(bawa[0]), run_time=0.7)
            b.tunggu_kata("Pythagoras")
            b.main(FadeIn(bawa[1]), run_time=0.7)
        qc.periksa_adegan(self, {})

        # ---- Babak 5: bendanya datang. Kubus PEJAL dulu, benda sebelum rangka.
        self.add(lantai(), bayangan, *papan_koor["datar"], *papan_koor["tinggi"])
        jati = sinema.identitas(self, "panjang = lebar = tinggi = 6 satuan")
        self.remove(jati)
        with sinema.babak(self, "kubus", DURASI, kata=KATA) as b:
            # Kartu segar-ingat baru dipudarkan BERSAMAAN dengan datangnya
            # kubus, bukan di ujung babak sebelumnya. Diukur: memudarkannya
            # lebih awal meninggalkan 1,54 detik layar kosong, tepat di bawah
            # ambang cek_layar_kosong sehingga lolos tanpa dilaporkan.
            tunggu_kata_bergeser(b, frame, "kubus")
            b.main(FadeOut(kartu), FadeOut(bawa),
                   FadeIn(kubus, scale=0.72), bayangan.animate.set_opacity(0.16),
                   run_time=1.3)
            b.main(self.camera.light_source.animate.move_to(CAHAYA), run_time=1.4)
            tunggu_kata_bergeser(b, frame, "enam")
            self.add(jati)
            b.main(FadeIn(jati), run_time=0.8)
        qc.periksa_adegan(self, {"kubus": kubus, "identitas": jati})

        # ---- Babak 6: dinding tembus pandang, kedelapan huruf satu per satu.
        lab = huruf_sudut(frame, {"B": AKSEN2, "D": AKSEN2, "E": AKSEN, "G": AKSEN})
        with sinema.babak(self, "rangka", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "tembus")
            b.main(kubus.animate.set_opacity(0.14),
                   ShowCreation(rangka, lag_ratio=0.16),
                   FadeOut(bayangan), run_time=1.6)
            tunggu_kata_bergeser(b, frame, "Kedelapan")
            # Kameranya TETAP bergeser sementara hurufnya muncul: delapan huruf
            # kecil sendirian tidak terbaca sebagai gerakan (temuan 4 Sep).
            for nama in sorted(lab):
                b.main(FadeIn(lab[nama]), kamera.putar_pelan(frame, 0.7), run_time=0.42)
        qc.periksa_adegan(self, {"kubus": kubus, "huruf B": lab["B"],
                                 "huruf G": lab["G"], "identitas": jati})

        # ---- Babak 7: koordinat, alat pertama yang dibawa dari segar-ingat.
        with sinema.babak(self, "koordinat", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "asal")
            b.main(Indicate(lab["A"], scale_factor=1.7, color=SOROT), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "enam")
            b.main(Indicate(lab["B"], scale_factor=1.7, color=AKSEN2), run_time=0.9)
            tunggu_kata_bergeser(b, frame, "enam", ke=2)
            b.main(Indicate(lab["D"], scale_factor=1.7, color=AKSEN2), run_time=0.9)
            tunggu_kata_bergeser(b, frame, "enam", ke=3)
            b.main(Indicate(lab["E"], scale_factor=1.7, color=AKSEN), run_time=0.9)
        qc.periksa_adegan(self, {"huruf A": lab["A"], "identitas": jati})

        # ---- Babak 8: dua ruas, masing-masing digambar saat warnanya disebut.
        n_bd = label_hadap(frame, "BD", sepanjang3(T["B"], T["D"], 0.28)
                           + np.array([0.0, -0.60, 0.32]), AKSEN2, 28)
        n_eg = label_hadap(frame, "EG", sepanjang3(T["E"], T["G"], 0.74)
                           + np.array([0.0, 0.60, 0.38]), AKSEN, 28)
        with sinema.babak(self, "dua-ruas", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "biru")
            b.main(ShowCreation(bd), run_time=1.1)
            b.main(FadeIn(n_bd), run_time=0.5)
            tunggu_kata_bergeser(b, frame, "merah")
            b.main(ShowCreation(eg), run_time=1.1)
            b.main(FadeIn(n_eg), run_time=0.5)
        qc.periksa_adegan(self, {"BD": bd, "EG": eg, "nama BD": n_bd,
                                 "nama EG": n_eg, "identitas": jati},
                          [("nama BD", "nama EG")])

        # ---- Babak 9 dan 10: CONTOH ANGKA, dan Pythagoras dari segar-ingat
        #      dipakai betulan. Rumusnya lahir dekat bendanya lalu ke panel.
        langkah_x = Line(T["B"], np.array([RUSUK, RUSUK, 0.0])).set_stroke(REDUP, 4)
        langkah_y = Line(np.array([RUSUK, RUSUK, 0.0]), T["D"]).set_stroke(REDUP, 4)
        n_lx = label_hadap(frame, "6", sepanjang3(T["B"], T["C"], 0.5)
                           + np.array([0.66, 0.0, 0.30]), REDUP, 26)
        n_ly = label_hadap(frame, "6", sepanjang3(T["C"], T["D"], 0.5)
                           + np.array([0.0, 0.66, 0.30]), REDUP, 26)
        with sinema.babak(self, "panjang-bd", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "enam")
            b.main(ShowCreation(langkah_x), FadeIn(n_lx), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "enam", ke=2)
            b.main(ShowCreation(langkah_y), FadeIn(n_ly), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "Pythagoras")
            sinema.lahir_rumus(self, r"BD^2 = 6^2 + 6^2 = 72", dekat=bd,
                               papan=papan, b=b, warna=AKSEN2)
        qc.periksa_adegan(self, {"BD": bd, "panel": papan.semua(), "identitas": jati},
                          [("panel", "identitas")])

        with sinema.babak(self, "akar-72", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "Akar")
            papan.baris(r"BD = 6\sqrt{2} \approx 8{,}49", AKSEN2, b=b)
            tunggu_kata_bergeser(b, frame, "nyata")
            b.main(Indicate(bd, color=AKSEN2), run_time=1.1)
            b.main(FadeOut(langkah_x), FadeOut(langkah_y),
                   FadeOut(n_lx), FadeOut(n_ly), run_time=0.7)
        qc.periksa_adegan(self, {"panel": papan.semua(), "identitas": jati},
                          [("panel", "identitas")])

        # ---- Babak 11 sampai 14: TIPUANNYA LAHIR. Kamera naik ke pandangan
        #      atas, dan di situ kedua ruas tampak berpotongan.
        with sinema.babak(self, "naik", DURASI, kata=KATA) as b:
            b.tunggu_kata("naikkan")
            # Hitungan panjang BD sudah selesai dipakai. Dibiarkan menumpuk, ia
            # masih tampil sampai akhir video padahal tidak dibicarakan lagi.
            lama_panel = papan.semua()
            self.hud.remove(*lama_panel)
            b.main(FadeOut(lama_panel), run_time=0.6)
            papan.utama, papan.baris_lain = None, []
            sumbu_z_pamit(b, papan_koor, 0.8)
            b.main(kamera.dunia_ke_peta(frame, pusat=PUSAT, tinggi=TINGGI_BINGKAI),
                   run_time=4.0)
        qc.periksa_adegan(self, {"BD": bd, "EG": eg, "identitas": jati})

        with sinema.babak(self, "dari-atas", DURASI, kata=KATA) as b:
            b.tunggu_kata("persegi")
            b.main(Indicate(rangka, color=REDUP), run_time=1.3)
            b.tunggu_kata("diagonalnya")
            b.main(Indicate(bd, color=AKSEN2), Indicate(eg, color=AKSEN), run_time=1.3)

        tanda_atas = Dot(SILANG_BAWAH, radius=0.13).set_color(SOROT)
        with sinema.babak(self, "silang", DURASI, kata=KATA) as b:
            b.tunggu_kata("menyilang")
            b.main(FadeIn(tanda_atas, scale=0.4), run_time=0.8)
            b.tunggu_kata("berpotongan")
            b.main(Indicate(tanda_atas, scale_factor=2.0, color=SOROT), run_time=1.2)
        qc.periksa_adegan(self, {"BD": bd, "EG": eg, "penunjuk": tanda_atas,
                                 "identitas": jati})

        ajak = sinema.label("coba tebak", warna=SOROT)
        ajak.to_edge(UP, buff=1.1).fix_in_frame()
        with sinema.babak(self, "tebak", DURASI, kata=KATA) as b:
            b.tunggu_kata("tebak")
            b.main(FadeIn(ajak, shift=0.2 * DOWN), run_time=0.8)
            b.tunggu_kata("bertemu")
            b.main(Indicate(ajak, color=SOROT), run_time=1.1)

        # ---- Babak 15 sampai 17: tipuannya RUNTUH begitu kamera turun.
        with sinema.babak(self, "turun", DURASI, kata=KATA) as b:
            b.tunggu_kata("turunkan")
            b.main(FadeOut(ajak), run_time=0.5)
            b.main(kamera.sudut(frame, -30, 72, pusat=PUSAT, tinggi=TINGGI_BINGKAI),
                   run_time=4.2)
        qc.periksa_adegan(self, {"BD": bd, "EG": eg, "identitas": jati})

        with sinema.babak(self, "tidak", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "Tidak")
            b.main(Indicate(bd, color=AKSEN2), Indicate(eg, color=AKSEN), run_time=1.2)
            tunggu_kata_bergeser(b, frame, "biru")
            b.main(Indicate(bd, color=AKSEN2), run_time=1.0)
            tunggu_kata_bergeser(b, frame, "merah")
            b.main(Indicate(eg, color=AKSEN), run_time=1.0)

        titik_bawah = Dot(SILANG_BAWAH, radius=0.12).set_color(AKSEN2)
        titik_atas = Dot(SILANG_ATAS, radius=0.12).set_color(AKSEN)
        with sinema.babak(self, "dua-titik", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "dua")
            b.main(FadeOut(tanda_atas),
                   FadeIn(titik_bawah, scale=0.4), FadeIn(titik_atas, scale=0.4),
                   run_time=1.2)
            tunggu_kata_bergeser(b, frame, "mata")
            b.main(kamera.putar_pelan(frame, 12), run_time=2.0)
        qc.periksa_adegan(self, {"BD": bd, "EG": eg, "titik bawah": titik_bawah,
                                 "titik atas": titik_atas, "identitas": jati})

        # ---- Babak 18 sampai 21: ASAL KESIMPULAN, dibuktikan dengan angka.
        n_bawah = label_hadap(frame, "(3, 3, 0)", SILANG_BAWAH
                              + np.array([1.5, -0.5, 0.45]), AKSEN2, 26, rumus_latex=True)
        n_atas = label_hadap(frame, "(3, 3, 6)", SILANG_ATAS
                             + np.array([1.5, -0.5, 0.45]), AKSEN, 26, rumus_latex=True)
        with sinema.babak(self, "hitung-p", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "tengah")
            b.main(Indicate(titik_bawah, scale_factor=1.8, color=AKSEN2), run_time=1.0)
            b.main(FadeIn(n_bawah), run_time=0.8)
        qc.periksa_adegan(self, {"BD": bd, "letak bawah": n_bawah, "identitas": jati})

        with sinema.babak(self, "hitung-q", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "tengah")
            b.main(Indicate(titik_atas, scale_factor=1.8, color=AKSEN), run_time=1.0)
            b.main(FadeIn(n_atas), run_time=0.8)
        qc.periksa_adegan(self, {"EG": eg, "letak atas": n_atas,
                                 "letak bawah": n_bawah, "identitas": jati},
                          [("letak atas", "letak bawah")])

        with sinema.babak(self, "beda", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "Bandingkan")
            b.main(Indicate(n_bawah, color=AKSEN2), Indicate(n_atas, color=AKSEN),
                   run_time=1.2)
            tunggu_kata_bergeser(b, frame, "berbeda")
            b.main(Indicate(n_atas, scale_factor=1.25, color=SOROT), run_time=1.3)

        tiang = Line(SILANG_BAWAH, SILANG_ATAS).set_stroke(SOROT, 7)
        n_enam = label_hadap(frame, "6", (SILANG_BAWAH + SILANG_ATAS) / 2
                             + np.array([0.75, 0.0, 0.0]), SOROT, 32)
        with sinema.babak(self, "jarak", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "jaraknya")
            b.main(ShowCreation(tiang), run_time=1.2)
            sumbu_z_muncul(b, papan_koor, 0.8)
            b.main(FadeIn(n_enam), run_time=0.6)
            tunggu_kata_bergeser(b, frame, "rusuk")
            b.main(Indicate(tiang, color=SOROT), run_time=1.2)
        qc.periksa_adegan(self, {"tiang": tiang, "nilai jarak": n_enam,
                                 "identitas": jati})

        # ---- Babak 22 sampai 24: kenapa gambarnya menyesatkan.
        bayang_bd = Line(T["B"], T["D"]).set_stroke(AKSEN2, 4).set_opacity(0.35)
        bayang_eg = Line(np.array([0.0, 0.0, 0.02]), np.array([RUSUK, RUSUK, 0.02])
                         ).set_stroke(AKSEN, 4).set_opacity(0.35)
        with sinema.babak(self, "kenapa", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "membuang")
            b.main(Indicate(tiang, scale_factor=1.15, color=SOROT), run_time=1.3)
            tunggu_kata_bergeser(b, frame, "tinggi")
            b.main(kamera.sudut(frame, -18, 60, pusat=PUSAT, tinggi=TINGGI_BINGKAI),
                   run_time=1.6)

        with sinema.babak(self, "bayangan", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "bayangan")
            b.main(ShowCreation(bayang_eg), run_time=1.4)
            tunggu_kata_bergeser(b, frame, "berpotongan")
            b.main(Indicate(bayang_eg, color=AKSEN), Indicate(bd, color=AKSEN2),
                   run_time=1.3)
        qc.periksa_adegan(self, {"BD": bd, "bayangan EG": bayang_eg,
                                 "tiang": tiang, "identitas": jati})

        with sinema.babak(self, "kubus-tetap", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "kubusnya")
            b.main(FadeOut(bayang_eg), Indicate(rangka, color=SOROT), run_time=1.4)
            tunggu_kata_bergeser(b, frame, "berubah", ke=2)
            b.main(kamera.putar_pelan(frame, 16), run_time=3.0)

        # ---- Babak 25 sampai 28: BENTUK UMUM, dari contoh tadi ke aturannya.
        payung = label_hadap(frame, "bersilangan", SILANG_ATAS
                             + np.array([-2.2, 0.0, 0.7]), SOROT, 30)
        with sinema.babak(self, "nama", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "bersilangan")
            b.main(FadeIn(payung), run_time=0.9)
            b.main(Indicate(payung, color=SOROT), run_time=1.0)
        qc.periksa_adegan(self, {"payung": payung, "tiang": tiang,
                                 "identitas": jati, "panel": papan.semua()},
                          [("payung", "panel")])

        with sinema.babak(self, "umum-syarat", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "berpotongan")
            papan.baris(r"\text{berpotongan}", REDUP, b=b)
            tunggu_kata_bergeser(b, frame, "sejajar")
            papan.baris(r"\text{sejajar}", REDUP, b=b)
            tunggu_kata_bergeser(b, frame, "bersilangan")
            papan.baris(r"\text{bersilangan}", SOROT, b=b)
        qc.periksa_adegan(self, {"panel": papan.semua(), "identitas": jati},
                          [("panel", "identitas")])

        with sinema.babak(self, "umum-uji", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "koordinat")
            b.main(Indicate(n_bawah, color=AKSEN2), Indicate(n_atas, color=AKSEN),
                   run_time=1.4)
            tunggu_kata_bergeser(b, frame, "berpotongan")
            b.main(kamera.putar_pelan(frame, 8), run_time=1.8)

        with sinema.babak(self, "umum-gagal", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "bersilangan")
            b.main(Indicate(payung, scale_factor=1.2, color=SOROT), run_time=1.3)
            tunggu_kata_bergeser(b, frame, "Persis")
            b.main(Indicate(bd, color=AKSEN2), Indicate(eg, color=AKSEN), run_time=1.3)

        # ---- Babak 29 dan 30: PENUTUP, lalu menunjuk video berikutnya.
        pesan = label_hadap(frame, "angka memutuskan", SILANG_BAWAH
                            + np.array([-2.4, 0.0, -0.55]), SOROT, 30)
        with sinema.babak(self, "pesan", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "menduga")
            b.main(kamera.putar_pelan(frame, 5), run_time=1.1)
            tunggu_kata_bergeser(b, frame, "angka")
            b.main(FadeIn(pesan), run_time=0.9)
        qc.periksa_adegan(self, {"pesan": pesan, "payung": payung,
                                 "tiang": tiang, "identitas": jati},
                          [("pesan", "payung")])

        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            tunggu_kata_bergeser(b, frame, "berikutnya")
            b.main(Indicate(pesan, color=SOROT), run_time=1.2)
            tunggu_kata_bergeser(b, frame, "jarak")
            b.main(Indicate(tiang, scale_factor=1.15, color=SOROT), run_time=1.4)
        qc.periksa_adegan(self, {"pesan": pesan, "tiang": tiang, "identitas": jati})

        # Gerbang v3: tiap pemicu harus jatuh di detik katanya, selisih < 0,15.
        sinema.laporkan_pemicu(self)
