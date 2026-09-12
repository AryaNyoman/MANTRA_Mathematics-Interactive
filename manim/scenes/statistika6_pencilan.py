"""Statistika Materi 06, Ukuran Pemusatan dan Penyebaran Bagian 2: pencilan,
kenapa mean tertarik dan median bertahan (ManimGL).
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (2:04)
yang sudah disetujui ARYA. DUNIANYA SAMA: satu penggaris yang tidak pernah
berganti panjang, hanya angkanya yang berganti (dekat, jauh, sedang,
urutan); sembilan karyawan bervolume lalu jadi titik; direktur 75 juta
membuat penggaris ditarik jauh; penunjuk mean berlari, median hampir diam;
mean memakai nilai (ruas ke pusat), median memakai urutan (sumbu peringkat);
direktur 120 juta; godaan membuang pencilan ditolak; ganti ukurannya.

YANG BERBEDA: pembuka sub-bab plus Bagian 2 dengan pertanyaan halaman
(penunjuk mean sendirian di 12,22 pada penggaris kosong); segar-ingat
Bagian 1 (papan seimbang dan yang di tengah, diperagakan pada penggaris);
hitungan mean 47,2 + 75 dibagi 10 ditulis di panel; bentuk umum x bar =
jumlah x dibagi n lahir di dekat penunjuknya, median = data ke tengah;
penutup menunjuk Bagian 3 dengan sketsa lima angka; tiap kejadian dipicu
pada KATA (`sinema.JamKata`); sorotan memakai pita tembus pandang.

Empat keadaan penggaris, kamera tegak lurus sejak frame pertama:
    dekat   1 juta = 2,50 satuan   sembilan karyawan terbaca satu per satu
    jauh    1 juta = 0,125 satuan  direktur di 75 muat, karyawan jadi gerombolan
    sedang  1 juta = 0,50 satuan   perjalanan mean terlihat, direktur di luar layar
    urutan  jarak sama antar data  sumbu peringkat, tempat median bekerja

SATU WARNA SATU MAKNA: AKSEN2 biru = sembilan karyawan, AKSEN bata =
direktur (pencilan), SOROT ungu = mean yang tertarik, TINTA = median yang
bertahan, REDUP = penggaris dan angkanya.

Gerbang tulisan lawan tulisan di dunia dijaga sendiri di `periksa()` (qc
hanya memeriksa silang hud lawan dunia).
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "statistika6-pencilan"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

# --- Data. Sama persis dengan halaman Materi 06.
GAJI = [4.2, 4.5, 4.8, 5.0, 5.0, 5.2, 5.5, 6.0, 7.0]      # sembilan karyawan
KEMBAR = 4                                                 # indeks gaji 5,0 yang kedua
DIREKTUR = 75.0
MEAN9, MED9 = 5.24, 5.00
MEAN10, MED10 = 12.22, 5.10
MEAN10_JAUH = 16.72                                        # kalau gaji direktur 120

# --- Keadaan penggaris: (satuan dunia per juta, gaji yang duduk di x = 0)
SKALA = {"dekat": (2.50, 5.6), "jauh": (0.125, 40.0), "sedang": (0.50, 10.0)}
ANGKA_SUMBU = {
    "dekat": [4.2, 4.5, 4.8, 5.0, 5.2, 5.5, 6.0, 7.0],
    "jauh": [0, 10, 20, 30, 40, 50, 60, 70, 80],
    "sedang": [0, 5, 10, 15, 20],
    "urutan": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
}
DESIMAL = {"dekat": 1, "jauh": 0, "sedang": 0, "urutan": 0}

Z_GARIS = 0.30
Z_ORANG = 0.35
Z_TITIK = 0.46
Z_TICK_ATAS, Z_TICK_BAWAH = 0.24, 0.10
Z_ANGKA = -0.12
Z_PTR_MEAN, Z_LBL_MEAN = -0.56, -0.86
Z_PTR_MED, Z_LBL_MED = -1.20, -1.52
Z_RUAS = 1.24                      # ruas jarak, panah, semuanya MELAYANG di atas
Z_KURUNG, Z_LBL_KURUNG = 0.98, 1.34
Z_KAMERA = 0.35
TINGGI_BINGKAI = 6.4
PANJANG_GARIS = 10.8               # setengahnya tidak boleh lewat 6,82/1,25 = 5,45
TINGGI_ORANG = 1.70
JARI_TITIK = 0.082
MUNDUR = 0.52                      # geseran KEDALAMAN untuk gaji yang kembar


def tegak(mob):
    """Berdirikan benda datar di bidang xz supaya menghadap kamera."""
    return mob.rotate(90 * DEGREES, RIGHT)


def koma(nilai, desimal=1):
    """4.2 jadi '4{,}2', 75 jadi '75'. Angka Indonesia memakai koma."""
    if desimal == 0:
        return str(int(round(nilai)))
    return f"{nilai:.{desimal}f}".replace(".", "{,}")


class Pencilan6(AdeganMatra):
    samples = 4                        # penghalus tepi; bawaan ManimGL 0

    def sorot_pita(self, b, *mobs, lama=1.0, lebih=0.16):
        """Pita tembus pandang menghadap kamera di atas benda: menyorot tanpa menutupnya."""
        pita = VGroup()
        for m in mobs:
            p = Rectangle(width=m.get_width() + lebih, height=m.get_depth() + lebih)
            p.set_stroke(width=0).set_fill(SOROT, 0.35)
            pita.add(tegak(p).move_to(m.get_center() + IN * 0.02))
        self.add(pita)
        b.main(FadeIn(pita), run_time=lama * 0.35)
        b.main(FadeOut(pita), run_time=lama * 0.65)
        self.remove(pita)

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self, tanpa_utama=True)
        DUNIA, HUD, TULISAN = {}, {}, {}

        def taruh(nama, mob, tulisan=False):
            DUNIA[nama] = mob
            if tulisan:
                TULISAN[nama] = mob
            return mob

        def buang(*nama):
            for n in nama:
                DUNIA[n] = None
                TULISAN.pop(n, None)

        def periksa(pasangan=None):
            hidup_d = {k: v for k, v in DUNIA.items() if v is not None}
            hidup_h = {k: v for k, v in HUD.items() if v is not None}
            if papan.semua() is not None:
                hidup_h["papan rumus"] = papan.semua()
            qc.periksa_adegan(self, {}, pasangan=pasangan, hud=hidup_h,
                              dunia=hidup_d, jaga_jalur_bawah=True)
            hidup_t = [k for k, v in TULISAN.items() if v is not None]
            for i, a in enumerate(hidup_t):
                for c in hidup_t[i + 1:]:
                    qc.tidak_bertindih(frame, TULISAN[a], TULISAN[c], a, c)

        keadaan = {"nama": "dekat"}

        def X(g, nama=None):
            skala, pusat = SKALA[nama or keadaan["nama"]]
            return (g - pusat) * skala

        def x_urutan(peringkat):
            return (peringkat - 5.5) * 1.0

        def sumbu(nama):
            g = VGroup()
            for v in ANGKA_SUMBU[nama]:
                x = x_urutan(v) if nama == "urutan" else X(v, nama)
                g.add(Line([x, 0, Z_TICK_ATAS], [x, 0, Z_TICK_BAWAH]).set_stroke(REDUP, 1.6))
                g.add(tegak(rumus(koma(v, DESIMAL[nama]), 25, REDUP)).move_to([x, 0, Z_ANGKA]))
            return g

        garis = ilustrasi.balok(PANJANG_GARIS, 0.70, 0.10, REDUP).shift([0, 0, Z_GARIS])
        angka = sumbu("dekat")

        def dalam(i):
            return MUNDUR if i == KEMBAR else 0.0

        orang = Group()
        for i, g in enumerate(GAJI):
            o = ilustrasi.orang(TINGGI_ORANG, AKSEN2)
            o.move_to([X(g), dalam(i), Z_ORANG + TINGGI_ORANG / 2])
            orang.add(o)

        def titik(x, warna, y=0.0):
            d = Dot(radius=JARI_TITIK).set_fill(warna, 1).set_stroke(LATAR, 1.0)
            return tegak(d).move_to([x, y, Z_TITIK])

        titik_karyawan = VGroup(*[titik(X(g), AKSEN2, dalam(i)) for i, g in enumerate(GAJI)])
        titik_direktur = titik(X(DIREKTUR, "jauh"), AKSEN)

        def ke_nilai(nama=None):
            return [t.animate.move_to([X(g, nama), dalam(i), Z_TITIK])
                    for i, (t, g) in enumerate(zip(titik_karyawan, GAJI))]

        def panah_kanan(x_tengah, z, warna, panjang=0.90):
            a = Arrow(LEFT * panjang / 2, RIGHT * panjang / 2, buff=0, thickness=4.0)
            a.set_color(warna)
            return tegak(a).move_to([x_tengah, 0, z])

        def penunjuk(x, z_ptr, z_lbl, isi, warna):
            seg = Polygon([x, 0, z_ptr + 0.17], [x - 0.12, 0, z_ptr - 0.04],
                          [x + 0.12, 0, z_ptr - 0.04])
            seg.set_fill(warna, 1).set_stroke(warna, 1.5)
            lbl = tegak(rumus(isi, 27, warna)).move_to([x, 0, z_lbl])
            return VGroup(seg, lbl)

        def geser_penunjuk(p, x_baru):
            dx = x_baru - p[0].get_center()[0]
            return p.animate.shift([dx, 0, 0])

        ptr_mean = penunjuk(X(MEAN10, "sedang"), Z_PTR_MEAN, Z_LBL_MEAN, r"\bar{x}", SOROT)
        ptr_med = penunjuk(X(MED9), Z_PTR_MED, Z_LBL_MED, r"Me", TINTA)

        # ==================================================================
        # buka: judul sub-bab; penggaris kosong dengan penunjuk mean sendirian.
        # ==================================================================
        kamera.pasang_awal(frame, theta=0, phi=90, pusat=(0, 0, Z_KAMERA), tinggi=TINGGI_BINGKAI)
        n_buka = tegak(rumus("12{,}22", 27, SOROT)).move_to([X(MEAN10, "sedang") + 0.95, 0, Z_LBL_MEAN])
        tanya = tegak(rumus("?", 54, SOROT)).move_to([X(MEAN10, "sedang"), 0, Z_TITIK + 0.9])
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ukuran")
            sinema.judul_pembuka(self, "Ukuran Pemusatan dan Penyebaran, Bagian 2", lama=3.6, y=2.6)
            b.catat(3.6)
            b.tunggu_kata("Gaji")
            taruh("penggaris", garis)
            b.main(FadeIn(garis), run_time=0.9)
            b.tunggu_kata("dua belas")
            taruh("penunjuk mean", ptr_mean)
            TULISAN["label x-bar"] = ptr_mean[1]
            taruh("angka buka", n_buka, tulisan=True)
            b.main(FadeIn(ptr_mean, shift=UP * 0.2), FadeIn(n_buka), run_time=0.9)
            b.tunggu_kata("Kenapa")
            taruh("tanya", tanya, tulisan=True)
            b.main(FadeIn(tanya, shift=0.2 * OUT), run_time=0.7)
            b.tunggu_kata("tidak merasa")
            b.main(Indicate(tanya, scale_factor=1.2, color=SOROT), run_time=0.8)
        periksa()

        # ==================================================================
        # ingat: Bagian 1 diperagakan pada penggaris yang sama: papan seimbang
        # di atas tumpuan, dan yang di tengah.
        # ==================================================================
        penopang = ilustrasi.penopang(0.6, 0.42, 0.8).shift([0, 0, Z_GARIS - 0.47])
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Bagian")
            b.main(FadeOut(tanya), FadeOut(n_buka), FadeOut(ptr_mean), run_time=0.6)
            buang("tanya", "angka buka", "penunjuk mean", "label x-bar")
            b.tunggu_kata("titik tempat")
            taruh("penopang", penopang)
            b.main(GrowFromCenter(penopang), run_time=0.6)
            b.main(Rotate(garis, 2.5 * DEGREES, axis=UP, about_point=np.array([0, 0, Z_GARIS])), run_time=0.5)
            b.main(Rotate(garis, -2.5 * DEGREES, axis=UP, about_point=np.array([0, 0, Z_GARIS])), run_time=0.5)
            b.tunggu_kata("median")
            ptr_med.shift([0 - ptr_med[0].get_center()[0], 0, 0])
            taruh("penunjuk median", ptr_med)
            TULISAN["label Me"] = ptr_med[1]
            b.main(FadeIn(ptr_med, shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("Hari ini")
            b.main(FadeOut(penopang), FadeOut(ptr_med), run_time=0.6)
            buang("penopang", "penunjuk median", "label Me")
        periksa()

        # ==================================================================
        # kantor: sembilan karyawan berdiri di gajinya, angka penggaris dekat.
        # ==================================================================
        with sinema.babak(self, "kantor", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sebuah")
            HUD["identitas"] = sinema.identitas(self, "10 orang, satu kantor", "gaji dalam juta rupiah")
            HUD["identitas"].set_opacity(0)
            b.main(HUD["identitas"].animate.set_opacity(1), run_time=0.6)
            b.tunggu_kata("sembilan")
            taruh("orang", orang)
            b.main(LaggedStartMap(FadeIn, orang, lag_ratio=0.18), run_time=1.8)
            b.tunggu_kata("gaji mereka")
            taruh("angka sumbu", angka)
            b.main(LaggedStartMap(FadeIn, angka, lag_ratio=0.10), run_time=1.2)
            b.tunggu_kata("empat koma")
            b.main(Indicate(orang[0], scale_factor=1.2, color=TINTA), run_time=0.7)
            b.tunggu_kata("tujuh")
            b.main(Indicate(orang[8], scale_factor=1.2, color=TINTA), run_time=0.7)
        periksa()

        # ==================================================================
        # wajar: mean dari semua nilai, median dari yang di tengah, berdekatan.
        # ==================================================================
        ptr_mean.shift([X(MEAN9) - ptr_mean[0].get_center()[0], 0, 0])
        ptr_med.shift([X(MED9) - ptr_med[0].get_center()[0], 0, 0])
        beda = Line([X(MED9), 0, Z_RUAS], [X(MEAN9), 0, Z_RUAS]).set_stroke(REDUP, 2.6)
        l_beda = tegak(sinema.label("beda tipis", 21, REDUP))
        l_beda.move_to([(X(MED9) + X(MEAN9)) / 2, 0, Z_RUAS + 0.32])
        with sinema.babak(self, "wajar", DURASI, kata=KATA) as b:
            b.tunggu_kata("Rata-ratanya")
            taruh("penunjuk mean", ptr_mean)
            TULISAN["label x-bar"] = ptr_mean[1]
            b.main(FadeIn(ptr_mean, shift=UP * 0.2), run_time=0.7)
            baris_mean = papan.baris(r"\bar{x} = 5{,}24", SOROT, b=b)
            b.tunggu_kata("mediannya")
            b.main(Indicate(orang[4], scale_factor=1.25, color=TINTA), run_time=0.6)
            taruh("penunjuk median", ptr_med)
            TULISAN["label Me"] = ptr_med[1]
            b.main(FadeIn(ptr_med, shift=UP * 0.2), run_time=0.7)
            baris_med = papan.baris(r"Me = 5{,}00", TINTA, b=b)
            b.tunggu_kata("cara kerjanya")
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.15, color=AKSEN2, **kw),
                orang, lag_ratio=0.16), run_time=1.4)
            b.tunggu_kata("hampir sama")
            taruh("beda", VGroup(beda, l_beda))
            TULISAN["label beda"] = l_beda
            b.main(ShowCreation(beda), FadeIn(l_beda), run_time=1.0)
            b.tunggu_kata("masuk akal")
            b.main(papan.sorot(), run_time=0.9)
        periksa()

        # ==================================================================
        # masuk: direktur tidak muat, penggaris ditarik jauh, karyawan jadi gerombolan.
        # ==================================================================
        angka_jauh = sumbu("jauh")
        x_kiri, x_kanan = X(GAJI[0], "jauh"), X(GAJI[-1], "jauh")
        kurung = VGroup(
            Line([x_kiri, 0, Z_KURUNG], [x_kanan, 0, Z_KURUNG]),
            Line([x_kiri, 0, Z_KURUNG], [x_kiri, 0, Z_KURUNG - 0.14]),
            Line([x_kanan, 0, Z_KURUNG], [x_kanan, 0, Z_KURUNG - 0.14]),
        ).set_stroke(AKSEN2, 2.2)
        l_kurung = tegak(sinema.label("9 karyawan", 20, AKSEN2))
        l_kurung.move_to([X(5.6, "jauh"), 0, Z_LBL_KURUNG])
        l_dir = tegak(sinema.label("direktur", 20, AKSEN))
        l_dir.move_to([X(DIREKTUR, "jauh"), 0, Z_TITIK + 0.42])
        panah0 = panah_kanan(4.80, Z_RUAS, AKSEN)
        n_dir0 = tegak(rumus("75", 22, AKSEN)).move_to([4.80, 0, Z_RUAS + 0.34])

        with sinema.babak(self, "masuk", DURASI, kata=KATA) as b:
            b.tunggu_kata("direkturnya")
            b.main(FadeOut(VGroup(beda, l_beda)), run_time=0.5)
            buang("beda", "label beda")
            taruh("titik karyawan", titik_karyawan)
            b.main(*[FadeOut(o, scale=0.35) for o in orang],
                   LaggedStartMap(FadeIn, titik_karyawan, lag_ratio=0.08), run_time=1.3)
            buang("orang")
            b.tunggu_kata("Gajinya")
            taruh("panah direktur", VGroup(panah0, n_dir0))
            TULISAN["angka direktur"] = n_dir0
            b.main(GrowArrow(panah0), FadeIn(n_dir0), run_time=0.9)
            b.tunggu_kata("penggarisnya")
            keadaan["nama"] = "jauh"
            taruh("angka sumbu", angka_jauh)
            buang("panah direktur", "angka direktur")
            titik_direktur.set_opacity(0)
            self.add(titik_direktur)
            taruh("titik direktur", titik_direktur)
            taruh("label direktur", l_dir, tulisan=True)
            b.main(*ke_nilai(),
                   geser_penunjuk(ptr_mean, X(MEAN9)),
                   geser_penunjuk(ptr_med, X(MED9)),
                   FadeOut(angka), FadeIn(angka_jauh),
                   FadeOut(VGroup(panah0, n_dir0)),
                   titik_direktur.animate.set_opacity(1), FadeIn(l_dir), run_time=2.7)
            b.tunggu_kata("berdesakan")
            taruh("kurung", VGroup(kurung, l_kurung))
            TULISAN["label kurung"] = l_kurung
            b.main(ShowCreation(kurung), FadeIn(l_kurung), run_time=1.0)
            b.tunggu_kata("gerombolan")
            b.main(Indicate(titik_direktur, scale_factor=2.2, color=AKSEN), run_time=1.0)
        periksa()

        # ==================================================================
        # hitung: mean sepuluh orang ditulis di panel.
        # ==================================================================
        with sinema.babak(self, "hitung", DURASI, kata=KATA) as b:
            b.tunggu_kata("empat puluh")
            self.sorot_pita(b, VGroup(kurung), lama=1.0, lebih=0.3)
            # Bentuk mendatar, bukan pecahan: baris yang meninggi sesudah ganti_rumus
            # menindih baris Me di bawahnya (qc menolak, 12 Sep).
            baris_mean = sinema.ganti_rumus(self, baris_mean, r"\bar{x} = (47{,}2 + \ldots) : 10", b=b,
                                            run_time=0.9, papan=papan)
            b.tunggu_kata("Ditambah")
            b.main(Indicate(titik_direktur, scale_factor=2.0, color=AKSEN), run_time=0.6)
            baris_mean = sinema.ganti_rumus(self, baris_mean, r"\bar{x} = (47{,}2 + 75) : 10", b=b,
                                            run_time=0.9, papan=papan)
            b.tunggu_kata("dibagi")
            baris_mean = sinema.ganti_rumus(self, baris_mean, r"\bar{x} = 122{,}2 : 10 = 12{,}22",
                                            b=b, run_time=0.9, papan=papan)
            b.tunggu_kata("dua belas")
            b.main(Indicate(baris_mean, scale_factor=1.0, color=SOROT), run_time=0.9)
        periksa()

        # ==================================================================
        # tertarik: mean berlari, median hampir diam; jejak mean tinggal.
        # ==================================================================
        jejak = Line([X(MEAN9), 0, Z_PTR_MEAN], [X(MEAN10), 0, Z_PTR_MEAN]).set_stroke(SOROT, 2.2)
        with sinema.babak(self, "tertarik", DURASI, kata=KATA) as b:
            b.tunggu_kata("dua penanda")
            b.main(Indicate(ptr_mean, scale_factor=1.4, color=SOROT),
                   Indicate(ptr_med, scale_factor=1.4, color=TINTA), run_time=0.9)
            b.tunggu_kata("berlari")
            taruh("jejak mean", jejak)
            b.main(geser_penunjuk(ptr_mean, X(MEAN10)), ShowCreation(jejak), run_time=2.2)
            b.tunggu_kata("Median")
            b.main(Indicate(ptr_med, scale_factor=1.4, color=TINTA), run_time=0.6)
            b.main(geser_penunjuk(ptr_med, X(MED10)), run_time=1.0)
            b.tunggu_kata("ke lima")
            baris_med = sinema.ganti_rumus(self, baris_med, r"Me = 5{,}10", b=b, run_time=0.9, papan=papan)
        periksa()

        # ==================================================================
        # kosong: di tempat mean berdiri sekarang tidak ada seorang pun.
        # ==================================================================
        tiang = DashedLine([X(MEAN10), 0, Z_PTR_MEAN + 0.16], [X(MEAN10), 0, Z_TITIK + 0.58])
        tiang.set_stroke(SOROT, 2.0)
        l_kosong = tegak(sinema.label("kosong", 20, SOROT))
        l_kosong.move_to([X(MEAN10) + 0.85, 0, Z_TITIK + 0.70])
        pita = Rectangle(width=X(7.0) - X(4.2) + 0.24, height=0.34)
        pita.set_fill(AKSEN2, 0.28).set_stroke(AKSEN2, 1.4)
        pita = tegak(pita).move_to([(X(4.2) + X(7.0)) / 2, 0, Z_TITIK])

        with sinema.babak(self, "kosong", DURASI, kata=KATA) as b:
            b.tunggu_kata("tidak ada")
            taruh("tiang mean", VGroup(tiang, l_kosong))
            TULISAN["label kosong"] = l_kosong
            b.main(ShowCreation(tiang), run_time=0.8)
            b.main(FadeIn(l_kosong), run_time=0.5)
            b.tunggu_kata("Sembilan")
            taruh("pita karyawan", pita)
            b.main(GrowFromCenter(pita), run_time=1.0)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=2.0, color=AKSEN2, **kw),
                titik_karyawan, lag_ratio=0.18), run_time=1.6)
            b.tunggu_kata("Rata-ratanya")
            b.main(Indicate(ptr_mean, scale_factor=1.4, color=SOROT), run_time=0.9)
            b.tunggu_kata("tidak mewakili")
            b.main(FadeOut(pita), run_time=0.6)
            buang("pita karyawan")
        periksa()

        # ==================================================================
        # nilai: mean memakai NILAI. Ruas dari tiap titik ke mean, milik direktur
        # panjangnya di luar akal; ruasnya melayang di atas penggaris.
        # ==================================================================
        ruas = VGroup(*[Line([X(g), 0, Z_RUAS], [X(MEAN10), 0, Z_RUAS]).set_stroke(AKSEN2, 2.4)
                        for g in GAJI])
        ruas_dir = Line([X(DIREKTUR), 0, Z_RUAS], [X(MEAN10), 0, Z_RUAS]).set_stroke(AKSEN, 3.2)
        tali_dir = DashedLine([X(DIREKTUR), 0, Z_TITIK + 0.06], [X(DIREKTUR), 0, Z_RUAS])
        tali_dir.set_stroke(AKSEN, 1.6)
        l_jauh = tegak(sinema.label("paling jauh", 20, AKSEN))
        l_jauh.move_to([(X(DIREKTUR) + X(MEAN10)) / 2, 0, Z_RUAS + 0.32])

        with sinema.babak(self, "nilai", DURASI, kata=KATA) as b:
            b.tunggu_kata("Karena")
            b.main(FadeOut(VGroup(tiang, l_kosong)), FadeOut(VGroup(kurung, l_kurung)), run_time=0.6)
            buang("tiang mean", "label kosong", "kurung", "label kurung")
            b.tunggu_kata("nilai")
            taruh("ruas karyawan", ruas)
            b.main(LaggedStartMap(ShowCreation, ruas, lag_ratio=0.12), run_time=1.4)
            b.tunggu_kata("Jarak")
            taruh("ruas direktur", VGroup(ruas_dir, tali_dir))
            b.main(ShowCreation(tali_dir), run_time=0.3)
            b.main(ShowCreation(ruas_dir), run_time=1.0)
            b.tunggu_kata("jauh lebih")
            taruh("label jauh", l_jauh, tulisan=True)
            b.main(FadeIn(l_jauh), run_time=0.6)
            b.tunggu_kata("papan tadi")
            b.main(Indicate(ptr_mean, scale_factor=1.4, color=SOROT), run_time=0.9)
        periksa()

        # ==================================================================
        # posisi: median memakai URUTAN. Kesepuluh data dibariskan berjarak sama;
        # penunjuk mean dan jejaknya dipulangkan (tidak punya tempat di sumbu ini).
        # ==================================================================
        angka_urutan = sumbu("urutan")
        semua_titik = list(titik_karyawan) + [titik_direktur]
        nilai_semua = GAJI + [DIREKTUR]
        urut = sorted(range(10), key=lambda i: nilai_semua[i])
        peringkat = {i: urut.index(i) + 1 for i in range(10)}
        l_tengah = tegak(sinema.label("yang tengah", 20, TINTA))
        l_tengah.move_to([x_urutan(5.5), 0, Z_TITIK + 0.44])
        l_kanan = tegak(sinema.label("paling kanan", 20, AKSEN))
        l_kanan.move_to([x_urutan(10) - 0.70, 0, Z_TITIK + 0.90])

        with sinema.babak(self, "posisi", DURASI, kata=KATA) as b:
            b.tunggu_kata("Median")
            b.main(FadeOut(ruas), FadeOut(ruas_dir), FadeOut(tali_dir), FadeOut(l_jauh),
                   FadeOut(ptr_mean), FadeOut(jejak), run_time=0.8)
            buang("ruas karyawan", "ruas direktur", "label jauh", "penunjuk mean", "label x-bar", "jejak mean")
            b.tunggu_kata("urutan")
            keadaan["nama"] = "urutan"
            taruh("angka sumbu", angka_urutan)
            b.main(*[semua_titik[i].animate.move_to([x_urutan(peringkat[i]), 0, Z_TITIK])
                     for i in range(10)],
                   l_dir.animate.move_to([x_urutan(10), 0, Z_TITIK + 0.44]),
                   FadeOut(angka_jauh), FadeIn(angka_urutan), run_time=2.4)
            b.tunggu_kata("median", ke=2)
            b.main(geser_penunjuk(ptr_med, x_urutan(5.5)), run_time=0.8)
            b.tunggu_kata("tengah")
            b.main(Indicate(semua_titik[urut[4]], scale_factor=2.0, color=TINTA),
                   Indicate(semua_titik[urut[5]], scale_factor=2.0, color=TINTA), run_time=0.9)
            taruh("label tengah", l_tengah, tulisan=True)
            b.main(FadeIn(l_tengah), run_time=0.4)
            b.tunggu_kata("direktur")
            taruh("label kanan", l_kanan, tulisan=True)
            b.main(FadeIn(l_kanan), Indicate(titik_direktur, scale_factor=2.2, color=AKSEN), run_time=1.0)
        periksa()

        # ==================================================================
        # seret: gaji direktur ditarik ke 120 juta; penggaris keadaan sedang.
        # ==================================================================
        angka_sedang = sumbu("sedang")
        panah = panah_kanan(4.80, Z_RUAS, AKSEN)
        n_dir = tegak(rumus("75", 22, AKSEN)).move_to([4.80, 0, Z_RUAS + 0.34])
        n_dir_baru = tegak(rumus("120", 22, AKSEN)).move_to([4.80, 0, Z_RUAS + 0.34])
        jejak2 = Line([X(MEAN10, "sedang"), 0, Z_PTR_MEAN], [X(MEAN10_JAUH, "sedang"), 0, Z_PTR_MEAN])
        jejak2.set_stroke(SOROT, 2.2)

        with sinema.babak(self, "seret", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bagaimana")
            b.main(FadeOut(VGroup(l_tengah, l_kanan)), run_time=0.4)
            buang("label tengah", "label kanan")
            keadaan["nama"] = "sedang"
            taruh("angka sumbu", angka_sedang)
            buang("titik direktur", "label direktur")
            taruh("panah direktur", VGroup(panah, n_dir))
            TULISAN["angka direktur"] = n_dir
            ptr_mean.shift([X(MEAN10) - ptr_mean[0].get_center()[0], 0, 0])
            ptr_mean.set_opacity(0)
            self.add(ptr_mean)
            taruh("penunjuk mean", ptr_mean)
            TULISAN["label x-bar"] = ptr_mean[1]
            b.main(*ke_nilai(),
                   titik_direktur.animate.move_to([4.35, 0, Z_TITIK]).set_opacity(0),
                   FadeOut(l_dir), FadeOut(angka_urutan), FadeIn(angka_sedang),
                   geser_penunjuk(ptr_med, X(MED10)),
                   GrowArrow(panah), FadeIn(n_dir), ptr_mean.animate.set_opacity(1), run_time=2.4)
            b.tunggu_kata("seratus")
            b.main(Transform(n_dir, n_dir_baru), run_time=0.6)
            b.tunggu_kata("lari")
            taruh("jejak mean", jejak2)
            b.main(geser_penunjuk(ptr_mean, X(MEAN10_JAUH)), ShowCreation(jejak2), run_time=1.2)
            b.tunggu_kata("enam belas")
            baris_mean = sinema.ganti_rumus(self, baris_mean, r"\bar{x} = 167{,}2 : 10 = 16{,}72",
                                            b=b, run_time=0.9, papan=papan)
            b.tunggu_kata("tidak bergerak")
            b.main(Indicate(ptr_med, scale_factor=1.4, color=TINTA), run_time=1.0)
        periksa()

        # ==================================================================
        # umum: bentuk umum kedua ukuran, panel baru.
        # ==================================================================
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bentuk")
            b.main(FadeOut(papan.semua()), run_time=0.5)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, tanpa_utama=True)
            b.tunggu_kata("Mean")
            sinema.lahir_rumus(self, r"\bar{x} = \frac{\sum x}{n}", ptr_mean, papan, b=b, warna=SOROT,
                               ukuran_lahir=48, tahan=0.5, run_time=1.0, sebagai_utama=False,
                               geser=UP * 2.4)
            b.tunggu_kata("tiap nilai")
            self.sorot_pita(b, jejak2, lama=1.0, lebih=0.2)
            b.tunggu_kata("Median")
            papan.baris(r"Me = \text{data ke-}\tfrac{n+1}{2}\text{ setelah diurutkan}", TINTA, b=b)
            b.tunggu_kata("berapa data")
            b.main(Indicate(ptr_med, scale_factor=1.4, color=TINTA), run_time=0.9)
        periksa()

        # ==================================================================
        # buang: godaan menghapus pencilan, dan penolakannya. Direktur kembali ke 75.
        # ==================================================================
        xd = X(DIREKTUR, "jauh")
        silang = VGroup()
        for tanda in (1, -1):
            for arah in (1, -1):
                silang.add(Line([xd + arah * 0.09, 0, Z_TITIK + arah * tanda * 0.09],
                                [xd + arah * 0.30, 0, Z_TITIK + arah * tanda * 0.30]))
        silang.set_stroke(AKSEN, 3.4)

        with sinema.babak(self, "buang", DURASI, kata=KATA) as b:
            b.tunggu_kata("Godaannya")
            keadaan["nama"] = "jauh"
            titik_direktur.move_to([xd, 0, Z_TITIK]).set_opacity(0)
            l_dir.move_to([xd, 0, Z_TITIK + 0.42])
            taruh("titik direktur", titik_direktur)
            taruh("label direktur", l_dir, tulisan=True)
            taruh("angka sumbu", angka_jauh)
            buang("jejak mean", "panah direktur", "angka direktur")
            b.main(*ke_nilai(),
                   geser_penunjuk(ptr_mean, X(MEAN10)),
                   geser_penunjuk(ptr_med, X(MED10)),
                   titik_direktur.animate.set_opacity(1),
                   FadeIn(l_dir), FadeOut(jejak2), FadeOut(VGroup(panah, n_dir)),
                   FadeOut(angka_sedang), FadeIn(angka_jauh), run_time=1.0)
            b.tunggu_kata("hapus")
            taruh("silang", silang)
            b.main(ShowCreation(silang), run_time=0.9)
            b.tunggu_kata("Jangan")
            b.main(FadeOut(silang, scale=1.6), run_time=0.8)
            buang("silang")
            b.tunggu_kata("benar segitu")
            b.main(Indicate(titik_direktur, scale_factor=2.2, color=SOROT), run_time=1.0)
            b.tunggu_kata("berbohong")
            b.main(Indicate(l_dir, scale_factor=1.3, color=AKSEN), run_time=0.8)
        periksa()

        # ==================================================================
        # tutup: ukurannya yang diganti, bukan datanya; penggaris ke keadaan sedang.
        # ==================================================================
        pita_wakil = Rectangle(width=X(7.0, "sedang") - X(4.2, "sedang") + 0.34, height=0.44)
        pita_wakil.set_fill(TINTA, 0.18).set_stroke(TINTA, 1.8)
        pita_wakil = tegak(pita_wakil)
        pita_wakil.move_to([(X(4.2, "sedang") + X(7.0, "sedang")) / 2, 0, Z_TITIK])
        l_pakai = tegak(sinema.label("pakai median", 20, TINTA))
        l_pakai.move_to([X(MED10, "sedang"), 0, Z_LBL_MED - 0.02])
        panah2 = panah_kanan(4.80, Z_RUAS, AKSEN)
        n_dir2 = tegak(rumus("75", 22, AKSEN)).move_to([4.80, 0, Z_RUAS + 0.34])

        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("ukurannya")
            keadaan["nama"] = "sedang"
            taruh("angka sumbu", angka_sedang)
            buang("titik direktur", "label direktur")
            taruh("panah direktur", VGroup(panah2, n_dir2))
            TULISAN["angka direktur"] = n_dir2
            b.main(*ke_nilai(),
                   titik_direktur.animate.move_to([4.35, 0, Z_TITIK]).set_opacity(0),
                   FadeOut(l_dir), FadeOut(angka_jauh), FadeIn(angka_sedang),
                   geser_penunjuk(ptr_mean, X(MEAN10)),
                   geser_penunjuk(ptr_med, X(MED10)),
                   GrowArrow(panah2), FadeIn(n_dir2), run_time=1.6)
            b.tunggu_kata("median")
            b.main(ptr_mean.animate.set_opacity(0.30), run_time=0.6)
            b.main(Indicate(ptr_med, scale_factor=1.5, color=SOROT), run_time=0.9)
            l_pakai.shift([ptr_med[1].get_width() / 2 + l_pakai.get_width() / 2 + 0.22, 0, 0])
            taruh("label pakai", l_pakai, tulisan=True)
            b.main(FadeIn(l_pakai), run_time=0.6)
            b.tunggu_kata("karyawan")
            taruh("pita wakil", pita_wakil)
            b.main(GrowFromCenter(pita_wakil), run_time=1.0)
            b.tunggu_kata("dua belas")
            b.main(Indicate(ptr_mean, scale_factor=1.3, color=SOROT), run_time=0.8)
        periksa()

        # ==================================================================
        # lanjut: sketsa lima angka (kotak dan kumis) di penggaris yang sama.
        # ==================================================================
        judul_lanjut = teks("Ukuran Pemusatan dan Penyebaran, Bagian 3", 30, SOROT)
        judul_lanjut.move_to([0, 2.6, 0]).fix_in_frame()
        xa, xb, xc, xd_, xe = -3.6, -1.6, -0.4, 1.4, 3.8
        kotak = Rectangle(width=xd_ - xb, height=0.9).set_fill(SOROT, 0.18).set_stroke(SOROT, 2.2)
        kotak = tegak(kotak).move_to([(xb + xd_) / 2, 0, Z_RUAS + 0.3])
        kumis = VGroup(Line([xa, 0, Z_RUAS + 0.3], [xb, 0, Z_RUAS + 0.3]),
                       Line([xd_, 0, Z_RUAS + 0.3], [xe, 0, Z_RUAS + 0.3]),
                       Line([xa, 0, Z_RUAS + 0.05], [xa, 0, Z_RUAS + 0.55]),
                       Line([xe, 0, Z_RUAS + 0.05], [xe, 0, Z_RUAS + 0.55]),
                       Line([xc, 0, Z_RUAS - 0.15], [xc, 0, Z_RUAS + 0.75])).set_stroke(SOROT, 2.2)
        lima = VGroup(*[tegak(Dot(radius=0.07).set_fill(SOROT, 1)).move_to([x, 0, Z_RUAS + 1.05])
                        for x in (xa, xb, xc, xd_, xe)])
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ukuran")
            b.main(FadeOut(VGroup(pita_wakil, l_pakai, panah2, n_dir2, angka_sedang, titik_karyawan)),
                   FadeOut(ptr_mean), FadeOut(ptr_med), FadeOut(papan.semua()), FadeOut(HUD["identitas"]),
                   run_time=0.7)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, tanpa_utama=True)
            HUD["identitas"] = None
            for n in ("pita wakil", "label pakai", "panah direktur", "angka direktur", "angka sumbu",
                      "titik karyawan", "penunjuk mean", "label x-bar", "penunjuk median", "label Me"):
                buang(n)
            self.hud_tambah(judul_lanjut)
            HUD["judul lanjut"] = judul_lanjut
            b.main(FadeIn(judul_lanjut, shift=0.2 * UP), run_time=0.7)
            b.tunggu_kata("sebaran")
            taruh("kotak", VGroup(kotak, kumis))
            b.main(ShowCreation(kumis), FadeIn(kotak), run_time=1.2)
            b.tunggu_kata("lima angka")
            taruh("lima", lima)
            b.main(LaggedStartMap(lambda m: FadeIn(m, scale=1.6), lima, lag_ratio=0.2), run_time=1.0)
        periksa()

        sinema.laporkan_pemicu(self)
