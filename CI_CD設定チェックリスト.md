# CI/CD設定チェックリスト

このチェックリストを使用して、WindowsサーバーへのCI/CD設定が完了しているか確認してください。

## ✅ サーバー側の設定

### 1. OpenSSH Serverのインストール
- [ ] OpenSSH Serverがインストールされている
- [ ] sshdサービスが起動している
- [ ] sshdサービスが自動起動に設定されている

確認コマンド:
```powershell
Get-Service sshd
```

### 2. ファイアウォール設定
- [ ] ポート22（SSH）が開放されている
- [ ] 外部からSSH接続できることを確認

確認コマンド:
```powershell
Get-NetFirewallRule -Name *ssh* | Where-Object { $_.Enabled -eq $true }
Test-NetConnection -ComputerName localhost -Port 22
```

### 3. デプロイユーザーの作成
- [ ] デプロイ専用ユーザー（例: deploy_user）が作成されている
- [ ] ユーザーに適切な権限が付与されている

確認コマンド:
```powershell
Get-LocalUser -Name "deploy_user"
Get-LocalGroupMember -Group "Users" | Where-Object { $_.Name -like "*deploy_user*" }
```

### 4. SSH鍵認証の設定
- [ ] SSH鍵ペアが生成されている
- [ ] 公開鍵がサーバーの `authorized_keys` に追加されている
- [ ] `authorized_keys` の権限が正しく設定されている

確認コマンド:
```powershell
Test-Path "C:\Users\deploy_user\.ssh\authorized_keys"
icacls "C:\Users\deploy_user\.ssh\authorized_keys"
```

### 5. デプロイ先ディレクトリの設定
- [ ] デプロイ先ディレクトリが作成されている（例: C:\inetpub\gs_intra）
- [ ] デプロイユーザーに書き込み権限がある

確認コマンド:
```powershell
Test-Path "C:\inetpub\gs_intra"
icacls "C:\inetpub\gs_intra" | Select-String "deploy_user"
```

### 6. SSH接続のテスト
- [ ] ローカルPCからSSH接続できる
- [ ] 鍵認証で接続できる

テストコマンド（ローカルPCから実行）:
```bash
ssh -i github_deploy_key deploy_user@サーバーIP
```

---

## ✅ GitHub側の設定

### 1. ワークフローファイルの作成
- [ ] `.github/workflows/deploy.yml` が作成されている
- [ ] ワークフローファイルがリポジトリにプッシュされている

確認:
```bash
ls -la .github/workflows/deploy.yml
```

### 2. GitHub Secretsの登録
以下のSecretsがGitHubリポジトリに登録されているか確認してください。

- [ ] **SERVER_HOST**
  - 内容: サーバーのIPアドレスまたはドメイン名
  - 例: `192.168.1.100` または `server.example.com`

- [ ] **SERVER_USERNAME**
  - 内容: SSH接続用のユーザー名
  - 例: `deploy_user`

- [ ] **SSH_PRIVATE_KEY**
  - 内容: 秘密鍵の全内容（改行を含む）
  - フォーマット: 
    ```
    -----BEGIN OPENSSH PRIVATE KEY-----
    ...
    -----END OPENSSH PRIVATE KEY-----
    ```

- [ ] **SERVER_PORT**
  - 内容: SSHポート
  - 例: `22`

- [ ] **DEPLOY_PATH**
  - 内容: デプロイ先のパス
  - 例: `C:/inetpub/gs_intra` または `/cygdrive/c/inetpub/gs_intra`

確認方法:
1. GitHubリポジトリページを開く
2. **Settings** → **Secrets and variables** → **Actions** を選択
3. 上記の5つのSecretsが登録されているか確認

---

## ✅ 動作テスト

### 1. 手動デプロイのテスト
- [ ] GitHub Actionsの画面でワークフローが表示される
- [ ] "Run workflow"で手動実行できる
- [ ] すべてのステップが成功する（緑のチェックマーク）

### 2. 自動デプロイのテスト
- [ ] mainブランチに変更をプッシュする
- [ ] GitHub Actionsが自動的に実行される
- [ ] ビルドステップが成功する
- [ ] デプロイステップが成功する
- [ ] サーバー上にファイルが配置されている

確認コマンド（サーバー上で実行）:
```powershell
ls C:\inetpub\gs_intra
Get-ChildItem C:\inetpub\gs_intra -Recurse | Measure-Object | Select-Object -ExpandProperty Count
```

### 3. ファイルの確認
- [ ] index.htmlが配置されている
- [ ] assetsフォルダとその中身が配置されている
- [ ] すべてのファイルが正しく転送されている

---

## ✅ セキュリティチェック

### 1. SSH設定
- [ ] パスワード認証が無効化されている（推奨）
- [ ] 鍵認証のみが有効になっている
- [ ] 秘密鍵がGitHubのSecretsに安全に保管されている

確認コマンド（サーバー上で実行）:
```powershell
Select-String -Path "C:\ProgramData\ssh\sshd_config" -Pattern "PasswordAuthentication"
Select-String -Path "C:\ProgramData\ssh\sshd_config" -Pattern "PubkeyAuthentication"
```

### 2. ユーザー権限
- [ ] デプロイユーザーは最小限の権限のみを持っている
- [ ] 管理者権限は付与されていない（必要な場合を除く）

### 3. ファイアウォール
- [ ] 必要なポートのみが開放されている
- [ ] 不要なサービスは停止している

---

## ✅ トラブルシューティング準備

### ログの確認方法を把握していますか？

- [ ] GitHub ActionsのActionsタブでログを確認できる
- [ ] サーバー側のSSHログを確認できる

SSHログ確認コマンド（サーバー上で実行）:
```powershell
Get-EventLog -LogName Application -Source OpenSSH -Newest 20
Get-EventLog -LogName System -Source sshd -Newest 20
```

### バックアップ戦略

- [ ] デプロイ前に現在のファイルをバックアップする仕組みがある（オプション）
- [ ] ロールバック手順が文書化されている

---

## 🎯 完了確認

すべてのチェックボックスにチェックが入ったら、CI/CD環境の構築は完了です！

最終テスト:
1. 小さな変更（例: README.mdの更新）をコミット
2. mainブランチにプッシュ
3. GitHub Actionsが自動実行される
4. サーバー上でファイルが更新される
5. ブラウザでアプリケーションにアクセスし、変更が反映されているか確認

---

## 📝 次のステップ（オプション）

より高度な設定を検討してください:

- [ ] staging環境とproduction環境の分離
- [ ] デプロイ前のバックアップ自動化
- [ ] Slack/メール通知の設定
- [ ] IISアプリケーションプールの自動再起動
- [ ] ヘルスチェックの追加
- [ ] ロールバック機能の実装

---

## 🆘 問題が発生した場合

1. **GitHub Actions**のActionsタブでエラーログを確認
2. **サーバー**のSSHログを確認
3. **ネットワーク**接続を確認（ping、telnet）
4. **権限**を再確認（ファイル、ディレクトリ、ユーザー）
5. **マニュアル**の「トラブルシューティング」セクションを参照

詳細は `WindowsサーバーへのCI_CD設定マニュアル.md` を確認してください。
