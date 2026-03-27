/**
 * scripts/fetch-news.mjs
 * 社内イントラのお知らせJSONPを取得し、src/data/news.ts を自動生成します。
 *
 * 実行方法: npm run fetch-news
 *
 * ─── 設定 ────────────────────────────────────────────────
 * ALLOWED_CATEGORIES : 取り込むカテゴリ名の一覧（A）
 * MAX_ITEMS          : 最終的に書き出す最大件数（C）
 * ─────────────────────────────────────────────────────────
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ============================================================
// ★ ここを編集して取り込みたいカテゴリを指定してください（A）
// ============================================================
const ALLOWED_CATEGORIES = [
  'セキュリティ/危機管理',
  'お知らせ',
  '社内行事',
  '通達',
  '教育/研修関連',
  '社内業務',
  '人事関連',
  // 追加したいカテゴリをここに追記してください
];

// ============================================================
// ★ 承認後に書き出す最大件数（C）
// ============================================================
const MAX_ITEMS = 10;

const BASE_URL = 'http://tokyo.nekonet.co.jp/menu/';
const JSONP_URL = `${BASE_URL}whats_json.js?callback=callback&_=${Date.now()}`;
const OUT_PATH = path.resolve(__dirname, '../src/data/news-auto.ts');

/** カテゴリ名 → バッジ色クラス */
const CATEGORY_COLORS = {
  'セキュリティ/危機管理': 'text-red-500',
  'お知らせ':             'text-blue-600',
  '社内行事':             'text-purple-600',
  '通達':                 'text-emerald-600',
  '教育/研修関連':        'text-orange-500',
  '社内業務':             'text-slate-600',
  '人事関連':             'text-pink-600',
};
const FALLBACK_COLOR = 'text-slate-500';

/** URLが相対パスなら絶対URLに変換 */
function resolveUrl(url) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return BASE_URL + url;
}

/** バッジ色を決定（imp=1 は強制的に重要色） */
function getColor(categoryName, imp) {
  if (imp === '1') return 'text-red-500';
  return CATEGORY_COLORS[categoryName] ?? FALLBACK_COLOR;
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

/** 1件ずつ y/n で承認（D） */
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
    console.log(`[${i + 1}/${items.length}] ${item.date}  [${item.category}]`);
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
  const isAuto = process.argv.includes('--auto');
  console.log(`\n取得中: ${JSONP_URL}`);
  if (isAuto) console.log('モード: 自動（全件取得）');

  const raw = await fetchText(JSONP_URL);

  // JSONP ラッパーを除去: callback([...]) → [...]
  const jsonStr = raw
    .trim()
    .replace(/^callback\s*\(\s*/, '')
    .replace(/\s*\)\s*;?\s*$/, '');

  let parsed;
  try {
    parsed = JSON.parse(jsonStr);
  } catch (e) {
    throw new Error(`JSONのパースに失敗しました: ${e.message}\n先頭200文字: ${raw.slice(0, 200)}`);
  }

  // ── A: カテゴリでフィルタ ──
  const candidates = [];
  const skippedCategories = new Set();
  // 全角スラッシュ・スペースを半角に正規化して比較
  const normalize = (s) => s.replace(/／/g, '/').replace(/　/g, ' ').trim();
  for (const entry of parsed) {
    const date = (entry.date || '').replace(/\//g, '.');
    for (const item of (entry.data || [])) {
      const cat = item.categoryName || '';
      const catNorm = normalize(cat);
      if (!ALLOWED_CATEGORIES.map(normalize).includes(catNorm)) {
        if (cat) skippedCategories.add(cat);
        continue;
      }
      const title = item.title || '';
      // 「再掲」を含むタイトルはスキップ
      if (title.includes('再掲')) continue;
      candidates.push({
        date,
        category: cat,
        title,
        color: getColor(catNorm, item.imp),
        url: resolveUrl(item.url),
      });
    }
  }

  if (skippedCategories.size > 0) {
    console.log('\n【参考】今回スキップしたカテゴリ名（実際のJSONPの値）:');
    for (const c of skippedCategories) console.log(`  - 「${c}」`);
    console.log('追加したい場合はALLOWED_CATEGORIESに追記してください。\n');
  }

  if (candidates.length === 0) {
    console.log('⚠️  対象カテゴリのデータが0件でした。ALLOWED_CATEGORIES を確認してください。');
    process.exit(0);
  }

  // ── D: 手動承認 または 自動全件取得 ──
  const approved = isAuto ? candidates : await promptApproval(candidates);

  if (approved.length === 0) {
    console.log('⚠️  承認された件数が0件のため、ファイルは更新しませんでした。');
    process.exit(0);
  }

  // ── C: 件数制限（日付降順で上位MAX_ITEMS件）──
  // ID は日付＋タイトルから生成した安定したハッシュ値を使用
  // （連番だと再取得のたびにIDがずれて既読管理が崩れるため）
  function stableId(date, title) {
    let hash = 0;
    const str = date + title;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
  }

  const limited = approved
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, MAX_ITEMS)
    .map((item) => ({ id: stableId(item.date, item.title), ...item }));

  // TypeScript ファイルとして出力
  const now = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
  const output =
`// このファイルは scripts/fetch-news.mjs によって自動生成されます
// 手動で編集しないでください（上書きされます）
// 最終取得: ${now}

export const autoNews = ${JSON.stringify(limited, null, 2)};
`;

  fs.writeFileSync(OUT_PATH, output, 'utf-8');
  console.log(`✅ ${limited.length} 件 → src/data/news-auto.ts を更新しました`);
}

main().catch((err) => {
  console.error('❌ エラー:', err.message);
  process.exit(1);
});
