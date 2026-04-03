# イントラサーバーへのGitHub Actions自動デプロイ設定手順書
**（ローカルPC中継・Windowsサービス常駐方式）**

## 概要
インターネットと社内LANの両方に接続できるローカル作業用PCを「GitHub Actions ランナー」として常駐させ、GitHubからの変更を検知して社内サーバー（インターネット非接続）へ自動デプロイ（SCP転送）を行う構成です。

ランナーを「Windowsサービス」としてあなた自身のユーザーアカウントで常駐させることで、PC起動時から自動でデプロイ待ち状態となり、SSHの厳格な権限エラーも回避できます。

## 前提条件
* **デプロイ先サーバー**: `192.168.8.205`（AdministratorでSSHログイン可能であること）
* **中継用ローカルPC**: Windows OS（GitHubと対象サーバーの両方に通信できること）
* **認証方式**: SSH公開鍵認証（パスワード認証は不可）

---

## 1. サーバー側の準備（公開鍵の登録）
デプロイ先のサーバーに、SSH接続を許可するための公開鍵を登録します。
**⚠️注意: 文字化けや改行が混ざると認証に失敗するため、以下の手順を厳守してください。**

1. サーバー（`192.168.8.205`）に Administrator でログインします。
2. 以下のファイルを開きます（ファイル・フォルダがない場合は作成します）。
   * `C:\Users\Administrator\.ssh\authorized_keys`
3. ローカルPCで生成した **公開鍵（`github_deploy_key.pub`）** の中身をコピーし、ファイルに貼り付けます。
   * ※ `ssh-ed25519 AAA...` から始まる「改行のない1行のテキスト」になっていることを確認してください。
4. **【最重要】** メモ帳の「ファイル」＞「名前を付けて保存」を開き、右下のエンコードを必ず **`UTF-8`** に指定して保存（上書き）します。

---

## 2. ローカルPC側の準備（秘密鍵の配置と権限設定）
SSH秘密鍵（`github_deploy_key`）は、**「実行するユーザー（自分）以外は絶対にアクセスできない状態」**にしないとOpenSSHが使用を拒否します。

1. ローカルPCのCドライブ直下などにフォルダを作成し、秘密鍵を配置します。
   * 配置例: `C:\gs_intra_new_key\github_deploy_key`
2. ローカルPCで **PowerShell を管理者として実行**し、以下のコマンドを順番に実行して権限を自分ひとりだけに絞り込みます。

```powershell
# 1. 変数に鍵のパスをセット
$keyPath = "C:\gs_intra_new_key\github_deploy_key"

# 2. 権限の継承を無効化し、既存の全権限（SYSTEM等含む）を強制削除して空にする
icacls $keyPath /inheritance:r

# 3. 現在ログインしているユーザー（あなた自身）だけにフルコントロールを付与する
$currentUser = "$env:USERNAME"
icacls $keyPath /grant "${currentUser}:(F)"

# 4. 権限の最終確認
icacls $keyPath
```
※最後のコマンドの結果に、**自分のユーザー名（例：YSDAD\00053659）だけ**が表示されていれば成功です。

---

## 3. GitHub Actions ランナーの登録とサービス化
ローカルPCをランナーとしてGitHubに登録し、Windowsサービスとして組み込みます。

1. GitHubの対象リポジトリを開き、**[Settings] > [Actions] > [Runners]** へ移動します。
2. **[New self-hosted runner]** をクリックし、OSに **[Windows]** を選択します。（New self-hosted runnerが表示されない場合は管理者に確認！）
3. ローカルPCでPowerShellを開き、画面に表示されている `Download` の手順に従い、ランナーを展開します（例：`C:\actions-runner`）。
4. 続けて、画面の `Configure` に記載されているコマンドを実行します。
   ```powershell
   # コマンド例（実際のトークンはGitHub画面からコピーしてください）
   .\config.cmd --url https://github.com/アカウント名/リポジトリ名 --token XXXXXXXXXXXXXXXX
   ```
5. 初期設定の質問には以下のように答えます。
   * Runner group, Runner name, Labels, Work folder: すべて **`Enter`（デフォルト）**
   * **`Would you like to run the runner as service? (Y/N)`**: ここで必ず **`Y`** を入力します。
   * `User account to use for the service`: そのまま **`Enter`** を押します。（※一時的にNETWORK SERVICEで登録されますが、後で変更します）

---

## 4. サービス実行アカウントの変更（重要）
OpenSSHの認証を通すため、バックグラウンドで動くサービスを「あなた個人のWindowsアカウント」で実行するように設定を変更します。

1. キーボードの `Windowsキー + R` を押し、「ファイル名を指定して実行」に **`services.msc`** と入力してEnterを押します。
2. サービス一覧から **`GitHub Actions Runner (リポジトリ名)`** を見つけて右クリックし、**「プロパティ」**を開きます。
3. **「ログオン」**タブを選択します。
4. **「アカウント」**のラジオボタンを選択し、以下を入力します。
   * アカウント名: `YSDAD\00053659`（など、普段ログインしているユーザー名）
   * パスワード: 普段PCにログインする際のパスワード
5. 「適用」＞「OK」を押します。
6. サービス一覧画面で対象のサービスを右クリックし、**「再起動」** をクリックします。
   * ※エラーなく「実行中」になれば設定完了です。これでPCを立ち上げるだけで自動デプロイが待機状態になります。

---

## 5. ワークフロー（YAMLファイル）の作成
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
      # Gitの通信エラー（SSL certificate problem）を回避するための設定
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
          # 秘密鍵のパス（※必ずシングルクォートで囲むこと）
          $PrivateKeyPath = 'C:\gs_intra_new_key\github_deploy_key'
          
          # デプロイ先のパス（※転送エラーを防ぐため、Windowsパスでも区切りはスラッシュ(/)にする）
          $TargetServer = 'Administrator@192.168.8.205:C:/Bitnami/wordpress/apps/wordpress/htdocs/gs-intra-new'
          
          # ファイルの転送実行
          # -B: パスワード入力待ちによるフリーズを防止
          # -o StrictHostKeyChecking=no: 初回接続時の確認プロンプトをスキップ
          # （※PowerShellの仕様上、-vをつけるとエラー判定される場合があるため外しています）
          scp -B -i "$PrivateKeyPath" -o StrictHostKeyChecking=no -r ./* $TargetServer
```

### 運用時のチェックポイント
* **デプロイが失敗するようになった場合**:
  PCのパスワードを変更した場合は、手順4の「サービスのログオンパスワード」も変更する必要があります。
* **権限エラー（bad permissions）が再発した場合**:
  Windowsのアップデートやフォルダ移動等で秘密鍵の権限が変わってしまった可能性があります。手順2の PowerShellコマンドを再度実行してください。