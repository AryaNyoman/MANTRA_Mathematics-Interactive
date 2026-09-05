"""Video 01 Transformasi Geometri, Materi 01 "Setiap titik ikut pindah".

VERSI 2, 5 September 2026: diperpanjang dari 74 ke 128 detik atas permintaan
ARYA, dan unsur gambarnya diperbesar.

YANG DITAMBAH ISI, BUKAN JEDA
Standar v2 melarang layar diam tanpa kejadian, dan `alat/ukur_detik_pertama.py`
menangkapnya dari video jadi. Delapan babak baru semuanya membawa kejadian:
- `periksa` dan `hitung`: koordinat A diperiksa dengan MENGHITUNG PETAK di
  layar, bukan diberikan jadi. Dua ruas berangka digambar, satu di atas sumbu
  dan satu di bawahnya.
- `kedua` dan `cocok`: contoh KEDUA yang berbeda, titik C yang jaraknya dua
  petak, bukan satu. Satu contoh saja tidak membedakan "y berbalik tanda" dari
  "y dikurangi dua".
- `aturan`: pola dari kedua contoh, ditulis sebagai rumus.
- `keliru` dan `betul`: kekeliruan yang sering terjadi, DIPERAGAKAN salahnya
  lalu dibetulkan.
- `rangkum` dan `tanya`: penutup satu kalimat plus satu pertanyaan.

KEKELIRUAN YANG DIPILIH: MENGGESER, BUKAN MENCERMINKAN
Pilihan pertama adalah "mencerminkan pada sumbu yang salah", tetapi
mencerminkan pada sumbu Y melempar bentuknya ke x = -6 sehingga bingkainya
harus melebar dua kali lipat dan segalanya mengecil. Menggeser turun jauh lebih
baik pada dua hal sekaligus: kotak dunianya PERSIS SAMA dengan peta yang benar
(keduanya di y -3 sampai -1), jadi keduanya bisa ditumpuk dan dibandingkan
langsung; dan kekeliruan itu justru dugaan yang diserang video ini, yaitu bahwa
yang dipindahkan adalah gambarnya sebagai satu benda utuh.

UNSUR GAMBAR DIPERBESAR
Temuan 4 September: frame terlalu lengang, dan alat ukur menyebut diam
terpanjang 7,6 detik. Sebabnya bukan kurang gerak melainkan unsur yang terlalu
tipis: titik berjari-jari 0,07 dan garis setebal 1,8 nyaris tidak mengubah
piksel. Sekarang goresan 5,0, titik 0,12, garis bantu 3,0, dan isian dua kali
lebih pekat. Bentuknya sendiri tidak bisa dibesarkan lebih jauh: lorong yang
tidak dipakai HUD cuma setinggi 4,15 satuan layar, sedangkan dunia yang harus
muat setinggi 6 satuan.
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
TOPIK = "transformasi1-setiap-titik"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

ORANG_X, ORANG_Y = 3.5, 1.4

# Ketebalan yang dipakai seluruh video ini. Dikumpulkan di sini supaya
# "perbesar unsur" cukup diubah di satu tempat, bukan dicari satu per satu.
TEBAL_BENTUK = 5.0
TEBAL_BANTU = 3.0
JARI_TITIK = 0.12
ISI_PRAPETA = 0.16
ISI_PETA = 0.22

# Kotak dunia bagian matematikanya. Label sudut sengaja diarahkan KE DALAM
# (A dan B ke bawah, C ke atas, aksennya sebaliknya) supaya tidak menambah
# tinggi kotak: tiap setengah satuan tambahan di sini mengecilkan bentuknya di
# seluruh video.
KOTAK = (0.0, 8.0, -3.0, 3.0)


def cermin_x(p):
    return (p[0], -p[1])


def geser_turun(p):
    """Kekeliruan yang diperagakan: bentuknya DIGESER, bukan dicerminkan.

    Turun 4 satuan dipilih supaya kotak dunianya persis sama dengan peta yang
    benar, sehingga bedanya murni pada bentuknya, bukan pada letaknya.
    """
    return (p[0], p[1] - 4.0)


def dilatasi2(p):
    return (2.0 * p[0], 2.0 * p[1])


class TransformasiSetiapTitik(AdeganMatra):
    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        jam = sinema.jam_subtitle(TOPIK)

        peta_cermin = [cermin_x(p) for p in L]
        peta_geser = [geser_turun(p) for p in L]
        peta_dilatasi = [dilatasi2(p) for p in L]

        A, B, C = L[0], L[1], L[2]
        A_peta, C_peta = peta_cermin[0], peta_cermin[2]

        def hud_kini():
            isi = {"identitas": ident}
            papan_isi = papan.semua()
            if papan_isi is not None:
                isi["papan"] = papan_isi
            return isi

        # ---------------------------------------------------------------- #
        # buka                                                              #
        # ---------------------------------------------------------------- #
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(3.0, DURASI["buka"] - 0.6)
            sinema.judul_pembuka(self, "Materi 01: Setiap titik ikut pindah", lama=lama)
            b.catat(lama)

        # ---------------------------------------------------------------- #
        # dunia dan sama: lapangan yang dilipat                             #
        # ---------------------------------------------------------------- #
        lapangan = ilustrasi.tanah(panjang=15.0, lebar=11.0, y_tengah=0.0, z=0.0)
        garis_lipat = DashedLine(
            np.array([-4.0, 0.0, 0.03]), np.array([11.0, 0.0, 0.03]),
        ).set_stroke(SOROT, 4.0)

        orang = ilustrasi.orang(tinggi=1.7)
        orang.shift(np.array([ORANG_X, ORANG_Y, 0.0]))
        seberang = ilustrasi.orang(tinggi=1.7)
        seberang.shift(np.array([ORANG_X, -ORANG_Y, 0.0]))
        seberang.set_opacity(0.34)

        kamera.pasang_awal(frame, theta=-24, phi=62,
                           pusat=(ORANG_X, 0.0, 0.7), tinggi=8.2)

        with sinema.babak(self, "dunia", DURASI) as b:
            b.main(FadeIn(lapangan), FadeIn(orang), run_time=1.2)
            b.main(ShowCreation(garis_lipat), run_time=1.4)
        qc.periksa_adegan(self, {"orang": orang}, margin=0.45)

        # Tanpa tulisan apa pun di babak ini: teks di ruang 3D ikut dimiringkan
        # kameranya dan pernah tergambar TERBALIK (temuan 4 Sep).
        with sinema.babak(self, "sama", DURASI) as b:
            b.main(FadeIn(seberang), run_time=1.6)
            b.main(Indicate(garis_lipat, color=SOROT), run_time=1.2)
            b.main(Indicate(seberang, color=SOROT), run_time=1.4)
        qc.periksa_adegan(self, {"orang": orang, "seberang": seberang}, margin=0.45)

        # ---------------------------------------------------------------- #
        # peta: turun ke bidang bernomor                                    #
        # ---------------------------------------------------------------- #
        pusat_peta, tinggi_peta = letak_peta(*KOTAK)
        bidang = bidang_untuk(*KOTAK)

        with sinema.babak(self, "peta", DURASI) as b:
            b.main(
                kamera.dunia_ke_peta(frame, pusat=pusat_peta, tinggi=tinggi_peta),
                run_time=max(2.2, DURASI["peta"] - 2.0),
            )
            b.main(
                FadeOut(lapangan), FadeOut(orang), FadeOut(seberang),
                FadeOut(garis_lipat), FadeIn(bidang),
                run_time=1.0,
            )
            ident = sinema.identitas(self, "1 petak = 1 satuan")
        qc.periksa_adegan(self, {"identitas": ident}, dunia={"bidang": bidang})

        # ---------------------------------------------------------------- #
        # bentuk: prapeta                                                   #
        # ---------------------------------------------------------------- #
        prapeta = poligon(L, TINTA, tebal=TEBAL_BENTUK, isian=ISI_PRAPETA)
        titik_asal = [Dot(titik3(p), radius=JARI_TITIK).set_color(TINTA) for p in L]
        nama_pra = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(huruf, warna=TINTA)
            t.next_to(titik3(L[i]), DOWN if i < 2 else UP, buff=0.24)
            nama_pra[huruf] = t
        # Label bentuk ditaruh di KANAN bentuknya, di luar kotak pembatasnya.
        #
        # qc membandingkan KOTAK PEMBATAS, bukan bentuk poligonnya. Label
        # "peta" yang ditaruh di ceruk kosong huruf L tetap dinilai menindih,
        # sebab ceruk itu masih di dalam kotak pembatas bentuknya. Render
        # 5 Sep gagal persis di situ. Sisi kanan berada di luar kotak
        # pembatas kedua bentuk, dan kotak dunianya dilebarkan ke x = 8 supaya
        # labelnya punya tempat tanpa mengecilkan gambarnya (skalanya dibatasi
        # arah tegak, bukan arah datar).
        l_prapeta = sinema.label("prapeta", warna=TINTA)
        l_prapeta.next_to(titik3((6.0, 2.0)), RIGHT, buff=0.30)

        with sinema.babak(self, "bentuk", DURASI) as b:
            b.main(ShowCreation(prapeta), run_time=1.6)
            b.main(
                *[FadeIn(d, scale=0.5) for d in titik_asal],
                *[FadeIn(nama_pra[h]) for h in nama_pra],
                FadeIn(l_prapeta),
                run_time=1.4,
            )
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "label prapeta": l_prapeta, "nama A": nama_pra["A"]},
            [("label prapeta", "nama A")], hud=hud_kini(), dunia={"bidang": bidang},
        )

        # ---------------------------------------------------------------- #
        # pindah: tiap titik berjalan sendiri                               #
        # ---------------------------------------------------------------- #
        titik_jalan = [Dot(titik3(p), radius=JARI_TITIK).set_color(AKSEN2) for p in L]
        for d in titik_jalan:
            self.add(d)

        with sinema.babak(self, "pindah", DURASI) as b:
            b.main(
                *[d.animate.move_to(titik3(peta_cermin[i])) for i, d in enumerate(titik_jalan)],
                run_time=max(2.4, DURASI["pindah"] - 3.4),
            )
        qc.periksa_adegan(self, {"prapeta": prapeta}, hud=hud_kini(), dunia={"bidang": bidang})

        # ---------------------------------------------------------------- #
        # enam: enam garis tegak lurus sumbu X                              #
        # ---------------------------------------------------------------- #
        garis = VGroup(*[
            DashedLine(titik3(L[i]), titik3(peta_cermin[i])).set_stroke(REDUP, TEBAL_BANTU)
            for i in range(len(L))
        ])

        with sinema.babak(self, "enam", DURASI) as b:
            b.main(*[ShowCreation(g) for g in garis], run_time=1.8)
            b.main(Indicate(garis, color=SOROT), run_time=1.2)
            b.main(Indicate(prapeta, color=AKSEN2), run_time=1.2)
        qc.periksa_adegan(self, {"prapeta": prapeta}, hud=hud_kini(),
                          dunia={"bidang": bidang, "garis": garis})

        # ---------------------------------------------------------------- #
        # periksa dan hitung: koordinat A DIHITUNG dari petaknya            #
        # ---------------------------------------------------------------- #
        # Dua ruas berangka, satu di atas sumbu dan satu di bawahnya. Angkanya
        # ditulis supaya siswa bisa MEMERIKSA, bukan mempercayai: jarak A ke
        # sumbu dan jarak A aksen ke sumbu memang sama-sama satu petak.
        ruas_atas_a = Line(titik3(A), np.array([A[0], 0.0, 0.03])).set_stroke(AKSEN, 4.0)
        ruas_bawah_a = Line(np.array([A[0], 0.0, 0.03]), titik3(A_peta)).set_stroke(AKSEN, 4.0)
        angka_atas_a = sinema.label("1", warna=AKSEN)
        angka_atas_a.next_to(ruas_atas_a.get_center(), LEFT, buff=0.20)
        angka_bawah_a = sinema.label("1", warna=AKSEN)
        angka_bawah_a.next_to(ruas_bawah_a.get_center(), LEFT, buff=0.20)

        # KEJADIANNYA HARUS SEBESAR BENTUKNYA, BUKAN SEBESAR RUASNYA.
        #
        # Versi pertama babak ini cuma menggambar dua ruas berangka, dan alat
        # ukur menilai SELURUH babak 8,3 detik itu DIAM. Sebabnya bukan tidak
        # ada kejadian, melainkan kejadiannya terlalu kecil: ruas setebal 4,0
        # sepanjang satu petak hanya sekitar 100 piksel, sedangkan ambang alat
        # 300 piksel dari 409.920. Memperbesar ketebalan saja tidak cukup.
        #
        # Yang benar-benar terbaca sebagai gerakan adalah kejadian seukuran
        # bentuknya: `ShowCreation` poligon, `Indicate` seluruh bentuk, atau
        # gerakan kamera. Karena itu tiap babak sekarang punya minimal satu
        # sorotan pada bentuk utuh, dan ruas berangkanya jadi pelengkap, bukan
        # satu-satunya kejadian.
        with sinema.babak(self, "periksa", DURASI) as b:
            b.main(Indicate(prapeta, color=SOROT), run_time=1.2)
            b.main(ShowCreation(ruas_atas_a), FadeIn(angka_atas_a), run_time=1.4)
            b.tunggu_sampai(sinema.mulai(jam, "jadi bayangannya"))
            # Sorotan bentuk utuh ditaruh SESUDAH penantian, bukan cuma di awal
            # babak. Versi sebelumnya menaruh keduanya di ujung-ujung babak,
            # dan bagian tengahnya, yaitu 6,9 detik saat narator justru sedang
            # menuntun hitungannya, dinilai diam oleh alat ukur.
            b.main(
                ShowCreation(ruas_bawah_a), FadeIn(angka_bawah_a),
                Indicate(garis, color=AKSEN2),
                run_time=1.6,
            )
            b.main(Indicate(prapeta, color=AKSEN2), run_time=1.2)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "angka atas": angka_atas_a, "angka bawah": angka_bawah_a},
            [("angka atas", "angka bawah")], hud=hud_kini(), dunia={"bidang": bidang},
        )

        with sinema.babak(self, "hitung", DURASI) as b:
            rum = sinema.lahir_rumus(
                self, r"A(1,\ 1) \to A'(1,\ -1)",
                dekat=titik_jalan[0], papan=papan, b=b, warna=AKSEN2,
            )
        qc.periksa_adegan(self, {"prapeta": prapeta}, hud=hud_kini(), dunia={"bidang": bidang})

        # ---------------------------------------------------------------- #
        # peta2: petanya menjadi bentuk utuh                                #
        # ---------------------------------------------------------------- #
        peta_bentuk = poligon(peta_cermin, AKSEN2, tebal=TEBAL_BENTUK, isian=ISI_PETA)
        nama_peta = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(f"{huruf}'", warna=AKSEN2)
            t.next_to(titik3(peta_cermin[i]), UP if i < 2 else DOWN, buff=0.24)
            nama_peta[huruf] = t
        l_peta = sinema.label("peta", warna=AKSEN2)
        l_peta.next_to(titik3((6.0, -1.5)), RIGHT, buff=0.30)

        with sinema.babak(self, "peta2", DURASI) as b:
            b.main(
                FadeOut(ruas_atas_a), FadeOut(ruas_bawah_a),
                FadeOut(angka_atas_a), FadeOut(angka_bawah_a),
                run_time=0.7,
            )
            b.main(
                ShowCreation(peta_bentuk),
                *[FadeIn(nama_peta[h]) for h in nama_peta],
                FadeIn(l_peta),
                run_time=1.8,
            )
            b.main(Indicate(peta_bentuk, color=AKSEN2), run_time=1.4)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "peta": peta_bentuk, "label peta": l_peta},
            [("label peta", "peta")], hud=hud_kini(), dunia={"bidang": bidang},
        )

        # ---------------------------------------------------------------- #
        # kedua dan cocok: contoh KEDUA, titik C, jaraknya dua petak         #
        # ---------------------------------------------------------------- #
        # Contoh kedua ini bukan pengulangan. Titik A berjarak satu petak dari
        # sumbu, C berjarak dua. Dengan satu contoh saja, aturan "y berbalik
        # tanda" tidak bisa dibedakan dari "y dikurangi dua", dan siswa yang
        # menghafal contoh pertama akan salah pada soal berikutnya.
        ruas_atas_c = Line(titik3(C), np.array([C[0], 0.0, 0.03])).set_stroke(SOROT, 4.0)
        ruas_bawah_c = Line(np.array([C[0], 0.0, 0.03]), titik3(C_peta)).set_stroke(SOROT, 4.0)
        angka_atas_c = sinema.label("2", warna=SOROT)
        angka_atas_c.next_to(ruas_atas_c.get_center(), RIGHT, buff=0.20)
        angka_bawah_c = sinema.label("2", warna=SOROT)
        angka_bawah_c.next_to(ruas_bawah_c.get_center(), RIGHT, buff=0.20)

        with sinema.babak(self, "kedua", DURASI) as b:
            b.main(Indicate(nama_pra["C"], color=SOROT), run_time=1.0)
            b.main(ShowCreation(ruas_atas_c), FadeIn(angka_atas_c), run_time=1.6)
            b.main(Indicate(prapeta, color=SOROT), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_bentuk, "angka C": angka_atas_c},
                          hud=hud_kini(), dunia={"bidang": bidang})

        with sinema.babak(self, "cocok", DURASI) as b:
            b.main(ShowCreation(ruas_bawah_c), FadeIn(angka_bawah_c), run_time=1.6)
            b.main(Indicate(peta_bentuk, color=SOROT), run_time=1.4)
            papan.baris(r"C(6,\ 2) \to C'(6,\ -2)", warna=SOROT, b=b)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "peta": peta_bentuk, "angka C bawah": angka_bawah_c},
            hud=hud_kini(), dunia={"bidang": bidang},
        )

        # ---------------------------------------------------------------- #
        # aturan: pola dari kedua contoh                                    #
        # ---------------------------------------------------------------- #
        with sinema.babak(self, "aturan", DURASI) as b:
            b.main(
                FadeOut(ruas_atas_c), FadeOut(ruas_bawah_c),
                FadeOut(angka_atas_c), FadeOut(angka_bawah_c),
                run_time=0.7,
            )
            papan.baris(r"(x,\ y) \to (x,\ -y)", warna=TINTA, b=b)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_bentuk},
                          hud=hud_kini(), dunia={"bidang": bidang})

        # ---------------------------------------------------------------- #
        # keliru dan betul: kekeliruan diperagakan lalu dibetulkan          #
        # ---------------------------------------------------------------- #
        salah = poligon(peta_geser, AKSEN, tebal=TEBAL_BENTUK, isian=ISI_PETA)

        with sinema.babak(self, "keliru", DURASI) as b:
            b.main(FadeOut(peta_bentuk), *[FadeOut(nama_peta[h]) for h in nama_peta],
                   FadeOut(l_peta), run_time=0.7)
            b.main(ShowCreation(salah), run_time=1.8)
            b.main(Indicate(salah, color=AKSEN), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "salah": salah},
                          hud=hud_kini(), dunia={"bidang": bidang})

        with sinema.babak(self, "betul", DURASI) as b:
            b.main(Indicate(salah, color=AKSEN), run_time=1.2)
            b.main(FadeOut(salah), run_time=0.8)
            b.main(ShowCreation(peta_bentuk), run_time=1.4)
            b.main(Indicate(peta_bentuk, color=AKSEN2), run_time=1.2)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_bentuk},
                          hud=hud_kini(), dunia={"bidang": bidang})

        # ---------------------------------------------------------------- #
        # bukti: dilatasi mengubah jarak antartitik                         #
        # ---------------------------------------------------------------- #
        KOTAK_BESAR = (0.0, 13.0, 0.0, 7.0)
        pusat_besar, tinggi_besar = letak_peta(*KOTAK_BESAR)
        bidang_besar = bidang_untuk(*KOTAK_BESAR)
        peta_besar = poligon(peta_dilatasi, SOROT, tebal=TEBAL_BENTUK, isian=ISI_PETA)
        garis_besar = VGroup(*[
            DashedLine(titik3(L[i]), titik3(peta_dilatasi[i])).set_stroke(REDUP, TEBAL_BANTU)
            for i in range(len(L))
        ])

        with sinema.babak(self, "bukti", DURASI) as b:
            b.main(
                FadeOut(peta_bentuk), FadeOut(garis), FadeOut(l_prapeta),
                *[FadeOut(d) for d in titik_jalan],
                run_time=0.7,
            )
            b.main(
                kamera.dunia_ke_peta(frame, pusat=pusat_besar, tinggi=tinggi_besar),
                FadeOut(bidang), FadeIn(bidang_besar),
                run_time=max(1.6, DURASI["bukti"] - 4.4),
            )
            b.main(ShowCreation(garis_besar), ShowCreation(peta_besar), run_time=1.8)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta besar": peta_besar},
                          hud=hud_kini(), dunia={"bidang": bidang_besar})

        # ---------------------------------------------------------------- #
        # rangkum dan tanya: penutup                                        #
        # ---------------------------------------------------------------- #
        with sinema.babak(self, "rangkum", DURASI) as b:
            rum = sinema.ganti_rumus(
                self, rum, r"A(1,\ 1) \to A'(2,\ 2)", b=b, warna=SOROT, papan=papan,
            )
            b.main(Indicate(peta_besar, color=SOROT), run_time=1.2)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta besar": peta_besar},
                          hud=hud_kini(), dunia={"bidang": bidang_besar})

        # Pertanyaan penutup ditandai di GAMBAR, bukan cuma diucapkan: sebuah
        # titik diletakkan tepat di sumbu X dan disorot, supaya penonton punya
        # benda untuk dipikirkan selama pertanyaannya dibacakan.
        titik_sumbu = Dot(np.array([9.0, 0.0, 0.05]), radius=JARI_TITIK * 1.3).set_color(AKSEN)
        l_sumbu = sinema.label("di sumbu", warna=AKSEN)
        l_sumbu.next_to(titik_sumbu, UP, buff=0.26)

        with sinema.babak(self, "tanya", DURASI) as b:
            b.main(FadeIn(titik_sumbu, scale=0.4), FadeIn(l_sumbu), run_time=1.2)
            b.main(Indicate(titik_sumbu, color=AKSEN), run_time=1.2)
        qc.periksa_adegan(self, {"peta besar": peta_besar, "label sumbu": l_sumbu},
                          hud=hud_kini(), dunia={"bidang": bidang_besar})
