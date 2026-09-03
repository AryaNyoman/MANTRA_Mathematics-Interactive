"""Ruang Tiga Dimensi, materi 04: "Dua kali Pythagoras" (ManimGL).

Naskah   : manim/narasi/ruang-3d-04.json
Render   : manimgl manim/scenes/ruang_3d_04.py DuaKaliPythagoras -w -l
Gabung   : python manim/gabung_audio.py ruang-3d-04 DuaKaliPythagoras --uji

KENAPA VIDEO INI PERLU 3D
Di kertas, segitiga ACG selalu digambar pipih dan siswa harus percaya begitu
saja bahwa ia berdiri di dalam kubus. Di sini segitiga itu benar-benar berdiri,
dan kamera memutarinya sehingga terlihat ia tidak menempel pada sisi mana pun.
Di situlah letak kesalahan yang paling sering, yaitu menjumlahkan panjang alih
alih kuadratnya.

ASAL ANGKA DITUNJUKKAN DULU, BARU RUMUSNYA (cara 3b1b, permintaan ARYA)
Sebelum panel "AC kuadrat sama dengan 72" muncul, angka 6 diberi label pada
rusuk AB dan BC di gambarnya. Sebelum panel "AG kuadrat sama dengan 108"
muncul, 6 akar 2 diberi label pada AC dan 6 pada rusuk tegak CG. Tiap angka di
kanan atas sudah pernah dilihat siswa menempel pada bendanya.

SUMBU Z muncul di pembuka sebagai perkenalan, hilang saat semuanya masih datar
di lantai, lalu KEMBALI tepat ketika rusuk tegak CG masuk hitungan.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ruang_3d_umum import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

TOPIK = "ruang-3d-04"
DURASI = durasi(TOPIK)


class DuaKaliPythagoras(AdeganMatra):
    def construct(self):
        frame = self.frame

        kubus = kubus_pejal()
        rangka = rangka_kubus()

        ab = Line(T["A"], T["B"]).set_stroke(REDUP, 5)
        bc = Line(T["B"], T["C"]).set_stroke(REDUP, 5)
        ac = Line(T["A"], T["C"]).set_stroke(AKSEN2, 6)
        cg = Line(T["C"], T["G"]).set_stroke(SOROT, 6)
        ag = Line(T["A"], T["G"]).set_stroke(AKSEN, 6)

        # Segitiga penolong digambar sebagai BIDANG, bukan cuma tiga garis.
        # Bidang itulah yang memperlihatkan ia berdiri di dalam kubus; tiga garis
        # saja masih bisa dikira tergambar di permukaan.
        muka_alas = Polygon(T["A"], T["B"], T["C"]).set_fill(AKSEN2, 0.18).set_stroke(width=0)
        muka_tegak = Polygon(T["A"], T["C"], T["G"]).set_fill(AKSEN, 0.20).set_stroke(width=0)

        siku_b = siku(T["A"], T["B"], T["C"], ukuran=0.5)
        siku_c = siku(T["A"], T["C"], T["G"], ukuran=0.5)

        papan_koor = papan_koordinat(frame)
        papan = sinema.PapanRumus(self)
        lab = huruf_sudut(frame, {"A": TINTA, "B": TINTA, "C": AKSEN2, "G": AKSEN})

        # --- Babak 1: pengumuman materi.
        kamera.pasang_awal(frame, theta=-42, phi=74, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        self.add(lantai(), *papan_koor["datar"], *papan_koor["tinggi"], kubus)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 04: Dua kali Pythagoras", lama=3.4, y=3.0)
            b.catat(3.4)
            # Babak pertama HANYA judul materi (standar v2, Waktu dan sinkron).
            # Kubus dibuat tembus pandang di babak berikutnya.
            isi_sisa(b, kamera.sudut(frame, -28, 68, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"kubus": kubus})

        # --- Babak 2: langkah pertama masih datar di lantai, jadi sumbu z pamit.
        #     Angka 6 ditempelkan pada kedua rusuknya SEBELUM rumusnya muncul.
        n_ab = label_hadap(frame, "6", sepanjang3(T["A"], T["B"], 0.5)
                           + np.array([0.0, -0.62, 0.30]), REDUP, 28)
        n_bc = label_hadap(frame, "6", sepanjang3(T["B"], T["C"], 0.5)
                           + np.array([0.62, 0.0, 0.30]), REDUP, 28)
        jati = sinema.identitas(self, "panjang = lebar = tinggi = 6 satuan")
        with sinema.babak(self, "sisi", DURASI) as b:
            b.main(kubus.animate.set_opacity(0.14), ShowCreation(rangka), run_time=1.6)
            sumbu_z_pamit(b, papan_koor, 1.0)
            b.main(*[FadeIn(x) for x in lab.values()], run_time=0.8)
            b.main(ShowCreation(ab), ShowCreation(bc), run_time=1.2)
            b.main(FadeIn(n_ab), FadeIn(n_bc), run_time=0.8)
            b.main(ShowCreation(ac), FadeIn(muka_alas), ShowCreation(siku_b), run_time=1.6)
            isi_sisa(b, kamera.sudut(frame, -12, 52, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"AC": ac, "nilai AB": n_ab, "nilai BC": n_bc,
                                 "identitas": jati},
                          [("nilai AB", "nilai BC")])

        # --- Babak 3: baru sekarang angkanya naik ke panel, dan sengaja
        #     DIBIARKAN sebagai kuadrat.
        # Digeser ke sisi DEPAN kubus (arah -y). Percobaan pertama menaruhnya ke
        # arah +y, dan pada sudut kamera penutup angka 6-nya tertutup rangka
        # sehingga yang terbaca cuma "akar 2". Itu bukan cacat kosmetik: siswa
        # bisa mengira AC panjangnya akar 2.
        n_ac = label_hadap(frame, "6\\sqrt{2}", sepanjang3(T["A"], T["C"], 0.42)
                           + np.array([0.30, -0.78, 0.40]), AKSEN2, 28, rumus_latex=True)
        with sinema.babak(self, "hitung1", DURASI) as b:
            b.main(FadeIn(n_ac), run_time=0.7)
            sinema.lahir_rumus(self, r"AC^2 = 6^2 + 6^2 = 72", dekat=ac,
                               papan=papan, b=b, warna=AKSEN2)
            isi_sisa(b, kamera.putar_pelan(frame, 18))
            b.jeda(0.8)
        qc.periksa_adegan(self, {"panel": papan.semua(), "nilai AC": n_ac, "identitas": jati},
                          [("panel", "identitas")])

        # --- Babak 4: segitiga penolong BERDIRI, dan sumbu z KEMBALI sebab
        #     tinggi baru dipakai mulai di sini.
        n_cg = label_hadap(frame, "6", sepanjang3(T["C"], T["G"], 0.5)
                           + np.array([0.62, 0.28, 0.0]), SOROT, 28)
        with sinema.babak(self, "ruang", DURASI) as b:
            b.main(FadeOut(ab), FadeOut(bc), FadeOut(muka_alas),
                   FadeOut(n_ab), FadeOut(n_bc), run_time=0.9)
            sumbu_z_muncul(b, papan_koor, 0.8)
            b.main(ShowCreation(ag), run_time=1.3)
            b.main(ShowCreation(cg), FadeIn(muka_tegak), ShowCreation(siku_c), run_time=1.5)
            b.main(FadeIn(n_cg), run_time=0.7)
            isi_sisa(b, kamera.sudut(frame, -74, 76, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"AG": ag, "CG": cg, "nilai CG": n_cg, "panel": papan.semua(),
                                 "identitas": jati},
                          [("panel", "identitas")])

        # --- Babak 5: Pythagoras kedua, memakai hasil pertama sebagai sisi.
        with sinema.babak(self, "hitung2", DURASI) as b:
            # Rumus utama BERUBAH dengan morph lambang per lambang, bukan
            # fade out lalu fade in (standar v2 butir 5): angka 72 yang sudah
            # ada tetap di tempatnya, yang lain tumbuh di sekitarnya.
            # Waktunya TIDAK dihitung tangan lagi. Versi sebelumnya mencatat 1,7
            # detik untuk tumbuh + kata alasan, padahal yang terpakai 3,2, dan
            # videonya jadi 1,6 detik lebih panjang daripada narasinya.
            papan.tumbuh(r"AG^2 = 72 + 36 = 108", "ditambah", b=b)
            papan.baris(r"AG = 6\sqrt{3} \approx 10{,}392", AKSEN, b=b)
            isi_sisa(b, kamera.sudut(frame, -34, 66, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"panel": papan.semua(), "identitas": jati},
                          [("panel", "identitas")])

        # --- Babak 6: kenapa akar tiga, yaitu tiga arah yang dilewati. Katanya
        #     ditempelkan pada diagonal ruangnya sendiri.
        alasan = label_hadap(frame, "3 arah", sepanjang3(T["A"], T["G"], 0.62)
                             + np.array([-1.5, 0.0, 0.0]), SOROT, 30)
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeIn(alasan), run_time=0.9)
            isi_sisa(b, kamera.putar_pelan(frame, 30), sisakan=1.6)
            b.jeda(1.2)
        qc.periksa_adegan(self, {"AG": ag, "panel": papan.semua(), "alasan": alasan,
                                 "identitas": jati},
                          [("panel", "identitas"), ("alasan", "identitas")])
