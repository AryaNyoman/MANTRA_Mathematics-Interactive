"""Vektor Materi 01, Angka saja tidak cukup. ManimGL, STANDAR VIDEO v3.

TULIS ULANG 8 SEPTEMBER 2026. Versi sebelumnya 12 segmen, 2 menit 19 detik,
waktunya dibagi rata per babak. Versi ini 31 segmen, 4 menit 56 detik, dan tiap
kejadian di layar dipicu pada detik KATA-nya diucapkan (`sinema.JamKata`).

KERANGKA v3 (docs/tugas/STANDAR-VIDEO-V3.md bagian 1)
  pembuka      buka                     satu pertanyaan, diucapkan dan ditulis
  segar-ingat  ingat_smp, ingat_angka,  teorema Pythagoras, bekal SMP, dengan
               beda                     segitiga 3-4-5 yang digambar di petak
  contoh angka cerita sampai baca_petak dayung 3 km, arus 4 km, dibaca dari petak
  asal rumus   siku sampai hitung3      segitiganya DIBENTUK dulu, baru dihitung
  bentuk umum  tanya sampai umum        tiga jawaban, lalu akar a^2 + b^2
  penutup      nama sampai tutup2       vektor lawan skalar, lalu video berikutnya

TIGA KEPUTUSAN YANG DISENGAJA, DICATAT SUPAYA TIDAK DIKIRA KELALAIAN

1. 3D DIPENDEKKAN JADI SEKITAR 3,3 DETIK. Standar v3 bagian 5 memberi jatah
   paling lama 5 detik untuk 3D, dan itu hanya di video PERTAMA tiap topik.
   Versi lama memakai 13 detik. Sekarang: judul pembuka 2,6 detik di atas
   perahu 3D, kamera mulai turun pada kata "Perahu" (detik 3,3) dan sudah
   tegak lurus pada detik 5,5.

2. PASANGAN ANGKA (4 3) TIDAK DIPAKAI DI VIDEO INI. Versi lama menulis
   d = (0, 3) dan a = (4, 0) di panel. Menulis vektor sebagai dua angka adalah
   isi Materi 03, dan video ini justru ditutup dengan menjanjikannya. Yang
   ditulis sekarang besaran berikut satuannya: "dayung = 3 km", "arus = 4 km".

3. LABEL "dayung" DAN "arus" DIGANTI "3 km" DAN "4 km" pada babak `sisi`.
   Dua tulisan di satu panah akan bertindih, dan pada babak itu yang perlu
   dibaca angkanya, bukan namanya lagi.

PRINSIP POKOK YANG DIWARISI DARI VERSI LAMA (masih berlaku)
Matematika digambar di bidang datar bernomor, kamera tegak lurus dari atas.
Kamera miring memendekkan satu arah lebih banyak daripada arah lain, sehingga
segitiga 3-4-5 tidak lagi terlihat 3-4-5 dan gambarnya membantah hitungannya.
Sungai menempati petak 0 sampai 3 persis, perahu berangkat dari (0, 0) dan
tidak pernah dipindahkan paksa. Pita bawah layar milik subtitle sendirian.

GESERAN PANAH ARUS
Pada 0 dan 180 derajat panah dayung dan panah arus segaris. Panah arus digeser
tegak lurus 0,22 satuan supaya keduanya tetap terbaca: di bawah 6 persen dari
panjang panah, tidak mengubah arah yang terbaca, dan tidak mengubah satu pun
angka. Pada babak `siku` sampai `tanya` geseran itu dinolkan supaya segitiga
siku-sikunya tertutup rapat.

WARNA: biru dayung, merah arus, ungu perpindahan sebenarnya dan kesimpulan.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "vektor1-perahu"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
# Jam kata standar v3: detik tiap kata narasi, dari penanda WordBoundary
# mesin suara. Dibaca `sinema.babak(..., kata=KATA)` dan `b.tunggu_kata`.
KATA = sinema.JamKata(TOPIK)

DAYUNG_KM, ARUS_KM = 3.0, 4.0
V_ARUS = ARUS_KM * RIGHT
GESER_AWAL = 0.22          # pemisah panah arus, lihat catatan di atas
Z = 0.02                   # tepat di atas bidang, supaya tidak beradu gambar

LEBAR_SUNGAI, PANJANG_SUNGAI = 3.0, 18.0
Y_SUNGAI = LEBAR_SUNGAI / 2

# Jangkauan dipangkas ke daerah yang BENAR-BENAR dipakai. Ujung terjauh: dayung
# pada 180 derajat di x = -3, ujung arus pada 0 derajat di x = 7, dayung pada
# 90 derajat di y = 3. Batas bawah -1: baris y = -2 tidak pernah dipakai, dan
# angka "-2" di situ jatuh di pita subtitle.
BIDANG_X, BIDANG_Y = (-4.0, 8.0, 1.0), (-1.0, 4.0, 1.0)
PEKAT_PITA = 0.09

# Segitiga segar-ingat: bentuknya SAMA dengan segitiga perahu nanti (siku-siku
# di pojok kiri atas, sisi tegak 3, sisi mendatar 4), digeser ke petak x -3,5
# sampai 0,5 supaya tidak menempati tempat cerita perahunya.
IX0, IY0 = -3.5, 0.0       # pangkal sisi tegak
IX1, IY1 = 0.5, 3.0        # ujung sisi mendatar


class PerahuVektor(AdeganMatra):
    def construct(self):
        frame = self.frame
        self.aktif, self.tulisan, self.hud_ku = {}, {}, {}

        # ==============================================================
        # Dunia 3D pembuka. Perahu kecil (panjang 1,00 satuan, sepertiga lebar
        # sungai) supaya ia muat berangkat dari tepi dekat tanpa terdampar;
        # `panjang` di `ilustrasi.perahu` sebenarnya SETENGAH panjang.
        # ==============================================================
        air = ilustrasi.air_hidup(self, PANJANG_SUNGAI, LEBAR_SUNGAI + 1.4, pusat=(0.0, 1.3))
        tepi_jauh = ilustrasi.tanah(PANJANG_SUNGAI, 2.4, LEBAR_SUNGAI + 1.2)
        tepi_dekat = ilustrasi.tanah(PANJANG_SUNGAI, 2.4, -1.90)

        asli = ilustrasi.perahu(0.5)
        asli.rotate(90 * DEGREES, axis=OUT, about_point=ORIGIN)
        perahu = asli.copy()
        self.bx, self.by = ValueTracker(0.0), ValueTracker(0.0)
        self.di_air = True
        ilustrasi.ayunkan(asli, perahu, 0.0, 0.0, 0.0)
        perahu.add_updater(lambda m: ilustrasi.ayunkan(
            asli, m, self.bx.get_value(), self.by.get_value(),
            self.time if self.di_air else 0.0))

        self.th = ValueTracker(90.0)
        self.geser = ValueTracker(GESER_AWAL)

        # Bingkai 2,8 satuan, bukan 4,4. Pada 4,4 perahu sepanjang 1,00 satuan
        # tinggal seperlima tinggi layar, dan pada kemiringan 68 derajat ia
        # memendek lagi sampai terbaca sebagai serpih putih. Lembar kontak
        # 9 Sep memperlihatkannya: tiga frame pertama isinya air, bukan perahu.
        kamera.pasang_awal(frame, theta=-26, phi=62, pusat=(0.15, 0.45, 0.22), tinggi=2.8)
        self.add(tepi_jauh, tepi_dekat, air, perahu)
        dunia3d = Group(air, tepi_jauh, tepi_dekat)

        pita = Rectangle(width=BIDANG_X[1] - BIDANG_X[0], height=LEBAR_SUNGAI)
        pita.set_stroke(width=0).set_fill(AKSEN2, 0.0)
        pita.move_to([(BIDANG_X[0] + BIDANG_X[1]) / 2, Y_SUNGAI, -0.02])
        bidang = ilustrasi.bidang_bernomor(BIDANG_X, BIDANG_Y)
        bidang.set_opacity(0)
        self.add(pita, bidang)
        self.bring_to_front(perahu)

        # `tanpa_utama=True`: video ini tidak memakai rumus utama, semua isinya
        # baris. Tanpa penanda itu slot teratas dipesan percuma.
        self.papan = sinema.PapanRumus(self, ukuran=30, tanpa_utama=True, alas=True)

        # ==============================================================
        # buka: pertanyaan video ini, di atas dunia 3D
        # ==============================================================
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            sinema.judul_pembuka(self, "Materi 01: kenapa 3 + 4 tidak selalu 7?",
                                 lama=2.6, y=2.4)
            b.catat(2.6)
        self.gerbang()

        # ==============================================================
        # terbang: dunia jadi peta bernomor
        # ==============================================================
        kotak_satuan = Square(side_length=1.0).set_stroke(SOROT, 3)
        kotak_satuan.set_fill(SOROT, 0.10).move_to([5.5, 1.5, -0.01])
        identitas = sinema.identitas(self, "1 petak = 1 km", alas=True)
        identitas.set_opacity(0)
        self.hud_ku["identitas"] = identitas

        with sinema.babak(self, "terbang", DURASI, kata=KATA) as b:
            # Kamera turun PADA kalimat yang menyebutkannya. Versi pertama
            # menurunkannya pada detik 3,3 padahal narator baru berkata "kita
            # lihat dari atas" pada detik 9,2: gambar mendahului suara empat detik.
            b.tunggu_kata("Perahu")
            pusat, tinggi = kamera.muat_datar(bidang)
            b.main(kamera.sudut(frame, theta=0, phi=0, pusat=pusat, tinggi=tinggi),
                   run_time=1.6)
            self.di_air = False
            # Air 3D ditukar PITA sungai, bukan dibiarkan. Dari tegak lurus air
            # 3D memenuhi layar sebagai dinding garis biru tanpa tepian, dan itu
            # tidak memberi tahu apa pun. Pita menempati petak 0 sampai 3 persis,
            # jadi lebar sungai bisa dihitung siswa dari petaknya.
            b.tunggu_kata("sungainya")
            perahu.clear_updaters()
            b.main(FadeOut(dunia3d), FadeOut(perahu),
                   pita.animate.set_fill(AKSEN2, PEKAT_PITA), run_time=1.2)
            self.remove(perahu, *dunia3d)
            b.tunggu_kata("pasang")
            b.main(bidang.animate.set_opacity(1), run_time=1.2)
            self.aktif["bidang"] = bidang
            b.tunggu_kata("Satu petak")
            self.add(kotak_satuan)
            kotak_satuan.set_opacity(0)
            b.main(kotak_satuan.animate.set_fill(SOROT, 0.10).set_stroke(SOROT, 3, 1),
                   identitas.animate.set_opacity(1), run_time=1.0)
        self.gerbang()

        # ==============================================================
        # ingat_smp, ingat_angka, beda: bekal SMP dipanggil kembali
        # ==============================================================
        siku_i = self.tanda_siku(np.array([IX0, IY1, Z]), RIGHT, DOWN)
        sisi_tegak_i = Line([IX0, IY0, Z], [IX0, IY1, Z]).set_stroke(TINTA, 4)
        sisi_datar_i = Line([IX0, IY1, Z], [IX1, IY1, Z]).set_stroke(TINTA, 4)
        sisi_miring_i = Line([IX0, IY0, Z], [IX1, IY1, Z]).set_stroke(SOROT, 4)
        segitiga_i = VGroup(sisi_tegak_i, sisi_datar_i, sisi_miring_i)
        l3_i = rumus("3", 32, TINTA).move_to([IX0 - 0.42, (IY0 + IY1) / 2, Z])
        l4_i = rumus("4", 32, TINTA).move_to([(IX0 + IX1) / 2, IY1 + 0.42, Z])
        l5_i = rumus("5", 32, SOROT).move_to([-2.0, 0.55, Z])

        with sinema.babak(self, "ingat_smp", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sebelum")
            b.main(FadeOut(kotak_satuan), run_time=0.5)
            self.remove(kotak_satuan)
            b.tunggu_kata("teorema")
            self.papan.baris(r"\text{teorema Pythagoras}", REDUP, b=b)
            b.tunggu_kata("segitiga")
            # 0,9 dan 0,4, bukan 1,2 dan 0,5: pemicu "kuadrat" datang 1,6 detik
            # sesudah "segitiga", dan gambar yang belum selesai saat katanya
            # diucapkan menggeser seluruh babak (gerbang cek_pemicu_urut).
            b.main(ShowCreation(segitiga_i), run_time=0.9)
            self.aktif["segitiga ingat"] = segitiga_i
            b.main(ShowCreation(siku_i), run_time=0.4)
            self.aktif["siku ingat"] = siku_i
            b.tunggu_kata("kuadrat")
            self.papan.baris(r"c^2 = a^2 + b^2", TINTA, b=b)
        self.gerbang()

        with sinema.babak(self, "ingat_angka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sisi tegak")
            self.add(l3_i)
            b.main(FadeIn(l3_i), Indicate(sisi_tegak_i, scale_factor=1, color=SOROT),
                   run_time=0.9)
            self.tulisan["3 ingat"] = l3_i
            b.tunggu_kata("sisi mendatar")
            self.add(l4_i)
            b.main(FadeIn(l4_i), Indicate(sisi_datar_i, scale_factor=1, color=SOROT),
                   run_time=0.9)
            self.tulisan["4 ingat"] = l4_i
            b.tunggu_kata("Tiga kuadrat")
            uraian = self.papan.baris(r"3^2 + 4^2", TINTA, b=b)
            b.tunggu_kata("dijumlahkan")
            uraian = sinema.ganti_rumus(self, uraian, r"9 + 16 = 25", b=b,
                                        run_time=0.9, papan=self.papan)
            b.tunggu_kata("Akar")
            uraian = sinema.ganti_rumus(self, uraian, r"\sqrt{25} = 5", b=b,
                                        run_time=0.9, papan=self.papan)
            b.tunggu_kata("adalah lima")
            self.add(l5_i)
            b.main(FadeIn(l5_i), run_time=0.6)
            self.tulisan["5 ingat"] = l5_i
        self.gerbang()

        perahu2d = ilustrasi.perahu_atas(0.5).move_to([0, 0, Z])
        perahu2d.add_updater(lambda m: m.move_to([self.bx.get_value(), self.by.get_value(), Z]))

        with sinema.babak(self, "beda", DURASI, kata=KATA) as b:
            b.tunggu_kata("Pythagoras biasa")
            b.main(Indicate(segitiga_i, scale_factor=1, color=SOROT), run_time=1.0)
            b.tunggu_kata("Hari ini")
            pergi = Group(segitiga_i, siku_i, l3_i, l4_i, l5_i)
            self.papan_baru(b, lama=1.0, bareng=[FadeOut(pergi)])
            self.remove(*pergi)
            for nama in ("segitiga ingat", "siku ingat"):
                self.aktif.pop(nama, None)
            for nama in ("3 ingat", "4 ingat", "5 ingat"):
                self.tulisan.pop(nama, None)
            b.tunggu_kata("dua gerakan")
            b.main(FadeIn(perahu2d), run_time=1.0)
            self.aktif["perahu"] = perahu2d
        self.gerbang()

        # ==============================================================
        # Panah dayung, arus, dan perpindahan sebenarnya
        # ==============================================================
        asal = np.array([0.0, 0.0, Z])
        p_dayung = always_redraw(
            lambda: Arrow(asal, asal + self.v_dayung(), buff=0, thickness=5).set_color(AKSEN2))
        l_dayung = teks("dayung", 26, AKSEN2)

        def taruh_dayung(m):
            """Label dayung, digeser tegak lurus dari panahnya TAPI ditahan di
            dalam bidang. Pada 180 derajat arah tegak lurusnya menunjuk ke bawah
            dan label jatuh di sebelah angka sumbu, terbaca seolah menamai sumbu."""
            tengah = asal + self.v_dayung() * 0.5
            n = self.tegak_dayung()
            p = tengah + 1.3 * n
            # JANGAN duduk di jalur ANGKA SUMBU TEGAK. Di tengah putaran 90 ke 0
            # derajat titik ini melintas x = 0, dan pada lembar kontak 9 Sep
            # label "3 km" terbaca "3 km2" karena angka sumbu 2 tepat di
            # belakangnya. Yang diperbesar JARAKNYA, bukan sisinya: menukar sisi
            # membuat label meloncat 1,8 satuan di tengah putaran.
            if abs(p[0]) < 1.05 and abs(n[0]) > 0.15:
                sisi = -1.05 if n[0] < 0 else 1.05
                p = tengah + max(1.3, (sisi - tengah[0]) / n[0]) * n
            # Batas 0,40, BUKAN tepi bawah bidang. Pada 180 derajat arah tegak
            # lurusnya menunjuk ke bawah, dan label yang turun sampai bawah
            # jatuh tepat di baris ANGKA SUMBU x, terbaca seolah menamai sumbu.
            p[1] = max(float(p[1]), 0.40)
            m.move_to(p)

        l_dayung.add_updater(taruh_dayung)
        p_arus = always_redraw(
            lambda: Arrow(self.ujung_dayung(), self.ujung_arus(), buff=0,
                          thickness=5).set_color(AKSEN))

        def taruh_arus(m):
            m.move_to(self.ujung_dayung() + V_ARUS * 0.5 + 0.62 * UP)

        l_arus = teks("arus", 26, AKSEN)
        l_arus.add_updater(taruh_arus)
        p_res = always_redraw(
            lambda: Arrow(asal, self.ujung_res(), buff=0, thickness=7).set_color(SOROT))
        titik_ujung = Dot(radius=0.09).set_color(SOROT)
        titik_ujung.add_updater(lambda m: m.move_to(self.ujung_res()))

        titik_asal = Dot(asal, radius=0.08).set_color(REDUP)
        l_asal = sinema.label("berangkat", warna=REDUP).move_to([0.0, -0.62, Z])
        niat = DashedLine([0, 0.25, Z], [0, DAYUNG_KM - 0.1, Z],
                          dash_length=0.14).set_stroke(REDUP, 3)

        with sinema.babak(self, "cerita", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sebuah perahu")
            b.main(Indicate(perahu2d, scale_factor=1.6, color=SOROT), run_time=1.0)
            b.tunggu_kata("titik ini")
            self.add(titik_asal, l_asal)
            b.main(FadeIn(titik_asal, scale=2.0), FadeIn(l_asal), run_time=0.8)
            self.aktif["titik asal"] = titik_asal
            self.tulisan["berangkat"] = l_asal
            b.tunggu_kata("Pendayungnya")
            b.main(ShowCreation(niat), run_time=1.2)
            self.aktif["niat"] = niat
        self.gerbang()

        with sinema.babak(self, "dayung", DURASI, kata=KATA) as b:
            b.tunggu_kata("Panah biru")
            b.main(FadeOut(niat), FadeOut(l_asal), run_time=0.4)
            self.remove(niat, l_asal)
            self.aktif.pop("niat", None)
            self.tulisan.pop("berangkat", None)
            self.add(p_dayung)
            b.main(GrowArrow(p_dayung), run_time=1.0)
            self.aktif["dayung"] = p_dayung
            self.add(l_dayung)
            l_dayung.set_opacity(0)
            b.main(l_dayung.animate.set_opacity(1), run_time=0.3)
            self.tulisan["label dayung"] = l_dayung
            b.tunggu_kata("dan tidak")
            self.papan.baris(r"\text{dayung} = 3\ \mathrm{km}", AKSEN2, b=b)
        self.gerbang()

        with sinema.babak(self, "arus", DURASI, kata=KATA) as b:
            b.tunggu_kata("Tetapi sungai")
            b.main(pita.animate.set_fill(AKSEN2, 0.22), run_time=0.6)
            b.main(pita.animate.set_fill(AKSEN2, PEKAT_PITA), run_time=0.6)
            b.tunggu_kata("Panah merah")
            self.add(p_arus)
            b.main(GrowArrow(p_arus), run_time=1.2)
            self.aktif["arus"] = p_arus
            self.add(l_arus)
            l_arus.set_opacity(0)
            b.main(l_arus.animate.set_opacity(1), run_time=0.4)
            self.tulisan["label arus"] = l_arus
            self.papan.baris(r"\text{arus} = 4\ \mathrm{km}", AKSEN, b=b)
        self.gerbang()

        with sinema.babak(self, "bersamaan", DURASI, kata=KATA) as b:
            b.tunggu_kata("panah biru")
            b.main(Indicate(p_dayung, scale_factor=1, color=SOROT), run_time=1.0)
            b.tunggu_kata("panah merah")
            b.main(Indicate(p_arus, scale_factor=1, color=SOROT), run_time=1.0)
        self.gerbang()

        with sinema.babak(self, "jalur", DURASI, kata=KATA) as b:
            b.tunggu_kata("panah ungu")
            self.add(p_res)
            b.main(GrowArrow(p_res), run_time=1.6)
            self.aktif["perpindahan"] = p_res
            b.tunggu_kata("mendarat")
            self.add(titik_ujung)
            b.main(FadeIn(titik_ujung, scale=2.0), run_time=0.6)
        self.gerbang()

        with sinema.babak(self, "berlayar", DURASI, kata=KATA) as b:
            b.tunggu_kata("Perahunya")
            b.main(self.bx.animate.set_value(ARUS_KM),
                   self.by.animate.set_value(DAYUNG_KM), run_time=3.4)
        self.gerbang()

        proy_datar = DashedLine([0, 0, Z], [ARUS_KM, 0, Z], dash_length=0.14).set_stroke(REDUP, 3)
        proy_tegak = DashedLine([ARUS_KM, 0, Z], [ARUS_KM, DAYUNG_KM, Z],
                                dash_length=0.14).set_stroke(REDUP, 3)
        l_datar = sinema.label("4 petak", warna=REDUP).move_to([ARUS_KM / 2, -0.55, Z])
        l_tegak = sinema.label("3 petak", warna=REDUP).move_to([ARUS_KM + 1.05, DAYUNG_KM / 2, Z])

        with sinema.babak(self, "baca_petak", DURASI, kata=KATA) as b:
            b.tunggu_kata("Perahu bergeser")
            self.add(proy_datar, l_datar)
            l_datar.set_opacity(0)
            b.main(ShowCreation(proy_datar), l_datar.animate.set_opacity(1), run_time=1.0)
            self.aktif["proyeksi datar"] = proy_datar
            self.tulisan["4 petak"] = l_datar
            b.tunggu_kata("tiga petak")
            self.add(proy_tegak, l_tegak)
            l_tegak.set_opacity(0)
            b.main(ShowCreation(proy_tegak), l_tegak.animate.set_opacity(1), run_time=1.0)
            self.aktif["proyeksi tegak"] = proy_tegak
            self.tulisan["3 petak"] = l_tegak
        self.gerbang()

        with sinema.babak(self, "tanya_jarak", DURASI, kata=KATA) as b:
            b.tunggu_kata("sejauh apa")
            b.main(Indicate(p_res, scale_factor=1, color=SOROT), run_time=1.0)
            b.tunggu_kata("berpindah")
            pergi = VGroup(proy_datar, proy_tegak, l_datar, l_tegak)
            b.main(FadeOut(pergi), run_time=0.8)
            self.remove(pergi)
            for nama in ("proyeksi datar", "proyeksi tegak"):
                self.aktif.pop(nama, None)
            for nama in ("4 petak", "3 petak"):
                self.tulisan.pop(nama, None)
        self.gerbang()

        # ==============================================================
        # Asal angka 5: segitiganya dibentuk dulu, baru dihitung
        # ==============================================================
        siku = self.tanda_siku(np.array([0.0, DAYUNG_KM, Z]), RIGHT, DOWN)

        with sinema.babak(self, "siku", DURASI, kata=KATA) as b:
            b.tunggu_kata("panah biru")
            b.main(Indicate(p_dayung, scale_factor=1, color=SOROT), run_time=0.7)
            b.tunggu_kata("panah merah")
            b.main(Indicate(p_arus, scale_factor=1, color=SOROT), run_time=0.7)
            b.tunggu_kata("Keduanya bertemu")
            b.main(self.geser.animate.set_value(0.0), run_time=0.6)
            b.tunggu_kata("tegak lurus")
            self.add(siku)
            b.main(ShowCreation(siku), run_time=0.8)
            self.aktif["siku"] = siku
            b.tunggu_kata("Di sinilah")
            b.main(Indicate(p_res, scale_factor=1, color=SOROT), run_time=1.0)
        self.gerbang()

        # Nama panah ditukar dengan ANGKANYA, memakai pengikut yang sama persis.
        # Angkanya tidak ikut berubah waktu dayung diputar nanti (dayung selalu
        # 3 km, arus selalu 4 km), jadi label ini boleh tinggal sampai akhir dan
        # justru memperlihatkan "angkanya dikunci, arahnya yang diubah".
        l_tiga = rumus(r"3\ \mathrm{km}", 30, AKSEN2)
        l_tiga.add_updater(taruh_dayung)
        l_empat = rumus(r"4\ \mathrm{km}", 30, AKSEN)
        l_empat.add_updater(taruh_arus)

        with sinema.babak(self, "sisi", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sisi tegaknya")
            l_dayung.clear_updaters()
            b.main(FadeOut(l_dayung), FadeIn(l_tiga), run_time=0.8)
            self.remove(l_dayung)
            self.tulisan.pop("label dayung", None)
            self.tulisan["3 km"] = l_tiga
            b.tunggu_kata("Sisi mendatarnya")
            l_arus.clear_updaters()
            b.main(FadeOut(l_arus), FadeIn(l_empat), run_time=0.8)
            self.remove(l_arus)
            self.tulisan.pop("label arus", None)
            self.tulisan["4 km"] = l_empat
            b.tunggu_kata("Panah ungu")
            b.main(Indicate(p_res, scale_factor=1, color=SOROT), run_time=1.0)
        self.gerbang()

        label_p = teks("panjang", 24, SOROT)
        angka_p = sinema.AngkaKoma(5.0, num_decimal_places=2, font_size=38).set_color(SOROT)
        angka_p.add_updater(lambda m: m.set_value(self.panjang_res()))
        ukur = VGroup(label_p, angka_p).arrange(RIGHT, buff=0.20)
        sinema.batasi_lebar(ukur, 4.5)
        ukur.move_to([6.85 - ukur.get_width() / 2 - 0.12, 0.62, 0]).fix_in_frame()

        with sinema.babak(self, "hitung1", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekarang tinggal")
            self.papan_baru(b, lama=0.5)
            b.tunggu_kata("Tiga kuadrat")
            self.papan.baris(r"3^2 = 9", AKSEN2, b=b)
        self.gerbang()

        with sinema.babak(self, "hitung2", DURASI, kata=KATA) as b:
            b.tunggu_kata("Empat kuadrat")
            self.papan.baris(r"4^2 = 16", AKSEN, b=b)
            b.tunggu_kata("Sembilan ditambah")
            self.papan.baris(r"9 + 16 = 25", TINTA, b=b)
        self.gerbang()

        with sinema.babak(self, "hitung3", DURASI, kata=KATA) as b:
            b.tunggu_kata("Akar dua")
            self.papan.baris(r"\sqrt{25} = 5", SOROT, b=b)
            b.tunggu_kata("Jadi perahu")
            self.hud_tambah(ukur)
            self.papan.ikut(ukur)
            ukur.set_opacity(0)
            b.main(ukur.animate.set_opacity(1),
                   Indicate(p_res, scale_factor=1, color=SOROT), run_time=1.0)
            self.hud_ku["ukur"] = ukur
        self.gerbang()

        # ==============================================================
        # Satu pasang angka, tiga jawaban
        # ==============================================================
        with sinema.babak(self, "tanya", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sekarang perhatikan")
            self.papan_baru(b, lama=0.5, ikut=ukur)
            b.tunggu_kata("Angkanya")
            b.main(Indicate(l_tiga, color=SOROT), Indicate(l_empat, color=SOROT),
                   run_time=1.0)
            # Tanda siku-siku dibuang SEBELUM dayung diputar: begitu sudutnya
            # bukan 90 derajat lagi, tanda itu berbohong.
            b.tunggu_kata("Yang diubah")
            b.main(FadeOut(siku), self.geser.animate.set_value(GESER_AWAL), run_time=0.8)
            self.remove(siku)
            self.aktif.pop("siku", None)
        self.gerbang()

        with sinema.babak(self, "searah", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kalau dayung")
            b.main(self.th.animate.set_value(0.0),
                   self.bx.animate.set_value(0.0), self.by.animate.set_value(0.0),
                   run_time=3.0)
            b.tunggu_kata("Panah ungunya")
            b.main(Indicate(p_res, scale_factor=1, color=SOROT), run_time=1.0)
            b.tunggu_kata("Di sini")
            self.papan.baris(r"3 + 4 = 7", SOROT, b=b)
        self.gerbang()

        with sinema.babak(self, "lawan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kalau dayung")
            b.main(self.th.animate.set_value(180.0), run_time=3.0)
            b.tunggu_kata("Panah ungunya")
            b.main(Indicate(p_res, scale_factor=1, color=SOROT), run_time=1.0)
            b.tunggu_kata("sisanya tinggal")
            self.papan.baris(r"4 - 3 = 1", SOROT, b=b)
        self.gerbang()

        with sinema.babak(self, "tegak", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dan kalau")
            b.main(self.th.animate.set_value(90.0), run_time=2.4)
            b.tunggu_kata("panjangnya kembali")
            baris_lima = self.papan.baris(r"\sqrt{3^2 + 4^2} = 5", SOROT, b=b)
        self.gerbang()

        with sinema.babak(self, "tiga_hasil", DURASI, kata=KATA) as b:
            b.tunggu_kata("tiga jawaban")
            b.main(Indicate(self.papan.baris_lain[0], color=SOROT), run_time=0.7)
            # "satu atau", bukan "satu": kalimatnya dibuka "Satu pasang angka",
            # dan JamKata mengambil kemunculan PERTAMA. Frasa satu kata di sini
            # memicu pada detik 0,1, bukan 4,5.
            b.tunggu_kata("satu atau")
            b.main(Indicate(self.papan.baris_lain[1], color=SOROT), run_time=0.7)
            b.tunggu_kata("atau lima")
            b.main(Indicate(baris_lima, color=SOROT), run_time=0.7)
            b.tunggu_kata("Yang membedakan")
            b.main(Indicate(p_dayung, scale_factor=1, color=SOROT),
                   Indicate(p_arus, scale_factor=1, color=SOROT), run_time=1.0)
        self.gerbang()

        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dan itu")
            self.papan_baru(b, lama=0.6, ikut=ukur)
            b.tunggu_kata("Untuk dua gerakan")
            self.add(siku)
            b.main(ShowCreation(siku), run_time=0.7)
            self.aktif["siku"] = siku
            b.tunggu_kata("panjang gabungannya")
            sinema.lahir_rumus(self, r"\sqrt{a^2 + b^2}", p_res, self.papan, b=b,
                               warna=SOROT, sebagai_utama=False, tahan=0.5, run_time=1.0)
        self.gerbang()

        # ==============================================================
        # Penutup: vektor lawan skalar, lalu janji video berikutnya
        # ==============================================================
        judul_v = teks("VEKTOR", 40, SOROT)
        judul_s = teks("SKALAR", 40, REDUP)
        isi_v = VGroup(*[teks(s, 30, TINTA) for s in
                         ("perpindahan", "kecepatan", "gaya")])
        isi_s = VGroup(*[teks(s, 30, TINTA) for s in
                         ("massa 60 kg", "suhu 27 derajat", "waktu 2 jam")])
        kol_v = VGroup(judul_v, *isi_v).arrange(DOWN, buff=0.34)
        kol_s = VGroup(judul_s, *isi_s).arrange(DOWN, buff=0.34)
        tabel = VGroup(kol_v, kol_s).arrange(RIGHT, buff=2.6)
        tabel.move_to([0, 0.25, 0])
        garis_tengah = Line(tabel.get_top() + DOWN * 0.1, tabel.get_bottom() + UP * 0.1)
        garis_tengah.set_stroke(REDUP, 2).move_to([tabel.get_center()[0], tabel.get_center()[1], 0])
        for m in (kol_v, kol_s, garis_tengah):
            m.fix_in_frame()
        # Letak judul di kolomnya direkam SEBELUM ia dipindah ke tengah layar:
        # `judul_v` ADALAH `kol_v[0]`, jadi sesudah dipindah, membaca letak
        # kol_v[0] cuma mengembalikan letaknya yang sekarang dan animasi
        # kembalinya tidak bergerak sama sekali.
        letak_judul_v = judul_v.get_center().copy()

        dunia_semua = Group(bidang, pita, perahu2d, p_dayung, p_arus, p_res,
                            l_tiga, l_empat, titik_ujung, titik_asal, siku)

        with sinema.babak(self, "nama", DURASI, kata=KATA) as b:
            # "Besaran yang butuh arah SEPERTI INI" menunjuk panah yang masih
            # di layar, jadi layarnya belum boleh dibersihkan di sini. Versi
            # pertama membersihkannya pada kata pertama dan meninggalkan layar
            # kosong 2,5 detik (ditemukan alat/cek_layar_kosong.py).
            b.tunggu_kata("Besaran")
            b.main(Indicate(p_dayung, scale_factor=1, color=SOROT),
                   Indicate(p_arus, scale_factor=1, color=SOROT),
                   Indicate(p_res, scale_factor=1, color=SOROT), run_time=1.2)
            b.tunggu_kata("punya nama")
            # Pengikut dimatikan SEBELUM dipudarkan. `always_redraw` membangun
            # ulang bendanya tiap frame, jadi ia memulihkan dirinya di tengah
            # FadeOut dan tertinggal di layar (jebakan yang sudah tercatat).
            for m in (p_dayung, p_arus, p_res, titik_ujung, l_tiga, l_empat,
                      perahu2d, angka_p):
                m.clear_updaters()
            self.papan_baru(b, lama=1.4,
                            bareng=[FadeOut(dunia_semua), FadeOut(ukur),
                                    FadeOut(identitas)])
            self.remove(*dunia_semua, ukur, identitas)
            self.aktif.clear()
            self.tulisan.clear()
            self.hud_ku.clear()
            b.tunggu_kata("Namanya vektor")
            self.hud_tambah(judul_v)
            judul_v.move_to([0, 0.6, 0]).fix_in_frame()
            judul_v.set_opacity(0)
            b.main(judul_v.animate.set_opacity(1), run_time=1.0)
            self.hud_ku["judul vektor"] = judul_v
        self.gerbang()

        with sinema.babak(self, "skalar", DURASI, kata=KATA) as b:
            b.tunggu_kata("Lawannya")
            b.main(judul_v.animate.move_to(letak_judul_v), run_time=1.0)
            b.tunggu_kata("disebut skalar")
            self.hud_tambah(judul_s, garis_tengah)
            judul_s.set_opacity(0)
            garis_tengah.set_opacity(0)
            b.main(judul_s.animate.set_opacity(1),
                   garis_tengah.animate.set_opacity(1), run_time=0.8)
            self.hud_ku["judul skalar"] = judul_s
            for frasa, mob in (("Massa enam", isi_s[0]), ("suhu", isi_s[1]), ("waktu", isi_s[2])):
                b.tunggu_kata(frasa)
                self.hud_tambah(mob)
                mob.set_opacity(0)
                b.main(mob.animate.set_opacity(1), run_time=0.7)
            self.hud_ku["kolom skalar"] = isi_s
        self.gerbang()

        catatan_uji = teks("massa 60 kg ke utara ?", 28, REDUP)
        catatan_uji.move_to([0, -1.95, 0]).fix_in_frame()

        with sinema.babak(self, "uji", DURASI, kata=KATA) as b:
            b.tunggu_kata("Coba tambahkan")
            b.main(Indicate(isi_s[0], color=AKSEN), run_time=0.8)
            b.tunggu_kata("massa enam")
            self.hud_tambah(catatan_uji)
            catatan_uji.set_opacity(0)
            b.main(catatan_uji.animate.set_opacity(1), run_time=0.9)
            self.hud_ku["catatan uji"] = catatan_uji
            b.tunggu_kata("Kalimat itu")
            b.main(FadeOut(catatan_uji), run_time=0.8)
            self.remove(catatan_uji)
            self.hud_ku.pop("catatan uji", None)
            b.tunggu_kata("bukan vektor")
            b.main(Indicate(judul_s, color=REDUP), run_time=0.8)
        self.gerbang()

        with sinema.babak(self, "contoh_vektor", DURASI, kata=KATA) as b:
            for frasa, mob in (("perpindahan", isi_v[0]), ("kecepatan", isi_v[1]),
                               ("gaya", isi_v[2])):
                b.tunggu_kata(frasa)
                self.hud_tambah(mob)
                mob.set_opacity(0)
                b.main(mob.animate.set_opacity(1), run_time=0.7)
            self.hud_ku["kolom vektor"] = isi_v
            b.tunggu_kata("Ketiganya vektor")
            b.main(Indicate(judul_v, color=SOROT), run_time=0.8)
        self.gerbang()

        jebakan = rumus(r"3 + 4 = 7", 44, REDUP).move_to([0, 0.75, 0]).fix_in_frame()
        syarat = teks("hanya benar kalau keduanya searah", 30, AKSEN)
        syarat.move_to([0, -0.35, 0]).fix_in_frame()

        with sinema.babak(self, "keliru", DURASI, kata=KATA) as b:
            b.tunggu_kata("melihat angka")
            tabel_hidup = Group(judul_v, judul_s, garis_tengah, *isi_v, *isi_s)
            b.main(FadeOut(tabel_hidup), run_time=0.8)
            self.remove(*tabel_hidup)
            self.hud_ku.clear()
            self.hud_tambah(jebakan)
            jebakan.set_opacity(0)
            b.main(jebakan.animate.set_opacity(1), run_time=0.8)
            self.hud_ku["jebakan"] = jebakan
            b.tunggu_kata("jebakan")
            b.main(Indicate(jebakan, color=AKSEN), run_time=1.0)
            b.tunggu_kata("Menumpuk angka")
            self.hud_tambah(syarat)
            syarat.set_opacity(0)
            b.main(syarat.animate.set_opacity(1), run_time=1.0)
            self.hud_ku["syarat"] = syarat
        self.gerbang()

        tutup1 = teks("Begitu arah ikut dihitung, angka tidak boleh ditumpuk begitu saja.",
                      32, TINTA)
        sinema.batasi_lebar(tutup1, 11.4)
        tutup1.move_to([0, 0.9, 0]).fix_in_frame()
        tutup2 = teks("Berikutnya: satu panah dicatat sebagai dua langkah.", 32, SOROT)
        sinema.batasi_lebar(tutup2, 11.4)
        tutup2.move_to([0, -1.35, 0]).fix_in_frame()

        # Peraga janji video berikutnya: satu panah miring, lalu dua langkah.
        pj = np.array([-1.9, -0.55, 0.0])
        panah_janji = Arrow(pj, pj + np.array([2.6, 1.4, 0.0]), buff=0,
                            thickness=5).set_color(SOROT).fix_in_frame()
        # Mendatar BIRU, tegak MERAH: kesepakatan warna proyek (`web/lib/warna.ts`,
        # `samping` biru untuk sumbu x, `depan` merah untuk sumbu y), dipakai
        # widget `pecah-komponen` dan video Materi 03. Versi pertama gambar ini
        # menukar keduanya, jadi peraga "berikutnya" membantah video berikutnya.
        langkah1 = Line(pj, pj + np.array([2.6, 0.0, 0.0])).set_stroke(AKSEN2, 4).fix_in_frame()
        langkah2 = Line(pj + np.array([2.6, 0.0, 0.0]), pj + np.array([2.6, 1.4, 0.0]))
        langkah2.set_stroke(AKSEN, 4).fix_in_frame()
        janji = VGroup(panah_janji, langkah1, langkah2)

        with sinema.babak(self, "tutup1", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jadi begitu")
            b.main(FadeOut(jebakan), FadeOut(syarat), run_time=0.8)
            self.remove(jebakan, syarat)
            self.hud_ku.clear()
            b.tunggu_kata("angka tidak")
            self.hud_tambah(tutup1)
            tutup1.set_opacity(0)
            b.main(tutup1.animate.set_opacity(1), run_time=1.2)
            self.hud_ku["tutup 1"] = tutup1
        self.gerbang()

        with sinema.babak(self, "tutup2", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di video")
            b.main(FadeOut(tutup1), run_time=0.6)
            self.remove(tutup1)
            self.hud_ku.pop("tutup 1", None)
            self.hud_tambah(tutup2)
            tutup2.set_opacity(0)
            b.main(tutup2.animate.set_opacity(1), run_time=0.8)
            self.hud_ku["tutup 2"] = tutup2
            b.tunggu_kata("dua langkah")
            self.hud_tambah(panah_janji)
            b.main(GrowArrow(panah_janji), run_time=1.0)
            b.tunggu_kata("berapa jauh")
            self.hud_tambah(langkah1)
            b.main(ShowCreation(langkah1), run_time=0.9)
            b.tunggu_kata("lalu berapa")
            self.hud_tambah(langkah2)
            b.main(ShowCreation(langkah2), run_time=0.9)
            self.hud_ku["janji"] = janji
            b.tunggu_kata("Dengan itu")
            b.main(Indicate(janji, scale_factor=1.05, color=SOROT), run_time=1.0)
        self.gerbang()

        sinema.laporkan_pemicu(self)

    # ==================================================================
    # Perkakas adegan
    # ==================================================================
    def gerbang(self):
        """Gerbang mutu sesudah satu babak: tidak ada yang bertindih atau keluar
        bingkai. Dipanggil di luar `with` supaya baris `with sinema.babak(...)`
        tetap terbaca oleh `alat/cek_waktu_adegan.py`."""
        hud = dict(self.hud_ku)
        papan = self.papan.semua()
        if papan is not None:
            # Alas kertasnya ikut DI DALAM kelompok ini dan seukuran isinya,
            # jadi kelompoknya memang beralas. `PapanRumus` menandai baris satu
            # per satu, bukan kelompoknya, dan tanpa baris ini gerbang menolak
            # "papan menindih bidang" pada babak pertama yang berpanel.
            papan.beralas = True
            hud["papan"] = papan
        qc.periksa_adegan(self, {}, hud=hud, dunia=self.aktif, tulisan=self.tulisan)

    def papan_baru(self, b, lama: float = 0.5, ikut=None, bareng=None):
        """Kosongkan papan rumus, lalu ganti dengan papan kosong yang baru.

        Barisnya benar-benar DIBUANG dari adegan, bukan sekadar dipudarkan:
        benda beropasitas nol tetap punya kotak batas, dan gerbang qc
        mengukurnya. `bareng` = animasi lain yang jalan pada waktu yang sama,
        `ikut` = baris HUD di luar papan yang mendompleng alas papan baru.
        """
        g = self.papan.semua()
        gerak = list(bareng or [])
        buang = list(g) if g is not None else []
        if buang:
            gerak.append(FadeOut(Group(*buang)))
        if gerak:
            b.main(*gerak, run_time=lama)
        for m in buang:
            self.remove(m)
            if m in self.hud:
                self.hud.remove(m)
        self.papan = sinema.PapanRumus(self, ukuran=30, tanpa_utama=True, alas=True)
        if ikut is not None:
            self.papan.ikut(ikut)
        return self.papan

    def tanda_siku(self, pojok, arah_a, arah_b, s=0.30):
        """Tanda siku-siku di `pojok`, kakinya menuju dua arah yang diberikan."""
        a = np.array(arah_a, dtype=float) * s
        b = np.array(arah_b, dtype=float) * s
        return VGroup(Line(pojok + a, pojok + a + b),
                      Line(pojok + b, pojok + a + b)).set_stroke(TINTA, 2.6)

    def v_dayung(self):
        a = self.th.get_value() * DEGREES
        return DAYUNG_KM * np.array([np.cos(a), np.sin(a), 0.0])

    def tegak_dayung(self):
        a = self.th.get_value() * DEGREES
        return np.array([-np.sin(a), np.cos(a), 0.0])

    def ujung_dayung(self):
        """Ujung panah dayung, sudah digeser ke jalur panah arus."""
        return np.array([0.0, 0.0, Z]) + self.v_dayung() + self.geser.get_value() * UP

    def ujung_arus(self):
        return self.ujung_dayung() + V_ARUS

    def ujung_res(self):
        """Ujung perpindahan sebenarnya, di jalur yang BENAR, tanpa geseran."""
        return np.array([0.0, 0.0, Z]) + self.v_dayung() + V_ARUS

    def panjang_res(self):
        return float(np.linalg.norm(self.v_dayung() + V_ARUS))
