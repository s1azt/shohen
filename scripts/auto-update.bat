@echo off
cd /d C:\gs-intra-new

echo [1/3] Fetching news...
node scripts/fetch-news.mjs --auto
if errorlevel 1 goto error

echo [2/3] Building...
npm run build
if errorlevel 1 goto error

echo [3/3] Git push...
git pull --rebase
if errorlevel 1 goto error
git add -A src/data/news-auto.ts docs/
git diff --cached --quiet && (
  echo No changes. Skipping push.
  goto end
)
git commit -m "auto: news update %date% %time%"
git push
if errorlevel 1 goto error

:end
echo Done.
exit /b 0

:error
echo Error occurred.
exit /b 1
