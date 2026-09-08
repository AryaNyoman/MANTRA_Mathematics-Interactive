"""Turunan 3: tinggi -> kemiringan -> fungsi baru.

Rumus 2x dibuktikan dari definisi sebelum jejak biru disapu.
Satu bidang 2D berskala sama menjaga keterbacaan pada bingkai 16:9.
Hitam = fungsi awal, merah = titik yang diukur, ungu = garis singgung,
biru = hasil kemiringan. Waktu kejadian diikat ke kata rekaman.
"""
import json
import re
import sys
from contextlib import contextmanager
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *
from gl import kamera, qc, sinema

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "turunan3-fungsi-turunan"
DURASI = json.loads((AKAR/"audio"/TOPIK/"durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = json.loads((AKAR/"audio"/TOPIK/"kata.json").read_text(encoding="utf-8"))


class TurunanFungsiBaru(AdeganMatra):
    def construct(self):
        self.aktif, self.tulisan, self.jadwal, self.isyarat = {}, {}, [], []
        self.ident = None
        self.panel = sinema.PapanRumus(self, ukuran=36)
        kamera.pasang_awal(self.frame, theta=0, phi=0, tinggi=8)
        with self.bagian("buka") as b:
            lama = DURASI["buka"] - .4
            sinema.judul_pembuka(self, "Materi 03: kemiringan menjadi fungsi", lama=lama)
            b.catat(lama)
        self.ident = sinema.identitas(self, "Materi 03")
        # Panjang satu unit x dan y sama-sama 0,65 satuan layar.
        sumbu = Axes(x_range=(-4, 4, 1), y_range=(-3, 4.6, 1), width=5.2, height=4.94,
                     axis_config=dict(stroke_color=REDUP, stroke_width=2))
        sumbu.shift(np.array([-3.3, -.05, 0]) - sumbu.c2p(0, 0))
        angka = sumbu.add_coordinate_labels(font_size=24, num_decimal_places=0)
        angka.set_color(TINTA)
        # Jejak negatif melewati sisi kiri y=-1; letakkan angkanya di kanan
        # agar tanda minus tetap terbaca, terutama pada cabang f' dari |x|.
        for bilangan in sumbu.y_axis.numbers:
            if bilangan.get_value() == -1:
                bilangan.shift(RIGHT * .75)
        sumbu.angka, sumbu.latar = angka, True
        self.cp = cp = sumbu.c2p
        lx = rumus("x", 30, REDUP).move_to([-.4, -.05, 0])
        ly = rumus("y", 30, REDUP).move_to([-3.3, 3.2, 0])
        kurva = ParametricCurve(lambda x: cp(x, x*x), t_range=(-2.1, 2.1, .02)).set_stroke(TINTA, 4.5)
        p = Dot(cp(1, 1), radius=.085).set_color(AKSEN)
        tan = self.singgung(1)
        self.p, self.tan, self.x = p, tan, 1.0

        with self.bagian("ingat") as b:
            self.muncul(b, sumbu=sumbu, kurva=kurva, P=p, singgung=tan, lama=.55)
            self.muncul(b, True, x=lx, y=ly, lama=.3)
            self.tunggu(b, "dua")
            self.lahir(b, r"f'(1)=2", cp(1, 1))
            self.tunggu(b, "kemiringan adalah")
            lengkap = self.panel.baris(r"\text{kemiringan}=\frac{\text{kenaikan}}{\text{langkah mendatar}}",
                                       b=b, warna=SOROT, run_time=.6)
        with self.bagian("ringkas") as b:
            self.tunggu(b, "miring")
            sinema.ganti_rumus(self, lengkap, r"\text{miring}=\frac{\text{naik}}{\text{datar}}",
                               b=b, papan=self.panel, run_time=.65, warna=SOROT)
            self.tunggu(b, "bukan panjang")
            self.panel.baris(r"\text{kemiringan}\ne\text{panjang sisi}", b=b, run_time=.55)
        with self.bagian("tinggi") as b:
            self.bersihkan_papan(b)
            self.tunggu(b, "tinggi kurvanya satu")
            self.lahir(b, r"f(1)=1\quad\text{(tinggi)}", cp(1, 1))
            b.main(Indicate(p, color=AKSEN, scale_factor=1.7), run_time=.5)
            self.tunggu(b, "kemiringan garis")
            self.panel.baris(r"f'(1)=2\quad\text{(miring)}", b=b, warna=SOROT, run_time=.55)
            b.main(Indicate(tan, color=SOROT, scale_factor=1.15), run_time=.65)
        with self.bagian("tanya") as b:
            self.bersihkan_papan(b)
            self.panel.baris(r"f(x)=x^2", b=b, run_time=.5)
            self.tunggu(b, "sebelah kiri")
            self.pindah(b, -1, lama=1.4)
            self.tunggu(b, "dasar lengkungan")
            self.pindah(b, 0, lama=1.4)

        kolom = []
        for i, x in enumerate((-1, 0, 1, 2)):
            xx = -4.65 + i * 1.2
            kolom.append(VGroup(rumus(str(x), 40).move_to([xx, 1, 0]),
                                rumus(str(2*x), 40, AKSEN2).move_to([xx, -.2, 0])))
        with self.bagian("contoh") as b:
            self.kosongkan(b)
            self.muncul(b, True, kepala_x=rumus("x", 34).move_to([-6, 1, 0]),
                        kepala_m=teks("miring", 29, AKSEN2).move_to([-6, -.2, 0]))
            self.muncul(b, batas=Line([-6.6, .4, 0], [-.45, .4, 0]).set_stroke(REDUP, 2))
            for i, frase in enumerate(("eks negatif satu", "eks nol", "eks satu", "eks dua")):
                self.tunggu(b, frase)
                self.muncul(b, True, **{f"masuk_{i}": kolom[i][0]}, lama=.3)
                if i == 0:
                    self.tunggu(b, "kemiringannya negatif dua")
                elif i == 1:
                    self.tunggu(b, "nol", urutan=2)
                elif i == 2:
                    self.tunggu(b, "dua", urutan=2)
                else:
                    self.tunggu(b, "empat")
                self.muncul(b, True, **{f"keluar_{i}": kolom[i][1]}, lama=.3)
        with self.bagian("pola") as b:
            self.tunggu(b, "dua kali eks")
            self.lahir(b, r"\text{miring}\ \stackrel{?}{=}\ 2x", [-2.7, -.2, 0])
            self.tunggu(b, "belum membuktikan")
            self.panel.baris(r"\text{contoh}\ne\text{bukti umum}", b=b, run_time=.5)
        with self.bagian("umum") as b:
            self.kosongkan(b)
            self.x = 1
            p.move_to(cp(1, 1))
            tan.become(self.singgung(1))
            self.muncul(b, sumbu=sumbu, kurva=kurva, P=p)
            self.muncul(b, True, x=lx, y=ly, lama=.3)
            self.tunggu(b, "tingginya eks kuadrat")
            self.lahir(b, r"f(x)=x^2", cp(1, 1))
            self.tunggu(b, "menggantikan angka satu")
            self.panel.baris(r"1\longrightarrow x", b=b, run_time=.5)

        h = .65
        q = Dot(cp(1+h, (1+h)**2), radius=.075).set_color(AKSEN2)
        garis = self.potong(h)
        datar = Line(cp(1, 1), cp(1+h, 1)).set_stroke(AKSEN2, 4)
        naik = Line(cp(1+h, 1), cp(1+h, (1+h)**2)).set_stroke(AKSEN2, 4)
        lh = rumus("h", 28, AKSEN2).next_to(datar, DOWN, buff=.13)
        with self.bagian("tetangga") as b:
            self.tunggu(b, "sejauh ha")
            self.muncul(b, datar=datar, lama=.45)
            self.muncul(b, True, langkah=lh, lama=.3)
            self.tunggu(b, "eks tambah ha")
            self.muncul(b, Q=q, naik=naik, potong=garis, lama=.5)
            self.tunggu(b, "tingginya adalah")
            self.panel.baris(r"f(x+h)=(x+h)^2", b=b, warna=AKSEN2, run_time=.6)
        with self.bagian("selisih") as b:
            self.bersihkan_papan(b)
            self.tunggu(b, "selisih tinggi")
            b.main(Indicate(naik, color=SOROT, scale_factor=1.1), run_time=.6)
            self.tunggu(b, "langkah mendatar")
            b.main(Indicate(datar, color=AKSEN2, scale_factor=1.1), run_time=.6)
            self.tunggu(b, "tinggi yang baru")
            self.lahir(b, r"\frac{(x+h)^2-x^2}{h}", cp(1.3, 1.4))
            self.tunggu(b, "dibagi ha")
            self.panel.baris(r"h\ne0", b=b, warna=AKSEN2, run_time=.5)

        produk = rumus(r"(x+h)(x+h)", 48).move_to([-3, 1.5, 0])
        term = VGroup(*[rumus(s, 44, AKSEN2 if i in (1, 2) else TINTA)
                        for i, s in enumerate((r"x^2", r"+xh", r"+hx", r"+h^2"))])
        term.arrange(RIGHT, buff=.16).move_to([-3, -.1, 0])
        with self.bagian("kali") as b:
            self.hilang(b, *list(self.aktif), *list(self.tulisan))
            self.tunggu(b, "dikali dirinya sendiri")
            self.muncul(b, True, perkalian=produk)
            self.tunggu(b, "eks kuadrat")
            self.muncul(b, True, suku0=term[0], lama=.3)
            self.tunggu(b, "eks ha")
            self.muncul(b, True, suku1=term[1], lama=.3)
            self.tunggu(b, "ha eks")
            self.muncul(b, True, suku2=term[2], lama=.3)
            self.tunggu(b, "dan ha kuadrat")
            self.muncul(b, True, suku3=term[3], lama=.3)
            self.tunggu(b, "dua suku tengah")
            b.main(Indicate(VGroup(term[1], term[2]), color=AKSEN2, scale_factor=1.12), run_time=.7)
            self.tunggu(b, "menjadi dua eks ha")
            self.hilang(b, "suku0", "suku1", "suku2", "suku3", lama=.25)
            self.muncul(b, True, uraian=rumus(r"x^2+2xh+h^2", 48).move_to([-3, -.1, 0]), lama=.35)
        with self.bagian("kurangi") as b:
            self.hilang(b, "perkalian")
            self.tunggu(b, "setelah dikurangi")
            self.ubah_tulisan(b, "uraian", r"(x^2+2xh+h^2)-x^2", 43, TINTA)
            self.tunggu(b, "suku eks kuadrat habis")
            self.ubah_tulisan(b, "uraian", r"2xh+h^2", 50, AKSEN2)
            self.tunggu(b, "yang tersisa")
            self.ubah(b, r"\frac{2xh+h^2}{h}")
        with self.bagian("bagi") as b:
            self.tunggu(b, "ha belum nol")
            b.main(Indicate(self.panel.baris_lain[0], color=AKSEN2, scale_factor=1.15), run_time=.6)
            self.tunggu(b, "kedua suku")
            self.ubah_tulisan(b, "uraian", r"\frac{2xh}{h}+\frac{h^2}{h}", 50, TINTA)
            self.tunggu(b, "menjadi dua eks")
            self.ubah_tulisan(b, "uraian", r"2x+\frac{h^2}{h}", 50, TINTA)
            self.tunggu(b, "menjadi ha")
            self.ubah_tulisan(b, "uraian", r"2x+h", 50, AKSEN2)
            self.tunggu(b, "hasilnya dua eks")
            self.ubah(b, r"\frac{(x+h)^2-x^2}{h}=2x+h")
        with self.bagian("limit") as b:
            self.hilang(b, "uraian")
            self.muncul(b, sumbu=sumbu, kurva=kurva, P=p, Q=q, potong=garis, lama=.4)
            self.muncul(b, True, x=lx, y=ly, lama=.25)
            self.tunggu(b, "dekatkan ke nol")
            self.gerak_h(b, q, garis, .65, .05, 1.2)
            self.tunggu(b, "dari kanan maupun kiri")
            self.gerak_h(b, q, garis, -.65, -.05, 1.6)
            self.tunggu(b, "garis singgung")
            self.hilang(b, "Q", "potong", lama=.25)
            self.muncul(b, singgung=tan, lama=.4)
            self.tunggu(b, "mendekati dua eks")
            self.ubah(b, r"\lim_{h\to0}(2x+h)=2x")
        with self.bagian("hasil") as b:
            self.bersihkan_papan(b)
            self.tunggu(b, "adalah dua eks")
            self.lahir(b, r"\text{miring}=2x", cp(1, 1))
            self.tunggu(b, "selisih tinggi dan limit")
            self.panel.baris(r"\lim_{h\to0}\frac{(x+h)^2-x^2}{h}", b=b, run_time=.6)
        with self.bagian("fungsi") as b:
            self.tunggu(b, "masukan eks")
            self.panel.baris(r"x\longmapsto 2x", b=b, warna=AKSEN2, run_time=.6)
            self.tunggu(b, "kita tulis")
            self.ubah(b, r"f'(x)=2x", warna=AKSEN2)

        biru = {}
        with self.bagian("peta") as b:
            self.bersihkan_papan(b)
            self.panel.baris(r"f(x)=x^2\quad\text{tinggi}", b=b, run_time=.5)
            self.panel.baris(r"f'(x)=2x\quad\text{miring}", b=b, warna=AKSEN2, run_time=.5)
            self.tunggu(b, "eks negatif satu")
            self.pindah(b, -1, lama=.9)
            self.tunggu(b, "catat sebagai titik biru")
            biru[-1] = Dot(cp(-1, -2), radius=.065).set_color(AKSEN2)
            self.muncul(b, hasil_minus=biru[-1])
            pasangan = self.panel.baris(r"(x,\text{miring})=(-1,-2)", b=b, warna=AKSEN2, run_time=.55)
        with self.bagian("peta_nol") as b:
            self.tunggu(b, "eks nol")
            self.pindah(b, 0, lama=.65)
            self.tunggu(b, "titik birunya")
            biru[0] = Dot(cp(0, 0), radius=.05).set_color(AKSEN2)
            self.muncul(b, hasil_nol=biru[0], lama=.4)
            sinema.ganti_rumus(self, pasangan, r"(x,\text{miring})=(0,0)",
                               b=b, papan=self.panel, run_time=.55, warna=AKSEN2)
            pasangan = self.panel.baris_lain[-1]
        with self.bagian("peta_satu") as b:
            self.tunggu(b, "eks satu")
            self.pindah(b, 1, lama=.65)
            self.tunggu(b, "titik biru berada")
            biru[1] = Dot(cp(1, 2), radius=.065).set_color(AKSEN2)
            self.muncul(b, hasil_satu=biru[1], lama=.4)
            sinema.ganti_rumus(self, pasangan, r"(x,\text{miring})=(1,2)",
                               b=b, papan=self.panel, run_time=.55, warna=AKSEN2)
            pasangan = self.panel.baris_lain[-1]
            self.tunggu(b, "titik merah tetap")
            b.main(Indicate(p, color=AKSEN, scale_factor=1.8), run_time=.65)
        with self.bagian("peta_dua") as b:
            self.tunggu(b, "eks dua")
            self.pindah(b, 2, lama=.65)
            self.tunggu(b, "tambahkan titik biru")
            biru[2] = Dot(cp(2, 4), radius=.05).set_color(AKSEN2)
            self.muncul(b, hasil_dua=biru[2], lama=.4)
            sinema.ganti_rumus(self, pasangan, r"(x,\text{miring})=(2,4)",
                               b=b, papan=self.panel, run_time=.55, warna=AKSEN2)
        with self.bagian("sapu") as b:
            self.bersihkan_papan(b)
            self.panel.baris(r"f(x)=x^2\quad\text{tinggi}", b=b, run_time=.35)
            self.panel.baris(r"f'(x)=2x\quad\text{miring}", b=b, warna=AKSEN2, run_time=.35)
            self.pindah(b, -1.4, lama=.5)
            jejak = Line(cp(-1.4, -2.8), cp(-1.399, -2.798)).set_stroke(AKSEN2, 4)
            pelacak = Dot(cp(-1.4, -2.8), radius=.055).set_color(AKSEN2)
            self.tunggu(b, "setiap kemiringan")
            self.add(jejak, pelacak)
            self.aktif.update(jejak=jejak, pelacak=pelacak)
            def sapu(m, alpha):
                x = -1.4 + 3.4*alpha
                p.move_to(cp(x, x*x))
                tan.become(self.singgung(x))
                pelacak.move_to(cp(x, 2*x))
                jejak.put_start_and_end_on(cp(-1.4, -2.8), cp(max(x, -1.399), 2*max(x, -1.399)))
            b.main(UpdateFromAlphaFunc(p, sapu), run_time=4.0, rate_func=linear)
            self.x = 2
            self.tunggu(b, "bentuknya berbeda")
            b.main(Indicate(kurva, color=TINTA, scale_factor=1.03), run_time=.8)
            self.hilang(b, "pelacak", lama=.2)
        with self.bagian("tanda") as b:
            self.tunggu(b, "di kiri nol")
            self.pindah(b, -1, lama=1)
            self.tunggu(b, "kemiringannya negatif")
            self.panel.baris(r"x<0:\quad f'(x)<0", b=b, warna=AKSEN2, run_time=.55)
            b.main(Indicate(biru[-1], color=AKSEN2, scale_factor=1.9), run_time=.65)
        with self.bagian("datar") as b:
            self.tunggu(b, "eks nol")
            self.pindah(b, 0, lama=.75)
            self.tunggu(b, "kemiringannya nol")
            self.bersihkan_papan(b)
            self.panel.baris(r"f'(0)=0", b=b, warna=AKSEN2, run_time=.5)
            self.tunggu(b, "di kanan nol")
            self.pindah(b, 1, lama=1)
            self.panel.baris(r"x>0:\quad f'(x)>0", b=b, warna=AKSEN2, run_time=.55)

        with self.bagian("contoh_tiga") as b:
            self.kosongkan(b)
            kartu = VGroup(*[Rectangle(width=2.7, height=2.3, color=col).move_to([x, .4, 0])
                              for x, col in ((-4.7, TINTA), (-1.5, AKSEN2))])
            self.muncul(b, kartu=kartu, lama=.5)
            self.muncul(b, True, nama_f=teks("tinggi", 30).move_to([-4.7, 1.95, 0]),
                        nama_df=teks("kemiringan", 30, AKSEN2).move_to([-1.5, 1.95, 0]), lama=.3)
            self.tunggu(b, "tiga kuadrat")
            self.muncul(b, True, hitung_f=rumus(r"f(3)=3^2", 38).move_to([-4.7, .9, 0]), lama=.4)
            self.tunggu(b, "yaitu sembilan")
            self.muncul(b, True, nilai_f=rumus("9", 60).move_to([-4.7, -.1, 0]), lama=.4)
            self.tunggu(b, "dua kali tiga")
            self.muncul(b, True, hitung_df=rumus(r"f'(3)=2(3)", 38, AKSEN2).move_to([-1.5, .9, 0]), lama=.4)
            self.tunggu(b, "yaitu enam")
            self.muncul(b, True, nilai_df=rumus("6", 60, AKSEN2).move_to([-1.5, -.1, 0]), lama=.4)
        with self.bagian("notasi") as b:
            self.tunggu(b, "ef aksen eks")
            self.lahir(b, r"f'(x)", [-1.5, .4, 0])
            self.tunggu(b, "ditulis ye")
            self.muncul(b, True, arti_y=rumus("y=f(x)", 34).move_to([-3.1, -1.5, 0]), lama=.5)
            self.tunggu(b, "de ye per de eks")
            self.ubah(b, r"f'(x)=\frac{dy}{dx}", warna=AKSEN2)
        with self.bagian("arti_notasi") as b:
            self.tunggu(b, "perubahan tinggi")
            self.panel.baris(r"\lim_{h\to0}\frac{f(x+h)-f(x)}{h}", b=b, run_time=.55)
            self.tunggu(b, "bukan nilai ye")
            self.bersihkan_papan(b)
            self.panel.baris(r"\frac{dy}{dx}:\ \text{laju perubahan}", b=b, warna=SOROT, run_time=.55)
            self.panel.baris(r"\frac{y}{x}:\ \text{perbandingan nilai}", b=b, run_time=.55)

        v = VGroup(Line(cp(-2.8, 2.8), cp(0, 0)), Line(cp(0, 0), cp(2.8, 2.8))).set_stroke(TINTA, 4.5)
        sudut = Dot(cp(0, 0), radius=.075).set_color(AKSEN)
        kiri = Line(cp(-2.8, -1), cp(0, -1)).set_stroke(AKSEN2, 4)
        kanan = Line(cp(0, 1), cp(2.8, 1)).set_stroke(AKSEN2, 4)
        cincin_k = Circle(radius=.075).set_stroke(AKSEN2, 3).set_fill(LATAR, 1).move_to(cp(0, -1))
        cincin_a = Circle(radius=.075).set_stroke(AKSEN2, 3).set_fill(LATAR, 1).move_to(cp(0, 1))
        lk = VGroup(Line(cp(-2, 2), cp(-1, 2)), Line(cp(-1, 2), cp(-1, 1))).set_stroke(SOROT, 4)
        la = VGroup(Line(cp(1, 1), cp(2, 1)), Line(cp(2, 1), cp(2, 2))).set_stroke(SOROT, 4)
        with self.bagian("sudut") as b:
            # Konteks lama tetap terlihat sampai ucapan memperkenalkan V.
            self.tunggu(b, "lihat grafik")
            self.kosongkan(b)
            self.muncul(b, sumbu=sumbu, mutlak=v, sudut=sudut, lama=.5)
            self.muncul(b, True, x=lx, y=ly, lama=.3)
            self.lahir(b, r"f(x)=|x|", cp(1, 1))
            self.tunggu(b, "sudut tajam")
            b.main(Indicate(sudut, color=AKSEN, scale_factor=2), run_time=.7)
        with self.bagian("kiri") as b:
            self.tunggu(b, "garis turun satu")
            self.muncul(b, langkah_kiri=lk, lama=.7)
            self.tunggu(b, "kemiringannya negatif satu")
            self.panel.baris(r"x<0:\quad f'(x)=-1", b=b, warna=AKSEN2, run_time=.55)
            self.muncul(b, jejak_kiri=kiri, lubang_kiri=cincin_k, lama=.5)
        with self.bagian("kanan") as b:
            self.tunggu(b, "garis naik satu")
            self.hilang(b, "langkah_kiri", lama=.25)
            self.muncul(b, langkah_kanan=la, lama=.7)
            self.tunggu(b, "kemiringannya positif satu")
            self.panel.baris(r"x>0:\quad f'(x)=1", b=b, warna=AKSEN2, run_time=.55)
            self.muncul(b, jejak_kanan=kanan, lubang_kanan=cincin_a, lama=.5)
        with self.bagian("tidak_ada") as b:
            self.hilang(b, "langkah_kanan")
            self.tunggu(b, "hasil berbeda")
            b.main(Indicate(VGroup(cincin_k, cincin_a), color=AKSEN2, scale_factor=1.15), run_time=.6)
            self.tunggu(b, "tidak ada satu nilai")
            self.bersihkan_papan(b)
            self.panel.baris(r"-1\ne1", b=b, warna=SOROT, run_time=.5)
            self.panel.baris(r"f'(0)\ \text{tidak ada}", b=b, warna=AKSEN2, run_time=.55)
            self.tunggu(b, "bulatan kosong")
            b.main(Indicate(VGroup(cincin_k, cincin_a), color=AKSEN2, scale_factor=1.35), run_time=.8)
        with self.bagian("tutup") as b:
            self.kosongkan(b)
            self.muncul(b, sumbu=sumbu, kurva=kurva, jejak=jejak, lama=.5)
            self.muncul(b, True, x=lx, y=ly, lama=.3)
            self.panel.baris(r"f:\quad\text{tinggi}", b=b, run_time=.5)
            self.tunggu(b, "fungsi turunan")
            self.panel.baris(r"f':\quad\text{kemiringan}", b=b, warna=AKSEN2, run_time=.5)
            self.tunggu(b, "turunannya ada")
            self.panel.baris(r"\text{jika turunannya ada}", b=b, run_time=.5)
            self.tunggu(b, "untuk eks kuadrat")
            self.bersihkan_papan(b)
            self.panel.baris(r"f(x)=x^2", b=b, run_time=.5)
            self.tunggu(b, "turunannya dua eks")
            self.panel.baris(r"f'(x)=2x", b=b, warna=AKSEN2, run_time=.6)

        tujuan = AKAR/"qc"/TOPIK/"jadwal-render.json"
        tujuan.parent.mkdir(parents=True, exist_ok=True)
        tujuan.write_text(json.dumps(self.jadwal, indent=2), encoding="utf-8")
        tujuan.with_name("isyarat-render.json").write_text(json.dumps(self.isyarat, indent=2), encoding="utf-8")

    def singgung(self, x):
        dx = .78 / np.sqrt(1 + 4*x*x) / .65
        return Line(self.cp(x-dx, x*x-2*x*dx), self.cp(x+dx, x*x+2*x*dx)).set_stroke(SOROT, 4)

    def pindah(self, b, x, lama=.8):
        awal = self.x
        def gerak(m, alpha):
            xx = (1-alpha)*awal+alpha*x
            self.p.move_to(self.cp(xx, xx*xx))
            self.tan.become(self.singgung(xx))
        b.main(UpdateFromAlphaFunc(self.p, gerak), run_time=lama)
        self.x = x

    def potong(self, h):
        # Segmen wajib mencapai KEDUA titik, termasuk ketika |h| = 0,65.
        dx = .8
        return Line(self.cp(1-dx, 1-(2+h)*dx), self.cp(1+dx, 1+(2+h)*dx)).set_stroke(AKSEN2, 3.5)

    def gerak_h(self, b, q, garis, awal, akhir, lama):
        def gerak(m, alpha):
            h = (1-alpha)*awal + alpha*akhir
            q.move_to(self.cp(1+h, (1+h)**2))
            garis.become(self.potong(h))
        b.main(UpdateFromAlphaFunc(q, gerak), run_time=lama)

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

    def tunggu(self, b, frasa, urutan=1):
        # TTS memecah kata ulang "rata-rata"; pencarian juga mengizinkan bentuk itu.
        normalisasi = lambda s: re.findall(r"\w+", s.lower())
        wanted = normalisasi(frasa)
        tokens = []
        for w in KATA[self.segmen]["kata"]:
            tokens.extend((k, w["mulai"]) for k in normalisasi(w["kata"]))
        cocok = 0
        for i in range(len(tokens)-len(wanted)+1):
            if [k for k, _ in tokens[i:i+len(wanted)]] == wanted:
                cocok += 1
                if cocok != urutan:
                    continue
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
