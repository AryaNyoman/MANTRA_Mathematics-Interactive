"""Gerbang mutu tata letak untuk ManimGL, sadar kamera 3D.

Dipakai DI DALAM adegan, di akhir tiap babak. Menangkap dua cacat yang paling
sering lolos dan paling merusak: objek keluar bingkai, dan dua objek saling
menindih. Untuk babak berkamera bergerak, panggil di sudut awal DAN akhir.

Cara kerja 3D: titik-titik objek diputar ke sumbu kamera saat itu, lalu
diskalakan ke satuan layar (bingkai 14,22 x 8). Perspektif ManimGL diabaikan,
jadi ini perkiraan; margin dinaikkan dan lembar kontak `cek_video.py` tetap
gerbang akhir. Objek `fix_in_frame` sudah dalam satuan layar.
"""

import numpy as np
from manimlib import *


class CacatTataLetak(AssertionError):
    """Tata letak melanggar aturan. Sengaja menggagalkan render."""


def _titik(mob):
    # Alas kertas HUD (`sinema.alas_hud`) ditandai `dekorasi` dan TIDAK ikut
    # diukur: ia sengaja dirapatkan sampai tepi bingkai supaya terbaca
    # sebagai panel sudut, bukan stiker melayang. Yang diukur gerbang tetap
    # tulisannya, dan tulisan itu selalu di dalam zona HUD.
    fam = [m for m in mob.get_family()
           if len(m.get_points()) and not getattr(m, "dekorasi", False)]
    if not fam:
        return np.zeros((0, 3))
    return np.vstack([m.get_points() for m in fam])


def ke_layar(frame, mob):
    """Kotak batas objek (kiri, kanan, bawah, atas) dalam satuan layar dari kamera saat ini."""
    p = _titik(mob)
    if len(p) == 0:
        return None
    if mob.is_fixed_in_frame():
        q = p
    else:
        rot = frame.get_inverse_camera_rotation_matrix()
        q = (p - frame.get_center()) @ rot.T
        q = q * (FRAME_HEIGHT / frame.get_height())
    return q[:, 0].min(), q[:, 0].max(), q[:, 1].min(), q[:, 1].max()


def muat_di_bingkai(frame, *mobs, margin: float = 0.3, nama: str = ""):
    """Pastikan tiap objek berada di dalam layar, dengan jarak aman `margin`."""
    bx, by = FRAME_WIDTH / 2 - margin, FRAME_HEIGHT / 2 - margin
    for i, m in enumerate(mobs):
        k = ke_layar(frame, m)
        if k is None:
            continue
        kiri, kanan, bawah, atas = k
        keluar = []
        if kiri < -bx:
            keluar.append(f"kiri {kiri:.2f} < {-bx:.2f}")
        if kanan > bx:
            keluar.append(f"kanan {kanan:.2f} > {bx:.2f}")
        if bawah < -by:
            keluar.append(f"bawah {bawah:.2f} < {-by:.2f}")
        if atas > by:
            keluar.append(f"atas {atas:.2f} > {by:.2f}")
        if keluar:
            raise CacatTataLetak(f"{nama or f'objek#{i}'} keluar bingkai: " + "; ".join(keluar))


def tidak_bertindih(frame, a, b, nama_a: str = "A", nama_b: str = "B", toleransi: float = 0.05):
    """Pastikan kotak batas dua objek, dilihat dari kamera, tidak beririsan."""
    if a is None or b is None:
        return
    ka, kb = ke_layar(frame, a), ke_layar(frame, b)
    if ka is None or kb is None:
        return
    tx = min(ka[1], kb[1]) - max(ka[0], kb[0])
    ty = min(ka[3], kb[3]) - max(ka[2], kb[2])
    if tx > toleransi and ty > toleransi:
        raise CacatTataLetak(
            f"{nama_a} menindih {nama_b} (irisan {tx:.2f} x {ty:.2f} satuan layar)")


def jalur_bawah_kosong(frame, zona: dict, batas_atas: float = -2.55):
    """Jalur bawah layar dipesan untuk subtitle: tidak boleh ada apa pun di sana.

    Sejak video MATRA punya subtitle penuh, menulis keterangan di bawah layar
    berarti dua kalimat berbeda untuk satu maksud yang sama. Keputusan ARYA
    2 Sep 2026. Pemeriksaan ini yang menegakkannya, bukan ingatan penulis adegan.
    """
    for nama, m in zona.items():
        k = ke_layar(frame, m)
        if k is None:
            continue
        if k[2] < batas_atas:
            raise CacatTataLetak(
                f"{nama} masuk jalur subtitle di bawah layar "
                f"(bawah {k[2]:.2f} < {batas_atas:.2f}). Jalur itu milik subtitle; "
                f"pindahkan: rumus ke panel KANAN atas, identitas ke KIRI atas, atau geser dunianya ke atas.")


class BendaTertinggal(CacatTataLetak):
    """Benda babak sebelumnya masih terpasang saat babak baru dimulai."""


def _terpasang(scene, mob) -> bool:
    """Apakah `mob` masih tergambar: sendiri, atau sebagai anak benda lain."""
    for atas in list(getattr(scene, "mobjects", [])):
        keluarga = atas.get_family() if hasattr(atas, "get_family") else [atas]
        if any(x is mob for x in keluarga):
            return True
    return False


def pastikan_hilang(scene, benda: dict, nama: str = ""):
    """Gagalkan render kalau benda babak sebelumnya masih terpasang di adegan.

    KENAPA INI ADA
    `periksa_adegan` hanya memeriksa benda yang DISERAHKAN kepadanya, jadi benda
    yang lupa dibuang tidak melanggar apa pun: ia cuma tetap tergambar, diam
    diam. Video Integral 05 (8 Sep 2026) menyisakan daerah berwarna milik contoh
    sebelumnya selama dua babak terakhir; karena titiknya dihitung dari bidang
    LAMA, begitu kamera terbang ke bidang baru ia jadi segitiga pucat raksasa
    yang menutupi separuh layar di belakang panel rumus, membantah narasinya
    sendiri. Semua gerbang lolos; yang menemukannya cuma membuka frame detik 102.

    Panggil pada tiap pergantian bidang, kamera, atau babak besar, dan sebut
    sendiri apa yang seharusnya sudah hilang:

        qc.pastikan_hilang(self, {"bidang lama": bidang, "daerah lama": daerah})

    Nilai `None` diabaikan, jadi benda yang memang tidak selalu dibuat boleh
    ikut disebut tanpa penjagaan tambahan di adegan.
    """
    tersisa = [n for n, m in benda.items() if m is not None and _terpasang(scene, m)]
    if tersisa:
        di = f" pada {nama}" if nama else ""
        raise BendaTertinggal(
            f"benda babak lama masih di layar{di}: " + ", ".join(tersisa) +
            ". Tambahkan FadeOut-nya pada pergantian babak; benda yang titiknya "
            "dihitung dari bidang lama akan tertinggal di tempatnya saat kamera pindah.")


def daun_angka(kelompok, dalam: int = 0) -> list:
    """Angka sumbu SATU PER SATU, bukan kelompoknya.

    `bidang_bernomor` menyimpan angkanya sebagai kelompok berlapis: satu
    kelompok untuk sumbu x, satu untuk sumbu y, masing-masing berisi angkanya.
    Kotak batas tiap kelompok membentang sepanjang sumbunya, jadi mengadu
    tulisan dengan KELOMPOK akan menolak tulisan mana pun yang berdiri di dalam
    bidang. Yang dilarang adalah menindih SATU angka, jadi lapisannya diratakan
    dulu sampai angkanya sendiri.
    """
    if dalam < 4 and type(kelompok).__name__ in ("VGroup", "Group"):
        hasil = []
        for anak in getattr(kelompok, "submobjects", []):
            hasil.extend(daun_angka(anak, dalam + 1))
        return hasil
    return [kelompok]


def periksa_adegan(scene, zona: dict, pasangan: list | None = None, margin: float = 0.3,
                   hud: dict | None = None, dunia: dict | None = None,
                   jaga_jalur_bawah: bool = True, tulisan: dict | None = None,
                   periksa_isi: bool = True):
    """Pemeriksaan sekali jalan dari sudut kamera adegan saat ini.

    zona      : {"nama": mobject}, semua diperiksa agar muat di bingkai
    pasangan  : [("nama_a", "nama_b"), ...], pasangan yang tidak boleh bertindih
    hud       : {"nama": panel}, panel yang menempel di layar
    dunia     : {"nama": benda}, benda di dunia 3D
    tulisan   : {"nama": teks}, TULISAN di dunia. Diperiksa silang satu sama lain,
                terhadap HUD, dan terhadap ANGKA SUMBU benda dunia. Benda dunia
                boleh bersentuhan (orang berdiri di papan, label menempel di
                bendanya), tetapi tulisan yang menindih tulisan selalu cacat,
                dan angka sumbu adalah tulisan juga. Tulisan yang bertanda
                `beralas` dikecualikan dari adu lawan angka sumbu: alas
                kertasnya menutup angka di belakangnya.
    periksa_isi : kelompok HUD yang bertanda `_qc_isi` (mis. `PapanRumus.semua()`)
                diperiksa ISINYA satu sama lain, baris lawan baris.
    jaga_jalur_bawah : gagalkan render kalau ada objek masuk jalur subtitle

    `hud` dan `dunia` diperiksa SILANG semuanya, tidak perlu disebut satu per
    satu. Itu sebabnya keduanya ada: pada 2 Sep 2026 sebuah panel menindih garis
    bilangan dan lolos, semata karena penulis adegan lupa menuliskan pasangan
    "panel B" dengan "garis B". Daftar pasangan manual selalu punya lubang;
    perkalian silang tidak.

    DUA LUBANG yang ditutup 4 Sep 2026, ditemukan terpisah oleh sesi Statistika
    dan Ruang 3D:
    1. Dunia lawan dunia tidak diperiksa, jadi label "9 karyawan" yang duduk
       persis di atas label x-bar lolos. Sekarang ada `tulisan=`.
    2. Apa pun yang diserahkan sebagai SATU benda tidak diperiksa isinya, jadi
       dua baris papan rumus yang bertindih persis lolos. Sekarang kelompok
       yang bertanda `_qc_isi` diperiksa baris demi baris. Tanda itu dipasang
       otomatis oleh `PapanRumus.semua()`; kelompok HUD buatan sendiri boleh
       memasangnya juga: `g._qc_isi = True`.
    """
    frame = scene.frame
    semua = dict(zona)
    semua.update(hud or {})
    semua.update(dunia or {})
    semua.update(tulisan or {})
    for nama, m in semua.items():
        muat_di_bingkai(frame, m, margin=margin, nama=nama)
    for a, b in pasangan or []:
        tidak_bertindih(frame, semua.get(a), semua.get(b), a, b)
    for na, pa in (hud or {}).items():
        for nd, pd in (dunia or {}).items():
            # HUD yang punya alas kertas (`sinema.alas_hud`) boleh berdiri di
            # atas LATAR, dan hanya latar: bidang bernomor, kisi, sumbu.
            # Alasnya menutup garis petak di belakangnya, jadi tulisannya
            # tetap bersih, dan bidang tidak perlu menyusut demi memesan
            # jalur layar.
            #
            # Pengecualian ini SENGAJA sempit. Versi pertama melewati SEMUA
            # pasangan begitu HUD-nya beralas, dan itu membuka lubang yang
            # lebih buruk daripada yang ditutupnya: sebuah titik, panah, atau
            # label yang kebetulan berada di bawah panel tidak akan pernah
            # ketahuan, padahal gambar yang menyembunyikan isinya sendiri
            # adalah kelas cacat yang paling merusak. Temuan MASTER 4 Sep.
            if getattr(pa, "beralas", False) and getattr(pd, "latar", False):
                continue
            tidak_bertindih(frame, pa, pd, na, nd)
    daftar_tulisan = list((tulisan or {}).items())
    # Angka sumbu dikumpulkan sekali di luar perulangan. Ia menumpang di dalam
    # benda `dunia`, tetapi ia TULISAN, jadi ia diadu dengan aturan tulisan.
    angka_sumbu = []
    for nd, pd in (dunia or {}).items():
        kel = getattr(pd, "angka", None)
        if kel is not None:
            angka_sumbu.extend((nd, satu) for satu in daun_angka(kel))
    for i, (na, ta) in enumerate(daftar_tulisan):
        for nb, tb in daftar_tulisan[i + 1:]:
            tidak_bertindih(frame, ta, tb, f"tulisan {na}", f"tulisan {nb}")
        for nh, ph in (hud or {}).items():
            tidak_bertindih(frame, ta, ph, f"tulisan {na}", nh)
        # LUBANG YANG DITUTUP 7 Sep 2026, ditemukan sesi Turunan pada videonya
        # sendiri, dua kali berturut-turut. Tulisan diadu dengan tulisan dan
        # dengan HUD, tetapi TIDAK dengan angka sumbu, sebab angka sumbu bagian
        # dari `bidang_bernomor` yang didaftarkan sebagai `dunia`, dan benda
        # dunia memang boleh bersentuhan. Akibatnya blok "jarak h = 0,51" yang
        # duduk persis di baris angka sumbu terbaca "1 jarak h2 = 0,51" dan
        # LOLOS gerbang. Yang menemukannya lembar kontak, bukan alat, dan itu
        # persis kegagalan yang gerbang ini ada untuk mencegahnya.
        #
        # Pengecualiannya sama persis dengan pengecualian HUD beralas: tulisan
        # yang punya alas kertas menutup angka di belakangnya, jadi ia memang
        # boleh berdiri di atasnya. Tanpa pengecualian ini, cara yang BENAR
        # untuk membereskan tindihan justru ikut ditolak. Tanda `beralas` hanya
        # memutihkan adu lawan angka sumbu; tulisan lawan tulisan dan tulisan
        # lawan HUD tetap berlaku penuh.
        if getattr(ta, "beralas", False):
            continue
        for nd, satu in angka_sumbu:
            tidak_bertindih(frame, ta, satu, f"tulisan {na}", f"angka sumbu {nd}")
    if periksa_isi:
        for nama, g in (hud or {}).items():
            if not getattr(g, "_qc_isi", False):
                continue
            # Alas kertas HUD (`sinema.alas_hud`) memang menindih semua
            # baris di atasnya, itu tugasnya. Ia bertanda `dekorasi` dan
            # tidak ikut diadu.
            anak = [a for a in getattr(g, "submobjects", [])
                    if not getattr(a, "dekorasi", False)]
            for i, a in enumerate(anak):
                for j in range(i + 1, len(anak)):
                    tidak_bertindih(frame, a, anak[j], f"{nama} baris {i + 1}", f"{nama} baris {j + 1}")
    if jaga_jalur_bawah:
        jalur_bawah_kosong(frame, semua)
