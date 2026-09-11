"""Perbandingan Trigonometri, Bagian 4 (Materi 04): lahirnya sin, cos, dan
tan. STANDAR VIDEO v3.1, ditulis ulang 11 Sep 2026 dari adegan Manim CE yang
sudah disetujui ARYA (31 Agu). ISINYA SAMA: tiga sisi, enam cara membagi
DIHITUNG dulu (3 pilihan atas, 2 sisa bawah), baru diberi nama; sin, cos, tan
adalah tiga di antaranya; sisanya kebalikannya.

YANG BERBEDA DARI VERSI LAMA
- Pembuka menyebut sub-bab plus Bagian 4, bukan judul materi.
- Segar-ingat 16 detik: nama sisi dari Bagian 3 muncul pada kata yang
  menyebutnya (depan, samping, miring).
- "Kenapa penyebutnya 2, bukan 3" jadi kalimat narasi sendiri (dulu hanya
  teks kecil) dengan gambar depan/depan = 1 yang dicoret.
- Contoh angka segitiga 3-4-5 (ada di halaman materi): sin 0,6, cos 0,8,
  tan 0,75, disimpan di panel kanan atas.
- Tiap kejadian dipicu pada kata yang mengucapkannya.

INTI YANG HARUS TERTANAM tetap: enam kemungkinan dihitung dulu, baru diberi
nama. Kalau langsung menyodorkan tiga rumus, siswa kembali menerima rumus
tanpa tahu dari mana.

WARNA (sama dengan widget materi 04): merah = sisi depan, biru = sisi
samping, tinta = sisi miring, ungu = sudut dan sorotan.

ANGKANYA: 3 x 2 = 6; 3/5 = 0,6; 4/5 = 0,8; 3/4 = 0,75. Sisi 3-4-5 DIBERIKAN,
bukan dihitung, jadi Pythagoras tidak disebut.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "tahap4-lahirnya-rasio"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

SIKU = np.array([-2.6, -1.8, 0.0])      # titik siku-siku (kanan bawah segitiga)
LEBAR = 3.6                              # sisi samping di layar
SUDUT = 34.0                             # derajat

# Kisi 3 x 2 pecahan di kanan; baris teratas di bawah panel kanan atas.
X_KOTAK = [1.55, 4.75]
Y_KOTAK = [1.05, -0.45, -1.85]


def hud(ident, papan):
    isi = {"identitas": ident} if ident is not None else {}
    p = papan.semua()
    if p is not None:
        isi["papan"] = p
    return isi


def siku_tanda(sudut_di, arah_a, arah_b, ukuran=0.30, warna=REDUP):
    p = np.array(sudut_di)
    u = np.array(arah_a) / max(np.linalg.norm(arah_a), 1e-9) * ukuran
    v = np.array(arah_b) / max(np.linalg.norm(arah_b), 1e-9) * ukuran
    return VGroup(Line(p + u, p + u + v), Line(p + v, p + u + v)).set_stroke(warna, 2.4)


WARNA_SISI = {"depan": AKSEN, "samping": AKSEN2, "miring": TINTA}


def kotak_pecahan(atas, bawah, ukuran=30):
    """Satu pecahan nama sisi, pembilang dan penyebut berwarna sisinya."""
    a = rumus(rf"\text{{{atas}}}", ukuran, WARNA_SISI[atas])
    b = rumus(rf"\text{{{bawah}}}", ukuran, WARNA_SISI[bawah])
    lebar = max(a.get_width(), b.get_width()) + 0.2
    garis = Line(LEFT * lebar / 2, RIGHT * lebar / 2).set_stroke(TINTA, 2.4)
    a.next_to(garis, UP, buff=0.10)
    b.next_to(garis, DOWN, buff=0.10)
    return VGroup(a, b, garis)


class LahirnyaRasio(AdeganMatra):
    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True, tanpa_utama=True)
        ident = None

        # ---- segitiga siku-siku dengan tiga sisi bernama ---------------- #
        A = SIKU + LEFT * LEBAR                       # sudut theta
        C = SIKU + UP * LEBAR * np.tan(np.radians(SUDUT))
        samping = Line(A, SIKU).set_stroke(AKSEN2, 6)
        depan = Line(SIKU, C).set_stroke(AKSEN, 6)
        miring = Line(A, C).set_stroke(TINTA, 6)
        tanda = siku_tanda(SIKU, A - SIKU, C - SIKU)
        busur = Arc(radius=0.55, start_angle=0, angle=np.radians(SUDUT),
                    arc_center=A).set_stroke(SOROT, 4)
        theta = rumus(r"\theta", 32, SOROT).move_to(
            A + rotate_vector(RIGHT * 0.95, np.radians(SUDUT) / 2))
        segitiga = VGroup(samping, depan, miring, tanda, busur, theta)
        n_samping = sinema.label("samping", warna=AKSEN2).next_to(samping, DOWN, buff=0.2)
        n_depan = sinema.label("depan", warna=AKSEN).next_to(depan, RIGHT, buff=0.2)
        # Cukup jauh dari garis miringnya supaya "= 5" yang menempel di
        # kanannya nanti tidak menindih garis (render 480p pertama, 11 Sep).
        n_miring = sinema.label("miring", warna=TINTA).move_to(
            (A + C) / 2 + UP * 0.78 + LEFT * 0.55)
        nama_sisi = VGroup(n_samping, n_depan, n_miring)

        # ============ buka ============================================== #
        tanya = teks("Dari mana sinus, cosinus, dan tangen datang?", 34, TINTA)
        tanya.move_to([0, -0.6, 0])
        sinema.batasi_lebar(tanya, 10.5)
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Perbandingan")
            sinema.judul_pembuka(self, "Perbandingan Trigonometri, Bagian 4", lama=3.2)
            b.catat(3.2)
            b.tunggu_kata("Dari")
            b.main(Write(tanya), run_time=2.0)

        # ============ segar-ingat: nama sisi dari Bagian 3 =============== #
        # Pertanyaannya baru dibuang saat kalimat berikutnya mulai, dan
        # segitiganya digambar pada "Perbandingan Trigonometri", bukan pada
        # "segitiga" lima detik kemudian: cek_layar_kosong menandai tujuh
        # detik kosong pada render 480p pertama (11 Sep).
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("materi sebelumnya")
            ident = sinema.identitas(self, "ingat Bagian 3")
            ident.set_opacity(0.0)
            b.main(FadeOut(tanya), ident.animate.set_opacity(1.0), run_time=0.5)
            b.tunggu_kata("Perbandingan")
            b.main(ShowCreation(samping), ShowCreation(depan), ShowCreation(miring),
                   run_time=1.0)
            b.tunggu_kata("Bagian")
            b.main(ShowCreation(tanda), ShowCreation(busur), FadeIn(theta), run_time=0.6)
            b.tunggu_kata("Sisi depan")
            b.main(Indicate(depan, color=AKSEN, scale_factor=1.0), FadeIn(n_depan), run_time=0.8)
            b.tunggu_kata("sisi samping")
            b.main(Indicate(samping, color=AKSEN2, scale_factor=1.0), FadeIn(n_samping),
                   run_time=0.8)
            b.tunggu_kata("sisi miring")
            b.main(Indicate(miring, color=TINTA, scale_factor=1.0), FadeIn(n_miring),
                   run_time=0.8)
        qc.periksa_adegan(self, {"segitiga": segitiga}, hud=hud(ident, papan),
                          tulisan={"samping": n_samping, "depan": n_depan, "miring": n_miring})

        # ============ pertanyaannya: berapa cara membagi ================= #
        with sinema.babak(self, "tanya", DURASI, kata=KATA) as b:
            b.tunggu_kata("ketiga sisi")
            b.main(LaggedStart(*[Indicate(m, color=SOROT) for m in nama_sisi],
                               lag_ratio=0.35), run_time=1.6)
            b.tunggu_kata("hitung")
            ident2 = sinema.identitas(self, "hitung dulu")
            ident2.set_opacity(0.0)
            b.main(FadeOut(ident), run_time=0.3)
            b.main(ident2.animate.set_opacity(1.0), run_time=0.3)
            ident = ident2

        # ============ hitung: 3 pilihan atas, 2 sisa bawah ============== #
        atas = teks("3 pilihan untuk pembilang", 30, TINTA)
        atas[0:1].set_color(SOROT)
        atas.move_to([3.2, 1.05, 0])
        bawah = teks("2 sisa untuk penyebut", 30, TINTA)
        bawah[0:1].set_color(SOROT)
        bawah.move_to([3.2, 0.15, 0])
        sinema.batasi_lebar(atas, 5.8)
        sinema.batasi_lebar(bawah, 5.8)
        with sinema.babak(self, "hitung", DURASI, kata=KATA) as b:
            b.tunggu_kata("pembilang")
            b.main(Indicate(n_depan, color=SOROT), run_time=0.7)
            b.tunggu_kata("penyebut")
            b.main(Indicate(n_samping, color=SOROT), run_time=0.7)
            b.tunggu_kata("tiga")
            b.main(Write(atas), run_time=1.3)
            b.tunggu_kata("dua")
            b.main(Write(bawah), run_time=1.2)
        qc.periksa_adegan(self, {"segitiga": segitiga}, hud=hud(ident, papan),
                          tulisan={"samping": n_samping, "depan": n_depan, "miring": n_miring,
                                   "atas": atas, "bawah": bawah})

        # ============ kenapa 2: sisi dibagi dirinya sendiri selalu 1 ===== #
        diri = kotak_pecahan("depan", "depan", ukuran=32)
        diri.move_to([3.2, -1.25, 0])
        diri_hasil = rumus("= 1", 32, TINTA).next_to(diri, RIGHT, buff=0.25).match_y(diri[2])
        coret = Line(diri.get_corner(DL) + DL * 0.08, diri.get_corner(UR) + UR * 0.08
                     ).set_stroke(AKSEN, 4)
        with sinema.babak(self, "sisa_dua", DURASI, kata=KATA) as b:
            b.tunggu_kata("dipakai", ke=2)
            b.main(FadeIn(diri, shift=UP * 0.15), run_time=0.8)
            b.tunggu_kata("selalu")
            b.main(Write(diri_hasil), run_time=0.7)
            b.main(ShowCreation(coret), run_time=0.6)
        qc.periksa_adegan(self, {"segitiga": segitiga, "diri": diri, "hasil": diri_hasil},
                          hud=hud(ident, papan),
                          tulisan={"atas": atas, "bawah": bawah})

        # ============ enam: 3 x 2 = 6, enam kotak pecahan =============== #
        kali = rumus(r"3 \times 2 = 6", 44, TINTA).move_to([3.2, 0.6, 0])
        kali[-1].set_color(SOROT)
        pasangan = [("depan", "miring"), ("samping", "miring"), ("depan", "samping"),
                    ("miring", "depan"), ("miring", "samping"), ("samping", "depan")]
        kotaks = VGroup()
        for i, (a, bw) in enumerate(pasangan):
            kolom, baris = divmod(i, 3)
            kotaks.add(kotak_pecahan(a, bw).move_to([X_KOTAK[kolom], Y_KOTAK[baris], 0]))
        with sinema.babak(self, "enam", DURASI, kata=KATA) as b:
            b.tunggu_kata("Tiga")
            b.main(FadeOut(atas), FadeOut(bawah), FadeOut(diri), FadeOut(diri_hasil),
                   FadeOut(coret), run_time=0.4)
            b.main(Write(kali), run_time=1.0)
            b.tunggu_kata("Jadi")
            b.main(FadeOut(kali), run_time=0.4)
            b.tunggu_kata("enam", ke=2)
            b.main(LaggedStart(*[FadeIn(m, shift=UP * 0.12) for m in kotaks], lag_ratio=0.2),
                   run_time=2.2)
        qc.periksa_adegan(self, {"segitiga": segitiga, "kotak": kotaks}, hud=hud(ident, papan),
                          tulisan={"samping": n_samping, "depan": n_depan, "miring": n_miring})

        # ============ semuanya punya nama ================================ #
        bingkai = SurroundingRectangle(kotaks, buff=0.32)
        bingkai.set_stroke(REDUP, 2)
        with sinema.babak(self, "nama", DURASI, kata=KATA) as b:
            b.tunggu_kata("keenamnya")
            b.main(ShowCreation(bingkai), run_time=1.0)
            b.tunggu_kata("Tiga")
            b.main(LaggedStart(*[Indicate(kotaks[i], color=SOROT) for i in (0, 1, 2)],
                               lag_ratio=0.3), run_time=1.6)
        qc.periksa_adegan(self, {"segitiga": segitiga, "kotak": kotaks, "bingkai": bingkai},
                          hud=hud(ident, papan))

        # ============ sin, cos, tan ====================================== #
        def siap_nama(indeks, isi, warna):
            target = kotaks[indeks]
            sorot = SurroundingRectangle(target, buff=0.14).set_stroke(warna, 3)
            label = rumus(isi, 32, warna)
            label.next_to(sorot, LEFT, buff=0.35)
            return VGroup(sorot, label)

        def qc_nama(label):
            qc.periksa_adegan(self, {"segitiga": segitiga, "kotak": kotaks, "bingkai": bingkai},
                              hud=hud(ident, papan),
                              tulisan={"label": label, "samping": n_samping,
                                       "depan": n_depan, "miring": n_miring})

        # Tiga babak ditulis terbuka (bukan lewat satu penolong bernama babak
        # dinamis) supaya `cek_pemicu_urut` bisa membaca tiap pemicunya.
        t_sin = siap_nama(0, r"\sin\theta =", AKSEN)
        with sinema.babak(self, "sin", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sisi")
            b.main(ShowCreation(t_sin[0]), run_time=0.8)
            b.tunggu_kata("Namanya")
            b.main(Write(t_sin[1]), run_time=1.0)
            b.tunggu_kata("sin")
            b.main(Indicate(t_sin[1], color=AKSEN), run_time=0.8)
        qc_nama(t_sin[1])

        t_cos = siap_nama(1, r"\cos\theta =", AKSEN2)
        with sinema.babak(self, "cos", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sisi")
            b.main(ShowCreation(t_cos[0]), run_time=0.8)
            b.tunggu_kata("Namanya")
            b.main(Write(t_cos[1]), run_time=1.0)
            b.tunggu_kata("cos")
            b.main(Indicate(t_cos[1], color=AKSEN2), run_time=0.8)
        qc_nama(t_cos[1])

        t_tan = siap_nama(2, r"\tan\theta =", TINTA)
        with sinema.babak(self, "tan", DURASI, kata=KATA) as b:
            b.tunggu_kata("sisi")
            b.main(ShowCreation(t_tan[0]), run_time=0.8)
            b.tunggu_kata("Namanya")
            b.main(Write(t_tan[1]), run_time=1.0)
            b.tunggu_kata("tan")
            b.main(Indicate(t_tan[1], color=TINTA), run_time=0.8)
        qc_nama(t_tan[1])

        # ============ contoh angka: segitiga 3-4-5 ======================= #
        a_depan = rumus("= 3", 26, AKSEN).next_to(n_depan, RIGHT, buff=0.12)
        a_samping = rumus("= 4", 26, AKSEN2).next_to(n_samping, RIGHT, buff=0.12)
        a_miring = rumus("= 5", 26, TINTA).next_to(n_miring, RIGHT, buff=0.12)
        with sinema.babak(self, "contoh", DURASI, kata=KATA) as b:
            b.tunggu_kata("tiga")
            b.main(Write(a_depan), run_time=0.7)
            b.tunggu_kata("empat")
            b.main(Write(a_samping), run_time=0.7)
            b.tunggu_kata("lima")
            b.main(Write(a_miring), run_time=0.7)
        qc.periksa_adegan(self, {"segitiga": segitiga, "kotak": kotaks}, hud=hud(ident, papan),
                          tulisan={"samping": n_samping, "depan": n_depan, "miring": n_miring,
                                   "a depan": a_depan, "a samping": a_samping,
                                   "a miring": a_miring})

        with sinema.babak(self, "contoh_nilai", DURASI, kata=KATA) as b:
            b.tunggu_kata("Sinus")
            b.main(Indicate(t_sin, color=AKSEN), run_time=0.8)
            b.tunggu_kata("nol")
            papan.baris(r"\sin\theta = 3/5 = 0{,}6", warna=AKSEN, b=b)
            b.tunggu_kata("Cosinus")
            b.main(Indicate(t_cos, color=AKSEN2), run_time=0.8)
            b.tunggu_kata("nol", ke=2)
            papan.baris(r"\cos\theta = 4/5 = 0{,}8", warna=AKSEN2, b=b)
            b.tunggu_kata("tangen")
            b.main(Indicate(t_tan, color=TINTA), run_time=0.8)
            b.tunggu_kata("nol", ke=3)
            papan.baris(r"\tan\theta = 3/4 = 0{,}75", warna=TINTA, b=b)
        qc.periksa_adegan(self, {"segitiga": segitiga, "kotak": kotaks, "bingkai": bingkai},
                          hud=hud(ident, papan),
                          tulisan={"samping": n_samping, "depan": n_depan, "miring": n_miring,
                                   "a depan": a_depan, "a samping": a_samping,
                                   "a miring": a_miring})

        # ============ kenapa tiga itu yang terkenal ====================== #
        with sinema.babak(self, "kenapa", DURASI, kata=KATA) as b:
            b.tunggu_kata("sisi miring")
            b.main(Indicate(miring, color=SOROT, scale_factor=1.0), Indicate(n_miring, color=SOROT),
                   run_time=1.0)
            b.tunggu_kata("Membaginya")
            b.main(Indicate(kotaks[0], color=SOROT), Indicate(kotaks[1], color=SOROT),
                   run_time=1.0)
            b.tunggu_kata("antara")
            b.main(papan.sorot(), run_time=1.0)

        # ============ tiga sisanya: csc, sec, cot ======================== #
        nama_sisa = [r"\csc\theta =", r"\sec\theta =", r"\cot\theta ="]
        warna_sisa = [AKSEN, AKSEN2, TINTA]
        t_sisa = VGroup()
        for k, (n, w) in enumerate(zip(nama_sisa, warna_sisa)):
            lab = rumus(n, 30, w)
            lab.next_to(kotaks[3 + k], LEFT, buff=0.26)
            t_sisa.add(lab)
        with sinema.babak(self, "sisa", DURASI, kata=KATA) as b:
            b.tunggu_kata("Tiga")
            b.main(LaggedStart(*[Indicate(kotaks[i], color=SOROT) for i in (3, 4, 5)],
                               lag_ratio=0.3), run_time=1.4)
            b.tunggu_kata("kosekan")
            b.main(Write(t_sisa[0]), run_time=0.8)
            b.tunggu_kata("sekan")
            b.main(Write(t_sisa[1]), run_time=0.8)
            b.tunggu_kata("kotangen")
            b.main(Write(t_sisa[2]), run_time=0.8)
        qc.periksa_adegan(self, {"segitiga": segitiga, "kotak": kotaks, "bingkai": bingkai},
                          hud=hud(ident, papan),
                          tulisan={"sisa": t_sisa, "sin": t_sin[1], "cos": t_cos[1],
                                   "tan": t_tan[1]})

        # ============ penutup ============================================ #
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("sinus")
            b.main(LaggedStart(*[Indicate(m[1], color=SOROT) for m in (t_sin, t_cos, t_tan)],
                               lag_ratio=0.3), run_time=1.8)
            b.tunggu_kata("tiga dari enam")
            b.main(Indicate(bingkai, color=SOROT, scale_factor=1.0), run_time=1.0)

        lanjut = teks("Lingkaran Satuan dan Sudut Istimewa, Bagian 1", 30, SOROT)
        lanjut.move_to([3.0, -0.4, 0])
        sinema.batasi_lebar(lanjut, 7.6)
        # TIDAK ada potongan lingkaran yang mengintip: sepotong busur tanpa
        # lingkarannya terbaca ARYA sebagai glitch (11 Sep 2026). Gambar yang
        # belum dijelaskan jangan dimunculkan; cukup sisi miringnya disorot.
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Lingkaran")
            b.main(FadeOut(bingkai), FadeOut(kotaks), FadeOut(t_sin), FadeOut(t_cos),
                   FadeOut(t_tan), FadeOut(t_sisa), run_time=0.6)
            b.main(FadeIn(lanjut, shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("miringnya")
            b.main(Indicate(miring, color=SOROT, scale_factor=1.0), run_time=0.6)
            b.tunggu_kata("tepat")
            b.main(Indicate(a_miring, color=SOROT), run_time=0.8)
        qc.periksa_adegan(self, {"segitiga": segitiga},
                          hud=hud(ident, papan), jaga_jalur_bawah=False,
                          tulisan={"lanjut": lanjut, "samping": n_samping, "depan": n_depan,
                                   "miring": n_miring})

        sinema.laporkan_pemicu(self)
