/**
 * scripts/fetch-organization-descriptions.mjs
 * Google Apps Script Web App からチームの紹介文を取得し、
 * src/data/organization-descriptions-auto.ts を自動生成します。
 *
 * 実行方法: GAS_URL=https://script.google.com/... npm run fetch-org-desc
 *
 * 優先度: 個別紹介文 (custom) > 自動生成文 (auto)
 * どちらも空の場合は空文字列を出力します。
 *
 * スプレッドシートのシート名: descriptions
 * 列構成:
 *   A: team_id        (例: HC10-MG1-T1)
 *   B: team_name      (参照用・任意)
 *   C: auto_desc      (自動生成文)
 *   D: custom_desc    (個別紹介文 ← 優先)
 */

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const GAS_URL = process.env.GAS_URL;
const OUT_PATH = path.resolve(__dirname, '../src/data/organization-descriptions-auto.ts');

if (!GAS_URL) {
  console.error('Error: GAS_URL 環境変数が設定されていません');
  console.error('例: GAS_URL="https://script.google.com/..." npm run fetch-org-desc');
  process.exit(1);
}

/** リダイレクトを追跡しながら JSON を取得 */
function fetchJson(url, redirectCount = 0) {
  if (redirectCount > 5) {
    return Promise.reject(new Error('リダイレクトが多すぎます'));
  }
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { headers: { 'User-Agent': 'node-fetch/fetch-org-desc' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) {
        const location = res.headers['location'];
        res.resume();
        return fetchJson(location, redirectCount + 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(new Error(`JSON parse error: ${e.message}\nBody: ${body.slice(0, 300)}`)); }
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

(async () => {
  console.log('GAS Web App からチーム紹介文を取得中...');

  let data;
  try {
    data = await fetchJson(GAS_URL);
  } catch (e) {
    console.error('取得エラー:', e.message);
    process.exit(1);
  }

  if (!data.descriptions || !Array.isArray(data.descriptions)) {
    console.error('Error: GAS レスポンスに descriptions 配列がありません');
    console.error('受信データ:', JSON.stringify(data).slice(0, 300));
    process.exit(1);
  }

  // 優先度: custom > auto > ''
  const map = {};
  for (const item of data.descriptions) {
    const id = String(item.id || '').trim();
    if (!id) continue;
    const custom = String(item.custom || '').trim();
    const auto = String(item.auto || '').trim();
    map[id] = custom || auto;
  }

  const entries = Object.entries(map)
    .map(([id, text]) => `  "${id}": ${JSON.stringify(text)},`)
    .join('\n');

  const content = `// このファイルは scripts/fetch-organization-descriptions.mjs によって自動生成されます
// 手動で編集しないでください
// 最終更新: ${new Date().toISOString()}
export const teamDescriptions: Record<string, string> = {
${entries}
};
`;

  fs.writeFileSync(OUT_PATH, content, 'utf8');
  console.log(`✅ ${data.descriptions.length} 件の紹介文を書き出しました → organization-descriptions-auto.ts`);
})();
