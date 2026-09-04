"""Ruang Tiga Dimensi, materi 08: "Sudut dua garis yang tidak pernah bertemu" (ManimGL).

Naskah   : manim/narasi/ruang-3d-08.json
Render   : manimgl manim/scenes/ruang_3d_08.py SudutGarisBersilangan -w -l
Gabung   : python manim/gabung_audio.py ruang-3d-08 SudutGarisBersilangan --uji

KENAPA GESERANNYA HARUS PELAN
Kekeliruan yang paling sering di materi ini bukan salah hitung, melainkan
garisnya ikut DIPUTAR sedikit supaya "pas" ke titik yang diinginkan. Begitu
arahnya berubah, sudutnya berubah. Maka geserannya dianimasikan pelan dan
posisi asalnya ditinggal sebagai bayangan samar, supaya mata sendiri yang
memastikan garisnya tetap sejajar dengan dirinya yang dulu.

ASAL ANGKA DITUNJUKKAN DULU, BARU RUMUSNYA (cara 3b1b, permintaan ARYA)
Sebelum panel "AC = AH = CH = 6 akar 2" muncul di kanan atas, 6 akar 2 diberi
label pada KETIGA sisi segitiga di gambarnya. Sudut 60 derajat lalu jadi
kesimpulan yang bisa dilihat, bukan angka yang diumumkan.

SUMBU Z cuma muncul di pembuka: seluruh hitungan materi ini memakai panjang
diagonal sisi, bukan tinggi.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ruang_3d_umum import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

TOPIK = "ruang-3d-08"
DURASI = durasi(TOPIK)
# Jam kalimat dari .vtt: dipakai supaya kejadian di layar jatuh tepat pada
# kalimat yang menyebutnya. URUTAN WAJIB: buat_narasi.py, buat_subtitle.py,
# BARU render.
JAM = sinema.jam_subtitle(TOPIK)

# Geseran sejajar dari BG ke AH: setiap titik bergerak dengan vektor yang SAMA,
# yaitu A dikurangi B. Ditulis begini, bukan dengan menyebut A dan H langsung,
# supaya kesejajarannya terjamin oleh caranya dibuat, bukan oleh ketelitian
# saya mengetik dua nama titik.
GESER = T["A"] - T["B"]


class SudutGarisBersilangan(AdeganMatra):
    def construct(self):
        frame = self.frame

        kubus = kubus_pejal()
        rangka = rangka_kubus()

        ac = Line(T["A"], T["C"]).set_stroke(AKSEN2, 6)
        bg_asal = Line(T["B"], T["G"]).set_stroke(AKSEN, 2.5).set_stroke(opacity=0.45)

        s = ValueTracker(0.0)   # 0 = di BG, 1 = sudah mendarat jadi AH
        bg = always_redraw(lambda: Line(
            T["B"] + GESER * s.get_value(), T["G"] + GESER * s.get_value()
        ).set_stroke(AKSEN, 6))

        papan_koor = papan_koordinat(frame)
        papan = sinema.PapanRumus(self)
        lab = huruf_sudut(frame, {"A": AKSEN2, "B": AKSEN, "C": AKSEN2, "G": AKSEN, "H": AKSEN})

        # --- Babak 1: pengumuman materi.
        kamera.pasang_awal(frame, theta=-46, phi=72, pusat=PUSAT, tinggi=TINGGI_BINGKAI)
        # Cahaya dipindah ke sisi kamera dan kubus diberi bayangan lantai. Tanpa
        # keduanya kubusnya terbaca sebagai balok gelap datar yang melayang.
        pasang_cahaya(self)
        bayangan = bayangan_kubus()
        self.add(lantai(), bayangan, *papan_koor["datar"], *papan_koor["tinggi"], kubus)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 08: Sudut dua garis bersilangan",
                                 lama=3.4, y=3.0)
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
            isi_sisa(b, kamera.sudut(frame, -34, 68, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"kubus": kubus})

        # --- Babak 2: kedua garis, dan masalahnya: tidak punya titik bersama.
        jati = sinema.identitas(self, "panjang = lebar = tinggi = 6 satuan")
        with sinema.babak(self, "masalah", DURASI) as b:
            sumbu_z_pamit(b, papan_koor, 1.0)
            b.main(*[FadeIn(x) for x in lab.values()], run_time=0.8)
            # "Ini AC di lantai, dan ini BG di sisi kanan": dua ruas, dua kejadian.
            b.main(ShowCreation(ac), run_time=1.2)
            b.main(ShowCreation(bg), run_time=1.2)
            # "Keduanya bersilangan: tidak sejajar" -> keduanya disorot bersama.
            b.tunggu_sampai(saat_kalimat(JAM, "Keduanya bersilangan"))
            b.main(Indicate(ac, color=AKSEN2), Indicate(bg, color=AKSEN), run_time=1.3)
            # "Padahal sudut selalu butuh titik sudut" -> baru di situ kameranya
            # berpindah untuk memperlihatkan keduanya memang tidak bertemu.
            b.tunggu_sampai(saat_kalimat(JAM, "Padahal sudut selalu butuh"))
            isi_sisa(b, kamera.sudut(frame, -68, 70, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"AC": ac, "huruf C": lab["C"], "huruf G": lab["G"],
                                 "identitas": jati})

        # --- Babak 3: geseran sejajar, PELAN, dengan bayangan posisi asalnya.
        with sinema.babak(self, "geser", DURASI) as b:
            b.main(FadeIn(bg_asal), run_time=0.6)
            b.main(s.animate.set_value(1.0), run_time=max(3.5, b.sisa - 1.0),
                   rate_func=smooth)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"BG": bg, "AC": ac, "identitas": jati})

        # --- Babak 4: mendarat tepat di AH, diagonal sisi yang memang sudah ada.
        with sinema.babak(self, "mendarat", DURASI) as b:
            # "BG mendarat tepat menjadi AH" -> huruf H yang dibesarkan.
            b.main(lab["H"].animate.scale(1.25), run_time=0.7)
            # "Sekarang keduanya bertemu di titik A." -> titik temunya disorot.
            b.tunggu_sampai(saat_kalimat(JAM, "Sekarang keduanya bertemu"))
            b.main(Indicate(lab["A"], scale_factor=1.6, color=SOROT), run_time=1.2)
            isi_sisa(b, kamera.sudut(frame, -24, 66, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"BG": bg, "huruf H": lab["H"], "huruf A": lab["A"],
                                 "identitas": jati})

        # --- Babak 5: ASAL ANGKANYA DITUNJUKKAN DULU. Ketiga sisi segitiga ACH
        #     diberi label 6 akar 2 di gambarnya, baru panel muncul.
        ch = Line(T["C"], T["H"]).set_stroke(REDUP, 5)
        muka = Polygon(T["A"], T["C"], T["H"]).set_fill(SOROT, 0.16).set_stroke(width=0)
        # Jari-jari busur sengaja besar: pada percobaan sebelumnya jari 1,1 dan
        # titik A yang jauh dari kamera membuatnya menyusut jadi coretan kecil.
        busur_a = busur(T["C"], T["A"], T["H"], warna=SOROT, jari=2.0, tebal=4.5)
        n_ac = label_hadap(frame, "6\\sqrt{2}", sepanjang3(T["A"], T["C"], 0.62)
                           + np.array([0.55, -0.30, 0.35]), AKSEN2, 26, rumus_latex=True)
        n_ah = label_hadap(frame, "6\\sqrt{2}", sepanjang3(T["A"], T["H"], 0.62)
                           + np.array([-0.75, 0.15, 0.0]), AKSEN, 26, rumus_latex=True)
        n_ch = label_hadap(frame, "6\\sqrt{2}", sepanjang3(T["C"], T["H"], 0.5)
                           + np.array([0.0, 0.85, 0.30]), REDUP, 26, rumus_latex=True)
        with sinema.babak(self, "segitiga", DURASI) as b:
            # "Sekarang lihat segitiga ACH."
            b.main(ShowCreation(ch), FadeIn(muka), run_time=1.4)
            # "AC diagonal sisi alas, AH diagonal sisi kiri, CH diagonal sisi
            # belakang": ketiga namanya muncul di kalimat yang menyebutnya.
            b.tunggu_sampai(saat_kalimat(JAM, "AC diagonal sisi alas"))
            b.main(FadeIn(n_ac), FadeIn(n_ah), run_time=0.8)
            b.tunggu_sampai(saat_kalimat(JAM, "CH diagonal sisi belakang"))
            b.main(FadeIn(n_ch), run_time=0.7)
            # "Ketiganya 6 akar 2, jadi segitiganya sama sisi."
            b.tunggu_sampai(saat_kalimat(JAM, "Ketiganya 6"))
            sinema.lahir_rumus(self, r"AC = AH = CH = 6\sqrt{2}", dekat=ch,
                               papan=papan, b=b)
            b.main(ShowCreation(busur_a), run_time=0.8)
            isi_sisa(b, kamera.sudut(frame, -58, 62, pusat=PUSAT, tinggi=TINGGI_BINGKAI))
        qc.periksa_adegan(self, {"CH": ch, "panel": papan.semua(), "nilai AC": n_ac, "nilai AH": n_ah,
                                 "nilai CH": n_ch, "identitas": jati},
                          [("panel", "identitas"), ("nilai AC", "nilai AH"),
                           ("nilai AH", "nilai CH")])

        # --- Babak 6: jawabannya, tanpa satu pun perhitungan trigonometri.
        n_sudut = label_hadap(frame, "60^\\circ", T["A"] + np.array([1.3, 1.3, 0.55]),
                              SOROT, 32, rumus_latex=True)
        with sinema.babak(self, "tutup", DURASI) as b:
            # "Semua sudut segitiga sama sisi adalah 60 derajat."
            b.main(FadeIn(n_sudut), run_time=0.8)
            papan.baris(r"\angle(AC, BG) = 60^\circ", SOROT, b=b)
            # "Menggeser tidak mengubah arah" -> ruas yang digeser itu yang
            # disorot, sebab justru itu inti seluruh materinya.
            b.tunggu_sampai(saat_kalimat(JAM, "Menggeser tidak mengubah arah"))
            b.main(Indicate(bg, color=AKSEN), run_time=1.4)
            isi_sisa(b, kamera.putar_pelan(frame, 16), sisakan=1.6)
            b.jeda(1.2)
        qc.periksa_adegan(self, {"panel": papan.semua(), "busur": busur_a,
                                 "nilai sudut": n_sudut, "identitas": jati},
                          [("panel", "identitas"), ("nilai sudut", "identitas")])
