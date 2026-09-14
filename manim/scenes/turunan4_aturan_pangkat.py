"""Turunan 4: aturan pangkat lahir dari definisi. STANDAR VIDEO v3.

PENGHUBUNGNYA DIPERBAIKI
Naskah lama membuka dengan "itu pola, bukan bukti", sebab video 03 versi lama
cuma menyimpulkan 2x dari empat titik. Video 03 versi v3 SUDAH membuktikannya
lewat selisih tinggi dan limit, jadi pembuka lama itu membantah video
sebelumnya. Segar-ingat sekarang menyebut nomor dan nama video 03, menampilkan
kembali gambar kuncinya secara ringkas, dan mengajukan pertanyaan yang memang
belum dijawab: apakah hitungan panjang itu harus diulang untuk tiap pangkat.
Dicatat di PELAJARAN-RENDER-TURUNAN-2026-09-08 sebagai tindak lanjut nomor 3.

KENAPA BAGIAN ANGKA TIDAK MEMAKAI GRAFIK
Contoh angkanya kemiringan x pangkat tiga di sekitar x = 2. Menggambarnya
menuntut sumbu tegak sampai 18 satuan di atas sumbu mendatar selebar 1 satuan,
dan skala yang tidak sama DILARANG di sini: kedua besaran satuannya sama, dan
babak ini justru meminta mata menilai kemiringan (STANDAR v3 butir 5). Jadi
angkanya dihitung di layar langkah demi langkah, dan yang bergerak adalah garis
bilangan hasil bagi yang merapat ke 12. Garis bilangan itu berskala benar, satu
satuan sama panjang di mana pun.

INTI YANG HANYA BISA DILAKUKAN GAMBAR BERGERAK
Sesudah dibagi h, satu suku TIDAK memuat h dan dua suku sisanya memuat h.
Yang memuat h menyusut sampai hilang; yang tidak memuat h tidak bergerak sama
sekali. Ketimpangan itulah isi aturan pangkat.

SATU WARNA SATU MAKNA
  TINTA         kurva, suku yang bertahan, dan hitungan yang sedang berjalan
  AKSEN merah   suku yang memuat h, yaitu yang akan lenyap
  AKSEN2 biru   angka contoh dan garis bilangannya
  SOROT ungu    aturan yang disimpulkan
  REDUP         sumbu, kisi, dan keterangan

ANGKANYA DIPERIKSA
2^3 = 8; 2,1^3 = 9,261; selisihnya dibagi 0,1 memberi 12,61; 2,01^3 = 8,120601;
dibagi 0,01 memberi 12,0601; turunan x^3 di x = 2 adalah 12 = 3 x 2^2. Klaimnya
di `alat/klaim-video-turunan.json` berawalan V04.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import ilustrasi, kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "turunan4-aturan-pangkat"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]
KATA = sinema.JamKata(TOPIK)

Y_KERJA = 0.60          # baris tempat hitungan berlangsung
Y_BAWAH = -1.70         # garis bilangan dan keterangan


def hud(ident, papan):
    """Isi `hud=` untuk qc, aman saat panelnya masih kosong."""
    isi = {"identitas": ident} if ident is not None else {}
    papan_isi = papan.semua()
    if papan_isi is not None:
        isi["papan"] = papan_isi
    return isi


def kanan_dari(kiri_mob, isi, ukuran, warna, buff=0.22):
    """Potongan rumus yang duduk tepat di kanan potongan sebelumnya."""
    m = rumus(isi, ukuran, warna)
    m.next_to(kiri_mob, RIGHT, buff=buff)
    return m


class TurunanAturanPangkat(AdeganMatra):
    """Waktu setiap kejadian diikat ke jam kata, bukan ke pembagian babak."""

    def construct(self):
        frame = self.frame
        kamera.pasang_awal(frame, theta=0, phi=0, pusat=(0, 0, 0), tinggi=8.0)
        papan = sinema.PapanRumus(self, ukuran=30, alas=True)
        ident = None

        # ============ buka: satu pertanyaan, diucapkan dan ditulis ======= #
        tanya = teks("Apakah setiap pangkat harus dihitung ulang dari nol?", 34, TINTA)
        tanya.move_to([0, -0.9, 0])
        sinema.batasi_lebar(tanya, 10.0)

        with sinema.babak(self, "buka", DURASI, kata=KATA) as b:
            # Dipicu kata pertama (detik 0,10), bukan "aturan pangkat" (detik
            # 1,36): judul 2,4 detik sesudah 1,36 melewati kata "Apakah" di
            # detik 3,29, dan pemicu berikutnya jadi terlambat.
            b.tunggu_kata("materi")
            sinema.judul_pembuka(self, "Materi 04: aturan pangkat", lama=2.4)
            b.catat(2.4)
            b.tunggu_kata("apakah")
            b.main(Write(tanya), run_time=2.2)
            b.main(FadeOut(tanya), run_time=0.8)

        # ============ segar-ingat: gambar kunci video 03 ================= #
        # Bidang kecil, batas bawah kelipatan langkahnya, skala x dan y sama.
        bidang = ilustrasi.bidang_bernomor((-2.0, 2.0, 1.0), (-1.0, 4.0, 1.0),
                                           ukuran_angka=22)
        bidang.scale(0.62).move_to([-4.0, 0.35, 0])
        kurva = ParametricCurve(
            lambda t: bidang.c2p(t, t * t), t_range=(-1.9, 1.9, 0.02))
        kurva.set_stroke(TINTA, width=3.6)
        titik1 = Dot(bidang.c2p(1, 1), radius=0.07).set_color(AKSEN)
        singgung = Line(bidang.c2p(0.1, -0.8), bidang.c2p(1.9, 2.8))
        singgung.set_stroke(SOROT, width=3.0)
        hasil03 = rumus(r"(x^2)' = 2x", 44, TINTA).move_to([2.0, 1.1, 0])

        with sinema.babak(self, "ingat_tiga", DURASI, kata=KATA) as b:
            # Tanpa animasi pendahulu: kata "video" jatuh pada detik 0,27.
            b.tunggu_kata("video ketiga")
            b.main(FadeIn(bidang), ShowCreation(kurva), run_time=1.4)
            ident = sinema.identitas(self, "ingat video 3")
            b.tunggu_kata("membuktikan")
            b.main(FadeIn(titik1, scale=0.5), ShowCreation(singgung), run_time=1.4)
            b.tunggu_kata("dua eks")
            b.main(Write(hasil03), run_time=1.6)
        qc.periksa_adegan(self, {"kurva": kurva}, hud=hud(ident, papan),
                          dunia={"bidang": bidang}, jaga_jalur_bawah=False)

        l_cara = teks("selisih tinggi : langkah mendatar", 30, REDUP)
        l_cara.move_to([2.0, -0.35, 0])
        sinema.batasi_lebar(l_cara, 6.0)

        with sinema.babak(self, "ingat_cara", DURASI, kata=KATA) as b:
            b.tunggu_kata("selisih tinggi")
            b.main(FadeIn(l_cara, shift=UP * 0.2), run_time=0.8)
            b.tunggu_kata("langkah mendatar")
            b.main(Indicate(l_cara, color=REDUP), run_time=1.0)
            b.tunggu_kata("didekatkan")
            b.main(Indicate(singgung, color=SOROT), run_time=1.2)

        # Tiga titik berserak adalah gambar untuk kata "tebakan": itulah cara
        # yang DITINGGALKAN video 03, dan menyebutnya tanpa memperlihatkannya
        # membuat kalimatnya lewat begitu saja.
        tebak = VGroup(*[Dot(bidang.c2p(t, t * t), radius=0.06).set_color(REDUP)
                         for t in (-1.0, 0.0, 1.5)])

        with sinema.babak(self, "ingat_hasil", DURASI, kata=KATA) as b:
            b.tunggu_kata("tebakan")
            b.main(LaggedStartMap(FadeIn, tebak, lag_ratio=0.3), run_time=1.2)
            b.main(FadeOut(tebak), run_time=0.8)
            b.tunggu_kata("semua eks")
            b.main(Indicate(hasil03, color=TINTA), run_time=1.4)
            papan.baris(r"(x^2)' = 2x", warna=TINTA, b=b)
        qc.periksa_adegan(self, {"kurva": kurva, "hasil 03": hasil03},
                          hud=hud(ident, papan), dunia={"bidang": bidang},
                          tulisan={"cara": l_cara}, jaga_jalur_bawah=False)

        # ============ masalah: pertanyaan yang belum dijawab ============= #
        daftar = VGroup(rumus(r"x^3", 44, TINTA), rumus(r"x^4", 44, TINTA),
                        rumus(r"x^5", 44, REDUP), rumus(r"\dots", 44, REDUP))
        daftar.arrange(RIGHT, buff=0.75).move_to([2.0, -0.35, 0])

        with sinema.babak(self, "masalah", DURASI, kata=KATA) as b:
            b.main(FadeOut(l_cara), run_time=0.5)
            b.tunggu_kata("eks pangkat tiga")
            b.main(FadeIn(daftar[0], shift=UP * 0.2), run_time=0.7)
            b.tunggu_kata("eks pangkat empat")
            b.main(FadeIn(daftar[1], shift=UP * 0.2), run_time=0.7)
            b.tunggu_kata("seterusnya")
            b.main(FadeIn(daftar[2], shift=UP * 0.2),
                   FadeIn(daftar[3], shift=UP * 0.2), run_time=0.9)
            b.tunggu_kata("hitungan panjang")
            b.main(Indicate(hasil03, color=REDUP), run_time=0.9)
            b.tunggu_kata("diulang")
            b.main(Indicate(daftar, color=TINTA), run_time=1.4)
        qc.periksa_adegan(self, {"kurva": kurva, "daftar": daftar},
                          hud=hud(ident, papan), dunia={"bidang": bidang},
                          jaga_jalur_bawah=False)

        # ============ contoh angka: kemiringan x^3 di x = 2 ============== #
        # Bidang segar-ingat dibuang di AWAL babak ini, bukan di ujung babak
        # sebelumnya, supaya layar tidak pernah kosong di antara dua kalimat.
        judul_hit = rumus(r"x^3 \ \mathrm{di}\ x = 2", 40, TINTA)
        judul_hit.move_to([0, 1.75, 0])

        with sinema.babak(self, "coba", DURASI, kata=KATA) as b:
            b.tunggu_kata("angka dulu")
            b.main(FadeOut(bidang), FadeOut(kurva), FadeOut(titik1),
                   FadeOut(singgung), FadeOut(hasil03), FadeOut(daftar),
                   run_time=0.8)
            b.tunggu_kata("ambil")
            b.main(Write(judul_hit), run_time=1.6)
            b.tunggu_kata("kemiringannya")
            b.main(Indicate(judul_hit, color=TINTA), run_time=1.2)
            # Pergantian identitas di UJUNG babak, sesudah semua pemicu lewat:
            # di tengah babak ia menyita waktu di antara dua kata dan membuat
            # pemicu berikutnya terlambat. Berurutan, bukan silang.
            ident2 = sinema.identitas(self, "contoh angka")
            ident2.set_opacity(0.0)
            b.main(FadeOut(ident), run_time=0.4)
            b.main(ident2.animate.set_opacity(1.0), run_time=0.4)
            ident = ident2

        # Garis bilangan: satu satuan sama panjang di mana pun, jadi merapatnya
        # angka ke 12 memang terlihat sebagaimana adanya.
        garis = NumberLine(x_range=(11.8, 13.0, 0.2), width=8.6)
        garis.set_stroke(REDUP, width=2.4)
        garis.move_to([0, Y_BAWAH, 0])
        # Angka ditulis sendiri supaya desimalnya KOMA, sama dengan semua angka
        # lain di layar ini. Angka bawaan NumberLine memakai titik.
        angka_garis = VGroup()
        for nilai in (11.8, 12.0, 12.2, 12.4, 12.6, 12.8, 13.0):
            m = rumus(f"{nilai:.1f}".replace(".", "{,}"), 22, TINTA)
            m.set_opacity(0.75)
            m.next_to(garis.n2p(nilai), DOWN, buff=0.18)
            angka_garis.add(m)
        garis.add(angka_garis)
        garis.angka = angka_garis            # supaya gerbang tulisan lawan angka berlaku
        garis.latar = True
        t_1261 = Dot(garis.n2p(12.61), radius=0.085).set_color(AKSEN2)
        l_1261 = rumus(r"12{,}61", 26, AKSEN2).next_to(t_1261, UP, buff=0.18)

        baris_awal = rumus(r"2^3", 40, TINTA).move_to([-0.6, Y_KERJA + 0.55, 0])
        awal_hasil = kanan_dari(baris_awal, r"= 8", 40, TINTA)

        with sinema.babak(self, "angka_awal", DURASI, kata=KATA) as b:
            b.main(FadeIn(garis), run_time=1.0)
            b.tunggu_kata("tingginya")
            b.main(Write(baris_awal), run_time=1.2)
            b.tunggu_kata("delapan")
            b.main(Write(awal_hasil), run_time=1.2)

        b_h1 = rumus(r"h = 0{,}1:", 36, AKSEN2).move_to([-2.6, Y_KERJA - 0.35, 0])
        b_h1b = kanan_dari(b_h1, r"2{,}1^3", 36, AKSEN2, buff=0.35)
        b_h1c = kanan_dari(b_h1b, r"= 9{,}261", 36, AKSEN2)

        with sinema.babak(self, "angka_h1", DURASI, kata=KATA) as b:
            b.tunggu_kata("nol koma satu")
            b.main(Write(b_h1), run_time=1.4)
            b.tunggu_kata("dua koma satu")
            b.main(Write(b_h1b), run_time=1.4)
            b.tunggu_kata("sembilan koma")
            b.main(Write(b_h1c), run_time=1.6)

        b_bagi1 = rumus(r"(9{,}261 - 8)", 36, AKSEN2).move_to([-2.6, Y_KERJA - 1.15, 0])
        b_bagi1b = kanan_dari(b_bagi1, r": 0{,}1", 36, AKSEN2)
        b_bagi1c = kanan_dari(b_bagi1b, r"= 12{,}61", 36, AKSEN2)

        with sinema.babak(self, "angka_bagi1", DURASI, kata=KATA) as b:
            b.tunggu_kata("selisihnya")
            b.main(Write(b_bagi1), run_time=1.6)
            b.tunggu_kata("dibagi")
            b.main(Write(b_bagi1b), run_time=1.2)
            b.tunggu_kata("hasilnya")
            b.main(Write(b_bagi1c), run_time=1.4)
            b.main(FadeIn(t_1261, scale=0.5), FadeIn(l_1261), run_time=0.8)
        qc.periksa_adegan(self, {"judul": judul_hit, "awal": baris_awal,
                                 "hasil awal": awal_hasil, "h1": b_h1,
                                 "h1 pangkat": b_h1b, "h1 hasil": b_h1c,
                                 "bagi1": b_bagi1, "bagi1 pembagi": b_bagi1b,
                                 "bagi1 hasil": b_bagi1c},
                          hud=hud(ident, papan))

        with sinema.babak(self, "angka_h2", DURASI, kata=KATA) as b:
            b.tunggu_kata("diperkecil")
            b.main(FadeOut(b_h1), FadeOut(b_h1b), FadeOut(b_h1c),
                   FadeOut(b_bagi1), FadeOut(b_bagi1b), FadeOut(b_bagi1c),
                   run_time=0.8)
            b_h1 = rumus(r"h = 0{,}01:\quad 2{,}01^3 = 8{,}120601", 34, AKSEN2)
            b_h1.move_to([0, Y_KERJA - 0.35, 0])
            b.main(Write(b_h1), run_time=1.8)
            b.tunggu_kata("hasilnya")
            b_bagi1 = rumus(r"(8{,}120601 - 8) : 0{,}01 = 12{,}0601", 34, AKSEN2)
            b_bagi1.move_to([0, Y_KERJA - 1.15, 0])
            b.main(Write(b_bagi1), run_time=2.0)
            b_h1b = b_h1c = b_bagi1b = b_bagi1c = VGroup()

        t_1206 = Dot(garis.n2p(12.0601), radius=0.085).set_color(AKSEN2)
        l_1206 = rumus(r"12{,}06", 26, AKSEN2).next_to(t_1206, UP, buff=0.18)
        t_12 = Dot(garis.n2p(12), radius=0.10).set_color(SOROT)
        # DI BAWAH angka sumbu garis bilangan, pada ketinggian tetap. Di atas
        # garis ia menindih baris hitungan (terbaca "3 . 2^2 = 12(8,120601 - 8)
        # ..." pada detik 82); menempel di bawah titiknya ia menindih angka
        # sumbunya sendiri. Ketinggian -2,28 membuat tepi bawahnya -2,43, masih
        # di atas jalur subtitle yang mulai -2,55.
        l_12 = rumus(r"3 \cdot 2^2 = 12", 30, SOROT)
        l_12.move_to([garis.n2p(12)[0], -2.28, 0])

        with sinema.babak(self, "angka_dekat", DURASI, kata=KATA) as b:
            # 0,5 detik, bukan 0,9: kata "mendekati" jatuh pada detik 0,61
            # segmen ini, jadi animasi pendahulu yang lebih panjang membuat
            # pemicunya terlambat dan menggagalkan render.
            b.main(FadeIn(t_1206, scale=0.5), FadeIn(l_1206), run_time=0.5)
            b.tunggu_kata("mendekati")
            b.main(FadeIn(t_12, scale=0.5), run_time=0.8)
            b.tunggu_kata("tiga dikali")
            b.main(Write(l_12), run_time=1.6)
        # Baris hitungan masuk `tulisan`, BUKAN `zona`: qc mengadu tulisan
        # lawan tulisan, sedangkan zona cuma diperiksa muat di bingkai. Dengan
        # status zona, label yang menindih baris hitungan tidak tertangkap
        # gerbang mana pun, dan itulah yang terjadi pada percobaan pertama.
        qc.periksa_adegan(self, {},
                          hud=hud(ident, papan), dunia={"garis": garis},
                          tulisan={"judul": judul_hit, "awal": baris_awal,
                                   "hasil awal": awal_hasil, "h1": b_h1,
                                   "bagi1": b_bagi1, "12,61": l_1261,
                                   "12,06": l_1206, "12": l_12},
                          jaga_jalur_bawah=False)

        angka_semua = VGroup(judul_hit, baris_awal, awal_hasil, b_h1, b_bagi1,
                             t_1261, l_1261, t_1206, l_1206, t_12, l_12)

        # ============ belum bukti: angka bukan pembuktian ================ #
        catat = teks("angka saja belum membuktikan", 32, AKSEN).move_to([0, -0.2, 0])
        sinema.batasi_lebar(catat, 9.0)

        with sinema.babak(self, "belum_bukti", DURASI, kata=KATA) as b:
            b.tunggu_kata("belum membuktikan")
            b.main(FadeIn(catat, scale=0.9), run_time=1.2)
            b.tunggu_kata("huruf")
            b.main(FadeOut(angka_semua), FadeOut(garis), run_time=0.9)

        # ============ asal rumus: dibuktikan dengan huruf ================ #
        with sinema.babak(self, "huruf_awal", DURASI, kata=KATA) as b:
            # Yang ditulis pada kata "sebut" adalah x saja; x pangkat tiga baru
            # lahir pada kata "tingginya", sesuai urutan kalimatnya.
            b.tunggu_kata("sebut")
            baris1 = rumus(r"x", 46, TINTA).move_to([0, Y_KERJA + 0.5, 0])
            b.main(Write(baris1), run_time=0.8)
            b.tunggu_kata("tingginya")
            baris1 = sinema.ganti_rumus(self, baris1, r"x^3", b=b, run_time=1.2)
            ident3 = sinema.identitas(self, "merah = memuat h")
            ident3.set_opacity(0.0)
            b.main(FadeOut(catat), FadeOut(ident), run_time=0.5)
            b.main(ident3.animate.set_opacity(1.0), run_time=0.4)
            ident = ident3

        with sinema.babak(self, "huruf_tetangga", DURASI, kata=KATA) as b:
            b.tunggu_kata("geser")
            baris2 = sinema.ganti_rumus(self, baris1, r"(x+h)^3", b=b, run_time=1.6)
            b.tunggu_kata("tingginya")
            b.main(Indicate(baris2, color=TINTA), run_time=1.2)

        with sinema.babak(self, "jabar", DURASI, kata=KATA) as b:
            b.tunggu_kata("jabarannya")
            baris3 = sinema.ganti_rumus(self, baris2,
                                        r"x^3 + 3x^2h + 3xh^2 + h^3", b=b, run_time=2.4)
            b.main(Indicate(baris3, color=TINTA), run_time=1.2)
        qc.periksa_adegan(self, {"jabar": baris3}, hud=hud(ident, papan))

        with sinema.babak(self, "kurangi", DURASI, kata=KATA) as b:
            b.tunggu_kata("dikurangi")
            b.main(Indicate(baris3, color=REDUP), run_time=1.2)

        # Dipecah jadi DUA benda: yang kiri tidak memuat h, yang kanan memuat h.
        tetap = rumus(r"3x^2", 46, TINTA).move_to([-1.5, Y_KERJA + 0.5, 0])
        memuat = kanan_dari(tetap, r"+\ 3xh + h^2", 42, AKSEN)
        with sinema.babak(self, "sisa", DURASI, kata=KATA) as b:
            b.tunggu_kata("tersisa")
            sisa_penuh = sinema.ganti_rumus(self, baris3, r"3x^2h + 3xh^2 + h^3",
                                            b=b, run_time=1.8)

        with sinema.babak(self, "bagi_h", DURASI, kata=KATA) as b:
            b.tunggu_kata("dibagi")
            b.main(FadeOut(sisa_penuh), run_time=0.4)
            b.main(Write(tetap), run_time=0.9)  # irama Bian (14 Sep 2026)
            b.tunggu_kata("hasilnya")
            b.main(Write(memuat), run_time=1.8)
        qc.periksa_adegan(self, {"tetap": tetap, "memuat": memuat},
                          hud=hud(ident, papan))

        with sinema.babak(self, "dua_golongan", DURASI, kata=KATA) as b:
            b.tunggu_kata("satu suku")
            b.main(Indicate(tetap, color=TINTA), run_time=1.4)
            b.tunggu_kata("dua suku")
            b.main(Indicate(memuat, color=AKSEN), run_time=1.4)

        nilai_h = rumus(r"h \to 0", 34, AKSEN).move_to([0.4, Y_BAWAH + 0.3, 0])

        with sinema.babak(self, "lenyap", DURASI, kata=KATA) as b:
            b.tunggu_kata("didekatkan")
            b.main(FadeIn(nilai_h, shift=UP * 0.2), run_time=0.9)
            b.main(memuat.animate.scale(0.35).set_opacity(0.35), run_time=1.4)
            b.main(FadeOut(memuat), run_time=1.0)
            b.tunggu_kata("tidak bergerak")
            b.main(Indicate(tetap, color=TINTA), run_time=1.2)

        with sinema.babak(self, "hasil_tiga", DURASI, kata=KATA) as b:
            b.main(FadeOut(nilai_h), run_time=0.5)
            b.tunggu_kata("tiga eks kuadrat")
            tetap = sinema.ganti_rumus(self, tetap, r"(x^3)' = 3x^2", b=b, run_time=2.0)
            papan.baris(r"(x^3)' = 3x^2", warna=TINTA, b=b)
            b.tunggu_kata("dua belas")
            b.main(Indicate(tetap, color=TINTA), run_time=1.2)
        qc.periksa_adegan(self, {"hasil": tetap}, hud=hud(ident, papan))

        # ============ bentuk umum: polanya dijajarkan =================== #
        with sinema.babak(self, "empat", DURASI, kata=KATA) as b:
            b.tunggu_kata("eks pangkat empat")
            tetap = sinema.ganti_rumus(self, tetap, r"(x^4)' = 4x^3", b=b, run_time=2.0)
            papan.baris(r"(x^4)' = 4x^3", warna=TINTA, b=b)

        pola = VGroup(
            rumus(r"x \ \rightarrow\ 1", 34, TINTA),
            rumus(r"x^2 \ \rightarrow\ 2x", 34, TINTA),
            rumus(r"x^3 \ \rightarrow\ 3x^2", 34, TINTA),
            rumus(r"x^4 \ \rightarrow\ 4x^3", 34, TINTA),
        )
        pola.arrange(DOWN, buff=0.40, aligned_edge=LEFT).move_to([-2.6, -0.35, 0])

        with sinema.babak(self, "jajar_a", DURASI, kata=KATA) as b:
            b.main(FadeOut(tetap), run_time=0.5)
            b.tunggu_kata("jajarkan")
            b.main(FadeIn(pola[0], shift=RIGHT * 0.2), run_time=0.9)
            b.tunggu_kata("dua eks")
            b.main(FadeIn(pola[1], shift=RIGHT * 0.2), run_time=0.9)

        with sinema.babak(self, "jajar_b", DURASI, kata=KATA) as b:
            b.tunggu_kata("tiga eks kuadrat")
            b.main(FadeIn(pola[2], shift=RIGHT * 0.2), run_time=0.9)
            b.tunggu_kata("empat eks")
            b.main(FadeIn(pola[3], shift=RIGHT * 0.2), run_time=0.9)
        qc.periksa_adegan(self, {"pola": pola}, hud=hud(ident, papan))

        panah_turun = VGroup(*[
            Arrow(m.get_left() + LEFT * 0.15 + UP * 0.02,
                  m.get_left() + LEFT * 0.15 + DOWN * 0.02,
                  buff=0, thickness=2.0).set_color(SOROT) for m in pola[1:]])

        with sinema.babak(self, "pola_turun", DURASI, kata=KATA) as b:
            b.tunggu_kata("turun ke depan")
            b.main(LaggedStartMap(Indicate, pola, lag_ratio=0.25, color=SOROT),
                   run_time=2.2)

        with sinema.babak(self, "pola_kurang", DURASI, kata=KATA) as b:
            b.tunggu_kata("berkurang satu")
            b.main(Indicate(pola, color=SOROT), run_time=1.6)

        umum = rumus(r"(x^n)' = n\,x^{\,n-1}", 46, SOROT).move_to([2.9, 0.35, 0])
        sinema.batasi_lebar(umum, 5.0)

        with sinema.babak(self, "umum", DURASI, kata=KATA) as b:
            b.tunggu_kata("en dikali")
            b.main(Write(umum), run_time=2.2)
        qc.periksa_adegan(self, {"pola": pola, "umum": umum}, hud=hud(ident, papan))

        with sinema.babak(self, "pengali", DURASI, kata=KATA) as b:
            b.tunggu_kata("ikut terbawa")
            umum = sinema.ganti_rumus(self, umum, r"(a\,x^n)' = a\,n\,x^{\,n-1}",
                                      b=b, run_time=2.0)
            papan.baris(r"(ax^n)' = a\,n\,x^{n-1}", warna=SOROT, b=b)

        contoh = rumus(r"(5x^3)' = 5 \cdot 3 \cdot x^2 = 15x^2", 38, TINTA)
        contoh.move_to([0, -2.15, 0])
        sinema.batasi_lebar(contoh, 9.6)

        with sinema.babak(self, "contoh_lima", DURASI, kata=KATA) as b:
            b.tunggu_kata("contohnya")
            b.main(Write(contoh), run_time=2.6)
            b.tunggu_kata("hasilnya")
            b.main(Indicate(contoh, color=TINTA), run_time=1.4)
        qc.periksa_adegan(self, {"pola": pola, "umum": umum, "contoh": contoh},
                          hud=hud(ident, papan), jaga_jalur_bawah=False)

        # ============ turunan sebuah konstanta ========================== #
        konst = rumus(r"f(x) = 7", 42, TINTA).move_to([-3.4, 1.3, 0])
        datar = Line([-5.4, 0.1, 0], [-1.4, 0.1, 0]).set_stroke(AKSEN2, width=4.0)
        l_datar = sinema.label("mendatar", warna=AKSEN2).next_to(datar, DOWN, buff=0.30)
        nol = rumus(r"f'(x) = 0", 42, SOROT).move_to([2.6, -1.15, 0])

        with sinema.babak(self, "konstan", DURASI, kata=KATA) as b:
            b.main(FadeOut(pola), FadeOut(umum), FadeOut(contoh), run_time=0.8)
            b.tunggu_kata("cuma angka")
            b.main(Write(konst), run_time=1.4)
            b.tunggu_kata("garis mendatar")
            b.main(ShowCreation(datar), run_time=1.0)  # irama Bian (14 Sep 2026)
            b.main(FadeIn(l_datar, shift=UP * 0.2), run_time=0.5)

        with sinema.babak(self, "konstan_nol", DURASI, kata=KATA) as b:
            b.tunggu_kata("tidak menanjak")
            b.main(Indicate(datar, color=AKSEN2), run_time=1.2)
            # Dipicu "kemiringannya", bukan "turunannya": kata terakhir itu
            # jatuh sekitar 7 detik ke dalam kalimat sepanjang 8,2 detik, dan
            # menulis rumusnya sesudah itu melewati narasi 0,43 detik sehingga
            # gerbang waktu menolak render.
            b.tunggu_kata("kemiringannya")
            b.main(Write(nol), run_time=1.6)
            papan.baris(r"\text{tetapan}' = 0", warna=SOROT, b=b)
            # Papannya sudah berganti ke grafik tetapan, jadi identitasnya ikut
            # berganti. Berurutan, bukan silang: keduanya duduk di tempat sama.
            ident4 = sinema.identitas(self, "grafik sebuah tetapan")
            ident4.set_opacity(0.0)
            b.main(FadeOut(ident), run_time=0.4)
            b.main(ident4.animate.set_opacity(1.0), run_time=0.4)
            ident = ident4
        qc.periksa_adegan(self, {"konstan": konst, "nol": nol},
                          hud=hud(ident, papan), dunia={"garis datar": datar},
                          tulisan={"mendatar": l_datar})

        # ============ penutup =========================================== #
        tutup = teks("bukan hafalan: hitungan yang sama, diulang", 32, TINTA)
        tutup.move_to([0, -2.05, 0])
        sinema.batasi_lebar(tutup, 10.0)
        lanjut = teks("Video 5: menurunkan suku demi suku", 32, SOROT)
        lanjut.move_to([0, -2.05, 0])
        sinema.batasi_lebar(lanjut, 10.0)

        with sinema.babak(self, "tutup", DURASI, kata=KATA) as b:
            b.tunggu_kata("bukan hafalan")
            b.main(FadeIn(tutup, shift=UP * 0.2), run_time=1.4)
            b.tunggu_kata("hitungan yang sama")
            b.main(Indicate(tutup, color=TINTA), run_time=1.4)
            b.tunggu_kata("polanya terlihat")
            b.main(FadeOut(tutup), run_time=0.9)

        with sinema.babak(self, "lanjut", DURASI, kata=KATA) as b:
            b.tunggu_kata("video kelima")
            b.main(FadeIn(lanjut, shift=UP * 0.2), run_time=1.4)
            b.tunggu_kata("banyak suku")
            b.main(Indicate(lanjut, color=SOROT), run_time=1.4)
        qc.periksa_adegan(self, {"konstan": konst, "nol": nol},
                          hud=hud(ident, papan), dunia={"garis datar": datar},
                          tulisan={"mendatar": l_datar, "lanjut": lanjut})

        sinema.laporkan_pemicu(self)
