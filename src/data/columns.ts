//今週のコラム

export type ColumnCategory = "ITトレンド" | "GOOD NEWS" | "宣伝" | "その他";

export interface ColumnArticle {
  id: string;
  date: string;
  category: ColumnCategory;
  title: string;
  tags: string[];
  image: string;
  content: string;
  author: string;
  /** trueにすると一覧には表示されず、検索のみでヒットします */
  archived?: boolean;
}

export const columnArchives: ColumnArticle[] = [
  {
    id: "20260416-55期部長期首挨拶",
    date: "2026-04-16",
    category: "宣伝" as ColumnCategory,
    title: "55期部長期首挨拶",
    tags: ["#期首", "#計画", "#部長"],
    image: "./images/コラム20260416.png",
    content: `期首にあたり、ご挨拶致します。
54期は皆さまが部で打ち立てた戦略（アクションプラン）を着実に進めて頂き目標達成できました。
お客様へのＤＸ提案、AI活用、自動化推進、UX向上など社内でもリードした取り組みができました。
55期収支計画は営業収益は304億円、営業利益は36億円を目指します！
中心となる重要施策として「ＡＩ駆動開発実装による提供スピード向上」と「グループ会社拡大」です。
どちらも未来の生き残りを掛けた「挑戦」となる取り組みです。
非成長であったこの数年を挽回すべく、価値を向上に向け挑戦し、成長に繋げていく事で次の世代に繋げていく覚悟で取り組みます。
皆さん、挑戦は苦しいものと捉えず、「ワクワク」して取り組んで下さい！`,
    author: "鯨井　利毅"
  },
  {
    id: "20260401-GSイントラが新しくなりました",
    date: "2026-04-01",
    category: "宣伝" as ColumnCategory,
    title: "本日からGSイントラが新しくなります！",
    tags: ["#リニューアル", "#お知らせ"],
    image: "./images/column-renewal.jpg",
    content: `私たちCチームは、小変活動の一環としてGSイントラのリニューアルに取り組みました。
目指したのは、情報の探しやすさはもちろん、毎日開くのが少し楽しみになる場所です。

検索機能の強化やメニュー配置の見直しに加え、自分好みのテーマカラーを選べるカスタマイズ機能も搭載。
実は、操作の合間にふと心が和むような「小さな仕掛け」もいくつか忍ばせています。
新しくなったこの場所が、皆さんの日々の業務にそっと寄り添う相棒になれば幸いです。`,
    author: "54期小変Cチーム"
  },


];