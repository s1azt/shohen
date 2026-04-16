@echo off
cd /d C:\gs-intra-new

:: ログファイルの設定（直近30件分を保持）
set LOG_FILE=C:\gs-intra-new\scripts\auto-update.log
echo ======================================== >> "%LOG_FILE%"
echo 開始: %date% %time% >> "%LOG_FILE%"

:: mainブランチ以外にいる場合はmainに切り替える
for /f %%i in ('git branch --show-current') do set BRANCH=%%i
echo ブランチ: %BRANCH% >> "%LOG_FILE%"
if not "%BRANCH%"=="main" (
  echo Current branch is "%BRANCH%". Switching to main...
  echo [branch] mainに切り替え中... >> "%LOG_FILE%"
  git checkout main >> "%LOG_FILE%" 2>&1
  if errorlevel 1 goto error
)

echo [1/4] Git pull... >> "%LOG_FILE%"
echo [1/4] Git pull...
git pull --rebase --autostash >> "%LOG_FILE%" 2>&1
if errorlevel 1 goto error

echo [2/4] Fetching news... >> "%LOG_FILE%"
echo [2/4] Fetching news...
CALL node scripts/fetch-news.mjs --auto >> "%LOG_FILE%" 2>&1
if errorlevel 1 goto error

echo [3/4] Building... >> "%LOG_FILE%"
echo [3/4] Building...
CALL npm run build >> "%LOG_FILE%" 2>&1
if errorlevel 1 goto error

echo [4/4] Git push... >> "%LOG_FILE%"
echo [4/4] Git push...
git add -A src/data/news-auto.ts docs/
git commit --allow-empty -m "auto: news update %date% %time%" >> "%LOG_FILE%" 2>&1
git push >> "%LOG_FILE%" 2>&1
if errorlevel 1 goto error

:end
echo Done.
echo 完了: %date% %time% >> "%LOG_FILE%"
exit /b 0

:error
echo Error occurred.
echo [ERROR] 失敗: %date% %time% >> "%LOG_FILE%"
exit /b 1
