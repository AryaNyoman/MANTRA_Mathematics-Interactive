"""Video 03 topik TURUNAN, untuk Materi 07 "Fungsi di dalam fungsi, aturan rantai".

TUGAS VIDEO INI
Halaman Materi 07 mengajukan satu pertanyaan yang tidak bisa dijawab tulisan:
kenapa turunan bagian luar DIKALIKAN dengan turunan bagian dalam, bukan
dijumlahkan. Video ini menjawabnya dengan cara yang hanya bisa dilakukan gambar
bergerak: batang perubahan yang benar-benar diisi oleh batang yang lebih kecil.
Tiga batang x mengisi batang u, lima batang u mengisi batang y, lalu tiap batang
u dibelah tiga sehingga batang y terisi lima belas batang x. Perkaliannya
TERBUKTI di layar, tidak diklaim.

KENAPA BATANG, BUKAN GARIS BILANGAN
Rancangan pertama memakai tiga garis bilangan bertumpuk dengan satu skala yang
sama. Dibatalkan setelah diukur: dengan satu skala, garis y harus memuat sampai
15 satuan, dan pada skala itu satu langkah di garis x cuma selebar 0,53 satuan
layar, terlalu pendek untuk dibaca apalagi dibandingkan. Batang tidak punya
masalah itu, sebab yang dibandingkan memang PANJANGNYA, dan panjang boleh
berbeda jauh selama skalanya satu.

KENAPA MESINNYA LURUS
u = 3x dan y = 5u sengaja dipilih lurus supaya pengalinya tetap dan bisa
dihitung dengan mata. Babak "berubah" yang bertugas mengatakan bahwa pada
kebanyakan fungsi pengali itu ikut berubah, sehingga siswa tidak pulang dengan
kesimpulan bahwa pengalinya selalu angka tetap.

TANPA 3D (butir 2): video pertama topik menurut urutan belajar adalah Materi 01.

TANPA BIDANG KOORDINAT
Tidak ada `bidang_bernomor` di sini, jadi tidak ada angka sumbu yang bisa
tertindih. Yang dijaga hanya batang lawan panel dan tulisan lawan tulisan.

SATU WARNA SATU MAKNA (butir 10)
  TINTA         x dan segala yang masuk
  AKSEN2 biru   u, hasil mesin pertama
  AKSEN merah   y, hasil mesin kedua
  SOROT ungu    angka pengali dan aturan yang disimpulkan
  REDUP         jabaran yang ditinggalkan, garis bantu

ANGKANYA SAMA DENGAN HALAMAN
(x^2 + 1)^2 dijabarkan, diturunkan, difaktorkan, lalu ditulis ulang jadi
2(x^2 + 1) * 2x adalah kotak contoh pertama Materi 07. (2x - 5)^8 -> 16(2x - 5)^7
kotak contohnya yang ketiga. Klaimnya diperiksa
`alat/klaim-video-turunan.json` dengan awalan V07.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "turunan7-aturan-rantai"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

# TATA LETAK BATANG
# Ketiganya berangkat dari tepi kiri yang SAMA, sebab yang dibandingkan panjang.
# Skala dipilih dari batang terpanjang: 15 satuan pada 0,53 satuan layar per
# satuan menjadi 7,95, yaitu selebar ruang kerja yang tersisa di kiri panel.
KIRI = -4.0
SKALA = 0.53
TINGGI_BATANG = 0.30
Y_X, Y_U, Y_Y = 1.15, -0.05, -1.25
DALAM, LUAR = 3, 5          # u = 3x, y = 5u


def batang(panjang, y, warna, isian=0.80):
    """Batang perubahan sepanjang `panjang` satuan, berangkat dari tepi kiri bersama."""
    lebar = panjang * SKALA
    r = Rectangle(width=lebar, height=TINGGI_BATANG)
    r.set_fill(warna, opacity=isian).set_stroke(warna, width=1.6)
    r.move_to([KIRI + lebar / 2, y, 0])
    return r


def petak(panjang, indeks, y, warna, tebal=2.4):
    """Petak isian ke-`indeks` (mulai 0) selebar `panjang` satuan, tanpa isi.

    Sengaja hanya bergaris: yang harus terbaca adalah BATAS antarpetak, sebab
    dari batas itulah penonton menghitung "tiga" dan "lima". Petak berisi warna
    akan melebur jadi satu balok dan justru hitungannya yang hilang.
    """
    lebar = panjang * SKALA
    r = Rectangle(width=lebar, height=TINGGI_BATANG)
    r.set_fill(warna, opacity=0.0).set_stroke(warna, width=tebal)
    r.move_to([KIRI + lebar * (indeks + 0.5), y, 0])
    return r


def nama_batang(kalimat, y, warna):
    """Nama batang, diletakkan di KIRI tepi bersama supaya tidak menutupi batangnya."""
    t = sinema.label(kalimat, warna=warna)
    t.next_to([KIRI, y, 0], LEFT, buff=0.28)
    return t


def kotak_mesin(isi, pusat, warna):
    """Satu mesin: kotak dengan rumusnya di dalam."""
    r = rumus(isi, 30, warna)
    kotak = Rectangle(width=r.get_width() + 0.55, height=r.get_height() + 0.50)
    kotak.set_stroke(warna, width=2.2).set_fill(LATAR, opacity=1.0)
    kotak.move_to(pusat)
    r.move_to(pusat)
    return VGroup(kotak, r)


def hud_dengan_papan(ident, papan):
    """Isi `hud=` untuk qc, aman saat panelnya masih kosong. Sama seperti video 02 dan 03."""
    isi = {"identitas": ident}
    papan_isi = papan.semua()
    if papan_isi is not None:
        isi["papan"] = papan_isi
    return isi


class TurunanAturanRantai(AdeganMatra):
    """WAKTU TIAP BABAK DISETEL KE NARASINYA, BUKAN SEBALIKNYA.

    Versi pertama memakai run_time bawaan yang enak ditulis, dan hasilnya 14
    dari 15 babak berbunyi di gerbang `sinema.babak`: kira-kira 100 detik dari
    147 detik layarnya beku sementara narator terus bicara. Angka di bawah
    dipilih supaya gerakannya membentang sepanjang kalimatnya, dan tiap kalimat
    punya benda yang bergerak saat ia diucapkan.
    """

    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True)
        ident = sinema.identitas(self, "semua batang satu skala")

        # ================= buka ========================================== #
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(2.4, DURASI["buka"] - 0.8)
            sinema.judul_pembuka(self, "Materi 07: fungsi di dalam fungsi", lama=lama)
            b.catat(lama)

        # ================= masalah: jabaran yang tidak selesai =========== #
        # Jabarannya ditulis PELAN dengan sengaja. Kalimatnya berkata kesabaran
        # habis sebelum jabarannya selesai, jadi penonton harus ikut merasakan
        # lamanya, bukan diberi tahu.
        soal = rumus(r"(2x-5)^8", 52, TINTA).move_to([0, 0.9, 0])
        jabar = rumus(r"256x^8 - 5120x^7 + 44800x^6 - \dots", 30, REDUP)
        jabar.move_to([0, -0.4, 0])
        sinema.batasi_lebar(jabar, 9.0)

        with sinema.babak(self, "masalah", DURASI) as b:
            b.main(Write(soal), run_time=1.4)
            b.main(Write(jabar), run_time=5.0)
            b.jeda(0.6)
            b.main(FadeOut(jabar), run_time=1.5)
            b.main(Indicate(soal, color=TINTA), run_time=1.6)
        qc.periksa_adegan(self, {"soal": soal},
                          hud=hud_dengan_papan(ident, papan))

        # ================= mesin: dua kotak berderet ===================== #
        m_dalam = kotak_mesin(r"u = 3x", [-1.5, -1.1, 0], AKSEN2)
        m_luar = kotak_mesin(r"y = 5u", [1.9, -1.1, 0], AKSEN)
        l_x = rumus("x", 32, TINTA).next_to(m_dalam, LEFT, buff=0.55)
        l_u = rumus("u", 32, AKSEN2).move_to([0.2, -1.1, 0])
        l_y = rumus("y", 32, AKSEN).next_to(m_luar, RIGHT, buff=0.55)
        panah1 = Arrow(l_x.get_right(), m_dalam.get_left(), buff=0.12, thickness=2.4).set_color(REDUP)
        panah2 = Arrow(m_dalam.get_right(), l_u.get_left(), buff=0.12, thickness=2.4).set_color(REDUP)
        panah3 = Arrow(l_u.get_right(), m_luar.get_left(), buff=0.12, thickness=2.4).set_color(REDUP)
        panah4 = Arrow(m_luar.get_right(), l_y.get_left(), buff=0.12, thickness=2.4).set_color(REDUP)
        rantai = VGroup(l_x, panah1, m_dalam, panah2, l_u, panah3, m_luar, panah4, l_y)

        # Dirakit sepotong demi sepotong mengikuti urutan kalimatnya: x masuk,
        # mesin pertama, hasilnya u, mesin kedua, hasilnya y.
        with sinema.babak(self, "mesin", DURASI) as b:
            b.main(FadeIn(l_x), GrowArrow(panah1), run_time=1.4)
            b.main(FadeIn(m_dalam), run_time=1.2)
            b.main(GrowArrow(panah2), FadeIn(l_u), run_time=1.4)
            b.main(FadeIn(m_luar), run_time=1.2)
            b.main(GrowArrow(panah3), run_time=1.0)
            b.main(GrowArrow(panah4), FadeIn(l_y), run_time=1.4)
            b.main(Indicate(m_dalam, color=AKSEN2), Indicate(m_luar, color=AKSEN), run_time=1.5)
        qc.periksa_adegan(self, {"soal": soal, "rantai": rantai},
                          hud=hud_dengan_papan(ident, papan))

        # ================= batang: tiga panjang, satu skala ============== #
        b_x = batang(1, Y_X, TINTA)
        b_u = batang(DALAM, Y_U, AKSEN2)
        b_y = batang(DALAM * LUAR, Y_Y, AKSEN)
        n_x = nama_batang("perubahan x", Y_X, TINTA)
        n_u = nama_batang("perubahan u", Y_U, AKSEN2)
        n_y = nama_batang("perubahan y", Y_Y, AKSEN)

        with sinema.babak(self, "batang", DURASI) as b:
            b.main(FadeOut(soal), FadeOut(rantai), run_time=1.0)
            b.main(FadeIn(n_x), GrowFromEdge(b_x, LEFT), run_time=1.6)
            b.main(FadeIn(n_u), GrowFromEdge(b_u, LEFT), run_time=1.6)
            papan.baris(r"u = 3x", warna=AKSEN2, b=b)
            b.main(FadeIn(n_y), GrowFromEdge(b_y, LEFT), run_time=2.4)
            papan.baris(r"y = 5u", warna=AKSEN, b=b)
        qc.periksa_adegan(self, {"batang x": b_x, "batang u": b_u, "batang y": b_y},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"nama x": n_x, "nama u": n_u, "nama y": n_y})

        # ================= tiga: batang u terisi tiga batang x =========== #
        isi_u = VGroup(*[petak(1, i, Y_U, TINTA) for i in range(DALAM)])
        kali3 = rumus(r"\times 3", 30, SOROT).next_to(b_u, RIGHT, buff=0.35)

        with sinema.babak(self, "tiga", DURASI) as b:
            for p in isi_u:
                b.main(FadeIn(p, shift=RIGHT * 0.25), run_time=1.1)
            b.main(FadeIn(kali3, shift=LEFT * 0.2), run_time=1.2)
            b.main(Indicate(b_u, color=AKSEN2), run_time=1.6)
        qc.periksa_adegan(self, {"batang x": b_x, "batang u": b_u, "batang y": b_y,
                                 "isi u": isi_u},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"nama x": n_x, "nama u": n_u, "nama y": n_y,
                                   "kali 3": kali3})

        # ================= lima: batang y terisi lima batang u =========== #
        isi_y = VGroup(*[petak(DALAM, i, Y_Y, AKSEN2) for i in range(LUAR)])
        kali5 = rumus(r"\times 5", 30, SOROT).next_to(b_y, RIGHT, buff=0.35)

        with sinema.babak(self, "lima", DURASI) as b:
            for p in isi_y:
                b.main(FadeIn(p, shift=RIGHT * 0.25), run_time=0.6)
            b.main(FadeIn(kali5, shift=LEFT * 0.2), run_time=0.9)
        qc.periksa_adegan(self, {"batang x": b_x, "batang u": b_u, "batang y": b_y,
                                 "isi u": isi_u, "isi y": isi_y},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"nama x": n_x, "nama u": n_u, "nama y": n_y,
                                   "kali 3": kali3, "kali 5": kali5})

        # ================= kali: tiap petak u dibelah tiga =============== #
        # Inilah pembuktiannya. Lima petak yang sudah ada dibelah tiga di
        # tempatnya, jadi penonton melihat 15 lahir dari 5 kali 3, bukan
        # membaca angka 15 yang tiba-tiba muncul. Dibelah SATU PER SATU dari
        # kiri supaya bisa dihitung, bukan muncul serentak.
        halus = VGroup(*[petak(1, i, Y_Y, TINTA, tebal=1.5) for i in range(DALAM * LUAR)])

        with sinema.babak(self, "kali", DURASI) as b:
            b.main(LaggedStartMap(FadeIn, halus, lag_ratio=0.35), run_time=3.5)
            b.main(LaggedStartMap(Indicate, halus, lag_ratio=0.18, color=SOROT),
                   run_time=2.5)
            papan.baris(r"3 \times 5 = 15", warna=SOROT, b=b)
            b.main(Indicate(b_y, color=AKSEN), run_time=1.6)
        qc.periksa_adegan(self, {"batang y": b_y, "isi y": isi_y, "petak halus": halus},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"nama x": n_x, "nama u": n_u, "nama y": n_y,
                                   "kali 3": kali3, "kali 5": kali5})

        # ================= berubah: pengali biasanya tidak tetap ========= #
        # Kalimatnya berkata pengalinya ikut berubah, jadi pengalinya HARUS
        # terlihat berubah. Petaknya dibuang dulu (petak yang ikut melar akan
        # berbohong soal jumlahnya), lalu kedua batang benar-benar berubah
        # panjang dua kali.
        catatan = sinema.label("pengali berubah", warna=SOROT)
        catatan.move_to([0.8, Y_X, 0])

        with sinema.babak(self, "berubah", DURASI) as b:
            b.main(FadeOut(isi_u), FadeOut(isi_y), FadeOut(halus),
                   FadeOut(kali3), FadeOut(kali5), run_time=1.2)
            b.main(Transform(b_u, batang(2, Y_U, AKSEN2)),
                   Transform(b_y, batang(2 * 4, Y_Y, AKSEN)), run_time=2.0)
            b.main(Transform(b_u, batang(4, Y_U, AKSEN2)),
                   Transform(b_y, batang(4 * 3, Y_Y, AKSEN)), run_time=2.0)
            b.main(FadeIn(catatan, scale=0.9), run_time=1.2)
            b.main(Indicate(catatan, color=SOROT), run_time=1.6)
        qc.periksa_adegan(self, {}, hud=hud_dengan_papan(ident, papan))

        # ================= aljabar: satu pembuktian, dimorph di tempat === #
        kerja = rumus(r"(x^2+1)^2 = x^4 + 2x^2 + 1", 44, TINTA).move_to([-1.0, 0.3, 0])
        sinema.batasi_lebar(kerja, 8.4)
        petunjuk = sinema.label("jabarkan dulu", warna=REDUP)
        petunjuk.next_to(kerja, DOWN, buff=0.7)

        with sinema.babak(self, "mudah", DURASI) as b:
            b.main(FadeOut(b_x), FadeOut(b_u), FadeOut(b_y),
                   FadeOut(n_x), FadeOut(n_u), FadeOut(n_y),
                   FadeOut(catatan), run_time=1.2)
            b.main(Write(kerja), run_time=3.5)
            b.main(FadeIn(petunjuk, shift=UP * 0.2), run_time=1.2)
            b.main(Indicate(kerja, color=TINTA), run_time=1.8)
            b.main(FadeOut(petunjuk), run_time=1.0)
        qc.periksa_adegan(self, {"kerja": kerja}, hud=hud_dengan_papan(ident, papan))

        with sinema.babak(self, "turunkan", DURASI) as b:
            kerja = sinema.ganti_rumus(self, kerja, r"4x^3 + 4x", b=b, run_time=3.0)
            b.main(Indicate(kerja, color=TINTA), run_time=1.6)
        qc.periksa_adegan(self, {"kerja": kerja}, hud=hud_dengan_papan(ident, papan))

        with sinema.babak(self, "faktor", DURASI) as b:
            kerja = sinema.ganti_rumus(self, kerja, r"4x(x^2+1)", b=b, run_time=3.0)
            dalam = kerja.get_part_by_tex(r"(x^2+1)")
            kotak = sinema.sorot_bagian(self, kerja, dalam, warna=AKSEN2)
            b.catat(0.8)
            b.main(Indicate(dalam, color=AKSEN2), run_time=1.8)
            sinema.lepas_sorot(self, kerja, kotak)
            b.catat(0.6)
        qc.periksa_adegan(self, {"kerja": kerja}, hud=hud_dengan_papan(ident, papan))

        with sinema.babak(self, "pola", DURASI) as b:
            kerja = sinema.ganti_rumus(self, kerja, r"2(x^2+1)\cdot 2x", b=b, run_time=2.6)
            # `sorot_bagian` menerima MOBJECT, bukan teks. `get_part_by_tex`
            # mengembalikan "2x" di EKOR rumus (diuji: bagiannya membentang 0,83
            # sampai 1,25 pada rumus yang membentang -1,25 sampai 1,25), yaitu
            # turunan isi kurung yang sedang dibicarakan.
            ekor = kerja.get_part_by_tex(r"2x")
            kotak = sinema.sorot_bagian(self, kerja, ekor, warna=SOROT)
            b.catat(0.8)
            b.main(Indicate(ekor, color=SOROT), run_time=1.6)
            papan.baris(r"2x = (x^2+1)'", warna=SOROT, b=b)
            sinema.lepas_sorot(self, kerja, kotak)
            b.catat(0.6)
            # Sorot dilepas, lalu SELURUH bentuknya disorot sekali: kalimatnya
            # memang menyebut kedua ruas, dan tanpa ini babaknya berbunyi di
            # gerbang diam (6,4 detik gerak dari 11,7 detik narasi).
            b.main(Indicate(kerja, color=TINTA), run_time=1.8)
        qc.periksa_adegan(self, {"kerja": kerja}, hud=hud_dengan_papan(ident, papan))

        # ================= aturan ======================================== #
        # Pecahan bertingkat tampil BESAR di tengah, dan yang masuk panel bentuk
        # segarisnya. Versi pertama menaruh pecahan itu sebagai rumus utama
        # panel: slot teratas panel setinggi satu baris, jadi pecahan dua
        # tingkat menghabiskannya sampai menyentuh baris di bawahnya. Diukur:
        # jaraknya tinggal 0,002 satuan, tidak bertindih sehingga gerbang qc
        # benar meloloskannya, tetapi juga tidak terbaca.
        aturan = rumus(r"\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}", 54, SOROT)
        aturan.move_to([-1.0, 0.3, 0])
        sinema.batasi_lebar(aturan, 8.4)

        with sinema.babak(self, "aturan", DURASI) as b:
            b.main(FadeOut(kerja), run_time=1.0)
            b.main(Write(aturan), run_time=3.0)
            b.main(Indicate(aturan, color=SOROT), run_time=1.8)
            papan.baris(r"dy/dx = dy/du \cdot du/dx", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"aturan": aturan}, hud=hud_dengan_papan(ident, papan))

        # ================= pakai: kembali ke soal yang ditinggalkan ====== #
        balik = rumus(r"(2x-5)^8", 48, TINTA).move_to([-1.0, 0.9, 0])
        bagian = rumus(r"u = 2x-5,\ \ u' = 2", 32, AKSEN2).move_to([-1.0, -0.6, 0])

        with sinema.babak(self, "pakai", DURASI) as b:
            b.main(FadeOut(aturan), run_time=0.8)
            b.main(Write(balik), run_time=2.2)
            b.main(FadeIn(bagian, shift=UP * 0.25), run_time=1.5)
            b.main(Indicate(bagian, color=AKSEN2), run_time=1.8)
            b.main(Indicate(balik, color=TINTA), run_time=1.5)
        qc.periksa_adegan(self, {"balik": balik, "bagian": bagian},
                          hud=hud_dengan_papan(ident, papan))

        # ================= hasil ========================================= #
        with sinema.babak(self, "hasil", DURASI) as b:
            b.main(FadeOut(bagian), run_time=0.8)
            balik = sinema.ganti_rumus(self, balik, r"8(2x-5)^7\cdot 2", b=b, run_time=2.6)
            balik = sinema.ganti_rumus(self, balik, r"16(2x-5)^7", b=b,
                                       run_time=2.6, warna=AKSEN)
            papan.baris(r"16(2x-5)^7", warna=AKSEN, b=b)
            b.main(Indicate(balik, color=AKSEN), run_time=1.6)
        qc.periksa_adegan(self, {"hasil": balik}, hud=hud_dengan_papan(ident, papan))
