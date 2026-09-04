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
   1. sapa      Bidang bernomor, tegak lurus: bola di lapangan berpetak.
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

# Pembuka: garis petak naik dua tahap mengikuti kalimat narator, dan kamera
# mulai miring TIPIS lalu mendatar tepat pada kalimat "kita lihat dari atas".
# Sesudah pembuka 3D dipotong, kalimat itu tidak lagi menggambarkan
# perubahan apa pun, dan gambar yang membantah narasinya dilarang STANDAR
# butir 3. 6 derajat memendekkan satu arah 1 - cos 6 = 0,55 persen, jauh di
# bawah yang bisa dilihat mata, dan tidak ada angka sumbu maupun panah yang
# tampil selama kamera masih miring (syarat MASTER 4 Sep).
GARIS_SAMAR, GARIS_SEDANG, GARIS_PENUH = 0.30, 0.55, 1.0
MIRING_AWAL = 6.0          # derajat
# Kamera peta dihitung `kamera.muat_datar`, tidak ditulis tangan: yang
# paling bawah pada `bidang_bernomor` adalah ANGKA sumbunya.
#
# SISA JALUR HUD DIUKUR: baris panel terlebar di sini
# "-2 x (2 1) = (-4 -2)" selebar 2,94 satuan, rata kanan ke 6,73, jadi
# tepi kirinya 3,79. Identitas satu baris berakhir sekitar y = 3,35.
# Pesanan jalur HUD DIHAPUS: sejak `sinema.alas_hud` ada, tulisan HUD
# punya alas kertas sendiri, jadi bidang boleh memenuhi layar.


class KaliSkalar(AdeganMatra):
    def construct(self):
        frame = self.frame

        # ==============================================================
        # ==============================================================
        # Babak 1: LANGSUNG ke bidang bernomor, tanpa pembuka 3D
        # ==============================================================
        # STANDAR butir 2: 3D hanya di video PERTAMA tiap topik, dan untuk
        # Vektor itu Materi 01 (perahu di air). Video ini dulu membuka dengan
        # belasan detik lapangan kelabu yang hampir tidak bergerak. Narasinya
        # tidak diubah; angka sumbu sengaja ditahan sampai babak kedua, tempat
        # narator memang menyebutnya.
        bidang = ilustrasi.bidang_bernomor(BIDANG_X, BIDANG_Y)
        bidang.set_stroke(opacity=GARIS_SAMAR)
        bidang.angka.set_opacity(0)
        self.add(bidang)
        self.k = ValueTracker(0.0)
        bola = ilustrasi.bola(0.22, REDUP)
        pusat0 = bola.get_center().copy()
        # Bolanya benda cerita, jadi warnanya netral. Merah dan biru sudah punya
        # makna matematis di video ini.
        bola.add_updater(lambda m: m.move_to(pusat0 + self.k.get_value() * VA))

        pusat, tinggi = kamera.muat_datar(bidang)
        kamera.pasang_awal(frame, theta=0, phi=MIRING_AWAL, pusat=pusat,
                           tinggi=tinggi * 1.06)

        # Jam kalimat: tiap kejadian pembuka dipatok ke detik kalimat yang
        # menyebutkannya. Tanpa ini `run_time` menumpuk dan gambarnya
        # meleset beberapa detik dari narasinya.
        JAM = sinema.jam_subtitle(TOPIK)

        def saat(potongan):
            for detik, kalimat in JAM:
                if potongan in kalimat:
                    return detik
            return None
        papan = sinema.PapanRumus(self, ukuran=30, tanpa_utama=True, alas=True)

        # Ruas putus-putus searah a: "ke arah yang sama terus". Ia
        # DISINGKIRKAN sebelum babak `sejajar` menggambar garis kelipatannya
        # sendiri, supaya tidak ada dua garis dengan maksud yang sama.
        arah_tetap = DashedLine(ASAL, ASAL + VA * 1.6).set_stroke(REDUP, 3)

        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Panjang berubah, arah tetap", lama=3.2, y=2.4)
            b.catat(3.2)
            # "Sebuah bola ditendang di lapangan berpetak."
            b.tunggu_sampai(saat("lapangan berpetak"))
            b.main(bidang.animate.set_stroke(opacity=GARIS_SEDANG), run_time=1.1)
            self.add(bola)
            b.main(FadeIn(bola, scale=1.6), run_time=0.8)
            # "Kita akan menendangnya ke arah yang sama terus,"
            b.tunggu_sampai(saat("arah yang"))
            b.main(ShowCreation(arah_tetap), run_time=1.6)
            # "hanya tenaganya yang diubah-ubah." Dua denyut, dua tenaga.
            b.tunggu_sampai(saat("tenaganya"))
            for _ in range(2):
                b.main(Indicate(bola, scale_factor=1.35, color=SOROT),
                       run_time=0.9)
        qc.periksa_adegan(self, {}, dunia={"bidang": bidang, "bola": bola})

        # ==============================================================
        # Babak 2: angka sumbu muncul, identitas dipasang
        # ==============================================================
        with sinema.babak(self, "terbang", DURASI) as b:
            # "Kita lihat dari atas supaya bisa dihitung."
            b.tunggu_sampai(saat("dari atas"))
            b.main(kamera.sudut(frame, theta=0, phi=0, pusat=pusat,
                                tinggi=tinggi), run_time=1.8)
            b.main(bidang.animate.set_stroke(opacity=GARIS_PENUH), run_time=0.5)
            b.main(bidang.angka[0].animate.set_opacity(0.75), run_time=0.7)
            b.main(bidang.angka[1].animate.set_opacity(0.75), run_time=0.7)
            # "1 petak = 1 langkah."
            b.tunggu_sampai(saat("petak = 1 langkah"))
            b.main(FadeOut(arah_tetap), run_time=0.5)
            identitas = sinema.identitas(self, "1 petak = 1 langkah", alas=True)
            identitas.set_opacity(0)
            b.main(identitas.animate.set_opacity(1), run_time=0.8)
        # Bidang ke `dunia`, identitas ke `hud`: hanya begitu perkalian
        # silang hud x dunia di `periksa_adegan` berjalan.
        qc.periksa_adegan(self, {}, dunia={"bidang": bidang},
                          hud={"identitas": identitas})

        # ==============================================================
        # Babak 3: panah a yang asli
        # ==============================================================
        # Panah hasil perkalian digambar ulang tiap frame mengikuti pengali.
        # Panjang nol membuat Arrow gagal, jadi di sekitar nol ia disembunyikan.
        p_hasil = always_redraw(self.buat_panah)
        p_asal = Arrow(ASAL, ASAL + VA, buff=0, thickness=4).set_color(AKSEN2)
        p_asal.set_opacity(0.45)
        l_a = rumus(r"\vec{a}", 28, AKSEN2).move_to(ASAL + VA * 0.55 + 0.45 * DOWN)

        label_k = teks("pengali", 24, AKSEN)
        angka_k = sinema.AngkaKoma(1.0, num_decimal_places=1, font_size=40).set_color(AKSEN)
        # Updater-nya SENGAJA belum dipasang di sini. `set_value` membangun ulang
        # angkanya, dan kalau itu terjadi di tengah animasi kepekatan, bentuk
        # lama dan bentuk baru punya jumlah titik berbeda lalu render gagal
        # dengan "could not broadcast input array from shape (23,3) into shape
        # (81,3)". Dipasang setelah animasi kemunculannya selesai.
        # Angka pengali yang hidup ini adalah HITUNGAN, jadi tempatnya sisi
        # KANAN di bawah papan rumus, bukan menumpuk di bawah identitas.
        # Kiri atas milik identitas benda saja. Letaknya sama persis dengan
        # baris "panjang" di Materi 01, yang jadi rujukan bidang datar.
        ukur_k = VGroup(label_k, angka_k).arrange(RIGHT, buff=0.22)
        sinema.batasi_lebar(ukur_k, 4.5)
        # Digeser 0,35 satuan lagi ke kiri, TIDAK seperti Materi 01. Di sana
        # angkanya selalu empat huruf ("5,00"), di sini "1,0" berubah jadi
        # "-2,0" dan DecimalNumber menahan tepi KIRI-nya, jadi ia tumbuh ke
        # kanan sampai keluar bingkai. Diukur dari pesan gerbang: kelebihan
        # 0,21 satuan.
        ukur_k.move_to([6.85 - ukur_k.get_width() / 2 - 0.47, 0.62, 0]).fix_in_frame()

        with sinema.babak(self, "satu", DURASI) as b:
            self.add(p_asal, p_hasil)
            self.bring_to_front(bola)
            b.main(self.k.animate.set_value(1.0), run_time=1.4)
            b.main(FadeIn(l_a), run_time=0.4)
            panel_a = papan.baris(r"\vec{a} = (2\ \ 1)", AKSEN2)
            self.hud_tambah(ukur_k)
            ukur_k.set_opacity(0)
            b.main(ukur_k.animate.set_opacity(1), run_time=0.6)
            angka_k.add_updater(lambda m: m.set_value(self.k.get_value()))
            b.jeda(0.8)
        qc.periksa_adegan(self, {},
                          dunia={"bidang": bidang, "label a": l_a},
                          hud={"panel a": panel_a, "ukur k": ukur_k,
                               "identitas": identitas})

        # ==============================================================
        # Babak 4: pengali 3
        # ==============================================================
        with sinema.babak(self, "tiga", DURASI) as b:
            b.main(self.k.animate.set_value(3.0), run_time=2.2)
            hit = papan.baris(r"3 \times (2\ \ 1) = (6\ \ 3)", SOROT)
            b.catat(0.8)
            b.jeda(0.8)
        qc.periksa_adegan(self, {}, dunia={"bidang": bidang},
                          hud={"panel a": panel_a, "ukur k": ukur_k,
                               "hitung": hit, "identitas": identitas})

        # ==============================================================
        # Babak 5: pengali setengah
        # ==============================================================
        with sinema.babak(self, "kecil", DURASI) as b:
            b.main(self.k.animate.set_value(0.5), run_time=2.4)
            b.main(Indicate(p_asal, scale_factor=1.0, color=SOROT), run_time=1.0)
            b.jeda(0.8)
        qc.periksa_adegan(self, {}, dunia={"bidang": bidang},
                          hud={"panel a": panel_a, "ukur k": ukur_k,
                               "hitung": hit, "identitas": identitas})

        # ==============================================================
        # Babak 6: pertanyaan
        # ==============================================================
        with sinema.babak(self, "tanya", DURASI) as b:
            b.jeda(1.6)
        qc.periksa_adegan(self, {}, dunia={"bidang": bidang},
                          hud={"panel a": panel_a, "ukur k": ukur_k,
                               "hitung": hit, "identitas": identitas})

        # ==============================================================
        # Babak 7: pengali nol
        # ==============================================================
        # `sinema.label` menggagalkan render kalau label gambar lebih dari
        # dua kata. Dipakai supaya aturan itu dijaga mesin, bukan ingatan.
        nol_label = sinema.label("vektor nol", 24, REDUP)
        nol_label.move_to(ASAL + np.array([1.0, -0.75, 0.0]))

        with sinema.babak(self, "nol", DURASI) as b:
            b.main(self.k.animate.set_value(0.0), run_time=1.8)
            b.main(FadeIn(nol_label), run_time=0.5)
            b.jeda(1.0)
            b.main(FadeOut(nol_label), run_time=0.4)
        qc.periksa_adegan(self, {}, dunia={"bidang": bidang},
                          hud={"panel a": panel_a, "ukur k": ukur_k,
                               "hitung": hit, "identitas": identitas})

        # ==============================================================
        # Babak 8: pengali negatif
        # ==============================================================
        # Baris yang SAMA dimorf, bukan baris kedua ditumpuk: pengalinya
        # yang berubah, dan v2 meminta rumus berubah di tempatnya.
        with sinema.babak(self, "negatif", DURASI) as b:
            b.main(self.k.animate.set_value(-2.0), run_time=2.4)
            hit = sinema.ganti_rumus(
                self, hit, r"-2 \times (2\ \ 1) = (-4\ \ -2)",
                b=b, papan=papan, warna=SOROT)
            b.jeda(0.8)
        qc.periksa_adegan(self, {}, dunia={"bidang": bidang},
                          hud={"panel a": panel_a, "ukur k": ukur_k,
                               "hitung": hit, "identitas": identitas})

        # ==============================================================
        # Babak 9: panjangnya
        # ==============================================================
        # Dulu tiga baris ditumpuk di KIRI. Zona rumus kanan memuat empat
        # baris, dan tiga slot sudah terpakai, jadi panjang a diberi satu
        # slot tetap dan panjang kelipatannya satu slot yang DIMORF dari
        # 3a ke -2a, mengikuti pengali yang sedang dibahas narator.
        with sinema.babak(self, "panjang", DURASI) as b:
            pj_a = papan.baris(r"|\vec{a}| = \sqrt{5} \approx 2{,}24", TINTA)
            b.catat(1.0)
            pj_k = papan.baris(r"|3\vec{a}| = 3\sqrt{5} \approx 6{,}71", TINTA)
            b.catat(1.0)
            pj_k = sinema.ganti_rumus(
                self, pj_k, r"|-2\vec{a}| = 2\sqrt{5} \approx 4{,}47",
                b=b, papan=papan, warna=TINTA)
            b.jeda(0.8)
        qc.periksa_adegan(self, {}, dunia={"bidang": bidang},
                          hud={"panel a": panel_a, "ukur k": ukur_k,
                               "hitung": hit, "panjang a": pj_a,
                               "panjang k": pj_k, "identitas": identitas})

        # ==============================================================
        # Babak 10: panjang tidak pernah negatif
        # ==============================================================
        with sinema.babak(self, "keliru", DURASI) as b:
            b.main(Indicate(pj_k, scale_factor=1.0, color=AKSEN), run_time=1.2)
            b.main(Indicate(p_hasil, scale_factor=1.0, color=TINTA), run_time=1.2)
            b.jeda(1.0)
        qc.periksa_adegan(self, {}, dunia={"bidang": bidang},
                          hud={"panel a": panel_a, "ukur k": ukur_k,
                               "hitung": hit, "panjang a": pj_a,
                               "panjang k": pj_k, "identitas": identitas})

        # ==============================================================
        # Babak 11: kelipatan berarti sejajar
        # ==============================================================
        # Garisnya ditarik lewat titik asal searah a, sepanjang seluruh bidang.
        # Semua kelipatan a, positif maupun negatif, jatuh persis di garis itu.
        arah = VA / np.linalg.norm(VA)
        garis = DashedLine(ASAL - arah * 4.6, ASAL + arah * 7.0)
        garis.set_stroke(REDUP, 3)
        # Enam kata di dalam gambar melanggar aturan 4 v2, dan kalimat
        # selengkapnya memang diucapkan narator dan ditulis subtitle.
        l_sejajar = sinema.label("kelipatan a", 23, REDUP)
        l_sejajar.move_to(ASAL + np.array([2.4, -1.3, 0.0]))

        with sinema.babak(self, "sejajar", DURASI) as b:
            b.main(ShowCreation(garis), run_time=1.6)
            b.main(FadeIn(l_sejajar), run_time=0.5)
            b.main(self.k.animate.set_value(3.0), run_time=1.6)
            b.main(self.k.animate.set_value(-2.0), run_time=1.6)
            b.jeda(0.8)
        qc.periksa_adegan(self, {},
                          dunia={"bidang": bidang, "garis": l_sejajar},
                          hud={"panel a": panel_a, "ukur k": ukur_k,
                               "hitung": hit, "panjang a": pj_a,
                               "panjang k": pj_k, "identitas": identitas})

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
        # `papan.semua()` menyingkirkan baris yang BENAR-BENAR tampil,
        # termasuk pengganti hasil morph, sebab `ganti_rumus` diberi
        # `papan=papan`.
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(semua), FadeOut(papan.semua()),
                   FadeOut(ukur_k), FadeOut(identitas), run_time=1.4)
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
