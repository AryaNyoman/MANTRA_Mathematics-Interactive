"""Ruang Tiga Dimensi, materi 09: "Sudut dengan bidang dan sudut antarbidang" (ManimGL).

Naskah   : manim/narasi/ruang-3d-09.json
Render   : manimgl manim/scenes/ruang_3d_09.py SudutDenganBidang -w -l
Gabung   : python manim/gabung_audio.py ruang-3d-09 SudutDenganBidang --uji

DUA IDE BESAR, MASING-MASING DAPAT BABAKNYA SENDIRI
Sudut GARIS dengan bidang, dan sudut BIDANG dengan bidang. Keduanya tidak
dicampur dalam satu babak, sebab satu sesi satu ide. Bagian pertama memakai
bayangan; bagian kedua memakai garis potong.

KEDELAPAN HURUF ADA DI KEDUA BAGIAN, yang berpindah cuma sorotnya: A, C, G di
bagian pertama, lalu B, D, G di bagian kedua. Warna label tidak bisa diubah di
tengah jalan sebab updater menggambarnya ulang dari bentuk aslinya tiap frame,
jadi dua set disiapkan dan ditukar.

ASAL ANGKA DITUNJUKKAN DULU, BARU RUMUSNYA (cara 3b1b, permintaan ARYA)
Sebelum panel "tan theta = 6 per 6 akar 2" muncul, angka 6 diberi label pada
rusuk tegak CG dan 6 akar 2 pada bayangan AC. Sebelum panel kedua muncul,
3 akar 2 diberi label pada PC. Tiap angka di kanan atas sudah pernah dilihat
menempel pada bendanya.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ruang_3d_umum import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

TOPIK = "ruang-3d-09"
DURASI = durasi(TOPIK)
# Jam kalimat dari .vtt: dipakai supaya kejadian di layar jatuh tepat pada
# kalimat yang menyebutnya. URUTAN WAJIB: buat_narasi.py, buat_subtitle.py,
# BARU render.
JAM = sinema.jam_subtitle(TOPIK)

P = (T["B"] + T["D"]) / 2.0   # titik tumpu di TENGAH garis potong BD


class SudutDenganBidang(AdeganMatra):
    def construct(self):
        frame = self.frame

        kubus = kubus_pejal()
        rangka = rangka_kubus()

        ag = Line(T["A"], T["G"]).set_stroke(AKSEN, 6)
        ac = Line(T["A"], T["C"]).set_stroke(AKSEN2, 6)
        cg = Line(T["C"], T["G"]).set_stroke(REDUP, 3)
        siku_c = siku(T["A"], T["C"], T["G"], ukuran=0.5)
        busur_a = busur(T["C"], T["A"], T["G"], warna=SOROT, jari=1.9, tebal=4)

        bd = Line(T["B"], T["D"]).set_stroke(SOROT, 6)
        pc = Line(P, T["C"]).set_stroke(AKSEN2, 5)
        pg = Line(P, T["G"]).set_stroke(AKSEN, 5)
        bidang_bdg = Polygon(T["B"], T["D"], T["G"]).set_fill(AKSEN, 0.24).set_stroke(AKSEN, 3)
        siku_p1 = siku(T["B"], P, T["C"], ukuran=0.45)
        siku_p2 = siku(T["D"], P, T["G"], ukuran=0.45)
        busur_p = busur(T["C"], P, T["G"], warna=SOROT, jari=1.2, tebal=4)

        papan_koor = papan_koordinat(frame)
        papan = sinema.PapanRumus(self)
        lab = huruf_sudut(frame, {"A": TINTA, "C": AKSEN2, "G": AKSEN})
        lab2 = huruf_sudut(frame, {"B": SOROT, "D": SOROT, "G": AKSEN, "C": AKSEN2})

        # --- Babak 1: pengumuman materi.
        kamera.pasang_awal(frame, theta=-42, phi=72, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        # Cahaya dipindah ke sisi kamera dan kubus diberi bayangan lantai. Tanpa
        # keduanya kubusnya terbaca sebagai balok gelap datar yang melayang.
        pasang_cahaya(self)
        bayangan = bayangan_kubus()
        self.add(lantai(), bayangan, *papan_koor["datar"], *papan_koor["tinggi"], kubus)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 09: Sudut dengan bidang", lama=3.4, y=3.0)
            b.catat(3.4)
            # Pembuka MAKSIMAL 5 detik (STANDAR butir 2, dipertegas 4 Sep):
            # kubus pejal langsung melebur jadi rangka, bukan diam berputar
            # belasan detik. Sebelum ini babak pembuka dan babak berikutnya
            # sama-sama menampilkan kubus abu-abu pejal, dan itu 20 persen
            # video habis tanpa satu pun hal baru masuk layar.
            # Rusuknya digambar SATU PER SATU (lag_ratio), bukan kedua belasnya
            # sekaligus dalam 1,6 detik. Ukuran baru MASTER 4 Sep, 'detik
            # pertama bergerak': yang dihitung bukan ada tidaknya animasi,
            # melainkan apakah layarnya benar-benar berubah di mata penonton.
            b.main(kubus.animate.set_opacity(0.14),
                   ShowCreation(rangka, lag_ratio=0.16),
                   FadeOut(bayangan), run_time=3.2)
            isi_sisa(b, kamera.sudut(frame, -30, 68, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"kubus": kubus})

        # --- Babak 2: garis miringnya dulu, tanpa bayangannya. Sumbu z pamit
        #     sebentar, ia kembali saat rusuk tegak CG masuk hitungan.
        jati = sinema.identitas(self, "panjang = lebar = tinggi = 6 satuan")
        with sinema.babak(self, "bayangan", DURASI) as b:
            sumbu_z_pamit(b, papan_koor, 1.0)
            b.main(*[FadeIn(x) for x in lab.values()], run_time=0.8)
            # "Ini diagonal ruang AG, sebuah garis miring yang menembus lantai."
            b.main(ShowCreation(ag), run_time=1.4)
            # "melainkan sudut antara garis itu dan bayangannya di lantai":
            # diagonalnya disorot lagi saat kalimat yang menentukan itu jalan.
            b.tunggu_sampai(saat_kalimat(JAM, "melainkan sudut antara garis"))
            b.main(Indicate(ag, color=AKSEN), run_time=1.3)
            isi_sisa(b, kamera.sudut(frame, -20, 74, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"AG": ag, "huruf G": lab["G"], "identitas": jati})

        # --- Babak 3: bayangannya DICARI, bukan diberikan. Tiang CG yang tegak
        #     lurus lantai itulah yang menjatuhkan G ke C, jadi sumbu z kembali.
        #     Kedua panjang diberi label di ruasnya masing-masing.
        n_cg = label_hadap(frame, "6", sepanjang3(T["C"], T["G"], 0.5)
                           + np.array([0.65, 0.30, 0.0]), REDUP, 28)
        n_ac = label_hadap(frame, "6\\sqrt{2}", sepanjang3(T["A"], T["C"], 0.34)
                           + np.array([0.35, -0.55, 0.32]), AKSEN2, 28, rumus_latex=True)
        with sinema.babak(self, "proyeksi", DURASI) as b:
            sumbu_z_muncul(b, papan_koor, 0.8)
            # "Bayangan G jatuh di C, sebab GC tegak lurus lantai."
            b.tunggu_sampai(saat_kalimat(JAM, "Bayangan G jatuh di C"))
            b.main(ShowCreation(cg), run_time=0.9)
            b.main(ShowCreation(siku_c), run_time=0.6)
            # "Jadi bayangan AG adalah AC."
            b.tunggu_sampai(saat_kalimat(JAM, "Jadi bayangan AG"))
            b.main(ShowCreation(ac), run_time=1.1)
            b.main(FadeIn(n_cg), FadeIn(n_ac), run_time=0.9)
            isi_sisa(b, kamera.sudut(frame, -52, 70, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"AC": ac, "AG": ag, "nilai CG": n_cg, "nilai AC": n_ac,
                                 "identitas": jati},
                          [("nilai CG", "nilai AC")])

        # --- Babak 4: baru sekarang angkanya naik ke panel.
        with sinema.babak(self, "sudut1", DURASI) as b:
            # "Pada segitiga ACG yang siku-siku di C" -> busur sudutnya muncul.
            b.main(ShowCreation(busur_a), run_time=0.9)
            # "tan sudutnya sama dengan 6 dibagi 6 akar 2"
            b.tunggu_sampai(saat_kalimat(JAM, "tan sudutnya sama dengan"))
            sinema.lahir_rumus(self, r"\tan\theta = \frac{6}{6\sqrt{2}}", dekat=cg,
                               papan=papan, b=b, warna=SOROT)
            # "Sudutnya kira-kira 35,26 derajat."
            b.tunggu_sampai(saat_kalimat(JAM, "Sudutnya kira-kira"))
            papan.baris(r"\theta \approx 35{,}26^\circ", SOROT, b=b)
            isi_sisa(b, kamera.putar_pelan(frame, 20))
        qc.periksa_adegan(self, {"panel": papan.semua(), "busur": busur_a,
                                 "identitas": jati},
                          [("panel", "identitas")])

        # --- Babak 5: layar dibersihkan dari ide pertama, lalu ide kedua masuk.
        #     Set huruf DITUKAR, bukan dihapus: kedelapan huruf tetap terbaca,
        #     yang berpindah cuma sorotnya.
        lab_p = label_hadap(frame, "P", P + np.array([-0.85, -0.55, 0.15]), SOROT)
        tanda_p = penanda(self, frame, P)
        with sinema.babak(self, "potong", DURASI) as b:
            b.main(FadeOut(ag), FadeOut(ac), FadeOut(cg), FadeOut(siku_c),
                   FadeOut(busur_a), FadeOut(n_cg), FadeOut(n_ac),
                   *[FadeOut(x) for x in lab.values()], run_time=1.0)
            for x in lab2.values():
                x.set_opacity(0)
            self.add(*lab2.values())
            b.main(*[x.animate.set_opacity(1) for x in lab2.values()], run_time=0.6)
            lama = papan.semua()
            self.hud.remove(*lama)
            b.main(FadeOut(lama), run_time=0.5)
            papan.utama, papan.baris_lain = None, []
            # "Bidang BDG memotong lantai."
            b.tunggu_sampai(saat_kalimat(JAM, "Bidang BDG memotong lantai"))
            b.main(FadeIn(bidang_bdg), run_time=1.3)
            # "yaitu BD" lalu "Garis itu namanya garis potong".
            b.tunggu_sampai(saat_kalimat(JAM, "yaitu BD"))
            b.main(ShowCreation(bd), run_time=0.9)
            b.tunggu_sampai(saat_kalimat(JAM, "Garis itu namanya garis potong"))
            b.main(Indicate(bd, color=SOROT), run_time=1.2)
            isi_sisa(b, kamera.sudut(frame, -14, 66, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"bidang": bidang_bdg, "BD": bd, "huruf A": lab2["A"],
                                 "identitas": jati})

        # --- Babak 6: dua garis bantu, keduanya tegak lurus BD, DARI SATU TITIK.
        #     Panjang PC diberi label sebelum rumusnya muncul.
        n_pc = label_hadap(frame, "3\\sqrt{2}", sepanjang3(P, T["C"], 0.5)
                           + np.array([0.20, -0.65, 0.30]), AKSEN2, 28, rumus_latex=True)
        with sinema.babak(self, "sudut2", DURASI) as b:
            # "Ambil titik P tepat di tengah BD."
            b.main(FadeIn(tanda_p), FadeIn(lab_p), run_time=0.8)
            # "PC di lantai, dan PG di bidang miring."
            b.tunggu_sampai(saat_kalimat(JAM, "PC di lantai"))
            b.main(ShowCreation(pc), ShowCreation(pg), run_time=1.3)
            b.main(ShowCreation(siku_p1), ShowCreation(siku_p2), run_time=0.8)
            b.main(FadeIn(n_pc), run_time=0.7)
            # "Sudut di antara keduanya, kira-kira 54,74 derajat."
            b.tunggu_sampai(saat_kalimat(JAM, "Sudut di antara keduanya"))
            b.main(ShowCreation(busur_p), run_time=0.7)
            sinema.lahir_rumus(self, r"\tan\varphi = \frac{6}{3\sqrt{2}}", dekat=pc,
                               papan=papan, b=b, warna=SOROT)
            papan.baris(r"\varphi \approx 54{,}74^\circ", SOROT, b=b)
            isi_sisa(b, kamera.sudut(frame, -40, 62, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"PC": pc, "PG": pg, "panel": papan.semua(),
                                 "huruf P": lab_p, "nilai PC": n_pc, "identitas": jati},
                          [("panel", "identitas"), ("huruf P", "nilai PC")])

        # --- Babak 7: dua syarat yang harus dipenuhi bersamaan, ditempelkan
        #     pada titik tumpunya sendiri.
        # Dua kata, batas standar v2 butir 4. "Satu titik tumpu" tiga kata dan
        # ditolak mesin; syarat lengkapnya tetap diucapkan narator.
        syarat = label_hadap(frame, "satu tumpuan", P + np.array([0.0, -2.6, 1.0]),
                             SOROT, 30)
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeIn(syarat), run_time=0.9)
            # "tegak lurus garis potong" dan "bertumpu di satu titik yang sama":
            # dua syarat, dua sorotan, masing-masing pada kalimatnya sendiri.
            b.tunggu_sampai(saat_kalimat(JAM, "tegak lurus garis potong"))
            b.main(Indicate(siku_p1, scale_factor=1.6, color=SOROT),
                   Indicate(siku_p2, scale_factor=1.6, color=SOROT), run_time=1.3)
            b.tunggu_sampai(saat_kalimat(JAM, "dan bertumpu di satu titik"))
            b.main(Indicate(lab_p, scale_factor=1.6, color=SOROT), run_time=1.2)
            isi_sisa(b, kamera.putar_pelan(frame, 16), sisakan=1.6)
            b.jeda(1.2)
        qc.periksa_adegan(self, {"PC": pc, "PG": pg, "panel": papan.semua(), "syarat": syarat,
                                 "identitas": jati},
                          [("panel", "identitas"), ("syarat", "identitas")])
