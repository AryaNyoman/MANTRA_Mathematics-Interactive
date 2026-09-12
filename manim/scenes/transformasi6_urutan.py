"""Video 06 Transformasi Geometri, Materi 12 "Komposisi lewat perkalian matriks":
Komposisi Transformasi, Bagian 2.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama (2:06)
yang sudah disetujui ARYA. DUNIANYA SAMA: satu titik A(3, 1) ditelusuri lewat
dua urutan (pita cermin, juring rotasi), kedua hasil (1, 3) dan (-1, -3)
disorot berdampingan; lalu paruh aljabar di kotak kecil dengan tiga satuan
ruang rumus di bawah petak (SLOT_1, SLOT_2), perkalian dihitung sekotak
demi sekotak, hasilnya diperiksa pada segitiga, urutan tertukar digambar
sebagai cermin y = -x, contoh tandingan dua putaran, aturan baca dari kanan.

YANG BERBEDA: pembuka sub-bab plus Bagian 2 dengan pertanyaan halaman
(kedua matriksnya ditulis di panel); segar-ingat Matriks Transformasi
Bagian 1; babak "dua" memperlihatkan BENTUKNYA dulu (segitiga kecil yang
dicerminkan lalu diputar) sebelum mengikuti satu titiknya; ASAL RUMUS:
kedua langkah ditulis sebagai perkalian M1 (3, 1) lalu M2 (3, -1), lalu
dibaca utuh M2 M1 (3, 1) sehingga urutannya lahir dari tulisannya; bentuk
umum M3 M2 M1 plus catatan translasi; penutup menunjuk Penerapan
Transformasi Geometri; tiap kejadian dipicu pada KATA (`sinema.JamKata`).

Alasan tata letak paruh aljabar (rumus dunia di bawah petak, bukan di
atasnya; rumus dan gambar tidak tampil bersama) diwarisi dari adegan lama
dan `transformasi_umum.rumus_dunia`.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

sys.path.insert(0, str(Path(__file__).resolve().parent))
from transformasi_umum import (  # noqa: E402
    bidang_untuk, juring, kosongkan_papan, letak_peta, poligon, rumus_dunia,
    titik3,
)

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "transformasi6-urutan"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

KOTAK_G = (-3.0, 4.0, -4.0, 4.0)   # paruh geometri: satu titik, dua urutan
KOTAK_M = (-2.0, 2.0, -5.0, 2.0)   # paruh aljabar: yang dilihat kamera
PETAK_M = (-2.0, 2.0, -2.0, 2.0)   # paruh aljabar: yang bergaris dan berangka

# Dua slot rumus, keduanya DI BAWAH petak (lihat catatan di kepala berkas).
SLOT_1 = np.array([0.0, -3.25, 0.05])
SLOT_2 = np.array([0.0, -4.55, 0.05])
# Dua baris matriks kolom sekaligus (babak "asal") lebih tinggi daripada satu
# baris biasa: keduanya dipakai ukuran 26 dan slotnya digeser supaya tidak
# saling menindih (tinggi dunia tiap baris kira-kira 1,3 satuan).
SLOT_A = np.array([0.0, -3.05, 0.05])
SLOT_B = np.array([0.0, -4.50, 0.05])

P = (3.0, 1.0)
BENTUK = [(1.0, 0.0), (3.0, 1.0), (2.0, 2.0)]        # segitiga kecil dengan A sebagai sudut
SEGITIGA = [(0.0, 0.0), (2.0, 0.0), (2.0, 2.0)]      # segitiga uji paruh aljabar

M1 = r"\begin{pmatrix} 1 & 0 \\ 0 & -1 \end{pmatrix}"
M2 = r"\begin{pmatrix} 0 & -1 \\ 1 & 0 \end{pmatrix}"
M21 = r"\begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix}"
M12 = r"\begin{pmatrix} 0 & -1 \\ -1 & 0 \end{pmatrix}"


def kolom(x, y):
    return rf"\begin{{pmatrix}} {x} \\ {y} \end{{pmatrix}}"


def cermin_x(p):
    return (p[0], -p[1])


def putar90(p):
    return (-p[1], p[0])


def cermin_yx(p):
    return (p[1], p[0])


def cermin_ymx(p):
    return (-p[1], -p[0])


class TransformasiUrutan(AdeganMatra):
    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self, tanpa_utama=True)
        asal = np.array([0.0, 0.0, 0.03])

        antara_1 = cermin_x(P)          # (3, -1)
        hasil_1 = putar90(antara_1)     # (1, 3)
        antara_2 = putar90(P)           # (-1, 3)
        hasil_2 = cermin_x(antara_2)    # (-1, -3)

        pusat_g, tinggi_g = letak_peta(*KOTAK_G)
        bidang_g = bidang_untuk(*KOTAK_G)
        pusat_m, tinggi_m = letak_peta(*KOTAK_M)
        bidang_m = bidang_untuk(*PETAK_M)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat_g, tinggi=tinggi_g)

        def di_slot(isi, ukuran, warna, slot, maks=6.8):
            """Rumus dunia berukuran tetap di layar, dihitung dengan tinggi
            kamera paruh ALJABAR (semua rumus dunia muncul sesudah kamera
            pindah ke sana)."""
            return rumus_dunia(isi, ukuran, warna, tinggi_m, slot, maks_layar=maks)

        def tanda(p, warna, nama, arah=DOWN):
            d = Dot(titik3(p), radius=0.09).set_color(warna)
            t = sinema.label(nama, warna=warna)
            t.next_to(titik3(p), arah, buff=0.24)
            return d, t

        def nyala(*mobs, lama=1.0):
            return [Indicate(m, color=SOROT, scale_factor=1.0) for m in mobs]

        # --- buka: sub-bab, lalu kedua matriks dan pertanyaannya ---------- #
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Komposisi")
            b.main(FadeIn(bidang_g), run_time=0.5)
            sinema.judul_pembuka(self, "Komposisi Transformasi, Bagian 2", lama=3.4, y=2.6)
            b.catat(3.4)
            b.tunggu_kata("dua matriks")
            r_m1 = papan.baris(rf"M_1 = {M1}", warna=AKSEN2, b=b)
            b.tunggu_kata("Kalau keduanya")
            r_m2 = papan.baris(rf"M_2 = {M2}", warna=SOROT, b=b)
            b.tunggu_kata("di depan")
            r_tanya = papan.baris(r"M_1 M_2\ \text{ atau }\ M_2 M_1\ ?", warna=AKSEN, b=b)
        qc.periksa_adegan(self, {}, hud={"papan": papan.semua()}, dunia={"bidang": bidang_g})

        # --- ingat: kedua matriks itu dari Matriks Transformasi, Bagian 1 --- #
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("cermin sumbu")
            b.main(*nyala(r_m1), run_time=1.0)
            b.tunggu_kata("Rotasi")
            b.main(*nyala(r_m2), run_time=1.0)
            b.tunggu_kata("Dua matriks")
            b.main(FadeOut(r_tanya), run_time=0.4)
            papan.baris_lain = [m for m in papan.baris_lain if m is not r_tanya]
            papan.perbarui_alas()
            b.main(*nyala(r_m1, r_m2), run_time=1.0)
        qc.periksa_adegan(self, {}, hud={"papan": papan.semua()}, dunia={"bidang": bidang_g})

        # --- dua: bentuknya dulu, lalu satu titiknya saja ----------------- #
        bentuk0 = poligon(BENTUK, TINTA, tebal=2.6, isian=0.10)
        bentuk1 = poligon([cermin_x(p) for p in BENTUK], REDUP, tebal=2.2, isian=0.08)
        bentuk2 = poligon([putar90(cermin_x(p)) for p in BENTUK], AKSEN2, tebal=2.6, isian=0.12)
        dot_a, l_a = tanda(P, TINTA, "A(3, 1)", DOWN)
        kotak_baca = poligon([(0.0, 0.0), (P[0], 0.0), (P[0], P[1]), (0.0, P[1])], AKSEN2, tebal=1.5, isian=0.10)
        with sinema.babak(self, "dua", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sebuah bentuk")
            # Papan dikosongkan BERSAMAAN dengan bentuknya muncul: "dicerminkan"
            # menyusul 0,7 s kemudian, tidak cukup untuk dua animasi berurutan.
            hapus = [FadeOut(m) for m in papan.baris_lain]
            papan.baris_lain = []
            ident = sinema.identitas(self, "1 petak = 1 satuan")
            b.main(*hapus, ShowCreation(bentuk0), run_time=0.6)
            papan.perbarui_alas()
            b.tunggu_kata("dicerminkan")
            b.main(TransformFromCopy(bentuk0, bentuk1), run_time=0.9)
            b.tunggu_kata("diputar")
            b.main(TransformFromCopy(bentuk1, bentuk2), run_time=0.9)
            b.tunggu_kata("Kita ikuti")
            b.main(FadeOut(bentuk1), FadeOut(bentuk2), bentuk0.animate.set_stroke(REDUP, 1.6).set_fill(TINTA, 0.03),
                   run_time=0.7)
            b.tunggu_kata("A tiga")
            b.main(FadeIn(dot_a, scale=0.4), FadeIn(l_a), run_time=0.6)
            b.tunggu_kata("koma satu")
            b.main(ShowCreation(kotak_baca), run_time=0.8)
        qc.periksa_adegan(self, {"titik A": dot_a, "kotak baca": kotak_baca},
                          hud={"identitas": ident}, tulisan={"label A": l_a},
                          dunia={"bidang": bidang_g, "bentuk": bentuk0})

        # --- langkah: cermin sumbu X (pita yang diseberangi) -------------- #
        pita_1 = poligon([(P[0] - 0.35, P[1]), (P[0] + 0.35, P[1]), (P[0] + 0.35, antara_1[1]),
                          (P[0] - 0.35, antara_1[1])], AKSEN2, tebal=1.5, isian=0.16)
        dot_1, l_1 = tanda(antara_1, AKSEN2, "(3, -1)", DOWN)
        with sinema.babak(self, "langkah", DURASI, kata=KATA) as b:
            b.tunggu_kata("Langkah pertama")
            b.main(FadeOut(kotak_baca), FadeOut(bentuk0), run_time=0.4)
            b.tunggu_kata("cermin sumbu")
            b.main(ShowCreation(pita_1), run_time=0.9)
            b.tunggu_kata("menjadi")
            b.main(FadeIn(dot_1, scale=0.4), FadeIn(l_1), run_time=0.7)
            rum = sinema.lahir_rumus(self, r"\text{cermin } X", dekat=dot_1, papan=papan, b=b, warna=AKSEN2,
                                     tahan=0.3, run_time=0.9)
        qc.periksa_adegan(self, {"titik A": dot_a, "hasil 1": dot_1, "pita": pita_1},
                          hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"label A": l_a, "label 1": l_1}, dunia={"bidang": bidang_g})

        # --- kedua: rotasi 90 derajat pada HASIL langkah pertama ---------- #
        jari_1 = (antara_1[0] ** 2 + antara_1[1] ** 2) ** 0.5
        sudut_1 = np.arctan2(antara_1[1], antara_1[0])
        sapu_1 = poligon(juring(jari_1, sudut_1, sudut_1 + PI / 2), AKSEN2, tebal=1.5, isian=0.10)
        dot_2, l_2 = tanda(hasil_1, AKSEN2, "(1, 3)", UP)
        with sinema.babak(self, "kedua", DURASI, kata=KATA) as b:
            b.tunggu_kata("Langkah kedua")
            b.main(FadeOut(pita_1), run_time=0.4)
            b.tunggu_kata("hasil itu")
            b.main(*nyala(dot_1, l_1), run_time=0.7)
            b.tunggu_kata("diputar")
            b.main(ShowCreation(sapu_1), run_time=0.9)
            b.tunggu_kata("menjadi")
            b.main(FadeIn(dot_2, scale=0.4), FadeIn(l_2), run_time=0.7)
            b.tunggu_kata("Itu jawaban")
            papan.baris(r"\text{lalu rotasi } 90^\circ", warna=AKSEN2, b=b)
            b.main(*nyala(dot_2, l_2), run_time=0.7)
        qc.periksa_adegan(self, {"titik A": dot_a, "hasil akhir": dot_2, "sapuan": sapu_1},
                          hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"label A": l_a, "label akhir": l_2}, dunia={"bidang": bidang_g})

        # --- balik: urutan dibalik, warna berbeda ------------------------- #
        jari_2 = (P[0] ** 2 + P[1] ** 2) ** 0.5
        sudut_2 = np.arctan2(P[1], P[0])
        sapu_2 = poligon(juring(jari_2, sudut_2, sudut_2 + PI / 2), SOROT, tebal=1.5, isian=0.10)
        pita_2 = poligon([(antara_2[0] - 0.35, antara_2[1]), (antara_2[0] + 0.35, antara_2[1]),
                          (antara_2[0] + 0.35, hasil_2[1]), (antara_2[0] - 0.35, hasil_2[1])],
                         SOROT, tebal=1.5, isian=0.16)
        dot_3, l_3 = tanda(antara_2, SOROT, "(-1, 3)", UP)
        dot_4, l_4 = tanda(hasil_2, SOROT, "(-1, -3)", DOWN)
        with sinema.babak(self, "balik", DURASI, kata=KATA) as b:
            b.tunggu_kata("dibalik")
            b.main(FadeOut(sapu_1), FadeOut(dot_1), FadeOut(l_1), run_time=0.4)
            b.tunggu_kata("diputar dulu")
            b.main(ShowCreation(sapu_2), run_time=0.7)
            b.tunggu_kata("negatif satu koma tiga")
            b.main(FadeIn(dot_3, scale=0.4), FadeIn(l_3), run_time=0.6)
            b.tunggu_kata("baru dicerminkan")
            b.main(FadeOut(sapu_2), ShowCreation(pita_2), run_time=0.8)
            b.tunggu_kata("koma negatif")
            b.main(FadeIn(dot_4, scale=0.4), FadeIn(l_4), run_time=0.6)
        qc.periksa_adegan(self, {"titik A": dot_a, "hasil 1": dot_2, "hasil 2": dot_4, "pita 2": pita_2},
                          hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"label A": l_a, "label hasil 1": l_2, "label hasil 2": l_4, "label antara": l_3},
                          dunia={"bidang": bidang_g})

        # --- beda: kedua hasilnya berdampingan ---------------------------- #
        with sinema.babak(self, "beda", DURASI, kata=KATA) as b:
            b.tunggu_kata("sama persis")
            b.main(FadeOut(pita_2), FadeOut(dot_3), FadeOut(l_3), run_time=0.5)
            b.tunggu_kata("berlawanan")
            b.main(Indicate(dot_2, color=AKSEN2), Indicate(dot_4, color=SOROT), run_time=1.0)
            b.tunggu_kata("Urutan itulah")
            papan.baris(r"(1,\ 3) \neq (-1,\ -3)", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"titik A": dot_a, "hasil 1": dot_2, "hasil 2": dot_4},
                          hud={"identitas": ident, "papan": papan.semua()},
                          tulisan={"label A": l_a, "label hasil 1": l_2, "label hasil 2": l_4},
                          dunia={"bidang": bidang_g})

        # --- asal: kedua langkah ditulis sebagai perkalian ---------------- #
        langkah1 = di_slot(rf"M_1 {kolom(3, 1)} = {kolom(3, -1)}", 26, AKSEN2, SLOT_A, maks=5.6)
        langkah2 = di_slot(rf"M_2 {kolom(3, -1)} = {kolom(1, 3)}", 26, SOROT, SLOT_B, maks=5.6)
        # Dibaca utuh: titiknya benar-benar di UJUNG KANAN tulisan, jadi hasilnya
        # tidak ditulis di sini (sudah tampil di baris kedua sebelumnya).
        utuh = di_slot(rf"M_2\, M_1 {kolom(3, 1)}", 32, TINTA, SLOT_1, maks=6.0)
        # Panah kecil dari bawah menunjuk koordinat di ujung kanan tulisan.
        ujung = utuh.get_right()
        panah_titik = Arrow(np.array([ujung[0] - 0.5, -4.95, 0.05]), np.array([ujung[0] - 0.5, -4.25, 0.05]),
                            buff=0, thickness=3).set_color(AKSEN)
        with sinema.babak(self, "asal", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dari mana")
            kosongkan_papan(self, papan, b=b, run_time=0.4)
            b.main(FadeOut(dot_a), FadeOut(l_a), FadeOut(dot_2), FadeOut(l_2), FadeOut(dot_4), FadeOut(l_4),
                   run_time=0.5)
            b.main(kamera.dunia_ke_peta(frame, pusat=pusat_m, tinggi=tinggi_m), FadeOut(bidang_g), FadeIn(bidang_m),
                   run_time=1.2)
            b.tunggu_kata("M satu")
            b.main(FadeIn(langkah1, shift=0.25 * UP), run_time=0.8)
            b.tunggu_kata("Hasilnya baru")
            b.main(FadeIn(langkah2, shift=0.25 * UP), run_time=0.8)
            b.tunggu_kata("Dibaca utuh")
            b.main(TransformMatchingStrings(langkah1, utuh), FadeOut(langkah2), run_time=1.0)
            b.tunggu_kata("titiknya di")
            b.main(GrowArrow(panah_titik), run_time=0.6)
        qc.periksa_adegan(self, {"utuh": utuh, "panah titik": panah_titik},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang_m})

        # --- matriks: yang pertama dikerjakan ditulis paling kanan -------- #
        with sinema.babak(self, "matriks", DURASI, kata=KATA) as b:
            b.tunggu_kata("matriksnya ditulis")
            rum = sinema.ganti_rumus(self, rum, r"M_2\, M_1", b=b, run_time=0.8, warna=SOROT, papan=papan)
            b.tunggu_kata("gabungannya")
            b.main(*nyala(utuh), run_time=0.9)
            b.tunggu_kata("bukan sebaliknya")
            papan.baris(r"\text{bukan } M_1 M_2", warna=REDUP, b=b)
        qc.periksa_adegan(self, {"utuh": utuh, "panah titik": panah_titik},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang_m})

        # --- kenapa: yang terdekat koordinat bekerja lebih dulu ----------- #
        panah_baca = Arrow(titik3((1.6, -4.3)), titik3((-1.6, -4.3)), buff=0, thickness=4).set_color(AKSEN)
        gabung_dulu = di_slot(rf"(M_2\, M_1) {kolom(3, 1)}", 32, TINTA, SLOT_1, maks=6.0)
        with sinema.babak(self, "kenapa", DURASI, kata=KATA) as b:
            b.tunggu_kata("koordinat titiknya")
            b.main(FadeOut(panah_titik), GrowArrow(panah_baca), run_time=0.8)
            b.tunggu_kata("paling dekat")
            b.main(*nyala(utuh), run_time=0.9)
            b.tunggu_kata("Mengalikan kedua")
            b.main(TransformMatchingStrings(utuh, gabung_dulu), run_time=0.9)
            b.tunggu_kata("menjadi satu")
            b.main(*nyala(gabung_dulu), run_time=0.8)
        qc.periksa_adegan(self, {"gabung dulu": gabung_dulu, "panah baca": panah_baca},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang_m})

        # --- kalikan: keempat kotaknya dihitung satu per satu ------------- #
        susun = di_slot(rf"M_2\, M_1 = {M2}{M1}", 32, TINTA, SLOT_1, maks=6.8)
        kotak = [
            r"\text{kiri atas} = (0)(1) + (-1)(0) = 0",
            r"\text{kanan atas} = (0)(0) + (-1)(-1) = 1",
            r"\text{kiri bawah} = (1)(1) + (0)(0) = 1",
            r"\text{kanan bawah} = (1)(0) + (0)(-1) = 0",
        ]
        hitung = di_slot(kotak[0], 28, AKSEN2, SLOT_2, maks=6.8)
        with sinema.babak(self, "kalikan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Perkaliannya")
            b.main(FadeOut(gabung_dulu), FadeOut(panah_baca), run_time=0.5)
            b.main(FadeIn(susun, shift=0.25 * UP), run_time=0.8)
            b.tunggu_kata("nol kali")
            b.main(FadeIn(hitung, shift=0.25 * UP), run_time=0.8)
            b.tunggu_kata("kotak kiri")
            b.main(*nyala(hitung), run_time=0.8)
            for frasa, ke, isi in (("satu", 3, kotak[1]), ("satu", 4, kotak[2]), ("nol", 4, kotak[3])):
                b.tunggu_kata(frasa, ke=ke)
                b.main(Transform(hitung, di_slot(isi, 28, AKSEN2, SLOT_2, maks=6.8)), run_time=0.7)
        qc.periksa_adegan(self, {"susun": susun, "hitung": hitung},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang_m})

        # --- hasil: gabungannya ternyata cermin garis y = x --------------- #
        gabung = di_slot(rf"M_2\, M_1 = {M21}", 32, AKSEN, SLOT_1, maks=6.8)
        pakai = di_slot(rf"{M21}{kolom(3, 1)} = {kolom(1, 3)}", 30, AKSEN, SLOT_2, maks=6.0)
        with sinema.babak(self, "hasil", DURASI, kata=KATA) as b:
            b.tunggu_kata("Hasilnya")
            b.main(Transform(susun, gabung), FadeOut(hitung), run_time=1.0)
            b.tunggu_kata("Itu matriks")
            kosongkan_papan(self, papan, b=b, run_time=0.4)
            papan.baris(r"\text{cermin garis } y = x", warna=AKSEN, b=b)
            b.tunggu_kata("Dikenakan")
            b.main(FadeIn(pakai, shift=0.25 * UP), run_time=0.8)
            b.tunggu_kata("sama persis")
            papan.baris(r"(3,\ 1) \to (1,\ 3)", warna=AKSEN2, b=b)
        qc.periksa_adegan(self, {"gabungan": susun, "dipakai": pakai},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang_m})

        # --- periksa: dibuktikan pada seluruh bentuk ---------------------- #
        segitiga = poligon(SEGITIGA, TINTA, tebal=3.0, isian=0.10)
        seg_cermin = poligon([cermin_x(p) for p in SEGITIGA], REDUP, tebal=2.4, isian=0.08)
        seg_akhir = poligon([putar90(cermin_x(p)) for p in SEGITIGA], AKSEN2, tebal=3.0, isian=0.12)
        seg_langsung = poligon([cermin_yx(p) for p in SEGITIGA], AKSEN, tebal=5.0, isian=0.0)
        garis_yx = DashedLine(titik3((-2.0, -2.0)), titik3((2.0, 2.0))).set_stroke(AKSEN, 2.2)
        with sinema.babak(self, "periksa", DURASI, kata=KATA) as b:
            b.tunggu_kata("Jangan percaya")
            b.main(FadeOut(susun), FadeOut(pakai), run_time=0.5)
            b.tunggu_kata("Kenakan")
            b.main(ShowCreation(segitiga), run_time=0.8)
            b.tunggu_kata("seluruh bentuknya")
            b.main(ShowCreation(garis_yx), ShowCreation(seg_langsung), run_time=1.0)
            b.tunggu_kata("bandingkan")
            b.main(ShowCreation(seg_cermin), run_time=0.6)
            b.main(ShowCreation(seg_akhir), run_time=0.8)
            b.tunggu_kata("berimpit")
            b.main(FadeOut(seg_cermin), *nyala(seg_akhir), run_time=0.9)
        qc.periksa_adegan(self, {"segitiga": segitiga, "hasil dua langkah": seg_akhir, "hasil langsung": seg_langsung},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_m, "garis": garis_yx})

        # --- tutup: urutan tertukar memberi jawaban urutan lain ----------- #
        garis_ymx = DashedLine(titik3((-2.0, 2.0)), titik3((2.0, -2.0))).set_stroke(SOROT, 2.2)
        balik = di_slot(rf"M_1\, M_2 = {M12}", 32, SOROT, SLOT_2, maks=6.8)
        balik_nama = di_slot(rf"M_1\, M_2 = {M12} = \text{{cermin }} y = -x", 30, SOROT, SLOT_2, maks=6.8)
        seg_balik = poligon([cermin_ymx(p) for p in SEGITIGA], SOROT, tebal=3.0, isian=0.12)
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("tertukar")
            b.main(FadeOut(seg_langsung), FadeOut(seg_akhir), run_time=0.5)
            b.tunggu_kata("M satu")
            b.main(FadeIn(balik, shift=0.25 * UP), run_time=0.8)
            b.tunggu_kata("sebaliknya")
            b.main(ShowCreation(seg_balik), run_time=0.9)
            b.tunggu_kata("cermin pada")
            b.main(ShowCreation(garis_ymx), Transform(balik, balik_nama), run_time=0.9)
            b.tunggu_kata("masuk akal")
            b.main(*nyala(seg_balik), run_time=0.9)
        qc.periksa_adegan(self, {"segitiga": segitiga, "balik": balik, "hasil tertukar": seg_balik},
                          hud={"identitas": ident, "papan": papan.semua()},
                          dunia={"bidang": bidang_m, "garis": garis_yx, "garis 2": garis_ymx})

        # --- sama: dua putaran BOLEH ditukar (contoh tandingan) ----------- #
        sapu_30 = poligon(juring(2.0, 0.0, 30 * DEGREES), AKSEN2, tebal=1.5, isian=0.14)
        sapu_60 = poligon(juring(2.0, 30 * DEGREES, 90 * DEGREES), SOROT, tebal=1.5, isian=0.14)
        with sinema.babak(self, "sama", DURASI, kata=KATA) as b:
            b.tunggu_kata("Tapi")
            b.main(FadeOut(segitiga), FadeOut(seg_balik), FadeOut(garis_yx), FadeOut(garis_ymx), FadeOut(balik),
                   run_time=0.5)
            kosongkan_papan(self, papan, b=b, run_time=0.4)
            b.tunggu_kata("Dua putaran")
            b.main(ShowCreation(sapu_30), run_time=0.8)
            b.tunggu_kata("boleh ditukar")
            b.main(ShowCreation(sapu_60), run_time=0.8)
            b.tunggu_kata("tiga puluh derajat")
            papan.baris(r"30^\circ + 60^\circ = 60^\circ + 30^\circ", warna=AKSEN2, b=b)
            b.tunggu_kata("sama saja")
            b.main(*nyala(sapu_30, sapu_60), run_time=0.9)
        qc.periksa_adegan(self, {"sapu 30": sapu_30, "sapu 60": sapu_60},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang_m})

        # --- umum: tiga langkah, M3 M2 M1; translasi dikerjakan terpisah -- #
        rantai = di_slot(r"T_1 \to T_2 \to T_3", 32, TINTA, SLOT_1, maks=5.0)
        tiga = di_slot(r"M_3\, M_2\, M_1", 34, SOROT, SLOT_2, maks=5.0)
        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Bentuk")
            b.main(FadeOut(sapu_30), FadeOut(sapu_60), run_time=0.5)
            kosongkan_papan(self, papan, b=b, run_time=0.4)
            b.tunggu_kata("T satu")
            b.main(FadeIn(rantai, shift=0.25 * UP), run_time=0.7)
            b.tunggu_kata("gabungannya")
            b.main(FadeIn(tiga, shift=0.25 * UP), run_time=0.8)
            b.tunggu_kata("paling kanan")
            b.main(*nyala(tiga), run_time=0.9)
            b.tunggu_kata("translasi")
            papan.baris(r"\text{translasi: bukan perkalian}", warna=REDUP, b=b)
        qc.periksa_adegan(self, {"rantai": rantai, "tiga": tiga},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang_m})

        # --- jaga: dibaca dari kanan ke kiri, mulai dari koordinatnya ----- #
        aturan = di_slot(rf"M_3\, M_2\, M_1 {kolom('x', 'y')}", 32, TINTA, SLOT_1, maks=6.0)
        panah_jaga = Arrow(titik3((1.6, -4.4)), titik3((-1.6, -4.4)), buff=0, thickness=4).set_color(AKSEN)
        with sinema.babak(self, "jaga", DURASI, kata=KATA) as b:
            b.tunggu_kata("bacalah")
            b.main(FadeOut(rantai), TransformMatchingStrings(tiga, aturan), run_time=0.8)
            b.tunggu_kata("mulai dari")
            b.main(GrowArrow(panah_jaga), run_time=0.8)
            b.tunggu_kata("paling dekat")
            b.main(*nyala(aturan), run_time=0.9)
        qc.periksa_adegan(self, {"aturan": aturan, "panah jaga": panah_jaga},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang_m})

        # --- rangkum: satu kalimat, lalu satu pertanyaan (cermin X dua kali) #
        tanya = di_slot(r"\text{cermin } X \cdot \text{cermin } X = \ ?", 32, AKSEN, SLOT_1, maks=6.0)
        with sinema.babak(self, "rangkum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Rangkumannya")
            b.main(FadeOut(aturan), FadeOut(panah_jaga), run_time=0.5)
            kosongkan_papan(self, papan, b=b, run_time=0.4)
            b.tunggu_kata("menggabungkan")
            b.main(ShowCreation(segitiga), run_time=0.8)
            b.tunggu_kata("dari kanan")
            b.main(*nyala(rum), run_time=0.8)
            b.tunggu_kata("Satu pertanyaan")
            b.main(FadeIn(tanya, shift=0.25 * UP), run_time=0.8)
            b.tunggu_kata("dicerminkan")
            b.main(ShowCreation(seg_cermin), run_time=0.6)
            b.tunggu_kata("dua kali")
            b.main(FadeOut(seg_cermin), *nyala(segitiga), run_time=0.9)
            b.tunggu_kata("gabungannya apa")
            b.main(*nyala(tanya), run_time=0.8)
        qc.periksa_adegan(self, {"segitiga": segitiga, "tanya": tanya},
                          hud={"identitas": ident, "papan": papan.semua()}, dunia={"bidang": bidang_m})

        # --- lanjut: Penerapan Transformasi Geometri ---------------------- #
        judul_lanjut = teks("Penerapan Transformasi Geometri", 30, SOROT).move_to([0, 2.9, 0]).fix_in_frame()
        # Tiga tempat pemakaiannya disusun ke bawah di KANAN petak (x layar 0,9),
        # supaya tidak menyentuh angka petak (x layar sampai -1,17) maupun zona
        # rumus (x > 2,10).
        tiga_tempat = VGroup(sinema.label("motif batik", 26, TINTA), sinema.label("permainan layar", 26, TINTA),
                             sinema.label("lengan robot", 26, TINTA))
        tiga_tempat.arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(np.array([0.9, 0.7, 0.0])).fix_in_frame()
        gabung_lagi = di_slot(rf"M_2\, M_1 = {M21}", 32, AKSEN, SLOT_1, maks=6.8)
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di materi")
            b.main(FadeOut(tanya), FadeOut(segitiga), FadeOut(papan.semua()), run_time=0.5)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, tanpa_utama=True)
            self.hud_tambah(judul_lanjut, tiga_tempat)
            self.remove(judul_lanjut, tiga_tempat)
            b.tunggu_kata("Penerapan")
            b.main(FadeIn(judul_lanjut, shift=0.2 * UP), run_time=0.7)
            b.tunggu_kata("motif")
            b.main(FadeIn(tiga_tempat[0]), run_time=0.5)
            b.tunggu_kata("permainan")
            b.main(FadeIn(tiga_tempat[1]), run_time=0.5)
            b.tunggu_kata("lengan")
            b.main(FadeIn(tiga_tempat[2]), run_time=0.5)
            b.tunggu_kata("matriks gabungan")
            b.main(FadeIn(gabung_lagi, shift=0.25 * UP), run_time=0.8)
            b.tunggu_kata("ribuan")
            b.main(*nyala(gabung_lagi), run_time=0.9)
        qc.periksa_adegan(self, {"gabungan": gabung_lagi},
                          hud={"identitas": ident, "judul": judul_lanjut, "tiga tempat": tiga_tempat},
                          dunia={"bidang": bidang_m})

        sinema.laporkan_pemicu(self)
