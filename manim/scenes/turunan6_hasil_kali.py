"""Video 04 topik TURUNAN, Materi 06 "Hasil kali dan hasil bagi":
Aturan Menurunkan, Bagian 2.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama yang
sudah disetujui ARYA. DUNIANYA SAMA: persegi panjang u kali v (u = x + 1 dan
v = x di x = 2, jadi 3 kali 2), digeser h sehingga tumbuh pita kanan (biru),
pita atas (merah), dan pojok (ungu) yang digambar ulang tiap frame dari h;
ketiganya dibagi h; h dikecilkan dan pojoknya lenyap; aturan u'v + uv';
contoh (x kuadrat + 1)(x - 3) diperiksa lewat jalan kedua; hasil bagi di
penutup.

YANG BERBEDA: pembuka sub-bab plus Bagian 2 dengan pertanyaan halaman;
segar-ingat Bagian 1 (bantahan x kali x); ASAL RUMUS dibaca dari gambarnya
(baris pita kanan berubah jadi u'v, pita atas jadi uv') lalu aturannya LAHIR
di atas gambar dan terbang ke panel, diperiksa dengan angka 1 kali 2 + 3 kali
1 = 5; babak "lengkung" mengubah baris pitanya jadi panah mendekat; babak
"keliru" (2x kali 1); rangkuman dengan pertanyaan; penutup menunjuk Bagian 3;
tiap kejadian dipicu pada KATA (`sinema.JamKata`).

TATA LETAK (diukur, diwarisi adegan lama): sisi u mendatar dan lebih panjang,
SKALA 1,22, sudut kiri bawah (-6, -1,85); tiga baris hitungan di kanan gambar
mulai x = -0,7 pada y = 0,6, -0,2, -1,0, semuanya di bawah jalur panel.

SATU WARNA SATU MAKNA: TINTA persegi panjang lama; AKSEN2 biru pita kanan
(pertambahan u); AKSEN merah pita atas (pertambahan v); SOROT ungu pojok dan
aturan yang disimpulkan; REDUP jabaran yang ditinggalkan.
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
KATA = sinema.JamKata(TOPIK)

SKALA = 1.22
SUDUT = np.array([-6.0, -1.85, 0.0])    # sudut kiri bawah, tetap sepanjang video
U0, V0 = 3.0, 2.0                        # u = x + 1 dan v = x, dihitung di x = 2
X_BARIS = -0.7                           # tepi kiri ketiga baris hitungan
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
    sinema.batasi_lebar(m, 4.6)
    m.move_to([X_BARIS + m.get_width() / 2, Y_BARIS[ke_berapa], 0])
    return m


class TurunanHasilKali(AdeganMatra):
    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True)

        def hud(*tambahan):
            isi = {}
            if ident is not None:
                isi["identitas"] = ident
            papan_isi = papan.semua()
            if papan_isi is not None:
                isi["papan"] = papan_isi
            for nama, m in tambahan:
                isi[nama] = m
            return isi

        def nyala(*mobs, warna=SOROT):
            return [Indicate(m, color=warna, scale_factor=1.0) for m in mobs]

        def ganti_baris(lama, isi, ke_berapa, warna, b, run_time=0.8):
            """Ganti satu baris hitungan di tempatnya (morph lambang)."""
            baru = baris_hitung(isi, ke_berapa, warna)
            b.main(TransformMatchingStrings(lama, baru), run_time=run_time)
            return baru

        ident = None

        # ================= buka: sub-bab, lalu pertanyaannya ============= #
        tanya = rumus(r"(u \cdot v)'\ \overset{?}{=}\ u' \cdot v'", 46, TINTA).move_to([0, 0.2, 0])
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Aturan")
            sinema.judul_pembuka(self, "Aturan Menurunkan, Bagian 2", lama=3.0, y=2.4)
            b.catat(3.0)
            b.tunggu_kata("Kenapa")
            b.main(FadeIn(tanya, scale=0.9), run_time=0.8)
            b.tunggu_kata("bukan")
            b.main(*nyala(tanya, warna=AKSEN), run_time=0.9)
        qc.periksa_adegan(self, {"tanya": tanya}, hud=hud())

        # ================= ingat: bantahan Bagian 1 ====================== #
        b1 = rumus(r"(x \cdot x)' = 2x", 50, TINTA).move_to([0, 0.8, 0])
        b2 = rumus(r"2x \ne 1 \cdot 1", 40, AKSEN).move_to([0, -0.7, 0])
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di Aturan")
            b.main(tanya.animate.set_opacity(0.25), run_time=0.6)
            b.tunggu_kata("bantahan")
            b.main(FadeOut(tanya), Write(b1), run_time=1.2)
            b.tunggu_kata("bukan satu")
            b.main(Write(b2), run_time=1.0)
            b.tunggu_kata("aturannya sendiri")
            b.main(*nyala(b2, warna=AKSEN), run_time=0.9)
        qc.periksa_adegan(self, {"bantah": b1, "beda": b2}, hud=hud())

        # ================= persegi: u, v, dan luasnya ==================== #
        ht = ValueTracker(0.0)
        dasar = kotak(U0 * SKALA, V0 * SKALA, SUDUT, TINTA, 0.14)
        l_u = rumus("u", 32, TINTA).next_to(dasar, DOWN, buff=0.28)
        l_v = rumus("v", 32, TINTA).next_to(dasar, LEFT, buff=0.28)
        l_luas = rumus(r"u \cdot v", 34, TINTA).move_to(dasar.get_center())
        with sinema.babak(self, "persegi", DURASI, kata=KATA) as b:
            # Bantahannya baru dibuang BERSAMAAN dengan persegi panjangnya muncul:
            # dibuang pada "digambar" menyisakan 2 detik layar kosong (12 Sep 2026).
            b.tunggu_kata("persegi panjang")
            b.main(FadeOut(b1), FadeOut(b2), ShowCreation(dasar), run_time=1.0)
            b.tunggu_kata("sebut u")
            b.main(FadeIn(l_u, shift=UP * 0.2), run_time=0.5)
            b.tunggu_kata("lebarnya v")
            b.main(FadeIn(l_v, shift=RIGHT * 0.2), run_time=0.5)
            b.tunggu_kata("u kali v")
            b.main(FadeIn(l_luas), run_time=0.6)
            b.tunggu_kata("turunkan")
            b.main(*nyala(dasar, warna=TINTA), run_time=0.9)
        qc.periksa_adegan(self, {"dasar": dasar}, hud=hud(), tulisan={"u": l_u, "v": l_v, "luas": l_luas})

        # ================= angka: supaya bisa diperiksa ================== #
        n_u = rumus("3", 30, TINTA).next_to(l_u, RIGHT, buff=0.22)
        n_v = rumus("2", 30, TINTA).next_to(l_v, DOWN, buff=0.22)
        with sinema.babak(self, "angka", DURASI, kata=KATA) as b:
            b.tunggu_kata("pakai angka")
            ident = sinema.identitas(self, "u = x + 1, v = x, di x = 2")
            ident.set_opacity(0)
            b.main(ident.animate.set_opacity(1), run_time=0.6)
            b.tunggu_kata("u bernilai")
            b.main(FadeIn(n_u, shift=RIGHT * 0.2), run_time=0.5)
            b.tunggu_kata("v bernilai")
            b.main(FadeIn(n_v, shift=DOWN * 0.2), run_time=0.5)
            papan.baris(r"u = 3,\ \ v = 2", warna=TINTA, b=b)
        qc.periksa_adegan(self, {"dasar": dasar}, hud=hud(),
                          tulisan={"u": l_u, "v": l_v, "luas": l_luas, "nilai u": n_u, "nilai v": n_v})

        # ================= geser: kedua sisi bertambah =================== #
        def p_kanan():
            h = ht.get_value()
            return kotak(h * SKALA, V0 * SKALA, SUDUT + np.array([U0 * SKALA, 0, 0]), AKSEN2, 0.55)

        def p_atas():
            h = ht.get_value()
            return kotak(U0 * SKALA, h * SKALA, SUDUT + np.array([0, V0 * SKALA, 0]), AKSEN, 0.55)

        def p_pojok():
            h = ht.get_value()
            return kotak(h * SKALA, h * SKALA, SUDUT + np.array([U0 * SKALA, V0 * SKALA, 0]), SOROT, 0.75)

        kanan = always_redraw(p_kanan)
        atas = always_redraw(p_atas)
        pojok = always_redraw(p_pojok)
        self.add(kanan, atas, pojok)

        l_h = rumus("h", 30, AKSEN2)
        l_h.move_to([SUDUT[0] + (U0 + 0.5) * SKALA, l_u.get_center()[1], 0])
        l_h2 = rumus("h", 30, AKSEN)
        l_h2.move_to([l_v.get_center()[0], SUDUT[1] + (V0 + 0.5) * SKALA, 0])
        with sinema.babak(self, "geser", DURASI, kata=KATA) as b:
            b.tunggu_kata("digeser")
            b.main(ht.animate.set_value(1.0), run_time=1.8)
            b.tunggu_kata("Panjangnya")
            b.main(FadeIn(l_h, shift=UP * 0.2), *nyala(kanan, warna=AKSEN2), run_time=0.9)
            b.tunggu_kata("lebarnya juga")
            b.main(FadeIn(l_h2, shift=RIGHT * 0.2), *nyala(atas, warna=AKSEN), run_time=0.9)
            b.tunggu_kata("tumbuh")
            b.main(*nyala(kanan, atas, pojok), run_time=0.9)
        qc.periksa_adegan(self, {"dasar": dasar, "kanan": kanan, "atas": atas}, hud=hud(),
                          tulisan={"u": l_u, "v": l_v, "luas": l_luas, "nilai u": n_u, "nilai v": n_v,
                                   "h": l_h, "h2": l_h2})

        # ================= tiga: ketiga bagiannya dikenali =============== #
        with sinema.babak(self, "tiga", DURASI, kata=KATA) as b:
            b.tunggu_kata("huruf L")
            b.main(FadeOut(l_luas), *nyala(kanan, atas, pojok), run_time=0.9)
            b.tunggu_kata("pita di kanan")
            b.main(*nyala(kanan, warna=AKSEN2), run_time=0.8)
            b.tunggu_kata("pita di atas")
            b.main(*nyala(atas, warna=AKSEN), run_time=0.8)
            b.tunggu_kata("pojok kecil")
            b.main(*nyala(pojok), run_time=0.8)
        qc.periksa_adegan(self, {"dasar": dasar, "kanan": kanan, "atas": atas}, hud=hud(),
                          tulisan={"u": l_u, "v": l_v, "nilai u": n_u, "nilai v": n_v, "h": l_h, "h2": l_h2})

        # ================= bagi: ketiganya dibagi h ====================== #
        r_kanan = baris_hitung(r"\text{pita kanan} : h = 2", 0, AKSEN2)
        r_atas = baris_hitung(r"\text{pita atas} : h = 3", 1, AKSEN)
        r_pojok = baris_hitung(r"\text{pojok} : h = h = 1", 2, SOROT)
        with sinema.babak(self, "bagi", DURASI, kata=KATA) as b:
            b.tunggu_kata("dibagi")
            b.main(*nyala(kanan, atas, pojok), run_time=0.9)
            b.tunggu_kata("Pita kanan")
            b.main(FadeIn(r_kanan, shift=LEFT * 0.2), run_time=0.7)
            b.tunggu_kata("pita atas")
            b.main(FadeIn(r_atas, shift=LEFT * 0.2), run_time=0.7)
            b.tunggu_kata("pojoknya")
            b.main(FadeIn(r_pojok, shift=LEFT * 0.2), run_time=0.7)
        qc.periksa_adegan(self, {"dasar": dasar, "kanan": kanan, "atas": atas}, hud=hud(),
                          tulisan={"u": l_u, "v": l_v, "nilai u": n_u, "nilai v": n_v, "h": l_h, "h2": l_h2,
                                   "baris kanan": r_kanan, "baris atas": r_atas, "baris pojok": r_pojok})

        # ================= pojok: h dikecilkan =========================== #
        with sinema.babak(self, "pojok", DURASI, kata=KATA) as b:
            b.tunggu_kata("dikecilkan")
            b.main(ht.animate.set_value(0.5), FadeOut(l_h), FadeOut(l_h2), run_time=1.6)
            r_pojok = ganti_baris(r_pojok, r"\text{pojok} : h = h = 0{,}5", 2, SOROT, b)
            b.tunggu_kata("tetap memberi")
            b.main(*nyala(r_kanan, warna=AKSEN2), *nyala(r_atas, warna=AKSEN), run_time=0.9)
            b.tunggu_kata("Yang menyusut")
            b.main(ht.animate.set_value(0.2), run_time=1.4)
            r_pojok = ganti_baris(r_pojok, r"\text{pojok} : h = h = 0{,}2", 2, SOROT, b)
            b.tunggu_kata("dua tambahan")
            b.main(*nyala(pojok), run_time=0.8)
        qc.periksa_adegan(self, {"dasar": dasar, "kanan": kanan, "atas": atas}, hud=hud(),
                          tulisan={"u": l_u, "v": l_v, "nilai u": n_u, "nilai v": n_v,
                                   "baris kanan": r_kanan, "baris atas": r_atas, "baris pojok": r_pojok})

        # ================= lenyap: pojoknya habis (berhenti di 0,1) ====== #
        with sinema.babak(self, "lenyap", DURASI, kata=KATA) as b:
            b.tunggu_kata("menuju nol")
            b.main(ht.animate.set_value(0.1), run_time=1.4)
            b.tunggu_kata("lenyap")
            r_pojok = ganti_baris(r_pojok, r"\text{pojok} : h \to 0", 2, SOROT, b)
            b.tunggu_kata("tinggal dua")
            b.main(*nyala(kanan, warna=AKSEN2), *nyala(atas, warna=AKSEN), run_time=0.8)
            b.tunggu_kata("dua tambah")
            papan.baris(r"2 + 3 = 5", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"dasar": dasar}, hud=hud(),
                          tulisan={"u": l_u, "v": l_v, "nilai u": n_u, "nilai v": n_v,
                                   "baris kanan": r_kanan, "baris atas": r_atas, "baris pojok": r_pojok})

        # ================= asal: kedua pita dibaca sebagai u'v dan uv' === #
        with sinema.babak(self, "asal", DURASI, kata=KATA) as b:
            b.tunggu_kata("Pita kanan")
            b.main(*nyala(kanan, warna=AKSEN2), run_time=0.8)
            b.tunggu_kata("u aksen kali")
            r_kanan = ganti_baris(r_kanan, r"\text{pita kanan} : h = u'v = 2", 0, AKSEN2, b)
            b.tunggu_kata("Pita atas")
            b.main(*nyala(atas, warna=AKSEN), run_time=0.8)
            b.tunggu_kata("u kali v")
            r_atas = ganti_baris(r_atas, r"\text{pita atas} : h = uv' = 3", 1, AKSEN, b)
        qc.periksa_adegan(self, {"dasar": dasar}, hud=hud(),
                          tulisan={"u": l_u, "v": l_v, "nilai u": n_u, "nilai v": n_v,
                                   "baris kanan": r_kanan, "baris atas": r_atas, "baris pojok": r_pojok})

        # ================= aturan: lahir di atas gambar, terbang ke panel = #
        with sinema.babak(self, "aturan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Turunan dari")
            rum = sinema.lahir_rumus(self, r"(u \cdot v)' = u'v + uv'", dekat=dasar, papan=papan, b=b, warna=SOROT,
                                     tahan=0.6, run_time=1.0, geser=UP * 2.0)
            b.tunggu_kata("Periksa")
            b.main(*nyala(r_kanan, warna=AKSEN2), *nyala(r_atas, warna=AKSEN), run_time=0.8)
            b.tunggu_kata("satu kali dua")
            papan.baris(r"1 \cdot 2 + 3 \cdot 1 = 5", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"dasar": dasar}, hud=hud(),
                          tulisan={"u": l_u, "v": l_v, "nilai u": n_u, "nilai v": n_v,
                                   "baris kanan": r_kanan, "baris atas": r_atas, "baris pojok": r_pojok})

        # ================= lengkung: catatan yang menjaga ================ #
        with sinema.babak(self, "lengkung", DURASI, kata=KATA) as b:
            b.tunggu_kata("dua garis")
            b.main(*nyala(ident, warna=TINTA), run_time=0.8)
            b.tunggu_kata("mendekati")
            r_kanan = ganti_baris(r_kanan, r"\text{pita kanan} : h \to u'v", 0, AKSEN2, b, run_time=0.7)
            r_atas = ganti_baris(r_atas, r"\text{pita atas} : h \to uv'", 1, AKSEN, b, run_time=0.7)
            b.tunggu_kata("tetap lenyap")
            b.main(*nyala(r_pojok), run_time=0.8)
            b.tunggu_kata("tetap berlaku")
            b.main(papan.sorot(), run_time=0.9)
        qc.periksa_adegan(self, {"dasar": dasar}, hud=hud(),
                          tulisan={"u": l_u, "v": l_v, "nilai u": n_u, "nilai v": n_v,
                                   "baris kanan": r_kanan, "baris atas": r_atas, "baris pojok": r_pojok})

        gambar = VGroup(dasar, l_u, l_v, n_u, n_v, r_kanan, r_atas, r_pojok)

        # ================= contoh: bentuk yang melengkung ================ #
        soal = rumus(r"(x^2+1)(x-3)", 46, TINTA).move_to([0, 0.9, 0])
        bagian = rumus(r"u = x^2+1,\ \ v = x-3", 32, AKSEN2).move_to([0, -0.5, 0])
        with sinema.babak(self, "contoh", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kita coba")
            # always_redraw memulihkan dirinya di tengah FadeOut (jebakan yang
            # sudah tercatat): pembaruannya dicabut dulu, baru dipudarkan.
            for m in (kanan, atas, pojok):
                m.clear_updaters()
            b.main(FadeOut(gambar), FadeOut(kanan), FadeOut(atas), FadeOut(pojok), run_time=0.6)
            self.remove(kanan, atas, pojok)
            kosong = [FadeOut(m) for m in papan.baris_lain]
            papan.baris_lain = []
            b.main(*kosong, run_time=0.4)
            papan.perbarui_alas()
            b.tunggu_kata("kuadrat")
            b.main(Write(soal), run_time=1.2)
            b.tunggu_kata("Bagian pertamanya")
            b.main(FadeIn(bagian, shift=UP * 0.25), run_time=0.7)
            b.tunggu_kata("keduanya")
            papan.baris(r"u = x^2+1,\ v = x-3", warna=AKSEN2, b=b)
        qc.periksa_adegan(self, {"soal": soal, "bagian": bagian}, hud=hud())

        # ================= susun ========================================= #
        turunanya = rumus(r"u' = 2x,\ \ v' = 1", 32, AKSEN).move_to([0, -1.7, 0])
        susun = rumus(r"2x(x-3) + (x^2+1) \cdot 1", 40, TINTA).move_to([0, 0.9, 0])
        sinema.batasi_lebar(susun, 9.0)
        with sinema.babak(self, "susun", DURASI, kata=KATA) as b:
            b.tunggu_kata("u aksen")
            b.main(FadeIn(turunanya, shift=UP * 0.25), run_time=0.7)
            b.tunggu_kata("Susun")
            b.main(FadeOut(soal), run_time=0.4)
            papan.baris(r"u'v + uv'", warna=TINTA, b=b)
            b.tunggu_kata("dua x kali")
            b.main(Write(susun), run_time=1.6)
        qc.periksa_adegan(self, {"susun": susun, "bagian": bagian, "turunan": turunanya}, hud=hud())

        # ================= rapikan ======================================= #
        with sinema.babak(self, "rapikan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dijabarkan")
            susun = sinema.ganti_rumus(self, susun, r"2x^2 - 6x + x^2 + 1", b=b, run_time=1.0)
            b.tunggu_kata("Dirapikan")
            susun = sinema.ganti_rumus(self, susun, r"3x^2 - 6x + 1", b=b, run_time=1.0)
            b.tunggu_kata("tambah satu", ke=2)
            b.main(*nyala(susun, warna=TINTA), run_time=0.8)
        qc.periksa_adegan(self, {"hasil": susun, "bagian": bagian, "turunan": turunanya}, hud=hud())

        # ================= periksa: jalan kedua ========================== #
        jalan2 = rumus(r"x^3 - 3x^2 + x - 3", 36, REDUP).move_to([0, -0.6, 0])
        with sinema.babak(self, "periksa", DURASI, kata=KATA) as b:
            b.tunggu_kata("jalan kedua")
            b.main(FadeOut(bagian), FadeOut(turunanya), run_time=0.5)
            b.tunggu_kata("kalikan dulu")
            b.main(Write(jalan2), run_time=1.4)
            b.tunggu_kata("turunkan suku")
            jalan2 = sinema.ganti_rumus(self, jalan2, r"3x^2 - 6x + 1", b=b, run_time=1.0, warna=AKSEN)
            b.tunggu_kata("sama persis")
            b.main(*nyala(susun, warna=AKSEN), *nyala(jalan2, warna=AKSEN), run_time=0.9)
        qc.periksa_adegan(self, {"hasil": susun, "jalan kedua": jalan2}, hud=hud())

        # ================= keliru: hasil kali turunan ==================== #
        salah = rumus(r"u' \cdot v' = 2x \cdot 1 = 2x", 36, AKSEN).move_to([0, -0.6, 0])
        with sinema.babak(self, "keliru", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kekeliruan")
            b.main(FadeOut(jalan2), run_time=0.5)
            b.tunggu_kata("dua x kali")
            b.main(Write(salah), run_time=1.2)
            b.tunggu_kata("Padahal")
            b.main(*nyala(susun, warna=TINTA), run_time=0.9)
            b.tunggu_kata("dibiarkan utuh")
            b.main(papan.sorot(), run_time=0.9)
        qc.periksa_adegan(self, {"hasil": susun, "salah": salah}, hud=hud())

        # ================= tutup: hasil bagi ada di halaman ============== #
        bagi = rumus(r"\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}", 46, SOROT).move_to([0, 0.3, 0])
        sinema.batasi_lebar(bagi, 9.0)
        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("pembagian")
            b.main(FadeOut(susun), FadeOut(salah), run_time=0.5)
            b.main(Write(bagi), run_time=1.4)
            b.tunggu_kata("pengurangan")
            b.main(*nyala(bagi), run_time=0.9)
            b.tunggu_kata("dibagi v")
            papan.baris(r"v \ne 0", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"hasil bagi": bagi}, hud=hud())

        # ================= rangkum: satu kalimat, satu pertanyaan ======== #
        soal_akhir = rumus(r"u = v = x:\ \ (x \cdot x)' = \ ?", 40, AKSEN).move_to([0, 0.3, 0])
        # Aturannya ditulis lagi besar di tengah selama rangkuman: tanpa ini layar
        # kerja kosong 8 detik (hanya panel yang disorot), tertangkap
        # cek_layar_kosong 12 Sep 2026.
        aturan_ulang = rumus(r"(u \cdot v)' = u'v + uv'", 46, SOROT).move_to([0, 0.3, 0])
        with sinema.babak(self, "rangkum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Rangkumannya")
            b.main(FadeOut(bagi), FadeIn(aturan_ulang, scale=0.9), run_time=0.7)
            b.tunggu_kata("dua pita")
            b.main(*nyala(aturan_ulang), run_time=0.9)
            b.tunggu_kata("Satu pertanyaan")
            b.main(FadeOut(aturan_ulang), FadeIn(soal_akhir, scale=0.9), run_time=0.8)
            b.tunggu_kata("memberi")
            b.main(*nyala(soal_akhir, warna=AKSEN), run_time=0.8)
        qc.periksa_adegan(self, {"soal akhir": soal_akhir}, hud=hud())

        # ================= lanjut: Bagian 3, aturan rantai =============== #
        judul_lanjut = teks("Aturan Menurunkan, Bagian 3", 30, SOROT).move_to([0, 2.9, 0]).fix_in_frame()
        rantai = rumus(r"y = f(u),\ \ u = g(x)", 40, TINTA).move_to([0, 0.6, 0])
        rantai_tanya = rumus(r"\frac{dy}{dx} = \ ?", 40, AKSEN).move_to([0, -0.9, 0])
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di materi")
            b.main(FadeOut(soal_akhir), FadeOut(papan.semua()), run_time=0.5)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, ukuran=30, alas=True)
            self.hud_tambah(judul_lanjut)
            self.remove(judul_lanjut)
            b.tunggu_kata("Aturan")
            b.main(FadeIn(judul_lanjut, shift=0.2 * UP), run_time=0.7)
            b.tunggu_kata("y bergantung")
            b.main(FadeIn(rantai, shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("seberapa cepat")
            b.main(FadeIn(rantai_tanya, shift=UP * 0.2), run_time=0.8)
        qc.periksa_adegan(self, {"rantai": rantai, "tanya": rantai_tanya},
                          hud={"identitas": ident, "judul": judul_lanjut})

        sinema.laporkan_pemicu(self)
