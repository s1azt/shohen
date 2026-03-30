# デプロイパス確認スクリプト
# SSH接続後、このスクリプトを実行してGitHub Actionsで使用すべきパス形式を確認します

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Deploy Path Verification Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# 現在のディレクトリを表示
Write-Host "[1] 現在のディレクトリ (PowerShell形式):" -ForegroundColor Yellow
Write-Host "    $PWD" -ForegroundColor Green
Write-Host ""

# Unix形式のパスを表示（Cygwin/Git Bashスタイル）
Write-Host "[2] Unix形式のパス (Cygwin/Git Bash):" -ForegroundColor Yellow
$unixPath = $PWD.Path -replace '\\', '/' -replace '^([A-Z]):', '/cygdrive/$1'
$unixPath = $unixPath.ToLower()
Write-Host "    $unixPath" -ForegroundColor Green
Write-Host ""

# スラッシュ置換のみ
Write-Host "[3] Windows形式（スラッシュ）:" -ForegroundColor Yellow
$slashPath = $PWD.Path -replace '\\', '/'
Write-Host "    $slashPath" -ForegroundColor Green
Write-Host ""

# デプロイ先ディレクトリの例
Write-Host "[4] 一般的なデプロイ先とその形式:" -ForegroundColor Yellow
$deployPaths = @(
    @{ Windows = "C:\inetpub\wwwroot"; Unix = "/cygdrive/c/inetpub/wwwroot"; Slash = "C:/inetpub/wwwroot" },
    @{ Windows = "C:\inetpub\gs_intra"; Unix = "/cygdrive/c/inetpub/gs_intra"; Slash = "C:/inetpub/gs_intra" },
    @{ Windows = "C:\apps\webapp"; Unix = "/cygdrive/c/apps/webapp"; Slash = "C:/apps/webapp" }
)

Write-Host ""
Write-Host "    Windows形式:" -ForegroundColor Cyan
foreach ($path in $deployPaths) {
    Write-Host "      $($path.Windows)" -ForegroundColor Gray
}
Write-Host ""
Write-Host "    Unix形式 (Cygwin):" -ForegroundColor Cyan
foreach ($path in $deployPaths) {
    Write-Host "      $($path.Unix)" -ForegroundColor Gray
}
Write-Host ""
Write-Host "    Windows/スラッシュ形式:" -ForegroundColor Cyan
foreach ($path in $deployPaths) {
    Write-Host "      $($path.Slash)" -ForegroundColor Gray
}
Write-Host ""

# SSH接続のテスト
Write-Host "[5] SSH環境の確認:" -ForegroundColor Yellow
Write-Host "    ホスト名: $env:COMPUTERNAME" -ForegroundColor Green
Write-Host "    ユーザー名: $env:USERNAME" -ForegroundColor Green
Write-Host "    ホームディレクトリ: $HOME" -ForegroundColor Green
Write-Host ""

# OpenSSH for Windowsの確認
$sshdService = Get-Service sshd -ErrorAction SilentlyContinue
if ($sshdService) {
    Write-Host "    OpenSSH Server: インストール済み ($($sshdService.Status))" -ForegroundColor Green
} else {
    Write-Host "    OpenSSH Server: 未インストール" -ForegroundColor Red
}
Write-Host ""

# 推奨事項
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "GitHub Actions設定の推奨事項" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "DEPLOY_PATH Secretには次のいずれかの形式を使用してください:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Windows/スラッシュ形式（推奨）:" -ForegroundColor White
Write-Host "   C:/inetpub/gs_intra" -ForegroundColor Green
Write-Host ""
Write-Host "2. Unix/Cygwin形式:" -ForegroundColor White
Write-Host "   /cygdrive/c/inetpub/gs_intra" -ForegroundColor Green
Write-Host ""
Write-Host "注意: バックスラッシュ（\\）は使用しないでください" -ForegroundColor Yellow
Write-Host ""

# テスト用のコマンド例
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "動作確認コマンド例" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "デプロイ先ディレクトリが存在するか確認:" -ForegroundColor Yellow
Write-Host '  Test-Path "C:\inetpub\gs_intra"' -ForegroundColor Gray
Write-Host ""
Write-Host "デプロイ先ディレクトリにファイルを作成できるか確認:" -ForegroundColor Yellow
Write-Host '  New-Item -Path "C:\inetpub\gs_intra\test.txt" -ItemType File -Force' -ForegroundColor Gray
Write-Host '  Remove-Item "C:\inetpub\gs_intra\test.txt"' -ForegroundColor Gray
Write-Host ""
Write-Host "デプロイ先ディレクトリの権限を確認:" -ForegroundColor Yellow
Write-Host '  icacls "C:\inetpub\gs_intra"' -ForegroundColor Gray
Write-Host ""

Write-Host "このスクリプトは情報表示のみを行います。" -ForegroundColor Cyan
Write-Host "取得した情報をGitHub SecretsのDEPLOY_PATHに設定してください。" -ForegroundColor Cyan
