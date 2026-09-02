"""Grafik Fungsi Tahap 06, Geser, cermin, regang. Versi ManimGL (2 Sep 2026).

DUA DIMENSI, BUKAN TIGA. Keputusan ARYA 2 September malam:
"kalau grafiknya tidak menunjukkan tanda-tanda 3 dimensi, ya jangan dipaksakan
untuk seolah-olah dia berada di 3 dimensi. Gunakan 3 dimensi jika memang
dibutuhkan, bukan dipaksakan harus semua mengandung scene 3 dimensi."

Versi sebelumnya membungkus seluruh video di panggung 3D: lembah bercahaya,
bola menggelinding tanpa henti, kamera terbang. Grafik fungsi itu materi dua
dimensi, jadi panggung itu dipaksakan, dan bolanya yang bolak-balik terus
justru mencuri perhatian dari yang sedang dijelaskan.

Sekarang benda nyatanya cuma PEMBUKA delapan detik: bola menggelinding SATU
kali di lembah berbentuk x kuadrat, untuk menunjukkan bentuk itu ada di dunia
nyata. Sesudah itu lembah dan bolanya pergi, dan sisa video sepenuhnya bidang
datar: dua sumbu, titik, kurva, dan panel rumus.

STORYBOARD

  1. Judul saja di layar bersih.
  2. Benda nyata, delapan detik: bola menggelinding sekali di dasar lembah.
  3. Lembahnya pergi, tinggal bidang datar dengan dua sumbu.
  4. Lima nilai f(x) dihitung di layar, titiknya diplot, kurvanya baru
     ditarik melewatinya. Kurva tidak pernah muncul begitu saja.
  5. f(x) + 1: seluruh kurva naik satu satuan, titiknya ikut.
  6. f(x - 1) ditulis, lalu DIAM. Penonton menebak arahnya.
  7. Jawabannya ke kanan, walaupun tandanya minus.
  8. Alasannya: isi kurung nol saat x = 1.
  9. Bentuknya BERUBAH jadi akar x, perlakuan yang sama dikenakan lagi.
 10. Berubah sekali lagi jadi gelombang sinus.
 11. f(2x) ditulis, lalu DIAM lagi. Ini jebakan utamanya.
 12. Jawabannya setengah. Nilai yang tadi di x = 2 kini sampai di x = 1.
 13. Alasannya: x sudah dikalikan dua SEBELUM masuk mesin.
 14. Penutup: dua kalimat aturannya.

TIGA ATURAN ARYA YANG MENGATUR TULISAN DI LAYAR (2 September malam)

  1. RUMUS BARU LAHIR DI TEMPAT MATA MENATAP, LALU TERBANG KE PANEL.
     Rumus yang langsung terbit di pojok kiri atas tidak pernah terlihat,
     karena mata sedang di grafik tengah layar. Ia dibuat besar di tengah
     dulu, baru mengecil dan berpindah ke panel. Mata mengikuti gerak yang
     menyambung; ia tidak mengikuti benda yang tiba-tiba ada. Lihat
     `rumus_terbang`.

  2. JANGAN MENULIS APA YANG SUDAH DIUCAPKAN. Subtitle sudah menampilkan
     seluruh narasi. Pita kalimat di dasar layar DIHAPUS: ia mengulang suara,
     memecah fokus, dan berebut tempat dengan subtitle.

  3. TULISAN DI DALAM GAMBAR = LABEL, MAKSIMAL DUA KATA, MENEMPEL DI BENDANYA.
     Dijaga oleh `self.label`, yang menggagalkan render kalau lebih. Bukan
     kalimat, cukup penunjuk supaya mata tahu benda mana yang dibicarakan.

SATU WARNA SATU MAKNA (aturan 5 STANDAR-ILUSTRASI-VIDEO)
  AKSEN  merah  = yang ditulis DI LUAR kurung
  AKSEN2 biru   = yang ditulis DI DALAM kurung
  SOROT  ungu   = kesimpulan dan penanda
  REDUP  abu    = bekas bentuk sebelumnya, sumbu
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "grafik6-transformasi"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

# --- Tata ruang ---
# x mendatar, z tegak. y cuma kedalaman: dipakai pembuka 3D delapan detik, dan
# sesudah itu semua benda tinggal di satu lapisan y = Y_KURVA.
X_MIN, X_MAX = -3.4, 4.8
Y_LEMBAH = 1.5
Y_KURVA = -1.72
Z_BAWAH = -0.20         # ujung bawah sumbu y, dangkal supaya jauh dari subtitle
Z_ATAS = 5.2            # ujung atas sumbu y, setinggi puncak tertinggi

SUDUT_DUNIA = dict(theta=-42, phi=66, pusat=(0.4, 0.0, 1.7), tinggi=9.2)
# Pandangan datar. Dunianya sengaja tidak memenuhi layar: pita paling bawah
# DIKOSONGKAN untuk subtitle yang digambar peramban di atas video. Angkanya
# dipilih dari ukuran lembar kontak, bukan kira-kira.
SUDUT_GRAFIK = dict(theta=0, phi=90, pusat=(0.7, 0.0, 2.35), tinggi=9.6)

RESOLUSI = (48, 10)

# Lima nilai yang dihitung di depan penonton sebelum kurvanya ditarik.
# Simetris di sekitar nol supaya bentuk parabolanya keluar dari angkanya
# sendiri, bukan dari kepercayaan penonton kepada narator.
NILAI_HITUNG = [(-2, 4), (-1, 1), (0, 0), (1, 1), (2, 4)]


def f_parabola(x):
    return x * x


def f_akar(x):
    return 2.0 * np.sqrt(np.clip(x, 0.0, None))


def f_sinus(x):
    return 1.6 * np.sin(x) + 1.6


DASAR = {
    "parabola": dict(f=f_parabola, rumus=r"f(x) = x^{2}", dari=-2.05, sampai=2.05),
    "akar": dict(f=f_akar, rumus=r"f(x) = 2\sqrt{x}", dari=0.0, sampai=4.3),
    "sinus": dict(f=f_sinus, rumus=r"f(x) = 1{,}6\sin x + 1{,}6", dari=-3.2, sampai=4.4),
}


def tegak(mob):
    """Putar teks supaya terbaca dari pandangan samping (bidang xz)."""
    return mob.rotate(PI / 2, RIGHT)


def penanda(pos, warna, r=0.10):
    """Titik penanda di ruang. Bola kecil, BUKAN `Dot`.

    `Dot` ManimGL adalah cakram datar di bidang xy, jadi dari pandangan samping
    ia menipis jadi garis dan praktis hilang. `Dot3D` adalah nama Manim
    Community dan TIDAK ADA di ManimGL; render pertama versi ini gagal
    karenanya, dan `cek_kode.py` tidak menangkapnya sebab ia memeriksa LaTeX
    dan pola tulisan, bukan nama fungsi yang ada.
    """
    b = Sphere(radius=r).set_color(warna)
    b.set_shading(0.4, 0.3, 0.5)
    return b.move_to(pos)


class GeserCerminRegang(AdeganMatra):

    # ==================================================================
    def construct(self):
        self.frame_ = self.frame
        self.ikutan = []
        self.pnl = None

        self.b01_sapa()
        self.b02_lembah()
        self.b03_datar()
        self.b04_titik()
        self.b05_geseratas()
        self.b06_tanya()
        self.b07_jawab()
        self.b08_kenapa()
        self.b09_akar()
        self.b10_sinus()
        self.b11_mampat()
        self.b12_setengah()
        self.b13_kenapamampat()
        self.b14_tutup()

    # ------------------------------------------------------------------
    # Alat bantu
    # ------------------------------------------------------------------
    def buat_sumbu(self):
        """DUA sumbu, x dan y, lengkap dengan angka dan hurufnya.

        Sumbu y sempat tidak ada sama sekali, dan ARYA yang menemukannya:
        "grafik fungsi wajib banget menampilkan 2 sumbu x dan y". Tanpa sumbu
        tegak, kalimat "naik satu satuan" tidak punya alat ukur di layar.
        """
        gx = Line([X_MIN, Y_KURVA, 0], [X_MAX, Y_KURVA, 0])
        gy = Line([0, Y_KURVA, Z_BAWAH], [0, Y_KURVA, Z_ATAS])
        for g in (gx, gy):
            g.set_stroke(REDUP, width=2)

        angka = Group()
        for n in (-3, -2, -1, 1, 2, 3, 4):
            # DI ATAS garis sumbu. Di bawahnya, angka di sekitar x = 1 jatuh ke
            # pita yang dipakai subtitle, padahal itu angka terpenting di sini.
            angka.add(tegak(rumus(str(n), 22, REDUP)).move_to([n, Y_KURVA, 0.34]))
        for n in (1, 2, 3, 4, 5):
            # Di KIRI sumbu tegak. Di kanan, angkanya jatuh ke dalam cekungan
            # parabola justru di tempat kurvanya lewat setelah digeser.
            angka.add(tegak(rumus(str(n), 22, REDUP)).move_to([-0.34, Y_KURVA, n]))

        huruf = Group(
            tegak(rumus("x", 24, REDUP)).move_to([X_MAX - 0.25, Y_KURVA, 0.42]),
            tegak(rumus("y", 24, REDUP)).move_to([0.42, Y_KURVA, Z_ATAS - 0.1]),
        )
        return Group(gx, gy, angka, huruf)

    def buat_kurva(self, f, dari, sampai, warna=TINTA, tebal=5.0):
        k = ParametricCurve(
            lambda t: np.array([t, Y_KURVA, f(t)]),
            t_range=(dari, sampai, 0.02),
        )
        k.set_stroke(warna, width=tebal)
        return k

    def label(self, kalimat, pos, warna=TINTA, ukuran=26):
        """Label yang menempel di bendanya. MAKSIMAL DUA KATA.

        Aturan ARYA 2 September malam: tulisan di dalam gambar bukan kalimat,
        melainkan penunjuk pendek, "singkat-singkat saja, dan padat, 2 kata
        maksimal". Kalimat panjang sudah jadi tugas subtitle, dan mengulangnya
        di layar cuma memecah fokus.

        Batasnya dijaga DI SINI supaya render GAGAL kalau dilanggar, bukan
        lolos diam-diam lalu ketahuan ARYA lagi. RUMUS tidak lewat sini:
        "x = 1" itu satu lambang utuh, bukan tiga kata, jadi ia dibuat dengan
        rumus() langsung.
        """
        kata = kalimat.replace("$", "").split()
        if len(kata) > 2:
            raise ValueError(
                "label maksimal 2 kata (aturan ARYA), dapat %d: %r" % (len(kata), kalimat)
            )
        return tegak(teks(kalimat, ukuran, warna)).move_to(pos)

    def panel(self, potongan, warna_akhir=None):
        """Tumpukan rumus di pojok KIRI atas layar, menempel walau kamera bergerak.

        Kiri, bukan kanan: semua kurva di topik ini naik ke kanan, dan pada
        render pertama rumus akar x tertimpa kurvanya sendiri di pojok kanan.
        """
        baris = VGroup(*[rumus(p, 34) for p in potongan])
        baris.arrange(DOWN, buff=0.34, aligned_edge=LEFT)
        if warna_akhir is not None:
            baris[-1].set_color(warna_akhir)
        sinema.batasi_lebar(baris, 5.2)
        baris.to_corner(UL, buff=0.45)
        return baris

    def rumus_terbang(self, b, potongan, warna_akhir=None, bareng=None,
                      lahir=0.9, tahan=0.5, terbang=1.2):
        """Rumus baru LAHIR BESAR di tempat mata menatap, lalu terbang ke panel.

        Pedoman tetap dari ARYA (2 September malam), berlaku untuk semua topik:
        rumus yang langsung terbit di pojok kiri atas TIDAK TERLIHAT, karena
        mata penonton sedang di grafik tengah layar. Narasi berikutnya lalu
        terasa tidak nyambung, dan itu yang terjadi di render sebelumnya.

        Mata mengikuti gerak yang menyambung, bukan benda yang tiba-tiba ada.
        Jadi rumusnya dibuat besar di tengah layar dulu, ditahan sebentar, baru
        mengecil dan berpindah ke tempat simpannya. Sekalian mengajari mata di
        mana rumus disimpan.

        `bareng` = animasi yang jalan BERSAMAAN dengan terbangnya, mis.
        perubahan bentuk kurvanya. Dipakai supaya rumus dan gambar tidak pernah
        saling membantah walau sekejap.

        Rumus lamanya DIKELUARKAN, tidak pernah di-morph jadi rumus baru:
        peralihan antara dua rumus yang jumlah lambangnya berbeda menghasilkan
        coretan kembar tak terbaca.
        """
        tujuan = self.panel(potongan, warna_akhir)
        sasaran = tujuan[-1].copy()

        besar = rumus(potongan[-1], 66, warna_akhir or TINTA)
        sinema.batasi_lebar(besar, 9.0)
        besar.move_to([0, 0.9, 0])
        besar.fix_in_frame()
        self.add(besar)

        # Dunianya DIREDUPKAN selama rumusnya besar, lalu terang lagi saat ia
        # terbang ke panel. Tanpa ini rumus besar bertumpuk dengan kurva dan
        # angka sumbu, dan angka sumbu mengintip dari sela hurufnya sehingga
        # terbaca seperti salah cetak (lembar kontak detik 52).
        #
        # Meredupkan lebih baik daripada memberi alas: alas dilarang ARYA, dan
        # redup justru mengerjakan tugas yang sama sekali lebih baik, yaitu
        # menyisakan SATU benda terang di layar.
        # Objek yang SEDANG dipakai animasi lain (mis. kurva yang sekaligus
        # berubah bentuk) tidak boleh ikut diredupkan: dua animasi pada satu
        # objek saling menimpa datanya dan rendernya gagal dengan
        # "could not broadcast input array".
        sibuk = {id(getattr(a, "mobject", None)) for a in (bareng or [])}
        redup = [m for m in (getattr(self, "sumbu", None),
                             getattr(self, "kurva", None),
                             getattr(self, "titik", None))
                 if m is not None and m in self.mobjects and id(m) not in sibuk]

        def gelap(m, nilai):
            # Kurva diredupkan lewat STROKE saja. `set_opacity` pada
            # ParametricCurve ikut menyalakan ISIAN, sehingga bagian dalam
            # parabola tampak berwarna abu, bukan sekadar redup.
            if m is getattr(self, "kurva", None):
                return m.animate.set_stroke(opacity=nilai)
            return m.animate.set_opacity(nilai)

        b.main(FadeIn(besar, scale=0.72),
               *[gelap(m, 0.18) for m in redup], run_time=lahir)
        b.jeda(tahan)

        self.hud_tambah(tujuan)
        tujuan.set_opacity(0)
        gerak = [Transform(besar, sasaran)]
        gerak += [gelap(m, 1.0) for m in redup]
        if self.pnl is not None:
            gerak.append(FadeOut(self.pnl))
        if len(tujuan) > 1:
            gerak.append(VGroup(*tujuan[:-1]).animate.set_opacity(1))
        b.main(*gerak, *(bareng or []), run_time=terbang)

        tujuan.set_opacity(1)
        if warna_akhir is not None:
            tujuan[-1].set_color(warna_akhir)
        self.remove(besar)
        self.pnl = tujuan

    def geser_dunia(self, b, dx, dz, lama=1.8, ikut=None):
        """Geser kurva dan semua yang menempel padanya, bukan gambar ulang."""
        pindah = np.array([dx, 0.0, dz])
        hal = [self.kurva] + list(self.ikutan)
        b.main(*[m.animate.shift(pindah) for m in hal], *(ikut or []), run_time=lama)

    def ubah_bentuk(self, b, nama_atau_f, dari=None, sampai=None, panel=None,
                    warna=None, ikut=None, lama=1.6):
        """Ubah bentuk kurvanya, dan rumusnya berganti PADA SAAT YANG SAMA.

        Pada render keempat rumusnya diganti setelah bentuknya selesai berubah,
        sehingga selama 1,6 detik panel menyebut bentuk lama padahal gambarnya
        sudah berganti. Tulisan yang membantah gambarnya lebih merusak daripada
        layar kosong, itu aturan gerbang video di CLAUDE.md.
        """
        if isinstance(nama_atau_f, str):
            d = DASAR[nama_atau_f]
            f, dari, sampai = d["f"], d["dari"], d["sampai"]
        else:
            f = nama_atau_f
        baru = self.buat_kurva(f, dari, sampai)
        morf = [Transform(self.kurva, baru)]
        if panel is not None:
            self.rumus_terbang(b, panel, warna,
                               bareng=morf + list(ikut or []), terbang=lama)
        else:
            b.main(*morf, *(ikut or []), run_time=lama)

    def bayangkan(self, f, dari, sampai):
        """Bekas bentuk sebelumnya, abu tipis, supaya perpindahannya terbaca."""
        bk = self.buat_kurva(f, dari, sampai, REDUP, 2.6)
        bk.set_stroke(opacity=0.5)
        self.add(bk)
        return bk

    def periksa(self, tambahan=None, pasangan=None):
        zona = {"panel": self.pnl,
                "sumbu": getattr(self, "sumbu", None),
                "kurva": getattr(self, "kurva", None)}
        zona.update(tambahan or {})
        zona = {k: v for k, v in zona.items() if v is not None}
        qc.periksa_adegan(self, zona, pasangan or [])

    # ==================================================================
    def b01_sapa(self):
        """Judul SAJA di layar bersih. Dunianya belum ada sama sekali.

        Pola Trigonometri: babak pertama judul saja, mengisi seluruh segmen,
        tanpa apa pun di belakangnya. Sebelumnya lembah, kurva, dan bola sudah
        terpasang di belakang judul, dan ARYA menilainya "terlalu rame dan
        berantakan".
        """
        kamera.pasang_awal(self.frame_, **SUDUT_DUNIA)
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Geser, cermin, regang", lama=DURASI["sapa"])
            b.catat(DURASI["sapa"])

    # ==================================================================
    def b02_lembah(self):
        """Benda nyata, DELAPAN DETIK, sekali jalan. Sesudah ini 2D semua.

        Bolanya menggelinding SATU kali dari tepi kiri ke tepi kanan, lalu
        berhenti. Bukan mengayun tanpa henti seperti versi sebelumnya: ARYA
        menilai gerakan terus-menerus itu mencuri perhatian dari yang sedang
        dijelaskan. Perlambatan bawaan `smooth` kebetulan tepat secara fisika
        juga, pelan di tepi dan cepat di dasar, persis bola sungguhan.
        """
        d = DASAR["parabola"]
        self.lembah = ilustrasi.lembah_fungsi(d["f"], d["dari"], d["sampai"],
                                              lebar=2 * Y_LEMBAH, resolusi=RESOLUSI)
        self.jalan = ValueTracker(0.0)
        self.bola = ilustrasi.bola(0.26, AKSEN)

        def gelinding(m):
            t = self.jalan.get_value()
            x = d["dari"] + t * (d["sampai"] - d["dari"])
            m.move_to([x, Y_KURVA, d["f"](x) + 0.26])

        gelinding(self.bola)
        self.bola.add_updater(gelinding)

        with sinema.babak(self, "lembah", DURASI) as b:
            b.main(FadeIn(self.lembah), run_time=1.4)
            b.main(FadeIn(self.bola), run_time=0.7)
            b.main(self.jalan.animate.set_value(1.0), run_time=4.4)
            b.jeda(0.6)
        qc.periksa_adegan(self, {"lembah": self.lembah, "bola": self.bola})

    # ==================================================================
    def b03_datar(self):
        """Lembahnya pergi, tinggal bidang datar. Mulai di sini semuanya 2D.

        Bentuk yang tadi ada sebagai benda kini tinggal sebagai gambar, dan itu
        memang isi kalimat narasinya. Bola dan permukaannya memudar bersamaan
        dengan sumbu yang datang, jadi tidak ada satu detik pun layar kosong.
        """
        self.sumbu = self.buat_sumbu()
        self.bola.clear_updaters()

        with sinema.babak(self, "datar", DURASI) as b:
            b.main(kamera.sudut(self.frame_, **SUDUT_GRAFIK), run_time=3.2)
            b.main(FadeOut(self.lembah), FadeOut(self.bola),
                   FadeIn(self.sumbu), run_time=1.6)
            b.jeda(0.5)
        qc.periksa_adegan(self, {"sumbu": self.sumbu})

    # ==================================================================
    def b04_titik(self):
        """Kurvanya TIDAK muncul begitu saja: dihitung, diplot, baru disambung.

        ARYA, 2 September: "siswa paham kenapa bisa bentuknya seperti itu,
        tidak secara ajaib langsung menjadi seperti itu". Tiap nilai dihitung
        di layar, titiknya mendarat pada saat yang sama, dan kurvanya baru
        ditarik SESUDAH kelima titik berdiri sendiri.

        Lima titik, bukan tiga. Dengan tiga, bentuk parabola masih terasa
        ditebak; dengan lima, kesetangkupannya kelihatan.
        """
        d = DASAR["parabola"]
        self.kurva = self.buat_kurva(d["f"], d["dari"], d["sampai"])

        hitungan = VGroup(*[
            rumus(r"f(%d) = (%d)^{2} = %d" % (x, x, y) if x < 0
                  else r"f(%d) = %d^{2} = %d" % (x, x, y), 26)
            for x, y in NILAI_HITUNG
        ])
        hitungan.arrange(DOWN, buff=0.30, aligned_edge=LEFT)
        sinema.batasi_lebar(hitungan, 4.4)
        hitungan.to_corner(UR, buff=0.45)

        self.titik = Group(*[penanda([x, Y_KURVA, y], SOROT, 0.13)
                             for x, y in NILAI_HITUNG])

        with sinema.babak(self, "titik", DURASI) as b:
            self.hud_tambah(hitungan)
            for baris in hitungan:
                baris.set_opacity(0)
            # Narator bertanya dulu ("kenapa bentuknya begitu?") sebelum angka
            # pertama disebut. Tanpa tunggu ini, titik pertama mendarat saat
            # narator masih bertanya, dan jawabannya mendahului pertanyaannya.
            #
            # `self.wait` langsung, BUKAN `b.jeda`: jeda dibatasi 1,6 detik oleh
            # gl.sinema (JEDA_MAKS) tanpa peringatan, jadi 3,4 diam-diam jadi
            # 1,6. `b.catat` yang memberi tahu babak berapa waktu terpakai.
            self.wait(3.4)
            b.catat(3.4)
            for baris, tt in zip(hitungan, self.titik):
                b.main(baris.animate.set_opacity(1), FadeIn(tt), run_time=1.15)
                b.jeda(0.6)
            b.jeda(0.4)
            b.main(ShowCreation(self.kurva), run_time=2.0)
            b.jeda(0.5)
            b.main(FadeOut(hitungan), run_time=0.7)
            self.rumus_terbang(b, [d["rumus"]])
        # Titiknya ikut digeser di babak berikutnya. Kalau tidak, titik hasil
        # hitungan tertinggal di tempat lama dan MEMBANTAH kurvanya sendiri.
        self.ikutan = [self.titik]
        self.periksa({"titik": self.titik})

    # ==================================================================
    def b05_geseratas(self):
        d = DASAR["parabola"]
        self.bayang = self.bayangkan(d["f"], d["dari"], d["sampai"])
        naik = self.label("naik 1", [2.75, Y_KURVA, 4.7], AKSEN)

        with sinema.babak(self, "geseratas", DURASI) as b:
            self.rumus_terbang(b, [d["rumus"], r"y = f(x) + 1"], AKSEN)
            self.geser_dunia(b, 0.0, 1.0, ikut=[FadeIn(naik)])
            b.jeda(0.8)
            b.main(FadeOut(naik), run_time=0.5)
        self.periksa({"bayang": self.bayang, "titik": self.titik})

    # ==================================================================
    def b06_tanya(self):
        """Rumusnya ditulis, lalu DIAM. Pertanyaannya diucapkan narator saja.

        Versi sebelumnya menuliskan "tebak dulu: ke kiri, atau ke kanan?" di
        layar padahal narator mengucapkan kalimat yang sama dan subtitle sudah
        menampilkannya. Kata ARYA: "biar gak rame dan fokusnya gak terbelah".
        """
        d = DASAR["parabola"]
        with sinema.babak(self, "tanya", DURASI) as b:
            self.rumus_terbang(b, [d["rumus"], r"y = f(x - 1) + 1"], AKSEN2)
            b.jeda(2.0)
        self.periksa({"bayang": self.bayang, "titik": self.titik})

    # ==================================================================
    def b07_jawab(self):
        kanan = self.label("ke KANAN", [3.0, Y_KURVA, 2.1], AKSEN2)
        with sinema.babak(self, "jawab", DURASI) as b:
            self.geser_dunia(b, 1.0, 0.0, lama=2.0, ikut=[FadeIn(kanan)])
            b.jeda(1.0)
            b.main(FadeOut(kanan), run_time=0.5)
        self.periksa({"bayang": self.bayang, "titik": self.titik})

    # ==================================================================
    def b08_kenapa(self):
        garis = DashedLine([1.0, Y_KURVA, Z_BAWAH], [1.0, Y_KURVA, 1.0])
        garis.set_stroke(AKSEN2, width=3)
        tt = penanda([1.0, Y_KURVA, 1.0], AKSEN2, 0.09)
        # RUMUS, bukan label prosa, jadi lewat rumus() bukan self.label().
        # Aturan dua kata itu untuk kata-kata; "x = 1" satu lambang utuh.
        lbl = tegak(rumus(r"x = 1", 26, AKSEN2)).move_to([1.95, Y_KURVA, 0.62])

        with sinema.babak(self, "kenapa", DURASI) as b:
            b.main(ShowCreation(garis), FadeIn(tt), run_time=1.4)
            b.main(FadeIn(lbl), run_time=0.7)
            b.jeda(1.6)
            b.main(FadeOut(garis), FadeOut(tt), FadeOut(lbl), run_time=0.8)
        self.periksa({"bayang": self.bayang})

    # ==================================================================
    def ganti_bentuk(self, b, nama):
        """Ganti bentuk fungsinya, lalu kenakan perlakuan yang sama persis.

        Titik hasil hitungan dilepas SEKALI, tepat saat bentuknya berganti:
        2 kuadrat sama dengan 4 tidak berlaku lagi untuk akar maupun sinus,
        jadi titiknya akan membantah kurvanya sendiri. Daftar ikutan
        dikosongkan pada saat yang sama, sebab ManimGL MENGEMBALIKAN objek yang
        di-FadeOut ke keadaan semula saat dibersihkan: kalau ia masih ikut
        dianimasikan sesudahnya, ia muncul lagi terang benderang.
        """
        d = DASAR[nama]
        lepas = [FadeOut(self.bayang)]
        if self.ikutan:
            lepas.append(FadeOut(self.titik))
            self.ikutan = []

        self.ubah_bentuk(b, nama, panel=[d["rumus"], r"y = f(x - 1) + 1"],
                         warna=SOROT, ikut=lepas, lama=1.6)
        self.bayang = self.bayangkan(d["f"], d["dari"], d["sampai"])
        self.geser_dunia(b, 1.0, 1.0, lama=1.6)

    def b09_akar(self):
        with sinema.babak(self, "akar", DURASI) as b:
            self.ganti_bentuk(b, "akar")
        self.periksa({"bayang": self.bayang})

    def b10_sinus(self):
        with sinema.babak(self, "sinus", DURASI) as b:
            self.ganti_bentuk(b, "sinus")
            b.jeda(0.8)
        self.periksa({"bayang": self.bayang})

    # ==================================================================
    def b11_mampat(self):
        """f(2x) ditulis, lalu DIAM. Pertanyaannya diucapkan narator saja."""
        d = DASAR["parabola"]
        with sinema.babak(self, "mampat", DURASI) as b:
            self.ubah_bentuk(b, "parabola", panel=[d["rumus"], r"y = f(2x)"],
                             warna=AKSEN2, ikut=[FadeOut(self.bayang)], lama=1.6)
            b.jeda(1.8)
        self.periksa()

    # ==================================================================
    def b12_setengah(self):
        d = DASAR["parabola"]
        self.bayang = self.bayangkan(d["f"], d["dari"], d["sampai"])

        def f_mampat(x):
            return d["f"](2.0 * x)

        lama = penanda([2.0, Y_KURVA, 4.0], REDUP, 0.09)
        baru = penanda([1.0, Y_KURVA, 4.0], AKSEN2, 0.11)
        panah = Arrow([2.0, Y_KURVA, 4.0], [1.0, Y_KURVA, 4.0], buff=0.1, thickness=4)
        panah.set_color(AKSEN2)
        lbl = self.label("sampai duluan", [2.9, Y_KURVA, 3.3], AKSEN2)

        with sinema.babak(self, "setengah", DURASI) as b:
            self.ubah_bentuk(b, f_mampat, -1.03, 1.03, lama=1.8)
            b.main(FadeIn(lama), GrowArrow(panah), FadeIn(baru), run_time=1.2)
            b.main(FadeIn(lbl), run_time=0.6)
            b.jeda(0.9)
        self.penanda = Group(lama, baru, panah, lbl)
        self.periksa({"bayang": self.bayang, "panah": panah, "label": lbl})

    # ==================================================================
    def b13_kenapamampat(self):
        alasan = tegak(rumus(r"f(2 \cdot 1) = f(2)", 30, AKSEN2))
        alasan.move_to([3.1, Y_KURVA, 1.9])

        with sinema.babak(self, "kenapamampat", DURASI) as b:
            b.main(Write(alasan), run_time=2.2)
            b.jeda(1.6)
        # TIDAK dibuang di sini. Babak ini 13,2 detik sedangkan animasinya cuma
        # 3,8 detik, dan narator masih menjelaskan sebabnya sampai akhir. Kalau
        # tulisannya dibuang lebih dulu, sepuluh detik sisanya jadi layar beku
        # tanpa satu pun yang bisa dibaca. Jadi ia dibawa sampai babak penutup,
        # dan dipadamkan bersama yang lain di sana.
        self.alasan = alasan
        self.periksa({"bayang": self.bayang, "alasan": alasan})

    # ==================================================================
    def b14_tutup(self):
        """Satu-satunya babak yang boleh berupa layar teks, sesuai aturan 4."""
        luar = teks("Angka di LUAR kurung\nmengerjakan apa yang tertulis.", 30, AKSEN)
        dalam = teks("Angka yang masuk ke DALAM kurung\nmengerjakan kebalikannya.", 30, AKSEN2)
        dua = VGroup(luar, dalam).arrange(DOWN, buff=0.6)
        sinema.batasi_lebar(dua, 11.0)
        dua.move_to([0, 0.1, 0])
        dua.fix_in_frame()

        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(
                FadeOut(self.kurva), FadeOut(self.bayang), FadeOut(self.sumbu),
                FadeOut(self.pnl), FadeOut(self.alasan), FadeOut(self.penanda),
                run_time=1.2,
            )
            self.pnl = None
            b.main(FadeIn(dua, shift=UP * 0.2), run_time=1.6)
            b.jeda(1.6)
        qc.periksa_adegan(self, {"dua kalimat": dua})
