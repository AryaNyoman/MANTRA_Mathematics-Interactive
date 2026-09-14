"""Vektor Materi 01, Pengenalan Vektor Bagian 1. ManimGL, STANDAR VIDEO v3.1.

TULIS ULANG 8 SEPTEMBER 2026 (v3, 31 segmen, 4 menit 56 detik), DISESUAIKAN
MASTER 12 SEPTEMBER 2026 ke v3.1: 29 segmen, 4 menit 38 detik. Tiap kejadian
di layar dipicu pada detik KATA-nya diucapkan (`sinema.JamKata`).

KERANGKA v3.1 (docs/tugas/STANDAR-VIDEO-V3.md bagian 1)
  pembuka      buka                     "Pengenalan Vektor, Bagian 1", lalu pertanyaannya
  segar-ingat  ingat                    Pythagoras (prasyarat nyata: dipakai hitung1-3),
                                        segitiga a, b, c; SATU segmen, tanpa contoh 3-4-5
                                        yang mengulang hitungan utama
  contoh angka cerita sampai baca_petak dayung 3 km, arus 4 km, dibaca dari petak
  asal rumus   siku sampai hitung3      segitiganya DIBENTUK dulu, baru dihitung
  bentuk umum  tanya sampai umum        tiga jawaban, lalu akar a^2 + b^2
  penutup      nama sampai lanjut       vektor lawan skalar, tiga pasang panah kecil
                                        (7, 1, 5), lalu Pengenalan Vektor Bagian 2

YANG BERUBAH DARI v3 KE v3.1 (keputusan ARYA 10 dan 11 Sep 2026)
- Kalimat narasi TIDAK ditulis sebagai teks di layar (pita "hanya benar kalau
  keduanya searah", dua kalimat penutup, "massa 60 kg ke utara ?" dibuang);
  yang bercerita gambar: pasangan panah kecil, coretan merah, dua panah sama.
- Sorot panah memakai PITA UNGU TEMBUS PANDANG (`sorot_panah`), bukan
  `Indicate`: pada panah `always_redraw` Indicate tidak berbekas sama sekali,
  dan pada benda lain ia menutup bendanya (ARYA: "seperti glitch").

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
        tanya_buka = teks("Kenapa 3 + 4 tidak selalu 7?", 34, TINTA)
        sinema.batasi_lebar(tanya_buka, 11.0)
        tanya_buka.move_to([0, 2.4, 0]).fix_in_frame()

        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Pengenalan")
            sinema.judul_pembuka(self, "Pengenalan Vektor, Bagian 1", lama=2.6, y=2.4)
            b.catat(2.6)
            b.tunggu_kata("Kenapa")
            self.hud_tambah(tanya_buka)
            b.main(Write(tanya_buka), run_time=1.5)
            self.hud_ku["tanya buka"] = tanya_buka
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
            b.tunggu_kata("Supaya")
            pusat, tinggi = kamera.muat_datar(bidang)
            b.main(kamera.sudut(frame, theta=0, phi=0, pusat=pusat, tinggi=tinggi),
                   FadeOut(tanya_buka), run_time=1.6)
            self.remove(tanya_buka)
            self.hud_ku.pop("tanya buka", None)
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
        # ingat: bekal SMP dipanggil kembali, SATU segmen, segitiga a b c
        # ==============================================================
        siku_i = self.tanda_siku(np.array([IX0, IY1, Z]), RIGHT, DOWN)
        sisi_tegak_i = Line([IX0, IY0, Z], [IX0, IY1, Z]).set_stroke(TINTA, 4)
        sisi_datar_i = Line([IX0, IY1, Z], [IX1, IY1, Z]).set_stroke(TINTA, 4)
        sisi_miring_i = Line([IX0, IY0, Z], [IX1, IY1, Z]).set_stroke(SOROT, 4)
        segitiga_i = VGroup(sisi_tegak_i, sisi_datar_i, sisi_miring_i)
        la_i = rumus("a", 32, TINTA).move_to([IX0 - 0.42, (IY0 + IY1) / 2, Z])
        lb_i = rumus("b", 32, TINTA).move_to([(IX0 + IX1) / 2, IY1 + 0.42, Z])
        lc_i = rumus("c", 32, SOROT).move_to([-0.85, 0.72, Z])

        perahu2d = ilustrasi.perahu_atas(0.5).move_to([0, 0, Z])
        perahu2d.add_updater(lambda m: m.move_to([self.bx.get_value(), self.by.get_value(), Z]))

        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bekal")
            b.main(FadeOut(kotak_satuan), run_time=0.5)
            self.remove(kotak_satuan)
            b.tunggu_kata("teorema")
            self.papan.baris(r"\text{teorema Pythagoras}", REDUP, b=b)
            b.tunggu_kata("segitiga")
            b.main(ShowCreation(segitiga_i), run_time=0.9)
            self.aktif["segitiga ingat"] = segitiga_i
            b.main(ShowCreation(siku_i), run_time=0.4)
            self.aktif["siku ingat"] = siku_i
            b.tunggu_kata("kuadrat")
            self.add(lc_i)
            b.main(FadeIn(lc_i), run_time=0.5)
            self.tulisan["c ingat"] = lc_i
            self.papan.baris(r"c^2 = a^2 + b^2", TINTA, b=b)
            b.tunggu_kata("dua sisi")
            self.add(la_i, lb_i)
            b.main(FadeIn(la_i), FadeIn(lb_i), run_time=0.6)
            self.tulisan["a ingat"] = la_i
            self.tulisan["b ingat"] = lb_i
            b.tunggu_kata("Biasanya")
            b.main(Indicate(segitiga_i, scale_factor=1, color=SOROT), run_time=1.0)
            b.tunggu_kata("segitiganya belum")
            pergi = Group(segitiga_i, siku_i, la_i, lb_i, lc_i)
            self.papan_baru(b, lama=1.0, bareng=[FadeOut(pergi)])
            self.remove(*pergi)
            for nama in ("segitiga ingat", "siku ingat"):
                self.aktif.pop(nama, None)
            for nama in ("a ingat", "b ingat", "c ingat"):
                self.tulisan.pop(nama, None)
            b.tunggu_kata("dua gerakan")
            b.main(FadeIn(perahu2d), run_time=1.0)
            self.aktif["perahu"] = perahu2d
        self.gerbang()

        # ==============================================================
        # Panah dayung, arus, dan perpindahan sebenarnya
        # ==============================================================
        asal = np.array([0.0, 0.0, Z])

        def bangun_bila_berubah(pembuat, kunci):
            """Pengganti `always_redraw` yang HEMAT: bendanya dibangun ulang hanya
            saat nilai kuncinya (sudut dayung, geseran) berubah, bukan tiap frame.
            Render 1080p60 dengan tiga panah always_redraw mati diam-diam dua kali
            di frame yang sama (11.142, 15 Sep 2026) tanpa pesan galat, sedangkan
            480p15 (empat kali lebih sedikit frame) selesai: sumber daya OpenGL
            habis oleh pembangunan ulang tiap frame."""
            m = pembuat()
            m.kunci_terakhir = kunci()

            def perbarui(mob):
                k = kunci()
                if k != mob.kunci_terakhir:
                    mob.become(pembuat())
                    mob.kunci_terakhir = k
            m.add_updater(perbarui)
            return m

        kunci_panah = lambda: (round(self.th.get_value(), 6), round(self.geser.get_value(), 6))
        p_dayung = bangun_bila_berubah(
            lambda: Arrow(asal, asal + self.v_dayung(), buff=0, thickness=5).set_color(AKSEN2),
            kunci_panah)
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
        p_arus = bangun_bila_berubah(
            lambda: Arrow(self.ujung_dayung(), self.ujung_arus(), buff=0,
                          thickness=5).set_color(AKSEN),
            kunci_panah)

        def taruh_arus(m):
            m.move_to(self.ujung_dayung() + V_ARUS * 0.5 + 0.62 * UP)

        l_arus = teks("arus", 26, AKSEN)
        l_arus.add_updater(taruh_arus)
        p_res = bangun_bila_berubah(
            lambda: Arrow(asal, self.ujung_res(), buff=0, thickness=7).set_color(SOROT),
            kunci_panah)
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
            self.sorot_panah(b, p_dayung)
            b.tunggu_kata("panah merah")
            self.sorot_panah(b, p_arus)
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
            self.sorot_panah(b, p_res)
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
            self.sorot_panah(b, p_dayung, lama=0.7)
            b.tunggu_kata("panah merah")
            self.sorot_panah(b, p_arus, lama=0.7)
            b.tunggu_kata("Keduanya bertemu")
            b.main(self.geser.animate.set_value(0.0), run_time=0.6)
            b.tunggu_kata("tegak lurus")
            self.add(siku)
            b.main(ShowCreation(siku), run_time=0.8)
            self.aktif["siku"] = siku
            b.tunggu_kata("Di sinilah")
            self.sorot_panah(b, p_res)
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
            self.sorot_panah(b, p_res)
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
            b.main(ukur.animate.set_opacity(1), run_time=0.5)
            self.hud_ku["ukur"] = ukur
            self.sorot_panah(b, p_res, lama=0.8)
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
            self.sorot_panah(b, p_res)
            b.tunggu_kata("Di sini")
            self.papan.baris(r"3 + 4 = 7", SOROT, b=b)
        self.gerbang()

        with sinema.babak(self, "lawan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kalau dayung")
            b.main(self.th.animate.set_value(180.0), run_time=3.0)
            b.tunggu_kata("Panah ungunya")
            self.sorot_panah(b, p_res)
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
            self.sorot_panah(b, p_dayung, p_arus)
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
            self.sorot_panah(b, p_dayung, p_arus, p_res, lama=1.2)
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

        # "massa 60 kg ke utara": arahnya ditempelkan pada barisnya sebagai label
        # dua kata plus panah kecil, lalu DICORET merah. Bukan kalimat di layar.
        arah_uji = VGroup(teks("ke utara", 30, AKSEN),
                          Arrow(ORIGIN, UP * 0.55, buff=0, thickness=4).set_color(AKSEN))
        arah_uji.arrange(RIGHT, buff=0.15)
        arah_uji.next_to(isi_s[0], RIGHT, buff=0.28).fix_in_frame()
        coret_uji = Line(arah_uji.get_left() + DOWN * 0.08, arah_uji.get_right() + UP * 0.08)
        coret_uji.set_stroke(AKSEN, 4).fix_in_frame()

        with sinema.babak(self, "uji", DURASI, kata=KATA) as b:
            b.tunggu_kata("Coba tambahkan")
            b.main(Indicate(isi_s[0], color=AKSEN), run_time=0.8)
            b.tunggu_kata("ke utara")
            self.hud_tambah(arah_uji)
            b.main(FadeIn(arah_uji, shift=RIGHT * 0.2), run_time=0.6)
            self.hud_ku["arah uji"] = arah_uji
            b.tunggu_kata("Kalimat itu")
            self.hud_tambah(coret_uji)
            b.main(ShowCreation(coret_uji), run_time=0.5)
            self.hud_ku["coret uji"] = coret_uji
            b.tunggu_kata("bukan vektor")
            b.main(FadeOut(arah_uji), FadeOut(coret_uji), Indicate(judul_s, color=REDUP),
                   run_time=0.8)
            self.remove(arah_uji, coret_uji)
            self.hud_ku.pop("arah uji", None)
            self.hud_ku.pop("coret uji", None)
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

        jebakan = rumus(r"3 + 4 = 7", 44, REDUP).move_to([0, 0.95, 0]).fix_in_frame()
        # "hanya benar kalau keduanya searah": bukan kalimat, melainkan pasangan
        # panah kecil yang searah, berlabel satu kata.
        mini_searah = self.mini_pasangan(0.0, teks("searah", 28, REDUP), s=0.46)
        mini_searah.move_to([0, -0.55, 0]).fix_in_frame()

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
            b.tunggu_kata("hanya benar")
            self.hud_tambah(mini_searah)
            b.main(FadeIn(mini_searah, shift=UP * 0.2), run_time=1.0)
            self.hud_ku["mini searah"] = mini_searah
        self.gerbang()

        # Penutup: satu pasang angka, tiga pasang panah, tiga jawaban.
        tiga_mini = VGroup(
            self.mini_pasangan(0.0, rumus(r"3 + 4 = 7", 34, SOROT)),
            self.mini_pasangan(180.0, rumus(r"4 - 3 = 1", 34, SOROT)),
            self.mini_pasangan(90.0, rumus(r"\sqrt{3^2 + 4^2} = 5", 34, SOROT)),
        )
        for m, x in zip(tiga_mini, (-4.4, 0.0, 4.4)):
            m.move_to([x, 0.2, 0]).fix_in_frame()

        with sinema.babak(self, "tutup1", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jadi begitu")
            b.main(FadeOut(jebakan), FadeOut(mini_searah), run_time=0.8)
            self.remove(jebakan, mini_searah)
            self.hud_ku.clear()
            b.tunggu_kata("angka tidak")
            self.hud_tambah(tiga_mini)
            b.main(LaggedStart(*[FadeIn(m, shift=UP * 0.2) for m in tiga_mini],
                               lag_ratio=0.3), run_time=1.5)
            self.hud_ku["tiga mini"] = tiga_mini
        self.gerbang()

        # Janji materi berikutnya: dua panah yang sama di tempat yang berbeda,
        # lalu salinan yang satu digeser sampai berimpit dengan yang lain.
        judul_lanjut = teks("Pengenalan Vektor, Bagian 2", 30, SOROT)
        judul_lanjut.move_to([0, 1.7, 0]).fix_in_frame()
        pa0, pb0 = np.array([-3.4, -0.9, 0.0]), np.array([0.9, -1.5, 0.0])
        v_sama = np.array([2.2, 1.3, 0.0])
        panah_a = Arrow(pa0, pa0 + v_sama, buff=0, thickness=5).set_color(SOROT).fix_in_frame()
        panah_b = Arrow(pb0, pb0 + v_sama, buff=0, thickness=5).set_color(SOROT).fix_in_frame()
        salinan_a = Arrow(pa0, pa0 + v_sama, buff=0, thickness=5).set_color(AKSEN2).fix_in_frame()

        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di materi")
            b.main(FadeOut(tiga_mini), run_time=0.7)
            self.remove(tiga_mini)
            self.hud_ku.clear()
            b.tunggu_kata("Pengenalan")
            self.hud_tambah(judul_lanjut)
            b.main(FadeIn(judul_lanjut, shift=UP * 0.2), run_time=0.8)
            self.hud_ku["judul lanjut"] = judul_lanjut
            b.tunggu_kata("dua panah")
            self.hud_tambah(panah_a, panah_b)
            b.main(GrowArrow(panah_a), GrowArrow(panah_b), run_time=1.0)
            self.hud_ku["panah a"] = panah_a
            self.hud_ku["panah b"] = panah_b
            b.tunggu_kata("selama panjang")
            self.hud_tambah(salinan_a)
            b.main(salinan_a.animate.shift(pb0 - pa0), run_time=1.6)
            self.hud_ku["salinan a"] = salinan_a
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

    def sorot_panah(self, b, *panah, lama: float = 1.0):
        """Sorot panah dengan pita ungu TEMBUS PANDANG di sepanjang panahnya.

        Bukan `Indicate`: pada panah `always_redraw` Indicate tidak berbekas
        (bendanya dibangun ulang tiap frame), dan pada benda lain ia menutup
        bendanya sesaat (ARYA 11 Sep: "seperti glitch"). Pita dibangun dari
        letak panah SAAT INI, jadi dipanggil hanya ketika panahnya diam.
        """
        pita = VGroup(*[Line(p.get_start(), p.get_end()).set_stroke(SOROT, 18, opacity=0.35)
                        for p in panah])
        self.add(pita)
        b.main(FadeIn(pita), run_time=lama * 0.35)
        b.main(FadeOut(pita), run_time=lama * 0.65)
        self.remove(pita)

    def mini_pasangan(self, sudut_dayung: float, label, s: float = 0.42):
        """Pasangan panah kecil untuk penutup: dayung biru (3 satuan) pada
        `sudut_dayung`, arus merah (4 satuan) dari ujungnya, perpindahan ungu
        dari pangkal ke ujung, labelnya di bawah. Pada 0 dan 180 derajat
        ketiganya segaris, jadi arus dan perpindahan digeser sedikit ke atas
        dan ke bawah supaya ketiganya tetap terbaca."""
        a = sudut_dayung * DEGREES
        v_d = 3 * s * np.array([np.cos(a), np.sin(a), 0.0])
        v_a = 4 * s * RIGHT
        segaris = abs(np.sin(a)) < 1e-6
        geser = 0.11 * UP if segaris else 0 * UP
        p0 = np.zeros(3)
        dayung = Arrow(p0, p0 + v_d, buff=0, thickness=4).set_color(AKSEN2)
        arus = Arrow(p0 + v_d + geser, p0 + v_d + geser + v_a, buff=0, thickness=4).set_color(AKSEN)
        hasil = Arrow(p0 - geser, p0 - geser + v_d + v_a, buff=0, thickness=5).set_color(SOROT)
        gambar = VGroup(dayung, arus, hasil)
        label.next_to(gambar, DOWN, buff=0.32)
        return VGroup(gambar, label)

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
