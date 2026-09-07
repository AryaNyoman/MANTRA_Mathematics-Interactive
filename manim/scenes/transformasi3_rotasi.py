"""Video 03 Transformasi Geometri, Materi 06 "Memutar terhadap sebuah pusat".

TUGAS VIDEO INI
Menagih janji yang dibuat Materi 04: rotasi setengah putaran sama persis dengan
pencerminan pada titik asal. Karena itu babak "janji" dan "sama" adalah
puncaknya, bukan babak rumus. Rumusnya cuma cara menuliskan yang sudah dilihat.

TANPA 3D. Sudut dan jarak harus akurat, dan kamera miring merusak keduanya.

Letak kamera dari `transformasi_umum.letak_peta`, tidak dihitung ulang di sini.

ENAM KOTAK KAMERA, DAN ITU BUKAN KERUMITAN YANG DICARI-CARI
Rotasi memindahkan benda ke seberang pusatnya, jadi prapeta dan petanya nyaris
tidak pernah berdekatan. Satu kotak yang menampung SEMUA peta dalam video ini
(90, 180, 270 derajat, dan yang salah arah) berukuran 11 kali 14 satuan, dan
pada ukuran itu bentuk L-nya menciut jadi sepersepuluh lebar layar: sumbunya
masih terbaca, koordinat sudutnya tidak. Karena peta-peta itu muncul
BERGANTIAN, bukan bersamaan, kameranya boleh ikut berpindah dan tiap contoh
dapat ruang yang layak.

Perpindahan kamera juga sekaligus menjawab syarat kejadian besar tiap babak
(`transformasi_umum` butir 5): ia mengubah seluruh layar.

KENAPA BABAK "KELIRU" MEMAKAI JARUM JAM, BUKAN BENTUK L
Kalimatnya sendiri berbunyi "searah jarum jam", jadi jarum jam adalah benda
yang paling tepat, bukan pengganti yang terpaksa. Ada alasan kedua: hasil putar
+90 dan -90 pada bentuk L terpisah 12 satuan, dan menampilkan keduanya
sekaligus memaksa kamera mundur sampai bentuknya tinggal sepersepuluh layar.
Jarum sepanjang 4 satuan cuma butuh 10 satuan tegak.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E403,F403
from gl import kamera, qc, sinema  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
from transformasi_umum import (  # noqa: E402
    L, NAMA_SUDUT, bidang_untuk, juring, kosongkan_papan, letak_peta, poligon,
    tempel_label, titik3,
)

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "transformasi3-rotasi"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

KOTAK_A = (-4.0, 7.0, -1.0, 7.0)   # jarum, bentuk, peta 90 derajat, uji titik B
KOTAK_C = (-1.0, 7.0, -7.0, 3.0)   # contoh kedua: peta 270 derajat, turun ke bawah
KOTAK_B = (-7.0, 7.0, -4.0, 4.0)   # setengah putaran, puncak videonya
KOTAK_D = (-2.0, 5.0, -5.0, 5.0)   # kekeliruan arah, memakai jarum jam lagi
KOTAK_E = (-3.0, 7.0, -3.0, 6.0)   # pusat bukan titik asal: geser, putar, geser balik
KOTAK_H = (-2.0, 7.0, 0.0, 6.0)    # rangkuman dan pertanyaan penutup, gambar terbesar

TEBAL_BENTUK = 3.2
JARI_B = (L[1][0] ** 2 + L[1][1] ** 2) ** 0.5   # jarak titik B ke pusat


def putar(p, derajat):
    """Rotasi terhadap titik asal, TEPAT di kelipatan 90 derajat.

    Nilai cos dan sin dijawab dari daftar, bukan dihitung. `cos` pada 90 derajat
    memberi 6,1e-17 dan bukan nol, dan debu sebesar itu muncul di koordinat
    sebagai 0,0000000000000001. Alasan yang sama dipakai modul widgetnya,
    `web/components/widget/transformasi-geometri/matriks.ts`.
    """
    sisa = int(derajat) % 360
    tabel = {0: (1, 0), 90: (0, 1), 180: (-1, 0), 270: (0, -1)}
    if sisa not in tabel:
        raise ValueError(f"babak ini hanya memakai sudut kelipatan 90, bukan {derajat}")
    c, s = tabel[sisa]
    return (p[0] * c - p[1] * s, p[0] * s + p[1] * c)


def putar_bebas(p, derajat):
    """Rotasi terhadap titik asal untuk sudut SEMBARANG, dipakai babak terakhir."""
    a = derajat * DEGREES
    return (p[0] * np.cos(a) - p[1] * np.sin(a), p[0] * np.sin(a) + p[1] * np.cos(a))


def geser(titik, dx, dy):
    return [(x + dx, y + dy) for x, y in titik]


class TransformasiRotasi(AdeganMatra):
    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        asal = np.array([0.0, 0.0, 0.03])

        peta90 = [putar(p, 90) for p in L]
        peta270 = [putar(p, 270) for p in L]
        peta180 = [putar(p, 180) for p in L]

        pusat_a, tinggi_a = letak_peta(*KOTAK_A)
        bidang_a = bidang_untuk(*KOTAK_A)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat_a, tinggi=tinggi_a)

        # --- buka -------------------------------------------------------- #
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(3.0, DURASI["buka"] - 0.6)
            sinema.judul_pembuka(self, "Materi 06: Memutar terhadap sebuah pusat", lama=lama)
            b.catat(lama)

        # --- jarum: satu jarum jam di (4, 0) ------------------------------ #
        jarum = Arrow(asal, np.array([4.0, 0.0, 0.03]), buff=0, thickness=5).set_color(AKSEN)
        # Labelnya ditempel ke UJUNG jarum, bukan ke jarumnya. Kotak batas
        # sebuah panah membentang dari pangkal sampai ujung, jadi menempel ke
        # panahnya menaruh "(4, 0)" di bawah TENGAH jarum, yaitu di bawah titik
        # (2, 0), dan labelnya berbohong tentang koordinat yang ditunjuknya.
        ujung = Dot(np.array([4.0, 0.0, 0.03]), radius=0.10).set_color(AKSEN)
        l_jarum = tempel_label(sinema.label("(4, 0)", warna=AKSEN), ujung, DOWN, buff=0.20)

        # Daerah yang akan disapu seperempat putaran. Juring, bukan busur:
        # busur setebal 3,0 tidak terbaca alat ukur gerak, juring terbaca.
        # Lihat `transformasi_umum.juring`.
        sapu_a = poligon(juring(4.0, 0.0, PI / 2), SOROT, tebal=2.0, isian=0.10)

        with sinema.babak(self, "jarum", DURASI) as b:
            b.main(FadeIn(bidang_a), run_time=0.8)
            b.main(GrowArrow(jarum), FadeIn(ujung), FadeIn(l_jarum), run_time=1.4)
            ident = sinema.identitas(self, "1 petak = 1 satuan")
            b.main(ShowCreation(sapu_a), run_time=1.8)
            b.main(Indicate(jarum, color=SOROT), run_time=1.2)
        qc.periksa_adegan(self, {"jarum": jarum, "sapuan": sapu_a},
                          hud={"identitas": ident},
                          tulisan={"label jarum": l_jarum},
                          dunia={"bidang": bidang_a})

        # --- jawab: jarumnya berputar seperempat putaran ------------------ #
        l_jawab = sinema.label("(0, 4)", warna=AKSEN)
        l_jawab.next_to(np.array([0.0, 4.0, 0.03]), RIGHT, buff=0.24)

        with sinema.babak(self, "jawab", DURASI) as b:
            b.main(
                Rotate(jarum, PI / 2, about_point=asal),
                Rotate(ujung, PI / 2, about_point=asal),
                FadeOut(l_jarum), FadeIn(l_jawab),
                run_time=1.8,
            )
            b.main(Indicate(sapu_a, color=AKSEN), run_time=1.2)
            b.main(FadeOut(sapu_a), run_time=0.8)
        qc.periksa_adegan(self, {"jarum": jarum},
                          hud={"identitas": ident},
                          tulisan={"label jawab": l_jawab},
                          dunia={"bidang": bidang_a})

        # --- bentuk: bentuk L diputar 90 derajat -------------------------- #
        prapeta = poligon(L, TINTA, tebal=TEBAL_BENTUK, isian=0.08)
        nama_pra = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(huruf, warna=TINTA)
            t.next_to(titik3(L[i]), DOWN if i < 2 else UP, buff=0.22)
            nama_pra[huruf] = t

        # ARAH TIAP LABEL DIPILIH SATU PER SATU, dan itu bukan kerewelan.
        #
        # Peta 90 derajat berbentuk bar tegak x -2..-1 y 1..6 ditambah blok
        # x -3..-2 y 1..2. Menaruh label A' dan B' ke KIRI (pola yang dipakai
        # sebelum 5 Sep) menjatuhkan keduanya TEPAT DI DALAM bar itu, dan
        # isian poligon menutupinya. `qc.periksa_adegan` tidak menangkap hal
        # semacam ini dengan sengaja: label yang menempel pada bendanya adalah
        # hal yang normal, jadi benda dunia lawan benda dunia memang dibolehkan
        # bersentuhan. Yang menjaga di sini adalah pemilihan arahnya.
        peta_a = poligon(peta90, AKSEN2, tebal=TEBAL_BENTUK, isian=0.12)
        arah_a = {0: RIGHT, 1: RIGHT, 2: UP}
        nama_a = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(f"{huruf}'", warna=AKSEN2)
            t.next_to(titik3(peta90[i]), arah_a[i], buff=0.22)
            nama_a[huruf] = t

        with sinema.babak(self, "bentuk", DURASI) as b:
            # `ujung` IKUT DIBUANG di sini, dan itu bukan kerapian belaka.
            # Pada render pertama titik merah itu tertinggal di (0, 4) selama
            # SISA VIDEO: ia ikut berpindah kotak kamera, mendarat di tempat
            # yang tidak berarti apa-apa, dan tidak ada satu pun gerbang yang
            # menegur. Benda yang selesai tugasnya harus dibuang bersama benda
            # yang menemaninya, bukan satu per satu dari ingatan.
            b.main(
                FadeOut(jarum), FadeOut(ujung), FadeOut(l_jawab),
                ShowCreation(prapeta), *[FadeIn(nama_pra[h]) for h in nama_pra],
                run_time=1.6,
            )
            b.main(
                ShowCreation(peta_a), *[FadeIn(nama_a[h]) for h in nama_a],
                run_time=1.6,
            )
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_a},
                          hud={"identitas": ident}, dunia={"bidang": bidang_a})

        # --- jari: dua jarak ke pusat, dan keduanya SAMA ------------------ #
        # Dipakai titik B, sudut yang paling jauh dari pusat, sebab ruas
        # jari-jarinya paling panjang dan angkanya paling terbaca. Kesamaan
        # kedua angka inilah yang membedakan rotasi dari dilatasi di Materi 07.
        jari_1 = Line(asal, titik3(L[1])).set_stroke(AKSEN, 3.0)
        jari_2 = Line(asal, titik3(peta90[1])).set_stroke(AKSEN, 3.0)
        angka_1 = sinema.label(f"{JARI_B:.2f}".replace(".", ","), warna=AKSEN)
        angka_1.next_to(jari_1.get_center(), DOWN, buff=0.18)
        angka_2 = sinema.label(f"{JARI_B:.2f}".replace(".", ","), warna=AKSEN)
        angka_2.next_to(jari_2.get_center(), LEFT, buff=0.18)

        with sinema.babak(self, "jari", DURASI) as b:
            b.main(
                ShowCreation(jari_1), ShowCreation(jari_2),
                FadeIn(angka_1), FadeIn(angka_2),
                run_time=1.8,
            )
            b.main(Indicate(prapeta, color=AKSEN2), run_time=1.4)
            b.main(Indicate(peta_a, color=SOROT), run_time=1.4)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "peta": peta_a},
            hud={"identitas": ident},
            tulisan={"angka 1": angka_1, "angka 2": angka_2},
            dunia={"bidang": bidang_a},
        )

        # --- rumus -------------------------------------------------------- #
        with sinema.babak(self, "rumus", DURASI) as b:
            rum = sinema.lahir_rumus(
                self, r"(x,\ y) \to (-y,\ x)",
                dekat=peta_a, papan=papan, b=b, warna=AKSEN2,
            )
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_a},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_a})

        # --- periksa: aturannya diuji pada titik B ------------------------ #
        # Dua langkah aturannya DIPISAH jadi dua baris panel, sebab narator
        # memang menyebutnya dua langkah: "tukar dulu keduanya, lalu beri tanda
        # minus". Satu baris berisi hasil akhir saja akan menyembunyikan
        # langkah yang justru paling sering keliru.
        dot_b = Dot(titik3(L[1]), radius=0.13).set_color(AKSEN)

        with sinema.babak(self, "periksa", DURASI) as b:
            b.main(FadeOut(jari_1), FadeOut(jari_2),
                   FadeOut(angka_1), FadeOut(angka_2), run_time=0.6)
            b.main(FadeIn(dot_b), Indicate(prapeta, color=AKSEN), run_time=1.4)
            papan.baris(r"B(6,\ 1)", warna=AKSEN, b=b)
            papan.baris(r"\text{tukar} \to (1,\ 6)", warna=REDUP, b=b)
            b.main(Indicate(peta_a, color=SOROT), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_a, "titik B": dot_b},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_a})

        # --- hitung: petaknya dihitung di layar --------------------------- #
        # Jalur hitungnya berangkat dari TITIK ASAL, bukan dari titik B.
        # "Satu ke kiri, enam ke atas" adalah cara membaca koordinat (-1, 6),
        # dan koordinat selalu dibaca dari titik asal.
        #
        # TANPA TULISAN "1 kiri" DAN "6 naik", dan itu perbaikan atas render
        # pertama. Dua sebab, keduanya terlihat di lembar kontak 5 Sep:
        #
        # 1. Narator MENGUCAPKAN "satu ke kiri, enam ke atas". Menuliskannya
        #    lagi di gambar melanggar aturan proyek: tulisan di gambar hanya
        #    untuk yang TIDAK diucapkan.
        # 2. Keduanya memang bertabrakan. "6 naik" mendarat tepat di atas
        #    angka 3 pada sumbu Y, dan "1 kiri" terjepit di antara angka-angka
        #    sumbu X. Sisi kiri jalur tidak bisa dipakai sebab di situ berdiri
        #    peta 90 derajat.
        #
        # Jalurnya sendiri TETAP ada, sebab jalur bukan pengulangan narasi:
        # ia memperlihatkan RUTE-nya, yang tidak diucapkan. Ia PUTUS-PUTUS dan
        # lebih tebal daripada bentuknya, sebab kaki tegaknya berimpit persis
        # dengan sisi kanan peta 90 derajat; garis utuh di situ terbaca sebagai
        # tepi bentuk, bukan sebagai jalur.
        jalur = VGroup(
            DashedLine(asal, np.array([-1.0, 0.0, 0.03])).set_stroke(SOROT, 5.0),
            DashedLine(np.array([-1.0, 0.0, 0.03]),
                       np.array([-1.0, 6.0, 0.03])).set_stroke(SOROT, 5.0),
        )
        dot_bpeta = Dot(titik3(peta90[1]), radius=0.13).set_color(SOROT)

        with sinema.babak(self, "hitung", DURASI) as b:
            papan.baris(r"\text{lalu minus} \to B'(-1,\ 6)", warna=AKSEN2, b=b)
            b.main(ShowCreation(jalur), run_time=1.6)
            b.main(FadeIn(dot_bpeta), Indicate(peta_a, color=AKSEN), run_time=1.4)
            b.main(Indicate(prapeta, color=SOROT), run_time=1.2)
        qc.periksa_adegan(
            self,
            {"prapeta": prapeta, "peta": peta_a, "jalur": jalur, "titik B aksen": dot_bpeta},
            hud={"identitas": ident, "papan": papan.semua()},
            dunia={"bidang": bidang_a},
        )

        # --- kedua: tiga perempat putaran, kamera turun ------------------- #
        pusat_c, tinggi_c = letak_peta(*KOTAK_C)
        bidang_c = bidang_untuk(*KOTAK_C)
        # Peta 270 derajat berbentuk bar tegak x 1..2 y -6..-1 ditambah blok
        # x 2..3 y -2..-1. Arah tiap label dipilih supaya keluar dari bentuknya.
        peta_c = poligon(peta270, AKSEN2, tebal=TEBAL_BENTUK, isian=0.12)
        arah_c = {0: UP, 1: LEFT, 2: DOWN}
        nama_c = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(f"{huruf}''", warna=AKSEN2)
            t.next_to(titik3(peta270[i]), arah_c[i], buff=0.22)
            nama_c[huruf] = t

        with sinema.babak(self, "kedua", DURASI) as b:
            kosongkan_papan(self, papan, b=b, run_time=0.6)
            b.main(
                FadeOut(peta_a), *[FadeOut(nama_a[h]) for h in nama_a],
                FadeOut(dot_b), FadeOut(dot_bpeta), FadeOut(jalur),
                run_time=0.8,
            )
            b.main(
                kamera.dunia_ke_peta(frame, pusat=pusat_c, tinggi=tinggi_c),
                FadeOut(bidang_a), FadeIn(bidang_c),
                run_time=2.0,
            )
            b.main(
                ShowCreation(peta_c), *[FadeIn(nama_c[h]) for h in nama_c],
                run_time=1.6,
            )
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_c},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_c})

        # --- cocok: aturannya berubah, dan diperiksa pada B --------------- #
        jari_3 = Line(asal, titik3(L[1])).set_stroke(AKSEN, 3.0)
        jari_4 = Line(asal, titik3(peta270[1])).set_stroke(AKSEN, 3.0)
        angka_3 = sinema.label(f"{JARI_B:.2f}".replace(".", ","), warna=AKSEN)
        angka_3.next_to(jari_3.get_center(), UP, buff=0.18)
        angka_4 = sinema.label(f"{JARI_B:.2f}".replace(".", ","), warna=AKSEN)
        angka_4.next_to(jari_4.get_center(), RIGHT, buff=0.18)

        with sinema.babak(self, "cocok", DURASI) as b:
            rum = sinema.ganti_rumus(
                self, rum, r"(x,\ y) \to (y,\ -x)", b=b, warna=AKSEN2, papan=papan,
            )
            papan.baris(r"B(6,\ 1) \to B''(1,\ -6)", warna=AKSEN, b=b)
            b.main(
                ShowCreation(jari_3), ShowCreation(jari_4),
                FadeIn(angka_3), FadeIn(angka_4),
                run_time=1.4,
            )
            b.main(Indicate(peta_c, color=SOROT), run_time=1.4)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "peta": peta_c},
            hud={"identitas": ident, "papan": papan.semua()},
            tulisan={"angka 3": angka_3, "angka 4": angka_4},
            dunia={"bidang": bidang_c},
        )

        # --- janji: setengah putaran, kamera melebar ---------------------- #
        pusat_b, tinggi_b = letak_peta(*KOTAK_B)
        bidang_b = bidang_untuk(*KOTAK_B)
        peta_b = poligon(peta180, SOROT, tebal=TEBAL_BENTUK, isian=0.12)
        nama_b = {}
        for i, huruf in NAMA_SUDUT.items():
            t = sinema.label(f"{huruf}'''", warna=SOROT)
            t.next_to(titik3(peta180[i]), UP if i < 2 else DOWN, buff=0.22)
            nama_b[huruf] = t

        with sinema.babak(self, "janji", DURASI) as b:
            kosongkan_papan(self, papan, b=b, run_time=0.6)
            b.main(
                FadeOut(peta_c), *[FadeOut(nama_c[h]) for h in nama_c],
                FadeOut(jari_3), FadeOut(jari_4), FadeOut(angka_3), FadeOut(angka_4),
                run_time=0.8,
            )
            b.main(
                kamera.dunia_ke_peta(frame, pusat=pusat_b, tinggi=tinggi_b),
                FadeOut(bidang_c), FadeIn(bidang_b),
                run_time=1.8,
            )
            b.main(
                ShowCreation(peta_b), *[FadeIn(nama_b[h]) for h in nama_b],
                run_time=1.6,
            )
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_b},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_b})

        # --- sama: janji Materi 04 terbukti ------------------------------- #
        # Titik asalnya DITANDAI di sini, dan itu bukan hiasan: kalimat
        # "cermin pada titik asal" menyebut sebuah titik, dan titik itu harus
        # ada di layar supaya kalimatnya bisa diperiksa siswa.
        tanda_asal = Dot(asal, radius=0.14).set_color(SOROT)

        with sinema.babak(self, "sama", DURASI) as b:
            rum = sinema.ganti_rumus(
                self, rum, r"(x,\ y) \to (-x,\ -y)", b=b, warna=SOROT, papan=papan,
            )
            papan.baris(r"180^\circ = \text{cermin titik asal}", warna=SOROT, b=b)
            b.main(FadeIn(tanda_asal), Indicate(prapeta, color=SOROT), run_time=1.4)
            b.main(Indicate(peta_b, color=AKSEN2), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_b, "titik asal": tanda_asal},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_b})

        # --- keliru: arah putarnya dibalik, memakai jarum jam ------------- #
        pusat_d, tinggi_d = letak_peta(*KOTAK_D)
        bidang_d = bidang_untuk(*KOTAK_D)
        jarum_salah = Arrow(asal, np.array([4.0, 0.0, 0.03]), buff=0, thickness=5).set_color(AKSEN)
        sapu_salah = poligon(juring(4.0, -PI / 2, 0.0), AKSEN, tebal=2.0, isian=0.10)
        l_salah = sinema.label("(0, -4)", warna=AKSEN)
        l_salah.next_to(np.array([0.0, -4.0, 0.03]), RIGHT, buff=0.24)

        with sinema.babak(self, "keliru", DURASI) as b:
            kosongkan_papan(self, papan, b=b, run_time=0.6)
            b.main(
                FadeOut(prapeta), *[FadeOut(nama_pra[h]) for h in nama_pra],
                FadeOut(peta_b), *[FadeOut(nama_b[h]) for h in nama_b],
                FadeOut(tanda_asal),
                run_time=0.8,
            )
            b.main(
                kamera.dunia_ke_peta(frame, pusat=pusat_d, tinggi=tinggi_d),
                FadeOut(bidang_b), FadeIn(bidang_d),
                run_time=1.8,
            )
            # RUMUS UTAMANYA DIKEMBALIKAN KE ATURAN SEPEREMPAT PUTARAN.
            #
            # Sesudah babak "sama" panel memajang "(x, y) -> (-x, -y)", aturan
            # setengah putaran. Tiga babak berikutnya (keliru, betul, pusat)
            # semuanya tentang putaran seperempat, dan pada render 5 Sep panel
            # itu membantah gambarnya selama 27 detik. Morph di sini aman:
            # kedua rumus berbagi hampir semua lambangnya.
            rum = sinema.ganti_rumus(
                self, rum, r"(x,\ y) \to (-y,\ x)", b=b, warna=AKSEN2, papan=papan,
            )
            b.main(GrowArrow(jarum_salah), run_time=1.0)
            b.main(
                Rotate(jarum_salah, -PI / 2, about_point=asal),
                ShowCreation(sapu_salah), FadeIn(l_salah),
                run_time=1.6,
            )
        qc.periksa_adegan(self, {"jarum salah": jarum_salah, "sapuan salah": sapu_salah},
                          hud={"identitas": ident},
                          tulisan={"label salah": l_salah},
                          dunia={"bidang": bidang_d})

        # --- betul: sudut positif berlawanan arah jarum jam --------------- #
        jarum_benar = Arrow(asal, np.array([4.0, 0.0, 0.03]), buff=0, thickness=5).set_color(AKSEN2)
        sapu_benar = poligon(juring(4.0, 0.0, PI / 2), AKSEN2, tebal=2.0, isian=0.10)
        l_benar = sinema.label("(0, 4)", warna=AKSEN2)
        l_benar.next_to(np.array([0.0, 4.0, 0.03]), RIGHT, buff=0.24)

        with sinema.babak(self, "betul", DURASI) as b:
            b.main(GrowArrow(jarum_benar), run_time=1.0)
            b.main(
                Rotate(jarum_benar, PI / 2, about_point=asal),
                ShowCreation(sapu_benar), FadeIn(l_benar),
                run_time=1.6,
            )
            # Baris ini menutup lubang yang dibuka contoh kedua: bentuk yang
            # diputar searah jarum jam mendarat di tempat yang sama dengan
            # putaran 270 derajat. Itu bukan kebetulan, dan menyebutkannya
            # lebih menolong daripada mendiamkannya.
            papan.baris(r"-90^\circ = 270^\circ", warna=REDUP, b=b)
            b.main(Indicate(sapu_salah, color=SOROT), run_time=1.2)
            b.main(Indicate(sapu_benar, color=SOROT), run_time=1.2)
        qc.periksa_adegan(
            self,
            {"jarum salah": jarum_salah, "jarum benar": jarum_benar,
             "sapuan salah": sapu_salah, "sapuan benar": sapu_benar},
            hud={"identitas": ident, "papan": papan.semua()},
            tulisan={"label salah": l_salah, "label benar": l_benar},
            dunia={"bidang": bidang_d},
        )

        # --- pusat: pusatnya bukan titik asal ----------------------------- #
        # Tiga langkah, dan ketiganya dianimasikan. Menuliskan "geser, putar,
        # geser kembali" di panel tanpa memperlihatkannya sama saja dengan
        # menyuruh siswa membayangkan bagian yang paling sulit dibayangkan.
        P = (3.0, 2.0)
        pusat_e, tinggi_e = letak_peta(*KOTAK_E)
        bidang_e = bidang_untuk(*KOTAK_E)

        hantu = poligon(L, REDUP, tebal=2.0, isian=0.04)
        gerak = poligon(L, AKSEN2, tebal=TEBAL_BENTUK, isian=0.12)
        langkah1 = geser(L, -P[0], -P[1])
        langkah2 = [putar(p, 90) for p in langkah1]
        langkah3 = geser(langkah2, P[0], P[1])
        tanda_p = Dot(titik3(P), radius=0.14).set_color(SOROT)
        l_p = tempel_label(sinema.label("pusat", warna=SOROT), tanda_p, UP, buff=0.20)

        with sinema.babak(self, "pusat", DURASI) as b:
            kosongkan_papan(self, papan, b=b, run_time=0.6)
            b.main(
                FadeOut(jarum_salah), FadeOut(jarum_benar),
                FadeOut(sapu_salah), FadeOut(sapu_benar),
                FadeOut(l_salah), FadeOut(l_benar),
                run_time=0.8,
            )
            b.main(
                kamera.dunia_ke_peta(frame, pusat=pusat_e, tinggi=tinggi_e),
                FadeOut(bidang_d), FadeIn(bidang_e),
                run_time=1.6,
            )
            b.main(FadeIn(hantu), FadeIn(gerak), FadeIn(tanda_p), FadeIn(l_p), run_time=1.0)
            b.main(Transform(gerak, poligon(langkah1, AKSEN2, tebal=TEBAL_BENTUK, isian=0.12)),
                   run_time=1.5)
            b.main(Transform(gerak, poligon(langkah2, AKSEN2, tebal=TEBAL_BENTUK, isian=0.12)),
                   run_time=1.5)
            b.main(Transform(gerak, poligon(langkah3, AKSEN2, tebal=TEBAL_BENTUK, isian=0.12)),
                   run_time=1.5)
        qc.periksa_adegan(self, {"hantu": hantu, "gerak": gerak, "pusat": tanda_p},
                          hud={"identitas": ident},
                          tulisan={"label pusat": l_p},
                          dunia={"bidang": bidang_e})

        # --- sembarang: sudut yang bukan kelipatan 90 --------------------- #
        # BENTUKNYA BENAR-BENAR DIPUTAR 37 DERAJAT DI SINI.
        #
        # Versi pertama cuma menambahkan satu baris rumus ke panel lalu diam
        # sampai video habis, terukur `alat/ukur_detik_pertama.py`. Narasinya
        # berbicara tentang "sudut yang bukan kelipatan sembilan puluh", dan
        # satu-satunya cara menunjukkan sudut semacam itu adalah memutarnya.
        # Rumus di panel menerangkan gerakan; ia tidak bisa menggantikannya.
        #
        # Dipakai 37 derajat, bukan 45. Sudut 45 derajat terlihat seperti
        # setengah dari sudut siku-siku dan bisa dikira istimewa juga; 37
        # derajat jelas-jelas sembarang.
        #
        # RUMUS UTAMANYA DIGANTI DI SINI, TIDAK CUKUP DITAMBAH SATU BARIS.
        #
        # Pada render pertama panel masih memajang "(x, y) -> (-x, -y)", rumus
        # setengah putaran dari babak "sama", sementara layar memperlihatkan
        # putaran 37 derajat. Panel itu MEMBANTAH gambarnya sendiri selama 19
        # detik terakhir video, dan itu kelas cacat yang paling merusak: siswa
        # yang percaya panel akan salah, siswa yang percaya gambar akan bingung
        # kenapa panelnya berbeda.
        #
        # Diganti dengan `tumbuh` sesudah yang lama dibuang, BUKAN dengan
        # `ganti_rumus`. `ganti_rumus` memindahkan lambang yang sama, dan
        # antara "(-x, -y)" dengan rumus cos-sin nyaris tidak ada lambang yang
        # sama; yang terjadi bukan morph melainkan tumpukan coretan.
        peta_bebas = poligon([putar_bebas(p, 37.0) for p in L],
                             AKSEN2, tebal=3.0, isian=0.12)

        with sinema.babak(self, "sembarang", DURASI) as b:
            b.main(FadeOut(gerak), FadeOut(hantu), FadeOut(tanda_p), FadeOut(l_p),
                   FadeIn(prapeta), *[FadeIn(nama_pra[h]) for h in nama_pra],
                   run_time=0.8)
            b.main(FadeOut(rum), run_time=0.5)
            papan.utama = None
            rum = papan.tumbuh(r"(x\cos a - y\sin a,\ x\sin a + y\cos a)",
                               run_time=1.0, b=b)
            b.main(ShowCreation(peta_bebas), run_time=1.4)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_bebas},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_e})

        # --- rangkum: jarak ke pusat tetap, arahnya yang berubah ---------- #
        # Tiap sudut berjalan di BUSURNYA SENDIRI, dan ketiga busur itu
        # berpusat di titik yang sama. Itulah kalimat rangkumannya, digambar.
        #
        # BUSURNYA MENUJU BENTUK 37 DERAJAT YANG SUDAH DI LAYAR, bukan ke peta
        # 90 derajat yang dimunculkan lagi. Pada render pertama bentuk 37
        # derajat cuma bertahan 2,5 detik sebelum ditimpa peta 90 derajat:
        # gagasan yang paling umum di video ini praktis tidak sempat dilihat.
        # Sekarang ia bertahan sampai video habis, dan rangkumannya berbicara
        # tentang bentuk yang sedang tampil.
        #
        # Kamera baru berpindah DI SINI, ke kotak paling rapat di seluruh
        # video: 9 kali 6 satuan, hampir satu setengah kali lebih besar
        # daripada kotak sebelumnya. Rangkuman berhak atas gambar terbesar.
        pusat_h, tinggi_h = letak_peta(*KOTAK_H)
        bidang_h = bidang_untuk(*KOTAK_H)
        busur = VGroup(*[
            Arc(
                start_angle=np.arctan2(L[i][1], L[i][0]),
                angle=37.0 * DEGREES,
                radius=(L[i][0] ** 2 + L[i][1] ** 2) ** 0.5,
                arc_center=asal,
            ).set_stroke(SOROT, 3.0)
            for i in NAMA_SUDUT
        ])

        with sinema.babak(self, "rangkum", DURASI) as b:
            b.main(
                kamera.dunia_ke_peta(frame, pusat=pusat_h, tinggi=tinggi_h),
                FadeOut(bidang_e), FadeIn(bidang_h),
                run_time=1.6,
            )
            b.main(ShowCreation(busur), run_time=1.8)
            b.main(Indicate(prapeta, color=AKSEN2), run_time=1.2)
            b.main(Indicate(peta_bebas, color=SOROT), run_time=1.2)
        qc.periksa_adegan(self, {"prapeta": prapeta, "peta": peta_bebas, "busur": busur},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_h})

        # --- tanya: titik yang tepat berada DI pusatnya ------------------- #
        # Pertanyaan penutup dijawab siswa, bukan video. Yang harus ada di
        # layar cuma bendanya: sebuah titik tepat di pusat putaran, dengan
        # kedua bentuk masih terlihat supaya pertanyaannya punya sandaran.
        #
        # Labelnya ke KIRI ATAS, bukan ke kanan. Ke kanan ia mendarat persis di
        # atas garis sumbu X dan bertabrakan dengan angka 1: garis sumbunya
        # mencoret tulisannya dan angka 1 menimpa hurufnya. Terlihat di lembar
        # kontak 5 Sep. Di kiri atas titik asal tidak ada apa-apa.
        tanya_titik = Dot(asal, radius=0.16).set_color(AKSEN)
        l_tanya = tempel_label(sinema.label("di sini?", warna=AKSEN),
                               tanya_titik, UL, buff=0.24)

        with sinema.babak(self, "tanya", DURASI) as b:
            b.main(FadeOut(busur), run_time=0.8)
            b.main(FadeIn(tanya_titik), FadeIn(l_tanya), run_time=1.2)
            b.main(Indicate(prapeta, color=SOROT), run_time=1.4)
            b.main(Indicate(peta_bebas, color=AKSEN), run_time=1.2)
        qc.periksa_adegan(
            self, {"prapeta": prapeta, "peta": peta_bebas, "titik tanya": tanya_titik},
            hud={"identitas": ident, "papan": papan.semua()},
            tulisan={"label tanya": l_tanya},
            dunia={"bidang": bidang_h},
        )
