@echo off
cd /d C:\gs-intra-new

echo [1/3] お知らせ取得中...
node scripts/fetch-news.mjs --auto
if errorlevel 1 goto error

echo [2/3] ビルド中...
npm run build
if errorlevel 1 goto error

echo [3/3] Git push中...
git add src/data/news-auto.ts docs/
git diff --cached --quiet && (
  echo 変更なし。pushをスキップします。
  goto end
)
git commit -m "auto: お知らせ自動更新 %date% %time%"
git push
if errorlevel 1 goto error

:end
echo 完了。
exit /b 0

:error
echo エラーが発生しました。処理を中断します。
exit /b 1
