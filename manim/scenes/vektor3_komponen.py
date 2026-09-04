"""Vektor Materi 03, Memecah panah jadi dua langkah. ManimGL.

Arah visualnya sama dengan Materi 01, 06, dan 08:
`docs/superpowers/specs/2026-09-02-video-vektor-bidang-bernomor.md`.
Matematika di bidang datar bernomor, kamera TEGAK LURUS setelah babak pembuka.
Keterangan pita bawah TIDAK dipakai: pita itu milik subtitle.

KENAPA MOBIL
Komponen bukan sekadar cara menulis, melainkan jawaban atas sebuah kendala
nyata: kendaraan tidak bisa menembus gedung, jadi jalur miring TERPAKSA jadi
dua langkah, mendatar lalu tegak. Dengan pengait itu siswa melihat komponen
sebagai sesuatu yang memang terjadi, bukan aturan yang tiba-tiba ada.

STORYBOARD
   1. sapa      Bidang bernomor, tegak lurus: mobil di persimpangan jalan berpetak.
   2. terbang   Turun ke tegak lurus; bidang koordinat bernomor muncul.
   3. miring    Panah miring dari titik asal ke (3, 4): jalur kalau bisa terbang.
   4. jalan     Mobilnya benar-benar berjalan 3 ke kanan lalu 4 ke atas.
   5. sama      Kedua jalur berakhir di titik yang sama persis.
   6. komponen  Dua angka itu namanya komponen: (3 4).
   7. tanya     Pertanyaan, lalu diam.
   8. tukar     (4 3) digambar: tempatnya berbeda, jadi urutan tidak boleh ditukar.
   9. tanda     (-3 4): komponen negatif berarti ke kiri.
  10. tulis     Vektor baris dan vektor kolom, artinya sama.
  11. koma      Titik pakai koma, vektor baris tanpa koma.
  12. tutup     Layar bersih, kalimat sorot Materi 03.

YANG SENGAJA TIDAK DIULANG
Aturan "ujung dikurangi pangkal" untuk vektor dari A ke B ada di halaman Materi
03, tetapi sudah dibahas tuntas di video Materi 08. Mengulangnya di sini hanya
memperpanjang video tanpa menambah apa pun.

JANGKAUAN BIDANG
Titik terjauh: (3, 4), (4, 3), dan (-3, 4). Jadi x cukup -4 sampai 6 dan y -1
sampai 5. Tinggi bingkai 8,0 dengan pusat y 1,8 menaruh baris paling bawah
bidang di sekitar -2,8 pada bingkai, masih di atas jalur subtitle.

WARNA: ungu panah miring (perpindahan sebenarnya), biru langkah mendatar,
merah langkah tegak, hitam susunan yang ditukar.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "vektor3-komponen"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

Z = 0.02
ASAL = np.array([0.0, 0.0, Z])
MX, MY = 3.0, 4.0                       # komponen mendatar dan tegak
TUJUAN = np.array([MX, MY, Z])
SUDUT = np.array([MX, 0.0, Z])          # tempat mobil berbelok

BIDANG_X, BIDANG_Y = (-4.0, 6.0, 1.0), (-1.0, 5.0, 1.0)

# Pembuka: garis petak naik dua tahap mengikuti kalimat narator, dan kamera
# mulai miring TIPIS lalu mendatar tepat pada kalimat "kita lihat dari atas".
# Sesudah pembuka 3D dipotong, kalimat itu tidak lagi menggambarkan
# perubahan apa pun, dan gambar yang membantah narasinya dilarang STANDAR
# butir 3. 6 derajat memendekkan satu arah 1 - cos 6 = 0,55 persen, jauh di
# bawah yang bisa dilihat mata, dan tidak ada angka sumbu maupun panah yang
# tampil selama kamera masih miring (syarat MASTER 4 Sep).
GARIS_SAMAR, GARIS_SEDANG, GARIS_PENUH = 0.30, 0.55, 1.0
MIRING_AWAL = 6.0          # derajat
# Kamera peta dihitung `kamera.muat_datar`, tidak ditulis tangan. Yang paling
# bawah pada `bidang_bernomor` bukan garis petak terbawah melainkan ANGKA
# sumbunya, dan hitungan tangan sudah berkali-kali ditolak qc karenanya.
#
# SISA JALUR HUD, dibaca dari ZONA_IDENTITAS dan ZONA_RUMUS di gl/sinema.py,
# bukan dikarang: identitas satu baris berakhir sekitar y = 3,35 sehingga
# 0,40 cukup di atas; baris panel terlebar di sini sekitar 2,5 satuan dan
# barisnya rata kanan ke 6,73, jadi tepi kirinya sekitar 4,2.
# Pesanan jalur HUD DIHAPUS: sejak `sinema.alas_hud` ada, tulisan HUD
# punya alas kertas sendiri, jadi bidang boleh memenuhi layar.


def panah(a, b, warna, tebal=5):
    a = np.array(a, dtype=float)
    b = np.array(b, dtype=float)
    if np.linalg.norm(b - a) < 0.05:
        b = a + 0.05 * RIGHT
    return Arrow(a, b, buff=0, thickness=tebal).set_color(warna)


class PecahJadiKomponen(AdeganMatra):
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
        # Mobilnya REDUP, bukan merah bawaannya. Merah sudah dipakai untuk
        # komponen tegak, dan satu warna tidak boleh punya dua makna.
        # Benda cerita netral, matematika yang berwarna.
        asli = ilustrasi.mobil(0.8, warna=REDUP, warna_roda=TINTA)
        mobil = asli.copy()
        self.mx = ValueTracker(0.0)
        self.my = ValueTracker(0.0)
        # Mobilnya menghadap +x selama melaju mendatar, lalu menghadap +y saat
        # menanjak. Arahnya dibaca dari tracker, jadi tidak ada lompatan.
        self.hadap = ValueTracker(0.0)
        pusat0 = mobil.get_center().copy()

        def taruh(m):
            m.become(asli.copy())
            m.rotate(self.hadap.get_value() * DEGREES, axis=OUT, about_point=pusat0)
            m.move_to(pusat0 + np.array([self.mx.get_value(), self.my.get_value(), 0.0]))
        mobil.add_updater(taruh)

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
        self.add(mobil)
        # `alas=True`: tulisan HUD diberi alas kertas, jadi bidang boleh
        # memenuhi layar tanpa garis petak menembus tulisannya.
        papan = sinema.PapanRumus(self, ukuran=30, tanpa_utama=True, alas=True)

        # Mobilnya TIDAK bisa di-FadeIn maupun di-Indicate: pembaruannya
        # memanggil `become`, yang menyetel ulang warna dan kepekatan tiap
        # frame. Jadi kejadian pembukanya dipikul benda LAIN: penanda
        # tujuan, jalur lurus yang tidak boleh dilewati, dan kedua sumbu.
        tanda_tujuan = Circle(radius=0.20).set_stroke(REDUP, 3)
        tanda_tujuan.move_to(TUJUAN)
        l_tujuan_awal = sinema.label("tujuan", 22, REDUP)
        l_tujuan_awal.move_to(TUJUAN + np.array([0.95, 0.30, 0.0]))
        lurus = DashedLine(ASAL, TUJUAN).set_stroke(REDUP, 3)

        with sinema.babak(self, "sapa", DURASI) as b:
            sinema.judul_pembuka(self, "Memecah panah jadi dua langkah", lama=3.2, y=2.4)
            b.catat(3.2)
            # "Sebuah mobil hendak menuju satu tempat di seberang kota."
            b.tunggu_sampai(saat("seberang kota"))
            b.main(bidang.animate.set_stroke(opacity=GARIS_SEDANG), run_time=1.2)
            b.main(FadeIn(tanda_tujuan, scale=1.6), FadeIn(l_tujuan_awal),
                   run_time=0.8)
            # "Masalahnya, mobil tidak bisa menembus gedung." Jalur lurusnya
            # ditarik putus-putus: itulah yang TIDAK boleh dilewati.
            b.tunggu_sampai(saat("menembus gedung"))
            b.main(ShowCreation(lurus), run_time=1.4)
            # "Ia hanya boleh lewat jalan yang mendatar dan jalan yang tegak."
            # Dua kejadian untuk dua hal yang disebut, dan warnanya sudah
            # warna komponennya nanti: biru mendatar, merah tegak.
            b.tunggu_sampai(saat("mendatar"))
            b.main(FadeOut(lurus), run_time=0.5)
            b.main(Indicate(bidang.axes[0], scale_factor=1.0, color=AKSEN2),
                   run_time=1.1)
            b.main(Indicate(bidang.axes[1], scale_factor=1.0, color=AKSEN),
                   run_time=1.1)
        qc.periksa_adegan(self, {},
                          dunia={"bidang": bidang, "mobil": mobil})

        # ==============================================================
        # Babak 2: angka sumbu muncul, identitas dipasang
        # ==============================================================
        with sinema.babak(self, "terbang", DURASI) as b:
            # "Kita lihat kotanya dari atas": kamera mendatar, sekali, dan
            # tidak pernah miring lagi sesudah ini.
            b.tunggu_sampai(saat("dari atas"))
            b.main(kamera.sudut(frame, theta=0, phi=0, pusat=pusat,
                                tinggi=tinggi), run_time=2.0)
            # Angka sumbu baru muncul SESUDAH kamera mendatar. Sumbu x dulu,
            # lalu sumbu y.
            b.main(bidang.animate.set_stroke(opacity=GARIS_PENUH), run_time=0.6)
            b.main(bidang.angka[0].animate.set_opacity(0.75), run_time=0.8)
            b.main(bidang.angka[1].animate.set_opacity(0.75), run_time=0.8)
            b.main(FadeOut(tanda_tujuan), FadeOut(l_tujuan_awal), run_time=0.5)
            identitas = sinema.identitas(self, "1 petak = 1 blok", alas=True)
            identitas.set_opacity(0)
            b.main(identitas.animate.set_opacity(1), run_time=0.8)
        # Bidang ke medan `dunia` dan identitas ke medan `hud`, BUKAN keduanya
        # ke `zona`. Hanya begitu perkalian silang hud x dunia berjalan.
        # Materi 01 pernah lolos dengan tulisan panel di atas garis petak
        # justru karena salah medan di sini.
        qc.periksa_adegan(self, {}, dunia={"bidang": bidang},
                          hud={"identitas": identitas})

        # ==============================================================
        # Babak 3: jalur kalau bisa terbang
        # ==============================================================
        p_miring = panah(ASAL, TUJUAN, SOROT, tebal=7)
        titik_tujuan = Dot(radius=0.09).set_color(SOROT).move_to(TUJUAN)
        l_tujuan = rumus(r"(3,\ 4)", 28, SOROT).move_to(TUJUAN + np.array([0.9, 0.35, 0.0]))

        with sinema.babak(self, "miring", DURASI) as b:
            b.main(GrowArrow(p_miring), run_time=1.6)
            self.bring_to_front(mobil)
            b.main(FadeIn(titik_tujuan, scale=2.0), FadeIn(l_tujuan), run_time=0.6)
            panel_v = papan.baris(r"\vec{v} = (3\ \ 4)", SOROT)
            b.catat(0.8)
            b.jeda(0.8)
        qc.periksa_adegan(self, {"miring": p_miring},
                          dunia={"bidang": bidang, "titik": l_tujuan},
                          hud={"panel v": panel_v, "identitas": identitas})

        # ==============================================================
        # Babak 4: mobilnya benar-benar berjalan, dua langkah
        # ==============================================================
        p_datar = always_redraw(
            lambda: panah(ASAL, ASAL + np.array([self.mx.get_value(), 0.0, 0.0]), AKSEN2))
        p_tegak = always_redraw(
            lambda: panah(SUDUT, SUDUT + np.array([0.0, self.my.get_value(), 0.0]), AKSEN))
        l_datar = rumus("3", 30, AKSEN2).move_to([MX / 2, -0.55, 0])
        l_tegak = rumus("4", 30, AKSEN).move_to([MX + 0.55, MY / 2, 0])

        with sinema.babak(self, "jalan", DURASI) as b:
            self.add(p_datar, p_tegak)
            self.bring_to_front(mobil)
            b.main(self.mx.animate.set_value(MX), run_time=1.8)
            b.main(FadeIn(l_datar), run_time=0.4)
            b.main(self.hadap.animate.set_value(90.0), run_time=0.5)
            b.main(self.my.animate.set_value(MY), run_time=2.0)
            b.main(FadeIn(l_tegak), run_time=0.4)
            b.jeda(0.6)
        qc.periksa_adegan(self, {},
                          [("label datar", "label tegak")],
                          dunia={"bidang": bidang, "datar": p_datar,
                                 "tegak": p_tegak, "label datar": l_datar,
                                 "label tegak": l_tegak},
                          hud={"identitas": identitas, "panel v": panel_v})

        # ==============================================================
        # Babak 5: kedua jalur berakhir di titik yang sama
        # ==============================================================
        with sinema.babak(self, "sama", DURASI) as b:
            b.main(Indicate(titik_tujuan, scale_factor=1.0, color=TINTA), run_time=0.9)
            b.main(Indicate(p_miring, scale_factor=1.0, color=TINTA), run_time=0.9)
            b.main(Indicate(p_datar, scale_factor=1.0, color=SOROT),
                   Indicate(p_tegak, scale_factor=1.0, color=SOROT), run_time=1.2)
            b.jeda(0.8)
        qc.periksa_adegan(self, {},
                          dunia={"bidang": bidang, "miring": p_miring,
                                 "titik": l_tujuan},
                          hud={"identitas": identitas, "panel v": panel_v})

        # ==============================================================
        # Babak 6: dua angka itu namanya komponen
        # ==============================================================
        # Dulu dua baris ini ditumpuk di KIRI, di bawah identitas. Zona kiri
        # atas milik identitas benda saja; hitungan milik panel kanan.
        # Keduanya jadi baris panel supaya jarak antarbarisnya diatur papan,
        # bukan ditumpuk tangan.
        # Dulu dua baris ini ditulis beruntun lalu layar diam 20,1 detik,
        # sementara narator masih menyebut "berapa jauh ke kanan", "lalu
        # berapa jauh ke atas", "dua angka itu namanya komponen", dan
        # "kita tulis (3 4)". Empat kalimat, satu kejadian.
        with sinema.babak(self, "komponen", DURASI) as b:
            b.tunggu_sampai(saat("ke kanan"))
            k1 = papan.baris(r"\mathrm{mendatar} = 3", AKSEN2)
            b.catat(0.8)
            b.tunggu_sampai(saat("ke atas"))
            k2 = papan.baris(r"\mathrm{tegak} = 4", AKSEN)
            b.catat(0.8)
            b.tunggu_sampai(saat("namanya komponen"))
            # Versi sebelumnya cuma mengubah WARNA sesaat, dan itu praktis tidak
            # terlihat di 480p: saya bandingkan sendiri frame 58,5 dan 61,5, dan
            # kedua baris panel tampak sama persis. Kejadian yang tidak terlihat
            # sama dengan tidak ada.
            #
            # Sekarang dua kejadian, satu untuk tiap angka, dan tiap baris panel
            # MEMBESAR sambil angka pasangannya DI BIDANG ikut membesar. Jadi
            # mata tahu baris mana milik angka mana, bukan cuma berkedip.
            #
            # Yang dibesarkan `l_datar` dan `l_tegak`, BUKAN `p_datar` dan
            # `p_tegak`: kedua panah itu `always_redraw`, digambar ulang tiap
            # frame, jadi Indicate padanya tertimpa dan tidak pernah tampak.
            # Jebakan yang sama sudah menggigit mobilnya di babak pembuka.
            b.main(Indicate(k1, scale_factor=1.22, color=AKSEN2),
                   Indicate(l_datar, scale_factor=1.6, color=AKSEN2), run_time=1.0)
            b.main(Indicate(k2, scale_factor=1.22, color=AKSEN),
                   Indicate(l_tegak, scale_factor=1.6, color=AKSEN), run_time=1.0)
            b.tunggu_sampai(saat("Kita tulis"))
            b.main(Indicate(panel_v, scale_factor=1.0, color=TINTA), run_time=1.2)
        qc.periksa_adegan(self, {}, dunia={"bidang": bidang},
                          hud={"identitas": identitas, "panel v": panel_v,
                               "mendatar": k1, "tegak": k2})

        # ==============================================================
        # Babak 7: pertanyaan
        # ==============================================================
        with sinema.babak(self, "tanya", DURASI) as b:
            b.main(Indicate(l_datar, scale_factor=1.0, color=SOROT),
                   Indicate(l_tegak, scale_factor=1.0, color=SOROT), run_time=1.2)
            b.jeda(1.6)
        qc.periksa_adegan(self, {},
                          dunia={"bidang": bidang, "titik": l_tujuan},
                          hud={"identitas": identitas, "panel v": panel_v,
                               "mendatar": k1, "tegak": k2})

        # ==============================================================
        # Babak 8: kalau urutannya ditukar
        # ==============================================================
        TUKAR = np.array([MY, MX, Z])
        p_tukar = panah(ASAL, TUKAR, TINTA, tebal=6)
        titik_tukar = Dot(radius=0.09).set_color(TINTA).move_to(TUKAR)
        l_tukar = rumus(r"(4\ \ 3)", 28, TINTA).move_to(TUKAR + np.array([0.95, 0.35, 0.0]))

        with sinema.babak(self, "tukar", DURASI) as b:
            b.main(GrowArrow(p_tukar), run_time=1.4)
            b.main(FadeIn(titik_tukar, scale=2.0), FadeIn(l_tukar), run_time=0.6)
            b.main(Indicate(titik_tujuan, scale_factor=1.0, color=SOROT),
                   Indicate(titik_tukar, scale_factor=1.0, color=SOROT), run_time=1.2)
            b.jeda(0.8)
        qc.periksa_adegan(self, {},
                          [("label tukar", "titik")],
                          dunia={"bidang": bidang, "tukar": p_tukar,
                                 "label tukar": l_tukar, "titik": l_tujuan},
                          hud={"identitas": identitas, "panel v": panel_v,
                               "mendatar": k1, "tegak": k2})

        # ==============================================================
        # Babak 9: komponen yang bertanda negatif
        # ==============================================================
        KIRI = np.array([-MX, MY, Z])
        # Hitam, bukan biru: biru sudah berarti "komponen mendatar". Hitam di
        # video ini berarti "sebuah pembanding", sama seperti panah (4 3) tadi,
        # dan keduanya memang tidak pernah tampil bersamaan.
        p_kiri = panah(ASAL, KIRI, TINTA, tebal=6)
        l_kiri = rumus(r"(-3\ \ 4)", 28, TINTA).move_to(KIRI + np.array([-0.15, 0.55, 0.0]))

        with sinema.babak(self, "tanda", DURASI) as b:
            b.main(FadeOut(p_tukar), FadeOut(titik_tukar), FadeOut(l_tukar), run_time=0.6)
            b.main(GrowArrow(p_kiri), run_time=1.4)
            b.main(FadeIn(l_kiri), run_time=0.5)
            b.jeda(1.0)
        qc.periksa_adegan(self, {},
                          dunia={"bidang": bidang, "kiri": p_kiri,
                                 "label kiri": l_kiri},
                          hud={"identitas": identitas, "panel v": panel_v,
                               "mendatar": k1, "tegak": k2})

        # ==============================================================
        # Babak 10: baris atau kolom
        # ==============================================================
        # Baris dan kolom ditulis SEBAGAI SATU PERSAMAAN, bukan dua bentuk
        # berdampingan dengan kata "atau" di tengah. Tanda sama dengan itu
        # sendiri yang mengatakan artinya sama.
        with sinema.babak(self, "tulis", DURASI) as b:
            b.main(FadeOut(p_kiri), FadeOut(l_kiri), run_time=0.6)
            tulis = papan.baris(
                r"(3\ \ 4) = \begin{pmatrix} 3 \\ 4 \end{pmatrix}", SOROT)
            b.catat(1.0)
            b.jeda(1.0)
        qc.periksa_adegan(self, {}, dunia={"bidang": bidang},
                          hud={"identitas": identitas, "panel v": panel_v,
                               "mendatar": k1, "tegak": k2, "tulis": tulis})

        # ==============================================================
        # Babak 11: koma atau tanpa koma
        # ==============================================================
        # Ukurannya dinaikkan: pada 480p, huruf 20 tinggal sekitar sepuluh
        # piksel dan praktis tidak terbaca. Terlihat di lembar kontak pertama.
        # Baris panel yang SAMA dimorf, bukan blok kelima ditumpuk. Zona rumus
        # cuma memuat empat baris, dan v2 memang meminta rumus BERUBAH di
        # tempatnya, bukan memudar lalu muncul lagi di tempat lain.
        with sinema.babak(self, "koma", DURASI) as b:
            tulis = sinema.ganti_rumus(
                self, tulis, r"A(3,\ 4) \ne (3\ \ 4)", b=b, papan=papan,
                warna=TINTA)
            b.jeda(1.4)
        qc.periksa_adegan(self, {}, dunia={"bidang": bidang},
                          hud={"identitas": identitas, "panel v": panel_v,
                               "mendatar": k1, "tegak": k2, "beda": tulis})

        # ==============================================================
        # Babak 12: layar bersih, kalimat sorot
        # ==============================================================
        tutup1 = teks("Dua angka sudah cukup mewakili satu panah.", 32, TINTA)
        sinema.batasi_lebar(tutup1, 11.4)
        tutup2 = teks("Itulah sebabnya vektor bisa dihitung, bukan cuma digambar.", 32, SOROT)
        sinema.batasi_lebar(tutup2, 11.4)
        tutup = VGroup(tutup1, tutup2).arrange(DOWN, buff=0.34).move_to([0, 0.3, 0])

        semua = Group(bidang, mobil, p_miring, p_datar, p_tegak, titik_tujuan,
                      l_tujuan, l_datar, l_tegak)
        # `papan.semua()` aman karena `ganti_rumus` diberi `papan=papan`:
        # papan mencatat penggantinya, jadi yang disingkirkan objek yang
        # benar-benar tampil, bukan baris lama yang sudah dilebur.
        with sinema.babak(self, "tutup", DURASI) as b:
            b.main(FadeOut(semua), FadeOut(papan.semua()),
                   FadeOut(identitas), run_time=1.4)
            self.hud_tambah(tutup)
            tutup.set_opacity(0)
            b.main(tutup.animate.set_opacity(1), run_time=1.8)
            b.jeda(1.4)
        qc.periksa_adegan(self, {"tutup": tutup})
