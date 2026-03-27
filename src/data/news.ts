import { autoNews } from "./news-auto";
import { manualNews } from "./news-manual";

// autoNews（スクリプト自動取得）と manualNews（手動追加）をマージして日付降順で返す
export const allNews = [...autoNews, ...manualNews].sort((a, b) =>
  b.date.localeCompare(a.date)
);