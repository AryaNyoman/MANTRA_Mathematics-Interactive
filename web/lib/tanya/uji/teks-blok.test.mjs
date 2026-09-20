import test from 'node:test'
import assert from 'node:assert/strict'
import { teksBlok, teksBacaan } from '../teks-blok.ts'

test('paragraf apa adanya, contoh jadi baris bersel', () => {
  assert.equal(teksBlok({ jenis: 'paragraf', teks: 'Turunan itu laju.' }), 'Turunan itu laju.')
  assert.equal(
    teksBlok({ jenis: 'contoh', judul: 'Dua titik', baris: ['x  f(x)', '1  3', '2  5'] }),
    'Contoh (Dua titik): x | f(x); 1 | 3; 2 | 5',
  )
})

test('bacaan lengkap memuat sesi, sering keliru, dan ringkasan', () => {
  const t = teksBacaan({
    penjelasan: [
      { jenis: 'sesi', judul: 'Mulai' },
      { jenis: 'sorot', teks: 'Inti.' },
      { jenis: 'poin', judul: 'Dua hal', butir: ['a - satu', 'b'] },
      { jenis: 'coba', teks: 'Geser.', langkah: ['tarik'] },
    ],
    seringKeliru: { judul: 'Bukan rumus', isi: 'Turunan bukan sekadar rumus.' },
    intisari: ['laju', 'kemiringan'],
  })
  assert.match(t, /## Mulai/)
  assert.match(t, /Kalimat kunci: Inti\./)
  assert.match(t, /Dua hal:\n- a - satu\n- b/)
  assert.match(t, /Yuk bereksperimen: Geser\.\n1\. tarik/)
  assert.match(t, /Sering keliru \(Bukan rumus\): Turunan bukan sekadar rumus\./)
  assert.match(t, /Ringkasan:\n- laju\n- kemiringan/)
})
