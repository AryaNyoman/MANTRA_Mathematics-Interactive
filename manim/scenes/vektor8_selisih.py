"""Vektor Materi 08, Mengurangi itu menambah lawannya. ManimGL.

Arah visualnya sama dengan Materi 01 dan 06:
`docs/superpowers/specs/2026-09-02-video-vektor-bidang-bernomor.md`.
Matematika di bidang datar bernomor, kamera TEGAK LURUS setelah babak pembuka,
tidak pernah dimiringkan lagi. Keterangan pita bawah TIDAK dipakai sama sekali:
pita itu milik subtitle. Identitas cerita duduk di pojok kiri atas.

STORYBOARD
   1. sapa     3D miring DEKAT: dua orang berdiri di lapangan berpetak.
   2. terbang  Turun ke tegak lurus; bidang koordinat bernomor muncul.
   3. dua      Panah biru a = (3, 1) dan panah merah b = (1, 2) dari titik asal.
   4. lawan    Panah b diputar setengah lingkaran jadi -b = (-1, -2).
   5. jumlah   Salinan -b dipindah ke ujung a, resultannya menutup segitiga.
   6. hitung   Komponennya: 3 + (-1) = 2 dan 1 + (-2) = -1.
   7. tanya    Pertanyaan, lalu diam.
   8. kedua    Panah ungu yang SAMA muncul dari ujung b menuju ujung a, dibuktikan
               dengan menggeser salinannya, bukan dengan menggambar panah baru.
   9. arah     Arahnya disorot: dari b menuju a, terbalik dari urutan membacanya.
  10. titik    Dari situlah aturan "vektor AB = B - A" berasal.
  11. keliru   Urutan dibalik: b - a menunjuk ke arah yang berlawanan sama sekali.
  12. tutup    Layar bersih, kalimat sorot Materi 08.

KENAPA SALINANNYA DIGESER, BUKAN DIGAMBAR ULANG
Inti materi ini adalah dua gambar yang BERBEDA TEMPAT tetapi merupakan panah
yang SAMA. Menggambar panah kedua dari nol tidak membuktikan apa pun: siswa
hanya melihat dua panah mirip. Menggeser salinan yang sudah ada memperlihatkan
bahwa panjang dan arahnya memang tidak berubah, dan itulah isi Materi 02.

JANGKAUAN BIDANG
Titik terjauh yang dipakai: -b di (-1, -2), a di (3, 1), b di (1, 2), selisih di
(2, -1), dan b - a di (-2, 1). Jadi x cukup -3 sampai 5 dan y -3 sampai 3.
Tinggi bingkai 8,0 dengan pusat y -0,2 menaruh baris paling bawah bidang di
sekitar -2,8 pada bingkai, masih di atas jalur subtitle.

WARNA: biru a, merah b dan lawannya, ungu selisih, hitam urutan yang keliru.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "vektor8-selisih"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

Z = 0.02
ASAL = np.array([0.0, 0.0, Z])
VA = np.array([3.0, 1.0, 0.0])          # a
VB = np.array([1.0, 2.0, 0.0])          # b
VLAWAN = -VB                            # -b
VSEL = VA - VB                          # a - b = (2, -1)

BIDANG_X, BIDANG_Y = (-3.0, 5.0, 1.0), (-3.0, 3.0, 1.0)
# Kamera peta dihitung `kamera.muat_datar`, tidak ditulis tangan: yang
# paling bawah pada `bidang_bernomor` adalah ANGKA sumbunya, bukan garis
# petak terbawah.
#
# SISA JALUR HUD DIUKUR: baris panel terlebar di sini
# "(3, 1) - (1, 2) = (2, -1)" selebar 3,01 satuan dan rata kanan ke 6,73,
# jadi tepi kirinya 3,72. Identitas satu baris berakhir sekitar y = 3,35.
SISA_ATAS, SISA_KANAN = 0.40, 3.10


def panah(a, b, warna, tebal=5):
    a = np.array(a, dtype=float)
    b = np.array(b, dtype=float)
    if np.linalg.norm(b - a) < 0.05:
        b = a + 0.05 * RIGHT
    return Arrow(a, b, buff=0, thickness=tebal).set_color(warna)


class SelisihPerjalanan(AdeganMatra):
    def construct(self):
        frame = self.frame

        # ==============================================================
        # Babak 1: dunia nyata, 3D, dari dekat
        # ==============================================================
        alas = ilustrasi.tanah(12.0, 12.0, 0.0, z=-0.02)
        lapangan = VGroup(ilustrasi.lantai_kisi(10.0, 1.0)[0])
        orang_a = ilustrasi.orang(1.15).shift(VA)
        orang_b = ilustrasi.orang(1.15).shift(VB)

        kamera.pasang_awal(frame, theta=-30, phi=68, pusat=(2.0, 1.4, 0.55), tinggi=5.0)
        self.add(alas, lapangan, orang_a, orang_b)
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Mengurangi itu menambah lawannya", lama=3.2, y=2.4)
            b.catat(3.2)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"orang a": orang_a, "orang b": orang_b})

        # ==============================================================
        # Babak 2: turun ke tegak lurus
        # ==============================================================
        bidang = ilustrasi.bidang_bernomor(BIDANG_X, BIDANG_Y)
        bidang.set_opacity(0)
        self.add(bidang)
        self.bring_to_front(orang_a, orang_b)
        # `tanpa_utama=True`: semua isinya baris, tidak ada rumus utama.
        papan = sinema.PapanRumus(self, ukuran=30, tanpa_utama=True)

        with sinema.babak(self, "terbang", DURASI) as b:
            lama = max(2.0, DURASI["terbang"] - 3.0)
            pusat, tinggi = kamera.muat_datar(bidang, sisa_atas=SISA_ATAS,
                                              sisa_kanan=SISA_KANAN)
            b.main(kamera.sudut(frame, theta=0, phi=0, pusat=pusat,
                                tinggi=tinggi), run_time=lama)
            b.main(FadeOut(lapangan), FadeOut(alas),
                   bidang.animate.set_opacity(1), run_time=1.4)
            identitas = sinema.identitas(self, "1 petak = 1 langkah")
            identitas.set_opacity(0)
            b.main(identitas.animate.set_opacity(1), run_time=0.8)
        # Bidang ke `dunia`, identitas ke `hud`: hanya begitu perkalian
        # silang hud x dunia di `periksa_adegan` berjalan.
        qc.periksa_adegan(self, {}, dunia={"bidang": bidang},
                          hud={"identitas": identitas})

        # ==============================================================
        # Babak 3: dua panah posisi
        # ==============================================================
        pa = panah(ASAL, ASAL + VA, AKSEN2)
        pb = panah(ASAL, ASAL + VB, AKSEN)
        la = rumus(r"\vec{a}", 30, AKSEN2).move_to(ASAL + VA * 0.55 + 0.45 * DOWN)
        # Label b ditaruh di KANAN panahnya. Di kiri ia jatuh persis di sumbu
        # tegak dan bertindih dengan angka sumbunya.
        lb = rumus(r"\vec{b}", 30, AKSEN).move_to(ASAL + VB * 0.5 + 0.45 * RIGHT)

        with sinema.babak(self, "dua", DURASI) as b:
            b.main(GrowArrow(pa), run_time=1.0)
            self.bring_to_front(orang_a, orang_b)
            b.main(FadeIn(la), run_time=0.4)
            panel_a = papan.baris(r"\vec{a} = (3,\ 1)", AKSEN2)
            b.catat(0.8)
            b.main(GrowArrow(pb), run_time=1.0)
            self.bring_to_front(orang_a, orang_b)
            b.main(FadeIn(lb), run_time=0.4)
            panel_b = papan.baris(r"\vec{b} = (1,\ 2)", AKSEN)
            b.catat(0.8)
            b.jeda(0.8)
        qc.periksa_adegan(self, {},
                          [("label a", "label b")],
                          dunia={"bidang": bidang, "a": pa, "b": pb,
                                 "label a": la, "label b": lb},
                          hud={"panel a": panel_a, "panel b": panel_b,
                               "identitas": identitas})

        # ==============================================================
        # Babak 4: lawan dari b
        # ==============================================================
        # Panahnya DIPUTAR setengah lingkaran mengelilingi titik asal, bukan
        # digambar ulang. Yang mau ditanam: lawan sebuah vektor itu vektor yang
        # sama, cuma dibalik arahnya.
        p_lawan = pb.copy().set_color(AKSEN).set_opacity(0.75)
        # Digeser ke KIRI panahnya, bukan ke kanan: di kanan ia jatuh di sumbu
        # tegak dan tercetak menimpa angka "-1". Terlihat di render pertama.
        l_lawan = rumus(r"-\vec{b}", 28, AKSEN).move_to(ASAL + VLAWAN * 0.6 + 0.60 * LEFT)

        with sinema.babak(self, "lawan", DURASI) as b:
            self.add(p_lawan)
            b.main(Rotate(p_lawan, PI, about_point=ASAL), run_time=1.6)
            b.main(FadeIn(l_lawan), run_time=0.4)
            panel_l = papan.baris(r"-\vec{b} = (-1,\ -2)", AKSEN)
            b.catat(0.8)
            b.jeda(0.8)
        qc.periksa_adegan(self, {},
                          dunia={"bidang": bidang, "lawan": p_lawan,
                                 "label lawan": l_lawan},
                          hud={"panel a": panel_a, "panel b": panel_b,
                               "panel lawan": panel_l, "identitas": identitas})

        # ==============================================================
        # Babak 5: dijumlahkan seperti biasa
        # ==============================================================
        p_geser = panah(ASAL + VA, ASAL + VA + VLAWAN, AKSEN)
        p_geser.set_opacity(0.75)
        p_sel = panah(ASAL, ASAL + VSEL, SOROT, tebal=7)
        titik_sel = Dot(radius=0.09).set_color(SOROT).move_to(ASAL + VSEL)
        koord_sel = rumus(r"(2,\ -1)", 28, SOROT).move_to(ASAL + VSEL + np.array([0.95, -0.35, 0.0]))

        with sinema.babak(self, "jumlah", DURASI) as b:
            b.main(TransformFromCopy(p_lawan, p_geser), run_time=1.4)
            b.main(GrowArrow(p_sel), run_time=1.2)
            b.main(FadeIn(titik_sel, scale=2.0), FadeIn(koord_sel), run_time=0.6)
            b.jeda(0.8)
        qc.periksa_adegan(self, {},
                          dunia={"bidang": bidang, "selisih": p_sel,
                                 "koordinat": koord_sel},
                          hud={"panel a": panel_a, "panel b": panel_b,
                               "panel lawan": panel_l, "identitas": identitas})

        # ==============================================================
        # Babak 6: komponennya
        # ==============================================================
        # Dulu tiga baris ditumpuk di KIRI, di bawah identitas. Zona kiri
        # atas milik identitas benda; hitungan milik panel kanan, dan zona
        # itu cuma memuat empat baris. Ketiganya jadi SATU baris kerja yang
        # nanti dimorf dua kali, sebab pengurangan per komponen memang lebih
        # terbaca sebagai satu persamaan daripada dua baris terpisah.
        with sinema.babak(self, "hitung", DURASI) as b:
            kerja = papan.baris(r"(3,\ 1) - (1,\ 2) = (2,\ -1)", SOROT)
            b.catat(0.8)
            b.jeda(0.8)
        qc.periksa_adegan(self, {}, dunia={"bidang": bidang},
                          hud={"panel a": panel_a, "panel b": panel_b,
                               "panel lawan": panel_l, "kerja": kerja,
                               "identitas": identitas})

        # ==============================================================
        # Babak 7: pertanyaan
        # ==============================================================
        bantu = VGroup(p_lawan, p_geser, l_lawan)
        with sinema.babak(self, "tanya", DURASI) as b:
            b.main(bantu.animate.set_opacity(0.18), run_time=0.8)
            b.main(Indicate(p_sel, scale_factor=1.0, color=TINTA), run_time=1.0)
            b.jeda(1.6)
        qc.periksa_adegan(self, {}, dunia={"bidang": bidang, "selisih": p_sel},
                          hud={"panel a": panel_a, "panel b": panel_b,
                               "panel lawan": panel_l, "kerja": kerja,
                               "identitas": identitas})

        # ==============================================================
        # Babak 8: panah yang sama, di tempat lain
        # ==============================================================
        p_sel2 = panah(ASAL + VB, ASAL + VA, SOROT, tebal=7)
        l_sel2 = rumus(r"\vec{a} - \vec{b}", 28, SOROT)
        l_sel2.move_to(ASAL + (VA + VB) / 2 + np.array([0.15, 0.65, 0.0]))

        with sinema.babak(self, "kedua", DURASI) as b:
            # Salinan panah selisih DIGESER sejauh b: pangkalnya pindah dari
            # (0, 0) ke ujung b, ujungnya jatuh tepat di ujung a. Itulah
            # buktinya, bukan sekadar dua panah yang kebetulan mirip.
            salinan = p_sel.copy()
            self.add(salinan)
            b.main(salinan.animate.shift(VB), run_time=1.8)
            self.remove(salinan)
            self.add(p_sel2)
            b.main(FadeIn(l_sel2), run_time=0.5)
            b.main(Indicate(p_sel, scale_factor=1.0, color=TINTA),
                   Indicate(p_sel2, scale_factor=1.0, color=TINTA), run_time=1.2)
            b.jeda(0.8)
        qc.periksa_adegan(self, {},
                          [("label selisih 2", "koordinat")],
                          dunia={"bidang": bidang, "selisih 2": p_sel2,
                                 "label selisih 2": l_sel2,
                                 "koordinat": koord_sel},
                          hud={"panel a": panel_a, "panel b": panel_b,
                               "panel lawan": panel_l, "kerja": kerja,
                               "identitas": identitas})

        # ==============================================================
        # Babak 9: arahnya
        # ==============================================================
        with sinema.babak(self, "arah", DURASI) as b:
            b.main(Indicate(pb, scale_factor=1.0, color=SOROT), run_time=0.9)
            b.main(Indicate(pa, scale_factor=1.0, color=SOROT), run_time=0.9)
            b.main(ShowCreationThenDestruction(p_sel2.copy().set_color(TINTA)), run_time=1.4)
            b.jeda(0.8)
        qc.periksa_adegan(self, {},
                          dunia={"bidang": bidang, "selisih 2": p_sel2},
                          hud={"panel a": panel_a, "panel b": panel_b,
                               "panel lawan": panel_l, "kerja": kerja,
                               "identitas": identitas})

        # ==============================================================
        # Babak 10: dari sinilah aturan AB = B - A berasal
        # ==============================================================
        # Baris kerja yang SAMA dimorf jadi aturannya. Kalimat "ujung
        # dikurangi pangkal" DIHAPUS dari gambar: narator mengucapkannya dan
        # subtitle menuliskannya, jadi menaruhnya lagi di layar berarti satu
        # maksud ditulis dua kali.
        with sinema.babak(self, "titik", DURASI) as b:
            kerja = sinema.ganti_rumus(self, kerja, r"\vec{AB} = B - A",
                                       b=b, papan=papan, warna=TINTA)
            b.jeda(1.4)
        qc.periksa_adegan(self, {}, dunia={"bidang": bidang},
                          hud={"panel a": panel_a, "panel b": panel_b,
                               "panel lawan": panel_l, "kerja": kerja,
                               "identitas": identitas})

        # ==============================================================
        # Babak 11: urutan yang dibalik
        # ==============================================================
        p_balik = panah(ASAL, ASAL - VSEL, TINTA, tebal=6)
        # Hanya namanya yang ditaruh di dunia; koordinatnya pindah ke panel
        # kanan. Versi panjangnya menjulur ke tepi kiri bidang dan berdesakan
        # dengan blok hitungan di pojok kiri atas.
        l_balik = rumus(r"\vec{b} - \vec{a}", 28, TINTA)
        l_balik.move_to(ASAL - VSEL * 0.62 + np.array([-0.10, 0.55, 0.0]))

        with sinema.babak(self, "keliru", DURASI) as b:
            b.main(GrowArrow(p_balik), run_time=1.2)
            b.main(FadeIn(l_balik), run_time=0.5)
            kerja = sinema.ganti_rumus(self, kerja,
                                       r"\vec{b} - \vec{a} = (-2,\ 1)",
                                       b=b, papan=papan, warna=TINTA)
            b.main(Indicate(p_sel, scale_factor=1.0, color=TINTA),
                   Indicate(p_balik, scale_factor=1.0, color=SOROT), run_time=1.2)
            b.jeda(1.0)
        qc.periksa_adegan(self, {},
                          [("label balik", "koordinat")],
                          dunia={"bidang": bidang, "balik": p_balik,
                                 "label balik": l_balik,
                                 "koordinat": koord_sel},
                          hud={"panel a": panel_a, "panel b": panel_b,
                               "panel lawan": panel_l, "kerja": kerja,
                               "identitas": identitas})

        # ==============================================================
        # Babak 12: layar bersih, kalimat sorot
        # ==============================================================
        tutup1 = teks("Mengurangi itu menambah lawannya.", 32, TINTA)
        sinema.batasi_lebar(tutup1, 11.4)
        tutup2 = teks("Panah selisihnya berjalan dari ujung b menuju ujung a.", 32, SOROT)
        sinema.batasi_lebar(tutup2, 11.4)
        tutup = VGroup(tutup1, tutup2).arrange(DOWN, buff=0.34).move_to([0, 0.3, 0])

        semua = Group(bidang, orang_a, orang_b, pa, pb, p_sel, p_sel2, p_balik,
                      la, lb, l_sel2, l_balik, titik_sel, koord_sel, bantu)
        # `papan.semua()` menyingkirkan baris yang BENAR-BENAR tampil.
        # Baris kerja sudah dimorf dua kali, dan papan mencatat penggantinya
        # karena `ganti_rumus` diberi `papan=papan`; tanpa itu baris lama
        # hidup lagi menimpa yang baru di detik penutup.
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(semua), FadeOut(papan.semua()),
                   FadeOut(identitas), run_time=1.4)
            self.hud_tambah(tutup)
            tutup.set_opacity(0)
            b.main(tutup.animate.set_opacity(1), run_time=1.8)
            b.jeda(1.4)
        qc.periksa_adegan(self, {"tutup": tutup})
