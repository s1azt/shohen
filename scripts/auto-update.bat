@echo off
cd /d C:\gs-intra-new

echo [1/4] Git pull...
git pull --rebase --autostash
if errorlevel 1 goto error

echo [2/4] Fetching news...
CALL node scripts/fetch-news.mjs --auto
if errorlevel 1 goto error

echo [3/4] Building...
CALL npm run build
if errorlevel 1 goto error

echo [4/4] Git push...
git add -A src/data/news-auto.ts docs/
git commit --allow-empty -m "auto: news update %date% %time%"
git push
if errorlevel 1 goto error

:end
echo Done.
exit /b 0

:error
echo Error occurred.
exit /b 1
