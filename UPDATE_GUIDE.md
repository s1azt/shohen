# 📝 UXUI Labo サイト更新ガイド

このガイドでは、スタッフ部門が「お知らせ」と「コラム」を簡単に更新する方法を説明します。

---

## 🎯 更新できる内容

1. **お知らせ（最新情報）** - トップページの「最新情報」セクション
2. **コラム** - トップページの「UXコラム」セクション

---

## 📋 お知らせの更新方法

### ステップ1: ファイルを開く

`/data/news.js` ファイルをテキストエディタで開きます。

### ステップ2: 新しいお知らせを追加

ファイルの一番上の `const newsData = [` の直後に、以下のテンプレートをコピー＆ペーストします：

```javascript
{
    date: "2026.02",                    // 日付（例: "2026.02"）
    status: "お知らせ",                 // ステータス（例: "お知らせ", "実施予定", "募集予定", "完了"）
    statusColor: "blue",                // 色（"orange"=オレンジ, "green"=緑, "blue"=青）
    category: "お知らせ",               // カテゴリー（例: "お知らせ", "イベント", "アンケート"）
    title: "ここにタイトルを入力",      // お知らせのタイトル
    description: "ここに説明文を入力します。", // 説明文
    link: null                          // リンク先（なければ null、あれば "./page.html"）
},
```

### ステップ3: 内容を編集

上記のテンプレートの各項目を実際の内容に書き換えます。

### ステップ4: 保存

ファイルを保存すれば、トップページに自動的に反映されます。

### 💡 お知らせの例

```javascript
const newsData = [
    // ✅ 新しいお知らせ（こちらに追加）
    {
        date: "2026.02",
        status: "開催決定",
        statusColor: "green",
        category: "イベント",
        title: "UX勉強会を開催します",
        description: "ユーザー中心設計の基礎を学ぶ勉強会を2月15日に開催します。",
        link: null
    },
    // 既存のお知らせは下に残す
    {
        date: "2026.01",
        status: "実施予定",
        statusColor: "orange",
        category: "アンケート",
        title: "UX浸透度アンケート実施予定",
        description: "YSD全体のUXUI浸透度を可視化し、今後の施策に活かすためのアンケートを実施します。",
        link: null
    },
    // ... その他の既存お知らせ
];
```

---

## 📰 コラムの更新方法

### ステップ1: ファイルを開く

`/data/columns.js` ファイルをテキストエディタで開きます。

### ステップ2: 新しいコラムを追加

ファイルの一番上の `const columnsData = [` の直後に、以下のテンプレートをコピー＆ペーストします：

```javascript
{
    date: "2026.01",                    // 日付（例: "2026.01"）
    link: "./column4.html",             // コラムページへのリンク
    image: "https://images.unsplash.com/photo-xxxxxx", // サムネイル画像URL
    authorInitial: "山",                // 著者のイニシャル（1文字）
    authorName: "山田 太郎",            // 著者の名前
    authorColor: "from-orange-500 to-red-500", // アイコンの色
    title: "コラムのタイトル",         // コラムタイトル
    description: "コラムの説明文を入力します。", // 説明文
    featured: false,                    // 注目記事にする場合は true
    accentColor: "orange"              // アクセントカラー
},
```

### ステップ3: 内容を編集

各項目を実際の内容に書き換えます。

### ステップ4: 画像URLの取得

サムネイル画像は、[Unsplash](https://unsplash.com/)から無料で取得できます：

1. Unsplashで適切な画像を検索
2. 画像のURLをコピー
3. `image:` の部分に貼り付け

### ステップ5: 保存
git
ファイルを保存すれば、トップページに自動的に反映されます。

### 💡 コラムの例

```javascript
const columnsData = [
    // ✅ 新しいコラム（こちらに追加）
    {
        date: "2026.01",
        link: "./column4.html",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
        authorInitial: "山",
        authorName: "山田 太郎",
        authorColor: "from-orange-500 to-red-500",
        title: "チームで取り組むUX改善活動",
        description: "開発チーム全員でUXを考える文化を作るための取り組みをご紹介します。",
        featured: false,
        accentColor: "orange"
    },
    // 既存のコラムは下に残す
    {
        date: "2025.11",
        link: "./coknock-story.html",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
        // ... 以下省略
    },
];
```

---

## 🎨 カラーとスタイルの選択肢

### ステータスカラー（お知らせ用）
- `"orange"` - オレンジ色（実施予定、準備中など）
- `"green"` - 緑色（募集中、開催決定など）
- `"blue"` - 青色（完了、お知らせなど）

### アクセントカラー（コラム用）
- `"purple"` - 紫系
- `"blue"` - 青系
- `"green"` - 緑系
- `"orange"` - オレンジ系
- `"pink"` - ピンク系
- `"indigo"` - インディゴ系

### 著者アイコンカラー（コラム用）
- `"from-purple-500 to-pink-500"` - 紫→ピンク
- `"from-blue-500 to-indigo-500"` - 青→インディゴ
- `"from-green-500 to-emerald-500"` - 緑→エメラルド
- `"from-orange-500 to-red-500"` - オレンジ→赤

---

## ⚠️ 注意事項

### 必ず守ること

1. **カンマを忘れない** - 各項目の最後に `,` を付ける
2. **引用符を使う** - 文字列は `"` で囲む
3. **最新を上に** - 新しいお知らせ/コラムは配列の一番上に追加
4. **古いものは残す** - 既存の項目は削除せず、そのまま残す

### リンクの設定

- リンクがない場合: `link: null`
- リンクがある場合: `link: "./page.html"`
- 外部リンクの場合: `link: "https://example.com"`

---

## 🆘 困ったときは

### エラーが出た場合

1. `,`（カンマ）の付け忘れがないか確認
2. `"`（引用符）が閉じられているか確認
3. 最後の項目には `,` を付けない

### 表示がおかしい場合

1. ブラウザのキャッシュをクリア（Ctrl+F5 または Cmd+Shift+R）
2. ファイルが正しく保存されているか確認

### それでも解決しない場合

UXUIユニットまでお問い合わせください：
- **Googleチャット**: 「UXユニット」スペース
- **メール**: uxui-unit@nekonet.co.jp

---

## 📚 参考: データ構造の全体像

### お知らせデータ（news.js）

```javascript
const newsData = [
    {
        date: "日付",
        status: "ステータス",
        statusColor: "色",
        category: "カテゴリー",
        title: "タイトル",
        description: "説明文",
        link: "リンク先 or null"
    }
];
```

### コラムデータ（columns.js）

```javascript
const columnsData = [
    {
        date: "日付",
        link: "コラムページへのリンク",
        image: "サムネイル画像URL",
        authorInitial: "イニシャル",
        authorName: "著者名",
        authorColor: "アイコンの色",
        title: "タイトル",
        description: "説明文",
        featured: true/false,
        accentColor: "アクセントカラー"
    }
];
```

---

**最終更新: 2025年12月**
