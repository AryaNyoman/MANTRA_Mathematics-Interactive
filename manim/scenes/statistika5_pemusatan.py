"""Statistika Materi 05, Ukuran Pemusatan dan Penyebaran Bagian 1: mean,
median, modus lewat jungkat-jungkit (ManimGL).
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (2:02)
yang sudah disetujui ARYA. DUNIANYA SAMA: delapan siswa bervolume berdiri
di garis bilangan (4, 5, 6, 7, 7, 8, 8, 11), modus ditandai bentuk (dua
orang berdampingan), median oleh sekat, garis bilangan berubah jadi papan
jungkat-jungkit yang jatuh ke kiri saat tumpuannya di 8 dan mendatar di 7,
jarak kiri dan kanan dijajarkan jadi dua batang sama panjang.

YANG BERBEDA: pembuka sub-bab plus Bagian 1 dengan pertanyaan; rumus hafalan
diperlihatkan redup sebagai pertanyaan; ASAL RUMUS: keseimbangan ditulis
sebagai jumlah simpangan nol, diturunkan jadi 56 - 8 x bar = 0, x bar = 7;
bentuk umum x bar = jumlah x dibagi n lahir di dekat tumpuan; penutup
mengulang ketiga jawaban lewat gambarnya lalu menunjuk Bagian 2; tiap
kejadian dipicu pada KATA (`sinema.JamKata`); sorotan bilah memakai pita
tembus pandang.

PANDANGAN DATAR (temuan ARYA): isi adegan ini MEMBANDINGKAN PANJANG, dan
sudut miring menggambar panjang yang sama jadi tidak sama. Bendanya tetap
3D bercahaya.

Satu warna satu makna: AKSEN2 biru = data, AKSEN bata = mean dan jarak ke
mean, SOROT ungu = median dan sorotan, TINTA = angka dan penanda modus.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "statistika5-pemusatan"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

# --- Data. Sudah lolos dua pemeriksa sebagai `t05-ulangan` di situs.
NILAI = [4, 5, 6, 7, 7, 8, 8, 11]
MEAN = 7.0                      # 56 : 8
MEDIAN = 7.0                    # rata-rata data ke-4 dan ke-5, dua-duanya 7


def xw(nilai):
    """Satu satuan dunia = satu nilai; nilai 7 duduk di x = 0."""
    return nilai - MEAN


TINGGI_TUMPU = 0.55
TEBAL_PAPAN = 0.18
Z_ATAS_PAPAN = TINGGI_TUMPU + TEBAL_PAPAN
TINGGI_ORANG = 1.15
Z_KEPALA = Z_ATAS_PAPAN + TINGGI_ORANG
PAPAN_PUSAT = 0.5
PAPAN_PANJANG = 9.0
PAPAN_DALAM = 0.9
Z_ANGKA = -0.38                 # angka di BAWAH garis, seperti label sumbu
GESER_KEMBAR = 0.17             # dua orang bernilai sama berdiri berdampingan


def geser_x(nilai_list):
    """Nilai kembar digeser ke SAMPING, bukan ke belakang (kamera rata)."""
    hasil, dipakai = [], {}
    banyak = {v: nilai_list.count(v) for v in nilai_list}
    for v in nilai_list:
        k = dipakai.get(v, 0)
        dipakai[v] = k + 1
        hasil.append(0.0 if banyak[v] == 1 else (-GESER_KEMBAR + 2 * GESER_KEMBAR * k))
    return hasil


DX_ORANG = geser_x(NILAI)


def torsi(tumpu):
    """Jumlah simpangan tiap nilai terhadap letak tumpuan. Nol berarti seimbang."""
    return sum(v - tumpu for v in NILAI)


def miring(tumpu):
    """Sudut papan dalam derajat. Putaran positif terhadap UP menurunkan ujung kanan."""
    return float(np.clip(torsi(tumpu), -8.0, 8.0))


def tegak(mob):
    return mob.rotate(90 * DEGREES, RIGHT)


def bilah(panjang, tinggi=0.30, warna=AKSEN):
    r = Rectangle(width=panjang, height=tinggi)
    r.set_fill(warna, opacity=1).set_stroke(LATAR, 1.5)
    return tegak(r)


class Pemusatan5(AdeganMatra):
    samples = 4                 # penghalus tepi; bawaan ManimGL 0

    def sorot_pita(self, b, *mobs, lama=1.0):
        """Pita tembus pandang di atas benda datar (bilah): menyorot tanpa menutup angkanya."""
        pita = VGroup()
        for m in mobs:
            p = Rectangle(width=m.get_width() + 0.16, height=m.get_depth() + 0.16)
            p.set_stroke(width=0).set_fill(SOROT, 0.35)
            pita.add(tegak(p).move_to(m.get_center() + IN * 0.01))
        self.add(pita)
        b.main(FadeIn(pita), run_time=lama * 0.35)
        b.main(FadeOut(pita), run_time=lama * 0.65)
        self.remove(pita)

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self, tanpa_utama=True)

        DUNIA, HUD = {}, {}

        def periksa(pasangan=None):
            hidup_d = {k: v for k, v in DUNIA.items() if v is not None}
            hidup_h = {k: v for k, v in HUD.items() if v is not None}
            if papan.semua() is not None:
                hidup_h["papan temuan"] = papan.semua()
            qc.periksa_adegan(self, {}, pasangan=pasangan, hud=hidup_h,
                              dunia=hidup_d, jaga_jalur_bawah=True)

        # ------------------------------------------------------------------
        # Dunia: garis bilangan, delapan siswa yang bernapas, angka di bawahnya.
        # ------------------------------------------------------------------
        garis = ilustrasi.balok(PAPAN_PANJANG, PAPAN_DALAM, 0.07, REDUP)
        garis.shift(RIGHT * PAPAN_PUSAT)

        angka_lantai = VGroup()
        for v in range(4, 12):
            angka_lantai.add(tegak(rumus(str(v), 26, TINTA)).move_to([xw(v), 0, Z_ANGKA]))

        siswa = Group()
        for i, (v, dx) in enumerate(zip(NILAI, DX_ORANG)):
            o = ilustrasi.orang(TINGGI_ORANG, AKSEN2)
            o.tujuan = np.array([xw(v) + dx, 0.0, 0.07])
            o.shift([-1.3 + 0.34 * i, 2.4, 0.07])
            o.fase = 1.7 * i
            o.z_lalu = 0.0
            siswa.add(o)

        def napas(m):
            z = 0.03 * np.sin(1.6 * self.time + m.fase)
            m.shift(OUT * (z - m.z_lalu))
            m.z_lalu = z

        for o in siswa:
            o.add_updater(napas)

        # ------------------------------------------------------------------
        # buka: judul sub-bab, siswa berdatangan, angka garis bilangan.
        # ------------------------------------------------------------------
        kamera.pasang_awal(frame, theta=-22, phi=74, pusat=(0.4, 0, 1.0), tinggi=6.0)
        self.add(garis)
        DUNIA.update({"garis": garis, "siswa": siswa, "angka": angka_lantai})

        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ukuran")
            sinema.judul_pembuka(self, "Ukuran Pemusatan dan Penyebaran, Bagian 1", lama=3.4, y=2.6)  # irama Bian (14 Sep 2026)
            b.catat(3.4)
            b.tunggu_kata("Delapan")
            HUD["identitas"] = sinema.identitas(self, "8 siswa, nilai 4 sampai 11")
            HUD["identitas"].set_opacity(0)
            b.main(LaggedStartMap(FadeIn, siswa, lag_ratio=0.35), HUD["identitas"].animate.set_opacity(1),
                   run_time=2.4)
            b.tunggu_kata("Nilainya")
            b.main(LaggedStartMap(FadeIn, angka_lantai, lag_ratio=0.25), run_time=1.2)
        periksa()

        # ------------------------------------------------------------------
        # berbaris: SATU gerakan panjang ke pandangan datar, lalu tiap siswa
        # disebut satu per satu pada angkanya.
        # ------------------------------------------------------------------
        with sinema.babak(self, "berbaris", DURASI, kata=KATA) as b:
            b.tunggu_kata("Mari")
            b.main(kamera.sudut(frame, theta=0, phi=85, pusat=(0.4, 0, 1.15), tinggi=6.4),
                   *[o.animate.move_to(o.tujuan + OUT * TINGGI_ORANG / 2) for o in siswa],
                   run_time=3.5)
            for i, (frasa, ke) in enumerate((("empat", 1), ("lima", 1), ("enam", 1), ("tujuh", 1),
                                             ("tujuh", 2), ("delapan", 1), ("delapan", 2), ("sebelas", 1))):
                b.tunggu_kata(frasa, ke=ke)
                b.main(Indicate(siswa[i], scale_factor=1.12, color=SOROT), run_time=0.6)
            b.tunggu_kata("berdampingan")
            b.main(Indicate(Group(siswa[3], siswa[4]), scale_factor=1.1, color=TINTA),
                   Indicate(Group(siswa[5], siswa[6]), scale_factor=1.1, color=TINTA), run_time=1.0)
        periksa()

        # ------------------------------------------------------------------
        # modus: ditandai BENTUK (dua orang berdampingan) dengan kurung di atasnya.
        # ------------------------------------------------------------------
        kurung_modus = VGroup()
        for v in (7, 8):
            k = VMobject()
            k.set_points_as_corners([
                [xw(v) - 0.34, 0, Z_KEPALA + 0.16],
                [xw(v) - 0.34, 0, Z_KEPALA + 0.38],
                [xw(v) + 0.34, 0, Z_KEPALA + 0.38],
                [xw(v) + 0.34, 0, Z_KEPALA + 0.16],
            ])
            k.set_stroke(TINTA, 4)
            kurung_modus.add(k)

        with sinema.babak(self, "modus", DURASI, kata=KATA) as b:
            b.tunggu_kata("barisan")
            b.main(kamera.dekati(frame, [0.4, 0, 1.20], 6.2), run_time=1.4)
            DUNIA["kurung modus"] = kurung_modus
            b.tunggu_kata("Di angka")
            b.main(ShowCreation(kurung_modus[0]), Indicate(siswa[3], scale_factor=1.12, color=TINTA),
                   Indicate(siswa[4], scale_factor=1.12, color=TINTA), run_time=1.0)
            b.tunggu_kata("di delapan")
            b.main(ShowCreation(kurung_modus[1]), Indicate(siswa[5], scale_factor=1.12, color=TINTA),
                   Indicate(siswa[6], scale_factor=1.12, color=TINTA), run_time=1.0)
            b.tunggu_kata("Itulah")
            papan.baris(r"\mathrm{modus} = 7, 8", TINTA, b=b)
        periksa()

        # ------------------------------------------------------------------
        # median: sekat berdiri di antara siswa ke-4 dan ke-5 (dua-duanya 7).
        # ------------------------------------------------------------------
        sekat = ilustrasi.balok(0.09, 0.5, 2.4, SOROT).shift([xw(MEDIAN), 0, 0])
        with sinema.babak(self, "median", DURASI, kata=KATA) as b:
            b.tunggu_kata("belah")
            b.main(FadeOut(kurung_modus), run_time=0.5)
            DUNIA["kurung modus"] = None
            sekat.set_opacity(0)
            self.add(sekat)
            DUNIA["sekat"] = sekat
            b.main(sekat.animate.set_opacity(1), run_time=0.9)
            b.tunggu_kata("Empat di")
            b.main(LaggedStart(*[Indicate(siswa[i], scale_factor=1.1, color=SOROT)
                                 for i in (0, 1, 2, 3)], lag_ratio=0.3), run_time=1.0)
            b.tunggu_kata("empat di", ke=2)
            b.main(LaggedStart(*[Indicate(siswa[i], scale_factor=1.1, color=SOROT)
                                 for i in (4, 5, 6, 7)], lag_ratio=0.3), run_time=1.0)
            b.tunggu_kata("Sekatnya")
            b.main(Indicate(sekat, scale_factor=1.05, color=SOROT), run_time=0.8)
            b.tunggu_kata("itulah")
            papan.baris(r"\mathrm{median} = 7", SOROT, b=b)
        periksa()

        # ------------------------------------------------------------------
        # tanya: rumus hafalan tampil redup sebagai PERTANYAAN, bukan jawaban.
        # ------------------------------------------------------------------
        hafal = rumus(r"\bar{x} = \frac{56}{8} = 7\ ?", 34, REDUP).move_to([0.0, 2.55, 0]).fix_in_frame()
        with sinema.babak(self, "tanya", DURASI, kata=KATA) as b:
            b.tunggu_kata("rata-rata")
            b.main(FadeOut(sekat), run_time=0.8)
            DUNIA["sekat"] = None
            b.tunggu_kata("jumlah")
            self.hud_tambah(hafal)
            HUD["hafalan"] = hafal
            b.main(FadeIn(hafal, shift=0.2 * DOWN), run_time=0.8)
            b.tunggu_kata("angka apa")
            b.main(Indicate(hafal, scale_factor=1.1, color=SOROT), run_time=1.0)
        periksa()

        # ------------------------------------------------------------------
        # papan: garis bilangan BERUBAH jadi papan, tumpuan tumbuh di angka 8.
        # ------------------------------------------------------------------
        tumpu = 8.0
        papan_tebal = ilustrasi.balok(PAPAN_PANJANG, PAPAN_DALAM, TEBAL_PAPAN, AKSEN)
        papan_tebal.shift([PAPAN_PUSAT, 0, TINGGI_TUMPU])
        penopang = ilustrasi.penopang(0.7, TINGGI_TUMPU, 0.85).shift([xw(tumpu), 0, 0])

        with sinema.babak(self, "papan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kita ubah")
            b.main(FadeOut(hafal), run_time=0.4)
            HUD["hafalan"] = None
            self.remove(hafal)
            b.tunggu_kata("papan")
            b.main(Transform(garis, papan_tebal),
                   siswa.animate.shift(OUT * Z_ATAS_PAPAN), run_time=2.0)
            b.tunggu_kata("Tumpuannya")
            DUNIA["penopang"] = penopang
            b.main(GrowFromCenter(penopang), run_time=1.2)
            b.tunggu_kata("delapan")
            b.main(Indicate(angka_lantai[4], scale_factor=1.4, color=AKSEN), run_time=0.7)
        periksa()

        # ------------------------------------------------------------------
        # miring: papan jatuh ke kiri. Sudut dicatat sendiri supaya tiap putaran
        # berikutnya cuma SELISIHnya; kalau tidak, putaran bertumpuk.
        # ------------------------------------------------------------------
        papan_grup = Group(garis, *siswa)
        sudut_kini = [0.0]

        def ke_sudut(derajat, poros_nilai):
            selisih = (derajat - sudut_kini[0]) * DEGREES
            sudut_kini[0] = derajat
            return Rotate(papan_grup, selisih, axis=UP,
                          about_point=np.array([xw(poros_nilai), 0.0, TINGGI_TUMPU]))

        with sinema.babak(self, "miring", DURASI, kata=KATA) as b:
            b.tunggu_kata("jatuh")
            b.main(ke_sudut(miring(tumpu), tumpu), run_time=2.0)
            b.tunggu_kata("orang di")
            b.main(LaggedStart(*[Indicate(siswa[i], scale_factor=1.1, color=AKSEN)
                                 for i in (0, 1, 2)], lag_ratio=0.3), run_time=1.2)
            b.tunggu_kata("yang di")
            b.main(Indicate(siswa[7], scale_factor=1.1, color=AKSEN), run_time=0.8)
        periksa()

        # ------------------------------------------------------------------
        # geser: tumpuan digeser sampai papan mendatar, tiap singgahan pada katanya.
        # ------------------------------------------------------------------
        with sinema.babak(self, "geser", DURASI, kata=KATA) as b:
            b.tunggu_kata("Delapan")
            b.main(Indicate(penopang, scale_factor=1.08, color=AKSEN), run_time=0.7)
            for frasa, singgah, lama in (("tujuh koma lima", 7.5, 1.2), ("tujuh koma dua", 7.2, 1.1),
                                         ("berhenti", MEAN, 1.6)):
                b.tunggu_kata(frasa)
                b.main(penopang.animate.move_to([xw(singgah), 0, TINGGI_TUMPU / 2]),
                       ke_sudut(miring(singgah), singgah), run_time=lama)
            b.tunggu_kata("mendatar")
            b.main(Indicate(garis, scale_factor=1.0, color=AKSEN), run_time=0.8)
        periksa()

        # ------------------------------------------------------------------
        # bukti: ketiga jarak kiri dijajarkan jadi SATU batang, ketiga jarak
        # kanan jadi batang kedua, berpangkal sama.
        # ------------------------------------------------------------------
        Z_BILAH = (1.95, 2.28, 2.61)
        Z_KIRI, Z_KANAN, X_PANGKAL = 2.62, 2.10, -2.5

        def bilah_bernomor(panjang, pusat_x, z):
            g = bilah(panjang).move_to([pusat_x, 0, z])
            n = tegak(rumus(str(int(panjang)), 22, LATAR)).move_to([pusat_x, -0.02, z])
            return VGroup(g, n)

        kiri_nilai = [v for v in NILAI if v < MEAN]          # 4, 5, 6  -> 3, 2, 1
        kanan_nilai = [v for v in NILAI if v > MEAN]         # 8, 8, 11 -> 1, 1, 4

        bilah_kiri, bilah_kanan = VGroup(), VGroup()
        for i, v in enumerate(kiri_nilai):
            bilah_kiri.add(bilah_bernomor(MEAN - v, xw(v) / 2, Z_BILAH[i]))
        for i, v in enumerate(kanan_nilai):
            bilah_kanan.add(bilah_bernomor(v - MEAN, xw(v) / 2, Z_BILAH[i]))

        sasaran_kiri, sasaran_kanan = [], []
        jalan = X_PANGKAL
        for v in kiri_nilai:
            p = MEAN - v
            sasaran_kiri.append(np.array([jalan + p / 2, 0.0, Z_KIRI]))
            jalan += p
        jalan = X_PANGKAL
        for v in kanan_nilai:
            p = v - MEAN
            sasaran_kanan.append(np.array([jalan + p / 2, 0.0, Z_KANAN]))
            jalan += p

        nama_kiri = tegak(teks("kiri", 22, AKSEN)).move_to([X_PANGKAL - 0.7, 0, Z_KIRI])
        nama_kanan = tegak(teks("kanan", 22, AKSEN)).move_to([X_PANGKAL - 0.8, 0, Z_KANAN])

        with sinema.babak(self, "bukti", DURASI, kata=KATA) as b:
            b.tunggu_kata("ketiga jarak")
            DUNIA["bilah kiri"] = bilah_kiri
            b.main(LaggedStartMap(FadeIn, bilah_kiri, lag_ratio=0.25), run_time=1.0)
            b.tunggu_kata("jajarkan")
            b.main(*[g.animate.move_to(p) for g, p in zip(bilah_kiri, sasaran_kiri)], run_time=1.4)
            DUNIA["nama kiri"] = nama_kiri
            b.main(FadeIn(nama_kiri), run_time=0.4)
            b.tunggu_kata("ketiga jarak", ke=2)
            DUNIA["bilah kanan"] = bilah_kanan
            b.main(LaggedStartMap(FadeIn, bilah_kanan, lag_ratio=0.25), run_time=1.0)
            b.tunggu_kata("batang kedua")
            b.main(*[g.animate.move_to(p) for g, p in zip(bilah_kanan, sasaran_kanan)], run_time=1.0)
            DUNIA["nama kanan"] = nama_kanan
            b.main(FadeIn(nama_kanan), run_time=0.3)
            b.tunggu_kata("Tiga tambah")
            self.sorot_pita(b, *[g[0] for g in bilah_kiri], lama=1.4)
            b.tunggu_kata("lawan")
            self.sorot_pita(b, *[g[0] for g in bilah_kanan], lama=1.4)
            b.tunggu_kata("sama panjang")
            self.sorot_pita(b, *[g[0] for g in bilah_kiri], *[g[0] for g in bilah_kanan], lama=1.6)
            b.tunggu_kata("seimbang")
            b.main(Indicate(penopang, scale_factor=1.08, color=AKSEN), run_time=0.8)
        periksa()

        # ------------------------------------------------------------------
        # asal: keseimbangan ditulis sebagai persamaan; simpangan tiap orang.
        # ------------------------------------------------------------------
        # Di samping tumpuan, bukan di bawah angka: di bawah angka ia masuk
        # jalur subtitle (qc menolak, 12 Sep).
        lab_xbar = tegak(rumus(r"\bar{x}", 30, AKSEN)).move_to([xw(MEAN) + 0.72, 0, 0.27])
        simpangan = VGroup()
        for i, (v, dx) in enumerate(zip(NILAI, DX_ORANG)):
            s = v - MEAN
            isi = "0" if s == 0 else (f"{int(s):+d}")
            warna = REDUP if s == 0 else AKSEN
            simpangan.add(tegak(rumus(isi, 22, warna)).move_to([xw(v) + dx, 0, Z_KEPALA + 0.30]))
        with sinema.babak(self, "asal", DURASI, kata=KATA) as b:
            b.tunggu_kata("persamaan")
            b.main(FadeOut(bilah_kiri), FadeOut(bilah_kanan), FadeOut(nama_kiri), FadeOut(nama_kanan),
                   FadeOut(papan.semua()), run_time=0.6)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, tanpa_utama=True)
            DUNIA["bilah kiri"] = DUNIA["bilah kanan"] = None
            DUNIA["nama kiri"] = DUNIA["nama kanan"] = None
            b.tunggu_kata("Sebut")
            DUNIA["x bar"] = lab_xbar
            b.main(FadeIn(lab_xbar, shift=0.2 * OUT), run_time=0.7)
            b.tunggu_kata("Jarak tiap")
            DUNIA["simpangan"] = simpangan
            b.main(LaggedStartMap(FadeIn, simpangan, lag_ratio=0.15), run_time=1.4)
            b.tunggu_kata("negatif")
            b.main(Indicate(VGroup(*simpangan[:3]), scale_factor=1.3, color=SOROT), run_time=0.9)
            b.tunggu_kata("positif")
            b.main(Indicate(VGroup(*simpangan[5:]), scale_factor=1.3, color=SOROT), run_time=0.9)
            b.tunggu_kata("jumlah semuanya")
            papan.baris(r"(4 - \bar{x}) + (5 - \bar{x}) + \cdots + (11 - \bar{x}) = 0", AKSEN, b=b)
        periksa()

        # ------------------------------------------------------------------
        # rumus: BARU sekarang rumusnya, diturunkan dari keseimbangan.
        # ------------------------------------------------------------------
        with sinema.babak(self, "rumus", DURASI, kata=KATA) as b:
            b.tunggu_kata("dijumlahkan")
            b.main(LaggedStart(*[Indicate(a, scale_factor=1.3, color=SOROT) for a in angka_lantai],
                               lag_ratio=0.1), run_time=1.2)
            b.tunggu_kata("muncul")
            b.main(Indicate(lab_xbar, scale_factor=1.3, color=SOROT), run_time=0.8)
            b.tunggu_kata("Lima puluh", ke=2)
            papan.baris(r"56 - 8\bar{x} = 0", AKSEN, b=b)
            b.tunggu_kata("jadi", ke=2)
            baris_mean = papan.baris(r"\bar{x} = 56 : 8 = 7", AKSEN, b=b)
            b.tunggu_kata("Barulah")
            b.main(Indicate(baris_mean, scale_factor=1.0, color=SOROT), run_time=0.9)
            b.tunggu_kata("titik seimbangnya")
            b.main(Indicate(penopang, scale_factor=1.08, color=AKSEN), run_time=0.9)
        periksa()

        # ------------------------------------------------------------------
        # umum: bentuk umum lahir di dekat tumpuan, lalu duduk di panel baru.
        # ------------------------------------------------------------------
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bentuk")
            b.main(FadeOut(papan.semua()), FadeOut(simpangan), run_time=0.5)
            self.remove(*papan.semua())
            DUNIA["simpangan"] = None
            papan = sinema.PapanRumus(self, tanpa_utama=True)
            b.tunggu_kata("jumlah seluruh")
            sinema.lahir_rumus(self, r"\bar{x} = \frac{\sum x}{n}", dekat=penopang, papan=papan, b=b,
                               warna=AKSEN, ukuran_lahir=52, tahan=0.6, run_time=1.1,
                               sebagai_utama=False, geser=UP * 1.6)
            b.tunggu_kata("simpangan")
            papan.baris(r"\sum (x - \bar{x}) = 0", AKSEN, b=b)
        periksa()

        # ------------------------------------------------------------------
        # tutup: ketiga jawaban diulang lewat gambarnya.
        # ------------------------------------------------------------------
        sekat2 = ilustrasi.balok(0.09, 0.5, 2.4, SOROT).shift([xw(MEDIAN), 0, Z_ATAS_PAPAN])
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("tujuh")
            b.main(Indicate(angka_lantai[3], scale_factor=1.4, color=SOROT), run_time=0.8)
            b.tunggu_kata("Modus")
            b.main(Indicate(Group(siswa[3], siswa[4]), scale_factor=1.1, color=TINTA),
                   Indicate(Group(siswa[5], siswa[6]), scale_factor=1.1, color=TINTA), run_time=1.0)
            b.tunggu_kata("median")
            sekat2.set_opacity(0)
            self.add(sekat2)
            DUNIA["sekat"] = sekat2
            b.main(sekat2.animate.set_opacity(1), run_time=0.7)
            b.tunggu_kata("rata-rata")
            b.main(sekat2.animate.set_opacity(0), Indicate(penopang, scale_factor=1.08, color=AKSEN),
                   run_time=0.9)
            self.remove(sekat2)
            DUNIA["sekat"] = None
        periksa()

        # ------------------------------------------------------------------
        # lanjut: satu nilai jauh sendiri naik ke papan, papannya berlari.
        # ------------------------------------------------------------------
        judul_lanjut = teks("Ukuran Pemusatan dan Penyebaran, Bagian 2", 30, SOROT)
        judul_lanjut.move_to([0, 2.6, 0]).fix_in_frame()
        pendatang = ilustrasi.orang(TINGGI_ORANG, AKSEN)
        pendatang.move_to(np.array([xw(12) - 0.2, 0.0, Z_ATAS_PAPAN + TINGGI_ORANG / 2]))
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ukuran")
            b.main(FadeOut(papan.semua()), FadeOut(lab_xbar), run_time=0.5)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, tanpa_utama=True)
            DUNIA["x bar"] = None
            self.hud_tambah(judul_lanjut)
            HUD["judul lanjut"] = judul_lanjut
            b.main(FadeIn(judul_lanjut, shift=0.2 * UP), run_time=0.7)
            b.tunggu_kata("satu nilai")
            DUNIA["pendatang"] = pendatang
            b.main(FadeIn(pendatang, shift=0.3 * IN), run_time=0.9)
            papan_grup.add(pendatang)
            b.tunggu_kata("berlari")
            b.main(ke_sudut(6.0, MEAN), run_time=1.2)
        periksa()

        sinema.laporkan_pemicu(self)
