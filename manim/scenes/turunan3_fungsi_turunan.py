"""Video 02 topik TURUNAN, untuk Materi 03 "Turunan sebagai fungsi baru".

TUGAS VIDEO INI
Memperlihatkan kemiringan BERHENTI menjadi satu angka dan menjadi fungsi.
Jejak kemiringan harus LAHIR dari sapuan, bukan digambar jadi: kalau kurva f'
sudah ada sejak awal, siswa cuma membaca dua kurva yang kebeturun berdampingan.

KENAPA SATU PAPAN, BUKAN DUA SEPERTI WIDGET-NYA
Widget Materi 03 memakai dua papan bertumpuk, dan itu benar di layar situs yang
bisa memanjang ke bawah. Di bingkai 16:9 tidak bisa: `bidang_bernomor` mengunci
satu satuan mendatar sama dengan satu satuan tegak (aturan 9, supaya panjang
tidak berbohong), dan dua papan bertumpuk untuk f = x^2 beserta f' = 2x
menuntut tinggi sekitar 9,6 satuan pada lebar cuma 3, sehingga keduanya
menyusut menjadi pita tipis di tengah layar. Diukur, bukan dikira: bingkai
menyisakan sekitar 6,3 satuan tegak, jadi papan setinggi 9,6 memaksa kamera
mundur sampai isinya tinggal 14 persen lebar layar.

Satu papan justru memberi satu hal yang dua papan SEMBUNYIKAN: jejak f' memotong
sumbu mendatar tepat di dasar lembah f. Hubungan itu inti materinya, dan di sini
ia terlihat dalam satu tatapan.

TANPA 3D (butir 2): video pertama topik menurut urutan belajar adalah Materi 01.

SATU WARNA SATU MAKNA (butir 10)
  TINTA         kurva f
  AKSEN merah   titik di kurva f, yaitu tempat yang sedang diukur
  SOROT ungu    garis singgung
  AKSEN2 biru   jejak kemiringan dan titiknya, yaitu hasil pengukuran
  REDUP         garis bantu

ANGKANYA SAMA DENGAN HALAMAN
-2, 0, 2, dan 4 untuk x = -1, 0, 1, 2 adalah tabel Materi 03. f(3) = 9 lawan
f'(3) = 6 juga dari halaman yang sama. Klaimnya diperiksa
`alat/klaim-video-turunan.json` dengan awalan V03.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "turunan3-fungsi-turunan"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

# LEBAR BIDANG DIPILIH DARI UKURAN LAYAR, BUKAN DARI JANGKAUAN KURVANYA.
#
# Percobaan pertama memakai x dari -1,8 sampai 2,3, yaitu persis sejauh kurvanya
# dipakai. Hasilnya terlihat di lembar kontak: bidangnya cuma mengisi sekitar 20
# persen lebar layar dan angka sumbunya menyusut sampai sulit dibaca, sementara
# separuh layar kiri kosong. Sebabnya `muat_datar` memuat sisi yang paling
# menuntut, dan di sini itu TINGGI: bidang setinggi 8 satuan pada jalur layar
# yang cuma 6,3 satuan memaksa kamera mundur, lalu lebar 4,1 satuan tenggelam di
# bingkai yang jadi 18 satuan.
#
# Bidang koordinat tidak harus berhenti di tempat kurvanya berhenti. Dilebarkan
# ke -4 sampai 4,2, bidangnya mengisi sekitar setengah lebar layar, angkanya
# terbaca, dan kurvanya tetap sama persis: x^2 memang keluar dari tepi atas di
# sekitar x = 2,1, dan itu jujur, bukan terpotong.
# Batas BAWAH kedua sumbu WAJIB bilangan bulat, lihat catatan yang sama di
# turunan2_garis_singgung.py: -4,2 dan -3,2 membuat SEMUA angka sumbu meleset
# 0,2 petak dari garisnya dan memunculkan "-0" di kedua sumbu.
BIDANG_X, BIDANG_Y = (-4.0, 4.2, 1.0), (-3.0, 4.4, 1.0)
X_KIRI, X_KANAN = -3.85, 4.05
Y_BAWAH, Y_ATAS = -2.85, 4.25

SAPU_DARI, SAPU_SAMPAI = -1.4, 2.0
CONTOH = [(-1.0, -2.0), (0.0, 0.0), (1.0, 2.0), (2.0, 4.0)]   # (x, kemiringan)


def f(x):
    return x * x


def f_aksen(x):
    return 2 * x


def P3(x, y):
    return np.array([float(x), float(y), 0.02])


def kurva_dari(g, dari, sampai, warna, tebal=4.4):
    k = ParametricCurve(lambda t: P3(t, g(t)), t_range=(dari, sampai, 0.02))
    k.set_stroke(warna, width=tebal)
    return k


def ruas_singgung(x0, m, warna, tebal=3.6, panjang=1.5):
    """Ruas garis singgung PENDEK di sekitar titiknya, bukan garis penuh layar.

    Video 02 memakai garis penuh karena yang dibandingkan justru kemiringannya
    dengan garis lain. Di sini garis singgung cuma penunjuk, dan garis penuh
    akan menyeberangi jejak f' sehingga dua benda berwarna beda bertabrakan
    sepanjang sapuan. Ruas pendek mengikuti titiknya dan tidak mengganggu.
    """
    y0 = f(x0)
    dx = panjang / 2 / max(1.0, (1 + m * m) ** 0.5)
    a = (x0 - dx, y0 - m * dx)
    b = (x0 + dx, y0 + m * dx)
    return Line(P3(*a), P3(*b)).set_stroke(warna, width=tebal)


def alas_dunia(mob, pad_x=0.14, pad_y=0.10):
    """Alas kertas di belakang tulisan yang menumpang di atas kisi.

    Sama seperti di video 02, dan alasannya sama: `bidang_bernomor` punya angka
    di KEDUA sumbu, jadi memindah-mindahkan tulisan cuma memindahkan cacatnya.
    """
    r = Rectangle(width=mob.get_width() + 2 * pad_x,
                  height=mob.get_height() + 2 * pad_y)
    r.set_fill(LATAR, opacity=1.0).set_stroke(width=0)
    r.move_to(mob.get_center())
    r.shift(0.008 * IN)
    # Penanda untuk `qc.periksa_adegan`, sama artinya dengan yang dipasang
    # `sinema.alas_hud`: tulisan yang punya alas kertas boleh berdiri di atas
    # angka sumbu, sebab alasnya menutup angka di belakangnya. Tanpa tanda ini,
    # gerbang yang memeriksa tulisan lawan angka sumbu akan menolak justru
    # tulisan yang sudah dibereskan.
    mob.beralas = True
    r.beralas = True
    return r


def hud_dengan_papan(ident, papan):
    """Isi `hud=` untuk qc, aman saat panelnya masih kosong. Lihat video 02."""
    isi = {"identitas": ident}
    papan_isi = papan.semua()
    if papan_isi is not None:
        isi["papan"] = papan_isi
    return isi


class TurunanFungsiBaru(AdeganMatra):
    def construct(self):
        frame = self.frame

        bidang = ilustrasi.bidang_bernomor(BIDANG_X, BIDANG_Y)
        pusat, tinggi = kamera.muat_datar(bidang)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat, tinggi=tinggi)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True)

        # ================= buka ========================================== #
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(2.4, DURASI["buka"] - 0.8)
            sinema.judul_pembuka(self, "Materi 03: turunan sebagai fungsi baru", lama=lama)
            b.catat(lama)
        qc.periksa_adegan(self, {})

        # ================= ingat: satu angka dari Materi 02 ============== #
        kurva = kurva_dari(f, -2.06, 2.06, TINTA)
        titik1 = Dot(P3(1, f(1)), radius=0.10).set_color(AKSEN)
        singgung1 = ruas_singgung(1, f_aksen(1), SOROT)
        ident = sinema.identitas(self, "1 petak = 1 satuan")

        with sinema.babak(self, "ingat", DURASI) as b:
            b.main(FadeIn(bidang), run_time=0.7)
            b.main(ShowCreation(kurva), run_time=1.6)
            b.main(FadeIn(titik1, scale=0.5), ShowCreation(singgung1), run_time=1.2)
            sinema.lahir_rumus(self, r"f(x)=x^2", dekat=kurva, papan=papan,
                               b=b, warna=TINTA)
        qc.periksa_adegan(self, {"kurva": kurva},
                          hud=hud_dengan_papan(ident, papan),
                          dunia={"bidang": bidang, "titik": titik1, "singgung": singgung1})

        # ================= tanya ========================================= #
        with sinema.babak(self, "tanya", DURASI) as b:
            papan.baris(r"f'(1)=2", warna=SOROT, b=b)
            b.main(Indicate(titik1, color=AKSEN), run_time=1.2)
        qc.periksa_adegan(self, {"kurva": kurva},
                          hud=hud_dengan_papan(ident, papan),
                          dunia={"bidang": bidang, "titik": titik1, "singgung": singgung1})

        # ================= papan: sumbu yang sama, catatan yang beda ===== #
        # Sumbu mendatar yang SAMA ditegaskan dengan menyorot garisnya sendiri,
        # bukan dengan menambah papan kedua. Alasan lengkapnya di kepala berkas.
        sumbu_x = Line(P3(X_KIRI, 0), P3(X_KANAN, 0)).set_stroke(AKSEN2, 3.0)

        with sinema.babak(self, "papan", DURASI) as b:
            b.main(FadeOut(singgung1), run_time=0.4)
            b.main(ShowCreation(sumbu_x), run_time=1.2)
            b.main(Indicate(sumbu_x, color=AKSEN2), run_time=1.4)
            b.main(FadeOut(sumbu_x), run_time=0.6)
        qc.periksa_adegan(self, {"kurva": kurva},
                          hud=hud_dengan_papan(ident, papan),
                          dunia={"bidang": bidang, "titik": titik1})

        # ================= tiga titik contoh ============================= #
        # Tiap babak menambah SATU titik kemiringan, sesuai kalimatnya. Angka
        # -2, 0, 2, dan 4 diambil dari tabel halaman Materi 03.
        titik_f = {}
        titik_aksen = {}
        singgung = {}
        for x0, m in CONTOH:
            titik_f[x0] = Dot(P3(x0, f(x0)), radius=0.09).set_color(AKSEN)
            titik_aksen[x0] = Dot(P3(x0, m), radius=0.09).set_color(AKSEN2)
            singgung[x0] = ruas_singgung(x0, m, SOROT)

        def sorot_titik(b, daftar, lama_akhir=1.0):
            for x0 in daftar:
                b.main(ShowCreation(singgung[x0]), run_time=0.6)
                b.main(FadeIn(titik_f[x0], scale=0.5),
                       FadeIn(titik_aksen[x0], scale=0.5), run_time=0.6)
            b.main(*[Indicate(titik_aksen[x0], color=AKSEN2) for x0 in daftar],
                   run_time=lama_akhir)

        with sinema.babak(self, "kiri", DURASI) as b:
            papan.baris(r"x=-1:\ \ f'=-2", warna=AKSEN2, b=b)
            sorot_titik(b, [-1.0], 1.2)
        qc.periksa_adegan(self, {"kurva": kurva},
                          hud=hud_dengan_papan(ident, papan),
                          dunia={"bidang": bidang, "titik f": titik_f[-1.0],
                                 "titik aksen": titik_aksen[-1.0]})

        with sinema.babak(self, "nol", DURASI) as b:
            papan.baris(r"x=0:\ \ f'=0", warna=AKSEN2, b=b)
            sorot_titik(b, [0.0], 1.2)
        qc.periksa_adegan(self, {"kurva": kurva},
                          hud=hud_dengan_papan(ident, papan),
                          dunia={"bidang": bidang, "titik aksen": titik_aksen[0.0]})

        with sinema.babak(self, "kanan", DURASI) as b:
            papan.baris(r"x=1:\ 2,\ \ x=2:\ 4", warna=AKSEN2, b=b)
            sorot_titik(b, [1.0, 2.0], 1.4)
        qc.periksa_adegan(self, {"kurva": kurva},
                          hud=hud_dengan_papan(ident, papan),
                          dunia={"bidang": bidang, "titik aksen": titik_aksen[2.0]})

        # ================= sapu: jejaknya LAHIR ========================== #
        xt = ValueTracker(SAPU_DARI)

        def jejak_sekarang():
            ujung = xt.get_value()
            if ujung <= SAPU_DARI + 0.03:
                return VMobject()
            return kurva_dari(f_aksen, SAPU_DARI, ujung, AKSEN2, 4.2)

        jejak = always_redraw(jejak_sekarang)
        penanda_f = always_redraw(lambda: Dot(
            P3(xt.get_value(), f(xt.get_value())), radius=0.09).set_color(AKSEN))
        penanda_aksen = always_redraw(lambda: Dot(
            P3(xt.get_value(), f_aksen(xt.get_value())), radius=0.09).set_color(AKSEN2))
        singgung_hidup = always_redraw(lambda: ruas_singgung(
            xt.get_value(), f_aksen(xt.get_value()), SOROT))
        tali = always_redraw(lambda: DashedLine(
            P3(xt.get_value(), f(xt.get_value())),
            P3(xt.get_value(), f_aksen(xt.get_value()))).set_stroke(REDUP, 1.6))

        with sinema.babak(self, "sapu", DURASI) as b:
            b.main(*[FadeOut(titik_f[x0]) for x0, _ in CONTOH],
                   *[FadeOut(singgung[x0]) for x0, _ in CONTOH],
                   FadeOut(titik1), run_time=0.6)
            self.add(jejak, tali, singgung_hidup, penanda_f, penanda_aksen)
            b.main(xt.animate.set_value(SAPU_SAMPAI),
                   run_time=max(2.4, DURASI["sapu"] - 1.2))
        qc.periksa_adegan(self, {"kurva": kurva, "jejak": jejak},
                          hud=hud_dengan_papan(ident, papan),
                          dunia={"bidang": bidang, "penanda": penanda_aksen})

        # ================= lahir: jejaknya ternyata garis lurus ========== #
        l_jejak = sinema.label("jejak kemiringan", warna=AKSEN2)
        l_jejak.move_to(P3(2.75, -2.15))
        alas_jejak = alas_dunia(l_jejak)

        with sinema.babak(self, "lahir", DURASI) as b:
            b.main(FadeIn(alas_jejak), FadeIn(l_jejak), run_time=0.7)
            b.main(Indicate(jejak, color=AKSEN2), run_time=1.4)
            papan.baris(r"f'(x)=2x", warna=AKSEN2, b=b)
        qc.periksa_adegan(self, {"kurva": kurva, "jejak": jejak},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"jejak": l_jejak},
                          dunia={"bidang": bidang})

        # ================= fungsi ======================================== #
        with sinema.babak(self, "fungsi", DURASI) as b:
            b.main(Indicate(jejak, color=SOROT), run_time=1.4)
            papan.baris(r"\text{fungsi turunan}", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"kurva": kurva, "jejak": jejak},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"jejak": l_jejak},
                          dunia={"bidang": bidang})

        # ================= pakai dan beda ================================ #
        with sinema.babak(self, "pakai", DURASI) as b:
            papan.baris(r"f'(3)=6", warna=AKSEN2, b=b)
            b.main(Indicate(jejak, color=AKSEN2), run_time=1.3)
        qc.periksa_adegan(self, {"kurva": kurva, "jejak": jejak},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"jejak": l_jejak},
                          dunia={"bidang": bidang})

        with sinema.babak(self, "beda", DURASI) as b:
            papan.baris(r"f(3)=9\ \ne\ f'(3)=6", warna=AKSEN, b=b)
            b.main(Indicate(kurva, color=TINTA), run_time=1.4)
        qc.periksa_adegan(self, {"kurva": kurva, "jejak": jejak},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"jejak": l_jejak},
                          dunia={"bidang": bidang})

        # ================= sudut: kurva yang turunannya tidak ada ======== #
        mutlak = kurva_dari(abs, -3.0, 3.0, TINTA)
        # Ruas ungunya PENDEK dan TIPIS, tidak menutupi kurvanya.
        #
        # Percobaan pertama menariknya dari -2,9 sampai 2,9 setebal 3,4, yaitu
        # persis sepanjang kurvanya. Hasilnya di lembar kontak: kurva |x| hitam
        # tertutup habis dan seluruh grafik tampak berganti menjadi ungu. Itu
        # melanggar aturan 10, sebab ungu berarti KESIMPULAN, bukan kurva. Yang
        # ingin ditunjukkan cuma bahwa kedua lengannya lurus dengan kemiringan
        # berbeda, dan itu cukup ditandai di bagian tengah lengannya.
        kiri_lurus = Line(P3(-2.05, 2.05), P3(-0.06, 0.06)).set_stroke(SOROT, 2.4)
        kanan_lurus = Line(P3(0.06, 0.06), P3(2.05, 2.05)).set_stroke(SOROT, 2.4)
        l_kiri = sinema.label("dari kiri -1", warna=SOROT)
        l_kiri.move_to(P3(-2.55, -1.65))
        l_kanan = sinema.label("dari kanan 1", warna=SOROT)
        l_kanan.move_to(P3(2.55, -1.65))
        alas_kiri, alas_kanan = alas_dunia(l_kiri), alas_dunia(l_kanan)

        with sinema.babak(self, "sudut", DURASI) as b:
            self.remove(jejak, tali, singgung_hidup, penanda_f, penanda_aksen)
            b.main(FadeOut(kurva), FadeOut(l_jejak), FadeOut(alas_jejak),
                   *[FadeOut(titik_aksen[x0]) for x0, _ in CONTOH], run_time=0.7)
            b.main(ShowCreation(mutlak), run_time=1.5)
            # `papan.tumbuh`, BUKAN `sinema.ganti_rumus`.
            #
            # Keduanya sama-sama memorf rumus utama, tetapi `ganti_rumus` hanya
            # memberi tahu panelnya kalau diberi argumen `papan=`. Di video 02
            # argumen itu tidak saya berikan, sehingga panel tidak pernah tahu
            # rumus utamanya berganti dan MEMULIHKAN yang lama begitu baris
            # berikutnya ditambahkan; videonya berakhir menampilkan "0/0 ?".
            # Saya sempat melaporkannya ke MASTER sebagai lubang perkakas,
            # padahal itu argumen yang saya lupakan. `tumbuh` memperbarui
            # `self.utama` sendiri, jadi ia tidak bisa dilupakan dengan cara
            # yang sama.
            papan.tumbuh(r"f(x)=|x|", b=b)
        qc.periksa_adegan(self, {"kurva mutlak": mutlak},
                          hud=hud_dengan_papan(ident, papan),
                          dunia={"bidang": bidang})

        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(ShowCreation(kiri_lurus), ShowCreation(kanan_lurus), run_time=1.4)
            b.main(FadeIn(alas_kiri), FadeIn(l_kiri),
                   FadeIn(alas_kanan), FadeIn(l_kanan), run_time=0.9)
            papan.baris(r"\text{di } x=0:\ \text{tidak ada}", warna=AKSEN, b=b)
        qc.periksa_adegan(self, {"kurva mutlak": mutlak},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"kiri": l_kiri, "kanan": l_kanan},
                          dunia={"bidang": bidang,
                                 "lurus kiri": kiri_lurus, "lurus kanan": kanan_lurus})
