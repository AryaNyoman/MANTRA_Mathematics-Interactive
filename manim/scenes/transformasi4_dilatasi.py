"""Video 04 Transformasi Geometri, Materi 07 "Memperbesar dan memperkecil".

TUGAS VIDEO INI
Menyampaikan satu angka yang paling sering ditulis salah: luas berubah k
KUADRAT kali, bukan k kali. Karena itu babak "luas" dan "pizza" adalah
puncaknya. Sisi AB dan luasnya ditampilkan berdampingan supaya bedanya
terlihat, bukan dihafal.

TANPA 3D. Panjang dan luas harus akurat.

DIPERPANJANG 6 SEPTEMBER 2026, 63 -> 137 DETIK, 10 -> 17 BABAK
Video ini dulu separuh panjang lima video lain di topik yang sama, dan yang
hilang bukan basa-basi melainkan setengah isi halamannya: aturan
(x, y) -> (kx, ky) tidak pernah diuji pada satu titik pun, watak faktor satu
tidak disebut, contoh pusat BUKAN titik asal tidak ada, dan kekeliruan "lupa
pusat" yang justru paling sering terjadi juga tidak ada.

Angka contoh dan angka kekeliruannya DIAMBIL DARI HALAMAN, bukan dikarang:
A(2, 1) dengan k = 3 berpusat di M(1, 1) memberi A'(4, 1), sedangkan yang
mengalikan koordinatnya langsung memberi (6, 3). Keduanya diperiksa mesin
lewat `alat/cek_transformasi.py`, awalan M07 untuk halaman dan V04 untuk video.

TIGA FASE KAMERA
Dilatasi faktor 2 melempar bentuknya sampai x = 12; faktor setengah dan faktor
negatif memakai daerah yang sama sekali berbeda; contoh pusat bukan titik asal
memakai daerah yang lebih rapat lagi supaya angkanya terbaca. Ketiganya muncul
bergantian, jadi kameranya ikut berpindah.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
from transformasi_umum import (  # noqa: E402
    L, NAMA_SUDUT, bidang_untuk, kosongkan_papan, letak_peta, poligon,
    tempel_label, titik3,
)

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "transformasi4-dilatasi"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

KOTAK_A = (0.0, 13.0, 0.0, 7.0)     # prapeta dan peta faktor 2
KOTAK_B = (-7.0, 7.0, -4.0, 4.0)    # peta faktor setengah dan faktor negatif
KOTAK_C = (0.0, 8.0, 0.0, 5.0)      # pusat bukan titik asal, dan kekeliruannya

# Contoh pusat bukan titik asal, SAMA PERSIS dengan halaman Materi 07.
M = (1.0, 1.0)
A_TITIK = (2.0, 1.0)
K_LAIN = 3.0
# Persegi satuan bersudut di A. Dipakai supaya babak "lain" dan "keliru" punya
# kejadian seukuran bentuk, bukan cuma titik: sebuah titik berjari-jari 0,1
# hanya sekitar seratus piksel, jauh di bawah ambang alat ukur gerak.
KOTAK_KECIL = [(2.0, 1.0), (3.0, 1.0), (3.0, 2.0), (2.0, 2.0)]


def dilat(p, k):
    return (k * p[0], k * p[1])


def dilat_pusat(p, k, pusat):
    return (pusat[0] + k * (p[0] - pusat[0]), pusat[1] + k * (p[1] - pusat[1]))


def luas(titik):
    """Luas poligon dengan rumus tali sepatu, tidak pernah negatif.

    Dihitung, tidak ditulis tangan. Angka luas di video ini diklaim di panel
    rumus dan diucapkan narator, dan angka yang ditulis tangan bisa berbeda
    dari bentuk yang benar-benar tergambar. Klaimnya juga diperiksa mesin
    lewat `alat/cek_transformasi.py` dengan awalan V04.
    """
    n = len(titik)
    jumlah = 0.0
    for i in range(n):
        x1, y1 = titik[i]
        x2, y2 = titik[(i + 1) % n]
        jumlah += x1 * y2 - x2 * y1
    return abs(jumlah) / 2


class TransformasiDilatasi(AdeganMatra):
    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)

        peta2 = [dilat(p, 2.0) for p in L]
        peta_kecil = [dilat(p, 0.5) for p in L]
        peta_negatif = [dilat(p, -1.0) for p in L]

        pusat_a, tinggi_a = letak_peta(*KOTAK_A)
        bidang = bidang_untuk(*KOTAK_A)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat_a, tinggi=tinggi_a)

        asal = np.array([0.0, 0.0, 0.03])

        # --- buka -------------------------------------------------------- #
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(3.0, DURASI["buka"] - 0.6)
            sinema.judul_pembuka(self, "Materi 07: Memperbesar dan memperkecil", lama=lama)
            b.catat(lama)

        # --- foto: bentuknya muncul, pusatnya ditandai -------------------- #
        prapeta = poligon(L, TINTA, tebal=3.2, isian=0.08)
        nama_pra = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(huruf, warna=TINTA)
            t.next_to(titik3(L[i]), DOWN if i < 2 else UP, buff=0.22)
            nama_pra[huruf] = t

        # CUBITAN DUA JARI ITU DIPERAGAKAN, TIDAK CUMA DIUCAPKAN.
        #
        # Versi sebelumnya cuma memunculkan bidang dan bentuknya, lalu DIAM
        # 12,2 detik menembus dua babak sekaligus, sementara narator berbicara
        # tentang memperbesar foto dan tentang titik yang tidak bergerak.
        # Terukur `alat/ukur_detik_pertama.py`, dan itu rentang diam terpanjang
        # di seluruh enam video topik ini.
        #
        # Bukan cuma angkanya yang buruk. Kalimat "ada satu titik yang tidak
        # bergerak" hanya bisa dibuktikan kalau ada yang BERGERAK di sebelahnya;
        # layar yang diam membuat kalimat itu tidak bisa diperiksa siswa.
        # Sekarang bentuknya membesar lalu mengecil kembali terhadap titik
        # asal, persis seperti foto yang dicubit dua jari.
        #
        # Label sudut A, B, C ditunda ke babak "sinar". Label adalah benda
        # dunia yang TIDAK ikut membesar, jadi ia akan lepas dari sudutnya
        # selama cubitan berlangsung. Ketiga babak awal juga tidak menyebut
        # satu pun nama sudut.
        with sinema.babak(self, "foto", DURASI) as b:
            b.main(FadeIn(bidang), run_time=0.8)
            b.main(ShowCreation(prapeta), run_time=1.4)
            ident = sinema.identitas(self, "1 petak = 1 satuan")
            b.main(prapeta.animate.scale(1.3, about_point=asal), run_time=1.2)
            b.main(prapeta.animate.scale(1.0 / 1.3, about_point=asal), run_time=1.2)
        qc.periksa_adegan(self, {"prapeta": prapeta},
                          hud={"identitas": ident}, dunia={"bidang": bidang})

        # --- pusat: titik yang tidak bergerak ---------------------------- #
        tanda_pusat = Dot(asal, radius=0.10).set_color(SOROT)
        l_pusat = sinema.label("pusat", warna=SOROT)
        l_pusat.next_to(asal, UP, buff=0.26)

        # Cubitan diulang SESUDAH pusatnya ditandai, dan itu inti babak ini:
        # sekarang mata punya tempat untuk melihat bahwa satu titik memang
        # tinggal diam sementara seluruh sisanya bergerak.
        with sinema.babak(self, "pusat", DURASI) as b:
            b.main(FadeIn(tanda_pusat, scale=0.4), FadeIn(l_pusat), run_time=1.0)
            b.main(prapeta.animate.scale(1.3, about_point=asal), run_time=1.3)
            b.main(prapeta.animate.scale(1.0 / 1.3, about_point=asal), run_time=1.3)
            b.main(Indicate(prapeta, color=SOROT), run_time=1.2)
        qc.periksa_adegan(self, {"prapeta": prapeta, "label pusat": l_pusat},
                          hud={"identitas": ident}, dunia={"bidang": bidang})

        # --- sinar: garis dari pusat melewati tiap sudut ------------------ #
        # Ditarik SAMPAI titik peta, bukan berhenti di prapeta. Kalau berhenti,
        # siswa cuma melihat enam ruas lepas; kalau diteruskan, ia melihat
        # keenam titik memang meluncur di garis yang sama. Itu gagasan pokok
        # dilatasi, dan gambarnya yang harus menyampaikannya.
        sinar = VGroup(*[
            Line(asal, titik3(peta2[i])).set_stroke(REDUP, 1.6)
            for i in range(len(L))
        ])

        # Nama sudutnya baru muncul DI SINI, sesudah cubitan selesai. Kalimat
        # babak ini menyebut "tiap sudut bentuknya", jadi di sinilah nama sudut
        # pertama kali berguna.
        with sinema.babak(self, "sinar", DURASI) as b:
            b.main(*[FadeIn(nama_pra[h]) for h in nama_pra], run_time=0.8)
            b.main(*[ShowCreation(s) for s in sinar], run_time=1.8)
            b.main(Indicate(prapeta, color=AKSEN2), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta},
                          hud={"identitas": ident},
                          dunia={"bidang": bidang, "sinar": sinar})

        # --- meluncur: tiap titik berjalan di garisnya sendiri ------------ #
        titik_jalan = [Dot(titik3(p), radius=0.07).set_color(AKSEN2) for p in L]
        for d in titik_jalan:
            self.add(d)

        with sinema.babak(self, "meluncur", DURASI) as b:
            b.main(
                *[d.animate.move_to(titik3(peta2[i])) for i, d in enumerate(titik_jalan)],
                run_time=max(2.0, DURASI["meluncur"] - 2.6),
            )
            b.main(Indicate(prapeta, color=AKSEN), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta},
                          hud={"identitas": ident},
                          dunia={"bidang": bidang, "sinar": sinar})

        # --- dua: petanya utuh, dan sisi AB benar-benar DIUKUR ------------ #
        # Angka 5 dan 10 dulu cuma tertulis di panel. Sekarang keduanya ada
        # sebagai ruas di atas sisinya sendiri, jadi siswa bisa menghitung
        # petaknya dan memeriksa angkanya, bukan mempercayainya.
        peta_besar = poligon(peta2, AKSEN2, tebal=3.2, isian=0.12)
        nama_besar = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(f"{huruf}'", warna=AKSEN2)
            t.next_to(titik3(peta2[i]), DOWN if i < 2 else UP, buff=0.22)
            nama_besar[huruf] = t

        ruas_ab = Line(titik3(L[0]), titik3(L[1])).set_stroke(AKSEN, 4.0)
        angka_ab = sinema.label("5", warna=AKSEN)
        angka_ab.next_to(ruas_ab.get_center(), UP, buff=0.20)
        ruas_ab2 = Line(titik3(peta2[0]), titik3(peta2[1])).set_stroke(AKSEN, 4.0)
        angka_ab2 = sinema.label("10", warna=AKSEN)
        angka_ab2.next_to(ruas_ab2.get_center(), UP, buff=0.20)

        with sinema.babak(self, "dua", DURASI) as b:
            b.main(
                ShowCreation(peta_besar), *[FadeIn(nama_besar[h]) for h in nama_besar],
                run_time=1.6,
            )
            b.main(ShowCreation(ruas_ab), FadeIn(angka_ab), run_time=1.2)
            b.main(ShowCreation(ruas_ab2), FadeIn(angka_ab2), run_time=1.2)
            b.main(Indicate(peta_besar, color=SOROT), run_time=1.4)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "peta": peta_besar},
            hud={"identitas": ident},
            tulisan={"angka AB": angka_ab, "angka A'B'": angka_ab2},
            dunia={"bidang": bidang, "sinar": sinar},
        )

        # --- aturan: rumusnya lahir di dekat bentuknya lalu terbang -------- #
        with sinema.babak(self, "aturan", DURASI) as b:
            rum = sinema.lahir_rumus(
                self, r"(x,\ y) \to (kx,\ ky)",
                dekat=peta_besar, papan=papan, b=b, warna=AKSEN2,
            )
            b.main(Indicate(prapeta, color=AKSEN2), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_besar},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang, "sinar": sinar})

        # --- uji: aturannya diuji pada titik B ---------------------------- #
        # Kotak bacanya ada dua, dari titik asal ke B dan dari titik asal ke
        # B aksen. Keduanya memperlihatkan angka yang sedang dibicarakan
        # sebagai LUAS di layar, bukan sebagai tulisan: enam jadi dua belas,
        # satu jadi dua. Kotak juga cukup besar untuk terbaca alat ukur gerak,
        # sedangkan titik berjari-jari 0,13 tidak.
        B = L[1]
        B_peta = peta2[1]
        kotak_b1 = poligon([(0.0, 0.0), (B[0], 0.0), (B[0], B[1]), (0.0, B[1])],
                           AKSEN2, tebal=1.5, isian=0.10)
        kotak_b2 = poligon(
            [(0.0, 0.0), (B_peta[0], 0.0), (B_peta[0], B_peta[1]), (0.0, B_peta[1])],
            SOROT, tebal=1.5, isian=0.08)
        dot_b = Dot(titik3(B), radius=0.12).set_color(AKSEN)
        dot_b2 = Dot(titik3(B_peta), radius=0.12).set_color(AKSEN)

        with sinema.babak(self, "uji", DURASI) as b:
            b.main(FadeOut(ruas_ab), FadeOut(angka_ab),
                   FadeOut(ruas_ab2), FadeOut(angka_ab2), run_time=0.6)
            b.main(FadeIn(dot_b), ShowCreation(kotak_b1), run_time=1.2)
            papan.baris(r"B(6,\ 1) \to B'(12,\ 2)", warna=AKSEN, b=b)
            b.main(FadeIn(dot_b2), ShowCreation(kotak_b2), run_time=1.2)
            b.main(Indicate(kotak_b2, color=AKSEN), run_time=1.4)
            b.main(Indicate(peta_besar, color=SOROT), run_time=1.4)
        qc.periksa_adegan(
            self,
            {"prapeta": prapeta, "peta": peta_besar,
             "kotak B": kotak_b1, "kotak B aksen": kotak_b2},
            hud={"identitas": ident, "papan": papan.semua()},
            dunia={"bidang": bidang, "sinar": sinar},
        )

        # --- luas: angka yang paling sering ditulis salah ----------------- #
        luas_pra = luas(L)
        luas_peta = luas(peta2)

        with sinema.babak(self, "luas", DURASI) as b:
            b.main(FadeOut(kotak_b1), FadeOut(kotak_b2),
                   FadeOut(dot_b), FadeOut(dot_b2), run_time=0.6)
            papan.baris(
                rf"AB:\ 5 \to 10\ \ (2\times)", warna=AKSEN2, b=b,
            )
            papan.baris(
                rf"\text{{luas}}:\ {luas_pra:.0f} \to {luas_peta:.0f}\ \ (4\times)",
                warna=SOROT, b=b,
            )
            b.main(Indicate(peta_besar, color=SOROT), run_time=1.4)
            b.main(Indicate(prapeta, color=AKSEN), run_time=1.2)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_besar},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang, "sinar": sinar})

        with sinema.babak(self, "pizza", DURASI) as b:
            papan.baris(r"4 = 2^2,\ \text{bukan } 2", warna=SOROT, b=b)
            b.main(Indicate(peta_besar, color=AKSEN), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_besar},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang, "sinar": sinar})

        # --- bentuk: sudutnya tetap, jadi bentuknya bentuk yang sama ------ #
        # Sudut siku-siku di A dan di A aksen ditandai busur, dan keduanya
        # memang sudut yang sama. Itu bukti termurah bahwa dilatasi tidak
        # memiringkan apa pun: yang berubah cuma jaraknya ke pusat.
        busur_a = Arc(start_angle=0, angle=PI / 2, radius=0.45,
                      arc_center=titik3(L[0])).set_stroke(SOROT, 3.0)
        busur_a2 = Arc(start_angle=0, angle=PI / 2, radius=0.90,
                       arc_center=titik3(peta2[0])).set_stroke(SOROT, 3.0)

        with sinema.babak(self, "bentuk", DURASI) as b:
            kosongkan_papan(self, papan, b=b, run_time=0.6)
            b.main(ShowCreation(busur_a), ShowCreation(busur_a2), run_time=1.4)
            papan.baris(r"\text{sudut tetap},\ \text{ukuran} \times 2", warna=AKSEN2, b=b)
            b.main(Indicate(prapeta, color=AKSEN2), run_time=1.4)
            b.main(Indicate(peta_besar, color=AKSEN), run_time=1.4)
            b.main(Indicate(peta_besar, color=SOROT), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_besar},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang, "sinar": sinar, "busur": busur_a2})

        # --- kecil: faktor setengah, kamera berpindah --------------------- #
        pusat_b, tinggi_b = letak_peta(*KOTAK_B)
        bidang_b = bidang_untuk(*KOTAK_B)
        peta_setengah = poligon(peta_kecil, AKSEN2, tebal=3.0, isian=0.12)
        sinar_b = VGroup(*[
            Line(asal, titik3(peta_negatif[i])).set_stroke(REDUP, 1.6)
            for i in range(len(L))
        ])

        with sinema.babak(self, "kecil", DURASI) as b:
            b.main(
                FadeOut(peta_besar), *[FadeOut(nama_besar[h]) for h in nama_besar],
                *[FadeOut(d) for d in titik_jalan],
                FadeOut(sinar), FadeOut(busur_a), FadeOut(busur_a2),
                run_time=0.8,
            )
            b.main(
                kamera.dunia_ke_peta(frame, pusat=pusat_b, tinggi=tinggi_b),
                FadeOut(bidang), FadeIn(bidang_b),
                run_time=max(1.4, DURASI["kecil"] - 3.6),
            )
            b.main(ShowCreation(peta_setengah), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta kecil": peta_setengah},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_b})

        # --- satu: faktor satu tidak mengubah apa pun --------------------- #
        # Cubitan dipakai lagi di sini, dan kali ini artinya berbeda: bukan
        # memperkenalkan pusat, melainkan memperlihatkan batas antara mengecil
        # dan membesar. Skalanya 1,15 dan bukan lebih, sebab bentuk berskala
        # 1,4 sudah menjangkau x = 8,4 dan keluar dari kotak ini.
        with sinema.babak(self, "satu", DURASI) as b:
            b.main(Indicate(prapeta, color=SOROT), run_time=1.4)
            papan.baris(r"0 < k < 1:\ \text{mengecil}", warna=AKSEN2, b=b)
            b.main(prapeta.animate.scale(1.15, about_point=asal), run_time=1.3)
            papan.baris(r"k > 1:\ \text{membesar}", warna=AKSEN, b=b)
            b.main(prapeta.animate.scale(1.0 / 1.15, about_point=asal), run_time=1.3)
            b.main(Indicate(peta_setengah, color=AKSEN), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta kecil": peta_setengah},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_b})

        # --- negatif: bentuknya dilempar menyeberangi pusatnya ------------ #
        peta_seberang = poligon(peta_negatif, SOROT, tebal=3.0, isian=0.12)

        with sinema.babak(self, "negatif", DURASI) as b:
            b.main(FadeOut(peta_setengah), run_time=0.6)
            b.main(
                ShowCreation(sinar_b), ShowCreation(peta_seberang),
                run_time=1.8,
            )
            b.main(Indicate(peta_seberang, color=AKSEN2), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta seberang": peta_seberang},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_b, "sinar": sinar_b})

        # --- lain: pusatnya BUKAN titik asal ------------------------------ #
        # Bagian yang paling sering keluar di soal, dan yang dulu tidak ada
        # sama sekali di video ini. Angkanya diambil dari halaman Materi 07,
        # bukan dikarang: A(2, 1), faktor 3, pusat M(1, 1), hasilnya A'(4, 1).
        #
        # Yang digambar sebuah PERSEGI bersudut di A, bukan titik telanjang.
        # Sebabnya dua: persegi cukup besar untuk terbaca alat ukur gerak, dan
        # ia memperlihatkan bahwa yang dikalikan tiga adalah JARAK ke M, sebab
        # sisinya ikut menjadi tiga kali.
        pusat_c, tinggi_c = letak_peta(*KOTAK_C)
        bidang_c = bidang_untuk(*KOTAK_C)

        kecil_c = poligon(KOTAK_KECIL, TINTA, tebal=3.0, isian=0.08)
        besar_c = poligon([dilat_pusat(p, K_LAIN, M) for p in KOTAK_KECIL],
                          AKSEN2, tebal=3.0, isian=0.12)
        # ARAH KETIGA LABEL DIPILIH TANGAN, dan ruangnya sempit.
        #
        # A(2, 1) adalah sudut KIRI BAWAH persegi kecilnya, jadi label di
        # atasnya jatuh TEPAT DI DALAM persegi itu dan tertutup isiannya.
        # `qc.periksa_adegan` tidak menangkap hal semacam ini dengan sengaja:
        # label yang menempel pada bendanya memang normal. Yang menjaga di sini
        # pemilihan arahnya.
        #
        # Ke bawah pun tidak bisa untuk ketiganya sekaligus: M(1, 1) dan
        # A(2, 1) cuma berjarak satu satuan, sedangkan label selebar 1,2. Jadi
        # M ke atas, A dan A aksen ke bawah.
        dot_m = Dot(titik3(M), radius=0.12).set_color(SOROT)
        l_m = tempel_label(sinema.label("M(1, 1)", warna=SOROT), dot_m, UP, buff=0.22)
        dot_a = Dot(titik3(A_TITIK), radius=0.12).set_color(TINTA)
        l_a = sinema.label("A(2, 1)", warna=TINTA)
        l_a.next_to(titik3(A_TITIK), DOWN, buff=0.30)
        A_PETA = dilat_pusat(A_TITIK, K_LAIN, M)
        dot_a2 = Dot(titik3(A_PETA), radius=0.12).set_color(AKSEN2)
        l_a2 = sinema.label("A'(4, 1)", warna=AKSEN2)
        l_a2.next_to(titik3(A_PETA), DOWN, buff=0.30)
        garis_m = DashedLine(titik3(M), titik3((7.4, 1.0))).set_stroke(REDUP, 2.0)

        with sinema.babak(self, "lain", DURASI) as b:
            kosongkan_papan(self, papan, b=b, run_time=0.6)
            b.main(
                FadeOut(prapeta), *[FadeOut(nama_pra[h]) for h in nama_pra],
                FadeOut(peta_seberang), FadeOut(sinar_b),
                FadeOut(tanda_pusat), FadeOut(l_pusat),
                run_time=0.8,
            )
            b.main(
                kamera.dunia_ke_peta(frame, pusat=pusat_c, tinggi=tinggi_c),
                FadeOut(bidang_b), FadeIn(bidang_c),
                run_time=1.6,
            )
            b.main(FadeIn(dot_m), FadeIn(l_m), ShowCreation(garis_m), run_time=1.0)
            b.main(ShowCreation(kecil_c), FadeIn(dot_a), FadeIn(l_a), run_time=1.2)
            # Rumus utama diganti, TIDAK di-morph. Antara "(x, y) -> (kx, ky)"
            # dan bentuk berpusat sembarang hampir tidak ada lambang yang sama,
            # dan `ganti_rumus` pada dua rumus semacam itu menghasilkan
            # tumpukan coretan, bukan perpindahan.
            b.main(FadeOut(rum), run_time=0.5)
            papan.utama = None
            rum = papan.tumbuh(r"A' = M + k\,(A - M)", run_time=1.0, b=b)
            b.main(ShowCreation(besar_c), FadeIn(dot_a2), FadeIn(l_a2), run_time=1.4)
        qc.periksa_adegan(
            self, {"persegi": kecil_c, "peta": besar_c, "pusat M": dot_m},
            hud={"identitas": ident, "papan": papan.semua()},
            tulisan={"label M": l_m, "label A": l_a, "label A aksen": l_a2},
            dunia={"bidang": bidang_c, "garis": garis_m},
        )

        # --- keliru: koordinatnya dikalikan langsung ---------------------- #
        # Titik salahnya (6, 3), dan letaknya sendiri yang membuktikan ia
        # salah: ia TIDAK berada pada garis dari M lewat A. Semua peta dilatasi
        # berpusat M wajib berada di garis itu, dan siswa bisa memeriksanya
        # dengan mata tanpa menghitung apa pun.
        SALAH = dilat(A_TITIK, K_LAIN)
        dot_salah = Dot(titik3(SALAH), radius=0.13).set_color(AKSEN)
        l_salah = sinema.label("(6, 3)", warna=AKSEN)
        l_salah.next_to(titik3(SALAH), UP, buff=0.28)
        garis_salah = DashedLine(titik3(M), titik3(SALAH)).set_stroke(AKSEN, 2.0)

        with sinema.babak(self, "keliru", DURASI) as b:
            b.main(FadeIn(dot_salah), FadeIn(l_salah), run_time=1.0)
            b.main(ShowCreation(garis_salah), run_time=1.2)
            papan.baris(r"\text{salah}:\ 3 \times (2,\ 1) = (6,\ 3)", warna=AKSEN, b=b)
            b.main(Indicate(besar_c, color=SOROT), run_time=1.4)
            papan.baris(r"\text{benar}:\ A'(4,\ 1)", warna=AKSEN2, b=b)
            b.main(Indicate(kecil_c, color=AKSEN2), run_time=1.4)
            b.main(Indicate(besar_c, color=AKSEN), run_time=1.4)
        qc.periksa_adegan(
            self,
            {"persegi": kecil_c, "peta": besar_c, "titik salah": dot_salah},
            hud={"identitas": ident, "papan": papan.semua()},
            tulisan={"label M": l_m, "label A": l_a, "label A aksen": l_a2,
                     "label salah": l_salah},
            dunia={"bidang": bidang_c, "garis": garis_m, "garis salah": garis_salah},
        )

        # --- rangkum: satu kalimat, lalu satu pertanyaan ------------------ #
        # Pertanyaan penutupnya SENGAJA bukan "ke mana titik di pusat pergi",
        # sebab video 03 sudah menutup dengan pertanyaan itu. Yang ditanyakan
        # di sini justru gagasan pokok video ini: luas berubah k kuadrat kali,
        # jadi luas 25 kali berarti faktornya 5.
        sinar_c = VGroup(*[
            Line(titik3(M), titik3(dilat_pusat(p, K_LAIN, M))).set_stroke(REDUP, 1.6)
            for p in KOTAK_KECIL
        ])

        with sinema.babak(self, "rangkum", DURASI) as b:
            kosongkan_papan(self, papan, b=b, run_time=0.6)
            b.main(FadeOut(dot_salah), FadeOut(l_salah), FadeOut(garis_salah),
                   run_time=0.8)
            b.main(ShowCreation(sinar_c), run_time=1.6)
            b.main(Indicate(kecil_c, color=AKSEN2), run_time=1.4)
            b.main(Indicate(besar_c, color=SOROT), run_time=1.4)
            papan.baris(r"\text{luas} \times 25 \Rightarrow k = ?", warna=AKSEN, b=b)
            b.main(Indicate(besar_c, color=AKSEN), run_time=1.4)
            b.main(Indicate(kecil_c, color=SOROT), run_time=1.4)
        qc.periksa_adegan(
            self, {"persegi": kecil_c, "peta": besar_c, "pusat M": dot_m},
            hud={"identitas": ident, "papan": papan.semua()},
            tulisan={"label M": l_m, "label A": l_a, "label A aksen": l_a2},
            dunia={"bidang": bidang_c, "garis": garis_m, "sinar": sinar_c},
        )
