# Vercel 部署指南

本文件說明如何將 DriveOn CMS 部署到 Vercel 平台。

## 自動部署設定

### 1. 連接 GitHub 儲存庫

1. 前往 [Vercel Dashboard](https://vercel.com/dashboard)
2. 點擊 "New Project"
3. 選擇 "Import Git Repository"
4. 選擇 `jacky6063/riveon-cms` 儲存庫
5. 點擊 "Import"

### 2. 配置建置設定

Vercel 會自動偵測到這是一個 Vite 專案，但請確認以下設定：

- **Framework Preset**: Vite
- **Build Command**: `npm run build` 或 `pnpm build`
- **Output Directory**: `dist`
- **Install Command**: `npm install` 或 `pnpm install`

### 3. 環境變數設定

在 Vercel 專案設定中添加以下環境變數：

| 變數名稱 | 值 | 說明 |
|---------|---|------|
| `VITE_SUPABASE_URL` | 您的 Supabase 專案 URL | 從 Supabase Dashboard 取得 |
| `VITE_SUPABASE_ANON_KEY` | 您的 Supabase Anon Key | 從 Supabase Dashboard 取得 |

#### 設定步驟：
1. 在 Vercel Dashboard 中選擇您的專案
2. 前往 "Settings" > "Environment Variables"
3. 添加上述環境變數
4. 選擇適用環境：Production, Preview, Development

### 4. 自動部署觸發

設定完成後，每次推送到 `main` 分支都會自動觸發部署：

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

## 手動部署

如果需要手動部署，可以使用 Vercel CLI：

### 安裝 Vercel CLI

```bash
npm install -g vercel
```

### 登入 Vercel

```bash
vercel login
```

### 部署專案

```bash
# 首次部署
vercel

# 部署到生產環境
vercel --prod
```

## 部署檢查清單

在部署前，請確認：

- [ ] 所有環境變數已正確設定
- [ ] Supabase 資料庫已建立並配置
- [ ] 程式碼已推送到 GitHub main 分支
- [ ] 建置命令可以在本地正常執行
- [ ] 所有依賴套件已正確安裝

## 常見問題

### 建置失敗

1. 檢查 `package.json` 中的建置腳本
2. 確認所有依賴套件已列在 `dependencies` 中
3. 檢查環境變數是否正確設定

### 環境變數問題

1. 確認變數名稱以 `VITE_` 開頭
2. 檢查 Vercel Dashboard 中的環境變數設定
3. 重新部署以套用新的環境變數

### 路由問題

1. 確認 `vercel.json` 中的路由設定正確
2. 檢查 React Router 配置

## 版本管理

### 分支策略

- `main`: 生產環境分支，自動部署到 Vercel
- `develop`: 開發分支，可設定 Preview 部署
- `feature/*`: 功能分支，建立 Pull Request 時會產生 Preview 部署

### 回滾版本

如需回滾到先前版本：

1. 在 Vercel Dashboard 中選擇專案
2. 前往 "Deployments" 頁面
3. 找到要回滾的版本
4. 點擊 "Promote to Production"

或使用 Git 回滾：

```bash
git revert <commit-hash>
git push origin main
```

## 監控與維護

### 部署狀態監控

- Vercel Dashboard 提供即時部署狀態
- 可設定 Webhook 通知部署結果
- 查看建置日誌以診斷問題

### 效能監控

- 使用 Vercel Analytics 監控網站效能
- 設定 Core Web Vitals 監控
- 定期檢查載入速度和使用者體驗指標

## 安全性考量

- 環境變數不會暴露在客戶端程式碼中
- 使用 HTTPS 加密所有連線
- 定期更新依賴套件以修補安全漏洞
- 設定適當的 CORS 政策
