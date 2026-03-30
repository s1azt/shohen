# CI/CD クイックスタートガイド 🚀

このガイドでは、WindowsサーバーへのCI/CD環境を**最短**で構築する手順を説明します。

## 前提条件

- ✅ Windowsサーバーへの管理者アクセス権
- ✅ GitHubリポジトリへの管理者アクセス権
- ✅ SSHクライアント（Windows PowerShell、Git Bash、またはWSL）

---

## 📋 手順（所要時間: 約15-30分）

### ステップ1: Windowsサーバーのセットアップ（10-15分）

#### 1.1 セットアップスクリプトの実行

Windowsサーバーで**PowerShellを管理者権限で開き**、以下を実行します。

```powershell
# スクリプトのダウンロード（リポジトリをクローンしている場合）
cd C:\path\to\gs_intra_new
.\scripts\setup-windows-cicd.ps1 -DeployUserName "deploy_user" -DeployPath "C:\inetpub\gs_intra"

# または手動でOpenSSH Serverをインストール
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
Start-Service sshd
Set-Service -Name sshd -StartupType 'Automatic'
```

#### 1.2 デプロイユーザーの作成（スクリプトを使わない場合）

```powershell
# パスワードの設定
$Password = Read-Host -AsSecureString "パスワードを入力"
New-LocalUser "deploy_user" -Password $Password -FullName "Deploy User" -Description "CI/CD Deploy User"
Add-LocalGroupMember -Group "Users" -Member "deploy_user"
```

#### 1.3 デプロイ先ディレクトリの作成

```powershell
# ディレクトリ作成と権限設定
New-Item -Path "C:\inetpub\gs_intra" -ItemType Directory -Force
icacls "C:\inetpub\gs_intra" /grant "deploy_user:(OI)(CI)F" /T
```

---

### ステップ2: SSH鍵の生成と設定（5分）

#### 2.1 SSH鍵ペアの生成（ローカルPC）

```bash
# Ed25519鍵の生成（推奨）
ssh-keygen -t ed25519 -C "github-actions-deploy" -f github_deploy_key

# パスフレーズは空白のままEnterを押す（GitHub Actionsで使用するため）
```

これで2つのファイルが生成されます：
- `github_deploy_key` - 秘密鍵（GitHubに登録）
- `github_deploy_key.pub` - 公開鍵（サーバーに登録）

#### 2.2 公開鍵をサーバーに登録

**方法A: SCPでコピー（推奨）**
```bash
# 公開鍵をサーバーにコピー
scp github_deploy_key.pub Administrator@サーバーIP:C:/Users/deploy_user/.ssh/authorized_keys
```

**方法B: 手動でコピー**

1. `github_deploy_key.pub` の内容をコピー
2. サーバーでPowerShellを開く
3. 以下を実行：

```powershell
# .sshディレクトリと authorized_keys の作成
mkdir C:\Users\deploy_user\.ssh -Force
New-Item -Path C:\Users\deploy_user\.ssh\authorized_keys -ItemType File -Force

# 公開鍵を追加（ここに公開鍵の内容を貼り付け）
Add-Content -Path C:\Users\deploy_user\.ssh\authorized_keys -Value "ssh-ed25519 AAAA... github-actions-deploy"

# 権限設定
icacls C:\Users\deploy_user\.ssh\authorized_keys /inheritance:r
icacls C:\Users\deploy_user\.ssh\authorized_keys /grant "deploy_user:F"
icacls C:\Users\deploy_user\.ssh\authorized_keys /grant "SYSTEM:F"
```

#### 2.3 SSH接続のテスト

```bash
# ローカルPCからSSH接続をテスト
ssh -i github_deploy_key deploy_user@サーバーIP

# 接続できたら成功！exitで切断
exit
```

---

### ステップ3: GitHubの設定（5分）

#### 3.1 GitHub Secretsの登録

1. GitHubリポジトリを開く
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret** をクリック
4. 以下の5つを登録：

| Name | Value | 例 |
|------|-------|---|
| `SERVER_HOST` | サーバーのIPまたはドメイン | `192.168.1.100` |
| `SERVER_USERNAME` | デプロイユーザー名 | `deploy_user` |
| `SSH_PRIVATE_KEY` | 秘密鍵の全内容 | `-----BEGIN OPENSSH...` |
| `SERVER_PORT` | SSHポート | `22` |
| `DEPLOY_PATH` | デプロイ先パス | `C:/inetpub/gs_intra` |

**秘密鍵のコピー方法：**
```bash
# Windows
type github_deploy_key | clip

# Mac
cat github_deploy_key | pbcopy

# Linux
cat github_deploy_key | xclip -selection clipboard
```

#### 3.2 ワークフローファイルの確認

`.github/workflows/deploy.yml` がリポジトリに存在することを確認します。

```bash
ls .github/workflows/deploy.yml
```

なければ、すでに作成されているファイルをコミット＆プッシュします：

```bash
git add .github/workflows/deploy.yml
git commit -m "Add CI/CD workflow"
git push origin main
```

---

### ステップ4: 動作確認（5分）

#### 4.1 自動デプロイのテスト

1. 小さな変更を加える（例: README.mdを編集）
```bash
echo "# Test Deploy" >> README.md
git add README.md
git commit -m "Test CI/CD deployment"
git push origin main
```

2. GitHubでActionsタブを開く
3. ワークフローが実行されることを確認
4. すべてのステップが成功（✅）することを確認

#### 4.2 サーバーでファイルを確認

```powershell
# サーバーで実行
ls C:\inetpub\gs_intra
```

index.htmlやassetsフォルダがあれば成功です！🎉

---

## 🎯 完了！

これでCI/CD環境の構築が完了しました。今後は `git push` するだけで自動的にデプロイされます。

---

## ⚡ ワークフロー

```
コード変更
  ↓
git commit & push
  ↓
GitHub Actions トリガー
  ↓
npm install & build
  ↓
Windowsサーバーへデプロイ
  ↓
完了！
```

---

## 🔧トラブルシューティング

### エラー: "Permission denied (publickey)"
→ SSH鍵の設定を確認
```powershell
# サーバーで実行
icacls C:\Users\deploy_user\.ssh\authorized_keys
cat C:\Users\deploy_user\.ssh\authorized_keys
```

### エラー: "Connection timed out"
→ ファイアウォールの確認
```powershell
# サーバーで実行
Get-NetFirewallRule -Name *ssh* | Where-Object { $_.Enabled -eq $true }
Test-NetConnection -ComputerName localhost -Port 22
```

### エラー: "No such file or directory"
→ デプロイパスの確認
```powershell
# サーバーで実行
.\scripts\verify-deploy-path.ps1
```

### ワークフローが実行されない
→ ブランチ名の確認
```yaml
# deploy.yml の branches を確認
on:
  push:
    branches:
      - main  # または master
```

---

## 📚 詳細情報

より詳しい情報は以下のドキュメントを参照してください：

- 📖 [WindowsサーバーへのCI_CD設定マニュアル.md](./WindowsサーバーへのCI_CD設定マニュアル.md) - 完全な設定手順
- ✅ [CI_CD設定チェックリスト.md](./CI_CD設定チェックリスト.md) - 設定確認用チェックリスト
- 🔧 [scripts/setup-windows-cicd.ps1](./scripts/setup-windows-cicd.ps1) - 自動セットアップスクリプト
- 🔍 [scripts/verify-deploy-path.ps1](./scripts/verify-deploy-path.ps1) - パス検証スクリプト

---

## 🎓 次のステップ

基本的なCI/CDが動作したら、以下の機能を追加することを検討してください：

- [ ] staging環境の追加
- [ ] デプロイ前の自動バックアップ
- [ ] Slack通知の設定
- [ ] 本番環境へのデプロイ承認フロー
- [ ] ロールバック機能

詳細は完全マニュアルの「高度な設定」セクションを参照してください。

---

**質問や問題がありますか？**
`WindowsサーバーへのCI_CD設定マニュアル.md` のトラブルシューティングセクションを確認してください。
