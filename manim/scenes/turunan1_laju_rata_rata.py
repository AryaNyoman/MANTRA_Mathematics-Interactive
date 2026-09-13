"""Turunan 1: dari tambahan barang ke laju dan kemiringan.

Revisi ARYA: tabel siap sebelum angka dibaca; setiap kejadian memakai jam
kata TTS. Segitiga 3–4–5 membedakan panjang sisi miring dan kemiringan.
Sumbu pabrik berbeda satuan dan berskala sendiri, seperti widget Materi 01.
"""
import json
import re
import sys
from contextlib import contextmanager
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *
from gl import ilustrasi, kamera, qc, sinema

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "turunan1-laju-rata-rata"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = json.loads((AKAR / "audio" / TOPIK / "kata.json").read_text(encoding="utf-8"))

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


def normal(s):
    return re.sub(r"[^\w]+", "", s.lower())


class TurunanLajuRataRata(AdeganMatra):
    def construct(self):
        self.aktif, self.tulisan, self.jadwal, self.isyarat = {}, {}, [], []
        self.ident = None
        self.panel = sinema.PapanRumus(self, ukuran=36)
        kamera.pasang_awal(self.frame, theta=-32, phi=66, pusat=(0, 0, 0.9), tinggi=7.6)
        with self.bagian("buka", jaga=False) as b:
            lama = DURASI["buka"] - 0.4
            sinema.judul_pembuka(self, "Materi 01: seberapa cepat, rata-ratanya", lama=lama)
            b.catat(lama)

        lantai = ilustrasi.lantai_kisi(ukuran=8, tinggi_z=0)
        pekerja = ilustrasi.orang(1.6).move_to([-3, 0.2, 0.8])
        mobil = ilustrasi.mobil(2).move_to([-0.2, 0, 0.35])
        with self.bagian("pabrik", jaga=False) as b:
            self.muncul(b, lantai=lantai, pekerja=pekerja, lama=0.6)
            self.tunggu(b, "barang")
            self.muncul(b, mobil=mobil, lama=1.0)
            b.main(mobil.animate.shift(RIGHT * 1.2), run_time=1.6)

        kolom = []
        for i, (jam, barang) in enumerate(CATATAN):
            x = -3.0 + i * 1.05
            atas = rumus(str(jam), 38).move_to([x, 1.3, 0])
            bawah = rumus(str(barang), 42).move_to([x, 0.35, 0])
            kolom.append(VGroup(atas, bawah))
        tabel_jam = VGroup(*[c[0] for c in kolom])
        label_jam = sinema.label("jam", ukuran=30).move_to([-5.0, 1.3, 0])
        label_total = sinema.label("total barang", ukuran=30).move_to([-5.0, 0.35, 0])
        with self.bagian("siap") as b:
            b.main(kamera.dunia_ke_peta(self.frame, pusat=(0, 0, 0), tinggi=8), run_time=0.8)
            self.hilang(b, *list(self.aktif), lama=0.35)
            self.ident = sinema.identitas(self, "Materi 01")
            self.muncul(b, True, label_jam=label_jam, tabel_jam=tabel_jam,
                        label_total=label_total, lama=.5)
            self.tunggu(b, "baris atas")
            b.main(Indicate(label_jam, color=AKSEN2, scale_factor=1.15), run_time=.5)
            self.tunggu(b, "baris bawah")
            b.main(Indicate(label_total, color=AKSEN2, scale_factor=1.15), run_time=.5)

        with self.bagian("catatan_a") as b:
            for i, frase in enumerate(("totalnya nol", "dua puluh barang", "empat puluh empat", "enam puluh empat")):
                self.tunggu(b, frase)
                self.muncul(b, True, **{f"total_{i}": kolom[i][1]}, lama=0.3)
                b.main(Indicate(kolom[i][0], color=AKSEN2, scale_factor=1.25), run_time=0.4)
        with self.bagian("catatan_b") as b:
            for i, frase in zip((4, 5, 6), ("tujuh puluh delapan", "delapan puluh enam", "sembilan puluh")):
                self.tunggu(b, frase)
                self.muncul(b, True, **{f"total_{i}": kolom[i][1]}, lama=0.3)
                b.main(Indicate(kolom[i][0], color=AKSEN2, scale_factor=1.25), run_time=0.4)

        blok = VGroup(*kolom[:4])
        kotak = SurroundingRectangle(blok, buff=0.18, color=AKSEN2)
        total_arti = teks("total sejak mulai", 32, AKSEN2).move_to([-1.0, -0.65, 0])
        with self.bagian("total") as b:
            b.main(Indicate(kolom[3][1], color=AKSEN, scale_factor=1.25), run_time=0.8)
            self.tunggu(b, "semua barang")
            self.muncul(b, rentang_total=kotak)
            self.muncul(b, True, arti_total=total_arti)
        pilih = VGroup(*[SurroundingRectangle(kolom[i], color=AKSEN, buff=0.18) for i in (1, 3)])
        soal = teks("Rata-rata berapa barang tiap jam?", 34).move_to([0, -1.3, 0])
        with self.bagian("tanya") as b:
            self.hilang(b, "rentang_total", "arti_total")
            self.muncul(b, pilihan=pilih)
            self.tunggu(b, "rata rata")
            self.muncul(b, True, pertanyaan=soal)

        with self.bagian("tambahan") as b:
            self.tunggu(b, "awalnya dua puluh")
            b.main(FadeOut(self.tulisan.pop("pertanyaan")),
                   Indicate(kolom[1][1], color=AKSEN, scale_factor=1.25), run_time=0.6)
            self.tunggu(b, "di akhir")
            b.main(Indicate(kolom[3][1], color=AKSEN, scale_factor=1.25), run_time=0.6)
            self.tunggu(b, "kurangi")
            hitung = rumus(r"64-20", 42, AKSEN2).move_to([0, -1.1, 0])
            self.muncul(b, True, tambahan=hitung)
            self.tunggu(b, "hasilnya empat puluh empat")
            self.ubah_tulisan(b, "tambahan", r"64-20=44\ \mathrm{barang}", 42, AKSEN2)
        lama = rumus(r"3-1", 40, AKSEN2).move_to([0, -1.85, 0])
        with self.bagian("waktu") as b:
            self.tunggu(b, "dari jam satu")
            b.main(Indicate(VGroup(kolom[1][0], kolom[3][0]), color=AKSEN2, scale_factor=1.12), run_time=0.8)
            self.tunggu(b, "tiga dikurangi satu")
            self.muncul(b, True, durasi=lama)
            self.tunggu(b, "sama dengan dua")
            self.ubah_tulisan(b, "durasi", r"3-1=2\ \mathrm{jam}", 40, AKSEN2)
        with self.bagian("bagi") as b:
            self.hilang(b, "tambahan", "durasi", "pilihan")
            # Tabel bergeser sebagai satu konteks, membuka tempat pembagian.
            self.tunggu(b, "untuk mencari")
            self.hilang(b, *list(self.tulisan), lama=0.5)
            dua_kotak = VGroup(*[Rectangle(width=2.4, height=1.55, color=AKSEN2).move_to([x, 0.3, 0])
                                for x in (-4.0, -1.25)])
            self.muncul(b, kotak_jam=dua_kotak)
            self.tunggu(b, "kita bagi")
            self.lahir(b, r"\frac{44\ \text{barang}}{2\ \text{jam}}", dua_kotak.get_center())
            self.tunggu(b, "hasilnya dua puluh dua")
            self.ubah(b, r"\frac{44}{2}=22\ \text{barang/jam}")
        with self.bagian("arti") as b:
            self.muncul(b, True,
                        nama_kotak1=teks("jam pertama", 26).move_to([-4, 1.35, 0]),
                        nama_kotak2=teks("jam kedua", 26).move_to([-1.25, 1.35, 0]))
            self.tunggu(b, "masing masing")
            self.muncul(b, True,
                        isi_kotak1=rumus("22", 50, SOROT).move_to([-4, .3, 0]),
                        isi_kotak2=rumus("22", 50, SOROT).move_to([-1.25, .3, 0]))
            self.tunggu(b, "inilah")
            self.panel.baris(r"\text{dibagi rata}", b=b, warna=SOROT)

        sumbu = Axes(x_range=(0, 6.4, 1), y_range=(0, 100, 20), width=7.1, height=4.25,
                     axis_config=dict(stroke_color=REDUP, stroke_width=2.2))
        sumbu.shift(np.array([-5.8, -1.65, 0]) - sumbu.c2p(0, 0))
        angka = sumbu.add_coordinate_labels(font_size=23, num_decimal_places=0)
        angka.set_color(TINTA)
        sumbu.angka = angka
        sumbu.latar = True
        cp = sumbu.c2p
        lj = sinema.label("jam", ukuran=28, warna=REDUP).move_to([-2.3, -2.3, 0])
        lb = sinema.label("barang", ukuran=28, warna=REDUP).next_to(sumbu.y_axis, UP, buff=.16)
        kurva = ParametricCurve(lambda t: cp(t, produksi(t)), t_range=(0, 6, .02)).set_stroke(TINTA, 4)
        simpul = VGroup(*[Dot(cp(t, n), radius=.05).set_color(TINTA) for t, n in CATATAN])
        p = Dot(cp(1, 20), radius=.085).set_color(AKSEN)
        q = Dot(cp(3, 64), radius=.085).set_color(AKSEN)
        lp = sinema.label("(1, 20)", ukuran=27, warna=AKSEN).next_to(p, UL, buff=.15)
        lq = sinema.label("(3, 64)", ukuran=27, warna=AKSEN).next_to(q, UL, buff=.15)
        with self.bagian("sumbu") as b:
            self.tunggu(b, "menjadi gambar")
            self.kosongkan(b)
            self.tunggu(b, "sumbu x")
            self.muncul(b, sumbu_x=sumbu.x_axis)
            self.muncul(b, True, jam=lj)
            self.tunggu(b, "sumbu y")
            self.hilang(b, "sumbu_x", lama=.1)
            self.muncul(b, sumbu=sumbu)
            self.muncul(b, True, barang=lb)
        with self.bagian("titik") as b:
            self.tunggu(b, "jam satu")
            self.muncul(b, P=p)
            self.muncul(b, True, P_label=lp, lama=.3)
            self.tunggu(b, "jam tiga")
            self.muncul(b, Q=q)
            self.muncul(b, True, Q_label=lq, lama=.3)
        with self.bagian("kurva") as b:
            self.muncul(b, simpul=simpul)
            self.tunggu(b, "lalu hubungkan")
            b.main(ShowCreation(kurva), run_time=2)
            self.aktif["kurva"] = kurva
        potong = Line(p.get_center(), q.get_center()).set_stroke(AKSEN2, 4)
        datar = Line(cp(1, 20), cp(3, 20)).set_stroke(AKSEN2, 3)
        tegak = Line(cp(3, 20), cp(3, 64)).set_stroke(AKSEN2, 3)
        ld = sinema.label("2 jam", ukuran=30, warna=AKSEN2).next_to(datar, DOWN, buff=.18)
        lt = sinema.label("44 barang", ukuran=30, warna=AKSEN2).next_to(tegak, RIGHT, buff=.18)
        siku = VMobject().set_points_as_corners([cp(2.82, 20), cp(2.82, 24), cp(3, 24)])
        siku.set_stroke(AKSEN2, 2)
        with self.bagian("hubung") as b:
            self.tunggu(b, "garis lurus")
            b.main(ShowCreation(potong), run_time=1)
            self.aktif["garis"] = potong
        with self.bagian("datar") as b:
            self.tunggu(b, "ke kanan")
            b.main(ShowCreation(datar), run_time=1)
            self.aktif["datar"] = datar
            self.tunggu(b, "dua jam")
            self.muncul(b, True, datar_label=ld, lama=.3)
        with self.bagian("naik") as b:
            self.tunggu(b, "kita naik")
            b.main(ShowCreation(tegak), run_time=1)
            self.aktif["tegak"] = tegak
            self.tunggu(b, "empat puluh empat")
            self.muncul(b, True, tegak_label=lt, lama=.3)
            self.muncul(b, siku=siku, lama=.3)
        with self.bagian("kemiringan") as b:
            self.lahir(b, r"\text{kemiringan}=\frac{\text{kenaikan}}{\text{langkah mendatar}}",
                       cp(2, 40), ukuran=43)
            self.tunggu(b, "empat puluh empat barang")
            b.main(Indicate(tegak, color=AKSEN2, scale_factor=1.07), run_time=.6)
            self.tunggu(b, "dibagi dua jam")
            b.main(Indicate(datar, color=AKSEN2, scale_factor=1.07), run_time=.6)
            self.tunggu(b, "hasilnya")
            self.panel.baris(r"\frac{44}{2}=22\ \text{barang/jam}", b=b, warna=SOROT)
        with self.bagian("singkat") as b:
            self.tunggu(b, "miring sama")
            self.ubah(b, r"\text{miring}=\frac{\text{naik}}{\text{datar}}")
            self.tunggu(b, "berarti kemiringan")
            self.panel.baris(r"\text{miring = kemiringan}", b=b)

        with self.bagian("pitagoras") as b:
            self.tunggu(b, "pythagoras")
            b.main(Indicate(VGroup(datar, tegak, potong), color=SOROT, scale_factor=1.08), run_time=1)
            self.tunggu(b, "apa yang ingin dicari")
            self.bersihkan_papan(b)
            self.panel.baris(r"\text{panjang atau kemiringan?}", b=b, warna=SOROT)

        A, B, C = np.array([-5, -1.5, 0]), np.array([-1, -1.5, 0]), np.array([-1, 1.5, 0])
        dd = Line(A, B).set_stroke(AKSEN2, 3.5)
        tt = Line(B, C).set_stroke(AKSEN2, 3.5)
        mm = Line(A, C).set_stroke(SOROT, 4)
        rs = VMobject().set_points_as_corners([B+LEFT*.23, B+LEFT*.23+UP*.23, B+UP*.23])
        rs.set_stroke(REDUP, 2)
        l4 = sinema.label("4 cm", ukuran=34, warna=AKSEN2).next_to(dd, DOWN, buff=.2)
        l3 = sinema.label("3 cm", ukuran=34, warna=AKSEN2).next_to(tt, RIGHT, buff=.2)
        l5 = sinema.label("5 cm", ukuran=34, warna=SOROT).move_to([-3.45, .45, 0])
        with self.bagian("contoh345") as b:
            self.kosongkan(b)
            self.muncul(b, panjang_miring=mm)
            self.tunggu(b, "sisi datarnya")
            self.muncul(b, panjang_datar=dd)
            self.muncul(b, True, empat=l4)
            self.tunggu(b, "sisi tegaknya")
            self.muncul(b, panjang_tegak=tt)
            self.muncul(b, True, tiga=l3)
            self.tunggu(b, "sudut siku siku")
            self.muncul(b, tanda_siku=rs)
        with self.bagian("panjang") as b:
            self.tunggu(b, "pakai pythagoras")
            self.lahir(b, r"\text{panjang}^2=3^2+4^2", (A+C)/2)
            self.tunggu(b, "dua puluh lima")
            self.ubah(b, r"\text{panjang}^2=9+16=25")
            self.tunggu(b, "akarnya lima")
            self.ubah(b, r"\text{panjang}=\sqrt{25}=5\ \mathrm{cm}", warna=SOROT)
            self.muncul(b, True, lima=l5, lama=.3)
        unit = VGroup(Line(A, A+RIGHT), Line(A+RIGHT, A+RIGHT+UP*.75)).set_stroke(AKSEN, 3)
        satu = sinema.label("1 cm", ukuran=25, warna=AKSEN).next_to(unit[0], DOWN, buff=.24)
        pecah = sinema.label("0,75 cm", ukuran=25, warna=AKSEN).next_to(unit[1], RIGHT, buff=.18)
        with self.bagian("rasio") as b:
            self.tunggu(b, "tiga dibagi empat")
            rasio = self.panel.baris(r"\text{miring}=\frac{3}{4}", b=b, warna=AKSEN2, run_time=.5)
            self.tunggu(b, "hasilnya")
            sinema.ganti_rumus(self, rasio, r"\text{miring}=\frac{3}{4}=0{,}75",
                               b=b, papan=self.panel, run_time=.5, warna=AKSEN2)
            self.tunggu(b, "setiap satu sentimeter")
            self.muncul(b, satu_datar=unit[0], lama=.3)
            self.muncul(b, True, satu=satu, lama=.3)
            self.tunggu(b, "garis naik")
            self.muncul(b, satu_naik=unit[1], lama=.3)
            self.muncul(b, True, pecah=pecah, lama=.3)
        with self.bagian("bedakan") as b:
            self.hilang(b, "satu_datar", "satu_naik", "satu", "pecah")
            self.tunggu(b, "panjang sisi miring")
            b.main(Indicate(mm, color=SOROT, scale_factor=1.06), run_time=1)
            self.tunggu(b, "kemiringannya")
            b.main(Indicate(VGroup(dd, tt), color=AKSEN2, scale_factor=1.05), run_time=1)
            self.panel.baris(r"\text{panjang}\ \ne\ \text{kemiringan}", b=b)

        with self.bagian("satuan") as b:
            self.kosongkan(b)
            self.muncul(b, sumbu=sumbu, kurva=kurva, simpul=simpul, P=p, Q=q, garis=potong,
                        datar=datar, tegak=tegak, siku=siku)
            self.muncul(b, True, jam=lj, barang=lb, datar_label=ld, tegak_label=lt, P_label=lp, Q_label=lq)
            self.tunggu(b, "sisi tegak")
            b.main(Indicate(lt, color=AKSEN2, scale_factor=1.15), run_time=.6)
            self.tunggu(b, "sisi datar")
            b.main(Indicate(ld, color=AKSEN2, scale_factor=1.15), run_time=.6)
            self.tunggu(b, "satuannya berbeda")
            self.panel.baris(r"\text{barang dan jam}", b=b)
            self.panel.baris(r"\text{satuannya berbeda}", b=b, warna=SOROT)
        with self.bagian("kembali") as b:
            self.bersihkan_papan(b)
            self.tunggu(b, "tambahan barang")
            self.lahir(b, r"\text{miring}=\frac{\text{naik}}{\text{datar}}", cp(2, 42))
            self.tunggu(b, "empat puluh empat dibagi dua")
            self.panel.baris(r"\frac{44\ \text{barang}}{2\ \text{jam}}", b=b)
            self.tunggu(b, "dua puluh dua barang")
            self.panel.baris(r"=22\ \text{barang/jam}", b=b, warna=SOROT)
        with self.bagian("sekan") as b:
            self.tunggu(b, "garis potong")
            self.ubah(b, r"\text{garis potong = sekan}")
            b.main(Indicate(potong, color=AKSEN2, scale_factor=1.07), run_time=.8)
            self.tunggu(b, "laju perubahan rata rata")
            self.panel.baris(r"\text{laju rata-rata}", b=b, warna=SOROT)

        with self.bagian("beda_awal") as b:
            self.hilang(b, "P_label", "Q_label", "datar", "tegak", "datar_label", "tegak_label", "siku")
            self.bersihkan_papan(b)
            self.tunggu(b, "jam satu sampai jam dua")
            b.main(q.animate.move_to(cp(2, 44)), Transform(potong, Line(cp(1, 20), cp(2, 44)).set_stroke(AKSEN2, 4)), run_time=1)
            self.lahir(b, r"\frac{44-20}{2-1}", cp(1.5, 32))
            self.tunggu(b, "dua puluh empat barang per jam")
            self.ubah(b, r"\frac{44-20}{2-1}=24\ \text{barang/jam}", warna=SOROT)
        with self.bagian("beda_akhir") as b:
            self.tunggu(b, "jam tiga sampai jam lima")
            b.main(p.animate.move_to(cp(3, 64)), q.animate.move_to(cp(5, 86)),
                   Transform(potong, Line(cp(3, 64), cp(5, 86)).set_stroke(AKSEN2, 4)), run_time=1)
            self.ubah(b, r"\frac{86-64}{5-3}")
            self.tunggu(b, "sebelas barang per jam")
            self.ubah(b, r"\frac{86-64}{5-3}=11\ \text{barang/jam}", warna=SOROT)
        with self.bagian("bukan_tiap") as b:
            self.tunggu(b, "rata ratanya")
            b.main(p.animate.move_to(cp(1, 20)), q.animate.move_to(cp(3, 64)),
                   Transform(potong, Line(cp(1, 20), cp(3, 64)).set_stroke(AKSEN2, 4)), run_time=.8)
            self.ubah(b, r"\text{rata-rata}=22\ \text{barang/jam}", warna=SOROT)
            self.tunggu(b, "bisa berbeda")
            self.panel.baris(r"\text{jam 1 ke 2: }24", b=b)
            self.panel.baris(r"\text{jam 2 ke 3: }20", b=b)
        with self.bagian("tutup") as b:
            self.bersihkan_papan(b)
            self.lahir(b, r"\text{laju rata-rata}=\frac{\text{selisih hasil}}{\text{selisih waktu}}", cp(2, 42), ukuran=42)
            self.tunggu(b, "kemiringan garis")
            self.panel.baris(r"\text{miring}=\frac{\text{naik}}{\text{datar}}", b=b, warna=AKSEN2)
            b.main(Indicate(potong, color=AKSEN2, scale_factor=1.06), run_time=.7)
            self.tunggu(b, "pilihan titiknya")
            b.main(Indicate(VGroup(p, q), color=AKSEN, scale_factor=1.4), run_time=1)
        tujuan = AKAR / "qc" / TOPIK / "jadwal-render.json"
        tujuan.parent.mkdir(parents=True, exist_ok=True)
        tujuan.write_text(json.dumps(self.jadwal, indent=2), encoding="utf-8")
        tujuan.with_name("isyarat-render.json").write_text(json.dumps(self.isyarat, indent=2), encoding="utf-8")

    @contextmanager
    def bagian(self, ident, jaga=True):
        self.segmen = ident
        mulai = self.time
        with sinema.babak(self, ident, DURASI) as b:
            yield b
            b.terpakai = self.time - KATA[ident]["mulai"] + 1e-7
        hud = {}
        if self.ident is not None:
            hud["identitas"] = self.ident
        if self.panel.semua() is not None:
            hud["rumus"] = self.panel.semua()
        qc.periksa_adegan(self, {}, hud=hud, dunia=self.aktif, tulisan=self.tulisan,
                          jaga_jalur_bawah=jaga)
        self.jadwal.append({"id": ident, "mulai_audio": KATA[ident]["mulai"],
                           "mulai_video": mulai, "akhir_video": self.time})

    def tunggu(self, b, frasa):
        # TTS memecah kata ulang "rata-rata"; pencarian juga mengizinkan bentuk itu.
        normalisasi = lambda s: re.findall(r"\w+", s.lower())
        wanted = normalisasi(frasa)
        tokens = []
        for w in KATA[self.segmen]["kata"]:
            tokens.extend((k, w["mulai"]) for k in normalisasi(w["kata"]))
        for i in range(len(tokens)-len(wanted)+1):
            if [k for k, _ in tokens[i:i+len(wanted)]] == wanted:
                target = KATA[self.segmen]["mulai"] + tokens[i][1]
                b.tunggu_sampai(round(target*30)/30)
                self.isyarat.append({"segmen": self.segmen, "kata": frasa,
                                     "audio": target, "video": self.time})
                return
        raise ValueError(f"Kata kunci tidak ditemukan: {self.segmen}: {frasa}")

    def muncul(self, b, tulisan=False, lama=.5, **objek):
        b.main(*[FadeIn(m) for m in objek.values()], run_time=lama)
        (self.tulisan if tulisan else self.aktif).update(objek)

    def ubah_tulisan(self, b, nama, isi, ukuran, warna):
        lama = self.tulisan[nama]
        baru = rumus(isi, ukuran, warna).move_to(lama)
        b.main(TransformMatchingStrings(lama, baru), run_time=.5)
        self.remove(lama)
        self.add(baru)
        self.tulisan[nama] = baru

    def hilang(self, b, *nama, lama=.35):
        objek = []
        for n in nama:
            obj = self.aktif.pop(n, None)
            if obj is None:
                obj = self.tulisan.pop(n, None)
            if obj is not None:
                objek.append(obj)
        if objek:
            b.main(*[FadeOut(o) for o in objek], run_time=lama)

    def bersihkan_papan(self, b):
        semua = self.panel.semua()
        if semua is not None:
            b.main(FadeOut(semua), run_time=.3)
            for m in list(self.panel.baris_lain) + ([self.panel.utama] if self.panel.utama is not None else []):
                self.hud.remove(m)
                self.remove(m)
        self.panel = sinema.PapanRumus(self, ukuran=36)

    def kosongkan(self, b):
        self.bersihkan_papan(b)
        self.hilang(b, *list(self.aktif), *list(self.tulisan), lama=.4)

    def lahir(self, b, isi, dekat, ukuran=46):
        return sinema.lahir_rumus(self, isi, dekat=dekat, papan=self.panel, b=b,
                                  ukuran_lahir=ukuran, tahan=.15, run_time=.6, geser=UP*.7)

    def ubah(self, b, isi, warna=None):
        return sinema.ganti_rumus(self, self.panel.utama, isi, b=b, run_time=.65,
                                  papan=self.panel, warna=warna, ukuran=36)
