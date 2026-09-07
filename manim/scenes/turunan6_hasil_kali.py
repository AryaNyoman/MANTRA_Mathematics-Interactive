"""Video 04 topik TURUNAN, untuk Materi 06 "Hasil kali dan hasil bagi".

TUGAS VIDEO INI
Aturan hasil kali punya bukti yang berupa GAMBAR: persegi panjang yang kedua
sisinya bertambah. Tambahan luasnya berbentuk L, terdiri atas pita di kanan,
pita di atas, dan satu pojok kecil. Begitu ketiganya dibagi h, kedua pita
menyisakan angka yang berarti dan pojoknya lenyap. Video bisa memperlihatkan
pojok itu menyusut sementara kedua pitanya bertahan; tulisan tidak bisa.

KENAPA HANYA HASIL KALI, PADAHAL JUDUL MATERINYA HASIL KALI DAN HASIL BAGI
Disengaja. Alasan aturan hasil bagi bersifat aljabar, bukan gambar, dan halaman
Materi 06 sudah mengerjakan langkahnya lengkap. Video menyebutnya di penutup
supaya siswa tahu ke mana mencarinya, bukan supaya merasa sudah selesai.

ANGKANYA DIPILIH SUPAYA BISA DIPERIKSA SISWA
u = x + 1 dan v = x, diperiksa di x = 2, jadi u bernilai 3 dan v bernilai 2.
Keduanya lurus, sehingga tiap pita dibagi h memberi angka yang PERSIS tetap:
pita kanan 2, pita atas 3, berapa pun h. Pojoknya h kali h dibagi h, yaitu h
sendiri, jadi ia satu-satunya yang menyusut. Babak "lengkung" yang menjaga
siswa tidak menyimpulkan angkanya selalu tetap.

NAMA PITANYA: KANAN DAN ATAS, BUKAN MENDATAR DAN TEGAK
Halaman Materi 06 semula menamainya "pita mendatar" dan "pita tegak", dan itu
terbalik: u sisi mendatar, jadi pertambahan pada u justru menghasilkan pita
yang TEGAK di kanan. Widget menggambarnya dengan benar, tetapi teksnya
membantah gambarnya. Diperbaiki bersamaan dengan video ini, di halaman, di
komentar widget, dan di sini.

TANPA 3D (butir 2): video pertama topik menurut urutan belajar adalah Materi 01.

SATU WARNA SATU MAKNA (butir 10)
  TINTA         persegi panjang lama, luas u kali v
  AKSEN2 biru   pita kanan, lahir dari pertambahan u
  AKSEN merah   pita atas, lahir dari pertambahan v
  SOROT ungu    pojok kecil, satu-satunya yang lenyap, dan aturan yang disimpulkan
  REDUP         garis bantu dan jabaran yang ditinggalkan

ANGKANYA SAMA DENGAN HALAMAN
(x^2 + 1)(x - 3) -> 3x^2 - 6x + 1, beserta pemeriksaan lewat jalan kedua,
adalah kotak contoh Materi 06. Klaimnya diperiksa
`alat/klaim-video-turunan.json` dengan awalan V06.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "turunan6-hasil-kali"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

# TATA LETAK, DIUKUR BUKAN DIKIRA
# Sisi u sengaja yang MENDATAR dan yang lebih panjang. Versi pertama memakai
# u = 2 mendatar dan v = 3 tegak, jadi persegi panjangnya 3 x 4 satuan setelah
# tumbuh, dan yang membatasi skalanya jadi TINGGI layar: di antara jalur
# identitas (mulai 2,40) dan jalur subtitle (mulai -2,55) cuma tersisa 4,15
# satuan, jadi skalanya mentok di 1,04 dan gambarnya cuma mengisi seperdelapan
# lebar layar sementara sepertiga layar kanan bawah kosong. Dengan sisi panjang
# mendatar, yang membatasi jadi LEBAR, dan lebar masih sisa banyak: skala 1,3
# dan gambar 37 persen lebih besar. Hasil kalinya tidak berubah, tetap 5.
# Skala 1,22 dan bukan 1,3: pada 1,3 dengan sudut kiri -6,4, label "v" di kiri
# persegi panjang jatuh PERSIS di tepi bingkai (-6,82) dan gerbang qc menolaknya.
SKALA = 1.22
SUDUT = np.array([-6.0, -1.85, 0.0])    # sudut kiri bawah, tetap sepanjang video
U0, V0 = 3.0, 2.0                        # u = x + 1 dan v = x, dihitung di x = 2
X_BARIS = -0.7                           # tepi kiri ketiga baris hitungan
# Ketiganya di BAWAH jalur panel (yang mulai pada y = 1,10) supaya barisnya
# boleh memanjang ke kanan tanpa menabrak panel.
Y_BARIS = (0.6, -0.2, -1.0)


def kotak(lebar, tinggi, kiri_bawah, warna, isian):
    """Persegi panjang dengan sudut kiri bawah di titik yang diminta."""
    r = Rectangle(width=max(lebar, 1e-4), height=max(tinggi, 1e-4))
    r.set_fill(warna, opacity=isian).set_stroke(warna, width=1.8)
    r.move_to(kiri_bawah + np.array([max(lebar, 1e-4) / 2, max(tinggi, 1e-4) / 2, 0.0]))
    return r


def baris_hitung(isi, ke_berapa, warna):
    """Satu baris hitungan di kanan gambar, rata kiri pada tepi yang sama."""
    m = rumus(isi, 30, warna)
    sinema.batasi_lebar(m, 4.1)
    m.move_to([X_BARIS + m.get_width() / 2, Y_BARIS[ke_berapa], 0])
    return m


def hud_dengan_papan(ident, papan):
    """Isi `hud=` untuk qc, aman saat panelnya masih kosong."""
    isi = {"identitas": ident}
    papan_isi = papan.semua()
    if papan_isi is not None:
        isi["papan"] = papan_isi
    return isi


class TurunanHasilKali(AdeganMatra):
    """Waktu tiap babak dihitung MUNDUR dari durasi narasinya sejak awal.

    Pelajaran dari video Materi 07: run_time bawaan yang enak ditulis hampir
    selalu jauh lebih pendek daripada kalimatnya, dan hasilnya layar beku
    sementara narator terus bicara. Di sini angkanya dipilih lebih dulu dari
    `DURASI`, dan tidak ada babak yang berakhir dengan layar kosong: pembersihan
    selalu dikerjakan di AWAL babak berikutnya, bukan di ujung babak sendiri.
    """

    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True)
        ident = sinema.identitas(self, "u = x + 1, v = x, di x = 2")

        # ================= buka ========================================== #
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(2.4, DURASI["buka"] - 0.8)
            sinema.judul_pembuka(self, "Materi 06: turunan sebuah hasil kali", lama=lama)
            b.catat(lama)

        # ================= bantah: sisa pertanyaan Materi 05 ============= #
        # Tanpa coretan. Lambang yang dicoret habis tidak bisa dibaca lagi, dan
        # yang perlu terbaca justru bentuk salahnya. Dipakai tanda "tidak sama".
        b1 = rumus(r"(x \cdot x)' = 2x", 50, TINTA).move_to([0, 0.8, 0])
        b2 = rumus(r"2x \ne 1 \cdot 1", 40, AKSEN).move_to([0, -0.7, 0])

        with sinema.babak(self, "bantah", DURASI) as b:
            b.main(Write(b1), run_time=2.4)
            b.jeda(0.6)
            b.main(Write(b2), run_time=2.6)
            b.main(Indicate(b2, color=AKSEN), run_time=1.8)
            b.main(FadeOut(b2), run_time=1.0)
        qc.periksa_adegan(self, {"bantah": b1, "beda": b2},
                          hud=hud_dengan_papan(ident, papan))

        # ================= persegi: u, v, dan luasnya ==================== #
        ht = ValueTracker(0.0)          # h, dalam satuan yang sama dengan u dan v

        dasar = kotak(U0 * SKALA, V0 * SKALA, SUDUT, TINTA, 0.14)
        l_u = rumus("u", 32, TINTA).next_to(dasar, DOWN, buff=0.28)
        l_v = rumus("v", 32, TINTA).next_to(dasar, LEFT, buff=0.28)
        l_luas = rumus(r"u \cdot v", 34, TINTA).move_to(dasar.get_center())

        with sinema.babak(self, "persegi", DURASI) as b:
            b.main(FadeOut(b1), run_time=0.8)
            b.main(ShowCreation(dasar), run_time=2.4)
            b.main(FadeIn(l_u, shift=UP * 0.2), run_time=1.4)
            b.main(FadeIn(l_v, shift=RIGHT * 0.2), run_time=1.4)
            b.main(FadeIn(l_luas), run_time=1.6)
            b.main(Indicate(dasar, color=TINTA), run_time=1.8)
        qc.periksa_adegan(self, {"dasar": dasar},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"u": l_u, "v": l_v, "luas": l_luas})

        # ================= angka: supaya bisa diperiksa ================== #
        n_u = rumus("3", 30, TINTA).next_to(l_u, RIGHT, buff=0.22)
        n_v = rumus("2", 30, TINTA).next_to(l_v, DOWN, buff=0.22)

        with sinema.babak(self, "angka", DURASI) as b:
            b.main(FadeIn(n_u, shift=RIGHT * 0.2), run_time=1.6)
            b.main(FadeIn(n_v, shift=DOWN * 0.2), run_time=1.6)
            b.main(Indicate(n_u, color=TINTA), Indicate(n_v, color=TINTA), run_time=1.8)
            papan.baris(r"u = 3,\ \ v = 2", warna=TINTA, b=b)
            b.main(Indicate(l_luas, color=TINTA), run_time=1.4)
        qc.periksa_adegan(self, {"dasar": dasar},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"u": l_u, "v": l_v, "luas": l_luas,
                                   "nilai u": n_u, "nilai v": n_v})

        # ================= geser: kedua sisi bertambah =================== #
        # Ketiga tambahan digambar ulang tiap frame dari h, jadi mereka TIDAK
        # BISA berbohong: yang tampil selalu hasil hitungan, bukan gambar yang
        # dipasang lalu dilupakan.
        def p_kanan():
            h = ht.get_value()
            return kotak(h * SKALA, V0 * SKALA,
                         SUDUT + np.array([U0 * SKALA, 0, 0]), AKSEN2, 0.55)

        def p_atas():
            h = ht.get_value()
            return kotak(U0 * SKALA, h * SKALA,
                         SUDUT + np.array([0, V0 * SKALA, 0]), AKSEN, 0.55)

        def p_pojok():
            h = ht.get_value()
            return kotak(h * SKALA, h * SKALA,
                         SUDUT + np.array([U0 * SKALA, V0 * SKALA, 0]), SOROT, 0.75)

        kanan = always_redraw(p_kanan)
        atas = always_redraw(p_atas)
        pojok = always_redraw(p_pojok)
        self.add(kanan, atas, pojok)

        l_h = rumus("h", 30, AKSEN2)
        l_h.move_to([SUDUT[0] + (U0 + 0.5) * SKALA, l_u.get_center()[1], 0])

        with sinema.babak(self, "geser", DURASI) as b:
            b.main(ht.animate.set_value(1.0), run_time=3.0)
            b.main(FadeIn(l_h, shift=UP * 0.2), run_time=1.4)
            b.main(Indicate(kanan, color=AKSEN2), run_time=1.4)
            b.main(Indicate(atas, color=AKSEN), run_time=1.4)
        qc.periksa_adegan(self, {"dasar": dasar, "kanan": kanan, "atas": atas},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"u": l_u, "v": l_v, "luas": l_luas,
                                   "nilai u": n_u, "nilai v": n_v, "h": l_h})

        # ================= tiga: ketiga bagiannya dikenali =============== #
        with sinema.babak(self, "tiga", DURASI) as b:
            b.main(FadeOut(l_luas), FadeOut(l_h), run_time=1.0)
            b.main(Indicate(kanan, color=AKSEN2), run_time=1.8)
            b.main(Indicate(atas, color=AKSEN), run_time=1.8)
            b.main(Indicate(pojok, color=SOROT), run_time=1.8)
        qc.periksa_adegan(self, {"dasar": dasar, "kanan": kanan, "atas": atas},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"u": l_u, "v": l_v, "nilai u": n_u, "nilai v": n_v})

        # ================= bagi: ketiganya dibagi h ====================== #
        r_kanan = baris_hitung(r"\text{pita kanan} : h = 2", 0, AKSEN2)
        r_atas = baris_hitung(r"\text{pita atas} : h = 3", 1, AKSEN)
        r_pojok = baris_hitung(r"\text{pojok} : h = 1", 2, SOROT)

        with sinema.babak(self, "bagi", DURASI) as b:
            b.main(FadeIn(r_kanan, shift=LEFT * 0.2), run_time=1.6)
            b.main(FadeIn(r_atas, shift=LEFT * 0.2), run_time=1.6)
            b.main(FadeIn(r_pojok, shift=LEFT * 0.2), run_time=1.6)
            b.main(Indicate(r_kanan, color=AKSEN2), Indicate(r_atas, color=AKSEN),
                   run_time=1.8)
        qc.periksa_adegan(self, {"dasar": dasar, "kanan": kanan, "atas": atas},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"u": l_u, "v": l_v, "nilai u": n_u, "nilai v": n_v,
                                   "baris kanan": r_kanan, "baris atas": r_atas,
                                   "baris pojok": r_pojok})

        # ================= pojok: h dikecilkan =========================== #
        # Dua baris pertama TIDAK diubah, dan itu memang isinya: berapa pun h,
        # keduanya tetap 3 dan 2. Yang berubah cuma baris ketiga.
        with sinema.babak(self, "pojok", DURASI) as b:
            b.main(ht.animate.set_value(0.5), run_time=2.2)
            baru = baris_hitung(r"\text{pojok} : h = 0{,}5", 2, SOROT)
            b.main(ReplacementTransform(r_pojok, baru), run_time=1.4)
            r_pojok = baru
            b.main(ht.animate.set_value(0.2), run_time=2.2)
            baru = baris_hitung(r"\text{pojok} : h = 0{,}2", 2, SOROT)
            b.main(ReplacementTransform(r_pojok, baru), run_time=1.4)
            r_pojok = baru
            b.main(Indicate(r_kanan, color=AKSEN2), Indicate(r_atas, color=AKSEN),
                   run_time=1.8)
        qc.periksa_adegan(self, {"dasar": dasar, "kanan": kanan, "atas": atas},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"u": l_u, "v": l_v, "nilai u": n_u, "nilai v": n_v,
                                   "baris kanan": r_kanan, "baris atas": r_atas,
                                   "baris pojok": r_pojok})

        # ================= lenyap: pojoknya habis ======================== #
        # Berhenti di h = 0,1, bukan nol: pada 0,1 kedua pita masih terlihat
        # sebagai garis tipis sementara pojoknya sudah tidak terlihat sama
        # sekali, dan justru BEDA itu yang harus tertangkap mata. Di h = 0
        # ketiganya sama-sama hilang dan penonton tidak belajar apa pun.
        with sinema.babak(self, "lenyap", DURASI) as b:
            b.main(ht.animate.set_value(0.1), run_time=2.5)
            baru = baris_hitung(r"\text{pojok} : h \to 0", 2, SOROT)
            b.main(ReplacementTransform(r_pojok, baru), run_time=1.4)
            r_pojok = baru
            b.main(Indicate(r_pojok, color=SOROT), run_time=1.6)
            papan.baris(r"2 + 3 = 5", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"dasar": dasar},
                          hud=hud_dengan_papan(ident, papan),
                          tulisan={"u": l_u, "v": l_v, "nilai u": n_u, "nilai v": n_v,
                                   "baris kanan": r_kanan, "baris atas": r_atas,
                                   "baris pojok": r_pojok})

        gambar = VGroup(dasar, l_u, l_v, n_u, n_v, r_kanan, r_atas, r_pojok)

        # ================= aturan ======================================== #
        aturan = rumus(r"(u \cdot v)' = u'v + uv'", 50, SOROT).move_to([0, 0.5, 0])
        sinema.batasi_lebar(aturan, 9.0)

        with sinema.babak(self, "aturan", DURASI) as b:
            b.main(FadeOut(gambar), FadeOut(kanan), FadeOut(atas), FadeOut(pojok),
                   run_time=1.0)
            b.main(Write(aturan), run_time=2.8)
            b.main(Indicate(aturan, color=SOROT), run_time=1.8)
            papan.baris(r"(uv)' = u'v + uv'", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"aturan": aturan}, hud=hud_dengan_papan(ident, papan))

        # ================= lengkung: catatan yang menjaga ================ #
        c1 = sinema.label("pita mendekat", warna=AKSEN2)
        c1.move_to([0, -0.9, 0])
        c2 = sinema.label("pojok lenyap", warna=SOROT)
        c2.move_to([0, -1.9, 0])

        with sinema.babak(self, "lengkung", DURASI) as b:
            b.main(FadeIn(c1, shift=UP * 0.2), run_time=1.6)
            b.main(FadeIn(c2, shift=UP * 0.2), run_time=1.6)
            b.main(Indicate(c2, color=SOROT), run_time=1.8)
            b.main(FadeOut(c1), FadeOut(c2), run_time=1.2)
        qc.periksa_adegan(self, {"aturan": aturan}, hud=hud_dengan_papan(ident, papan),
                          tulisan={"catatan 1": c1, "catatan 2": c2})

        # ================= contoh: bentuk yang melengkung ================ #
        soal = rumus(r"(x^2+1)(x-3)", 46, TINTA).move_to([0, 0.9, 0])
        bagian = rumus(r"u = x^2+1,\ \ v = x-3", 32, AKSEN2).move_to([0, -0.5, 0])

        with sinema.babak(self, "contoh", DURASI) as b:
            b.main(FadeOut(aturan), run_time=0.8)
            b.main(Write(soal), run_time=2.4)
            b.main(FadeIn(bagian, shift=UP * 0.25), run_time=1.6)
            b.main(Indicate(bagian, color=AKSEN2), run_time=1.8)
            papan.baris(r"u = x^2+1,\ v = x-3", warna=AKSEN2, b=b)
        qc.periksa_adegan(self, {"soal": soal, "bagian": bagian},
                          hud=hud_dengan_papan(ident, papan))

        # ================= susun ========================================= #
        turunanya = rumus(r"u' = 2x,\ \ v' = 1", 32, AKSEN).move_to([0, -1.7, 0])
        susun = rumus(r"2x(x-3) + (x^2+1)", 40, TINTA).move_to([0, 0.9, 0])
        sinema.batasi_lebar(susun, 9.0)

        with sinema.babak(self, "susun", DURASI) as b:
            b.main(FadeIn(turunanya, shift=UP * 0.25), run_time=1.6)
            b.main(Indicate(turunanya, color=AKSEN), run_time=1.6)
            b.main(FadeOut(soal), run_time=0.8)
            b.main(Write(susun), run_time=2.8)
            papan.baris(r"u'v + uv'", warna=TINTA, b=b)
            b.main(Indicate(susun, color=TINTA), run_time=1.6)
        qc.periksa_adegan(self, {"susun": susun, "bagian": bagian, "turunan": turunanya},
                          hud=hud_dengan_papan(ident, papan))

        # ================= rapikan ======================================= #
        with sinema.babak(self, "rapikan", DURASI) as b:
            susun = sinema.ganti_rumus(self, susun, r"3x^2 - 6x + 1", b=b, run_time=2.6)
            b.main(Indicate(susun, color=TINTA), run_time=1.6)
        qc.periksa_adegan(self, {"hasil": susun, "bagian": bagian, "turunan": turunanya},
                          hud=hud_dengan_papan(ident, papan))

        # ================= periksa: jalan kedua ========================== #
        jalan2 = rumus(r"x^3 - 3x^2 + x - 3", 36, REDUP).move_to([0, -0.6, 0])

        with sinema.babak(self, "periksa", DURASI) as b:
            b.main(FadeOut(bagian), FadeOut(turunanya), run_time=0.8)
            b.main(Write(jalan2), run_time=2.6)
            jalan2 = sinema.ganti_rumus(self, jalan2, r"3x^2 - 6x + 1", b=b,
                                        run_time=2.6, warna=AKSEN)
            b.main(Indicate(susun, color=AKSEN), Indicate(jalan2, color=AKSEN),
                   run_time=1.6)
        qc.periksa_adegan(self, {"hasil": susun, "jalan kedua": jalan2},
                          hud=hud_dengan_papan(ident, papan))

        # ================= tutup: hasil bagi ada di halaman ============== #
        bagi = rumus(r"\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}", 46, SOROT)
        bagi.move_to([0, 0.3, 0])
        sinema.batasi_lebar(bagi, 9.0)

        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(susun), FadeOut(jalan2), run_time=0.8)
            b.main(Write(bagi), run_time=2.8)
            b.main(Indicate(bagi, color=SOROT), run_time=1.8)
            papan.baris(r"v \ne 0", warna=SOROT, b=b)
            b.main(Indicate(bagi, color=SOROT), run_time=1.5)
        qc.periksa_adegan(self, {"hasil bagi": bagi}, hud=hud_dengan_papan(ident, papan))
