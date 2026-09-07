"""Video 05 topik TURUNAN, untuk Materi 01 "Seberapa cepat, rata-ratanya".

TUGAS VIDEO INI
Membangun satu gagasan tanpa memberinya nama resmi: laju perubahan rata-rata
dan kemiringan garis penghubung dua titik adalah ANGKA YANG SAMA, cuma
diceritakan dengan dua bahasa. Kata "turunan", "garis singgung", dan
"kemiringan sesaat" sengaja tidak muncul; ketiganya milik Materi 02, dan aturan
proyek jelas: nama diberikan setelah bendanya dilihat.

PEMBUKA 3D, DAN CUMA DI SINI
Ini video pertama topik menurut urutan belajar, jadi ia yang mendapat jatah
pembuka 3D (STANDAR butir 2): pekerja dan mobil yang selesai dirakit, empat
detik saja. Sesudah itu kamera terbang tegak lurus ke atas dan tidak kembali;
sisa videonya datar, sebab yang dibaca sesudah itu angka, bukan benda.

KENAPA BUKAN `bidang_bernomor`
Sumbunya jam lawan barang: 6 jam berbanding 90 barang. `bidang_bernomor`
mengunci satu satuan mendatar sama dengan satu satuan tegak, dan pada data ini
itu berarti gambarnya jadi pita setinggi 90 satuan di atas alas 6 satuan, tidak
mungkin terbaca. Sumbunya dibuat berskala sendiri, dan SETIAP sisi segitiga
diberi angkanya (2 jam, 44 barang) supaya yang dibaca siswa adalah angka pada
sumbu, bukan panjang di layar. Angka sumbunya tetap didaftarkan ke qc lewat
atribut `angka`, jadi gerbang tulisan lawan angka sumbu tetap berlaku.

KURVANYA SAMA PERSIS DENGAN WIDGET
Interpolasi Hermite monoton (Fritsch-Carlson) lewat ketujuh titik catatan,
dipindahkan apa adanya dari `web/components/widget/turunan/GarisPotong.tsx`.
Kalau video memakai kurva yang cuma "mirip", angka di video dan di widget akan
berbeda tipis, dan siswa yang teliti akan menyangka salah satunya salah. Monoton
dipilih, bukan spline biasa, sebab spline biasa bisa membuat kurva turun sedikit
di antara dua titik yang naik, dan pada kurva produksi itu berarti pabriknya
seolah pernah menghasilkan barang negatif.

SATU WARNA SATU MAKNA (butir 10)
  TINTA         kurva produksi dan catatan angkanya
  AKSEN merah   titik jam ke-1 dan jam ke-3, yaitu yang sedang ditanyakan
  AKSEN2 biru   garis potong dan segitiganya
  SOROT ungu    angka jawabannya, dan pasangan titik lain sebagai pembanding
  REDUP         sumbu, petak, dan benda 3D pembuka

ANGKANYA SAMA DENGAN HALAMAN
Tabel 0, 20, 44, 64, 78, 86, 90 beserta ketiga laju rata-rata (22, 24, 11)
adalah isi Materi 01. Klaimnya diperiksa `alat/klaim-video-turunan.json`
dengan awalan V01.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "turunan1-laju-rata-rata"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

CATATAN = [(0, 0), (1, 20), (2, 44), (3, 64), (4, 78), (5, 86), (6, 90)]
JAM_AKHIR = 6


def _kemiringan_simpul():
    """Kemiringan simpul Fritsch-Carlson. Dipindahkan dari widget, apa adanya."""
    n = len(CATATAN)
    lebar = [CATATAN[i + 1][0] - CATATAN[i][0] for i in range(n - 1)]
    beda = [(CATATAN[i + 1][1] - CATATAN[i][1]) / lebar[i] for i in range(n - 1)]
    m = [0.0] * n
    m[0] = beda[0]
    m[-1] = beda[-1]
    for i in range(1, n - 1):
        if beda[i - 1] * beda[i] <= 0:
            continue
        w1 = 2 * lebar[i] + lebar[i - 1]
        w2 = lebar[i] + 2 * lebar[i - 1]
        m[i] = (w1 + w2) / (w1 / beda[i - 1] + w2 / beda[i])
    return m


M_SIMPUL = _kemiringan_simpul()


def produksi(t):
    """Jumlah barang yang sudah selesai pada jam ke-t."""
    x = float(np.clip(t, 0, JAM_AKHIR))
    i = 0
    while i < len(CATATAN) - 2 and x > CATATAN[i + 1][0]:
        i += 1
    t0, y0 = CATATAN[i]
    t1, y1 = CATATAN[i + 1]
    lebar = t1 - t0
    s = (x - t0) / lebar
    s2, s3 = s * s, s * s * s
    return (y0 * (2 * s3 - 3 * s2 + 1)
            + lebar * M_SIMPUL[i] * (s3 - 2 * s2 + s)
            + y1 * (-2 * s3 + 3 * s2)
            + lebar * M_SIMPUL[i + 1] * (s3 - s2))


def hud_dengan_papan(ident, papan):
    """Isi `hud=` untuk qc, aman saat panelnya masih kosong."""
    isi = {"identitas": ident}
    papan_isi = papan.semua()
    if papan_isi is not None:
        isi["papan"] = papan_isi
    return isi


class TurunanLajuRataRata(AdeganMatra):
    """Waktu tiap babak dihitung mundur dari durasi narasinya sejak awal."""

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self, ukuran=30, alas=True)

        # ================= buka ========================================== #
        kamera.pasang_awal(frame, theta=-32, phi=66, pusat=(0, 0, 0.9), tinggi=7.6)
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(2.4, DURASI["buka"] - 0.8)
            sinema.judul_pembuka(self, "Materi 01: seberapa cepat, rata-ratanya", lama=lama)
            b.catat(lama)

        # ================= pabrik: satu-satunya babak 3D ================= #
        lantai = ilustrasi.lantai_kisi(ukuran=10, tinggi_z=0.0)
        pekerja = ilustrasi.orang(1.6).move_to([-3.0, 0.2, 0.8])
        mobil_a = ilustrasi.mobil(2.0).move_to([-0.4, 0.0, 0.35])
        mobil_b = ilustrasi.mobil(2.0).move_to([2.3, 0.0, 0.35])
        # `Group`, bukan `VGroup`: mobil benda 3D dan VGroup cuma menerima
        # VMobject. Pesan aslinya "Only VMobjects can be passed into VGroup".
        barang = Group(mobil_a, mobil_b)

        with sinema.babak(self, "pabrik", DURASI) as b:
            # Empat detik saja, batas pembuka 3D menurut MASTER 8 Sep 2026.
            b.main(FadeIn(lantai), FadeIn(pekerja), run_time=1.2)
            b.main(FadeIn(mobil_a, shift=RIGHT * 0.6), run_time=1.0)
            b.main(FadeIn(mobil_b, shift=RIGHT * 0.6), run_time=1.0)
            b.main(kamera.putar_pelan(frame, 10), run_time=0.7)
        qc.periksa_adegan(self, {}, dunia={"pekerja": pekerja, "barang": barang},
                          jaga_jalur_bawah=False)

        # ================= sumbu dan kurva, disiapkan sebelum terbang ==== #
        # Batas bawah kedua sumbu kelipatan langkahnya (0 kelipatan 1 dan
        # kelipatan 20), jadi angka sumbunya jatuh tepat di garis petak.
        sumbu = Axes(
            x_range=(0, 6.4, 1), y_range=(0, 100, 20), width=7.6, height=4.4,
            axis_config=dict(stroke_color=REDUP, stroke_width=2.4),
        )
        sumbu.move_to([0.4, 0.1, 0])
        angka = sumbu.add_coordinate_labels(font_size=22, num_decimal_places=0)
        angka.set_color(TINTA).set_opacity(0.75)
        sumbu.angka = angka          # supaya gerbang tulisan lawan angka sumbu berlaku
        sumbu.latar = True
        l_jam = sinema.label("jam", warna=REDUP).next_to(sumbu, DOWN, buff=0.30)
        l_barang = sinema.label("barang", warna=REDUP)
        l_barang.next_to(sumbu, UP, buff=0.22).align_to(sumbu, LEFT)

        kurva = ParametricCurve(
            lambda t: sumbu.c2p(t, produksi(t)), t_range=(0, JAM_AKHIR, 0.02))
        kurva.set_stroke(TINTA, width=4.4)
        simpul = VGroup(*[Dot(sumbu.c2p(t, n), radius=0.055).set_color(TINTA)
                          for t, n in CATATAN])

        pusat_kamera, tinggi_kamera = kamera.muat_datar(VGroup(sumbu, l_jam, l_barang))

        # ================= catatan: kamera turun, tabel muncul =========== #
        tabel = VGroup()
        for k, (t, n) in enumerate(CATATAN):
            kolom = VGroup(rumus(str(t), 26, REDUP), rumus(str(n), 30, TINTA))
            kolom.arrange(DOWN, buff=0.18)
            tabel.add(kolom)
        tabel.arrange(RIGHT, buff=0.62)
        tabel.move_to([0, 0.6, 0]).fix_in_frame()
        judul_tabel = sinema.label("jam, barang", warna=REDUP)
        judul_tabel.next_to(tabel, UP, buff=0.35).fix_in_frame()

        with sinema.babak(self, "catatan", DURASI) as b:
            b.main(kamera.dunia_ke_peta(frame, pusat=pusat_kamera, tinggi=tinggi_kamera),
                   run_time=2.6)
            b.main(FadeOut(lantai), FadeOut(pekerja), FadeOut(barang), run_time=1.0)
            b.main(FadeIn(judul_tabel), run_time=1.0)
            b.main(LaggedStartMap(FadeIn, tabel, lag_ratio=0.35), run_time=2.6)
            b.main(Indicate(tabel, color=TINTA), run_time=1.4)
        qc.periksa_adegan(self, {}, hud={"tabel": tabel, "judul tabel": judul_tabel},
                          jaga_jalur_bawah=False)
        # Identitas babak angka baru dibuat SESUDAH pemeriksaan ini, sebab
        # sebelum tabelnya ada belum ada yang perlu diberi identitas.

        # ================= lelah: tambahannya mengecil =================== #
        selisih = VGroup()
        for k in range(len(CATATAN) - 1):
            d = CATATAN[k + 1][1] - CATATAN[k][1]
            m = rumus(f"+{d}", 26, AKSEN)
            m.move_to([(tabel[k].get_center()[0] + tabel[k + 1].get_center()[0]) / 2,
                       tabel.get_bottom()[1] - 0.55, 0])
            selisih.add(m)
        selisih.fix_in_frame()

        ident_angka = sinema.identitas(self, "catatan produksi")

        with sinema.babak(self, "lelah", DURASI) as b:
            b.main(LaggedStartMap(FadeIn, selisih, lag_ratio=0.30), run_time=3.0)
            b.main(Indicate(VGroup(*selisih[2:]), color=AKSEN), run_time=2.0)
            papan.baris(r"\text{tambahan mengecil}", warna=AKSEN, b=b)
            b.main(Indicate(selisih[-1], color=AKSEN), run_time=1.4)
        qc.periksa_adegan(self, {}, hud=hud_dengan_papan(ident_angka, papan),
                          jaga_jalur_bawah=False)

        # ================= tanya ========================================= #
        tanya = rumus(r"\text{jam ke-}1 \ \rightarrow\ \text{jam ke-}3\ ?", 40, SOROT)
        tanya.move_to([0, -1.6, 0]).fix_in_frame()
        sinema.batasi_lebar(tanya, 9.0)

        with sinema.babak(self, "tanya", DURASI) as b:
            b.main(FadeOut(selisih), run_time=0.8)
            b.main(Write(tanya), run_time=2.4)
            b.main(Indicate(tabel[1], color=AKSEN), Indicate(tabel[3], color=AKSEN),
                   run_time=2.2)
        qc.periksa_adegan(self, {}, hud=hud_dengan_papan(ident_angka, papan)
                          | {"tabel": tabel, "tanya": tanya},
                          jaga_jalur_bawah=False)

        # ================= hitung ======================================== #
        h1 = rumus(r"64 - 20 = 44 \ \text{barang}", 38, TINTA).move_to([0, -0.9, 0])
        h2 = rumus(r"3 - 1 = 2 \ \text{jam}", 38, TINTA).move_to([0, -2.0, 0])
        VGroup(h1, h2).fix_in_frame()

        with sinema.babak(self, "hitung", DURASI) as b:
            b.main(FadeOut(tanya), FadeOut(judul_tabel), run_time=0.8)
            b.main(Write(h1), run_time=2.8)
            b.main(Write(h2), run_time=2.4)
            b.main(Indicate(h1, color=TINTA), run_time=1.4)
            b.main(Indicate(h2, color=TINTA), run_time=1.4)
        qc.periksa_adegan(self, {}, hud=hud_dengan_papan(ident_angka, papan)
                          | {"tabel": tabel, "hitung 1": h1, "hitung 2": h2},
                          jaga_jalur_bawah=False)

        # ================= bagi ========================================== #
        hasil = rumus(r"44 : 2 = 22 \ \text{barang per jam}", 42, SOROT)
        hasil.move_to([0, -1.45, 0]).fix_in_frame()
        sinema.batasi_lebar(hasil, 10.0)

        with sinema.babak(self, "bagi", DURASI) as b:
            b.main(FadeOut(h1), FadeOut(h2), run_time=0.8)
            b.main(Write(hasil), run_time=2.8)
            b.main(Indicate(hasil, color=SOROT), run_time=1.8)
            papan.baris(r"22 \ \text{barang/jam}", warna=SOROT, b=b)
        qc.periksa_adegan(self, {}, hud=hud_dengan_papan(ident_angka, papan)
                          | {"tabel": tabel, "hasil": hasil},
                          jaga_jalur_bawah=False)

        # ================= gambar: kurvanya lahir dari titiknya ========== #
        ident = sinema.identitas(self, "sumbu tegak = barang", "sumbu datar = jam")
        ident.set_opacity(0.0)

        with sinema.babak(self, "gambar", DURASI) as b:
            b.main(FadeOut(tabel), FadeOut(hasil), FadeOut(ident_angka),
                   ident.animate.set_opacity(1.0), run_time=1.0)
            b.main(FadeIn(sumbu), FadeIn(l_jam), FadeIn(l_barang), run_time=1.8)
            b.main(LaggedStartMap(FadeIn, simpul, lag_ratio=0.25), run_time=2.2)
            b.main(ShowCreation(kurva), run_time=2.6)
        qc.periksa_adegan(self, {"kurva": kurva},
                          hud=hud_dengan_papan(ident, papan),
                          dunia={"sumbu": sumbu},
                          tulisan={"jam": l_jam, "barang": l_barang})

        # ================= hubung: garis potong ========================== #
        P = sumbu.c2p(1, produksi(1))
        Q = sumbu.c2p(3, produksi(3))
        t_p = Dot(P, radius=0.085).set_color(AKSEN)
        t_q = Dot(Q, radius=0.085).set_color(AKSEN)
        potong = Line(P, Q).set_stroke(AKSEN2, width=4.0)

        with sinema.babak(self, "hubung", DURASI) as b:
            b.main(FadeIn(t_p, scale=0.5), FadeIn(t_q, scale=0.5), run_time=1.2)
            b.main(ShowCreation(potong), run_time=2.4)
        qc.periksa_adegan(self, {"kurva": kurva},
                          hud=hud_dengan_papan(ident, papan),
                          dunia={"sumbu": sumbu, "potong": potong},
                          tulisan={"jam": l_jam, "barang": l_barang})

        # ================= segitiga: kedua sisinya diberi angka ========== #
        siku = np.array([Q[0], P[1], 0.0])
        sisi_datar = Line(P, siku).set_stroke(AKSEN2, width=3.0)
        sisi_tegak = Line(siku, Q).set_stroke(AKSEN2, width=3.0)
        l_datar = sinema.label("2 jam", warna=AKSEN2).next_to(sisi_datar, DOWN, buff=0.22)
        l_tegak = sinema.label("44 barang", warna=AKSEN2).next_to(sisi_tegak, RIGHT, buff=0.22)

        with sinema.babak(self, "segitiga", DURASI) as b:
            b.main(ShowCreation(sisi_datar), run_time=1.4)
            b.main(FadeIn(l_datar, shift=UP * 0.2), run_time=1.2)
            b.main(ShowCreation(sisi_tegak), run_time=1.4)
            b.main(FadeIn(l_tegak, shift=LEFT * 0.2), run_time=1.2)
            b.main(Indicate(sisi_datar, color=AKSEN2), Indicate(sisi_tegak, color=AKSEN2),
                   run_time=1.2)
        qc.periksa_adegan(self, {"kurva": kurva},
                          hud=hud_dengan_papan(ident, papan),
                          dunia={"sumbu": sumbu, "potong": potong},
                          tulisan={"jam": l_jam, "barang": l_barang,
                                   "sisi datar": l_datar, "sisi tegak": l_tegak})

        # ================= sama: angka yang sama, dua bahasa ============= #
        with sinema.babak(self, "sama", DURASI) as b:
            b.main(Indicate(l_tegak, color=AKSEN2), run_time=1.6)
            b.main(Indicate(l_datar, color=AKSEN2), run_time=1.6)
            papan.baris(r"44 : 2 = 22", warna=AKSEN2, b=b)
            b.main(Indicate(potong, color=AKSEN2), run_time=1.8)
            b.main(Indicate(papan.semua(), color=SOROT), run_time=1.6)
        qc.periksa_adegan(self, {"kurva": kurva},
                          hud=hud_dengan_papan(ident, papan),
                          dunia={"sumbu": sumbu, "potong": potong},
                          tulisan={"jam": l_jam, "barang": l_barang,
                                   "sisi datar": l_datar, "sisi tegak": l_tegak})

        # ================= nama: garis potong, garis sekan =============== #
        l_nama = sinema.label("garis potong", warna=AKSEN2)
        l_nama.move_to(sumbu.c2p(4.6, 34))

        with sinema.babak(self, "nama", DURASI) as b:
            b.main(FadeOut(sisi_datar), FadeOut(sisi_tegak),
                   FadeOut(l_datar), FadeOut(l_tegak), run_time=1.0)
            b.main(FadeIn(l_nama, shift=UP * 0.2), run_time=1.4)
            b.main(Indicate(potong, color=AKSEN2), run_time=1.8)
            papan.baris(r"\text{garis sekan}", warna=AKSEN2, b=b)
            b.main(Indicate(t_p, color=AKSEN), Indicate(t_q, color=AKSEN), run_time=1.6)
            b.main(Indicate(l_nama, color=AKSEN2), run_time=1.4)
        qc.periksa_adegan(self, {"kurva": kurva},
                          hud=hud_dengan_papan(ident, papan),
                          dunia={"sumbu": sumbu, "potong": potong},
                          tulisan={"jam": l_jam, "barang": l_barang, "nama": l_nama})

        # ================= beda: pasangan lain, jawaban lain ============= #
        A1, A2 = sumbu.c2p(1, produksi(1)), sumbu.c2p(2, produksi(2))
        B1, B2 = sumbu.c2p(3, produksi(3)), sumbu.c2p(5, produksi(5))
        potong_a = Line(A1, A2).set_stroke(SOROT, width=3.6)
        potong_b = Line(B1, B2).set_stroke(SOROT, width=3.6)
        n_a = rumus("24", 30, SOROT).next_to(potong_a.get_center(), UL, buff=0.18)
        n_b = rumus("11", 30, SOROT).next_to(potong_b.get_center(), UL, buff=0.18)

        with sinema.babak(self, "beda", DURASI) as b:
            b.main(FadeOut(potong), FadeOut(l_nama), run_time=1.0)
            b.main(ShowCreation(potong_a), run_time=1.8)
            b.main(FadeIn(n_a, shift=UP * 0.2), run_time=1.2)
            papan.baris(r"1 \to 2:\ 24", warna=SOROT, b=b)
            b.main(ShowCreation(potong_b), run_time=1.8)
            b.main(FadeIn(n_b, shift=UP * 0.2), run_time=1.2)
            papan.baris(r"3 \to 5:\ 11", warna=SOROT, b=b)
            b.main(Indicate(potong_a, color=SOROT), Indicate(potong_b, color=SOROT),
                   run_time=1.8)
        qc.periksa_adegan(self, {"kurva": kurva},
                          hud=hud_dengan_papan(ident, papan),
                          dunia={"sumbu": sumbu, "potong a": potong_a, "potong b": potong_b},
                          tulisan={"jam": l_jam, "barang": l_barang,
                                   "angka a": n_a, "angka b": n_b})

        # ================= tutup ========================================= #
        tutup = sinema.label("rata-rata", warna=SOROT)
        tutup.move_to(sumbu.c2p(4.4, 18))

        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(Indicate(kurva, color=TINTA), run_time=1.8)
            b.main(FadeIn(tutup, scale=0.9), run_time=1.4)
            b.main(Indicate(n_a, color=SOROT), run_time=1.4)
            b.main(Indicate(n_b, color=SOROT), run_time=1.4)
            b.main(Indicate(tutup, color=SOROT), run_time=1.6)
        qc.periksa_adegan(self, {"kurva": kurva},
                          hud=hud_dengan_papan(ident, papan),
                          dunia={"sumbu": sumbu, "potong a": potong_a, "potong b": potong_b},
                          tulisan={"jam": l_jam, "barang": l_barang,
                                   "angka a": n_a, "angka b": n_b, "tutup": tutup})
