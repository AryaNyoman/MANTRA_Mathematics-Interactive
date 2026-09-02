"""Vektor Materi 09, Dikali angka: panjang berubah, arah tetap. ManimGL.

Arah visualnya sama dengan Materi 01, 03, 06, dan 08:
`docs/superpowers/specs/2026-09-02-video-vektor-bidang-bernomor.md`.
Matematika di bidang datar bernomor, kamera TEGAK LURUS setelah babak pembuka.
Keterangan pita bawah TIDAK dipakai: pita itu milik subtitle.

KENAPA PENGALINYA BERGERAK TERUS, BUKAN TIGA GAMBAR TERPISAH
Inti materi ini adalah apa yang TERJADI pada panah ketika pengalinya berubah.
Tiga gambar terpisah (3a, setengah a, -2a) hanya memperlihatkan tiga hasil, dan
siswa harus menebak sendiri apa yang terjadi di antaranya. Dengan satu pengali
yang diturunkan terus-menerus, ia MELIHAT panahnya menyusut, lenyap tepat di
nol, lalu tumbuh lagi menghadap arah berlawanan. Itu juga persis yang diminta
alat coba di halamannya.

STORYBOARD
   1. sapa      3D miring DEKAT: bola di lapangan berpetak.
   2. terbang   Turun ke tegak lurus; bidang koordinat bernomor muncul.
   3. satu      a = (2, 1), pengali 1. Bolanya di ujung panah.
   4. tiga      Pengali naik ke 3: panah memanjang ke (6, 3), arah tidak bergeser.
   5. kecil     Pengali turun ke 0,5: panah menyusut, arah tetap.
   6. tanya     Pertanyaan, lalu diam.
   7. nol       Pengali menyentuh 0: panahnya lenyap.
   8. negatif   Pengali ke -2: panah tumbuh lagi ke arah berlawanan, (-4, -2).
   9. panjang   Panjangnya: 2,24 lalu 6,71 lalu 4,47.
  10. keliru    Panjang tidak pernah negatif; yang dibalik minus itu ARAHNYA.
  11. sejajar   Garis lurus melalui titik asal: kelipatan berarti sejajar.
  12. tutup     Layar bersih, kalimat sorot Materi 09.

JANGKAUAN BIDANG
Titik terjauh: 3a di (6, 3) dan -2a di (-4, -2). Jadi x cukup -5 sampai 7 dan y
-2 sampai 3. Tinggi bingkai 7,6 dengan pusat y 0,3 menaruh baris paling bawah
bidang di sekitar -2,4 pada bingkai, aman di atas jalur subtitle.

WARNA: ungu panah hasil perkalian, biru panah a yang asli sebagai pembanding,
merah angka pengali yang hidup.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "vektor9-kali-skalar"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

Z = 0.02
ASAL = np.array([0.0, 0.0, Z])
VA = np.array([2.0, 1.0, 0.0])          # a = (2 1)

BIDANG_X, BIDANG_Y = (-5.0, 7.0, 1.0), (-2.0, 3.0, 1.0)
PETA = dict(theta=0, phi=0, pusat=(1.0, 0.3, 0.0), tinggi=7.6)


class KaliSkalar(AdeganMatra):
    def construct(self):
        frame = self.frame

        # ==============================================================
        # Babak 1: dunia nyata, 3D, dari dekat
        # ==============================================================
        alas = ilustrasi.tanah(14.0, 14.0, 0.5, z=-0.02)
        lapangan = VGroup(ilustrasi.lantai_kisi(12.0, 1.0)[0])
        self.k = ValueTracker(0.0)
        bola = ilustrasi.bola(0.22, REDUP)
        pusat0 = bola.get_center().copy()
        # Bolanya benda cerita, jadi warnanya netral. Merah dan biru sudah punya
        # makna matematis di video ini.
        bola.add_updater(lambda m: m.move_to(pusat0 + self.k.get_value() * VA))

        kamera.pasang_awal(frame, theta=-28, phi=66, pusat=(1.0, 0.6, 0.5), tinggi=5.0)
        self.add(alas, lapangan, bola)
        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Panjang berubah, arah tetap", lama=3.2, y=2.4)
            b.catat(3.2)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"bola": bola})

        # ==============================================================
        # Babak 2: turun ke tegak lurus
        # ==============================================================
        bidang = ilustrasi.bidang_bernomor(BIDANG_X, BIDANG_Y)
        bidang.set_opacity(0)
        self.add(bidang)
        self.bring_to_front(bola)
        identitas = teks("1 petak = 1 langkah", 23, REDUP).to_corner(UL, buff=0.42)

        with sinema.babak(self, "terbang", DURASI) as b:
            lama = max(2.0, DURASI["terbang"] - 3.0)
            b.main(kamera.sudut(frame, **PETA), run_time=lama)
            b.main(FadeOut(lapangan), FadeOut(alas),
                   bidang.animate.set_opacity(1), run_time=1.4)
            self.hud_tambah(identitas)
            identitas.set_opacity(0)
            b.main(identitas.animate.set_opacity(1), run_time=0.8)
        qc.periksa_adegan(self, {"bidang": bidang, "identitas": identitas})

        # ==============================================================
        # Babak 3: panah a yang asli
        # ==============================================================
        # Panah hasil perkalian digambar ulang tiap frame mengikuti pengali.
        # Panjang nol membuat Arrow gagal, jadi di sekitar nol ia disembunyikan.
        p_hasil = always_redraw(self.buat_panah)
        p_asal = Arrow(ASAL, ASAL + VA, buff=0, thickness=4).set_color(AKSEN2)
        p_asal.set_opacity(0.45)
        l_a = rumus(r"\vec{a}", 28, AKSEN2).move_to(ASAL + VA * 0.55 + 0.45 * DOWN)
        panel_a = rumus(r"\vec{a} = (2\ \ 1)", 32, AKSEN2).to_corner(UR, buff=0.45)

        label_k = teks("pengali", 24, AKSEN)
        angka_k = sinema.AngkaKoma(1.0, num_decimal_places=1, font_size=40).set_color(AKSEN)
        # Updater-nya SENGAJA belum dipasang di sini. `set_value` membangun ulang
        # angkanya, dan kalau itu terjadi di tengah animasi kepekatan, bentuk
        # lama dan bentuk baru punya jumlah titik berbeda lalu render gagal
        # dengan "could not broadcast input array from shape (23,3) into shape
        # (81,3)". Dipasang setelah animasi kemunculannya selesai.
        ukur_k = VGroup(label_k, angka_k).arrange(RIGHT, buff=0.22)
        ukur_k.next_to(identitas, DOWN, buff=0.34).align_to(identitas, LEFT)

        with sinema.babak(self, "satu", DURASI) as b:
            self.add(p_asal, p_hasil)
            self.bring_to_front(bola)
            b.main(self.k.animate.set_value(1.0), run_time=1.4)
            b.main(FadeIn(l_a), run_time=0.4)
            self.hud_tambah(panel_a, ukur_k)
            panel_a.set_opacity(0)
            ukur_k.set_opacity(0)
            b.main(panel_a.animate.set_opacity(1), ukur_k.animate.set_opacity(1), run_time=0.6)
            angka_k.add_updater(lambda m: m.set_value(self.k.get_value()))
            b.jeda(0.8)
        qc.periksa_adegan(self, {"label a": l_a, "panel a": panel_a, "ukur k": ukur_k,
                                 "identitas": identitas},
                          [("ukur k", "identitas"), ("ukur k", "panel a")])

        # ==============================================================
        # Babak 4: pengali 3
        # ==============================================================
        hit3 = rumus(r"3 \times (2\ \ 1) = (6\ \ 3)", 30, SOROT)
        hit3.next_to(ukur_k, DOWN, buff=0.34).align_to(ukur_k, LEFT)

        with sinema.babak(self, "tiga", DURASI) as b:
            b.main(self.k.animate.set_value(3.0), run_time=2.2)
            self.hud_tambah(hit3)
            hit3.set_opacity(0)
            b.main(hit3.animate.set_opacity(1), run_time=0.7)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"hitung 3": hit3, "ukur k": ukur_k, "panel a": panel_a},
                          [("hitung 3", "ukur k"), ("hitung 3", "panel a")])

        # ==============================================================
        # Babak 5: pengali setengah
        # ==============================================================
        with sinema.babak(self, "kecil", DURASI) as b:
            b.main(self.k.animate.set_value(0.5), run_time=2.4)
            b.main(Indicate(p_asal, scale_factor=1.0, color=SOROT), run_time=1.0)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"ukur k": ukur_k, "identitas": identitas})

        # ==============================================================
        # Babak 6: pertanyaan
        # ==============================================================
        with sinema.babak(self, "tanya", DURASI) as b:
            b.jeda(1.6)
        qc.periksa_adegan(self, {"ukur k": ukur_k, "hitung 3": hit3})

        # ==============================================================
        # Babak 7: pengali nol
        # ==============================================================
        nol_label = teks("vektor nol", 24, REDUP).move_to(ASAL + np.array([1.0, -0.75, 0.0]))

        with sinema.babak(self, "nol", DURASI) as b:
            b.main(self.k.animate.set_value(0.0), run_time=1.8)
            b.main(FadeIn(nol_label), run_time=0.5)
            b.jeda(1.0)
            b.main(FadeOut(nol_label), run_time=0.4)
        qc.periksa_adegan(self, {"ukur k": ukur_k, "panel a": panel_a})

        # ==============================================================
        # Babak 8: pengali negatif
        # ==============================================================
        hitn = rumus(r"-2 \times (2\ \ 1) = (-4\ \ -2)", 30, SOROT)
        hitn.next_to(hit3, DOWN, buff=0.26).align_to(hit3, LEFT)

        with sinema.babak(self, "negatif", DURASI) as b:
            b.main(self.k.animate.set_value(-2.0), run_time=2.4)
            self.hud_tambah(hitn)
            hitn.set_opacity(0)
            b.main(hitn.animate.set_opacity(1), run_time=0.7)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"hitung negatif": hitn, "hitung 3": hit3,
                                 "panel a": panel_a},
                          [("hitung negatif", "hitung 3"), ("hitung negatif", "panel a")])

        # ==============================================================
        # Babak 9: panjangnya
        # ==============================================================
        pj1 = rumus(r"|\vec{a}| = \sqrt{5} \approx 2{,}24", 28, TINTA)
        pj2 = rumus(r"|3\vec{a}| = 3\sqrt{5} \approx 6{,}71", 28, TINTA)
        pj3 = rumus(r"|-2\vec{a}| = 2\sqrt{5} \approx 4{,}47", 28, TINTA)
        panjang = VGroup(pj1, pj2, pj3).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        panjang.next_to(hitn, DOWN, buff=0.34).align_to(hitn, LEFT)

        with sinema.babak(self, "panjang", DURASI) as b:
            self.hud_tambah(panjang)
            panjang.set_opacity(0)
            for baris in panjang:
                b.main(baris.animate.set_opacity(1), run_time=0.8)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"panjang": panjang, "hitung negatif": hitn,
                                 "panel a": panel_a},
                          [("panjang", "hitung negatif"), ("panjang", "panel a")])

        # ==============================================================
        # Babak 10: panjang tidak pernah negatif
        # ==============================================================
        with sinema.babak(self, "keliru", DURASI) as b:
            b.main(Indicate(pj3, scale_factor=1.0, color=AKSEN), run_time=1.2)
            b.main(Indicate(p_hasil, scale_factor=1.0, color=TINTA), run_time=1.2)
            b.jeda(1.0)
        qc.periksa_adegan(self, {"panjang": panjang, "identitas": identitas})

        # ==============================================================
        # Babak 11: kelipatan berarti sejajar
        # ==============================================================
        # Garisnya ditarik lewat titik asal searah a, sepanjang seluruh bidang.
        # Semua kelipatan a, positif maupun negatif, jatuh persis di garis itu.
        arah = VA / np.linalg.norm(VA)
        garis = DashedLine(ASAL - arah * 4.6, ASAL + arah * 7.0)
        garis.set_stroke(REDUP, 3)
        l_sejajar = teks("semua kelipatan a ada di garis ini", 23, REDUP)
        l_sejajar.move_to(ASAL + np.array([2.4, -1.3, 0.0]))

        with sinema.babak(self, "sejajar", DURASI) as b:
            b.main(ShowCreation(garis), run_time=1.6)
            b.main(FadeIn(l_sejajar), run_time=0.5)
            b.main(self.k.animate.set_value(3.0), run_time=1.6)
            b.main(self.k.animate.set_value(-2.0), run_time=1.6)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"garis": l_sejajar, "identitas": identitas,
                                 "panjang": panjang},
                          [("garis", "panjang")])

        # ==============================================================
        # Babak 12: layar bersih, kalimat sorot
        # ==============================================================
        tutup1 = teks("Dikali angka positif, arahnya tetap.", 32, TINTA)
        sinema.batasi_lebar(tutup1, 11.4)
        tutup2 = teks("Dikali angka negatif, arahnya berbalik.", 32, SOROT)
        sinema.batasi_lebar(tutup2, 11.4)
        tutup3 = teks("Panjangnya tidak pernah negatif.", 32, AKSEN)
        sinema.batasi_lebar(tutup3, 11.4)
        tutup = VGroup(tutup1, tutup2, tutup3).arrange(DOWN, buff=0.30).move_to([0, 0.3, 0])

        semua = Group(bidang, bola, p_hasil, p_asal, l_a, garis, l_sejajar)
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(semua), FadeOut(hit3), FadeOut(hitn), FadeOut(panjang),
                   FadeOut(ukur_k), FadeOut(identitas), FadeOut(panel_a), run_time=1.4)
            self.hud_tambah(tutup)
            tutup.set_opacity(0)
            b.main(tutup.animate.set_opacity(1), run_time=1.8)
            b.jeda(1.4)
        qc.periksa_adegan(self, {"tutup": tutup})

    # ==================================================================
    def buat_panah(self):
        """Panah k kali a. Di sekitar k = 0 panahnya disembunyikan, bukan
        digambar sepanjang nol: Arrow dengan panjang nol membuat render gagal,
        dan lenyapnya panah memang isi pelajarannya."""
        k = self.k.get_value()
        ujung = ASAL + k * VA
        if abs(k) < 0.06:
            p = Arrow(ASAL, ASAL + 0.06 * VA, buff=0, thickness=7).set_color(SOROT)
            return p.set_opacity(0.0)
        return Arrow(ASAL, ujung, buff=0, thickness=7).set_color(SOROT)
