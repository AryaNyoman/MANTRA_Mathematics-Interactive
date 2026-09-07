"""Video 01 topik TURUNAN, untuk Materi 02 "Garis potong yang berubah jadi garis singgung".

TUGAS VIDEO INI
Satu gagasan saja: angka kemiringan garis potong MERAPAT ke sebuah angka tanpa
pernah sampai. Itu yang membedakan limit dari substitusi, dan itu yang paling
sering hilang kalau siswa cuma diberi rumusnya.

TANPA 3D, DAN ITU DISENGAJA
Standar butir 2: 3D hanya di video PERTAMA tiap topik menurut urutan belajar,
dan untuk Turunan itu Materi 01 (kurva produksi pabrik). Video ini Materi 02,
jadi ia langsung ke matematika. Lagi pula yang diukur di sini KEMIRINGAN, dan
kamera miring memendekkan satu arah lebih banyak daripada arah lain sehingga
garis berkemiringan 2 tidak lagi terlihat berkemiringan 2.

ANGKANYA SAMA DENGAN HALAMAN
3, 2,5, 2,1, dan 2,01 adalah empat baris tabel di halaman Materi 02, bukan
angka baru. Klaimnya diperiksa `alat/cek_turunan.py` lewat
`alat/klaim-video-turunan.json`.

SATU WARNA SATU MAKNA (butir 10)
  AKSEN2 biru   garis potong dan titik Q, yaitu yang sedang diukur
  AKSEN merah   titik P, yang tinggal diam
  SOROT ungu    garis singgung dan angka 2, yaitu kesimpulannya
  REDUP         garis bantu dan bidang
  TINTA         kurva dan tulisan

KENAPA BABAK "menuju" TIDAK DIIKAT KE JAM SUBTITLE
Aturan waktu mewajibkan pengikatan untuk segmen yang menyebut beberapa hal
BERURUTAN sebagai kejadian terpisah. Di sini keempat angka sudah muncul satu
per satu pada babak sebelumnya, dan babak ini satu gerakan menyambung: h
meluncur dari 1 ke 0,01 sementara angkanya menghitung turun. Memecahnya jadi
empat kejadian justru akan mengulang yang sudah dilihat.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "turunan2-garis-singgung"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

BIDANG_X, BIDANG_Y = (-1.5, 3.5, 1.0), (-1.0, 5.0, 1.0)

# Batas tempat garis lurus boleh digambar. Diambil sedikit di dalam tepi bidang
# supaya ujung garis tidak menjulur keluar petak dan tertangkap qc.
X_KIRI, X_KANAN = -1.35, 3.35
Y_BAWAH, Y_ATAS = -0.85, 4.85

XP = 1.0            # absis titik P, tetap sepanjang video
H_AWAL = 1.0
H_LANGKAH = [1.0, 0.5, 0.1, 0.01]   # sama dengan tabel di halaman Materi 02


def f(x):
    return x * x


def P3(x, y):
    """Titik dunia di bidang xy. z sedikit di atas nol supaya di atas petak."""
    return np.array([float(x), float(y), 0.02])


def kurva_f(dari=-1.35, sampai=2.20, warna=TINTA, tebal=4.6):
    k = ParametricCurve(lambda t: P3(t, f(t)), t_range=(dari, sampai, 0.02))
    k.set_stroke(warna, width=tebal)
    return k


def ruas_kemiringan(m, warna, tebal=4.0):
    """Ruas garis lewat P berkemiringan m, DIPOTONG pada tepi bidang.

    Dipotong, bukan digambar panjang lalu dibiarkan: garis berkemiringan 3 yang
    ditarik dari x = -1,35 sampai 3,35 akan turun sampai y = -6, jauh menembus
    jalur subtitle, dan qc menggagalkan render karenanya. Ujungnya dihitung dari
    keempat tepi, bukan ditebak.
    """
    kandidat = [X_KIRI, X_KANAN]
    if abs(m) > 1e-9:
        kandidat += [XP + (Y_BAWAH - f(XP)) / m, XP + (Y_ATAS - f(XP)) / m]
    layak = []
    for x in kandidat:
        y = f(XP) + m * (x - XP)
        if X_KIRI - 1e-6 <= x <= X_KANAN + 1e-6 and Y_BAWAH - 1e-6 <= y <= Y_ATAS + 1e-6:
            layak.append(x)
    a, b = min(layak), max(layak)
    return Line(P3(a, f(XP) + m * (a - XP)),
                P3(b, f(XP) + m * (b - XP))).set_stroke(warna, width=tebal)


def alas_dunia(mob, pad_x=0.14, pad_y=0.10):
    """Alas warna kertas di BELAKANG tulisan yang menumpang di atas kisi.

    KENAPA ADA, DAN KENAPA BUKAN `sinema.alas_hud`
    Dua percobaan memindahkan blok angka hidup gagal berturut-turut: di kanan
    bawah ia jatuh ke baris angka sumbu x sehingga terbaca "1 jarak h2 = 0,51",
    dan di kiri tengah angka sumbu y menyusup di tengahnya menjadi
    "jarak h 3 = 0,51". Memindahkannya lagi cuma memindahkan cacatnya, sebab
    bidang bernomor punya angka di KEDUA sumbu dan garis petak di mana-mana.

    Jawaban yang benar sudah ada di perkakas: alas kertas di belakang tulisan
    (`sinema.alas_hud`, temuan Vektor 4 Sep). Yang dipakai di sini versi
    DUNIA-nya, sebab `alas_hud` memasang alasnya sebagai benda HUD sedangkan
    kedua blok ini hidup di dunia dan harus tetap sejajar dengan bidangnya.
    Kameranya memang tidak bergerak, tetapi menyandarkan kebenaran gambar pada
    kebetulan itu adalah cara membayar mahal di video berikutnya.

    z-nya sedikit di bawah tulisan dan di atas bidang, jadi ia menutup petak
    tanpa menutup tulisannya sendiri.

    TINGGI KEDUA BLOK DIPILIH DI ANTARA ANGKA SUMBU, yaitu 3,50 dan 2,50.
    Pada 3,55 dan 2,95 alasnya menutup angka "3" seluruhnya dan memotong
    separuh angka "4", dan angka sumbu yang terpotong separuh terbaca seperti
    kerusakan render, bukan seperti panel yang disengaja. Aturan 9 menuntut
    sumbu berangka; menutup angkanya dengan alas informasi adalah menghapus
    yang justru diwajibkan.
    """
    r = Rectangle(width=mob.get_width() + 2 * pad_x,
                  height=mob.get_height() + 2 * pad_y)
    r.set_fill(LATAR, opacity=1.0).set_stroke(width=0)
    r.move_to(mob.get_center())
    r.shift(0.008 * IN)
    return r


def hud_dengan_papan(ident, papan):
    """Isi `hud=` untuk qc, aman saat panelnya masih KOSONG.

    `PapanRumus.semua()` mengembalikan None selama belum ada satu baris pun,
    dan qc lalu memanggil `get_family()` pada None sehingga render mati dengan
    AttributeError. Itu baru muncul setelah "0/0 ?" dipindah keluar dari slot
    rumus utama, yaitu ketika untuk pertama kalinya ada babak yang panelnya
    benar-benar kosong. Menuliskan penjagaan ini sekali lebih aman daripada
    mengingatnya di sebelas tempat.
    """
    isi = {"identitas": ident}
    papan_isi = papan.semua()
    if papan_isi is not None:
        isi["papan"] = papan_isi
    return isi


class TurunanGarisSinggung(AdeganMatra):
    def construct(self):
        frame = self.frame

        # Bidangnya DIBUAT sekarang supaya kamera bisa dihitung darinya, tetapi
        # baru DIPASANG pada babak "soal". Lembar kontak render pertama
        # memperlihatkan kartu judul duduk di atas garis petak dan angka sumbu;
        # standar menuntut babak pertama HANYA judul materi.
        bidang = ilustrasi.bidang_bernomor(BIDANG_X, BIDANG_Y)
        pusat, tinggi = kamera.muat_datar(bidang)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat, tinggi=tinggi)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True)

        # ================= buka: judul saja ============================== #
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(2.6, DURASI["buka"] - 0.8)
            sinema.judul_pembuka(
                self, "Materi 02: garis potong yang berubah jadi garis singgung",
                lama=lama,
            )
            b.catat(lama)
        qc.periksa_adegan(self, {})

        # ================= soal: laju rata-rata butuh DUA titik ========== #
        # Dua titik bebas dan tali penghubungnya, belum ada kurva apa pun:
        # kalimatnya memang masih tentang laju rata-rata materi sebelumnya.
        a1, a2 = P3(-0.6, 0.5), P3(2.6, 3.6)
        d1 = Dot(a1, radius=0.09).set_color(AKSEN)
        d2 = Dot(a2, radius=0.09).set_color(AKSEN2)
        tali = Line(a1, a2).set_stroke(REDUP, 3.4)
        ident = sinema.identitas(self, "1 petak = 1 satuan")

        with sinema.babak(self, "soal", DURASI) as b:
            b.main(FadeIn(bidang), run_time=0.8)
            b.main(FadeIn(d1, scale=0.5), FadeIn(d2, scale=0.5), run_time=0.9)
            b.main(ShowCreation(tali), run_time=1.2)
            b.main(Indicate(tali, color=REDUP), run_time=1.2)
        qc.periksa_adegan(self, {"tali": tali},
                          hud={"identitas": ident}, dunia={"bidang": bidang})

        # ================= satu: kedua titik menyatu, 0 dibagi 0 ========= #
        with sinema.babak(self, "satu", DURASI) as b:
            b.main(
                d2.animate.move_to(a1), tali.animate.put_start_and_end_on(a1, a1 + 0.02 * RIGHT),
                run_time=1.8,
            )
            b.main(FadeOut(tali), run_time=0.4)
            # "0/0 ?" adalah PERTANYAAN sesaat, bukan rumus yang berlaku
            # sepanjang video, jadi ia tinggal di dunia dan dibuang setelah
            # dijawab. Percobaan pertama menaruhnya di slot rumus utama panel
            # lalu menggantinya dengan f(x) = x^2; lembar kontak menunjukkan
            # panel MEMULIHKAN "0/0 ?" begitu baris berikutnya ditambahkan,
            # sehingga video berakhir dengan pertanyaan yang justru sudah
            # dijawabnya sendiri. Slot utama sekarang diisi sekali saja.
            tanya = rumus(r"\frac{0}{0}\ ?", 40, REDUP)
            tanya.move_to(P3(-0.55, 2.35))
            alas_tanya = alas_dunia(tanya, pad_x=0.20, pad_y=0.16)
            b.main(FadeIn(alas_tanya), Write(tanya), run_time=1.2)
        qc.periksa_adegan(self, {},
                          hud=hud_dengan_papan(ident, papan),
                          dunia={"bidang": bidang})

        # ================= kurva: f(x) = x^2 dan titik P ================= #
        kurva = kurva_f()
        titik_p = Dot(P3(XP, f(XP)), radius=0.10).set_color(AKSEN)
        l_p = sinema.label("P", warna=AKSEN)
        l_p.next_to(P3(XP, f(XP)), DOWN + LEFT, buff=0.20)

        with sinema.babak(self, "kurva", DURASI) as b:
            b.main(FadeOut(d1), FadeOut(d2), run_time=0.5)
            b.main(ShowCreation(kurva), run_time=max(1.4, DURASI["kurva"] - 5.4))
            b.main(FadeIn(titik_p, scale=0.5), FadeIn(l_p), run_time=0.9)
            b.main(FadeOut(tanya), FadeOut(alas_tanya), run_time=0.5)
            sinema.lahir_rumus(self, r"f(x)=x^2", dekat=kurva, papan=papan,
                               b=b, warna=TINTA)
        qc.periksa_adegan(self, {"kurva": kurva},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"P": l_p},
                          dunia={"bidang": bidang, "titik P": titik_p})

        # ================= potong: Q, garis potong, kemiringan 3 ========= #
        # h adalah SATU-SATUNYA sumber kebenaran: titik Q, garis potongnya, dan
        # kedua angka hidup semuanya dihitung ulang dari h tiap frame. Tidak ada
        # angka yang ditulis tangan, jadi gambar dan angka tidak bisa berselisih.
        h = ValueTracker(H_AWAL)

        titik_q = always_redraw(lambda: Dot(
            P3(XP + h.get_value(), f(XP + h.get_value())), radius=0.10).set_color(AKSEN2))
        sekan = always_redraw(lambda: ruas_kemiringan(
            (f(XP + h.get_value()) - f(XP)) / h.get_value(), AKSEN2, 4.0))

        angka_m = sinema.AngkaKoma(0, num_decimal_places=2, font_size=30).set_color(AKSEN2)
        angka_m.add_updater(lambda mob: mob.set_value(
            (f(XP + h.get_value()) - f(XP)) / h.get_value()))
        # LETAK KEDUA BLOK ANGKA SUDAH DUA KALI SALAH. INI PERCOBAAN KETIGA.
        #
        # (2,15 ; 1,30): qc menggagalkan render, sebab pada h = 0,01 titik Q
        # duduk di (1,01 ; 1,02) dan labelnya menindih blok kemiringan.
        #
        # (2,45 ; 0,70) dan (2,45 ; -0,20): qc MELOLOSKANNYA, tetapi lembar
        # kontak memperlihatkan blok "jarak h" jatuh tepat di baris angka sumbu
        # x sehingga terbaca "1 jarak h2 = 0,51". qc tidak menangkapnya karena
        # angka sumbu adalah bagian dari `bidang`, yaitu benda DUNIA, dan
        # tulisan lawan dunia memang tidak diperiksa keras. Gerbangnya benar;
        # lembar kontaknya yang menemukan.
        #
        # Sekarang keduanya di KIRI-TENGAH. Daerah itu kosong untuk seluruh
        # jangkauan h: kurva x^2 pada y = 3 sampai 3,6 berada di x sekitar 1,7
        # sampai 1,9, garis potong berkemiringan 2 sampai 3 melewati ketinggian
        # itu di x 1,85 sampai 2,3, dan titik Q tidak pernah lebih kiri dari
        # x = 1. Semuanya di KANAN blok, yang tepi kanannya sekitar x = 1,0.
        blok_m = sinema.nilai_hidup(
            sinema.label("kemiringan", warna=AKSEN2), angka_m, di=P3(-0.15, 3.50))

        angka_h = sinema.AngkaKoma(0, num_decimal_places=2, font_size=30).set_color(REDUP)
        angka_h.add_updater(lambda mob: mob.set_value(h.get_value()))
        blok_h = sinema.nilai_hidup(
            sinema.label("jarak h", warna=REDUP), angka_h, di=P3(-0.15, 2.50))

        alas_m = alas_dunia(blok_m)
        alas_h = alas_dunia(blok_h)

        l_q = always_redraw(lambda: sinema.label("Q", warna=AKSEN2).next_to(
            P3(XP + h.get_value(), f(XP + h.get_value())), UP + RIGHT, buff=0.18))

        with sinema.babak(self, "potong", DURASI) as b:
            b.main(FadeIn(titik_q, scale=0.5), FadeIn(l_q), run_time=0.8)
            b.main(ShowCreation(sekan), run_time=1.4)
            b.main(FadeIn(alas_h), FadeIn(alas_m),
                   FadeIn(blok_h), FadeIn(blok_m), run_time=0.9)
            b.main(Indicate(blok_m, color=AKSEN2), run_time=1.2)
        qc.periksa_adegan(self, {"kurva": kurva, "sekan": sekan},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"P": l_p, "Q": l_q, "m": blok_m, "h": blok_h},
                          dunia={"bidang": bidang, "titik P": titik_p, "titik Q": titik_q})

        # ================= nama: garis potong diberi namanya ============= #
        with sinema.babak(self, "nama", DURASI) as b:
            papan.baris(r"\text{garis potong}", warna=AKSEN2, b=b)
            b.main(Indicate(sekan, color=AKSEN2), run_time=1.4)
        qc.periksa_adegan(self, {"kurva": kurva, "sekan": sekan},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"P": l_p, "Q": l_q, "m": blok_m, "h": blok_h},
                          dunia={"bidang": bidang, "titik P": titik_p, "titik Q": titik_q})

        # ================= tiga langkah Q mendekat ======================= #
        for nama_babak, h_baru in (("kecil1", 0.5), ("kecil2", 0.1), ("kecil3", 0.01)):
            with sinema.babak(self, nama_babak, DURASI) as b:
                b.main(h.animate.set_value(h_baru),
                       run_time=max(1.6, DURASI[nama_babak] - 2.4))
                b.main(Indicate(blok_m, color=AKSEN2), run_time=1.2)
            qc.periksa_adegan(self, {"kurva": kurva, "sekan": sekan},
                              hud=hud_dengan_papan(ident, papan),
                              tulisan={"P": l_p, "Q": l_q, "m": blok_m, "h": blok_h},
                              dunia={"bidang": bidang, "titik P": titik_p, "titik Q": titik_q})

        # ================= menuju: satu gerakan menyambung =============== #
        with sinema.babak(self, "menuju", DURASI) as b:
            papan.baris(r"3 \to 2{,}5 \to 2{,}1 \to 2{,}01", warna=AKSEN2, b=b)
            b.main(h.animate.set_value(H_LANGKAH[0]), run_time=1.0)
            b.main(h.animate.set_value(H_LANGKAH[-1]),
                   run_time=max(2.0, DURASI["menuju"] - papan.waktu_alasan() - 5.0))
            papan.baris(r"\text{menuju } 2,\ \text{tak pernah sampai}", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"kurva": kurva, "sekan": sekan},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"P": l_p, "Q": l_q, "m": blok_m, "h": blok_h},
                          dunia={"bidang": bidang, "titik P": titik_p, "titik Q": titik_q})

        # ================= singgung: garis yang dituju =================== #
        tangen = ruas_kemiringan(2.0, SOROT, 5.0)
        l_tangen = sinema.label("garis singgung", warna=SOROT)
        l_tangen.next_to(tangen.get_start(), UP + RIGHT, buff=0.18)

        with sinema.babak(self, "singgung", DURASI) as b:
            b.main(ShowCreation(tangen), run_time=1.6)
            b.main(FadeIn(l_tangen), run_time=0.6)
            b.main(Indicate(tangen, color=SOROT), run_time=1.4)
        qc.periksa_adegan(self, {"kurva": kurva, "tangen": tangen},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"P": l_p, "Q": l_q, "m": blok_m, "h": blok_h,
                                   "garis singgung": l_tangen},
                          dunia={"bidang": bidang, "titik P": titik_p, "titik Q": titik_q})

        # ================= huruf: dikerjakan dengan lambang ============== #
        with sinema.babak(self, "huruf", DURASI) as b:
            papan.baris(r"(1+h)^2-1 = 2h+h^2", warna=TINTA, b=b)
            # BUKAN `\div`: pada font Computer Modern proyek ini ia tercetak
            # sebagai lambang nabla, sehingga barisnya terbaca "nabla titik h".
            # Terlihat di lembar kontak, bukan di log. Halaman Materi 02 sendiri
            # memakai titik dua untuk pembagian, jadi video dan halaman kini
            # memakai lambang yang sama.
            papan.baris(r"(2h+h^2) : h = 2+h", warna=TINTA, b=b)
        qc.periksa_adegan(self, {"kurva": kurva, "tangen": tangen},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"P": l_p, "Q": l_q, "m": blok_m, "h": blok_h,
                                   "garis singgung": l_tangen},
                          dunia={"bidang": bidang, "titik P": titik_p, "titik Q": titik_q})

        # ================= urutan: h tidak boleh langsung nol ============ #
        with sinema.babak(self, "urutan", DURASI) as b:
            b.main(Indicate(blok_h, color=REDUP), run_time=1.3)
            papan.baris(r"h \neq 0\ \text{saat dicoret}", warna=AKSEN, b=b)
        qc.periksa_adegan(self, {"kurva": kurva, "tangen": tangen},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"P": l_p, "Q": l_q, "m": blok_m, "h": blok_h,
                                   "garis singgung": l_tangen},
                          dunia={"bidang": bidang, "titik P": titik_p, "titik Q": titik_q})

        # ================= tutup: f aksen satu sama dengan dua =========== #
        with sinema.babak(self, "tutup", DURASI) as b:
            papan.baris(r"f'(1)=2", warna=SOROT, b=b)
            b.main(Indicate(titik_p, color=SOROT), run_time=1.2)
            b.main(Indicate(tangen, color=SOROT), run_time=1.4)
        qc.periksa_adegan(self, {"kurva": kurva, "tangen": tangen},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"P": l_p, "Q": l_q, "m": blok_m, "h": blok_h,
                                   "garis singgung": l_tangen},
                          dunia={"bidang": bidang, "titik P": titik_p, "titik Q": titik_q})
