// 💡 各年度のファイルからデータをインポート
import { syohen2025 } from "./2025";
import { syohen2024 } from "./2024";
import { syohen2023 } from "./2023";

// 💡 型の不一致を防ぐため、共通の型定義（任意ですが推奨）
export interface SyohenActivity {
  id: number;
  team: string;
  category: string;
  members: string[];
  title: string;
  description: string;
  results: string;
  technologies: string[];
  pdfUrl: string;
}

// 💡 表示側コンポーネントがループで回せるようにオブジェクト化
export const syohenActivities: Record<string, SyohenActivity[]> = {
  "2025": syohen2025,
  "2024": syohen2024,
  "2023": syohen2023,
};