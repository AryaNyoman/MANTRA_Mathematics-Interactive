"""Materi 05 Statistika: mean, median, modus lewat jungkat-jungkit (ManimGL).

Storyboard: docs/superpowers/specs/2026-09-02-statistika-video-5-storyboard.md
Naskah    : manim/narasi/statistika5-pemusatan.json (11 segmen, 122 detik)

Yang dibuktikan gambar, bukan diberitahu: rata-rata adalah titik tempat data
seimbang. Rumus mean sengaja ditahan sampai babak kesepuluh, setelah papannya
mendatar sendiri di angka 7.

PANDANGAN DATAR, temuan ARYA: kalau isi sebuah adegan adalah MEMBANDINGKAN
PANJANG, sudut miring menggambar panjang yang sama jadi tidak sama, dan itu
membantah pelajarannya sendiri. Bendanya tetap 3D bercahaya.

TATA LETAK, keputusan ARYA 2 Sep 2026 malam:
- Tidak ada keterangan di bawah layar. Jalur itu milik subtitle, dan menulis
  ulang kalimat di sana berarti dua kalimat berbeda untuk satu maksud sama.
- Kanan atas: PAPAN TEMUAN. Tiap jawaban yang sudah didapat ditumpuk di sana
  dalam bentuk matematika, bukan kalimat. Materi ini bukan satu rantai rumus
  seperti Materi 08, melainkan tiga jawaban untuk satu pertanyaan, jadi
  papannya MENUMPUK, bukan membungkus.
- Kanan atas: papan temuan (zona rumus standar v2). Kiri atas: identitas benda.
- Seluruh panel diperiksa SILANG terhadap seluruh benda dunia oleh qc, lewat
  kamus DUNIA dan HUD yang dipelihara sepanjang adegan. Daftar pasangan yang
  ditulis tangan selalu punya lubang; perkalian silang tidak.

Satu warna satu makna: AKSEN2 biru = data, AKSEN bata = mean dan jarak ke mean,
SOROT ungu = median, TINTA = angka dan penanda modus. Modus ditandai BENTUK,
yaitu dua orang berdiri berdampingan di satu angka.
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
    """Nilai kembar digeser ke SAMPING, bukan ke belakang.

    Dijajarkan ke belakang hanya terbaca saat kamera miring, dan kamera harus
    rata supaya jarak antar nilai terbaca jujur. Geseran 0,17 satuan jauh lebih
    kecil daripada satu satuan nilai, jadi keduanya tetap terbaca berdiri di
    angka yang sama.
    """
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

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)

        # Kamus ini dipelihara sepanjang adegan dan diserahkan UTUH ke qc tiap
        # babak. Menyerahkan sebagian daftar adalah sumber semua tabrakan yang
        # lolos sejauh ini.
        DUNIA, HUD = {}, {}
        HUD["identitas"] = sinema.identitas(self, "8 siswa, nilai 4 sampai 11")

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
        # Babak 1: pandangan dunia, miring dan dekat.
        # ------------------------------------------------------------------
        kamera.pasang_awal(frame, theta=-22, phi=74, pusat=(0.4, 0, 1.0), tinggi=6.0)
        self.add(garis)
        DUNIA.update({"garis": garis, "siswa": siswa, "angka": angka_lantai})

        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 05: Mean, median, modus", lama=3.4, y=2.6)
            b.catat(3.4)
            b.main(LaggedStartMap(FadeIn, siswa, lag_ratio=0.35), run_time=3.0)
            b.main(LaggedStartMap(FadeIn, angka_lantai, lag_ratio=0.25), run_time=1.8)
            b.jeda(1.6)
        periksa()

        # ------------------------------------------------------------------
        # Babak 2: SATU gerakan panjang ke pandangan datar, tempat jarak antar
        # nilai terbaca jujur. Sesudah ini kamera hampir tidak berpindah lagi.
        # ------------------------------------------------------------------
        with sinema.babak(self, "berbaris", DURASI) as b:
            b.main(kamera.sudut(frame, theta=0, phi=85, pusat=(0.4, 0, 1.15), tinggi=6.4),
                   *[o.animate.move_to(o.tujuan + OUT * TINGGI_ORANG / 2) for o in siswa],
                   run_time=5.4)
            b.jeda(1.6)
        periksa()

        # ------------------------------------------------------------------
        # Babak 3: modus, ditandai BENTUK (dua orang berdampingan), bukan warna.
        # Temuannya ditulis di papan kiri atas sebagai pernyataan matematika.
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

        with sinema.babak(self, "modus", DURASI) as b:
            b.main(kamera.dekati(frame, [0.4, 0, 1.20], 6.2), run_time=2.2)
            DUNIA["kurung modus"] = kurung_modus
            b.main(ShowCreation(kurung_modus), run_time=1.4)
            papan.baris(r"\mathrm{modus} = 7, 8", TINTA)
            b.catat(0.8)
            b.main(Indicate(siswa[3], scale_factor=1.12, color=TINTA),
                   Indicate(siswa[4], scale_factor=1.12, color=TINTA), run_time=1.2)
            b.main(Indicate(siswa[5], scale_factor=1.12, color=TINTA),
                   Indicate(siswa[6], scale_factor=1.12, color=TINTA), run_time=1.2)
            b.jeda(1.6)
        periksa()

        # ------------------------------------------------------------------
        # Babak 4: median. Sekat berdiri di antara siswa ke-4 dan ke-5, yang
        # dua-duanya bernilai 7, jadi sekatnya jatuh tepat di angka 7.
        # ------------------------------------------------------------------
        sekat = ilustrasi.balok(0.09, 0.5, 2.4, SOROT).shift([xw(MEDIAN), 0, 0])
        with sinema.babak(self, "median", DURASI) as b:
            b.main(FadeOut(kurung_modus), run_time=0.8)
            DUNIA["kurung modus"] = None
            sekat.set_opacity(0)
            self.add(sekat)
            DUNIA["sekat"] = sekat
            b.main(sekat.animate.set_opacity(1), run_time=1.2)
            b.main(LaggedStart(*[Indicate(siswa[i], scale_factor=1.1, color=SOROT)
                                 for i in (0, 1, 2, 3)], lag_ratio=0.3), run_time=1.6)
            b.main(LaggedStart(*[Indicate(siswa[i], scale_factor=1.1, color=SOROT)
                                 for i in (4, 5, 6, 7)], lag_ratio=0.3), run_time=1.6)
            papan.baris(r"\mathrm{median} = 7", SOROT)
            b.catat(0.8)
            b.jeda(1.6)
        periksa()

        # ------------------------------------------------------------------
        # Babak 5: pertanyaan, lalu diam sejenak. Dunia tetap hidup karena napas.
        # ------------------------------------------------------------------
        with sinema.babak(self, "tanya", DURASI) as b:
            b.main(FadeOut(sekat), run_time=1.0)
            DUNIA["sekat"] = None
            b.main(kamera.dekati(frame, [0.4, 0, 1.25], 6.2), run_time=5.2)
            b.jeda(1.6)
        periksa()

        # ------------------------------------------------------------------
        # Babak 6: garis bilangan BERUBAH jadi papan, tumpuan tumbuh di angka 8.
        # ------------------------------------------------------------------
        tumpu = 8.0
        papan_tebal = ilustrasi.balok(PAPAN_PANJANG, PAPAN_DALAM, TEBAL_PAPAN, AKSEN)
        papan_tebal.shift([PAPAN_PUSAT, 0, TINGGI_TUMPU])
        penopang = ilustrasi.penopang(0.7, TINGGI_TUMPU, 0.85).shift([xw(tumpu), 0, 0])

        with sinema.babak(self, "papan", DURASI) as b:
            b.main(Transform(garis, papan_tebal),
                   siswa.animate.shift(OUT * Z_ATAS_PAPAN), run_time=2.8)
            DUNIA["penopang"] = penopang
            b.main(GrowFromCenter(penopang), run_time=1.6)
            b.jeda(1.6)
        periksa()

        # ------------------------------------------------------------------
        # Babak 7: papan jatuh ke kiri. Sudut dicatat sendiri supaya tiap putaran
        # berikutnya cuma SELISIHnya; kalau tidak, putaran bertumpuk.
        # ------------------------------------------------------------------
        papan_grup = Group(garis, *siswa)
        sudut_kini = [0.0]

        def ke_sudut(derajat, poros_nilai):
            selisih = (derajat - sudut_kini[0]) * DEGREES
            sudut_kini[0] = derajat
            return Rotate(papan_grup, selisih, axis=UP,
                          about_point=np.array([xw(poros_nilai), 0.0, TINGGI_TUMPU]))

        with sinema.babak(self, "miring", DURASI) as b:
            b.main(ke_sudut(miring(tumpu), tumpu), run_time=3.6)
            b.jeda(1.6)
        periksa()

        # ------------------------------------------------------------------
        # Babak 8: tumpuan digeser sampai papan mendatar, angkanya hidup.
        # ------------------------------------------------------------------
        with sinema.babak(self, "geser", DURASI) as b:
            for singgah in (7.5, 7.2, MEAN):
                b.main(penopang.animate.move_to([xw(singgah), 0, TINGGI_TUMPU / 2]),
                       ke_sudut(miring(singgah), singgah), run_time=3.0)
            b.jeda(1.6)
        periksa()

        # ------------------------------------------------------------------
        # Babak 9: bukti. Ketiga jarak kiri dijajarkan jadi SATU batang, ketiga
        # jarak kanan jadi batang kedua, berpangkal sama. Sama panjang atau tidak
        # bisa dilihat sekejap, tanpa membandingkan angka satu per satu.
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

        with sinema.babak(self, "bukti", DURASI) as b:
            DUNIA.update({"bilah kiri": bilah_kiri, "bilah kanan": bilah_kanan})
            b.main(LaggedStartMap(FadeIn, bilah_kiri, lag_ratio=0.25), run_time=1.6)
            b.main(LaggedStartMap(FadeIn, bilah_kanan, lag_ratio=0.25), run_time=1.6)
            b.main(*[g.animate.move_to(p) for g, p in zip(bilah_kiri, sasaran_kiri)],
                   *[g.animate.move_to(p) for g, p in zip(bilah_kanan, sasaran_kanan)],
                   run_time=2.6)
            DUNIA.update({"nama kiri": nama_kiri, "nama kanan": nama_kanan})
            b.main(FadeIn(nama_kiri), FadeIn(nama_kanan), run_time=0.8)
            papan.baris(r"\sum (x - \bar{x}) = 0", AKSEN)
            b.catat(0.8)
            b.jeda(1.6)
        periksa()

        # ------------------------------------------------------------------
        # Babak 10: BARU sekarang rumusnya, sesudah gambarnya membuktikan artinya.
        # ------------------------------------------------------------------
        with sinema.babak(self, "rumus", DURASI) as b:
            b.main(FadeOut(bilah_kiri), FadeOut(bilah_kanan),
                   FadeOut(nama_kiri), FadeOut(nama_kanan), run_time=1.4)
            DUNIA["bilah kiri"] = DUNIA["bilah kanan"] = None
            DUNIA["nama kiri"] = DUNIA["nama kanan"] = None
            baris_mean = papan.baris(r"\bar{x} = \frac{56}{8} = 7", AKSEN)
            b.catat(0.8)
            b.main(Indicate(baris_mean, scale_factor=1.12, color=SOROT), run_time=2.6)
            b.jeda(1.6)
        periksa()

        # ------------------------------------------------------------------
        # Babak 11: penutup. Papan tetap seimbang, siswa terus bernapas.
        # ------------------------------------------------------------------
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(kamera.putar_pelan(frame, derajat=6), run_time=5.4)
            b.jeda(1.6)
        periksa()
