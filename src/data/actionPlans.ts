/**
 * アクションプランのデータ定義と実データ
 */

export interface ActionPlan {
  id: number;
  title: string;
  description: string;
  owner: string;       // 担当者・チーム
  category: string;    // カテゴリ
  status: "進行中" | "完了" | "計画中";
  startDate: string;   // "YYYY/MM/DD"
  targetDate: string;  // "YYYY/MM/DD"
  progress: number;    // 0〜100
  fiscalYear: number;  // 年度（例: 2026）
  url: string;
}

export const allActionPlans: ActionPlan[] = [
  {
    id: 1,
    title: "Kick Off Award 2026　事業方針説明",
    description: "生き残りを賭け、成長重視で挑戦していく。",
    owner: "グループシステム部",
    category: "事業方針",
    status: "進行中",
    startDate: "2026/04/01",
    targetDate: "2027/03/31",
    progress: 0,
    fiscalYear: 2026,
    url: "https://drive.google.com/file/d/1t0qurSS_21_j9biD4iRs0S92J0iyv3ZN/view?usp=drive_link"
  }
];

// 現在の年度を返すユーティリティ（4月始まり）
export function getCurrentFiscalYear(): number {
  const now = new Date();
  return now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
}
