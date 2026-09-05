"""Video 05 Transformasi Geometri, Materi 09 "Matriks secukupnya".

SATU-SATUNYA VIDEO TOPIK INI YANG BENDANYA BUKAN HURUF L
Yang diajarkan di sini bukan akibat sebuah transformasi pada sebuah benda,
melainkan CARA MEMBACA empat angka di dalam matriks. Aturannya: kolom pertama
adalah tempat mendaratnya titik (1, 0), kolom kedua tempat mendaratnya (0, 1).
Kedua titik itu adalah dua sisi persegi satuan, jadi persegi satuanlah gambar
yang membuat aturan itu terlihat langsung. Huruf L hanya akan menyembunyikannya
di balik empat sudut lain yang tidak ada hubungannya.

TANPA 3D. Panjang dan sudut harus akurat.

DUA TEMPAT RUMUS, DAN PEMBAGIANNYA TETAP
Panel kanan atas menyimpan yang harus BERTAHAN: matriksnya sendiri, plus paling
banyak dua catatan pendek. Dunia bagian bawah (slot A dan slot B di bawah)
dipakai untuk yang sedang DIKERJAKAN: rumus kerja, hitungan, contoh. Isi slot
dunia diganti tiap contoh berganti, tidak ditumpuk.

Pembagian ini lahir dari kegagalan: versi pertama menumpuk enam baris di panel
dan qc menolak "papan baris 1 menindih papan baris 4". Zona rumus cuma setinggi
2,60 satuan layar, dan rumus utama video ini matriks DUA BARIS yang memakan
hampir sepertiganya.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
from transformasi_umum import (  # noqa: E402
    bidang_untuk, kosongkan_papan, letak_peta, poligon, rumus_dunia,
    tempel_label, titik3,
)

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "transformasi5-matriks"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

# KOTAK KAMERA DAN KOTAK PETAK SENGAJA BERBEDA, dan itu perbaikan atas render
# 5 September 2026.
#
# Versi pertama memakai satu kotak (-2..2 pada kedua sumbu) untuk keduanya,
# lalu menaruh rumus kerjanya di dalam petak, di sekitar y = -0,85. Hasilnya:
# tiap rumus menindih ANGKA SUMBU. `qc.periksa_adegan` meloloskannya, dan
# memang seharusnya begitu: benda dunia lawan benda dunia dibolehkan
# bersentuhan, sebab label yang menempel pada bendanya adalah hal normal.
# Yang salah bukan gerbangnya, melainkan tata letaknya.
#
# Sekarang PETAK berhenti di y = -1, tepat cukup untuk menampung bentuk salah
# di babak "keliru", dan KOTAK KAMERA menjangkau y = -3. Selisih dua satuan
# itulah ruang kosong tempat rumus berdiri, tanpa satu angka sumbu pun di
# bawahnya. Harganya: skala turun dari 1,04 ke 0,83, jadi perseginya 20 persen
# lebih kecil. Itu harga yang pantas untuk rumus yang tidak bertindih.
KOTAK = (-2.0, 2.0, -3.0, 2.0)     # yang dilihat kamera
PETAK = (-2.0, 2.0, -1.0, 2.0)     # yang bergaris dan berangka

# Slot rumus di dunia, SEMUANYA di bawah petak. Isinya diganti, tidak ditumpuk.
#
# Slot matriks terpisah sebab matriks dua baris hampir dua kali lebih tinggi
# daripada rumus satu baris: dipasang di SLOT_A ia menjulur ke atas sampai
# menyentuh angka sumbu, dipasang di SLOT_MAT ia aman.
SLOT_MAT = np.array([0.0, -2.00, 0.05])
SLOT_A = np.array([0.0, -1.85, 0.05])
SLOT_B = np.array([0.0, -2.55, 0.05])

PERSEGI = [(0.0, 0.0), (1.0, 0.0), (1.0, 1.0), (0.0, 1.0)]

# Matriks rotasi 90 derajat: baris pertama 0 dan -1, baris kedua 1 dan 0.
# Dipilih karena siswa BARU SAJA melihatnya sebagai gerakan di video 03, jadi
# babak "cocok" bisa menagihnya: matriks ini bukan hal baru.
M = {"a": 0.0, "b": -1.0, "c": 1.0, "d": 0.0}


def kenakan(m, p):
    return (m["a"] * p[0] + m["b"] * p[1], m["c"] * p[0] + m["d"] * p[1])


class TransformasiMatriks(AdeganMatra):
    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)

        peta = [kenakan(M, p) for p in PERSEGI]
        kolom1 = kenakan(M, (1.0, 0.0))
        kolom2 = kenakan(M, (0.0, 1.0))

        pusat, tinggi = letak_peta(*KOTAK)
        bidang = bidang_untuk(*PETAK)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat, tinggi=tinggi)

        def di_slot(isi, ukuran, warna, slot, maks=6.8):
            """Rumus dunia berukuran tetap di layar. Lihat `rumus_dunia`."""
            return rumus_dunia(isi, ukuran, warna, tinggi, slot, maks_layar=maks)

        asal = np.array([0.0, 0.0, 0.03])

        def hud_kini():
            """Isi HUD yang BENAR-BENAR ADA saat ini, untuk diserahkan ke qc.

            `papan.semua()` mengembalikan None selama panelnya masih kosong,
            dan qc menabrak None itu. Di video ini panelnya memang kosong
            sampai babak "baca", sebab semua keterangan sebelum itu digambar
            di dunia, bukan ditumpuk di panel.

            Ditulis sebagai fungsi, bukan diperiksa di tiap pemanggilan qc,
            supaya urutan babak boleh berubah tanpa menimbulkan galat ini lagi.
            """
            isi = {"identitas": ident}
            papan_isi = papan.semua()
            if papan_isi is not None:
                isi["papan"] = papan_isi
            return isi

        # --- buka -------------------------------------------------------- #
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(3.0, DURASI["buka"] - 0.6)
            sinema.judul_pembuka(self, "Materi 09: Matriks secukupnya", lama=lama)
            b.catat(lama)

        # --- tumpuk: empat aturan berbentuk sama -------------------------- #
        # Kedua aturan pembuka tampil BESAR DI TENGAH DUNIA lalu memudar, bukan
        # menumpuk di panel. Keduanya keadaan "sebelum", bukan temuan yang
        # perlu bertahan sampai video habis; panel disimpan untuk yang memang
        # harus bertahan.
        #
        # BIDANG PETAKNYA BELUM ADA DI DUA BABAK INI, dan itu disengaja.
        # Narasinya membicarakan ATURAN, bukan letak: "empat aturan berbentuk
        # sama persis, yang berbeda cuma empat angka pengalinya". Bidang
        # bernomor di belakang kalimat itu tidak menerangkan apa-apa, dan kedua
        # rumusnya justru harus menghindarinya supaya tidak menindih angka
        # sumbu. Petaknya masuk di babak "persegi", saat memang ada benda yang
        # letaknya perlu dibaca.
        aturan1 = di_slot(r"\text{cermin } X:\ (1)x + (0)y,\ \ (0)x + (-1)y",
                          32, REDUP, np.array([0.0, 0.55, 0.05]), maks=9.0)
        aturan2 = di_slot(r"\text{rotasi } 90^\circ:\ (0)x + (-1)y,\ \ (1)x + (0)y",
                          32, REDUP, np.array([0.0, -0.45, 0.05]), maks=9.0)

        with sinema.babak(self, "tumpuk", DURASI) as b:
            ident = sinema.identitas(self, "1 petak = 1 satuan")
            b.main(FadeIn(aturan1, shift=0.3 * UP), run_time=1.4)
            b.main(FadeIn(aturan2, shift=0.3 * UP), run_time=1.4)
            b.main(Indicate(aturan1, color=SOROT), run_time=1.2)
        qc.periksa_adegan(self, {"aturan1": aturan1, "aturan2": aturan2},
                          hud={"identitas": ident})

        # --- susun: matriksnya dibuka KOSONG ------------------------------ #
        # Matriks bertanda tanya, bukan matriks jadi. Siswa melihat WADAHNYA
        # dulu, lalu dua babak berikutnya mengisinya dari gambar. Matriks yang
        # muncul sudah terisi menyembunyikan justru pelajarannya: keempat angka
        # itu DIBACA dari suatu tempat, bukan diberikan.
        mat = di_slot(r"\begin{pmatrix} ? & ? \\ ? & ? \end{pmatrix}", 40, REDUP,
                      SLOT_MAT, maks=2.6)

        with sinema.babak(self, "susun", DURASI) as b:
            b.main(Indicate(aturan1, color=AKSEN2), run_time=1.2)
            b.main(Indicate(aturan2, color=AKSEN2), run_time=1.2)
            b.main(FadeOut(aturan1), FadeOut(aturan2),
                   FadeIn(mat, shift=0.3 * UP), run_time=1.4)
            b.main(Indicate(mat, color=SOROT), run_time=1.2)
        qc.periksa_adegan(self, {"matriks": mat}, hud={"identitas": ident})

        # --- persegi: bendanya muncul ------------------------------------ #
        persegi = poligon(PERSEGI, TINTA, tebal=3.2, isian=0.08)
        l_persegi = tempel_label(sinema.label("persegi satuan", warna=TINTA),
                                 persegi, UP, buff=0.24)

        with sinema.babak(self, "persegi", DURASI) as b:
            b.main(FadeIn(bidang), run_time=0.9)
            b.main(ShowCreation(persegi), FadeIn(l_persegi), run_time=1.6)
            b.main(Indicate(persegi, color=AKSEN2), run_time=1.2)
        qc.periksa_adegan(self, {"persegi": persegi, "matriks": mat},
                          hud=hud_kini(), tulisan={"label persegi": l_persegi},
                          dunia={"bidang": bidang})

        # --- kolom1: panah biru, peta dari (1, 0) ------------------------- #
        # LETAK KEDUA LABEL KOLOM DIPILIH TANGAN, dan ruangnya sempit.
        #
        # Titik (0, 1) adalah sudut KIRI ATAS persegi satuan, jadi label di
        # sebelah kanannya jatuh tepat di atas sisi atas persegi itu. Satu-
        # satunya sisi yang benar-benar kosong di situ adalah atasnya, dan
        # tempat itu sedang dipakai label "persegi satuan". Karena itu label
        # persegi DIBUANG di babak ini: tugasnya sudah selesai, bendanya sudah
        # dikenal, dan menahannya cuma merebut satu-satunya ruang kosong.
        panah1 = Arrow(asal, titik3((1.0, 0.0)), buff=0, thickness=4).set_color(AKSEN2)
        l_kolom1 = sinema.label("(0, 1)", warna=AKSEN2)
        l_kolom1.next_to(titik3(kolom1), UP, buff=0.34)
        mat_1 = di_slot(r"\begin{pmatrix} 0 & ? \\ 1 & ? \end{pmatrix}", 40, AKSEN2,
                        SLOT_MAT, maks=2.6)

        with sinema.babak(self, "kolom1", DURASI) as b:
            b.main(GrowArrow(panah1), FadeOut(l_persegi), run_time=1.0)
            b.main(
                Rotate(panah1, PI / 2, about_point=asal),
                FadeIn(l_kolom1),
                run_time=1.6,
            )
            b.main(Transform(mat, mat_1), run_time=1.2)
            b.main(Indicate(persegi, color=AKSEN2), run_time=1.2)
        qc.periksa_adegan(self, {"persegi": persegi, "matriks": mat},
                          hud=hud_kini(), tulisan={"label kolom1": l_kolom1},
                          dunia={"bidang": bidang})

        # --- kolom2: panah merah, peta dari (0, 1) ------------------------ #
        panah2 = Arrow(asal, titik3((0.0, 1.0)), buff=0, thickness=4).set_color(AKSEN)
        # LETAKNYA DITENTUKAN LANGSUNG, tidak lewat `next_to`, dan itu satu-
        # satunya label di video ini yang begitu.
        #
        # Titik (-1, 0) tepat DI ATAS sumbu X, dan di sepanjang sumbu itu
        # berbaris angka-angkanya. Ke kiri, labelnya tergores garis sumbu dan
        # angka -1 jatuh di tengah tulisannya; terlihat di lembar kontak 5 Sep.
        # Ke bawah lebih parah: di situ justru barisan angka sumbu X. Ke atas
        # ia masuk badan persegi peta yang menempati x -1 sampai 0.
        #
        # Yang tersisa cuma satu kantong kosong: kiri atas, di luar persegi
        # peta tetapi masih di dalam petak.
        l_kolom2 = sinema.label("(-1, 0)", warna=AKSEN)
        l_kolom2.move_to(np.array([-1.45, 0.45, 0.03]))
        mat_2 = di_slot(r"\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}", 40, SOROT,
                        SLOT_MAT, maks=2.6)

        with sinema.babak(self, "kolom2", DURASI) as b:
            b.main(GrowArrow(panah2), run_time=1.0)
            b.main(
                Rotate(panah2, PI / 2, about_point=asal),
                FadeIn(l_kolom2),
                run_time=1.6,
            )
            b.main(Transform(mat, mat_2), run_time=1.2)
        qc.periksa_adegan(
            self, {"persegi": persegi, "matriks": mat},
            hud=hud_kini(),
            tulisan={"label kolom1": l_kolom1, "label kolom2": l_kolom2},
            dunia={"bidang": bidang},
        )

        # --- baca: matriksnya naik ke panel ------------------------------- #
        # Di sinilah matriksnya berpindah dari "sedang dikerjakan" jadi "sudah
        # jadi": ia lahir sekali lagi di dekat bentuknya lalu terbang ke panel,
        # dan tinggal di sana sampai video habis. Slot dunia jadi kosong lagi
        # untuk hitungan berikutnya.
        peta_persegi = poligon(peta, SOROT, tebal=3.0, isian=0.12)

        with sinema.babak(self, "baca", DURASI) as b:
            b.main(ShowCreation(peta_persegi), run_time=1.4)
            b.main(FadeOut(mat), run_time=0.5)
            rum = sinema.lahir_rumus(
                self, r"\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}",
                dekat=peta_persegi, papan=papan, b=b, warna=SOROT,
            )
        qc.periksa_adegan(self, {"persegi": persegi, "peta": peta_persegi},
                          hud=hud_kini(), dunia={"bidang": bidang})

        # --- satuan: matriks yang tidak mengubah apa pun ------------------ #
        # Panah kedua kolom dikembalikan ke tempat SEMULA di sini, sebab itulah
        # isi matriks satuan: kolom pertamanya (1, 0), kolom keduanya (0, 1),
        # persis kedua titik semula. Persegi petanya dibuang sebentar; kalau
        # tetap tampil, layar memperlihatkan bentuk yang berpindah sementara
        # narator berkata tidak ada yang berubah.
        mat_satuan = di_slot(r"\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}", 40, REDUP,
                             SLOT_MAT, maks=2.6)

        with sinema.babak(self, "satuan", DURASI) as b:
            b.main(
                FadeOut(peta_persegi), FadeOut(l_kolom1), FadeOut(l_kolom2),
                Rotate(panah1, -PI / 2, about_point=asal),
                Rotate(panah2, -PI / 2, about_point=asal),
                run_time=1.4,
            )
            b.main(FadeIn(mat_satuan, shift=0.3 * UP), run_time=1.2)
            b.main(Indicate(persegi, color=SOROT), run_time=1.2)
            b.main(Indicate(mat_satuan, color=AKSEN2), run_time=1.2)
        qc.periksa_adegan(self, {"persegi": persegi, "matriks satuan": mat_satuan},
                          hud=hud_kini(), dunia={"bidang": bidang})

        # --- kali: yang bertemu koordinat adalah BARIS -------------------- #
        kerja = di_slot(r"\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}"
                        r"\begin{pmatrix} x \\ y \end{pmatrix}", 34, TINTA,
                        SLOT_MAT, maks=4.0)

        # DIBUANG DULU, BARU YANG BARU MUNCUL, bukan bersamaan.
        #
        # Versi pertama menyilangkan keduanya dalam satu panggilan 1,2 detik.
        # Kedua rumus berdiri di slot yang sama dengan lebar yang berbeda, jadi
        # selama satu detik penuh layar memperlihatkan dua matriks setengah
        # tembus pandang yang saling menembus. Terlihat di lembar kontak 5 Sep.
        # Silang-pudar hanya aman kalau keduanya sebentuk.
        with sinema.babak(self, "kali", DURASI) as b:
            b.main(FadeOut(mat_satuan), run_time=0.5)
            b.main(FadeIn(kerja, shift=0.3 * UP), run_time=1.0)
            b.main(Indicate(kerja, color=AKSEN2), run_time=1.2)
            b.main(Indicate(persegi, color=AKSEN), run_time=1.2)
        qc.periksa_adegan(self, {"persegi": persegi, "kerja": kerja},
                          hud=hud_kini(), dunia={"bidang": bidang})

        # --- uji: kedua baris dikerjakan satu per satu -------------------- #
        # DITULIS SEBAGAI DUA BARIS TERPISAH, bukan satu matriks hasil.
        # Kalimatnya memang dua langkah ("baris pertama ... baris kedua ..."),
        # dan dua benda terpisah bisa disorot bergantian mengikuti kalimatnya.
        # Satu matriks hasil cuma bisa disorot utuh, dan sorotan utuh tidak
        # menunjukkan baris mana yang sedang dibicarakan.
        baris_x = di_slot(r"x' = (0)x + (-1)y", 30, AKSEN2, SLOT_A, maks=5.6)
        baris_y = di_slot(r"y' = (1)x + (0)y", 30, AKSEN, SLOT_B, maks=5.6)

        with sinema.babak(self, "uji", DURASI) as b:
            b.main(FadeOut(kerja), FadeIn(baris_x, shift=0.25 * UP), run_time=1.2)
            b.main(Indicate(baris_x, color=SOROT), run_time=1.2)
            b.main(FadeIn(baris_y, shift=0.25 * UP), run_time=1.2)
            b.main(Indicate(baris_y, color=SOROT), run_time=1.2)
            b.main(ShowCreation(peta_persegi), run_time=1.4)
            b.main(Indicate(persegi, color=AKSEN2), run_time=1.2)
            b.main(Indicate(peta_persegi, color=AKSEN), run_time=1.2)
        qc.periksa_adegan(
            self, {"persegi": persegi, "peta": peta_persegi,
                   "baris x": baris_x, "baris y": baris_y},
            hud=hud_kini(), dunia={"bidang": bidang},
        )

        # --- kenal: matriksnya dikenakan pada (3, 2) ---------------------- #
        # Titik (3, 2) berada DI LUAR kotak kamera, dan itu disengaja. Yang
        # sedang diajarkan cara menghitungnya, bukan letaknya; memperbesar
        # kotak sampai muat (3, 2) akan mengecilkan persegi satuan yang justru
        # jadi bendanya. Hitungannya ditulis, tidak digambar.
        hitung = di_slot(r"(3,\ 2) \to (-2,\ 3)", 32, SOROT, SLOT_A, maks=5.6)

        with sinema.babak(self, "kenal", DURASI) as b:
            b.main(FadeOut(baris_x), FadeOut(baris_y), run_time=0.6)
            b.main(FadeIn(hitung, shift=0.25 * UP), run_time=1.2)
            b.main(Indicate(hitung, color=AKSEN2), run_time=1.2)
            b.main(Indicate(peta_persegi, color=AKSEN), run_time=1.2)
            b.main(Indicate(persegi, color=SOROT), run_time=1.2)
        qc.periksa_adegan(self, {"persegi": persegi, "peta": peta_persegi, "hitung": hitung},
                          hud=hud_kini(), dunia={"bidang": bidang})

        # --- cocok: ternyata rotasi 90 derajat dari Materi 06 ------------- #
        sama = di_slot(r"= \text{rotasi } 90^\circ", 30, AKSEN2, SLOT_B, maks=5.6)

        with sinema.babak(self, "cocok", DURASI) as b:
            b.main(FadeIn(sama, shift=0.25 * UP), run_time=1.2)
            b.main(Indicate(peta_persegi, color=AKSEN2), run_time=1.2)
            b.main(Indicate(sama, color=SOROT), run_time=1.2)
            b.main(Indicate(persegi, color=AKSEN), run_time=1.2)
        qc.periksa_adegan(
            self, {"persegi": persegi, "peta": peta_persegi,
                   "hitung": hitung, "sama": sama},
            hud=hud_kini(), dunia={"bidang": bidang},
        )

        # --- keliru: matriksnya dibaca MENDATAR --------------------------- #
        # Bentuk salahnya BUKAN karangan: membaca baris sebagai bayangan sama
        # dengan mengenakan matriks yang dibalik baris-kolomnya, dan untuk
        # matriks ini hasilnya rotasi 90 derajat ke arah SEBALIKNYA. Perseginya
        # mendarat di bawah sumbu X, bukan di kiri, dan bedanya kelihatan.
        #
        # Catatannya ditaruh di PANEL, bukan di slot dunia: bentuk salah itu
        # menempati (0, -1) sampai (1, 0), persis tempat slot A berdiri.
        salah = [(kenakan({"a": 0.0, "b": 1.0, "c": -1.0, "d": 0.0}, p)) for p in PERSEGI]
        peta_salah = poligon(salah, AKSEN, tebal=3.0, isian=0.14)

        with sinema.babak(self, "keliru", DURASI) as b:
            b.main(FadeOut(hitung), FadeOut(sama), run_time=0.6)
            papan.baris(r"\text{dibaca mendatar}", warna=AKSEN, b=b)
            b.main(ShowCreation(peta_salah), run_time=1.6)
            b.main(Indicate(peta_salah, color=SOROT), run_time=1.2)
            b.main(Indicate(persegi, color=AKSEN2), run_time=1.2)
        qc.periksa_adegan(
            self, {"persegi": persegi, "peta": peta_persegi, "peta salah": peta_salah},
            hud=hud_kini(), dunia={"bidang": bidang},
        )

        # --- betul: dibaca MENURUN --------------------------------------- #
        with sinema.babak(self, "betul", DURASI) as b:
            papan.baris(r"\text{dibaca menurun}", warna=AKSEN2, b=b)
            b.main(Indicate(peta_persegi, color=AKSEN2), run_time=1.2)
            b.main(Indicate(peta_salah, color=SOROT), run_time=1.2)
            b.main(FadeOut(peta_salah), run_time=1.0)
            b.main(Indicate(peta_persegi, color=AKSEN), run_time=1.2)
            b.main(Indicate(persegi, color=SOROT), run_time=1.2)
        qc.periksa_adegan(self, {"persegi": persegi, "peta": peta_persegi},
                          hud=hud_kini(), dunia={"bidang": bidang})

        # --- geser: translasi tidak punya matriks dua kali dua ------------ #
        # Buktinya digerakkan, bukan didalilkan: perseginya digeser, dan TITIK
        # ASALNYA ikut pindah. Perkalian matriks tidak bisa melakukan itu,
        # sebab matriks apa pun dikalikan (0, 0) selalu memberi (0, 0).
        tanda_asal = Dot(asal, radius=0.10).set_color(SOROT)
        persegi_geser = poligon([(x + 1.0, y) for x, y in PERSEGI],
                                REDUP, tebal=3.0, isian=0.10)
        asal_geser = Dot(titik3((1.0, 0.0)), radius=0.10).set_color(SOROT)
        catatan = di_slot(r"M\begin{pmatrix} 0 \\ 0 \end{pmatrix}"
                          r" = \begin{pmatrix} 0 \\ 0 \end{pmatrix}"
                          r"\ \text{selalu}", 30, SOROT, SLOT_MAT, maks=5.4)

        with sinema.babak(self, "geser", DURASI) as b:
            kosongkan_papan(self, papan, b=b, run_time=0.6)
            b.main(FadeOut(peta_persegi), FadeIn(tanda_asal), run_time=0.8)
            b.main(ShowCreation(persegi_geser), FadeIn(asal_geser), run_time=1.6)
            b.main(Indicate(asal_geser, color=AKSEN), Indicate(persegi_geser, color=AKSEN),
                   run_time=1.4)
            b.main(FadeIn(catatan, shift=0.25 * UP), run_time=1.2)
            b.main(Indicate(catatan, color=AKSEN2), run_time=1.2)
            b.main(Indicate(persegi, color=SOROT), run_time=1.2)
        qc.periksa_adegan(
            self, {"persegi": persegi, "persegi geser": persegi_geser,
                   "catatan": catatan, "titik asal": tanda_asal},
            hud=hud_kini(), dunia={"bidang": bidang},
        )

        # --- rangkum: dua kolom, lalu satu pertanyaan --------------------- #
        # Pertanyaan penutupnya digambar, bukan cuma diucapkan: persegi bersisi
        # dua muncul putus-putus, dan siswa diminta menyebut matriksnya. Sisi
        # dua muat di kotak ini justru karena kotaknya dibulatkan sampai x = 2.
        persegi_dua = poligon([(0.0, 0.0), (2.0, 0.0), (2.0, 2.0), (0.0, 2.0)],
                              AKSEN2, tebal=3.0, isian=0.06)

        with sinema.babak(self, "rangkum", DURASI) as b:
            b.main(
                FadeOut(persegi_geser), FadeOut(asal_geser), FadeOut(catatan),
                FadeOut(tanda_asal), ShowCreation(peta_persegi),
                run_time=1.4,
            )
            b.main(Indicate(panah1, color=SOROT), Indicate(panah2, color=SOROT),
                   run_time=1.2)
            b.main(Indicate(peta_persegi, color=AKSEN), run_time=1.2)
            b.main(ShowCreation(persegi_dua), run_time=1.6)
            papan.baris(r"\text{matriksnya apa?}", warna=AKSEN2, b=b)
            b.main(Indicate(persegi_dua, color=SOROT), run_time=1.2)
            b.main(Indicate(persegi, color=AKSEN), run_time=1.2)
        qc.periksa_adegan(
            self, {"persegi": persegi, "peta": peta_persegi, "persegi dua": persegi_dua},
            hud=hud_kini(), dunia={"bidang": bidang},
        )
