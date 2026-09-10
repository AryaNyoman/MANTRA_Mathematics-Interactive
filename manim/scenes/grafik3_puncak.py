"""Materi 03: parabola dan bentuk puncak, standar video v3 (8 September 2026).

Ditulis ulang dari nol. Kerangka v3: pembuka pertanyaan, segar-ingat Materi 02,
contoh angka dijalankan di layar, asal rumus dibuktikan, bentuk umum, penutup
yang menunjuk Materi 04. Animasi dipicu pada detik KATA diucapkan lewat
`sinema.JamKata` dan `b.tunggu_kata`, bukan dibagi rata sepanjang kalimat.

Angka contohnya mengikuti halaman materi tahap 03 persis: y = 2(x-3)^2 - 5,
puncak (3, -5). Semua klaim angkanya diperiksa sympy lewat
`alat/klaim-video-grafik3.json`.

Satu bidang saja dipakai sepanjang video (sumbu x dari -5 sampai 6, y dari -8
sampai 4, skala kedua sumbu SAMA). Tiap kurva dipotong pada rentang x yang
membuatnya tetap utuh di dalam bingkai itu.

LETAK SUMBU, DAN KENAPA BUKAN DI KIRI (revisi 9 Sep 2026)
Versi pertama menaruh sumbu di kiri layar dengan lantai y = -6. Dari lembar
kontak terlihat tiga akibatnya, dan ketiganya satu sebab: di kiri, ruang tegak
dibatasi pita identitas, jadi rentang y terpaksa dangkal.
  1. Parabola a = -1 yang puncaknya di y = -5 cuma muat selebar 1,8 satuan,
     jadi "berbalik dan terbuka ke bawah" tidak terlihat seperti yang dikatakan.
  2. Tengah dan kanan bawah layar kosong; gambarnya menumpuk di satu sudut.
Sumbu sekarang di tengah kiri (x -4,4 sampai 0,6): di kanannya zona panel
rumus, di kirinya tulisan identitas, dan lantainya bisa turun ke -8.
"""
import json
import sys
from contextlib import contextmanager
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *
from gl import kamera, qc, sinema

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "grafik3-puncak"
DURASI = json.loads((AKAR / 'audio' / TOPIK / 'durasi.json').read_text(encoding='utf-8'))['segmen']
KATA = sinema.JamKata(TOPIK)

# Satuan layar per satu langkah sumbu. Sama untuk x dan y: perbandingan
# kemiringan yang dilihat mata harus jujur.
SATUAN = 0.46
X0, X1 = -5, 6
Y0, Y1 = -8, 4


def kuadrat(x):
    return x * x


def utama(x, a=2.0, h=3.0, k=-5.0):
    return a * (x - h) ** 2 + k


class BentukPuncak(AdeganMatra):
    def construct(self):
        kamera.pasang_awal(self.frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8)
        self.aktif, self.tulisan, self.panel, self.jadwal = {}, {}, None, []

        ident = sinema.identitas(self, 'Materi 03')
        self.ident = ident

        sumbu = Axes(x_range=(X0, X1, 1), y_range=(Y0, Y1, 2),
                     width=(X1 - X0) * SATUAN, height=(Y1 - Y0) * SATUAN,
                     axis_config=dict(stroke_color=REDUP, stroke_width=2))
        sumbu.move_to([-1.90, 0.52, 0])
        angka = sumbu.add_coordinate_labels(font_size=20, num_decimal_places=0)
        angka.set_color(TINTA)
        sumbu.angka = angka
        self.sumbu = sumbu
        cp = sumbu.c2p
        lx = rumus('x', 26, REDUP).next_to(sumbu.x_axis, RIGHT, buff=0.12)
        ly = rumus('y', 26, REDUP).next_to(sumbu.y_axis, UP, buff=0.10)

        def kurva(fn, xa, xb, warna=TINTA, lebar=4):
            k = ParametricCurve(lambda t: cp(t, fn(t)), t_range=(xa, xb, 0.02))
            return k.set_stroke(warna, lebar)

        def titik(x, y, warna=AKSEN, r=0.075):
            return Dot(cp(x, y), radius=r).set_color(warna)

        # ---- pembuka: satu parabola, satu angka diubah, kurvanya pindah ----
        pembuka_kanan = kurva(lambda t: (t - 3) ** 2, 1.0, 5.0, TINTA)
        pembuka_kiri = kurva(lambda t: (t - 1) ** 2, -1.0, 3.0, TINTA)

        with self.bagian('buka') as b:
            b.tunggu_kata('Ini sebuah')
            self.muncul(b, sumbu=sumbu, kurva=pembuka_kanan)
            self.muncul(b, True, x=lx, y=ly)
            b.tunggu_kata('Ubah satu')
            self.papan(b, 'y=(x-3)^2')
            b.tunggu_kata('dalam rumusnya')
            b.main(Indicate(self.panel, color=SOROT, scale_factor=1.06), run_time=1.0)
            b.tunggu_kata('seluruh kurvanya')
            b.main(Transform(pembuka_kanan, pembuka_kiri), run_time=1.4)
            self.papan(b, 'y=(x-1)^2', warna=AKSEN)
            b.tunggu_kata('Kenapa satu')
            self.papan(b, r'\text{satu angka}', r'\text{seluruh kurva pindah?}', warna=SOROT)

        # ---- segar-ingat Materi 02: fungsi itu mesin, grafik itu jejaknya ----
        kotak_mesin = RoundedRectangle(width=1.5, height=0.9, corner_radius=0.12)
        kotak_mesin.move_to([5.35, -1.35, 0]).set_stroke(REDUP, 2).set_fill(REDUP, 0.10)
        isi_mesin = rumus('2x+1', 30, TINTA).move_to(kotak_mesin)
        panah_masuk = Arrow(LEFT * 0.55, ORIGIN, buff=0).set_stroke(REDUP, 3)
        panah_masuk.next_to(kotak_mesin, LEFT, buff=0.08)
        panah_keluar = Arrow(ORIGIN, RIGHT * 0.55, buff=0).set_stroke(REDUP, 3)
        panah_keluar.next_to(kotak_mesin, RIGHT, buff=0.08)
        cap_masuk = sinema.label('masuk', warna=REDUP).scale(0.75).next_to(panah_masuk, UP, buff=0.10)
        cap_keluar = sinema.label('keluar', warna=REDUP).scale(0.75).next_to(panah_keluar, UP, buff=0.10)

        with self.bagian('ingat') as b:
            b.tunggu_kata('materi dua')
            self.hilang(b, 'kurva')
            self.papan(b, r'\text{Materi 02}', r'\text{potret sebuah aturan}')
            b.tunggu_kata('sebuah mesin')
            self.muncul(b, mesin=kotak_mesin, masuk=panah_masuk, keluar=panah_keluar)
            self.muncul(b, True, isi_mesin=isi_mesin, cap_masuk=cap_masuk, cap_keluar=cap_keluar)
            b.tunggu_kata('grafik adalah')
            self.papan(b, r'\text{grafik}=\text{jejak aturan}', r'\text{dijalankan berkali-kali}')
            b.tunggu_kata('menjalankan mesin')
            bulir = Dot(kotak_mesin.get_left() + LEFT * 0.5, radius=0.07).set_color(AKSEN)
            self.add(bulir)
            b.main(bulir.animate.move_to(kotak_mesin.get_right() + RIGHT * 0.5), run_time=1.5)
            b.main(FadeOut(bulir), run_time=0.4)
            b.tunggu_kata('ubah aturannya')
            b.main(Indicate(isi_mesin, color=AKSEN, scale_factor=1.25), run_time=1.2)

        garis_lurus = kurva(lambda t: 2 * t + 1, -2.5, 1.5, AKSEN2, 3.5)
        tl0, tl1 = titik(0, 1, AKSEN2), titik(1, 3, AKSEN2)
        ctl0 = rumus('(0,1)', 26, AKSEN2).next_to(tl0, DR, buff=0.10)
        ctl1 = rumus('(1,3)', 26, AKSEN2).next_to(tl1, UR, buff=0.10)

        with self.bagian('jejak') as b:
            b.tunggu_kata('ef eks')
            self.papan(b, 'f(x)=2x+1', warna=AKSEN2)
            b.tunggu_kata('Masukkan nol')
            self.muncul(b, tl0=tl0, lama=0.6)
            b.tunggu_kata('keluar satu')
            self.muncul(b, True, ctl0=ctl0, lama=0.7)
            b.tunggu_kata('Masukkan satu')
            self.muncul(b, tl1=tl1, lama=0.6)
            b.tunggu_kata('keluar tiga')
            self.muncul(b, True, ctl1=ctl1, lama=0.7)
            b.tunggu_kata('berjajar lurus')
            b.main(ShowCreation(garis_lurus), run_time=2.0)
            self.aktif['garis_lurus'] = garis_lurus

        # ---- mesin baru: y = x^2 ----
        with self.bagian('mesin_baru') as b:
            b.tunggu_kata('Sekarang mesinnya')
            self.hilang(b, 'garis_lurus', 'tl0', 'tl1', 'ctl0', 'ctl1')
            b.main(Indicate(kotak_mesin, color=AKSEN, scale_factor=1.10), run_time=1.1)
            b.tunggu_kata('kalikan')
            b.main(Transform(isi_mesin, rumus(r'x\times x', 30, AKSEN).move_to(kotak_mesin)),
                   run_time=1.4)
            self.papan(b, r'x\times x', warna=AKSEN)
            b.tunggu_kata('Ditulis')
            self.papan(b, 'y=x^2', warna=AKSEN)

        # Tabel nilai. Ditaruh di bawah panel rumus, di ruang yang tidak dipakai
        # sumbu maupun panel.
        KOLOM_X, KOLOM_Y, ATAS, LANGKAH = 2.60, 3.70, 0.55, 0.52
        kepala = VGroup(rumus('x', 26, REDUP).move_to([KOLOM_X, ATAS, 0]),
                        rumus('y', 26, REDUP).move_to([KOLOM_Y, ATAS, 0]))

        def baris(i, kiri, kanan, warna=AKSEN):
            y = ATAS - (i + 1) * LANGKAH
            return VGroup(rumus(kiri, 28, TINTA).move_to([KOLOM_X, y, 0]),
                          rumus(kanan, 28, warna).move_to([KOLOM_Y, y, 0]))

        tk = [titik(x, kuadrat(x), AKSEN) for x in (0, 1, 2, -1, -2)]
        bk = [baris(0, '0', '0'), baris(1, '1', '1'), baris(2, '2', '4'),
              baris(3, '-1', '1'), baris(4, '-2', '4')]

        with self.bagian('jalankan') as b:
            self.muncul(b, True, kepala=kepala, lama=0.5)
            for i, frasa in enumerate(('Masukkan nol', 'Masukkan satu', 'Masukkan dua')):
                b.tunggu_kata(frasa)
                self.muncul(b, **{f'tk{i}': tk[i]}, lama=0.7)
                self.muncul(b, True, **{f'bk{i}': bk[i]}, lama=0.7)
                b.main(Indicate(bk[i], color=SOROT, scale_factor=1.10), run_time=0.8)

        with self.bagian('negatif') as b:
            b.tunggu_kata('Minus satu kali')
            self.muncul(b, tk3=tk[3], lama=0.7)
            b.tunggu_kata('hasilnya satu')
            self.muncul(b, True, bk3=bk[3], lama=0.8)
            b.tunggu_kata('Minus dua')
            self.muncul(b, tk4=tk[4], lama=0.7)
            self.muncul(b, True, bk4=bk[4], lama=0.7)
            b.main(Indicate(VGroup(tk[3], tk[4]), color=SOROT, scale_factor=1.5), run_time=0.9)
            b.tunggu_kata('Tanda minusnya')
            b.main(Indicate(VGroup(bk[3], bk[4]), color=SOROT, scale_factor=1.08), run_time=1.2)

        parabola = kurva(kuadrat, -2.0, 2.0, TINTA)
        with self.bagian('parabola') as b:
            self.hilang(b, 'mesin', 'masuk', 'keluar', 'isi_mesin', 'cap_masuk', 'cap_keluar')
            b.tunggu_kata('hubungkan')
            b.main(ShowCreation(parabola), run_time=2.0)
            self.aktif['parabola'] = parabola
            b.tunggu_kata('lengkung simetris')
            self.papan(b, r'\text{parabola}', 'y=x^2')

        puncak0 = titik(0, 0, SOROT, 0.10)
        with self.bagian('terendah') as b:
            b.tunggu_kata('Titik terendahnya')
            self.muncul(b, puncak0=puncak0, lama=0.7)
            b.tunggu_kata('bukan kebetulan')
            b.main(Indicate(puncak0, color=SOROT, scale_factor=2.0), run_time=1.2)
            b.tunggu_kata('tidak pernah negatif')
            self.papan(b, r'x^2\ge 0', warna=SOROT)
            b.tunggu_kata('hanya terjadi')
            self.papan(b, r'x^2\ge 0', r'x^2=0\ \text{hanya saat}\ x=0', warna=SOROT)

        # ---- kenapa perlu dipindahkan ----
        lemparan = kurva(lambda t: -0.5 * (t - 3) ** 2 + 3.5, 0.4, 5.6, AKSEN2, 3)
        bola = Dot(cp(3, 3.5), radius=0.09).set_color(AKSEN2)
        with self.bagian('masalah') as b:
            self.hilang(b, *[f'bk{i}' for i in range(5)], 'kepala',
                        *[f'tk{i}' for i in range(5)], lama=0.5)
            b.tunggu_kata('Bola basket')
            self.muncul(b, lemparan=lemparan, lama=0.9)
            self.aktif['bola'] = bola
            self.add(bola)
            b.main(MoveAlongPath(bola, lemparan), run_time=2.6)

        # ---- geser ke atas ----
        naik = kurva(lambda t: kuadrat(t) + 2, -1.4, 1.4, AKSEN)
        bayang_naik = kurva(kuadrat, -2.0, 2.0, REDUP, 2)
        panah_naik = VGroup(*[Arrow(cp(x, kuadrat(x)), cp(x, kuadrat(x) + 2), buff=0.02)
                              .set_stroke(AKSEN, 2.5) for x in (-1.0, 0.0, 1.0)])
        with self.bagian('naik') as b:
            self.hilang(b, 'lemparan', 'bola', lama=0.4)
            b.tunggu_kata('Tambahkan dua')
            self.papan(b, 'y=x^2+2', warna=AKSEN)
            b.tunggu_kata('Di eks')
            self.muncul(b, bayang_naik=bayang_naik, lama=0.5)
            b.main(ReplacementTransform(parabola.copy(), naik), run_time=1.9)
            self.aktif['naik'] = naik
            b.tunggu_kata('setiap tinggi')
            self.muncul(b, panah_naik=panah_naik, lama=1.2)
            b.tunggu_kata('Seluruh kurvanya')
            b.main(Indicate(naik, color=AKSEN, scale_factor=1.04), run_time=1.2)

        with self.bagian('samping') as b:
            self.hilang(b, 'naik', 'panah_naik', 'bayang_naik', lama=0.5)
            b.tunggu_kata('ke samping')
            panah_samping = VGroup(
                Arrow(cp(0, 3), cp(2.6, 3), buff=0).set_stroke(SOROT, 3),
                Arrow(cp(0, 3), cp(-2.6, 3), buff=0).set_stroke(SOROT, 3))
            self.muncul(b, panah_samping=panah_samping, lama=1.2)
            self.papan(b, r'\text{ke samping?}', warna=SOROT)
            b.tunggu_kata('hanya menaikkan')
            b.main(Indicate(panah_samping, color=SOROT, scale_factor=1.08), run_time=1.2)
            self.hilang(b, 'panah_samping', lama=0.6)

        geser_kanan = kurva(lambda t: (t - 3) ** 2, 1.0, 5.0, AKSEN)
        with self.bagian('kurung') as b:
            b.tunggu_kata('angkanya dimasukkan')
            self.papan(b, r'\text{angka masuk ke dalam kurung}', warna=REDUP)
            b.tunggu_kata('kurung yang')
            self.papan(b, 'y=(x-3)^2', warna=AKSEN)
            b.tunggu_kata('Ye sama')
            self.hilang(b, 'parabola', 'puncak0', lama=0.6)
            b.main(ShowCreation(geser_kanan), run_time=1.8)
            self.aktif['geser_kanan'] = geser_kanan

        tg = [titik(3, 0, AKSEN), titik(4, 1, AKSEN), titik(2, 1, AKSEN)]
        bg = [baris(0, '3', '0'), baris(1, '4', '1'), baris(2, '2', '1')]
        with self.bagian('kurung_hitung') as b:
            b.tunggu_kata('Kita hitung')
            self.muncul(b, True, kepala=kepala, lama=0.7)
            for i, frasa in enumerate(('dengan tiga', 'dengan empat', 'dengan dua')):
                b.tunggu_kata(frasa)
                self.muncul(b, **{f'tg{i}': tg[i]}, lama=0.7)
                self.muncul(b, True, **{f'bg{i}': bg[i]}, lama=0.7)
                b.main(Indicate(bg[i], color=SOROT, scale_factor=1.10), run_time=0.9)

        panah_kanan = Arrow(cp(0, -1.5), cp(3, -1.5), buff=0).set_stroke(SOROT, 3)
        cap_kanan = sinema.label('ke kanan', warna=SOROT).scale(0.8).move_to(cp(2.6, -2.2))
        with self.bagian('kanan') as b:
            b.tunggu_kata('titik terendahnya')
            b.main(Indicate(tg[0], color=SOROT, scale_factor=2.2), run_time=1.2)
            b.tunggu_kata('Perhatikan')
            b.main(Indicate(self.panel, color=SOROT, scale_factor=1.04), run_time=1.2)
            b.tunggu_kata('pindah ke')
            self.muncul(b, panah_kanan=panah_kanan, lama=0.9)
            self.muncul(b, True, cap_kanan=cap_kanan, lama=0.6)

        with self.bagian('kenapa_kanan') as b:
            b.tunggu_kata('Terasa terbalik')
            b.main(Indicate(self.panel, color=SOROT, scale_factor=1.05), run_time=1.2)
            b.tunggu_kata('alasannya sederhana')
            self.papan(b, r'\text{kenapa ke kanan?}', warna=REDUP)
            b.tunggu_kata('isi kurungnya')
            self.papan(b, r'\text{terendah saat}', 'x-3=0', warna=SOROT)
            b.tunggu_kata('bernilai nol')
            self.papan(b, 'x-3=0', r'\Rightarrow\ x=3', warna=SOROT)

        geser_kiri = kurva(lambda t: (t + 3) ** 2, -5.0, -1.0, AKSEN2)
        panah_kiri = Arrow(cp(0, -1.5), cp(-3, -1.5), buff=0).set_stroke(AKSEN2, 3)
        cap_kiri = sinema.label('ke kiri', warna=AKSEN2).scale(0.8).move_to(cp(-2.6, -2.2))
        with self.bagian('kiri') as b:
            self.hilang(b, 'panah_kanan', 'cap_kanan', *[f'tg{i}' for i in range(3)],
                        *[f'bg{i}' for i in range(3)], 'kepala', lama=0.4)
            b.tunggu_kata('kurungnya eks')
            b.main(ShowCreation(geser_kiri), run_time=1.2)
            self.aktif['geser_kiri'] = geser_kiri
            b.tunggu_kata('isinya nol')
            self.papan(b, 'y=(x+3)^2', 'x+3=0', r'\Rightarrow\ x=-3', warna=AKSEN2)
            b.tunggu_kata('pindah ke')
            self.muncul(b, panah_kiri=panah_kiri, lama=0.9)
            self.muncul(b, True, cap_kiri=cap_kiri, lama=0.6)

        with self.bagian('aturan_kurung') as b:
            b.tunggu_kata('membuat isi')
            self.papan(b, r'\text{bukan tandanya,}', r'\text{tetapi }x\text{ yang}',
                       r'\text{mengosongkan kurung}', warna=SOROT)

        # ---- contoh utama: y = 2(x-3)^2 - 5 ----
        kurva_utama = kurva(utama, 1.2, 4.8, TINTA)
        with self.bagian('gabung') as b:
            b.tunggu_kata('pengali')
            self.papan(b, r'y=a(x-h)^2+k', warna=REDUP)
            b.tunggu_kata('Ye sama')
            self.hilang(b, 'geser_kanan', 'geser_kiri', 'panah_kiri', 'cap_kiri', lama=0.5)
            b.main(ShowCreation(kurva_utama), run_time=1.4)
            self.aktif['kurva_utama'] = kurva_utama
            self.papan(b, 'y=2(x-3)^2-5')

        puncak = titik(3, -5, SOROT, 0.10)
        cap_puncak = rumus('(3,-5)', 26, SOROT).next_to(puncak, DR, buff=0.08)
        with self.bagian('contoh_puncak') as b:
            self.papan(b, '2(3-3)^2-5', '=2(0)-5=-5', warna=SOROT)
            self.muncul(b, True, kepala=kepala, lama=0.6)
            b.tunggu_kata('Hasilnya')
            self.muncul(b, puncak=puncak, lama=0.7)
            self.muncul(b, True, cap_puncak=cap_puncak, bu0=baris(0, '3', '-5', SOROT), lama=0.7)

        tu = [titik(4, -3, AKSEN), titik(2, -3, AKSEN), titik(5, 3, AKSEN2), titik(1, 3, AKSEN2)]
        with self.bagian('contoh_sisi') as b:
            b.tunggu_kata('Satu langkah')
            self.papan(b, '2(4-3)^2-5', '=2(1)-5=-3', warna=AKSEN)
            b.tunggu_kata('Hasilnya')
            self.muncul(b, tu0=tu[0], lama=0.8)
            self.muncul(b, True, bu1=baris(1, '4', '-3'), lama=0.8)
            b.main(Indicate(tu[0], color=AKSEN, scale_factor=2.0), run_time=0.9)

        with self.bagian('contoh_kembar') as b:
            b.tunggu_kata('Satu langkah')
            self.papan(b, '2(2-3)^2-5', '=2(1)-5=-3', warna=AKSEN)
            b.tunggu_kata('Hasilnya')
            self.muncul(b, tu1=tu[1], lama=0.8)
            self.muncul(b, True, bu2=baris(2, '2', '-3'), lama=0.8)
            b.main(Indicate(VGroup(tu[0], tu[1]), color=AKSEN, scale_factor=2.0), run_time=0.9)

        with self.bagian('contoh_jauh') as b:
            b.tunggu_kata('Dua langkah ke kanan')
            self.muncul(b, tu2=tu[2], lama=0.8)
            self.muncul(b, True, bu3=baris(3, '5', '3', AKSEN2), lama=0.8)
            b.main(Indicate(tu[2], color=AKSEN2, scale_factor=2.0), run_time=0.9)
            b.tunggu_kata('Dua langkah ke kiri')
            self.muncul(b, tu3=tu[3], lama=0.8)
            self.muncul(b, True, bu4=baris(4, '1', '3', AKSEN2), lama=0.8)
            b.main(Indicate(tu[3], color=AKSEN2, scale_factor=2.0), run_time=0.9)

        # Dua potong, bukan satu. Satu garis utuh menembus angka "3" di sumbu x
        # dan membuat angkanya sulit dibaca (temuan dari lembar kontak 9 Sep).
        sumbu_simetri = VGroup(
            DashedLine(cp(3, 0.45), cp(3, 3.4)).set_stroke(SOROT, 2.5),
            DashedLine(cp(3, -0.95), cp(3, -7.4)).set_stroke(SOROT, 2.5))
        cap_simetri = rumus('x=3', 26, SOROT).next_to(sumbu_simetri, UP, buff=0.10)
        with self.bagian('simetri') as b:
            b.tunggu_kata('selalu berpasangan')
            b.main(Indicate(VGroup(tu[0], tu[1]), color=SOROT, scale_factor=1.6), run_time=0.9)
            b.main(Indicate(VGroup(tu[2], tu[3]), color=SOROT, scale_factor=1.6), run_time=0.9)
            b.tunggu_kata('terlihat simetris')
            b.main(Indicate(VGroup(tu[0], tu[1], tu[2], tu[3]), color=SOROT, scale_factor=1.8),
                   run_time=1.3)
            b.tunggu_kata('Garis tegak')
            b.main(ShowCreation(sumbu_simetri), run_time=1.6)
            self.aktif['sumbu_simetri'] = sumbu_simetri
            b.tunggu_kata('Namanya sumbu')
            self.muncul(b, True, cap_simetri=cap_simetri, lama=0.4)
            self.papan(b, r'\text{sumbu simetri}', 'x=3', warna=SOROT)

        with self.bagian('kenapa_simetri') as b:
            d_kanan = Arrow(cp(3, -3.2), cp(4.5, -3.2), buff=0).set_stroke(AKSEN, 3)
            d_kiri = Arrow(cp(3, -3.2), cp(1.5, -3.2), buff=0).set_stroke(AKSEN2, 3)
            cap_dk = rumus('d', 26, AKSEN).next_to(d_kanan, UP, buff=0.10)
            cap_dr = rumus('d', 26, AKSEN2).next_to(d_kiri, UP, buff=0.10)
            b.tunggu_kata('ke kanan')
            self.muncul(b, d_kanan=d_kanan, lama=0.8)
            self.muncul(b, True, cap_dk=cap_dk, lama=0.5)
            self.papan(b, '(3+d)-3=d', warna=AKSEN)
            b.tunggu_kata('Ke kiri')
            self.muncul(b, d_kiri=d_kiri, lama=0.8)
            self.muncul(b, True, cap_dr=cap_dr, lama=0.5)
            self.papan(b, '(3+d)-3=d', '(3-d)-3=-d', warna=AKSEN)
            b.tunggu_kata('Dikuadratkan')
            self.papan(b, 'd^2=(-d)^2', r'\text{tinggi sama}', warna=SOROT)
            b.tunggu_kata('tingginya pasti')
            b.main(Indicate(VGroup(d_kanan, d_kiri), color=SOROT, scale_factor=1.06), run_time=1.2)

        with self.bagian('umum') as b:
            self.hilang(b, *[f'bu{i}' for i in range(5)], 'kepala',
                        'd_kanan', 'd_kiri', 'cap_dk', 'cap_dr', lama=0.5)
            b.tunggu_kata('dari angka')
            self.papan(b, '2(x-3)^2-5', warna=REDUP)
            b.tunggu_kata('Ye sama')
            self.papan(b, 'y=a(x-h)^2+k')
            b.tunggu_kata('Puncaknya di')
            self.papan(b, 'y=a(x-h)^2+k', r'\text{puncak}=(h,k)', warna=SOROT)
            b.main(Indicate(puncak, color=SOROT, scale_factor=2.2), run_time=0.9)
            b.tunggu_kata('sumbu simetrinya')
            self.papan(b, 'y=a(x-h)^2+k', r'\text{puncak}=(h,k)', 'x=h', warna=SOROT)
            b.main(Indicate(sumbu_simetri, color=SOROT, scale_factor=1.04), run_time=1.2)
            b.tunggu_kata('bentuk puncak')
            b.main(Indicate(self.panel, color=SOROT, scale_factor=1.05), run_time=1.2)

        # ---- peran a: puncak dikunci di (3, -5) ----
        a_tiga = kurva(lambda t: utama(t, a=3.0), 1.6, 4.4, AKSEN)
        a_kecil = kurva(lambda t: utama(t, a=0.3), 0.2, 5.8, AKSEN2)
        a_minus = kurva(lambda t: utama(t, a=-1.0), 1.3, 4.7, SOROT)
        bayang = kurva(utama, 1.2, 4.8, REDUP, 2)

        with self.bagian('a_besar') as b:
            self.hilang(b, *[f'tu{i}' for i in range(4)], 'cap_puncak', lama=0.4)
            b.tunggu_kata('Puncaknya kita')
            self.muncul(b, bayang=bayang, lama=0.3)
            b.tunggu_kata('dibesarkan')
            b.main(ReplacementTransform(kurva_utama, a_tiga), run_time=2.2)
            self.aktif.pop('kurva_utama', None)
            self.aktif['a_kini'] = a_tiga
            b.tunggu_kata('tidak bergeser')
            b.main(Indicate(puncak, color=SOROT, scale_factor=2.2), run_time=1.2)
            b.tunggu_kata('sempit dan curam')
            self.papan(b, 'a=3', r'\text{sempit dan curam}', warna=AKSEN)

        with self.bagian('a_kecil') as b:
            b.tunggu_kata('dikalikan tiga')
            b.main(Indicate(a_tiga, color=AKSEN, scale_factor=1.05), run_time=1.2)
            b.tunggu_kata('dikecilkan')
            b.main(ReplacementTransform(a_tiga, a_kecil), run_time=2.4)
            self.aktif['a_kini'] = a_kecil
            b.tunggu_kata('melebar serta')
            self.papan(b, 'a=0{,}3', r'\text{melebar dan melandai}', warna=AKSEN2)

        with self.bagian('a_minus') as b:
            b.tunggu_kata('dibuat negatif')
            self.hilang(b, 'bayang', lama=0.5)
            b.main(ReplacementTransform(a_kecil, a_minus), run_time=1.8)
            self.aktif['a_kini'] = a_minus
            b.tunggu_kata('terbuka ke bawah')
            self.papan(b, 'a=-1', r'\text{terbuka ke bawah}', warna=SOROT)
            b.tunggu_kata('titik tertinggi')
            b.main(Indicate(puncak, color=SOROT, scale_factor=2.2), run_time=1.3)
            b.tunggu_kata('lemparan bola')
            b.main(Indicate(a_minus, color=SOROT, scale_factor=1.05), run_time=1.2)

        with self.bagian('tutup') as b:
            b.tunggu_kata('tiga hal')
            self.papan(b, r'h,k:\ \text{letak puncak}', warna=SOROT)
            b.tunggu_kata('tanda a')
            self.papan(b, r'h,k:\ \text{letak puncak}', r'\text{tanda }a:\ \text{arah}',
                       warna=SOROT)
            b.tunggu_kata('besar a')
            self.papan(b, r'h,k:\ \text{letak puncak}', r'\text{tanda }a:\ \text{arah}',
                       r'\text{besar }a:\ \text{lebar}', warna=SOROT)
            b.tunggu_kata('Video berikutnya')
            self.hilang(b, 'sumbu_simetri', 'cap_simetri', lama=0.8)
            self.papan(b, r'\text{berikutnya}', 'y=ax^2+bx+c', warna=AKSEN)
            b.tunggu_kata('bentuk puncak')
            b.main(Indicate(self.panel, color=AKSEN, scale_factor=1.05), run_time=1.2)

        sinema.laporkan_pemicu(self)
        tujuan = AKAR / 'qc' / TOPIK / 'jadwal-render.json'
        tujuan.parent.mkdir(parents=True, exist_ok=True)
        tujuan.write_text(json.dumps(self.jadwal, indent=2), encoding='utf-8')

    # ------------------------------------------------------------------ #
    # Perkakas adegan. Polanya sama dengan turunan2 yang sudah disetujui.  #
    # ------------------------------------------------------------------ #

    @contextmanager
    def bagian(self, ident):
        self.segmen = ident
        mulai = self.time
        with sinema.babak(self, ident, DURASI, kata=KATA) as b:
            yield b
        hud = {'identitas': self.ident}
        if self.panel is not None:
            hud['rumus'] = self.panel
        qc.periksa_adegan(self, {}, hud=hud, dunia=self.aktif, tulisan=self.tulisan)
        self.jadwal.append({'id': ident, 'mulai_audio': KATA.mulai(ident),
                            'mulai_video': mulai, 'akhir_video': self.time})

    def muncul(self, b, tulisan=False, lama=0.6, **benda):
        b.main(*[FadeIn(m) for m in benda.values()], run_time=lama)
        (self.tulisan if tulisan else self.aktif).update(benda)

    def hilang(self, b, *nama, lama=0.4):
        objek = []
        for n in nama:
            m = self.aktif.pop(n, None)
            if m is None:
                m = self.tulisan.pop(n, None)
            if m is not None:
                objek.append(m)
        if objek:
            b.main(*[FadeOut(m) for m in objek], run_time=lama)

    def papan(self, b, *baris, warna=TINTA):
        isi = VGroup(*[sinema.batasi_lebar(rumus(s, 34, warna), 4.4) for s in baris])
        isi.arrange(DOWN, buff=0.28)
        isi.move_to([4.35, 3.25 - isi.get_height() / 2, 0]).fix_in_frame()
        isi._qc_isi = True
        if self.panel is not None:
            b.main(FadeOut(self.panel), run_time=0.2)
        b.main(FadeIn(isi, shift=0.1 * UP), run_time=0.5)
        self.panel = isi
