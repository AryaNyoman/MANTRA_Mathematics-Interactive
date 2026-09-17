import { ViewTransition, type ReactNode } from 'react'

/**
 * Pembungkus isi tiap halaman untuk pindah halaman berarah (sistem gerak
 * Panggung, 17 Sep 2026). Dipasang di TIAP page.tsx (dan not-found), bukan di
 * layout: layout bertahan antar rute, jadi `enter` dan `exit` tidak pernah
 * berjalan di sana.
 *
 * `<ViewTransition>` React memberi potret halaman yang pergi kelas
 * `panggung-keluar` dan potret halaman yang datang kelas `panggung-masuk`;
 * geraknya ada di globals.css bagian "A. Pindah halaman", arahnya dari
 * `html[data-arah]` yang ditulis ArahRute. `default="none"` mematikan
 * animasi untuk perubahan lain di dalam halaman yang sama (misalnya
 * `?tingkat=` di bank soal): itu bukan pindah halaman.
 *
 * Tidak ada `experimental.viewTransition` di next.config: Next 16.3 sudah
 * menyediakan `ViewTransition` di App Router tanpa pengaturan, dan bendera
 * itu sudah tidak dikenal.
 */
export default function Panggung({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="panggung-masuk" exit="panggung-keluar" default="none">
      {children}
    </ViewTransition>
  )
}
