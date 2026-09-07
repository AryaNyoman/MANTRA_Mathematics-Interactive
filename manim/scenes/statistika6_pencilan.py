"""Materi 06 Statistika: pencilan, kenapa mean tertarik dan median bertahan (ManimGL).

Naskah: manim/narasi/statistika6-pencilan.json (10 segmen, 124,4 detik)

URUTAN KERJA DIBALIK. Video 05 dan 08 ditulis naskahnya dulu, lalu geraknya
dipaksa muat, dan tiap babak menyisakan 2 sampai 4 detik tanpa animasi baru.
Video ini dirancang geraknya lebih dulu (sepuluh babak, tiap babak satu gerakan
besar), baru narasinya ditulis sepanjang gerak itu, lalu dipangkas jadi 124 detik.

GAGASAN POKOK. Halaman Tahap 6 sudah menyatakan mean tertarik dan median tidak.
Yang tidak bisa dilakukan halaman: memperlihatkan PENGGARISNYA sendiri harus
ditarik jauh supaya direktur muat, dan sembilan karyawan berdesakan jadi satu
gerombolan karenanya. Skala yang berubah itulah isi videonya, dan ia jujur:
tidak ada sumbu yang dipotong, justru itu yang dibongkar di Materi 13.

Empat keadaan penggaris, semuanya kamera tegak lurus, tidak pernah dimiringkan
setelah babak pembuka:
    dekat   1 juta = 2,50 satuan   sembilan karyawan terbaca satu per satu
    jauh    1 juta = 0,125 satuan  direktur di 75 muat, karyawan jadi gerombolan
    sedang  1 juta = 0,50 satuan   perjalanan mean terlihat, direktur di luar layar
    urutan  jarak sama antar data  sumbu peringkat, tempat median bekerja

TATA LETAK (standar video versi 2):
    kiri atas  identitas benda, menetap
    kanan atas papan rumus: x-bar dan Me, keduanya berubah lewat morph
    kaki layar milik subtitle, dijaga qc
    dalam gambar label maksimal dua kata

SATU WARNA SATU MAKNA DI DALAM VIDEO INI:
    AKSEN2 biru = sembilan karyawan     AKSEN bata = direktur (pencilan)
    SOROT ungu  = mean, yang tertarik   TINTA      = median, yang bertahan
    REDUP       = penggaris dan angkanya

LUBANG GERBANG YANG DITEMUKAN DI SINI (3 Sep 2026, untuk MASTER).
`qc.periksa_adegan` memeriksa SILANG hud lawan dunia, tetapi TIDAK dunia lawan
dunia. Tulisan di dunia yang menindih tulisan lain di dunia lolos diam-diam:
label "9 karyawan" duduk persis di atas label x-bar dan render tetap sukses.
Memeriksa silang seluruh benda dunia tidak bisa jadi bawaan (orang memang
berdiri di atas papan, label memang menempel di bendanya), tetapi TULISAN lawan
TULISAN selalu cacat. Karena itu adegan ini memelihara `TULISAN` sendiri dan
memeriksanya silang di `periksa()`. Usul: naikkan ke `qc` sebagai bawaan.
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

# --- Data. Sama persis dengan halaman Tahap 6.
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

# --- Tinggi tiap lapis. KOREKSI 4 Sep 2026 dari MASTER, dan MASTER benar.
#     Saya kira jalur panel memesan seluruh pita atas layar, jadi dunia saya
#     kunci di 46 persen tinggi dan orang-orangnya jadi mungil. Yang sebenarnya
#     dipesan cuma DUA POJOK: identitas di kiri (layar x < -2,1) dan papan rumus
#     di kanan (x > 2,1). Tengah atas bebas, dan `qc` memang cuma memeriksa
#     tabrakan nyata. Jadi dunianya dibesarkan: orang dari 1,00 jadi 1,70
#     satuan, penggaris ditebalkan, angka sumbu diperbesar, dan kamera
#     diturunkan ke 0,35 supaya ruang di bawah penggaris cukup untuk dua baris
#     penunjuk yang ikut membesar.
#
#     Dua baris penunjuk tetap perlu jarak: di penggaris `jauh`, mean 5,24 dan
#     median 5,00 cuma 0,03 satuan berjauhan, jadi keduanya praktis bertumpuk.
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
# Setengah panjang penggaris tidak boleh lewat 6,82/1,25 = 5,45 satuan. Render
# pertama gagal persis di sini, dan gerbang qc yang menangkapnya.
PANJANG_GARIS = 10.8
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

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        DUNIA, HUD, TULISAN = {}, {}, {}
        HUD["identitas"] = sinema.identitas(self, "10 orang, satu kantor",
                                            "gaji dalam juta rupiah")

        def taruh(nama, mob, tulisan=False):
            """Daftarkan benda ke gerbang. `tulisan=True` untuk yang berhuruf."""
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
            # Lihat catatan lubang gerbang di docstring berkas ini: qc tidak
            # memeriksa dunia lawan dunia, jadi tulisan lawan tulisan diperiksa
            # di sini. Perkalian silang, bukan daftar pasangan yang ditulis
            # tangan, sebab daftar tangan selalu punya lubang.
            hidup_t = [k for k, v in TULISAN.items() if v is not None]
            for i, a in enumerate(hidup_t):
                for c in hidup_t[i + 1:]:
                    qc.tidak_bertindih(frame, TULISAN[a], TULISAN[c], a, c)

        # Keadaan penggaris yang sedang dipakai. Semua letak dihitung darinya,
        # jadi tidak ada satu pun letak layar yang ditulis tangan dua kali.
        keadaan = {"nama": "dekat"}

        def X(g, nama=None):
            skala, pusat = SKALA[nama or keadaan["nama"]]
            return (g - pusat) * skala

        def x_urutan(peringkat):
            """Letak mendatar data ke-`peringkat` (1 sampai 10) di sumbu urutan."""
            return (peringkat - 5.5) * 1.0

        def sumbu(nama):
            """Angka sumbu plus garis skala pendeknya, satu kelompok."""
            g = VGroup()
            for v in ANGKA_SUMBU[nama]:
                x = x_urutan(v) if nama == "urutan" else X(v, nama)
                g.add(Line([x, 0, Z_TICK_ATAS], [x, 0, Z_TICK_BAWAH]).set_stroke(REDUP, 1.6))
                g.add(tegak(rumus(koma(v, DESIMAL[nama]), 25, REDUP)).move_to([x, 0, Z_ANGKA]))
            return g

        # ------------------------------------------------------------------
        # Panggung tetap: satu penggaris yang tidak pernah berganti panjang,
        # hanya angkanya yang berganti. Itu yang membuat perubahan skala
        # terbaca sebagai "penggaris ditarik", bukan sebagai potongan sumbu.
        # ------------------------------------------------------------------
        garis = ilustrasi.balok(PANJANG_GARIS, 0.70, 0.10, REDUP).shift([0, 0, Z_GARIS])
        angka = sumbu("dekat")

        # Dua karyawan bergaji sama persis. Yang kedua berdiri agak ke BELAKANG,
        # bukan digeser mendatar: menggeser mendatar akan membohongi nilainya,
        # dan nilai adalah seluruh isi video ini. Tanpa geseran ini penonton
        # menghitung delapan orang, bukan sembilan (cacat render kedua).
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
            """Animasi memulangkan kesembilan titik ke letak gajinya."""
            return [t.animate.move_to([X(g, nama), dalam(i), Z_TITIK])
                    for i, (t, g) in enumerate(zip(titik_karyawan, GAJI))]

        def panah_kanan(x_tengah, z, warna, panjang=0.90):
            """Panah yang MENGHADAP kamera.

            Panah ManimGL yang dibangun dari titik xz digambar di bidang xy,
            jadi dari kamera ini ia terlihat dari sisinya dan tinggal segaris
            rambut (render ketiga: panah direktur praktis tidak kelihatan).
            Bangun di bidang xy dulu, baru didirikan.
            """
            a = Arrow(LEFT * panjang / 2, RIGHT * panjang / 2, buff=0, thickness=4.0)
            a.set_color(warna)
            return tegak(a).move_to([x_tengah, 0, z])

        def penunjuk(x, z_ptr, z_lbl, isi, warna):
            """Segitiga penunjuk di bawah penggaris, plus satu lambang di bawahnya."""
            seg = Polygon([x, 0, z_ptr + 0.17], [x - 0.12, 0, z_ptr - 0.04],
                          [x + 0.12, 0, z_ptr - 0.04])
            seg.set_fill(warna, 1).set_stroke(warna, 1.5)
            lbl = tegak(rumus(isi, 27, warna)).move_to([x, 0, z_lbl])
            return VGroup(seg, lbl)

        def geser_penunjuk(p, x_baru):
            dx = x_baru - p[0].get_center()[0]
            return p.animate.shift([dx, 0, 0])

        ptr_mean = penunjuk(X(MEAN9), Z_PTR_MEAN, Z_LBL_MEAN, r"\bar{x}", SOROT)
        ptr_med = penunjuk(X(MED9), Z_PTR_MED, Z_LBL_MED, r"Me", TINTA)

        # ==================================================================
        # Babak 1 `buka`: penggaris, lalu sembilan karyawan berdiri di gajinya.
        # ==================================================================
        # Kamera DATAR sejak frame pertama. Pembuka miring cuma boleh di video
        # pertama topik, dan video pertama Statistika adalah Materi 01, yang
        # memang datar penuh (aturan 2 standar, dipertegas MASTER 4 Sep).
        kamera.pasang_awal(frame, theta=0, phi=90, pusat=(0, 0, Z_KAMERA),
                           tinggi=TINGGI_BINGKAI)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 06: Pencilan", lama=3.2, y=2.6)
            b.catat(3.2)
            taruh("penggaris", garis)
            b.main(FadeIn(garis), run_time=1.2)
            taruh("orang", orang)
            b.main(LaggedStartMap(FadeIn, orang, lag_ratio=0.18), run_time=3.8)
            taruh("angka sumbu", angka)
            b.main(LaggedStartMap(FadeIn, angka, lag_ratio=0.10), run_time=2.6)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 2 `wajar`: median dari yang di tengah, mean dari semua nilai.
        # Keduanya berdekatan, dan itulah keadaan yang nanti dirusak direktur.
        # ==================================================================
        beda = Line([X(MED9), 0, Z_RUAS], [X(MEAN9), 0, Z_RUAS]).set_stroke(REDUP, 2.6)
        l_beda = tegak(sinema.label("beda tipis", 21, REDUP))
        l_beda.move_to([(X(MED9) + X(MEAN9)) / 2, 0, Z_RUAS + 0.32])

        with sinema.babak(self, "wajar", DURASI) as b:
            b.main(Indicate(orang[4], scale_factor=1.25, color=TINTA), run_time=1.2)
            taruh("penunjuk median", ptr_med)
            TULISAN["label Me"] = ptr_med[1]
            b.main(FadeIn(ptr_med, shift=UP * 0.2), run_time=1.4)
            papan.baris(r"Me = 5{,}00", TINTA)
            b.catat(0.8)
            # Sapuan ini berkata "mean memakai SEMUA orang". Warnanya warna
            # mereka sendiri: mewarnainya ungu (warna mean) membuat badan
            # orang-orangan jadi pucat dan bentuknya rusak di 480p.
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.15, color=AKSEN2, **kw),
                orang, lag_ratio=0.16), run_time=1.8)
            taruh("penunjuk mean", ptr_mean)
            TULISAN["label x-bar"] = ptr_mean[1]
            b.main(FadeIn(ptr_mean, shift=UP * 0.2), run_time=1.2)
            sinema.lahir_rumus(self, r"\bar{x} = 5{,}24", ptr_mean, papan, b=b, warna=SOROT)
            taruh("beda", VGroup(beda, l_beda))
            TULISAN["label beda"] = l_beda
            b.main(ShowCreation(beda), FadeIn(l_beda), run_time=1.4)
            b.jeda(1.2)
        periksa()

        # ==================================================================
        # Babak 3 `masuk`: penggaris ditarik jauh supaya direktur muat, dan
        # sembilan karyawan berdesakan jadi satu gerombolan karenanya.
        # ==================================================================
        angka_jauh = sumbu("jauh")
        x_kiri, x_kanan = X(GAJI[0], "jauh"), X(GAJI[-1], "jauh")
        # Kurung dipasang DI ATAS penggaris. Di bawahnya ia bertumpuk dengan
        # penunjuk mean dan median, dan itu cacat pertama render kedua.
        kurung = VGroup(
            Line([x_kiri, 0, Z_KURUNG], [x_kanan, 0, Z_KURUNG]),
            Line([x_kiri, 0, Z_KURUNG], [x_kiri, 0, Z_KURUNG - 0.14]),
            Line([x_kanan, 0, Z_KURUNG], [x_kanan, 0, Z_KURUNG - 0.14]),
        ).set_stroke(AKSEN2, 2.2)
        l_kurung = tegak(sinema.label("9 karyawan", 20, AKSEN2))
        l_kurung.move_to([X(5.6, "jauh"), 0, Z_LBL_KURUNG])
        l_dir = tegak(sinema.label("direktur", 20, AKSEN))
        l_dir.move_to([X(DIREKTUR, "jauh"), 0, Z_TITIK + 0.42])

        with sinema.babak(self, "masuk", DURASI) as b:
            b.main(FadeOut(VGroup(beda, l_beda)), run_time=0.6)
            buang("beda", "label beda")
            # Orang jadi titik data. Peralihan ini disengaja: mulai sekarang
            # yang dibandingkan adalah letak, bukan wajah.
            taruh("titik karyawan", titik_karyawan)
            b.main(*[FadeOut(o, scale=0.35) for o in orang],
                   LaggedStartMap(FadeIn, titik_karyawan, lag_ratio=0.08), run_time=1.6)
            buang("orang")
            keadaan["nama"] = "jauh"
            taruh("angka sumbu", angka_jauh)
            b.main(*ke_nilai(),
                   geser_penunjuk(ptr_mean, X(MEAN9)),
                   geser_penunjuk(ptr_med, X(MED9)),
                   FadeOut(angka), FadeIn(angka_jauh), run_time=4.2)
            taruh("kurung", VGroup(kurung, l_kurung))
            TULISAN["label kurung"] = l_kurung
            b.main(ShowCreation(kurung), FadeIn(l_kurung), run_time=1.4)
            taruh("titik direktur", titik_direktur)
            taruh("label direktur", l_dir, tulisan=True)
            b.main(FadeIn(titik_direktur, scale=0.4), FadeIn(l_dir), run_time=1.6)
            b.main(Indicate(titik_direktur, scale_factor=2.2, color=AKSEN), run_time=1.4)
            b.jeda(1.2)
        periksa()

        # ==================================================================
        # Babak 4 `tertarik`: mean berlari, median hampir diam. Jejak mean
        # ditinggalkan supaya jarak yang ditempuhnya dilihat, bukan diingat.
        # Jejaknya setinggi PUSAT segitiga, bukan setinggi angka sumbu: di
        # ketinggian angka ia terbaca sebagai garis bawah angka itu.
        # ==================================================================
        jejak = Line([X(MEAN9), 0, Z_PTR_MEAN], [X(MEAN10), 0, Z_PTR_MEAN])
        jejak.set_stroke(SOROT, 2.2)

        with sinema.babak(self, "tertarik", DURASI) as b:
            b.main(Indicate(ptr_mean, scale_factor=1.4, color=SOROT), run_time=1.2)
            taruh("jejak mean", jejak)
            b.main(geser_penunjuk(ptr_mean, X(MEAN10)), ShowCreation(jejak), run_time=3.6)
            sinema.ganti_rumus(self, papan.utama, r"\bar{x} = 12{,}22", b=b,
                               run_time=1.4, papan=papan)
            b.main(Indicate(ptr_med, scale_factor=1.4, color=TINTA), run_time=1.2)
            b.main(geser_penunjuk(ptr_med, X(MED10)), run_time=1.6)
            sinema.ganti_rumus(self, papan.baris_lain[0], r"Me = 5{,}10", b=b,
                               run_time=1.4, papan=papan)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 5 `kosong`: di tempat mean berdiri sekarang tidak ada seorang pun.
        # ==================================================================
        tiang = DashedLine([X(MEAN10), 0, Z_PTR_MEAN + 0.16], [X(MEAN10), 0, Z_TITIK + 0.58])
        tiang.set_stroke(SOROT, 2.0)
        l_kosong = tegak(sinema.label("kosong", 20, SOROT))
        # Digeser ke KANAN garis putus dan diturunkan. Sebaris dengan "9 karyawan"
        # keduanya cuma berjarak 0,05 satuan: gerbang tulisan meloloskannya sebab
        # memang tidak bertindih, tetapi di layar terbaca menyambung jadi
        # "9 karyawankosong". Terlihat jelas di render 1080p.
        l_kosong.move_to([X(MEAN10) + 0.85, 0, Z_TITIK + 0.70])
        pita = Rectangle(width=X(7.0) - X(4.2) + 0.24, height=0.34)
        pita.set_fill(AKSEN2, 0.28).set_stroke(AKSEN2, 1.4)
        pita = tegak(pita).move_to([(X(4.2) + X(7.0)) / 2, 0, Z_TITIK])

        with sinema.babak(self, "kosong", DURASI) as b:
            taruh("tiang mean", VGroup(tiang, l_kosong))
            TULISAN["label kosong"] = l_kosong
            b.main(ShowCreation(tiang), run_time=1.6)
            b.main(FadeIn(l_kosong), run_time=1.0)
            taruh("pita karyawan", pita)
            b.main(GrowFromCenter(pita), run_time=2.0)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=2.0, color=AKSEN2, **kw),
                titik_karyawan, lag_ratio=0.18), run_time=2.6)
            b.main(Indicate(ptr_mean, scale_factor=1.4, color=SOROT), run_time=1.4)
            b.main(FadeOut(pita), run_time=0.8)
            buang("pita karyawan")
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 6 `nilai`: mean memakai NILAI. Ruas dari tiap titik ke mean,
        # dan milik direktur panjangnya di luar akal. Ruasnya MELAYANG di atas
        # penggaris: rebah di atas penggaris ia terbaca sebagai goresan kayu.
        # ==================================================================
        ruas = VGroup(*[Line([X(g), 0, Z_RUAS], [X(MEAN10), 0, Z_RUAS]).set_stroke(AKSEN2, 2.4)
                        for g in GAJI])
        ruas_dir = Line([X(DIREKTUR), 0, Z_RUAS], [X(MEAN10), 0, Z_RUAS]).set_stroke(AKSEN, 3.2)
        tali_dir = DashedLine([X(DIREKTUR), 0, Z_TITIK + 0.06], [X(DIREKTUR), 0, Z_RUAS])
        tali_dir.set_stroke(AKSEN, 1.6)
        l_jauh = tegak(sinema.label("paling jauh", 20, AKSEN))
        l_jauh.move_to([(X(DIREKTUR) + X(MEAN10)) / 2, 0, Z_RUAS + 0.32])

        with sinema.babak(self, "nilai", DURASI) as b:
            b.main(FadeOut(VGroup(tiang, l_kosong)),
                   FadeOut(VGroup(kurung, l_kurung)), run_time=0.8)
            buang("tiang mean", "label kosong", "kurung", "label kurung")
            taruh("ruas karyawan", ruas)
            b.main(LaggedStartMap(ShowCreation, ruas, lag_ratio=0.12), run_time=2.0)
            taruh("ruas direktur", VGroup(ruas_dir, tali_dir))
            b.main(ShowCreation(tali_dir), run_time=0.6)
            b.main(ShowCreation(ruas_dir), run_time=2.0)
            taruh("label jauh", l_jauh, tulisan=True)
            b.main(FadeIn(l_jauh), run_time=1.0)
            b.main(Indicate(ruas_dir, scale_factor=1.04, color=AKSEN), run_time=1.2)
            b.main(FadeOut(ruas), FadeOut(ruas_dir), FadeOut(tali_dir),
                   FadeOut(l_jauh), run_time=1.0)
            buang("ruas karyawan", "ruas direktur", "label jauh")
            b.jeda(1.2)
        periksa()

        # ==================================================================
        # Babak 7 `posisi`: median memakai URUTAN. Kesepuluh data dibariskan
        # berjarak sama; penggarisnya berhenti jadi penggaris nilai. Di sumbu
        # ini mean tidak punya tempat, jadi penunjuknya sengaja dipulangkan,
        # dan JEJAKNYA ikut dipadamkan: jejak nilai di atas sumbu urutan
        # membantah gambarnya sendiri (cacat render kedua).
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

        with sinema.babak(self, "posisi", DURASI) as b:
            b.main(FadeOut(ptr_mean), FadeOut(jejak), run_time=1.0)
            buang("penunjuk mean", "label x-bar", "jejak mean")
            keadaan["nama"] = "urutan"
            taruh("angka sumbu", angka_urutan)
            b.main(*[semua_titik[i].animate.move_to([x_urutan(peringkat[i]), 0, Z_TITIK])
                     for i in range(10)],
                   l_dir.animate.move_to([x_urutan(10), 0, Z_TITIK + 0.44]),
                   FadeOut(angka_jauh), FadeIn(angka_urutan), run_time=4.0)
            b.main(geser_penunjuk(ptr_med, x_urutan(5.5)), run_time=1.4)
            b.main(Indicate(semua_titik[3], scale_factor=2.0, color=TINTA),
                   Indicate(semua_titik[5], scale_factor=2.0, color=TINTA), run_time=1.4)
            taruh("label tengah", l_tengah, tulisan=True)
            b.main(FadeIn(l_tengah), run_time=1.0)
            taruh("label kanan", l_kanan, tulisan=True)
            b.main(FadeIn(l_kanan), Indicate(titik_direktur, scale_factor=2.2, color=AKSEN),
                   run_time=1.8)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 8 `seret`: pengandaian. Gaji direktur ditarik ke 120 juta.
        # Penggaris dipasang di keadaan `sedang` supaya perjalanan mean
        # sepanjang 4,5 juta benar-benar terlihat; direktur sendiri berada di
        # luar layar, dan itu DIKATAKAN lewat panah bertulis, bukan disembunyikan.
        # ==================================================================
        angka_sedang = sumbu("sedang")
        panah = panah_kanan(4.80, Z_RUAS, AKSEN)
        n_dir = tegak(rumus("75", 22, AKSEN)).move_to([4.80, 0, Z_RUAS + 0.34])
        n_dir_baru = tegak(rumus("120", 22, AKSEN)).move_to([4.80, 0, Z_RUAS + 0.34])
        jejak2 = Line([X(MEAN10, "sedang"), 0, Z_PTR_MEAN],
                      [X(MEAN10_JAUH, "sedang"), 0, Z_PTR_MEAN])
        jejak2.set_stroke(SOROT, 2.2)

        with sinema.babak(self, "seret", DURASI) as b:
            b.main(FadeOut(VGroup(l_tengah, l_kanan)), run_time=0.8)
            buang("label tengah", "label kanan")
            keadaan["nama"] = "sedang"
            taruh("angka sumbu", angka_sedang)
            buang("titik direktur", "label direktur")
            taruh("panah direktur", VGroup(panah, n_dir))
            TULISAN["angka direktur"] = n_dir
            b.main(*ke_nilai(),
                   titik_direktur.animate.move_to([4.35, 0, Z_TITIK]).set_opacity(0),
                   FadeOut(l_dir), FadeOut(angka_urutan), FadeIn(angka_sedang),
                   geser_penunjuk(ptr_med, X(MED10)), run_time=3.4)
            b.main(GrowArrow(panah), FadeIn(n_dir), run_time=1.0)
            ptr_mean.shift([X(MEAN10) - ptr_mean[0].get_center()[0], 0, 0])
            ptr_mean.set_opacity(1)
            taruh("penunjuk mean", ptr_mean)
            TULISAN["label x-bar"] = ptr_mean[1]
            b.main(FadeIn(ptr_mean, shift=UP * 0.2), run_time=1.0)
            taruh("jejak mean", jejak2)
            b.main(geser_penunjuk(ptr_mean, X(MEAN10_JAUH)), ShowCreation(jejak2),
                   Transform(n_dir, n_dir_baru), run_time=3.0)
            sinema.ganti_rumus(self, papan.utama, r"\bar{x} = 16{,}72", b=b,
                               run_time=1.2, papan=papan)
            b.main(Indicate(ptr_med, scale_factor=1.4, color=TINTA), run_time=1.2)
        periksa()

        # ==================================================================
        # Babak 9 `buang`: godaan menghapus pencilan, dan penolakannya.
        # Panelnya WAJIB dipulangkan ke 12,22 di sini: direktur kembali ke 75,
        # dan panel yang masih menulis 16,72 membantah gambarnya sendiri
        # (cacat render kedua, tertangkap di frame detik 106 dan 116).
        # Silangnya dibuat BERLUBANG di tengah supaya titik yang dicoret tetap
        # terlihat, sesuai gerbang video CLAUDE.md.
        # ==================================================================
        xd = X(DIREKTUR, "jauh")
        silang = VGroup()
        for tanda in (1, -1):
            for arah in (1, -1):
                silang.add(Line([xd + arah * 0.09, 0, Z_TITIK + arah * tanda * 0.09],
                                [xd + arah * 0.30, 0, Z_TITIK + arah * tanda * 0.30]))
        silang.set_stroke(AKSEN, 3.4)

        with sinema.babak(self, "buang", DURASI) as b:
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
                   FadeOut(angka_sedang), FadeIn(angka_jauh), run_time=3.2)
            sinema.ganti_rumus(self, papan.utama, r"\bar{x} = 12{,}22", b=b,
                               run_time=1.2, papan=papan)
            taruh("silang", silang)
            b.main(ShowCreation(silang), run_time=1.4)
            b.main(Indicate(silang, scale_factor=1.3, color=AKSEN), run_time=1.2)
            b.main(FadeOut(silang, scale=1.6), run_time=1.2)
            buang("silang")
            b.main(Indicate(titik_direktur, scale_factor=2.2, color=SOROT), run_time=1.4)
            b.jeda(1.2)
        periksa()

        # ==================================================================
        # Babak 10 `tutup`: ukurannya yang diganti, bukan datanya. Penggaris
        # dipulangkan ke keadaan `sedang`: di keadaan `jauh` kesembilan karyawan
        # cuma gerombolan selebar 0,35 satuan, dan pita penutup yang melingkupi
        # mereka tidak kelihatan sama sekali (cacat render kedua).
        # ==================================================================
        pita_wakil = Rectangle(width=X(7.0, "sedang") - X(4.2, "sedang") + 0.34, height=0.44)
        pita_wakil.set_fill(TINTA, 0.18).set_stroke(TINTA, 1.8)
        pita_wakil = tegak(pita_wakil)
        pita_wakil.move_to([(X(4.2, "sedang") + X(7.0, "sedang")) / 2, 0, Z_TITIK])
        l_pakai = tegak(sinema.label("pakai median", 20, TINTA))
        l_pakai.move_to([X(MED10, "sedang"), 0, Z_LBL_MED - 0.02])
        panah2 = panah_kanan(4.80, Z_RUAS, AKSEN)
        n_dir2 = tegak(rumus("75", 22, AKSEN)).move_to([4.80, 0, Z_RUAS + 0.34])

        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(ptr_mean.animate.set_opacity(0.30),
                   papan.utama.animate.set_opacity(0.35), run_time=1.2)
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
                   GrowArrow(panah2), FadeIn(n_dir2), run_time=3.2)
            b.main(Indicate(ptr_med, scale_factor=1.5, color=SOROT), run_time=1.4)
            b.main(papan.baris_lain[0].animate.set_color(SOROT), run_time=1.0)
            taruh("pita wakil", pita_wakil)
            b.main(GrowFromCenter(pita_wakil), run_time=1.8)
            # Label penutup ditaruh di baris label median, sedikit ke kanan,
            # supaya tidak menabrak lambang Me maupun jalur subtitle.
            l_pakai.shift([ptr_med[1].get_width() / 2 + l_pakai.get_width() / 2 + 0.22, 0, 0])
            taruh("label pakai", l_pakai, tulisan=True)
            b.main(FadeIn(l_pakai), run_time=1.2)
            b.main(Indicate(pita_wakil, scale_factor=1.08, color=TINTA), run_time=1.4)
            b.jeda(1.2)
        periksa()
