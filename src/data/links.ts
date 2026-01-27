/**
 * リンクアイテムの型定義
 */
export interface LinkItem {
  id: string;
  title: string;
  url: string;
  desc: string;
  category: "work" | "development" | "knowledge" | "life" | "portal";
}

/**
 * 1. リンク集ページで使用するメインコレクション
 */
export const linkCollection: LinkItem[] = [
  // 業務・申請 (W-xxx)
  { id: "W-01", title: "カニシステム", url: "http://vo-ov.nekonet.co.jp/YadokariWeb/SRC01Action_doInit.action", desc: "勤怠情報入力・管理", category: "work" },
  { id: "W-02", title: "感染症罹患報告", url: "http://syshon-redmine.nekonet.co.jp/login?back_url=http%3A%2F%2Fsyshon-redmine.nekonet.co.jp%2Fprojects%2Frikan%2Fissues%3Fquery_id%3D355", desc: "Redmineによる罹患報告・管理", category: "work" },
  { id: "W-03", title: "SyncTrust", url: "https://synctrust.nekonet.co.jp/smp/login.seam", desc: "認証・ID管理・シングルサインオン", category: "work" },
  { id: "W-04", title: "タレントパレット", url: "https://tyix8755.talent-p.net/", desc: "人事評価・スキル管理・タレントマネジメント", category: "work" },
  { id: "W-05", title: "受講管理Web", url: "https://www.appsheet.com/start/69c129f9-7d1e-4afb-97d4-a97611a55be7", desc: "AppSheetによる研修受講・履歴管理", category: "work" },

  // 開発・品質・運用 (D-xxx)
  { id: "D-01", title: "NEKO基準ドキュメント", url: "http://gs.nekonet.co.jp/GS_System/systemkaihatu_unyoumanual_kanren.html", desc: "システム開発・運用マニュアル関連資料", category: "development" },
  { id: "D-02", title: "リリース管理統合システム", url: "http://gs.nekonet.co.jp/gs_release/quality/", desc: "リリース品質管理・申請フロー", category: "development" },
  { id: "D-03", title: "構成管理活動", url: "http://gs.nekonet.co.jp/GS_Config/kouseikanri.html", desc: "構成管理・IT資産管理・変更履歴", category: "development" },
  { id: "D-04", title: "リスク管理システム", url: "http://192.168.99.125/riskanticipate/", desc: "プロジェクトのリスク管理・予測システム", category: "development" },
  { id: "D-05", title: "運用品質ポータル", url: "http://qp.nekonet.co.jp/ope-qst.html", desc: "サービス品質・運用指標ポータル", category: "development" },
  { id: "D-06", title: "問い合わせ(FastHelp)", url: "http://gs.nekonet.co.jp/GS_FastHelp5/index.html", desc: "FastHelp5 による問い合わせ・ナレッジ管理", category: "development" },
  { id: "D-07", title: "運用最適化(DataSpider)", url: "https://sites.google.com/nekonet.co.jp/unyokaizen2024/%E3%83%9B%E3%83%BC%E3%83%A0", desc: "DataSpiderを活用した業務効率化ポータル", category: "development" },

  // ナレッジ・ポータル (K-xxx)
  { id: "K-01", title: "GSうぃき", url: "http://gs.nekonet.co.jp/GS_wiki/", desc: "部内技術・業務ナレッジ共有Wiki", category: "knowledge" },
  { id: "K-02", title: "SAGASOU!", url: "http://192.168.8.133/share/page/", desc: "Alfresco ベースの文書検索・共有システム", category: "knowledge" },
  { id: "K-03", title: "HC70 PMOチーム", url: "https://sites.google.com/nekonet.co.jp/hc70-pmo/", desc: "PMO活動・プロジェクト支援ポータル", category: "knowledge" },
  { id: "K-04", title: "UI/UX支援ポータル", url: "https://sites.google.com/nekonet.co.jp/hc70-uiux-portal", desc: "UI/UXデザインガイド・改善支援", category: "knowledge" },
  { id: "K-05", title: "E-learn", url: "https://clipline.jp/training/#/", desc: "ClipLine 動画研修・スキルアップ", category: "knowledge" },
  { id: "K-06", title: "Oneデジタルポータル", url: "https://sites.google.com/kuronekoyamato.co.jp/digital-portal/", desc: "ヤマトグループ デジタルポータルサイト", category: "portal" },
  { id: "K-07", title: "ヤマト関連ポータル", url: "http://gs.nekonet.co.jp/", desc: "グループシステム部 関連リンクポータル", category: "portal" },
  { id: "K-08", title: "イントラサイト", url: "http://tokyo.nekonet.co.jp/menu/", desc: "全社共通イントラメニュー", category: "portal" },

  // 社内生活・環境 (L-xxx)
  { id: "L-01", title: "晴海Z棟運用ルール", url: "http://jinji-intra.nekonet.co.jp/category/%E3%80%90%E5%BB%BA%E7%89%A9%E8%A8%AD%E5%82%99%E3%80%91%E6%99%B4%E6%B5%B7z%E6%A3%9F.html", desc: "オフィス運用ルール・建物設備ガイド", category: "life" },
  { id: "L-02", title: "ネームプレート", url: "http://dominoap.nekonet.co.jp/tyo/tyo1304.nsf/($All)/6C0F39ECF42E173649258C1B0005762E?OpenDocument", desc: "座席管理・ネームプレート申請", category: "life" },
  { id: "L-03", title: "貸出備品(HC10)", url: "https://docs.google.com/spreadsheets/d/1SSVyY4SXMohWEZOgTUE5uJDULUcGZbzNQnmThNnAjrw/edit?gid=926235174", desc: "HC10管理の貸出備品スプレッドシート", category: "life" },
  { id: "L-04", title: "おべんとねっと", url: "https://www.obentonet.jp/item_list.html?deliveryDate=today", desc: "昼食予約・お弁当注文システム", category: "life" },
  { id: "L-05", title: "サイネージ", url: "http://sysign.nekonet.co.jp/signagesp/login", desc: "社内サイネージコンテンツ管理", category: "life" },
];

/**
 * 2. サイドバーやホームのクイックボタンで使用する外部定数
 */
export const externalLinks = {
  // 全社座席表
  seatingChart: "http://shachoushitsu.nekonet.co.jp/k_kikaku/zaseki/zaseki_gws.html",

  // お問い合わせ先一覧 (サイドバー用)
  support: [
    { label: "端末セットアップ関連", url: "http://ungi.nekonet.co.jp/manual/pcsetup/" },
    { label: "YSDAD関連", url: "http://ungi.nekonet.co.jp/manual/ysdad/ysdad.html" },
    { label: "シンクライアント関連", url: "http://ungi.nekonet.co.jp/manual/blade/tellist/TelList4Thinclient_HTML.html" },
    { label: "インターネット接続関連", url: "http://ungi.nekonet.co.jp/security/url/index.htm" },
  ],

  // ホーム画面のクイックアクセス用
  homeQuickAccess: {
    attendance: "http://vo-ov.nekonet.co.jp/YadokariWeb/SRC01Action_doInit.action", // カニシステム
    roomReservation: "https://www.appsheet.com/start/fb74da15-8b0d-498d-8b69-aca67b200277?platform=desktop#appName=%E4%BC%9A%E8%AD%B0%E5%AE%A4%E7%A9%BA%E3%81%8D%E7%8A%B6%E6%B3%81-893884900&vss=H4sIAAAAAAAAA6WOMQ7CMBAE_7K1X-AWUSAEDYgGU5j4IlkkdhQ7QGS5p-MR9Pwq_8AmIOqI8uY0uxtw1nTZeFmcwPfhdy2pB0cQ2PYNCXCBmTW-tZUAE1jLeoTD8zbcHwIR8cC-ticHHqbI_J9mBq3IeF1qanNS9lLCx0rv7CQwGogMdeflsaL31GTEmFhpi86R2qUZk-vdwsyvjTRqZVUKLGXlKL4ALpQxuFsBAAA=&view=%E5%AE%88%E5%8F%A3",
    faq: "https://yneko.qast.jp/home",
    telework: "https://synctrust.nekonet.co.jp/smp/login.seam", // SyncTrust 等を想定
    wiki: "http://gs.nekonet.co.jp/GS_wiki/",
    training: "https://clipline.jp/training/#/", // E-learn
  }
};