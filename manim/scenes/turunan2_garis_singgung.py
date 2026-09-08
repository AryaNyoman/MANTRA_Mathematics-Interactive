"""Turunan 2: gambar melahirkan hitungan, lalu limit melahirkan turunan.

Narasi direkam per gagasan. Kata kunci memakai WordBoundary TTS, bukan
pembagian waktu berdasarkan panjang subtitle. Luas (1+h)^2 ditunjukkan
untuk h positif; identitas aljabarnya tetap berlaku saat h negatif.
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
TOPIK = "turunan2-garis-singgung"
DURASI = json.loads((AKAR / 'audio' / TOPIK / 'durasi.json').read_text(encoding='utf-8'))['segmen']
KATA = json.loads((AKAR / 'audio' / TOPIK / 'kata.json').read_text(encoding='utf-8'))


def f(x):
    return x * x


def kemiringan(h):
    if abs(h) < 1e-10:
        raise ValueError('Garis potong memerlukan dua titik berbeda: h bukan nol')
    return (f(1 + h) - f(1)) / h


def normal(teks):
    return re.sub(r'[^\w]+', '', teks.lower())


class TurunanGarisSinggung(AdeganMatra):
    def construct(self):
        kamera.pasang_awal(self.frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8)
        self.aktif, self.tulisan, self.panel, self.jadwal = {}, {}, None, []
        self.isyarat = []
        ident = sinema.identitas(self, 'Materi 02')
        self.remove(ident)
        self.ident = ident
        self.h = ValueTracker(1)
        sumbu = Axes(x_range=(-1, 3, 1), y_range=(0, 5, 1), width=4, height=5,
                     axis_config=dict(stroke_color=REDUP, stroke_width=2))
        sumbu.shift(np.array([-4.5, -1.7, 0]) - sumbu.c2p(0, 0))
        angka = sumbu.add_coordinate_labels(font_size=24, num_decimal_places=0)
        angka.set_color(TINTA)
        sumbu.angka = angka
        self.sumbu = sumbu
        cp = sumbu.c2p
        lx = rumus('x', 28, REDUP).next_to(sumbu.x_axis, RIGHT, buff=0.15)
        ly = rumus('y', 28, REDUP).next_to(sumbu.y_axis, UP, buff=0.12)
        kurva = ParametricCurve(lambda x: cp(x, f(x)), t_range=(-0.85, 2.17, 0.015))
        kurva.set_stroke(TINTA, 4)
        p = Dot(cp(1, 1), radius=0.085).set_color(AKSEN)
        lp = sinema.label('P', warna=AKSEN).next_to(p, DL, buff=0.16)
        q = self.ikuti_h(lambda: Dot(cp(1+self.h.get_value(), f(1+self.h.get_value())),
                                    radius=0.08).set_color(AKSEN2))
        lq = self.ikuti_h(lambda: sinema.label('Q', warna=AKSEN2).next_to(q, UR, buff=0.16))

        def garis(m, warna, lebar=3.5):
            xa, xb = -0.85, 2.85
            if m > 0:
                xa = max(xa, 1 + (-0.1-1)/m)
                xb = min(xb, 1 + (4.7-1)/m)
            return Line(cp(xa, 1+m*(xa-1)), cp(xb, 1+m*(xb-1))).set_stroke(warna, lebar)

        sekan = self.ikuti_h(lambda: garis(kemiringan(self.h.get_value()), AKSEN2))
        datar = Line(cp(1, 1), cp(2, 1)).set_stroke(AKSEN2, 3)
        tegak = Line(cp(2, 1), cp(2, 4)).set_stroke(AKSEN2, 3)
        ld = rumus('2-1=1', 30, AKSEN2).next_to(datar, DOWN, buff=0.27).shift(RIGHT*0.22)
        lt = rumus('4-1=3', 30, AKSEN2).next_to(tegak, RIGHT, buff=0.20)
        projp = DashedLine(cp(1, 0), cp(1, 1)).set_stroke(AKSEN, 2)
        projq = DashedLine(cp(2, 0), cp(2, 4)).set_stroke(AKSEN2, 2)

        with self.bagian('buka') as b:
            lama = DURASI['buka'] - 0.4
            sinema.judul_pembuka(self, 'Materi 02: kemiringan di satu titik', lama=lama)
            b.catat(lama)
        self.add(ident)
        with self.bagian('ingat') as b:
            self.muncul(b, sumbu=sumbu, P=p, Q=q, garis=sekan)
            self.muncul(b, True, x=lx, y=ly)
            self.tunggu(b, 'pada gambar')
            self.muncul(b, datar=datar, tegak=tegak)
            self.papan(b, r'\text{kemiringan}', r'=\frac{\text{kenaikan}}{\text{langkah mendatar}}')
        calon = VGroup(*[garis(m, REDUP, 2) for m in (0.35, 1.2, 3.6)])
        with self.bagian('tanya') as b:
            self.hilang(b, 'Q', 'garis', 'datar', 'tegak')
            self.muncul(b, kurva=kurva)
            self.muncul(b, True, P_label=lp)
            self.tunggu(b, 'banyak garis')
            self.muncul(b, calon=calon)
            self.papan(b, r'\text{satu titik}', r'\text{arah yang mana?}', warna=AKSEN)
        with self.bagian('kurva') as b:
            self.hilang(b, 'calon')
            self.tunggu(b, 'y sama')
            self.papan(b, 'y=f(x)=x^2', r'x\times x')
            b.main(Indicate(kurva, color=TINTA, scale_factor=1), run_time=1)
        with self.bagian('p') as b:
            self.muncul(b, proyeksi_p=projp)
            self.papan(b, 'x_P=1', 'y_P=1^2=1', 'P=(1,1)', warna=AKSEN)
            self.tunggu(b, 'inilah')
            b.main(Indicate(p, scale_factor=1.5, color=AKSEN), run_time=1)
        with self.bagian('q') as b:
            self.muncul(b, Q=q, proyeksi_q=projq)
            self.muncul(b, True, Q_label=lq)
            self.tunggu(b, 'tingginya')
            self.papan(b, 'x_Q=2', 'y_Q=2^2=4', 'Q=(2,4)', warna=AKSEN2)
            self.tunggu(b, 'hubungkan')
            self.muncul(b, garis=sekan, lama=0.6)
        with self.bagian('datar') as b:
            self.hilang(b, 'proyeksi_p', 'proyeksi_q')
            self.muncul(b, datar=datar)
            self.muncul(b, True, langkah=ld)
            self.papan(b, r'\text{langkah mendatar}', '2-1=1', warna=AKSEN2)
        with self.bagian('tegak') as b:
            self.muncul(b, tegak=tegak)
            self.muncul(b, True, kenaikan=lt)
            self.papan(b, r'\text{kenaikan}', '4-1=3', warna=AKSEN2)
        with self.bagian('bagi') as b:
            self.papan(b, r'm=\frac{4-1}{2-1}=\frac31=3', r'\text{garis potong}', warna=AKSEN2)
            self.tunggu(b, 'segitiga')
            b.main(Indicate(VGroup(datar, tegak), color=AKSEN2, scale_factor=1), run_time=1)
        lh = rumus('h', 34, AKSEN2).next_to(datar, DOWN, buff=0.18)
        with self.bagian('h') as b:
            self.hilang(b, 'kenaikan')
            self.tunggu(b, 'langkah mendatar kita')
            self.hilang(b, 'langkah', lama=0.2)
            self.muncul(b, True, langkah=lh, lama=0.5)
            self.papan(b, r'h=\text{selisih mendatar}', warna=AKSEN2)
        with self.bagian('posisi') as b:
            self.papan(b, 'x_P=1', 'x_Q=1+h', warna=AKSEN2)
            self.tunggu(b, 'tinggi titik biru')
            self.papan(b, 'x_Q=1+h', 'y_Q=(1+h)^2', warna=AKSEN2)
        with self.bagian('asal') as b:
            self.papan(b, r'\text{kenaikan}=(1+h)^2-1', warna=AKSEN2)
            self.tunggu(b, 'lalu kita bagi')
            self.papan(b, r'm=\frac{(1+h)^2-1}{h}', r'\text{kenaikan : langkah}', warna=AKSEN2)
        tabel = VGroup(teks('h', 28, REDUP).move_to([2.9, 0.7, 0]),
                       teks('kemiringan', 28, AKSEN2).move_to([5.0, 0.7, 0]))
        baris_tabel = []
        for i, (a, m) in enumerate([('1','3'), ('0{,}5','2{,}5'), ('0{,}1','2{,}1'), ('0{,}01','2{,}01')]):
            row = VGroup(rumus(a, 34, TINTA).move_to([2.9, 0.1-i*0.58, 0]),
                         rumus(m, 34, AKSEN2).move_to([5.0, 0.1-i*0.58, 0]))
            baris_tabel.append(row)
        for i, (seg, hbaru) in enumerate([('setengah',0.5), ('sepersepuluh',0.1), ('seperseratus',0.01)]):
            with self.bagian(seg) as b:
                if i == 0:
                    self.hilang(b, 'datar', 'tegak', 'langkah')
                    self.muncul(b, True, tabel=tabel, angka0=baris_tabel[0])
                b.main(self.h.animate.set_value(hbaru), run_time=2)
                self.tunggu(b, 'kemiringannya')
                self.muncul(b, True, **{f'angka{i+1}':baris_tabel[i+1]})
        with self.bagian('dugaan') as b:
            for row in baris_tabel:
                b.main(Indicate(row, color=AKSEN2, scale_factor=1.06), run_time=0.7)
            self.tunggu(b, 'belum membuktikannya')
            self.papan(b, r'\text{mengapa menuju }2\text{?}', warna=SOROT)

        # Persegi dengan sisi 1+h, sketsa h positif. Ukuran kedua arah sama.
        unit, hv = 2.2, 0.5
        dasar = np.array([-4.8, -1.4, 0])
        def petak(x, y, w, ht, warna):
            r = Rectangle(width=w*unit, height=ht*unit)
            r.move_to(dasar + np.array([(x+w/2)*unit, (y+ht/2)*unit, 0]))
            return r.set_stroke(warna, 2).set_fill(warna, 0.16)
        satu = petak(0,0,1,1,REDUP)
        ha = petak(1,0,hv,1,AKSEN2)
        hb = petak(0,1,1,hv,AKSEN2)
        hh = petak(1,1,hv,hv,SOROT)
        kotak = Rectangle(width=3.3, height=3.3).move_to(dasar+[1.65,1.65,0]).set_stroke(TINTA,2)
        sisi = rumus('1+h',36,TINTA).next_to(kotak,DOWN,buff=0.22)
        sisi2 = rumus('1+h',36,TINTA).next_to(kotak,LEFT,buff=0.22)
        angka_area = [rumus(t,42,c).move_to(r) for t,c,r in [('1',TINTA,satu),('h',AKSEN2,ha),('h',AKSEN2,hb),('h^2',SOROT,hh)]]
        grafik_nama = ['sumbu','kurva','P','Q','garis','P_label','Q_label','x','y']
        with self.bagian('luas') as b:
            self.hilang(b, *grafik_nama, 'tabel', 'angka0','angka1','angka2','angka3', lama=0.5)
            self.muncul(b, persegi=kotak)
            self.muncul(b, True, sisi=sisi, sisi2=sisi2)
            self.papan(b, r'\text{luas persegi}', '(1+h)^2')
        with self.bagian('petak_satu') as b:
            self.muncul(b, satu=satu, ha=ha, hb=hb, hh=hh)
            self.hilang(b,'sisi','sisi2',lama=0.2)
            potongan = VGroup(*[rumus(t,30,TINTA).move_to(dasar+[x,y,0]) for t,x,y in
                                [('1',1.1,-0.3),('h',2.75,-0.3),('1',-0.3,1.1),('h',-0.3,2.75)]])
            self.muncul(b, True, **{f'sisi_potongan{i}':m for i,m in enumerate(potongan)})
            self.tunggu(b,'petak besar')
            self.muncul(b, True, a1=angka_area[0])
            self.papan(b, r'1\times1=1')
        with self.bagian('petak_dua') as b:
            b.main(ha.animate.set_fill(AKSEN2,0.35), hb.animate.set_fill(AKSEN2,0.35), run_time=1)
            self.muncul(b, True, ah1=angka_area[1], ah2=angka_area[2])
            self.tunggu(b,'jadi keduanya')
            self.papan(b, r'1\times h+1\times h', '=h+h=2h', warna=AKSEN2)
        with self.bagian('petak_kecil') as b:
            b.main(hh.animate.set_fill(SOROT,0.35), run_time=0.7)
            self.muncul(b, True, ahh=angka_area[3])
            self.papan(b, r'h\times h=h^2', warna=SOROT)
            self.tunggu(b,'seluruh luasnya')
            self.papan(b, '(1+h)^2', '=1+2h+h^2')
        with self.bagian('kurangi') as b:
            self.tunggu(b,'kurangi tinggi p')
            b.main(satu.animate.set_fill(REDUP,0).set_stroke(REDUP,opacity=0.18), run_time=0.8)
            self.hilang(b,'a1',lama=0.3)
            self.papan(b, '(1+2h+h^2)-1', '=2h+h^2')
        with self.bagian('faktor') as b:
            self.papan(b, r'm=\frac{2h+h^2}{h}')
            self.tunggu(b,'kita keluarkan')
            self.papan(b, r'm=\frac{h(2+h)}{h}', r'h\ne0', warna=AKSEN2)
        with self.bagian('bagi_h') as b:
            self.tunggu(b,'tersisa')
            self.papan(b, 'm=2+h', r'h\ne0', warna=AKSEN2)
            self.hilang(b,'persegi','satu','ha','hb','hh','sisi_potongan0','sisi_potongan1','sisi_potongan2','sisi_potongan3','ah1','ah2','ahh',lama=0.5)
            self.muncul(b,sumbu=sumbu,kurva=kurva,P=p,Q=q,garis=sekan)
            self.muncul(b,True,x=lx,y=ly,P_label=lp,Q_label=lq)
        zero = Dot(cp(1,1), radius=0.11).set_color(AKSEN2)
        with self.bagian('nol') as b:
            self.hilang(b,'garis','Q','Q_label',lama=0.3)
            self.muncul(b,zero=zero)
            self.tunggu(b,'menjadi nol')
            self.papan(b, r'h=0:\quad\frac{1-1}{0}=\frac00', r'\text{tidak terdefinisi}', warna=AKSEN)
        with self.bagian('limit') as b:
            self.hilang(b,'zero')
            self.muncul(b,Q=q,garis=sekan)
            self.muncul(b,True,Q_label=lq)
            self.papan(b, r'h\ne0', 'm=2+h', warna=AKSEN2)
            self.tunggu(b,'nilai yang dituju')
            self.papan(b, r'h\to0', r'2+h\to2', warna=SOROT)
        with self.bagian('kiri') as b:
            self.tunggu(b,'dari kiri')
            self.hilang(b,'Q','garis','Q_label',lama=0.3)
            self.h.set_value(-0.5)
            self.muncul(b,Q=q,garis=sekan)
            self.muncul(b,True,Q_label=lq)
            b.main(self.h.animate.set_value(-0.1),run_time=1.2)
            self.papan(b, 'h=-0{,}1', 'm=2-0{,}1=1{,}9',warna=AKSEN2)
        with self.bagian('kiri_dekat') as b:
            b.main(self.h.animate.set_value(-0.01),run_time=1.5)
            self.papan(b, 'h=-0{,}01', 'm=1{,}99',warna=AKSEN2)
            self.tunggu(b,'dari kiri maupun kanan')
            self.papan(b, r'1{,}99\ \to\ 2\ \leftarrow\ 2{,}01', r'\text{kiri}\qquad\text{kanan}',warna=SOROT)
        tangen = garis(2,SOROT,4)
        with self.bagian('singgung') as b:
            self.muncul(b,tangen=tangen)
            self.hilang(b,'garis','Q','Q_label',lama=0.4)
            self.tunggu(b,'inilah garis singgung')
            self.papan(b, r'\text{garis singgung}', 'm=2',warna=SOROT)
        td = Line(cp(1,1),cp(2,1)).set_stroke(SOROT,3)
        tt = Line(cp(2,1),cp(2,3)).set_stroke(SOROT,3)
        ltd = rumus('1',34,SOROT).next_to(td,DOWN,buff=0.15)
        ltt = rumus('2',34,SOROT).next_to(tt,RIGHT,buff=0.15)
        with self.bagian('arti_dua') as b:
            self.tunggu(b,'satu langkah')
            self.muncul(b,datar_tangen=td)
            self.muncul(b,True,langkah_tangen=ltd)
            self.tunggu(b,'dua langkah')
            self.muncul(b,tegak_tangen=tt)
            self.muncul(b,True,naik_tangen=ltt)
            self.papan(b, r'm=\frac21=2',warna=SOROT)
        with self.bagian('nama') as b:
            self.tunggu(b,'nama turunan')
            self.papan(b, r'\text{turunan di }x=1', r"f'(1)=2",warna=SOROT)
        with self.bagian('umum') as b:
            self.hilang(b,'datar_tangen','tegak_tangen','langkah_tangen','naik_tangen',lama=0.4)
            self.papan(b, r'P=(a,f(a))', r'Q=(a+h,f(a+h))')
            self.tunggu(b,'dibagi selisih')
            self.papan(b, r'\frac{f(a+h)-f(a)}{h}', r'\text{selisih tinggi : selisih }x')
        with self.bagian('syarat') as b:
            self.papan(b, r"f'(a)=\lim_{h\to0}\frac{f(a+h)-f(a)}{h}", r'\text{limit ada dan terhingga}',warna=SOROT)
            self.tunggu(b,'kiri dan kanan')
            b.main(Indicate(tangen,scale_factor=1,color=SOROT),run_time=1)
        with self.bagian('tutup') as b:
            self.papan(b, r'\text{dua titik makin dekat}', r'\text{kemiringan menuju satu nilai}', r'\text{itulah turunan}',warna=SOROT)
            b.main(Indicate(p,scale_factor=1.4,color=AKSEN),run_time=1)
            self.tunggu(b,'angka kemiringan')
            self.papan(b, r"f'(1)=2", r'\text{kemiringannya, bukan garisnya}',warna=SOROT)
        tujuan = AKAR / 'qc' / TOPIK / 'jadwal-render.json'
        tujuan.parent.mkdir(parents=True,exist_ok=True)
        tujuan.write_text(json.dumps(self.jadwal,indent=2),encoding='utf-8')
        tujuan.with_name('isyarat-render.json').write_text(json.dumps(self.isyarat,indent=2),encoding='utf-8')

    @contextmanager
    def bagian(self, ident):
        self.segmen = ident
        mulai = self.time
        with sinema.babak(self,ident,DURASI) as b:
            yield b
            # Frame Manim dibulatkan ke atas. Tutup ke JAM AUDIO mutlak agar
            # satu frame tambahan tidak menumpuk menjadi satu detik di akhir.
            b.terpakai = self.time - KATA[ident]['mulai'] + 1e-7
        hud = {'identitas':self.ident}
        if self.panel is not None:
            hud['rumus'] = self.panel
        qc.periksa_adegan(self, {}, hud=hud, dunia=self.aktif, tulisan=self.tulisan)
        self.jadwal.append({'id':ident,'mulai_audio':KATA[ident]['mulai'],
                            'mulai_video':mulai,'akhir_video':self.time})

    def tunggu(self,b,frasa):
        wanted = [normal(k) for k in frasa.split()]
        words = KATA[self.segmen]['kata']
        normalized = [normal(w['kata']) for w in words]
        for i in range(len(words)-len(wanted)+1):
            if normalized[i:i+len(wanted)] == wanted:
                target = KATA[self.segmen]['mulai'] + words[i]['mulai']
                b.tunggu_sampai(round(target*30)/30)
                self.isyarat.append({'segmen':self.segmen,'kata':frasa,
                                     'audio':target,'video':self.time})
                return
        raise ValueError(f'Kata kunci tidak ditemukan: {self.segmen}: {frasa}')

    def ikuti_h(self, buat):
        """Bangun ulang hanya ketika h berubah, tanpa kerja ulang saat jeda."""
        obj = buat()
        terakhir = [self.h.get_value()]
        def update(mob):
            nilai = self.h.get_value()
            if nilai != terakhir[0]:
                mob.become(buat())
                terakhir[0] = nilai
        obj.add_updater(update)
        return obj

    def muncul(self,b,tulisan=False,lama=0.6,**benda):
        b.main(*[FadeIn(m) for m in benda.values()],run_time=lama)
        (self.tulisan if tulisan else self.aktif).update(benda)

    def hilang(self,b,*nama,lama=0.4):
        objek=[]
        for n in nama:
            m=self.aktif.pop(n,None)
            if m is None:
                m=self.tulisan.pop(n,None)
            if m is not None:
                objek.append(m)
        if objek:
            b.main(*[FadeOut(m) for m in objek],run_time=lama)

    def papan(self,b,*baris,warna=TINTA):
        isi=VGroup(*[sinema.batasi_lebar(rumus(s,36,warna),4.55) for s in baris])
        isi.arrange(DOWN,buff=0.30)
        isi.move_to([4.25,3.30-isi.get_height()/2,0]).fix_in_frame()
        isi._qc_isi=True
        if self.panel is not None:
            b.main(FadeOut(self.panel),run_time=0.2)
        b.main(FadeIn(isi,shift=0.1*UP),run_time=0.5)
        self.panel=isi
