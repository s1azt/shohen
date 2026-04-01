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