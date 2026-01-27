// 全拠点で共通して持たせる項目を定義します。これにより、表示側でのエラーを防ぎます。
export interface LocationDetail {
  status: "ready" | "construction";
  title?: string;
  description: string;
  impact?: string;
  image?: string;
}