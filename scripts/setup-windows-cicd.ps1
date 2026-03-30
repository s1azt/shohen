# WindowsサーバーCI/CD環境セットアップスクリプト
# 管理者権限で実行してください

param(
    [Parameter(Mandatory=$true)]
    [string]$DeployUserName = "deploy_user",
    
    [Parameter(Mandatory=$true)]
    [string]$DeployPath = "C:\inetpub\gs_intra",
    
    [Parameter(Mandatory=$false)]
    [string]$PublicKeyPath = ""
)

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Windows Server CI/CD Setup Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# 管理者権限チェック
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "❌ このスクリプトは管理者権限で実行する必要があります。" -ForegroundColor Red
    Write-Host "PowerShellを右クリックし、'管理者として実行'を選択してください。" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ 管理者権限で実行中" -ForegroundColor Green
Write-Host ""

# 1. OpenSSH Serverのインストール確認とインストール
Write-Host "[1/7] OpenSSH Serverのインストール確認..." -ForegroundColor Yellow
$sshServer = Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH.Server*'

if ($sshServer.State -eq "Installed") {
    Write-Host "✅ OpenSSH Serverは既にインストールされています" -ForegroundColor Green
} else {
    Write-Host "📦 OpenSSH Serverをインストール中..." -ForegroundColor Yellow
    try {
        Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
        Write-Host "✅ OpenSSH Serverのインストールが完了しました" -ForegroundColor Green
    } catch {
        Write-Host "❌ OpenSSH Serverのインストールに失敗しました: $_" -ForegroundColor Red
        exit 1
    }
}
Write-Host ""

# 2. sshdサービスの起動と自動起動設定
Write-Host "[2/7] sshdサービスの設定..." -ForegroundColor Yellow
try {
    Start-Service sshd -ErrorAction SilentlyContinue
    Set-Service -Name sshd -StartupType 'Automatic'
    $sshdStatus = Get-Service sshd
    Write-Host "✅ sshdサービスの状態: $($sshdStatus.Status)" -ForegroundColor Green
} catch {
    Write-Host "❌ sshdサービスの設定に失敗しました: $_" -ForegroundColor Red
    exit 1
}
Write-Host ""

# 3. ファイアウォールルールの確認
Write-Host "[3/7] ファイアウォールルールの確認..." -ForegroundColor Yellow
$firewallRule = Get-NetFirewallRule -Name "*ssh*" -ErrorAction SilentlyContinue | Where-Object { $_.Enabled -eq $true }
if ($firewallRule) {
    Write-Host "✅ SSHのファイアウォールルールが有効です" -ForegroundColor Green
} else {
    Write-Host "⚠️ SSHのファイアウォールルールが見つかりません" -ForegroundColor Yellow
    Write-Host "必要に応じて手動で設定してください:" -ForegroundColor Yellow
    Write-Host "New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22" -ForegroundColor Gray
}
Write-Host ""

# 4. デプロイユーザーの作成
Write-Host "[4/7] デプロイユーザーの作成..." -ForegroundColor Yellow
$userExists = Get-LocalUser -Name $DeployUserName -ErrorAction SilentlyContinue
if ($userExists) {
    Write-Host "⚠️ ユーザー '$DeployUserName' は既に存在します。スキップします。" -ForegroundColor Yellow
} else {
    $Password = Read-Host "デプロイユーザー '$DeployUserName' のパスワードを入力してください" -AsSecureString
    try {
        New-LocalUser $DeployUserName -Password $Password -FullName "Deploy User" -Description "GitHub Actions deploy user"
        Add-LocalGroupMember -Group "Users" -Member $DeployUserName
        Write-Host "✅ ユーザー '$DeployUserName' を作成しました" -ForegroundColor Green
    } catch {
        Write-Host "❌ ユーザーの作成に失敗しました: $_" -ForegroundColor Red
        exit 1
    }
}
Write-Host ""

# 5. SSH鍵認証の設定
Write-Host "[5/7] SSH鍵認証の設定..." -ForegroundColor Yellow
$sshDir = "C:\Users\$DeployUserName\.ssh"
$authorizedKeysPath = "$sshDir\authorized_keys"

try {
    # .sshディレクトリの作成
    if (-not (Test-Path $sshDir)) {
        New-Item -Path $sshDir -ItemType Directory -Force | Out-Null
        Write-Host "✅ .sshディレクトリを作成しました: $sshDir" -ForegroundColor Green
    }

    # authorized_keysファイルの作成
    if (-not (Test-Path $authorizedKeysPath)) {
        New-Item -Path $authorizedKeysPath -ItemType File -Force | Out-Null
        Write-Host "✅ authorized_keysファイルを作成しました" -ForegroundColor Green
    }

    # 公開鍵の追加（パスが指定されている場合）
    if ($PublicKeyPath -and (Test-Path $PublicKeyPath)) {
        $publicKey = Get-Content $PublicKeyPath -Raw
        Add-Content -Path $authorizedKeysPath -Value $publicKey.Trim()
        Write-Host "✅ 公開鍵を追加しました: $PublicKeyPath" -ForegroundColor Green
    } else {
        Write-Host "⚠️ 公開鍵のパスが指定されていないか、ファイルが見つかりません" -ForegroundColor Yellow
        Write-Host "後で手動で公開鍵を $authorizedKeysPath に追加してください" -ForegroundColor Yellow
    }

    # 権限の設定
    icacls $authorizedKeysPath /inheritance:r | Out-Null
    icacls $authorizedKeysPath /grant "${DeployUserName}:F" | Out-Null
    icacls $authorizedKeysPath /grant "SYSTEM:F" | Out-Null
    Write-Host "✅ authorized_keysの権限を設定しました" -ForegroundColor Green
} catch {
    Write-Host "❌ SSH鍵認証の設定に失敗しました: $_" -ForegroundColor Red
    exit 1
}
Write-Host ""

# 6. デプロイ先ディレクトリの作成と権限設定
Write-Host "[6/7] デプロイ先ディレクトリの設定..." -ForegroundColor Yellow
try {
    if (-not (Test-Path $DeployPath)) {
        New-Item -Path $DeployPath -ItemType Directory -Force | Out-Null
        Write-Host "✅ デプロイ先ディレクトリを作成しました: $DeployPath" -ForegroundColor Green
    } else {
        Write-Host "✅ デプロイ先ディレクトリは既に存在します: $DeployPath" -ForegroundColor Green
    }

    # 権限の設定
    icacls $DeployPath /grant "${DeployUserName}:(OI)(CI)F" /T | Out-Null
    Write-Host "✅ デプロイ先ディレクトリの権限を設定しました" -ForegroundColor Green
} catch {
    Write-Host "❌ デプロイ先ディレクトリの設定に失敗しました: $_" -ForegroundColor Red
    exit 1
}
Write-Host ""

# 7. sshd_configの確認
Write-Host "[7/7] sshd_configの確認..." -ForegroundColor Yellow
$sshdConfigPath = "C:\ProgramData\ssh\sshd_config"
if (Test-Path $sshdConfigPath) {
    $sshdConfig = Get-Content $sshdConfigPath
    
    # PubkeyAuthenticationの確認
    $pubkeyAuth = $sshdConfig | Select-String "PubkeyAuthentication" | Where-Object { $_ -notmatch "^#" }
    if ($pubkeyAuth -and $pubkeyAuth -match "yes") {
        Write-Host "✅ PubkeyAuthentication は有効です" -ForegroundColor Green
    } else {
        Write-Host "⚠️ PubkeyAuthentication が無効または設定されていません" -ForegroundColor Yellow
        Write-Host "sshd_config を確認し、'PubkeyAuthentication yes' を設定してください" -ForegroundColor Yellow
    }

    # PasswordAuthenticationの確認（セキュリティのため無効化推奨）
    $passwordAuth = $sshdConfig | Select-String "PasswordAuthentication" | Where-Object { $_ -notmatch "^#" }
    if ($passwordAuth -and $passwordAuth -match "no") {
        Write-Host "✅ PasswordAuthentication は無効です（推奨）" -ForegroundColor Green
    } else {
        Write-Host "⚠️ PasswordAuthentication が有効です" -ForegroundColor Yellow
        Write-Host "セキュリティのため、鍵認証の設定後に無効化することを推奨します" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️ sshd_configファイルが見つかりません: $sshdConfigPath" -ForegroundColor Yellow
}
Write-Host ""

# 完了メッセージ
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "セットアップが完了しました！" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "次のステップ:" -ForegroundColor Yellow
Write-Host "1. SSH鍵ペアを生成してください（まだの場合）" -ForegroundColor White
Write-Host "   ssh-keygen -t ed25519 -C 'github-actions-deploy' -f github_deploy_key" -ForegroundColor Gray
Write-Host ""
Write-Host "2. 公開鍵を authorized_keys に追加してください（まだの場合）" -ForegroundColor White
Write-Host "   Add-Content -Path '$authorizedKeysPath' -Value '公開鍵の内容'" -ForegroundColor Gray
Write-Host ""
Write-Host "3. SSH接続をテストしてください" -ForegroundColor White
Write-Host "   ssh -i github_deploy_key ${DeployUserName}@localhost" -ForegroundColor Gray
Write-Host ""
Write-Host "4. GitHubのSecretsに以下を登録してください" -ForegroundColor White
Write-Host "   - SERVER_HOST: サーバーのIPアドレスまたはドメイン" -ForegroundColor Gray
Write-Host "   - SERVER_USERNAME: $DeployUserName" -ForegroundColor Gray
Write-Host "   - SSH_PRIVATE_KEY: 秘密鍵の内容" -ForegroundColor Gray
Write-Host "   - SERVER_PORT: 22" -ForegroundColor Gray
Write-Host "   - DEPLOY_PATH: $DeployPath" -ForegroundColor Gray
Write-Host ""
Write-Host "詳細は WindowsサーバーへのCI_CD設定マニュアル.md を参照してください" -ForegroundColor Cyan
