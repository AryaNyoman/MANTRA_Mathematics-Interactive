"""Video 02 Transformasi Geometri, Materi 02 "Cermin pada garis tegak dan mendatar".

TANPA 3D, DAN ITU DISENGAJA
Seluruh isi video ini adalah klaim tentang JARAK: titik dan bayangannya sama
jauh dari cermin. Kamera miring memendekkan satu arah lebih banyak daripada
arah lain, jadi gambar miring akan membantah angka yang sedang diucapkan.
Aturan proyek: matematika yang butuh panjang akurat wajib kamera tegak lurus.

Letak kamera diambil dari `transformasi_umum.letak_peta`, bukan dihitung ulang
di sini. Alasannya ada di kepala berkas itu.

Alur berkas: buat_narasi -> buat_subtitle -> cek_kode -> manimgl -w -l ->
cek_video (BUKA lembar kontak) -> gabung_audio --uji.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
from transformasi_umum import (  # noqa: E402
    L, NAMA_SUDUT, bidang_untuk, letak_peta, poligon, tempel_label, titik3,
)

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "transformasi2-cermin-garis"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

K_AWAL = 0.0    # cermin berimpit sumbu Y
K_GESER = 5.0   # angka yang sama dengan contoh berhitung di halaman Materi 03


def cermin_tegak(p, k):
    return (2 * k - p[0], p[1])


class TransformasiCerminGaris(AdeganMatra):
    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)

        peta_awal = [cermin_tegak(p, K_AWAL) for p in L]
        peta_geser = [cermin_tegak(p, K_GESER) for p in L]

        # --- buka -------------------------------------------------------- #
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(3.0, DURASI["buka"] - 0.6)
            sinema.judul_pembuka(self, "Materi 02: Cermin pada garis lurus", lama=lama)
            b.catat(lama)

        # Babak "kaca" dan "jarak" memakai bidang yang sama dengan babak
        # berikutnya, jadi bidangnya dipasang sekali di awal dan tidak pernah
        # dibongkar. Layar yang tidak berubah selama narasi masih membahas hal
        # yang sama itu diizinkan; yang dilarang layar KOSONG.
        pusat_a, tinggi_a = letak_peta(-7.0, 7.0, 0.0, 4.0)
        bidang = bidang_untuk(-7.0, 7.0, 0.0, 4.0)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat_a, tinggi=tinggi_a)

        prapeta = poligon(L, TINTA, tebal=3.2, isian=0.08)
        nama_pra = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(huruf, warna=TINTA)
            t.next_to(titik3(L[i]), DOWN if i < 2 else UP, buff=0.22)
            nama_pra[huruf] = t

        garis_cermin = DashedLine(
            np.array([K_AWAL, -0.2, 0.03]), np.array([K_AWAL, 4.2, 0.03]),
        ).set_stroke(SOROT, 3.0)

        # DUA BABAK PERTAMA MENJAWAB PERTANYAAN NARASINYA, BUKAN MENUNGGUNYA.
        #
        # Versi pertama cuma menampilkan bidang dan garis cermin, lalu diam
        # 14,1 detik sementara narator bertanya "bayanganmu ada di mana" dan
        # menjawabnya sendiri. Terukur oleh `alat/ukur_detik_pertama.py`, dan
        # bukan cuma angka yang buruk: pertanyaan tentang JARAK dijawab layar
        # yang tidak memuat satu jarak pun.
        #
        # Sekarang orangnya sungguh ada di layar sebagai sebuah titik berjarak
        # 2 dari kaca, dan bayangannya muncul tepat saat narator menyebutnya.
        orang = (-2.0, 2.0)
        bayangan = cermin_tegak(orang, K_AWAL)

        # ORANGNYA SEBUAH BENTUK, BUKAN SEBUAH TITIK.
        #
        # Dua sebab, dan keduanya nyata. Pertama, titik berjari-jari 0,09 hanya
        # sekitar 100 piksel, jauh di bawah ambang 300 alat ukur, sehingga
        # seluruh babak ini dinilai DIAM walaupun ada yang muncul di layar.
        # Kedua, bentuk yang TIDAK SIMETRIS memperlihatkan hal yang justru
        # sedang diajarkan: bayangannya menghadap arah sebaliknya. Sebuah titik
        # tidak bisa menunjukkan itu, sebab titik tidak punya arah.
        #
        # UKURANNYA DINAIKKAN 1,6 KALI dari percobaan 5 Sep. Bidang babak ini
        # selebar 14 satuan, sebab babak "bentuk" nanti memakai bidang yang
        # sama untuk bentuk L beserta petanya di seberang cermin. Pada lebar
        # itu sosok setinggi 1,4 satuan cuma sekitar sepersebelas tinggi layar,
        # dan di lembar kontak ia terbaca sebagai noda, bukan orang.
        def sosok(pusat_x, pusat_y):
            return [
                (pusat_x - 0.56, pusat_y - 1.12),
                (pusat_x + 0.56, pusat_y - 1.12),
                (pusat_x + 0.56, pusat_y + 0.32),
                (pusat_x, pusat_y + 1.12),
            ]

        dot_orang = poligon(sosok(*orang), TINTA, tebal=4.0, isian=0.16)
        # Ditempel ke BENDANYA, bukan ke titik pusatnya. Lihat `tempel_label`.
        l_orang = tempel_label(sinema.label("kamu", warna=TINTA), dot_orang, UP)
        ruas_orang = Line(titik3(orang), np.array([K_AWAL, orang[1], 0.03])).set_stroke(AKSEN, 3.0)
        angka_orang = sinema.label("2", warna=AKSEN)
        angka_orang.next_to(ruas_orang.get_center(), DOWN, buff=0.16)

        # Bayangannya dicerminkan SEBAGAI BENTUK, jadi sosoknya menghadap ke
        # arah yang berlawanan. Itu bukan hiasan: menghadapnya ke arah lain
        # adalah bukti pertama yang dilihat siswa bahwa pencerminan membalik,
        # dan bukti itu muncul sebelum satu rumus pun ditulis.
        dot_bayang = poligon(
            [cermin_tegak(t, K_AWAL) for t in sosok(*orang)],
            AKSEN2, tebal=4.0, isian=0.20,
        )
        l_bayang = tempel_label(sinema.label("bayangan", warna=AKSEN2), dot_bayang, UP)
        ruas_bayang = Line(np.array([K_AWAL, orang[1], 0.03]), titik3(bayangan)).set_stroke(AKSEN, 3.0)
        angka_bayang = sinema.label("2", warna=AKSEN)
        angka_bayang.next_to(ruas_bayang.get_center(), DOWN, buff=0.16)

        # DI DUA BABAK INI BELUM ADA POLIGON, jadi yang dipakai sebagai kejadian
        # besar adalah GARIS CERMINNYA.
        #
        # Titik berjari-jari 0,09 dan ruas setebal 3,0 keduanya di bawah ambang
        # 300 piksel alat ukur, dan pada percobaan sebelumnya kedua babak ini
        # dinilai diam 10,8 detik berturut-turut. Garis cermin membentang
        # selebar bidang, jadi menyorotnya mengubah ribuan piksel sekaligus.
        # Ia juga benda yang memang sedang dibicarakan narator, bukan kilatan
        # yang dicari-cari supaya angkanya turun.
        # Jumlah run_time babak ini 5,2 detik, sedangkan narasinya 5,59.
        #
        # Versi sebelumnya 5,8 detik dan `Babak.tutup()` MENGGAGALKAN render:
        # gambarnya akan mendahului suara. Itu efek samping menambahkan sorotan
        # tanpa mengurangi yang lain, dan gerbangnya benar menolak. Babak ini
        # yang paling pendek di video, jadi ia paling cepat kepenuhan.
        with sinema.babak(self, "kaca", DURASI) as b:
            b.main(FadeIn(bidang), run_time=0.8)
            b.main(ShowCreation(garis_cermin), run_time=1.0)
            ident = sinema.identitas(self, "1 petak = 1 satuan")
            b.main(ShowCreation(dot_orang), FadeIn(l_orang), run_time=1.2)
            b.main(Indicate(garis_cermin, color=AKSEN2), run_time=1.2)
            b.main(ShowCreation(ruas_orang), FadeIn(angka_orang), run_time=1.0)
        qc.periksa_adegan(self, {"titik orang": dot_orang},
                          hud={"identitas": ident},
                          tulisan={"label orang": l_orang, "angka orang": angka_orang},
                          dunia={"bidang": bidang})

        with sinema.babak(self, "jarak", DURASI) as b:
            b.main(ShowCreation(dot_bayang), FadeIn(l_bayang), run_time=1.4)
            b.main(ShowCreation(ruas_bayang), FadeIn(angka_bayang), run_time=1.2)
            b.main(
                Indicate(angka_orang, color=SOROT), Indicate(angka_bayang, color=SOROT),
                run_time=1.2,
            )
            b.main(Indicate(garis_cermin, color=AKSEN2), run_time=1.4)
        qc.periksa_adegan(
            self,
            {"titik orang": dot_orang, "titik bayangan": dot_bayang},
            hud={"identitas": ident}, dunia={"bidang": bidang},
            tulisan={"label orang": l_orang, "label bayangan": l_bayang,
                     "angka orang": angka_orang, "angka bayangan": angka_bayang},
        )

        # --- bentuk sungguhan menggantikan kedua titik tadi ---------------- #
        with sinema.babak(self, "bentuk", DURASI) as b:
            b.main(
                FadeOut(dot_orang), FadeOut(l_orang), FadeOut(ruas_orang),
                FadeOut(angka_orang), FadeOut(dot_bayang), FadeOut(l_bayang),
                FadeOut(ruas_bayang), FadeOut(angka_bayang),
                run_time=0.8,
            )
            b.main(
                ShowCreation(prapeta),
                *[FadeIn(nama_pra[h]) for h in nama_pra],
                run_time=1.6,
            )
        qc.periksa_adegan(self, {"prapeta": prapeta}, hud={"identitas": ident},
                          dunia={"bidang": bidang})

        # --- bentuk: petanya lahir di seberang cermin -------------------- #
        peta = poligon(peta_awal, AKSEN2, tebal=3.2, isian=0.12)
        nama_peta = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(f"{huruf}'", warna=AKSEN2)
            t.next_to(titik3(peta_awal[i]), DOWN if i < 2 else UP, buff=0.22)
            nama_peta[huruf] = t

        with sinema.babak(self, "cermin", DURASI) as b:
            b.main(
                ShowCreation(peta),
                *[FadeIn(nama_peta[h]) for h in nama_peta],
                run_time=1.6,
            )
            b.main(Indicate(peta, color=AKSEN2), run_time=1.2)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta},
                          hud={"identitas": ident}, dunia={"bidang": bidang})

        # --- tegaklurus: dua angka jarak yang sama ----------------------- #
        # Diambil pada titik C, bukan A. C berada di y = 2, jauh dari tepi atas
        # maupun bawah bidang, jadi angka jaraknya punya ruang di kedua sisi
        # garis tanpa menabrak apa pun.
        C = L[2]
        C_peta = peta_awal[2]
        ruas_kiri = Line(titik3(C), np.array([K_AWAL, C[1], 0.03])).set_stroke(AKSEN, 3.0)
        ruas_kanan = Line(np.array([K_AWAL, C[1], 0.03]), titik3(C_peta)).set_stroke(AKSEN, 3.0)
        angka_kiri = sinema.label(f"{abs(C[0] - K_AWAL):.0f}", warna=AKSEN)
        angka_kiri.next_to(ruas_kiri.get_center(), UP, buff=0.16)
        angka_kanan = sinema.label(f"{abs(C_peta[0] - K_AWAL):.0f}", warna=AKSEN)
        angka_kanan.next_to(ruas_kanan.get_center(), UP, buff=0.16)

        # KEJADIANNYA HARUS SEUKURAN BENTUKNYA, BUKAN SEUKURAN RUASNYA.
        #
        # Versi pertama babak ini cuma menggambar dua ruas berangka, dan alat
        # ukur menilai SELURUH 8,5 detiknya DIAM. Ruas setebal 4,0 sepanjang
        # beberapa petak hanya sekitar 100 piksel dari 409.920, jauh di bawah
        # ambang 300. Pelajaran yang sama sudah dibayar di video 01 babak
        # "periksa"; di sini ia terulang karena polanya belum dipindahkan ke
        # babak-babak lain.
        #
        # Sorotan bentuk utuh ditaruh di antara kedua ruas, bukan di ujung
        # babak, supaya bagian tengahnya juga punya kejadian.
        with sinema.babak(self, "tegaklurus", DURASI) as b:
            b.main(ShowCreation(ruas_kiri), FadeIn(angka_kiri), run_time=1.4)
            b.main(Indicate(prapeta, color=AKSEN), run_time=1.2)
            b.main(ShowCreation(ruas_kanan), FadeIn(angka_kanan), run_time=1.4)
            b.main(Indicate(peta, color=AKSEN), run_time=1.2)
        qc.periksa_adegan(
            self,
            {"prapeta": prapeta, "peta": peta, "angka kiri": angka_kiri, "angka kanan": angka_kanan},
            [("angka kiri", "angka kanan")],
            hud={"identitas": ident}, dunia={"bidang": bidang},
        )

        # --- geser: cerminnya pindah ke x = 5, kamera ikut menyesuaikan --- #
        pusat_b, tinggi_b = letak_peta(0.0, 10.0, 0.0, 4.0)
        bidang_b = bidang_untuk(0.0, 10.0, 0.0, 4.0)
        garis_b = DashedLine(
            np.array([K_GESER, -0.2, 0.03]), np.array([K_GESER, 4.2, 0.03]),
        ).set_stroke(SOROT, 3.0)
        peta_b = poligon(peta_geser, AKSEN2, tebal=3.2, isian=0.12)
        nama_peta_b = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(f"{huruf}'", warna=AKSEN2)
            t.next_to(titik3(peta_geser[i]), DOWN if i < 2 else UP, buff=0.22)
            nama_peta_b[huruf] = t

        with sinema.babak(self, "geser", DURASI) as b:
            b.main(
                FadeOut(ruas_kiri), FadeOut(ruas_kanan),
                FadeOut(angka_kiri), FadeOut(angka_kanan),
                FadeOut(peta), *[FadeOut(nama_peta[h]) for h in nama_peta],
                run_time=0.8,
            )
            b.main(
                kamera.dunia_ke_peta(frame, pusat=pusat_b, tinggi=tinggi_b),
                FadeOut(bidang), FadeIn(bidang_b),
                Transform(garis_cermin, garis_b),
                run_time=max(1.6, DURASI["geser"] - 3.4),
            )
            b.main(
                ShowCreation(peta_b),
                *[FadeIn(nama_peta_b[h]) for h in nama_peta_b],
                run_time=1.6,
            )
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_b},
                          hud={"identitas": ident}, dunia={"bidang": bidang_b})

        # --- rumus: lahir dekat bendanya, lalu terbang ke panel ----------- #
        with sinema.babak(self, "rumus", DURASI) as b:
            rum = sinema.lahir_rumus(
                self, r"(x,\ y) \to (2k - x,\ y)",
                dekat=peta_b, papan=papan, b=b, warna=AKSEN2,
            )
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_b},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_b})

        # --- uji: angka contoh yang sama dengan halamannya ---------------- #
        with sinema.babak(self, "uji", DURASI) as b:
            # Angkanya A(1, 1), BUKAN A(1, 2) seperti contoh di halaman.
            #
            # Titik A bentuk L memang di (1, 1). Naskah versi pertama memakai
            # A(1, 2) karena disalin dari contoh berhitung halamannya, dan
            # akibatnya narator menyebut koordinat yang tidak sama dengan titik
            # yang sedang disorot di layar. Gambar yang membantah ucapannya
            # adalah cacat terburuk menurut standar proyek, jadi yang dipakai
            # titik yang benar-benar ada di gambar.
            papan.baris(r"A(1,\ 1) \to A'(9,\ 1)", warna=AKSEN2, b=b)
            b.main(Indicate(peta_b, color=AKSEN), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_b},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_b})

        # ---------------------------------------------------------------- #
        # petak: koordinatnya DIHITUNG dari petak di layar                  #
        # ---------------------------------------------------------------- #
        A = L[0]
        A_peta = peta_geser[0]
        ruas_kiri_a = Line(titik3(A), np.array([K_GESER, A[1], 0.03])).set_stroke(AKSEN, 4.0)
        ruas_kanan_a = Line(np.array([K_GESER, A[1], 0.03]), titik3(A_peta)).set_stroke(AKSEN, 4.0)
        angka_kiri_a = sinema.label("4", warna=AKSEN)
        angka_kiri_a.next_to(ruas_kiri_a.get_center(), DOWN, buff=0.18)
        angka_kanan_a = sinema.label("4", warna=AKSEN)
        angka_kanan_a.next_to(ruas_kanan_a.get_center(), DOWN, buff=0.18)

        with sinema.babak(self, "petak", DURASI) as b:
            b.main(Indicate(prapeta, color=AKSEN), run_time=1.2)
            b.main(ShowCreation(ruas_kiri_a), FadeIn(angka_kiri_a), run_time=1.4)
            b.main(ShowCreation(ruas_kanan_a), FadeIn(angka_kanan_a), run_time=1.4)
            b.main(Indicate(peta_b, color=AKSEN), run_time=1.2)
        qc.periksa_adegan(
            self,
            {"prapeta": prapeta, "peta": peta_b,
             "angka kiri": angka_kiri_a, "angka kanan": angka_kanan_a},
            [("angka kiri", "angka kanan")],
            hud={"identitas": ident, "papan": papan.semua()},
            dunia={"bidang": bidang_b},
        )

        # ---------------------------------------------------------------- #
        # kedua dan seberang: contoh KEDUA dari sisi yang berlawanan        #
        # ---------------------------------------------------------------- #
        # Titik B berada di KANAN cermin, sedangkan A di kirinya. Ini bukan
        # sekadar contoh lain dengan angka lain: satu contoh dari satu sisi
        # saja membuat siswa mengira ada aturan terpisah untuk titik di
        # seberang. Dengan dua sisi, satu rumus terbukti mengurus keduanya.
        B = L[1]
        B_peta = peta_geser[1]
        ruas_b1 = Line(np.array([K_GESER, B[1], 0.03]), titik3(B)).set_stroke(SOROT, 4.0)
        ruas_b2 = Line(titik3(B_peta), np.array([K_GESER, B[1], 0.03])).set_stroke(SOROT, 4.0)
        angka_b1 = sinema.label("1", warna=SOROT)
        angka_b1.next_to(ruas_b1.get_center(), UP, buff=0.18)
        angka_b2 = sinema.label("1", warna=SOROT)
        angka_b2.next_to(ruas_b2.get_center(), UP, buff=0.18)

        with sinema.babak(self, "kedua", DURASI) as b:
            b.main(
                FadeOut(ruas_kiri_a), FadeOut(ruas_kanan_a),
                FadeOut(angka_kiri_a), FadeOut(angka_kanan_a),
                run_time=0.7,
            )
            b.main(Indicate(nama_pra["B"], color=SOROT), run_time=1.0)
            b.main(ShowCreation(ruas_b1), FadeIn(angka_b1), run_time=1.4)
            b.main(Indicate(prapeta, color=SOROT), run_time=1.2)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_b, "angka B": angka_b1},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_b})

        with sinema.babak(self, "seberang", DURASI) as b:
            b.main(ShowCreation(ruas_b2), FadeIn(angka_b2), run_time=1.4)
            b.main(Indicate(peta_b, color=SOROT), run_time=1.2)
            papan.baris(r"B(6,\ 1) \to B'(4,\ 1)", warna=SOROT, b=b)
        qc.periksa_adegan(
            self,
            {"prapeta": prapeta, "peta": peta_b, "angka B1": angka_b1, "angka B2": angka_b2},
            [("angka B1", "angka B2")],
            hud={"identitas": ident, "papan": papan.semua()},
            dunia={"bidang": bidang_b},
        )

        with sinema.babak(self, "dua_arah", DURASI) as b:
            b.main(Indicate(garis_cermin, color=AKSEN2), run_time=1.2)
            b.main(
                FadeOut(ruas_b1), FadeOut(ruas_b2),
                FadeOut(angka_b1), FadeOut(angka_b2),
                run_time=0.8,
            )
            b.main(Indicate(prapeta, color=AKSEN2), Indicate(peta_b, color=AKSEN2), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_b},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_b})

        # ---------------------------------------------------------------- #
        # keliru dan betul: kekeliruan diperagakan lalu dibetulkan          #
        # ---------------------------------------------------------------- #
        # KEKELIRUANNYA: MEMINDAHKAN KE SEBERANG TANPA MEMBALIK.
        #
        # Pilihan pertama "x dikurangi 5" dan GAGAL DIRENDER: hasilnya jatuh di
        # x = -4 sampai 1, jauh di luar bingkai, dan qc menolaknya. Komentar
        # versi pertama malah menulis bahwa hasilnya "jatuh di kotak yang
        # sama"; klaim itu tidak pernah diperiksa dan ternyata salah.
        #
        # Yang dipakai sekarang menggeser prapeta sejauh +3, dan itu jatuh
        # PERSIS di kotak yang sama dengan peta yang benar (keduanya x = 4
        # sampai 9). Bedanya cuma satu hal, dan justru hal yang sedang
        # diajarkan: yang benar TERBALIK, yang keliru tidak. Titik A yang
        # benar mendarat di x = 9, sedangkan yang keliru di x = 4.
        #
        # Kekeliruan ini juga lebih hidup daripada salah hitung: "pindahkan
        # saja ke seberang" memang cara berpikir yang paling sering dipakai
        # siswa sebelum ia menyadari pencerminan membalik.
        salah = poligon([(t[0] + 3.0, t[1]) for t in L], AKSEN, tebal=4.5, isian=0.14)

        with sinema.babak(self, "keliru", DURASI) as b:
            b.main(
                FadeOut(peta_b), *[FadeOut(nama_peta_b[h]) for h in nama_peta_b],
                run_time=0.7,
            )
            b.main(ShowCreation(salah), run_time=1.8)
            b.main(Indicate(salah, color=AKSEN), run_time=1.2)
        qc.periksa_adegan(self, {"prapeta": prapeta, "salah": salah},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_b})

        with sinema.babak(self, "betul", DURASI) as b:
            b.main(FadeOut(salah), run_time=0.8)
            b.main(ShowCreation(peta_b), run_time=1.6)
            b.main(Indicate(peta_b, color=AKSEN2), run_time=1.2)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_b},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_b})

        # ---------------------------------------------------------------- #
        # mendatar, rangkum, tanya: penutup                                 #
        # ---------------------------------------------------------------- #
        # CERMIN MENDATARNYA SUNGGUH DIGAMBAR, dan ini perbaikan kedua.
        #
        # Perbaikan pertama cuma memindahkan rumusnya ke baris bernama supaya
        # panel tidak lagi berbohong. Itu menyelesaikan separuh masalah: panel
        # jadi jujur, tetapi GAMBARNYA tetap cermin TEGAK di garis x = 5
        # sementara narator berbicara tentang cermin MENDATAR. Layar dan suara
        # saling membantah selama tujuh detik penuh, dan `alat/peta_diam.py`
        # menunjukkannya sebagai rentang diam terpanjang di enam video topik
        # ini: 7,2 detik pada detik 106.
        #
        # Aturan proyek menyebut kelas cacat ini paling merusak: gambar yang
        # lupa diganti saat babak berpindah lebih buruk daripada layar kosong,
        # sebab layar kosong cuma tidak menolong, sedangkan gambar yang salah
        # ikut mengajar.
        #
        # BENTUKNYA SETENGAH UKURAN, dan itu keharusan aritmetika. Kotak ini
        # setinggi 4 satuan, sedangkan bentuk L aslinya setinggi 2. Bentuk
        # setinggi 2 tidak mungkin muat seluruhnya di SATU sisi cermin mendatar
        # yang juga harus punya ruang untuk bayangannya di sisi lain. Setengah
        # ukuran memberi 1 satuan untuk benda, 1 untuk bayangan, dan sisanya
        # untuk napas.
        H_DATAR = 2.0
        KECIL = [(3.0, 0.5), (5.5, 0.5), (5.5, 1.0),
                 (3.5, 1.0), (3.5, 1.5), (3.0, 1.5)]

        def cermin_datar(p, h):
            return (p[0], 2 * h - p[1])

        garis_datar = DashedLine(
            np.array([0.6, H_DATAR, 0.03]), np.array([9.4, H_DATAR, 0.03]),
        ).set_stroke(SOROT, 3.0)
        l_h = sinema.label("h = 2", warna=SOROT)
        l_h.next_to(np.array([1.2, H_DATAR, 0.03]), UP, buff=0.20)
        kecil_pra = poligon(KECIL, TINTA, tebal=3.0, isian=0.08)
        kecil_peta = poligon([cermin_datar(p, H_DATAR) for p in KECIL],
                             AKSEN2, tebal=3.0, isian=0.12)

        with sinema.babak(self, "mendatar", DURASI) as b:
            b.main(
                FadeOut(prapeta), *[FadeOut(nama_pra[h]) for h in nama_pra],
                FadeOut(peta_b), *[FadeOut(nama_peta_b[h]) for h in nama_peta_b],
                FadeOut(garis_cermin),
                run_time=0.9,
            )
            b.main(ShowCreation(garis_datar), FadeIn(l_h), run_time=1.0)
            b.main(ShowCreation(kecil_pra), run_time=1.2)
            papan.baris(r"\text{mendatar: } (x,\ y) \to (x,\ 2h - y)", warna=SOROT, b=b)
            b.main(ShowCreation(kecil_peta), run_time=1.4)
        qc.periksa_adegan(self, {"benda": kecil_pra, "bayangan": kecil_peta},
                          hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"label h": l_h},
                          dunia={"bidang": bidang_b, "cermin datar": garis_datar})

        # Rangkumannya diperagakan pada cermin MENDATAR yang baru saja tampil,
        # bukan pada cermin tegak yang sudah dibuang. Kalimatnya sendiri umum
        # ("titik dan bayangannya sama jauh dari cermin"), jadi memperagakannya
        # pada cermin yang berbeda arah justru memperkuat: aturannya tidak
        # terikat pada cermin tegak.
        SUDUT_P = KECIL[0]
        kaki = np.array([SUDUT_P[0], H_DATAR, 0.03])
        ruas_bawah = Line(titik3(SUDUT_P), kaki).set_stroke(AKSEN, 4.0)
        ruas_atas = Line(kaki, titik3(cermin_datar(SUDUT_P, H_DATAR))).set_stroke(AKSEN, 4.0)
        # Angkanya ke KIRI ruas, sebab di sebelah kanannya berdiri bendanya
        # sendiri: pada y = 1,25 bentuk kecil itu menempati x 3 sampai 3,5.
        angka_bawah = sinema.label("1,5", warna=AKSEN)
        angka_bawah.next_to(ruas_bawah.get_center(), LEFT, buff=0.20)
        angka_atas = sinema.label("1,5", warna=AKSEN)
        angka_atas.next_to(ruas_atas.get_center(), LEFT, buff=0.20)

        with sinema.babak(self, "rangkum", DURASI) as b:
            b.main(ShowCreation(ruas_bawah), FadeIn(angka_bawah), run_time=1.3)
            b.main(ShowCreation(ruas_atas), FadeIn(angka_atas), run_time=1.3)
            b.main(Indicate(kecil_pra, color=SOROT), run_time=1.3)
            b.main(Indicate(kecil_peta, color=AKSEN), run_time=1.3)
        qc.periksa_adegan(
            self, {"benda": kecil_pra, "bayangan": kecil_peta},
            hud={"identitas": ident, "papan": papan.semua()},
            tulisan={"label h": l_h, "angka bawah": angka_bawah, "angka atas": angka_atas},
            dunia={"bidang": bidang_b, "cermin datar": garis_datar},
        )

        # Pertanyaan penutup ditandai DI GAMBAR: sebuah titik diletakkan tepat
        # di garis cerminnya, supaya penonton punya benda untuk dipikirkan
        # selama pertanyaannya dibacakan. Ditaruh di x = 7, di sebelah kanan
        # bendanya, supaya tidak tertimpa apa pun.
        titik_di_cermin = Dot(np.array([7.0, H_DATAR, 0.05]), radius=0.14).set_color(AKSEN)
        l_di_cermin = sinema.label("di cermin", warna=AKSEN)
        l_di_cermin.next_to(titik_di_cermin, UP, buff=0.26)

        with sinema.babak(self, "tanya", DURASI) as b:
            b.main(
                FadeOut(ruas_bawah), FadeOut(ruas_atas),
                FadeOut(angka_bawah), FadeOut(angka_atas),
                run_time=0.7,
            )
            b.main(FadeIn(titik_di_cermin, scale=0.4), FadeIn(l_di_cermin), run_time=1.2)
            b.main(Indicate(kecil_pra, color=AKSEN), run_time=1.3)
            b.main(Indicate(kecil_peta, color=SOROT), run_time=1.3)
        qc.periksa_adegan(
            self,
            {"benda": kecil_pra, "bayangan": kecil_peta, "titik di cermin": titik_di_cermin},
            hud={"identitas": ident, "papan": papan.semua()},
            tulisan={"label h": l_h, "label di cermin": l_di_cermin},
            dunia={"bidang": bidang_b, "cermin datar": garis_datar},
        )

