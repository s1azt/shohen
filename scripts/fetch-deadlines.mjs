/**
 * scripts/fetch-deadlines.mjs
 * 社内イントラのお知らせJSONPから締め切り情報を抽出し、
 * src/data/deadlines-auto.ts を自動生成します。
 *
 * 実行方法: npm run fetch-deadlines
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ============================================================
// ★ 締め切りと判断するキーワード
// ============================================================
const DEADLINE_KEYWORDS = ['まで', '締切', '〆切', '締め切り', '期限'];

// ============================================================
// ★ 取込対象カテゴリ（全カテゴリを対象にする場合は空配列）
// ============================================================
const TARGET_CATEGORIES = []; // 空 = 全カテゴリ対象

// ============================================================
// ★ 完了済み（期限切れ）を出力に含めるか
// ============================================================
const INCLUDE_EXPIRED = false;

const BASE_URL = 'http://tokyo.nekonet.co.jp/menu/';
const JSONP_URL = `${BASE_URL}whats_json.js?callback=callback&_=${Date.now()}`;
const OUT_PATH = path.resolve(__dirname, '../src/data/deadlines-auto.ts');

/** カテゴリ → カラースキーム */
const COLOR_MAP = [
  { bg: 'bg-[#fff5f5]', border: 'border-[#feb2b2]', text: 'text-[#742a2a]', btn: 'bg-[#e53e3e]', accent: 'border-l-[#e53e3e]' }, // 赤
  { bg: 'bg-[#f0fdf4]', border: 'border-[#bbf7d0]', text: 'text-[#166534]', btn: 'bg-[#059669]', accent: 'border-l-[#059669]' }, // 緑
  { bg: 'bg-[#f0f9ff]', border: 'border-[#bae6fd]', text: 'text-[#075985]', btn: 'bg-[#0284c7]', accent: 'border-l-[#0284c7]' }, // 青
  { bg: 'bg-[#fffbeb]', border: 'border-[#fde68a]', text: 'text-[#92400e]', btn: 'bg-[#d97706]', accent: 'border-l-[#d97706]' }, // 黄
  { bg: 'bg-[#f5f3ff]', border: 'border-[#ddd6fe]', text: 'text-[#5b21b6]', btn: 'bg-[#7c3aed]', accent: 'border-l-[#7c3aed]' }, // 紫
];

/** タイトルから締め切り日を抽出 → "YYYY.MM.DD" 形式で返す */
function extractDeadlineDate(title, fallbackDate) {
  const today = new Date();
  const year = today.getFullYear();

  // パターン1: M/D または M月D日
  const patterns = [
    /(\d{1,2})[\/](\d{1,2})/,      // 4/9, 3/31
    /(\d{1,2})月(\d{1,2})日/,       // 3月31日
  ];

  for (const pat of patterns) {
    const m = title.match(pat);
    if (m) {
      const month = parseInt(m[1], 10);
      const day = parseInt(m[2], 10);
      if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        // 月が現在より大幅に前なら来年と判断（例：12月が取れたのに今が3月 → 今年）
        let resolvedYear = year;
        if (month < today.getMonth() - 2) resolvedYear = year + 1;
        return `${resolvedYear}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`;
      }
    }
  }

  // 抽出できなければfallback（更新日）
  return fallbackDate;
}

/** 安定したIDを生成（日付＋タイトルのハッシュ） */
function stableId(date, title) {
  let hash = 0;
  const str = date + title;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/** URLが相対パスなら絶対URLに変換 */
function resolveUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return BASE_URL + url;
}

/** HTTPでテキストを取得 */
function fetchText(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => resolve(body));
    });
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('タイムアウト: 10秒以内に応答がありませんでした'));
    });
  });
}

/** 1件ずつ y/n で承認 */
async function promptApproval(items) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise((res) => rl.question(q, res));

  const approved = [];
  console.log('\n─────────────────────────────────────────────────────');
  console.log(`  ${items.length} 件が対象です。1件ずつ取り込むか確認します。`);
  console.log('  y = 取り込む  /  n = スキップ  /  q = ここで終了');
  console.log('─────────────────────────────────────────────────────\n');

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    console.log(`[${i + 1}/${items.length}] 更新日: ${item.updateDate}  期限: ${item.date}  [${item.category}]`);
    console.log(`  ${item.title}`);
    const ans = (await ask('  → 取り込みますか？ (y/n/q): ')).trim().toLowerCase();
    console.log('');

    if (ans === 'q') break;
    if (ans === 'y') approved.push(item);
  }

  rl.close();
  return approved;
}

async function main() {
  console.log(`\n取得中: ${JSONP_URL}`);

  const raw = await fetchText(JSONP_URL);

  const jsonStr = raw
    .trim()
    .replace(/^callback\s*\(\s*/, '')
    .replace(/\s*\)\s*;?\s*$/, '');

  let parsed;
  try {
    parsed = JSON.parse(jsonStr);
  } catch (e) {
    throw new Error(`JSONのパースに失敗しました: ${e.message}`);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const normalize = (s) => s.replace(/／/g, '/').replace(/　/g, ' ').trim();

  const candidates = [];

  for (const entry of parsed) {
    const updateDate = (entry.date || '').replace(/\//g, '.');
    for (const item of (entry.data || [])) {
      const title = item.title || '';
      const cat = item.category || item.categoryName || '';

      // カテゴリフィルタ（TARGET_CATEGORIESが空なら全対象）
      if (TARGET_CATEGORIES.length > 0) {
        const catNorm = normalize(cat);
        if (!TARGET_CATEGORIES.map(normalize).includes(catNorm)) continue;
      }

      // 締め切りキーワードフィルタ
      const hasKeyword = DEADLINE_KEYWORDS.some(kw => title.includes(kw));
      if (!hasKeyword) continue;

      // 再掲スキップ
      if (title.includes('再掲')) continue;

      const deadlineDate = extractDeadlineDate(title, updateDate);

      // 期限切れを除外する場合
      if (!INCLUDE_EXPIRED) {
        const d = new Date(deadlineDate.replace(/\./g, '/'));
        if (!isNaN(d.getTime()) && d < today) continue;
      }

      candidates.push({
        title,
        date: deadlineDate,
        updateDate,
        category: cat,
        url: resolveUrl(item.url),
      });
    }
  }

  if (candidates.length === 0) {
    console.log('⚠️  締め切りキーワードに該当するデータが0件でした。');
    process.exit(0);
  }

  console.log(`\n${candidates.length} 件の締め切り候補が見つかりました。`);

  const approved = await promptApproval(candidates);

  if (approved.length === 0) {
    console.log('⚠️  承認された件数が0件のため、ファイルは更新しませんでした。');
    process.exit(0);
  }

  // カラーをカテゴリのhashで割り当て
  const colored = approved
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((item, idx) => {
      const color = COLOR_MAP[idx % COLOR_MAP.length];
      const { category, ...rest } = item;
      return { id: stableId(item.date, item.title), ...rest, ...color, iconName: 'Clipboard', dept: category || '社内' };
    });

  // TypeScript ファイルとして出力
  const now = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
  const output =
`// このファイルは scripts/fetch-deadlines.mjs によって自動生成されます
// 手動で編集しないでください（上書きされます）
// 最終取得: ${now}

import type { DeadlineItem } from "./deadlines";

export const autoDeadlines: DeadlineItem[] = ${JSON.stringify(colored, null, 2)};
`;

  fs.writeFileSync(OUT_PATH.replace('deadlines-auto', 'deadlines-auto'), output, 'utf8');
  const actualPath = path.resolve(__dirname, '../src/data/deadlines-auto.ts');
  fs.writeFileSync(actualPath, output, 'utf8');

  console.log(`✅ ${colored.length} 件 → src/data/deadlines-auto.ts を更新しました`);
}

main().catch((err) => {
  console.error('❌ エラー:', err.message);
  process.exit(1);
});
