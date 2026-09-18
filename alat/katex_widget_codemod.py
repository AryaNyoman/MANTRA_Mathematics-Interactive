"""
Codemod sekali pakai (18 Sep 2026): membungkus teks tabel angka, cap, dan
catatan di berkas Panggung*.tsx dan widget dengan <TeksMat> supaya rumusnya
tertata KaTeX seperti bank soal (permintaan ARYA).

Yang diubah (hanya kalau isinya TIDAK mengandung tag JSX lain):
  <td>ISI</td>                       -> <td><TeksMat teks={`ISI`} blok={false} /></td>
  <div className="cap">ISI</div>     -> <div className="cap"><TeksMat teks={`ISI`} blok={false} /></div>
  <div className="catatan">ISI</div> -> <div className="catatan"><TeksMat teks={`ISI`} /></div>
ISI boleh berisi {ekspresi}: menjadi ${ekspresi} di dalam template literal.
Teks JSX yang dipecah beberapa baris digabung dengan satu spasi (perilaku
JSX), entitas &quot; &amp; &lt; &gt; &nbsp; dikembalikan ke hurufnya.
Sel yang isinya HANYA angka/ekspresi tanpa huruf dibiarkan (tidak perlu
KaTeX, dan menghindari render ulang tiap gerakan penggeser).

Pakai:  python alat/katex_widget_codemod.py web/components/topik/PanggungLimit.tsx ...
Berkas yang belum mengimpor TeksMat diberi baris impor.
"""
import io, re, sys

EKSPRESI = '--ekspresi' in sys.argv
ENTITAS = {'&quot;': '"', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&nbsp;': ' ', '&apos;': "'", '&#39;': "'"}
IMPOR = "import TeksMat from '@/components/latihan/TeksMat'\n"


def akhir_tag(t, i, tutup):
    """Cari indeks awal `tutup` yang sepadan mulai dari i, dengan menghormati
    kurung kurawal {…} dan string di dalamnya. Kembalikan -1 kalau isi
    mengandung tag JSX lain."""
    dalam = 0
    j = i
    n = len(t)
    while j < n:
        c = t[j]
        if dalam == 0 and t.startswith(tutup, j):
            return j
        if c == '{':
            dalam += 1
        elif c == '}':
            dalam -= 1
        elif dalam == 0 and c == '<':
            return -1  # tag bersarang
        elif dalam > 0 and c in ('"', "'", '`'):
            # lewati string di dalam ekspresi
            k = j + 1
            while k < n and t[k] != c:
                if t[k] == '\\':
                    k += 1
                k += 1
            j = k
        j += 1
    return -1


def ubah_isi(isi):
    """JSX children -> template literal. Kembalikan None kalau tidak perlu."""
    bagian = []
    j = 0
    n = len(isi)
    ada_huruf = False
    while j < n:
        if isi[j] == '{':
            dalam = 1
            k = j + 1
            while k < n and dalam:
                c = isi[k]
                if c == '{':
                    dalam += 1
                elif c == '}':
                    dalam -= 1
                elif c in ('"', "'", '`'):
                    m = k + 1
                    while m < n and isi[m] != c:
                        if isi[m] == '\\':
                            m += 1
                        m += 1
                    k = m
                k += 1
            ekspr = isi[j + 1:k - 1].strip()
            if ekspr.startswith('/*') or ekspr.startswith('//'):
                j = k
                continue
            if ekspr in ("' '", '" "'):
                bagian.append(('teks', ' '))
            else:
                bagian.append(('ekspr', ekspr))
                if re.search(r"['\"`][^'\"`]*[A-Za-z][^'\"`]*['\"`]", ekspr):
                    ada_huruf = True
            j = k
        else:
            k = isi.find('{', j)
            if k == -1:
                k = n
            teks = isi[j:k]
            bagian.append(('teks', teks))
            j = k
    # Rapikan teks seperti JSX: baris digabung, spasi ujung baris dibuang
    keluar = []
    for jenis, v in bagian:
        if jenis == 'ekspr':
            keluar.append('${' + v + '}')
        else:
            baris = v.split('\n')
            if len(baris) > 1:
                rapi = []
                for b_i, b in enumerate(baris):
                    s = b.strip() if 0 < b_i < len(baris) - 1 else (b.rstrip() if b_i == 0 else b.lstrip())
                    rapi.append(s)
                v = ' '.join(x for x in rapi if x != '')
                # baris pertama/terakhir yang kosong dibuang oleh join di atas
            for e, h in ENTITAS.items():
                v = v.replace(e, h)
            if re.search(r'[A-Za-zͰ-Ͽ]', v):
                ada_huruf = True
            keluar.append(v.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${'))
    hasil = ''.join(keluar).strip()
    if not hasil:
        return None
    if not ada_huruf:
        # Tahap kedua (--ekspresi): sel yang isinya ekspresi data. Satu
        # ekspresi angka murni (angka(...), bulat(...), .length, n + 1)
        # dibiarkan; ekspresi teks (nama, rumus dari data) dan gabungan
        # beberapa bagian (persamaan, pasangan koordinat) dibungkus.
        if not EKSPRESI:
            return None
        ekspr = [v for j, v in bagian if j == 'ekspr']
        teks_lit = ''.join(v for j, v in bagian if j == 'teks').strip()
        if len(ekspr) == 1 and not teks_lit:
            e = ekspr[0]
            if re.match(r'^(angka|bulat|angka3|angkaTetap|koma)\(', e) or e.endswith('.length') or re.match(r'^[A-Za-z_.\[\]]+$', e) and e.split('.')[-1] in ('n', 'f', 'length') or re.match(r'^[a-z]\d?$', e) or re.match(r'^n \+ 1$', e):
                return None
        if len(ekspr) >= 1 and all(re.match(r'^(angka|bulat|angka3|angkaTetap)\(', e) for e in ekspr) and re.fullmatch(r'[\s%°]*', teks_lit):
            return None
    return hasil


def proses(t):
    ubah = 0
    keluar = []
    i = 0
    pola = re.compile(r'<td>|<div className="cap">|<div className="catatan">|<Petunjuk>')
    while True:
        m = pola.search(t, i)
        if not m:
            keluar.append(t[i:])
            break
        buka = m.group(0)
        tutup = '</td>' if buka == '<td>' else '</Petunjuk>' if buka == '<Petunjuk>' else '</div>'
        awal_isi = m.end()
        akhir = akhir_tag(t, awal_isi, tutup)
        if akhir == -1:
            keluar.append(t[i:m.end()])
            i = m.end()
            continue
        isi = t[awal_isi:akhir]
        # Petunjuk bertuliskan teks polos sudah ditata komponennya sendiri;
        # yang perlu dibungkus hanya yang menyisipkan ekspresi.
        if buka == '<Petunjuk>' and '{' not in isi:
            keluar.append(t[i:akhir])
            i = akhir
            continue
        if 'TeksMat' in isi:
            keluar.append(t[i:akhir])
            i = akhir
            continue
        baru = ubah_isi(isi)
        if baru is None:
            keluar.append(t[i:akhir])
            i = akhir
            continue
        blok = '' if buka == '<div className="catatan">' else ' blok={false}'
        if '${' in baru:
            teks = '{`' + baru + '`}'
        else:
            teks = '"' + baru.replace('\\`', '`').replace('\\${', '${').replace('\\\\', '\\') + '"' if '"' not in baru else '{`' + baru + '`}'
        keluar.append(t[i:m.end()] + '<TeksMat teks=' + teks + blok + ' />')
        i = akhir
        ubah += 1
    return ''.join(keluar), ubah


for p in [a for a in sys.argv[1:] if not a.startswith('--')]:
    t = io.open(p, encoding='utf-8').read()
    baru, n = proses(t)
    if n and 'components/latihan/TeksMat' not in baru:
        # sisipkan impor sesudah baris impor terakhir yang berawalan "import "
        baris = baru.split('\n')
        terakhir = max(i for i, b in enumerate(baris) if b.startswith('import ') or b.startswith("} from '"))
        baris.insert(terakhir + 1, IMPOR.rstrip('\n'))
        baru = '\n'.join(baris)
    if n:
        io.open(p, 'w', encoding='utf-8', newline='\n').write(baru)
    print(f'{p}: {n} diubah')
