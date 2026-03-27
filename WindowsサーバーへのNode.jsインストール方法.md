WindowsサーバーにNode.jsをインストールする手順をまとめました。Windows Server環境では、GUIを使用したインストーラーによる方法が最も一般的で確実です。

# ---

**Windows Server への Node.js インストール手順**

WindowsサーバーにNode.jsを導入する最も標準的な手順は、公式サイトから提供されている **MSIインストーラー** を使用する方法です。

## **1\. インストーラーのダウンロード**

1. サーバー上のブラウザ（Microsoft Edgeなど）で [Node.js公式サイト](https://nodejs.org/) にアクセスします。  
2. **LTS（推奨版）** を選択してダウンロードしてください。  
   * **LTS (Long Term Support):** 企業利用や本番環境に適した、長期サポートが保証されている安定版です。  
   * **Current:** 最新機能が含まれますが、アップデート頻度が高いため、サーバー用途ではLTSを強く推奨します。

## ---

**2\. インストール手順**

ダウンロードした .msi ファイルを実行し、ウィザードに従って進めます。

1. **Welcome:** 「Next」をクリック。  
2. **End-User License Agreement:** 内容を確認し、「I accept...」にチェックを入れて「Next」。  
3. **Destination Folder:** デフォルト（C:\\Program Files\\nodejs\\）のままで問題なければ「Next」。  
4. **Custom Setup:** 全てデフォルト（npm package managerやAdd to PATHが含まれている状態）で「Next」。  
5. **Tools for Native Modules:**  
   * Automatically install the necessary tools... というチェックボックスが表示されます。  
   * **推奨:** チェックを入れることをお勧めします。一部のnpmパッケージ（C++で書かれたものなど）をビルドするために必要な Python や Visual Studio Build Tools を自動でインストールしてくれます。  
6. **Ready to install:** 「Install」をクリック。  
7. **Finish:** インストールを完了させます。

## ---

**3\. 環境変数の確認と反映**

Node.jsのパスを反映させるため、**PowerShell または コマンドプロンプトを再起動** してください。

### **バージョン確認コマンド**

インストールが成功したか確認するために、以下のコマンドを入力します。

Bash

\# Node.jsのバージョン確認  
node \-v

\# npm (パッケージマネージャー) のバージョン確認  
npm \-v

**Note:** もしコマンドが認識されない場合は、サーバーを一度再起動するか、システムの環境変数 PATH に C:\\Program Files\\nodejs\\ が追加されているか確認してください。

## ---

**4\. ファイアウォールの設定（必要に応じて）**

Node.jsでWebサーバー（ポート80や443、3000など）を稼働させる場合、Windows Defender ファイアウォールで特定のポートを許可する必要があります。

1. **サーバーマネージャー** \> **ツール** \> **セキュリティが強化されたWindows Defender ファイアウォール** を開く。  
2. **受信の規則** \> **新しい規則** をクリック。  
3. **ポート** を選択し、Node.jsアプリケーションで使用するポート番号（例: 3000）を許可します。

## ---

**5\. (Tips) サービス化の検討**

Windowsサーバー上でNode.jsを常時稼働させる場合、コマンドプロンプトを閉じるたびにプロセスが終了してしまいます。本番運用では以下のツールを使って **Windowsサービス** として登録するのが一般的です。

* **pm2:** プロセス管理ツール（pm2-windows-service と組み合わせて利用）。  
* **nssm:** 実行ファイルを簡単にWindowsサービス化できるツール。

---

Node.jsのインストールは以上で完了です。

