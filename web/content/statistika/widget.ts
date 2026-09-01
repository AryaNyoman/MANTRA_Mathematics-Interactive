/**
 * Nama widget Statistika, diketatkan sebagai tipe.
 *
 * Tanpa ini, salah ketik nama widget baru ketahuan saat halamannya dibuka dan
 * panggungnya diam saja tanpa pesan apa pun. Dengan ini, TypeScript menolaknya
 * sebelum dijalankan. Pola ini ditiru dari topik Limit, yang menaruh senarai
 * serupa di berkas tahapnya.
 *
 * Dipisah ke berkas sendiri karena dipakai tiga berkas isi sekaligus, dan
 * panggung juga membacanya. Kalau ia menumpang di salah satu berkas isi, ketiga
 * berkas itu jadi saling mengimpor tanpa alasan.
 */

export type WidgetStatistika =
  | 'dua-kelompok'
  | 'bentuk-data'
  | 'lebar-kelas'
  | 'frekuensi-relatif'
  | 'tiga-ukuran'
  | 'tarik-pencilan'
  | 'kotak-garis'
  | 'jarak-ke-rata'
  | 'data-kelompok'
  | 'diagram-pencar'
  | 'garis-regresi'
  | 'kekuatan-hubungan'
  | 'sumbu-jujur'
