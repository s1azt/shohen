// 表示側のコンポーネントはここからデータを呼び出します。
// 表示側のコードを一切いじらずに年度を追加できるようになります。
import { syohen2025 } from "./2025";
import { syohen2024 } from "./2024";
import { syohen2023 } from "./2023";

export const syohenActivities: { [key: string]: any[] } = {
  "2025": syohen2025,
  "2024": syohen2024,
  "2023": syohen2023,
};