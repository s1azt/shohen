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
  
];

// 現在の年度を返すユーティリティ（4月始まり）
export function getCurrentFiscalYear(): number {
  const now = new Date();
  return now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
}
