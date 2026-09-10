"""Video 01 Transformasi Geometri, Materi 01 "Setiap titik ikut pindah".

STANDAR VIDEO v3 (8 September 2026). Ditulis ulang dari versi 2 yang 130 detik
dan 18 babak jadi 273 detik dan 31 babak, mengikuti gaya Turunan 02 versi rinci.

APA YANG BERUBAH DARI VERSI 2, DAN KENAPA
1. RUMUSNYA SEKARANG DIBUKTIKAN. Versi 2 menghitung dua contoh lalu berkata
   "dua contoh tadi memberi satu pola". Itu pola, bukan bukti, dan ARYA
   meminta asal rumus terlihat. Empat babak `umum_*` menurunkan
   (x, y) -> (x, -y) dari jarak titik ke sumbu, sebelum satu angka pun dipakai
   lagi.
2. ADA SEGAR-INGAT. Video pertama sebuah topik mengingat topik PRASYARATNYA.
   Di sini Vektor Materi 03, "Memecah panah jadi dua langkah": di situlah siswa
   belajar satu panah dinamai dua angka, dan di video ini satu TITIK dinamai
   dua angka dengan cara yang sama.
3. ANIMASI DIPICU PER KATA. `sinema.JamKata` membaca `kata.json` (waktu tiap
   kata dari WordBoundary TTS), dan tiap `b.tunggu_kata("frasa")` menahan layar
   sampai kata itu benar-benar diucapkan. `sinema.laporkan_pemicu` di akhir
   menggagalkan render kalau ada pemicu terlambat lebih dari 0,15 detik.

TIGA DIMENSI HANYA DI BABAK `dunia`, 5,4 detik, lalu kamera turun ke peta.
Topik ini boleh punya pembuka 3D (pengecualian di berkas tugas), tetapi sudut
dan jarak sesudahnya harus akurat, dan kamera miring merusak keduanya.

TIDAK ADA KATA "CERMIN" DI SELURUH VIDEO INI. Pencerminan baru diajarkan
Materi 02; di sini yang dipakai kata sehari-hari "lipatan". Dijaga
`alat/cek_urutan_belajar.py`.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
from transformasi_umum import (  # noqa: E402
    L, NAMA_SUDUT, bidang_untuk, letak_peta, poligon, titik3,
)

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "transformasi1-setiap-titik"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

ORANG_X, ORANG_Y = 3.5, 1.4

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

# Titik umum untuk babak pembuktian. Sengaja BUKAN salah satu sudut huruf L:
# kalau ia berimpit dengan A atau C, siswa bisa mengira buktinya cuma berlaku
# untuk contoh yang tadi dihitung.
P_UMUM = (4.0, 2.0)


def cermin_x(p):
    return (p[0], -p[1])


def geser_turun(p):
    """Kekeliruan yang diperagakan: bentuknya DIGESER, bukan dilipat.

    Turun 4 satuan dipilih supaya kotak dunianya persis sama dengan peta yang
    benar, sehingga bedanya murni pada bentuknya, bukan pada letaknya.
    """
    return (p[0], p[1] - 4.0)


class TransformasiSetiapTitik(AdeganMatra):
    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)

        peta_cermin = [cermin_x(p) for p in L]
        peta_geser = [geser_turun(p) for p in L]

        A, C = L[0], L[2]
        A_peta, C_peta = peta_cermin[0], peta_cermin[2]

        ident = None

        def hud_kini():
            isi = {}
            if ident is not None:
                isi["identitas"] = ident
            papan_isi = papan.semua()
            if papan_isi is not None:
                isi["papan"] = papan_isi
            return isi

        # ================================================================ #
        # PEMBUKA: satu pertanyaan, diucapkan DAN ditulis                   #
        # ================================================================ #
        tanya_buka = rumus(r"\text{Apa yang sebenarnya pindah?}", 44, TINTA)
        sinema.batasi_lebar(tanya_buka, 9.0)
        tanya_buka.move_to(ORIGIN)

        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("sebenarnya")
            b.main(FadeIn(tanya_buka, shift=0.3 * UP), run_time=1.2)

        # ================================================================ #
        # SEGAR-INGAT: Vektor Materi 03, panah jadi dua langkah             #
        # ================================================================ #
        # Panah kecil beserta dua langkahnya, digambar di layar kosong tanpa
        # bidang petak: yang diingat bentuk gagasannya, bukan letaknya.
        pangkal = np.array([-3.2, -1.2, 0.0])
        ujung = np.array([-0.2, 0.8, 0.0])
        panah = Arrow(pangkal, ujung, buff=0, thickness=5).set_color(AKSEN2)
        siku = np.array([ujung[0], pangkal[1], 0.0])
        langkah_datar = Line(pangkal, siku).set_stroke(REDUP, TEBAL_BANTU)
        langkah_tegak = Line(siku, ujung).set_stroke(REDUP, TEBAL_BANTU)
        l_datar = sinema.label("3 kanan", warna=REDUP)
        l_datar.next_to(langkah_datar, DOWN, buff=0.22)
        l_tegak = sinema.label("2 naik", warna=REDUP)
        l_tegak.next_to(langkah_tegak, RIGHT, buff=0.22)

        with sinema.babak(self, "ingat_panah", DURASI, kata=KATA) as b:
            b.tunggu_kata("Vektor")
            b.main(FadeOut(tanya_buka), GrowArrow(panah), run_time=1.2)
            b.tunggu_kata("langkah mendatarnya")
            b.main(ShowCreation(langkah_datar), FadeIn(l_datar), run_time=1.2)
            b.tunggu_kata("langkah tegaknya")
            b.main(ShowCreation(langkah_tegak), FadeIn(l_tegak), run_time=1.2)
        qc.periksa_adegan(self, {"panah": panah},
                          tulisan={"3 kanan": l_datar, "2 naik": l_tegak})

        # Titik dinamai dengan cara yang sama: (1, 1) di petak kecil.
        petak_ingat = bidang_untuk(-1.0, 3.0, -1.0, 3.0)
        petak_ingat.scale(0.55).move_to(np.array([3.4, -0.2, 0.0]))
        dot_ingat = Dot(petak_ingat.c2p(1, 1), radius=JARI_TITIK).set_color(AKSEN)
        l_ingat = sinema.label("(1, 1)", warna=AKSEN)
        l_ingat.next_to(dot_ingat, UR, buff=0.20)

        with sinema.babak(self, "ingat_titik", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sebuah titik")
            b.main(FadeIn(petak_ingat), run_time=1.0)
            b.tunggu_kata("satu koma satu")
            b.main(FadeIn(dot_ingat, scale=0.4), FadeIn(l_ingat), run_time=1.0)
            b.tunggu_kata("satu petak ke atas")
            b.main(Indicate(dot_ingat, color=SOROT), run_time=1.2)
        qc.periksa_adegan(self, {"panah": panah, "titik": dot_ingat},
                          tulisan={"label titik": l_ingat})

        # Yang dibawa ke video ini: sepasang angka jadi sepasang angka lain.
        # DI ATAS LAYAR, bukan di bawahnya. Percobaan pertama menaruhnya di
        # y = -2,6 dan qc menggagalkan render: tepi bawahnya -2,80, sedangkan
        # jalur subtitle mulai -2,55. Bagian bawah layar milik subtitle, dan
        # di babak ini bagian atas justru kosong: identitas dan panel rumus
        # belum ada satu pun.
        bawa = rumus(r"(x,\ y) \ \longrightarrow\ (?,\ ?)", 40, SOROT)
        sinema.batasi_lebar(bawa, 8.0)
        bawa.move_to(np.array([0.0, 2.6, 0.0]))

        # Pemicu kedua memakai "menjadi sepasang", BUKAN "sepasang angka" lagi.
        # Frasa itu muncul DUA KALI di kalimat ini, dan `tunggu_kata` selalu
        # mengambil kemunculan pertama, jadi pemicu kedua akan menunjuk detik
        # yang sudah lewat. Render 8 Sep gagal persis begitu, sembilan menit
        # 1080p60 terbuang untuk kesalahan satu baris. Dijaga sekarang oleh
        # `alat/cek_pemicu_urut.py`, yang menolaknya sebelum render.
        with sinema.babak(self, "bawa", DURASI, kata=KATA) as b:
            b.tunggu_kata("sepasang angka")
            b.main(FadeIn(bawa, shift=0.25 * UP), run_time=1.2)
            b.tunggu_kata("menjadi sepasang")
            b.main(Indicate(bawa, color=AKSEN), run_time=1.4)
        qc.periksa_adegan(self, {"bawa": bawa})

        # ================================================================ #
        # DUNIA: pembuka 3D, 5,4 detik, satu-satunya bagian 3D video ini    #
        # ================================================================ #
        lapangan = ilustrasi.tanah(panjang=15.0, lebar=11.0, y_tengah=0.0, z=0.0)
        garis_lipat = DashedLine(
            np.array([-4.0, 0.0, 0.03]), np.array([11.0, 0.0, 0.03]),
        ).set_stroke(SOROT, 4.0)
        orang = ilustrasi.orang(tinggi=1.7)
        orang.shift(np.array([ORANG_X, ORANG_Y, 0.0]))
        seberang = ilustrasi.orang(tinggi=1.7)
        seberang.shift(np.array([ORANG_X, -ORANG_Y, 0.0]))
        seberang.set_opacity(0.34)

        # Tanpa tulisan apa pun selama kamera miring: teks di ruang 3D ikut
        # dimiringkan dan pernah tergambar TERBALIK (temuan 4 Sep 2026).
        with sinema.babak(self, "dunia", DURASI, kata=KATA) as b:
            b.main(
                FadeOut(panah), FadeOut(langkah_datar), FadeOut(langkah_tegak),
                FadeOut(l_datar), FadeOut(l_tegak), FadeOut(petak_ingat),
                FadeOut(dot_ingat), FadeOut(l_ingat), FadeOut(bawa),
                run_time=0.6,
            )
            kamera.pasang_awal(frame, theta=-24, phi=62,
                               pusat=(ORANG_X, 0.0, 0.7), tinggi=8.2)
            b.tunggu_kata("lapangan")
            b.main(FadeIn(lapangan), FadeIn(orang), run_time=1.2)
            b.tunggu_kata("garis")
            b.main(ShowCreation(garis_lipat), FadeIn(seberang), run_time=1.4)
        qc.periksa_adegan(self, {"orang": orang}, margin=0.45)

        # ================================================================ #
        # PETA: kamera turun tegak lurus, bidang bernomor                   #
        # ================================================================ #
        pusat_peta, tinggi_peta = letak_peta(*KOTAK)
        bidang = bidang_untuk(*KOTAK)

        with sinema.babak(self, "peta", DURASI, kata=KATA) as b:
            b.tunggu_kata("dari atas")
            b.main(
                kamera.dunia_ke_peta(frame, pusat=pusat_peta, tinggi=tinggi_peta),
                run_time=2.2,
            )
            b.main(
                FadeOut(lapangan), FadeOut(orang), FadeOut(seberang),
                FadeOut(garis_lipat), FadeIn(bidang),
                run_time=1.0,
            )
            ident = sinema.identitas(self, "1 petak = 1 satuan")
        qc.periksa_adegan(self, {}, hud=hud_kini(), dunia={"bidang": bidang})

        # ================================================================ #
        # BENTUK dan NAMA: prapeta                                          #
        # ================================================================ #
        prapeta = poligon(L, TINTA, tebal=TEBAL_BENTUK, isian=ISI_PRAPETA)
        nama_pra = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(huruf, warna=TINTA)
            t.next_to(titik3(L[i]), DOWN if i < 2 else UP, buff=0.24)
            nama_pra[huruf] = t
        # Label bentuk ditaruh di KANAN bentuknya, di luar kotak pembatasnya:
        # qc membandingkan kotak pembatas, bukan bentuk poligonnya, jadi label
        # di ceruk huruf L tetap dinilai menindih (render 5 Sep gagal di situ).
        l_prapeta = sinema.label("prapeta", warna=TINTA)
        l_prapeta.next_to(titik3((6.0, 2.0)), RIGHT, buff=0.30)

        with sinema.babak(self, "bentuk", DURASI, kata=KATA) as b:
            b.tunggu_kata("huruf L")
            b.main(ShowCreation(prapeta), run_time=1.6)
            b.tunggu_kata("Tiga sudutnya")
            b.main(*[FadeIn(nama_pra[h]) for h in nama_pra], run_time=1.2)
        qc.periksa_adegan(self, {"prapeta": prapeta}, hud=hud_kini(),
                          dunia={"bidang": bidang})

        with sinema.babak(self, "nama", DURASI, kata=KATA) as b:
            b.tunggu_kata("prapeta")
            b.main(FadeIn(l_prapeta), run_time=1.0)
            b.main(Indicate(prapeta, color=AKSEN2), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta}, hud=hud_kini(),
                          tulisan={"label prapeta": l_prapeta},
                          dunia={"bidang": bidang})

        # ================================================================ #
        # CONTOH ANGKA PERTAMA: titik A                                     #
        # ================================================================ #
        dot_a = Dot(titik3(A), radius=JARI_TITIK + 0.03).set_color(AKSEN)
        l_a = sinema.label("(1, 1)", warna=AKSEN)
        l_a.next_to(titik3(A), UL, buff=0.22)
        baca_x = Line(titik3((0.0, 0.0)), titik3((A[0], 0.0))).set_stroke(AKSEN, TEBAL_BANTU)
        baca_y = Line(titik3((A[0], 0.0)), titik3(A)).set_stroke(AKSEN, TEBAL_BANTU)

        with sinema.babak(self, "titik_a", DURASI, kata=KATA) as b:
            b.tunggu_kata("Titik A ada")
            b.main(FadeIn(dot_a, scale=0.4), FadeIn(l_a), run_time=1.0)
            b.tunggu_kata("satu ke kanan")
            b.main(ShowCreation(baca_x), run_time=1.0)
            b.tunggu_kata("satu ke atas")
            b.main(ShowCreation(baca_y), run_time=1.0)
        qc.periksa_adegan(self, {"prapeta": prapeta, "titik A": dot_a},
                          hud=hud_kini(), tulisan={"label A": l_a},
                          dunia={"bidang": bidang})

        garis_sumbu = DashedLine(
            titik3((-0.4, 0.0)), titik3((8.4, 0.0)),
        ).set_stroke(SOROT, 4.0)

        with sinema.babak(self, "lipat", DURASI, kata=KATA) as b:
            b.main(FadeOut(baca_x), FadeOut(baca_y), run_time=0.5)
            b.tunggu_kata("sumbu X")
            b.main(ShowCreation(garis_sumbu), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "titik A": dot_a},
                          hud=hud_kini(), tulisan={"label A": l_a},
                          dunia={"bidang": bidang, "lipatan": garis_sumbu})

        ruas_atas_a = Line(titik3((A[0], 0.0)), titik3(A)).set_stroke(AKSEN, 4.0)
        angka_atas_a = sinema.label("1", warna=AKSEN)
        angka_atas_a.next_to(ruas_atas_a.get_center(), RIGHT, buff=0.18)
        ruas_bawah_a = Line(titik3((A[0], 0.0)), titik3(A_peta)).set_stroke(AKSEN, 4.0)
        angka_bawah_a = sinema.label("1", warna=AKSEN)
        angka_bawah_a.next_to(ruas_bawah_a.get_center(), RIGHT, buff=0.18)

        with sinema.babak(self, "jarak_a", DURASI, kata=KATA) as b:
            b.tunggu_kata("satu petak di atas")
            b.main(ShowCreation(ruas_atas_a), FadeIn(angka_atas_a), run_time=1.2)
            b.tunggu_kata("sisi yang lain")
            b.main(ShowCreation(ruas_bawah_a), FadeIn(angka_bawah_a), run_time=1.4)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "titik A": dot_a},
            hud=hud_kini(),
            tulisan={"label A": l_a, "angka atas": angka_atas_a,
                     "angka bawah": angka_bawah_a},
            dunia={"bidang": bidang, "lipatan": garis_sumbu},
        )

        dot_a2 = Dot(titik3(A_peta), radius=JARI_TITIK + 0.03).set_color(AKSEN2)
        l_a2 = sinema.label("(1, -1)", warna=AKSEN2)
        l_a2.next_to(titik3(A_peta), DL, buff=0.22)

        with sinema.babak(self, "hasil_a", DURASI, kata=KATA) as b:
            b.tunggu_kata("bayangannya")
            b.main(FadeIn(dot_a2, scale=0.4), run_time=1.0)
            b.tunggu_kata("A aksen")
            b.main(FadeIn(l_a2), run_time=1.0)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "titik A": dot_a, "titik A aksen": dot_a2},
            hud=hud_kini(),
            tulisan={"label A": l_a, "label A aksen": l_a2},
            dunia={"bidang": bidang, "lipatan": garis_sumbu},
        )

        with sinema.babak(self, "hanya_y", DURASI, kata=KATA) as b:
            b.main(FadeOut(ruas_atas_a), FadeOut(ruas_bawah_a),
                   FadeOut(angka_atas_a), FadeOut(angka_bawah_a), run_time=0.5)
            b.tunggu_kata("Angka pertama")
            b.main(Indicate(l_a, color=SOROT), Indicate(l_a2, color=SOROT), run_time=1.2)
            b.tunggu_kata("angka kedua")
            b.main(Indicate(dot_a, color=SOROT), Indicate(dot_a2, color=SOROT),
                   run_time=1.4)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "titik A": dot_a, "titik A aksen": dot_a2},
            hud=hud_kini(), tulisan={"label A": l_a, "label A aksen": l_a2},
            dunia={"bidang": bidang, "lipatan": garis_sumbu},
        )

        # ================================================================ #
        # CONTOH ANGKA KEDUA: titik C, jaraknya BERBEDA                     #
        # ================================================================ #
        dot_c = Dot(titik3(C), radius=JARI_TITIK + 0.03).set_color(AKSEN)
        l_c = sinema.label("(6, 2)", warna=AKSEN)
        l_c.next_to(titik3(C), UR, buff=0.22)
        ruas_atas_c = Line(titik3((C[0], 0.0)), titik3(C)).set_stroke(SOROT, 4.0)
        angka_atas_c = sinema.label("2", warna=SOROT)
        angka_atas_c.next_to(ruas_atas_c.get_center(), RIGHT, buff=0.18)

        with sinema.babak(self, "titik_c", DURASI, kata=KATA) as b:
            b.tunggu_kata("titik C")
            b.main(FadeIn(dot_c, scale=0.4), FadeIn(l_c), run_time=1.0)
            b.tunggu_kata("dua petak di atas")
            b.main(ShowCreation(ruas_atas_c), FadeIn(angka_atas_c), run_time=1.4)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "titik C": dot_c},
            hud=hud_kini(), tulisan={"label C": l_c, "angka C": angka_atas_c},
            dunia={"bidang": bidang, "lipatan": garis_sumbu},
        )

        dot_c2 = Dot(titik3(C_peta), radius=JARI_TITIK + 0.03).set_color(AKSEN2)
        l_c2 = sinema.label("(6, -2)", warna=AKSEN2)
        l_c2.next_to(titik3(C_peta), DR, buff=0.22)
        ruas_bawah_c = Line(titik3((C[0], 0.0)), titik3(C_peta)).set_stroke(SOROT, 4.0)
        angka_bawah_c = sinema.label("2", warna=SOROT)
        angka_bawah_c.next_to(ruas_bawah_c.get_center(), RIGHT, buff=0.18)

        with sinema.babak(self, "hasil_c", DURASI, kata=KATA) as b:
            b.tunggu_kata("bayangannya")
            b.main(ShowCreation(ruas_bawah_c), FadeIn(angka_bawah_c),
                   FadeIn(dot_c2, scale=0.4), run_time=1.4)
            b.tunggu_kata("Angka pertamanya")
            b.main(FadeIn(l_c2), run_time=1.0)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "titik C": dot_c, "titik C aksen": dot_c2},
            hud=hud_kini(),
            tulisan={"label C": l_c, "label C aksen": l_c2,
                     "angka C atas": angka_atas_c, "angka C bawah": angka_bawah_c},
            dunia={"bidang": bidang, "lipatan": garis_sumbu},
        )

        with sinema.babak(self, "banding", DURASI, kata=KATA) as b:
            b.tunggu_kata("dua petak")
            b.main(Indicate(dot_a, color=AKSEN2), Indicate(dot_a2, color=AKSEN2),
                   run_time=1.2)
            b.tunggu_kata("empat")
            b.main(Indicate(ruas_atas_c, color=AKSEN), Indicate(ruas_bawah_c, color=AKSEN),
                   run_time=1.4)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "titik A": dot_a, "titik C": dot_c},
            hud=hud_kini(), tulisan={"label A": l_a, "label C": l_c},
            dunia={"bidang": bidang, "lipatan": garis_sumbu},
        )

        with sinema.babak(self, "kunci", DURASI, kata=KATA) as b:
            b.tunggu_kata("berbeda-beda")
            b.main(Indicate(prapeta, color=SOROT), run_time=1.4)
            b.main(FadeOut(ruas_atas_c), FadeOut(ruas_bawah_c),
                   FadeOut(angka_atas_c), FadeOut(angka_bawah_c), run_time=0.8)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "titik A": dot_a, "titik C": dot_c},
            hud=hud_kini(), tulisan={"label A": l_a, "label C": l_c},
            dunia={"bidang": bidang, "lipatan": garis_sumbu},
        )

        # ================================================================ #
        # ASAL RUMUS: diturunkan dari jarak, bukan ditebak dari pola        #
        # ================================================================ #
        # Semua tanda contoh dibuang dulu supaya layar bersih untuk buktinya.
        dot_p = Dot(titik3(P_UMUM), radius=JARI_TITIK + 0.03).set_color(SOROT)
        l_p = sinema.label("(x, y)", warna=SOROT)
        l_p.next_to(titik3(P_UMUM), UR, buff=0.22)
        ruas_y = Line(titik3((P_UMUM[0], 0.0)), titik3(P_UMUM)).set_stroke(SOROT, 4.0)
        l_y = sinema.label("y", warna=SOROT)
        l_y.next_to(ruas_y.get_center(), RIGHT, buff=0.18)

        with sinema.babak(self, "umum_jarak", DURASI, kata=KATA) as b:
            b.main(
                FadeOut(dot_a), FadeOut(dot_a2), FadeOut(l_a), FadeOut(l_a2),
                FadeOut(dot_c), FadeOut(dot_c2), FadeOut(l_c), FadeOut(l_c2),
                run_time=0.8,
            )
            b.tunggu_kata("sembarang")
            b.main(FadeIn(dot_p, scale=0.4), FadeIn(l_p), run_time=1.2)
        qc.periksa_adegan(self, {"prapeta": prapeta, "titik P": dot_p},
                          hud=hud_kini(), tulisan={"label P": l_p},
                          dunia={"bidang": bidang, "lipatan": garis_sumbu})

        with sinema.babak(self, "umum_tinggi", DURASI, kata=KATA) as b:
            b.tunggu_kata("tingginya")
            b.main(ShowCreation(ruas_y), FadeIn(l_y), run_time=1.4)
            b.tunggu_kata("dipertahankan")
            b.main(Indicate(ruas_y, color=AKSEN), run_time=1.2)
        qc.periksa_adegan(self, {"prapeta": prapeta, "titik P": dot_p},
                          hud=hud_kini(), tulisan={"label P": l_p, "label y": l_y},
                          dunia={"bidang": bidang, "lipatan": garis_sumbu})

        P_BAWAH = cermin_x(P_UMUM)
        dot_p2 = Dot(titik3(P_BAWAH), radius=JARI_TITIK + 0.03).set_color(AKSEN2)
        ruas_y2 = Line(titik3((P_UMUM[0], 0.0)), titik3(P_BAWAH)).set_stroke(AKSEN2, 4.0)
        l_y2 = sinema.label("-y", warna=AKSEN2)
        l_y2.next_to(ruas_y2.get_center(), RIGHT, buff=0.18)

        with sinema.babak(self, "umum_bawah", DURASI, kata=KATA) as b:
            b.tunggu_kata("berjarak sama")
            b.main(ShowCreation(ruas_y2), FadeIn(dot_p2, scale=0.4), run_time=1.4)
            b.tunggu_kata("negatif")
            b.main(FadeIn(l_y2), run_time=1.0)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "titik P": dot_p, "titik P bawah": dot_p2},
            hud=hud_kini(),
            tulisan={"label P": l_p, "label y": l_y, "label -y": l_y2},
            dunia={"bidang": bidang, "lipatan": garis_sumbu},
        )

        jalur_x = DashedLine(
            titik3((P_UMUM[0], 3.0)), titik3((P_UMUM[0], -3.0)),
        ).set_stroke(REDUP, 2.2)

        with sinema.babak(self, "umum_x", DURASI, kata=KATA) as b:
            b.tunggu_kata("tegak lurus")
            b.main(ShowCreation(jalur_x), run_time=1.4)
            b.tunggu_kata("tinggal diam")
            b.main(Indicate(dot_p, color=AKSEN), Indicate(dot_p2, color=AKSEN),
                   run_time=1.4)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "titik P": dot_p, "titik P bawah": dot_p2},
            hud=hud_kini(),
            tulisan={"label P": l_p, "label y": l_y, "label -y": l_y2},
            dunia={"bidang": bidang, "lipatan": garis_sumbu, "jalur": jalur_x},
        )

        with sinema.babak(self, "rumus", DURASI, kata=KATA) as b:
            b.tunggu_kata("aturannya")
            rum = sinema.lahir_rumus(
                self, r"(x,\ y) \to (x,\ -y)",
                dekat=dot_p, papan=papan, b=b, warna=SOROT,
            )
        qc.periksa_adegan(self, {"prapeta": prapeta, "titik P": dot_p},
                          hud=hud_kini(),
                          dunia={"bidang": bidang, "lipatan": garis_sumbu})

        with sinema.babak(self, "uji_rumus", DURASI, kata=KATA) as b:
            b.main(
                FadeOut(dot_p), FadeOut(dot_p2), FadeOut(l_p),
                FadeOut(ruas_y), FadeOut(ruas_y2), FadeOut(l_y), FadeOut(l_y2),
                FadeOut(jalur_x),
                run_time=0.8,
            )
            b.tunggu_kata("satu koma satu")
            papan.baris(r"(1,\ 1) \to (1,\ -1)", warna=AKSEN2, b=b)
            b.tunggu_kata("enam koma dua")
            papan.baris(r"(6,\ 2) \to (6,\ -2)", warna=AKSEN2, b=b)
            b.tunggu_kata("cocok")
            b.main(Indicate(prapeta, color=AKSEN2), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta}, hud=hud_kini(),
                          dunia={"bidang": bidang, "lipatan": garis_sumbu})

        # ================================================================ #
        # PETA: aturan dikenakan pada keenam sudut                          #
        # ================================================================ #
        garis_jalan = VGroup(*[
            Line(titik3(L[i]), titik3(peta_cermin[i])).set_stroke(REDUP, 2.0)
            for i in range(len(L))
        ])
        peta_bentuk = poligon(peta_cermin, AKSEN2, tebal=TEBAL_BENTUK, isian=ISI_PETA)
        nama_peta = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(f"{huruf}'", warna=AKSEN2)
            t.next_to(titik3(peta_cermin[i]), UP if i < 2 else DOWN, buff=0.24)
            nama_peta[huruf] = t
        l_peta = sinema.label("peta", warna=AKSEN2)
        l_peta.next_to(titik3((6.0, -2.0)), RIGHT, buff=0.30)

        with sinema.babak(self, "semua", DURASI, kata=KATA) as b:
            b.tunggu_kata("keenam sudutnya")
            b.main(ShowCreation(garis_jalan), run_time=1.6)
            b.tunggu_kata("sendiri-sendiri")
            b.main(ShowCreation(peta_bentuk),
                   *[FadeIn(nama_peta[h]) for h in nama_peta], run_time=1.8)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_bentuk},
                          hud=hud_kini(),
                          dunia={"bidang": bidang, "lipatan": garis_sumbu,
                                 "garis jalan": garis_jalan})

        with sinema.babak(self, "peta_jadi", DURASI, kata=KATA) as b:
            b.tunggu_kata("peta")
            b.main(FadeIn(l_peta), run_time=1.0)
            b.tunggu_kata("semua titiknya")
            b.main(Indicate(peta_bentuk, color=SOROT), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_bentuk},
                          hud=hud_kini(),
                          tulisan={"label prapeta": l_prapeta, "label peta": l_peta},
                          dunia={"bidang": bidang, "lipatan": garis_sumbu,
                                 "garis jalan": garis_jalan})

        # ================================================================ #
        # KEKELIRUAN: digeser, bukan dilipat                                #
        # ================================================================ #
        salah = poligon(peta_geser, AKSEN, tebal=TEBAL_BENTUK, isian=ISI_PETA)

        with sinema.babak(self, "keliru", DURASI, kata=KATA) as b:
            b.main(
                FadeOut(peta_bentuk), *[FadeOut(nama_peta[h]) for h in nama_peta],
                FadeOut(l_peta), FadeOut(garis_jalan),
                run_time=0.8,
            )
            b.tunggu_kata("merah")
            b.main(ShowCreation(salah), run_time=1.8)
        qc.periksa_adegan(self, {"prapeta": prapeta, "salah": salah},
                          hud=hud_kini(),
                          dunia={"bidang": bidang, "lipatan": garis_sumbu})

        with sinema.babak(self, "beda_kaki", DURASI, kata=KATA) as b:
            b.tunggu_kata("kaki")
            b.main(Indicate(salah, color=SOROT), run_time=1.4)
            b.tunggu_kata("Yang benar")
            b.main(FadeOut(salah), ShowCreation(peta_bentuk),
                   *[FadeIn(nama_peta[h]) for h in nama_peta], run_time=1.8)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_bentuk},
                          hud=hud_kini(),
                          dunia={"bidang": bidang, "lipatan": garis_sumbu})

        dot_salah = Dot(titik3(geser_turun(A)), radius=JARI_TITIK + 0.03).set_color(AKSEN)
        l_salah = sinema.label("(1, -3)", warna=AKSEN)
        l_salah.next_to(titik3(geser_turun(A)), DL, buff=0.22)

        with sinema.babak(self, "uji_titik", DURASI, kata=KATA) as b:
            b.tunggu_kata("periksa satu titik")
            b.main(FadeIn(dot_a, scale=0.4), FadeIn(l_a), run_time=1.0)
            b.tunggu_kata("digeser menaruh")
            b.main(FadeIn(dot_salah, scale=0.4), FadeIn(l_salah), run_time=1.2)
            b.tunggu_kata("Aturan kita")
            b.main(FadeIn(dot_a2, scale=0.4), FadeIn(l_a2),
                   Indicate(dot_a2, color=SOROT), run_time=1.4)
        qc.periksa_adegan(
            self,
            {"prapeta": prapeta, "peta": peta_bentuk, "titik salah": dot_salah,
             "titik A aksen": dot_a2},
            hud=hud_kini(),
            tulisan={"label A": l_a, "label A aksen": l_a2, "label salah": l_salah},
            dunia={"bidang": bidang, "lipatan": garis_sumbu},
        )

        # ================================================================ #
        # PENUTUP                                                           #
        # ================================================================ #
        with sinema.babak(self, "rangkum", DURASI, kata=KATA) as b:
            b.main(FadeOut(dot_salah), FadeOut(l_salah), run_time=0.6)
            b.tunggu_kata("setiap titiknya")
            b.main(Indicate(prapeta, color=AKSEN2), Indicate(peta_bentuk, color=AKSEN2),
                   run_time=1.6)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_bentuk},
                          hud=hud_kini(),
                          dunia={"bidang": bidang, "lipatan": garis_sumbu})

        titik_di_sumbu = Dot(titik3((3.0, 0.0)), radius=0.16).set_color(SOROT)
        l_di_sumbu = sinema.label("di sumbu?", warna=SOROT)
        l_di_sumbu.next_to(titik_di_sumbu, UP, buff=0.26)

        with sinema.babak(self, "tanya", DURASI, kata=KATA) as b:
            b.tunggu_kata("tepat berada")
            b.main(FadeIn(titik_di_sumbu, scale=0.4), FadeIn(l_di_sumbu), run_time=1.2)
            b.main(Indicate(titik_di_sumbu, color=AKSEN), run_time=1.2)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "peta": peta_bentuk, "titik di sumbu": titik_di_sumbu},
            hud=hud_kini(), tulisan={"label di sumbu": l_di_sumbu},
            dunia={"bidang": bidang, "lipatan": garis_sumbu},
        )

        with sinema.babak(self, "berikut", DURASI, kata=KATA) as b:
            b.main(FadeOut(titik_di_sumbu), FadeOut(l_di_sumbu), run_time=0.6)
            b.tunggu_kata("kita pindahkan")
            b.main(garis_sumbu.animate.shift(1.2 * UP), run_time=1.6)
            b.tunggu_kata("aturan dua angka")
            b.main(Indicate(rum, color=AKSEN), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_bentuk},
                          hud=hud_kini(),
                          dunia={"bidang": bidang, "lipatan": garis_sumbu})

        sinema.laporkan_pemicu(self)
