<#
  Penyalaan sesi paralel MATRA. Dipanggil oleh berkas .bat di folder proyek,
  jangan dijalankan langsung kecuali paham argumennya.

  Tiga pengaman yang WAJIB dipertahankan kalau berkas ini diubah:

  1. Env CLAUDE* dibersihkan sebelum memanggil claude. Sesi yang lahir dari
     dalam sesi Claude mewarisi penanda "sesi anak": transkripnya tidak
     disimpan dan sesinya tidak muncul di daftar. Sudah kejadian 1 Sep 2026.
  2. Jeda antar penyalaan. Beberapa claude yang start berbarengan rebutan
     menulis ~/.claude.json.
  3. Sesi yang sudah hidup dilewati. Dua sesi di folder yang sama akan saling
     menimpa berkas.

  Pemakaian:
    -Mode sesi     lima sesi topik + UI/UX (bawaan)
    -Mode master   hanya MATRA-MASTER di folder proyek
    -Cek           cuma melaporkan, tidak menyalakan apa pun
    -Baru          paksa sesi baru dari nol, bukan melanjutkan yang lama
#>
[CmdletBinding()]
param(
    [ValidateSet('sesi', 'master')][string]$Mode = 'sesi',
    [switch]$Cek,
    [switch]$Baru
)

$ErrorActionPreference = 'Stop'
$AKAR = Split-Path -Parent $PSScriptRoot
$JEDA = 9   # detik antar penyalaan

$daftarSesi = @(
    @{ nama = 'MATRA-VEKTOR';             sub = 'matra-vektor';        tugas = 'docs/tugas/MATRA-VEKTOR.md' },
    @{ nama = 'MATRA-GRAFIK-FUNGSI';      sub = 'matra-grafik-fungsi'; tugas = 'docs/tugas/MATRA-GRAFIK-FUNGSI.md' },
    @{ nama = 'MATRA-STATISTIKA';         sub = 'matra-statistika';    tugas = 'docs/tugas/MATRA-STATISTIKA.md' },
    @{ nama = 'MATRA-RUANG-TIGA-DIMENSI'; sub = 'matra-ruang-3d';      tugas = 'docs/tugas/MATRA-RUANG-TIGA-DIMENSI.md' },
    @{ nama = 'MATRA-DESAIN-UI-UX';       sub = 'matra-ui-ux';         tugas = 'docs/tugas/MATRA-DESAIN-UI-UX.md' }
)

if ($Mode -eq 'master') {
    $daftar = @(@{ nama = 'MATRA-MASTER'; folder = $AKAR
                   tugas = 'PROGRESS.md lalu docs/tugas/ATURAN-SEMUA-SESI.md' })
} else {
    $daftar = $daftarSesi | ForEach-Object {
        @{ nama = $_.nama; tugas = $_.tugas
           folder = Join-Path $AKAR (".claude\worktrees\" + $_.sub) }
    }
}

# Nama folder simpanan sesi: pemisah path diganti tanda hubung.
function Get-FolderSimpanan([string]$path) {
    $munged = $path -replace '[:\\/.]', '-'
    return (Join-Path $env:USERPROFILE ".claude\projects\$munged")
}

function Test-SudahHidup([string]$nama) {
    $p = Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
         Where-Object { $_.CommandLine -like "*TANDA_SESI_MATRA='$nama'*" -and
                        $_.ProcessId -ne $PID }
    return [bool]$p
}

Write-Host ""
Write-Host "  MATRA - penyalaan sesi (mode: $Mode)" -ForegroundColor Cyan
Write-Host "  ------------------------------------" -ForegroundColor Cyan
Write-Host ""

$dinyalakan = 0
$dilewati = 0

foreach ($s in $daftar) {
    $nama = $s.nama
    $folder = $s.folder

    if (-not (Test-Path $folder)) {
        Write-Host "  [LEWAT]  $nama" -ForegroundColor Red
        Write-Host "           foldernya tidak ada: $folder"
        Write-Host "           worktree-nya mungkin sudah digabung dan dihapus."
        $dilewati++
        continue
    }

    if (Test-SudahHidup $nama) {
        Write-Host "  [HIDUP]  $nama sudah jalan, tidak disentuh." -ForegroundColor DarkGray
        $dilewati++
        continue
    }

    $simpanan = Get-FolderSimpanan $folder
    $adaRiwayat = (Test-Path $simpanan) -and
                  @(Get-ChildItem $simpanan -Filter *.jsonl -ErrorAction SilentlyContinue).Count -gt 0
    $lanjut = $adaRiwayat -and (-not $Baru)

    if ($lanjut) {
        $panggil = 'claude --continue'
        $label = 'lanjut'
    } else {
        $panggil = 'claude "Kamu sesi ' + $nama + '. Baca dan ikuti ' + $s.tugas + '."'
        $label = 'baru'
    }

    if ($Cek) {
        Write-Host "  [CEK]    $nama -> $label" -ForegroundColor Yellow
        continue
    }

    $perintah = @(
        "`$host.UI.RawUI.WindowTitle = '$nama'"
        "`$TANDA_SESI_MATRA='$nama'"
        "Get-ChildItem Env: | Where-Object { `$_.Name -like 'CLAUDE*' } | ForEach-Object { Remove-Item ('Env:' + `$_.Name) -ErrorAction SilentlyContinue }"
        "`$env:CLAUDE_CODE_FORCE_SESSION_PERSISTENCE = '1'"
        $panggil
    ) -join '; '

    Start-Process -FilePath 'powershell' -WorkingDirectory $folder `
                  -ArgumentList @('-NoExit', '-Command', $perintah)

    Write-Host "  [NYALA]  $nama ($label)" -ForegroundColor Green
    $dinyalakan++

    if ($s -ne $daftar[-1]) { Start-Sleep -Seconds $JEDA }
}

Write-Host ""
Write-Host "  Dinyalakan: $dinyalakan   Dilewati: $dilewati" -ForegroundColor Cyan
if ($dinyalakan -gt 0 -and -not $Cek) {
    Write-Host ""
    Write-Host "  Sisanya manual di tiap jendela:"
    Write-Host "    /model  -> Opus 5, effort tertinggi"
    Write-Host "    nyalakan remote control kalau mau pantau dari HP"
}
# Menunggu tombol supaya jendela .bat tidak berkedip lalu hilang sebelum
# laporannya sempat dibaca. Dilewati pada mode cek dan saat dijalankan tanpa
# keyboard (misalnya diuji dari sesi Claude), sebab di situ ia akan menggantung.
if (-not $Cek) {
    try {
        Write-Host ""
        Write-Host "  Tekan tombol apa saja untuk menutup jendela ini." -ForegroundColor DarkGray
        $null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
    } catch {
        Start-Sleep -Seconds 3
    }
}
