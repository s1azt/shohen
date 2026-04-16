@echo off
cd /d C:\gs-intra-new

:: Log file settings (keep last 30 runs)
set LOG_FILE=C:\gs-intra-new\scripts\auto-update.log
echo ======================================== >> "%LOG_FILE%"
echo Start: %date% %time% >> "%LOG_FILE%"

:: Switch to main branch if not already on it
for /f %%i in ('git branch --show-current') do set BRANCH=%%i
echo Branch: %BRANCH% >> "%LOG_FILE%"
if not "%BRANCH%"=="main" (
  echo Current branch is "%BRANCH%". Switching to main...
  echo [branch] Switching to main... >> "%LOG_FILE%"
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
echo Done: %date% %time% >> "%LOG_FILE%"
exit /b 0

:error
echo Error occurred.
echo [ERROR] Failed: %date% %time% >> "%LOG_FILE%"
exit /b 1
