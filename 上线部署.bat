@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo 秀威供应链 · 智能部署中...
echo.

:: Step 1: Try GitHub
curl -s -o nul -w "%%{http_code}" --connect-timeout 3 https://github.com >nul 2>&1
if %errorlevel%==0 (
    echo [✓] GitHub 可连接
    git init >nul 2>&1
    git checkout -b main >nul 2>&1
    git add -A >nul 2>&1
    git config user.email "deploy@xiuwei-trading.com" >nul 2>&1
    git config user.name "Xiuwei Deploy" >nul 2>&1
    git commit -m "deploy" >nul 2>&1
    git remote remove origin >nul 2>&1
    git remote add origin https://github.com/fhao40002-jpg/xiuwei-trading.git >nul 2>&1
    git push -u origin main --force >nul 2>&1
    if %errorlevel%==0 (
        echo [✓] 已上线: https://fhao40002-jpg.github.io/xiuwei-trading/
    ) else (
        echo [✗] 推送失败，尝试备用方案...
        goto netlify
    )
) else (
    echo [!] GitHub 不通，走 Netlify...
    goto netlify
)
goto end

:netlify
echo [!] 需要先注册 Netlify 账号(免费)
echo     浏览器打开: https://app.netlify.com/signup
echo     注册后用 GitHub 登录即可
start https://app.netlify.com/drop
echo.
echo     然后把桌面上的 xiuwei-trading-website.zip
echo     直接拖到浏览器窗口里 → 30秒上线
echo.
echo     部署文件位置: %USERPROFILE%\Desktop\xiuwei-trading-website.zip
pause
goto end

:end
echo.
echo 完成！
pause
