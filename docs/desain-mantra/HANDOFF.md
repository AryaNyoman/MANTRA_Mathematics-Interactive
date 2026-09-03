# Handoff: MANTRA — Matematika Interaktif (situs belajar matematika SMA)

## Overview

MANTRA is an Indonesian-language mathematics learning site for senior-high (SMA) students, grades 10–12. Every topic is taught by **first showing why a formula exists** (a rendered Manim animation) and then **handing the student a tool to test it** (an interactive widget), followed by tiered practice questions and a scored quiz.

This handoff covers a full visual + interaction redesign of an existing Next.js site. Two things changed structurally versus the old site:

1. **Four-level content hierarchy** — Kelas → Bab → Sub-bab → Materi. Previously the topic page exposed ten unnamed tabs ("MATERI 01…10"); now sub-chapters follow the Kurikulum Merdeka textbook and materi carry readable titles in a collapsible tree sidebar.
2. **Homepage is an introduction**, not a list. The chapter list moved to its own "Peta Materi" tab.

Brand name changed from **MATRA** to **MANTRA** (subtitle: *Matematika Interaktif*). New logo included.

## About the Design Files

The files in this bundle are **design references created in HTML** — prototypes that show intended look and behaviour. They are **not production code to copy**. `MANTRA.dc.html` is authored in a proprietary streaming-template format (`<sc-for>`, `<sc-if>`, `{{ }}` holes, a `Component extends DCLogic` class) that only runs inside the design tool; `support.js` is that runtime.

**The task is to recreate these designs in the target codebase** — this project's real implementation is **Next.js (App Router) + React + TypeScript + Tailwind**, at `web/` in the MANIM-MATRA repository — using its established patterns:

- `web/content/<topik>/tahap.ts` holds the real teaching copy (10 materi per topic, each with `judul`, `labelPendek`, `pertanyaan`, and `blok[]` explanation blocks). **Do not rewrite this copy** — the redesign only regroups it into sub-chapters and re-skins it. The prototype contains excerpts of materi 01–02 verbatim and short placeholders for 03–10.
- `web/components/topik/HalamanTopik.tsx` is the current one-screen topic page; the sidebar tree replaces its tab strip.
- `web/lib/latihan-kemajuan.ts` already implements progress + level unlocking in `localStorage` — the practice UI in this design should bind to it rather than reimplement it.
- Interactive widgets (`PanggungTrigonometri.tsx` etc.) are hand-written SVG. **Their internal colors are out of scope and must not be changed** (side/axis colors are matched to the Manim videos: samping `#3A6EA5`, depan `#C25E4D`, miring `#1F2430`, sudut `#6A4C93`).

No accounts, no database: all progress lives in the student's own browser.

## Fidelity

**High-fidelity.** Colors, typography, spacing, radii, animation durations and easing below are final and exact. Recreate pixel-for-pixel with the codebase's own component and styling conventions (Tailwind classes / CSS variables rather than inline styles).

Layouts are fluid: the desktop design was authored at 906–1366px content width with `max-width` wrappers; the phone frames are authored at **360×760** (Android reference).

---

## Design Tokens

### Colors

| Token | Hex | Use |
| --- | --- | --- |
| `bg` | `#FAF9F5` | page ground (warm near-white) |
| `surface` | `#FFFFFF` | cards, panels, sticky nav fill |
| `surface-sunken` | `#FAF9F5` | sidebar, visual well, pembahasan panel |
| `ink` | `#101A2B` | primary text, dark buttons |
| `ink-72` | `rgba(16,26,43,.72)` | body copy |
| `ink-62` | `rgba(16,26,43,.62)` | secondary / breadcrumb |
| `ink-50` | `rgba(16,26,43,.5)` | eyebrow, meta |
| `line` | `rgba(16,26,43,.12)` | hairline borders, card outline |
| `line-strong` | `rgba(16,26,43,.18)` | button outline |
| `emas` (gold, primary accent) | `#B08A3E` | primary buttons, active tab underline, rings, checkmark-adjacent accents |
| `emas-tua` | `#8A6A28` | gold text on light fill (contrast-safe) |
| `emas-10 / emas-14` | `rgba(176,138,62,.10 / .14)` | active row + hover tints |
| `biru` | `#2B4B8F` | kickers, "animasi" emphasis, second hero curve |
| `hijau` | `#6E9C7A` | success: completed-materi checkmarks, progress-bar tail, quiz result ring |
| `jingga` | `#E8582C` | wrong answer, "interaksi" emphasis, travelling dot |
| `wa-hijau` | `#25D366` / `#128C4A` | WhatsApp button hover border / text |

Grid background: `repeating-linear-gradient` 1px lines at **8% ink** (`rgba(16,26,43,.08)`), pitch **60px**, both axes, static (never animated). Exposed as tweakable 3–16% / 40–100px.

### Typography

- **Display / headings**: `Newsreader` (Google Fonts, weights 400/500, italic 400). Never bold — italic and size carry emphasis.
- **UI / body**: `Space Grotesk` (400/500/600/700).
- Sizes are **fixed, not fluid** (an explicit user requirement — no `clamp()`):
  - Hero h1 **44px** / line-height 1.14 / letter-spacing −0.01em, two lines, each `white-space:nowrap`
  - Page title (tab heading) **38px** / 1.04
  - Section heading **26–27px**
  - Card title **27px** (bab), **30px** (materi title), **19px** (feature card)
  - Body **14.5–16.5px** / line-height 1.65–1.8
  - Eyebrow / kicker **11px**, `letter-spacing:.14em`, uppercase
  - Meta / counters **11–12.5px**, `font-variant-numeric: tabular-nums` on every figure
- Phone frames: hero title **18.5px** single line, body 13–14.5px, tap targets ≥ **44px**.

### Spacing, radius, shadow

- Section rhythm: 34–60px vertical; card padding 20–26px; page gutter `clamp(16px,4vw,44px)`.
- Radius: pill `999px`, card `20px`, panel `24px`, phone frame `28px`, option row `13–14px`, small chip `9–11px`.
- Shadows are soft and low: `0 20px 44px -30px rgba(16,26,43,.5)` (card), `0 28px 64px -44px rgba(16,26,43,.6)` (materi panel), `0 30px 60px -40px rgba(16,26,43,.7)` (phone frame).

---

## Screens / Views

The prototype is a single page with five in-page tabs in a sticky nav. In the real app these are routes: `/` , `/peta-materi`, `/latihan`, `/tentang` (the fifth, "Tampilan HP", is a design-only preview of the mobile layouts — do not ship it as a route).

### Sticky nav (all screens)

Height **70px**, fill `rgba(250,249,245,.9)` + `backdrop-filter: blur(16px)`, bottom hairline. Single row, never wraps: logo `mantra-penuh.png` at 38px (`flex:none`), tab row (`gap:2px`, each tab `padding:9px 11px`, radius 10px), then a shrinkable meta label ("Materi 04", full text in `title`), then a `flex:none` dark pill CTA "Lanjutkan" with a repeating sheen sweep.
Active tab: `emas-10` fill + a 2px gold underline that animates via `transform: scaleX(0→1)`, 300ms.

### 1. Beranda (`/`)

Purpose: explain what the site is, what it can do, and what it is built with — then send the student to Peta Materi.

- **Hero**, centered column. Padding `clamp(44px,6.5vw,88px)` top / **150px** bottom — the bottom reserve exists so the decorative curve band never overlaps content.
  - Eyebrow pill "Matematika SMA · Kelas 10–12" (gold text, gold 40% border)
  - Logo `mantra-penuh.png`, width `min(430px,80vw)`, with a scroll parallax of `y × −0.05` clamped to −26px
  - h1: "Matematika tidak hanya dipelajari" / italic gold "Matematika bisa dijelajahi"
  - Paragraph (exact copy, keep the three colored emphases): "Eksplorasi konsep matematika melalui **animasi** (biru), **visualisasi** (hijau), dan **interaksi** (jingga) yang membuat setiap rumus tidak hanya dipahami tetapi dapat Anda lihat dan rasakan cara kerjanya"
  - Buttons: gold pill "Mulai dari Kelas 10" → Peta Materi; outlined "Pasang di HP" (PWA install)
  - **Decorative band**, bottom 132px, `pointer-events:none`: two sine paths in an SVG with `viewBox="0 0 1400 200"` — gold (`#B08A3E`, 45% opacity, 2.5px) and blue (`#2B4B8F`, 30%, 2px). Both carry `pathLength="2200"` + `stroke-dasharray="2200"` so the draw-on animation leaves no gap. Two dots (jingga r6, hijau r4.5) **travel along** the paths via SVG `animateMotion` + `mpath` (11s and 16s, `repeatCount="indefinite"`, `rotate="auto"`).
  - Five floating math glyphs (θ ∑ √ π ∞) at the edges, 7–16% opacity, 13/17/21s float loops. Positioned clear of the text column.
- **Carousel** — single column, max-width 780px, centered: media frame (white, radius 20, min-height 320, image `max-height:440px` centered so portrait clips look right) then **all captions below the image**: `jenis · NN / 05` kicker, 27px title, body copy, then prev / dot-rail / next controls (44px round buttons; active dot widens 8→30px). Auto-advances every **7s**, pauses on hover. Five clips: GIF tanpa suara, video demo situs, video bersuara ×2, rekaman layar latihan. *(Currently poster JPGs; swap to muted looping `<video>` when the real files land — user's choice was "putar sendiri, tanpa suara, berulang".)*
- **Three feature cards** — "Animasi" / "Alat yang bisa dicoba" / "Latihan dan kuis" with 46px Newsreader numerals (biru / hijau / jingga). Hover: lift 6px + a **cursor-following shadow** (see Interactions).
- **CTA strip** — 2px gold top rule, "Enam bab, tersusun seperti buku" + dark pill "Buka Peta Materi →".
- **Footer** — "Built by **Nyoman Arya Sejati** · with Manim, Claude, and Next.js" and the Undiksha lockup. (English, per user request.)

### 2. Peta Materi (`/peta-materi`)

- Page title "Pilih bab, lalu sub-bab, lalu materinya" + italic gold subtitle noting the structure follows the Kurikulum Merdeka textbook.
- Grouped by class ("Kelas 10 dan 11" — 4 bab; "Kelas 12" — 2 bab), each group headed by a 27px heading + "N bab" + hairline.
- **Bab card** (2-up grid, gap 18): kicker `Bab N · Kelas · <book source>`, 27px title, italic question, a **66px progress ring** (gold stroke 3.2, `stroke-dasharray:107`, offset animated 900ms) with the percentage inside, then a sub-chapter list (gold letter, name, "N materi", each row hover-indents 6px), then a gold pill (contextual: "Mulai" / "Lanjut Materi NN" / "Ulangi kuis") + outlined "Latihan bab".
- **"Segera" card** — full-width, 2px dashed border, `rgba(255,255,255,.5)` fill: "Bab lain sedang disiapkan" naming barisan dan deret, eksponen dan logaritma, peluang, turunan, integral.
- **Materi panel** (the actual learning screen, 470px min-height):
  - Breadcrumb bar (min-height 54, `white-space:nowrap`): Kelas / Bab / Sub-bab / **Materi NN**, then progress bar + percentage on the right.
  - **Collapsible tree sidebar**, `grid-template-columns` transitions **278px ⇄ 62px** in 340ms. Expanded: sub-chapter headers (gold letter, name, `selesai/jumlah`) and materi rows (`NN`, title, status circle). Collapsed rail keeps the sub-chapter letter and the materi number so the student never loses their place. Bottom: "Latihan · 4 soal" and a **Kuis row that shows its unlock condition in plain text** ("Buka 10 materi (4/10) dan baca 10 menit · Terkunci") — never a silent lock.
  - Materi rows: active = `emas-14` fill + 2px gold left border; completed = **hijau** ring + filled hijau circle with a white ✓ that pops (`scale .4→1.35→1`, 500ms) the moment it completes.
  - Right pane: kicker, 30px title, italic gold question, opening paragraph, **collapsible sesi** rows (number, title, chevron rotating −90°→0), a gold "Yuk bereksperimen" note, and a **Kembali / Lanjut** pair — Lanjut is gold and names the next materi plus a hint ("Masih di sub-bab A" / "Masuk sub-bab B").
  - Left pane: Tonton / Coba sendiri segmented control, the visual well (`max-height:330px`), and the widget's control slider (gold track + white knob).

### 3. Latihan (`/latihan`)

- Page title "Bank soal berjenjang" + italic subtitle.
- **Per-bab summary card**: kicker `Bab N · Kelas · 32 soal`, 30px title, big gold percentage, a 5px gradient progress bar (gold→hijau), and four **level tiles** (mudah / sedang / sulit / sangat sulit) each with its own mini bar and `N / 8`; a locked tile reads "terkunci" at 55% opacity. **No badges** (dropped at user request).
- **Bank soal panel** (working): level chips (dark = active, count inside), `Tingkat X` + `Soal N dari M`, 16.5px question, five A–E option rows (26px letter chip, 48px min-height). **Periksa jawaban** marks the correct row hijau ✓ and a wrong pick jingga ✕, with a status line; **Soal berikutnya** cycles. Beside it, the **Pembahasan** panel fills with numbered steps (empty state explains it appears after checking).
  Question bank in the prototype: 3 mudah, 3 sedang, 2 sulit, 2 sangat sulit (trigonometry) — replace with the real bank from the repo.
- **Kuis bab panel**, three mutually exclusive states: **locked** (states the condition + progress bar + "Buka materi dulu →"), **ready** ("Mulai kuis"), **running** (`Soal N dari M`, progress bar, live score, A–E options), **result** (104px hijau ring with the score, "N dari M soal benar", verdict copy, "Ulangi kuis" / "Kembali ke materi"). Unlocks automatically at 10/10 materi opened.
- Closing note: scores are not official grades and live only in the browser.

### 4. Tentang (`/tentang`)

Two-column intro (copy explains MANTRA = *Matematika Interaktif*), a plate image, then **Dibuat dengan**: two cards for **Manim Community** (https://www.manim.community/) and **Claude** (https://claude.com/product/overview/), each with the logo in a 132×74 matted box (`object-fit:contain`, hairline border, sunken fill). Then the "not an official grade" notice, then the author card: Undiksha mark, "Nyoman Arya Sejati", and a **WhatsApp button — logo + "Hubungi WhatsApp" only, the number is never displayed** (link `https://wa.me/6282247933752`).

### 5. Tampilan HP (design-only, 360×760)

Four frames documenting the mobile layouts: **Beranda** (nav with logo + hamburger, hero, carousel, feature cards, CTA), **Laci daftar materi** (the tree as a 294px drawer sliding from the left over a `rgba(16,26,43,.34)` scrim, with the bab header, progress bar and the same Latihan/Kuis rows), **Halaman materi** (breadcrumb, 10-segment progress strip, stacked visual + copy, sticky Kembali/Lanjut bar over a fade), **Bank soal dan kuis** (wrapping level chips, question + options, pembahasan, embedded kuis states, sticky Periksa/Berikutnya).
All frames lock horizontal scrolling (`overflow-x:hidden`, `box-sizing:border-box`) — horizontal drift inside a phone view is a bug.

---

## Interactions & Behavior

| Behaviour | Spec |
| --- | --- |
| Tab switch | Content fades + rises 16px, **420ms** `cubic-bezier(.2,.7,.2,1)`; the active underline scales in over 300ms |
| Materi switch | Content pane slides in from the right 30px + fades, **380ms**; the sidebar does not move |
| Hero entrance | Staggered rise 22px: eyebrow → logo → h1 → paragraph → buttons, 700ms each, delays 0 / .06 / .12 / .18 / .24s |
| Curve draw | `stroke-dashoffset 2200→0`, 3.4s (gold) and 4.2s + .35s delay (blue), triggered by `IntersectionObserver` (rootMargin `0 0 -10% 0`) — the final state is "drawn", so a browser without IO still looks correct |
| Travelling dots | SVG `animateMotion` + `mpath` along each curve, 11s / 16s, infinite |
| Floating glyphs | `translateY(0→−20px) rotate(0→5deg)`, 13 / 17 / 21s ease-in-out, infinite |
| Button sheen | Gradient sweep `translateX(-130%→240%)`, 4.5s |
| Press | Every button scales to .96 on `:active` |
| Hover lift | Cards translateY −5/−6px, 280ms |
| Cursor-following shadow | On `mousemove` over feature/bab/latihan cards, set `box-shadow` from the pointer offset: `x = −dx·26px`, `y = 18 − dy·14px`, blur 42, `-26px` spread, `rgba(16,26,43,.55)`; cleared on leave. Written directly to `element.style` — never through React state |
| Counters | Chapter percentages, level percentages and the summary figures ease from 0 to target over **900ms** (`1 − (1−t)³`) on mount and on tab change |
| Progress fills | Bars/rings transition 700–900ms `cubic-bezier(.2,.7,.2,1)` |
| Checkmark pop | `scale .4 → 1.35 → 1` + fade, 500ms, fired once when a materi is first opened |
| Sidebar collapse | Grid column 278px ⇄ 62px, 340ms |
| Parallax | Hero logo `y × −0.05` (min −26px); carousel image `(y − 700) × 0.025` clamped ±18px |
| Carousel | Auto-advance 7s, pause on pointer enter, prev/next + dot jump; slide transition 500ms |
| Sesi fold | Chevron rotates 90°, body rises 10px over 300ms |
| Motion speed | A global multiplier — Diam 0 (all loops off) / Lembut 1.8× / Sedang 1× / **Kencang 0.45×** (default). Ship it as a user preference if you like; otherwise hard-code Kencang |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` forces all durations to ~0 and iteration count 1; final states remain visible |

## State Management

Prototype state (a single component; split per route in the real app):

- `tab` + `tabTick` — active view, and a parity counter used to restart the transition animation.
- `aktif` (active materi 1–10), `dibuka: number[]` (opened materi → progress + checkmarks), `tick` (transition parity), `pop` (materi id whose checkmark is animating), `tutup: Record<number,boolean>` (collapsed sesi).
- `rel: boolean` — sidebar collapsed to rail.
- `klip`, `klipTick`, `jeda` — carousel index, transition parity, hover pause.
- `y` — scroll offset for parallax, written through a single `requestAnimationFrame` guard and only when it moves >4px.
- `maju: 0→1` — counter easing progress.
- `tingkat`, `idx`, `opsi`, `periksa` — practice: level, question index, selected option, checked.
- `kuisJalan`, `kuisIdx`, `kuisJawab: number[]`, `kuisSelesai` — quiz flow. The three panels are mutually exclusive: `locked = !unlocked`, `running = jalan && unlocked && !selesai`, `result = unlocked && selesai`, `ready = unlocked && !jalan && !selesai`.

Real app: persist `dibuka`, level progress and quiz scores in `localStorage` through the existing `web/lib/simpanan.ts` / `latihan-kemajuan.ts` helpers. Quiz unlock rule already in the codebase: all 10 materi opened **and** 10 minutes of reading — the design's contribution is that the rule must be **shown**, not hidden.

## Assets

In `aset/` (all included in this bundle):

- `mantra-penuh.png` (1592×485) and `mantra-simbol.png` (490×485) — the new MANTRA logo, background keyed to transparency by us from the user's original PNG. Navy serif wordmark, gold orbit, navy square / green circle / orange triangle. The site palette is derived from it.
- `logo-manim.png`, `logo-claude.png` — third-party marks, trimmed to the wordmark and keyed transparent (the source JPGs had white/cream fields and, in Claude's case, a stray doodle we cropped out). Use the official assets from each vendor's brand page in production.
- `logo-whatsapp.png` — keyed transparent from the user's upload.
- `undiksha.png` — Universitas Pendidikan Ganesha lockup.
- Poster stills from the real Manim renders / widget screen recordings: `beranda-tiga-grafik-v2.jpg`, `tahap2-perbandingan-tetap.jpg`, `tahap5-lingkaran-satuan.jpg`, `tahap8-grafik-sin.jpg`, `limit1-kecepatan.jpg`, `demo-interaktif.jpg`, `demo-latihan.jpg`. These are **placeholders for video** — replace with the muted looping clips.

Fonts: Google Fonts `Newsreader` and `Space Grotesk`. The old site used Fraunces / Inter / IBM Plex Mono — those are retired.

## Files

- `MANTRA-mandiri.html` — **start here**: one self-contained file (1.7 MB, all assets and the runtime inlined). Double-click it; it works offline with no server.
- `MANTRA.dc.html` — the same design as authored (streaming-template source). Needs `support.js` and `aset/` beside it.
- `support.js` — runtime required by the file above; not part of the deliverable.
- `aset/` — images listed under Assets.
- `tangkapan/` — screenshots of every view: `01-03-beranda` (hero, carousel + feature cards, chapter CTA), `01-03-peta` (chapter map, "Segera" card, materi panel with the tree sidebar), `01-02-latihan` (summary + level tiles, bank soal with pembahasan and the kuis panel), `01-02-tentang`, `01-02-hp` (the four 360×760 phone frames).
- Reference-only earlier explorations, kept in the project (not in this bundle): `MATRA Sekarang.dc.html` (reconstruction of the pre-redesign site), `MATRA Upgrade.dc.html` (editorial "Classical" direction), `MATRA Papan Tulis.dc.html`, `MATRA Riso.dc.html`, `MATRA Aurora.dc.html` (three alternative directions; Papan Tulis was chosen and became MANTRA).

## Open items for the developer

1. **Video**: swap carousel and materi posters for muted looping video with a poster frame.
2. **Real question bank**: the prototype ships ~10 sample questions; wire the panel to the repo's bank and to `latihan-kemajuan.ts` unlock rules.
3. **Sub-chapter mapping**: the Bab → Sub-bab grouping in Peta Materi is the agreed mapping and should be encoded in `web/content/<topik>/` (e.g. add a `subbab` field grouping existing `tahap` numbers). Grafik Fungsi deliberately spans four textbook chapters; Vektor materi 10 ("dunia nyata") was moved to a closing "Penerapan" sub-chapter.
4. **"Segera" chapters**: barisan dan deret, eksponen dan logaritma, peluang, turunan, integral — placeholder card only for now.
5. **PWA**: "Pasang di HP" needs the install prompt wired.
