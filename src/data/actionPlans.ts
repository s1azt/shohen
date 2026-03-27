export interface ActionPlan {
  id: number;
  title: string;
  description: string;
  owner: string;       // 担当者・チーム
  category: string;    // カテゴリ（例: 品質改善・業務効率化 etc.）
  status: "進行中" | "完了" | "計画中";
  startDate: string;   // "YYYY/MM/DD"
  targetDate: string;  // "YYYY/MM/DD"
  progress: number;    // 0〜100
  fiscalYear: number;  // 年度（例: 2026）
}

export const allActionPlans: ActionPlan[] = [
  // サンプルデータ（実際の内容に書き換えてください）
  {
    id: 1,
    title: "サンプル：社内ポータルサイトリニューアル",
    description: "利用者からのフィードバックをもとに、社内イントラのUI/UXを全面刷新する。",
    owner: "HC70 UI/UX推進チーム",
    category: "業務効率化",
    status: "進行中",
    startDate: "2026/01/01",
    targetDate: "2026/06/30",
    progress: 60,
    fiscalYear: 2026,
  },
  {
    id: 2,
    title: "サンプル：アクションプランページ追加",
    description: "部内のアクションプランを一元管理・可視化するページを追加する。",
    owner: "HC70 企画チーム",
    category: "情報共有",
    status: "完了",
    startDate: "2026/03/01",
    targetDate: "2026/03/31",
    progress: 100,
    fiscalYear: 2026,
  },
];

// 現在の年度を返すユーティリティ（4月始まり）
export function getCurrentFiscalYear(): number {
  const now = new Date();
  return now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
}
