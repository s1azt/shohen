---

# イントラサーバーへのGitHub Actions自動デプロイ設定手順書（ローカルPC中継方式）

## 概要
イントラネット内のサーバーが直接インターネット（GitHub）と通信できない環境において、**「インターネットと社内LANの両方に接続できる作業用ローカルPC」** をGitHub Actionsのセルフホストランナー（中継地点）として利用し、SCPで自動デプロイを行う構成です。

## 前提条件
* **デプロイ先サーバー**: `192.168.8.205`（Administratorユーザーでログイン可能であること）
* **中継用ローカルPC**: Windows 10/11等の作業端末（GitHubとサーバーの両方に通信できること）
* **認証方式**: SSH公開鍵認証を使用（パスワード認証は不可）

---

## 1. サーバー側の準備（公開鍵の登録）
デプロイ先のサーバーに、SSH接続を許可するための公開鍵を登録します。
**※文字化けによる認証エラーを防ぐため、文字コードの指定が極めて重要です。**

1. サーバー（`192.168.8.205`）に Administrator でログインします。
2. 以下のファイルを開きます（なければ作成します）。
   * `C:\Users\Administrator\.ssh\authorized_keys`
3. ローカルPCで生成した **公開鍵（`github_deploy_key.pub`）** の中身をコピーし、ファイルに貼り付けます。
   * ※ `ssh-ed25519 AAA...` から始まる、途中に改行がない「1行」のテキストになっていることを確認してください。
4. **【重要】** メモ帳の「名前を付けて保存」から、エンコードを必ず **`UTF-8`** に指定して保存（上書き）します。

---

## 2. ローカルPC側の準備（秘密鍵の配置と権限設定）
SSHの秘密鍵はセキュリティチェックが非常に厳しいため、実行ユーザー（自分）以外がアクセスできないように権限を最小化する必要があります。

1. ローカルPCのCドライブ直下などにフォルダを作成し、秘密鍵を配置します。
   * 配置例: `C:\gs_intra_new_key\github_deploy_key`
2. 管理者権限で **PowerShell** を起動し、以下のコマンドを順番に実行して権限をリセット＆再設定します。

```powershell
# 変数に鍵のパスをセット
$keyPath = "C:\gs_intra_new_key\github_deploy_key"

# 1. 権限の継承を無効化し、既存の権限（SYSTEMなど含む）をすべて削除して空にする
icacls $keyPath /inheritance:r

# 2. 現在ログインしているユーザーだけにフルコントロールを付与する
$currentUser = "$env:USERNAME"
icacls $keyPath /grant "${currentUser}:(F)"

# 3. 権限の最終確認（自分のユーザー名だけが表示されれば成功）
icacls $keyPath
```

---

## 3. GitHub Actions ランナーの登録と起動
ローカルPCを「デプロイの指示を待つランナー」としてGitHubに登録します。

1. GitHubの対象リポジトリを開き、**[Settings] > [Actions] > [Runners]** へ移動します。
2. **[New self-hosted runner]** をクリックし、OSに **[Windows]** を選択します。
3. ローカルPCでPowerShellを開き、画面に表示されている `Download` のコマンドを実行してランナーをダウンロード・展開します。（`C:\actions-runner` などのフォルダで行うのがおすすめです）
4. 続けて、画面に表示されている `Configure` のコマンドを実行します。
   ```powershell
   # 例（実際のトークンはGitHub画面からコピーしてください）
   .\config.cmd --url https://github.com/ユーザー名/リポジトリ名 --token XXXXXXXXXXXXXXXX
   ```
   * 途中の質問はすべて `Enter` キー（デフォルト）で進めて構いません。
   * ※ `Enter run runner as service? (Y/N)` についても、**`N`** (デフォルト) で進めます。
5. **ランナーを手動起動します。**
   ```powershell
   .\run.cmd
   ```
   * `Listening for Jobs` と表示されれば待機完了です。このウィンドウはデプロイ時に**開いたまま（最小化）**にしておきます。

---

## 4. ワークフロー（YAML）の作成
GitHubリポジトリに `.github/workflows/deploy.yml` を作成し、以下の内容をコミットします。

```yaml
name: Deploy to Intra Server via Local PC

on:
  push:
    branches: [ main ] # mainブランチにpushされたら実行

jobs:
  deploy:
    runs-on: self-hosted

    steps:
      # 社内プロキシ等の独自SSL証明書によるエラー（SSL certificate problem）を回避する設定
      - name: Git SSL Verify Disable
        run: git config --global http.sslVerify false
        shell: cmd

      - name: Checkout code
        uses: actions/checkout@v4
        with:
          clean: true

      - name: Deploy files via SCP
        shell: powershell
        run: |
          # 秘密鍵のパスとターゲットサーバー情報
          # ※パスの囲み文字は必ずシングルクォート（'）を使用すること
          $PrivateKeyPath = 'C:\gs_intra_new_key\github_deploy_key'
          
          # パスの区切り文字はスラッシュ（/）を使用するとトラブルを防げます
          $TargetServer = 'Administrator@192.168.8.205:C:/inetpub/gs_intra'
          
          # -B: パスワード入力待ちによるフリーズを防止
          # -o StrictHostKeyChecking=no: 初回接続時の確認プロンプトをスキップ
          scp -v -B -i "$PrivateKeyPath" -o StrictHostKeyChecking=no -r ./* $TargetServer
```

---

## 5. 運用時の注意事項

* **デプロイの実行条件**:
  自動デプロイが成功するためには、中継地点であるローカルPCの電源が入っており、かつ `.\run.cmd`（ランナー）が起動している必要があります。
* **権限エラー（bad permissions）が再発した場合**:
  Windowsのアップデートやフォルダ移動などで秘密鍵の権限が変わってしまった可能性があります。その際は、手順2の PowerShell コマンドを再度実行して権限を絞り直してください。
* **サービス化について**:
  毎回 `run.cmd` を立ち上げるのが手間で、PC起動時にバックグラウンドで常駐させたい場合は、PowerShell（管理者）で `.\config.cmd installsvc` を実行することでWindowsサービスとして登録することも可能です。ただしその場合は、手順2の権限付与で `NT AUTHORITY\NETWORK SERVICE` アカウントにも読み取り権限を追加で付与する必要があります。

---