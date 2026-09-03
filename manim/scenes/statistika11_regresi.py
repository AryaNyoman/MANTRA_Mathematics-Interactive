"""Materi 11 Statistika: garis regresi dan residu (ManimGL).

Naskah: manim/narasi/statistika11-regresi.json (10 segmen, 110,0 detik)

GAGASAN POKOK. Sepuluh orang menarik sepuluh garis "yang paling pas", dan
semuanya kelihatan masuk akal. Video ini menjawabnya dengan cara yang tidak
bisa dilakukan halaman: garisnya benar-benar diputar di depan mata, dan angka
jumlah kuadrat residu diperlihatkan turun lalu naik lagi. Titik terendahnya
cuma satu, dan di situlah garis terbaiknya.

Angka yang dipakai persis angka halaman dan sudah diperiksa ulang:
    n = 10   Sx = 65   Sy = 700   Sxy = 4814   Sxx = 505
    b = 3,2  a = 49,2
    jumlah kuadrat residu: b=2,0 -> 146   b=2,6 -> 56,9   b=3,2 -> 27,2   b=3,8 -> 56,9
Keempat garis diputar mengelilingi titik pusat data (6,5 ; 70), jadi
perbandingannya adil: yang berubah cuma kemiringannya.

DUA KEPUTUSAN GAMBAR YANG DIBAYAR MAHAL DI RENDER PERTAMA.

1. Sumbu tegaknya dulu 45 sampai 105 supaya langit-langit nilai 100 muat.
   Akibatnya data yang cuma merentang 55 sampai 85 menempati separuh tinggi,
   dan RESIDUNYA, yang besarnya 0,2 sampai 3,2 poin, tinggal 2 sampai 8 piksel.
   Seluruh isi video ini residu, dan residunya tidak kelihatan. Sekarang sumbu
   utamanya 51 sampai 89 (data mengisi bingkai), dan babak terakhir berpindah
   ke sumbu 40 sampai 190. Perpindahan itu justru pelajarannya: begitu garis
   diteruskan ke 40 jam, datanya sendiri menciut jadi gerombolan di pojok.

2. Residu digambar sebagai BILAH berisi, bukan garis. Garis setipis itu di
   480p hilang; bilah selebar 0,12 satuan terbaca walau cuma 14 piksel tinggi.

KENAPA TIDAK ADA PERSEGI DI SINI. Materi 08 menggambar kuadrat sebagai persegi
yang tumbuh, dan itu tepat karena simpangannya besar. Di sini residunya terlalu
kecil: persegi bersisi segitu cuma beberapa piksel, dan menggambarnya di skala
lain berarti persegi yang sisinya BUKAN residu. Jadi yang dipakai bilah tegak
plus satu angka yang berubah, dan naskahnya sudah disesuaikan.

TATA LETAK (standar video versi 2):
    kiri atas  identitas benda, menetap
    kanan atas papan rumus, berubah lewat morph
    kaki layar milik subtitle, dijaga qc
    dalam gambar label maksimal dua kata

SATU WARNA SATU MAKNA DI DALAM VIDEO INI:
    AKSEN2 biru = residu POSITIF (titik di atas garis)
    AKSEN bata  = residu NEGATIF (titik di bawah garis), dan peringatan
    SOROT ungu  = garis regresi terbaik
    TINTA       = titik data dan tulisan
    REDUP       = sumbu, angka, dan garis tebakan yang belum terbukti

Kamera phi 90, tegak lurus, tidak pernah dimiringkan.
"""

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from gl import *  # noqa: E402,F403
from gl import kamera, qc, sinema  # noqa: E402

AKAR = Path(__file__).resolve().parents[2]
TOPIK = "statistika11-regresi"
DURASI = json.loads((AKAR / "audio" / TOPIK / "durasi.json").read_text(encoding="utf-8"))["segmen"]

# --- Data `t10-belajar` dari web/content/statistika/data.json (dinyatakan buatan).
DATA = [(2, 55), (3, 58), (4, 64), (5, 63), (6, 70), (7, 72), (8, 75), (9, 80), (10, 78), (11, 85)]
MEAN_X, MEAN_Y = 6.5, 70.0
B, A = 3.2, 49.2
JKR = {2.0: 146.0, 2.6: 56.9, 3.2: 27.2, 3.8: 56.9}
BATAS_NILAI = 100          # nilai ujian tidak mungkin lewat ini
JAM_JAUH = 40              # pengandaian ekstrapolasi
RAMAL_JAUH = 177.2         # 49,2 + 3,2 x 40

# --- Dua keadaan penggaris. `dekat` dipakai sembilan babak pertama, `jauh`
#     cuma babak terakhir. Keduanya: (skala x, pusat jam, skala y, dasar nilai)
SKALA = {
    "dekat": (0.7167, 6.0, 0.0647, 51.0),
    # Sumbu mendatar harus memuat 40 jam, sebab di situlah ramalannya
    # dihitung. Akibatnya data yang cuma 2 sampai 11 jam menciut jadi
    # gerombolan selebar 1,8 satuan di pojok kiri, dan itu memang
    # gambaran paling jujur tentang ekstrapolasi.
    "jauh": (0.1955, 22.0, 0.0164, 40.0),
}
ANGKA_X = {"dekat": [0, 2, 4, 6, 8, 10, 12], "jauh": [0, 10, 20, 30, 40]}
ANGKA_Y = {"dekat": [55, 65, 75, 85], "jauh": [40, 80, 120, 160]}

Z_DASAR = -1.08
Z_ANGKA = Z_DASAR - 0.32
X_SUMBU_Y = -4.72
Z_KAMERA = 0.50
TINGGI_BINGKAI = 6.4
LEBAR_BILAH = 0.12         # residu digambar sebagai bilah, bukan garis


def tegak(mob):
    """Berdirikan benda datar di bidang xz supaya menghadap kamera."""
    return mob.rotate(90 * DEGREES, RIGHT)


def koma(nilai, desimal=1):
    if desimal == 0:
        return str(int(round(nilai)))
    return f"{nilai:.{desimal}f}".rstrip("0").rstrip(".").replace(".", "{,}")


class Regresi11(AdeganMatra):
    samples = 4                        # penghalus tepi; bawaan ManimGL 0

    def construct(self):
        frame = self.frame
        papan = sinema.PapanRumus(self)
        DUNIA, HUD, TULISAN = {}, {}, {}
        HUD["identitas"] = sinema.identitas(self, "10 siswa", "jam belajar, nilai ujian")

        def taruh(nama, mob, tulisan=False):
            DUNIA[nama] = mob
            if tulisan:
                TULISAN[nama] = mob
            return mob

        def buang(*nama):
            for n in nama:
                DUNIA[n] = None
                TULISAN.pop(n, None)

        def periksa(pasangan=None):
            hidup_d = {k: v for k, v in DUNIA.items() if v is not None}
            hidup_h = {k: v for k, v in HUD.items() if v is not None}
            if papan.semua() is not None:
                hidup_h["papan rumus"] = papan.semua()
            qc.periksa_adegan(self, {}, pasangan=pasangan, hud=hidup_h,
                              dunia=hidup_d, jaga_jalur_bawah=True)
            hidup_t = [k for k, v in TULISAN.items() if v is not None]
            for i, a in enumerate(hidup_t):
                for c in hidup_t[i + 1:]:
                    qc.tidak_bertindih(frame, TULISAN[a], TULISAN[c], a, c)

        keadaan = {"nama": "dekat"}

        def xj(jam, nama=None):
            sx, pj, _, _ = SKALA[nama or keadaan["nama"]]
            return (jam - pj) * sx

        def zn(nilai, nama=None):
            _, _, sy, dn = SKALA[nama or keadaan["nama"]]
            return Z_DASAR + (nilai - dn) * sy

        # ------------------------------------------------------------------
        # Panggung: dua sumbu berangka, dibangun ulang untuk tiap keadaan.
        # ------------------------------------------------------------------
        def buat_sumbu(nama):
            g = VGroup()
            g.add(Line([xj(-0.8, nama), 0, Z_DASAR], [xj(ANGKA_X[nama][-1] + 0.8, nama), 0, Z_DASAR])
                  .set_stroke(REDUP, 2.4))
            g.add(Line([X_SUMBU_Y, 0, Z_DASAR], [X_SUMBU_Y, 0, zn(ANGKA_Y[nama][-1] + 3, nama)])
                  .set_stroke(REDUP, 2.4))
            for j in ANGKA_X[nama]:
                x = xj(j, nama)
                g.add(Line([x, 0, Z_DASAR], [x, 0, Z_DASAR - 0.10]).set_stroke(REDUP, 1.6))
                g.add(tegak(rumus(str(j), 20, REDUP)).move_to([x, 0, Z_ANGKA]))
            for v in ANGKA_Y[nama]:
                z = zn(v, nama)
                g.add(Line([X_SUMBU_Y, 0, z], [X_SUMBU_Y - 0.10, 0, z]).set_stroke(REDUP, 1.6))
                g.add(tegak(rumus(str(v), 20, REDUP)).move_to([X_SUMBU_Y - 0.38, 0, z]))
            return g

        sumbu_dekat = buat_sumbu("dekat")
        sumbu_jauh = buat_sumbu("jauh")

        def buat_titik(nama):
            g = VGroup()
            for j, v in DATA:
                d = Dot(radius=0.062).set_fill(TINTA, 1).set_stroke(LATAR, 1.0)
                g.add(tegak(d).move_to([xj(j, nama), 0, zn(v, nama)]))
            return g

        titik = buat_titik("dekat")
        titik_jauh = buat_titik("jauh")

        def garis_dari(b, a=None, dari=2.0, sampai=11.0, warna=REDUP, tebal=2.6, nama=None):
            """Garis y = a + b x. Tanpa `a`, garisnya lewat titik pusat data."""
            if a is None:
                a = MEAN_Y - b * MEAN_X
            g = Line([xj(dari, nama), 0, zn(a + b * dari, nama)],
                     [xj(sampai, nama), 0, zn(a + b * sampai, nama)])
            return g.set_stroke(warna, tebal)

        def bilah_residu(b_miring, nama=None):
            """Residu sebagai bilah berisi. Garis setipis ini hilang di 480p."""
            g = VGroup()
            a_potong = MEAN_Y - b_miring * MEAN_X
            for j, v in DATA:
                ramal = a_potong + b_miring * j
                warna = AKSEN2 if v >= ramal else AKSEN
                tinggi = abs(zn(v, nama) - zn(ramal, nama))
                r = Rectangle(width=LEBAR_BILAH, height=max(tinggi, 0.02))
                r.set_fill(warna, 0.95).set_stroke(warna, 1.0)
                g.add(tegak(r).move_to([xj(j, nama), 0, (zn(v, nama) + zn(ramal, nama)) / 2]))
            return g

        # ==================================================================
        # Babak 1 `buka`: sumbu, lalu sepuluh titik.
        # ==================================================================
        kamera.pasang_awal(frame, theta=0, phi=90, pusat=(0, 0, Z_KAMERA), tinggi=TINGGI_BINGKAI)
        with sinema.babak(self, "buka", DURASI) as b:
            sinema.judul_pembuka(self, "Materi 11: Garis regresi", lama=3.2, y=2.6)
            b.catat(3.2)
            taruh("sumbu", sumbu_dekat)
            b.main(FadeIn(sumbu_dekat), run_time=1.6)
            taruh("titik", titik)
            b.main(LaggedStartMap(FadeIn, titik, lag_ratio=0.14), run_time=3.6)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.8, color=TINTA, **kw),
                titik, lag_ratio=0.12), run_time=2.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 2 `banyak`: tiga garis berbeda, ketiganya masuk akal.
        # ==================================================================
        tebakan = VGroup(garis_dari(2.5), garis_dari(3.2), garis_dari(3.9))

        with sinema.babak(self, "banyak", DURASI) as b:
            taruh("tebakan", tebakan)
            for g in tebakan:
                b.main(ShowCreation(g), run_time=1.6)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.02, color=REDUP, **kw),
                tebakan, lag_ratio=0.2), run_time=2.0)
            b.main(FadeOut(tebakan[0]), FadeOut(tebakan[2]), run_time=1.2)
            b.jeda(1.2)
        periksa()

        # ==================================================================
        # Babak 3 `residu`: jarak TEGAK, bukan tegak lurus. Yang salah ikut
        # digambar sebentar supaya bedanya terlihat, lalu dibuang.
        # ==================================================================
        garis_uji = tebakan[1]
        j0, v0 = DATA[8]                          # siswa 10 jam, nilai 78
        ramal0 = MEAN_Y + 3.2 * (j0 - MEAN_X)     # 81,2, jadi residunya -3,2
        bilah_contoh = bilah_residu(3.2)[8].copy()
        l_tegak = tegak(sinema.label("tegak", 20, AKSEN))
        # Di samping bilah, label ini menindih titik data tetangga (render
        # keempat). Ditaruh di BAWAH bilahnya, tempat yang benar-benar kosong.
        l_tegak.move_to([xj(j0), 0, zn(v0) - 0.36])
        # Kaki tegak lurus dihitung di ruang DUNIA: tegak lurus di layar bukan
        # tegak lurus dalam satuan jam dan nilai, sebab skalanya berbeda.
        _p = np.array([xj(j0), zn(v0)])
        _q = np.array([xj(0.0), zn(A)])
        _d = np.array([xj(1.0) - xj(0.0), zn(A + B) - zn(A)])
        _kaki = _q + _d * float(np.dot(_p - _q, _d) / np.dot(_d, _d))
        ruas_serong = Line([_p[0], 0, _p[1]], [_kaki[0], 0, _kaki[1]]).set_stroke(REDUP, 2.6)

        with sinema.babak(self, "residu", DURASI) as b:
            b.main(Indicate(titik[8], scale_factor=2.2, color=TINTA), run_time=1.4)
            taruh("bilah contoh", bilah_contoh)
            b.main(GrowFromCenter(bilah_contoh), run_time=1.6)
            taruh("label tegak", l_tegak, tulisan=True)
            b.main(FadeIn(l_tegak), run_time=1.0)
            taruh("ruas serong", ruas_serong)
            b.main(ShowCreation(ruas_serong), run_time=1.4)
            b.main(FadeOut(ruas_serong), run_time=1.2)
            buang("ruas serong")
            b.main(Indicate(bilah_contoh, scale_factor=1.3, color=AKSEN), run_time=1.4)
            b.main(FadeOut(l_tegak), run_time=0.8)
            buang("label tegak")
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 4 `tanda`: kesepuluh residu, warnanya menyebut tandanya.
        # ==================================================================
        bilah = bilah_residu(3.2)

        with sinema.babak(self, "tanda", DURASI) as b:
            b.main(FadeOut(bilah_contoh), run_time=0.6)
            buang("bilah contoh")
            taruh("bilah", bilah)
            b.main(LaggedStartMap(GrowFromCenter, bilah, lag_ratio=0.12), run_time=3.4)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.3, color=m.get_color(), **kw),
                bilah, lag_ratio=0.1), run_time=2.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 5 `nol`: menjumlah gagal. Yang biru dan yang bata saling hapus.
        # ==================================================================
        biru = [bilah[i] for i, (j, v) in enumerate(DATA) if v >= MEAN_Y + 3.2 * (j - MEAN_X)]
        bata = [bilah[i] for i, (j, v) in enumerate(DATA) if v < MEAN_Y + 3.2 * (j - MEAN_X)]

        with sinema.babak(self, "nol", DURASI) as b:
            b.main(*[Indicate(m, scale_factor=1.35, color=AKSEN2) for m in biru], run_time=1.4)
            b.main(*[Indicate(m, scale_factor=1.35, color=AKSEN) for m in bata], run_time=1.4)
            sinema.lahir_rumus(self, r"\sum r = 0", bilah[4], papan, b=b, warna=REDUP)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 6 `kuadrat`: dikuadratkan lalu dijumlahkan. Satu angka.
        # ==================================================================
        # Residu terbesar: siswa 10 jam, nilai 78, ramalan 81,2, jadi -3,2.
        l_terbesar = tegak(rumus("r = -3{,}2", 19, AKSEN))
        l_terbesar.move_to([xj(10) + 0.92, 0, (zn(78) + zn(81.2)) / 2])

        with sinema.babak(self, "kuadrat", DURASI) as b:
            b.main(Indicate(bilah[8], scale_factor=1.4, color=AKSEN), run_time=1.2)
            taruh("residu terbesar", l_terbesar, tulisan=True)
            b.main(FadeIn(l_terbesar), run_time=0.8)
            sinema.ganti_rumus(self, papan.utama, r"\sum r^2 = 27{,}2", b=b,
                               run_time=1.6, papan=papan)
            b.main(LaggedStartMap(
                lambda m, **kw: Indicate(m, scale_factor=1.3, color=SOROT, **kw),
                bilah, lag_ratio=0.09), run_time=2.6)
            b.main(FadeOut(l_terbesar), run_time=0.8)
            buang("residu terbesar")
            b.main(Indicate(papan.utama, scale_factor=1.15, color=SOROT), run_time=1.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 7 `kecilkan`: garisnya diputar mengelilingi titik pusat data,
        # dan angkanya turun lalu naik lagi. Inilah kuadrat terkecil.
        # ==================================================================
        with sinema.babak(self, "kecilkan", DURASI) as b:
            for miring in (2.0, 2.6, 3.2, 3.8):
                b.main(Transform(garis_uji, garis_dari(miring)),
                       Transform(bilah, bilah_residu(miring)), run_time=1.4)
                sinema.ganti_rumus(self, papan.utama,
                                   rf"\sum r^2 = {koma(JKR[miring], 1)}", b=b,
                                   run_time=0.9, papan=papan)
            b.jeda(1.2)
        periksa()

        # ==================================================================
        # Babak 8 `rumus`: kembali ke 3,2 dan persamaannya ditulis.
        # ==================================================================
        garis_terbaik = garis_dari(B, A, warna=SOROT, tebal=3.4)

        with sinema.babak(self, "rumus", DURASI) as b:
            b.main(Transform(garis_uji, garis_terbaik),
                   Transform(bilah, bilah_residu(3.2)), run_time=1.6)
            sinema.ganti_rumus(self, papan.utama, r"\sum r^2 = 27{,}2", b=b,
                               run_time=1.0, papan=papan)
            papan.baris(r"b = 3{,}2", SOROT)
            b.catat(0.8)
            papan.baris(r"a = 49{,}2", SOROT)
            b.catat(0.8)
            papan.baris(r"\hat{y} = 49{,}2 + 3{,}2x", SOROT)
            b.catat(0.8)
            b.main(FadeOut(bilah), run_time=1.0)
            buang("bilah")
            b.main(Indicate(garis_uji, scale_factor=1.02, color=SOROT), run_time=1.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 9 `arti`: satu jam ke kanan, tiga koma dua ke atas.
        # ==================================================================
        j_a = 7
        tangga_datar = Line([xj(j_a), 0, zn(A + B * j_a)], [xj(j_a + 1), 0, zn(A + B * j_a)])
        tangga_datar.set_stroke(TINTA, 2.6)
        tangga_naik = Line([xj(j_a + 1), 0, zn(A + B * j_a)],
                           [xj(j_a + 1), 0, zn(A + B * (j_a + 1))]).set_stroke(TINTA, 2.6)
        l_satu = tegak(sinema.label("1 jam", 19, TINTA))
        l_satu.move_to([xj(j_a + 0.5), 0, zn(A + B * j_a) - 0.30])
        l_naik = tegak(rumus("3{,}2", 19, TINTA))
        l_naik.move_to([xj(j_a + 1) + 0.44, 0, zn(A + B * (j_a + 0.5))])

        with sinema.babak(self, "arti", DURASI) as b:
            taruh("tangga", VGroup(tangga_datar, tangga_naik))
            b.main(ShowCreation(tangga_datar), run_time=1.0)
            taruh("label satu jam", l_satu, tulisan=True)
            b.main(FadeIn(l_satu), run_time=0.8)
            b.main(ShowCreation(tangga_naik), run_time=1.0)
            taruh("label naik", l_naik, tulisan=True)
            b.main(FadeIn(l_naik), run_time=0.8)
            b.main(Indicate(VGroup(tangga_datar, tangga_naik), scale_factor=1.2,
                            color=TINTA), run_time=1.4)
            b.jeda(1.4)
        periksa()

        # ==================================================================
        # Babak 10 `jauh`: penggarisnya ditarik sampai 190, dan datanya sendiri
        # menciut jadi gerombolan di pojok. Itu gambaran paling jujur tentang
        # ekstrapolasi: ramalannya jauh di luar tempat datanya pernah ada.
        # ==================================================================
        garis_jauh = garis_dari(B, A, dari=0.0, sampai=JAM_JAUH, warna=SOROT, tebal=3.4,
                                nama="jauh")
        langit = DashedLine([xj(-1.0, "jauh"), 0, zn(BATAS_NILAI, "jauh")],
                            [xj(43.0, "jauh"), 0, zn(BATAS_NILAI, "jauh")])
        langit.set_stroke(AKSEN, 2.4)
        l_langit = tegak(sinema.label("batas 100", 19, AKSEN))
        l_langit.move_to([xj(30.0, "jauh"), 0, zn(BATAS_NILAI, "jauh") + 0.30])
        l_ramal = tegak(rumus("177{,}2", 20, AKSEN))
        l_ramal.move_to([xj(38.0, "jauh"), 0, zn(A + B * 38.0, "jauh") - 0.34])

        with sinema.babak(self, "jauh", DURASI) as b:
            b.main(FadeOut(VGroup(tangga_datar, tangga_naik)), FadeOut(l_satu),
                   FadeOut(l_naik), run_time=0.8)
            buang("tangga", "label satu jam", "label naik")
            keadaan["nama"] = "jauh"
            taruh("sumbu", sumbu_jauh)
            taruh("titik", titik_jauh)
            b.main(FadeOut(sumbu_dekat), FadeIn(sumbu_jauh),
                   *[Transform(a, c) for a, c in zip(titik, titik_jauh)],
                   Transform(garis_uji, garis_dari(B, A, 0.0, 12.0, SOROT, 3.4, "jauh")),
                   run_time=3.0)
            taruh("langit", VGroup(langit, l_langit))
            TULISAN["label langit"] = l_langit
            b.main(ShowCreation(langit), FadeIn(l_langit), run_time=1.6)
            taruh("garis jauh", garis_jauh)
            b.main(Transform(garis_uji, garis_jauh), run_time=2.0)
            taruh("angka ramalan", l_ramal, tulisan=True)
            b.main(FadeIn(l_ramal), run_time=1.0)
            b.main(Indicate(l_ramal, scale_factor=1.4, color=AKSEN), run_time=1.4)
            b.main(Indicate(langit, scale_factor=1.02, color=AKSEN), run_time=1.4)
            b.jeda(1.2)
        periksa()
