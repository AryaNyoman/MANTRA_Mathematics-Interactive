"""Ruang Tiga Dimensi, materi 01: "Gambar ruang boleh berbohong" (ManimGL).

RUJUKAN RESMI 3D untuk semua sesi (STANDAR-ILUSTRASI-VIDEO versi 2).
Berkas ini dan `ruang_3d_umum.py` dipakai sesi lain sebagai contoh, jadi
kodenya dijaga bersih dari aturan versi 1 yang sudah dibatalkan.

Naskah   : manim/narasi/ruang-3d-01.json
Render   : manimgl manim/scenes/ruang_3d_01.py GambarBolehBerbohong -w -l
Gabung   : python manim/gabung_audio.py ruang-3d-01 GambarBolehBerbohong --uji

KENAPA TOPIK INI BOLEH BOLAK-BALIK 3D DAN 2D
Standar v2 butir 2 mengunci kamera tegak lurus untuk topik lain, sebab
perspektif memendekkan satu arah lebih banyak daripada arah lain sehingga
gambar bisa membantah hitungannya. Ruang 3D dikecualikan ARYA, dan materi 01
adalah alasannya: seluruh isinya justru tentang KAMERA yang berbohong. Kamera
naik ke pandangan atas dan tipuan lahir di depan mata, lalu turun lagi dan
tipuan itu runtuh. Di sini perspektif bukan gangguan, ia bahan ajarnya.

TATA LETAK LAYAR (standar v2 butir 1)
  kiri atas       `sinema.identitas`, menetap
  kanan atas      `sinema.PapanRumus`, hitungan
  kaki layar      MILIK SUBTITLE, kosong (dijaga qc)
  dalam gambar    `sinema.label`, maksimal dua kata, menempel pada bendanya

SATU WARNA SATU MAKNA (butir 10):
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
# Jam kalimat dari .vtt: dipakai supaya kejadian di layar jatuh tepat pada
# kalimat yang menyebutnya. URUTAN WAJIB: buat_narasi.py, buat_subtitle.py,
# BARU render.
JAM = sinema.jam_subtitle(TOPIK)

# BD dan EG sama-sama melewati sumbu tegak di tengah kubus, dan itulah yang
# membuat keduanya tampak menyilang kalau dilihat dari atas.
SILANG_BAWAH = np.array([RUSUK / 2, RUSUK / 2, 0.0])
SILANG_ATAS = np.array([RUSUK / 2, RUSUK / 2, RUSUK])


class GambarBolehBerbohong(AdeganMatra):
    def construct(self):
        frame = self.frame

        kubus = kubus_pejal()
        rangka = rangka_kubus()
        bd = Line(T["B"], T["D"]).set_stroke(AKSEN2, 6)
        eg = Line(T["E"], T["G"]).set_stroke(AKSEN, 6)

        # Angka 6 pada sumbu z ditekan: itu tinggi kubus, dan nanti angka itulah
        # yang menjawab "dari mana enam satuan" di babak penutup.
        papan_koor = papan_koordinat(frame, tekan={"z": (6,)})
        papan = sinema.PapanRumus(self)

        # --- Babak 1: judul, lalu kubusnya DATANG dan cahaya menyapunya.
        kamera.pasang_awal(frame, theta=-40, phi=74, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        # Cahaya dipindah ke sisi kamera dan kubus diberi bayangan lantai. Tanpa
        # keduanya kubusnya terbaca sebagai balok gelap datar yang melayang.
        # Cahaya MULAI menyerong, lalu disapukan ke tempatnya di babak pembuka.
        pasang_cahaya(self, CAHAYA + np.array([16.0, 4.0, -6.0]))
        bayangan = bayangan_kubus().set_opacity(0.0)
        self.add(lantai(), bayangan, *papan_koor["datar"], *papan_koor["tinggi"])
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 01: Gambar ruang boleh berbohong",
                                 lama=3.4, y=3.0)
            b.catat(3.4)
            # Pembuka WAJIB ada kejadiannya, bukan kubus diam yang berputar
            # pelan (STANDAR butir 2, dipertegas 4 Sep). Kubusnya tumbuh dari
            # lantai bersama bayangannya, lalu sumber cahaya digeser menyapu
            # sehingga ketiga mukanya bergantian terang. Menyapukan cahaya,
            # bukan memutar kubus, sebab yang ingin ditunjukkan justru bahwa
            # benda ini PADAT dan menempel di lantai. Sapuannya SEKALI jalan,
            # berakhir pada arah cahaya yang benar: babak ini cuma 8,26 detik
            # dan sapuan pulang-pergi ditolak gerbang waktu, bukan diloloskan.
            b.main(FadeIn(kubus, scale=0.72), bayangan.animate.set_opacity(0.20),
                   run_time=1.2)
            b.main(self.camera.light_source.animate.move_to(CAHAYA), run_time=1.6)
            isi_sisa(b, kamera.sudut(frame, -30, 70, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"kubus": kubus})

        # --- Babak 2: identitas benda muncul, dan sumbu z pamit setelah selesai
        #     memperkenalkan arah tinggi. Ia kembali di babak "turun", saat
        #     tinggi benar-benar dipakai menghitung (standar v2 butir 9).
        jati = sinema.identitas(self, "panjang = lebar = tinggi = 6 satuan")
        tiga_rusuk = VGroup(*[Line(T["A"], T[n]).set_stroke(SOROT, 7)
                              for n in ("B", "D", "E")])
        with sinema.babak(self, "kotak", DURASI) as b:
            b.catat(0.0)
            # Narasinya menyebut "panjang, lebar, dan tingginya sama", jadi
            # ketiganya DITUNJUKKAN satu per satu di kubusnya, bukan cuma
            # dikatakan lalu kamera berputar pada gambar yang tidak berubah.
            for r in tiga_rusuk:
                b.main(ShowCreation(r), run_time=0.9)
            sumbu_z_pamit(b, papan_koor, 1.0)
            isi_sisa(b, kamera.sudut(frame, -18, 64, pusat=PUSAT, tinggi=TINGGI_BINGKAI),
                     sisakan=1.4)
            b.main(FadeOut(tiga_rusuk), run_time=0.7)
        qc.periksa_adegan(self, {"kubus": kubus, "identitas": jati})

        # --- Babak 3: dinding dibuat tembus pandang, KEDELAPAN titik sudut diberi
        #     nama. Yang dibahas cuma B, D, E, G, dan keempatnya diberi warna;
        #     sisanya tetap ditulis dengan warna redup.
        lab = huruf_sudut(frame, {"B": AKSEN2, "D": AKSEN2, "E": AKSEN, "G": AKSEN})
        with sinema.babak(self, "rangka", DURASI) as b:
            b.main(kubus.animate.set_opacity(0.14),
                   ShowCreation(rangka, lag_ratio=0.16),
                   FadeOut(bayangan), run_time=3.0)
            # "Kedelapan titik sudutnya kita beri nama, A sampai H": hurufnya
            # muncul SATU PER SATU menurut abjad, bukan kedelapannya sekaligus
            # dalam satu detik. Sisa babak ini dulu habis untuk satu putaran
            # kamera pelan 5,6 detik, dan pada beda piksel antarframe itu
            # terbaca sebagai layar berhenti walaupun kameranya bergerak.
            for nama in sorted(lab):
                b.main(FadeIn(lab[nama]), run_time=0.5)
            isi_sisa(b, kamera.putar_pelan(frame, 14))
        qc.periksa_adegan(self, {"kubus": kubus, "huruf B": lab["B"], "huruf G": lab["G"],
                                 "identitas": jati})

        # --- Babak 4: dua ruas, namanya MENEMPEL pada ruasnya.
        n_bd = label_hadap(frame, "BD", sepanjang3(T["B"], T["D"], 0.28)
                           + np.array([0.0, -0.60, 0.32]), AKSEN2, 28)
        n_eg = label_hadap(frame, "EG", sepanjang3(T["E"], T["G"], 0.74)
                           + np.array([0.0, 0.60, 0.38]), AKSEN, 28)
        with sinema.babak(self, "dua-ruas", DURASI) as b:
            # "Yang biru, BD, tergeletak di lantai kubus."
            tunggu_bergeser(b, frame, JAM, "Yang biru")
            b.main(ShowCreation(bd), run_time=1.4)
            b.main(FadeIn(n_bd), run_time=0.6)
            # "Yang merah, EG, ada di atapnya, 6 satuan lebih tinggi."
            tunggu_bergeser(b, frame, JAM, "Yang merah")
            b.main(ShowCreation(eg), run_time=1.4)
            b.main(FadeIn(n_eg), run_time=0.6)
            isi_sisa(b, kamera.sudut(frame, -52, 74, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"BD": bd, "EG": eg, "nama BD": n_bd, "nama EG": n_eg,
                                 "identitas": jati},
                          [("nama BD", "nama EG")])

        # --- Babak 5: SATU gerakan panjang naik ke pandangan atas. Di situlah
        #     tipuannya lahir: dua ruas yang terpisah enam satuan bertumpuk.
        #     Pertanyaannya diucapkan narator dan tampil di subtitle; layar tidak
        #     mengulanginya (standar v2 butir 4: kalimat panjang bukan milik gambar).
        tanda_atas = penanda(self, frame, SILANG_ATAS)
        with sinema.babak(self, "naik", DURASI) as b:
            # "Sekarang kamera kita naikkan, dan kita lihat kubus ini dari atas":
            # naiknya kamera dimulai TEPAT di kalimat itu.
            tunggu_bergeser(b, frame, JAM, "Sekarang kamera kita naikkan")
            isi_sisa(b, kamera.dunia_ke_peta(frame, pusat=PUSAT, tinggi=TINGGI_BINGKAI),
                     sisakan=5.6)
            # "Perhatikan kedua ruas tadi." -> keduanya disorot saat disebut.
            tunggu_bergeser(b, frame, JAM, "Perhatikan kedua ruas")
            b.main(Indicate(bd, color=AKSEN2), Indicate(eg, color=AKSEN), run_time=1.3)
            # "Keduanya menyilang tepat di tengah." -> penunjuk silangnya muncul.
            tunggu_bergeser(b, frame, JAM, "Keduanya menyilang")
            b.main(FadeIn(tanda_atas), run_time=1.2)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"BD": bd, "EG": eg, "penunjuk": tanda_atas,
                                 "identitas": jati})

        # --- Babak 6: turun lagi, dan satu titik silang ternyata DUA titik.
        #     DARI MANA ANGKA ENAM ITU: sumbu z kembali dengan angka 6 tersorot
        #     sejajar tutup kubus, tinggi tiangnya diberi label, dan rumusnya
        #     LAHIR di dekat tiang lalu terbang ke panel (standar v2 butir 5).
        tanda_bawah = penanda(self, frame, SILANG_BAWAH)
        tiang = Line(SILANG_BAWAH, SILANG_ATAS).set_stroke(SOROT, 5)
        lab_enam = label_hadap(frame, "6", SILANG_BAWAH + np.array([0.85, 0.0, RUSUK / 2]),
                               SOROT, 36)
        with sinema.babak(self, "turun", DURASI) as b:
            # "Kamera kita turunkan lagi, dan jawabannya kelihatan."
            tunggu_bergeser(b, frame, JAM, "Kamera kita turunkan")
            isi_sisa(b, kamera.sudut(frame, -30, 72, pusat=PUSAT, tinggi=TINGGI_BINGKAI),
                     sisakan=6.6)
            sumbu_z_muncul(b, papan_koor, 0.9)
            b.main(FadeIn(tanda_bawah), ShowCreation(tiang), run_time=1.4)
            b.main(FadeIn(lab_enam), run_time=0.7)
            sinema.lahir_rumus(self, r"\mathrm{jarak} = 6", dekat=tiang, papan=papan, b=b,
                               warna=SOROT)
        qc.periksa_adegan(self, {"tiang": tiang, "panel": papan.semua(),
                                 "angka tinggi": lab_enam, "identitas": jati},
                          [("panel", "identitas")])

        # --- Babak 7: kata "bersilangan" muncul MENEMPEL di atas tempat
        #     kejadian, lalu kubus diputar pelan supaya bentuknya terbaca.
        vonis = label_hadap(frame, "bersilangan",
                            SILANG_ATAS + np.array([0.0, 0.0, 1.05]), SOROT, 30)
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeIn(vonis), run_time=0.9)
            # "Kubusnya sendiri sama sekali tidak berubah." -> kubusnya yang
            # disorot, sebab justru itu pokok kalimatnya.
            tunggu_bergeser(b, frame, JAM, "Kubusnya sendiri")
            b.main(Indicate(rangka, color=SOROT), run_time=1.4)
            # "yang tidak sejajar dan tidak pernah bertemu" -> kedua ruasnya.
            tunggu_bergeser(b, frame, JAM, "yang tidak sejajar")
            b.main(Indicate(bd, color=AKSEN2), Indicate(eg, color=AKSEN), run_time=1.4)
            isi_sisa(b, kamera.putar_pelan(frame, 16), sisakan=1.6)
            b.jeda(1.2)
        qc.periksa_adegan(self, {"BD": bd, "EG": eg, "tiang": tiang,
                                 "panel": papan.semua(), "vonis": vonis,
                                 "identitas": jati},
                          [("vonis", "identitas"), ("vonis", "panel")])
