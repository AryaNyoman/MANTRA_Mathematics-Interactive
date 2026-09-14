"""Video 03 topik TURUNAN, Materi 07 "Fungsi di dalam fungsi, aturan rantai":
Aturan Menurunkan, Bagian 3.
STANDAR VIDEO v3.1, ditulis ulang MASTER 12 Sep 2026 dari adegan lama yang
sudah disetujui ARYA. DUNIANYA SAMA: jabaran (2x - 5)^8 yang tidak selesai;
dua mesin berderet u = 3x dan y = 5u; tiga batang perubahan satu skala (tiga
batang x mengisi batang u, lima batang u mengisi batang y, lima belas batang x
mengisi batang y, jadi DIKALIKAN); pengali yang ikut berubah; pembuktian
aljabar (x^2 + 1)^2 dimorph di tempat sampai 2(x^2 + 1) kali 2x; aturannya;
dipakai pada (2x - 5)^8 memberi 16(2x - 5)^7.

YANG BERBEDA: pembuka sub-bab plus Bagian 3 dengan pertanyaan halaman;
segar-ingat Bagian 1 (aturan pangkat suku demi suku); bentuk umum Leibniz
dy/dx = dy/du kali du/dx tampil besar lalu masuk panel; babak "keliru"
(pengali 2 tertinggal); rangkuman dengan pertanyaan; penutup menunjuk Bagian
4; tiap kejadian dipicu pada KATA (`sinema.JamKata`).

Alasan batang (bukan garis bilangan), mesin lurus, dan satu warna satu makna
diwarisi dari adegan lama: TINTA x dan yang masuk; AKSEN2 biru u; AKSEN
merah y; SOROT ungu pengali dan aturan; REDUP jabaran yang ditinggalkan.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "turunan7-aturan-rantai"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

# TATA LETAK BATANG (diukur, diwarisi): ketiganya berangkat dari tepi kiri yang
# sama; skala dari batang terpanjang (15 satuan x 0,53 = 7,95, selebar ruang
# kerja di kiri panel).
KIRI = -4.0
SKALA = 0.53
TINGGI_BATANG = 0.30
Y_X, Y_U, Y_Y = 1.15, -0.05, -1.25
DALAM, LUAR = 3, 5          # u = 3x, y = 5u


def batang(panjang, y, warna, isian=0.80):
    lebar = panjang * SKALA
    r = Rectangle(width=lebar, height=TINGGI_BATANG)
    r.set_fill(warna, opacity=isian).set_stroke(warna, width=1.6)
    r.move_to([KIRI + lebar / 2, y, 0])
    return r


def petak(panjang, indeks, y, warna, tebal=2.4):
    """Petak isian ke-`indeks` selebar `panjang` satuan, hanya bergaris: yang
    harus terbaca adalah BATAS antarpetak, dari situ penonton menghitung."""
    lebar = panjang * SKALA
    r = Rectangle(width=lebar, height=TINGGI_BATANG)
    r.set_fill(warna, opacity=0.0).set_stroke(warna, width=tebal)
    r.move_to([KIRI + lebar * (indeks + 0.5), y, 0])
    return r


def nama_batang(kalimat, y, warna):
    t = sinema.label(kalimat, warna=warna)
    t.next_to([KIRI, y, 0], LEFT, buff=0.28)
    return t


def kotak_mesin(isi, pusat, warna):
    r = rumus(isi, 30, warna)
    kotak = Rectangle(width=r.get_width() + 0.55, height=r.get_height() + 0.50)
    kotak.set_stroke(warna, width=2.2).set_fill(LATAR, opacity=1.0)
    kotak.move_to(pusat)
    r.move_to(pusat)
    return VGroup(kotak, r)


class TurunanAturanRantai(AdeganMatra):
    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True)
        ident = None

        def hud():
            isi = {}
            if ident is not None:
                isi["identitas"] = ident
            papan_isi = papan.semua()
            if papan_isi is not None:
                isi["papan"] = papan_isi
            return isi

        def nyala(*mobs, warna=SOROT):
            return [Indicate(m, color=warna, scale_factor=1.0) for m in mobs]

        def kosongkan(b, run_time=0.4):
            if not papan.baris_lain:
                return
            anim = [FadeOut(m) for m in papan.baris_lain]
            papan.baris_lain = []
            b.main(*anim, run_time=run_time)
            papan.perbarui_alas()

        # ================= buka: sub-bab, lalu pertanyaannya ============= #
        t_rantai = rumus(r"y = f(u),\ \ u = g(x)", 40, TINTA).move_to([0, 0.6, 0])
        t_tanya = rumus(r"\frac{dy}{dx} = \ ?", 40, AKSEN).move_to([0, -0.9, 0])
        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            b.tunggu_kata("Aturan")
            sinema.judul_pembuka(self, "Aturan Menurunkan, Bagian 3", lama=2.7, y=2.4)  # irama Bian (14 Sep 2026)
            b.catat(2.7)
            b.tunggu_kata("Kalau y")
            b.main(FadeIn(t_rantai, shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("seberapa cepat")
            b.main(FadeIn(t_tanya, shift=UP * 0.2), run_time=0.8)
        qc.periksa_adegan(self, {"rantai": t_rantai, "tanya": t_tanya}, hud=hud())

        # ================= ingat: aturan pangkat, jabarkan dulu ========== #
        pangkat = rumus(r"(x^n)' = n\,x^{n-1}", 46, TINTA).move_to([0, 0.6, 0])
        l_jabar = sinema.label("jabarkan dulu", warna=REDUP).move_to([0, -0.9, 0])
        with sinema.babak(self, "ingat", DURASI, kata=KATA) as b:
            # Pertanyaan pembuka tetap tampil sampai aturan pangkat ditulis:
            # dibuang di awal babak menyisakan 4 detik layar kosong (12 Sep 2026).
            b.tunggu_kata("aturan pangkat")
            b.main(FadeOut(t_rantai), FadeOut(t_tanya), Write(pangkat), run_time=1.0)
            b.tunggu_kata("jabarkan dulu")
            b.main(FadeIn(l_jabar, shift=UP * 0.2), run_time=0.6)
        qc.periksa_adegan(self, {"pangkat": pangkat}, hud=hud(), tulisan={"jabarkan": l_jabar})

        # ================= masalah: jabaran yang tidak selesai =========== #
        soal = rumus(r"(2x-5)^8", 52, TINTA).move_to([0, 0.9, 0])
        jabar = rumus(r"256x^8 - 5120x^7 + 44800x^6 - \dots", 30, REDUP).move_to([0, -0.4, 0])
        sinema.batasi_lebar(jabar, 9.0)
        with sinema.babak(self, "masalah", DURASI, kata=KATA) as b:
            b.tunggu_kata("Untuk")
            b.main(FadeOut(pangkat), FadeOut(l_jabar), run_time=0.4)
            b.main(Write(soal), run_time=1.0)
            b.tunggu_kata("kesabaran")
            # Jabarannya ditulis PELAN dengan sengaja: penonton ikut merasakan
            # lamanya, lalu jabarannya menyerah.
            b.main(Write(jabar), run_time=2.4)
            b.main(FadeOut(jabar), run_time=0.6)
        qc.periksa_adegan(self, {"soal": soal}, hud=hud())

        # ================= mesin: dua kotak berderet ===================== #
        m_dalam = kotak_mesin(r"u = 3x", [-1.5, -1.1, 0], AKSEN2)
        m_luar = kotak_mesin(r"y = 5u", [1.9, -1.1, 0], AKSEN)
        l_x = rumus("x", 32, TINTA).next_to(m_dalam, LEFT, buff=0.55)
        l_u = rumus("u", 32, AKSEN2).move_to([0.2, -1.1, 0])
        l_y = rumus("y", 32, AKSEN).next_to(m_luar, RIGHT, buff=0.55)
        panah1 = Arrow(l_x.get_right(), m_dalam.get_left(), buff=0.12, thickness=2.4).set_color(REDUP)
        panah2 = Arrow(m_dalam.get_right(), l_u.get_left(), buff=0.12, thickness=2.4).set_color(REDUP)
        panah3 = Arrow(l_u.get_right(), m_luar.get_left(), buff=0.12, thickness=2.4).set_color(REDUP)
        panah4 = Arrow(m_luar.get_right(), l_y.get_left(), buff=0.12, thickness=2.4).set_color(REDUP)
        rantai = VGroup(l_x, panah1, m_dalam, panah2, l_u, panah3, m_luar, panah4, l_y)
        with sinema.babak(self, "mesin", DURASI, kata=KATA) as b:
            b.tunggu_kata("dua mesin")
            b.main(FadeIn(m_dalam), FadeIn(m_luar), run_time=0.8)
            b.tunggu_kata("Angka x")
            b.main(FadeIn(l_x), GrowArrow(panah1), run_time=0.8)
            b.tunggu_kata("mesin pertama")
            b.main(*nyala(m_dalam, warna=AKSEN2), run_time=0.7)
            b.tunggu_kata("sebut u")
            b.main(GrowArrow(panah2), FadeIn(l_u), run_time=0.8)
            b.tunggu_kata("mesin kedua")
            b.main(GrowArrow(panah3), *nyala(m_luar, warna=AKSEN), run_time=0.8)
            b.tunggu_kata("keluar")
            b.main(GrowArrow(panah4), FadeIn(l_y), run_time=0.8)
        qc.periksa_adegan(self, {"soal": soal, "rantai": rantai}, hud=hud())

        # ================= batang: tiga panjang, satu skala ============== #
        b_x = batang(1, Y_X, TINTA)
        b_u = batang(DALAM, Y_U, AKSEN2)
        b_y = batang(DALAM * LUAR, Y_Y, AKSEN)
        n_x = nama_batang("perubahan x", Y_X, TINTA)
        n_u = nama_batang("perubahan u", Y_U, AKSEN2)
        n_y = nama_batang("perubahan y", Y_Y, AKSEN)
        with sinema.babak(self, "batang", DURASI, kata=KATA) as b:
            b.tunggu_kata("sebagai batang")
            b.main(FadeOut(soal), FadeOut(rantai), run_time=0.5)
            b.main(FadeIn(n_x), GrowFromEdge(b_x, LEFT), run_time=0.9)
            b.tunggu_kata("satu skala")
            ident = sinema.identitas(self, "semua batang satu skala")
            ident.set_opacity(0)
            b.main(ident.animate.set_opacity(1), run_time=0.5)
            b.tunggu_kata("u sama dengan")
            b.main(FadeIn(n_u), GrowFromEdge(b_u, LEFT), run_time=0.9)
            papan.baris(r"u = 3x", warna=AKSEN2, b=b)
            b.tunggu_kata("y sama dengan")
            b.main(FadeIn(n_y), GrowFromEdge(b_y, LEFT), run_time=1.0)
            papan.baris(r"y = 5u", warna=AKSEN, b=b)
        qc.periksa_adegan(self, {"batang x": b_x, "batang u": b_u, "batang y": b_y}, hud=hud(),
                          tulisan={"nama x": n_x, "nama u": n_u, "nama y": n_y})

        # ================= tiga: batang u terisi tiga batang x =========== #
        isi_u = VGroup(*[petak(1, i, Y_U, TINTA) for i in range(DALAM)])
        kali3 = rumus(r"\times 3", 30, SOROT).next_to(b_u, RIGHT, buff=0.35)
        with sinema.babak(self, "tiga", DURASI, kata=KATA) as b:
            b.tunggu_kata("Satu langkah")
            b.main(*nyala(b_x, warna=TINTA), run_time=0.6)
            b.tunggu_kata("diisi tepat")
            b.main(LaggedStartMap(FadeIn, isi_u, lag_ratio=0.4), run_time=1.5)
            b.tunggu_kata("mengalikan tiga")
            b.main(FadeIn(kali3, shift=LEFT * 0.2), run_time=0.6)
            b.main(*nyala(b_u, warna=AKSEN2), run_time=0.8)
        qc.periksa_adegan(self, {"batang x": b_x, "batang u": b_u, "batang y": b_y, "isi u": isi_u}, hud=hud(),
                          tulisan={"nama x": n_x, "nama u": n_u, "nama y": n_y, "kali 3": kali3})

        # ================= lima: batang y terisi lima batang u =========== #
        isi_y = VGroup(*[petak(DALAM, i, Y_Y, AKSEN2) for i in range(LUAR)])
        kali5 = rumus(r"\times 5", 30, SOROT).next_to(b_y, RIGHT, buff=0.35)
        with sinema.babak(self, "lima", DURASI, kata=KATA) as b:
            b.tunggu_kata("diisi tepat")
            b.main(LaggedStartMap(FadeIn, isi_y, lag_ratio=0.3), run_time=1.4)
            b.tunggu_kata("mengalikan lima")
            b.main(FadeIn(kali5, shift=LEFT * 0.2), run_time=0.6)
            b.main(*nyala(b_y, warna=AKSEN), run_time=0.8)
        qc.periksa_adegan(self, {"batang x": b_x, "batang u": b_u, "batang y": b_y, "isi u": isi_u, "isi y": isi_y},
                          hud=hud(), tulisan={"nama x": n_x, "nama u": n_u, "nama y": n_y, "kali 3": kali3,
                                              "kali 5": kali5})

        # ================= kali: tiap petak u dibelah tiga =============== #
        # Lima petak yang sudah ada dibelah tiga di tempatnya, satu per satu
        # dari kiri, supaya 15 terlihat lahir dari 5 kali 3.
        halus = VGroup(*[petak(1, i, Y_Y, TINTA, tebal=1.5) for i in range(DALAM * LUAR)])
        with sinema.babak(self, "kali", DURASI, kata=KATA) as b:
            b.tunggu_kata("berapa batang")
            b.main(*nyala(b_x, warna=TINTA), run_time=0.6)
            b.tunggu_kata("Lima belas")
            b.main(LaggedStartMap(FadeIn, halus, lag_ratio=0.3), run_time=1.3)  # irama Bian (14 Sep 2026)
            b.tunggu_kata("Bukan delapan")
            papan.baris(r"\text{bukan } 3 + 5", warna=REDUP, b=b)
            b.tunggu_kata("dikalikan")
            papan.baris(r"3 \times 5 = 15", warna=SOROT, b=b)
            b.tunggu_kata("bukan dijumlahkan")
            b.main(LaggedStartMap(lambda m, **kw: Indicate(m, color=SOROT, **kw), halus, lag_ratio=0.15),
                   run_time=1.5)
        qc.periksa_adegan(self, {"batang y": b_y, "isi y": isi_y, "petak halus": halus}, hud=hud(),
                          tulisan={"nama x": n_x, "nama u": n_u, "nama y": n_y, "kali 3": kali3, "kali 5": kali5})

        # ================= berubah: pengali biasanya tidak tetap ========= #
        catatan = sinema.label("pengali berubah", warna=SOROT).move_to([0.8, Y_X, 0])
        with sinema.babak(self, "berubah", DURASI, kata=KATA) as b:
            b.tunggu_kata("lurus")
            b.main(FadeOut(isi_u), FadeOut(isi_y), FadeOut(halus), FadeOut(kali3), FadeOut(kali5), run_time=0.6)
            b.tunggu_kata("ikut berubah")
            b.main(Transform(b_u, batang(2, Y_U, AKSEN2)), Transform(b_y, batang(2 * 4, Y_Y, AKSEN)), run_time=1.2)
            b.main(Transform(b_u, batang(4, Y_U, AKSEN2)), Transform(b_y, batang(4 * 3, Y_Y, AKSEN)), run_time=1.2)
            b.tunggu_kata("berlaku umum")
            b.main(FadeIn(catatan, scale=0.9), run_time=0.6)
            b.main(*nyala(catatan), run_time=0.8)
        qc.periksa_adegan(self, {"batang x": b_x, "batang u": b_u, "batang y": b_y}, hud=hud(),
                          tulisan={"nama x": n_x, "nama u": n_u, "nama y": n_y, "catatan": catatan})

        # ================= mudah: satu pembuktian, dimorph di tempat ===== #
        kerja = rumus(r"(x^2+1)^2", 44, TINTA).move_to([-1.0, 0.3, 0])
        with sinema.babak(self, "mudah", DURASI, kata=KATA) as b:
            b.tunggu_kata("Dari mana")
            kosongkan(b)
            # Batangnya dibuang BERSAMAAN dengan rumus contohnya ditulis, supaya
            # layar kerja tidak kosong 4 detik (tertangkap 12 Sep 2026).
            b.tunggu_kata("Kita ambil")
            b.main(FadeOut(b_x), FadeOut(b_u), FadeOut(b_y), FadeOut(n_x), FadeOut(n_u), FadeOut(n_y),
                   FadeOut(catatan), Write(kerja), run_time=1.2)
            b.tunggu_kata("Jabarannya")
            kerja = sinema.ganti_rumus(self, kerja, r"(x^2+1)^2 = x^4 + 2x^2 + 1", b=b, run_time=1.2)
            sinema.batasi_lebar(kerja, 8.4)
        qc.periksa_adegan(self, {"kerja": kerja}, hud=hud())

        with sinema.babak(self, "turunkan", DURASI, kata=KATA) as b:
            b.tunggu_kata("aturan pangkat")
            b.main(*nyala(kerja, warna=TINTA), run_time=0.8)
            b.tunggu_kata("Hasilnya")
            kerja = sinema.ganti_rumus(self, kerja, r"4x^3 + 4x", b=b, run_time=1.2)
        qc.periksa_adegan(self, {"kerja": kerja}, hud=hud())

        with sinema.babak(self, "faktor", DURASI, kata=KATA) as b:
            b.tunggu_kata("difaktorkan")
            kerja = sinema.ganti_rumus(self, kerja, r"4x(x^2+1)", b=b, run_time=1.2)
            b.tunggu_kata("Bentuk di")
            dalam = kerja.get_part_by_tex(r"(x^2+1)")
            kotak = sinema.sorot_bagian(self, kerja, dalam, warna=AKSEN2)
            b.catat(0.8)
            b.main(Indicate(dalam, color=AKSEN2), run_time=0.7)
            sinema.lepas_sorot(self, kerja, kotak)
            b.catat(0.6)
        qc.periksa_adegan(self, {"kerja": kerja}, hud=hud())

        with sinema.babak(self, "pola", DURASI, kata=KATA) as b:
            b.tunggu_kata("Ditulis ulang")
            kerja = sinema.ganti_rumus(self, kerja, r"2(x^2+1)\cdot 2x", b=b, run_time=1.2)
            b.tunggu_kata("Ruas kiri")
            kiri = kerja.get_part_by_tex(r"2(x^2+1)")
            kotak = sinema.sorot_bagian(self, kerja, kiri, warna=TINTA)
            b.catat(0.8)
            b.main(Indicate(kiri, color=TINTA), run_time=0.7)
            sinema.lepas_sorot(self, kerja, kotak)
            b.catat(0.6)
            b.tunggu_kata("dua x di")
            ekor = kerja.get_part_by_tex(r"2x")
            kotak = sinema.sorot_bagian(self, kerja, ekor, warna=SOROT)
            b.catat(0.8)
            b.main(Indicate(ekor, color=SOROT), run_time=0.7)
            papan.baris(r"2x = (x^2+1)'", warna=SOROT, b=b)
            sinema.lepas_sorot(self, kerja, kotak)
            b.catat(0.6)
        qc.periksa_adegan(self, {"kerja": kerja}, hud=hud())

        # ================= aturan: kata-kata, lalu bentuk umum Leibniz === #
        kata_aturan = rumus(r"\big(f(u)\big)' = f'(u) \cdot u'", 46, SOROT).move_to([-1.0, 0.9, 0])
        sinema.batasi_lebar(kata_aturan, 8.4)
        aturan = rumus(r"\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}", 54, SOROT).move_to([-1.0, -0.9, 0])
        sinema.batasi_lebar(aturan, 8.4)
        with sinema.babak(self, "aturan", DURASI, kata=KATA) as b:
            b.tunggu_kata("Itulah")
            b.main(FadeOut(kerja), run_time=0.5)
            b.tunggu_kata("Turunkan bagian")
            b.main(Write(kata_aturan), run_time=1.6)
            b.tunggu_kata("kalikan dengan")
            b.main(*nyala(kata_aturan), run_time=0.8)
            b.tunggu_kata("Leibniz")
            b.main(Write(aturan), run_time=1.4)
            b.tunggu_kata("kali du")
            papan.baris(r"dy/dx = dy/du \cdot du/dx", warna=SOROT, b=b)
        qc.periksa_adegan(self, {"kata aturan": kata_aturan, "aturan": aturan}, hud=hud())

        # ================= pakai: kembali ke soal yang ditinggalkan ====== #
        balik = rumus(r"(2x-5)^8", 48, TINTA).move_to([-1.0, 0.9, 0])
        bagian = rumus(r"u = 2x-5,\ \ u' = 2", 32, AKSEN2).move_to([-1.0, -0.6, 0])
        luar = rumus(r"u^8 \to 8u^7", 32, AKSEN).move_to([-1.0, -1.5, 0])
        with sinema.babak(self, "pakai", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kembali")
            b.main(FadeOut(kata_aturan), FadeOut(aturan), run_time=0.5)
            b.tunggu_kata("tinggalkan")
            b.main(Write(balik), run_time=1.0)
            b.tunggu_kata("Bagian dalamnya")
            b.main(FadeIn(bagian, shift=UP * 0.25), run_time=0.7)
            b.tunggu_kata("turunannya dua")
            b.main(*nyala(bagian, warna=AKSEN2), run_time=0.8)
            b.tunggu_kata("Bagian luarnya")
            b.main(FadeIn(luar, shift=UP * 0.25), run_time=0.7)
        qc.periksa_adegan(self, {"balik": balik, "bagian": bagian, "luar": luar}, hud=hud())

        # ================= hasil ========================================= #
        with sinema.babak(self, "hasil", DURASI, kata=KATA) as b:
            b.tunggu_kata("Turunkan luarnya")
            balik = sinema.ganti_rumus(self, balik, r"8(2x-5)^7\cdot 2", b=b, run_time=1.2)
            b.tunggu_kata("kalikan dua")
            b.main(*nyala(balik, warna=TINTA), run_time=0.8)
            b.tunggu_kata("Hasilnya")
            balik = sinema.ganti_rumus(self, balik, r"16(2x-5)^7", b=b, run_time=1.2, warna=AKSEN)
            b.tunggu_kata("Tanpa")
            papan.baris(r"16(2x-5)^7", warna=AKSEN, b=b)
        qc.periksa_adegan(self, {"hasil": balik, "bagian": bagian, "luar": luar}, hud=hud())

        # ================= keliru: pengali 2 tertinggal ================== #
        salah = rumus(r"8(2x-5)^7", 40, REDUP).move_to([-1.0, -0.8, 0])
        with sinema.babak(self, "keliru", DURASI, kata=KATA) as b:
            b.tunggu_kata("Kekeliruan")
            b.main(FadeOut(bagian), FadeOut(luar), run_time=0.5)
            b.tunggu_kata("Delapan kali")
            b.main(Write(salah), run_time=1.0)
            b.tunggu_kata("berhenti")
            b.main(*nyala(salah, warna=AKSEN), run_time=0.8)
            b.tunggu_kata("Pengali dua")
            salah = sinema.ganti_rumus(self, salah, r"8(2x-5)^7 \cdot 2", b=b, run_time=1.0, warna=AKSEN)
            b.tunggu_kata("separuh")
            b.main(*nyala(balik, warna=AKSEN), run_time=0.8)
        qc.periksa_adegan(self, {"hasil": balik, "salah": salah}, hud=hud())

        # ================= rangkum: satu kalimat, satu pertanyaan ======== #
        soal_akhir = rumus(r"u = x,\ u' = 1:\ \ n\,x^{n-1} \cdot 1 = \ ?", 40, AKSEN).move_to([-1.0, 0.3, 0])
        sinema.batasi_lebar(soal_akhir, 8.4)
        with sinema.babak(self, "rangkum", DURASI, kata=KATA) as b:
            b.tunggu_kata("Rangkumannya")
            b.main(FadeOut(salah), run_time=0.5)
            b.tunggu_kata("tingkat demi")
            b.main(papan.sorot(), run_time=0.9)
            b.tunggu_kata("cuma x")
            b.main(FadeOut(balik), FadeIn(soal_akhir, scale=0.9), run_time=0.8)
            b.tunggu_kata("aturan pangkat")
            b.main(*nyala(soal_akhir, warna=AKSEN), run_time=0.8)
        qc.periksa_adegan(self, {"soal akhir": soal_akhir}, hud=hud())

        # ================= lanjut: Bagian 4, sinus kosinus e^x =========== #
        judul_lanjut = teks("Aturan Menurunkan, Bagian 4", 30, SOROT).move_to([0, 2.9, 0]).fix_in_frame()
        tiga_fungsi = rumus(r"\sin x,\ \ \cos x,\ \ e^x", 44, TINTA).move_to([0, 0.5, 0])
        tanya_akhir = rumus(r"(\sin x)' = \ ?", 40, AKSEN).move_to([0, -0.9, 0])
        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("Di materi")
            b.main(FadeOut(soal_akhir), FadeOut(papan.semua()), run_time=0.5)
            self.remove(*papan.semua())
            papan = sinema.PapanRumus(self, ukuran=30, alas=True)
            self.hud_tambah(judul_lanjut)
            self.remove(judul_lanjut)
            b.tunggu_kata("Aturan")
            b.main(FadeIn(judul_lanjut, shift=0.2 * UP), run_time=0.7)
            b.tunggu_kata("sinus")
            b.main(FadeIn(tiga_fungsi, shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("Dari mana")
            b.main(FadeIn(tanya_akhir, shift=UP * 0.2), run_time=0.8)
        qc.periksa_adegan(self, {"tiga fungsi": tiga_fungsi, "tanya": tanya_akhir},
                          hud={"identitas": ident, "judul": judul_lanjut})

        sinema.laporkan_pemicu(self)
