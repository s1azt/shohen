# WindowsサーバーへのCI/CD自動デプロイ設定マニュアル

## 概要
このマニュアルでは、GitHub ActionsをCI/CDとして使用し、`git push`時にWindowsサーバーへ自動デプロイする方法を説明します。

## 全体の流れ
1. Windowsサーバー側の準備
2. GitHub Actionsワークフローファイルの作成
3. GitHubのSecretsの設定
4. 動作確認

---

## 1. Windowsサーバー側の準備

### 1.1 OpenSSH Serverのインストール

PowerShellを**管理者権限**で開き、以下のコマンドを実行します。

#### 方法A: Windows 10 (1809以降) / Windows Server 2019以降の場合

```powershell
# OpenSSH Serverがインストールされているか確認
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH.Server*'

# まだインストールされていない場合、インストール
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0

# OpenSSH Serverサービスの開始と自動起動設定
Start-Service sshd
Set-Service -Name sshd -StartupType 'Automatic'

# ファイアウォールルールの確認（通常は自動で作成される）
Get-NetFirewallRule -Name *ssh*

# もしファイアウォールルールがない場合は手動で追加
# New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
```

#### 方法B: 古いOS (Windows Server 2016など) の場合 - 手動インストール

古いOSでは `Add-WindowsCapability` コマンドが使えないため、手動でインストールします。

**1. OpenSSH バイナリのダウンロード**

Win32-OpenSSH の公式GitHubリリースページにアクセスし、最新のZIPファイルをダウンロードします。
- 配布元: [PowerShell/Win32-OpenSSH Releases](https://github.com/PowerShell/Win32-OpenSSH/releases)
- 64bit版: `OpenSSH-Win64.zip`
- 32bit版: `OpenSSH-Win32.zip`

**2. ファイルの配置**

```powershell
# ダウンロードしたZIPファイルを解凍し、C:\Program Files に配置
# 例: C:\Program Files\OpenSSH にssh.exe、sshd.exeなどが入っている状態にする

# 配置例（解凍済みのフォルダを移動）
# Move-Item -Path "C:\Downloads\OpenSSH-Win64" -Destination "C:\Program Files\OpenSSH"
```

**3. インストールスクリプトの実行**

```powershell
# 配置したフォルダに移動
cd "C:\Program Files\OpenSSH"

# 実行ポリシーを一時的に変更してインストールスクリプトを実行
powershell.exe -ExecutionPolicy Bypass -File install-sshd.ps1

# PATH環境変数に追加（オプション）
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\OpenSSH", "Machine")

# サービスの起動
Start-Service sshd

# 自動起動に設定
Set-Service -Name sshd -StartupType 'Automatic'

# ファイアウォールルールの追加
New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
```

**4. インストールの確認**

```powershell
# sshdサービスの状態を確認
Get-Service sshd

# SSH接続のテスト
Test-NetConnection -ComputerName localhost -Port 22
```

### 1.2 デプロイ用ユーザーの作成（推奨）

セキュリティのため、専用のデプロイユーザーを作成することを推奨します。

```powershell
# デプロイ用ユーザーの作成
$Password = Read-Host -AsSecureString "パスワードを入力してください"
New-LocalUser "deploy_user" -Password $Password -FullName "Deploy User" -Description "GitHub Actions deploy user"

# Administratorsグループに追加（必要に応じて）
# 注: Webサーバーの配置先によっては、制限された権限で十分な場合があります
Add-LocalGroupMember -Group "Users" -Member "deploy_user"
```

### 1.3 SSH鍵ベース認証の設定

#### サーバー側での設定

```powershell
# デプロイユーザーでログイン後、.sshディレクトリを作成
mkdir C:\Users\deploy_user\.ssh

# authorized_keysファイルを作成（公開鍵を後で追加）
New-Item -Path C:\Users\deploy_user\.ssh\authorized_keys -ItemType File

# 管理者の場合、administrators_authorized_keysファイルを使用
# mkdir C:\ProgramData\ssh
# New-Item -Path C:\ProgramData\ssh\administrators_authorized_keys -ItemType File

# 適切な権限を設定（重要）
icacls C:\Users\deploy_user\.ssh\authorized_keys /inheritance:r
icacls C:\Users\deploy_user\.ssh\authorized_keys /grant "deploy_user:F"
icacls C:\Users\deploy_user\.ssh\authorized_keys /grant "SYSTEM:F"
```

#### SSH鍵ペアの生成（ローカルPCまたは任意の環境で）

```bash
# 鍵ペアの生成
ssh-keygen -t ed25519 -C "github-actions-deploy" -f github_deploy_key

# 以下の2つのファイルが生成されます：
# - github_deploy_key (秘密鍵) → GitHubのSecretsに登録
# - github_deploy_key.pub (公開鍵) → サーバーのauthorized_keysに追加
```

#### 公開鍵をサーバーに登録

生成された `github_deploy_key.pub` の内容を、サーバーの `C:\Users\deploy_user\.ssh\authorized_keys` に追加します。

```powershell
# PowerShellで公開鍵を追加（1行にする）
Add-Content -Path C:\Users\deploy_user\.ssh\authorized_keys -Value "公開鍵の内容をここに貼り付け"
```

### 1.4 デプロイ先ディレクトリの作成と権限設定

```powershell
# Webサーバーのルートディレクトリを作成（例: C:\inetpub\gs_intra）
New-Item -Path "C:\inetpub\gs_intra" -ItemType Directory -Force

# デプロイユーザーに書き込み権限を付与
icacls C:\inetpub\gs_intra /grant "deploy_user:(OI)(CI)F" /T
```

### 1.5 PowerShell実行ポリシーの確認

```powershell
# 現在の実行ポリシーを確認
Get-ExecutionPolicy

# 必要に応じて変更（RemoteSignedを推奨）
Set-ExecutionPolicy RemoteSigned -Scope LocalMachine
```

### 1.6 SSH接続のテスト

ローカルPCから以下のコマンドでSSH接続をテストします。

```bash
# 秘密鍵を使ってSSH接続
ssh -i github_deploy_key deploy_user@サーバーのIPアドレスまたはドメイン

# 接続できれば成功
```

---

## 2. GitHub Actionsワークフローファイルの作成

プロジェクトのルートに `.github/workflows/deploy.yml` ファイルを作成します。

### 2.1 ディレクトリ構造

```
gs_intra_new/
├── .github/
│   └── workflows/
│       └── deploy.yml  ← 作成
├── src/
├── package.json
└── vite.config.ts
```

### 2.2 deploy.ymlの内容

```yaml
name: Deploy to Windows Server

# masterブランチへのpush時に実行
on:
  push:
    branches:
      - main  # またはmaster（ブランチ名に応じて変更）

# 環境変数の設定
env:
  NODE_VERSION: '20.x'  # Node.jsのバージョン

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      # 1. リポジトリのチェックアウト
      - name: Checkout repository
        uses: actions/checkout@v4

      # 2. Node.jsのセットアップ
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      # 3. 依存関係のインストール
      - name: Install dependencies
        run: npm ci

      # 4. プロジェクトのビルド
      - name: Build project
        run: npm run build

      # 5. ビルド結果の確認
      - name: List build output
        run: ls -la docs/

      # 6. WindowsサーバーへのデプロイメントをSSH経由で実行
      - name: Deploy to Windows Server
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          port: ${{ secrets.SERVER_PORT }}
          source: "docs/*"
          target: ${{ secrets.DEPLOY_PATH }}
          strip_components: 1  # docsディレクトリを除外してコピー
          rm: true  # 転送前にターゲットディレクトリをクリア

      # 7. デプロイ後の処理（オプション: サービス再起動など）
      - name: Post-deployment commands
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          port: ${{ secrets.SERVER_PORT }}
          script: |
            echo "Deployment completed at $(date)"
            # 必要に応じてIISの再起動やキャッシュクリアなどを実行
            # iisreset /noforce
```

### 2.3 別のワークフロー例（rsyncを使用する場合）

より柔軟な制御が必要な場合は、rsyncを使うこともできます。

```yaml
name: Deploy to Windows Server (rsync)

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy via rsync
        uses: burnett01/rsync-deployments@7.0.1
        with:
          switches: -avzr --delete
          path: docs/
          remote_path: ${{ secrets.DEPLOY_PATH }}
          remote_host: ${{ secrets.SERVER_HOST }}
          remote_user: ${{ secrets.SERVER_USERNAME }}
          remote_key: ${{ secrets.SSH_PRIVATE_KEY }}
          remote_port: ${{ secrets.SERVER_PORT }}
```

---

## 3. GitHubのSecretsの設定

秘密情報をGitHub Actionsで安全に使用するために、Secretsを設定します。

### 3.1 Secretsの登録手順

1. GitHubのリポジトリページを開く
2. **Settings** タブをクリック
3. 左サイドバーの **Secrets and variables** → **Actions** をクリック
4. **New repository secret** ボタンをクリック
5. 以下の情報を1つずつ登録

### 3.2 登録するSecrets

| Name | Value | 説明 |
|------|-------|------|
| `SERVER_HOST` | `192.168.1.100` または `server.example.com` | WindowsサーバーのIPアドレスまたはドメイン名 |
| `SERVER_USERNAME` | `deploy_user` | SSH接続用のユーザー名 |
| `SSH_PRIVATE_KEY` | `-----BEGIN OPENSSH PRIVATE KEY-----`<br>`...`<br>`-----END OPENSSH PRIVATE KEY-----` | 生成した秘密鍵の内容（github_deploy_keyファイルの全内容） |
| `SERVER_PORT` | `22` | SSHポート（デフォルトは22） |
| `DEPLOY_PATH` | `/cygdrive/c/inetpub/gs_intra` または `C:\\inetpub\\gs_intra` | デプロイ先のパス（形式はSSHの実装による） |

**注意**: `DEPLOY_PATH` の形式はWindowsのSSH実装により異なります：
- OpenSSH for Windows: `C:/inetpub/gs_intra` または `/cygdrive/c/inetpub/gs_intra`
- 実際のパスを確認するには、サーバーにSSH接続して `pwd` コマンドを実行してください

### 3.3 秘密鍵の登録方法

```bash
# 秘密鍵の内容をクリップボードにコピー（Windows）
cat github_deploy_key | clip

# または（Mac/Linux）
cat github_deploy_key | pbcopy  # Mac
cat github_deploy_key | xclip -selection clipboard  # Linux
```

GitHubの `SSH_PRIVATE_KEY` Secretに、クリップボードの内容をそのまま貼り付けます（改行も含めて全て）。

---

## 4. 動作確認

### 4.1 初回デプロイ

1. ワークフローファイルをコミット＆プッシュ

```bash
git add .github/workflows/deploy.yml
git commit -m "Add CI/CD workflow for Windows server"
git push origin main
```

2. GitHubのリポジトリページで **Actions** タブを開く
3. ワークフローが実行されていることを確認
4. 各ステップが成功したか確認（緑色のチェックマーク）

### 4.2 エラーが発生した場合

#### SSH接続エラー
- サーバーのファイアウォール設定を確認
- `SERVER_HOST` が正しいか確認
- SSH鍵の権限が正しいか確認
- サーバーでsshdサービスが起動しているか確認

```powershell
# サーバーでsshdの状態を確認
Get-Service sshd

# ログを確認
Get-EventLog -LogName Application -Source OpenSSH -Newest 20
```

#### パス関連のエラー
- `DEPLOY_PATH` の形式を確認
- サーバーにSSH接続して実際のパスを確認

```bash
ssh -i github_deploy_key deploy_user@サーバーIP
pwd  # 現在のパスを表示
cd /cygdrive/c/inetpub/  # 移動できるか確認
```

#### 権限エラー
- デプロイ先ディレクトリの権限を確認

```powershell
icacls C:\inetpub\gs_intra
```

---

## 5. 高度な設定（オプション）

### 5.1 デプロイ前のバックアップ

```yaml
      - name: Backup current deployment
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          port: ${{ secrets.SERVER_PORT }}
          script: |
            $BackupPath = "C:\backups\gs_intra_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
            Copy-Item -Path "C:\inetpub\gs_intra" -Destination $BackupPath -Recurse
            echo "Backup created: $BackupPath"
```

### 5.2 Slackやメールへの通知

```yaml
      - name: Notify deployment status
        if: always()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Deployment to Windows Server'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### 5.3 環境別デプロイ（staging/production）

```yaml
on:
  push:
    branches:
      - main        # production
      - develop     # staging

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      # ... build steps ...
      
      - name: Set deploy target
        id: deploy-target
        run: |
          if [ "${{ github.ref }}" = "refs/heads/main" ]; then
            echo "path=${{ secrets.PROD_DEPLOY_PATH }}" >> $GITHUB_OUTPUT
            echo "host=${{ secrets.PROD_SERVER_HOST }}" >> $GITHUB_OUTPUT
          else
            echo "path=${{ secrets.STAGING_DEPLOY_PATH }}" >> $GITHUB_OUTPUT
            echo "host=${{ secrets.STAGING_SERVER_HOST }}" >> $GITHUB_OUTPUT
          fi
      
      - name: Deploy
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ steps.deploy-target.outputs.host }}
          username: ${{ secrets.SERVER_USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          source: "docs/*"
          target: ${{ steps.deploy-target.outputs.path }}
```

### 5.4 IISアプリケーションプールの再起動

デプロイ後にIISを再起動する場合：

```yaml
      - name: Restart IIS Application Pool
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          port: ${{ secrets.SERVER_PORT }}
          script: |
            Import-Module WebAdministration
            Restart-WebAppPool -Name "YourAppPoolName"
            # または IIS全体を再起動
            # iisreset /noforce
```

---

## 6. セキュリティのベストプラクティス

### 6.1 SSH鍵の管理
- ✅ **DO**: 専用のデプロイ鍵を使用する
- ✅ **DO**: 鍵にパスフレーズを設定しない（GitHub Actionsで使用するため）
- ❌ **DON'T**: 個人用のSSH鍵を使用しない

### 6.2 ユーザー権限
- ✅ **DO**: 最小権限の原則に従う
- ✅ **DO**: デプロイ用の専用ユーザーを作成する
- ❌ **DON'T**: Administratorアカウントを直接使用しない

### 6.3 ファイアウォール
- ✅ **DO**: 必要なIPアドレスのみSSHアクセスを許可（GitHub ActionsのIPレンジ）
- ✅ **DO**: 不要なポートを閉じる

### 6.4 監視とログ
- ✅ **DO**: デプロイのログを保存する
- ✅ **DO**: 失敗時の通知を設定する

---

## 7. トラブルシューティング

### 問題: "Add-WindowsCapability" コマンドが使えない / OpenSSHのインストールに失敗

**原因**: 古いOS（Windows Server 2016など）では `Add-WindowsCapability` コマンドがサポートされていない

**解決方法**: 手動でOpenSSHをインストールしてください

1. [Win32-OpenSSH Releases](https://github.com/PowerShell/Win32-OpenSSH/releases)から最新版をダウンロード
2. ZIPを解凍して `C:\Program Files\OpenSSH` に配置
3. 管理者権限のPowerShellで以下を実行:

```powershell
cd "C:\Program Files\OpenSSH"
powershell.exe -ExecutionPolicy Bypass -File install-sshd.ps1
Start-Service sshd
Set-Service -Name sshd -StartupType 'Automatic'
New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
```

詳細は本マニュアルの「1.1 OpenSSH Serverのインストール - 方法B」を参照してください。

### 問題: "Permission denied (publickey)"

**原因**: SSH鍵認証が失敗している

**解決方法**:
1. 公開鍵が正しく `authorized_keys` に追加されているか確認
2. `authorized_keys` の権限を確認（所有者のみ読み書き可能にする）
3. GitHubのSecretsに正しい秘密鍵が登録されているか確認

### 問題: "Connection timed out"

**原因**: ネットワークまたはファイアウォールの問題

**解決方法**:
1. サーバーのファイアウォールでポート22が開いているか確認
2. sshdサービスが起動しているか確認
3. `SERVER_HOST` が正しいか確認

### 問題: ファイルが正しくデプロイされない

**原因**: パスの指定が正しくない

**解決方法**:
1. サーバーにSSH接続してパスを確認
2. `DEPLOY_PATH` の形式を確認（Windows形式 vs Unix形式）
3. ワークフローの `strip_components` オプションを調整

### 問題: ビルドは成功するがデプロイが失敗する

**原因**: デプロイ先の権限不足

**解決方法**:
```powershell
# デプロイ先の権限を再設定
icacls C:\inetpub\gs_intra /grant "deploy_user:(OI)(CI)F" /T
```

---

## 8. 参考情報

### 使用しているGitHub Actions

- **actions/checkout**: リポジトリのチェックアウト
- **actions/setup-node**: Node.js環境のセットアップ
- **appleboy/scp-action**: SCPでファイル転送
- **appleboy/ssh-action**: SSH経由でコマンド実行

### 関連ドキュメント

- [GitHub Actions公式ドキュメント](https://docs.github.com/ja/actions)
- [OpenSSH for Windows](https://learn.microsoft.com/ja-jp/windows-server/administration/openssh/openssh_install_firstuse)
- [IIS管理](https://learn.microsoft.com/ja-jp/iis/)

---

## 9. まとめ

このマニュアルに従うことで、以下が実現できます：

1. ✅ `git push` 時に自動的にビルドが実行される
2. ✅ ビルド成果物がWindowsサーバーに自動デプロイされる
3. ✅ セキュアなSSH鍵認証を使用
4. ✅ エラー時にGitHub Actionsで詳細を確認可能

何か問題が発生した場合は、GitHub ActionsのActionsタブでログを確認してください。
