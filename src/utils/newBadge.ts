/**
 * NEW バッジ判定ユーティリティ
 *
 * ここの日数設定を変えるだけで、全ページ・サイドバーに一括反映されます。
 */

/** お知らせページ・ホームのNEW表示日数 */
export const NEWS_NEW_DAYS = 3;

/** 締め切りページのNEW表示日数 */
export const DEADLINE_NEW_DAYS = 1;

/** コラム・サイドバーのNEW表示日数 */
export const COLUMN_NEW_DAYS = 7;

/**
 * 指定した日付が今日から `days` 日以内かどうかを返す
 * @param dateStr "2026.03.27" / "2026-03-27" / "2026/03/27" いずれの形式も可
 * @param days    何日以内を NEW とするか
 */
export function isWithinDays(dateStr: string | undefined | null, days: number): boolean {
  if (!dateStr) return false;
  // スラッシュ区切りにすることでローカル時刻として解釈させる（ISO形式はUTC扱いになるため）
  const d = new Date(dateStr.replace(/[.\-]/g, '/'));
  if (isNaN(d.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((today.getTime() - d.getTime()) / 86400000);
  return diffDays >= 0 && diffDays <= days;
}

/**
 * newUntil（終了日）を指定してNEWを表示する
 * Documents など「いつまで NEW にするか」を手動指定する場合に使う
 * @param newUntil "2026-03-30" 形式
 */
export function isBeforeUntil(newUntil: string | undefined | null): boolean {
  if (!newUntil) return false;
  const until = new Date(newUntil);
  until.setHours(23, 59, 59, 999);
  return new Date() <= until;
}
