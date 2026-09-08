"""Video Integral Materi 09: luas daerah, termasuk yang di bawah sumbu.

    manimgl manim/scenes/integral09_luas_daerah.py IntegralLuasDaerah -w -l

Menurut rancangan inilah kekeliruan yang paling sering dilakukan siswa: luas
dijawab langsung dengan hasil integralnya. BUKAN video bernomor tahap terkecil,
jadi tanpa pembuka 3D.

SATU BIDANG SEPANJANG VIDEO, jadi tidak ada pergantian bidang dan tidak ada
pergantian identitas. Itu disengaja sesudah video 01: menukar dua bidang di
tempat yang sama membuat dua sistem koordinat bertumpuk selama tiga detik, dan
tidak ada gerbang yang menangkapnya sebab `periksa_adegan` cuma berjalan di
ujung babak.

ANGKA
Diperiksa sympy lewat `alat/klaim-video-integral09.json`, 10 dari 10 lolos, dan
alatnya dibuktikan menolak 10 versi yang sengaja dirusak. Akar 0 dan 4 dicari
`solveset` SENDIRI (bukan diambil dari klaim), integral 0 sampai 4 = -32/3,
4 sampai 6 = 32/3, 0 sampai 6 = 0, dan luasnya 64/3 dengan alatnya memecah
sendiri di titik potong. Contoh amannya x akar(x^2+5) pada [0, 2], di mana
luas dan integral tentunya memang SAMA.

WARNA, sama dengan widget `luas-dua-daerah` di halaman Materi 09
AKSEN2 biru = daerah DI ATAS sumbu. AKSEN merah = daerah DI BAWAH sumbu.
SOROT ungu = jawaban dan kesimpulan.

Skala mendatar dan tegak tidak sama (x 6,4 satuan, y 18,5), dan di video ini
itu TIDAK menimbulkan masalah: seluruh isinya perbandingan LUAS, dan dua luas
yang sama tetap terlihat sama di bawah penskalaan apa pun. Tidak ada satu pun
klaim kemiringan di sini.

Alur berkas: naskah -> buat_narasi.py -> buat_subtitle.py -> adegan ini ->
gabung_audio.py integral09-luas-daerah IntegralLuasDaerah --uji.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "integral09-luas-daerah"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

A, B = 0.0, 6.0        # selang yang dibahas
POTONG = 4.0           # titik potong di dalam selang


def f(x):
    """Kurva contoh utama. Dipilih halaman Materi 09 karena integralnya NOL
    pada [0, 6] sementara luasnya jelas bukan nol."""
    return x * x - 4.0 * x


def bidang():
    """Sumbu tunggal video ini. Batas bawah kedua sumbu kelipatan langkahnya."""
    s = Axes(
        x_range=(0, 6.4, 1), y_range=(-6, 12.5, 3), width=9.2, height=4.4,
        axis_config=dict(stroke_color=REDUP, stroke_width=2.4),
    )
    s.move_to([0.2, 0.1, 0])
    angka = s.add_coordinate_labels(font_size=22, num_decimal_places=0)
    angka.set_color(TINTA).set_opacity(0.75)
    s.angka = angka          # supaya gerbang tulisan lawan angka sumbu berlaku
    s.latar = True
    return s


def kurva(sumbu, fungsi, a, b, warna=TINTA, tebal=3.8):
    """Kurva digambar dari titik yang DIHITUNG, bukan digambar tangan."""
    return ParametricCurve(
        lambda t: sumbu.c2p(t, fungsi(t)), t_range=(a, b, (b - a) / 240.0)
    ).set_stroke(warna, tebal)


# Daerah TIDAK PERNAH disorot dengan `Indicate` di video ini, melainkan dengan
# menaikkan kelegapannya dari 0,32 ke 0,62 lalu mengembalikannya. Dua sebabnya:
#
# 1. `Indicate` bawaan MEMBESARKAN 1,2 kali. Untuk tulisan itu bagus, tetapi
#    seluruh isi video ini tentang LETAK dan BESAR daerah: pada frame detik 65
#    render keempat, daerah birunya membesar sampai ke tepi bidang, seolah
#    selangnya lebih panjang daripada 6. Gambar yang sekejap membantah angkanya.
# 2. Sorotan warna saja tidak cukup pada isian setengah tembus pandang. Pada
#    kelegapan 0,32 di atas kertas, merah bata dan ungu tua sama-sama menyusut
#    jadi sekitar 204 dan 196 pada skala kelabu: selisih 8, di bawah ambang 12
#    alat ukur diam. Menaikkan kelegapan ke 0,62 memberi sekitar 166, selisih 38.
#
# Ditulis sebagai DUA `b.main` berturut-turut, bukan fungsi pembantu, supaya
# `alat/cek_waktu_adegan.py` tetap bisa membaca waktunya; pembantu yang
# memanggil `b.main` di dalamnya tidak terbaca alat itu.
def daerah(sumbu, fungsi, a, b, warna, opacity=0.32, langkah=90):
    """Daerah antara kurva dan sumbu x, dari a sampai b.

    Dipakai untuk bagian di ATAS maupun di BAWAH sumbu: bentuknya dibangun dari
    nilai fungsinya sendiri, jadi bagian yang negatif otomatis tergambar di
    bawah sumbu tanpa perlakuan khusus.
    """
    titik = [sumbu.c2p(a + (b - a) * i / langkah, fungsi(a + (b - a) * i / langkah))
             for i in range(langkah + 1)]
    titik += [sumbu.c2p(b, 0), sumbu.c2p(a, 0)]
    return Polygon(*titik).set_fill(warna, opacity).set_stroke(warna, 1.6)


def bersihkan_panel(scene, papan_rumus, buang, b=None, run_time=0.9):
    """Buang beberapa baris panel sekaligus, lalu rapatkan sisanya.

    Salinan keempat dari pembantu yang sama (video 05, 01, 07). Sudah tercatat
    sebagai usulan untuk `gl/sinema.py`; MASTER mengumpulkan usulan sinema jadi
    satu perubahan, jadi untuk sementara ia tinggal di adegan.
    """
    buang = [m for m in buang if m is not None]
    if not buang:
        return
    scene.play(*[FadeOut(m) for m in buang], run_time=run_time)
    for m in buang:
        if m in papan_rumus.baris_lain:
            papan_rumus.baris_lain.remove(m)
        scene.remove(m)
    for i, m in enumerate(papan_rumus.baris_lain):
        papan_rumus.tempat_baris(m, i)
    papan_rumus.perbarui_alas()
    if b is not None:
        b.catat(run_time)


class IntegralLuasDaerah(AdeganMatra):
    def construct(self):
        frame = self.frame
        panel = sinema.PapanRumus(self, ukuran=30, alas=True)
        jam = sinema.jam_subtitle(TOPIK)

        # ---------------------------------------------------------------
        # buka: kartu judul saja, sama dengan kalimat yang diucapkan.
        # ---------------------------------------------------------------
        with sinema.babak(self, "buka", DURASI) as b:
            lama = max(2.4, DURASI["buka"] - 0.8)
            sinema.judul_pembuka(self, "Materi 09: luas daerah di bawah sumbu",
                                 lama=lama)
            b.catat(lama)

        sumbu = bidang()
        # `sisa_kanan` 3,6 dan bukan 1,8 seperti video 01: panel video ini
        # memuat LIMA baris di babak akhir, jadi tepi kirinya menjorok jauh
        # lebih ke dalam. 1,8 ditolak qc dengan irisan 0,73 satuan, 2,4 masih
        # ditolak dengan 0,17. Pada 3,6 yang mengikat berpindah ke LEBAR, jadi
        # gambarnya mengecil sedikit (68 persen lebar layar, bukan 73) dan
        # tepinya bersih dengan jarak 0,74 satuan. Menukar lima persen lebar
        # dengan kepastian lebih murah daripada satu render lagi.
        pusat, tinggi_kam = kamera.muat_datar(sumbu, sisa_atas=0.30, sisa_kanan=3.6)
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=pusat, tinggi=tinggi_kam)
        k = kurva(sumbu, f, A, B)

        # ---------------------------------------------------------------
        # masalah: kurvanya digambar, dan ia jelas memotong sumbu.
        # ---------------------------------------------------------------
        with sinema.babak(self, "masalah", DURASI) as b:
            b.main(FadeIn(sumbu), run_time=2.0)
            # Identitas lewat `teks()` (TexText, MODE TEKS), bukan `rumus()`.
            # "x^2" di mode teks memberi "Missing $ inserted" dan render mati:
            # `teks()` meloloskan % & # _ $ tetapi TIDAK meloloskan ^.
            ident = sinema.identitas(self, "mendatar x, tegak f(x)")
            b.main(ShowCreation(k), run_time=4.6)
            rum = sinema.lahir_rumus(self, r"f(x) = x^2 - 4x",
                                     dekat=sumbu.c2p(5.4, f(5.4)), papan=panel,
                                     b=b, warna=TINTA)
        qc.periksa_adegan(self, {"kurva": k},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"sumbu": sumbu})

        # ---------------------------------------------------------------
        # potong: dua titik potong dicari, dan di situ kurva berpindah sisi.
        # ---------------------------------------------------------------
        akar0 = Dot(sumbu.c2p(0, 0), radius=0.085).set_color(SOROT)
        akar4 = Dot(sumbu.c2p(POTONG, 0), radius=0.085).set_color(SOROT)
        l_akar0 = rumus("0", 28, SOROT).next_to(akar0, UL, buff=0.10)
        l_akar4 = rumus("4", 28, SOROT).next_to(akar4, UR, buff=0.10)
        with sinema.babak(self, "potong", DURASI) as b:
            # Baris panel SENGAJA pendek. Render kedua ditolak qc dengan "papan
            # menindih sumbu, irisan 0,73 x 0,28 satuan layar", dan penyebabnya
            # baris panel yang panjang, bukan gambarnya yang kelebaran. Panel
            # MANTRA dirancang untuk potongan pendek satu baris; baris panjang
            # bukan cuma menabrak sumbu, ia juga disusutkan `batasi_lebar`
            # sampai sulit dibaca.
            b_akar = panel.baris(r"f = 0:\ x = 0,\ 4", warna=SOROT, b=b)
            b.main(FadeIn(akar0, scale=0.4), FadeIn(l_akar0), run_time=1.6)
            b.main(FadeIn(akar4, scale=0.4), FadeIn(l_akar4), run_time=1.6)
            b.tunggu_sampai(sinema.mulai(jam, "Di situ kurvanya berpindah"))
            b.main(Indicate(akar4, color=AKSEN, scale_factor=2.0), run_time=1.8)
            b.main(Indicate(b_akar, color=AKSEN), run_time=1.8)
        qc.periksa_adegan(self, {"label akar 0": l_akar0, "label akar 4": l_akar4},
                          [("label akar 0", "label akar 4")],
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"sumbu": sumbu})

        # ---------------------------------------------------------------
        # warna: bagian bawah MERAH, bagian atas BIRU. Warna widgetnya.
        # ---------------------------------------------------------------
        merah = daerah(sumbu, f, A, POTONG, AKSEN)
        biru = daerah(sumbu, f, POTONG, B, AKSEN2)
        with sinema.babak(self, "warna", DURASI) as b:
            b.main(FadeIn(merah), run_time=2.4)
            b.main(FadeIn(biru), run_time=2.4)
            b.main(merah.animate.set_fill(opacity=0.62), run_time=1.00)
            b.main(merah.animate.set_fill(opacity=0.32), run_time=1.00)
            b.main(biru.animate.set_fill(opacity=0.62), run_time=1.00)
            b.main(biru.animate.set_fill(opacity=0.32), run_time=1.00)
        qc.periksa_adegan(self, {"kurva": k},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"sumbu": sumbu, "merah": merah, "biru": biru})

        # ---------------------------------------------------------------
        # hitung1: bagian kiri negatif, dan sebabnya letak kurvanya.
        # ---------------------------------------------------------------
        with sinema.babak(self, "hitung1", DURASI) as b:
            b_kiri = panel.baris(r"\int_0^4 f = -\tfrac{32}{3}", warna=AKSEN, b=b)
            b.main(Indicate(b_kiri, color=SOROT), run_time=2.0)
            b.tunggu_sampai(sinema.mulai(jam, "Tandanya dari letak"))
            b.main(merah.animate.set_fill(opacity=0.62), run_time=1.20)
            b.main(merah.animate.set_fill(opacity=0.32), run_time=1.20)
            # Yang ditunjuk LETAK kurvanya, bukan besar luasnya: kurva di bawah
            # sumbu itulah yang memberi tanda minus.
            b.main(Indicate(k, color=AKSEN), run_time=2.4)
            b.main(Indicate(sumbu.angka, color=SOROT), run_time=2.0)
        qc.periksa_adegan(self, {"kurva": k},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"sumbu": sumbu, "merah": merah, "biru": biru})

        # ---------------------------------------------------------------
        # hitung2: bagian kanan positif, besarnya sama persis.
        # ---------------------------------------------------------------
        with sinema.babak(self, "hitung2", DURASI) as b:
            b_kanan = panel.baris(r"\int_4^6 f = +\tfrac{32}{3}", warna=AKSEN2, b=b)
            b.main(Indicate(b_kanan, color=SOROT), run_time=2.0)
            b.main(biru.animate.set_fill(opacity=0.62), run_time=0.90)
            b.main(biru.animate.set_fill(opacity=0.32), run_time=0.90)
            b.main(b_kiri.animate.set_fill(opacity=0.62), b_kanan.animate.set_fill(opacity=0.62), run_time=1.00)
            b.main(b_kiri.animate.set_fill(opacity=0.32), b_kanan.animate.set_fill(opacity=0.32), run_time=1.00)

        # ---------------------------------------------------------------
        # nol: dijumlahkan langsung, hasilnya nol. Inilah jebakannya.
        # ---------------------------------------------------------------
        with sinema.babak(self, "nol", DURASI) as b:
            b_nol = panel.baris(r"-\tfrac{32}{3} + \tfrac{32}{3} = 0",
                                warna=SOROT, b=b)
            b.main(Indicate(b_nol, color=AKSEN), run_time=2.2)
            b.main(merah.animate.set_fill(opacity=0.62), run_time=0.70)
            b.main(merah.animate.set_fill(opacity=0.32), run_time=0.70)
            b.main(biru.animate.set_fill(opacity=0.62), run_time=0.70)
            b.main(biru.animate.set_fill(opacity=0.32), run_time=0.70)
            b.tunggu_sampai(sinema.mulai(jam, "Untuk daerah yang jelas-jelas"))
            # Kedua daerahnya dinyalakan BERSAMAAN: yang membuat angka nol itu
            # mengejutkan adalah keduanya jelas terlihat pada saat yang sama.
            b.main(merah.animate.set_fill(opacity=0.62), biru.animate.set_fill(opacity=0.62), run_time=1.30)
            b.main(merah.animate.set_fill(opacity=0.32), biru.animate.set_fill(opacity=0.32), run_time=1.30)
            b.main(Indicate(b_nol, color=AKSEN), run_time=2.2)
        qc.periksa_adegan(self, {"kurva": k},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"sumbu": sumbu, "merah": merah, "biru": biru})

        # ---------------------------------------------------------------
        # bukan: nol itu benar untuk integral, salah untuk luas.
        # ---------------------------------------------------------------
        with sinema.babak(self, "bukan", DURASI) as b:
            bersihkan_panel(self, panel, [b_akar], b=b)
            b_beda = panel.baris(r"\text{integral} \ne \text{luas}", warna=AKSEN, b=b)
            b.main(Indicate(b_beda, color=SOROT), run_time=1.8)
            b.main(merah.animate.set_fill(opacity=0.62), run_time=0.80)
            b.main(merah.animate.set_fill(opacity=0.32), run_time=0.80)
            b.main(biru.animate.set_fill(opacity=0.62), run_time=0.80)
            b.main(biru.animate.set_fill(opacity=0.32), run_time=0.80)
            b.tunggu_sampai(sinema.mulai(jam, "Dua pertanyaan berbeda."))
            b.main(Indicate(b_nol, color=AKSEN), run_time=1.6)
            b.main(merah.animate.set_fill(opacity=0.62), biru.animate.set_fill(opacity=0.62), run_time=0.80)
            b.main(merah.animate.set_fill(opacity=0.32), biru.animate.set_fill(opacity=0.32), run_time=0.80)

        # ---------------------------------------------------------------
        # positif: bagian merah DIBALIK ke atas sumbu, lalu dijumlahkan.
        # ---------------------------------------------------------------
        # Membalik daerahnya adalah arti "dipositifkan" yang paling harfiah:
        # luas yang sama, dipindahkan ke sisi tempat luas dihitung positif.
        cermin = merah.copy()
        cermin.stretch(-1, 1, about_point=sumbu.c2p(0, 0))
        cermin.set_fill(AKSEN, 0.32).set_stroke(AKSEN, 1.6)
        salinan = merah.copy()
        with sinema.babak(self, "positif", DURASI) as b:
            bersihkan_panel(self, panel, [b_kiri, b_kanan], b=b)
            self.add(salinan)
            b.main(Transform(salinan, cermin), run_time=2.8)
            b.main(salinan.animate.set_fill(opacity=0.62), run_time=1.00)
            b.main(salinan.animate.set_fill(opacity=0.32), run_time=1.00)
            b_luas = panel.baris(r"\tfrac{32}{3} + \tfrac{32}{3} = \tfrac{64}{3}",
                                 warna=SOROT, b=b)
            b.main(Indicate(b_luas, color=AKSEN), run_time=2.2)
            b_kira = panel.baris(r"\approx 21{,}3", warna=SOROT, b=b)
            b.main(salinan.animate.set_fill(opacity=0.62), biru.animate.set_fill(opacity=0.62), run_time=1.20)
            b.main(salinan.animate.set_fill(opacity=0.32), biru.animate.set_fill(opacity=0.32), run_time=1.20)
        qc.periksa_adegan(self, {"kurva": k},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"sumbu": sumbu, "biru": biru})

        # ---------------------------------------------------------------
        # aturan: satu kalimat, dan bagian merah dikembalikan ke tempatnya.
        # ---------------------------------------------------------------
        with sinema.babak(self, "aturan", DURASI) as b:
            b.main(Transform(salinan, merah.copy()), run_time=2.2)
            bersihkan_panel(self, panel, [b_nol, b_beda], b=b)
            b_aturan = panel.baris(r"\text{pecah lalu positifkan}", warna=AKSEN, b=b)
            b.main(Indicate(b_aturan, color=SOROT), run_time=2.2)
            b.main(Indicate(akar4, color=SOROT, scale_factor=2.0), run_time=2.0)
            b.tunggu_sampai(sinema.mulai(jam, "baru jumlahkan."))
            b.main(Indicate(b_luas, color=AKSEN), run_time=2.2)
        qc.periksa_adegan(self, {"kurva": k},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"sumbu": sumbu, "merah": merah, "biru": biru})

        # ---------------------------------------------------------------
        # aman: kalau tidak pernah di bawah sumbu, tidak ada yang dipecah.
        # ---------------------------------------------------------------
        with sinema.babak(self, "aman", DURASI) as b:
            # Bagian kiri diredupkan, jadi yang tersisa terang cuma potongan
            # yang seluruhnya di ATAS sumbu: itulah keadaan "aman" yang sedang
            # diucapkan narator.
            b.main(FadeOut(salinan), merah.animate.set_fill(opacity=0.06)
                   .set_stroke(opacity=0.15), run_time=2.0)
            b.main(biru.animate.set_fill(opacity=0.62), run_time=1.10)
            b.main(biru.animate.set_fill(opacity=0.32), run_time=1.10)
            b.tunggu_sampai(sinema.mulai(jam, "luas = integral."))
            b_aman = panel.baris(r"\text{selalu di atas: luas} = \int",
                                 warna=AKSEN2, b=b)
            b.main(Indicate(b_aman, color=SOROT), run_time=2.2)
        qc.periksa_adegan(self, {"kurva": k},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"sumbu": sumbu, "biru": biru})

        # ---------------------------------------------------------------
        # tutup: langkah pertama bukan menghitung.
        # ---------------------------------------------------------------
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(merah.animate.set_fill(opacity=0.32).set_stroke(opacity=1.0),
                   run_time=1.6)
            bersihkan_panel(self, panel, [b_aturan, b_aman, b_kira], b=b)
            b.main(Indicate(VGroup(akar0, akar4), color=SOROT, scale_factor=2.0),
                   run_time=2.0)
            b_tutup = panel.baris(r"\text{gambar dulu}", warna=AKSEN, b=b)
            b.main(Indicate(b_tutup, color=SOROT), run_time=2.2)
        qc.periksa_adegan(self, {"kurva": k},
                          hud={"identitas": ident, "papan": panel.semua()},
                          dunia={"sumbu": sumbu, "merah": merah, "biru": biru})
