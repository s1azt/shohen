# GSイントラリニューアル コンテンツ更新・追加マニュアル

## 1. 環境構築手順

### 事前準備

* **VSCodeのインストール**: [ダウンロードページ](https://code.visualstudio.com/download)
* **GitHubアカウントの作成**: [公式サイト](https://github.com/)

### ローカル環境セットアップ

1. **フォルダ作成**: 任意の場所に `UXUI-LAB` フォルダを作成する。
2. **VSCodeで開く**: VSCodeを立ち上げ、作成した `UXUI-LAB` フォルダを開く。
3. **ターミナル起動**: VSCode上でターミナルを開き、以下のコマンドを順に実行する。

#### 実行コマンド

```bash
# ① git環境の初期化
git init

# ② GitHubへの接続設定
git remote add origin https://github.com/s1azt/shohen.git

# ※ 設定確認
git remote -v

# ③ GitHubから最新資産を取得
git pull origin main

# ④ ローカルブランチの確認・設定
git branch
git branch -c main
git branch -M main

# ④ ローカル起動テスト
npx http-server -o
Ctrl＋C で停止
```

---

## 2. 新規リンク先ページの作成手順

### 制作・編集フロー

1. **FigmaMake**: ページを作成する。
2. **VSCodeへ配置**: 作成されたページファイルをVSCode上に貼り付ける。
3. **修正**: `image` フォルダパスや画像名を必要に応じて修正。
4. **リネーム（重要）**: **`src` フォルダ名を `docs` に変更する。**

### GitHubへの登録

```bash
# 変更資産の追加
git add .

# 変更状況の確認
git status

# コミット（メッセージ内の日付は適宜変更）
git commit -m "GSイントラリニューアルサイト新規ページ追加20260116"

# GitHubへ送信
git push origin main

```

* **反映確認**: [GitHubリポジトリ（仮環境）](https://github.com/s1azt/shohen/) 内に新規ページが追加されていることを確認。

### サーバーリリース

1. **リモート接続**: 以下の情報でサーバーにログインする。
| 項目 | 設定値 |
| :--- | :--- |
| **IP** | `192.168.8.205` |
| **ID** | `VPC-901-100566\Administrator` |
| **PASS** | `HWYL3A6Sy2` |
2. **ファイル配置**: 以下のパスに、作成した資産を貼り付ける。
* `C:¥Bitnami¥wordpress¥apps¥wordpress¥htdocs¥gs-intra-new¥docs`


3. **公開確認**: [UXUI浸透活動ポータル](http://192.168.8.205/wordpress/gs-intra-new/index.html)

---
